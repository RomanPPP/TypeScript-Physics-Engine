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

const sameGroup = (body1 : IRigidBody, body2 : IRigidBody) => {
  if (!body1.group) return;
  if (!body2.group) return;
  return body1.group === body2.group;
};
const pairHash = (x : number, y : number) =>
  x === Math.max(x, y) ? x * x + x + y : y * y + x + y;

export default class Simulation {
  objects: Map<number, IRigidBody>;
  readonly tree: Tree;
  readonly staticTree: Tree;
  constraints: Map<string, IConstraint[]>;
  positionConstraints: Map<string, IEquation[]>;
  collisions: ContactConstraint[];
  collisionManifolds: Map<number, Manifold>;
  broadPhaseCollisions : [number, number[]][]
  useCache : boolean
  constructor() {
    this.objects = new Map();
    this.tree = new Tree();
    this.staticTree = new Tree();
    this.collisions = [];
    this.constraints = new Map();
    this.useCache = true
    this.collisionManifolds = new Map();
  }
  addObject(object: IRigidBody) {
    const { tree, objects, staticTree } = this;

    const aabb = object.getExpandedAABB();
    objects.set(object.id, object);
    if (object.static) {
      staticTree.insert(aabb, object.id);
      object.onUpdate(() => {
        const aabb = object.getAABB();
        staticTree.remove(object.id);
        staticTree.insert(aabb, object.id);
      });
      return;
    }

    tree.insert(aabb, object.id);

    object.onUpdate(() => {
      const aabb = object.getAABB();
      tree.remove(object.id);
      tree.insert(aabb, object.id);
    });
  }
  addConstraints(constraints: IConstraint[], name : string) {
    this.constraints.set(name, [...constraints]);
  }
  addPositionConstraints(constraints: IEquation[], name : string) {
    this.positionConstraints.set(name, [...constraints]);
  }
  removeObject(object: IRigidBody) {
    this.tree.remove(object.id);
    this.objects.delete(object.id);
  }

  updateCollisions() {
    this.broadPhaseCollisions = []
    const { collisionManifolds, tree, staticTree, objects } = this;
    let keep = 0
    for (const [hash, manifold] of collisionManifolds) {
      manifold.update();
      if (!manifold.keep) 
        collisionManifolds.delete(hash);
      keep ++
    }
    for (const [id, body1] of objects) {
      if (body1.static) continue;

      const intersects = tree.getCollisions(body1.getAABB(), id);
      const intersectWithStatics = staticTree.getCollisions(body1.getAABB(), id);
      const broadPhaseIds = [...intersectWithStatics, ...intersects];
      this.broadPhaseCollisions.push([body1.id, broadPhaseIds])
      tree.elements.get(id).isChecked = true;

      if (broadPhaseIds.length != 0)
        for (let j = 0, n = broadPhaseIds.length; j < n; j++) {
          const body2 = objects.get(broadPhaseIds[j]);

          if (sameGroup(body1, body2)) continue;

          const hash = pairHash(body1.id, body2.id);
          let manifold = this.collisionManifolds.get(hash);

          if (manifold) continue;

          const actualContacts = gjk(body1.collider, body2.collider);
   
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
    }

    this.tree.setUnchecked();
    this.staticTree.setUnchecked();
  }

  tick(dt: number) {

    this.updateCollisions();
    const { objects, collisionManifolds } = this;

    for (const [id, object] of objects) {
      object.integrateForces(dt);
    }
    
    const system = new System();
    system.useCache = this.useCache
    const frictionSystem = new System(false);
    const contactEquations = [];
    const frictionEquations = [];
    for (let [key, manifold] of collisionManifolds) {
      const useVelocityBias = manifold.contacts.length < 2;
      
      manifold.contacts.forEach((contactConstraint, _i) => {
       
        const contactEquation = contactConstraint.getEquation()
        
        const [fEquation1, fEquation2] = contactConstraint.getFrictionEquations()
        
       

        contactEquations.push(contactEquation);
        frictionEquations.push(fEquation1, fEquation2);
      });
    }
    
    system.addEquations(contactEquations);
    
    for (let [name, constraints] of this.constraints) {
      const equations = []

      constraints.forEach(c =>{
        c.update()
        const equation = c.getEquation()
       
        equations.push(equation)
      })
      system.addEquations(equations);
    }
    
    //system.updateEquations(dt);

    frictionSystem.addEquations(frictionEquations);

    
    system.updateEquations(dt)
    system.generateSystem(dt);
    
    const lambda = system.solvePGS(dt,true);
    
    
    const len = frictionEquations.length / 2;
  /*for (let i = 0; i < len; i++) {
      frictionEquations[2 * i].lambdaMin *= lambda[i];
      frictionEquations[2 * i].lambdaMax = lambda[i];
      frictionEquations[2 * i + 1].lambdaMin *= lambda[i];
      frictionEquations[2 * i + 1].lambdaMax = lambda[i];
    }*/

    frictionSystem.updateEquations(dt);
    frictionSystem.generateSystem(dt);
    frictionSystem.solvePGS(dt);
    for (const [id, object] of objects) {
      object.integrateVelocities(dt);
    }
    this.objects.forEach((object) => object.updateInverseInertia());
    
    
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
