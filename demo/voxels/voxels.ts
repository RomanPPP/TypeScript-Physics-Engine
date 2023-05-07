import { m4 } from "romanpppmath";
import VoxelWorld from "./terrain/VoxelWorld";
import { RigidBody, TerrainSegment } from "../../src/physics/RigidBody";
import { Box } from "../../src/physics/Collider";
import IRigidBody from "../../src/physics/models/IRigidBody";
import Debug from "../../src/physics/Debug";
import VoxelWorldPrimitive from "./VoxelWorldPrimitive";
import { GLcontextWrapper, PrimitiveRenderer, createBox, pointLightShaders } from "romanpppgraphics";
import textureShaders from "./textureShader";

import FreeCam from "../../src/misc/FreeCam";
import KeyInput from "../../src/misc/keyInput";
import MouseInput from "../../src/misc/mouseInput";
const context = new GLcontextWrapper("canvas");
const texture1 = new context.TextureInfo();

texture1.createTextureFromURL("resources/atlas.png");
context.resizeCanvasToDisplaySize();
const drawer = new context.Drawer();
drawer.projectionMatrix = context.Drawer.create3dProjectionMatrix(
  1,
  2000,
  context.gl.canvas.width,
  context.gl.canvas.height
);
const globalUniforms = {
    u_lightWorldPosition: [30, 50, 30],
    u_ambientLight: [1, 1, 0.3, 0.11],
    u_reverseLightDirection: [1, 0, 0],
    u_shininess: 300,
  };
  

const textureProgramInfo = new context.ProgramInfo(
  textureShaders.vert,
  textureShaders.frag
);
const pointLightProgramInfo = new context.ProgramInfo(
  pointLightShaders.vert,
  pointLightShaders.frag
);

pointLightProgramInfo.compileShaders().createUniformSetters();
const cube = context.PrimitiveRenderer.fromArrayData(createBox(1, 1, 1));

cube
  .createVAO()
  .setDrawer(drawer)
  .setProgramInfo(pointLightProgramInfo)
  .setMode(4);

textureProgramInfo.compileShaders().createUniformSetters();
const sim = new VoxelWorld();

const cellSize = 32;
const tileSize = 16;
const tileTextureWidth = 256;
const tileTextureHeight = 64;

const world = new VoxelWorldPrimitive({
  cellSize,
  tileSize,
  tileTextureWidth,
  tileTextureHeight,
});

const cellMeshes: {
  [
    id: string
  ]: PrimitiveRenderer;
} = {};

const updateCellMesh = (x: number, y: number, z: number) => {
  const cellX = Math.floor(x / cellSize);
  const cellY = Math.floor(y / cellSize);
  const cellZ = Math.floor(z / cellSize);
  const cellId = world.computeCellId(x, y, z);
  const mesh = cellMeshes[cellId] 
  if(!mesh){
    cellMeshes[cellId]  = context.PrimitiveRenderer.fromArrayData(world.generateGeometryDataForCell(cellX, cellY, cellZ))
    cellMeshes[cellId].createVAO()
    .setDrawer(drawer)
    .setProgramInfo(textureProgramInfo)
    .setMode(4);
    return
  }
  const arrayData = world.generateGeometryDataForCell(cellX, cellY, cellZ);
  mesh.bufferData('POSITION', arrayData.attributes.POSITION.data)
  mesh.bufferData('TEXCOORD_0', arrayData.attributes.TEXCOORD_0.data)
  mesh.bufferData('NORMAL', arrayData.attributes.NORMAL.data)
  mesh.setIndices(arrayData.indices)
  return
};


for (let y = 0; y < cellSize; ++y) {
    for (let z = -cellSize; z < cellSize; ++z) {
      for (let x = -cellSize; x < cellSize; ++x) {
        const height =
          (Math.sin((x / cellSize) * Math.PI * 2) +
            Math.sin((z / cellSize) * Math.PI * 3)) *
            (cellSize / 6) +
          cellSize / 2;
        if (y < height) {
          world.setVoxel(x, y, z, 1);
          const phs = new TerrainSegment(new Box(1, 1, 1));
  
          
          sim.setBlock(x,y,z, phs)

        }
      }
    }
  }

for(const cellId in world.cells){
  const [x,y,z] = cellId.split(',').map(i => parseInt(i))
  updateCellMesh(x,y,z)
}

interface objectToDraw {
  physics: IRigidBody;
  sprite: PrimitiveRenderer
  uniforms: { [key: string]: Iterable<number> };
}

let objectsToDraw: objectToDraw[] = [];

const e: IRigidBody[] = [];
console.log(e);
for (let i = 0; i < 100; i++) {
  const box = {
    physics: new RigidBody(new Box(1, 1, 1)),
    sprite: cube,
    uniforms: { u_color: [Math.random(), Math.random(), Math.random(), 1] },
  };
  box.physics.translate([0 + (i % 5) * 3, 50 + 3.01 * (i % 3), 0]);
  //box.physics.translate([0,  1 + 3.01 * (i), 0]);
  box.physics.setMass(5);
  box.physics.addAcceleration([0, -9, 0]);
  sim.addObject(box.physics);
  objectsToDraw.push(box);
}



console.log(cellMeshes)
const mouseInput = new MouseInput(document.getElementById("canvas") as HTMLElement);
mouseInput.listen();
const keyInput = new KeyInput();
keyInput.listen();

const player = new FreeCam();

player.listenKeyboard(keyInput);
player.listenMouse(mouseInput);
player.camPos = [40, 48, 40];
player.rotationX = -Math.PI * 0.1;
player.rotationY = Math.PI * 0.3;

let lastCall = Date.now();
const startTime = Date.now();
const loop = () => {
  player.tick();
  sim.tick(0.015);
  const curentTime = Date.now();
  const delta = curentTime - lastCall;

  Debug.data.FPS = Math.floor(Number((1 / delta) * 1000));
  Debug.data.RUNTIME = (curentTime - startTime) / 1000;

  lastCall = curentTime;
  context.gl.clear(context.gl.COLOR_BUFFER_BIT | context.gl.DEPTH_BUFFER_BIT);
  context.gl.enable(context.gl.CULL_FACE);
  context.gl.enable(context.gl.DEPTH_TEST);

  const cameraMatrix = player.camMatrix;
  const { translation } = m4.decompose(cameraMatrix);
  const u_viewWorldPosition = translation;
  for(const cellId in cellMeshes){
    cellMeshes[cellId].draw({
        ...globalUniforms,
        u_matrix: m4.identity(),
        u_color: [0, 0, 0, 1],
        u_viewWorldPosition,
      },
      cameraMatrix)
  }
  objectsToDraw.forEach((obj) => {
    obj.sprite.draw(
      {
        ...globalUniforms,
        u_matrix: obj.physics.getCollider().getM4(),
        u_viewWorldPosition,
        ...obj.uniforms,
      },
      cameraMatrix
    );
  });
  
  context.gl.viewport(0, 0, context.gl.canvas.width, context.gl.canvas.height);
  requestAnimationFrame(loop);
};
loop();
