import Tree from "./Tree";
import { v3 } from "romanpppmath";

//import { getContacts as gjk } from "./gjk";

import gjk from "./getCollisionFeatures";
import ContactManifold from "./ContactManifold";
import System from "./System";

import {
  ConstraintEquation,
  ContactEquation,
  FrictionEquation,
} from "./Equations";
import IRigidBody from "./models/IRigidBody";
import IEquation from "./models/IEquation";
import { ContactConstraint } from "./Constraints";
import IConstraint from "./models/IConstraint";
import { RigidBody } from "./RigidBody";

//import ISpatialContainer from "./models/ISpatialContainer";

const sameGroup = (body1: IRigidBody, body2: IRigidBody) => {
  if (!body1.getGroup()) return;
  if (!body2.getGroup()) return;
  return body1.getGroup() === body2.getGroup();
};
const pairHash = (x: number, y: number) =>
  x === Math.max(x, y) ? x * x + x + y : y * y + x + y;

export default class Simulation {
  objects: Map<number, IRigidBody>;
  dynamicObjects: IRigidBody[];
  _staticObjects: IRigidBody[];
  readonly dynamicObjectsTree: Tree<IRigidBody>;
  readonly staticObjectsTree: Tree<IRigidBody>;
  // staticObjects : {categoryName : string, bodies : IRigidBody[], spatialData : ISpatialContainer<IRigidBody>}[]
  constraints: Map<string, IConstraint[]>;
  positionConstraints: Map<string, IEquation[]>;
  collisions: ContactConstraint[];
  contactManifolds: Map<number, ContactManifold>;
  broadPhaseCollisions: [number, number[]][];
  useCache: boolean;
  constructor() {
    this.dynamicObjects = [];
    this._staticObjects = [];
    this.dynamicObjectsTree = new Tree();

    this.staticObjectsTree = new Tree();
    this.dynamicObjectsTree.setKey((rigidBody) =>
      rigidBody.getCollider().getId()
    );
    this.staticObjectsTree.setKey((rigidBody) =>
      rigidBody.getCollider().getId()
    );
    this.collisions = [];
    this.constraints = new Map();
    this.useCache = true;
    this.contactManifolds = new Map();
  }
  getContactManifold(id1 : number, id2 : number){
    return this.contactManifolds.get(id1 === Math.max(id1, id2) ? id1 * id1 + id1 + id2 : id2 * id2 + id1 + id2)
  }
  addContactManifold(id1 : number, id2 : number, manifold : ContactManifold){
    this.contactManifolds.set(id1 === Math.max(id1, id2) ? id1 * id1 + id1 + id2 : id2 * id2 + id1 + id2, manifold)
  }
  addObject(object: IRigidBody) {
    const { dynamicObjectsTree, objects, staticObjectsTree } = this;

    const aabb = object.getAABB();

    if (object.isStatic()) {
      this._staticObjects.push(object);
      staticObjectsTree.insert(object);
      object.onUpdate(() => {
        staticObjectsTree.remove(object.getCollider().getId());
        staticObjectsTree.insert(object);
      });
      return;
    }

    dynamicObjectsTree.insert(object);
    this.dynamicObjects.push(object);
    object.onUpdate(() => {
      dynamicObjectsTree.remove(object.getCollider().getId());
      dynamicObjectsTree.insert(object);
    });
  }
  addConstraints(constraints: IConstraint[], name: string) {
    this.constraints.set(name, [...constraints]);
  }
  addPositionConstraints(constraints: IEquation[], name: string) {
    this.positionConstraints.set(name, [...constraints]);
  }
  removeObject(object: IRigidBody) {
    this.dynamicObjectsTree.remove(object.getCollider().getId());
  }
  updatecontactManifolds() {
    for (const [hash, manifold] of this.contactManifolds) {
      manifold.update();
      if (!manifold.keep) this.contactManifolds.delete(hash);
    }
  }
  updateDynamicCollisions() {
    const collisions = this.dynamicObjectsTree.getCollisionsPairs();
    for (let i = 0, n = collisions.length; i < n; i++) {
      const pair = collisions[i];
      if (sameGroup(pair[0], pair[1])) continue;

      const hash = pairHash(
        pair[0].getCollider().getId(),
        pair[1].getCollider().getId()
      );
      let manifold = this.contactManifolds.get(hash);
      if (manifold) continue;
      const features = gjk(pair[0].getCollider(), pair[1].getCollider());

      if (features.length > 0) {
        this.contactManifolds.set(
          hash,
          ContactManifold.fromFeaturesArray(pair[0], pair[1], features)
        );
      }
    }
  }
  updateCollisions() {
    this.updatecontactManifolds();
    this.updateDynamicCollisions();
    this.dynamicObjects.forEach((body1) => {
      const aabb = body1.getAABB();
      const collisions = this.staticObjectsTree.query(aabb);

      //tree.elements.get(body1.getCollider().getId()).isChecked = true;

      for (let j = 0, n = collisions.length; j < n; j++) {
        const body2 = collisions[j];
        if (body1 === body2) continue;
        const hash = pairHash(
          body1.getCollider().getId(),
          body2.getCollider().getId()
        );
        let manifold = this.contactManifolds.get(hash);

        //if (manifold) continue;
        if (manifold) continue;
        const features = gjk(body1.getCollider(), body2.getCollider());

        if (features.length > 0) {
          this.contactManifolds.set(
            hash,
            ContactManifold.fromFeaturesArray(body1, body2, features)
          );
        }
      }
    });
    this.dynamicObjectsTree.setUnchecked();
    this.staticObjectsTree.setUnchecked();
  }

