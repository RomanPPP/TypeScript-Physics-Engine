import { AABB, mat3, Tuple, vec3 } from "romanpppmath";
import ICollider from "./ICollider";

export default interface IRigidBody {
  static: boolean;
  collider: ICollider;
  mass: number;
  inverseMass: number;
  velocity: vec3;
  angularV: vec3;
  pseudoVelocity: vec3;
  pseudoAngularV: vec3;
  acceleration: vec3;
  inverseInertia: mat3;
  id: number;
  friction: number;
  group: string;
  needToUpdate: boolean;
  dof: Tuple<0 | 1, 6>;
  aabbNode : any
  updateEventFunctions : Function[]
  integrateRK4(dt: number): void;
  integrateVelocities(dt: number): void;
  integratePseudoVelocities(dt: number): void;
  addPseudoVelocity(v: vec3): void;
  integrateForces(dt: number): void;
  updateInverseInertia(): void;
  getInverseInertiaTensor(): mat3;
  setMass(mass: number): void;
  translate(translation: vec3): void;
  rotate(rotation: vec3): void;
  applyImpulse(impulse: vec3, point: vec3): void;
  applyPseudoImpulse(impulse: vec3, point: vec3): void;
  addVelocity(v: vec3): void;
  addAngularV(v: vec3): void;
  addAcceleration(v: vec3): void;
  getExpandedAABB(): AABB;
  getAABB(): AABB;
  onUpdate(func : Function) : void
  emitUpdate() : void
}
