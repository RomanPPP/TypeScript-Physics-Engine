import {m4, Octree, AABB, v3} from 'romanpppmath'
;
import { createBox, GLcontextWrapper, pointLightShaders } from "romanpppgraphics";

import {FreeCam, MouseInput, KeyInput} from 'romanpppphs'

import VoxelWorld from "./VoxelWorld";


const cellSize = 32;
const tileSize = 16;
const tileTextureWidth = 256;
const tileTextureHeight = 64;

const world = new VoxelWorld({
  cellSize,
  tileSize,
  tileTextureWidth,
  tileTextureHeight,
});

for (let y = 0; y < cellSize; ++y) {
  for (let z = 0; z < cellSize; ++z) {
    for (let x = 0; x < cellSize; ++x) {
      const height = (Math.sin(x / cellSize * Math.PI * 2) + Math.sin(z / cellSize * Math.PI * 3)) * (cellSize / 6) + (cellSize / 2);
      if (y < height) {
       
        world.setVoxel(x, y, z,randInt(1,17));
      }
    }
  }
}
 
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}



const mouseInput = new MouseInput();

mouseInput.listen();
const keyInput = new KeyInput();
keyInput.listen();

const gl = document.getElementById("canvas").getContext('webgl2')
const context = new GLcontextWrapper(gl);

const { PrimitiveRenderer, Drawer, ProgramInfo, TextureInfo } = context;

context.resizeCanvasToDisplaySize();
const drawer = new Drawer();
drawer.projectionMatrix = Drawer.create3dProjectionMatrix(1,2000, gl.canvas.width, gl.canvas.height)

import {vert, frag} from './textureShaders'

const pointLightProgramInfo = new ProgramInfo(
  pointLightShaders.vert,
  pointLightShaders.frag
);
pointLightProgramInfo.compileShaders().createUniformSetters();

const texProgramInfo = new ProgramInfo(vert, frag)
texProgramInfo.compileShaders().createUniformSetters();
const voxel = PrimitiveRenderer.fromArrayData(world.generateGeometryDataForCell(0,0,0));
const cube = PrimitiveRenderer.fromArrayData(createBox(1,1,1));




voxel
  .createVAO()
  .setDrawer(drawer)
  .setProgramInfo(pointLightProgramInfo)
  .setMode(4);

cube
  .createVAO()
  .setDrawer(drawer)
  .setProgramInfo(pointLightProgramInfo)
  .setMode(4);
/*
const textureInfo = new TextureInfo()
textureInfo.createTextureFromURL("http://localhost:3000/atlas.png")
const settings = [
  { x: -1, y:  1, zRot: 0, magFilter: gl.NEAREST, minFilter: gl.NEAREST,                 },
  { x:  0, y:  1, zRot: 0, magFilter: gl.LINEAR,  minFilter: gl.LINEAR,                  },
  { x:  1, y:  1, zRot: 0, magFilter: gl.LINEAR,  minFilter: gl.NEAREST_MIPMAP_NEAREST,  },
  { x: -1, y: -1, zRot: 1, magFilter: gl.LINEAR,  minFilter: gl.LINEAR_MIPMAP_NEAREST,   },
  { x:  0, y: -1, zRot: 1, magFilter: gl.LINEAR,  minFilter: gl.NEAREST_MIPMAP_LINEAR,   },
  { x:  1, y: -1, zRot: 1, magFilter: gl.LINEAR,  minFilter: gl.LINEAR_MIPMAP_LINEAR,    },
];
const s = settings[0]

gl.bindTexture(gl.TEXTURE_2D, textureInfo.texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, s.minFilter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, s.magFilter);
      */
const uniforms = {
  u_lightWorldPosition: [30, 50, 30],
  u_ambientLight: [1, 1, 0.3, 0.11],
  u_reverseLightDirection: [1, 0, 0],
  u_shininess: 300,
};


const octree = new Octree(new AABB([0,0,0], [32,32,32]))

for (let y = 0; y < cellSize; ++y) {
  for (let z = 0; z < cellSize; ++z) {
    for (let x = 0; x < cellSize; ++x) {
      const height = (Math.sin(x / cellSize * Math.PI * 2) + Math.sin(z / cellSize * Math.PI * 3)) * (cellSize / 6) + (cellSize / 2);
      if (y < height) {
       
       octree.insert([x,y,z])
      }
    }
  }
}


const voxelGeometry = {
  sprite: voxel,
      uniforms: {
        u_color: [1, 1, 0, 1],
        u_matrix: m4.identity()
      },
      mode : 4
}

let objects = [

];

/*
const iter = (time)=>{
  const {center, diagonal, children, elements} = cell
  if(elements.length ===0) return
  objects.push(
    {
      sprite: cube,
      uniforms: {
        u_color: [1, 0, 0, 1],
        u_matrix: m4.scale(m4.translation(...center), ...diagonal)
      },
      mode : 3
    }
  )
  elements.forEach(child =>{

    objects.push({
      sprite: cube,
      uniforms: {
        u_color: [1, 0, 1, 1],
        u_matrix: m4.translation(child[0] - 0.5, child[1] - 0.5, child[2] - 0.5)
      },
      mode : 4
    })
  })
  children.forEach(iter)
}

iter(octree)*/

const size = [1,2,1]

const player = new FreeCam();
const getIntersections = (translation) =>{
  const intersections = octree.query(new AABB(v3.sum(translation, v3.scale(size, -0.5)), v3.sum(translation, v3.scale(size, 0.5))))
  objects = intersections.map(p =>{
    return {
      sprite: cube,
      uniforms: {
        u_color: [1, 0, 1, 1],
        u_matrix: m4.translation(p[0] + 0.5, p[1] + 0.5, p[2] + 0.5)
      },
      mode : 4
    }
  })
  
  objects.push(
    {
      sprite: cube,
      uniforms: {
        u_color: [1, 0, 1, 1],
        u_matrix: m4.scale(m4.translation(translation[0], translation[1] , translation[2] ), ...size)
      },
      mode : 3
    }

  )

}

player.listenKeyboard(keyInput);
player.listenMouse(mouseInput);
player.camPos = [0, 10, 15];

let lastCall = Date.now();
const fps = document.querySelector("#fps");
const time = document.querySelector("#time");
const numIter = 1;
const startTime = Date.now();
const loop = () => {
  player.tick();
  const curentTime = Date.now();
  const delta = curentTime - lastCall;
  const totalTime = curentTime - startTime;
  fps.textContent = (1 / delta) * 1000;
  time.textContent = totalTime / 1000;
  lastCall = curentTime;
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.CULL_FACE);
  //gl.enable(gl.DEPTH_TEST);

  const cameraMatrix = player.camMatrix;
  const { translation } = m4.decompose(cameraMatrix);
  const u_viewWorldPosition = translation;
  getIntersections(m4.transformPoint(cameraMatrix, [0,0,-6]))
  voxel.draw({
    ...uniforms,
    u_viewWorldPosition,
    u_color: [1, 1, 0, 0.5],
    u_matrix: m4.identity()
  },
  cameraMatrix)
  objects.forEach((obj) => {
    
    const spriteUniforms = obj.uniforms || {};
    obj.sprite.setMode(obj.mode)
    obj.sprite.draw(
      {
        ...uniforms,

        u_viewWorldPosition,

        ...spriteUniforms,
      },
      cameraMatrix
    );
  });

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  requestAnimationFrame(loop);
};
loop();
