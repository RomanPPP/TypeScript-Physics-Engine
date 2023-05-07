import { vec3 } from "romanpppmath";

export default class AABB {
  min: vec3;
  max: vec3;
  constructor(min: vec3, max: vec3) {
    this.min = min;
    this.max = max;
  }
  isCollide(aabb: AABB) {
    if (
      this.min[0] <= aabb.max[0] &&
      this.max[0] >= aabb.min[0] &&
      this.min[1] <= aabb.max[1] &&
      this.max[1] >= aabb.min[1] &&
      this.min[2] <= aabb.max[2] &&
      this.max[2] >= aabb.min[2]
    ) {
      return true;
    }
    return false;
  }
  contain(point: vec3) {
    if (
      this.min[0] <= point[0] &&
      this.max[0] >= point[0] &&
      this.min[1] <= point[1] &&
      this.max[1] >= point[1] &&
      this.min[2] <= point[2] &&
      this.max[2] >= point[2]
    ) {
      return true;
    }
    return false;
  }
  getSize() {
    const area =
      Math.abs(this.max[0] - this.min[0]) *
      Math.abs(this.max[1] - this.min[1]) *
      Math.abs(this.max[2] - this.min[2]);
    return area;
  }
  merge(aabb : AABB){
    const x1 = this.min[0] < aabb.min[0] ? this.min[0] : aabb.min[0];
    const x2 = this.max[0] > aabb.max[0] ? this.max[0] : aabb.max[0];
    const y1 = this.min[1] < aabb.min[1] ? this.min[1] : aabb.min[1];
    const y2 = this.max[1] > aabb.max[1] ? this.max[1] : aabb.max[1];
    const z1 = this.min[2] < aabb.min[2] ? this.min[2] : aabb.min[2];
    const z2 = this.max[2] > aabb.max[2] ? this.max[2] : aabb.max[2];
    return new AABB([x1, y1, z1], [x2, y2, z2]);
  }
}
