import EventEmitter from "./EventEmitter"

const data = {
    SOLVER_ERROR : 0,
    RUNTIME : 0,
    FPS : 0,
}

class Debug extends EventEmitter{
    private static instance: Debug;
    data : {[key : string] : number}
    private constructor() {
        super()
    }
    static getInstance() {
        if (!Debug.instance) {
           Debug.instance = new Debug();
           Debug.instance.data = {}
           Object.keys(data).forEach(key =>{
            Debug.instance.data[`_${key}`] = data[key]
            Object.defineProperty(Debug.instance.data, key, {
                get() {
                    return this[`_${key}`]
                },
                set(value){
                    this[`_${key}`] = value
                    Debug.instance.emit(`update`, {key : `_${key}`, value})
                }
            })
           })
        }
        return Debug.instance;
    }
    someMethod() {}
}
(window as any).Debug = Debug.getInstance()
export default Debug.getInstance()