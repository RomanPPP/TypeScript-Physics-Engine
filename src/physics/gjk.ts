import { v3, m3, m4, vec3, Tuple } from "romanpppmath";
import { clipFaceVsFace, isInClockwise } from "./clipping";
import ICollider from "./models/ICollider";
import { ContactConstraint } from "./Constraints";

const { dot, cross, normalize, sum, diff, scale, isNull, norm } = v3;

import config from "./config";
const {CLIP_BIAS, GJK_MAX_ITERATIONS_NUM, EPA_BIAS} = config


type plane = [vec3, vec3];

const rayVsPlaneIntersec = (plane: plane, point: vec3, direction: vec3) => {
  const [origin, normal] = plane;
  const _dot = dot(normal, direction);
  const fromPointToOrigin = diff(point, origin);
  const fac = dot(fromPointToOrigin, normal) / _dot;
  return diff(point, scale(direction, fac));
};
const isPointBehindPlane = (plane: plane, point: vec3, sign = 1) => {
  const [origin, normal] = plane;
  let _d = dot(normal, diff(point, origin)) * sign
  
  return _d > 0 - CLIP_BIAS;
};
const pointOnPlaneProjection = (plane: plane, point: vec3) => {
  const [origin, normal] = plane;
  const fromPointToOrigin = diff(point, origin);
  const projAlongNormal = dot(normal, fromPointToOrigin);

  return diff(point, scale(normal, projAlongNormal));
};
const clipPointsBehindPlane = (
  plane: plane,
  points: Array<vec3>,
  sign: number = 1
) => {
  const [origin, normal] = plane;

  return points.filter(
    (point) => dot(normal, diff(point, origin)) * sign + CLIP_BIAS > 0
  );
};

const get2DcoordsOnPlane = (
  i: vec3,
  j: vec3,
  point: vec3
): Tuple<number, 2> => {
  return [dot(i, point), dot(j, point)];
};

interface IProps {
  a: vec3;
  b: vec3;
  c: vec3;
  d: vec3;
  search_dir: vec3;
  simp_dim: number;
}

function update_simplex3(props: IProps) {
  const n = cross(diff(props.b, props.a), diff(props.c, props.a));
  const AO = scale(props.a, -1);

  props.simp_dim = 2;
  if (dot(cross(diff(props.b, props.a), n), AO) > 0) {
    props.c = props.a;
    props.search_dir = cross(
      cross(diff(props.b, props.a), AO),
      diff(props.b, props.a)
    );
    return;
  }
  if (dot(cross(n, diff(props.c, props.a)), AO) > 0) {
    props.b = props.a;
    props.search_dir = cross(
      cross(diff(props.c, props.a), AO),
      diff(props.c, props.a)
    );
    return;
  }
  props.simp_dim = 3;
  if (dot(n, AO) > 0) {
    props.d = props.c;
    props.c = props.b;
    props.b = props.a;
    props.search_dir = n;
    return;
  }
  props.d = props.b;
  props.b = props.a;
  props.search_dir = scale(n, -1);
  return;
}
function update_simplex4(props: IProps) {
  const ABC = cross(diff(props.b, props.a), diff(props.c, props.a));
  const ACD = cross(diff(props.c, props.a), diff(props.d, props.a));
  const ADB = cross(diff(props.d, props.a), diff(props.b, props.a));
  const AO = scale(props.a, -1);
  props.simp_dim = 3;

  if (dot(ABC, AO) > 0) {
    props.d = props.c;
    props.c = props.b;
    props.b = props.a;
    props.search_dir = ABC;
    return false;
  }

  if (dot(ACD, AO) > 0) {
    props.b = props.a;
    props.search_dir = ACD;
    return false;
  }

  if (dot(ADB, AO) > 0) {
    props.c = props.d;
    props.d = props.b;
    props.b = props.a;
    props.search_dir = ADB;
    return false;
  }
  return true;
}

