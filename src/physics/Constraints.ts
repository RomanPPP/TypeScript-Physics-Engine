import IConstraint from "./models/IConstraint";
import { vec3, v3, m3 } from "romanpppmath";
import {
  ConstraintEquation,
  ContactEquation,
  FrictionEquation,
} from "./Equations";
import IRigidBody from "./models/IRigidBody";
import IEquation from "./models/IEquation";

import config from "./config";

const { CONTACT_TRESHOLD, CONTACT_BIAS } = config;

export class Constraint implements IConstraint {
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
  prevLambda: number;
  readonly body1: IRigidBody;
  readonly body2: IRigidBody;

  constructor(
    body1: IRigidBody,
    body2: IRigidBody,
    raLocal: vec3,
    rbLocal: vec3,
    opt: {
      biasFactor?: number;
      treshold?: number;
      lambdaMin?: number;
      lambdaMax?: number;
    }
  ) {
    this.body1 = body1;
    this.body2 = body2;
    this.raLocal = raLocal;
    this.rbLocal = rbLocal;
    this.biasFactor = opt.biasFactor || 0.125;
    this.treshold = opt.treshold || 0.000005;
    this.lambdaMin = opt.lambdaMin || -99999999;
    this.lambdaMax = opt.lambdaMax || 99999999;
    this.prevLambda = 0;

    const collider1 = this.body1.collider;
    const collider2 = this.body2.collider;
    this.ra = m3.transformPoint(collider1.Rmatrix, this.raLocal);
    this.rb = m3.transformPoint(collider2.Rmatrix, this.rbLocal);
    this.PA = v3.sum(collider1.pos, this.ra);
    this.PB = v3.sum(collider2.pos, this.rb);
  }
  update() {
    const collider1 = this.body1.collider;
    const collider2 = this.body2.collider;
    this.ra = m3.transformPoint(collider1.Rmatrix, this.raLocal);
    this.rb = m3.transformPoint(collider2.Rmatrix, this.rbLocal);
    const PA = v3.sum(collider1.pos, this.ra);
    const PB = v3.sum(collider2.pos, this.rb);
    const deltaPA = v3.diff(PA, this.PA);
    const deltaPB = v3.diff(PB, this.PB);
    this.PA = PA;
    this.PB = PB;
    const direction = v3.diff(PA, PB);

    this.positionError = v3.norm(v3.sum([0.001, 0.001, 0.001], direction));

    this.n = v3.scale(direction, 1 / this.positionError);
    return {
      deltaPA,
      deltaPB,
    };
  }
  getEquation(): IEquation {
    const equation = new ConstraintEquation(
      this
    );
    equation.lambdaMax = this.lambdaMax
    equation.lambdaMin = this.lambdaMin
    return equation

  }
}
export class ContactConstraint implements IConstraint {
  static opt = {
    biasFactor: 0.125,
    treshold: 0.0005,
    lambdaMin: 0,
    lambdaMax: Infinity,
  };

  readonly n: vec3;

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
  prevLambda: number;
  readonly body1: IRigidBody;
  readonly body2: IRigidBody;
  readonly i: vec3;
  readonly j: vec3;
  constructor(
    body1: IRigidBody,
    body2: IRigidBody,
    raLocal: vec3,
    rbLocal: vec3,
    ra: vec3,
    rb: vec3,
    PA: vec3,
    PB: vec3,
    n: vec3,
    positionError: number,
    i: vec3,
    j: vec3
  ) {
    this.body1 = body1;
    this.body2 = body2;
    this.raLocal = raLocal;
    this.rbLocal = rbLocal;
    this.ra = ra;
    this.rb = rb;
    this.PA = PA;
    this.PB = PB;
    this.n = n;
    this.positionError = positionError;
    this.i = i;
    this.j = j;
    this.biasFactor = config.CONTACT_BIAS;
    this.treshold = config.CONTACT_TRESHOLD;
    this.lambdaMin = ContactConstraint.opt.lambdaMin;
    this.lambdaMax = ContactConstraint.opt.lambdaMax;
  }
  update() {
    const collider1 = this.body1.collider;
    const collider2 = this.body2.collider;
    this.ra = m3.transformPoint(collider1.Rmatrix, this.raLocal);
    this.rb = m3.transformPoint(collider2.Rmatrix, this.rbLocal);
    const PA = v3.sum(collider1.pos, this.ra);
    const PB = v3.sum(collider2.pos, this.rb);
    const deltaPA = v3.diff(PA, this.PA);
    const deltaPB = v3.diff(PB, this.PB);
    this.PA = PA;
    this.PB = PB;
    const direction = v3.diff(PA, PB);

    this.positionError = v3.dot(this.n, direction);
    return {
      deltaPA,
      deltaPB,
    };
  }
  getEquation(): ContactEquation {
    const lambdaMax = Math.max(
      1,
      v3.norm(
        v3.sum(
          v3.scale(this.body1.velocity, this.body1.mass),
          v3.scale(this.body2.velocity, this.body2.mass)
        )
      ) * 10
    );
    const equation = new ContactEquation(
      this
    );

    equation.lambdaMax = lambdaMax
    equation.lambdaMin = 0
    return equation
  }
  getFrictionEquations(): FrictionEquation[] {
    const eq1 = new FrictionEquation(
      this,
      0
     )
     const eq2 = new FrictionEquation(
      this,
      1
    )
    eq1.lambdaMax = Infinity
    eq1.lambdaMin = - Infinity
    eq2.lambdaMax = Infinity
    eq2.lambdaMin = - Infinity
     return [
      eq1, eq2
    ];
  }
}
