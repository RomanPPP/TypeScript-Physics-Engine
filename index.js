import { m4, vector } from "math";

import {
  ArrayDataFromGltf,
  PrimitiveRenderInfoFromArrayData,
  EntityDataFromGltf,
  getGlContext,
  resizeCanvasToDisplaySize,
  ProgramInfo,
  MeshRenderer,
  Drawer,
  createBox,
  PrimitiveRenderer,
  Texture,
  makeImgFromSvgXml,
  makeStripeImg,
  Entity,
  GLTF,
  GLcontextWrapper,
  createCone,
  createCircle,
  defaultShaders,
  pointLightShaders,
  createSphere,
  createTruncatedCone,
} from "graphics";

import MouseInput from "./src/misc/mouseInput";
import KeyInput from "./src/misc/keyInput";
const mouseInput = new MouseInput();

mouseInput.listen();
const keyInput = new KeyInput();
keyInput.listen();
const context = new GLcontextWrapper("canvas");
const gl = context.getContext();
context.resizeCanvasToDisplaySize();
const drawer = new Drawer();
drawer.setContext(context).update3DProjectionMatrix();

const defaultProgramInfo = new ProgramInfo(
  defaultShaders.vert,
  defaultShaders.frag
);
const pointLightProgramInfo = new ProgramInfo(
  pointLightShaders.vert,
  pointLightShaders.frag
);
defaultProgramInfo.setContext(context).compileShaders().createUniformSetters();
pointLightProgramInfo
  .setContext(context)
  .compileShaders()
  .createUniformSetters();
import prog from "./shader";
prog.setContext(context).compileShaders().createUniformSetters();
const box = new PrimitiveRenderer(createBox(1, 1, 1));
const sphere = new PrimitiveRenderer(createSphere(1, 15, 15));
const circle = new PrimitiveRenderer(createCircle(8, 4));
const cylinder = new PrimitiveRenderer(createTruncatedCone(1, 1, 1, 8, 1));
const points = new PrimitiveRenderer({
  mode: gl.POINTS,
  numElements: 2,
  offset: 0,
});
const line = new PrimitiveRenderer({
  mode: gl.LINES,
  numElements: 2,
  offset: 0,
});

box
  .setContext(context)
  .createVAO()
  .setDrawer(drawer)
  .setProgramInfo(pointLightProgramInfo)
  .createGeometryBuffers()
  .setAttributes()
  .setMode(2);
cylinder
  .setContext(context)
  .createVAO()
  .setDrawer(drawer)
  .setProgramInfo(pointLightProgramInfo)
  .createGeometryBuffers()
  .setAttributes()
  .setMode(2);
sphere
  .setContext(context)
  .createVAO()
  .setDrawer(drawer)
  .setProgramInfo(pointLightProgramInfo)
  .createGeometryBuffers()
  .setAttributes()
  .setMode(2);
circle
  .setContext(context)
  .createVAO()
  .setDrawer(drawer)
  .setProgramInfo(defaultProgramInfo)
  .createGeometryBuffers()
  .setAttributes()
  .setMode(3);

line
  .setContext(context)
  .createVAO()
  .setDrawer(drawer)
  .setProgramInfo(defaultProgramInfo)
  .createBufferAttribData("a_position", "vec3", { location: 0 })
  .setOwnAttribute("a_position")
  .bufferData("a_position", new Float32Array([0, 0, 0, 0, 1, 0]));

points
  .setContext(context)
  .createVAO()
  .setDrawer(drawer)
  .setProgramInfo(defaultProgramInfo)
  .createBufferAttribData("a_position", "vec3", { location: 0 })
  .setOwnAttribute("a_position")
  .bufferData("a_position", new Float32Array([0, 0, 0]));

const uniforms = {
  u_lightWorldPosition: [1000, 11, 1000],
  u_ambientLight: [1, 1, 0.3, 0.11],
  u_reverseLightDirection: [1, 0, 0],
  u_shininess: 300,
};