function gjk(
  coll1: ICollider,
  coll2: ICollider
): null | { PA: vec3; PB: vec3; n: vec3; positionError: number } {
  const props: IProps = {
    a: [0, 0, 0],
    b: [0, 0, 0],
    c: [0, 0, 0],
    d: [0, 0, 0],
    search_dir: [0, 0, 0],
    simp_dim: 0,
  };

  const originsMap = new Map<vec3, [vec3, vec3]>();

  let mtv = [0, 0, 0];

  props.search_dir = diff(coll1.pos, coll2.pos);
  const c_origin1 = coll1.support(scale(props.search_dir, -1));
  const c_origin2 = coll2.support(props.search_dir);
  props.c = diff(c_origin2, c_origin1);

  originsMap.set(props.c, [c_origin1, c_origin2]);

  props.search_dir = scale(props.c, -1);

  const b_origin1 = coll1.support(scale(props.search_dir, -1));
  const b_origin2 = coll2.support(props.search_dir);
  props.b = diff(b_origin2, b_origin1);

  originsMap.set(props.b, [b_origin1, b_origin2]);

  if (dot(props.b, props.search_dir) < 0) {
    return null;
  }

  props.search_dir = cross(
    cross(diff(props.c, props.b), scale(props.b, -1)),
    diff(props.c, props.b)
  );

  if (isNull(props.search_dir)) {
    props.search_dir = cross(diff(props.c, props.b), [1, 0, 0]);

    if (isNull(props.search_dir)) {
      props.search_dir = cross(diff(props.c, props.b), [0, 0, -1]);
    }
  }

  props.simp_dim = 2;
  for (let i = 0; i < GJK_MAX_ITERATIONS_NUM; ++i) {
    const a_origin1 = coll1.support(scale(props.search_dir, -1));
    const a_origin2 = coll2.support(props.search_dir);
    props.a = diff(a_origin2, a_origin1);

    originsMap.set(props.a, [a_origin1, a_origin2]);
    if (dot(props.a, props.search_dir) < 0) return null;

    props.simp_dim++;
    if (props.simp_dim === 3) {
      update_simplex3(props);
    } else if (update_simplex4(props)) {
    
      return EPA(props.a, props.b, props.c, props.d, originsMap, coll1, coll2);
    }
  }
  return null;
}

const baricentric = (face: Tuple<vec3, 4>, point: vec3) => {
  let a11 = face[0][0];
  let a12 = face[1][0];
  let a13 = face[2][0];
  let b1 = point[0];
  let a21 = face[0][1];
  let a22 = face[1][1];
  let a23 = face[2][1];
  let b2 = point[1];
  let a31 = face[0][2];
  let a32 = face[1][2];
  let a33 = face[2][2];
  let b3 = point[2];

  const d =
    a11 * a22 * a33 +
    a21 * a32 * a13 +
    a12 * a23 * a31 -
    a13 * a22 * a31 -
    a21 * a12 * a33 -
    a32 * a23 * a11;

  const d1 =
    b1 * a22 * a33 +
    b2 * a32 * a13 +
    a12 * a23 * b3 -
    a13 * a22 * b3 -
    b2 * a12 * a33 -
    a32 * a23 * b1;

  const d2 =
    a11 * b2 * a33 +
    a21 * b3 * a13 +
    b1 * a23 * a31 -
    a13 * b2 * a31 -
    a11 * b3 * a23 -
    a21 * b1 * a33;

  const d3 =
    a11 * a22 * b3 +
    a21 * a32 * b1 +
    a12 * b2 * a31 -
    b1 * a22 * a31 -
    a21 * a12 * b3 -
    b2 * a32 * a11;

  return [d1 / d, d2 / d, d3 / d];
};
const originToFaceProj = (face: Tuple<vec3, 4>): vec3 => {
  const normal = face[3];
  const point = face[0];
  const c = -normal[0] * point[0] - normal[1] * point[1] - normal[2] * point[2];
  const t =
    -c /
    (normal[0] * normal[0] + normal[1] * normal[1] + normal[2] * normal[2]);
  return [t * normal[0], t * normal[1], t * normal[2]];
};