  tick(dt: number) {
    this.updateCollisions();
    const { objects, contactManifolds } = this;

    this.dynamicObjects.forEach((body) => body.integrateForces(dt));
    const system = new System();
    system.useCache = this.useCache;
    const frictionSystem = new System(false);
    const contactEquations = [];
    const frictionEquations = [];
    for (let [key, manifold] of contactManifolds) {
      const useVelocityBias = manifold.contacts.length < 2;

      manifold.contacts.forEach((contactConstraint, _i) => {
        const contactEquation = contactConstraint.getEquation();

        const [fEquation1, fEquation2] =
          contactConstraint.getFrictionEquations();

        contactEquations.push(contactEquation);
        frictionEquations.push(fEquation1, fEquation2);
      });
    }

    system.addEquations(contactEquations);

    for (let [name, constraints] of this.constraints) {
      const equations = [];

      constraints.forEach((c) => {
        c.update();
        const equation = c.getEquation();

        equations.push(equation);
      });
      system.addEquations(equations);
    }

    //system.updateEquations(dt);

    frictionSystem.addEquations(frictionEquations);
    frictionSystem.updateEquations(dt);
    frictionSystem.generateSystem(dt);
    frictionSystem.solvePGS(dt);

    system.updateEquations(dt);
    system.generateSystem(dt);

    const lambda = system.solvePGS(dt, true);

    const len = frictionEquations.length / 2;
    /*for (let i = 0; i < len; i++) {
      frictionEquations[2 * i].lambdaMin *= lambda[i];
      frictionEquations[2 * i].lambdaMax = lambda[i];
      frictionEquations[2 * i + 1].lambdaMin *= lambda[i];
      frictionEquations[2 * i + 1].lambdaMax = lambda[i];
    }*/

    this.dynamicObjects.forEach((object) => object.updateInverseInertia());
    this.dynamicObjects.forEach((object) => object.integrateVelocities(dt));

    let ndx = 0;
    /*
    for (const [key, manifold] of this.contactManifolds) {
      
      manifold.contacts.forEach((c) => {
        c.prevLambda = lambda[ndx]
        ndx++;
      });
    }*/
    /*
    const positionSystem = new System();
    const positionConstraints = [];

    for (const [key, manifold] of manifolds) {
      const { contacts } = manifold;
      if (contacts.length > 1) {
        positionConstraints.push(
          ...contacts.map((c) => {
            const {
              body1,
              body2,
              raLocal,
              rbLocal,
              ra,
              rb,
              i,
              j,
              penDepth,
              n,
            } = c;
            const constraint = new PositionConstraint(
              body1,
              body2,
              n,
              ra,
              rb,
              raLocal,
              rbLocal,
              0.1,
              0.0001,
              penDepth
            );

            return constraint;
          })
        );
      }
    }
    positionSystem.addConstraint(positionConstraints);
    for (let [name, constraints] of this.positionConstraints) {
      positionSystem.addConstraint(constraints);
    }
    positionSystem.updateEquations(dt);
    positionSystem.generateSystem(dt);

    positionSystem.solvePGS(dt);
    for (let i = 0, n = this.objects.length; i < n; i++) {
      this.objects[i].integratePseudoVelocities(dt);
    }
    this.objects.forEach((object) => object.updateInverseInertia());*/
  }
}
