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

const {CONTACT_TRESHOLD, CONTACT_BIAS} = config

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
  prevLambda : number
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
    this.biasFactor = opt.biasFactor | 0.125;
    this.treshold = opt.treshold | 0.000005;
    this.lambdaMin = opt.lambdaMin | -Infinity;
    this.lambdaMax = opt.lambdaMax | Infinity;
    this.prevLambda = 0
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

    this.positionError = v3.norm(direction);
    this.n = v3.scale(direction, 1 / this.positionError);
    return {
      deltaPA,
      deltaPB,
    };
  }
  getEquation(): IEquation {
    return new ConstraintEquation(
      this.body1,
      this.body2,
      this.ra,
      this.rb,
      this.n,
      this.positionError,
      this.biasFactor,
      this.lambdaMin,
      this.lambdaMax,
      this.treshold
    );
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
  prevLambda : number
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
    this.biasFactor = CONTACT_BIAS;
    this.treshold = CONTACT_TRESHOLD;
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
    return new ContactEquation(
      this.body1,
      this.body2,
      this.ra,
      this.rb,
      this.n,
      this.positionError,
      this.biasFactor,
      0,
      lambdaMax,
      this.treshold
    );
  }
  getFrictionEquations(): FrictionEquation[] {
    return [
      new FrictionEquation(
        this.body1,
        this.body2,
        this.ra,
        this.rb,
        v3.scale(this.i, 1),
        this.positionError,
        this.biasFactor,
        -this.body1.friction - this.body2.friction,
        this.body1.friction + this.body2.friction,
        this.treshold
      ),
      new FrictionEquation(
        this.body1,
        this.body2,
        this.ra,
        this.rb,
        v3.scale(this.j, 1),
        this.positionError,
        this.biasFactor,
        -this.body1.friction - this.body2.friction,
        this.body1.friction + this.body2.friction,
        this.treshold
      )
    ];
  }
}
