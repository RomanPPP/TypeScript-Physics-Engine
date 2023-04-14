import { AABB, vec3,v3 } from "romanpppmath";

export default class Octree extends AABB {
    elements : AABB[]
    children : Octree[]
    diagonal : vec3
    center : vec3
    capacity : number
    constructor(min : vec3, max : vec3) {
        super(min, max)
        this.diagonal = v3.diff(max, min)
        this.center = v3.scale(v3.sum(max, min),0.5);
        this.elements = [];
        this.children = [];
        this.capacity = 4;
    }
    subdivide() {
   
        const [x1, y1, z1] = this.min;
        const [x2, y2, z2] = this.max;
        const xc = this.center[0];
        const yc = this.center[1];
        const zc = this.center[2];
        this.children[0] = new Octree([x1, y1, z1], [xc, yc, zc]);
        this.children[1] = new Octree([x1, y1, zc], [xc, yc, z2]);
        this.children[2] = new Octree([x1, yc, z1], [xc, y2, zc]);
        this.children[3] = new Octree([x1, yc, zc], [xc, y2, z2]);
        this.children[4] = new Octree([xc, y1, z1], [x2, yc, zc]);
        this.children[5] = new Octree([xc, y1, zc], [x2, yc, z2]);
        this.children[6] = new Octree([xc, yc, z1], [x2, y2, zc]);
        this.children[7] = new Octree([xc, yc, zc], [x2, y2, z2]);
    }
    insert(voxel) {
        if (this.elements.length < this.capacity) {
            this.elements.push(voxel);
            return;
        }
        if (this.children.length === 0)
            this.subdivide();
        const xc = this.center[0];
        const yc = this.center[1];
        const zc = this.center[2];
        const x = Number(voxel[0] > xc) * 4;
        const y = Number(voxel[1] > yc) * 2;
        const z = Number(voxel[2] > zc);
        const idx = z | y | x;
        this.children[idx].insert(voxel);
    }
    query(aabb) {
        const found = [];
        if (!isCollide(this.aabb, aabb)) {
            return found;
        }
        this.elements.forEach(element => {
            const _aabb = new AABB(v3.sum(element, [-0.5, -0.5, -0.5]), v3.sum(element, [0.5, 0.5, 0.5]));
            if (isCollide(aabb, _aabb)) {
                found.push(element);
            }
        });
        this.children.forEach(child => {
            found.push(...child.query(aabb));
        });
        return found;
    }
}