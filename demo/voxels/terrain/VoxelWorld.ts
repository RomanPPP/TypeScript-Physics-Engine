import Simulation from "../../../src/physics/Simulation";
import IRigidBody from "../../../src/physics/models/IRigidBody";
import HashGrid from "../../../src/physics/HashGrid";
import Tree from "../../../src/physics/Tree";
import { v3, vec3 } from "romanpppmath";
import AABB from "../../../src/physics/AABB";
import getCollisionFeatures from "../../../src/physics/getCollisionFeatures";
import ContactManifold from "../../../src/physics/ContactManifold";
export default class VoxelWorld extends Simulation {
  //hashGrid : HashGrid<IRigidBody>
  hashGridTree: Tree<HashGrid<IRigidBody>>;
  voxelSize: number;
  chunkSize: number;
  constructor(voxelSize = 1, chunkSize = 32) {
    super();
    this.voxelSize = voxelSize;
    this.chunkSize = chunkSize;
    this.hashGridTree = new Tree<HashGrid<IRigidBody>>();
    this.hashGridTree.setKey(hashGrid => hashGrid.aabb.min.join(''))
  }
  getChunkAABB(position: vec3) {
    const width = this.voxelSize * this.chunkSize;
    const weights = v3.scale(position, 1 / width);
    const min = weights.map((w) => Math.floor(w) * width) as vec3;
    const max = weights.map((w) => Math.ceil(w) * width) as vec3;
    return new AABB(min, max);
  }
  setBlock(x: number, y: number, z: number, block: IRigidBody) {
   /* x = Math.floor(x) ;
    y = Math.floor(y);
    z = Math.floor(y);*/
    let chunk = this.hashGridTree.pick([x, y, z])[0];
    if (!chunk) {
      const aabb = this.getChunkAABB([x, y, z]);
      chunk = new HashGrid<IRigidBody>(aabb, this.voxelSize, this.chunkSize);
      this.hashGridTree.insert(chunk)
    }
    block.translate([
      x +( this.voxelSize / 2),
      y + (this.voxelSize / 2),
      z + (this.voxelSize / 2),
    ]);
    chunk.insert([x, y, z], block);
  }
  updateCollisions(): void {
    super.updateCollisions();
    this.dynamicObjects.forEach((body) => {
      const aabb = body.getAABB();
      const collisionChunks = this.hashGridTree.query(aabb);
      collisionChunks.forEach((chunk) => {
        const collisions = chunk.query(aabb);
        for (let i = 0, n = collisions.length; i < n; i++) {
          const manifold = this.getContactManifold(
            body.getCollider().getId(),
            collisions[i].getCollider().getId()
          );
          if (manifold) continue;
          const features = getCollisionFeatures(
            body.getCollider(),
            collisions[i].getCollider()
          );
          if (features.length > 0) {
            this.addContactManifold(
              body.getCollider().getId(),
              collisions[i].getCollider().getId(),
              ContactManifold.fromFeaturesArray(body, collisions[i], features)
            );
          }
        }
      });
    });
  }
}
