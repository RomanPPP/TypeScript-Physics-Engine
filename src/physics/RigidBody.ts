import EventEmitter from "./EventEmitter";
import { m3, v3, vec3, mat3, Tuple } from 'romanpppmath';
import AABB from "./AABB";
import ICollider from "./models/ICollider";
import IRigidBody from "./models/IRigidBody";
import config from "./config";
const {RIGID_BODY_MOVE_TRESHOLD, RIGID_BODY_AABB_BIAS} = config
class RigidBody<T extends ICollider> extends EventEmitter implements IRigidBody {
 
  static: boolean;
  collider: T;
  mass: number;
  inverseMass: number;
  velocity: vec3;
  omega: vec3;
  pseudoVelocity: vec3;
  pseudoAngularV: vec3;
  acceleration: vec3;
  inverseInertiaTensor: mat3;
  id: number;
  friction: number;
  group: number;
  needToUpdate: boolean;
  updateEventFunctions : Function[]
 
  static lastId = 1

  constructor(collider : T) {
    super();
    this.static = false;
    this.collider = collider;
    
    this.mass = 1;
    this.inverseMass = 1 / this.mass;
    this.velocity = [0, 0, 0];
    this.pseudoVelocity = [0, 0, 0];
    this.pseudoAngularV = [0, 0, 0];
    this.acceleration = [0, 0, 0];
    this.omega = [0, 0, 0];
    this.inverseInertiaTensor = collider.getInverseInertiaTensor(this.mass);
    this.id = RigidBody.lastId++;
    this.friction = 5;
    this.updateEventFunctions = []

    this.group = null;
    this.needToUpdate = false
  }
  getId() {
    return this.id
  }

