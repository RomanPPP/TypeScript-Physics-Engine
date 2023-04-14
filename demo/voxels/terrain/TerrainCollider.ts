import { vec3, m3, m4, v3, AABB } from "romanpppmath";
import { Box } from "../../../src/physics/Collider";

class Terrain {
  elementSize: vec3;
  elMin: vec3;
  elMax: vec3;
  constructor(elementScale: vec3 = [1, 1, 1]) {
    this.elementSize = elementScale;
    this.elMax = v3.scale(elementScale, 0.5);
    this.elMin = v3.scale(elementScale, -0.5);
  }

  VoxelCollider = (() => {
    const self = this;
    return class VoxelCollider {
      pos: vec3;
      min: vec3;
      max: vec3;

      constructor(pos: vec3) {
        this.pos = pos;
        this.min = v3.sum(this.pos, self.elMin);
        this.max = v3.sum(this.pos, self.elMax);
      }
      setTranslation(pos : vec3){
        this.pos = pos
        this.min = v3.sum(this.pos, self.elMin);
        this.max = v3.sum(this.pos, self.elMax);
      }
      getAABB() {
        return this;
      }
      support(dir: vec3) {
        return [
          this.pos[0] + (dir[0] > 0 ? this.max[0] : this.min[0]),
          this.pos[1] + (dir[1] > 0 ? this.max[1] : this.min[1]),
          this.pos[2] + (dir[2] > 0 ? this.max[2] : this.min[2]),
        ];
      }
      getInverseInertiaTensor(mass: number) {
        return m4.identity();
        /*const i1 =
                (mass / 12) * (this.max[1] * this.max[1] + this.max[2] * this.max[2]);
              const i2 =
                (mass / 12) * (this.max[0] * this.max[0] + this.max[2] * this.max[2]);
              const i3 =
                (mass / 12) * (this.max[0] * this.max[0] + this.max[1] * this.max[1]);
          
              const m = m3.multiply(
                m3.multiply(this.RmatrixInverse, [
                  1 / i1,
                  0,
                  0,
                  0,
                  1 / i2,
                  0,
                  0,
                  0,
                  1 / i3,
                ]),
                this.Rmatrix
              );*/
      }
      getClosestFaceByNormal(normal: vec3) {
        let minDot = v3.dot(normal, Box.normals[0]);
        let index = 0;
        for (let i = 1, n = Box.normals.length; i < n; i++) {
          //const _normal = m3.transformPoint(Rmatrix, normals[i])
          const _dot = v3.dot(Box.normals[i], normal);
          if (_dot < minDot) {
            minDot = _dot;
            index = i;
          }
        }
        const faceIndices = Box.indices[index];
        return {
          vertices: faceIndices.map((i) => Box.points[i]),
          normal: Box.normals[index],
        };
      }
    };
  })();
}
