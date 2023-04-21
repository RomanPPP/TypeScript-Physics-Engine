import { mat3, v3, vec3, m3, AABB, m4, Tuple, mat4 } from "romanpppmath";
import ICollider from "./models/ICollider";
import IRigidBody from "./models/IRigidBody";

const xAxis: vec3 = [1, 0, 0];
const yAxis: vec3 = [0, 1, 0];
const zAxis: vec3 = [0, 0, 1];
const xAxisNegative = v3.scale(xAxis, -1);
const yAxisNegative = v3.scale(yAxis, -1);
const zAxisNegative = v3.scale(zAxis, -1);

enum colliderTypes  {
  Point,
  Box,
  Sphere,
  Cylinder,
  Triangle
}
class Collider implements ICollider {
  static lastId = 1;
  Rmatrix: mat3;
  RmatrixInverse: mat3;
  pos: vec3;
  type: number;
  id: number;
  constructor() {
    this.Rmatrix = m3.identity();
    this.RmatrixInverse = m3.identity();
    this.pos = [0, 0, 0];
    this.type = colliderTypes.Point;
    this.id = Collider.lastId++;
  }
  getType() {
    return this.type;
  }
  getRmatrix() {
    return this.Rmatrix;
  }
  setRmatrix(matrix: mat3) {
    this.Rmatrix = [...matrix];

    this.RmatrixInverse = m3.transpose(matrix);
  }
  getRmatrixInverse() {
    return this.RmatrixInverse;
  }
  getId() {
    return this.id;
  }
  setId(id: number): void {
    this.id = id;
  }
  translate(v: vec3) {
    this.pos = v3.sum(this.pos, v);
  }
  setTranslation(translation: vec3) {
    this.pos = [...translation];
  }
  getTranslation() {
    return this.pos;
  }
  rotate(r: vec3) {
    this.Rmatrix = m3.xRotate(this.Rmatrix, r[0]);
    this.Rmatrix = m3.yRotate(this.Rmatrix, r[1]);
    this.Rmatrix = m3.zRotate(this.Rmatrix, r[2]);
    this.RmatrixInverse = m3.transpose(this.Rmatrix);
  }
  setRotation(r: vec3) {
    this.Rmatrix = m3.xRotation(r[0]);
    this.Rmatrix = m3.yRotate(this.Rmatrix, r[1]);
    this.Rmatrix = m3.zRotate(this.Rmatrix, r[2]);
    this.RmatrixInverse = m3.transpose(this.Rmatrix);
  }
  getAABB() {
    const maxX = this.support(xAxis)[0];
    const maxY = this.support(yAxis)[1];
    const maxZ = this.support(zAxis)[2];

    const minX = this.support(xAxisNegative)[0];
    const minY = this.support(yAxisNegative)[1];
    const minZ = this.support(zAxisNegative)[2];
    return new AABB([minX, minY, minZ], [maxX, maxY, maxZ]);
  }

  getM4() {
    const m = m4.m3Tom4(this.Rmatrix);
    m[12] = this.pos[0];
    m[13] = this.pos[1];
    m[14] = this.pos[2];
    m[15] = 1;
    return m;
  }
  localToGlobal(v: vec3) {
    let global = m3.transformPoint(this.Rmatrix, v);
    return v3.sum(this.pos, global);
  }
  getClosestFaceByNormal(normal: vec3) {
    return {
      vertices: [this.pos],
      normal: v3.scale(normal, -1),
    };
  }
  getInverseInertiaTensor(mass: number) {
    return m3.identity();
  }
  support(dir?: vec3) {
    return this.pos;
  }
}

class Box extends Collider {
  /*


        
        4-------5
       /       /
      /       /
     7-------6
     |  0-------1
     | /       /
     |/       /
     3-------2
  */

