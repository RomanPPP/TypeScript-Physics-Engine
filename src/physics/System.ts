import { Tuple, v3, vec3 } from "romanpppmath";
import IEquation from "./models/IEquation";

import config from "./config";
import Debug from "./Debug";

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
const nullVec:vec3 = [0,0,0]
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
      let bodyIndex1 = bodiesMap.get(eq.constraint.body1.getId())
      if(bodyIndex1 === undefined){
        bodyIndex1 = counter++
        bodiesMap.set(eq.constraint.body1.getId(), bodyIndex1)
      }
      let bodyIndex2 = bodiesMap.get(eq.constraint.body2.getId())
      if(bodyIndex2 === undefined){
        bodyIndex2 = counter++
        bodiesMap.set(eq.constraint.body2.getId(), bodyIndex2)
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
    const lambda = []
    
    for(let i = 0; i < n; i++){
      lambda0[i] = equations[i].prevLambda
      lambda[i] = lambda0[i]
    }
        
      
      
    
    
    
    const Bl = new Array(numBodies).fill(nullVec)
    const B2l = new Array(numBodies).fill(nullVec)
    for(let i = 0; i < n; i++){
      const b1 = Jmap[i * 2 ]
      const b2 = Jmap[i * 2 + 1] 
    
      const eq = equations[i]
      const l = lambda0[i]
     /* Bl[b1] = v6.sum(v6.scale(
        equations[i].B[0], 
        lambda0[i]), 
        Bl[b1])*/
      if(!eq.constraint.body1.isStatic()){
        Bl[b1] = v3.sum(v3.scale(eq.JM1, l), Bl[b1])
        B2l[b1] = v3.sum(v3.scale(eq.JM2, l), B2l[b1])
      }
      if(!eq.constraint.body2.isStatic()){
        Bl[b2] = v3.sum(v3.scale(eq.JM3, l), Bl[b2])
        B2l[b2] = v3.sum(v3.scale(eq.JM4, l), B2l[b2])
      }
      
      /*Bl[b2] = v6.sum(v6.scale(
        equations[i].B[1],
         lambda0[i]),
          Bl[b2])*/
      
      
    }
  
    //PGS
 

    
   
    let flag = true
    let numIter = SOLVER_ITERATIONS_NUM

    const deltaLambda = new Array(n)
    
    while(numIter > 0 ){
      for(let i = 0; i < n; i++){
        const eq = equations[i]
        //const J = eq._J
        const b1 = Jmap[i * 2 ]
        const b2 = Jmap[i * 2 + 1]
       
        //deltaLambda[i] = (eq.bias - v6.dot(J[0], Bl[b1]) - v6.dot(J[1], Bl[b2])) / d[i]
        //deltaLambda[i] = (eq.bias - v3.dot(eq.J1, Bl[b1]) - v3.dot(eq.J2, B2l[b1]) - v3.dot(eq.J3, Bl[b2]) - v3.dot(eq.J4, B2l[b2])) / equations[i].effMass
        
        deltaLambda[i] = eq.bias
        if(!eq.constraint.body1.isStatic()){
          deltaLambda[i] -= v3.dot(eq.J1, Bl[b1]) + v3.dot(eq.J2, B2l[b1])
        }
        if(!eq.constraint.body2.isStatic()){
          deltaLambda[i] -= v3.dot(eq.J3, Bl[b2]) + v3.dot(eq.J4, B2l[b2])
        }
        deltaLambda[i] /= eq.effMass
        lambda0[i] = lambda[i]
        lambda[i] = Math.max(eq.lambdaMin, Math.min(lambda0[i] + deltaLambda[i], eq.lambdaMax))
        
        deltaLambda[i] = lambda[i] - lambda0[i]
        
        //Bl[b1] = v6.sum(Bl[b1], v6.scale(eq.B[0], deltaLambda[i]))

        Bl[b1] = v3.sum(v3.scale(eq.JM1, deltaLambda[i]), Bl[b1])
        B2l[b1] = v3.sum(v3.scale(eq.JM2, deltaLambda[i]), B2l[b1])

       // Bl[b2] = v6.sum(Bl[b2], v6.scale(eq.B[1], deltaLambda[i]))

        Bl[b2] = v3.sum(v3.scale(eq.JM3, deltaLambda[i]), Bl[b2])
        B2l[b2] = v3.sum(v3.scale(eq.JM4, deltaLambda[i]), B2l[b2])
      
      }
     
      numIter--
    }
    
    if(log) Debug.data.SOLVER_ERROR = norm(deltaLambda)
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