  getGroup(): number {
    return this.group
  }
  setGroup(groupId : number){
    this.group = groupId
  }
  getMass(): number {
    return this.mass
  }
  getInverseMass(): number {
    return this.inverseMass
  }
  getTranslation(): vec3 {
    return this.getCollider().getTranslation()
  }
  getCollider(): T {
    return this.collider
  }
  isStatic(): boolean {
    return this.static
  }
  getRotation() : mat3{
    return this.getCollider().getRmatrix()
  }
  getVelocity(): vec3 {
    return this.velocity
  }
  getAcceleration(): [number, number, number] {
    return this.acceleration
  }
  getAngularVelocity(): [number, number, number] {
    return this.omega
  }
  getFriction(): number {
    return this.friction
  }
  getInverseInertiaTensor() {
    return this.inverseInertiaTensor;
  }
  getAABB() : AABB {
    const aabb = this.collider.getAABB();
    const velocity = this.velocity;
    const tr : vec3 = [RIGID_BODY_AABB_BIAS, RIGID_BODY_AABB_BIAS, RIGID_BODY_AABB_BIAS];
    aabb.min = v3.diff(aabb.min, tr);
    aabb.max = v3.sum(aabb.max, tr);
    return aabb;
  }
  addVelocity(v : vec3) {
    this.velocity = v3.sum(this.velocity, v);
  }
  addAngularVelocity(v : vec3) {
    this.omega = v3.sum(this.omega, v);
  }
  addAcceleration(v : vec3) {
    this.acceleration = v3.sum(this.acceleration, v);
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

  setId(id: number): void {
    this.id = id
  }
  setMass(mass : number) {
    this.mass = mass;
    this.inverseMass = 1 / this.mass;
  }
  setFriction(f: number): void {
    this.friction = f
  }
  setRotation(r: vec3): void {
    this.collider.setRotation(r)
    this.needToUpdate = true
    this.emitUpdate();
  }
  setTranslation(t: [number, number, number]): void {
    this.collider.setTranslation(t);

    this.needToUpdate = true
    this.emitUpdate();
  }
  setVelocity(v: [number, number, number]): void {
    this.velocity = v
  }
  setAngularVelocity(v: [number, number, number]): void {
    this.omega = v
  }
  setStatic(b: boolean): void {
    this.static = b
  }
  integrateRK4(dt : number) {
    const { acceleration, velocity, omega } = this;

    const _translation = v3.scale(
      v3.sum(velocity, v3.scale(acceleration, (2 / 3) * dt)),
      dt
    );
    const _rotation = v3.scale(omega, dt/2);
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
    const rotation = v3.scale(this.omega, dt/2);
    if (v3.norm(rotation) > config.RIGID_BODY_MOVE_TRESHOLD) this.rotate(rotation);
  }
  integrateForces(dt : number) {
    let deltaSpeed = v3.scale(this.acceleration, dt);

    this.velocity = v3.sum(this.velocity, deltaSpeed);
  }
  updateInverseInertia() {
    this.inverseInertiaTensor = this.collider.getInverseInertiaTensor(this.mass);
  }
  
  

  applyImpulse(impulse :vec3, point : vec3) {
    if (this.static) return;
    this.velocity = v3.sum(this.velocity, v3.scale(impulse, this.inverseMass));
    const angularImpulse = m3.transformPoint(
      this.inverseInertiaTensor,
      v3.cross(point, impulse)
    );
    this.omega = v3.sum(this.omega, angularImpulse);
  }
  applyPseudoImpulse(impulse : vec3, point : vec3) {
    if (this.static) return;
    this.pseudoVelocity = v3.sum(
      this.pseudoVelocity,
      v3.scale(impulse, this.inverseMass)
    );
    const angularImpulse = m3.transformPoint(
      this.inverseInertiaTensor,
      v3.cross(point, impulse)
    );
    this.pseudoAngularV = v3.sum(this.pseudoAngularV, angularImpulse);
  }
  /*
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
class TerrainSegment<T extends ICollider> implements IRigidBody{
    static id = 0
    group : number 
    collider : T
    friction : number
    updateEventFunctions : Function[]
    constructor(collider : T){
      this.collider = collider
      this.group = null
      this.friction = 5
      this.updateEventFunctions = []
    }
    getId() {
      return TerrainSegment.id
    }
  
    getGroup(): number {
      return this.group
    }
    setGroup(groupId : number){
      this.group = groupId
    }
    getMass(): number {
      return 1
    }
    getInverseMass(): number {
      return 1
    }
    getTranslation(): vec3 {
      return this.getCollider().getTranslation()
    }
    getCollider(): T {
      return this.collider
    }
    isStatic(): boolean {
      return true
    }
    getRotation() : mat3{
      return this.getCollider().getRmatrix()
    }
    getVelocity(): vec3 {
      return [0,0,0]
    }
    getAcceleration(): [number, number, number] {
      return [0,0,0]
    }
    getAngularVelocity(): [number, number, number] {
      return [0,0,0]
    }
    getFriction(): number {
      return this.friction
    }
    getInverseInertiaTensor() {
      return m3.identity()
    }
    getAABB() : AABB {
      const aabb = this.collider.getAABB();

      const tr : vec3 = [RIGID_BODY_AABB_BIAS, RIGID_BODY_AABB_BIAS, RIGID_BODY_AABB_BIAS];
      aabb.min = v3.diff(aabb.min, tr);
      aabb.max = v3.sum(aabb.max, tr);
      return aabb;
    }
    addVelocity(v : vec3) {
    }
    addAngularVelocity(v : vec3) {
   
    }
    addAcceleration(v : vec3) {
     
    }
  
    
    translate(translation : vec3) {
      this.collider.translate(translation);
  
      
      this.emitUpdate();
    }
    rotate(rotation : vec3) {
      this.collider.rotate(rotation);
      
      this.emitUpdate();
    }
  
    setId(id: number): void {
    
    }
    setMass(mass : number) {
     
    }
    setFriction(f: number): void {
      this.friction = f
    }
    setRotation(r: vec3): void {
      this.collider.setRotation(r)
      
      this.emitUpdate();
    }
    setTranslation(t: [number, number, number]): void {
      
      this.emitUpdate();
    }
    setVelocity(v: [number, number, number]): void {
     
    }
    setAngularVelocity(v: [number, number, number]): void {
     
    }
    setStatic(b: boolean): void {
      
    }
    integrateRK4(dt : number) {
      
    }
    integratePseudoVelocities(dt : number) {
    
    }
    addPseudoVelocity(v : vec3) {
      }
    addPseudoAngularV(v : vec3) {
     }
    integrateVelocities(dt : number) {
    }
    integrateForces(dt : number) {
     
    }
    updateInverseInertia() {
         }
    
    
  
    applyImpulse(impulse :vec3, point : vec3) {
   
    }
    applyPseudoImpulse(impulse : vec3, point : vec3) {
      
    }
    /*
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
/*
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
*/
export { RigidBody, TerrainSegment};
