/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./demo/voxels/VoxelWorld.js":
/*!***********************************!*\
  !*** ./demo/voxels/VoxelWorld.js ***!
  \***********************************/
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
                  positions.push(pos[0] + x, pos[1] + y, pos[2] + z);
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
    constructor(gl) {
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
    }
    createTextureFromURL(url) {
        const { gl } = this;
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
        const img = new Image();
        img.addEventListener("load", function () {
            this.width = img.width;
            this.height = img.height;
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
            gl.generateMipmap(gl.TEXTURE_2D);
        });
        requestCORSIfNotSameOrigin(img, url);
        img.src = url;
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

/***/ "./src/physics/Collider.ts":
/*!*********************************!*\
  !*** ./src/physics/Collider.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Box": () => (/* binding */ Box),
/* harmony export */   "Cylinder": () => (/* binding */ Cylinder),
/* harmony export */   "Sphere": () => (/* binding */ Sphere)
/* harmony export */ });
/* harmony import */ var romanpppmath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! romanpppmath */ "./node_modules/romanpppmath/lib/index.js");

const xAxis = [1, 0, 0];
const yAxis = [0, 1, 0];
const zAxis = [0, 0, 1];
const xAxisNegative = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(xAxis, -1);
const yAxisNegative = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(yAxis, -1);
const zAxisNegative = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(zAxis, -1);
class Collider {
    constructor() {
        this.Rmatrix = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.identity();
        this.RmatrixInverse = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.identity();
        this.pos = [0, 0, 0];
        this.type = "point";
        this.id = Collider.lastId++;
    }
    getRigidBody() {
        return this.rigidBody;
    }
    setRigidBody(body) {
        this.rigidBody = body;
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
        return new romanpppmath__WEBPACK_IMPORTED_MODULE_0__.AABB([minX, minY, minZ], [maxX, maxY, maxZ]);
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
        return new romanpppmath__WEBPACK_IMPORTED_MODULE_0__.AABB([minX, minY, minZ], [maxX, maxY, maxZ]);
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
Box.points = [
    [-1 / 2, -1 / 2, -1 / 2],
    [1 / 2, -1 / 2, -1 / 2],
    [1 / 2, -1 / 2, 1 / 2],
    [-1 / 2, -1 / 2, 1 / 2],
    [-1 / 2, 1 / 2, -1 / 2],
    [1 / 2, 1 / 2, -1 / 2],
    [1 / 2, 1 / 2, 1 / 2],
    [-1 / 2, 1 / 2, 1 / 2],
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
        this.type = "sphere";
    }
    getAABB() {
        const { radius } = this;
        return new romanpppmath__WEBPACK_IMPORTED_MODULE_0__.AABB(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(this.pos, [-radius, -radius, -radius]), romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(this.pos, [radius, radius, radius]));
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
        return new romanpppmath__WEBPACK_IMPORTED_MODULE_0__.AABB(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(this.pos, [-radius, -height, -radius]), romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(this.pos, [radius, height, radius]));
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
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config */ "./src/physics/config.ts");


const { CONTACT_MANIFOLD_KEEP_TRESHOLD } = _config__WEBPACK_IMPORTED_MODULE_1__["default"];
class ContactManifold {
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
            if (romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.norm(deltaPA) > CONTACT_MANIFOLD_KEEP_TRESHOLD || romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.norm(deltaPB) > CONTACT_MANIFOLD_KEEP_TRESHOLD) {
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

/***/ "./src/physics/RigidBody.ts":
/*!**********************************!*\
  !*** ./src/physics/RigidBody.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player),
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
class Player extends RigidBody {
    constructor(collider) {
        super(collider);
        this.friction = 0.3;
    }
    applyImpulse(impulse, point) {
        this.velocity = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.sum(this.velocity, romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.scale(impulse, this.inverseMass));
    }
    applyPseudoImpulse(impulse) {
        this.pseudoVelocity = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.sum(this.pseudoVelocity, romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.scale(impulse, this.inverseMass));
    }
}



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
/* harmony import */ var _gjk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gjk */ "./src/physics/gjk.ts");
/* harmony import */ var _ContactManifold__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ContactManifold */ "./src/physics/ContactManifold.ts");
/* harmony import */ var _System__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./System */ "./src/physics/System.ts");
/* harmony import */ var _Constraints__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Constraints */ "./src/physics/Constraints.ts");





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
        this._objects = [];
        this._staticObjects = [];
        this.tree = new _Tree__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.staticTree = new _Tree__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.tree.setKey(rigidBody => rigidBody.getCollider().getId());
        this.staticTree.setKey(rigidBody => rigidBody.getCollider().getId());
        this.collisions = [];
        this.constraints = new Map();
        this.useCache = true;
        this.collisionManifolds = new Map();
    }
    addObject(object) {
        const { tree, objects, staticTree } = this;
        const aabb = object.getAABB();
        if (object.isStatic()) {
            this._staticObjects.push(object);
            staticTree.insert(object);
            object.onUpdate(() => {
                staticTree.remove(object.getCollider().getId());
                staticTree.insert(object);
            });
            return;
        }
        tree.insert(object);
        this._objects.push(object);
        object.onUpdate(() => {
            tree.remove(object.getCollider().getId());
            tree.insert(object);
        });
    }
    addConstraints(constraints, name) {
        this.constraints.set(name, [...constraints]);
    }
    addPositionConstraints(constraints, name) {
        this.positionConstraints.set(name, [...constraints]);
    }
    removeObject(object) {
        this.tree.remove(object.getCollider().getId());
    }
    updateCollisions() {
        const { collisionManifolds, tree, staticTree, objects } = this;
        let keep = 0;
        for (const [hash, manifold] of collisionManifolds) {
            manifold.update();
            if (!manifold.keep)
                collisionManifolds.delete(hash);
            keep++;
        }
        const collisions = tree._getCollisions();
        for (let i = 0, n = collisions.length; i < n; i++) {
            const pair = collisions[i];
            if (sameGroup(pair[0], pair[1]))
                continue;
            const hash = pairHash(pair[0].getCollider().getId(), pair[1].getCollider().getId());
            let manifold = this.collisionManifolds.get(hash);
            if (manifold)
                continue;
            const actualContacts = (0,_gjk__WEBPACK_IMPORTED_MODULE_1__.getContacts)(pair[0].getCollider(), pair[1].getCollider());
            if (actualContacts.length > 0) {
                manifold = new _ContactManifold__WEBPACK_IMPORTED_MODULE_2__["default"](actualContacts.map((c) => new _Constraints__WEBPACK_IMPORTED_MODULE_4__.ContactConstraint(pair[0], pair[1], c.raLocal, c.rbLocal, c.ra, c.rb, c.PA, c.PB, c.n, c.positionError, c.i, c.j)));
                this.collisionManifolds.set(hash, manifold);
            }
        }
        this._objects.forEach((body1) => {
            const collisions = staticTree.getCollisions(body1);
            //tree.elements.get(body1.getCollider().getId()).isChecked = true;
            if (collisions.length != 0)
                for (let j = 0, n = collisions.length; j < n; j++) {
                    const body2 = collisions[j];
                    if (sameGroup(body1, body2))
                        continue;
                    const hash = pairHash(body1.getCollider().getId(), body2.getCollider().getId());
                    let manifold = this.collisionManifolds.get(hash);
                    //if (manifold) continue;
                    if (manifold)
                        continue;
                    const actualContacts = (0,_gjk__WEBPACK_IMPORTED_MODULE_1__.getContacts)(body1.getCollider(), body2.getCollider());
                    if (actualContacts.length > 0) {
                        manifold = new _ContactManifold__WEBPACK_IMPORTED_MODULE_2__["default"](actualContacts.map((c) => new _Constraints__WEBPACK_IMPORTED_MODULE_4__.ContactConstraint(body1, body2, c.raLocal, c.rbLocal, c.ra, c.rb, c.PA, c.PB, c.n, c.positionError, c.i, c.j)));
                        this.collisionManifolds.set(hash, manifold);
                    }
                }
        });
        this.tree.setUnchecked();
        this.staticTree.setUnchecked();
    }
    tick(dt) {
        this.updateCollisions();
        const { objects, collisionManifolds } = this;
        this._objects.forEach((body) => body.integrateForces(dt));
        const system = new _System__WEBPACK_IMPORTED_MODULE_3__["default"]();
        system.useCache = this.useCache;
        const frictionSystem = new _System__WEBPACK_IMPORTED_MODULE_3__["default"](false);
        const contactEquations = [];
        const frictionEquations = [];
        for (let [key, manifold] of collisionManifolds) {
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
        this._objects.forEach((object) => object.updateInverseInertia());
        this._objects.forEach((object) => object.integrateVelocities(dt));
        let ndx = 0;
        /*
        for (const [key, manifold] of this.collisionManifolds) {
          
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
/* harmony import */ var romanpppmath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! romanpppmath */ "./node_modules/romanpppmath/lib/index.js");

const getBoundAabb = (aabb1, aabb2) => {
    const x1 = aabb1.min[0] < aabb2.min[0] ? aabb1.min[0] : aabb2.min[0];
    const x2 = aabb1.max[0] > aabb2.max[0] ? aabb1.max[0] : aabb2.max[0];
    const y1 = aabb1.min[1] < aabb2.min[1] ? aabb1.min[1] : aabb2.min[1];
    const y2 = aabb1.max[1] > aabb2.max[1] ? aabb1.max[1] : aabb2.max[1];
    const z1 = aabb1.min[2] < aabb2.min[2] ? aabb1.min[2] : aabb2.min[2];
    const z2 = aabb1.max[2] > aabb2.max[2] ? aabb1.max[2] : aabb2.max[2];
    return new romanpppmath__WEBPACK_IMPORTED_MODULE_0__.AABB([x1, y1, z1], [x2, y2, z2]);
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
            const size = getSize(potential.aabb);
            const combinedAABB = getBoundAabb(potential.aabb, leaf.aabb);
            const combinedSize = getSize(combinedAABB);
            let cost = combinedSize;
            let inherCost = combinedSize - size;
            let cost1;
            if (potential.left.isLeaf) {
                cost1 = getSize(potential.left.aabb) + inherCost;
            }
            else {
                cost1 =
                    getSize(getBoundAabb(leaf.aabb, potential.left.aabb)) -
                        getSize(potential.left.aabb) +
                        inherCost;
            }
            let cost2;
            if (potential.right.isLeaf) {
                cost2 = getSize(potential.right.aabb) + inherCost;
            }
            else {
                cost2 =
                    getSize(getBoundAabb(leaf.aabb, potential.right.aabb)) -
                        getSize(potential.right.aabb) +
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
        newParent.aabb = getBoundAabb(leaf.aabb, sibling.aabb);
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
            node.aabb = getBoundAabb(node.left.aabb, node.right.aabb);
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
            node.aabb = getBoundAabb(node.left.aabb, node.right.aabb);
            right.aabb = getBoundAabb(right.left.aabb, right.right.aabb);
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
            node.aabb = getBoundAabb(node.left.aabb, node.right.aabb);
            left.aabb = getBoundAabb(left.left.aabb, left.right.aabb);
            return left;
        }
        node.aabb = getBoundAabb(node.left.aabb, node.right.aabb);
        return node;
    }
    getCollisions(object) {
        const aabb = object.getAABB();
        const cols = [];
        // this.elements.get(this.getId(object)).queryId = this.queryId
        const iter = (_node) => {
            if (!_node) {
                return;
            }
            if (_node.object === object) {
                return;
            }
            if (isCollide(aabb, _node.aabb)) {
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
    _getCollisions() {
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
const isInClockwise = (points) => {
    if (points.length < 3)
        return 1;
    const [p1, p2, p3] = points;
    const det = p2[0] * p3[1] +
        p3[0] * p1[1] +
        p1[0] * p2[1] -
        p1[0] * p1[1] -
        p3[0] * p2[1] -
        p1[0] * p3[1];
    if (det < 0)
        return 1;
    return -1;
};
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

/***/ "./src/physics/gjk.ts":
/*!****************************!*\
  !*** ./src/physics/gjk.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clipPointsBehindPlane": () => (/* binding */ clipPointsBehindPlane),
/* harmony export */   "get2DcoordsOnPlane": () => (/* binding */ get2DcoordsOnPlane),
/* harmony export */   "getContacts": () => (/* binding */ getContacts),
/* harmony export */   "pointOnPlaneProjection": () => (/* binding */ pointOnPlaneProjection),
/* harmony export */   "rayVsPlaneIntersec": () => (/* binding */ rayVsPlaneIntersec)
/* harmony export */ });
/* harmony import */ var romanpppmath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! romanpppmath */ "./node_modules/romanpppmath/lib/index.js");
/* harmony import */ var _clipping__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clipping */ "./src/physics/clipping.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config */ "./src/physics/config.ts");


const { dot, cross, normalize, sum, diff, scale, isNull, norm } = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3;

const { CLIP_BIAS, GJK_MAX_ITERATIONS_NUM, EPA_BIAS } = _config__WEBPACK_IMPORTED_MODULE_2__["default"];
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
            return EPA(props.a, props.b, props.c, props.d, originsMap, coll1, coll2);
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
            const n = normalize(scale(face[3], -dot(p, search_dir)));
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
const gjkScope = {};
const _gjk = gjk.bind(gjkScope);
const getContacts = (coll1, coll2) => {
    const contactData = gjk(coll1, coll2);
    if (!contactData)
        return [];
    const { PA, PB, n, positionError } = contactData;
    if (coll1.getType() === "sphere" || coll2.getType() === "sphere") {
        const rb = diff(PB, coll2.getTranslation());
        const ra = diff(PA, coll1.getTranslation());
        const raLocal = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(coll1.getRmatrixInverse(), ra);
        const rbLocal = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(coll2.getRmatrixInverse(), rb);
        const i = [n[1] + n[2], n[2] - n[0], -n[0] - n[1]];
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
    const plane = [scale(sum(PA, PB), 0.5), n];
    const projections1 = contactFace1.vertices.map((p) => pointOnPlaneProjection(plane, p));
    const projections2 = contactFace2.vertices.map((p) => pointOnPlaneProjection(plane, p));
    const origin = plane[0];
    const i = normalize([n[1] + n[2], n[2] - n[0], -n[0] - n[1]]);
    const j = cross(scale(n, -1), i);
    let _2d1 = projections1.map((p) => get2DcoordsOnPlane(i, j, diff(p, origin)));
    let _2d2 = projections2.map((p) => get2DcoordsOnPlane(i, j, diff(p, origin)));
    const dir1 = (0,_clipping__WEBPACK_IMPORTED_MODULE_1__.isInClockwise)(_2d1);
    const dir2 = (0,_clipping__WEBPACK_IMPORTED_MODULE_1__.isInClockwise)(_2d2);
    if (dir1 < 0)
        _2d1 = _2d1.map((_, i) => _2d1.at(-i));
    if (dir2 < 0)
        _2d2 = _2d2.map((_, i) => _2d2.at(-i));
    const clipped = (0,_clipping__WEBPACK_IMPORTED_MODULE_1__.clipFaceVsFace)(_2d1, _2d2);
    const _3d = clipped.map((p) => sum(origin, sum(scale(i, p[0]), scale(j, p[1]))));
    const features = [];
    _3d.forEach((point) => {
        const PA = rayVsPlaneIntersec([contactFace1.vertices[0], contactFace1.normal], point, n);
        if (!isPointBehindPlane(plane, PA, 1))
            return;
        const PB = rayVsPlaneIntersec([contactFace2.vertices[0], contactFace2.normal], point, n);
        if (!isPointBehindPlane(plane, PB, -1))
            return;
        const rb = diff(PB, coll2.getTranslation());
        const ra = diff(PA, coll1.getTranslation());
        const positionError = -dot(diff(PB, PA), n);
        const raLocal = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(coll1.getRmatrixInverse(), ra);
        const rbLocal = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(coll2.getRmatrixInverse(), rb);
        features.push({
            ra, rb, n, PA, PB, positionError, i, j, raLocal, rbLocal
        });
    });
    if (features.length === 0) {
        const rb = diff(PB, coll2.getTranslation());
        const ra = diff(PA, coll1.getTranslation());
        const raLocal = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(coll1.getRmatrixInverse(), ra);
        const rbLocal = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(coll2.getRmatrixInverse(), rb);
        features.push({
            ra, rb, n, PA, PB, positionError, i, j, raLocal, rbLocal
        });
    }
    return features;
};



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
/* harmony import */ var romanpppgraphics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! romanpppgraphics */ "./node_modules/romanpppgraphics/lib/index.js");
/* harmony import */ var _textureShader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./textureShader */ "./demo/voxels/textureShader.ts");
/* harmony import */ var _src_misc_FreeCam__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../src/misc/FreeCam */ "./src/misc/FreeCam.js");
/* harmony import */ var _src_misc_keyInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../src/misc/keyInput */ "./src/misc/keyInput.js");
/* harmony import */ var _src_misc_mouseInput__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../src/misc/mouseInput */ "./src/misc/mouseInput.js");
/* harmony import */ var _VoxelWorld__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./VoxelWorld */ "./demo/voxels/VoxelWorld.js");
/* harmony import */ var _src_physics_RigidBody__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../src/physics/RigidBody */ "./src/physics/RigidBody.ts");
/* harmony import */ var _src_physics_Simulation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../src/physics/Simulation */ "./src/physics/Simulation.ts");
/* harmony import */ var _src_physics_Collider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../src/physics/Collider */ "./src/physics/Collider.ts");
/* harmony import */ var _src_physics_config__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../src/physics/config */ "./src/physics/config.ts");
/* harmony import */ var _src_physics_Debug__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../src/physics/Debug */ "./src/physics/Debug.ts");












const canvas = document.getElementById("canvas");
if (!canvas)
    throw "No canvas found";
const mouseInput = new _src_misc_mouseInput__WEBPACK_IMPORTED_MODULE_5__["default"](canvas);
mouseInput.listen();
const keyInput = new _src_misc_keyInput__WEBPACK_IMPORTED_MODULE_4__["default"]();
keyInput.listen();
const player = new _src_misc_FreeCam__WEBPACK_IMPORTED_MODULE_3__["default"]();
player.listenKeyboard(keyInput);
player.listenMouse(mouseInput);
player.camPos = [-10, 15, 20];
player.rotationX = -Math.PI * 0.1;
player.rotationY = -Math.PI * 0.1;
const gl = document.getElementById("canvas").getContext("webgl2");
const context = new romanpppgraphics__WEBPACK_IMPORTED_MODULE_1__.GLcontextWrapper(gl);
const { PrimitiveRenderer, Drawer, ProgramInfo, TextureInfo } = context;
context.resizeCanvasToDisplaySize();
const drawer = new Drawer();
drawer.projectionMatrix = Drawer.create3dProjectionMatrix(1, 2000, gl.canvas.width, gl.canvas.height);
const pointLightProgramInfo = new ProgramInfo(romanpppgraphics__WEBPACK_IMPORTED_MODULE_1__.pointLightShaders.vert, romanpppgraphics__WEBPACK_IMPORTED_MODULE_1__.pointLightShaders.frag);
pointLightProgramInfo.compileShaders().createUniformSetters();
const defaultProgramInfo = new ProgramInfo(romanpppgraphics__WEBPACK_IMPORTED_MODULE_1__.defaultShaders.vert, romanpppgraphics__WEBPACK_IMPORTED_MODULE_1__.defaultShaders.frag);
const textureProgramInfo = new ProgramInfo(_textureShader__WEBPACK_IMPORTED_MODULE_2__["default"].vert, _textureShader__WEBPACK_IMPORTED_MODULE_2__["default"].frag);
textureProgramInfo.compileShaders().createUniformSetters();
defaultProgramInfo.compileShaders().createUniformSetters();
const cube = PrimitiveRenderer.fromArrayData((0,romanpppgraphics__WEBPACK_IMPORTED_MODULE_1__.createBox)(1, 1, 1));
const point = new PrimitiveRenderer();
const line = new PrimitiveRenderer();
const texture1 = new TextureInfo();
texture1.createTextureFromURL("resources/atlas.png");
const settings = [
    { x: -1, y: 1, zRot: 0, magFilter: gl.NEAREST, minFilter: gl.NEAREST },
    { x: 0, y: 1, zRot: 0, magFilter: gl.LINEAR, minFilter: gl.LINEAR },
    {
        x: 1,
        y: 1,
        zRot: 0,
        magFilter: gl.LINEAR,
        minFilter: gl.NEAREST_MIPMAP_NEAREST,
    },
    {
        x: -1,
        y: -1,
        zRot: 1,
        magFilter: gl.LINEAR,
        minFilter: gl.LINEAR_MIPMAP_NEAREST,
    },
    {
        x: 0,
        y: -1,
        zRot: 1,
        magFilter: gl.LINEAR,
        minFilter: gl.NEAREST_MIPMAP_LINEAR,
    },
    {
        x: 1,
        y: -1,
        zRot: 1,
        magFilter: gl.LINEAR,
        minFilter: gl.LINEAR_MIPMAP_LINEAR,
    },
];
const s = settings[0];
gl.bindTexture(gl.TEXTURE_2D, texture1.texture);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, s.minFilter);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, s.magFilter);
cube
    .createVAO()
    .setDrawer(drawer)
    .setProgramInfo(pointLightProgramInfo)
    .setMode(4);
const sphere = PrimitiveRenderer.fromArrayData((0,romanpppgraphics__WEBPACK_IMPORTED_MODULE_1__.createSphere)(1, 10, 10));
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
    .bufferData("a_position", new Float32Array([1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1]))
    .setMode(3)
    .setNumElements(5);
line
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
    .setMode(3)
    .setNumElements(2);
const uniforms = {
    u_lightWorldPosition: [30, 50, 30],
    u_ambientLight: [1, 1, 0.3, 0.11],
    u_reverseLightDirection: [1, 0, 0],
    u_shininess: 300,
};
_src_physics_config__WEBPACK_IMPORTED_MODULE_10__["default"].RIGID_BODY_MOVE_TRESHOLD = 0.001;
_src_physics_config__WEBPACK_IMPORTED_MODULE_10__["default"].CONTACT_TRESHOLD = 0.00001;
_src_physics_config__WEBPACK_IMPORTED_MODULE_10__["default"].CLIP_BIAS = 0.01;
_src_physics_config__WEBPACK_IMPORTED_MODULE_10__["default"].CONTACT_MANIFOLD_KEEP_TRESHOLD = 0.001;
const sim = new _src_physics_Simulation__WEBPACK_IMPORTED_MODULE_8__["default"]();
const cellSize = 32;
const tileSize = 16;
const tileTextureWidth = 256;
const tileTextureHeight = 64;
const world = new _VoxelWorld__WEBPACK_IMPORTED_MODULE_6__["default"]({
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
                world.setVoxel(x, y, z, 1);
                const phs = new _src_physics_RigidBody__WEBPACK_IMPORTED_MODULE_7__.TerrainSegment(new _src_physics_Collider__WEBPACK_IMPORTED_MODULE_9__.Box(1, 1, 1));
                phs.translate([x + 0.5, y + 0.5, z + 0.5]);
                sim.addObject(phs);
            }
        }
    }
}
const chunkPrimitive = PrimitiveRenderer.fromArrayData(world.generateGeometryDataForCell(0, 0, 0));
chunkPrimitive
    .createVAO()
    .setDrawer(drawer)
    .setProgramInfo(textureProgramInfo)
    .setMode(4);
let objectsToDraw = [];
const e = [];
console.log(e);
for (let i = 0; i < 100; i++) {
    const box = {
        physics: new _src_physics_RigidBody__WEBPACK_IMPORTED_MODULE_7__.RigidBody(new _src_physics_Collider__WEBPACK_IMPORTED_MODULE_9__.Box(0.2, 1, 0.2)),
        sprite: cube,
        uniforms: { u_color: [Math.random(), Math.random(), Math.random(), 1] },
    };
    box.physics.translate([15 + (i % 5) * 3, 50 + 3.01 * (i % 3), 15]);
    //box.physics.translate([0,  1 + 3.01 * (i), 0]);
    box.physics.setMass(5);
    box.physics.addAcceleration([0, -9, 0]);
    sim.addObject(box.physics);
    objectsToDraw.push(box);
}
const box = {
    physics: new _src_physics_RigidBody__WEBPACK_IMPORTED_MODULE_7__.RigidBody(new _src_physics_Collider__WEBPACK_IMPORTED_MODULE_9__.Sphere(1)),
    sprite: sphere,
    uniforms: { u_color: [0, 0, 1, 1] },
};
box.physics.translate([10, 40, 10]);
box.physics.setMass(32);
box.physics.addAcceleration([0, -9, 0]);
box.physics.addVelocity([0, 0, 0]);
box.physics.addAngularVelocity([1, 1, 1]);
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
    sim.tick(0.015);
    const curentTime = Date.now();
    const delta = curentTime - lastCall;
    _src_physics_Debug__WEBPACK_IMPORTED_MODULE_11__["default"].data.FPS = Math.floor(Number((1 / delta) * 1000));
    _src_physics_Debug__WEBPACK_IMPORTED_MODULE_11__["default"].data.RUNTIME = (curentTime - startTime) / 1000;
    lastCall = curentTime;
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    const cameraMatrix = player.camMatrix;
    const { translation } = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m4.decompose(cameraMatrix);
    const u_viewWorldPosition = translation;
    objectsToDraw.forEach((obj) => {
        obj.sprite.draw(Object.assign(Object.assign(Object.assign({}, uniforms), { u_matrix: obj.physics.collider.getM4(), u_viewWorldPosition }), obj.uniforms), cameraMatrix);
    });
    chunkPrimitive.draw(Object.assign(Object.assign({}, uniforms), { u_matrix: romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m4.identity(), u_color: [0, 0, 0, 1], u_viewWorldPosition }), cameraMatrix);
    point.draw(Object.assign(Object.assign({}, uniforms), { u_matrix: romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m4.scaling(6, 6, 6), u_color: [0, 0, 0, 1], u_viewWorldPosition }), cameraMatrix);
    point.draw(Object.assign(Object.assign({}, uniforms), { u_matrix: romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m4.scale(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m4.zRotate(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m4.yRotation(Math.PI), -Math.PI / 2), 6, 6, 6), u_color: [1, 0.1, 1, 1], u_viewWorldPosition }), cameraMatrix);
    /*
      for (const [id, manifold] of sim.collisionManifolds) {
        manifold.contacts.forEach((contact) => {
          point
            .draw(
              {
                u_matrix: m4.translation(...contact.PA),
                u_color: [0.6, 0.6, 0.0, 1],
                ...uniforms,
                u_viewWorldPosition,
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
          /*line
            .bufferData(
              "a_position",
              new Float32Array([...contact.PA, ...v3.sum(contact.PA, contact.j)])
            )
            .draw(
              {
                u_matrix: m4.identity(),
                u_color: [0.5, 0.1, 0.2, 1],
              },
              cameraMatrix
            );
          line
            .bufferData(
              "a_position",
              new Float32Array([...contact.PA, ...v3.sum(contact.PA, contact.i)])
            )
            .draw(
              {
                u_matrix: m4.identity(),
                u_color: [0.9, 0.9, 0.2, 1],
              },
              cameraMatrix
            );
        });
      }*/
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    requestAnimationFrame(loop);
};
loop();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsS0FBSztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsY0FBYztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ3VCOzs7Ozs7Ozs7Ozs7Ozs7QUMvR3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZnZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDNlQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1RnJNO0FBQzFDO0FBQ21DO0FBQ2xEO0FBQ1A7QUFDZjtBQUNl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SztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsMkJBQTJCLGNBQWM7QUFDekMsMEJBQTBCLGNBQWM7QUFDeEMsS0FBSztBQUNMO0FBQ0EsaUVBQWUsRUFBRSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDMUlJO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxzQkFBc0IscURBQVksQ0FBQyxnREFBTztBQUMxQyxzQkFBc0IscURBQVksQ0FBQyxpREFBUTtBQUMzQyxzQkFBc0IscURBQVksQ0FBQyxpREFBUTtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLDJCQUEyQixjQUFjO0FBQ3pDLDBCQUEwQixjQUFjO0FBQ3hDLEtBQUs7QUFD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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksZUFBZTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxlQUFlO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksaUNBQWlDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSwwREFBMEQ7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksaUNBQWlDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQU9FOzs7Ozs7Ozs7Ozs7Ozs7QUNqWFk7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7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STtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMVZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsT0FBTztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxRQUFRO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMscUJBQXFCO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsT0FBTztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ21KOzs7Ozs7Ozs7Ozs7Ozs7QUNsSW5KO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsTUFBTSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDYmdCO0FBQ3FCO0FBQzNELFFBQVEsd0RBQXdELEVBQUUsNENBQUU7QUFDdEM7QUFDOUIsUUFBUSw4Q0FBOEMsRUFBRSwrQ0FBTTtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNEJBQTRCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLDZEQUFTLEtBQUsseURBQU07QUFDckM7QUFDQSxnQkFBZ0IsdUJBQXVCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsOERBQThEO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksb0VBQWM7QUFDbEIsSUFBSSx3RUFBa0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksY0FBYyxFQUFFLHNEQUFZO0FBQ3hDO0FBQ0E7QUFDQSxvRUFBb0UsZUFBZSw2REFBNkQ7QUFDaEosS0FBSztBQUNMLHNEQUFzRCxlQUFlLFVBQVUscURBQVcsZ0RBQWdEO0FBQzFJLDZDQUE2QyxlQUFlLFVBQVUsb0RBQVUsdURBQXVEO0FBQ3ZJLDZDQUE2QyxlQUFlLFVBQVUsa0RBQVEsQ0FBQyxvREFBVSxDQUFDLHNEQUFZLGtGQUFrRjtBQUN4TDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9kZW1vL3ZveGVscy9Wb3hlbFdvcmxkLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL2NvbXBvbmVudHMvQnVmZmVyQXR0cmlidXRlLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL2NvbXBvbmVudHMvRHJhd2VyLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL2NvbXBvbmVudHMvR0xXcmFwcGVyLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL2NvbXBvbmVudHMvR2x0ZlV0aWxzLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL2NvbXBvbmVudHMvTWVzaFJlbmRlcmVyLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL2NvbXBvbmVudHMvTW9kZWwuanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBncmFwaGljcy9saWIvY29tcG9uZW50cy9QcmltaXRpdmVSZW5kZXJlci5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcGdyYXBoaWNzL2xpYi9jb21wb25lbnRzL1ByaW1pdGl2ZXMuanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBncmFwaGljcy9saWIvY29tcG9uZW50cy9Qcm9ncmFtSW5mby5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcGdyYXBoaWNzL2xpYi9jb21wb25lbnRzL1RleHR1cmVJbmZvLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL2NvbXBvbmVudHMvYXR0cmliVHlwZVByb3BzLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL2NvbXBvbmVudHMvZW51bXMuanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBncmFwaGljcy9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBncmFwaGljcy9saWIvcmVuZGVyL3NoYWRlcnMvZGVmYXVsdC9mcmFnLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL3JlbmRlci9zaGFkZXJzL2RlZmF1bHQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBncmFwaGljcy9saWIvcmVuZGVyL3NoYWRlcnMvZGVmYXVsdC92ZXJ0LmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL3JlbmRlci9zaGFkZXJzL2luZGV4LmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL3JlbmRlci9zaGFkZXJzL3BvaW50TGlnaHQvZnJhZy5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcGdyYXBoaWNzL2xpYi9yZW5kZXIvc2hhZGVycy9wb2ludExpZ2h0L2luZGV4LmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL3JlbmRlci9zaGFkZXJzL3BvaW50TGlnaHQvdmVydC5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcG1hdGgvbGliL09jdHJlZS5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcG1hdGgvbGliL2FhYmIuanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBtYXRoL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcG1hdGgvbGliL20zLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwbWF0aC9saWIvbTQuanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBtYXRoL2xpYi92My5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL2RlbW8vdm94ZWxzL3RleHR1cmVTaGFkZXIudHMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9zcmMvcGh5c2ljcy9Db2xsaWRlci50cyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL3NyYy9waHlzaWNzL0NvbnN0cmFpbnRzLnRzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL3BoeXNpY3MvQ29udGFjdE1hbmlmb2xkLnRzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL3BoeXNpY3MvRGVidWcudHMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9zcmMvcGh5c2ljcy9FcXVhdGlvbnMudHMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9zcmMvcGh5c2ljcy9FdmVudEVtaXR0ZXIudHMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9zcmMvcGh5c2ljcy9SaWdpZEJvZHkudHMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9zcmMvcGh5c2ljcy9TaW11bGF0aW9uLnRzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL3BoeXNpY3MvU3lzdGVtLnRzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL3BoeXNpY3MvVHJlZS50cyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL3NyYy9waHlzaWNzL2NsaXBwaW5nLnRzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL3BoeXNpY3MvY29uZmlnLnRzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL3BoeXNpY3MvZ2prLnRzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL21pc2MvRnJlZUNhbS5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL3NyYy9taXNjL2tleUlucHV0LmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL21pc2MvbW91c2VJbnB1dC5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vZGVtby92b3hlbHMvdm94ZWxzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1vZCA9IChuLCBtKSA9PiAoKG4gJSBtKSArIG0pICUgbTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZveGVsV29ybGQge1xyXG4gIHN0YXRpYyBmYWNlcyA9W1xyXG4gICAgeyAvLyBsZWZ0XHJcbiAgICAgIHV2Um93OiAwLFxyXG4gICAgICBkaXI6IFsgLTEsICAwLCAgMCwgXSxcclxuICAgICAgY29ybmVyczogW1xyXG4gICAgICAgIHsgcG9zOiBbIDAsIDEsIDAgXSwgdXY6IFsgMCwgMSBdLCB9LFxyXG4gICAgICAgIHsgcG9zOiBbIDAsIDAsIDAgXSwgdXY6IFsgMCwgMCBdLCB9LFxyXG4gICAgICAgIHsgcG9zOiBbIDAsIDEsIDEgXSwgdXY6IFsgMSwgMSBdLCB9LFxyXG4gICAgICAgIHsgcG9zOiBbIDAsIDAsIDEgXSwgdXY6IFsgMSwgMCBdLCB9LFxyXG4gICAgICBdLFxyXG4gICAgfSxcclxuICAgIHsgLy8gcmlnaHRcclxuICAgICAgdXZSb3c6IDAsXHJcbiAgICAgIGRpcjogWyAgMSwgIDAsICAwLCBdLFxyXG4gICAgICBjb3JuZXJzOiBbXHJcbiAgICAgICAgeyBwb3M6IFsgMSwgMSwgMSBdLCB1djogWyAwLCAxIF0sIH0sXHJcbiAgICAgICAgeyBwb3M6IFsgMSwgMCwgMSBdLCB1djogWyAwLCAwIF0sIH0sXHJcbiAgICAgICAgeyBwb3M6IFsgMSwgMSwgMCBdLCB1djogWyAxLCAxIF0sIH0sXHJcbiAgICAgICAgeyBwb3M6IFsgMSwgMCwgMCBdLCB1djogWyAxLCAwIF0sIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAgeyAvLyBib3R0b21cclxuICAgICAgdXZSb3c6IDEsXHJcbiAgICAgIGRpcjogWyAgMCwgLTEsICAwLCBdLFxyXG4gICAgICBjb3JuZXJzOiBbXHJcbiAgICAgICAgeyBwb3M6IFsgMSwgMCwgMSBdLCB1djogWyAxLCAwIF0sIH0sXHJcbiAgICAgICAgeyBwb3M6IFsgMCwgMCwgMSBdLCB1djogWyAwLCAwIF0sIH0sXHJcbiAgICAgICAgeyBwb3M6IFsgMSwgMCwgMCBdLCB1djogWyAxLCAxIF0sIH0sXHJcbiAgICAgICAgeyBwb3M6IFsgMCwgMCwgMCBdLCB1djogWyAwLCAxIF0sIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAgeyAvLyB0b3BcclxuICAgICAgdXZSb3c6IDIsXHJcbiAgICAgIGRpcjogWyAgMCwgIDEsICAwLCBdLFxyXG4gICAgICBjb3JuZXJzOiBbXHJcbiAgICAgICAgeyBwb3M6IFsgMCwgMSwgMSBdLCB1djogWyAxLCAxIF0sIH0sXHJcbiAgICAgICAgeyBwb3M6IFsgMSwgMSwgMSBdLCB1djogWyAwLCAxIF0sIH0sXHJcbiAgICAgICAgeyBwb3M6IFsgMCwgMSwgMCBdLCB1djogWyAxLCAwIF0sIH0sXHJcbiAgICAgICAgeyBwb3M6IFsgMSwgMSwgMCBdLCB1djogWyAwLCAwIF0sIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAgeyAvLyBiYWNrXHJcbiAgICAgIHV2Um93OiAwLFxyXG4gICAgICBkaXI6IFsgIDAsICAwLCAtMSwgXSxcclxuICAgICAgY29ybmVyczogW1xyXG4gICAgICAgIHsgcG9zOiBbIDEsIDAsIDAgXSwgdXY6IFsgMCwgMCBdLCB9LFxyXG4gICAgICAgIHsgcG9zOiBbIDAsIDAsIDAgXSwgdXY6IFsgMSwgMCBdLCB9LFxyXG4gICAgICAgIHsgcG9zOiBbIDEsIDEsIDAgXSwgdXY6IFsgMCwgMSBdLCB9LFxyXG4gICAgICAgIHsgcG9zOiBbIDAsIDEsIDAgXSwgdXY6IFsgMSwgMSBdLCB9LFxyXG4gICAgICBdLFxyXG4gICAgfSxcclxuICAgIHsgLy8gZnJvbnRcclxuICAgICAgdXZSb3c6IDAsXHJcbiAgICAgIGRpcjogWyAgMCwgIDAsICAxLCBdLFxyXG4gICAgICBjb3JuZXJzOiBbXHJcbiAgICAgICAgeyBwb3M6IFsgMCwgMCwgMSBdLCB1djogWyAwLCAwIF0sIH0sXHJcbiAgICAgICAgeyBwb3M6IFsgMSwgMCwgMSBdLCB1djogWyAxLCAwIF0sIH0sXHJcbiAgICAgICAgeyBwb3M6IFsgMCwgMSwgMSBdLCB1djogWyAwLCAxIF0sIH0sXHJcbiAgICAgICAgeyBwb3M6IFsgMSwgMSwgMSBdLCB1djogWyAxLCAxIF0sIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gIF07XHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgdGhpcy5jZWxsU2l6ZSA9IG9wdGlvbnMuY2VsbFNpemU7XHJcbiAgICB0aGlzLnRpbGVTaXplID0gb3B0aW9ucy50aWxlU2l6ZTtcclxuICAgIHRoaXMudGlsZVRleHR1cmVXaWR0aCA9IG9wdGlvbnMudGlsZVRleHR1cmVXaWR0aDtcclxuICAgIHRoaXMudGlsZVRleHR1cmVIZWlnaHQgPSBvcHRpb25zLnRpbGVUZXh0dXJlSGVpZ2h0O1xyXG4gICAgY29uc3Qge2NlbGxTaXplfSA9IHRoaXM7XHJcbiAgICB0aGlzLmNlbGxTbGljZVNpemUgPSBjZWxsU2l6ZSAqIGNlbGxTaXplO1xyXG4gICAgdGhpcy5jZWxscyA9IHt9XHJcbiAgfVxyXG4gIGNvbXB1dGVDZWxsSWQoeCwgeSwgeikge1xyXG4gICAgY29uc3Qge2NlbGxTaXplfSA9IHRoaXM7XHJcbiAgICBjb25zdCBjZWxsWCA9IE1hdGguZmxvb3IoeCAvIGNlbGxTaXplKTtcclxuICAgIGNvbnN0IGNlbGxZID0gTWF0aC5mbG9vcih5IC8gY2VsbFNpemUpO1xyXG4gICAgY29uc3QgY2VsbFogPSBNYXRoLmZsb29yKHogLyBjZWxsU2l6ZSk7XHJcbiAgICByZXR1cm4gYCR7Y2VsbFh9LCR7Y2VsbFl9LCR7Y2VsbFp9YDtcclxuICB9XHJcbiAgY29tcHV0ZVZveGVsT2Zmc2V0KHgsIHksIHopIHtcclxuICAgIGNvbnN0IHsgY2VsbFNpemUsIGNlbGxTbGljZVNpemUgfSA9IHRoaXM7XHJcbiAgICBjb25zdCB2b3hlbFggPSBtb2QoeCwgY2VsbFNpemUpO1xyXG4gICAgY29uc3Qgdm94ZWxZID0gbW9kKHksIGNlbGxTaXplKTtcclxuICAgIGNvbnN0IHZveGVsWiA9IG1vZCh6LCBjZWxsU2l6ZSk7XHJcbiAgICByZXR1cm4gdm94ZWxZICogY2VsbFNsaWNlU2l6ZSArIHZveGVsWiAqIGNlbGxTaXplICsgdm94ZWxYO1xyXG4gIH1cclxuICBnZXRDZWxsRm9yVm94ZWwoeCwgeSwgeikge1xyXG4gICAgcmV0dXJuIHRoaXMuY2VsbHNbdGhpcy5jb21wdXRlQ2VsbElkKHgsIHksIHopXTtcclxuICB9XHJcbiAgZ2V0Vm94ZWwoeCwgeSwgeikge1xyXG4gICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0Q2VsbEZvclZveGVsKHgsIHksIHopO1xyXG4gICAgaWYgKCFjZWxsKSB7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgdm94ZWxPZmZzZXQgPSB0aGlzLmNvbXB1dGVWb3hlbE9mZnNldCh4LCB5LCB6KTtcclxuICAgIHJldHVybiBjZWxsW3ZveGVsT2Zmc2V0XTtcclxuICB9XHJcbiAgc2V0Vm94ZWwoeCwgeSwgeiwgdikge1xyXG4gICAgbGV0IGNlbGwgPSB0aGlzLmdldENlbGxGb3JWb3hlbCh4LCB5LCB6KTtcclxuXHJcbiAgICBpZiAoIWNlbGwpIHtcclxuICAgICAgY2VsbCA9IHRoaXMuYWRkQ2VsbEZvclZveGVsKHgsIHksIHopXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgdm94ZWxPZmZzZXQgPSB0aGlzLmNvbXB1dGVWb3hlbE9mZnNldCh4LCB5LCB6KTtcclxuICAgIGNlbGxbdm94ZWxPZmZzZXRdID0gdjtcclxuICB9XHJcbiAgYWRkQ2VsbEZvclZveGVsKHgsIHksIHopIHtcclxuICAgIGNvbnN0IGNlbGxJZCA9IHRoaXMuY29tcHV0ZUNlbGxJZCh4LCB5LCB6KTtcclxuICAgIGxldCBjZWxsID0gdGhpcy5jZWxsc1tjZWxsSWRdO1xyXG4gICAgaWYgKCFjZWxsKSB7XHJcbiAgICAgIGNvbnN0IHtjZWxsU2l6ZX0gPSB0aGlzO1xyXG4gICAgICBjZWxsID0gbmV3IFVpbnQ4QXJyYXkoY2VsbFNpemUgKiBjZWxsU2l6ZSAqIGNlbGxTaXplKTtcclxuICAgICAgdGhpcy5jZWxsc1tjZWxsSWRdID0gY2VsbDtcclxuICAgIH1cclxuICAgIHJldHVybiBjZWxsO1xyXG4gIH1cclxuICBnZW5lcmF0ZUdlb21ldHJ5RGF0YUZvckNlbGwoY2VsbFgsIGNlbGxZLCBjZWxsWikge1xyXG4gICAgY29uc3QgeyBjZWxsU2l6ZSwgdGlsZVNpemUsIHRpbGVUZXh0dXJlV2lkdGgsIHRpbGVUZXh0dXJlSGVpZ2h0IH0gPSB0aGlzO1xyXG4gICAgY29uc3QgcG9zaXRpb25zID0gW107XHJcbiAgICBjb25zdCBub3JtYWxzID0gW107XHJcbiAgICBjb25zdCBpbmRpY2VzID0gW107XHJcbiAgICBjb25zdCB1dnMgPSBbXTtcclxuICAgIGNvbnN0IHN0YXJ0WCA9IGNlbGxYICogY2VsbFNpemU7XHJcbiAgICBjb25zdCBzdGFydFkgPSBjZWxsWSAqIGNlbGxTaXplO1xyXG4gICAgY29uc3Qgc3RhcnRaID0gY2VsbFogKiBjZWxsU2l6ZTtcclxuXHJcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGNlbGxTaXplOyArK3kpIHtcclxuICAgICAgY29uc3Qgdm94ZWxZID0gc3RhcnRZICsgeTtcclxuICAgICAgZm9yIChsZXQgeiA9IDA7IHogPCBjZWxsU2l6ZTsgKyt6KSB7XHJcbiAgICAgICAgY29uc3Qgdm94ZWxaID0gc3RhcnRaICsgejtcclxuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IGNlbGxTaXplOyArK3gpIHtcclxuICAgICAgICAgIGNvbnN0IHZveGVsWCA9IHN0YXJ0WCArIHg7XHJcbiAgICAgICAgICBjb25zdCB2b3hlbCA9IHRoaXMuZ2V0Vm94ZWwodm94ZWxYLCB2b3hlbFksIHZveGVsWik7XHJcblxyXG4gICAgICAgICAgaWYgKHZveGVsKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHV2Vm94ZWwgPSB2b3hlbCAtIDE7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgeyBkaXIsIGNvcm5lcnMsIHV2Um93IH0gb2YgVm94ZWxXb3JsZC5mYWNlcykge1xyXG4gICAgICAgICAgICAgIGNvbnN0IG5laWdoYm9yID0gdGhpcy5nZXRWb3hlbChcclxuICAgICAgICAgICAgICAgIHZveGVsWCArIGRpclswXSxcclxuICAgICAgICAgICAgICAgIHZveGVsWSArIGRpclsxXSxcclxuICAgICAgICAgICAgICAgIHZveGVsWiArIGRpclsyXVxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgaWYgKCFuZWlnaGJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmR4ID0gcG9zaXRpb25zLmxlbmd0aCAvIDM7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHsgcG9zLCB1diB9IG9mIGNvcm5lcnMpIHtcclxuICAgICAgICAgICAgICAgICAgcG9zaXRpb25zLnB1c2gocG9zWzBdICsgeCwgcG9zWzFdICsgeSwgcG9zWzJdICsgeik7XHJcbiAgICAgICAgICAgICAgICAgIG5vcm1hbHMucHVzaCguLi5kaXIpO1xyXG4gICAgICAgICAgICAgICAgICB1dnMucHVzaChcclxuICAgICAgICAgICAgICAgICAgICAoKHV2Vm94ZWwgKyB1dlswXSkgKiB0aWxlU2l6ZSkgLyB0aWxlVGV4dHVyZVdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIDEgLSAoKHV2Um93ICsgMSAtIHV2WzFdKSAqIHRpbGVTaXplKSAvIHRpbGVUZXh0dXJlSGVpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpbmRpY2VzLnB1c2gobmR4LCBuZHggKyAxLCBuZHggKyAyLCBuZHggKyAyLCBuZHggKyAxLCBuZHggKyAzKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IF9ub3JtYWxzID0gbmV3IEZsb2F0MzJBcnJheShub3JtYWxzKTtcclxuICAgIGNvbnN0IF9wb3NpdGlvbnMgPSBuZXcgRmxvYXQzMkFycmF5KHBvc2l0aW9ucyk7XHJcbiAgICBjb25zdCBfaW5kaWNlcyA9IG5ldyBVaW50MTZBcnJheShpbmRpY2VzKTtcclxuICAgIGNvbnN0IF90ZXhjb29yZCA9IG5ldyBGbG9hdDMyQXJyYXkodXZzKVxyXG4gICAgY29uc3QgQXJyYXlEYXRhID0ge1xyXG4gICAgICBhdHRyaWJ1dGVzOiB7XHJcbiAgICAgICAgTk9STUFMOiB7XHJcbiAgICAgICAgICBkYXRhOiBfbm9ybWFscyxcclxuICAgICAgICAgIGNvdW50OiBub3JtYWxzLmxlbmd0aCxcclxuICAgICAgICAgIGxvY2F0aW9uOiAxLFxyXG4gICAgICAgICAgYnl0ZUxlbmd0aDogX25vcm1hbHMuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgIHN0cmlkZTogMCxcclxuICAgICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICAgIG51bUNvbXBvbmVudHM6IDMsXHJcbiAgICAgICAgICBhdHRyaWJ1dGVUeXBlIDogV2ViR0wyUmVuZGVyaW5nQ29udGV4dC5GTE9BVF9WRUMzLFxyXG4gICAgICAgICAgdHlwZTogNTEyNixcclxuICAgICAgICB9LFxyXG4gICAgICAgIFBPU0lUSU9OOiB7XHJcbiAgICAgICAgICBkYXRhOiBfcG9zaXRpb25zLFxyXG4gICAgICAgICAgY291bnQ6IHBvc2l0aW9ucy5sZW5ndGgsXHJcbiAgICAgICAgICBsb2NhdGlvbjogMCxcclxuICAgICAgICAgIGJ5dGVMZW5ndGg6IF9wb3NpdGlvbnMuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgIHN0cmlkZTogMCxcclxuICAgICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICAgIG51bUNvbXBvbmVudHM6IDMsXHJcbiAgICAgICAgICBhdHRyaWJ1dGVUeXBlIDogV2ViR0wyUmVuZGVyaW5nQ29udGV4dC5GTE9BVF9WRUMzLFxyXG4gICAgICAgICAgdHlwZTogNTEyNixcclxuICAgICAgICB9LFxyXG4gICAgICAgIFRFWENPT1JEXzA6IHtcclxuICAgICAgICAgICAgZGF0YTogX3RleGNvb3JkLFxyXG4gICAgICAgICAgICBjb3VudDogdXZzLmxlbmd0aCxcclxuICAgICAgICAgICAgdHlwZTogNTEyNixcclxuICAgICAgICAgICAgb2Zmc2V0OiAwLFxyXG4gICAgICAgICAgICBzdHJpZGU6IDAsXHJcbiAgICAgICAgICAgIGJ5dGVMZW5ndGg6IF90ZXhjb29yZC5ieXRlTGVuZ3RoLFxyXG4gICAgICAgICAgICBsb2NhdGlvbjogMixcclxuICAgICAgICAgICAgbnVtQ29tcG9uZW50czogMixcclxuICAgICAgICAgICAgYXR0cmlidXRlVHlwZSA6IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQuRkxPQVRfVkVDMixcclxuICAgICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIGluZGljZXM6IF9pbmRpY2VzLFxyXG4gICAgICBudW1FbGVtZW50czogaW5kaWNlcy5sZW5ndGgsXHJcbiAgICAgIGNvbXBvbmVudFR5cGU6IDUxMjMsXHJcbiAgICAgIG1vZGU6IDQsXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBBcnJheURhdGE7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEZMT0FULCBGTE9BVF9NQVQyLCBGTE9BVF9NQVQzLCBGTE9BVF9NQVQ0LCBGTE9BVF9WRUMyLCBJTlQsIEZMT0FUX1ZFQzMsIEZMT0FUX1ZFQzQsIFVOU0lHTkVEX0lOVCwgVU5TSUdORURfSU5UX1ZFQzIsIFVOU0lHTkVEX0lOVF9WRUMzLCBVTlNJR05FRF9JTlRfVkVDNCwgSU5UX1ZFQzIsIElOVF9WRUMzLCBJTlRfVkVDNCwgQk9PTCwgQk9PTF9WRUMyLCBCT09MX1ZFQzMsIEJPT0xfVkVDNCwgfSBmcm9tIFwiLi9lbnVtc1wiO1xyXG5jb25zdCB0eXBlSW5mbyA9IHtcclxuICAgIFtGTE9BVF9NQVQ0XTogeyBzaXplOiA2NCwgcm93czogNCwgY29sczogNCB9LFxyXG4gICAgW0ZMT0FUX01BVDJdOiB7IHNpemU6IDMyLCByb3dzOiAyLCBjb2xzOiAyIH0sXHJcbiAgICBbRkxPQVRfTUFUM106IHsgc2l6ZTogNDgsIHJvd3M6IDMsIGNvbHM6IDMgfSxcclxufTtcclxuY29uc3QgZmxvYXRBdHRyaWJTZXR0ZXIgPSAoeyBudW1Db21wb25lbnRzLCB0eXBlLCBsb2NhdGlvbiwgc3RyaWRlLCBvZmZzZXQsIGJ1ZmZlciwgZ2wsIGRpdmlzb3IsIG5vcm1hbGl6ZSwgfSkgPT4ge1xyXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGJ1ZmZlcik7XHJcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShsb2NhdGlvbik7XHJcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGxvY2F0aW9uLCBudW1Db21wb25lbnRzLCB0eXBlIHx8IGdsLkZMT0FULCBub3JtYWxpemUgfHwgZmFsc2UsIHN0cmlkZSB8fCAwLCBvZmZzZXQgfHwgMCk7XHJcbiAgICBnbC52ZXJ0ZXhBdHRyaWJEaXZpc29yKGxvY2F0aW9uLCBkaXZpc29yIHx8IDApO1xyXG59O1xyXG5jb25zdCBtYXRBdHRyaWJTZXR0ZXIgPSAoeyBudW1Db21wb25lbnRzLCB0eXBlLCBsb2NhdGlvbiwgb2Zmc2V0LCBidWZmZXIsIGdsLCBkaXZpc29yLCBub3JtYWxpemUsIGF0dHJpYnV0ZVR5cGUsIH0pID0+IHtcclxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBidWZmZXIpO1xyXG4gICAgY29uc3Qgc3RyaWRlID0gdHlwZUluZm9bYXR0cmlidXRlVHlwZV0uc2l6ZTtcclxuICAgIGNvbnN0IGNvdW50ID0gdHlwZUluZm9bYXR0cmlidXRlVHlwZV0ucm93cztcclxuICAgIGNvbnN0IHJvd09mZnNldCA9IHN0cmlkZSAvIGNvdW50O1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkobG9jYXRpb24gKyBpKTtcclxuICAgICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGxvY2F0aW9uLCBudW1Db21wb25lbnRzLCB0eXBlIHwgZ2wuRkxPQVQsIGZhbHNlLCBzdHJpZGUgfCAwLCBvZmZzZXQgKyByb3dPZmZzZXQgKiBpKTtcclxuICAgICAgICBnbC52ZXJ0ZXhBdHRyaWJEaXZpc29yKGxvY2F0aW9uICsgaSwgZGl2aXNvciB8fCAwKTtcclxuICAgIH1cclxufTtcclxuY29uc3QgaW50QXR0cmliU2V0dGVyID0gKHsgbnVtQ29tcG9uZW50cywgdHlwZSwgbG9jYXRpb24sIHN0cmlkZSwgb2Zmc2V0LCBidWZmZXIsIGdsLCBkaXZpc29yLCB9KSA9PiB7XHJcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgYnVmZmVyKTtcclxuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGxvY2F0aW9uKTtcclxuICAgIGdsLnZlcnRleEF0dHJpYklQb2ludGVyKGxvY2F0aW9uLCBudW1Db21wb25lbnRzLCB0eXBlIHx8IGdsLklOVCwgc3RyaWRlIHx8IDAsIG9mZnNldCB8fCAwKTtcclxuICAgIGdsLnZlcnRleEF0dHJpYkRpdmlzb3IobG9jYXRpb24sIGRpdmlzb3IgfHwgMCk7XHJcbn07XHJcbmNvbnN0IGF0dHJpYlR5cGVNYXAgPSB7fTtcclxuYXR0cmliVHlwZU1hcFtJTlRdID0gaW50QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW0ZMT0FUXSA9IGZsb2F0QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW0ZMT0FUX1ZFQzJdID0gZmxvYXRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbRkxPQVRfVkVDM10gPSBmbG9hdEF0dHJpYlNldHRlcjtcclxuYXR0cmliVHlwZU1hcFtGTE9BVF9WRUM0XSA9IGZsb2F0QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW0ZMT0FUX01BVDJdID0gbWF0QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW0ZMT0FUX01BVDNdID0gbWF0QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW0ZMT0FUX01BVDRdID0gbWF0QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW1VOU0lHTkVEX0lOVF0gPSBpbnRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbVU5TSUdORURfSU5UX1ZFQzJdID0gaW50QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW1VOU0lHTkVEX0lOVF9WRUMzXSA9IGludEF0dHJpYlNldHRlcjtcclxuYXR0cmliVHlwZU1hcFtVTlNJR05FRF9JTlRfVkVDM10gPSBpbnRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbVU5TSUdORURfSU5UX1ZFQzRdID0gaW50QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW0lOVF9WRUMyXSA9IGludEF0dHJpYlNldHRlcjtcclxuYXR0cmliVHlwZU1hcFtJTlRfVkVDM10gPSBpbnRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbSU5UX1ZFQzRdID0gaW50QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW0JPT0xdID0gaW50QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW0JPT0xfVkVDMl0gPSBpbnRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbQk9PTF9WRUMzXSA9IGludEF0dHJpYlNldHRlcjtcclxuYXR0cmliVHlwZU1hcFtCT09MX1ZFQzRdID0gaW50QXR0cmliU2V0dGVyO1xyXG5jbGFzcyBCdWZmZXJBdHRyaWJ1dGVJbmZvIHtcclxuICAgIGNvbnN0cnVjdG9yKGdsLCB7IHN0cmlkZSwgdHlwZSwgb2Zmc2V0LCBsb2NhdGlvbiwgbnVtQ29tcG9uZW50cywgYXR0cmlidXRlVHlwZSwgZGl2aXNvciB9KSB7XHJcbiAgICAgICAgdGhpcy5nbCA9IGdsO1xyXG4gICAgICAgIHRoaXMuYnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XHJcbiAgICAgICAgdGhpcy5zdHJpZGUgPSBzdHJpZGUgfCAwO1xyXG4gICAgICAgIHRoaXMubnVtQ29tcG9uZW50cyA9IG51bUNvbXBvbmVudHM7XHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVUeXBlID0gYXR0cmlidXRlVHlwZTtcclxuICAgICAgICB0aGlzLm9mZnNldCA9IG9mZnNldCB8IDA7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb247XHJcbiAgICAgICAgdGhpcy5kaXZpc29yID0gZGl2aXNvcjtcclxuICAgIH1cclxuICAgIHNldEF0dHJpYnV0ZSgpIHtcclxuICAgICAgICBjb25zdCB7IGF0dHJpYnV0ZVR5cGUgfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3Qgc2V0dGVyID0gYXR0cmliVHlwZU1hcFthdHRyaWJ1dGVUeXBlXTtcclxuICAgICAgICBzZXR0ZXIodGhpcyk7XHJcbiAgICB9XHJcbiAgICBidWZmZXJEYXRhKGRhdGEsIHVzYWdlID0gMHg4OGU0KSB7XHJcbiAgICAgICAgY29uc3QgeyBnbCwgYnVmZmVyIH0gPSB0aGlzO1xyXG4gICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBidWZmZXIpO1xyXG4gICAgICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBkYXRhLCB1c2FnZSk7XHJcbiAgICB9XHJcbiAgICBhbGxvY0J1ZmZlcihieXRlTGVuZ3RoLCB1c2FnZSA9IDB4ODhlNCkge1xyXG4gICAgICAgIGNvbnN0IHsgZ2wsIGJ1ZmZlciB9ID0gdGhpcztcclxuICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgYnVmZmVyKTtcclxuICAgICAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgYnl0ZUxlbmd0aCwgdXNhZ2UpO1xyXG4gICAgfVxyXG4gICAgYnVmZmVyU3ViRGF0YShkYXRhLCBvZmZzZXQgPSAwKSB7XHJcbiAgICAgICAgY29uc3QgeyBnbCwgYnVmZmVyIH0gPSB0aGlzO1xyXG4gICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBidWZmZXIpO1xyXG4gICAgICAgIGdsLmJ1ZmZlclN1YkRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBvZmZzZXQsIGRhdGEpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7IEJ1ZmZlckF0dHJpYnV0ZUluZm8gfTtcclxuIiwiaW1wb3J0IHsgbTQgfSBmcm9tIFwicm9tYW5wcHBtYXRoXCI7XHJcbmNvbnN0IGRlZ1RvUmFkID0gKGQpID0+IChkICogTWF0aC5QSSkgLyAxODA7XHJcbmNvbnN0IGZpZWxkT2ZWaWV3UmFkaWFucyA9IGRlZ1RvUmFkKDkwKTtcclxuY2xhc3MgRHJhd2VyIHtcclxuICAgIHN0YXRpYyBjcmVhdGUzZFByb2plY3Rpb25NYXRyaXgoek5lYXIsIHpGYXIsIGNsaWVudFdpZHRoLCBjbGllbnRIZWlnaHQpIHtcclxuICAgICAgICBjb25zdCBhc3BlY3QgPSBjbGllbnRXaWR0aCAvIGNsaWVudEhlaWdodDtcclxuICAgICAgICByZXR1cm4gbTQucGVyc3BlY3RpdmUoZmllbGRPZlZpZXdSYWRpYW5zLCBhc3BlY3QsIHpOZWFyLCB6RmFyKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcclxuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG4gICAgICAgIHRoaXMucHJvamVjdGlvbk1hdHJpeCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBzZXRDb250ZXh0KGdsQ29udGV4dFdyYXBwZXIpIHtcclxuICAgICAgICB0aGlzLmNvbnRleHQgPSBnbENvbnRleHRXcmFwcGVyO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgZHJhdyhwcmltaXRpdmVSZW5kZXJlciwgdW5pZm9ybXMsIGNhbWVyYU1hdHJpeCkge1xyXG4gICAgICAgIGNvbnN0IHsgVkFPLCBtb2RlLCBvZmZzZXQsIG51bUVsZW1lbnRzLCBpbmRpY2VzLCBwcm9ncmFtSW5mbywgY29tcG9uZW50VHlwZSwgfSA9IHByaW1pdGl2ZVJlbmRlcmVyO1xyXG4gICAgICAgIGNvbnN0IHsgcHJvamVjdGlvbk1hdHJpeCB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCB7IGdsIH0gPSB0aGlzLmNvbnRleHQ7XHJcbiAgICAgICAgY29uc3Qgdmlld01hdHJpeCA9IG00LmludmVyc2UoY2FtZXJhTWF0cml4KTtcclxuICAgICAgICBjb25zdCB2aWV3UHJvamVjdGlvbk1hdHJpeCA9IG00Lm11bHRpcGx5KHByb2plY3Rpb25NYXRyaXgsIHZpZXdNYXRyaXgpO1xyXG4gICAgICAgIGNvbnN0IHVfd29ybGRWaWV3UHJvamVjdGlvbiA9IG00Lm11bHRpcGx5KHZpZXdQcm9qZWN0aW9uTWF0cml4LCB1bmlmb3Jtcy51X21hdHJpeCk7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnVzZVByb2dyYW1JbmZvKHByb2dyYW1JbmZvKTtcclxuICAgICAgICB0aGlzLmNvbnRleHRcclxuICAgICAgICAgICAgLmxhc3RVc2VkUHJvZ3JhbUluZm9cclxuICAgICAgICAgICAgLnNldFVuaWZvcm1zKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdW5pZm9ybXMpLCB7IHVfd29ybGRWaWV3UHJvamVjdGlvbiB9KSk7XHJcbiAgICAgICAgZ2wuYmluZFZlcnRleEFycmF5KFZBTyk7XHJcbiAgICAgICAgaWYgKCFpbmRpY2VzKSB7XHJcbiAgICAgICAgICAgIGdsLmRyYXdBcnJheXMobW9kZSwgb2Zmc2V0LCBudW1FbGVtZW50cyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2wuZHJhd0VsZW1lbnRzKG1vZGUsIG51bUVsZW1lbnRzLCBjb21wb25lbnRUeXBlLCBvZmZzZXQpO1xyXG4gICAgfVxyXG4gICAgZHJhd0luc3RhbmNlZChwcmltaXRpdmVSZW5kZXJlciwgdW5pZm9ybXMsIGNhbWVyYU1hdHJpeCwgbnVtSW5zdGFuY2VzKSB7XHJcbiAgICAgICAgY29uc3QgeyBWQU8sIG1vZGUsIG9mZnNldCwgbnVtRWxlbWVudHMsIGluZGljZXMsIHByb2dyYW1JbmZvLCBjb21wb25lbnRUeXBlLCB9ID0gcHJpbWl0aXZlUmVuZGVyZXI7XHJcbiAgICAgICAgY29uc3QgeyBwcm9qZWN0aW9uTWF0cml4IH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuY29udGV4dDtcclxuICAgICAgICBjb25zdCB2aWV3TWF0cml4ID0gbTQuaW52ZXJzZShjYW1lcmFNYXRyaXgpO1xyXG4gICAgICAgIGNvbnN0IHZpZXdQcm9qZWN0aW9uTWF0cml4ID0gbTQubXVsdGlwbHkocHJvamVjdGlvbk1hdHJpeCwgdmlld01hdHJpeCk7XHJcbiAgICAgICAgY29uc3Qgd29ybGRWaWV3UHJvamVjdGlvbiA9IG00Lm11bHRpcGx5KHZpZXdQcm9qZWN0aW9uTWF0cml4LCB1bmlmb3Jtcy51X21hdHJpeCk7XHJcbiAgICAgICAgY29uc3Qgd29ybGRNYXRyaXggPSB1bmlmb3Jtcy51X21hdHJpeDtcclxuICAgICAgICB0aGlzLmNvbnRleHQudXNlUHJvZ3JhbUluZm8ocHJvZ3JhbUluZm8pO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5cclxuICAgICAgICAgICAgbGFzdFVzZWRQcm9ncmFtSW5mb1xyXG4gICAgICAgICAgICAuc2V0VW5pZm9ybXMoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB1bmlmb3JtcyksIHsgd29ybGRNYXRyaXgsIHdvcmxkVmlld1Byb2plY3Rpb24gfSkpO1xyXG4gICAgICAgIGdsLmJpbmRWZXJ0ZXhBcnJheShWQU8pO1xyXG4gICAgICAgIGlmICghaW5kaWNlcykge1xyXG4gICAgICAgICAgICBnbC5kcmF3QXJyYXlzSW5zdGFuY2VkKG1vZGUsIG9mZnNldCwgbnVtRWxlbWVudHMsIG51bUluc3RhbmNlcyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2wuZHJhd0VsZW1lbnRzSW5zdGFuY2VkKG1vZGUsIG51bUVsZW1lbnRzLCBnbC5VTlNJR05FRF9TSE9SVCwgb2Zmc2V0LCBudW1JbnN0YW5jZXMpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IERyYXdlcjtcclxuIiwiaW1wb3J0IHsgVGV4dHVyZUluZm8gfSBmcm9tIFwiLi9UZXh0dXJlSW5mb1wiO1xyXG5pbXBvcnQgUHJpbWl0aXZlUmVuZGVyZXIgZnJvbSBcIi4vUHJpbWl0aXZlUmVuZGVyZXJcIjtcclxuaW1wb3J0IERyYXdlciBmcm9tIFwiLi9EcmF3ZXJcIjtcclxuaW1wb3J0IHsgUHJvZ3JhbUluZm8gfSBmcm9tIFwiLi9Qcm9ncmFtSW5mb1wiO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHTFdyYXBwZXIge1xyXG4gICAgY29uc3RydWN0b3IoZ2wpIHtcclxuICAgICAgICB0aGlzLlByb2dyYW1JbmZvID0gKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHJldHVybiBjbGFzcyBleHRlbmRzIFByb2dyYW1JbmZvIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yKHZlcnRleFNoYWRlclNvdXJjZSwgZnJhZ21lbnRTaGFkZXJTb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdXBlcihzZWxmLCB2ZXJ0ZXhTaGFkZXJTb3VyY2UsIGZyYWdtZW50U2hhZGVyU291cmNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KSgpO1xyXG4gICAgICAgIHRoaXMuUHJpbWl0aXZlUmVuZGVyZXIgPSAoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuIGNsYXNzIGV4dGVuZHMgUHJpbWl0aXZlUmVuZGVyZXIge1xyXG4gICAgICAgICAgICAgICAgc3RhdGljIGZyb21BcnJheURhdGEoYXJyYXlEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJpbWl0aXZlUmVuZGVyZXIgPSBuZXcgUHJpbWl0aXZlUmVuZGVyZXIoc2VsZi5nbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWl0aXZlUmVuZGVyZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNyZWF0ZVZBTygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jcmVhdGVHZW9tZXRyeUJ1ZmZlcnMoYXJyYXlEYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2V0QXR0cmlidXRlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmltaXRpdmVSZW5kZXJlcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cGVyKHNlbGYuZ2wpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICAgICAgdGhpcy5EcmF3ZXIgPSAoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuIGNsYXNzIGV4dGVuZHMgRHJhd2VyIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cGVyKHNlbGYpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICAgICAgdGhpcy5UZXh0dXJlSW5mbyA9ICgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gY2xhc3MgZXh0ZW5kcyBUZXh0dXJlSW5mbyB7XHJcbiAgICAgICAgICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdXBlcihzZWxmLmdsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KSgpO1xyXG4gICAgICAgIGlmICghZ2wpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gd2ViZ2whXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdsID0gZ2w7XHJcbiAgICAgICAgdGhpcy5wcm9ncmFtcyA9IHt9O1xyXG4gICAgfVxyXG4gICAgLypcclxuICAgIGdldExhc3RVc2VkUHJvZ3JhbUluZm8oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlckNhY2hlLmxhc3RVc2VkUHJvZ3JhbUluZm87XHJcbiAgICB9XHJcbiAgICBzZXRMYXN0VXNlZFByb2dyYW0ocHJvZ3JhbUluZm8pIHtcclxuICAgICAgdGhpcy5yZW5kZXJDYWNoZS5sYXN0VXNlZFByb2dyYW1JbmZvID0gcHJvZ3JhbUluZm87XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgKi9cclxuICAgIHVzZVByb2dyYW1JbmZvKHByb2dyYW1JbmZvKSB7XHJcbiAgICAgICAgaWYgKHByb2dyYW1JbmZvICE9IHRoaXMubGFzdFVzZWRQcm9ncmFtSW5mbykge1xyXG4gICAgICAgICAgICB0aGlzLmdsLnVzZVByb2dyYW0ocHJvZ3JhbUluZm8ucHJvZ3JhbSk7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdFVzZWRQcm9ncmFtSW5mbyA9IHByb2dyYW1JbmZvO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHJlc2l6ZUNhbnZhc1RvRGlzcGxheVNpemUobXVsdGlwbGllciA9IDEpIHtcclxuICAgICAgICBjb25zdCBjYW52YXMgPSB0aGlzLmdsLmNhbnZhcztcclxuICAgICAgICBjb25zdCB3aWR0aCA9IChjYW52YXMuY2xpZW50V2lkdGggKiBtdWx0aXBsaWVyKSB8IDA7XHJcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gKGNhbnZhcy5jbGllbnRIZWlnaHQgKiBtdWx0aXBsaWVyKSB8IDA7XHJcbiAgICAgICAgY2FudmFzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHJlc2l6ZUNhbnZhcyh3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgY29uc3QgY2FudmFzID0gdGhpcy5nbC5jYW52YXM7XHJcbiAgICAgICAgY2FudmFzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNldFZpZXdwb3J0KCkge1xyXG4gICAgICAgIHRoaXMuZ2wudmlld3BvcnQoMCwgMCwgdGhpcy5nbC5jYW52YXMud2lkdGgsIHRoaXMuZ2wuY2FudmFzLmhlaWdodCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBnZXRDb250ZXh0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdsO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBQcmltaXRpdmVSZW5kZXJlciBmcm9tIFwiLi9QcmltaXRpdmVSZW5kZXJlclwiO1xyXG5pbXBvcnQgeyBNZXNoUmVuZGVyZXIgfSBmcm9tIFwiLi9NZXNoUmVuZGVyZXJcIjtcclxuaW1wb3J0IHsgQXR0cmlidXRlU2V0dGVyLCBCdWZmZXJDb250cm9sbGVyIH0gZnJvbSBcIi4vQnVmZmVyQXR0cmlidXRlXCI7XHJcbmltcG9ydCB7IE5VTV9DT01QT05FTlRTLCBUWVBFRF9BUlJBWVMsIExPQ0FUSU9OUyB9IGZyb20gXCIuL2VudW1zXCI7XHJcbi8vLyBUT0RPIC8vL1xyXG5jb25zdCBBcnJheURhdGFGcm9tR2x0ZiA9IChnbHRmLCBidWZmZXJzKSA9PiB7XHJcbiAgICBjb25zdCB7IGJ1ZmZlclZpZXdzLCBhY2Nlc3NvcnMsIG1lc2hlcywgbm9kZXMgfSA9IGdsdGY7XHJcbiAgICBjb25zdCBhdHRyaWJEYXRhRnJvbUFjY2Vzc29yID0gKGFjY2Vzc29yKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYnVmZmVyVmlldyA9IGJ1ZmZlclZpZXdzW2FjY2Vzc29yLmJ1ZmZlclZpZXddO1xyXG4gICAgICAgIGNvbnN0IHsgY291bnQsIGNvbXBvbmVudFR5cGUsIHR5cGUgfSA9IGFjY2Vzc29yO1xyXG4gICAgICAgIGNvbnN0IGJ5dGVPZmZzZXQgPSBhY2Nlc3Nvci5ieXRlT2Zmc2V0IHx8IDA7XHJcbiAgICAgICAgY29uc3QgeyBieXRlTGVuZ3RoLCB0YXJnZXQgfSA9IGJ1ZmZlclZpZXc7XHJcbiAgICAgICAgY29uc3Qgc3RyaWRlID0gYnVmZmVyVmlldy5ieXRlU3RyaWRlIHx8IDA7XHJcbiAgICAgICAgY29uc3QgYnVmZmVyVmlld0J5dGVPZmZzZXQgPSBidWZmZXJWaWV3LmJ5dGVPZmZzZXQgfHwgMDtcclxuICAgICAgICBjb25zdCBidWZmZXIgPSBidWZmZXJzW2J1ZmZlclZpZXcuYnVmZmVyXTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkYXRhOiBuZXcgVWludDhBcnJheShidWZmZXIsIGJ1ZmZlclZpZXdCeXRlT2Zmc2V0LCBieXRlTGVuZ3RoKSxcclxuICAgICAgICAgICAgbnVtQ29tcG9uZW50czogTlVNX0NPTVBPTkVOVFNbdHlwZV0sXHJcbiAgICAgICAgICAgIHN0cmlkZSxcclxuICAgICAgICAgICAgYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgbG9jYXRpb246IG51bGwsXHJcbiAgICAgICAgICAgIGNvdW50LFxyXG4gICAgICAgICAgICB0eXBlOiBjb21wb25lbnRUeXBlLFxyXG4gICAgICAgICAgICBvZmZzZXQ6IGJ5dGVPZmZzZXQgfHwgMCxcclxuICAgICAgICAgICAgY29tcG9uZW50VHlwZTogYWNjZXNzb3IuY29tcG9uZW50VHlwZSxcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIGNvbnN0IF9tZXNoZXMgPSBtZXNoZXMubWFwKChtZXNoKSA9PiAoe1xyXG4gICAgICAgIHByaW1pdGl2ZXM6IG1lc2gucHJpbWl0aXZlcy5tYXAoKF9wcmltaXRpdmUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcHJpbWl0aXZlID0ge1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczoge30sXHJcbiAgICAgICAgICAgICAgICBtb2RlOiBfcHJpbWl0aXZlLm1vZGUsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmIChfcHJpbWl0aXZlLmhhc093blByb3BlcnR5KFwiaW5kaWNlc1wiKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5kaWNlc0luZm8gPSBhdHRyaWJEYXRhRnJvbUFjY2Vzc29yKGFjY2Vzc29yc1tfcHJpbWl0aXZlLmluZGljZXNdKTtcclxuICAgICAgICAgICAgICAgIHByaW1pdGl2ZS5pbmRpY2VzID0gaW5kaWNlc0luZm8uZGF0YTtcclxuICAgICAgICAgICAgICAgIHByaW1pdGl2ZS5udW1FbGVtZW50cyA9IGluZGljZXNJbmZvLmNvdW50O1xyXG4gICAgICAgICAgICAgICAgcHJpbWl0aXZlLmNvbXBvbmVudFR5cGUgPSBpbmRpY2VzSW5mby5jb21wb25lbnRUeXBlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKF9wcmltaXRpdmUuYXR0cmlidXRlcykuZm9yRWFjaCgoYXR0cmliTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlID0gX3ByaW1pdGl2ZS5hdHRyaWJ1dGVzW2F0dHJpYk5hbWVdO1xyXG4gICAgICAgICAgICAgICAgcHJpbWl0aXZlLmF0dHJpYnV0ZXNbYXR0cmliTmFtZV0gPSBhdHRyaWJEYXRhRnJvbUFjY2Vzc29yKGFjY2Vzc29yc1thdHRyaWJ1dGVdKTtcclxuICAgICAgICAgICAgICAgIC8vaWYoYXR0cmliTmFtZSA9PT0gJ0pPSU5UU18wJykgX3ByaW1pdGl2ZS5hdHRyaWJ1dGVzW2F0dHJpYk5hbWVdLmRhdGEgPSBuZXcgVWludDMyQXJyYXkoX3ByaW1pdGl2ZS5hdHRyaWJ1dGVzW2F0dHJpYk5hbWVdLmRhdGEpXHJcbiAgICAgICAgICAgICAgICBwcmltaXRpdmUuYXR0cmlidXRlc1thdHRyaWJOYW1lXS5sb2NhdGlvbiA9IExPQ0FUSU9OU1thdHRyaWJOYW1lXTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBwcmltaXRpdmU7XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgbmFtZTogbWVzaC5uYW1lLFxyXG4gICAgfSkpO1xyXG4gICAgcmV0dXJuIF9tZXNoZXMubWFwKChtZXNoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcHJpbWl0aXZlcyA9IG1lc2gucHJpbWl0aXZlcy5tYXAoKHByaW1pdGl2ZSkgPT4gbmV3IFByaW1pdGl2ZVJlbmRlcmVyKHByaW1pdGl2ZSkpO1xyXG4gICAgICAgIGNvbnN0IG5hbWUgPSBtZXNoLm5hbWU7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBNZXNoUmVuZGVyZXIoeyBwcmltaXRpdmVzLCBuYW1lIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcbmNvbnN0IFByaW1pdGl2ZVJlbmRlckluZm9Gcm9tQXJyYXlEYXRhID0gKG1lc2hlcykgPT4gbWVzaGVzLm1hcCgobWVzaCkgPT4ge1xyXG4gICAgY29uc3QgcHJpbWl0aXZlcyA9IG1lc2gucHJpbWl0aXZlcy5tYXAoKHByaW1pdGl2ZSkgPT4gbmV3IFByaW1pdGl2ZVJlbmRlcmVyKHByaW1pdGl2ZSkpO1xyXG4gICAgY29uc3QgbmFtZSA9IG1lc2gubmFtZTtcclxuICAgIHJldHVybiBuZXcgTWVzaFJlbmRlcmVyKHsgbmFtZSwgcHJpbWl0aXZlcyB9KTtcclxufSk7XHJcbmNvbnN0IEVudGl0eURhdGFGcm9tR2x0ZiA9IChnbHRmLCBidWZmZXJzKSA9PiBQcmltaXRpdmVSZW5kZXJJbmZvRnJvbUFycmF5RGF0YShBcnJheURhdGFGcm9tR2x0ZihnbHRmLCBidWZmZXJzKSk7XHJcbmNsYXNzIEdMVEYge1xyXG4gICAgY29uc3RydWN0b3IoZ2x0ZiwgYmluYXJ5QnVmZmVycykge1xyXG4gICAgICAgIGNvbnN0IHsgbm9kZXMgfSA9IGdsdGY7XHJcbiAgICAgICAgdGhpcy5ub2RlcyA9IG5vZGVzO1xyXG4gICAgICAgIHRoaXMubWVzaGVzID0gQXJyYXlEYXRhRnJvbUdsdGYoZ2x0ZiwgYmluYXJ5QnVmZmVycyk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IHsgQXJyYXlEYXRhRnJvbUdsdGYsIFByaW1pdGl2ZVJlbmRlckluZm9Gcm9tQXJyYXlEYXRhLCBFbnRpdHlEYXRhRnJvbUdsdGYsIEdMVEYsIH07XHJcbiIsImltcG9ydCBnZXRBdHRyaWJ1dGVQcm9wc0J5VHlwZSBmcm9tIFwiLi9hdHRyaWJUeXBlUHJvcHNcIjtcclxuaW1wb3J0IGF0dHJpYlR5cGVQcm9wcyBmcm9tIFwiLi9hdHRyaWJUeXBlUHJvcHNcIjtcclxuaW1wb3J0IHsgQnVmZmVyQXR0cmlidXRlIH0gZnJvbSBcIi4vQnVmZmVyQXR0cmlidXRlXCI7XHJcbmNsYXNzIE1lc2hSZW5kZXJlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcih7IHByaW1pdGl2ZXMsIG5hbWUgfSkge1xyXG4gICAgICAgIHRoaXMucHJpbWl0aXZlcyA9IHByaW1pdGl2ZXM7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmNvbnRleHQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuYnVmZmVycyA9IHt9O1xyXG4gICAgfVxyXG4gICAgZHJhdyh1bmlmb3JtcywgY2FtZXJhTWF0cml4KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSB0aGlzLnByaW1pdGl2ZXMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJpbWl0aXZlc1tpXS5kcmF3KHVuaWZvcm1zLCBjYW1lcmFNYXRyaXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGRyYXdJbnN0YW5jZWQodW5pZm9ybXMsIGNhbWVyYU1hdHJpeCwgbnVtSW5zdGFuY2VzKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSB0aGlzLnByaW1pdGl2ZXMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJpbWl0aXZlc1tpXS5kcmF3SW5zdGFuY2VkKHVuaWZvcm1zLCBjYW1lcmFNYXRyaXgsIG51bUluc3RhbmNlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59XHJcbmNsYXNzIFNraW5uZWRNZXNoUmVuZGVyZXIge1xyXG4gICAgY29uc3RydWN0b3IocHJpbWl0aXZlcywgc2tpbikge1xyXG4gICAgICAgIHRoaXMucHJpbWl0aXZlcyA9IHByaW1pdGl2ZXM7XHJcbiAgICAgICAgdGhpcy5za2luID0gc2tpbjtcclxuICAgIH1cclxuICAgIGRyYXcodW5pZm9ybXMsIGNhbWVyYU1hdHJpeCkge1xyXG4gICAgICAgIHRoaXMuc2tpbi51cGRhdGUodW5pZm9ybXMudV9tYXRyaXgpO1xyXG4gICAgICAgIGNvbnN0IF91bmlmb3JtcyA9IE9iamVjdC5hc3NpZ24oeyB1X2pvaW50VGV4dHVyZTogdGhpcy5za2luLmpvaW50VGV4dHVyZSwgdV9udW1Kb2ludHM6IHRoaXMuc2tpbi5qb2ludHMubGVuZ3RoIH0sIHVuaWZvcm1zKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbiA9IHRoaXMucHJpbWl0aXZlcy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5wcmltaXRpdmVzW2ldLmRyYXcoX3VuaWZvcm1zLCBjYW1lcmFNYXRyaXgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnQgeyBNZXNoUmVuZGVyZXIsIFNraW5uZWRNZXNoUmVuZGVyZXIgfTtcclxuIiwiY2xhc3MgVFJTIHtcclxuICAgIGNvbnN0cnVjdG9yKHRyYW5zbGF0aW9uLCByb3RhdGlvbiwgc2NhbGUpIHtcclxuICAgICAgICB0aGlzLnRyYW5zbGF0aW9uID0gdHJhbnNsYXRpb247XHJcbiAgICAgICAgdGhpcy5yb3RhdGlvbiA9IHJvdGF0aW9uO1xyXG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcclxuICAgIH1cclxuICAgIGdldE1hdHJpeChtKSB7XHJcbiAgICAgICAgbGV0IGRzdCA9IG0gfHwgbTQuaWRlbnRpdHkoKTtcclxuICAgICAgICB2YXIgdCA9IHRoaXMudHJhbnNsYXRpb247XHJcbiAgICAgICAgdmFyIHIgPSB0aGlzLnJvdGF0aW9uO1xyXG4gICAgICAgIHZhciBzID0gdGhpcy5zY2FsZTtcclxuICAgICAgICBjb25zdCBzaW4gPSBNYXRoLnNpbihyWzNdIC8gMik7XHJcbiAgICAgICAgY29uc3QgY29zID0gTWF0aC5jb3MoclszXSAvIDIpO1xyXG4gICAgICAgIGRzdCA9IG00LnRyYW5zbGF0ZShkc3QsIHRbMF0sIHRbMV0sIHRbMl0pO1xyXG4gICAgICAgIGRzdCA9IG00Lm11bHRpcGx5KGRzdCwgbTQuZnJvbVF1YXRlcm5pb24ocikpO1xyXG4gICAgICAgIGRzdCA9IG00LnNjYWxlKGRzdCwgc1swXSwgc1sxXSwgc1syXSk7XHJcbiAgICAgICAgcmV0dXJuIGRzdDtcclxuICAgIH1cclxuICAgIGdldFJNYXRyaXgoKSB7XHJcbiAgICAgICAgbGV0IGRzdCA9IG00LmlkZW50aXR5KCk7XHJcbiAgICAgICAgdmFyIHIgPSB0aGlzLnJvdGF0aW9uO1xyXG4gICAgICAgIGRzdCA9IG00LnhSb3RhdGUoZHN0LCByWzBdKTtcclxuICAgICAgICBkc3QgPSBtNC55Um90YXRlKGRzdCwgclsxXSk7XHJcbiAgICAgICAgZHN0ID0gbTQuelJvdGF0ZShkc3QsIHJbMl0pO1xyXG4gICAgICAgIHJldHVybiBkc3Q7XHJcbiAgICB9XHJcbiAgICBnZXRUUm1hdHJpeCgpIHtcclxuICAgICAgICBjb25zdCB0ID0gdGhpcy50cmFuc2xhdGlvbjtcclxuICAgICAgICBjb25zdCByID0gdGhpcy5yb3RhdGlvbjtcclxuICAgICAgICBsZXQgbSA9IG00LnRyYW5zbGF0aW9uKHRbMF0sIHRbMV0sIHRbMl0pO1xyXG4gICAgICAgIG0gPSBtNC54Um90YXRlKG0sIHJbMF0pO1xyXG4gICAgICAgIG0gPSBtNC55Um90YXRlKG0sIHJbMV0pO1xyXG4gICAgICAgIG0gPSBtNC56Um90YXRlKG0sIHJbMl0pO1xyXG4gICAgICAgIHJldHVybiBtO1xyXG4gICAgfVxyXG59XHJcbmNsYXNzIE5vZGUge1xyXG4gICAgc3RhdGljIG1ha2VNb2RlbChlbnRpdHlEZXNjcmlwdGlvbiwgcm9vdE5vZGVOZHgpIHtcclxuICAgICAgICBjb25zdCB7IG5vZGVzLCBtZXNoZXMgfSA9IGVudGl0eURlc2NyaXB0aW9uO1xyXG4gICAgICAgIGNvbnN0IHJvb3ROb2RlID0gbm9kZXNbcm9vdE5vZGVOZHhdO1xyXG4gICAgICAgIGNvbnN0IG1ha2VOb2RlID0gKG5vZGVEZXNjcmlwdGlvbiwgbmR4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRycyA9IG5ldyBUUlMobm9kZURlc2NyaXB0aW9uLnRyYW5zbGF0aW9uIHx8IFswLCAwLCAwXSwgbm9kZURlc2NyaXB0aW9uLnJvdGF0aW9uIHx8IFswLCAwLCAwXSwgbm9kZURlc2NyaXB0aW9uLnNjYWxlIHx8IFsxLCAxLCAxXSk7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBuZXcgTm9kZShub2RlRGVzY3JpcHRpb24ubmFtZSwgdHJzLCBuZHgpO1xyXG4gICAgICAgICAgICBpZiAobm9kZURlc2NyaXB0aW9uLm1lc2ggIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLnJlbmRlcmVyID0gbWVzaGVzW25vZGVEZXNjcmlwdGlvbi5tZXNoXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobm9kZURlc2NyaXB0aW9uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlRGVzY3JpcHRpb24uY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGROZHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGlsZCA9IG1ha2VOb2RlKG5vZGVzW2NoaWxkTmR4XSwgY2hpbGROZHgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLnNldFBhcmVudChub2RlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIG1ha2VOb2RlKHJvb3ROb2RlLCByb290Tm9kZU5keCk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCB0cnMgPSBuZXcgVFJTKCkpIHtcclxuICAgICAgICB0aGlzLndvcmxkTWF0cml4ID0gbTQuaWRlbnRpdHkoKTtcclxuICAgICAgICB0aGlzLnBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xyXG4gICAgICAgIHRoaXMudHJzID0gdHJzO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5wYXJ0cyA9IFtdO1xyXG4gICAgICAgIHRoaXMubmR4ID0gbmR4O1xyXG4gICAgICAgIHRoaXMuc2tpbk5keCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzVG9EcmF3ID0gW107XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBzZXRQYXJlbnQocGFyZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGFyZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5keCA9IHRoaXMucGFyZW50LmNoaWxkcmVuLmluZGV4T2YodGhpcyk7XHJcbiAgICAgICAgICAgIGlmIChuZHggPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnQuY2hpbGRyZW4uc3BsaWNlKG5keCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBhcmVudCkge1xyXG4gICAgICAgICAgICBwYXJlbnQuY2hpbGRyZW4ucHVzaCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVXb3JsZE1hdHJpeChwYXJlbnRXb3JsZE1hdHJpeCkge1xyXG4gICAgICAgIGxldCBtYXRyaXggPSB0aGlzLnRycy5nZXRNYXRyaXgoKTtcclxuICAgICAgICBpZiAocGFyZW50V29ybGRNYXRyaXgpIHtcclxuICAgICAgICAgICAgbWF0cml4ID0gbTQubXVsdGlwbHkocGFyZW50V29ybGRNYXRyaXgsIG1hdHJpeCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMud29ybGRNYXRyaXggPSBtYXRyaXg7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xyXG4gICAgICAgICAgICBjaGlsZC51cGRhdGVXb3JsZE1hdHJpeChtYXRyaXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlUGFydHNMaXN0KCkge1xyXG4gICAgICAgIGNvbnN0IGl0ZXIgPSAobm9kZSwgYXJyKSA9PiB7XHJcbiAgICAgICAgICAgIGFyci5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgICBub2RlLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiBpdGVyKGNoaWxkLCBhcnIpKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGl0ZXIodGhpcywgdGhpcy5wYXJ0cyk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVPYmplY3RzVG9EcmF3KCkge1xyXG4gICAgICAgIGNvbnN0IHF1ZXVlID0gW3RoaXNdO1xyXG4gICAgICAgIHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBxdWV1ZS5wb3AoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobm9kZSk7XHJcbiAgICAgICAgICAgIGlmIChub2RlLnJlbmRlcmVyKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vYmplY3RzVG9EcmF3LnB1c2gobm9kZSk7XHJcbiAgICAgICAgICAgIGlmIChub2RlLmNoaWxkcmVuKVxyXG4gICAgICAgICAgICAgICAgcXVldWUucHVzaCguLi5ub2RlLmNoaWxkcmVuKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB0cmF2ZXJzZShmbikge1xyXG4gICAgICAgIGZuKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IGNoaWxkLnRyYXZlcnNlKGZuKSk7XHJcbiAgICB9XHJcbiAgICBmaW5kKG5keCkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xyXG4gICAgICAgIGNvbnN0IGl0ZXIgPSAobm9kZXMpID0+IHtcclxuICAgICAgICAgICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubmR4ID09PSBuZHgpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gbm9kZTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBpdGVyKG5vZGUuY2hpbGRyZW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpdGVyKFt0aGlzXSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIGZpbmRCeU5hbWUobmFtZSkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xyXG4gICAgICAgIGNvbnN0IGl0ZXIgPSAobm9kZXMpID0+IHtcclxuICAgICAgICAgICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubmFtZSA9PT0gbmFtZSlcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBub2RlO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZXIobm9kZS5jaGlsZHJlbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGl0ZXIoW3RoaXNdKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKHVuaWZvcm1zLCBjYW1lcmFNYXRyaXgpIHtcclxuICAgICAgICB0aGlzLm9iamVjdHNUb0RyYXcuZm9yRWFjaCgob2JqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIG9iamVjdC5yZW5kZXJlci5kcmF3KE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdW5pZm9ybXMpLCB7IHVfbWF0cml4OiBvYmplY3Qud29ybGRNYXRyaXggfSksIGNhbWVyYU1hdHJpeCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgTW9kZWwgZXh0ZW5kcyBOb2RlIHtcclxuICAgIHN0YXRpYyBtYWtlTW9kZWwoZW50aXR5RGVzY3JpcHRpb24sIHJvb3ROb2RlTmR4KSB7XHJcbiAgICAgICAgY29uc3QgeyBub2RlcywgbWVzaGVzIH0gPSBlbnRpdHlEZXNjcmlwdGlvbjtcclxuICAgICAgICBjb25zdCByb290Tm9kZSA9IG5vZGVzW3Jvb3ROb2RlTmR4XTtcclxuICAgICAgICBjb25zdCBtYWtlTm9kZSA9IChub2RlRGVzY3JpcHRpb24sIG5keCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0cnMgPSBuZXcgVFJTKG5vZGVEZXNjcmlwdGlvbi50cmFuc2xhdGlvbiB8fCBbMCwgMCwgMF0sIG5vZGVEZXNjcmlwdGlvbi5yb3RhdGlvbiB8fCBbMCwgMCwgMCwgMF0sIG5vZGVEZXNjcmlwdGlvbi5zY2FsZSB8fCBbMSwgMSwgMV0pO1xyXG4gICAgICAgICAgICBjb25zdCBub2RlID0gbmV3IEVudGl0eShub2RlRGVzY3JpcHRpb24ubmFtZSwgdHJzLCBuZHgpO1xyXG4gICAgICAgICAgICBpZiAobm9kZURlc2NyaXB0aW9uLm1lc2ggIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLnJlbmRlcmVyID0gbWVzaGVzW25vZGVEZXNjcmlwdGlvbi5tZXNoXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobm9kZURlc2NyaXB0aW9uLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlRGVzY3JpcHRpb24uY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGROZHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGlsZCA9IG1ha2VOb2RlKG5vZGVzW2NoaWxkTmR4XSwgY2hpbGROZHgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLnNldFBhcmVudChub2RlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIG1ha2VOb2RlKHJvb3ROb2RlLCByb290Tm9kZU5keCk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCB0cnMsIG5keCkge1xyXG4gICAgICAgIHN1cGVyKG5hbWUsIHRycyk7XHJcbiAgICAgICAgdGhpcy5uZHggPSBuZHg7XHJcbiAgICAgICAgdGhpcy5waHlzaWNzID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNraW5OZHggPSBudWxsO1xyXG4gICAgICAgIHRoaXMub2JqZWN0c1RvRHJhdyA9IFtdO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlT2JqZWN0c1RvRHJhdygpIHtcclxuICAgICAgICBjb25zdCBxdWV1ZSA9IFt0aGlzXTtcclxuICAgICAgICB3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjb25zdCBub2RlID0gcXVldWUucG9wKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5vZGUpO1xyXG4gICAgICAgICAgICBpZiAobm9kZS5yZW5kZXJlcilcclxuICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0c1RvRHJhdy5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgICBpZiAobm9kZS5jaGlsZHJlbilcclxuICAgICAgICAgICAgICAgIHF1ZXVlLnB1c2goLi4ubm9kZS5jaGlsZHJlbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdHJhdmVyc2UoZm4pIHtcclxuICAgICAgICBmbih0aGlzKTtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiBjaGlsZC50cmF2ZXJzZShmbikpO1xyXG4gICAgfVxyXG4gICAgZmluZChuZHgpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcclxuICAgICAgICBjb25zdCBpdGVyID0gKG5vZGVzKSA9PiB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IG5vZGUgb2Ygbm9kZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChub2RlLm5keCA9PT0gbmR4KVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IG5vZGU7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlcihub2RlLmNoaWxkcmVuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaXRlcihbdGhpc10pO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBmaW5kQnlOYW1lKG5hbWUpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcclxuICAgICAgICBjb25zdCBpdGVyID0gKG5vZGVzKSA9PiB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IG5vZGUgb2Ygbm9kZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChub2RlLm5hbWUgPT09IG5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gbm9kZTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBpdGVyKG5vZGUuY2hpbGRyZW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpdGVyKFt0aGlzXSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHJlbmRlcih1bmlmb3JtcywgY2FtZXJhTWF0cml4KSB7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzVG9EcmF3LmZvckVhY2goKG9iamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBvYmplY3QucmVuZGVyZXIuZHJhdyhPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHVuaWZvcm1zKSwgeyB1X21hdHJpeDogb2JqZWN0LndvcmxkTWF0cml4IH0pLCBjYW1lcmFNYXRyaXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IE1vZGVsO1xyXG4iLCJpbXBvcnQgeyBCdWZmZXJBdHRyaWJ1dGVJbmZvIH0gZnJvbSBcIi4vQnVmZmVyQXR0cmlidXRlXCI7XHJcbmNsYXNzIFByaW1pdGl2ZVJlbmRlcmVyIHtcclxuICAgIGNvbnN0cnVjdG9yKGdsKSB7XHJcbiAgICAgICAgdGhpcy5idWZmZXJBdHRyaWJzID0ge307XHJcbiAgICAgICAgdGhpcy5wcm9ncmFtSW5mbyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5nbCA9IGdsO1xyXG4gICAgICAgIHRoaXMuZHJhd2VyID0gbnVsbDtcclxuICAgICAgICB0aGlzLm1vZGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMub2Zmc2V0ID0gMDtcclxuICAgICAgICB0aGlzLm51bUVsZW1lbnRzID0gbnVsbDtcclxuICAgICAgICB0aGlzLlZBTyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRUeXBlID0gbnVsbDtcclxuICAgIH1cclxuICAgIHNldENvbnRleHQoZ2wpIHtcclxuICAgICAgICB0aGlzLmdsID0gZ2w7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBjcmVhdGVWQU8oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuVkFPKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB0aGlzLlZBTyA9IHRoaXMuZ2wuY3JlYXRlVmVydGV4QXJyYXkoKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNldE1vZGUobW9kZSkge1xyXG4gICAgICAgIHRoaXMubW9kZSA9IG1vZGU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBzZXROdW1FbGVtZW50cyhudW1FbGVtZW50cykge1xyXG4gICAgICAgIHRoaXMubnVtRWxlbWVudHMgPSBudW1FbGVtZW50cztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNldE9mZnNldChvZmZzZXQpIHtcclxuICAgICAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNldEluZGljZXMoYXJyYXlCdWZmZXIpIHtcclxuICAgICAgICBjb25zdCB7IGdsLCBWQU8gfSA9IHRoaXM7XHJcbiAgICAgICAgZ2wuYmluZFZlcnRleEFycmF5KFZBTyk7XHJcbiAgICAgICAgdGhpcy5udW1FbGVtZW50cyA9IGFycmF5QnVmZmVyLmJ5dGVMZW5ndGggLyAyO1xyXG4gICAgICAgIGNvbnN0IGluZGljZXNCdWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcclxuICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBpbmRpY2VzQnVmZmVyKTtcclxuICAgICAgICBnbC5idWZmZXJEYXRhKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBhcnJheUJ1ZmZlciwgZ2wuU1RBVElDX0RSQVcpO1xyXG4gICAgICAgIGdsLmJpbmRWZXJ0ZXhBcnJheShudWxsKTtcclxuICAgICAgICB0aGlzLmluZGljZXMgPSBpbmRpY2VzQnVmZmVyO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlR2VvbWV0cnlCdWZmZXJzKGFycmF5RGF0YSkge1xyXG4gICAgICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgeyBhdHRyaWJ1dGVzLCBpbmRpY2VzLCBjb21wb25lbnRUeXBlLCBudW1FbGVtZW50cywgbW9kZSwgb2Zmc2V0IH0gPSBhcnJheURhdGE7XHJcbiAgICAgICAgdGhpcy5udW1FbGVtZW50cyA9IG51bUVsZW1lbnRzO1xyXG4gICAgICAgIHRoaXMubW9kZSA9IG1vZGU7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRUeXBlID0gY29tcG9uZW50VHlwZSB8fCA1MTIzO1xyXG4gICAgICAgIHRoaXMub2Zmc2V0ID0gMDtcclxuICAgICAgICBpZiAoYXR0cmlidXRlcykge1xyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5mb3JFYWNoKChhdHRyaWJ1dGVOYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhdHRyaWJQcm9wcyA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBidWZmZXJBdHRyaWJ1dGVJbmZvID0gbmV3IEJ1ZmZlckF0dHJpYnV0ZUluZm8oZ2wsIGF0dHJpYlByb3BzKTtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlckF0dHJpYnV0ZUluZm8uYnVmZmVyRGF0YShhdHRyaWJQcm9wcy5kYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyQXR0cmlic1thdHRyaWJ1dGVOYW1lXSA9IGJ1ZmZlckF0dHJpYnV0ZUluZm87XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW5kaWNlcykge1xyXG4gICAgICAgICAgICBjb25zdCBpbmRpY2VzQnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XHJcbiAgICAgICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGluZGljZXNCdWZmZXIpO1xyXG4gICAgICAgICAgICBnbC5idWZmZXJEYXRhKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBpbmRpY2VzLCBnbC5TVEFUSUNfRFJBVyk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kaWNlcyA9IGluZGljZXNCdWZmZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2V0QXR0cmlidXRlcygpIHtcclxuICAgICAgICBjb25zdCB7IGdsIH0gPSB0aGlzO1xyXG4gICAgICAgIGdsLmJpbmRWZXJ0ZXhBcnJheSh0aGlzLlZBTyk7XHJcbiAgICAgICAgZm9yIChjb25zdCBhdHRyaWIgaW4gdGhpcy5idWZmZXJBdHRyaWJzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJ1ZmZlckF0dHJpYnV0ZUluZm8gPSB0aGlzLmJ1ZmZlckF0dHJpYnNbYXR0cmliXTtcclxuICAgICAgICAgICAgYnVmZmVyQXR0cmlidXRlSW5mby5zZXRBdHRyaWJ1dGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy5pbmRpY2VzKTtcclxuICAgICAgICBnbC5iaW5kVmVydGV4QXJyYXkobnVsbCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBzZXREcmF3ZXIoZHJhd2VyKSB7XHJcbiAgICAgICAgdGhpcy5kcmF3ZXIgPSBkcmF3ZXI7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBzZXRQcm9ncmFtSW5mbyhwcm9ncmFtSW5mbykge1xyXG4gICAgICAgIHRoaXMucHJvZ3JhbUluZm8gPSBwcm9ncmFtSW5mbztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGNyZWF0ZUJ1ZmZlckF0dHJpYkRhdGEoeyBhdHRyaWJOYW1lLCBsb2NhdGlvbiwgc3RyaWRlLCBudW1Db21wb25lbnRzLCBvZmZzZXQsIHR5cGUsIGRpdmlzb3IsIGF0dHJpYnV0ZVR5cGUsIH0pIHtcclxuICAgICAgICBjb25zdCB7IGdsIH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IGJ1ZmZlckF0dHJpYkluZm8gPSBuZXcgQnVmZmVyQXR0cmlidXRlSW5mbyhnbCwge1xyXG4gICAgICAgICAgICBsb2NhdGlvbixcclxuICAgICAgICAgICAgc3RyaWRlLFxyXG4gICAgICAgICAgICBudW1Db21wb25lbnRzLFxyXG4gICAgICAgICAgICBvZmZzZXQsXHJcbiAgICAgICAgICAgIHR5cGUsXHJcbiAgICAgICAgICAgIGRpdmlzb3IsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5idWZmZXJBdHRyaWJzW2F0dHJpYk5hbWVdID0gYnVmZmVyQXR0cmliSW5mbztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8qXHJcbiAgICBzZXRCdWZmZXJBdHRyaWJEYXRhKG5hbWUsIGJ1ZmZlckF0dHJpYkRhdGEpIHtcclxuICAgICAgdGhpcy5idWZmZXJzID0geyAuLi50aGlzLmJ1ZmZlcnMsIFtuYW1lXTogYnVmZmVyQXR0cmliRGF0YSB9O1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgICovXHJcbiAgICBzZXRBdHRyaWJ1dGUoYXR0cmliTmFtZSkge1xyXG4gICAgICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgYnVmZmVyQXR0cmliRGF0YSA9IHRoaXMuYnVmZmVyQXR0cmlic1thdHRyaWJOYW1lXTtcclxuICAgICAgICBnbC5iaW5kVmVydGV4QXJyYXkodGhpcy5WQU8pO1xyXG4gICAgICAgIGJ1ZmZlckF0dHJpYkRhdGEuc2V0QXR0cmlidXRlKCk7XHJcbiAgICAgICAgZ2wuYmluZFZlcnRleEFycmF5KG51bGwpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgLypcclxuICAgIF9zZXRBdHRyaWJ1dGUoYnVmZmVyQXR0cmliRGF0YSkge1xyXG4gICAgICBjb25zdCB7IGdsIH0gPSB0aGlzO1xyXG4gICAgICBnbC5iaW5kVmVydGV4QXJyYXkodGhpcy52YW8pO1xyXG4gICAgICBidWZmZXJBdHRyaWJEYXRhLnNldEF0dHJpYnV0ZSgpO1xyXG4gICAgICBnbC5iaW5kVmVydGV4QXJyYXkobnVsbCk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgKi9cclxuICAgIGJ1ZmZlckRhdGEoYXR0cmliTmFtZSwgZGF0YSwgdXNhZ2UpIHtcclxuICAgICAgICBjb25zdCBidWZmZXJBdHRyaWJJbmZvID0gdGhpcy5idWZmZXJBdHRyaWJzW2F0dHJpYk5hbWVdO1xyXG4gICAgICAgIGJ1ZmZlckF0dHJpYkluZm8uYnVmZmVyRGF0YShkYXRhLCB1c2FnZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBidWZmZXJTdWJEYXRhKGF0dHJpYk5hbWUsIGRhdGEsIG9mZnNldCkge1xyXG4gICAgICAgIGNvbnN0IGJ1ZmZlckF0dHJpYkluZm8gPSB0aGlzLmJ1ZmZlckF0dHJpYnNbYXR0cmliTmFtZV07XHJcbiAgICAgICAgYnVmZmVyQXR0cmliSW5mby5idWZmZXJTdWJEYXRhKGRhdGEsIG9mZnNldCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBhbGxvY0J1ZmZlcihhdHRyaWJOYW1lLCBieXRlTGVuZ3RoLCB1c2FnZSkge1xyXG4gICAgICAgIGNvbnN0IGJ1ZmZlckF0dHJpYkluZm8gPSB0aGlzLmJ1ZmZlckF0dHJpYnNbYXR0cmliTmFtZV07XHJcbiAgICAgICAgYnVmZmVyQXR0cmliSW5mby5hbGxvY0J1ZmZlcihieXRlTGVuZ3RoLCB1c2FnZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBkcmF3KHVuaWZvcm1zLCBjYW1lcmFNYXRyaXgpIHtcclxuICAgICAgICB0aGlzLmRyYXdlci5kcmF3KHRoaXMsIHVuaWZvcm1zLCBjYW1lcmFNYXRyaXgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgZHJhd0luc3RhbmNlZCh1bmlmb3JtcywgY2FtZXJhTWF0cml4LCBudW1JbnN0YW5jZXMpIHtcclxuICAgICAgICB0aGlzLmRyYXdlci5kcmF3SW5zdGFuY2VkKHRoaXMsIHVuaWZvcm1zLCBjYW1lcmFNYXRyaXgsIG51bUluc3RhbmNlcyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgUHJpbWl0aXZlUmVuZGVyZXI7XHJcbiIsImltcG9ydCB7IHYzIH0gZnJvbSAncm9tYW5wcHBtYXRoJztcclxuaW1wb3J0IHsgRkxPQVRfVkVDMiwgRkxPQVRfVkVDMyB9IGZyb20gXCIuL2VudW1zXCI7XHJcbmNvbnN0IHsgY3Jvc3MsIGRpZmYsIG5vcm1hbGl6ZSB9ID0gdjM7XHJcbmNvbnN0IGxpbmVkQm94SW5kaWNlcyA9IG5ldyBVaW50MTZBcnJheShbXHJcbiAgICAwLFxyXG4gICAgMSxcclxuICAgIDEsXHJcbiAgICAyLFxyXG4gICAgMixcclxuICAgIDMsXHJcbiAgICAzLFxyXG4gICAgMCxcclxuICAgIDAsXHJcbiAgICA1LFxyXG4gICAgNSxcclxuICAgIDQsXHJcbiAgICA0LFxyXG4gICAgMSxcclxuICAgIDEsXHJcbiAgICAwLFxyXG4gICAgMCxcclxuICAgIDQsXHJcbiAgICA0LFxyXG4gICAgNyxcclxuICAgIDcsXHJcbiAgICAzLFxyXG4gICAgMyxcclxuICAgIDAsXHJcbiAgICAxLFxyXG4gICAgMixcclxuICAgIDIsXHJcbiAgICA2LFxyXG4gICAgNixcclxuICAgIDUsXHJcbiAgICA1LFxyXG4gICAgMSxcclxuICAgIDQsXHJcbiAgICA1LFxyXG4gICAgNSxcclxuICAgIDYsXHJcbiAgICA2LFxyXG4gICAgNyxcclxuICAgIDcsXHJcbiAgICA0LFxyXG4gICAgMixcclxuICAgIDcsXHJcbiAgICA3LFxyXG4gICAgMyxcclxuICAgIDMsXHJcbiAgICA2LFxyXG4gICAgNixcclxuICAgIDIsIC8vIHRvcFxyXG5dKTtcclxuY29uc3QgQ1VCRV9GQUNFX0lORElDRVMgPSBbXHJcbiAgICBbMywgNywgNSwgMV0sXHJcbiAgICBbNiwgMiwgMCwgNF0sXHJcbiAgICBbNiwgNywgMywgMl0sXHJcbiAgICBbMCwgMSwgNSwgNF0sXHJcbiAgICBbNywgNiwgNCwgNV0sXHJcbiAgICBbMiwgMywgMSwgMF0sIC8vIGJhY2tcclxuXTtcclxuZnVuY3Rpb24gY3JlYXRlQm94KF9hID0gMSwgX2IgPSAxLCBfYyA9IDEpIHtcclxuICAgIGNvbnN0IGEgPSBfYSAvIDIsIGIgPSBfYiAvIDIsIGMgPSBfYyAvIDI7XHJcbiAgICBjb25zdCBjb3JuZXJWZXJ0aWNlcyA9IFtcclxuICAgICAgICBbLWEsIC1iLCAtY10sXHJcbiAgICAgICAgWythLCAtYiwgLWNdLFxyXG4gICAgICAgIFstYSwgK2IsIC1jXSxcclxuICAgICAgICBbK2EsICtiLCAtY10sXHJcbiAgICAgICAgWy1hLCAtYiwgK2NdLFxyXG4gICAgICAgIFsrYSwgLWIsICtjXSxcclxuICAgICAgICBbLWEsICtiLCArY10sXHJcbiAgICAgICAgWythLCArYiwgK2NdLFxyXG4gICAgXTtcclxuICAgIGNvbnN0IGZhY2VOb3JtYWxzID0gW1xyXG4gICAgICAgIFsrMSwgKzAsICswXSxcclxuICAgICAgICBbLTEsICswLCArMF0sXHJcbiAgICAgICAgWyswLCArMSwgKzBdLFxyXG4gICAgICAgIFsrMCwgLTEsICswXSxcclxuICAgICAgICBbKzAsICswLCArMV0sXHJcbiAgICAgICAgWyswLCArMCwgLTFdLFxyXG4gICAgXTtcclxuICAgIGNvbnN0IHV2Q29vcmRzID0gW1xyXG4gICAgICAgIFsxLCAwXSxcclxuICAgICAgICBbMCwgMF0sXHJcbiAgICAgICAgWzAsIDFdLFxyXG4gICAgICAgIFsxLCAxXSxcclxuICAgIF07XHJcbiAgICBjb25zdCBwb3NpdGlvbnMgPSBbXTtcclxuICAgIGNvbnN0IG5vcm1hbHMgPSBbXTtcclxuICAgIC8vY29uc3QgdGV4Q29vcmRzID0gd2ViZ2xVdGlscy5jcmVhdGVBdWdtZW50ZWRUeXBlZEFycmF5KDIgLCBudW1WZXJ0aWNlcyk7XHJcbiAgICBjb25zdCBpbmRpY2VzID0gW107XHJcbiAgICBmb3IgKGxldCBmID0gMDsgZiA8IDY7ICsrZikge1xyXG4gICAgICAgIGNvbnN0IGZhY2VJbmRpY2VzID0gQ1VCRV9GQUNFX0lORElDRVNbZl07XHJcbiAgICAgICAgZm9yIChsZXQgdiA9IDA7IHYgPCA0OyArK3YpIHtcclxuICAgICAgICAgICAgY29uc3QgcG9zaXRpb24gPSBjb3JuZXJWZXJ0aWNlc1tmYWNlSW5kaWNlc1t2XV07XHJcbiAgICAgICAgICAgIGNvbnN0IG5vcm1hbCA9IGZhY2VOb3JtYWxzW2ZdO1xyXG4gICAgICAgICAgICBwb3NpdGlvbnMucHVzaCguLi5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgIG5vcm1hbHMucHVzaCguLi5ub3JtYWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBvZmZzZXQgPSA0ICogZjtcclxuICAgICAgICBpbmRpY2VzLnB1c2gob2Zmc2V0ICsgMCwgb2Zmc2V0ICsgMSwgb2Zmc2V0ICsgMik7XHJcbiAgICAgICAgaW5kaWNlcy5wdXNoKG9mZnNldCArIDAsIG9mZnNldCArIDIsIG9mZnNldCArIDMpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdGV4Y29vcmQgPSBuZXcgRmxvYXQzMkFycmF5KFtcclxuICAgICAgICAvLyBGcm9udFxyXG4gICAgICAgIDAuMCwgMC4wLCAxLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMS4wLFxyXG4gICAgICAgIC8vIEJhY2tcclxuICAgICAgICAwLjAsIDAuMCwgMS4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDEuMCxcclxuICAgICAgICAvLyBUb3BcclxuICAgICAgICAwLjAsIDAuMCwgMS4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDEuMCxcclxuICAgICAgICAvLyBCb3R0b21cclxuICAgICAgICAwLjAsIDAuMCwgMS4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDEuMCxcclxuICAgICAgICAvLyBSaWdodFxyXG4gICAgICAgIDAuMCwgMC4wLCAxLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMS4wLFxyXG4gICAgICAgIC8vIExlZnRcclxuICAgICAgICAwLjAsIDAuMCwgMS4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDEuMCxcclxuICAgIF0pO1xyXG4gICAgY29uc3QgX25vcm1hbHMgPSBuZXcgRmxvYXQzMkFycmF5KG5vcm1hbHMpO1xyXG4gICAgY29uc3QgX3Bvc2l0aW9ucyA9IG5ldyBGbG9hdDMyQXJyYXkocG9zaXRpb25zKTtcclxuICAgIGNvbnN0IF9pbmRpY2VzID0gbmV3IFVpbnQxNkFycmF5KGluZGljZXMpO1xyXG4gICAgY29uc3QgX3RleGNvb3JkcyA9IG5ldyBGbG9hdDMyQXJyYXkodGV4Y29vcmQpO1xyXG4gICAgY29uc3QgQXJyYXlEYXRhID0ge1xyXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcclxuICAgICAgICAgICAgTk9STUFMOiB7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiBfbm9ybWFscyxcclxuICAgICAgICAgICAgICAgIGNvdW50OiA2ICogNCAqIDMsXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogMSxcclxuICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGg6IF9ub3JtYWxzLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBzdHJpZGU6IDAsXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IDAsXHJcbiAgICAgICAgICAgICAgICBudW1Db21wb25lbnRzOiAzLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNTEyNixcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGU6IEZMT0FUX1ZFQzNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgUE9TSVRJT046IHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IF9wb3NpdGlvbnMsXHJcbiAgICAgICAgICAgICAgICBjb3VudDogNiAqIDQgKiAzLFxyXG4gICAgICAgICAgICAgICAgbG9jYXRpb246IDAsXHJcbiAgICAgICAgICAgICAgICBieXRlTGVuZ3RoOiBfcG9zaXRpb25zLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBzdHJpZGU6IDAsXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IDAsXHJcbiAgICAgICAgICAgICAgICBudW1Db21wb25lbnRzOiAzLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNTEyNixcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGU6IEZMT0FUX1ZFQzNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgVEVYQ09PUkRfMDoge1xyXG4gICAgICAgICAgICAgICAgZGF0YTogX3RleGNvb3JkcyxcclxuICAgICAgICAgICAgICAgIGNvdW50OiA0OCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDUxMjYsXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IDAsXHJcbiAgICAgICAgICAgICAgICBzdHJpZGU6IDAsXHJcbiAgICAgICAgICAgICAgICBieXRlTGVuZ3RoOiBfdGV4Y29vcmRzLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogNCxcclxuICAgICAgICAgICAgICAgIG51bUNvbXBvbmVudHM6IDIsXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVUeXBlOiBGTE9BVF9WRUMyXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbmRpY2VzOiBfaW5kaWNlcyxcclxuICAgICAgICBudW1FbGVtZW50czogX2luZGljZXMubGVuZ3RoLFxyXG4gICAgICAgIGNvbXBvbmVudFR5cGU6IDUxMjMsXHJcbiAgICAgICAgbW9kZTogNCxcclxuICAgIH07XHJcbiAgICByZXR1cm4gQXJyYXlEYXRhO1xyXG4gICAgLypyZXR1cm4ge1xyXG4gICAgICAgICAgICBnbHRmIDoge1xyXG4gICAgICAgICAgICAgIGFjY2Vzc29ycyA6IFtcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIGJ1ZmZlclZpZXcgOiAwLFxyXG4gICAgICAgICAgICAgICAgICBieXRlT2Zmc2V0IDogMCxcclxuICAgICAgICAgICAgICAgICAgY291bnQgOjcyLFxyXG4gICAgICAgICAgICAgICAgICBjb21wb25lbnRUeXBlIDogNTEyNixcclxuICAgICAgICAgICAgICAgICAgdHlwZSA6ICdWRUMzJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyVmlldyA6IDEsXHJcbiAgICAgICAgICAgICAgICBieXRlT2Zmc2V0IDogMCxcclxuICAgICAgICAgICAgICAgIGNvdW50IDogNzIsXHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnRUeXBlIDogNTEyNixcclxuICAgICAgICAgICAgICAgIHR5cGUgOiAnVkVDMydcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlclZpZXcgOiAyLFxyXG4gICAgICAgICAgICAgICAgYnl0ZU9mZnNldCA6IDAsXHJcbiAgICAgICAgICAgICAgICBjb3VudCA6IDM2LFxyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50VHlwZSA6IDUxMjMsXHJcbiAgICAgICAgICAgICAgICB0eXBlIDogJ1NDQUxBUidcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlclZpZXcgOiAzLFxyXG4gICAgICAgICAgICAgICAgYnl0ZU9mZnNldCA6IDAsXHJcbiAgICAgICAgICAgICAgICBjb3VudCA6IDQ4LFxyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50VHlwZSA6IDUxMjYsXHJcbiAgICAgICAgICAgICAgICB0eXBlIDogJ1ZFQzInXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIGJ1ZmZlclZpZXdzIDogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICBidWZmZXIgOiAwLFxyXG4gICAgICAgICAgICAgICAgICBieXRlTGVuZ3RoIDogcG9zaXRpb25zLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgIGJ5dGVPZmZzZXQgOiAwXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICBidWZmZXIgOiAxLFxyXG4gICAgICAgICAgICAgICAgICBieXRlTGVuZ3RoIDogbm9ybWFscy5ieXRlTGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgICBieXRlT2Zmc2V0IDogMFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgYnVmZmVyIDogMixcclxuICAgICAgICAgICAgICAgICAgYnl0ZUxlbmd0aCA6IGluZGljZXMuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgICAgYnl0ZU9mZnNldCA6IDBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIGJ1ZmZlciA6IDMsXHJcbiAgICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGggOiB0ZXhjb29yZC5ieXRlTGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgICBieXRlT2Zmc2V0IDogMFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIG1lc2hlcyA6IFtcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lIDogJ0N1YmUnLFxyXG4gICAgICAgICAgICAgICAgcHJpbWl0aXZlcyA6IFtcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXMgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBOT1JNQUwgOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgUE9TSVRJT04gOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgVEVYQ09PUkRfMCA6IDNcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGluZGljZXMgOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGUgOiA0XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIG5vZGVzIDogW1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWUgOiBcIkN1YmVcIixcclxuICAgICAgICAgICAgICAgIG1lc2ggOiAwLFxyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW4gOiBbMV1cclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWUgOiAnQ3ViZTInLFxyXG4gICAgICAgICAgICAgICAgbWVzaCA6IDAsXHJcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbiA6IFsxLDEsMV1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBiaW5hcnlCdWZmZXJzIDogW1xyXG4gICAgICAgICAgICBwb3NpdGlvbnMuYnVmZmVyLCBub3JtYWxzLmJ1ZmZlciwgaW5kaWNlcy5idWZmZXIsIHRleGNvb3JkLmJ1ZmZlclxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH07Ki9cclxufVxyXG5jb25zdCBjcmVhdGVDb25lID0gKHJhZGl1cyA9IDIsIGhlaWdodCA9IDIsIG51bUNvcm5lcnMgPSA0KSA9PiB7XHJcbiAgICBjb25zdCB2ZXJ0aWNlcyA9IFswLCAtaGVpZ2h0IC8gMiwgMF07XHJcbiAgICBjb25zdCBub3JtYWxzID0gW107XHJcbiAgICBjb25zdCBpbmRpY2VzID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNvcm5lcnMgKyAxOyBpKyspIHtcclxuICAgICAgICBjb25zdCBhbmdsZSA9ICgyICogaSAqIE1hdGguUEkpIC8gbnVtQ29ybmVycztcclxuICAgICAgICBjb25zdCB4ID0gTWF0aC5jb3MoYW5nbGUpICogcmFkaXVzO1xyXG4gICAgICAgIGNvbnN0IHogPSBNYXRoLnNpbihhbmdsZSkgKiByYWRpdXM7XHJcbiAgICAgICAgY29uc3QgeSA9IC1oZWlnaHQgLyAyO1xyXG4gICAgICAgIHZlcnRpY2VzLnB1c2goeCwgLWhlaWdodCAvIDIsIHopO1xyXG4gICAgICAgIG5vcm1hbHMucHVzaCgwLCAtMSwgMCk7XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNvcm5lcnM7IGkrKykge1xyXG4gICAgICAgIGluZGljZXMucHVzaCgwLCBpICsgMSwgaSArIDIpO1xyXG4gICAgfVxyXG4gICAgLy92ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzWzFdLCAtaGVpZ2h0LzIsIHZlcnRpY2VzWzNdKVxyXG4gICAgY29uc3QgbiA9IHZlcnRpY2VzLmxlbmd0aCAvIDM7XHJcbiAgICBjb25zdCBzdHJpZGUgPSAzO1xyXG4gICAgY29uc3Qgc3RhcnQgPSBuO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1Db3JuZXJzICsgMjsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgYW5nbGUgPSAoMiAqIGkgKiBNYXRoLlBJKSAvIG51bUNvcm5lcnM7XHJcbiAgICAgICAgY29uc3QgeCA9IE1hdGguY29zKGFuZ2xlKSAqIHJhZGl1cztcclxuICAgICAgICBjb25zdCB6ID0gTWF0aC5zaW4oYW5nbGUpICogcmFkaXVzO1xyXG4gICAgICAgIGNvbnN0IHkgPSAtaGVpZ2h0IC8gMjtcclxuICAgICAgICBjb25zdCBhID0gW3ZlcnRpY2VzW2kgKiAzXSwgdmVydGljZXNbaSAqIDMgKyAxXSwgdmVydGljZXNbaSAqIDMgKyAyXV07XHJcbiAgICAgICAgY29uc3QgYiA9IFt2ZXJ0aWNlc1tpICogMyArIDNdLCB2ZXJ0aWNlc1tpICogMyArIDRdLCB2ZXJ0aWNlc1tpICogMyArIDVdXTtcclxuICAgICAgICBjb25zdCBjID0gWzAsIGhlaWdodCAvIDIsIDBdO1xyXG4gICAgICAgIGluZGljZXMucHVzaChzdGFydCArIGkgKiBzdHJpZGUgKyAyLCBzdGFydCArIGkgKiBzdHJpZGUgKyAxLCBzdGFydCArIGkgKiBzdHJpZGUgKyAzKTtcclxuICAgICAgICB2ZXJ0aWNlcy5wdXNoKC4uLmMsIC4uLmEsIC4uLmIpO1xyXG4gICAgICAgIGNvbnN0IG5vcm1hbCA9IG5vcm1hbGl6ZShjcm9zcyhkaWZmKGIsIGMpLCBkaWZmKGEsIGMpKSk7XHJcbiAgICAgICAgbm9ybWFscy5wdXNoKC4uLm5vcm1hbCwgLi4ubm9ybWFsLCAuLi5ub3JtYWwpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgX25vcm1hbCA9IG5ldyBGbG9hdDMyQXJyYXkobm9ybWFscyk7XHJcbiAgICBjb25zdCBfcG9zaXRpb24gPSBuZXcgRmxvYXQzMkFycmF5KHZlcnRpY2VzKTtcclxuICAgIGNvbnN0IF9pbmRpY2VzID0gbmV3IFVpbnQxNkFycmF5KGluZGljZXMpO1xyXG4gICAgY29uc3QgQXJyYXlEYXRhID0ge1xyXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcclxuICAgICAgICAgICAgUE9TSVRJT046IHtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAwLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IHZlcnRpY2VzLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICAgICAgICAgIHN0cmlkZTogMCxcclxuICAgICAgICAgICAgICAgIG51bUNvbXBvbmVudHM6IDMsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiA1MTI2LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogX3Bvc2l0aW9uLFxyXG4gICAgICAgICAgICAgICAgYnl0ZUxlbmd0aDogX3Bvc2l0aW9uLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVUeXBlOiBGTE9BVF9WRUMzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIE5PUk1BTDoge1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb246IDEsXHJcbiAgICAgICAgICAgICAgICBjb3VudDogbm9ybWFscy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBudW1Db21wb25lbnRzOiAzLFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAwLFxyXG4gICAgICAgICAgICAgICAgc3RyaWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNTEyNixcclxuICAgICAgICAgICAgICAgIGRhdGE6IF9ub3JtYWwsXHJcbiAgICAgICAgICAgICAgICBieXRlTGVuZ3RoOiBfbm9ybWFsLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVUeXBlOiBGTE9BVF9WRUMzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wb25lbnRUeXBlOiA1MTIzLFxyXG4gICAgICAgIGluZGljZXM6IF9pbmRpY2VzLFxyXG4gICAgICAgIG51bUVsZW1lbnRzOiBpbmRpY2VzLmxlbmd0aCxcclxuICAgICAgICBtb2RlOiA0LFxyXG4gICAgfTtcclxuICAgIHJldHVybiBBcnJheURhdGE7XHJcbn07XHJcbmNvbnN0IGNyZWF0ZUNpcmNsZSA9IChyYWRpdXMsIG51bUNvcm5lcnMpID0+IHtcclxuICAgIGNvbnN0IHZlcnRpY2VzID0gWzAsIDAsIDBdO1xyXG4gICAgY29uc3Qgbm9ybWFscyA9IFtdO1xyXG4gICAgY29uc3QgaW5kaWNlcyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1Db3JuZXJzICsgMTsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgYW5nbGUgPSAoMiAqIGkgKiBNYXRoLlBJKSAvIG51bUNvcm5lcnM7XHJcbiAgICAgICAgY29uc3QgeCA9IE1hdGguY29zKGFuZ2xlKSAqIHJhZGl1cztcclxuICAgICAgICBjb25zdCB6ID0gTWF0aC5zaW4oYW5nbGUpICogcmFkaXVzO1xyXG4gICAgICAgIHZlcnRpY2VzLnB1c2goeCwgMCwgeik7XHJcbiAgICAgICAgbm9ybWFscy5wdXNoKDAsIDEsIDApO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1Db3JuZXJzOyBpKyspIHtcclxuICAgICAgICBpbmRpY2VzLnB1c2goMCwgaSArIDEsIGkgKyAyKTtcclxuICAgIH1cclxuICAgIGNvbnN0IF9ub3JtYWwgPSBuZXcgRmxvYXQzMkFycmF5KG5vcm1hbHMpO1xyXG4gICAgY29uc3QgX3Bvc2l0aW9uID0gbmV3IEZsb2F0MzJBcnJheSh2ZXJ0aWNlcyk7XHJcbiAgICBjb25zdCBfaW5kaWNlcyA9IG5ldyBVaW50MTZBcnJheShpbmRpY2VzKTtcclxuICAgIGNvbnN0IEFycmF5RGF0YSA9IHtcclxuICAgICAgICBhdHRyaWJ1dGVzOiB7XHJcbiAgICAgICAgICAgIFBPU0lUSU9OOiB7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogMCxcclxuICAgICAgICAgICAgICAgIGNvdW50OiB2ZXJ0aWNlcy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IDAsXHJcbiAgICAgICAgICAgICAgICBzdHJpZGU6IDAsXHJcbiAgICAgICAgICAgICAgICBudW1Db21wb25lbnRzOiAzLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNTEyNixcclxuICAgICAgICAgICAgICAgIGRhdGE6IF9wb3NpdGlvbixcclxuICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGg6IF9wb3NpdGlvbi5ieXRlTGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlVHlwZTogRkxPQVRfVkVDM1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBOT1JNQUw6IHtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAxLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IG5vcm1hbHMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgbnVtQ29tcG9uZW50czogMyxcclxuICAgICAgICAgICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICAgICAgICAgIHN0cmlkZTogMCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDUxMjYsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBfbm9ybWFsLFxyXG4gICAgICAgICAgICAgICAgYnl0ZUxlbmd0aDogX25vcm1hbC5ieXRlTGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlVHlwZTogRkxPQVRfVkVDM1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcG9uZW50VHlwZTogNTEyMyxcclxuICAgICAgICBpbmRpY2VzOiBfaW5kaWNlcyxcclxuICAgICAgICBudW1FbGVtZW50czogaW5kaWNlcy5sZW5ndGgsXHJcbiAgICAgICAgbW9kZTogNCxcclxuICAgIH07XHJcbiAgICByZXR1cm4gQXJyYXlEYXRhO1xyXG59O1xyXG5jb25zdCBjcmVhdGVTcGhlcmUgPSAocmFkaXVzLCBzdWJkaXZpc2lvbnNBeGlzLCBzdWJkaXZpc2lvbnNIZWlnaHQsIG9wdF9zdGFydExhdGl0dWRlSW5SYWRpYW5zLCBvcHRfZW5kTGF0aXR1ZGVJblJhZGlhbnMsIG9wdF9zdGFydExvbmdpdHVkZUluUmFkaWFucywgb3B0X2VuZExvbmdpdHVkZUluUmFkaWFucykgPT4ge1xyXG4gICAgaWYgKHN1YmRpdmlzaW9uc0F4aXMgPD0gMCB8fCBzdWJkaXZpc2lvbnNIZWlnaHQgPD0gMCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInN1YmRpdmlzaW9uQXhpcyBhbmQgc3ViZGl2aXNpb25IZWlnaHQgbXVzdCBiZSA+IDBcIik7XHJcbiAgICB9XHJcbiAgICBvcHRfc3RhcnRMYXRpdHVkZUluUmFkaWFucyA9IG9wdF9zdGFydExhdGl0dWRlSW5SYWRpYW5zIHx8IDA7XHJcbiAgICBvcHRfZW5kTGF0aXR1ZGVJblJhZGlhbnMgPSBvcHRfZW5kTGF0aXR1ZGVJblJhZGlhbnMgfHwgTWF0aC5QSTtcclxuICAgIG9wdF9zdGFydExvbmdpdHVkZUluUmFkaWFucyA9IG9wdF9zdGFydExvbmdpdHVkZUluUmFkaWFucyB8fCAwO1xyXG4gICAgb3B0X2VuZExvbmdpdHVkZUluUmFkaWFucyA9IG9wdF9lbmRMb25naXR1ZGVJblJhZGlhbnMgfHwgTWF0aC5QSSAqIDI7XHJcbiAgICBjb25zdCBsYXRSYW5nZSA9IG9wdF9lbmRMYXRpdHVkZUluUmFkaWFucyAtIG9wdF9zdGFydExhdGl0dWRlSW5SYWRpYW5zO1xyXG4gICAgY29uc3QgbG9uZ1JhbmdlID0gb3B0X2VuZExvbmdpdHVkZUluUmFkaWFucyAtIG9wdF9zdGFydExvbmdpdHVkZUluUmFkaWFucztcclxuICAgIGNvbnN0IHBvc2l0aW9ucyA9IFtdO1xyXG4gICAgY29uc3Qgbm9ybWFscyA9IFtdO1xyXG4gICAgY29uc3QgdGV4Y29vcmRzID0gW107XHJcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8PSBzdWJkaXZpc2lvbnNIZWlnaHQ7IHkrKykge1xyXG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDw9IHN1YmRpdmlzaW9uc0F4aXM7IHgrKykge1xyXG4gICAgICAgICAgICBjb25zdCB1ID0geCAvIHN1YmRpdmlzaW9uc0F4aXM7XHJcbiAgICAgICAgICAgIGNvbnN0IHYgPSB5IC8gc3ViZGl2aXNpb25zSGVpZ2h0O1xyXG4gICAgICAgICAgICBjb25zdCB0aGV0YSA9IGxvbmdSYW5nZSAqIHUgKyBvcHRfc3RhcnRMb25naXR1ZGVJblJhZGlhbnM7XHJcbiAgICAgICAgICAgIGNvbnN0IHBoaSA9IGxhdFJhbmdlICogdiArIG9wdF9zdGFydExhdGl0dWRlSW5SYWRpYW5zO1xyXG4gICAgICAgICAgICBjb25zdCBzaW5UaGV0YSA9IE1hdGguc2luKHRoZXRhKTtcclxuICAgICAgICAgICAgY29uc3QgY29zVGhldGEgPSBNYXRoLmNvcyh0aGV0YSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNpblBoaSA9IE1hdGguc2luKHBoaSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvc1BoaSA9IE1hdGguY29zKHBoaSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHV4ID0gY29zVGhldGEgKiBzaW5QaGk7XHJcbiAgICAgICAgICAgIGNvbnN0IHV5ID0gY29zUGhpO1xyXG4gICAgICAgICAgICBjb25zdCB1eiA9IHNpblRoZXRhICogc2luUGhpO1xyXG4gICAgICAgICAgICBwb3NpdGlvbnMucHVzaChyYWRpdXMgKiB1eCwgcmFkaXVzICogdXksIHJhZGl1cyAqIHV6KTtcclxuICAgICAgICAgICAgbm9ybWFscy5wdXNoKHV4LCB1eSwgdXopO1xyXG4gICAgICAgICAgICB0ZXhjb29yZHMucHVzaCgxIC0gdSwgdik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3QgbnVtVmVydHNBcm91bmQgPSBzdWJkaXZpc2lvbnNBeGlzICsgMTtcclxuICAgIGNvbnN0IGluZGljZXMgPSBbXTtcclxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgc3ViZGl2aXNpb25zQXhpczsgeCsrKSB7XHJcbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCBzdWJkaXZpc2lvbnNIZWlnaHQ7IHkrKykge1xyXG4gICAgICAgICAgICBpbmRpY2VzLnB1c2goKHkgKyAwKSAqIG51bVZlcnRzQXJvdW5kICsgeCwgKHkgKyAwKSAqIG51bVZlcnRzQXJvdW5kICsgeCArIDEsICh5ICsgMSkgKiBudW1WZXJ0c0Fyb3VuZCArIHgpO1xyXG4gICAgICAgICAgICBpbmRpY2VzLnB1c2goKHkgKyAxKSAqIG51bVZlcnRzQXJvdW5kICsgeCwgKHkgKyAwKSAqIG51bVZlcnRzQXJvdW5kICsgeCArIDEsICh5ICsgMSkgKiBudW1WZXJ0c0Fyb3VuZCArIHggKyAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCBfcG9zaXRpb25zID0gbmV3IEZsb2F0MzJBcnJheShwb3NpdGlvbnMpO1xyXG4gICAgY29uc3QgX25vcm1hbHMgPSBuZXcgRmxvYXQzMkFycmF5KG5vcm1hbHMpO1xyXG4gICAgY29uc3QgX3RleGNvb3JkcyA9IG5ldyBGbG9hdDMyQXJyYXkodGV4Y29vcmRzKTtcclxuICAgIGNvbnN0IF9pbmRpY2VzID0gbmV3IFVpbnQxNkFycmF5KGluZGljZXMpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBhdHRyaWJ1dGVzOiB7XHJcbiAgICAgICAgICAgIFBPU0lUSU9OOiB7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogMCxcclxuICAgICAgICAgICAgICAgIGNvdW50OiBwb3NpdGlvbnMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAwLFxyXG4gICAgICAgICAgICAgICAgc3RyaWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgbnVtQ29tcG9uZW50czogMyxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDUxMjYsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBfcG9zaXRpb25zLFxyXG4gICAgICAgICAgICAgICAgYnl0ZUxlbmd0aDogX3Bvc2l0aW9ucy5ieXRlTGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlVHlwZTogRkxPQVRfVkVDM1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBOT1JNQUw6IHtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAxLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IG5vcm1hbHMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgbnVtQ29tcG9uZW50czogMyxcclxuICAgICAgICAgICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICAgICAgICAgIHN0cmlkZTogMCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDUxMjYsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBfbm9ybWFscyxcclxuICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGg6IF9ub3JtYWxzLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVUeXBlOiBGTE9BVF9WRUMzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFRFWENPT1JEXzA6IHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IF90ZXhjb29yZHMsXHJcbiAgICAgICAgICAgICAgICBjb3VudDogX3RleGNvb3Jkcy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiA1MTI2LFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAwLFxyXG4gICAgICAgICAgICAgICAgc3RyaWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgYnl0ZUxlbmd0aDogX3RleGNvb3Jkcy5ieXRlTGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgbG9jYXRpb246IDQsXHJcbiAgICAgICAgICAgICAgICBudW1Db21wb25lbnRzOiAyLFxyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlVHlwZTogRkxPQVRfVkVDMlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcG9uZW50VHlwZTogNTEyMyxcclxuICAgICAgICBpbmRpY2VzOiBfaW5kaWNlcyxcclxuICAgICAgICBudW1FbGVtZW50czogaW5kaWNlcy5sZW5ndGgsXHJcbiAgICAgICAgbW9kZTogNCxcclxuICAgIH07XHJcbn07XHJcbmNvbnN0IGNyZWF0ZVRydW5jYXRlZENvbmUgPSAoYm90dG9tUmFkaXVzLCB0b3BSYWRpdXMsIGhlaWdodCwgcmFkaWFsU3ViZGl2aXNpb25zLCB2ZXJ0aWNhbFN1YmRpdmlzaW9ucywgb3B0X3RvcENhcCwgb3B0X2JvdHRvbUNhcCkgPT4ge1xyXG4gICAgaWYgKHJhZGlhbFN1YmRpdmlzaW9ucyA8IDMpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJyYWRpYWxTdWJkaXZpc2lvbnMgbXVzdCBiZSAzIG9yIGdyZWF0ZXJcIik7XHJcbiAgICB9XHJcbiAgICBpZiAodmVydGljYWxTdWJkaXZpc2lvbnMgPCAxKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidmVydGljYWxTdWJkaXZpc2lvbnMgbXVzdCBiZSAxIG9yIGdyZWF0ZXJcIik7XHJcbiAgICB9XHJcbiAgICBjb25zdCB0b3BDYXAgPSBvcHRfdG9wQ2FwID09PSB1bmRlZmluZWQgPyB0cnVlIDogb3B0X3RvcENhcDtcclxuICAgIGNvbnN0IGJvdHRvbUNhcCA9IG9wdF9ib3R0b21DYXAgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBvcHRfYm90dG9tQ2FwO1xyXG4gICAgY29uc3QgZXh0cmEgPSAodG9wQ2FwID8gMiA6IDApICsgKGJvdHRvbUNhcCA/IDIgOiAwKTtcclxuICAgIGNvbnN0IG51bVZlcnRpY2VzID0gKHJhZGlhbFN1YmRpdmlzaW9ucyArIDEpICogKHZlcnRpY2FsU3ViZGl2aXNpb25zICsgMSArIGV4dHJhKTtcclxuICAgIGNvbnN0IHBvc2l0aW9ucyA9IFtdO1xyXG4gICAgY29uc3Qgbm9ybWFscyA9IFtdO1xyXG4gICAgY29uc3QgdGV4Y29vcmRzID0gW107XHJcbiAgICBjb25zdCBpbmRpY2VzID0gW107XHJcbiAgICBjb25zdCB2ZXJ0c0Fyb3VuZEVkZ2UgPSByYWRpYWxTdWJkaXZpc2lvbnMgKyAxO1xyXG4gICAgY29uc3Qgc2xhbnQgPSBNYXRoLmF0YW4yKGJvdHRvbVJhZGl1cyAtIHRvcFJhZGl1cywgaGVpZ2h0KTtcclxuICAgIGNvbnN0IGNvc1NsYW50ID0gTWF0aC5jb3Moc2xhbnQpO1xyXG4gICAgY29uc3Qgc2luU2xhbnQgPSBNYXRoLnNpbihzbGFudCk7XHJcbiAgICBjb25zdCBzdGFydCA9IHRvcENhcCA/IC0yIDogMDtcclxuICAgIGNvbnN0IGVuZCA9IHZlcnRpY2FsU3ViZGl2aXNpb25zICsgKGJvdHRvbUNhcCA/IDIgOiAwKTtcclxuICAgIGZvciAobGV0IHl5ID0gc3RhcnQ7IHl5IDw9IGVuZDsgKyt5eSkge1xyXG4gICAgICAgIGxldCB2ID0geXkgLyB2ZXJ0aWNhbFN1YmRpdmlzaW9ucztcclxuICAgICAgICBsZXQgeSA9IGhlaWdodCAqIHY7XHJcbiAgICAgICAgbGV0IHJpbmdSYWRpdXM7XHJcbiAgICAgICAgaWYgKHl5IDwgMCkge1xyXG4gICAgICAgICAgICB5ID0gMDtcclxuICAgICAgICAgICAgdiA9IDE7XHJcbiAgICAgICAgICAgIHJpbmdSYWRpdXMgPSBib3R0b21SYWRpdXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHl5ID4gdmVydGljYWxTdWJkaXZpc2lvbnMpIHtcclxuICAgICAgICAgICAgeSA9IGhlaWdodDtcclxuICAgICAgICAgICAgdiA9IDE7XHJcbiAgICAgICAgICAgIHJpbmdSYWRpdXMgPSB0b3BSYWRpdXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByaW5nUmFkaXVzID1cclxuICAgICAgICAgICAgICAgIGJvdHRvbVJhZGl1cyArICh0b3BSYWRpdXMgLSBib3R0b21SYWRpdXMpICogKHl5IC8gdmVydGljYWxTdWJkaXZpc2lvbnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoeXkgPT09IC0yIHx8IHl5ID09PSB2ZXJ0aWNhbFN1YmRpdmlzaW9ucyArIDIpIHtcclxuICAgICAgICAgICAgcmluZ1JhZGl1cyA9IDA7XHJcbiAgICAgICAgICAgIHYgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB5IC09IGhlaWdodCAvIDI7XHJcbiAgICAgICAgZm9yIChsZXQgaWkgPSAwOyBpaSA8IHZlcnRzQXJvdW5kRWRnZTsgKytpaSkge1xyXG4gICAgICAgICAgICBjb25zdCBzaW4gPSBNYXRoLnNpbigoaWkgKiBNYXRoLlBJICogMikgLyByYWRpYWxTdWJkaXZpc2lvbnMpO1xyXG4gICAgICAgICAgICBjb25zdCBjb3MgPSBNYXRoLmNvcygoaWkgKiBNYXRoLlBJICogMikgLyByYWRpYWxTdWJkaXZpc2lvbnMpO1xyXG4gICAgICAgICAgICBwb3NpdGlvbnMucHVzaChzaW4gKiByaW5nUmFkaXVzLCB5LCBjb3MgKiByaW5nUmFkaXVzKTtcclxuICAgICAgICAgICAgaWYgKHl5IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgbm9ybWFscy5wdXNoKDAsIC0xLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh5eSA+IHZlcnRpY2FsU3ViZGl2aXNpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBub3JtYWxzLnB1c2goMCwgMSwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAocmluZ1JhZGl1cyA9PT0gMC4wKSB7XHJcbiAgICAgICAgICAgICAgICBub3JtYWxzLnB1c2goMCwgMCwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBub3JtYWxzLnB1c2goc2luICogY29zU2xhbnQsIHNpblNsYW50LCBjb3MgKiBjb3NTbGFudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGV4Y29vcmRzLnB1c2goaWkgLyByYWRpYWxTdWJkaXZpc2lvbnMsIDEgLSB2KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCB5eSA9IDA7IHl5IDwgdmVydGljYWxTdWJkaXZpc2lvbnMgKyBleHRyYTsgKyt5eSkge1xyXG4gICAgICAgIGlmICgoeXkgPT09IDEgJiYgdG9wQ2FwKSB8fFxyXG4gICAgICAgICAgICAoeXkgPT09IHZlcnRpY2FsU3ViZGl2aXNpb25zICsgZXh0cmEgLSAyICYmIGJvdHRvbUNhcCkpIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGlpID0gMDsgaWkgPCByYWRpYWxTdWJkaXZpc2lvbnM7ICsraWkpIHtcclxuICAgICAgICAgICAgaW5kaWNlcy5wdXNoKHZlcnRzQXJvdW5kRWRnZSAqICh5eSArIDApICsgMCArIGlpLCB2ZXJ0c0Fyb3VuZEVkZ2UgKiAoeXkgKyAwKSArIDEgKyBpaSwgdmVydHNBcm91bmRFZGdlICogKHl5ICsgMSkgKyAxICsgaWkpO1xyXG4gICAgICAgICAgICBpbmRpY2VzLnB1c2godmVydHNBcm91bmRFZGdlICogKHl5ICsgMCkgKyAwICsgaWksIHZlcnRzQXJvdW5kRWRnZSAqICh5eSArIDEpICsgMSArIGlpLCB2ZXJ0c0Fyb3VuZEVkZ2UgKiAoeXkgKyAxKSArIDAgKyBpaSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3QgX3Bvc2l0aW9ucyA9IG5ldyBGbG9hdDMyQXJyYXkocG9zaXRpb25zKTtcclxuICAgIGNvbnN0IF9ub3JtYWxzID0gbmV3IEZsb2F0MzJBcnJheShub3JtYWxzKTtcclxuICAgIGNvbnN0IF90ZXhjb29yZHMgPSBuZXcgRmxvYXQzMkFycmF5KHRleGNvb3Jkcyk7XHJcbiAgICBjb25zdCBfaW5kaWNlcyA9IG5ldyBVaW50MTZBcnJheShpbmRpY2VzKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYXR0cmlidXRlczoge1xyXG4gICAgICAgICAgICBQT1NJVElPTjoge1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb246IDAsXHJcbiAgICAgICAgICAgICAgICBjb3VudDogcG9zaXRpb25zLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICAgICAgICAgIHN0cmlkZTogMCxcclxuICAgICAgICAgICAgICAgIG51bUNvbXBvbmVudHM6IDMsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiA1MTI2LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogX3Bvc2l0aW9ucyxcclxuICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGg6IF9wb3NpdGlvbnMuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGU6IEZMT0FUX1ZFQzNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgTk9STUFMOiB7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogMSxcclxuICAgICAgICAgICAgICAgIGNvdW50OiBub3JtYWxzLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgIG51bUNvbXBvbmVudHM6IDMsXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IDAsXHJcbiAgICAgICAgICAgICAgICBzdHJpZGU6IDAsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiA1MTI2LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogX25vcm1hbHMsXHJcbiAgICAgICAgICAgICAgICBieXRlTGVuZ3RoOiBfbm9ybWFscy5ieXRlTGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlVHlwZTogRkxPQVRfVkVDM1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBURVhDT09SRF8wOiB7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiBfdGV4Y29vcmRzLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IF90ZXhjb29yZHMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNTEyNixcclxuICAgICAgICAgICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICAgICAgICAgIHN0cmlkZTogMCxcclxuICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGg6IF90ZXhjb29yZHMuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiA0LFxyXG4gICAgICAgICAgICAgICAgbnVtQ29tcG9uZW50czogMixcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGU6IEZMT0FUX1ZFQzJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBvbmVudFR5cGU6IDUxMjMsXHJcbiAgICAgICAgaW5kaWNlczogX2luZGljZXMsXHJcbiAgICAgICAgbnVtRWxlbWVudHM6IGluZGljZXMubGVuZ3RoLFxyXG4gICAgICAgIG1vZGU6IDQsXHJcbiAgICB9O1xyXG59O1xyXG5leHBvcnQgeyBjcmVhdGVCb3gsIGNyZWF0ZUNvbmUsIGNyZWF0ZUNpcmNsZSwgY3JlYXRlU3BoZXJlLCBjcmVhdGVUcnVuY2F0ZWRDb25lIH07XHJcbiIsImZ1bmN0aW9uIGNyZWF0ZVVuaWZvcm1TZXR0ZXJzKGdsLCBwcm9ncmFtKSB7XHJcbiAgICBjb25zdCBjcmVhdGVUZXh0dXJlU2V0dGVyID0gKHByb2dyYW0sIHVuaWZvcm1JbmZvKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbG9jYXRpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgdW5pZm9ybUluZm8ubmFtZSk7XHJcbiAgICAgICAgcmV0dXJuICh0ZXhCbG9ja051bSkgPT4ge1xyXG4gICAgICAgICAgICBnbC51bmlmb3JtMWkobG9jYXRpb24sIHRleEJsb2NrTnVtKTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZVVuaWZvcm1TZXR0ZXIocHJvZ3JhbSwgdW5pZm9ybUluZm8pIHtcclxuICAgICAgICBjb25zdCBsb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCB1bmlmb3JtSW5mby5uYW1lKTtcclxuICAgICAgICBjb25zdCB0eXBlID0gdW5pZm9ybUluZm8udHlwZTtcclxuICAgICAgICBjb25zdCBpc0FycmF5ID0gdW5pZm9ybUluZm8uc2l6ZSA+IDEgJiYgdW5pZm9ybUluZm8ubmFtZS5zdWJzdHIoLTMpID09PSBcIlswXVwiO1xyXG4gICAgICAgIGlmICh0eXBlID09PSBnbC5GTE9BVCAmJiBpc0FycmF5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgZ2wudW5pZm9ybTFmdihsb2NhdGlvbiwgdik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSBnbC5GTE9BVCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgICAgIGdsLnVuaWZvcm0xZihsb2NhdGlvbiwgdik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSBnbC5GTE9BVF9WRUMyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgZ2wudW5pZm9ybTJmdihsb2NhdGlvbiwgdik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSBnbC5GTE9BVF9WRUMzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgZ2wudW5pZm9ybTNmdihsb2NhdGlvbiwgdik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSBnbC5GTE9BVF9WRUM0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgZ2wudW5pZm9ybTRmdihsb2NhdGlvbiwgdik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSBnbC5JTlQgJiYgaXNBcnJheSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgICAgIGdsLnVuaWZvcm0xaXYobG9jYXRpb24sIHYpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gZ2wuSU5UKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgZ2wudW5pZm9ybTFpKGxvY2F0aW9uLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLklOVF9WRUMyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgZ2wudW5pZm9ybTJpdihsb2NhdGlvbiwgdik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSBnbC5JTlRfVkVDMykge1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgICAgIGdsLnVuaWZvcm0zaXYobG9jYXRpb24sIHYpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gZ2wuSU5UX1ZFQzQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtNGl2KGxvY2F0aW9uLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLkJPT0wpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtMWl2KGxvY2F0aW9uLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLkJPT0xfVkVDMikge1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgICAgIGdsLnVuaWZvcm0yaXYobG9jYXRpb24sIHYpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gZ2wuQk9PTF9WRUMzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgZ2wudW5pZm9ybTNpdihsb2NhdGlvbiwgdik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSBnbC5CT09MX1ZFQzQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtNGl2KGxvY2F0aW9uLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLkZMT0FUX01BVDIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtTWF0cml4MmZ2KGxvY2F0aW9uLCBmYWxzZSwgdik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSBnbC5GTE9BVF9NQVQzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgZ2wudW5pZm9ybU1hdHJpeDNmdihsb2NhdGlvbiwgZmFsc2UsIHYpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gZ2wuRkxPQVRfTUFUNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYobG9jYXRpb24sIGZhbHNlLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCB1bmlmb3JtU2V0dGVycyA9IHt9O1xyXG4gICAgY29uc3QgdGV4dHVyZVNldHRlcnMgPSB7fTtcclxuICAgIGNvbnN0IG51bVVuaWZvcm1zID0gZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcm9ncmFtLCBnbC5BQ1RJVkVfVU5JRk9STVMpO1xyXG4gICAgZm9yIChsZXQgaWkgPSAwOyBpaSA8IG51bVVuaWZvcm1zOyArK2lpKSB7XHJcbiAgICAgICAgY29uc3QgdW5pZm9ybUluZm8gPSBnbC5nZXRBY3RpdmVVbmlmb3JtKHByb2dyYW0sIGlpKTtcclxuICAgICAgICBpZiAoIXVuaWZvcm1JbmZvKSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbmFtZSA9IHVuaWZvcm1JbmZvLm5hbWU7XHJcbiAgICAgICAgaWYgKHVuaWZvcm1JbmZvLnR5cGUgPT09IGdsLlNBTVBMRVJfMkQpIHtcclxuICAgICAgICAgICAgdGV4dHVyZVNldHRlcnNbbmFtZV0gPSBjcmVhdGVUZXh0dXJlU2V0dGVyKHByb2dyYW0sIHVuaWZvcm1JbmZvKTtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuYW1lLnN1YnN0cigtMykgPT09IFwiWzBdXCIpIHtcclxuICAgICAgICAgICAgbmFtZSA9IG5hbWUuc3Vic3RyKDAsIG5hbWUubGVuZ3RoIC0gMyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh1bmlmb3JtSW5mby5zaXplID4gMSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHVuaWZvcm1JbmZvLnNpemU7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb2JqID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNpemU6IHVuaWZvcm1JbmZvLnNpemUsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogdW5pZm9ybUluZm8udHlwZSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBuYW1lICsgYFske2l9XWAsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdW5pZm9ybVNldHRlcnNbbmFtZSArIGBbJHtpfV1gXSA9IGNyZWF0ZVVuaWZvcm1TZXR0ZXIocHJvZ3JhbSwgb2JqKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3Qgc2V0dGVyID0gY3JlYXRlVW5pZm9ybVNldHRlcihwcm9ncmFtLCB1bmlmb3JtSW5mbyk7XHJcbiAgICAgICAgICAgIHVuaWZvcm1TZXR0ZXJzW25hbWVdID0gc2V0dGVyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB7IHVuaWZvcm1TZXR0ZXJzLCB0ZXh0dXJlU2V0dGVycyB9O1xyXG59XHJcbmNsYXNzIFByb2dyYW1JbmZvIHtcclxuICAgIGNvbnN0cnVjdG9yKGdsV3JhcHBlciwgdmVydGV4U2hhZGVyU291cmNlLCBmcmFnbWVudFNoYWRlclNvdXJjZSkge1xyXG4gICAgICAgIHRoaXMudmVydGV4U2hhZGVyU291cmNlID0gdmVydGV4U2hhZGVyU291cmNlO1xyXG4gICAgICAgIHRoaXMuZnJhZ21lbnRTaGFkZXJTb3VyY2UgPSBmcmFnbWVudFNoYWRlclNvdXJjZTtcclxuICAgICAgICB0aGlzLnVuaWZvcm1TZXR0ZXJzID0gbnVsbDtcclxuICAgICAgICB0aGlzLnRleHR1cmVTZXR0ZXJzID0gbnVsbDtcclxuICAgICAgICB0aGlzLnZlcnRleFNoYWRlciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5mcmFnbWVudFNoYWRlciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5wcm9ncmFtID0gbnVsbDtcclxuICAgICAgICB0aGlzLmdsV3JhcHBlciA9IGdsV3JhcHBlcjtcclxuICAgIH1cclxuICAgIGNyZWF0ZVVuaWZvcm1TZXR0ZXJzKCkge1xyXG4gICAgICAgIGNvbnN0IHsgZ2xXcmFwcGVyLCBwcm9ncmFtIH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IHsgZ2wgfSA9IGdsV3JhcHBlcjtcclxuICAgICAgICBjb25zdCB7IHVuaWZvcm1TZXR0ZXJzLCB0ZXh0dXJlU2V0dGVycyB9ID0gY3JlYXRlVW5pZm9ybVNldHRlcnMoZ2wsIHByb2dyYW0pO1xyXG4gICAgICAgIHRoaXMudGV4dHVyZVNldHRlcnMgPSB0ZXh0dXJlU2V0dGVycztcclxuICAgICAgICB0aGlzLnVuaWZvcm1TZXR0ZXJzID0gdW5pZm9ybVNldHRlcnM7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBjb21waWxlU2hhZGVycygpIHtcclxuICAgICAgICBjb25zdCB7IGdsV3JhcHBlciwgZnJhZ21lbnRTaGFkZXJTb3VyY2UsIHZlcnRleFNoYWRlclNvdXJjZSB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCB7IGdsIH0gPSBnbFdyYXBwZXI7XHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhTaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuVkVSVEVYX1NIQURFUik7XHJcbiAgICAgICAgZ2wuc2hhZGVyU291cmNlKHRoaXMudmVydGV4U2hhZGVyLCB2ZXJ0ZXhTaGFkZXJTb3VyY2UpO1xyXG4gICAgICAgIGdsLmNvbXBpbGVTaGFkZXIodGhpcy52ZXJ0ZXhTaGFkZXIpO1xyXG4gICAgICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHRoaXMudmVydGV4U2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUykpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGdsLmdldFNoYWRlckluZm9Mb2codGhpcy52ZXJ0ZXhTaGFkZXIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mcmFnbWVudFNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcihnbC5GUkFHTUVOVF9TSEFERVIpO1xyXG4gICAgICAgIGdsLnNoYWRlclNvdXJjZSh0aGlzLmZyYWdtZW50U2hhZGVyLCBmcmFnbWVudFNoYWRlclNvdXJjZSk7XHJcbiAgICAgICAgZ2wuY29tcGlsZVNoYWRlcih0aGlzLmZyYWdtZW50U2hhZGVyKTtcclxuICAgICAgICBpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlcih0aGlzLmZyYWdtZW50U2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUykpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGdsLmdldFNoYWRlckluZm9Mb2codGhpcy5mcmFnbWVudFNoYWRlcikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XHJcbiAgICAgICAgZ2wuYXR0YWNoU2hhZGVyKHRoaXMucHJvZ3JhbSwgdGhpcy52ZXJ0ZXhTaGFkZXIpO1xyXG4gICAgICAgIGdsLmF0dGFjaFNoYWRlcih0aGlzLnByb2dyYW0sIHRoaXMuZnJhZ21lbnRTaGFkZXIpO1xyXG4gICAgICAgIGdsLmxpbmtQcm9ncmFtKHRoaXMucHJvZ3JhbSk7XHJcbiAgICAgICAgaWYgKCFnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHRoaXMucHJvZ3JhbSwgZ2wuTElOS19TVEFUVVMpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihnbC5nZXRQcm9ncmFtSW5mb0xvZyh0aGlzLnByb2dyYW0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBzZXRVbmlmb3Jtcyh1bmlmb3Jtcykge1xyXG4gICAgICAgIGNvbnN0IHsgdW5pZm9ybVNldHRlcnMsIGdsV3JhcHBlciB9ID0gdGhpcztcclxuICAgICAgICBnbFdyYXBwZXIudXNlUHJvZ3JhbUluZm8odGhpcyk7XHJcbiAgICAgICAgT2JqZWN0LmtleXModW5pZm9ybXMpLmZvckVhY2goKG5hbWUpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc2V0dGVyID0gdW5pZm9ybVNldHRlcnNbbmFtZV07XHJcbiAgICAgICAgICAgIGlmIChzZXR0ZXIpXHJcbiAgICAgICAgICAgICAgICBzZXR0ZXIodW5pZm9ybXNbbmFtZV0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2V0VGV4dHVyZVVuaWZvcm1Vbml0KG5hbWUsIHVuaXQpIHtcclxuICAgICAgICBjb25zdCB7IHRleHR1cmVTZXR0ZXJzLCBnbFdyYXBwZXIgfSA9IHRoaXM7XHJcbiAgICAgICAgZ2xXcmFwcGVyLnVzZVByb2dyYW1JbmZvKHRoaXMpO1xyXG4gICAgICAgIGNvbnN0IHNldHRlciA9IHRleHR1cmVTZXR0ZXJzW25hbWVdO1xyXG4gICAgICAgIGlmIChzZXR0ZXIpXHJcbiAgICAgICAgICAgIHNldHRlcih1bml0KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG5leHBvcnQgeyBQcm9ncmFtSW5mbyB9O1xyXG4iLCIvKmNvbnN0IHNldENhbnZhc1NpemUgPSAoY3R4LCB3aWR0aCwgaGVpZ2h0KSA9PiB7XHJcbiAgY3R4LmNhbnZhcy53aWR0aCA9IHdpZHRoO1xyXG4gIGN0eC5jYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG59O1xyXG5cclxuY29uc3QgbWFrZVRleHR1cmUgPSAoZ2wsIGN0eCkgPT4ge1xyXG4gIGNvbnN0IHRleCA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcclxuICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0ZXgpO1xyXG5cclxuICBnbC50ZXhJbWFnZTJEKFxyXG4gICAgZ2wuVEVYVFVSRV8yRCxcclxuICAgIDAsXHJcbiAgICBnbC5SR0JBLFxyXG4gICAgZ2wuUkdCQSxcclxuICAgIGdsLlVOU0lHTkVEX0JZVEUsXHJcbiAgICBjdHguY2FudmFzXHJcbiAgKTtcclxuICByZXR1cm4gdGV4O1xyXG59O1xyXG5cclxuY29uc3QgbWFrZVN0cmlwZVRleHR1cmUgPSAoZ2wsIG9wdGlvbnMpID0+IHtcclxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICB2YXIgd2lkdGggPSBvcHRpb25zLndpZHRoIHx8IDQ7XHJcbiAgdmFyIGhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0IHx8IDQ7XHJcbiAgdmFyIGNvbG9yMSA9IG9wdGlvbnMuY29sb3IxIHx8IFwicmdiYSgxLDAsMCwwLjEpXCI7XHJcbiAgdmFyIGNvbG9yMiA9IG9wdGlvbnMuY29sb3IyIHx8IFwicmdiYSgxLDEsMSwwLjUpXCI7XHJcbiAgY29uc3QgY3R4ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKS5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgc2V0Q2FudmFzU2l6ZShjdHgsIHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuICBjdHguZmlsbFN0eWxlID0gY29sb3IxO1xyXG4gIGN0eC5maWxsUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuICBjdHguZmlsbFN0eWxlID0gY29sb3IyO1xyXG4gIGN0eC5maWxsUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0IC8gMik7XHJcblxyXG4gIHJldHVybiBtYWtlVGV4dHVyZShnbCwgY3R4KTtcclxufTtcclxuXHJcbmNvbnN0IG1ha2VTdHJpcGVJbWcgPSAob3B0aW9ucykgPT4ge1xyXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gIHZhciB3aWR0aCA9IG9wdGlvbnMud2lkdGggfHwgNDtcclxuICB2YXIgaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQgfHwgNDtcclxuICB2YXIgY29sb3IxID0gb3B0aW9ucy5jb2xvcjEgfHwgXCJyZ2JhKDEsMCwwLDAuNSlcIjtcclxuICB2YXIgY29sb3IyID0gb3B0aW9ucy5jb2xvcjIgfHwgXCJyZ2JhKDAsMCwxLDEpXCI7XHJcbiAgY29uc3QgY3R4ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKS5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgc2V0Q2FudmFzU2l6ZShjdHgsIHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuICBjdHguZmlsbFN0eWxlID0gY29sb3IxO1xyXG4gIGN0eC5maWxsUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuICBjdHguZmlsbFN0eWxlID0gY29sb3IyO1xyXG4gIGN0eC5maWxsUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0IC8gMik7XHJcblxyXG4gIHJldHVybiBjdHguY2FudmFzO1xyXG59O1xyXG5cclxuY29uc3QgbWFrZUltZ0Zyb21TdmdYbWwgPSAoeG1sLCBvcHRpb25zID0ge30pID0+IHtcclxuICBjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gIHZhciBzdmc2NCA9IGJ0b2EoeG1sKTtcclxuICB2YXIgYjY0U3RhcnQgPSBcImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsXCI7XHJcbiAgdmFyIGltYWdlNjQgPSBiNjRTdGFydCArIHN2ZzY0O1xyXG4gIGltZy5zcmMgPSBpbWFnZTY0O1xyXG5cclxuICBjb25zdCB3aWR0aCA9IG9wdGlvbnMud2lkdGggfHwgMTAwO1xyXG4gIGNvbnN0IGhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0IHx8IDEwMDtcclxuICBjb25zdCB4ID0gb3B0aW9ucy54IHx8IDE7XHJcbiAgY29uc3QgeSA9IG9wdGlvbnMueSB8fCA1MDtcclxuXHJcbiAgY29uc3QgY3R4ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKS5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgc2V0Q2FudmFzU2l6ZShjdHgsIHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuICBjdHguZHJhd0ltYWdlKGltZywgeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcbiAgY3R4LmZpbGxTdHlsZSA9IFwicmdiYSgwLDAsMCwxKVwiO1xyXG4gIGN0eC5maWxsUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuICByZXR1cm4gY3R4LmltZztcclxufTtcclxuKi9cclxuY29uc3QgcmVxdWVzdENPUlNJZk5vdFNhbWVPcmlnaW4gPSAoaW1nLCB1cmwpID0+IHtcclxuICAgIGlmIChuZXcgVVJMKHVybCwgd2luZG93LmxvY2F0aW9uLmhyZWYpLm9yaWdpbiAhPT0gd2luZG93LmxvY2F0aW9uLm9yaWdpbikge1xyXG4gICAgICAgIGltZy5jcm9zc09yaWdpbiA9IFwiXCI7XHJcbiAgICB9XHJcbn07XHJcbmNsYXNzIFRleHR1cmVJbmZvIHtcclxuICAgIGNvbnN0cnVjdG9yKGdsKSB7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZ2wgPSBnbDtcclxuICAgIH1cclxuICAgIGNyZWF0ZVRleHR1cmVGcm9tVVJMKHVybCkge1xyXG4gICAgICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgdGV4dHVyZSA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcclxuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0ZXh0dXJlKTtcclxuICAgICAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLlJHQkEsIDEsIDEsIDAsIGdsLlJHQkEsIGdsLlVOU0lHTkVEX0JZVEUsIG5ldyBVaW50OEFycmF5KFswLCAwLCAyNTUsIDI1NV0pKTtcclxuICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICBpbWcuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gaW1nLndpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IGltZy5oZWlnaHQ7XHJcbiAgICAgICAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleHR1cmUpO1xyXG4gICAgICAgICAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLlJHQkEsIGdsLlJHQkEsIGdsLlVOU0lHTkVEX0JZVEUsIGltZyk7XHJcbiAgICAgICAgICAgIGdsLmdlbmVyYXRlTWlwbWFwKGdsLlRFWFRVUkVfMkQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJlcXVlc3RDT1JTSWZOb3RTYW1lT3JpZ2luKGltZywgdXJsKTtcclxuICAgICAgICBpbWcuc3JjID0gdXJsO1xyXG4gICAgICAgIHRoaXMudGV4dHVyZSA9IHRleHR1cmU7XHJcbiAgICAgICAgcmV0dXJuIHRleHR1cmU7XHJcbiAgICB9XHJcbiAgICBzZXRUZXh0dXJlVW5pdCh1bml0TnVtKSB7XHJcbiAgICAgICAgY29uc3QgeyBnbCwgdGV4dHVyZSB9ID0gdGhpcztcclxuICAgICAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUwICsgdW5pdE51bSk7XHJcbiAgICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IHsgVGV4dHVyZUluZm8gfTtcclxuIiwiY29uc3QgcHJvcHMgPSB7XHJcbiAgICBtYXQ0OiB7XHJcbiAgICAgICAgc3RyaWRlOiA2NCxcclxuICAgICAgICBieXRlTGVuZ3RoOiA2NCxcclxuICAgICAgICB0eXBlOiAweDE0MDYsXHJcbiAgICAgICAgbnVtQXR0cmlidXRlczogNCxcclxuICAgICAgICBudW1Db21wb25lbnRzOiA0LFxyXG4gICAgfSxcclxuICAgIHZlYzM6IHtcclxuICAgICAgICBudW1Db21wb25lbnRzOiAzLFxyXG4gICAgICAgIHR5cGU6IDB4MTQwNixcclxuICAgICAgICBudW1BdHRyaWJ1dGVzOiAxLFxyXG4gICAgfSxcclxufTtcclxuY29uc3QgZ2V0QXR0cmlidXRlUHJvcHNCeVR5cGUgPSAodHlwZSkgPT4gcHJvcHNbdHlwZV07XHJcbmV4cG9ydCBkZWZhdWx0IGdldEF0dHJpYnV0ZVByb3BzQnlUeXBlO1xyXG4iLCJjb25zdCBUWVBFRF9BUlJBWVMgPSB7XHJcbiAgICA1MTIwOiBJbnQ4QXJyYXksXHJcbiAgICA1MTIxOiBVaW50OEFycmF5LFxyXG4gICAgNTEyMjogSW50MTZBcnJheSxcclxuICAgIDUxMjM6IFVpbnQxNkFycmF5LFxyXG4gICAgNTEyNDogSW50MzJBcnJheSxcclxuICAgIDUxMjU6IFVpbnQzMkFycmF5LFxyXG4gICAgNTEyNjogRmxvYXQzMkFycmF5LFxyXG59O1xyXG5jb25zdCBOVU1fQ09NUE9ORU5UUyA9IHtcclxuICAgIFNDQUxBUjogMSxcclxuICAgIFZFQzI6IDIsXHJcbiAgICBWRUMzOiAzLFxyXG4gICAgVkVDNDogNCxcclxuICAgIE1BVDI6IDQsXHJcbiAgICBNQVQzOiA5LFxyXG4gICAgTUFUNDogMTYsXHJcbn07XHJcbmNvbnN0IExPQ0FUSU9OUyA9IHtcclxuICAgIFBPU0lUSU9OOiAwLFxyXG4gICAgTk9STUFMOiAxLFxyXG4gICAgV0VJR0hUU18wOiAyLFxyXG4gICAgSk9JTlRTXzA6IDMsXHJcbiAgICBURVhDT09SRF8wOiA0LFxyXG59O1xyXG5jb25zdCBFTEVNRU5UX1NJWkUgPSB7XHJcbiAgICAweDE0MDY6IDQsXHJcbn07XHJcbmNvbnN0IFRFWFRVUkUwID0gMHg4NGMwO1xyXG5jb25zdCBEWU5BTUlDX0RSQVcgPSAweDg4ZTg7XHJcbmNvbnN0IEFSUkFZX0JVRkZFUiA9IDB4ODg5MjtcclxuY29uc3QgRUxFTUVOVF9BUlJBWV9CVUZGRVIgPSAweDg4OTM7XHJcbmNvbnN0IFVOSUZPUk1fQlVGRkVSID0gMHg4YTExO1xyXG5jb25zdCBUUkFOU0ZPUk1fRkVFREJBQ0tfQlVGRkVSID0gMHg4YzhlO1xyXG5jb25zdCBUUkFOU0ZPUk1fRkVFREJBQ0sgPSAweDhlMjI7XHJcbmNvbnN0IENPTVBJTEVfU1RBVFVTID0gMHg4YjgxO1xyXG5jb25zdCBMSU5LX1NUQVRVUyA9IDB4OGI4MjtcclxuY29uc3QgRlJBR01FTlRfU0hBREVSID0gMHg4YjMwO1xyXG5jb25zdCBWRVJURVhfU0hBREVSID0gMHg4YjMxO1xyXG5jb25zdCBTRVBBUkFURV9BVFRSSUJTID0gMHg4YzhkO1xyXG5jb25zdCBBQ1RJVkVfVU5JRk9STVMgPSAweDhiODY7XHJcbmNvbnN0IEFDVElWRV9BVFRSSUJVVEVTID0gMHg4Yjg5O1xyXG5jb25zdCBUUkFOU0ZPUk1fRkVFREJBQ0tfVkFSWUlOR1MgPSAweDhjODM7XHJcbmNvbnN0IEFDVElWRV9VTklGT1JNX0JMT0NLUyA9IDB4OGEzNjtcclxuY29uc3QgVU5JRk9STV9CTE9DS19SRUZFUkVOQ0VEX0JZX1ZFUlRFWF9TSEFERVIgPSAweDhhNDQ7XHJcbmNvbnN0IFVOSUZPUk1fQkxPQ0tfUkVGRVJFTkNFRF9CWV9GUkFHTUVOVF9TSEFERVIgPSAweDhhNDY7XHJcbmNvbnN0IFVOSUZPUk1fQkxPQ0tfREFUQV9TSVpFID0gMHg4YTQwO1xyXG5jb25zdCBVTklGT1JNX0JMT0NLX0FDVElWRV9VTklGT1JNX0lORElDRVMgPSAweDhhNDM7XHJcbmNvbnN0IEZMT0FUID0gMHgxNDA2O1xyXG5jb25zdCBGTE9BVF9WRUMyID0gMHg4YjUwO1xyXG5jb25zdCBGTE9BVF9WRUMzID0gMHg4YjUxO1xyXG5jb25zdCBGTE9BVF9WRUM0ID0gMHg4YjUyO1xyXG5jb25zdCBJTlQgPSAweDE0MDQ7XHJcbmNvbnN0IElOVF9WRUMyID0gMHg4YjUzO1xyXG5jb25zdCBJTlRfVkVDMyA9IDB4OGI1NDtcclxuY29uc3QgSU5UX1ZFQzQgPSAweDhiNTU7XHJcbmNvbnN0IEJPT0wgPSAweDhiNTY7XHJcbmNvbnN0IEJPT0xfVkVDMiA9IDB4OGI1NztcclxuY29uc3QgQk9PTF9WRUMzID0gMHg4YjU4O1xyXG5jb25zdCBCT09MX1ZFQzQgPSAweDhiNTk7XHJcbmNvbnN0IEZMT0FUX01BVDIgPSAweDhiNWE7XHJcbmNvbnN0IEZMT0FUX01BVDMgPSAweDhiNWI7XHJcbmNvbnN0IEZMT0FUX01BVDQgPSAweDhiNWM7XHJcbmNvbnN0IFNBTVBMRVJfMkQgPSAweDhiNWU7XHJcbmNvbnN0IFNBTVBMRVJfQ1VCRSA9IDB4OGI2MDtcclxuY29uc3QgU0FNUExFUl8zRCA9IDB4OGI1ZjtcclxuY29uc3QgU0FNUExFUl8yRF9TSEFET1cgPSAweDhiNjI7XHJcbmNvbnN0IEZMT0FUX01BVDJ4MyA9IDB4OGI2NTtcclxuY29uc3QgRkxPQVRfTUFUMng0ID0gMHg4YjY2O1xyXG5jb25zdCBGTE9BVF9NQVQzeDIgPSAweDhiNjc7XHJcbmNvbnN0IEZMT0FUX01BVDN4NCA9IDB4OGI2ODtcclxuY29uc3QgRkxPQVRfTUFUNHgyID0gMHg4YjY5O1xyXG5jb25zdCBGTE9BVF9NQVQ0eDMgPSAweDhiNmE7XHJcbmNvbnN0IFNBTVBMRVJfMkRfQVJSQVkgPSAweDhkYzE7XHJcbmNvbnN0IFNBTVBMRVJfMkRfQVJSQVlfU0hBRE9XID0gMHg4ZGM0O1xyXG5jb25zdCBTQU1QTEVSX0NVQkVfU0hBRE9XID0gMHg4ZGM1O1xyXG5jb25zdCBVTlNJR05FRF9JTlQgPSAweDE0MDU7XHJcbmNvbnN0IFVOU0lHTkVEX0lOVF9WRUMyID0gMHg4ZGM2O1xyXG5jb25zdCBVTlNJR05FRF9JTlRfVkVDMyA9IDB4OGRjNztcclxuY29uc3QgVU5TSUdORURfSU5UX1ZFQzQgPSAweDhkYzg7XHJcbmNvbnN0IElOVF9TQU1QTEVSXzJEID0gMHg4ZGNhO1xyXG5jb25zdCBJTlRfU0FNUExFUl8zRCA9IDB4OGRjYjtcclxuY29uc3QgSU5UX1NBTVBMRVJfQ1VCRSA9IDB4OGRjYztcclxuY29uc3QgSU5UX1NBTVBMRVJfMkRfQVJSQVkgPSAweDhkY2Y7XHJcbmNvbnN0IFVOU0lHTkVEX0lOVF9TQU1QTEVSXzJEID0gMHg4ZGQyO1xyXG5jb25zdCBVTlNJR05FRF9JTlRfU0FNUExFUl8zRCA9IDB4OGRkMztcclxuY29uc3QgVU5TSUdORURfSU5UX1NBTVBMRVJfQ1VCRSA9IDB4OGRkNDtcclxuY29uc3QgVU5TSUdORURfSU5UX1NBTVBMRVJfMkRfQVJSQVkgPSAweDhkZDc7XHJcbmNvbnN0IFRFWFRVUkVfMkQgPSAweDBkZTE7XHJcbmNvbnN0IFRFWFRVUkVfQ1VCRV9NQVAgPSAweDg1MTM7XHJcbmNvbnN0IFRFWFRVUkVfM0QgPSAweDgwNmY7XHJcbmNvbnN0IFRFWFRVUkVfMkRfQVJSQVkgPSAweDhjMWE7XHJcbmV4cG9ydCB7IExPQ0FUSU9OUywgTlVNX0NPTVBPTkVOVFMsIFRZUEVEX0FSUkFZUywgRUxFTUVOVF9TSVpFLCBGTE9BVCwgRkxPQVRfTUFUMiwgRkxPQVRfTUFUMngzLCBGTE9BVF9NQVQ0LCBGTE9BVF9NQVQyeDQsIFVOU0lHTkVEX0lOVCwgRkxPQVRfTUFUMywgVU5TSUdORURfSU5UX1ZFQzIsIFVOU0lHTkVEX0lOVF9WRUMzLCBVTlNJR05FRF9JTlRfVkVDNCwgRkxPQVRfVkVDMiwgRkxPQVRfVkVDMywgRkxPQVRfVkVDNCwgSU5ULCBJTlRfVkVDMiwgSU5UX1ZFQzMsIElOVF9WRUM0LCBCT09MLCBCT09MX1ZFQzIsIEJPT0xfVkVDMywgQk9PTF9WRUM0IH07XHJcbiIsImltcG9ydCB7IFByaW1pdGl2ZVJlbmRlckluZm9Gcm9tQXJyYXlEYXRhLCBBcnJheURhdGFGcm9tR2x0ZiwgRW50aXR5RGF0YUZyb21HbHRmLCBHTFRGLCB9IGZyb20gXCIuL2NvbXBvbmVudHMvR2x0ZlV0aWxzXCI7XHJcbmltcG9ydCB7IE1lc2hSZW5kZXJlciwgU2tpbm5lZE1lc2hSZW5kZXJlciB9IGZyb20gXCIuL2NvbXBvbmVudHMvTWVzaFJlbmRlcmVyXCI7XHJcbmltcG9ydCB7IGNyZWF0ZUJveCwgY3JlYXRlQ29uZSwgY3JlYXRlQ2lyY2xlLCBjcmVhdGVTcGhlcmUsIGNyZWF0ZVRydW5jYXRlZENvbmUgfSBmcm9tIFwiLi9jb21wb25lbnRzL1ByaW1pdGl2ZXNcIjtcclxuaW1wb3J0IFByaW1pdGl2ZVJlbmRlcmVyIGZyb20gXCIuL2NvbXBvbmVudHMvUHJpbWl0aXZlUmVuZGVyZXJcIjtcclxuaW1wb3J0IHsgUHJvZ3JhbUluZm8sIH0gZnJvbSBcIi4vY29tcG9uZW50cy9Qcm9ncmFtSW5mb1wiO1xyXG5pbXBvcnQgRHJhd2VyIGZyb20gXCIuL2NvbXBvbmVudHMvRHJhd2VyXCI7XHJcbmltcG9ydCB7IFRleHR1cmVJbmZvLCB9IGZyb20gXCIuL2NvbXBvbmVudHMvVGV4dHVyZUluZm9cIjtcclxuaW1wb3J0IE1vZGVsIGZyb20gXCIuL2NvbXBvbmVudHMvTW9kZWxcIjtcclxuaW1wb3J0IHsgZGVmYXVsdFNoYWRlcnMsIHBvaW50TGlnaHRTaGFkZXJzIH0gZnJvbSBcIi4vcmVuZGVyL3NoYWRlcnNcIjtcclxuaW1wb3J0IEdMY29udGV4dFdyYXBwZXIgZnJvbSBcIi4vY29tcG9uZW50cy9HTFdyYXBwZXJcIjtcclxuZXhwb3J0IHsgR0xURiwgR0xjb250ZXh0V3JhcHBlciwgVGV4dHVyZUluZm8sIE1vZGVsLCBQcmltaXRpdmVSZW5kZXJlciwgRW50aXR5RGF0YUZyb21HbHRmLCBQcmltaXRpdmVSZW5kZXJJbmZvRnJvbUFycmF5RGF0YSwgQXJyYXlEYXRhRnJvbUdsdGYsIE1lc2hSZW5kZXJlciwgU2tpbm5lZE1lc2hSZW5kZXJlciwgY3JlYXRlQm94LCBQcm9ncmFtSW5mbywgRHJhd2VyLCBjcmVhdGVDb25lLCBjcmVhdGVDaXJjbGUsIGRlZmF1bHRTaGFkZXJzLCBwb2ludExpZ2h0U2hhZGVycywgY3JlYXRlU3BoZXJlLCBjcmVhdGVUcnVuY2F0ZWRDb25lIH07XHJcbiIsImV4cG9ydCBkZWZhdWx0IGAjdmVyc2lvbiAzMDAgZXNcclxucHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xyXG4gXHJcblxyXG5cclxudW5pZm9ybSB2ZWM0IHVfY29sb3I7XHJcbm91dCB2ZWM0IG91dENvbG9yO1xyXG52b2lkIG1haW4oKSB7XHJcbiAgXHJcbiAgXHJcbiAgb3V0Q29sb3IgPSB1X2NvbG9yO1xyXG4gXHJcbiAgXHJcbiAgXHJcbn1gO1xyXG4iLCJpbXBvcnQgdmVydCBmcm9tICcuL3ZlcnQuanMnO1xyXG5pbXBvcnQgZnJhZyBmcm9tICcuL2ZyYWcuanMnO1xyXG5leHBvcnQgZGVmYXVsdCB7IHZlcnQsIGZyYWcgfTtcclxuIiwiZXhwb3J0IGRlZmF1bHQgYCN2ZXJzaW9uIDMwMCBlc1xyXG5cclxucHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xyXG5cclxudW5pZm9ybSBtYXQ0IHVfd29ybGRWaWV3UHJvamVjdGlvbjtcclxuXHJcblxyXG5sYXlvdXQobG9jYXRpb24gPSAwKSBpbiB2ZWM0IGFfcG9zaXRpb247XHJcbnZvaWQgbWFpbigpIHtcclxuICBnbF9Qb3NpdGlvbiA9IHVfd29ybGRWaWV3UHJvamVjdGlvbiAqIGFfcG9zaXRpb247XHJcbiAgZ2xfUG9pbnRTaXplID0gMTAuMDtcclxufWA7XHJcbiIsImltcG9ydCBkZWZhdWx0U2hhZGVycyBmcm9tIFwiLi9kZWZhdWx0XCI7XHJcbmltcG9ydCBwb2ludExpZ2h0U2hhZGVycyBmcm9tIFwiLi9wb2ludExpZ2h0XCI7XHJcbmV4cG9ydCB7IGRlZmF1bHRTaGFkZXJzLCBwb2ludExpZ2h0U2hhZGVycyB9O1xyXG4iLCJleHBvcnQgZGVmYXVsdCBgI3ZlcnNpb24gMzAwIGVzXHJcbnByZWNpc2lvbiBoaWdocCBmbG9hdDtcclxuIFxyXG5cclxuXHJcblxyXG5pbiB2ZWMzIHZfbm9ybWFsO1xyXG5pbiB2ZWMzIHZfc3VyZmFjZVRvVmlldztcclxuaW4gdmVjMyB2X3N1cmZhY2VUb0xpZ2h0O1xyXG5cclxuXHJcbi8vdW5pZm9ybSBzYW1wbGVyMkQgdV90ZXh0dXJlMTtcclxudW5pZm9ybSBmbG9hdCB1X3NoaW5pbmVzcztcclxudW5pZm9ybSB2ZWM0IHVfY29sb3I7XHJcbnVuaWZvcm0gdmVjNCB1X2FtYmllbnRMaWdodDtcclxub3V0IHZlYzQgb3V0Q29sb3I7XHJcblxyXG5cclxudm9pZCBtYWluKCkge1xyXG4gIFxyXG4gIHZlYzMgc3VyZmFjZVRvTGlnaHREaXJlY3Rpb24gPSBub3JtYWxpemUodl9zdXJmYWNlVG9MaWdodCk7XHJcbiAgdmVjMyBzdXJmYWNlVG9WaWV3RGlyZWN0aW9uID0gbm9ybWFsaXplKHZfc3VyZmFjZVRvVmlldyk7XHJcbiAgdmVjMyBoYWxmVmVjdG9yID0gbm9ybWFsaXplKHN1cmZhY2VUb0xpZ2h0RGlyZWN0aW9uICsgc3VyZmFjZVRvVmlld0RpcmVjdGlvbik7XHJcblxyXG4gIHZlYzMgbm9ybWFsID0gbm9ybWFsaXplKHZfbm9ybWFsKTtcclxuICBmbG9hdCBsaWdodCA9IGRvdChub3JtYWwsIHN1cmZhY2VUb0xpZ2h0RGlyZWN0aW9uKTtcclxuICBmbG9hdCBzcGVjdWxhciA9IDAuMDtcclxuICBpZiAobGlnaHQgPiAwLjApIHtcclxuICAgIHNwZWN1bGFyID0gcG93KGRvdChub3JtYWwsIGhhbGZWZWN0b3IpLCB1X3NoaW5pbmVzcyk7XHJcbiAgfVxyXG4gIFxyXG4gIG91dENvbG9yID0gIHVfY29sb3I7XHJcbiAgb3V0Q29sb3IucmdiICo9IGxpZ2h0O1xyXG4gIG91dENvbG9yLnJnYiArPSBzcGVjdWxhcjtcclxuXHJcbiAgb3V0Q29sb3IucmdiICs9IHVfYW1iaWVudExpZ2h0LnJnYiAqMC4zO1xyXG4gIFxyXG59YDtcclxuIiwiaW1wb3J0IHZlcnQgZnJvbSAnLi92ZXJ0LmpzJztcclxuaW1wb3J0IGZyYWcgZnJvbSAnLi9mcmFnLmpzJztcclxuZXhwb3J0IGRlZmF1bHQgeyB2ZXJ0LCBmcmFnIH07XHJcbiIsImV4cG9ydCBkZWZhdWx0IGAjdmVyc2lvbiAzMDAgZXNcclxuIFxyXG5sYXlvdXQobG9jYXRpb24gPSAwKSBpbiB2ZWM0IGFfcG9zaXRpb247XHJcbmxheW91dChsb2NhdGlvbiA9IDEpIGluIHZlYzMgYV9ub3JtYWw7XHJcblxyXG5cclxudW5pZm9ybSBtYXQ0IHVfbWF0cml4O1xyXG51bmlmb3JtIG1hdDQgdV93b3JsZFZpZXdQcm9qZWN0aW9uO1xyXG51bmlmb3JtIHZlYzMgdV9saWdodFdvcmxkUG9zaXRpb247XHJcbnVuaWZvcm0gdmVjMyB1X3ZpZXdXb3JsZFBvc2l0aW9uO1xyXG5cclxub3V0IHZlYzMgdl9ub3JtYWw7XHJcbm91dCB2ZWMzIHZfc3VyZmFjZVRvTGlnaHQ7XHJcbm91dCB2ZWMzIHZfc3VyZmFjZVRvVmlldztcclxudm9pZCBtYWluKCkge1xyXG4gICAgXHJcbiAgICBnbF9Qb3NpdGlvbiA9IHVfd29ybGRWaWV3UHJvamVjdGlvbiAqIGFfcG9zaXRpb247XHJcbiAgICBcclxuICAgIHZlYzMgc3VyZmFjZVdvcmxkUG9zaXRpb24gPSAodV9tYXRyaXggKiBhX3Bvc2l0aW9uKS54eXo7XHJcbiAgICBcclxuICAgIHZfc3VyZmFjZVRvTGlnaHQgPSB1X2xpZ2h0V29ybGRQb3NpdGlvbiAtIHN1cmZhY2VXb3JsZFBvc2l0aW9uO1xyXG5cclxuICAgIHZfbm9ybWFsID0gbWF0MyggIHVfbWF0cml4ICkgKiBhX25vcm1hbDtcclxuICAgIFxyXG4gICAgdl9zdXJmYWNlVG9WaWV3ID0gdV92aWV3V29ybGRQb3NpdGlvbiAtIHN1cmZhY2VXb3JsZFBvc2l0aW9uO1xyXG4gICAgICBcclxufWA7XHJcbiIsImltcG9ydCBBQUJCLCB7IGdldENlbnRlciwgZ2V0RGlhZ29uYWwsIGlzQ29sbGlkZSB9IGZyb20gXCIuL2FhYmJcIjtcclxuaW1wb3J0IHYzIGZyb20gXCIuL3YzXCI7XHJcbmNvbnN0IGVsZW1lbnRTaXplID0gMTtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2N0cmVlIHtcclxuICAgIGNvbnN0cnVjdG9yKGFhYmIpIHtcclxuICAgICAgICB0aGlzLmFhYmIgPSBhYWJiO1xyXG4gICAgICAgIHRoaXMuZGlhZ29uYWwgPSBnZXREaWFnb25hbChhYWJiKTtcclxuICAgICAgICB0aGlzLmNlbnRlciA9IGdldENlbnRlcihhYWJiKTtcclxuICAgICAgICB0aGlzLmVsZW1lbnRzID0gW107XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xyXG4gICAgICAgIHRoaXMuY2FwYWNpdHkgPSA0O1xyXG4gICAgfVxyXG4gICAgc3ViZGl2aWRlKCkge1xyXG4gICAgICAgIGNvbnN0IG1pbiA9IHRoaXMuYWFiYi5taW47XHJcbiAgICAgICAgY29uc3QgbWF4ID0gdGhpcy5hYWJiLm1heDtcclxuICAgICAgICBjb25zdCBbeDEsIHkxLCB6MV0gPSBtaW47XHJcbiAgICAgICAgY29uc3QgW3gyLCB5MiwgejJdID0gbWF4O1xyXG4gICAgICAgIGNvbnN0IHhjID0gdGhpcy5jZW50ZXJbMF07XHJcbiAgICAgICAgY29uc3QgeWMgPSB0aGlzLmNlbnRlclsxXTtcclxuICAgICAgICBjb25zdCB6YyA9IHRoaXMuY2VudGVyWzJdO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5bMF0gPSBuZXcgT2N0cmVlKG5ldyBBQUJCKFt4MSwgeTEsIHoxXSwgW3hjLCB5YywgemNdKSk7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlblsxXSA9IG5ldyBPY3RyZWUobmV3IEFBQkIoW3gxLCB5MSwgemNdLCBbeGMsIHljLCB6Ml0pKTtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuWzJdID0gbmV3IE9jdHJlZShuZXcgQUFCQihbeDEsIHljLCB6MV0sIFt4YywgeTIsIHpjXSkpO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5bM10gPSBuZXcgT2N0cmVlKG5ldyBBQUJCKFt4MSwgeWMsIHpjXSwgW3hjLCB5MiwgejJdKSk7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbls0XSA9IG5ldyBPY3RyZWUobmV3IEFBQkIoW3hjLCB5MSwgejFdLCBbeDIsIHljLCB6Y10pKTtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuWzVdID0gbmV3IE9jdHJlZShuZXcgQUFCQihbeGMsIHkxLCB6Y10sIFt4MiwgeWMsIHoyXSkpO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5bNl0gPSBuZXcgT2N0cmVlKG5ldyBBQUJCKFt4YywgeWMsIHoxXSwgW3gyLCB5MiwgemNdKSk7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbls3XSA9IG5ldyBPY3RyZWUobmV3IEFBQkIoW3hjLCB5YywgemNdLCBbeDIsIHkyLCB6Ml0pKTtcclxuICAgIH1cclxuICAgIGluc2VydCh2b3hlbCkge1xyXG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnRzLmxlbmd0aCA8IHRoaXMuY2FwYWNpdHkpIHtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5wdXNoKHZveGVsKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggPT09IDApXHJcbiAgICAgICAgICAgIHRoaXMuc3ViZGl2aWRlKCk7XHJcbiAgICAgICAgY29uc3QgeGMgPSB0aGlzLmNlbnRlclswXTtcclxuICAgICAgICBjb25zdCB5YyA9IHRoaXMuY2VudGVyWzFdO1xyXG4gICAgICAgIGNvbnN0IHpjID0gdGhpcy5jZW50ZXJbMl07XHJcbiAgICAgICAgY29uc3QgeCA9IE51bWJlcih2b3hlbFswXSA+IHhjKSAqIDQ7XHJcbiAgICAgICAgY29uc3QgeSA9IE51bWJlcih2b3hlbFsxXSA+IHljKSAqIDI7XHJcbiAgICAgICAgY29uc3QgeiA9IE51bWJlcih2b3hlbFsyXSA+IHpjKTtcclxuICAgICAgICBjb25zdCBpZHggPSB6IHwgeSB8IHg7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbltpZHhdLmluc2VydCh2b3hlbCk7XHJcbiAgICB9XHJcbiAgICBxdWVyeShhYWJiKSB7XHJcbiAgICAgICAgY29uc3QgZm91bmQgPSBbXTtcclxuICAgICAgICBpZiAoIWlzQ29sbGlkZSh0aGlzLmFhYmIsIGFhYmIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3VuZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBfYWFiYiA9IG5ldyBBQUJCKHYzLnN1bShlbGVtZW50LCBbLTAuNSwgLTAuNSwgLTAuNV0pLCB2My5zdW0oZWxlbWVudCwgWzAuNSwgMC41LCAwLjVdKSk7XHJcbiAgICAgICAgICAgIGlmIChpc0NvbGxpZGUoYWFiYiwgX2FhYmIpKSB7XHJcbiAgICAgICAgICAgICAgICBmb3VuZC5wdXNoKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcclxuICAgICAgICAgICAgZm91bmQucHVzaCguLi5jaGlsZC5xdWVyeShhYWJiKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGZvdW5kO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB2MyBmcm9tIFwiLi92M1wiO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBQUJCIHtcclxuICAgIGNvbnN0cnVjdG9yKG1pbiwgbWF4KSB7XHJcbiAgICAgICAgdGhpcy5taW4gPSBtaW47XHJcbiAgICAgICAgdGhpcy5tYXggPSBtYXg7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNvbnN0IGlzQ29sbGlkZSA9IChhYWJiMSwgYWFiYjIpID0+IHtcclxuICAgIGlmIChhYWJiMS5taW5bMF0gPD0gYWFiYjIubWF4WzBdICYmXHJcbiAgICAgICAgYWFiYjEubWF4WzBdID49IGFhYmIyLm1pblswXSAmJlxyXG4gICAgICAgIGFhYmIxLm1pblsxXSA8PSBhYWJiMi5tYXhbMV0gJiZcclxuICAgICAgICBhYWJiMS5tYXhbMV0gPj0gYWFiYjIubWluWzFdICYmXHJcbiAgICAgICAgYWFiYjEubWluWzJdIDw9IGFhYmIyLm1heFsyXSAmJlxyXG4gICAgICAgIGFhYmIxLm1heFsyXSA+PSBhYWJiMi5taW5bMl0pIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGdldENlbnRlciA9IChhYWJiKSA9PiB7XHJcbiAgICBjb25zdCBzdW0gPSB2My5zdW0oYWFiYi5tYXgsIGFhYmIubWluKTtcclxuICAgIHJldHVybiBbc3VtWzBdIC8gMiwgc3VtWzFdIC8gMiwgc3VtWzJdIC8gMl07XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXREaWFnb25hbCA9IChhYWJiKSA9PiB2My5kaWZmKGFhYmIubWF4LCBhYWJiLm1pbik7XHJcbmV4cG9ydCBjb25zdCBjb250YWlucyA9IChhYWJiLCBwKSA9PiB7IH07XHJcbiIsImltcG9ydCBBQUJCIGZyb20gXCIuL2FhYmJcIjtcclxuaW1wb3J0IHYzIGZyb20gXCIuL3YzXCI7XHJcbmltcG9ydCBtMyBmcm9tIFwiLi9tM1wiO1xyXG5pbXBvcnQgbTQgZnJvbSBcIi4vbTRcIjtcclxuaW1wb3J0IE9jdHJlZSBmcm9tIFwiLi9PY3RyZWVcIjtcclxuZXhwb3J0IHsgQUFCQiwgdjMsIG00LCBtMywgT2N0cmVlIH07XHJcbiIsImNvbnN0IG0zID0ge1xyXG4gICAgbXVsdGlwbHk6IGZ1bmN0aW9uIChiLCBhKSB7XHJcbiAgICAgICAgY29uc3QgYTAwID0gYVswICogMyArIDBdO1xyXG4gICAgICAgIGNvbnN0IGEwMSA9IGFbMCAqIDMgKyAxXTtcclxuICAgICAgICBjb25zdCBhMDIgPSBhWzAgKiAzICsgMl07XHJcbiAgICAgICAgY29uc3QgYTEwID0gYVsxICogMyArIDBdO1xyXG4gICAgICAgIGNvbnN0IGExMSA9IGFbMSAqIDMgKyAxXTtcclxuICAgICAgICBjb25zdCBhMTIgPSBhWzEgKiAzICsgMl07XHJcbiAgICAgICAgY29uc3QgYTIwID0gYVsyICogMyArIDBdO1xyXG4gICAgICAgIGNvbnN0IGEyMSA9IGFbMiAqIDMgKyAxXTtcclxuICAgICAgICBjb25zdCBhMjIgPSBhWzIgKiAzICsgMl07XHJcbiAgICAgICAgY29uc3QgYjAwID0gYlswICogMyArIDBdO1xyXG4gICAgICAgIGNvbnN0IGIwMSA9IGJbMCAqIDMgKyAxXTtcclxuICAgICAgICBjb25zdCBiMDIgPSBiWzAgKiAzICsgMl07XHJcbiAgICAgICAgY29uc3QgYjEwID0gYlsxICogMyArIDBdO1xyXG4gICAgICAgIGNvbnN0IGIxMSA9IGJbMSAqIDMgKyAxXTtcclxuICAgICAgICBjb25zdCBiMTIgPSBiWzEgKiAzICsgMl07XHJcbiAgICAgICAgY29uc3QgYjIwID0gYlsyICogMyArIDBdO1xyXG4gICAgICAgIGNvbnN0IGIyMSA9IGJbMiAqIDMgKyAxXTtcclxuICAgICAgICBjb25zdCBiMjIgPSBiWzIgKiAzICsgMl07XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgYjAwICogYTAwICsgYjAxICogYTEwICsgYjAyICogYTIwLFxyXG4gICAgICAgICAgICBiMDAgKiBhMDEgKyBiMDEgKiBhMTEgKyBiMDIgKiBhMjEsXHJcbiAgICAgICAgICAgIGIwMCAqIGEwMiArIGIwMSAqIGExMiArIGIwMiAqIGEyMixcclxuICAgICAgICAgICAgYjEwICogYTAwICsgYjExICogYTEwICsgYjEyICogYTIwLFxyXG4gICAgICAgICAgICBiMTAgKiBhMDEgKyBiMTEgKiBhMTEgKyBiMTIgKiBhMjEsXHJcbiAgICAgICAgICAgIGIxMCAqIGEwMiArIGIxMSAqIGExMiArIGIxMiAqIGEyMixcclxuICAgICAgICAgICAgYjIwICogYTAwICsgYjIxICogYTEwICsgYjIyICogYTIwLFxyXG4gICAgICAgICAgICBiMjAgKiBhMDEgKyBiMjEgKiBhMTEgKyBiMjIgKiBhMjEsXHJcbiAgICAgICAgICAgIGIyMCAqIGEwMiArIGIyMSAqIGExMiArIGIyMiAqIGEyMixcclxuICAgICAgICBdO1xyXG4gICAgfSxcclxuICAgIHhSb3RhdGlvbjogZnVuY3Rpb24gKGFuZ2xlSW5SYWRpYW5zKSB7XHJcbiAgICAgICAgY29uc3QgYyA9IE1hdGguY29zKGFuZ2xlSW5SYWRpYW5zKTtcclxuICAgICAgICBjb25zdCBzID0gTWF0aC5zaW4oYW5nbGVJblJhZGlhbnMpO1xyXG4gICAgICAgIHJldHVybiBbMSwgMCwgMCwgMCwgYywgcywgMCwgLXMsIGNdO1xyXG4gICAgfSxcclxuICAgIHlSb3RhdGlvbjogZnVuY3Rpb24gKGFuZ2xlSW5SYWRpYW5zKSB7XHJcbiAgICAgICAgY29uc3QgYyA9IE1hdGguY29zKGFuZ2xlSW5SYWRpYW5zKTtcclxuICAgICAgICBjb25zdCBzID0gTWF0aC5zaW4oYW5nbGVJblJhZGlhbnMpO1xyXG4gICAgICAgIHJldHVybiBbYywgMCwgLXMsIDAsIDEsIDAsIHMsIDAsIGNdO1xyXG4gICAgfSxcclxuICAgIHpSb3RhdGlvbjogZnVuY3Rpb24gKGFuZ2xlSW5SYWRpYW5zKSB7XHJcbiAgICAgICAgY29uc3QgYyA9IE1hdGguY29zKGFuZ2xlSW5SYWRpYW5zKTtcclxuICAgICAgICBjb25zdCBzID0gTWF0aC5zaW4oYW5nbGVJblJhZGlhbnMpO1xyXG4gICAgICAgIHJldHVybiBbYywgcywgMCwgLXMsIGMsIDAsIDAsIDAsIDFdO1xyXG4gICAgfSxcclxuICAgIG0zVG9tNDogZnVuY3Rpb24gKG0pIHtcclxuICAgICAgICBjb25zdCBkc3QgPSBuZXcgQXJyYXkoMTYpO1xyXG4gICAgICAgIGRzdFswXSA9IG1bMF07XHJcbiAgICAgICAgZHN0WzFdID0gbVsxXTtcclxuICAgICAgICBkc3RbMl0gPSBtWzJdO1xyXG4gICAgICAgIGRzdFszXSA9IDA7XHJcbiAgICAgICAgZHN0WzRdID0gbVszXTtcclxuICAgICAgICBkc3RbNV0gPSBtWzRdO1xyXG4gICAgICAgIGRzdFs2XSA9IG1bNV07XHJcbiAgICAgICAgZHN0WzddID0gMDtcclxuICAgICAgICBkc3RbOF0gPSBtWzZdO1xyXG4gICAgICAgIGRzdFs5XSA9IG1bN107XHJcbiAgICAgICAgZHN0WzEwXSA9IG1bOF07XHJcbiAgICAgICAgZHN0WzExXSA9IDA7XHJcbiAgICAgICAgZHN0WzEyXSA9IDA7XHJcbiAgICAgICAgZHN0WzEzXSA9IDA7XHJcbiAgICAgICAgZHN0WzE0XSA9IDA7XHJcbiAgICAgICAgZHN0WzE1XSA9IDE7XHJcbiAgICAgICAgcmV0dXJuIGRzdDtcclxuICAgIH0sXHJcbiAgICB4Um90YXRlOiBmdW5jdGlvbiAobSwgYW5nbGVJblJhZGlhbnMpIHtcclxuICAgICAgICByZXR1cm4gbTMubXVsdGlwbHkobSwgbTMueFJvdGF0aW9uKGFuZ2xlSW5SYWRpYW5zKSk7XHJcbiAgICB9LFxyXG4gICAgeVJvdGF0ZTogZnVuY3Rpb24gKG0sIGFuZ2xlSW5SYWRpYW5zKSB7XHJcbiAgICAgICAgcmV0dXJuIG0zLm11bHRpcGx5KG0sIG0zLnlSb3RhdGlvbihhbmdsZUluUmFkaWFucykpO1xyXG4gICAgfSxcclxuICAgIHpSb3RhdGU6IGZ1bmN0aW9uIChtLCBhbmdsZUluUmFkaWFucykge1xyXG4gICAgICAgIHJldHVybiBtMy5tdWx0aXBseShtLCBtMy56Um90YXRpb24oYW5nbGVJblJhZGlhbnMpKTtcclxuICAgIH0sXHJcbiAgICB0cmFuc2Zvcm1Qb2ludDogZnVuY3Rpb24gKG0sIHYpIHtcclxuICAgICAgICBjb25zdCBkc3QgPSBbMCwgMCwgMF07XHJcbiAgICAgICAgY29uc3QgdjAgPSB2WzBdO1xyXG4gICAgICAgIGNvbnN0IHYxID0gdlsxXTtcclxuICAgICAgICBjb25zdCB2MiA9IHZbMl07XHJcbiAgICAgICAgZHN0WzBdID0gdjAgKiBtWzAgKiAzICsgMF0gKyB2MSAqIG1bMSAqIDMgKyAwXSArIHYyICogbVsyICogMyArIDBdO1xyXG4gICAgICAgIGRzdFsxXSA9IHYwICogbVswICogMyArIDFdICsgdjEgKiBtWzEgKiAzICsgMV0gKyB2MiAqIG1bMiAqIDMgKyAxXTtcclxuICAgICAgICBkc3RbMl0gPSB2MCAqIG1bMCAqIDMgKyAyXSArIHYxICogbVsxICogMyArIDJdICsgdjIgKiBtWzIgKiAzICsgMl07XHJcbiAgICAgICAgcmV0dXJuIGRzdDtcclxuICAgIH0sXHJcbiAgICBpZGVudGl0eTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBbMSwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMV07XHJcbiAgICB9LFxyXG4gICAgdHJhbnNwb3NlOiBmdW5jdGlvbiAobSkge1xyXG4gICAgICAgIGNvbnN0IGRzdCA9IG5ldyBBcnJheSg5KTtcclxuICAgICAgICBkc3RbMF0gPSBtWzBdO1xyXG4gICAgICAgIGRzdFsxXSA9IG1bM107XHJcbiAgICAgICAgZHN0WzJdID0gbVs2XTtcclxuICAgICAgICBkc3RbM10gPSBtWzFdO1xyXG4gICAgICAgIGRzdFs0XSA9IG1bNF07XHJcbiAgICAgICAgZHN0WzVdID0gbVs3XTtcclxuICAgICAgICBkc3RbNl0gPSBtWzJdO1xyXG4gICAgICAgIGRzdFs3XSA9IG1bNV07XHJcbiAgICAgICAgZHN0WzhdID0gbVs4XTtcclxuICAgICAgICByZXR1cm4gZHN0O1xyXG4gICAgfSxcclxuICAgIHNjYWxpbmc6IGZ1bmN0aW9uIChzeCwgc3ksIHN6KSB7XHJcbiAgICAgICAgcmV0dXJuIFtzeCwgMCwgMCwgMCwgc3ksIDAsIDAsIDAsIHN6XTtcclxuICAgIH0sXHJcbiAgICBzY2FsZTogZnVuY3Rpb24gKG0sIHN4LCBzeSwgc3opIHtcclxuICAgICAgICByZXR1cm4gbTMubXVsdGlwbHkobSwgbTMuc2NhbGluZyhzeCwgc3ksIHN6KSk7XHJcbiAgICB9LFxyXG4gICAgLypcclxuICAgICAgICAwIDEgMlxyXG4gICAgICAgIDMgNCA1XHJcbiAgICAgICAgNiA3IDhcclxuICAgICAgICAqL1xyXG4gICAgaW52ZXJzZTogZnVuY3Rpb24gKG0pIHtcclxuICAgICAgICBjb25zdCBkZXQgPSBtWzBdICogbVs0XSAqIG1bOF0gK1xyXG4gICAgICAgICAgICBtWzJdICogbVszXSAqIG1bN10gK1xyXG4gICAgICAgICAgICBtWzFdICogbVs1XSAqIG1bNl0gLVxyXG4gICAgICAgICAgICBtWzJdICogbVs0XSAqIG1bNl0gLVxyXG4gICAgICAgICAgICBtWzBdICogbVs1XSAqIG1bN10gLVxyXG4gICAgICAgICAgICBtWzhdICogbVszXSAqIG1bMl07XHJcbiAgICAgICAgY29uc3QgZHN0ID0gbmV3IEFycmF5KDkpO1xyXG4gICAgICAgIGRzdFswXSA9IChtWzRdICogbVs4XSAtIG1bN10gKiBtWzVdKSAvIGRldDtcclxuICAgICAgICBkc3RbMV0gPSAobVszXSAqIG1bOF0gLSBtWzZdICogbVs1XSkgLyBkZXQ7XHJcbiAgICAgICAgZHN0WzJdID0gKG1bM10gKiBtWzddIC0gbVs2XSAqIG1bNF0pIC8gZGV0O1xyXG4gICAgICAgIGRzdFszXSA9IChtWzFdICogbVs4XSAtIG1bMl0gKiBtWzddKSAvIGRldDtcclxuICAgICAgICBkc3RbNF0gPSAobVswXSAqIG1bOF0gLSBtWzJdICogbVs2XSkgLyBkZXQ7XHJcbiAgICAgICAgZHN0WzVdID0gKG1bMF0gKiBtWzddIC0gbVsxXSAqIG1bNl0pIC8gZGV0O1xyXG4gICAgICAgIGRzdFs2XSA9IChtWzFdICogbVs1XSAtIG1bMl0gKiBtWzRdKSAvIGRldDtcclxuICAgICAgICBkc3RbN10gPSAobVswXSAqIG1bNV0gLSBtWzJdICogbVszXSkgLyBkZXQ7XHJcbiAgICAgICAgZHN0WzhdID0gKG1bMF0gKiBtWzRdIC0gbVsxXSAqIG1bNF0pIC8gZGV0O1xyXG4gICAgICAgIHJldHVybiBkc3Q7XHJcbiAgICB9LFxyXG4gICAgdG9TdHJpbmcobSkge1xyXG4gICAgICAgIHJldHVybiBtLnJlZHVjZSgoYWNjLCBlbCwgaWR4KSA9PiBpZHggJSAzID09PSAwXHJcbiAgICAgICAgICAgID8gKGFjYyArPSBgXFxuJHtlbC50b1N0cmluZygpfWApXHJcbiAgICAgICAgICAgIDogKGFjYyArPSBgICR7ZWwudG9TdHJpbmcoKX1gKSwgXCJcIik7XHJcbiAgICB9LFxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBtMztcclxuIiwiaW1wb3J0IHYzIGZyb20gXCIuL3YzXCI7XHJcbmNvbnN0IG00ID0ge1xyXG4gICAgbXVsdGlwbHk6IGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgY29uc3QgYTAwID0gYVswICogNCArIDBdO1xyXG4gICAgICAgIGNvbnN0IGEwMSA9IGFbMCAqIDQgKyAxXTtcclxuICAgICAgICBjb25zdCBhMDIgPSBhWzAgKiA0ICsgMl07XHJcbiAgICAgICAgY29uc3QgYTAzID0gYVswICogNCArIDNdO1xyXG4gICAgICAgIGNvbnN0IGExMCA9IGFbMSAqIDQgKyAwXTtcclxuICAgICAgICBjb25zdCBhMTEgPSBhWzEgKiA0ICsgMV07XHJcbiAgICAgICAgY29uc3QgYTEyID0gYVsxICogNCArIDJdO1xyXG4gICAgICAgIGNvbnN0IGExMyA9IGFbMSAqIDQgKyAzXTtcclxuICAgICAgICBjb25zdCBhMjAgPSBhWzIgKiA0ICsgMF07XHJcbiAgICAgICAgY29uc3QgYTIxID0gYVsyICogNCArIDFdO1xyXG4gICAgICAgIGNvbnN0IGEyMiA9IGFbMiAqIDQgKyAyXTtcclxuICAgICAgICBjb25zdCBhMjMgPSBhWzIgKiA0ICsgM107XHJcbiAgICAgICAgY29uc3QgYTMwID0gYVszICogNCArIDBdO1xyXG4gICAgICAgIGNvbnN0IGEzMSA9IGFbMyAqIDQgKyAxXTtcclxuICAgICAgICBjb25zdCBhMzIgPSBhWzMgKiA0ICsgMl07XHJcbiAgICAgICAgY29uc3QgYTMzID0gYVszICogNCArIDNdO1xyXG4gICAgICAgIGNvbnN0IGIwMCA9IGJbMCAqIDQgKyAwXTtcclxuICAgICAgICBjb25zdCBiMDEgPSBiWzAgKiA0ICsgMV07XHJcbiAgICAgICAgY29uc3QgYjAyID0gYlswICogNCArIDJdO1xyXG4gICAgICAgIGNvbnN0IGIwMyA9IGJbMCAqIDQgKyAzXTtcclxuICAgICAgICBjb25zdCBiMTAgPSBiWzEgKiA0ICsgMF07XHJcbiAgICAgICAgY29uc3QgYjExID0gYlsxICogNCArIDFdO1xyXG4gICAgICAgIGNvbnN0IGIxMiA9IGJbMSAqIDQgKyAyXTtcclxuICAgICAgICBjb25zdCBiMTMgPSBiWzEgKiA0ICsgM107XHJcbiAgICAgICAgY29uc3QgYjIwID0gYlsyICogNCArIDBdO1xyXG4gICAgICAgIGNvbnN0IGIyMSA9IGJbMiAqIDQgKyAxXTtcclxuICAgICAgICBjb25zdCBiMjIgPSBiWzIgKiA0ICsgMl07XHJcbiAgICAgICAgY29uc3QgYjIzID0gYlsyICogNCArIDNdO1xyXG4gICAgICAgIGNvbnN0IGIzMCA9IGJbMyAqIDQgKyAwXTtcclxuICAgICAgICBjb25zdCBiMzEgPSBiWzMgKiA0ICsgMV07XHJcbiAgICAgICAgY29uc3QgYjMyID0gYlszICogNCArIDJdO1xyXG4gICAgICAgIGNvbnN0IGIzMyA9IGJbMyAqIDQgKyAzXTtcclxuICAgICAgICBjb25zdCBkc3QgPSBbXHJcbiAgICAgICAgICAgIGIwMCAqIGEwMCArIGIwMSAqIGExMCArIGIwMiAqIGEyMCArIGIwMyAqIGEzMCxcclxuICAgICAgICAgICAgYjAwICogYTAxICsgYjAxICogYTExICsgYjAyICogYTIxICsgYjAzICogYTMxLFxyXG4gICAgICAgICAgICBiMDAgKiBhMDIgKyBiMDEgKiBhMTIgKyBiMDIgKiBhMjIgKyBiMDMgKiBhMzIsXHJcbiAgICAgICAgICAgIGIwMCAqIGEwMyArIGIwMSAqIGExMyArIGIwMiAqIGEyMyArIGIwMyAqIGEzMyxcclxuICAgICAgICAgICAgYjEwICogYTAwICsgYjExICogYTEwICsgYjEyICogYTIwICsgYjEzICogYTMwLFxyXG4gICAgICAgICAgICBiMTAgKiBhMDEgKyBiMTEgKiBhMTEgKyBiMTIgKiBhMjEgKyBiMTMgKiBhMzEsXHJcbiAgICAgICAgICAgIGIxMCAqIGEwMiArIGIxMSAqIGExMiArIGIxMiAqIGEyMiArIGIxMyAqIGEzMixcclxuICAgICAgICAgICAgYjEwICogYTAzICsgYjExICogYTEzICsgYjEyICogYTIzICsgYjEzICogYTMzLFxyXG4gICAgICAgICAgICBiMjAgKiBhMDAgKyBiMjEgKiBhMTAgKyBiMjIgKiBhMjAgKyBiMjMgKiBhMzAsXHJcbiAgICAgICAgICAgIGIyMCAqIGEwMSArIGIyMSAqIGExMSArIGIyMiAqIGEyMSArIGIyMyAqIGEzMSxcclxuICAgICAgICAgICAgYjIwICogYTAyICsgYjIxICogYTEyICsgYjIyICogYTIyICsgYjIzICogYTMyLFxyXG4gICAgICAgICAgICBiMjAgKiBhMDMgKyBiMjEgKiBhMTMgKyBiMjIgKiBhMjMgKyBiMjMgKiBhMzMsXHJcbiAgICAgICAgICAgIGIzMCAqIGEwMCArIGIzMSAqIGExMCArIGIzMiAqIGEyMCArIGIzMyAqIGEzMCxcclxuICAgICAgICAgICAgYjMwICogYTAxICsgYjMxICogYTExICsgYjMyICogYTIxICsgYjMzICogYTMxLFxyXG4gICAgICAgICAgICBiMzAgKiBhMDIgKyBiMzEgKiBhMTIgKyBiMzIgKiBhMjIgKyBiMzMgKiBhMzIsXHJcbiAgICAgICAgICAgIGIzMCAqIGEwMyArIGIzMSAqIGExMyArIGIzMiAqIGEyMyArIGIzMyAqIGEzMyxcclxuICAgICAgICBdO1xyXG4gICAgICAgIHJldHVybiBkc3Q7XHJcbiAgICB9LFxyXG4gICAgdHJhbnNsYXRpb246IGZ1bmN0aW9uICh0eCwgdHksIHR6KSB7XHJcbiAgICAgICAgcmV0dXJuIFsxLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAxLCAwLCB0eCwgdHksIHR6LCAxXTtcclxuICAgIH0sXHJcbiAgICB4Um90YXRpb246IGZ1bmN0aW9uIChhbmdsZUluUmFkaWFucykge1xyXG4gICAgICAgIGNvbnN0IGMgPSBNYXRoLmNvcyhhbmdsZUluUmFkaWFucyk7XHJcbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKGFuZ2xlSW5SYWRpYW5zKTtcclxuICAgICAgICByZXR1cm4gWzEsIDAsIDAsIDAsIDAsIGMsIHMsIDAsIDAsIC1zLCBjLCAwLCAwLCAwLCAwLCAxXTtcclxuICAgIH0sXHJcbiAgICB5Um90YXRpb246IGZ1bmN0aW9uIChhbmdsZUluUmFkaWFucykge1xyXG4gICAgICAgIGNvbnN0IGMgPSBNYXRoLmNvcyhhbmdsZUluUmFkaWFucyk7XHJcbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKGFuZ2xlSW5SYWRpYW5zKTtcclxuICAgICAgICByZXR1cm4gW2MsIDAsIC1zLCAwLCAwLCAxLCAwLCAwLCBzLCAwLCBjLCAwLCAwLCAwLCAwLCAxXTtcclxuICAgIH0sXHJcbiAgICB6Um90YXRpb246IGZ1bmN0aW9uIChhbmdsZUluUmFkaWFucykge1xyXG4gICAgICAgIGNvbnN0IGMgPSBNYXRoLmNvcyhhbmdsZUluUmFkaWFucyk7XHJcbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKGFuZ2xlSW5SYWRpYW5zKTtcclxuICAgICAgICByZXR1cm4gW2MsIHMsIDAsIDAsIC1zLCBjLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAxXTtcclxuICAgIH0sXHJcbiAgICBzY2FsaW5nOiBmdW5jdGlvbiAoc3gsIHN5LCBzeikge1xyXG4gICAgICAgIHJldHVybiBbc3gsIDAsIDAsIDAsIDAsIHN5LCAwLCAwLCAwLCAwLCBzeiwgMCwgMCwgMCwgMCwgMV07XHJcbiAgICB9LFxyXG4gICAgdHJhbnNsYXRlOiBmdW5jdGlvbiAobSwgdHgsIHR5LCB0eikge1xyXG4gICAgICAgIHJldHVybiBtNC5tdWx0aXBseShtLCBtNC50cmFuc2xhdGlvbih0eCwgdHksIHR6KSk7XHJcbiAgICB9LFxyXG4gICAgeFJvdGF0ZTogZnVuY3Rpb24gKG0sIGFuZ2xlSW5SYWRpYW5zKSB7XHJcbiAgICAgICAgcmV0dXJuIG00Lm11bHRpcGx5KG0sIG00LnhSb3RhdGlvbihhbmdsZUluUmFkaWFucykpO1xyXG4gICAgfSxcclxuICAgIHlSb3RhdGU6IGZ1bmN0aW9uIChtLCBhbmdsZUluUmFkaWFucykge1xyXG4gICAgICAgIHJldHVybiBtNC5tdWx0aXBseShtLCBtNC55Um90YXRpb24oYW5nbGVJblJhZGlhbnMpKTtcclxuICAgIH0sXHJcbiAgICB6Um90YXRlOiBmdW5jdGlvbiAobSwgYW5nbGVJblJhZGlhbnMpIHtcclxuICAgICAgICByZXR1cm4gbTQubXVsdGlwbHkobSwgbTQuelJvdGF0aW9uKGFuZ2xlSW5SYWRpYW5zKSk7XHJcbiAgICB9LFxyXG4gICAgc2NhbGU6IGZ1bmN0aW9uIChtLCBzeCwgc3ksIHN6KSB7XHJcbiAgICAgICAgcmV0dXJuIG00Lm11bHRpcGx5KG0sIG00LnNjYWxpbmcoc3gsIHN5LCBzeikpO1xyXG4gICAgfSxcclxuICAgIG1ha2VPcnQ6IGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgY29uc3QgbyA9IFswLCAwLCAwXTtcclxuICAgICAgICBjb25zdCBub3JtID0gTWF0aC5zcXJ0KHZbMF0gKiB2WzBdICsgdlsxXSAqIHZbMV0gKyB2WzJdICogdlsyXSk7XHJcbiAgICAgICAgb1swXSA9IHZbMF0gLyBub3JtO1xyXG4gICAgICAgIG9bMV0gPSB2WzFdIC8gbm9ybTtcclxuICAgICAgICBvWzJdID0gdlsyXSAvIG5vcm07XHJcbiAgICAgICAgcmV0dXJuIG87XHJcbiAgICB9LFxyXG4gICAgcHJvamVjdGlvbjogZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQsIGRlcHRoKSB7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgMiAvIHdpZHRoLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAtMiAvIGhlaWdodCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMiAvIGRlcHRoLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAtMSxcclxuICAgICAgICAgICAgMSxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMSxcclxuICAgICAgICBdO1xyXG4gICAgfSxcclxuICAgIHBlcnNwZWN0aXZlOiBmdW5jdGlvbiAoZmllbGRPZlZpZXdJblJhZGlhbnMsIGFzcGVjdCwgbmVhciwgZmFyKSB7XHJcbiAgICAgICAgY29uc3QgZiA9IE1hdGgudGFuKE1hdGguUEkgKiAwLjUgLSAwLjUgKiBmaWVsZE9mVmlld0luUmFkaWFucyk7XHJcbiAgICAgICAgY29uc3QgcmFuZ2VJbnYgPSAxLjAgLyAobmVhciAtIGZhcik7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgZiAvIGFzcGVjdCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgZixcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgKG5lYXIgKyBmYXIpICogcmFuZ2VJbnYsXHJcbiAgICAgICAgICAgIC0xLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICBuZWFyICogZmFyICogcmFuZ2VJbnYgKiAyLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgIF07XHJcbiAgICB9LFxyXG4gICAgaW52ZXJzZTogZnVuY3Rpb24gKG0pIHtcclxuICAgICAgICBjb25zdCBtMDAgPSBtWzAgKiA0ICsgMF07XHJcbiAgICAgICAgY29uc3QgbTAxID0gbVswICogNCArIDFdO1xyXG4gICAgICAgIGNvbnN0IG0wMiA9IG1bMCAqIDQgKyAyXTtcclxuICAgICAgICBjb25zdCBtMDMgPSBtWzAgKiA0ICsgM107XHJcbiAgICAgICAgY29uc3QgbTEwID0gbVsxICogNCArIDBdO1xyXG4gICAgICAgIGNvbnN0IG0xMSA9IG1bMSAqIDQgKyAxXTtcclxuICAgICAgICBjb25zdCBtMTIgPSBtWzEgKiA0ICsgMl07XHJcbiAgICAgICAgY29uc3QgbTEzID0gbVsxICogNCArIDNdO1xyXG4gICAgICAgIGNvbnN0IG0yMCA9IG1bMiAqIDQgKyAwXTtcclxuICAgICAgICBjb25zdCBtMjEgPSBtWzIgKiA0ICsgMV07XHJcbiAgICAgICAgY29uc3QgbTIyID0gbVsyICogNCArIDJdO1xyXG4gICAgICAgIGNvbnN0IG0yMyA9IG1bMiAqIDQgKyAzXTtcclxuICAgICAgICBjb25zdCBtMzAgPSBtWzMgKiA0ICsgMF07XHJcbiAgICAgICAgY29uc3QgbTMxID0gbVszICogNCArIDFdO1xyXG4gICAgICAgIGNvbnN0IG0zMiA9IG1bMyAqIDQgKyAyXTtcclxuICAgICAgICBjb25zdCBtMzMgPSBtWzMgKiA0ICsgM107XHJcbiAgICAgICAgY29uc3QgdG1wXzAgPSBtMjIgKiBtMzM7XHJcbiAgICAgICAgY29uc3QgdG1wXzEgPSBtMzIgKiBtMjM7XHJcbiAgICAgICAgY29uc3QgdG1wXzIgPSBtMTIgKiBtMzM7XHJcbiAgICAgICAgY29uc3QgdG1wXzMgPSBtMzIgKiBtMTM7XHJcbiAgICAgICAgY29uc3QgdG1wXzQgPSBtMTIgKiBtMjM7XHJcbiAgICAgICAgY29uc3QgdG1wXzUgPSBtMjIgKiBtMTM7XHJcbiAgICAgICAgY29uc3QgdG1wXzYgPSBtMDIgKiBtMzM7XHJcbiAgICAgICAgY29uc3QgdG1wXzcgPSBtMzIgKiBtMDM7XHJcbiAgICAgICAgY29uc3QgdG1wXzggPSBtMDIgKiBtMjM7XHJcbiAgICAgICAgY29uc3QgdG1wXzkgPSBtMjIgKiBtMDM7XHJcbiAgICAgICAgY29uc3QgdG1wXzEwID0gbTAyICogbTEzO1xyXG4gICAgICAgIGNvbnN0IHRtcF8xMSA9IG0xMiAqIG0wMztcclxuICAgICAgICBjb25zdCB0bXBfMTIgPSBtMjAgKiBtMzE7XHJcbiAgICAgICAgY29uc3QgdG1wXzEzID0gbTMwICogbTIxO1xyXG4gICAgICAgIGNvbnN0IHRtcF8xNCA9IG0xMCAqIG0zMTtcclxuICAgICAgICBjb25zdCB0bXBfMTUgPSBtMzAgKiBtMTE7XHJcbiAgICAgICAgY29uc3QgdG1wXzE2ID0gbTEwICogbTIxO1xyXG4gICAgICAgIGNvbnN0IHRtcF8xNyA9IG0yMCAqIG0xMTtcclxuICAgICAgICBjb25zdCB0bXBfMTggPSBtMDAgKiBtMzE7XHJcbiAgICAgICAgY29uc3QgdG1wXzE5ID0gbTMwICogbTAxO1xyXG4gICAgICAgIGNvbnN0IHRtcF8yMCA9IG0wMCAqIG0yMTtcclxuICAgICAgICBjb25zdCB0bXBfMjEgPSBtMjAgKiBtMDE7XHJcbiAgICAgICAgY29uc3QgdG1wXzIyID0gbTAwICogbTExO1xyXG4gICAgICAgIGNvbnN0IHRtcF8yMyA9IG0xMCAqIG0wMTtcclxuICAgICAgICBjb25zdCB0MCA9IHRtcF8wICogbTExICtcclxuICAgICAgICAgICAgdG1wXzMgKiBtMjEgK1xyXG4gICAgICAgICAgICB0bXBfNCAqIG0zMSAtXHJcbiAgICAgICAgICAgICh0bXBfMSAqIG0xMSArIHRtcF8yICogbTIxICsgdG1wXzUgKiBtMzEpO1xyXG4gICAgICAgIGNvbnN0IHQxID0gdG1wXzEgKiBtMDEgK1xyXG4gICAgICAgICAgICB0bXBfNiAqIG0yMSArXHJcbiAgICAgICAgICAgIHRtcF85ICogbTMxIC1cclxuICAgICAgICAgICAgKHRtcF8wICogbTAxICsgdG1wXzcgKiBtMjEgKyB0bXBfOCAqIG0zMSk7XHJcbiAgICAgICAgY29uc3QgdDIgPSB0bXBfMiAqIG0wMSArXHJcbiAgICAgICAgICAgIHRtcF83ICogbTExICtcclxuICAgICAgICAgICAgdG1wXzEwICogbTMxIC1cclxuICAgICAgICAgICAgKHRtcF8zICogbTAxICsgdG1wXzYgKiBtMTEgKyB0bXBfMTEgKiBtMzEpO1xyXG4gICAgICAgIGNvbnN0IHQzID0gdG1wXzUgKiBtMDEgK1xyXG4gICAgICAgICAgICB0bXBfOCAqIG0xMSArXHJcbiAgICAgICAgICAgIHRtcF8xMSAqIG0yMSAtXHJcbiAgICAgICAgICAgICh0bXBfNCAqIG0wMSArIHRtcF85ICogbTExICsgdG1wXzEwICogbTIxKTtcclxuICAgICAgICBjb25zdCBkID0gMS4wIC8gKG0wMCAqIHQwICsgbTEwICogdDEgKyBtMjAgKiB0MiArIG0zMCAqIHQzKTtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBkICogdDAsXHJcbiAgICAgICAgICAgIGQgKiB0MSxcclxuICAgICAgICAgICAgZCAqIHQyLFxyXG4gICAgICAgICAgICBkICogdDMsXHJcbiAgICAgICAgICAgIGQgKlxyXG4gICAgICAgICAgICAgICAgKHRtcF8xICogbTEwICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfMiAqIG0yMCArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzUgKiBtMzAgLVxyXG4gICAgICAgICAgICAgICAgICAgICh0bXBfMCAqIG0xMCArIHRtcF8zICogbTIwICsgdG1wXzQgKiBtMzApKSxcclxuICAgICAgICAgICAgZCAqXHJcbiAgICAgICAgICAgICAgICAodG1wXzAgKiBtMDAgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF83ICogbTIwICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfOCAqIG0zMCAtXHJcbiAgICAgICAgICAgICAgICAgICAgKHRtcF8xICogbTAwICsgdG1wXzYgKiBtMjAgKyB0bXBfOSAqIG0zMCkpLFxyXG4gICAgICAgICAgICBkICpcclxuICAgICAgICAgICAgICAgICh0bXBfMyAqIG0wMCArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzYgKiBtMTAgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF8xMSAqIG0zMCAtXHJcbiAgICAgICAgICAgICAgICAgICAgKHRtcF8yICogbTAwICsgdG1wXzcgKiBtMTAgKyB0bXBfMTAgKiBtMzApKSxcclxuICAgICAgICAgICAgZCAqXHJcbiAgICAgICAgICAgICAgICAodG1wXzQgKiBtMDAgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF85ICogbTEwICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfMTAgKiBtMjAgLVxyXG4gICAgICAgICAgICAgICAgICAgICh0bXBfNSAqIG0wMCArIHRtcF84ICogbTEwICsgdG1wXzExICogbTIwKSksXHJcbiAgICAgICAgICAgIGQgKlxyXG4gICAgICAgICAgICAgICAgKHRtcF8xMiAqIG0xMyArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzE1ICogbTIzICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfMTYgKiBtMzMgLVxyXG4gICAgICAgICAgICAgICAgICAgICh0bXBfMTMgKiBtMTMgKyB0bXBfMTQgKiBtMjMgKyB0bXBfMTcgKiBtMzMpKSxcclxuICAgICAgICAgICAgZCAqXHJcbiAgICAgICAgICAgICAgICAodG1wXzEzICogbTAzICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfMTggKiBtMjMgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF8yMSAqIG0zMyAtXHJcbiAgICAgICAgICAgICAgICAgICAgKHRtcF8xMiAqIG0wMyArIHRtcF8xOSAqIG0yMyArIHRtcF8yMCAqIG0zMykpLFxyXG4gICAgICAgICAgICBkICpcclxuICAgICAgICAgICAgICAgICh0bXBfMTQgKiBtMDMgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF8xOSAqIG0xMyArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzIyICogbTMzIC1cclxuICAgICAgICAgICAgICAgICAgICAodG1wXzE1ICogbTAzICsgdG1wXzE4ICogbTEzICsgdG1wXzIzICogbTMzKSksXHJcbiAgICAgICAgICAgIGQgKlxyXG4gICAgICAgICAgICAgICAgKHRtcF8xNyAqIG0wMyArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzIwICogbTEzICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfMjMgKiBtMjMgLVxyXG4gICAgICAgICAgICAgICAgICAgICh0bXBfMTYgKiBtMDMgKyB0bXBfMjEgKiBtMTMgKyB0bXBfMjIgKiBtMjMpKSxcclxuICAgICAgICAgICAgZCAqXHJcbiAgICAgICAgICAgICAgICAodG1wXzE0ICogbTIyICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfMTcgKiBtMzIgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF8xMyAqIG0xMiAtXHJcbiAgICAgICAgICAgICAgICAgICAgKHRtcF8xNiAqIG0zMiArIHRtcF8xMiAqIG0xMiArIHRtcF8xNSAqIG0yMikpLFxyXG4gICAgICAgICAgICBkICpcclxuICAgICAgICAgICAgICAgICh0bXBfMjAgKiBtMzIgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF8xMiAqIG0wMiArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzE5ICogbTIyIC1cclxuICAgICAgICAgICAgICAgICAgICAodG1wXzE4ICogbTIyICsgdG1wXzIxICogbTMyICsgdG1wXzEzICogbTAyKSksXHJcbiAgICAgICAgICAgIGQgKlxyXG4gICAgICAgICAgICAgICAgKHRtcF8xOCAqIG0xMiArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzIzICogbTMyICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfMTUgKiBtMDIgLVxyXG4gICAgICAgICAgICAgICAgICAgICh0bXBfMjIgKiBtMzIgKyB0bXBfMTQgKiBtMDIgKyB0bXBfMTkgKiBtMTIpKSxcclxuICAgICAgICAgICAgZCAqXHJcbiAgICAgICAgICAgICAgICAodG1wXzIyICogbTIyICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfMTYgKiBtMDIgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF8yMSAqIG0xMiAtXHJcbiAgICAgICAgICAgICAgICAgICAgKHRtcF8yMCAqIG0xMiArIHRtcF8yMyAqIG0yMiArIHRtcF8xNyAqIG0wMikpLFxyXG4gICAgICAgIF07XHJcbiAgICB9LFxyXG4gICAgbG9va0F0OiBmdW5jdGlvbiAoY2FtZXJhUG9zaXRpb24sIHRhcmdldCwgdXApIHtcclxuICAgICAgICBjb25zdCB6QXhpcyA9IHYzLm5vcm1hbGl6ZSh2My5kaWZmKGNhbWVyYVBvc2l0aW9uLCB0YXJnZXQpKTtcclxuICAgICAgICBjb25zdCB4QXhpcyA9IHYzLm5vcm1hbGl6ZSh2My5jcm9zcyh1cCwgekF4aXMpKTtcclxuICAgICAgICBjb25zdCB5QXhpcyA9IHYzLm5vcm1hbGl6ZSh2My5jcm9zcyh6QXhpcywgeEF4aXMpKTtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICB4QXhpc1swXSxcclxuICAgICAgICAgICAgeEF4aXNbMV0sXHJcbiAgICAgICAgICAgIHhBeGlzWzJdLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICB5QXhpc1swXSxcclxuICAgICAgICAgICAgeUF4aXNbMV0sXHJcbiAgICAgICAgICAgIHlBeGlzWzJdLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICB6QXhpc1swXSxcclxuICAgICAgICAgICAgekF4aXNbMV0sXHJcbiAgICAgICAgICAgIHpBeGlzWzJdLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICBjYW1lcmFQb3NpdGlvblswXSxcclxuICAgICAgICAgICAgY2FtZXJhUG9zaXRpb25bMV0sXHJcbiAgICAgICAgICAgIGNhbWVyYVBvc2l0aW9uWzJdLFxyXG4gICAgICAgICAgICAxLFxyXG4gICAgICAgIF07XHJcbiAgICB9LFxyXG4gICAgY29weTogZnVuY3Rpb24gKHNyYykge1xyXG4gICAgICAgIHJldHVybiBbLi4uc3JjXTtcclxuICAgIH0sXHJcbiAgICB0cmFuc2Zvcm1Qb2ludDogZnVuY3Rpb24gKG0sIHYsIGRzdCkge1xyXG4gICAgICAgIGRzdCA9IGRzdCB8fCBuZXcgQXJyYXkoMyk7XHJcbiAgICAgICAgY29uc3QgdjAgPSB2WzBdO1xyXG4gICAgICAgIGNvbnN0IHYxID0gdlsxXTtcclxuICAgICAgICBjb25zdCB2MiA9IHZbMl07XHJcbiAgICAgICAgY29uc3QgZCA9IHYwICogbVswICogNCArIDNdICsgdjEgKiBtWzEgKiA0ICsgM10gKyB2MiAqIG1bMiAqIDQgKyAzXSArIG1bMyAqIDQgKyAzXTtcclxuICAgICAgICBkc3RbMF0gPVxyXG4gICAgICAgICAgICAodjAgKiBtWzAgKiA0ICsgMF0gK1xyXG4gICAgICAgICAgICAgICAgdjEgKiBtWzEgKiA0ICsgMF0gK1xyXG4gICAgICAgICAgICAgICAgdjIgKiBtWzIgKiA0ICsgMF0gK1xyXG4gICAgICAgICAgICAgICAgbVszICogNCArIDBdKSAvXHJcbiAgICAgICAgICAgICAgICBkO1xyXG4gICAgICAgIGRzdFsxXSA9XHJcbiAgICAgICAgICAgICh2MCAqIG1bMCAqIDQgKyAxXSArXHJcbiAgICAgICAgICAgICAgICB2MSAqIG1bMSAqIDQgKyAxXSArXHJcbiAgICAgICAgICAgICAgICB2MiAqIG1bMiAqIDQgKyAxXSArXHJcbiAgICAgICAgICAgICAgICBtWzMgKiA0ICsgMV0pIC9cclxuICAgICAgICAgICAgICAgIGQ7XHJcbiAgICAgICAgZHN0WzJdID1cclxuICAgICAgICAgICAgKHYwICogbVswICogNCArIDJdICtcclxuICAgICAgICAgICAgICAgIHYxICogbVsxICogNCArIDJdICtcclxuICAgICAgICAgICAgICAgIHYyICogbVsyICogNCArIDJdICtcclxuICAgICAgICAgICAgICAgIG1bMyAqIDQgKyAyXSkgL1xyXG4gICAgICAgICAgICAgICAgZDtcclxuICAgICAgICByZXR1cm4gZHN0O1xyXG4gICAgfSxcclxuICAgIGlkZW50aXR5OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc3QgZHN0ID0gbmV3IEFycmF5KDE2KTtcclxuICAgICAgICBkc3RbMF0gPSAxO1xyXG4gICAgICAgIGRzdFsxXSA9IDA7XHJcbiAgICAgICAgZHN0WzJdID0gMDtcclxuICAgICAgICBkc3RbM10gPSAwO1xyXG4gICAgICAgIGRzdFs0XSA9IDA7XHJcbiAgICAgICAgZHN0WzVdID0gMTtcclxuICAgICAgICBkc3RbNl0gPSAwO1xyXG4gICAgICAgIGRzdFs3XSA9IDA7XHJcbiAgICAgICAgZHN0WzhdID0gMDtcclxuICAgICAgICBkc3RbOV0gPSAwO1xyXG4gICAgICAgIGRzdFsxMF0gPSAxO1xyXG4gICAgICAgIGRzdFsxMV0gPSAwO1xyXG4gICAgICAgIGRzdFsxMl0gPSAwO1xyXG4gICAgICAgIGRzdFsxM10gPSAwO1xyXG4gICAgICAgIGRzdFsxNF0gPSAwO1xyXG4gICAgICAgIGRzdFsxNV0gPSAxO1xyXG4gICAgICAgIHJldHVybiBkc3Q7XHJcbiAgICB9LFxyXG4gICAgbTNUb200OiBmdW5jdGlvbiAobSkge1xyXG4gICAgICAgIGNvbnN0IGRzdCA9IG5ldyBBcnJheSgxNik7XHJcbiAgICAgICAgZHN0WzBdID0gbVswXTtcclxuICAgICAgICBkc3RbMV0gPSBtWzFdO1xyXG4gICAgICAgIGRzdFsyXSA9IG1bMl07XHJcbiAgICAgICAgZHN0WzNdID0gMDtcclxuICAgICAgICBkc3RbNF0gPSBtWzNdO1xyXG4gICAgICAgIGRzdFs1XSA9IG1bNF07XHJcbiAgICAgICAgZHN0WzZdID0gbVs1XTtcclxuICAgICAgICBkc3RbN10gPSAwO1xyXG4gICAgICAgIGRzdFs4XSA9IG1bNl07XHJcbiAgICAgICAgZHN0WzldID0gbVs3XTtcclxuICAgICAgICBkc3RbMTBdID0gbVs4XTtcclxuICAgICAgICBkc3RbMTFdID0gMDtcclxuICAgICAgICBkc3RbMTJdID0gMDtcclxuICAgICAgICBkc3RbMTNdID0gMDtcclxuICAgICAgICBkc3RbMTRdID0gMDtcclxuICAgICAgICBkc3RbMTVdID0gMTtcclxuICAgICAgICByZXR1cm4gZHN0O1xyXG4gICAgfSxcclxuICAgIG00VG9tMzogZnVuY3Rpb24gKG0pIHtcclxuICAgICAgICBjb25zdCBkc3QgPSBuZXcgQXJyYXkoOSk7XHJcbiAgICAgICAgZHN0WzBdID0gbVswXTtcclxuICAgICAgICBkc3RbMV0gPSBtWzFdO1xyXG4gICAgICAgIGRzdFsyXSA9IG1bMl07XHJcbiAgICAgICAgZHN0WzNdID0gbVs0XTtcclxuICAgICAgICBkc3RbNF0gPSBtWzVdO1xyXG4gICAgICAgIGRzdFs1XSA9IG1bNl07XHJcbiAgICAgICAgZHN0WzZdID0gbVs4XTtcclxuICAgICAgICBkc3RbN10gPSBtWzldO1xyXG4gICAgICAgIGRzdFs4XSA9IG1bMTBdO1xyXG4gICAgICAgIHJldHVybiBkc3Q7XHJcbiAgICB9LFxyXG4gICAgdG9TdHJpbmcobSkge1xyXG4gICAgICAgIHJldHVybiBtLnJlZHVjZSgoYWNjLCBlbCwgaWR4KSA9PiBpZHggJSA0ID09PSAwXHJcbiAgICAgICAgICAgID8gKGFjYyArPSBgXFxuJHtlbC50b1N0cmluZygpfWApXHJcbiAgICAgICAgICAgIDogKGFjYyArPSBgICR7ZWwudG9TdHJpbmcoKX1gKSwgXCJcIik7XHJcbiAgICB9LFxyXG4gICAgdHJhbnNwb3NlOiBmdW5jdGlvbiAobSkge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIG1bMF0sXHJcbiAgICAgICAgICAgIG1bNF0sXHJcbiAgICAgICAgICAgIG1bOF0sXHJcbiAgICAgICAgICAgIG1bMTJdLFxyXG4gICAgICAgICAgICBtWzFdLFxyXG4gICAgICAgICAgICBtWzVdLFxyXG4gICAgICAgICAgICBtWzldLFxyXG4gICAgICAgICAgICBtWzEzXSxcclxuICAgICAgICAgICAgbVsyXSxcclxuICAgICAgICAgICAgbVs2XSxcclxuICAgICAgICAgICAgbVsxMF0sXHJcbiAgICAgICAgICAgIG1bMTRdLFxyXG4gICAgICAgICAgICBtWzNdLFxyXG4gICAgICAgICAgICBtWzddLFxyXG4gICAgICAgICAgICBtWzExXSxcclxuICAgICAgICAgICAgbVsxNV0sXHJcbiAgICAgICAgXTtcclxuICAgIH0sXHJcbiAgICBmcm9tUXVhdGVybmlvbjogKHEpID0+IHtcclxuICAgICAgICBjb25zdCBhMTEgPSAxIC0gMiAqIChxWzFdICogcVsxXSArIHFbMl0gKiBxWzJdKTtcclxuICAgICAgICBjb25zdCBhMTIgPSAyICogKHFbMF0gKiBxWzFdIC0gcVsyXSAqIHFbM10pO1xyXG4gICAgICAgIGNvbnN0IGExMyA9IDIgKiAocVswXSAqIHFbMl0gKyBxWzFdICogcVszXSk7XHJcbiAgICAgICAgY29uc3QgYTIxID0gMiAqIChxWzBdICogcVsxXSArIHFbMl0gKiBxWzNdKTtcclxuICAgICAgICBjb25zdCBhMjIgPSAxIC0gMiAqIChxWzBdICogcVswXSArIHFbMl0gKiBxWzJdKTtcclxuICAgICAgICBjb25zdCBhMjMgPSAyICogKHFbMV0gKiBxWzJdIC0gcVswXSAqIHFbM10pO1xyXG4gICAgICAgIGNvbnN0IGEzMSA9IDIgKiAocVswXSAqIHFbMl0gLSBxWzFdICogcVszXSk7XHJcbiAgICAgICAgY29uc3QgYTMyID0gMiAqIChxWzFdICogcVsyXSArIHFbMF0gKiBxWzNdKTtcclxuICAgICAgICBjb25zdCBhMzMgPSAxIC0gMiAqIChxWzBdICogcVswXSArIHFbMV0gKiBxWzFdKTtcclxuICAgICAgICByZXR1cm4gW2ExMSwgYTEyLCBhMTMsIDAsIGEyMSwgYTIyLCBhMjMsIDAsIGEzMSwgYTMyLCBhMzMsIDAsIDAsIDAsIDAsIDFdO1xyXG4gICAgfSxcclxuICAgIC8qXHJcbiAgICByb3RhdGlvbih4LCB5LCB6KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnhSb3RhdGUodGhpcy55Um90YXRlKHRoaXMuelJvdGF0aW9uKHopLCB5KSwgeCk7XHJcbiAgICB9LFxyXG4gICAgcm90YXRpb25Gcm9tTm9ybWFsKG4pIHtcclxuICAgICAgcmV0dXJuIHRoaXMucm90YXRpb24oTWF0aC5hY29zKG5bMV0pLCBNYXRoLmFjb3MoblsyXSksIE1hdGguYWNvcyhuWzBdKSk7XHJcbiAgICB9LCovXHJcbiAgICBkZXRlcm1pbmF0ZShtKSB7XHJcbiAgICAgICAgY29uc3QgbTAwID0gbVswICogNCArIDBdO1xyXG4gICAgICAgIGNvbnN0IG0wMSA9IG1bMCAqIDQgKyAxXTtcclxuICAgICAgICBjb25zdCBtMDIgPSBtWzAgKiA0ICsgMl07XHJcbiAgICAgICAgY29uc3QgbTAzID0gbVswICogNCArIDNdO1xyXG4gICAgICAgIGNvbnN0IG0xMCA9IG1bMSAqIDQgKyAwXTtcclxuICAgICAgICBjb25zdCBtMTEgPSBtWzEgKiA0ICsgMV07XHJcbiAgICAgICAgY29uc3QgbTEyID0gbVsxICogNCArIDJdO1xyXG4gICAgICAgIGNvbnN0IG0xMyA9IG1bMSAqIDQgKyAzXTtcclxuICAgICAgICBjb25zdCBtMjAgPSBtWzIgKiA0ICsgMF07XHJcbiAgICAgICAgY29uc3QgbTIxID0gbVsyICogNCArIDFdO1xyXG4gICAgICAgIGNvbnN0IG0yMiA9IG1bMiAqIDQgKyAyXTtcclxuICAgICAgICBjb25zdCBtMjMgPSBtWzIgKiA0ICsgM107XHJcbiAgICAgICAgY29uc3QgbTMwID0gbVszICogNCArIDBdO1xyXG4gICAgICAgIGNvbnN0IG0zMSA9IG1bMyAqIDQgKyAxXTtcclxuICAgICAgICBjb25zdCBtMzIgPSBtWzMgKiA0ICsgMl07XHJcbiAgICAgICAgY29uc3QgbTMzID0gbVszICogNCArIDNdO1xyXG4gICAgICAgIGNvbnN0IHRtcF8wID0gbTIyICogbTMzO1xyXG4gICAgICAgIGNvbnN0IHRtcF8xID0gbTMyICogbTIzO1xyXG4gICAgICAgIGNvbnN0IHRtcF8yID0gbTEyICogbTMzO1xyXG4gICAgICAgIGNvbnN0IHRtcF8zID0gbTMyICogbTEzO1xyXG4gICAgICAgIGNvbnN0IHRtcF80ID0gbTEyICogbTIzO1xyXG4gICAgICAgIGNvbnN0IHRtcF81ID0gbTIyICogbTEzO1xyXG4gICAgICAgIGNvbnN0IHRtcF82ID0gbTAyICogbTMzO1xyXG4gICAgICAgIGNvbnN0IHRtcF83ID0gbTMyICogbTAzO1xyXG4gICAgICAgIGNvbnN0IHRtcF84ID0gbTAyICogbTIzO1xyXG4gICAgICAgIGNvbnN0IHRtcF85ID0gbTIyICogbTAzO1xyXG4gICAgICAgIGNvbnN0IHRtcF8xMCA9IG0wMiAqIG0xMztcclxuICAgICAgICBjb25zdCB0bXBfMTEgPSBtMTIgKiBtMDM7XHJcbiAgICAgICAgY29uc3QgdDAgPSB0bXBfMCAqIG0xMSArXHJcbiAgICAgICAgICAgIHRtcF8zICogbTIxICtcclxuICAgICAgICAgICAgdG1wXzQgKiBtMzEgLVxyXG4gICAgICAgICAgICAodG1wXzEgKiBtMTEgKyB0bXBfMiAqIG0yMSArIHRtcF81ICogbTMxKTtcclxuICAgICAgICBjb25zdCB0MSA9IHRtcF8xICogbTAxICtcclxuICAgICAgICAgICAgdG1wXzYgKiBtMjEgK1xyXG4gICAgICAgICAgICB0bXBfOSAqIG0zMSAtXHJcbiAgICAgICAgICAgICh0bXBfMCAqIG0wMSArIHRtcF83ICogbTIxICsgdG1wXzggKiBtMzEpO1xyXG4gICAgICAgIGNvbnN0IHQyID0gdG1wXzIgKiBtMDEgK1xyXG4gICAgICAgICAgICB0bXBfNyAqIG0xMSArXHJcbiAgICAgICAgICAgIHRtcF8xMCAqIG0zMSAtXHJcbiAgICAgICAgICAgICh0bXBfMyAqIG0wMSArIHRtcF82ICogbTExICsgdG1wXzExICogbTMxKTtcclxuICAgICAgICBjb25zdCB0MyA9IHRtcF81ICogbTAxICtcclxuICAgICAgICAgICAgdG1wXzggKiBtMTEgK1xyXG4gICAgICAgICAgICB0bXBfMTEgKiBtMjEgLVxyXG4gICAgICAgICAgICAodG1wXzQgKiBtMDEgKyB0bXBfOSAqIG0xMSArIHRtcF8xMCAqIG0yMSk7XHJcbiAgICAgICAgcmV0dXJuIDEuMCAvIChtMDAgKiB0MCArIG0xMCAqIHQxICsgbTIwICogdDIgKyBtMzAgKiB0Myk7XHJcbiAgICB9LFxyXG4gICAgZGVjb21wb3NlKG0pIHtcclxuICAgICAgICBsZXQgc3ggPSB2My5ub3JtKG0uc2xpY2UoMCwgMykpO1xyXG4gICAgICAgIGNvbnN0IHN5ID0gdjMubm9ybShtLnNsaWNlKDQsIDcpKTtcclxuICAgICAgICBjb25zdCBzeiA9IHYzLm5vcm0obS5zbGljZSg4LCAxMSkpO1xyXG4gICAgICAgIGNvbnN0IGRldCA9IHRoaXMuZGV0ZXJtaW5hdGUobSk7XHJcbiAgICAgICAgaWYgKGRldCA8IDApIHtcclxuICAgICAgICAgICAgc3ggPSAtc3g7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHRyYW5zbGF0aW9uID0gbmV3IEFycmF5KDMpO1xyXG4gICAgICAgIGNvbnN0IHNjYWxlID0gbmV3IEFycmF5KDMpO1xyXG4gICAgICAgIGNvbnN0IFJtYXRyaXggPSBbLi4ubV07XHJcbiAgICAgICAgdHJhbnNsYXRpb25bMF0gPSBtWzEyXTtcclxuICAgICAgICB0cmFuc2xhdGlvblsxXSA9IG1bMTNdO1xyXG4gICAgICAgIHRyYW5zbGF0aW9uWzJdID0gbVsxNF07XHJcbiAgICAgICAgY29uc3QgaW52U1ggPSAxIC8gc3g7XHJcbiAgICAgICAgY29uc3QgaW52U1kgPSAxIC8gc3k7XHJcbiAgICAgICAgY29uc3QgaW52U1ogPSAxIC8gc3o7XHJcbiAgICAgICAgUm1hdHJpeFswXSAqPSBpbnZTWDtcclxuICAgICAgICBSbWF0cml4WzFdICo9IGludlNYO1xyXG4gICAgICAgIFJtYXRyaXhbMl0gKj0gaW52U1g7XHJcbiAgICAgICAgUm1hdHJpeFs0XSAqPSBpbnZTWTtcclxuICAgICAgICBSbWF0cml4WzVdICo9IGludlNZO1xyXG4gICAgICAgIFJtYXRyaXhbNl0gKj0gaW52U1k7XHJcbiAgICAgICAgUm1hdHJpeFs4XSAqPSBpbnZTWjtcclxuICAgICAgICBSbWF0cml4WzldICo9IGludlNaO1xyXG4gICAgICAgIFJtYXRyaXhbMTBdICo9IGludlNaO1xyXG4gICAgICAgIHNjYWxlWzBdID0gc3g7XHJcbiAgICAgICAgc2NhbGVbMV0gPSBzeTtcclxuICAgICAgICBzY2FsZVsyXSA9IHN6O1xyXG4gICAgICAgIHJldHVybiB7IHRyYW5zbGF0aW9uLCBSbWF0cml4LCBzY2FsZSB9O1xyXG4gICAgfSxcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgbTQ7XHJcbiIsImNvbnN0IGRvdCA9IChhLCBiKSA9PiBhWzBdICogYlswXSArIGFbMV0gKiBiWzFdICsgYVsyXSAqIGJbMl07XHJcbmNvbnN0IGNyb3NzID0gKGEsIGIpID0+IFtcclxuICAgIGFbMV0gKiBiWzJdIC0gYlsxXSAqIGFbMl0sXHJcbiAgICBhWzJdICogYlswXSAtIGJbMl0gKiBhWzBdLFxyXG4gICAgYVswXSAqIGJbMV0gLSBiWzBdICogYVsxXSxcclxuXTtcclxuY29uc3Qgc2NhbGUgPSAoYSwgc2NhbGFyKSA9PiBbYVswXSAqIHNjYWxhciwgYVsxXSAqIHNjYWxhciwgYVsyXSAqIHNjYWxhcl07XHJcbmNvbnN0IHN1bSA9IChhLCBiKSA9PiBbYVswXSArIGJbMF0sIGFbMV0gKyBiWzFdLCBhWzJdICsgYlsyXV07XHJcbmNvbnN0IGRpZmYgPSAoYSwgYikgPT4gW2FbMF0gLSBiWzBdLCBhWzFdIC0gYlsxXSwgYVsyXSAtIGJbMl1dO1xyXG5jb25zdCBub3JtID0gKGEpID0+IE1hdGguc3FydChhWzBdICogYVswXSArIGFbMV0gKiBhWzFdICsgYVsyXSAqIGFbMl0pO1xyXG5jb25zdCBub3JtU3EgPSAoYSkgPT4gYVswXSAqIGFbMF0gKyBhWzFdICogYVsxXSArIGFbMl0gKiBhWzJdO1xyXG5jb25zdCBub3JtYWxpemUgPSAoYSkgPT4ge1xyXG4gICAgY29uc3QgbGVuZ3RoID0gbm9ybShhKTtcclxuICAgIGlmIChsZW5ndGggPT09IDApXHJcbiAgICAgICAgcmV0dXJuIGE7XHJcbiAgICByZXR1cm4gW2FbMF0gLyBsZW5ndGgsIGFbMV0gLyBsZW5ndGgsIGFbMl0gLyBsZW5ndGhdO1xyXG59O1xyXG5jb25zdCBpc051bGwgPSAoYSkgPT4gYVswXSAqIGFbMF0gKyBhWzFdICogYVsxXSArIGFbMl0gKiBhWzJdID09PSAwO1xyXG5jb25zdCBpc0VxdWFsID0gKGEsIGIpID0+IGFbMF0gPT0gYlswXSAmJiBhWzFdID09IGJbMV0gJiYgYVsyXSA9PSBiWzJdO1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBzdW0sXHJcbiAgICBkaWZmLFxyXG4gICAgc2NhbGUsXHJcbiAgICBkb3QsXHJcbiAgICBjcm9zcyxcclxuICAgIG5vcm0sXHJcbiAgICBub3JtU3EsXHJcbiAgICBub3JtYWxpemUsXHJcbiAgICBpc0VxdWFsLFxyXG4gICAgaXNOdWxsLFxyXG59O1xyXG4iLCJjb25zdCBnbHNsID0geCA9PiB4O1xyXG5jb25zdCB2ZXJ0ID0gZ2xzbCBgI3ZlcnNpb24gMzAwIGVzXHJcbiBcclxubGF5b3V0KGxvY2F0aW9uID0gMCkgaW4gdmVjNCBhX3Bvc2l0aW9uO1xyXG5sYXlvdXQobG9jYXRpb24gPSAxKSBpbiB2ZWMzIGFfbm9ybWFsO1xyXG5sYXlvdXQobG9jYXRpb24gPSA0KSBpbiB2ZWMyIGFfdGV4Y29vcmQ7XHJcblxyXG51bmlmb3JtIG1hdDQgdV9tYXRyaXg7XHJcbnVuaWZvcm0gbWF0NCB1X3dvcmxkVmlld1Byb2plY3Rpb247XHJcbnVuaWZvcm0gdmVjMyB1X2xpZ2h0V29ybGRQb3NpdGlvbjtcclxudW5pZm9ybSB2ZWMzIHVfdmlld1dvcmxkUG9zaXRpb247XHJcblxyXG5vdXQgdmVjMyB2X25vcm1hbDtcclxub3V0IHZlYzMgdl9zdXJmYWNlVG9MaWdodDtcclxub3V0IHZlYzMgdl9zdXJmYWNlVG9WaWV3O1xyXG5vdXQgdmVjMiB2X3RleGNvb3JkO1xyXG5cclxudm9pZCBtYWluKCkge1xyXG4gICAgXHJcbiAgICBnbF9Qb3NpdGlvbiA9IHVfd29ybGRWaWV3UHJvamVjdGlvbiAqIGFfcG9zaXRpb247XHJcbiAgICBcclxuICAgIHZlYzMgc3VyZmFjZVdvcmxkUG9zaXRpb24gPSAodV9tYXRyaXggKiBhX3Bvc2l0aW9uKS54eXo7XHJcbiAgICBcclxuICAgIHZfc3VyZmFjZVRvTGlnaHQgPSB1X2xpZ2h0V29ybGRQb3NpdGlvbiAtIHN1cmZhY2VXb3JsZFBvc2l0aW9uO1xyXG5cclxuICAgIHZfbm9ybWFsID0gbWF0MyggIHVfbWF0cml4ICkgKiBhX25vcm1hbDtcclxuICAgIFxyXG4gICAgdl9zdXJmYWNlVG9WaWV3ID0gdV92aWV3V29ybGRQb3NpdGlvbiAtIHN1cmZhY2VXb3JsZFBvc2l0aW9uO1xyXG5cclxuICAgIHZfdGV4Y29vcmQgPSBhX3RleGNvb3JkO1xyXG4gICAgICBcclxufWA7XHJcbmNvbnN0IGZyYWcgPSBnbHNsIGAjdmVyc2lvbiAzMDAgZXNcclxucHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xyXG4gXHJcblxyXG5cclxuXHJcbmluIHZlYzMgdl9ub3JtYWw7XHJcbmluIHZlYzMgdl9zdXJmYWNlVG9WaWV3O1xyXG5pbiB2ZWMzIHZfc3VyZmFjZVRvTGlnaHQ7XHJcblxyXG5cclxuLy91bmlmb3JtIHNhbXBsZXIyRCB1X3RleHR1cmUxO1xyXG51bmlmb3JtIGZsb2F0IHVfc2hpbmluZXNzO1xyXG51bmlmb3JtIHZlYzQgdV9jb2xvcjtcclxudW5pZm9ybSB2ZWM0IHVfYW1iaWVudExpZ2h0O1xyXG5cclxuaW4gdmVjMiB2X3RleGNvb3JkO1xyXG5cclxuLy8gVGhlIHRleHR1cmUuXHJcbnVuaWZvcm0gc2FtcGxlcjJEIHVfdGV4dHVyZTtcclxuXHJcbm91dCB2ZWM0IG91dENvbG9yO1xyXG5cclxuXHJcbnZvaWQgbWFpbigpIHtcclxuICBcclxuICB2ZWMzIHN1cmZhY2VUb0xpZ2h0RGlyZWN0aW9uID0gbm9ybWFsaXplKHZfc3VyZmFjZVRvTGlnaHQpO1xyXG4gIHZlYzMgc3VyZmFjZVRvVmlld0RpcmVjdGlvbiA9IG5vcm1hbGl6ZSh2X3N1cmZhY2VUb1ZpZXcpO1xyXG4gIHZlYzMgaGFsZlZlY3RvciA9IG5vcm1hbGl6ZShzdXJmYWNlVG9MaWdodERpcmVjdGlvbiArIHN1cmZhY2VUb1ZpZXdEaXJlY3Rpb24pO1xyXG5cclxuICB2ZWMzIG5vcm1hbCA9IG5vcm1hbGl6ZSh2X25vcm1hbCk7XHJcbiAgZmxvYXQgbGlnaHQgPSBkb3Qobm9ybWFsLCBzdXJmYWNlVG9MaWdodERpcmVjdGlvbik7XHJcbiAgZmxvYXQgc3BlY3VsYXIgPSAwLjA7XHJcbiAgaWYgKGxpZ2h0ID4gMC4wKSB7XHJcbiAgICBzcGVjdWxhciA9IHBvdyhkb3Qobm9ybWFsLCBoYWxmVmVjdG9yKSwgdV9zaGluaW5lc3MpO1xyXG4gIH1cclxuICBcclxuICBvdXRDb2xvciA9IHRleHR1cmUodV90ZXh0dXJlLCB2X3RleGNvb3JkKTtcclxuICBvdXRDb2xvci5yZ2IgKj0gbGlnaHQ7XHJcbiAgb3V0Q29sb3IucmdiICs9IHNwZWN1bGFyO1xyXG5cclxuICBvdXRDb2xvci5yZ2IgKz0gdV9hbWJpZW50TGlnaHQucmdiICowLjM7XHJcbiAgXHJcbn1gO1xyXG5leHBvcnQgZGVmYXVsdCB7IHZlcnQsIGZyYWcgfTtcclxuIiwiaW1wb3J0IHsgdjMsIG0zLCBBQUJCLCBtNCB9IGZyb20gXCJyb21hbnBwcG1hdGhcIjtcclxuY29uc3QgeEF4aXMgPSBbMSwgMCwgMF07XHJcbmNvbnN0IHlBeGlzID0gWzAsIDEsIDBdO1xyXG5jb25zdCB6QXhpcyA9IFswLCAwLCAxXTtcclxuY29uc3QgeEF4aXNOZWdhdGl2ZSA9IHYzLnNjYWxlKHhBeGlzLCAtMSk7XHJcbmNvbnN0IHlBeGlzTmVnYXRpdmUgPSB2My5zY2FsZSh5QXhpcywgLTEpO1xyXG5jb25zdCB6QXhpc05lZ2F0aXZlID0gdjMuc2NhbGUoekF4aXMsIC0xKTtcclxuY2xhc3MgQ29sbGlkZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5SbWF0cml4ID0gbTMuaWRlbnRpdHkoKTtcclxuICAgICAgICB0aGlzLlJtYXRyaXhJbnZlcnNlID0gbTMuaWRlbnRpdHkoKTtcclxuICAgICAgICB0aGlzLnBvcyA9IFswLCAwLCAwXTtcclxuICAgICAgICB0aGlzLnR5cGUgPSBcInBvaW50XCI7XHJcbiAgICAgICAgdGhpcy5pZCA9IENvbGxpZGVyLmxhc3RJZCsrO1xyXG4gICAgfVxyXG4gICAgZ2V0UmlnaWRCb2R5KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJpZ2lkQm9keTtcclxuICAgIH1cclxuICAgIHNldFJpZ2lkQm9keShib2R5KSB7XHJcbiAgICAgICAgdGhpcy5yaWdpZEJvZHkgPSBib2R5O1xyXG4gICAgfVxyXG4gICAgZ2V0VHlwZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50eXBlO1xyXG4gICAgfVxyXG4gICAgZ2V0Um1hdHJpeCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5SbWF0cml4O1xyXG4gICAgfVxyXG4gICAgc2V0Um1hdHJpeChtYXRyaXgpIHtcclxuICAgICAgICB0aGlzLlJtYXRyaXggPSBbLi4ubWF0cml4XTtcclxuICAgICAgICB0aGlzLlJtYXRyaXhJbnZlcnNlID0gbTMudHJhbnNwb3NlKG1hdHJpeCk7XHJcbiAgICB9XHJcbiAgICBnZXRSbWF0cml4SW52ZXJzZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5SbWF0cml4SW52ZXJzZTtcclxuICAgIH1cclxuICAgIGdldElkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlkO1xyXG4gICAgfVxyXG4gICAgc2V0SWQoaWQpIHtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB9XHJcbiAgICB0cmFuc2xhdGUodikge1xyXG4gICAgICAgIHRoaXMucG9zID0gdjMuc3VtKHRoaXMucG9zLCB2KTtcclxuICAgIH1cclxuICAgIHNldFRyYW5zbGF0aW9uKHRyYW5zbGF0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5wb3MgPSBbLi4udHJhbnNsYXRpb25dO1xyXG4gICAgfVxyXG4gICAgZ2V0VHJhbnNsYXRpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zO1xyXG4gICAgfVxyXG4gICAgcm90YXRlKHIpIHtcclxuICAgICAgICB0aGlzLlJtYXRyaXggPSBtMy54Um90YXRlKHRoaXMuUm1hdHJpeCwgclswXSk7XHJcbiAgICAgICAgdGhpcy5SbWF0cml4ID0gbTMueVJvdGF0ZSh0aGlzLlJtYXRyaXgsIHJbMV0pO1xyXG4gICAgICAgIHRoaXMuUm1hdHJpeCA9IG0zLnpSb3RhdGUodGhpcy5SbWF0cml4LCByWzJdKTtcclxuICAgICAgICB0aGlzLlJtYXRyaXhJbnZlcnNlID0gbTMudHJhbnNwb3NlKHRoaXMuUm1hdHJpeCk7XHJcbiAgICB9XHJcbiAgICBzZXRSb3RhdGlvbihyKSB7XHJcbiAgICAgICAgdGhpcy5SbWF0cml4ID0gbTMueFJvdGF0aW9uKHJbMF0pO1xyXG4gICAgICAgIHRoaXMuUm1hdHJpeCA9IG0zLnlSb3RhdGUodGhpcy5SbWF0cml4LCByWzFdKTtcclxuICAgICAgICB0aGlzLlJtYXRyaXggPSBtMy56Um90YXRlKHRoaXMuUm1hdHJpeCwgclsyXSk7XHJcbiAgICAgICAgdGhpcy5SbWF0cml4SW52ZXJzZSA9IG0zLnRyYW5zcG9zZSh0aGlzLlJtYXRyaXgpO1xyXG4gICAgfVxyXG4gICAgZ2V0QUFCQigpIHtcclxuICAgICAgICBjb25zdCBtYXhYID0gdGhpcy5zdXBwb3J0KHhBeGlzKVswXTtcclxuICAgICAgICBjb25zdCBtYXhZID0gdGhpcy5zdXBwb3J0KHlBeGlzKVsxXTtcclxuICAgICAgICBjb25zdCBtYXhaID0gdGhpcy5zdXBwb3J0KHpBeGlzKVsyXTtcclxuICAgICAgICBjb25zdCBtaW5YID0gdGhpcy5zdXBwb3J0KHhBeGlzTmVnYXRpdmUpWzBdO1xyXG4gICAgICAgIGNvbnN0IG1pblkgPSB0aGlzLnN1cHBvcnQoeUF4aXNOZWdhdGl2ZSlbMV07XHJcbiAgICAgICAgY29uc3QgbWluWiA9IHRoaXMuc3VwcG9ydCh6QXhpc05lZ2F0aXZlKVsyXTtcclxuICAgICAgICByZXR1cm4gbmV3IEFBQkIoW21pblgsIG1pblksIG1pblpdLCBbbWF4WCwgbWF4WSwgbWF4Wl0pO1xyXG4gICAgfVxyXG4gICAgZ2V0TTQoKSB7XHJcbiAgICAgICAgY29uc3QgbSA9IG00Lm0zVG9tNCh0aGlzLlJtYXRyaXgpO1xyXG4gICAgICAgIG1bMTJdID0gdGhpcy5wb3NbMF07XHJcbiAgICAgICAgbVsxM10gPSB0aGlzLnBvc1sxXTtcclxuICAgICAgICBtWzE0XSA9IHRoaXMucG9zWzJdO1xyXG4gICAgICAgIG1bMTVdID0gMTtcclxuICAgICAgICByZXR1cm4gbTtcclxuICAgIH1cclxuICAgIGxvY2FsVG9HbG9iYWwodikge1xyXG4gICAgICAgIGxldCBnbG9iYWwgPSBtMy50cmFuc2Zvcm1Qb2ludCh0aGlzLlJtYXRyaXgsIHYpO1xyXG4gICAgICAgIHJldHVybiB2My5zdW0odGhpcy5wb3MsIGdsb2JhbCk7XHJcbiAgICB9XHJcbiAgICBnZXRDbG9zZXN0RmFjZUJ5Tm9ybWFsKG5vcm1hbCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHZlcnRpY2VzOiBbdGhpcy5wb3NdLFxyXG4gICAgICAgICAgICBub3JtYWw6IHYzLnNjYWxlKG5vcm1hbCwgLTEpLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBnZXRJbnZlcnNlSW5lcnRpYVRlbnNvcihtYXNzKSB7XHJcbiAgICAgICAgcmV0dXJuIG0zLmlkZW50aXR5KCk7XHJcbiAgICB9XHJcbiAgICBzdXBwb3J0KGRpcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvcztcclxuICAgIH1cclxufVxyXG5Db2xsaWRlci5sYXN0SWQgPSAxO1xyXG5jbGFzcyBCb3ggZXh0ZW5kcyBDb2xsaWRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihhID0gMSwgYiA9IDEsIGMgPSAxKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnNjYWxlID0gW2EsIGIsIGNdO1xyXG4gICAgICAgIHRoaXMubWluID0gWy1hIC8gMiwgLWIgLyAyLCAtYyAvIDJdO1xyXG4gICAgICAgIHRoaXMubWF4ID0gW2EgLyAyLCBiIC8gMiwgYyAvIDJdO1xyXG4gICAgfVxyXG4gICAgZ2V0QUFCQigpIHtcclxuICAgICAgICBjb25zdCBtYXhYID0gdGhpcy5zdXBwb3J0KHhBeGlzKVswXTtcclxuICAgICAgICBjb25zdCBtYXhZID0gdGhpcy5zdXBwb3J0KHlBeGlzKVsxXTtcclxuICAgICAgICBjb25zdCBtYXhaID0gdGhpcy5zdXBwb3J0KHpBeGlzKVsyXTtcclxuICAgICAgICBjb25zdCBtaW5YID0gdGhpcy5zdXBwb3J0KHhBeGlzTmVnYXRpdmUpWzBdO1xyXG4gICAgICAgIGNvbnN0IG1pblkgPSB0aGlzLnN1cHBvcnQoeUF4aXNOZWdhdGl2ZSlbMV07XHJcbiAgICAgICAgY29uc3QgbWluWiA9IHRoaXMuc3VwcG9ydCh6QXhpc05lZ2F0aXZlKVsyXTtcclxuICAgICAgICByZXR1cm4gbmV3IEFBQkIoW21pblgsIG1pblksIG1pblpdLCBbbWF4WCwgbWF4WSwgbWF4Wl0pO1xyXG4gICAgfVxyXG4gICAgc3VwcG9ydChkaXIpIHtcclxuICAgICAgICBjb25zdCBfZGlyID0gbTMudHJhbnNmb3JtUG9pbnQodGhpcy5SbWF0cml4SW52ZXJzZSwgZGlyKTtcclxuICAgICAgICBjb25zdCByZXMgPSBbMCwgMCwgMF07XHJcbiAgICAgICAgcmVzWzBdID0gX2RpclswXSA+IDAgPyB0aGlzLm1heFswXSA6IHRoaXMubWluWzBdO1xyXG4gICAgICAgIHJlc1sxXSA9IF9kaXJbMV0gPiAwID8gdGhpcy5tYXhbMV0gOiB0aGlzLm1pblsxXTtcclxuICAgICAgICByZXNbMl0gPSBfZGlyWzJdID4gMCA/IHRoaXMubWF4WzJdIDogdGhpcy5taW5bMl07XHJcbiAgICAgICAgY29uc3Qgc3VwID0gbTMudHJhbnNmb3JtUG9pbnQodGhpcy5SbWF0cml4LCByZXMpO1xyXG4gICAgICAgIHJldHVybiB2My5zdW0oc3VwLCB0aGlzLnBvcyk7XHJcbiAgICB9XHJcbiAgICBnZXRJbnZlcnNlSW5lcnRpYVRlbnNvcihtYXNzKSB7XHJcbiAgICAgICAgY29uc3QgaTEgPSAobWFzcyAvIDEyKSAqICh0aGlzLm1heFsxXSAqIHRoaXMubWF4WzFdICsgdGhpcy5tYXhbMl0gKiB0aGlzLm1heFsyXSk7XHJcbiAgICAgICAgY29uc3QgaTIgPSAobWFzcyAvIDEyKSAqICh0aGlzLm1heFswXSAqIHRoaXMubWF4WzBdICsgdGhpcy5tYXhbMl0gKiB0aGlzLm1heFsyXSk7XHJcbiAgICAgICAgY29uc3QgaTMgPSAobWFzcyAvIDEyKSAqICh0aGlzLm1heFswXSAqIHRoaXMubWF4WzBdICsgdGhpcy5tYXhbMV0gKiB0aGlzLm1heFsxXSk7XHJcbiAgICAgICAgY29uc3QgbSA9IG0zLm11bHRpcGx5KG0zLm11bHRpcGx5KHRoaXMuUm1hdHJpeEludmVyc2UsIFtcclxuICAgICAgICAgICAgMSAvIGkxLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAxIC8gaTIsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDEgLyBpMyxcclxuICAgICAgICBdKSwgdGhpcy5SbWF0cml4KTtcclxuICAgICAgICByZXR1cm4gbTtcclxuICAgIH1cclxuICAgIGdldE00KCkge1xyXG4gICAgICAgIGNvbnN0IG0gPSBtNC5tM1RvbTQodGhpcy5SbWF0cml4KTtcclxuICAgICAgICBtWzEyXSA9IHRoaXMucG9zWzBdO1xyXG4gICAgICAgIG1bMTNdID0gdGhpcy5wb3NbMV07XHJcbiAgICAgICAgbVsxNF0gPSB0aGlzLnBvc1syXTtcclxuICAgICAgICBtWzE1XSA9IDE7XHJcbiAgICAgICAgY29uc3Qgc2NhbGUgPSB2My5kaWZmKHRoaXMubWF4LCB0aGlzLm1pbik7XHJcbiAgICAgICAgcmV0dXJuIG00LnNjYWxlKG0sIC4uLnNjYWxlKTtcclxuICAgIH1cclxuICAgIGdldENsb3Nlc3RGYWNlQnlOb3JtYWwobm9ybWFsKSB7XHJcbiAgICAgICAgY29uc3QgeyBSbWF0cml4IH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IGdsb2JhbE5vcm1hbHMgPSBCb3gubm9ybWFscy5tYXAoKG4pID0+IG0zLnRyYW5zZm9ybVBvaW50KFJtYXRyaXgsIG4pKTtcclxuICAgICAgICBsZXQgbWluRG90ID0gdjMuZG90KG5vcm1hbCwgZ2xvYmFsTm9ybWFsc1swXSk7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMSwgbiA9IGdsb2JhbE5vcm1hbHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vY29uc3QgX25vcm1hbCA9IG0zLnRyYW5zZm9ybVBvaW50KFJtYXRyaXgsIG5vcm1hbHNbaV0pXHJcbiAgICAgICAgICAgIGNvbnN0IF9kb3QgPSB2My5kb3QoZ2xvYmFsTm9ybWFsc1tpXSwgbm9ybWFsKTtcclxuICAgICAgICAgICAgaWYgKF9kb3QgPCBtaW5Eb3QpIHtcclxuICAgICAgICAgICAgICAgIG1pbkRvdCA9IF9kb3Q7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZmFjZUluZGljZXMgPSBCb3guaW5kaWNlc1tpbmRleF07XHJcbiAgICAgICAgY29uc3QgbSA9IHRoaXMuZ2V0TTQoKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2ZXJ0aWNlczogZmFjZUluZGljZXMubWFwKChpKSA9PiBtNC50cmFuc2Zvcm1Qb2ludChtLCBCb3gucG9pbnRzW2ldKSksXHJcbiAgICAgICAgICAgIG5vcm1hbDogZ2xvYmFsTm9ybWFsc1tpbmRleF0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5Cb3gucG9pbnRzID0gW1xyXG4gICAgWy0xIC8gMiwgLTEgLyAyLCAtMSAvIDJdLFxyXG4gICAgWzEgLyAyLCAtMSAvIDIsIC0xIC8gMl0sXHJcbiAgICBbMSAvIDIsIC0xIC8gMiwgMSAvIDJdLFxyXG4gICAgWy0xIC8gMiwgLTEgLyAyLCAxIC8gMl0sXHJcbiAgICBbLTEgLyAyLCAxIC8gMiwgLTEgLyAyXSxcclxuICAgIFsxIC8gMiwgMSAvIDIsIC0xIC8gMl0sXHJcbiAgICBbMSAvIDIsIDEgLyAyLCAxIC8gMl0sXHJcbiAgICBbLTEgLyAyLCAxIC8gMiwgMSAvIDJdLFxyXG5dO1xyXG5Cb3guaW5kaWNlcyA9IFtcclxuICAgIFswLCA0LCA1LCAxXSxcclxuICAgIFszLCA3LCA2LCAyXSxcclxuICAgIFswLCAxLCAyLCAzXSxcclxuICAgIFs0LCA1LCA2LCA3XSxcclxuICAgIFswLCAzLCA3LCA0XSxcclxuICAgIFsxLCAyLCA2LCA1XSwgLy8gK3hcclxuXTtcclxuQm94Lm5vcm1hbHMgPSBbXHJcbiAgICBbMCwgMCwgLTFdLFxyXG4gICAgWzAsIDAsIDFdLFxyXG4gICAgWzAsIC0xLCAwXSxcclxuICAgIFswLCAxLCAwXSxcclxuICAgIFstMSwgMCwgMF0sXHJcbiAgICBbMSwgMCwgMF0sXHJcbl07XHJcbmNsYXNzIFNwaGVyZSBleHRlbmRzIENvbGxpZGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHJhZGl1cyA9IDEpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMucmFkaXVzID0gcmFkaXVzO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IFwic3BoZXJlXCI7XHJcbiAgICB9XHJcbiAgICBnZXRBQUJCKCkge1xyXG4gICAgICAgIGNvbnN0IHsgcmFkaXVzIH0gPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBuZXcgQUFCQih2My5zdW0odGhpcy5wb3MsIFstcmFkaXVzLCAtcmFkaXVzLCAtcmFkaXVzXSksIHYzLnN1bSh0aGlzLnBvcywgW3JhZGl1cywgcmFkaXVzLCByYWRpdXNdKSk7XHJcbiAgICB9XHJcbiAgICBzdXBwb3J0KGRpcikge1xyXG4gICAgICAgIHJldHVybiB2My5zdW0odjMuc2NhbGUodjMubm9ybWFsaXplKGRpciksIHRoaXMucmFkaXVzKSwgdGhpcy5wb3MpO1xyXG4gICAgfVxyXG4gICAgZ2V0TTQoKSB7XHJcbiAgICAgICAgY29uc3QgbSA9IG00Lm0zVG9tNCh0aGlzLlJtYXRyaXgpO1xyXG4gICAgICAgIG1bMTJdID0gdGhpcy5wb3NbMF07XHJcbiAgICAgICAgbVsxM10gPSB0aGlzLnBvc1sxXTtcclxuICAgICAgICBtWzE0XSA9IHRoaXMucG9zWzJdO1xyXG4gICAgICAgIG1bMTVdID0gMTtcclxuICAgICAgICBjb25zdCB7IHJhZGl1cyB9ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gbTQuc2NhbGUobSwgcmFkaXVzLCByYWRpdXMsIHJhZGl1cyk7XHJcbiAgICB9XHJcbiAgICBnZXRDbG9zZXN0RmFjZUJ5Tm9ybWFsKG5vcm1hbCkge1xyXG4gICAgICAgIGNvbnN0IHJldmVyc2UgPSB2My5zY2FsZShub3JtYWwsIC0xKTtcclxuICAgICAgICByZXR1cm4geyB2ZXJ0aWNlczogW3YzLnNjYWxlKHJldmVyc2UsIHRoaXMucmFkaXVzKV0sIG5vcm1hbDogcmV2ZXJzZSB9O1xyXG4gICAgfVxyXG4gICAgZ2V0SW52ZXJzZUluZXJ0aWFUZW5zb3IobWFzcykge1xyXG4gICAgICAgIGNvbnN0IHsgcmFkaXVzIH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IG0gPSBbXHJcbiAgICAgICAgICAgICgyICogbWFzcyAqIHJhZGl1cyAqIHJhZGl1cykgLyA1LFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAoMiAqIG1hc3MgKiByYWRpdXMgKiByYWRpdXMpIC8gNSxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgKDIgKiBtYXNzICogcmFkaXVzICogcmFkaXVzKSAvIDUsXHJcbiAgICAgICAgXTtcclxuICAgICAgICByZXR1cm4gbTtcclxuICAgIH1cclxufVxyXG5jbGFzcyBDeWxpbmRlciBleHRlbmRzIENvbGxpZGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHJhZGl1cywgaGVpZ2h0LCBudW1TZWdtZW50cyA9IDYpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMucmFkaXVzID0gcmFkaXVzO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIGNvbnN0IHNlZ21lbnRBbmdsZSA9ICgyICogTWF0aC5QSSkgLyBudW1TZWdtZW50cztcclxuICAgICAgICB0aGlzLmNpcmNsZVBvaW50cyA9IFsuLi5uZXcgQXJyYXkobnVtU2VnbWVudHMpXS5tYXAoKF8sIGkpID0+IFtcclxuICAgICAgICAgICAgTWF0aC5jb3MoaSAqIHNlZ21lbnRBbmdsZSksXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIE1hdGguc2luKGkgKiBzZWdtZW50QW5nbGUpLFxyXG4gICAgICAgIF0pO1xyXG4gICAgfVxyXG4gICAgc3VwcG9ydChkaXIpIHtcclxuICAgICAgICBjb25zdCBfZGlyID0gbTMudHJhbnNmb3JtUG9pbnQodGhpcy5SbWF0cml4SW52ZXJzZSwgZGlyKTtcclxuICAgICAgICBjb25zdCBkaXJfeHogPSBbX2RpclswXSwgMCwgX2RpclsyXV07XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdjMuc2NhbGUodjMubm9ybWFsaXplKGRpcl94eiksIHRoaXMucmFkaXVzKTtcclxuICAgICAgICByZXN1bHRbMV0gPSBfZGlyWzFdID4gMCA/IHRoaXMuaGVpZ2h0IC8gMiA6IC10aGlzLmhlaWdodCAvIDI7XHJcbiAgICAgICAgcmV0dXJuIHYzLnN1bShtMy50cmFuc2Zvcm1Qb2ludCh0aGlzLlJtYXRyaXgsIHJlc3VsdCksIHRoaXMucG9zKTtcclxuICAgIH1cclxuICAgIGdldE00KCkge1xyXG4gICAgICAgIGNvbnN0IG0gPSBtNC5tM1RvbTQodGhpcy5SbWF0cml4KTtcclxuICAgICAgICBtWzEyXSA9IHRoaXMucG9zWzBdO1xyXG4gICAgICAgIG1bMTNdID0gdGhpcy5wb3NbMV07XHJcbiAgICAgICAgbVsxNF0gPSB0aGlzLnBvc1syXTtcclxuICAgICAgICBtWzE1XSA9IDE7XHJcbiAgICAgICAgY29uc3QgeyByYWRpdXMsIGhlaWdodCB9ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gbTQuc2NhbGUobSwgcmFkaXVzLCBoZWlnaHQsIHJhZGl1cyk7XHJcbiAgICB9XHJcbiAgICBnZXRDbG9zZXN0RmFjZUJ5Tm9ybWFsKG5vcm1hbCkge1xyXG4gICAgICAgIGNvbnN0IHsgUm1hdHJpeCwgUm1hdHJpeEludmVyc2UgfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgX25vcm1hbCA9IG0zLnRyYW5zZm9ybVBvaW50KFJtYXRyaXhJbnZlcnNlLCB2My5zY2FsZShub3JtYWwsIC0xKSk7XHJcbiAgICAgICAgY29uc3QgbSA9IHRoaXMuZ2V0TTQoKTtcclxuICAgICAgICBjb25zdCBjb3MgPSB2My5kb3QoX25vcm1hbCwgWzAsIDEsIDBdKTtcclxuICAgICAgICBjb25zdCBzaWduID0gTWF0aC5zaWduKGNvcyk7XHJcbiAgICAgICAgaWYgKGNvcyAqIHNpZ24gPCAwLjcwNykge1xyXG4gICAgICAgICAgICBjb25zdCBsb2NhbE5vcm1hbCA9IHYzLm5vcm1hbGl6ZShbX25vcm1hbFswXSwgMCwgX25vcm1hbFsyXV0pO1xyXG4gICAgICAgICAgICBjb25zdCB2ZXJ0aWNlcyA9IFtcclxuICAgICAgICAgICAgICAgIG00LnRyYW5zZm9ybVBvaW50KG0sIFtfbm9ybWFsWzBdLCAwLjUsIF9ub3JtYWxbMl1dKSxcclxuICAgICAgICAgICAgICAgIG00LnRyYW5zZm9ybVBvaW50KG0sIFtfbm9ybWFsWzBdLCAtMC41LCBfbm9ybWFsWzJdXSksXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZlcnRpY2VzLCBub3JtYWw6IG0zLnRyYW5zZm9ybVBvaW50KFJtYXRyaXgsIGxvY2FsTm9ybWFsKSB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBsb2NhbE5vcm1hbCA9IHYzLnNjYWxlKFswLCAxLCAwXSwgc2lnbik7XHJcbiAgICAgICAgY29uc3QgdmVydGljZXMgPSB0aGlzLmNpcmNsZVBvaW50cy5tYXAoKHApID0+IG00LnRyYW5zZm9ybVBvaW50KG0sIFtwWzBdLCBzaWduICogMC41LCBwWzJdXSkpO1xyXG4gICAgICAgIHJldHVybiB7IHZlcnRpY2VzLCBub3JtYWw6IG0zLnRyYW5zZm9ybVBvaW50KFJtYXRyaXgsIGxvY2FsTm9ybWFsKSB9O1xyXG4gICAgfVxyXG4gICAgZ2V0SW52ZXJzZUluZXJ0aWFUZW5zb3IobWFzcykge1xyXG4gICAgICAgIGNvbnN0IHsgcmFkaXVzLCBoZWlnaHQgfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgaTEgPSAobWFzcyAvIDEyKSAqICgzICogcmFkaXVzICogcmFkaXVzICsgaGVpZ2h0ICogaGVpZ2h0KTtcclxuICAgICAgICBjb25zdCBpMyA9IChtYXNzIC8gMikgKiByYWRpdXMgKiByYWRpdXM7XHJcbiAgICAgICAgY29uc3QgbSA9IG0zLm11bHRpcGx5KG0zLm11bHRpcGx5KHRoaXMuUm1hdHJpeCwgWzEgLyBpMSwgMCwgMCwgMCwgMSAvIGkxLCAwLCAwLCAwLCAxIC8gaTNdKSwgdGhpcy5SbWF0cml4SW52ZXJzZSk7XHJcbiAgICAgICAgcmV0dXJuIG07XHJcbiAgICB9XHJcbiAgICBnZXRBQUJCKCkge1xyXG4gICAgICAgIGNvbnN0IHsgcmFkaXVzLCBoZWlnaHQgfSA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBBQUJCKHYzLnN1bSh0aGlzLnBvcywgWy1yYWRpdXMsIC1oZWlnaHQsIC1yYWRpdXNdKSwgdjMuc3VtKHRoaXMucG9zLCBbcmFkaXVzLCBoZWlnaHQsIHJhZGl1c10pKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgeyBCb3gsIFNwaGVyZSwgQ3lsaW5kZXIgfTtcclxuIiwiaW1wb3J0IHsgdjMsIG0zIH0gZnJvbSBcInJvbWFucHBwbWF0aFwiO1xyXG5pbXBvcnQgeyBDb25zdHJhaW50RXF1YXRpb24sIENvbnRhY3RFcXVhdGlvbiwgRnJpY3Rpb25FcXVhdGlvbiwgfSBmcm9tIFwiLi9FcXVhdGlvbnNcIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi9jb25maWdcIjtcclxuY29uc3QgeyBDT05UQUNUX1RSRVNIT0xELCBDT05UQUNUX0JJQVMgfSA9IGNvbmZpZztcclxuZXhwb3J0IGNsYXNzIENvbnN0cmFpbnQge1xyXG4gICAgY29uc3RydWN0b3IoYm9keTEsIGJvZHkyLCByYUxvY2FsLCByYkxvY2FsLCBvcHQpIHtcclxuICAgICAgICB0aGlzLmJvZHkxID0gYm9keTE7XHJcbiAgICAgICAgdGhpcy5ib2R5MiA9IGJvZHkyO1xyXG4gICAgICAgIHRoaXMucmFMb2NhbCA9IHJhTG9jYWw7XHJcbiAgICAgICAgdGhpcy5yYkxvY2FsID0gcmJMb2NhbDtcclxuICAgICAgICB0aGlzLmJpYXNGYWN0b3IgPSBvcHQuYmlhc0ZhY3RvciB8fCAwLjEyNTtcclxuICAgICAgICB0aGlzLnRyZXNob2xkID0gb3B0LnRyZXNob2xkIHx8IDAuMDAwMDA1O1xyXG4gICAgICAgIHRoaXMubGFtYmRhTWluID0gb3B0LmxhbWJkYU1pbiB8fCAtOTk5OTk5OTk7XHJcbiAgICAgICAgdGhpcy5sYW1iZGFNYXggPSBvcHQubGFtYmRhTWF4IHx8IDk5OTk5OTk5O1xyXG4gICAgICAgIHRoaXMucHJldkxhbWJkYSA9IDA7XHJcbiAgICAgICAgY29uc3QgY29sbGlkZXIxID0gdGhpcy5ib2R5MS5nZXRDb2xsaWRlcigpO1xyXG4gICAgICAgIGNvbnN0IGNvbGxpZGVyMiA9IHRoaXMuYm9keTIuZ2V0Q29sbGlkZXIoKTtcclxuICAgICAgICB0aGlzLnJhID0gbTMudHJhbnNmb3JtUG9pbnQoY29sbGlkZXIxLmdldFJtYXRyaXgoKSwgdGhpcy5yYUxvY2FsKTtcclxuICAgICAgICB0aGlzLnJiID0gbTMudHJhbnNmb3JtUG9pbnQoY29sbGlkZXIyLmdldFJtYXRyaXgoKSwgdGhpcy5yYkxvY2FsKTtcclxuICAgICAgICB0aGlzLlBBID0gdjMuc3VtKGNvbGxpZGVyMS5nZXRUcmFuc2xhdGlvbigpLCB0aGlzLnJhKTtcclxuICAgICAgICB0aGlzLlBCID0gdjMuc3VtKGNvbGxpZGVyMi5nZXRUcmFuc2xhdGlvbigpLCB0aGlzLnJiKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICBjb25zdCBjb2xsaWRlcjEgPSB0aGlzLmJvZHkxLmdldENvbGxpZGVyKCk7XHJcbiAgICAgICAgY29uc3QgY29sbGlkZXIyID0gdGhpcy5ib2R5Mi5nZXRDb2xsaWRlcigpO1xyXG4gICAgICAgIHRoaXMucmEgPSBtMy50cmFuc2Zvcm1Qb2ludChjb2xsaWRlcjEuZ2V0Um1hdHJpeCgpLCB0aGlzLnJhTG9jYWwpO1xyXG4gICAgICAgIHRoaXMucmIgPSBtMy50cmFuc2Zvcm1Qb2ludChjb2xsaWRlcjIuZ2V0Um1hdHJpeCgpLCB0aGlzLnJiTG9jYWwpO1xyXG4gICAgICAgIGNvbnN0IFBBID0gdjMuc3VtKGNvbGxpZGVyMS5nZXRUcmFuc2xhdGlvbigpLCB0aGlzLnJhKTtcclxuICAgICAgICBjb25zdCBQQiA9IHYzLnN1bShjb2xsaWRlcjIuZ2V0VHJhbnNsYXRpb24oKSwgdGhpcy5yYik7XHJcbiAgICAgICAgY29uc3QgZGVsdGFQQSA9IHYzLmRpZmYoUEEsIHRoaXMuUEEpO1xyXG4gICAgICAgIGNvbnN0IGRlbHRhUEIgPSB2My5kaWZmKFBCLCB0aGlzLlBCKTtcclxuICAgICAgICB0aGlzLlBBID0gUEE7XHJcbiAgICAgICAgdGhpcy5QQiA9IFBCO1xyXG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHYzLmRpZmYoUEEsIFBCKTtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uRXJyb3IgPSB2My5ub3JtKHYzLnN1bShbMC4wMDEsIDAuMDAxLCAwLjAwMV0sIGRpcmVjdGlvbikpO1xyXG4gICAgICAgIHRoaXMubiA9IHYzLnNjYWxlKGRpcmVjdGlvbiwgMSAvIHRoaXMucG9zaXRpb25FcnJvcik7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGVsdGFQQSxcclxuICAgICAgICAgICAgZGVsdGFQQixcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgZ2V0RXF1YXRpb24oKSB7XHJcbiAgICAgICAgY29uc3QgZXF1YXRpb24gPSBuZXcgQ29uc3RyYWludEVxdWF0aW9uKHRoaXMpO1xyXG4gICAgICAgIGVxdWF0aW9uLmxhbWJkYU1heCA9IHRoaXMubGFtYmRhTWF4O1xyXG4gICAgICAgIGVxdWF0aW9uLmxhbWJkYU1pbiA9IHRoaXMubGFtYmRhTWluO1xyXG4gICAgICAgIHJldHVybiBlcXVhdGlvbjtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgQ29udGFjdENvbnN0cmFpbnQge1xyXG4gICAgY29uc3RydWN0b3IoYm9keTEsIGJvZHkyLCByYUxvY2FsLCByYkxvY2FsLCByYSwgcmIsIFBBLCBQQiwgbiwgcG9zaXRpb25FcnJvciwgaSwgaikge1xyXG4gICAgICAgIHRoaXMuYm9keTEgPSBib2R5MTtcclxuICAgICAgICB0aGlzLmJvZHkyID0gYm9keTI7XHJcbiAgICAgICAgdGhpcy5yYUxvY2FsID0gcmFMb2NhbDtcclxuICAgICAgICB0aGlzLnJiTG9jYWwgPSByYkxvY2FsO1xyXG4gICAgICAgIHRoaXMucmEgPSByYTtcclxuICAgICAgICB0aGlzLnJiID0gcmI7XHJcbiAgICAgICAgdGhpcy5QQSA9IFBBO1xyXG4gICAgICAgIHRoaXMuUEIgPSBQQjtcclxuICAgICAgICB0aGlzLm4gPSBuO1xyXG4gICAgICAgIHRoaXMucG9zaXRpb25FcnJvciA9IHBvc2l0aW9uRXJyb3I7XHJcbiAgICAgICAgdGhpcy5pID0gaTtcclxuICAgICAgICB0aGlzLmogPSBqO1xyXG4gICAgICAgIHRoaXMuYmlhc0ZhY3RvciA9IGNvbmZpZy5DT05UQUNUX0JJQVM7XHJcbiAgICAgICAgdGhpcy50cmVzaG9sZCA9IGNvbmZpZy5DT05UQUNUX1RSRVNIT0xEO1xyXG4gICAgICAgIHRoaXMubGFtYmRhTWluID0gQ29udGFjdENvbnN0cmFpbnQub3B0LmxhbWJkYU1pbjtcclxuICAgICAgICB0aGlzLmxhbWJkYU1heCA9IENvbnRhY3RDb25zdHJhaW50Lm9wdC5sYW1iZGFNYXg7XHJcbiAgICAgICAgdGhpcy5wcmV2VGFuTGFtYmRhcyA9IFswLCAwXTtcclxuICAgICAgICB0aGlzLnByZXZMYW1iZGEgPSAwO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIGNvbnN0IGNvbGxpZGVyMSA9IHRoaXMuYm9keTEuZ2V0Q29sbGlkZXIoKTtcclxuICAgICAgICBjb25zdCBjb2xsaWRlcjIgPSB0aGlzLmJvZHkyLmdldENvbGxpZGVyKCk7XHJcbiAgICAgICAgdGhpcy5yYSA9IG0zLnRyYW5zZm9ybVBvaW50KGNvbGxpZGVyMS5nZXRSbWF0cml4KCksIHRoaXMucmFMb2NhbCk7XHJcbiAgICAgICAgdGhpcy5yYiA9IG0zLnRyYW5zZm9ybVBvaW50KGNvbGxpZGVyMi5nZXRSbWF0cml4KCksIHRoaXMucmJMb2NhbCk7XHJcbiAgICAgICAgY29uc3QgUEEgPSB2My5zdW0oY29sbGlkZXIxLmdldFRyYW5zbGF0aW9uKCksIHRoaXMucmEpO1xyXG4gICAgICAgIGNvbnN0IFBCID0gdjMuc3VtKGNvbGxpZGVyMi5nZXRUcmFuc2xhdGlvbigpLCB0aGlzLnJiKTtcclxuICAgICAgICBjb25zdCBkZWx0YVBBID0gdjMuZGlmZihQQSwgdGhpcy5QQSk7XHJcbiAgICAgICAgY29uc3QgZGVsdGFQQiA9IHYzLmRpZmYoUEIsIHRoaXMuUEIpO1xyXG4gICAgICAgIHRoaXMuUEEgPSBQQTtcclxuICAgICAgICB0aGlzLlBCID0gUEI7XHJcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gdjMuZGlmZihQQSwgUEIpO1xyXG4gICAgICAgIHRoaXMucG9zaXRpb25FcnJvciA9IHYzLmRvdCh0aGlzLm4sIGRpcmVjdGlvbik7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGVsdGFQQSxcclxuICAgICAgICAgICAgZGVsdGFQQixcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgZ2V0RXF1YXRpb24oKSB7XHJcbiAgICAgICAgY29uc3QgbGFtYmRhTWF4ID0gTWF0aC5tYXgoMSwgdjMubm9ybSh2My5zdW0odjMuc2NhbGUodGhpcy5ib2R5MS5nZXRWZWxvY2l0eSgpLCB0aGlzLmJvZHkxLmdldE1hc3MoKSksIHYzLnNjYWxlKHRoaXMuYm9keTIuZ2V0VmVsb2NpdHkoKSwgdGhpcy5ib2R5Mi5nZXRNYXNzKCkpKSkgKiAxMCk7XHJcbiAgICAgICAgY29uc3QgZXF1YXRpb24gPSBuZXcgQ29udGFjdEVxdWF0aW9uKHRoaXMpO1xyXG4gICAgICAgIGVxdWF0aW9uLmxhbWJkYU1heCA9IGxhbWJkYU1heDtcclxuICAgICAgICBlcXVhdGlvbi5sYW1iZGFNaW4gPSAwO1xyXG4gICAgICAgIHJldHVybiBlcXVhdGlvbjtcclxuICAgIH1cclxuICAgIGdldEZyaWN0aW9uRXF1YXRpb25zKCkge1xyXG4gICAgICAgIGNvbnN0IGVxMSA9IG5ldyBGcmljdGlvbkVxdWF0aW9uKHRoaXMsIDApO1xyXG4gICAgICAgIGNvbnN0IGVxMiA9IG5ldyBGcmljdGlvbkVxdWF0aW9uKHRoaXMsIDEpO1xyXG4gICAgICAgIGVxMS5sYW1iZGFNYXggPSBJbmZpbml0eTtcclxuICAgICAgICBlcTEubGFtYmRhTWluID0gLUluZmluaXR5O1xyXG4gICAgICAgIGVxMi5sYW1iZGFNYXggPSBJbmZpbml0eTtcclxuICAgICAgICBlcTIubGFtYmRhTWluID0gLUluZmluaXR5O1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIGVxMSwgZXEyXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxufVxyXG5Db250YWN0Q29uc3RyYWludC5vcHQgPSB7XHJcbiAgICBiaWFzRmFjdG9yOiAwLjEyNSxcclxuICAgIHRyZXNob2xkOiAwLjAwMDUsXHJcbiAgICBsYW1iZGFNaW46IDAsXHJcbiAgICBsYW1iZGFNYXg6IEluZmluaXR5LFxyXG59O1xyXG4iLCJpbXBvcnQgeyB2MyB9IGZyb20gXCJyb21hbnBwcG1hdGhcIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi9jb25maWdcIjtcclxuY29uc3QgeyBDT05UQUNUX01BTklGT0xEX0tFRVBfVFJFU0hPTEQgfSA9IGNvbmZpZztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGFjdE1hbmlmb2xkIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbnRhY3RzKSB7XHJcbiAgICAgICAgdGhpcy5jb250YWN0cyA9IGNvbnRhY3RzO1xyXG4gICAgICAgIHRoaXMua2VlcCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgY29uc3QgY29udGFjdHMgPSB0aGlzLmNvbnRhY3RzO1xyXG4gICAgICAgIGlmIChjb250YWN0cy5sZW5ndGggPCAzKSB7XHJcbiAgICAgICAgICAgIHRoaXMua2VlcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gY29udGFjdHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhY3QgPSBjb250YWN0c1tpXTtcclxuICAgICAgICAgICAgY29uc3QgeyBkZWx0YVBBLCBkZWx0YVBCIH0gPSBjb250YWN0LnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICBpZiAodjMubm9ybShkZWx0YVBBKSA+IENPTlRBQ1RfTUFOSUZPTERfS0VFUF9UUkVTSE9MRCB8fCB2My5ub3JtKGRlbHRhUEIpID4gQ09OVEFDVF9NQU5JRk9MRF9LRUVQX1RSRVNIT0xEKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmtlZXAgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCIuL0V2ZW50RW1pdHRlclwiO1xyXG5jb25zdCBkYXRhID0ge1xyXG4gICAgU09MVkVSX0VSUk9SOiAwLFxyXG4gICAgUlVOVElNRTogMCxcclxuICAgIEZQUzogMCxcclxufTtcclxuY2xhc3MgRGVidWcgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcclxuICAgICAgICBpZiAoIURlYnVnLmluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIERlYnVnLmluc3RhbmNlID0gbmV3IERlYnVnKCk7XHJcbiAgICAgICAgICAgIERlYnVnLmluc3RhbmNlLmRhdGEgPSB7fTtcclxuICAgICAgICAgICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgICAgICAgICAgRGVidWcuaW5zdGFuY2UuZGF0YVtgXyR7a2V5fWBdID0gZGF0YVtrZXldO1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KERlYnVnLmluc3RhbmNlLmRhdGEsIGtleSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGdldCgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbYF8ke2tleX1gXTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNldCh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2BfJHtrZXl9YF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRGVidWcuaW5zdGFuY2UuZW1pdChgdXBkYXRlYCwgeyBrZXk6IGBfJHtrZXl9YCwgdmFsdWUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gRGVidWcuaW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICBzb21lTWV0aG9kKCkgeyB9XHJcbn1cclxud2luZG93LkRlYnVnID0gRGVidWcuZ2V0SW5zdGFuY2UoKTtcclxuZXhwb3J0IGRlZmF1bHQgRGVidWcuZ2V0SW5zdGFuY2UoKTtcclxuIiwiaW1wb3J0IHsgdjMsIG0zIH0gZnJvbSBcInJvbWFucHBwbWF0aFwiO1xyXG5jb25zdCBjbGFtcCA9ICh2LCBtaW4sIG1heCkgPT4ge1xyXG4gICAgaWYgKHYgPiBtaW4pIHtcclxuICAgICAgICBpZiAodiA8IG1heClcclxuICAgICAgICAgICAgcmV0dXJuIHY7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gbWF4O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1pbjtcclxufTtcclxuY29uc3QgbnVsbFZlYyA9IFswLCAwLCAwXTtcclxuY2xhc3MgQ29uc3RyYWludEVxdWF0aW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbnN0cmFpbnQpIHtcclxuICAgICAgICB0aGlzLmNvbnN0cmFpbnQgPSBjb25zdHJhaW50O1xyXG4gICAgICAgIHRoaXMucHJldkxhbWJkYSA9IGNvbnN0cmFpbnQucHJldkxhbWJkYTtcclxuICAgIH1cclxuICAgIHVwZGF0ZUphY29iaWFuKCkge1xyXG4gICAgICAgIGNvbnN0IHsgYm9keTEsIGJvZHkyLCByYSwgcmIsIG4gfSA9IHRoaXMuY29uc3RyYWludDtcclxuICAgICAgICBpZiAoYm9keTEuaXNTdGF0aWMoKSkge1xyXG4gICAgICAgICAgICB0aGlzLkoxID0gbnVsbFZlYztcclxuICAgICAgICAgICAgdGhpcy5KMiA9IG51bGxWZWM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLkoxID0gdjMuc2NhbGUobiwgLTEpO1xyXG4gICAgICAgICAgICB0aGlzLkoyID0gdjMuY3Jvc3MobiwgcmEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYm9keTIuaXNTdGF0aWMoKSkge1xyXG4gICAgICAgICAgICB0aGlzLkozID0gbnVsbFZlYztcclxuICAgICAgICAgICAgdGhpcy5KNCA9IG51bGxWZWM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLkozID0gbjtcclxuICAgICAgICAgICAgdGhpcy5KNCA9IHYzLmNyb3NzKHJiLCBuKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyogIGNvbnN0IGRvZjEgPSBib2R5MS5kb2Y7XHJcbiAgICAgICAgY29uc3QgZG9mMiA9IGJvZHkyLmRvZjtcclxuICAgIFxyXG4gICAgICAgIHRoaXMuSlswXVswXSAqPSBkb2YxWzBdO1xyXG4gICAgICAgIHRoaXMuSlswXVsxXSAqPSBkb2YxWzFdO1xyXG4gICAgICAgIHRoaXMuSlswXVsyXSAqPSBkb2YxWzJdO1xyXG4gICAgXHJcbiAgICAgICAgdGhpcy5KWzFdWzBdICo9IGRvZjFbM107XHJcbiAgICAgICAgdGhpcy5KWzFdWzFdICo9IGRvZjFbNF07XHJcbiAgICAgICAgdGhpcy5KWzFdWzJdICo9IGRvZjFbNV07XHJcbiAgICBcclxuICAgICAgICB0aGlzLkpbMl1bMF0gKj0gZG9mMlswXTtcclxuICAgICAgICB0aGlzLkpbMl1bMV0gKj0gZG9mMlsxXTtcclxuICAgICAgICB0aGlzLkpbMl1bMl0gKj0gZG9mMlsyXTtcclxuICAgIFxyXG4gICAgICAgIHRoaXMuSlszXVswXSAqPSBkb2YyWzNdO1xyXG4gICAgICAgIHRoaXMuSlszXVsxXSAqPSBkb2YyWzRdO1xyXG4gICAgICAgIHRoaXMuSlszXVsyXSAqPSBkb2YyWzVdOyovXHJcbiAgICB9XHJcbiAgICB1cGRhdGVMZWZ0UGFydChkdCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlSmFjb2JpYW4oKTtcclxuICAgICAgICBjb25zdCB7IGJvZHkxLCBib2R5MiB9ID0gdGhpcy5jb25zdHJhaW50O1xyXG4gICAgICAgIGNvbnN0IEkxID0gYm9keTEuZ2V0SW52ZXJzZUluZXJ0aWFUZW5zb3IoKTtcclxuICAgICAgICBjb25zdCBJMiA9IGJvZHkyLmdldEludmVyc2VJbmVydGlhVGVuc29yKCk7XHJcbiAgICAgICAgbGV0IE0xID0gYm9keTEuZ2V0SW52ZXJzZU1hc3MoKTtcclxuICAgICAgICBsZXQgTTIgPSBib2R5Mi5nZXRJbnZlcnNlTWFzcygpO1xyXG4gICAgICAgIHRoaXMuSk0xID0gdjMuc2NhbGUodGhpcy5KMSwgTTEpO1xyXG4gICAgICAgIHRoaXMuSk0yID0gbTMudHJhbnNmb3JtUG9pbnQoSTEsIHRoaXMuSjIpO1xyXG4gICAgICAgIHRoaXMuSk0zID0gdjMuc2NhbGUodGhpcy5KMywgTTIpO1xyXG4gICAgICAgIHRoaXMuSk00ID0gbTMudHJhbnNmb3JtUG9pbnQoSTIsIHRoaXMuSjQpO1xyXG4gICAgICAgIC8vSk1KKiA9IEpCOyBCID0gTUoqIGFzIDIgdmVjNiwgX0ogPSBKYWNvYmlhbiBhcyAyIHZlYzZcclxuICAgICAgICB0aGlzLmVmZk1hc3MgPVxyXG4gICAgICAgICAgICB2My5kb3QodGhpcy5KMSwgdGhpcy5KTTEpICtcclxuICAgICAgICAgICAgICAgIHYzLmRvdCh0aGlzLkpNMiwgdGhpcy5KMikgK1xyXG4gICAgICAgICAgICAgICAgdjMuZG90KHRoaXMuSjMsIHRoaXMuSk0zKSArXHJcbiAgICAgICAgICAgICAgICB2My5kb3QodGhpcy5KTTQsIHRoaXMuSjQpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlUmlnaHRQYXJ0KGR0KSB7XHJcbiAgICAgICAgY29uc3QgeyBiaWFzRmFjdG9yLCB0cmVzaG9sZCwgYm9keTEsIGJvZHkyLCBuLCByYSwgcmIsIHBvc2l0aW9uRXJyb3IgfSA9IHRoaXMuY29uc3RyYWludDtcclxuICAgICAgICBjb25zdCByZWxhdGl2ZVZlbG9jaXR5ID0gdjMuZGlmZih2My5zdW0oYm9keTIuZ2V0VmVsb2NpdHkoKSwgdjMuY3Jvc3MoYm9keTIuZ2V0QW5ndWxhclZlbG9jaXR5KCksIHJiKSksIHYzLnN1bShib2R5MS5nZXRWZWxvY2l0eSgpLCB2My5jcm9zcyhib2R5MS5nZXRBbmd1bGFyVmVsb2NpdHkoKSwgcmEpKSk7XHJcbiAgICAgICAgY29uc3QgcmVsYXRpdmVWZWxvY2l0eU5vcm1hbFByb2plY3Rpb24gPSB2My5kb3QocmVsYXRpdmVWZWxvY2l0eSwgbik7XHJcbiAgICAgICAgdGhpcy5iaWFzID1cclxuICAgICAgICAgICAgKGJpYXNGYWN0b3IgKiBNYXRoLm1heChwb3NpdGlvbkVycm9yIC0gdHJlc2hvbGQsIDApKSAvIGR0IC1cclxuICAgICAgICAgICAgICAgIHJlbGF0aXZlVmVsb2NpdHlOb3JtYWxQcm9qZWN0aW9uO1xyXG4gICAgfVxyXG4gICAgYXBwbHlJbXB1bHNlKGxhbWJkYSkge1xyXG4gICAgICAgIHRoaXMuY29uc3RyYWludC5wcmV2TGFtYmRhID0gbGFtYmRhO1xyXG4gICAgICAgIHRoaXMuY29uc3RyYWludC5ib2R5MS5hcHBseUltcHVsc2UodjMuc2NhbGUodGhpcy5KMSwgbGFtYmRhKSwgdGhpcy5jb25zdHJhaW50LnJhKTtcclxuICAgICAgICB0aGlzLmNvbnN0cmFpbnQuYm9keTIuYXBwbHlJbXB1bHNlKHYzLnNjYWxlKHRoaXMuSjMsIGxhbWJkYSksIHRoaXMuY29uc3RyYWludC5yYik7XHJcbiAgICB9XHJcbiAgICBhcHBseVBzZXVkb0ltcHVsc2UobGFtYmRhKSB7XHJcbiAgICAgICAgdGhpcy5jb25zdHJhaW50LmJvZHkxLmFwcGx5UHNldWRvSW1wdWxzZSh2My5zY2FsZSh0aGlzLkoxLCBsYW1iZGEpLCB0aGlzLmNvbnN0cmFpbnQucmEpO1xyXG4gICAgICAgIHRoaXMuY29uc3RyYWludC5ib2R5Mi5hcHBseVBzZXVkb0ltcHVsc2UodjMuc2NhbGUodGhpcy5KMywgbGFtYmRhKSwgdGhpcy5jb25zdHJhaW50LnJiKTtcclxuICAgIH1cclxufVxyXG5Db25zdHJhaW50RXF1YXRpb24uYmlhc011bHRpcGxpZXIgPSAwLjU7XHJcbmNsYXNzIENvbnRhY3RFcXVhdGlvbiBleHRlbmRzIENvbnN0cmFpbnRFcXVhdGlvbiB7XHJcbiAgICB1cGRhdGVSaWdodFBhcnQoZHQpIHtcclxuICAgICAgICBjb25zdCB7IGJvZHkxLCBib2R5MiwgdHJlc2hvbGQsIGJpYXNGYWN0b3IsIHJhLCByYiwgbiwgcG9zaXRpb25FcnJvciB9ID0gdGhpcy5jb25zdHJhaW50O1xyXG4gICAgICAgIGNvbnN0IHJlbGF0aXZlVmVsb2NpdHkgPSB2My5kaWZmKHYzLnN1bShib2R5Mi5nZXRWZWxvY2l0eSgpLCB2My5jcm9zcyhib2R5Mi5nZXRBbmd1bGFyVmVsb2NpdHkoKSwgcmIpKSwgdjMuc3VtKGJvZHkxLmdldFZlbG9jaXR5KCksIHYzLmNyb3NzKGJvZHkxLmdldEFuZ3VsYXJWZWxvY2l0eSgpLCByYSkpKTtcclxuICAgICAgICBjb25zdCByZWxhdGl2ZVZlbG9jaXR5Tm9ybWFsUHJvamVjdGlvbiA9IHYzLmRvdChyZWxhdGl2ZVZlbG9jaXR5LCBuKTtcclxuICAgICAgICB0aGlzLmJpYXMgPVxyXG4gICAgICAgICAgICAoTWF0aC5tYXgoMCwgcG9zaXRpb25FcnJvciAtIHRyZXNob2xkKSAvIGR0KSAqIGJpYXNGYWN0b3IgLVxyXG4gICAgICAgICAgICAgICAgcmVsYXRpdmVWZWxvY2l0eU5vcm1hbFByb2plY3Rpb247XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgRnJpY3Rpb25FcXVhdGlvbiBleHRlbmRzIENvbnN0cmFpbnRFcXVhdGlvbiB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb25zdHJhaW50LCBkaXIpIHtcclxuICAgICAgICBzdXBlcihjb25zdHJhaW50KTtcclxuICAgICAgICB0aGlzLmRpciA9IGRpcjtcclxuICAgICAgICB0aGlzLnByZXZMYW1iZGEgPSB0aGlzLmNvbnN0cmFpbnQucHJldlRhbkxhbWJkYXNbZGlyXTtcclxuICAgICAgICB0aGlzLmxhbWJkYU1heCA9IHRoaXMuY29uc3RyYWludC5wcmV2TGFtYmRhICogKHRoaXMuY29uc3RyYWludC5ib2R5MS5nZXRGcmljdGlvbigpICsgdGhpcy5jb25zdHJhaW50LmJvZHkyLmdldEZyaWN0aW9uKCkpICogMTA7XHJcbiAgICAgICAgdGhpcy5sYW1iZGFNaW4gPSAtdGhpcy5sYW1iZGFNYXg7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVKYWNvYmlhbigpIHtcclxuICAgICAgICBjb25zdCB7IGJvZHkxLCBib2R5MiwgcmEsIHJiIH0gPSB0aGlzLmNvbnN0cmFpbnQ7XHJcbiAgICAgICAgY29uc3QgbiA9IHRoaXMuZGlyXHJcbiAgICAgICAgICAgID8gdGhpcy5jb25zdHJhaW50LmpcclxuICAgICAgICAgICAgOiB0aGlzLmNvbnN0cmFpbnQuaTtcclxuICAgICAgICBpZiAoYm9keTEuaXNTdGF0aWMoKSkge1xyXG4gICAgICAgICAgICB0aGlzLkoxID0gbnVsbFZlYztcclxuICAgICAgICAgICAgdGhpcy5KMiA9IG51bGxWZWM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLkoxID0gdjMuc2NhbGUobiwgLTEpO1xyXG4gICAgICAgICAgICB0aGlzLkoyID0gdjMuY3Jvc3MobiwgcmEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYm9keTIuaXNTdGF0aWMoKSkge1xyXG4gICAgICAgICAgICB0aGlzLkozID0gbnVsbFZlYztcclxuICAgICAgICAgICAgdGhpcy5KNCA9IG51bGxWZWM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLkozID0gbjtcclxuICAgICAgICAgICAgdGhpcy5KNCA9IHYzLmNyb3NzKHJiLCBuKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB1cGRhdGVSaWdodFBhcnQoKSB7XHJcbiAgICAgICAgY29uc3QgeyBib2R5MSwgYm9keTIsIHJhLCByYiB9ID0gdGhpcy5jb25zdHJhaW50O1xyXG4gICAgICAgIGNvbnN0IG4gPSB0aGlzLmRpclxyXG4gICAgICAgICAgICA/IHRoaXMuY29uc3RyYWludC5qXHJcbiAgICAgICAgICAgIDogdGhpcy5jb25zdHJhaW50Lmk7XHJcbiAgICAgICAgY29uc3QgcmVsYXRpdmVWZWxvY2l0eSA9IHYzLmRpZmYodjMuc3VtKGJvZHkyLmdldFZlbG9jaXR5KCksIHYzLmNyb3NzKGJvZHkyLmdldEFuZ3VsYXJWZWxvY2l0eSgpLCByYikpLCB2My5zdW0oYm9keTEuZ2V0VmVsb2NpdHkoKSwgdjMuY3Jvc3MoYm9keTEuZ2V0QW5ndWxhclZlbG9jaXR5KCksIHJhKSkpO1xyXG4gICAgICAgIGxldCByZWxhdGl2ZVZlbG9jaXR5Tm9ybWFsUHJvamVjdGlvbiA9IHYzLmRvdChyZWxhdGl2ZVZlbG9jaXR5LCBuKTtcclxuICAgICAgICAvL2lmKE1hdGguYWJzKHJlbGF0aXZlVmVsb2NpdHlOb3JtYWxQcm9qZWN0aW9uKSA8IDAuMDAwMDAxKSByZWxhdGl2ZVZlbG9jaXR5Tm9ybWFsUHJvamVjdGlvbiA9IDBcclxuICAgICAgICB0aGlzLmJpYXMgPSAtKHJlbGF0aXZlVmVsb2NpdHlOb3JtYWxQcm9qZWN0aW9uKTtcclxuICAgIH1cclxuICAgIGFwcGx5SW1wdWxzZShsYW1iZGEpIHtcclxuICAgICAgICB0aGlzLmNvbnN0cmFpbnQucHJldlRhbkxhbWJkYXNbdGhpcy5kaXJdID0gbGFtYmRhO1xyXG4gICAgICAgIHRoaXMuY29uc3RyYWludC5ib2R5MS5hcHBseUltcHVsc2UodjMuc2NhbGUodGhpcy5KMSwgbGFtYmRhKSwgdGhpcy5jb25zdHJhaW50LnJhKTtcclxuICAgICAgICB0aGlzLmNvbnN0cmFpbnQuYm9keTIuYXBwbHlJbXB1bHNlKHYzLnNjYWxlKHRoaXMuSjMsIGxhbWJkYSksIHRoaXMuY29uc3RyYWludC5yYik7XHJcbiAgICB9XHJcbn1cclxuLypcclxuY2xhc3MgUG9zaXRpb25Db25zdHJhaW50IGV4dGVuZHMgQ29uc3RyYWludCB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBib2R5MSxcclxuICAgIGJvZHkyLFxyXG4gICAgbixcclxuICAgIHJhLFxyXG4gICAgcmIsXHJcbiAgICByYUxvY2FsLFxyXG4gICAgcmJMb2NhbCxcclxuICAgIGJpYXNGYWN0b3IsXHJcbiAgICB0cmVzaG9sZCxcclxuICAgIHBlbkRlcHRoXHJcbiAgKSB7XHJcbiAgICBzdXBlcihcclxuICAgICAgYm9keTEsXHJcbiAgICAgIGJvZHkyLFxyXG4gICAgICBuLFxyXG4gICAgICByYSxcclxuICAgICAgcmIsXHJcbiAgICAgIHJhTG9jYWwsXHJcbiAgICAgIHJiTG9jYWwsXHJcbiAgICAgIGJpYXNGYWN0b3IsXHJcbiAgICAgIG51bGwsXHJcbiAgICAgIG51bGwsXHJcbiAgICAgIHRyZXNob2xkXHJcbiAgICApO1xyXG4gICAgdGhpcy5wZW5EZXB0aCA9IHBlbkRlcHRoO1xyXG4gIH1cclxuICBhcHBseVJlc29sdmluZ0ltcHVsc2UobGFtYmRhKSB7XHJcbiAgICB0aGlzLmJvZHkxLmFwcGx5UHNldWRvSW1wdWxzZSh2My5zY2FsZSh0aGlzLkpbMF0sIGxhbWJkYSksIHRoaXMucmEpO1xyXG4gICAgdGhpcy5ib2R5Mi5hcHBseVBzZXVkb0ltcHVsc2UodjMuc2NhbGUodGhpcy5KWzJdLCBsYW1iZGEpLCB0aGlzLnJiKTtcclxuICB9XHJcbiAgdXBkYXRlUmlnaHRQYXJ0KGRlbHRhVGltZSkge1xyXG4gICAgY29uc3QgeyBib2R5MSwgYm9keTIsIHJhLCByYiwgbiwgcGVuRGVwdGgsIHRyZXNob2xkLCBiaWFzRmFjdG9yIH0gPSB0aGlzO1xyXG5cclxuICAgIHRoaXMuYmlhcyA9IChNYXRoLm1heCgwLCBwZW5EZXB0aCAtIHRyZXNob2xkKSAvIGRlbHRhVGltZSkgKiBiaWFzRmFjdG9yO1xyXG4gIH1cclxufVxyXG5jbGFzcyBSb3RhdGlvbmFsQ29uc3RyYWludCBleHRlbmRzIENvbnN0cmFpbnQge1xyXG4gIGNvbnN0cnVjdG9yKGJvZHkxLCBib2R5MiwgcmFMb2NhbCwgcmJMb2NhbCkge1xyXG4gICAgc3VwZXIoYm9keTEsIGJvZHkyLCBudWxsLCBudWxsLCBudWxsLCByYUxvY2FsLCByYkxvY2FsKTtcclxuICB9XHJcbiAgdXBkYXRlTGVmdFBhcnQoZGVsdGFUaW1lKSB7XHJcbiAgICBjb25zdCB7IGJvZHkxLCBib2R5MiwgcmFMb2NhbCwgcmJMb2NhbCB9ID0gdGhpcztcclxuICAgIHRoaXMuUEEgPSBib2R5MS5jb2xsaWRlci5sb2NhbFRvR2xvYmFsKHJhTG9jYWwpO1xyXG4gICAgdGhpcy5QQiA9IGJvZHkyLmNvbGxpZGVyLmxvY2FsVG9HbG9iYWwocmJMb2NhbCk7XHJcbiAgICBjb25zdCBzID0gbTMudHJhbnNmb3JtUG9pbnQoYm9keTEuY29sbGlkZXIuUm1hdHJpeCwgcmFMb2NhbCk7XHJcbiAgICBjb25zdCBiID0gbTMudHJhbnNmb3JtUG9pbnQoYm9keTIuY29sbGlkZXIuUm1hdHJpeCwgcmJMb2NhbCk7XHJcblxyXG4gICAgdGhpcy5yYSA9IHM7XHJcbiAgICB0aGlzLnJiID0gYjtcclxuXHJcbiAgICBjb25zdCBKID0gW1swLCAwLCAwXSwgdjMuY3Jvc3MocywgYiksIFswLCAwLCAwXSwgdjMuY3Jvc3MoYiwgcyldO1xyXG5cclxuICAgIGNvbnN0IGRvZjEgPSBib2R5MS5ET0Y7XHJcbiAgICBjb25zdCBkb2YyID0gYm9keTIuRE9GO1xyXG5cclxuICAgIEpbMF1bMF0gKj0gZG9mMVswXTtcclxuICAgIEpbMF1bMV0gKj0gZG9mMVsxXTtcclxuICAgIEpbMF1bMl0gKj0gZG9mMVsyXTtcclxuXHJcbiAgICBKWzFdWzBdICo9IGRvZjFbM107XHJcbiAgICBKWzFdWzFdICo9IGRvZjFbNF07XHJcbiAgICBKWzFdWzJdICo9IGRvZjFbNV07XHJcblxyXG4gICAgSlsyXVswXSAqPSBkb2YyWzBdO1xyXG4gICAgSlsyXVsxXSAqPSBkb2YyWzFdO1xyXG4gICAgSlsyXVsyXSAqPSBkb2YyWzJdO1xyXG5cclxuICAgIEpbM11bMF0gKj0gZG9mMlszXTtcclxuICAgIEpbM11bMV0gKj0gZG9mMls0XTtcclxuICAgIEpbM11bMl0gKj0gZG9mMls1XTtcclxuICAgIGNvbnN0IEkxID0gYm9keTEuZ2V0SW52ZXJzZUluZXJ0aWFUZW5zb3IoKTtcclxuICAgIGNvbnN0IEkyID0gYm9keTIuZ2V0SW52ZXJzZUluZXJ0aWFUZW5zb3IoKTtcclxuICAgIHRoaXMuSiA9IEo7XHJcbiAgICB0aGlzLkpNID0gW1xyXG4gICAgICBbMCwgMCwgMF0sXHJcbiAgICAgIG0zLnRyYW5zZm9ybVBvaW50KEkxLCB0aGlzLkpbMV0pLFxyXG4gICAgICBbMCwgMCwgMF0sXHJcbiAgICAgIG0zLnRyYW5zZm9ybVBvaW50KEkyLCB0aGlzLkpbM10pLFxyXG4gICAgXTtcclxuICAgIHRoaXMuZWZmTWFzcyA9XHJcbiAgICAgIHYzLmRvdCh0aGlzLkpNWzFdLCB0aGlzLkpbMV0pICsgdjMuZG90KHRoaXMuSk1bM10sIHRoaXMuSlszXSk7XHJcbiAgICB0aGlzLkIgPSBbXHJcbiAgICAgIFswLCAwLCAwLCAuLi50aGlzLkpNWzFdXSxcclxuICAgICAgWzAsIDAsIDAsIC4uLnRoaXMuSk1bM11dLFxyXG4gICAgXTtcclxuICAgIHRoaXMuX0ogPSBbXHJcbiAgICAgIFsuLi50aGlzLkpbMF0sIC4uLnRoaXMuSlsxXV0sXHJcbiAgICAgIFsuLi50aGlzLkpbMl0sIC4uLnRoaXMuSlszXV0sXHJcbiAgICBdO1xyXG4gIH1cclxuICB1cGRhdGVSaWdodFBhcnQoZGVsdGFUaW1lKSB7XHJcbiAgICBjb25zdCB7IGJvZHkxLCBib2R5MiB9ID0gdGhpcztcclxuXHJcbiAgICB0aGlzLmJpYXMgPVxyXG4gICAgICAtdjMuZG90KHRoaXMuSlsxXSwgYm9keTEuZ2V0QW5ndWxhclZlbG9jaXR5KCkpICsgdjMuZG90KHRoaXMuSlszXSwgYm9keTIuZ2V0QW5ndWxhclZlbG9jaXR5KCkpO1xyXG4gIH1cclxuICBhcHBseVJlc29sdmluZ0ltcHVsc2UobGFtYmRhKSB7XHJcbiAgICBjb25zdCB7IGJvZHkxLCBib2R5MiB9ID0gdGhpcztcclxuICAgIGJvZHkxLmFkZEFuZ3VsYXJWKHYzLnNjYWxlKHRoaXMucmEsIGxhbWJkYSkpO1xyXG4gICAgYm9keTIuYWRkQW5ndWxhclYodjMuc2NhbGUodGhpcy5yYiwgbGFtYmRhKSk7XHJcbiAgfVxyXG59XHJcbiovXHJcbi8qXHJcbmNsYXNzIEpvaW50IGV4dGVuZHMgQ29uc3RyYWludCB7XHJcbiAgY29uc3RydWN0b3IoYm9keTEsIGJvZHkyLCByYUxvY2FsLCByYkxvY2FsLCBiaWFzRmFjdG9yID0gMCkge1xyXG4gICAgc3VwZXIoYm9keTEsIGJvZHkyLCBudWxsLCBudWxsLCBudWxsLCByYUxvY2FsLCByYkxvY2FsLCBiaWFzRmFjdG9yKTtcclxuXHJcbiAgICB0aGlzLnRyZXNob2xkID0gMC4wMDAxO1xyXG4gICAgdGhpcy5yZWR1Y2VyID0gMC41O1xyXG4gICAgdGhpcy5tYXhJbXB1bHNlID0gMC43O1xyXG4gIH1cclxuICB1cGRhdGVMZWZ0UGFydChkZWx0YVRpbWUpIHtcclxuICAgIGNvbnN0IHsgYm9keTEsIGJvZHkyLCByYUxvY2FsLCByYkxvY2FsIH0gPSB0aGlzO1xyXG4gICAgdGhpcy5QQSA9IGJvZHkxLmNvbGxpZGVyLmxvY2FsVG9HbG9iYWwocmFMb2NhbCk7XHJcbiAgICB0aGlzLlBCID0gYm9keTIuY29sbGlkZXIubG9jYWxUb0dsb2JhbChyYkxvY2FsKTtcclxuICAgIGNvbnN0IGRpciA9IHYzLmRpZmYodGhpcy5QQSwgdGhpcy5QQik7XHJcbiAgICBjb25zdCBuID0gZGlyO1xyXG4gICAgdGhpcy5uID0gbjtcclxuICAgIHRoaXMucmEgPSBkaWZmKHRoaXMuUEEsIHRoaXMuYm9keTEuY29sbGlkZXIucG9zKTtcclxuICAgIHRoaXMucmIgPSBkaWZmKHRoaXMuUEIsIHRoaXMuYm9keTIuY29sbGlkZXIucG9zKTtcclxuICAgIHRoaXMucGVuRGVwdGggPSBub3JtKGRpcik7XHJcblxyXG4gICAgY29uc3QgSiA9IFtcclxuICAgICAgdjMuc2NhbGUodGhpcy5uLCAtMSksXHJcbiAgICAgIHYzLmNyb3NzKHRoaXMubiwgdGhpcy5yYSksXHJcbiAgICAgIHRoaXMubixcclxuICAgICAgdjMuY3Jvc3ModGhpcy5yYiwgdGhpcy5uKSxcclxuICAgIF07XHJcblxyXG4gICAgY29uc3QgZG9mMSA9IGJvZHkxLkRPRjtcclxuICAgIGNvbnN0IGRvZjIgPSBib2R5Mi5ET0Y7XHJcblxyXG4gICAgSlswXVswXSAqPSBkb2YxWzBdO1xyXG4gICAgSlswXVsxXSAqPSBkb2YxWzFdO1xyXG4gICAgSlswXVsyXSAqPSBkb2YxWzJdO1xyXG5cclxuICAgIEpbMV1bMF0gKj0gZG9mMVszXTtcclxuICAgIEpbMV1bMV0gKj0gZG9mMVs0XTtcclxuICAgIEpbMV1bMl0gKj0gZG9mMVs1XTtcclxuXHJcbiAgICBKWzJdWzBdICo9IGRvZjJbMF07XHJcbiAgICBKWzJdWzFdICo9IGRvZjJbMV07XHJcbiAgICBKWzJdWzJdICo9IGRvZjJbMl07XHJcblxyXG4gICAgSlszXVswXSAqPSBkb2YyWzNdO1xyXG4gICAgSlszXVsxXSAqPSBkb2YyWzRdO1xyXG4gICAgSlszXVsyXSAqPSBkb2YyWzVdO1xyXG4gICAgY29uc3QgSTEgPSBib2R5MS5nZXRJbnZlcnNlSW5lcnRpYVRlbnNvcigpO1xyXG4gICAgY29uc3QgSTIgPSBib2R5Mi5nZXRJbnZlcnNlSW5lcnRpYVRlbnNvcigpO1xyXG4gICAgbGV0IE0xID0gYm9keTEuZ2V0SW52ZXJzZU1hc3MoKTtcclxuICAgIGxldCBNMiA9IGJvZHkyLmdldEludmVyc2VNYXNzKCk7XHJcbiAgICB0aGlzLkogPSBKO1xyXG4gICAgdGhpcy5KTSA9IFtcclxuICAgICAgc2NhbGUodGhpcy5KWzBdLCBNMSksXHJcbiAgICAgIG0zLnRyYW5zZm9ybVBvaW50KEkxLCB0aGlzLkpbMV0pLFxyXG4gICAgICBzY2FsZSh0aGlzLkpbMl0sIE0yKSxcclxuICAgICAgbTMudHJhbnNmb3JtUG9pbnQoSTIsIHRoaXMuSlszXSksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5lZmZNYXNzID1cclxuICAgICAgZG90KHRoaXMuSk1bMF0sIEpbMF0pICtcclxuICAgICAgZG90KHRoaXMuSk1bMV0sIHRoaXMuSlsxXSkgK1xyXG4gICAgICBkb3QodGhpcy5KTVsyXSwgSlsyXSkgK1xyXG4gICAgICBkb3QodGhpcy5KTVszXSwgdGhpcy5KWzNdKTtcclxuICAgIHRoaXMuQiA9IFtcclxuICAgICAgWy4uLnRoaXMuSk1bMF0sIC4uLnRoaXMuSk1bMV1dLFxyXG4gICAgICBbLi4udGhpcy5KTVsyXSwgLi4udGhpcy5KTVszXV0sXHJcbiAgICBdO1xyXG4gICAgdGhpcy5fSiA9IFtcclxuICAgICAgWy4uLnRoaXMuSlswXSwgLi4udGhpcy5KWzFdXSxcclxuICAgICAgWy4uLnRoaXMuSlsyXSwgLi4udGhpcy5KWzNdXSxcclxuICAgIF07XHJcbiAgfVxyXG5cclxuICB1cGRhdGVSaWdodFBhcnQoZGVsdGFUaW1lKSB7XHJcbiAgICBjb25zdCB7IGJvZHkxLCBib2R5MiwgcmEsIHJiLCBuLCBwZW5EZXB0aCwgdHJlc2hvbGQsIGJpYXNGYWN0b3IgfSA9IHRoaXM7XHJcblxyXG4gICAgY29uc3QgcmVsYXRpdmVWZWxvY2l0eSA9IGRpZmYoXHJcbiAgICAgIHN1bShib2R5Mi5nZXRWZWxvY2l0eSgpLCBjcm9zcyhib2R5Mi5nZXRBbmd1bGFyVmVsb2NpdHkoKSwgcmIpKSxcclxuICAgICAgc3VtKGJvZHkxLmdldFZlbG9jaXR5KCksIGNyb3NzKGJvZHkxLmdldEFuZ3VsYXJWZWxvY2l0eSgpLCByYSkpXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IHJlbGF0aXZlVmVsb2NpdHlOb3JtYWxQcm9qZWN0aW9uID0gZG90KHJlbGF0aXZlVmVsb2NpdHksIG4pO1xyXG4gICAgY29uc3QgZmFjID0gcGVuRGVwdGggKiogMiA+IHRyZXNob2xkO1xyXG4gICAgdGhpcy5iaWFzID1cclxuICAgICAgKGJpYXNGYWN0b3IgKiBNYXRoLm1heChwZW5EZXB0aCAqKiAyIC0gdHJlc2hvbGQsIDApKSAvIGRlbHRhVGltZSAtXHJcbiAgICAgIHJlbGF0aXZlVmVsb2NpdHlOb3JtYWxQcm9qZWN0aW9uO1xyXG4gICAgdGhpcy5iaWFzICo9IGZhYztcclxuICB9XHJcbiAgYXBwbHlSZXNvbHZpbmdJbXB1bHNlKGxhbWJkYSkge1xyXG4gICAgdGhpcy5ib2R5MS5hcHBseUltcHVsc2Uoc2NhbGUodGhpcy5KWzBdLCBsYW1iZGEpLCB0aGlzLnJhKTtcclxuICAgIHRoaXMuYm9keTIuYXBwbHlJbXB1bHNlKHNjYWxlKHRoaXMuSlsyXSwgbGFtYmRhKSwgdGhpcy5yYik7XHJcbiAgfVxyXG4gIGFwcGx5UmVzb2x2aW5nUHNldWRvSW1wdWxzZShsYW1iZGEpIHtcclxuICAgIGNvbnN0IG1heCA9IHRoaXMuZWZmTWFzcyAqIDEwO1xyXG4gICAgLy9sYW1iZGEgPSBjbGFtcChsYW1iZGEsIC0xLCAxKVxyXG4gICAgdGhpcy5ib2R5MS5hcHBseVBzZXVkb0ltcHVsc2Uoc2NhbGUodGhpcy5uLCAtbGFtYmRhKSwgWzAsIDAsIDBdKTtcclxuICAgIHRoaXMuYm9keTIuYXBwbHlQc2V1ZG9JbXB1bHNlKHNjYWxlKHRoaXMubiwgbGFtYmRhKSwgWzAsIDAsIDBdKTtcclxuICB9XHJcbn1cclxuY2xhc3MgSm9pbnRQb3NpdGlvbkNvbnN0cmFpbnQgZXh0ZW5kcyBKb2ludCB7XHJcbiAgdXBkYXRlUmlnaHRQYXJ0KGRlbHRhVGltZSkge1xyXG4gICAgY29uc3QgeyBwZW5EZXB0aCwgdHJlc2hvbGQsIGJpYXNGYWN0b3IgfSA9IHRoaXM7XHJcblxyXG4gICAgY29uc3QgZmFjID0gcGVuRGVwdGggKiogMiA+IHRyZXNob2xkO1xyXG4gICAgdGhpcy5iaWFzID1cclxuICAgICAgKChiaWFzRmFjdG9yICogTWF0aC5tYXgocGVuRGVwdGggKiogMiAtIHRyZXNob2xkLCAwKSkgLyBkZWx0YVRpbWUpICogZmFjO1xyXG4gIH1cclxuICBhcHBseVJlc29sdmluZ0ltcHVsc2UobGFtYmRhKSB7XHJcbiAgICAvL2lmKGxhbWJkYSA8IDAuMSlyZXR1cm5cclxuICAgIHRoaXMuYm9keTEuYXBwbHlQc2V1ZG9JbXB1bHNlKHNjYWxlKHRoaXMuSlswXSwgbGFtYmRhKSwgdGhpcy5yYSk7XHJcbiAgICB0aGlzLmJvZHkyLmFwcGx5UHNldWRvSW1wdWxzZShzY2FsZSh0aGlzLkpbMl0sIGxhbWJkYSksIHRoaXMucmIpO1xyXG4gIH1cclxufSovXHJcbmV4cG9ydCB7IENvbnRhY3RFcXVhdGlvbiwgQ29uc3RyYWludEVxdWF0aW9uLCBcclxuLy9Kb2ludCxcclxuRnJpY3Rpb25FcXVhdGlvbixcclxuLy9Qb3NpdGlvbkNvbnN0cmFpbnQsXHJcbi8vSm9pbnRQb3NpdGlvbkNvbnN0cmFpbnQsXHJcbi8vUm90YXRpb25hbENvbnN0cmFpbnQsXHJcbiB9O1xyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudEVtaXR0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudHMgPSB7fTtcclxuICAgIH1cclxuICAgIG9uKGV2ZW50TmFtZSwgZm4pIHtcclxuICAgICAgICBpZiAoIXRoaXMuZXZlbnRzW2V2ZW50TmFtZV0pIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLnB1c2goZm4pO1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdLmZpbHRlcigoZXZlbnRGbikgPT4gZm4gIT09IGV2ZW50Rm4pO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBlbWl0KGV2ZW50TmFtZSwgZGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLmV2ZW50c1tldmVudE5hbWVdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0uZm9yRWFjaCgoZm4pID0+IHtcclxuICAgICAgICAgICAgICAgIGZuLmNhbGwobnVsbCwgZGF0YSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCIuL0V2ZW50RW1pdHRlclwiO1xyXG5pbXBvcnQgeyBtMywgdjMgfSBmcm9tICdyb21hbnBwcG1hdGgnO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5jb25zdCB7IFJJR0lEX0JPRFlfTU9WRV9UUkVTSE9MRCwgUklHSURfQk9EWV9BQUJCX0JJQVMgfSA9IGNvbmZpZztcclxuY2xhc3MgUmlnaWRCb2R5IGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbGxpZGVyKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnN0YXRpYyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXIgPSBjb2xsaWRlcjtcclxuICAgICAgICB0aGlzLm1hc3MgPSAxO1xyXG4gICAgICAgIHRoaXMuaW52ZXJzZU1hc3MgPSAxIC8gdGhpcy5tYXNzO1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSBbMCwgMCwgMF07XHJcbiAgICAgICAgdGhpcy5wc2V1ZG9WZWxvY2l0eSA9IFswLCAwLCAwXTtcclxuICAgICAgICB0aGlzLnBzZXVkb0FuZ3VsYXJWID0gWzAsIDAsIDBdO1xyXG4gICAgICAgIHRoaXMuYWNjZWxlcmF0aW9uID0gWzAsIDAsIDBdO1xyXG4gICAgICAgIHRoaXMub21lZ2EgPSBbMCwgMCwgMF07XHJcbiAgICAgICAgdGhpcy5pbnZlcnNlSW5lcnRpYVRlbnNvciA9IGNvbGxpZGVyLmdldEludmVyc2VJbmVydGlhVGVuc29yKHRoaXMubWFzcyk7XHJcbiAgICAgICAgdGhpcy5pZCA9IFJpZ2lkQm9keS5sYXN0SWQrKztcclxuICAgICAgICB0aGlzLmZyaWN0aW9uID0gNTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50RnVuY3Rpb25zID0gW107XHJcbiAgICAgICAgdGhpcy5ncm91cCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5uZWVkVG9VcGRhdGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGdldElkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlkO1xyXG4gICAgfVxyXG4gICAgZ2V0R3JvdXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ3JvdXA7XHJcbiAgICB9XHJcbiAgICBzZXRHcm91cChncm91cElkKSB7XHJcbiAgICAgICAgdGhpcy5ncm91cCA9IGdyb3VwSWQ7XHJcbiAgICB9XHJcbiAgICBnZXRNYXNzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1hc3M7XHJcbiAgICB9XHJcbiAgICBnZXRJbnZlcnNlTWFzcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnZlcnNlTWFzcztcclxuICAgIH1cclxuICAgIGdldFRyYW5zbGF0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldENvbGxpZGVyKCkuZ2V0VHJhbnNsYXRpb24oKTtcclxuICAgIH1cclxuICAgIGdldENvbGxpZGVyKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbGxpZGVyO1xyXG4gICAgfVxyXG4gICAgaXNTdGF0aWMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGljO1xyXG4gICAgfVxyXG4gICAgZ2V0Um90YXRpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29sbGlkZXIoKS5nZXRSbWF0cml4KCk7XHJcbiAgICB9XHJcbiAgICBnZXRWZWxvY2l0eSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy52ZWxvY2l0eTtcclxuICAgIH1cclxuICAgIGdldEFjY2VsZXJhdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hY2NlbGVyYXRpb247XHJcbiAgICB9XHJcbiAgICBnZXRBbmd1bGFyVmVsb2NpdHkoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub21lZ2E7XHJcbiAgICB9XHJcbiAgICBnZXRGcmljdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mcmljdGlvbjtcclxuICAgIH1cclxuICAgIGdldEludmVyc2VJbmVydGlhVGVuc29yKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmludmVyc2VJbmVydGlhVGVuc29yO1xyXG4gICAgfVxyXG4gICAgZ2V0QUFCQigpIHtcclxuICAgICAgICBjb25zdCBhYWJiID0gdGhpcy5jb2xsaWRlci5nZXRBQUJCKCk7XHJcbiAgICAgICAgY29uc3QgdmVsb2NpdHkgPSB0aGlzLnZlbG9jaXR5O1xyXG4gICAgICAgIGNvbnN0IHRyID0gW1JJR0lEX0JPRFlfQUFCQl9CSUFTLCBSSUdJRF9CT0RZX0FBQkJfQklBUywgUklHSURfQk9EWV9BQUJCX0JJQVNdO1xyXG4gICAgICAgIGFhYmIubWluID0gdjMuZGlmZihhYWJiLm1pbiwgdHIpO1xyXG4gICAgICAgIGFhYmIubWF4ID0gdjMuc3VtKGFhYmIubWF4LCB0cik7XHJcbiAgICAgICAgcmV0dXJuIGFhYmI7XHJcbiAgICB9XHJcbiAgICBhZGRWZWxvY2l0eSh2KSB7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHYzLnN1bSh0aGlzLnZlbG9jaXR5LCB2KTtcclxuICAgIH1cclxuICAgIGFkZEFuZ3VsYXJWZWxvY2l0eSh2KSB7XHJcbiAgICAgICAgdGhpcy5vbWVnYSA9IHYzLnN1bSh0aGlzLm9tZWdhLCB2KTtcclxuICAgIH1cclxuICAgIGFkZEFjY2VsZXJhdGlvbih2KSB7XHJcbiAgICAgICAgdGhpcy5hY2NlbGVyYXRpb24gPSB2My5zdW0odGhpcy5hY2NlbGVyYXRpb24sIHYpO1xyXG4gICAgfVxyXG4gICAgdHJhbnNsYXRlKHRyYW5zbGF0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlci50cmFuc2xhdGUodHJhbnNsYXRpb24pO1xyXG4gICAgICAgIHRoaXMubmVlZFRvVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmVtaXRVcGRhdGUoKTtcclxuICAgIH1cclxuICAgIHJvdGF0ZShyb3RhdGlvbikge1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXIucm90YXRlKHJvdGF0aW9uKTtcclxuICAgICAgICB0aGlzLm5lZWRUb1VwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5lbWl0VXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICBzZXRJZChpZCkge1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIH1cclxuICAgIHNldE1hc3MobWFzcykge1xyXG4gICAgICAgIHRoaXMubWFzcyA9IG1hc3M7XHJcbiAgICAgICAgdGhpcy5pbnZlcnNlTWFzcyA9IDEgLyB0aGlzLm1hc3M7XHJcbiAgICB9XHJcbiAgICBzZXRGcmljdGlvbihmKSB7XHJcbiAgICAgICAgdGhpcy5mcmljdGlvbiA9IGY7XHJcbiAgICB9XHJcbiAgICBzZXRSb3RhdGlvbihyKSB7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlci5zZXRSb3RhdGlvbihyKTtcclxuICAgICAgICB0aGlzLm5lZWRUb1VwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5lbWl0VXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICBzZXRUcmFuc2xhdGlvbih0KSB7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlci5zZXRUcmFuc2xhdGlvbih0KTtcclxuICAgICAgICB0aGlzLm5lZWRUb1VwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5lbWl0VXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICBzZXRWZWxvY2l0eSh2KSB7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHY7XHJcbiAgICB9XHJcbiAgICBzZXRBbmd1bGFyVmVsb2NpdHkodikge1xyXG4gICAgICAgIHRoaXMub21lZ2EgPSB2O1xyXG4gICAgfVxyXG4gICAgc2V0U3RhdGljKGIpIHtcclxuICAgICAgICB0aGlzLnN0YXRpYyA9IGI7XHJcbiAgICB9XHJcbiAgICBpbnRlZ3JhdGVSSzQoZHQpIHtcclxuICAgICAgICBjb25zdCB7IGFjY2VsZXJhdGlvbiwgdmVsb2NpdHksIG9tZWdhIH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IF90cmFuc2xhdGlvbiA9IHYzLnNjYWxlKHYzLnN1bSh2ZWxvY2l0eSwgdjMuc2NhbGUoYWNjZWxlcmF0aW9uLCAoMiAvIDMpICogZHQpKSwgZHQpO1xyXG4gICAgICAgIGNvbnN0IF9yb3RhdGlvbiA9IHYzLnNjYWxlKG9tZWdhLCBkdCAvIDIpO1xyXG4gICAgICAgIGNvbnN0IGRlbHRhVmVsb2NpdHkgPSB2My5zY2FsZShhY2NlbGVyYXRpb24sIGR0KTtcclxuICAgICAgICBpZiAodjMubm9ybShfdHJhbnNsYXRpb24pID4gY29uZmlnLlJJR0lEX0JPRFlfTU9WRV9UUkVTSE9MRClcclxuICAgICAgICAgICAgdGhpcy50cmFuc2xhdGUoX3RyYW5zbGF0aW9uKTtcclxuICAgICAgICBpZiAodjMubm9ybShfcm90YXRpb24pID4gY29uZmlnLlJJR0lEX0JPRFlfTU9WRV9UUkVTSE9MRClcclxuICAgICAgICAgICAgdGhpcy5yb3RhdGUoX3JvdGF0aW9uKTtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gdjMuc3VtKHZlbG9jaXR5LCBkZWx0YVZlbG9jaXR5KTtcclxuICAgIH1cclxuICAgIGludGVncmF0ZVBzZXVkb1ZlbG9jaXRpZXMoZHQpIHtcclxuICAgICAgICBjb25zdCB0cmFuc2xhdGlvbiA9IHYzLnNjYWxlKHRoaXMucHNldWRvVmVsb2NpdHksIGR0KTtcclxuICAgICAgICBjb25zdCByb3RhdGlvbiA9IHYzLnNjYWxlKHRoaXMucHNldWRvQW5ndWxhclYsIGR0KTtcclxuICAgICAgICBpZiAodjMubm9ybSh0cmFuc2xhdGlvbikgPiBjb25maWcuUklHSURfQk9EWV9NT1ZFX1RSRVNIT0xEKVxyXG4gICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZSh0cmFuc2xhdGlvbik7XHJcbiAgICAgICAgaWYgKHYzLm5vcm0ocm90YXRpb24pID4gY29uZmlnLlJJR0lEX0JPRFlfTU9WRV9UUkVTSE9MRClcclxuICAgICAgICAgICAgdGhpcy5yb3RhdGUocm90YXRpb24pO1xyXG4gICAgICAgIHRoaXMucHNldWRvVmVsb2NpdHkgPSBbMCwgMCwgMF07XHJcbiAgICAgICAgdGhpcy5wc2V1ZG9Bbmd1bGFyViA9IFswLCAwLCAwXTtcclxuICAgIH1cclxuICAgIGFkZFBzZXVkb1ZlbG9jaXR5KHYpIHtcclxuICAgICAgICB0aGlzLnBzZXVkb1ZlbG9jaXR5ID0gdjMuc3VtKHRoaXMucHNldWRvVmVsb2NpdHksIHYpO1xyXG4gICAgfVxyXG4gICAgYWRkUHNldWRvQW5ndWxhclYodikge1xyXG4gICAgICAgIHRoaXMucHNldWRvQW5ndWxhclYgPSB2My5zdW0odGhpcy5wc2V1ZG9Bbmd1bGFyViwgdik7XHJcbiAgICB9XHJcbiAgICBpbnRlZ3JhdGVWZWxvY2l0aWVzKGR0KSB7XHJcbiAgICAgICAgY29uc3QgdHJhbnNsYXRpb24gPSB2My5zY2FsZSh2My5kaWZmKHRoaXMudmVsb2NpdHksIHYzLnNjYWxlKHRoaXMuYWNjZWxlcmF0aW9uLCBkdCAvIDMpKSwgZHQpO1xyXG4gICAgICAgIGlmICh2My5ub3JtKHRyYW5zbGF0aW9uKSA+IGNvbmZpZy5SSUdJRF9CT0RZX01PVkVfVFJFU0hPTEQpXHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNsYXRlKHRyYW5zbGF0aW9uKTtcclxuICAgICAgICBjb25zdCByb3RhdGlvbiA9IHYzLnNjYWxlKHRoaXMub21lZ2EsIGR0IC8gMik7XHJcbiAgICAgICAgaWYgKHYzLm5vcm0ocm90YXRpb24pID4gY29uZmlnLlJJR0lEX0JPRFlfTU9WRV9UUkVTSE9MRClcclxuICAgICAgICAgICAgdGhpcy5yb3RhdGUocm90YXRpb24pO1xyXG4gICAgfVxyXG4gICAgaW50ZWdyYXRlRm9yY2VzKGR0KSB7XHJcbiAgICAgICAgbGV0IGRlbHRhU3BlZWQgPSB2My5zY2FsZSh0aGlzLmFjY2VsZXJhdGlvbiwgZHQpO1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSB2My5zdW0odGhpcy52ZWxvY2l0eSwgZGVsdGFTcGVlZCk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVJbnZlcnNlSW5lcnRpYSgpIHtcclxuICAgICAgICB0aGlzLmludmVyc2VJbmVydGlhVGVuc29yID0gdGhpcy5jb2xsaWRlci5nZXRJbnZlcnNlSW5lcnRpYVRlbnNvcih0aGlzLm1hc3MpO1xyXG4gICAgfVxyXG4gICAgYXBwbHlJbXB1bHNlKGltcHVsc2UsIHBvaW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGljKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHYzLnN1bSh0aGlzLnZlbG9jaXR5LCB2My5zY2FsZShpbXB1bHNlLCB0aGlzLmludmVyc2VNYXNzKSk7XHJcbiAgICAgICAgY29uc3QgYW5ndWxhckltcHVsc2UgPSBtMy50cmFuc2Zvcm1Qb2ludCh0aGlzLmludmVyc2VJbmVydGlhVGVuc29yLCB2My5jcm9zcyhwb2ludCwgaW1wdWxzZSkpO1xyXG4gICAgICAgIHRoaXMub21lZ2EgPSB2My5zdW0odGhpcy5vbWVnYSwgYW5ndWxhckltcHVsc2UpO1xyXG4gICAgfVxyXG4gICAgYXBwbHlQc2V1ZG9JbXB1bHNlKGltcHVsc2UsIHBvaW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGljKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5wc2V1ZG9WZWxvY2l0eSA9IHYzLnN1bSh0aGlzLnBzZXVkb1ZlbG9jaXR5LCB2My5zY2FsZShpbXB1bHNlLCB0aGlzLmludmVyc2VNYXNzKSk7XHJcbiAgICAgICAgY29uc3QgYW5ndWxhckltcHVsc2UgPSBtMy50cmFuc2Zvcm1Qb2ludCh0aGlzLmludmVyc2VJbmVydGlhVGVuc29yLCB2My5jcm9zcyhwb2ludCwgaW1wdWxzZSkpO1xyXG4gICAgICAgIHRoaXMucHNldWRvQW5ndWxhclYgPSB2My5zdW0odGhpcy5wc2V1ZG9Bbmd1bGFyViwgYW5ndWxhckltcHVsc2UpO1xyXG4gICAgfVxyXG4gICAgLypcclxuICAgIGFwcGx5QW5ndWxhckltcHVsc2UocmFkaXVzIDogbnVtYmVyLCBheGlzLCB2YWx1ZSkge1xyXG4gICAgICBjb25zdCBkaXIgPSBub3JtYWxpemUoW1xyXG4gICAgICAgIGF4aXNbMV0gKyBheGlzWzJdLFxyXG4gICAgICAgIGF4aXNbMl0gLSBheGlzWzBdLFxyXG4gICAgICAgIC1heGlzWzBdIC0gYXhpc1sxXSxcclxuICAgICAgXSk7XHJcbiAgICAgIGNvbnN0IHJhZCA9IHZlY3Rvci5jcm9zcyhkaXIsIGF4aXMpO1xyXG4gICAgICBjb25zdCBnbG9iYWxEaXIgPSBzY2FsZShkaXIsIHZhbHVlKTtcclxuICAgICAgY29uc3QgZ2xvYmFsUmFkID0gc2NhbGUocmFkLCByYWRpdXMpO1xyXG4gIFxyXG4gICAgICB0aGlzLmFwcGx5SW1wdWxzZShnbG9iYWxEaXIsIGdsb2JhbFJhZCk7XHJcbiAgICB9Ki9cclxuICAgIGdldEV4cGFuZGVkQUFCQigpIHtcclxuICAgICAgICBjb25zdCBhYWJiID0gdGhpcy5jb2xsaWRlci5nZXRBQUJCKCk7XHJcbiAgICAgICAgY29uc3QgdmVsb2NpdHkgPSB0aGlzLnZlbG9jaXR5O1xyXG4gICAgICAgIGNvbnN0IHRyID0gW1JJR0lEX0JPRFlfQUFCQl9CSUFTLCBSSUdJRF9CT0RZX0FBQkJfQklBUywgUklHSURfQk9EWV9BQUJCX0JJQVNdO1xyXG4gICAgICAgIGFhYmIubWluID0gdjMuZGlmZihhYWJiLm1pbiwgdHIpO1xyXG4gICAgICAgIGFhYmIubWF4ID0gdjMuc3VtKGFhYmIubWF4LCB0cik7XHJcbiAgICAgICAgLyppZih2ZWxvY2l0eVswXSA+IDEwKSBhYWJiLm1heFswXSArPSB2ZWxvY2l0eVswXVxyXG4gICAgICAgICAgaWYodmVsb2NpdHlbMV0gPiAxMCkgYWFiYi5tYXhbMV0gKz0gdmVsb2NpdHlbMV1cclxuICAgICAgICAgIGlmKHZlbG9jaXR5WzJdID4gMTApIGFhYmIubWF4WzJdICs9IHZlbG9jaXR5WzJdXHJcbiAgICAgICAgICBpZih2ZWxvY2l0eVswXSA8IC0xMCkgYWFiYi5taW5bMF0gKz0gdmVsb2NpdHlbMF1cclxuICAgICAgICAgIGlmKHZlbG9jaXR5WzFdIDwgLTEwKSBhYWJiLm1pblsxXSArPSB2ZWxvY2l0eVsxXVxyXG4gICAgICAgICAgaWYodmVsb2NpdHlbMl0gPCAtMTApIGFhYmIubWluWzJdICs9IHZlbG9jaXR5WzJdKi9cclxuICAgICAgICByZXR1cm4gYWFiYjtcclxuICAgIH1cclxuICAgIG9uVXBkYXRlKGZ1bmMpIHtcclxuICAgICAgICBpZiAodGhpcy51cGRhdGVFdmVudEZ1bmN0aW9ucy5pbmRleE9mKGZ1bmMpID4gLTEpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50RnVuY3Rpb25zLnB1c2goZnVuYyk7XHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVFdmVudEZ1bmN0aW9ucy5maWx0ZXIoZm4gPT4gZm4gIT09IGZ1bmMpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBlbWl0VXBkYXRlKCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlRXZlbnRGdW5jdGlvbnMuZm9yRWFjaChmbiA9PiB7XHJcbiAgICAgICAgICAgIGZuKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuUmlnaWRCb2R5Lmxhc3RJZCA9IDE7XHJcbmNsYXNzIFRlcnJhaW5TZWdtZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbGxpZGVyKSB7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlciA9IGNvbGxpZGVyO1xyXG4gICAgICAgIHRoaXMuZ3JvdXAgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZnJpY3Rpb24gPSA1O1xyXG4gICAgICAgIHRoaXMudXBkYXRlRXZlbnRGdW5jdGlvbnMgPSBbXTtcclxuICAgIH1cclxuICAgIGdldElkKCkge1xyXG4gICAgICAgIHJldHVybiBUZXJyYWluU2VnbWVudC5pZDtcclxuICAgIH1cclxuICAgIGdldEdyb3VwKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdyb3VwO1xyXG4gICAgfVxyXG4gICAgc2V0R3JvdXAoZ3JvdXBJZCkge1xyXG4gICAgICAgIHRoaXMuZ3JvdXAgPSBncm91cElkO1xyXG4gICAgfVxyXG4gICAgZ2V0TWFzcygpIHtcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIH1cclxuICAgIGdldEludmVyc2VNYXNzKCkge1xyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgfVxyXG4gICAgZ2V0VHJhbnNsYXRpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29sbGlkZXIoKS5nZXRUcmFuc2xhdGlvbigpO1xyXG4gICAgfVxyXG4gICAgZ2V0Q29sbGlkZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sbGlkZXI7XHJcbiAgICB9XHJcbiAgICBpc1N0YXRpYygpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGdldFJvdGF0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldENvbGxpZGVyKCkuZ2V0Um1hdHJpeCgpO1xyXG4gICAgfVxyXG4gICAgZ2V0VmVsb2NpdHkoKSB7XHJcbiAgICAgICAgcmV0dXJuIFswLCAwLCAwXTtcclxuICAgIH1cclxuICAgIGdldEFjY2VsZXJhdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gWzAsIDAsIDBdO1xyXG4gICAgfVxyXG4gICAgZ2V0QW5ndWxhclZlbG9jaXR5KCkge1xyXG4gICAgICAgIHJldHVybiBbMCwgMCwgMF07XHJcbiAgICB9XHJcbiAgICBnZXRGcmljdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mcmljdGlvbjtcclxuICAgIH1cclxuICAgIGdldEludmVyc2VJbmVydGlhVGVuc29yKCkge1xyXG4gICAgICAgIHJldHVybiBtMy5pZGVudGl0eSgpO1xyXG4gICAgfVxyXG4gICAgZ2V0QUFCQigpIHtcclxuICAgICAgICBjb25zdCBhYWJiID0gdGhpcy5jb2xsaWRlci5nZXRBQUJCKCk7XHJcbiAgICAgICAgY29uc3QgdHIgPSBbUklHSURfQk9EWV9BQUJCX0JJQVMsIFJJR0lEX0JPRFlfQUFCQl9CSUFTLCBSSUdJRF9CT0RZX0FBQkJfQklBU107XHJcbiAgICAgICAgYWFiYi5taW4gPSB2My5kaWZmKGFhYmIubWluLCB0cik7XHJcbiAgICAgICAgYWFiYi5tYXggPSB2My5zdW0oYWFiYi5tYXgsIHRyKTtcclxuICAgICAgICByZXR1cm4gYWFiYjtcclxuICAgIH1cclxuICAgIGFkZFZlbG9jaXR5KHYpIHtcclxuICAgIH1cclxuICAgIGFkZEFuZ3VsYXJWZWxvY2l0eSh2KSB7XHJcbiAgICB9XHJcbiAgICBhZGRBY2NlbGVyYXRpb24odikge1xyXG4gICAgfVxyXG4gICAgdHJhbnNsYXRlKHRyYW5zbGF0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlci50cmFuc2xhdGUodHJhbnNsYXRpb24pO1xyXG4gICAgICAgIHRoaXMuZW1pdFVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgcm90YXRlKHJvdGF0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlci5yb3RhdGUocm90YXRpb24pO1xyXG4gICAgICAgIHRoaXMuZW1pdFVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgc2V0SWQoaWQpIHtcclxuICAgIH1cclxuICAgIHNldE1hc3MobWFzcykge1xyXG4gICAgfVxyXG4gICAgc2V0RnJpY3Rpb24oZikge1xyXG4gICAgICAgIHRoaXMuZnJpY3Rpb24gPSBmO1xyXG4gICAgfVxyXG4gICAgc2V0Um90YXRpb24ocikge1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXIuc2V0Um90YXRpb24ocik7XHJcbiAgICAgICAgdGhpcy5lbWl0VXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICBzZXRUcmFuc2xhdGlvbih0KSB7XHJcbiAgICAgICAgdGhpcy5lbWl0VXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICBzZXRWZWxvY2l0eSh2KSB7XHJcbiAgICB9XHJcbiAgICBzZXRBbmd1bGFyVmVsb2NpdHkodikge1xyXG4gICAgfVxyXG4gICAgc2V0U3RhdGljKGIpIHtcclxuICAgIH1cclxuICAgIGludGVncmF0ZVJLNChkdCkge1xyXG4gICAgfVxyXG4gICAgaW50ZWdyYXRlUHNldWRvVmVsb2NpdGllcyhkdCkge1xyXG4gICAgfVxyXG4gICAgYWRkUHNldWRvVmVsb2NpdHkodikge1xyXG4gICAgfVxyXG4gICAgYWRkUHNldWRvQW5ndWxhclYodikge1xyXG4gICAgfVxyXG4gICAgaW50ZWdyYXRlVmVsb2NpdGllcyhkdCkge1xyXG4gICAgfVxyXG4gICAgaW50ZWdyYXRlRm9yY2VzKGR0KSB7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVJbnZlcnNlSW5lcnRpYSgpIHtcclxuICAgIH1cclxuICAgIGFwcGx5SW1wdWxzZShpbXB1bHNlLCBwb2ludCkge1xyXG4gICAgfVxyXG4gICAgYXBwbHlQc2V1ZG9JbXB1bHNlKGltcHVsc2UsIHBvaW50KSB7XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgYXBwbHlBbmd1bGFySW1wdWxzZShyYWRpdXMgOiBudW1iZXIsIGF4aXMsIHZhbHVlKSB7XHJcbiAgICAgIGNvbnN0IGRpciA9IG5vcm1hbGl6ZShbXHJcbiAgICAgICAgYXhpc1sxXSArIGF4aXNbMl0sXHJcbiAgICAgICAgYXhpc1syXSAtIGF4aXNbMF0sXHJcbiAgICAgICAgLWF4aXNbMF0gLSBheGlzWzFdLFxyXG4gICAgICBdKTtcclxuICAgICAgY29uc3QgcmFkID0gdmVjdG9yLmNyb3NzKGRpciwgYXhpcyk7XHJcbiAgICAgIGNvbnN0IGdsb2JhbERpciA9IHNjYWxlKGRpciwgdmFsdWUpO1xyXG4gICAgICBjb25zdCBnbG9iYWxSYWQgPSBzY2FsZShyYWQsIHJhZGl1cyk7XHJcbiAgXHJcbiAgICAgIHRoaXMuYXBwbHlJbXB1bHNlKGdsb2JhbERpciwgZ2xvYmFsUmFkKTtcclxuICAgIH0qL1xyXG4gICAgb25VcGRhdGUoZnVuYykge1xyXG4gICAgICAgIGlmICh0aGlzLnVwZGF0ZUV2ZW50RnVuY3Rpb25zLmluZGV4T2YoZnVuYykgPiAtMSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMudXBkYXRlRXZlbnRGdW5jdGlvbnMucHVzaChmdW5jKTtcclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50RnVuY3Rpb25zLmZpbHRlcihmbiA9PiBmbiAhPT0gZnVuYyk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGVtaXRVcGRhdGUoKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVFdmVudEZ1bmN0aW9ucy5mb3JFYWNoKGZuID0+IHtcclxuICAgICAgICAgICAgZm4oKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5UZXJyYWluU2VnbWVudC5pZCA9IDA7XHJcbmNsYXNzIFBsYXllciBleHRlbmRzIFJpZ2lkQm9keSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb2xsaWRlcikge1xyXG4gICAgICAgIHN1cGVyKGNvbGxpZGVyKTtcclxuICAgICAgICB0aGlzLmZyaWN0aW9uID0gMC4zO1xyXG4gICAgfVxyXG4gICAgYXBwbHlJbXB1bHNlKGltcHVsc2UsIHBvaW50KSB7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHYzLnN1bSh0aGlzLnZlbG9jaXR5LCB2My5zY2FsZShpbXB1bHNlLCB0aGlzLmludmVyc2VNYXNzKSk7XHJcbiAgICB9XHJcbiAgICBhcHBseVBzZXVkb0ltcHVsc2UoaW1wdWxzZSkge1xyXG4gICAgICAgIHRoaXMucHNldWRvVmVsb2NpdHkgPSB2My5zdW0odGhpcy5wc2V1ZG9WZWxvY2l0eSwgdjMuc2NhbGUoaW1wdWxzZSwgdGhpcy5pbnZlcnNlTWFzcykpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7IFJpZ2lkQm9keSwgUGxheWVyLCBUZXJyYWluU2VnbWVudCB9O1xyXG4iLCJpbXBvcnQgVHJlZSBmcm9tIFwiLi9UcmVlXCI7XHJcbmltcG9ydCB7IGdldENvbnRhY3RzIGFzIGdqayB9IGZyb20gXCIuL2dqa1wiO1xyXG5pbXBvcnQgTWFuaWZvbGQgZnJvbSBcIi4vQ29udGFjdE1hbmlmb2xkXCI7XHJcbmltcG9ydCBTeXN0ZW0gZnJvbSBcIi4vU3lzdGVtXCI7XHJcbmltcG9ydCB7IENvbnRhY3RDb25zdHJhaW50IH0gZnJvbSBcIi4vQ29uc3RyYWludHNcIjtcclxuY29uc3Qgc2FtZUdyb3VwID0gKGJvZHkxLCBib2R5MikgPT4ge1xyXG4gICAgaWYgKCFib2R5MS5nZXRHcm91cCgpKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIGlmICghYm9keTIuZ2V0R3JvdXAoKSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICByZXR1cm4gYm9keTEuZ2V0R3JvdXAoKSA9PT0gYm9keTIuZ2V0R3JvdXAoKTtcclxufTtcclxuY29uc3QgcGFpckhhc2ggPSAoeCwgeSkgPT4geCA9PT0gTWF0aC5tYXgoeCwgeSkgPyB4ICogeCArIHggKyB5IDogeSAqIHkgKyB4ICsgeTtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2ltdWxhdGlvbiB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl9vYmplY3RzID0gW107XHJcbiAgICAgICAgdGhpcy5fc3RhdGljT2JqZWN0cyA9IFtdO1xyXG4gICAgICAgIHRoaXMudHJlZSA9IG5ldyBUcmVlKCk7XHJcbiAgICAgICAgdGhpcy5zdGF0aWNUcmVlID0gbmV3IFRyZWUoKTtcclxuICAgICAgICB0aGlzLnRyZWUuc2V0S2V5KHJpZ2lkQm9keSA9PiByaWdpZEJvZHkuZ2V0Q29sbGlkZXIoKS5nZXRJZCgpKTtcclxuICAgICAgICB0aGlzLnN0YXRpY1RyZWUuc2V0S2V5KHJpZ2lkQm9keSA9PiByaWdpZEJvZHkuZ2V0Q29sbGlkZXIoKS5nZXRJZCgpKTtcclxuICAgICAgICB0aGlzLmNvbGxpc2lvbnMgPSBbXTtcclxuICAgICAgICB0aGlzLmNvbnN0cmFpbnRzID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIHRoaXMudXNlQ2FjaGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY29sbGlzaW9uTWFuaWZvbGRzID0gbmV3IE1hcCgpO1xyXG4gICAgfVxyXG4gICAgYWRkT2JqZWN0KG9iamVjdCkge1xyXG4gICAgICAgIGNvbnN0IHsgdHJlZSwgb2JqZWN0cywgc3RhdGljVHJlZSB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCBhYWJiID0gb2JqZWN0LmdldEFBQkIoKTtcclxuICAgICAgICBpZiAob2JqZWN0LmlzU3RhdGljKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RhdGljT2JqZWN0cy5wdXNoKG9iamVjdCk7XHJcbiAgICAgICAgICAgIHN0YXRpY1RyZWUuaW5zZXJ0KG9iamVjdCk7XHJcbiAgICAgICAgICAgIG9iamVjdC5vblVwZGF0ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzdGF0aWNUcmVlLnJlbW92ZShvYmplY3QuZ2V0Q29sbGlkZXIoKS5nZXRJZCgpKTtcclxuICAgICAgICAgICAgICAgIHN0YXRpY1RyZWUuaW5zZXJ0KG9iamVjdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyZWUuaW5zZXJ0KG9iamVjdCk7XHJcbiAgICAgICAgdGhpcy5fb2JqZWN0cy5wdXNoKG9iamVjdCk7XHJcbiAgICAgICAgb2JqZWN0Lm9uVXBkYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgdHJlZS5yZW1vdmUob2JqZWN0LmdldENvbGxpZGVyKCkuZ2V0SWQoKSk7XHJcbiAgICAgICAgICAgIHRyZWUuaW5zZXJ0KG9iamVjdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBhZGRDb25zdHJhaW50cyhjb25zdHJhaW50cywgbmFtZSkge1xyXG4gICAgICAgIHRoaXMuY29uc3RyYWludHMuc2V0KG5hbWUsIFsuLi5jb25zdHJhaW50c10pO1xyXG4gICAgfVxyXG4gICAgYWRkUG9zaXRpb25Db25zdHJhaW50cyhjb25zdHJhaW50cywgbmFtZSkge1xyXG4gICAgICAgIHRoaXMucG9zaXRpb25Db25zdHJhaW50cy5zZXQobmFtZSwgWy4uLmNvbnN0cmFpbnRzXSk7XHJcbiAgICB9XHJcbiAgICByZW1vdmVPYmplY3Qob2JqZWN0KSB7XHJcbiAgICAgICAgdGhpcy50cmVlLnJlbW92ZShvYmplY3QuZ2V0Q29sbGlkZXIoKS5nZXRJZCgpKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZUNvbGxpc2lvbnMoKSB7XHJcbiAgICAgICAgY29uc3QgeyBjb2xsaXNpb25NYW5pZm9sZHMsIHRyZWUsIHN0YXRpY1RyZWUsIG9iamVjdHMgfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGtlZXAgPSAwO1xyXG4gICAgICAgIGZvciAoY29uc3QgW2hhc2gsIG1hbmlmb2xkXSBvZiBjb2xsaXNpb25NYW5pZm9sZHMpIHtcclxuICAgICAgICAgICAgbWFuaWZvbGQudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIGlmICghbWFuaWZvbGQua2VlcClcclxuICAgICAgICAgICAgICAgIGNvbGxpc2lvbk1hbmlmb2xkcy5kZWxldGUoaGFzaCk7XHJcbiAgICAgICAgICAgIGtlZXArKztcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY29sbGlzaW9ucyA9IHRyZWUuX2dldENvbGxpc2lvbnMoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbiA9IGNvbGxpc2lvbnMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhaXIgPSBjb2xsaXNpb25zW2ldO1xyXG4gICAgICAgICAgICBpZiAoc2FtZUdyb3VwKHBhaXJbMF0sIHBhaXJbMV0pKVxyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIGNvbnN0IGhhc2ggPSBwYWlySGFzaChwYWlyWzBdLmdldENvbGxpZGVyKCkuZ2V0SWQoKSwgcGFpclsxXS5nZXRDb2xsaWRlcigpLmdldElkKCkpO1xyXG4gICAgICAgICAgICBsZXQgbWFuaWZvbGQgPSB0aGlzLmNvbGxpc2lvbk1hbmlmb2xkcy5nZXQoaGFzaCk7XHJcbiAgICAgICAgICAgIGlmIChtYW5pZm9sZClcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBjb25zdCBhY3R1YWxDb250YWN0cyA9IGdqayhwYWlyWzBdLmdldENvbGxpZGVyKCksIHBhaXJbMV0uZ2V0Q29sbGlkZXIoKSk7XHJcbiAgICAgICAgICAgIGlmIChhY3R1YWxDb250YWN0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBtYW5pZm9sZCA9IG5ldyBNYW5pZm9sZChhY3R1YWxDb250YWN0cy5tYXAoKGMpID0+IG5ldyBDb250YWN0Q29uc3RyYWludChwYWlyWzBdLCBwYWlyWzFdLCBjLnJhTG9jYWwsIGMucmJMb2NhbCwgYy5yYSwgYy5yYiwgYy5QQSwgYy5QQiwgYy5uLCBjLnBvc2l0aW9uRXJyb3IsIGMuaSwgYy5qKSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsaXNpb25NYW5pZm9sZHMuc2V0KGhhc2gsIG1hbmlmb2xkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9vYmplY3RzLmZvckVhY2goKGJvZHkxKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbGxpc2lvbnMgPSBzdGF0aWNUcmVlLmdldENvbGxpc2lvbnMoYm9keTEpO1xyXG4gICAgICAgICAgICAvL3RyZWUuZWxlbWVudHMuZ2V0KGJvZHkxLmdldENvbGxpZGVyKCkuZ2V0SWQoKSkuaXNDaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKGNvbGxpc2lvbnMubGVuZ3RoICE9IDApXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMCwgbiA9IGNvbGxpc2lvbnMubGVuZ3RoOyBqIDwgbjsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYm9keTIgPSBjb2xsaXNpb25zW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzYW1lR3JvdXAoYm9keTEsIGJvZHkyKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzaCA9IHBhaXJIYXNoKGJvZHkxLmdldENvbGxpZGVyKCkuZ2V0SWQoKSwgYm9keTIuZ2V0Q29sbGlkZXIoKS5nZXRJZCgpKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWFuaWZvbGQgPSB0aGlzLmNvbGxpc2lvbk1hbmlmb2xkcy5nZXQoaGFzaCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAobWFuaWZvbGQpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYW5pZm9sZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0dWFsQ29udGFjdHMgPSBnamsoYm9keTEuZ2V0Q29sbGlkZXIoKSwgYm9keTIuZ2V0Q29sbGlkZXIoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdHVhbENvbnRhY3RzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFuaWZvbGQgPSBuZXcgTWFuaWZvbGQoYWN0dWFsQ29udGFjdHMubWFwKChjKSA9PiBuZXcgQ29udGFjdENvbnN0cmFpbnQoYm9keTEsIGJvZHkyLCBjLnJhTG9jYWwsIGMucmJMb2NhbCwgYy5yYSwgYy5yYiwgYy5QQSwgYy5QQiwgYy5uLCBjLnBvc2l0aW9uRXJyb3IsIGMuaSwgYy5qKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbGxpc2lvbk1hbmlmb2xkcy5zZXQoaGFzaCwgbWFuaWZvbGQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnRyZWUuc2V0VW5jaGVja2VkKCk7XHJcbiAgICAgICAgdGhpcy5zdGF0aWNUcmVlLnNldFVuY2hlY2tlZCgpO1xyXG4gICAgfVxyXG4gICAgdGljayhkdCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ29sbGlzaW9ucygpO1xyXG4gICAgICAgIGNvbnN0IHsgb2JqZWN0cywgY29sbGlzaW9uTWFuaWZvbGRzIH0gPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuX29iamVjdHMuZm9yRWFjaCgoYm9keSkgPT4gYm9keS5pbnRlZ3JhdGVGb3JjZXMoZHQpKTtcclxuICAgICAgICBjb25zdCBzeXN0ZW0gPSBuZXcgU3lzdGVtKCk7XHJcbiAgICAgICAgc3lzdGVtLnVzZUNhY2hlID0gdGhpcy51c2VDYWNoZTtcclxuICAgICAgICBjb25zdCBmcmljdGlvblN5c3RlbSA9IG5ldyBTeXN0ZW0oZmFsc2UpO1xyXG4gICAgICAgIGNvbnN0IGNvbnRhY3RFcXVhdGlvbnMgPSBbXTtcclxuICAgICAgICBjb25zdCBmcmljdGlvbkVxdWF0aW9ucyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IFtrZXksIG1hbmlmb2xkXSBvZiBjb2xsaXNpb25NYW5pZm9sZHMpIHtcclxuICAgICAgICAgICAgY29uc3QgdXNlVmVsb2NpdHlCaWFzID0gbWFuaWZvbGQuY29udGFjdHMubGVuZ3RoIDwgMjtcclxuICAgICAgICAgICAgbWFuaWZvbGQuY29udGFjdHMuZm9yRWFjaCgoY29udGFjdENvbnN0cmFpbnQsIF9pKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb250YWN0RXF1YXRpb24gPSBjb250YWN0Q29uc3RyYWludC5nZXRFcXVhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgW2ZFcXVhdGlvbjEsIGZFcXVhdGlvbjJdID0gY29udGFjdENvbnN0cmFpbnQuZ2V0RnJpY3Rpb25FcXVhdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgIGNvbnRhY3RFcXVhdGlvbnMucHVzaChjb250YWN0RXF1YXRpb24pO1xyXG4gICAgICAgICAgICAgICAgZnJpY3Rpb25FcXVhdGlvbnMucHVzaChmRXF1YXRpb24xLCBmRXF1YXRpb24yKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN5c3RlbS5hZGRFcXVhdGlvbnMoY29udGFjdEVxdWF0aW9ucyk7XHJcbiAgICAgICAgZm9yIChsZXQgW25hbWUsIGNvbnN0cmFpbnRzXSBvZiB0aGlzLmNvbnN0cmFpbnRzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVxdWF0aW9ucyA9IFtdO1xyXG4gICAgICAgICAgICBjb25zdHJhaW50cy5mb3JFYWNoKChjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZXF1YXRpb24gPSBjLmdldEVxdWF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBlcXVhdGlvbnMucHVzaChlcXVhdGlvbik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzeXN0ZW0uYWRkRXF1YXRpb25zKGVxdWF0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vc3lzdGVtLnVwZGF0ZUVxdWF0aW9ucyhkdCk7XHJcbiAgICAgICAgZnJpY3Rpb25TeXN0ZW0uYWRkRXF1YXRpb25zKGZyaWN0aW9uRXF1YXRpb25zKTtcclxuICAgICAgICBmcmljdGlvblN5c3RlbS51cGRhdGVFcXVhdGlvbnMoZHQpO1xyXG4gICAgICAgIGZyaWN0aW9uU3lzdGVtLmdlbmVyYXRlU3lzdGVtKGR0KTtcclxuICAgICAgICBmcmljdGlvblN5c3RlbS5zb2x2ZVBHUyhkdCk7XHJcbiAgICAgICAgc3lzdGVtLnVwZGF0ZUVxdWF0aW9ucyhkdCk7XHJcbiAgICAgICAgc3lzdGVtLmdlbmVyYXRlU3lzdGVtKGR0KTtcclxuICAgICAgICBjb25zdCBsYW1iZGEgPSBzeXN0ZW0uc29sdmVQR1MoZHQsIHRydWUpO1xyXG4gICAgICAgIGNvbnN0IGxlbiA9IGZyaWN0aW9uRXF1YXRpb25zLmxlbmd0aCAvIDI7XHJcbiAgICAgICAgLypmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICBmcmljdGlvbkVxdWF0aW9uc1syICogaV0ubGFtYmRhTWluICo9IGxhbWJkYVtpXTtcclxuICAgICAgICAgIGZyaWN0aW9uRXF1YXRpb25zWzIgKiBpXS5sYW1iZGFNYXggPSBsYW1iZGFbaV07XHJcbiAgICAgICAgICBmcmljdGlvbkVxdWF0aW9uc1syICogaSArIDFdLmxhbWJkYU1pbiAqPSBsYW1iZGFbaV07XHJcbiAgICAgICAgICBmcmljdGlvbkVxdWF0aW9uc1syICogaSArIDFdLmxhbWJkYU1heCA9IGxhbWJkYVtpXTtcclxuICAgICAgICB9Ki9cclxuICAgICAgICB0aGlzLl9vYmplY3RzLmZvckVhY2goKG9iamVjdCkgPT4gb2JqZWN0LnVwZGF0ZUludmVyc2VJbmVydGlhKCkpO1xyXG4gICAgICAgIHRoaXMuX29iamVjdHMuZm9yRWFjaCgob2JqZWN0KSA9PiBvYmplY3QuaW50ZWdyYXRlVmVsb2NpdGllcyhkdCkpO1xyXG4gICAgICAgIGxldCBuZHggPSAwO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCBtYW5pZm9sZF0gb2YgdGhpcy5jb2xsaXNpb25NYW5pZm9sZHMpIHtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgbWFuaWZvbGQuY29udGFjdHMuZm9yRWFjaCgoYykgPT4ge1xyXG4gICAgICAgICAgICBjLnByZXZMYW1iZGEgPSBsYW1iZGFbbmR4XVxyXG4gICAgICAgICAgICBuZHgrKztcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0qL1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgY29uc3QgcG9zaXRpb25TeXN0ZW0gPSBuZXcgU3lzdGVtKCk7XHJcbiAgICAgICAgY29uc3QgcG9zaXRpb25Db25zdHJhaW50cyA9IFtdO1xyXG4gICAgXHJcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCBtYW5pZm9sZF0gb2YgbWFuaWZvbGRzKSB7XHJcbiAgICAgICAgICBjb25zdCB7IGNvbnRhY3RzIH0gPSBtYW5pZm9sZDtcclxuICAgICAgICAgIGlmIChjb250YWN0cy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uQ29uc3RyYWludHMucHVzaChcclxuICAgICAgICAgICAgICAuLi5jb250YWN0cy5tYXAoKGMpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgICAgICAgYm9keTEsXHJcbiAgICAgICAgICAgICAgICAgIGJvZHkyLFxyXG4gICAgICAgICAgICAgICAgICByYUxvY2FsLFxyXG4gICAgICAgICAgICAgICAgICByYkxvY2FsLFxyXG4gICAgICAgICAgICAgICAgICByYSxcclxuICAgICAgICAgICAgICAgICAgcmIsXHJcbiAgICAgICAgICAgICAgICAgIGksXHJcbiAgICAgICAgICAgICAgICAgIGosXHJcbiAgICAgICAgICAgICAgICAgIHBlbkRlcHRoLFxyXG4gICAgICAgICAgICAgICAgICBuLFxyXG4gICAgICAgICAgICAgICAgfSA9IGM7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb25zdHJhaW50ID0gbmV3IFBvc2l0aW9uQ29uc3RyYWludChcclxuICAgICAgICAgICAgICAgICAgYm9keTEsXHJcbiAgICAgICAgICAgICAgICAgIGJvZHkyLFxyXG4gICAgICAgICAgICAgICAgICBuLFxyXG4gICAgICAgICAgICAgICAgICByYSxcclxuICAgICAgICAgICAgICAgICAgcmIsXHJcbiAgICAgICAgICAgICAgICAgIHJhTG9jYWwsXHJcbiAgICAgICAgICAgICAgICAgIHJiTG9jYWwsXHJcbiAgICAgICAgICAgICAgICAgIDAuMSxcclxuICAgICAgICAgICAgICAgICAgMC4wMDAxLFxyXG4gICAgICAgICAgICAgICAgICBwZW5EZXB0aFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnN0cmFpbnQ7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcG9zaXRpb25TeXN0ZW0uYWRkQ29uc3RyYWludChwb3NpdGlvbkNvbnN0cmFpbnRzKTtcclxuICAgICAgICBmb3IgKGxldCBbbmFtZSwgY29uc3RyYWludHNdIG9mIHRoaXMucG9zaXRpb25Db25zdHJhaW50cykge1xyXG4gICAgICAgICAgcG9zaXRpb25TeXN0ZW0uYWRkQ29uc3RyYWludChjb25zdHJhaW50cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBvc2l0aW9uU3lzdGVtLnVwZGF0ZUVxdWF0aW9ucyhkdCk7XHJcbiAgICAgICAgcG9zaXRpb25TeXN0ZW0uZ2VuZXJhdGVTeXN0ZW0oZHQpO1xyXG4gICAgXHJcbiAgICAgICAgcG9zaXRpb25TeXN0ZW0uc29sdmVQR1MoZHQpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gdGhpcy5vYmplY3RzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgdGhpcy5vYmplY3RzW2ldLmludGVncmF0ZVBzZXVkb1ZlbG9jaXRpZXMoZHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm9iamVjdHMuZm9yRWFjaCgob2JqZWN0KSA9PiBvYmplY3QudXBkYXRlSW52ZXJzZUluZXJ0aWEoKSk7Ki9cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyB2MyB9IGZyb20gXCJyb21hbnBwcG1hdGhcIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IERlYnVnIGZyb20gXCIuL0RlYnVnXCI7XHJcbmxldCBhcnIgPSBbXTtcclxubGV0IG8gPSAwO1xyXG5sZXQgZiA9IHRydWU7XHJcbmNvbnN0IF9sb2cgPSAodmFsKSA9PiB7XHJcbiAgICBvKys7XHJcbiAgICBpZiAoZikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGFycik7XHJcbiAgICAgICAgZiA9IGZhbHNlO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChvIDwgMjAwICYmIG8gJSAxMCA9PSAwKSB7XHJcbiAgICAgICAgYXJyLnB1c2godmFsKTtcclxuICAgIH1cclxufTtcclxuY29uc3QgeyBTT0xWRVJfSVRFUkFUSU9OU19OVU0gfSA9IGNvbmZpZztcclxuY29uc3QgbnVsbFZlYyA9IFswLCAwLCAwXTtcclxuY29uc3QgdjYgPSB7XHJcbiAgICBkb3QoYSwgYikge1xyXG4gICAgICAgIHJldHVybiBhWzBdICogYlswXSArXHJcbiAgICAgICAgICAgIGFbMV0gKiBiWzFdICtcclxuICAgICAgICAgICAgYVsyXSAqIGJbMl0gK1xyXG4gICAgICAgICAgICBhWzNdICogYlszXSArXHJcbiAgICAgICAgICAgIGFbNF0gKiBiWzRdICtcclxuICAgICAgICAgICAgYVs1XSAqIGJbNV07XHJcbiAgICB9LFxyXG4gICAgc2NhbGUoYSwgZmFjKSB7XHJcbiAgICAgICAgcmV0dXJuIFthWzBdICogZmFjLCBhWzFdICogZmFjLCBhWzJdICogZmFjLCBhWzNdICogZmFjLCBhWzRdICogZmFjLCBhWzVdICogZmFjXTtcclxuICAgIH0sXHJcbiAgICBzdW0oYSwgYikge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIGFbMF0gKyBiWzBdLFxyXG4gICAgICAgICAgICBhWzFdICsgYlsxXSxcclxuICAgICAgICAgICAgYVsyXSArIGJbMl0sXHJcbiAgICAgICAgICAgIGFbM10gKyBiWzNdLFxyXG4gICAgICAgICAgICBhWzRdICsgYls0XSxcclxuICAgICAgICAgICAgYVs1XSArIGJbNV1cclxuICAgICAgICBdO1xyXG4gICAgfSxcclxuICAgIGZyb212MyhhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIFsuLi5hLCAuLi5iXTtcclxuICAgIH1cclxufTtcclxuY29uc3Qgbm9ybSA9ICh2KSA9PiBNYXRoLnNxcnQodi5yZWR1Y2UoKGFjYywgZWwpID0+IGFjYyArPSBlbCAqIGVsLCAwKSk7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN5c3RlbSB7XHJcbiAgICBjb25zdHJ1Y3Rvcih1c2VDYWNoZSA9IHRydWUpIHtcclxuICAgICAgICB0aGlzLmVxdWF0aW9ucyA9IFtdO1xyXG4gICAgICAgIHRoaXMudXNlQ2FjaGUgPSB1c2VDYWNoZTtcclxuICAgIH1cclxuICAgIGFkZEVxdWF0aW9ucyhlcXVhdGlvbnMpIHtcclxuICAgICAgICB0aGlzLmVxdWF0aW9ucy5wdXNoKC4uLmVxdWF0aW9ucyk7XHJcbiAgICB9XHJcbiAgICBnZW5lcmF0ZUJvZHlNYXBwaW5nKCkge1xyXG4gICAgICAgIGNvbnN0IGVxdWF0aW9ucyA9IHRoaXMuZXF1YXRpb25zO1xyXG4gICAgICAgIGNvbnN0IG4gPSBlcXVhdGlvbnMubGVuZ3RoO1xyXG4gICAgICAgIGNvbnN0IGJvZGllc01hcCA9IG5ldyBNYXAoKTtcclxuICAgICAgICBjb25zdCBKbWFwID0gW107XHJcbiAgICAgICAgbGV0IGNvdW50ZXIgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVxID0gZXF1YXRpb25zW2ldO1xyXG4gICAgICAgICAgICBsZXQgYm9keUluZGV4MSA9IGJvZGllc01hcC5nZXQoZXEuY29uc3RyYWludC5ib2R5MS5nZXRJZCgpKTtcclxuICAgICAgICAgICAgaWYgKGJvZHlJbmRleDEgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgYm9keUluZGV4MSA9IGNvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgIGJvZGllc01hcC5zZXQoZXEuY29uc3RyYWludC5ib2R5MS5nZXRJZCgpLCBib2R5SW5kZXgxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgYm9keUluZGV4MiA9IGJvZGllc01hcC5nZXQoZXEuY29uc3RyYWludC5ib2R5Mi5nZXRJZCgpKTtcclxuICAgICAgICAgICAgaWYgKGJvZHlJbmRleDIgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgYm9keUluZGV4MiA9IGNvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgIGJvZGllc01hcC5zZXQoZXEuY29uc3RyYWludC5ib2R5Mi5nZXRJZCgpLCBib2R5SW5kZXgyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBKbWFwLnB1c2goYm9keUluZGV4MSwgYm9keUluZGV4Mik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYm9kaWVzTWFwID0gYm9kaWVzTWFwO1xyXG4gICAgICAgIHRoaXMuSm1hcCA9IEptYXA7XHJcbiAgICB9XHJcbiAgICBnZW5lcmF0ZVN5c3RlbShkZWx0YVRpbWUpIHtcclxuICAgICAgICAvL051bWVyYXRpbmcgYm9kaWVzXHJcbiAgICAgICAgdGhpcy5nZW5lcmF0ZUJvZHlNYXBwaW5nKCk7XHJcbiAgICB9XHJcbiAgICAvL0ogKiBWZWxcclxuICAgIHNvbHZlUEdTKGRlbHRhVGltZSwgbG9nID0gZmFsc2UpIHtcclxuICAgICAgICBjb25zdCB7IEptYXAsIGJvZGllc01hcCwgZXF1YXRpb25zIH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IG51bUJvZGllcyA9IGJvZGllc01hcC5zaXplO1xyXG4gICAgICAgIGNvbnN0IG4gPSBlcXVhdGlvbnMubGVuZ3RoO1xyXG4gICAgICAgIGNvbnN0IGQgPSBbXTtcclxuICAgICAgICBjb25zdCBsYW1iZGEwID0gbmV3IEFycmF5KG4pLmZpbGwoMCk7XHJcbiAgICAgICAgY29uc3QgbGFtYmRhID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgbGFtYmRhMFtpXSA9IGVxdWF0aW9uc1tpXS5wcmV2TGFtYmRhO1xyXG4gICAgICAgICAgICBsYW1iZGFbaV0gPSBsYW1iZGEwW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBCbCA9IG5ldyBBcnJheShudW1Cb2RpZXMpLmZpbGwobnVsbFZlYyk7XHJcbiAgICAgICAgY29uc3QgQjJsID0gbmV3IEFycmF5KG51bUJvZGllcykuZmlsbChudWxsVmVjKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBiMSA9IEptYXBbaSAqIDJdO1xyXG4gICAgICAgICAgICBjb25zdCBiMiA9IEptYXBbaSAqIDIgKyAxXTtcclxuICAgICAgICAgICAgY29uc3QgZXEgPSBlcXVhdGlvbnNbaV07XHJcbiAgICAgICAgICAgIGNvbnN0IGwgPSBsYW1iZGEwW2ldO1xyXG4gICAgICAgICAgICAvKiBCbFtiMV0gPSB2Ni5zdW0odjYuc2NhbGUoXHJcbiAgICAgICAgICAgICAgIGVxdWF0aW9uc1tpXS5CWzBdLFxyXG4gICAgICAgICAgICAgICBsYW1iZGEwW2ldKSxcclxuICAgICAgICAgICAgICAgQmxbYjFdKSovXHJcbiAgICAgICAgICAgIGlmICghZXEuY29uc3RyYWludC5ib2R5MS5pc1N0YXRpYygpKSB7XHJcbiAgICAgICAgICAgICAgICBCbFtiMV0gPSB2My5zdW0odjMuc2NhbGUoZXEuSk0xLCBsKSwgQmxbYjFdKTtcclxuICAgICAgICAgICAgICAgIEIybFtiMV0gPSB2My5zdW0odjMuc2NhbGUoZXEuSk0yLCBsKSwgQjJsW2IxXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFlcS5jb25zdHJhaW50LmJvZHkyLmlzU3RhdGljKCkpIHtcclxuICAgICAgICAgICAgICAgIEJsW2IyXSA9IHYzLnN1bSh2My5zY2FsZShlcS5KTTMsIGwpLCBCbFtiMl0pO1xyXG4gICAgICAgICAgICAgICAgQjJsW2IyXSA9IHYzLnN1bSh2My5zY2FsZShlcS5KTTQsIGwpLCBCMmxbYjJdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvKkJsW2IyXSA9IHY2LnN1bSh2Ni5zY2FsZShcclxuICAgICAgICAgICAgICBlcXVhdGlvbnNbaV0uQlsxXSxcclxuICAgICAgICAgICAgICAgbGFtYmRhMFtpXSksXHJcbiAgICAgICAgICAgICAgICBCbFtiMl0pKi9cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9QR1NcclxuICAgICAgICBsZXQgZmxhZyA9IHRydWU7XHJcbiAgICAgICAgbGV0IG51bUl0ZXIgPSBTT0xWRVJfSVRFUkFUSU9OU19OVU07XHJcbiAgICAgICAgY29uc3QgZGVsdGFMYW1iZGEgPSBuZXcgQXJyYXkobik7XHJcbiAgICAgICAgd2hpbGUgKG51bUl0ZXIgPiAwKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlcSA9IGVxdWF0aW9uc1tpXTtcclxuICAgICAgICAgICAgICAgIC8vY29uc3QgSiA9IGVxLl9KXHJcbiAgICAgICAgICAgICAgICBjb25zdCBiMSA9IEptYXBbaSAqIDJdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYjIgPSBKbWFwW2kgKiAyICsgMV07XHJcbiAgICAgICAgICAgICAgICAvL2RlbHRhTGFtYmRhW2ldID0gKGVxLmJpYXMgLSB2Ni5kb3QoSlswXSwgQmxbYjFdKSAtIHY2LmRvdChKWzFdLCBCbFtiMl0pKSAvIGRbaV1cclxuICAgICAgICAgICAgICAgIC8vZGVsdGFMYW1iZGFbaV0gPSAoZXEuYmlhcyAtIHYzLmRvdChlcS5KMSwgQmxbYjFdKSAtIHYzLmRvdChlcS5KMiwgQjJsW2IxXSkgLSB2My5kb3QoZXEuSjMsIEJsW2IyXSkgLSB2My5kb3QoZXEuSjQsIEIybFtiMl0pKSAvIGVxdWF0aW9uc1tpXS5lZmZNYXNzXHJcbiAgICAgICAgICAgICAgICBkZWx0YUxhbWJkYVtpXSA9IGVxLmJpYXM7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWVxLmNvbnN0cmFpbnQuYm9keTEuaXNTdGF0aWMoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbHRhTGFtYmRhW2ldIC09IHYzLmRvdChlcS5KMSwgQmxbYjFdKSArIHYzLmRvdChlcS5KMiwgQjJsW2IxXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWVxLmNvbnN0cmFpbnQuYm9keTIuaXNTdGF0aWMoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbHRhTGFtYmRhW2ldIC09IHYzLmRvdChlcS5KMywgQmxbYjJdKSArIHYzLmRvdChlcS5KNCwgQjJsW2IyXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkZWx0YUxhbWJkYVtpXSAvPSBlcS5lZmZNYXNzO1xyXG4gICAgICAgICAgICAgICAgbGFtYmRhMFtpXSA9IGxhbWJkYVtpXTtcclxuICAgICAgICAgICAgICAgIGxhbWJkYVtpXSA9IE1hdGgubWF4KGVxLmxhbWJkYU1pbiwgTWF0aC5taW4obGFtYmRhMFtpXSArIGRlbHRhTGFtYmRhW2ldLCBlcS5sYW1iZGFNYXgpKTtcclxuICAgICAgICAgICAgICAgIGRlbHRhTGFtYmRhW2ldID0gbGFtYmRhW2ldIC0gbGFtYmRhMFtpXTtcclxuICAgICAgICAgICAgICAgIC8vQmxbYjFdID0gdjYuc3VtKEJsW2IxXSwgdjYuc2NhbGUoZXEuQlswXSwgZGVsdGFMYW1iZGFbaV0pKVxyXG4gICAgICAgICAgICAgICAgQmxbYjFdID0gdjMuc3VtKHYzLnNjYWxlKGVxLkpNMSwgZGVsdGFMYW1iZGFbaV0pLCBCbFtiMV0pO1xyXG4gICAgICAgICAgICAgICAgQjJsW2IxXSA9IHYzLnN1bSh2My5zY2FsZShlcS5KTTIsIGRlbHRhTGFtYmRhW2ldKSwgQjJsW2IxXSk7XHJcbiAgICAgICAgICAgICAgICAvLyBCbFtiMl0gPSB2Ni5zdW0oQmxbYjJdLCB2Ni5zY2FsZShlcS5CWzFdLCBkZWx0YUxhbWJkYVtpXSkpXHJcbiAgICAgICAgICAgICAgICBCbFtiMl0gPSB2My5zdW0odjMuc2NhbGUoZXEuSk0zLCBkZWx0YUxhbWJkYVtpXSksIEJsW2IyXSk7XHJcbiAgICAgICAgICAgICAgICBCMmxbYjJdID0gdjMuc3VtKHYzLnNjYWxlKGVxLkpNNCwgZGVsdGFMYW1iZGFbaV0pLCBCMmxbYjJdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBudW1JdGVyLS07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChsb2cpXHJcbiAgICAgICAgICAgIERlYnVnLmRhdGEuU09MVkVSX0VSUk9SID0gbm9ybShkZWx0YUxhbWJkYSk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgZXF1YXRpb25zW2ldLmFwcGx5SW1wdWxzZShsYW1iZGFbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGFtYmRhO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlRXF1YXRpb25zKGRlbHRhVGltZSkge1xyXG4gICAgICAgIGNvbnN0IHsgZXF1YXRpb25zIH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IG4gPSBlcXVhdGlvbnMubGVuZ3RoO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGVxdWF0aW9uc1tpXS51cGRhdGVMZWZ0UGFydChkZWx0YVRpbWUpO1xyXG4gICAgICAgICAgICBlcXVhdGlvbnNbaV0udXBkYXRlUmlnaHRQYXJ0KGRlbHRhVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYXBwbHlSZXNvbHZpbmdJbXB1bHNlcyhsYW1iZGEpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbiA9IHRoaXMuZXF1YXRpb25zLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmVxdWF0aW9uc1tpXS5hcHBseUltcHVsc2UobGFtYmRhW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBhcHBseVJlc29sdmluZ1BzZXVkb0ltcHVsc2VzKGxhbWJkYSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gdGhpcy5lcXVhdGlvbnMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXF1YXRpb25zW2ldLmFwcGx5UHNldWRvSW1wdWxzZShsYW1iZGFbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5TeXN0ZW0udXNlQ2FjaGUgPSB0cnVlO1xyXG4iLCJpbXBvcnQgeyBBQUJCIH0gZnJvbSBcInJvbWFucHBwbWF0aFwiO1xyXG5jb25zdCBnZXRCb3VuZEFhYmIgPSAoYWFiYjEsIGFhYmIyKSA9PiB7XHJcbiAgICBjb25zdCB4MSA9IGFhYmIxLm1pblswXSA8IGFhYmIyLm1pblswXSA/IGFhYmIxLm1pblswXSA6IGFhYmIyLm1pblswXTtcclxuICAgIGNvbnN0IHgyID0gYWFiYjEubWF4WzBdID4gYWFiYjIubWF4WzBdID8gYWFiYjEubWF4WzBdIDogYWFiYjIubWF4WzBdO1xyXG4gICAgY29uc3QgeTEgPSBhYWJiMS5taW5bMV0gPCBhYWJiMi5taW5bMV0gPyBhYWJiMS5taW5bMV0gOiBhYWJiMi5taW5bMV07XHJcbiAgICBjb25zdCB5MiA9IGFhYmIxLm1heFsxXSA+IGFhYmIyLm1heFsxXSA/IGFhYmIxLm1heFsxXSA6IGFhYmIyLm1heFsxXTtcclxuICAgIGNvbnN0IHoxID0gYWFiYjEubWluWzJdIDwgYWFiYjIubWluWzJdID8gYWFiYjEubWluWzJdIDogYWFiYjIubWluWzJdO1xyXG4gICAgY29uc3QgejIgPSBhYWJiMS5tYXhbMl0gPiBhYWJiMi5tYXhbMl0gPyBhYWJiMS5tYXhbMl0gOiBhYWJiMi5tYXhbMl07XHJcbiAgICByZXR1cm4gbmV3IEFBQkIoW3gxLCB5MSwgejFdLCBbeDIsIHkyLCB6Ml0pO1xyXG59O1xyXG5jb25zdCBpc0NvbGxpZGUgPSAoYWFiYjEsIGFhYmIyKSA9PiB7XHJcbiAgICBpZiAoYWFiYjEubWluWzBdIDw9IGFhYmIyLm1heFswXSAmJlxyXG4gICAgICAgIGFhYmIxLm1heFswXSA+PSBhYWJiMi5taW5bMF0gJiZcclxuICAgICAgICBhYWJiMS5taW5bMV0gPD0gYWFiYjIubWF4WzFdICYmXHJcbiAgICAgICAgYWFiYjEubWF4WzFdID49IGFhYmIyLm1pblsxXSAmJlxyXG4gICAgICAgIGFhYmIxLm1pblsyXSA8PSBhYWJiMi5tYXhbMl0gJiZcclxuICAgICAgICBhYWJiMS5tYXhbMl0gPj0gYWFiYjIubWluWzJdKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcbmNvbnN0IGdldFNpemUgPSAoYWFiYikgPT4ge1xyXG4gICAgY29uc3QgYXJlYSA9IE1hdGguYWJzKGFhYmIubWF4WzBdIC0gYWFiYi5taW5bMF0pICpcclxuICAgICAgICBNYXRoLmFicyhhYWJiLm1heFsxXSAtIGFhYmIubWluWzFdKSAqXHJcbiAgICAgICAgTWF0aC5hYnMoYWFiYi5tYXhbMl0gLSBhYWJiLm1pblsyXSk7XHJcbiAgICByZXR1cm4gYXJlYTtcclxufTtcclxuY2xhc3MgTm9kZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihhYWJiLCBpc0xlYWYsIG9iamVjdCwgaWQpIHtcclxuICAgICAgICB0aGlzLmFhYmIgPSBhYWJiO1xyXG4gICAgICAgIHRoaXMuaXNMZWFmID0gaXNMZWFmO1xyXG4gICAgICAgIHRoaXMucGFyZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5sZWZ0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnJpZ2h0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmlzQ2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMub2JqZWN0ID0gb2JqZWN0O1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMDtcclxuICAgICAgICB0aGlzLnF1ZXJ5SWQgPSAwO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyZWUge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5yb290ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmVsZW1lbnRzID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIHRoaXMucXVlcnlJZCA9IDA7XHJcbiAgICAgICAgdGhpcy5nZXRJZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb25zID0gW107XHJcbiAgICB9XHJcbiAgICBzZXRLZXkoZikge1xyXG4gICAgICAgIHRoaXMuZ2V0SWQgPSBmO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlUXVlcnlJZCgpIHtcclxuICAgICAgICB0aGlzLnF1ZXJ5SWQrKztcclxuICAgIH1cclxuICAgIHNldFVuY2hlY2tlZCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMucm9vdClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IHN0YWNrID0gW3RoaXMucm9vdF07XHJcbiAgICAgICAgd2hpbGUgKHN0YWNrLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBzdGFjay5wb3AoKTtcclxuICAgICAgICAgICAgbm9kZS5pc0NoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKG5vZGUuaXNMZWFmKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobm9kZS5sZWZ0KVxyXG4gICAgICAgICAgICAgICAgc3RhY2sucHVzaChub2RlLmxlZnQpO1xyXG4gICAgICAgICAgICBpZiAobm9kZS5yaWdodClcclxuICAgICAgICAgICAgICAgIHN0YWNrLnB1c2gobm9kZS5yaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0QmVzdFNpYmxpbmcobGVhZikge1xyXG4gICAgICAgIGxldCBwb3RlbnRpYWwgPSB0aGlzLnJvb3Q7XHJcbiAgICAgICAgd2hpbGUgKCFwb3RlbnRpYWwuaXNMZWFmKSB7XHJcbiAgICAgICAgICAgIHBvdGVudGlhbC5oZWlnaHQrKztcclxuICAgICAgICAgICAgY29uc3Qgc2l6ZSA9IGdldFNpemUocG90ZW50aWFsLmFhYmIpO1xyXG4gICAgICAgICAgICBjb25zdCBjb21iaW5lZEFBQkIgPSBnZXRCb3VuZEFhYmIocG90ZW50aWFsLmFhYmIsIGxlYWYuYWFiYik7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbWJpbmVkU2l6ZSA9IGdldFNpemUoY29tYmluZWRBQUJCKTtcclxuICAgICAgICAgICAgbGV0IGNvc3QgPSBjb21iaW5lZFNpemU7XHJcbiAgICAgICAgICAgIGxldCBpbmhlckNvc3QgPSBjb21iaW5lZFNpemUgLSBzaXplO1xyXG4gICAgICAgICAgICBsZXQgY29zdDE7XHJcbiAgICAgICAgICAgIGlmIChwb3RlbnRpYWwubGVmdC5pc0xlYWYpIHtcclxuICAgICAgICAgICAgICAgIGNvc3QxID0gZ2V0U2l6ZShwb3RlbnRpYWwubGVmdC5hYWJiKSArIGluaGVyQ29zdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvc3QxID1cclxuICAgICAgICAgICAgICAgICAgICBnZXRTaXplKGdldEJvdW5kQWFiYihsZWFmLmFhYmIsIHBvdGVudGlhbC5sZWZ0LmFhYmIpKSAtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldFNpemUocG90ZW50aWFsLmxlZnQuYWFiYikgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmhlckNvc3Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGNvc3QyO1xyXG4gICAgICAgICAgICBpZiAocG90ZW50aWFsLnJpZ2h0LmlzTGVhZikge1xyXG4gICAgICAgICAgICAgICAgY29zdDIgPSBnZXRTaXplKHBvdGVudGlhbC5yaWdodC5hYWJiKSArIGluaGVyQ29zdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvc3QyID1cclxuICAgICAgICAgICAgICAgICAgICBnZXRTaXplKGdldEJvdW5kQWFiYihsZWFmLmFhYmIsIHBvdGVudGlhbC5yaWdodC5hYWJiKSkgLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRTaXplKHBvdGVudGlhbC5yaWdodC5hYWJiKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaGVyQ29zdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY29zdCA8IGNvc3QxICYmIGNvc3QgPCBjb3N0MilcclxuICAgICAgICAgICAgICAgIHJldHVybiBwb3RlbnRpYWw7XHJcbiAgICAgICAgICAgIGlmIChjb3N0MSA8IGNvc3QyKSB7XHJcbiAgICAgICAgICAgICAgICBwb3RlbnRpYWwgPSBwb3RlbnRpYWwubGVmdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBwb3RlbnRpYWwgPSBwb3RlbnRpYWwucmlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwb3RlbnRpYWw7XHJcbiAgICB9XHJcbiAgICBpbnNlcnQob2JqZWN0KSB7XHJcbiAgICAgICAgY29uc3QgYWFiYiA9IG9iamVjdC5nZXRBQUJCKCk7XHJcbiAgICAgICAgY29uc3QgaWQgPSB0aGlzLmdldElkKG9iamVjdCk7XHJcbiAgICAgICAgY29uc3QgbGVhZiA9IG5ldyBOb2RlKGFhYmIsIHRydWUsIG9iamVjdCwgaWQpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudHMuc2V0KGlkLCBsZWFmKTtcclxuICAgICAgICBpZiAodGhpcy5yb290ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm9vdCA9IGxlYWY7XHJcbiAgICAgICAgICAgIHRoaXMucm9vdC5oZWlnaHQgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLnJvb3QucGFyZW50ID0gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuIGxlYWY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHNpYmxpbmcgPSB0aGlzLmdldEJlc3RTaWJsaW5nKGxlYWYpO1xyXG4gICAgICAgIGNvbnN0IG9sZFBhcmVudCA9IHNpYmxpbmcucGFyZW50O1xyXG4gICAgICAgIGNvbnN0IG5ld1BhcmVudCA9IG5ldyBOb2RlKG51bGwsIGZhbHNlLCBudWxsLCBudWxsKTtcclxuICAgICAgICBuZXdQYXJlbnQucGFyZW50ID0gb2xkUGFyZW50O1xyXG4gICAgICAgIG5ld1BhcmVudC5hYWJiID0gZ2V0Qm91bmRBYWJiKGxlYWYuYWFiYiwgc2libGluZy5hYWJiKTtcclxuICAgICAgICBuZXdQYXJlbnQuaGVpZ2h0ID0gc2libGluZy5oZWlnaHQgKyAxO1xyXG4gICAgICAgIGlmIChvbGRQYXJlbnQpIHtcclxuICAgICAgICAgICAgaWYgKG9sZFBhcmVudC5sZWZ0ID09PSBzaWJsaW5nKVxyXG4gICAgICAgICAgICAgICAgb2xkUGFyZW50LmxlZnQgPSBuZXdQYXJlbnQ7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIG9sZFBhcmVudC5yaWdodCA9IG5ld1BhcmVudDtcclxuICAgICAgICAgICAgbmV3UGFyZW50LmxlZnQgPSBzaWJsaW5nO1xyXG4gICAgICAgICAgICBuZXdQYXJlbnQucmlnaHQgPSBsZWFmO1xyXG4gICAgICAgICAgICBzaWJsaW5nLnBhcmVudCA9IG5ld1BhcmVudDtcclxuICAgICAgICAgICAgbGVhZi5wYXJlbnQgPSBuZXdQYXJlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBuZXdQYXJlbnQubGVmdCA9IHNpYmxpbmc7XHJcbiAgICAgICAgICAgIG5ld1BhcmVudC5yaWdodCA9IGxlYWY7XHJcbiAgICAgICAgICAgIHNpYmxpbmcucGFyZW50ID0gbmV3UGFyZW50O1xyXG4gICAgICAgICAgICBsZWFmLnBhcmVudCA9IG5ld1BhcmVudDtcclxuICAgICAgICAgICAgdGhpcy5yb290ID0gbmV3UGFyZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgX25vZGUgPSBsZWFmLnBhcmVudDtcclxuICAgICAgICB3aGlsZSAoX25vZGUpIHtcclxuICAgICAgICAgICAgX25vZGUgPSB0aGlzLmJhbGFuY2UoX25vZGUpO1xyXG4gICAgICAgICAgICBfbm9kZS5oZWlnaHQgPSAxICsgTWF0aC5tYXgoX25vZGUubGVmdC5oZWlnaHQsIF9ub2RlLnJpZ2h0LmhlaWdodCk7XHJcbiAgICAgICAgICAgIF9ub2RlID0gX25vZGUucGFyZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGVhZjtcclxuICAgIH1cclxuICAgIGJhbGFuY2Uobm9kZSkge1xyXG4gICAgICAgIGlmICghbm9kZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5vZGUuaXNMZWFmIHx8IG5vZGUuaGVpZ2h0IDwgMikge1xyXG4gICAgICAgICAgICBub2RlLmFhYmIgPSBnZXRCb3VuZEFhYmIobm9kZS5sZWZ0LmFhYmIsIG5vZGUucmlnaHQuYWFiYik7XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBsZWZ0ID0gbm9kZS5sZWZ0O1xyXG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gbm9kZS5yaWdodDtcclxuICAgICAgICBjb25zdCBiYWxhbmNlID0gbm9kZS5yaWdodC5oZWlnaHQgLSBub2RlLmxlZnQuaGVpZ2h0O1xyXG4gICAgICAgIGlmIChiYWxhbmNlID4gMSkge1xyXG4gICAgICAgICAgICBjb25zdCByaWdodGxlZnQgPSByaWdodC5sZWZ0O1xyXG4gICAgICAgICAgICBjb25zdCByaWdodHJpZ2h0ID0gcmlnaHQucmlnaHQ7XHJcbiAgICAgICAgICAgIHJpZ2h0LmxlZnQgPSBub2RlO1xyXG4gICAgICAgICAgICByaWdodC5wYXJlbnQgPSBub2RlLnBhcmVudDtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSByaWdodDtcclxuICAgICAgICAgICAgaWYgKHJpZ2h0LnBhcmVudCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmlnaHQucGFyZW50LmxlZnQgPT09IG5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByaWdodC5wYXJlbnQubGVmdCA9IHJpZ2h0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQucGFyZW50LnJpZ2h0ID0gcmlnaHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5yb290ID0gcmlnaHQ7XHJcbiAgICAgICAgICAgIGlmIChyaWdodC5sZWZ0LmhlaWdodCA+IHJpZ2h0cmlnaHQuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICByaWdodC5yaWdodCA9IHJpZ2h0bGVmdDtcclxuICAgICAgICAgICAgICAgIG5vZGUucmlnaHQgPSByaWdodHJpZ2h0O1xyXG4gICAgICAgICAgICAgICAgcmlnaHRyaWdodC5wYXJlbnQgPSBub2RlO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5oZWlnaHQgPSAxICsgTWF0aC5tYXgobGVmdC5oZWlnaHQsIHJpZ2h0cmlnaHQuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIHJpZ2h0LmhlaWdodCA9IDEgKyBNYXRoLm1heChub2RlLmhlaWdodCwgcmlnaHRsZWZ0LmhlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLnJpZ2h0ID0gcmlnaHRsZWZ0O1xyXG4gICAgICAgICAgICAgICAgcmlnaHRsZWZ0LnBhcmVudCA9IG5vZGU7XHJcbiAgICAgICAgICAgICAgICBub2RlLmhlaWdodCA9IDEgKyBNYXRoLm1heChsZWZ0LmhlaWdodCwgcmlnaHRsZWZ0LmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICByaWdodC5oZWlnaHQgPSAxICsgTWF0aC5tYXgobm9kZS5oZWlnaHQsIHJpZ2h0cmlnaHQuaGVpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBub2RlLmFhYmIgPSBnZXRCb3VuZEFhYmIobm9kZS5sZWZ0LmFhYmIsIG5vZGUucmlnaHQuYWFiYik7XHJcbiAgICAgICAgICAgIHJpZ2h0LmFhYmIgPSBnZXRCb3VuZEFhYmIocmlnaHQubGVmdC5hYWJiLCByaWdodC5yaWdodC5hYWJiKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYmFsYW5jZSA8IC0xKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxlZnRsZWZ0ID0gbGVmdC5sZWZ0O1xyXG4gICAgICAgICAgICBjb25zdCBsZWZ0cmlnaHQgPSBsZWZ0LnJpZ2h0O1xyXG4gICAgICAgICAgICBsZWZ0LmxlZnQgPSBub2RlO1xyXG4gICAgICAgICAgICBsZWZ0LnBhcmVudCA9IG5vZGUucGFyZW50O1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IGxlZnQ7XHJcbiAgICAgICAgICAgIGlmIChsZWZ0LnBhcmVudCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGVmdC5wYXJlbnQubGVmdCA9PT0gbm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQucGFyZW50LmxlZnQgPSBsZWZ0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdC5wYXJlbnQucmlnaHQgPSBsZWZ0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMucm9vdCA9IGxlZnQ7XHJcbiAgICAgICAgICAgIGlmIChsZWZ0bGVmdC5oZWlnaHQgPiBsZWZ0cmlnaHQuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICBsZWZ0LnJpZ2h0ID0gbGVmdGxlZnQ7XHJcbiAgICAgICAgICAgICAgICBub2RlLmxlZnQgPSBsZWZ0cmlnaHQ7XHJcbiAgICAgICAgICAgICAgICBsZWZ0cmlnaHQucGFyZW50ID0gbm9kZTtcclxuICAgICAgICAgICAgICAgIG5vZGUuaGVpZ2h0ID0gMSArIE1hdGgubWF4KHJpZ2h0LmhlaWdodCwgbGVmdHJpZ2h0LmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBsZWZ0LmhlaWdodCA9IDEgKyBNYXRoLm1heChub2RlLmhlaWdodCwgbGVmdGxlZnQuaGVpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxlZnQucmlnaHQgPSBsZWZ0cmlnaHQ7XHJcbiAgICAgICAgICAgICAgICBub2RlLmxlZnQgPSBsZWZ0bGVmdDtcclxuICAgICAgICAgICAgICAgIGxlZnRsZWZ0LnBhcmVudCA9IG5vZGU7XHJcbiAgICAgICAgICAgICAgICBub2RlLmhlaWdodCA9IDEgKyBNYXRoLm1heChyaWdodC5oZWlnaHQsIGxlZnRsZWZ0LmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBsZWZ0LmhlaWdodCA9IDEgKyBNYXRoLm1heChub2RlLmhlaWdodCwgbGVmdHJpZ2h0LmhlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbm9kZS5hYWJiID0gZ2V0Qm91bmRBYWJiKG5vZGUubGVmdC5hYWJiLCBub2RlLnJpZ2h0LmFhYmIpO1xyXG4gICAgICAgICAgICBsZWZ0LmFhYmIgPSBnZXRCb3VuZEFhYmIobGVmdC5sZWZ0LmFhYmIsIGxlZnQucmlnaHQuYWFiYik7XHJcbiAgICAgICAgICAgIHJldHVybiBsZWZ0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBub2RlLmFhYmIgPSBnZXRCb3VuZEFhYmIobm9kZS5sZWZ0LmFhYmIsIG5vZGUucmlnaHQuYWFiYik7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcbiAgICBnZXRDb2xsaXNpb25zKG9iamVjdCkge1xyXG4gICAgICAgIGNvbnN0IGFhYmIgPSBvYmplY3QuZ2V0QUFCQigpO1xyXG4gICAgICAgIGNvbnN0IGNvbHMgPSBbXTtcclxuICAgICAgICAvLyB0aGlzLmVsZW1lbnRzLmdldCh0aGlzLmdldElkKG9iamVjdCkpLnF1ZXJ5SWQgPSB0aGlzLnF1ZXJ5SWRcclxuICAgICAgICBjb25zdCBpdGVyID0gKF9ub2RlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghX25vZGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoX25vZGUub2JqZWN0ID09PSBvYmplY3QpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaXNDb2xsaWRlKGFhYmIsIF9ub2RlLmFhYmIpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoX25vZGUuaXNMZWFmICYmICFfbm9kZS5pc0NoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xzLnB1c2goX25vZGUub2JqZWN0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGl0ZXIoX25vZGUubGVmdCk7XHJcbiAgICAgICAgICAgICAgICBpdGVyKF9ub2RlLnJpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaXRlcih0aGlzLnJvb3QpO1xyXG4gICAgICAgIHJldHVybiBjb2xzO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlKGlkKSB7XHJcbiAgICAgICAgY29uc3QgbGVhZiA9IHRoaXMuZWxlbWVudHMuZ2V0KGlkKTtcclxuICAgICAgICBpZiAoIWxlYWYpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZiAobGVhZiA9PT0gdGhpcy5yb290KSB7XHJcbiAgICAgICAgICAgIHRoaXMucm9vdCA9IG51bGw7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcGFyZW50ID0gbGVhZi5wYXJlbnQ7XHJcbiAgICAgICAgY29uc3QgZ3JhbmRQYXJlbnQgPSBwYXJlbnQucGFyZW50O1xyXG4gICAgICAgIGxldCBzaWJsaW5nO1xyXG4gICAgICAgIGlmIChwYXJlbnQubGVmdCA9PT0gbGVhZilcclxuICAgICAgICAgICAgc2libGluZyA9IHBhcmVudC5yaWdodDtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHNpYmxpbmcgPSBwYXJlbnQubGVmdDtcclxuICAgICAgICBpZiAoZ3JhbmRQYXJlbnQpIHtcclxuICAgICAgICAgICAgaWYgKGdyYW5kUGFyZW50LmxlZnQgPT09IHBhcmVudClcclxuICAgICAgICAgICAgICAgIGdyYW5kUGFyZW50LmxlZnQgPSBzaWJsaW5nO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBncmFuZFBhcmVudC5yaWdodCA9IHNpYmxpbmc7XHJcbiAgICAgICAgICAgIHNpYmxpbmcucGFyZW50ID0gZ3JhbmRQYXJlbnQ7XHJcbiAgICAgICAgICAgIGxldCBfbm9kZSA9IGdyYW5kUGFyZW50O1xyXG4gICAgICAgICAgICB3aGlsZSAoX25vZGUpIHtcclxuICAgICAgICAgICAgICAgIF9ub2RlID0gdGhpcy5iYWxhbmNlKF9ub2RlKTtcclxuICAgICAgICAgICAgICAgIF9ub2RlLmhlaWdodCA9IDEgKyBNYXRoLm1heChfbm9kZS5yaWdodC5oZWlnaHQsIF9ub2RlLmxlZnQuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIF9ub2RlID0gX25vZGUucGFyZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJvb3QgPSBzaWJsaW5nO1xyXG4gICAgICAgICAgICBzaWJsaW5nLnBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZWxlbWVudHMuZGVsZXRlKGlkKTtcclxuICAgIH1cclxuICAgIHRvQXJyYXkobm9kZSkge1xyXG4gICAgICAgIGNvbnN0IGl0ZXIgPSAobGVhZikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWxlYWYpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChsZWFmLmlzTGVhZilcclxuICAgICAgICAgICAgICAgIHJldHVybiBsZWFmLmlkO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW2l0ZXIobGVhZi5sZWZ0KSwgaXRlcihsZWFmLnJpZ2h0KV07XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAoIW5vZGUpXHJcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLnJvb3Q7XHJcbiAgICAgICAgcmV0dXJuIGl0ZXIobm9kZSk7XHJcbiAgICB9XHJcbiAgICBfZ2V0Q29sbGlzaW9ucygpIHtcclxuICAgICAgICB0aGlzLmNvbGxpc2lvbnMgPSBbXTtcclxuICAgICAgICBpZiAoIXRoaXMucm9vdCB8fCB0aGlzLnJvb3QuaXNMZWFmKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb2xsaXNpb25zO1xyXG4gICAgICAgIHRoaXMuc2V0VW5jaGVja2VkKCk7XHJcbiAgICAgICAgdGhpcy5fZ2V0Q29sbGlzaW9uc0hlbHBlcih0aGlzLnJvb3QubGVmdCwgdGhpcy5yb290LnJpZ2h0KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb2xsaXNpb25zO1xyXG4gICAgfVxyXG4gICAgX2dldENvbGxpc2lvbnNIZWxwZXIobm9kZTEsIG5vZGUyKSB7XHJcbiAgICAgICAgaWYgKG5vZGUxLmlzTGVhZikge1xyXG4gICAgICAgICAgICBpZiAobm9kZTIuaXNMZWFmKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNDb2xsaWRlKG5vZGUxLmFhYmIsIG5vZGUyLmFhYmIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xsaXNpb25zLnB1c2goW25vZGUxLm9iamVjdCwgbm9kZTIub2JqZWN0XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyb3NzQ2hpbGRyZW4obm9kZTIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2V0Q29sbGlzaW9uc0hlbHBlcihub2RlMSwgbm9kZTIucmlnaHQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2V0Q29sbGlzaW9uc0hlbHBlcihub2RlMSwgbm9kZTIubGVmdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChub2RlMi5pc0xlYWYpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3Jvc3NDaGlsZHJlbihub2RlMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9nZXRDb2xsaXNpb25zSGVscGVyKG5vZGUxLnJpZ2h0LCBub2RlMik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9nZXRDb2xsaXNpb25zSGVscGVyKG5vZGUxLmxlZnQsIG5vZGUyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3Jvc3NDaGlsZHJlbihub2RlMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyb3NzQ2hpbGRyZW4obm9kZTIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2V0Q29sbGlzaW9uc0hlbHBlcihub2RlMS5yaWdodCwgbm9kZTIucmlnaHQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2V0Q29sbGlzaW9uc0hlbHBlcihub2RlMS5sZWZ0LCBub2RlMi5sZWZ0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2dldENvbGxpc2lvbnNIZWxwZXIobm9kZTEucmlnaHQsIG5vZGUyLmxlZnQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2V0Q29sbGlzaW9uc0hlbHBlcihub2RlMS5sZWZ0LCBub2RlMi5yaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjcm9zc0NoaWxkcmVuKG5vZGUpIHtcclxuICAgICAgICBpZiAoIW5vZGUuaXNDaGVja2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2dldENvbGxpc2lvbnNIZWxwZXIobm9kZS5yaWdodCwgbm9kZS5sZWZ0KTtcclxuICAgICAgICAgICAgbm9kZS5pc0NoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJjb25zdCBpc0luc2lkZSA9IChwMSwgcDIsIHEpID0+IHtcclxuICAgIGNvbnN0IFIgPSAocDJbMF0gLSBwMVswXSkgKiAocVsxXSAtIHAxWzFdKSAtIChwMlsxXSAtIHAxWzFdKSAqIChxWzBdIC0gcDFbMF0pO1xyXG4gICAgcmV0dXJuIFIgPD0gMCArIDAuMDAxO1xyXG59O1xyXG5jb25zdCBkb3QgPSAoYSwgYikgPT4gYVswXSAqIGJbMF0gKyBhWzFdICogYlsxXTtcclxuY29uc3QgaXNJbkNsb2Nrd2lzZSA9IChwb2ludHMpID0+IHtcclxuICAgIGlmIChwb2ludHMubGVuZ3RoIDwgMylcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIGNvbnN0IFtwMSwgcDIsIHAzXSA9IHBvaW50cztcclxuICAgIGNvbnN0IGRldCA9IHAyWzBdICogcDNbMV0gK1xyXG4gICAgICAgIHAzWzBdICogcDFbMV0gK1xyXG4gICAgICAgIHAxWzBdICogcDJbMV0gLVxyXG4gICAgICAgIHAxWzBdICogcDFbMV0gLVxyXG4gICAgICAgIHAzWzBdICogcDJbMV0gLVxyXG4gICAgICAgIHAxWzBdICogcDNbMV07XHJcbiAgICBpZiAoZGV0IDwgMClcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIHJldHVybiAtMTtcclxufTtcclxuY29uc3QgY29tcHV0ZUludGVyc2VjdGlvbiA9IChwMSwgcDIsIHAzLCBwNCkgPT4ge1xyXG4gICAgaWYgKHAyWzBdIC0gcDFbMF0gPT09IDApIHtcclxuICAgICAgICBjb25zdCB4ID0gcDFbMF07XHJcbiAgICAgICAgY29uc3QgbTIgPSAocDRbMV0gLSBwM1sxXSkgLyAocDRbMF0gLSBwM1swXSk7XHJcbiAgICAgICAgY29uc3QgYjIgPSBwM1sxXSAtIG0yICogcDNbMF07XHJcbiAgICAgICAgY29uc3QgeSA9IG0yICogeCArIGIyO1xyXG4gICAgICAgIHJldHVybiBbeCwgeV07XHJcbiAgICB9XHJcbiAgICBpZiAocDRbMF0gLSBwM1swXSA9PT0gMCkge1xyXG4gICAgICAgIGNvbnN0IHggPSBwM1swXTtcclxuICAgICAgICBjb25zdCBtMSA9IChwMlsxXSAtIHAxWzFdKSAvIChwMlswXSAtIHAxWzBdKTtcclxuICAgICAgICBjb25zdCBiMSA9IHAxWzFdIC0gbTEgKiBwMVswXTtcclxuICAgICAgICBjb25zdCB5ID0gbTEgKiB4ICsgYjE7XHJcbiAgICAgICAgcmV0dXJuIFt4LCB5XTtcclxuICAgIH1cclxuICAgIGNvbnN0IG0xID0gKHAyWzFdIC0gcDFbMV0pIC8gKHAyWzBdIC0gcDFbMF0pO1xyXG4gICAgY29uc3QgYjEgPSBwMVsxXSAtIG0xICogcDFbMF07XHJcbiAgICBjb25zdCBtMiA9IChwNFsxXSAtIHAzWzFdKSAvIChwNFswXSAtIHAzWzBdKTtcclxuICAgIGNvbnN0IGIyID0gcDNbMV0gLSBtMiAqIHAzWzBdO1xyXG4gICAgY29uc3QgeCA9IChiMiAtIGIxKSAvIChtMSAtIG0yKTtcclxuICAgIGNvbnN0IHkgPSBtMSAqIHggKyBiMTtcclxuICAgIHJldHVybiBbeCwgeV07XHJcbn07XHJcbmNvbnN0IGNsaXBQb2x5VnNQb2x5ID0gKEEsIEIpID0+IHtcclxuICAgIGxldCByZXN1bHQgPSBbLi4uQV07XHJcbiAgICBmb3IgKGxldCBpID0gMCwgbiA9IEIubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgbmV4dCA9IFsuLi5yZXN1bHRdO1xyXG4gICAgICAgIHJlc3VsdCA9IFtdO1xyXG4gICAgICAgIGNvbnN0IGFFZGdlMSA9IEIuYXQoaSAtIDEpO1xyXG4gICAgICAgIGNvbnN0IGFFZGdlMiA9IEIuYXQoaSk7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDAsIF9uID0gbmV4dC5sZW5ndGg7IGogPCBfbjsgaisrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJFZGdlMSA9IG5leHQuYXQoaiAtIDEpO1xyXG4gICAgICAgICAgICBjb25zdCBiRWRnZTIgPSBuZXh0LmF0KGopO1xyXG4gICAgICAgICAgICBpZiAoaXNJbnNpZGUoYUVkZ2UxLCBhRWRnZTIsIGJFZGdlMikpIHtcclxuICAgICAgICAgICAgICAgIGlmICghaXNJbnNpZGUoYUVkZ2UxLCBhRWRnZTIsIGJFZGdlMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbnRlcnNlY3Rpb24gPSBjb21wdXRlSW50ZXJzZWN0aW9uKGJFZGdlMSwgYkVkZ2UyLCBhRWRnZTEsIGFFZGdlMik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goaW50ZXJzZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGJFZGdlMik7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaXNJbnNpZGUoYUVkZ2UxLCBhRWRnZTIsIGJFZGdlMSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGludGVyc2VjdGlvbiA9IGNvbXB1dGVJbnRlcnNlY3Rpb24oYkVkZ2UxLCBiRWRnZTIsIGFFZGdlMSwgYUVkZ2UyKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGludGVyc2VjdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5jb25zdCBsZXJwID0gKGEsIGIsIHQpID0+IGEgKyAoYiAtIGEpICogdDtcclxuY29uc3QgY2xpcFNlZ21lbnRWc1NlZ21lbnQgPSAoczEsIHMyKSA9PiB7XHJcbiAgICBjb25zdCBbcDEsIHAyXSA9IHMxO1xyXG4gICAgY29uc3QgW3AzLCBwNF0gPSBzMjtcclxuICAgIGNvbnN0IHRvcCA9IChwNFswXSAtIHAzWzBdKSAqIChwMVsxXSAtIHAzWzFdKSAtIChwNFsxXSAtIHAzWzFdKSAqIChwMVswXSAtIHAzWzBdKTtcclxuICAgIGNvbnN0IGJvdHRvbSA9IChwNFsxXSAtIHAzWzFdKSAqIChwMlswXSAtIHAxWzBdKSAtIChwNFswXSAtIHAzWzBdKSAqIChwMlsxXSAtIHAxWzFdKTtcclxuICAgIGlmICghYm90dG9tKVxyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIGNvbnN0IHQgPSB0b3AgLyBib3R0b207XHJcbiAgICBpZiAodCA8IDAgfHwgdCA+IDEpXHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgcmV0dXJuIFtbbGVycChwMVswXSwgcDJbMF0sIHQpLCBsZXJwKHAxWzFdLCBwMlsxXSwgdCldXTtcclxufTtcclxuY29uc3QgY2xpcFBvaW50VnNQb2x5ID0gKHBvaW50LCB2ZXJ0aWNlcykgPT4ge1xyXG4gICAgY29uc3QgeCA9IHBvaW50WzBdO1xyXG4gICAgY29uc3QgeSA9IHBvaW50WzFdO1xyXG4gICAgbGV0IGluc2lkZSA9IGZhbHNlO1xyXG4gICAgZm9yIChsZXQgaSA9IDAsIGogPSB2ZXJ0aWNlcy5sZW5ndGggLSAxOyBpIDwgdmVydGljZXMubGVuZ3RoOyBqID0gaSsrKSB7XHJcbiAgICAgICAgY29uc3QgeGkgPSB2ZXJ0aWNlc1tpXVswXSwgeWkgPSB2ZXJ0aWNlc1tpXVsxXTtcclxuICAgICAgICBjb25zdCB4aiA9IHZlcnRpY2VzW2pdWzBdLCB5aiA9IHZlcnRpY2VzW2pdWzFdO1xyXG4gICAgICAgIGNvbnN0IGludGVyc2VjdCA9IHlpID4geSAhPSB5aiA+IHkgJiYgeCA8ICgoeGogLSB4aSkgKiAoeSAtIHlpKSkgLyAoeWogLSB5aSkgKyB4aTtcclxuICAgICAgICBpZiAoaW50ZXJzZWN0KVxyXG4gICAgICAgICAgICBpbnNpZGUgPSAhaW5zaWRlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFtwb2ludF07XHJcbn07XHJcbmNvbnN0IGNsaXBTZWdtZW50VnNQb2x5ID0gKHNlZ21lbnQsIHBvbHkpID0+IHtcclxuICAgIGNvbnN0IFtwMSwgcDJdID0gc2VnbWVudDtcclxuICAgIGNvbnN0IHBvaW50cyA9IFtdO1xyXG4gICAgaWYgKGNsaXBQb2ludFZzUG9seShwMSwgcG9seSkpXHJcbiAgICAgICAgcG9pbnRzLnB1c2gocDEpO1xyXG4gICAgaWYgKGNsaXBQb2ludFZzUG9seShwMiwgcG9seSkpXHJcbiAgICAgICAgcG9pbnRzLnB1c2gocDIpO1xyXG4gICAgaWYgKHBvaW50cy5sZW5ndGggPiAxKVxyXG4gICAgICAgIHJldHVybiBwb2ludHM7XHJcbiAgICBmb3IgKGxldCBpID0gMCwgbiA9IHBvbHkubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgcTEgPSBwb2x5LmF0KGkgLSAxKTtcclxuICAgICAgICBjb25zdCBxMiA9IHBvbHkuYXQoaSk7XHJcbiAgICAgICAgY29uc3QgaW50ZXJzZWN0aW9uID0gY2xpcFNlZ21lbnRWc1NlZ21lbnQoW3AxLCBwMl0sIFtxMSwgcTJdKTtcclxuICAgICAgICBpZiAoaW50ZXJzZWN0aW9uLmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKGludGVyc2VjdGlvblswXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcG9pbnRzO1xyXG59O1xyXG5jb25zdCBwYWlySGFzaCA9ICh4LCB5KSA9PiB4ID09PSBNYXRoLm1heCh4LCB5KSA/IHggKiB4ICsgeSArIHggOiB5ICogeCArIHk7XHJcbmNvbnN0IFBPTFkgPSAzO1xyXG5jb25zdCBTRUdNRU5UID0gMjtcclxuY29uc3QgUE9JTlQgPSAxO1xyXG5jb25zdCBmYWNlVHlwZU1hcCA9IHt9O1xyXG5mYWNlVHlwZU1hcFtwYWlySGFzaChQT0xZLCBQT0xZKV0gPSBjbGlwUG9seVZzUG9seTtcclxuZmFjZVR5cGVNYXBbcGFpckhhc2goU0VHTUVOVCwgUE9MWSldID0gY2xpcFNlZ21lbnRWc1BvbHk7XHJcbmZhY2VUeXBlTWFwW3BhaXJIYXNoKFNFR01FTlQsIFNFR01FTlQpXSA9IGNsaXBTZWdtZW50VnNTZWdtZW50O1xyXG5mYWNlVHlwZU1hcFtwYWlySGFzaChQT0lOVCwgUE9MWSldID0gKGZhY2UxLCBmYWNlMikgPT4gY2xpcFBvaW50VnNQb2x5KGZhY2UxWzBdLCBmYWNlMik7XHJcbmZ1bmN0aW9uIGNsaXBGYWNlVnNGYWNlKGZhY2UxLCBmYWNlMikge1xyXG4gICAgY29uc3QgdHlwZTEgPSBNYXRoLm1pbihmYWNlMS5sZW5ndGgsIFBPTFkpO1xyXG4gICAgY29uc3QgdHlwZTIgPSBNYXRoLm1pbihmYWNlMi5sZW5ndGgsIFBPTFkpO1xyXG4gICAgbGV0IGFyZ3MgPSBbZmFjZTEsIGZhY2UyXTtcclxuICAgIGlmICh0eXBlMSA+IHR5cGUyKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhY2VUeXBlTWFwW3BhaXJIYXNoKHR5cGUyLCB0eXBlMSldKGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzBdKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWNlVHlwZU1hcFtwYWlySGFzaCh0eXBlMSwgdHlwZTIpXShhcmd1bWVudHNbMF0sIGFyZ3VtZW50c1sxXSk7XHJcbn1cclxuZXhwb3J0IHsgY2xpcFNlZ21lbnRWc1NlZ21lbnQsIGlzSW5zaWRlLCBjb21wdXRlSW50ZXJzZWN0aW9uLCBjbGlwUG9seVZzUG9seSwgY2xpcEZhY2VWc0ZhY2UsIGlzSW5DbG9ja3dpc2UsIGNsaXBTZWdtZW50VnNQb2x5LCBjbGlwUG9pbnRWc1BvbHksIH07XHJcbiIsImNvbnN0IGNvbmZpZyA9IHtcclxuICAgIFJJR0lEX0JPRFlfTU9WRV9UUkVTSE9MRDogMC4wMDUsXHJcbiAgICBSSUdJRF9CT0RZX0FBQkJfQklBUzogMC4xMSxcclxuICAgIENMSVBfQklBUzogMC4wMDEsXHJcbiAgICBHSktfTUFYX0lURVJBVElPTlNfTlVNOiA2NCxcclxuICAgIEVQQV9CSUFTOiAwLjAwMDAxLFxyXG4gICAgQ09OVEFDVF9CSUFTOiAwLjEyNSxcclxuICAgIENPTlRBQ1RfVFJFU0hPTEQ6IDAuMDUsXHJcbiAgICBDT05UQUNUX01BTklGT0xEX0tFRVBfVFJFU0hPTEQ6IDAuMDAxLFxyXG4gICAgU09MVkVSX0lURVJBVElPTlNfTlVNOiAxOCxcclxuICAgIFVTRV9DT05UQUNUX0NBQ0hFOiBmYWxzZVxyXG59O1xyXG53aW5kb3cuY29uZmlnID0gY29uZmlnO1xyXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XHJcbiIsImltcG9ydCB7IHYzLCBtMyB9IGZyb20gXCJyb21hbnBwcG1hdGhcIjtcclxuaW1wb3J0IHsgY2xpcEZhY2VWc0ZhY2UsIGlzSW5DbG9ja3dpc2UgfSBmcm9tIFwiLi9jbGlwcGluZ1wiO1xyXG5jb25zdCB7IGRvdCwgY3Jvc3MsIG5vcm1hbGl6ZSwgc3VtLCBkaWZmLCBzY2FsZSwgaXNOdWxsLCBub3JtIH0gPSB2MztcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi9jb25maWdcIjtcclxuY29uc3QgeyBDTElQX0JJQVMsIEdKS19NQVhfSVRFUkFUSU9OU19OVU0sIEVQQV9CSUFTIH0gPSBjb25maWc7XHJcbmNvbnN0IHJheVZzUGxhbmVJbnRlcnNlYyA9IChwbGFuZSwgcG9pbnQsIGRpcmVjdGlvbikgPT4ge1xyXG4gICAgY29uc3QgW29yaWdpbiwgbm9ybWFsXSA9IHBsYW5lO1xyXG4gICAgY29uc3QgX2RvdCA9IGRvdChub3JtYWwsIGRpcmVjdGlvbik7XHJcbiAgICBjb25zdCBmcm9tUG9pbnRUb09yaWdpbiA9IGRpZmYocG9pbnQsIG9yaWdpbik7XHJcbiAgICBjb25zdCBmYWMgPSBkb3QoZnJvbVBvaW50VG9PcmlnaW4sIG5vcm1hbCkgLyBfZG90O1xyXG4gICAgcmV0dXJuIGRpZmYocG9pbnQsIHNjYWxlKGRpcmVjdGlvbiwgZmFjKSk7XHJcbn07XHJcbmNvbnN0IGlzUG9pbnRCZWhpbmRQbGFuZSA9IChwbGFuZSwgcG9pbnQsIHNpZ24gPSAxKSA9PiB7XHJcbiAgICBjb25zdCBbb3JpZ2luLCBub3JtYWxdID0gcGxhbmU7XHJcbiAgICBsZXQgX2QgPSBkb3Qobm9ybWFsLCBkaWZmKHBvaW50LCBvcmlnaW4pKSAqIHNpZ247XHJcbiAgICByZXR1cm4gX2QgPiAwIC0gQ0xJUF9CSUFTO1xyXG59O1xyXG5jb25zdCBwb2ludE9uUGxhbmVQcm9qZWN0aW9uID0gKHBsYW5lLCBwb2ludCkgPT4ge1xyXG4gICAgY29uc3QgW29yaWdpbiwgbm9ybWFsXSA9IHBsYW5lO1xyXG4gICAgY29uc3QgZnJvbVBvaW50VG9PcmlnaW4gPSBkaWZmKHBvaW50LCBvcmlnaW4pO1xyXG4gICAgY29uc3QgcHJvakFsb25nTm9ybWFsID0gZG90KG5vcm1hbCwgZnJvbVBvaW50VG9PcmlnaW4pO1xyXG4gICAgcmV0dXJuIGRpZmYocG9pbnQsIHNjYWxlKG5vcm1hbCwgcHJvakFsb25nTm9ybWFsKSk7XHJcbn07XHJcbmNvbnN0IGNsaXBQb2ludHNCZWhpbmRQbGFuZSA9IChwbGFuZSwgcG9pbnRzLCBzaWduID0gMSkgPT4ge1xyXG4gICAgY29uc3QgW29yaWdpbiwgbm9ybWFsXSA9IHBsYW5lO1xyXG4gICAgcmV0dXJuIHBvaW50cy5maWx0ZXIoKHBvaW50KSA9PiBkb3Qobm9ybWFsLCBkaWZmKHBvaW50LCBvcmlnaW4pKSAqIHNpZ24gKyBDTElQX0JJQVMgPiAwKTtcclxufTtcclxuY29uc3QgZ2V0MkRjb29yZHNPblBsYW5lID0gKGksIGosIHBvaW50KSA9PiB7XHJcbiAgICByZXR1cm4gW2RvdChpLCBwb2ludCksIGRvdChqLCBwb2ludCldO1xyXG59O1xyXG5mdW5jdGlvbiB1cGRhdGVfc2ltcGxleDMocHJvcHMpIHtcclxuICAgIGNvbnN0IG4gPSBjcm9zcyhkaWZmKHByb3BzLmIsIHByb3BzLmEpLCBkaWZmKHByb3BzLmMsIHByb3BzLmEpKTtcclxuICAgIGNvbnN0IEFPID0gc2NhbGUocHJvcHMuYSwgLTEpO1xyXG4gICAgcHJvcHMuc2ltcF9kaW0gPSAyO1xyXG4gICAgaWYgKGRvdChjcm9zcyhkaWZmKHByb3BzLmIsIHByb3BzLmEpLCBuKSwgQU8pID4gMCkge1xyXG4gICAgICAgIHByb3BzLmMgPSBwcm9wcy5hO1xyXG4gICAgICAgIHByb3BzLnNlYXJjaF9kaXIgPSBjcm9zcyhjcm9zcyhkaWZmKHByb3BzLmIsIHByb3BzLmEpLCBBTyksIGRpZmYocHJvcHMuYiwgcHJvcHMuYSkpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChkb3QoY3Jvc3MobiwgZGlmZihwcm9wcy5jLCBwcm9wcy5hKSksIEFPKSA+IDApIHtcclxuICAgICAgICBwcm9wcy5iID0gcHJvcHMuYTtcclxuICAgICAgICBwcm9wcy5zZWFyY2hfZGlyID0gY3Jvc3MoY3Jvc3MoZGlmZihwcm9wcy5jLCBwcm9wcy5hKSwgQU8pLCBkaWZmKHByb3BzLmMsIHByb3BzLmEpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBwcm9wcy5zaW1wX2RpbSA9IDM7XHJcbiAgICBpZiAoZG90KG4sIEFPKSA+IDApIHtcclxuICAgICAgICBwcm9wcy5kID0gcHJvcHMuYztcclxuICAgICAgICBwcm9wcy5jID0gcHJvcHMuYjtcclxuICAgICAgICBwcm9wcy5iID0gcHJvcHMuYTtcclxuICAgICAgICBwcm9wcy5zZWFyY2hfZGlyID0gbjtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBwcm9wcy5kID0gcHJvcHMuYjtcclxuICAgIHByb3BzLmIgPSBwcm9wcy5hO1xyXG4gICAgcHJvcHMuc2VhcmNoX2RpciA9IHNjYWxlKG4sIC0xKTtcclxuICAgIHJldHVybjtcclxufVxyXG5mdW5jdGlvbiB1cGRhdGVfc2ltcGxleDQocHJvcHMpIHtcclxuICAgIGNvbnN0IEFCQyA9IGNyb3NzKGRpZmYocHJvcHMuYiwgcHJvcHMuYSksIGRpZmYocHJvcHMuYywgcHJvcHMuYSkpO1xyXG4gICAgY29uc3QgQUNEID0gY3Jvc3MoZGlmZihwcm9wcy5jLCBwcm9wcy5hKSwgZGlmZihwcm9wcy5kLCBwcm9wcy5hKSk7XHJcbiAgICBjb25zdCBBREIgPSBjcm9zcyhkaWZmKHByb3BzLmQsIHByb3BzLmEpLCBkaWZmKHByb3BzLmIsIHByb3BzLmEpKTtcclxuICAgIGNvbnN0IEFPID0gc2NhbGUocHJvcHMuYSwgLTEpO1xyXG4gICAgcHJvcHMuc2ltcF9kaW0gPSAzO1xyXG4gICAgaWYgKGRvdChBQkMsIEFPKSA+IDApIHtcclxuICAgICAgICBwcm9wcy5kID0gcHJvcHMuYztcclxuICAgICAgICBwcm9wcy5jID0gcHJvcHMuYjtcclxuICAgICAgICBwcm9wcy5iID0gcHJvcHMuYTtcclxuICAgICAgICBwcm9wcy5zZWFyY2hfZGlyID0gQUJDO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChkb3QoQUNELCBBTykgPiAwKSB7XHJcbiAgICAgICAgcHJvcHMuYiA9IHByb3BzLmE7XHJcbiAgICAgICAgcHJvcHMuc2VhcmNoX2RpciA9IEFDRDtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoZG90KEFEQiwgQU8pID4gMCkge1xyXG4gICAgICAgIHByb3BzLmMgPSBwcm9wcy5kO1xyXG4gICAgICAgIHByb3BzLmQgPSBwcm9wcy5iO1xyXG4gICAgICAgIHByb3BzLmIgPSBwcm9wcy5hO1xyXG4gICAgICAgIHByb3BzLnNlYXJjaF9kaXIgPSBBREI7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuZnVuY3Rpb24gZ2prKGNvbGwxLCBjb2xsMikge1xyXG4gICAgY29uc3QgcHJvcHMgPSB7XHJcbiAgICAgICAgYTogWzAsIDAsIDBdLFxyXG4gICAgICAgIGI6IFswLCAwLCAwXSxcclxuICAgICAgICBjOiBbMCwgMCwgMF0sXHJcbiAgICAgICAgZDogWzAsIDAsIDBdLFxyXG4gICAgICAgIHNlYXJjaF9kaXI6IFswLCAwLCAwXSxcclxuICAgICAgICBzaW1wX2RpbTogMCxcclxuICAgIH07XHJcbiAgICBjb25zdCBvcmlnaW5zTWFwID0gbmV3IE1hcCgpO1xyXG4gICAgbGV0IG10diA9IFswLCAwLCAwXTtcclxuICAgIHByb3BzLnNlYXJjaF9kaXIgPSBkaWZmKGNvbGwxLmdldFRyYW5zbGF0aW9uKCksIGNvbGwyLmdldFRyYW5zbGF0aW9uKCkpO1xyXG4gICAgY29uc3QgY19vcmlnaW4xID0gY29sbDEuc3VwcG9ydChzY2FsZShwcm9wcy5zZWFyY2hfZGlyLCAtMSkpO1xyXG4gICAgY29uc3QgY19vcmlnaW4yID0gY29sbDIuc3VwcG9ydChwcm9wcy5zZWFyY2hfZGlyKTtcclxuICAgIHByb3BzLmMgPSBkaWZmKGNfb3JpZ2luMiwgY19vcmlnaW4xKTtcclxuICAgIG9yaWdpbnNNYXAuc2V0KHByb3BzLmMsIFtjX29yaWdpbjEsIGNfb3JpZ2luMl0pO1xyXG4gICAgcHJvcHMuc2VhcmNoX2RpciA9IHNjYWxlKHByb3BzLmMsIC0xKTtcclxuICAgIGNvbnN0IGJfb3JpZ2luMSA9IGNvbGwxLnN1cHBvcnQoc2NhbGUocHJvcHMuc2VhcmNoX2RpciwgLTEpKTtcclxuICAgIGNvbnN0IGJfb3JpZ2luMiA9IGNvbGwyLnN1cHBvcnQocHJvcHMuc2VhcmNoX2Rpcik7XHJcbiAgICBwcm9wcy5iID0gZGlmZihiX29yaWdpbjIsIGJfb3JpZ2luMSk7XHJcbiAgICBvcmlnaW5zTWFwLnNldChwcm9wcy5iLCBbYl9vcmlnaW4xLCBiX29yaWdpbjJdKTtcclxuICAgIGlmIChkb3QocHJvcHMuYiwgcHJvcHMuc2VhcmNoX2RpcikgPCAwKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBwcm9wcy5zZWFyY2hfZGlyID0gY3Jvc3MoY3Jvc3MoZGlmZihwcm9wcy5jLCBwcm9wcy5iKSwgc2NhbGUocHJvcHMuYiwgLTEpKSwgZGlmZihwcm9wcy5jLCBwcm9wcy5iKSk7XHJcbiAgICBpZiAoaXNOdWxsKHByb3BzLnNlYXJjaF9kaXIpKSB7XHJcbiAgICAgICAgcHJvcHMuc2VhcmNoX2RpciA9IGNyb3NzKGRpZmYocHJvcHMuYywgcHJvcHMuYiksIFsxLCAwLCAwXSk7XHJcbiAgICAgICAgaWYgKGlzTnVsbChwcm9wcy5zZWFyY2hfZGlyKSkge1xyXG4gICAgICAgICAgICBwcm9wcy5zZWFyY2hfZGlyID0gY3Jvc3MoZGlmZihwcm9wcy5jLCBwcm9wcy5iKSwgWzAsIDAsIC0xXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvcHMuc2ltcF9kaW0gPSAyO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHSktfTUFYX0lURVJBVElPTlNfTlVNOyArK2kpIHtcclxuICAgICAgICBjb25zdCBhX29yaWdpbjEgPSBjb2xsMS5zdXBwb3J0KHNjYWxlKHByb3BzLnNlYXJjaF9kaXIsIC0xKSk7XHJcbiAgICAgICAgY29uc3QgYV9vcmlnaW4yID0gY29sbDIuc3VwcG9ydChwcm9wcy5zZWFyY2hfZGlyKTtcclxuICAgICAgICBwcm9wcy5hID0gZGlmZihhX29yaWdpbjIsIGFfb3JpZ2luMSk7XHJcbiAgICAgICAgb3JpZ2luc01hcC5zZXQocHJvcHMuYSwgW2Ffb3JpZ2luMSwgYV9vcmlnaW4yXSk7XHJcbiAgICAgICAgaWYgKGRvdChwcm9wcy5hLCBwcm9wcy5zZWFyY2hfZGlyKSA8IDApXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIHByb3BzLnNpbXBfZGltKys7XHJcbiAgICAgICAgaWYgKHByb3BzLnNpbXBfZGltID09PSAzKSB7XHJcbiAgICAgICAgICAgIHVwZGF0ZV9zaW1wbGV4Myhwcm9wcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHVwZGF0ZV9zaW1wbGV4NChwcm9wcykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIEVQQShwcm9wcy5hLCBwcm9wcy5iLCBwcm9wcy5jLCBwcm9wcy5kLCBvcmlnaW5zTWFwLCBjb2xsMSwgY29sbDIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59XHJcbmNvbnN0IGJhcmljZW50cmljID0gKGZhY2UsIHBvaW50KSA9PiB7XHJcbiAgICBsZXQgYTExID0gZmFjZVswXVswXTtcclxuICAgIGxldCBhMTIgPSBmYWNlWzFdWzBdO1xyXG4gICAgbGV0IGExMyA9IGZhY2VbMl1bMF07XHJcbiAgICBsZXQgYjEgPSBwb2ludFswXTtcclxuICAgIGxldCBhMjEgPSBmYWNlWzBdWzFdO1xyXG4gICAgbGV0IGEyMiA9IGZhY2VbMV1bMV07XHJcbiAgICBsZXQgYTIzID0gZmFjZVsyXVsxXTtcclxuICAgIGxldCBiMiA9IHBvaW50WzFdO1xyXG4gICAgbGV0IGEzMSA9IGZhY2VbMF1bMl07XHJcbiAgICBsZXQgYTMyID0gZmFjZVsxXVsyXTtcclxuICAgIGxldCBhMzMgPSBmYWNlWzJdWzJdO1xyXG4gICAgbGV0IGIzID0gcG9pbnRbMl07XHJcbiAgICBjb25zdCBkID0gYTExICogYTIyICogYTMzICtcclxuICAgICAgICBhMjEgKiBhMzIgKiBhMTMgK1xyXG4gICAgICAgIGExMiAqIGEyMyAqIGEzMSAtXHJcbiAgICAgICAgYTEzICogYTIyICogYTMxIC1cclxuICAgICAgICBhMjEgKiBhMTIgKiBhMzMgLVxyXG4gICAgICAgIGEzMiAqIGEyMyAqIGExMTtcclxuICAgIGNvbnN0IGQxID0gYjEgKiBhMjIgKiBhMzMgK1xyXG4gICAgICAgIGIyICogYTMyICogYTEzICtcclxuICAgICAgICBhMTIgKiBhMjMgKiBiMyAtXHJcbiAgICAgICAgYTEzICogYTIyICogYjMgLVxyXG4gICAgICAgIGIyICogYTEyICogYTMzIC1cclxuICAgICAgICBhMzIgKiBhMjMgKiBiMTtcclxuICAgIGNvbnN0IGQyID0gYTExICogYjIgKiBhMzMgK1xyXG4gICAgICAgIGEyMSAqIGIzICogYTEzICtcclxuICAgICAgICBiMSAqIGEyMyAqIGEzMSAtXHJcbiAgICAgICAgYTEzICogYjIgKiBhMzEgLVxyXG4gICAgICAgIGExMSAqIGIzICogYTIzIC1cclxuICAgICAgICBhMjEgKiBiMSAqIGEzMztcclxuICAgIGNvbnN0IGQzID0gYTExICogYTIyICogYjMgK1xyXG4gICAgICAgIGEyMSAqIGEzMiAqIGIxICtcclxuICAgICAgICBhMTIgKiBiMiAqIGEzMSAtXHJcbiAgICAgICAgYjEgKiBhMjIgKiBhMzEgLVxyXG4gICAgICAgIGEyMSAqIGExMiAqIGIzIC1cclxuICAgICAgICBiMiAqIGEzMiAqIGExMTtcclxuICAgIHJldHVybiBbZDEgLyBkLCBkMiAvIGQsIGQzIC8gZF07XHJcbn07XHJcbmNvbnN0IG9yaWdpblRvRmFjZVByb2ogPSAoZmFjZSkgPT4ge1xyXG4gICAgY29uc3Qgbm9ybWFsID0gZmFjZVszXTtcclxuICAgIGNvbnN0IHBvaW50ID0gZmFjZVswXTtcclxuICAgIGNvbnN0IGMgPSAtbm9ybWFsWzBdICogcG9pbnRbMF0gLSBub3JtYWxbMV0gKiBwb2ludFsxXSAtIG5vcm1hbFsyXSAqIHBvaW50WzJdO1xyXG4gICAgY29uc3QgdCA9IC1jIC9cclxuICAgICAgICAobm9ybWFsWzBdICogbm9ybWFsWzBdICsgbm9ybWFsWzFdICogbm9ybWFsWzFdICsgbm9ybWFsWzJdICogbm9ybWFsWzJdKTtcclxuICAgIHJldHVybiBbdCAqIG5vcm1hbFswXSwgdCAqIG5vcm1hbFsxXSwgdCAqIG5vcm1hbFsyXV07XHJcbn07XHJcbmNvbnN0IE1BWF9OVU1fRkFDRVMgPSA2NDtcclxuY29uc3QgTUFYX05VTV9MT09TRV9FREdFUyA9IDMyO1xyXG5jb25zdCBFUEFfTUFYX05VTV9JVEVSID0gNjQ7XHJcbmNvbnN0IEVQQSA9IChhLCBiLCBjLCBkLCBvcmlnaW5zTWFwLCBjb2xsMSwgY29sbDIpID0+IHtcclxuICAgIGNvbnN0IGZhY2VzID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgIGZhY2VzW2ldID0gW107XHJcbiAgICB9XHJcbiAgICBmYWNlc1swXVswXSA9IGE7XHJcbiAgICBmYWNlc1swXVsxXSA9IGI7XHJcbiAgICBmYWNlc1swXVsyXSA9IGM7XHJcbiAgICBmYWNlc1swXVszXSA9IG5vcm1hbGl6ZShjcm9zcyhkaWZmKGIsIGEpLCBkaWZmKGMsIGEpKSk7XHJcbiAgICBmYWNlc1sxXVswXSA9IGE7XHJcbiAgICBmYWNlc1sxXVsxXSA9IGM7XHJcbiAgICBmYWNlc1sxXVsyXSA9IGQ7XHJcbiAgICBmYWNlc1sxXVszXSA9IG5vcm1hbGl6ZShjcm9zcyhkaWZmKGMsIGEpLCBkaWZmKGQsIGEpKSk7XHJcbiAgICBmYWNlc1syXVswXSA9IGE7XHJcbiAgICBmYWNlc1syXVsxXSA9IGQ7XHJcbiAgICBmYWNlc1syXVsyXSA9IGI7XHJcbiAgICBmYWNlc1syXVszXSA9IG5vcm1hbGl6ZShjcm9zcyhkaWZmKGQsIGEpLCBkaWZmKGIsIGEpKSk7XHJcbiAgICBmYWNlc1szXVswXSA9IGI7XHJcbiAgICBmYWNlc1szXVsxXSA9IGQ7XHJcbiAgICBmYWNlc1szXVsyXSA9IGM7XHJcbiAgICBmYWNlc1szXVszXSA9IG5vcm1hbGl6ZShjcm9zcyhkaWZmKGQsIGIpLCBkaWZmKGMsIGIpKSk7XHJcbiAgICBsZXQgbnVtX2ZhY2VzID0gNDtcclxuICAgIGxldCBjbG9zZXN0X2ZhY2UgPSBudWxsO1xyXG4gICAgbGV0IHNlYXJjaF9kaXI7XHJcbiAgICBsZXQgcDtcclxuICAgIGZvciAobGV0IGl0ZXJhdGlvbiA9IDA7IGl0ZXJhdGlvbiA8IEVQQV9NQVhfTlVNX0lURVI7ICsraXRlcmF0aW9uKSB7XHJcbiAgICAgICAgbGV0IG1pbl9kaXN0ID0gZG90KGZhY2VzWzBdWzBdLCBmYWNlc1swXVszXSk7XHJcbiAgICAgICAgY2xvc2VzdF9mYWNlID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bV9mYWNlczsgKytpKSB7XHJcbiAgICAgICAgICAgIGxldCBkaXN0ID0gZG90KGZhY2VzW2ldWzBdLCBmYWNlc1tpXVszXSk7XHJcbiAgICAgICAgICAgIGlmIChkaXN0IDwgbWluX2Rpc3QpIHtcclxuICAgICAgICAgICAgICAgIG1pbl9kaXN0ID0gZGlzdDtcclxuICAgICAgICAgICAgICAgIGNsb3Nlc3RfZmFjZSA9IGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc2VhcmNoX2RpciA9IGZhY2VzW2Nsb3Nlc3RfZmFjZV1bM107XHJcbiAgICAgICAgY29uc3QgcF9vcmlnaW4xID0gY29sbDEuc3VwcG9ydChzY2FsZShzZWFyY2hfZGlyLCAtMSkpO1xyXG4gICAgICAgIGNvbnN0IHBfb3JpZ2luMiA9IGNvbGwyLnN1cHBvcnQoc2VhcmNoX2Rpcik7XHJcbiAgICAgICAgcCA9IGRpZmYocF9vcmlnaW4yLCBwX29yaWdpbjEpO1xyXG4gICAgICAgIG9yaWdpbnNNYXAuc2V0KHAsIFtwX29yaWdpbjEsIHBfb3JpZ2luMl0pO1xyXG4gICAgICAgIGlmIChkb3QocCwgc2VhcmNoX2RpcikgLSBtaW5fZGlzdCA8IEVQQV9CSUFTKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZhY2UgPSBmYWNlc1tjbG9zZXN0X2ZhY2VdO1xyXG4gICAgICAgICAgICBjb25zdCBwb2ludCA9IG9yaWdpblRvRmFjZVByb2ooZmFjZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IFtBYSwgQmFdID0gb3JpZ2luc01hcC5nZXQoZmFjZVswXSk7XHJcbiAgICAgICAgICAgIC8vY29uc3QgQWEgPSBmYWNlWzBdLm9hXHJcbiAgICAgICAgICAgIC8vY29uc3QgQmEgPSBmYWNlWzBdLm9iXHJcbiAgICAgICAgICAgIGNvbnN0IFtBYiwgQmJdID0gb3JpZ2luc01hcC5nZXQoZmFjZVsxXSk7XHJcbiAgICAgICAgICAgIC8vY29uc3QgQWIgPSBmYWNlWzFdLm9hXHJcbiAgICAgICAgICAgIC8vY29uc3QgQmIgPSBmYWNlWzFdLm9iXHJcbiAgICAgICAgICAgIGNvbnN0IFtBYywgQmNdID0gb3JpZ2luc01hcC5nZXQoZmFjZVsyXSk7XHJcbiAgICAgICAgICAgIC8vY29uc3QgQWMgPSBmYWNlWzJdLm9hXHJcbiAgICAgICAgICAgIC8vY29uc3QgQmMgPSBmYWNlWzJdLm9iXHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGJhcmljZW50cmljKGZhY2UsIHBvaW50KTtcclxuICAgICAgICAgICAgaWYgKGlzTmFOKHJlc3VsdFswXSArIHJlc3VsdFsxXSArIHJlc3VsdFsyXSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBQQSA9IHN1bShzdW0oc2NhbGUoQWEsIHJlc3VsdFswXSksIHNjYWxlKEFiLCByZXN1bHRbMV0pKSwgc2NhbGUoQWMsIHJlc3VsdFsyXSkpO1xyXG4gICAgICAgICAgICAvL0FhLm11bHRpcGx5KHJlc3VsdFswXSkuYWRkKEFiLm11bHRpcGx5KHJlc3VsdFsxXSkpLmFkZChBYy5tdWx0aXBseShyZXN1bHRbMl0pKVxyXG4gICAgICAgICAgICBsZXQgUEIgPSBzdW0oc3VtKHNjYWxlKEJhLCByZXN1bHRbMF0pLCBzY2FsZShCYiwgcmVzdWx0WzFdKSksIHNjYWxlKEJjLCByZXN1bHRbMl0pKTtcclxuICAgICAgICAgICAgLy9CYS5tdWx0aXBseShyZXN1bHRbMF0pLmFkZChCYi5tdWx0aXBseShyZXN1bHRbMV0pKS5hZGQoQmMubXVsdGlwbHkocmVzdWx0WzJdKSlcclxuICAgICAgICAgICAgLy9jb25zdCByYSA9IFBBLnN1YnN0cmFjdChjb2xsMS5wb3MpXHJcbiAgICAgICAgICAgIGNvbnN0IG4gPSBub3JtYWxpemUoc2NhbGUoZmFjZVszXSwgLWRvdChwLCBzZWFyY2hfZGlyKSkpO1xyXG4gICAgICAgICAgICAvL2lmIChub3JtKG4pIDwgMC4wMSkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uRXJyb3IgPSAtZG90KGRpZmYoUEIsIFBBKSwgbik7XHJcbiAgICAgICAgICAgIHJldHVybiB7IFBBLCBQQiwgbiwgcG9zaXRpb25FcnJvciB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBsb29zZV9lZGdlcyA9IFtdO1xyXG4gICAgICAgIGxldCBudW1fbG9vc2VfZWRnZXMgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtX2ZhY2VzOyArK2kpIHtcclxuICAgICAgICAgICAgaWYgKGRvdChmYWNlc1tpXVszXSwgZGlmZihwLCBmYWNlc1tpXVswXSkpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAzOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudF9lZGdlID0gW2ZhY2VzW2ldW2pdLCBmYWNlc1tpXVsoaiArIDEpICUgM11dO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmb3VuZF9lZGdlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBudW1fbG9vc2VfZWRnZXM7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9vc2VfZWRnZXNba11bMV0gPT09IGN1cnJlbnRfZWRnZVswXSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9vc2VfZWRnZXNba11bMF0gPT09IGN1cnJlbnRfZWRnZVsxXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9vc2VfZWRnZXNba11bMF0gPSBsb29zZV9lZGdlc1tudW1fbG9vc2VfZWRnZXMgLSAxXVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvb3NlX2VkZ2VzW2tdWzFdID0gbG9vc2VfZWRnZXNbbnVtX2xvb3NlX2VkZ2VzIC0gMV1bMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1fbG9vc2VfZWRnZXMtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kX2VkZ2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IG51bV9sb29zZV9lZGdlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWZvdW5kX2VkZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG51bV9sb29zZV9lZGdlcyA+PSBNQVhfTlVNX0xPT1NFX0VER0VTKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvb3NlX2VkZ2VzW251bV9sb29zZV9lZGdlc10gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9vc2VfZWRnZXNbbnVtX2xvb3NlX2VkZ2VzXVswXSA9IGN1cnJlbnRfZWRnZVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9vc2VfZWRnZXNbbnVtX2xvb3NlX2VkZ2VzXVsxXSA9IGN1cnJlbnRfZWRnZVsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnVtX2xvb3NlX2VkZ2VzKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZmFjZXNbaV1bMF0gPSBmYWNlc1tudW1fZmFjZXMgLSAxXVswXTtcclxuICAgICAgICAgICAgICAgIGZhY2VzW2ldWzFdID0gZmFjZXNbbnVtX2ZhY2VzIC0gMV1bMV07XHJcbiAgICAgICAgICAgICAgICBmYWNlc1tpXVsyXSA9IGZhY2VzW251bV9mYWNlcyAtIDFdWzJdO1xyXG4gICAgICAgICAgICAgICAgZmFjZXNbaV1bM10gPSBmYWNlc1tudW1fZmFjZXMgLSAxXVszXTtcclxuICAgICAgICAgICAgICAgIG51bV9mYWNlcy0tO1xyXG4gICAgICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtX2xvb3NlX2VkZ2VzOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKG51bV9mYWNlcyA+PSBNQVhfTlVNX0ZBQ0VTKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGZhY2VzW251bV9mYWNlc10gPSBbXTtcclxuICAgICAgICAgICAgZmFjZXNbbnVtX2ZhY2VzXVswXSA9IGxvb3NlX2VkZ2VzW2ldWzBdO1xyXG4gICAgICAgICAgICBmYWNlc1tudW1fZmFjZXNdWzFdID0gbG9vc2VfZWRnZXNbaV1bMV07XHJcbiAgICAgICAgICAgIGZhY2VzW251bV9mYWNlc11bMl0gPSBwO1xyXG4gICAgICAgICAgICBmYWNlc1tudW1fZmFjZXNdWzNdID0gbm9ybWFsaXplKGNyb3NzKGRpZmYobG9vc2VfZWRnZXNbaV1bMF0sIGxvb3NlX2VkZ2VzW2ldWzFdKSwgZGlmZihsb29zZV9lZGdlc1tpXVswXSwgcCkpKTtcclxuICAgICAgICAgICAgaWYgKGRvdChmYWNlc1tudW1fZmFjZXNdWzBdLCBmYWNlc1tudW1fZmFjZXNdWzNdKSArIDAuMDEgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0ZW1wID0gZmFjZXNbbnVtX2ZhY2VzXVswXTtcclxuICAgICAgICAgICAgICAgIGZhY2VzW251bV9mYWNlc11bMF0gPSBmYWNlc1tudW1fZmFjZXNdWzFdO1xyXG4gICAgICAgICAgICAgICAgZmFjZXNbbnVtX2ZhY2VzXVsxXSA9IHRlbXA7XHJcbiAgICAgICAgICAgICAgICBmYWNlc1tudW1fZmFjZXNdWzNdID0gc2NhbGUoZmFjZXNbbnVtX2ZhY2VzXVszXSwgLTEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG51bV9mYWNlcysrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5jb25zdCBnamtTY29wZSA9IHt9O1xyXG5jb25zdCBfZ2prID0gZ2prLmJpbmQoZ2prU2NvcGUpO1xyXG5jb25zdCBnZXRDb250YWN0cyA9IChjb2xsMSwgY29sbDIpID0+IHtcclxuICAgIGNvbnN0IGNvbnRhY3REYXRhID0gZ2prKGNvbGwxLCBjb2xsMik7XHJcbiAgICBpZiAoIWNvbnRhY3REYXRhKVxyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIGNvbnN0IHsgUEEsIFBCLCBuLCBwb3NpdGlvbkVycm9yIH0gPSBjb250YWN0RGF0YTtcclxuICAgIGlmIChjb2xsMS5nZXRUeXBlKCkgPT09IFwic3BoZXJlXCIgfHwgY29sbDIuZ2V0VHlwZSgpID09PSBcInNwaGVyZVwiKSB7XHJcbiAgICAgICAgY29uc3QgcmIgPSBkaWZmKFBCLCBjb2xsMi5nZXRUcmFuc2xhdGlvbigpKTtcclxuICAgICAgICBjb25zdCByYSA9IGRpZmYoUEEsIGNvbGwxLmdldFRyYW5zbGF0aW9uKCkpO1xyXG4gICAgICAgIGNvbnN0IHJhTG9jYWwgPSBtMy50cmFuc2Zvcm1Qb2ludChjb2xsMS5nZXRSbWF0cml4SW52ZXJzZSgpLCByYSk7XHJcbiAgICAgICAgY29uc3QgcmJMb2NhbCA9IG0zLnRyYW5zZm9ybVBvaW50KGNvbGwyLmdldFJtYXRyaXhJbnZlcnNlKCksIHJiKTtcclxuICAgICAgICBjb25zdCBpID0gW25bMV0gKyBuWzJdLCBuWzJdIC0gblswXSwgLW5bMF0gLSBuWzFdXTtcclxuICAgICAgICBjb25zdCBqID0gY3Jvc3Moc2NhbGUobiwgLTEpLCBpKTtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByYSwgcmIsIG4sIFBBLCBQQiwgcG9zaXRpb25FcnJvciwgaSwgaiwgcmFMb2NhbCwgcmJMb2NhbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuICAgIGNvbnN0IG5SZXZlcnNlID0gc2NhbGUobiwgLTEpO1xyXG4gICAgY29uc3QgY29udGFjdEZhY2UxID0gY29sbDEuZ2V0Q2xvc2VzdEZhY2VCeU5vcm1hbChuUmV2ZXJzZSk7XHJcbiAgICBjb25zdCBjb250YWN0RmFjZTIgPSBjb2xsMi5nZXRDbG9zZXN0RmFjZUJ5Tm9ybWFsKG4pO1xyXG4gICAgY29uc3QgcGxhbmUgPSBbc2NhbGUoc3VtKFBBLCBQQiksIDAuNSksIG5dO1xyXG4gICAgY29uc3QgcHJvamVjdGlvbnMxID0gY29udGFjdEZhY2UxLnZlcnRpY2VzLm1hcCgocCkgPT4gcG9pbnRPblBsYW5lUHJvamVjdGlvbihwbGFuZSwgcCkpO1xyXG4gICAgY29uc3QgcHJvamVjdGlvbnMyID0gY29udGFjdEZhY2UyLnZlcnRpY2VzLm1hcCgocCkgPT4gcG9pbnRPblBsYW5lUHJvamVjdGlvbihwbGFuZSwgcCkpO1xyXG4gICAgY29uc3Qgb3JpZ2luID0gcGxhbmVbMF07XHJcbiAgICBjb25zdCBpID0gbm9ybWFsaXplKFtuWzFdICsgblsyXSwgblsyXSAtIG5bMF0sIC1uWzBdIC0gblsxXV0pO1xyXG4gICAgY29uc3QgaiA9IGNyb3NzKHNjYWxlKG4sIC0xKSwgaSk7XHJcbiAgICBsZXQgXzJkMSA9IHByb2plY3Rpb25zMS5tYXAoKHApID0+IGdldDJEY29vcmRzT25QbGFuZShpLCBqLCBkaWZmKHAsIG9yaWdpbikpKTtcclxuICAgIGxldCBfMmQyID0gcHJvamVjdGlvbnMyLm1hcCgocCkgPT4gZ2V0MkRjb29yZHNPblBsYW5lKGksIGosIGRpZmYocCwgb3JpZ2luKSkpO1xyXG4gICAgY29uc3QgZGlyMSA9IGlzSW5DbG9ja3dpc2UoXzJkMSk7XHJcbiAgICBjb25zdCBkaXIyID0gaXNJbkNsb2Nrd2lzZShfMmQyKTtcclxuICAgIGlmIChkaXIxIDwgMClcclxuICAgICAgICBfMmQxID0gXzJkMS5tYXAoKF8sIGkpID0+IF8yZDEuYXQoLWkpKTtcclxuICAgIGlmIChkaXIyIDwgMClcclxuICAgICAgICBfMmQyID0gXzJkMi5tYXAoKF8sIGkpID0+IF8yZDIuYXQoLWkpKTtcclxuICAgIGNvbnN0IGNsaXBwZWQgPSBjbGlwRmFjZVZzRmFjZShfMmQxLCBfMmQyKTtcclxuICAgIGNvbnN0IF8zZCA9IGNsaXBwZWQubWFwKChwKSA9PiBzdW0ob3JpZ2luLCBzdW0oc2NhbGUoaSwgcFswXSksIHNjYWxlKGosIHBbMV0pKSkpO1xyXG4gICAgY29uc3QgZmVhdHVyZXMgPSBbXTtcclxuICAgIF8zZC5mb3JFYWNoKChwb2ludCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IFBBID0gcmF5VnNQbGFuZUludGVyc2VjKFtjb250YWN0RmFjZTEudmVydGljZXNbMF0sIGNvbnRhY3RGYWNlMS5ub3JtYWxdLCBwb2ludCwgbik7XHJcbiAgICAgICAgaWYgKCFpc1BvaW50QmVoaW5kUGxhbmUocGxhbmUsIFBBLCAxKSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IFBCID0gcmF5VnNQbGFuZUludGVyc2VjKFtjb250YWN0RmFjZTIudmVydGljZXNbMF0sIGNvbnRhY3RGYWNlMi5ub3JtYWxdLCBwb2ludCwgbik7XHJcbiAgICAgICAgaWYgKCFpc1BvaW50QmVoaW5kUGxhbmUocGxhbmUsIFBCLCAtMSkpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBjb25zdCByYiA9IGRpZmYoUEIsIGNvbGwyLmdldFRyYW5zbGF0aW9uKCkpO1xyXG4gICAgICAgIGNvbnN0IHJhID0gZGlmZihQQSwgY29sbDEuZ2V0VHJhbnNsYXRpb24oKSk7XHJcbiAgICAgICAgY29uc3QgcG9zaXRpb25FcnJvciA9IC1kb3QoZGlmZihQQiwgUEEpLCBuKTtcclxuICAgICAgICBjb25zdCByYUxvY2FsID0gbTMudHJhbnNmb3JtUG9pbnQoY29sbDEuZ2V0Um1hdHJpeEludmVyc2UoKSwgcmEpO1xyXG4gICAgICAgIGNvbnN0IHJiTG9jYWwgPSBtMy50cmFuc2Zvcm1Qb2ludChjb2xsMi5nZXRSbWF0cml4SW52ZXJzZSgpLCByYik7XHJcbiAgICAgICAgZmVhdHVyZXMucHVzaCh7XHJcbiAgICAgICAgICAgIHJhLCByYiwgbiwgUEEsIFBCLCBwb3NpdGlvbkVycm9yLCBpLCBqLCByYUxvY2FsLCByYkxvY2FsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIGlmIChmZWF0dXJlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICBjb25zdCByYiA9IGRpZmYoUEIsIGNvbGwyLmdldFRyYW5zbGF0aW9uKCkpO1xyXG4gICAgICAgIGNvbnN0IHJhID0gZGlmZihQQSwgY29sbDEuZ2V0VHJhbnNsYXRpb24oKSk7XHJcbiAgICAgICAgY29uc3QgcmFMb2NhbCA9IG0zLnRyYW5zZm9ybVBvaW50KGNvbGwxLmdldFJtYXRyaXhJbnZlcnNlKCksIHJhKTtcclxuICAgICAgICBjb25zdCByYkxvY2FsID0gbTMudHJhbnNmb3JtUG9pbnQoY29sbDIuZ2V0Um1hdHJpeEludmVyc2UoKSwgcmIpO1xyXG4gICAgICAgIGZlYXR1cmVzLnB1c2goe1xyXG4gICAgICAgICAgICByYSwgcmIsIG4sIFBBLCBQQiwgcG9zaXRpb25FcnJvciwgaSwgaiwgcmFMb2NhbCwgcmJMb2NhbFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZlYXR1cmVzO1xyXG59O1xyXG5leHBvcnQgeyBnZXRDb250YWN0cywgcG9pbnRPblBsYW5lUHJvamVjdGlvbiwgY2xpcFBvaW50c0JlaGluZFBsYW5lLCBnZXQyRGNvb3Jkc09uUGxhbmUsIHJheVZzUGxhbmVJbnRlcnNlYywgfTtcclxuIiwiXG5pbXBvcnQge200LCBtMywgdjN9IGZyb20gJ3JvbWFucHBwbWF0aCdcblxuY29uc3QgS0VZUyA9IHtcbiAgICAndycgOiAnbW92ZUZvcndhcmQnLFxuICAgICdzJyA6ICdtb3ZlQmFja3dhcmQnLFxuICAgICdhJyA6ICdtb3ZlTGVmdCcsXG4gICAgJ2QnIDogJ21vdmVSaWdodCcsXG4gICAgJyAnIDogJ21vdmVVcCdcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnJlZUNhbSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMua2V5SW5wdXQgPSBudWxsO1xuICAgIHRoaXMubW91c2VJbnB1dCA9IG51bGw7XG4gICAgdGhpcy5yb3RhdGlvblggPSAwO1xuICAgIHRoaXMucm90YXRpb25ZID0gMDtcbiAgICB0aGlzLmRlbHRhUlkgPSAwO1xuICAgIHRoaXMuY2FtUG9zID0gWzAsIDAsIDEwXTtcbiAgICB0aGlzLmNhbVJvdCA9IG0zLmlkZW50aXR5KCk7XG4gIH1cbiAgbGlzdGVuTW91c2UobW91c2VJbnB1dCkge1xuICAgIHRoaXMubW91c2VJbnB1dCA9IG1vdXNlSW5wdXQ7XG4gICAgbW91c2VJbnB1dC5vbihcIm1vdmVcIiwgKFtkZWx0YVgsIGRlbHRhWV0pID0+IHtcbiAgICAgIHRoaXMucm90YXRpb25ZIC09IGRlbHRhWCAqIDAuMDA1O1xuICAgICAgdGhpcy5yb3RhdGlvblggLT0gZGVsdGFZICogMC4wMDU7XG4gICAgICB0aGlzLnJvdGF0aW9uWCA9IE1hdGgubWF4KFxuICAgICAgICAtTWF0aC5QSSAvIDIsXG4gICAgICAgIE1hdGgubWluKE1hdGguUEkgLyAyLCB0aGlzLnJvdGF0aW9uWClcbiAgICAgICk7XG4gICAgICB0aGlzLmRlbHRhUlkgPSBkZWx0YVggKiAwLjAwNTtcbiAgICB9KTtcbiAgfVxuICBsaXN0ZW5LZXlib2FyZChrZXlJbnB1dCkge1xuICAgIHRoaXMua2V5SW5wdXQgPSBrZXlJbnB1dDtcbiAgfVxuICB0aWNrKCkge1xuICAgIGZvciAoY29uc3Qga2V5IG9mIHRoaXMua2V5SW5wdXQua2V5cykge1xuICAgICAgY29uc3QgYWN0aW9uTmFtZSA9IEtFWVNba2V5XTtcbiAgICAgIGlmIChhY3Rpb25OYW1lKSB7XG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IHRoaXNbYWN0aW9uTmFtZV0uYmluZCh0aGlzKTtcbiAgICAgICAgYWN0aW9uKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5jYW1NYXRyaXggPSBtNC50cmFuc2xhdGlvbiguLi50aGlzLmNhbVBvcyk7XG4gICAgdGhpcy5jYW1NYXRyaXggPSBtNC54Um90YXRlKFxuICAgICAgbTQueVJvdGF0ZSh0aGlzLmNhbU1hdHJpeCwgdGhpcy5yb3RhdGlvblkpLFxuICAgICAgdGhpcy5yb3RhdGlvblhcbiAgICApO1xuICB9XG4gIG1vdmUoZGlyKSB7XG4gICAgY29uc3QgbSA9IG00Lm00VG9tMyh0aGlzLmNhbU1hdHJpeCk7XG4gICAgdGhpcy5jYW1Qb3MgPSB2My5zdW0odGhpcy5jYW1Qb3MsIG0zLnRyYW5zZm9ybVBvaW50KG0sIGRpcikpO1xuICB9XG4gIG1vdmVGb3J3YXJkKCkge1xuICAgIHRoaXMubW92ZShbMCwgMCwgLTFdKTtcbiAgfVxuICBtb3ZlQmFja3dhcmQoKSB7XG4gICAgdGhpcy5tb3ZlKFswLCAwLCAxXSk7XG4gIH1cbiAgbW92ZUxlZnQoKSB7XG4gICAgdGhpcy5tb3ZlKFstMSwgMCwgMF0pO1xuICB9XG4gIG1vdmVSaWdodCgpIHtcbiAgICB0aGlzLm1vdmUoWzEsIDAsIDBdKTtcbiAgfVxuICBtb3ZlVXAoKSB7XG4gICAgdGhpcy5tb3ZlKFswLCAxLCAwXSk7XG4gIH1cbn1cbiIsImltcG9ydCAgRXZlbnRFbWl0dGVyICBmcm9tIFwiLi4vcGh5c2ljcy9FdmVudEVtaXR0ZXIudHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS2V5SW5wdXQgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5rZXlzID0gbmV3IFNldCgpO1xuICB9XG4gIGxvZ0Rvd24oeyBrZXkgfSkge1xuICAgIHRoaXMua2V5cy5hZGQoa2V5KTtcbiAgICB0aGlzLmVtaXQoXCJrZXlkb3duXCIsIHsga2V5IH0pO1xuICB9XG4gIGxvZ1VwKHsga2V5IH0pIHtcbiAgICB0aGlzLmtleXMuZGVsZXRlKGtleSk7XG4gICAgdGhpcy5lbWl0KFwia2V5dXBcIiwgeyBrZXkgfSk7XG4gIH1cbiAgbGlzdGVuKCkge1xuICAgIGNvbnN0IGxvZ0Rvd24gPSB0aGlzLmxvZ0Rvd24uYmluZCh0aGlzKTtcbiAgICBjb25zdCBsb2dVcCA9IHRoaXMubG9nVXAuYmluZCh0aGlzKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBsb2dEb3duKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgbG9nVXApO1xuICAgIHRoaXMudW5zdWJzaWNyaWJlID0gKCkgPT4ge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgbG9nRG93bik7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgbG9nVXApO1xuICAgIH07XG4gIH1cbn1cbiIsImltcG9ydCAgRXZlbnRFbWl0dGVyICBmcm9tIFwiLi4vcGh5c2ljcy9FdmVudEVtaXR0ZXIudHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW91c2VJbnB1dCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQgPSBkb2N1bWVudCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5sYXN0WCA9IDA7XG4gICAgdGhpcy5sYXN0WSA9IDA7XG4gICAgdGhpcy5lbmFibGUgPSBmYWxzZTtcbiAgICB0aGlzLm1vdmVzID0gW11cbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50XG4gIH1cbiAgbG9nTW92ZSh7IG9mZnNldFgsIG9mZnNldFkgfSkge1xuICAgIGNvbnN0IGRlbHRhWCA9IG9mZnNldFggLSB0aGlzLmxhc3RYO1xuICAgIHRoaXMubGFzdFggPSBvZmZzZXRYO1xuICAgIGNvbnN0IGRlbHRhWSA9IG9mZnNldFkgLSB0aGlzLmxhc3RZO1xuICAgIHRoaXMubGFzdFkgPSBvZmZzZXRZO1xuICAgIHRoaXMuZW1pdChcIm1vdmVcIiwgW2RlbHRhWCwgZGVsdGFZXSk7XG4gICAgdGhpcy5tb3Zlcy5wdXNoKFtkZWx0YVgsIGRlbHRhWV0pXG4gIH1cbiAgbGlzdGVuKCkge1xuICAgIGNvbnN0IGxvZ01vdmUgPSB0aGlzLmxvZ01vdmUuYmluZCh0aGlzKTtcbiAgICBjb25zdCBfID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmICh0aGlzLmVuYWJsZSkgbG9nTW92ZShlKTtcbiAgICB9LmJpbmQodGhpcyk7XG4gICAgY29uc3QgZG93biA9IGZ1bmN0aW9uICh7IG9mZnNldFgsIG9mZnNldFkgfSkge1xuICAgICAgdGhpcy5sYXN0WCA9IG9mZnNldFg7XG4gICAgICB0aGlzLmxhc3RZID0gb2Zmc2V0WTtcbiAgICAgIHRoaXMuZW5hYmxlID0gdHJ1ZTtcbiAgICB9LmJpbmQodGhpcyk7XG4gICAgY29uc3QgdXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmVuYWJsZSA9IGZhbHNlO1xuICAgIH0uYmluZCh0aGlzKTtcblxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIF8pO1xuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGRvd24pO1xuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB1cCk7XG4gICAgdGhpcy51bnN1YnNjcmliZSA9ICgpID0+IHtcbiAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIF8pO1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgZG93bik7XG4gICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdXApO1xuICAgIH07XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgbTQgfSBmcm9tIFwicm9tYW5wcHBtYXRoXCI7XHJcbmltcG9ydCB7IGNyZWF0ZUJveCwgR0xjb250ZXh0V3JhcHBlciwgcG9pbnRMaWdodFNoYWRlcnMsIGRlZmF1bHRTaGFkZXJzLCBjcmVhdGVTcGhlcmUsIH0gZnJvbSBcInJvbWFucHBwZ3JhcGhpY3NcIjtcclxuaW1wb3J0IHRleHR1cmVTaGFkZXJzIGZyb20gXCIuL3RleHR1cmVTaGFkZXJcIjtcclxuaW1wb3J0IEZyZWVDYW0gZnJvbSBcIi4uLy4uL3NyYy9taXNjL0ZyZWVDYW1cIjtcclxuaW1wb3J0IEtleUlucHV0IGZyb20gXCIuLi8uLi9zcmMvbWlzYy9rZXlJbnB1dFwiO1xyXG5pbXBvcnQgTW91c2VJbnB1dCBmcm9tIFwiLi4vLi4vc3JjL21pc2MvbW91c2VJbnB1dFwiO1xyXG5pbXBvcnQgVm94ZWxXb3JsZCBmcm9tIFwiLi9Wb3hlbFdvcmxkXCI7XHJcbmltcG9ydCB7IFJpZ2lkQm9keSwgVGVycmFpblNlZ21lbnQgfSBmcm9tIFwiLi4vLi4vc3JjL3BoeXNpY3MvUmlnaWRCb2R5XCI7XHJcbmltcG9ydCBTaW11bGF0aW9uIGZyb20gXCIuLi8uLi9zcmMvcGh5c2ljcy9TaW11bGF0aW9uXCI7XHJcbmltcG9ydCB7IEJveCwgU3BoZXJlIH0gZnJvbSBcIi4uLy4uL3NyYy9waHlzaWNzL0NvbGxpZGVyXCI7XHJcbmltcG9ydCBjb25maWcgZnJvbSBcIi4uLy4uL3NyYy9waHlzaWNzL2NvbmZpZ1wiO1xyXG5pbXBvcnQgRGVidWcgZnJvbSBcIi4uLy4uL3NyYy9waHlzaWNzL0RlYnVnXCI7XHJcbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpO1xyXG5pZiAoIWNhbnZhcylcclxuICAgIHRocm93IFwiTm8gY2FudmFzIGZvdW5kXCI7XHJcbmNvbnN0IG1vdXNlSW5wdXQgPSBuZXcgTW91c2VJbnB1dChjYW52YXMpO1xyXG5tb3VzZUlucHV0Lmxpc3RlbigpO1xyXG5jb25zdCBrZXlJbnB1dCA9IG5ldyBLZXlJbnB1dCgpO1xyXG5rZXlJbnB1dC5saXN0ZW4oKTtcclxuY29uc3QgcGxheWVyID0gbmV3IEZyZWVDYW0oKTtcclxucGxheWVyLmxpc3RlbktleWJvYXJkKGtleUlucHV0KTtcclxucGxheWVyLmxpc3Rlbk1vdXNlKG1vdXNlSW5wdXQpO1xyXG5wbGF5ZXIuY2FtUG9zID0gWy0xMCwgMTUsIDIwXTtcclxucGxheWVyLnJvdGF0aW9uWCA9IC1NYXRoLlBJICogMC4xO1xyXG5wbGF5ZXIucm90YXRpb25ZID0gLU1hdGguUEkgKiAwLjE7XHJcbmNvbnN0IGdsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIikuZ2V0Q29udGV4dChcIndlYmdsMlwiKTtcclxuY29uc3QgY29udGV4dCA9IG5ldyBHTGNvbnRleHRXcmFwcGVyKGdsKTtcclxuY29uc3QgeyBQcmltaXRpdmVSZW5kZXJlciwgRHJhd2VyLCBQcm9ncmFtSW5mbywgVGV4dHVyZUluZm8gfSA9IGNvbnRleHQ7XHJcbmNvbnRleHQucmVzaXplQ2FudmFzVG9EaXNwbGF5U2l6ZSgpO1xyXG5jb25zdCBkcmF3ZXIgPSBuZXcgRHJhd2VyKCk7XHJcbmRyYXdlci5wcm9qZWN0aW9uTWF0cml4ID0gRHJhd2VyLmNyZWF0ZTNkUHJvamVjdGlvbk1hdHJpeCgxLCAyMDAwLCBnbC5jYW52YXMud2lkdGgsIGdsLmNhbnZhcy5oZWlnaHQpO1xyXG5jb25zdCBwb2ludExpZ2h0UHJvZ3JhbUluZm8gPSBuZXcgUHJvZ3JhbUluZm8ocG9pbnRMaWdodFNoYWRlcnMudmVydCwgcG9pbnRMaWdodFNoYWRlcnMuZnJhZyk7XHJcbnBvaW50TGlnaHRQcm9ncmFtSW5mby5jb21waWxlU2hhZGVycygpLmNyZWF0ZVVuaWZvcm1TZXR0ZXJzKCk7XHJcbmNvbnN0IGRlZmF1bHRQcm9ncmFtSW5mbyA9IG5ldyBQcm9ncmFtSW5mbyhkZWZhdWx0U2hhZGVycy52ZXJ0LCBkZWZhdWx0U2hhZGVycy5mcmFnKTtcclxuY29uc3QgdGV4dHVyZVByb2dyYW1JbmZvID0gbmV3IFByb2dyYW1JbmZvKHRleHR1cmVTaGFkZXJzLnZlcnQsIHRleHR1cmVTaGFkZXJzLmZyYWcpO1xyXG50ZXh0dXJlUHJvZ3JhbUluZm8uY29tcGlsZVNoYWRlcnMoKS5jcmVhdGVVbmlmb3JtU2V0dGVycygpO1xyXG5kZWZhdWx0UHJvZ3JhbUluZm8uY29tcGlsZVNoYWRlcnMoKS5jcmVhdGVVbmlmb3JtU2V0dGVycygpO1xyXG5jb25zdCBjdWJlID0gUHJpbWl0aXZlUmVuZGVyZXIuZnJvbUFycmF5RGF0YShjcmVhdGVCb3goMSwgMSwgMSkpO1xyXG5jb25zdCBwb2ludCA9IG5ldyBQcmltaXRpdmVSZW5kZXJlcigpO1xyXG5jb25zdCBsaW5lID0gbmV3IFByaW1pdGl2ZVJlbmRlcmVyKCk7XHJcbmNvbnN0IHRleHR1cmUxID0gbmV3IFRleHR1cmVJbmZvKCk7XHJcbnRleHR1cmUxLmNyZWF0ZVRleHR1cmVGcm9tVVJMKFwicmVzb3VyY2VzL2F0bGFzLnBuZ1wiKTtcclxuY29uc3Qgc2V0dGluZ3MgPSBbXHJcbiAgICB7IHg6IC0xLCB5OiAxLCB6Um90OiAwLCBtYWdGaWx0ZXI6IGdsLk5FQVJFU1QsIG1pbkZpbHRlcjogZ2wuTkVBUkVTVCB9LFxyXG4gICAgeyB4OiAwLCB5OiAxLCB6Um90OiAwLCBtYWdGaWx0ZXI6IGdsLkxJTkVBUiwgbWluRmlsdGVyOiBnbC5MSU5FQVIgfSxcclxuICAgIHtcclxuICAgICAgICB4OiAxLFxyXG4gICAgICAgIHk6IDEsXHJcbiAgICAgICAgelJvdDogMCxcclxuICAgICAgICBtYWdGaWx0ZXI6IGdsLkxJTkVBUixcclxuICAgICAgICBtaW5GaWx0ZXI6IGdsLk5FQVJFU1RfTUlQTUFQX05FQVJFU1QsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHg6IC0xLFxyXG4gICAgICAgIHk6IC0xLFxyXG4gICAgICAgIHpSb3Q6IDEsXHJcbiAgICAgICAgbWFnRmlsdGVyOiBnbC5MSU5FQVIsXHJcbiAgICAgICAgbWluRmlsdGVyOiBnbC5MSU5FQVJfTUlQTUFQX05FQVJFU1QsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHg6IDAsXHJcbiAgICAgICAgeTogLTEsXHJcbiAgICAgICAgelJvdDogMSxcclxuICAgICAgICBtYWdGaWx0ZXI6IGdsLkxJTkVBUixcclxuICAgICAgICBtaW5GaWx0ZXI6IGdsLk5FQVJFU1RfTUlQTUFQX0xJTkVBUixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgeDogMSxcclxuICAgICAgICB5OiAtMSxcclxuICAgICAgICB6Um90OiAxLFxyXG4gICAgICAgIG1hZ0ZpbHRlcjogZ2wuTElORUFSLFxyXG4gICAgICAgIG1pbkZpbHRlcjogZ2wuTElORUFSX01JUE1BUF9MSU5FQVIsXHJcbiAgICB9LFxyXG5dO1xyXG5jb25zdCBzID0gc2V0dGluZ3NbMF07XHJcbmdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleHR1cmUxLnRleHR1cmUpO1xyXG5nbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgcy5taW5GaWx0ZXIpO1xyXG5nbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgcy5tYWdGaWx0ZXIpO1xyXG5jdWJlXHJcbiAgICAuY3JlYXRlVkFPKClcclxuICAgIC5zZXREcmF3ZXIoZHJhd2VyKVxyXG4gICAgLnNldFByb2dyYW1JbmZvKHBvaW50TGlnaHRQcm9ncmFtSW5mbylcclxuICAgIC5zZXRNb2RlKDQpO1xyXG5jb25zdCBzcGhlcmUgPSBQcmltaXRpdmVSZW5kZXJlci5mcm9tQXJyYXlEYXRhKGNyZWF0ZVNwaGVyZSgxLCAxMCwgMTApKTtcclxuc3BoZXJlXHJcbiAgICAuY3JlYXRlVkFPKClcclxuICAgIC5zZXREcmF3ZXIoZHJhd2VyKVxyXG4gICAgLnNldFByb2dyYW1JbmZvKHBvaW50TGlnaHRQcm9ncmFtSW5mbylcclxuICAgIC5zZXRNb2RlKDQpO1xyXG5wb2ludFxyXG4gICAgLmNyZWF0ZVZBTygpXHJcbiAgICAuc2V0RHJhd2VyKGRyYXdlcilcclxuICAgIC5zZXRQcm9ncmFtSW5mbyhkZWZhdWx0UHJvZ3JhbUluZm8pXHJcbiAgICAuY3JlYXRlQnVmZmVyQXR0cmliRGF0YSh7XHJcbiAgICBhdHRyaWJOYW1lOiBcImFfcG9zaXRpb25cIixcclxuICAgIGxvY2F0aW9uOiAwLFxyXG4gICAgYXR0cmlidXRlVHlwZTogV2ViR0wyUmVuZGVyaW5nQ29udGV4dC5GTE9BVF9WRUMzLFxyXG4gICAgbnVtQ29tcG9uZW50czogMyxcclxufSlcclxuICAgIC5zZXRBdHRyaWJ1dGVzKClcclxuICAgIC5idWZmZXJEYXRhKFwiYV9wb3NpdGlvblwiLCBuZXcgRmxvYXQzMkFycmF5KFsxLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAxXSkpXHJcbiAgICAuc2V0TW9kZSgzKVxyXG4gICAgLnNldE51bUVsZW1lbnRzKDUpO1xyXG5saW5lXHJcbiAgICAuY3JlYXRlVkFPKClcclxuICAgIC5zZXREcmF3ZXIoZHJhd2VyKVxyXG4gICAgLnNldFByb2dyYW1JbmZvKGRlZmF1bHRQcm9ncmFtSW5mbylcclxuICAgIC5jcmVhdGVCdWZmZXJBdHRyaWJEYXRhKHtcclxuICAgIGF0dHJpYk5hbWU6IFwiYV9wb3NpdGlvblwiLFxyXG4gICAgbG9jYXRpb246IDAsXHJcbiAgICBhdHRyaWJ1dGVUeXBlOiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0LkZMT0FUX1ZFQzMsXHJcbiAgICBudW1Db21wb25lbnRzOiAzLFxyXG59KVxyXG4gICAgLnNldEF0dHJpYnV0ZXMoKVxyXG4gICAgLnNldE1vZGUoMylcclxuICAgIC5zZXROdW1FbGVtZW50cygyKTtcclxuY29uc3QgdW5pZm9ybXMgPSB7XHJcbiAgICB1X2xpZ2h0V29ybGRQb3NpdGlvbjogWzMwLCA1MCwgMzBdLFxyXG4gICAgdV9hbWJpZW50TGlnaHQ6IFsxLCAxLCAwLjMsIDAuMTFdLFxyXG4gICAgdV9yZXZlcnNlTGlnaHREaXJlY3Rpb246IFsxLCAwLCAwXSxcclxuICAgIHVfc2hpbmluZXNzOiAzMDAsXHJcbn07XHJcbmNvbmZpZy5SSUdJRF9CT0RZX01PVkVfVFJFU0hPTEQgPSAwLjAwMTtcclxuY29uZmlnLkNPTlRBQ1RfVFJFU0hPTEQgPSAwLjAwMDAxO1xyXG5jb25maWcuQ0xJUF9CSUFTID0gMC4wMTtcclxuY29uZmlnLkNPTlRBQ1RfTUFOSUZPTERfS0VFUF9UUkVTSE9MRCA9IDAuMDAxO1xyXG5jb25zdCBzaW0gPSBuZXcgU2ltdWxhdGlvbigpO1xyXG5jb25zdCBjZWxsU2l6ZSA9IDMyO1xyXG5jb25zdCB0aWxlU2l6ZSA9IDE2O1xyXG5jb25zdCB0aWxlVGV4dHVyZVdpZHRoID0gMjU2O1xyXG5jb25zdCB0aWxlVGV4dHVyZUhlaWdodCA9IDY0O1xyXG5jb25zdCB3b3JsZCA9IG5ldyBWb3hlbFdvcmxkKHtcclxuICAgIGNlbGxTaXplLFxyXG4gICAgdGlsZVNpemUsXHJcbiAgICB0aWxlVGV4dHVyZVdpZHRoLFxyXG4gICAgdGlsZVRleHR1cmVIZWlnaHQsXHJcbn0pO1xyXG5mb3IgKGxldCB5ID0gMDsgeSA8IGNlbGxTaXplOyArK3kpIHtcclxuICAgIGZvciAobGV0IHogPSAwOyB6IDwgY2VsbFNpemU7ICsreikge1xyXG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgY2VsbFNpemU7ICsreCkge1xyXG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSAoTWF0aC5zaW4oeCAvIGNlbGxTaXplICogTWF0aC5QSSAqIDIpICsgTWF0aC5zaW4oeiAvIGNlbGxTaXplICogTWF0aC5QSSAqIDMpKSAqIChjZWxsU2l6ZSAvIDYpICsgKGNlbGxTaXplIC8gMik7XHJcbiAgICAgICAgICAgIGlmICh5IDwgaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICB3b3JsZC5zZXRWb3hlbCh4LCB5LCB6LCAxKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBocyA9IG5ldyBUZXJyYWluU2VnbWVudChuZXcgQm94KDEsIDEsIDEpKTtcclxuICAgICAgICAgICAgICAgIHBocy50cmFuc2xhdGUoW3ggKyAwLjUsIHkgKyAwLjUsIHogKyAwLjVdKTtcclxuICAgICAgICAgICAgICAgIHNpbS5hZGRPYmplY3QocGhzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5jb25zdCBjaHVua1ByaW1pdGl2ZSA9IFByaW1pdGl2ZVJlbmRlcmVyLmZyb21BcnJheURhdGEod29ybGQuZ2VuZXJhdGVHZW9tZXRyeURhdGFGb3JDZWxsKDAsIDAsIDApKTtcclxuY2h1bmtQcmltaXRpdmVcclxuICAgIC5jcmVhdGVWQU8oKVxyXG4gICAgLnNldERyYXdlcihkcmF3ZXIpXHJcbiAgICAuc2V0UHJvZ3JhbUluZm8odGV4dHVyZVByb2dyYW1JbmZvKVxyXG4gICAgLnNldE1vZGUoNCk7XHJcbmxldCBvYmplY3RzVG9EcmF3ID0gW107XHJcbmNvbnN0IGUgPSBbXTtcclxuY29uc29sZS5sb2coZSk7XHJcbmZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcclxuICAgIGNvbnN0IGJveCA9IHtcclxuICAgICAgICBwaHlzaWNzOiBuZXcgUmlnaWRCb2R5KG5ldyBCb3goMC4yLCAxLCAwLjIpKSxcclxuICAgICAgICBzcHJpdGU6IGN1YmUsXHJcbiAgICAgICAgdW5pZm9ybXM6IHsgdV9jb2xvcjogW01hdGgucmFuZG9tKCksIE1hdGgucmFuZG9tKCksIE1hdGgucmFuZG9tKCksIDFdIH0sXHJcbiAgICB9O1xyXG4gICAgYm94LnBoeXNpY3MudHJhbnNsYXRlKFsxNSArIChpICUgNSkgKiAzLCA1MCArIDMuMDEgKiAoaSAlIDMpLCAxNV0pO1xyXG4gICAgLy9ib3gucGh5c2ljcy50cmFuc2xhdGUoWzAsICAxICsgMy4wMSAqIChpKSwgMF0pO1xyXG4gICAgYm94LnBoeXNpY3Muc2V0TWFzcyg1KTtcclxuICAgIGJveC5waHlzaWNzLmFkZEFjY2VsZXJhdGlvbihbMCwgLTksIDBdKTtcclxuICAgIHNpbS5hZGRPYmplY3QoYm94LnBoeXNpY3MpO1xyXG4gICAgb2JqZWN0c1RvRHJhdy5wdXNoKGJveCk7XHJcbn1cclxuY29uc3QgYm94ID0ge1xyXG4gICAgcGh5c2ljczogbmV3IFJpZ2lkQm9keShuZXcgU3BoZXJlKDEpKSxcclxuICAgIHNwcml0ZTogc3BoZXJlLFxyXG4gICAgdW5pZm9ybXM6IHsgdV9jb2xvcjogWzAsIDAsIDEsIDFdIH0sXHJcbn07XHJcbmJveC5waHlzaWNzLnRyYW5zbGF0ZShbMTAsIDQwLCAxMF0pO1xyXG5ib3gucGh5c2ljcy5zZXRNYXNzKDMyKTtcclxuYm94LnBoeXNpY3MuYWRkQWNjZWxlcmF0aW9uKFswLCAtOSwgMF0pO1xyXG5ib3gucGh5c2ljcy5hZGRWZWxvY2l0eShbMCwgMCwgMF0pO1xyXG5ib3gucGh5c2ljcy5hZGRBbmd1bGFyVmVsb2NpdHkoWzEsIDEsIDFdKTtcclxuc2ltLmFkZE9iamVjdChib3gucGh5c2ljcyk7XHJcbm9iamVjdHNUb0RyYXcucHVzaChib3gpO1xyXG4vKlxyXG5jb25zdCBib3gyID0geyBwaHlzaWNzOiBuZXcgUmlnaWRCb2R5KG5ldyBCb3goNSkpLCBzcHJpdGU6IGN1YmUsIHVuaWZvcm1zIDoge3VfY29sb3IgOiBbMCwwLDEsMV19IH07XHJcbiAgYm94Mi5waHlzaWNzLnRyYW5zbGF0ZShbMCw1LDBdKTtcclxuICBib3gyLnBoeXNpY3Muc2V0TWFzcygyKTtcclxuICBib3gyLnBoeXNpY3MuYWRkQWNjZWxlcmF0aW9uKFswLCAtOSwgMF0pO1xyXG4gIGJveDIucGh5c2ljcy5hZGRWZWxvY2l0eShbMCwyMCwtMF0pXHJcbiAgYm94Mi5waHlzaWNzLmFkZEFuZ3VsYXJWKFsxLDEsMV0pXHJcbiAgc2ltLmFkZE9iamVjdChib3gyLnBoeXNpY3MpO1xyXG4gIG9iamVjdHNUb0RyYXcucHVzaChib3gyKTtcclxuKi9cclxubGV0IGxhc3RDYWxsID0gRGF0ZS5ub3coKTtcclxuY29uc3Qgc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcclxuY29uc3QgbG9vcCA9ICgpID0+IHtcclxuICAgIHBsYXllci50aWNrKCk7XHJcbiAgICBzaW0udGljaygwLjAxNSk7XHJcbiAgICBjb25zdCBjdXJlbnRUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgIGNvbnN0IGRlbHRhID0gY3VyZW50VGltZSAtIGxhc3RDYWxsO1xyXG4gICAgRGVidWcuZGF0YS5GUFMgPSBNYXRoLmZsb29yKE51bWJlcigoMSAvIGRlbHRhKSAqIDEwMDApKTtcclxuICAgIERlYnVnLmRhdGEuUlVOVElNRSA9IChjdXJlbnRUaW1lIC0gc3RhcnRUaW1lKSAvIDEwMDA7XHJcbiAgICBsYXN0Q2FsbCA9IGN1cmVudFRpbWU7XHJcbiAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUIHwgZ2wuREVQVEhfQlVGRkVSX0JJVCk7XHJcbiAgICBnbC5lbmFibGUoZ2wuQ1VMTF9GQUNFKTtcclxuICAgIGdsLmVuYWJsZShnbC5ERVBUSF9URVNUKTtcclxuICAgIGNvbnN0IGNhbWVyYU1hdHJpeCA9IHBsYXllci5jYW1NYXRyaXg7XHJcbiAgICBjb25zdCB7IHRyYW5zbGF0aW9uIH0gPSBtNC5kZWNvbXBvc2UoY2FtZXJhTWF0cml4KTtcclxuICAgIGNvbnN0IHVfdmlld1dvcmxkUG9zaXRpb24gPSB0cmFuc2xhdGlvbjtcclxuICAgIG9iamVjdHNUb0RyYXcuZm9yRWFjaCgob2JqKSA9PiB7XHJcbiAgICAgICAgb2JqLnNwcml0ZS5kcmF3KE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB1bmlmb3JtcyksIHsgdV9tYXRyaXg6IG9iai5waHlzaWNzLmNvbGxpZGVyLmdldE00KCksIHVfdmlld1dvcmxkUG9zaXRpb24gfSksIG9iai51bmlmb3JtcyksIGNhbWVyYU1hdHJpeCk7XHJcbiAgICB9KTtcclxuICAgIGNodW5rUHJpbWl0aXZlLmRyYXcoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB1bmlmb3JtcyksIHsgdV9tYXRyaXg6IG00LmlkZW50aXR5KCksIHVfY29sb3I6IFswLCAwLCAwLCAxXSwgdV92aWV3V29ybGRQb3NpdGlvbiB9KSwgY2FtZXJhTWF0cml4KTtcclxuICAgIHBvaW50LmRyYXcoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB1bmlmb3JtcyksIHsgdV9tYXRyaXg6IG00LnNjYWxpbmcoNiwgNiwgNiksIHVfY29sb3I6IFswLCAwLCAwLCAxXSwgdV92aWV3V29ybGRQb3NpdGlvbiB9KSwgY2FtZXJhTWF0cml4KTtcclxuICAgIHBvaW50LmRyYXcoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB1bmlmb3JtcyksIHsgdV9tYXRyaXg6IG00LnNjYWxlKG00LnpSb3RhdGUobTQueVJvdGF0aW9uKE1hdGguUEkpLCAtTWF0aC5QSSAvIDIpLCA2LCA2LCA2KSwgdV9jb2xvcjogWzEsIDAuMSwgMSwgMV0sIHVfdmlld1dvcmxkUG9zaXRpb24gfSksIGNhbWVyYU1hdHJpeCk7XHJcbiAgICAvKlxyXG4gICAgICBmb3IgKGNvbnN0IFtpZCwgbWFuaWZvbGRdIG9mIHNpbS5jb2xsaXNpb25NYW5pZm9sZHMpIHtcclxuICAgICAgICBtYW5pZm9sZC5jb250YWN0cy5mb3JFYWNoKChjb250YWN0KSA9PiB7XHJcbiAgICAgICAgICBwb2ludFxyXG4gICAgICAgICAgICAuZHJhdyhcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB1X21hdHJpeDogbTQudHJhbnNsYXRpb24oLi4uY29udGFjdC5QQSksXHJcbiAgICAgICAgICAgICAgICB1X2NvbG9yOiBbMC42LCAwLjYsIDAuMCwgMV0sXHJcbiAgICAgICAgICAgICAgICAuLi51bmlmb3JtcyxcclxuICAgICAgICAgICAgICAgIHVfdmlld1dvcmxkUG9zaXRpb24sXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBjYW1lcmFNYXRyaXhcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAuZHJhdyhcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB1X21hdHJpeDogbTQudHJhbnNsYXRpb24oLi4uY29udGFjdC5QQiksXHJcbiAgICAgICAgICAgICAgICB1X2NvbG9yOiBbMC41LCAwLjEsIDAuMiwgMV0sXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBjYW1lcmFNYXRyaXhcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIC8qbGluZVxyXG4gICAgICAgICAgICAuYnVmZmVyRGF0YShcclxuICAgICAgICAgICAgICBcImFfcG9zaXRpb25cIixcclxuICAgICAgICAgICAgICBuZXcgRmxvYXQzMkFycmF5KFsuLi5jb250YWN0LlBBLCAuLi52My5zdW0oY29udGFjdC5QQSwgY29udGFjdC5qKV0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLmRyYXcoXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdV9tYXRyaXg6IG00LmlkZW50aXR5KCksXHJcbiAgICAgICAgICAgICAgICB1X2NvbG9yOiBbMC41LCAwLjEsIDAuMiwgMV0sXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBjYW1lcmFNYXRyaXhcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIGxpbmVcclxuICAgICAgICAgICAgLmJ1ZmZlckRhdGEoXHJcbiAgICAgICAgICAgICAgXCJhX3Bvc2l0aW9uXCIsXHJcbiAgICAgICAgICAgICAgbmV3IEZsb2F0MzJBcnJheShbLi4uY29udGFjdC5QQSwgLi4udjMuc3VtKGNvbnRhY3QuUEEsIGNvbnRhY3QuaSldKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5kcmF3KFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHVfbWF0cml4OiBtNC5pZGVudGl0eSgpLFxyXG4gICAgICAgICAgICAgICAgdV9jb2xvcjogWzAuOSwgMC45LCAwLjIsIDFdLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgY2FtZXJhTWF0cml4XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0qL1xyXG4gICAgZ2wudmlld3BvcnQoMCwgMCwgZ2wuY2FudmFzLndpZHRoLCBnbC5jYW52YXMuaGVpZ2h0KTtcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcclxufTtcclxubG9vcCgpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=