import { vec3 } from "romanpppmath";
import IEquation from "./IEquation";
import IRigidBody from "./IRigidBody";
export default interface IConstraint {
  readonly body1 : IRigidBody
  readonly body2 : IRigidBody
  n: vec3;
  ra: vec3;
  rb: vec3;
  raLocal: vec3;
  rbLocal: vec3;
  PA: vec3;
  PB: vec3;
  positionError: number;
  biasFactor: number;
  treshold: number;
  lambdaMin: number;
  lambdaMax: number;
  prevLambda : number
  getEquation() :IEquation
  update(): {
    deltaPA: vec3;
    deltaPB: vec3;
  };
}