import Simulation from "./src/physics/simulation";
import { Player, RigidBody } from "./src/physics/RigidBody";
import { Box, Cylinder, Sphere } from "./src/physics/collider";
import { Controllable, Noclip } from "./src/misc/controllable";

import { Joint, JointPositionConstraint } from "./src/physics/constraints";

const g = 9.8;
const sim = new Simulation();

const floor = { physics: new RigidBody(new Box(1000, 6, 1000)), sprite: box };

const cube2 = { physics: new RigidBody(new Box(2, 2, 2)), sprite: box };
const cube3 = { physics: new RigidBody(new Box(2, 2, 2)), sprite: box };
const cube4 = {
  physics: new RigidBody(new Box(1, 1, 2)),
  sprite: box,
};

cube2.physics.translate([0, 4.7, 0]);
cube4.physics.translate([0, 10, -5]);
cube3.physics.translate([0, 3, 0]);
//cube4.physics.rotate([Math.PI*0.6,Math.PI*0.3,Math.PI*0.3])

cube2.physics.addAcceleration([0, -g, 0]);
cube3.physics.addAcceleration([0, -g, 0]);
cube4.physics.addAcceleration([0, -g * 2, 0]);
cube4.physics.friction = 0;
cube2.physics.setMass(20);
cube3.physics.setMass(20);

sim.addObject(floor.physics);

sim.addObject(cube2.physics);
sim.addObject(cube3.physics);
sim.addObject(cube4.physics);

const wheel1 = {
  physics: new RigidBody(new Cylinder(1, 1, 0.5)),
  sprite: cylinder,
};
const wheel2 = {
  physics: new RigidBody(new Cylinder(1, 1, 0.5)),
  sprite: cylinder,
};

const wheel3 = {
  physics: new RigidBody(new Cylinder(1, 1, 0.5)),
  sprite: cylinder,
};
const wheel4 = {
  physics: new RigidBody(new Cylinder(1, 1, 0.5)),
  sprite: cylinder,
};
wheel1.physics.addAcceleration([0, -2*g, 0]);
wheel2.physics.addAcceleration([0, -2*g, 0]);
wheel3.physics.addAcceleration([0, -2*g, 0]);
wheel4.physics.addAcceleration([0, -2*g, 0]);

sim.addObject(wheel1.physics);
sim.addObject(wheel2.physics);
sim.addObject(wheel3.physics);
sim.addObject(wheel4.physics);
sim.addConstraints([
  new Joint(cube4.physics, wheel1.physics, [2, -0.5, 2], [0, -0.5, 0], 0.2),
  new Joint(cube4.physics, wheel1.physics, [1, -0.5, 2], [0, 0.5, 0], 0.2),
  new Joint(cube4.physics, wheel2.physics, [-2, -0.5, 2], [0, 0.5, 0], 0.2),
  new Joint(cube4.physics, wheel2.physics, [-1, -0.5, 2], [0, -0.5, 0], 0.2),

  new Joint(cube4.physics, wheel3.physics, [2, -0.5, -2], [0, -0.5, 0], 0.2),
  new Joint(cube4.physics, wheel3.physics, [1, -0.5, -2], [0, 0.5, 0], 0.2),
  new Joint(cube4.physics, wheel4.physics, [-2, -0.5, -2], [0, 0.5, 0], 0.2),
  new Joint(cube4.physics, wheel4.physics, [-1, -0.5, -2], [0, -0.5, 0], 0.2),
], 'ww');
sim.addPositionConstraints([
  new JointPositionConstraint(cube4.physics, wheel1.physics, [2, -0.5, 2], [0, -0.5, 0], 0.2),
  new JointPositionConstraint(cube4.physics, wheel1.physics, [1, -0.5, 2], [0, 0.5, 0], 0.2),
  new JointPositionConstraint(cube4.physics, wheel2.physics, [-2, -0.5, 2], [0, 0.5, 0], 0.2),
  new JointPositionConstraint(cube4.physics, wheel2.physics, [-1, -0.5, 2], [0, -0.5, 0], 0.2),

  new JointPositionConstraint(cube4.physics, wheel3.physics, [2, -0.5, -2], [0, -0.5, 0], 0.2),
  new JointPositionConstraint(cube4.physics, wheel3.physics, [1, -0.5, -2], [0, 0.5, 0], 0.2),
  new JointPositionConstraint(cube4.physics, wheel4.physics, [-2, -0.5, -2], [0, 0.5, 0], 0.2),
  new JointPositionConstraint(cube4.physics, wheel4.physics, [-1, -0.5, -2], [0, -0.5, 0], 0.2),
], 'ww');

