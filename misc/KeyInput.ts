import EventEmitter from "../src/physics/EventEmitter";

export default class KeyInput extends EventEmitter {
  keys : Set<string>
  unsubscribe : () => void
  constructor() {
    super()
    this.keys = new Set();
  }
  logDown({ key }) {
    this.keys.add(key);
    this.emit("keydown", { key });
  }
  logUp({ key }) {
    this.keys.delete(key);
    this.emit("keyup", { key });
  }
  listen() {
    const logDown = this.logDown.bind(this);
    const logUp = this.logUp.bind(this);
    document.addEventListener("keydown", logDown);
    document.addEventListener("keyup", logUp);
    this.unsubscribe = () => {
      document.removeEventListener("keydown", logDown);
      document.removeEventListener("keyup", logUp);
    };
  }
}
