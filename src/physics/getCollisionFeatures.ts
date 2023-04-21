import ICollider from "./models/ICollider";
import { vec3, v3, m3 } from "romanpppmath";
import { EPA, gjk } from "./gjk";
import config from "./config";
import { clipFaceVsFace, isInClockwise } from "./clipping";
import { Triangle, colliderTypes } from "./Collider";

/* //For debug!
const drawPolys = (_p1,_p2) =>{
    const canvas = document.getElementById("canvas2") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    
    const p1 = _p1.map(el => [100 + el[0] * 10, 100 + el[1]*10])
    const p2 = _p2.map(el => [100 + el[0] * 10, 100 + el[1]*10])

    
    const dir1 = isInClockwise(_p1);
    const dir2 = isInClockwise(_p2);
    console.log(_p1, dir1, _p2, dir2)
    console.log(clipFaceVsFace(_p1, _p2));

    ctx.beginPath(); // Start a new path
    ctx.moveTo(p1[0][0], p1[0][1]); // Move the pen to (30, 50)
    
    
    for(let i = 1; i < p1.length; i++) ctx.lineTo(p1[i][0], p1[i][1])
   //ctx.lineTo(p1[0][0], p1[0][1])
    ctx.stroke(); // Render the path
    
    ctx.moveTo(p2[0][0], p2[0][1]); // Move the pen to (30, 50)
    
    ctx.fillStyle = "rgb(255, 165, 0)";
    
    for(let i = 1; i < p2.length; i++) ctx.lineTo(p2[i][0], p2[i][1])
    //ctx.lineTo(p2[0][0], p2[0][1])
    ctx.stroke(); // Render the path
    
}
*/

const rayVsPlaneIntersec = (
  plane: [vec3, vec3],
  point: vec3,
  direction: vec3
) => {
  const [origin, normal] = plane;
  const _dot = v3.dot(normal, direction);
  const fromPointToOrigin = v3.diff(point, origin);
  const fac = v3.dot(fromPointToOrigin, normal) / _dot;
  return v3.diff(point, v3.scale(direction, fac));
};
const isPointBehindPlane = (origin: vec3, normal : vec3, point: vec3, sign = 1) => {
  //const [origin, normal] = plane;
  let _d = v3.dot(normal, v3.diff(point, origin)) * sign;

  return _d > 0 - config.CLIP_BIAS;
};
const pointOnPlaneProjection = (origin: vec3, normal : vec3, point: vec3) => {
  //const [origin, normal] = plane;
  const fromPointToOrigin = v3.diff(point, origin);
  const projAlongNormal = v3.dot(normal, fromPointToOrigin);

  return v3.diff(point, v3.scale(normal, projAlongNormal));
};
const clipPointsBehindPlane = (
  plane: [vec3, vec3],
  points: vec3[],
  sign: number = 1
) => {
  const [origin, normal] = plane;

  return points.filter(
    (point) =>
      v3.dot(normal, v3.diff(point, origin)) * sign + config.CLIP_BIAS > 0
  );
};

const get2DcoordsOnPlane = (
  i: vec3,
  j: vec3,
  point: vec3
): [number, number] => {
  return [v3.dot(i, point), v3.dot(j, point)];
};

const triangleVsCollider = (triangle: Triangle, collider: ICollider) => {
  const contactFace1 = [];
};

