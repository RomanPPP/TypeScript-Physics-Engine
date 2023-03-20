import EventEmitter from "./EventEmitter";
import { m3, v3, vec3, mat3,AABB, Tuple } from 'romanpppmath';
import ICollider from "./models/ICollider";
import IRigidBody from "./models/IRigidBody";
import config from "./config";
const {RIGID_BODY_MOVE_TRESHOLD, RIGID_BODY_AABB_BIAS} = config
class RigidBody extends EventEmitter implements IRigidBody {
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
  dof : Tuple<0 | 1, 6>
  needToUpdate: boolean;
  aabbNode : null
  updateEventFunctions : Function[]
  static config = {
    RIGID_BODY_MOVE_TRESHOLD : 0.005,
    RIGID_BODY_AABB_BIAS : 0.00001
  }
  static setRIGID_BODY_MOVE_TRESHOLD(RIGID_BODY_MOVE_TRESHOLD : number){
    RigidBody.config.RIGID_BODY_MOVE_TRESHOLD = RIGID_BODY_MOVE_TRESHOLD
  }
  static lastId = 1
  constructor(collider : ICollider) {
    super();
    this.static = false;
    this.collider = collider;
    this.mass = 1;
    this.inverseMass = 1 / this.mass;
    this.velocity = [0, 0, 0];
    this.pseudoVelocity = [0, 0, 0];
    this.pseudoAngularV = [0, 0, 0];
    this.acceleration = [0, 0, 0];
    this.angularV = [0, 0, 0];
    this.inverseInertia = collider.getInverseInertiaTensor(this.mass);
    this.id = RigidBody.lastId++;
    this.friction = 5;
    this.updateEventFunctions = []

    this.group = null;
    this.needToUpdate = false
  }

  integrateRK4(dt : number) {
    const { acceleration, velocity, angularV } = this;

    const _translation = v3.scale(
      v3.sum(velocity, v3.scale(acceleration, (2 / 3) * dt)),
      dt
    );
    const _rotation = v3.scale(angularV, dt/2);
    const deltaVelocity = v3.scale(acceleration, dt);

    if (v3.norm(_translation) > config.RIGID_BODY_MOVE_TRESHOLD) this.translate(_translation);

    if (v3.norm(_rotation) > config.RIGID_BODY_MOVE_TRESHOLD) this.rotate(_rotation);
    this.velocity = v3.sum(velocity, deltaVelocity);
  }
  integratePseudoVelocities(dt : number) {
    
    const translation = v3.scale(this.pseudoVelocity, dt);

    const rotation = v3.scale(this.pseudoAngularV, dt);
    if (v3.norm(translation) > config.RIGID_BODY_MOVE_TRESHOLD) this.translate(translation);

    if (v3.norm(rotation) > config.RIGID_BODY_MOVE_TRESHOLD) this.rotate(rotation);

    this.pseudoVelocity = [0, 0, 0];
    this.pseudoAngularV = [0, 0, 0];
  }
  addPseudoVelocity(v : vec3) {
    this.pseudoVelocity = v3.sum(this.pseudoVelocity, v);
  }
  addPseudoAngularV(v : vec3) {
    this.pseudoAngularV = v3.sum(this.pseudoAngularV, v);
  }
  integrateVelocities(dt : number) {
    const translation = v3.scale(v3.diff(this.velocity, v3.scale(this.acceleration, dt/3)), dt);
    if (v3.norm(translation) > config.RIGID_BODY_MOVE_TRESHOLD) this.translate(translation);
    const rotation = v3.scale(this.angularV, dt/2);
    if (v3.norm(rotation) > config.RIGID_BODY_MOVE_TRESHOLD) this.rotate(rotation);
  }
  integrateForces(dt : number) {
    let deltaSpeed = v3.scale(this.acceleration, dt);

    this.velocity = v3.sum(this.velocity, deltaSpeed);
  }
  updateInverseInertia() {
    this.inverseInertia = this.collider.getInverseInertiaTensor(this.mass);
  }
  getInverseInertiaTensor() {
    return this.collider.getInverseInertiaTensor(this.mass);
  }
  setMass(mass : number) {
    this.mass = mass;
    this.inverseMass = 1 / this.mass;
  }
  translate(translation : vec3) {
    this.collider.translate(translation);

    this.needToUpdate = true
    this.emitUpdate();
  }
  rotate(rotation : vec3) {
    this.collider.rotate(rotation);
    this.needToUpdate = true
    this.emitUpdate();
  }