const MAX_NUM_FACES = 64;
const MAX_NUM_LOOSE_EDGES = 32;
const EPA_MAX_NUM_ITER = 64;
const EPA = (
  a: vec3,
  b: vec3,
  c: vec3,
  d: vec3,
  originsMap: Map<vec3, [vec3, vec3]>,
  coll1: ICollider,
  coll2: ICollider
): null | { PA: vec3; PB: vec3; n: vec3; positionError: number } => {
  const faces = [];
  for (let i = 0; i < 4; i++) {
    faces[i] = [];
  }

  faces[0][0] = a;
  faces[0][1] = b;
  faces[0][2] = c;
  faces[0][3] = normalize(cross(diff(b, a), diff(c, a)));
  faces[1][0] = a;
  faces[1][1] = c;
  faces[1][2] = d;
  faces[1][3] = normalize(cross(diff(c, a), diff(d, a)));
  faces[2][0] = a;
  faces[2][1] = d;
  faces[2][2] = b;
  faces[2][3] = normalize(cross(diff(d, a), diff(b, a)));
  faces[3][0] = b;
  faces[3][1] = d;
  faces[3][2] = c;
  faces[3][3] = normalize(cross(diff(d, b), diff(c, b)));

  let num_faces = 4;
  let closest_face = null;
  let search_dir: vec3;

  let p: vec3;
  for (let iteration = 0; iteration < EPA_MAX_NUM_ITER; ++iteration) {
    let min_dist = dot(faces[0][0], faces[0][3]);

    closest_face = 0;
    for (let i = 0; i < num_faces; ++i) {
      let dist = dot(faces[i][0], faces[i][3]);
      if (dist < min_dist) {
        min_dist = dist;
        closest_face = i;
      }
    }
    search_dir = faces[closest_face][3];

    const p_origin1 = coll1.support(scale(search_dir, -1));
    const p_origin2 = coll2.support(search_dir);
    p = diff(p_origin2, p_origin1);
    originsMap.set(p, [p_origin1, p_origin2]);

    if (dot(p, search_dir) - min_dist < EPA_BIAS) {
      const face = faces[closest_face];

      const point = originToFaceProj(face);

      const [Aa, Ba] = originsMap.get(face[0]);
      //const Aa = face[0].oa
      //const Ba = face[0].ob
      const [Ab, Bb] = originsMap.get(face[1]);
      //const Ab = face[1].oa
      //const Bb = face[1].ob
      const [Ac, Bc] = originsMap.get(face[2]);
      //const Ac = face[2].oa
      //const Bc = face[2].ob

      const result = baricentric(face, point);

      if (isNaN(result[0] + result[1] + result[2])) {
        return null;
      }

      let PA = sum(
        sum(scale(Aa, result[0]), scale(Ab, result[1])),
        scale(Ac, result[2])
      );
      //Aa.multiply(result[0]).add(Ab.multiply(result[1])).add(Ac.multiply(result[2]))
      let PB = sum(
        sum(scale(Ba, result[0]), scale(Bb, result[1])),
        scale(Bc, result[2])
      );
      //Ba.multiply(result[0]).add(Bb.multiply(result[1])).add(Bc.multiply(result[2]))

      //const ra = PA.substract(coll1.pos)

      const n = normalize(scale(face[3], -dot(p, search_dir)));
      //if (norm(n) < 0.01) return null;
      const positionError = -dot(diff(PB, PA), n);

      return { PA, PB, n, positionError };
    }

    const loose_edges = [];
    let num_loose_edges = 0;
    for (let i = 0; i < num_faces; ++i) {
      if (dot(faces[i][3], diff(p, faces[i][0])) > 0) {
        for (let j = 0; j < 3; j++) {
          let current_edge = [faces[i][j], faces[i][(j + 1) % 3]];
          let found_edge = false;
          for (let k = 0; k < num_loose_edges; k++) {
            if (
              loose_edges[k][1] === current_edge[0] &&
              loose_edges[k][0] === current_edge[1]
            ) {
              loose_edges[k][0] = loose_edges[num_loose_edges - 1][0];
              loose_edges[k][1] = loose_edges[num_loose_edges - 1][1];
              num_loose_edges--;
              found_edge = true;
              k = num_loose_edges;
            }
          }
          if (!found_edge) {
            if (num_loose_edges >= MAX_NUM_LOOSE_EDGES) break;

            loose_edges[num_loose_edges] = [];
            loose_edges[num_loose_edges][0] = current_edge[0];
            loose_edges[num_loose_edges][1] = current_edge[1];
            num_loose_edges++;
          }
        }
        faces[i][0] = faces[num_faces - 1][0];
        faces[i][1] = faces[num_faces - 1][1];
        faces[i][2] = faces[num_faces - 1][2];
        faces[i][3] = faces[num_faces - 1][3];
        num_faces--;
        i--;
      }
    }
    for (let i = 0; i < num_loose_edges; i++) {
      if (num_faces >= MAX_NUM_FACES) break;
      faces[num_faces] = [];
      faces[num_faces][0] = loose_edges[i][0];
      faces[num_faces][1] = loose_edges[i][1];
      faces[num_faces][2] = p;

      faces[num_faces][3] = normalize(
        cross(
          diff(loose_edges[i][0], loose_edges[i][1]),
          diff(loose_edges[i][0], p)
        )
      );

      if (dot(faces[num_faces][0], faces[num_faces][3]) + 0.01 < 0) {
        const temp = faces[num_faces][0];
        faces[num_faces][0] = faces[num_faces][1];
        faces[num_faces][1] = temp;
        faces[num_faces][3] = scale(faces[num_faces][3], -1);
      }
      num_faces++;
    }
  }

  return null;
};

