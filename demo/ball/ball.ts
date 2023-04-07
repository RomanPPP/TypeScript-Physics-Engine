import { m4 } from "romanpppmath";
import {
  createBox,
  GLcontextWrapper,
  pointLightShaders,
  defaultShaders,
  createSphere

} from "romanpppgraphics";
import textureShaders from "./textureShader";
import { getBoxUVs } from "./boxUVs";
import FreeCam from "../../src/misc/FreeCam";
import KeyInput from "../../src/misc/keyInput";
import MouseInput from "../../src/misc/mouseInput";



const canvas = document.getElementById("canvas") 
if(!canvas) throw 'No canvas found'
const mouseInput = new MouseInput(canvas);
mouseInput.listen();
const keyInput = new KeyInput();
keyInput.listen();

const player = new FreeCam();

player.listenKeyboard(keyInput);
player.listenMouse(mouseInput);
player.camPos = [-10, 15, 20];
player.rotationX = - Math.PI * 0.1
player.rotationY = - Math.PI * 0.1
const gl = (document.getElementById("canvas") as HTMLCanvasElement).getContext(
  "webgl2"
) as WebGL2RenderingContext;
const context = new GLcontextWrapper(gl);

const { PrimitiveRenderer, Drawer, ProgramInfo, TextureInfo} = context;

context.resizeCanvasToDisplaySize();
const drawer = new Drawer();
drawer.projectionMatrix = Drawer.create3dProjectionMatrix(
  1,
  2000,
  gl.canvas.width,
  gl.canvas.height
);

const pointLightProgramInfo = new ProgramInfo(
  pointLightShaders.vert,
  pointLightShaders.frag
);


pointLightProgramInfo.compileShaders().createUniformSetters();

const defaultProgramInfo = new ProgramInfo(
  defaultShaders.vert,
  defaultShaders.frag
);



const textureProgramInfo = new ProgramInfo(textureShaders.vert, textureShaders.frag)

textureProgramInfo.compileShaders().createUniformSetters();
defaultProgramInfo.compileShaders().createUniformSetters();
const cube = PrimitiveRenderer.fromArrayData(createBox(1, 1, 1));

const point = new PrimitiveRenderer();


const texture1 = new TextureInfo();

texture1.createTextureFromURL("resources/atlas.png");

const settings = [
  { x: -1, y:  1, zRot: 0, magFilter: gl.NEAREST, minFilter: gl.NEAREST,                 },
  { x:  0, y:  1, zRot: 0, magFilter: gl.LINEAR,  minFilter: gl.LINEAR,                  },
  { x:  1, y:  1, zRot: 0, magFilter: gl.LINEAR,  minFilter: gl.NEAREST_MIPMAP_NEAREST,  },
  { x: -1, y: -1, zRot: 1, magFilter: gl.LINEAR,  minFilter: gl.LINEAR_MIPMAP_NEAREST,   },
  { x:  0, y: -1, zRot: 1, magFilter: gl.LINEAR,  minFilter: gl.NEAREST_MIPMAP_LINEAR,   },
  { x:  1, y: -1, zRot: 1, magFilter: gl.LINEAR,  minFilter: gl.LINEAR_MIPMAP_LINEAR,    },
];
const s = settings[0]
gl.bindTexture(gl.TEXTURE_2D, texture1.texture)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, s.minFilter);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, s.magFilter);
const uvs = getBoxUVs(16,4)

cube
  .createVAO()
  .setDrawer(drawer)
  .setProgramInfo(textureProgramInfo)
  .bufferData('TEXCOORD_0', uvs)
  .setMode(4);


  const sphere = PrimitiveRenderer.fromArrayData(createSphere(1,10,10))
sphere
  .createVAO()
  .setDrawer(drawer)
  .setProgramInfo(pointLightProgramInfo)
  .setMode(4);
point
  .createVAO()
  .setDrawer(drawer)
  .setProgramInfo(defaultProgramInfo)
  .createBufferAttribData({
    attribName: "a_position",
    location: 0,
    attributeType: WebGL2RenderingContext.FLOAT_VEC3,
    numComponents: 3,
  })
  .setAttributes()
  .bufferData(
    "a_position",
    new Float32Array([1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1])
  )
  .setMode(3)
  .setNumElements(5);

const uniforms = {
  u_lightWorldPosition: [30, 50, 30],
  u_ambientLight: [1, 1, 0.3, 0.11],
  u_reverseLightDirection: [1, 0, 0],
  u_shininess: 300,
};



import { RigidBody } from "../../src/physics/RigidBody";

import Simulation from "../../src/physics/Simulation";

