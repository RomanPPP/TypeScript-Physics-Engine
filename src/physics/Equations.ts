import { v3, vec3, m3, Tuple } from "romanpppmath";
import { ContactConstraint } from "./Constraints";
import IConstraint from "./models/IConstraint";
import IEquation from "./models/IEquation";
import IRigidBody from "./models/IRigidBody";

const clamp = (v: number, min: number, max: number) => {
  if (v > min) {
    if (v < max) return v;
    else return max;
  }
  return min;
};

type vec6 = Tuple<number, 6>;

class ConstraintEquation implements IEquation {
  static biasMultiplier = 0.5;

  readonly body1: IRigidBody;
  readonly body2: IRigidBody;
  readonly ra : vec3
  readonly rb : vec3
  readonly n : vec3
  readonly positionError : number
  
  biasFactor: number;
  lambdaMin: number;
  lambdaMax: number;
  treshold: number;
  J: Tuple<vec3, 4>;
  _J: Tuple<vec6, 2>;
  JM: Tuple<vec3, 4>;
  B: Tuple<vec6, 2>;
  effMass: number;
  lambdaAcc: number;
  prevLambda: number;
  bias: number;

  constructor(
    
    body1: IRigidBody,
    body2: IRigidBody,
    ra : vec3, rb : vec3, n : vec3, positionError : number,
    biasFactor: number,
    lambdaMin: number,
    lambdaMax: number,
    treshold: number
  ) {
    this.ra = ra
    this.rb = rb
    this.n = n
    this.positionError = positionError
    this.biasFactor = biasFactor;
    this.J = null;
    this.JM = null;
    this.B = null;
    this.body1 = body1;
    this.body2 = body2;
    this.treshold = treshold;
    this.lambdaAcc = 0;
    this.lambdaMin = lambdaMin;
    this.lambdaMax = lambdaMax;
    this.prevLambda = 0;
  }


 
  updateJacobian() {
    const { body1, body2, ra, rb, n} = this;
  
    this.J = [v3.scale(n, -1), v3.cross(n, ra), n, v3.cross(rb, n)];

    if(body1.static){
      this.J[0] = [0,0,0]
      this.J[1] = [0,0,0]
    }
    if(body2.static){
      this.J[2] = [0,0,0]
      this.J[3] = [0,0,0]
    }
  /*  const dof1 = body1.dof;
    const dof2 = body2.dof;

    this.J[0][0] *= dof1[0];
    this.J[0][1] *= dof1[1];
    this.J[0][2] *= dof1[2];

    this.J[1][0] *= dof1[3];
    this.J[1][1] *= dof1[4];
    this.J[1][2] *= dof1[5];

    this.J[2][0] *= dof2[0];
    this.J[2][1] *= dof2[1];
    this.J[2][2] *= dof2[2];

    this.J[3][0] *= dof2[3];
    this.J[3][1] *= dof2[4];
    this.J[3][2] *= dof2[5];*/
  }
  updateLeftPart(dt?: number) {
    this.updateJacobian();
    const { body1, body2 } = this;
    const I1 = body1.inverseInertia;
    const I2 = body2.inverseInertia;
    let M1 = body1.inverseMass;
    let M2 = body2.inverseMass;
    this.JM = [
      v3.scale(this.J[0], M1),
      m3.transformPoint(I1, this.J[1]),
      v3.scale(this.J[2], M2),
      m3.transformPoint(I2, this.J[3]),
    ];

    //JMJ* = JB; B = MJ* as 2 vec6, _J = Jacobian as 2 vec6
    this._J = [
      [...this.J[0], ...this.J[1]],
      [...this.J[2], ...this.J[3]],
    ];

    this.B = [
      [...this.JM[0], ...this.JM[1]],
      [...this.JM[2], ...this.JM[3]],
    ];

    this.effMass =
      v3.dot(this.J[0], this.JM[0]) +
      v3.dot(this.JM[1], this.J[1]) +
      v3.dot(this.J[2], this.JM[2]) +
      v3.dot(this.JM[3], this.J[3]);
  }
 
  updateRightPart(dt: number) {
    const { biasFactor, treshold, body1, body2, n, ra, rb, positionError} =
      this;
   
    const relativeVelocity = v3.diff(
      v3.sum(body2.velocity, v3.cross(body2.angularV, rb)),
      v3.sum(body1.velocity, v3.cross(body1.angularV, ra))
    );
    const relativeVelocityNormalProjection = v3.dot(relativeVelocity, n);
    this.bias =
      (biasFactor * Math.max(positionError ** 2 - treshold, 0)) / dt -
      relativeVelocityNormalProjection;
    this.bias *= ConstraintEquation.biasMultiplier;
  }
  
