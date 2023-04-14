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


const nullVec : vec3 = [0,0,0]

class ConstraintEquation implements IEquation {
  static biasMultiplier = 0.5;

  readonly body1: IRigidBody;
  readonly body2: IRigidBody;
  readonly ra: vec3;
  readonly rb: vec3;
  readonly n: vec3;
  readonly positionError: number;
  prevLambda: number; 
  constraint: IConstraint;
  J1 : vec3
  J2 : vec3
  J3 : vec3
  J4 : vec3
  JM1 : vec3
  JM2 : vec3
  JM3 : vec3
  JM4 : vec3
 
  effMass: number;

  bias: number;
  lambdaMax: number;
  lambdaMin: number;
  constructor(constraint: IConstraint) {
   
    this.constraint = constraint;
    this.prevLambda = constraint.prevLambda
  }

  updateJacobian() {
    const { body1, body2, ra, rb, n } = this.constraint;

    
 
    if (body1.isStatic()) {
      this.J1 = nullVec
      this.J2 =nullVec
    }
    else {
      this.J1 = v3.scale(n, -1)
      this.J2 = v3.cross(n, ra)
    }
    if (body2.isStatic()) {

      this.J3 = nullVec
      this.J4 =  nullVec
    }
    else{
     
      this.J3 = n
      this.J4 =  v3.cross(rb, n)
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
    const { body1, body2 } = this.constraint;
    const I1 = body1.getInverseInertiaTensor();
    const I2 = body2.getInverseInertiaTensor();
    let M1 = body1.getInverseMass();
    let M2 = body2.getInverseMass();
    
    this.JM1 =  v3.scale(this.J1, M1)
    this.JM2 = m3.transformPoint(I1, this.J2)
    this.JM3 = v3.scale(this.J3, M2)
    this.JM4 = m3.transformPoint(I2, this.J4)
    //JMJ* = JB; B = MJ* as 2 vec6, _J = Jacobian as 2 vec6
    
    this.effMass =
      v3.dot(this.J1, this.JM1) +
      v3.dot(this.JM2, this.J2) +
      v3.dot(this.J3, this.JM3) +
      v3.dot(this.JM4, this.J4);
  }

  updateRightPart(dt: number) {
    const { biasFactor, treshold, body1, body2, n, ra, rb, positionError } =
      this.constraint;

    const relativeVelocity = v3.diff(
      v3.sum(body2.getVelocity(), v3.cross(body2.getAngularVelocity(), rb)),
      v3.sum(body1.getVelocity(), v3.cross(body1.getAngularVelocity(), ra))
    );
    const relativeVelocityNormalProjection = v3.dot(relativeVelocity, n);
    this.bias =
      (biasFactor * Math.max(positionError - treshold, 0)) / dt -
      relativeVelocityNormalProjection;
  }

  applyImpulse(lambda: number) {
    
    this.constraint.prevLambda = lambda;
    this.constraint.body1.applyImpulse(
      v3.scale(this.J1, lambda),
      this.constraint.ra
    );
    this.constraint.body2.applyImpulse(
      v3.scale(this.J3, lambda),
      this.constraint.rb
    );
  }
  applyPseudoImpulse(lambda: number) {
    this.constraint.body1.applyPseudoImpulse(
      v3.scale(this.J1, lambda),
      this.constraint.ra
    );
    this.constraint.body2.applyPseudoImpulse(
      v3.scale(this.J3, lambda),
      this.constraint.rb
    );
  }
}

class ContactEquation extends ConstraintEquation {
  updateRightPart(dt: number) {
    const { body1, body2, treshold, biasFactor, ra, rb, n, positionError } =
      this.constraint;

    const relativeVelocity = v3.diff(
      v3.sum(body2.getVelocity(), v3.cross(body2.getAngularVelocity(), rb)),
      v3.sum(body1.getVelocity(), v3.cross(body1.getAngularVelocity(), ra))
    );

    const relativeVelocityNormalProjection = v3.dot(relativeVelocity, n);
    this.bias =
      (Math.max(0, positionError - treshold) / dt) * biasFactor -
      relativeVelocityNormalProjection;
  }

}

class FrictionEquation extends ConstraintEquation {
  dir: number;
  constraint: ContactConstraint;
  constructor(constraint: ContactConstraint, dir: number) {
    super(constraint);
    this.dir = dir;
    this.prevLambda = this.constraint.prevTanLambdas[dir]
    this.lambdaMax = this.constraint.prevLambda * (this.constraint.body1.getFriction() + this.constraint.body2.getFriction())*10
    this.lambdaMin = - this.lambdaMax
  }
  updateJacobian() {
    const { body1, body2, ra, rb } = this.constraint;
    const n = this.dir
      ? this.constraint.j
      : this.constraint.i
   

  
    if (body1.isStatic()) {
     
      this.J1 = nullVec
      this.J2 =nullVec
    }
    else {
      this.J1 = v3.scale(n, -1)
      this.J2 = v3.cross(n, ra)
    }
    if (body2.isStatic()) {
   
      this.J3 = nullVec
      this.J4 =  nullVec
    }
    else{
     
      this.J3 = n
      this.J4 =  v3.cross(rb, n)
    }
  }
  updateRightPart() {
    const { body1, body2, ra, rb } = this.constraint;
    const n = this.dir
      ? this.constraint.j
      : this.constraint.i
    const relativeVelocity = v3.diff(
      v3.sum(body2.getVelocity(), v3.cross(body2.getAngularVelocity(), rb)),
      v3.sum(body1.getVelocity(), v3.cross(body1.getAngularVelocity(), ra))
    );

    let relativeVelocityNormalProjection = v3.dot(relativeVelocity, n);
    //if(Math.abs(relativeVelocityNormalProjection) < 0.000001) relativeVelocityNormalProjection = 0
    this.bias = -(relativeVelocityNormalProjection) ;
  }
  applyImpulse(lambda: number) {
    this.constraint.prevTanLambdas[this.dir] = lambda
    this.constraint.body1.applyImpulse(
      v3.scale(this.J1, lambda),
      this.constraint.ra
    );
    this.constraint.body2.applyImpulse(
      v3.scale(this.J3, lambda),
      this.constraint.rb
    );
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
    const I1 = body1.getInverseInertiaTensor();
    const I2 = body2.getInverseInertiaTensor();
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
      -v3.dot(this.J[1], body1.getAngularVelocity()) + v3.dot(this.J[3], body2.getAngularVelocity());
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
    const I1 = body1.getInverseInertiaTensor();
    const I2 = body2.getInverseInertiaTensor();
    let M1 = body1.getInverseMass();
    let M2 = body2.getInverseMass();
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
      sum(body2.getVelocity(), cross(body2.getAngularVelocity(), rb)),
      sum(body1.getVelocity(), cross(body1.getAngularVelocity(), ra))
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
