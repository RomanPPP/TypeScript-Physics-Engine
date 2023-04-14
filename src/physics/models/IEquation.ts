import { vec3, Tuple } from "romanpppmath";

import IConstraint from "./IConstraint";
import IRigidBody from "./IRigidBody";
export default interface IEquation {
 
 
  effMass: number;
  J1 : vec3
  J2 : vec3
  J3 : vec3
  J4 : vec3
  JM1 : vec3
  JM2 : vec3
  JM3 : vec3
  JM4 : vec3
  bias: number;
  constraint : IConstraint
  lambdaMin : number
  lambdaMax : number
  prevLambda : number
  updateLeftPart(dt?: number): void;
  updateRightPart(dt?: number): void;
  applyImpulse(lambda : number) : void
  applyPseudoImpulse(lambda : number) : void
}