  applyImpulse(lambda: number) {

    this.body1.applyImpulse(v3.scale(this.J[0], lambda), this.ra);
    this.body2.applyImpulse(v3.scale(this.J[2], lambda), this.rb);
  }
  applyPseudoImpulse(lambda: number) {
   
    this.body1.applyPseudoImpulse(v3.scale(this.J[0], lambda), this.ra);
    this.body2.applyPseudoImpulse(v3.scale(this.J[2], lambda), this.rb);
  }
}

class ContactEquation extends ConstraintEquation {

  
  updateRightPart(dt: number) {

    const { body1, body2,  treshold, biasFactor, ra, rb, n, positionError } = this;

    const relativeVelocity = v3.diff(
      v3.sum(body2.velocity, v3.cross(body2.angularV, rb)),
      v3.sum(body1.velocity, v3.cross(body1.angularV, ra))
    );

    const relativeVelocityNormalProjection = v3.dot(relativeVelocity, n);
    this.bias =
      (Math.max(0, positionError - treshold) / dt) * biasFactor -
      relativeVelocityNormalProjection;
  }
  
  
}

class FrictionEquation extends ConstraintEquation{
  
  
  updateRightPart() {
    const { body1, body2, ra, rb, n} = this;
   
    const relativeVelocity = v3.diff(
      v3.sum(body2.velocity, v3.cross(body2.angularV, rb)),
      v3.sum(body1.velocity, v3.cross(body1.angularV, ra))
    );

    const relativeVelocityNormalProjection = v3.dot(relativeVelocity, n);
    this.bias = -relativeVelocityNormalProjection;
  }
}