const objects = [floor, cube2, cube3, cube4, wheel1, wheel2, wheel3, wheel4];

for (let i = 0; i < 3; i++) {
  const cube = { physics: new RigidBody(new Box(6, 2, 2)), sprite: box };
  cube.physics.translate([10, 5 * i + 2.5, i * 0.1]);
  cube.physics.setMass(20);
  cube.physics.addAcceleration([0, -g, 0]);
  sim.addObject(cube.physics);
  objects.push(cube);
}

const chain = [];
for (let i = 0; i < 5; i++) {
  const cube = { physics: new RigidBody(new Box(2, 5, 2)), sprite: box };
  cube.physics.translate([20, 5, i * 5 - 25]);
  cube.physics.setMass(5);
  cube.physics.addAcceleration([0, -g, 0]);
  cube.physics.friction = 0;
  //cube.physics.group = 1
  if (i > 0) {
    const c = new Joint(
      cube.physics,
      objects.at(-1).physics,
      [0, -3, 0],
      [0, 3, 0],
      0.1
    );
    chain.push(c);

    // cube.physics.static = true
  }
  sim.addObject(cube.physics);
  objects.push(cube);
}
sim.addConstraints(chain, "chain");

function createRagdoll(pos = [0, 0, 0]) {
  const body = new RigidBody(new Box(1, 2, 0.5));
  const leftHand = new RigidBody(new Cylinder(0.5, 2, 0.5));
  const rightHand = new RigidBody(new Cylinder(0.5, 2, 0.5));
  const leftLeg = new RigidBody(new Cylinder(0.5, 2, 0.5));
  const rightLeg = new RigidBody(new Cylinder(0.5, 2, 0.5));
  const head = new RigidBody(new Sphere(1, 1, 1));
  const constraints = [
    new Joint(body, head, [0, 1.5, 0], [0, -1, 0], 0),
    new Joint(body, leftHand, [1, 1, 0], [0, 1, 0], 0),
    new Joint(body, rightHand, [-1, 1, 0], [0, 1, 0], 0),
    new Joint(body, rightLeg, [-0.5, -1.2, 0], [0, 1.2, 0], 0),
    new Joint(body, leftLeg, [0.5, -1.2, 0], [0, 1.2, 0], 0),
  ];
  const positionConstraints = [
    new JointPositionConstraint(body, head, [0, 1.5, 0], [0, -1, 0], 0.2),
    new JointPositionConstraint(body, leftHand, [1, 1, 0], [0, 1, 0], 0.2),
    new JointPositionConstraint(body, rightHand, [-1, 1, 0], [0, 1, 0], 0.2),
    new JointPositionConstraint(
      body,
      rightLeg,
      [-0.5, -1.2, 0],
      [0, 1.2, 0],
      0.2
    ),
    new JointPositionConstraint(
      body,
      leftLeg,
      [0.5, -1.2, 0],
      [0, 1.2, 0],
      0.2
    ),
  ];
  //positionConstraints.forEach(c =>c.treshold = 0.1)
  body.translate(pos);

  head.translate(vector.sum(pos, [0, 2, 0]));
  leftHand.translate(vector.sum(pos, [-3, 2, 0]));
  rightHand.translate(vector.sum(pos, [3, 2, 0]));
  rightLeg.translate(vector.sum(pos, [2, -2.5, 0]));
  leftLeg.translate(vector.sum(pos, [-2, -2.5, 0]));
  const bodies = [body, leftHand, rightHand, rightLeg, leftLeg, head];
  positionConstraints.forEach((c) => (c.treshold = 0.05));
  bodies.forEach((b) => {
    //b.group = 'ragdoll'
    //b.setMass(10)
  });

  return [bodies, constraints, positionConstraints];
}