  applyImpulse(impulse :vec3, point : vec3) {
    if (this.static) return;
    this.velocity = v3.sum(this.velocity, v3.scale(impulse, this.inverseMass));
    const angularImpulse = m3.transformPoint(
      this.inverseInertia,
      v3.cross(point, impulse)
    );
    this.angularV = v3.sum(this.angularV, angularImpulse);
  }
  applyPseudoImpulse(impulse : vec3, point : vec3) {
    if (this.static) return;
    this.pseudoVelocity = v3.sum(
      this.pseudoVelocity,
      v3.scale(impulse, this.inverseMass)
    );
    const angularImpulse = m3.transformPoint(
      this.inverseInertia,
      v3.cross(point, impulse)
    );
    this.pseudoAngularV = v3.sum(this.pseudoAngularV, angularImpulse);
  }
  addVelocity(v : vec3) {
    this.velocity = v3.sum(this.velocity, v);
  }
  addAngularV(v : vec3) {
    this.angularV = v3.sum(this.angularV, v);
  }
  addAcceleration(v : vec3) {
    this.acceleration = v3.sum(this.acceleration, v);
  }/*
  applyAngularImpulse(radius : number, axis, value) {
    const dir = normalize([
      axis[1] + axis[2],
      axis[2] - axis[0],
      -axis[0] - axis[1],
    ]);
    const rad = vector.cross(dir, axis);
    const globalDir = scale(dir, value);
    const globalRad = scale(rad, radius);

    this.applyImpulse(globalDir, globalRad);
  }*/
  getExpandedAABB() {
    
    const aabb = this.collider.getAABB();
    const velocity = this.velocity;
    const tr : vec3 = [RIGID_BODY_AABB_BIAS, RIGID_BODY_AABB_BIAS, RIGID_BODY_AABB_BIAS];
    aabb.min = v3.diff(aabb.min, tr);
    aabb.max = v3.sum(aabb.max, tr);

    /*if(velocity[0] > 10) aabb.max[0] += velocity[0]
      if(velocity[1] > 10) aabb.max[1] += velocity[1]
      if(velocity[2] > 10) aabb.max[2] += velocity[2]
      if(velocity[0] < -10) aabb.min[0] += velocity[0]
      if(velocity[1] < -10) aabb.min[1] += velocity[1]
      if(velocity[2] < -10) aabb.min[2] += velocity[2]*/
    return aabb;
  }
  getAABB() {
    return this.collider.getAABB();
  }
  onUpdate(func : Function){
    if(this.updateEventFunctions.indexOf(func) > -1)
      return
    this.updateEventFunctions.push(func)
    return () =>{
      this.updateEventFunctions.filter(fn => fn !== func)
    }
  }
  emitUpdate() {
      this.updateEventFunctions.forEach(fn => {
        fn()
      })
  }
}

class Player extends RigidBody {
  constructor(collider : ICollider) {
    super(collider);
    this.friction = 0.3;
    
  }
  applyImpulse(impulse : vec3, point : vec3) {
    this.velocity = v3.sum(this.velocity, v3.scale(impulse, this.inverseMass));
  }
  applyPseudoImpulse(impulse : vec3) {
    this.pseudoVelocity = v3.sum(
      this.pseudoVelocity,
      v3.scale(impulse, this.inverseMass)
    );
  }
  
  
}
export { RigidBody, Player };