/*
class PositionConstraint extends Constraint {
  constructor(
    body1,
    body2,
    n,
    ra,
    rb,
    raLocal,
    rbLocal,
    biasFactor,
    treshold,
    penDepth
  ) {
    super(
      body1,
      body2,
      n,
      ra,
      rb,
      raLocal,
      rbLocal,
      biasFactor,
      null,
      null,
      treshold
    );
    this.penDepth = penDepth;
  }
  applyResolvingImpulse(lambda) {
    this.body1.applyPseudoImpulse(v3.scale(this.J[0], lambda), this.ra);
    this.body2.applyPseudoImpulse(v3.scale(this.J[2], lambda), this.rb);
  }
  updateRightPart(deltaTime) {
    const { body1, body2, ra, rb, n, penDepth, treshold, biasFactor } = this;

    this.bias = (Math.max(0, penDepth - treshold) / deltaTime) * biasFactor;
  }
}
class RotationalConstraint extends Constraint {
  constructor(body1, body2, raLocal, rbLocal) {
    super(body1, body2, null, null, null, raLocal, rbLocal);
  }
  updateLeftPart(deltaTime) {
    const { body1, body2, raLocal, rbLocal } = this;
    this.PA = body1.collider.localToGlobal(raLocal);
    this.PB = body2.collider.localToGlobal(rbLocal);
    const s = m3.transformPoint(body1.collider.Rmatrix, raLocal);
    const b = m3.transformPoint(body2.collider.Rmatrix, rbLocal);

    this.ra = s;
    this.rb = b;

    const J = [[0, 0, 0], v3.cross(s, b), [0, 0, 0], v3.cross(b, s)];

    const dof1 = body1.DOF;
    const dof2 = body2.DOF;

    J[0][0] *= dof1[0];
    J[0][1] *= dof1[1];
    J[0][2] *= dof1[2];

    J[1][0] *= dof1[3];
    J[1][1] *= dof1[4];
    J[1][2] *= dof1[5];

    J[2][0] *= dof2[0];
    J[2][1] *= dof2[1];
    J[2][2] *= dof2[2];

    J[3][0] *= dof2[3];
    J[3][1] *= dof2[4];
    J[3][2] *= dof2[5];
    const I1 = body1.inverseInertia;
    const I2 = body2.inverseInertia;
    this.J = J;
    this.JM = [
      [0, 0, 0],
      m3.transformPoint(I1, this.J[1]),
      [0, 0, 0],
      m3.transformPoint(I2, this.J[3]),
    ];
    this.effMass =
      v3.dot(this.JM[1], this.J[1]) + v3.dot(this.JM[3], this.J[3]);
    this.B = [
      [0, 0, 0, ...this.JM[1]],
      [0, 0, 0, ...this.JM[3]],
    ];
    this._J = [
      [...this.J[0], ...this.J[1]],
      [...this.J[2], ...this.J[3]],
    ];
  }
  updateRightPart(deltaTime) {
    const { body1, body2 } = this;

    this.bias =
      -v3.dot(this.J[1], body1.angularV) + v3.dot(this.J[3], body2.angularV);
  }
  applyResolvingImpulse(lambda) {
    const { body1, body2 } = this;
    body1.addAngularV(v3.scale(this.ra, lambda));
    body2.addAngularV(v3.scale(this.rb, lambda));
  }
}
*/
/*
class Joint extends Constraint {
  constructor(body1, body2, raLocal, rbLocal, biasFactor = 0) {
    super(body1, body2, null, null, null, raLocal, rbLocal, biasFactor);

    this.treshold = 0.0001;
    this.reducer = 0.5;
    this.maxImpulse = 0.7;
  }
  updateLeftPart(deltaTime) {
    const { body1, body2, raLocal, rbLocal } = this;
    this.PA = body1.collider.localToGlobal(raLocal);
    this.PB = body2.collider.localToGlobal(rbLocal);
    const dir = v3.diff(this.PA, this.PB);
    const n = dir;
    this.n = n;
    this.ra = diff(this.PA, this.body1.collider.pos);
    this.rb = diff(this.PB, this.body2.collider.pos);
    this.penDepth = norm(dir);

    const J = [
      v3.scale(this.n, -1),
      v3.cross(this.n, this.ra),
      this.n,
      v3.cross(this.rb, this.n),
    ];

    const dof1 = body1.DOF;
    const dof2 = body2.DOF;

    J[0][0] *= dof1[0];
    J[0][1] *= dof1[1];
    J[0][2] *= dof1[2];

    J[1][0] *= dof1[3];
    J[1][1] *= dof1[4];
    J[1][2] *= dof1[5];

    J[2][0] *= dof2[0];
    J[2][1] *= dof2[1];
    J[2][2] *= dof2[2];

    J[3][0] *= dof2[3];
    J[3][1] *= dof2[4];
    J[3][2] *= dof2[5];
    const I1 = body1.inverseInertia;
    const I2 = body2.inverseInertia;
    let M1 = body1.inverseMass;
    let M2 = body2.inverseMass;
    this.J = J;
    this.JM = [
      scale(this.J[0], M1),
      m3.transformPoint(I1, this.J[1]),
      scale(this.J[2], M2),
      m3.transformPoint(I2, this.J[3]),
    ];
    this.effMass =
      dot(this.JM[0], J[0]) +
      dot(this.JM[1], this.J[1]) +
      dot(this.JM[2], J[2]) +
      dot(this.JM[3], this.J[3]);
    this.B = [
      [...this.JM[0], ...this.JM[1]],
      [...this.JM[2], ...this.JM[3]],
    ];
    this._J = [
      [...this.J[0], ...this.J[1]],
      [...this.J[2], ...this.J[3]],
    ];
  }

  updateRightPart(deltaTime) {
    const { body1, body2, ra, rb, n, penDepth, treshold, biasFactor } = this;

    const relativeVelocity = diff(
      sum(body2.velocity, cross(body2.angularV, rb)),
      sum(body1.velocity, cross(body1.angularV, ra))
    );

    const relativeVelocityNormalProjection = dot(relativeVelocity, n);
    const fac = penDepth ** 2 > treshold;
    this.bias =
      (biasFactor * Math.max(penDepth ** 2 - treshold, 0)) / deltaTime -
      relativeVelocityNormalProjection;
    this.bias *= fac;
  }
  applyResolvingImpulse(lambda) {
    this.body1.applyImpulse(scale(this.J[0], lambda), this.ra);
    this.body2.applyImpulse(scale(this.J[2], lambda), this.rb);
  }
  applyResolvingPseudoImpulse(lambda) {
    const max = this.effMass * 10;
    //lambda = clamp(lambda, -1, 1)
    this.body1.applyPseudoImpulse(scale(this.n, -lambda), [0, 0, 0]);
    this.body2.applyPseudoImpulse(scale(this.n, lambda), [0, 0, 0]);
  }
}
class JointPositionConstraint extends Joint {
  updateRightPart(deltaTime) {
    const { penDepth, treshold, biasFactor } = this;

    const fac = penDepth ** 2 > treshold;
    this.bias =
      ((biasFactor * Math.max(penDepth ** 2 - treshold, 0)) / deltaTime) * fac;
  }
  applyResolvingImpulse(lambda) {
    //if(lambda < 0.1)return
    this.body1.applyPseudoImpulse(scale(this.J[0], lambda), this.ra);
    this.body2.applyPseudoImpulse(scale(this.J[2], lambda), this.rb);
  }
}*/
export {
  ContactEquation,
  ConstraintEquation,
  //Joint,
  FrictionEquation,
  //PositionConstraint,
  //JointPositionConstraint,
  //RotationalConstraint,
};