import { Box, Sphere } from "../../src/physics/Collider";
import IRigidBody from "../../src/physics/models/IRigidBody";
import IPrimitiveRenderer from "romanpppgraphics/lib/models/IPrimitiveRenderer";
import { getCenter, getDiagonal } from "romanpppmath/lib/aabb";
import { Constraint } from "../../src/physics/Constraints";
import config from "../../src/physics/config";
import Debug from "../../src/physics/Debug";
config.RIGID_BODY_MOVE_TRESHOLD = 0.001
config.CONTACT_TRESHOLD = 0.00001
config.CLIP_BIAS = 0.01
config.CONTACT_MANIFOLD_KEEP_TRESHOLD = 0.001

const sim = new Simulation();
const body = new RigidBody(new Box(1, 1, 1));

const floor = {physics : new RigidBody(new Box(100,5,100)), sprite : cube, uniforms : {u_color : [1,0,1,1]}}

floor.physics.setMass(1)
floor.physics.static = true

floor.physics.translate([0,-2.5,0])
sim.addObject(floor.physics)

interface objectToDraw {
  physics : RigidBody
  sprite :  typeof cube
  uniforms : {[key : string] : Iterable<number>}
}

let objectsToDraw : objectToDraw[] = [
  
];


objectsToDraw.push(
 floor
);





for (let i = 0; i < 15; i++) {
  const box = { physics: new RigidBody(new Box(3, 3, 3)), sprite: cube, uniforms : {u_color : [0,0,1,1]} };
  box.physics.translate([-2.5 + (i%5) * 3,  1 + 3.01 * (i%3), 0]);
  //box.physics.translate([0,  1 + 3.01 * (i), 0]);
  box.physics.setMass(5);
  box.physics.addAcceleration([0, -9, 0]);
  sim.addObject(box.physics);
  objectsToDraw.push(box);
}

const box = { physics: new RigidBody(new Sphere(5)), sprite: sphere, uniforms : {u_color : [0,0,1,1]} };
  box.physics.translate([0,5,-30]);
  box.physics.setMass(32);
  box.physics.addAcceleration([0, -9, 0]);
 box.physics.addVelocity([0,0,10])
  box.physics.addAngularV([1,1,1])
  sim.addObject(box.physics);
  objectsToDraw.push(box);


/*
const box2 = { physics: new RigidBody(new Box(5)), sprite: cube, uniforms : {u_color : [0,0,1,1]} };
  box2.physics.translate([0,5,0]);
  box2.physics.setMass(2);
  box2.physics.addAcceleration([0, -9, 0]);
  box2.physics.addVelocity([0,20,-0])
  box2.physics.addAngularV([1,1,1])
  sim.addObject(box2.physics);
  objectsToDraw.push(box2);
*/
let lastCall = Date.now();

const startTime = Date.now();
const loop = () => {
  player.tick();
  sim.tick(0.015)
  const curentTime = Date.now();
  const delta = curentTime - lastCall;
 
  Debug.data.FPS = Math.floor(Number((1 / delta) * 1000));
  Debug.data.RUNTIME = (curentTime - startTime)/1000

  lastCall = curentTime;
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.CULL_FACE);
  gl.enable(gl.DEPTH_TEST);

  const cameraMatrix = player.camMatrix;
  const { translation } = m4.decompose(cameraMatrix);
  const u_viewWorldPosition = translation;
  objectsToDraw.forEach((obj) => {
    
    obj.sprite.draw(
      {
        ...uniforms,
        u_matrix : obj.physics.collider.getM4(),
        u_viewWorldPosition,
        ...obj.uniforms,
      },
      cameraMatrix
    );
  });
  point.draw(
    {
      ...uniforms,
      u_matrix: m4.scaling(6, 6, 6),
      u_color: [0, 0, 0, 1],
      u_viewWorldPosition,
    },
    cameraMatrix
  );
  point.draw(
    {
      ...uniforms,
      u_matrix: m4.scale(
        m4.zRotate(m4.yRotation(Math.PI), -Math.PI / 2),
        6,
        6,
        6
      ),
      u_color: [1, 0.1, 1, 1],
      u_viewWorldPosition,
    },
    cameraMatrix
  );
 
  for (const [id, manifold] of sim.collisionManifolds) {
    manifold.contacts.forEach((contact) => {
      point
        .draw(
          {
            u_matrix: m4.translation(...contact.PA),
            u_color: [0.6, 0.6, 0.0, 1],
            ...uniforms,
            u_viewWorldPosition
          },
          cameraMatrix
        )
        .draw(
          {
            u_matrix: m4.translation(...contact.PB),
            u_color: [0.5, 0.1, 0.2, 1],
          },
          cameraMatrix
        );
    });
  }
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  requestAnimationFrame(loop);
};
loop();