  static points: Tuple<vec3, 8> = [
    [-1 / 2, -1 / 2, -1 / 2], //0
    [1 / 2, -1 / 2, -1 / 2], //1
    [1 / 2, -1 / 2, 1 / 2], //2
    [-1 / 2, -1 / 2, 1 / 2], //3
    [-1 / 2, 1 / 2, -1 / 2], //4
    [1 / 2, 1 / 2, -1 / 2], //5
    [1 / 2, 1 / 2, 1 / 2], //6
    [-1 / 2, 1 / 2, 1 / 2], //7
  ];
  static indices: Tuple<Tuple<number, 4>, 6> = [
    [0, 4, 5, 1], // -z
    [3, 7, 6, 2], // +z
    [0, 1, 2, 3], // -y
    [4, 5, 6, 7], // +y
    [0, 3, 7, 4], // -x
    [1, 2, 6, 5], // +x
  ];
  static normals: Tuple<vec3, 6> = [
    [0, 0, -1],
    [0, 0, 1],
    [0, -1, 0],
    [0, 1, 0],
    [-1, 0, 0],
    [1, 0, 0],
  ];
  min: vec3;
  max: vec3;
  scale: vec3;

  constructor(a = 1, b = 1, c = 1) {
    super();
    this.type = colliderTypes.Box
    this.scale = [a, b, c];
    this.min = [-a / 2, -b / 2, -c / 2];
    this.max = [a / 2, b / 2, c / 2];
  }

  getAABB() {
    const maxX = this.support(xAxis)[0];
    const maxY = this.support(yAxis)[1];
    const maxZ = this.support(zAxis)[2];

    const minX = this.support(xAxisNegative)[0];
    const minY = this.support(yAxisNegative)[1];
    const minZ = this.support(zAxisNegative)[2];
    return new AABB([minX, minY, minZ], [maxX, maxY, maxZ]);
  }

  support(dir: vec3) {
    const _dir = m3.transformPoint(this.RmatrixInverse, dir);

    const res: vec3 = [0, 0, 0];

    res[0] = _dir[0] > 0 ? this.max[0] : this.min[0];
    res[1] = _dir[1] > 0 ? this.max[1] : this.min[1];
    res[2] = _dir[2] > 0 ? this.max[2] : this.min[2];

    const sup = m3.transformPoint(this.Rmatrix, res);

    return v3.sum(sup, this.pos);
  }
  getInverseInertiaTensor(mass: number) {
    const i1 =
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
    );

    return m;
  }
  getM4() {
    const m = m4.m3Tom4(this.Rmatrix);
    m[12] = this.pos[0];
    m[13] = this.pos[1];
    m[14] = this.pos[2];
    m[15] = 1;
    const scale = v3.diff(this.max, this.min);
    return m4.scale(m, ...scale);
  }

  getClosestFaceByNormal(normal: vec3) {
    const { Rmatrix } = this;
    const globalNormals = Box.normals.map((n) => m3.transformPoint(Rmatrix, n));
    let minDot = v3.dot(normal, globalNormals[0]);
    let index = 0;
    for (let i = 1, n = globalNormals.length; i < n; i++) {
      //const _normal = m3.transformPoint(Rmatrix, normals[i])
      const _dot = v3.dot(globalNormals[i], normal);
      if (_dot < minDot) {
        minDot = _dot;
        index = i;
      }
    }
    const faceIndices = Box.indices[index];
    const m = this.getM4();
    return {
      vertices: faceIndices.map((i) => m4.transformPoint(m, Box.points[i])),
      normal: globalNormals[index],
    };
  }
}
class Sphere extends Collider {
  radius: number;

  constructor(radius = 1) {
    super();
    this.radius = radius;
    this.type = colliderTypes.Sphere;
  }
  getAABB() {
    const { radius } = this;
    return new AABB(
      v3.sum(this.pos, [-radius, -radius, -radius]),
      v3.sum(this.pos, [radius, radius, radius])
    );
  }
  support(dir: vec3) {
    return v3.sum(v3.scale(v3.normalize(dir), this.radius), this.pos);
  }
  getM4() {
    const m = m4.m3Tom4(this.Rmatrix);
    m[12] = this.pos[0];
    m[13] = this.pos[1];
    m[14] = this.pos[2];
    m[15] = 1;
    const { radius } = this;
    return m4.scale(m, radius, radius, radius);
  }
  getClosestFaceByNormal(normal: vec3) {
    const reverse = v3.scale(normal, -1);
    return { vertices: [v3.scale(reverse, this.radius)], normal: reverse };
  }
  getInverseInertiaTensor(mass: number) {
    const { radius } = this;
    const m: mat3 = [
      (2 * mass * radius * radius) / 5,
      0,
      0,
      0,
      (2 * mass * radius * radius) / 5,
      0,
      0,
      0,
      (2 * mass * radius * radius) / 5,
    ];
    return m;
  }
}

