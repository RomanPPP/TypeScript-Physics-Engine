import { vec3 } from "romanpppmath"
import AABB from "./AABB"
export default class HashGrid<T extends {getAABB() : AABB}>{

    aabb : AABB
    cellSize : number
    numCells : number
    cells : T[]
    constructor(aabb : AABB, cellSize : number, numCells : number){
        this.cellSize = cellSize
        this.numCells = numCells
        this.aabb = aabb
        this.cells = new Array<T>(numCells ** 3)
    }
    getAABB(){
        return this.aabb
    }
    contain(position : vec3){
        for(let i = 0; i < 3; i++) if(this.aabb.min[i] > position[i]) return false
        for(let i = 0; i < 3; i++) if(this.aabb.max[i] < position[i]) return false
        return true
    }
    getCellForPos(position : vec3){
        
        
        let i = Math.min(1, Math.max(0, (position[0] - this.aabb.min[0]) / (this.aabb.max[0] - this.aabb.min[0])))
        let j = Math.min(1, Math.max(0, (position[1] - this.aabb.min[1]) / (this.aabb.max[1] - this.aabb.min[1])))
        let k = Math.min(1, Math.max(0, (position[2] - this.aabb.min[2]) / (this.aabb.max[2] - this.aabb.min[2])))
        
        i = Math.floor(i * this.numCells - 1)
        j = Math.floor(j * this.numCells - 1)
        k = Math.floor(k * this.numCells - 1)
        return [i,j,k]
    }
    insert(position : vec3, element : T){
 
        if(!this.contain(position)) return false
        const cellIJK = this.getCellForPos(position)
        
        this.cells[cellIJK[0] + cellIJK[1] * this.numCells + cellIJK[2] * this.numCells * this.numCells] = element
        return true

    }
    query(aabb : AABB){
        const min = this.getCellForPos(aabb.min)
        const max = this.getCellForPos(aabb.max)
        const collisions : T[] = []
        for(let i = min[0]; i <= max[0]; i++){
            for(let j = min[1]; j <= max[1]; j++){
                for(let k = min[2]; k <= max[2]; k++){
                    const element = this.cells[i + j * this.numCells + k *this.numCells * this.numCells]
                    if(element) collisions.push(element)
                }
            }
        }
        return collisions
    }
}