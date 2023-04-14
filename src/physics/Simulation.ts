import Tree from "./Tree";
import { v3 } from "romanpppmath";

import { getContacts as gjk } from "./gjk";
import Manifold from "./ContactManifold";
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

const sameGroup = (body1: IRigidBody, body2: IRigidBody) => {
  if (!body1.getGroup()) return;
  if (!body2.getGroup()) return;
  return body1.getGroup() === body2.getGroup();
};
const pairHash = (x: number, y: number) =>
  x === Math.max(x, y) ? x * x + x + y : y * y + x + y;

export default class Simulation {
  objects: Map<number, IRigidBody>;
  _objects: IRigidBody[];
  _staticObjects: IRigidBody[];
  readonly tree: Tree<IRigidBody>;
  readonly staticTree: Tree<IRigidBody>;
  constraints: Map<string, IConstraint[]>;
  positionConstraints: Map<string, IEquation[]>;
  collisions: ContactConstraint[];
  collisionManifolds: Map<number, Manifold>;
  broadPhaseCollisions: [number, number[]][];
  useCache: boolean;
  constructor() {
    this._objects = [];
    this._staticObjects = [];
    this.tree = new Tree();
    
    this.staticTree = new Tree();
    this.tree.setKey(rigidBody => rigidBody.getCollider().getId())
    this.staticTree.setKey(rigidBody => rigidBody.getCollider().getId())
    this.collisions = [];
    this.constraints = new Map();
    this.useCache = true;
    this.collisionManifolds = new Map();
  }
  addObject(object: IRigidBody) {
    const { tree, objects, staticTree } = this;

    const aabb = object.getAABB();

    if (object.isStatic()) {
      this._staticObjects.push(object);
      staticTree.insert(object);
      object.onUpdate(() => {
        staticTree.remove(object.getCollider().getId());
        staticTree.insert(object);
      });
      return;
    }

    tree.insert(object);
    this._objects.push(object);
    object.onUpdate(() => {
      tree.remove(object.getCollider().getId());
      tree.insert(object);
    });
  }
  addConstraints(constraints: IConstraint[], name: string) {
    this.constraints.set(name, [...constraints]);
  }
  addPositionConstraints(constraints: IEquation[], name: string) {
    this.positionConstraints.set(name, [...constraints]);
  }
  removeObject(object: IRigidBody) {
    this.tree.remove(object.getCollider().getId());
  }

  updateCollisions() {
    const { collisionManifolds, tree, staticTree, objects } = this;
    let keep = 0;
    for (const [hash, manifold] of collisionManifolds) {
      manifold.update();
      if (!manifold.keep) collisionManifolds.delete(hash);
      keep++;
    }
    const collisions = tree._getCollisions();
    for(let i = 0, n = collisions.length; i < n; i++){
      const pair = collisions[i]
      if (sameGroup(pair[0], pair[1])) continue;

          const hash = pairHash(
            pair[0].getCollider().getId(),
            pair[1].getCollider().getId()
          );
          let manifold = this.collisionManifolds.get(hash);
          if (manifold) continue
          const actualContacts = gjk(pair[0].getCollider(), pair[1].getCollider());

          if (actualContacts.length > 0) {
           
            manifold = new Manifold(
              actualContacts.map(
                (c) =>
                  new ContactConstraint(
                    pair[0],
                    pair[1],
                    c.raLocal,
                    c.rbLocal,
                    c.ra,
                    c.rb,
                    c.PA,
                    c.PB,
                    c.n,
                    c.positionError,
                    c.i,
                    c.j
                  )
              )
            );

            this.collisionManifolds.set(hash, manifold);
          }
    }
    this._objects.forEach((body1) => {
      const collisions = staticTree.getCollisions(body1)
    

      //tree.elements.get(body1.getCollider().getId()).isChecked = true;

      if (collisions.length != 0)
        for (let j = 0, n = collisions.length; j < n; j++) {
          const body2 = collisions[j];

          if (sameGroup(body1, body2)) continue;

          const hash = pairHash(
            body1.getCollider().getId(),
            body2.getCollider().getId()
          );
          let manifold = this.collisionManifolds.get(hash);

          //if (manifold) continue;
          if (manifold) continue
          const actualContacts = gjk(body1.getCollider(), body2.getCollider());

          if (actualContacts.length > 0) {
           
            manifold = new Manifold(
              actualContacts.map(
                (c) =>
                  new ContactConstraint(
                    body1,
                    body2,
                    c.raLocal,
                    c.rbLocal,
                    c.ra,
                    c.rb,
                    c.PA,
                    c.PB,
                    c.n,
                    c.positionError,
                    c.i,
                    c.j
                  )
              )
            );

            this.collisionManifolds.set(hash, manifold);
          }
        }
    });
    this.tree.setUnchecked();
    this.staticTree.setUnchecked();
  }

  tick(dt: number) {
    this.updateCollisions();
    const { objects, collisionManifolds } = this;

    this._objects.forEach((body) => body.integrateForces(dt));
    const system = new System();
    system.useCache = this.useCache;
    const frictionSystem = new System(false);
    const contactEquations = [];
    const frictionEquations = [];
    for (let [key, manifold] of collisionManifolds) {
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

    this._objects.forEach((object) => object.updateInverseInertia());
    this._objects.forEach((object) => object.integrateVelocities(dt));

    let ndx = 0;
    /*
    for (const [key, manifold] of this.collisionManifolds) {
      
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