class Cylinder extends Collider {
  radius: number;
  height: number;

  circlePoints: Array<vec3>;
  constructor(radius: number, height: number, numSegments: number = 6) {
    super();
    this.type = colliderTypes.Cylinder
    this.radius = radius;
    this.height = height;
    const segmentAngle = (2 * Math.PI) / numSegments;
    this.circlePoints = [...new Array(numSegments)].map((_, i) => [
      Math.cos(i * segmentAngle),
      0,
      Math.sin(i * segmentAngle),
    ]);
  }
  support(dir: vec3) {
    const _dir = m3.transformPoint(this.RmatrixInverse, dir);

    const dir_xz: vec3 = [_dir[0], 0, _dir[2]];
    const result = v3.scale(v3.normalize(dir_xz), this.radius);
    result[1] = _dir[1] > 0 ? this.height / 2 : -this.height / 2;

    return v3.sum(m3.transformPoint(this.Rmatrix, result), this.pos);
  }
  getM4() {
    const m = m4.m3Tom4(this.Rmatrix);
    m[12] = this.pos[0];
    m[13] = this.pos[1];
    m[14] = this.pos[2];
    m[15] = 1;
    const { radius, height } = this;
    return m4.scale(m, radius, height, radius);
  }
  getClosestFaceByNormal(normal: vec3) {
    const { Rmatrix, RmatrixInverse } = this;
    const _normal = m3.transformPoint(RmatrixInverse, v3.scale(normal, -1));
    const m = this.getM4();
    const cos = v3.dot(_normal, [0, 1, 0]);
    const sign = Math.sign(cos);

    if (cos * sign < 0.707) {
      const localNormal = v3.normalize([_normal[0], 0, _normal[2]]);
      const vertices = [
        m4.transformPoint(m, [_normal[0], 0.5, _normal[2]]),
        m4.transformPoint(m, [_normal[0], -0.5, _normal[2]]),
      ];

      return { vertices, normal: m3.transformPoint(Rmatrix, localNormal) };
    }
    const localNormal = v3.scale([0, 1, 0], sign);
    const vertices = this.circlePoints.map((p) =>
      m4.transformPoint(m, [p[0], sign * 0.5, p[2]])
    );

    return { vertices, normal: m3.transformPoint(Rmatrix, localNormal) };
  }
  getInverseInertiaTensor(mass: number) {
    const { radius, height } = this;
    const i1 = (mass / 12) * (3 * radius * radius + height * height);

    const i3 = (mass / 2) * radius * radius;

    const m = m3.multiply(
      m3.multiply(this.Rmatrix, [1 / i1, 0, 0, 0, 1 / i1, 0, 0, 0, 1 / i3]),
      this.RmatrixInverse
    );

    return m;
  }
  getAABB() {
    const { radius, height } = this;
    return new AABB(
      v3.sum(this.pos, [-radius, -height, -radius]),
      v3.sum(this.pos, [radius, height, radius])
    );
  }
}

class Triangle extends Collider {
  vertices: [vec3, vec3, vec3];
  normal: vec3;
  constructor(vertices: [vec3, vec3, vec3]) {
    super();
    this.type = colliderTypes.Triangle
    this.vertices = vertices;
    this.normal = v3.cross(
      v3.diff(vertices[0], vertices[1]),
      v3.diff(vertices[2], vertices[1])
    );
  }
  support(dir?: [number, number, number]): [number, number, number] {
    const dot1 = v3.dot(this.vertices[0], dir);
    const dot2 = v3.dot(this.vertices[1], dir);
    const dot3 = v3.dot(this.vertices[2], dir);
    let furthest = this.vertices[0];

    if (dot2 > dot1) {
      furthest = this.vertices[1];
      if (dot3 > dot2) furthest = this.vertices[2];
    }

    if (dot3 > dot1) furthest = this.vertices[2];

    if (v3.dot(dir, this.normal) < 0) furthest = v3.diff(furthest, this.normal);

    return furthest;
  }
  getClosestFaceByNormal(normal: vec3) {
    return {
      vertices: this.vertices,
      normal: this.normal,
    };
  }
}

export { Box, Sphere, Cylinder, Triangle, colliderTypes };
