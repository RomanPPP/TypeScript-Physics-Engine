import { Tuple, v3, vec3 } from "romanpppmath";
import IEquation from "./models/IEquation";

import config from "./config";


let arr : number[] = [];
let o = 0;
let f = true
const _log = (val)=> {
  o++;
  if(f){
    console.log(arr)
    f = false
    return
  }
  if(o < 200 && o % 10 == 0)
  {
    arr.push(val)
    
  }
  
  
 }
const {SOLVER_ITERATIONS_NUM} =config
type vec6 = Tuple<number, 6>

const v6 = {
  dot(a : vec6, b : vec6){
    return  a[0] * b[0] +
    a[1] * b[1] + 
    a[2] * b[2] +
    a[3] * b[3] +
    a[4] * b[4] +
    a[5] * b[5]
     
    
  },
  scale(a : vec6, fac : number) : vec6{
    return [a[0] * fac, a[1] * fac, a[2] * fac, a[3] * fac, a[4]*fac, a[5]*fac]
  },
  sum(a : vec6, b : vec6){
    return [
      a[0] + b[0],
      a[1] + b[1],
      a[2] + b[2],
      a[3] + b[3],
      a[4] + b[4],
      a[5] + b[5]
    ]
  },
  fromv3(a : vec3, b : vec3) : vec6 {
    return [...a, ...b]

  } 
}
const norm = (v : Array<number>) : number => Math.sqrt(v.reduce((acc,el) => acc+=el*el, 0))


export default class System {
  static useCache = true
  equations : IEquation[]
  bodiesMap : Map<number, number>
  Jmap : Array<number>
  error : number
  useCache : boolean
  constructor(useCache:boolean = true) {
    this.equations = [];

    this.useCache = useCache

  }
  addEquations(equations : IEquation[] ){
    this.equations.push(...equations)
  }
  generateBodyMapping(){
    const equations = this.equations
    const n = equations.length
    const bodiesMap = new Map()
    const Jmap = []
    let counter = 0
    for(let i = 0; i < n; i++){
      const eq = equations[i]
      let bodyIndex1 = bodiesMap.get(eq.constraint.body1.id)
      if(bodyIndex1 === undefined){
        bodyIndex1 = counter++
        bodiesMap.set(eq.constraint.body1.id, bodyIndex1)
      }
      let bodyIndex2 = bodiesMap.get(eq.constraint.body2.id)
      if(bodyIndex2 === undefined){
        bodyIndex2 = counter++
        bodiesMap.set(eq.constraint.body2.id, bodyIndex2)
      }
      
      Jmap.push(bodyIndex1, bodyIndex2)
    }
    
    this.bodiesMap = bodiesMap
    this.Jmap = Jmap
  }
  generateSystem(deltaTime) {
   
    //Numerating bodies
    this.generateBodyMapping()


  }
  //J * Vel
  
  solvePGS(deltaTime? : number, log:boolean = false) : number[]{

    
    const {Jmap, bodiesMap, equations} = this
    const numBodies = bodiesMap.size
    const n = equations.length
    const d = []
    
    const lambda0 = new Array(n).fill(0)
    
    if(this.useCache){
      for(let i = 0; i < n; i++){
        if(equations[i].constraint.prevLambda) lambda0[i] = equations[i].constraint.prevLambda
      }
      
    }
    
    
    const Bl = new Array(numBodies).fill([0,0,0,0,0,0])
    for(let i = 0; i < n; i++){
      const b1 = Jmap[i * 2 ]
      const b2 = Jmap[i * 2 + 1] 
    
     
      Bl[b1] = v6.sum(v6.scale(
        equations[i].B[0], 
        lambda0[i]), 
        Bl[b1])
      
      
      Bl[b2] = v6.sum(v6.scale(
        equations[i].B[1],
         lambda0[i]),
          Bl[b2])
    
      
    }
  
    //PGS
 
    
    const lambda = [...lambda0]
    const lambdaOld = [...lambda]
    for(let i = 0; i< n; i++){
      d.push(equations[i].effMass)
    }
    let flag = true
    let numIter = SOLVER_ITERATIONS_NUM

    const deltaLambda = new Array(n).fill(0)
    let str = ''
    while(numIter > 0 ){
      for(let i = 0; i < n; i++){
        const eq = equations[i]
        const J = eq._J
        const b1 = Jmap[i * 2 ]
       const b2 = Jmap[i * 2 + 1]
       
        deltaLambda[i] = (eq.bias - v6.dot(J[0], Bl[b1]) - v6.dot(J[1], Bl[b2])) / d[i]
        
        lambda0[i] = lambda[i]
        lambda[i] = Math.max(eq.lambdaMin, Math.min(lambda0[i] + deltaLambda[i], eq.lambdaMax))
        
        deltaLambda[i] = lambda[i] - lambda0[i]
        
        Bl[b1] = v6.sum(Bl[b1], v6.scale(eq.B[0], deltaLambda[i]))
        Bl[b2] = v6.sum(Bl[b2], v6.scale(eq.B[1], deltaLambda[i]))
      
      }
      if(log)str += `${norm(deltaLambda)}\n`
      numIter--
    }
    
    if(log)document.getElementById('error').textContent =`lambda error : \n${norm(deltaLambda)}`;
    _log(norm(deltaLambda))
    for(let i = 0; i < n; i++){
      equations[i].applyImpulse(lambda[i])
    }
    return lambda
  }
  updateEquations(deltaTime : number){
    const {equations} = this
    const n = equations.length
    for(let i = 0; i < n; i ++){
      equations[i].updateLeftPart(deltaTime)
      equations[i].updateRightPart(deltaTime)
    }
  }
  applyResolvingImpulses(lambda : Array<number>) {
    for (let i = 0, n = this.equations.length; i < n; i++) {
      this.equations[i].applyImpulse(lambda[i]);
    }
  }
  applyResolvingPseudoImpulses(lambda : Array<number>) {
    for (let i = 0, n = this.equations.length; i < n; i++) {
      this.equations[i].applyPseudoImpulse(lambda[i]);
    }
  }

}
