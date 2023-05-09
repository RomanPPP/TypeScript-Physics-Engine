
import {m4, m3, v3,  mat3} from 'romanpppmath'
import KeyInput from './keyInput';
import MouseInput from './mouseInput';

const KEYS = {
    'w' : 'moveForward',
    's' : 'moveBackward',
    'a' : 'moveLeft',
    'd' : 'moveRight',
    ' ' : 'moveUp'
}

export default class FreeCam {
  keyInput : KeyInput
  mouseInput : MouseInput
  rotationX : number
  rotationY : number
  deltaRY : number
  camPos : [number, number, number]
  camRot : mat3
  constructor() {
    this.rotationX = 0;
    this.rotationY = 0;
    this.deltaRY = 0;
    this.camPos = [0, 0, 10];
    this.camRot = m3.identity();
  }
  listenMouse(mouseInput : MouseInput) {
    this.mouseInput = mouseInput;
    mouseInput.on("move", ([deltaX, deltaY]) => {
      this.rotationY -= deltaX * 0.005;
      this.rotationX -= deltaY * 0.005;
      this.rotationX = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, this.rotationX)
      );
      this.deltaRY = deltaX * 0.005;
    });
  }
  listenKeyboard(keyInput : KeyInput) {
    this.keyInput = keyInput;
  }
  tick() {
    for (const key of this.keyInput.keys) {
      const actionName = KEYS[key];
      if (actionName) {
        const action = this[actionName].bind(this);
        action();
      }
    }

    this.camMatrix = m4.translation(...this.camPos);
    this.camMatrix = m4.xRotate(
      m4.yRotate(this.camMatrix, this.rotationY),
      this.rotationX
    );
  }
  move(dir) {
    const m = m4.m4Tom3(this.camMatrix);
    this.camPos = v3.sum(this.camPos, m3.transformPoint(m, dir));
  }
  moveForward() {
    this.move([0, 0, -1]);
  }
  moveBackward() {
    this.move([0, 0, 1]);
  }
  moveLeft() {
    this.move([-1, 0, 0]);
  }
  moveRight() {
    this.move([1, 0, 0]);
  }
  moveUp() {
    this.move([0, 1, 0]);
  }
}