export default function getCollisionFeatures(
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
}[] {
  const collisionSimplex = gjk(coll1, coll2);
  if (!collisionSimplex) return [];
  let contactFace1: { vertices: vec3[]; normal: vec3 } = null;
  let contactFace2: { vertices: vec3[]; normal: vec3 } = null;
  let n: vec3 = null;
  let positionError : number = null
  if (coll1.getType() === colliderTypes.Triangle) {
    n = v3.scale(contactFace1.normal, -1);
  }
  if (coll2.getType() === colliderTypes.Triangle) {
    n = contactFace2.normal;
  }
  else {
    const contactData = EPA(
      collisionSimplex.a,
      collisionSimplex.b,
      collisionSimplex.c,
      collisionSimplex.d,
      collisionSimplex.originsMap,
      collisionSimplex.coll1,
      collisionSimplex.coll2
    );
    if(!contactData) return []
    n = contactData.n
    positionError = contactData.positionError
  }
  if(coll1.getType() === colliderTypes.Sphere){
    const PA = coll1.support(v3.scale(n, -1))
    const PB = v3.sum(PA, v3.scale(n, positionError))
    const rb = v3.diff(PB, coll2.getTranslation());
    const ra = v3.diff(PA, coll1.getTranslation());

    const raLocal = m3.transformPoint(coll1.getRmatrixInverse(), ra);
    const rbLocal = m3.transformPoint(coll2.getRmatrixInverse(), rb);
    const i: vec3 = [n[1] + n[2], n[2] - n[0], -n[0] - n[1]];

    const j = v3.cross(v3.scale(n, -1), i);
    return [
      {
        ra,
        rb,
        n,
        PA,
        PB,
        positionError,
        i,
        j,
        raLocal,
        rbLocal,
      },
    ];
  }
  if(coll2.getType() === colliderTypes.Sphere){
    const PB = coll1.support(n)
    const PA = v3.sum(PB, v3.scale(n, -positionError))
    const rb = v3.diff(PB, coll2.getTranslation());
    const ra = v3.diff(PA, coll1.getTranslation());

    const raLocal = m3.transformPoint(coll1.getRmatrixInverse(), ra);
    const rbLocal = m3.transformPoint(coll2.getRmatrixInverse(), rb);
    const i: vec3 = [n[1] + n[2], n[2] - n[0], -n[0] - n[1]];

    const j = v3.cross(v3.scale(n, -1), i);
    return [
      {
        ra,
        rb,
        n,
        PA,
        PB,
        positionError,
        i,
        j,
        raLocal,
        rbLocal,
      },
    ];
  }
 
  /*const { PA, PB, n, positionError } = contactData;

  if (
    coll1.getType() === colliderTypes.Sphere ||
    coll2.getType() === colliderTypes.Sphere
  ) {
    const rb = v3.diff(PB, coll2.getTranslation());
    const ra = v3.diff(PA, coll1.getTranslation());

    const raLocal = m3.transformPoint(coll1.getRmatrixInverse(), ra);
    const rbLocal = m3.transformPoint(coll2.getRmatrixInverse(), rb);
    const i: vec3 = [n[1] + n[2], n[2] - n[0], -n[0] - n[1]];

    const j = v3.cross(v3.scale(n, -1), i);
    return [
      {
        ra,
        rb,
        n,
        PA,
        PB,
        positionError,
        i,
        j,
        raLocal,
        rbLocal,
      },
    ];
  }
*/
  const nReverse = v3.scale(n, -1);

  contactFace1 = coll1.getClosestFaceByNormal(nReverse);
  contactFace2 = coll2.getClosestFaceByNormal(n);
  const plane: [vec3, vec3] = [[0,0,0], n];
 //const plane: [vec3, vec3] = [v3.scale(v3.sum(PA, PB), 0.5), n];
  const projections1 = contactFace1.vertices.map((p) =>
    pointOnPlaneProjection([0,0,0], n, p)
  );
  const projections2 = contactFace2.vertices.map((p) =>
    pointOnPlaneProjection([0,0,0], n, p)
  );

  const origin = plane[0];
  const i = v3.normalize([n[1] + n[2], n[2] - n[0], -n[0] - n[1]]);

  const j = v3.cross(v3.scale(n, -1), i);

  let _2d1 = projections1.map((p) =>
    get2DcoordsOnPlane(i, j, v3.diff(p, origin))
  );
  let _2d2 = projections2.map((p) =>
    get2DcoordsOnPlane(i, j, v3.diff(p, origin))
  );

  if (isInClockwise(_2d1)) _2d1 = _2d1.map((_, i) => _2d1.at(-i));
  if (isInClockwise(_2d2)) _2d2 = _2d2.map((_, i) => _2d2.at(-i));

  let clipped = clipFaceVsFace(_2d1, _2d2);
  if (clipped.length === 0) clipped = clipFaceVsFace(_2d2, _2d1);
  const _3d = clipped.map((p) =>
    v3.sum(origin, v3.sum(v3.scale(i, p[0]), v3.scale(j, p[1])))
  );

  const features = [];
  _3d.forEach((point) => {
    const PA = rayVsPlaneIntersec(
      [contactFace1.vertices[0], contactFace1.normal],
      point,
      n
    );
    if (!isPointBehindPlane(contactFace2.vertices[0], contactFace2.normal, PA, -1)) return;
    const PB = rayVsPlaneIntersec(
      [contactFace2.vertices[0], contactFace2.normal],
      point,
      n
    );
    if (!isPointBehindPlane(contactFace1.vertices[0], contactFace1.normal, PB, -1)) return;

    const rb = v3.diff(PB, coll2.getTranslation());
    const ra = v3.diff(PA, coll1.getTranslation());
    const positionError = -v3.dot(v3.diff(PB, PA), n);
    const raLocal = m3.transformPoint(coll1.getRmatrixInverse(), ra);
    const rbLocal = m3.transformPoint(coll2.getRmatrixInverse(), rb);

    features.push({
      ra,
      rb,
      n,
      PA,
      PB,
      positionError,
      i,
      j,
      raLocal,
      rbLocal,
    });
  });
  /*
    if (features.length === 0) {
       
      //  drawPolys(_2d1, _2d2)
       // throw 1
        const rb = v3.diff(PB, coll2.getTranslation());
        const ra =  v3.diff(PA, coll1.getTranslation());
        const raLocal = m3.transformPoint(coll1.getRmatrixInverse(), ra);
        const rbLocal = m3.transformPoint(coll2.getRmatrixInverse(), rb);
        features.push(
          {
            ra, rb, n, PA, PB, positionError, i, j, raLocal, rbLocal
          }
        );
      }
      */
  return features;
}
