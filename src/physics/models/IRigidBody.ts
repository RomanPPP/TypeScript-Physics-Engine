import { AABB, mat3, Tuple, vec3 } from "romanpppmath";
import ICollider from "./ICollider";

export default interface IRigidBody {

  getCollider() : ICollider
  getId() : number
  getGroup() : number
  getMass() : number
  setMass(mass : number) : void
  getInverseMass() : number
  getTranslation() : vec3
  getRotation() : mat3
  getAcceleration() : vec3
  getVelocity() : vec3
  getAngularVelocity() : vec3
  //getPseudoVelocity() : vec3
  //getPseudoAngularVelocity() : vec3
  getFriction(): number
  isStatic() : boolean
  getInverseInertiaTensor(): mat3;
  getAABB(): AABB;

  addVelocity(v: vec3): void;
  addAngularVelocity(v: vec3): void;
  addAcceleration(v: vec3): void;
  //addPseudoVelocity(v: vec3): void;
  //addPseudoAnglularVelocity(v : vec3) : void
  translate(translation: vec3): void;
  rotate(rotation: vec3): void;

  setGroup(id : number) : void
  setId(id : number)  : void
  setVelocity(v : vec3) : void
  setAngularVelocity(v : vec3) : void
  setMass(mass: number): void;
  setRotation(r : vec3) : void
  setTranslation(t : vec3) : void
  setStatic(b : boolean) : void
  setFriction(f : number) : void

  integrateRK4(dt: number): void;
  integrateVelocities(dt: number): void;
  integratePseudoVelocities(dt: number): void;
 
  integrateForces(dt: number): void;
  updateInverseInertia(): void;
  
  
  
  applyImpulse(impulse: vec3, point: vec3): void;
  applyPseudoImpulse(impulse: vec3, point: vec3): void;
  
  
 
  onUpdate(func : Function) : void
  emitUpdate() : void
}