const gjkScope = {};
const _gjk = gjk.bind(gjkScope);

const getContacts = (
  coll1: ICollider,
  coll2: ICollider
): {
  raLocal: vec3;
  rbLocal: vec3;
  ra: vec3;
  rb: vec3;
  PA: vec3;
  PB: vec3;
  n: vec3;
  positionError: number;
  i: vec3;
  j: vec3;
}[] => {
  const contactData = gjk(coll1, coll2);
  if (!contactData) return [];

  const { PA, PB, n, positionError } = contactData;


  if (coll1.type === "sphere" || coll2.type === "sphere") {
    const rb = diff(PB, coll2.pos);
    const ra = diff(PA, coll1.pos);

    const raLocal = m3.transformPoint(coll1.RmatrixInverse, ra);
    const rbLocal = m3.transformPoint(coll2.RmatrixInverse, rb);
    const i: vec3 = [n[1] + n[2], n[2] - n[0], -n[0] - n[1]];

    const j = cross(scale(n, -1), i);
    return [
      {
        ra, rb, n, PA, PB, positionError, i, j, raLocal, rbLocal
      }
    ];
  }
  
  const nReverse = scale(n, -1);

  const contactFace1 = coll1.getClosestFaceByNormal(nReverse);
  const contactFace2 = coll2.getClosestFaceByNormal(n);

  const plane: plane = [scale(sum(PA, PB), 0.5), n];
  const projections1 = contactFace1.vertices.map((p) =>
    pointOnPlaneProjection(plane, p)
  );
  const projections2 = contactFace2.vertices.map((p) =>
    pointOnPlaneProjection(plane, p)
  );

  const origin = plane[0];
  const i = normalize([n[1] + n[2], n[2] - n[0], -n[0] - n[1]]);

  const j = cross(scale(n, -1), i);

  let _2d1 = projections1.map((p) => get2DcoordsOnPlane(i, j, diff(p, origin)));
  let _2d2 = projections2.map((p) => get2DcoordsOnPlane(i, j, diff(p, origin)));

  const dir1 = isInClockwise(_2d1);
  const dir2 = isInClockwise(_2d2);
  if (dir1 < 0) _2d1 = _2d1.map((_, i) => _2d1.at(-i));
  if (dir2 < 0) _2d2 = _2d2.map((_, i) => _2d2.at(-i));

  const clipped = clipFaceVsFace(_2d1, _2d2);

  const _3d = clipped.map((p) =>
    sum(origin, sum(scale(i, p[0]), scale(j, p[1])))
  );

  const features = [];
  _3d.forEach((point) => {
    const PA = rayVsPlaneIntersec(
      [contactFace1.vertices[0], contactFace1.normal],
      point,
      n
    );
    if (!isPointBehindPlane(plane, PA, 1)) return;
    const PB = rayVsPlaneIntersec(
      [contactFace2.vertices[0], contactFace2.normal],
      point,
      n
    );
    if (!isPointBehindPlane(plane, PB, -1)) return;

    const rb = diff(PB, coll2.pos);
    const ra = diff(PA, coll1.pos);
    const positionError = -dot(diff(PB, PA), n);
    const raLocal = m3.transformPoint(coll1.RmatrixInverse, ra);
    const rbLocal = m3.transformPoint(coll2.RmatrixInverse, rb);

    features.push(
      {
        ra, rb, n, PA, PB, positionError, i, j, raLocal, rbLocal
      }
    );
  });

  if (features.length === 0) {
    const rb = diff(PB, coll2.pos);
    const ra = diff(PA, coll1.pos);
    const raLocal = m3.transformPoint(coll1.RmatrixInverse, ra);
    const rbLocal = m3.transformPoint(coll2.RmatrixInverse, rb);
    features.push(
      {
        ra, rb, n, PA, PB, positionError, i, j, raLocal, rbLocal
      }
    );
  }

  return features;
};

export {
  getContacts,
  pointOnPlaneProjection,
  clipPointsBehindPlane,
  get2DcoordsOnPlane,
  rayVsPlaneIntersec,
};
