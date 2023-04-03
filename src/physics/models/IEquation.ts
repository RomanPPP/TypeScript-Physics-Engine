import { vec3, Tuple } from "romanpppmath";

import IConstraint from "./IConstraint";
import IRigidBody from "./IRigidBody";
export default interface IEquation {
 
  J: Tuple<vec3, 4>;
  _J: Tuple<Tuple<number, 6>, 2>;
  JM: Tuple<vec3, 4>;
  B: Tuple<Tuple<number, 6>, 2>;
  effMass: number;
  
  bias: number;
  constraint : IConstraint
  lambdaMin : number
  lambdaMax : number
  updateLeftPart(dt?: number): void;
  updateRightPart(dt?: number): void;
  applyImpulse(lambda : number) : void
  applyPseudoImpulse(lambda : number) : void
}
