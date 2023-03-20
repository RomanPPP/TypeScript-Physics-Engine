import { vec3, Tuple } from "romanpppmath";

import IConstraint from "./IConstraint";
import IRigidBody from "./IRigidBody";
export default interface IEquation {
  body1: IRigidBody;
  body2: IRigidBody;
  ra : vec3
  rb : vec3
  n : vec3
  positionError : number
  biasFactor: number;
  lambdaMin: number;
  lambdaMax: number;
  treshold: number;
  J: Tuple<vec3, 4>;
  _J: Tuple<Tuple<number, 6>, 2>;
  JM: Tuple<vec3, 4>;
  B: Tuple<Tuple<number, 6>, 2>;
  effMass: number;
  lambdaAcc: number;
  prevLambda: number;
  bias: number;

  updateLeftPart(dt?: number): void;
  updateRightPart(dt?: number): void;
  applyImpulse(lambda : number) : void
  applyPseudoImpulse(lambda : number) : void
}
