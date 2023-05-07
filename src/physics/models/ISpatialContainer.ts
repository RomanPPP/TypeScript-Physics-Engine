import { AABB } from "romanpppmath";

export default interface ISpatialContainer<T extends {getAABB() : AABB}>{
    insert(element : T) : void
    query(aabb : AABB) : T[]

}