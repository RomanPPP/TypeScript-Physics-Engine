import { vec3, mat3, mat4, AABB } from "romanpppmath";
export default interface ICollider {
  Rmatrix: mat3;
  RmatrixInverse: mat3;
  pos: vec3;
  type: string;
  translate(v : vec3):void
  rotate(v : vec3) : void
  setTranslation(translation : vec3) :void
  
  setRotation(v : vec3) : void 
  getAABB() : AABB
  setRmatrix(matrix : mat3) : void
  getM4() :mat4
  localToGlobal(v : vec3) :vec3
  getClosestFaceByNormal(normal : vec3) : {vertices : Array<vec3>, normal : vec3}
  getInverseInertiaTensor(mass : number) : mat3
  support(dir:vec3):vec3
}
