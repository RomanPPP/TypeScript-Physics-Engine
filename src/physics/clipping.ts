import {Tuple} from 'romanpppmath'

type vec2 = Tuple<number, 2>

const isInside = (p1 :vec2, p2 :vec2, q : vec2) => {
  const R = (p2[0] - p1[0]) * (q[1] - p1[1]) - (p2[1] - p1[1]) * (q[0] - p1[0]);
  return R <= 0 + 0.001;
};

const dot = (a, b) => a[0] * b[0] + a[1] * b[1];

const isInClockwise = (points : Array<vec2>) => {
  if (points.length < 3) return 1;
  const [p1, p2, p3] = points;
  const det =
    p2[0] * p3[1] +
    p3[0] * p1[1] +
    p1[0] * p2[1] -
    p1[0] * p1[1] -
    p3[0] * p2[1] -
    p1[0] * p3[1];

  if (det < 0) return 1;
  return -1;
};

const computeIntersection = (p1 : vec2, p2 : vec2, p3 : vec2, p4 : vec2) : vec2=> {
  if (p2[0] - p1[0] === 0) {
    const x = p1[0];

    const m2 = (p4[1] - p3[1]) / (p4[0] - p3[0]);
    const b2 = p3[1] - m2 * p3[0];

    const y = m2 * x + b2;
    return [x, y];
  }
  if (p4[0] - p3[0] === 0) {
    const x = p3[0];

    const m1 = (p2[1] - p1[1]) / (p2[0] - p1[0]);
    const b1 = p1[1] - m1 * p1[0];

    const y = m1 * x + b1;

    return [x, y];
  }
  const m1 = (p2[1] - p1[1]) / (p2[0] - p1[0]);
  const b1 = p1[1] - m1 * p1[0];

  const m2 = (p4[1] - p3[1]) / (p4[0] - p3[0]);
  const b2 = p3[1] - m2 * p3[0];

  const x = (b2 - b1) / (m1 - m2);

  const y = m1 * x + b1;

  return [x, y];
};

const clipPolyVsPoly = (A : Array<vec2>, B : Array<vec2>) : Array<vec2> => {
  let result = [...A];

  for (let i = 0, n = B.length; i < n; i++) {
    const next = [...result];
    result = [];
    const aEdge1 = B.at(i - 1);
    const aEdge2 = B.at(i);

    for (let j = 0, _n = next.length; j < _n; j++) {
      const bEdge1 = next.at(j - 1);
      const bEdge2 = next.at(j);

      if (isInside(aEdge1, aEdge2, bEdge2)) {
        if (!isInside(aEdge1, aEdge2, bEdge1)) {
          const intersection = computeIntersection(
            bEdge1,
            bEdge2,
            aEdge1,
            aEdge2
          );
          result.push(intersection);
        }
        result.push(bEdge2);
        continue;
      }
      if (isInside(aEdge1, aEdge2, bEdge1)) {
        const intersection = computeIntersection(
          bEdge1,
          bEdge2,
          aEdge1,
          aEdge2
        );
        result.push(intersection);
      }
    }
  }
  return result;
};

const lerp = (a : number, b : number, t : number) => a + (b - a) * t;

const clipSegmentVsSegment = (s1 : Tuple<vec2, 2>, s2 :Tuple<vec2, 2>) : Array<vec2> => {
  const [p1, p2] = s1
  const [p3, p4] = s2
  const top =
    (p4[0] - p3[0]) * (p1[1] - p3[1]) - (p4[1] - p3[1]) * (p1[0] - p3[0]);
  const bottom =
    (p4[1] - p3[1]) * (p2[0] - p1[0]) - (p4[0] - p3[0]) * (p2[1] - p1[1]);
  if (!bottom) return [];
  const t = top / bottom;
  if (t < 0 || t > 1) return [];
  return [[lerp(p1[0], p2[0], t), lerp(p1[1], p2[1], t)]];
};

const clipPointVsPoly = (point : vec2, vertices : Array<vec2>) : Array<vec2> => {
  const x = point[0];
  const y = point[1];

  let inside = false;
  for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
    const xi = vertices[i][0],
      yi = vertices[i][1];
    const xj = vertices[j][0],
      yj = vertices[j][1];

    const intersect =
      yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return [point];
};
const clipSegmentVsPoly = (segment : Tuple<vec2, 2>, poly : Array<vec2>) : Array<vec2> => {
  const [p1, p2] = segment;
  const points : Array<vec2> = [];
  if (clipPointVsPoly(p1, poly)) points.push(p1);
  if (clipPointVsPoly(p2, poly)) points.push(p2);
  if (points.length > 1) return points;
  for (let i = 0, n = poly.length; i < n; i++) {
    const q1 = poly.at(i - 1);
    const q2 = poly.at(i);
    const intersection = clipSegmentVsSegment([p1, p2], [q1, q2]);
    if (intersection.length > 0) points.push(intersection[0]);
  }
  return points;
};

const pairHash = (x : number, y : number) =>
      x === Math.max(x, y) ? x * x + y + x  : y * x  + y;

const POLY = 3
const SEGMENT = 2
const POINT = 1

const faceTypeMap : {[key : number] : (...args) => Array<vec2>} = {}

faceTypeMap[pairHash(POLY,POLY)] = clipPolyVsPoly
faceTypeMap[pairHash(SEGMENT, POLY)] = clipSegmentVsPoly
faceTypeMap[pairHash(SEGMENT, SEGMENT)] = clipSegmentVsSegment
faceTypeMap[pairHash(POINT, POLY)] = (face1, face2) =>clipPointVsPoly(face1[0], face2)

function clipFaceVsFace (face1 : Array<vec2>, face2 : Array<vec2>){
  
  const type1 = Math.min(face1.length, POLY)
  const type2 = Math.min(face2.length, POLY)
  let args = [face1, face2]
  if(type1 > type2){
    return faceTypeMap[pairHash(type2, type1)](arguments[1], arguments[0])
  }
  return faceTypeMap[pairHash(type1, type2)](arguments[0], arguments[1])

}

export {
  clipSegmentVsSegment,
  isInside,
  computeIntersection,
  clipPolyVsPoly,
  clipFaceVsFace,
  isInClockwise,
  clipSegmentVsPoly,
  clipPointVsPoly,
};
