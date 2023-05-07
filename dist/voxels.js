/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./demo/voxels/VoxelWorldPrimitive.js":
/*!********************************************!*\
  !*** ./demo/voxels/VoxelWorldPrimitive.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VoxelWorld)
/* harmony export */ });
const mod = (n, m) => ((n % m) + m) % m;

class VoxelWorld {
  static faces =[
    { // left
      uvRow: 0,
      dir: [ -1,  0,  0, ],
      corners: [
        { pos: [ 0, 1, 0 ], uv: [ 0, 1 ], },
        { pos: [ 0, 0, 0 ], uv: [ 0, 0 ], },
        { pos: [ 0, 1, 1 ], uv: [ 1, 1 ], },
        { pos: [ 0, 0, 1 ], uv: [ 1, 0 ], },
      ],
    },
    { // right
      uvRow: 0,
      dir: [  1,  0,  0, ],
      corners: [
        { pos: [ 1, 1, 1 ], uv: [ 0, 1 ], },
        { pos: [ 1, 0, 1 ], uv: [ 0, 0 ], },
        { pos: [ 1, 1, 0 ], uv: [ 1, 1 ], },
        { pos: [ 1, 0, 0 ], uv: [ 1, 0 ], },
      ],
    },
    { // bottom
      uvRow: 1,
      dir: [  0, -1,  0, ],
      corners: [
        { pos: [ 1, 0, 1 ], uv: [ 1, 0 ], },
        { pos: [ 0, 0, 1 ], uv: [ 0, 0 ], },
        { pos: [ 1, 0, 0 ], uv: [ 1, 1 ], },
        { pos: [ 0, 0, 0 ], uv: [ 0, 1 ], },
      ],
    },
    { // top
      uvRow: 2,
      dir: [  0,  1,  0, ],
      corners: [
        { pos: [ 0, 1, 1 ], uv: [ 1, 1 ], },
        { pos: [ 1, 1, 1 ], uv: [ 0, 1 ], },
        { pos: [ 0, 1, 0 ], uv: [ 1, 0 ], },
        { pos: [ 1, 1, 0 ], uv: [ 0, 0 ], },
      ],
    },
    { // back
      uvRow: 0,
      dir: [  0,  0, -1, ],
      corners: [
        { pos: [ 1, 0, 0 ], uv: [ 0, 0 ], },
        { pos: [ 0, 0, 0 ], uv: [ 1, 0 ], },
        { pos: [ 1, 1, 0 ], uv: [ 0, 1 ], },
        { pos: [ 0, 1, 0 ], uv: [ 1, 1 ], },
      ],
    },
    { // front
      uvRow: 0,
      dir: [  0,  0,  1, ],
      corners: [
        { pos: [ 0, 0, 1 ], uv: [ 0, 0 ], },
        { pos: [ 1, 0, 1 ], uv: [ 1, 0 ], },
        { pos: [ 0, 1, 1 ], uv: [ 0, 1 ], },
        { pos: [ 1, 1, 1 ], uv: [ 1, 1 ], },
      ],
    },
  ];
  constructor(options) {
    this.cellSize = options.cellSize;
    this.tileSize = options.tileSize;
    this.tileTextureWidth = options.tileTextureWidth;
    this.tileTextureHeight = options.tileTextureHeight;
    const {cellSize} = this;
    this.cellSliceSize = cellSize * cellSize;
    this.cells = {}
    this.cellMeshes = {}
  }
  computeCellId(x, y, z) {
    const {cellSize} = this;
    const cellX = Math.floor(x / cellSize);
    const cellY = Math.floor(y / cellSize);
    const cellZ = Math.floor(z / cellSize);
    return `${cellX},${cellY},${cellZ}`;
  }
  computeVoxelOffset(x, y, z) {
    const { cellSize, cellSliceSize } = this;
    const voxelX = mod(x, cellSize);
    const voxelY = mod(y, cellSize);
    const voxelZ = mod(z, cellSize);
    return voxelY * cellSliceSize + voxelZ * cellSize + voxelX;
  }
  getCellForVoxel(x, y, z) {
    return this.cells[this.computeCellId(x, y, z)];
  }
  getVoxel(x, y, z) {
    const cell = this.getCellForVoxel(x, y, z);
    if (!cell) {
      return 0;
    }
    const voxelOffset = this.computeVoxelOffset(x, y, z);
    return cell[voxelOffset];
  }
  setVoxel(x, y, z, v) {
    let cell = this.getCellForVoxel(x, y, z);

    if (!cell) {
      cell = this.addCellForVoxel(x, y, z)
    }

    const voxelOffset = this.computeVoxelOffset(x, y, z);
    cell[voxelOffset] = v;
  }
  addCellForVoxel(x, y, z) {
    const cellId = this.computeCellId(x, y, z);
    let cell = this.cells[cellId];
    if (!cell) {
      const {cellSize} = this;
      cell = new Uint8Array(cellSize * cellSize * cellSize);
      this.cells[cellId] = cell;
    }
    return cell;
  }
  generateGeometryDataForCell(cellX, cellY, cellZ) {
    const { cellSize, tileSize, tileTextureWidth, tileTextureHeight } = this;
    const positions = [];
    const normals = [];
    const indices = [];
    const uvs = [];
    const startX = cellX * cellSize;
    const startY = cellY * cellSize;
    const startZ = cellZ * cellSize;

    for (let y = 0; y < cellSize; ++y) {
      const voxelY = startY + y;
      for (let z = 0; z < cellSize; ++z) {
        const voxelZ = startZ + z;
        for (let x = 0; x < cellSize; ++x) {
          const voxelX = startX + x;
          const voxel = this.getVoxel(voxelX, voxelY, voxelZ);

          if (voxel) {
            const uvVoxel = voxel - 1;
            for (const { dir, corners, uvRow } of VoxelWorld.faces) {
              const neighbor = this.getVoxel(
                voxelX + dir[0],
                voxelY + dir[1],
                voxelZ + dir[2]
              );
              if (!neighbor) {
                const ndx = positions.length / 3;
                for (const { pos, uv } of corners) {
                  positions.push(pos[0] + voxelX, pos[1] + voxelY, pos[2] + voxelZ);
                  normals.push(...dir);
                  uvs.push(
                    ((uvVoxel + uv[0]) * tileSize) / tileTextureWidth,
                    1 - ((uvRow + 1 - uv[1]) * tileSize) / tileTextureHeight
                  );
                }
                indices.push(ndx, ndx + 1, ndx + 2, ndx + 2, ndx + 1, ndx + 3);
              }
            }
          }
        }
      }
    }
    const _normals = new Float32Array(normals);
    const _positions = new Float32Array(positions);
    const _indices = new Uint16Array(indices);
    const _texcoord = new Float32Array(uvs)
    const ArrayData = {
      attributes: {
        NORMAL: {
          data: _normals,
          count: normals.length,
          location: 1,
          byteLength: _normals.byteLength,
          stride: 0,
          offset: 0,
          numComponents: 3,
          attributeType : WebGL2RenderingContext.FLOAT_VEC3,
          type: 5126,
        },
        POSITION: {
          data: _positions,
          count: positions.length,
          location: 0,
          byteLength: _positions.byteLength,
          stride: 0,
          offset: 0,
          numComponents: 3,
          attributeType : WebGL2RenderingContext.FLOAT_VEC3,
          type: 5126,
        },
        TEXCOORD_0: {
            data: _texcoord,
            count: uvs.length,
            type: 5126,
            offset: 0,
            stride: 0,
            byteLength: _texcoord.byteLength,
            location: 2,
            numComponents: 2,
            attributeType : WebGL2RenderingContext.FLOAT_VEC2,
          },
      },
      indices: _indices,
      numElements: indices.length,
      componentType: 5123,
      mode: 4,
    };

    return ArrayData;
  }
  updateCellGeometry
}


/***/ }),

/***/ "./node_modules/romanpppgraphics/lib/components/BufferAttribute.js":
/*!*************************************************************************!*\
  !*** ./node_modules/romanpppgraphics/lib/components/BufferAttribute.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BufferAttributeInfo": () => (/* binding */ BufferAttributeInfo)
/* harmony export */ });
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums */ "./node_modules/romanpppgraphics/lib/components/enums.js");

const typeInfo = {
    [_enums__WEBPACK_IMPORTED_MODULE_0__.FLOAT_MAT4]: { size: 64, rows: 4, cols: 4 },
    [_enums__WEBPACK_IMPORTED_MODULE_0__.FLOAT_MAT2]: { size: 32, rows: 2, cols: 2 },
    [_enums__WEBPACK_IMPORTED_MODULE_0__.FLOAT_MAT3]: { size: 48, rows: 3, cols: 3 },
};
const floatAttribSetter = ({ numComponents, type, location, stride, offset, buffer, gl, divisor, normalize, }) => {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, numComponents, type || gl.FLOAT, normalize || false, stride || 0, offset || 0);
    gl.vertexAttribDivisor(location, divisor || 0);
};
const matAttribSetter = ({ numComponents, type, location, offset, buffer, gl, divisor, normalize, attributeType, }) => {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    const stride = typeInfo[attributeType].size;
    const count = typeInfo[attributeType].rows;
    const rowOffset = stride / count;
    for (let i = 0; i < count; i++) {
        gl.enableVertexAttribArray(location + i);
        gl.vertexAttribPointer(location, numComponents, type | gl.FLOAT, false, stride | 0, offset + rowOffset * i);
        gl.vertexAttribDivisor(location + i, divisor || 0);
    }
};
const intAttribSetter = ({ numComponents, type, location, stride, offset, buffer, gl, divisor, }) => {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribIPointer(location, numComponents, type || gl.INT, stride || 0, offset || 0);
    gl.vertexAttribDivisor(location, divisor || 0);
};
const attribTypeMap = {};
attribTypeMap[_enums__WEBPACK_IMPORTED_MODULE_0__.INT] = intAttribSetter;
attribTypeMap[_enums__WEBPACK_IMPORTED_MODULE_0__.FLOAT] = floatAttribSetter;
attribTypeMap[_enums__WEBPACK_IMPORTED_MODULE_0__.FLOAT_VEC2] = floatAttribSetter;
attribTypeMap[_enums__WEBPACK_IMPORTED_MODULE_0__.FLOAT_VEC3] = floatAttribSetter;
attribTypeMap[_enums__WEBPACK_IMPORTED_MODULE_0__.FLOAT_VEC4] = floatAttribSetter;
attribTypeMap[_enums__WEBPACK_IMPORTED_MODULE_0__.FLOAT_MAT2] = matAttribSetter;
attribTypeMap[_enums__WEBPACK_IMPORTED_MODULE_0__.FLOAT_MAT3] = matAttribSetter;
attribTypeMap[_enums__WEBPACK_IMPORTED_MODULE_0__.FLOAT_MAT4] = matAttribSetter;
attribTypeMap[_enums__WEBPACK_IMPORTED_MODULE_0__.UNSIGNED_INT] = intAttribSetter;
attribTypeMap[_enums__WEBPACK_IMPORTED_MODULE_0__.UNSIGNED_INT_VEC2] = intAttribSetter;
attribTypeMap[_enums__WEBPACK_IMPORTED_MODULE_0__.UNSIGNED_INT_VEC3] = intAttribSetter;
attribTypeMap[_enums__WEBPACK_IMPORTED_MODULE_0__.UNSIGNED_INT_VEC3] = intAttribSetter;
attribTypeMap[_enums__WEBPACK_IMPORTED_MODULE_0__.UNSIGNED_INT_VEC4] = intAttribSetter;
attribTypeMap[_enums__WEBPACK_IMPORTED_MODULE_0__.INT_VEC2] = intAttribSetter;
attribTypeMap[_enums__WEBPACK_IMPORTED_MODULE_0__.INT_VEC3] = intAttribSetter;
attribTypeMap[_enums__WEBPACK_IMPORTED_MODULE_0__.INT_VEC4] = intAttribSetter;
attribTypeMap[_enums__WEBPACK_IMPORTED_MODULE_0__.BOOL] = intAttribSetter;
attribTypeMap[_enums__WEBPACK_IMPORTED_MODULE_0__.BOOL_VEC2] = intAttribSetter;
attribTypeMap[_enums__WEBPACK_IMPORTED_MODULE_0__.BOOL_VEC3] = intAttribSetter;
attribTypeMap[_enums__WEBPACK_IMPORTED_MODULE_0__.BOOL_VEC4] = intAttribSetter;
class BufferAttributeInfo {
    constructor(gl, { stride, type, offset, location, numComponents, attributeType, divisor }) {
        this.gl = gl;
        this.buffer = gl.createBuffer();
        this.stride = stride | 0;
        this.numComponents = numComponents;
        this.attributeType = attributeType;
        this.offset = offset | 0;
        this.type = type;
        this.location = location;
        this.divisor = divisor;
    }
    setAttribute() {
        const { attributeType } = this;
        const setter = attribTypeMap[attributeType];
        setter(this);
    }
    bufferData(data, usage = 0x88e4) {
        const { gl, buffer } = this;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, usage);
    }
    allocBuffer(byteLength, usage = 0x88e4) {
        const { gl, buffer } = this;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, byteLength, usage);
    }
    bufferSubData(data, offset = 0) {
        const { gl, buffer } = this;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, offset, data);
    }
}



/***/ }),

/***/ "./node_modules/romanpppgraphics/lib/components/Drawer.js":
/*!****************************************************************!*\
  !*** ./node_modules/romanpppgraphics/lib/components/Drawer.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var romanpppmath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! romanpppmath */ "./node_modules/romanpppmath/lib/index.js");

const degToRad = (d) => (d * Math.PI) / 180;
const fieldOfViewRadians = degToRad(90);
class Drawer {
    static create3dProjectionMatrix(zNear, zFar, clientWidth, clientHeight) {
        const aspect = clientWidth / clientHeight;
        return romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m4.perspective(fieldOfViewRadians, aspect, zNear, zFar);
    }
    constructor(context) {
        this.context = context;
        this.projectionMatrix = null;
    }
    setContext(glContextWrapper) {
        this.context = glContextWrapper;
        return this;
    }
    draw(primitiveRenderer, uniforms, cameraMatrix) {
        const { VAO, mode, offset, numElements, indices, programInfo, componentType, } = primitiveRenderer;
        const { projectionMatrix } = this;
        const { gl } = this.context;
        const viewMatrix = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m4.inverse(cameraMatrix);
        const viewProjectionMatrix = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m4.multiply(projectionMatrix, viewMatrix);
        const u_worldViewProjection = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m4.multiply(viewProjectionMatrix, uniforms.u_matrix);
        this.context.useProgramInfo(programInfo);
        this.context
            .lastUsedProgramInfo
            .setUniforms(Object.assign(Object.assign({}, uniforms), { u_worldViewProjection }));
        gl.bindVertexArray(VAO);
        if (!indices) {
            gl.drawArrays(mode, offset, numElements);
            return;
        }
        gl.drawElements(mode, numElements, componentType, offset);
    }
    drawInstanced(primitiveRenderer, uniforms, cameraMatrix, numInstances) {
        const { VAO, mode, offset, numElements, indices, programInfo, componentType, } = primitiveRenderer;
        const { projectionMatrix } = this;
        const { gl } = this.context;
        const viewMatrix = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m4.inverse(cameraMatrix);
        const viewProjectionMatrix = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m4.multiply(projectionMatrix, viewMatrix);
        const worldViewProjection = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m4.multiply(viewProjectionMatrix, uniforms.u_matrix);
        const worldMatrix = uniforms.u_matrix;
        this.context.useProgramInfo(programInfo);
        this.context.
            lastUsedProgramInfo
            .setUniforms(Object.assign(Object.assign({}, uniforms), { worldMatrix, worldViewProjection }));
        gl.bindVertexArray(VAO);
        if (!indices) {
            gl.drawArraysInstanced(mode, offset, numElements, numInstances);
            return;
        }
        gl.drawElementsInstanced(mode, numElements, gl.UNSIGNED_SHORT, offset, numInstances);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Drawer);


/***/ }),

/***/ "./node_modules/romanpppgraphics/lib/components/GLWrapper.js":
/*!*******************************************************************!*\
  !*** ./node_modules/romanpppgraphics/lib/components/GLWrapper.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GLWrapper)
/* harmony export */ });
/* harmony import */ var _TextureInfo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TextureInfo */ "./node_modules/romanpppgraphics/lib/components/TextureInfo.js");
/* harmony import */ var _PrimitiveRenderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PrimitiveRenderer */ "./node_modules/romanpppgraphics/lib/components/PrimitiveRenderer.js");
/* harmony import */ var _Drawer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Drawer */ "./node_modules/romanpppgraphics/lib/components/Drawer.js");
/* harmony import */ var _ProgramInfo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ProgramInfo */ "./node_modules/romanpppgraphics/lib/components/ProgramInfo.js");




class GLWrapper {
    constructor(canvasId) {
        this.ProgramInfo = (() => {
            const self = this;
            return class extends _ProgramInfo__WEBPACK_IMPORTED_MODULE_3__.ProgramInfo {
                constructor(vertexShaderSource, fragmentShaderSource) {
                    super(self, vertexShaderSource, fragmentShaderSource);
                }
            };
        })();
        this.PrimitiveRenderer = (() => {
            const self = this;
            return class extends _PrimitiveRenderer__WEBPACK_IMPORTED_MODULE_1__["default"] {
                static fromArrayData(arrayData) {
                    const primitiveRenderer = new _PrimitiveRenderer__WEBPACK_IMPORTED_MODULE_1__["default"](self.gl);
                    primitiveRenderer
                        .createVAO()
                        .createGeometryBuffers(arrayData)
                        .setAttributes();
                    return primitiveRenderer;
                }
                constructor() {
                    super(self.gl);
                }
            };
        })();
        this.Drawer = (() => {
            const self = this;
            return class extends _Drawer__WEBPACK_IMPORTED_MODULE_2__["default"] {
                constructor() {
                    super(self);
                }
            };
        })();
        this.TextureInfo = (() => {
            const self = this;
            return class extends _TextureInfo__WEBPACK_IMPORTED_MODULE_0__.TextureInfo {
                constructor() {
                    super(self.gl);
                }
            };
        })();
        const gl = document.getElementById(canvasId).getContext("webgl2");
        if (!gl) {
            throw new Error("No webgl!");
        }
        this.gl = gl;
        this.programs = {};
    }
    /*
    getLastUsedProgramInfo() {
      return this.renderCache.lastUsedProgramInfo;
    }
    setLastUsedProgram(programInfo) {
      this.renderCache.lastUsedProgramInfo = programInfo;
      return this;
    }
    */
    useProgramInfo(programInfo) {
        if (programInfo != this.lastUsedProgramInfo) {
            this.gl.useProgram(programInfo.program);
            this.lastUsedProgramInfo = programInfo;
        }
        return this;
    }
    resizeCanvasToDisplaySize(multiplier = 1) {
        const canvas = this.gl.canvas;
        const width = (canvas.clientWidth * multiplier) | 0;
        const height = (canvas.clientHeight * multiplier) | 0;
        canvas.width = width;
        canvas.height = height;
        return this;
    }
    resizeCanvas(width, height) {
        const canvas = this.gl.canvas;
        canvas.width = width;
        canvas.height = height;
        return this;
    }
    setViewport() {
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        return this;
    }
    getContext() {
        return this.gl;
    }
}


/***/ }),

/***/ "./node_modules/romanpppgraphics/lib/components/GltfUtils.js":
/*!*******************************************************************!*\
  !*** ./node_modules/romanpppgraphics/lib/components/GltfUtils.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ArrayDataFromGltf": () => (/* binding */ ArrayDataFromGltf),
/* harmony export */   "EntityDataFromGltf": () => (/* binding */ EntityDataFromGltf),
/* harmony export */   "GLTF": () => (/* binding */ GLTF),
/* harmony export */   "PrimitiveRenderInfoFromArrayData": () => (/* binding */ PrimitiveRenderInfoFromArrayData)
/* harmony export */ });
/* harmony import */ var _PrimitiveRenderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PrimitiveRenderer */ "./node_modules/romanpppgraphics/lib/components/PrimitiveRenderer.js");
/* harmony import */ var _MeshRenderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MeshRenderer */ "./node_modules/romanpppgraphics/lib/components/MeshRenderer.js");
/* harmony import */ var _BufferAttribute__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BufferAttribute */ "./node_modules/romanpppgraphics/lib/components/BufferAttribute.js");
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./enums */ "./node_modules/romanpppgraphics/lib/components/enums.js");




/// TODO ///
const ArrayDataFromGltf = (gltf, buffers) => {
    const { bufferViews, accessors, meshes, nodes } = gltf;
    const attribDataFromAccessor = (accessor) => {
        const bufferView = bufferViews[accessor.bufferView];
        const { count, componentType, type } = accessor;
        const byteOffset = accessor.byteOffset || 0;
        const { byteLength, target } = bufferView;
        const stride = bufferView.byteStride || 0;
        const bufferViewByteOffset = bufferView.byteOffset || 0;
        const buffer = buffers[bufferView.buffer];
        return {
            data: new Uint8Array(buffer, bufferViewByteOffset, byteLength),
            numComponents: _enums__WEBPACK_IMPORTED_MODULE_3__.NUM_COMPONENTS[type],
            stride,
            byteLength,
            location: null,
            count,
            type: componentType,
            offset: byteOffset || 0,
            componentType: accessor.componentType,
        };
    };
    const _meshes = meshes.map((mesh) => ({
        primitives: mesh.primitives.map((_primitive) => {
            const primitive = {
                attributes: {},
                mode: _primitive.mode,
            };
            if (_primitive.hasOwnProperty("indices")) {
                const indicesInfo = attribDataFromAccessor(accessors[_primitive.indices]);
                primitive.indices = indicesInfo.data;
                primitive.numElements = indicesInfo.count;
                primitive.componentType = indicesInfo.componentType;
            }
            Object.keys(_primitive.attributes).forEach((attribName) => {
                const attribute = _primitive.attributes[attribName];
                primitive.attributes[attribName] = attribDataFromAccessor(accessors[attribute]);
                //if(attribName === 'JOINTS_0') _primitive.attributes[attribName].data = new Uint32Array(_primitive.attributes[attribName].data)
                primitive.attributes[attribName].location = _enums__WEBPACK_IMPORTED_MODULE_3__.LOCATIONS[attribName];
            });
            return primitive;
        }),
        name: mesh.name,
    }));
    return _meshes.map((mesh) => {
        const primitives = mesh.primitives.map((primitive) => new _PrimitiveRenderer__WEBPACK_IMPORTED_MODULE_0__["default"](primitive));
        const name = mesh.name;
        return new _MeshRenderer__WEBPACK_IMPORTED_MODULE_1__.MeshRenderer({ primitives, name });
    });
};
const PrimitiveRenderInfoFromArrayData = (meshes) => meshes.map((mesh) => {
    const primitives = mesh.primitives.map((primitive) => new _PrimitiveRenderer__WEBPACK_IMPORTED_MODULE_0__["default"](primitive));
    const name = mesh.name;
    return new _MeshRenderer__WEBPACK_IMPORTED_MODULE_1__.MeshRenderer({ name, primitives });
});
const EntityDataFromGltf = (gltf, buffers) => PrimitiveRenderInfoFromArrayData(ArrayDataFromGltf(gltf, buffers));
class GLTF {
    constructor(gltf, binaryBuffers) {
        const { nodes } = gltf;
        this.nodes = nodes;
        this.meshes = ArrayDataFromGltf(gltf, binaryBuffers);
    }
}



/***/ }),

/***/ "./node_modules/romanpppgraphics/lib/components/MeshRenderer.js":
/*!**********************************************************************!*\
  !*** ./node_modules/romanpppgraphics/lib/components/MeshRenderer.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MeshRenderer": () => (/* binding */ MeshRenderer),
/* harmony export */   "SkinnedMeshRenderer": () => (/* binding */ SkinnedMeshRenderer)
/* harmony export */ });
/* harmony import */ var _attribTypeProps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./attribTypeProps */ "./node_modules/romanpppgraphics/lib/components/attribTypeProps.js");
/* harmony import */ var _BufferAttribute__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BufferAttribute */ "./node_modules/romanpppgraphics/lib/components/BufferAttribute.js");



class MeshRenderer {
    constructor({ primitives, name }) {
        this.primitives = primitives;
        this.name = name;
        this.context = null;
        this.buffers = {};
    }
    draw(uniforms, cameraMatrix) {
        for (let i = 0, n = this.primitives.length; i < n; i++) {
            this.primitives[i].draw(uniforms, cameraMatrix);
        }
        return this;
    }
    drawInstanced(uniforms, cameraMatrix, numInstances) {
        for (let i = 0, n = this.primitives.length; i < n; i++) {
            this.primitives[i].drawInstanced(uniforms, cameraMatrix, numInstances);
        }
        return this;
    }
}
class SkinnedMeshRenderer {
    constructor(primitives, skin) {
        this.primitives = primitives;
        this.skin = skin;
    }
    draw(uniforms, cameraMatrix) {
        this.skin.update(uniforms.u_matrix);
        const _uniforms = Object.assign({ u_jointTexture: this.skin.jointTexture, u_numJoints: this.skin.joints.length }, uniforms);
        for (let i = 0, n = this.primitives.length; i < n; i++) {
            this.primitives[i].draw(_uniforms, cameraMatrix);
        }
    }
}



/***/ }),

/***/ "./node_modules/romanpppgraphics/lib/components/Model.js":
/*!***************************************************************!*\
  !*** ./node_modules/romanpppgraphics/lib/components/Model.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class TRS {
    constructor(translation, rotation, scale) {
        this.translation = translation;
        this.rotation = rotation;
        this.scale = scale;
    }
    getMatrix(m) {
        let dst = m || m4.identity();
        var t = this.translation;
        var r = this.rotation;
        var s = this.scale;
        const sin = Math.sin(r[3] / 2);
        const cos = Math.cos(r[3] / 2);
        dst = m4.translate(dst, t[0], t[1], t[2]);
        dst = m4.multiply(dst, m4.fromQuaternion(r));
        dst = m4.scale(dst, s[0], s[1], s[2]);
        return dst;
    }
    getRMatrix() {
        let dst = m4.identity();
        var r = this.rotation;
        dst = m4.xRotate(dst, r[0]);
        dst = m4.yRotate(dst, r[1]);
        dst = m4.zRotate(dst, r[2]);
        return dst;
    }
    getTRmatrix() {
        const t = this.translation;
        const r = this.rotation;
        let m = m4.translation(t[0], t[1], t[2]);
        m = m4.xRotate(m, r[0]);
        m = m4.yRotate(m, r[1]);
        m = m4.zRotate(m, r[2]);
        return m;
    }
}
class Node {
    static makeModel(entityDescription, rootNodeNdx) {
        const { nodes, meshes } = entityDescription;
        const rootNode = nodes[rootNodeNdx];
        const makeNode = (nodeDescription, ndx) => {
            const trs = new TRS(nodeDescription.translation || [0, 0, 0], nodeDescription.rotation || [0, 0, 0], nodeDescription.scale || [1, 1, 1]);
            const node = new Node(nodeDescription.name, trs, ndx);
            if (nodeDescription.mesh != undefined) {
                node.renderer = meshes[nodeDescription.mesh];
            }
            if (nodeDescription.children) {
                nodeDescription.children.forEach((childNdx) => {
                    const child = makeNode(nodes[childNdx], childNdx);
                    child.setParent(node);
                });
            }
            return node;
        };
        return makeNode(rootNode, rootNodeNdx);
    }
    constructor(name, trs = new TRS()) {
        this.worldMatrix = m4.identity();
        this.parent = null;
        this.children = [];
        this.trs = trs;
        this.name = name;
        this.parts = [];
        this.ndx = ndx;
        this.skinNdx = null;
        this.objectsToDraw = [];
        this.renderer = null;
    }
    setParent(parent) {
        if (this.parent) {
            const ndx = this.parent.children.indexOf(this);
            if (ndx >= 0) {
                this.parent.children.splice(ndx, 1);
            }
        }
        if (parent) {
            parent.children.push(this);
        }
        this.parent = parent;
    }
    updateWorldMatrix(parentWorldMatrix) {
        let matrix = this.trs.getMatrix();
        if (parentWorldMatrix) {
            matrix = m4.multiply(parentWorldMatrix, matrix);
        }
        this.worldMatrix = matrix;
        this.children.forEach((child) => {
            child.updateWorldMatrix(matrix);
        });
    }
    updatePartsList() {
        const iter = (node, arr) => {
            arr.push(node);
            node.children.forEach((child) => iter(child, arr));
        };
        iter(this, this.parts);
    }
    updateObjectsToDraw() {
        const queue = [this];
        while (queue.length > 0) {
            const node = queue.pop();
            console.log(node);
            if (node.renderer)
                this.objectsToDraw.push(node);
            if (node.children)
                queue.push(...node.children);
        }
    }
    traverse(fn) {
        fn(this);
        this.children.forEach((child) => child.traverse(fn));
    }
    find(ndx) {
        let result = null;
        const iter = (nodes) => {
            for (let node of nodes) {
                if (node.ndx === ndx)
                    result = node;
                else
                    iter(node.children);
            }
        };
        iter([this]);
        return result;
    }
    findByName(name) {
        let result = null;
        const iter = (nodes) => {
            for (let node of nodes) {
                if (node.name === name)
                    result = node;
                else
                    iter(node.children);
            }
        };
        iter([this]);
        return result;
    }
    render(uniforms, cameraMatrix) {
        this.objectsToDraw.forEach((object) => {
            object.renderer.draw(Object.assign(Object.assign({}, uniforms), { u_matrix: object.worldMatrix }), cameraMatrix);
        });
    }
}
class Model extends Node {
    static makeModel(entityDescription, rootNodeNdx) {
        const { nodes, meshes } = entityDescription;
        const rootNode = nodes[rootNodeNdx];
        const makeNode = (nodeDescription, ndx) => {
            const trs = new TRS(nodeDescription.translation || [0, 0, 0], nodeDescription.rotation || [0, 0, 0, 0], nodeDescription.scale || [1, 1, 1]);
            const node = new Entity(nodeDescription.name, trs, ndx);
            if (nodeDescription.mesh != undefined) {
                node.renderer = meshes[nodeDescription.mesh];
            }
            if (nodeDescription.children) {
                nodeDescription.children.forEach((childNdx) => {
                    const child = makeNode(nodes[childNdx], childNdx);
                    child.setParent(node);
                });
            }
            return node;
        };
        return makeNode(rootNode, rootNodeNdx);
    }
    constructor(name, trs, ndx) {
        super(name, trs);
        this.ndx = ndx;
        this.physics = null;
        this.skinNdx = null;
        this.objectsToDraw = [];
        this.renderer = null;
    }
    updateObjectsToDraw() {
        const queue = [this];
        while (queue.length > 0) {
            const node = queue.pop();
            console.log(node);
            if (node.renderer)
                this.objectsToDraw.push(node);
            if (node.children)
                queue.push(...node.children);
        }
    }
    traverse(fn) {
        fn(this);
        this.children.forEach((child) => child.traverse(fn));
    }
    find(ndx) {
        let result = null;
        const iter = (nodes) => {
            for (let node of nodes) {
                if (node.ndx === ndx)
                    result = node;
                else
                    iter(node.children);
            }
        };
        iter([this]);
        return result;
    }
    findByName(name) {
        let result = null;
        const iter = (nodes) => {
            for (let node of nodes) {
                if (node.name === name)
                    result = node;
                else
                    iter(node.children);
            }
        };
        iter([this]);
        return result;
    }
    render(uniforms, cameraMatrix) {
        this.objectsToDraw.forEach((object) => {
            object.renderer.draw(Object.assign(Object.assign({}, uniforms), { u_matrix: object.worldMatrix }), cameraMatrix);
        });
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Model);


/***/ }),

/***/ "./node_modules/romanpppgraphics/lib/components/PrimitiveRenderer.js":
/*!***************************************************************************!*\
  !*** ./node_modules/romanpppgraphics/lib/components/PrimitiveRenderer.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BufferAttribute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BufferAttribute */ "./node_modules/romanpppgraphics/lib/components/BufferAttribute.js");

class PrimitiveRenderer {
    constructor(gl) {
        this.bufferAttribs = {};
        this.programInfo = null;
        this.gl = gl;
        this.drawer = null;
        this.mode = null;
        this.offset = 0;
        this.numElements = null;
        this.VAO = null;
        this.componentType = null;
    }
    setContext(gl) {
        this.gl = gl;
        return this;
    }
    createVAO() {
        if (this.VAO)
            return this;
        this.VAO = this.gl.createVertexArray();
        return this;
    }
    setMode(mode) {
        this.mode = mode;
        return this;
    }
    setNumElements(numElements) {
        this.numElements = numElements;
        return this;
    }
    setOffset(offset) {
        this.offset = offset;
        return this;
    }
    setIndices(arrayBuffer) {
        const { gl, VAO } = this;
        gl.bindVertexArray(VAO);
        this.numElements = arrayBuffer.byteLength / 2;
        const indicesBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, arrayBuffer, gl.STATIC_DRAW);
        gl.bindVertexArray(null);
        this.indices = indicesBuffer;
        return this;
    }
    createGeometryBuffers(arrayData) {
        const { gl } = this;
        const { attributes, indices, componentType, numElements, mode, offset } = arrayData;
        this.numElements = numElements;
        this.mode = mode;
        this.componentType = componentType || 5123;
        this.offset = 0;
        if (attributes) {
            Object.keys(attributes).forEach((attributeName) => {
                const attribProps = attributes[attributeName];
                const bufferAttributeInfo = new _BufferAttribute__WEBPACK_IMPORTED_MODULE_0__.BufferAttributeInfo(gl, attribProps);
                bufferAttributeInfo.bufferData(attribProps.data);
                this.bufferAttribs[attributeName] = bufferAttributeInfo;
            });
        }
        if (indices) {
            const indicesBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
            this.indices = indicesBuffer;
        }
        return this;
    }
    setAttributes() {
        const { gl } = this;
        gl.bindVertexArray(this.VAO);
        for (const attrib in this.bufferAttribs) {
            const bufferAttributeInfo = this.bufferAttribs[attrib];
            bufferAttributeInfo.setAttribute();
        }
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indices);
        gl.bindVertexArray(null);
        return this;
    }
    setDrawer(drawer) {
        this.drawer = drawer;
        return this;
    }
    setProgramInfo(programInfo) {
        this.programInfo = programInfo;
        return this;
    }
    createBufferAttribData({ attribName, location, stride, numComponents, offset, type, divisor, attributeType, }) {
        const { gl } = this;
        const bufferAttribInfo = new _BufferAttribute__WEBPACK_IMPORTED_MODULE_0__.BufferAttributeInfo(gl, {
            location,
            stride,
            numComponents,
            offset,
            type,
            divisor,
            attributeType,
        });
        this.bufferAttribs[attribName] = bufferAttribInfo;
        return this;
    }
    /*
    setBufferAttribData(name, bufferAttribData) {
      this.buffers = { ...this.buffers, [name]: bufferAttribData };
      return this;
    }
    */
    setAttribute(attribName) {
        const { gl } = this;
        const bufferAttribData = this.bufferAttribs[attribName];
        gl.bindVertexArray(this.VAO);
        bufferAttribData.setAttribute();
        gl.bindVertexArray(null);
        return this;
    }
    /*
    _setAttribute(bufferAttribData) {
      const { gl } = this;
      gl.bindVertexArray(this.vao);
      bufferAttribData.setAttribute();
      gl.bindVertexArray(null);
      return this;
    }
    */
    bufferData(attribName, data, usage) {
        const bufferAttribInfo = this.bufferAttribs[attribName];
        bufferAttribInfo.bufferData(data, usage);
        return this;
    }
    bufferSubData(attribName, data, offset) {
        const bufferAttribInfo = this.bufferAttribs[attribName];
        bufferAttribInfo.bufferSubData(data, offset);
        return this;
    }
    allocBuffer(attribName, byteLength, usage) {
        const bufferAttribInfo = this.bufferAttribs[attribName];
        bufferAttribInfo.allocBuffer(byteLength, usage);
        return this;
    }
    draw(uniforms, cameraMatrix) {
        this.drawer.draw(this, uniforms, cameraMatrix);
        return this;
    }
    drawInstanced(uniforms, cameraMatrix, numInstances) {
        this.drawer.drawInstanced(this, uniforms, cameraMatrix, numInstances);
        return this;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PrimitiveRenderer);


/***/ }),

/***/ "./node_modules/romanpppgraphics/lib/components/Primitives.js":
/*!********************************************************************!*\
  !*** ./node_modules/romanpppgraphics/lib/components/Primitives.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createBox": () => (/* binding */ createBox),
/* harmony export */   "createCircle": () => (/* binding */ createCircle),
/* harmony export */   "createCone": () => (/* binding */ createCone),
/* harmony export */   "createSphere": () => (/* binding */ createSphere),
/* harmony export */   "createTruncatedCone": () => (/* binding */ createTruncatedCone)
/* harmony export */ });
/* harmony import */ var romanpppmath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! romanpppmath */ "./node_modules/romanpppmath/lib/index.js");
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enums */ "./node_modules/romanpppgraphics/lib/components/enums.js");


const { cross, diff, normalize } = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3;
const linedBoxIndices = new Uint16Array([
    0,
    1,
    1,
    2,
    2,
    3,
    3,
    0,
    0,
    5,
    5,
    4,
    4,
    1,
    1,
    0,
    0,
    4,
    4,
    7,
    7,
    3,
    3,
    0,
    1,
    2,
    2,
    6,
    6,
    5,
    5,
    1,
    4,
    5,
    5,
    6,
    6,
    7,
    7,
    4,
    2,
    7,
    7,
    3,
    3,
    6,
    6,
    2, // top
]);
const CUBE_FACE_INDICES = [
    [3, 7, 5, 1],
    [6, 2, 0, 4],
    [6, 7, 3, 2],
    [0, 1, 5, 4],
    [7, 6, 4, 5],
    [2, 3, 1, 0], // back
];
function createBox(_a = 1, _b = 1, _c = 1) {
    const a = _a / 2, b = _b / 2, c = _c / 2;
    const cornerVertices = [
        [-a, -b, -c],
        [+a, -b, -c],
        [-a, +b, -c],
        [+a, +b, -c],
        [-a, -b, +c],
        [+a, -b, +c],
        [-a, +b, +c],
        [+a, +b, +c],
    ];
    const faceNormals = [
        [+1, +0, +0],
        [-1, +0, +0],
        [+0, +1, +0],
        [+0, -1, +0],
        [+0, +0, +1],
        [+0, +0, -1],
    ];
    const uvCoords = [
        [1, 0],
        [0, 0],
        [0, 1],
        [1, 1],
    ];
    const positions = [];
    const normals = [];
    //const texCoords = webglUtils.createAugmentedTypedArray(2 , numVertices);
    const indices = [];
    for (let f = 0; f < 6; ++f) {
        const faceIndices = CUBE_FACE_INDICES[f];
        for (let v = 0; v < 4; ++v) {
            const position = cornerVertices[faceIndices[v]];
            const normal = faceNormals[f];
            positions.push(...position);
            normals.push(...normal);
        }
        const offset = 4 * f;
        indices.push(offset + 0, offset + 1, offset + 2);
        indices.push(offset + 0, offset + 2, offset + 3);
    }
    const texcoord = new Float32Array([
        // Front
        0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
        // Back
        0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
        // Top
        0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
        // Bottom
        0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
        // Right
        0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
        // Left
        0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    ]);
    const _normals = new Float32Array(normals);
    const _positions = new Float32Array(positions);
    const _indices = new Uint16Array(indices);
    const _texcoords = new Float32Array(texcoord);
    const ArrayData = {
        attributes: {
            NORMAL: {
                data: _normals,
                count: 6 * 4 * 3,
                location: 1,
                byteLength: _normals.byteLength,
                stride: 0,
                offset: 0,
                numComponents: 3,
                type: 5126,
                attributeType: _enums__WEBPACK_IMPORTED_MODULE_1__.FLOAT_VEC3
            },
            POSITION: {
                data: _positions,
                count: 6 * 4 * 3,
                location: 0,
                byteLength: _positions.byteLength,
                stride: 0,
                offset: 0,
                numComponents: 3,
                type: 5126,
                attributeType: _enums__WEBPACK_IMPORTED_MODULE_1__.FLOAT_VEC3
            },
            TEXCOORD_0: {
                data: _texcoords,
                count: 48,
                type: 5126,
                offset: 0,
                stride: 0,
                byteLength: _texcoords.byteLength,
                location: 4,
                numComponents: 2,
                attributeType: _enums__WEBPACK_IMPORTED_MODULE_1__.FLOAT_VEC2
            },
        },
        indices: _indices,
        numElements: _indices.length,
        componentType: 5123,
        mode: 4,
    };
    return ArrayData;
    /*return {
            gltf : {
              accessors : [
              {
                  bufferView : 0,
                  byteOffset : 0,
                  count :72,
                  componentType : 5126,
                  type : 'VEC3'
              },
              {
                bufferView : 1,
                byteOffset : 0,
                count : 72,
                componentType : 5126,
                type : 'VEC3'
              },
              {
                bufferView : 2,
                byteOffset : 0,
                count : 36,
                componentType : 5123,
                type : 'SCALAR'
              },
              {
                bufferView : 3,
                byteOffset : 0,
                count : 48,
                componentType : 5126,
                type : 'VEC2'
              }
              ],
            bufferViews : [
                {
                  buffer : 0,
                  byteLength : positions.byteLength,
                  byteOffset : 0
                },
                {
                  buffer : 1,
                  byteLength : normals.byteLength,
                  byteOffset : 0
                },
                {
                  buffer : 2,
                  byteLength : indices.byteLength,
                  byteOffset : 0
                },
                {
                  buffer : 3,
                  byteLength : texcoord.byteLength,
                  byteOffset : 0
                }
              ],
            meshes : [
              {
                name : 'Cube',
                primitives : [
                  {
                    attributes : {
                      NORMAL : 1,
                      POSITION : 0,
                      TEXCOORD_0 : 3
                    },
                    indices : 2,
                    mode : 4
                  }
                ]
              }
            ],
            nodes : [
              {
                name : "Cube",
                mesh : 0,
                children : [1]
              },
              {
                name : 'Cube2',
                mesh : 0,
                translation : [1,1,1]
              }
            ]
          },
          binaryBuffers : [
            positions.buffer, normals.buffer, indices.buffer, texcoord.buffer
          ]
        };*/
}
const createCone = (radius = 2, height = 2, numCorners = 4) => {
    const vertices = [0, -height / 2, 0];
    const normals = [];
    const indices = [];
    for (let i = 0; i < numCorners + 1; i++) {
        const angle = (2 * i * Math.PI) / numCorners;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = -height / 2;
        vertices.push(x, -height / 2, z);
        normals.push(0, -1, 0);
    }
    for (let i = 0; i < numCorners; i++) {
        indices.push(0, i + 1, i + 2);
    }
    //vertices.push(vertices[1], -height/2, vertices[3])
    const n = vertices.length / 3;
    const stride = 3;
    const start = n;
    for (let i = 0; i < numCorners + 2; i++) {
        const angle = (2 * i * Math.PI) / numCorners;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = -height / 2;
        const a = [vertices[i * 3], vertices[i * 3 + 1], vertices[i * 3 + 2]];
        const b = [vertices[i * 3 + 3], vertices[i * 3 + 4], vertices[i * 3 + 5]];
        const c = [0, height / 2, 0];
        indices.push(start + i * stride + 2, start + i * stride + 1, start + i * stride + 3);
        vertices.push(...c, ...a, ...b);
        const normal = normalize(cross(diff(b, c), diff(a, c)));
        normals.push(...normal, ...normal, ...normal);
    }
    const _normal = new Float32Array(normals);
    const _position = new Float32Array(vertices);
    const _indices = new Uint16Array(indices);
    const ArrayData = {
        attributes: {
            POSITION: {
                location: 0,
                count: vertices.length,
                offset: 0,
                stride: 0,
                numComponents: 3,
                type: 5126,
                data: _position,
                byteLength: _position.byteLength,
                attributeType: _enums__WEBPACK_IMPORTED_MODULE_1__.FLOAT_VEC3
            },
            NORMAL: {
                location: 1,
                count: normals.length,
                numComponents: 3,
                offset: 0,
                stride: 0,
                type: 5126,
                data: _normal,
                byteLength: _normal.byteLength,
                attributeType: _enums__WEBPACK_IMPORTED_MODULE_1__.FLOAT_VEC3
            },
        },
        componentType: 5123,
        indices: _indices,
        numElements: indices.length,
        mode: 4,
    };
    return ArrayData;
};
const createCircle = (radius, numCorners) => {
    const vertices = [0, 0, 0];
    const normals = [];
    const indices = [];
    for (let i = 0; i < numCorners + 1; i++) {
        const angle = (2 * i * Math.PI) / numCorners;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        vertices.push(x, 0, z);
        normals.push(0, 1, 0);
    }
    for (let i = 0; i < numCorners; i++) {
        indices.push(0, i + 1, i + 2);
    }
    const _normal = new Float32Array(normals);
    const _position = new Float32Array(vertices);
    const _indices = new Uint16Array(indices);
    const ArrayData = {
        attributes: {
            POSITION: {
                location: 0,
                count: vertices.length,
                offset: 0,
                stride: 0,
                numComponents: 3,
                type: 5126,
                data: _position,
                byteLength: _position.byteLength,
                attributeType: _enums__WEBPACK_IMPORTED_MODULE_1__.FLOAT_VEC3
            },
            NORMAL: {
                location: 1,
                count: normals.length,
                numComponents: 3,
                offset: 0,
                stride: 0,
                type: 5126,
                data: _normal,
                byteLength: _normal.byteLength,
                attributeType: _enums__WEBPACK_IMPORTED_MODULE_1__.FLOAT_VEC3
            },
        },
        componentType: 5123,
        indices: _indices,
        numElements: indices.length,
        mode: 4,
    };
    return ArrayData;
};
const createSphere = (radius, subdivisionsAxis, subdivisionsHeight, opt_startLatitudeInRadians, opt_endLatitudeInRadians, opt_startLongitudeInRadians, opt_endLongitudeInRadians) => {
    if (subdivisionsAxis <= 0 || subdivisionsHeight <= 0) {
        throw new Error("subdivisionAxis and subdivisionHeight must be > 0");
    }
    opt_startLatitudeInRadians = opt_startLatitudeInRadians || 0;
    opt_endLatitudeInRadians = opt_endLatitudeInRadians || Math.PI;
    opt_startLongitudeInRadians = opt_startLongitudeInRadians || 0;
    opt_endLongitudeInRadians = opt_endLongitudeInRadians || Math.PI * 2;
    const latRange = opt_endLatitudeInRadians - opt_startLatitudeInRadians;
    const longRange = opt_endLongitudeInRadians - opt_startLongitudeInRadians;
    const positions = [];
    const normals = [];
    const texcoords = [];
    for (let y = 0; y <= subdivisionsHeight; y++) {
        for (let x = 0; x <= subdivisionsAxis; x++) {
            const u = x / subdivisionsAxis;
            const v = y / subdivisionsHeight;
            const theta = longRange * u + opt_startLongitudeInRadians;
            const phi = latRange * v + opt_startLatitudeInRadians;
            const sinTheta = Math.sin(theta);
            const cosTheta = Math.cos(theta);
            const sinPhi = Math.sin(phi);
            const cosPhi = Math.cos(phi);
            const ux = cosTheta * sinPhi;
            const uy = cosPhi;
            const uz = sinTheta * sinPhi;
            positions.push(radius * ux, radius * uy, radius * uz);
            normals.push(ux, uy, uz);
            texcoords.push(1 - u, v);
        }
    }
    const numVertsAround = subdivisionsAxis + 1;
    const indices = [];
    for (let x = 0; x < subdivisionsAxis; x++) {
        for (let y = 0; y < subdivisionsHeight; y++) {
            indices.push((y + 0) * numVertsAround + x, (y + 0) * numVertsAround + x + 1, (y + 1) * numVertsAround + x);
            indices.push((y + 1) * numVertsAround + x, (y + 0) * numVertsAround + x + 1, (y + 1) * numVertsAround + x + 1);
        }
    }
    const _positions = new Float32Array(positions);
    const _normals = new Float32Array(normals);
    const _texcoords = new Float32Array(texcoords);
    const _indices = new Uint16Array(indices);
    return {
        attributes: {
            POSITION: {
                location: 0,
                count: positions.length,
                offset: 0,
                stride: 0,
                numComponents: 3,
                type: 5126,
                data: _positions,
                byteLength: _positions.byteLength,
                attributeType: _enums__WEBPACK_IMPORTED_MODULE_1__.FLOAT_VEC3
            },
            NORMAL: {
                location: 1,
                count: normals.length,
                numComponents: 3,
                offset: 0,
                stride: 0,
                type: 5126,
                data: _normals,
                byteLength: _normals.byteLength,
                attributeType: _enums__WEBPACK_IMPORTED_MODULE_1__.FLOAT_VEC3
            },
            TEXCOORD_0: {
                data: _texcoords,
                count: _texcoords.length,
                type: 5126,
                offset: 0,
                stride: 0,
                byteLength: _texcoords.byteLength,
                location: 4,
                numComponents: 2,
                attributeType: _enums__WEBPACK_IMPORTED_MODULE_1__.FLOAT_VEC2
            },
        },
        componentType: 5123,
        indices: _indices,
        numElements: indices.length,
        mode: 4,
    };
};
const createTruncatedCone = (bottomRadius, topRadius, height, radialSubdivisions, verticalSubdivisions, opt_topCap, opt_bottomCap) => {
    if (radialSubdivisions < 3) {
        throw new Error("radialSubdivisions must be 3 or greater");
    }
    if (verticalSubdivisions < 1) {
        throw new Error("verticalSubdivisions must be 1 or greater");
    }
    const topCap = opt_topCap === undefined ? true : opt_topCap;
    const bottomCap = opt_bottomCap === undefined ? true : opt_bottomCap;
    const extra = (topCap ? 2 : 0) + (bottomCap ? 2 : 0);
    const numVertices = (radialSubdivisions + 1) * (verticalSubdivisions + 1 + extra);
    const positions = [];
    const normals = [];
    const texcoords = [];
    const indices = [];
    const vertsAroundEdge = radialSubdivisions + 1;
    const slant = Math.atan2(bottomRadius - topRadius, height);
    const cosSlant = Math.cos(slant);
    const sinSlant = Math.sin(slant);
    const start = topCap ? -2 : 0;
    const end = verticalSubdivisions + (bottomCap ? 2 : 0);
    for (let yy = start; yy <= end; ++yy) {
        let v = yy / verticalSubdivisions;
        let y = height * v;
        let ringRadius;
        if (yy < 0) {
            y = 0;
            v = 1;
            ringRadius = bottomRadius;
        }
        else if (yy > verticalSubdivisions) {
            y = height;
            v = 1;
            ringRadius = topRadius;
        }
        else {
            ringRadius =
                bottomRadius + (topRadius - bottomRadius) * (yy / verticalSubdivisions);
        }
        if (yy === -2 || yy === verticalSubdivisions + 2) {
            ringRadius = 0;
            v = 0;
        }
        y -= height / 2;
        for (let ii = 0; ii < vertsAroundEdge; ++ii) {
            const sin = Math.sin((ii * Math.PI * 2) / radialSubdivisions);
            const cos = Math.cos((ii * Math.PI * 2) / radialSubdivisions);
            positions.push(sin * ringRadius, y, cos * ringRadius);
            if (yy < 0) {
                normals.push(0, -1, 0);
            }
            else if (yy > verticalSubdivisions) {
                normals.push(0, 1, 0);
            }
            else if (ringRadius === 0.0) {
                normals.push(0, 0, 0);
            }
            else {
                normals.push(sin * cosSlant, sinSlant, cos * cosSlant);
            }
            texcoords.push(ii / radialSubdivisions, 1 - v);
        }
    }
    for (let yy = 0; yy < verticalSubdivisions + extra; ++yy) {
        if ((yy === 1 && topCap) ||
            (yy === verticalSubdivisions + extra - 2 && bottomCap)) {
            continue;
        }
        for (let ii = 0; ii < radialSubdivisions; ++ii) {
            indices.push(vertsAroundEdge * (yy + 0) + 0 + ii, vertsAroundEdge * (yy + 0) + 1 + ii, vertsAroundEdge * (yy + 1) + 1 + ii);
            indices.push(vertsAroundEdge * (yy + 0) + 0 + ii, vertsAroundEdge * (yy + 1) + 1 + ii, vertsAroundEdge * (yy + 1) + 0 + ii);
        }
    }
    const _positions = new Float32Array(positions);
    const _normals = new Float32Array(normals);
    const _texcoords = new Float32Array(texcoords);
    const _indices = new Uint16Array(indices);
    return {
        attributes: {
            POSITION: {
                location: 0,
                count: positions.length,
                offset: 0,
                stride: 0,
                numComponents: 3,
                type: 5126,
                data: _positions,
                byteLength: _positions.byteLength,
                attributeType: _enums__WEBPACK_IMPORTED_MODULE_1__.FLOAT_VEC3
            },
            NORMAL: {
                location: 1,
                count: normals.length,
                numComponents: 3,
                offset: 0,
                stride: 0,
                type: 5126,
                data: _normals,
                byteLength: _normals.byteLength,
                attributeType: _enums__WEBPACK_IMPORTED_MODULE_1__.FLOAT_VEC3
            },
            TEXCOORD_0: {
                data: _texcoords,
                count: _texcoords.length,
                type: 5126,
                offset: 0,
                stride: 0,
                byteLength: _texcoords.byteLength,
                location: 4,
                numComponents: 2,
                attributeType: _enums__WEBPACK_IMPORTED_MODULE_1__.FLOAT_VEC2
            },
        },
        componentType: 5123,
        indices: _indices,
        numElements: indices.length,
        mode: 4,
    };
};



/***/ }),

/***/ "./node_modules/romanpppgraphics/lib/components/ProgramInfo.js":
/*!*********************************************************************!*\
  !*** ./node_modules/romanpppgraphics/lib/components/ProgramInfo.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProgramInfo": () => (/* binding */ ProgramInfo)
/* harmony export */ });
function createUniformSetters(gl, program) {
    const createTextureSetter = (program, uniformInfo) => {
        const location = gl.getUniformLocation(program, uniformInfo.name);
        return (texBlockNum) => {
            gl.uniform1i(location, texBlockNum);
        };
    };
    function createUniformSetter(program, uniformInfo) {
        const location = gl.getUniformLocation(program, uniformInfo.name);
        const type = uniformInfo.type;
        const isArray = uniformInfo.size > 1 && uniformInfo.name.substr(-3) === "[0]";
        if (type === gl.FLOAT && isArray) {
            return function (v) {
                gl.uniform1fv(location, v);
            };
        }
        if (type === gl.FLOAT) {
            return function (v) {
                gl.uniform1f(location, v);
            };
        }
        if (type === gl.FLOAT_VEC2) {
            return function (v) {
                gl.uniform2fv(location, v);
            };
        }
        if (type === gl.FLOAT_VEC3) {
            return function (v) {
                gl.uniform3fv(location, v);
            };
        }
        if (type === gl.FLOAT_VEC4) {
            return function (v) {
                gl.uniform4fv(location, v);
            };
        }
        if (type === gl.INT && isArray) {
            return function (v) {
                gl.uniform1iv(location, v);
            };
        }
        if (type === gl.INT) {
            return function (v) {
                gl.uniform1i(location, v);
            };
        }
        if (type === gl.INT_VEC2) {
            return function (v) {
                gl.uniform2iv(location, v);
            };
        }
        if (type === gl.INT_VEC3) {
            return function (v) {
                gl.uniform3iv(location, v);
            };
        }
        if (type === gl.INT_VEC4) {
            return function (v) {
                gl.uniform4iv(location, v);
            };
        }
        if (type === gl.BOOL) {
            return function (v) {
                gl.uniform1iv(location, v);
            };
        }
        if (type === gl.BOOL_VEC2) {
            return function (v) {
                gl.uniform2iv(location, v);
            };
        }
        if (type === gl.BOOL_VEC3) {
            return function (v) {
                gl.uniform3iv(location, v);
            };
        }
        if (type === gl.BOOL_VEC4) {
            return function (v) {
                gl.uniform4iv(location, v);
            };
        }
        if (type === gl.FLOAT_MAT2) {
            return function (v) {
                gl.uniformMatrix2fv(location, false, v);
            };
        }
        if (type === gl.FLOAT_MAT3) {
            return function (v) {
                gl.uniformMatrix3fv(location, false, v);
            };
        }
        if (type === gl.FLOAT_MAT4) {
            return function (v) {
                gl.uniformMatrix4fv(location, false, v);
            };
        }
    }
    const uniformSetters = {};
    const textureSetters = {};
    const numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let ii = 0; ii < numUniforms; ++ii) {
        const uniformInfo = gl.getActiveUniform(program, ii);
        if (!uniformInfo) {
            break;
        }
        let name = uniformInfo.name;
        if (uniformInfo.type === gl.SAMPLER_2D) {
            textureSetters[name] = createTextureSetter(program, uniformInfo);
            continue;
        }
        if (name.substr(-3) === "[0]") {
            name = name.substr(0, name.length - 3);
        }
        if (uniformInfo.size > 1) {
            for (let i = 0; i < uniformInfo.size; i++) {
                const obj = {
                    size: uniformInfo.size,
                    type: uniformInfo.type,
                    name: name + `[${i}]`,
                };
                uniformSetters[name + `[${i}]`] = createUniformSetter(program, obj);
            }
        }
        else {
            const setter = createUniformSetter(program, uniformInfo);
            uniformSetters[name] = setter;
        }
    }
    return { uniformSetters, textureSetters };
}
class ProgramInfo {
    constructor(glWrapper, vertexShaderSource, fragmentShaderSource) {
        this.vertexShaderSource = vertexShaderSource;
        this.fragmentShaderSource = fragmentShaderSource;
        this.uniformSetters = null;
        this.textureSetters = null;
        this.vertexShader = null;
        this.fragmentShader = null;
        this.program = null;
        this.glWrapper = glWrapper;
    }
    createUniformSetters() {
        const { glWrapper, program } = this;
        const { gl } = glWrapper;
        const { uniformSetters, textureSetters } = createUniformSetters(gl, program);
        this.textureSetters = textureSetters;
        this.uniformSetters = uniformSetters;
        return this;
    }
    compileShaders() {
        const { glWrapper, fragmentShaderSource, vertexShaderSource } = this;
        const { gl } = glWrapper;
        this.vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(this.vertexShader, vertexShaderSource);
        gl.compileShader(this.vertexShader);
        if (!gl.getShaderParameter(this.vertexShader, gl.COMPILE_STATUS)) {
            throw new Error(gl.getShaderInfoLog(this.vertexShader));
        }
        this.fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(this.fragmentShader, fragmentShaderSource);
        gl.compileShader(this.fragmentShader);
        if (!gl.getShaderParameter(this.fragmentShader, gl.COMPILE_STATUS)) {
            throw new Error(gl.getShaderInfoLog(this.fragmentShader));
        }
        this.program = gl.createProgram();
        gl.attachShader(this.program, this.vertexShader);
        gl.attachShader(this.program, this.fragmentShader);
        gl.linkProgram(this.program);
        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            throw new Error(gl.getProgramInfoLog(this.program));
        }
        return this;
    }
    setUniforms(uniforms) {
        const { uniformSetters, glWrapper } = this;
        glWrapper.useProgramInfo(this);
        Object.keys(uniforms).forEach((name) => {
            const setter = uniformSetters[name];
            if (setter)
                setter(uniforms[name]);
        });
        return this;
    }
    setTextureUniformUnit(name, unit) {
        const { textureSetters, glWrapper } = this;
        glWrapper.useProgramInfo(this);
        const setter = textureSetters[name];
        if (setter)
            setter(unit);
        return this;
    }
}



/***/ }),

/***/ "./node_modules/romanpppgraphics/lib/components/TextureInfo.js":
/*!*********************************************************************!*\
  !*** ./node_modules/romanpppgraphics/lib/components/TextureInfo.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextureInfo": () => (/* binding */ TextureInfo)
/* harmony export */ });
/*const setCanvasSize = (ctx, width, height) => {
  ctx.canvas.width = width;
  ctx.canvas.height = height;
};

const makeTexture = (gl, ctx) => {
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);

  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    ctx.canvas
  );
  return tex;
};

const makeStripeTexture = (gl, options) => {
  options = options || {};
  var width = options.width || 4;
  var height = options.height || 4;
  var color1 = options.color1 || "rgba(1,0,0,0.1)";
  var color2 = options.color2 || "rgba(1,1,1,0.5)";
  const ctx = document.createElement("canvas").getContext("2d");
  setCanvasSize(ctx, width, height);

  ctx.fillStyle = color1;
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = color2;
  ctx.fillRect(0, 0, width, height / 2);

  return makeTexture(gl, ctx);
};

const makeStripeImg = (options) => {
  options = options || {};
  var width = options.width || 4;
  var height = options.height || 4;
  var color1 = options.color1 || "rgba(1,0,0,0.5)";
  var color2 = options.color2 || "rgba(0,0,1,1)";
  const ctx = document.createElement("canvas").getContext("2d");
  setCanvasSize(ctx, width, height);

  ctx.fillStyle = color1;
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = color2;
  ctx.fillRect(0, 0, width, height / 2);

  return ctx.canvas;
};

const makeImgFromSvgXml = (xml, options = {}) => {
  const img = document.createElement("img");
  var svg64 = btoa(xml);
  var b64Start = "data:image/svg+xml;base64,";
  var image64 = b64Start + svg64;
  img.src = image64;

  const width = options.width || 100;
  const height = options.height || 100;
  const x = options.x || 1;
  const y = options.y || 50;

  const ctx = document.createElement("canvas").getContext("2d");
  setCanvasSize(ctx, width, height);

  ctx.drawImage(img, x, y, width, height);
  ctx.fillStyle = "rgba(0,0,0,1)";
  ctx.fillRect(0, 0, width, height);
  return ctx.img;
};
*/
const requestCORSIfNotSameOrigin = (img, url) => {
    if (new URL(url, window.location.href).origin !== window.location.origin) {
        img.crossOrigin = "";
    }
};
class TextureInfo {
    constructor(gl) {
        this.width = null;
        this.height = null;
        this.gl = gl;
        this.img = new Image();
    }
    createTextureFromURL(url) {
        const { gl } = this;
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
        this.img.addEventListener("load", () => {
            this.width = this.img.width;
            this.height = this.img.height;
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.img);
            gl.generateMipmap(gl.TEXTURE_2D);
        });
        requestCORSIfNotSameOrigin(this.img, url);
        this.img.src = url;
        this.texture = texture;
        return texture;
    }
    setTextureUnit(unitNum) {
        const { gl, texture } = this;
        gl.activeTexture(gl.TEXTURE0 + unitNum);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        return this;
    }
}



/***/ }),

/***/ "./node_modules/romanpppgraphics/lib/components/attribTypeProps.js":
/*!*************************************************************************!*\
  !*** ./node_modules/romanpppgraphics/lib/components/attribTypeProps.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const props = {
    mat4: {
        stride: 64,
        byteLength: 64,
        type: 0x1406,
        numAttributes: 4,
        numComponents: 4,
    },
    vec3: {
        numComponents: 3,
        type: 0x1406,
        numAttributes: 1,
    },
};
const getAttributePropsByType = (type) => props[type];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getAttributePropsByType);


/***/ }),

/***/ "./node_modules/romanpppgraphics/lib/components/enums.js":
/*!***************************************************************!*\
  !*** ./node_modules/romanpppgraphics/lib/components/enums.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BOOL": () => (/* binding */ BOOL),
/* harmony export */   "BOOL_VEC2": () => (/* binding */ BOOL_VEC2),
/* harmony export */   "BOOL_VEC3": () => (/* binding */ BOOL_VEC3),
/* harmony export */   "BOOL_VEC4": () => (/* binding */ BOOL_VEC4),
/* harmony export */   "ELEMENT_SIZE": () => (/* binding */ ELEMENT_SIZE),
/* harmony export */   "FLOAT": () => (/* binding */ FLOAT),
/* harmony export */   "FLOAT_MAT2": () => (/* binding */ FLOAT_MAT2),
/* harmony export */   "FLOAT_MAT2x3": () => (/* binding */ FLOAT_MAT2x3),
/* harmony export */   "FLOAT_MAT2x4": () => (/* binding */ FLOAT_MAT2x4),
/* harmony export */   "FLOAT_MAT3": () => (/* binding */ FLOAT_MAT3),
/* harmony export */   "FLOAT_MAT4": () => (/* binding */ FLOAT_MAT4),
/* harmony export */   "FLOAT_VEC2": () => (/* binding */ FLOAT_VEC2),
/* harmony export */   "FLOAT_VEC3": () => (/* binding */ FLOAT_VEC3),
/* harmony export */   "FLOAT_VEC4": () => (/* binding */ FLOAT_VEC4),
/* harmony export */   "INT": () => (/* binding */ INT),
/* harmony export */   "INT_VEC2": () => (/* binding */ INT_VEC2),
/* harmony export */   "INT_VEC3": () => (/* binding */ INT_VEC3),
/* harmony export */   "INT_VEC4": () => (/* binding */ INT_VEC4),
/* harmony export */   "LOCATIONS": () => (/* binding */ LOCATIONS),
/* harmony export */   "NUM_COMPONENTS": () => (/* binding */ NUM_COMPONENTS),
/* harmony export */   "TYPED_ARRAYS": () => (/* binding */ TYPED_ARRAYS),
/* harmony export */   "UNSIGNED_INT": () => (/* binding */ UNSIGNED_INT),
/* harmony export */   "UNSIGNED_INT_VEC2": () => (/* binding */ UNSIGNED_INT_VEC2),
/* harmony export */   "UNSIGNED_INT_VEC3": () => (/* binding */ UNSIGNED_INT_VEC3),
/* harmony export */   "UNSIGNED_INT_VEC4": () => (/* binding */ UNSIGNED_INT_VEC4)
/* harmony export */ });
const TYPED_ARRAYS = {
    5120: Int8Array,
    5121: Uint8Array,
    5122: Int16Array,
    5123: Uint16Array,
    5124: Int32Array,
    5125: Uint32Array,
    5126: Float32Array,
};
const NUM_COMPONENTS = {
    SCALAR: 1,
    VEC2: 2,
    VEC3: 3,
    VEC4: 4,
    MAT2: 4,
    MAT3: 9,
    MAT4: 16,
};
const LOCATIONS = {
    POSITION: 0,
    NORMAL: 1,
    WEIGHTS_0: 2,
    JOINTS_0: 3,
    TEXCOORD_0: 4,
};
const ELEMENT_SIZE = {
    0x1406: 4,
};
const TEXTURE0 = 0x84c0;
const DYNAMIC_DRAW = 0x88e8;
const ARRAY_BUFFER = 0x8892;
const ELEMENT_ARRAY_BUFFER = 0x8893;
const UNIFORM_BUFFER = 0x8a11;
const TRANSFORM_FEEDBACK_BUFFER = 0x8c8e;
const TRANSFORM_FEEDBACK = 0x8e22;
const COMPILE_STATUS = 0x8b81;
const LINK_STATUS = 0x8b82;
const FRAGMENT_SHADER = 0x8b30;
const VERTEX_SHADER = 0x8b31;
const SEPARATE_ATTRIBS = 0x8c8d;
const ACTIVE_UNIFORMS = 0x8b86;
const ACTIVE_ATTRIBUTES = 0x8b89;
const TRANSFORM_FEEDBACK_VARYINGS = 0x8c83;
const ACTIVE_UNIFORM_BLOCKS = 0x8a36;
const UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER = 0x8a44;
const UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER = 0x8a46;
const UNIFORM_BLOCK_DATA_SIZE = 0x8a40;
const UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES = 0x8a43;
const FLOAT = 0x1406;
const FLOAT_VEC2 = 0x8b50;
const FLOAT_VEC3 = 0x8b51;
const FLOAT_VEC4 = 0x8b52;
const INT = 0x1404;
const INT_VEC2 = 0x8b53;
const INT_VEC3 = 0x8b54;
const INT_VEC4 = 0x8b55;
const BOOL = 0x8b56;
const BOOL_VEC2 = 0x8b57;
const BOOL_VEC3 = 0x8b58;
const BOOL_VEC4 = 0x8b59;
const FLOAT_MAT2 = 0x8b5a;
const FLOAT_MAT3 = 0x8b5b;
const FLOAT_MAT4 = 0x8b5c;
const SAMPLER_2D = 0x8b5e;
const SAMPLER_CUBE = 0x8b60;
const SAMPLER_3D = 0x8b5f;
const SAMPLER_2D_SHADOW = 0x8b62;
const FLOAT_MAT2x3 = 0x8b65;
const FLOAT_MAT2x4 = 0x8b66;
const FLOAT_MAT3x2 = 0x8b67;
const FLOAT_MAT3x4 = 0x8b68;
const FLOAT_MAT4x2 = 0x8b69;
const FLOAT_MAT4x3 = 0x8b6a;
const SAMPLER_2D_ARRAY = 0x8dc1;
const SAMPLER_2D_ARRAY_SHADOW = 0x8dc4;
const SAMPLER_CUBE_SHADOW = 0x8dc5;
const UNSIGNED_INT = 0x1405;
const UNSIGNED_INT_VEC2 = 0x8dc6;
const UNSIGNED_INT_VEC3 = 0x8dc7;
const UNSIGNED_INT_VEC4 = 0x8dc8;
const INT_SAMPLER_2D = 0x8dca;
const INT_SAMPLER_3D = 0x8dcb;
const INT_SAMPLER_CUBE = 0x8dcc;
const INT_SAMPLER_2D_ARRAY = 0x8dcf;
const UNSIGNED_INT_SAMPLER_2D = 0x8dd2;
const UNSIGNED_INT_SAMPLER_3D = 0x8dd3;
const UNSIGNED_INT_SAMPLER_CUBE = 0x8dd4;
const UNSIGNED_INT_SAMPLER_2D_ARRAY = 0x8dd7;
const TEXTURE_2D = 0x0de1;
const TEXTURE_CUBE_MAP = 0x8513;
const TEXTURE_3D = 0x806f;
const TEXTURE_2D_ARRAY = 0x8c1a;



/***/ }),

/***/ "./node_modules/romanpppgraphics/lib/index.js":
/*!****************************************************!*\
  !*** ./node_modules/romanpppgraphics/lib/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ArrayDataFromGltf": () => (/* reexport safe */ _components_GltfUtils__WEBPACK_IMPORTED_MODULE_0__.ArrayDataFromGltf),
/* harmony export */   "Drawer": () => (/* reexport safe */ _components_Drawer__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "EntityDataFromGltf": () => (/* reexport safe */ _components_GltfUtils__WEBPACK_IMPORTED_MODULE_0__.EntityDataFromGltf),
/* harmony export */   "GLTF": () => (/* reexport safe */ _components_GltfUtils__WEBPACK_IMPORTED_MODULE_0__.GLTF),
/* harmony export */   "GLcontextWrapper": () => (/* reexport safe */ _components_GLWrapper__WEBPACK_IMPORTED_MODULE_9__["default"]),
/* harmony export */   "MeshRenderer": () => (/* reexport safe */ _components_MeshRenderer__WEBPACK_IMPORTED_MODULE_1__.MeshRenderer),
/* harmony export */   "Model": () => (/* reexport safe */ _components_Model__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   "PrimitiveRenderInfoFromArrayData": () => (/* reexport safe */ _components_GltfUtils__WEBPACK_IMPORTED_MODULE_0__.PrimitiveRenderInfoFromArrayData),
/* harmony export */   "PrimitiveRenderer": () => (/* reexport safe */ _components_PrimitiveRenderer__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "ProgramInfo": () => (/* reexport safe */ _components_ProgramInfo__WEBPACK_IMPORTED_MODULE_4__.ProgramInfo),
/* harmony export */   "SkinnedMeshRenderer": () => (/* reexport safe */ _components_MeshRenderer__WEBPACK_IMPORTED_MODULE_1__.SkinnedMeshRenderer),
/* harmony export */   "TextureInfo": () => (/* reexport safe */ _components_TextureInfo__WEBPACK_IMPORTED_MODULE_6__.TextureInfo),
/* harmony export */   "createBox": () => (/* reexport safe */ _components_Primitives__WEBPACK_IMPORTED_MODULE_2__.createBox),
/* harmony export */   "createCircle": () => (/* reexport safe */ _components_Primitives__WEBPACK_IMPORTED_MODULE_2__.createCircle),
/* harmony export */   "createCone": () => (/* reexport safe */ _components_Primitives__WEBPACK_IMPORTED_MODULE_2__.createCone),
/* harmony export */   "createSphere": () => (/* reexport safe */ _components_Primitives__WEBPACK_IMPORTED_MODULE_2__.createSphere),
/* harmony export */   "createTruncatedCone": () => (/* reexport safe */ _components_Primitives__WEBPACK_IMPORTED_MODULE_2__.createTruncatedCone),
/* harmony export */   "defaultShaders": () => (/* reexport safe */ _render_shaders__WEBPACK_IMPORTED_MODULE_8__.defaultShaders),
/* harmony export */   "pointLightShaders": () => (/* reexport safe */ _render_shaders__WEBPACK_IMPORTED_MODULE_8__.pointLightShaders)
/* harmony export */ });
/* harmony import */ var _components_GltfUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/GltfUtils */ "./node_modules/romanpppgraphics/lib/components/GltfUtils.js");
/* harmony import */ var _components_MeshRenderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/MeshRenderer */ "./node_modules/romanpppgraphics/lib/components/MeshRenderer.js");
/* harmony import */ var _components_Primitives__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Primitives */ "./node_modules/romanpppgraphics/lib/components/Primitives.js");
/* harmony import */ var _components_PrimitiveRenderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/PrimitiveRenderer */ "./node_modules/romanpppgraphics/lib/components/PrimitiveRenderer.js");
/* harmony import */ var _components_ProgramInfo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/ProgramInfo */ "./node_modules/romanpppgraphics/lib/components/ProgramInfo.js");
/* harmony import */ var _components_Drawer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/Drawer */ "./node_modules/romanpppgraphics/lib/components/Drawer.js");
/* harmony import */ var _components_TextureInfo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/TextureInfo */ "./node_modules/romanpppgraphics/lib/components/TextureInfo.js");
/* harmony import */ var _components_Model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/Model */ "./node_modules/romanpppgraphics/lib/components/Model.js");
/* harmony import */ var _render_shaders__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./render/shaders */ "./node_modules/romanpppgraphics/lib/render/shaders/index.js");
/* harmony import */ var _components_GLWrapper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/GLWrapper */ "./node_modules/romanpppgraphics/lib/components/GLWrapper.js");













/***/ }),

/***/ "./node_modules/romanpppgraphics/lib/render/shaders/default/frag.js":
/*!**************************************************************************!*\
  !*** ./node_modules/romanpppgraphics/lib/render/shaders/default/frag.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (`#version 300 es
precision highp float;
 


uniform vec4 u_color;
out vec4 outColor;
void main() {
  
  
  outColor = u_color;
 
  
  
}`);


/***/ }),

/***/ "./node_modules/romanpppgraphics/lib/render/shaders/default/index.js":
/*!***************************************************************************!*\
  !*** ./node_modules/romanpppgraphics/lib/render/shaders/default/index.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _vert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vert.js */ "./node_modules/romanpppgraphics/lib/render/shaders/default/vert.js");
/* harmony import */ var _frag_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./frag.js */ "./node_modules/romanpppgraphics/lib/render/shaders/default/frag.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ vert: _vert_js__WEBPACK_IMPORTED_MODULE_0__["default"], frag: _frag_js__WEBPACK_IMPORTED_MODULE_1__["default"] });


/***/ }),

/***/ "./node_modules/romanpppgraphics/lib/render/shaders/default/vert.js":
/*!**************************************************************************!*\
  !*** ./node_modules/romanpppgraphics/lib/render/shaders/default/vert.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (`#version 300 es

precision highp float;

uniform mat4 u_worldViewProjection;


layout(location = 0) in vec4 a_position;
void main() {
  gl_Position = u_worldViewProjection * a_position;
  gl_PointSize = 10.0;
}`);


/***/ }),

/***/ "./node_modules/romanpppgraphics/lib/render/shaders/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/romanpppgraphics/lib/render/shaders/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultShaders": () => (/* reexport safe */ _default__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "pointLightShaders": () => (/* reexport safe */ _pointLight__WEBPACK_IMPORTED_MODULE_1__["default"])
/* harmony export */ });
/* harmony import */ var _default__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./default */ "./node_modules/romanpppgraphics/lib/render/shaders/default/index.js");
/* harmony import */ var _pointLight__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pointLight */ "./node_modules/romanpppgraphics/lib/render/shaders/pointLight/index.js");





/***/ }),

/***/ "./node_modules/romanpppgraphics/lib/render/shaders/pointLight/frag.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/romanpppgraphics/lib/render/shaders/pointLight/frag.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (`#version 300 es
precision highp float;
 



in vec3 v_normal;
in vec3 v_surfaceToView;
in vec3 v_surfaceToLight;


//uniform sampler2D u_texture1;
uniform float u_shininess;
uniform vec4 u_color;
uniform vec4 u_ambientLight;
out vec4 outColor;


void main() {
  
  vec3 surfaceToLightDirection = normalize(v_surfaceToLight);
  vec3 surfaceToViewDirection = normalize(v_surfaceToView);
  vec3 halfVector = normalize(surfaceToLightDirection + surfaceToViewDirection);

  vec3 normal = normalize(v_normal);
  float light = dot(normal, surfaceToLightDirection);
  float specular = 0.0;
  if (light > 0.0) {
    specular = pow(dot(normal, halfVector), u_shininess);
  }
  
  outColor =  u_color;
  outColor.rgb *= light;
  outColor.rgb += specular;

  outColor.rgb += u_ambientLight.rgb *0.3;
  
}`);


/***/ }),

/***/ "./node_modules/romanpppgraphics/lib/render/shaders/pointLight/index.js":
/*!******************************************************************************!*\
  !*** ./node_modules/romanpppgraphics/lib/render/shaders/pointLight/index.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _vert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vert.js */ "./node_modules/romanpppgraphics/lib/render/shaders/pointLight/vert.js");
/* harmony import */ var _frag_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./frag.js */ "./node_modules/romanpppgraphics/lib/render/shaders/pointLight/frag.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ vert: _vert_js__WEBPACK_IMPORTED_MODULE_0__["default"], frag: _frag_js__WEBPACK_IMPORTED_MODULE_1__["default"] });


/***/ }),

/***/ "./node_modules/romanpppgraphics/lib/render/shaders/pointLight/vert.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/romanpppgraphics/lib/render/shaders/pointLight/vert.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (`#version 300 es
 
layout(location = 0) in vec4 a_position;
layout(location = 1) in vec3 a_normal;


uniform mat4 u_matrix;
uniform mat4 u_worldViewProjection;
uniform vec3 u_lightWorldPosition;
uniform vec3 u_viewWorldPosition;

out vec3 v_normal;
out vec3 v_surfaceToLight;
out vec3 v_surfaceToView;
void main() {
    
    gl_Position = u_worldViewProjection * a_position;
    
    vec3 surfaceWorldPosition = (u_matrix * a_position).xyz;
    
    v_surfaceToLight = u_lightWorldPosition - surfaceWorldPosition;

    v_normal = mat3(  u_matrix ) * a_normal;
    
    v_surfaceToView = u_viewWorldPosition - surfaceWorldPosition;
      
}`);


/***/ }),

/***/ "./node_modules/romanpppmath/lib/Octree.js":
/*!*************************************************!*\
  !*** ./node_modules/romanpppmath/lib/Octree.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Octree)
/* harmony export */ });
/* harmony import */ var _aabb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./aabb */ "./node_modules/romanpppmath/lib/aabb.js");
/* harmony import */ var _v3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./v3 */ "./node_modules/romanpppmath/lib/v3.js");


const elementSize = 1;
class Octree {
    constructor(aabb) {
        this.aabb = aabb;
        this.diagonal = (0,_aabb__WEBPACK_IMPORTED_MODULE_0__.getDiagonal)(aabb);
        this.center = (0,_aabb__WEBPACK_IMPORTED_MODULE_0__.getCenter)(aabb);
        this.elements = [];
        this.children = [];
        this.capacity = 4;
    }
    subdivide() {
        const min = this.aabb.min;
        const max = this.aabb.max;
        const [x1, y1, z1] = min;
        const [x2, y2, z2] = max;
        const xc = this.center[0];
        const yc = this.center[1];
        const zc = this.center[2];
        this.children[0] = new Octree(new _aabb__WEBPACK_IMPORTED_MODULE_0__["default"]([x1, y1, z1], [xc, yc, zc]));
        this.children[1] = new Octree(new _aabb__WEBPACK_IMPORTED_MODULE_0__["default"]([x1, y1, zc], [xc, yc, z2]));
        this.children[2] = new Octree(new _aabb__WEBPACK_IMPORTED_MODULE_0__["default"]([x1, yc, z1], [xc, y2, zc]));
        this.children[3] = new Octree(new _aabb__WEBPACK_IMPORTED_MODULE_0__["default"]([x1, yc, zc], [xc, y2, z2]));
        this.children[4] = new Octree(new _aabb__WEBPACK_IMPORTED_MODULE_0__["default"]([xc, y1, z1], [x2, yc, zc]));
        this.children[5] = new Octree(new _aabb__WEBPACK_IMPORTED_MODULE_0__["default"]([xc, y1, zc], [x2, yc, z2]));
        this.children[6] = new Octree(new _aabb__WEBPACK_IMPORTED_MODULE_0__["default"]([xc, yc, z1], [x2, y2, zc]));
        this.children[7] = new Octree(new _aabb__WEBPACK_IMPORTED_MODULE_0__["default"]([xc, yc, zc], [x2, y2, z2]));
    }
    insert(voxel) {
        if (this.elements.length < this.capacity) {
            this.elements.push(voxel);
            return;
        }
        if (this.children.length === 0)
            this.subdivide();
        const xc = this.center[0];
        const yc = this.center[1];
        const zc = this.center[2];
        const x = Number(voxel[0] > xc) * 4;
        const y = Number(voxel[1] > yc) * 2;
        const z = Number(voxel[2] > zc);
        const idx = z | y | x;
        this.children[idx].insert(voxel);
    }
    query(aabb) {
        const found = [];
        if (!(0,_aabb__WEBPACK_IMPORTED_MODULE_0__.isCollide)(this.aabb, aabb)) {
            return found;
        }
        this.elements.forEach(element => {
            const _aabb = new _aabb__WEBPACK_IMPORTED_MODULE_0__["default"](_v3__WEBPACK_IMPORTED_MODULE_1__["default"].sum(element, [-0.5, -0.5, -0.5]), _v3__WEBPACK_IMPORTED_MODULE_1__["default"].sum(element, [0.5, 0.5, 0.5]));
            if ((0,_aabb__WEBPACK_IMPORTED_MODULE_0__.isCollide)(aabb, _aabb)) {
                found.push(element);
            }
        });
        this.children.forEach(child => {
            found.push(...child.query(aabb));
        });
        return found;
    }
}


/***/ }),

/***/ "./node_modules/romanpppmath/lib/aabb.js":
/*!***********************************************!*\
  !*** ./node_modules/romanpppmath/lib/aabb.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "contains": () => (/* binding */ contains),
/* harmony export */   "default": () => (/* binding */ AABB),
/* harmony export */   "getCenter": () => (/* binding */ getCenter),
/* harmony export */   "getDiagonal": () => (/* binding */ getDiagonal),
/* harmony export */   "isCollide": () => (/* binding */ isCollide)
/* harmony export */ });
/* harmony import */ var _v3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v3 */ "./node_modules/romanpppmath/lib/v3.js");

class AABB {
    constructor(min, max) {
        this.min = min;
        this.max = max;
    }
}
const isCollide = (aabb1, aabb2) => {
    if (aabb1.min[0] <= aabb2.max[0] &&
        aabb1.max[0] >= aabb2.min[0] &&
        aabb1.min[1] <= aabb2.max[1] &&
        aabb1.max[1] >= aabb2.min[1] &&
        aabb1.min[2] <= aabb2.max[2] &&
        aabb1.max[2] >= aabb2.min[2]) {
        return true;
    }
    return false;
};
const getCenter = (aabb) => {
    const sum = _v3__WEBPACK_IMPORTED_MODULE_0__["default"].sum(aabb.max, aabb.min);
    return [sum[0] / 2, sum[1] / 2, sum[2] / 2];
};
const getDiagonal = (aabb) => _v3__WEBPACK_IMPORTED_MODULE_0__["default"].diff(aabb.max, aabb.min);
const contains = (aabb, p) => { };


/***/ }),

/***/ "./node_modules/romanpppmath/lib/index.js":
/*!************************************************!*\
  !*** ./node_modules/romanpppmath/lib/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AABB": () => (/* reexport safe */ _aabb__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "Octree": () => (/* reexport safe */ _Octree__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "m3": () => (/* reexport safe */ _m3__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "m4": () => (/* reexport safe */ _m4__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "v3": () => (/* reexport safe */ _v3__WEBPACK_IMPORTED_MODULE_1__["default"])
/* harmony export */ });
/* harmony import */ var _aabb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./aabb */ "./node_modules/romanpppmath/lib/aabb.js");
/* harmony import */ var _v3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./v3 */ "./node_modules/romanpppmath/lib/v3.js");
/* harmony import */ var _m3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./m3 */ "./node_modules/romanpppmath/lib/m3.js");
/* harmony import */ var _m4__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./m4 */ "./node_modules/romanpppmath/lib/m4.js");
/* harmony import */ var _Octree__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Octree */ "./node_modules/romanpppmath/lib/Octree.js");








/***/ }),

/***/ "./node_modules/romanpppmath/lib/m3.js":
/*!*********************************************!*\
  !*** ./node_modules/romanpppmath/lib/m3.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const m3 = {
    multiply: function (b, a) {
        const a00 = a[0 * 3 + 0];
        const a01 = a[0 * 3 + 1];
        const a02 = a[0 * 3 + 2];
        const a10 = a[1 * 3 + 0];
        const a11 = a[1 * 3 + 1];
        const a12 = a[1 * 3 + 2];
        const a20 = a[2 * 3 + 0];
        const a21 = a[2 * 3 + 1];
        const a22 = a[2 * 3 + 2];
        const b00 = b[0 * 3 + 0];
        const b01 = b[0 * 3 + 1];
        const b02 = b[0 * 3 + 2];
        const b10 = b[1 * 3 + 0];
        const b11 = b[1 * 3 + 1];
        const b12 = b[1 * 3 + 2];
        const b20 = b[2 * 3 + 0];
        const b21 = b[2 * 3 + 1];
        const b22 = b[2 * 3 + 2];
        return [
            b00 * a00 + b01 * a10 + b02 * a20,
            b00 * a01 + b01 * a11 + b02 * a21,
            b00 * a02 + b01 * a12 + b02 * a22,
            b10 * a00 + b11 * a10 + b12 * a20,
            b10 * a01 + b11 * a11 + b12 * a21,
            b10 * a02 + b11 * a12 + b12 * a22,
            b20 * a00 + b21 * a10 + b22 * a20,
            b20 * a01 + b21 * a11 + b22 * a21,
            b20 * a02 + b21 * a12 + b22 * a22,
        ];
    },
    xRotation: function (angleInRadians) {
        const c = Math.cos(angleInRadians);
        const s = Math.sin(angleInRadians);
        return [1, 0, 0, 0, c, s, 0, -s, c];
    },
    yRotation: function (angleInRadians) {
        const c = Math.cos(angleInRadians);
        const s = Math.sin(angleInRadians);
        return [c, 0, -s, 0, 1, 0, s, 0, c];
    },
    zRotation: function (angleInRadians) {
        const c = Math.cos(angleInRadians);
        const s = Math.sin(angleInRadians);
        return [c, s, 0, -s, c, 0, 0, 0, 1];
    },
    m3Tom4: function (m) {
        const dst = new Array(16);
        dst[0] = m[0];
        dst[1] = m[1];
        dst[2] = m[2];
        dst[3] = 0;
        dst[4] = m[3];
        dst[5] = m[4];
        dst[6] = m[5];
        dst[7] = 0;
        dst[8] = m[6];
        dst[9] = m[7];
        dst[10] = m[8];
        dst[11] = 0;
        dst[12] = 0;
        dst[13] = 0;
        dst[14] = 0;
        dst[15] = 1;
        return dst;
    },
    xRotate: function (m, angleInRadians) {
        return m3.multiply(m, m3.xRotation(angleInRadians));
    },
    yRotate: function (m, angleInRadians) {
        return m3.multiply(m, m3.yRotation(angleInRadians));
    },
    zRotate: function (m, angleInRadians) {
        return m3.multiply(m, m3.zRotation(angleInRadians));
    },
    transformPoint: function (m, v) {
        const dst = [0, 0, 0];
        const v0 = v[0];
        const v1 = v[1];
        const v2 = v[2];
        dst[0] = v0 * m[0 * 3 + 0] + v1 * m[1 * 3 + 0] + v2 * m[2 * 3 + 0];
        dst[1] = v0 * m[0 * 3 + 1] + v1 * m[1 * 3 + 1] + v2 * m[2 * 3 + 1];
        dst[2] = v0 * m[0 * 3 + 2] + v1 * m[1 * 3 + 2] + v2 * m[2 * 3 + 2];
        return dst;
    },
    identity: function () {
        return [1, 0, 0, 0, 1, 0, 0, 0, 1];
    },
    transpose: function (m) {
        const dst = new Array(9);
        dst[0] = m[0];
        dst[1] = m[3];
        dst[2] = m[6];
        dst[3] = m[1];
        dst[4] = m[4];
        dst[5] = m[7];
        dst[6] = m[2];
        dst[7] = m[5];
        dst[8] = m[8];
        return dst;
    },
    scaling: function (sx, sy, sz) {
        return [sx, 0, 0, 0, sy, 0, 0, 0, sz];
    },
    scale: function (m, sx, sy, sz) {
        return m3.multiply(m, m3.scaling(sx, sy, sz));
    },
    /*
        0 1 2
        3 4 5
        6 7 8
        */
    inverse: function (m) {
        const det = m[0] * m[4] * m[8] +
            m[2] * m[3] * m[7] +
            m[1] * m[5] * m[6] -
            m[2] * m[4] * m[6] -
            m[0] * m[5] * m[7] -
            m[8] * m[3] * m[2];
        const dst = new Array(9);
        dst[0] = (m[4] * m[8] - m[7] * m[5]) / det;
        dst[1] = (m[3] * m[8] - m[6] * m[5]) / det;
        dst[2] = (m[3] * m[7] - m[6] * m[4]) / det;
        dst[3] = (m[1] * m[8] - m[2] * m[7]) / det;
        dst[4] = (m[0] * m[8] - m[2] * m[6]) / det;
        dst[5] = (m[0] * m[7] - m[1] * m[6]) / det;
        dst[6] = (m[1] * m[5] - m[2] * m[4]) / det;
        dst[7] = (m[0] * m[5] - m[2] * m[3]) / det;
        dst[8] = (m[0] * m[4] - m[1] * m[4]) / det;
        return dst;
    },
    toString(m) {
        return m.reduce((acc, el, idx) => idx % 3 === 0
            ? (acc += `\n${el.toString()}`)
            : (acc += ` ${el.toString()}`), "");
    },
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (m3);


/***/ }),

/***/ "./node_modules/romanpppmath/lib/m4.js":
/*!*********************************************!*\
  !*** ./node_modules/romanpppmath/lib/m4.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _v3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v3 */ "./node_modules/romanpppmath/lib/v3.js");

const m4 = {
    multiply: function (a, b) {
        const a00 = a[0 * 4 + 0];
        const a01 = a[0 * 4 + 1];
        const a02 = a[0 * 4 + 2];
        const a03 = a[0 * 4 + 3];
        const a10 = a[1 * 4 + 0];
        const a11 = a[1 * 4 + 1];
        const a12 = a[1 * 4 + 2];
        const a13 = a[1 * 4 + 3];
        const a20 = a[2 * 4 + 0];
        const a21 = a[2 * 4 + 1];
        const a22 = a[2 * 4 + 2];
        const a23 = a[2 * 4 + 3];
        const a30 = a[3 * 4 + 0];
        const a31 = a[3 * 4 + 1];
        const a32 = a[3 * 4 + 2];
        const a33 = a[3 * 4 + 3];
        const b00 = b[0 * 4 + 0];
        const b01 = b[0 * 4 + 1];
        const b02 = b[0 * 4 + 2];
        const b03 = b[0 * 4 + 3];
        const b10 = b[1 * 4 + 0];
        const b11 = b[1 * 4 + 1];
        const b12 = b[1 * 4 + 2];
        const b13 = b[1 * 4 + 3];
        const b20 = b[2 * 4 + 0];
        const b21 = b[2 * 4 + 1];
        const b22 = b[2 * 4 + 2];
        const b23 = b[2 * 4 + 3];
        const b30 = b[3 * 4 + 0];
        const b31 = b[3 * 4 + 1];
        const b32 = b[3 * 4 + 2];
        const b33 = b[3 * 4 + 3];
        const dst = [
            b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
            b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
            b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
            b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
            b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
            b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
            b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
            b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
            b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
            b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
            b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
            b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
            b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
            b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
            b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
            b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
        ];
        return dst;
    },
    translation: function (tx, ty, tz) {
        return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1];
    },
    xRotation: function (angleInRadians) {
        const c = Math.cos(angleInRadians);
        const s = Math.sin(angleInRadians);
        return [1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1];
    },
    yRotation: function (angleInRadians) {
        const c = Math.cos(angleInRadians);
        const s = Math.sin(angleInRadians);
        return [c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1];
    },
    zRotation: function (angleInRadians) {
        const c = Math.cos(angleInRadians);
        const s = Math.sin(angleInRadians);
        return [c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    },
    scaling: function (sx, sy, sz) {
        return [sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1];
    },
    translate: function (m, tx, ty, tz) {
        return m4.multiply(m, m4.translation(tx, ty, tz));
    },
    xRotate: function (m, angleInRadians) {
        return m4.multiply(m, m4.xRotation(angleInRadians));
    },
    yRotate: function (m, angleInRadians) {
        return m4.multiply(m, m4.yRotation(angleInRadians));
    },
    zRotate: function (m, angleInRadians) {
        return m4.multiply(m, m4.zRotation(angleInRadians));
    },
    scale: function (m, sx, sy, sz) {
        return m4.multiply(m, m4.scaling(sx, sy, sz));
    },
    makeOrt: function (v) {
        const o = [0, 0, 0];
        const norm = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
        o[0] = v[0] / norm;
        o[1] = v[1] / norm;
        o[2] = v[2] / norm;
        return o;
    },
    projection: function (width, height, depth) {
        return [
            2 / width,
            0,
            0,
            0,
            0,
            -2 / height,
            0,
            0,
            0,
            0,
            2 / depth,
            0,
            -1,
            1,
            0,
            1,
        ];
    },
    perspective: function (fieldOfViewInRadians, aspect, near, far) {
        const f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
        const rangeInv = 1.0 / (near - far);
        return [
            f / aspect,
            0,
            0,
            0,
            0,
            f,
            0,
            0,
            0,
            0,
            (near + far) * rangeInv,
            -1,
            0,
            0,
            near * far * rangeInv * 2,
            0,
        ];
    },
    inverse: function (m) {
        const m00 = m[0 * 4 + 0];
        const m01 = m[0 * 4 + 1];
        const m02 = m[0 * 4 + 2];
        const m03 = m[0 * 4 + 3];
        const m10 = m[1 * 4 + 0];
        const m11 = m[1 * 4 + 1];
        const m12 = m[1 * 4 + 2];
        const m13 = m[1 * 4 + 3];
        const m20 = m[2 * 4 + 0];
        const m21 = m[2 * 4 + 1];
        const m22 = m[2 * 4 + 2];
        const m23 = m[2 * 4 + 3];
        const m30 = m[3 * 4 + 0];
        const m31 = m[3 * 4 + 1];
        const m32 = m[3 * 4 + 2];
        const m33 = m[3 * 4 + 3];
        const tmp_0 = m22 * m33;
        const tmp_1 = m32 * m23;
        const tmp_2 = m12 * m33;
        const tmp_3 = m32 * m13;
        const tmp_4 = m12 * m23;
        const tmp_5 = m22 * m13;
        const tmp_6 = m02 * m33;
        const tmp_7 = m32 * m03;
        const tmp_8 = m02 * m23;
        const tmp_9 = m22 * m03;
        const tmp_10 = m02 * m13;
        const tmp_11 = m12 * m03;
        const tmp_12 = m20 * m31;
        const tmp_13 = m30 * m21;
        const tmp_14 = m10 * m31;
        const tmp_15 = m30 * m11;
        const tmp_16 = m10 * m21;
        const tmp_17 = m20 * m11;
        const tmp_18 = m00 * m31;
        const tmp_19 = m30 * m01;
        const tmp_20 = m00 * m21;
        const tmp_21 = m20 * m01;
        const tmp_22 = m00 * m11;
        const tmp_23 = m10 * m01;
        const t0 = tmp_0 * m11 +
            tmp_3 * m21 +
            tmp_4 * m31 -
            (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
        const t1 = tmp_1 * m01 +
            tmp_6 * m21 +
            tmp_9 * m31 -
            (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
        const t2 = tmp_2 * m01 +
            tmp_7 * m11 +
            tmp_10 * m31 -
            (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
        const t3 = tmp_5 * m01 +
            tmp_8 * m11 +
            tmp_11 * m21 -
            (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);
        const d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);
        return [
            d * t0,
            d * t1,
            d * t2,
            d * t3,
            d *
                (tmp_1 * m10 +
                    tmp_2 * m20 +
                    tmp_5 * m30 -
                    (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30)),
            d *
                (tmp_0 * m00 +
                    tmp_7 * m20 +
                    tmp_8 * m30 -
                    (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30)),
            d *
                (tmp_3 * m00 +
                    tmp_6 * m10 +
                    tmp_11 * m30 -
                    (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30)),
            d *
                (tmp_4 * m00 +
                    tmp_9 * m10 +
                    tmp_10 * m20 -
                    (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20)),
            d *
                (tmp_12 * m13 +
                    tmp_15 * m23 +
                    tmp_16 * m33 -
                    (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33)),
            d *
                (tmp_13 * m03 +
                    tmp_18 * m23 +
                    tmp_21 * m33 -
                    (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33)),
            d *
                (tmp_14 * m03 +
                    tmp_19 * m13 +
                    tmp_22 * m33 -
                    (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33)),
            d *
                (tmp_17 * m03 +
                    tmp_20 * m13 +
                    tmp_23 * m23 -
                    (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23)),
            d *
                (tmp_14 * m22 +
                    tmp_17 * m32 +
                    tmp_13 * m12 -
                    (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22)),
            d *
                (tmp_20 * m32 +
                    tmp_12 * m02 +
                    tmp_19 * m22 -
                    (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02)),
            d *
                (tmp_18 * m12 +
                    tmp_23 * m32 +
                    tmp_15 * m02 -
                    (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12)),
            d *
                (tmp_22 * m22 +
                    tmp_16 * m02 +
                    tmp_21 * m12 -
                    (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02)),
        ];
    },
    lookAt: function (cameraPosition, target, up) {
        const zAxis = _v3__WEBPACK_IMPORTED_MODULE_0__["default"].normalize(_v3__WEBPACK_IMPORTED_MODULE_0__["default"].diff(cameraPosition, target));
        const xAxis = _v3__WEBPACK_IMPORTED_MODULE_0__["default"].normalize(_v3__WEBPACK_IMPORTED_MODULE_0__["default"].cross(up, zAxis));
        const yAxis = _v3__WEBPACK_IMPORTED_MODULE_0__["default"].normalize(_v3__WEBPACK_IMPORTED_MODULE_0__["default"].cross(zAxis, xAxis));
        return [
            xAxis[0],
            xAxis[1],
            xAxis[2],
            0,
            yAxis[0],
            yAxis[1],
            yAxis[2],
            0,
            zAxis[0],
            zAxis[1],
            zAxis[2],
            0,
            cameraPosition[0],
            cameraPosition[1],
            cameraPosition[2],
            1,
        ];
    },
    copy: function (src) {
        return [...src];
    },
    transformPoint: function (m, v, dst) {
        dst = dst || new Array(3);
        const v0 = v[0];
        const v1 = v[1];
        const v2 = v[2];
        const d = v0 * m[0 * 4 + 3] + v1 * m[1 * 4 + 3] + v2 * m[2 * 4 + 3] + m[3 * 4 + 3];
        dst[0] =
            (v0 * m[0 * 4 + 0] +
                v1 * m[1 * 4 + 0] +
                v2 * m[2 * 4 + 0] +
                m[3 * 4 + 0]) /
                d;
        dst[1] =
            (v0 * m[0 * 4 + 1] +
                v1 * m[1 * 4 + 1] +
                v2 * m[2 * 4 + 1] +
                m[3 * 4 + 1]) /
                d;
        dst[2] =
            (v0 * m[0 * 4 + 2] +
                v1 * m[1 * 4 + 2] +
                v2 * m[2 * 4 + 2] +
                m[3 * 4 + 2]) /
                d;
        return dst;
    },
    identity: function () {
        const dst = new Array(16);
        dst[0] = 1;
        dst[1] = 0;
        dst[2] = 0;
        dst[3] = 0;
        dst[4] = 0;
        dst[5] = 1;
        dst[6] = 0;
        dst[7] = 0;
        dst[8] = 0;
        dst[9] = 0;
        dst[10] = 1;
        dst[11] = 0;
        dst[12] = 0;
        dst[13] = 0;
        dst[14] = 0;
        dst[15] = 1;
        return dst;
    },
    m3Tom4: function (m) {
        const dst = new Array(16);
        dst[0] = m[0];
        dst[1] = m[1];
        dst[2] = m[2];
        dst[3] = 0;
        dst[4] = m[3];
        dst[5] = m[4];
        dst[6] = m[5];
        dst[7] = 0;
        dst[8] = m[6];
        dst[9] = m[7];
        dst[10] = m[8];
        dst[11] = 0;
        dst[12] = 0;
        dst[13] = 0;
        dst[14] = 0;
        dst[15] = 1;
        return dst;
    },
    m4Tom3: function (m) {
        const dst = new Array(9);
        dst[0] = m[0];
        dst[1] = m[1];
        dst[2] = m[2];
        dst[3] = m[4];
        dst[4] = m[5];
        dst[5] = m[6];
        dst[6] = m[8];
        dst[7] = m[9];
        dst[8] = m[10];
        return dst;
    },
    toString(m) {
        return m.reduce((acc, el, idx) => idx % 4 === 0
            ? (acc += `\n${el.toString()}`)
            : (acc += ` ${el.toString()}`), "");
    },
    transpose: function (m) {
        return [
            m[0],
            m[4],
            m[8],
            m[12],
            m[1],
            m[5],
            m[9],
            m[13],
            m[2],
            m[6],
            m[10],
            m[14],
            m[3],
            m[7],
            m[11],
            m[15],
        ];
    },
    fromQuaternion: (q) => {
        const a11 = 1 - 2 * (q[1] * q[1] + q[2] * q[2]);
        const a12 = 2 * (q[0] * q[1] - q[2] * q[3]);
        const a13 = 2 * (q[0] * q[2] + q[1] * q[3]);
        const a21 = 2 * (q[0] * q[1] + q[2] * q[3]);
        const a22 = 1 - 2 * (q[0] * q[0] + q[2] * q[2]);
        const a23 = 2 * (q[1] * q[2] - q[0] * q[3]);
        const a31 = 2 * (q[0] * q[2] - q[1] * q[3]);
        const a32 = 2 * (q[1] * q[2] + q[0] * q[3]);
        const a33 = 1 - 2 * (q[0] * q[0] + q[1] * q[1]);
        return [a11, a12, a13, 0, a21, a22, a23, 0, a31, a32, a33, 0, 0, 0, 0, 1];
    },
    /*
    rotation(x, y, z) {
      return this.xRotate(this.yRotate(this.zRotation(z), y), x);
    },
    rotationFromNormal(n) {
      return this.rotation(Math.acos(n[1]), Math.acos(n[2]), Math.acos(n[0]));
    },*/
    determinate(m) {
        const m00 = m[0 * 4 + 0];
        const m01 = m[0 * 4 + 1];
        const m02 = m[0 * 4 + 2];
        const m03 = m[0 * 4 + 3];
        const m10 = m[1 * 4 + 0];
        const m11 = m[1 * 4 + 1];
        const m12 = m[1 * 4 + 2];
        const m13 = m[1 * 4 + 3];
        const m20 = m[2 * 4 + 0];
        const m21 = m[2 * 4 + 1];
        const m22 = m[2 * 4 + 2];
        const m23 = m[2 * 4 + 3];
        const m30 = m[3 * 4 + 0];
        const m31 = m[3 * 4 + 1];
        const m32 = m[3 * 4 + 2];
        const m33 = m[3 * 4 + 3];
        const tmp_0 = m22 * m33;
        const tmp_1 = m32 * m23;
        const tmp_2 = m12 * m33;
        const tmp_3 = m32 * m13;
        const tmp_4 = m12 * m23;
        const tmp_5 = m22 * m13;
        const tmp_6 = m02 * m33;
        const tmp_7 = m32 * m03;
        const tmp_8 = m02 * m23;
        const tmp_9 = m22 * m03;
        const tmp_10 = m02 * m13;
        const tmp_11 = m12 * m03;
        const t0 = tmp_0 * m11 +
            tmp_3 * m21 +
            tmp_4 * m31 -
            (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
        const t1 = tmp_1 * m01 +
            tmp_6 * m21 +
            tmp_9 * m31 -
            (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
        const t2 = tmp_2 * m01 +
            tmp_7 * m11 +
            tmp_10 * m31 -
            (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
        const t3 = tmp_5 * m01 +
            tmp_8 * m11 +
            tmp_11 * m21 -
            (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);
        return 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);
    },
    decompose(m) {
        let sx = _v3__WEBPACK_IMPORTED_MODULE_0__["default"].norm(m.slice(0, 3));
        const sy = _v3__WEBPACK_IMPORTED_MODULE_0__["default"].norm(m.slice(4, 7));
        const sz = _v3__WEBPACK_IMPORTED_MODULE_0__["default"].norm(m.slice(8, 11));
        const det = this.determinate(m);
        if (det < 0) {
            sx = -sx;
        }
        const translation = new Array(3);
        const scale = new Array(3);
        const Rmatrix = [...m];
        translation[0] = m[12];
        translation[1] = m[13];
        translation[2] = m[14];
        const invSX = 1 / sx;
        const invSY = 1 / sy;
        const invSZ = 1 / sz;
        Rmatrix[0] *= invSX;
        Rmatrix[1] *= invSX;
        Rmatrix[2] *= invSX;
        Rmatrix[4] *= invSY;
        Rmatrix[5] *= invSY;
        Rmatrix[6] *= invSY;
        Rmatrix[8] *= invSZ;
        Rmatrix[9] *= invSZ;
        Rmatrix[10] *= invSZ;
        scale[0] = sx;
        scale[1] = sy;
        scale[2] = sz;
        return { translation, Rmatrix, scale };
    },
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (m4);


/***/ }),

/***/ "./node_modules/romanpppmath/lib/v3.js":
/*!*********************************************!*\
  !*** ./node_modules/romanpppmath/lib/v3.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [
    a[1] * b[2] - b[1] * a[2],
    a[2] * b[0] - b[2] * a[0],
    a[0] * b[1] - b[0] * a[1],
];
const scale = (a, scalar) => [a[0] * scalar, a[1] * scalar, a[2] * scalar];
const sum = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const diff = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const norm = (a) => Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
const normSq = (a) => a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
const normalize = (a) => {
    const length = norm(a);
    if (length === 0)
        return a;
    return [a[0] / length, a[1] / length, a[2] / length];
};
const isNull = (a) => a[0] * a[0] + a[1] * a[1] + a[2] * a[2] === 0;
const isEqual = (a, b) => a[0] == b[0] && a[1] == b[1] && a[2] == b[2];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    sum,
    diff,
    scale,
    dot,
    cross,
    norm,
    normSq,
    normalize,
    isEqual,
    isNull,
});


/***/ }),

/***/ "./demo/voxels/terrain/VoxelWorld.ts":
/*!*******************************************!*\
  !*** ./demo/voxels/terrain/VoxelWorld.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VoxelWorld)
/* harmony export */ });
/* harmony import */ var _src_physics_Simulation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../src/physics/Simulation */ "./src/physics/Simulation.ts");
/* harmony import */ var _src_physics_HashGrid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../src/physics/HashGrid */ "./src/physics/HashGrid.ts");
/* harmony import */ var _src_physics_Tree__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../src/physics/Tree */ "./src/physics/Tree.ts");
/* harmony import */ var romanpppmath__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! romanpppmath */ "./node_modules/romanpppmath/lib/index.js");
/* harmony import */ var _src_physics_AABB__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../src/physics/AABB */ "./src/physics/AABB.ts");
/* harmony import */ var _src_physics_getCollisionFeatures__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../src/physics/getCollisionFeatures */ "./src/physics/getCollisionFeatures.ts");
/* harmony import */ var _src_physics_ContactManifold__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../src/physics/ContactManifold */ "./src/physics/ContactManifold.ts");







class VoxelWorld extends _src_physics_Simulation__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(voxelSize = 1, chunkSize = 32) {
        super();
        this.voxelSize = voxelSize;
        this.chunkSize = chunkSize;
        this.hashGridTree = new _src_physics_Tree__WEBPACK_IMPORTED_MODULE_2__["default"]();
        this.hashGridTree.setKey(hashGrid => hashGrid.aabb.min.join(''));
    }
    getChunkAABB(position) {
        const width = this.voxelSize * this.chunkSize;
        const weights = romanpppmath__WEBPACK_IMPORTED_MODULE_3__.v3.scale(position, 1 / width);
        const min = weights.map((w) => Math.floor(w) * width);
        const max = weights.map((w) => Math.ceil(w) * width);
        return new _src_physics_AABB__WEBPACK_IMPORTED_MODULE_4__["default"](min, max);
    }
    setBlock(x, y, z, block) {
        /* x = Math.floor(x) ;
         y = Math.floor(y);
         z = Math.floor(y);*/
        let chunk = this.hashGridTree.pick([x, y, z])[0];
        if (!chunk) {
            const aabb = this.getChunkAABB([x, y, z]);
            chunk = new _src_physics_HashGrid__WEBPACK_IMPORTED_MODULE_1__["default"](aabb, this.voxelSize, this.chunkSize);
            this.hashGridTree.insert(chunk);
        }
        block.translate([
            x + (this.voxelSize / 2),
            y + (this.voxelSize / 2),
            z + (this.voxelSize / 2),
        ]);
        chunk.insert([x, y, z], block);
    }
    updateCollisions() {
        super.updateCollisions();
        this.dynamicObjects.forEach((body) => {
            const aabb = body.getAABB();
            const collisionChunks = this.hashGridTree.query(aabb);
            collisionChunks.forEach((chunk) => {
                const collisions = chunk.query(aabb);
                for (let i = 0, n = collisions.length; i < n; i++) {
                    const manifold = this.getContactManifold(body.getCollider().getId(), collisions[i].getCollider().getId());
                    if (manifold)
                        continue;
                    const features = (0,_src_physics_getCollisionFeatures__WEBPACK_IMPORTED_MODULE_5__["default"])(body.getCollider(), collisions[i].getCollider());
                    if (features.length > 0) {
                        this.addContactManifold(body.getCollider().getId(), collisions[i].getCollider().getId(), _src_physics_ContactManifold__WEBPACK_IMPORTED_MODULE_6__["default"].fromFeaturesArray(body, collisions[i], features));
                    }
                }
            });
        });
    }
}


/***/ }),

/***/ "./demo/voxels/textureShader.ts":
/*!**************************************!*\
  !*** ./demo/voxels/textureShader.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const glsl = x => x;
const vert = glsl `#version 300 es
 
layout(location = 0) in vec4 a_position;
layout(location = 1) in vec3 a_normal;
layout(location = 4) in vec2 a_texcoord;

uniform mat4 u_matrix;
uniform mat4 u_worldViewProjection;
uniform vec3 u_lightWorldPosition;
uniform vec3 u_viewWorldPosition;

out vec3 v_normal;
out vec3 v_surfaceToLight;
out vec3 v_surfaceToView;
out vec2 v_texcoord;

void main() {
    
    gl_Position = u_worldViewProjection * a_position;
    
    vec3 surfaceWorldPosition = (u_matrix * a_position).xyz;
    
    v_surfaceToLight = u_lightWorldPosition - surfaceWorldPosition;

    v_normal = mat3(  u_matrix ) * a_normal;
    
    v_surfaceToView = u_viewWorldPosition - surfaceWorldPosition;

    v_texcoord = a_texcoord;
      
}`;
const frag = glsl `#version 300 es
precision highp float;
 



in vec3 v_normal;
in vec3 v_surfaceToView;
in vec3 v_surfaceToLight;


//uniform sampler2D u_texture1;
uniform float u_shininess;
uniform vec4 u_color;
uniform vec4 u_ambientLight;

in vec2 v_texcoord;

// The texture.
uniform sampler2D u_texture;

out vec4 outColor;


void main() {
  
  vec3 surfaceToLightDirection = normalize(v_surfaceToLight);
  vec3 surfaceToViewDirection = normalize(v_surfaceToView);
  vec3 halfVector = normalize(surfaceToLightDirection + surfaceToViewDirection);

  vec3 normal = normalize(v_normal);
  float light = dot(normal, surfaceToLightDirection);
  float specular = 0.0;
  if (light > 0.0) {
    specular = pow(dot(normal, halfVector), u_shininess);
  }
  
  outColor = texture(u_texture, v_texcoord);
  outColor.rgb *= light;
  outColor.rgb += specular;

  outColor.rgb += u_ambientLight.rgb *0.3;
  
}`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ vert, frag });


/***/ }),

/***/ "./src/physics/AABB.ts":
/*!*****************************!*\
  !*** ./src/physics/AABB.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AABB)
/* harmony export */ });
class AABB {
    constructor(min, max) {
        this.min = min;
        this.max = max;
    }
    isCollide(aabb) {
        if (this.min[0] <= aabb.max[0] &&
            this.max[0] >= aabb.min[0] &&
            this.min[1] <= aabb.max[1] &&
            this.max[1] >= aabb.min[1] &&
            this.min[2] <= aabb.max[2] &&
            this.max[2] >= aabb.min[2]) {
            return true;
        }
        return false;
    }
    contain(point) {
        if (this.min[0] <= point[0] &&
            this.max[0] >= point[0] &&
            this.min[1] <= point[1] &&
            this.max[1] >= point[1] &&
            this.min[2] <= point[2] &&
            this.max[2] >= point[2]) {
            return true;
        }
        return false;
    }
    getSize() {
        const area = Math.abs(this.max[0] - this.min[0]) *
            Math.abs(this.max[1] - this.min[1]) *
            Math.abs(this.max[2] - this.min[2]);
        return area;
    }
    merge(aabb) {
        const x1 = this.min[0] < aabb.min[0] ? this.min[0] : aabb.min[0];
        const x2 = this.max[0] > aabb.max[0] ? this.max[0] : aabb.max[0];
        const y1 = this.min[1] < aabb.min[1] ? this.min[1] : aabb.min[1];
        const y2 = this.max[1] > aabb.max[1] ? this.max[1] : aabb.max[1];
        const z1 = this.min[2] < aabb.min[2] ? this.min[2] : aabb.min[2];
        const z2 = this.max[2] > aabb.max[2] ? this.max[2] : aabb.max[2];
        return new AABB([x1, y1, z1], [x2, y2, z2]);
    }
}


/***/ }),

/***/ "./src/physics/Collider.ts":
/*!*********************************!*\
  !*** ./src/physics/Collider.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Box": () => (/* binding */ Box),
/* harmony export */   "Cylinder": () => (/* binding */ Cylinder),
/* harmony export */   "Sphere": () => (/* binding */ Sphere),
/* harmony export */   "Triangle": () => (/* binding */ Triangle),
/* harmony export */   "colliderTypes": () => (/* binding */ colliderTypes)
/* harmony export */ });
/* harmony import */ var romanpppmath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! romanpppmath */ "./node_modules/romanpppmath/lib/index.js");
/* harmony import */ var _AABB__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AABB */ "./src/physics/AABB.ts");


const xAxis = [1, 0, 0];
const yAxis = [0, 1, 0];
const zAxis = [0, 0, 1];
const xAxisNegative = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(xAxis, -1);
const yAxisNegative = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(yAxis, -1);
const zAxisNegative = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(zAxis, -1);
var colliderTypes;
(function (colliderTypes) {
    colliderTypes[colliderTypes["Point"] = 0] = "Point";
    colliderTypes[colliderTypes["Box"] = 1] = "Box";
    colliderTypes[colliderTypes["Sphere"] = 2] = "Sphere";
    colliderTypes[colliderTypes["Cylinder"] = 3] = "Cylinder";
    colliderTypes[colliderTypes["Triangle"] = 4] = "Triangle";
})(colliderTypes || (colliderTypes = {}));
class Collider {
    constructor() {
        this.Rmatrix = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.identity();
        this.RmatrixInverse = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.identity();
        this.pos = [0, 0, 0];
        this.type = colliderTypes.Point;
        this.id = Collider.lastId++;
    }
    getType() {
        return this.type;
    }
    getRmatrix() {
        return this.Rmatrix;
    }
    setRmatrix(matrix) {
        this.Rmatrix = [...matrix];
        this.RmatrixInverse = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transpose(matrix);
    }
    getRmatrixInverse() {
        return this.RmatrixInverse;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    translate(v) {
        this.pos = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(this.pos, v);
    }
    setTranslation(translation) {
        this.pos = [...translation];
    }
    getTranslation() {
        return this.pos;
    }
    rotate(r) {
        this.Rmatrix = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.xRotate(this.Rmatrix, r[0]);
        this.Rmatrix = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.yRotate(this.Rmatrix, r[1]);
        this.Rmatrix = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.zRotate(this.Rmatrix, r[2]);
        this.RmatrixInverse = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transpose(this.Rmatrix);
    }
    setRotation(r) {
        this.Rmatrix = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.xRotation(r[0]);
        this.Rmatrix = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.yRotate(this.Rmatrix, r[1]);
        this.Rmatrix = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.zRotate(this.Rmatrix, r[2]);
        this.RmatrixInverse = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transpose(this.Rmatrix);
    }
    getAABB() {
        const maxX = this.support(xAxis)[0];
        const maxY = this.support(yAxis)[1];
        const maxZ = this.support(zAxis)[2];
        const minX = this.support(xAxisNegative)[0];
        const minY = this.support(yAxisNegative)[1];
        const minZ = this.support(zAxisNegative)[2];
        return new _AABB__WEBPACK_IMPORTED_MODULE_1__["default"]([minX, minY, minZ], [maxX, maxY, maxZ]);
    }
    getM4() {
        const m = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m4.m3Tom4(this.Rmatrix);
        m[12] = this.pos[0];
        m[13] = this.pos[1];
        m[14] = this.pos[2];
        m[15] = 1;
        return m;
    }
    localToGlobal(v) {
        let global = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(this.Rmatrix, v);
        return romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(this.pos, global);
    }
    getClosestFaceByNormal(normal) {
        return {
            vertices: [this.pos],
            normal: romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(normal, -1),
        };
    }
    getInverseInertiaTensor(mass) {
        return romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.identity();
    }
    support(dir) {
        return this.pos;
    }
}
Collider.lastId = 1;
class Box extends Collider {
    constructor(a = 1, b = 1, c = 1) {
        super();
        this.type = colliderTypes.Box;
        this.scale = [a, b, c];
        this.min = [-a / 2, -b / 2, -c / 2];
        this.max = [a / 2, b / 2, c / 2];
    }
    getAABB() {
        const maxX = this.support(xAxis)[0];
        const maxY = this.support(yAxis)[1];
        const maxZ = this.support(zAxis)[2];
        const minX = this.support(xAxisNegative)[0];
        const minY = this.support(yAxisNegative)[1];
        const minZ = this.support(zAxisNegative)[2];
        return new _AABB__WEBPACK_IMPORTED_MODULE_1__["default"]([minX, minY, minZ], [maxX, maxY, maxZ]);
    }
    support(dir) {
        const _dir = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(this.RmatrixInverse, dir);
        const res = [0, 0, 0];
        res[0] = _dir[0] > 0 ? this.max[0] : this.min[0];
        res[1] = _dir[1] > 0 ? this.max[1] : this.min[1];
        res[2] = _dir[2] > 0 ? this.max[2] : this.min[2];
        const sup = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(this.Rmatrix, res);
        return romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(sup, this.pos);
    }
    getInverseInertiaTensor(mass) {
        const i1 = (mass / 12) * (this.max[1] * this.max[1] + this.max[2] * this.max[2]);
        const i2 = (mass / 12) * (this.max[0] * this.max[0] + this.max[2] * this.max[2]);
        const i3 = (mass / 12) * (this.max[0] * this.max[0] + this.max[1] * this.max[1]);
        const m = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.multiply(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.multiply(this.RmatrixInverse, [
            1 / i1,
            0,
            0,
            0,
            1 / i2,
            0,
            0,
            0,
            1 / i3,
        ]), this.Rmatrix);
        return m;
    }
    getM4() {
        const m = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m4.m3Tom4(this.Rmatrix);
        m[12] = this.pos[0];
        m[13] = this.pos[1];
        m[14] = this.pos[2];
        m[15] = 1;
        const scale = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.diff(this.max, this.min);
        return romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m4.scale(m, ...scale);
    }
    getClosestFaceByNormal(normal) {
        const { Rmatrix } = this;
        const globalNormals = Box.normals.map((n) => romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(Rmatrix, n));
        let minDot = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.dot(normal, globalNormals[0]);
        let index = 0;
        for (let i = 1, n = globalNormals.length; i < n; i++) {
            //const _normal = m3.transformPoint(Rmatrix, normals[i])
            const _dot = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.dot(globalNormals[i], normal);
            if (_dot < minDot) {
                minDot = _dot;
                index = i;
            }
        }
        const faceIndices = Box.indices[index];
        const m = this.getM4();
        return {
            vertices: faceIndices.map((i) => romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m4.transformPoint(m, Box.points[i])),
            normal: globalNormals[index],
        };
    }
}
/*


      
      4-------5
     /       /
    /       /
   7-------6
   |  0-------1
   | /       /
   |/       /
   3-------2
*/
Box.points = [
    [-1 / 2, -1 / 2, -1 / 2],
    [1 / 2, -1 / 2, -1 / 2],
    [1 / 2, -1 / 2, 1 / 2],
    [-1 / 2, -1 / 2, 1 / 2],
    [-1 / 2, 1 / 2, -1 / 2],
    [1 / 2, 1 / 2, -1 / 2],
    [1 / 2, 1 / 2, 1 / 2],
    [-1 / 2, 1 / 2, 1 / 2], //7
];
Box.indices = [
    [0, 4, 5, 1],
    [3, 7, 6, 2],
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [0, 3, 7, 4],
    [1, 2, 6, 5], // +x
];
Box.normals = [
    [0, 0, -1],
    [0, 0, 1],
    [0, -1, 0],
    [0, 1, 0],
    [-1, 0, 0],
    [1, 0, 0],
];
class Sphere extends Collider {
    constructor(radius = 1) {
        super();
        this.radius = radius;
        this.type = colliderTypes.Sphere;
    }
    getAABB() {
        const { radius } = this;
        return new _AABB__WEBPACK_IMPORTED_MODULE_1__["default"](romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(this.pos, [-radius, -radius, -radius]), romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(this.pos, [radius, radius, radius]));
    }
    support(dir) {
        return romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.normalize(dir), this.radius), this.pos);
    }
    getM4() {
        const m = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m4.m3Tom4(this.Rmatrix);
        m[12] = this.pos[0];
        m[13] = this.pos[1];
        m[14] = this.pos[2];
        m[15] = 1;
        const { radius } = this;
        return romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m4.scale(m, radius, radius, radius);
    }
    getClosestFaceByNormal(normal) {
        const reverse = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(normal, -1);
        return { vertices: [romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(reverse, this.radius)], normal: reverse };
    }
    getInverseInertiaTensor(mass) {
        const { radius } = this;
        const m = [
            (2 * mass * radius * radius) / 5,
            0,
            0,
            0,
            (2 * mass * radius * radius) / 5,
            0,
            0,
            0,
            (2 * mass * radius * radius) / 5,
        ];
        return m;
    }
}
class Cylinder extends Collider {
    constructor(radius, height, numSegments = 6) {
        super();
        this.type = colliderTypes.Cylinder;
        this.radius = radius;
        this.height = height;
        const segmentAngle = (2 * Math.PI) / numSegments;
        this.circlePoints = [...new Array(numSegments)].map((_, i) => [
            Math.cos(i * segmentAngle),
            0,
            Math.sin(i * segmentAngle),
        ]);
    }
    support(dir) {
        const _dir = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(this.RmatrixInverse, dir);
        const dir_xz = [_dir[0], 0, _dir[2]];
        const result = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.normalize(dir_xz), this.radius);
        result[1] = _dir[1] > 0 ? this.height / 2 : -this.height / 2;
        return romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(this.Rmatrix, result), this.pos);
    }
    getM4() {
        const m = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m4.m3Tom4(this.Rmatrix);
        m[12] = this.pos[0];
        m[13] = this.pos[1];
        m[14] = this.pos[2];
        m[15] = 1;
        const { radius, height } = this;
        return romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m4.scale(m, radius, height, radius);
    }
    getClosestFaceByNormal(normal) {
        const { Rmatrix, RmatrixInverse } = this;
        const _normal = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(RmatrixInverse, romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(normal, -1));
        const m = this.getM4();
        const cos = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.dot(_normal, [0, 1, 0]);
        const sign = Math.sign(cos);
        if (cos * sign < 0.707) {
            const localNormal = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.normalize([_normal[0], 0, _normal[2]]);
            const vertices = [
                romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m4.transformPoint(m, [_normal[0], 0.5, _normal[2]]),
                romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m4.transformPoint(m, [_normal[0], -0.5, _normal[2]]),
            ];
            return { vertices, normal: romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(Rmatrix, localNormal) };
        }
        const localNormal = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale([0, 1, 0], sign);
        const vertices = this.circlePoints.map((p) => romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m4.transformPoint(m, [p[0], sign * 0.5, p[2]]));
        return { vertices, normal: romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(Rmatrix, localNormal) };
    }
    getInverseInertiaTensor(mass) {
        const { radius, height } = this;
        const i1 = (mass / 12) * (3 * radius * radius + height * height);
        const i3 = (mass / 2) * radius * radius;
        const m = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.multiply(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.multiply(this.Rmatrix, [1 / i1, 0, 0, 0, 1 / i1, 0, 0, 0, 1 / i3]), this.RmatrixInverse);
        return m;
    }
    getAABB() {
        const { radius, height } = this;
        return new _AABB__WEBPACK_IMPORTED_MODULE_1__["default"](romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(this.pos, [-radius, -height, -radius]), romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(this.pos, [radius, height, radius]));
    }
}
class Triangle extends Collider {
    constructor(vertices) {
        super();
        this.type = colliderTypes.Triangle;
        this.vertices = vertices;
        this.normal = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.cross(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.diff(vertices[0], vertices[1]), romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.diff(vertices[2], vertices[1]));
    }
    support(dir) {
        const dot1 = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.dot(this.vertices[0], dir);
        const dot2 = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.dot(this.vertices[1], dir);
        const dot3 = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.dot(this.vertices[2], dir);
        let furthest = this.vertices[0];
        if (dot2 > dot1) {
            furthest = this.vertices[1];
            if (dot3 > dot2)
                furthest = this.vertices[2];
        }
        if (dot3 > dot1)
            furthest = this.vertices[2];
        if (romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.dot(dir, this.normal) < 0)
            furthest = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.diff(furthest, this.normal);
        return furthest;
    }
    getClosestFaceByNormal(normal) {
        return {
            vertices: this.vertices,
            normal: this.normal,
        };
    }
}



/***/ }),

/***/ "./src/physics/Constraints.ts":
/*!************************************!*\
  !*** ./src/physics/Constraints.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Constraint": () => (/* binding */ Constraint),
/* harmony export */   "ContactConstraint": () => (/* binding */ ContactConstraint)
/* harmony export */ });
/* harmony import */ var romanpppmath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! romanpppmath */ "./node_modules/romanpppmath/lib/index.js");
/* harmony import */ var _Equations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Equations */ "./src/physics/Equations.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config */ "./src/physics/config.ts");



const { CONTACT_TRESHOLD, CONTACT_BIAS } = _config__WEBPACK_IMPORTED_MODULE_2__["default"];
class Constraint {
    constructor(body1, body2, raLocal, rbLocal, opt) {
        this.body1 = body1;
        this.body2 = body2;
        this.raLocal = raLocal;
        this.rbLocal = rbLocal;
        this.biasFactor = opt.biasFactor || 0.125;
        this.treshold = opt.treshold || 0.000005;
        this.lambdaMin = opt.lambdaMin || -99999999;
        this.lambdaMax = opt.lambdaMax || 99999999;
        this.prevLambda = 0;
        const collider1 = this.body1.getCollider();
        const collider2 = this.body2.getCollider();
        this.ra = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(collider1.getRmatrix(), this.raLocal);
        this.rb = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(collider2.getRmatrix(), this.rbLocal);
        this.PA = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(collider1.getTranslation(), this.ra);
        this.PB = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(collider2.getTranslation(), this.rb);
    }
    update() {
        const collider1 = this.body1.getCollider();
        const collider2 = this.body2.getCollider();
        this.ra = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(collider1.getRmatrix(), this.raLocal);
        this.rb = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(collider2.getRmatrix(), this.rbLocal);
        const PA = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(collider1.getTranslation(), this.ra);
        const PB = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(collider2.getTranslation(), this.rb);
        const deltaPA = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.diff(PA, this.PA);
        const deltaPB = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.diff(PB, this.PB);
        this.PA = PA;
        this.PB = PB;
        const direction = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.diff(PA, PB);
        this.positionError = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.norm(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum([0.001, 0.001, 0.001], direction));
        this.n = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(direction, 1 / this.positionError);
        return {
            deltaPA,
            deltaPB,
        };
    }
    getEquation() {
        const equation = new _Equations__WEBPACK_IMPORTED_MODULE_1__.ConstraintEquation(this);
        equation.lambdaMax = this.lambdaMax;
        equation.lambdaMin = this.lambdaMin;
        return equation;
    }
}
class ContactConstraint {
    constructor(body1, body2, raLocal, rbLocal, ra, rb, PA, PB, n, positionError, i, j) {
        this.body1 = body1;
        this.body2 = body2;
        this.raLocal = raLocal;
        this.rbLocal = rbLocal;
        this.ra = ra;
        this.rb = rb;
        this.PA = PA;
        this.PB = PB;
        this.n = n;
        this.positionError = positionError;
        this.i = i;
        this.j = j;
        this.biasFactor = _config__WEBPACK_IMPORTED_MODULE_2__["default"].CONTACT_BIAS;
        this.treshold = _config__WEBPACK_IMPORTED_MODULE_2__["default"].CONTACT_TRESHOLD;
        this.lambdaMin = ContactConstraint.opt.lambdaMin;
        this.lambdaMax = ContactConstraint.opt.lambdaMax;
        this.prevTanLambdas = [0, 0];
        this.prevLambda = 0;
    }
    update() {
        const collider1 = this.body1.getCollider();
        const collider2 = this.body2.getCollider();
        this.ra = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(collider1.getRmatrix(), this.raLocal);
        this.rb = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(collider2.getRmatrix(), this.rbLocal);
        const PA = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(collider1.getTranslation(), this.ra);
        const PB = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(collider2.getTranslation(), this.rb);
        const deltaPA = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.diff(PA, this.PA);
        const deltaPB = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.diff(PB, this.PB);
        this.PA = PA;
        this.PB = PB;
        const direction = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.diff(PA, PB);
        this.positionError = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.dot(this.n, direction);
        return {
            deltaPA,
            deltaPB,
        };
    }
    getEquation() {
        const lambdaMax = Math.max(1, romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.norm(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(this.body1.getVelocity(), this.body1.getMass()), romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(this.body2.getVelocity(), this.body2.getMass()))) * 10);
        const equation = new _Equations__WEBPACK_IMPORTED_MODULE_1__.ContactEquation(this);
        equation.lambdaMax = lambdaMax;
        equation.lambdaMin = 0;
        return equation;
    }
    getFrictionEquations() {
        const eq1 = new _Equations__WEBPACK_IMPORTED_MODULE_1__.FrictionEquation(this, 0);
        const eq2 = new _Equations__WEBPACK_IMPORTED_MODULE_1__.FrictionEquation(this, 1);
        eq1.lambdaMax = Infinity;
        eq1.lambdaMin = -Infinity;
        eq2.lambdaMax = Infinity;
        eq2.lambdaMin = -Infinity;
        return [
            eq1, eq2
        ];
    }
}
ContactConstraint.opt = {
    biasFactor: 0.125,
    treshold: 0.0005,
    lambdaMin: 0,
    lambdaMax: Infinity,
};


/***/ }),

/***/ "./src/physics/ContactManifold.ts":
/*!****************************************!*\
  !*** ./src/physics/ContactManifold.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ContactManifold)
/* harmony export */ });
/* harmony import */ var romanpppmath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! romanpppmath */ "./node_modules/romanpppmath/lib/index.js");
/* harmony import */ var _Constraints__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Constraints */ "./src/physics/Constraints.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config */ "./src/physics/config.ts");



const { CONTACT_MANIFOLD_KEEP_TRESHOLD } = _config__WEBPACK_IMPORTED_MODULE_2__["default"];
class ContactManifold {
    static fromFeaturesArray(body1, body2, features) {
        return new ContactManifold(features.map((c) => new _Constraints__WEBPACK_IMPORTED_MODULE_1__.ContactConstraint(body1, body2, c.raLocal, c.rbLocal, c.ra, c.rb, c.PA, c.PB, c.n, c.positionError, c.i, c.j)));
    }
    constructor(contacts) {
        this.contacts = contacts;
        this.keep = true;
    }
    update() {
        const contacts = this.contacts;
        if (contacts.length < 3) {
            this.keep = false;
            return;
        }
        for (let i = 0, n = contacts.length; i < n; i++) {
            const contact = contacts[i];
            const { deltaPA, deltaPB } = contact.update();
            if (romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.norm(deltaPA) > CONTACT_MANIFOLD_KEEP_TRESHOLD ||
                romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.norm(deltaPB) > CONTACT_MANIFOLD_KEEP_TRESHOLD) {
                this.keep = false;
                return;
            }
        }
    }
}


/***/ }),

/***/ "./src/physics/Debug.ts":
/*!******************************!*\
  !*** ./src/physics/Debug.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventEmitter */ "./src/physics/EventEmitter.ts");

const data = {
    SOLVER_ERROR: 0,
    RUNTIME: 0,
    FPS: 0,
};
class Debug extends _EventEmitter__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super();
    }
    static getInstance() {
        if (!Debug.instance) {
            Debug.instance = new Debug();
            Debug.instance.data = {};
            Object.keys(data).forEach(key => {
                Debug.instance.data[`_${key}`] = data[key];
                Object.defineProperty(Debug.instance.data, key, {
                    get() {
                        return this[`_${key}`];
                    },
                    set(value) {
                        this[`_${key}`] = value;
                        Debug.instance.emit(`update`, { key: `_${key}`, value });
                    }
                });
            });
        }
        return Debug.instance;
    }
    someMethod() { }
}
window.Debug = Debug.getInstance();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Debug.getInstance());


/***/ }),

/***/ "./src/physics/Equations.ts":
/*!**********************************!*\
  !*** ./src/physics/Equations.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConstraintEquation": () => (/* binding */ ConstraintEquation),
/* harmony export */   "ContactEquation": () => (/* binding */ ContactEquation),
/* harmony export */   "FrictionEquation": () => (/* binding */ FrictionEquation)
/* harmony export */ });
/* harmony import */ var romanpppmath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! romanpppmath */ "./node_modules/romanpppmath/lib/index.js");

const clamp = (v, min, max) => {
    if (v > min) {
        if (v < max)
            return v;
        else
            return max;
    }
    return min;
};
const nullVec = [0, 0, 0];
class ConstraintEquation {
    constructor(constraint) {
        this.constraint = constraint;
        this.prevLambda = constraint.prevLambda;
    }
    updateJacobian() {
        const { body1, body2, ra, rb, n } = this.constraint;
        if (body1.isStatic()) {
            this.J1 = nullVec;
            this.J2 = nullVec;
        }
        else {
            this.J1 = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(n, -1);
            this.J2 = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.cross(n, ra);
        }
        if (body2.isStatic()) {
            this.J3 = nullVec;
            this.J4 = nullVec;
        }
        else {
            this.J3 = n;
            this.J4 = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.cross(rb, n);
        }
        /*  const dof1 = body1.dof;
        const dof2 = body2.dof;
    
        this.J[0][0] *= dof1[0];
        this.J[0][1] *= dof1[1];
        this.J[0][2] *= dof1[2];
    
        this.J[1][0] *= dof1[3];
        this.J[1][1] *= dof1[4];
        this.J[1][2] *= dof1[5];
    
        this.J[2][0] *= dof2[0];
        this.J[2][1] *= dof2[1];
        this.J[2][2] *= dof2[2];
    
        this.J[3][0] *= dof2[3];
        this.J[3][1] *= dof2[4];
        this.J[3][2] *= dof2[5];*/
    }
    updateLeftPart(dt) {
        this.updateJacobian();
        const { body1, body2 } = this.constraint;
        const I1 = body1.getInverseInertiaTensor();
        const I2 = body2.getInverseInertiaTensor();
        let M1 = body1.getInverseMass();
        let M2 = body2.getInverseMass();
        this.JM1 = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(this.J1, M1);
        this.JM2 = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(I1, this.J2);
        this.JM3 = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(this.J3, M2);
        this.JM4 = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(I2, this.J4);
        //JMJ* = JB; B = MJ* as 2 vec6, _J = Jacobian as 2 vec6
        this.effMass =
            romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.dot(this.J1, this.JM1) +
                romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.dot(this.JM2, this.J2) +
                romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.dot(this.J3, this.JM3) +
                romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.dot(this.JM4, this.J4);
    }
    updateRightPart(dt) {
        const { biasFactor, treshold, body1, body2, n, ra, rb, positionError } = this.constraint;
        const relativeVelocity = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.diff(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(body2.getVelocity(), romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.cross(body2.getAngularVelocity(), rb)), romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(body1.getVelocity(), romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.cross(body1.getAngularVelocity(), ra)));
        const relativeVelocityNormalProjection = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.dot(relativeVelocity, n);
        this.bias =
            (biasFactor * Math.max(positionError - treshold, 0)) / dt -
                relativeVelocityNormalProjection;
    }
    applyImpulse(lambda) {
        this.constraint.prevLambda = lambda;
        this.constraint.body1.applyImpulse(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(this.J1, lambda), this.constraint.ra);
        this.constraint.body2.applyImpulse(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(this.J3, lambda), this.constraint.rb);
    }
    applyPseudoImpulse(lambda) {
        this.constraint.body1.applyPseudoImpulse(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(this.J1, lambda), this.constraint.ra);
        this.constraint.body2.applyPseudoImpulse(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(this.J3, lambda), this.constraint.rb);
    }
}
ConstraintEquation.biasMultiplier = 0.5;
class ContactEquation extends ConstraintEquation {
    updateRightPart(dt) {
        const { body1, body2, treshold, biasFactor, ra, rb, n, positionError } = this.constraint;
        const relativeVelocity = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.diff(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(body2.getVelocity(), romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.cross(body2.getAngularVelocity(), rb)), romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(body1.getVelocity(), romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.cross(body1.getAngularVelocity(), ra)));
        const relativeVelocityNormalProjection = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.dot(relativeVelocity, n);
        this.bias =
            (Math.max(0, positionError - treshold) / dt) * biasFactor -
                relativeVelocityNormalProjection;
    }
}
class FrictionEquation extends ConstraintEquation {
    constructor(constraint, dir) {
        super(constraint);
        this.dir = dir;
        this.prevLambda = this.constraint.prevTanLambdas[dir];
        this.lambdaMax = this.constraint.prevLambda * (this.constraint.body1.getFriction() + this.constraint.body2.getFriction()) * 10;
        this.lambdaMin = -this.lambdaMax;
    }
    updateJacobian() {
        const { body1, body2, ra, rb } = this.constraint;
        const n = this.dir
            ? this.constraint.j
            : this.constraint.i;
        if (body1.isStatic()) {
            this.J1 = nullVec;
            this.J2 = nullVec;
        }
        else {
            this.J1 = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(n, -1);
            this.J2 = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.cross(n, ra);
        }
        if (body2.isStatic()) {
            this.J3 = nullVec;
            this.J4 = nullVec;
        }
        else {
            this.J3 = n;
            this.J4 = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.cross(rb, n);
        }
    }
    updateRightPart() {
        const { body1, body2, ra, rb } = this.constraint;
        const n = this.dir
            ? this.constraint.j
            : this.constraint.i;
        const relativeVelocity = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.diff(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(body2.getVelocity(), romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.cross(body2.getAngularVelocity(), rb)), romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(body1.getVelocity(), romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.cross(body1.getAngularVelocity(), ra)));
        let relativeVelocityNormalProjection = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.dot(relativeVelocity, n);
        //if(Math.abs(relativeVelocityNormalProjection) < 0.000001) relativeVelocityNormalProjection = 0
        this.bias = -(relativeVelocityNormalProjection);
    }
    applyImpulse(lambda) {
        this.constraint.prevTanLambdas[this.dir] = lambda;
        this.constraint.body1.applyImpulse(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(this.J1, lambda), this.constraint.ra);
        this.constraint.body2.applyImpulse(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(this.J3, lambda), this.constraint.rb);
    }
}
/*
class PositionConstraint extends Constraint {
  constructor(
    body1,
    body2,
    n,
    ra,
    rb,
    raLocal,
    rbLocal,
    biasFactor,
    treshold,
    penDepth
  ) {
    super(
      body1,
      body2,
      n,
      ra,
      rb,
      raLocal,
      rbLocal,
      biasFactor,
      null,
      null,
      treshold
    );
    this.penDepth = penDepth;
  }
  applyResolvingImpulse(lambda) {
    this.body1.applyPseudoImpulse(v3.scale(this.J[0], lambda), this.ra);
    this.body2.applyPseudoImpulse(v3.scale(this.J[2], lambda), this.rb);
  }
  updateRightPart(deltaTime) {
    const { body1, body2, ra, rb, n, penDepth, treshold, biasFactor } = this;

    this.bias = (Math.max(0, penDepth - treshold) / deltaTime) * biasFactor;
  }
}
class RotationalConstraint extends Constraint {
  constructor(body1, body2, raLocal, rbLocal) {
    super(body1, body2, null, null, null, raLocal, rbLocal);
  }
  updateLeftPart(deltaTime) {
    const { body1, body2, raLocal, rbLocal } = this;
    this.PA = body1.collider.localToGlobal(raLocal);
    this.PB = body2.collider.localToGlobal(rbLocal);
    const s = m3.transformPoint(body1.collider.Rmatrix, raLocal);
    const b = m3.transformPoint(body2.collider.Rmatrix, rbLocal);

    this.ra = s;
    this.rb = b;

    const J = [[0, 0, 0], v3.cross(s, b), [0, 0, 0], v3.cross(b, s)];

    const dof1 = body1.DOF;
    const dof2 = body2.DOF;

    J[0][0] *= dof1[0];
    J[0][1] *= dof1[1];
    J[0][2] *= dof1[2];

    J[1][0] *= dof1[3];
    J[1][1] *= dof1[4];
    J[1][2] *= dof1[5];

    J[2][0] *= dof2[0];
    J[2][1] *= dof2[1];
    J[2][2] *= dof2[2];

    J[3][0] *= dof2[3];
    J[3][1] *= dof2[4];
    J[3][2] *= dof2[5];
    const I1 = body1.getInverseInertiaTensor();
    const I2 = body2.getInverseInertiaTensor();
    this.J = J;
    this.JM = [
      [0, 0, 0],
      m3.transformPoint(I1, this.J[1]),
      [0, 0, 0],
      m3.transformPoint(I2, this.J[3]),
    ];
    this.effMass =
      v3.dot(this.JM[1], this.J[1]) + v3.dot(this.JM[3], this.J[3]);
    this.B = [
      [0, 0, 0, ...this.JM[1]],
      [0, 0, 0, ...this.JM[3]],
    ];
    this._J = [
      [...this.J[0], ...this.J[1]],
      [...this.J[2], ...this.J[3]],
    ];
  }
  updateRightPart(deltaTime) {
    const { body1, body2 } = this;

    this.bias =
      -v3.dot(this.J[1], body1.getAngularVelocity()) + v3.dot(this.J[3], body2.getAngularVelocity());
  }
  applyResolvingImpulse(lambda) {
    const { body1, body2 } = this;
    body1.addAngularV(v3.scale(this.ra, lambda));
    body2.addAngularV(v3.scale(this.rb, lambda));
  }
}
*/
/*
class Joint extends Constraint {
  constructor(body1, body2, raLocal, rbLocal, biasFactor = 0) {
    super(body1, body2, null, null, null, raLocal, rbLocal, biasFactor);

    this.treshold = 0.0001;
    this.reducer = 0.5;
    this.maxImpulse = 0.7;
  }
  updateLeftPart(deltaTime) {
    const { body1, body2, raLocal, rbLocal } = this;
    this.PA = body1.collider.localToGlobal(raLocal);
    this.PB = body2.collider.localToGlobal(rbLocal);
    const dir = v3.diff(this.PA, this.PB);
    const n = dir;
    this.n = n;
    this.ra = diff(this.PA, this.body1.collider.pos);
    this.rb = diff(this.PB, this.body2.collider.pos);
    this.penDepth = norm(dir);

    const J = [
      v3.scale(this.n, -1),
      v3.cross(this.n, this.ra),
      this.n,
      v3.cross(this.rb, this.n),
    ];

    const dof1 = body1.DOF;
    const dof2 = body2.DOF;

    J[0][0] *= dof1[0];
    J[0][1] *= dof1[1];
    J[0][2] *= dof1[2];

    J[1][0] *= dof1[3];
    J[1][1] *= dof1[4];
    J[1][2] *= dof1[5];

    J[2][0] *= dof2[0];
    J[2][1] *= dof2[1];
    J[2][2] *= dof2[2];

    J[3][0] *= dof2[3];
    J[3][1] *= dof2[4];
    J[3][2] *= dof2[5];
    const I1 = body1.getInverseInertiaTensor();
    const I2 = body2.getInverseInertiaTensor();
    let M1 = body1.getInverseMass();
    let M2 = body2.getInverseMass();
    this.J = J;
    this.JM = [
      scale(this.J[0], M1),
      m3.transformPoint(I1, this.J[1]),
      scale(this.J[2], M2),
      m3.transformPoint(I2, this.J[3]),
    ];
    this.effMass =
      dot(this.JM[0], J[0]) +
      dot(this.JM[1], this.J[1]) +
      dot(this.JM[2], J[2]) +
      dot(this.JM[3], this.J[3]);
    this.B = [
      [...this.JM[0], ...this.JM[1]],
      [...this.JM[2], ...this.JM[3]],
    ];
    this._J = [
      [...this.J[0], ...this.J[1]],
      [...this.J[2], ...this.J[3]],
    ];
  }

  updateRightPart(deltaTime) {
    const { body1, body2, ra, rb, n, penDepth, treshold, biasFactor } = this;

    const relativeVelocity = diff(
      sum(body2.getVelocity(), cross(body2.getAngularVelocity(), rb)),
      sum(body1.getVelocity(), cross(body1.getAngularVelocity(), ra))
    );

    const relativeVelocityNormalProjection = dot(relativeVelocity, n);
    const fac = penDepth ** 2 > treshold;
    this.bias =
      (biasFactor * Math.max(penDepth ** 2 - treshold, 0)) / deltaTime -
      relativeVelocityNormalProjection;
    this.bias *= fac;
  }
  applyResolvingImpulse(lambda) {
    this.body1.applyImpulse(scale(this.J[0], lambda), this.ra);
    this.body2.applyImpulse(scale(this.J[2], lambda), this.rb);
  }
  applyResolvingPseudoImpulse(lambda) {
    const max = this.effMass * 10;
    //lambda = clamp(lambda, -1, 1)
    this.body1.applyPseudoImpulse(scale(this.n, -lambda), [0, 0, 0]);
    this.body2.applyPseudoImpulse(scale(this.n, lambda), [0, 0, 0]);
  }
}
class JointPositionConstraint extends Joint {
  updateRightPart(deltaTime) {
    const { penDepth, treshold, biasFactor } = this;

    const fac = penDepth ** 2 > treshold;
    this.bias =
      ((biasFactor * Math.max(penDepth ** 2 - treshold, 0)) / deltaTime) * fac;
  }
  applyResolvingImpulse(lambda) {
    //if(lambda < 0.1)return
    this.body1.applyPseudoImpulse(scale(this.J[0], lambda), this.ra);
    this.body2.applyPseudoImpulse(scale(this.J[2], lambda), this.rb);
  }
}*/



/***/ }),

/***/ "./src/physics/EventEmitter.ts":
/*!*************************************!*\
  !*** ./src/physics/EventEmitter.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EventEmitter)
/* harmony export */ });
class EventEmitter {
    constructor() {
        this.events = {};
    }
    on(eventName, fn) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(fn);
        return () => {
            this.events[eventName] = this.events[eventName].filter((eventFn) => fn !== eventFn);
        };
    }
    emit(eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach((fn) => {
                fn.call(null, data);
            });
        }
    }
}


/***/ }),

/***/ "./src/physics/HashGrid.ts":
/*!*********************************!*\
  !*** ./src/physics/HashGrid.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HashGrid)
/* harmony export */ });
class HashGrid {
    constructor(aabb, cellSize, numCells) {
        this.cellSize = cellSize;
        this.numCells = numCells;
        this.aabb = aabb;
        this.cells = new Array(Math.pow(numCells, 3));
    }
    getAABB() {
        return this.aabb;
    }
    contain(position) {
        for (let i = 0; i < 3; i++)
            if (this.aabb.min[i] > position[i])
                return false;
        for (let i = 0; i < 3; i++)
            if (this.aabb.max[i] < position[i])
                return false;
        return true;
    }
    getCellForPos(position) {
        let i = Math.min(1, Math.max(0, (position[0] - this.aabb.min[0]) / (this.aabb.max[0] - this.aabb.min[0])));
        let j = Math.min(1, Math.max(0, (position[1] - this.aabb.min[1]) / (this.aabb.max[1] - this.aabb.min[1])));
        let k = Math.min(1, Math.max(0, (position[2] - this.aabb.min[2]) / (this.aabb.max[2] - this.aabb.min[2])));
        i = Math.floor(i * this.numCells - 1);
        j = Math.floor(j * this.numCells - 1);
        k = Math.floor(k * this.numCells - 1);
        return [i, j, k];
    }
    insert(position, element) {
        if (!this.contain(position))
            return false;
        const cellIJK = this.getCellForPos(position);
        this.cells[cellIJK[0] + cellIJK[1] * this.numCells + cellIJK[2] * this.numCells * this.numCells] = element;
        return true;
    }
    query(aabb) {
        const min = this.getCellForPos(aabb.min);
        const max = this.getCellForPos(aabb.max);
        const collisions = [];
        for (let i = min[0]; i <= max[0]; i++) {
            for (let j = min[1]; j <= max[1]; j++) {
                for (let k = min[2]; k <= max[2]; k++) {
                    const element = this.cells[i + j * this.numCells + k * this.numCells * this.numCells];
                    if (element)
                        collisions.push(element);
                }
            }
        }
        return collisions;
    }
}


/***/ }),

/***/ "./src/physics/RigidBody.ts":
/*!**********************************!*\
  !*** ./src/physics/RigidBody.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RigidBody": () => (/* binding */ RigidBody),
/* harmony export */   "TerrainSegment": () => (/* binding */ TerrainSegment)
/* harmony export */ });
/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventEmitter */ "./src/physics/EventEmitter.ts");
/* harmony import */ var romanpppmath__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! romanpppmath */ "./node_modules/romanpppmath/lib/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config */ "./src/physics/config.ts");



const { RIGID_BODY_MOVE_TRESHOLD, RIGID_BODY_AABB_BIAS } = _config__WEBPACK_IMPORTED_MODULE_2__["default"];
class RigidBody extends _EventEmitter__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(collider) {
        super();
        this.static = false;
        this.collider = collider;
        this.mass = 1;
        this.inverseMass = 1 / this.mass;
        this.velocity = [0, 0, 0];
        this.pseudoVelocity = [0, 0, 0];
        this.pseudoAngularV = [0, 0, 0];
        this.acceleration = [0, 0, 0];
        this.omega = [0, 0, 0];
        this.inverseInertiaTensor = collider.getInverseInertiaTensor(this.mass);
        this.id = RigidBody.lastId++;
        this.friction = 5;
        this.updateEventFunctions = [];
        this.group = null;
        this.needToUpdate = false;
    }
    getId() {
        return this.id;
    }
    getGroup() {
        return this.group;
    }
    setGroup(groupId) {
        this.group = groupId;
    }
    getMass() {
        return this.mass;
    }
    getInverseMass() {
        return this.inverseMass;
    }
    getTranslation() {
        return this.getCollider().getTranslation();
    }
    getCollider() {
        return this.collider;
    }
    isStatic() {
        return this.static;
    }
    getRotation() {
        return this.getCollider().getRmatrix();
    }
    getVelocity() {
        return this.velocity;
    }
    getAcceleration() {
        return this.acceleration;
    }
    getAngularVelocity() {
        return this.omega;
    }
    getFriction() {
        return this.friction;
    }
    getInverseInertiaTensor() {
        return this.inverseInertiaTensor;
    }
    getAABB() {
        const aabb = this.collider.getAABB();
        const velocity = this.velocity;
        const tr = [RIGID_BODY_AABB_BIAS, RIGID_BODY_AABB_BIAS, RIGID_BODY_AABB_BIAS];
        aabb.min = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.diff(aabb.min, tr);
        aabb.max = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.sum(aabb.max, tr);
        return aabb;
    }
    addVelocity(v) {
        this.velocity = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.sum(this.velocity, v);
    }
    addAngularVelocity(v) {
        this.omega = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.sum(this.omega, v);
    }
    addAcceleration(v) {
        this.acceleration = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.sum(this.acceleration, v);
    }
    translate(translation) {
        this.collider.translate(translation);
        this.needToUpdate = true;
        this.emitUpdate();
    }
    rotate(rotation) {
        this.collider.rotate(rotation);
        this.needToUpdate = true;
        this.emitUpdate();
    }
    setId(id) {
        this.id = id;
    }
    setMass(mass) {
        this.mass = mass;
        this.inverseMass = 1 / this.mass;
    }
    setFriction(f) {
        this.friction = f;
    }
    setRotation(r) {
        this.collider.setRotation(r);
        this.needToUpdate = true;
        this.emitUpdate();
    }
    setTranslation(t) {
        this.collider.setTranslation(t);
        this.needToUpdate = true;
        this.emitUpdate();
    }
    setVelocity(v) {
        this.velocity = v;
    }
    setAngularVelocity(v) {
        this.omega = v;
    }
    setStatic(b) {
        this.static = b;
    }
    integrateRK4(dt) {
        const { acceleration, velocity, omega } = this;
        const _translation = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.scale(romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.sum(velocity, romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.scale(acceleration, (2 / 3) * dt)), dt);
        const _rotation = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.scale(omega, dt / 2);
        const deltaVelocity = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.scale(acceleration, dt);
        if (romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.norm(_translation) > _config__WEBPACK_IMPORTED_MODULE_2__["default"].RIGID_BODY_MOVE_TRESHOLD)
            this.translate(_translation);
        if (romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.norm(_rotation) > _config__WEBPACK_IMPORTED_MODULE_2__["default"].RIGID_BODY_MOVE_TRESHOLD)
            this.rotate(_rotation);
        this.velocity = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.sum(velocity, deltaVelocity);
    }
    integratePseudoVelocities(dt) {
        const translation = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.scale(this.pseudoVelocity, dt);
        const rotation = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.scale(this.pseudoAngularV, dt);
        if (romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.norm(translation) > _config__WEBPACK_IMPORTED_MODULE_2__["default"].RIGID_BODY_MOVE_TRESHOLD)
            this.translate(translation);
        if (romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.norm(rotation) > _config__WEBPACK_IMPORTED_MODULE_2__["default"].RIGID_BODY_MOVE_TRESHOLD)
            this.rotate(rotation);
        this.pseudoVelocity = [0, 0, 0];
        this.pseudoAngularV = [0, 0, 0];
    }
    addPseudoVelocity(v) {
        this.pseudoVelocity = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.sum(this.pseudoVelocity, v);
    }
    addPseudoAngularV(v) {
        this.pseudoAngularV = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.sum(this.pseudoAngularV, v);
    }
    integrateVelocities(dt) {
        const translation = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.scale(romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.diff(this.velocity, romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.scale(this.acceleration, dt / 3)), dt);
        if (romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.norm(translation) > _config__WEBPACK_IMPORTED_MODULE_2__["default"].RIGID_BODY_MOVE_TRESHOLD)
            this.translate(translation);
        const rotation = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.scale(this.omega, dt / 2);
        if (romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.norm(rotation) > _config__WEBPACK_IMPORTED_MODULE_2__["default"].RIGID_BODY_MOVE_TRESHOLD)
            this.rotate(rotation);
    }
    integrateForces(dt) {
        let deltaSpeed = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.scale(this.acceleration, dt);
        this.velocity = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.sum(this.velocity, deltaSpeed);
    }
    updateInverseInertia() {
        this.inverseInertiaTensor = this.collider.getInverseInertiaTensor(this.mass);
    }
    applyImpulse(impulse, point) {
        if (this.static)
            return;
        this.velocity = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.sum(this.velocity, romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.scale(impulse, this.inverseMass));
        const angularImpulse = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.m3.transformPoint(this.inverseInertiaTensor, romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.cross(point, impulse));
        this.omega = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.sum(this.omega, angularImpulse);
    }
    applyPseudoImpulse(impulse, point) {
        if (this.static)
            return;
        this.pseudoVelocity = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.sum(this.pseudoVelocity, romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.scale(impulse, this.inverseMass));
        const angularImpulse = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.m3.transformPoint(this.inverseInertiaTensor, romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.cross(point, impulse));
        this.pseudoAngularV = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.sum(this.pseudoAngularV, angularImpulse);
    }
    /*
    applyAngularImpulse(radius : number, axis, value) {
      const dir = normalize([
        axis[1] + axis[2],
        axis[2] - axis[0],
        -axis[0] - axis[1],
      ]);
      const rad = vector.cross(dir, axis);
      const globalDir = scale(dir, value);
      const globalRad = scale(rad, radius);
  
      this.applyImpulse(globalDir, globalRad);
    }*/
    getExpandedAABB() {
        const aabb = this.collider.getAABB();
        const velocity = this.velocity;
        const tr = [RIGID_BODY_AABB_BIAS, RIGID_BODY_AABB_BIAS, RIGID_BODY_AABB_BIAS];
        aabb.min = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.diff(aabb.min, tr);
        aabb.max = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.sum(aabb.max, tr);
        /*if(velocity[0] > 10) aabb.max[0] += velocity[0]
          if(velocity[1] > 10) aabb.max[1] += velocity[1]
          if(velocity[2] > 10) aabb.max[2] += velocity[2]
          if(velocity[0] < -10) aabb.min[0] += velocity[0]
          if(velocity[1] < -10) aabb.min[1] += velocity[1]
          if(velocity[2] < -10) aabb.min[2] += velocity[2]*/
        return aabb;
    }
    onUpdate(func) {
        if (this.updateEventFunctions.indexOf(func) > -1)
            return;
        this.updateEventFunctions.push(func);
        return () => {
            this.updateEventFunctions.filter(fn => fn !== func);
        };
    }
    emitUpdate() {
        this.updateEventFunctions.forEach(fn => {
            fn();
        });
    }
}
RigidBody.lastId = 1;
class TerrainSegment {
    constructor(collider) {
        this.collider = collider;
        this.group = null;
        this.friction = 5;
        this.updateEventFunctions = [];
    }
    getId() {
        return TerrainSegment.id;
    }
    getGroup() {
        return this.group;
    }
    setGroup(groupId) {
        this.group = groupId;
    }
    getMass() {
        return 1;
    }
    getInverseMass() {
        return 1;
    }
    getTranslation() {
        return this.getCollider().getTranslation();
    }
    getCollider() {
        return this.collider;
    }
    isStatic() {
        return true;
    }
    getRotation() {
        return this.getCollider().getRmatrix();
    }
    getVelocity() {
        return [0, 0, 0];
    }
    getAcceleration() {
        return [0, 0, 0];
    }
    getAngularVelocity() {
        return [0, 0, 0];
    }
    getFriction() {
        return this.friction;
    }
    getInverseInertiaTensor() {
        return romanpppmath__WEBPACK_IMPORTED_MODULE_1__.m3.identity();
    }
    getAABB() {
        const aabb = this.collider.getAABB();
        const tr = [RIGID_BODY_AABB_BIAS, RIGID_BODY_AABB_BIAS, RIGID_BODY_AABB_BIAS];
        aabb.min = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.diff(aabb.min, tr);
        aabb.max = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.sum(aabb.max, tr);
        return aabb;
    }
    addVelocity(v) {
    }
    addAngularVelocity(v) {
    }
    addAcceleration(v) {
    }
    translate(translation) {
        this.collider.translate(translation);
        this.emitUpdate();
    }
    rotate(rotation) {
        this.collider.rotate(rotation);
        this.emitUpdate();
    }
    setId(id) {
    }
    setMass(mass) {
    }
    setFriction(f) {
        this.friction = f;
    }
    setRotation(r) {
        this.collider.setRotation(r);
        this.emitUpdate();
    }
    setTranslation(t) {
        this.emitUpdate();
    }
    setVelocity(v) {
    }
    setAngularVelocity(v) {
    }
    setStatic(b) {
    }
    integrateRK4(dt) {
    }
    integratePseudoVelocities(dt) {
    }
    addPseudoVelocity(v) {
    }
    addPseudoAngularV(v) {
    }
    integrateVelocities(dt) {
    }
    integrateForces(dt) {
    }
    updateInverseInertia() {
    }
    applyImpulse(impulse, point) {
    }
    applyPseudoImpulse(impulse, point) {
    }
    /*
    applyAngularImpulse(radius : number, axis, value) {
      const dir = normalize([
        axis[1] + axis[2],
        axis[2] - axis[0],
        -axis[0] - axis[1],
      ]);
      const rad = vector.cross(dir, axis);
      const globalDir = scale(dir, value);
      const globalRad = scale(rad, radius);
  
      this.applyImpulse(globalDir, globalRad);
    }*/
    onUpdate(func) {
        if (this.updateEventFunctions.indexOf(func) > -1)
            return;
        this.updateEventFunctions.push(func);
        return () => {
            this.updateEventFunctions.filter(fn => fn !== func);
        };
    }
    emitUpdate() {
        this.updateEventFunctions.forEach(fn => {
            fn();
        });
    }
}
TerrainSegment.id = 0;
/*
class Player extends RigidBody {
  constructor(collider : ICollider) {
    super(collider);
    this.friction = 0.3;
    
  }
  applyImpulse(impulse : vec3, point : vec3) {
    this.velocity = v3.sum(this.velocity, v3.scale(impulse, this.inverseMass));
  }
  applyPseudoImpulse(impulse : vec3) {
    this.pseudoVelocity = v3.sum(
      this.pseudoVelocity,
      v3.scale(impulse, this.inverseMass)
    );
  }
  
  
}
*/



/***/ }),

/***/ "./src/physics/Simulation.ts":
/*!***********************************!*\
  !*** ./src/physics/Simulation.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Simulation)
/* harmony export */ });
/* harmony import */ var _Tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tree */ "./src/physics/Tree.ts");
/* harmony import */ var _getCollisionFeatures__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getCollisionFeatures */ "./src/physics/getCollisionFeatures.ts");
/* harmony import */ var _ContactManifold__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ContactManifold */ "./src/physics/ContactManifold.ts");
/* harmony import */ var _System__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./System */ "./src/physics/System.ts");

//import { getContacts as gjk } from "./gjk";



//import ISpatialContainer from "./models/ISpatialContainer";
const sameGroup = (body1, body2) => {
    if (!body1.getGroup())
        return;
    if (!body2.getGroup())
        return;
    return body1.getGroup() === body2.getGroup();
};
const pairHash = (x, y) => x === Math.max(x, y) ? x * x + x + y : y * y + x + y;
class Simulation {
    constructor() {
        this.dynamicObjects = [];
        this._staticObjects = [];
        this.dynamicObjectsTree = new _Tree__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.staticObjectsTree = new _Tree__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.dynamicObjectsTree.setKey((rigidBody) => rigidBody.getCollider().getId());
        this.staticObjectsTree.setKey((rigidBody) => rigidBody.getCollider().getId());
        this.collisions = [];
        this.constraints = new Map();
        this.useCache = true;
        this.contactManifolds = new Map();
    }
    getContactManifold(id1, id2) {
        return this.contactManifolds.get(id1 === Math.max(id1, id2) ? id1 * id1 + id1 + id2 : id2 * id2 + id1 + id2);
    }
    addContactManifold(id1, id2, manifold) {
        this.contactManifolds.set(id1 === Math.max(id1, id2) ? id1 * id1 + id1 + id2 : id2 * id2 + id1 + id2, manifold);
    }
    addObject(object) {
        const { dynamicObjectsTree, objects, staticObjectsTree } = this;
        const aabb = object.getAABB();
        if (object.isStatic()) {
            this._staticObjects.push(object);
            staticObjectsTree.insert(object);
            object.onUpdate(() => {
                staticObjectsTree.remove(object.getCollider().getId());
                staticObjectsTree.insert(object);
            });
            return;
        }
        dynamicObjectsTree.insert(object);
        this.dynamicObjects.push(object);
        object.onUpdate(() => {
            dynamicObjectsTree.remove(object.getCollider().getId());
            dynamicObjectsTree.insert(object);
        });
    }
    addConstraints(constraints, name) {
        this.constraints.set(name, [...constraints]);
    }
    addPositionConstraints(constraints, name) {
        this.positionConstraints.set(name, [...constraints]);
    }
    removeObject(object) {
        this.dynamicObjectsTree.remove(object.getCollider().getId());
    }
    updatecontactManifolds() {
        for (const [hash, manifold] of this.contactManifolds) {
            manifold.update();
            if (!manifold.keep)
                this.contactManifolds.delete(hash);
        }
    }
    updateDynamicCollisions() {
        const collisions = this.dynamicObjectsTree.getCollisionsPairs();
        for (let i = 0, n = collisions.length; i < n; i++) {
            const pair = collisions[i];
            if (sameGroup(pair[0], pair[1]))
                continue;
            const hash = pairHash(pair[0].getCollider().getId(), pair[1].getCollider().getId());
            let manifold = this.contactManifolds.get(hash);
            if (manifold)
                continue;
            const features = (0,_getCollisionFeatures__WEBPACK_IMPORTED_MODULE_1__["default"])(pair[0].getCollider(), pair[1].getCollider());
            if (features.length > 0) {
                this.contactManifolds.set(hash, _ContactManifold__WEBPACK_IMPORTED_MODULE_2__["default"].fromFeaturesArray(pair[0], pair[1], features));
            }
        }
    }
    updateCollisions() {
        this.updatecontactManifolds();
        this.updateDynamicCollisions();
        this.dynamicObjects.forEach((body1) => {
            const aabb = body1.getAABB();
            const collisions = this.staticObjectsTree.query(aabb);
            //tree.elements.get(body1.getCollider().getId()).isChecked = true;
            for (let j = 0, n = collisions.length; j < n; j++) {
                const body2 = collisions[j];
                if (body1 === body2)
                    continue;
                const hash = pairHash(body1.getCollider().getId(), body2.getCollider().getId());
                let manifold = this.contactManifolds.get(hash);
                //if (manifold) continue;
                if (manifold)
                    continue;
                const features = (0,_getCollisionFeatures__WEBPACK_IMPORTED_MODULE_1__["default"])(body1.getCollider(), body2.getCollider());
                if (features.length > 0) {
                    this.contactManifolds.set(hash, _ContactManifold__WEBPACK_IMPORTED_MODULE_2__["default"].fromFeaturesArray(body1, body2, features));
                }
            }
        });
        this.dynamicObjectsTree.setUnchecked();
        this.staticObjectsTree.setUnchecked();
    }
    tick(dt) {
        this.updateCollisions();
        const { objects, contactManifolds } = this;
        this.dynamicObjects.forEach((body) => body.integrateForces(dt));
        const system = new _System__WEBPACK_IMPORTED_MODULE_3__["default"]();
        system.useCache = this.useCache;
        const frictionSystem = new _System__WEBPACK_IMPORTED_MODULE_3__["default"](false);
        const contactEquations = [];
        const frictionEquations = [];
        for (let [key, manifold] of contactManifolds) {
            const useVelocityBias = manifold.contacts.length < 2;
            manifold.contacts.forEach((contactConstraint, _i) => {
                const contactEquation = contactConstraint.getEquation();
                const [fEquation1, fEquation2] = contactConstraint.getFrictionEquations();
                contactEquations.push(contactEquation);
                frictionEquations.push(fEquation1, fEquation2);
            });
        }
        system.addEquations(contactEquations);
        for (let [name, constraints] of this.constraints) {
            const equations = [];
            constraints.forEach((c) => {
                c.update();
                const equation = c.getEquation();
                equations.push(equation);
            });
            system.addEquations(equations);
        }
        //system.updateEquations(dt);
        frictionSystem.addEquations(frictionEquations);
        frictionSystem.updateEquations(dt);
        frictionSystem.generateSystem(dt);
        frictionSystem.solvePGS(dt);
        system.updateEquations(dt);
        system.generateSystem(dt);
        const lambda = system.solvePGS(dt, true);
        const len = frictionEquations.length / 2;
        /*for (let i = 0; i < len; i++) {
          frictionEquations[2 * i].lambdaMin *= lambda[i];
          frictionEquations[2 * i].lambdaMax = lambda[i];
          frictionEquations[2 * i + 1].lambdaMin *= lambda[i];
          frictionEquations[2 * i + 1].lambdaMax = lambda[i];
        }*/
        this.dynamicObjects.forEach((object) => object.updateInverseInertia());
        this.dynamicObjects.forEach((object) => object.integrateVelocities(dt));
        let ndx = 0;
        /*
        for (const [key, manifold] of this.contactManifolds) {
          
          manifold.contacts.forEach((c) => {
            c.prevLambda = lambda[ndx]
            ndx++;
          });
        }*/
        /*
        const positionSystem = new System();
        const positionConstraints = [];
    
        for (const [key, manifold] of manifolds) {
          const { contacts } = manifold;
          if (contacts.length > 1) {
            positionConstraints.push(
              ...contacts.map((c) => {
                const {
                  body1,
                  body2,
                  raLocal,
                  rbLocal,
                  ra,
                  rb,
                  i,
                  j,
                  penDepth,
                  n,
                } = c;
                const constraint = new PositionConstraint(
                  body1,
                  body2,
                  n,
                  ra,
                  rb,
                  raLocal,
                  rbLocal,
                  0.1,
                  0.0001,
                  penDepth
                );
    
                return constraint;
              })
            );
          }
        }
        positionSystem.addConstraint(positionConstraints);
        for (let [name, constraints] of this.positionConstraints) {
          positionSystem.addConstraint(constraints);
        }
        positionSystem.updateEquations(dt);
        positionSystem.generateSystem(dt);
    
        positionSystem.solvePGS(dt);
        for (let i = 0, n = this.objects.length; i < n; i++) {
          this.objects[i].integratePseudoVelocities(dt);
        }
        this.objects.forEach((object) => object.updateInverseInertia());*/
    }
}


/***/ }),

/***/ "./src/physics/System.ts":
/*!*******************************!*\
  !*** ./src/physics/System.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ System)
/* harmony export */ });
/* harmony import */ var romanpppmath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! romanpppmath */ "./node_modules/romanpppmath/lib/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config */ "./src/physics/config.ts");
/* harmony import */ var _Debug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Debug */ "./src/physics/Debug.ts");



let arr = [];
let o = 0;
let f = true;
const _log = (val) => {
    o++;
    if (f) {
        console.log(arr);
        f = false;
        return;
    }
    if (o < 200 && o % 10 == 0) {
        arr.push(val);
    }
};
const { SOLVER_ITERATIONS_NUM } = _config__WEBPACK_IMPORTED_MODULE_1__["default"];
const nullVec = [0, 0, 0];
const v6 = {
    dot(a, b) {
        return a[0] * b[0] +
            a[1] * b[1] +
            a[2] * b[2] +
            a[3] * b[3] +
            a[4] * b[4] +
            a[5] * b[5];
    },
    scale(a, fac) {
        return [a[0] * fac, a[1] * fac, a[2] * fac, a[3] * fac, a[4] * fac, a[5] * fac];
    },
    sum(a, b) {
        return [
            a[0] + b[0],
            a[1] + b[1],
            a[2] + b[2],
            a[3] + b[3],
            a[4] + b[4],
            a[5] + b[5]
        ];
    },
    fromv3(a, b) {
        return [...a, ...b];
    }
};
const norm = (v) => Math.sqrt(v.reduce((acc, el) => acc += el * el, 0));
class System {
    constructor(useCache = true) {
        this.equations = [];
        this.useCache = useCache;
    }
    addEquations(equations) {
        this.equations.push(...equations);
    }
    generateBodyMapping() {
        const equations = this.equations;
        const n = equations.length;
        const bodiesMap = new Map();
        const Jmap = [];
        let counter = 0;
        for (let i = 0; i < n; i++) {
            const eq = equations[i];
            let bodyIndex1 = bodiesMap.get(eq.constraint.body1.getId());
            if (bodyIndex1 === undefined) {
                bodyIndex1 = counter++;
                bodiesMap.set(eq.constraint.body1.getId(), bodyIndex1);
            }
            let bodyIndex2 = bodiesMap.get(eq.constraint.body2.getId());
            if (bodyIndex2 === undefined) {
                bodyIndex2 = counter++;
                bodiesMap.set(eq.constraint.body2.getId(), bodyIndex2);
            }
            Jmap.push(bodyIndex1, bodyIndex2);
        }
        this.bodiesMap = bodiesMap;
        this.Jmap = Jmap;
    }
    generateSystem(deltaTime) {
        //Numerating bodies
        this.generateBodyMapping();
    }
    //J * Vel
    solvePGS(deltaTime, log = false) {
        const { Jmap, bodiesMap, equations } = this;
        const numBodies = bodiesMap.size;
        const n = equations.length;
        const d = [];
        const lambda0 = new Array(n).fill(0);
        const lambda = [];
        for (let i = 0; i < n; i++) {
            lambda0[i] = equations[i].prevLambda;
            lambda[i] = lambda0[i];
        }
        const Bl = new Array(numBodies).fill(nullVec);
        const B2l = new Array(numBodies).fill(nullVec);
        for (let i = 0; i < n; i++) {
            const b1 = Jmap[i * 2];
            const b2 = Jmap[i * 2 + 1];
            const eq = equations[i];
            const l = lambda0[i];
            /* Bl[b1] = v6.sum(v6.scale(
               equations[i].B[0],
               lambda0[i]),
               Bl[b1])*/
            if (!eq.constraint.body1.isStatic()) {
                Bl[b1] = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(eq.JM1, l), Bl[b1]);
                B2l[b1] = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(eq.JM2, l), B2l[b1]);
            }
            if (!eq.constraint.body2.isStatic()) {
                Bl[b2] = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(eq.JM3, l), Bl[b2]);
                B2l[b2] = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(eq.JM4, l), B2l[b2]);
            }
            /*Bl[b2] = v6.sum(v6.scale(
              equations[i].B[1],
               lambda0[i]),
                Bl[b2])*/
        }
        //PGS
        let flag = true;
        let numIter = SOLVER_ITERATIONS_NUM;
        const deltaLambda = new Array(n);
        while (numIter > 0) {
            for (let i = 0; i < n; i++) {
                const eq = equations[i];
                //const J = eq._J
                const b1 = Jmap[i * 2];
                const b2 = Jmap[i * 2 + 1];
                //deltaLambda[i] = (eq.bias - v6.dot(J[0], Bl[b1]) - v6.dot(J[1], Bl[b2])) / d[i]
                //deltaLambda[i] = (eq.bias - v3.dot(eq.J1, Bl[b1]) - v3.dot(eq.J2, B2l[b1]) - v3.dot(eq.J3, Bl[b2]) - v3.dot(eq.J4, B2l[b2])) / equations[i].effMass
                deltaLambda[i] = eq.bias;
                if (!eq.constraint.body1.isStatic()) {
                    deltaLambda[i] -= romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.dot(eq.J1, Bl[b1]) + romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.dot(eq.J2, B2l[b1]);
                }
                if (!eq.constraint.body2.isStatic()) {
                    deltaLambda[i] -= romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.dot(eq.J3, Bl[b2]) + romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.dot(eq.J4, B2l[b2]);
                }
                deltaLambda[i] /= eq.effMass;
                lambda0[i] = lambda[i];
                lambda[i] = Math.max(eq.lambdaMin, Math.min(lambda0[i] + deltaLambda[i], eq.lambdaMax));
                deltaLambda[i] = lambda[i] - lambda0[i];
                //Bl[b1] = v6.sum(Bl[b1], v6.scale(eq.B[0], deltaLambda[i]))
                Bl[b1] = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(eq.JM1, deltaLambda[i]), Bl[b1]);
                B2l[b1] = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(eq.JM2, deltaLambda[i]), B2l[b1]);
                // Bl[b2] = v6.sum(Bl[b2], v6.scale(eq.B[1], deltaLambda[i]))
                Bl[b2] = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(eq.JM3, deltaLambda[i]), Bl[b2]);
                B2l[b2] = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(eq.JM4, deltaLambda[i]), B2l[b2]);
            }
            numIter--;
        }
        if (log)
            _Debug__WEBPACK_IMPORTED_MODULE_2__["default"].data.SOLVER_ERROR = norm(deltaLambda);
        for (let i = 0; i < n; i++) {
            equations[i].applyImpulse(lambda[i]);
        }
        return lambda;
    }
    updateEquations(deltaTime) {
        const { equations } = this;
        const n = equations.length;
        for (let i = 0; i < n; i++) {
            equations[i].updateLeftPart(deltaTime);
            equations[i].updateRightPart(deltaTime);
        }
    }
    applyResolvingImpulses(lambda) {
        for (let i = 0, n = this.equations.length; i < n; i++) {
            this.equations[i].applyImpulse(lambda[i]);
        }
    }
    applyResolvingPseudoImpulses(lambda) {
        for (let i = 0, n = this.equations.length; i < n; i++) {
            this.equations[i].applyPseudoImpulse(lambda[i]);
        }
    }
}
System.useCache = true;


/***/ }),

/***/ "./src/physics/Tree.ts":
/*!*****************************!*\
  !*** ./src/physics/Tree.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Tree)
/* harmony export */ });
/* harmony import */ var _AABB__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AABB */ "./src/physics/AABB.ts");

const getBoundAabb = (aabb1, aabb2) => {
    const x1 = aabb1.min[0] < aabb2.min[0] ? aabb1.min[0] : aabb2.min[0];
    const x2 = aabb1.max[0] > aabb2.max[0] ? aabb1.max[0] : aabb2.max[0];
    const y1 = aabb1.min[1] < aabb2.min[1] ? aabb1.min[1] : aabb2.min[1];
    const y2 = aabb1.max[1] > aabb2.max[1] ? aabb1.max[1] : aabb2.max[1];
    const z1 = aabb1.min[2] < aabb2.min[2] ? aabb1.min[2] : aabb2.min[2];
    const z2 = aabb1.max[2] > aabb2.max[2] ? aabb1.max[2] : aabb2.max[2];
    return new _AABB__WEBPACK_IMPORTED_MODULE_0__["default"]([x1, y1, z1], [x2, y2, z2]);
};
const isCollide = (aabb1, aabb2) => {
    if (aabb1.min[0] <= aabb2.max[0] &&
        aabb1.max[0] >= aabb2.min[0] &&
        aabb1.min[1] <= aabb2.max[1] &&
        aabb1.max[1] >= aabb2.min[1] &&
        aabb1.min[2] <= aabb2.max[2] &&
        aabb1.max[2] >= aabb2.min[2]) {
        return true;
    }
    return false;
};
const getSize = (aabb) => {
    const area = Math.abs(aabb.max[0] - aabb.min[0]) *
        Math.abs(aabb.max[1] - aabb.min[1]) *
        Math.abs(aabb.max[2] - aabb.min[2]);
    return area;
};
class Node {
    constructor(aabb, isLeaf, object, id) {
        this.aabb = aabb;
        this.isLeaf = isLeaf;
        this.parent = null;
        this.id = id;
        this.left = null;
        this.right = null;
        this.isChecked = false;
        this.object = object;
        this.height = 0;
        this.queryId = 0;
    }
}
class Tree {
    constructor() {
        this.root = null;
        this.elements = new Map();
        this.queryId = 0;
        this.getId = null;
        this.collisions = [];
    }
    setKey(f) {
        this.getId = f;
    }
    updateQueryId() {
        this.queryId++;
    }
    setUnchecked() {
        if (!this.root)
            return;
        const stack = [this.root];
        while (stack.length != 0) {
            const node = stack.pop();
            node.isChecked = false;
            if (node.isLeaf) {
                continue;
            }
            if (node.left)
                stack.push(node.left);
            if (node.right)
                stack.push(node.right);
        }
    }
    getBestSibling(leaf) {
        let potential = this.root;
        while (!potential.isLeaf) {
            potential.height++;
            const size = potential.aabb.getSize();
            const combinedAABB = potential.aabb.merge(leaf.aabb);
            const combinedSize = combinedAABB.getSize();
            let cost = combinedSize;
            let inherCost = combinedSize - size;
            let cost1;
            if (potential.left.isLeaf) {
                cost1 = potential.left.aabb.getSize() + inherCost;
            }
            else {
                cost1 =
                    leaf.aabb.merge(potential.left.aabb).getSize() -
                        potential.left.aabb.getSize() +
                        inherCost;
            }
            let cost2;
            if (potential.right.isLeaf) {
                cost2 = potential.right.aabb.getSize() + inherCost;
            }
            else {
                cost2 =
                    leaf.aabb.merge(potential.right.aabb).getSize() -
                        potential.right.aabb.getSize() +
                        inherCost;
            }
            if (cost < cost1 && cost < cost2)
                return potential;
            if (cost1 < cost2) {
                potential = potential.left;
            }
            else
                potential = potential.right;
        }
        return potential;
    }
    insert(object) {
        const aabb = object.getAABB();
        const id = this.getId(object);
        const leaf = new Node(aabb, true, object, id);
        this.elements.set(id, leaf);
        if (this.root === null) {
            this.root = leaf;
            this.root.height = 1;
            this.root.parent = null;
            return leaf;
        }
        const sibling = this.getBestSibling(leaf);
        const oldParent = sibling.parent;
        const newParent = new Node(null, false, null, null);
        newParent.parent = oldParent;
        newParent.aabb = leaf.aabb.merge(sibling.aabb);
        newParent.height = sibling.height + 1;
        if (oldParent) {
            if (oldParent.left === sibling)
                oldParent.left = newParent;
            else
                oldParent.right = newParent;
            newParent.left = sibling;
            newParent.right = leaf;
            sibling.parent = newParent;
            leaf.parent = newParent;
        }
        else {
            newParent.left = sibling;
            newParent.right = leaf;
            sibling.parent = newParent;
            leaf.parent = newParent;
            this.root = newParent;
        }
        let _node = leaf.parent;
        while (_node) {
            _node = this.balance(_node);
            _node.height = 1 + Math.max(_node.left.height, _node.right.height);
            _node = _node.parent;
        }
        return leaf;
    }
    balance(node) {
        if (!node) {
            return null;
        }
        if (node.isLeaf || node.height < 2) {
            node.aabb = node.left.aabb.merge(node.right.aabb);
            return node;
        }
        const left = node.left;
        const right = node.right;
        const balance = node.right.height - node.left.height;
        if (balance > 1) {
            const rightleft = right.left;
            const rightright = right.right;
            right.left = node;
            right.parent = node.parent;
            node.parent = right;
            if (right.parent != null) {
                if (right.parent.left === node) {
                    right.parent.left = right;
                }
                else {
                    right.parent.right = right;
                }
            }
            else
                this.root = right;
            if (right.left.height > rightright.height) {
                right.right = rightleft;
                node.right = rightright;
                rightright.parent = node;
                node.height = 1 + Math.max(left.height, rightright.height);
                right.height = 1 + Math.max(node.height, rightleft.height);
            }
            else {
                node.right = rightleft;
                rightleft.parent = node;
                node.height = 1 + Math.max(left.height, rightleft.height);
                right.height = 1 + Math.max(node.height, rightright.height);
            }
            node.aabb = node.left.aabb.merge(node.right.aabb);
            right.aabb = right.left.aabb.merge(right.right.aabb);
            return right;
        }
        if (balance < -1) {
            const leftleft = left.left;
            const leftright = left.right;
            left.left = node;
            left.parent = node.parent;
            node.parent = left;
            if (left.parent != null) {
                if (left.parent.left === node) {
                    left.parent.left = left;
                }
                else {
                    left.parent.right = left;
                }
            }
            else
                this.root = left;
            if (leftleft.height > leftright.height) {
                left.right = leftleft;
                node.left = leftright;
                leftright.parent = node;
                node.height = 1 + Math.max(right.height, leftright.height);
                left.height = 1 + Math.max(node.height, leftleft.height);
            }
            else {
                left.right = leftright;
                node.left = leftleft;
                leftleft.parent = node;
                node.height = 1 + Math.max(right.height, leftleft.height);
                left.height = 1 + Math.max(node.height, leftright.height);
            }
            node.aabb = node.left.aabb.merge(node.right.aabb);
            left.aabb = left.left.aabb.merge(left.right.aabb);
            return left;
        }
        node.aabb = node.left.aabb.merge(node.right.aabb);
        return node;
    }
    query(aabb, cols = []) {
        //const aabb = object.getAABB();
        // this.elements.get(this.getId(object)).queryId = this.queryId
        const iter = (_node) => {
            if (!_node) {
                return;
            }
            /* if (_node.object === object) {
              return;
            }*/
            if (aabb.isCollide(_node.aabb)) {
                if (_node.isLeaf && !_node.isChecked) {
                    cols.push(_node.object);
                }
                iter(_node.left);
                iter(_node.right);
            }
        };
        iter(this.root);
        return cols;
    }
    pick(point, cols = []) {
        const iter = (_node) => {
            if (!_node) {
                return;
            }
            /* if (_node.object === object) {
              return;
            }*/
            if (_node.aabb.contain(point)) {
                if (_node.isLeaf && !_node.isChecked) {
                    cols.push(_node.object);
                }
                iter(_node.left);
                iter(_node.right);
            }
        };
        iter(this.root);
        return cols;
    }
    remove(id) {
        const leaf = this.elements.get(id);
        if (!leaf)
            return;
        if (leaf === this.root) {
            this.root = null;
            return;
        }
        const parent = leaf.parent;
        const grandParent = parent.parent;
        let sibling;
        if (parent.left === leaf)
            sibling = parent.right;
        else
            sibling = parent.left;
        if (grandParent) {
            if (grandParent.left === parent)
                grandParent.left = sibling;
            else
                grandParent.right = sibling;
            sibling.parent = grandParent;
            let _node = grandParent;
            while (_node) {
                _node = this.balance(_node);
                _node.height = 1 + Math.max(_node.right.height, _node.left.height);
                _node = _node.parent;
            }
        }
        else {
            this.root = sibling;
            sibling.parent = null;
        }
        this.elements.delete(id);
    }
    toArray(node) {
        const iter = (leaf) => {
            if (!leaf) {
                return null;
            }
            if (leaf.isLeaf)
                return leaf.id;
            else
                return [iter(leaf.left), iter(leaf.right)];
        };
        if (!node)
            node = this.root;
        return iter(node);
    }
    getCollisionsPairs() {
        this.collisions = [];
        if (!this.root || this.root.isLeaf)
            return this.collisions;
        this.setUnchecked();
        this._getCollisionsHelper(this.root.left, this.root.right);
        return this.collisions;
    }
    _getCollisionsHelper(node1, node2) {
        if (node1.isLeaf) {
            if (node2.isLeaf) {
                if (isCollide(node1.aabb, node2.aabb)) {
                    this.collisions.push([node1.object, node2.object]);
                }
            }
            else {
                this.crossChildren(node2);
                this._getCollisionsHelper(node1, node2.right);
                this._getCollisionsHelper(node1, node2.left);
            }
        }
        else {
            if (node2.isLeaf) {
                this.crossChildren(node1);
                this._getCollisionsHelper(node1.right, node2);
                this._getCollisionsHelper(node1.left, node2);
            }
            else {
                this.crossChildren(node1);
                this.crossChildren(node2);
                this._getCollisionsHelper(node1.right, node2.right);
                this._getCollisionsHelper(node1.left, node2.left);
                this._getCollisionsHelper(node1.right, node2.left);
                this._getCollisionsHelper(node1.left, node2.right);
            }
        }
    }
    crossChildren(node) {
        if (!node.isChecked) {
            this._getCollisionsHelper(node.right, node.left);
            node.isChecked = true;
        }
    }
}


/***/ }),

/***/ "./src/physics/clipping.ts":
/*!*********************************!*\
  !*** ./src/physics/clipping.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clipFaceVsFace": () => (/* binding */ clipFaceVsFace),
/* harmony export */   "clipPointVsPoly": () => (/* binding */ clipPointVsPoly),
/* harmony export */   "clipPolyVsPoly": () => (/* binding */ clipPolyVsPoly),
/* harmony export */   "clipSegmentVsPoly": () => (/* binding */ clipSegmentVsPoly),
/* harmony export */   "clipSegmentVsSegment": () => (/* binding */ clipSegmentVsSegment),
/* harmony export */   "computeIntersection": () => (/* binding */ computeIntersection),
/* harmony export */   "isInClockwise": () => (/* binding */ isInClockwise),
/* harmony export */   "isInside": () => (/* binding */ isInside)
/* harmony export */ });
const isInside = (p1, p2, q) => {
    const R = (p2[0] - p1[0]) * (q[1] - p1[1]) - (p2[1] - p1[1]) * (q[0] - p1[0]);
    return R <= 0 + 0.001;
};
const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
/*
const isInClockwise = (points : Array<vec2>) => {
  if (points.length < 3) return 1;
  const [p1, p2, p3] = points;
  const det =
    p2[0] * p3[1] +
    p3[0] * p1[1] +
    p1[0] * p2[1] -
    p1[0] * p1[1] -
    p3[0] * p2[1] -
    p1[0] * p3[1];

  if (det <= 0) return 1;
  return -1;
};
*/
function isInClockwise(poly) {
    if (poly.length < 3)
        return 1;
    let end = poly.length - 1;
    let sum = poly[end][0] * poly[0][1] - poly[0][0] * poly[end][1];
    for (let i = 0; i < end; ++i) {
        const n = i + 1;
        sum += poly[i][0] * poly[n][1] - poly[n][0] * poly[i][1];
    }
    return sum > 0;
}
const computeIntersection = (p1, p2, p3, p4) => {
    if (p2[0] - p1[0] === 0) {
        const x = p1[0];
        const m2 = (p4[1] - p3[1]) / (p4[0] - p3[0]);
        const b2 = p3[1] - m2 * p3[0];
        const y = m2 * x + b2;
        return [x, y];
    }
    if (p4[0] - p3[0] === 0) {
        const x = p3[0];
        const m1 = (p2[1] - p1[1]) / (p2[0] - p1[0]);
        const b1 = p1[1] - m1 * p1[0];
        const y = m1 * x + b1;
        return [x, y];
    }
    const m1 = (p2[1] - p1[1]) / (p2[0] - p1[0]);
    const b1 = p1[1] - m1 * p1[0];
    const m2 = (p4[1] - p3[1]) / (p4[0] - p3[0]);
    const b2 = p3[1] - m2 * p3[0];
    const x = (b2 - b1) / (m1 - m2);
    const y = m1 * x + b1;
    return [x, y];
};
const clipPolyVsPoly = (A, B) => {
    let result = [...A];
    for (let i = 0, n = B.length; i < n; i++) {
        const next = [...result];
        result = [];
        const aEdge1 = B.at(i - 1);
        const aEdge2 = B.at(i);
        for (let j = 0, _n = next.length; j < _n; j++) {
            const bEdge1 = next.at(j - 1);
            const bEdge2 = next.at(j);
            if (isInside(aEdge1, aEdge2, bEdge2)) {
                if (!isInside(aEdge1, aEdge2, bEdge1)) {
                    const intersection = computeIntersection(bEdge1, bEdge2, aEdge1, aEdge2);
                    result.push(intersection);
                }
                result.push(bEdge2);
                continue;
            }
            if (isInside(aEdge1, aEdge2, bEdge1)) {
                const intersection = computeIntersection(bEdge1, bEdge2, aEdge1, aEdge2);
                result.push(intersection);
            }
        }
    }
    return result;
};
const lerp = (a, b, t) => a + (b - a) * t;
const clipSegmentVsSegment = (s1, s2) => {
    const [p1, p2] = s1;
    const [p3, p4] = s2;
    const top = (p4[0] - p3[0]) * (p1[1] - p3[1]) - (p4[1] - p3[1]) * (p1[0] - p3[0]);
    const bottom = (p4[1] - p3[1]) * (p2[0] - p1[0]) - (p4[0] - p3[0]) * (p2[1] - p1[1]);
    if (!bottom)
        return [];
    const t = top / bottom;
    if (t < 0 || t > 1)
        return [];
    return [[lerp(p1[0], p2[0], t), lerp(p1[1], p2[1], t)]];
};
const clipPointVsPoly = (point, vertices) => {
    const x = point[0];
    const y = point[1];
    let inside = false;
    for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
        const xi = vertices[i][0], yi = vertices[i][1];
        const xj = vertices[j][0], yj = vertices[j][1];
        const intersect = yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
        if (intersect)
            inside = !inside;
    }
    return [point];
};
const clipSegmentVsPoly = (segment, poly) => {
    const [p1, p2] = segment;
    const points = [];
    if (clipPointVsPoly(p1, poly))
        points.push(p1);
    if (clipPointVsPoly(p2, poly))
        points.push(p2);
    if (points.length > 1)
        return points;
    for (let i = 0, n = poly.length; i < n; i++) {
        const q1 = poly.at(i - 1);
        const q2 = poly.at(i);
        const intersection = clipSegmentVsSegment([p1, p2], [q1, q2]);
        if (intersection.length > 0)
            points.push(intersection[0]);
    }
    return points;
};
const pairHash = (x, y) => x === Math.max(x, y) ? x * x + y + x : y * x + y;
const POLY = 3;
const SEGMENT = 2;
const POINT = 1;
const faceTypeMap = {};
faceTypeMap[pairHash(POLY, POLY)] = clipPolyVsPoly;
faceTypeMap[pairHash(SEGMENT, POLY)] = clipSegmentVsPoly;
faceTypeMap[pairHash(SEGMENT, SEGMENT)] = clipSegmentVsSegment;
faceTypeMap[pairHash(POINT, POLY)] = (face1, face2) => clipPointVsPoly(face1[0], face2);
function clipFaceVsFace(face1, face2) {
    const type1 = Math.min(face1.length, POLY);
    const type2 = Math.min(face2.length, POLY);
    let args = [face1, face2];
    if (type1 > type2) {
        return faceTypeMap[pairHash(type2, type1)](arguments[1], arguments[0]);
    }
    return faceTypeMap[pairHash(type1, type2)](arguments[0], arguments[1]);
}



/***/ }),

/***/ "./src/physics/config.ts":
/*!*******************************!*\
  !*** ./src/physics/config.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const config = {
    RIGID_BODY_MOVE_TRESHOLD: 0.005,
    RIGID_BODY_AABB_BIAS: 0.11,
    CLIP_BIAS: 0.001,
    GJK_MAX_ITERATIONS_NUM: 64,
    EPA_BIAS: 0.00001,
    CONTACT_BIAS: 0.125,
    CONTACT_TRESHOLD: 0.05,
    CONTACT_MANIFOLD_KEEP_TRESHOLD: 0.001,
    SOLVER_ITERATIONS_NUM: 18,
    USE_CONTACT_CACHE: false
};
window.config = config;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (config);


/***/ }),

/***/ "./src/physics/getCollisionFeatures.ts":
/*!*********************************************!*\
  !*** ./src/physics/getCollisionFeatures.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getCollisionFeatures)
/* harmony export */ });
/* harmony import */ var romanpppmath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! romanpppmath */ "./node_modules/romanpppmath/lib/index.js");
/* harmony import */ var _gjk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gjk */ "./src/physics/gjk.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config */ "./src/physics/config.ts");
/* harmony import */ var _clipping__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./clipping */ "./src/physics/clipping.ts");
/* harmony import */ var _Collider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Collider */ "./src/physics/Collider.ts");





/* //For debug!
const drawPolys = (_p1,_p2) =>{
    const canvas = document.getElementById("canvas2") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    
    const p1 = _p1.map(el => [100 + el[0] * 10, 100 + el[1]*10])
    const p2 = _p2.map(el => [100 + el[0] * 10, 100 + el[1]*10])

    
    const dir1 = isInClockwise(_p1);
    const dir2 = isInClockwise(_p2);
    console.log(_p1, dir1, _p2, dir2)
    console.log(clipFaceVsFace(_p1, _p2));

    ctx.beginPath(); // Start a new path
    ctx.moveTo(p1[0][0], p1[0][1]); // Move the pen to (30, 50)
    
    
    for(let i = 1; i < p1.length; i++) ctx.lineTo(p1[i][0], p1[i][1])
   //ctx.lineTo(p1[0][0], p1[0][1])
    ctx.stroke(); // Render the path
    
    ctx.moveTo(p2[0][0], p2[0][1]); // Move the pen to (30, 50)
    
    ctx.fillStyle = "rgb(255, 165, 0)";
    
    for(let i = 1; i < p2.length; i++) ctx.lineTo(p2[i][0], p2[i][1])
    //ctx.lineTo(p2[0][0], p2[0][1])
    ctx.stroke(); // Render the path
    
}
*/
const rayVsPlaneIntersec = (plane, point, direction) => {
    const [origin, normal] = plane;
    const _dot = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.dot(normal, direction);
    const fromPointToOrigin = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.diff(point, origin);
    const fac = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.dot(fromPointToOrigin, normal) / _dot;
    return romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.diff(point, romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(direction, fac));
};
const isPointBehindPlane = (origin, normal, point, sign = 1) => {
    //const [origin, normal] = plane;
    let _d = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.dot(normal, romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.diff(point, origin)) * sign;
    return _d > 0 - _config__WEBPACK_IMPORTED_MODULE_2__["default"].CLIP_BIAS;
};
const pointOnPlaneProjection = (origin, normal, point) => {
    //const [origin, normal] = plane;
    const fromPointToOrigin = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.diff(point, origin);
    const projAlongNormal = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.dot(normal, fromPointToOrigin);
    return romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.diff(point, romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(normal, projAlongNormal));
};
const clipPointsBehindPlane = (plane, points, sign = 1) => {
    const [origin, normal] = plane;
    return points.filter((point) => romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.dot(normal, romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.diff(point, origin)) * sign + _config__WEBPACK_IMPORTED_MODULE_2__["default"].CLIP_BIAS > 0);
};
const get2DcoordsOnPlane = (i, j, point) => {
    return [romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.dot(i, point), romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.dot(j, point)];
};
const triangleVsCollider = (triangle, collider) => {
    const contactFace1 = [];
};
function getCollisionFeatures(coll1, coll2) {
    const collisionSimplex = (0,_gjk__WEBPACK_IMPORTED_MODULE_1__.gjk)(coll1, coll2);
    if (!collisionSimplex)
        return [];
    let contactFace1 = null;
    let contactFace2 = null;
    let n = null;
    let positionError = null;
    if (coll1.getType() === _Collider__WEBPACK_IMPORTED_MODULE_4__.colliderTypes.Triangle) {
        n = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(contactFace1.normal, -1);
    }
    if (coll2.getType() === _Collider__WEBPACK_IMPORTED_MODULE_4__.colliderTypes.Triangle) {
        n = contactFace2.normal;
    }
    else {
        const contactData = (0,_gjk__WEBPACK_IMPORTED_MODULE_1__.EPA)(collisionSimplex.a, collisionSimplex.b, collisionSimplex.c, collisionSimplex.d, collisionSimplex.originsMap, collisionSimplex.coll1, collisionSimplex.coll2);
        if (!contactData)
            return [];
        n = contactData.n;
        positionError = contactData.positionError;
    }
    if (coll1.getType() === _Collider__WEBPACK_IMPORTED_MODULE_4__.colliderTypes.Sphere) {
        const PA = coll1.support(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(n, -1));
        const PB = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(PA, romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(n, positionError));
        const rb = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.diff(PB, coll2.getTranslation());
        const ra = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.diff(PA, coll1.getTranslation());
        const raLocal = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(coll1.getRmatrixInverse(), ra);
        const rbLocal = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(coll2.getRmatrixInverse(), rb);
        const i = [n[1] + n[2], n[2] - n[0], -n[0] - n[1]];
        const j = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.cross(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(n, -1), i);
        return [
            {
                ra,
                rb,
                n,
                PA,
                PB,
                positionError,
                i,
                j,
                raLocal,
                rbLocal,
            },
        ];
    }
    if (coll2.getType() === _Collider__WEBPACK_IMPORTED_MODULE_4__.colliderTypes.Sphere) {
        const PB = coll1.support(n);
        const PA = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(PB, romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(n, -positionError));
        const rb = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.diff(PB, coll2.getTranslation());
        const ra = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.diff(PA, coll1.getTranslation());
        const raLocal = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(coll1.getRmatrixInverse(), ra);
        const rbLocal = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(coll2.getRmatrixInverse(), rb);
        const i = [n[1] + n[2], n[2] - n[0], -n[0] - n[1]];
        const j = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.cross(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(n, -1), i);
        return [
            {
                ra,
                rb,
                n,
                PA,
                PB,
                positionError,
                i,
                j,
                raLocal,
                rbLocal,
            },
        ];
    }
    /*const { PA, PB, n, positionError } = contactData;
  
    if (
      coll1.getType() === colliderTypes.Sphere ||
      coll2.getType() === colliderTypes.Sphere
    ) {
      const rb = v3.diff(PB, coll2.getTranslation());
      const ra = v3.diff(PA, coll1.getTranslation());
  
      const raLocal = m3.transformPoint(coll1.getRmatrixInverse(), ra);
      const rbLocal = m3.transformPoint(coll2.getRmatrixInverse(), rb);
      const i: vec3 = [n[1] + n[2], n[2] - n[0], -n[0] - n[1]];
  
      const j = v3.cross(v3.scale(n, -1), i);
      return [
        {
          ra,
          rb,
          n,
          PA,
          PB,
          positionError,
          i,
          j,
          raLocal,
          rbLocal,
        },
      ];
    }
  */
    const nReverse = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(n, -1);
    contactFace1 = coll1.getClosestFaceByNormal(nReverse);
    contactFace2 = coll2.getClosestFaceByNormal(n);
    const plane = [[0, 0, 0], n];
    //const plane: [vec3, vec3] = [v3.scale(v3.sum(PA, PB), 0.5), n];
    const projections1 = contactFace1.vertices.map((p) => pointOnPlaneProjection([0, 0, 0], n, p));
    const projections2 = contactFace2.vertices.map((p) => pointOnPlaneProjection([0, 0, 0], n, p));
    const origin = plane[0];
    const i = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.normalize([n[1] + n[2], n[2] - n[0], -n[0] - n[1]]);
    const j = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.cross(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(n, -1), i);
    let _2d1 = projections1.map((p) => get2DcoordsOnPlane(i, j, romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.diff(p, origin)));
    let _2d2 = projections2.map((p) => get2DcoordsOnPlane(i, j, romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.diff(p, origin)));
    if ((0,_clipping__WEBPACK_IMPORTED_MODULE_3__.isInClockwise)(_2d1))
        _2d1 = _2d1.map((_, i) => _2d1.at(-i));
    if ((0,_clipping__WEBPACK_IMPORTED_MODULE_3__.isInClockwise)(_2d2))
        _2d2 = _2d2.map((_, i) => _2d2.at(-i));
    let clipped = (0,_clipping__WEBPACK_IMPORTED_MODULE_3__.clipFaceVsFace)(_2d1, _2d2);
    if (clipped.length === 0)
        clipped = (0,_clipping__WEBPACK_IMPORTED_MODULE_3__.clipFaceVsFace)(_2d2, _2d1);
    const _3d = clipped.map((p) => romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(origin, romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(i, p[0]), romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(j, p[1]))));
    const features = [];
    _3d.forEach((point) => {
        const PA = rayVsPlaneIntersec([contactFace1.vertices[0], contactFace1.normal], point, n);
        if (!isPointBehindPlane(contactFace2.vertices[0], contactFace2.normal, PA, -1))
            return;
        const PB = rayVsPlaneIntersec([contactFace2.vertices[0], contactFace2.normal], point, n);
        if (!isPointBehindPlane(contactFace1.vertices[0], contactFace1.normal, PB, -1))
            return;
        const rb = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.diff(PB, coll2.getTranslation());
        const ra = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.diff(PA, coll1.getTranslation());
        const positionError = -romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.dot(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.diff(PB, PA), n);
        const raLocal = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(coll1.getRmatrixInverse(), ra);
        const rbLocal = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(coll2.getRmatrixInverse(), rb);
        features.push({
            ra,
            rb,
            n,
            PA,
            PB,
            positionError,
            i,
            j,
            raLocal,
            rbLocal,
        });
    });
    /*
      if (features.length === 0) {
         
        //  drawPolys(_2d1, _2d2)
         // throw 1
          const rb = v3.diff(PB, coll2.getTranslation());
          const ra =  v3.diff(PA, coll1.getTranslation());
          const raLocal = m3.transformPoint(coll1.getRmatrixInverse(), ra);
          const rbLocal = m3.transformPoint(coll2.getRmatrixInverse(), rb);
          features.push(
            {
              ra, rb, n, PA, PB, positionError, i, j, raLocal, rbLocal
            }
          );
        }
        */
    return features;
}


/***/ }),

/***/ "./src/physics/gjk.ts":
/*!****************************!*\
  !*** ./src/physics/gjk.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EPA": () => (/* binding */ EPA),
/* harmony export */   "clipPointsBehindPlane": () => (/* binding */ clipPointsBehindPlane),
/* harmony export */   "get2DcoordsOnPlane": () => (/* binding */ get2DcoordsOnPlane),
/* harmony export */   "gjk": () => (/* binding */ gjk),
/* harmony export */   "pointOnPlaneProjection": () => (/* binding */ pointOnPlaneProjection),
/* harmony export */   "rayVsPlaneIntersec": () => (/* binding */ rayVsPlaneIntersec)
/* harmony export */ });
/* harmony import */ var romanpppmath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! romanpppmath */ "./node_modules/romanpppmath/lib/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config */ "./src/physics/config.ts");

const { dot, cross, normalize, sum, diff, scale, isNull, norm } = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3;

const { CLIP_BIAS, GJK_MAX_ITERATIONS_NUM, EPA_BIAS } = _config__WEBPACK_IMPORTED_MODULE_1__["default"];
const rayVsPlaneIntersec = (plane, point, direction) => {
    const [origin, normal] = plane;
    const _dot = dot(normal, direction);
    const fromPointToOrigin = diff(point, origin);
    const fac = dot(fromPointToOrigin, normal) / _dot;
    return diff(point, scale(direction, fac));
};
const isPointBehindPlane = (plane, point, sign = 1) => {
    const [origin, normal] = plane;
    let _d = dot(normal, diff(point, origin)) * sign;
    return _d > 0 - CLIP_BIAS;
};
const pointOnPlaneProjection = (plane, point) => {
    const [origin, normal] = plane;
    const fromPointToOrigin = diff(point, origin);
    const projAlongNormal = dot(normal, fromPointToOrigin);
    return diff(point, scale(normal, projAlongNormal));
};
const clipPointsBehindPlane = (plane, points, sign = 1) => {
    const [origin, normal] = plane;
    return points.filter((point) => dot(normal, diff(point, origin)) * sign + CLIP_BIAS > 0);
};
const get2DcoordsOnPlane = (i, j, point) => {
    return [dot(i, point), dot(j, point)];
};
function update_simplex3(props) {
    const n = cross(diff(props.b, props.a), diff(props.c, props.a));
    const AO = scale(props.a, -1);
    props.simp_dim = 2;
    if (dot(cross(diff(props.b, props.a), n), AO) > 0) {
        props.c = props.a;
        props.search_dir = cross(cross(diff(props.b, props.a), AO), diff(props.b, props.a));
        return;
    }
    if (dot(cross(n, diff(props.c, props.a)), AO) > 0) {
        props.b = props.a;
        props.search_dir = cross(cross(diff(props.c, props.a), AO), diff(props.c, props.a));
        return;
    }
    props.simp_dim = 3;
    if (dot(n, AO) > 0) {
        props.d = props.c;
        props.c = props.b;
        props.b = props.a;
        props.search_dir = n;
        return;
    }
    props.d = props.b;
    props.b = props.a;
    props.search_dir = scale(n, -1);
    return;
}
function update_simplex4(props) {
    const ABC = cross(diff(props.b, props.a), diff(props.c, props.a));
    const ACD = cross(diff(props.c, props.a), diff(props.d, props.a));
    const ADB = cross(diff(props.d, props.a), diff(props.b, props.a));
    const AO = scale(props.a, -1);
    props.simp_dim = 3;
    if (dot(ABC, AO) > 0) {
        props.d = props.c;
        props.c = props.b;
        props.b = props.a;
        props.search_dir = ABC;
        return false;
    }
    if (dot(ACD, AO) > 0) {
        props.b = props.a;
        props.search_dir = ACD;
        return false;
    }
    if (dot(ADB, AO) > 0) {
        props.c = props.d;
        props.d = props.b;
        props.b = props.a;
        props.search_dir = ADB;
        return false;
    }
    return true;
}
function gjk(coll1, coll2) {
    const props = {
        a: [0, 0, 0],
        b: [0, 0, 0],
        c: [0, 0, 0],
        d: [0, 0, 0],
        search_dir: [0, 0, 0],
        simp_dim: 0,
    };
    const originsMap = new Map();
    let mtv = [0, 0, 0];
    props.search_dir = diff(coll1.getTranslation(), coll2.getTranslation());
    const c_origin1 = coll1.support(scale(props.search_dir, -1));
    const c_origin2 = coll2.support(props.search_dir);
    props.c = diff(c_origin2, c_origin1);
    originsMap.set(props.c, [c_origin1, c_origin2]);
    props.search_dir = scale(props.c, -1);
    const b_origin1 = coll1.support(scale(props.search_dir, -1));
    const b_origin2 = coll2.support(props.search_dir);
    props.b = diff(b_origin2, b_origin1);
    originsMap.set(props.b, [b_origin1, b_origin2]);
    if (dot(props.b, props.search_dir) < 0) {
        return null;
    }
    props.search_dir = cross(cross(diff(props.c, props.b), scale(props.b, -1)), diff(props.c, props.b));
    if (isNull(props.search_dir)) {
        props.search_dir = cross(diff(props.c, props.b), [1, 0, 0]);
        if (isNull(props.search_dir)) {
            props.search_dir = cross(diff(props.c, props.b), [0, 0, -1]);
        }
    }
    props.simp_dim = 2;
    for (let i = 0; i < GJK_MAX_ITERATIONS_NUM; ++i) {
        const a_origin1 = coll1.support(scale(props.search_dir, -1));
        const a_origin2 = coll2.support(props.search_dir);
        props.a = diff(a_origin2, a_origin1);
        originsMap.set(props.a, [a_origin1, a_origin2]);
        if (dot(props.a, props.search_dir) < 0)
            return null;
        props.simp_dim++;
        if (props.simp_dim === 3) {
            update_simplex3(props);
        }
        else if (update_simplex4(props)) {
            return Object.assign(Object.assign({}, props), { coll1, coll2, originsMap }); //EPA(props.a, props.b, props.c, props.d, originsMap, coll1, coll2);
        }
    }
    return null;
}
const baricentric = (face, point) => {
    let a11 = face[0][0];
    let a12 = face[1][0];
    let a13 = face[2][0];
    let b1 = point[0];
    let a21 = face[0][1];
    let a22 = face[1][1];
    let a23 = face[2][1];
    let b2 = point[1];
    let a31 = face[0][2];
    let a32 = face[1][2];
    let a33 = face[2][2];
    let b3 = point[2];
    const d = a11 * a22 * a33 +
        a21 * a32 * a13 +
        a12 * a23 * a31 -
        a13 * a22 * a31 -
        a21 * a12 * a33 -
        a32 * a23 * a11;
    const d1 = b1 * a22 * a33 +
        b2 * a32 * a13 +
        a12 * a23 * b3 -
        a13 * a22 * b3 -
        b2 * a12 * a33 -
        a32 * a23 * b1;
    const d2 = a11 * b2 * a33 +
        a21 * b3 * a13 +
        b1 * a23 * a31 -
        a13 * b2 * a31 -
        a11 * b3 * a23 -
        a21 * b1 * a33;
    const d3 = a11 * a22 * b3 +
        a21 * a32 * b1 +
        a12 * b2 * a31 -
        b1 * a22 * a31 -
        a21 * a12 * b3 -
        b2 * a32 * a11;
    return [d1 / d, d2 / d, d3 / d];
};
const originToFaceProj = (face) => {
    const normal = face[3];
    const point = face[0];
    const c = -normal[0] * point[0] - normal[1] * point[1] - normal[2] * point[2];
    const t = -c /
        (normal[0] * normal[0] + normal[1] * normal[1] + normal[2] * normal[2]);
    return [t * normal[0], t * normal[1], t * normal[2]];
};
const MAX_NUM_FACES = 64;
const MAX_NUM_LOOSE_EDGES = 32;
const EPA_MAX_NUM_ITER = 64;
const EPA = (a, b, c, d, originsMap, coll1, coll2) => {
    const faces = [];
    for (let i = 0; i < 4; i++) {
        faces[i] = [];
    }
    faces[0][0] = a;
    faces[0][1] = b;
    faces[0][2] = c;
    faces[0][3] = normalize(cross(diff(b, a), diff(c, a)));
    faces[1][0] = a;
    faces[1][1] = c;
    faces[1][2] = d;
    faces[1][3] = normalize(cross(diff(c, a), diff(d, a)));
    faces[2][0] = a;
    faces[2][1] = d;
    faces[2][2] = b;
    faces[2][3] = normalize(cross(diff(d, a), diff(b, a)));
    faces[3][0] = b;
    faces[3][1] = d;
    faces[3][2] = c;
    faces[3][3] = normalize(cross(diff(d, b), diff(c, b)));
    let num_faces = 4;
    let closest_face = null;
    let search_dir;
    let p;
    for (let iteration = 0; iteration < EPA_MAX_NUM_ITER; ++iteration) {
        let min_dist = dot(faces[0][0], faces[0][3]);
        closest_face = 0;
        for (let i = 0; i < num_faces; ++i) {
            let dist = dot(faces[i][0], faces[i][3]);
            if (dist < min_dist) {
                min_dist = dist;
                closest_face = i;
            }
        }
        search_dir = faces[closest_face][3];
        const p_origin1 = coll1.support(scale(search_dir, -1));
        const p_origin2 = coll2.support(search_dir);
        p = diff(p_origin2, p_origin1);
        originsMap.set(p, [p_origin1, p_origin2]);
        if (dot(p, search_dir) - min_dist < EPA_BIAS) {
            const face = faces[closest_face];
            const point = originToFaceProj(face);
            const [Aa, Ba] = originsMap.get(face[0]);
            //const Aa = face[0].oa
            //const Ba = face[0].ob
            const [Ab, Bb] = originsMap.get(face[1]);
            //const Ab = face[1].oa
            //const Bb = face[1].ob
            const [Ac, Bc] = originsMap.get(face[2]);
            //const Ac = face[2].oa
            //const Bc = face[2].ob
            const result = baricentric(face, point);
            if (isNaN(result[0] + result[1] + result[2])) {
                return null;
            }
            let PA = sum(sum(scale(Aa, result[0]), scale(Ab, result[1])), scale(Ac, result[2]));
            //Aa.multiply(result[0]).add(Ab.multiply(result[1])).add(Ac.multiply(result[2]))
            let PB = sum(sum(scale(Ba, result[0]), scale(Bb, result[1])), scale(Bc, result[2]));
            //Ba.multiply(result[0]).add(Bb.multiply(result[1])).add(Bc.multiply(result[2]))
            //const ra = PA.substract(coll1.pos)
            const n = scale(face[3], -1); //
            //const n = normalize(scale(face[3], -dot(p, search_dir)));
            //if (norm(n) < 0.01) return null;
            const positionError = -dot(diff(PB, PA), n);
            return { PA, PB, n, positionError };
        }
        const loose_edges = [];
        let num_loose_edges = 0;
        for (let i = 0; i < num_faces; ++i) {
            if (dot(faces[i][3], diff(p, faces[i][0])) > 0) {
                for (let j = 0; j < 3; j++) {
                    let current_edge = [faces[i][j], faces[i][(j + 1) % 3]];
                    let found_edge = false;
                    for (let k = 0; k < num_loose_edges; k++) {
                        if (loose_edges[k][1] === current_edge[0] &&
                            loose_edges[k][0] === current_edge[1]) {
                            loose_edges[k][0] = loose_edges[num_loose_edges - 1][0];
                            loose_edges[k][1] = loose_edges[num_loose_edges - 1][1];
                            num_loose_edges--;
                            found_edge = true;
                            k = num_loose_edges;
                        }
                    }
                    if (!found_edge) {
                        if (num_loose_edges >= MAX_NUM_LOOSE_EDGES)
                            break;
                        loose_edges[num_loose_edges] = [];
                        loose_edges[num_loose_edges][0] = current_edge[0];
                        loose_edges[num_loose_edges][1] = current_edge[1];
                        num_loose_edges++;
                    }
                }
                faces[i][0] = faces[num_faces - 1][0];
                faces[i][1] = faces[num_faces - 1][1];
                faces[i][2] = faces[num_faces - 1][2];
                faces[i][3] = faces[num_faces - 1][3];
                num_faces--;
                i--;
            }
        }
        for (let i = 0; i < num_loose_edges; i++) {
            if (num_faces >= MAX_NUM_FACES)
                break;
            faces[num_faces] = [];
            faces[num_faces][0] = loose_edges[i][0];
            faces[num_faces][1] = loose_edges[i][1];
            faces[num_faces][2] = p;
            faces[num_faces][3] = normalize(cross(diff(loose_edges[i][0], loose_edges[i][1]), diff(loose_edges[i][0], p)));
            if (dot(faces[num_faces][0], faces[num_faces][3]) + 0.01 < 0) {
                const temp = faces[num_faces][0];
                faces[num_faces][0] = faces[num_faces][1];
                faces[num_faces][1] = temp;
                faces[num_faces][3] = scale(faces[num_faces][3], -1);
            }
            num_faces++;
        }
    }
    return null;
};
/*
const getContacts = (
  coll1: ICollider,
  coll2: ICollider
): {
  raLocal: vec3;
  rbLocal: vec3;
  ra: vec3;
  rb: vec3;
  PA: vec3;
  PB: vec3;
  n: vec3;
  positionError: number;
  i: vec3;
  j: vec3;
}[] => {
  const contactData = gjk(coll1, coll2);
  if (!contactData) return [];

  const { PA, PB, n, positionError } = contactData;


  if (coll1.getType() === "sphere" || coll2.getType() === "sphere") {
    const rb = diff(PB, coll2.getTranslation());
    const ra = diff(PA, coll1.getTranslation());

    const raLocal = m3.transformPoint(coll1.getRmatrixInverse(), ra);
    const rbLocal = m3.transformPoint(coll2.getRmatrixInverse(), rb);
    const i: vec3 = [n[1] + n[2], n[2] - n[0], -n[0] - n[1]];

    const j = cross(scale(n, -1), i);
    return [
      {
        ra, rb, n, PA, PB, positionError, i, j, raLocal, rbLocal
      }
    ];
  }
  
  const nReverse = scale(n, -1);

  const contactFace1 = coll1.getClosestFaceByNormal(nReverse);
  const contactFace2 = coll2.getClosestFaceByNormal(n);

  const plane: plane = [scale(sum(PA, PB), 0.5), n];
  const projections1 = contactFace1.vertices.map((p) =>
    pointOnPlaneProjection(plane, p)
  );
  const projections2 = contactFace2.vertices.map((p) =>
    pointOnPlaneProjection(plane, p)
  );

  const origin = plane[0];
  const i = normalize([n[1] + n[2], n[2] - n[0], -n[0] - n[1]]);

  const j = cross(scale(n, -1), i);

  let _2d1 = projections1.map((p) => get2DcoordsOnPlane(i, j, diff(p, origin)));
  let _2d2 = projections2.map((p) => get2DcoordsOnPlane(i, j, diff(p, origin)));

  const dir1 = isInClockwise(_2d1);
  const dir2 = isInClockwise(_2d2);
  if (dir1 < 0) _2d1 = _2d1.map((_, i) => _2d1.at(-i));
  if (dir2 < 0) _2d2 = _2d2.map((_, i) => _2d2.at(-i));

  const clipped = clipFaceVsFace(_2d1, _2d2);

  const _3d = clipped.map((p) =>
    sum(origin, sum(scale(i, p[0]), scale(j, p[1])))
  );

  const features = [];
  _3d.forEach((point) => {
    const PA = rayVsPlaneIntersec(
      [contactFace1.vertices[0], contactFace1.normal],
      point,
      n
    );
    if (!isPointBehindPlane(plane, PA, 1)) return;
    const PB = rayVsPlaneIntersec(
      [contactFace2.vertices[0], contactFace2.normal],
      point,
      n
    );
    if (!isPointBehindPlane(plane, PB, -1)) return;

    const rb = diff(PB, coll2.getTranslation());
    const ra = diff(PA, coll1.getTranslation());
    const positionError = -dot(diff(PB, PA), n);
    const raLocal = m3.transformPoint(coll1.getRmatrixInverse(), ra);
    const rbLocal = m3.transformPoint(coll2.getRmatrixInverse(), rb);

    features.push(
      {
        ra, rb, n, PA, PB, positionError, i, j, raLocal, rbLocal
      }
    );
  });

  if (features.length === 0) {
    console.log(_2d1, _2d2, clipped )
    throw 1
    const rb = diff(PB, coll2.getTranslation());
    const ra = diff(PA, coll1.getTranslation());
    const raLocal = m3.transformPoint(coll1.getRmatrixInverse(), ra);
    const rbLocal = m3.transformPoint(coll2.getRmatrixInverse(), rb);
    features.push(
      {
        ra, rb, n, PA, PB, positionError, i, j, raLocal, rbLocal
      }
    );
  }

  return features;
};
*/



/***/ }),

/***/ "./src/misc/FreeCam.js":
/*!*****************************!*\
  !*** ./src/misc/FreeCam.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FreeCam)
/* harmony export */ });
/* harmony import */ var romanpppmath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! romanpppmath */ "./node_modules/romanpppmath/lib/index.js");



const KEYS = {
    'w' : 'moveForward',
    's' : 'moveBackward',
    'a' : 'moveLeft',
    'd' : 'moveRight',
    ' ' : 'moveUp'
}

class FreeCam {
  constructor() {
    this.keyInput = null;
    this.mouseInput = null;
    this.rotationX = 0;
    this.rotationY = 0;
    this.deltaRY = 0;
    this.camPos = [0, 0, 10];
    this.camRot = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.identity();
  }
  listenMouse(mouseInput) {
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
  listenKeyboard(keyInput) {
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

    this.camMatrix = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m4.translation(...this.camPos);
    this.camMatrix = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m4.xRotate(
      romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m4.yRotate(this.camMatrix, this.rotationY),
      this.rotationX
    );
  }
  move(dir) {
    const m = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m4.m4Tom3(this.camMatrix);
    this.camPos = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(this.camPos, romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(m, dir));
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


/***/ }),

/***/ "./src/misc/keyInput.js":
/*!******************************!*\
  !*** ./src/misc/keyInput.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ KeyInput)
/* harmony export */ });
/* harmony import */ var _physics_EventEmitter_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../physics/EventEmitter.ts */ "./src/physics/EventEmitter.ts");


class KeyInput extends _physics_EventEmitter_ts__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
    this.unsubsicribe = () => {
      document.removeEventListener("keydown", logDown);
      document.removeEventListener("keyup", logUp);
    };
  }
}


/***/ }),

/***/ "./src/misc/mouseInput.js":
/*!********************************!*\
  !*** ./src/misc/mouseInput.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MouseInput)
/* harmony export */ });
/* harmony import */ var _physics_EventEmitter_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../physics/EventEmitter.ts */ "./src/physics/EventEmitter.ts");


class MouseInput extends _physics_EventEmitter_ts__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(element = document) {
    super();
    this.lastX = 0;
    this.lastY = 0;
    this.enable = false;
    this.moves = []
    this.element = element
  }
  logMove({ offsetX, offsetY }) {
    const deltaX = offsetX - this.lastX;
    this.lastX = offsetX;
    const deltaY = offsetY - this.lastY;
    this.lastY = offsetY;
    this.emit("move", [deltaX, deltaY]);
    this.moves.push([deltaX, deltaY])
  }
  listen() {
    const logMove = this.logMove.bind(this);
    const _ = function (e) {
      if (this.enable) logMove(e);
    }.bind(this);
    const down = function ({ offsetX, offsetY }) {
      this.lastX = offsetX;
      this.lastY = offsetY;
      this.enable = true;
    }.bind(this);
    const up = function () {
      this.enable = false;
    }.bind(this);

    this.element.addEventListener("mousemove", _);
    this.element.addEventListener("mousedown", down);
    this.element.addEventListener("mouseup", up);
    this.unsubscribe = () => {
      this.element.removeEventListener("mousemove", _);
      this.element.removeEventListener("mousedown", down);
      this.element.removeEventListener("mouseup", up);
    };
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************************!*\
  !*** ./demo/voxels/voxels.ts ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var romanpppmath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! romanpppmath */ "./node_modules/romanpppmath/lib/index.js");
/* harmony import */ var _terrain_VoxelWorld__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./terrain/VoxelWorld */ "./demo/voxels/terrain/VoxelWorld.ts");
/* harmony import */ var _src_physics_RigidBody__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../src/physics/RigidBody */ "./src/physics/RigidBody.ts");
/* harmony import */ var _src_physics_Collider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../src/physics/Collider */ "./src/physics/Collider.ts");
/* harmony import */ var _src_physics_Debug__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../src/physics/Debug */ "./src/physics/Debug.ts");
/* harmony import */ var _VoxelWorldPrimitive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./VoxelWorldPrimitive */ "./demo/voxels/VoxelWorldPrimitive.js");
/* harmony import */ var romanpppgraphics__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! romanpppgraphics */ "./node_modules/romanpppgraphics/lib/index.js");
/* harmony import */ var _textureShader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./textureShader */ "./demo/voxels/textureShader.ts");
/* harmony import */ var _src_misc_FreeCam__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../src/misc/FreeCam */ "./src/misc/FreeCam.js");
/* harmony import */ var _src_misc_keyInput__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../src/misc/keyInput */ "./src/misc/keyInput.js");
/* harmony import */ var _src_misc_mouseInput__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../src/misc/mouseInput */ "./src/misc/mouseInput.js");











const context = new romanpppgraphics__WEBPACK_IMPORTED_MODULE_6__.GLcontextWrapper("canvas");
const texture1 = new context.TextureInfo();
texture1.createTextureFromURL("resources/atlas.png");
context.resizeCanvasToDisplaySize();
const drawer = new context.Drawer();
drawer.projectionMatrix = context.Drawer.create3dProjectionMatrix(1, 2000, context.gl.canvas.width, context.gl.canvas.height);
const globalUniforms = {
    u_lightWorldPosition: [30, 50, 30],
    u_ambientLight: [1, 1, 0.3, 0.11],
    u_reverseLightDirection: [1, 0, 0],
    u_shininess: 300,
};
const textureProgramInfo = new context.ProgramInfo(_textureShader__WEBPACK_IMPORTED_MODULE_7__["default"].vert, _textureShader__WEBPACK_IMPORTED_MODULE_7__["default"].frag);
const pointLightProgramInfo = new context.ProgramInfo(romanpppgraphics__WEBPACK_IMPORTED_MODULE_6__.pointLightShaders.vert, romanpppgraphics__WEBPACK_IMPORTED_MODULE_6__.pointLightShaders.frag);
pointLightProgramInfo.compileShaders().createUniformSetters();
const cube = context.PrimitiveRenderer.fromArrayData((0,romanpppgraphics__WEBPACK_IMPORTED_MODULE_6__.createBox)(1, 1, 1));
cube
    .createVAO()
    .setDrawer(drawer)
    .setProgramInfo(pointLightProgramInfo)
    .setMode(4);
textureProgramInfo.compileShaders().createUniformSetters();
const sim = new _terrain_VoxelWorld__WEBPACK_IMPORTED_MODULE_1__["default"]();
const cellSize = 32;
const tileSize = 16;
const tileTextureWidth = 256;
const tileTextureHeight = 64;
const world = new _VoxelWorldPrimitive__WEBPACK_IMPORTED_MODULE_5__["default"]({
    cellSize,
    tileSize,
    tileTextureWidth,
    tileTextureHeight,
});
const cellMeshes = {};
const updateCellMesh = (x, y, z) => {
    const cellX = Math.floor(x / cellSize);
    const cellY = Math.floor(y / cellSize);
    const cellZ = Math.floor(z / cellSize);
    const cellId = world.computeCellId(x, y, z);
    const mesh = cellMeshes[cellId];
    if (!mesh) {
        cellMeshes[cellId] = context.PrimitiveRenderer.fromArrayData(world.generateGeometryDataForCell(cellX, cellY, cellZ));
        cellMeshes[cellId].createVAO()
            .setDrawer(drawer)
            .setProgramInfo(textureProgramInfo)
            .setMode(4);
        return;
    }
    const arrayData = world.generateGeometryDataForCell(cellX, cellY, cellZ);
    mesh.bufferData('POSITION', arrayData.attributes.POSITION.data);
    mesh.bufferData('TEXCOORD_0', arrayData.attributes.TEXCOORD_0.data);
    mesh.bufferData('NORMAL', arrayData.attributes.NORMAL.data);
    mesh.setIndices(arrayData.indices);
    return;
};
for (let y = 0; y < cellSize; ++y) {
    for (let z = -cellSize; z < cellSize; ++z) {
        for (let x = -cellSize; x < cellSize; ++x) {
            const height = (Math.sin((x / cellSize) * Math.PI * 2) +
                Math.sin((z / cellSize) * Math.PI * 3)) *
                (cellSize / 6) +
                cellSize / 2;
            if (y < height) {
                world.setVoxel(x, y, z, 1);
                const phs = new _src_physics_RigidBody__WEBPACK_IMPORTED_MODULE_2__.TerrainSegment(new _src_physics_Collider__WEBPACK_IMPORTED_MODULE_3__.Box(1, 1, 1));
                sim.setBlock(x, y, z, phs);
            }
        }
    }
}
for (const cellId in world.cells) {
    const [x, y, z] = cellId.split(',').map(i => parseInt(i));
    updateCellMesh(x, y, z);
}
let objectsToDraw = [];
const e = [];
console.log(e);
for (let i = 0; i < 100; i++) {
    const box = {
        physics: new _src_physics_RigidBody__WEBPACK_IMPORTED_MODULE_2__.RigidBody(new _src_physics_Collider__WEBPACK_IMPORTED_MODULE_3__.Box(1, 1, 1)),
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
console.log(cellMeshes);
const mouseInput = new _src_misc_mouseInput__WEBPACK_IMPORTED_MODULE_10__["default"](document.getElementById("canvas"));
mouseInput.listen();
const keyInput = new _src_misc_keyInput__WEBPACK_IMPORTED_MODULE_9__["default"]();
keyInput.listen();
const player = new _src_misc_FreeCam__WEBPACK_IMPORTED_MODULE_8__["default"]();
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
    _src_physics_Debug__WEBPACK_IMPORTED_MODULE_4__["default"].data.FPS = Math.floor(Number((1 / delta) * 1000));
    _src_physics_Debug__WEBPACK_IMPORTED_MODULE_4__["default"].data.RUNTIME = (curentTime - startTime) / 1000;
    lastCall = curentTime;
    context.gl.clear(context.gl.COLOR_BUFFER_BIT | context.gl.DEPTH_BUFFER_BIT);
    context.gl.enable(context.gl.CULL_FACE);
    context.gl.enable(context.gl.DEPTH_TEST);
    const cameraMatrix = player.camMatrix;
    const { translation } = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m4.decompose(cameraMatrix);
    const u_viewWorldPosition = translation;
    for (const cellId in cellMeshes) {
        cellMeshes[cellId].draw(Object.assign(Object.assign({}, globalUniforms), { u_matrix: romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m4.identity(), u_color: [0, 0, 0, 1], u_viewWorldPosition }), cameraMatrix);
    }
    objectsToDraw.forEach((obj) => {
        obj.sprite.draw(Object.assign(Object.assign(Object.assign({}, globalUniforms), { u_matrix: obj.physics.getCollider().getM4(), u_viewWorldPosition }), obj.uniforms), cameraMatrix);
    });
    context.gl.viewport(0, 0, context.gl.canvas.width, context.gl.canvas.height);
    requestAnimationFrame(loop);
};
loop();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixLQUFLO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsY0FBYztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ3VCOzs7Ozs7Ozs7Ozs7Ozs7QUMvR3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZnZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDNlQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1RnJNO0FBQzFDO0FBQ21DO0FBQ2xE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QTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsMkJBQTJCLGNBQWM7QUFDekMsMEJBQTBCLGNBQWM7QUFDeEMsS0FBSztBQUNMO0FBQ0EsaUVBQWUsRUFBRSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDMUlJO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxzQkFBc0IscURBQVksQ0FBQyxnREFBTztBQUMxQyxzQkFBc0IscURBQVksQ0FBQyxpREFBUTtBQUMzQyxzQkFBc0IscURBQVksQ0FBQyxpREFBUTtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLDJCQUEyQixjQUFjO0FBQ3pDLDBCQUEwQixjQUFj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QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGlDQUFpQztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksZUFBZTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxlQUFlO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksaUNBQWlDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSwwREFBMEQ7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksaUNBQWlDO0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsT0FBTztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxRQUFR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TTtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNEJBQTRCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsWUFBWSwwQkFBMEIsR0FBRztBQUMxRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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RUFBa0U7QUFDM0osS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9kZW1vL3ZveGVscy9Wb3hlbFdvcmxkUHJpbWl0aXZlLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL2NvbXBvbmVudHMvQnVmZmVyQXR0cmlidXRlLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL2NvbXBvbmVudHMvRHJhd2VyLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL2NvbXBvbmVudHMvR0xXcmFwcGVyLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL2NvbXBvbmVudHMvR2x0ZlV0aWxzLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL2NvbXBvbmVudHMvTWVzaFJlbmRlcmVyLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL2NvbXBvbmVudHMvTW9kZWwuanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBncmFwaGljcy9saWIvY29tcG9uZW50cy9QcmltaXRpdmVSZW5kZXJlci5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcGdyYXBoaWNzL2xpYi9jb21wb25lbnRzL1ByaW1pdGl2ZXMuanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBncmFwaGljcy9saWIvY29tcG9uZW50cy9Qcm9ncmFtSW5mby5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcGdyYXBoaWNzL2xpYi9jb21wb25lbnRzL1RleHR1cmVJbmZvLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL2NvbXBvbmVudHMvYXR0cmliVHlwZVByb3BzLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL2NvbXBvbmVudHMvZW51bXMuanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBncmFwaGljcy9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBncmFwaGljcy9saWIvcmVuZGVyL3NoYWRlcnMvZGVmYXVsdC9mcmFnLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL3JlbmRlci9zaGFkZXJzL2RlZmF1bHQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBncmFwaGljcy9saWIvcmVuZGVyL3NoYWRlcnMvZGVmYXVsdC92ZXJ0LmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL3JlbmRlci9zaGFkZXJzL2luZGV4LmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL3JlbmRlci9zaGFkZXJzL3BvaW50TGlnaHQvZnJhZy5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcGdyYXBoaWNzL2xpYi9yZW5kZXIvc2hhZGVycy9wb2ludExpZ2h0L2luZGV4LmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL3JlbmRlci9zaGFkZXJzL3BvaW50TGlnaHQvdmVydC5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcG1hdGgvbGliL09jdHJlZS5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcG1hdGgvbGliL2FhYmIuanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBtYXRoL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcG1hdGgvbGliL20zLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwbWF0aC9saWIvbTQuanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBtYXRoL2xpYi92My5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL2RlbW8vdm94ZWxzL3RlcnJhaW4vVm94ZWxXb3JsZC50cyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL2RlbW8vdm94ZWxzL3RleHR1cmVTaGFkZXIudHMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9zcmMvcGh5c2ljcy9BQUJCLnRzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL3BoeXNpY3MvQ29sbGlkZXIudHMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9zcmMvcGh5c2ljcy9Db25zdHJhaW50cy50cyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL3NyYy9waHlzaWNzL0NvbnRhY3RNYW5pZm9sZC50cyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL3NyYy9waHlzaWNzL0RlYnVnLnRzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL3BoeXNpY3MvRXF1YXRpb25zLnRzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL3BoeXNpY3MvRXZlbnRFbWl0dGVyLnRzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL3BoeXNpY3MvSGFzaEdyaWQudHMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9zcmMvcGh5c2ljcy9SaWdpZEJvZHkudHMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9zcmMvcGh5c2ljcy9TaW11bGF0aW9uLnRzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL3BoeXNpY3MvU3lzdGVtLnRzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL3BoeXNpY3MvVHJlZS50cyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL3NyYy9waHlzaWNzL2NsaXBwaW5nLnRzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL3BoeXNpY3MvY29uZmlnLnRzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL3BoeXNpY3MvZ2V0Q29sbGlzaW9uRmVhdHVyZXMudHMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9zcmMvcGh5c2ljcy9namsudHMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9zcmMvbWlzYy9GcmVlQ2FtLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL21pc2Mva2V5SW5wdXQuanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9zcmMvbWlzYy9tb3VzZUlucHV0LmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3JvbWFucHBwcGhzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3JvbWFucHBwcGhzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9kZW1vL3ZveGVscy92b3hlbHMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbW9kID0gKG4sIG0pID0+ICgobiAlIG0pICsgbSkgJSBtO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVm94ZWxXb3JsZCB7XHJcbiAgc3RhdGljIGZhY2VzID1bXHJcbiAgICB7IC8vIGxlZnRcclxuICAgICAgdXZSb3c6IDAsXHJcbiAgICAgIGRpcjogWyAtMSwgIDAsICAwLCBdLFxyXG4gICAgICBjb3JuZXJzOiBbXHJcbiAgICAgICAgeyBwb3M6IFsgMCwgMSwgMCBdLCB1djogWyAwLCAxIF0sIH0sXHJcbiAgICAgICAgeyBwb3M6IFsgMCwgMCwgMCBdLCB1djogWyAwLCAwIF0sIH0sXHJcbiAgICAgICAgeyBwb3M6IFsgMCwgMSwgMSBdLCB1djogWyAxLCAxIF0sIH0sXHJcbiAgICAgICAgeyBwb3M6IFsgMCwgMCwgMSBdLCB1djogWyAxLCAwIF0sIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAgeyAvLyByaWdodFxyXG4gICAgICB1dlJvdzogMCxcclxuICAgICAgZGlyOiBbICAxLCAgMCwgIDAsIF0sXHJcbiAgICAgIGNvcm5lcnM6IFtcclxuICAgICAgICB7IHBvczogWyAxLCAxLCAxIF0sIHV2OiBbIDAsIDEgXSwgfSxcclxuICAgICAgICB7IHBvczogWyAxLCAwLCAxIF0sIHV2OiBbIDAsIDAgXSwgfSxcclxuICAgICAgICB7IHBvczogWyAxLCAxLCAwIF0sIHV2OiBbIDEsIDEgXSwgfSxcclxuICAgICAgICB7IHBvczogWyAxLCAwLCAwIF0sIHV2OiBbIDEsIDAgXSwgfSxcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgICB7IC8vIGJvdHRvbVxyXG4gICAgICB1dlJvdzogMSxcclxuICAgICAgZGlyOiBbICAwLCAtMSwgIDAsIF0sXHJcbiAgICAgIGNvcm5lcnM6IFtcclxuICAgICAgICB7IHBvczogWyAxLCAwLCAxIF0sIHV2OiBbIDEsIDAgXSwgfSxcclxuICAgICAgICB7IHBvczogWyAwLCAwLCAxIF0sIHV2OiBbIDAsIDAgXSwgfSxcclxuICAgICAgICB7IHBvczogWyAxLCAwLCAwIF0sIHV2OiBbIDEsIDEgXSwgfSxcclxuICAgICAgICB7IHBvczogWyAwLCAwLCAwIF0sIHV2OiBbIDAsIDEgXSwgfSxcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgICB7IC8vIHRvcFxyXG4gICAgICB1dlJvdzogMixcclxuICAgICAgZGlyOiBbICAwLCAgMSwgIDAsIF0sXHJcbiAgICAgIGNvcm5lcnM6IFtcclxuICAgICAgICB7IHBvczogWyAwLCAxLCAxIF0sIHV2OiBbIDEsIDEgXSwgfSxcclxuICAgICAgICB7IHBvczogWyAxLCAxLCAxIF0sIHV2OiBbIDAsIDEgXSwgfSxcclxuICAgICAgICB7IHBvczogWyAwLCAxLCAwIF0sIHV2OiBbIDEsIDAgXSwgfSxcclxuICAgICAgICB7IHBvczogWyAxLCAxLCAwIF0sIHV2OiBbIDAsIDAgXSwgfSxcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgICB7IC8vIGJhY2tcclxuICAgICAgdXZSb3c6IDAsXHJcbiAgICAgIGRpcjogWyAgMCwgIDAsIC0xLCBdLFxyXG4gICAgICBjb3JuZXJzOiBbXHJcbiAgICAgICAgeyBwb3M6IFsgMSwgMCwgMCBdLCB1djogWyAwLCAwIF0sIH0sXHJcbiAgICAgICAgeyBwb3M6IFsgMCwgMCwgMCBdLCB1djogWyAxLCAwIF0sIH0sXHJcbiAgICAgICAgeyBwb3M6IFsgMSwgMSwgMCBdLCB1djogWyAwLCAxIF0sIH0sXHJcbiAgICAgICAgeyBwb3M6IFsgMCwgMSwgMCBdLCB1djogWyAxLCAxIF0sIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAgeyAvLyBmcm9udFxyXG4gICAgICB1dlJvdzogMCxcclxuICAgICAgZGlyOiBbICAwLCAgMCwgIDEsIF0sXHJcbiAgICAgIGNvcm5lcnM6IFtcclxuICAgICAgICB7IHBvczogWyAwLCAwLCAxIF0sIHV2OiBbIDAsIDAgXSwgfSxcclxuICAgICAgICB7IHBvczogWyAxLCAwLCAxIF0sIHV2OiBbIDEsIDAgXSwgfSxcclxuICAgICAgICB7IHBvczogWyAwLCAxLCAxIF0sIHV2OiBbIDAsIDEgXSwgfSxcclxuICAgICAgICB7IHBvczogWyAxLCAxLCAxIF0sIHV2OiBbIDEsIDEgXSwgfSxcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgXTtcclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICB0aGlzLmNlbGxTaXplID0gb3B0aW9ucy5jZWxsU2l6ZTtcclxuICAgIHRoaXMudGlsZVNpemUgPSBvcHRpb25zLnRpbGVTaXplO1xyXG4gICAgdGhpcy50aWxlVGV4dHVyZVdpZHRoID0gb3B0aW9ucy50aWxlVGV4dHVyZVdpZHRoO1xyXG4gICAgdGhpcy50aWxlVGV4dHVyZUhlaWdodCA9IG9wdGlvbnMudGlsZVRleHR1cmVIZWlnaHQ7XHJcbiAgICBjb25zdCB7Y2VsbFNpemV9ID0gdGhpcztcclxuICAgIHRoaXMuY2VsbFNsaWNlU2l6ZSA9IGNlbGxTaXplICogY2VsbFNpemU7XHJcbiAgICB0aGlzLmNlbGxzID0ge31cclxuICAgIHRoaXMuY2VsbE1lc2hlcyA9IHt9XHJcbiAgfVxyXG4gIGNvbXB1dGVDZWxsSWQoeCwgeSwgeikge1xyXG4gICAgY29uc3Qge2NlbGxTaXplfSA9IHRoaXM7XHJcbiAgICBjb25zdCBjZWxsWCA9IE1hdGguZmxvb3IoeCAvIGNlbGxTaXplKTtcclxuICAgIGNvbnN0IGNlbGxZID0gTWF0aC5mbG9vcih5IC8gY2VsbFNpemUpO1xyXG4gICAgY29uc3QgY2VsbFogPSBNYXRoLmZsb29yKHogLyBjZWxsU2l6ZSk7XHJcbiAgICByZXR1cm4gYCR7Y2VsbFh9LCR7Y2VsbFl9LCR7Y2VsbFp9YDtcclxuICB9XHJcbiAgY29tcHV0ZVZveGVsT2Zmc2V0KHgsIHksIHopIHtcclxuICAgIGNvbnN0IHsgY2VsbFNpemUsIGNlbGxTbGljZVNpemUgfSA9IHRoaXM7XHJcbiAgICBjb25zdCB2b3hlbFggPSBtb2QoeCwgY2VsbFNpemUpO1xyXG4gICAgY29uc3Qgdm94ZWxZID0gbW9kKHksIGNlbGxTaXplKTtcclxuICAgIGNvbnN0IHZveGVsWiA9IG1vZCh6LCBjZWxsU2l6ZSk7XHJcbiAgICByZXR1cm4gdm94ZWxZICogY2VsbFNsaWNlU2l6ZSArIHZveGVsWiAqIGNlbGxTaXplICsgdm94ZWxYO1xyXG4gIH1cclxuICBnZXRDZWxsRm9yVm94ZWwoeCwgeSwgeikge1xyXG4gICAgcmV0dXJuIHRoaXMuY2VsbHNbdGhpcy5jb21wdXRlQ2VsbElkKHgsIHksIHopXTtcclxuICB9XHJcbiAgZ2V0Vm94ZWwoeCwgeSwgeikge1xyXG4gICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0Q2VsbEZvclZveGVsKHgsIHksIHopO1xyXG4gICAgaWYgKCFjZWxsKSB7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgdm94ZWxPZmZzZXQgPSB0aGlzLmNvbXB1dGVWb3hlbE9mZnNldCh4LCB5LCB6KTtcclxuICAgIHJldHVybiBjZWxsW3ZveGVsT2Zmc2V0XTtcclxuICB9XHJcbiAgc2V0Vm94ZWwoeCwgeSwgeiwgdikge1xyXG4gICAgbGV0IGNlbGwgPSB0aGlzLmdldENlbGxGb3JWb3hlbCh4LCB5LCB6KTtcclxuXHJcbiAgICBpZiAoIWNlbGwpIHtcclxuICAgICAgY2VsbCA9IHRoaXMuYWRkQ2VsbEZvclZveGVsKHgsIHksIHopXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgdm94ZWxPZmZzZXQgPSB0aGlzLmNvbXB1dGVWb3hlbE9mZnNldCh4LCB5LCB6KTtcclxuICAgIGNlbGxbdm94ZWxPZmZzZXRdID0gdjtcclxuICB9XHJcbiAgYWRkQ2VsbEZvclZveGVsKHgsIHksIHopIHtcclxuICAgIGNvbnN0IGNlbGxJZCA9IHRoaXMuY29tcHV0ZUNlbGxJZCh4LCB5LCB6KTtcclxuICAgIGxldCBjZWxsID0gdGhpcy5jZWxsc1tjZWxsSWRdO1xyXG4gICAgaWYgKCFjZWxsKSB7XHJcbiAgICAgIGNvbnN0IHtjZWxsU2l6ZX0gPSB0aGlzO1xyXG4gICAgICBjZWxsID0gbmV3IFVpbnQ4QXJyYXkoY2VsbFNpemUgKiBjZWxsU2l6ZSAqIGNlbGxTaXplKTtcclxuICAgICAgdGhpcy5jZWxsc1tjZWxsSWRdID0gY2VsbDtcclxuICAgIH1cclxuICAgIHJldHVybiBjZWxsO1xyXG4gIH1cclxuICBnZW5lcmF0ZUdlb21ldHJ5RGF0YUZvckNlbGwoY2VsbFgsIGNlbGxZLCBjZWxsWikge1xyXG4gICAgY29uc3QgeyBjZWxsU2l6ZSwgdGlsZVNpemUsIHRpbGVUZXh0dXJlV2lkdGgsIHRpbGVUZXh0dXJlSGVpZ2h0IH0gPSB0aGlzO1xyXG4gICAgY29uc3QgcG9zaXRpb25zID0gW107XHJcbiAgICBjb25zdCBub3JtYWxzID0gW107XHJcbiAgICBjb25zdCBpbmRpY2VzID0gW107XHJcbiAgICBjb25zdCB1dnMgPSBbXTtcclxuICAgIGNvbnN0IHN0YXJ0WCA9IGNlbGxYICogY2VsbFNpemU7XHJcbiAgICBjb25zdCBzdGFydFkgPSBjZWxsWSAqIGNlbGxTaXplO1xyXG4gICAgY29uc3Qgc3RhcnRaID0gY2VsbFogKiBjZWxsU2l6ZTtcclxuXHJcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGNlbGxTaXplOyArK3kpIHtcclxuICAgICAgY29uc3Qgdm94ZWxZID0gc3RhcnRZICsgeTtcclxuICAgICAgZm9yIChsZXQgeiA9IDA7IHogPCBjZWxsU2l6ZTsgKyt6KSB7XHJcbiAgICAgICAgY29uc3Qgdm94ZWxaID0gc3RhcnRaICsgejtcclxuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IGNlbGxTaXplOyArK3gpIHtcclxuICAgICAgICAgIGNvbnN0IHZveGVsWCA9IHN0YXJ0WCArIHg7XHJcbiAgICAgICAgICBjb25zdCB2b3hlbCA9IHRoaXMuZ2V0Vm94ZWwodm94ZWxYLCB2b3hlbFksIHZveGVsWik7XHJcblxyXG4gICAgICAgICAgaWYgKHZveGVsKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHV2Vm94ZWwgPSB2b3hlbCAtIDE7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgeyBkaXIsIGNvcm5lcnMsIHV2Um93IH0gb2YgVm94ZWxXb3JsZC5mYWNlcykge1xyXG4gICAgICAgICAgICAgIGNvbnN0IG5laWdoYm9yID0gdGhpcy5nZXRWb3hlbChcclxuICAgICAgICAgICAgICAgIHZveGVsWCArIGRpclswXSxcclxuICAgICAgICAgICAgICAgIHZveGVsWSArIGRpclsxXSxcclxuICAgICAgICAgICAgICAgIHZveGVsWiArIGRpclsyXVxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgaWYgKCFuZWlnaGJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmR4ID0gcG9zaXRpb25zLmxlbmd0aCAvIDM7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHsgcG9zLCB1diB9IG9mIGNvcm5lcnMpIHtcclxuICAgICAgICAgICAgICAgICAgcG9zaXRpb25zLnB1c2gocG9zWzBdICsgdm94ZWxYLCBwb3NbMV0gKyB2b3hlbFksIHBvc1syXSArIHZveGVsWik7XHJcbiAgICAgICAgICAgICAgICAgIG5vcm1hbHMucHVzaCguLi5kaXIpO1xyXG4gICAgICAgICAgICAgICAgICB1dnMucHVzaChcclxuICAgICAgICAgICAgICAgICAgICAoKHV2Vm94ZWwgKyB1dlswXSkgKiB0aWxlU2l6ZSkgLyB0aWxlVGV4dHVyZVdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIDEgLSAoKHV2Um93ICsgMSAtIHV2WzFdKSAqIHRpbGVTaXplKSAvIHRpbGVUZXh0dXJlSGVpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpbmRpY2VzLnB1c2gobmR4LCBuZHggKyAxLCBuZHggKyAyLCBuZHggKyAyLCBuZHggKyAxLCBuZHggKyAzKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IF9ub3JtYWxzID0gbmV3IEZsb2F0MzJBcnJheShub3JtYWxzKTtcclxuICAgIGNvbnN0IF9wb3NpdGlvbnMgPSBuZXcgRmxvYXQzMkFycmF5KHBvc2l0aW9ucyk7XHJcbiAgICBjb25zdCBfaW5kaWNlcyA9IG5ldyBVaW50MTZBcnJheShpbmRpY2VzKTtcclxuICAgIGNvbnN0IF90ZXhjb29yZCA9IG5ldyBGbG9hdDMyQXJyYXkodXZzKVxyXG4gICAgY29uc3QgQXJyYXlEYXRhID0ge1xyXG4gICAgICBhdHRyaWJ1dGVzOiB7XHJcbiAgICAgICAgTk9STUFMOiB7XHJcbiAgICAgICAgICBkYXRhOiBfbm9ybWFscyxcclxuICAgICAgICAgIGNvdW50OiBub3JtYWxzLmxlbmd0aCxcclxuICAgICAgICAgIGxvY2F0aW9uOiAxLFxyXG4gICAgICAgICAgYnl0ZUxlbmd0aDogX25vcm1hbHMuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgIHN0cmlkZTogMCxcclxuICAgICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICAgIG51bUNvbXBvbmVudHM6IDMsXHJcbiAgICAgICAgICBhdHRyaWJ1dGVUeXBlIDogV2ViR0wyUmVuZGVyaW5nQ29udGV4dC5GTE9BVF9WRUMzLFxyXG4gICAgICAgICAgdHlwZTogNTEyNixcclxuICAgICAgICB9LFxyXG4gICAgICAgIFBPU0lUSU9OOiB7XHJcbiAgICAgICAgICBkYXRhOiBfcG9zaXRpb25zLFxyXG4gICAgICAgICAgY291bnQ6IHBvc2l0aW9ucy5sZW5ndGgsXHJcbiAgICAgICAgICBsb2NhdGlvbjogMCxcclxuICAgICAgICAgIGJ5dGVMZW5ndGg6IF9wb3NpdGlvbnMuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgIHN0cmlkZTogMCxcclxuICAgICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICAgIG51bUNvbXBvbmVudHM6IDMsXHJcbiAgICAgICAgICBhdHRyaWJ1dGVUeXBlIDogV2ViR0wyUmVuZGVyaW5nQ29udGV4dC5GTE9BVF9WRUMzLFxyXG4gICAgICAgICAgdHlwZTogNTEyNixcclxuICAgICAgICB9LFxyXG4gICAgICAgIFRFWENPT1JEXzA6IHtcclxuICAgICAgICAgICAgZGF0YTogX3RleGNvb3JkLFxyXG4gICAgICAgICAgICBjb3VudDogdXZzLmxlbmd0aCxcclxuICAgICAgICAgICAgdHlwZTogNTEyNixcclxuICAgICAgICAgICAgb2Zmc2V0OiAwLFxyXG4gICAgICAgICAgICBzdHJpZGU6IDAsXHJcbiAgICAgICAgICAgIGJ5dGVMZW5ndGg6IF90ZXhjb29yZC5ieXRlTGVuZ3RoLFxyXG4gICAgICAgICAgICBsb2NhdGlvbjogMixcclxuICAgICAgICAgICAgbnVtQ29tcG9uZW50czogMixcclxuICAgICAgICAgICAgYXR0cmlidXRlVHlwZSA6IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQuRkxPQVRfVkVDMixcclxuICAgICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIGluZGljZXM6IF9pbmRpY2VzLFxyXG4gICAgICBudW1FbGVtZW50czogaW5kaWNlcy5sZW5ndGgsXHJcbiAgICAgIGNvbXBvbmVudFR5cGU6IDUxMjMsXHJcbiAgICAgIG1vZGU6IDQsXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBBcnJheURhdGE7XHJcbiAgfVxyXG4gIHVwZGF0ZUNlbGxHZW9tZXRyeVxyXG59XHJcbiIsImltcG9ydCB7IEZMT0FULCBGTE9BVF9NQVQyLCBGTE9BVF9NQVQzLCBGTE9BVF9NQVQ0LCBGTE9BVF9WRUMyLCBJTlQsIEZMT0FUX1ZFQzMsIEZMT0FUX1ZFQzQsIFVOU0lHTkVEX0lOVCwgVU5TSUdORURfSU5UX1ZFQzIsIFVOU0lHTkVEX0lOVF9WRUMzLCBVTlNJR05FRF9JTlRfVkVDNCwgSU5UX1ZFQzIsIElOVF9WRUMzLCBJTlRfVkVDNCwgQk9PTCwgQk9PTF9WRUMyLCBCT09MX1ZFQzMsIEJPT0xfVkVDNCwgfSBmcm9tIFwiLi9lbnVtc1wiO1xyXG5jb25zdCB0eXBlSW5mbyA9IHtcclxuICAgIFtGTE9BVF9NQVQ0XTogeyBzaXplOiA2NCwgcm93czogNCwgY29sczogNCB9LFxyXG4gICAgW0ZMT0FUX01BVDJdOiB7IHNpemU6IDMyLCByb3dzOiAyLCBjb2xzOiAyIH0sXHJcbiAgICBbRkxPQVRfTUFUM106IHsgc2l6ZTogNDgsIHJvd3M6IDMsIGNvbHM6IDMgfSxcclxufTtcclxuY29uc3QgZmxvYXRBdHRyaWJTZXR0ZXIgPSAoeyBudW1Db21wb25lbnRzLCB0eXBlLCBsb2NhdGlvbiwgc3RyaWRlLCBvZmZzZXQsIGJ1ZmZlciwgZ2wsIGRpdmlzb3IsIG5vcm1hbGl6ZSwgfSkgPT4ge1xyXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGJ1ZmZlcik7XHJcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShsb2NhdGlvbik7XHJcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGxvY2F0aW9uLCBudW1Db21wb25lbnRzLCB0eXBlIHx8IGdsLkZMT0FULCBub3JtYWxpemUgfHwgZmFsc2UsIHN0cmlkZSB8fCAwLCBvZmZzZXQgfHwgMCk7XHJcbiAgICBnbC52ZXJ0ZXhBdHRyaWJEaXZpc29yKGxvY2F0aW9uLCBkaXZpc29yIHx8IDApO1xyXG59O1xyXG5jb25zdCBtYXRBdHRyaWJTZXR0ZXIgPSAoeyBudW1Db21wb25lbnRzLCB0eXBlLCBsb2NhdGlvbiwgb2Zmc2V0LCBidWZmZXIsIGdsLCBkaXZpc29yLCBub3JtYWxpemUsIGF0dHJpYnV0ZVR5cGUsIH0pID0+IHtcclxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBidWZmZXIpO1xyXG4gICAgY29uc3Qgc3RyaWRlID0gdHlwZUluZm9bYXR0cmlidXRlVHlwZV0uc2l6ZTtcclxuICAgIGNvbnN0IGNvdW50ID0gdHlwZUluZm9bYXR0cmlidXRlVHlwZV0ucm93cztcclxuICAgIGNvbnN0IHJvd09mZnNldCA9IHN0cmlkZSAvIGNvdW50O1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkobG9jYXRpb24gKyBpKTtcclxuICAgICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGxvY2F0aW9uLCBudW1Db21wb25lbnRzLCB0eXBlIHwgZ2wuRkxPQVQsIGZhbHNlLCBzdHJpZGUgfCAwLCBvZmZzZXQgKyByb3dPZmZzZXQgKiBpKTtcclxuICAgICAgICBnbC52ZXJ0ZXhBdHRyaWJEaXZpc29yKGxvY2F0aW9uICsgaSwgZGl2aXNvciB8fCAwKTtcclxuICAgIH1cclxufTtcclxuY29uc3QgaW50QXR0cmliU2V0dGVyID0gKHsgbnVtQ29tcG9uZW50cywgdHlwZSwgbG9jYXRpb24sIHN0cmlkZSwgb2Zmc2V0LCBidWZmZXIsIGdsLCBkaXZpc29yLCB9KSA9PiB7XHJcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgYnVmZmVyKTtcclxuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGxvY2F0aW9uKTtcclxuICAgIGdsLnZlcnRleEF0dHJpYklQb2ludGVyKGxvY2F0aW9uLCBudW1Db21wb25lbnRzLCB0eXBlIHx8IGdsLklOVCwgc3RyaWRlIHx8IDAsIG9mZnNldCB8fCAwKTtcclxuICAgIGdsLnZlcnRleEF0dHJpYkRpdmlzb3IobG9jYXRpb24sIGRpdmlzb3IgfHwgMCk7XHJcbn07XHJcbmNvbnN0IGF0dHJpYlR5cGVNYXAgPSB7fTtcclxuYXR0cmliVHlwZU1hcFtJTlRdID0gaW50QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW0ZMT0FUXSA9IGZsb2F0QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW0ZMT0FUX1ZFQzJdID0gZmxvYXRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbRkxPQVRfVkVDM10gPSBmbG9hdEF0dHJpYlNldHRlcjtcclxuYXR0cmliVHlwZU1hcFtGTE9BVF9WRUM0XSA9IGZsb2F0QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW0ZMT0FUX01BVDJdID0gbWF0QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW0ZMT0FUX01BVDNdID0gbWF0QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW0ZMT0FUX01BVDRdID0gbWF0QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW1VOU0lHTkVEX0lOVF0gPSBpbnRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbVU5TSUdORURfSU5UX1ZFQzJdID0gaW50QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW1VOU0lHTkVEX0lOVF9WRUMzXSA9IGludEF0dHJpYlNldHRlcjtcclxuYXR0cmliVHlwZU1hcFtVTlNJR05FRF9JTlRfVkVDM10gPSBpbnRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbVU5TSUdORURfSU5UX1ZFQzRdID0gaW50QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW0lOVF9WRUMyXSA9IGludEF0dHJpYlNldHRlcjtcclxuYXR0cmliVHlwZU1hcFtJTlRfVkVDM10gPSBpbnRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbSU5UX1ZFQzRdID0gaW50QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW0JPT0xdID0gaW50QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW0JPT0xfVkVDMl0gPSBpbnRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbQk9PTF9WRUMzXSA9IGludEF0dHJpYlNldHRlcjtcclxuYXR0cmliVHlwZU1hcFtCT09MX1ZFQzRdID0gaW50QXR0cmliU2V0dGVyO1xyXG5jbGFzcyBCdWZmZXJBdHRyaWJ1dGVJbmZvIHtcclxuICAgIGNvbnN0cnVjdG9yKGdsLCB7IHN0cmlkZSwgdHlwZSwgb2Zmc2V0LCBsb2NhdGlvbiwgbnVtQ29tcG9uZW50cywgYXR0cmlidXRlVHlwZSwgZGl2aXNvciB9KSB7XHJcbiAgICAgICAgdGhpcy5nbCA9IGdsO1xyXG4gICAgICAgIHRoaXMuYnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XHJcbiAgICAgICAgdGhpcy5zdHJpZGUgPSBzdHJpZGUgfCAwO1xyXG4gICAgICAgIHRoaXMubnVtQ29tcG9uZW50cyA9IG51bUNvbXBvbmVudHM7XHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVUeXBlID0gYXR0cmlidXRlVHlwZTtcclxuICAgICAgICB0aGlzLm9mZnNldCA9IG9mZnNldCB8IDA7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb247XHJcbiAgICAgICAgdGhpcy5kaXZpc29yID0gZGl2aXNvcjtcclxuICAgIH1cclxuICAgIHNldEF0dHJpYnV0ZSgpIHtcclxuICAgICAgICBjb25zdCB7IGF0dHJpYnV0ZVR5cGUgfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3Qgc2V0dGVyID0gYXR0cmliVHlwZU1hcFthdHRyaWJ1dGVUeXBlXTtcclxuICAgICAgICBzZXR0ZXIodGhpcyk7XHJcbiAgICB9XHJcbiAgICBidWZmZXJEYXRhKGRhdGEsIHVzYWdlID0gMHg4OGU0KSB7XHJcbiAgICAgICAgY29uc3QgeyBnbCwgYnVmZmVyIH0gPSB0aGlzO1xyXG4gICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBidWZmZXIpO1xyXG4gICAgICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBkYXRhLCB1c2FnZSk7XHJcbiAgICB9XHJcbiAgICBhbGxvY0J1ZmZlcihieXRlTGVuZ3RoLCB1c2FnZSA9IDB4ODhlNCkge1xyXG4gICAgICAgIGNvbnN0IHsgZ2wsIGJ1ZmZlciB9ID0gdGhpcztcclxuICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgYnVmZmVyKTtcclxuICAgICAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgYnl0ZUxlbmd0aCwgdXNhZ2UpO1xyXG4gICAgfVxyXG4gICAgYnVmZmVyU3ViRGF0YShkYXRhLCBvZmZzZXQgPSAwKSB7XHJcbiAgICAgICAgY29uc3QgeyBnbCwgYnVmZmVyIH0gPSB0aGlzO1xyXG4gICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBidWZmZXIpO1xyXG4gICAgICAgIGdsLmJ1ZmZlclN1YkRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBvZmZzZXQsIGRhdGEpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7IEJ1ZmZlckF0dHJpYnV0ZUluZm8gfTtcclxuIiwiaW1wb3J0IHsgbTQgfSBmcm9tIFwicm9tYW5wcHBtYXRoXCI7XHJcbmNvbnN0IGRlZ1RvUmFkID0gKGQpID0+IChkICogTWF0aC5QSSkgLyAxODA7XHJcbmNvbnN0IGZpZWxkT2ZWaWV3UmFkaWFucyA9IGRlZ1RvUmFkKDkwKTtcclxuY2xhc3MgRHJhd2VyIHtcclxuICAgIHN0YXRpYyBjcmVhdGUzZFByb2plY3Rpb25NYXRyaXgoek5lYXIsIHpGYXIsIGNsaWVudFdpZHRoLCBjbGllbnRIZWlnaHQpIHtcclxuICAgICAgICBjb25zdCBhc3BlY3QgPSBjbGllbnRXaWR0aCAvIGNsaWVudEhlaWdodDtcclxuICAgICAgICByZXR1cm4gbTQucGVyc3BlY3RpdmUoZmllbGRPZlZpZXdSYWRpYW5zLCBhc3BlY3QsIHpOZWFyLCB6RmFyKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcclxuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG4gICAgICAgIHRoaXMucHJvamVjdGlvbk1hdHJpeCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBzZXRDb250ZXh0KGdsQ29udGV4dFdyYXBwZXIpIHtcclxuICAgICAgICB0aGlzLmNvbnRleHQgPSBnbENvbnRleHRXcmFwcGVyO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgZHJhdyhwcmltaXRpdmVSZW5kZXJlciwgdW5pZm9ybXMsIGNhbWVyYU1hdHJpeCkge1xyXG4gICAgICAgIGNvbnN0IHsgVkFPLCBtb2RlLCBvZmZzZXQsIG51bUVsZW1lbnRzLCBpbmRpY2VzLCBwcm9ncmFtSW5mbywgY29tcG9uZW50VHlwZSwgfSA9IHByaW1pdGl2ZVJlbmRlcmVyO1xyXG4gICAgICAgIGNvbnN0IHsgcHJvamVjdGlvbk1hdHJpeCB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCB7IGdsIH0gPSB0aGlzLmNvbnRleHQ7XHJcbiAgICAgICAgY29uc3Qgdmlld01hdHJpeCA9IG00LmludmVyc2UoY2FtZXJhTWF0cml4KTtcclxuICAgICAgICBjb25zdCB2aWV3UHJvamVjdGlvbk1hdHJpeCA9IG00Lm11bHRpcGx5KHByb2plY3Rpb25NYXRyaXgsIHZpZXdNYXRyaXgpO1xyXG4gICAgICAgIGNvbnN0IHVfd29ybGRWaWV3UHJvamVjdGlvbiA9IG00Lm11bHRpcGx5KHZpZXdQcm9qZWN0aW9uTWF0cml4LCB1bmlmb3Jtcy51X21hdHJpeCk7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnVzZVByb2dyYW1JbmZvKHByb2dyYW1JbmZvKTtcclxuICAgICAgICB0aGlzLmNvbnRleHRcclxuICAgICAgICAgICAgLmxhc3RVc2VkUHJvZ3JhbUluZm9cclxuICAgICAgICAgICAgLnNldFVuaWZvcm1zKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdW5pZm9ybXMpLCB7IHVfd29ybGRWaWV3UHJvamVjdGlvbiB9KSk7XHJcbiAgICAgICAgZ2wuYmluZFZlcnRleEFycmF5KFZBTyk7XHJcbiAgICAgICAgaWYgKCFpbmRpY2VzKSB7XHJcbiAgICAgICAgICAgIGdsLmRyYXdBcnJheXMobW9kZSwgb2Zmc2V0LCBudW1FbGVtZW50cyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2wuZHJhd0VsZW1lbnRzKG1vZGUsIG51bUVsZW1lbnRzLCBjb21wb25lbnRUeXBlLCBvZmZzZXQpO1xyXG4gICAgfVxyXG4gICAgZHJhd0luc3RhbmNlZChwcmltaXRpdmVSZW5kZXJlciwgdW5pZm9ybXMsIGNhbWVyYU1hdHJpeCwgbnVtSW5zdGFuY2VzKSB7XHJcbiAgICAgICAgY29uc3QgeyBWQU8sIG1vZGUsIG9mZnNldCwgbnVtRWxlbWVudHMsIGluZGljZXMsIHByb2dyYW1JbmZvLCBjb21wb25lbnRUeXBlLCB9ID0gcHJpbWl0aXZlUmVuZGVyZXI7XHJcbiAgICAgICAgY29uc3QgeyBwcm9qZWN0aW9uTWF0cml4IH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuY29udGV4dDtcclxuICAgICAgICBjb25zdCB2aWV3TWF0cml4ID0gbTQuaW52ZXJzZShjYW1lcmFNYXRyaXgpO1xyXG4gICAgICAgIGNvbnN0IHZpZXdQcm9qZWN0aW9uTWF0cml4ID0gbTQubXVsdGlwbHkocHJvamVjdGlvbk1hdHJpeCwgdmlld01hdHJpeCk7XHJcbiAgICAgICAgY29uc3Qgd29ybGRWaWV3UHJvamVjdGlvbiA9IG00Lm11bHRpcGx5KHZpZXdQcm9qZWN0aW9uTWF0cml4LCB1bmlmb3Jtcy51X21hdHJpeCk7XHJcbiAgICAgICAgY29uc3Qgd29ybGRNYXRyaXggPSB1bmlmb3Jtcy51X21hdHJpeDtcclxuICAgICAgICB0aGlzLmNvbnRleHQudXNlUHJvZ3JhbUluZm8ocHJvZ3JhbUluZm8pO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5cclxuICAgICAgICAgICAgbGFzdFVzZWRQcm9ncmFtSW5mb1xyXG4gICAgICAgICAgICAuc2V0VW5pZm9ybXMoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB1bmlmb3JtcyksIHsgd29ybGRNYXRyaXgsIHdvcmxkVmlld1Byb2plY3Rpb24gfSkpO1xyXG4gICAgICAgIGdsLmJpbmRWZXJ0ZXhBcnJheShWQU8pO1xyXG4gICAgICAgIGlmICghaW5kaWNlcykge1xyXG4gICAgICAgICAgICBnbC5kcmF3QXJyYXlzSW5zdGFuY2VkKG1vZGUsIG9mZnNldCwgbnVtRWxlbWVudHMsIG51bUluc3RhbmNlcyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2wuZHJhd0VsZW1lbnRzSW5zdGFuY2VkKG1vZGUsIG51bUVsZW1lbnRzLCBnbC5VTlNJR05FRF9TSE9SVCwgb2Zmc2V0LCBudW1JbnN0YW5jZXMpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IERyYXdlcjtcclxuIiwiaW1wb3J0IHsgVGV4dHVyZUluZm8gfSBmcm9tIFwiLi9UZXh0dXJlSW5mb1wiO1xyXG5pbXBvcnQgUHJpbWl0aXZlUmVuZGVyZXIgZnJvbSBcIi4vUHJpbWl0aXZlUmVuZGVyZXJcIjtcclxuaW1wb3J0IERyYXdlciBmcm9tIFwiLi9EcmF3ZXJcIjtcclxuaW1wb3J0IHsgUHJvZ3JhbUluZm8gfSBmcm9tIFwiLi9Qcm9ncmFtSW5mb1wiO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHTFdyYXBwZXIge1xyXG4gICAgY29uc3RydWN0b3IoY2FudmFzSWQpIHtcclxuICAgICAgICB0aGlzLlByb2dyYW1JbmZvID0gKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHJldHVybiBjbGFzcyBleHRlbmRzIFByb2dyYW1JbmZvIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yKHZlcnRleFNoYWRlclNvdXJjZSwgZnJhZ21lbnRTaGFkZXJTb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdXBlcihzZWxmLCB2ZXJ0ZXhTaGFkZXJTb3VyY2UsIGZyYWdtZW50U2hhZGVyU291cmNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KSgpO1xyXG4gICAgICAgIHRoaXMuUHJpbWl0aXZlUmVuZGVyZXIgPSAoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuIGNsYXNzIGV4dGVuZHMgUHJpbWl0aXZlUmVuZGVyZXIge1xyXG4gICAgICAgICAgICAgICAgc3RhdGljIGZyb21BcnJheURhdGEoYXJyYXlEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJpbWl0aXZlUmVuZGVyZXIgPSBuZXcgUHJpbWl0aXZlUmVuZGVyZXIoc2VsZi5nbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWl0aXZlUmVuZGVyZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNyZWF0ZVZBTygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jcmVhdGVHZW9tZXRyeUJ1ZmZlcnMoYXJyYXlEYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2V0QXR0cmlidXRlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmltaXRpdmVSZW5kZXJlcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cGVyKHNlbGYuZ2wpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICAgICAgdGhpcy5EcmF3ZXIgPSAoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuIGNsYXNzIGV4dGVuZHMgRHJhd2VyIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cGVyKHNlbGYpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICAgICAgdGhpcy5UZXh0dXJlSW5mbyA9ICgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gY2xhc3MgZXh0ZW5kcyBUZXh0dXJlSW5mbyB7XHJcbiAgICAgICAgICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdXBlcihzZWxmLmdsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KSgpO1xyXG4gICAgICAgIGNvbnN0IGdsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzSWQpLmdldENvbnRleHQoXCJ3ZWJnbDJcIik7XHJcbiAgICAgICAgaWYgKCFnbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyB3ZWJnbCFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2wgPSBnbDtcclxuICAgICAgICB0aGlzLnByb2dyYW1zID0ge307XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgZ2V0TGFzdFVzZWRQcm9ncmFtSW5mbygpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyQ2FjaGUubGFzdFVzZWRQcm9ncmFtSW5mbztcclxuICAgIH1cclxuICAgIHNldExhc3RVc2VkUHJvZ3JhbShwcm9ncmFtSW5mbykge1xyXG4gICAgICB0aGlzLnJlbmRlckNhY2hlLmxhc3RVc2VkUHJvZ3JhbUluZm8gPSBwcm9ncmFtSW5mbztcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAqL1xyXG4gICAgdXNlUHJvZ3JhbUluZm8ocHJvZ3JhbUluZm8pIHtcclxuICAgICAgICBpZiAocHJvZ3JhbUluZm8gIT0gdGhpcy5sYXN0VXNlZFByb2dyYW1JbmZvKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2wudXNlUHJvZ3JhbShwcm9ncmFtSW5mby5wcm9ncmFtKTtcclxuICAgICAgICAgICAgdGhpcy5sYXN0VXNlZFByb2dyYW1JbmZvID0gcHJvZ3JhbUluZm87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgcmVzaXplQ2FudmFzVG9EaXNwbGF5U2l6ZShtdWx0aXBsaWVyID0gMSkge1xyXG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuZ2wuY2FudmFzO1xyXG4gICAgICAgIGNvbnN0IHdpZHRoID0gKGNhbnZhcy5jbGllbnRXaWR0aCAqIG11bHRpcGxpZXIpIHwgMDtcclxuICAgICAgICBjb25zdCBoZWlnaHQgPSAoY2FudmFzLmNsaWVudEhlaWdodCAqIG11bHRpcGxpZXIpIHwgMDtcclxuICAgICAgICBjYW52YXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgcmVzaXplQ2FudmFzKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgICBjb25zdCBjYW52YXMgPSB0aGlzLmdsLmNhbnZhcztcclxuICAgICAgICBjYW52YXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2V0Vmlld3BvcnQoKSB7XHJcbiAgICAgICAgdGhpcy5nbC52aWV3cG9ydCgwLCAwLCB0aGlzLmdsLmNhbnZhcy53aWR0aCwgdGhpcy5nbC5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGdldENvbnRleHQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2w7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IFByaW1pdGl2ZVJlbmRlcmVyIGZyb20gXCIuL1ByaW1pdGl2ZVJlbmRlcmVyXCI7XHJcbmltcG9ydCB7IE1lc2hSZW5kZXJlciB9IGZyb20gXCIuL01lc2hSZW5kZXJlclwiO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVTZXR0ZXIsIEJ1ZmZlckNvbnRyb2xsZXIgfSBmcm9tIFwiLi9CdWZmZXJBdHRyaWJ1dGVcIjtcclxuaW1wb3J0IHsgTlVNX0NPTVBPTkVOVFMsIFRZUEVEX0FSUkFZUywgTE9DQVRJT05TIH0gZnJvbSBcIi4vZW51bXNcIjtcclxuLy8vIFRPRE8gLy8vXHJcbmNvbnN0IEFycmF5RGF0YUZyb21HbHRmID0gKGdsdGYsIGJ1ZmZlcnMpID0+IHtcclxuICAgIGNvbnN0IHsgYnVmZmVyVmlld3MsIGFjY2Vzc29ycywgbWVzaGVzLCBub2RlcyB9ID0gZ2x0ZjtcclxuICAgIGNvbnN0IGF0dHJpYkRhdGFGcm9tQWNjZXNzb3IgPSAoYWNjZXNzb3IpID0+IHtcclxuICAgICAgICBjb25zdCBidWZmZXJWaWV3ID0gYnVmZmVyVmlld3NbYWNjZXNzb3IuYnVmZmVyVmlld107XHJcbiAgICAgICAgY29uc3QgeyBjb3VudCwgY29tcG9uZW50VHlwZSwgdHlwZSB9ID0gYWNjZXNzb3I7XHJcbiAgICAgICAgY29uc3QgYnl0ZU9mZnNldCA9IGFjY2Vzc29yLmJ5dGVPZmZzZXQgfHwgMDtcclxuICAgICAgICBjb25zdCB7IGJ5dGVMZW5ndGgsIHRhcmdldCB9ID0gYnVmZmVyVmlldztcclxuICAgICAgICBjb25zdCBzdHJpZGUgPSBidWZmZXJWaWV3LmJ5dGVTdHJpZGUgfHwgMDtcclxuICAgICAgICBjb25zdCBidWZmZXJWaWV3Qnl0ZU9mZnNldCA9IGJ1ZmZlclZpZXcuYnl0ZU9mZnNldCB8fCAwO1xyXG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IGJ1ZmZlcnNbYnVmZmVyVmlldy5idWZmZXJdO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRhdGE6IG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgYnVmZmVyVmlld0J5dGVPZmZzZXQsIGJ5dGVMZW5ndGgpLFxyXG4gICAgICAgICAgICBudW1Db21wb25lbnRzOiBOVU1fQ09NUE9ORU5UU1t0eXBlXSxcclxuICAgICAgICAgICAgc3RyaWRlLFxyXG4gICAgICAgICAgICBieXRlTGVuZ3RoLFxyXG4gICAgICAgICAgICBsb2NhdGlvbjogbnVsbCxcclxuICAgICAgICAgICAgY291bnQsXHJcbiAgICAgICAgICAgIHR5cGU6IGNvbXBvbmVudFR5cGUsXHJcbiAgICAgICAgICAgIG9mZnNldDogYnl0ZU9mZnNldCB8fCAwLFxyXG4gICAgICAgICAgICBjb21wb25lbnRUeXBlOiBhY2Nlc3Nvci5jb21wb25lbnRUeXBlLFxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgY29uc3QgX21lc2hlcyA9IG1lc2hlcy5tYXAoKG1lc2gpID0+ICh7XHJcbiAgICAgICAgcHJpbWl0aXZlczogbWVzaC5wcmltaXRpdmVzLm1hcCgoX3ByaW1pdGl2ZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwcmltaXRpdmUgPSB7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7fSxcclxuICAgICAgICAgICAgICAgIG1vZGU6IF9wcmltaXRpdmUubW9kZSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKF9wcmltaXRpdmUuaGFzT3duUHJvcGVydHkoXCJpbmRpY2VzXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRpY2VzSW5mbyA9IGF0dHJpYkRhdGFGcm9tQWNjZXNzb3IoYWNjZXNzb3JzW19wcmltaXRpdmUuaW5kaWNlc10pO1xyXG4gICAgICAgICAgICAgICAgcHJpbWl0aXZlLmluZGljZXMgPSBpbmRpY2VzSW5mby5kYXRhO1xyXG4gICAgICAgICAgICAgICAgcHJpbWl0aXZlLm51bUVsZW1lbnRzID0gaW5kaWNlc0luZm8uY291bnQ7XHJcbiAgICAgICAgICAgICAgICBwcmltaXRpdmUuY29tcG9uZW50VHlwZSA9IGluZGljZXNJbmZvLmNvbXBvbmVudFR5cGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgT2JqZWN0LmtleXMoX3ByaW1pdGl2ZS5hdHRyaWJ1dGVzKS5mb3JFYWNoKChhdHRyaWJOYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhdHRyaWJ1dGUgPSBfcHJpbWl0aXZlLmF0dHJpYnV0ZXNbYXR0cmliTmFtZV07XHJcbiAgICAgICAgICAgICAgICBwcmltaXRpdmUuYXR0cmlidXRlc1thdHRyaWJOYW1lXSA9IGF0dHJpYkRhdGFGcm9tQWNjZXNzb3IoYWNjZXNzb3JzW2F0dHJpYnV0ZV0pO1xyXG4gICAgICAgICAgICAgICAgLy9pZihhdHRyaWJOYW1lID09PSAnSk9JTlRTXzAnKSBfcHJpbWl0aXZlLmF0dHJpYnV0ZXNbYXR0cmliTmFtZV0uZGF0YSA9IG5ldyBVaW50MzJBcnJheShfcHJpbWl0aXZlLmF0dHJpYnV0ZXNbYXR0cmliTmFtZV0uZGF0YSlcclxuICAgICAgICAgICAgICAgIHByaW1pdGl2ZS5hdHRyaWJ1dGVzW2F0dHJpYk5hbWVdLmxvY2F0aW9uID0gTE9DQVRJT05TW2F0dHJpYk5hbWVdO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHByaW1pdGl2ZTtcclxuICAgICAgICB9KSxcclxuICAgICAgICBuYW1lOiBtZXNoLm5hbWUsXHJcbiAgICB9KSk7XHJcbiAgICByZXR1cm4gX21lc2hlcy5tYXAoKG1lc2gpID0+IHtcclxuICAgICAgICBjb25zdCBwcmltaXRpdmVzID0gbWVzaC5wcmltaXRpdmVzLm1hcCgocHJpbWl0aXZlKSA9PiBuZXcgUHJpbWl0aXZlUmVuZGVyZXIocHJpbWl0aXZlKSk7XHJcbiAgICAgICAgY29uc3QgbmFtZSA9IG1lc2gubmFtZTtcclxuICAgICAgICByZXR1cm4gbmV3IE1lc2hSZW5kZXJlcih7IHByaW1pdGl2ZXMsIG5hbWUgfSk7XHJcbiAgICB9KTtcclxufTtcclxuY29uc3QgUHJpbWl0aXZlUmVuZGVySW5mb0Zyb21BcnJheURhdGEgPSAobWVzaGVzKSA9PiBtZXNoZXMubWFwKChtZXNoKSA9PiB7XHJcbiAgICBjb25zdCBwcmltaXRpdmVzID0gbWVzaC5wcmltaXRpdmVzLm1hcCgocHJpbWl0aXZlKSA9PiBuZXcgUHJpbWl0aXZlUmVuZGVyZXIocHJpbWl0aXZlKSk7XHJcbiAgICBjb25zdCBuYW1lID0gbWVzaC5uYW1lO1xyXG4gICAgcmV0dXJuIG5ldyBNZXNoUmVuZGVyZXIoeyBuYW1lLCBwcmltaXRpdmVzIH0pO1xyXG59KTtcclxuY29uc3QgRW50aXR5RGF0YUZyb21HbHRmID0gKGdsdGYsIGJ1ZmZlcnMpID0+IFByaW1pdGl2ZVJlbmRlckluZm9Gcm9tQXJyYXlEYXRhKEFycmF5RGF0YUZyb21HbHRmKGdsdGYsIGJ1ZmZlcnMpKTtcclxuY2xhc3MgR0xURiB7XHJcbiAgICBjb25zdHJ1Y3RvcihnbHRmLCBiaW5hcnlCdWZmZXJzKSB7XHJcbiAgICAgICAgY29uc3QgeyBub2RlcyB9ID0gZ2x0ZjtcclxuICAgICAgICB0aGlzLm5vZGVzID0gbm9kZXM7XHJcbiAgICAgICAgdGhpcy5tZXNoZXMgPSBBcnJheURhdGFGcm9tR2x0ZihnbHRmLCBiaW5hcnlCdWZmZXJzKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgeyBBcnJheURhdGFGcm9tR2x0ZiwgUHJpbWl0aXZlUmVuZGVySW5mb0Zyb21BcnJheURhdGEsIEVudGl0eURhdGFGcm9tR2x0ZiwgR0xURiwgfTtcclxuIiwiaW1wb3J0IGdldEF0dHJpYnV0ZVByb3BzQnlUeXBlIGZyb20gXCIuL2F0dHJpYlR5cGVQcm9wc1wiO1xyXG5pbXBvcnQgYXR0cmliVHlwZVByb3BzIGZyb20gXCIuL2F0dHJpYlR5cGVQcm9wc1wiO1xyXG5pbXBvcnQgeyBCdWZmZXJBdHRyaWJ1dGUgfSBmcm9tIFwiLi9CdWZmZXJBdHRyaWJ1dGVcIjtcclxuY2xhc3MgTWVzaFJlbmRlcmVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHsgcHJpbWl0aXZlcywgbmFtZSB9KSB7XHJcbiAgICAgICAgdGhpcy5wcmltaXRpdmVzID0gcHJpbWl0aXZlcztcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuY29udGV4dCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5idWZmZXJzID0ge307XHJcbiAgICB9XHJcbiAgICBkcmF3KHVuaWZvcm1zLCBjYW1lcmFNYXRyaXgpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbiA9IHRoaXMucHJpbWl0aXZlcy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5wcmltaXRpdmVzW2ldLmRyYXcodW5pZm9ybXMsIGNhbWVyYU1hdHJpeCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgZHJhd0luc3RhbmNlZCh1bmlmb3JtcywgY2FtZXJhTWF0cml4LCBudW1JbnN0YW5jZXMpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbiA9IHRoaXMucHJpbWl0aXZlcy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5wcmltaXRpdmVzW2ldLmRyYXdJbnN0YW5jZWQodW5pZm9ybXMsIGNhbWVyYU1hdHJpeCwgbnVtSW5zdGFuY2VzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgU2tpbm5lZE1lc2hSZW5kZXJlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihwcmltaXRpdmVzLCBza2luKSB7XHJcbiAgICAgICAgdGhpcy5wcmltaXRpdmVzID0gcHJpbWl0aXZlcztcclxuICAgICAgICB0aGlzLnNraW4gPSBza2luO1xyXG4gICAgfVxyXG4gICAgZHJhdyh1bmlmb3JtcywgY2FtZXJhTWF0cml4KSB7XHJcbiAgICAgICAgdGhpcy5za2luLnVwZGF0ZSh1bmlmb3Jtcy51X21hdHJpeCk7XHJcbiAgICAgICAgY29uc3QgX3VuaWZvcm1zID0gT2JqZWN0LmFzc2lnbih7IHVfam9pbnRUZXh0dXJlOiB0aGlzLnNraW4uam9pbnRUZXh0dXJlLCB1X251bUpvaW50czogdGhpcy5za2luLmpvaW50cy5sZW5ndGggfSwgdW5pZm9ybXMpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gdGhpcy5wcmltaXRpdmVzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnByaW1pdGl2ZXNbaV0uZHJhdyhfdW5pZm9ybXMsIGNhbWVyYU1hdHJpeCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7IE1lc2hSZW5kZXJlciwgU2tpbm5lZE1lc2hSZW5kZXJlciB9O1xyXG4iLCJjbGFzcyBUUlMge1xyXG4gICAgY29uc3RydWN0b3IodHJhbnNsYXRpb24sIHJvdGF0aW9uLCBzY2FsZSkge1xyXG4gICAgICAgIHRoaXMudHJhbnNsYXRpb24gPSB0cmFuc2xhdGlvbjtcclxuICAgICAgICB0aGlzLnJvdGF0aW9uID0gcm90YXRpb247XHJcbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xyXG4gICAgfVxyXG4gICAgZ2V0TWF0cml4KG0pIHtcclxuICAgICAgICBsZXQgZHN0ID0gbSB8fCBtNC5pZGVudGl0eSgpO1xyXG4gICAgICAgIHZhciB0ID0gdGhpcy50cmFuc2xhdGlvbjtcclxuICAgICAgICB2YXIgciA9IHRoaXMucm90YXRpb247XHJcbiAgICAgICAgdmFyIHMgPSB0aGlzLnNjYWxlO1xyXG4gICAgICAgIGNvbnN0IHNpbiA9IE1hdGguc2luKHJbM10gLyAyKTtcclxuICAgICAgICBjb25zdCBjb3MgPSBNYXRoLmNvcyhyWzNdIC8gMik7XHJcbiAgICAgICAgZHN0ID0gbTQudHJhbnNsYXRlKGRzdCwgdFswXSwgdFsxXSwgdFsyXSk7XHJcbiAgICAgICAgZHN0ID0gbTQubXVsdGlwbHkoZHN0LCBtNC5mcm9tUXVhdGVybmlvbihyKSk7XHJcbiAgICAgICAgZHN0ID0gbTQuc2NhbGUoZHN0LCBzWzBdLCBzWzFdLCBzWzJdKTtcclxuICAgICAgICByZXR1cm4gZHN0O1xyXG4gICAgfVxyXG4gICAgZ2V0Uk1hdHJpeCgpIHtcclxuICAgICAgICBsZXQgZHN0ID0gbTQuaWRlbnRpdHkoKTtcclxuICAgICAgICB2YXIgciA9IHRoaXMucm90YXRpb247XHJcbiAgICAgICAgZHN0ID0gbTQueFJvdGF0ZShkc3QsIHJbMF0pO1xyXG4gICAgICAgIGRzdCA9IG00LnlSb3RhdGUoZHN0LCByWzFdKTtcclxuICAgICAgICBkc3QgPSBtNC56Um90YXRlKGRzdCwgclsyXSk7XHJcbiAgICAgICAgcmV0dXJuIGRzdDtcclxuICAgIH1cclxuICAgIGdldFRSbWF0cml4KCkge1xyXG4gICAgICAgIGNvbnN0IHQgPSB0aGlzLnRyYW5zbGF0aW9uO1xyXG4gICAgICAgIGNvbnN0IHIgPSB0aGlzLnJvdGF0aW9uO1xyXG4gICAgICAgIGxldCBtID0gbTQudHJhbnNsYXRpb24odFswXSwgdFsxXSwgdFsyXSk7XHJcbiAgICAgICAgbSA9IG00LnhSb3RhdGUobSwgclswXSk7XHJcbiAgICAgICAgbSA9IG00LnlSb3RhdGUobSwgclsxXSk7XHJcbiAgICAgICAgbSA9IG00LnpSb3RhdGUobSwgclsyXSk7XHJcbiAgICAgICAgcmV0dXJuIG07XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgTm9kZSB7XHJcbiAgICBzdGF0aWMgbWFrZU1vZGVsKGVudGl0eURlc2NyaXB0aW9uLCByb290Tm9kZU5keCkge1xyXG4gICAgICAgIGNvbnN0IHsgbm9kZXMsIG1lc2hlcyB9ID0gZW50aXR5RGVzY3JpcHRpb247XHJcbiAgICAgICAgY29uc3Qgcm9vdE5vZGUgPSBub2Rlc1tyb290Tm9kZU5keF07XHJcbiAgICAgICAgY29uc3QgbWFrZU5vZGUgPSAobm9kZURlc2NyaXB0aW9uLCBuZHgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdHJzID0gbmV3IFRSUyhub2RlRGVzY3JpcHRpb24udHJhbnNsYXRpb24gfHwgWzAsIDAsIDBdLCBub2RlRGVzY3JpcHRpb24ucm90YXRpb24gfHwgWzAsIDAsIDBdLCBub2RlRGVzY3JpcHRpb24uc2NhbGUgfHwgWzEsIDEsIDFdKTtcclxuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IG5ldyBOb2RlKG5vZGVEZXNjcmlwdGlvbi5uYW1lLCB0cnMsIG5keCk7XHJcbiAgICAgICAgICAgIGlmIChub2RlRGVzY3JpcHRpb24ubWVzaCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUucmVuZGVyZXIgPSBtZXNoZXNbbm9kZURlc2NyaXB0aW9uLm1lc2hdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChub2RlRGVzY3JpcHRpb24uY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgIG5vZGVEZXNjcmlwdGlvbi5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZE5keCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gbWFrZU5vZGUobm9kZXNbY2hpbGROZHhdLCBjaGlsZE5keCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuc2V0UGFyZW50KG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gbWFrZU5vZGUocm9vdE5vZGUsIHJvb3ROb2RlTmR4KTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIHRycyA9IG5ldyBUUlMoKSkge1xyXG4gICAgICAgIHRoaXMud29ybGRNYXRyaXggPSBtNC5pZGVudGl0eSgpO1xyXG4gICAgICAgIHRoaXMucGFyZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuID0gW107XHJcbiAgICAgICAgdGhpcy50cnMgPSB0cnM7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLnBhcnRzID0gW107XHJcbiAgICAgICAgdGhpcy5uZHggPSBuZHg7XHJcbiAgICAgICAgdGhpcy5za2luTmR4ID0gbnVsbDtcclxuICAgICAgICB0aGlzLm9iamVjdHNUb0RyYXcgPSBbXTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyID0gbnVsbDtcclxuICAgIH1cclxuICAgIHNldFBhcmVudChwYXJlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5wYXJlbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgbmR4ID0gdGhpcy5wYXJlbnQuY2hpbGRyZW4uaW5kZXhPZih0aGlzKTtcclxuICAgICAgICAgICAgaWYgKG5keCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5jaGlsZHJlbi5zcGxpY2UobmR4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGFyZW50KSB7XHJcbiAgICAgICAgICAgIHBhcmVudC5jaGlsZHJlbi5wdXNoKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcclxuICAgIH1cclxuICAgIHVwZGF0ZVdvcmxkTWF0cml4KHBhcmVudFdvcmxkTWF0cml4KSB7XHJcbiAgICAgICAgbGV0IG1hdHJpeCA9IHRoaXMudHJzLmdldE1hdHJpeCgpO1xyXG4gICAgICAgIGlmIChwYXJlbnRXb3JsZE1hdHJpeCkge1xyXG4gICAgICAgICAgICBtYXRyaXggPSBtNC5tdWx0aXBseShwYXJlbnRXb3JsZE1hdHJpeCwgbWF0cml4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy53b3JsZE1hdHJpeCA9IG1hdHJpeDtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XHJcbiAgICAgICAgICAgIGNoaWxkLnVwZGF0ZVdvcmxkTWF0cml4KG1hdHJpeCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVQYXJ0c0xpc3QoKSB7XHJcbiAgICAgICAgY29uc3QgaXRlciA9IChub2RlLCBhcnIpID0+IHtcclxuICAgICAgICAgICAgYXJyLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IGl0ZXIoY2hpbGQsIGFycikpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaXRlcih0aGlzLCB0aGlzLnBhcnRzKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZU9iamVjdHNUb0RyYXcoKSB7XHJcbiAgICAgICAgY29uc3QgcXVldWUgPSBbdGhpc107XHJcbiAgICAgICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHF1ZXVlLnBvcCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhub2RlKTtcclxuICAgICAgICAgICAgaWYgKG5vZGUucmVuZGVyZXIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9iamVjdHNUb0RyYXcucHVzaChub2RlKTtcclxuICAgICAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW4pXHJcbiAgICAgICAgICAgICAgICBxdWV1ZS5wdXNoKC4uLm5vZGUuY2hpbGRyZW4pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHRyYXZlcnNlKGZuKSB7XHJcbiAgICAgICAgZm4odGhpcyk7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4gY2hpbGQudHJhdmVyc2UoZm4pKTtcclxuICAgIH1cclxuICAgIGZpbmQobmR4KSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgY29uc3QgaXRlciA9IChub2RlcykgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBub2RlIG9mIG5vZGVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5uZHggPT09IG5keClcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBub2RlO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZXIobm9kZS5jaGlsZHJlbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGl0ZXIoW3RoaXNdKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgZmluZEJ5TmFtZShuYW1lKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgY29uc3QgaXRlciA9IChub2RlcykgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBub2RlIG9mIG5vZGVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5uYW1lID09PSBuYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IG5vZGU7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlcihub2RlLmNoaWxkcmVuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaXRlcihbdGhpc10pO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICByZW5kZXIodW5pZm9ybXMsIGNhbWVyYU1hdHJpeCkge1xyXG4gICAgICAgIHRoaXMub2JqZWN0c1RvRHJhdy5mb3JFYWNoKChvYmplY3QpID0+IHtcclxuICAgICAgICAgICAgb2JqZWN0LnJlbmRlcmVyLmRyYXcoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB1bmlmb3JtcyksIHsgdV9tYXRyaXg6IG9iamVjdC53b3JsZE1hdHJpeCB9KSwgY2FtZXJhTWF0cml4KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5jbGFzcyBNb2RlbCBleHRlbmRzIE5vZGUge1xyXG4gICAgc3RhdGljIG1ha2VNb2RlbChlbnRpdHlEZXNjcmlwdGlvbiwgcm9vdE5vZGVOZHgpIHtcclxuICAgICAgICBjb25zdCB7IG5vZGVzLCBtZXNoZXMgfSA9IGVudGl0eURlc2NyaXB0aW9uO1xyXG4gICAgICAgIGNvbnN0IHJvb3ROb2RlID0gbm9kZXNbcm9vdE5vZGVOZHhdO1xyXG4gICAgICAgIGNvbnN0IG1ha2VOb2RlID0gKG5vZGVEZXNjcmlwdGlvbiwgbmR4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRycyA9IG5ldyBUUlMobm9kZURlc2NyaXB0aW9uLnRyYW5zbGF0aW9uIHx8IFswLCAwLCAwXSwgbm9kZURlc2NyaXB0aW9uLnJvdGF0aW9uIHx8IFswLCAwLCAwLCAwXSwgbm9kZURlc2NyaXB0aW9uLnNjYWxlIHx8IFsxLCAxLCAxXSk7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBuZXcgRW50aXR5KG5vZGVEZXNjcmlwdGlvbi5uYW1lLCB0cnMsIG5keCk7XHJcbiAgICAgICAgICAgIGlmIChub2RlRGVzY3JpcHRpb24ubWVzaCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUucmVuZGVyZXIgPSBtZXNoZXNbbm9kZURlc2NyaXB0aW9uLm1lc2hdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChub2RlRGVzY3JpcHRpb24uY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgIG5vZGVEZXNjcmlwdGlvbi5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZE5keCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gbWFrZU5vZGUobm9kZXNbY2hpbGROZHhdLCBjaGlsZE5keCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuc2V0UGFyZW50KG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gbWFrZU5vZGUocm9vdE5vZGUsIHJvb3ROb2RlTmR4KTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIHRycywgbmR4KSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSwgdHJzKTtcclxuICAgICAgICB0aGlzLm5keCA9IG5keDtcclxuICAgICAgICB0aGlzLnBoeXNpY3MgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc2tpbk5keCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzVG9EcmF3ID0gW107XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG51bGw7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVPYmplY3RzVG9EcmF3KCkge1xyXG4gICAgICAgIGNvbnN0IHF1ZXVlID0gW3RoaXNdO1xyXG4gICAgICAgIHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBxdWV1ZS5wb3AoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobm9kZSk7XHJcbiAgICAgICAgICAgIGlmIChub2RlLnJlbmRlcmVyKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vYmplY3RzVG9EcmF3LnB1c2gobm9kZSk7XHJcbiAgICAgICAgICAgIGlmIChub2RlLmNoaWxkcmVuKVxyXG4gICAgICAgICAgICAgICAgcXVldWUucHVzaCguLi5ub2RlLmNoaWxkcmVuKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB0cmF2ZXJzZShmbikge1xyXG4gICAgICAgIGZuKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IGNoaWxkLnRyYXZlcnNlKGZuKSk7XHJcbiAgICB9XHJcbiAgICBmaW5kKG5keCkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xyXG4gICAgICAgIGNvbnN0IGl0ZXIgPSAobm9kZXMpID0+IHtcclxuICAgICAgICAgICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubmR4ID09PSBuZHgpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gbm9kZTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBpdGVyKG5vZGUuY2hpbGRyZW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpdGVyKFt0aGlzXSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIGZpbmRCeU5hbWUobmFtZSkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xyXG4gICAgICAgIGNvbnN0IGl0ZXIgPSAobm9kZXMpID0+IHtcclxuICAgICAgICAgICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubmFtZSA9PT0gbmFtZSlcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBub2RlO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZXIobm9kZS5jaGlsZHJlbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGl0ZXIoW3RoaXNdKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKHVuaWZvcm1zLCBjYW1lcmFNYXRyaXgpIHtcclxuICAgICAgICB0aGlzLm9iamVjdHNUb0RyYXcuZm9yRWFjaCgob2JqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIG9iamVjdC5yZW5kZXJlci5kcmF3KE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdW5pZm9ybXMpLCB7IHVfbWF0cml4OiBvYmplY3Qud29ybGRNYXRyaXggfSksIGNhbWVyYU1hdHJpeCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgTW9kZWw7XHJcbiIsImltcG9ydCB7IEJ1ZmZlckF0dHJpYnV0ZUluZm8gfSBmcm9tIFwiLi9CdWZmZXJBdHRyaWJ1dGVcIjtcclxuY2xhc3MgUHJpbWl0aXZlUmVuZGVyZXIge1xyXG4gICAgY29uc3RydWN0b3IoZ2wpIHtcclxuICAgICAgICB0aGlzLmJ1ZmZlckF0dHJpYnMgPSB7fTtcclxuICAgICAgICB0aGlzLnByb2dyYW1JbmZvID0gbnVsbDtcclxuICAgICAgICB0aGlzLmdsID0gZ2w7XHJcbiAgICAgICAgdGhpcy5kcmF3ZXIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubW9kZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5vZmZzZXQgPSAwO1xyXG4gICAgICAgIHRoaXMubnVtRWxlbWVudHMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuVkFPID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudFR5cGUgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgc2V0Q29udGV4dChnbCkge1xyXG4gICAgICAgIHRoaXMuZ2wgPSBnbDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGNyZWF0ZVZBTygpIHtcclxuICAgICAgICBpZiAodGhpcy5WQU8pXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIHRoaXMuVkFPID0gdGhpcy5nbC5jcmVhdGVWZXJ0ZXhBcnJheSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2V0TW9kZShtb2RlKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlID0gbW9kZTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNldE51bUVsZW1lbnRzKG51bUVsZW1lbnRzKSB7XHJcbiAgICAgICAgdGhpcy5udW1FbGVtZW50cyA9IG51bUVsZW1lbnRzO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2V0T2Zmc2V0KG9mZnNldCkge1xyXG4gICAgICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2V0SW5kaWNlcyhhcnJheUJ1ZmZlcikge1xyXG4gICAgICAgIGNvbnN0IHsgZ2wsIFZBTyB9ID0gdGhpcztcclxuICAgICAgICBnbC5iaW5kVmVydGV4QXJyYXkoVkFPKTtcclxuICAgICAgICB0aGlzLm51bUVsZW1lbnRzID0gYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCAvIDI7XHJcbiAgICAgICAgY29uc3QgaW5kaWNlc0J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xyXG4gICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGluZGljZXNCdWZmZXIpO1xyXG4gICAgICAgIGdsLmJ1ZmZlckRhdGEoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGFycmF5QnVmZmVyLCBnbC5TVEFUSUNfRFJBVyk7XHJcbiAgICAgICAgZ2wuYmluZFZlcnRleEFycmF5KG51bGwpO1xyXG4gICAgICAgIHRoaXMuaW5kaWNlcyA9IGluZGljZXNCdWZmZXI7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBjcmVhdGVHZW9tZXRyeUJ1ZmZlcnMoYXJyYXlEYXRhKSB7XHJcbiAgICAgICAgY29uc3QgeyBnbCB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCB7IGF0dHJpYnV0ZXMsIGluZGljZXMsIGNvbXBvbmVudFR5cGUsIG51bUVsZW1lbnRzLCBtb2RlLCBvZmZzZXQgfSA9IGFycmF5RGF0YTtcclxuICAgICAgICB0aGlzLm51bUVsZW1lbnRzID0gbnVtRWxlbWVudHM7XHJcbiAgICAgICAgdGhpcy5tb2RlID0gbW9kZTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudFR5cGUgPSBjb21wb25lbnRUeXBlIHx8IDUxMjM7XHJcbiAgICAgICAgdGhpcy5vZmZzZXQgPSAwO1xyXG4gICAgICAgIGlmIChhdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goKGF0dHJpYnV0ZU5hbWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGF0dHJpYlByb3BzID0gYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJ1ZmZlckF0dHJpYnV0ZUluZm8gPSBuZXcgQnVmZmVyQXR0cmlidXRlSW5mbyhnbCwgYXR0cmliUHJvcHMpO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyQXR0cmlidXRlSW5mby5idWZmZXJEYXRhKGF0dHJpYlByb3BzLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idWZmZXJBdHRyaWJzW2F0dHJpYnV0ZU5hbWVdID0gYnVmZmVyQXR0cmlidXRlSW5mbztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbmRpY2VzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGljZXNCdWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcclxuICAgICAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgaW5kaWNlc0J1ZmZlcik7XHJcbiAgICAgICAgICAgIGdsLmJ1ZmZlckRhdGEoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGluZGljZXMsIGdsLlNUQVRJQ19EUkFXKTtcclxuICAgICAgICAgICAgdGhpcy5pbmRpY2VzID0gaW5kaWNlc0J1ZmZlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBzZXRBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXM7XHJcbiAgICAgICAgZ2wuYmluZFZlcnRleEFycmF5KHRoaXMuVkFPKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGF0dHJpYiBpbiB0aGlzLmJ1ZmZlckF0dHJpYnMpIHtcclxuICAgICAgICAgICAgY29uc3QgYnVmZmVyQXR0cmlidXRlSW5mbyA9IHRoaXMuYnVmZmVyQXR0cmlic1thdHRyaWJdO1xyXG4gICAgICAgICAgICBidWZmZXJBdHRyaWJ1dGVJbmZvLnNldEF0dHJpYnV0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLmluZGljZXMpO1xyXG4gICAgICAgIGdsLmJpbmRWZXJ0ZXhBcnJheShudWxsKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNldERyYXdlcihkcmF3ZXIpIHtcclxuICAgICAgICB0aGlzLmRyYXdlciA9IGRyYXdlcjtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNldFByb2dyYW1JbmZvKHByb2dyYW1JbmZvKSB7XHJcbiAgICAgICAgdGhpcy5wcm9ncmFtSW5mbyA9IHByb2dyYW1JbmZvO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlQnVmZmVyQXR0cmliRGF0YSh7IGF0dHJpYk5hbWUsIGxvY2F0aW9uLCBzdHJpZGUsIG51bUNvbXBvbmVudHMsIG9mZnNldCwgdHlwZSwgZGl2aXNvciwgYXR0cmlidXRlVHlwZSwgfSkge1xyXG4gICAgICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgYnVmZmVyQXR0cmliSW5mbyA9IG5ldyBCdWZmZXJBdHRyaWJ1dGVJbmZvKGdsLCB7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLFxyXG4gICAgICAgICAgICBzdHJpZGUsXHJcbiAgICAgICAgICAgIG51bUNvbXBvbmVudHMsXHJcbiAgICAgICAgICAgIG9mZnNldCxcclxuICAgICAgICAgICAgdHlwZSxcclxuICAgICAgICAgICAgZGl2aXNvcixcclxuICAgICAgICAgICAgYXR0cmlidXRlVHlwZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmJ1ZmZlckF0dHJpYnNbYXR0cmliTmFtZV0gPSBidWZmZXJBdHRyaWJJbmZvO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgLypcclxuICAgIHNldEJ1ZmZlckF0dHJpYkRhdGEobmFtZSwgYnVmZmVyQXR0cmliRGF0YSkge1xyXG4gICAgICB0aGlzLmJ1ZmZlcnMgPSB7IC4uLnRoaXMuYnVmZmVycywgW25hbWVdOiBidWZmZXJBdHRyaWJEYXRhIH07XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgKi9cclxuICAgIHNldEF0dHJpYnV0ZShhdHRyaWJOYW1lKSB7XHJcbiAgICAgICAgY29uc3QgeyBnbCB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCBidWZmZXJBdHRyaWJEYXRhID0gdGhpcy5idWZmZXJBdHRyaWJzW2F0dHJpYk5hbWVdO1xyXG4gICAgICAgIGdsLmJpbmRWZXJ0ZXhBcnJheSh0aGlzLlZBTyk7XHJcbiAgICAgICAgYnVmZmVyQXR0cmliRGF0YS5zZXRBdHRyaWJ1dGUoKTtcclxuICAgICAgICBnbC5iaW5kVmVydGV4QXJyYXkobnVsbCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgX3NldEF0dHJpYnV0ZShidWZmZXJBdHRyaWJEYXRhKSB7XHJcbiAgICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXM7XHJcbiAgICAgIGdsLmJpbmRWZXJ0ZXhBcnJheSh0aGlzLnZhbyk7XHJcbiAgICAgIGJ1ZmZlckF0dHJpYkRhdGEuc2V0QXR0cmlidXRlKCk7XHJcbiAgICAgIGdsLmJpbmRWZXJ0ZXhBcnJheShudWxsKTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAqL1xyXG4gICAgYnVmZmVyRGF0YShhdHRyaWJOYW1lLCBkYXRhLCB1c2FnZSkge1xyXG4gICAgICAgIGNvbnN0IGJ1ZmZlckF0dHJpYkluZm8gPSB0aGlzLmJ1ZmZlckF0dHJpYnNbYXR0cmliTmFtZV07XHJcbiAgICAgICAgYnVmZmVyQXR0cmliSW5mby5idWZmZXJEYXRhKGRhdGEsIHVzYWdlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGJ1ZmZlclN1YkRhdGEoYXR0cmliTmFtZSwgZGF0YSwgb2Zmc2V0KSB7XHJcbiAgICAgICAgY29uc3QgYnVmZmVyQXR0cmliSW5mbyA9IHRoaXMuYnVmZmVyQXR0cmlic1thdHRyaWJOYW1lXTtcclxuICAgICAgICBidWZmZXJBdHRyaWJJbmZvLmJ1ZmZlclN1YkRhdGEoZGF0YSwgb2Zmc2V0KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGFsbG9jQnVmZmVyKGF0dHJpYk5hbWUsIGJ5dGVMZW5ndGgsIHVzYWdlKSB7XHJcbiAgICAgICAgY29uc3QgYnVmZmVyQXR0cmliSW5mbyA9IHRoaXMuYnVmZmVyQXR0cmlic1thdHRyaWJOYW1lXTtcclxuICAgICAgICBidWZmZXJBdHRyaWJJbmZvLmFsbG9jQnVmZmVyKGJ5dGVMZW5ndGgsIHVzYWdlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGRyYXcodW5pZm9ybXMsIGNhbWVyYU1hdHJpeCkge1xyXG4gICAgICAgIHRoaXMuZHJhd2VyLmRyYXcodGhpcywgdW5pZm9ybXMsIGNhbWVyYU1hdHJpeCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBkcmF3SW5zdGFuY2VkKHVuaWZvcm1zLCBjYW1lcmFNYXRyaXgsIG51bUluc3RhbmNlcykge1xyXG4gICAgICAgIHRoaXMuZHJhd2VyLmRyYXdJbnN0YW5jZWQodGhpcywgdW5pZm9ybXMsIGNhbWVyYU1hdHJpeCwgbnVtSW5zdGFuY2VzKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBQcmltaXRpdmVSZW5kZXJlcjtcclxuIiwiaW1wb3J0IHsgdjMgfSBmcm9tICdyb21hbnBwcG1hdGgnO1xyXG5pbXBvcnQgeyBGTE9BVF9WRUMyLCBGTE9BVF9WRUMzIH0gZnJvbSBcIi4vZW51bXNcIjtcclxuY29uc3QgeyBjcm9zcywgZGlmZiwgbm9ybWFsaXplIH0gPSB2MztcclxuY29uc3QgbGluZWRCb3hJbmRpY2VzID0gbmV3IFVpbnQxNkFycmF5KFtcclxuICAgIDAsXHJcbiAgICAxLFxyXG4gICAgMSxcclxuICAgIDIsXHJcbiAgICAyLFxyXG4gICAgMyxcclxuICAgIDMsXHJcbiAgICAwLFxyXG4gICAgMCxcclxuICAgIDUsXHJcbiAgICA1LFxyXG4gICAgNCxcclxuICAgIDQsXHJcbiAgICAxLFxyXG4gICAgMSxcclxuICAgIDAsXHJcbiAgICAwLFxyXG4gICAgNCxcclxuICAgIDQsXHJcbiAgICA3LFxyXG4gICAgNyxcclxuICAgIDMsXHJcbiAgICAzLFxyXG4gICAgMCxcclxuICAgIDEsXHJcbiAgICAyLFxyXG4gICAgMixcclxuICAgIDYsXHJcbiAgICA2LFxyXG4gICAgNSxcclxuICAgIDUsXHJcbiAgICAxLFxyXG4gICAgNCxcclxuICAgIDUsXHJcbiAgICA1LFxyXG4gICAgNixcclxuICAgIDYsXHJcbiAgICA3LFxyXG4gICAgNyxcclxuICAgIDQsXHJcbiAgICAyLFxyXG4gICAgNyxcclxuICAgIDcsXHJcbiAgICAzLFxyXG4gICAgMyxcclxuICAgIDYsXHJcbiAgICA2LFxyXG4gICAgMiwgLy8gdG9wXHJcbl0pO1xyXG5jb25zdCBDVUJFX0ZBQ0VfSU5ESUNFUyA9IFtcclxuICAgIFszLCA3LCA1LCAxXSxcclxuICAgIFs2LCAyLCAwLCA0XSxcclxuICAgIFs2LCA3LCAzLCAyXSxcclxuICAgIFswLCAxLCA1LCA0XSxcclxuICAgIFs3LCA2LCA0LCA1XSxcclxuICAgIFsyLCAzLCAxLCAwXSwgLy8gYmFja1xyXG5dO1xyXG5mdW5jdGlvbiBjcmVhdGVCb3goX2EgPSAxLCBfYiA9IDEsIF9jID0gMSkge1xyXG4gICAgY29uc3QgYSA9IF9hIC8gMiwgYiA9IF9iIC8gMiwgYyA9IF9jIC8gMjtcclxuICAgIGNvbnN0IGNvcm5lclZlcnRpY2VzID0gW1xyXG4gICAgICAgIFstYSwgLWIsIC1jXSxcclxuICAgICAgICBbK2EsIC1iLCAtY10sXHJcbiAgICAgICAgWy1hLCArYiwgLWNdLFxyXG4gICAgICAgIFsrYSwgK2IsIC1jXSxcclxuICAgICAgICBbLWEsIC1iLCArY10sXHJcbiAgICAgICAgWythLCAtYiwgK2NdLFxyXG4gICAgICAgIFstYSwgK2IsICtjXSxcclxuICAgICAgICBbK2EsICtiLCArY10sXHJcbiAgICBdO1xyXG4gICAgY29uc3QgZmFjZU5vcm1hbHMgPSBbXHJcbiAgICAgICAgWysxLCArMCwgKzBdLFxyXG4gICAgICAgIFstMSwgKzAsICswXSxcclxuICAgICAgICBbKzAsICsxLCArMF0sXHJcbiAgICAgICAgWyswLCAtMSwgKzBdLFxyXG4gICAgICAgIFsrMCwgKzAsICsxXSxcclxuICAgICAgICBbKzAsICswLCAtMV0sXHJcbiAgICBdO1xyXG4gICAgY29uc3QgdXZDb29yZHMgPSBbXHJcbiAgICAgICAgWzEsIDBdLFxyXG4gICAgICAgIFswLCAwXSxcclxuICAgICAgICBbMCwgMV0sXHJcbiAgICAgICAgWzEsIDFdLFxyXG4gICAgXTtcclxuICAgIGNvbnN0IHBvc2l0aW9ucyA9IFtdO1xyXG4gICAgY29uc3Qgbm9ybWFscyA9IFtdO1xyXG4gICAgLy9jb25zdCB0ZXhDb29yZHMgPSB3ZWJnbFV0aWxzLmNyZWF0ZUF1Z21lbnRlZFR5cGVkQXJyYXkoMiAsIG51bVZlcnRpY2VzKTtcclxuICAgIGNvbnN0IGluZGljZXMgPSBbXTtcclxuICAgIGZvciAobGV0IGYgPSAwOyBmIDwgNjsgKytmKSB7XHJcbiAgICAgICAgY29uc3QgZmFjZUluZGljZXMgPSBDVUJFX0ZBQ0VfSU5ESUNFU1tmXTtcclxuICAgICAgICBmb3IgKGxldCB2ID0gMDsgdiA8IDQ7ICsrdikge1xyXG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IGNvcm5lclZlcnRpY2VzW2ZhY2VJbmRpY2VzW3ZdXTtcclxuICAgICAgICAgICAgY29uc3Qgbm9ybWFsID0gZmFjZU5vcm1hbHNbZl07XHJcbiAgICAgICAgICAgIHBvc2l0aW9ucy5wdXNoKC4uLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgbm9ybWFscy5wdXNoKC4uLm5vcm1hbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG9mZnNldCA9IDQgKiBmO1xyXG4gICAgICAgIGluZGljZXMucHVzaChvZmZzZXQgKyAwLCBvZmZzZXQgKyAxLCBvZmZzZXQgKyAyKTtcclxuICAgICAgICBpbmRpY2VzLnB1c2gob2Zmc2V0ICsgMCwgb2Zmc2V0ICsgMiwgb2Zmc2V0ICsgMyk7XHJcbiAgICB9XHJcbiAgICBjb25zdCB0ZXhjb29yZCA9IG5ldyBGbG9hdDMyQXJyYXkoW1xyXG4gICAgICAgIC8vIEZyb250XHJcbiAgICAgICAgMC4wLCAwLjAsIDEuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAxLjAsXHJcbiAgICAgICAgLy8gQmFja1xyXG4gICAgICAgIDAuMCwgMC4wLCAxLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMS4wLFxyXG4gICAgICAgIC8vIFRvcFxyXG4gICAgICAgIDAuMCwgMC4wLCAxLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMS4wLFxyXG4gICAgICAgIC8vIEJvdHRvbVxyXG4gICAgICAgIDAuMCwgMC4wLCAxLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMS4wLFxyXG4gICAgICAgIC8vIFJpZ2h0XHJcbiAgICAgICAgMC4wLCAwLjAsIDEuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAxLjAsXHJcbiAgICAgICAgLy8gTGVmdFxyXG4gICAgICAgIDAuMCwgMC4wLCAxLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMS4wLFxyXG4gICAgXSk7XHJcbiAgICBjb25zdCBfbm9ybWFscyA9IG5ldyBGbG9hdDMyQXJyYXkobm9ybWFscyk7XHJcbiAgICBjb25zdCBfcG9zaXRpb25zID0gbmV3IEZsb2F0MzJBcnJheShwb3NpdGlvbnMpO1xyXG4gICAgY29uc3QgX2luZGljZXMgPSBuZXcgVWludDE2QXJyYXkoaW5kaWNlcyk7XHJcbiAgICBjb25zdCBfdGV4Y29vcmRzID0gbmV3IEZsb2F0MzJBcnJheSh0ZXhjb29yZCk7XHJcbiAgICBjb25zdCBBcnJheURhdGEgPSB7XHJcbiAgICAgICAgYXR0cmlidXRlczoge1xyXG4gICAgICAgICAgICBOT1JNQUw6IHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IF9ub3JtYWxzLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IDYgKiA0ICogMyxcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAxLFxyXG4gICAgICAgICAgICAgICAgYnl0ZUxlbmd0aDogX25vcm1hbHMuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgIHN0cmlkZTogMCxcclxuICAgICAgICAgICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICAgICAgICAgIG51bUNvbXBvbmVudHM6IDMsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiA1MTI2LFxyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlVHlwZTogRkxPQVRfVkVDM1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBQT1NJVElPTjoge1xyXG4gICAgICAgICAgICAgICAgZGF0YTogX3Bvc2l0aW9ucyxcclxuICAgICAgICAgICAgICAgIGNvdW50OiA2ICogNCAqIDMsXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogMCxcclxuICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGg6IF9wb3NpdGlvbnMuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgIHN0cmlkZTogMCxcclxuICAgICAgICAgICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICAgICAgICAgIG51bUNvbXBvbmVudHM6IDMsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiA1MTI2LFxyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlVHlwZTogRkxPQVRfVkVDM1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBURVhDT09SRF8wOiB7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiBfdGV4Y29vcmRzLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IDQ4LFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNTEyNixcclxuICAgICAgICAgICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICAgICAgICAgIHN0cmlkZTogMCxcclxuICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGg6IF90ZXhjb29yZHMuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiA0LFxyXG4gICAgICAgICAgICAgICAgbnVtQ29tcG9uZW50czogMixcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGU6IEZMT0FUX1ZFQzJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluZGljZXM6IF9pbmRpY2VzLFxyXG4gICAgICAgIG51bUVsZW1lbnRzOiBfaW5kaWNlcy5sZW5ndGgsXHJcbiAgICAgICAgY29tcG9uZW50VHlwZTogNTEyMyxcclxuICAgICAgICBtb2RlOiA0LFxyXG4gICAgfTtcclxuICAgIHJldHVybiBBcnJheURhdGE7XHJcbiAgICAvKnJldHVybiB7XHJcbiAgICAgICAgICAgIGdsdGYgOiB7XHJcbiAgICAgICAgICAgICAgYWNjZXNzb3JzIDogW1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgYnVmZmVyVmlldyA6IDAsXHJcbiAgICAgICAgICAgICAgICAgIGJ5dGVPZmZzZXQgOiAwLFxyXG4gICAgICAgICAgICAgICAgICBjb3VudCA6NzIsXHJcbiAgICAgICAgICAgICAgICAgIGNvbXBvbmVudFR5cGUgOiA1MTI2LFxyXG4gICAgICAgICAgICAgICAgICB0eXBlIDogJ1ZFQzMnXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBidWZmZXJWaWV3IDogMSxcclxuICAgICAgICAgICAgICAgIGJ5dGVPZmZzZXQgOiAwLFxyXG4gICAgICAgICAgICAgICAgY291bnQgOiA3MixcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudFR5cGUgOiA1MTI2LFxyXG4gICAgICAgICAgICAgICAgdHlwZSA6ICdWRUMzJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyVmlldyA6IDIsXHJcbiAgICAgICAgICAgICAgICBieXRlT2Zmc2V0IDogMCxcclxuICAgICAgICAgICAgICAgIGNvdW50IDogMzYsXHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnRUeXBlIDogNTEyMyxcclxuICAgICAgICAgICAgICAgIHR5cGUgOiAnU0NBTEFSJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyVmlldyA6IDMsXHJcbiAgICAgICAgICAgICAgICBieXRlT2Zmc2V0IDogMCxcclxuICAgICAgICAgICAgICAgIGNvdW50IDogNDgsXHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnRUeXBlIDogNTEyNixcclxuICAgICAgICAgICAgICAgIHR5cGUgOiAnVkVDMidcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgYnVmZmVyVmlld3MgOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIGJ1ZmZlciA6IDAsXHJcbiAgICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGggOiBwb3NpdGlvbnMuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgICAgYnl0ZU9mZnNldCA6IDBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIGJ1ZmZlciA6IDEsXHJcbiAgICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGggOiBub3JtYWxzLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgIGJ5dGVPZmZzZXQgOiAwXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICBidWZmZXIgOiAyLFxyXG4gICAgICAgICAgICAgICAgICBieXRlTGVuZ3RoIDogaW5kaWNlcy5ieXRlTGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgICBieXRlT2Zmc2V0IDogMFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgYnVmZmVyIDogMyxcclxuICAgICAgICAgICAgICAgICAgYnl0ZUxlbmd0aCA6IHRleGNvb3JkLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgIGJ5dGVPZmZzZXQgOiAwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgbWVzaGVzIDogW1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWUgOiAnQ3ViZScsXHJcbiAgICAgICAgICAgICAgICBwcmltaXRpdmVzIDogW1xyXG4gICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlcyA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgIE5PUk1BTCA6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICBQT1NJVElPTiA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICBURVhDT09SRF8wIDogM1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kaWNlcyA6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZSA6IDRcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgbm9kZXMgOiBbXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZSA6IFwiQ3ViZVwiLFxyXG4gICAgICAgICAgICAgICAgbWVzaCA6IDAsXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbiA6IFsxXVxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZSA6ICdDdWJlMicsXHJcbiAgICAgICAgICAgICAgICBtZXNoIDogMCxcclxuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uIDogWzEsMSwxXVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGJpbmFyeUJ1ZmZlcnMgOiBbXHJcbiAgICAgICAgICAgIHBvc2l0aW9ucy5idWZmZXIsIG5vcm1hbHMuYnVmZmVyLCBpbmRpY2VzLmJ1ZmZlciwgdGV4Y29vcmQuYnVmZmVyXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfTsqL1xyXG59XHJcbmNvbnN0IGNyZWF0ZUNvbmUgPSAocmFkaXVzID0gMiwgaGVpZ2h0ID0gMiwgbnVtQ29ybmVycyA9IDQpID0+IHtcclxuICAgIGNvbnN0IHZlcnRpY2VzID0gWzAsIC1oZWlnaHQgLyAyLCAwXTtcclxuICAgIGNvbnN0IG5vcm1hbHMgPSBbXTtcclxuICAgIGNvbnN0IGluZGljZXMgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtQ29ybmVycyArIDE7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGFuZ2xlID0gKDIgKiBpICogTWF0aC5QSSkgLyBudW1Db3JuZXJzO1xyXG4gICAgICAgIGNvbnN0IHggPSBNYXRoLmNvcyhhbmdsZSkgKiByYWRpdXM7XHJcbiAgICAgICAgY29uc3QgeiA9IE1hdGguc2luKGFuZ2xlKSAqIHJhZGl1cztcclxuICAgICAgICBjb25zdCB5ID0gLWhlaWdodCAvIDI7XHJcbiAgICAgICAgdmVydGljZXMucHVzaCh4LCAtaGVpZ2h0IC8gMiwgeik7XHJcbiAgICAgICAgbm9ybWFscy5wdXNoKDAsIC0xLCAwKTtcclxuICAgIH1cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtQ29ybmVyczsgaSsrKSB7XHJcbiAgICAgICAgaW5kaWNlcy5wdXNoKDAsIGkgKyAxLCBpICsgMik7XHJcbiAgICB9XHJcbiAgICAvL3ZlcnRpY2VzLnB1c2godmVydGljZXNbMV0sIC1oZWlnaHQvMiwgdmVydGljZXNbM10pXHJcbiAgICBjb25zdCBuID0gdmVydGljZXMubGVuZ3RoIC8gMztcclxuICAgIGNvbnN0IHN0cmlkZSA9IDM7XHJcbiAgICBjb25zdCBzdGFydCA9IG47XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNvcm5lcnMgKyAyOyBpKyspIHtcclxuICAgICAgICBjb25zdCBhbmdsZSA9ICgyICogaSAqIE1hdGguUEkpIC8gbnVtQ29ybmVycztcclxuICAgICAgICBjb25zdCB4ID0gTWF0aC5jb3MoYW5nbGUpICogcmFkaXVzO1xyXG4gICAgICAgIGNvbnN0IHogPSBNYXRoLnNpbihhbmdsZSkgKiByYWRpdXM7XHJcbiAgICAgICAgY29uc3QgeSA9IC1oZWlnaHQgLyAyO1xyXG4gICAgICAgIGNvbnN0IGEgPSBbdmVydGljZXNbaSAqIDNdLCB2ZXJ0aWNlc1tpICogMyArIDFdLCB2ZXJ0aWNlc1tpICogMyArIDJdXTtcclxuICAgICAgICBjb25zdCBiID0gW3ZlcnRpY2VzW2kgKiAzICsgM10sIHZlcnRpY2VzW2kgKiAzICsgNF0sIHZlcnRpY2VzW2kgKiAzICsgNV1dO1xyXG4gICAgICAgIGNvbnN0IGMgPSBbMCwgaGVpZ2h0IC8gMiwgMF07XHJcbiAgICAgICAgaW5kaWNlcy5wdXNoKHN0YXJ0ICsgaSAqIHN0cmlkZSArIDIsIHN0YXJ0ICsgaSAqIHN0cmlkZSArIDEsIHN0YXJ0ICsgaSAqIHN0cmlkZSArIDMpO1xyXG4gICAgICAgIHZlcnRpY2VzLnB1c2goLi4uYywgLi4uYSwgLi4uYik7XHJcbiAgICAgICAgY29uc3Qgbm9ybWFsID0gbm9ybWFsaXplKGNyb3NzKGRpZmYoYiwgYyksIGRpZmYoYSwgYykpKTtcclxuICAgICAgICBub3JtYWxzLnB1c2goLi4ubm9ybWFsLCAuLi5ub3JtYWwsIC4uLm5vcm1hbCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBfbm9ybWFsID0gbmV3IEZsb2F0MzJBcnJheShub3JtYWxzKTtcclxuICAgIGNvbnN0IF9wb3NpdGlvbiA9IG5ldyBGbG9hdDMyQXJyYXkodmVydGljZXMpO1xyXG4gICAgY29uc3QgX2luZGljZXMgPSBuZXcgVWludDE2QXJyYXkoaW5kaWNlcyk7XHJcbiAgICBjb25zdCBBcnJheURhdGEgPSB7XHJcbiAgICAgICAgYXR0cmlidXRlczoge1xyXG4gICAgICAgICAgICBQT1NJVElPTjoge1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb246IDAsXHJcbiAgICAgICAgICAgICAgICBjb3VudDogdmVydGljZXMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAwLFxyXG4gICAgICAgICAgICAgICAgc3RyaWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgbnVtQ29tcG9uZW50czogMyxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDUxMjYsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBfcG9zaXRpb24sXHJcbiAgICAgICAgICAgICAgICBieXRlTGVuZ3RoOiBfcG9zaXRpb24uYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGU6IEZMT0FUX1ZFQzNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgTk9STUFMOiB7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogMSxcclxuICAgICAgICAgICAgICAgIGNvdW50OiBub3JtYWxzLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgIG51bUNvbXBvbmVudHM6IDMsXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IDAsXHJcbiAgICAgICAgICAgICAgICBzdHJpZGU6IDAsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiA1MTI2LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogX25vcm1hbCxcclxuICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGg6IF9ub3JtYWwuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGU6IEZMT0FUX1ZFQzNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBvbmVudFR5cGU6IDUxMjMsXHJcbiAgICAgICAgaW5kaWNlczogX2luZGljZXMsXHJcbiAgICAgICAgbnVtRWxlbWVudHM6IGluZGljZXMubGVuZ3RoLFxyXG4gICAgICAgIG1vZGU6IDQsXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEFycmF5RGF0YTtcclxufTtcclxuY29uc3QgY3JlYXRlQ2lyY2xlID0gKHJhZGl1cywgbnVtQ29ybmVycykgPT4ge1xyXG4gICAgY29uc3QgdmVydGljZXMgPSBbMCwgMCwgMF07XHJcbiAgICBjb25zdCBub3JtYWxzID0gW107XHJcbiAgICBjb25zdCBpbmRpY2VzID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNvcm5lcnMgKyAxOyBpKyspIHtcclxuICAgICAgICBjb25zdCBhbmdsZSA9ICgyICogaSAqIE1hdGguUEkpIC8gbnVtQ29ybmVycztcclxuICAgICAgICBjb25zdCB4ID0gTWF0aC5jb3MoYW5nbGUpICogcmFkaXVzO1xyXG4gICAgICAgIGNvbnN0IHogPSBNYXRoLnNpbihhbmdsZSkgKiByYWRpdXM7XHJcbiAgICAgICAgdmVydGljZXMucHVzaCh4LCAwLCB6KTtcclxuICAgICAgICBub3JtYWxzLnB1c2goMCwgMSwgMCk7XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNvcm5lcnM7IGkrKykge1xyXG4gICAgICAgIGluZGljZXMucHVzaCgwLCBpICsgMSwgaSArIDIpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgX25vcm1hbCA9IG5ldyBGbG9hdDMyQXJyYXkobm9ybWFscyk7XHJcbiAgICBjb25zdCBfcG9zaXRpb24gPSBuZXcgRmxvYXQzMkFycmF5KHZlcnRpY2VzKTtcclxuICAgIGNvbnN0IF9pbmRpY2VzID0gbmV3IFVpbnQxNkFycmF5KGluZGljZXMpO1xyXG4gICAgY29uc3QgQXJyYXlEYXRhID0ge1xyXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcclxuICAgICAgICAgICAgUE9TSVRJT046IHtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAwLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IHZlcnRpY2VzLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICAgICAgICAgIHN0cmlkZTogMCxcclxuICAgICAgICAgICAgICAgIG51bUNvbXBvbmVudHM6IDMsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiA1MTI2LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogX3Bvc2l0aW9uLFxyXG4gICAgICAgICAgICAgICAgYnl0ZUxlbmd0aDogX3Bvc2l0aW9uLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVUeXBlOiBGTE9BVF9WRUMzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIE5PUk1BTDoge1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb246IDEsXHJcbiAgICAgICAgICAgICAgICBjb3VudDogbm9ybWFscy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBudW1Db21wb25lbnRzOiAzLFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAwLFxyXG4gICAgICAgICAgICAgICAgc3RyaWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNTEyNixcclxuICAgICAgICAgICAgICAgIGRhdGE6IF9ub3JtYWwsXHJcbiAgICAgICAgICAgICAgICBieXRlTGVuZ3RoOiBfbm9ybWFsLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVUeXBlOiBGTE9BVF9WRUMzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wb25lbnRUeXBlOiA1MTIzLFxyXG4gICAgICAgIGluZGljZXM6IF9pbmRpY2VzLFxyXG4gICAgICAgIG51bUVsZW1lbnRzOiBpbmRpY2VzLmxlbmd0aCxcclxuICAgICAgICBtb2RlOiA0LFxyXG4gICAgfTtcclxuICAgIHJldHVybiBBcnJheURhdGE7XHJcbn07XHJcbmNvbnN0IGNyZWF0ZVNwaGVyZSA9IChyYWRpdXMsIHN1YmRpdmlzaW9uc0F4aXMsIHN1YmRpdmlzaW9uc0hlaWdodCwgb3B0X3N0YXJ0TGF0aXR1ZGVJblJhZGlhbnMsIG9wdF9lbmRMYXRpdHVkZUluUmFkaWFucywgb3B0X3N0YXJ0TG9uZ2l0dWRlSW5SYWRpYW5zLCBvcHRfZW5kTG9uZ2l0dWRlSW5SYWRpYW5zKSA9PiB7XHJcbiAgICBpZiAoc3ViZGl2aXNpb25zQXhpcyA8PSAwIHx8IHN1YmRpdmlzaW9uc0hlaWdodCA8PSAwKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic3ViZGl2aXNpb25BeGlzIGFuZCBzdWJkaXZpc2lvbkhlaWdodCBtdXN0IGJlID4gMFwiKTtcclxuICAgIH1cclxuICAgIG9wdF9zdGFydExhdGl0dWRlSW5SYWRpYW5zID0gb3B0X3N0YXJ0TGF0aXR1ZGVJblJhZGlhbnMgfHwgMDtcclxuICAgIG9wdF9lbmRMYXRpdHVkZUluUmFkaWFucyA9IG9wdF9lbmRMYXRpdHVkZUluUmFkaWFucyB8fCBNYXRoLlBJO1xyXG4gICAgb3B0X3N0YXJ0TG9uZ2l0dWRlSW5SYWRpYW5zID0gb3B0X3N0YXJ0TG9uZ2l0dWRlSW5SYWRpYW5zIHx8IDA7XHJcbiAgICBvcHRfZW5kTG9uZ2l0dWRlSW5SYWRpYW5zID0gb3B0X2VuZExvbmdpdHVkZUluUmFkaWFucyB8fCBNYXRoLlBJICogMjtcclxuICAgIGNvbnN0IGxhdFJhbmdlID0gb3B0X2VuZExhdGl0dWRlSW5SYWRpYW5zIC0gb3B0X3N0YXJ0TGF0aXR1ZGVJblJhZGlhbnM7XHJcbiAgICBjb25zdCBsb25nUmFuZ2UgPSBvcHRfZW5kTG9uZ2l0dWRlSW5SYWRpYW5zIC0gb3B0X3N0YXJ0TG9uZ2l0dWRlSW5SYWRpYW5zO1xyXG4gICAgY29uc3QgcG9zaXRpb25zID0gW107XHJcbiAgICBjb25zdCBub3JtYWxzID0gW107XHJcbiAgICBjb25zdCB0ZXhjb29yZHMgPSBbXTtcclxuICAgIGZvciAobGV0IHkgPSAwOyB5IDw9IHN1YmRpdmlzaW9uc0hlaWdodDsgeSsrKSB7XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPD0gc3ViZGl2aXNpb25zQXhpczsgeCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHUgPSB4IC8gc3ViZGl2aXNpb25zQXhpcztcclxuICAgICAgICAgICAgY29uc3QgdiA9IHkgLyBzdWJkaXZpc2lvbnNIZWlnaHQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoZXRhID0gbG9uZ1JhbmdlICogdSArIG9wdF9zdGFydExvbmdpdHVkZUluUmFkaWFucztcclxuICAgICAgICAgICAgY29uc3QgcGhpID0gbGF0UmFuZ2UgKiB2ICsgb3B0X3N0YXJ0TGF0aXR1ZGVJblJhZGlhbnM7XHJcbiAgICAgICAgICAgIGNvbnN0IHNpblRoZXRhID0gTWF0aC5zaW4odGhldGEpO1xyXG4gICAgICAgICAgICBjb25zdCBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKTtcclxuICAgICAgICAgICAgY29uc3Qgc2luUGhpID0gTWF0aC5zaW4ocGhpKTtcclxuICAgICAgICAgICAgY29uc3QgY29zUGhpID0gTWF0aC5jb3MocGhpKTtcclxuICAgICAgICAgICAgY29uc3QgdXggPSBjb3NUaGV0YSAqIHNpblBoaTtcclxuICAgICAgICAgICAgY29uc3QgdXkgPSBjb3NQaGk7XHJcbiAgICAgICAgICAgIGNvbnN0IHV6ID0gc2luVGhldGEgKiBzaW5QaGk7XHJcbiAgICAgICAgICAgIHBvc2l0aW9ucy5wdXNoKHJhZGl1cyAqIHV4LCByYWRpdXMgKiB1eSwgcmFkaXVzICogdXopO1xyXG4gICAgICAgICAgICBub3JtYWxzLnB1c2godXgsIHV5LCB1eik7XHJcbiAgICAgICAgICAgIHRleGNvb3Jkcy5wdXNoKDEgLSB1LCB2KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCBudW1WZXJ0c0Fyb3VuZCA9IHN1YmRpdmlzaW9uc0F4aXMgKyAxO1xyXG4gICAgY29uc3QgaW5kaWNlcyA9IFtdO1xyXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCBzdWJkaXZpc2lvbnNBeGlzOyB4KyspIHtcclxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHN1YmRpdmlzaW9uc0hlaWdodDsgeSsrKSB7XHJcbiAgICAgICAgICAgIGluZGljZXMucHVzaCgoeSArIDApICogbnVtVmVydHNBcm91bmQgKyB4LCAoeSArIDApICogbnVtVmVydHNBcm91bmQgKyB4ICsgMSwgKHkgKyAxKSAqIG51bVZlcnRzQXJvdW5kICsgeCk7XHJcbiAgICAgICAgICAgIGluZGljZXMucHVzaCgoeSArIDEpICogbnVtVmVydHNBcm91bmQgKyB4LCAoeSArIDApICogbnVtVmVydHNBcm91bmQgKyB4ICsgMSwgKHkgKyAxKSAqIG51bVZlcnRzQXJvdW5kICsgeCArIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IF9wb3NpdGlvbnMgPSBuZXcgRmxvYXQzMkFycmF5KHBvc2l0aW9ucyk7XHJcbiAgICBjb25zdCBfbm9ybWFscyA9IG5ldyBGbG9hdDMyQXJyYXkobm9ybWFscyk7XHJcbiAgICBjb25zdCBfdGV4Y29vcmRzID0gbmV3IEZsb2F0MzJBcnJheSh0ZXhjb29yZHMpO1xyXG4gICAgY29uc3QgX2luZGljZXMgPSBuZXcgVWludDE2QXJyYXkoaW5kaWNlcyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcclxuICAgICAgICAgICAgUE9TSVRJT046IHtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAwLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IHBvc2l0aW9ucy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IDAsXHJcbiAgICAgICAgICAgICAgICBzdHJpZGU6IDAsXHJcbiAgICAgICAgICAgICAgICBudW1Db21wb25lbnRzOiAzLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNTEyNixcclxuICAgICAgICAgICAgICAgIGRhdGE6IF9wb3NpdGlvbnMsXHJcbiAgICAgICAgICAgICAgICBieXRlTGVuZ3RoOiBfcG9zaXRpb25zLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVUeXBlOiBGTE9BVF9WRUMzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIE5PUk1BTDoge1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb246IDEsXHJcbiAgICAgICAgICAgICAgICBjb3VudDogbm9ybWFscy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBudW1Db21wb25lbnRzOiAzLFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAwLFxyXG4gICAgICAgICAgICAgICAgc3RyaWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNTEyNixcclxuICAgICAgICAgICAgICAgIGRhdGE6IF9ub3JtYWxzLFxyXG4gICAgICAgICAgICAgICAgYnl0ZUxlbmd0aDogX25vcm1hbHMuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGU6IEZMT0FUX1ZFQzNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgVEVYQ09PUkRfMDoge1xyXG4gICAgICAgICAgICAgICAgZGF0YTogX3RleGNvb3JkcyxcclxuICAgICAgICAgICAgICAgIGNvdW50OiBfdGV4Y29vcmRzLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDUxMjYsXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IDAsXHJcbiAgICAgICAgICAgICAgICBzdHJpZGU6IDAsXHJcbiAgICAgICAgICAgICAgICBieXRlTGVuZ3RoOiBfdGV4Y29vcmRzLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogNCxcclxuICAgICAgICAgICAgICAgIG51bUNvbXBvbmVudHM6IDIsXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVUeXBlOiBGTE9BVF9WRUMyXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wb25lbnRUeXBlOiA1MTIzLFxyXG4gICAgICAgIGluZGljZXM6IF9pbmRpY2VzLFxyXG4gICAgICAgIG51bUVsZW1lbnRzOiBpbmRpY2VzLmxlbmd0aCxcclxuICAgICAgICBtb2RlOiA0LFxyXG4gICAgfTtcclxufTtcclxuY29uc3QgY3JlYXRlVHJ1bmNhdGVkQ29uZSA9IChib3R0b21SYWRpdXMsIHRvcFJhZGl1cywgaGVpZ2h0LCByYWRpYWxTdWJkaXZpc2lvbnMsIHZlcnRpY2FsU3ViZGl2aXNpb25zLCBvcHRfdG9wQ2FwLCBvcHRfYm90dG9tQ2FwKSA9PiB7XHJcbiAgICBpZiAocmFkaWFsU3ViZGl2aXNpb25zIDwgMykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInJhZGlhbFN1YmRpdmlzaW9ucyBtdXN0IGJlIDMgb3IgZ3JlYXRlclwiKTtcclxuICAgIH1cclxuICAgIGlmICh2ZXJ0aWNhbFN1YmRpdmlzaW9ucyA8IDEpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ2ZXJ0aWNhbFN1YmRpdmlzaW9ucyBtdXN0IGJlIDEgb3IgZ3JlYXRlclwiKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHRvcENhcCA9IG9wdF90b3BDYXAgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBvcHRfdG9wQ2FwO1xyXG4gICAgY29uc3QgYm90dG9tQ2FwID0gb3B0X2JvdHRvbUNhcCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IG9wdF9ib3R0b21DYXA7XHJcbiAgICBjb25zdCBleHRyYSA9ICh0b3BDYXAgPyAyIDogMCkgKyAoYm90dG9tQ2FwID8gMiA6IDApO1xyXG4gICAgY29uc3QgbnVtVmVydGljZXMgPSAocmFkaWFsU3ViZGl2aXNpb25zICsgMSkgKiAodmVydGljYWxTdWJkaXZpc2lvbnMgKyAxICsgZXh0cmEpO1xyXG4gICAgY29uc3QgcG9zaXRpb25zID0gW107XHJcbiAgICBjb25zdCBub3JtYWxzID0gW107XHJcbiAgICBjb25zdCB0ZXhjb29yZHMgPSBbXTtcclxuICAgIGNvbnN0IGluZGljZXMgPSBbXTtcclxuICAgIGNvbnN0IHZlcnRzQXJvdW5kRWRnZSA9IHJhZGlhbFN1YmRpdmlzaW9ucyArIDE7XHJcbiAgICBjb25zdCBzbGFudCA9IE1hdGguYXRhbjIoYm90dG9tUmFkaXVzIC0gdG9wUmFkaXVzLCBoZWlnaHQpO1xyXG4gICAgY29uc3QgY29zU2xhbnQgPSBNYXRoLmNvcyhzbGFudCk7XHJcbiAgICBjb25zdCBzaW5TbGFudCA9IE1hdGguc2luKHNsYW50KTtcclxuICAgIGNvbnN0IHN0YXJ0ID0gdG9wQ2FwID8gLTIgOiAwO1xyXG4gICAgY29uc3QgZW5kID0gdmVydGljYWxTdWJkaXZpc2lvbnMgKyAoYm90dG9tQ2FwID8gMiA6IDApO1xyXG4gICAgZm9yIChsZXQgeXkgPSBzdGFydDsgeXkgPD0gZW5kOyArK3l5KSB7XHJcbiAgICAgICAgbGV0IHYgPSB5eSAvIHZlcnRpY2FsU3ViZGl2aXNpb25zO1xyXG4gICAgICAgIGxldCB5ID0gaGVpZ2h0ICogdjtcclxuICAgICAgICBsZXQgcmluZ1JhZGl1cztcclxuICAgICAgICBpZiAoeXkgPCAwKSB7XHJcbiAgICAgICAgICAgIHkgPSAwO1xyXG4gICAgICAgICAgICB2ID0gMTtcclxuICAgICAgICAgICAgcmluZ1JhZGl1cyA9IGJvdHRvbVJhZGl1cztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoeXkgPiB2ZXJ0aWNhbFN1YmRpdmlzaW9ucykge1xyXG4gICAgICAgICAgICB5ID0gaGVpZ2h0O1xyXG4gICAgICAgICAgICB2ID0gMTtcclxuICAgICAgICAgICAgcmluZ1JhZGl1cyA9IHRvcFJhZGl1cztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJpbmdSYWRpdXMgPVxyXG4gICAgICAgICAgICAgICAgYm90dG9tUmFkaXVzICsgKHRvcFJhZGl1cyAtIGJvdHRvbVJhZGl1cykgKiAoeXkgLyB2ZXJ0aWNhbFN1YmRpdmlzaW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh5eSA9PT0gLTIgfHwgeXkgPT09IHZlcnRpY2FsU3ViZGl2aXNpb25zICsgMikge1xyXG4gICAgICAgICAgICByaW5nUmFkaXVzID0gMDtcclxuICAgICAgICAgICAgdiA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHkgLT0gaGVpZ2h0IC8gMjtcclxuICAgICAgICBmb3IgKGxldCBpaSA9IDA7IGlpIDwgdmVydHNBcm91bmRFZGdlOyArK2lpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNpbiA9IE1hdGguc2luKChpaSAqIE1hdGguUEkgKiAyKSAvIHJhZGlhbFN1YmRpdmlzaW9ucyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvcyA9IE1hdGguY29zKChpaSAqIE1hdGguUEkgKiAyKSAvIHJhZGlhbFN1YmRpdmlzaW9ucyk7XHJcbiAgICAgICAgICAgIHBvc2l0aW9ucy5wdXNoKHNpbiAqIHJpbmdSYWRpdXMsIHksIGNvcyAqIHJpbmdSYWRpdXMpO1xyXG4gICAgICAgICAgICBpZiAoeXkgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBub3JtYWxzLnB1c2goMCwgLTEsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHl5ID4gdmVydGljYWxTdWJkaXZpc2lvbnMpIHtcclxuICAgICAgICAgICAgICAgIG5vcm1hbHMucHVzaCgwLCAxLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChyaW5nUmFkaXVzID09PSAwLjApIHtcclxuICAgICAgICAgICAgICAgIG5vcm1hbHMucHVzaCgwLCAwLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5vcm1hbHMucHVzaChzaW4gKiBjb3NTbGFudCwgc2luU2xhbnQsIGNvcyAqIGNvc1NsYW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0ZXhjb29yZHMucHVzaChpaSAvIHJhZGlhbFN1YmRpdmlzaW9ucywgMSAtIHYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZvciAobGV0IHl5ID0gMDsgeXkgPCB2ZXJ0aWNhbFN1YmRpdmlzaW9ucyArIGV4dHJhOyArK3l5KSB7XHJcbiAgICAgICAgaWYgKCh5eSA9PT0gMSAmJiB0b3BDYXApIHx8XHJcbiAgICAgICAgICAgICh5eSA9PT0gdmVydGljYWxTdWJkaXZpc2lvbnMgKyBleHRyYSAtIDIgJiYgYm90dG9tQ2FwKSkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaWkgPSAwOyBpaSA8IHJhZGlhbFN1YmRpdmlzaW9uczsgKytpaSkge1xyXG4gICAgICAgICAgICBpbmRpY2VzLnB1c2godmVydHNBcm91bmRFZGdlICogKHl5ICsgMCkgKyAwICsgaWksIHZlcnRzQXJvdW5kRWRnZSAqICh5eSArIDApICsgMSArIGlpLCB2ZXJ0c0Fyb3VuZEVkZ2UgKiAoeXkgKyAxKSArIDEgKyBpaSk7XHJcbiAgICAgICAgICAgIGluZGljZXMucHVzaCh2ZXJ0c0Fyb3VuZEVkZ2UgKiAoeXkgKyAwKSArIDAgKyBpaSwgdmVydHNBcm91bmRFZGdlICogKHl5ICsgMSkgKyAxICsgaWksIHZlcnRzQXJvdW5kRWRnZSAqICh5eSArIDEpICsgMCArIGlpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCBfcG9zaXRpb25zID0gbmV3IEZsb2F0MzJBcnJheShwb3NpdGlvbnMpO1xyXG4gICAgY29uc3QgX25vcm1hbHMgPSBuZXcgRmxvYXQzMkFycmF5KG5vcm1hbHMpO1xyXG4gICAgY29uc3QgX3RleGNvb3JkcyA9IG5ldyBGbG9hdDMyQXJyYXkodGV4Y29vcmRzKTtcclxuICAgIGNvbnN0IF9pbmRpY2VzID0gbmV3IFVpbnQxNkFycmF5KGluZGljZXMpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBhdHRyaWJ1dGVzOiB7XHJcbiAgICAgICAgICAgIFBPU0lUSU9OOiB7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogMCxcclxuICAgICAgICAgICAgICAgIGNvdW50OiBwb3NpdGlvbnMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAwLFxyXG4gICAgICAgICAgICAgICAgc3RyaWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgbnVtQ29tcG9uZW50czogMyxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDUxMjYsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBfcG9zaXRpb25zLFxyXG4gICAgICAgICAgICAgICAgYnl0ZUxlbmd0aDogX3Bvc2l0aW9ucy5ieXRlTGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlVHlwZTogRkxPQVRfVkVDM1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBOT1JNQUw6IHtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAxLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IG5vcm1hbHMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgbnVtQ29tcG9uZW50czogMyxcclxuICAgICAgICAgICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICAgICAgICAgIHN0cmlkZTogMCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDUxMjYsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBfbm9ybWFscyxcclxuICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGg6IF9ub3JtYWxzLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVUeXBlOiBGTE9BVF9WRUMzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFRFWENPT1JEXzA6IHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IF90ZXhjb29yZHMsXHJcbiAgICAgICAgICAgICAgICBjb3VudDogX3RleGNvb3Jkcy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiA1MTI2LFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAwLFxyXG4gICAgICAgICAgICAgICAgc3RyaWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgYnl0ZUxlbmd0aDogX3RleGNvb3Jkcy5ieXRlTGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgbG9jYXRpb246IDQsXHJcbiAgICAgICAgICAgICAgICBudW1Db21wb25lbnRzOiAyLFxyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlVHlwZTogRkxPQVRfVkVDMlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcG9uZW50VHlwZTogNTEyMyxcclxuICAgICAgICBpbmRpY2VzOiBfaW5kaWNlcyxcclxuICAgICAgICBudW1FbGVtZW50czogaW5kaWNlcy5sZW5ndGgsXHJcbiAgICAgICAgbW9kZTogNCxcclxuICAgIH07XHJcbn07XHJcbmV4cG9ydCB7IGNyZWF0ZUJveCwgY3JlYXRlQ29uZSwgY3JlYXRlQ2lyY2xlLCBjcmVhdGVTcGhlcmUsIGNyZWF0ZVRydW5jYXRlZENvbmUgfTtcclxuIiwiZnVuY3Rpb24gY3JlYXRlVW5pZm9ybVNldHRlcnMoZ2wsIHByb2dyYW0pIHtcclxuICAgIGNvbnN0IGNyZWF0ZVRleHR1cmVTZXR0ZXIgPSAocHJvZ3JhbSwgdW5pZm9ybUluZm8pID0+IHtcclxuICAgICAgICBjb25zdCBsb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCB1bmlmb3JtSW5mby5uYW1lKTtcclxuICAgICAgICByZXR1cm4gKHRleEJsb2NrTnVtKSA9PiB7XHJcbiAgICAgICAgICAgIGdsLnVuaWZvcm0xaShsb2NhdGlvbiwgdGV4QmxvY2tOdW0pO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgZnVuY3Rpb24gY3JlYXRlVW5pZm9ybVNldHRlcihwcm9ncmFtLCB1bmlmb3JtSW5mbykge1xyXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sIHVuaWZvcm1JbmZvLm5hbWUpO1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSB1bmlmb3JtSW5mby50eXBlO1xyXG4gICAgICAgIGNvbnN0IGlzQXJyYXkgPSB1bmlmb3JtSW5mby5zaXplID4gMSAmJiB1bmlmb3JtSW5mby5uYW1lLnN1YnN0cigtMykgPT09IFwiWzBdXCI7XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLkZMT0FUICYmIGlzQXJyYXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtMWZ2KGxvY2F0aW9uLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLkZMT0FUKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgZ2wudW5pZm9ybTFmKGxvY2F0aW9uLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLkZMT0FUX1ZFQzIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtMmZ2KGxvY2F0aW9uLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLkZMT0FUX1ZFQzMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtM2Z2KGxvY2F0aW9uLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLkZMT0FUX1ZFQzQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtNGZ2KGxvY2F0aW9uLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLklOVCAmJiBpc0FycmF5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgZ2wudW5pZm9ybTFpdihsb2NhdGlvbiwgdik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSBnbC5JTlQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtMWkobG9jYXRpb24sIHYpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gZ2wuSU5UX1ZFQzIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtMml2KGxvY2F0aW9uLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLklOVF9WRUMzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgZ2wudW5pZm9ybTNpdihsb2NhdGlvbiwgdik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSBnbC5JTlRfVkVDNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgICAgIGdsLnVuaWZvcm00aXYobG9jYXRpb24sIHYpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gZ2wuQk9PTCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgICAgIGdsLnVuaWZvcm0xaXYobG9jYXRpb24sIHYpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gZ2wuQk9PTF9WRUMyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgZ2wudW5pZm9ybTJpdihsb2NhdGlvbiwgdik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSBnbC5CT09MX1ZFQzMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtM2l2KGxvY2F0aW9uLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLkJPT0xfVkVDNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgICAgIGdsLnVuaWZvcm00aXYobG9jYXRpb24sIHYpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gZ2wuRkxPQVRfTUFUMikge1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgICAgIGdsLnVuaWZvcm1NYXRyaXgyZnYobG9jYXRpb24sIGZhbHNlLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLkZMT0FUX01BVDMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtTWF0cml4M2Z2KGxvY2F0aW9uLCBmYWxzZSwgdik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSBnbC5GTE9BVF9NQVQ0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgZ2wudW5pZm9ybU1hdHJpeDRmdihsb2NhdGlvbiwgZmFsc2UsIHYpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IHVuaWZvcm1TZXR0ZXJzID0ge307XHJcbiAgICBjb25zdCB0ZXh0dXJlU2V0dGVycyA9IHt9O1xyXG4gICAgY29uc3QgbnVtVW5pZm9ybXMgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLkFDVElWRV9VTklGT1JNUyk7XHJcbiAgICBmb3IgKGxldCBpaSA9IDA7IGlpIDwgbnVtVW5pZm9ybXM7ICsraWkpIHtcclxuICAgICAgICBjb25zdCB1bmlmb3JtSW5mbyA9IGdsLmdldEFjdGl2ZVVuaWZvcm0ocHJvZ3JhbSwgaWkpO1xyXG4gICAgICAgIGlmICghdW5pZm9ybUluZm8pIHtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBuYW1lID0gdW5pZm9ybUluZm8ubmFtZTtcclxuICAgICAgICBpZiAodW5pZm9ybUluZm8udHlwZSA9PT0gZ2wuU0FNUExFUl8yRCkge1xyXG4gICAgICAgICAgICB0ZXh0dXJlU2V0dGVyc1tuYW1lXSA9IGNyZWF0ZVRleHR1cmVTZXR0ZXIocHJvZ3JhbSwgdW5pZm9ybUluZm8pO1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5hbWUuc3Vic3RyKC0zKSA9PT0gXCJbMF1cIikge1xyXG4gICAgICAgICAgICBuYW1lID0gbmFtZS5zdWJzdHIoMCwgbmFtZS5sZW5ndGggLSAzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVuaWZvcm1JbmZvLnNpemUgPiAxKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdW5pZm9ybUluZm8uc2l6ZTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvYmogPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2l6ZTogdW5pZm9ybUluZm8uc2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiB1bmlmb3JtSW5mby50eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUgKyBgWyR7aX1dYCxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB1bmlmb3JtU2V0dGVyc1tuYW1lICsgYFske2l9XWBdID0gY3JlYXRlVW5pZm9ybVNldHRlcihwcm9ncmFtLCBvYmopO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBzZXR0ZXIgPSBjcmVhdGVVbmlmb3JtU2V0dGVyKHByb2dyYW0sIHVuaWZvcm1JbmZvKTtcclxuICAgICAgICAgICAgdW5pZm9ybVNldHRlcnNbbmFtZV0gPSBzZXR0ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHsgdW5pZm9ybVNldHRlcnMsIHRleHR1cmVTZXR0ZXJzIH07XHJcbn1cclxuY2xhc3MgUHJvZ3JhbUluZm8ge1xyXG4gICAgY29uc3RydWN0b3IoZ2xXcmFwcGVyLCB2ZXJ0ZXhTaGFkZXJTb3VyY2UsIGZyYWdtZW50U2hhZGVyU291cmNlKSB7XHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhTaGFkZXJTb3VyY2UgPSB2ZXJ0ZXhTaGFkZXJTb3VyY2U7XHJcbiAgICAgICAgdGhpcy5mcmFnbWVudFNoYWRlclNvdXJjZSA9IGZyYWdtZW50U2hhZGVyU291cmNlO1xyXG4gICAgICAgIHRoaXMudW5pZm9ybVNldHRlcnMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudGV4dHVyZVNldHRlcnMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudmVydGV4U2hhZGVyID0gbnVsbDtcclxuICAgICAgICB0aGlzLmZyYWdtZW50U2hhZGVyID0gbnVsbDtcclxuICAgICAgICB0aGlzLnByb2dyYW0gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZ2xXcmFwcGVyID0gZ2xXcmFwcGVyO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlVW5pZm9ybVNldHRlcnMoKSB7XHJcbiAgICAgICAgY29uc3QgeyBnbFdyYXBwZXIsIHByb2dyYW0gfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgeyBnbCB9ID0gZ2xXcmFwcGVyO1xyXG4gICAgICAgIGNvbnN0IHsgdW5pZm9ybVNldHRlcnMsIHRleHR1cmVTZXR0ZXJzIH0gPSBjcmVhdGVVbmlmb3JtU2V0dGVycyhnbCwgcHJvZ3JhbSk7XHJcbiAgICAgICAgdGhpcy50ZXh0dXJlU2V0dGVycyA9IHRleHR1cmVTZXR0ZXJzO1xyXG4gICAgICAgIHRoaXMudW5pZm9ybVNldHRlcnMgPSB1bmlmb3JtU2V0dGVycztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGNvbXBpbGVTaGFkZXJzKCkge1xyXG4gICAgICAgIGNvbnN0IHsgZ2xXcmFwcGVyLCBmcmFnbWVudFNoYWRlclNvdXJjZSwgdmVydGV4U2hhZGVyU291cmNlIH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IHsgZ2wgfSA9IGdsV3JhcHBlcjtcclxuICAgICAgICB0aGlzLnZlcnRleFNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcihnbC5WRVJURVhfU0hBREVSKTtcclxuICAgICAgICBnbC5zaGFkZXJTb3VyY2UodGhpcy52ZXJ0ZXhTaGFkZXIsIHZlcnRleFNoYWRlclNvdXJjZSk7XHJcbiAgICAgICAgZ2wuY29tcGlsZVNoYWRlcih0aGlzLnZlcnRleFNoYWRlcik7XHJcbiAgICAgICAgaWYgKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIodGhpcy52ZXJ0ZXhTaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZ2wuZ2V0U2hhZGVySW5mb0xvZyh0aGlzLnZlcnRleFNoYWRlcikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZyYWdtZW50U2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKGdsLkZSQUdNRU5UX1NIQURFUik7XHJcbiAgICAgICAgZ2wuc2hhZGVyU291cmNlKHRoaXMuZnJhZ21lbnRTaGFkZXIsIGZyYWdtZW50U2hhZGVyU291cmNlKTtcclxuICAgICAgICBnbC5jb21waWxlU2hhZGVyKHRoaXMuZnJhZ21lbnRTaGFkZXIpO1xyXG4gICAgICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHRoaXMuZnJhZ21lbnRTaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZ2wuZ2V0U2hhZGVySW5mb0xvZyh0aGlzLmZyYWdtZW50U2hhZGVyKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucHJvZ3JhbSA9IGdsLmNyZWF0ZVByb2dyYW0oKTtcclxuICAgICAgICBnbC5hdHRhY2hTaGFkZXIodGhpcy5wcm9ncmFtLCB0aGlzLnZlcnRleFNoYWRlcik7XHJcbiAgICAgICAgZ2wuYXR0YWNoU2hhZGVyKHRoaXMucHJvZ3JhbSwgdGhpcy5mcmFnbWVudFNoYWRlcik7XHJcbiAgICAgICAgZ2wubGlua1Byb2dyYW0odGhpcy5wcm9ncmFtKTtcclxuICAgICAgICBpZiAoIWdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5wcm9ncmFtLCBnbC5MSU5LX1NUQVRVUykpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGdsLmdldFByb2dyYW1JbmZvTG9nKHRoaXMucHJvZ3JhbSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNldFVuaWZvcm1zKHVuaWZvcm1zKSB7XHJcbiAgICAgICAgY29uc3QgeyB1bmlmb3JtU2V0dGVycywgZ2xXcmFwcGVyIH0gPSB0aGlzO1xyXG4gICAgICAgIGdsV3JhcHBlci51c2VQcm9ncmFtSW5mbyh0aGlzKTtcclxuICAgICAgICBPYmplY3Qua2V5cyh1bmlmb3JtcykuZm9yRWFjaCgobmFtZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzZXR0ZXIgPSB1bmlmb3JtU2V0dGVyc1tuYW1lXTtcclxuICAgICAgICAgICAgaWYgKHNldHRlcilcclxuICAgICAgICAgICAgICAgIHNldHRlcih1bmlmb3Jtc1tuYW1lXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBzZXRUZXh0dXJlVW5pZm9ybVVuaXQobmFtZSwgdW5pdCkge1xyXG4gICAgICAgIGNvbnN0IHsgdGV4dHVyZVNldHRlcnMsIGdsV3JhcHBlciB9ID0gdGhpcztcclxuICAgICAgICBnbFdyYXBwZXIudXNlUHJvZ3JhbUluZm8odGhpcyk7XHJcbiAgICAgICAgY29uc3Qgc2V0dGVyID0gdGV4dHVyZVNldHRlcnNbbmFtZV07XHJcbiAgICAgICAgaWYgKHNldHRlcilcclxuICAgICAgICAgICAgc2V0dGVyKHVuaXQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7IFByb2dyYW1JbmZvIH07XHJcbiIsIi8qY29uc3Qgc2V0Q2FudmFzU2l6ZSA9IChjdHgsIHdpZHRoLCBoZWlnaHQpID0+IHtcclxuICBjdHguY2FudmFzLndpZHRoID0gd2lkdGg7XHJcbiAgY3R4LmNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbn07XHJcblxyXG5jb25zdCBtYWtlVGV4dHVyZSA9IChnbCwgY3R4KSA9PiB7XHJcbiAgY29uc3QgdGV4ID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xyXG4gIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleCk7XHJcblxyXG4gIGdsLnRleEltYWdlMkQoXHJcbiAgICBnbC5URVhUVVJFXzJELFxyXG4gICAgMCxcclxuICAgIGdsLlJHQkEsXHJcbiAgICBnbC5SR0JBLFxyXG4gICAgZ2wuVU5TSUdORURfQllURSxcclxuICAgIGN0eC5jYW52YXNcclxuICApO1xyXG4gIHJldHVybiB0ZXg7XHJcbn07XHJcblxyXG5jb25zdCBtYWtlU3RyaXBlVGV4dHVyZSA9IChnbCwgb3B0aW9ucykgPT4ge1xyXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gIHZhciB3aWR0aCA9IG9wdGlvbnMud2lkdGggfHwgNDtcclxuICB2YXIgaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQgfHwgNDtcclxuICB2YXIgY29sb3IxID0gb3B0aW9ucy5jb2xvcjEgfHwgXCJyZ2JhKDEsMCwwLDAuMSlcIjtcclxuICB2YXIgY29sb3IyID0gb3B0aW9ucy5jb2xvcjIgfHwgXCJyZ2JhKDEsMSwxLDAuNSlcIjtcclxuICBjb25zdCBjdHggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLmdldENvbnRleHQoXCIyZFwiKTtcclxuICBzZXRDYW52YXNTaXplKGN0eCwgd2lkdGgsIGhlaWdodCk7XHJcblxyXG4gIGN0eC5maWxsU3R5bGUgPSBjb2xvcjE7XHJcbiAgY3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gIGN0eC5maWxsU3R5bGUgPSBjb2xvcjI7XHJcbiAgY3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQgLyAyKTtcclxuXHJcbiAgcmV0dXJuIG1ha2VUZXh0dXJlKGdsLCBjdHgpO1xyXG59O1xyXG5cclxuY29uc3QgbWFrZVN0cmlwZUltZyA9IChvcHRpb25zKSA9PiB7XHJcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgdmFyIHdpZHRoID0gb3B0aW9ucy53aWR0aCB8fCA0O1xyXG4gIHZhciBoZWlnaHQgPSBvcHRpb25zLmhlaWdodCB8fCA0O1xyXG4gIHZhciBjb2xvcjEgPSBvcHRpb25zLmNvbG9yMSB8fCBcInJnYmEoMSwwLDAsMC41KVwiO1xyXG4gIHZhciBjb2xvcjIgPSBvcHRpb25zLmNvbG9yMiB8fCBcInJnYmEoMCwwLDEsMSlcIjtcclxuICBjb25zdCBjdHggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLmdldENvbnRleHQoXCIyZFwiKTtcclxuICBzZXRDYW52YXNTaXplKGN0eCwgd2lkdGgsIGhlaWdodCk7XHJcblxyXG4gIGN0eC5maWxsU3R5bGUgPSBjb2xvcjE7XHJcbiAgY3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gIGN0eC5maWxsU3R5bGUgPSBjb2xvcjI7XHJcbiAgY3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQgLyAyKTtcclxuXHJcbiAgcmV0dXJuIGN0eC5jYW52YXM7XHJcbn07XHJcblxyXG5jb25zdCBtYWtlSW1nRnJvbVN2Z1htbCA9ICh4bWwsIG9wdGlvbnMgPSB7fSkgPT4ge1xyXG4gIGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcbiAgdmFyIHN2ZzY0ID0gYnRvYSh4bWwpO1xyXG4gIHZhciBiNjRTdGFydCA9IFwiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxcIjtcclxuICB2YXIgaW1hZ2U2NCA9IGI2NFN0YXJ0ICsgc3ZnNjQ7XHJcbiAgaW1nLnNyYyA9IGltYWdlNjQ7XHJcblxyXG4gIGNvbnN0IHdpZHRoID0gb3B0aW9ucy53aWR0aCB8fCAxMDA7XHJcbiAgY29uc3QgaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQgfHwgMTAwO1xyXG4gIGNvbnN0IHggPSBvcHRpb25zLnggfHwgMTtcclxuICBjb25zdCB5ID0gb3B0aW9ucy55IHx8IDUwO1xyXG5cclxuICBjb25zdCBjdHggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLmdldENvbnRleHQoXCIyZFwiKTtcclxuICBzZXRDYW52YXNTaXplKGN0eCwgd2lkdGgsIGhlaWdodCk7XHJcblxyXG4gIGN0eC5kcmF3SW1hZ2UoaW1nLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcclxuICBjdHguZmlsbFN0eWxlID0gXCJyZ2JhKDAsMCwwLDEpXCI7XHJcbiAgY3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gIHJldHVybiBjdHguaW1nO1xyXG59O1xyXG4qL1xyXG5jb25zdCByZXF1ZXN0Q09SU0lmTm90U2FtZU9yaWdpbiA9IChpbWcsIHVybCkgPT4ge1xyXG4gICAgaWYgKG5ldyBVUkwodXJsLCB3aW5kb3cubG9jYXRpb24uaHJlZikub3JpZ2luICE9PSB3aW5kb3cubG9jYXRpb24ub3JpZ2luKSB7XHJcbiAgICAgICAgaW1nLmNyb3NzT3JpZ2luID0gXCJcIjtcclxuICAgIH1cclxufTtcclxuY2xhc3MgVGV4dHVyZUluZm8ge1xyXG4gICAgY29uc3RydWN0b3IoZ2wpIHtcclxuICAgICAgICB0aGlzLndpZHRoID0gbnVsbDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5nbCA9IGdsO1xyXG4gICAgICAgIHRoaXMuaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICB9XHJcbiAgICBjcmVhdGVUZXh0dXJlRnJvbVVSTCh1cmwpIHtcclxuICAgICAgICBjb25zdCB7IGdsIH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IHRleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XHJcbiAgICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZSk7XHJcbiAgICAgICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCAxLCAxLCAwLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCBuZXcgVWludDhBcnJheShbMCwgMCwgMjU1LCAyNTVdKSk7XHJcbiAgICAgICAgdGhpcy5pbWcuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5pbWcud2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5pbWcuaGVpZ2h0O1xyXG4gICAgICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0ZXh0dXJlKTtcclxuICAgICAgICAgICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCB0aGlzLmltZyk7XHJcbiAgICAgICAgICAgIGdsLmdlbmVyYXRlTWlwbWFwKGdsLlRFWFRVUkVfMkQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJlcXVlc3RDT1JTSWZOb3RTYW1lT3JpZ2luKHRoaXMuaW1nLCB1cmwpO1xyXG4gICAgICAgIHRoaXMuaW1nLnNyYyA9IHVybDtcclxuICAgICAgICB0aGlzLnRleHR1cmUgPSB0ZXh0dXJlO1xyXG4gICAgICAgIHJldHVybiB0ZXh0dXJlO1xyXG4gICAgfVxyXG4gICAgc2V0VGV4dHVyZVVuaXQodW5pdE51bSkge1xyXG4gICAgICAgIGNvbnN0IHsgZ2wsIHRleHR1cmUgfSA9IHRoaXM7XHJcbiAgICAgICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMCArIHVuaXROdW0pO1xyXG4gICAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleHR1cmUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7IFRleHR1cmVJbmZvIH07XHJcbiIsImNvbnN0IHByb3BzID0ge1xyXG4gICAgbWF0NDoge1xyXG4gICAgICAgIHN0cmlkZTogNjQsXHJcbiAgICAgICAgYnl0ZUxlbmd0aDogNjQsXHJcbiAgICAgICAgdHlwZTogMHgxNDA2LFxyXG4gICAgICAgIG51bUF0dHJpYnV0ZXM6IDQsXHJcbiAgICAgICAgbnVtQ29tcG9uZW50czogNCxcclxuICAgIH0sXHJcbiAgICB2ZWMzOiB7XHJcbiAgICAgICAgbnVtQ29tcG9uZW50czogMyxcclxuICAgICAgICB0eXBlOiAweDE0MDYsXHJcbiAgICAgICAgbnVtQXR0cmlidXRlczogMSxcclxuICAgIH0sXHJcbn07XHJcbmNvbnN0IGdldEF0dHJpYnV0ZVByb3BzQnlUeXBlID0gKHR5cGUpID0+IHByb3BzW3R5cGVdO1xyXG5leHBvcnQgZGVmYXVsdCBnZXRBdHRyaWJ1dGVQcm9wc0J5VHlwZTtcclxuIiwiY29uc3QgVFlQRURfQVJSQVlTID0ge1xyXG4gICAgNTEyMDogSW50OEFycmF5LFxyXG4gICAgNTEyMTogVWludDhBcnJheSxcclxuICAgIDUxMjI6IEludDE2QXJyYXksXHJcbiAgICA1MTIzOiBVaW50MTZBcnJheSxcclxuICAgIDUxMjQ6IEludDMyQXJyYXksXHJcbiAgICA1MTI1OiBVaW50MzJBcnJheSxcclxuICAgIDUxMjY6IEZsb2F0MzJBcnJheSxcclxufTtcclxuY29uc3QgTlVNX0NPTVBPTkVOVFMgPSB7XHJcbiAgICBTQ0FMQVI6IDEsXHJcbiAgICBWRUMyOiAyLFxyXG4gICAgVkVDMzogMyxcclxuICAgIFZFQzQ6IDQsXHJcbiAgICBNQVQyOiA0LFxyXG4gICAgTUFUMzogOSxcclxuICAgIE1BVDQ6IDE2LFxyXG59O1xyXG5jb25zdCBMT0NBVElPTlMgPSB7XHJcbiAgICBQT1NJVElPTjogMCxcclxuICAgIE5PUk1BTDogMSxcclxuICAgIFdFSUdIVFNfMDogMixcclxuICAgIEpPSU5UU18wOiAzLFxyXG4gICAgVEVYQ09PUkRfMDogNCxcclxufTtcclxuY29uc3QgRUxFTUVOVF9TSVpFID0ge1xyXG4gICAgMHgxNDA2OiA0LFxyXG59O1xyXG5jb25zdCBURVhUVVJFMCA9IDB4ODRjMDtcclxuY29uc3QgRFlOQU1JQ19EUkFXID0gMHg4OGU4O1xyXG5jb25zdCBBUlJBWV9CVUZGRVIgPSAweDg4OTI7XHJcbmNvbnN0IEVMRU1FTlRfQVJSQVlfQlVGRkVSID0gMHg4ODkzO1xyXG5jb25zdCBVTklGT1JNX0JVRkZFUiA9IDB4OGExMTtcclxuY29uc3QgVFJBTlNGT1JNX0ZFRURCQUNLX0JVRkZFUiA9IDB4OGM4ZTtcclxuY29uc3QgVFJBTlNGT1JNX0ZFRURCQUNLID0gMHg4ZTIyO1xyXG5jb25zdCBDT01QSUxFX1NUQVRVUyA9IDB4OGI4MTtcclxuY29uc3QgTElOS19TVEFUVVMgPSAweDhiODI7XHJcbmNvbnN0IEZSQUdNRU5UX1NIQURFUiA9IDB4OGIzMDtcclxuY29uc3QgVkVSVEVYX1NIQURFUiA9IDB4OGIzMTtcclxuY29uc3QgU0VQQVJBVEVfQVRUUklCUyA9IDB4OGM4ZDtcclxuY29uc3QgQUNUSVZFX1VOSUZPUk1TID0gMHg4Yjg2O1xyXG5jb25zdCBBQ1RJVkVfQVRUUklCVVRFUyA9IDB4OGI4OTtcclxuY29uc3QgVFJBTlNGT1JNX0ZFRURCQUNLX1ZBUllJTkdTID0gMHg4YzgzO1xyXG5jb25zdCBBQ1RJVkVfVU5JRk9STV9CTE9DS1MgPSAweDhhMzY7XHJcbmNvbnN0IFVOSUZPUk1fQkxPQ0tfUkVGRVJFTkNFRF9CWV9WRVJURVhfU0hBREVSID0gMHg4YTQ0O1xyXG5jb25zdCBVTklGT1JNX0JMT0NLX1JFRkVSRU5DRURfQllfRlJBR01FTlRfU0hBREVSID0gMHg4YTQ2O1xyXG5jb25zdCBVTklGT1JNX0JMT0NLX0RBVEFfU0laRSA9IDB4OGE0MDtcclxuY29uc3QgVU5JRk9STV9CTE9DS19BQ1RJVkVfVU5JRk9STV9JTkRJQ0VTID0gMHg4YTQzO1xyXG5jb25zdCBGTE9BVCA9IDB4MTQwNjtcclxuY29uc3QgRkxPQVRfVkVDMiA9IDB4OGI1MDtcclxuY29uc3QgRkxPQVRfVkVDMyA9IDB4OGI1MTtcclxuY29uc3QgRkxPQVRfVkVDNCA9IDB4OGI1MjtcclxuY29uc3QgSU5UID0gMHgxNDA0O1xyXG5jb25zdCBJTlRfVkVDMiA9IDB4OGI1MztcclxuY29uc3QgSU5UX1ZFQzMgPSAweDhiNTQ7XHJcbmNvbnN0IElOVF9WRUM0ID0gMHg4YjU1O1xyXG5jb25zdCBCT09MID0gMHg4YjU2O1xyXG5jb25zdCBCT09MX1ZFQzIgPSAweDhiNTc7XHJcbmNvbnN0IEJPT0xfVkVDMyA9IDB4OGI1ODtcclxuY29uc3QgQk9PTF9WRUM0ID0gMHg4YjU5O1xyXG5jb25zdCBGTE9BVF9NQVQyID0gMHg4YjVhO1xyXG5jb25zdCBGTE9BVF9NQVQzID0gMHg4YjViO1xyXG5jb25zdCBGTE9BVF9NQVQ0ID0gMHg4YjVjO1xyXG5jb25zdCBTQU1QTEVSXzJEID0gMHg4YjVlO1xyXG5jb25zdCBTQU1QTEVSX0NVQkUgPSAweDhiNjA7XHJcbmNvbnN0IFNBTVBMRVJfM0QgPSAweDhiNWY7XHJcbmNvbnN0IFNBTVBMRVJfMkRfU0hBRE9XID0gMHg4YjYyO1xyXG5jb25zdCBGTE9BVF9NQVQyeDMgPSAweDhiNjU7XHJcbmNvbnN0IEZMT0FUX01BVDJ4NCA9IDB4OGI2NjtcclxuY29uc3QgRkxPQVRfTUFUM3gyID0gMHg4YjY3O1xyXG5jb25zdCBGTE9BVF9NQVQzeDQgPSAweDhiNjg7XHJcbmNvbnN0IEZMT0FUX01BVDR4MiA9IDB4OGI2OTtcclxuY29uc3QgRkxPQVRfTUFUNHgzID0gMHg4YjZhO1xyXG5jb25zdCBTQU1QTEVSXzJEX0FSUkFZID0gMHg4ZGMxO1xyXG5jb25zdCBTQU1QTEVSXzJEX0FSUkFZX1NIQURPVyA9IDB4OGRjNDtcclxuY29uc3QgU0FNUExFUl9DVUJFX1NIQURPVyA9IDB4OGRjNTtcclxuY29uc3QgVU5TSUdORURfSU5UID0gMHgxNDA1O1xyXG5jb25zdCBVTlNJR05FRF9JTlRfVkVDMiA9IDB4OGRjNjtcclxuY29uc3QgVU5TSUdORURfSU5UX1ZFQzMgPSAweDhkYzc7XHJcbmNvbnN0IFVOU0lHTkVEX0lOVF9WRUM0ID0gMHg4ZGM4O1xyXG5jb25zdCBJTlRfU0FNUExFUl8yRCA9IDB4OGRjYTtcclxuY29uc3QgSU5UX1NBTVBMRVJfM0QgPSAweDhkY2I7XHJcbmNvbnN0IElOVF9TQU1QTEVSX0NVQkUgPSAweDhkY2M7XHJcbmNvbnN0IElOVF9TQU1QTEVSXzJEX0FSUkFZID0gMHg4ZGNmO1xyXG5jb25zdCBVTlNJR05FRF9JTlRfU0FNUExFUl8yRCA9IDB4OGRkMjtcclxuY29uc3QgVU5TSUdORURfSU5UX1NBTVBMRVJfM0QgPSAweDhkZDM7XHJcbmNvbnN0IFVOU0lHTkVEX0lOVF9TQU1QTEVSX0NVQkUgPSAweDhkZDQ7XHJcbmNvbnN0IFVOU0lHTkVEX0lOVF9TQU1QTEVSXzJEX0FSUkFZID0gMHg4ZGQ3O1xyXG5jb25zdCBURVhUVVJFXzJEID0gMHgwZGUxO1xyXG5jb25zdCBURVhUVVJFX0NVQkVfTUFQID0gMHg4NTEzO1xyXG5jb25zdCBURVhUVVJFXzNEID0gMHg4MDZmO1xyXG5jb25zdCBURVhUVVJFXzJEX0FSUkFZID0gMHg4YzFhO1xyXG5leHBvcnQgeyBMT0NBVElPTlMsIE5VTV9DT01QT05FTlRTLCBUWVBFRF9BUlJBWVMsIEVMRU1FTlRfU0laRSwgRkxPQVQsIEZMT0FUX01BVDIsIEZMT0FUX01BVDJ4MywgRkxPQVRfTUFUNCwgRkxPQVRfTUFUMng0LCBVTlNJR05FRF9JTlQsIEZMT0FUX01BVDMsIFVOU0lHTkVEX0lOVF9WRUMyLCBVTlNJR05FRF9JTlRfVkVDMywgVU5TSUdORURfSU5UX1ZFQzQsIEZMT0FUX1ZFQzIsIEZMT0FUX1ZFQzMsIEZMT0FUX1ZFQzQsIElOVCwgSU5UX1ZFQzIsIElOVF9WRUMzLCBJTlRfVkVDNCwgQk9PTCwgQk9PTF9WRUMyLCBCT09MX1ZFQzMsIEJPT0xfVkVDNCB9O1xyXG4iLCJpbXBvcnQgeyBQcmltaXRpdmVSZW5kZXJJbmZvRnJvbUFycmF5RGF0YSwgQXJyYXlEYXRhRnJvbUdsdGYsIEVudGl0eURhdGFGcm9tR2x0ZiwgR0xURiwgfSBmcm9tIFwiLi9jb21wb25lbnRzL0dsdGZVdGlsc1wiO1xyXG5pbXBvcnQgeyBNZXNoUmVuZGVyZXIsIFNraW5uZWRNZXNoUmVuZGVyZXIgfSBmcm9tIFwiLi9jb21wb25lbnRzL01lc2hSZW5kZXJlclwiO1xyXG5pbXBvcnQgeyBjcmVhdGVCb3gsIGNyZWF0ZUNvbmUsIGNyZWF0ZUNpcmNsZSwgY3JlYXRlU3BoZXJlLCBjcmVhdGVUcnVuY2F0ZWRDb25lIH0gZnJvbSBcIi4vY29tcG9uZW50cy9QcmltaXRpdmVzXCI7XHJcbmltcG9ydCBQcmltaXRpdmVSZW5kZXJlciBmcm9tIFwiLi9jb21wb25lbnRzL1ByaW1pdGl2ZVJlbmRlcmVyXCI7XHJcbmltcG9ydCB7IFByb2dyYW1JbmZvLCB9IGZyb20gXCIuL2NvbXBvbmVudHMvUHJvZ3JhbUluZm9cIjtcclxuaW1wb3J0IERyYXdlciBmcm9tIFwiLi9jb21wb25lbnRzL0RyYXdlclwiO1xyXG5pbXBvcnQgeyBUZXh0dXJlSW5mbywgfSBmcm9tIFwiLi9jb21wb25lbnRzL1RleHR1cmVJbmZvXCI7XHJcbmltcG9ydCBNb2RlbCBmcm9tIFwiLi9jb21wb25lbnRzL01vZGVsXCI7XHJcbmltcG9ydCB7IGRlZmF1bHRTaGFkZXJzLCBwb2ludExpZ2h0U2hhZGVycyB9IGZyb20gXCIuL3JlbmRlci9zaGFkZXJzXCI7XHJcbmltcG9ydCBHTGNvbnRleHRXcmFwcGVyIGZyb20gXCIuL2NvbXBvbmVudHMvR0xXcmFwcGVyXCI7XHJcbmV4cG9ydCB7IEdMVEYsIEdMY29udGV4dFdyYXBwZXIsIFRleHR1cmVJbmZvLCBNb2RlbCwgUHJpbWl0aXZlUmVuZGVyZXIsIEVudGl0eURhdGFGcm9tR2x0ZiwgUHJpbWl0aXZlUmVuZGVySW5mb0Zyb21BcnJheURhdGEsIEFycmF5RGF0YUZyb21HbHRmLCBNZXNoUmVuZGVyZXIsIFNraW5uZWRNZXNoUmVuZGVyZXIsIGNyZWF0ZUJveCwgUHJvZ3JhbUluZm8sIERyYXdlciwgY3JlYXRlQ29uZSwgY3JlYXRlQ2lyY2xlLCBkZWZhdWx0U2hhZGVycywgcG9pbnRMaWdodFNoYWRlcnMsIGNyZWF0ZVNwaGVyZSwgY3JlYXRlVHJ1bmNhdGVkQ29uZSB9O1xyXG4iLCJleHBvcnQgZGVmYXVsdCBgI3ZlcnNpb24gMzAwIGVzXHJcbnByZWNpc2lvbiBoaWdocCBmbG9hdDtcclxuIFxyXG5cclxuXHJcbnVuaWZvcm0gdmVjNCB1X2NvbG9yO1xyXG5vdXQgdmVjNCBvdXRDb2xvcjtcclxudm9pZCBtYWluKCkge1xyXG4gIFxyXG4gIFxyXG4gIG91dENvbG9yID0gdV9jb2xvcjtcclxuIFxyXG4gIFxyXG4gIFxyXG59YDtcclxuIiwiaW1wb3J0IHZlcnQgZnJvbSAnLi92ZXJ0LmpzJztcclxuaW1wb3J0IGZyYWcgZnJvbSAnLi9mcmFnLmpzJztcclxuZXhwb3J0IGRlZmF1bHQgeyB2ZXJ0LCBmcmFnIH07XHJcbiIsImV4cG9ydCBkZWZhdWx0IGAjdmVyc2lvbiAzMDAgZXNcclxuXHJcbnByZWNpc2lvbiBoaWdocCBmbG9hdDtcclxuXHJcbnVuaWZvcm0gbWF0NCB1X3dvcmxkVmlld1Byb2plY3Rpb247XHJcblxyXG5cclxubGF5b3V0KGxvY2F0aW9uID0gMCkgaW4gdmVjNCBhX3Bvc2l0aW9uO1xyXG52b2lkIG1haW4oKSB7XHJcbiAgZ2xfUG9zaXRpb24gPSB1X3dvcmxkVmlld1Byb2plY3Rpb24gKiBhX3Bvc2l0aW9uO1xyXG4gIGdsX1BvaW50U2l6ZSA9IDEwLjA7XHJcbn1gO1xyXG4iLCJpbXBvcnQgZGVmYXVsdFNoYWRlcnMgZnJvbSBcIi4vZGVmYXVsdFwiO1xyXG5pbXBvcnQgcG9pbnRMaWdodFNoYWRlcnMgZnJvbSBcIi4vcG9pbnRMaWdodFwiO1xyXG5leHBvcnQgeyBkZWZhdWx0U2hhZGVycywgcG9pbnRMaWdodFNoYWRlcnMgfTtcclxuIiwiZXhwb3J0IGRlZmF1bHQgYCN2ZXJzaW9uIDMwMCBlc1xyXG5wcmVjaXNpb24gaGlnaHAgZmxvYXQ7XHJcbiBcclxuXHJcblxyXG5cclxuaW4gdmVjMyB2X25vcm1hbDtcclxuaW4gdmVjMyB2X3N1cmZhY2VUb1ZpZXc7XHJcbmluIHZlYzMgdl9zdXJmYWNlVG9MaWdodDtcclxuXHJcblxyXG4vL3VuaWZvcm0gc2FtcGxlcjJEIHVfdGV4dHVyZTE7XHJcbnVuaWZvcm0gZmxvYXQgdV9zaGluaW5lc3M7XHJcbnVuaWZvcm0gdmVjNCB1X2NvbG9yO1xyXG51bmlmb3JtIHZlYzQgdV9hbWJpZW50TGlnaHQ7XHJcbm91dCB2ZWM0IG91dENvbG9yO1xyXG5cclxuXHJcbnZvaWQgbWFpbigpIHtcclxuICBcclxuICB2ZWMzIHN1cmZhY2VUb0xpZ2h0RGlyZWN0aW9uID0gbm9ybWFsaXplKHZfc3VyZmFjZVRvTGlnaHQpO1xyXG4gIHZlYzMgc3VyZmFjZVRvVmlld0RpcmVjdGlvbiA9IG5vcm1hbGl6ZSh2X3N1cmZhY2VUb1ZpZXcpO1xyXG4gIHZlYzMgaGFsZlZlY3RvciA9IG5vcm1hbGl6ZShzdXJmYWNlVG9MaWdodERpcmVjdGlvbiArIHN1cmZhY2VUb1ZpZXdEaXJlY3Rpb24pO1xyXG5cclxuICB2ZWMzIG5vcm1hbCA9IG5vcm1hbGl6ZSh2X25vcm1hbCk7XHJcbiAgZmxvYXQgbGlnaHQgPSBkb3Qobm9ybWFsLCBzdXJmYWNlVG9MaWdodERpcmVjdGlvbik7XHJcbiAgZmxvYXQgc3BlY3VsYXIgPSAwLjA7XHJcbiAgaWYgKGxpZ2h0ID4gMC4wKSB7XHJcbiAgICBzcGVjdWxhciA9IHBvdyhkb3Qobm9ybWFsLCBoYWxmVmVjdG9yKSwgdV9zaGluaW5lc3MpO1xyXG4gIH1cclxuICBcclxuICBvdXRDb2xvciA9ICB1X2NvbG9yO1xyXG4gIG91dENvbG9yLnJnYiAqPSBsaWdodDtcclxuICBvdXRDb2xvci5yZ2IgKz0gc3BlY3VsYXI7XHJcblxyXG4gIG91dENvbG9yLnJnYiArPSB1X2FtYmllbnRMaWdodC5yZ2IgKjAuMztcclxuICBcclxufWA7XHJcbiIsImltcG9ydCB2ZXJ0IGZyb20gJy4vdmVydC5qcyc7XHJcbmltcG9ydCBmcmFnIGZyb20gJy4vZnJhZy5qcyc7XHJcbmV4cG9ydCBkZWZhdWx0IHsgdmVydCwgZnJhZyB9O1xyXG4iLCJleHBvcnQgZGVmYXVsdCBgI3ZlcnNpb24gMzAwIGVzXHJcbiBcclxubGF5b3V0KGxvY2F0aW9uID0gMCkgaW4gdmVjNCBhX3Bvc2l0aW9uO1xyXG5sYXlvdXQobG9jYXRpb24gPSAxKSBpbiB2ZWMzIGFfbm9ybWFsO1xyXG5cclxuXHJcbnVuaWZvcm0gbWF0NCB1X21hdHJpeDtcclxudW5pZm9ybSBtYXQ0IHVfd29ybGRWaWV3UHJvamVjdGlvbjtcclxudW5pZm9ybSB2ZWMzIHVfbGlnaHRXb3JsZFBvc2l0aW9uO1xyXG51bmlmb3JtIHZlYzMgdV92aWV3V29ybGRQb3NpdGlvbjtcclxuXHJcbm91dCB2ZWMzIHZfbm9ybWFsO1xyXG5vdXQgdmVjMyB2X3N1cmZhY2VUb0xpZ2h0O1xyXG5vdXQgdmVjMyB2X3N1cmZhY2VUb1ZpZXc7XHJcbnZvaWQgbWFpbigpIHtcclxuICAgIFxyXG4gICAgZ2xfUG9zaXRpb24gPSB1X3dvcmxkVmlld1Byb2plY3Rpb24gKiBhX3Bvc2l0aW9uO1xyXG4gICAgXHJcbiAgICB2ZWMzIHN1cmZhY2VXb3JsZFBvc2l0aW9uID0gKHVfbWF0cml4ICogYV9wb3NpdGlvbikueHl6O1xyXG4gICAgXHJcbiAgICB2X3N1cmZhY2VUb0xpZ2h0ID0gdV9saWdodFdvcmxkUG9zaXRpb24gLSBzdXJmYWNlV29ybGRQb3NpdGlvbjtcclxuXHJcbiAgICB2X25vcm1hbCA9IG1hdDMoICB1X21hdHJpeCApICogYV9ub3JtYWw7XHJcbiAgICBcclxuICAgIHZfc3VyZmFjZVRvVmlldyA9IHVfdmlld1dvcmxkUG9zaXRpb24gLSBzdXJmYWNlV29ybGRQb3NpdGlvbjtcclxuICAgICAgXHJcbn1gO1xyXG4iLCJpbXBvcnQgQUFCQiwgeyBnZXRDZW50ZXIsIGdldERpYWdvbmFsLCBpc0NvbGxpZGUgfSBmcm9tIFwiLi9hYWJiXCI7XHJcbmltcG9ydCB2MyBmcm9tIFwiLi92M1wiO1xyXG5jb25zdCBlbGVtZW50U2l6ZSA9IDE7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9jdHJlZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihhYWJiKSB7XHJcbiAgICAgICAgdGhpcy5hYWJiID0gYWFiYjtcclxuICAgICAgICB0aGlzLmRpYWdvbmFsID0gZ2V0RGlhZ29uYWwoYWFiYik7XHJcbiAgICAgICAgdGhpcy5jZW50ZXIgPSBnZXRDZW50ZXIoYWFiYik7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcclxuICAgICAgICB0aGlzLmNhcGFjaXR5ID0gNDtcclxuICAgIH1cclxuICAgIHN1YmRpdmlkZSgpIHtcclxuICAgICAgICBjb25zdCBtaW4gPSB0aGlzLmFhYmIubWluO1xyXG4gICAgICAgIGNvbnN0IG1heCA9IHRoaXMuYWFiYi5tYXg7XHJcbiAgICAgICAgY29uc3QgW3gxLCB5MSwgejFdID0gbWluO1xyXG4gICAgICAgIGNvbnN0IFt4MiwgeTIsIHoyXSA9IG1heDtcclxuICAgICAgICBjb25zdCB4YyA9IHRoaXMuY2VudGVyWzBdO1xyXG4gICAgICAgIGNvbnN0IHljID0gdGhpcy5jZW50ZXJbMV07XHJcbiAgICAgICAgY29uc3QgemMgPSB0aGlzLmNlbnRlclsyXTtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuWzBdID0gbmV3IE9jdHJlZShuZXcgQUFCQihbeDEsIHkxLCB6MV0sIFt4YywgeWMsIHpjXSkpO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5bMV0gPSBuZXcgT2N0cmVlKG5ldyBBQUJCKFt4MSwgeTEsIHpjXSwgW3hjLCB5YywgejJdKSk7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlblsyXSA9IG5ldyBPY3RyZWUobmV3IEFBQkIoW3gxLCB5YywgejFdLCBbeGMsIHkyLCB6Y10pKTtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuWzNdID0gbmV3IE9jdHJlZShuZXcgQUFCQihbeDEsIHljLCB6Y10sIFt4YywgeTIsIHoyXSkpO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5bNF0gPSBuZXcgT2N0cmVlKG5ldyBBQUJCKFt4YywgeTEsIHoxXSwgW3gyLCB5YywgemNdKSk7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbls1XSA9IG5ldyBPY3RyZWUobmV3IEFBQkIoW3hjLCB5MSwgemNdLCBbeDIsIHljLCB6Ml0pKTtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuWzZdID0gbmV3IE9jdHJlZShuZXcgQUFCQihbeGMsIHljLCB6MV0sIFt4MiwgeTIsIHpjXSkpO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5bN10gPSBuZXcgT2N0cmVlKG5ldyBBQUJCKFt4YywgeWMsIHpjXSwgW3gyLCB5MiwgejJdKSk7XHJcbiAgICB9XHJcbiAgICBpbnNlcnQodm94ZWwpIHtcclxuICAgICAgICBpZiAodGhpcy5lbGVtZW50cy5sZW5ndGggPCB0aGlzLmNhcGFjaXR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudHMucHVzaCh2b3hlbCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID09PSAwKVxyXG4gICAgICAgICAgICB0aGlzLnN1YmRpdmlkZSgpO1xyXG4gICAgICAgIGNvbnN0IHhjID0gdGhpcy5jZW50ZXJbMF07XHJcbiAgICAgICAgY29uc3QgeWMgPSB0aGlzLmNlbnRlclsxXTtcclxuICAgICAgICBjb25zdCB6YyA9IHRoaXMuY2VudGVyWzJdO1xyXG4gICAgICAgIGNvbnN0IHggPSBOdW1iZXIodm94ZWxbMF0gPiB4YykgKiA0O1xyXG4gICAgICAgIGNvbnN0IHkgPSBOdW1iZXIodm94ZWxbMV0gPiB5YykgKiAyO1xyXG4gICAgICAgIGNvbnN0IHogPSBOdW1iZXIodm94ZWxbMl0gPiB6Yyk7XHJcbiAgICAgICAgY29uc3QgaWR4ID0geiB8IHkgfCB4O1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5baWR4XS5pbnNlcnQodm94ZWwpO1xyXG4gICAgfVxyXG4gICAgcXVlcnkoYWFiYikge1xyXG4gICAgICAgIGNvbnN0IGZvdW5kID0gW107XHJcbiAgICAgICAgaWYgKCFpc0NvbGxpZGUodGhpcy5hYWJiLCBhYWJiKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZm91bmQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgY29uc3QgX2FhYmIgPSBuZXcgQUFCQih2My5zdW0oZWxlbWVudCwgWy0wLjUsIC0wLjUsIC0wLjVdKSwgdjMuc3VtKGVsZW1lbnQsIFswLjUsIDAuNSwgMC41XSkpO1xyXG4gICAgICAgICAgICBpZiAoaXNDb2xsaWRlKGFhYmIsIF9hYWJiKSkge1xyXG4gICAgICAgICAgICAgICAgZm91bmQucHVzaChlbGVtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgICAgICAgIGZvdW5kLnB1c2goLi4uY2hpbGQucXVlcnkoYWFiYikpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBmb3VuZDtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgdjMgZnJvbSBcIi4vdjNcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQUFCQiB7XHJcbiAgICBjb25zdHJ1Y3RvcihtaW4sIG1heCkge1xyXG4gICAgICAgIHRoaXMubWluID0gbWluO1xyXG4gICAgICAgIHRoaXMubWF4ID0gbWF4O1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjb25zdCBpc0NvbGxpZGUgPSAoYWFiYjEsIGFhYmIyKSA9PiB7XHJcbiAgICBpZiAoYWFiYjEubWluWzBdIDw9IGFhYmIyLm1heFswXSAmJlxyXG4gICAgICAgIGFhYmIxLm1heFswXSA+PSBhYWJiMi5taW5bMF0gJiZcclxuICAgICAgICBhYWJiMS5taW5bMV0gPD0gYWFiYjIubWF4WzFdICYmXHJcbiAgICAgICAgYWFiYjEubWF4WzFdID49IGFhYmIyLm1pblsxXSAmJlxyXG4gICAgICAgIGFhYmIxLm1pblsyXSA8PSBhYWJiMi5tYXhbMl0gJiZcclxuICAgICAgICBhYWJiMS5tYXhbMl0gPj0gYWFiYjIubWluWzJdKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRDZW50ZXIgPSAoYWFiYikgPT4ge1xyXG4gICAgY29uc3Qgc3VtID0gdjMuc3VtKGFhYmIubWF4LCBhYWJiLm1pbik7XHJcbiAgICByZXR1cm4gW3N1bVswXSAvIDIsIHN1bVsxXSAvIDIsIHN1bVsyXSAvIDJdO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZ2V0RGlhZ29uYWwgPSAoYWFiYikgPT4gdjMuZGlmZihhYWJiLm1heCwgYWFiYi5taW4pO1xyXG5leHBvcnQgY29uc3QgY29udGFpbnMgPSAoYWFiYiwgcCkgPT4geyB9O1xyXG4iLCJpbXBvcnQgQUFCQiBmcm9tIFwiLi9hYWJiXCI7XHJcbmltcG9ydCB2MyBmcm9tIFwiLi92M1wiO1xyXG5pbXBvcnQgbTMgZnJvbSBcIi4vbTNcIjtcclxuaW1wb3J0IG00IGZyb20gXCIuL200XCI7XHJcbmltcG9ydCBPY3RyZWUgZnJvbSBcIi4vT2N0cmVlXCI7XHJcbmV4cG9ydCB7IEFBQkIsIHYzLCBtNCwgbTMsIE9jdHJlZSB9O1xyXG4iLCJjb25zdCBtMyA9IHtcclxuICAgIG11bHRpcGx5OiBmdW5jdGlvbiAoYiwgYSkge1xyXG4gICAgICAgIGNvbnN0IGEwMCA9IGFbMCAqIDMgKyAwXTtcclxuICAgICAgICBjb25zdCBhMDEgPSBhWzAgKiAzICsgMV07XHJcbiAgICAgICAgY29uc3QgYTAyID0gYVswICogMyArIDJdO1xyXG4gICAgICAgIGNvbnN0IGExMCA9IGFbMSAqIDMgKyAwXTtcclxuICAgICAgICBjb25zdCBhMTEgPSBhWzEgKiAzICsgMV07XHJcbiAgICAgICAgY29uc3QgYTEyID0gYVsxICogMyArIDJdO1xyXG4gICAgICAgIGNvbnN0IGEyMCA9IGFbMiAqIDMgKyAwXTtcclxuICAgICAgICBjb25zdCBhMjEgPSBhWzIgKiAzICsgMV07XHJcbiAgICAgICAgY29uc3QgYTIyID0gYVsyICogMyArIDJdO1xyXG4gICAgICAgIGNvbnN0IGIwMCA9IGJbMCAqIDMgKyAwXTtcclxuICAgICAgICBjb25zdCBiMDEgPSBiWzAgKiAzICsgMV07XHJcbiAgICAgICAgY29uc3QgYjAyID0gYlswICogMyArIDJdO1xyXG4gICAgICAgIGNvbnN0IGIxMCA9IGJbMSAqIDMgKyAwXTtcclxuICAgICAgICBjb25zdCBiMTEgPSBiWzEgKiAzICsgMV07XHJcbiAgICAgICAgY29uc3QgYjEyID0gYlsxICogMyArIDJdO1xyXG4gICAgICAgIGNvbnN0IGIyMCA9IGJbMiAqIDMgKyAwXTtcclxuICAgICAgICBjb25zdCBiMjEgPSBiWzIgKiAzICsgMV07XHJcbiAgICAgICAgY29uc3QgYjIyID0gYlsyICogMyArIDJdO1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIGIwMCAqIGEwMCArIGIwMSAqIGExMCArIGIwMiAqIGEyMCxcclxuICAgICAgICAgICAgYjAwICogYTAxICsgYjAxICogYTExICsgYjAyICogYTIxLFxyXG4gICAgICAgICAgICBiMDAgKiBhMDIgKyBiMDEgKiBhMTIgKyBiMDIgKiBhMjIsXHJcbiAgICAgICAgICAgIGIxMCAqIGEwMCArIGIxMSAqIGExMCArIGIxMiAqIGEyMCxcclxuICAgICAgICAgICAgYjEwICogYTAxICsgYjExICogYTExICsgYjEyICogYTIxLFxyXG4gICAgICAgICAgICBiMTAgKiBhMDIgKyBiMTEgKiBhMTIgKyBiMTIgKiBhMjIsXHJcbiAgICAgICAgICAgIGIyMCAqIGEwMCArIGIyMSAqIGExMCArIGIyMiAqIGEyMCxcclxuICAgICAgICAgICAgYjIwICogYTAxICsgYjIxICogYTExICsgYjIyICogYTIxLFxyXG4gICAgICAgICAgICBiMjAgKiBhMDIgKyBiMjEgKiBhMTIgKyBiMjIgKiBhMjIsXHJcbiAgICAgICAgXTtcclxuICAgIH0sXHJcbiAgICB4Um90YXRpb246IGZ1bmN0aW9uIChhbmdsZUluUmFkaWFucykge1xyXG4gICAgICAgIGNvbnN0IGMgPSBNYXRoLmNvcyhhbmdsZUluUmFkaWFucyk7XHJcbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKGFuZ2xlSW5SYWRpYW5zKTtcclxuICAgICAgICByZXR1cm4gWzEsIDAsIDAsIDAsIGMsIHMsIDAsIC1zLCBjXTtcclxuICAgIH0sXHJcbiAgICB5Um90YXRpb246IGZ1bmN0aW9uIChhbmdsZUluUmFkaWFucykge1xyXG4gICAgICAgIGNvbnN0IGMgPSBNYXRoLmNvcyhhbmdsZUluUmFkaWFucyk7XHJcbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKGFuZ2xlSW5SYWRpYW5zKTtcclxuICAgICAgICByZXR1cm4gW2MsIDAsIC1zLCAwLCAxLCAwLCBzLCAwLCBjXTtcclxuICAgIH0sXHJcbiAgICB6Um90YXRpb246IGZ1bmN0aW9uIChhbmdsZUluUmFkaWFucykge1xyXG4gICAgICAgIGNvbnN0IGMgPSBNYXRoLmNvcyhhbmdsZUluUmFkaWFucyk7XHJcbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKGFuZ2xlSW5SYWRpYW5zKTtcclxuICAgICAgICByZXR1cm4gW2MsIHMsIDAsIC1zLCBjLCAwLCAwLCAwLCAxXTtcclxuICAgIH0sXHJcbiAgICBtM1RvbTQ6IGZ1bmN0aW9uIChtKSB7XHJcbiAgICAgICAgY29uc3QgZHN0ID0gbmV3IEFycmF5KDE2KTtcclxuICAgICAgICBkc3RbMF0gPSBtWzBdO1xyXG4gICAgICAgIGRzdFsxXSA9IG1bMV07XHJcbiAgICAgICAgZHN0WzJdID0gbVsyXTtcclxuICAgICAgICBkc3RbM10gPSAwO1xyXG4gICAgICAgIGRzdFs0XSA9IG1bM107XHJcbiAgICAgICAgZHN0WzVdID0gbVs0XTtcclxuICAgICAgICBkc3RbNl0gPSBtWzVdO1xyXG4gICAgICAgIGRzdFs3XSA9IDA7XHJcbiAgICAgICAgZHN0WzhdID0gbVs2XTtcclxuICAgICAgICBkc3RbOV0gPSBtWzddO1xyXG4gICAgICAgIGRzdFsxMF0gPSBtWzhdO1xyXG4gICAgICAgIGRzdFsxMV0gPSAwO1xyXG4gICAgICAgIGRzdFsxMl0gPSAwO1xyXG4gICAgICAgIGRzdFsxM10gPSAwO1xyXG4gICAgICAgIGRzdFsxNF0gPSAwO1xyXG4gICAgICAgIGRzdFsxNV0gPSAxO1xyXG4gICAgICAgIHJldHVybiBkc3Q7XHJcbiAgICB9LFxyXG4gICAgeFJvdGF0ZTogZnVuY3Rpb24gKG0sIGFuZ2xlSW5SYWRpYW5zKSB7XHJcbiAgICAgICAgcmV0dXJuIG0zLm11bHRpcGx5KG0sIG0zLnhSb3RhdGlvbihhbmdsZUluUmFkaWFucykpO1xyXG4gICAgfSxcclxuICAgIHlSb3RhdGU6IGZ1bmN0aW9uIChtLCBhbmdsZUluUmFkaWFucykge1xyXG4gICAgICAgIHJldHVybiBtMy5tdWx0aXBseShtLCBtMy55Um90YXRpb24oYW5nbGVJblJhZGlhbnMpKTtcclxuICAgIH0sXHJcbiAgICB6Um90YXRlOiBmdW5jdGlvbiAobSwgYW5nbGVJblJhZGlhbnMpIHtcclxuICAgICAgICByZXR1cm4gbTMubXVsdGlwbHkobSwgbTMuelJvdGF0aW9uKGFuZ2xlSW5SYWRpYW5zKSk7XHJcbiAgICB9LFxyXG4gICAgdHJhbnNmb3JtUG9pbnQ6IGZ1bmN0aW9uIChtLCB2KSB7XHJcbiAgICAgICAgY29uc3QgZHN0ID0gWzAsIDAsIDBdO1xyXG4gICAgICAgIGNvbnN0IHYwID0gdlswXTtcclxuICAgICAgICBjb25zdCB2MSA9IHZbMV07XHJcbiAgICAgICAgY29uc3QgdjIgPSB2WzJdO1xyXG4gICAgICAgIGRzdFswXSA9IHYwICogbVswICogMyArIDBdICsgdjEgKiBtWzEgKiAzICsgMF0gKyB2MiAqIG1bMiAqIDMgKyAwXTtcclxuICAgICAgICBkc3RbMV0gPSB2MCAqIG1bMCAqIDMgKyAxXSArIHYxICogbVsxICogMyArIDFdICsgdjIgKiBtWzIgKiAzICsgMV07XHJcbiAgICAgICAgZHN0WzJdID0gdjAgKiBtWzAgKiAzICsgMl0gKyB2MSAqIG1bMSAqIDMgKyAyXSArIHYyICogbVsyICogMyArIDJdO1xyXG4gICAgICAgIHJldHVybiBkc3Q7XHJcbiAgICB9LFxyXG4gICAgaWRlbnRpdHk6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gWzEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDFdO1xyXG4gICAgfSxcclxuICAgIHRyYW5zcG9zZTogZnVuY3Rpb24gKG0pIHtcclxuICAgICAgICBjb25zdCBkc3QgPSBuZXcgQXJyYXkoOSk7XHJcbiAgICAgICAgZHN0WzBdID0gbVswXTtcclxuICAgICAgICBkc3RbMV0gPSBtWzNdO1xyXG4gICAgICAgIGRzdFsyXSA9IG1bNl07XHJcbiAgICAgICAgZHN0WzNdID0gbVsxXTtcclxuICAgICAgICBkc3RbNF0gPSBtWzRdO1xyXG4gICAgICAgIGRzdFs1XSA9IG1bN107XHJcbiAgICAgICAgZHN0WzZdID0gbVsyXTtcclxuICAgICAgICBkc3RbN10gPSBtWzVdO1xyXG4gICAgICAgIGRzdFs4XSA9IG1bOF07XHJcbiAgICAgICAgcmV0dXJuIGRzdDtcclxuICAgIH0sXHJcbiAgICBzY2FsaW5nOiBmdW5jdGlvbiAoc3gsIHN5LCBzeikge1xyXG4gICAgICAgIHJldHVybiBbc3gsIDAsIDAsIDAsIHN5LCAwLCAwLCAwLCBzel07XHJcbiAgICB9LFxyXG4gICAgc2NhbGU6IGZ1bmN0aW9uIChtLCBzeCwgc3ksIHN6KSB7XHJcbiAgICAgICAgcmV0dXJuIG0zLm11bHRpcGx5KG0sIG0zLnNjYWxpbmcoc3gsIHN5LCBzeikpO1xyXG4gICAgfSxcclxuICAgIC8qXHJcbiAgICAgICAgMCAxIDJcclxuICAgICAgICAzIDQgNVxyXG4gICAgICAgIDYgNyA4XHJcbiAgICAgICAgKi9cclxuICAgIGludmVyc2U6IGZ1bmN0aW9uIChtKSB7XHJcbiAgICAgICAgY29uc3QgZGV0ID0gbVswXSAqIG1bNF0gKiBtWzhdICtcclxuICAgICAgICAgICAgbVsyXSAqIG1bM10gKiBtWzddICtcclxuICAgICAgICAgICAgbVsxXSAqIG1bNV0gKiBtWzZdIC1cclxuICAgICAgICAgICAgbVsyXSAqIG1bNF0gKiBtWzZdIC1cclxuICAgICAgICAgICAgbVswXSAqIG1bNV0gKiBtWzddIC1cclxuICAgICAgICAgICAgbVs4XSAqIG1bM10gKiBtWzJdO1xyXG4gICAgICAgIGNvbnN0IGRzdCA9IG5ldyBBcnJheSg5KTtcclxuICAgICAgICBkc3RbMF0gPSAobVs0XSAqIG1bOF0gLSBtWzddICogbVs1XSkgLyBkZXQ7XHJcbiAgICAgICAgZHN0WzFdID0gKG1bM10gKiBtWzhdIC0gbVs2XSAqIG1bNV0pIC8gZGV0O1xyXG4gICAgICAgIGRzdFsyXSA9IChtWzNdICogbVs3XSAtIG1bNl0gKiBtWzRdKSAvIGRldDtcclxuICAgICAgICBkc3RbM10gPSAobVsxXSAqIG1bOF0gLSBtWzJdICogbVs3XSkgLyBkZXQ7XHJcbiAgICAgICAgZHN0WzRdID0gKG1bMF0gKiBtWzhdIC0gbVsyXSAqIG1bNl0pIC8gZGV0O1xyXG4gICAgICAgIGRzdFs1XSA9IChtWzBdICogbVs3XSAtIG1bMV0gKiBtWzZdKSAvIGRldDtcclxuICAgICAgICBkc3RbNl0gPSAobVsxXSAqIG1bNV0gLSBtWzJdICogbVs0XSkgLyBkZXQ7XHJcbiAgICAgICAgZHN0WzddID0gKG1bMF0gKiBtWzVdIC0gbVsyXSAqIG1bM10pIC8gZGV0O1xyXG4gICAgICAgIGRzdFs4XSA9IChtWzBdICogbVs0XSAtIG1bMV0gKiBtWzRdKSAvIGRldDtcclxuICAgICAgICByZXR1cm4gZHN0O1xyXG4gICAgfSxcclxuICAgIHRvU3RyaW5nKG0pIHtcclxuICAgICAgICByZXR1cm4gbS5yZWR1Y2UoKGFjYywgZWwsIGlkeCkgPT4gaWR4ICUgMyA9PT0gMFxyXG4gICAgICAgICAgICA/IChhY2MgKz0gYFxcbiR7ZWwudG9TdHJpbmcoKX1gKVxyXG4gICAgICAgICAgICA6IChhY2MgKz0gYCAke2VsLnRvU3RyaW5nKCl9YCksIFwiXCIpO1xyXG4gICAgfSxcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgbTM7XHJcbiIsImltcG9ydCB2MyBmcm9tIFwiLi92M1wiO1xyXG5jb25zdCBtNCA9IHtcclxuICAgIG11bHRpcGx5OiBmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgIGNvbnN0IGEwMCA9IGFbMCAqIDQgKyAwXTtcclxuICAgICAgICBjb25zdCBhMDEgPSBhWzAgKiA0ICsgMV07XHJcbiAgICAgICAgY29uc3QgYTAyID0gYVswICogNCArIDJdO1xyXG4gICAgICAgIGNvbnN0IGEwMyA9IGFbMCAqIDQgKyAzXTtcclxuICAgICAgICBjb25zdCBhMTAgPSBhWzEgKiA0ICsgMF07XHJcbiAgICAgICAgY29uc3QgYTExID0gYVsxICogNCArIDFdO1xyXG4gICAgICAgIGNvbnN0IGExMiA9IGFbMSAqIDQgKyAyXTtcclxuICAgICAgICBjb25zdCBhMTMgPSBhWzEgKiA0ICsgM107XHJcbiAgICAgICAgY29uc3QgYTIwID0gYVsyICogNCArIDBdO1xyXG4gICAgICAgIGNvbnN0IGEyMSA9IGFbMiAqIDQgKyAxXTtcclxuICAgICAgICBjb25zdCBhMjIgPSBhWzIgKiA0ICsgMl07XHJcbiAgICAgICAgY29uc3QgYTIzID0gYVsyICogNCArIDNdO1xyXG4gICAgICAgIGNvbnN0IGEzMCA9IGFbMyAqIDQgKyAwXTtcclxuICAgICAgICBjb25zdCBhMzEgPSBhWzMgKiA0ICsgMV07XHJcbiAgICAgICAgY29uc3QgYTMyID0gYVszICogNCArIDJdO1xyXG4gICAgICAgIGNvbnN0IGEzMyA9IGFbMyAqIDQgKyAzXTtcclxuICAgICAgICBjb25zdCBiMDAgPSBiWzAgKiA0ICsgMF07XHJcbiAgICAgICAgY29uc3QgYjAxID0gYlswICogNCArIDFdO1xyXG4gICAgICAgIGNvbnN0IGIwMiA9IGJbMCAqIDQgKyAyXTtcclxuICAgICAgICBjb25zdCBiMDMgPSBiWzAgKiA0ICsgM107XHJcbiAgICAgICAgY29uc3QgYjEwID0gYlsxICogNCArIDBdO1xyXG4gICAgICAgIGNvbnN0IGIxMSA9IGJbMSAqIDQgKyAxXTtcclxuICAgICAgICBjb25zdCBiMTIgPSBiWzEgKiA0ICsgMl07XHJcbiAgICAgICAgY29uc3QgYjEzID0gYlsxICogNCArIDNdO1xyXG4gICAgICAgIGNvbnN0IGIyMCA9IGJbMiAqIDQgKyAwXTtcclxuICAgICAgICBjb25zdCBiMjEgPSBiWzIgKiA0ICsgMV07XHJcbiAgICAgICAgY29uc3QgYjIyID0gYlsyICogNCArIDJdO1xyXG4gICAgICAgIGNvbnN0IGIyMyA9IGJbMiAqIDQgKyAzXTtcclxuICAgICAgICBjb25zdCBiMzAgPSBiWzMgKiA0ICsgMF07XHJcbiAgICAgICAgY29uc3QgYjMxID0gYlszICogNCArIDFdO1xyXG4gICAgICAgIGNvbnN0IGIzMiA9IGJbMyAqIDQgKyAyXTtcclxuICAgICAgICBjb25zdCBiMzMgPSBiWzMgKiA0ICsgM107XHJcbiAgICAgICAgY29uc3QgZHN0ID0gW1xyXG4gICAgICAgICAgICBiMDAgKiBhMDAgKyBiMDEgKiBhMTAgKyBiMDIgKiBhMjAgKyBiMDMgKiBhMzAsXHJcbiAgICAgICAgICAgIGIwMCAqIGEwMSArIGIwMSAqIGExMSArIGIwMiAqIGEyMSArIGIwMyAqIGEzMSxcclxuICAgICAgICAgICAgYjAwICogYTAyICsgYjAxICogYTEyICsgYjAyICogYTIyICsgYjAzICogYTMyLFxyXG4gICAgICAgICAgICBiMDAgKiBhMDMgKyBiMDEgKiBhMTMgKyBiMDIgKiBhMjMgKyBiMDMgKiBhMzMsXHJcbiAgICAgICAgICAgIGIxMCAqIGEwMCArIGIxMSAqIGExMCArIGIxMiAqIGEyMCArIGIxMyAqIGEzMCxcclxuICAgICAgICAgICAgYjEwICogYTAxICsgYjExICogYTExICsgYjEyICogYTIxICsgYjEzICogYTMxLFxyXG4gICAgICAgICAgICBiMTAgKiBhMDIgKyBiMTEgKiBhMTIgKyBiMTIgKiBhMjIgKyBiMTMgKiBhMzIsXHJcbiAgICAgICAgICAgIGIxMCAqIGEwMyArIGIxMSAqIGExMyArIGIxMiAqIGEyMyArIGIxMyAqIGEzMyxcclxuICAgICAgICAgICAgYjIwICogYTAwICsgYjIxICogYTEwICsgYjIyICogYTIwICsgYjIzICogYTMwLFxyXG4gICAgICAgICAgICBiMjAgKiBhMDEgKyBiMjEgKiBhMTEgKyBiMjIgKiBhMjEgKyBiMjMgKiBhMzEsXHJcbiAgICAgICAgICAgIGIyMCAqIGEwMiArIGIyMSAqIGExMiArIGIyMiAqIGEyMiArIGIyMyAqIGEzMixcclxuICAgICAgICAgICAgYjIwICogYTAzICsgYjIxICogYTEzICsgYjIyICogYTIzICsgYjIzICogYTMzLFxyXG4gICAgICAgICAgICBiMzAgKiBhMDAgKyBiMzEgKiBhMTAgKyBiMzIgKiBhMjAgKyBiMzMgKiBhMzAsXHJcbiAgICAgICAgICAgIGIzMCAqIGEwMSArIGIzMSAqIGExMSArIGIzMiAqIGEyMSArIGIzMyAqIGEzMSxcclxuICAgICAgICAgICAgYjMwICogYTAyICsgYjMxICogYTEyICsgYjMyICogYTIyICsgYjMzICogYTMyLFxyXG4gICAgICAgICAgICBiMzAgKiBhMDMgKyBiMzEgKiBhMTMgKyBiMzIgKiBhMjMgKyBiMzMgKiBhMzMsXHJcbiAgICAgICAgXTtcclxuICAgICAgICByZXR1cm4gZHN0O1xyXG4gICAgfSxcclxuICAgIHRyYW5zbGF0aW9uOiBmdW5jdGlvbiAodHgsIHR5LCB0eikge1xyXG4gICAgICAgIHJldHVybiBbMSwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMSwgMCwgdHgsIHR5LCB0eiwgMV07XHJcbiAgICB9LFxyXG4gICAgeFJvdGF0aW9uOiBmdW5jdGlvbiAoYW5nbGVJblJhZGlhbnMpIHtcclxuICAgICAgICBjb25zdCBjID0gTWF0aC5jb3MoYW5nbGVJblJhZGlhbnMpO1xyXG4gICAgICAgIGNvbnN0IHMgPSBNYXRoLnNpbihhbmdsZUluUmFkaWFucyk7XHJcbiAgICAgICAgcmV0dXJuIFsxLCAwLCAwLCAwLCAwLCBjLCBzLCAwLCAwLCAtcywgYywgMCwgMCwgMCwgMCwgMV07XHJcbiAgICB9LFxyXG4gICAgeVJvdGF0aW9uOiBmdW5jdGlvbiAoYW5nbGVJblJhZGlhbnMpIHtcclxuICAgICAgICBjb25zdCBjID0gTWF0aC5jb3MoYW5nbGVJblJhZGlhbnMpO1xyXG4gICAgICAgIGNvbnN0IHMgPSBNYXRoLnNpbihhbmdsZUluUmFkaWFucyk7XHJcbiAgICAgICAgcmV0dXJuIFtjLCAwLCAtcywgMCwgMCwgMSwgMCwgMCwgcywgMCwgYywgMCwgMCwgMCwgMCwgMV07XHJcbiAgICB9LFxyXG4gICAgelJvdGF0aW9uOiBmdW5jdGlvbiAoYW5nbGVJblJhZGlhbnMpIHtcclxuICAgICAgICBjb25zdCBjID0gTWF0aC5jb3MoYW5nbGVJblJhZGlhbnMpO1xyXG4gICAgICAgIGNvbnN0IHMgPSBNYXRoLnNpbihhbmdsZUluUmFkaWFucyk7XHJcbiAgICAgICAgcmV0dXJuIFtjLCBzLCAwLCAwLCAtcywgYywgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMV07XHJcbiAgICB9LFxyXG4gICAgc2NhbGluZzogZnVuY3Rpb24gKHN4LCBzeSwgc3opIHtcclxuICAgICAgICByZXR1cm4gW3N4LCAwLCAwLCAwLCAwLCBzeSwgMCwgMCwgMCwgMCwgc3osIDAsIDAsIDAsIDAsIDFdO1xyXG4gICAgfSxcclxuICAgIHRyYW5zbGF0ZTogZnVuY3Rpb24gKG0sIHR4LCB0eSwgdHopIHtcclxuICAgICAgICByZXR1cm4gbTQubXVsdGlwbHkobSwgbTQudHJhbnNsYXRpb24odHgsIHR5LCB0eikpO1xyXG4gICAgfSxcclxuICAgIHhSb3RhdGU6IGZ1bmN0aW9uIChtLCBhbmdsZUluUmFkaWFucykge1xyXG4gICAgICAgIHJldHVybiBtNC5tdWx0aXBseShtLCBtNC54Um90YXRpb24oYW5nbGVJblJhZGlhbnMpKTtcclxuICAgIH0sXHJcbiAgICB5Um90YXRlOiBmdW5jdGlvbiAobSwgYW5nbGVJblJhZGlhbnMpIHtcclxuICAgICAgICByZXR1cm4gbTQubXVsdGlwbHkobSwgbTQueVJvdGF0aW9uKGFuZ2xlSW5SYWRpYW5zKSk7XHJcbiAgICB9LFxyXG4gICAgelJvdGF0ZTogZnVuY3Rpb24gKG0sIGFuZ2xlSW5SYWRpYW5zKSB7XHJcbiAgICAgICAgcmV0dXJuIG00Lm11bHRpcGx5KG0sIG00LnpSb3RhdGlvbihhbmdsZUluUmFkaWFucykpO1xyXG4gICAgfSxcclxuICAgIHNjYWxlOiBmdW5jdGlvbiAobSwgc3gsIHN5LCBzeikge1xyXG4gICAgICAgIHJldHVybiBtNC5tdWx0aXBseShtLCBtNC5zY2FsaW5nKHN4LCBzeSwgc3opKTtcclxuICAgIH0sXHJcbiAgICBtYWtlT3J0OiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgIGNvbnN0IG8gPSBbMCwgMCwgMF07XHJcbiAgICAgICAgY29uc3Qgbm9ybSA9IE1hdGguc3FydCh2WzBdICogdlswXSArIHZbMV0gKiB2WzFdICsgdlsyXSAqIHZbMl0pO1xyXG4gICAgICAgIG9bMF0gPSB2WzBdIC8gbm9ybTtcclxuICAgICAgICBvWzFdID0gdlsxXSAvIG5vcm07XHJcbiAgICAgICAgb1syXSA9IHZbMl0gLyBub3JtO1xyXG4gICAgICAgIHJldHVybiBvO1xyXG4gICAgfSxcclxuICAgIHByb2plY3Rpb246IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0LCBkZXB0aCkge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIDIgLyB3aWR0aCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgLTIgLyBoZWlnaHQsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDIgLyBkZXB0aCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgLTEsXHJcbiAgICAgICAgICAgIDEsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDEsXHJcbiAgICAgICAgXTtcclxuICAgIH0sXHJcbiAgICBwZXJzcGVjdGl2ZTogZnVuY3Rpb24gKGZpZWxkT2ZWaWV3SW5SYWRpYW5zLCBhc3BlY3QsIG5lYXIsIGZhcikge1xyXG4gICAgICAgIGNvbnN0IGYgPSBNYXRoLnRhbihNYXRoLlBJICogMC41IC0gMC41ICogZmllbGRPZlZpZXdJblJhZGlhbnMpO1xyXG4gICAgICAgIGNvbnN0IHJhbmdlSW52ID0gMS4wIC8gKG5lYXIgLSBmYXIpO1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIGYgLyBhc3BlY3QsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIGYsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIChuZWFyICsgZmFyKSAqIHJhbmdlSW52LFxyXG4gICAgICAgICAgICAtMSxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgbmVhciAqIGZhciAqIHJhbmdlSW52ICogMixcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICBdO1xyXG4gICAgfSxcclxuICAgIGludmVyc2U6IGZ1bmN0aW9uIChtKSB7XHJcbiAgICAgICAgY29uc3QgbTAwID0gbVswICogNCArIDBdO1xyXG4gICAgICAgIGNvbnN0IG0wMSA9IG1bMCAqIDQgKyAxXTtcclxuICAgICAgICBjb25zdCBtMDIgPSBtWzAgKiA0ICsgMl07XHJcbiAgICAgICAgY29uc3QgbTAzID0gbVswICogNCArIDNdO1xyXG4gICAgICAgIGNvbnN0IG0xMCA9IG1bMSAqIDQgKyAwXTtcclxuICAgICAgICBjb25zdCBtMTEgPSBtWzEgKiA0ICsgMV07XHJcbiAgICAgICAgY29uc3QgbTEyID0gbVsxICogNCArIDJdO1xyXG4gICAgICAgIGNvbnN0IG0xMyA9IG1bMSAqIDQgKyAzXTtcclxuICAgICAgICBjb25zdCBtMjAgPSBtWzIgKiA0ICsgMF07XHJcbiAgICAgICAgY29uc3QgbTIxID0gbVsyICogNCArIDFdO1xyXG4gICAgICAgIGNvbnN0IG0yMiA9IG1bMiAqIDQgKyAyXTtcclxuICAgICAgICBjb25zdCBtMjMgPSBtWzIgKiA0ICsgM107XHJcbiAgICAgICAgY29uc3QgbTMwID0gbVszICogNCArIDBdO1xyXG4gICAgICAgIGNvbnN0IG0zMSA9IG1bMyAqIDQgKyAxXTtcclxuICAgICAgICBjb25zdCBtMzIgPSBtWzMgKiA0ICsgMl07XHJcbiAgICAgICAgY29uc3QgbTMzID0gbVszICogNCArIDNdO1xyXG4gICAgICAgIGNvbnN0IHRtcF8wID0gbTIyICogbTMzO1xyXG4gICAgICAgIGNvbnN0IHRtcF8xID0gbTMyICogbTIzO1xyXG4gICAgICAgIGNvbnN0IHRtcF8yID0gbTEyICogbTMzO1xyXG4gICAgICAgIGNvbnN0IHRtcF8zID0gbTMyICogbTEzO1xyXG4gICAgICAgIGNvbnN0IHRtcF80ID0gbTEyICogbTIzO1xyXG4gICAgICAgIGNvbnN0IHRtcF81ID0gbTIyICogbTEzO1xyXG4gICAgICAgIGNvbnN0IHRtcF82ID0gbTAyICogbTMzO1xyXG4gICAgICAgIGNvbnN0IHRtcF83ID0gbTMyICogbTAzO1xyXG4gICAgICAgIGNvbnN0IHRtcF84ID0gbTAyICogbTIzO1xyXG4gICAgICAgIGNvbnN0IHRtcF85ID0gbTIyICogbTAzO1xyXG4gICAgICAgIGNvbnN0IHRtcF8xMCA9IG0wMiAqIG0xMztcclxuICAgICAgICBjb25zdCB0bXBfMTEgPSBtMTIgKiBtMDM7XHJcbiAgICAgICAgY29uc3QgdG1wXzEyID0gbTIwICogbTMxO1xyXG4gICAgICAgIGNvbnN0IHRtcF8xMyA9IG0zMCAqIG0yMTtcclxuICAgICAgICBjb25zdCB0bXBfMTQgPSBtMTAgKiBtMzE7XHJcbiAgICAgICAgY29uc3QgdG1wXzE1ID0gbTMwICogbTExO1xyXG4gICAgICAgIGNvbnN0IHRtcF8xNiA9IG0xMCAqIG0yMTtcclxuICAgICAgICBjb25zdCB0bXBfMTcgPSBtMjAgKiBtMTE7XHJcbiAgICAgICAgY29uc3QgdG1wXzE4ID0gbTAwICogbTMxO1xyXG4gICAgICAgIGNvbnN0IHRtcF8xOSA9IG0zMCAqIG0wMTtcclxuICAgICAgICBjb25zdCB0bXBfMjAgPSBtMDAgKiBtMjE7XHJcbiAgICAgICAgY29uc3QgdG1wXzIxID0gbTIwICogbTAxO1xyXG4gICAgICAgIGNvbnN0IHRtcF8yMiA9IG0wMCAqIG0xMTtcclxuICAgICAgICBjb25zdCB0bXBfMjMgPSBtMTAgKiBtMDE7XHJcbiAgICAgICAgY29uc3QgdDAgPSB0bXBfMCAqIG0xMSArXHJcbiAgICAgICAgICAgIHRtcF8zICogbTIxICtcclxuICAgICAgICAgICAgdG1wXzQgKiBtMzEgLVxyXG4gICAgICAgICAgICAodG1wXzEgKiBtMTEgKyB0bXBfMiAqIG0yMSArIHRtcF81ICogbTMxKTtcclxuICAgICAgICBjb25zdCB0MSA9IHRtcF8xICogbTAxICtcclxuICAgICAgICAgICAgdG1wXzYgKiBtMjEgK1xyXG4gICAgICAgICAgICB0bXBfOSAqIG0zMSAtXHJcbiAgICAgICAgICAgICh0bXBfMCAqIG0wMSArIHRtcF83ICogbTIxICsgdG1wXzggKiBtMzEpO1xyXG4gICAgICAgIGNvbnN0IHQyID0gdG1wXzIgKiBtMDEgK1xyXG4gICAgICAgICAgICB0bXBfNyAqIG0xMSArXHJcbiAgICAgICAgICAgIHRtcF8xMCAqIG0zMSAtXHJcbiAgICAgICAgICAgICh0bXBfMyAqIG0wMSArIHRtcF82ICogbTExICsgdG1wXzExICogbTMxKTtcclxuICAgICAgICBjb25zdCB0MyA9IHRtcF81ICogbTAxICtcclxuICAgICAgICAgICAgdG1wXzggKiBtMTEgK1xyXG4gICAgICAgICAgICB0bXBfMTEgKiBtMjEgLVxyXG4gICAgICAgICAgICAodG1wXzQgKiBtMDEgKyB0bXBfOSAqIG0xMSArIHRtcF8xMCAqIG0yMSk7XHJcbiAgICAgICAgY29uc3QgZCA9IDEuMCAvIChtMDAgKiB0MCArIG0xMCAqIHQxICsgbTIwICogdDIgKyBtMzAgKiB0Myk7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgZCAqIHQwLFxyXG4gICAgICAgICAgICBkICogdDEsXHJcbiAgICAgICAgICAgIGQgKiB0MixcclxuICAgICAgICAgICAgZCAqIHQzLFxyXG4gICAgICAgICAgICBkICpcclxuICAgICAgICAgICAgICAgICh0bXBfMSAqIG0xMCArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzIgKiBtMjAgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF81ICogbTMwIC1cclxuICAgICAgICAgICAgICAgICAgICAodG1wXzAgKiBtMTAgKyB0bXBfMyAqIG0yMCArIHRtcF80ICogbTMwKSksXHJcbiAgICAgICAgICAgIGQgKlxyXG4gICAgICAgICAgICAgICAgKHRtcF8wICogbTAwICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfNyAqIG0yMCArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzggKiBtMzAgLVxyXG4gICAgICAgICAgICAgICAgICAgICh0bXBfMSAqIG0wMCArIHRtcF82ICogbTIwICsgdG1wXzkgKiBtMzApKSxcclxuICAgICAgICAgICAgZCAqXHJcbiAgICAgICAgICAgICAgICAodG1wXzMgKiBtMDAgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF82ICogbTEwICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfMTEgKiBtMzAgLVxyXG4gICAgICAgICAgICAgICAgICAgICh0bXBfMiAqIG0wMCArIHRtcF83ICogbTEwICsgdG1wXzEwICogbTMwKSksXHJcbiAgICAgICAgICAgIGQgKlxyXG4gICAgICAgICAgICAgICAgKHRtcF80ICogbTAwICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfOSAqIG0xMCArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzEwICogbTIwIC1cclxuICAgICAgICAgICAgICAgICAgICAodG1wXzUgKiBtMDAgKyB0bXBfOCAqIG0xMCArIHRtcF8xMSAqIG0yMCkpLFxyXG4gICAgICAgICAgICBkICpcclxuICAgICAgICAgICAgICAgICh0bXBfMTIgKiBtMTMgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF8xNSAqIG0yMyArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzE2ICogbTMzIC1cclxuICAgICAgICAgICAgICAgICAgICAodG1wXzEzICogbTEzICsgdG1wXzE0ICogbTIzICsgdG1wXzE3ICogbTMzKSksXHJcbiAgICAgICAgICAgIGQgKlxyXG4gICAgICAgICAgICAgICAgKHRtcF8xMyAqIG0wMyArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzE4ICogbTIzICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfMjEgKiBtMzMgLVxyXG4gICAgICAgICAgICAgICAgICAgICh0bXBfMTIgKiBtMDMgKyB0bXBfMTkgKiBtMjMgKyB0bXBfMjAgKiBtMzMpKSxcclxuICAgICAgICAgICAgZCAqXHJcbiAgICAgICAgICAgICAgICAodG1wXzE0ICogbTAzICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfMTkgKiBtMTMgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF8yMiAqIG0zMyAtXHJcbiAgICAgICAgICAgICAgICAgICAgKHRtcF8xNSAqIG0wMyArIHRtcF8xOCAqIG0xMyArIHRtcF8yMyAqIG0zMykpLFxyXG4gICAgICAgICAgICBkICpcclxuICAgICAgICAgICAgICAgICh0bXBfMTcgKiBtMDMgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF8yMCAqIG0xMyArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzIzICogbTIzIC1cclxuICAgICAgICAgICAgICAgICAgICAodG1wXzE2ICogbTAzICsgdG1wXzIxICogbTEzICsgdG1wXzIyICogbTIzKSksXHJcbiAgICAgICAgICAgIGQgKlxyXG4gICAgICAgICAgICAgICAgKHRtcF8xNCAqIG0yMiArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzE3ICogbTMyICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfMTMgKiBtMTIgLVxyXG4gICAgICAgICAgICAgICAgICAgICh0bXBfMTYgKiBtMzIgKyB0bXBfMTIgKiBtMTIgKyB0bXBfMTUgKiBtMjIpKSxcclxuICAgICAgICAgICAgZCAqXHJcbiAgICAgICAgICAgICAgICAodG1wXzIwICogbTMyICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfMTIgKiBtMDIgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF8xOSAqIG0yMiAtXHJcbiAgICAgICAgICAgICAgICAgICAgKHRtcF8xOCAqIG0yMiArIHRtcF8yMSAqIG0zMiArIHRtcF8xMyAqIG0wMikpLFxyXG4gICAgICAgICAgICBkICpcclxuICAgICAgICAgICAgICAgICh0bXBfMTggKiBtMTIgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF8yMyAqIG0zMiArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzE1ICogbTAyIC1cclxuICAgICAgICAgICAgICAgICAgICAodG1wXzIyICogbTMyICsgdG1wXzE0ICogbTAyICsgdG1wXzE5ICogbTEyKSksXHJcbiAgICAgICAgICAgIGQgKlxyXG4gICAgICAgICAgICAgICAgKHRtcF8yMiAqIG0yMiArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzE2ICogbTAyICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfMjEgKiBtMTIgLVxyXG4gICAgICAgICAgICAgICAgICAgICh0bXBfMjAgKiBtMTIgKyB0bXBfMjMgKiBtMjIgKyB0bXBfMTcgKiBtMDIpKSxcclxuICAgICAgICBdO1xyXG4gICAgfSxcclxuICAgIGxvb2tBdDogZnVuY3Rpb24gKGNhbWVyYVBvc2l0aW9uLCB0YXJnZXQsIHVwKSB7XHJcbiAgICAgICAgY29uc3QgekF4aXMgPSB2My5ub3JtYWxpemUodjMuZGlmZihjYW1lcmFQb3NpdGlvbiwgdGFyZ2V0KSk7XHJcbiAgICAgICAgY29uc3QgeEF4aXMgPSB2My5ub3JtYWxpemUodjMuY3Jvc3ModXAsIHpBeGlzKSk7XHJcbiAgICAgICAgY29uc3QgeUF4aXMgPSB2My5ub3JtYWxpemUodjMuY3Jvc3MoekF4aXMsIHhBeGlzKSk7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgeEF4aXNbMF0sXHJcbiAgICAgICAgICAgIHhBeGlzWzFdLFxyXG4gICAgICAgICAgICB4QXhpc1syXSxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgeUF4aXNbMF0sXHJcbiAgICAgICAgICAgIHlBeGlzWzFdLFxyXG4gICAgICAgICAgICB5QXhpc1syXSxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgekF4aXNbMF0sXHJcbiAgICAgICAgICAgIHpBeGlzWzFdLFxyXG4gICAgICAgICAgICB6QXhpc1syXSxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgY2FtZXJhUG9zaXRpb25bMF0sXHJcbiAgICAgICAgICAgIGNhbWVyYVBvc2l0aW9uWzFdLFxyXG4gICAgICAgICAgICBjYW1lcmFQb3NpdGlvblsyXSxcclxuICAgICAgICAgICAgMSxcclxuICAgICAgICBdO1xyXG4gICAgfSxcclxuICAgIGNvcHk6IGZ1bmN0aW9uIChzcmMpIHtcclxuICAgICAgICByZXR1cm4gWy4uLnNyY107XHJcbiAgICB9LFxyXG4gICAgdHJhbnNmb3JtUG9pbnQ6IGZ1bmN0aW9uIChtLCB2LCBkc3QpIHtcclxuICAgICAgICBkc3QgPSBkc3QgfHwgbmV3IEFycmF5KDMpO1xyXG4gICAgICAgIGNvbnN0IHYwID0gdlswXTtcclxuICAgICAgICBjb25zdCB2MSA9IHZbMV07XHJcbiAgICAgICAgY29uc3QgdjIgPSB2WzJdO1xyXG4gICAgICAgIGNvbnN0IGQgPSB2MCAqIG1bMCAqIDQgKyAzXSArIHYxICogbVsxICogNCArIDNdICsgdjIgKiBtWzIgKiA0ICsgM10gKyBtWzMgKiA0ICsgM107XHJcbiAgICAgICAgZHN0WzBdID1cclxuICAgICAgICAgICAgKHYwICogbVswICogNCArIDBdICtcclxuICAgICAgICAgICAgICAgIHYxICogbVsxICogNCArIDBdICtcclxuICAgICAgICAgICAgICAgIHYyICogbVsyICogNCArIDBdICtcclxuICAgICAgICAgICAgICAgIG1bMyAqIDQgKyAwXSkgL1xyXG4gICAgICAgICAgICAgICAgZDtcclxuICAgICAgICBkc3RbMV0gPVxyXG4gICAgICAgICAgICAodjAgKiBtWzAgKiA0ICsgMV0gK1xyXG4gICAgICAgICAgICAgICAgdjEgKiBtWzEgKiA0ICsgMV0gK1xyXG4gICAgICAgICAgICAgICAgdjIgKiBtWzIgKiA0ICsgMV0gK1xyXG4gICAgICAgICAgICAgICAgbVszICogNCArIDFdKSAvXHJcbiAgICAgICAgICAgICAgICBkO1xyXG4gICAgICAgIGRzdFsyXSA9XHJcbiAgICAgICAgICAgICh2MCAqIG1bMCAqIDQgKyAyXSArXHJcbiAgICAgICAgICAgICAgICB2MSAqIG1bMSAqIDQgKyAyXSArXHJcbiAgICAgICAgICAgICAgICB2MiAqIG1bMiAqIDQgKyAyXSArXHJcbiAgICAgICAgICAgICAgICBtWzMgKiA0ICsgMl0pIC9cclxuICAgICAgICAgICAgICAgIGQ7XHJcbiAgICAgICAgcmV0dXJuIGRzdDtcclxuICAgIH0sXHJcbiAgICBpZGVudGl0eTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnN0IGRzdCA9IG5ldyBBcnJheSgxNik7XHJcbiAgICAgICAgZHN0WzBdID0gMTtcclxuICAgICAgICBkc3RbMV0gPSAwO1xyXG4gICAgICAgIGRzdFsyXSA9IDA7XHJcbiAgICAgICAgZHN0WzNdID0gMDtcclxuICAgICAgICBkc3RbNF0gPSAwO1xyXG4gICAgICAgIGRzdFs1XSA9IDE7XHJcbiAgICAgICAgZHN0WzZdID0gMDtcclxuICAgICAgICBkc3RbN10gPSAwO1xyXG4gICAgICAgIGRzdFs4XSA9IDA7XHJcbiAgICAgICAgZHN0WzldID0gMDtcclxuICAgICAgICBkc3RbMTBdID0gMTtcclxuICAgICAgICBkc3RbMTFdID0gMDtcclxuICAgICAgICBkc3RbMTJdID0gMDtcclxuICAgICAgICBkc3RbMTNdID0gMDtcclxuICAgICAgICBkc3RbMTRdID0gMDtcclxuICAgICAgICBkc3RbMTVdID0gMTtcclxuICAgICAgICByZXR1cm4gZHN0O1xyXG4gICAgfSxcclxuICAgIG0zVG9tNDogZnVuY3Rpb24gKG0pIHtcclxuICAgICAgICBjb25zdCBkc3QgPSBuZXcgQXJyYXkoMTYpO1xyXG4gICAgICAgIGRzdFswXSA9IG1bMF07XHJcbiAgICAgICAgZHN0WzFdID0gbVsxXTtcclxuICAgICAgICBkc3RbMl0gPSBtWzJdO1xyXG4gICAgICAgIGRzdFszXSA9IDA7XHJcbiAgICAgICAgZHN0WzRdID0gbVszXTtcclxuICAgICAgICBkc3RbNV0gPSBtWzRdO1xyXG4gICAgICAgIGRzdFs2XSA9IG1bNV07XHJcbiAgICAgICAgZHN0WzddID0gMDtcclxuICAgICAgICBkc3RbOF0gPSBtWzZdO1xyXG4gICAgICAgIGRzdFs5XSA9IG1bN107XHJcbiAgICAgICAgZHN0WzEwXSA9IG1bOF07XHJcbiAgICAgICAgZHN0WzExXSA9IDA7XHJcbiAgICAgICAgZHN0WzEyXSA9IDA7XHJcbiAgICAgICAgZHN0WzEzXSA9IDA7XHJcbiAgICAgICAgZHN0WzE0XSA9IDA7XHJcbiAgICAgICAgZHN0WzE1XSA9IDE7XHJcbiAgICAgICAgcmV0dXJuIGRzdDtcclxuICAgIH0sXHJcbiAgICBtNFRvbTM6IGZ1bmN0aW9uIChtKSB7XHJcbiAgICAgICAgY29uc3QgZHN0ID0gbmV3IEFycmF5KDkpO1xyXG4gICAgICAgIGRzdFswXSA9IG1bMF07XHJcbiAgICAgICAgZHN0WzFdID0gbVsxXTtcclxuICAgICAgICBkc3RbMl0gPSBtWzJdO1xyXG4gICAgICAgIGRzdFszXSA9IG1bNF07XHJcbiAgICAgICAgZHN0WzRdID0gbVs1XTtcclxuICAgICAgICBkc3RbNV0gPSBtWzZdO1xyXG4gICAgICAgIGRzdFs2XSA9IG1bOF07XHJcbiAgICAgICAgZHN0WzddID0gbVs5XTtcclxuICAgICAgICBkc3RbOF0gPSBtWzEwXTtcclxuICAgICAgICByZXR1cm4gZHN0O1xyXG4gICAgfSxcclxuICAgIHRvU3RyaW5nKG0pIHtcclxuICAgICAgICByZXR1cm4gbS5yZWR1Y2UoKGFjYywgZWwsIGlkeCkgPT4gaWR4ICUgNCA9PT0gMFxyXG4gICAgICAgICAgICA/IChhY2MgKz0gYFxcbiR7ZWwudG9TdHJpbmcoKX1gKVxyXG4gICAgICAgICAgICA6IChhY2MgKz0gYCAke2VsLnRvU3RyaW5nKCl9YCksIFwiXCIpO1xyXG4gICAgfSxcclxuICAgIHRyYW5zcG9zZTogZnVuY3Rpb24gKG0pIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBtWzBdLFxyXG4gICAgICAgICAgICBtWzRdLFxyXG4gICAgICAgICAgICBtWzhdLFxyXG4gICAgICAgICAgICBtWzEyXSxcclxuICAgICAgICAgICAgbVsxXSxcclxuICAgICAgICAgICAgbVs1XSxcclxuICAgICAgICAgICAgbVs5XSxcclxuICAgICAgICAgICAgbVsxM10sXHJcbiAgICAgICAgICAgIG1bMl0sXHJcbiAgICAgICAgICAgIG1bNl0sXHJcbiAgICAgICAgICAgIG1bMTBdLFxyXG4gICAgICAgICAgICBtWzE0XSxcclxuICAgICAgICAgICAgbVszXSxcclxuICAgICAgICAgICAgbVs3XSxcclxuICAgICAgICAgICAgbVsxMV0sXHJcbiAgICAgICAgICAgIG1bMTVdLFxyXG4gICAgICAgIF07XHJcbiAgICB9LFxyXG4gICAgZnJvbVF1YXRlcm5pb246IChxKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYTExID0gMSAtIDIgKiAocVsxXSAqIHFbMV0gKyBxWzJdICogcVsyXSk7XHJcbiAgICAgICAgY29uc3QgYTEyID0gMiAqIChxWzBdICogcVsxXSAtIHFbMl0gKiBxWzNdKTtcclxuICAgICAgICBjb25zdCBhMTMgPSAyICogKHFbMF0gKiBxWzJdICsgcVsxXSAqIHFbM10pO1xyXG4gICAgICAgIGNvbnN0IGEyMSA9IDIgKiAocVswXSAqIHFbMV0gKyBxWzJdICogcVszXSk7XHJcbiAgICAgICAgY29uc3QgYTIyID0gMSAtIDIgKiAocVswXSAqIHFbMF0gKyBxWzJdICogcVsyXSk7XHJcbiAgICAgICAgY29uc3QgYTIzID0gMiAqIChxWzFdICogcVsyXSAtIHFbMF0gKiBxWzNdKTtcclxuICAgICAgICBjb25zdCBhMzEgPSAyICogKHFbMF0gKiBxWzJdIC0gcVsxXSAqIHFbM10pO1xyXG4gICAgICAgIGNvbnN0IGEzMiA9IDIgKiAocVsxXSAqIHFbMl0gKyBxWzBdICogcVszXSk7XHJcbiAgICAgICAgY29uc3QgYTMzID0gMSAtIDIgKiAocVswXSAqIHFbMF0gKyBxWzFdICogcVsxXSk7XHJcbiAgICAgICAgcmV0dXJuIFthMTEsIGExMiwgYTEzLCAwLCBhMjEsIGEyMiwgYTIzLCAwLCBhMzEsIGEzMiwgYTMzLCAwLCAwLCAwLCAwLCAxXTtcclxuICAgIH0sXHJcbiAgICAvKlxyXG4gICAgcm90YXRpb24oeCwgeSwgeikge1xyXG4gICAgICByZXR1cm4gdGhpcy54Um90YXRlKHRoaXMueVJvdGF0ZSh0aGlzLnpSb3RhdGlvbih6KSwgeSksIHgpO1xyXG4gICAgfSxcclxuICAgIHJvdGF0aW9uRnJvbU5vcm1hbChuKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnJvdGF0aW9uKE1hdGguYWNvcyhuWzFdKSwgTWF0aC5hY29zKG5bMl0pLCBNYXRoLmFjb3MoblswXSkpO1xyXG4gICAgfSwqL1xyXG4gICAgZGV0ZXJtaW5hdGUobSkge1xyXG4gICAgICAgIGNvbnN0IG0wMCA9IG1bMCAqIDQgKyAwXTtcclxuICAgICAgICBjb25zdCBtMDEgPSBtWzAgKiA0ICsgMV07XHJcbiAgICAgICAgY29uc3QgbTAyID0gbVswICogNCArIDJdO1xyXG4gICAgICAgIGNvbnN0IG0wMyA9IG1bMCAqIDQgKyAzXTtcclxuICAgICAgICBjb25zdCBtMTAgPSBtWzEgKiA0ICsgMF07XHJcbiAgICAgICAgY29uc3QgbTExID0gbVsxICogNCArIDFdO1xyXG4gICAgICAgIGNvbnN0IG0xMiA9IG1bMSAqIDQgKyAyXTtcclxuICAgICAgICBjb25zdCBtMTMgPSBtWzEgKiA0ICsgM107XHJcbiAgICAgICAgY29uc3QgbTIwID0gbVsyICogNCArIDBdO1xyXG4gICAgICAgIGNvbnN0IG0yMSA9IG1bMiAqIDQgKyAxXTtcclxuICAgICAgICBjb25zdCBtMjIgPSBtWzIgKiA0ICsgMl07XHJcbiAgICAgICAgY29uc3QgbTIzID0gbVsyICogNCArIDNdO1xyXG4gICAgICAgIGNvbnN0IG0zMCA9IG1bMyAqIDQgKyAwXTtcclxuICAgICAgICBjb25zdCBtMzEgPSBtWzMgKiA0ICsgMV07XHJcbiAgICAgICAgY29uc3QgbTMyID0gbVszICogNCArIDJdO1xyXG4gICAgICAgIGNvbnN0IG0zMyA9IG1bMyAqIDQgKyAzXTtcclxuICAgICAgICBjb25zdCB0bXBfMCA9IG0yMiAqIG0zMztcclxuICAgICAgICBjb25zdCB0bXBfMSA9IG0zMiAqIG0yMztcclxuICAgICAgICBjb25zdCB0bXBfMiA9IG0xMiAqIG0zMztcclxuICAgICAgICBjb25zdCB0bXBfMyA9IG0zMiAqIG0xMztcclxuICAgICAgICBjb25zdCB0bXBfNCA9IG0xMiAqIG0yMztcclxuICAgICAgICBjb25zdCB0bXBfNSA9IG0yMiAqIG0xMztcclxuICAgICAgICBjb25zdCB0bXBfNiA9IG0wMiAqIG0zMztcclxuICAgICAgICBjb25zdCB0bXBfNyA9IG0zMiAqIG0wMztcclxuICAgICAgICBjb25zdCB0bXBfOCA9IG0wMiAqIG0yMztcclxuICAgICAgICBjb25zdCB0bXBfOSA9IG0yMiAqIG0wMztcclxuICAgICAgICBjb25zdCB0bXBfMTAgPSBtMDIgKiBtMTM7XHJcbiAgICAgICAgY29uc3QgdG1wXzExID0gbTEyICogbTAzO1xyXG4gICAgICAgIGNvbnN0IHQwID0gdG1wXzAgKiBtMTEgK1xyXG4gICAgICAgICAgICB0bXBfMyAqIG0yMSArXHJcbiAgICAgICAgICAgIHRtcF80ICogbTMxIC1cclxuICAgICAgICAgICAgKHRtcF8xICogbTExICsgdG1wXzIgKiBtMjEgKyB0bXBfNSAqIG0zMSk7XHJcbiAgICAgICAgY29uc3QgdDEgPSB0bXBfMSAqIG0wMSArXHJcbiAgICAgICAgICAgIHRtcF82ICogbTIxICtcclxuICAgICAgICAgICAgdG1wXzkgKiBtMzEgLVxyXG4gICAgICAgICAgICAodG1wXzAgKiBtMDEgKyB0bXBfNyAqIG0yMSArIHRtcF84ICogbTMxKTtcclxuICAgICAgICBjb25zdCB0MiA9IHRtcF8yICogbTAxICtcclxuICAgICAgICAgICAgdG1wXzcgKiBtMTEgK1xyXG4gICAgICAgICAgICB0bXBfMTAgKiBtMzEgLVxyXG4gICAgICAgICAgICAodG1wXzMgKiBtMDEgKyB0bXBfNiAqIG0xMSArIHRtcF8xMSAqIG0zMSk7XHJcbiAgICAgICAgY29uc3QgdDMgPSB0bXBfNSAqIG0wMSArXHJcbiAgICAgICAgICAgIHRtcF84ICogbTExICtcclxuICAgICAgICAgICAgdG1wXzExICogbTIxIC1cclxuICAgICAgICAgICAgKHRtcF80ICogbTAxICsgdG1wXzkgKiBtMTEgKyB0bXBfMTAgKiBtMjEpO1xyXG4gICAgICAgIHJldHVybiAxLjAgLyAobTAwICogdDAgKyBtMTAgKiB0MSArIG0yMCAqIHQyICsgbTMwICogdDMpO1xyXG4gICAgfSxcclxuICAgIGRlY29tcG9zZShtKSB7XHJcbiAgICAgICAgbGV0IHN4ID0gdjMubm9ybShtLnNsaWNlKDAsIDMpKTtcclxuICAgICAgICBjb25zdCBzeSA9IHYzLm5vcm0obS5zbGljZSg0LCA3KSk7XHJcbiAgICAgICAgY29uc3Qgc3ogPSB2My5ub3JtKG0uc2xpY2UoOCwgMTEpKTtcclxuICAgICAgICBjb25zdCBkZXQgPSB0aGlzLmRldGVybWluYXRlKG0pO1xyXG4gICAgICAgIGlmIChkZXQgPCAwKSB7XHJcbiAgICAgICAgICAgIHN4ID0gLXN4O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB0cmFuc2xhdGlvbiA9IG5ldyBBcnJheSgzKTtcclxuICAgICAgICBjb25zdCBzY2FsZSA9IG5ldyBBcnJheSgzKTtcclxuICAgICAgICBjb25zdCBSbWF0cml4ID0gWy4uLm1dO1xyXG4gICAgICAgIHRyYW5zbGF0aW9uWzBdID0gbVsxMl07XHJcbiAgICAgICAgdHJhbnNsYXRpb25bMV0gPSBtWzEzXTtcclxuICAgICAgICB0cmFuc2xhdGlvblsyXSA9IG1bMTRdO1xyXG4gICAgICAgIGNvbnN0IGludlNYID0gMSAvIHN4O1xyXG4gICAgICAgIGNvbnN0IGludlNZID0gMSAvIHN5O1xyXG4gICAgICAgIGNvbnN0IGludlNaID0gMSAvIHN6O1xyXG4gICAgICAgIFJtYXRyaXhbMF0gKj0gaW52U1g7XHJcbiAgICAgICAgUm1hdHJpeFsxXSAqPSBpbnZTWDtcclxuICAgICAgICBSbWF0cml4WzJdICo9IGludlNYO1xyXG4gICAgICAgIFJtYXRyaXhbNF0gKj0gaW52U1k7XHJcbiAgICAgICAgUm1hdHJpeFs1XSAqPSBpbnZTWTtcclxuICAgICAgICBSbWF0cml4WzZdICo9IGludlNZO1xyXG4gICAgICAgIFJtYXRyaXhbOF0gKj0gaW52U1o7XHJcbiAgICAgICAgUm1hdHJpeFs5XSAqPSBpbnZTWjtcclxuICAgICAgICBSbWF0cml4WzEwXSAqPSBpbnZTWjtcclxuICAgICAgICBzY2FsZVswXSA9IHN4O1xyXG4gICAgICAgIHNjYWxlWzFdID0gc3k7XHJcbiAgICAgICAgc2NhbGVbMl0gPSBzejtcclxuICAgICAgICByZXR1cm4geyB0cmFuc2xhdGlvbiwgUm1hdHJpeCwgc2NhbGUgfTtcclxuICAgIH0sXHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IG00O1xyXG4iLCJjb25zdCBkb3QgPSAoYSwgYikgPT4gYVswXSAqIGJbMF0gKyBhWzFdICogYlsxXSArIGFbMl0gKiBiWzJdO1xyXG5jb25zdCBjcm9zcyA9IChhLCBiKSA9PiBbXHJcbiAgICBhWzFdICogYlsyXSAtIGJbMV0gKiBhWzJdLFxyXG4gICAgYVsyXSAqIGJbMF0gLSBiWzJdICogYVswXSxcclxuICAgIGFbMF0gKiBiWzFdIC0gYlswXSAqIGFbMV0sXHJcbl07XHJcbmNvbnN0IHNjYWxlID0gKGEsIHNjYWxhcikgPT4gW2FbMF0gKiBzY2FsYXIsIGFbMV0gKiBzY2FsYXIsIGFbMl0gKiBzY2FsYXJdO1xyXG5jb25zdCBzdW0gPSAoYSwgYikgPT4gW2FbMF0gKyBiWzBdLCBhWzFdICsgYlsxXSwgYVsyXSArIGJbMl1dO1xyXG5jb25zdCBkaWZmID0gKGEsIGIpID0+IFthWzBdIC0gYlswXSwgYVsxXSAtIGJbMV0sIGFbMl0gLSBiWzJdXTtcclxuY29uc3Qgbm9ybSA9IChhKSA9PiBNYXRoLnNxcnQoYVswXSAqIGFbMF0gKyBhWzFdICogYVsxXSArIGFbMl0gKiBhWzJdKTtcclxuY29uc3Qgbm9ybVNxID0gKGEpID0+IGFbMF0gKiBhWzBdICsgYVsxXSAqIGFbMV0gKyBhWzJdICogYVsyXTtcclxuY29uc3Qgbm9ybWFsaXplID0gKGEpID0+IHtcclxuICAgIGNvbnN0IGxlbmd0aCA9IG5vcm0oYSk7XHJcbiAgICBpZiAobGVuZ3RoID09PSAwKVxyXG4gICAgICAgIHJldHVybiBhO1xyXG4gICAgcmV0dXJuIFthWzBdIC8gbGVuZ3RoLCBhWzFdIC8gbGVuZ3RoLCBhWzJdIC8gbGVuZ3RoXTtcclxufTtcclxuY29uc3QgaXNOdWxsID0gKGEpID0+IGFbMF0gKiBhWzBdICsgYVsxXSAqIGFbMV0gKyBhWzJdICogYVsyXSA9PT0gMDtcclxuY29uc3QgaXNFcXVhbCA9IChhLCBiKSA9PiBhWzBdID09IGJbMF0gJiYgYVsxXSA9PSBiWzFdICYmIGFbMl0gPT0gYlsyXTtcclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgc3VtLFxyXG4gICAgZGlmZixcclxuICAgIHNjYWxlLFxyXG4gICAgZG90LFxyXG4gICAgY3Jvc3MsXHJcbiAgICBub3JtLFxyXG4gICAgbm9ybVNxLFxyXG4gICAgbm9ybWFsaXplLFxyXG4gICAgaXNFcXVhbCxcclxuICAgIGlzTnVsbCxcclxufTtcclxuIiwiaW1wb3J0IFNpbXVsYXRpb24gZnJvbSBcIi4uLy4uLy4uL3NyYy9waHlzaWNzL1NpbXVsYXRpb25cIjtcclxuaW1wb3J0IEhhc2hHcmlkIGZyb20gXCIuLi8uLi8uLi9zcmMvcGh5c2ljcy9IYXNoR3JpZFwiO1xyXG5pbXBvcnQgVHJlZSBmcm9tIFwiLi4vLi4vLi4vc3JjL3BoeXNpY3MvVHJlZVwiO1xyXG5pbXBvcnQgeyB2MyB9IGZyb20gXCJyb21hbnBwcG1hdGhcIjtcclxuaW1wb3J0IEFBQkIgZnJvbSBcIi4uLy4uLy4uL3NyYy9waHlzaWNzL0FBQkJcIjtcclxuaW1wb3J0IGdldENvbGxpc2lvbkZlYXR1cmVzIGZyb20gXCIuLi8uLi8uLi9zcmMvcGh5c2ljcy9nZXRDb2xsaXNpb25GZWF0dXJlc1wiO1xyXG5pbXBvcnQgQ29udGFjdE1hbmlmb2xkIGZyb20gXCIuLi8uLi8uLi9zcmMvcGh5c2ljcy9Db250YWN0TWFuaWZvbGRcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVm94ZWxXb3JsZCBleHRlbmRzIFNpbXVsYXRpb24ge1xyXG4gICAgY29uc3RydWN0b3Iodm94ZWxTaXplID0gMSwgY2h1bmtTaXplID0gMzIpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMudm94ZWxTaXplID0gdm94ZWxTaXplO1xyXG4gICAgICAgIHRoaXMuY2h1bmtTaXplID0gY2h1bmtTaXplO1xyXG4gICAgICAgIHRoaXMuaGFzaEdyaWRUcmVlID0gbmV3IFRyZWUoKTtcclxuICAgICAgICB0aGlzLmhhc2hHcmlkVHJlZS5zZXRLZXkoaGFzaEdyaWQgPT4gaGFzaEdyaWQuYWFiYi5taW4uam9pbignJykpO1xyXG4gICAgfVxyXG4gICAgZ2V0Q2h1bmtBQUJCKHBvc2l0aW9uKSB7XHJcbiAgICAgICAgY29uc3Qgd2lkdGggPSB0aGlzLnZveGVsU2l6ZSAqIHRoaXMuY2h1bmtTaXplO1xyXG4gICAgICAgIGNvbnN0IHdlaWdodHMgPSB2My5zY2FsZShwb3NpdGlvbiwgMSAvIHdpZHRoKTtcclxuICAgICAgICBjb25zdCBtaW4gPSB3ZWlnaHRzLm1hcCgodykgPT4gTWF0aC5mbG9vcih3KSAqIHdpZHRoKTtcclxuICAgICAgICBjb25zdCBtYXggPSB3ZWlnaHRzLm1hcCgodykgPT4gTWF0aC5jZWlsKHcpICogd2lkdGgpO1xyXG4gICAgICAgIHJldHVybiBuZXcgQUFCQihtaW4sIG1heCk7XHJcbiAgICB9XHJcbiAgICBzZXRCbG9jayh4LCB5LCB6LCBibG9jaykge1xyXG4gICAgICAgIC8qIHggPSBNYXRoLmZsb29yKHgpIDtcclxuICAgICAgICAgeSA9IE1hdGguZmxvb3IoeSk7XHJcbiAgICAgICAgIHogPSBNYXRoLmZsb29yKHkpOyovXHJcbiAgICAgICAgbGV0IGNodW5rID0gdGhpcy5oYXNoR3JpZFRyZWUucGljayhbeCwgeSwgel0pWzBdO1xyXG4gICAgICAgIGlmICghY2h1bmspIHtcclxuICAgICAgICAgICAgY29uc3QgYWFiYiA9IHRoaXMuZ2V0Q2h1bmtBQUJCKFt4LCB5LCB6XSk7XHJcbiAgICAgICAgICAgIGNodW5rID0gbmV3IEhhc2hHcmlkKGFhYmIsIHRoaXMudm94ZWxTaXplLCB0aGlzLmNodW5rU2l6ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuaGFzaEdyaWRUcmVlLmluc2VydChjaHVuayk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJsb2NrLnRyYW5zbGF0ZShbXHJcbiAgICAgICAgICAgIHggKyAodGhpcy52b3hlbFNpemUgLyAyKSxcclxuICAgICAgICAgICAgeSArICh0aGlzLnZveGVsU2l6ZSAvIDIpLFxyXG4gICAgICAgICAgICB6ICsgKHRoaXMudm94ZWxTaXplIC8gMiksXHJcbiAgICAgICAgXSk7XHJcbiAgICAgICAgY2h1bmsuaW5zZXJ0KFt4LCB5LCB6XSwgYmxvY2spO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlQ29sbGlzaW9ucygpIHtcclxuICAgICAgICBzdXBlci51cGRhdGVDb2xsaXNpb25zKCk7XHJcbiAgICAgICAgdGhpcy5keW5hbWljT2JqZWN0cy5mb3JFYWNoKChib2R5KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFhYmIgPSBib2R5LmdldEFBQkIoKTtcclxuICAgICAgICAgICAgY29uc3QgY29sbGlzaW9uQ2h1bmtzID0gdGhpcy5oYXNoR3JpZFRyZWUucXVlcnkoYWFiYik7XHJcbiAgICAgICAgICAgIGNvbGxpc2lvbkNodW5rcy5mb3JFYWNoKChjaHVuaykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29sbGlzaW9ucyA9IGNodW5rLnF1ZXJ5KGFhYmIpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSBjb2xsaXNpb25zLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hbmlmb2xkID0gdGhpcy5nZXRDb250YWN0TWFuaWZvbGQoYm9keS5nZXRDb2xsaWRlcigpLmdldElkKCksIGNvbGxpc2lvbnNbaV0uZ2V0Q29sbGlkZXIoKS5nZXRJZCgpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWFuaWZvbGQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZlYXR1cmVzID0gZ2V0Q29sbGlzaW9uRmVhdHVyZXMoYm9keS5nZXRDb2xsaWRlcigpLCBjb2xsaXNpb25zW2ldLmdldENvbGxpZGVyKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmZWF0dXJlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQ29udGFjdE1hbmlmb2xkKGJvZHkuZ2V0Q29sbGlkZXIoKS5nZXRJZCgpLCBjb2xsaXNpb25zW2ldLmdldENvbGxpZGVyKCkuZ2V0SWQoKSwgQ29udGFjdE1hbmlmb2xkLmZyb21GZWF0dXJlc0FycmF5KGJvZHksIGNvbGxpc2lvbnNbaV0sIGZlYXR1cmVzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iLCJjb25zdCBnbHNsID0geCA9PiB4O1xyXG5jb25zdCB2ZXJ0ID0gZ2xzbCBgI3ZlcnNpb24gMzAwIGVzXHJcbiBcclxubGF5b3V0KGxvY2F0aW9uID0gMCkgaW4gdmVjNCBhX3Bvc2l0aW9uO1xyXG5sYXlvdXQobG9jYXRpb24gPSAxKSBpbiB2ZWMzIGFfbm9ybWFsO1xyXG5sYXlvdXQobG9jYXRpb24gPSA0KSBpbiB2ZWMyIGFfdGV4Y29vcmQ7XHJcblxyXG51bmlmb3JtIG1hdDQgdV9tYXRyaXg7XHJcbnVuaWZvcm0gbWF0NCB1X3dvcmxkVmlld1Byb2plY3Rpb247XHJcbnVuaWZvcm0gdmVjMyB1X2xpZ2h0V29ybGRQb3NpdGlvbjtcclxudW5pZm9ybSB2ZWMzIHVfdmlld1dvcmxkUG9zaXRpb247XHJcblxyXG5vdXQgdmVjMyB2X25vcm1hbDtcclxub3V0IHZlYzMgdl9zdXJmYWNlVG9MaWdodDtcclxub3V0IHZlYzMgdl9zdXJmYWNlVG9WaWV3O1xyXG5vdXQgdmVjMiB2X3RleGNvb3JkO1xyXG5cclxudm9pZCBtYWluKCkge1xyXG4gICAgXHJcbiAgICBnbF9Qb3NpdGlvbiA9IHVfd29ybGRWaWV3UHJvamVjdGlvbiAqIGFfcG9zaXRpb247XHJcbiAgICBcclxuICAgIHZlYzMgc3VyZmFjZVdvcmxkUG9zaXRpb24gPSAodV9tYXRyaXggKiBhX3Bvc2l0aW9uKS54eXo7XHJcbiAgICBcclxuICAgIHZfc3VyZmFjZVRvTGlnaHQgPSB1X2xpZ2h0V29ybGRQb3NpdGlvbiAtIHN1cmZhY2VXb3JsZFBvc2l0aW9uO1xyXG5cclxuICAgIHZfbm9ybWFsID0gbWF0MyggIHVfbWF0cml4ICkgKiBhX25vcm1hbDtcclxuICAgIFxyXG4gICAgdl9zdXJmYWNlVG9WaWV3ID0gdV92aWV3V29ybGRQb3NpdGlvbiAtIHN1cmZhY2VXb3JsZFBvc2l0aW9uO1xyXG5cclxuICAgIHZfdGV4Y29vcmQgPSBhX3RleGNvb3JkO1xyXG4gICAgICBcclxufWA7XHJcbmNvbnN0IGZyYWcgPSBnbHNsIGAjdmVyc2lvbiAzMDAgZXNcclxucHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xyXG4gXHJcblxyXG5cclxuXHJcbmluIHZlYzMgdl9ub3JtYWw7XHJcbmluIHZlYzMgdl9zdXJmYWNlVG9WaWV3O1xyXG5pbiB2ZWMzIHZfc3VyZmFjZVRvTGlnaHQ7XHJcblxyXG5cclxuLy91bmlmb3JtIHNhbXBsZXIyRCB1X3RleHR1cmUxO1xyXG51bmlmb3JtIGZsb2F0IHVfc2hpbmluZXNzO1xyXG51bmlmb3JtIHZlYzQgdV9jb2xvcjtcclxudW5pZm9ybSB2ZWM0IHVfYW1iaWVudExpZ2h0O1xyXG5cclxuaW4gdmVjMiB2X3RleGNvb3JkO1xyXG5cclxuLy8gVGhlIHRleHR1cmUuXHJcbnVuaWZvcm0gc2FtcGxlcjJEIHVfdGV4dHVyZTtcclxuXHJcbm91dCB2ZWM0IG91dENvbG9yO1xyXG5cclxuXHJcbnZvaWQgbWFpbigpIHtcclxuICBcclxuICB2ZWMzIHN1cmZhY2VUb0xpZ2h0RGlyZWN0aW9uID0gbm9ybWFsaXplKHZfc3VyZmFjZVRvTGlnaHQpO1xyXG4gIHZlYzMgc3VyZmFjZVRvVmlld0RpcmVjdGlvbiA9IG5vcm1hbGl6ZSh2X3N1cmZhY2VUb1ZpZXcpO1xyXG4gIHZlYzMgaGFsZlZlY3RvciA9IG5vcm1hbGl6ZShzdXJmYWNlVG9MaWdodERpcmVjdGlvbiArIHN1cmZhY2VUb1ZpZXdEaXJlY3Rpb24pO1xyXG5cclxuICB2ZWMzIG5vcm1hbCA9IG5vcm1hbGl6ZSh2X25vcm1hbCk7XHJcbiAgZmxvYXQgbGlnaHQgPSBkb3Qobm9ybWFsLCBzdXJmYWNlVG9MaWdodERpcmVjdGlvbik7XHJcbiAgZmxvYXQgc3BlY3VsYXIgPSAwLjA7XHJcbiAgaWYgKGxpZ2h0ID4gMC4wKSB7XHJcbiAgICBzcGVjdWxhciA9IHBvdyhkb3Qobm9ybWFsLCBoYWxmVmVjdG9yKSwgdV9zaGluaW5lc3MpO1xyXG4gIH1cclxuICBcclxuICBvdXRDb2xvciA9IHRleHR1cmUodV90ZXh0dXJlLCB2X3RleGNvb3JkKTtcclxuICBvdXRDb2xvci5yZ2IgKj0gbGlnaHQ7XHJcbiAgb3V0Q29sb3IucmdiICs9IHNwZWN1bGFyO1xyXG5cclxuICBvdXRDb2xvci5yZ2IgKz0gdV9hbWJpZW50TGlnaHQucmdiICowLjM7XHJcbiAgXHJcbn1gO1xyXG5leHBvcnQgZGVmYXVsdCB7IHZlcnQsIGZyYWcgfTtcclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQUFCQiB7XHJcbiAgICBjb25zdHJ1Y3RvcihtaW4sIG1heCkge1xyXG4gICAgICAgIHRoaXMubWluID0gbWluO1xyXG4gICAgICAgIHRoaXMubWF4ID0gbWF4O1xyXG4gICAgfVxyXG4gICAgaXNDb2xsaWRlKGFhYmIpIHtcclxuICAgICAgICBpZiAodGhpcy5taW5bMF0gPD0gYWFiYi5tYXhbMF0gJiZcclxuICAgICAgICAgICAgdGhpcy5tYXhbMF0gPj0gYWFiYi5taW5bMF0gJiZcclxuICAgICAgICAgICAgdGhpcy5taW5bMV0gPD0gYWFiYi5tYXhbMV0gJiZcclxuICAgICAgICAgICAgdGhpcy5tYXhbMV0gPj0gYWFiYi5taW5bMV0gJiZcclxuICAgICAgICAgICAgdGhpcy5taW5bMl0gPD0gYWFiYi5tYXhbMl0gJiZcclxuICAgICAgICAgICAgdGhpcy5tYXhbMl0gPj0gYWFiYi5taW5bMl0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGNvbnRhaW4ocG9pbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5taW5bMF0gPD0gcG9pbnRbMF0gJiZcclxuICAgICAgICAgICAgdGhpcy5tYXhbMF0gPj0gcG9pbnRbMF0gJiZcclxuICAgICAgICAgICAgdGhpcy5taW5bMV0gPD0gcG9pbnRbMV0gJiZcclxuICAgICAgICAgICAgdGhpcy5tYXhbMV0gPj0gcG9pbnRbMV0gJiZcclxuICAgICAgICAgICAgdGhpcy5taW5bMl0gPD0gcG9pbnRbMl0gJiZcclxuICAgICAgICAgICAgdGhpcy5tYXhbMl0gPj0gcG9pbnRbMl0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGdldFNpemUoKSB7XHJcbiAgICAgICAgY29uc3QgYXJlYSA9IE1hdGguYWJzKHRoaXMubWF4WzBdIC0gdGhpcy5taW5bMF0pICpcclxuICAgICAgICAgICAgTWF0aC5hYnModGhpcy5tYXhbMV0gLSB0aGlzLm1pblsxXSkgKlxyXG4gICAgICAgICAgICBNYXRoLmFicyh0aGlzLm1heFsyXSAtIHRoaXMubWluWzJdKTtcclxuICAgICAgICByZXR1cm4gYXJlYTtcclxuICAgIH1cclxuICAgIG1lcmdlKGFhYmIpIHtcclxuICAgICAgICBjb25zdCB4MSA9IHRoaXMubWluWzBdIDwgYWFiYi5taW5bMF0gPyB0aGlzLm1pblswXSA6IGFhYmIubWluWzBdO1xyXG4gICAgICAgIGNvbnN0IHgyID0gdGhpcy5tYXhbMF0gPiBhYWJiLm1heFswXSA/IHRoaXMubWF4WzBdIDogYWFiYi5tYXhbMF07XHJcbiAgICAgICAgY29uc3QgeTEgPSB0aGlzLm1pblsxXSA8IGFhYmIubWluWzFdID8gdGhpcy5taW5bMV0gOiBhYWJiLm1pblsxXTtcclxuICAgICAgICBjb25zdCB5MiA9IHRoaXMubWF4WzFdID4gYWFiYi5tYXhbMV0gPyB0aGlzLm1heFsxXSA6IGFhYmIubWF4WzFdO1xyXG4gICAgICAgIGNvbnN0IHoxID0gdGhpcy5taW5bMl0gPCBhYWJiLm1pblsyXSA/IHRoaXMubWluWzJdIDogYWFiYi5taW5bMl07XHJcbiAgICAgICAgY29uc3QgejIgPSB0aGlzLm1heFsyXSA+IGFhYmIubWF4WzJdID8gdGhpcy5tYXhbMl0gOiBhYWJiLm1heFsyXTtcclxuICAgICAgICByZXR1cm4gbmV3IEFBQkIoW3gxLCB5MSwgejFdLCBbeDIsIHkyLCB6Ml0pO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IHYzLCBtMywgbTQgfSBmcm9tIFwicm9tYW5wcHBtYXRoXCI7XHJcbmltcG9ydCBBQUJCIGZyb20gXCIuL0FBQkJcIjtcclxuY29uc3QgeEF4aXMgPSBbMSwgMCwgMF07XHJcbmNvbnN0IHlBeGlzID0gWzAsIDEsIDBdO1xyXG5jb25zdCB6QXhpcyA9IFswLCAwLCAxXTtcclxuY29uc3QgeEF4aXNOZWdhdGl2ZSA9IHYzLnNjYWxlKHhBeGlzLCAtMSk7XHJcbmNvbnN0IHlBeGlzTmVnYXRpdmUgPSB2My5zY2FsZSh5QXhpcywgLTEpO1xyXG5jb25zdCB6QXhpc05lZ2F0aXZlID0gdjMuc2NhbGUoekF4aXMsIC0xKTtcclxudmFyIGNvbGxpZGVyVHlwZXM7XHJcbihmdW5jdGlvbiAoY29sbGlkZXJUeXBlcykge1xyXG4gICAgY29sbGlkZXJUeXBlc1tjb2xsaWRlclR5cGVzW1wiUG9pbnRcIl0gPSAwXSA9IFwiUG9pbnRcIjtcclxuICAgIGNvbGxpZGVyVHlwZXNbY29sbGlkZXJUeXBlc1tcIkJveFwiXSA9IDFdID0gXCJCb3hcIjtcclxuICAgIGNvbGxpZGVyVHlwZXNbY29sbGlkZXJUeXBlc1tcIlNwaGVyZVwiXSA9IDJdID0gXCJTcGhlcmVcIjtcclxuICAgIGNvbGxpZGVyVHlwZXNbY29sbGlkZXJUeXBlc1tcIkN5bGluZGVyXCJdID0gM10gPSBcIkN5bGluZGVyXCI7XHJcbiAgICBjb2xsaWRlclR5cGVzW2NvbGxpZGVyVHlwZXNbXCJUcmlhbmdsZVwiXSA9IDRdID0gXCJUcmlhbmdsZVwiO1xyXG59KShjb2xsaWRlclR5cGVzIHx8IChjb2xsaWRlclR5cGVzID0ge30pKTtcclxuY2xhc3MgQ29sbGlkZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5SbWF0cml4ID0gbTMuaWRlbnRpdHkoKTtcclxuICAgICAgICB0aGlzLlJtYXRyaXhJbnZlcnNlID0gbTMuaWRlbnRpdHkoKTtcclxuICAgICAgICB0aGlzLnBvcyA9IFswLCAwLCAwXTtcclxuICAgICAgICB0aGlzLnR5cGUgPSBjb2xsaWRlclR5cGVzLlBvaW50O1xyXG4gICAgICAgIHRoaXMuaWQgPSBDb2xsaWRlci5sYXN0SWQrKztcclxuICAgIH1cclxuICAgIGdldFR5cGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHlwZTtcclxuICAgIH1cclxuICAgIGdldFJtYXRyaXgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuUm1hdHJpeDtcclxuICAgIH1cclxuICAgIHNldFJtYXRyaXgobWF0cml4KSB7XHJcbiAgICAgICAgdGhpcy5SbWF0cml4ID0gWy4uLm1hdHJpeF07XHJcbiAgICAgICAgdGhpcy5SbWF0cml4SW52ZXJzZSA9IG0zLnRyYW5zcG9zZShtYXRyaXgpO1xyXG4gICAgfVxyXG4gICAgZ2V0Um1hdHJpeEludmVyc2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuUm1hdHJpeEludmVyc2U7XHJcbiAgICB9XHJcbiAgICBnZXRJZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pZDtcclxuICAgIH1cclxuICAgIHNldElkKGlkKSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgfVxyXG4gICAgdHJhbnNsYXRlKHYpIHtcclxuICAgICAgICB0aGlzLnBvcyA9IHYzLnN1bSh0aGlzLnBvcywgdik7XHJcbiAgICB9XHJcbiAgICBzZXRUcmFuc2xhdGlvbih0cmFuc2xhdGlvbikge1xyXG4gICAgICAgIHRoaXMucG9zID0gWy4uLnRyYW5zbGF0aW9uXTtcclxuICAgIH1cclxuICAgIGdldFRyYW5zbGF0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvcztcclxuICAgIH1cclxuICAgIHJvdGF0ZShyKSB7XHJcbiAgICAgICAgdGhpcy5SbWF0cml4ID0gbTMueFJvdGF0ZSh0aGlzLlJtYXRyaXgsIHJbMF0pO1xyXG4gICAgICAgIHRoaXMuUm1hdHJpeCA9IG0zLnlSb3RhdGUodGhpcy5SbWF0cml4LCByWzFdKTtcclxuICAgICAgICB0aGlzLlJtYXRyaXggPSBtMy56Um90YXRlKHRoaXMuUm1hdHJpeCwgclsyXSk7XHJcbiAgICAgICAgdGhpcy5SbWF0cml4SW52ZXJzZSA9IG0zLnRyYW5zcG9zZSh0aGlzLlJtYXRyaXgpO1xyXG4gICAgfVxyXG4gICAgc2V0Um90YXRpb24ocikge1xyXG4gICAgICAgIHRoaXMuUm1hdHJpeCA9IG0zLnhSb3RhdGlvbihyWzBdKTtcclxuICAgICAgICB0aGlzLlJtYXRyaXggPSBtMy55Um90YXRlKHRoaXMuUm1hdHJpeCwgclsxXSk7XHJcbiAgICAgICAgdGhpcy5SbWF0cml4ID0gbTMuelJvdGF0ZSh0aGlzLlJtYXRyaXgsIHJbMl0pO1xyXG4gICAgICAgIHRoaXMuUm1hdHJpeEludmVyc2UgPSBtMy50cmFuc3Bvc2UodGhpcy5SbWF0cml4KTtcclxuICAgIH1cclxuICAgIGdldEFBQkIoKSB7XHJcbiAgICAgICAgY29uc3QgbWF4WCA9IHRoaXMuc3VwcG9ydCh4QXhpcylbMF07XHJcbiAgICAgICAgY29uc3QgbWF4WSA9IHRoaXMuc3VwcG9ydCh5QXhpcylbMV07XHJcbiAgICAgICAgY29uc3QgbWF4WiA9IHRoaXMuc3VwcG9ydCh6QXhpcylbMl07XHJcbiAgICAgICAgY29uc3QgbWluWCA9IHRoaXMuc3VwcG9ydCh4QXhpc05lZ2F0aXZlKVswXTtcclxuICAgICAgICBjb25zdCBtaW5ZID0gdGhpcy5zdXBwb3J0KHlBeGlzTmVnYXRpdmUpWzFdO1xyXG4gICAgICAgIGNvbnN0IG1pblogPSB0aGlzLnN1cHBvcnQoekF4aXNOZWdhdGl2ZSlbMl07XHJcbiAgICAgICAgcmV0dXJuIG5ldyBBQUJCKFttaW5YLCBtaW5ZLCBtaW5aXSwgW21heFgsIG1heFksIG1heFpdKTtcclxuICAgIH1cclxuICAgIGdldE00KCkge1xyXG4gICAgICAgIGNvbnN0IG0gPSBtNC5tM1RvbTQodGhpcy5SbWF0cml4KTtcclxuICAgICAgICBtWzEyXSA9IHRoaXMucG9zWzBdO1xyXG4gICAgICAgIG1bMTNdID0gdGhpcy5wb3NbMV07XHJcbiAgICAgICAgbVsxNF0gPSB0aGlzLnBvc1syXTtcclxuICAgICAgICBtWzE1XSA9IDE7XHJcbiAgICAgICAgcmV0dXJuIG07XHJcbiAgICB9XHJcbiAgICBsb2NhbFRvR2xvYmFsKHYpIHtcclxuICAgICAgICBsZXQgZ2xvYmFsID0gbTMudHJhbnNmb3JtUG9pbnQodGhpcy5SbWF0cml4LCB2KTtcclxuICAgICAgICByZXR1cm4gdjMuc3VtKHRoaXMucG9zLCBnbG9iYWwpO1xyXG4gICAgfVxyXG4gICAgZ2V0Q2xvc2VzdEZhY2VCeU5vcm1hbChub3JtYWwpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2ZXJ0aWNlczogW3RoaXMucG9zXSxcclxuICAgICAgICAgICAgbm9ybWFsOiB2My5zY2FsZShub3JtYWwsIC0xKSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgZ2V0SW52ZXJzZUluZXJ0aWFUZW5zb3IobWFzcykge1xyXG4gICAgICAgIHJldHVybiBtMy5pZGVudGl0eSgpO1xyXG4gICAgfVxyXG4gICAgc3VwcG9ydChkaXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wb3M7XHJcbiAgICB9XHJcbn1cclxuQ29sbGlkZXIubGFzdElkID0gMTtcclxuY2xhc3MgQm94IGV4dGVuZHMgQ29sbGlkZXIge1xyXG4gICAgY29uc3RydWN0b3IoYSA9IDEsIGIgPSAxLCBjID0gMSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy50eXBlID0gY29sbGlkZXJUeXBlcy5Cb3g7XHJcbiAgICAgICAgdGhpcy5zY2FsZSA9IFthLCBiLCBjXTtcclxuICAgICAgICB0aGlzLm1pbiA9IFstYSAvIDIsIC1iIC8gMiwgLWMgLyAyXTtcclxuICAgICAgICB0aGlzLm1heCA9IFthIC8gMiwgYiAvIDIsIGMgLyAyXTtcclxuICAgIH1cclxuICAgIGdldEFBQkIoKSB7XHJcbiAgICAgICAgY29uc3QgbWF4WCA9IHRoaXMuc3VwcG9ydCh4QXhpcylbMF07XHJcbiAgICAgICAgY29uc3QgbWF4WSA9IHRoaXMuc3VwcG9ydCh5QXhpcylbMV07XHJcbiAgICAgICAgY29uc3QgbWF4WiA9IHRoaXMuc3VwcG9ydCh6QXhpcylbMl07XHJcbiAgICAgICAgY29uc3QgbWluWCA9IHRoaXMuc3VwcG9ydCh4QXhpc05lZ2F0aXZlKVswXTtcclxuICAgICAgICBjb25zdCBtaW5ZID0gdGhpcy5zdXBwb3J0KHlBeGlzTmVnYXRpdmUpWzFdO1xyXG4gICAgICAgIGNvbnN0IG1pblogPSB0aGlzLnN1cHBvcnQoekF4aXNOZWdhdGl2ZSlbMl07XHJcbiAgICAgICAgcmV0dXJuIG5ldyBBQUJCKFttaW5YLCBtaW5ZLCBtaW5aXSwgW21heFgsIG1heFksIG1heFpdKTtcclxuICAgIH1cclxuICAgIHN1cHBvcnQoZGlyKSB7XHJcbiAgICAgICAgY29uc3QgX2RpciA9IG0zLnRyYW5zZm9ybVBvaW50KHRoaXMuUm1hdHJpeEludmVyc2UsIGRpcik7XHJcbiAgICAgICAgY29uc3QgcmVzID0gWzAsIDAsIDBdO1xyXG4gICAgICAgIHJlc1swXSA9IF9kaXJbMF0gPiAwID8gdGhpcy5tYXhbMF0gOiB0aGlzLm1pblswXTtcclxuICAgICAgICByZXNbMV0gPSBfZGlyWzFdID4gMCA/IHRoaXMubWF4WzFdIDogdGhpcy5taW5bMV07XHJcbiAgICAgICAgcmVzWzJdID0gX2RpclsyXSA+IDAgPyB0aGlzLm1heFsyXSA6IHRoaXMubWluWzJdO1xyXG4gICAgICAgIGNvbnN0IHN1cCA9IG0zLnRyYW5zZm9ybVBvaW50KHRoaXMuUm1hdHJpeCwgcmVzKTtcclxuICAgICAgICByZXR1cm4gdjMuc3VtKHN1cCwgdGhpcy5wb3MpO1xyXG4gICAgfVxyXG4gICAgZ2V0SW52ZXJzZUluZXJ0aWFUZW5zb3IobWFzcykge1xyXG4gICAgICAgIGNvbnN0IGkxID0gKG1hc3MgLyAxMikgKiAodGhpcy5tYXhbMV0gKiB0aGlzLm1heFsxXSArIHRoaXMubWF4WzJdICogdGhpcy5tYXhbMl0pO1xyXG4gICAgICAgIGNvbnN0IGkyID0gKG1hc3MgLyAxMikgKiAodGhpcy5tYXhbMF0gKiB0aGlzLm1heFswXSArIHRoaXMubWF4WzJdICogdGhpcy5tYXhbMl0pO1xyXG4gICAgICAgIGNvbnN0IGkzID0gKG1hc3MgLyAxMikgKiAodGhpcy5tYXhbMF0gKiB0aGlzLm1heFswXSArIHRoaXMubWF4WzFdICogdGhpcy5tYXhbMV0pO1xyXG4gICAgICAgIGNvbnN0IG0gPSBtMy5tdWx0aXBseShtMy5tdWx0aXBseSh0aGlzLlJtYXRyaXhJbnZlcnNlLCBbXHJcbiAgICAgICAgICAgIDEgLyBpMSxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMSAvIGkyLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAxIC8gaTMsXHJcbiAgICAgICAgXSksIHRoaXMuUm1hdHJpeCk7XHJcbiAgICAgICAgcmV0dXJuIG07XHJcbiAgICB9XHJcbiAgICBnZXRNNCgpIHtcclxuICAgICAgICBjb25zdCBtID0gbTQubTNUb200KHRoaXMuUm1hdHJpeCk7XHJcbiAgICAgICAgbVsxMl0gPSB0aGlzLnBvc1swXTtcclxuICAgICAgICBtWzEzXSA9IHRoaXMucG9zWzFdO1xyXG4gICAgICAgIG1bMTRdID0gdGhpcy5wb3NbMl07XHJcbiAgICAgICAgbVsxNV0gPSAxO1xyXG4gICAgICAgIGNvbnN0IHNjYWxlID0gdjMuZGlmZih0aGlzLm1heCwgdGhpcy5taW4pO1xyXG4gICAgICAgIHJldHVybiBtNC5zY2FsZShtLCAuLi5zY2FsZSk7XHJcbiAgICB9XHJcbiAgICBnZXRDbG9zZXN0RmFjZUJ5Tm9ybWFsKG5vcm1hbCkge1xyXG4gICAgICAgIGNvbnN0IHsgUm1hdHJpeCB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCBnbG9iYWxOb3JtYWxzID0gQm94Lm5vcm1hbHMubWFwKChuKSA9PiBtMy50cmFuc2Zvcm1Qb2ludChSbWF0cml4LCBuKSk7XHJcbiAgICAgICAgbGV0IG1pbkRvdCA9IHYzLmRvdChub3JtYWwsIGdsb2JhbE5vcm1hbHNbMF0pO1xyXG4gICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDEsIG4gPSBnbG9iYWxOb3JtYWxzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICAvL2NvbnN0IF9ub3JtYWwgPSBtMy50cmFuc2Zvcm1Qb2ludChSbWF0cml4LCBub3JtYWxzW2ldKVxyXG4gICAgICAgICAgICBjb25zdCBfZG90ID0gdjMuZG90KGdsb2JhbE5vcm1hbHNbaV0sIG5vcm1hbCk7XHJcbiAgICAgICAgICAgIGlmIChfZG90IDwgbWluRG90KSB7XHJcbiAgICAgICAgICAgICAgICBtaW5Eb3QgPSBfZG90O1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGZhY2VJbmRpY2VzID0gQm94LmluZGljZXNbaW5kZXhdO1xyXG4gICAgICAgIGNvbnN0IG0gPSB0aGlzLmdldE00KCk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmVydGljZXM6IGZhY2VJbmRpY2VzLm1hcCgoaSkgPT4gbTQudHJhbnNmb3JtUG9pbnQobSwgQm94LnBvaW50c1tpXSkpLFxyXG4gICAgICAgICAgICBub3JtYWw6IGdsb2JhbE5vcm1hbHNbaW5kZXhdLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuLypcclxuXHJcblxyXG4gICAgICBcclxuICAgICAgNC0tLS0tLS01XHJcbiAgICAgLyAgICAgICAvXHJcbiAgICAvICAgICAgIC9cclxuICAgNy0tLS0tLS02XHJcbiAgIHwgIDAtLS0tLS0tMVxyXG4gICB8IC8gICAgICAgL1xyXG4gICB8LyAgICAgICAvXHJcbiAgIDMtLS0tLS0tMlxyXG4qL1xyXG5Cb3gucG9pbnRzID0gW1xyXG4gICAgWy0xIC8gMiwgLTEgLyAyLCAtMSAvIDJdLFxyXG4gICAgWzEgLyAyLCAtMSAvIDIsIC0xIC8gMl0sXHJcbiAgICBbMSAvIDIsIC0xIC8gMiwgMSAvIDJdLFxyXG4gICAgWy0xIC8gMiwgLTEgLyAyLCAxIC8gMl0sXHJcbiAgICBbLTEgLyAyLCAxIC8gMiwgLTEgLyAyXSxcclxuICAgIFsxIC8gMiwgMSAvIDIsIC0xIC8gMl0sXHJcbiAgICBbMSAvIDIsIDEgLyAyLCAxIC8gMl0sXHJcbiAgICBbLTEgLyAyLCAxIC8gMiwgMSAvIDJdLCAvLzdcclxuXTtcclxuQm94LmluZGljZXMgPSBbXHJcbiAgICBbMCwgNCwgNSwgMV0sXHJcbiAgICBbMywgNywgNiwgMl0sXHJcbiAgICBbMCwgMSwgMiwgM10sXHJcbiAgICBbNCwgNSwgNiwgN10sXHJcbiAgICBbMCwgMywgNywgNF0sXHJcbiAgICBbMSwgMiwgNiwgNV0sIC8vICt4XHJcbl07XHJcbkJveC5ub3JtYWxzID0gW1xyXG4gICAgWzAsIDAsIC0xXSxcclxuICAgIFswLCAwLCAxXSxcclxuICAgIFswLCAtMSwgMF0sXHJcbiAgICBbMCwgMSwgMF0sXHJcbiAgICBbLTEsIDAsIDBdLFxyXG4gICAgWzEsIDAsIDBdLFxyXG5dO1xyXG5jbGFzcyBTcGhlcmUgZXh0ZW5kcyBDb2xsaWRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihyYWRpdXMgPSAxKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcclxuICAgICAgICB0aGlzLnR5cGUgPSBjb2xsaWRlclR5cGVzLlNwaGVyZTtcclxuICAgIH1cclxuICAgIGdldEFBQkIoKSB7XHJcbiAgICAgICAgY29uc3QgeyByYWRpdXMgfSA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBBQUJCKHYzLnN1bSh0aGlzLnBvcywgWy1yYWRpdXMsIC1yYWRpdXMsIC1yYWRpdXNdKSwgdjMuc3VtKHRoaXMucG9zLCBbcmFkaXVzLCByYWRpdXMsIHJhZGl1c10pKTtcclxuICAgIH1cclxuICAgIHN1cHBvcnQoZGlyKSB7XHJcbiAgICAgICAgcmV0dXJuIHYzLnN1bSh2My5zY2FsZSh2My5ub3JtYWxpemUoZGlyKSwgdGhpcy5yYWRpdXMpLCB0aGlzLnBvcyk7XHJcbiAgICB9XHJcbiAgICBnZXRNNCgpIHtcclxuICAgICAgICBjb25zdCBtID0gbTQubTNUb200KHRoaXMuUm1hdHJpeCk7XHJcbiAgICAgICAgbVsxMl0gPSB0aGlzLnBvc1swXTtcclxuICAgICAgICBtWzEzXSA9IHRoaXMucG9zWzFdO1xyXG4gICAgICAgIG1bMTRdID0gdGhpcy5wb3NbMl07XHJcbiAgICAgICAgbVsxNV0gPSAxO1xyXG4gICAgICAgIGNvbnN0IHsgcmFkaXVzIH0gPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBtNC5zY2FsZShtLCByYWRpdXMsIHJhZGl1cywgcmFkaXVzKTtcclxuICAgIH1cclxuICAgIGdldENsb3Nlc3RGYWNlQnlOb3JtYWwobm9ybWFsKSB7XHJcbiAgICAgICAgY29uc3QgcmV2ZXJzZSA9IHYzLnNjYWxlKG5vcm1hbCwgLTEpO1xyXG4gICAgICAgIHJldHVybiB7IHZlcnRpY2VzOiBbdjMuc2NhbGUocmV2ZXJzZSwgdGhpcy5yYWRpdXMpXSwgbm9ybWFsOiByZXZlcnNlIH07XHJcbiAgICB9XHJcbiAgICBnZXRJbnZlcnNlSW5lcnRpYVRlbnNvcihtYXNzKSB7XHJcbiAgICAgICAgY29uc3QgeyByYWRpdXMgfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgbSA9IFtcclxuICAgICAgICAgICAgKDIgKiBtYXNzICogcmFkaXVzICogcmFkaXVzKSAvIDUsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICgyICogbWFzcyAqIHJhZGl1cyAqIHJhZGl1cykgLyA1LFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAoMiAqIG1hc3MgKiByYWRpdXMgKiByYWRpdXMpIC8gNSxcclxuICAgICAgICBdO1xyXG4gICAgICAgIHJldHVybiBtO1xyXG4gICAgfVxyXG59XHJcbmNsYXNzIEN5bGluZGVyIGV4dGVuZHMgQ29sbGlkZXIge1xyXG4gICAgY29uc3RydWN0b3IocmFkaXVzLCBoZWlnaHQsIG51bVNlZ21lbnRzID0gNikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy50eXBlID0gY29sbGlkZXJUeXBlcy5DeWxpbmRlcjtcclxuICAgICAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICBjb25zdCBzZWdtZW50QW5nbGUgPSAoMiAqIE1hdGguUEkpIC8gbnVtU2VnbWVudHM7XHJcbiAgICAgICAgdGhpcy5jaXJjbGVQb2ludHMgPSBbLi4ubmV3IEFycmF5KG51bVNlZ21lbnRzKV0ubWFwKChfLCBpKSA9PiBbXHJcbiAgICAgICAgICAgIE1hdGguY29zKGkgKiBzZWdtZW50QW5nbGUpLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICBNYXRoLnNpbihpICogc2VnbWVudEFuZ2xlKSxcclxuICAgICAgICBdKTtcclxuICAgIH1cclxuICAgIHN1cHBvcnQoZGlyKSB7XHJcbiAgICAgICAgY29uc3QgX2RpciA9IG0zLnRyYW5zZm9ybVBvaW50KHRoaXMuUm1hdHJpeEludmVyc2UsIGRpcik7XHJcbiAgICAgICAgY29uc3QgZGlyX3h6ID0gW19kaXJbMF0sIDAsIF9kaXJbMl1dO1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHYzLnNjYWxlKHYzLm5vcm1hbGl6ZShkaXJfeHopLCB0aGlzLnJhZGl1cyk7XHJcbiAgICAgICAgcmVzdWx0WzFdID0gX2RpclsxXSA+IDAgPyB0aGlzLmhlaWdodCAvIDIgOiAtdGhpcy5oZWlnaHQgLyAyO1xyXG4gICAgICAgIHJldHVybiB2My5zdW0obTMudHJhbnNmb3JtUG9pbnQodGhpcy5SbWF0cml4LCByZXN1bHQpLCB0aGlzLnBvcyk7XHJcbiAgICB9XHJcbiAgICBnZXRNNCgpIHtcclxuICAgICAgICBjb25zdCBtID0gbTQubTNUb200KHRoaXMuUm1hdHJpeCk7XHJcbiAgICAgICAgbVsxMl0gPSB0aGlzLnBvc1swXTtcclxuICAgICAgICBtWzEzXSA9IHRoaXMucG9zWzFdO1xyXG4gICAgICAgIG1bMTRdID0gdGhpcy5wb3NbMl07XHJcbiAgICAgICAgbVsxNV0gPSAxO1xyXG4gICAgICAgIGNvbnN0IHsgcmFkaXVzLCBoZWlnaHQgfSA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIG00LnNjYWxlKG0sIHJhZGl1cywgaGVpZ2h0LCByYWRpdXMpO1xyXG4gICAgfVxyXG4gICAgZ2V0Q2xvc2VzdEZhY2VCeU5vcm1hbChub3JtYWwpIHtcclxuICAgICAgICBjb25zdCB7IFJtYXRyaXgsIFJtYXRyaXhJbnZlcnNlIH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IF9ub3JtYWwgPSBtMy50cmFuc2Zvcm1Qb2ludChSbWF0cml4SW52ZXJzZSwgdjMuc2NhbGUobm9ybWFsLCAtMSkpO1xyXG4gICAgICAgIGNvbnN0IG0gPSB0aGlzLmdldE00KCk7XHJcbiAgICAgICAgY29uc3QgY29zID0gdjMuZG90KF9ub3JtYWwsIFswLCAxLCAwXSk7XHJcbiAgICAgICAgY29uc3Qgc2lnbiA9IE1hdGguc2lnbihjb3MpO1xyXG4gICAgICAgIGlmIChjb3MgKiBzaWduIDwgMC43MDcpIHtcclxuICAgICAgICAgICAgY29uc3QgbG9jYWxOb3JtYWwgPSB2My5ub3JtYWxpemUoW19ub3JtYWxbMF0sIDAsIF9ub3JtYWxbMl1dKTtcclxuICAgICAgICAgICAgY29uc3QgdmVydGljZXMgPSBbXHJcbiAgICAgICAgICAgICAgICBtNC50cmFuc2Zvcm1Qb2ludChtLCBbX25vcm1hbFswXSwgMC41LCBfbm9ybWFsWzJdXSksXHJcbiAgICAgICAgICAgICAgICBtNC50cmFuc2Zvcm1Qb2ludChtLCBbX25vcm1hbFswXSwgLTAuNSwgX25vcm1hbFsyXV0pLFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2ZXJ0aWNlcywgbm9ybWFsOiBtMy50cmFuc2Zvcm1Qb2ludChSbWF0cml4LCBsb2NhbE5vcm1hbCkgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbG9jYWxOb3JtYWwgPSB2My5zY2FsZShbMCwgMSwgMF0sIHNpZ24pO1xyXG4gICAgICAgIGNvbnN0IHZlcnRpY2VzID0gdGhpcy5jaXJjbGVQb2ludHMubWFwKChwKSA9PiBtNC50cmFuc2Zvcm1Qb2ludChtLCBbcFswXSwgc2lnbiAqIDAuNSwgcFsyXV0pKTtcclxuICAgICAgICByZXR1cm4geyB2ZXJ0aWNlcywgbm9ybWFsOiBtMy50cmFuc2Zvcm1Qb2ludChSbWF0cml4LCBsb2NhbE5vcm1hbCkgfTtcclxuICAgIH1cclxuICAgIGdldEludmVyc2VJbmVydGlhVGVuc29yKG1hc3MpIHtcclxuICAgICAgICBjb25zdCB7IHJhZGl1cywgaGVpZ2h0IH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IGkxID0gKG1hc3MgLyAxMikgKiAoMyAqIHJhZGl1cyAqIHJhZGl1cyArIGhlaWdodCAqIGhlaWdodCk7XHJcbiAgICAgICAgY29uc3QgaTMgPSAobWFzcyAvIDIpICogcmFkaXVzICogcmFkaXVzO1xyXG4gICAgICAgIGNvbnN0IG0gPSBtMy5tdWx0aXBseShtMy5tdWx0aXBseSh0aGlzLlJtYXRyaXgsIFsxIC8gaTEsIDAsIDAsIDAsIDEgLyBpMSwgMCwgMCwgMCwgMSAvIGkzXSksIHRoaXMuUm1hdHJpeEludmVyc2UpO1xyXG4gICAgICAgIHJldHVybiBtO1xyXG4gICAgfVxyXG4gICAgZ2V0QUFCQigpIHtcclxuICAgICAgICBjb25zdCB7IHJhZGl1cywgaGVpZ2h0IH0gPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBuZXcgQUFCQih2My5zdW0odGhpcy5wb3MsIFstcmFkaXVzLCAtaGVpZ2h0LCAtcmFkaXVzXSksIHYzLnN1bSh0aGlzLnBvcywgW3JhZGl1cywgaGVpZ2h0LCByYWRpdXNdKSk7XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgVHJpYW5nbGUgZXh0ZW5kcyBDb2xsaWRlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcih2ZXJ0aWNlcykge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy50eXBlID0gY29sbGlkZXJUeXBlcy5UcmlhbmdsZTtcclxuICAgICAgICB0aGlzLnZlcnRpY2VzID0gdmVydGljZXM7XHJcbiAgICAgICAgdGhpcy5ub3JtYWwgPSB2My5jcm9zcyh2My5kaWZmKHZlcnRpY2VzWzBdLCB2ZXJ0aWNlc1sxXSksIHYzLmRpZmYodmVydGljZXNbMl0sIHZlcnRpY2VzWzFdKSk7XHJcbiAgICB9XHJcbiAgICBzdXBwb3J0KGRpcikge1xyXG4gICAgICAgIGNvbnN0IGRvdDEgPSB2My5kb3QodGhpcy52ZXJ0aWNlc1swXSwgZGlyKTtcclxuICAgICAgICBjb25zdCBkb3QyID0gdjMuZG90KHRoaXMudmVydGljZXNbMV0sIGRpcik7XHJcbiAgICAgICAgY29uc3QgZG90MyA9IHYzLmRvdCh0aGlzLnZlcnRpY2VzWzJdLCBkaXIpO1xyXG4gICAgICAgIGxldCBmdXJ0aGVzdCA9IHRoaXMudmVydGljZXNbMF07XHJcbiAgICAgICAgaWYgKGRvdDIgPiBkb3QxKSB7XHJcbiAgICAgICAgICAgIGZ1cnRoZXN0ID0gdGhpcy52ZXJ0aWNlc1sxXTtcclxuICAgICAgICAgICAgaWYgKGRvdDMgPiBkb3QyKVxyXG4gICAgICAgICAgICAgICAgZnVydGhlc3QgPSB0aGlzLnZlcnRpY2VzWzJdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZG90MyA+IGRvdDEpXHJcbiAgICAgICAgICAgIGZ1cnRoZXN0ID0gdGhpcy52ZXJ0aWNlc1syXTtcclxuICAgICAgICBpZiAodjMuZG90KGRpciwgdGhpcy5ub3JtYWwpIDwgMClcclxuICAgICAgICAgICAgZnVydGhlc3QgPSB2My5kaWZmKGZ1cnRoZXN0LCB0aGlzLm5vcm1hbCk7XHJcbiAgICAgICAgcmV0dXJuIGZ1cnRoZXN0O1xyXG4gICAgfVxyXG4gICAgZ2V0Q2xvc2VzdEZhY2VCeU5vcm1hbChub3JtYWwpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2ZXJ0aWNlczogdGhpcy52ZXJ0aWNlcyxcclxuICAgICAgICAgICAgbm9ybWFsOiB0aGlzLm5vcm1hbCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7IEJveCwgU3BoZXJlLCBDeWxpbmRlciwgVHJpYW5nbGUsIGNvbGxpZGVyVHlwZXMgfTtcclxuIiwiaW1wb3J0IHsgdjMsIG0zIH0gZnJvbSBcInJvbWFucHBwbWF0aFwiO1xyXG5pbXBvcnQgeyBDb25zdHJhaW50RXF1YXRpb24sIENvbnRhY3RFcXVhdGlvbiwgRnJpY3Rpb25FcXVhdGlvbiwgfSBmcm9tIFwiLi9FcXVhdGlvbnNcIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi9jb25maWdcIjtcclxuY29uc3QgeyBDT05UQUNUX1RSRVNIT0xELCBDT05UQUNUX0JJQVMgfSA9IGNvbmZpZztcclxuZXhwb3J0IGNsYXNzIENvbnN0cmFpbnQge1xyXG4gICAgY29uc3RydWN0b3IoYm9keTEsIGJvZHkyLCByYUxvY2FsLCByYkxvY2FsLCBvcHQpIHtcclxuICAgICAgICB0aGlzLmJvZHkxID0gYm9keTE7XHJcbiAgICAgICAgdGhpcy5ib2R5MiA9IGJvZHkyO1xyXG4gICAgICAgIHRoaXMucmFMb2NhbCA9IHJhTG9jYWw7XHJcbiAgICAgICAgdGhpcy5yYkxvY2FsID0gcmJMb2NhbDtcclxuICAgICAgICB0aGlzLmJpYXNGYWN0b3IgPSBvcHQuYmlhc0ZhY3RvciB8fCAwLjEyNTtcclxuICAgICAgICB0aGlzLnRyZXNob2xkID0gb3B0LnRyZXNob2xkIHx8IDAuMDAwMDA1O1xyXG4gICAgICAgIHRoaXMubGFtYmRhTWluID0gb3B0LmxhbWJkYU1pbiB8fCAtOTk5OTk5OTk7XHJcbiAgICAgICAgdGhpcy5sYW1iZGFNYXggPSBvcHQubGFtYmRhTWF4IHx8IDk5OTk5OTk5O1xyXG4gICAgICAgIHRoaXMucHJldkxhbWJkYSA9IDA7XHJcbiAgICAgICAgY29uc3QgY29sbGlkZXIxID0gdGhpcy5ib2R5MS5nZXRDb2xsaWRlcigpO1xyXG4gICAgICAgIGNvbnN0IGNvbGxpZGVyMiA9IHRoaXMuYm9keTIuZ2V0Q29sbGlkZXIoKTtcclxuICAgICAgICB0aGlzLnJhID0gbTMudHJhbnNmb3JtUG9pbnQoY29sbGlkZXIxLmdldFJtYXRyaXgoKSwgdGhpcy5yYUxvY2FsKTtcclxuICAgICAgICB0aGlzLnJiID0gbTMudHJhbnNmb3JtUG9pbnQoY29sbGlkZXIyLmdldFJtYXRyaXgoKSwgdGhpcy5yYkxvY2FsKTtcclxuICAgICAgICB0aGlzLlBBID0gdjMuc3VtKGNvbGxpZGVyMS5nZXRUcmFuc2xhdGlvbigpLCB0aGlzLnJhKTtcclxuICAgICAgICB0aGlzLlBCID0gdjMuc3VtKGNvbGxpZGVyMi5nZXRUcmFuc2xhdGlvbigpLCB0aGlzLnJiKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICBjb25zdCBjb2xsaWRlcjEgPSB0aGlzLmJvZHkxLmdldENvbGxpZGVyKCk7XHJcbiAgICAgICAgY29uc3QgY29sbGlkZXIyID0gdGhpcy5ib2R5Mi5nZXRDb2xsaWRlcigpO1xyXG4gICAgICAgIHRoaXMucmEgPSBtMy50cmFuc2Zvcm1Qb2ludChjb2xsaWRlcjEuZ2V0Um1hdHJpeCgpLCB0aGlzLnJhTG9jYWwpO1xyXG4gICAgICAgIHRoaXMucmIgPSBtMy50cmFuc2Zvcm1Qb2ludChjb2xsaWRlcjIuZ2V0Um1hdHJpeCgpLCB0aGlzLnJiTG9jYWwpO1xyXG4gICAgICAgIGNvbnN0IFBBID0gdjMuc3VtKGNvbGxpZGVyMS5nZXRUcmFuc2xhdGlvbigpLCB0aGlzLnJhKTtcclxuICAgICAgICBjb25zdCBQQiA9IHYzLnN1bShjb2xsaWRlcjIuZ2V0VHJhbnNsYXRpb24oKSwgdGhpcy5yYik7XHJcbiAgICAgICAgY29uc3QgZGVsdGFQQSA9IHYzLmRpZmYoUEEsIHRoaXMuUEEpO1xyXG4gICAgICAgIGNvbnN0IGRlbHRhUEIgPSB2My5kaWZmKFBCLCB0aGlzLlBCKTtcclxuICAgICAgICB0aGlzLlBBID0gUEE7XHJcbiAgICAgICAgdGhpcy5QQiA9IFBCO1xyXG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHYzLmRpZmYoUEEsIFBCKTtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uRXJyb3IgPSB2My5ub3JtKHYzLnN1bShbMC4wMDEsIDAuMDAxLCAwLjAwMV0sIGRpcmVjdGlvbikpO1xyXG4gICAgICAgIHRoaXMubiA9IHYzLnNjYWxlKGRpcmVjdGlvbiwgMSAvIHRoaXMucG9zaXRpb25FcnJvcik7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGVsdGFQQSxcclxuICAgICAgICAgICAgZGVsdGFQQixcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgZ2V0RXF1YXRpb24oKSB7XHJcbiAgICAgICAgY29uc3QgZXF1YXRpb24gPSBuZXcgQ29uc3RyYWludEVxdWF0aW9uKHRoaXMpO1xyXG4gICAgICAgIGVxdWF0aW9uLmxhbWJkYU1heCA9IHRoaXMubGFtYmRhTWF4O1xyXG4gICAgICAgIGVxdWF0aW9uLmxhbWJkYU1pbiA9IHRoaXMubGFtYmRhTWluO1xyXG4gICAgICAgIHJldHVybiBlcXVhdGlvbjtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgQ29udGFjdENvbnN0cmFpbnQge1xyXG4gICAgY29uc3RydWN0b3IoYm9keTEsIGJvZHkyLCByYUxvY2FsLCByYkxvY2FsLCByYSwgcmIsIFBBLCBQQiwgbiwgcG9zaXRpb25FcnJvciwgaSwgaikge1xyXG4gICAgICAgIHRoaXMuYm9keTEgPSBib2R5MTtcclxuICAgICAgICB0aGlzLmJvZHkyID0gYm9keTI7XHJcbiAgICAgICAgdGhpcy5yYUxvY2FsID0gcmFMb2NhbDtcclxuICAgICAgICB0aGlzLnJiTG9jYWwgPSByYkxvY2FsO1xyXG4gICAgICAgIHRoaXMucmEgPSByYTtcclxuICAgICAgICB0aGlzLnJiID0gcmI7XHJcbiAgICAgICAgdGhpcy5QQSA9IFBBO1xyXG4gICAgICAgIHRoaXMuUEIgPSBQQjtcclxuICAgICAgICB0aGlzLm4gPSBuO1xyXG4gICAgICAgIHRoaXMucG9zaXRpb25FcnJvciA9IHBvc2l0aW9uRXJyb3I7XHJcbiAgICAgICAgdGhpcy5pID0gaTtcclxuICAgICAgICB0aGlzLmogPSBqO1xyXG4gICAgICAgIHRoaXMuYmlhc0ZhY3RvciA9IGNvbmZpZy5DT05UQUNUX0JJQVM7XHJcbiAgICAgICAgdGhpcy50cmVzaG9sZCA9IGNvbmZpZy5DT05UQUNUX1RSRVNIT0xEO1xyXG4gICAgICAgIHRoaXMubGFtYmRhTWluID0gQ29udGFjdENvbnN0cmFpbnQub3B0LmxhbWJkYU1pbjtcclxuICAgICAgICB0aGlzLmxhbWJkYU1heCA9IENvbnRhY3RDb25zdHJhaW50Lm9wdC5sYW1iZGFNYXg7XHJcbiAgICAgICAgdGhpcy5wcmV2VGFuTGFtYmRhcyA9IFswLCAwXTtcclxuICAgICAgICB0aGlzLnByZXZMYW1iZGEgPSAwO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIGNvbnN0IGNvbGxpZGVyMSA9IHRoaXMuYm9keTEuZ2V0Q29sbGlkZXIoKTtcclxuICAgICAgICBjb25zdCBjb2xsaWRlcjIgPSB0aGlzLmJvZHkyLmdldENvbGxpZGVyKCk7XHJcbiAgICAgICAgdGhpcy5yYSA9IG0zLnRyYW5zZm9ybVBvaW50KGNvbGxpZGVyMS5nZXRSbWF0cml4KCksIHRoaXMucmFMb2NhbCk7XHJcbiAgICAgICAgdGhpcy5yYiA9IG0zLnRyYW5zZm9ybVBvaW50KGNvbGxpZGVyMi5nZXRSbWF0cml4KCksIHRoaXMucmJMb2NhbCk7XHJcbiAgICAgICAgY29uc3QgUEEgPSB2My5zdW0oY29sbGlkZXIxLmdldFRyYW5zbGF0aW9uKCksIHRoaXMucmEpO1xyXG4gICAgICAgIGNvbnN0IFBCID0gdjMuc3VtKGNvbGxpZGVyMi5nZXRUcmFuc2xhdGlvbigpLCB0aGlzLnJiKTtcclxuICAgICAgICBjb25zdCBkZWx0YVBBID0gdjMuZGlmZihQQSwgdGhpcy5QQSk7XHJcbiAgICAgICAgY29uc3QgZGVsdGFQQiA9IHYzLmRpZmYoUEIsIHRoaXMuUEIpO1xyXG4gICAgICAgIHRoaXMuUEEgPSBQQTtcclxuICAgICAgICB0aGlzLlBCID0gUEI7XHJcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gdjMuZGlmZihQQSwgUEIpO1xyXG4gICAgICAgIHRoaXMucG9zaXRpb25FcnJvciA9IHYzLmRvdCh0aGlzLm4sIGRpcmVjdGlvbik7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGVsdGFQQSxcclxuICAgICAgICAgICAgZGVsdGFQQixcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgZ2V0RXF1YXRpb24oKSB7XHJcbiAgICAgICAgY29uc3QgbGFtYmRhTWF4ID0gTWF0aC5tYXgoMSwgdjMubm9ybSh2My5zdW0odjMuc2NhbGUodGhpcy5ib2R5MS5nZXRWZWxvY2l0eSgpLCB0aGlzLmJvZHkxLmdldE1hc3MoKSksIHYzLnNjYWxlKHRoaXMuYm9keTIuZ2V0VmVsb2NpdHkoKSwgdGhpcy5ib2R5Mi5nZXRNYXNzKCkpKSkgKiAxMCk7XHJcbiAgICAgICAgY29uc3QgZXF1YXRpb24gPSBuZXcgQ29udGFjdEVxdWF0aW9uKHRoaXMpO1xyXG4gICAgICAgIGVxdWF0aW9uLmxhbWJkYU1heCA9IGxhbWJkYU1heDtcclxuICAgICAgICBlcXVhdGlvbi5sYW1iZGFNaW4gPSAwO1xyXG4gICAgICAgIHJldHVybiBlcXVhdGlvbjtcclxuICAgIH1cclxuICAgIGdldEZyaWN0aW9uRXF1YXRpb25zKCkge1xyXG4gICAgICAgIGNvbnN0IGVxMSA9IG5ldyBGcmljdGlvbkVxdWF0aW9uKHRoaXMsIDApO1xyXG4gICAgICAgIGNvbnN0IGVxMiA9IG5ldyBGcmljdGlvbkVxdWF0aW9uKHRoaXMsIDEpO1xyXG4gICAgICAgIGVxMS5sYW1iZGFNYXggPSBJbmZpbml0eTtcclxuICAgICAgICBlcTEubGFtYmRhTWluID0gLUluZmluaXR5O1xyXG4gICAgICAgIGVxMi5sYW1iZGFNYXggPSBJbmZpbml0eTtcclxuICAgICAgICBlcTIubGFtYmRhTWluID0gLUluZmluaXR5O1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIGVxMSwgZXEyXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxufVxyXG5Db250YWN0Q29uc3RyYWludC5vcHQgPSB7XHJcbiAgICBiaWFzRmFjdG9yOiAwLjEyNSxcclxuICAgIHRyZXNob2xkOiAwLjAwMDUsXHJcbiAgICBsYW1iZGFNaW46IDAsXHJcbiAgICBsYW1iZGFNYXg6IEluZmluaXR5LFxyXG59O1xyXG4iLCJpbXBvcnQgeyB2MyB9IGZyb20gXCJyb21hbnBwcG1hdGhcIjtcclxuaW1wb3J0IHsgQ29udGFjdENvbnN0cmFpbnQgfSBmcm9tIFwiLi9Db25zdHJhaW50c1wiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5jb25zdCB7IENPTlRBQ1RfTUFOSUZPTERfS0VFUF9UUkVTSE9MRCB9ID0gY29uZmlnO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250YWN0TWFuaWZvbGQge1xyXG4gICAgc3RhdGljIGZyb21GZWF0dXJlc0FycmF5KGJvZHkxLCBib2R5MiwgZmVhdHVyZXMpIHtcclxuICAgICAgICByZXR1cm4gbmV3IENvbnRhY3RNYW5pZm9sZChmZWF0dXJlcy5tYXAoKGMpID0+IG5ldyBDb250YWN0Q29uc3RyYWludChib2R5MSwgYm9keTIsIGMucmFMb2NhbCwgYy5yYkxvY2FsLCBjLnJhLCBjLnJiLCBjLlBBLCBjLlBCLCBjLm4sIGMucG9zaXRpb25FcnJvciwgYy5pLCBjLmopKSk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3Rvcihjb250YWN0cykge1xyXG4gICAgICAgIHRoaXMuY29udGFjdHMgPSBjb250YWN0cztcclxuICAgICAgICB0aGlzLmtlZXAgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhY3RzID0gdGhpcy5jb250YWN0cztcclxuICAgICAgICBpZiAoY29udGFjdHMubGVuZ3RoIDwgMykge1xyXG4gICAgICAgICAgICB0aGlzLmtlZXAgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbiA9IGNvbnRhY3RzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBjb250YWN0ID0gY29udGFjdHNbaV07XHJcbiAgICAgICAgICAgIGNvbnN0IHsgZGVsdGFQQSwgZGVsdGFQQiB9ID0gY29udGFjdC51cGRhdGUoKTtcclxuICAgICAgICAgICAgaWYgKHYzLm5vcm0oZGVsdGFQQSkgPiBDT05UQUNUX01BTklGT0xEX0tFRVBfVFJFU0hPTEQgfHxcclxuICAgICAgICAgICAgICAgIHYzLm5vcm0oZGVsdGFQQikgPiBDT05UQUNUX01BTklGT0xEX0tFRVBfVFJFU0hPTEQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMua2VlcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcIi4vRXZlbnRFbWl0dGVyXCI7XHJcbmNvbnN0IGRhdGEgPSB7XHJcbiAgICBTT0xWRVJfRVJST1I6IDAsXHJcbiAgICBSVU5USU1FOiAwLFxyXG4gICAgRlBTOiAwLFxyXG59O1xyXG5jbGFzcyBEZWJ1ZyBleHRlbmRzIEV2ZW50RW1pdHRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldEluc3RhbmNlKCkge1xyXG4gICAgICAgIGlmICghRGVidWcuaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgRGVidWcuaW5zdGFuY2UgPSBuZXcgRGVidWcoKTtcclxuICAgICAgICAgICAgRGVidWcuaW5zdGFuY2UuZGF0YSA9IHt9O1xyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgICAgICAgICBEZWJ1Zy5pbnN0YW5jZS5kYXRhW2BfJHtrZXl9YF0gPSBkYXRhW2tleV07XHJcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRGVidWcuaW5zdGFuY2UuZGF0YSwga2V5LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1tgXyR7a2V5fWBdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0KHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbYF8ke2tleX1gXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBEZWJ1Zy5pbnN0YW5jZS5lbWl0KGB1cGRhdGVgLCB7IGtleTogYF8ke2tleX1gLCB2YWx1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBEZWJ1Zy5pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIHNvbWVNZXRob2QoKSB7IH1cclxufVxyXG53aW5kb3cuRGVidWcgPSBEZWJ1Zy5nZXRJbnN0YW5jZSgpO1xyXG5leHBvcnQgZGVmYXVsdCBEZWJ1Zy5nZXRJbnN0YW5jZSgpO1xyXG4iLCJpbXBvcnQgeyB2MywgbTMgfSBmcm9tIFwicm9tYW5wcHBtYXRoXCI7XHJcbmNvbnN0IGNsYW1wID0gKHYsIG1pbiwgbWF4KSA9PiB7XHJcbiAgICBpZiAodiA+IG1pbikge1xyXG4gICAgICAgIGlmICh2IDwgbWF4KVxyXG4gICAgICAgICAgICByZXR1cm4gdjtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBtYXg7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWluO1xyXG59O1xyXG5jb25zdCBudWxsVmVjID0gWzAsIDAsIDBdO1xyXG5jbGFzcyBDb25zdHJhaW50RXF1YXRpb24ge1xyXG4gICAgY29uc3RydWN0b3IoY29uc3RyYWludCkge1xyXG4gICAgICAgIHRoaXMuY29uc3RyYWludCA9IGNvbnN0cmFpbnQ7XHJcbiAgICAgICAgdGhpcy5wcmV2TGFtYmRhID0gY29uc3RyYWludC5wcmV2TGFtYmRhO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlSmFjb2JpYW4oKSB7XHJcbiAgICAgICAgY29uc3QgeyBib2R5MSwgYm9keTIsIHJhLCByYiwgbiB9ID0gdGhpcy5jb25zdHJhaW50O1xyXG4gICAgICAgIGlmIChib2R5MS5pc1N0YXRpYygpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuSjEgPSBudWxsVmVjO1xyXG4gICAgICAgICAgICB0aGlzLkoyID0gbnVsbFZlYztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuSjEgPSB2My5zY2FsZShuLCAtMSk7XHJcbiAgICAgICAgICAgIHRoaXMuSjIgPSB2My5jcm9zcyhuLCByYSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChib2R5Mi5pc1N0YXRpYygpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuSjMgPSBudWxsVmVjO1xyXG4gICAgICAgICAgICB0aGlzLko0ID0gbnVsbFZlYztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuSjMgPSBuO1xyXG4gICAgICAgICAgICB0aGlzLko0ID0gdjMuY3Jvc3MocmIsIG4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKiAgY29uc3QgZG9mMSA9IGJvZHkxLmRvZjtcclxuICAgICAgICBjb25zdCBkb2YyID0gYm9keTIuZG9mO1xyXG4gICAgXHJcbiAgICAgICAgdGhpcy5KWzBdWzBdICo9IGRvZjFbMF07XHJcbiAgICAgICAgdGhpcy5KWzBdWzFdICo9IGRvZjFbMV07XHJcbiAgICAgICAgdGhpcy5KWzBdWzJdICo9IGRvZjFbMl07XHJcbiAgICBcclxuICAgICAgICB0aGlzLkpbMV1bMF0gKj0gZG9mMVszXTtcclxuICAgICAgICB0aGlzLkpbMV1bMV0gKj0gZG9mMVs0XTtcclxuICAgICAgICB0aGlzLkpbMV1bMl0gKj0gZG9mMVs1XTtcclxuICAgIFxyXG4gICAgICAgIHRoaXMuSlsyXVswXSAqPSBkb2YyWzBdO1xyXG4gICAgICAgIHRoaXMuSlsyXVsxXSAqPSBkb2YyWzFdO1xyXG4gICAgICAgIHRoaXMuSlsyXVsyXSAqPSBkb2YyWzJdO1xyXG4gICAgXHJcbiAgICAgICAgdGhpcy5KWzNdWzBdICo9IGRvZjJbM107XHJcbiAgICAgICAgdGhpcy5KWzNdWzFdICo9IGRvZjJbNF07XHJcbiAgICAgICAgdGhpcy5KWzNdWzJdICo9IGRvZjJbNV07Ki9cclxuICAgIH1cclxuICAgIHVwZGF0ZUxlZnRQYXJ0KGR0KSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVKYWNvYmlhbigpO1xyXG4gICAgICAgIGNvbnN0IHsgYm9keTEsIGJvZHkyIH0gPSB0aGlzLmNvbnN0cmFpbnQ7XHJcbiAgICAgICAgY29uc3QgSTEgPSBib2R5MS5nZXRJbnZlcnNlSW5lcnRpYVRlbnNvcigpO1xyXG4gICAgICAgIGNvbnN0IEkyID0gYm9keTIuZ2V0SW52ZXJzZUluZXJ0aWFUZW5zb3IoKTtcclxuICAgICAgICBsZXQgTTEgPSBib2R5MS5nZXRJbnZlcnNlTWFzcygpO1xyXG4gICAgICAgIGxldCBNMiA9IGJvZHkyLmdldEludmVyc2VNYXNzKCk7XHJcbiAgICAgICAgdGhpcy5KTTEgPSB2My5zY2FsZSh0aGlzLkoxLCBNMSk7XHJcbiAgICAgICAgdGhpcy5KTTIgPSBtMy50cmFuc2Zvcm1Qb2ludChJMSwgdGhpcy5KMik7XHJcbiAgICAgICAgdGhpcy5KTTMgPSB2My5zY2FsZSh0aGlzLkozLCBNMik7XHJcbiAgICAgICAgdGhpcy5KTTQgPSBtMy50cmFuc2Zvcm1Qb2ludChJMiwgdGhpcy5KNCk7XHJcbiAgICAgICAgLy9KTUoqID0gSkI7IEIgPSBNSiogYXMgMiB2ZWM2LCBfSiA9IEphY29iaWFuIGFzIDIgdmVjNlxyXG4gICAgICAgIHRoaXMuZWZmTWFzcyA9XHJcbiAgICAgICAgICAgIHYzLmRvdCh0aGlzLkoxLCB0aGlzLkpNMSkgK1xyXG4gICAgICAgICAgICAgICAgdjMuZG90KHRoaXMuSk0yLCB0aGlzLkoyKSArXHJcbiAgICAgICAgICAgICAgICB2My5kb3QodGhpcy5KMywgdGhpcy5KTTMpICtcclxuICAgICAgICAgICAgICAgIHYzLmRvdCh0aGlzLkpNNCwgdGhpcy5KNCk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVSaWdodFBhcnQoZHQpIHtcclxuICAgICAgICBjb25zdCB7IGJpYXNGYWN0b3IsIHRyZXNob2xkLCBib2R5MSwgYm9keTIsIG4sIHJhLCByYiwgcG9zaXRpb25FcnJvciB9ID0gdGhpcy5jb25zdHJhaW50O1xyXG4gICAgICAgIGNvbnN0IHJlbGF0aXZlVmVsb2NpdHkgPSB2My5kaWZmKHYzLnN1bShib2R5Mi5nZXRWZWxvY2l0eSgpLCB2My5jcm9zcyhib2R5Mi5nZXRBbmd1bGFyVmVsb2NpdHkoKSwgcmIpKSwgdjMuc3VtKGJvZHkxLmdldFZlbG9jaXR5KCksIHYzLmNyb3NzKGJvZHkxLmdldEFuZ3VsYXJWZWxvY2l0eSgpLCByYSkpKTtcclxuICAgICAgICBjb25zdCByZWxhdGl2ZVZlbG9jaXR5Tm9ybWFsUHJvamVjdGlvbiA9IHYzLmRvdChyZWxhdGl2ZVZlbG9jaXR5LCBuKTtcclxuICAgICAgICB0aGlzLmJpYXMgPVxyXG4gICAgICAgICAgICAoYmlhc0ZhY3RvciAqIE1hdGgubWF4KHBvc2l0aW9uRXJyb3IgLSB0cmVzaG9sZCwgMCkpIC8gZHQgLVxyXG4gICAgICAgICAgICAgICAgcmVsYXRpdmVWZWxvY2l0eU5vcm1hbFByb2plY3Rpb247XHJcbiAgICB9XHJcbiAgICBhcHBseUltcHVsc2UobGFtYmRhKSB7XHJcbiAgICAgICAgdGhpcy5jb25zdHJhaW50LnByZXZMYW1iZGEgPSBsYW1iZGE7XHJcbiAgICAgICAgdGhpcy5jb25zdHJhaW50LmJvZHkxLmFwcGx5SW1wdWxzZSh2My5zY2FsZSh0aGlzLkoxLCBsYW1iZGEpLCB0aGlzLmNvbnN0cmFpbnQucmEpO1xyXG4gICAgICAgIHRoaXMuY29uc3RyYWludC5ib2R5Mi5hcHBseUltcHVsc2UodjMuc2NhbGUodGhpcy5KMywgbGFtYmRhKSwgdGhpcy5jb25zdHJhaW50LnJiKTtcclxuICAgIH1cclxuICAgIGFwcGx5UHNldWRvSW1wdWxzZShsYW1iZGEpIHtcclxuICAgICAgICB0aGlzLmNvbnN0cmFpbnQuYm9keTEuYXBwbHlQc2V1ZG9JbXB1bHNlKHYzLnNjYWxlKHRoaXMuSjEsIGxhbWJkYSksIHRoaXMuY29uc3RyYWludC5yYSk7XHJcbiAgICAgICAgdGhpcy5jb25zdHJhaW50LmJvZHkyLmFwcGx5UHNldWRvSW1wdWxzZSh2My5zY2FsZSh0aGlzLkozLCBsYW1iZGEpLCB0aGlzLmNvbnN0cmFpbnQucmIpO1xyXG4gICAgfVxyXG59XHJcbkNvbnN0cmFpbnRFcXVhdGlvbi5iaWFzTXVsdGlwbGllciA9IDAuNTtcclxuY2xhc3MgQ29udGFjdEVxdWF0aW9uIGV4dGVuZHMgQ29uc3RyYWludEVxdWF0aW9uIHtcclxuICAgIHVwZGF0ZVJpZ2h0UGFydChkdCkge1xyXG4gICAgICAgIGNvbnN0IHsgYm9keTEsIGJvZHkyLCB0cmVzaG9sZCwgYmlhc0ZhY3RvciwgcmEsIHJiLCBuLCBwb3NpdGlvbkVycm9yIH0gPSB0aGlzLmNvbnN0cmFpbnQ7XHJcbiAgICAgICAgY29uc3QgcmVsYXRpdmVWZWxvY2l0eSA9IHYzLmRpZmYodjMuc3VtKGJvZHkyLmdldFZlbG9jaXR5KCksIHYzLmNyb3NzKGJvZHkyLmdldEFuZ3VsYXJWZWxvY2l0eSgpLCByYikpLCB2My5zdW0oYm9keTEuZ2V0VmVsb2NpdHkoKSwgdjMuY3Jvc3MoYm9keTEuZ2V0QW5ndWxhclZlbG9jaXR5KCksIHJhKSkpO1xyXG4gICAgICAgIGNvbnN0IHJlbGF0aXZlVmVsb2NpdHlOb3JtYWxQcm9qZWN0aW9uID0gdjMuZG90KHJlbGF0aXZlVmVsb2NpdHksIG4pO1xyXG4gICAgICAgIHRoaXMuYmlhcyA9XHJcbiAgICAgICAgICAgIChNYXRoLm1heCgwLCBwb3NpdGlvbkVycm9yIC0gdHJlc2hvbGQpIC8gZHQpICogYmlhc0ZhY3RvciAtXHJcbiAgICAgICAgICAgICAgICByZWxhdGl2ZVZlbG9jaXR5Tm9ybWFsUHJvamVjdGlvbjtcclxuICAgIH1cclxufVxyXG5jbGFzcyBGcmljdGlvbkVxdWF0aW9uIGV4dGVuZHMgQ29uc3RyYWludEVxdWF0aW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbnN0cmFpbnQsIGRpcikge1xyXG4gICAgICAgIHN1cGVyKGNvbnN0cmFpbnQpO1xyXG4gICAgICAgIHRoaXMuZGlyID0gZGlyO1xyXG4gICAgICAgIHRoaXMucHJldkxhbWJkYSA9IHRoaXMuY29uc3RyYWludC5wcmV2VGFuTGFtYmRhc1tkaXJdO1xyXG4gICAgICAgIHRoaXMubGFtYmRhTWF4ID0gdGhpcy5jb25zdHJhaW50LnByZXZMYW1iZGEgKiAodGhpcy5jb25zdHJhaW50LmJvZHkxLmdldEZyaWN0aW9uKCkgKyB0aGlzLmNvbnN0cmFpbnQuYm9keTIuZ2V0RnJpY3Rpb24oKSkgKiAxMDtcclxuICAgICAgICB0aGlzLmxhbWJkYU1pbiA9IC10aGlzLmxhbWJkYU1heDtcclxuICAgIH1cclxuICAgIHVwZGF0ZUphY29iaWFuKCkge1xyXG4gICAgICAgIGNvbnN0IHsgYm9keTEsIGJvZHkyLCByYSwgcmIgfSA9IHRoaXMuY29uc3RyYWludDtcclxuICAgICAgICBjb25zdCBuID0gdGhpcy5kaXJcclxuICAgICAgICAgICAgPyB0aGlzLmNvbnN0cmFpbnQualxyXG4gICAgICAgICAgICA6IHRoaXMuY29uc3RyYWludC5pO1xyXG4gICAgICAgIGlmIChib2R5MS5pc1N0YXRpYygpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuSjEgPSBudWxsVmVjO1xyXG4gICAgICAgICAgICB0aGlzLkoyID0gbnVsbFZlYztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuSjEgPSB2My5zY2FsZShuLCAtMSk7XHJcbiAgICAgICAgICAgIHRoaXMuSjIgPSB2My5jcm9zcyhuLCByYSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChib2R5Mi5pc1N0YXRpYygpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuSjMgPSBudWxsVmVjO1xyXG4gICAgICAgICAgICB0aGlzLko0ID0gbnVsbFZlYztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuSjMgPSBuO1xyXG4gICAgICAgICAgICB0aGlzLko0ID0gdjMuY3Jvc3MocmIsIG4pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHVwZGF0ZVJpZ2h0UGFydCgpIHtcclxuICAgICAgICBjb25zdCB7IGJvZHkxLCBib2R5MiwgcmEsIHJiIH0gPSB0aGlzLmNvbnN0cmFpbnQ7XHJcbiAgICAgICAgY29uc3QgbiA9IHRoaXMuZGlyXHJcbiAgICAgICAgICAgID8gdGhpcy5jb25zdHJhaW50LmpcclxuICAgICAgICAgICAgOiB0aGlzLmNvbnN0cmFpbnQuaTtcclxuICAgICAgICBjb25zdCByZWxhdGl2ZVZlbG9jaXR5ID0gdjMuZGlmZih2My5zdW0oYm9keTIuZ2V0VmVsb2NpdHkoKSwgdjMuY3Jvc3MoYm9keTIuZ2V0QW5ndWxhclZlbG9jaXR5KCksIHJiKSksIHYzLnN1bShib2R5MS5nZXRWZWxvY2l0eSgpLCB2My5jcm9zcyhib2R5MS5nZXRBbmd1bGFyVmVsb2NpdHkoKSwgcmEpKSk7XHJcbiAgICAgICAgbGV0IHJlbGF0aXZlVmVsb2NpdHlOb3JtYWxQcm9qZWN0aW9uID0gdjMuZG90KHJlbGF0aXZlVmVsb2NpdHksIG4pO1xyXG4gICAgICAgIC8vaWYoTWF0aC5hYnMocmVsYXRpdmVWZWxvY2l0eU5vcm1hbFByb2plY3Rpb24pIDwgMC4wMDAwMDEpIHJlbGF0aXZlVmVsb2NpdHlOb3JtYWxQcm9qZWN0aW9uID0gMFxyXG4gICAgICAgIHRoaXMuYmlhcyA9IC0ocmVsYXRpdmVWZWxvY2l0eU5vcm1hbFByb2plY3Rpb24pO1xyXG4gICAgfVxyXG4gICAgYXBwbHlJbXB1bHNlKGxhbWJkYSkge1xyXG4gICAgICAgIHRoaXMuY29uc3RyYWludC5wcmV2VGFuTGFtYmRhc1t0aGlzLmRpcl0gPSBsYW1iZGE7XHJcbiAgICAgICAgdGhpcy5jb25zdHJhaW50LmJvZHkxLmFwcGx5SW1wdWxzZSh2My5zY2FsZSh0aGlzLkoxLCBsYW1iZGEpLCB0aGlzLmNvbnN0cmFpbnQucmEpO1xyXG4gICAgICAgIHRoaXMuY29uc3RyYWludC5ib2R5Mi5hcHBseUltcHVsc2UodjMuc2NhbGUodGhpcy5KMywgbGFtYmRhKSwgdGhpcy5jb25zdHJhaW50LnJiKTtcclxuICAgIH1cclxufVxyXG4vKlxyXG5jbGFzcyBQb3NpdGlvbkNvbnN0cmFpbnQgZXh0ZW5kcyBDb25zdHJhaW50IHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGJvZHkxLFxyXG4gICAgYm9keTIsXHJcbiAgICBuLFxyXG4gICAgcmEsXHJcbiAgICByYixcclxuICAgIHJhTG9jYWwsXHJcbiAgICByYkxvY2FsLFxyXG4gICAgYmlhc0ZhY3RvcixcclxuICAgIHRyZXNob2xkLFxyXG4gICAgcGVuRGVwdGhcclxuICApIHtcclxuICAgIHN1cGVyKFxyXG4gICAgICBib2R5MSxcclxuICAgICAgYm9keTIsXHJcbiAgICAgIG4sXHJcbiAgICAgIHJhLFxyXG4gICAgICByYixcclxuICAgICAgcmFMb2NhbCxcclxuICAgICAgcmJMb2NhbCxcclxuICAgICAgYmlhc0ZhY3RvcixcclxuICAgICAgbnVsbCxcclxuICAgICAgbnVsbCxcclxuICAgICAgdHJlc2hvbGRcclxuICAgICk7XHJcbiAgICB0aGlzLnBlbkRlcHRoID0gcGVuRGVwdGg7XHJcbiAgfVxyXG4gIGFwcGx5UmVzb2x2aW5nSW1wdWxzZShsYW1iZGEpIHtcclxuICAgIHRoaXMuYm9keTEuYXBwbHlQc2V1ZG9JbXB1bHNlKHYzLnNjYWxlKHRoaXMuSlswXSwgbGFtYmRhKSwgdGhpcy5yYSk7XHJcbiAgICB0aGlzLmJvZHkyLmFwcGx5UHNldWRvSW1wdWxzZSh2My5zY2FsZSh0aGlzLkpbMl0sIGxhbWJkYSksIHRoaXMucmIpO1xyXG4gIH1cclxuICB1cGRhdGVSaWdodFBhcnQoZGVsdGFUaW1lKSB7XHJcbiAgICBjb25zdCB7IGJvZHkxLCBib2R5MiwgcmEsIHJiLCBuLCBwZW5EZXB0aCwgdHJlc2hvbGQsIGJpYXNGYWN0b3IgfSA9IHRoaXM7XHJcblxyXG4gICAgdGhpcy5iaWFzID0gKE1hdGgubWF4KDAsIHBlbkRlcHRoIC0gdHJlc2hvbGQpIC8gZGVsdGFUaW1lKSAqIGJpYXNGYWN0b3I7XHJcbiAgfVxyXG59XHJcbmNsYXNzIFJvdGF0aW9uYWxDb25zdHJhaW50IGV4dGVuZHMgQ29uc3RyYWludCB7XHJcbiAgY29uc3RydWN0b3IoYm9keTEsIGJvZHkyLCByYUxvY2FsLCByYkxvY2FsKSB7XHJcbiAgICBzdXBlcihib2R5MSwgYm9keTIsIG51bGwsIG51bGwsIG51bGwsIHJhTG9jYWwsIHJiTG9jYWwpO1xyXG4gIH1cclxuICB1cGRhdGVMZWZ0UGFydChkZWx0YVRpbWUpIHtcclxuICAgIGNvbnN0IHsgYm9keTEsIGJvZHkyLCByYUxvY2FsLCByYkxvY2FsIH0gPSB0aGlzO1xyXG4gICAgdGhpcy5QQSA9IGJvZHkxLmNvbGxpZGVyLmxvY2FsVG9HbG9iYWwocmFMb2NhbCk7XHJcbiAgICB0aGlzLlBCID0gYm9keTIuY29sbGlkZXIubG9jYWxUb0dsb2JhbChyYkxvY2FsKTtcclxuICAgIGNvbnN0IHMgPSBtMy50cmFuc2Zvcm1Qb2ludChib2R5MS5jb2xsaWRlci5SbWF0cml4LCByYUxvY2FsKTtcclxuICAgIGNvbnN0IGIgPSBtMy50cmFuc2Zvcm1Qb2ludChib2R5Mi5jb2xsaWRlci5SbWF0cml4LCByYkxvY2FsKTtcclxuXHJcbiAgICB0aGlzLnJhID0gcztcclxuICAgIHRoaXMucmIgPSBiO1xyXG5cclxuICAgIGNvbnN0IEogPSBbWzAsIDAsIDBdLCB2My5jcm9zcyhzLCBiKSwgWzAsIDAsIDBdLCB2My5jcm9zcyhiLCBzKV07XHJcblxyXG4gICAgY29uc3QgZG9mMSA9IGJvZHkxLkRPRjtcclxuICAgIGNvbnN0IGRvZjIgPSBib2R5Mi5ET0Y7XHJcblxyXG4gICAgSlswXVswXSAqPSBkb2YxWzBdO1xyXG4gICAgSlswXVsxXSAqPSBkb2YxWzFdO1xyXG4gICAgSlswXVsyXSAqPSBkb2YxWzJdO1xyXG5cclxuICAgIEpbMV1bMF0gKj0gZG9mMVszXTtcclxuICAgIEpbMV1bMV0gKj0gZG9mMVs0XTtcclxuICAgIEpbMV1bMl0gKj0gZG9mMVs1XTtcclxuXHJcbiAgICBKWzJdWzBdICo9IGRvZjJbMF07XHJcbiAgICBKWzJdWzFdICo9IGRvZjJbMV07XHJcbiAgICBKWzJdWzJdICo9IGRvZjJbMl07XHJcblxyXG4gICAgSlszXVswXSAqPSBkb2YyWzNdO1xyXG4gICAgSlszXVsxXSAqPSBkb2YyWzRdO1xyXG4gICAgSlszXVsyXSAqPSBkb2YyWzVdO1xyXG4gICAgY29uc3QgSTEgPSBib2R5MS5nZXRJbnZlcnNlSW5lcnRpYVRlbnNvcigpO1xyXG4gICAgY29uc3QgSTIgPSBib2R5Mi5nZXRJbnZlcnNlSW5lcnRpYVRlbnNvcigpO1xyXG4gICAgdGhpcy5KID0gSjtcclxuICAgIHRoaXMuSk0gPSBbXHJcbiAgICAgIFswLCAwLCAwXSxcclxuICAgICAgbTMudHJhbnNmb3JtUG9pbnQoSTEsIHRoaXMuSlsxXSksXHJcbiAgICAgIFswLCAwLCAwXSxcclxuICAgICAgbTMudHJhbnNmb3JtUG9pbnQoSTIsIHRoaXMuSlszXSksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5lZmZNYXNzID1cclxuICAgICAgdjMuZG90KHRoaXMuSk1bMV0sIHRoaXMuSlsxXSkgKyB2My5kb3QodGhpcy5KTVszXSwgdGhpcy5KWzNdKTtcclxuICAgIHRoaXMuQiA9IFtcclxuICAgICAgWzAsIDAsIDAsIC4uLnRoaXMuSk1bMV1dLFxyXG4gICAgICBbMCwgMCwgMCwgLi4udGhpcy5KTVszXV0sXHJcbiAgICBdO1xyXG4gICAgdGhpcy5fSiA9IFtcclxuICAgICAgWy4uLnRoaXMuSlswXSwgLi4udGhpcy5KWzFdXSxcclxuICAgICAgWy4uLnRoaXMuSlsyXSwgLi4udGhpcy5KWzNdXSxcclxuICAgIF07XHJcbiAgfVxyXG4gIHVwZGF0ZVJpZ2h0UGFydChkZWx0YVRpbWUpIHtcclxuICAgIGNvbnN0IHsgYm9keTEsIGJvZHkyIH0gPSB0aGlzO1xyXG5cclxuICAgIHRoaXMuYmlhcyA9XHJcbiAgICAgIC12My5kb3QodGhpcy5KWzFdLCBib2R5MS5nZXRBbmd1bGFyVmVsb2NpdHkoKSkgKyB2My5kb3QodGhpcy5KWzNdLCBib2R5Mi5nZXRBbmd1bGFyVmVsb2NpdHkoKSk7XHJcbiAgfVxyXG4gIGFwcGx5UmVzb2x2aW5nSW1wdWxzZShsYW1iZGEpIHtcclxuICAgIGNvbnN0IHsgYm9keTEsIGJvZHkyIH0gPSB0aGlzO1xyXG4gICAgYm9keTEuYWRkQW5ndWxhclYodjMuc2NhbGUodGhpcy5yYSwgbGFtYmRhKSk7XHJcbiAgICBib2R5Mi5hZGRBbmd1bGFyVih2My5zY2FsZSh0aGlzLnJiLCBsYW1iZGEpKTtcclxuICB9XHJcbn1cclxuKi9cclxuLypcclxuY2xhc3MgSm9pbnQgZXh0ZW5kcyBDb25zdHJhaW50IHtcclxuICBjb25zdHJ1Y3Rvcihib2R5MSwgYm9keTIsIHJhTG9jYWwsIHJiTG9jYWwsIGJpYXNGYWN0b3IgPSAwKSB7XHJcbiAgICBzdXBlcihib2R5MSwgYm9keTIsIG51bGwsIG51bGwsIG51bGwsIHJhTG9jYWwsIHJiTG9jYWwsIGJpYXNGYWN0b3IpO1xyXG5cclxuICAgIHRoaXMudHJlc2hvbGQgPSAwLjAwMDE7XHJcbiAgICB0aGlzLnJlZHVjZXIgPSAwLjU7XHJcbiAgICB0aGlzLm1heEltcHVsc2UgPSAwLjc7XHJcbiAgfVxyXG4gIHVwZGF0ZUxlZnRQYXJ0KGRlbHRhVGltZSkge1xyXG4gICAgY29uc3QgeyBib2R5MSwgYm9keTIsIHJhTG9jYWwsIHJiTG9jYWwgfSA9IHRoaXM7XHJcbiAgICB0aGlzLlBBID0gYm9keTEuY29sbGlkZXIubG9jYWxUb0dsb2JhbChyYUxvY2FsKTtcclxuICAgIHRoaXMuUEIgPSBib2R5Mi5jb2xsaWRlci5sb2NhbFRvR2xvYmFsKHJiTG9jYWwpO1xyXG4gICAgY29uc3QgZGlyID0gdjMuZGlmZih0aGlzLlBBLCB0aGlzLlBCKTtcclxuICAgIGNvbnN0IG4gPSBkaXI7XHJcbiAgICB0aGlzLm4gPSBuO1xyXG4gICAgdGhpcy5yYSA9IGRpZmYodGhpcy5QQSwgdGhpcy5ib2R5MS5jb2xsaWRlci5wb3MpO1xyXG4gICAgdGhpcy5yYiA9IGRpZmYodGhpcy5QQiwgdGhpcy5ib2R5Mi5jb2xsaWRlci5wb3MpO1xyXG4gICAgdGhpcy5wZW5EZXB0aCA9IG5vcm0oZGlyKTtcclxuXHJcbiAgICBjb25zdCBKID0gW1xyXG4gICAgICB2My5zY2FsZSh0aGlzLm4sIC0xKSxcclxuICAgICAgdjMuY3Jvc3ModGhpcy5uLCB0aGlzLnJhKSxcclxuICAgICAgdGhpcy5uLFxyXG4gICAgICB2My5jcm9zcyh0aGlzLnJiLCB0aGlzLm4pLFxyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdCBkb2YxID0gYm9keTEuRE9GO1xyXG4gICAgY29uc3QgZG9mMiA9IGJvZHkyLkRPRjtcclxuXHJcbiAgICBKWzBdWzBdICo9IGRvZjFbMF07XHJcbiAgICBKWzBdWzFdICo9IGRvZjFbMV07XHJcbiAgICBKWzBdWzJdICo9IGRvZjFbMl07XHJcblxyXG4gICAgSlsxXVswXSAqPSBkb2YxWzNdO1xyXG4gICAgSlsxXVsxXSAqPSBkb2YxWzRdO1xyXG4gICAgSlsxXVsyXSAqPSBkb2YxWzVdO1xyXG5cclxuICAgIEpbMl1bMF0gKj0gZG9mMlswXTtcclxuICAgIEpbMl1bMV0gKj0gZG9mMlsxXTtcclxuICAgIEpbMl1bMl0gKj0gZG9mMlsyXTtcclxuXHJcbiAgICBKWzNdWzBdICo9IGRvZjJbM107XHJcbiAgICBKWzNdWzFdICo9IGRvZjJbNF07XHJcbiAgICBKWzNdWzJdICo9IGRvZjJbNV07XHJcbiAgICBjb25zdCBJMSA9IGJvZHkxLmdldEludmVyc2VJbmVydGlhVGVuc29yKCk7XHJcbiAgICBjb25zdCBJMiA9IGJvZHkyLmdldEludmVyc2VJbmVydGlhVGVuc29yKCk7XHJcbiAgICBsZXQgTTEgPSBib2R5MS5nZXRJbnZlcnNlTWFzcygpO1xyXG4gICAgbGV0IE0yID0gYm9keTIuZ2V0SW52ZXJzZU1hc3MoKTtcclxuICAgIHRoaXMuSiA9IEo7XHJcbiAgICB0aGlzLkpNID0gW1xyXG4gICAgICBzY2FsZSh0aGlzLkpbMF0sIE0xKSxcclxuICAgICAgbTMudHJhbnNmb3JtUG9pbnQoSTEsIHRoaXMuSlsxXSksXHJcbiAgICAgIHNjYWxlKHRoaXMuSlsyXSwgTTIpLFxyXG4gICAgICBtMy50cmFuc2Zvcm1Qb2ludChJMiwgdGhpcy5KWzNdKSxcclxuICAgIF07XHJcbiAgICB0aGlzLmVmZk1hc3MgPVxyXG4gICAgICBkb3QodGhpcy5KTVswXSwgSlswXSkgK1xyXG4gICAgICBkb3QodGhpcy5KTVsxXSwgdGhpcy5KWzFdKSArXHJcbiAgICAgIGRvdCh0aGlzLkpNWzJdLCBKWzJdKSArXHJcbiAgICAgIGRvdCh0aGlzLkpNWzNdLCB0aGlzLkpbM10pO1xyXG4gICAgdGhpcy5CID0gW1xyXG4gICAgICBbLi4udGhpcy5KTVswXSwgLi4udGhpcy5KTVsxXV0sXHJcbiAgICAgIFsuLi50aGlzLkpNWzJdLCAuLi50aGlzLkpNWzNdXSxcclxuICAgIF07XHJcbiAgICB0aGlzLl9KID0gW1xyXG4gICAgICBbLi4udGhpcy5KWzBdLCAuLi50aGlzLkpbMV1dLFxyXG4gICAgICBbLi4udGhpcy5KWzJdLCAuLi50aGlzLkpbM11dLFxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVJpZ2h0UGFydChkZWx0YVRpbWUpIHtcclxuICAgIGNvbnN0IHsgYm9keTEsIGJvZHkyLCByYSwgcmIsIG4sIHBlbkRlcHRoLCB0cmVzaG9sZCwgYmlhc0ZhY3RvciB9ID0gdGhpcztcclxuXHJcbiAgICBjb25zdCByZWxhdGl2ZVZlbG9jaXR5ID0gZGlmZihcclxuICAgICAgc3VtKGJvZHkyLmdldFZlbG9jaXR5KCksIGNyb3NzKGJvZHkyLmdldEFuZ3VsYXJWZWxvY2l0eSgpLCByYikpLFxyXG4gICAgICBzdW0oYm9keTEuZ2V0VmVsb2NpdHkoKSwgY3Jvc3MoYm9keTEuZ2V0QW5ndWxhclZlbG9jaXR5KCksIHJhKSlcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgcmVsYXRpdmVWZWxvY2l0eU5vcm1hbFByb2plY3Rpb24gPSBkb3QocmVsYXRpdmVWZWxvY2l0eSwgbik7XHJcbiAgICBjb25zdCBmYWMgPSBwZW5EZXB0aCAqKiAyID4gdHJlc2hvbGQ7XHJcbiAgICB0aGlzLmJpYXMgPVxyXG4gICAgICAoYmlhc0ZhY3RvciAqIE1hdGgubWF4KHBlbkRlcHRoICoqIDIgLSB0cmVzaG9sZCwgMCkpIC8gZGVsdGFUaW1lIC1cclxuICAgICAgcmVsYXRpdmVWZWxvY2l0eU5vcm1hbFByb2plY3Rpb247XHJcbiAgICB0aGlzLmJpYXMgKj0gZmFjO1xyXG4gIH1cclxuICBhcHBseVJlc29sdmluZ0ltcHVsc2UobGFtYmRhKSB7XHJcbiAgICB0aGlzLmJvZHkxLmFwcGx5SW1wdWxzZShzY2FsZSh0aGlzLkpbMF0sIGxhbWJkYSksIHRoaXMucmEpO1xyXG4gICAgdGhpcy5ib2R5Mi5hcHBseUltcHVsc2Uoc2NhbGUodGhpcy5KWzJdLCBsYW1iZGEpLCB0aGlzLnJiKTtcclxuICB9XHJcbiAgYXBwbHlSZXNvbHZpbmdQc2V1ZG9JbXB1bHNlKGxhbWJkYSkge1xyXG4gICAgY29uc3QgbWF4ID0gdGhpcy5lZmZNYXNzICogMTA7XHJcbiAgICAvL2xhbWJkYSA9IGNsYW1wKGxhbWJkYSwgLTEsIDEpXHJcbiAgICB0aGlzLmJvZHkxLmFwcGx5UHNldWRvSW1wdWxzZShzY2FsZSh0aGlzLm4sIC1sYW1iZGEpLCBbMCwgMCwgMF0pO1xyXG4gICAgdGhpcy5ib2R5Mi5hcHBseVBzZXVkb0ltcHVsc2Uoc2NhbGUodGhpcy5uLCBsYW1iZGEpLCBbMCwgMCwgMF0pO1xyXG4gIH1cclxufVxyXG5jbGFzcyBKb2ludFBvc2l0aW9uQ29uc3RyYWludCBleHRlbmRzIEpvaW50IHtcclxuICB1cGRhdGVSaWdodFBhcnQoZGVsdGFUaW1lKSB7XHJcbiAgICBjb25zdCB7IHBlbkRlcHRoLCB0cmVzaG9sZCwgYmlhc0ZhY3RvciB9ID0gdGhpcztcclxuXHJcbiAgICBjb25zdCBmYWMgPSBwZW5EZXB0aCAqKiAyID4gdHJlc2hvbGQ7XHJcbiAgICB0aGlzLmJpYXMgPVxyXG4gICAgICAoKGJpYXNGYWN0b3IgKiBNYXRoLm1heChwZW5EZXB0aCAqKiAyIC0gdHJlc2hvbGQsIDApKSAvIGRlbHRhVGltZSkgKiBmYWM7XHJcbiAgfVxyXG4gIGFwcGx5UmVzb2x2aW5nSW1wdWxzZShsYW1iZGEpIHtcclxuICAgIC8vaWYobGFtYmRhIDwgMC4xKXJldHVyblxyXG4gICAgdGhpcy5ib2R5MS5hcHBseVBzZXVkb0ltcHVsc2Uoc2NhbGUodGhpcy5KWzBdLCBsYW1iZGEpLCB0aGlzLnJhKTtcclxuICAgIHRoaXMuYm9keTIuYXBwbHlQc2V1ZG9JbXB1bHNlKHNjYWxlKHRoaXMuSlsyXSwgbGFtYmRhKSwgdGhpcy5yYik7XHJcbiAgfVxyXG59Ki9cclxuZXhwb3J0IHsgQ29udGFjdEVxdWF0aW9uLCBDb25zdHJhaW50RXF1YXRpb24sIFxyXG4vL0pvaW50LFxyXG5GcmljdGlvbkVxdWF0aW9uLFxyXG4vL1Bvc2l0aW9uQ29uc3RyYWludCxcclxuLy9Kb2ludFBvc2l0aW9uQ29uc3RyYWludCxcclxuLy9Sb3RhdGlvbmFsQ29uc3RyYWludCxcclxuIH07XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50RW1pdHRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmV2ZW50cyA9IHt9O1xyXG4gICAgfVxyXG4gICAgb24oZXZlbnROYW1lLCBmbikge1xyXG4gICAgICAgIGlmICghdGhpcy5ldmVudHNbZXZlbnROYW1lXSkge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0ucHVzaChmbik7XHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0uZmlsdGVyKChldmVudEZuKSA9PiBmbiAhPT0gZXZlbnRGbik7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGVtaXQoZXZlbnROYW1lLCBkYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0pIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5mb3JFYWNoKChmbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgZm4uY2FsbChudWxsLCBkYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEhhc2hHcmlkIHtcclxuICAgIGNvbnN0cnVjdG9yKGFhYmIsIGNlbGxTaXplLCBudW1DZWxscykge1xyXG4gICAgICAgIHRoaXMuY2VsbFNpemUgPSBjZWxsU2l6ZTtcclxuICAgICAgICB0aGlzLm51bUNlbGxzID0gbnVtQ2VsbHM7XHJcbiAgICAgICAgdGhpcy5hYWJiID0gYWFiYjtcclxuICAgICAgICB0aGlzLmNlbGxzID0gbmV3IEFycmF5KE1hdGgucG93KG51bUNlbGxzLCAzKSk7XHJcbiAgICB9XHJcbiAgICBnZXRBQUJCKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFhYmI7XHJcbiAgICB9XHJcbiAgICBjb250YWluKHBvc2l0aW9uKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFhYmIubWluW2ldID4gcG9zaXRpb25baV0pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFhYmIubWF4W2ldIDwgcG9zaXRpb25baV0pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBnZXRDZWxsRm9yUG9zKHBvc2l0aW9uKSB7XHJcbiAgICAgICAgbGV0IGkgPSBNYXRoLm1pbigxLCBNYXRoLm1heCgwLCAocG9zaXRpb25bMF0gLSB0aGlzLmFhYmIubWluWzBdKSAvICh0aGlzLmFhYmIubWF4WzBdIC0gdGhpcy5hYWJiLm1pblswXSkpKTtcclxuICAgICAgICBsZXQgaiA9IE1hdGgubWluKDEsIE1hdGgubWF4KDAsIChwb3NpdGlvblsxXSAtIHRoaXMuYWFiYi5taW5bMV0pIC8gKHRoaXMuYWFiYi5tYXhbMV0gLSB0aGlzLmFhYmIubWluWzFdKSkpO1xyXG4gICAgICAgIGxldCBrID0gTWF0aC5taW4oMSwgTWF0aC5tYXgoMCwgKHBvc2l0aW9uWzJdIC0gdGhpcy5hYWJiLm1pblsyXSkgLyAodGhpcy5hYWJiLm1heFsyXSAtIHRoaXMuYWFiYi5taW5bMl0pKSk7XHJcbiAgICAgICAgaSA9IE1hdGguZmxvb3IoaSAqIHRoaXMubnVtQ2VsbHMgLSAxKTtcclxuICAgICAgICBqID0gTWF0aC5mbG9vcihqICogdGhpcy5udW1DZWxscyAtIDEpO1xyXG4gICAgICAgIGsgPSBNYXRoLmZsb29yKGsgKiB0aGlzLm51bUNlbGxzIC0gMSk7XHJcbiAgICAgICAgcmV0dXJuIFtpLCBqLCBrXTtcclxuICAgIH1cclxuICAgIGluc2VydChwb3NpdGlvbiwgZWxlbWVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy5jb250YWluKHBvc2l0aW9uKSlcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IGNlbGxJSksgPSB0aGlzLmdldENlbGxGb3JQb3MocG9zaXRpb24pO1xyXG4gICAgICAgIHRoaXMuY2VsbHNbY2VsbElKS1swXSArIGNlbGxJSktbMV0gKiB0aGlzLm51bUNlbGxzICsgY2VsbElKS1syXSAqIHRoaXMubnVtQ2VsbHMgKiB0aGlzLm51bUNlbGxzXSA9IGVsZW1lbnQ7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBxdWVyeShhYWJiKSB7XHJcbiAgICAgICAgY29uc3QgbWluID0gdGhpcy5nZXRDZWxsRm9yUG9zKGFhYmIubWluKTtcclxuICAgICAgICBjb25zdCBtYXggPSB0aGlzLmdldENlbGxGb3JQb3MoYWFiYi5tYXgpO1xyXG4gICAgICAgIGNvbnN0IGNvbGxpc2lvbnMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gbWluWzBdOyBpIDw9IG1heFswXTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSBtaW5bMV07IGogPD0gbWF4WzFdOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSBtaW5bMl07IGsgPD0gbWF4WzJdOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5jZWxsc1tpICsgaiAqIHRoaXMubnVtQ2VsbHMgKyBrICogdGhpcy5udW1DZWxscyAqIHRoaXMubnVtQ2VsbHNdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsaXNpb25zLnB1c2goZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbGxpc2lvbnM7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiLi9FdmVudEVtaXR0ZXJcIjtcclxuaW1wb3J0IHsgbTMsIHYzIH0gZnJvbSAncm9tYW5wcHBtYXRoJztcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi9jb25maWdcIjtcclxuY29uc3QgeyBSSUdJRF9CT0RZX01PVkVfVFJFU0hPTEQsIFJJR0lEX0JPRFlfQUFCQl9CSUFTIH0gPSBjb25maWc7XHJcbmNsYXNzIFJpZ2lkQm9keSBleHRlbmRzIEV2ZW50RW1pdHRlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb2xsaWRlcikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zdGF0aWMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvbGxpZGVyID0gY29sbGlkZXI7XHJcbiAgICAgICAgdGhpcy5tYXNzID0gMTtcclxuICAgICAgICB0aGlzLmludmVyc2VNYXNzID0gMSAvIHRoaXMubWFzcztcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gWzAsIDAsIDBdO1xyXG4gICAgICAgIHRoaXMucHNldWRvVmVsb2NpdHkgPSBbMCwgMCwgMF07XHJcbiAgICAgICAgdGhpcy5wc2V1ZG9Bbmd1bGFyViA9IFswLCAwLCAwXTtcclxuICAgICAgICB0aGlzLmFjY2VsZXJhdGlvbiA9IFswLCAwLCAwXTtcclxuICAgICAgICB0aGlzLm9tZWdhID0gWzAsIDAsIDBdO1xyXG4gICAgICAgIHRoaXMuaW52ZXJzZUluZXJ0aWFUZW5zb3IgPSBjb2xsaWRlci5nZXRJbnZlcnNlSW5lcnRpYVRlbnNvcih0aGlzLm1hc3MpO1xyXG4gICAgICAgIHRoaXMuaWQgPSBSaWdpZEJvZHkubGFzdElkKys7XHJcbiAgICAgICAgdGhpcy5mcmljdGlvbiA9IDU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVFdmVudEZ1bmN0aW9ucyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZ3JvdXAgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubmVlZFRvVXBkYXRlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBnZXRJZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pZDtcclxuICAgIH1cclxuICAgIGdldEdyb3VwKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdyb3VwO1xyXG4gICAgfVxyXG4gICAgc2V0R3JvdXAoZ3JvdXBJZCkge1xyXG4gICAgICAgIHRoaXMuZ3JvdXAgPSBncm91cElkO1xyXG4gICAgfVxyXG4gICAgZ2V0TWFzcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXNzO1xyXG4gICAgfVxyXG4gICAgZ2V0SW52ZXJzZU1hc3MoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW52ZXJzZU1hc3M7XHJcbiAgICB9XHJcbiAgICBnZXRUcmFuc2xhdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRDb2xsaWRlcigpLmdldFRyYW5zbGF0aW9uKCk7XHJcbiAgICB9XHJcbiAgICBnZXRDb2xsaWRlcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb2xsaWRlcjtcclxuICAgIH1cclxuICAgIGlzU3RhdGljKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRpYztcclxuICAgIH1cclxuICAgIGdldFJvdGF0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldENvbGxpZGVyKCkuZ2V0Um1hdHJpeCgpO1xyXG4gICAgfVxyXG4gICAgZ2V0VmVsb2NpdHkoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmVsb2NpdHk7XHJcbiAgICB9XHJcbiAgICBnZXRBY2NlbGVyYXRpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWNjZWxlcmF0aW9uO1xyXG4gICAgfVxyXG4gICAgZ2V0QW5ndWxhclZlbG9jaXR5KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9tZWdhO1xyXG4gICAgfVxyXG4gICAgZ2V0RnJpY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZnJpY3Rpb247XHJcbiAgICB9XHJcbiAgICBnZXRJbnZlcnNlSW5lcnRpYVRlbnNvcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnZlcnNlSW5lcnRpYVRlbnNvcjtcclxuICAgIH1cclxuICAgIGdldEFBQkIoKSB7XHJcbiAgICAgICAgY29uc3QgYWFiYiA9IHRoaXMuY29sbGlkZXIuZ2V0QUFCQigpO1xyXG4gICAgICAgIGNvbnN0IHZlbG9jaXR5ID0gdGhpcy52ZWxvY2l0eTtcclxuICAgICAgICBjb25zdCB0ciA9IFtSSUdJRF9CT0RZX0FBQkJfQklBUywgUklHSURfQk9EWV9BQUJCX0JJQVMsIFJJR0lEX0JPRFlfQUFCQl9CSUFTXTtcclxuICAgICAgICBhYWJiLm1pbiA9IHYzLmRpZmYoYWFiYi5taW4sIHRyKTtcclxuICAgICAgICBhYWJiLm1heCA9IHYzLnN1bShhYWJiLm1heCwgdHIpO1xyXG4gICAgICAgIHJldHVybiBhYWJiO1xyXG4gICAgfVxyXG4gICAgYWRkVmVsb2NpdHkodikge1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSB2My5zdW0odGhpcy52ZWxvY2l0eSwgdik7XHJcbiAgICB9XHJcbiAgICBhZGRBbmd1bGFyVmVsb2NpdHkodikge1xyXG4gICAgICAgIHRoaXMub21lZ2EgPSB2My5zdW0odGhpcy5vbWVnYSwgdik7XHJcbiAgICB9XHJcbiAgICBhZGRBY2NlbGVyYXRpb24odikge1xyXG4gICAgICAgIHRoaXMuYWNjZWxlcmF0aW9uID0gdjMuc3VtKHRoaXMuYWNjZWxlcmF0aW9uLCB2KTtcclxuICAgIH1cclxuICAgIHRyYW5zbGF0ZSh0cmFuc2xhdGlvbikge1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXIudHJhbnNsYXRlKHRyYW5zbGF0aW9uKTtcclxuICAgICAgICB0aGlzLm5lZWRUb1VwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5lbWl0VXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICByb3RhdGUocm90YXRpb24pIHtcclxuICAgICAgICB0aGlzLmNvbGxpZGVyLnJvdGF0ZShyb3RhdGlvbik7XHJcbiAgICAgICAgdGhpcy5uZWVkVG9VcGRhdGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZW1pdFVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgc2V0SWQoaWQpIHtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB9XHJcbiAgICBzZXRNYXNzKG1hc3MpIHtcclxuICAgICAgICB0aGlzLm1hc3MgPSBtYXNzO1xyXG4gICAgICAgIHRoaXMuaW52ZXJzZU1hc3MgPSAxIC8gdGhpcy5tYXNzO1xyXG4gICAgfVxyXG4gICAgc2V0RnJpY3Rpb24oZikge1xyXG4gICAgICAgIHRoaXMuZnJpY3Rpb24gPSBmO1xyXG4gICAgfVxyXG4gICAgc2V0Um90YXRpb24ocikge1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXIuc2V0Um90YXRpb24ocik7XHJcbiAgICAgICAgdGhpcy5uZWVkVG9VcGRhdGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZW1pdFVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgc2V0VHJhbnNsYXRpb24odCkge1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXIuc2V0VHJhbnNsYXRpb24odCk7XHJcbiAgICAgICAgdGhpcy5uZWVkVG9VcGRhdGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZW1pdFVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgc2V0VmVsb2NpdHkodikge1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSB2O1xyXG4gICAgfVxyXG4gICAgc2V0QW5ndWxhclZlbG9jaXR5KHYpIHtcclxuICAgICAgICB0aGlzLm9tZWdhID0gdjtcclxuICAgIH1cclxuICAgIHNldFN0YXRpYyhiKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0aWMgPSBiO1xyXG4gICAgfVxyXG4gICAgaW50ZWdyYXRlUks0KGR0KSB7XHJcbiAgICAgICAgY29uc3QgeyBhY2NlbGVyYXRpb24sIHZlbG9jaXR5LCBvbWVnYSB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCBfdHJhbnNsYXRpb24gPSB2My5zY2FsZSh2My5zdW0odmVsb2NpdHksIHYzLnNjYWxlKGFjY2VsZXJhdGlvbiwgKDIgLyAzKSAqIGR0KSksIGR0KTtcclxuICAgICAgICBjb25zdCBfcm90YXRpb24gPSB2My5zY2FsZShvbWVnYSwgZHQgLyAyKTtcclxuICAgICAgICBjb25zdCBkZWx0YVZlbG9jaXR5ID0gdjMuc2NhbGUoYWNjZWxlcmF0aW9uLCBkdCk7XHJcbiAgICAgICAgaWYgKHYzLm5vcm0oX3RyYW5zbGF0aW9uKSA+IGNvbmZpZy5SSUdJRF9CT0RZX01PVkVfVFJFU0hPTEQpXHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNsYXRlKF90cmFuc2xhdGlvbik7XHJcbiAgICAgICAgaWYgKHYzLm5vcm0oX3JvdGF0aW9uKSA+IGNvbmZpZy5SSUdJRF9CT0RZX01PVkVfVFJFU0hPTEQpXHJcbiAgICAgICAgICAgIHRoaXMucm90YXRlKF9yb3RhdGlvbik7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHYzLnN1bSh2ZWxvY2l0eSwgZGVsdGFWZWxvY2l0eSk7XHJcbiAgICB9XHJcbiAgICBpbnRlZ3JhdGVQc2V1ZG9WZWxvY2l0aWVzKGR0KSB7XHJcbiAgICAgICAgY29uc3QgdHJhbnNsYXRpb24gPSB2My5zY2FsZSh0aGlzLnBzZXVkb1ZlbG9jaXR5LCBkdCk7XHJcbiAgICAgICAgY29uc3Qgcm90YXRpb24gPSB2My5zY2FsZSh0aGlzLnBzZXVkb0FuZ3VsYXJWLCBkdCk7XHJcbiAgICAgICAgaWYgKHYzLm5vcm0odHJhbnNsYXRpb24pID4gY29uZmlnLlJJR0lEX0JPRFlfTU9WRV9UUkVTSE9MRClcclxuICAgICAgICAgICAgdGhpcy50cmFuc2xhdGUodHJhbnNsYXRpb24pO1xyXG4gICAgICAgIGlmICh2My5ub3JtKHJvdGF0aW9uKSA+IGNvbmZpZy5SSUdJRF9CT0RZX01PVkVfVFJFU0hPTEQpXHJcbiAgICAgICAgICAgIHRoaXMucm90YXRlKHJvdGF0aW9uKTtcclxuICAgICAgICB0aGlzLnBzZXVkb1ZlbG9jaXR5ID0gWzAsIDAsIDBdO1xyXG4gICAgICAgIHRoaXMucHNldWRvQW5ndWxhclYgPSBbMCwgMCwgMF07XHJcbiAgICB9XHJcbiAgICBhZGRQc2V1ZG9WZWxvY2l0eSh2KSB7XHJcbiAgICAgICAgdGhpcy5wc2V1ZG9WZWxvY2l0eSA9IHYzLnN1bSh0aGlzLnBzZXVkb1ZlbG9jaXR5LCB2KTtcclxuICAgIH1cclxuICAgIGFkZFBzZXVkb0FuZ3VsYXJWKHYpIHtcclxuICAgICAgICB0aGlzLnBzZXVkb0FuZ3VsYXJWID0gdjMuc3VtKHRoaXMucHNldWRvQW5ndWxhclYsIHYpO1xyXG4gICAgfVxyXG4gICAgaW50ZWdyYXRlVmVsb2NpdGllcyhkdCkge1xyXG4gICAgICAgIGNvbnN0IHRyYW5zbGF0aW9uID0gdjMuc2NhbGUodjMuZGlmZih0aGlzLnZlbG9jaXR5LCB2My5zY2FsZSh0aGlzLmFjY2VsZXJhdGlvbiwgZHQgLyAzKSksIGR0KTtcclxuICAgICAgICBpZiAodjMubm9ybSh0cmFuc2xhdGlvbikgPiBjb25maWcuUklHSURfQk9EWV9NT1ZFX1RSRVNIT0xEKVxyXG4gICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZSh0cmFuc2xhdGlvbik7XHJcbiAgICAgICAgY29uc3Qgcm90YXRpb24gPSB2My5zY2FsZSh0aGlzLm9tZWdhLCBkdCAvIDIpO1xyXG4gICAgICAgIGlmICh2My5ub3JtKHJvdGF0aW9uKSA+IGNvbmZpZy5SSUdJRF9CT0RZX01PVkVfVFJFU0hPTEQpXHJcbiAgICAgICAgICAgIHRoaXMucm90YXRlKHJvdGF0aW9uKTtcclxuICAgIH1cclxuICAgIGludGVncmF0ZUZvcmNlcyhkdCkge1xyXG4gICAgICAgIGxldCBkZWx0YVNwZWVkID0gdjMuc2NhbGUodGhpcy5hY2NlbGVyYXRpb24sIGR0KTtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gdjMuc3VtKHRoaXMudmVsb2NpdHksIGRlbHRhU3BlZWQpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlSW52ZXJzZUluZXJ0aWEoKSB7XHJcbiAgICAgICAgdGhpcy5pbnZlcnNlSW5lcnRpYVRlbnNvciA9IHRoaXMuY29sbGlkZXIuZ2V0SW52ZXJzZUluZXJ0aWFUZW5zb3IodGhpcy5tYXNzKTtcclxuICAgIH1cclxuICAgIGFwcGx5SW1wdWxzZShpbXB1bHNlLCBwb2ludCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRpYylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSB2My5zdW0odGhpcy52ZWxvY2l0eSwgdjMuc2NhbGUoaW1wdWxzZSwgdGhpcy5pbnZlcnNlTWFzcykpO1xyXG4gICAgICAgIGNvbnN0IGFuZ3VsYXJJbXB1bHNlID0gbTMudHJhbnNmb3JtUG9pbnQodGhpcy5pbnZlcnNlSW5lcnRpYVRlbnNvciwgdjMuY3Jvc3MocG9pbnQsIGltcHVsc2UpKTtcclxuICAgICAgICB0aGlzLm9tZWdhID0gdjMuc3VtKHRoaXMub21lZ2EsIGFuZ3VsYXJJbXB1bHNlKTtcclxuICAgIH1cclxuICAgIGFwcGx5UHNldWRvSW1wdWxzZShpbXB1bHNlLCBwb2ludCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRpYylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMucHNldWRvVmVsb2NpdHkgPSB2My5zdW0odGhpcy5wc2V1ZG9WZWxvY2l0eSwgdjMuc2NhbGUoaW1wdWxzZSwgdGhpcy5pbnZlcnNlTWFzcykpO1xyXG4gICAgICAgIGNvbnN0IGFuZ3VsYXJJbXB1bHNlID0gbTMudHJhbnNmb3JtUG9pbnQodGhpcy5pbnZlcnNlSW5lcnRpYVRlbnNvciwgdjMuY3Jvc3MocG9pbnQsIGltcHVsc2UpKTtcclxuICAgICAgICB0aGlzLnBzZXVkb0FuZ3VsYXJWID0gdjMuc3VtKHRoaXMucHNldWRvQW5ndWxhclYsIGFuZ3VsYXJJbXB1bHNlKTtcclxuICAgIH1cclxuICAgIC8qXHJcbiAgICBhcHBseUFuZ3VsYXJJbXB1bHNlKHJhZGl1cyA6IG51bWJlciwgYXhpcywgdmFsdWUpIHtcclxuICAgICAgY29uc3QgZGlyID0gbm9ybWFsaXplKFtcclxuICAgICAgICBheGlzWzFdICsgYXhpc1syXSxcclxuICAgICAgICBheGlzWzJdIC0gYXhpc1swXSxcclxuICAgICAgICAtYXhpc1swXSAtIGF4aXNbMV0sXHJcbiAgICAgIF0pO1xyXG4gICAgICBjb25zdCByYWQgPSB2ZWN0b3IuY3Jvc3MoZGlyLCBheGlzKTtcclxuICAgICAgY29uc3QgZ2xvYmFsRGlyID0gc2NhbGUoZGlyLCB2YWx1ZSk7XHJcbiAgICAgIGNvbnN0IGdsb2JhbFJhZCA9IHNjYWxlKHJhZCwgcmFkaXVzKTtcclxuICBcclxuICAgICAgdGhpcy5hcHBseUltcHVsc2UoZ2xvYmFsRGlyLCBnbG9iYWxSYWQpO1xyXG4gICAgfSovXHJcbiAgICBnZXRFeHBhbmRlZEFBQkIoKSB7XHJcbiAgICAgICAgY29uc3QgYWFiYiA9IHRoaXMuY29sbGlkZXIuZ2V0QUFCQigpO1xyXG4gICAgICAgIGNvbnN0IHZlbG9jaXR5ID0gdGhpcy52ZWxvY2l0eTtcclxuICAgICAgICBjb25zdCB0ciA9IFtSSUdJRF9CT0RZX0FBQkJfQklBUywgUklHSURfQk9EWV9BQUJCX0JJQVMsIFJJR0lEX0JPRFlfQUFCQl9CSUFTXTtcclxuICAgICAgICBhYWJiLm1pbiA9IHYzLmRpZmYoYWFiYi5taW4sIHRyKTtcclxuICAgICAgICBhYWJiLm1heCA9IHYzLnN1bShhYWJiLm1heCwgdHIpO1xyXG4gICAgICAgIC8qaWYodmVsb2NpdHlbMF0gPiAxMCkgYWFiYi5tYXhbMF0gKz0gdmVsb2NpdHlbMF1cclxuICAgICAgICAgIGlmKHZlbG9jaXR5WzFdID4gMTApIGFhYmIubWF4WzFdICs9IHZlbG9jaXR5WzFdXHJcbiAgICAgICAgICBpZih2ZWxvY2l0eVsyXSA+IDEwKSBhYWJiLm1heFsyXSArPSB2ZWxvY2l0eVsyXVxyXG4gICAgICAgICAgaWYodmVsb2NpdHlbMF0gPCAtMTApIGFhYmIubWluWzBdICs9IHZlbG9jaXR5WzBdXHJcbiAgICAgICAgICBpZih2ZWxvY2l0eVsxXSA8IC0xMCkgYWFiYi5taW5bMV0gKz0gdmVsb2NpdHlbMV1cclxuICAgICAgICAgIGlmKHZlbG9jaXR5WzJdIDwgLTEwKSBhYWJiLm1pblsyXSArPSB2ZWxvY2l0eVsyXSovXHJcbiAgICAgICAgcmV0dXJuIGFhYmI7XHJcbiAgICB9XHJcbiAgICBvblVwZGF0ZShmdW5jKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudXBkYXRlRXZlbnRGdW5jdGlvbnMuaW5kZXhPZihmdW5jKSA+IC0xKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy51cGRhdGVFdmVudEZ1bmN0aW9ucy5wdXNoKGZ1bmMpO1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRXZlbnRGdW5jdGlvbnMuZmlsdGVyKGZuID0+IGZuICE9PSBmdW5jKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgZW1pdFVwZGF0ZSgpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50RnVuY3Rpb25zLmZvckVhY2goZm4gPT4ge1xyXG4gICAgICAgICAgICBmbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblJpZ2lkQm9keS5sYXN0SWQgPSAxO1xyXG5jbGFzcyBUZXJyYWluU2VnbWVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb2xsaWRlcikge1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXIgPSBjb2xsaWRlcjtcclxuICAgICAgICB0aGlzLmdyb3VwID0gbnVsbDtcclxuICAgICAgICB0aGlzLmZyaWN0aW9uID0gNTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50RnVuY3Rpb25zID0gW107XHJcbiAgICB9XHJcbiAgICBnZXRJZCgpIHtcclxuICAgICAgICByZXR1cm4gVGVycmFpblNlZ21lbnQuaWQ7XHJcbiAgICB9XHJcbiAgICBnZXRHcm91cCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ncm91cDtcclxuICAgIH1cclxuICAgIHNldEdyb3VwKGdyb3VwSWQpIHtcclxuICAgICAgICB0aGlzLmdyb3VwID0gZ3JvdXBJZDtcclxuICAgIH1cclxuICAgIGdldE1hc3MoKSB7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICB9XHJcbiAgICBnZXRJbnZlcnNlTWFzcygpIHtcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIH1cclxuICAgIGdldFRyYW5zbGF0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldENvbGxpZGVyKCkuZ2V0VHJhbnNsYXRpb24oKTtcclxuICAgIH1cclxuICAgIGdldENvbGxpZGVyKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbGxpZGVyO1xyXG4gICAgfVxyXG4gICAgaXNTdGF0aWMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBnZXRSb3RhdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRDb2xsaWRlcigpLmdldFJtYXRyaXgoKTtcclxuICAgIH1cclxuICAgIGdldFZlbG9jaXR5KCkge1xyXG4gICAgICAgIHJldHVybiBbMCwgMCwgMF07XHJcbiAgICB9XHJcbiAgICBnZXRBY2NlbGVyYXRpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIFswLCAwLCAwXTtcclxuICAgIH1cclxuICAgIGdldEFuZ3VsYXJWZWxvY2l0eSgpIHtcclxuICAgICAgICByZXR1cm4gWzAsIDAsIDBdO1xyXG4gICAgfVxyXG4gICAgZ2V0RnJpY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZnJpY3Rpb247XHJcbiAgICB9XHJcbiAgICBnZXRJbnZlcnNlSW5lcnRpYVRlbnNvcigpIHtcclxuICAgICAgICByZXR1cm4gbTMuaWRlbnRpdHkoKTtcclxuICAgIH1cclxuICAgIGdldEFBQkIoKSB7XHJcbiAgICAgICAgY29uc3QgYWFiYiA9IHRoaXMuY29sbGlkZXIuZ2V0QUFCQigpO1xyXG4gICAgICAgIGNvbnN0IHRyID0gW1JJR0lEX0JPRFlfQUFCQl9CSUFTLCBSSUdJRF9CT0RZX0FBQkJfQklBUywgUklHSURfQk9EWV9BQUJCX0JJQVNdO1xyXG4gICAgICAgIGFhYmIubWluID0gdjMuZGlmZihhYWJiLm1pbiwgdHIpO1xyXG4gICAgICAgIGFhYmIubWF4ID0gdjMuc3VtKGFhYmIubWF4LCB0cik7XHJcbiAgICAgICAgcmV0dXJuIGFhYmI7XHJcbiAgICB9XHJcbiAgICBhZGRWZWxvY2l0eSh2KSB7XHJcbiAgICB9XHJcbiAgICBhZGRBbmd1bGFyVmVsb2NpdHkodikge1xyXG4gICAgfVxyXG4gICAgYWRkQWNjZWxlcmF0aW9uKHYpIHtcclxuICAgIH1cclxuICAgIHRyYW5zbGF0ZSh0cmFuc2xhdGlvbikge1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXIudHJhbnNsYXRlKHRyYW5zbGF0aW9uKTtcclxuICAgICAgICB0aGlzLmVtaXRVcGRhdGUoKTtcclxuICAgIH1cclxuICAgIHJvdGF0ZShyb3RhdGlvbikge1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXIucm90YXRlKHJvdGF0aW9uKTtcclxuICAgICAgICB0aGlzLmVtaXRVcGRhdGUoKTtcclxuICAgIH1cclxuICAgIHNldElkKGlkKSB7XHJcbiAgICB9XHJcbiAgICBzZXRNYXNzKG1hc3MpIHtcclxuICAgIH1cclxuICAgIHNldEZyaWN0aW9uKGYpIHtcclxuICAgICAgICB0aGlzLmZyaWN0aW9uID0gZjtcclxuICAgIH1cclxuICAgIHNldFJvdGF0aW9uKHIpIHtcclxuICAgICAgICB0aGlzLmNvbGxpZGVyLnNldFJvdGF0aW9uKHIpO1xyXG4gICAgICAgIHRoaXMuZW1pdFVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgc2V0VHJhbnNsYXRpb24odCkge1xyXG4gICAgICAgIHRoaXMuZW1pdFVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgc2V0VmVsb2NpdHkodikge1xyXG4gICAgfVxyXG4gICAgc2V0QW5ndWxhclZlbG9jaXR5KHYpIHtcclxuICAgIH1cclxuICAgIHNldFN0YXRpYyhiKSB7XHJcbiAgICB9XHJcbiAgICBpbnRlZ3JhdGVSSzQoZHQpIHtcclxuICAgIH1cclxuICAgIGludGVncmF0ZVBzZXVkb1ZlbG9jaXRpZXMoZHQpIHtcclxuICAgIH1cclxuICAgIGFkZFBzZXVkb1ZlbG9jaXR5KHYpIHtcclxuICAgIH1cclxuICAgIGFkZFBzZXVkb0FuZ3VsYXJWKHYpIHtcclxuICAgIH1cclxuICAgIGludGVncmF0ZVZlbG9jaXRpZXMoZHQpIHtcclxuICAgIH1cclxuICAgIGludGVncmF0ZUZvcmNlcyhkdCkge1xyXG4gICAgfVxyXG4gICAgdXBkYXRlSW52ZXJzZUluZXJ0aWEoKSB7XHJcbiAgICB9XHJcbiAgICBhcHBseUltcHVsc2UoaW1wdWxzZSwgcG9pbnQpIHtcclxuICAgIH1cclxuICAgIGFwcGx5UHNldWRvSW1wdWxzZShpbXB1bHNlLCBwb2ludCkge1xyXG4gICAgfVxyXG4gICAgLypcclxuICAgIGFwcGx5QW5ndWxhckltcHVsc2UocmFkaXVzIDogbnVtYmVyLCBheGlzLCB2YWx1ZSkge1xyXG4gICAgICBjb25zdCBkaXIgPSBub3JtYWxpemUoW1xyXG4gICAgICAgIGF4aXNbMV0gKyBheGlzWzJdLFxyXG4gICAgICAgIGF4aXNbMl0gLSBheGlzWzBdLFxyXG4gICAgICAgIC1heGlzWzBdIC0gYXhpc1sxXSxcclxuICAgICAgXSk7XHJcbiAgICAgIGNvbnN0IHJhZCA9IHZlY3Rvci5jcm9zcyhkaXIsIGF4aXMpO1xyXG4gICAgICBjb25zdCBnbG9iYWxEaXIgPSBzY2FsZShkaXIsIHZhbHVlKTtcclxuICAgICAgY29uc3QgZ2xvYmFsUmFkID0gc2NhbGUocmFkLCByYWRpdXMpO1xyXG4gIFxyXG4gICAgICB0aGlzLmFwcGx5SW1wdWxzZShnbG9iYWxEaXIsIGdsb2JhbFJhZCk7XHJcbiAgICB9Ki9cclxuICAgIG9uVXBkYXRlKGZ1bmMpIHtcclxuICAgICAgICBpZiAodGhpcy51cGRhdGVFdmVudEZ1bmN0aW9ucy5pbmRleE9mKGZ1bmMpID4gLTEpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50RnVuY3Rpb25zLnB1c2goZnVuYyk7XHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVFdmVudEZ1bmN0aW9ucy5maWx0ZXIoZm4gPT4gZm4gIT09IGZ1bmMpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBlbWl0VXBkYXRlKCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlRXZlbnRGdW5jdGlvbnMuZm9yRWFjaChmbiA9PiB7XHJcbiAgICAgICAgICAgIGZuKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuVGVycmFpblNlZ21lbnQuaWQgPSAwO1xyXG4vKlxyXG5jbGFzcyBQbGF5ZXIgZXh0ZW5kcyBSaWdpZEJvZHkge1xyXG4gIGNvbnN0cnVjdG9yKGNvbGxpZGVyIDogSUNvbGxpZGVyKSB7XHJcbiAgICBzdXBlcihjb2xsaWRlcik7XHJcbiAgICB0aGlzLmZyaWN0aW9uID0gMC4zO1xyXG4gICAgXHJcbiAgfVxyXG4gIGFwcGx5SW1wdWxzZShpbXB1bHNlIDogdmVjMywgcG9pbnQgOiB2ZWMzKSB7XHJcbiAgICB0aGlzLnZlbG9jaXR5ID0gdjMuc3VtKHRoaXMudmVsb2NpdHksIHYzLnNjYWxlKGltcHVsc2UsIHRoaXMuaW52ZXJzZU1hc3MpKTtcclxuICB9XHJcbiAgYXBwbHlQc2V1ZG9JbXB1bHNlKGltcHVsc2UgOiB2ZWMzKSB7XHJcbiAgICB0aGlzLnBzZXVkb1ZlbG9jaXR5ID0gdjMuc3VtKFxyXG4gICAgICB0aGlzLnBzZXVkb1ZlbG9jaXR5LFxyXG4gICAgICB2My5zY2FsZShpbXB1bHNlLCB0aGlzLmludmVyc2VNYXNzKVxyXG4gICAgKTtcclxuICB9XHJcbiAgXHJcbiAgXHJcbn1cclxuKi9cclxuZXhwb3J0IHsgUmlnaWRCb2R5LCBUZXJyYWluU2VnbWVudCB9O1xyXG4iLCJpbXBvcnQgVHJlZSBmcm9tIFwiLi9UcmVlXCI7XHJcbi8vaW1wb3J0IHsgZ2V0Q29udGFjdHMgYXMgZ2prIH0gZnJvbSBcIi4vZ2prXCI7XHJcbmltcG9ydCBnamsgZnJvbSBcIi4vZ2V0Q29sbGlzaW9uRmVhdHVyZXNcIjtcclxuaW1wb3J0IENvbnRhY3RNYW5pZm9sZCBmcm9tIFwiLi9Db250YWN0TWFuaWZvbGRcIjtcclxuaW1wb3J0IFN5c3RlbSBmcm9tIFwiLi9TeXN0ZW1cIjtcclxuLy9pbXBvcnQgSVNwYXRpYWxDb250YWluZXIgZnJvbSBcIi4vbW9kZWxzL0lTcGF0aWFsQ29udGFpbmVyXCI7XHJcbmNvbnN0IHNhbWVHcm91cCA9IChib2R5MSwgYm9keTIpID0+IHtcclxuICAgIGlmICghYm9keTEuZ2V0R3JvdXAoKSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICBpZiAoIWJvZHkyLmdldEdyb3VwKCkpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgcmV0dXJuIGJvZHkxLmdldEdyb3VwKCkgPT09IGJvZHkyLmdldEdyb3VwKCk7XHJcbn07XHJcbmNvbnN0IHBhaXJIYXNoID0gKHgsIHkpID0+IHggPT09IE1hdGgubWF4KHgsIHkpID8geCAqIHggKyB4ICsgeSA6IHkgKiB5ICsgeCArIHk7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpbXVsYXRpb24ge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5keW5hbWljT2JqZWN0cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3N0YXRpY09iamVjdHMgPSBbXTtcclxuICAgICAgICB0aGlzLmR5bmFtaWNPYmplY3RzVHJlZSA9IG5ldyBUcmVlKCk7XHJcbiAgICAgICAgdGhpcy5zdGF0aWNPYmplY3RzVHJlZSA9IG5ldyBUcmVlKCk7XHJcbiAgICAgICAgdGhpcy5keW5hbWljT2JqZWN0c1RyZWUuc2V0S2V5KChyaWdpZEJvZHkpID0+IHJpZ2lkQm9keS5nZXRDb2xsaWRlcigpLmdldElkKCkpO1xyXG4gICAgICAgIHRoaXMuc3RhdGljT2JqZWN0c1RyZWUuc2V0S2V5KChyaWdpZEJvZHkpID0+IHJpZ2lkQm9keS5nZXRDb2xsaWRlcigpLmdldElkKCkpO1xyXG4gICAgICAgIHRoaXMuY29sbGlzaW9ucyA9IFtdO1xyXG4gICAgICAgIHRoaXMuY29uc3RyYWludHMgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgdGhpcy51c2VDYWNoZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jb250YWN0TWFuaWZvbGRzID0gbmV3IE1hcCgpO1xyXG4gICAgfVxyXG4gICAgZ2V0Q29udGFjdE1hbmlmb2xkKGlkMSwgaWQyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGFjdE1hbmlmb2xkcy5nZXQoaWQxID09PSBNYXRoLm1heChpZDEsIGlkMikgPyBpZDEgKiBpZDEgKyBpZDEgKyBpZDIgOiBpZDIgKiBpZDIgKyBpZDEgKyBpZDIpO1xyXG4gICAgfVxyXG4gICAgYWRkQ29udGFjdE1hbmlmb2xkKGlkMSwgaWQyLCBtYW5pZm9sZCkge1xyXG4gICAgICAgIHRoaXMuY29udGFjdE1hbmlmb2xkcy5zZXQoaWQxID09PSBNYXRoLm1heChpZDEsIGlkMikgPyBpZDEgKiBpZDEgKyBpZDEgKyBpZDIgOiBpZDIgKiBpZDIgKyBpZDEgKyBpZDIsIG1hbmlmb2xkKTtcclxuICAgIH1cclxuICAgIGFkZE9iamVjdChvYmplY3QpIHtcclxuICAgICAgICBjb25zdCB7IGR5bmFtaWNPYmplY3RzVHJlZSwgb2JqZWN0cywgc3RhdGljT2JqZWN0c1RyZWUgfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgYWFiYiA9IG9iamVjdC5nZXRBQUJCKCk7XHJcbiAgICAgICAgaWYgKG9iamVjdC5pc1N0YXRpYygpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0YXRpY09iamVjdHMucHVzaChvYmplY3QpO1xyXG4gICAgICAgICAgICBzdGF0aWNPYmplY3RzVHJlZS5pbnNlcnQob2JqZWN0KTtcclxuICAgICAgICAgICAgb2JqZWN0Lm9uVXBkYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHN0YXRpY09iamVjdHNUcmVlLnJlbW92ZShvYmplY3QuZ2V0Q29sbGlkZXIoKS5nZXRJZCgpKTtcclxuICAgICAgICAgICAgICAgIHN0YXRpY09iamVjdHNUcmVlLmluc2VydChvYmplY3QpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkeW5hbWljT2JqZWN0c1RyZWUuaW5zZXJ0KG9iamVjdCk7XHJcbiAgICAgICAgdGhpcy5keW5hbWljT2JqZWN0cy5wdXNoKG9iamVjdCk7XHJcbiAgICAgICAgb2JqZWN0Lm9uVXBkYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgZHluYW1pY09iamVjdHNUcmVlLnJlbW92ZShvYmplY3QuZ2V0Q29sbGlkZXIoKS5nZXRJZCgpKTtcclxuICAgICAgICAgICAgZHluYW1pY09iamVjdHNUcmVlLmluc2VydChvYmplY3QpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgYWRkQ29uc3RyYWludHMoY29uc3RyYWludHMsIG5hbWUpIHtcclxuICAgICAgICB0aGlzLmNvbnN0cmFpbnRzLnNldChuYW1lLCBbLi4uY29uc3RyYWludHNdKTtcclxuICAgIH1cclxuICAgIGFkZFBvc2l0aW9uQ29uc3RyYWludHMoY29uc3RyYWludHMsIG5hbWUpIHtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uQ29uc3RyYWludHMuc2V0KG5hbWUsIFsuLi5jb25zdHJhaW50c10pO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlT2JqZWN0KG9iamVjdCkge1xyXG4gICAgICAgIHRoaXMuZHluYW1pY09iamVjdHNUcmVlLnJlbW92ZShvYmplY3QuZ2V0Q29sbGlkZXIoKS5nZXRJZCgpKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZWNvbnRhY3RNYW5pZm9sZHMoKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBbaGFzaCwgbWFuaWZvbGRdIG9mIHRoaXMuY29udGFjdE1hbmlmb2xkcykge1xyXG4gICAgICAgICAgICBtYW5pZm9sZC51cGRhdGUoKTtcclxuICAgICAgICAgICAgaWYgKCFtYW5pZm9sZC5rZWVwKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWN0TWFuaWZvbGRzLmRlbGV0ZShoYXNoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB1cGRhdGVEeW5hbWljQ29sbGlzaW9ucygpIHtcclxuICAgICAgICBjb25zdCBjb2xsaXNpb25zID0gdGhpcy5keW5hbWljT2JqZWN0c1RyZWUuZ2V0Q29sbGlzaW9uc1BhaXJzKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSBjb2xsaXNpb25zLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBwYWlyID0gY29sbGlzaW9uc1tpXTtcclxuICAgICAgICAgICAgaWYgKHNhbWVHcm91cChwYWlyWzBdLCBwYWlyWzFdKSlcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBjb25zdCBoYXNoID0gcGFpckhhc2gocGFpclswXS5nZXRDb2xsaWRlcigpLmdldElkKCksIHBhaXJbMV0uZ2V0Q29sbGlkZXIoKS5nZXRJZCgpKTtcclxuICAgICAgICAgICAgbGV0IG1hbmlmb2xkID0gdGhpcy5jb250YWN0TWFuaWZvbGRzLmdldChoYXNoKTtcclxuICAgICAgICAgICAgaWYgKG1hbmlmb2xkKVxyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIGNvbnN0IGZlYXR1cmVzID0gZ2prKHBhaXJbMF0uZ2V0Q29sbGlkZXIoKSwgcGFpclsxXS5nZXRDb2xsaWRlcigpKTtcclxuICAgICAgICAgICAgaWYgKGZlYXR1cmVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFjdE1hbmlmb2xkcy5zZXQoaGFzaCwgQ29udGFjdE1hbmlmb2xkLmZyb21GZWF0dXJlc0FycmF5KHBhaXJbMF0sIHBhaXJbMV0sIGZlYXR1cmVzKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB1cGRhdGVDb2xsaXNpb25zKCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlY29udGFjdE1hbmlmb2xkcygpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlRHluYW1pY0NvbGxpc2lvbnMoKTtcclxuICAgICAgICB0aGlzLmR5bmFtaWNPYmplY3RzLmZvckVhY2goKGJvZHkxKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFhYmIgPSBib2R5MS5nZXRBQUJCKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbGxpc2lvbnMgPSB0aGlzLnN0YXRpY09iamVjdHNUcmVlLnF1ZXJ5KGFhYmIpO1xyXG4gICAgICAgICAgICAvL3RyZWUuZWxlbWVudHMuZ2V0KGJvZHkxLmdldENvbGxpZGVyKCkuZ2V0SWQoKSkuaXNDaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDAsIG4gPSBjb2xsaXNpb25zLmxlbmd0aDsgaiA8IG47IGorKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYm9keTIgPSBjb2xsaXNpb25zW2pdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJvZHkxID09PSBib2R5MilcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhhc2ggPSBwYWlySGFzaChib2R5MS5nZXRDb2xsaWRlcigpLmdldElkKCksIGJvZHkyLmdldENvbGxpZGVyKCkuZ2V0SWQoKSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWFuaWZvbGQgPSB0aGlzLmNvbnRhY3RNYW5pZm9sZHMuZ2V0KGhhc2gpO1xyXG4gICAgICAgICAgICAgICAgLy9pZiAobWFuaWZvbGQpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hbmlmb2xkKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmVhdHVyZXMgPSBnamsoYm9keTEuZ2V0Q29sbGlkZXIoKSwgYm9keTIuZ2V0Q29sbGlkZXIoKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZmVhdHVyZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGFjdE1hbmlmb2xkcy5zZXQoaGFzaCwgQ29udGFjdE1hbmlmb2xkLmZyb21GZWF0dXJlc0FycmF5KGJvZHkxLCBib2R5MiwgZmVhdHVyZXMpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZHluYW1pY09iamVjdHNUcmVlLnNldFVuY2hlY2tlZCgpO1xyXG4gICAgICAgIHRoaXMuc3RhdGljT2JqZWN0c1RyZWUuc2V0VW5jaGVja2VkKCk7XHJcbiAgICB9XHJcbiAgICB0aWNrKGR0KSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDb2xsaXNpb25zKCk7XHJcbiAgICAgICAgY29uc3QgeyBvYmplY3RzLCBjb250YWN0TWFuaWZvbGRzIH0gPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuZHluYW1pY09iamVjdHMuZm9yRWFjaCgoYm9keSkgPT4gYm9keS5pbnRlZ3JhdGVGb3JjZXMoZHQpKTtcclxuICAgICAgICBjb25zdCBzeXN0ZW0gPSBuZXcgU3lzdGVtKCk7XHJcbiAgICAgICAgc3lzdGVtLnVzZUNhY2hlID0gdGhpcy51c2VDYWNoZTtcclxuICAgICAgICBjb25zdCBmcmljdGlvblN5c3RlbSA9IG5ldyBTeXN0ZW0oZmFsc2UpO1xyXG4gICAgICAgIGNvbnN0IGNvbnRhY3RFcXVhdGlvbnMgPSBbXTtcclxuICAgICAgICBjb25zdCBmcmljdGlvbkVxdWF0aW9ucyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IFtrZXksIG1hbmlmb2xkXSBvZiBjb250YWN0TWFuaWZvbGRzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHVzZVZlbG9jaXR5QmlhcyA9IG1hbmlmb2xkLmNvbnRhY3RzLmxlbmd0aCA8IDI7XHJcbiAgICAgICAgICAgIG1hbmlmb2xkLmNvbnRhY3RzLmZvckVhY2goKGNvbnRhY3RDb25zdHJhaW50LCBfaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29udGFjdEVxdWF0aW9uID0gY29udGFjdENvbnN0cmFpbnQuZ2V0RXF1YXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IFtmRXF1YXRpb24xLCBmRXF1YXRpb24yXSA9IGNvbnRhY3RDb25zdHJhaW50LmdldEZyaWN0aW9uRXF1YXRpb25zKCk7XHJcbiAgICAgICAgICAgICAgICBjb250YWN0RXF1YXRpb25zLnB1c2goY29udGFjdEVxdWF0aW9uKTtcclxuICAgICAgICAgICAgICAgIGZyaWN0aW9uRXF1YXRpb25zLnB1c2goZkVxdWF0aW9uMSwgZkVxdWF0aW9uMik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzeXN0ZW0uYWRkRXF1YXRpb25zKGNvbnRhY3RFcXVhdGlvbnMpO1xyXG4gICAgICAgIGZvciAobGV0IFtuYW1lLCBjb25zdHJhaW50c10gb2YgdGhpcy5jb25zdHJhaW50cykge1xyXG4gICAgICAgICAgICBjb25zdCBlcXVhdGlvbnMgPSBbXTtcclxuICAgICAgICAgICAgY29uc3RyYWludHMuZm9yRWFjaCgoYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgYy51cGRhdGUoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVxdWF0aW9uID0gYy5nZXRFcXVhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgZXF1YXRpb25zLnB1c2goZXF1YXRpb24pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc3lzdGVtLmFkZEVxdWF0aW9ucyhlcXVhdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL3N5c3RlbS51cGRhdGVFcXVhdGlvbnMoZHQpO1xyXG4gICAgICAgIGZyaWN0aW9uU3lzdGVtLmFkZEVxdWF0aW9ucyhmcmljdGlvbkVxdWF0aW9ucyk7XHJcbiAgICAgICAgZnJpY3Rpb25TeXN0ZW0udXBkYXRlRXF1YXRpb25zKGR0KTtcclxuICAgICAgICBmcmljdGlvblN5c3RlbS5nZW5lcmF0ZVN5c3RlbShkdCk7XHJcbiAgICAgICAgZnJpY3Rpb25TeXN0ZW0uc29sdmVQR1MoZHQpO1xyXG4gICAgICAgIHN5c3RlbS51cGRhdGVFcXVhdGlvbnMoZHQpO1xyXG4gICAgICAgIHN5c3RlbS5nZW5lcmF0ZVN5c3RlbShkdCk7XHJcbiAgICAgICAgY29uc3QgbGFtYmRhID0gc3lzdGVtLnNvbHZlUEdTKGR0LCB0cnVlKTtcclxuICAgICAgICBjb25zdCBsZW4gPSBmcmljdGlvbkVxdWF0aW9ucy5sZW5ndGggLyAyO1xyXG4gICAgICAgIC8qZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgZnJpY3Rpb25FcXVhdGlvbnNbMiAqIGldLmxhbWJkYU1pbiAqPSBsYW1iZGFbaV07XHJcbiAgICAgICAgICBmcmljdGlvbkVxdWF0aW9uc1syICogaV0ubGFtYmRhTWF4ID0gbGFtYmRhW2ldO1xyXG4gICAgICAgICAgZnJpY3Rpb25FcXVhdGlvbnNbMiAqIGkgKyAxXS5sYW1iZGFNaW4gKj0gbGFtYmRhW2ldO1xyXG4gICAgICAgICAgZnJpY3Rpb25FcXVhdGlvbnNbMiAqIGkgKyAxXS5sYW1iZGFNYXggPSBsYW1iZGFbaV07XHJcbiAgICAgICAgfSovXHJcbiAgICAgICAgdGhpcy5keW5hbWljT2JqZWN0cy5mb3JFYWNoKChvYmplY3QpID0+IG9iamVjdC51cGRhdGVJbnZlcnNlSW5lcnRpYSgpKTtcclxuICAgICAgICB0aGlzLmR5bmFtaWNPYmplY3RzLmZvckVhY2goKG9iamVjdCkgPT4gb2JqZWN0LmludGVncmF0ZVZlbG9jaXRpZXMoZHQpKTtcclxuICAgICAgICBsZXQgbmR4ID0gMDtcclxuICAgICAgICAvKlxyXG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgbWFuaWZvbGRdIG9mIHRoaXMuY29udGFjdE1hbmlmb2xkcykge1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBtYW5pZm9sZC5jb250YWN0cy5mb3JFYWNoKChjKSA9PiB7XHJcbiAgICAgICAgICAgIGMucHJldkxhbWJkYSA9IGxhbWJkYVtuZHhdXHJcbiAgICAgICAgICAgIG5keCsrO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSovXHJcbiAgICAgICAgLypcclxuICAgICAgICBjb25zdCBwb3NpdGlvblN5c3RlbSA9IG5ldyBTeXN0ZW0oKTtcclxuICAgICAgICBjb25zdCBwb3NpdGlvbkNvbnN0cmFpbnRzID0gW107XHJcbiAgICBcclxuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIG1hbmlmb2xkXSBvZiBtYW5pZm9sZHMpIHtcclxuICAgICAgICAgIGNvbnN0IHsgY29udGFjdHMgfSA9IG1hbmlmb2xkO1xyXG4gICAgICAgICAgaWYgKGNvbnRhY3RzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgcG9zaXRpb25Db25zdHJhaW50cy5wdXNoKFxyXG4gICAgICAgICAgICAgIC4uLmNvbnRhY3RzLm1hcCgoYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qge1xyXG4gICAgICAgICAgICAgICAgICBib2R5MSxcclxuICAgICAgICAgICAgICAgICAgYm9keTIsXHJcbiAgICAgICAgICAgICAgICAgIHJhTG9jYWwsXHJcbiAgICAgICAgICAgICAgICAgIHJiTG9jYWwsXHJcbiAgICAgICAgICAgICAgICAgIHJhLFxyXG4gICAgICAgICAgICAgICAgICByYixcclxuICAgICAgICAgICAgICAgICAgaSxcclxuICAgICAgICAgICAgICAgICAgaixcclxuICAgICAgICAgICAgICAgICAgcGVuRGVwdGgsXHJcbiAgICAgICAgICAgICAgICAgIG4sXHJcbiAgICAgICAgICAgICAgICB9ID0gYztcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnN0cmFpbnQgPSBuZXcgUG9zaXRpb25Db25zdHJhaW50KFxyXG4gICAgICAgICAgICAgICAgICBib2R5MSxcclxuICAgICAgICAgICAgICAgICAgYm9keTIsXHJcbiAgICAgICAgICAgICAgICAgIG4sXHJcbiAgICAgICAgICAgICAgICAgIHJhLFxyXG4gICAgICAgICAgICAgICAgICByYixcclxuICAgICAgICAgICAgICAgICAgcmFMb2NhbCxcclxuICAgICAgICAgICAgICAgICAgcmJMb2NhbCxcclxuICAgICAgICAgICAgICAgICAgMC4xLFxyXG4gICAgICAgICAgICAgICAgICAwLjAwMDEsXHJcbiAgICAgICAgICAgICAgICAgIHBlbkRlcHRoXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uc3RyYWludDtcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwb3NpdGlvblN5c3RlbS5hZGRDb25zdHJhaW50KHBvc2l0aW9uQ29uc3RyYWludHMpO1xyXG4gICAgICAgIGZvciAobGV0IFtuYW1lLCBjb25zdHJhaW50c10gb2YgdGhpcy5wb3NpdGlvbkNvbnN0cmFpbnRzKSB7XHJcbiAgICAgICAgICBwb3NpdGlvblN5c3RlbS5hZGRDb25zdHJhaW50KGNvbnN0cmFpbnRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcG9zaXRpb25TeXN0ZW0udXBkYXRlRXF1YXRpb25zKGR0KTtcclxuICAgICAgICBwb3NpdGlvblN5c3RlbS5nZW5lcmF0ZVN5c3RlbShkdCk7XHJcbiAgICBcclxuICAgICAgICBwb3NpdGlvblN5c3RlbS5zb2x2ZVBHUyhkdCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSB0aGlzLm9iamVjdHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICB0aGlzLm9iamVjdHNbaV0uaW50ZWdyYXRlUHNldWRvVmVsb2NpdGllcyhkdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub2JqZWN0cy5mb3JFYWNoKChvYmplY3QpID0+IG9iamVjdC51cGRhdGVJbnZlcnNlSW5lcnRpYSgpKTsqL1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IHYzIH0gZnJvbSBcInJvbWFucHBwbWF0aFwiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQgRGVidWcgZnJvbSBcIi4vRGVidWdcIjtcclxubGV0IGFyciA9IFtdO1xyXG5sZXQgbyA9IDA7XHJcbmxldCBmID0gdHJ1ZTtcclxuY29uc3QgX2xvZyA9ICh2YWwpID0+IHtcclxuICAgIG8rKztcclxuICAgIGlmIChmKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYXJyKTtcclxuICAgICAgICBmID0gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKG8gPCAyMDAgJiYgbyAlIDEwID09IDApIHtcclxuICAgICAgICBhcnIucHVzaCh2YWwpO1xyXG4gICAgfVxyXG59O1xyXG5jb25zdCB7IFNPTFZFUl9JVEVSQVRJT05TX05VTSB9ID0gY29uZmlnO1xyXG5jb25zdCBudWxsVmVjID0gWzAsIDAsIDBdO1xyXG5jb25zdCB2NiA9IHtcclxuICAgIGRvdChhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIGFbMF0gKiBiWzBdICtcclxuICAgICAgICAgICAgYVsxXSAqIGJbMV0gK1xyXG4gICAgICAgICAgICBhWzJdICogYlsyXSArXHJcbiAgICAgICAgICAgIGFbM10gKiBiWzNdICtcclxuICAgICAgICAgICAgYVs0XSAqIGJbNF0gK1xyXG4gICAgICAgICAgICBhWzVdICogYls1XTtcclxuICAgIH0sXHJcbiAgICBzY2FsZShhLCBmYWMpIHtcclxuICAgICAgICByZXR1cm4gW2FbMF0gKiBmYWMsIGFbMV0gKiBmYWMsIGFbMl0gKiBmYWMsIGFbM10gKiBmYWMsIGFbNF0gKiBmYWMsIGFbNV0gKiBmYWNdO1xyXG4gICAgfSxcclxuICAgIHN1bShhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgYVswXSArIGJbMF0sXHJcbiAgICAgICAgICAgIGFbMV0gKyBiWzFdLFxyXG4gICAgICAgICAgICBhWzJdICsgYlsyXSxcclxuICAgICAgICAgICAgYVszXSArIGJbM10sXHJcbiAgICAgICAgICAgIGFbNF0gKyBiWzRdLFxyXG4gICAgICAgICAgICBhWzVdICsgYls1XVxyXG4gICAgICAgIF07XHJcbiAgICB9LFxyXG4gICAgZnJvbXYzKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gWy4uLmEsIC4uLmJdO1xyXG4gICAgfVxyXG59O1xyXG5jb25zdCBub3JtID0gKHYpID0+IE1hdGguc3FydCh2LnJlZHVjZSgoYWNjLCBlbCkgPT4gYWNjICs9IGVsICogZWwsIDApKTtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3lzdGVtIHtcclxuICAgIGNvbnN0cnVjdG9yKHVzZUNhY2hlID0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMuZXF1YXRpb25zID0gW107XHJcbiAgICAgICAgdGhpcy51c2VDYWNoZSA9IHVzZUNhY2hlO1xyXG4gICAgfVxyXG4gICAgYWRkRXF1YXRpb25zKGVxdWF0aW9ucykge1xyXG4gICAgICAgIHRoaXMuZXF1YXRpb25zLnB1c2goLi4uZXF1YXRpb25zKTtcclxuICAgIH1cclxuICAgIGdlbmVyYXRlQm9keU1hcHBpbmcoKSB7XHJcbiAgICAgICAgY29uc3QgZXF1YXRpb25zID0gdGhpcy5lcXVhdGlvbnM7XHJcbiAgICAgICAgY29uc3QgbiA9IGVxdWF0aW9ucy5sZW5ndGg7XHJcbiAgICAgICAgY29uc3QgYm9kaWVzTWFwID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIGNvbnN0IEptYXAgPSBbXTtcclxuICAgICAgICBsZXQgY291bnRlciA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgZXEgPSBlcXVhdGlvbnNbaV07XHJcbiAgICAgICAgICAgIGxldCBib2R5SW5kZXgxID0gYm9kaWVzTWFwLmdldChlcS5jb25zdHJhaW50LmJvZHkxLmdldElkKCkpO1xyXG4gICAgICAgICAgICBpZiAoYm9keUluZGV4MSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBib2R5SW5kZXgxID0gY291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgYm9kaWVzTWFwLnNldChlcS5jb25zdHJhaW50LmJvZHkxLmdldElkKCksIGJvZHlJbmRleDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBib2R5SW5kZXgyID0gYm9kaWVzTWFwLmdldChlcS5jb25zdHJhaW50LmJvZHkyLmdldElkKCkpO1xyXG4gICAgICAgICAgICBpZiAoYm9keUluZGV4MiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBib2R5SW5kZXgyID0gY291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgYm9kaWVzTWFwLnNldChlcS5jb25zdHJhaW50LmJvZHkyLmdldElkKCksIGJvZHlJbmRleDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEptYXAucHVzaChib2R5SW5kZXgxLCBib2R5SW5kZXgyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ib2RpZXNNYXAgPSBib2RpZXNNYXA7XHJcbiAgICAgICAgdGhpcy5KbWFwID0gSm1hcDtcclxuICAgIH1cclxuICAgIGdlbmVyYXRlU3lzdGVtKGRlbHRhVGltZSkge1xyXG4gICAgICAgIC8vTnVtZXJhdGluZyBib2RpZXNcclxuICAgICAgICB0aGlzLmdlbmVyYXRlQm9keU1hcHBpbmcoKTtcclxuICAgIH1cclxuICAgIC8vSiAqIFZlbFxyXG4gICAgc29sdmVQR1MoZGVsdGFUaW1lLCBsb2cgPSBmYWxzZSkge1xyXG4gICAgICAgIGNvbnN0IHsgSm1hcCwgYm9kaWVzTWFwLCBlcXVhdGlvbnMgfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgbnVtQm9kaWVzID0gYm9kaWVzTWFwLnNpemU7XHJcbiAgICAgICAgY29uc3QgbiA9IGVxdWF0aW9ucy5sZW5ndGg7XHJcbiAgICAgICAgY29uc3QgZCA9IFtdO1xyXG4gICAgICAgIGNvbnN0IGxhbWJkYTAgPSBuZXcgQXJyYXkobikuZmlsbCgwKTtcclxuICAgICAgICBjb25zdCBsYW1iZGEgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBsYW1iZGEwW2ldID0gZXF1YXRpb25zW2ldLnByZXZMYW1iZGE7XHJcbiAgICAgICAgICAgIGxhbWJkYVtpXSA9IGxhbWJkYTBbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IEJsID0gbmV3IEFycmF5KG51bUJvZGllcykuZmlsbChudWxsVmVjKTtcclxuICAgICAgICBjb25zdCBCMmwgPSBuZXcgQXJyYXkobnVtQm9kaWVzKS5maWxsKG51bGxWZWMpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGIxID0gSm1hcFtpICogMl07XHJcbiAgICAgICAgICAgIGNvbnN0IGIyID0gSm1hcFtpICogMiArIDFdO1xyXG4gICAgICAgICAgICBjb25zdCBlcSA9IGVxdWF0aW9uc1tpXTtcclxuICAgICAgICAgICAgY29uc3QgbCA9IGxhbWJkYTBbaV07XHJcbiAgICAgICAgICAgIC8qIEJsW2IxXSA9IHY2LnN1bSh2Ni5zY2FsZShcclxuICAgICAgICAgICAgICAgZXF1YXRpb25zW2ldLkJbMF0sXHJcbiAgICAgICAgICAgICAgIGxhbWJkYTBbaV0pLFxyXG4gICAgICAgICAgICAgICBCbFtiMV0pKi9cclxuICAgICAgICAgICAgaWYgKCFlcS5jb25zdHJhaW50LmJvZHkxLmlzU3RhdGljKCkpIHtcclxuICAgICAgICAgICAgICAgIEJsW2IxXSA9IHYzLnN1bSh2My5zY2FsZShlcS5KTTEsIGwpLCBCbFtiMV0pO1xyXG4gICAgICAgICAgICAgICAgQjJsW2IxXSA9IHYzLnN1bSh2My5zY2FsZShlcS5KTTIsIGwpLCBCMmxbYjFdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWVxLmNvbnN0cmFpbnQuYm9keTIuaXNTdGF0aWMoKSkge1xyXG4gICAgICAgICAgICAgICAgQmxbYjJdID0gdjMuc3VtKHYzLnNjYWxlKGVxLkpNMywgbCksIEJsW2IyXSk7XHJcbiAgICAgICAgICAgICAgICBCMmxbYjJdID0gdjMuc3VtKHYzLnNjYWxlKGVxLkpNNCwgbCksIEIybFtiMl0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8qQmxbYjJdID0gdjYuc3VtKHY2LnNjYWxlKFxyXG4gICAgICAgICAgICAgIGVxdWF0aW9uc1tpXS5CWzFdLFxyXG4gICAgICAgICAgICAgICBsYW1iZGEwW2ldKSxcclxuICAgICAgICAgICAgICAgIEJsW2IyXSkqL1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL1BHU1xyXG4gICAgICAgIGxldCBmbGFnID0gdHJ1ZTtcclxuICAgICAgICBsZXQgbnVtSXRlciA9IFNPTFZFUl9JVEVSQVRJT05TX05VTTtcclxuICAgICAgICBjb25zdCBkZWx0YUxhbWJkYSA9IG5ldyBBcnJheShuKTtcclxuICAgICAgICB3aGlsZSAobnVtSXRlciA+IDApIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVxID0gZXF1YXRpb25zW2ldO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zdCBKID0gZXEuX0pcclxuICAgICAgICAgICAgICAgIGNvbnN0IGIxID0gSm1hcFtpICogMl07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBiMiA9IEptYXBbaSAqIDIgKyAxXTtcclxuICAgICAgICAgICAgICAgIC8vZGVsdGFMYW1iZGFbaV0gPSAoZXEuYmlhcyAtIHY2LmRvdChKWzBdLCBCbFtiMV0pIC0gdjYuZG90KEpbMV0sIEJsW2IyXSkpIC8gZFtpXVxyXG4gICAgICAgICAgICAgICAgLy9kZWx0YUxhbWJkYVtpXSA9IChlcS5iaWFzIC0gdjMuZG90KGVxLkoxLCBCbFtiMV0pIC0gdjMuZG90KGVxLkoyLCBCMmxbYjFdKSAtIHYzLmRvdChlcS5KMywgQmxbYjJdKSAtIHYzLmRvdChlcS5KNCwgQjJsW2IyXSkpIC8gZXF1YXRpb25zW2ldLmVmZk1hc3NcclxuICAgICAgICAgICAgICAgIGRlbHRhTGFtYmRhW2ldID0gZXEuYmlhcztcclxuICAgICAgICAgICAgICAgIGlmICghZXEuY29uc3RyYWludC5ib2R5MS5pc1N0YXRpYygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsdGFMYW1iZGFbaV0gLT0gdjMuZG90KGVxLkoxLCBCbFtiMV0pICsgdjMuZG90KGVxLkoyLCBCMmxbYjFdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghZXEuY29uc3RyYWludC5ib2R5Mi5pc1N0YXRpYygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsdGFMYW1iZGFbaV0gLT0gdjMuZG90KGVxLkozLCBCbFtiMl0pICsgdjMuZG90KGVxLko0LCBCMmxbYjJdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRlbHRhTGFtYmRhW2ldIC89IGVxLmVmZk1hc3M7XHJcbiAgICAgICAgICAgICAgICBsYW1iZGEwW2ldID0gbGFtYmRhW2ldO1xyXG4gICAgICAgICAgICAgICAgbGFtYmRhW2ldID0gTWF0aC5tYXgoZXEubGFtYmRhTWluLCBNYXRoLm1pbihsYW1iZGEwW2ldICsgZGVsdGFMYW1iZGFbaV0sIGVxLmxhbWJkYU1heCkpO1xyXG4gICAgICAgICAgICAgICAgZGVsdGFMYW1iZGFbaV0gPSBsYW1iZGFbaV0gLSBsYW1iZGEwW2ldO1xyXG4gICAgICAgICAgICAgICAgLy9CbFtiMV0gPSB2Ni5zdW0oQmxbYjFdLCB2Ni5zY2FsZShlcS5CWzBdLCBkZWx0YUxhbWJkYVtpXSkpXHJcbiAgICAgICAgICAgICAgICBCbFtiMV0gPSB2My5zdW0odjMuc2NhbGUoZXEuSk0xLCBkZWx0YUxhbWJkYVtpXSksIEJsW2IxXSk7XHJcbiAgICAgICAgICAgICAgICBCMmxbYjFdID0gdjMuc3VtKHYzLnNjYWxlKGVxLkpNMiwgZGVsdGFMYW1iZGFbaV0pLCBCMmxbYjFdKTtcclxuICAgICAgICAgICAgICAgIC8vIEJsW2IyXSA9IHY2LnN1bShCbFtiMl0sIHY2LnNjYWxlKGVxLkJbMV0sIGRlbHRhTGFtYmRhW2ldKSlcclxuICAgICAgICAgICAgICAgIEJsW2IyXSA9IHYzLnN1bSh2My5zY2FsZShlcS5KTTMsIGRlbHRhTGFtYmRhW2ldKSwgQmxbYjJdKTtcclxuICAgICAgICAgICAgICAgIEIybFtiMl0gPSB2My5zdW0odjMuc2NhbGUoZXEuSk00LCBkZWx0YUxhbWJkYVtpXSksIEIybFtiMl0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG51bUl0ZXItLTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxvZylcclxuICAgICAgICAgICAgRGVidWcuZGF0YS5TT0xWRVJfRVJST1IgPSBub3JtKGRlbHRhTGFtYmRhKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBlcXVhdGlvbnNbaV0uYXBwbHlJbXB1bHNlKGxhbWJkYVtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsYW1iZGE7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVFcXVhdGlvbnMoZGVsdGFUaW1lKSB7XHJcbiAgICAgICAgY29uc3QgeyBlcXVhdGlvbnMgfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgbiA9IGVxdWF0aW9ucy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgZXF1YXRpb25zW2ldLnVwZGF0ZUxlZnRQYXJ0KGRlbHRhVGltZSk7XHJcbiAgICAgICAgICAgIGVxdWF0aW9uc1tpXS51cGRhdGVSaWdodFBhcnQoZGVsdGFUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBhcHBseVJlc29sdmluZ0ltcHVsc2VzKGxhbWJkYSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gdGhpcy5lcXVhdGlvbnMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXF1YXRpb25zW2ldLmFwcGx5SW1wdWxzZShsYW1iZGFbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGFwcGx5UmVzb2x2aW5nUHNldWRvSW1wdWxzZXMobGFtYmRhKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSB0aGlzLmVxdWF0aW9ucy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5lcXVhdGlvbnNbaV0uYXBwbHlQc2V1ZG9JbXB1bHNlKGxhbWJkYVtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblN5c3RlbS51c2VDYWNoZSA9IHRydWU7XHJcbiIsImltcG9ydCBBQUJCIGZyb20gXCIuL0FBQkJcIjtcclxuY29uc3QgZ2V0Qm91bmRBYWJiID0gKGFhYmIxLCBhYWJiMikgPT4ge1xyXG4gICAgY29uc3QgeDEgPSBhYWJiMS5taW5bMF0gPCBhYWJiMi5taW5bMF0gPyBhYWJiMS5taW5bMF0gOiBhYWJiMi5taW5bMF07XHJcbiAgICBjb25zdCB4MiA9IGFhYmIxLm1heFswXSA+IGFhYmIyLm1heFswXSA/IGFhYmIxLm1heFswXSA6IGFhYmIyLm1heFswXTtcclxuICAgIGNvbnN0IHkxID0gYWFiYjEubWluWzFdIDwgYWFiYjIubWluWzFdID8gYWFiYjEubWluWzFdIDogYWFiYjIubWluWzFdO1xyXG4gICAgY29uc3QgeTIgPSBhYWJiMS5tYXhbMV0gPiBhYWJiMi5tYXhbMV0gPyBhYWJiMS5tYXhbMV0gOiBhYWJiMi5tYXhbMV07XHJcbiAgICBjb25zdCB6MSA9IGFhYmIxLm1pblsyXSA8IGFhYmIyLm1pblsyXSA/IGFhYmIxLm1pblsyXSA6IGFhYmIyLm1pblsyXTtcclxuICAgIGNvbnN0IHoyID0gYWFiYjEubWF4WzJdID4gYWFiYjIubWF4WzJdID8gYWFiYjEubWF4WzJdIDogYWFiYjIubWF4WzJdO1xyXG4gICAgcmV0dXJuIG5ldyBBQUJCKFt4MSwgeTEsIHoxXSwgW3gyLCB5MiwgejJdKTtcclxufTtcclxuY29uc3QgaXNDb2xsaWRlID0gKGFhYmIxLCBhYWJiMikgPT4ge1xyXG4gICAgaWYgKGFhYmIxLm1pblswXSA8PSBhYWJiMi5tYXhbMF0gJiZcclxuICAgICAgICBhYWJiMS5tYXhbMF0gPj0gYWFiYjIubWluWzBdICYmXHJcbiAgICAgICAgYWFiYjEubWluWzFdIDw9IGFhYmIyLm1heFsxXSAmJlxyXG4gICAgICAgIGFhYmIxLm1heFsxXSA+PSBhYWJiMi5taW5bMV0gJiZcclxuICAgICAgICBhYWJiMS5taW5bMl0gPD0gYWFiYjIubWF4WzJdICYmXHJcbiAgICAgICAgYWFiYjEubWF4WzJdID49IGFhYmIyLm1pblsyXSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5jb25zdCBnZXRTaXplID0gKGFhYmIpID0+IHtcclxuICAgIGNvbnN0IGFyZWEgPSBNYXRoLmFicyhhYWJiLm1heFswXSAtIGFhYmIubWluWzBdKSAqXHJcbiAgICAgICAgTWF0aC5hYnMoYWFiYi5tYXhbMV0gLSBhYWJiLm1pblsxXSkgKlxyXG4gICAgICAgIE1hdGguYWJzKGFhYmIubWF4WzJdIC0gYWFiYi5taW5bMl0pO1xyXG4gICAgcmV0dXJuIGFyZWE7XHJcbn07XHJcbmNsYXNzIE5vZGUge1xyXG4gICAgY29uc3RydWN0b3IoYWFiYiwgaXNMZWFmLCBvYmplY3QsIGlkKSB7XHJcbiAgICAgICAgdGhpcy5hYWJiID0gYWFiYjtcclxuICAgICAgICB0aGlzLmlzTGVhZiA9IGlzTGVhZjtcclxuICAgICAgICB0aGlzLnBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMubGVmdCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5yaWdodCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5pc0NoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm9iamVjdCA9IG9iamVjdDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IDA7XHJcbiAgICAgICAgdGhpcy5xdWVyeUlkID0gMDtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcmVlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMucm9vdCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50cyA9IG5ldyBNYXAoKTtcclxuICAgICAgICB0aGlzLnF1ZXJ5SWQgPSAwO1xyXG4gICAgICAgIHRoaXMuZ2V0SWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY29sbGlzaW9ucyA9IFtdO1xyXG4gICAgfVxyXG4gICAgc2V0S2V5KGYpIHtcclxuICAgICAgICB0aGlzLmdldElkID0gZjtcclxuICAgIH1cclxuICAgIHVwZGF0ZVF1ZXJ5SWQoKSB7XHJcbiAgICAgICAgdGhpcy5xdWVyeUlkKys7XHJcbiAgICB9XHJcbiAgICBzZXRVbmNoZWNrZWQoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnJvb3QpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBjb25zdCBzdGFjayA9IFt0aGlzLnJvb3RdO1xyXG4gICAgICAgIHdoaWxlIChzdGFjay5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICBjb25zdCBub2RlID0gc3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgIG5vZGUuaXNDaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChub2RlLmlzTGVhZikge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5vZGUubGVmdClcclxuICAgICAgICAgICAgICAgIHN0YWNrLnB1c2gobm9kZS5sZWZ0KTtcclxuICAgICAgICAgICAgaWYgKG5vZGUucmlnaHQpXHJcbiAgICAgICAgICAgICAgICBzdGFjay5wdXNoKG5vZGUucmlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldEJlc3RTaWJsaW5nKGxlYWYpIHtcclxuICAgICAgICBsZXQgcG90ZW50aWFsID0gdGhpcy5yb290O1xyXG4gICAgICAgIHdoaWxlICghcG90ZW50aWFsLmlzTGVhZikge1xyXG4gICAgICAgICAgICBwb3RlbnRpYWwuaGVpZ2h0Kys7XHJcbiAgICAgICAgICAgIGNvbnN0IHNpemUgPSBwb3RlbnRpYWwuYWFiYi5nZXRTaXplKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbWJpbmVkQUFCQiA9IHBvdGVudGlhbC5hYWJiLm1lcmdlKGxlYWYuYWFiYik7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbWJpbmVkU2l6ZSA9IGNvbWJpbmVkQUFCQi5nZXRTaXplKCk7XHJcbiAgICAgICAgICAgIGxldCBjb3N0ID0gY29tYmluZWRTaXplO1xyXG4gICAgICAgICAgICBsZXQgaW5oZXJDb3N0ID0gY29tYmluZWRTaXplIC0gc2l6ZTtcclxuICAgICAgICAgICAgbGV0IGNvc3QxO1xyXG4gICAgICAgICAgICBpZiAocG90ZW50aWFsLmxlZnQuaXNMZWFmKSB7XHJcbiAgICAgICAgICAgICAgICBjb3N0MSA9IHBvdGVudGlhbC5sZWZ0LmFhYmIuZ2V0U2l6ZSgpICsgaW5oZXJDb3N0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29zdDEgPVxyXG4gICAgICAgICAgICAgICAgICAgIGxlYWYuYWFiYi5tZXJnZShwb3RlbnRpYWwubGVmdC5hYWJiKS5nZXRTaXplKCkgLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3RlbnRpYWwubGVmdC5hYWJiLmdldFNpemUoKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaGVyQ29zdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgY29zdDI7XHJcbiAgICAgICAgICAgIGlmIChwb3RlbnRpYWwucmlnaHQuaXNMZWFmKSB7XHJcbiAgICAgICAgICAgICAgICBjb3N0MiA9IHBvdGVudGlhbC5yaWdodC5hYWJiLmdldFNpemUoKSArIGluaGVyQ29zdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvc3QyID1cclxuICAgICAgICAgICAgICAgICAgICBsZWFmLmFhYmIubWVyZ2UocG90ZW50aWFsLnJpZ2h0LmFhYmIpLmdldFNpemUoKSAtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvdGVudGlhbC5yaWdodC5hYWJiLmdldFNpemUoKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaGVyQ29zdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY29zdCA8IGNvc3QxICYmIGNvc3QgPCBjb3N0MilcclxuICAgICAgICAgICAgICAgIHJldHVybiBwb3RlbnRpYWw7XHJcbiAgICAgICAgICAgIGlmIChjb3N0MSA8IGNvc3QyKSB7XHJcbiAgICAgICAgICAgICAgICBwb3RlbnRpYWwgPSBwb3RlbnRpYWwubGVmdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBwb3RlbnRpYWwgPSBwb3RlbnRpYWwucmlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwb3RlbnRpYWw7XHJcbiAgICB9XHJcbiAgICBpbnNlcnQob2JqZWN0KSB7XHJcbiAgICAgICAgY29uc3QgYWFiYiA9IG9iamVjdC5nZXRBQUJCKCk7XHJcbiAgICAgICAgY29uc3QgaWQgPSB0aGlzLmdldElkKG9iamVjdCk7XHJcbiAgICAgICAgY29uc3QgbGVhZiA9IG5ldyBOb2RlKGFhYmIsIHRydWUsIG9iamVjdCwgaWQpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudHMuc2V0KGlkLCBsZWFmKTtcclxuICAgICAgICBpZiAodGhpcy5yb290ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm9vdCA9IGxlYWY7XHJcbiAgICAgICAgICAgIHRoaXMucm9vdC5oZWlnaHQgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLnJvb3QucGFyZW50ID0gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuIGxlYWY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHNpYmxpbmcgPSB0aGlzLmdldEJlc3RTaWJsaW5nKGxlYWYpO1xyXG4gICAgICAgIGNvbnN0IG9sZFBhcmVudCA9IHNpYmxpbmcucGFyZW50O1xyXG4gICAgICAgIGNvbnN0IG5ld1BhcmVudCA9IG5ldyBOb2RlKG51bGwsIGZhbHNlLCBudWxsLCBudWxsKTtcclxuICAgICAgICBuZXdQYXJlbnQucGFyZW50ID0gb2xkUGFyZW50O1xyXG4gICAgICAgIG5ld1BhcmVudC5hYWJiID0gbGVhZi5hYWJiLm1lcmdlKHNpYmxpbmcuYWFiYik7XHJcbiAgICAgICAgbmV3UGFyZW50LmhlaWdodCA9IHNpYmxpbmcuaGVpZ2h0ICsgMTtcclxuICAgICAgICBpZiAob2xkUGFyZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChvbGRQYXJlbnQubGVmdCA9PT0gc2libGluZylcclxuICAgICAgICAgICAgICAgIG9sZFBhcmVudC5sZWZ0ID0gbmV3UGFyZW50O1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBvbGRQYXJlbnQucmlnaHQgPSBuZXdQYXJlbnQ7XHJcbiAgICAgICAgICAgIG5ld1BhcmVudC5sZWZ0ID0gc2libGluZztcclxuICAgICAgICAgICAgbmV3UGFyZW50LnJpZ2h0ID0gbGVhZjtcclxuICAgICAgICAgICAgc2libGluZy5wYXJlbnQgPSBuZXdQYXJlbnQ7XHJcbiAgICAgICAgICAgIGxlYWYucGFyZW50ID0gbmV3UGFyZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbmV3UGFyZW50LmxlZnQgPSBzaWJsaW5nO1xyXG4gICAgICAgICAgICBuZXdQYXJlbnQucmlnaHQgPSBsZWFmO1xyXG4gICAgICAgICAgICBzaWJsaW5nLnBhcmVudCA9IG5ld1BhcmVudDtcclxuICAgICAgICAgICAgbGVhZi5wYXJlbnQgPSBuZXdQYXJlbnQ7XHJcbiAgICAgICAgICAgIHRoaXMucm9vdCA9IG5ld1BhcmVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IF9ub2RlID0gbGVhZi5wYXJlbnQ7XHJcbiAgICAgICAgd2hpbGUgKF9ub2RlKSB7XHJcbiAgICAgICAgICAgIF9ub2RlID0gdGhpcy5iYWxhbmNlKF9ub2RlKTtcclxuICAgICAgICAgICAgX25vZGUuaGVpZ2h0ID0gMSArIE1hdGgubWF4KF9ub2RlLmxlZnQuaGVpZ2h0LCBfbm9kZS5yaWdodC5oZWlnaHQpO1xyXG4gICAgICAgICAgICBfbm9kZSA9IF9ub2RlLnBhcmVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxlYWY7XHJcbiAgICB9XHJcbiAgICBiYWxhbmNlKG5vZGUpIHtcclxuICAgICAgICBpZiAoIW5vZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChub2RlLmlzTGVhZiB8fCBub2RlLmhlaWdodCA8IDIpIHtcclxuICAgICAgICAgICAgbm9kZS5hYWJiID0gbm9kZS5sZWZ0LmFhYmIubWVyZ2Uobm9kZS5yaWdodC5hYWJiKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGxlZnQgPSBub2RlLmxlZnQ7XHJcbiAgICAgICAgY29uc3QgcmlnaHQgPSBub2RlLnJpZ2h0O1xyXG4gICAgICAgIGNvbnN0IGJhbGFuY2UgPSBub2RlLnJpZ2h0LmhlaWdodCAtIG5vZGUubGVmdC5oZWlnaHQ7XHJcbiAgICAgICAgaWYgKGJhbGFuY2UgPiAxKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJpZ2h0bGVmdCA9IHJpZ2h0LmxlZnQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHJpZ2h0cmlnaHQgPSByaWdodC5yaWdodDtcclxuICAgICAgICAgICAgcmlnaHQubGVmdCA9IG5vZGU7XHJcbiAgICAgICAgICAgIHJpZ2h0LnBhcmVudCA9IG5vZGUucGFyZW50O1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHJpZ2h0O1xyXG4gICAgICAgICAgICBpZiAocmlnaHQucGFyZW50ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyaWdodC5wYXJlbnQubGVmdCA9PT0gbm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0LnBhcmVudC5sZWZ0ID0gcmlnaHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByaWdodC5wYXJlbnQucmlnaHQgPSByaWdodDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3QgPSByaWdodDtcclxuICAgICAgICAgICAgaWYgKHJpZ2h0LmxlZnQuaGVpZ2h0ID4gcmlnaHRyaWdodC5oZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIHJpZ2h0LnJpZ2h0ID0gcmlnaHRsZWZ0O1xyXG4gICAgICAgICAgICAgICAgbm9kZS5yaWdodCA9IHJpZ2h0cmlnaHQ7XHJcbiAgICAgICAgICAgICAgICByaWdodHJpZ2h0LnBhcmVudCA9IG5vZGU7XHJcbiAgICAgICAgICAgICAgICBub2RlLmhlaWdodCA9IDEgKyBNYXRoLm1heChsZWZ0LmhlaWdodCwgcmlnaHRyaWdodC5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgcmlnaHQuaGVpZ2h0ID0gMSArIE1hdGgubWF4KG5vZGUuaGVpZ2h0LCByaWdodGxlZnQuaGVpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5vZGUucmlnaHQgPSByaWdodGxlZnQ7XHJcbiAgICAgICAgICAgICAgICByaWdodGxlZnQucGFyZW50ID0gbm9kZTtcclxuICAgICAgICAgICAgICAgIG5vZGUuaGVpZ2h0ID0gMSArIE1hdGgubWF4KGxlZnQuaGVpZ2h0LCByaWdodGxlZnQuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIHJpZ2h0LmhlaWdodCA9IDEgKyBNYXRoLm1heChub2RlLmhlaWdodCwgcmlnaHRyaWdodC5oZWlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5vZGUuYWFiYiA9IG5vZGUubGVmdC5hYWJiLm1lcmdlKG5vZGUucmlnaHQuYWFiYik7XHJcbiAgICAgICAgICAgIHJpZ2h0LmFhYmIgPSByaWdodC5sZWZ0LmFhYmIubWVyZ2UocmlnaHQucmlnaHQuYWFiYik7XHJcbiAgICAgICAgICAgIHJldHVybiByaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJhbGFuY2UgPCAtMSkge1xyXG4gICAgICAgICAgICBjb25zdCBsZWZ0bGVmdCA9IGxlZnQubGVmdDtcclxuICAgICAgICAgICAgY29uc3QgbGVmdHJpZ2h0ID0gbGVmdC5yaWdodDtcclxuICAgICAgICAgICAgbGVmdC5sZWZ0ID0gbm9kZTtcclxuICAgICAgICAgICAgbGVmdC5wYXJlbnQgPSBub2RlLnBhcmVudDtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBsZWZ0O1xyXG4gICAgICAgICAgICBpZiAobGVmdC5wYXJlbnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxlZnQucGFyZW50LmxlZnQgPT09IG5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0LnBhcmVudC5sZWZ0ID0gbGVmdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQucGFyZW50LnJpZ2h0ID0gbGVmdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3QgPSBsZWZ0O1xyXG4gICAgICAgICAgICBpZiAobGVmdGxlZnQuaGVpZ2h0ID4gbGVmdHJpZ2h0LmhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgbGVmdC5yaWdodCA9IGxlZnRsZWZ0O1xyXG4gICAgICAgICAgICAgICAgbm9kZS5sZWZ0ID0gbGVmdHJpZ2h0O1xyXG4gICAgICAgICAgICAgICAgbGVmdHJpZ2h0LnBhcmVudCA9IG5vZGU7XHJcbiAgICAgICAgICAgICAgICBub2RlLmhlaWdodCA9IDEgKyBNYXRoLm1heChyaWdodC5oZWlnaHQsIGxlZnRyaWdodC5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgbGVmdC5oZWlnaHQgPSAxICsgTWF0aC5tYXgobm9kZS5oZWlnaHQsIGxlZnRsZWZ0LmhlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZWZ0LnJpZ2h0ID0gbGVmdHJpZ2h0O1xyXG4gICAgICAgICAgICAgICAgbm9kZS5sZWZ0ID0gbGVmdGxlZnQ7XHJcbiAgICAgICAgICAgICAgICBsZWZ0bGVmdC5wYXJlbnQgPSBub2RlO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5oZWlnaHQgPSAxICsgTWF0aC5tYXgocmlnaHQuaGVpZ2h0LCBsZWZ0bGVmdC5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgbGVmdC5oZWlnaHQgPSAxICsgTWF0aC5tYXgobm9kZS5oZWlnaHQsIGxlZnRyaWdodC5oZWlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5vZGUuYWFiYiA9IG5vZGUubGVmdC5hYWJiLm1lcmdlKG5vZGUucmlnaHQuYWFiYik7XHJcbiAgICAgICAgICAgIGxlZnQuYWFiYiA9IGxlZnQubGVmdC5hYWJiLm1lcmdlKGxlZnQucmlnaHQuYWFiYik7XHJcbiAgICAgICAgICAgIHJldHVybiBsZWZ0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBub2RlLmFhYmIgPSBub2RlLmxlZnQuYWFiYi5tZXJnZShub2RlLnJpZ2h0LmFhYmIpO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG4gICAgcXVlcnkoYWFiYiwgY29scyA9IFtdKSB7XHJcbiAgICAgICAgLy9jb25zdCBhYWJiID0gb2JqZWN0LmdldEFBQkIoKTtcclxuICAgICAgICAvLyB0aGlzLmVsZW1lbnRzLmdldCh0aGlzLmdldElkKG9iamVjdCkpLnF1ZXJ5SWQgPSB0aGlzLnF1ZXJ5SWRcclxuICAgICAgICBjb25zdCBpdGVyID0gKF9ub2RlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghX25vZGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvKiBpZiAoX25vZGUub2JqZWN0ID09PSBvYmplY3QpIHtcclxuICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0qL1xyXG4gICAgICAgICAgICBpZiAoYWFiYi5pc0NvbGxpZGUoX25vZGUuYWFiYikpIHtcclxuICAgICAgICAgICAgICAgIGlmIChfbm9kZS5pc0xlYWYgJiYgIV9ub2RlLmlzQ2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHMucHVzaChfbm9kZS5vYmplY3QpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaXRlcihfbm9kZS5sZWZ0KTtcclxuICAgICAgICAgICAgICAgIGl0ZXIoX25vZGUucmlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpdGVyKHRoaXMucm9vdCk7XHJcbiAgICAgICAgcmV0dXJuIGNvbHM7XHJcbiAgICB9XHJcbiAgICBwaWNrKHBvaW50LCBjb2xzID0gW10pIHtcclxuICAgICAgICBjb25zdCBpdGVyID0gKF9ub2RlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghX25vZGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvKiBpZiAoX25vZGUub2JqZWN0ID09PSBvYmplY3QpIHtcclxuICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0qL1xyXG4gICAgICAgICAgICBpZiAoX25vZGUuYWFiYi5jb250YWluKHBvaW50KSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKF9ub2RlLmlzTGVhZiAmJiAhX25vZGUuaXNDaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29scy5wdXNoKF9ub2RlLm9iamVjdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpdGVyKF9ub2RlLmxlZnQpO1xyXG4gICAgICAgICAgICAgICAgaXRlcihfbm9kZS5yaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGl0ZXIodGhpcy5yb290KTtcclxuICAgICAgICByZXR1cm4gY29scztcclxuICAgIH1cclxuICAgIHJlbW92ZShpZCkge1xyXG4gICAgICAgIGNvbnN0IGxlYWYgPSB0aGlzLmVsZW1lbnRzLmdldChpZCk7XHJcbiAgICAgICAgaWYgKCFsZWFmKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYgKGxlYWYgPT09IHRoaXMucm9vdCkge1xyXG4gICAgICAgICAgICB0aGlzLnJvb3QgPSBudWxsO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHBhcmVudCA9IGxlYWYucGFyZW50O1xyXG4gICAgICAgIGNvbnN0IGdyYW5kUGFyZW50ID0gcGFyZW50LnBhcmVudDtcclxuICAgICAgICBsZXQgc2libGluZztcclxuICAgICAgICBpZiAocGFyZW50LmxlZnQgPT09IGxlYWYpXHJcbiAgICAgICAgICAgIHNpYmxpbmcgPSBwYXJlbnQucmlnaHQ7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBzaWJsaW5nID0gcGFyZW50LmxlZnQ7XHJcbiAgICAgICAgaWYgKGdyYW5kUGFyZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChncmFuZFBhcmVudC5sZWZ0ID09PSBwYXJlbnQpXHJcbiAgICAgICAgICAgICAgICBncmFuZFBhcmVudC5sZWZ0ID0gc2libGluZztcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgZ3JhbmRQYXJlbnQucmlnaHQgPSBzaWJsaW5nO1xyXG4gICAgICAgICAgICBzaWJsaW5nLnBhcmVudCA9IGdyYW5kUGFyZW50O1xyXG4gICAgICAgICAgICBsZXQgX25vZGUgPSBncmFuZFBhcmVudDtcclxuICAgICAgICAgICAgd2hpbGUgKF9ub2RlKSB7XHJcbiAgICAgICAgICAgICAgICBfbm9kZSA9IHRoaXMuYmFsYW5jZShfbm9kZSk7XHJcbiAgICAgICAgICAgICAgICBfbm9kZS5oZWlnaHQgPSAxICsgTWF0aC5tYXgoX25vZGUucmlnaHQuaGVpZ2h0LCBfbm9kZS5sZWZ0LmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBfbm9kZSA9IF9ub2RlLnBhcmVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yb290ID0gc2libGluZztcclxuICAgICAgICAgICAgc2libGluZy5wYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVsZW1lbnRzLmRlbGV0ZShpZCk7XHJcbiAgICB9XHJcbiAgICB0b0FycmF5KG5vZGUpIHtcclxuICAgICAgICBjb25zdCBpdGVyID0gKGxlYWYpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFsZWFmKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobGVhZi5pc0xlYWYpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGVhZi5pZDtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtpdGVyKGxlYWYubGVmdCksIGl0ZXIobGVhZi5yaWdodCldO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKCFub2RlKVxyXG4gICAgICAgICAgICBub2RlID0gdGhpcy5yb290O1xyXG4gICAgICAgIHJldHVybiBpdGVyKG5vZGUpO1xyXG4gICAgfVxyXG4gICAgZ2V0Q29sbGlzaW9uc1BhaXJzKCkge1xyXG4gICAgICAgIHRoaXMuY29sbGlzaW9ucyA9IFtdO1xyXG4gICAgICAgIGlmICghdGhpcy5yb290IHx8IHRoaXMucm9vdC5pc0xlYWYpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbGxpc2lvbnM7XHJcbiAgICAgICAgdGhpcy5zZXRVbmNoZWNrZWQoKTtcclxuICAgICAgICB0aGlzLl9nZXRDb2xsaXNpb25zSGVscGVyKHRoaXMucm9vdC5sZWZ0LCB0aGlzLnJvb3QucmlnaHQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbGxpc2lvbnM7XHJcbiAgICB9XHJcbiAgICBfZ2V0Q29sbGlzaW9uc0hlbHBlcihub2RlMSwgbm9kZTIpIHtcclxuICAgICAgICBpZiAobm9kZTEuaXNMZWFmKSB7XHJcbiAgICAgICAgICAgIGlmIChub2RlMi5pc0xlYWYpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpc0NvbGxpZGUobm9kZTEuYWFiYiwgbm9kZTIuYWFiYikpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbGxpc2lvbnMucHVzaChbbm9kZTEub2JqZWN0LCBub2RlMi5vYmplY3RdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3Jvc3NDaGlsZHJlbihub2RlMik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9nZXRDb2xsaXNpb25zSGVscGVyKG5vZGUxLCBub2RlMi5yaWdodCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9nZXRDb2xsaXNpb25zSGVscGVyKG5vZGUxLCBub2RlMi5sZWZ0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKG5vZGUyLmlzTGVhZikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcm9zc0NoaWxkcmVuKG5vZGUxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2dldENvbGxpc2lvbnNIZWxwZXIobm9kZTEucmlnaHQsIG5vZGUyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2dldENvbGxpc2lvbnNIZWxwZXIobm9kZTEubGVmdCwgbm9kZTIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcm9zc0NoaWxkcmVuKG5vZGUxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3Jvc3NDaGlsZHJlbihub2RlMik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9nZXRDb2xsaXNpb25zSGVscGVyKG5vZGUxLnJpZ2h0LCBub2RlMi5yaWdodCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9nZXRDb2xsaXNpb25zSGVscGVyKG5vZGUxLmxlZnQsIG5vZGUyLmxlZnQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2V0Q29sbGlzaW9uc0hlbHBlcihub2RlMS5yaWdodCwgbm9kZTIubGVmdCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9nZXRDb2xsaXNpb25zSGVscGVyKG5vZGUxLmxlZnQsIG5vZGUyLnJpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNyb3NzQ2hpbGRyZW4obm9kZSkge1xyXG4gICAgICAgIGlmICghbm9kZS5pc0NoZWNrZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fZ2V0Q29sbGlzaW9uc0hlbHBlcihub2RlLnJpZ2h0LCBub2RlLmxlZnQpO1xyXG4gICAgICAgICAgICBub2RlLmlzQ2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImNvbnN0IGlzSW5zaWRlID0gKHAxLCBwMiwgcSkgPT4ge1xyXG4gICAgY29uc3QgUiA9IChwMlswXSAtIHAxWzBdKSAqIChxWzFdIC0gcDFbMV0pIC0gKHAyWzFdIC0gcDFbMV0pICogKHFbMF0gLSBwMVswXSk7XHJcbiAgICByZXR1cm4gUiA8PSAwICsgMC4wMDE7XHJcbn07XHJcbmNvbnN0IGRvdCA9IChhLCBiKSA9PiBhWzBdICogYlswXSArIGFbMV0gKiBiWzFdO1xyXG4vKlxyXG5jb25zdCBpc0luQ2xvY2t3aXNlID0gKHBvaW50cyA6IEFycmF5PHZlYzI+KSA9PiB7XHJcbiAgaWYgKHBvaW50cy5sZW5ndGggPCAzKSByZXR1cm4gMTtcclxuICBjb25zdCBbcDEsIHAyLCBwM10gPSBwb2ludHM7XHJcbiAgY29uc3QgZGV0ID1cclxuICAgIHAyWzBdICogcDNbMV0gK1xyXG4gICAgcDNbMF0gKiBwMVsxXSArXHJcbiAgICBwMVswXSAqIHAyWzFdIC1cclxuICAgIHAxWzBdICogcDFbMV0gLVxyXG4gICAgcDNbMF0gKiBwMlsxXSAtXHJcbiAgICBwMVswXSAqIHAzWzFdO1xyXG5cclxuICBpZiAoZGV0IDw9IDApIHJldHVybiAxO1xyXG4gIHJldHVybiAtMTtcclxufTtcclxuKi9cclxuZnVuY3Rpb24gaXNJbkNsb2Nrd2lzZShwb2x5KSB7XHJcbiAgICBpZiAocG9seS5sZW5ndGggPCAzKVxyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgbGV0IGVuZCA9IHBvbHkubGVuZ3RoIC0gMTtcclxuICAgIGxldCBzdW0gPSBwb2x5W2VuZF1bMF0gKiBwb2x5WzBdWzFdIC0gcG9seVswXVswXSAqIHBvbHlbZW5kXVsxXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZW5kOyArK2kpIHtcclxuICAgICAgICBjb25zdCBuID0gaSArIDE7XHJcbiAgICAgICAgc3VtICs9IHBvbHlbaV1bMF0gKiBwb2x5W25dWzFdIC0gcG9seVtuXVswXSAqIHBvbHlbaV1bMV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3VtID4gMDtcclxufVxyXG5jb25zdCBjb21wdXRlSW50ZXJzZWN0aW9uID0gKHAxLCBwMiwgcDMsIHA0KSA9PiB7XHJcbiAgICBpZiAocDJbMF0gLSBwMVswXSA9PT0gMCkge1xyXG4gICAgICAgIGNvbnN0IHggPSBwMVswXTtcclxuICAgICAgICBjb25zdCBtMiA9IChwNFsxXSAtIHAzWzFdKSAvIChwNFswXSAtIHAzWzBdKTtcclxuICAgICAgICBjb25zdCBiMiA9IHAzWzFdIC0gbTIgKiBwM1swXTtcclxuICAgICAgICBjb25zdCB5ID0gbTIgKiB4ICsgYjI7XHJcbiAgICAgICAgcmV0dXJuIFt4LCB5XTtcclxuICAgIH1cclxuICAgIGlmIChwNFswXSAtIHAzWzBdID09PSAwKSB7XHJcbiAgICAgICAgY29uc3QgeCA9IHAzWzBdO1xyXG4gICAgICAgIGNvbnN0IG0xID0gKHAyWzFdIC0gcDFbMV0pIC8gKHAyWzBdIC0gcDFbMF0pO1xyXG4gICAgICAgIGNvbnN0IGIxID0gcDFbMV0gLSBtMSAqIHAxWzBdO1xyXG4gICAgICAgIGNvbnN0IHkgPSBtMSAqIHggKyBiMTtcclxuICAgICAgICByZXR1cm4gW3gsIHldO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbTEgPSAocDJbMV0gLSBwMVsxXSkgLyAocDJbMF0gLSBwMVswXSk7XHJcbiAgICBjb25zdCBiMSA9IHAxWzFdIC0gbTEgKiBwMVswXTtcclxuICAgIGNvbnN0IG0yID0gKHA0WzFdIC0gcDNbMV0pIC8gKHA0WzBdIC0gcDNbMF0pO1xyXG4gICAgY29uc3QgYjIgPSBwM1sxXSAtIG0yICogcDNbMF07XHJcbiAgICBjb25zdCB4ID0gKGIyIC0gYjEpIC8gKG0xIC0gbTIpO1xyXG4gICAgY29uc3QgeSA9IG0xICogeCArIGIxO1xyXG4gICAgcmV0dXJuIFt4LCB5XTtcclxufTtcclxuY29uc3QgY2xpcFBvbHlWc1BvbHkgPSAoQSwgQikgPT4ge1xyXG4gICAgbGV0IHJlc3VsdCA9IFsuLi5BXTtcclxuICAgIGZvciAobGV0IGkgPSAwLCBuID0gQi5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICBjb25zdCBuZXh0ID0gWy4uLnJlc3VsdF07XHJcbiAgICAgICAgcmVzdWx0ID0gW107XHJcbiAgICAgICAgY29uc3QgYUVkZ2UxID0gQi5hdChpIC0gMSk7XHJcbiAgICAgICAgY29uc3QgYUVkZ2UyID0gQi5hdChpKTtcclxuICAgICAgICBmb3IgKGxldCBqID0gMCwgX24gPSBuZXh0Lmxlbmd0aDsgaiA8IF9uOyBqKyspIHtcclxuICAgICAgICAgICAgY29uc3QgYkVkZ2UxID0gbmV4dC5hdChqIC0gMSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGJFZGdlMiA9IG5leHQuYXQoaik7XHJcbiAgICAgICAgICAgIGlmIChpc0luc2lkZShhRWRnZTEsIGFFZGdlMiwgYkVkZ2UyKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc0luc2lkZShhRWRnZTEsIGFFZGdlMiwgYkVkZ2UxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGludGVyc2VjdGlvbiA9IGNvbXB1dGVJbnRlcnNlY3Rpb24oYkVkZ2UxLCBiRWRnZTIsIGFFZGdlMSwgYUVkZ2UyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChpbnRlcnNlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goYkVkZ2UyKTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpc0luc2lkZShhRWRnZTEsIGFFZGdlMiwgYkVkZ2UxKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW50ZXJzZWN0aW9uID0gY29tcHV0ZUludGVyc2VjdGlvbihiRWRnZTEsIGJFZGdlMiwgYUVkZ2UxLCBhRWRnZTIpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goaW50ZXJzZWN0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcbmNvbnN0IGxlcnAgPSAoYSwgYiwgdCkgPT4gYSArIChiIC0gYSkgKiB0O1xyXG5jb25zdCBjbGlwU2VnbWVudFZzU2VnbWVudCA9IChzMSwgczIpID0+IHtcclxuICAgIGNvbnN0IFtwMSwgcDJdID0gczE7XHJcbiAgICBjb25zdCBbcDMsIHA0XSA9IHMyO1xyXG4gICAgY29uc3QgdG9wID0gKHA0WzBdIC0gcDNbMF0pICogKHAxWzFdIC0gcDNbMV0pIC0gKHA0WzFdIC0gcDNbMV0pICogKHAxWzBdIC0gcDNbMF0pO1xyXG4gICAgY29uc3QgYm90dG9tID0gKHA0WzFdIC0gcDNbMV0pICogKHAyWzBdIC0gcDFbMF0pIC0gKHA0WzBdIC0gcDNbMF0pICogKHAyWzFdIC0gcDFbMV0pO1xyXG4gICAgaWYgKCFib3R0b20pXHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgY29uc3QgdCA9IHRvcCAvIGJvdHRvbTtcclxuICAgIGlmICh0IDwgMCB8fCB0ID4gMSlcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICByZXR1cm4gW1tsZXJwKHAxWzBdLCBwMlswXSwgdCksIGxlcnAocDFbMV0sIHAyWzFdLCB0KV1dO1xyXG59O1xyXG5jb25zdCBjbGlwUG9pbnRWc1BvbHkgPSAocG9pbnQsIHZlcnRpY2VzKSA9PiB7XHJcbiAgICBjb25zdCB4ID0gcG9pbnRbMF07XHJcbiAgICBjb25zdCB5ID0gcG9pbnRbMV07XHJcbiAgICBsZXQgaW5zaWRlID0gZmFsc2U7XHJcbiAgICBmb3IgKGxldCBpID0gMCwgaiA9IHZlcnRpY2VzLmxlbmd0aCAtIDE7IGkgPCB2ZXJ0aWNlcy5sZW5ndGg7IGogPSBpKyspIHtcclxuICAgICAgICBjb25zdCB4aSA9IHZlcnRpY2VzW2ldWzBdLCB5aSA9IHZlcnRpY2VzW2ldWzFdO1xyXG4gICAgICAgIGNvbnN0IHhqID0gdmVydGljZXNbal1bMF0sIHlqID0gdmVydGljZXNbal1bMV07XHJcbiAgICAgICAgY29uc3QgaW50ZXJzZWN0ID0geWkgPiB5ICE9IHlqID4geSAmJiB4IDwgKCh4aiAtIHhpKSAqICh5IC0geWkpKSAvICh5aiAtIHlpKSArIHhpO1xyXG4gICAgICAgIGlmIChpbnRlcnNlY3QpXHJcbiAgICAgICAgICAgIGluc2lkZSA9ICFpbnNpZGU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW3BvaW50XTtcclxufTtcclxuY29uc3QgY2xpcFNlZ21lbnRWc1BvbHkgPSAoc2VnbWVudCwgcG9seSkgPT4ge1xyXG4gICAgY29uc3QgW3AxLCBwMl0gPSBzZWdtZW50O1xyXG4gICAgY29uc3QgcG9pbnRzID0gW107XHJcbiAgICBpZiAoY2xpcFBvaW50VnNQb2x5KHAxLCBwb2x5KSlcclxuICAgICAgICBwb2ludHMucHVzaChwMSk7XHJcbiAgICBpZiAoY2xpcFBvaW50VnNQb2x5KHAyLCBwb2x5KSlcclxuICAgICAgICBwb2ludHMucHVzaChwMik7XHJcbiAgICBpZiAocG9pbnRzLmxlbmd0aCA+IDEpXHJcbiAgICAgICAgcmV0dXJuIHBvaW50cztcclxuICAgIGZvciAobGV0IGkgPSAwLCBuID0gcG9seS5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICBjb25zdCBxMSA9IHBvbHkuYXQoaSAtIDEpO1xyXG4gICAgICAgIGNvbnN0IHEyID0gcG9seS5hdChpKTtcclxuICAgICAgICBjb25zdCBpbnRlcnNlY3Rpb24gPSBjbGlwU2VnbWVudFZzU2VnbWVudChbcDEsIHAyXSwgW3ExLCBxMl0pO1xyXG4gICAgICAgIGlmIChpbnRlcnNlY3Rpb24ubGVuZ3RoID4gMClcclxuICAgICAgICAgICAgcG9pbnRzLnB1c2goaW50ZXJzZWN0aW9uWzBdKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwb2ludHM7XHJcbn07XHJcbmNvbnN0IHBhaXJIYXNoID0gKHgsIHkpID0+IHggPT09IE1hdGgubWF4KHgsIHkpID8geCAqIHggKyB5ICsgeCA6IHkgKiB4ICsgeTtcclxuY29uc3QgUE9MWSA9IDM7XHJcbmNvbnN0IFNFR01FTlQgPSAyO1xyXG5jb25zdCBQT0lOVCA9IDE7XHJcbmNvbnN0IGZhY2VUeXBlTWFwID0ge307XHJcbmZhY2VUeXBlTWFwW3BhaXJIYXNoKFBPTFksIFBPTFkpXSA9IGNsaXBQb2x5VnNQb2x5O1xyXG5mYWNlVHlwZU1hcFtwYWlySGFzaChTRUdNRU5ULCBQT0xZKV0gPSBjbGlwU2VnbWVudFZzUG9seTtcclxuZmFjZVR5cGVNYXBbcGFpckhhc2goU0VHTUVOVCwgU0VHTUVOVCldID0gY2xpcFNlZ21lbnRWc1NlZ21lbnQ7XHJcbmZhY2VUeXBlTWFwW3BhaXJIYXNoKFBPSU5ULCBQT0xZKV0gPSAoZmFjZTEsIGZhY2UyKSA9PiBjbGlwUG9pbnRWc1BvbHkoZmFjZTFbMF0sIGZhY2UyKTtcclxuZnVuY3Rpb24gY2xpcEZhY2VWc0ZhY2UoZmFjZTEsIGZhY2UyKSB7XHJcbiAgICBjb25zdCB0eXBlMSA9IE1hdGgubWluKGZhY2UxLmxlbmd0aCwgUE9MWSk7XHJcbiAgICBjb25zdCB0eXBlMiA9IE1hdGgubWluKGZhY2UyLmxlbmd0aCwgUE9MWSk7XHJcbiAgICBsZXQgYXJncyA9IFtmYWNlMSwgZmFjZTJdO1xyXG4gICAgaWYgKHR5cGUxID4gdHlwZTIpIHtcclxuICAgICAgICByZXR1cm4gZmFjZVR5cGVNYXBbcGFpckhhc2godHlwZTIsIHR5cGUxKV0oYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMF0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhY2VUeXBlTWFwW3BhaXJIYXNoKHR5cGUxLCB0eXBlMildKGFyZ3VtZW50c1swXSwgYXJndW1lbnRzWzFdKTtcclxufVxyXG5leHBvcnQgeyBjbGlwU2VnbWVudFZzU2VnbWVudCwgaXNJbnNpZGUsIGNvbXB1dGVJbnRlcnNlY3Rpb24sIGNsaXBQb2x5VnNQb2x5LCBjbGlwRmFjZVZzRmFjZSwgaXNJbkNsb2Nrd2lzZSwgY2xpcFNlZ21lbnRWc1BvbHksIGNsaXBQb2ludFZzUG9seSwgfTtcclxuIiwiY29uc3QgY29uZmlnID0ge1xyXG4gICAgUklHSURfQk9EWV9NT1ZFX1RSRVNIT0xEOiAwLjAwNSxcclxuICAgIFJJR0lEX0JPRFlfQUFCQl9CSUFTOiAwLjExLFxyXG4gICAgQ0xJUF9CSUFTOiAwLjAwMSxcclxuICAgIEdKS19NQVhfSVRFUkFUSU9OU19OVU06IDY0LFxyXG4gICAgRVBBX0JJQVM6IDAuMDAwMDEsXHJcbiAgICBDT05UQUNUX0JJQVM6IDAuMTI1LFxyXG4gICAgQ09OVEFDVF9UUkVTSE9MRDogMC4wNSxcclxuICAgIENPTlRBQ1RfTUFOSUZPTERfS0VFUF9UUkVTSE9MRDogMC4wMDEsXHJcbiAgICBTT0xWRVJfSVRFUkFUSU9OU19OVU06IDE4LFxyXG4gICAgVVNFX0NPTlRBQ1RfQ0FDSEU6IGZhbHNlXHJcbn07XHJcbndpbmRvdy5jb25maWcgPSBjb25maWc7XHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcclxuIiwiaW1wb3J0IHsgdjMsIG0zIH0gZnJvbSBcInJvbWFucHBwbWF0aFwiO1xyXG5pbXBvcnQgeyBFUEEsIGdqayB9IGZyb20gXCIuL2dqa1wiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBjbGlwRmFjZVZzRmFjZSwgaXNJbkNsb2Nrd2lzZSB9IGZyb20gXCIuL2NsaXBwaW5nXCI7XHJcbmltcG9ydCB7IGNvbGxpZGVyVHlwZXMgfSBmcm9tIFwiLi9Db2xsaWRlclwiO1xyXG4vKiAvL0ZvciBkZWJ1ZyFcclxuY29uc3QgZHJhd1BvbHlzID0gKF9wMSxfcDIpID0+e1xyXG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXMyXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xyXG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgIFxyXG4gICAgY29uc3QgcDEgPSBfcDEubWFwKGVsID0+IFsxMDAgKyBlbFswXSAqIDEwLCAxMDAgKyBlbFsxXSoxMF0pXHJcbiAgICBjb25zdCBwMiA9IF9wMi5tYXAoZWwgPT4gWzEwMCArIGVsWzBdICogMTAsIDEwMCArIGVsWzFdKjEwXSlcclxuXHJcbiAgICBcclxuICAgIGNvbnN0IGRpcjEgPSBpc0luQ2xvY2t3aXNlKF9wMSk7XHJcbiAgICBjb25zdCBkaXIyID0gaXNJbkNsb2Nrd2lzZShfcDIpO1xyXG4gICAgY29uc29sZS5sb2coX3AxLCBkaXIxLCBfcDIsIGRpcjIpXHJcbiAgICBjb25zb2xlLmxvZyhjbGlwRmFjZVZzRmFjZShfcDEsIF9wMikpO1xyXG5cclxuICAgIGN0eC5iZWdpblBhdGgoKTsgLy8gU3RhcnQgYSBuZXcgcGF0aFxyXG4gICAgY3R4Lm1vdmVUbyhwMVswXVswXSwgcDFbMF1bMV0pOyAvLyBNb3ZlIHRoZSBwZW4gdG8gKDMwLCA1MClcclxuICAgIFxyXG4gICAgXHJcbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgcDEubGVuZ3RoOyBpKyspIGN0eC5saW5lVG8ocDFbaV1bMF0sIHAxW2ldWzFdKVxyXG4gICAvL2N0eC5saW5lVG8ocDFbMF1bMF0sIHAxWzBdWzFdKVxyXG4gICAgY3R4LnN0cm9rZSgpOyAvLyBSZW5kZXIgdGhlIHBhdGhcclxuICAgIFxyXG4gICAgY3R4Lm1vdmVUbyhwMlswXVswXSwgcDJbMF1bMV0pOyAvLyBNb3ZlIHRoZSBwZW4gdG8gKDMwLCA1MClcclxuICAgIFxyXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwicmdiKDI1NSwgMTY1LCAwKVwiO1xyXG4gICAgXHJcbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgcDIubGVuZ3RoOyBpKyspIGN0eC5saW5lVG8ocDJbaV1bMF0sIHAyW2ldWzFdKVxyXG4gICAgLy9jdHgubGluZVRvKHAyWzBdWzBdLCBwMlswXVsxXSlcclxuICAgIGN0eC5zdHJva2UoKTsgLy8gUmVuZGVyIHRoZSBwYXRoXHJcbiAgICBcclxufVxyXG4qL1xyXG5jb25zdCByYXlWc1BsYW5lSW50ZXJzZWMgPSAocGxhbmUsIHBvaW50LCBkaXJlY3Rpb24pID0+IHtcclxuICAgIGNvbnN0IFtvcmlnaW4sIG5vcm1hbF0gPSBwbGFuZTtcclxuICAgIGNvbnN0IF9kb3QgPSB2My5kb3Qobm9ybWFsLCBkaXJlY3Rpb24pO1xyXG4gICAgY29uc3QgZnJvbVBvaW50VG9PcmlnaW4gPSB2My5kaWZmKHBvaW50LCBvcmlnaW4pO1xyXG4gICAgY29uc3QgZmFjID0gdjMuZG90KGZyb21Qb2ludFRvT3JpZ2luLCBub3JtYWwpIC8gX2RvdDtcclxuICAgIHJldHVybiB2My5kaWZmKHBvaW50LCB2My5zY2FsZShkaXJlY3Rpb24sIGZhYykpO1xyXG59O1xyXG5jb25zdCBpc1BvaW50QmVoaW5kUGxhbmUgPSAob3JpZ2luLCBub3JtYWwsIHBvaW50LCBzaWduID0gMSkgPT4ge1xyXG4gICAgLy9jb25zdCBbb3JpZ2luLCBub3JtYWxdID0gcGxhbmU7XHJcbiAgICBsZXQgX2QgPSB2My5kb3Qobm9ybWFsLCB2My5kaWZmKHBvaW50LCBvcmlnaW4pKSAqIHNpZ247XHJcbiAgICByZXR1cm4gX2QgPiAwIC0gY29uZmlnLkNMSVBfQklBUztcclxufTtcclxuY29uc3QgcG9pbnRPblBsYW5lUHJvamVjdGlvbiA9IChvcmlnaW4sIG5vcm1hbCwgcG9pbnQpID0+IHtcclxuICAgIC8vY29uc3QgW29yaWdpbiwgbm9ybWFsXSA9IHBsYW5lO1xyXG4gICAgY29uc3QgZnJvbVBvaW50VG9PcmlnaW4gPSB2My5kaWZmKHBvaW50LCBvcmlnaW4pO1xyXG4gICAgY29uc3QgcHJvakFsb25nTm9ybWFsID0gdjMuZG90KG5vcm1hbCwgZnJvbVBvaW50VG9PcmlnaW4pO1xyXG4gICAgcmV0dXJuIHYzLmRpZmYocG9pbnQsIHYzLnNjYWxlKG5vcm1hbCwgcHJvakFsb25nTm9ybWFsKSk7XHJcbn07XHJcbmNvbnN0IGNsaXBQb2ludHNCZWhpbmRQbGFuZSA9IChwbGFuZSwgcG9pbnRzLCBzaWduID0gMSkgPT4ge1xyXG4gICAgY29uc3QgW29yaWdpbiwgbm9ybWFsXSA9IHBsYW5lO1xyXG4gICAgcmV0dXJuIHBvaW50cy5maWx0ZXIoKHBvaW50KSA9PiB2My5kb3Qobm9ybWFsLCB2My5kaWZmKHBvaW50LCBvcmlnaW4pKSAqIHNpZ24gKyBjb25maWcuQ0xJUF9CSUFTID4gMCk7XHJcbn07XHJcbmNvbnN0IGdldDJEY29vcmRzT25QbGFuZSA9IChpLCBqLCBwb2ludCkgPT4ge1xyXG4gICAgcmV0dXJuIFt2My5kb3QoaSwgcG9pbnQpLCB2My5kb3QoaiwgcG9pbnQpXTtcclxufTtcclxuY29uc3QgdHJpYW5nbGVWc0NvbGxpZGVyID0gKHRyaWFuZ2xlLCBjb2xsaWRlcikgPT4ge1xyXG4gICAgY29uc3QgY29udGFjdEZhY2UxID0gW107XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldENvbGxpc2lvbkZlYXR1cmVzKGNvbGwxLCBjb2xsMikge1xyXG4gICAgY29uc3QgY29sbGlzaW9uU2ltcGxleCA9IGdqayhjb2xsMSwgY29sbDIpO1xyXG4gICAgaWYgKCFjb2xsaXNpb25TaW1wbGV4KVxyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIGxldCBjb250YWN0RmFjZTEgPSBudWxsO1xyXG4gICAgbGV0IGNvbnRhY3RGYWNlMiA9IG51bGw7XHJcbiAgICBsZXQgbiA9IG51bGw7XHJcbiAgICBsZXQgcG9zaXRpb25FcnJvciA9IG51bGw7XHJcbiAgICBpZiAoY29sbDEuZ2V0VHlwZSgpID09PSBjb2xsaWRlclR5cGVzLlRyaWFuZ2xlKSB7XHJcbiAgICAgICAgbiA9IHYzLnNjYWxlKGNvbnRhY3RGYWNlMS5ub3JtYWwsIC0xKTtcclxuICAgIH1cclxuICAgIGlmIChjb2xsMi5nZXRUeXBlKCkgPT09IGNvbGxpZGVyVHlwZXMuVHJpYW5nbGUpIHtcclxuICAgICAgICBuID0gY29udGFjdEZhY2UyLm5vcm1hbDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhY3REYXRhID0gRVBBKGNvbGxpc2lvblNpbXBsZXguYSwgY29sbGlzaW9uU2ltcGxleC5iLCBjb2xsaXNpb25TaW1wbGV4LmMsIGNvbGxpc2lvblNpbXBsZXguZCwgY29sbGlzaW9uU2ltcGxleC5vcmlnaW5zTWFwLCBjb2xsaXNpb25TaW1wbGV4LmNvbGwxLCBjb2xsaXNpb25TaW1wbGV4LmNvbGwyKTtcclxuICAgICAgICBpZiAoIWNvbnRhY3REYXRhKVxyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgbiA9IGNvbnRhY3REYXRhLm47XHJcbiAgICAgICAgcG9zaXRpb25FcnJvciA9IGNvbnRhY3REYXRhLnBvc2l0aW9uRXJyb3I7XHJcbiAgICB9XHJcbiAgICBpZiAoY29sbDEuZ2V0VHlwZSgpID09PSBjb2xsaWRlclR5cGVzLlNwaGVyZSkge1xyXG4gICAgICAgIGNvbnN0IFBBID0gY29sbDEuc3VwcG9ydCh2My5zY2FsZShuLCAtMSkpO1xyXG4gICAgICAgIGNvbnN0IFBCID0gdjMuc3VtKFBBLCB2My5zY2FsZShuLCBwb3NpdGlvbkVycm9yKSk7XHJcbiAgICAgICAgY29uc3QgcmIgPSB2My5kaWZmKFBCLCBjb2xsMi5nZXRUcmFuc2xhdGlvbigpKTtcclxuICAgICAgICBjb25zdCByYSA9IHYzLmRpZmYoUEEsIGNvbGwxLmdldFRyYW5zbGF0aW9uKCkpO1xyXG4gICAgICAgIGNvbnN0IHJhTG9jYWwgPSBtMy50cmFuc2Zvcm1Qb2ludChjb2xsMS5nZXRSbWF0cml4SW52ZXJzZSgpLCByYSk7XHJcbiAgICAgICAgY29uc3QgcmJMb2NhbCA9IG0zLnRyYW5zZm9ybVBvaW50KGNvbGwyLmdldFJtYXRyaXhJbnZlcnNlKCksIHJiKTtcclxuICAgICAgICBjb25zdCBpID0gW25bMV0gKyBuWzJdLCBuWzJdIC0gblswXSwgLW5bMF0gLSBuWzFdXTtcclxuICAgICAgICBjb25zdCBqID0gdjMuY3Jvc3ModjMuc2NhbGUobiwgLTEpLCBpKTtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByYSxcclxuICAgICAgICAgICAgICAgIHJiLFxyXG4gICAgICAgICAgICAgICAgbixcclxuICAgICAgICAgICAgICAgIFBBLFxyXG4gICAgICAgICAgICAgICAgUEIsXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbkVycm9yLFxyXG4gICAgICAgICAgICAgICAgaSxcclxuICAgICAgICAgICAgICAgIGosXHJcbiAgICAgICAgICAgICAgICByYUxvY2FsLFxyXG4gICAgICAgICAgICAgICAgcmJMb2NhbCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG4gICAgaWYgKGNvbGwyLmdldFR5cGUoKSA9PT0gY29sbGlkZXJUeXBlcy5TcGhlcmUpIHtcclxuICAgICAgICBjb25zdCBQQiA9IGNvbGwxLnN1cHBvcnQobik7XHJcbiAgICAgICAgY29uc3QgUEEgPSB2My5zdW0oUEIsIHYzLnNjYWxlKG4sIC1wb3NpdGlvbkVycm9yKSk7XHJcbiAgICAgICAgY29uc3QgcmIgPSB2My5kaWZmKFBCLCBjb2xsMi5nZXRUcmFuc2xhdGlvbigpKTtcclxuICAgICAgICBjb25zdCByYSA9IHYzLmRpZmYoUEEsIGNvbGwxLmdldFRyYW5zbGF0aW9uKCkpO1xyXG4gICAgICAgIGNvbnN0IHJhTG9jYWwgPSBtMy50cmFuc2Zvcm1Qb2ludChjb2xsMS5nZXRSbWF0cml4SW52ZXJzZSgpLCByYSk7XHJcbiAgICAgICAgY29uc3QgcmJMb2NhbCA9IG0zLnRyYW5zZm9ybVBvaW50KGNvbGwyLmdldFJtYXRyaXhJbnZlcnNlKCksIHJiKTtcclxuICAgICAgICBjb25zdCBpID0gW25bMV0gKyBuWzJdLCBuWzJdIC0gblswXSwgLW5bMF0gLSBuWzFdXTtcclxuICAgICAgICBjb25zdCBqID0gdjMuY3Jvc3ModjMuc2NhbGUobiwgLTEpLCBpKTtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByYSxcclxuICAgICAgICAgICAgICAgIHJiLFxyXG4gICAgICAgICAgICAgICAgbixcclxuICAgICAgICAgICAgICAgIFBBLFxyXG4gICAgICAgICAgICAgICAgUEIsXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbkVycm9yLFxyXG4gICAgICAgICAgICAgICAgaSxcclxuICAgICAgICAgICAgICAgIGosXHJcbiAgICAgICAgICAgICAgICByYUxvY2FsLFxyXG4gICAgICAgICAgICAgICAgcmJMb2NhbCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG4gICAgLypjb25zdCB7IFBBLCBQQiwgbiwgcG9zaXRpb25FcnJvciB9ID0gY29udGFjdERhdGE7XHJcbiAgXHJcbiAgICBpZiAoXHJcbiAgICAgIGNvbGwxLmdldFR5cGUoKSA9PT0gY29sbGlkZXJUeXBlcy5TcGhlcmUgfHxcclxuICAgICAgY29sbDIuZ2V0VHlwZSgpID09PSBjb2xsaWRlclR5cGVzLlNwaGVyZVxyXG4gICAgKSB7XHJcbiAgICAgIGNvbnN0IHJiID0gdjMuZGlmZihQQiwgY29sbDIuZ2V0VHJhbnNsYXRpb24oKSk7XHJcbiAgICAgIGNvbnN0IHJhID0gdjMuZGlmZihQQSwgY29sbDEuZ2V0VHJhbnNsYXRpb24oKSk7XHJcbiAgXHJcbiAgICAgIGNvbnN0IHJhTG9jYWwgPSBtMy50cmFuc2Zvcm1Qb2ludChjb2xsMS5nZXRSbWF0cml4SW52ZXJzZSgpLCByYSk7XHJcbiAgICAgIGNvbnN0IHJiTG9jYWwgPSBtMy50cmFuc2Zvcm1Qb2ludChjb2xsMi5nZXRSbWF0cml4SW52ZXJzZSgpLCByYik7XHJcbiAgICAgIGNvbnN0IGk6IHZlYzMgPSBbblsxXSArIG5bMl0sIG5bMl0gLSBuWzBdLCAtblswXSAtIG5bMV1dO1xyXG4gIFxyXG4gICAgICBjb25zdCBqID0gdjMuY3Jvc3ModjMuc2NhbGUobiwgLTEpLCBpKTtcclxuICAgICAgcmV0dXJuIFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICByYSxcclxuICAgICAgICAgIHJiLFxyXG4gICAgICAgICAgbixcclxuICAgICAgICAgIFBBLFxyXG4gICAgICAgICAgUEIsXHJcbiAgICAgICAgICBwb3NpdGlvbkVycm9yLFxyXG4gICAgICAgICAgaSxcclxuICAgICAgICAgIGosXHJcbiAgICAgICAgICByYUxvY2FsLFxyXG4gICAgICAgICAgcmJMb2NhbCxcclxuICAgICAgICB9LFxyXG4gICAgICBdO1xyXG4gICAgfVxyXG4gICovXHJcbiAgICBjb25zdCBuUmV2ZXJzZSA9IHYzLnNjYWxlKG4sIC0xKTtcclxuICAgIGNvbnRhY3RGYWNlMSA9IGNvbGwxLmdldENsb3Nlc3RGYWNlQnlOb3JtYWwoblJldmVyc2UpO1xyXG4gICAgY29udGFjdEZhY2UyID0gY29sbDIuZ2V0Q2xvc2VzdEZhY2VCeU5vcm1hbChuKTtcclxuICAgIGNvbnN0IHBsYW5lID0gW1swLCAwLCAwXSwgbl07XHJcbiAgICAvL2NvbnN0IHBsYW5lOiBbdmVjMywgdmVjM10gPSBbdjMuc2NhbGUodjMuc3VtKFBBLCBQQiksIDAuNSksIG5dO1xyXG4gICAgY29uc3QgcHJvamVjdGlvbnMxID0gY29udGFjdEZhY2UxLnZlcnRpY2VzLm1hcCgocCkgPT4gcG9pbnRPblBsYW5lUHJvamVjdGlvbihbMCwgMCwgMF0sIG4sIHApKTtcclxuICAgIGNvbnN0IHByb2plY3Rpb25zMiA9IGNvbnRhY3RGYWNlMi52ZXJ0aWNlcy5tYXAoKHApID0+IHBvaW50T25QbGFuZVByb2plY3Rpb24oWzAsIDAsIDBdLCBuLCBwKSk7XHJcbiAgICBjb25zdCBvcmlnaW4gPSBwbGFuZVswXTtcclxuICAgIGNvbnN0IGkgPSB2My5ub3JtYWxpemUoW25bMV0gKyBuWzJdLCBuWzJdIC0gblswXSwgLW5bMF0gLSBuWzFdXSk7XHJcbiAgICBjb25zdCBqID0gdjMuY3Jvc3ModjMuc2NhbGUobiwgLTEpLCBpKTtcclxuICAgIGxldCBfMmQxID0gcHJvamVjdGlvbnMxLm1hcCgocCkgPT4gZ2V0MkRjb29yZHNPblBsYW5lKGksIGosIHYzLmRpZmYocCwgb3JpZ2luKSkpO1xyXG4gICAgbGV0IF8yZDIgPSBwcm9qZWN0aW9uczIubWFwKChwKSA9PiBnZXQyRGNvb3Jkc09uUGxhbmUoaSwgaiwgdjMuZGlmZihwLCBvcmlnaW4pKSk7XHJcbiAgICBpZiAoaXNJbkNsb2Nrd2lzZShfMmQxKSlcclxuICAgICAgICBfMmQxID0gXzJkMS5tYXAoKF8sIGkpID0+IF8yZDEuYXQoLWkpKTtcclxuICAgIGlmIChpc0luQ2xvY2t3aXNlKF8yZDIpKVxyXG4gICAgICAgIF8yZDIgPSBfMmQyLm1hcCgoXywgaSkgPT4gXzJkMi5hdCgtaSkpO1xyXG4gICAgbGV0IGNsaXBwZWQgPSBjbGlwRmFjZVZzRmFjZShfMmQxLCBfMmQyKTtcclxuICAgIGlmIChjbGlwcGVkLmxlbmd0aCA9PT0gMClcclxuICAgICAgICBjbGlwcGVkID0gY2xpcEZhY2VWc0ZhY2UoXzJkMiwgXzJkMSk7XHJcbiAgICBjb25zdCBfM2QgPSBjbGlwcGVkLm1hcCgocCkgPT4gdjMuc3VtKG9yaWdpbiwgdjMuc3VtKHYzLnNjYWxlKGksIHBbMF0pLCB2My5zY2FsZShqLCBwWzFdKSkpKTtcclxuICAgIGNvbnN0IGZlYXR1cmVzID0gW107XHJcbiAgICBfM2QuZm9yRWFjaCgocG9pbnQpID0+IHtcclxuICAgICAgICBjb25zdCBQQSA9IHJheVZzUGxhbmVJbnRlcnNlYyhbY29udGFjdEZhY2UxLnZlcnRpY2VzWzBdLCBjb250YWN0RmFjZTEubm9ybWFsXSwgcG9pbnQsIG4pO1xyXG4gICAgICAgIGlmICghaXNQb2ludEJlaGluZFBsYW5lKGNvbnRhY3RGYWNlMi52ZXJ0aWNlc1swXSwgY29udGFjdEZhY2UyLm5vcm1hbCwgUEEsIC0xKSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IFBCID0gcmF5VnNQbGFuZUludGVyc2VjKFtjb250YWN0RmFjZTIudmVydGljZXNbMF0sIGNvbnRhY3RGYWNlMi5ub3JtYWxdLCBwb2ludCwgbik7XHJcbiAgICAgICAgaWYgKCFpc1BvaW50QmVoaW5kUGxhbmUoY29udGFjdEZhY2UxLnZlcnRpY2VzWzBdLCBjb250YWN0RmFjZTEubm9ybWFsLCBQQiwgLTEpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgY29uc3QgcmIgPSB2My5kaWZmKFBCLCBjb2xsMi5nZXRUcmFuc2xhdGlvbigpKTtcclxuICAgICAgICBjb25zdCByYSA9IHYzLmRpZmYoUEEsIGNvbGwxLmdldFRyYW5zbGF0aW9uKCkpO1xyXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uRXJyb3IgPSAtdjMuZG90KHYzLmRpZmYoUEIsIFBBKSwgbik7XHJcbiAgICAgICAgY29uc3QgcmFMb2NhbCA9IG0zLnRyYW5zZm9ybVBvaW50KGNvbGwxLmdldFJtYXRyaXhJbnZlcnNlKCksIHJhKTtcclxuICAgICAgICBjb25zdCByYkxvY2FsID0gbTMudHJhbnNmb3JtUG9pbnQoY29sbDIuZ2V0Um1hdHJpeEludmVyc2UoKSwgcmIpO1xyXG4gICAgICAgIGZlYXR1cmVzLnB1c2goe1xyXG4gICAgICAgICAgICByYSxcclxuICAgICAgICAgICAgcmIsXHJcbiAgICAgICAgICAgIG4sXHJcbiAgICAgICAgICAgIFBBLFxyXG4gICAgICAgICAgICBQQixcclxuICAgICAgICAgICAgcG9zaXRpb25FcnJvcixcclxuICAgICAgICAgICAgaSxcclxuICAgICAgICAgICAgaixcclxuICAgICAgICAgICAgcmFMb2NhbCxcclxuICAgICAgICAgICAgcmJMb2NhbCxcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgLypcclxuICAgICAgaWYgKGZlYXR1cmVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICBcclxuICAgICAgICAvLyAgZHJhd1BvbHlzKF8yZDEsIF8yZDIpXHJcbiAgICAgICAgIC8vIHRocm93IDFcclxuICAgICAgICAgIGNvbnN0IHJiID0gdjMuZGlmZihQQiwgY29sbDIuZ2V0VHJhbnNsYXRpb24oKSk7XHJcbiAgICAgICAgICBjb25zdCByYSA9ICB2My5kaWZmKFBBLCBjb2xsMS5nZXRUcmFuc2xhdGlvbigpKTtcclxuICAgICAgICAgIGNvbnN0IHJhTG9jYWwgPSBtMy50cmFuc2Zvcm1Qb2ludChjb2xsMS5nZXRSbWF0cml4SW52ZXJzZSgpLCByYSk7XHJcbiAgICAgICAgICBjb25zdCByYkxvY2FsID0gbTMudHJhbnNmb3JtUG9pbnQoY29sbDIuZ2V0Um1hdHJpeEludmVyc2UoKSwgcmIpO1xyXG4gICAgICAgICAgZmVhdHVyZXMucHVzaChcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHJhLCByYiwgbiwgUEEsIFBCLCBwb3NpdGlvbkVycm9yLCBpLCBqLCByYUxvY2FsLCByYkxvY2FsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICovXHJcbiAgICByZXR1cm4gZmVhdHVyZXM7XHJcbn1cclxuIiwiaW1wb3J0IHsgdjMgfSBmcm9tIFwicm9tYW5wcHBtYXRoXCI7XHJcbmNvbnN0IHsgZG90LCBjcm9zcywgbm9ybWFsaXplLCBzdW0sIGRpZmYsIHNjYWxlLCBpc051bGwsIG5vcm0gfSA9IHYzO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5jb25zdCB7IENMSVBfQklBUywgR0pLX01BWF9JVEVSQVRJT05TX05VTSwgRVBBX0JJQVMgfSA9IGNvbmZpZztcclxuY29uc3QgcmF5VnNQbGFuZUludGVyc2VjID0gKHBsYW5lLCBwb2ludCwgZGlyZWN0aW9uKSA9PiB7XHJcbiAgICBjb25zdCBbb3JpZ2luLCBub3JtYWxdID0gcGxhbmU7XHJcbiAgICBjb25zdCBfZG90ID0gZG90KG5vcm1hbCwgZGlyZWN0aW9uKTtcclxuICAgIGNvbnN0IGZyb21Qb2ludFRvT3JpZ2luID0gZGlmZihwb2ludCwgb3JpZ2luKTtcclxuICAgIGNvbnN0IGZhYyA9IGRvdChmcm9tUG9pbnRUb09yaWdpbiwgbm9ybWFsKSAvIF9kb3Q7XHJcbiAgICByZXR1cm4gZGlmZihwb2ludCwgc2NhbGUoZGlyZWN0aW9uLCBmYWMpKTtcclxufTtcclxuY29uc3QgaXNQb2ludEJlaGluZFBsYW5lID0gKHBsYW5lLCBwb2ludCwgc2lnbiA9IDEpID0+IHtcclxuICAgIGNvbnN0IFtvcmlnaW4sIG5vcm1hbF0gPSBwbGFuZTtcclxuICAgIGxldCBfZCA9IGRvdChub3JtYWwsIGRpZmYocG9pbnQsIG9yaWdpbikpICogc2lnbjtcclxuICAgIHJldHVybiBfZCA+IDAgLSBDTElQX0JJQVM7XHJcbn07XHJcbmNvbnN0IHBvaW50T25QbGFuZVByb2plY3Rpb24gPSAocGxhbmUsIHBvaW50KSA9PiB7XHJcbiAgICBjb25zdCBbb3JpZ2luLCBub3JtYWxdID0gcGxhbmU7XHJcbiAgICBjb25zdCBmcm9tUG9pbnRUb09yaWdpbiA9IGRpZmYocG9pbnQsIG9yaWdpbik7XHJcbiAgICBjb25zdCBwcm9qQWxvbmdOb3JtYWwgPSBkb3Qobm9ybWFsLCBmcm9tUG9pbnRUb09yaWdpbik7XHJcbiAgICByZXR1cm4gZGlmZihwb2ludCwgc2NhbGUobm9ybWFsLCBwcm9qQWxvbmdOb3JtYWwpKTtcclxufTtcclxuY29uc3QgY2xpcFBvaW50c0JlaGluZFBsYW5lID0gKHBsYW5lLCBwb2ludHMsIHNpZ24gPSAxKSA9PiB7XHJcbiAgICBjb25zdCBbb3JpZ2luLCBub3JtYWxdID0gcGxhbmU7XHJcbiAgICByZXR1cm4gcG9pbnRzLmZpbHRlcigocG9pbnQpID0+IGRvdChub3JtYWwsIGRpZmYocG9pbnQsIG9yaWdpbikpICogc2lnbiArIENMSVBfQklBUyA+IDApO1xyXG59O1xyXG5jb25zdCBnZXQyRGNvb3Jkc09uUGxhbmUgPSAoaSwgaiwgcG9pbnQpID0+IHtcclxuICAgIHJldHVybiBbZG90KGksIHBvaW50KSwgZG90KGosIHBvaW50KV07XHJcbn07XHJcbmZ1bmN0aW9uIHVwZGF0ZV9zaW1wbGV4Myhwcm9wcykge1xyXG4gICAgY29uc3QgbiA9IGNyb3NzKGRpZmYocHJvcHMuYiwgcHJvcHMuYSksIGRpZmYocHJvcHMuYywgcHJvcHMuYSkpO1xyXG4gICAgY29uc3QgQU8gPSBzY2FsZShwcm9wcy5hLCAtMSk7XHJcbiAgICBwcm9wcy5zaW1wX2RpbSA9IDI7XHJcbiAgICBpZiAoZG90KGNyb3NzKGRpZmYocHJvcHMuYiwgcHJvcHMuYSksIG4pLCBBTykgPiAwKSB7XHJcbiAgICAgICAgcHJvcHMuYyA9IHByb3BzLmE7XHJcbiAgICAgICAgcHJvcHMuc2VhcmNoX2RpciA9IGNyb3NzKGNyb3NzKGRpZmYocHJvcHMuYiwgcHJvcHMuYSksIEFPKSwgZGlmZihwcm9wcy5iLCBwcm9wcy5hKSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKGRvdChjcm9zcyhuLCBkaWZmKHByb3BzLmMsIHByb3BzLmEpKSwgQU8pID4gMCkge1xyXG4gICAgICAgIHByb3BzLmIgPSBwcm9wcy5hO1xyXG4gICAgICAgIHByb3BzLnNlYXJjaF9kaXIgPSBjcm9zcyhjcm9zcyhkaWZmKHByb3BzLmMsIHByb3BzLmEpLCBBTyksIGRpZmYocHJvcHMuYywgcHJvcHMuYSkpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHByb3BzLnNpbXBfZGltID0gMztcclxuICAgIGlmIChkb3QobiwgQU8pID4gMCkge1xyXG4gICAgICAgIHByb3BzLmQgPSBwcm9wcy5jO1xyXG4gICAgICAgIHByb3BzLmMgPSBwcm9wcy5iO1xyXG4gICAgICAgIHByb3BzLmIgPSBwcm9wcy5hO1xyXG4gICAgICAgIHByb3BzLnNlYXJjaF9kaXIgPSBuO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHByb3BzLmQgPSBwcm9wcy5iO1xyXG4gICAgcHJvcHMuYiA9IHByb3BzLmE7XHJcbiAgICBwcm9wcy5zZWFyY2hfZGlyID0gc2NhbGUobiwgLTEpO1xyXG4gICAgcmV0dXJuO1xyXG59XHJcbmZ1bmN0aW9uIHVwZGF0ZV9zaW1wbGV4NChwcm9wcykge1xyXG4gICAgY29uc3QgQUJDID0gY3Jvc3MoZGlmZihwcm9wcy5iLCBwcm9wcy5hKSwgZGlmZihwcm9wcy5jLCBwcm9wcy5hKSk7XHJcbiAgICBjb25zdCBBQ0QgPSBjcm9zcyhkaWZmKHByb3BzLmMsIHByb3BzLmEpLCBkaWZmKHByb3BzLmQsIHByb3BzLmEpKTtcclxuICAgIGNvbnN0IEFEQiA9IGNyb3NzKGRpZmYocHJvcHMuZCwgcHJvcHMuYSksIGRpZmYocHJvcHMuYiwgcHJvcHMuYSkpO1xyXG4gICAgY29uc3QgQU8gPSBzY2FsZShwcm9wcy5hLCAtMSk7XHJcbiAgICBwcm9wcy5zaW1wX2RpbSA9IDM7XHJcbiAgICBpZiAoZG90KEFCQywgQU8pID4gMCkge1xyXG4gICAgICAgIHByb3BzLmQgPSBwcm9wcy5jO1xyXG4gICAgICAgIHByb3BzLmMgPSBwcm9wcy5iO1xyXG4gICAgICAgIHByb3BzLmIgPSBwcm9wcy5hO1xyXG4gICAgICAgIHByb3BzLnNlYXJjaF9kaXIgPSBBQkM7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGRvdChBQ0QsIEFPKSA+IDApIHtcclxuICAgICAgICBwcm9wcy5iID0gcHJvcHMuYTtcclxuICAgICAgICBwcm9wcy5zZWFyY2hfZGlyID0gQUNEO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChkb3QoQURCLCBBTykgPiAwKSB7XHJcbiAgICAgICAgcHJvcHMuYyA9IHByb3BzLmQ7XHJcbiAgICAgICAgcHJvcHMuZCA9IHByb3BzLmI7XHJcbiAgICAgICAgcHJvcHMuYiA9IHByb3BzLmE7XHJcbiAgICAgICAgcHJvcHMuc2VhcmNoX2RpciA9IEFEQjtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5mdW5jdGlvbiBnamsoY29sbDEsIGNvbGwyKSB7XHJcbiAgICBjb25zdCBwcm9wcyA9IHtcclxuICAgICAgICBhOiBbMCwgMCwgMF0sXHJcbiAgICAgICAgYjogWzAsIDAsIDBdLFxyXG4gICAgICAgIGM6IFswLCAwLCAwXSxcclxuICAgICAgICBkOiBbMCwgMCwgMF0sXHJcbiAgICAgICAgc2VhcmNoX2RpcjogWzAsIDAsIDBdLFxyXG4gICAgICAgIHNpbXBfZGltOiAwLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IG9yaWdpbnNNYXAgPSBuZXcgTWFwKCk7XHJcbiAgICBsZXQgbXR2ID0gWzAsIDAsIDBdO1xyXG4gICAgcHJvcHMuc2VhcmNoX2RpciA9IGRpZmYoY29sbDEuZ2V0VHJhbnNsYXRpb24oKSwgY29sbDIuZ2V0VHJhbnNsYXRpb24oKSk7XHJcbiAgICBjb25zdCBjX29yaWdpbjEgPSBjb2xsMS5zdXBwb3J0KHNjYWxlKHByb3BzLnNlYXJjaF9kaXIsIC0xKSk7XHJcbiAgICBjb25zdCBjX29yaWdpbjIgPSBjb2xsMi5zdXBwb3J0KHByb3BzLnNlYXJjaF9kaXIpO1xyXG4gICAgcHJvcHMuYyA9IGRpZmYoY19vcmlnaW4yLCBjX29yaWdpbjEpO1xyXG4gICAgb3JpZ2luc01hcC5zZXQocHJvcHMuYywgW2Nfb3JpZ2luMSwgY19vcmlnaW4yXSk7XHJcbiAgICBwcm9wcy5zZWFyY2hfZGlyID0gc2NhbGUocHJvcHMuYywgLTEpO1xyXG4gICAgY29uc3QgYl9vcmlnaW4xID0gY29sbDEuc3VwcG9ydChzY2FsZShwcm9wcy5zZWFyY2hfZGlyLCAtMSkpO1xyXG4gICAgY29uc3QgYl9vcmlnaW4yID0gY29sbDIuc3VwcG9ydChwcm9wcy5zZWFyY2hfZGlyKTtcclxuICAgIHByb3BzLmIgPSBkaWZmKGJfb3JpZ2luMiwgYl9vcmlnaW4xKTtcclxuICAgIG9yaWdpbnNNYXAuc2V0KHByb3BzLmIsIFtiX29yaWdpbjEsIGJfb3JpZ2luMl0pO1xyXG4gICAgaWYgKGRvdChwcm9wcy5iLCBwcm9wcy5zZWFyY2hfZGlyKSA8IDApIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHByb3BzLnNlYXJjaF9kaXIgPSBjcm9zcyhjcm9zcyhkaWZmKHByb3BzLmMsIHByb3BzLmIpLCBzY2FsZShwcm9wcy5iLCAtMSkpLCBkaWZmKHByb3BzLmMsIHByb3BzLmIpKTtcclxuICAgIGlmIChpc051bGwocHJvcHMuc2VhcmNoX2RpcikpIHtcclxuICAgICAgICBwcm9wcy5zZWFyY2hfZGlyID0gY3Jvc3MoZGlmZihwcm9wcy5jLCBwcm9wcy5iKSwgWzEsIDAsIDBdKTtcclxuICAgICAgICBpZiAoaXNOdWxsKHByb3BzLnNlYXJjaF9kaXIpKSB7XHJcbiAgICAgICAgICAgIHByb3BzLnNlYXJjaF9kaXIgPSBjcm9zcyhkaWZmKHByb3BzLmMsIHByb3BzLmIpLCBbMCwgMCwgLTFdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm9wcy5zaW1wX2RpbSA9IDI7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdKS19NQVhfSVRFUkFUSU9OU19OVU07ICsraSkge1xyXG4gICAgICAgIGNvbnN0IGFfb3JpZ2luMSA9IGNvbGwxLnN1cHBvcnQoc2NhbGUocHJvcHMuc2VhcmNoX2RpciwgLTEpKTtcclxuICAgICAgICBjb25zdCBhX29yaWdpbjIgPSBjb2xsMi5zdXBwb3J0KHByb3BzLnNlYXJjaF9kaXIpO1xyXG4gICAgICAgIHByb3BzLmEgPSBkaWZmKGFfb3JpZ2luMiwgYV9vcmlnaW4xKTtcclxuICAgICAgICBvcmlnaW5zTWFwLnNldChwcm9wcy5hLCBbYV9vcmlnaW4xLCBhX29yaWdpbjJdKTtcclxuICAgICAgICBpZiAoZG90KHByb3BzLmEsIHByb3BzLnNlYXJjaF9kaXIpIDwgMClcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcHJvcHMuc2ltcF9kaW0rKztcclxuICAgICAgICBpZiAocHJvcHMuc2ltcF9kaW0gPT09IDMpIHtcclxuICAgICAgICAgICAgdXBkYXRlX3NpbXBsZXgzKHByb3BzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodXBkYXRlX3NpbXBsZXg0KHByb3BzKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBwcm9wcyksIHsgY29sbDEsIGNvbGwyLCBvcmlnaW5zTWFwIH0pOyAvL0VQQShwcm9wcy5hLCBwcm9wcy5iLCBwcm9wcy5jLCBwcm9wcy5kLCBvcmlnaW5zTWFwLCBjb2xsMSwgY29sbDIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59XHJcbmNvbnN0IGJhcmljZW50cmljID0gKGZhY2UsIHBvaW50KSA9PiB7XHJcbiAgICBsZXQgYTExID0gZmFjZVswXVswXTtcclxuICAgIGxldCBhMTIgPSBmYWNlWzFdWzBdO1xyXG4gICAgbGV0IGExMyA9IGZhY2VbMl1bMF07XHJcbiAgICBsZXQgYjEgPSBwb2ludFswXTtcclxuICAgIGxldCBhMjEgPSBmYWNlWzBdWzFdO1xyXG4gICAgbGV0IGEyMiA9IGZhY2VbMV1bMV07XHJcbiAgICBsZXQgYTIzID0gZmFjZVsyXVsxXTtcclxuICAgIGxldCBiMiA9IHBvaW50WzFdO1xyXG4gICAgbGV0IGEzMSA9IGZhY2VbMF1bMl07XHJcbiAgICBsZXQgYTMyID0gZmFjZVsxXVsyXTtcclxuICAgIGxldCBhMzMgPSBmYWNlWzJdWzJdO1xyXG4gICAgbGV0IGIzID0gcG9pbnRbMl07XHJcbiAgICBjb25zdCBkID0gYTExICogYTIyICogYTMzICtcclxuICAgICAgICBhMjEgKiBhMzIgKiBhMTMgK1xyXG4gICAgICAgIGExMiAqIGEyMyAqIGEzMSAtXHJcbiAgICAgICAgYTEzICogYTIyICogYTMxIC1cclxuICAgICAgICBhMjEgKiBhMTIgKiBhMzMgLVxyXG4gICAgICAgIGEzMiAqIGEyMyAqIGExMTtcclxuICAgIGNvbnN0IGQxID0gYjEgKiBhMjIgKiBhMzMgK1xyXG4gICAgICAgIGIyICogYTMyICogYTEzICtcclxuICAgICAgICBhMTIgKiBhMjMgKiBiMyAtXHJcbiAgICAgICAgYTEzICogYTIyICogYjMgLVxyXG4gICAgICAgIGIyICogYTEyICogYTMzIC1cclxuICAgICAgICBhMzIgKiBhMjMgKiBiMTtcclxuICAgIGNvbnN0IGQyID0gYTExICogYjIgKiBhMzMgK1xyXG4gICAgICAgIGEyMSAqIGIzICogYTEzICtcclxuICAgICAgICBiMSAqIGEyMyAqIGEzMSAtXHJcbiAgICAgICAgYTEzICogYjIgKiBhMzEgLVxyXG4gICAgICAgIGExMSAqIGIzICogYTIzIC1cclxuICAgICAgICBhMjEgKiBiMSAqIGEzMztcclxuICAgIGNvbnN0IGQzID0gYTExICogYTIyICogYjMgK1xyXG4gICAgICAgIGEyMSAqIGEzMiAqIGIxICtcclxuICAgICAgICBhMTIgKiBiMiAqIGEzMSAtXHJcbiAgICAgICAgYjEgKiBhMjIgKiBhMzEgLVxyXG4gICAgICAgIGEyMSAqIGExMiAqIGIzIC1cclxuICAgICAgICBiMiAqIGEzMiAqIGExMTtcclxuICAgIHJldHVybiBbZDEgLyBkLCBkMiAvIGQsIGQzIC8gZF07XHJcbn07XHJcbmNvbnN0IG9yaWdpblRvRmFjZVByb2ogPSAoZmFjZSkgPT4ge1xyXG4gICAgY29uc3Qgbm9ybWFsID0gZmFjZVszXTtcclxuICAgIGNvbnN0IHBvaW50ID0gZmFjZVswXTtcclxuICAgIGNvbnN0IGMgPSAtbm9ybWFsWzBdICogcG9pbnRbMF0gLSBub3JtYWxbMV0gKiBwb2ludFsxXSAtIG5vcm1hbFsyXSAqIHBvaW50WzJdO1xyXG4gICAgY29uc3QgdCA9IC1jIC9cclxuICAgICAgICAobm9ybWFsWzBdICogbm9ybWFsWzBdICsgbm9ybWFsWzFdICogbm9ybWFsWzFdICsgbm9ybWFsWzJdICogbm9ybWFsWzJdKTtcclxuICAgIHJldHVybiBbdCAqIG5vcm1hbFswXSwgdCAqIG5vcm1hbFsxXSwgdCAqIG5vcm1hbFsyXV07XHJcbn07XHJcbmNvbnN0IE1BWF9OVU1fRkFDRVMgPSA2NDtcclxuY29uc3QgTUFYX05VTV9MT09TRV9FREdFUyA9IDMyO1xyXG5jb25zdCBFUEFfTUFYX05VTV9JVEVSID0gNjQ7XHJcbmNvbnN0IEVQQSA9IChhLCBiLCBjLCBkLCBvcmlnaW5zTWFwLCBjb2xsMSwgY29sbDIpID0+IHtcclxuICAgIGNvbnN0IGZhY2VzID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgIGZhY2VzW2ldID0gW107XHJcbiAgICB9XHJcbiAgICBmYWNlc1swXVswXSA9IGE7XHJcbiAgICBmYWNlc1swXVsxXSA9IGI7XHJcbiAgICBmYWNlc1swXVsyXSA9IGM7XHJcbiAgICBmYWNlc1swXVszXSA9IG5vcm1hbGl6ZShjcm9zcyhkaWZmKGIsIGEpLCBkaWZmKGMsIGEpKSk7XHJcbiAgICBmYWNlc1sxXVswXSA9IGE7XHJcbiAgICBmYWNlc1sxXVsxXSA9IGM7XHJcbiAgICBmYWNlc1sxXVsyXSA9IGQ7XHJcbiAgICBmYWNlc1sxXVszXSA9IG5vcm1hbGl6ZShjcm9zcyhkaWZmKGMsIGEpLCBkaWZmKGQsIGEpKSk7XHJcbiAgICBmYWNlc1syXVswXSA9IGE7XHJcbiAgICBmYWNlc1syXVsxXSA9IGQ7XHJcbiAgICBmYWNlc1syXVsyXSA9IGI7XHJcbiAgICBmYWNlc1syXVszXSA9IG5vcm1hbGl6ZShjcm9zcyhkaWZmKGQsIGEpLCBkaWZmKGIsIGEpKSk7XHJcbiAgICBmYWNlc1szXVswXSA9IGI7XHJcbiAgICBmYWNlc1szXVsxXSA9IGQ7XHJcbiAgICBmYWNlc1szXVsyXSA9IGM7XHJcbiAgICBmYWNlc1szXVszXSA9IG5vcm1hbGl6ZShjcm9zcyhkaWZmKGQsIGIpLCBkaWZmKGMsIGIpKSk7XHJcbiAgICBsZXQgbnVtX2ZhY2VzID0gNDtcclxuICAgIGxldCBjbG9zZXN0X2ZhY2UgPSBudWxsO1xyXG4gICAgbGV0IHNlYXJjaF9kaXI7XHJcbiAgICBsZXQgcDtcclxuICAgIGZvciAobGV0IGl0ZXJhdGlvbiA9IDA7IGl0ZXJhdGlvbiA8IEVQQV9NQVhfTlVNX0lURVI7ICsraXRlcmF0aW9uKSB7XHJcbiAgICAgICAgbGV0IG1pbl9kaXN0ID0gZG90KGZhY2VzWzBdWzBdLCBmYWNlc1swXVszXSk7XHJcbiAgICAgICAgY2xvc2VzdF9mYWNlID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bV9mYWNlczsgKytpKSB7XHJcbiAgICAgICAgICAgIGxldCBkaXN0ID0gZG90KGZhY2VzW2ldWzBdLCBmYWNlc1tpXVszXSk7XHJcbiAgICAgICAgICAgIGlmIChkaXN0IDwgbWluX2Rpc3QpIHtcclxuICAgICAgICAgICAgICAgIG1pbl9kaXN0ID0gZGlzdDtcclxuICAgICAgICAgICAgICAgIGNsb3Nlc3RfZmFjZSA9IGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc2VhcmNoX2RpciA9IGZhY2VzW2Nsb3Nlc3RfZmFjZV1bM107XHJcbiAgICAgICAgY29uc3QgcF9vcmlnaW4xID0gY29sbDEuc3VwcG9ydChzY2FsZShzZWFyY2hfZGlyLCAtMSkpO1xyXG4gICAgICAgIGNvbnN0IHBfb3JpZ2luMiA9IGNvbGwyLnN1cHBvcnQoc2VhcmNoX2Rpcik7XHJcbiAgICAgICAgcCA9IGRpZmYocF9vcmlnaW4yLCBwX29yaWdpbjEpO1xyXG4gICAgICAgIG9yaWdpbnNNYXAuc2V0KHAsIFtwX29yaWdpbjEsIHBfb3JpZ2luMl0pO1xyXG4gICAgICAgIGlmIChkb3QocCwgc2VhcmNoX2RpcikgLSBtaW5fZGlzdCA8IEVQQV9CSUFTKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZhY2UgPSBmYWNlc1tjbG9zZXN0X2ZhY2VdO1xyXG4gICAgICAgICAgICBjb25zdCBwb2ludCA9IG9yaWdpblRvRmFjZVByb2ooZmFjZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IFtBYSwgQmFdID0gb3JpZ2luc01hcC5nZXQoZmFjZVswXSk7XHJcbiAgICAgICAgICAgIC8vY29uc3QgQWEgPSBmYWNlWzBdLm9hXHJcbiAgICAgICAgICAgIC8vY29uc3QgQmEgPSBmYWNlWzBdLm9iXHJcbiAgICAgICAgICAgIGNvbnN0IFtBYiwgQmJdID0gb3JpZ2luc01hcC5nZXQoZmFjZVsxXSk7XHJcbiAgICAgICAgICAgIC8vY29uc3QgQWIgPSBmYWNlWzFdLm9hXHJcbiAgICAgICAgICAgIC8vY29uc3QgQmIgPSBmYWNlWzFdLm9iXHJcbiAgICAgICAgICAgIGNvbnN0IFtBYywgQmNdID0gb3JpZ2luc01hcC5nZXQoZmFjZVsyXSk7XHJcbiAgICAgICAgICAgIC8vY29uc3QgQWMgPSBmYWNlWzJdLm9hXHJcbiAgICAgICAgICAgIC8vY29uc3QgQmMgPSBmYWNlWzJdLm9iXHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGJhcmljZW50cmljKGZhY2UsIHBvaW50KTtcclxuICAgICAgICAgICAgaWYgKGlzTmFOKHJlc3VsdFswXSArIHJlc3VsdFsxXSArIHJlc3VsdFsyXSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBQQSA9IHN1bShzdW0oc2NhbGUoQWEsIHJlc3VsdFswXSksIHNjYWxlKEFiLCByZXN1bHRbMV0pKSwgc2NhbGUoQWMsIHJlc3VsdFsyXSkpO1xyXG4gICAgICAgICAgICAvL0FhLm11bHRpcGx5KHJlc3VsdFswXSkuYWRkKEFiLm11bHRpcGx5KHJlc3VsdFsxXSkpLmFkZChBYy5tdWx0aXBseShyZXN1bHRbMl0pKVxyXG4gICAgICAgICAgICBsZXQgUEIgPSBzdW0oc3VtKHNjYWxlKEJhLCByZXN1bHRbMF0pLCBzY2FsZShCYiwgcmVzdWx0WzFdKSksIHNjYWxlKEJjLCByZXN1bHRbMl0pKTtcclxuICAgICAgICAgICAgLy9CYS5tdWx0aXBseShyZXN1bHRbMF0pLmFkZChCYi5tdWx0aXBseShyZXN1bHRbMV0pKS5hZGQoQmMubXVsdGlwbHkocmVzdWx0WzJdKSlcclxuICAgICAgICAgICAgLy9jb25zdCByYSA9IFBBLnN1YnN0cmFjdChjb2xsMS5wb3MpXHJcbiAgICAgICAgICAgIGNvbnN0IG4gPSBzY2FsZShmYWNlWzNdLCAtMSk7IC8vXHJcbiAgICAgICAgICAgIC8vY29uc3QgbiA9IG5vcm1hbGl6ZShzY2FsZShmYWNlWzNdLCAtZG90KHAsIHNlYXJjaF9kaXIpKSk7XHJcbiAgICAgICAgICAgIC8vaWYgKG5vcm0obikgPCAwLjAxKSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgY29uc3QgcG9zaXRpb25FcnJvciA9IC1kb3QoZGlmZihQQiwgUEEpLCBuKTtcclxuICAgICAgICAgICAgcmV0dXJuIHsgUEEsIFBCLCBuLCBwb3NpdGlvbkVycm9yIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGxvb3NlX2VkZ2VzID0gW107XHJcbiAgICAgICAgbGV0IG51bV9sb29zZV9lZGdlcyA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1fZmFjZXM7ICsraSkge1xyXG4gICAgICAgICAgICBpZiAoZG90KGZhY2VzW2ldWzNdLCBkaWZmKHAsIGZhY2VzW2ldWzBdKSkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDM7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50X2VkZ2UgPSBbZmFjZXNbaV1bal0sIGZhY2VzW2ldWyhqICsgMSkgJSAzXV07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvdW5kX2VkZ2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IG51bV9sb29zZV9lZGdlczsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb29zZV9lZGdlc1trXVsxXSA9PT0gY3VycmVudF9lZGdlWzBdICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb29zZV9lZGdlc1trXVswXSA9PT0gY3VycmVudF9lZGdlWzFdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb29zZV9lZGdlc1trXVswXSA9IGxvb3NlX2VkZ2VzW251bV9sb29zZV9lZGdlcyAtIDFdWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9vc2VfZWRnZXNba11bMV0gPSBsb29zZV9lZGdlc1tudW1fbG9vc2VfZWRnZXMgLSAxXVsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bV9sb29zZV9lZGdlcy0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm91bmRfZWRnZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gbnVtX2xvb3NlX2VkZ2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZm91bmRfZWRnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobnVtX2xvb3NlX2VkZ2VzID49IE1BWF9OVU1fTE9PU0VfRURHRVMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9vc2VfZWRnZXNbbnVtX2xvb3NlX2VkZ2VzXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb29zZV9lZGdlc1tudW1fbG9vc2VfZWRnZXNdWzBdID0gY3VycmVudF9lZGdlWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb29zZV9lZGdlc1tudW1fbG9vc2VfZWRnZXNdWzFdID0gY3VycmVudF9lZGdlWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBudW1fbG9vc2VfZWRnZXMrKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmYWNlc1tpXVswXSA9IGZhY2VzW251bV9mYWNlcyAtIDFdWzBdO1xyXG4gICAgICAgICAgICAgICAgZmFjZXNbaV1bMV0gPSBmYWNlc1tudW1fZmFjZXMgLSAxXVsxXTtcclxuICAgICAgICAgICAgICAgIGZhY2VzW2ldWzJdID0gZmFjZXNbbnVtX2ZhY2VzIC0gMV1bMl07XHJcbiAgICAgICAgICAgICAgICBmYWNlc1tpXVszXSA9IGZhY2VzW251bV9mYWNlcyAtIDFdWzNdO1xyXG4gICAgICAgICAgICAgICAgbnVtX2ZhY2VzLS07XHJcbiAgICAgICAgICAgICAgICBpLS07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1fbG9vc2VfZWRnZXM7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAobnVtX2ZhY2VzID49IE1BWF9OVU1fRkFDRVMpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZmFjZXNbbnVtX2ZhY2VzXSA9IFtdO1xyXG4gICAgICAgICAgICBmYWNlc1tudW1fZmFjZXNdWzBdID0gbG9vc2VfZWRnZXNbaV1bMF07XHJcbiAgICAgICAgICAgIGZhY2VzW251bV9mYWNlc11bMV0gPSBsb29zZV9lZGdlc1tpXVsxXTtcclxuICAgICAgICAgICAgZmFjZXNbbnVtX2ZhY2VzXVsyXSA9IHA7XHJcbiAgICAgICAgICAgIGZhY2VzW251bV9mYWNlc11bM10gPSBub3JtYWxpemUoY3Jvc3MoZGlmZihsb29zZV9lZGdlc1tpXVswXSwgbG9vc2VfZWRnZXNbaV1bMV0pLCBkaWZmKGxvb3NlX2VkZ2VzW2ldWzBdLCBwKSkpO1xyXG4gICAgICAgICAgICBpZiAoZG90KGZhY2VzW251bV9mYWNlc11bMF0sIGZhY2VzW251bV9mYWNlc11bM10pICsgMC4wMSA8IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRlbXAgPSBmYWNlc1tudW1fZmFjZXNdWzBdO1xyXG4gICAgICAgICAgICAgICAgZmFjZXNbbnVtX2ZhY2VzXVswXSA9IGZhY2VzW251bV9mYWNlc11bMV07XHJcbiAgICAgICAgICAgICAgICBmYWNlc1tudW1fZmFjZXNdWzFdID0gdGVtcDtcclxuICAgICAgICAgICAgICAgIGZhY2VzW251bV9mYWNlc11bM10gPSBzY2FsZShmYWNlc1tudW1fZmFjZXNdWzNdLCAtMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbnVtX2ZhY2VzKys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcbi8qXHJcbmNvbnN0IGdldENvbnRhY3RzID0gKFxyXG4gIGNvbGwxOiBJQ29sbGlkZXIsXHJcbiAgY29sbDI6IElDb2xsaWRlclxyXG4pOiB7XHJcbiAgcmFMb2NhbDogdmVjMztcclxuICByYkxvY2FsOiB2ZWMzO1xyXG4gIHJhOiB2ZWMzO1xyXG4gIHJiOiB2ZWMzO1xyXG4gIFBBOiB2ZWMzO1xyXG4gIFBCOiB2ZWMzO1xyXG4gIG46IHZlYzM7XHJcbiAgcG9zaXRpb25FcnJvcjogbnVtYmVyO1xyXG4gIGk6IHZlYzM7XHJcbiAgajogdmVjMztcclxufVtdID0+IHtcclxuICBjb25zdCBjb250YWN0RGF0YSA9IGdqayhjb2xsMSwgY29sbDIpO1xyXG4gIGlmICghY29udGFjdERhdGEpIHJldHVybiBbXTtcclxuXHJcbiAgY29uc3QgeyBQQSwgUEIsIG4sIHBvc2l0aW9uRXJyb3IgfSA9IGNvbnRhY3REYXRhO1xyXG5cclxuXHJcbiAgaWYgKGNvbGwxLmdldFR5cGUoKSA9PT0gXCJzcGhlcmVcIiB8fCBjb2xsMi5nZXRUeXBlKCkgPT09IFwic3BoZXJlXCIpIHtcclxuICAgIGNvbnN0IHJiID0gZGlmZihQQiwgY29sbDIuZ2V0VHJhbnNsYXRpb24oKSk7XHJcbiAgICBjb25zdCByYSA9IGRpZmYoUEEsIGNvbGwxLmdldFRyYW5zbGF0aW9uKCkpO1xyXG5cclxuICAgIGNvbnN0IHJhTG9jYWwgPSBtMy50cmFuc2Zvcm1Qb2ludChjb2xsMS5nZXRSbWF0cml4SW52ZXJzZSgpLCByYSk7XHJcbiAgICBjb25zdCByYkxvY2FsID0gbTMudHJhbnNmb3JtUG9pbnQoY29sbDIuZ2V0Um1hdHJpeEludmVyc2UoKSwgcmIpO1xyXG4gICAgY29uc3QgaTogdmVjMyA9IFtuWzFdICsgblsyXSwgblsyXSAtIG5bMF0sIC1uWzBdIC0gblsxXV07XHJcblxyXG4gICAgY29uc3QgaiA9IGNyb3NzKHNjYWxlKG4sIC0xKSwgaSk7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICB7XHJcbiAgICAgICAgcmEsIHJiLCBuLCBQQSwgUEIsIHBvc2l0aW9uRXJyb3IsIGksIGosIHJhTG9jYWwsIHJiTG9jYWxcclxuICAgICAgfVxyXG4gICAgXTtcclxuICB9XHJcbiAgXHJcbiAgY29uc3QgblJldmVyc2UgPSBzY2FsZShuLCAtMSk7XHJcblxyXG4gIGNvbnN0IGNvbnRhY3RGYWNlMSA9IGNvbGwxLmdldENsb3Nlc3RGYWNlQnlOb3JtYWwoblJldmVyc2UpO1xyXG4gIGNvbnN0IGNvbnRhY3RGYWNlMiA9IGNvbGwyLmdldENsb3Nlc3RGYWNlQnlOb3JtYWwobik7XHJcblxyXG4gIGNvbnN0IHBsYW5lOiBwbGFuZSA9IFtzY2FsZShzdW0oUEEsIFBCKSwgMC41KSwgbl07XHJcbiAgY29uc3QgcHJvamVjdGlvbnMxID0gY29udGFjdEZhY2UxLnZlcnRpY2VzLm1hcCgocCkgPT5cclxuICAgIHBvaW50T25QbGFuZVByb2plY3Rpb24ocGxhbmUsIHApXHJcbiAgKTtcclxuICBjb25zdCBwcm9qZWN0aW9uczIgPSBjb250YWN0RmFjZTIudmVydGljZXMubWFwKChwKSA9PlxyXG4gICAgcG9pbnRPblBsYW5lUHJvamVjdGlvbihwbGFuZSwgcClcclxuICApO1xyXG5cclxuICBjb25zdCBvcmlnaW4gPSBwbGFuZVswXTtcclxuICBjb25zdCBpID0gbm9ybWFsaXplKFtuWzFdICsgblsyXSwgblsyXSAtIG5bMF0sIC1uWzBdIC0gblsxXV0pO1xyXG5cclxuICBjb25zdCBqID0gY3Jvc3Moc2NhbGUobiwgLTEpLCBpKTtcclxuXHJcbiAgbGV0IF8yZDEgPSBwcm9qZWN0aW9uczEubWFwKChwKSA9PiBnZXQyRGNvb3Jkc09uUGxhbmUoaSwgaiwgZGlmZihwLCBvcmlnaW4pKSk7XHJcbiAgbGV0IF8yZDIgPSBwcm9qZWN0aW9uczIubWFwKChwKSA9PiBnZXQyRGNvb3Jkc09uUGxhbmUoaSwgaiwgZGlmZihwLCBvcmlnaW4pKSk7XHJcblxyXG4gIGNvbnN0IGRpcjEgPSBpc0luQ2xvY2t3aXNlKF8yZDEpO1xyXG4gIGNvbnN0IGRpcjIgPSBpc0luQ2xvY2t3aXNlKF8yZDIpO1xyXG4gIGlmIChkaXIxIDwgMCkgXzJkMSA9IF8yZDEubWFwKChfLCBpKSA9PiBfMmQxLmF0KC1pKSk7XHJcbiAgaWYgKGRpcjIgPCAwKSBfMmQyID0gXzJkMi5tYXAoKF8sIGkpID0+IF8yZDIuYXQoLWkpKTtcclxuXHJcbiAgY29uc3QgY2xpcHBlZCA9IGNsaXBGYWNlVnNGYWNlKF8yZDEsIF8yZDIpO1xyXG5cclxuICBjb25zdCBfM2QgPSBjbGlwcGVkLm1hcCgocCkgPT5cclxuICAgIHN1bShvcmlnaW4sIHN1bShzY2FsZShpLCBwWzBdKSwgc2NhbGUoaiwgcFsxXSkpKVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGZlYXR1cmVzID0gW107XHJcbiAgXzNkLmZvckVhY2goKHBvaW50KSA9PiB7XHJcbiAgICBjb25zdCBQQSA9IHJheVZzUGxhbmVJbnRlcnNlYyhcclxuICAgICAgW2NvbnRhY3RGYWNlMS52ZXJ0aWNlc1swXSwgY29udGFjdEZhY2UxLm5vcm1hbF0sXHJcbiAgICAgIHBvaW50LFxyXG4gICAgICBuXHJcbiAgICApO1xyXG4gICAgaWYgKCFpc1BvaW50QmVoaW5kUGxhbmUocGxhbmUsIFBBLCAxKSkgcmV0dXJuO1xyXG4gICAgY29uc3QgUEIgPSByYXlWc1BsYW5lSW50ZXJzZWMoXHJcbiAgICAgIFtjb250YWN0RmFjZTIudmVydGljZXNbMF0sIGNvbnRhY3RGYWNlMi5ub3JtYWxdLFxyXG4gICAgICBwb2ludCxcclxuICAgICAgblxyXG4gICAgKTtcclxuICAgIGlmICghaXNQb2ludEJlaGluZFBsYW5lKHBsYW5lLCBQQiwgLTEpKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgcmIgPSBkaWZmKFBCLCBjb2xsMi5nZXRUcmFuc2xhdGlvbigpKTtcclxuICAgIGNvbnN0IHJhID0gZGlmZihQQSwgY29sbDEuZ2V0VHJhbnNsYXRpb24oKSk7XHJcbiAgICBjb25zdCBwb3NpdGlvbkVycm9yID0gLWRvdChkaWZmKFBCLCBQQSksIG4pO1xyXG4gICAgY29uc3QgcmFMb2NhbCA9IG0zLnRyYW5zZm9ybVBvaW50KGNvbGwxLmdldFJtYXRyaXhJbnZlcnNlKCksIHJhKTtcclxuICAgIGNvbnN0IHJiTG9jYWwgPSBtMy50cmFuc2Zvcm1Qb2ludChjb2xsMi5nZXRSbWF0cml4SW52ZXJzZSgpLCByYik7XHJcblxyXG4gICAgZmVhdHVyZXMucHVzaChcclxuICAgICAge1xyXG4gICAgICAgIHJhLCByYiwgbiwgUEEsIFBCLCBwb3NpdGlvbkVycm9yLCBpLCBqLCByYUxvY2FsLCByYkxvY2FsXHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfSk7XHJcblxyXG4gIGlmIChmZWF0dXJlcy5sZW5ndGggPT09IDApIHtcclxuICAgIGNvbnNvbGUubG9nKF8yZDEsIF8yZDIsIGNsaXBwZWQgKVxyXG4gICAgdGhyb3cgMVxyXG4gICAgY29uc3QgcmIgPSBkaWZmKFBCLCBjb2xsMi5nZXRUcmFuc2xhdGlvbigpKTtcclxuICAgIGNvbnN0IHJhID0gZGlmZihQQSwgY29sbDEuZ2V0VHJhbnNsYXRpb24oKSk7XHJcbiAgICBjb25zdCByYUxvY2FsID0gbTMudHJhbnNmb3JtUG9pbnQoY29sbDEuZ2V0Um1hdHJpeEludmVyc2UoKSwgcmEpO1xyXG4gICAgY29uc3QgcmJMb2NhbCA9IG0zLnRyYW5zZm9ybVBvaW50KGNvbGwyLmdldFJtYXRyaXhJbnZlcnNlKCksIHJiKTtcclxuICAgIGZlYXR1cmVzLnB1c2goXHJcbiAgICAgIHtcclxuICAgICAgICByYSwgcmIsIG4sIFBBLCBQQiwgcG9zaXRpb25FcnJvciwgaSwgaiwgcmFMb2NhbCwgcmJMb2NhbFxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGZlYXR1cmVzO1xyXG59O1xyXG4qL1xyXG5leHBvcnQgeyBnamssIEVQQSwgXHJcbi8vIGdldENvbnRhY3RzLFxyXG5wb2ludE9uUGxhbmVQcm9qZWN0aW9uLCBjbGlwUG9pbnRzQmVoaW5kUGxhbmUsIGdldDJEY29vcmRzT25QbGFuZSwgcmF5VnNQbGFuZUludGVyc2VjLCB9O1xyXG4iLCJcbmltcG9ydCB7bTQsIG0zLCB2M30gZnJvbSAncm9tYW5wcHBtYXRoJ1xuXG5jb25zdCBLRVlTID0ge1xuICAgICd3JyA6ICdtb3ZlRm9yd2FyZCcsXG4gICAgJ3MnIDogJ21vdmVCYWNrd2FyZCcsXG4gICAgJ2EnIDogJ21vdmVMZWZ0JyxcbiAgICAnZCcgOiAnbW92ZVJpZ2h0JyxcbiAgICAnICcgOiAnbW92ZVVwJ1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGcmVlQ2FtIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5rZXlJbnB1dCA9IG51bGw7XG4gICAgdGhpcy5tb3VzZUlucHV0ID0gbnVsbDtcbiAgICB0aGlzLnJvdGF0aW9uWCA9IDA7XG4gICAgdGhpcy5yb3RhdGlvblkgPSAwO1xuICAgIHRoaXMuZGVsdGFSWSA9IDA7XG4gICAgdGhpcy5jYW1Qb3MgPSBbMCwgMCwgMTBdO1xuICAgIHRoaXMuY2FtUm90ID0gbTMuaWRlbnRpdHkoKTtcbiAgfVxuICBsaXN0ZW5Nb3VzZShtb3VzZUlucHV0KSB7XG4gICAgdGhpcy5tb3VzZUlucHV0ID0gbW91c2VJbnB1dDtcbiAgICBtb3VzZUlucHV0Lm9uKFwibW92ZVwiLCAoW2RlbHRhWCwgZGVsdGFZXSkgPT4ge1xuICAgICAgdGhpcy5yb3RhdGlvblkgLT0gZGVsdGFYICogMC4wMDU7XG4gICAgICB0aGlzLnJvdGF0aW9uWCAtPSBkZWx0YVkgKiAwLjAwNTtcbiAgICAgIHRoaXMucm90YXRpb25YID0gTWF0aC5tYXgoXG4gICAgICAgIC1NYXRoLlBJIC8gMixcbiAgICAgICAgTWF0aC5taW4oTWF0aC5QSSAvIDIsIHRoaXMucm90YXRpb25YKVxuICAgICAgKTtcbiAgICAgIHRoaXMuZGVsdGFSWSA9IGRlbHRhWCAqIDAuMDA1O1xuICAgIH0pO1xuICB9XG4gIGxpc3RlbktleWJvYXJkKGtleUlucHV0KSB7XG4gICAgdGhpcy5rZXlJbnB1dCA9IGtleUlucHV0O1xuICB9XG4gIHRpY2soKSB7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgdGhpcy5rZXlJbnB1dC5rZXlzKSB7XG4gICAgICBjb25zdCBhY3Rpb25OYW1lID0gS0VZU1trZXldO1xuICAgICAgaWYgKGFjdGlvbk5hbWUpIHtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gdGhpc1thY3Rpb25OYW1lXS5iaW5kKHRoaXMpO1xuICAgICAgICBhY3Rpb24oKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmNhbU1hdHJpeCA9IG00LnRyYW5zbGF0aW9uKC4uLnRoaXMuY2FtUG9zKTtcbiAgICB0aGlzLmNhbU1hdHJpeCA9IG00LnhSb3RhdGUoXG4gICAgICBtNC55Um90YXRlKHRoaXMuY2FtTWF0cml4LCB0aGlzLnJvdGF0aW9uWSksXG4gICAgICB0aGlzLnJvdGF0aW9uWFxuICAgICk7XG4gIH1cbiAgbW92ZShkaXIpIHtcbiAgICBjb25zdCBtID0gbTQubTRUb20zKHRoaXMuY2FtTWF0cml4KTtcbiAgICB0aGlzLmNhbVBvcyA9IHYzLnN1bSh0aGlzLmNhbVBvcywgbTMudHJhbnNmb3JtUG9pbnQobSwgZGlyKSk7XG4gIH1cbiAgbW92ZUZvcndhcmQoKSB7XG4gICAgdGhpcy5tb3ZlKFswLCAwLCAtMV0pO1xuICB9XG4gIG1vdmVCYWNrd2FyZCgpIHtcbiAgICB0aGlzLm1vdmUoWzAsIDAsIDFdKTtcbiAgfVxuICBtb3ZlTGVmdCgpIHtcbiAgICB0aGlzLm1vdmUoWy0xLCAwLCAwXSk7XG4gIH1cbiAgbW92ZVJpZ2h0KCkge1xuICAgIHRoaXMubW92ZShbMSwgMCwgMF0pO1xuICB9XG4gIG1vdmVVcCgpIHtcbiAgICB0aGlzLm1vdmUoWzAsIDEsIDBdKTtcbiAgfVxufVxuIiwiaW1wb3J0ICBFdmVudEVtaXR0ZXIgIGZyb20gXCIuLi9waHlzaWNzL0V2ZW50RW1pdHRlci50c1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLZXlJbnB1dCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLmtleXMgPSBuZXcgU2V0KCk7XG4gIH1cbiAgbG9nRG93bih7IGtleSB9KSB7XG4gICAgdGhpcy5rZXlzLmFkZChrZXkpO1xuICAgIHRoaXMuZW1pdChcImtleWRvd25cIiwgeyBrZXkgfSk7XG4gIH1cbiAgbG9nVXAoeyBrZXkgfSkge1xuICAgIHRoaXMua2V5cy5kZWxldGUoa2V5KTtcbiAgICB0aGlzLmVtaXQoXCJrZXl1cFwiLCB7IGtleSB9KTtcbiAgfVxuICBsaXN0ZW4oKSB7XG4gICAgY29uc3QgbG9nRG93biA9IHRoaXMubG9nRG93bi5iaW5kKHRoaXMpO1xuICAgIGNvbnN0IGxvZ1VwID0gdGhpcy5sb2dVcC5iaW5kKHRoaXMpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGxvZ0Rvd24pO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBsb2dVcCk7XG4gICAgdGhpcy51bnN1YnNpY3JpYmUgPSAoKSA9PiB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBsb2dEb3duKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBsb2dVcCk7XG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0ICBFdmVudEVtaXR0ZXIgIGZyb20gXCIuLi9waHlzaWNzL0V2ZW50RW1pdHRlci50c1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb3VzZUlucHV0IGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCA9IGRvY3VtZW50KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmxhc3RYID0gMDtcbiAgICB0aGlzLmxhc3RZID0gMDtcbiAgICB0aGlzLmVuYWJsZSA9IGZhbHNlO1xuICAgIHRoaXMubW92ZXMgPSBbXVxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnRcbiAgfVxuICBsb2dNb3ZlKHsgb2Zmc2V0WCwgb2Zmc2V0WSB9KSB7XG4gICAgY29uc3QgZGVsdGFYID0gb2Zmc2V0WCAtIHRoaXMubGFzdFg7XG4gICAgdGhpcy5sYXN0WCA9IG9mZnNldFg7XG4gICAgY29uc3QgZGVsdGFZID0gb2Zmc2V0WSAtIHRoaXMubGFzdFk7XG4gICAgdGhpcy5sYXN0WSA9IG9mZnNldFk7XG4gICAgdGhpcy5lbWl0KFwibW92ZVwiLCBbZGVsdGFYLCBkZWx0YVldKTtcbiAgICB0aGlzLm1vdmVzLnB1c2goW2RlbHRhWCwgZGVsdGFZXSlcbiAgfVxuICBsaXN0ZW4oKSB7XG4gICAgY29uc3QgbG9nTW92ZSA9IHRoaXMubG9nTW92ZS5iaW5kKHRoaXMpO1xuICAgIGNvbnN0IF8gPSBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKHRoaXMuZW5hYmxlKSBsb2dNb3ZlKGUpO1xuICAgIH0uYmluZCh0aGlzKTtcbiAgICBjb25zdCBkb3duID0gZnVuY3Rpb24gKHsgb2Zmc2V0WCwgb2Zmc2V0WSB9KSB7XG4gICAgICB0aGlzLmxhc3RYID0gb2Zmc2V0WDtcbiAgICAgIHRoaXMubGFzdFkgPSBvZmZzZXRZO1xuICAgICAgdGhpcy5lbmFibGUgPSB0cnVlO1xuICAgIH0uYmluZCh0aGlzKTtcbiAgICBjb25zdCB1cCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuZW5hYmxlID0gZmFsc2U7XG4gICAgfS5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgXyk7XG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgZG93bik7XG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHVwKTtcbiAgICB0aGlzLnVuc3Vic2NyaWJlID0gKCkgPT4ge1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgXyk7XG4gICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBkb3duKTtcbiAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB1cCk7XG4gICAgfTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBtNCB9IGZyb20gXCJyb21hbnBwcG1hdGhcIjtcclxuaW1wb3J0IFZveGVsV29ybGQgZnJvbSBcIi4vdGVycmFpbi9Wb3hlbFdvcmxkXCI7XHJcbmltcG9ydCB7IFJpZ2lkQm9keSwgVGVycmFpblNlZ21lbnQgfSBmcm9tIFwiLi4vLi4vc3JjL3BoeXNpY3MvUmlnaWRCb2R5XCI7XHJcbmltcG9ydCB7IEJveCB9IGZyb20gXCIuLi8uLi9zcmMvcGh5c2ljcy9Db2xsaWRlclwiO1xyXG5pbXBvcnQgRGVidWcgZnJvbSBcIi4uLy4uL3NyYy9waHlzaWNzL0RlYnVnXCI7XHJcbmltcG9ydCBWb3hlbFdvcmxkUHJpbWl0aXZlIGZyb20gXCIuL1ZveGVsV29ybGRQcmltaXRpdmVcIjtcclxuaW1wb3J0IHsgR0xjb250ZXh0V3JhcHBlciwgY3JlYXRlQm94LCBwb2ludExpZ2h0U2hhZGVycyB9IGZyb20gXCJyb21hbnBwcGdyYXBoaWNzXCI7XHJcbmltcG9ydCB0ZXh0dXJlU2hhZGVycyBmcm9tIFwiLi90ZXh0dXJlU2hhZGVyXCI7XHJcbmltcG9ydCBGcmVlQ2FtIGZyb20gXCIuLi8uLi9zcmMvbWlzYy9GcmVlQ2FtXCI7XHJcbmltcG9ydCBLZXlJbnB1dCBmcm9tIFwiLi4vLi4vc3JjL21pc2Mva2V5SW5wdXRcIjtcclxuaW1wb3J0IE1vdXNlSW5wdXQgZnJvbSBcIi4uLy4uL3NyYy9taXNjL21vdXNlSW5wdXRcIjtcclxuY29uc3QgY29udGV4dCA9IG5ldyBHTGNvbnRleHRXcmFwcGVyKFwiY2FudmFzXCIpO1xyXG5jb25zdCB0ZXh0dXJlMSA9IG5ldyBjb250ZXh0LlRleHR1cmVJbmZvKCk7XHJcbnRleHR1cmUxLmNyZWF0ZVRleHR1cmVGcm9tVVJMKFwicmVzb3VyY2VzL2F0bGFzLnBuZ1wiKTtcclxuY29udGV4dC5yZXNpemVDYW52YXNUb0Rpc3BsYXlTaXplKCk7XHJcbmNvbnN0IGRyYXdlciA9IG5ldyBjb250ZXh0LkRyYXdlcigpO1xyXG5kcmF3ZXIucHJvamVjdGlvbk1hdHJpeCA9IGNvbnRleHQuRHJhd2VyLmNyZWF0ZTNkUHJvamVjdGlvbk1hdHJpeCgxLCAyMDAwLCBjb250ZXh0LmdsLmNhbnZhcy53aWR0aCwgY29udGV4dC5nbC5jYW52YXMuaGVpZ2h0KTtcclxuY29uc3QgZ2xvYmFsVW5pZm9ybXMgPSB7XHJcbiAgICB1X2xpZ2h0V29ybGRQb3NpdGlvbjogWzMwLCA1MCwgMzBdLFxyXG4gICAgdV9hbWJpZW50TGlnaHQ6IFsxLCAxLCAwLjMsIDAuMTFdLFxyXG4gICAgdV9yZXZlcnNlTGlnaHREaXJlY3Rpb246IFsxLCAwLCAwXSxcclxuICAgIHVfc2hpbmluZXNzOiAzMDAsXHJcbn07XHJcbmNvbnN0IHRleHR1cmVQcm9ncmFtSW5mbyA9IG5ldyBjb250ZXh0LlByb2dyYW1JbmZvKHRleHR1cmVTaGFkZXJzLnZlcnQsIHRleHR1cmVTaGFkZXJzLmZyYWcpO1xyXG5jb25zdCBwb2ludExpZ2h0UHJvZ3JhbUluZm8gPSBuZXcgY29udGV4dC5Qcm9ncmFtSW5mbyhwb2ludExpZ2h0U2hhZGVycy52ZXJ0LCBwb2ludExpZ2h0U2hhZGVycy5mcmFnKTtcclxucG9pbnRMaWdodFByb2dyYW1JbmZvLmNvbXBpbGVTaGFkZXJzKCkuY3JlYXRlVW5pZm9ybVNldHRlcnMoKTtcclxuY29uc3QgY3ViZSA9IGNvbnRleHQuUHJpbWl0aXZlUmVuZGVyZXIuZnJvbUFycmF5RGF0YShjcmVhdGVCb3goMSwgMSwgMSkpO1xyXG5jdWJlXHJcbiAgICAuY3JlYXRlVkFPKClcclxuICAgIC5zZXREcmF3ZXIoZHJhd2VyKVxyXG4gICAgLnNldFByb2dyYW1JbmZvKHBvaW50TGlnaHRQcm9ncmFtSW5mbylcclxuICAgIC5zZXRNb2RlKDQpO1xyXG50ZXh0dXJlUHJvZ3JhbUluZm8uY29tcGlsZVNoYWRlcnMoKS5jcmVhdGVVbmlmb3JtU2V0dGVycygpO1xyXG5jb25zdCBzaW0gPSBuZXcgVm94ZWxXb3JsZCgpO1xyXG5jb25zdCBjZWxsU2l6ZSA9IDMyO1xyXG5jb25zdCB0aWxlU2l6ZSA9IDE2O1xyXG5jb25zdCB0aWxlVGV4dHVyZVdpZHRoID0gMjU2O1xyXG5jb25zdCB0aWxlVGV4dHVyZUhlaWdodCA9IDY0O1xyXG5jb25zdCB3b3JsZCA9IG5ldyBWb3hlbFdvcmxkUHJpbWl0aXZlKHtcclxuICAgIGNlbGxTaXplLFxyXG4gICAgdGlsZVNpemUsXHJcbiAgICB0aWxlVGV4dHVyZVdpZHRoLFxyXG4gICAgdGlsZVRleHR1cmVIZWlnaHQsXHJcbn0pO1xyXG5jb25zdCBjZWxsTWVzaGVzID0ge307XHJcbmNvbnN0IHVwZGF0ZUNlbGxNZXNoID0gKHgsIHksIHopID0+IHtcclxuICAgIGNvbnN0IGNlbGxYID0gTWF0aC5mbG9vcih4IC8gY2VsbFNpemUpO1xyXG4gICAgY29uc3QgY2VsbFkgPSBNYXRoLmZsb29yKHkgLyBjZWxsU2l6ZSk7XHJcbiAgICBjb25zdCBjZWxsWiA9IE1hdGguZmxvb3IoeiAvIGNlbGxTaXplKTtcclxuICAgIGNvbnN0IGNlbGxJZCA9IHdvcmxkLmNvbXB1dGVDZWxsSWQoeCwgeSwgeik7XHJcbiAgICBjb25zdCBtZXNoID0gY2VsbE1lc2hlc1tjZWxsSWRdO1xyXG4gICAgaWYgKCFtZXNoKSB7XHJcbiAgICAgICAgY2VsbE1lc2hlc1tjZWxsSWRdID0gY29udGV4dC5QcmltaXRpdmVSZW5kZXJlci5mcm9tQXJyYXlEYXRhKHdvcmxkLmdlbmVyYXRlR2VvbWV0cnlEYXRhRm9yQ2VsbChjZWxsWCwgY2VsbFksIGNlbGxaKSk7XHJcbiAgICAgICAgY2VsbE1lc2hlc1tjZWxsSWRdLmNyZWF0ZVZBTygpXHJcbiAgICAgICAgICAgIC5zZXREcmF3ZXIoZHJhd2VyKVxyXG4gICAgICAgICAgICAuc2V0UHJvZ3JhbUluZm8odGV4dHVyZVByb2dyYW1JbmZvKVxyXG4gICAgICAgICAgICAuc2V0TW9kZSg0KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBhcnJheURhdGEgPSB3b3JsZC5nZW5lcmF0ZUdlb21ldHJ5RGF0YUZvckNlbGwoY2VsbFgsIGNlbGxZLCBjZWxsWik7XHJcbiAgICBtZXNoLmJ1ZmZlckRhdGEoJ1BPU0lUSU9OJywgYXJyYXlEYXRhLmF0dHJpYnV0ZXMuUE9TSVRJT04uZGF0YSk7XHJcbiAgICBtZXNoLmJ1ZmZlckRhdGEoJ1RFWENPT1JEXzAnLCBhcnJheURhdGEuYXR0cmlidXRlcy5URVhDT09SRF8wLmRhdGEpO1xyXG4gICAgbWVzaC5idWZmZXJEYXRhKCdOT1JNQUwnLCBhcnJheURhdGEuYXR0cmlidXRlcy5OT1JNQUwuZGF0YSk7XHJcbiAgICBtZXNoLnNldEluZGljZXMoYXJyYXlEYXRhLmluZGljZXMpO1xyXG4gICAgcmV0dXJuO1xyXG59O1xyXG5mb3IgKGxldCB5ID0gMDsgeSA8IGNlbGxTaXplOyArK3kpIHtcclxuICAgIGZvciAobGV0IHogPSAtY2VsbFNpemU7IHogPCBjZWxsU2l6ZTsgKyt6KSB7XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IC1jZWxsU2l6ZTsgeCA8IGNlbGxTaXplOyArK3gpIHtcclxuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gKE1hdGguc2luKCh4IC8gY2VsbFNpemUpICogTWF0aC5QSSAqIDIpICtcclxuICAgICAgICAgICAgICAgIE1hdGguc2luKCh6IC8gY2VsbFNpemUpICogTWF0aC5QSSAqIDMpKSAqXHJcbiAgICAgICAgICAgICAgICAoY2VsbFNpemUgLyA2KSArXHJcbiAgICAgICAgICAgICAgICBjZWxsU2l6ZSAvIDI7XHJcbiAgICAgICAgICAgIGlmICh5IDwgaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICB3b3JsZC5zZXRWb3hlbCh4LCB5LCB6LCAxKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBocyA9IG5ldyBUZXJyYWluU2VnbWVudChuZXcgQm94KDEsIDEsIDEpKTtcclxuICAgICAgICAgICAgICAgIHNpbS5zZXRCbG9jayh4LCB5LCB6LCBwaHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZvciAoY29uc3QgY2VsbElkIGluIHdvcmxkLmNlbGxzKSB7XHJcbiAgICBjb25zdCBbeCwgeSwgel0gPSBjZWxsSWQuc3BsaXQoJywnKS5tYXAoaSA9PiBwYXJzZUludChpKSk7XHJcbiAgICB1cGRhdGVDZWxsTWVzaCh4LCB5LCB6KTtcclxufVxyXG5sZXQgb2JqZWN0c1RvRHJhdyA9IFtdO1xyXG5jb25zdCBlID0gW107XHJcbmNvbnNvbGUubG9nKGUpO1xyXG5mb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XHJcbiAgICBjb25zdCBib3ggPSB7XHJcbiAgICAgICAgcGh5c2ljczogbmV3IFJpZ2lkQm9keShuZXcgQm94KDEsIDEsIDEpKSxcclxuICAgICAgICBzcHJpdGU6IGN1YmUsXHJcbiAgICAgICAgdW5pZm9ybXM6IHsgdV9jb2xvcjogW01hdGgucmFuZG9tKCksIE1hdGgucmFuZG9tKCksIE1hdGgucmFuZG9tKCksIDFdIH0sXHJcbiAgICB9O1xyXG4gICAgYm94LnBoeXNpY3MudHJhbnNsYXRlKFswICsgKGkgJSA1KSAqIDMsIDUwICsgMy4wMSAqIChpICUgMyksIDBdKTtcclxuICAgIC8vYm94LnBoeXNpY3MudHJhbnNsYXRlKFswLCAgMSArIDMuMDEgKiAoaSksIDBdKTtcclxuICAgIGJveC5waHlzaWNzLnNldE1hc3MoNSk7XHJcbiAgICBib3gucGh5c2ljcy5hZGRBY2NlbGVyYXRpb24oWzAsIC05LCAwXSk7XHJcbiAgICBzaW0uYWRkT2JqZWN0KGJveC5waHlzaWNzKTtcclxuICAgIG9iamVjdHNUb0RyYXcucHVzaChib3gpO1xyXG59XHJcbmNvbnNvbGUubG9nKGNlbGxNZXNoZXMpO1xyXG5jb25zdCBtb3VzZUlucHV0ID0gbmV3IE1vdXNlSW5wdXQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIikpO1xyXG5tb3VzZUlucHV0Lmxpc3RlbigpO1xyXG5jb25zdCBrZXlJbnB1dCA9IG5ldyBLZXlJbnB1dCgpO1xyXG5rZXlJbnB1dC5saXN0ZW4oKTtcclxuY29uc3QgcGxheWVyID0gbmV3IEZyZWVDYW0oKTtcclxucGxheWVyLmxpc3RlbktleWJvYXJkKGtleUlucHV0KTtcclxucGxheWVyLmxpc3Rlbk1vdXNlKG1vdXNlSW5wdXQpO1xyXG5wbGF5ZXIuY2FtUG9zID0gWzQwLCA0OCwgNDBdO1xyXG5wbGF5ZXIucm90YXRpb25YID0gLU1hdGguUEkgKiAwLjE7XHJcbnBsYXllci5yb3RhdGlvblkgPSBNYXRoLlBJICogMC4zO1xyXG5sZXQgbGFzdENhbGwgPSBEYXRlLm5vdygpO1xyXG5jb25zdCBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xyXG5jb25zdCBsb29wID0gKCkgPT4ge1xyXG4gICAgcGxheWVyLnRpY2soKTtcclxuICAgIHNpbS50aWNrKDAuMDE1KTtcclxuICAgIGNvbnN0IGN1cmVudFRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgY29uc3QgZGVsdGEgPSBjdXJlbnRUaW1lIC0gbGFzdENhbGw7XHJcbiAgICBEZWJ1Zy5kYXRhLkZQUyA9IE1hdGguZmxvb3IoTnVtYmVyKCgxIC8gZGVsdGEpICogMTAwMCkpO1xyXG4gICAgRGVidWcuZGF0YS5SVU5USU1FID0gKGN1cmVudFRpbWUgLSBzdGFydFRpbWUpIC8gMTAwMDtcclxuICAgIGxhc3RDYWxsID0gY3VyZW50VGltZTtcclxuICAgIGNvbnRleHQuZ2wuY2xlYXIoY29udGV4dC5nbC5DT0xPUl9CVUZGRVJfQklUIHwgY29udGV4dC5nbC5ERVBUSF9CVUZGRVJfQklUKTtcclxuICAgIGNvbnRleHQuZ2wuZW5hYmxlKGNvbnRleHQuZ2wuQ1VMTF9GQUNFKTtcclxuICAgIGNvbnRleHQuZ2wuZW5hYmxlKGNvbnRleHQuZ2wuREVQVEhfVEVTVCk7XHJcbiAgICBjb25zdCBjYW1lcmFNYXRyaXggPSBwbGF5ZXIuY2FtTWF0cml4O1xyXG4gICAgY29uc3QgeyB0cmFuc2xhdGlvbiB9ID0gbTQuZGVjb21wb3NlKGNhbWVyYU1hdHJpeCk7XHJcbiAgICBjb25zdCB1X3ZpZXdXb3JsZFBvc2l0aW9uID0gdHJhbnNsYXRpb247XHJcbiAgICBmb3IgKGNvbnN0IGNlbGxJZCBpbiBjZWxsTWVzaGVzKSB7XHJcbiAgICAgICAgY2VsbE1lc2hlc1tjZWxsSWRdLmRyYXcoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBnbG9iYWxVbmlmb3JtcyksIHsgdV9tYXRyaXg6IG00LmlkZW50aXR5KCksIHVfY29sb3I6IFswLCAwLCAwLCAxXSwgdV92aWV3V29ybGRQb3NpdGlvbiB9KSwgY2FtZXJhTWF0cml4KTtcclxuICAgIH1cclxuICAgIG9iamVjdHNUb0RyYXcuZm9yRWFjaCgob2JqKSA9PiB7XHJcbiAgICAgICAgb2JqLnNwcml0ZS5kcmF3KE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBnbG9iYWxVbmlmb3JtcyksIHsgdV9tYXRyaXg6IG9iai5waHlzaWNzLmdldENvbGxpZGVyKCkuZ2V0TTQoKSwgdV92aWV3V29ybGRQb3NpdGlvbiB9KSwgb2JqLnVuaWZvcm1zKSwgY2FtZXJhTWF0cml4KTtcclxuICAgIH0pO1xyXG4gICAgY29udGV4dC5nbC52aWV3cG9ydCgwLCAwLCBjb250ZXh0LmdsLmNhbnZhcy53aWR0aCwgY29udGV4dC5nbC5jYW52YXMuaGVpZ2h0KTtcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcclxufTtcclxubG9vcCgpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=