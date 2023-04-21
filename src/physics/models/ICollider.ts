import { vec3, mat3, mat4, AABB } from "romanpppmath";
import IRigidBody from "./IRigidBody";
export default interface ICollider {
  
  getType() : number
  getId() : number
  translate(v : vec3):void
  rotate(v : vec3) : void
  setTranslation(translation : vec3) :void
  getTranslation() : vec3
  
  setRotation(v : vec3) : void 
  getAABB() : AABB

  setId(id : number) : void
  setRmatrix(m : mat3) : void
  getRmatrix() : mat3
  getRmatrixInverse() : mat3
  getM4() :mat4
  localToGlobal(v : vec3) :vec3
  getClosestFaceByNormal(normal : vec3) : {vertices : Array<vec3>, normal : vec3}
  getInverseInertiaTensor(mass : number) : mat3
  support(dir:vec3):vec3
}
