import { AABB } from "romanpppmath";

export default interface ISpatialDB<T extends {getAABB() : AABB}>{
    insert(object : T, id : number) : void
    getCollisions(object : T) : T[]
    remove(id : number) : void
    setKey(f : (o : T)=>number) : void
}