for (let i = 0; i < 3; i++) {
  const [bodies, constraints, positionConstraints] = createRagdoll([
    6 * i,
    10,
    -10,
  ]);

  bodies.forEach((b) => {
    sim.addObject(b);
    b.addAcceleration([0, -g, 0]);
    // b.group = 'ragdoll' + i
    objects.push({ physics: b, sprite: box });
  });
  sim.addConstraints(constraints, "ragdoll" + i);
  sim.addPositionConstraints(positionConstraints, "ragdol" + i);
}

const platform = new RigidBody(new Box());
platform.DOF = [0, 0, 0, 0, 0, 0];
platform.static = true;
sim.addConstraints(
  [new Joint(platform, objects.at(-1).physics, [0, -1.5, 0], [0, 2, 0], 0.1)],
  "platform"
);
platform.translate([20, 10, -10]);

floor.physics.setMass(100000000);

floor.physics.translate([0, -3, 0]);

floor.static = true;
floor.DOF = [0, 0, 0, 0, 0, 0];
const player = new Controllable(cube4.physics);

player.listenKeyboard(keyInput);
player.listenMouse(mouseInput);

let lastCall = Date.now();
const fps = document.querySelector("#fps");

const loop = () => {
  sim.tick(0.01666);
  player.tick();
  const curentTime = Date.now();
  const delta = curentTime - lastCall;
  fps.textContent = (1 / delta) * 1000;
  lastCall = curentTime;
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.CULL_FACE);
  gl.enable(gl.DEPTH_TEST);

  const cameraMatrix = player.camMatrix;
  const { translation } = m4.decompose(cameraMatrix);

  objects.forEach((obj) => {
    const u_matrix = obj.physics.collider.getM4();

    const u_viewWorldPosition = translation;
    obj.sprite.draw(
      { ...uniforms, u_matrix, u_viewWorldPosition, u_color: [1, 0.5, 0.1, 1] },
      cameraMatrix
    );
  });

  circle
    .draw(
      {
        u_matrix: m4.rotation(Math.PI / 2, 0, 0),
        u_color: [1, 0.5, 0.1, 1],
        u_worldViewPosition: cameraMatrix,
      },
      cameraMatrix
    )
    .draw(
      {
        u_matrix: m4.identity(),
        u_color: [1, 0.5, 0.1, 1],
        u_worldViewPosition: cameraMatrix,
      },
      cameraMatrix
    );
  points.draw(
    {
      u_matrix: m4.identity(),
      u_color: [0, 0.5, 0.1, 1],
      u_worldViewPosition: cameraMatrix,
    },
    cameraMatrix
  );

  for (const [name, constraints] of sim.constraints) {
    constraints.forEach((c) => {
      points.draw(
        {
          u_matrix: m4.translation(...c.PA),
          u_color: [1.0, 0.0, 0.1, 1],
          u_worldViewPosition: cameraMatrix,
        },
        cameraMatrix
      );
      points.draw(
        {
          u_matrix: m4.translation(...c.PB),
          u_color: [1.0, 0.0, 0.1, 1],
          u_worldViewPosition: cameraMatrix,
        },
        cameraMatrix
      );
    });
  }
  const manifolds = sim.collisionManifolds.values();
  /*
  for (const manifold of manifolds) {
    manifold.contacts.forEach((contact) => {
      points
        .draw(
          {
            u_matrix: m4.translation(...contact.PA),
            u_color: [0.6, 0.6, 0.0, 1],
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
  }*/

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  requestAnimationFrame(loop);
};
loop();
