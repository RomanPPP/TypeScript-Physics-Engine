/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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

/***/ "./demo/ball/boxUVs.ts":
/*!*****************************!*\
  !*** ./demo/ball/boxUVs.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getBoxUVs": () => (/* binding */ getBoxUVs)
/* harmony export */ });
const defaultUvs = [
    // Front
    0.0, 0.0, 0.25, 0.0, 1.0 * 0.25, 1.0 * 0.25, 0.0, 1.0 * 0.25,
    // Back
    0.0, 0.0, 1.0 * 0.25, 0.0, 1.0 * 0.25, 1.0 * 0.25, 0.0, 1.0 * 0.25,
    // Top
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    // Bottom
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    // Right
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    // Left
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
];
const getBoxUVs = (numTilesX, numTilesY) => {
    const arr = [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,];
    const tileX = 1 / numTilesX;
    const bottom = arr.map((_, i) => i % 2 ? arr[i] * 0.25 + 0.25 : arr[i] * tileX + 5 * tileX);
    const top = bottom.map((_, i) => i % 2 ? bottom[i] + 0.25 : bottom[i]);
    const side = bottom.map((_, i) => i % 2 ? bottom[i] + 0.5 : bottom[i]);
    return new Float32Array([
        // Front
        ...side,
        // Back
        ...side,
        // Top
        ...top,
        // Bottom
        ...bottom,
        // Right
        ...side,
        // Left
        ...side,
    ]);
};


/***/ }),

/***/ "./demo/ball/textureShader.ts":
/*!************************************!*\
  !*** ./demo/ball/textureShader.ts ***!
  \************************************/
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
/*!***************************!*\
  !*** ./demo/ball/ball.ts ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var romanpppmath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! romanpppmath */ "./node_modules/romanpppmath/lib/index.js");
/* harmony import */ var romanpppgraphics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! romanpppgraphics */ "./node_modules/romanpppgraphics/lib/index.js");
/* harmony import */ var _textureShader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./textureShader */ "./demo/ball/textureShader.ts");
/* harmony import */ var _boxUVs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./boxUVs */ "./demo/ball/boxUVs.ts");
/* harmony import */ var _src_misc_FreeCam__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../src/misc/FreeCam */ "./src/misc/FreeCam.js");
/* harmony import */ var _src_misc_keyInput__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../src/misc/keyInput */ "./src/misc/keyInput.js");
/* harmony import */ var _src_misc_mouseInput__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../src/misc/mouseInput */ "./src/misc/mouseInput.js");
/* harmony import */ var _src_physics_RigidBody__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../src/physics/RigidBody */ "./src/physics/RigidBody.ts");
/* harmony import */ var _src_physics_Simulation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../src/physics/Simulation */ "./src/physics/Simulation.ts");
/* harmony import */ var _src_physics_Collider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../src/physics/Collider */ "./src/physics/Collider.ts");
/* harmony import */ var _src_physics_config__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../src/physics/config */ "./src/physics/config.ts");
/* harmony import */ var _src_physics_Debug__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../src/physics/Debug */ "./src/physics/Debug.ts");







const canvas = document.getElementById("canvas");
if (!canvas)
    throw "No canvas found";
const mouseInput = new _src_misc_mouseInput__WEBPACK_IMPORTED_MODULE_6__["default"](canvas);
mouseInput.listen();
const keyInput = new _src_misc_keyInput__WEBPACK_IMPORTED_MODULE_5__["default"]();
keyInput.listen();
const player = new _src_misc_FreeCam__WEBPACK_IMPORTED_MODULE_4__["default"]();
player.listenKeyboard(keyInput);
player.listenMouse(mouseInput);
player.camPos = [-10, 15, 20];
player.rotationX = -Math.PI * 0.1;
player.rotationY = -Math.PI * 0.1;
const context = new romanpppgraphics__WEBPACK_IMPORTED_MODULE_1__.GLcontextWrapper("canvas");
const { PrimitiveRenderer, Drawer, ProgramInfo, TextureInfo, gl } = context;
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
const uvs = (0,_boxUVs__WEBPACK_IMPORTED_MODULE_3__.getBoxUVs)(16, 4);
cube
    .createVAO()
    .setDrawer(drawer)
    .setProgramInfo(textureProgramInfo)
    .bufferData("TEXCOORD_0", uvs)
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
//config.CLIP_BIAS = 0.01;
_src_physics_config__WEBPACK_IMPORTED_MODULE_10__["default"].CONTACT_MANIFOLD_KEEP_TRESHOLD = 0.001;
const sim = new _src_physics_Simulation__WEBPACK_IMPORTED_MODULE_8__["default"]();
const body = new _src_physics_RigidBody__WEBPACK_IMPORTED_MODULE_7__.RigidBody(new _src_physics_Collider__WEBPACK_IMPORTED_MODULE_9__.Box(1, 1, 1));
const floor = {
    physics: new _src_physics_RigidBody__WEBPACK_IMPORTED_MODULE_7__.RigidBody(new _src_physics_Collider__WEBPACK_IMPORTED_MODULE_9__.Box(100, 5, 100)),
    sprite: cube,
    uniforms: { u_color: [1, 0, 1, 1] },
};
floor.physics.setMass(1);
floor.physics.static = true;
floor.physics.translate([0, -2.5, 0]);
sim.addObject(floor.physics);
let objectsToDraw = [];
objectsToDraw.push(floor);
for (let i = 0; i < 15; i++) {
    const box = {
        physics: new _src_physics_RigidBody__WEBPACK_IMPORTED_MODULE_7__.RigidBody(new _src_physics_Collider__WEBPACK_IMPORTED_MODULE_9__.Box(3, 3, 3)),
        sprite: cube,
        uniforms: { u_color: [0, 0, 1, 1] },
    };
    box.physics.translate([-2.5 + (i % 5) * 3, 1 + 3.01 * (i % 3), 0]);
    //box.physics.translate([0,  1 + 3.01 * (i), 0]);
    box.physics.setMass(5);
    box.physics.addAcceleration([0, -9, 0]);
    sim.addObject(box.physics);
    objectsToDraw.push(box);
}
const box = {
    physics: new _src_physics_RigidBody__WEBPACK_IMPORTED_MODULE_7__.RigidBody(new _src_physics_Collider__WEBPACK_IMPORTED_MODULE_9__.Sphere(5)),
    sprite: sphere,
    uniforms: { u_color: [0, 0, 1, 1] },
};
box.physics.translate([0, 5, -30]);
box.physics.setMass(32);
box.physics.addAcceleration([0, -9, 0]);
box.physics.addVelocity([0, 0, 10]);
//box.physics.addAngularVelocity([1, 1, 1]);
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
        obj.sprite.draw(Object.assign(Object.assign(Object.assign({}, uniforms), { u_matrix: obj.physics.getCollider().getM4(), u_viewWorldPosition }), obj.uniforms), cameraMatrix);
    });
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
          line
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
      } */
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    requestAnimationFrame(loop);
};
loop();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsS0FBSztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGNBQWM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUN1Qjs7Ozs7Ozs7Ozs7Ozs7O0FDL0d2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsaUVBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2Z2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLDJCQUEyQixjQUFjO0FBQ3pDLDBCQUEwQixjQUFjO0FBQ3hDLEtBQUs7QUFDTDtBQUNBLGlFQUFlLEVBQUUsRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztBQzFJSTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0Esc0JBQXNCLHFEQUFZLENBQUMsZ0RBQU87QUFDMUMsc0JBQXNCLHFEQUFZLENBQUMsaURBQVE7QUFDM0Msc0JBQXNCLHFEQUFZLENBQUMsaURBQVE7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSwyQkFBMkIsY0FBYztBQUN6QywwQkFBMEIsY0FBYztBQUN4QyxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLGlCQUFpQixnREFBTztBQUN4QixtQkFBbUIsZ0RBQU87QUFDMUIsbUJBQW1CLGdEQUFPO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLEtBQUs7QUFDTDtBQUNBLGlFQUFlLEVBQUUsRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDOWVsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzlCRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsaUVBQWUsRUFBRSxZQUFZLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzVFZjtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGVBQWU7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksZUFBZTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGlDQUFpQztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksMERBQTBEO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGlDQUFpQztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFPRTs7Ozs7Ozs7Ozs7Ozs7O0FDalhZO0FBQ2Y7QUFD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUscURBQVc7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsaURBQU87QUFDMUIsbUJBQW1CLGdEQUFNO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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bUQsT0FBTztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDL0swQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsNkNBQUk7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1V0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixTQUFTO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxPQUFPO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLFFBQVE7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxxQkFBcUI7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxPQUFPO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDbUo7Ozs7Ozs7Ozs7Ozs7OztBQy9Jbko7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxNQUFNLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDYmdCO0FBQ0w7QUFDSDtBQUM2QjtBQUNoQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLG9DQUFvQztBQUNwQztBQUNBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEM7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEM7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixnREFBTTtBQUN2Qiw4QkFBOEIsaURBQU87QUFDckMsZ0JBQWdCLGdEQUFNO0FBQ3RCLFdBQVcsaURBQU8sUUFBUSxrREFBUTtBQUNsQztBQUNBO0FBQ0E7QUFDQSxhQUFhLGdEQUFNLFNBQVMsaURBQU87QUFDbkMsb0JBQW9CLHlEQUFnQjtBQUNwQztBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsaURBQU87QUFDckMsNEJBQTRCLGdEQUFNO0FBQ2xDLFdBQVcsaURBQU8sUUFBUSxrREFBUTtBQUNsQztBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsZ0RBQU0sU0FBUyxpREFBTywwQkFBMEIseURBQWdCO0FBQ3BHO0FBQ0E7QUFDQSxZQUFZLGdEQUFNLFlBQVksZ0RBQU07QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmLDZCQUE2Qix5Q0FBRztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsNkRBQXNCO0FBQ2xELFlBQVksa0RBQVE7QUFDcEI7QUFDQSw0QkFBNEIsNkRBQXNCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix5Q0FBRztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLDJEQUFvQjtBQUNoRCxpQ0FBaUMsa0RBQVE7QUFDekMsbUJBQW1CLGdEQUFNLEtBQUssa0RBQVE7QUFDdEMsbUJBQW1CLGlEQUFPO0FBQzFCLG1CQUFtQixpREFBTztBQUMxQix3QkFBd0IsMkRBQWlCO0FBQ3pDLHdCQUF3QiwyREFBaUI7QUFDekM7QUFDQSxrQkFBa0Isa0RBQVEsQ0FBQyxrREFBUTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLDRCQUE0QiwyREFBb0I7QUFDaEQ7QUFDQSxtQkFBbUIsZ0RBQU0sS0FBSyxrREFBUTtBQUN0QyxtQkFBbUIsaURBQU87QUFDMUIsbUJBQW1CLGlEQUFPO0FBQzFCLHdCQUF3QiwyREFBaUI7QUFDekMsd0JBQXdCLDJEQUFpQjtBQUN6QztBQUNBLGtCQUFrQixrREFBUSxDQUFDLGtEQUFRO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsY0FBYywyQkFBMkI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGtEQUFRO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxzREFBWTtBQUMxQixjQUFjLGtEQUFRLENBQUMsa0RBQVE7QUFDL0IsZ0VBQWdFLGlEQUFPO0FBQ3ZFLGdFQUFnRSxpREFBTztBQUN2RSxRQUFRLHdEQUFhO0FBQ3JCO0FBQ0EsUUFBUSx3REFBYTtBQUNyQjtBQUNBLGtCQUFrQix5REFBYztBQUNoQztBQUNBLGtCQUFrQix5REFBYztBQUNoQyxtQ0FBbUMsZ0RBQU0sU0FBUyxnREFBTSxDQUFDLGtEQUFRLFdBQVcsa0RBQVE7QUFDcEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixpREFBTztBQUMxQixtQkFBbUIsaURBQU87QUFDMUIsK0JBQStCLGdEQUFNLENBQUMsaURBQU87QUFDN0Msd0JBQXdCLDJEQUFpQjtBQUN6Qyx3QkFBd0IsMkRBQWlCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25Pa0M7QUFDbEMsUUFBUSx3REFBd0QsRUFBRSw0Q0FBRTtBQUN0QztBQUM5QixRQUFRLDhDQUE4QyxFQUFFLCtDQUFNO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiw0QkFBNEI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxZQUFZLDBCQUEwQixHQUFHO0FBQzFGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qiw4QkFBOEI7QUFDMUQ7QUFDQTtBQUNBLHdCQUF3QixlQUFlO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixlQUFlO0FBQ3ZDO0FBQ0EsZ0NBQWdDLE9BQU87QUFDdkM7QUFDQTtBQUNBLG9DQUFvQyxxQkFBcUI7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixxQkFBcUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFVBQVUsMkJBQTJCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QVksY0FBYyxFQUFFLHNEQUFZO0FBQ3hDO0FBQ0E7QUFDQSxvRUFBb0UsZUFBZSxrRUFBa0U7QUFDckosS0FBSztBQUNMLDZDQUE2QyxlQUFlLFVBQVUsb0RBQVUsdURBQXVEO0FBQ3ZJLDZDQUE2QyxlQUFlLFVBQVUsa0RBQVEsQ0FBQyxvREFBVSxDQUFDLHNEQUFZLGtGQUFrRjtBQUN4TDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBncmFwaGljcy9saWIvY29tcG9uZW50cy9CdWZmZXJBdHRyaWJ1dGUuanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBncmFwaGljcy9saWIvY29tcG9uZW50cy9EcmF3ZXIuanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBncmFwaGljcy9saWIvY29tcG9uZW50cy9HTFdyYXBwZXIuanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBncmFwaGljcy9saWIvY29tcG9uZW50cy9HbHRmVXRpbHMuanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBncmFwaGljcy9saWIvY29tcG9uZW50cy9NZXNoUmVuZGVyZXIuanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBncmFwaGljcy9saWIvY29tcG9uZW50cy9Nb2RlbC5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcGdyYXBoaWNzL2xpYi9jb21wb25lbnRzL1ByaW1pdGl2ZVJlbmRlcmVyLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL2NvbXBvbmVudHMvUHJpbWl0aXZlcy5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcGdyYXBoaWNzL2xpYi9jb21wb25lbnRzL1Byb2dyYW1JbmZvLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL2NvbXBvbmVudHMvVGV4dHVyZUluZm8uanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBncmFwaGljcy9saWIvY29tcG9uZW50cy9hdHRyaWJUeXBlUHJvcHMuanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBncmFwaGljcy9saWIvY29tcG9uZW50cy9lbnVtcy5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcGdyYXBoaWNzL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcGdyYXBoaWNzL2xpYi9yZW5kZXIvc2hhZGVycy9kZWZhdWx0L2ZyYWcuanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBncmFwaGljcy9saWIvcmVuZGVyL3NoYWRlcnMvZGVmYXVsdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcGdyYXBoaWNzL2xpYi9yZW5kZXIvc2hhZGVycy9kZWZhdWx0L3ZlcnQuanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBncmFwaGljcy9saWIvcmVuZGVyL3NoYWRlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBncmFwaGljcy9saWIvcmVuZGVyL3NoYWRlcnMvcG9pbnRMaWdodC9mcmFnLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL3JlbmRlci9zaGFkZXJzL3BvaW50TGlnaHQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBncmFwaGljcy9saWIvcmVuZGVyL3NoYWRlcnMvcG9pbnRMaWdodC92ZXJ0LmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwbWF0aC9saWIvT2N0cmVlLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwbWF0aC9saWIvYWFiYi5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcG1hdGgvbGliL2luZGV4LmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwbWF0aC9saWIvbTMuanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBtYXRoL2xpYi9tNC5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcG1hdGgvbGliL3YzLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vZGVtby9iYWxsL2JveFVWcy50cyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL2RlbW8vYmFsbC90ZXh0dXJlU2hhZGVyLnRzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL3BoeXNpY3MvQUFCQi50cyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL3NyYy9waHlzaWNzL0NvbGxpZGVyLnRzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL3BoeXNpY3MvQ29uc3RyYWludHMudHMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9zcmMvcGh5c2ljcy9Db250YWN0TWFuaWZvbGQudHMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9zcmMvcGh5c2ljcy9EZWJ1Zy50cyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL3NyYy9waHlzaWNzL0VxdWF0aW9ucy50cyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL3NyYy9waHlzaWNzL0V2ZW50RW1pdHRlci50cyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL3NyYy9waHlzaWNzL1JpZ2lkQm9keS50cyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL3NyYy9waHlzaWNzL1NpbXVsYXRpb24udHMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9zcmMvcGh5c2ljcy9TeXN0ZW0udHMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9zcmMvcGh5c2ljcy9UcmVlLnRzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL3BoeXNpY3MvY2xpcHBpbmcudHMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9zcmMvcGh5c2ljcy9jb25maWcudHMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9zcmMvcGh5c2ljcy9nZXRDb2xsaXNpb25GZWF0dXJlcy50cyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL3NyYy9waHlzaWNzL2dqay50cyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL3NyYy9taXNjL0ZyZWVDYW0uanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9zcmMvbWlzYy9rZXlJbnB1dC5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL3NyYy9taXNjL21vdXNlSW5wdXQuanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3JvbWFucHBwcGhzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL2RlbW8vYmFsbC9iYWxsLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZMT0FULCBGTE9BVF9NQVQyLCBGTE9BVF9NQVQzLCBGTE9BVF9NQVQ0LCBGTE9BVF9WRUMyLCBJTlQsIEZMT0FUX1ZFQzMsIEZMT0FUX1ZFQzQsIFVOU0lHTkVEX0lOVCwgVU5TSUdORURfSU5UX1ZFQzIsIFVOU0lHTkVEX0lOVF9WRUMzLCBVTlNJR05FRF9JTlRfVkVDNCwgSU5UX1ZFQzIsIElOVF9WRUMzLCBJTlRfVkVDNCwgQk9PTCwgQk9PTF9WRUMyLCBCT09MX1ZFQzMsIEJPT0xfVkVDNCwgfSBmcm9tIFwiLi9lbnVtc1wiO1xyXG5jb25zdCB0eXBlSW5mbyA9IHtcclxuICAgIFtGTE9BVF9NQVQ0XTogeyBzaXplOiA2NCwgcm93czogNCwgY29sczogNCB9LFxyXG4gICAgW0ZMT0FUX01BVDJdOiB7IHNpemU6IDMyLCByb3dzOiAyLCBjb2xzOiAyIH0sXHJcbiAgICBbRkxPQVRfTUFUM106IHsgc2l6ZTogNDgsIHJvd3M6IDMsIGNvbHM6IDMgfSxcclxufTtcclxuY29uc3QgZmxvYXRBdHRyaWJTZXR0ZXIgPSAoeyBudW1Db21wb25lbnRzLCB0eXBlLCBsb2NhdGlvbiwgc3RyaWRlLCBvZmZzZXQsIGJ1ZmZlciwgZ2wsIGRpdmlzb3IsIG5vcm1hbGl6ZSwgfSkgPT4ge1xyXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGJ1ZmZlcik7XHJcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShsb2NhdGlvbik7XHJcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGxvY2F0aW9uLCBudW1Db21wb25lbnRzLCB0eXBlIHx8IGdsLkZMT0FULCBub3JtYWxpemUgfHwgZmFsc2UsIHN0cmlkZSB8fCAwLCBvZmZzZXQgfHwgMCk7XHJcbiAgICBnbC52ZXJ0ZXhBdHRyaWJEaXZpc29yKGxvY2F0aW9uLCBkaXZpc29yIHx8IDApO1xyXG59O1xyXG5jb25zdCBtYXRBdHRyaWJTZXR0ZXIgPSAoeyBudW1Db21wb25lbnRzLCB0eXBlLCBsb2NhdGlvbiwgb2Zmc2V0LCBidWZmZXIsIGdsLCBkaXZpc29yLCBub3JtYWxpemUsIGF0dHJpYnV0ZVR5cGUsIH0pID0+IHtcclxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBidWZmZXIpO1xyXG4gICAgY29uc3Qgc3RyaWRlID0gdHlwZUluZm9bYXR0cmlidXRlVHlwZV0uc2l6ZTtcclxuICAgIGNvbnN0IGNvdW50ID0gdHlwZUluZm9bYXR0cmlidXRlVHlwZV0ucm93cztcclxuICAgIGNvbnN0IHJvd09mZnNldCA9IHN0cmlkZSAvIGNvdW50O1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkobG9jYXRpb24gKyBpKTtcclxuICAgICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGxvY2F0aW9uLCBudW1Db21wb25lbnRzLCB0eXBlIHwgZ2wuRkxPQVQsIGZhbHNlLCBzdHJpZGUgfCAwLCBvZmZzZXQgKyByb3dPZmZzZXQgKiBpKTtcclxuICAgICAgICBnbC52ZXJ0ZXhBdHRyaWJEaXZpc29yKGxvY2F0aW9uICsgaSwgZGl2aXNvciB8fCAwKTtcclxuICAgIH1cclxufTtcclxuY29uc3QgaW50QXR0cmliU2V0dGVyID0gKHsgbnVtQ29tcG9uZW50cywgdHlwZSwgbG9jYXRpb24sIHN0cmlkZSwgb2Zmc2V0LCBidWZmZXIsIGdsLCBkaXZpc29yLCB9KSA9PiB7XHJcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgYnVmZmVyKTtcclxuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGxvY2F0aW9uKTtcclxuICAgIGdsLnZlcnRleEF0dHJpYklQb2ludGVyKGxvY2F0aW9uLCBudW1Db21wb25lbnRzLCB0eXBlIHx8IGdsLklOVCwgc3RyaWRlIHx8IDAsIG9mZnNldCB8fCAwKTtcclxuICAgIGdsLnZlcnRleEF0dHJpYkRpdmlzb3IobG9jYXRpb24sIGRpdmlzb3IgfHwgMCk7XHJcbn07XHJcbmNvbnN0IGF0dHJpYlR5cGVNYXAgPSB7fTtcclxuYXR0cmliVHlwZU1hcFtJTlRdID0gaW50QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW0ZMT0FUXSA9IGZsb2F0QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW0ZMT0FUX1ZFQzJdID0gZmxvYXRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbRkxPQVRfVkVDM10gPSBmbG9hdEF0dHJpYlNldHRlcjtcclxuYXR0cmliVHlwZU1hcFtGTE9BVF9WRUM0XSA9IGZsb2F0QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW0ZMT0FUX01BVDJdID0gbWF0QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW0ZMT0FUX01BVDNdID0gbWF0QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW0ZMT0FUX01BVDRdID0gbWF0QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW1VOU0lHTkVEX0lOVF0gPSBpbnRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbVU5TSUdORURfSU5UX1ZFQzJdID0gaW50QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW1VOU0lHTkVEX0lOVF9WRUMzXSA9IGludEF0dHJpYlNldHRlcjtcclxuYXR0cmliVHlwZU1hcFtVTlNJR05FRF9JTlRfVkVDM10gPSBpbnRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbVU5TSUdORURfSU5UX1ZFQzRdID0gaW50QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW0lOVF9WRUMyXSA9IGludEF0dHJpYlNldHRlcjtcclxuYXR0cmliVHlwZU1hcFtJTlRfVkVDM10gPSBpbnRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbSU5UX1ZFQzRdID0gaW50QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW0JPT0xdID0gaW50QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW0JPT0xfVkVDMl0gPSBpbnRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbQk9PTF9WRUMzXSA9IGludEF0dHJpYlNldHRlcjtcclxuYXR0cmliVHlwZU1hcFtCT09MX1ZFQzRdID0gaW50QXR0cmliU2V0dGVyO1xyXG5jbGFzcyBCdWZmZXJBdHRyaWJ1dGVJbmZvIHtcclxuICAgIGNvbnN0cnVjdG9yKGdsLCB7IHN0cmlkZSwgdHlwZSwgb2Zmc2V0LCBsb2NhdGlvbiwgbnVtQ29tcG9uZW50cywgYXR0cmlidXRlVHlwZSwgZGl2aXNvciB9KSB7XHJcbiAgICAgICAgdGhpcy5nbCA9IGdsO1xyXG4gICAgICAgIHRoaXMuYnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XHJcbiAgICAgICAgdGhpcy5zdHJpZGUgPSBzdHJpZGUgfCAwO1xyXG4gICAgICAgIHRoaXMubnVtQ29tcG9uZW50cyA9IG51bUNvbXBvbmVudHM7XHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVUeXBlID0gYXR0cmlidXRlVHlwZTtcclxuICAgICAgICB0aGlzLm9mZnNldCA9IG9mZnNldCB8IDA7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb247XHJcbiAgICAgICAgdGhpcy5kaXZpc29yID0gZGl2aXNvcjtcclxuICAgIH1cclxuICAgIHNldEF0dHJpYnV0ZSgpIHtcclxuICAgICAgICBjb25zdCB7IGF0dHJpYnV0ZVR5cGUgfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3Qgc2V0dGVyID0gYXR0cmliVHlwZU1hcFthdHRyaWJ1dGVUeXBlXTtcclxuICAgICAgICBzZXR0ZXIodGhpcyk7XHJcbiAgICB9XHJcbiAgICBidWZmZXJEYXRhKGRhdGEsIHVzYWdlID0gMHg4OGU0KSB7XHJcbiAgICAgICAgY29uc3QgeyBnbCwgYnVmZmVyIH0gPSB0aGlzO1xyXG4gICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBidWZmZXIpO1xyXG4gICAgICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBkYXRhLCB1c2FnZSk7XHJcbiAgICB9XHJcbiAgICBhbGxvY0J1ZmZlcihieXRlTGVuZ3RoLCB1c2FnZSA9IDB4ODhlNCkge1xyXG4gICAgICAgIGNvbnN0IHsgZ2wsIGJ1ZmZlciB9ID0gdGhpcztcclxuICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgYnVmZmVyKTtcclxuICAgICAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgYnl0ZUxlbmd0aCwgdXNhZ2UpO1xyXG4gICAgfVxyXG4gICAgYnVmZmVyU3ViRGF0YShkYXRhLCBvZmZzZXQgPSAwKSB7XHJcbiAgICAgICAgY29uc3QgeyBnbCwgYnVmZmVyIH0gPSB0aGlzO1xyXG4gICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBidWZmZXIpO1xyXG4gICAgICAgIGdsLmJ1ZmZlclN1YkRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBvZmZzZXQsIGRhdGEpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7IEJ1ZmZlckF0dHJpYnV0ZUluZm8gfTtcclxuIiwiaW1wb3J0IHsgbTQgfSBmcm9tIFwicm9tYW5wcHBtYXRoXCI7XHJcbmNvbnN0IGRlZ1RvUmFkID0gKGQpID0+IChkICogTWF0aC5QSSkgLyAxODA7XHJcbmNvbnN0IGZpZWxkT2ZWaWV3UmFkaWFucyA9IGRlZ1RvUmFkKDkwKTtcclxuY2xhc3MgRHJhd2VyIHtcclxuICAgIHN0YXRpYyBjcmVhdGUzZFByb2plY3Rpb25NYXRyaXgoek5lYXIsIHpGYXIsIGNsaWVudFdpZHRoLCBjbGllbnRIZWlnaHQpIHtcclxuICAgICAgICBjb25zdCBhc3BlY3QgPSBjbGllbnRXaWR0aCAvIGNsaWVudEhlaWdodDtcclxuICAgICAgICByZXR1cm4gbTQucGVyc3BlY3RpdmUoZmllbGRPZlZpZXdSYWRpYW5zLCBhc3BlY3QsIHpOZWFyLCB6RmFyKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcclxuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG4gICAgICAgIHRoaXMucHJvamVjdGlvbk1hdHJpeCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBzZXRDb250ZXh0KGdsQ29udGV4dFdyYXBwZXIpIHtcclxuICAgICAgICB0aGlzLmNvbnRleHQgPSBnbENvbnRleHRXcmFwcGVyO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgZHJhdyhwcmltaXRpdmVSZW5kZXJlciwgdW5pZm9ybXMsIGNhbWVyYU1hdHJpeCkge1xyXG4gICAgICAgIGNvbnN0IHsgVkFPLCBtb2RlLCBvZmZzZXQsIG51bUVsZW1lbnRzLCBpbmRpY2VzLCBwcm9ncmFtSW5mbywgY29tcG9uZW50VHlwZSwgfSA9IHByaW1pdGl2ZVJlbmRlcmVyO1xyXG4gICAgICAgIGNvbnN0IHsgcHJvamVjdGlvbk1hdHJpeCB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCB7IGdsIH0gPSB0aGlzLmNvbnRleHQ7XHJcbiAgICAgICAgY29uc3Qgdmlld01hdHJpeCA9IG00LmludmVyc2UoY2FtZXJhTWF0cml4KTtcclxuICAgICAgICBjb25zdCB2aWV3UHJvamVjdGlvbk1hdHJpeCA9IG00Lm11bHRpcGx5KHByb2plY3Rpb25NYXRyaXgsIHZpZXdNYXRyaXgpO1xyXG4gICAgICAgIGNvbnN0IHVfd29ybGRWaWV3UHJvamVjdGlvbiA9IG00Lm11bHRpcGx5KHZpZXdQcm9qZWN0aW9uTWF0cml4LCB1bmlmb3Jtcy51X21hdHJpeCk7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnVzZVByb2dyYW1JbmZvKHByb2dyYW1JbmZvKTtcclxuICAgICAgICB0aGlzLmNvbnRleHRcclxuICAgICAgICAgICAgLmxhc3RVc2VkUHJvZ3JhbUluZm9cclxuICAgICAgICAgICAgLnNldFVuaWZvcm1zKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdW5pZm9ybXMpLCB7IHVfd29ybGRWaWV3UHJvamVjdGlvbiB9KSk7XHJcbiAgICAgICAgZ2wuYmluZFZlcnRleEFycmF5KFZBTyk7XHJcbiAgICAgICAgaWYgKCFpbmRpY2VzKSB7XHJcbiAgICAgICAgICAgIGdsLmRyYXdBcnJheXMobW9kZSwgb2Zmc2V0LCBudW1FbGVtZW50cyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2wuZHJhd0VsZW1lbnRzKG1vZGUsIG51bUVsZW1lbnRzLCBjb21wb25lbnRUeXBlLCBvZmZzZXQpO1xyXG4gICAgfVxyXG4gICAgZHJhd0luc3RhbmNlZChwcmltaXRpdmVSZW5kZXJlciwgdW5pZm9ybXMsIGNhbWVyYU1hdHJpeCwgbnVtSW5zdGFuY2VzKSB7XHJcbiAgICAgICAgY29uc3QgeyBWQU8sIG1vZGUsIG9mZnNldCwgbnVtRWxlbWVudHMsIGluZGljZXMsIHByb2dyYW1JbmZvLCBjb21wb25lbnRUeXBlLCB9ID0gcHJpbWl0aXZlUmVuZGVyZXI7XHJcbiAgICAgICAgY29uc3QgeyBwcm9qZWN0aW9uTWF0cml4IH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuY29udGV4dDtcclxuICAgICAgICBjb25zdCB2aWV3TWF0cml4ID0gbTQuaW52ZXJzZShjYW1lcmFNYXRyaXgpO1xyXG4gICAgICAgIGNvbnN0IHZpZXdQcm9qZWN0aW9uTWF0cml4ID0gbTQubXVsdGlwbHkocHJvamVjdGlvbk1hdHJpeCwgdmlld01hdHJpeCk7XHJcbiAgICAgICAgY29uc3Qgd29ybGRWaWV3UHJvamVjdGlvbiA9IG00Lm11bHRpcGx5KHZpZXdQcm9qZWN0aW9uTWF0cml4LCB1bmlmb3Jtcy51X21hdHJpeCk7XHJcbiAgICAgICAgY29uc3Qgd29ybGRNYXRyaXggPSB1bmlmb3Jtcy51X21hdHJpeDtcclxuICAgICAgICB0aGlzLmNvbnRleHQudXNlUHJvZ3JhbUluZm8ocHJvZ3JhbUluZm8pO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5cclxuICAgICAgICAgICAgbGFzdFVzZWRQcm9ncmFtSW5mb1xyXG4gICAgICAgICAgICAuc2V0VW5pZm9ybXMoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB1bmlmb3JtcyksIHsgd29ybGRNYXRyaXgsIHdvcmxkVmlld1Byb2plY3Rpb24gfSkpO1xyXG4gICAgICAgIGdsLmJpbmRWZXJ0ZXhBcnJheShWQU8pO1xyXG4gICAgICAgIGlmICghaW5kaWNlcykge1xyXG4gICAgICAgICAgICBnbC5kcmF3QXJyYXlzSW5zdGFuY2VkKG1vZGUsIG9mZnNldCwgbnVtRWxlbWVudHMsIG51bUluc3RhbmNlcyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2wuZHJhd0VsZW1lbnRzSW5zdGFuY2VkKG1vZGUsIG51bUVsZW1lbnRzLCBnbC5VTlNJR05FRF9TSE9SVCwgb2Zmc2V0LCBudW1JbnN0YW5jZXMpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IERyYXdlcjtcclxuIiwiaW1wb3J0IHsgVGV4dHVyZUluZm8gfSBmcm9tIFwiLi9UZXh0dXJlSW5mb1wiO1xyXG5pbXBvcnQgUHJpbWl0aXZlUmVuZGVyZXIgZnJvbSBcIi4vUHJpbWl0aXZlUmVuZGVyZXJcIjtcclxuaW1wb3J0IERyYXdlciBmcm9tIFwiLi9EcmF3ZXJcIjtcclxuaW1wb3J0IHsgUHJvZ3JhbUluZm8gfSBmcm9tIFwiLi9Qcm9ncmFtSW5mb1wiO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHTFdyYXBwZXIge1xyXG4gICAgY29uc3RydWN0b3IoY2FudmFzSWQpIHtcclxuICAgICAgICB0aGlzLlByb2dyYW1JbmZvID0gKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHJldHVybiBjbGFzcyBleHRlbmRzIFByb2dyYW1JbmZvIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yKHZlcnRleFNoYWRlclNvdXJjZSwgZnJhZ21lbnRTaGFkZXJTb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdXBlcihzZWxmLCB2ZXJ0ZXhTaGFkZXJTb3VyY2UsIGZyYWdtZW50U2hhZGVyU291cmNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KSgpO1xyXG4gICAgICAgIHRoaXMuUHJpbWl0aXZlUmVuZGVyZXIgPSAoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuIGNsYXNzIGV4dGVuZHMgUHJpbWl0aXZlUmVuZGVyZXIge1xyXG4gICAgICAgICAgICAgICAgc3RhdGljIGZyb21BcnJheURhdGEoYXJyYXlEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJpbWl0aXZlUmVuZGVyZXIgPSBuZXcgUHJpbWl0aXZlUmVuZGVyZXIoc2VsZi5nbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWl0aXZlUmVuZGVyZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNyZWF0ZVZBTygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jcmVhdGVHZW9tZXRyeUJ1ZmZlcnMoYXJyYXlEYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2V0QXR0cmlidXRlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmltaXRpdmVSZW5kZXJlcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cGVyKHNlbGYuZ2wpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICAgICAgdGhpcy5EcmF3ZXIgPSAoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuIGNsYXNzIGV4dGVuZHMgRHJhd2VyIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cGVyKHNlbGYpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICAgICAgdGhpcy5UZXh0dXJlSW5mbyA9ICgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gY2xhc3MgZXh0ZW5kcyBUZXh0dXJlSW5mbyB7XHJcbiAgICAgICAgICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdXBlcihzZWxmLmdsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KSgpO1xyXG4gICAgICAgIGNvbnN0IGdsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzSWQpLmdldENvbnRleHQoXCJ3ZWJnbDJcIik7XHJcbiAgICAgICAgaWYgKCFnbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyB3ZWJnbCFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2wgPSBnbDtcclxuICAgICAgICB0aGlzLnByb2dyYW1zID0ge307XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgZ2V0TGFzdFVzZWRQcm9ncmFtSW5mbygpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyQ2FjaGUubGFzdFVzZWRQcm9ncmFtSW5mbztcclxuICAgIH1cclxuICAgIHNldExhc3RVc2VkUHJvZ3JhbShwcm9ncmFtSW5mbykge1xyXG4gICAgICB0aGlzLnJlbmRlckNhY2hlLmxhc3RVc2VkUHJvZ3JhbUluZm8gPSBwcm9ncmFtSW5mbztcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAqL1xyXG4gICAgdXNlUHJvZ3JhbUluZm8ocHJvZ3JhbUluZm8pIHtcclxuICAgICAgICBpZiAocHJvZ3JhbUluZm8gIT0gdGhpcy5sYXN0VXNlZFByb2dyYW1JbmZvKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2wudXNlUHJvZ3JhbShwcm9ncmFtSW5mby5wcm9ncmFtKTtcclxuICAgICAgICAgICAgdGhpcy5sYXN0VXNlZFByb2dyYW1JbmZvID0gcHJvZ3JhbUluZm87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgcmVzaXplQ2FudmFzVG9EaXNwbGF5U2l6ZShtdWx0aXBsaWVyID0gMSkge1xyXG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuZ2wuY2FudmFzO1xyXG4gICAgICAgIGNvbnN0IHdpZHRoID0gKGNhbnZhcy5jbGllbnRXaWR0aCAqIG11bHRpcGxpZXIpIHwgMDtcclxuICAgICAgICBjb25zdCBoZWlnaHQgPSAoY2FudmFzLmNsaWVudEhlaWdodCAqIG11bHRpcGxpZXIpIHwgMDtcclxuICAgICAgICBjYW52YXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgcmVzaXplQ2FudmFzKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgICBjb25zdCBjYW52YXMgPSB0aGlzLmdsLmNhbnZhcztcclxuICAgICAgICBjYW52YXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2V0Vmlld3BvcnQoKSB7XHJcbiAgICAgICAgdGhpcy5nbC52aWV3cG9ydCgwLCAwLCB0aGlzLmdsLmNhbnZhcy53aWR0aCwgdGhpcy5nbC5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGdldENvbnRleHQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2w7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IFByaW1pdGl2ZVJlbmRlcmVyIGZyb20gXCIuL1ByaW1pdGl2ZVJlbmRlcmVyXCI7XHJcbmltcG9ydCB7IE1lc2hSZW5kZXJlciB9IGZyb20gXCIuL01lc2hSZW5kZXJlclwiO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVTZXR0ZXIsIEJ1ZmZlckNvbnRyb2xsZXIgfSBmcm9tIFwiLi9CdWZmZXJBdHRyaWJ1dGVcIjtcclxuaW1wb3J0IHsgTlVNX0NPTVBPTkVOVFMsIFRZUEVEX0FSUkFZUywgTE9DQVRJT05TIH0gZnJvbSBcIi4vZW51bXNcIjtcclxuLy8vIFRPRE8gLy8vXHJcbmNvbnN0IEFycmF5RGF0YUZyb21HbHRmID0gKGdsdGYsIGJ1ZmZlcnMpID0+IHtcclxuICAgIGNvbnN0IHsgYnVmZmVyVmlld3MsIGFjY2Vzc29ycywgbWVzaGVzLCBub2RlcyB9ID0gZ2x0ZjtcclxuICAgIGNvbnN0IGF0dHJpYkRhdGFGcm9tQWNjZXNzb3IgPSAoYWNjZXNzb3IpID0+IHtcclxuICAgICAgICBjb25zdCBidWZmZXJWaWV3ID0gYnVmZmVyVmlld3NbYWNjZXNzb3IuYnVmZmVyVmlld107XHJcbiAgICAgICAgY29uc3QgeyBjb3VudCwgY29tcG9uZW50VHlwZSwgdHlwZSB9ID0gYWNjZXNzb3I7XHJcbiAgICAgICAgY29uc3QgYnl0ZU9mZnNldCA9IGFjY2Vzc29yLmJ5dGVPZmZzZXQgfHwgMDtcclxuICAgICAgICBjb25zdCB7IGJ5dGVMZW5ndGgsIHRhcmdldCB9ID0gYnVmZmVyVmlldztcclxuICAgICAgICBjb25zdCBzdHJpZGUgPSBidWZmZXJWaWV3LmJ5dGVTdHJpZGUgfHwgMDtcclxuICAgICAgICBjb25zdCBidWZmZXJWaWV3Qnl0ZU9mZnNldCA9IGJ1ZmZlclZpZXcuYnl0ZU9mZnNldCB8fCAwO1xyXG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IGJ1ZmZlcnNbYnVmZmVyVmlldy5idWZmZXJdO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRhdGE6IG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgYnVmZmVyVmlld0J5dGVPZmZzZXQsIGJ5dGVMZW5ndGgpLFxyXG4gICAgICAgICAgICBudW1Db21wb25lbnRzOiBOVU1fQ09NUE9ORU5UU1t0eXBlXSxcclxuICAgICAgICAgICAgc3RyaWRlLFxyXG4gICAgICAgICAgICBieXRlTGVuZ3RoLFxyXG4gICAgICAgICAgICBsb2NhdGlvbjogbnVsbCxcclxuICAgICAgICAgICAgY291bnQsXHJcbiAgICAgICAgICAgIHR5cGU6IGNvbXBvbmVudFR5cGUsXHJcbiAgICAgICAgICAgIG9mZnNldDogYnl0ZU9mZnNldCB8fCAwLFxyXG4gICAgICAgICAgICBjb21wb25lbnRUeXBlOiBhY2Nlc3Nvci5jb21wb25lbnRUeXBlLFxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgY29uc3QgX21lc2hlcyA9IG1lc2hlcy5tYXAoKG1lc2gpID0+ICh7XHJcbiAgICAgICAgcHJpbWl0aXZlczogbWVzaC5wcmltaXRpdmVzLm1hcCgoX3ByaW1pdGl2ZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwcmltaXRpdmUgPSB7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7fSxcclxuICAgICAgICAgICAgICAgIG1vZGU6IF9wcmltaXRpdmUubW9kZSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKF9wcmltaXRpdmUuaGFzT3duUHJvcGVydHkoXCJpbmRpY2VzXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRpY2VzSW5mbyA9IGF0dHJpYkRhdGFGcm9tQWNjZXNzb3IoYWNjZXNzb3JzW19wcmltaXRpdmUuaW5kaWNlc10pO1xyXG4gICAgICAgICAgICAgICAgcHJpbWl0aXZlLmluZGljZXMgPSBpbmRpY2VzSW5mby5kYXRhO1xyXG4gICAgICAgICAgICAgICAgcHJpbWl0aXZlLm51bUVsZW1lbnRzID0gaW5kaWNlc0luZm8uY291bnQ7XHJcbiAgICAgICAgICAgICAgICBwcmltaXRpdmUuY29tcG9uZW50VHlwZSA9IGluZGljZXNJbmZvLmNvbXBvbmVudFR5cGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgT2JqZWN0LmtleXMoX3ByaW1pdGl2ZS5hdHRyaWJ1dGVzKS5mb3JFYWNoKChhdHRyaWJOYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhdHRyaWJ1dGUgPSBfcHJpbWl0aXZlLmF0dHJpYnV0ZXNbYXR0cmliTmFtZV07XHJcbiAgICAgICAgICAgICAgICBwcmltaXRpdmUuYXR0cmlidXRlc1thdHRyaWJOYW1lXSA9IGF0dHJpYkRhdGFGcm9tQWNjZXNzb3IoYWNjZXNzb3JzW2F0dHJpYnV0ZV0pO1xyXG4gICAgICAgICAgICAgICAgLy9pZihhdHRyaWJOYW1lID09PSAnSk9JTlRTXzAnKSBfcHJpbWl0aXZlLmF0dHJpYnV0ZXNbYXR0cmliTmFtZV0uZGF0YSA9IG5ldyBVaW50MzJBcnJheShfcHJpbWl0aXZlLmF0dHJpYnV0ZXNbYXR0cmliTmFtZV0uZGF0YSlcclxuICAgICAgICAgICAgICAgIHByaW1pdGl2ZS5hdHRyaWJ1dGVzW2F0dHJpYk5hbWVdLmxvY2F0aW9uID0gTE9DQVRJT05TW2F0dHJpYk5hbWVdO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHByaW1pdGl2ZTtcclxuICAgICAgICB9KSxcclxuICAgICAgICBuYW1lOiBtZXNoLm5hbWUsXHJcbiAgICB9KSk7XHJcbiAgICByZXR1cm4gX21lc2hlcy5tYXAoKG1lc2gpID0+IHtcclxuICAgICAgICBjb25zdCBwcmltaXRpdmVzID0gbWVzaC5wcmltaXRpdmVzLm1hcCgocHJpbWl0aXZlKSA9PiBuZXcgUHJpbWl0aXZlUmVuZGVyZXIocHJpbWl0aXZlKSk7XHJcbiAgICAgICAgY29uc3QgbmFtZSA9IG1lc2gubmFtZTtcclxuICAgICAgICByZXR1cm4gbmV3IE1lc2hSZW5kZXJlcih7IHByaW1pdGl2ZXMsIG5hbWUgfSk7XHJcbiAgICB9KTtcclxufTtcclxuY29uc3QgUHJpbWl0aXZlUmVuZGVySW5mb0Zyb21BcnJheURhdGEgPSAobWVzaGVzKSA9PiBtZXNoZXMubWFwKChtZXNoKSA9PiB7XHJcbiAgICBjb25zdCBwcmltaXRpdmVzID0gbWVzaC5wcmltaXRpdmVzLm1hcCgocHJpbWl0aXZlKSA9PiBuZXcgUHJpbWl0aXZlUmVuZGVyZXIocHJpbWl0aXZlKSk7XHJcbiAgICBjb25zdCBuYW1lID0gbWVzaC5uYW1lO1xyXG4gICAgcmV0dXJuIG5ldyBNZXNoUmVuZGVyZXIoeyBuYW1lLCBwcmltaXRpdmVzIH0pO1xyXG59KTtcclxuY29uc3QgRW50aXR5RGF0YUZyb21HbHRmID0gKGdsdGYsIGJ1ZmZlcnMpID0+IFByaW1pdGl2ZVJlbmRlckluZm9Gcm9tQXJyYXlEYXRhKEFycmF5RGF0YUZyb21HbHRmKGdsdGYsIGJ1ZmZlcnMpKTtcclxuY2xhc3MgR0xURiB7XHJcbiAgICBjb25zdHJ1Y3RvcihnbHRmLCBiaW5hcnlCdWZmZXJzKSB7XHJcbiAgICAgICAgY29uc3QgeyBub2RlcyB9ID0gZ2x0ZjtcclxuICAgICAgICB0aGlzLm5vZGVzID0gbm9kZXM7XHJcbiAgICAgICAgdGhpcy5tZXNoZXMgPSBBcnJheURhdGFGcm9tR2x0ZihnbHRmLCBiaW5hcnlCdWZmZXJzKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgeyBBcnJheURhdGFGcm9tR2x0ZiwgUHJpbWl0aXZlUmVuZGVySW5mb0Zyb21BcnJheURhdGEsIEVudGl0eURhdGFGcm9tR2x0ZiwgR0xURiwgfTtcclxuIiwiaW1wb3J0IGdldEF0dHJpYnV0ZVByb3BzQnlUeXBlIGZyb20gXCIuL2F0dHJpYlR5cGVQcm9wc1wiO1xyXG5pbXBvcnQgYXR0cmliVHlwZVByb3BzIGZyb20gXCIuL2F0dHJpYlR5cGVQcm9wc1wiO1xyXG5pbXBvcnQgeyBCdWZmZXJBdHRyaWJ1dGUgfSBmcm9tIFwiLi9CdWZmZXJBdHRyaWJ1dGVcIjtcclxuY2xhc3MgTWVzaFJlbmRlcmVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHsgcHJpbWl0aXZlcywgbmFtZSB9KSB7XHJcbiAgICAgICAgdGhpcy5wcmltaXRpdmVzID0gcHJpbWl0aXZlcztcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuY29udGV4dCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5idWZmZXJzID0ge307XHJcbiAgICB9XHJcbiAgICBkcmF3KHVuaWZvcm1zLCBjYW1lcmFNYXRyaXgpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbiA9IHRoaXMucHJpbWl0aXZlcy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5wcmltaXRpdmVzW2ldLmRyYXcodW5pZm9ybXMsIGNhbWVyYU1hdHJpeCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgZHJhd0luc3RhbmNlZCh1bmlmb3JtcywgY2FtZXJhTWF0cml4LCBudW1JbnN0YW5jZXMpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbiA9IHRoaXMucHJpbWl0aXZlcy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5wcmltaXRpdmVzW2ldLmRyYXdJbnN0YW5jZWQodW5pZm9ybXMsIGNhbWVyYU1hdHJpeCwgbnVtSW5zdGFuY2VzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgU2tpbm5lZE1lc2hSZW5kZXJlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihwcmltaXRpdmVzLCBza2luKSB7XHJcbiAgICAgICAgdGhpcy5wcmltaXRpdmVzID0gcHJpbWl0aXZlcztcclxuICAgICAgICB0aGlzLnNraW4gPSBza2luO1xyXG4gICAgfVxyXG4gICAgZHJhdyh1bmlmb3JtcywgY2FtZXJhTWF0cml4KSB7XHJcbiAgICAgICAgdGhpcy5za2luLnVwZGF0ZSh1bmlmb3Jtcy51X21hdHJpeCk7XHJcbiAgICAgICAgY29uc3QgX3VuaWZvcm1zID0gT2JqZWN0LmFzc2lnbih7IHVfam9pbnRUZXh0dXJlOiB0aGlzLnNraW4uam9pbnRUZXh0dXJlLCB1X251bUpvaW50czogdGhpcy5za2luLmpvaW50cy5sZW5ndGggfSwgdW5pZm9ybXMpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gdGhpcy5wcmltaXRpdmVzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnByaW1pdGl2ZXNbaV0uZHJhdyhfdW5pZm9ybXMsIGNhbWVyYU1hdHJpeCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7IE1lc2hSZW5kZXJlciwgU2tpbm5lZE1lc2hSZW5kZXJlciB9O1xyXG4iLCJjbGFzcyBUUlMge1xyXG4gICAgY29uc3RydWN0b3IodHJhbnNsYXRpb24sIHJvdGF0aW9uLCBzY2FsZSkge1xyXG4gICAgICAgIHRoaXMudHJhbnNsYXRpb24gPSB0cmFuc2xhdGlvbjtcclxuICAgICAgICB0aGlzLnJvdGF0aW9uID0gcm90YXRpb247XHJcbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xyXG4gICAgfVxyXG4gICAgZ2V0TWF0cml4KG0pIHtcclxuICAgICAgICBsZXQgZHN0ID0gbSB8fCBtNC5pZGVudGl0eSgpO1xyXG4gICAgICAgIHZhciB0ID0gdGhpcy50cmFuc2xhdGlvbjtcclxuICAgICAgICB2YXIgciA9IHRoaXMucm90YXRpb247XHJcbiAgICAgICAgdmFyIHMgPSB0aGlzLnNjYWxlO1xyXG4gICAgICAgIGNvbnN0IHNpbiA9IE1hdGguc2luKHJbM10gLyAyKTtcclxuICAgICAgICBjb25zdCBjb3MgPSBNYXRoLmNvcyhyWzNdIC8gMik7XHJcbiAgICAgICAgZHN0ID0gbTQudHJhbnNsYXRlKGRzdCwgdFswXSwgdFsxXSwgdFsyXSk7XHJcbiAgICAgICAgZHN0ID0gbTQubXVsdGlwbHkoZHN0LCBtNC5mcm9tUXVhdGVybmlvbihyKSk7XHJcbiAgICAgICAgZHN0ID0gbTQuc2NhbGUoZHN0LCBzWzBdLCBzWzFdLCBzWzJdKTtcclxuICAgICAgICByZXR1cm4gZHN0O1xyXG4gICAgfVxyXG4gICAgZ2V0Uk1hdHJpeCgpIHtcclxuICAgICAgICBsZXQgZHN0ID0gbTQuaWRlbnRpdHkoKTtcclxuICAgICAgICB2YXIgciA9IHRoaXMucm90YXRpb247XHJcbiAgICAgICAgZHN0ID0gbTQueFJvdGF0ZShkc3QsIHJbMF0pO1xyXG4gICAgICAgIGRzdCA9IG00LnlSb3RhdGUoZHN0LCByWzFdKTtcclxuICAgICAgICBkc3QgPSBtNC56Um90YXRlKGRzdCwgclsyXSk7XHJcbiAgICAgICAgcmV0dXJuIGRzdDtcclxuICAgIH1cclxuICAgIGdldFRSbWF0cml4KCkge1xyXG4gICAgICAgIGNvbnN0IHQgPSB0aGlzLnRyYW5zbGF0aW9uO1xyXG4gICAgICAgIGNvbnN0IHIgPSB0aGlzLnJvdGF0aW9uO1xyXG4gICAgICAgIGxldCBtID0gbTQudHJhbnNsYXRpb24odFswXSwgdFsxXSwgdFsyXSk7XHJcbiAgICAgICAgbSA9IG00LnhSb3RhdGUobSwgclswXSk7XHJcbiAgICAgICAgbSA9IG00LnlSb3RhdGUobSwgclsxXSk7XHJcbiAgICAgICAgbSA9IG00LnpSb3RhdGUobSwgclsyXSk7XHJcbiAgICAgICAgcmV0dXJuIG07XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgTm9kZSB7XHJcbiAgICBzdGF0aWMgbWFrZU1vZGVsKGVudGl0eURlc2NyaXB0aW9uLCByb290Tm9kZU5keCkge1xyXG4gICAgICAgIGNvbnN0IHsgbm9kZXMsIG1lc2hlcyB9ID0gZW50aXR5RGVzY3JpcHRpb247XHJcbiAgICAgICAgY29uc3Qgcm9vdE5vZGUgPSBub2Rlc1tyb290Tm9kZU5keF07XHJcbiAgICAgICAgY29uc3QgbWFrZU5vZGUgPSAobm9kZURlc2NyaXB0aW9uLCBuZHgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdHJzID0gbmV3IFRSUyhub2RlRGVzY3JpcHRpb24udHJhbnNsYXRpb24gfHwgWzAsIDAsIDBdLCBub2RlRGVzY3JpcHRpb24ucm90YXRpb24gfHwgWzAsIDAsIDBdLCBub2RlRGVzY3JpcHRpb24uc2NhbGUgfHwgWzEsIDEsIDFdKTtcclxuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IG5ldyBOb2RlKG5vZGVEZXNjcmlwdGlvbi5uYW1lLCB0cnMsIG5keCk7XHJcbiAgICAgICAgICAgIGlmIChub2RlRGVzY3JpcHRpb24ubWVzaCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUucmVuZGVyZXIgPSBtZXNoZXNbbm9kZURlc2NyaXB0aW9uLm1lc2hdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChub2RlRGVzY3JpcHRpb24uY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgIG5vZGVEZXNjcmlwdGlvbi5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZE5keCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gbWFrZU5vZGUobm9kZXNbY2hpbGROZHhdLCBjaGlsZE5keCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuc2V0UGFyZW50KG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gbWFrZU5vZGUocm9vdE5vZGUsIHJvb3ROb2RlTmR4KTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIHRycyA9IG5ldyBUUlMoKSkge1xyXG4gICAgICAgIHRoaXMud29ybGRNYXRyaXggPSBtNC5pZGVudGl0eSgpO1xyXG4gICAgICAgIHRoaXMucGFyZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuID0gW107XHJcbiAgICAgICAgdGhpcy50cnMgPSB0cnM7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLnBhcnRzID0gW107XHJcbiAgICAgICAgdGhpcy5uZHggPSBuZHg7XHJcbiAgICAgICAgdGhpcy5za2luTmR4ID0gbnVsbDtcclxuICAgICAgICB0aGlzLm9iamVjdHNUb0RyYXcgPSBbXTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyID0gbnVsbDtcclxuICAgIH1cclxuICAgIHNldFBhcmVudChwYXJlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5wYXJlbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgbmR4ID0gdGhpcy5wYXJlbnQuY2hpbGRyZW4uaW5kZXhPZih0aGlzKTtcclxuICAgICAgICAgICAgaWYgKG5keCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5jaGlsZHJlbi5zcGxpY2UobmR4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGFyZW50KSB7XHJcbiAgICAgICAgICAgIHBhcmVudC5jaGlsZHJlbi5wdXNoKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcclxuICAgIH1cclxuICAgIHVwZGF0ZVdvcmxkTWF0cml4KHBhcmVudFdvcmxkTWF0cml4KSB7XHJcbiAgICAgICAgbGV0IG1hdHJpeCA9IHRoaXMudHJzLmdldE1hdHJpeCgpO1xyXG4gICAgICAgIGlmIChwYXJlbnRXb3JsZE1hdHJpeCkge1xyXG4gICAgICAgICAgICBtYXRyaXggPSBtNC5tdWx0aXBseShwYXJlbnRXb3JsZE1hdHJpeCwgbWF0cml4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy53b3JsZE1hdHJpeCA9IG1hdHJpeDtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XHJcbiAgICAgICAgICAgIGNoaWxkLnVwZGF0ZVdvcmxkTWF0cml4KG1hdHJpeCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVQYXJ0c0xpc3QoKSB7XHJcbiAgICAgICAgY29uc3QgaXRlciA9IChub2RlLCBhcnIpID0+IHtcclxuICAgICAgICAgICAgYXJyLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IGl0ZXIoY2hpbGQsIGFycikpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaXRlcih0aGlzLCB0aGlzLnBhcnRzKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZU9iamVjdHNUb0RyYXcoKSB7XHJcbiAgICAgICAgY29uc3QgcXVldWUgPSBbdGhpc107XHJcbiAgICAgICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHF1ZXVlLnBvcCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhub2RlKTtcclxuICAgICAgICAgICAgaWYgKG5vZGUucmVuZGVyZXIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9iamVjdHNUb0RyYXcucHVzaChub2RlKTtcclxuICAgICAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW4pXHJcbiAgICAgICAgICAgICAgICBxdWV1ZS5wdXNoKC4uLm5vZGUuY2hpbGRyZW4pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHRyYXZlcnNlKGZuKSB7XHJcbiAgICAgICAgZm4odGhpcyk7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4gY2hpbGQudHJhdmVyc2UoZm4pKTtcclxuICAgIH1cclxuICAgIGZpbmQobmR4KSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgY29uc3QgaXRlciA9IChub2RlcykgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBub2RlIG9mIG5vZGVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5uZHggPT09IG5keClcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBub2RlO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZXIobm9kZS5jaGlsZHJlbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGl0ZXIoW3RoaXNdKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgZmluZEJ5TmFtZShuYW1lKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgY29uc3QgaXRlciA9IChub2RlcykgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBub2RlIG9mIG5vZGVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5uYW1lID09PSBuYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IG5vZGU7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlcihub2RlLmNoaWxkcmVuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaXRlcihbdGhpc10pO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICByZW5kZXIodW5pZm9ybXMsIGNhbWVyYU1hdHJpeCkge1xyXG4gICAgICAgIHRoaXMub2JqZWN0c1RvRHJhdy5mb3JFYWNoKChvYmplY3QpID0+IHtcclxuICAgICAgICAgICAgb2JqZWN0LnJlbmRlcmVyLmRyYXcoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB1bmlmb3JtcyksIHsgdV9tYXRyaXg6IG9iamVjdC53b3JsZE1hdHJpeCB9KSwgY2FtZXJhTWF0cml4KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5jbGFzcyBNb2RlbCBleHRlbmRzIE5vZGUge1xyXG4gICAgc3RhdGljIG1ha2VNb2RlbChlbnRpdHlEZXNjcmlwdGlvbiwgcm9vdE5vZGVOZHgpIHtcclxuICAgICAgICBjb25zdCB7IG5vZGVzLCBtZXNoZXMgfSA9IGVudGl0eURlc2NyaXB0aW9uO1xyXG4gICAgICAgIGNvbnN0IHJvb3ROb2RlID0gbm9kZXNbcm9vdE5vZGVOZHhdO1xyXG4gICAgICAgIGNvbnN0IG1ha2VOb2RlID0gKG5vZGVEZXNjcmlwdGlvbiwgbmR4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRycyA9IG5ldyBUUlMobm9kZURlc2NyaXB0aW9uLnRyYW5zbGF0aW9uIHx8IFswLCAwLCAwXSwgbm9kZURlc2NyaXB0aW9uLnJvdGF0aW9uIHx8IFswLCAwLCAwLCAwXSwgbm9kZURlc2NyaXB0aW9uLnNjYWxlIHx8IFsxLCAxLCAxXSk7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBuZXcgRW50aXR5KG5vZGVEZXNjcmlwdGlvbi5uYW1lLCB0cnMsIG5keCk7XHJcbiAgICAgICAgICAgIGlmIChub2RlRGVzY3JpcHRpb24ubWVzaCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUucmVuZGVyZXIgPSBtZXNoZXNbbm9kZURlc2NyaXB0aW9uLm1lc2hdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChub2RlRGVzY3JpcHRpb24uY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgIG5vZGVEZXNjcmlwdGlvbi5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZE5keCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gbWFrZU5vZGUobm9kZXNbY2hpbGROZHhdLCBjaGlsZE5keCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuc2V0UGFyZW50KG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gbWFrZU5vZGUocm9vdE5vZGUsIHJvb3ROb2RlTmR4KTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIHRycywgbmR4KSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSwgdHJzKTtcclxuICAgICAgICB0aGlzLm5keCA9IG5keDtcclxuICAgICAgICB0aGlzLnBoeXNpY3MgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc2tpbk5keCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzVG9EcmF3ID0gW107XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG51bGw7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVPYmplY3RzVG9EcmF3KCkge1xyXG4gICAgICAgIGNvbnN0IHF1ZXVlID0gW3RoaXNdO1xyXG4gICAgICAgIHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBxdWV1ZS5wb3AoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobm9kZSk7XHJcbiAgICAgICAgICAgIGlmIChub2RlLnJlbmRlcmVyKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vYmplY3RzVG9EcmF3LnB1c2gobm9kZSk7XHJcbiAgICAgICAgICAgIGlmIChub2RlLmNoaWxkcmVuKVxyXG4gICAgICAgICAgICAgICAgcXVldWUucHVzaCguLi5ub2RlLmNoaWxkcmVuKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB0cmF2ZXJzZShmbikge1xyXG4gICAgICAgIGZuKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IGNoaWxkLnRyYXZlcnNlKGZuKSk7XHJcbiAgICB9XHJcbiAgICBmaW5kKG5keCkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xyXG4gICAgICAgIGNvbnN0IGl0ZXIgPSAobm9kZXMpID0+IHtcclxuICAgICAgICAgICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubmR4ID09PSBuZHgpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gbm9kZTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBpdGVyKG5vZGUuY2hpbGRyZW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpdGVyKFt0aGlzXSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIGZpbmRCeU5hbWUobmFtZSkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xyXG4gICAgICAgIGNvbnN0IGl0ZXIgPSAobm9kZXMpID0+IHtcclxuICAgICAgICAgICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubmFtZSA9PT0gbmFtZSlcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBub2RlO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZXIobm9kZS5jaGlsZHJlbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGl0ZXIoW3RoaXNdKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKHVuaWZvcm1zLCBjYW1lcmFNYXRyaXgpIHtcclxuICAgICAgICB0aGlzLm9iamVjdHNUb0RyYXcuZm9yRWFjaCgob2JqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIG9iamVjdC5yZW5kZXJlci5kcmF3KE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdW5pZm9ybXMpLCB7IHVfbWF0cml4OiBvYmplY3Qud29ybGRNYXRyaXggfSksIGNhbWVyYU1hdHJpeCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgTW9kZWw7XHJcbiIsImltcG9ydCB7IEJ1ZmZlckF0dHJpYnV0ZUluZm8gfSBmcm9tIFwiLi9CdWZmZXJBdHRyaWJ1dGVcIjtcclxuY2xhc3MgUHJpbWl0aXZlUmVuZGVyZXIge1xyXG4gICAgY29uc3RydWN0b3IoZ2wpIHtcclxuICAgICAgICB0aGlzLmJ1ZmZlckF0dHJpYnMgPSB7fTtcclxuICAgICAgICB0aGlzLnByb2dyYW1JbmZvID0gbnVsbDtcclxuICAgICAgICB0aGlzLmdsID0gZ2w7XHJcbiAgICAgICAgdGhpcy5kcmF3ZXIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubW9kZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5vZmZzZXQgPSAwO1xyXG4gICAgICAgIHRoaXMubnVtRWxlbWVudHMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuVkFPID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudFR5cGUgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgc2V0Q29udGV4dChnbCkge1xyXG4gICAgICAgIHRoaXMuZ2wgPSBnbDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGNyZWF0ZVZBTygpIHtcclxuICAgICAgICBpZiAodGhpcy5WQU8pXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIHRoaXMuVkFPID0gdGhpcy5nbC5jcmVhdGVWZXJ0ZXhBcnJheSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2V0TW9kZShtb2RlKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlID0gbW9kZTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNldE51bUVsZW1lbnRzKG51bUVsZW1lbnRzKSB7XHJcbiAgICAgICAgdGhpcy5udW1FbGVtZW50cyA9IG51bUVsZW1lbnRzO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2V0T2Zmc2V0KG9mZnNldCkge1xyXG4gICAgICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2V0SW5kaWNlcyhhcnJheUJ1ZmZlcikge1xyXG4gICAgICAgIGNvbnN0IHsgZ2wsIFZBTyB9ID0gdGhpcztcclxuICAgICAgICBnbC5iaW5kVmVydGV4QXJyYXkoVkFPKTtcclxuICAgICAgICB0aGlzLm51bUVsZW1lbnRzID0gYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCAvIDI7XHJcbiAgICAgICAgY29uc3QgaW5kaWNlc0J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xyXG4gICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGluZGljZXNCdWZmZXIpO1xyXG4gICAgICAgIGdsLmJ1ZmZlckRhdGEoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGFycmF5QnVmZmVyLCBnbC5TVEFUSUNfRFJBVyk7XHJcbiAgICAgICAgZ2wuYmluZFZlcnRleEFycmF5KG51bGwpO1xyXG4gICAgICAgIHRoaXMuaW5kaWNlcyA9IGluZGljZXNCdWZmZXI7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBjcmVhdGVHZW9tZXRyeUJ1ZmZlcnMoYXJyYXlEYXRhKSB7XHJcbiAgICAgICAgY29uc3QgeyBnbCB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCB7IGF0dHJpYnV0ZXMsIGluZGljZXMsIGNvbXBvbmVudFR5cGUsIG51bUVsZW1lbnRzLCBtb2RlLCBvZmZzZXQgfSA9IGFycmF5RGF0YTtcclxuICAgICAgICB0aGlzLm51bUVsZW1lbnRzID0gbnVtRWxlbWVudHM7XHJcbiAgICAgICAgdGhpcy5tb2RlID0gbW9kZTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudFR5cGUgPSBjb21wb25lbnRUeXBlIHx8IDUxMjM7XHJcbiAgICAgICAgdGhpcy5vZmZzZXQgPSAwO1xyXG4gICAgICAgIGlmIChhdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goKGF0dHJpYnV0ZU5hbWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGF0dHJpYlByb3BzID0gYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJ1ZmZlckF0dHJpYnV0ZUluZm8gPSBuZXcgQnVmZmVyQXR0cmlidXRlSW5mbyhnbCwgYXR0cmliUHJvcHMpO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyQXR0cmlidXRlSW5mby5idWZmZXJEYXRhKGF0dHJpYlByb3BzLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idWZmZXJBdHRyaWJzW2F0dHJpYnV0ZU5hbWVdID0gYnVmZmVyQXR0cmlidXRlSW5mbztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbmRpY2VzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGljZXNCdWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcclxuICAgICAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgaW5kaWNlc0J1ZmZlcik7XHJcbiAgICAgICAgICAgIGdsLmJ1ZmZlckRhdGEoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGluZGljZXMsIGdsLlNUQVRJQ19EUkFXKTtcclxuICAgICAgICAgICAgdGhpcy5pbmRpY2VzID0gaW5kaWNlc0J1ZmZlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBzZXRBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXM7XHJcbiAgICAgICAgZ2wuYmluZFZlcnRleEFycmF5KHRoaXMuVkFPKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGF0dHJpYiBpbiB0aGlzLmJ1ZmZlckF0dHJpYnMpIHtcclxuICAgICAgICAgICAgY29uc3QgYnVmZmVyQXR0cmlidXRlSW5mbyA9IHRoaXMuYnVmZmVyQXR0cmlic1thdHRyaWJdO1xyXG4gICAgICAgICAgICBidWZmZXJBdHRyaWJ1dGVJbmZvLnNldEF0dHJpYnV0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLmluZGljZXMpO1xyXG4gICAgICAgIGdsLmJpbmRWZXJ0ZXhBcnJheShudWxsKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNldERyYXdlcihkcmF3ZXIpIHtcclxuICAgICAgICB0aGlzLmRyYXdlciA9IGRyYXdlcjtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNldFByb2dyYW1JbmZvKHByb2dyYW1JbmZvKSB7XHJcbiAgICAgICAgdGhpcy5wcm9ncmFtSW5mbyA9IHByb2dyYW1JbmZvO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlQnVmZmVyQXR0cmliRGF0YSh7IGF0dHJpYk5hbWUsIGxvY2F0aW9uLCBzdHJpZGUsIG51bUNvbXBvbmVudHMsIG9mZnNldCwgdHlwZSwgZGl2aXNvciwgYXR0cmlidXRlVHlwZSwgfSkge1xyXG4gICAgICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgYnVmZmVyQXR0cmliSW5mbyA9IG5ldyBCdWZmZXJBdHRyaWJ1dGVJbmZvKGdsLCB7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLFxyXG4gICAgICAgICAgICBzdHJpZGUsXHJcbiAgICAgICAgICAgIG51bUNvbXBvbmVudHMsXHJcbiAgICAgICAgICAgIG9mZnNldCxcclxuICAgICAgICAgICAgdHlwZSxcclxuICAgICAgICAgICAgZGl2aXNvcixcclxuICAgICAgICAgICAgYXR0cmlidXRlVHlwZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmJ1ZmZlckF0dHJpYnNbYXR0cmliTmFtZV0gPSBidWZmZXJBdHRyaWJJbmZvO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgLypcclxuICAgIHNldEJ1ZmZlckF0dHJpYkRhdGEobmFtZSwgYnVmZmVyQXR0cmliRGF0YSkge1xyXG4gICAgICB0aGlzLmJ1ZmZlcnMgPSB7IC4uLnRoaXMuYnVmZmVycywgW25hbWVdOiBidWZmZXJBdHRyaWJEYXRhIH07XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgKi9cclxuICAgIHNldEF0dHJpYnV0ZShhdHRyaWJOYW1lKSB7XHJcbiAgICAgICAgY29uc3QgeyBnbCB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCBidWZmZXJBdHRyaWJEYXRhID0gdGhpcy5idWZmZXJBdHRyaWJzW2F0dHJpYk5hbWVdO1xyXG4gICAgICAgIGdsLmJpbmRWZXJ0ZXhBcnJheSh0aGlzLlZBTyk7XHJcbiAgICAgICAgYnVmZmVyQXR0cmliRGF0YS5zZXRBdHRyaWJ1dGUoKTtcclxuICAgICAgICBnbC5iaW5kVmVydGV4QXJyYXkobnVsbCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgX3NldEF0dHJpYnV0ZShidWZmZXJBdHRyaWJEYXRhKSB7XHJcbiAgICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXM7XHJcbiAgICAgIGdsLmJpbmRWZXJ0ZXhBcnJheSh0aGlzLnZhbyk7XHJcbiAgICAgIGJ1ZmZlckF0dHJpYkRhdGEuc2V0QXR0cmlidXRlKCk7XHJcbiAgICAgIGdsLmJpbmRWZXJ0ZXhBcnJheShudWxsKTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAqL1xyXG4gICAgYnVmZmVyRGF0YShhdHRyaWJOYW1lLCBkYXRhLCB1c2FnZSkge1xyXG4gICAgICAgIGNvbnN0IGJ1ZmZlckF0dHJpYkluZm8gPSB0aGlzLmJ1ZmZlckF0dHJpYnNbYXR0cmliTmFtZV07XHJcbiAgICAgICAgYnVmZmVyQXR0cmliSW5mby5idWZmZXJEYXRhKGRhdGEsIHVzYWdlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGJ1ZmZlclN1YkRhdGEoYXR0cmliTmFtZSwgZGF0YSwgb2Zmc2V0KSB7XHJcbiAgICAgICAgY29uc3QgYnVmZmVyQXR0cmliSW5mbyA9IHRoaXMuYnVmZmVyQXR0cmlic1thdHRyaWJOYW1lXTtcclxuICAgICAgICBidWZmZXJBdHRyaWJJbmZvLmJ1ZmZlclN1YkRhdGEoZGF0YSwgb2Zmc2V0KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGFsbG9jQnVmZmVyKGF0dHJpYk5hbWUsIGJ5dGVMZW5ndGgsIHVzYWdlKSB7XHJcbiAgICAgICAgY29uc3QgYnVmZmVyQXR0cmliSW5mbyA9IHRoaXMuYnVmZmVyQXR0cmlic1thdHRyaWJOYW1lXTtcclxuICAgICAgICBidWZmZXJBdHRyaWJJbmZvLmFsbG9jQnVmZmVyKGJ5dGVMZW5ndGgsIHVzYWdlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGRyYXcodW5pZm9ybXMsIGNhbWVyYU1hdHJpeCkge1xyXG4gICAgICAgIHRoaXMuZHJhd2VyLmRyYXcodGhpcywgdW5pZm9ybXMsIGNhbWVyYU1hdHJpeCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBkcmF3SW5zdGFuY2VkKHVuaWZvcm1zLCBjYW1lcmFNYXRyaXgsIG51bUluc3RhbmNlcykge1xyXG4gICAgICAgIHRoaXMuZHJhd2VyLmRyYXdJbnN0YW5jZWQodGhpcywgdW5pZm9ybXMsIGNhbWVyYU1hdHJpeCwgbnVtSW5zdGFuY2VzKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBQcmltaXRpdmVSZW5kZXJlcjtcclxuIiwiaW1wb3J0IHsgdjMgfSBmcm9tICdyb21hbnBwcG1hdGgnO1xyXG5pbXBvcnQgeyBGTE9BVF9WRUMyLCBGTE9BVF9WRUMzIH0gZnJvbSBcIi4vZW51bXNcIjtcclxuY29uc3QgeyBjcm9zcywgZGlmZiwgbm9ybWFsaXplIH0gPSB2MztcclxuY29uc3QgbGluZWRCb3hJbmRpY2VzID0gbmV3IFVpbnQxNkFycmF5KFtcclxuICAgIDAsXHJcbiAgICAxLFxyXG4gICAgMSxcclxuICAgIDIsXHJcbiAgICAyLFxyXG4gICAgMyxcclxuICAgIDMsXHJcbiAgICAwLFxyXG4gICAgMCxcclxuICAgIDUsXHJcbiAgICA1LFxyXG4gICAgNCxcclxuICAgIDQsXHJcbiAgICAxLFxyXG4gICAgMSxcclxuICAgIDAsXHJcbiAgICAwLFxyXG4gICAgNCxcclxuICAgIDQsXHJcbiAgICA3LFxyXG4gICAgNyxcclxuICAgIDMsXHJcbiAgICAzLFxyXG4gICAgMCxcclxuICAgIDEsXHJcbiAgICAyLFxyXG4gICAgMixcclxuICAgIDYsXHJcbiAgICA2LFxyXG4gICAgNSxcclxuICAgIDUsXHJcbiAgICAxLFxyXG4gICAgNCxcclxuICAgIDUsXHJcbiAgICA1LFxyXG4gICAgNixcclxuICAgIDYsXHJcbiAgICA3LFxyXG4gICAgNyxcclxuICAgIDQsXHJcbiAgICAyLFxyXG4gICAgNyxcclxuICAgIDcsXHJcbiAgICAzLFxyXG4gICAgMyxcclxuICAgIDYsXHJcbiAgICA2LFxyXG4gICAgMiwgLy8gdG9wXHJcbl0pO1xyXG5jb25zdCBDVUJFX0ZBQ0VfSU5ESUNFUyA9IFtcclxuICAgIFszLCA3LCA1LCAxXSxcclxuICAgIFs2LCAyLCAwLCA0XSxcclxuICAgIFs2LCA3LCAzLCAyXSxcclxuICAgIFswLCAxLCA1LCA0XSxcclxuICAgIFs3LCA2LCA0LCA1XSxcclxuICAgIFsyLCAzLCAxLCAwXSwgLy8gYmFja1xyXG5dO1xyXG5mdW5jdGlvbiBjcmVhdGVCb3goX2EgPSAxLCBfYiA9IDEsIF9jID0gMSkge1xyXG4gICAgY29uc3QgYSA9IF9hIC8gMiwgYiA9IF9iIC8gMiwgYyA9IF9jIC8gMjtcclxuICAgIGNvbnN0IGNvcm5lclZlcnRpY2VzID0gW1xyXG4gICAgICAgIFstYSwgLWIsIC1jXSxcclxuICAgICAgICBbK2EsIC1iLCAtY10sXHJcbiAgICAgICAgWy1hLCArYiwgLWNdLFxyXG4gICAgICAgIFsrYSwgK2IsIC1jXSxcclxuICAgICAgICBbLWEsIC1iLCArY10sXHJcbiAgICAgICAgWythLCAtYiwgK2NdLFxyXG4gICAgICAgIFstYSwgK2IsICtjXSxcclxuICAgICAgICBbK2EsICtiLCArY10sXHJcbiAgICBdO1xyXG4gICAgY29uc3QgZmFjZU5vcm1hbHMgPSBbXHJcbiAgICAgICAgWysxLCArMCwgKzBdLFxyXG4gICAgICAgIFstMSwgKzAsICswXSxcclxuICAgICAgICBbKzAsICsxLCArMF0sXHJcbiAgICAgICAgWyswLCAtMSwgKzBdLFxyXG4gICAgICAgIFsrMCwgKzAsICsxXSxcclxuICAgICAgICBbKzAsICswLCAtMV0sXHJcbiAgICBdO1xyXG4gICAgY29uc3QgdXZDb29yZHMgPSBbXHJcbiAgICAgICAgWzEsIDBdLFxyXG4gICAgICAgIFswLCAwXSxcclxuICAgICAgICBbMCwgMV0sXHJcbiAgICAgICAgWzEsIDFdLFxyXG4gICAgXTtcclxuICAgIGNvbnN0IHBvc2l0aW9ucyA9IFtdO1xyXG4gICAgY29uc3Qgbm9ybWFscyA9IFtdO1xyXG4gICAgLy9jb25zdCB0ZXhDb29yZHMgPSB3ZWJnbFV0aWxzLmNyZWF0ZUF1Z21lbnRlZFR5cGVkQXJyYXkoMiAsIG51bVZlcnRpY2VzKTtcclxuICAgIGNvbnN0IGluZGljZXMgPSBbXTtcclxuICAgIGZvciAobGV0IGYgPSAwOyBmIDwgNjsgKytmKSB7XHJcbiAgICAgICAgY29uc3QgZmFjZUluZGljZXMgPSBDVUJFX0ZBQ0VfSU5ESUNFU1tmXTtcclxuICAgICAgICBmb3IgKGxldCB2ID0gMDsgdiA8IDQ7ICsrdikge1xyXG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IGNvcm5lclZlcnRpY2VzW2ZhY2VJbmRpY2VzW3ZdXTtcclxuICAgICAgICAgICAgY29uc3Qgbm9ybWFsID0gZmFjZU5vcm1hbHNbZl07XHJcbiAgICAgICAgICAgIHBvc2l0aW9ucy5wdXNoKC4uLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgbm9ybWFscy5wdXNoKC4uLm5vcm1hbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG9mZnNldCA9IDQgKiBmO1xyXG4gICAgICAgIGluZGljZXMucHVzaChvZmZzZXQgKyAwLCBvZmZzZXQgKyAxLCBvZmZzZXQgKyAyKTtcclxuICAgICAgICBpbmRpY2VzLnB1c2gob2Zmc2V0ICsgMCwgb2Zmc2V0ICsgMiwgb2Zmc2V0ICsgMyk7XHJcbiAgICB9XHJcbiAgICBjb25zdCB0ZXhjb29yZCA9IG5ldyBGbG9hdDMyQXJyYXkoW1xyXG4gICAgICAgIC8vIEZyb250XHJcbiAgICAgICAgMC4wLCAwLjAsIDEuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAxLjAsXHJcbiAgICAgICAgLy8gQmFja1xyXG4gICAgICAgIDAuMCwgMC4wLCAxLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMS4wLFxyXG4gICAgICAgIC8vIFRvcFxyXG4gICAgICAgIDAuMCwgMC4wLCAxLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMS4wLFxyXG4gICAgICAgIC8vIEJvdHRvbVxyXG4gICAgICAgIDAuMCwgMC4wLCAxLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMS4wLFxyXG4gICAgICAgIC8vIFJpZ2h0XHJcbiAgICAgICAgMC4wLCAwLjAsIDEuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAxLjAsXHJcbiAgICAgICAgLy8gTGVmdFxyXG4gICAgICAgIDAuMCwgMC4wLCAxLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMS4wLFxyXG4gICAgXSk7XHJcbiAgICBjb25zdCBfbm9ybWFscyA9IG5ldyBGbG9hdDMyQXJyYXkobm9ybWFscyk7XHJcbiAgICBjb25zdCBfcG9zaXRpb25zID0gbmV3IEZsb2F0MzJBcnJheShwb3NpdGlvbnMpO1xyXG4gICAgY29uc3QgX2luZGljZXMgPSBuZXcgVWludDE2QXJyYXkoaW5kaWNlcyk7XHJcbiAgICBjb25zdCBfdGV4Y29vcmRzID0gbmV3IEZsb2F0MzJBcnJheSh0ZXhjb29yZCk7XHJcbiAgICBjb25zdCBBcnJheURhdGEgPSB7XHJcbiAgICAgICAgYXR0cmlidXRlczoge1xyXG4gICAgICAgICAgICBOT1JNQUw6IHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IF9ub3JtYWxzLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IDYgKiA0ICogMyxcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAxLFxyXG4gICAgICAgICAgICAgICAgYnl0ZUxlbmd0aDogX25vcm1hbHMuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgIHN0cmlkZTogMCxcclxuICAgICAgICAgICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICAgICAgICAgIG51bUNvbXBvbmVudHM6IDMsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiA1MTI2LFxyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlVHlwZTogRkxPQVRfVkVDM1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBQT1NJVElPTjoge1xyXG4gICAgICAgICAgICAgICAgZGF0YTogX3Bvc2l0aW9ucyxcclxuICAgICAgICAgICAgICAgIGNvdW50OiA2ICogNCAqIDMsXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogMCxcclxuICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGg6IF9wb3NpdGlvbnMuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgIHN0cmlkZTogMCxcclxuICAgICAgICAgICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICAgICAgICAgIG51bUNvbXBvbmVudHM6IDMsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiA1MTI2LFxyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlVHlwZTogRkxPQVRfVkVDM1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBURVhDT09SRF8wOiB7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiBfdGV4Y29vcmRzLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IDQ4LFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNTEyNixcclxuICAgICAgICAgICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICAgICAgICAgIHN0cmlkZTogMCxcclxuICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGg6IF90ZXhjb29yZHMuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiA0LFxyXG4gICAgICAgICAgICAgICAgbnVtQ29tcG9uZW50czogMixcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGU6IEZMT0FUX1ZFQzJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluZGljZXM6IF9pbmRpY2VzLFxyXG4gICAgICAgIG51bUVsZW1lbnRzOiBfaW5kaWNlcy5sZW5ndGgsXHJcbiAgICAgICAgY29tcG9uZW50VHlwZTogNTEyMyxcclxuICAgICAgICBtb2RlOiA0LFxyXG4gICAgfTtcclxuICAgIHJldHVybiBBcnJheURhdGE7XHJcbiAgICAvKnJldHVybiB7XHJcbiAgICAgICAgICAgIGdsdGYgOiB7XHJcbiAgICAgICAgICAgICAgYWNjZXNzb3JzIDogW1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgYnVmZmVyVmlldyA6IDAsXHJcbiAgICAgICAgICAgICAgICAgIGJ5dGVPZmZzZXQgOiAwLFxyXG4gICAgICAgICAgICAgICAgICBjb3VudCA6NzIsXHJcbiAgICAgICAgICAgICAgICAgIGNvbXBvbmVudFR5cGUgOiA1MTI2LFxyXG4gICAgICAgICAgICAgICAgICB0eXBlIDogJ1ZFQzMnXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBidWZmZXJWaWV3IDogMSxcclxuICAgICAgICAgICAgICAgIGJ5dGVPZmZzZXQgOiAwLFxyXG4gICAgICAgICAgICAgICAgY291bnQgOiA3MixcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudFR5cGUgOiA1MTI2LFxyXG4gICAgICAgICAgICAgICAgdHlwZSA6ICdWRUMzJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyVmlldyA6IDIsXHJcbiAgICAgICAgICAgICAgICBieXRlT2Zmc2V0IDogMCxcclxuICAgICAgICAgICAgICAgIGNvdW50IDogMzYsXHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnRUeXBlIDogNTEyMyxcclxuICAgICAgICAgICAgICAgIHR5cGUgOiAnU0NBTEFSJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyVmlldyA6IDMsXHJcbiAgICAgICAgICAgICAgICBieXRlT2Zmc2V0IDogMCxcclxuICAgICAgICAgICAgICAgIGNvdW50IDogNDgsXHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnRUeXBlIDogNTEyNixcclxuICAgICAgICAgICAgICAgIHR5cGUgOiAnVkVDMidcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgYnVmZmVyVmlld3MgOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIGJ1ZmZlciA6IDAsXHJcbiAgICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGggOiBwb3NpdGlvbnMuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgICAgYnl0ZU9mZnNldCA6IDBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIGJ1ZmZlciA6IDEsXHJcbiAgICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGggOiBub3JtYWxzLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgIGJ5dGVPZmZzZXQgOiAwXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICBidWZmZXIgOiAyLFxyXG4gICAgICAgICAgICAgICAgICBieXRlTGVuZ3RoIDogaW5kaWNlcy5ieXRlTGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgICBieXRlT2Zmc2V0IDogMFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgYnVmZmVyIDogMyxcclxuICAgICAgICAgICAgICAgICAgYnl0ZUxlbmd0aCA6IHRleGNvb3JkLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgIGJ5dGVPZmZzZXQgOiAwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgbWVzaGVzIDogW1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWUgOiAnQ3ViZScsXHJcbiAgICAgICAgICAgICAgICBwcmltaXRpdmVzIDogW1xyXG4gICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlcyA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgIE5PUk1BTCA6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICBQT1NJVElPTiA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICBURVhDT09SRF8wIDogM1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kaWNlcyA6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZSA6IDRcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgbm9kZXMgOiBbXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZSA6IFwiQ3ViZVwiLFxyXG4gICAgICAgICAgICAgICAgbWVzaCA6IDAsXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbiA6IFsxXVxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZSA6ICdDdWJlMicsXHJcbiAgICAgICAgICAgICAgICBtZXNoIDogMCxcclxuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uIDogWzEsMSwxXVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGJpbmFyeUJ1ZmZlcnMgOiBbXHJcbiAgICAgICAgICAgIHBvc2l0aW9ucy5idWZmZXIsIG5vcm1hbHMuYnVmZmVyLCBpbmRpY2VzLmJ1ZmZlciwgdGV4Y29vcmQuYnVmZmVyXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfTsqL1xyXG59XHJcbmNvbnN0IGNyZWF0ZUNvbmUgPSAocmFkaXVzID0gMiwgaGVpZ2h0ID0gMiwgbnVtQ29ybmVycyA9IDQpID0+IHtcclxuICAgIGNvbnN0IHZlcnRpY2VzID0gWzAsIC1oZWlnaHQgLyAyLCAwXTtcclxuICAgIGNvbnN0IG5vcm1hbHMgPSBbXTtcclxuICAgIGNvbnN0IGluZGljZXMgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtQ29ybmVycyArIDE7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGFuZ2xlID0gKDIgKiBpICogTWF0aC5QSSkgLyBudW1Db3JuZXJzO1xyXG4gICAgICAgIGNvbnN0IHggPSBNYXRoLmNvcyhhbmdsZSkgKiByYWRpdXM7XHJcbiAgICAgICAgY29uc3QgeiA9IE1hdGguc2luKGFuZ2xlKSAqIHJhZGl1cztcclxuICAgICAgICBjb25zdCB5ID0gLWhlaWdodCAvIDI7XHJcbiAgICAgICAgdmVydGljZXMucHVzaCh4LCAtaGVpZ2h0IC8gMiwgeik7XHJcbiAgICAgICAgbm9ybWFscy5wdXNoKDAsIC0xLCAwKTtcclxuICAgIH1cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtQ29ybmVyczsgaSsrKSB7XHJcbiAgICAgICAgaW5kaWNlcy5wdXNoKDAsIGkgKyAxLCBpICsgMik7XHJcbiAgICB9XHJcbiAgICAvL3ZlcnRpY2VzLnB1c2godmVydGljZXNbMV0sIC1oZWlnaHQvMiwgdmVydGljZXNbM10pXHJcbiAgICBjb25zdCBuID0gdmVydGljZXMubGVuZ3RoIC8gMztcclxuICAgIGNvbnN0IHN0cmlkZSA9IDM7XHJcbiAgICBjb25zdCBzdGFydCA9IG47XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNvcm5lcnMgKyAyOyBpKyspIHtcclxuICAgICAgICBjb25zdCBhbmdsZSA9ICgyICogaSAqIE1hdGguUEkpIC8gbnVtQ29ybmVycztcclxuICAgICAgICBjb25zdCB4ID0gTWF0aC5jb3MoYW5nbGUpICogcmFkaXVzO1xyXG4gICAgICAgIGNvbnN0IHogPSBNYXRoLnNpbihhbmdsZSkgKiByYWRpdXM7XHJcbiAgICAgICAgY29uc3QgeSA9IC1oZWlnaHQgLyAyO1xyXG4gICAgICAgIGNvbnN0IGEgPSBbdmVydGljZXNbaSAqIDNdLCB2ZXJ0aWNlc1tpICogMyArIDFdLCB2ZXJ0aWNlc1tpICogMyArIDJdXTtcclxuICAgICAgICBjb25zdCBiID0gW3ZlcnRpY2VzW2kgKiAzICsgM10sIHZlcnRpY2VzW2kgKiAzICsgNF0sIHZlcnRpY2VzW2kgKiAzICsgNV1dO1xyXG4gICAgICAgIGNvbnN0IGMgPSBbMCwgaGVpZ2h0IC8gMiwgMF07XHJcbiAgICAgICAgaW5kaWNlcy5wdXNoKHN0YXJ0ICsgaSAqIHN0cmlkZSArIDIsIHN0YXJ0ICsgaSAqIHN0cmlkZSArIDEsIHN0YXJ0ICsgaSAqIHN0cmlkZSArIDMpO1xyXG4gICAgICAgIHZlcnRpY2VzLnB1c2goLi4uYywgLi4uYSwgLi4uYik7XHJcbiAgICAgICAgY29uc3Qgbm9ybWFsID0gbm9ybWFsaXplKGNyb3NzKGRpZmYoYiwgYyksIGRpZmYoYSwgYykpKTtcclxuICAgICAgICBub3JtYWxzLnB1c2goLi4ubm9ybWFsLCAuLi5ub3JtYWwsIC4uLm5vcm1hbCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBfbm9ybWFsID0gbmV3IEZsb2F0MzJBcnJheShub3JtYWxzKTtcclxuICAgIGNvbnN0IF9wb3NpdGlvbiA9IG5ldyBGbG9hdDMyQXJyYXkodmVydGljZXMpO1xyXG4gICAgY29uc3QgX2luZGljZXMgPSBuZXcgVWludDE2QXJyYXkoaW5kaWNlcyk7XHJcbiAgICBjb25zdCBBcnJheURhdGEgPSB7XHJcbiAgICAgICAgYXR0cmlidXRlczoge1xyXG4gICAgICAgICAgICBQT1NJVElPTjoge1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb246IDAsXHJcbiAgICAgICAgICAgICAgICBjb3VudDogdmVydGljZXMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAwLFxyXG4gICAgICAgICAgICAgICAgc3RyaWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgbnVtQ29tcG9uZW50czogMyxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDUxMjYsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBfcG9zaXRpb24sXHJcbiAgICAgICAgICAgICAgICBieXRlTGVuZ3RoOiBfcG9zaXRpb24uYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGU6IEZMT0FUX1ZFQzNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgTk9STUFMOiB7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogMSxcclxuICAgICAgICAgICAgICAgIGNvdW50OiBub3JtYWxzLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgIG51bUNvbXBvbmVudHM6IDMsXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IDAsXHJcbiAgICAgICAgICAgICAgICBzdHJpZGU6IDAsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiA1MTI2LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogX25vcm1hbCxcclxuICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGg6IF9ub3JtYWwuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGU6IEZMT0FUX1ZFQzNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBvbmVudFR5cGU6IDUxMjMsXHJcbiAgICAgICAgaW5kaWNlczogX2luZGljZXMsXHJcbiAgICAgICAgbnVtRWxlbWVudHM6IGluZGljZXMubGVuZ3RoLFxyXG4gICAgICAgIG1vZGU6IDQsXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEFycmF5RGF0YTtcclxufTtcclxuY29uc3QgY3JlYXRlQ2lyY2xlID0gKHJhZGl1cywgbnVtQ29ybmVycykgPT4ge1xyXG4gICAgY29uc3QgdmVydGljZXMgPSBbMCwgMCwgMF07XHJcbiAgICBjb25zdCBub3JtYWxzID0gW107XHJcbiAgICBjb25zdCBpbmRpY2VzID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNvcm5lcnMgKyAxOyBpKyspIHtcclxuICAgICAgICBjb25zdCBhbmdsZSA9ICgyICogaSAqIE1hdGguUEkpIC8gbnVtQ29ybmVycztcclxuICAgICAgICBjb25zdCB4ID0gTWF0aC5jb3MoYW5nbGUpICogcmFkaXVzO1xyXG4gICAgICAgIGNvbnN0IHogPSBNYXRoLnNpbihhbmdsZSkgKiByYWRpdXM7XHJcbiAgICAgICAgdmVydGljZXMucHVzaCh4LCAwLCB6KTtcclxuICAgICAgICBub3JtYWxzLnB1c2goMCwgMSwgMCk7XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNvcm5lcnM7IGkrKykge1xyXG4gICAgICAgIGluZGljZXMucHVzaCgwLCBpICsgMSwgaSArIDIpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgX25vcm1hbCA9IG5ldyBGbG9hdDMyQXJyYXkobm9ybWFscyk7XHJcbiAgICBjb25zdCBfcG9zaXRpb24gPSBuZXcgRmxvYXQzMkFycmF5KHZlcnRpY2VzKTtcclxuICAgIGNvbnN0IF9pbmRpY2VzID0gbmV3IFVpbnQxNkFycmF5KGluZGljZXMpO1xyXG4gICAgY29uc3QgQXJyYXlEYXRhID0ge1xyXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcclxuICAgICAgICAgICAgUE9TSVRJT046IHtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAwLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IHZlcnRpY2VzLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICAgICAgICAgIHN0cmlkZTogMCxcclxuICAgICAgICAgICAgICAgIG51bUNvbXBvbmVudHM6IDMsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiA1MTI2LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogX3Bvc2l0aW9uLFxyXG4gICAgICAgICAgICAgICAgYnl0ZUxlbmd0aDogX3Bvc2l0aW9uLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVUeXBlOiBGTE9BVF9WRUMzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIE5PUk1BTDoge1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb246IDEsXHJcbiAgICAgICAgICAgICAgICBjb3VudDogbm9ybWFscy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBudW1Db21wb25lbnRzOiAzLFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAwLFxyXG4gICAgICAgICAgICAgICAgc3RyaWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNTEyNixcclxuICAgICAgICAgICAgICAgIGRhdGE6IF9ub3JtYWwsXHJcbiAgICAgICAgICAgICAgICBieXRlTGVuZ3RoOiBfbm9ybWFsLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVUeXBlOiBGTE9BVF9WRUMzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wb25lbnRUeXBlOiA1MTIzLFxyXG4gICAgICAgIGluZGljZXM6IF9pbmRpY2VzLFxyXG4gICAgICAgIG51bUVsZW1lbnRzOiBpbmRpY2VzLmxlbmd0aCxcclxuICAgICAgICBtb2RlOiA0LFxyXG4gICAgfTtcclxuICAgIHJldHVybiBBcnJheURhdGE7XHJcbn07XHJcbmNvbnN0IGNyZWF0ZVNwaGVyZSA9IChyYWRpdXMsIHN1YmRpdmlzaW9uc0F4aXMsIHN1YmRpdmlzaW9uc0hlaWdodCwgb3B0X3N0YXJ0TGF0aXR1ZGVJblJhZGlhbnMsIG9wdF9lbmRMYXRpdHVkZUluUmFkaWFucywgb3B0X3N0YXJ0TG9uZ2l0dWRlSW5SYWRpYW5zLCBvcHRfZW5kTG9uZ2l0dWRlSW5SYWRpYW5zKSA9PiB7XHJcbiAgICBpZiAoc3ViZGl2aXNpb25zQXhpcyA8PSAwIHx8IHN1YmRpdmlzaW9uc0hlaWdodCA8PSAwKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic3ViZGl2aXNpb25BeGlzIGFuZCBzdWJkaXZpc2lvbkhlaWdodCBtdXN0IGJlID4gMFwiKTtcclxuICAgIH1cclxuICAgIG9wdF9zdGFydExhdGl0dWRlSW5SYWRpYW5zID0gb3B0X3N0YXJ0TGF0aXR1ZGVJblJhZGlhbnMgfHwgMDtcclxuICAgIG9wdF9lbmRMYXRpdHVkZUluUmFkaWFucyA9IG9wdF9lbmRMYXRpdHVkZUluUmFkaWFucyB8fCBNYXRoLlBJO1xyXG4gICAgb3B0X3N0YXJ0TG9uZ2l0dWRlSW5SYWRpYW5zID0gb3B0X3N0YXJ0TG9uZ2l0dWRlSW5SYWRpYW5zIHx8IDA7XHJcbiAgICBvcHRfZW5kTG9uZ2l0dWRlSW5SYWRpYW5zID0gb3B0X2VuZExvbmdpdHVkZUluUmFkaWFucyB8fCBNYXRoLlBJICogMjtcclxuICAgIGNvbnN0IGxhdFJhbmdlID0gb3B0X2VuZExhdGl0dWRlSW5SYWRpYW5zIC0gb3B0X3N0YXJ0TGF0aXR1ZGVJblJhZGlhbnM7XHJcbiAgICBjb25zdCBsb25nUmFuZ2UgPSBvcHRfZW5kTG9uZ2l0dWRlSW5SYWRpYW5zIC0gb3B0X3N0YXJ0TG9uZ2l0dWRlSW5SYWRpYW5zO1xyXG4gICAgY29uc3QgcG9zaXRpb25zID0gW107XHJcbiAgICBjb25zdCBub3JtYWxzID0gW107XHJcbiAgICBjb25zdCB0ZXhjb29yZHMgPSBbXTtcclxuICAgIGZvciAobGV0IHkgPSAwOyB5IDw9IHN1YmRpdmlzaW9uc0hlaWdodDsgeSsrKSB7XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPD0gc3ViZGl2aXNpb25zQXhpczsgeCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHUgPSB4IC8gc3ViZGl2aXNpb25zQXhpcztcclxuICAgICAgICAgICAgY29uc3QgdiA9IHkgLyBzdWJkaXZpc2lvbnNIZWlnaHQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoZXRhID0gbG9uZ1JhbmdlICogdSArIG9wdF9zdGFydExvbmdpdHVkZUluUmFkaWFucztcclxuICAgICAgICAgICAgY29uc3QgcGhpID0gbGF0UmFuZ2UgKiB2ICsgb3B0X3N0YXJ0TGF0aXR1ZGVJblJhZGlhbnM7XHJcbiAgICAgICAgICAgIGNvbnN0IHNpblRoZXRhID0gTWF0aC5zaW4odGhldGEpO1xyXG4gICAgICAgICAgICBjb25zdCBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKTtcclxuICAgICAgICAgICAgY29uc3Qgc2luUGhpID0gTWF0aC5zaW4ocGhpKTtcclxuICAgICAgICAgICAgY29uc3QgY29zUGhpID0gTWF0aC5jb3MocGhpKTtcclxuICAgICAgICAgICAgY29uc3QgdXggPSBjb3NUaGV0YSAqIHNpblBoaTtcclxuICAgICAgICAgICAgY29uc3QgdXkgPSBjb3NQaGk7XHJcbiAgICAgICAgICAgIGNvbnN0IHV6ID0gc2luVGhldGEgKiBzaW5QaGk7XHJcbiAgICAgICAgICAgIHBvc2l0aW9ucy5wdXNoKHJhZGl1cyAqIHV4LCByYWRpdXMgKiB1eSwgcmFkaXVzICogdXopO1xyXG4gICAgICAgICAgICBub3JtYWxzLnB1c2godXgsIHV5LCB1eik7XHJcbiAgICAgICAgICAgIHRleGNvb3Jkcy5wdXNoKDEgLSB1LCB2KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCBudW1WZXJ0c0Fyb3VuZCA9IHN1YmRpdmlzaW9uc0F4aXMgKyAxO1xyXG4gICAgY29uc3QgaW5kaWNlcyA9IFtdO1xyXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCBzdWJkaXZpc2lvbnNBeGlzOyB4KyspIHtcclxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHN1YmRpdmlzaW9uc0hlaWdodDsgeSsrKSB7XHJcbiAgICAgICAgICAgIGluZGljZXMucHVzaCgoeSArIDApICogbnVtVmVydHNBcm91bmQgKyB4LCAoeSArIDApICogbnVtVmVydHNBcm91bmQgKyB4ICsgMSwgKHkgKyAxKSAqIG51bVZlcnRzQXJvdW5kICsgeCk7XHJcbiAgICAgICAgICAgIGluZGljZXMucHVzaCgoeSArIDEpICogbnVtVmVydHNBcm91bmQgKyB4LCAoeSArIDApICogbnVtVmVydHNBcm91bmQgKyB4ICsgMSwgKHkgKyAxKSAqIG51bVZlcnRzQXJvdW5kICsgeCArIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IF9wb3NpdGlvbnMgPSBuZXcgRmxvYXQzMkFycmF5KHBvc2l0aW9ucyk7XHJcbiAgICBjb25zdCBfbm9ybWFscyA9IG5ldyBGbG9hdDMyQXJyYXkobm9ybWFscyk7XHJcbiAgICBjb25zdCBfdGV4Y29vcmRzID0gbmV3IEZsb2F0MzJBcnJheSh0ZXhjb29yZHMpO1xyXG4gICAgY29uc3QgX2luZGljZXMgPSBuZXcgVWludDE2QXJyYXkoaW5kaWNlcyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcclxuICAgICAgICAgICAgUE9TSVRJT046IHtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAwLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IHBvc2l0aW9ucy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IDAsXHJcbiAgICAgICAgICAgICAgICBzdHJpZGU6IDAsXHJcbiAgICAgICAgICAgICAgICBudW1Db21wb25lbnRzOiAzLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNTEyNixcclxuICAgICAgICAgICAgICAgIGRhdGE6IF9wb3NpdGlvbnMsXHJcbiAgICAgICAgICAgICAgICBieXRlTGVuZ3RoOiBfcG9zaXRpb25zLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVUeXBlOiBGTE9BVF9WRUMzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIE5PUk1BTDoge1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb246IDEsXHJcbiAgICAgICAgICAgICAgICBjb3VudDogbm9ybWFscy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBudW1Db21wb25lbnRzOiAzLFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAwLFxyXG4gICAgICAgICAgICAgICAgc3RyaWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNTEyNixcclxuICAgICAgICAgICAgICAgIGRhdGE6IF9ub3JtYWxzLFxyXG4gICAgICAgICAgICAgICAgYnl0ZUxlbmd0aDogX25vcm1hbHMuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGU6IEZMT0FUX1ZFQzNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgVEVYQ09PUkRfMDoge1xyXG4gICAgICAgICAgICAgICAgZGF0YTogX3RleGNvb3JkcyxcclxuICAgICAgICAgICAgICAgIGNvdW50OiBfdGV4Y29vcmRzLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDUxMjYsXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IDAsXHJcbiAgICAgICAgICAgICAgICBzdHJpZGU6IDAsXHJcbiAgICAgICAgICAgICAgICBieXRlTGVuZ3RoOiBfdGV4Y29vcmRzLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogNCxcclxuICAgICAgICAgICAgICAgIG51bUNvbXBvbmVudHM6IDIsXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVUeXBlOiBGTE9BVF9WRUMyXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wb25lbnRUeXBlOiA1MTIzLFxyXG4gICAgICAgIGluZGljZXM6IF9pbmRpY2VzLFxyXG4gICAgICAgIG51bUVsZW1lbnRzOiBpbmRpY2VzLmxlbmd0aCxcclxuICAgICAgICBtb2RlOiA0LFxyXG4gICAgfTtcclxufTtcclxuY29uc3QgY3JlYXRlVHJ1bmNhdGVkQ29uZSA9IChib3R0b21SYWRpdXMsIHRvcFJhZGl1cywgaGVpZ2h0LCByYWRpYWxTdWJkaXZpc2lvbnMsIHZlcnRpY2FsU3ViZGl2aXNpb25zLCBvcHRfdG9wQ2FwLCBvcHRfYm90dG9tQ2FwKSA9PiB7XHJcbiAgICBpZiAocmFkaWFsU3ViZGl2aXNpb25zIDwgMykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInJhZGlhbFN1YmRpdmlzaW9ucyBtdXN0IGJlIDMgb3IgZ3JlYXRlclwiKTtcclxuICAgIH1cclxuICAgIGlmICh2ZXJ0aWNhbFN1YmRpdmlzaW9ucyA8IDEpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ2ZXJ0aWNhbFN1YmRpdmlzaW9ucyBtdXN0IGJlIDEgb3IgZ3JlYXRlclwiKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHRvcENhcCA9IG9wdF90b3BDYXAgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBvcHRfdG9wQ2FwO1xyXG4gICAgY29uc3QgYm90dG9tQ2FwID0gb3B0X2JvdHRvbUNhcCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IG9wdF9ib3R0b21DYXA7XHJcbiAgICBjb25zdCBleHRyYSA9ICh0b3BDYXAgPyAyIDogMCkgKyAoYm90dG9tQ2FwID8gMiA6IDApO1xyXG4gICAgY29uc3QgbnVtVmVydGljZXMgPSAocmFkaWFsU3ViZGl2aXNpb25zICsgMSkgKiAodmVydGljYWxTdWJkaXZpc2lvbnMgKyAxICsgZXh0cmEpO1xyXG4gICAgY29uc3QgcG9zaXRpb25zID0gW107XHJcbiAgICBjb25zdCBub3JtYWxzID0gW107XHJcbiAgICBjb25zdCB0ZXhjb29yZHMgPSBbXTtcclxuICAgIGNvbnN0IGluZGljZXMgPSBbXTtcclxuICAgIGNvbnN0IHZlcnRzQXJvdW5kRWRnZSA9IHJhZGlhbFN1YmRpdmlzaW9ucyArIDE7XHJcbiAgICBjb25zdCBzbGFudCA9IE1hdGguYXRhbjIoYm90dG9tUmFkaXVzIC0gdG9wUmFkaXVzLCBoZWlnaHQpO1xyXG4gICAgY29uc3QgY29zU2xhbnQgPSBNYXRoLmNvcyhzbGFudCk7XHJcbiAgICBjb25zdCBzaW5TbGFudCA9IE1hdGguc2luKHNsYW50KTtcclxuICAgIGNvbnN0IHN0YXJ0ID0gdG9wQ2FwID8gLTIgOiAwO1xyXG4gICAgY29uc3QgZW5kID0gdmVydGljYWxTdWJkaXZpc2lvbnMgKyAoYm90dG9tQ2FwID8gMiA6IDApO1xyXG4gICAgZm9yIChsZXQgeXkgPSBzdGFydDsgeXkgPD0gZW5kOyArK3l5KSB7XHJcbiAgICAgICAgbGV0IHYgPSB5eSAvIHZlcnRpY2FsU3ViZGl2aXNpb25zO1xyXG4gICAgICAgIGxldCB5ID0gaGVpZ2h0ICogdjtcclxuICAgICAgICBsZXQgcmluZ1JhZGl1cztcclxuICAgICAgICBpZiAoeXkgPCAwKSB7XHJcbiAgICAgICAgICAgIHkgPSAwO1xyXG4gICAgICAgICAgICB2ID0gMTtcclxuICAgICAgICAgICAgcmluZ1JhZGl1cyA9IGJvdHRvbVJhZGl1cztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoeXkgPiB2ZXJ0aWNhbFN1YmRpdmlzaW9ucykge1xyXG4gICAgICAgICAgICB5ID0gaGVpZ2h0O1xyXG4gICAgICAgICAgICB2ID0gMTtcclxuICAgICAgICAgICAgcmluZ1JhZGl1cyA9IHRvcFJhZGl1cztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJpbmdSYWRpdXMgPVxyXG4gICAgICAgICAgICAgICAgYm90dG9tUmFkaXVzICsgKHRvcFJhZGl1cyAtIGJvdHRvbVJhZGl1cykgKiAoeXkgLyB2ZXJ0aWNhbFN1YmRpdmlzaW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh5eSA9PT0gLTIgfHwgeXkgPT09IHZlcnRpY2FsU3ViZGl2aXNpb25zICsgMikge1xyXG4gICAgICAgICAgICByaW5nUmFkaXVzID0gMDtcclxuICAgICAgICAgICAgdiA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHkgLT0gaGVpZ2h0IC8gMjtcclxuICAgICAgICBmb3IgKGxldCBpaSA9IDA7IGlpIDwgdmVydHNBcm91bmRFZGdlOyArK2lpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNpbiA9IE1hdGguc2luKChpaSAqIE1hdGguUEkgKiAyKSAvIHJhZGlhbFN1YmRpdmlzaW9ucyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvcyA9IE1hdGguY29zKChpaSAqIE1hdGguUEkgKiAyKSAvIHJhZGlhbFN1YmRpdmlzaW9ucyk7XHJcbiAgICAgICAgICAgIHBvc2l0aW9ucy5wdXNoKHNpbiAqIHJpbmdSYWRpdXMsIHksIGNvcyAqIHJpbmdSYWRpdXMpO1xyXG4gICAgICAgICAgICBpZiAoeXkgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBub3JtYWxzLnB1c2goMCwgLTEsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHl5ID4gdmVydGljYWxTdWJkaXZpc2lvbnMpIHtcclxuICAgICAgICAgICAgICAgIG5vcm1hbHMucHVzaCgwLCAxLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChyaW5nUmFkaXVzID09PSAwLjApIHtcclxuICAgICAgICAgICAgICAgIG5vcm1hbHMucHVzaCgwLCAwLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5vcm1hbHMucHVzaChzaW4gKiBjb3NTbGFudCwgc2luU2xhbnQsIGNvcyAqIGNvc1NsYW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0ZXhjb29yZHMucHVzaChpaSAvIHJhZGlhbFN1YmRpdmlzaW9ucywgMSAtIHYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZvciAobGV0IHl5ID0gMDsgeXkgPCB2ZXJ0aWNhbFN1YmRpdmlzaW9ucyArIGV4dHJhOyArK3l5KSB7XHJcbiAgICAgICAgaWYgKCh5eSA9PT0gMSAmJiB0b3BDYXApIHx8XHJcbiAgICAgICAgICAgICh5eSA9PT0gdmVydGljYWxTdWJkaXZpc2lvbnMgKyBleHRyYSAtIDIgJiYgYm90dG9tQ2FwKSkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaWkgPSAwOyBpaSA8IHJhZGlhbFN1YmRpdmlzaW9uczsgKytpaSkge1xyXG4gICAgICAgICAgICBpbmRpY2VzLnB1c2godmVydHNBcm91bmRFZGdlICogKHl5ICsgMCkgKyAwICsgaWksIHZlcnRzQXJvdW5kRWRnZSAqICh5eSArIDApICsgMSArIGlpLCB2ZXJ0c0Fyb3VuZEVkZ2UgKiAoeXkgKyAxKSArIDEgKyBpaSk7XHJcbiAgICAgICAgICAgIGluZGljZXMucHVzaCh2ZXJ0c0Fyb3VuZEVkZ2UgKiAoeXkgKyAwKSArIDAgKyBpaSwgdmVydHNBcm91bmRFZGdlICogKHl5ICsgMSkgKyAxICsgaWksIHZlcnRzQXJvdW5kRWRnZSAqICh5eSArIDEpICsgMCArIGlpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCBfcG9zaXRpb25zID0gbmV3IEZsb2F0MzJBcnJheShwb3NpdGlvbnMpO1xyXG4gICAgY29uc3QgX25vcm1hbHMgPSBuZXcgRmxvYXQzMkFycmF5KG5vcm1hbHMpO1xyXG4gICAgY29uc3QgX3RleGNvb3JkcyA9IG5ldyBGbG9hdDMyQXJyYXkodGV4Y29vcmRzKTtcclxuICAgIGNvbnN0IF9pbmRpY2VzID0gbmV3IFVpbnQxNkFycmF5KGluZGljZXMpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBhdHRyaWJ1dGVzOiB7XHJcbiAgICAgICAgICAgIFBPU0lUSU9OOiB7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogMCxcclxuICAgICAgICAgICAgICAgIGNvdW50OiBwb3NpdGlvbnMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAwLFxyXG4gICAgICAgICAgICAgICAgc3RyaWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgbnVtQ29tcG9uZW50czogMyxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDUxMjYsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBfcG9zaXRpb25zLFxyXG4gICAgICAgICAgICAgICAgYnl0ZUxlbmd0aDogX3Bvc2l0aW9ucy5ieXRlTGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlVHlwZTogRkxPQVRfVkVDM1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBOT1JNQUw6IHtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAxLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IG5vcm1hbHMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgbnVtQ29tcG9uZW50czogMyxcclxuICAgICAgICAgICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICAgICAgICAgIHN0cmlkZTogMCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDUxMjYsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBfbm9ybWFscyxcclxuICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGg6IF9ub3JtYWxzLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVUeXBlOiBGTE9BVF9WRUMzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFRFWENPT1JEXzA6IHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IF90ZXhjb29yZHMsXHJcbiAgICAgICAgICAgICAgICBjb3VudDogX3RleGNvb3Jkcy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiA1MTI2LFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAwLFxyXG4gICAgICAgICAgICAgICAgc3RyaWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgYnl0ZUxlbmd0aDogX3RleGNvb3Jkcy5ieXRlTGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgbG9jYXRpb246IDQsXHJcbiAgICAgICAgICAgICAgICBudW1Db21wb25lbnRzOiAyLFxyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlVHlwZTogRkxPQVRfVkVDMlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcG9uZW50VHlwZTogNTEyMyxcclxuICAgICAgICBpbmRpY2VzOiBfaW5kaWNlcyxcclxuICAgICAgICBudW1FbGVtZW50czogaW5kaWNlcy5sZW5ndGgsXHJcbiAgICAgICAgbW9kZTogNCxcclxuICAgIH07XHJcbn07XHJcbmV4cG9ydCB7IGNyZWF0ZUJveCwgY3JlYXRlQ29uZSwgY3JlYXRlQ2lyY2xlLCBjcmVhdGVTcGhlcmUsIGNyZWF0ZVRydW5jYXRlZENvbmUgfTtcclxuIiwiZnVuY3Rpb24gY3JlYXRlVW5pZm9ybVNldHRlcnMoZ2wsIHByb2dyYW0pIHtcclxuICAgIGNvbnN0IGNyZWF0ZVRleHR1cmVTZXR0ZXIgPSAocHJvZ3JhbSwgdW5pZm9ybUluZm8pID0+IHtcclxuICAgICAgICBjb25zdCBsb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCB1bmlmb3JtSW5mby5uYW1lKTtcclxuICAgICAgICByZXR1cm4gKHRleEJsb2NrTnVtKSA9PiB7XHJcbiAgICAgICAgICAgIGdsLnVuaWZvcm0xaShsb2NhdGlvbiwgdGV4QmxvY2tOdW0pO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgZnVuY3Rpb24gY3JlYXRlVW5pZm9ybVNldHRlcihwcm9ncmFtLCB1bmlmb3JtSW5mbykge1xyXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sIHVuaWZvcm1JbmZvLm5hbWUpO1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSB1bmlmb3JtSW5mby50eXBlO1xyXG4gICAgICAgIGNvbnN0IGlzQXJyYXkgPSB1bmlmb3JtSW5mby5zaXplID4gMSAmJiB1bmlmb3JtSW5mby5uYW1lLnN1YnN0cigtMykgPT09IFwiWzBdXCI7XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLkZMT0FUICYmIGlzQXJyYXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtMWZ2KGxvY2F0aW9uLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLkZMT0FUKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgZ2wudW5pZm9ybTFmKGxvY2F0aW9uLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLkZMT0FUX1ZFQzIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtMmZ2KGxvY2F0aW9uLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLkZMT0FUX1ZFQzMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtM2Z2KGxvY2F0aW9uLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLkZMT0FUX1ZFQzQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtNGZ2KGxvY2F0aW9uLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLklOVCAmJiBpc0FycmF5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgZ2wudW5pZm9ybTFpdihsb2NhdGlvbiwgdik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSBnbC5JTlQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtMWkobG9jYXRpb24sIHYpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gZ2wuSU5UX1ZFQzIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtMml2KGxvY2F0aW9uLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLklOVF9WRUMzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgZ2wudW5pZm9ybTNpdihsb2NhdGlvbiwgdik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSBnbC5JTlRfVkVDNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgICAgIGdsLnVuaWZvcm00aXYobG9jYXRpb24sIHYpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gZ2wuQk9PTCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgICAgIGdsLnVuaWZvcm0xaXYobG9jYXRpb24sIHYpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gZ2wuQk9PTF9WRUMyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgZ2wudW5pZm9ybTJpdihsb2NhdGlvbiwgdik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSBnbC5CT09MX1ZFQzMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtM2l2KGxvY2F0aW9uLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLkJPT0xfVkVDNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgICAgIGdsLnVuaWZvcm00aXYobG9jYXRpb24sIHYpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gZ2wuRkxPQVRfTUFUMikge1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgICAgIGdsLnVuaWZvcm1NYXRyaXgyZnYobG9jYXRpb24sIGZhbHNlLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLkZMT0FUX01BVDMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtTWF0cml4M2Z2KGxvY2F0aW9uLCBmYWxzZSwgdik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSBnbC5GTE9BVF9NQVQ0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgZ2wudW5pZm9ybU1hdHJpeDRmdihsb2NhdGlvbiwgZmFsc2UsIHYpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IHVuaWZvcm1TZXR0ZXJzID0ge307XHJcbiAgICBjb25zdCB0ZXh0dXJlU2V0dGVycyA9IHt9O1xyXG4gICAgY29uc3QgbnVtVW5pZm9ybXMgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLkFDVElWRV9VTklGT1JNUyk7XHJcbiAgICBmb3IgKGxldCBpaSA9IDA7IGlpIDwgbnVtVW5pZm9ybXM7ICsraWkpIHtcclxuICAgICAgICBjb25zdCB1bmlmb3JtSW5mbyA9IGdsLmdldEFjdGl2ZVVuaWZvcm0ocHJvZ3JhbSwgaWkpO1xyXG4gICAgICAgIGlmICghdW5pZm9ybUluZm8pIHtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBuYW1lID0gdW5pZm9ybUluZm8ubmFtZTtcclxuICAgICAgICBpZiAodW5pZm9ybUluZm8udHlwZSA9PT0gZ2wuU0FNUExFUl8yRCkge1xyXG4gICAgICAgICAgICB0ZXh0dXJlU2V0dGVyc1tuYW1lXSA9IGNyZWF0ZVRleHR1cmVTZXR0ZXIocHJvZ3JhbSwgdW5pZm9ybUluZm8pO1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5hbWUuc3Vic3RyKC0zKSA9PT0gXCJbMF1cIikge1xyXG4gICAgICAgICAgICBuYW1lID0gbmFtZS5zdWJzdHIoMCwgbmFtZS5sZW5ndGggLSAzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVuaWZvcm1JbmZvLnNpemUgPiAxKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdW5pZm9ybUluZm8uc2l6ZTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvYmogPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2l6ZTogdW5pZm9ybUluZm8uc2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiB1bmlmb3JtSW5mby50eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUgKyBgWyR7aX1dYCxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB1bmlmb3JtU2V0dGVyc1tuYW1lICsgYFske2l9XWBdID0gY3JlYXRlVW5pZm9ybVNldHRlcihwcm9ncmFtLCBvYmopO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBzZXR0ZXIgPSBjcmVhdGVVbmlmb3JtU2V0dGVyKHByb2dyYW0sIHVuaWZvcm1JbmZvKTtcclxuICAgICAgICAgICAgdW5pZm9ybVNldHRlcnNbbmFtZV0gPSBzZXR0ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHsgdW5pZm9ybVNldHRlcnMsIHRleHR1cmVTZXR0ZXJzIH07XHJcbn1cclxuY2xhc3MgUHJvZ3JhbUluZm8ge1xyXG4gICAgY29uc3RydWN0b3IoZ2xXcmFwcGVyLCB2ZXJ0ZXhTaGFkZXJTb3VyY2UsIGZyYWdtZW50U2hhZGVyU291cmNlKSB7XHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhTaGFkZXJTb3VyY2UgPSB2ZXJ0ZXhTaGFkZXJTb3VyY2U7XHJcbiAgICAgICAgdGhpcy5mcmFnbWVudFNoYWRlclNvdXJjZSA9IGZyYWdtZW50U2hhZGVyU291cmNlO1xyXG4gICAgICAgIHRoaXMudW5pZm9ybVNldHRlcnMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudGV4dHVyZVNldHRlcnMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudmVydGV4U2hhZGVyID0gbnVsbDtcclxuICAgICAgICB0aGlzLmZyYWdtZW50U2hhZGVyID0gbnVsbDtcclxuICAgICAgICB0aGlzLnByb2dyYW0gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZ2xXcmFwcGVyID0gZ2xXcmFwcGVyO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlVW5pZm9ybVNldHRlcnMoKSB7XHJcbiAgICAgICAgY29uc3QgeyBnbFdyYXBwZXIsIHByb2dyYW0gfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgeyBnbCB9ID0gZ2xXcmFwcGVyO1xyXG4gICAgICAgIGNvbnN0IHsgdW5pZm9ybVNldHRlcnMsIHRleHR1cmVTZXR0ZXJzIH0gPSBjcmVhdGVVbmlmb3JtU2V0dGVycyhnbCwgcHJvZ3JhbSk7XHJcbiAgICAgICAgdGhpcy50ZXh0dXJlU2V0dGVycyA9IHRleHR1cmVTZXR0ZXJzO1xyXG4gICAgICAgIHRoaXMudW5pZm9ybVNldHRlcnMgPSB1bmlmb3JtU2V0dGVycztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGNvbXBpbGVTaGFkZXJzKCkge1xyXG4gICAgICAgIGNvbnN0IHsgZ2xXcmFwcGVyLCBmcmFnbWVudFNoYWRlclNvdXJjZSwgdmVydGV4U2hhZGVyU291cmNlIH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IHsgZ2wgfSA9IGdsV3JhcHBlcjtcclxuICAgICAgICB0aGlzLnZlcnRleFNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcihnbC5WRVJURVhfU0hBREVSKTtcclxuICAgICAgICBnbC5zaGFkZXJTb3VyY2UodGhpcy52ZXJ0ZXhTaGFkZXIsIHZlcnRleFNoYWRlclNvdXJjZSk7XHJcbiAgICAgICAgZ2wuY29tcGlsZVNoYWRlcih0aGlzLnZlcnRleFNoYWRlcik7XHJcbiAgICAgICAgaWYgKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIodGhpcy52ZXJ0ZXhTaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZ2wuZ2V0U2hhZGVySW5mb0xvZyh0aGlzLnZlcnRleFNoYWRlcikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZyYWdtZW50U2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKGdsLkZSQUdNRU5UX1NIQURFUik7XHJcbiAgICAgICAgZ2wuc2hhZGVyU291cmNlKHRoaXMuZnJhZ21lbnRTaGFkZXIsIGZyYWdtZW50U2hhZGVyU291cmNlKTtcclxuICAgICAgICBnbC5jb21waWxlU2hhZGVyKHRoaXMuZnJhZ21lbnRTaGFkZXIpO1xyXG4gICAgICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHRoaXMuZnJhZ21lbnRTaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZ2wuZ2V0U2hhZGVySW5mb0xvZyh0aGlzLmZyYWdtZW50U2hhZGVyKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucHJvZ3JhbSA9IGdsLmNyZWF0ZVByb2dyYW0oKTtcclxuICAgICAgICBnbC5hdHRhY2hTaGFkZXIodGhpcy5wcm9ncmFtLCB0aGlzLnZlcnRleFNoYWRlcik7XHJcbiAgICAgICAgZ2wuYXR0YWNoU2hhZGVyKHRoaXMucHJvZ3JhbSwgdGhpcy5mcmFnbWVudFNoYWRlcik7XHJcbiAgICAgICAgZ2wubGlua1Byb2dyYW0odGhpcy5wcm9ncmFtKTtcclxuICAgICAgICBpZiAoIWdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5wcm9ncmFtLCBnbC5MSU5LX1NUQVRVUykpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGdsLmdldFByb2dyYW1JbmZvTG9nKHRoaXMucHJvZ3JhbSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNldFVuaWZvcm1zKHVuaWZvcm1zKSB7XHJcbiAgICAgICAgY29uc3QgeyB1bmlmb3JtU2V0dGVycywgZ2xXcmFwcGVyIH0gPSB0aGlzO1xyXG4gICAgICAgIGdsV3JhcHBlci51c2VQcm9ncmFtSW5mbyh0aGlzKTtcclxuICAgICAgICBPYmplY3Qua2V5cyh1bmlmb3JtcykuZm9yRWFjaCgobmFtZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzZXR0ZXIgPSB1bmlmb3JtU2V0dGVyc1tuYW1lXTtcclxuICAgICAgICAgICAgaWYgKHNldHRlcilcclxuICAgICAgICAgICAgICAgIHNldHRlcih1bmlmb3Jtc1tuYW1lXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBzZXRUZXh0dXJlVW5pZm9ybVVuaXQobmFtZSwgdW5pdCkge1xyXG4gICAgICAgIGNvbnN0IHsgdGV4dHVyZVNldHRlcnMsIGdsV3JhcHBlciB9ID0gdGhpcztcclxuICAgICAgICBnbFdyYXBwZXIudXNlUHJvZ3JhbUluZm8odGhpcyk7XHJcbiAgICAgICAgY29uc3Qgc2V0dGVyID0gdGV4dHVyZVNldHRlcnNbbmFtZV07XHJcbiAgICAgICAgaWYgKHNldHRlcilcclxuICAgICAgICAgICAgc2V0dGVyKHVuaXQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7IFByb2dyYW1JbmZvIH07XHJcbiIsIi8qY29uc3Qgc2V0Q2FudmFzU2l6ZSA9IChjdHgsIHdpZHRoLCBoZWlnaHQpID0+IHtcclxuICBjdHguY2FudmFzLndpZHRoID0gd2lkdGg7XHJcbiAgY3R4LmNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbn07XHJcblxyXG5jb25zdCBtYWtlVGV4dHVyZSA9IChnbCwgY3R4KSA9PiB7XHJcbiAgY29uc3QgdGV4ID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xyXG4gIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleCk7XHJcblxyXG4gIGdsLnRleEltYWdlMkQoXHJcbiAgICBnbC5URVhUVVJFXzJELFxyXG4gICAgMCxcclxuICAgIGdsLlJHQkEsXHJcbiAgICBnbC5SR0JBLFxyXG4gICAgZ2wuVU5TSUdORURfQllURSxcclxuICAgIGN0eC5jYW52YXNcclxuICApO1xyXG4gIHJldHVybiB0ZXg7XHJcbn07XHJcblxyXG5jb25zdCBtYWtlU3RyaXBlVGV4dHVyZSA9IChnbCwgb3B0aW9ucykgPT4ge1xyXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gIHZhciB3aWR0aCA9IG9wdGlvbnMud2lkdGggfHwgNDtcclxuICB2YXIgaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQgfHwgNDtcclxuICB2YXIgY29sb3IxID0gb3B0aW9ucy5jb2xvcjEgfHwgXCJyZ2JhKDEsMCwwLDAuMSlcIjtcclxuICB2YXIgY29sb3IyID0gb3B0aW9ucy5jb2xvcjIgfHwgXCJyZ2JhKDEsMSwxLDAuNSlcIjtcclxuICBjb25zdCBjdHggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLmdldENvbnRleHQoXCIyZFwiKTtcclxuICBzZXRDYW52YXNTaXplKGN0eCwgd2lkdGgsIGhlaWdodCk7XHJcblxyXG4gIGN0eC5maWxsU3R5bGUgPSBjb2xvcjE7XHJcbiAgY3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gIGN0eC5maWxsU3R5bGUgPSBjb2xvcjI7XHJcbiAgY3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQgLyAyKTtcclxuXHJcbiAgcmV0dXJuIG1ha2VUZXh0dXJlKGdsLCBjdHgpO1xyXG59O1xyXG5cclxuY29uc3QgbWFrZVN0cmlwZUltZyA9IChvcHRpb25zKSA9PiB7XHJcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgdmFyIHdpZHRoID0gb3B0aW9ucy53aWR0aCB8fCA0O1xyXG4gIHZhciBoZWlnaHQgPSBvcHRpb25zLmhlaWdodCB8fCA0O1xyXG4gIHZhciBjb2xvcjEgPSBvcHRpb25zLmNvbG9yMSB8fCBcInJnYmEoMSwwLDAsMC41KVwiO1xyXG4gIHZhciBjb2xvcjIgPSBvcHRpb25zLmNvbG9yMiB8fCBcInJnYmEoMCwwLDEsMSlcIjtcclxuICBjb25zdCBjdHggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLmdldENvbnRleHQoXCIyZFwiKTtcclxuICBzZXRDYW52YXNTaXplKGN0eCwgd2lkdGgsIGhlaWdodCk7XHJcblxyXG4gIGN0eC5maWxsU3R5bGUgPSBjb2xvcjE7XHJcbiAgY3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gIGN0eC5maWxsU3R5bGUgPSBjb2xvcjI7XHJcbiAgY3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQgLyAyKTtcclxuXHJcbiAgcmV0dXJuIGN0eC5jYW52YXM7XHJcbn07XHJcblxyXG5jb25zdCBtYWtlSW1nRnJvbVN2Z1htbCA9ICh4bWwsIG9wdGlvbnMgPSB7fSkgPT4ge1xyXG4gIGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcbiAgdmFyIHN2ZzY0ID0gYnRvYSh4bWwpO1xyXG4gIHZhciBiNjRTdGFydCA9IFwiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxcIjtcclxuICB2YXIgaW1hZ2U2NCA9IGI2NFN0YXJ0ICsgc3ZnNjQ7XHJcbiAgaW1nLnNyYyA9IGltYWdlNjQ7XHJcblxyXG4gIGNvbnN0IHdpZHRoID0gb3B0aW9ucy53aWR0aCB8fCAxMDA7XHJcbiAgY29uc3QgaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQgfHwgMTAwO1xyXG4gIGNvbnN0IHggPSBvcHRpb25zLnggfHwgMTtcclxuICBjb25zdCB5ID0gb3B0aW9ucy55IHx8IDUwO1xyXG5cclxuICBjb25zdCBjdHggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLmdldENvbnRleHQoXCIyZFwiKTtcclxuICBzZXRDYW52YXNTaXplKGN0eCwgd2lkdGgsIGhlaWdodCk7XHJcblxyXG4gIGN0eC5kcmF3SW1hZ2UoaW1nLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcclxuICBjdHguZmlsbFN0eWxlID0gXCJyZ2JhKDAsMCwwLDEpXCI7XHJcbiAgY3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gIHJldHVybiBjdHguaW1nO1xyXG59O1xyXG4qL1xyXG5jb25zdCByZXF1ZXN0Q09SU0lmTm90U2FtZU9yaWdpbiA9IChpbWcsIHVybCkgPT4ge1xyXG4gICAgaWYgKG5ldyBVUkwodXJsLCB3aW5kb3cubG9jYXRpb24uaHJlZikub3JpZ2luICE9PSB3aW5kb3cubG9jYXRpb24ub3JpZ2luKSB7XHJcbiAgICAgICAgaW1nLmNyb3NzT3JpZ2luID0gXCJcIjtcclxuICAgIH1cclxufTtcclxuY2xhc3MgVGV4dHVyZUluZm8ge1xyXG4gICAgY29uc3RydWN0b3IoZ2wpIHtcclxuICAgICAgICB0aGlzLndpZHRoID0gbnVsbDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5nbCA9IGdsO1xyXG4gICAgICAgIHRoaXMuaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICB9XHJcbiAgICBjcmVhdGVUZXh0dXJlRnJvbVVSTCh1cmwpIHtcclxuICAgICAgICBjb25zdCB7IGdsIH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IHRleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XHJcbiAgICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZSk7XHJcbiAgICAgICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCAxLCAxLCAwLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCBuZXcgVWludDhBcnJheShbMCwgMCwgMjU1LCAyNTVdKSk7XHJcbiAgICAgICAgdGhpcy5pbWcuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5pbWcud2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5pbWcuaGVpZ2h0O1xyXG4gICAgICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0ZXh0dXJlKTtcclxuICAgICAgICAgICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCB0aGlzLmltZyk7XHJcbiAgICAgICAgICAgIGdsLmdlbmVyYXRlTWlwbWFwKGdsLlRFWFRVUkVfMkQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJlcXVlc3RDT1JTSWZOb3RTYW1lT3JpZ2luKHRoaXMuaW1nLCB1cmwpO1xyXG4gICAgICAgIHRoaXMuaW1nLnNyYyA9IHVybDtcclxuICAgICAgICB0aGlzLnRleHR1cmUgPSB0ZXh0dXJlO1xyXG4gICAgICAgIHJldHVybiB0ZXh0dXJlO1xyXG4gICAgfVxyXG4gICAgc2V0VGV4dHVyZVVuaXQodW5pdE51bSkge1xyXG4gICAgICAgIGNvbnN0IHsgZ2wsIHRleHR1cmUgfSA9IHRoaXM7XHJcbiAgICAgICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMCArIHVuaXROdW0pO1xyXG4gICAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleHR1cmUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7IFRleHR1cmVJbmZvIH07XHJcbiIsImNvbnN0IHByb3BzID0ge1xyXG4gICAgbWF0NDoge1xyXG4gICAgICAgIHN0cmlkZTogNjQsXHJcbiAgICAgICAgYnl0ZUxlbmd0aDogNjQsXHJcbiAgICAgICAgdHlwZTogMHgxNDA2LFxyXG4gICAgICAgIG51bUF0dHJpYnV0ZXM6IDQsXHJcbiAgICAgICAgbnVtQ29tcG9uZW50czogNCxcclxuICAgIH0sXHJcbiAgICB2ZWMzOiB7XHJcbiAgICAgICAgbnVtQ29tcG9uZW50czogMyxcclxuICAgICAgICB0eXBlOiAweDE0MDYsXHJcbiAgICAgICAgbnVtQXR0cmlidXRlczogMSxcclxuICAgIH0sXHJcbn07XHJcbmNvbnN0IGdldEF0dHJpYnV0ZVByb3BzQnlUeXBlID0gKHR5cGUpID0+IHByb3BzW3R5cGVdO1xyXG5leHBvcnQgZGVmYXVsdCBnZXRBdHRyaWJ1dGVQcm9wc0J5VHlwZTtcclxuIiwiY29uc3QgVFlQRURfQVJSQVlTID0ge1xyXG4gICAgNTEyMDogSW50OEFycmF5LFxyXG4gICAgNTEyMTogVWludDhBcnJheSxcclxuICAgIDUxMjI6IEludDE2QXJyYXksXHJcbiAgICA1MTIzOiBVaW50MTZBcnJheSxcclxuICAgIDUxMjQ6IEludDMyQXJyYXksXHJcbiAgICA1MTI1OiBVaW50MzJBcnJheSxcclxuICAgIDUxMjY6IEZsb2F0MzJBcnJheSxcclxufTtcclxuY29uc3QgTlVNX0NPTVBPTkVOVFMgPSB7XHJcbiAgICBTQ0FMQVI6IDEsXHJcbiAgICBWRUMyOiAyLFxyXG4gICAgVkVDMzogMyxcclxuICAgIFZFQzQ6IDQsXHJcbiAgICBNQVQyOiA0LFxyXG4gICAgTUFUMzogOSxcclxuICAgIE1BVDQ6IDE2LFxyXG59O1xyXG5jb25zdCBMT0NBVElPTlMgPSB7XHJcbiAgICBQT1NJVElPTjogMCxcclxuICAgIE5PUk1BTDogMSxcclxuICAgIFdFSUdIVFNfMDogMixcclxuICAgIEpPSU5UU18wOiAzLFxyXG4gICAgVEVYQ09PUkRfMDogNCxcclxufTtcclxuY29uc3QgRUxFTUVOVF9TSVpFID0ge1xyXG4gICAgMHgxNDA2OiA0LFxyXG59O1xyXG5jb25zdCBURVhUVVJFMCA9IDB4ODRjMDtcclxuY29uc3QgRFlOQU1JQ19EUkFXID0gMHg4OGU4O1xyXG5jb25zdCBBUlJBWV9CVUZGRVIgPSAweDg4OTI7XHJcbmNvbnN0IEVMRU1FTlRfQVJSQVlfQlVGRkVSID0gMHg4ODkzO1xyXG5jb25zdCBVTklGT1JNX0JVRkZFUiA9IDB4OGExMTtcclxuY29uc3QgVFJBTlNGT1JNX0ZFRURCQUNLX0JVRkZFUiA9IDB4OGM4ZTtcclxuY29uc3QgVFJBTlNGT1JNX0ZFRURCQUNLID0gMHg4ZTIyO1xyXG5jb25zdCBDT01QSUxFX1NUQVRVUyA9IDB4OGI4MTtcclxuY29uc3QgTElOS19TVEFUVVMgPSAweDhiODI7XHJcbmNvbnN0IEZSQUdNRU5UX1NIQURFUiA9IDB4OGIzMDtcclxuY29uc3QgVkVSVEVYX1NIQURFUiA9IDB4OGIzMTtcclxuY29uc3QgU0VQQVJBVEVfQVRUUklCUyA9IDB4OGM4ZDtcclxuY29uc3QgQUNUSVZFX1VOSUZPUk1TID0gMHg4Yjg2O1xyXG5jb25zdCBBQ1RJVkVfQVRUUklCVVRFUyA9IDB4OGI4OTtcclxuY29uc3QgVFJBTlNGT1JNX0ZFRURCQUNLX1ZBUllJTkdTID0gMHg4YzgzO1xyXG5jb25zdCBBQ1RJVkVfVU5JRk9STV9CTE9DS1MgPSAweDhhMzY7XHJcbmNvbnN0IFVOSUZPUk1fQkxPQ0tfUkVGRVJFTkNFRF9CWV9WRVJURVhfU0hBREVSID0gMHg4YTQ0O1xyXG5jb25zdCBVTklGT1JNX0JMT0NLX1JFRkVSRU5DRURfQllfRlJBR01FTlRfU0hBREVSID0gMHg4YTQ2O1xyXG5jb25zdCBVTklGT1JNX0JMT0NLX0RBVEFfU0laRSA9IDB4OGE0MDtcclxuY29uc3QgVU5JRk9STV9CTE9DS19BQ1RJVkVfVU5JRk9STV9JTkRJQ0VTID0gMHg4YTQzO1xyXG5jb25zdCBGTE9BVCA9IDB4MTQwNjtcclxuY29uc3QgRkxPQVRfVkVDMiA9IDB4OGI1MDtcclxuY29uc3QgRkxPQVRfVkVDMyA9IDB4OGI1MTtcclxuY29uc3QgRkxPQVRfVkVDNCA9IDB4OGI1MjtcclxuY29uc3QgSU5UID0gMHgxNDA0O1xyXG5jb25zdCBJTlRfVkVDMiA9IDB4OGI1MztcclxuY29uc3QgSU5UX1ZFQzMgPSAweDhiNTQ7XHJcbmNvbnN0IElOVF9WRUM0ID0gMHg4YjU1O1xyXG5jb25zdCBCT09MID0gMHg4YjU2O1xyXG5jb25zdCBCT09MX1ZFQzIgPSAweDhiNTc7XHJcbmNvbnN0IEJPT0xfVkVDMyA9IDB4OGI1ODtcclxuY29uc3QgQk9PTF9WRUM0ID0gMHg4YjU5O1xyXG5jb25zdCBGTE9BVF9NQVQyID0gMHg4YjVhO1xyXG5jb25zdCBGTE9BVF9NQVQzID0gMHg4YjViO1xyXG5jb25zdCBGTE9BVF9NQVQ0ID0gMHg4YjVjO1xyXG5jb25zdCBTQU1QTEVSXzJEID0gMHg4YjVlO1xyXG5jb25zdCBTQU1QTEVSX0NVQkUgPSAweDhiNjA7XHJcbmNvbnN0IFNBTVBMRVJfM0QgPSAweDhiNWY7XHJcbmNvbnN0IFNBTVBMRVJfMkRfU0hBRE9XID0gMHg4YjYyO1xyXG5jb25zdCBGTE9BVF9NQVQyeDMgPSAweDhiNjU7XHJcbmNvbnN0IEZMT0FUX01BVDJ4NCA9IDB4OGI2NjtcclxuY29uc3QgRkxPQVRfTUFUM3gyID0gMHg4YjY3O1xyXG5jb25zdCBGTE9BVF9NQVQzeDQgPSAweDhiNjg7XHJcbmNvbnN0IEZMT0FUX01BVDR4MiA9IDB4OGI2OTtcclxuY29uc3QgRkxPQVRfTUFUNHgzID0gMHg4YjZhO1xyXG5jb25zdCBTQU1QTEVSXzJEX0FSUkFZID0gMHg4ZGMxO1xyXG5jb25zdCBTQU1QTEVSXzJEX0FSUkFZX1NIQURPVyA9IDB4OGRjNDtcclxuY29uc3QgU0FNUExFUl9DVUJFX1NIQURPVyA9IDB4OGRjNTtcclxuY29uc3QgVU5TSUdORURfSU5UID0gMHgxNDA1O1xyXG5jb25zdCBVTlNJR05FRF9JTlRfVkVDMiA9IDB4OGRjNjtcclxuY29uc3QgVU5TSUdORURfSU5UX1ZFQzMgPSAweDhkYzc7XHJcbmNvbnN0IFVOU0lHTkVEX0lOVF9WRUM0ID0gMHg4ZGM4O1xyXG5jb25zdCBJTlRfU0FNUExFUl8yRCA9IDB4OGRjYTtcclxuY29uc3QgSU5UX1NBTVBMRVJfM0QgPSAweDhkY2I7XHJcbmNvbnN0IElOVF9TQU1QTEVSX0NVQkUgPSAweDhkY2M7XHJcbmNvbnN0IElOVF9TQU1QTEVSXzJEX0FSUkFZID0gMHg4ZGNmO1xyXG5jb25zdCBVTlNJR05FRF9JTlRfU0FNUExFUl8yRCA9IDB4OGRkMjtcclxuY29uc3QgVU5TSUdORURfSU5UX1NBTVBMRVJfM0QgPSAweDhkZDM7XHJcbmNvbnN0IFVOU0lHTkVEX0lOVF9TQU1QTEVSX0NVQkUgPSAweDhkZDQ7XHJcbmNvbnN0IFVOU0lHTkVEX0lOVF9TQU1QTEVSXzJEX0FSUkFZID0gMHg4ZGQ3O1xyXG5jb25zdCBURVhUVVJFXzJEID0gMHgwZGUxO1xyXG5jb25zdCBURVhUVVJFX0NVQkVfTUFQID0gMHg4NTEzO1xyXG5jb25zdCBURVhUVVJFXzNEID0gMHg4MDZmO1xyXG5jb25zdCBURVhUVVJFXzJEX0FSUkFZID0gMHg4YzFhO1xyXG5leHBvcnQgeyBMT0NBVElPTlMsIE5VTV9DT01QT05FTlRTLCBUWVBFRF9BUlJBWVMsIEVMRU1FTlRfU0laRSwgRkxPQVQsIEZMT0FUX01BVDIsIEZMT0FUX01BVDJ4MywgRkxPQVRfTUFUNCwgRkxPQVRfTUFUMng0LCBVTlNJR05FRF9JTlQsIEZMT0FUX01BVDMsIFVOU0lHTkVEX0lOVF9WRUMyLCBVTlNJR05FRF9JTlRfVkVDMywgVU5TSUdORURfSU5UX1ZFQzQsIEZMT0FUX1ZFQzIsIEZMT0FUX1ZFQzMsIEZMT0FUX1ZFQzQsIElOVCwgSU5UX1ZFQzIsIElOVF9WRUMzLCBJTlRfVkVDNCwgQk9PTCwgQk9PTF9WRUMyLCBCT09MX1ZFQzMsIEJPT0xfVkVDNCB9O1xyXG4iLCJpbXBvcnQgeyBQcmltaXRpdmVSZW5kZXJJbmZvRnJvbUFycmF5RGF0YSwgQXJyYXlEYXRhRnJvbUdsdGYsIEVudGl0eURhdGFGcm9tR2x0ZiwgR0xURiwgfSBmcm9tIFwiLi9jb21wb25lbnRzL0dsdGZVdGlsc1wiO1xyXG5pbXBvcnQgeyBNZXNoUmVuZGVyZXIsIFNraW5uZWRNZXNoUmVuZGVyZXIgfSBmcm9tIFwiLi9jb21wb25lbnRzL01lc2hSZW5kZXJlclwiO1xyXG5pbXBvcnQgeyBjcmVhdGVCb3gsIGNyZWF0ZUNvbmUsIGNyZWF0ZUNpcmNsZSwgY3JlYXRlU3BoZXJlLCBjcmVhdGVUcnVuY2F0ZWRDb25lIH0gZnJvbSBcIi4vY29tcG9uZW50cy9QcmltaXRpdmVzXCI7XHJcbmltcG9ydCBQcmltaXRpdmVSZW5kZXJlciBmcm9tIFwiLi9jb21wb25lbnRzL1ByaW1pdGl2ZVJlbmRlcmVyXCI7XHJcbmltcG9ydCB7IFByb2dyYW1JbmZvLCB9IGZyb20gXCIuL2NvbXBvbmVudHMvUHJvZ3JhbUluZm9cIjtcclxuaW1wb3J0IERyYXdlciBmcm9tIFwiLi9jb21wb25lbnRzL0RyYXdlclwiO1xyXG5pbXBvcnQgeyBUZXh0dXJlSW5mbywgfSBmcm9tIFwiLi9jb21wb25lbnRzL1RleHR1cmVJbmZvXCI7XHJcbmltcG9ydCBNb2RlbCBmcm9tIFwiLi9jb21wb25lbnRzL01vZGVsXCI7XHJcbmltcG9ydCB7IGRlZmF1bHRTaGFkZXJzLCBwb2ludExpZ2h0U2hhZGVycyB9IGZyb20gXCIuL3JlbmRlci9zaGFkZXJzXCI7XHJcbmltcG9ydCBHTGNvbnRleHRXcmFwcGVyIGZyb20gXCIuL2NvbXBvbmVudHMvR0xXcmFwcGVyXCI7XHJcbmV4cG9ydCB7IEdMVEYsIEdMY29udGV4dFdyYXBwZXIsIFRleHR1cmVJbmZvLCBNb2RlbCwgUHJpbWl0aXZlUmVuZGVyZXIsIEVudGl0eURhdGFGcm9tR2x0ZiwgUHJpbWl0aXZlUmVuZGVySW5mb0Zyb21BcnJheURhdGEsIEFycmF5RGF0YUZyb21HbHRmLCBNZXNoUmVuZGVyZXIsIFNraW5uZWRNZXNoUmVuZGVyZXIsIGNyZWF0ZUJveCwgUHJvZ3JhbUluZm8sIERyYXdlciwgY3JlYXRlQ29uZSwgY3JlYXRlQ2lyY2xlLCBkZWZhdWx0U2hhZGVycywgcG9pbnRMaWdodFNoYWRlcnMsIGNyZWF0ZVNwaGVyZSwgY3JlYXRlVHJ1bmNhdGVkQ29uZSB9O1xyXG4iLCJleHBvcnQgZGVmYXVsdCBgI3ZlcnNpb24gMzAwIGVzXHJcbnByZWNpc2lvbiBoaWdocCBmbG9hdDtcclxuIFxyXG5cclxuXHJcbnVuaWZvcm0gdmVjNCB1X2NvbG9yO1xyXG5vdXQgdmVjNCBvdXRDb2xvcjtcclxudm9pZCBtYWluKCkge1xyXG4gIFxyXG4gIFxyXG4gIG91dENvbG9yID0gdV9jb2xvcjtcclxuIFxyXG4gIFxyXG4gIFxyXG59YDtcclxuIiwiaW1wb3J0IHZlcnQgZnJvbSAnLi92ZXJ0LmpzJztcclxuaW1wb3J0IGZyYWcgZnJvbSAnLi9mcmFnLmpzJztcclxuZXhwb3J0IGRlZmF1bHQgeyB2ZXJ0LCBmcmFnIH07XHJcbiIsImV4cG9ydCBkZWZhdWx0IGAjdmVyc2lvbiAzMDAgZXNcclxuXHJcbnByZWNpc2lvbiBoaWdocCBmbG9hdDtcclxuXHJcbnVuaWZvcm0gbWF0NCB1X3dvcmxkVmlld1Byb2plY3Rpb247XHJcblxyXG5cclxubGF5b3V0KGxvY2F0aW9uID0gMCkgaW4gdmVjNCBhX3Bvc2l0aW9uO1xyXG52b2lkIG1haW4oKSB7XHJcbiAgZ2xfUG9zaXRpb24gPSB1X3dvcmxkVmlld1Byb2plY3Rpb24gKiBhX3Bvc2l0aW9uO1xyXG4gIGdsX1BvaW50U2l6ZSA9IDEwLjA7XHJcbn1gO1xyXG4iLCJpbXBvcnQgZGVmYXVsdFNoYWRlcnMgZnJvbSBcIi4vZGVmYXVsdFwiO1xyXG5pbXBvcnQgcG9pbnRMaWdodFNoYWRlcnMgZnJvbSBcIi4vcG9pbnRMaWdodFwiO1xyXG5leHBvcnQgeyBkZWZhdWx0U2hhZGVycywgcG9pbnRMaWdodFNoYWRlcnMgfTtcclxuIiwiZXhwb3J0IGRlZmF1bHQgYCN2ZXJzaW9uIDMwMCBlc1xyXG5wcmVjaXNpb24gaGlnaHAgZmxvYXQ7XHJcbiBcclxuXHJcblxyXG5cclxuaW4gdmVjMyB2X25vcm1hbDtcclxuaW4gdmVjMyB2X3N1cmZhY2VUb1ZpZXc7XHJcbmluIHZlYzMgdl9zdXJmYWNlVG9MaWdodDtcclxuXHJcblxyXG4vL3VuaWZvcm0gc2FtcGxlcjJEIHVfdGV4dHVyZTE7XHJcbnVuaWZvcm0gZmxvYXQgdV9zaGluaW5lc3M7XHJcbnVuaWZvcm0gdmVjNCB1X2NvbG9yO1xyXG51bmlmb3JtIHZlYzQgdV9hbWJpZW50TGlnaHQ7XHJcbm91dCB2ZWM0IG91dENvbG9yO1xyXG5cclxuXHJcbnZvaWQgbWFpbigpIHtcclxuICBcclxuICB2ZWMzIHN1cmZhY2VUb0xpZ2h0RGlyZWN0aW9uID0gbm9ybWFsaXplKHZfc3VyZmFjZVRvTGlnaHQpO1xyXG4gIHZlYzMgc3VyZmFjZVRvVmlld0RpcmVjdGlvbiA9IG5vcm1hbGl6ZSh2X3N1cmZhY2VUb1ZpZXcpO1xyXG4gIHZlYzMgaGFsZlZlY3RvciA9IG5vcm1hbGl6ZShzdXJmYWNlVG9MaWdodERpcmVjdGlvbiArIHN1cmZhY2VUb1ZpZXdEaXJlY3Rpb24pO1xyXG5cclxuICB2ZWMzIG5vcm1hbCA9IG5vcm1hbGl6ZSh2X25vcm1hbCk7XHJcbiAgZmxvYXQgbGlnaHQgPSBkb3Qobm9ybWFsLCBzdXJmYWNlVG9MaWdodERpcmVjdGlvbik7XHJcbiAgZmxvYXQgc3BlY3VsYXIgPSAwLjA7XHJcbiAgaWYgKGxpZ2h0ID4gMC4wKSB7XHJcbiAgICBzcGVjdWxhciA9IHBvdyhkb3Qobm9ybWFsLCBoYWxmVmVjdG9yKSwgdV9zaGluaW5lc3MpO1xyXG4gIH1cclxuICBcclxuICBvdXRDb2xvciA9ICB1X2NvbG9yO1xyXG4gIG91dENvbG9yLnJnYiAqPSBsaWdodDtcclxuICBvdXRDb2xvci5yZ2IgKz0gc3BlY3VsYXI7XHJcblxyXG4gIG91dENvbG9yLnJnYiArPSB1X2FtYmllbnRMaWdodC5yZ2IgKjAuMztcclxuICBcclxufWA7XHJcbiIsImltcG9ydCB2ZXJ0IGZyb20gJy4vdmVydC5qcyc7XHJcbmltcG9ydCBmcmFnIGZyb20gJy4vZnJhZy5qcyc7XHJcbmV4cG9ydCBkZWZhdWx0IHsgdmVydCwgZnJhZyB9O1xyXG4iLCJleHBvcnQgZGVmYXVsdCBgI3ZlcnNpb24gMzAwIGVzXHJcbiBcclxubGF5b3V0KGxvY2F0aW9uID0gMCkgaW4gdmVjNCBhX3Bvc2l0aW9uO1xyXG5sYXlvdXQobG9jYXRpb24gPSAxKSBpbiB2ZWMzIGFfbm9ybWFsO1xyXG5cclxuXHJcbnVuaWZvcm0gbWF0NCB1X21hdHJpeDtcclxudW5pZm9ybSBtYXQ0IHVfd29ybGRWaWV3UHJvamVjdGlvbjtcclxudW5pZm9ybSB2ZWMzIHVfbGlnaHRXb3JsZFBvc2l0aW9uO1xyXG51bmlmb3JtIHZlYzMgdV92aWV3V29ybGRQb3NpdGlvbjtcclxuXHJcbm91dCB2ZWMzIHZfbm9ybWFsO1xyXG5vdXQgdmVjMyB2X3N1cmZhY2VUb0xpZ2h0O1xyXG5vdXQgdmVjMyB2X3N1cmZhY2VUb1ZpZXc7XHJcbnZvaWQgbWFpbigpIHtcclxuICAgIFxyXG4gICAgZ2xfUG9zaXRpb24gPSB1X3dvcmxkVmlld1Byb2plY3Rpb24gKiBhX3Bvc2l0aW9uO1xyXG4gICAgXHJcbiAgICB2ZWMzIHN1cmZhY2VXb3JsZFBvc2l0aW9uID0gKHVfbWF0cml4ICogYV9wb3NpdGlvbikueHl6O1xyXG4gICAgXHJcbiAgICB2X3N1cmZhY2VUb0xpZ2h0ID0gdV9saWdodFdvcmxkUG9zaXRpb24gLSBzdXJmYWNlV29ybGRQb3NpdGlvbjtcclxuXHJcbiAgICB2X25vcm1hbCA9IG1hdDMoICB1X21hdHJpeCApICogYV9ub3JtYWw7XHJcbiAgICBcclxuICAgIHZfc3VyZmFjZVRvVmlldyA9IHVfdmlld1dvcmxkUG9zaXRpb24gLSBzdXJmYWNlV29ybGRQb3NpdGlvbjtcclxuICAgICAgXHJcbn1gO1xyXG4iLCJpbXBvcnQgQUFCQiwgeyBnZXRDZW50ZXIsIGdldERpYWdvbmFsLCBpc0NvbGxpZGUgfSBmcm9tIFwiLi9hYWJiXCI7XHJcbmltcG9ydCB2MyBmcm9tIFwiLi92M1wiO1xyXG5jb25zdCBlbGVtZW50U2l6ZSA9IDE7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9jdHJlZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihhYWJiKSB7XHJcbiAgICAgICAgdGhpcy5hYWJiID0gYWFiYjtcclxuICAgICAgICB0aGlzLmRpYWdvbmFsID0gZ2V0RGlhZ29uYWwoYWFiYik7XHJcbiAgICAgICAgdGhpcy5jZW50ZXIgPSBnZXRDZW50ZXIoYWFiYik7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcclxuICAgICAgICB0aGlzLmNhcGFjaXR5ID0gNDtcclxuICAgIH1cclxuICAgIHN1YmRpdmlkZSgpIHtcclxuICAgICAgICBjb25zdCBtaW4gPSB0aGlzLmFhYmIubWluO1xyXG4gICAgICAgIGNvbnN0IG1heCA9IHRoaXMuYWFiYi5tYXg7XHJcbiAgICAgICAgY29uc3QgW3gxLCB5MSwgejFdID0gbWluO1xyXG4gICAgICAgIGNvbnN0IFt4MiwgeTIsIHoyXSA9IG1heDtcclxuICAgICAgICBjb25zdCB4YyA9IHRoaXMuY2VudGVyWzBdO1xyXG4gICAgICAgIGNvbnN0IHljID0gdGhpcy5jZW50ZXJbMV07XHJcbiAgICAgICAgY29uc3QgemMgPSB0aGlzLmNlbnRlclsyXTtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuWzBdID0gbmV3IE9jdHJlZShuZXcgQUFCQihbeDEsIHkxLCB6MV0sIFt4YywgeWMsIHpjXSkpO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5bMV0gPSBuZXcgT2N0cmVlKG5ldyBBQUJCKFt4MSwgeTEsIHpjXSwgW3hjLCB5YywgejJdKSk7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlblsyXSA9IG5ldyBPY3RyZWUobmV3IEFBQkIoW3gxLCB5YywgejFdLCBbeGMsIHkyLCB6Y10pKTtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuWzNdID0gbmV3IE9jdHJlZShuZXcgQUFCQihbeDEsIHljLCB6Y10sIFt4YywgeTIsIHoyXSkpO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5bNF0gPSBuZXcgT2N0cmVlKG5ldyBBQUJCKFt4YywgeTEsIHoxXSwgW3gyLCB5YywgemNdKSk7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbls1XSA9IG5ldyBPY3RyZWUobmV3IEFBQkIoW3hjLCB5MSwgemNdLCBbeDIsIHljLCB6Ml0pKTtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuWzZdID0gbmV3IE9jdHJlZShuZXcgQUFCQihbeGMsIHljLCB6MV0sIFt4MiwgeTIsIHpjXSkpO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5bN10gPSBuZXcgT2N0cmVlKG5ldyBBQUJCKFt4YywgeWMsIHpjXSwgW3gyLCB5MiwgejJdKSk7XHJcbiAgICB9XHJcbiAgICBpbnNlcnQodm94ZWwpIHtcclxuICAgICAgICBpZiAodGhpcy5lbGVtZW50cy5sZW5ndGggPCB0aGlzLmNhcGFjaXR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudHMucHVzaCh2b3hlbCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID09PSAwKVxyXG4gICAgICAgICAgICB0aGlzLnN1YmRpdmlkZSgpO1xyXG4gICAgICAgIGNvbnN0IHhjID0gdGhpcy5jZW50ZXJbMF07XHJcbiAgICAgICAgY29uc3QgeWMgPSB0aGlzLmNlbnRlclsxXTtcclxuICAgICAgICBjb25zdCB6YyA9IHRoaXMuY2VudGVyWzJdO1xyXG4gICAgICAgIGNvbnN0IHggPSBOdW1iZXIodm94ZWxbMF0gPiB4YykgKiA0O1xyXG4gICAgICAgIGNvbnN0IHkgPSBOdW1iZXIodm94ZWxbMV0gPiB5YykgKiAyO1xyXG4gICAgICAgIGNvbnN0IHogPSBOdW1iZXIodm94ZWxbMl0gPiB6Yyk7XHJcbiAgICAgICAgY29uc3QgaWR4ID0geiB8IHkgfCB4O1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5baWR4XS5pbnNlcnQodm94ZWwpO1xyXG4gICAgfVxyXG4gICAgcXVlcnkoYWFiYikge1xyXG4gICAgICAgIGNvbnN0IGZvdW5kID0gW107XHJcbiAgICAgICAgaWYgKCFpc0NvbGxpZGUodGhpcy5hYWJiLCBhYWJiKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZm91bmQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgY29uc3QgX2FhYmIgPSBuZXcgQUFCQih2My5zdW0oZWxlbWVudCwgWy0wLjUsIC0wLjUsIC0wLjVdKSwgdjMuc3VtKGVsZW1lbnQsIFswLjUsIDAuNSwgMC41XSkpO1xyXG4gICAgICAgICAgICBpZiAoaXNDb2xsaWRlKGFhYmIsIF9hYWJiKSkge1xyXG4gICAgICAgICAgICAgICAgZm91bmQucHVzaChlbGVtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgICAgICAgIGZvdW5kLnB1c2goLi4uY2hpbGQucXVlcnkoYWFiYikpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBmb3VuZDtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgdjMgZnJvbSBcIi4vdjNcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQUFCQiB7XHJcbiAgICBjb25zdHJ1Y3RvcihtaW4sIG1heCkge1xyXG4gICAgICAgIHRoaXMubWluID0gbWluO1xyXG4gICAgICAgIHRoaXMubWF4ID0gbWF4O1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjb25zdCBpc0NvbGxpZGUgPSAoYWFiYjEsIGFhYmIyKSA9PiB7XHJcbiAgICBpZiAoYWFiYjEubWluWzBdIDw9IGFhYmIyLm1heFswXSAmJlxyXG4gICAgICAgIGFhYmIxLm1heFswXSA+PSBhYWJiMi5taW5bMF0gJiZcclxuICAgICAgICBhYWJiMS5taW5bMV0gPD0gYWFiYjIubWF4WzFdICYmXHJcbiAgICAgICAgYWFiYjEubWF4WzFdID49IGFhYmIyLm1pblsxXSAmJlxyXG4gICAgICAgIGFhYmIxLm1pblsyXSA8PSBhYWJiMi5tYXhbMl0gJiZcclxuICAgICAgICBhYWJiMS5tYXhbMl0gPj0gYWFiYjIubWluWzJdKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRDZW50ZXIgPSAoYWFiYikgPT4ge1xyXG4gICAgY29uc3Qgc3VtID0gdjMuc3VtKGFhYmIubWF4LCBhYWJiLm1pbik7XHJcbiAgICByZXR1cm4gW3N1bVswXSAvIDIsIHN1bVsxXSAvIDIsIHN1bVsyXSAvIDJdO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZ2V0RGlhZ29uYWwgPSAoYWFiYikgPT4gdjMuZGlmZihhYWJiLm1heCwgYWFiYi5taW4pO1xyXG5leHBvcnQgY29uc3QgY29udGFpbnMgPSAoYWFiYiwgcCkgPT4geyB9O1xyXG4iLCJpbXBvcnQgQUFCQiBmcm9tIFwiLi9hYWJiXCI7XHJcbmltcG9ydCB2MyBmcm9tIFwiLi92M1wiO1xyXG5pbXBvcnQgbTMgZnJvbSBcIi4vbTNcIjtcclxuaW1wb3J0IG00IGZyb20gXCIuL200XCI7XHJcbmltcG9ydCBPY3RyZWUgZnJvbSBcIi4vT2N0cmVlXCI7XHJcbmV4cG9ydCB7IEFBQkIsIHYzLCBtNCwgbTMsIE9jdHJlZSB9O1xyXG4iLCJjb25zdCBtMyA9IHtcclxuICAgIG11bHRpcGx5OiBmdW5jdGlvbiAoYiwgYSkge1xyXG4gICAgICAgIGNvbnN0IGEwMCA9IGFbMCAqIDMgKyAwXTtcclxuICAgICAgICBjb25zdCBhMDEgPSBhWzAgKiAzICsgMV07XHJcbiAgICAgICAgY29uc3QgYTAyID0gYVswICogMyArIDJdO1xyXG4gICAgICAgIGNvbnN0IGExMCA9IGFbMSAqIDMgKyAwXTtcclxuICAgICAgICBjb25zdCBhMTEgPSBhWzEgKiAzICsgMV07XHJcbiAgICAgICAgY29uc3QgYTEyID0gYVsxICogMyArIDJdO1xyXG4gICAgICAgIGNvbnN0IGEyMCA9IGFbMiAqIDMgKyAwXTtcclxuICAgICAgICBjb25zdCBhMjEgPSBhWzIgKiAzICsgMV07XHJcbiAgICAgICAgY29uc3QgYTIyID0gYVsyICogMyArIDJdO1xyXG4gICAgICAgIGNvbnN0IGIwMCA9IGJbMCAqIDMgKyAwXTtcclxuICAgICAgICBjb25zdCBiMDEgPSBiWzAgKiAzICsgMV07XHJcbiAgICAgICAgY29uc3QgYjAyID0gYlswICogMyArIDJdO1xyXG4gICAgICAgIGNvbnN0IGIxMCA9IGJbMSAqIDMgKyAwXTtcclxuICAgICAgICBjb25zdCBiMTEgPSBiWzEgKiAzICsgMV07XHJcbiAgICAgICAgY29uc3QgYjEyID0gYlsxICogMyArIDJdO1xyXG4gICAgICAgIGNvbnN0IGIyMCA9IGJbMiAqIDMgKyAwXTtcclxuICAgICAgICBjb25zdCBiMjEgPSBiWzIgKiAzICsgMV07XHJcbiAgICAgICAgY29uc3QgYjIyID0gYlsyICogMyArIDJdO1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIGIwMCAqIGEwMCArIGIwMSAqIGExMCArIGIwMiAqIGEyMCxcclxuICAgICAgICAgICAgYjAwICogYTAxICsgYjAxICogYTExICsgYjAyICogYTIxLFxyXG4gICAgICAgICAgICBiMDAgKiBhMDIgKyBiMDEgKiBhMTIgKyBiMDIgKiBhMjIsXHJcbiAgICAgICAgICAgIGIxMCAqIGEwMCArIGIxMSAqIGExMCArIGIxMiAqIGEyMCxcclxuICAgICAgICAgICAgYjEwICogYTAxICsgYjExICogYTExICsgYjEyICogYTIxLFxyXG4gICAgICAgICAgICBiMTAgKiBhMDIgKyBiMTEgKiBhMTIgKyBiMTIgKiBhMjIsXHJcbiAgICAgICAgICAgIGIyMCAqIGEwMCArIGIyMSAqIGExMCArIGIyMiAqIGEyMCxcclxuICAgICAgICAgICAgYjIwICogYTAxICsgYjIxICogYTExICsgYjIyICogYTIxLFxyXG4gICAgICAgICAgICBiMjAgKiBhMDIgKyBiMjEgKiBhMTIgKyBiMjIgKiBhMjIsXHJcbiAgICAgICAgXTtcclxuICAgIH0sXHJcbiAgICB4Um90YXRpb246IGZ1bmN0aW9uIChhbmdsZUluUmFkaWFucykge1xyXG4gICAgICAgIGNvbnN0IGMgPSBNYXRoLmNvcyhhbmdsZUluUmFkaWFucyk7XHJcbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKGFuZ2xlSW5SYWRpYW5zKTtcclxuICAgICAgICByZXR1cm4gWzEsIDAsIDAsIDAsIGMsIHMsIDAsIC1zLCBjXTtcclxuICAgIH0sXHJcbiAgICB5Um90YXRpb246IGZ1bmN0aW9uIChhbmdsZUluUmFkaWFucykge1xyXG4gICAgICAgIGNvbnN0IGMgPSBNYXRoLmNvcyhhbmdsZUluUmFkaWFucyk7XHJcbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKGFuZ2xlSW5SYWRpYW5zKTtcclxuICAgICAgICByZXR1cm4gW2MsIDAsIC1zLCAwLCAxLCAwLCBzLCAwLCBjXTtcclxuICAgIH0sXHJcbiAgICB6Um90YXRpb246IGZ1bmN0aW9uIChhbmdsZUluUmFkaWFucykge1xyXG4gICAgICAgIGNvbnN0IGMgPSBNYXRoLmNvcyhhbmdsZUluUmFkaWFucyk7XHJcbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKGFuZ2xlSW5SYWRpYW5zKTtcclxuICAgICAgICByZXR1cm4gW2MsIHMsIDAsIC1zLCBjLCAwLCAwLCAwLCAxXTtcclxuICAgIH0sXHJcbiAgICBtM1RvbTQ6IGZ1bmN0aW9uIChtKSB7XHJcbiAgICAgICAgY29uc3QgZHN0ID0gbmV3IEFycmF5KDE2KTtcclxuICAgICAgICBkc3RbMF0gPSBtWzBdO1xyXG4gICAgICAgIGRzdFsxXSA9IG1bMV07XHJcbiAgICAgICAgZHN0WzJdID0gbVsyXTtcclxuICAgICAgICBkc3RbM10gPSAwO1xyXG4gICAgICAgIGRzdFs0XSA9IG1bM107XHJcbiAgICAgICAgZHN0WzVdID0gbVs0XTtcclxuICAgICAgICBkc3RbNl0gPSBtWzVdO1xyXG4gICAgICAgIGRzdFs3XSA9IDA7XHJcbiAgICAgICAgZHN0WzhdID0gbVs2XTtcclxuICAgICAgICBkc3RbOV0gPSBtWzddO1xyXG4gICAgICAgIGRzdFsxMF0gPSBtWzhdO1xyXG4gICAgICAgIGRzdFsxMV0gPSAwO1xyXG4gICAgICAgIGRzdFsxMl0gPSAwO1xyXG4gICAgICAgIGRzdFsxM10gPSAwO1xyXG4gICAgICAgIGRzdFsxNF0gPSAwO1xyXG4gICAgICAgIGRzdFsxNV0gPSAxO1xyXG4gICAgICAgIHJldHVybiBkc3Q7XHJcbiAgICB9LFxyXG4gICAgeFJvdGF0ZTogZnVuY3Rpb24gKG0sIGFuZ2xlSW5SYWRpYW5zKSB7XHJcbiAgICAgICAgcmV0dXJuIG0zLm11bHRpcGx5KG0sIG0zLnhSb3RhdGlvbihhbmdsZUluUmFkaWFucykpO1xyXG4gICAgfSxcclxuICAgIHlSb3RhdGU6IGZ1bmN0aW9uIChtLCBhbmdsZUluUmFkaWFucykge1xyXG4gICAgICAgIHJldHVybiBtMy5tdWx0aXBseShtLCBtMy55Um90YXRpb24oYW5nbGVJblJhZGlhbnMpKTtcclxuICAgIH0sXHJcbiAgICB6Um90YXRlOiBmdW5jdGlvbiAobSwgYW5nbGVJblJhZGlhbnMpIHtcclxuICAgICAgICByZXR1cm4gbTMubXVsdGlwbHkobSwgbTMuelJvdGF0aW9uKGFuZ2xlSW5SYWRpYW5zKSk7XHJcbiAgICB9LFxyXG4gICAgdHJhbnNmb3JtUG9pbnQ6IGZ1bmN0aW9uIChtLCB2KSB7XHJcbiAgICAgICAgY29uc3QgZHN0ID0gWzAsIDAsIDBdO1xyXG4gICAgICAgIGNvbnN0IHYwID0gdlswXTtcclxuICAgICAgICBjb25zdCB2MSA9IHZbMV07XHJcbiAgICAgICAgY29uc3QgdjIgPSB2WzJdO1xyXG4gICAgICAgIGRzdFswXSA9IHYwICogbVswICogMyArIDBdICsgdjEgKiBtWzEgKiAzICsgMF0gKyB2MiAqIG1bMiAqIDMgKyAwXTtcclxuICAgICAgICBkc3RbMV0gPSB2MCAqIG1bMCAqIDMgKyAxXSArIHYxICogbVsxICogMyArIDFdICsgdjIgKiBtWzIgKiAzICsgMV07XHJcbiAgICAgICAgZHN0WzJdID0gdjAgKiBtWzAgKiAzICsgMl0gKyB2MSAqIG1bMSAqIDMgKyAyXSArIHYyICogbVsyICogMyArIDJdO1xyXG4gICAgICAgIHJldHVybiBkc3Q7XHJcbiAgICB9LFxyXG4gICAgaWRlbnRpdHk6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gWzEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDFdO1xyXG4gICAgfSxcclxuICAgIHRyYW5zcG9zZTogZnVuY3Rpb24gKG0pIHtcclxuICAgICAgICBjb25zdCBkc3QgPSBuZXcgQXJyYXkoOSk7XHJcbiAgICAgICAgZHN0WzBdID0gbVswXTtcclxuICAgICAgICBkc3RbMV0gPSBtWzNdO1xyXG4gICAgICAgIGRzdFsyXSA9IG1bNl07XHJcbiAgICAgICAgZHN0WzNdID0gbVsxXTtcclxuICAgICAgICBkc3RbNF0gPSBtWzRdO1xyXG4gICAgICAgIGRzdFs1XSA9IG1bN107XHJcbiAgICAgICAgZHN0WzZdID0gbVsyXTtcclxuICAgICAgICBkc3RbN10gPSBtWzVdO1xyXG4gICAgICAgIGRzdFs4XSA9IG1bOF07XHJcbiAgICAgICAgcmV0dXJuIGRzdDtcclxuICAgIH0sXHJcbiAgICBzY2FsaW5nOiBmdW5jdGlvbiAoc3gsIHN5LCBzeikge1xyXG4gICAgICAgIHJldHVybiBbc3gsIDAsIDAsIDAsIHN5LCAwLCAwLCAwLCBzel07XHJcbiAgICB9LFxyXG4gICAgc2NhbGU6IGZ1bmN0aW9uIChtLCBzeCwgc3ksIHN6KSB7XHJcbiAgICAgICAgcmV0dXJuIG0zLm11bHRpcGx5KG0sIG0zLnNjYWxpbmcoc3gsIHN5LCBzeikpO1xyXG4gICAgfSxcclxuICAgIC8qXHJcbiAgICAgICAgMCAxIDJcclxuICAgICAgICAzIDQgNVxyXG4gICAgICAgIDYgNyA4XHJcbiAgICAgICAgKi9cclxuICAgIGludmVyc2U6IGZ1bmN0aW9uIChtKSB7XHJcbiAgICAgICAgY29uc3QgZGV0ID0gbVswXSAqIG1bNF0gKiBtWzhdICtcclxuICAgICAgICAgICAgbVsyXSAqIG1bM10gKiBtWzddICtcclxuICAgICAgICAgICAgbVsxXSAqIG1bNV0gKiBtWzZdIC1cclxuICAgICAgICAgICAgbVsyXSAqIG1bNF0gKiBtWzZdIC1cclxuICAgICAgICAgICAgbVswXSAqIG1bNV0gKiBtWzddIC1cclxuICAgICAgICAgICAgbVs4XSAqIG1bM10gKiBtWzJdO1xyXG4gICAgICAgIGNvbnN0IGRzdCA9IG5ldyBBcnJheSg5KTtcclxuICAgICAgICBkc3RbMF0gPSAobVs0XSAqIG1bOF0gLSBtWzddICogbVs1XSkgLyBkZXQ7XHJcbiAgICAgICAgZHN0WzFdID0gKG1bM10gKiBtWzhdIC0gbVs2XSAqIG1bNV0pIC8gZGV0O1xyXG4gICAgICAgIGRzdFsyXSA9IChtWzNdICogbVs3XSAtIG1bNl0gKiBtWzRdKSAvIGRldDtcclxuICAgICAgICBkc3RbM10gPSAobVsxXSAqIG1bOF0gLSBtWzJdICogbVs3XSkgLyBkZXQ7XHJcbiAgICAgICAgZHN0WzRdID0gKG1bMF0gKiBtWzhdIC0gbVsyXSAqIG1bNl0pIC8gZGV0O1xyXG4gICAgICAgIGRzdFs1XSA9IChtWzBdICogbVs3XSAtIG1bMV0gKiBtWzZdKSAvIGRldDtcclxuICAgICAgICBkc3RbNl0gPSAobVsxXSAqIG1bNV0gLSBtWzJdICogbVs0XSkgLyBkZXQ7XHJcbiAgICAgICAgZHN0WzddID0gKG1bMF0gKiBtWzVdIC0gbVsyXSAqIG1bM10pIC8gZGV0O1xyXG4gICAgICAgIGRzdFs4XSA9IChtWzBdICogbVs0XSAtIG1bMV0gKiBtWzRdKSAvIGRldDtcclxuICAgICAgICByZXR1cm4gZHN0O1xyXG4gICAgfSxcclxuICAgIHRvU3RyaW5nKG0pIHtcclxuICAgICAgICByZXR1cm4gbS5yZWR1Y2UoKGFjYywgZWwsIGlkeCkgPT4gaWR4ICUgMyA9PT0gMFxyXG4gICAgICAgICAgICA/IChhY2MgKz0gYFxcbiR7ZWwudG9TdHJpbmcoKX1gKVxyXG4gICAgICAgICAgICA6IChhY2MgKz0gYCAke2VsLnRvU3RyaW5nKCl9YCksIFwiXCIpO1xyXG4gICAgfSxcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgbTM7XHJcbiIsImltcG9ydCB2MyBmcm9tIFwiLi92M1wiO1xyXG5jb25zdCBtNCA9IHtcclxuICAgIG11bHRpcGx5OiBmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgIGNvbnN0IGEwMCA9IGFbMCAqIDQgKyAwXTtcclxuICAgICAgICBjb25zdCBhMDEgPSBhWzAgKiA0ICsgMV07XHJcbiAgICAgICAgY29uc3QgYTAyID0gYVswICogNCArIDJdO1xyXG4gICAgICAgIGNvbnN0IGEwMyA9IGFbMCAqIDQgKyAzXTtcclxuICAgICAgICBjb25zdCBhMTAgPSBhWzEgKiA0ICsgMF07XHJcbiAgICAgICAgY29uc3QgYTExID0gYVsxICogNCArIDFdO1xyXG4gICAgICAgIGNvbnN0IGExMiA9IGFbMSAqIDQgKyAyXTtcclxuICAgICAgICBjb25zdCBhMTMgPSBhWzEgKiA0ICsgM107XHJcbiAgICAgICAgY29uc3QgYTIwID0gYVsyICogNCArIDBdO1xyXG4gICAgICAgIGNvbnN0IGEyMSA9IGFbMiAqIDQgKyAxXTtcclxuICAgICAgICBjb25zdCBhMjIgPSBhWzIgKiA0ICsgMl07XHJcbiAgICAgICAgY29uc3QgYTIzID0gYVsyICogNCArIDNdO1xyXG4gICAgICAgIGNvbnN0IGEzMCA9IGFbMyAqIDQgKyAwXTtcclxuICAgICAgICBjb25zdCBhMzEgPSBhWzMgKiA0ICsgMV07XHJcbiAgICAgICAgY29uc3QgYTMyID0gYVszICogNCArIDJdO1xyXG4gICAgICAgIGNvbnN0IGEzMyA9IGFbMyAqIDQgKyAzXTtcclxuICAgICAgICBjb25zdCBiMDAgPSBiWzAgKiA0ICsgMF07XHJcbiAgICAgICAgY29uc3QgYjAxID0gYlswICogNCArIDFdO1xyXG4gICAgICAgIGNvbnN0IGIwMiA9IGJbMCAqIDQgKyAyXTtcclxuICAgICAgICBjb25zdCBiMDMgPSBiWzAgKiA0ICsgM107XHJcbiAgICAgICAgY29uc3QgYjEwID0gYlsxICogNCArIDBdO1xyXG4gICAgICAgIGNvbnN0IGIxMSA9IGJbMSAqIDQgKyAxXTtcclxuICAgICAgICBjb25zdCBiMTIgPSBiWzEgKiA0ICsgMl07XHJcbiAgICAgICAgY29uc3QgYjEzID0gYlsxICogNCArIDNdO1xyXG4gICAgICAgIGNvbnN0IGIyMCA9IGJbMiAqIDQgKyAwXTtcclxuICAgICAgICBjb25zdCBiMjEgPSBiWzIgKiA0ICsgMV07XHJcbiAgICAgICAgY29uc3QgYjIyID0gYlsyICogNCArIDJdO1xyXG4gICAgICAgIGNvbnN0IGIyMyA9IGJbMiAqIDQgKyAzXTtcclxuICAgICAgICBjb25zdCBiMzAgPSBiWzMgKiA0ICsgMF07XHJcbiAgICAgICAgY29uc3QgYjMxID0gYlszICogNCArIDFdO1xyXG4gICAgICAgIGNvbnN0IGIzMiA9IGJbMyAqIDQgKyAyXTtcclxuICAgICAgICBjb25zdCBiMzMgPSBiWzMgKiA0ICsgM107XHJcbiAgICAgICAgY29uc3QgZHN0ID0gW1xyXG4gICAgICAgICAgICBiMDAgKiBhMDAgKyBiMDEgKiBhMTAgKyBiMDIgKiBhMjAgKyBiMDMgKiBhMzAsXHJcbiAgICAgICAgICAgIGIwMCAqIGEwMSArIGIwMSAqIGExMSArIGIwMiAqIGEyMSArIGIwMyAqIGEzMSxcclxuICAgICAgICAgICAgYjAwICogYTAyICsgYjAxICogYTEyICsgYjAyICogYTIyICsgYjAzICogYTMyLFxyXG4gICAgICAgICAgICBiMDAgKiBhMDMgKyBiMDEgKiBhMTMgKyBiMDIgKiBhMjMgKyBiMDMgKiBhMzMsXHJcbiAgICAgICAgICAgIGIxMCAqIGEwMCArIGIxMSAqIGExMCArIGIxMiAqIGEyMCArIGIxMyAqIGEzMCxcclxuICAgICAgICAgICAgYjEwICogYTAxICsgYjExICogYTExICsgYjEyICogYTIxICsgYjEzICogYTMxLFxyXG4gICAgICAgICAgICBiMTAgKiBhMDIgKyBiMTEgKiBhMTIgKyBiMTIgKiBhMjIgKyBiMTMgKiBhMzIsXHJcbiAgICAgICAgICAgIGIxMCAqIGEwMyArIGIxMSAqIGExMyArIGIxMiAqIGEyMyArIGIxMyAqIGEzMyxcclxuICAgICAgICAgICAgYjIwICogYTAwICsgYjIxICogYTEwICsgYjIyICogYTIwICsgYjIzICogYTMwLFxyXG4gICAgICAgICAgICBiMjAgKiBhMDEgKyBiMjEgKiBhMTEgKyBiMjIgKiBhMjEgKyBiMjMgKiBhMzEsXHJcbiAgICAgICAgICAgIGIyMCAqIGEwMiArIGIyMSAqIGExMiArIGIyMiAqIGEyMiArIGIyMyAqIGEzMixcclxuICAgICAgICAgICAgYjIwICogYTAzICsgYjIxICogYTEzICsgYjIyICogYTIzICsgYjIzICogYTMzLFxyXG4gICAgICAgICAgICBiMzAgKiBhMDAgKyBiMzEgKiBhMTAgKyBiMzIgKiBhMjAgKyBiMzMgKiBhMzAsXHJcbiAgICAgICAgICAgIGIzMCAqIGEwMSArIGIzMSAqIGExMSArIGIzMiAqIGEyMSArIGIzMyAqIGEzMSxcclxuICAgICAgICAgICAgYjMwICogYTAyICsgYjMxICogYTEyICsgYjMyICogYTIyICsgYjMzICogYTMyLFxyXG4gICAgICAgICAgICBiMzAgKiBhMDMgKyBiMzEgKiBhMTMgKyBiMzIgKiBhMjMgKyBiMzMgKiBhMzMsXHJcbiAgICAgICAgXTtcclxuICAgICAgICByZXR1cm4gZHN0O1xyXG4gICAgfSxcclxuICAgIHRyYW5zbGF0aW9uOiBmdW5jdGlvbiAodHgsIHR5LCB0eikge1xyXG4gICAgICAgIHJldHVybiBbMSwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMSwgMCwgdHgsIHR5LCB0eiwgMV07XHJcbiAgICB9LFxyXG4gICAgeFJvdGF0aW9uOiBmdW5jdGlvbiAoYW5nbGVJblJhZGlhbnMpIHtcclxuICAgICAgICBjb25zdCBjID0gTWF0aC5jb3MoYW5nbGVJblJhZGlhbnMpO1xyXG4gICAgICAgIGNvbnN0IHMgPSBNYXRoLnNpbihhbmdsZUluUmFkaWFucyk7XHJcbiAgICAgICAgcmV0dXJuIFsxLCAwLCAwLCAwLCAwLCBjLCBzLCAwLCAwLCAtcywgYywgMCwgMCwgMCwgMCwgMV07XHJcbiAgICB9LFxyXG4gICAgeVJvdGF0aW9uOiBmdW5jdGlvbiAoYW5nbGVJblJhZGlhbnMpIHtcclxuICAgICAgICBjb25zdCBjID0gTWF0aC5jb3MoYW5nbGVJblJhZGlhbnMpO1xyXG4gICAgICAgIGNvbnN0IHMgPSBNYXRoLnNpbihhbmdsZUluUmFkaWFucyk7XHJcbiAgICAgICAgcmV0dXJuIFtjLCAwLCAtcywgMCwgMCwgMSwgMCwgMCwgcywgMCwgYywgMCwgMCwgMCwgMCwgMV07XHJcbiAgICB9LFxyXG4gICAgelJvdGF0aW9uOiBmdW5jdGlvbiAoYW5nbGVJblJhZGlhbnMpIHtcclxuICAgICAgICBjb25zdCBjID0gTWF0aC5jb3MoYW5nbGVJblJhZGlhbnMpO1xyXG4gICAgICAgIGNvbnN0IHMgPSBNYXRoLnNpbihhbmdsZUluUmFkaWFucyk7XHJcbiAgICAgICAgcmV0dXJuIFtjLCBzLCAwLCAwLCAtcywgYywgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMV07XHJcbiAgICB9LFxyXG4gICAgc2NhbGluZzogZnVuY3Rpb24gKHN4LCBzeSwgc3opIHtcclxuICAgICAgICByZXR1cm4gW3N4LCAwLCAwLCAwLCAwLCBzeSwgMCwgMCwgMCwgMCwgc3osIDAsIDAsIDAsIDAsIDFdO1xyXG4gICAgfSxcclxuICAgIHRyYW5zbGF0ZTogZnVuY3Rpb24gKG0sIHR4LCB0eSwgdHopIHtcclxuICAgICAgICByZXR1cm4gbTQubXVsdGlwbHkobSwgbTQudHJhbnNsYXRpb24odHgsIHR5LCB0eikpO1xyXG4gICAgfSxcclxuICAgIHhSb3RhdGU6IGZ1bmN0aW9uIChtLCBhbmdsZUluUmFkaWFucykge1xyXG4gICAgICAgIHJldHVybiBtNC5tdWx0aXBseShtLCBtNC54Um90YXRpb24oYW5nbGVJblJhZGlhbnMpKTtcclxuICAgIH0sXHJcbiAgICB5Um90YXRlOiBmdW5jdGlvbiAobSwgYW5nbGVJblJhZGlhbnMpIHtcclxuICAgICAgICByZXR1cm4gbTQubXVsdGlwbHkobSwgbTQueVJvdGF0aW9uKGFuZ2xlSW5SYWRpYW5zKSk7XHJcbiAgICB9LFxyXG4gICAgelJvdGF0ZTogZnVuY3Rpb24gKG0sIGFuZ2xlSW5SYWRpYW5zKSB7XHJcbiAgICAgICAgcmV0dXJuIG00Lm11bHRpcGx5KG0sIG00LnpSb3RhdGlvbihhbmdsZUluUmFkaWFucykpO1xyXG4gICAgfSxcclxuICAgIHNjYWxlOiBmdW5jdGlvbiAobSwgc3gsIHN5LCBzeikge1xyXG4gICAgICAgIHJldHVybiBtNC5tdWx0aXBseShtLCBtNC5zY2FsaW5nKHN4LCBzeSwgc3opKTtcclxuICAgIH0sXHJcbiAgICBtYWtlT3J0OiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgIGNvbnN0IG8gPSBbMCwgMCwgMF07XHJcbiAgICAgICAgY29uc3Qgbm9ybSA9IE1hdGguc3FydCh2WzBdICogdlswXSArIHZbMV0gKiB2WzFdICsgdlsyXSAqIHZbMl0pO1xyXG4gICAgICAgIG9bMF0gPSB2WzBdIC8gbm9ybTtcclxuICAgICAgICBvWzFdID0gdlsxXSAvIG5vcm07XHJcbiAgICAgICAgb1syXSA9IHZbMl0gLyBub3JtO1xyXG4gICAgICAgIHJldHVybiBvO1xyXG4gICAgfSxcclxuICAgIHByb2plY3Rpb246IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0LCBkZXB0aCkge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIDIgLyB3aWR0aCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgLTIgLyBoZWlnaHQsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDIgLyBkZXB0aCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgLTEsXHJcbiAgICAgICAgICAgIDEsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDEsXHJcbiAgICAgICAgXTtcclxuICAgIH0sXHJcbiAgICBwZXJzcGVjdGl2ZTogZnVuY3Rpb24gKGZpZWxkT2ZWaWV3SW5SYWRpYW5zLCBhc3BlY3QsIG5lYXIsIGZhcikge1xyXG4gICAgICAgIGNvbnN0IGYgPSBNYXRoLnRhbihNYXRoLlBJICogMC41IC0gMC41ICogZmllbGRPZlZpZXdJblJhZGlhbnMpO1xyXG4gICAgICAgIGNvbnN0IHJhbmdlSW52ID0gMS4wIC8gKG5lYXIgLSBmYXIpO1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIGYgLyBhc3BlY3QsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIGYsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIChuZWFyICsgZmFyKSAqIHJhbmdlSW52LFxyXG4gICAgICAgICAgICAtMSxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgbmVhciAqIGZhciAqIHJhbmdlSW52ICogMixcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICBdO1xyXG4gICAgfSxcclxuICAgIGludmVyc2U6IGZ1bmN0aW9uIChtKSB7XHJcbiAgICAgICAgY29uc3QgbTAwID0gbVswICogNCArIDBdO1xyXG4gICAgICAgIGNvbnN0IG0wMSA9IG1bMCAqIDQgKyAxXTtcclxuICAgICAgICBjb25zdCBtMDIgPSBtWzAgKiA0ICsgMl07XHJcbiAgICAgICAgY29uc3QgbTAzID0gbVswICogNCArIDNdO1xyXG4gICAgICAgIGNvbnN0IG0xMCA9IG1bMSAqIDQgKyAwXTtcclxuICAgICAgICBjb25zdCBtMTEgPSBtWzEgKiA0ICsgMV07XHJcbiAgICAgICAgY29uc3QgbTEyID0gbVsxICogNCArIDJdO1xyXG4gICAgICAgIGNvbnN0IG0xMyA9IG1bMSAqIDQgKyAzXTtcclxuICAgICAgICBjb25zdCBtMjAgPSBtWzIgKiA0ICsgMF07XHJcbiAgICAgICAgY29uc3QgbTIxID0gbVsyICogNCArIDFdO1xyXG4gICAgICAgIGNvbnN0IG0yMiA9IG1bMiAqIDQgKyAyXTtcclxuICAgICAgICBjb25zdCBtMjMgPSBtWzIgKiA0ICsgM107XHJcbiAgICAgICAgY29uc3QgbTMwID0gbVszICogNCArIDBdO1xyXG4gICAgICAgIGNvbnN0IG0zMSA9IG1bMyAqIDQgKyAxXTtcclxuICAgICAgICBjb25zdCBtMzIgPSBtWzMgKiA0ICsgMl07XHJcbiAgICAgICAgY29uc3QgbTMzID0gbVszICogNCArIDNdO1xyXG4gICAgICAgIGNvbnN0IHRtcF8wID0gbTIyICogbTMzO1xyXG4gICAgICAgIGNvbnN0IHRtcF8xID0gbTMyICogbTIzO1xyXG4gICAgICAgIGNvbnN0IHRtcF8yID0gbTEyICogbTMzO1xyXG4gICAgICAgIGNvbnN0IHRtcF8zID0gbTMyICogbTEzO1xyXG4gICAgICAgIGNvbnN0IHRtcF80ID0gbTEyICogbTIzO1xyXG4gICAgICAgIGNvbnN0IHRtcF81ID0gbTIyICogbTEzO1xyXG4gICAgICAgIGNvbnN0IHRtcF82ID0gbTAyICogbTMzO1xyXG4gICAgICAgIGNvbnN0IHRtcF83ID0gbTMyICogbTAzO1xyXG4gICAgICAgIGNvbnN0IHRtcF84ID0gbTAyICogbTIzO1xyXG4gICAgICAgIGNvbnN0IHRtcF85ID0gbTIyICogbTAzO1xyXG4gICAgICAgIGNvbnN0IHRtcF8xMCA9IG0wMiAqIG0xMztcclxuICAgICAgICBjb25zdCB0bXBfMTEgPSBtMTIgKiBtMDM7XHJcbiAgICAgICAgY29uc3QgdG1wXzEyID0gbTIwICogbTMxO1xyXG4gICAgICAgIGNvbnN0IHRtcF8xMyA9IG0zMCAqIG0yMTtcclxuICAgICAgICBjb25zdCB0bXBfMTQgPSBtMTAgKiBtMzE7XHJcbiAgICAgICAgY29uc3QgdG1wXzE1ID0gbTMwICogbTExO1xyXG4gICAgICAgIGNvbnN0IHRtcF8xNiA9IG0xMCAqIG0yMTtcclxuICAgICAgICBjb25zdCB0bXBfMTcgPSBtMjAgKiBtMTE7XHJcbiAgICAgICAgY29uc3QgdG1wXzE4ID0gbTAwICogbTMxO1xyXG4gICAgICAgIGNvbnN0IHRtcF8xOSA9IG0zMCAqIG0wMTtcclxuICAgICAgICBjb25zdCB0bXBfMjAgPSBtMDAgKiBtMjE7XHJcbiAgICAgICAgY29uc3QgdG1wXzIxID0gbTIwICogbTAxO1xyXG4gICAgICAgIGNvbnN0IHRtcF8yMiA9IG0wMCAqIG0xMTtcclxuICAgICAgICBjb25zdCB0bXBfMjMgPSBtMTAgKiBtMDE7XHJcbiAgICAgICAgY29uc3QgdDAgPSB0bXBfMCAqIG0xMSArXHJcbiAgICAgICAgICAgIHRtcF8zICogbTIxICtcclxuICAgICAgICAgICAgdG1wXzQgKiBtMzEgLVxyXG4gICAgICAgICAgICAodG1wXzEgKiBtMTEgKyB0bXBfMiAqIG0yMSArIHRtcF81ICogbTMxKTtcclxuICAgICAgICBjb25zdCB0MSA9IHRtcF8xICogbTAxICtcclxuICAgICAgICAgICAgdG1wXzYgKiBtMjEgK1xyXG4gICAgICAgICAgICB0bXBfOSAqIG0zMSAtXHJcbiAgICAgICAgICAgICh0bXBfMCAqIG0wMSArIHRtcF83ICogbTIxICsgdG1wXzggKiBtMzEpO1xyXG4gICAgICAgIGNvbnN0IHQyID0gdG1wXzIgKiBtMDEgK1xyXG4gICAgICAgICAgICB0bXBfNyAqIG0xMSArXHJcbiAgICAgICAgICAgIHRtcF8xMCAqIG0zMSAtXHJcbiAgICAgICAgICAgICh0bXBfMyAqIG0wMSArIHRtcF82ICogbTExICsgdG1wXzExICogbTMxKTtcclxuICAgICAgICBjb25zdCB0MyA9IHRtcF81ICogbTAxICtcclxuICAgICAgICAgICAgdG1wXzggKiBtMTEgK1xyXG4gICAgICAgICAgICB0bXBfMTEgKiBtMjEgLVxyXG4gICAgICAgICAgICAodG1wXzQgKiBtMDEgKyB0bXBfOSAqIG0xMSArIHRtcF8xMCAqIG0yMSk7XHJcbiAgICAgICAgY29uc3QgZCA9IDEuMCAvIChtMDAgKiB0MCArIG0xMCAqIHQxICsgbTIwICogdDIgKyBtMzAgKiB0Myk7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgZCAqIHQwLFxyXG4gICAgICAgICAgICBkICogdDEsXHJcbiAgICAgICAgICAgIGQgKiB0MixcclxuICAgICAgICAgICAgZCAqIHQzLFxyXG4gICAgICAgICAgICBkICpcclxuICAgICAgICAgICAgICAgICh0bXBfMSAqIG0xMCArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzIgKiBtMjAgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF81ICogbTMwIC1cclxuICAgICAgICAgICAgICAgICAgICAodG1wXzAgKiBtMTAgKyB0bXBfMyAqIG0yMCArIHRtcF80ICogbTMwKSksXHJcbiAgICAgICAgICAgIGQgKlxyXG4gICAgICAgICAgICAgICAgKHRtcF8wICogbTAwICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfNyAqIG0yMCArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzggKiBtMzAgLVxyXG4gICAgICAgICAgICAgICAgICAgICh0bXBfMSAqIG0wMCArIHRtcF82ICogbTIwICsgdG1wXzkgKiBtMzApKSxcclxuICAgICAgICAgICAgZCAqXHJcbiAgICAgICAgICAgICAgICAodG1wXzMgKiBtMDAgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF82ICogbTEwICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfMTEgKiBtMzAgLVxyXG4gICAgICAgICAgICAgICAgICAgICh0bXBfMiAqIG0wMCArIHRtcF83ICogbTEwICsgdG1wXzEwICogbTMwKSksXHJcbiAgICAgICAgICAgIGQgKlxyXG4gICAgICAgICAgICAgICAgKHRtcF80ICogbTAwICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfOSAqIG0xMCArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzEwICogbTIwIC1cclxuICAgICAgICAgICAgICAgICAgICAodG1wXzUgKiBtMDAgKyB0bXBfOCAqIG0xMCArIHRtcF8xMSAqIG0yMCkpLFxyXG4gICAgICAgICAgICBkICpcclxuICAgICAgICAgICAgICAgICh0bXBfMTIgKiBtMTMgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF8xNSAqIG0yMyArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzE2ICogbTMzIC1cclxuICAgICAgICAgICAgICAgICAgICAodG1wXzEzICogbTEzICsgdG1wXzE0ICogbTIzICsgdG1wXzE3ICogbTMzKSksXHJcbiAgICAgICAgICAgIGQgKlxyXG4gICAgICAgICAgICAgICAgKHRtcF8xMyAqIG0wMyArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzE4ICogbTIzICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfMjEgKiBtMzMgLVxyXG4gICAgICAgICAgICAgICAgICAgICh0bXBfMTIgKiBtMDMgKyB0bXBfMTkgKiBtMjMgKyB0bXBfMjAgKiBtMzMpKSxcclxuICAgICAgICAgICAgZCAqXHJcbiAgICAgICAgICAgICAgICAodG1wXzE0ICogbTAzICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfMTkgKiBtMTMgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF8yMiAqIG0zMyAtXHJcbiAgICAgICAgICAgICAgICAgICAgKHRtcF8xNSAqIG0wMyArIHRtcF8xOCAqIG0xMyArIHRtcF8yMyAqIG0zMykpLFxyXG4gICAgICAgICAgICBkICpcclxuICAgICAgICAgICAgICAgICh0bXBfMTcgKiBtMDMgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF8yMCAqIG0xMyArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzIzICogbTIzIC1cclxuICAgICAgICAgICAgICAgICAgICAodG1wXzE2ICogbTAzICsgdG1wXzIxICogbTEzICsgdG1wXzIyICogbTIzKSksXHJcbiAgICAgICAgICAgIGQgKlxyXG4gICAgICAgICAgICAgICAgKHRtcF8xNCAqIG0yMiArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzE3ICogbTMyICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfMTMgKiBtMTIgLVxyXG4gICAgICAgICAgICAgICAgICAgICh0bXBfMTYgKiBtMzIgKyB0bXBfMTIgKiBtMTIgKyB0bXBfMTUgKiBtMjIpKSxcclxuICAgICAgICAgICAgZCAqXHJcbiAgICAgICAgICAgICAgICAodG1wXzIwICogbTMyICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfMTIgKiBtMDIgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF8xOSAqIG0yMiAtXHJcbiAgICAgICAgICAgICAgICAgICAgKHRtcF8xOCAqIG0yMiArIHRtcF8yMSAqIG0zMiArIHRtcF8xMyAqIG0wMikpLFxyXG4gICAgICAgICAgICBkICpcclxuICAgICAgICAgICAgICAgICh0bXBfMTggKiBtMTIgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF8yMyAqIG0zMiArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzE1ICogbTAyIC1cclxuICAgICAgICAgICAgICAgICAgICAodG1wXzIyICogbTMyICsgdG1wXzE0ICogbTAyICsgdG1wXzE5ICogbTEyKSksXHJcbiAgICAgICAgICAgIGQgKlxyXG4gICAgICAgICAgICAgICAgKHRtcF8yMiAqIG0yMiArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzE2ICogbTAyICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfMjEgKiBtMTIgLVxyXG4gICAgICAgICAgICAgICAgICAgICh0bXBfMjAgKiBtMTIgKyB0bXBfMjMgKiBtMjIgKyB0bXBfMTcgKiBtMDIpKSxcclxuICAgICAgICBdO1xyXG4gICAgfSxcclxuICAgIGxvb2tBdDogZnVuY3Rpb24gKGNhbWVyYVBvc2l0aW9uLCB0YXJnZXQsIHVwKSB7XHJcbiAgICAgICAgY29uc3QgekF4aXMgPSB2My5ub3JtYWxpemUodjMuZGlmZihjYW1lcmFQb3NpdGlvbiwgdGFyZ2V0KSk7XHJcbiAgICAgICAgY29uc3QgeEF4aXMgPSB2My5ub3JtYWxpemUodjMuY3Jvc3ModXAsIHpBeGlzKSk7XHJcbiAgICAgICAgY29uc3QgeUF4aXMgPSB2My5ub3JtYWxpemUodjMuY3Jvc3MoekF4aXMsIHhBeGlzKSk7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgeEF4aXNbMF0sXHJcbiAgICAgICAgICAgIHhBeGlzWzFdLFxyXG4gICAgICAgICAgICB4QXhpc1syXSxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgeUF4aXNbMF0sXHJcbiAgICAgICAgICAgIHlBeGlzWzFdLFxyXG4gICAgICAgICAgICB5QXhpc1syXSxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgekF4aXNbMF0sXHJcbiAgICAgICAgICAgIHpBeGlzWzFdLFxyXG4gICAgICAgICAgICB6QXhpc1syXSxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgY2FtZXJhUG9zaXRpb25bMF0sXHJcbiAgICAgICAgICAgIGNhbWVyYVBvc2l0aW9uWzFdLFxyXG4gICAgICAgICAgICBjYW1lcmFQb3NpdGlvblsyXSxcclxuICAgICAgICAgICAgMSxcclxuICAgICAgICBdO1xyXG4gICAgfSxcclxuICAgIGNvcHk6IGZ1bmN0aW9uIChzcmMpIHtcclxuICAgICAgICByZXR1cm4gWy4uLnNyY107XHJcbiAgICB9LFxyXG4gICAgdHJhbnNmb3JtUG9pbnQ6IGZ1bmN0aW9uIChtLCB2LCBkc3QpIHtcclxuICAgICAgICBkc3QgPSBkc3QgfHwgbmV3IEFycmF5KDMpO1xyXG4gICAgICAgIGNvbnN0IHYwID0gdlswXTtcclxuICAgICAgICBjb25zdCB2MSA9IHZbMV07XHJcbiAgICAgICAgY29uc3QgdjIgPSB2WzJdO1xyXG4gICAgICAgIGNvbnN0IGQgPSB2MCAqIG1bMCAqIDQgKyAzXSArIHYxICogbVsxICogNCArIDNdICsgdjIgKiBtWzIgKiA0ICsgM10gKyBtWzMgKiA0ICsgM107XHJcbiAgICAgICAgZHN0WzBdID1cclxuICAgICAgICAgICAgKHYwICogbVswICogNCArIDBdICtcclxuICAgICAgICAgICAgICAgIHYxICogbVsxICogNCArIDBdICtcclxuICAgICAgICAgICAgICAgIHYyICogbVsyICogNCArIDBdICtcclxuICAgICAgICAgICAgICAgIG1bMyAqIDQgKyAwXSkgL1xyXG4gICAgICAgICAgICAgICAgZDtcclxuICAgICAgICBkc3RbMV0gPVxyXG4gICAgICAgICAgICAodjAgKiBtWzAgKiA0ICsgMV0gK1xyXG4gICAgICAgICAgICAgICAgdjEgKiBtWzEgKiA0ICsgMV0gK1xyXG4gICAgICAgICAgICAgICAgdjIgKiBtWzIgKiA0ICsgMV0gK1xyXG4gICAgICAgICAgICAgICAgbVszICogNCArIDFdKSAvXHJcbiAgICAgICAgICAgICAgICBkO1xyXG4gICAgICAgIGRzdFsyXSA9XHJcbiAgICAgICAgICAgICh2MCAqIG1bMCAqIDQgKyAyXSArXHJcbiAgICAgICAgICAgICAgICB2MSAqIG1bMSAqIDQgKyAyXSArXHJcbiAgICAgICAgICAgICAgICB2MiAqIG1bMiAqIDQgKyAyXSArXHJcbiAgICAgICAgICAgICAgICBtWzMgKiA0ICsgMl0pIC9cclxuICAgICAgICAgICAgICAgIGQ7XHJcbiAgICAgICAgcmV0dXJuIGRzdDtcclxuICAgIH0sXHJcbiAgICBpZGVudGl0eTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnN0IGRzdCA9IG5ldyBBcnJheSgxNik7XHJcbiAgICAgICAgZHN0WzBdID0gMTtcclxuICAgICAgICBkc3RbMV0gPSAwO1xyXG4gICAgICAgIGRzdFsyXSA9IDA7XHJcbiAgICAgICAgZHN0WzNdID0gMDtcclxuICAgICAgICBkc3RbNF0gPSAwO1xyXG4gICAgICAgIGRzdFs1XSA9IDE7XHJcbiAgICAgICAgZHN0WzZdID0gMDtcclxuICAgICAgICBkc3RbN10gPSAwO1xyXG4gICAgICAgIGRzdFs4XSA9IDA7XHJcbiAgICAgICAgZHN0WzldID0gMDtcclxuICAgICAgICBkc3RbMTBdID0gMTtcclxuICAgICAgICBkc3RbMTFdID0gMDtcclxuICAgICAgICBkc3RbMTJdID0gMDtcclxuICAgICAgICBkc3RbMTNdID0gMDtcclxuICAgICAgICBkc3RbMTRdID0gMDtcclxuICAgICAgICBkc3RbMTVdID0gMTtcclxuICAgICAgICByZXR1cm4gZHN0O1xyXG4gICAgfSxcclxuICAgIG0zVG9tNDogZnVuY3Rpb24gKG0pIHtcclxuICAgICAgICBjb25zdCBkc3QgPSBuZXcgQXJyYXkoMTYpO1xyXG4gICAgICAgIGRzdFswXSA9IG1bMF07XHJcbiAgICAgICAgZHN0WzFdID0gbVsxXTtcclxuICAgICAgICBkc3RbMl0gPSBtWzJdO1xyXG4gICAgICAgIGRzdFszXSA9IDA7XHJcbiAgICAgICAgZHN0WzRdID0gbVszXTtcclxuICAgICAgICBkc3RbNV0gPSBtWzRdO1xyXG4gICAgICAgIGRzdFs2XSA9IG1bNV07XHJcbiAgICAgICAgZHN0WzddID0gMDtcclxuICAgICAgICBkc3RbOF0gPSBtWzZdO1xyXG4gICAgICAgIGRzdFs5XSA9IG1bN107XHJcbiAgICAgICAgZHN0WzEwXSA9IG1bOF07XHJcbiAgICAgICAgZHN0WzExXSA9IDA7XHJcbiAgICAgICAgZHN0WzEyXSA9IDA7XHJcbiAgICAgICAgZHN0WzEzXSA9IDA7XHJcbiAgICAgICAgZHN0WzE0XSA9IDA7XHJcbiAgICAgICAgZHN0WzE1XSA9IDE7XHJcbiAgICAgICAgcmV0dXJuIGRzdDtcclxuICAgIH0sXHJcbiAgICBtNFRvbTM6IGZ1bmN0aW9uIChtKSB7XHJcbiAgICAgICAgY29uc3QgZHN0ID0gbmV3IEFycmF5KDkpO1xyXG4gICAgICAgIGRzdFswXSA9IG1bMF07XHJcbiAgICAgICAgZHN0WzFdID0gbVsxXTtcclxuICAgICAgICBkc3RbMl0gPSBtWzJdO1xyXG4gICAgICAgIGRzdFszXSA9IG1bNF07XHJcbiAgICAgICAgZHN0WzRdID0gbVs1XTtcclxuICAgICAgICBkc3RbNV0gPSBtWzZdO1xyXG4gICAgICAgIGRzdFs2XSA9IG1bOF07XHJcbiAgICAgICAgZHN0WzddID0gbVs5XTtcclxuICAgICAgICBkc3RbOF0gPSBtWzEwXTtcclxuICAgICAgICByZXR1cm4gZHN0O1xyXG4gICAgfSxcclxuICAgIHRvU3RyaW5nKG0pIHtcclxuICAgICAgICByZXR1cm4gbS5yZWR1Y2UoKGFjYywgZWwsIGlkeCkgPT4gaWR4ICUgNCA9PT0gMFxyXG4gICAgICAgICAgICA/IChhY2MgKz0gYFxcbiR7ZWwudG9TdHJpbmcoKX1gKVxyXG4gICAgICAgICAgICA6IChhY2MgKz0gYCAke2VsLnRvU3RyaW5nKCl9YCksIFwiXCIpO1xyXG4gICAgfSxcclxuICAgIHRyYW5zcG9zZTogZnVuY3Rpb24gKG0pIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBtWzBdLFxyXG4gICAgICAgICAgICBtWzRdLFxyXG4gICAgICAgICAgICBtWzhdLFxyXG4gICAgICAgICAgICBtWzEyXSxcclxuICAgICAgICAgICAgbVsxXSxcclxuICAgICAgICAgICAgbVs1XSxcclxuICAgICAgICAgICAgbVs5XSxcclxuICAgICAgICAgICAgbVsxM10sXHJcbiAgICAgICAgICAgIG1bMl0sXHJcbiAgICAgICAgICAgIG1bNl0sXHJcbiAgICAgICAgICAgIG1bMTBdLFxyXG4gICAgICAgICAgICBtWzE0XSxcclxuICAgICAgICAgICAgbVszXSxcclxuICAgICAgICAgICAgbVs3XSxcclxuICAgICAgICAgICAgbVsxMV0sXHJcbiAgICAgICAgICAgIG1bMTVdLFxyXG4gICAgICAgIF07XHJcbiAgICB9LFxyXG4gICAgZnJvbVF1YXRlcm5pb246IChxKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYTExID0gMSAtIDIgKiAocVsxXSAqIHFbMV0gKyBxWzJdICogcVsyXSk7XHJcbiAgICAgICAgY29uc3QgYTEyID0gMiAqIChxWzBdICogcVsxXSAtIHFbMl0gKiBxWzNdKTtcclxuICAgICAgICBjb25zdCBhMTMgPSAyICogKHFbMF0gKiBxWzJdICsgcVsxXSAqIHFbM10pO1xyXG4gICAgICAgIGNvbnN0IGEyMSA9IDIgKiAocVswXSAqIHFbMV0gKyBxWzJdICogcVszXSk7XHJcbiAgICAgICAgY29uc3QgYTIyID0gMSAtIDIgKiAocVswXSAqIHFbMF0gKyBxWzJdICogcVsyXSk7XHJcbiAgICAgICAgY29uc3QgYTIzID0gMiAqIChxWzFdICogcVsyXSAtIHFbMF0gKiBxWzNdKTtcclxuICAgICAgICBjb25zdCBhMzEgPSAyICogKHFbMF0gKiBxWzJdIC0gcVsxXSAqIHFbM10pO1xyXG4gICAgICAgIGNvbnN0IGEzMiA9IDIgKiAocVsxXSAqIHFbMl0gKyBxWzBdICogcVszXSk7XHJcbiAgICAgICAgY29uc3QgYTMzID0gMSAtIDIgKiAocVswXSAqIHFbMF0gKyBxWzFdICogcVsxXSk7XHJcbiAgICAgICAgcmV0dXJuIFthMTEsIGExMiwgYTEzLCAwLCBhMjEsIGEyMiwgYTIzLCAwLCBhMzEsIGEzMiwgYTMzLCAwLCAwLCAwLCAwLCAxXTtcclxuICAgIH0sXHJcbiAgICAvKlxyXG4gICAgcm90YXRpb24oeCwgeSwgeikge1xyXG4gICAgICByZXR1cm4gdGhpcy54Um90YXRlKHRoaXMueVJvdGF0ZSh0aGlzLnpSb3RhdGlvbih6KSwgeSksIHgpO1xyXG4gICAgfSxcclxuICAgIHJvdGF0aW9uRnJvbU5vcm1hbChuKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnJvdGF0aW9uKE1hdGguYWNvcyhuWzFdKSwgTWF0aC5hY29zKG5bMl0pLCBNYXRoLmFjb3MoblswXSkpO1xyXG4gICAgfSwqL1xyXG4gICAgZGV0ZXJtaW5hdGUobSkge1xyXG4gICAgICAgIGNvbnN0IG0wMCA9IG1bMCAqIDQgKyAwXTtcclxuICAgICAgICBjb25zdCBtMDEgPSBtWzAgKiA0ICsgMV07XHJcbiAgICAgICAgY29uc3QgbTAyID0gbVswICogNCArIDJdO1xyXG4gICAgICAgIGNvbnN0IG0wMyA9IG1bMCAqIDQgKyAzXTtcclxuICAgICAgICBjb25zdCBtMTAgPSBtWzEgKiA0ICsgMF07XHJcbiAgICAgICAgY29uc3QgbTExID0gbVsxICogNCArIDFdO1xyXG4gICAgICAgIGNvbnN0IG0xMiA9IG1bMSAqIDQgKyAyXTtcclxuICAgICAgICBjb25zdCBtMTMgPSBtWzEgKiA0ICsgM107XHJcbiAgICAgICAgY29uc3QgbTIwID0gbVsyICogNCArIDBdO1xyXG4gICAgICAgIGNvbnN0IG0yMSA9IG1bMiAqIDQgKyAxXTtcclxuICAgICAgICBjb25zdCBtMjIgPSBtWzIgKiA0ICsgMl07XHJcbiAgICAgICAgY29uc3QgbTIzID0gbVsyICogNCArIDNdO1xyXG4gICAgICAgIGNvbnN0IG0zMCA9IG1bMyAqIDQgKyAwXTtcclxuICAgICAgICBjb25zdCBtMzEgPSBtWzMgKiA0ICsgMV07XHJcbiAgICAgICAgY29uc3QgbTMyID0gbVszICogNCArIDJdO1xyXG4gICAgICAgIGNvbnN0IG0zMyA9IG1bMyAqIDQgKyAzXTtcclxuICAgICAgICBjb25zdCB0bXBfMCA9IG0yMiAqIG0zMztcclxuICAgICAgICBjb25zdCB0bXBfMSA9IG0zMiAqIG0yMztcclxuICAgICAgICBjb25zdCB0bXBfMiA9IG0xMiAqIG0zMztcclxuICAgICAgICBjb25zdCB0bXBfMyA9IG0zMiAqIG0xMztcclxuICAgICAgICBjb25zdCB0bXBfNCA9IG0xMiAqIG0yMztcclxuICAgICAgICBjb25zdCB0bXBfNSA9IG0yMiAqIG0xMztcclxuICAgICAgICBjb25zdCB0bXBfNiA9IG0wMiAqIG0zMztcclxuICAgICAgICBjb25zdCB0bXBfNyA9IG0zMiAqIG0wMztcclxuICAgICAgICBjb25zdCB0bXBfOCA9IG0wMiAqIG0yMztcclxuICAgICAgICBjb25zdCB0bXBfOSA9IG0yMiAqIG0wMztcclxuICAgICAgICBjb25zdCB0bXBfMTAgPSBtMDIgKiBtMTM7XHJcbiAgICAgICAgY29uc3QgdG1wXzExID0gbTEyICogbTAzO1xyXG4gICAgICAgIGNvbnN0IHQwID0gdG1wXzAgKiBtMTEgK1xyXG4gICAgICAgICAgICB0bXBfMyAqIG0yMSArXHJcbiAgICAgICAgICAgIHRtcF80ICogbTMxIC1cclxuICAgICAgICAgICAgKHRtcF8xICogbTExICsgdG1wXzIgKiBtMjEgKyB0bXBfNSAqIG0zMSk7XHJcbiAgICAgICAgY29uc3QgdDEgPSB0bXBfMSAqIG0wMSArXHJcbiAgICAgICAgICAgIHRtcF82ICogbTIxICtcclxuICAgICAgICAgICAgdG1wXzkgKiBtMzEgLVxyXG4gICAgICAgICAgICAodG1wXzAgKiBtMDEgKyB0bXBfNyAqIG0yMSArIHRtcF84ICogbTMxKTtcclxuICAgICAgICBjb25zdCB0MiA9IHRtcF8yICogbTAxICtcclxuICAgICAgICAgICAgdG1wXzcgKiBtMTEgK1xyXG4gICAgICAgICAgICB0bXBfMTAgKiBtMzEgLVxyXG4gICAgICAgICAgICAodG1wXzMgKiBtMDEgKyB0bXBfNiAqIG0xMSArIHRtcF8xMSAqIG0zMSk7XHJcbiAgICAgICAgY29uc3QgdDMgPSB0bXBfNSAqIG0wMSArXHJcbiAgICAgICAgICAgIHRtcF84ICogbTExICtcclxuICAgICAgICAgICAgdG1wXzExICogbTIxIC1cclxuICAgICAgICAgICAgKHRtcF80ICogbTAxICsgdG1wXzkgKiBtMTEgKyB0bXBfMTAgKiBtMjEpO1xyXG4gICAgICAgIHJldHVybiAxLjAgLyAobTAwICogdDAgKyBtMTAgKiB0MSArIG0yMCAqIHQyICsgbTMwICogdDMpO1xyXG4gICAgfSxcclxuICAgIGRlY29tcG9zZShtKSB7XHJcbiAgICAgICAgbGV0IHN4ID0gdjMubm9ybShtLnNsaWNlKDAsIDMpKTtcclxuICAgICAgICBjb25zdCBzeSA9IHYzLm5vcm0obS5zbGljZSg0LCA3KSk7XHJcbiAgICAgICAgY29uc3Qgc3ogPSB2My5ub3JtKG0uc2xpY2UoOCwgMTEpKTtcclxuICAgICAgICBjb25zdCBkZXQgPSB0aGlzLmRldGVybWluYXRlKG0pO1xyXG4gICAgICAgIGlmIChkZXQgPCAwKSB7XHJcbiAgICAgICAgICAgIHN4ID0gLXN4O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB0cmFuc2xhdGlvbiA9IG5ldyBBcnJheSgzKTtcclxuICAgICAgICBjb25zdCBzY2FsZSA9IG5ldyBBcnJheSgzKTtcclxuICAgICAgICBjb25zdCBSbWF0cml4ID0gWy4uLm1dO1xyXG4gICAgICAgIHRyYW5zbGF0aW9uWzBdID0gbVsxMl07XHJcbiAgICAgICAgdHJhbnNsYXRpb25bMV0gPSBtWzEzXTtcclxuICAgICAgICB0cmFuc2xhdGlvblsyXSA9IG1bMTRdO1xyXG4gICAgICAgIGNvbnN0IGludlNYID0gMSAvIHN4O1xyXG4gICAgICAgIGNvbnN0IGludlNZID0gMSAvIHN5O1xyXG4gICAgICAgIGNvbnN0IGludlNaID0gMSAvIHN6O1xyXG4gICAgICAgIFJtYXRyaXhbMF0gKj0gaW52U1g7XHJcbiAgICAgICAgUm1hdHJpeFsxXSAqPSBpbnZTWDtcclxuICAgICAgICBSbWF0cml4WzJdICo9IGludlNYO1xyXG4gICAgICAgIFJtYXRyaXhbNF0gKj0gaW52U1k7XHJcbiAgICAgICAgUm1hdHJpeFs1XSAqPSBpbnZTWTtcclxuICAgICAgICBSbWF0cml4WzZdICo9IGludlNZO1xyXG4gICAgICAgIFJtYXRyaXhbOF0gKj0gaW52U1o7XHJcbiAgICAgICAgUm1hdHJpeFs5XSAqPSBpbnZTWjtcclxuICAgICAgICBSbWF0cml4WzEwXSAqPSBpbnZTWjtcclxuICAgICAgICBzY2FsZVswXSA9IHN4O1xyXG4gICAgICAgIHNjYWxlWzFdID0gc3k7XHJcbiAgICAgICAgc2NhbGVbMl0gPSBzejtcclxuICAgICAgICByZXR1cm4geyB0cmFuc2xhdGlvbiwgUm1hdHJpeCwgc2NhbGUgfTtcclxuICAgIH0sXHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IG00O1xyXG4iLCJjb25zdCBkb3QgPSAoYSwgYikgPT4gYVswXSAqIGJbMF0gKyBhWzFdICogYlsxXSArIGFbMl0gKiBiWzJdO1xyXG5jb25zdCBjcm9zcyA9IChhLCBiKSA9PiBbXHJcbiAgICBhWzFdICogYlsyXSAtIGJbMV0gKiBhWzJdLFxyXG4gICAgYVsyXSAqIGJbMF0gLSBiWzJdICogYVswXSxcclxuICAgIGFbMF0gKiBiWzFdIC0gYlswXSAqIGFbMV0sXHJcbl07XHJcbmNvbnN0IHNjYWxlID0gKGEsIHNjYWxhcikgPT4gW2FbMF0gKiBzY2FsYXIsIGFbMV0gKiBzY2FsYXIsIGFbMl0gKiBzY2FsYXJdO1xyXG5jb25zdCBzdW0gPSAoYSwgYikgPT4gW2FbMF0gKyBiWzBdLCBhWzFdICsgYlsxXSwgYVsyXSArIGJbMl1dO1xyXG5jb25zdCBkaWZmID0gKGEsIGIpID0+IFthWzBdIC0gYlswXSwgYVsxXSAtIGJbMV0sIGFbMl0gLSBiWzJdXTtcclxuY29uc3Qgbm9ybSA9IChhKSA9PiBNYXRoLnNxcnQoYVswXSAqIGFbMF0gKyBhWzFdICogYVsxXSArIGFbMl0gKiBhWzJdKTtcclxuY29uc3Qgbm9ybVNxID0gKGEpID0+IGFbMF0gKiBhWzBdICsgYVsxXSAqIGFbMV0gKyBhWzJdICogYVsyXTtcclxuY29uc3Qgbm9ybWFsaXplID0gKGEpID0+IHtcclxuICAgIGNvbnN0IGxlbmd0aCA9IG5vcm0oYSk7XHJcbiAgICBpZiAobGVuZ3RoID09PSAwKVxyXG4gICAgICAgIHJldHVybiBhO1xyXG4gICAgcmV0dXJuIFthWzBdIC8gbGVuZ3RoLCBhWzFdIC8gbGVuZ3RoLCBhWzJdIC8gbGVuZ3RoXTtcclxufTtcclxuY29uc3QgaXNOdWxsID0gKGEpID0+IGFbMF0gKiBhWzBdICsgYVsxXSAqIGFbMV0gKyBhWzJdICogYVsyXSA9PT0gMDtcclxuY29uc3QgaXNFcXVhbCA9IChhLCBiKSA9PiBhWzBdID09IGJbMF0gJiYgYVsxXSA9PSBiWzFdICYmIGFbMl0gPT0gYlsyXTtcclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgc3VtLFxyXG4gICAgZGlmZixcclxuICAgIHNjYWxlLFxyXG4gICAgZG90LFxyXG4gICAgY3Jvc3MsXHJcbiAgICBub3JtLFxyXG4gICAgbm9ybVNxLFxyXG4gICAgbm9ybWFsaXplLFxyXG4gICAgaXNFcXVhbCxcclxuICAgIGlzTnVsbCxcclxufTtcclxuIiwiY29uc3QgZGVmYXVsdFV2cyA9IFtcclxuICAgIC8vIEZyb250XHJcbiAgICAwLjAsIDAuMCwgMC4yNSwgMC4wLCAxLjAgKiAwLjI1LCAxLjAgKiAwLjI1LCAwLjAsIDEuMCAqIDAuMjUsXHJcbiAgICAvLyBCYWNrXHJcbiAgICAwLjAsIDAuMCwgMS4wICogMC4yNSwgMC4wLCAxLjAgKiAwLjI1LCAxLjAgKiAwLjI1LCAwLjAsIDEuMCAqIDAuMjUsXHJcbiAgICAvLyBUb3BcclxuICAgIDAuMCwgMC4wLCAxLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMS4wLFxyXG4gICAgLy8gQm90dG9tXHJcbiAgICAwLjAsIDAuMCwgMS4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDEuMCxcclxuICAgIC8vIFJpZ2h0XHJcbiAgICAwLjAsIDAuMCwgMS4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDEuMCxcclxuICAgIC8vIExlZnRcclxuICAgIDAuMCwgMC4wLCAxLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMS4wLFxyXG5dO1xyXG5leHBvcnQgY29uc3QgZ2V0Qm94VVZzID0gKG51bVRpbGVzWCwgbnVtVGlsZXNZKSA9PiB7XHJcbiAgICBjb25zdCBhcnIgPSBbMC4wLCAwLjAsIDEuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAxLjAsXTtcclxuICAgIGNvbnN0IHRpbGVYID0gMSAvIG51bVRpbGVzWDtcclxuICAgIGNvbnN0IGJvdHRvbSA9IGFyci5tYXAoKF8sIGkpID0+IGkgJSAyID8gYXJyW2ldICogMC4yNSArIDAuMjUgOiBhcnJbaV0gKiB0aWxlWCArIDUgKiB0aWxlWCk7XHJcbiAgICBjb25zdCB0b3AgPSBib3R0b20ubWFwKChfLCBpKSA9PiBpICUgMiA/IGJvdHRvbVtpXSArIDAuMjUgOiBib3R0b21baV0pO1xyXG4gICAgY29uc3Qgc2lkZSA9IGJvdHRvbS5tYXAoKF8sIGkpID0+IGkgJSAyID8gYm90dG9tW2ldICsgMC41IDogYm90dG9tW2ldKTtcclxuICAgIHJldHVybiBuZXcgRmxvYXQzMkFycmF5KFtcclxuICAgICAgICAvLyBGcm9udFxyXG4gICAgICAgIC4uLnNpZGUsXHJcbiAgICAgICAgLy8gQmFja1xyXG4gICAgICAgIC4uLnNpZGUsXHJcbiAgICAgICAgLy8gVG9wXHJcbiAgICAgICAgLi4udG9wLFxyXG4gICAgICAgIC8vIEJvdHRvbVxyXG4gICAgICAgIC4uLmJvdHRvbSxcclxuICAgICAgICAvLyBSaWdodFxyXG4gICAgICAgIC4uLnNpZGUsXHJcbiAgICAgICAgLy8gTGVmdFxyXG4gICAgICAgIC4uLnNpZGUsXHJcbiAgICBdKTtcclxufTtcclxuIiwiY29uc3QgZ2xzbCA9IHggPT4geDtcclxuY29uc3QgdmVydCA9IGdsc2wgYCN2ZXJzaW9uIDMwMCBlc1xyXG4gXHJcbmxheW91dChsb2NhdGlvbiA9IDApIGluIHZlYzQgYV9wb3NpdGlvbjtcclxubGF5b3V0KGxvY2F0aW9uID0gMSkgaW4gdmVjMyBhX25vcm1hbDtcclxubGF5b3V0KGxvY2F0aW9uID0gNCkgaW4gdmVjMiBhX3RleGNvb3JkO1xyXG5cclxudW5pZm9ybSBtYXQ0IHVfbWF0cml4O1xyXG51bmlmb3JtIG1hdDQgdV93b3JsZFZpZXdQcm9qZWN0aW9uO1xyXG51bmlmb3JtIHZlYzMgdV9saWdodFdvcmxkUG9zaXRpb247XHJcbnVuaWZvcm0gdmVjMyB1X3ZpZXdXb3JsZFBvc2l0aW9uO1xyXG5cclxub3V0IHZlYzMgdl9ub3JtYWw7XHJcbm91dCB2ZWMzIHZfc3VyZmFjZVRvTGlnaHQ7XHJcbm91dCB2ZWMzIHZfc3VyZmFjZVRvVmlldztcclxub3V0IHZlYzIgdl90ZXhjb29yZDtcclxuXHJcbnZvaWQgbWFpbigpIHtcclxuICAgIFxyXG4gICAgZ2xfUG9zaXRpb24gPSB1X3dvcmxkVmlld1Byb2plY3Rpb24gKiBhX3Bvc2l0aW9uO1xyXG4gICAgXHJcbiAgICB2ZWMzIHN1cmZhY2VXb3JsZFBvc2l0aW9uID0gKHVfbWF0cml4ICogYV9wb3NpdGlvbikueHl6O1xyXG4gICAgXHJcbiAgICB2X3N1cmZhY2VUb0xpZ2h0ID0gdV9saWdodFdvcmxkUG9zaXRpb24gLSBzdXJmYWNlV29ybGRQb3NpdGlvbjtcclxuXHJcbiAgICB2X25vcm1hbCA9IG1hdDMoICB1X21hdHJpeCApICogYV9ub3JtYWw7XHJcbiAgICBcclxuICAgIHZfc3VyZmFjZVRvVmlldyA9IHVfdmlld1dvcmxkUG9zaXRpb24gLSBzdXJmYWNlV29ybGRQb3NpdGlvbjtcclxuXHJcbiAgICB2X3RleGNvb3JkID0gYV90ZXhjb29yZDtcclxuICAgICAgXHJcbn1gO1xyXG5jb25zdCBmcmFnID0gZ2xzbCBgI3ZlcnNpb24gMzAwIGVzXHJcbnByZWNpc2lvbiBoaWdocCBmbG9hdDtcclxuIFxyXG5cclxuXHJcblxyXG5pbiB2ZWMzIHZfbm9ybWFsO1xyXG5pbiB2ZWMzIHZfc3VyZmFjZVRvVmlldztcclxuaW4gdmVjMyB2X3N1cmZhY2VUb0xpZ2h0O1xyXG5cclxuXHJcbi8vdW5pZm9ybSBzYW1wbGVyMkQgdV90ZXh0dXJlMTtcclxudW5pZm9ybSBmbG9hdCB1X3NoaW5pbmVzcztcclxudW5pZm9ybSB2ZWM0IHVfY29sb3I7XHJcbnVuaWZvcm0gdmVjNCB1X2FtYmllbnRMaWdodDtcclxuXHJcbmluIHZlYzIgdl90ZXhjb29yZDtcclxuXHJcbi8vIFRoZSB0ZXh0dXJlLlxyXG51bmlmb3JtIHNhbXBsZXIyRCB1X3RleHR1cmU7XHJcblxyXG5vdXQgdmVjNCBvdXRDb2xvcjtcclxuXHJcblxyXG52b2lkIG1haW4oKSB7XHJcbiAgXHJcbiAgdmVjMyBzdXJmYWNlVG9MaWdodERpcmVjdGlvbiA9IG5vcm1hbGl6ZSh2X3N1cmZhY2VUb0xpZ2h0KTtcclxuICB2ZWMzIHN1cmZhY2VUb1ZpZXdEaXJlY3Rpb24gPSBub3JtYWxpemUodl9zdXJmYWNlVG9WaWV3KTtcclxuICB2ZWMzIGhhbGZWZWN0b3IgPSBub3JtYWxpemUoc3VyZmFjZVRvTGlnaHREaXJlY3Rpb24gKyBzdXJmYWNlVG9WaWV3RGlyZWN0aW9uKTtcclxuXHJcbiAgdmVjMyBub3JtYWwgPSBub3JtYWxpemUodl9ub3JtYWwpO1xyXG4gIGZsb2F0IGxpZ2h0ID0gZG90KG5vcm1hbCwgc3VyZmFjZVRvTGlnaHREaXJlY3Rpb24pO1xyXG4gIGZsb2F0IHNwZWN1bGFyID0gMC4wO1xyXG4gIGlmIChsaWdodCA+IDAuMCkge1xyXG4gICAgc3BlY3VsYXIgPSBwb3coZG90KG5vcm1hbCwgaGFsZlZlY3RvciksIHVfc2hpbmluZXNzKTtcclxuICB9XHJcbiAgXHJcbiAgb3V0Q29sb3IgPSB0ZXh0dXJlKHVfdGV4dHVyZSwgdl90ZXhjb29yZCk7XHJcbiAgb3V0Q29sb3IucmdiICo9IGxpZ2h0O1xyXG4gIG91dENvbG9yLnJnYiArPSBzcGVjdWxhcjtcclxuXHJcbiAgb3V0Q29sb3IucmdiICs9IHVfYW1iaWVudExpZ2h0LnJnYiAqMC4zO1xyXG4gIFxyXG59YDtcclxuZXhwb3J0IGRlZmF1bHQgeyB2ZXJ0LCBmcmFnIH07XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFBQkIge1xyXG4gICAgY29uc3RydWN0b3IobWluLCBtYXgpIHtcclxuICAgICAgICB0aGlzLm1pbiA9IG1pbjtcclxuICAgICAgICB0aGlzLm1heCA9IG1heDtcclxuICAgIH1cclxuICAgIGlzQ29sbGlkZShhYWJiKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubWluWzBdIDw9IGFhYmIubWF4WzBdICYmXHJcbiAgICAgICAgICAgIHRoaXMubWF4WzBdID49IGFhYmIubWluWzBdICYmXHJcbiAgICAgICAgICAgIHRoaXMubWluWzFdIDw9IGFhYmIubWF4WzFdICYmXHJcbiAgICAgICAgICAgIHRoaXMubWF4WzFdID49IGFhYmIubWluWzFdICYmXHJcbiAgICAgICAgICAgIHRoaXMubWluWzJdIDw9IGFhYmIubWF4WzJdICYmXHJcbiAgICAgICAgICAgIHRoaXMubWF4WzJdID49IGFhYmIubWluWzJdKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBjb250YWluKHBvaW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMubWluWzBdIDw9IHBvaW50WzBdICYmXHJcbiAgICAgICAgICAgIHRoaXMubWF4WzBdID49IHBvaW50WzBdICYmXHJcbiAgICAgICAgICAgIHRoaXMubWluWzFdIDw9IHBvaW50WzFdICYmXHJcbiAgICAgICAgICAgIHRoaXMubWF4WzFdID49IHBvaW50WzFdICYmXHJcbiAgICAgICAgICAgIHRoaXMubWluWzJdIDw9IHBvaW50WzJdICYmXHJcbiAgICAgICAgICAgIHRoaXMubWF4WzJdID49IHBvaW50WzJdKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBnZXRTaXplKCkge1xyXG4gICAgICAgIGNvbnN0IGFyZWEgPSBNYXRoLmFicyh0aGlzLm1heFswXSAtIHRoaXMubWluWzBdKSAqXHJcbiAgICAgICAgICAgIE1hdGguYWJzKHRoaXMubWF4WzFdIC0gdGhpcy5taW5bMV0pICpcclxuICAgICAgICAgICAgTWF0aC5hYnModGhpcy5tYXhbMl0gLSB0aGlzLm1pblsyXSk7XHJcbiAgICAgICAgcmV0dXJuIGFyZWE7XHJcbiAgICB9XHJcbiAgICBtZXJnZShhYWJiKSB7XHJcbiAgICAgICAgY29uc3QgeDEgPSB0aGlzLm1pblswXSA8IGFhYmIubWluWzBdID8gdGhpcy5taW5bMF0gOiBhYWJiLm1pblswXTtcclxuICAgICAgICBjb25zdCB4MiA9IHRoaXMubWF4WzBdID4gYWFiYi5tYXhbMF0gPyB0aGlzLm1heFswXSA6IGFhYmIubWF4WzBdO1xyXG4gICAgICAgIGNvbnN0IHkxID0gdGhpcy5taW5bMV0gPCBhYWJiLm1pblsxXSA/IHRoaXMubWluWzFdIDogYWFiYi5taW5bMV07XHJcbiAgICAgICAgY29uc3QgeTIgPSB0aGlzLm1heFsxXSA+IGFhYmIubWF4WzFdID8gdGhpcy5tYXhbMV0gOiBhYWJiLm1heFsxXTtcclxuICAgICAgICBjb25zdCB6MSA9IHRoaXMubWluWzJdIDwgYWFiYi5taW5bMl0gPyB0aGlzLm1pblsyXSA6IGFhYmIubWluWzJdO1xyXG4gICAgICAgIGNvbnN0IHoyID0gdGhpcy5tYXhbMl0gPiBhYWJiLm1heFsyXSA/IHRoaXMubWF4WzJdIDogYWFiYi5tYXhbMl07XHJcbiAgICAgICAgcmV0dXJuIG5ldyBBQUJCKFt4MSwgeTEsIHoxXSwgW3gyLCB5MiwgejJdKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyB2MywgbTMsIG00IH0gZnJvbSBcInJvbWFucHBwbWF0aFwiO1xyXG5pbXBvcnQgQUFCQiBmcm9tIFwiLi9BQUJCXCI7XHJcbmNvbnN0IHhBeGlzID0gWzEsIDAsIDBdO1xyXG5jb25zdCB5QXhpcyA9IFswLCAxLCAwXTtcclxuY29uc3QgekF4aXMgPSBbMCwgMCwgMV07XHJcbmNvbnN0IHhBeGlzTmVnYXRpdmUgPSB2My5zY2FsZSh4QXhpcywgLTEpO1xyXG5jb25zdCB5QXhpc05lZ2F0aXZlID0gdjMuc2NhbGUoeUF4aXMsIC0xKTtcclxuY29uc3QgekF4aXNOZWdhdGl2ZSA9IHYzLnNjYWxlKHpBeGlzLCAtMSk7XHJcbnZhciBjb2xsaWRlclR5cGVzO1xyXG4oZnVuY3Rpb24gKGNvbGxpZGVyVHlwZXMpIHtcclxuICAgIGNvbGxpZGVyVHlwZXNbY29sbGlkZXJUeXBlc1tcIlBvaW50XCJdID0gMF0gPSBcIlBvaW50XCI7XHJcbiAgICBjb2xsaWRlclR5cGVzW2NvbGxpZGVyVHlwZXNbXCJCb3hcIl0gPSAxXSA9IFwiQm94XCI7XHJcbiAgICBjb2xsaWRlclR5cGVzW2NvbGxpZGVyVHlwZXNbXCJTcGhlcmVcIl0gPSAyXSA9IFwiU3BoZXJlXCI7XHJcbiAgICBjb2xsaWRlclR5cGVzW2NvbGxpZGVyVHlwZXNbXCJDeWxpbmRlclwiXSA9IDNdID0gXCJDeWxpbmRlclwiO1xyXG4gICAgY29sbGlkZXJUeXBlc1tjb2xsaWRlclR5cGVzW1wiVHJpYW5nbGVcIl0gPSA0XSA9IFwiVHJpYW5nbGVcIjtcclxufSkoY29sbGlkZXJUeXBlcyB8fCAoY29sbGlkZXJUeXBlcyA9IHt9KSk7XHJcbmNsYXNzIENvbGxpZGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuUm1hdHJpeCA9IG0zLmlkZW50aXR5KCk7XHJcbiAgICAgICAgdGhpcy5SbWF0cml4SW52ZXJzZSA9IG0zLmlkZW50aXR5KCk7XHJcbiAgICAgICAgdGhpcy5wb3MgPSBbMCwgMCwgMF07XHJcbiAgICAgICAgdGhpcy50eXBlID0gY29sbGlkZXJUeXBlcy5Qb2ludDtcclxuICAgICAgICB0aGlzLmlkID0gQ29sbGlkZXIubGFzdElkKys7XHJcbiAgICB9XHJcbiAgICBnZXRUeXBlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnR5cGU7XHJcbiAgICB9XHJcbiAgICBnZXRSbWF0cml4KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlJtYXRyaXg7XHJcbiAgICB9XHJcbiAgICBzZXRSbWF0cml4KG1hdHJpeCkge1xyXG4gICAgICAgIHRoaXMuUm1hdHJpeCA9IFsuLi5tYXRyaXhdO1xyXG4gICAgICAgIHRoaXMuUm1hdHJpeEludmVyc2UgPSBtMy50cmFuc3Bvc2UobWF0cml4KTtcclxuICAgIH1cclxuICAgIGdldFJtYXRyaXhJbnZlcnNlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlJtYXRyaXhJbnZlcnNlO1xyXG4gICAgfVxyXG4gICAgZ2V0SWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQ7XHJcbiAgICB9XHJcbiAgICBzZXRJZChpZCkge1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIH1cclxuICAgIHRyYW5zbGF0ZSh2KSB7XHJcbiAgICAgICAgdGhpcy5wb3MgPSB2My5zdW0odGhpcy5wb3MsIHYpO1xyXG4gICAgfVxyXG4gICAgc2V0VHJhbnNsYXRpb24odHJhbnNsYXRpb24pIHtcclxuICAgICAgICB0aGlzLnBvcyA9IFsuLi50cmFuc2xhdGlvbl07XHJcbiAgICB9XHJcbiAgICBnZXRUcmFuc2xhdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wb3M7XHJcbiAgICB9XHJcbiAgICByb3RhdGUocikge1xyXG4gICAgICAgIHRoaXMuUm1hdHJpeCA9IG0zLnhSb3RhdGUodGhpcy5SbWF0cml4LCByWzBdKTtcclxuICAgICAgICB0aGlzLlJtYXRyaXggPSBtMy55Um90YXRlKHRoaXMuUm1hdHJpeCwgclsxXSk7XHJcbiAgICAgICAgdGhpcy5SbWF0cml4ID0gbTMuelJvdGF0ZSh0aGlzLlJtYXRyaXgsIHJbMl0pO1xyXG4gICAgICAgIHRoaXMuUm1hdHJpeEludmVyc2UgPSBtMy50cmFuc3Bvc2UodGhpcy5SbWF0cml4KTtcclxuICAgIH1cclxuICAgIHNldFJvdGF0aW9uKHIpIHtcclxuICAgICAgICB0aGlzLlJtYXRyaXggPSBtMy54Um90YXRpb24oclswXSk7XHJcbiAgICAgICAgdGhpcy5SbWF0cml4ID0gbTMueVJvdGF0ZSh0aGlzLlJtYXRyaXgsIHJbMV0pO1xyXG4gICAgICAgIHRoaXMuUm1hdHJpeCA9IG0zLnpSb3RhdGUodGhpcy5SbWF0cml4LCByWzJdKTtcclxuICAgICAgICB0aGlzLlJtYXRyaXhJbnZlcnNlID0gbTMudHJhbnNwb3NlKHRoaXMuUm1hdHJpeCk7XHJcbiAgICB9XHJcbiAgICBnZXRBQUJCKCkge1xyXG4gICAgICAgIGNvbnN0IG1heFggPSB0aGlzLnN1cHBvcnQoeEF4aXMpWzBdO1xyXG4gICAgICAgIGNvbnN0IG1heFkgPSB0aGlzLnN1cHBvcnQoeUF4aXMpWzFdO1xyXG4gICAgICAgIGNvbnN0IG1heFogPSB0aGlzLnN1cHBvcnQoekF4aXMpWzJdO1xyXG4gICAgICAgIGNvbnN0IG1pblggPSB0aGlzLnN1cHBvcnQoeEF4aXNOZWdhdGl2ZSlbMF07XHJcbiAgICAgICAgY29uc3QgbWluWSA9IHRoaXMuc3VwcG9ydCh5QXhpc05lZ2F0aXZlKVsxXTtcclxuICAgICAgICBjb25zdCBtaW5aID0gdGhpcy5zdXBwb3J0KHpBeGlzTmVnYXRpdmUpWzJdO1xyXG4gICAgICAgIHJldHVybiBuZXcgQUFCQihbbWluWCwgbWluWSwgbWluWl0sIFttYXhYLCBtYXhZLCBtYXhaXSk7XHJcbiAgICB9XHJcbiAgICBnZXRNNCgpIHtcclxuICAgICAgICBjb25zdCBtID0gbTQubTNUb200KHRoaXMuUm1hdHJpeCk7XHJcbiAgICAgICAgbVsxMl0gPSB0aGlzLnBvc1swXTtcclxuICAgICAgICBtWzEzXSA9IHRoaXMucG9zWzFdO1xyXG4gICAgICAgIG1bMTRdID0gdGhpcy5wb3NbMl07XHJcbiAgICAgICAgbVsxNV0gPSAxO1xyXG4gICAgICAgIHJldHVybiBtO1xyXG4gICAgfVxyXG4gICAgbG9jYWxUb0dsb2JhbCh2KSB7XHJcbiAgICAgICAgbGV0IGdsb2JhbCA9IG0zLnRyYW5zZm9ybVBvaW50KHRoaXMuUm1hdHJpeCwgdik7XHJcbiAgICAgICAgcmV0dXJuIHYzLnN1bSh0aGlzLnBvcywgZ2xvYmFsKTtcclxuICAgIH1cclxuICAgIGdldENsb3Nlc3RGYWNlQnlOb3JtYWwobm9ybWFsKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmVydGljZXM6IFt0aGlzLnBvc10sXHJcbiAgICAgICAgICAgIG5vcm1hbDogdjMuc2NhbGUobm9ybWFsLCAtMSksXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGdldEludmVyc2VJbmVydGlhVGVuc29yKG1hc3MpIHtcclxuICAgICAgICByZXR1cm4gbTMuaWRlbnRpdHkoKTtcclxuICAgIH1cclxuICAgIHN1cHBvcnQoZGlyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zO1xyXG4gICAgfVxyXG59XHJcbkNvbGxpZGVyLmxhc3RJZCA9IDE7XHJcbmNsYXNzIEJveCBleHRlbmRzIENvbGxpZGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKGEgPSAxLCBiID0gMSwgYyA9IDEpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IGNvbGxpZGVyVHlwZXMuQm94O1xyXG4gICAgICAgIHRoaXMuc2NhbGUgPSBbYSwgYiwgY107XHJcbiAgICAgICAgdGhpcy5taW4gPSBbLWEgLyAyLCAtYiAvIDIsIC1jIC8gMl07XHJcbiAgICAgICAgdGhpcy5tYXggPSBbYSAvIDIsIGIgLyAyLCBjIC8gMl07XHJcbiAgICB9XHJcbiAgICBnZXRBQUJCKCkge1xyXG4gICAgICAgIGNvbnN0IG1heFggPSB0aGlzLnN1cHBvcnQoeEF4aXMpWzBdO1xyXG4gICAgICAgIGNvbnN0IG1heFkgPSB0aGlzLnN1cHBvcnQoeUF4aXMpWzFdO1xyXG4gICAgICAgIGNvbnN0IG1heFogPSB0aGlzLnN1cHBvcnQoekF4aXMpWzJdO1xyXG4gICAgICAgIGNvbnN0IG1pblggPSB0aGlzLnN1cHBvcnQoeEF4aXNOZWdhdGl2ZSlbMF07XHJcbiAgICAgICAgY29uc3QgbWluWSA9IHRoaXMuc3VwcG9ydCh5QXhpc05lZ2F0aXZlKVsxXTtcclxuICAgICAgICBjb25zdCBtaW5aID0gdGhpcy5zdXBwb3J0KHpBeGlzTmVnYXRpdmUpWzJdO1xyXG4gICAgICAgIHJldHVybiBuZXcgQUFCQihbbWluWCwgbWluWSwgbWluWl0sIFttYXhYLCBtYXhZLCBtYXhaXSk7XHJcbiAgICB9XHJcbiAgICBzdXBwb3J0KGRpcikge1xyXG4gICAgICAgIGNvbnN0IF9kaXIgPSBtMy50cmFuc2Zvcm1Qb2ludCh0aGlzLlJtYXRyaXhJbnZlcnNlLCBkaXIpO1xyXG4gICAgICAgIGNvbnN0IHJlcyA9IFswLCAwLCAwXTtcclxuICAgICAgICByZXNbMF0gPSBfZGlyWzBdID4gMCA/IHRoaXMubWF4WzBdIDogdGhpcy5taW5bMF07XHJcbiAgICAgICAgcmVzWzFdID0gX2RpclsxXSA+IDAgPyB0aGlzLm1heFsxXSA6IHRoaXMubWluWzFdO1xyXG4gICAgICAgIHJlc1syXSA9IF9kaXJbMl0gPiAwID8gdGhpcy5tYXhbMl0gOiB0aGlzLm1pblsyXTtcclxuICAgICAgICBjb25zdCBzdXAgPSBtMy50cmFuc2Zvcm1Qb2ludCh0aGlzLlJtYXRyaXgsIHJlcyk7XHJcbiAgICAgICAgcmV0dXJuIHYzLnN1bShzdXAsIHRoaXMucG9zKTtcclxuICAgIH1cclxuICAgIGdldEludmVyc2VJbmVydGlhVGVuc29yKG1hc3MpIHtcclxuICAgICAgICBjb25zdCBpMSA9IChtYXNzIC8gMTIpICogKHRoaXMubWF4WzFdICogdGhpcy5tYXhbMV0gKyB0aGlzLm1heFsyXSAqIHRoaXMubWF4WzJdKTtcclxuICAgICAgICBjb25zdCBpMiA9IChtYXNzIC8gMTIpICogKHRoaXMubWF4WzBdICogdGhpcy5tYXhbMF0gKyB0aGlzLm1heFsyXSAqIHRoaXMubWF4WzJdKTtcclxuICAgICAgICBjb25zdCBpMyA9IChtYXNzIC8gMTIpICogKHRoaXMubWF4WzBdICogdGhpcy5tYXhbMF0gKyB0aGlzLm1heFsxXSAqIHRoaXMubWF4WzFdKTtcclxuICAgICAgICBjb25zdCBtID0gbTMubXVsdGlwbHkobTMubXVsdGlwbHkodGhpcy5SbWF0cml4SW52ZXJzZSwgW1xyXG4gICAgICAgICAgICAxIC8gaTEsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDEgLyBpMixcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMSAvIGkzLFxyXG4gICAgICAgIF0pLCB0aGlzLlJtYXRyaXgpO1xyXG4gICAgICAgIHJldHVybiBtO1xyXG4gICAgfVxyXG4gICAgZ2V0TTQoKSB7XHJcbiAgICAgICAgY29uc3QgbSA9IG00Lm0zVG9tNCh0aGlzLlJtYXRyaXgpO1xyXG4gICAgICAgIG1bMTJdID0gdGhpcy5wb3NbMF07XHJcbiAgICAgICAgbVsxM10gPSB0aGlzLnBvc1sxXTtcclxuICAgICAgICBtWzE0XSA9IHRoaXMucG9zWzJdO1xyXG4gICAgICAgIG1bMTVdID0gMTtcclxuICAgICAgICBjb25zdCBzY2FsZSA9IHYzLmRpZmYodGhpcy5tYXgsIHRoaXMubWluKTtcclxuICAgICAgICByZXR1cm4gbTQuc2NhbGUobSwgLi4uc2NhbGUpO1xyXG4gICAgfVxyXG4gICAgZ2V0Q2xvc2VzdEZhY2VCeU5vcm1hbChub3JtYWwpIHtcclxuICAgICAgICBjb25zdCB7IFJtYXRyaXggfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgZ2xvYmFsTm9ybWFscyA9IEJveC5ub3JtYWxzLm1hcCgobikgPT4gbTMudHJhbnNmb3JtUG9pbnQoUm1hdHJpeCwgbikpO1xyXG4gICAgICAgIGxldCBtaW5Eb3QgPSB2My5kb3Qobm9ybWFsLCBnbG9iYWxOb3JtYWxzWzBdKTtcclxuICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxLCBuID0gZ2xvYmFsTm9ybWFscy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgLy9jb25zdCBfbm9ybWFsID0gbTMudHJhbnNmb3JtUG9pbnQoUm1hdHJpeCwgbm9ybWFsc1tpXSlcclxuICAgICAgICAgICAgY29uc3QgX2RvdCA9IHYzLmRvdChnbG9iYWxOb3JtYWxzW2ldLCBub3JtYWwpO1xyXG4gICAgICAgICAgICBpZiAoX2RvdCA8IG1pbkRvdCkge1xyXG4gICAgICAgICAgICAgICAgbWluRG90ID0gX2RvdDtcclxuICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBmYWNlSW5kaWNlcyA9IEJveC5pbmRpY2VzW2luZGV4XTtcclxuICAgICAgICBjb25zdCBtID0gdGhpcy5nZXRNNCgpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHZlcnRpY2VzOiBmYWNlSW5kaWNlcy5tYXAoKGkpID0+IG00LnRyYW5zZm9ybVBvaW50KG0sIEJveC5wb2ludHNbaV0pKSxcclxuICAgICAgICAgICAgbm9ybWFsOiBnbG9iYWxOb3JtYWxzW2luZGV4XSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbi8qXHJcblxyXG5cclxuICAgICAgXHJcbiAgICAgIDQtLS0tLS0tNVxyXG4gICAgIC8gICAgICAgL1xyXG4gICAgLyAgICAgICAvXHJcbiAgIDctLS0tLS0tNlxyXG4gICB8ICAwLS0tLS0tLTFcclxuICAgfCAvICAgICAgIC9cclxuICAgfC8gICAgICAgL1xyXG4gICAzLS0tLS0tLTJcclxuKi9cclxuQm94LnBvaW50cyA9IFtcclxuICAgIFstMSAvIDIsIC0xIC8gMiwgLTEgLyAyXSxcclxuICAgIFsxIC8gMiwgLTEgLyAyLCAtMSAvIDJdLFxyXG4gICAgWzEgLyAyLCAtMSAvIDIsIDEgLyAyXSxcclxuICAgIFstMSAvIDIsIC0xIC8gMiwgMSAvIDJdLFxyXG4gICAgWy0xIC8gMiwgMSAvIDIsIC0xIC8gMl0sXHJcbiAgICBbMSAvIDIsIDEgLyAyLCAtMSAvIDJdLFxyXG4gICAgWzEgLyAyLCAxIC8gMiwgMSAvIDJdLFxyXG4gICAgWy0xIC8gMiwgMSAvIDIsIDEgLyAyXSwgLy83XHJcbl07XHJcbkJveC5pbmRpY2VzID0gW1xyXG4gICAgWzAsIDQsIDUsIDFdLFxyXG4gICAgWzMsIDcsIDYsIDJdLFxyXG4gICAgWzAsIDEsIDIsIDNdLFxyXG4gICAgWzQsIDUsIDYsIDddLFxyXG4gICAgWzAsIDMsIDcsIDRdLFxyXG4gICAgWzEsIDIsIDYsIDVdLCAvLyAreFxyXG5dO1xyXG5Cb3gubm9ybWFscyA9IFtcclxuICAgIFswLCAwLCAtMV0sXHJcbiAgICBbMCwgMCwgMV0sXHJcbiAgICBbMCwgLTEsIDBdLFxyXG4gICAgWzAsIDEsIDBdLFxyXG4gICAgWy0xLCAwLCAwXSxcclxuICAgIFsxLCAwLCAwXSxcclxuXTtcclxuY2xhc3MgU3BoZXJlIGV4dGVuZHMgQ29sbGlkZXIge1xyXG4gICAgY29uc3RydWN0b3IocmFkaXVzID0gMSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XHJcbiAgICAgICAgdGhpcy50eXBlID0gY29sbGlkZXJUeXBlcy5TcGhlcmU7XHJcbiAgICB9XHJcbiAgICBnZXRBQUJCKCkge1xyXG4gICAgICAgIGNvbnN0IHsgcmFkaXVzIH0gPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBuZXcgQUFCQih2My5zdW0odGhpcy5wb3MsIFstcmFkaXVzLCAtcmFkaXVzLCAtcmFkaXVzXSksIHYzLnN1bSh0aGlzLnBvcywgW3JhZGl1cywgcmFkaXVzLCByYWRpdXNdKSk7XHJcbiAgICB9XHJcbiAgICBzdXBwb3J0KGRpcikge1xyXG4gICAgICAgIHJldHVybiB2My5zdW0odjMuc2NhbGUodjMubm9ybWFsaXplKGRpciksIHRoaXMucmFkaXVzKSwgdGhpcy5wb3MpO1xyXG4gICAgfVxyXG4gICAgZ2V0TTQoKSB7XHJcbiAgICAgICAgY29uc3QgbSA9IG00Lm0zVG9tNCh0aGlzLlJtYXRyaXgpO1xyXG4gICAgICAgIG1bMTJdID0gdGhpcy5wb3NbMF07XHJcbiAgICAgICAgbVsxM10gPSB0aGlzLnBvc1sxXTtcclxuICAgICAgICBtWzE0XSA9IHRoaXMucG9zWzJdO1xyXG4gICAgICAgIG1bMTVdID0gMTtcclxuICAgICAgICBjb25zdCB7IHJhZGl1cyB9ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gbTQuc2NhbGUobSwgcmFkaXVzLCByYWRpdXMsIHJhZGl1cyk7XHJcbiAgICB9XHJcbiAgICBnZXRDbG9zZXN0RmFjZUJ5Tm9ybWFsKG5vcm1hbCkge1xyXG4gICAgICAgIGNvbnN0IHJldmVyc2UgPSB2My5zY2FsZShub3JtYWwsIC0xKTtcclxuICAgICAgICByZXR1cm4geyB2ZXJ0aWNlczogW3YzLnNjYWxlKHJldmVyc2UsIHRoaXMucmFkaXVzKV0sIG5vcm1hbDogcmV2ZXJzZSB9O1xyXG4gICAgfVxyXG4gICAgZ2V0SW52ZXJzZUluZXJ0aWFUZW5zb3IobWFzcykge1xyXG4gICAgICAgIGNvbnN0IHsgcmFkaXVzIH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IG0gPSBbXHJcbiAgICAgICAgICAgICgyICogbWFzcyAqIHJhZGl1cyAqIHJhZGl1cykgLyA1LFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAoMiAqIG1hc3MgKiByYWRpdXMgKiByYWRpdXMpIC8gNSxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgKDIgKiBtYXNzICogcmFkaXVzICogcmFkaXVzKSAvIDUsXHJcbiAgICAgICAgXTtcclxuICAgICAgICByZXR1cm4gbTtcclxuICAgIH1cclxufVxyXG5jbGFzcyBDeWxpbmRlciBleHRlbmRzIENvbGxpZGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHJhZGl1cywgaGVpZ2h0LCBudW1TZWdtZW50cyA9IDYpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IGNvbGxpZGVyVHlwZXMuQ3lsaW5kZXI7XHJcbiAgICAgICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgY29uc3Qgc2VnbWVudEFuZ2xlID0gKDIgKiBNYXRoLlBJKSAvIG51bVNlZ21lbnRzO1xyXG4gICAgICAgIHRoaXMuY2lyY2xlUG9pbnRzID0gWy4uLm5ldyBBcnJheShudW1TZWdtZW50cyldLm1hcCgoXywgaSkgPT4gW1xyXG4gICAgICAgICAgICBNYXRoLmNvcyhpICogc2VnbWVudEFuZ2xlKSxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgTWF0aC5zaW4oaSAqIHNlZ21lbnRBbmdsZSksXHJcbiAgICAgICAgXSk7XHJcbiAgICB9XHJcbiAgICBzdXBwb3J0KGRpcikge1xyXG4gICAgICAgIGNvbnN0IF9kaXIgPSBtMy50cmFuc2Zvcm1Qb2ludCh0aGlzLlJtYXRyaXhJbnZlcnNlLCBkaXIpO1xyXG4gICAgICAgIGNvbnN0IGRpcl94eiA9IFtfZGlyWzBdLCAwLCBfZGlyWzJdXTtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSB2My5zY2FsZSh2My5ub3JtYWxpemUoZGlyX3h6KSwgdGhpcy5yYWRpdXMpO1xyXG4gICAgICAgIHJlc3VsdFsxXSA9IF9kaXJbMV0gPiAwID8gdGhpcy5oZWlnaHQgLyAyIDogLXRoaXMuaGVpZ2h0IC8gMjtcclxuICAgICAgICByZXR1cm4gdjMuc3VtKG0zLnRyYW5zZm9ybVBvaW50KHRoaXMuUm1hdHJpeCwgcmVzdWx0KSwgdGhpcy5wb3MpO1xyXG4gICAgfVxyXG4gICAgZ2V0TTQoKSB7XHJcbiAgICAgICAgY29uc3QgbSA9IG00Lm0zVG9tNCh0aGlzLlJtYXRyaXgpO1xyXG4gICAgICAgIG1bMTJdID0gdGhpcy5wb3NbMF07XHJcbiAgICAgICAgbVsxM10gPSB0aGlzLnBvc1sxXTtcclxuICAgICAgICBtWzE0XSA9IHRoaXMucG9zWzJdO1xyXG4gICAgICAgIG1bMTVdID0gMTtcclxuICAgICAgICBjb25zdCB7IHJhZGl1cywgaGVpZ2h0IH0gPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBtNC5zY2FsZShtLCByYWRpdXMsIGhlaWdodCwgcmFkaXVzKTtcclxuICAgIH1cclxuICAgIGdldENsb3Nlc3RGYWNlQnlOb3JtYWwobm9ybWFsKSB7XHJcbiAgICAgICAgY29uc3QgeyBSbWF0cml4LCBSbWF0cml4SW52ZXJzZSB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCBfbm9ybWFsID0gbTMudHJhbnNmb3JtUG9pbnQoUm1hdHJpeEludmVyc2UsIHYzLnNjYWxlKG5vcm1hbCwgLTEpKTtcclxuICAgICAgICBjb25zdCBtID0gdGhpcy5nZXRNNCgpO1xyXG4gICAgICAgIGNvbnN0IGNvcyA9IHYzLmRvdChfbm9ybWFsLCBbMCwgMSwgMF0pO1xyXG4gICAgICAgIGNvbnN0IHNpZ24gPSBNYXRoLnNpZ24oY29zKTtcclxuICAgICAgICBpZiAoY29zICogc2lnbiA8IDAuNzA3KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxvY2FsTm9ybWFsID0gdjMubm9ybWFsaXplKFtfbm9ybWFsWzBdLCAwLCBfbm9ybWFsWzJdXSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHZlcnRpY2VzID0gW1xyXG4gICAgICAgICAgICAgICAgbTQudHJhbnNmb3JtUG9pbnQobSwgW19ub3JtYWxbMF0sIDAuNSwgX25vcm1hbFsyXV0pLFxyXG4gICAgICAgICAgICAgICAgbTQudHJhbnNmb3JtUG9pbnQobSwgW19ub3JtYWxbMF0sIC0wLjUsIF9ub3JtYWxbMl1dKSxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmVydGljZXMsIG5vcm1hbDogbTMudHJhbnNmb3JtUG9pbnQoUm1hdHJpeCwgbG9jYWxOb3JtYWwpIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGxvY2FsTm9ybWFsID0gdjMuc2NhbGUoWzAsIDEsIDBdLCBzaWduKTtcclxuICAgICAgICBjb25zdCB2ZXJ0aWNlcyA9IHRoaXMuY2lyY2xlUG9pbnRzLm1hcCgocCkgPT4gbTQudHJhbnNmb3JtUG9pbnQobSwgW3BbMF0sIHNpZ24gKiAwLjUsIHBbMl1dKSk7XHJcbiAgICAgICAgcmV0dXJuIHsgdmVydGljZXMsIG5vcm1hbDogbTMudHJhbnNmb3JtUG9pbnQoUm1hdHJpeCwgbG9jYWxOb3JtYWwpIH07XHJcbiAgICB9XHJcbiAgICBnZXRJbnZlcnNlSW5lcnRpYVRlbnNvcihtYXNzKSB7XHJcbiAgICAgICAgY29uc3QgeyByYWRpdXMsIGhlaWdodCB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCBpMSA9IChtYXNzIC8gMTIpICogKDMgKiByYWRpdXMgKiByYWRpdXMgKyBoZWlnaHQgKiBoZWlnaHQpO1xyXG4gICAgICAgIGNvbnN0IGkzID0gKG1hc3MgLyAyKSAqIHJhZGl1cyAqIHJhZGl1cztcclxuICAgICAgICBjb25zdCBtID0gbTMubXVsdGlwbHkobTMubXVsdGlwbHkodGhpcy5SbWF0cml4LCBbMSAvIGkxLCAwLCAwLCAwLCAxIC8gaTEsIDAsIDAsIDAsIDEgLyBpM10pLCB0aGlzLlJtYXRyaXhJbnZlcnNlKTtcclxuICAgICAgICByZXR1cm4gbTtcclxuICAgIH1cclxuICAgIGdldEFBQkIoKSB7XHJcbiAgICAgICAgY29uc3QgeyByYWRpdXMsIGhlaWdodCB9ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gbmV3IEFBQkIodjMuc3VtKHRoaXMucG9zLCBbLXJhZGl1cywgLWhlaWdodCwgLXJhZGl1c10pLCB2My5zdW0odGhpcy5wb3MsIFtyYWRpdXMsIGhlaWdodCwgcmFkaXVzXSkpO1xyXG4gICAgfVxyXG59XHJcbmNsYXNzIFRyaWFuZ2xlIGV4dGVuZHMgQ29sbGlkZXIge1xyXG4gICAgY29uc3RydWN0b3IodmVydGljZXMpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IGNvbGxpZGVyVHlwZXMuVHJpYW5nbGU7XHJcbiAgICAgICAgdGhpcy52ZXJ0aWNlcyA9IHZlcnRpY2VzO1xyXG4gICAgICAgIHRoaXMubm9ybWFsID0gdjMuY3Jvc3ModjMuZGlmZih2ZXJ0aWNlc1swXSwgdmVydGljZXNbMV0pLCB2My5kaWZmKHZlcnRpY2VzWzJdLCB2ZXJ0aWNlc1sxXSkpO1xyXG4gICAgfVxyXG4gICAgc3VwcG9ydChkaXIpIHtcclxuICAgICAgICBjb25zdCBkb3QxID0gdjMuZG90KHRoaXMudmVydGljZXNbMF0sIGRpcik7XHJcbiAgICAgICAgY29uc3QgZG90MiA9IHYzLmRvdCh0aGlzLnZlcnRpY2VzWzFdLCBkaXIpO1xyXG4gICAgICAgIGNvbnN0IGRvdDMgPSB2My5kb3QodGhpcy52ZXJ0aWNlc1syXSwgZGlyKTtcclxuICAgICAgICBsZXQgZnVydGhlc3QgPSB0aGlzLnZlcnRpY2VzWzBdO1xyXG4gICAgICAgIGlmIChkb3QyID4gZG90MSkge1xyXG4gICAgICAgICAgICBmdXJ0aGVzdCA9IHRoaXMudmVydGljZXNbMV07XHJcbiAgICAgICAgICAgIGlmIChkb3QzID4gZG90MilcclxuICAgICAgICAgICAgICAgIGZ1cnRoZXN0ID0gdGhpcy52ZXJ0aWNlc1syXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRvdDMgPiBkb3QxKVxyXG4gICAgICAgICAgICBmdXJ0aGVzdCA9IHRoaXMudmVydGljZXNbMl07XHJcbiAgICAgICAgaWYgKHYzLmRvdChkaXIsIHRoaXMubm9ybWFsKSA8IDApXHJcbiAgICAgICAgICAgIGZ1cnRoZXN0ID0gdjMuZGlmZihmdXJ0aGVzdCwgdGhpcy5ub3JtYWwpO1xyXG4gICAgICAgIHJldHVybiBmdXJ0aGVzdDtcclxuICAgIH1cclxuICAgIGdldENsb3Nlc3RGYWNlQnlOb3JtYWwobm9ybWFsKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmVydGljZXM6IHRoaXMudmVydGljZXMsXHJcbiAgICAgICAgICAgIG5vcm1hbDogdGhpcy5ub3JtYWwsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgeyBCb3gsIFNwaGVyZSwgQ3lsaW5kZXIsIFRyaWFuZ2xlLCBjb2xsaWRlclR5cGVzIH07XHJcbiIsImltcG9ydCB7IHYzLCBtMyB9IGZyb20gXCJyb21hbnBwcG1hdGhcIjtcclxuaW1wb3J0IHsgQ29uc3RyYWludEVxdWF0aW9uLCBDb250YWN0RXF1YXRpb24sIEZyaWN0aW9uRXF1YXRpb24sIH0gZnJvbSBcIi4vRXF1YXRpb25zXCI7XHJcbmltcG9ydCBjb25maWcgZnJvbSBcIi4vY29uZmlnXCI7XHJcbmNvbnN0IHsgQ09OVEFDVF9UUkVTSE9MRCwgQ09OVEFDVF9CSUFTIH0gPSBjb25maWc7XHJcbmV4cG9ydCBjbGFzcyBDb25zdHJhaW50IHtcclxuICAgIGNvbnN0cnVjdG9yKGJvZHkxLCBib2R5MiwgcmFMb2NhbCwgcmJMb2NhbCwgb3B0KSB7XHJcbiAgICAgICAgdGhpcy5ib2R5MSA9IGJvZHkxO1xyXG4gICAgICAgIHRoaXMuYm9keTIgPSBib2R5MjtcclxuICAgICAgICB0aGlzLnJhTG9jYWwgPSByYUxvY2FsO1xyXG4gICAgICAgIHRoaXMucmJMb2NhbCA9IHJiTG9jYWw7XHJcbiAgICAgICAgdGhpcy5iaWFzRmFjdG9yID0gb3B0LmJpYXNGYWN0b3IgfHwgMC4xMjU7XHJcbiAgICAgICAgdGhpcy50cmVzaG9sZCA9IG9wdC50cmVzaG9sZCB8fCAwLjAwMDAwNTtcclxuICAgICAgICB0aGlzLmxhbWJkYU1pbiA9IG9wdC5sYW1iZGFNaW4gfHwgLTk5OTk5OTk5O1xyXG4gICAgICAgIHRoaXMubGFtYmRhTWF4ID0gb3B0LmxhbWJkYU1heCB8fCA5OTk5OTk5OTtcclxuICAgICAgICB0aGlzLnByZXZMYW1iZGEgPSAwO1xyXG4gICAgICAgIGNvbnN0IGNvbGxpZGVyMSA9IHRoaXMuYm9keTEuZ2V0Q29sbGlkZXIoKTtcclxuICAgICAgICBjb25zdCBjb2xsaWRlcjIgPSB0aGlzLmJvZHkyLmdldENvbGxpZGVyKCk7XHJcbiAgICAgICAgdGhpcy5yYSA9IG0zLnRyYW5zZm9ybVBvaW50KGNvbGxpZGVyMS5nZXRSbWF0cml4KCksIHRoaXMucmFMb2NhbCk7XHJcbiAgICAgICAgdGhpcy5yYiA9IG0zLnRyYW5zZm9ybVBvaW50KGNvbGxpZGVyMi5nZXRSbWF0cml4KCksIHRoaXMucmJMb2NhbCk7XHJcbiAgICAgICAgdGhpcy5QQSA9IHYzLnN1bShjb2xsaWRlcjEuZ2V0VHJhbnNsYXRpb24oKSwgdGhpcy5yYSk7XHJcbiAgICAgICAgdGhpcy5QQiA9IHYzLnN1bShjb2xsaWRlcjIuZ2V0VHJhbnNsYXRpb24oKSwgdGhpcy5yYik7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgY29uc3QgY29sbGlkZXIxID0gdGhpcy5ib2R5MS5nZXRDb2xsaWRlcigpO1xyXG4gICAgICAgIGNvbnN0IGNvbGxpZGVyMiA9IHRoaXMuYm9keTIuZ2V0Q29sbGlkZXIoKTtcclxuICAgICAgICB0aGlzLnJhID0gbTMudHJhbnNmb3JtUG9pbnQoY29sbGlkZXIxLmdldFJtYXRyaXgoKSwgdGhpcy5yYUxvY2FsKTtcclxuICAgICAgICB0aGlzLnJiID0gbTMudHJhbnNmb3JtUG9pbnQoY29sbGlkZXIyLmdldFJtYXRyaXgoKSwgdGhpcy5yYkxvY2FsKTtcclxuICAgICAgICBjb25zdCBQQSA9IHYzLnN1bShjb2xsaWRlcjEuZ2V0VHJhbnNsYXRpb24oKSwgdGhpcy5yYSk7XHJcbiAgICAgICAgY29uc3QgUEIgPSB2My5zdW0oY29sbGlkZXIyLmdldFRyYW5zbGF0aW9uKCksIHRoaXMucmIpO1xyXG4gICAgICAgIGNvbnN0IGRlbHRhUEEgPSB2My5kaWZmKFBBLCB0aGlzLlBBKTtcclxuICAgICAgICBjb25zdCBkZWx0YVBCID0gdjMuZGlmZihQQiwgdGhpcy5QQik7XHJcbiAgICAgICAgdGhpcy5QQSA9IFBBO1xyXG4gICAgICAgIHRoaXMuUEIgPSBQQjtcclxuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSB2My5kaWZmKFBBLCBQQik7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbkVycm9yID0gdjMubm9ybSh2My5zdW0oWzAuMDAxLCAwLjAwMSwgMC4wMDFdLCBkaXJlY3Rpb24pKTtcclxuICAgICAgICB0aGlzLm4gPSB2My5zY2FsZShkaXJlY3Rpb24sIDEgLyB0aGlzLnBvc2l0aW9uRXJyb3IpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRlbHRhUEEsXHJcbiAgICAgICAgICAgIGRlbHRhUEIsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGdldEVxdWF0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IGVxdWF0aW9uID0gbmV3IENvbnN0cmFpbnRFcXVhdGlvbih0aGlzKTtcclxuICAgICAgICBlcXVhdGlvbi5sYW1iZGFNYXggPSB0aGlzLmxhbWJkYU1heDtcclxuICAgICAgICBlcXVhdGlvbi5sYW1iZGFNaW4gPSB0aGlzLmxhbWJkYU1pbjtcclxuICAgICAgICByZXR1cm4gZXF1YXRpb247XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIENvbnRhY3RDb25zdHJhaW50IHtcclxuICAgIGNvbnN0cnVjdG9yKGJvZHkxLCBib2R5MiwgcmFMb2NhbCwgcmJMb2NhbCwgcmEsIHJiLCBQQSwgUEIsIG4sIHBvc2l0aW9uRXJyb3IsIGksIGopIHtcclxuICAgICAgICB0aGlzLmJvZHkxID0gYm9keTE7XHJcbiAgICAgICAgdGhpcy5ib2R5MiA9IGJvZHkyO1xyXG4gICAgICAgIHRoaXMucmFMb2NhbCA9IHJhTG9jYWw7XHJcbiAgICAgICAgdGhpcy5yYkxvY2FsID0gcmJMb2NhbDtcclxuICAgICAgICB0aGlzLnJhID0gcmE7XHJcbiAgICAgICAgdGhpcy5yYiA9IHJiO1xyXG4gICAgICAgIHRoaXMuUEEgPSBQQTtcclxuICAgICAgICB0aGlzLlBCID0gUEI7XHJcbiAgICAgICAgdGhpcy5uID0gbjtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uRXJyb3IgPSBwb3NpdGlvbkVycm9yO1xyXG4gICAgICAgIHRoaXMuaSA9IGk7XHJcbiAgICAgICAgdGhpcy5qID0gajtcclxuICAgICAgICB0aGlzLmJpYXNGYWN0b3IgPSBjb25maWcuQ09OVEFDVF9CSUFTO1xyXG4gICAgICAgIHRoaXMudHJlc2hvbGQgPSBjb25maWcuQ09OVEFDVF9UUkVTSE9MRDtcclxuICAgICAgICB0aGlzLmxhbWJkYU1pbiA9IENvbnRhY3RDb25zdHJhaW50Lm9wdC5sYW1iZGFNaW47XHJcbiAgICAgICAgdGhpcy5sYW1iZGFNYXggPSBDb250YWN0Q29uc3RyYWludC5vcHQubGFtYmRhTWF4O1xyXG4gICAgICAgIHRoaXMucHJldlRhbkxhbWJkYXMgPSBbMCwgMF07XHJcbiAgICAgICAgdGhpcy5wcmV2TGFtYmRhID0gMDtcclxuICAgIH1cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICBjb25zdCBjb2xsaWRlcjEgPSB0aGlzLmJvZHkxLmdldENvbGxpZGVyKCk7XHJcbiAgICAgICAgY29uc3QgY29sbGlkZXIyID0gdGhpcy5ib2R5Mi5nZXRDb2xsaWRlcigpO1xyXG4gICAgICAgIHRoaXMucmEgPSBtMy50cmFuc2Zvcm1Qb2ludChjb2xsaWRlcjEuZ2V0Um1hdHJpeCgpLCB0aGlzLnJhTG9jYWwpO1xyXG4gICAgICAgIHRoaXMucmIgPSBtMy50cmFuc2Zvcm1Qb2ludChjb2xsaWRlcjIuZ2V0Um1hdHJpeCgpLCB0aGlzLnJiTG9jYWwpO1xyXG4gICAgICAgIGNvbnN0IFBBID0gdjMuc3VtKGNvbGxpZGVyMS5nZXRUcmFuc2xhdGlvbigpLCB0aGlzLnJhKTtcclxuICAgICAgICBjb25zdCBQQiA9IHYzLnN1bShjb2xsaWRlcjIuZ2V0VHJhbnNsYXRpb24oKSwgdGhpcy5yYik7XHJcbiAgICAgICAgY29uc3QgZGVsdGFQQSA9IHYzLmRpZmYoUEEsIHRoaXMuUEEpO1xyXG4gICAgICAgIGNvbnN0IGRlbHRhUEIgPSB2My5kaWZmKFBCLCB0aGlzLlBCKTtcclxuICAgICAgICB0aGlzLlBBID0gUEE7XHJcbiAgICAgICAgdGhpcy5QQiA9IFBCO1xyXG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHYzLmRpZmYoUEEsIFBCKTtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uRXJyb3IgPSB2My5kb3QodGhpcy5uLCBkaXJlY3Rpb24pO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRlbHRhUEEsXHJcbiAgICAgICAgICAgIGRlbHRhUEIsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGdldEVxdWF0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IGxhbWJkYU1heCA9IE1hdGgubWF4KDEsIHYzLm5vcm0odjMuc3VtKHYzLnNjYWxlKHRoaXMuYm9keTEuZ2V0VmVsb2NpdHkoKSwgdGhpcy5ib2R5MS5nZXRNYXNzKCkpLCB2My5zY2FsZSh0aGlzLmJvZHkyLmdldFZlbG9jaXR5KCksIHRoaXMuYm9keTIuZ2V0TWFzcygpKSkpICogMTApO1xyXG4gICAgICAgIGNvbnN0IGVxdWF0aW9uID0gbmV3IENvbnRhY3RFcXVhdGlvbih0aGlzKTtcclxuICAgICAgICBlcXVhdGlvbi5sYW1iZGFNYXggPSBsYW1iZGFNYXg7XHJcbiAgICAgICAgZXF1YXRpb24ubGFtYmRhTWluID0gMDtcclxuICAgICAgICByZXR1cm4gZXF1YXRpb247XHJcbiAgICB9XHJcbiAgICBnZXRGcmljdGlvbkVxdWF0aW9ucygpIHtcclxuICAgICAgICBjb25zdCBlcTEgPSBuZXcgRnJpY3Rpb25FcXVhdGlvbih0aGlzLCAwKTtcclxuICAgICAgICBjb25zdCBlcTIgPSBuZXcgRnJpY3Rpb25FcXVhdGlvbih0aGlzLCAxKTtcclxuICAgICAgICBlcTEubGFtYmRhTWF4ID0gSW5maW5pdHk7XHJcbiAgICAgICAgZXExLmxhbWJkYU1pbiA9IC1JbmZpbml0eTtcclxuICAgICAgICBlcTIubGFtYmRhTWF4ID0gSW5maW5pdHk7XHJcbiAgICAgICAgZXEyLmxhbWJkYU1pbiA9IC1JbmZpbml0eTtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBlcTEsIGVxMlxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcbn1cclxuQ29udGFjdENvbnN0cmFpbnQub3B0ID0ge1xyXG4gICAgYmlhc0ZhY3RvcjogMC4xMjUsXHJcbiAgICB0cmVzaG9sZDogMC4wMDA1LFxyXG4gICAgbGFtYmRhTWluOiAwLFxyXG4gICAgbGFtYmRhTWF4OiBJbmZpbml0eSxcclxufTtcclxuIiwiaW1wb3J0IHsgdjMgfSBmcm9tIFwicm9tYW5wcHBtYXRoXCI7XHJcbmltcG9ydCB7IENvbnRhY3RDb25zdHJhaW50IH0gZnJvbSBcIi4vQ29uc3RyYWludHNcIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi9jb25maWdcIjtcclxuY29uc3QgeyBDT05UQUNUX01BTklGT0xEX0tFRVBfVFJFU0hPTEQgfSA9IGNvbmZpZztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGFjdE1hbmlmb2xkIHtcclxuICAgIHN0YXRpYyBmcm9tRmVhdHVyZXNBcnJheShib2R5MSwgYm9keTIsIGZlYXR1cmVzKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDb250YWN0TWFuaWZvbGQoZmVhdHVyZXMubWFwKChjKSA9PiBuZXcgQ29udGFjdENvbnN0cmFpbnQoYm9keTEsIGJvZHkyLCBjLnJhTG9jYWwsIGMucmJMb2NhbCwgYy5yYSwgYy5yYiwgYy5QQSwgYy5QQiwgYy5uLCBjLnBvc2l0aW9uRXJyb3IsIGMuaSwgYy5qKSkpO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoY29udGFjdHMpIHtcclxuICAgICAgICB0aGlzLmNvbnRhY3RzID0gY29udGFjdHM7XHJcbiAgICAgICAgdGhpcy5rZWVwID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICBjb25zdCBjb250YWN0cyA9IHRoaXMuY29udGFjdHM7XHJcbiAgICAgICAgaWYgKGNvbnRhY3RzLmxlbmd0aCA8IDMpIHtcclxuICAgICAgICAgICAgdGhpcy5rZWVwID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSBjb250YWN0cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgY29udGFjdCA9IGNvbnRhY3RzW2ldO1xyXG4gICAgICAgICAgICBjb25zdCB7IGRlbHRhUEEsIGRlbHRhUEIgfSA9IGNvbnRhY3QudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIGlmICh2My5ub3JtKGRlbHRhUEEpID4gQ09OVEFDVF9NQU5JRk9MRF9LRUVQX1RSRVNIT0xEIHx8XHJcbiAgICAgICAgICAgICAgICB2My5ub3JtKGRlbHRhUEIpID4gQ09OVEFDVF9NQU5JRk9MRF9LRUVQX1RSRVNIT0xEKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmtlZXAgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCIuL0V2ZW50RW1pdHRlclwiO1xyXG5jb25zdCBkYXRhID0ge1xyXG4gICAgU09MVkVSX0VSUk9SOiAwLFxyXG4gICAgUlVOVElNRTogMCxcclxuICAgIEZQUzogMCxcclxufTtcclxuY2xhc3MgRGVidWcgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcclxuICAgICAgICBpZiAoIURlYnVnLmluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIERlYnVnLmluc3RhbmNlID0gbmV3IERlYnVnKCk7XHJcbiAgICAgICAgICAgIERlYnVnLmluc3RhbmNlLmRhdGEgPSB7fTtcclxuICAgICAgICAgICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgICAgICAgICAgRGVidWcuaW5zdGFuY2UuZGF0YVtgXyR7a2V5fWBdID0gZGF0YVtrZXldO1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KERlYnVnLmluc3RhbmNlLmRhdGEsIGtleSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGdldCgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbYF8ke2tleX1gXTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNldCh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2BfJHtrZXl9YF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRGVidWcuaW5zdGFuY2UuZW1pdChgdXBkYXRlYCwgeyBrZXk6IGBfJHtrZXl9YCwgdmFsdWUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gRGVidWcuaW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICBzb21lTWV0aG9kKCkgeyB9XHJcbn1cclxud2luZG93LkRlYnVnID0gRGVidWcuZ2V0SW5zdGFuY2UoKTtcclxuZXhwb3J0IGRlZmF1bHQgRGVidWcuZ2V0SW5zdGFuY2UoKTtcclxuIiwiaW1wb3J0IHsgdjMsIG0zIH0gZnJvbSBcInJvbWFucHBwbWF0aFwiO1xyXG5jb25zdCBjbGFtcCA9ICh2LCBtaW4sIG1heCkgPT4ge1xyXG4gICAgaWYgKHYgPiBtaW4pIHtcclxuICAgICAgICBpZiAodiA8IG1heClcclxuICAgICAgICAgICAgcmV0dXJuIHY7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gbWF4O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1pbjtcclxufTtcclxuY29uc3QgbnVsbFZlYyA9IFswLCAwLCAwXTtcclxuY2xhc3MgQ29uc3RyYWludEVxdWF0aW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbnN0cmFpbnQpIHtcclxuICAgICAgICB0aGlzLmNvbnN0cmFpbnQgPSBjb25zdHJhaW50O1xyXG4gICAgICAgIHRoaXMucHJldkxhbWJkYSA9IGNvbnN0cmFpbnQucHJldkxhbWJkYTtcclxuICAgIH1cclxuICAgIHVwZGF0ZUphY29iaWFuKCkge1xyXG4gICAgICAgIGNvbnN0IHsgYm9keTEsIGJvZHkyLCByYSwgcmIsIG4gfSA9IHRoaXMuY29uc3RyYWludDtcclxuICAgICAgICBpZiAoYm9keTEuaXNTdGF0aWMoKSkge1xyXG4gICAgICAgICAgICB0aGlzLkoxID0gbnVsbFZlYztcclxuICAgICAgICAgICAgdGhpcy5KMiA9IG51bGxWZWM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLkoxID0gdjMuc2NhbGUobiwgLTEpO1xyXG4gICAgICAgICAgICB0aGlzLkoyID0gdjMuY3Jvc3MobiwgcmEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYm9keTIuaXNTdGF0aWMoKSkge1xyXG4gICAgICAgICAgICB0aGlzLkozID0gbnVsbFZlYztcclxuICAgICAgICAgICAgdGhpcy5KNCA9IG51bGxWZWM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLkozID0gbjtcclxuICAgICAgICAgICAgdGhpcy5KNCA9IHYzLmNyb3NzKHJiLCBuKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyogIGNvbnN0IGRvZjEgPSBib2R5MS5kb2Y7XHJcbiAgICAgICAgY29uc3QgZG9mMiA9IGJvZHkyLmRvZjtcclxuICAgIFxyXG4gICAgICAgIHRoaXMuSlswXVswXSAqPSBkb2YxWzBdO1xyXG4gICAgICAgIHRoaXMuSlswXVsxXSAqPSBkb2YxWzFdO1xyXG4gICAgICAgIHRoaXMuSlswXVsyXSAqPSBkb2YxWzJdO1xyXG4gICAgXHJcbiAgICAgICAgdGhpcy5KWzFdWzBdICo9IGRvZjFbM107XHJcbiAgICAgICAgdGhpcy5KWzFdWzFdICo9IGRvZjFbNF07XHJcbiAgICAgICAgdGhpcy5KWzFdWzJdICo9IGRvZjFbNV07XHJcbiAgICBcclxuICAgICAgICB0aGlzLkpbMl1bMF0gKj0gZG9mMlswXTtcclxuICAgICAgICB0aGlzLkpbMl1bMV0gKj0gZG9mMlsxXTtcclxuICAgICAgICB0aGlzLkpbMl1bMl0gKj0gZG9mMlsyXTtcclxuICAgIFxyXG4gICAgICAgIHRoaXMuSlszXVswXSAqPSBkb2YyWzNdO1xyXG4gICAgICAgIHRoaXMuSlszXVsxXSAqPSBkb2YyWzRdO1xyXG4gICAgICAgIHRoaXMuSlszXVsyXSAqPSBkb2YyWzVdOyovXHJcbiAgICB9XHJcbiAgICB1cGRhdGVMZWZ0UGFydChkdCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlSmFjb2JpYW4oKTtcclxuICAgICAgICBjb25zdCB7IGJvZHkxLCBib2R5MiB9ID0gdGhpcy5jb25zdHJhaW50O1xyXG4gICAgICAgIGNvbnN0IEkxID0gYm9keTEuZ2V0SW52ZXJzZUluZXJ0aWFUZW5zb3IoKTtcclxuICAgICAgICBjb25zdCBJMiA9IGJvZHkyLmdldEludmVyc2VJbmVydGlhVGVuc29yKCk7XHJcbiAgICAgICAgbGV0IE0xID0gYm9keTEuZ2V0SW52ZXJzZU1hc3MoKTtcclxuICAgICAgICBsZXQgTTIgPSBib2R5Mi5nZXRJbnZlcnNlTWFzcygpO1xyXG4gICAgICAgIHRoaXMuSk0xID0gdjMuc2NhbGUodGhpcy5KMSwgTTEpO1xyXG4gICAgICAgIHRoaXMuSk0yID0gbTMudHJhbnNmb3JtUG9pbnQoSTEsIHRoaXMuSjIpO1xyXG4gICAgICAgIHRoaXMuSk0zID0gdjMuc2NhbGUodGhpcy5KMywgTTIpO1xyXG4gICAgICAgIHRoaXMuSk00ID0gbTMudHJhbnNmb3JtUG9pbnQoSTIsIHRoaXMuSjQpO1xyXG4gICAgICAgIC8vSk1KKiA9IEpCOyBCID0gTUoqIGFzIDIgdmVjNiwgX0ogPSBKYWNvYmlhbiBhcyAyIHZlYzZcclxuICAgICAgICB0aGlzLmVmZk1hc3MgPVxyXG4gICAgICAgICAgICB2My5kb3QodGhpcy5KMSwgdGhpcy5KTTEpICtcclxuICAgICAgICAgICAgICAgIHYzLmRvdCh0aGlzLkpNMiwgdGhpcy5KMikgK1xyXG4gICAgICAgICAgICAgICAgdjMuZG90KHRoaXMuSjMsIHRoaXMuSk0zKSArXHJcbiAgICAgICAgICAgICAgICB2My5kb3QodGhpcy5KTTQsIHRoaXMuSjQpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlUmlnaHRQYXJ0KGR0KSB7XHJcbiAgICAgICAgY29uc3QgeyBiaWFzRmFjdG9yLCB0cmVzaG9sZCwgYm9keTEsIGJvZHkyLCBuLCByYSwgcmIsIHBvc2l0aW9uRXJyb3IgfSA9IHRoaXMuY29uc3RyYWludDtcclxuICAgICAgICBjb25zdCByZWxhdGl2ZVZlbG9jaXR5ID0gdjMuZGlmZih2My5zdW0oYm9keTIuZ2V0VmVsb2NpdHkoKSwgdjMuY3Jvc3MoYm9keTIuZ2V0QW5ndWxhclZlbG9jaXR5KCksIHJiKSksIHYzLnN1bShib2R5MS5nZXRWZWxvY2l0eSgpLCB2My5jcm9zcyhib2R5MS5nZXRBbmd1bGFyVmVsb2NpdHkoKSwgcmEpKSk7XHJcbiAgICAgICAgY29uc3QgcmVsYXRpdmVWZWxvY2l0eU5vcm1hbFByb2plY3Rpb24gPSB2My5kb3QocmVsYXRpdmVWZWxvY2l0eSwgbik7XHJcbiAgICAgICAgdGhpcy5iaWFzID1cclxuICAgICAgICAgICAgKGJpYXNGYWN0b3IgKiBNYXRoLm1heChwb3NpdGlvbkVycm9yIC0gdHJlc2hvbGQsIDApKSAvIGR0IC1cclxuICAgICAgICAgICAgICAgIHJlbGF0aXZlVmVsb2NpdHlOb3JtYWxQcm9qZWN0aW9uO1xyXG4gICAgfVxyXG4gICAgYXBwbHlJbXB1bHNlKGxhbWJkYSkge1xyXG4gICAgICAgIHRoaXMuY29uc3RyYWludC5wcmV2TGFtYmRhID0gbGFtYmRhO1xyXG4gICAgICAgIHRoaXMuY29uc3RyYWludC5ib2R5MS5hcHBseUltcHVsc2UodjMuc2NhbGUodGhpcy5KMSwgbGFtYmRhKSwgdGhpcy5jb25zdHJhaW50LnJhKTtcclxuICAgICAgICB0aGlzLmNvbnN0cmFpbnQuYm9keTIuYXBwbHlJbXB1bHNlKHYzLnNjYWxlKHRoaXMuSjMsIGxhbWJkYSksIHRoaXMuY29uc3RyYWludC5yYik7XHJcbiAgICB9XHJcbiAgICBhcHBseVBzZXVkb0ltcHVsc2UobGFtYmRhKSB7XHJcbiAgICAgICAgdGhpcy5jb25zdHJhaW50LmJvZHkxLmFwcGx5UHNldWRvSW1wdWxzZSh2My5zY2FsZSh0aGlzLkoxLCBsYW1iZGEpLCB0aGlzLmNvbnN0cmFpbnQucmEpO1xyXG4gICAgICAgIHRoaXMuY29uc3RyYWludC5ib2R5Mi5hcHBseVBzZXVkb0ltcHVsc2UodjMuc2NhbGUodGhpcy5KMywgbGFtYmRhKSwgdGhpcy5jb25zdHJhaW50LnJiKTtcclxuICAgIH1cclxufVxyXG5Db25zdHJhaW50RXF1YXRpb24uYmlhc011bHRpcGxpZXIgPSAwLjU7XHJcbmNsYXNzIENvbnRhY3RFcXVhdGlvbiBleHRlbmRzIENvbnN0cmFpbnRFcXVhdGlvbiB7XHJcbiAgICB1cGRhdGVSaWdodFBhcnQoZHQpIHtcclxuICAgICAgICBjb25zdCB7IGJvZHkxLCBib2R5MiwgdHJlc2hvbGQsIGJpYXNGYWN0b3IsIHJhLCByYiwgbiwgcG9zaXRpb25FcnJvciB9ID0gdGhpcy5jb25zdHJhaW50O1xyXG4gICAgICAgIGNvbnN0IHJlbGF0aXZlVmVsb2NpdHkgPSB2My5kaWZmKHYzLnN1bShib2R5Mi5nZXRWZWxvY2l0eSgpLCB2My5jcm9zcyhib2R5Mi5nZXRBbmd1bGFyVmVsb2NpdHkoKSwgcmIpKSwgdjMuc3VtKGJvZHkxLmdldFZlbG9jaXR5KCksIHYzLmNyb3NzKGJvZHkxLmdldEFuZ3VsYXJWZWxvY2l0eSgpLCByYSkpKTtcclxuICAgICAgICBjb25zdCByZWxhdGl2ZVZlbG9jaXR5Tm9ybWFsUHJvamVjdGlvbiA9IHYzLmRvdChyZWxhdGl2ZVZlbG9jaXR5LCBuKTtcclxuICAgICAgICB0aGlzLmJpYXMgPVxyXG4gICAgICAgICAgICAoTWF0aC5tYXgoMCwgcG9zaXRpb25FcnJvciAtIHRyZXNob2xkKSAvIGR0KSAqIGJpYXNGYWN0b3IgLVxyXG4gICAgICAgICAgICAgICAgcmVsYXRpdmVWZWxvY2l0eU5vcm1hbFByb2plY3Rpb247XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgRnJpY3Rpb25FcXVhdGlvbiBleHRlbmRzIENvbnN0cmFpbnRFcXVhdGlvbiB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb25zdHJhaW50LCBkaXIpIHtcclxuICAgICAgICBzdXBlcihjb25zdHJhaW50KTtcclxuICAgICAgICB0aGlzLmRpciA9IGRpcjtcclxuICAgICAgICB0aGlzLnByZXZMYW1iZGEgPSB0aGlzLmNvbnN0cmFpbnQucHJldlRhbkxhbWJkYXNbZGlyXTtcclxuICAgICAgICB0aGlzLmxhbWJkYU1heCA9IHRoaXMuY29uc3RyYWludC5wcmV2TGFtYmRhICogKHRoaXMuY29uc3RyYWludC5ib2R5MS5nZXRGcmljdGlvbigpICsgdGhpcy5jb25zdHJhaW50LmJvZHkyLmdldEZyaWN0aW9uKCkpICogMTA7XHJcbiAgICAgICAgdGhpcy5sYW1iZGFNaW4gPSAtdGhpcy5sYW1iZGFNYXg7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVKYWNvYmlhbigpIHtcclxuICAgICAgICBjb25zdCB7IGJvZHkxLCBib2R5MiwgcmEsIHJiIH0gPSB0aGlzLmNvbnN0cmFpbnQ7XHJcbiAgICAgICAgY29uc3QgbiA9IHRoaXMuZGlyXHJcbiAgICAgICAgICAgID8gdGhpcy5jb25zdHJhaW50LmpcclxuICAgICAgICAgICAgOiB0aGlzLmNvbnN0cmFpbnQuaTtcclxuICAgICAgICBpZiAoYm9keTEuaXNTdGF0aWMoKSkge1xyXG4gICAgICAgICAgICB0aGlzLkoxID0gbnVsbFZlYztcclxuICAgICAgICAgICAgdGhpcy5KMiA9IG51bGxWZWM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLkoxID0gdjMuc2NhbGUobiwgLTEpO1xyXG4gICAgICAgICAgICB0aGlzLkoyID0gdjMuY3Jvc3MobiwgcmEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYm9keTIuaXNTdGF0aWMoKSkge1xyXG4gICAgICAgICAgICB0aGlzLkozID0gbnVsbFZlYztcclxuICAgICAgICAgICAgdGhpcy5KNCA9IG51bGxWZWM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLkozID0gbjtcclxuICAgICAgICAgICAgdGhpcy5KNCA9IHYzLmNyb3NzKHJiLCBuKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB1cGRhdGVSaWdodFBhcnQoKSB7XHJcbiAgICAgICAgY29uc3QgeyBib2R5MSwgYm9keTIsIHJhLCByYiB9ID0gdGhpcy5jb25zdHJhaW50O1xyXG4gICAgICAgIGNvbnN0IG4gPSB0aGlzLmRpclxyXG4gICAgICAgICAgICA/IHRoaXMuY29uc3RyYWludC5qXHJcbiAgICAgICAgICAgIDogdGhpcy5jb25zdHJhaW50Lmk7XHJcbiAgICAgICAgY29uc3QgcmVsYXRpdmVWZWxvY2l0eSA9IHYzLmRpZmYodjMuc3VtKGJvZHkyLmdldFZlbG9jaXR5KCksIHYzLmNyb3NzKGJvZHkyLmdldEFuZ3VsYXJWZWxvY2l0eSgpLCByYikpLCB2My5zdW0oYm9keTEuZ2V0VmVsb2NpdHkoKSwgdjMuY3Jvc3MoYm9keTEuZ2V0QW5ndWxhclZlbG9jaXR5KCksIHJhKSkpO1xyXG4gICAgICAgIGxldCByZWxhdGl2ZVZlbG9jaXR5Tm9ybWFsUHJvamVjdGlvbiA9IHYzLmRvdChyZWxhdGl2ZVZlbG9jaXR5LCBuKTtcclxuICAgICAgICAvL2lmKE1hdGguYWJzKHJlbGF0aXZlVmVsb2NpdHlOb3JtYWxQcm9qZWN0aW9uKSA8IDAuMDAwMDAxKSByZWxhdGl2ZVZlbG9jaXR5Tm9ybWFsUHJvamVjdGlvbiA9IDBcclxuICAgICAgICB0aGlzLmJpYXMgPSAtKHJlbGF0aXZlVmVsb2NpdHlOb3JtYWxQcm9qZWN0aW9uKTtcclxuICAgIH1cclxuICAgIGFwcGx5SW1wdWxzZShsYW1iZGEpIHtcclxuICAgICAgICB0aGlzLmNvbnN0cmFpbnQucHJldlRhbkxhbWJkYXNbdGhpcy5kaXJdID0gbGFtYmRhO1xyXG4gICAgICAgIHRoaXMuY29uc3RyYWludC5ib2R5MS5hcHBseUltcHVsc2UodjMuc2NhbGUodGhpcy5KMSwgbGFtYmRhKSwgdGhpcy5jb25zdHJhaW50LnJhKTtcclxuICAgICAgICB0aGlzLmNvbnN0cmFpbnQuYm9keTIuYXBwbHlJbXB1bHNlKHYzLnNjYWxlKHRoaXMuSjMsIGxhbWJkYSksIHRoaXMuY29uc3RyYWludC5yYik7XHJcbiAgICB9XHJcbn1cclxuLypcclxuY2xhc3MgUG9zaXRpb25Db25zdHJhaW50IGV4dGVuZHMgQ29uc3RyYWludCB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBib2R5MSxcclxuICAgIGJvZHkyLFxyXG4gICAgbixcclxuICAgIHJhLFxyXG4gICAgcmIsXHJcbiAgICByYUxvY2FsLFxyXG4gICAgcmJMb2NhbCxcclxuICAgIGJpYXNGYWN0b3IsXHJcbiAgICB0cmVzaG9sZCxcclxuICAgIHBlbkRlcHRoXHJcbiAgKSB7XHJcbiAgICBzdXBlcihcclxuICAgICAgYm9keTEsXHJcbiAgICAgIGJvZHkyLFxyXG4gICAgICBuLFxyXG4gICAgICByYSxcclxuICAgICAgcmIsXHJcbiAgICAgIHJhTG9jYWwsXHJcbiAgICAgIHJiTG9jYWwsXHJcbiAgICAgIGJpYXNGYWN0b3IsXHJcbiAgICAgIG51bGwsXHJcbiAgICAgIG51bGwsXHJcbiAgICAgIHRyZXNob2xkXHJcbiAgICApO1xyXG4gICAgdGhpcy5wZW5EZXB0aCA9IHBlbkRlcHRoO1xyXG4gIH1cclxuICBhcHBseVJlc29sdmluZ0ltcHVsc2UobGFtYmRhKSB7XHJcbiAgICB0aGlzLmJvZHkxLmFwcGx5UHNldWRvSW1wdWxzZSh2My5zY2FsZSh0aGlzLkpbMF0sIGxhbWJkYSksIHRoaXMucmEpO1xyXG4gICAgdGhpcy5ib2R5Mi5hcHBseVBzZXVkb0ltcHVsc2UodjMuc2NhbGUodGhpcy5KWzJdLCBsYW1iZGEpLCB0aGlzLnJiKTtcclxuICB9XHJcbiAgdXBkYXRlUmlnaHRQYXJ0KGRlbHRhVGltZSkge1xyXG4gICAgY29uc3QgeyBib2R5MSwgYm9keTIsIHJhLCByYiwgbiwgcGVuRGVwdGgsIHRyZXNob2xkLCBiaWFzRmFjdG9yIH0gPSB0aGlzO1xyXG5cclxuICAgIHRoaXMuYmlhcyA9IChNYXRoLm1heCgwLCBwZW5EZXB0aCAtIHRyZXNob2xkKSAvIGRlbHRhVGltZSkgKiBiaWFzRmFjdG9yO1xyXG4gIH1cclxufVxyXG5jbGFzcyBSb3RhdGlvbmFsQ29uc3RyYWludCBleHRlbmRzIENvbnN0cmFpbnQge1xyXG4gIGNvbnN0cnVjdG9yKGJvZHkxLCBib2R5MiwgcmFMb2NhbCwgcmJMb2NhbCkge1xyXG4gICAgc3VwZXIoYm9keTEsIGJvZHkyLCBudWxsLCBudWxsLCBudWxsLCByYUxvY2FsLCByYkxvY2FsKTtcclxuICB9XHJcbiAgdXBkYXRlTGVmdFBhcnQoZGVsdGFUaW1lKSB7XHJcbiAgICBjb25zdCB7IGJvZHkxLCBib2R5MiwgcmFMb2NhbCwgcmJMb2NhbCB9ID0gdGhpcztcclxuICAgIHRoaXMuUEEgPSBib2R5MS5jb2xsaWRlci5sb2NhbFRvR2xvYmFsKHJhTG9jYWwpO1xyXG4gICAgdGhpcy5QQiA9IGJvZHkyLmNvbGxpZGVyLmxvY2FsVG9HbG9iYWwocmJMb2NhbCk7XHJcbiAgICBjb25zdCBzID0gbTMudHJhbnNmb3JtUG9pbnQoYm9keTEuY29sbGlkZXIuUm1hdHJpeCwgcmFMb2NhbCk7XHJcbiAgICBjb25zdCBiID0gbTMudHJhbnNmb3JtUG9pbnQoYm9keTIuY29sbGlkZXIuUm1hdHJpeCwgcmJMb2NhbCk7XHJcblxyXG4gICAgdGhpcy5yYSA9IHM7XHJcbiAgICB0aGlzLnJiID0gYjtcclxuXHJcbiAgICBjb25zdCBKID0gW1swLCAwLCAwXSwgdjMuY3Jvc3MocywgYiksIFswLCAwLCAwXSwgdjMuY3Jvc3MoYiwgcyldO1xyXG5cclxuICAgIGNvbnN0IGRvZjEgPSBib2R5MS5ET0Y7XHJcbiAgICBjb25zdCBkb2YyID0gYm9keTIuRE9GO1xyXG5cclxuICAgIEpbMF1bMF0gKj0gZG9mMVswXTtcclxuICAgIEpbMF1bMV0gKj0gZG9mMVsxXTtcclxuICAgIEpbMF1bMl0gKj0gZG9mMVsyXTtcclxuXHJcbiAgICBKWzFdWzBdICo9IGRvZjFbM107XHJcbiAgICBKWzFdWzFdICo9IGRvZjFbNF07XHJcbiAgICBKWzFdWzJdICo9IGRvZjFbNV07XHJcblxyXG4gICAgSlsyXVswXSAqPSBkb2YyWzBdO1xyXG4gICAgSlsyXVsxXSAqPSBkb2YyWzFdO1xyXG4gICAgSlsyXVsyXSAqPSBkb2YyWzJdO1xyXG5cclxuICAgIEpbM11bMF0gKj0gZG9mMlszXTtcclxuICAgIEpbM11bMV0gKj0gZG9mMls0XTtcclxuICAgIEpbM11bMl0gKj0gZG9mMls1XTtcclxuICAgIGNvbnN0IEkxID0gYm9keTEuZ2V0SW52ZXJzZUluZXJ0aWFUZW5zb3IoKTtcclxuICAgIGNvbnN0IEkyID0gYm9keTIuZ2V0SW52ZXJzZUluZXJ0aWFUZW5zb3IoKTtcclxuICAgIHRoaXMuSiA9IEo7XHJcbiAgICB0aGlzLkpNID0gW1xyXG4gICAgICBbMCwgMCwgMF0sXHJcbiAgICAgIG0zLnRyYW5zZm9ybVBvaW50KEkxLCB0aGlzLkpbMV0pLFxyXG4gICAgICBbMCwgMCwgMF0sXHJcbiAgICAgIG0zLnRyYW5zZm9ybVBvaW50KEkyLCB0aGlzLkpbM10pLFxyXG4gICAgXTtcclxuICAgIHRoaXMuZWZmTWFzcyA9XHJcbiAgICAgIHYzLmRvdCh0aGlzLkpNWzFdLCB0aGlzLkpbMV0pICsgdjMuZG90KHRoaXMuSk1bM10sIHRoaXMuSlszXSk7XHJcbiAgICB0aGlzLkIgPSBbXHJcbiAgICAgIFswLCAwLCAwLCAuLi50aGlzLkpNWzFdXSxcclxuICAgICAgWzAsIDAsIDAsIC4uLnRoaXMuSk1bM11dLFxyXG4gICAgXTtcclxuICAgIHRoaXMuX0ogPSBbXHJcbiAgICAgIFsuLi50aGlzLkpbMF0sIC4uLnRoaXMuSlsxXV0sXHJcbiAgICAgIFsuLi50aGlzLkpbMl0sIC4uLnRoaXMuSlszXV0sXHJcbiAgICBdO1xyXG4gIH1cclxuICB1cGRhdGVSaWdodFBhcnQoZGVsdGFUaW1lKSB7XHJcbiAgICBjb25zdCB7IGJvZHkxLCBib2R5MiB9ID0gdGhpcztcclxuXHJcbiAgICB0aGlzLmJpYXMgPVxyXG4gICAgICAtdjMuZG90KHRoaXMuSlsxXSwgYm9keTEuZ2V0QW5ndWxhclZlbG9jaXR5KCkpICsgdjMuZG90KHRoaXMuSlszXSwgYm9keTIuZ2V0QW5ndWxhclZlbG9jaXR5KCkpO1xyXG4gIH1cclxuICBhcHBseVJlc29sdmluZ0ltcHVsc2UobGFtYmRhKSB7XHJcbiAgICBjb25zdCB7IGJvZHkxLCBib2R5MiB9ID0gdGhpcztcclxuICAgIGJvZHkxLmFkZEFuZ3VsYXJWKHYzLnNjYWxlKHRoaXMucmEsIGxhbWJkYSkpO1xyXG4gICAgYm9keTIuYWRkQW5ndWxhclYodjMuc2NhbGUodGhpcy5yYiwgbGFtYmRhKSk7XHJcbiAgfVxyXG59XHJcbiovXHJcbi8qXHJcbmNsYXNzIEpvaW50IGV4dGVuZHMgQ29uc3RyYWludCB7XHJcbiAgY29uc3RydWN0b3IoYm9keTEsIGJvZHkyLCByYUxvY2FsLCByYkxvY2FsLCBiaWFzRmFjdG9yID0gMCkge1xyXG4gICAgc3VwZXIoYm9keTEsIGJvZHkyLCBudWxsLCBudWxsLCBudWxsLCByYUxvY2FsLCByYkxvY2FsLCBiaWFzRmFjdG9yKTtcclxuXHJcbiAgICB0aGlzLnRyZXNob2xkID0gMC4wMDAxO1xyXG4gICAgdGhpcy5yZWR1Y2VyID0gMC41O1xyXG4gICAgdGhpcy5tYXhJbXB1bHNlID0gMC43O1xyXG4gIH1cclxuICB1cGRhdGVMZWZ0UGFydChkZWx0YVRpbWUpIHtcclxuICAgIGNvbnN0IHsgYm9keTEsIGJvZHkyLCByYUxvY2FsLCByYkxvY2FsIH0gPSB0aGlzO1xyXG4gICAgdGhpcy5QQSA9IGJvZHkxLmNvbGxpZGVyLmxvY2FsVG9HbG9iYWwocmFMb2NhbCk7XHJcbiAgICB0aGlzLlBCID0gYm9keTIuY29sbGlkZXIubG9jYWxUb0dsb2JhbChyYkxvY2FsKTtcclxuICAgIGNvbnN0IGRpciA9IHYzLmRpZmYodGhpcy5QQSwgdGhpcy5QQik7XHJcbiAgICBjb25zdCBuID0gZGlyO1xyXG4gICAgdGhpcy5uID0gbjtcclxuICAgIHRoaXMucmEgPSBkaWZmKHRoaXMuUEEsIHRoaXMuYm9keTEuY29sbGlkZXIucG9zKTtcclxuICAgIHRoaXMucmIgPSBkaWZmKHRoaXMuUEIsIHRoaXMuYm9keTIuY29sbGlkZXIucG9zKTtcclxuICAgIHRoaXMucGVuRGVwdGggPSBub3JtKGRpcik7XHJcblxyXG4gICAgY29uc3QgSiA9IFtcclxuICAgICAgdjMuc2NhbGUodGhpcy5uLCAtMSksXHJcbiAgICAgIHYzLmNyb3NzKHRoaXMubiwgdGhpcy5yYSksXHJcbiAgICAgIHRoaXMubixcclxuICAgICAgdjMuY3Jvc3ModGhpcy5yYiwgdGhpcy5uKSxcclxuICAgIF07XHJcblxyXG4gICAgY29uc3QgZG9mMSA9IGJvZHkxLkRPRjtcclxuICAgIGNvbnN0IGRvZjIgPSBib2R5Mi5ET0Y7XHJcblxyXG4gICAgSlswXVswXSAqPSBkb2YxWzBdO1xyXG4gICAgSlswXVsxXSAqPSBkb2YxWzFdO1xyXG4gICAgSlswXVsyXSAqPSBkb2YxWzJdO1xyXG5cclxuICAgIEpbMV1bMF0gKj0gZG9mMVszXTtcclxuICAgIEpbMV1bMV0gKj0gZG9mMVs0XTtcclxuICAgIEpbMV1bMl0gKj0gZG9mMVs1XTtcclxuXHJcbiAgICBKWzJdWzBdICo9IGRvZjJbMF07XHJcbiAgICBKWzJdWzFdICo9IGRvZjJbMV07XHJcbiAgICBKWzJdWzJdICo9IGRvZjJbMl07XHJcblxyXG4gICAgSlszXVswXSAqPSBkb2YyWzNdO1xyXG4gICAgSlszXVsxXSAqPSBkb2YyWzRdO1xyXG4gICAgSlszXVsyXSAqPSBkb2YyWzVdO1xyXG4gICAgY29uc3QgSTEgPSBib2R5MS5nZXRJbnZlcnNlSW5lcnRpYVRlbnNvcigpO1xyXG4gICAgY29uc3QgSTIgPSBib2R5Mi5nZXRJbnZlcnNlSW5lcnRpYVRlbnNvcigpO1xyXG4gICAgbGV0IE0xID0gYm9keTEuZ2V0SW52ZXJzZU1hc3MoKTtcclxuICAgIGxldCBNMiA9IGJvZHkyLmdldEludmVyc2VNYXNzKCk7XHJcbiAgICB0aGlzLkogPSBKO1xyXG4gICAgdGhpcy5KTSA9IFtcclxuICAgICAgc2NhbGUodGhpcy5KWzBdLCBNMSksXHJcbiAgICAgIG0zLnRyYW5zZm9ybVBvaW50KEkxLCB0aGlzLkpbMV0pLFxyXG4gICAgICBzY2FsZSh0aGlzLkpbMl0sIE0yKSxcclxuICAgICAgbTMudHJhbnNmb3JtUG9pbnQoSTIsIHRoaXMuSlszXSksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5lZmZNYXNzID1cclxuICAgICAgZG90KHRoaXMuSk1bMF0sIEpbMF0pICtcclxuICAgICAgZG90KHRoaXMuSk1bMV0sIHRoaXMuSlsxXSkgK1xyXG4gICAgICBkb3QodGhpcy5KTVsyXSwgSlsyXSkgK1xyXG4gICAgICBkb3QodGhpcy5KTVszXSwgdGhpcy5KWzNdKTtcclxuICAgIHRoaXMuQiA9IFtcclxuICAgICAgWy4uLnRoaXMuSk1bMF0sIC4uLnRoaXMuSk1bMV1dLFxyXG4gICAgICBbLi4udGhpcy5KTVsyXSwgLi4udGhpcy5KTVszXV0sXHJcbiAgICBdO1xyXG4gICAgdGhpcy5fSiA9IFtcclxuICAgICAgWy4uLnRoaXMuSlswXSwgLi4udGhpcy5KWzFdXSxcclxuICAgICAgWy4uLnRoaXMuSlsyXSwgLi4udGhpcy5KWzNdXSxcclxuICAgIF07XHJcbiAgfVxyXG5cclxuICB1cGRhdGVSaWdodFBhcnQoZGVsdGFUaW1lKSB7XHJcbiAgICBjb25zdCB7IGJvZHkxLCBib2R5MiwgcmEsIHJiLCBuLCBwZW5EZXB0aCwgdHJlc2hvbGQsIGJpYXNGYWN0b3IgfSA9IHRoaXM7XHJcblxyXG4gICAgY29uc3QgcmVsYXRpdmVWZWxvY2l0eSA9IGRpZmYoXHJcbiAgICAgIHN1bShib2R5Mi5nZXRWZWxvY2l0eSgpLCBjcm9zcyhib2R5Mi5nZXRBbmd1bGFyVmVsb2NpdHkoKSwgcmIpKSxcclxuICAgICAgc3VtKGJvZHkxLmdldFZlbG9jaXR5KCksIGNyb3NzKGJvZHkxLmdldEFuZ3VsYXJWZWxvY2l0eSgpLCByYSkpXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IHJlbGF0aXZlVmVsb2NpdHlOb3JtYWxQcm9qZWN0aW9uID0gZG90KHJlbGF0aXZlVmVsb2NpdHksIG4pO1xyXG4gICAgY29uc3QgZmFjID0gcGVuRGVwdGggKiogMiA+IHRyZXNob2xkO1xyXG4gICAgdGhpcy5iaWFzID1cclxuICAgICAgKGJpYXNGYWN0b3IgKiBNYXRoLm1heChwZW5EZXB0aCAqKiAyIC0gdHJlc2hvbGQsIDApKSAvIGRlbHRhVGltZSAtXHJcbiAgICAgIHJlbGF0aXZlVmVsb2NpdHlOb3JtYWxQcm9qZWN0aW9uO1xyXG4gICAgdGhpcy5iaWFzICo9IGZhYztcclxuICB9XHJcbiAgYXBwbHlSZXNvbHZpbmdJbXB1bHNlKGxhbWJkYSkge1xyXG4gICAgdGhpcy5ib2R5MS5hcHBseUltcHVsc2Uoc2NhbGUodGhpcy5KWzBdLCBsYW1iZGEpLCB0aGlzLnJhKTtcclxuICAgIHRoaXMuYm9keTIuYXBwbHlJbXB1bHNlKHNjYWxlKHRoaXMuSlsyXSwgbGFtYmRhKSwgdGhpcy5yYik7XHJcbiAgfVxyXG4gIGFwcGx5UmVzb2x2aW5nUHNldWRvSW1wdWxzZShsYW1iZGEpIHtcclxuICAgIGNvbnN0IG1heCA9IHRoaXMuZWZmTWFzcyAqIDEwO1xyXG4gICAgLy9sYW1iZGEgPSBjbGFtcChsYW1iZGEsIC0xLCAxKVxyXG4gICAgdGhpcy5ib2R5MS5hcHBseVBzZXVkb0ltcHVsc2Uoc2NhbGUodGhpcy5uLCAtbGFtYmRhKSwgWzAsIDAsIDBdKTtcclxuICAgIHRoaXMuYm9keTIuYXBwbHlQc2V1ZG9JbXB1bHNlKHNjYWxlKHRoaXMubiwgbGFtYmRhKSwgWzAsIDAsIDBdKTtcclxuICB9XHJcbn1cclxuY2xhc3MgSm9pbnRQb3NpdGlvbkNvbnN0cmFpbnQgZXh0ZW5kcyBKb2ludCB7XHJcbiAgdXBkYXRlUmlnaHRQYXJ0KGRlbHRhVGltZSkge1xyXG4gICAgY29uc3QgeyBwZW5EZXB0aCwgdHJlc2hvbGQsIGJpYXNGYWN0b3IgfSA9IHRoaXM7XHJcblxyXG4gICAgY29uc3QgZmFjID0gcGVuRGVwdGggKiogMiA+IHRyZXNob2xkO1xyXG4gICAgdGhpcy5iaWFzID1cclxuICAgICAgKChiaWFzRmFjdG9yICogTWF0aC5tYXgocGVuRGVwdGggKiogMiAtIHRyZXNob2xkLCAwKSkgLyBkZWx0YVRpbWUpICogZmFjO1xyXG4gIH1cclxuICBhcHBseVJlc29sdmluZ0ltcHVsc2UobGFtYmRhKSB7XHJcbiAgICAvL2lmKGxhbWJkYSA8IDAuMSlyZXR1cm5cclxuICAgIHRoaXMuYm9keTEuYXBwbHlQc2V1ZG9JbXB1bHNlKHNjYWxlKHRoaXMuSlswXSwgbGFtYmRhKSwgdGhpcy5yYSk7XHJcbiAgICB0aGlzLmJvZHkyLmFwcGx5UHNldWRvSW1wdWxzZShzY2FsZSh0aGlzLkpbMl0sIGxhbWJkYSksIHRoaXMucmIpO1xyXG4gIH1cclxufSovXHJcbmV4cG9ydCB7IENvbnRhY3RFcXVhdGlvbiwgQ29uc3RyYWludEVxdWF0aW9uLCBcclxuLy9Kb2ludCxcclxuRnJpY3Rpb25FcXVhdGlvbixcclxuLy9Qb3NpdGlvbkNvbnN0cmFpbnQsXHJcbi8vSm9pbnRQb3NpdGlvbkNvbnN0cmFpbnQsXHJcbi8vUm90YXRpb25hbENvbnN0cmFpbnQsXHJcbiB9O1xyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudEVtaXR0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudHMgPSB7fTtcclxuICAgIH1cclxuICAgIG9uKGV2ZW50TmFtZSwgZm4pIHtcclxuICAgICAgICBpZiAoIXRoaXMuZXZlbnRzW2V2ZW50TmFtZV0pIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLnB1c2goZm4pO1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdLmZpbHRlcigoZXZlbnRGbikgPT4gZm4gIT09IGV2ZW50Rm4pO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBlbWl0KGV2ZW50TmFtZSwgZGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLmV2ZW50c1tldmVudE5hbWVdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0uZm9yRWFjaCgoZm4pID0+IHtcclxuICAgICAgICAgICAgICAgIGZuLmNhbGwobnVsbCwgZGF0YSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCIuL0V2ZW50RW1pdHRlclwiO1xyXG5pbXBvcnQgeyBtMywgdjMgfSBmcm9tICdyb21hbnBwcG1hdGgnO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5jb25zdCB7IFJJR0lEX0JPRFlfTU9WRV9UUkVTSE9MRCwgUklHSURfQk9EWV9BQUJCX0JJQVMgfSA9IGNvbmZpZztcclxuY2xhc3MgUmlnaWRCb2R5IGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbGxpZGVyKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnN0YXRpYyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXIgPSBjb2xsaWRlcjtcclxuICAgICAgICB0aGlzLm1hc3MgPSAxO1xyXG4gICAgICAgIHRoaXMuaW52ZXJzZU1hc3MgPSAxIC8gdGhpcy5tYXNzO1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSBbMCwgMCwgMF07XHJcbiAgICAgICAgdGhpcy5wc2V1ZG9WZWxvY2l0eSA9IFswLCAwLCAwXTtcclxuICAgICAgICB0aGlzLnBzZXVkb0FuZ3VsYXJWID0gWzAsIDAsIDBdO1xyXG4gICAgICAgIHRoaXMuYWNjZWxlcmF0aW9uID0gWzAsIDAsIDBdO1xyXG4gICAgICAgIHRoaXMub21lZ2EgPSBbMCwgMCwgMF07XHJcbiAgICAgICAgdGhpcy5pbnZlcnNlSW5lcnRpYVRlbnNvciA9IGNvbGxpZGVyLmdldEludmVyc2VJbmVydGlhVGVuc29yKHRoaXMubWFzcyk7XHJcbiAgICAgICAgdGhpcy5pZCA9IFJpZ2lkQm9keS5sYXN0SWQrKztcclxuICAgICAgICB0aGlzLmZyaWN0aW9uID0gNTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50RnVuY3Rpb25zID0gW107XHJcbiAgICAgICAgdGhpcy5ncm91cCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5uZWVkVG9VcGRhdGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGdldElkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlkO1xyXG4gICAgfVxyXG4gICAgZ2V0R3JvdXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ3JvdXA7XHJcbiAgICB9XHJcbiAgICBzZXRHcm91cChncm91cElkKSB7XHJcbiAgICAgICAgdGhpcy5ncm91cCA9IGdyb3VwSWQ7XHJcbiAgICB9XHJcbiAgICBnZXRNYXNzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1hc3M7XHJcbiAgICB9XHJcbiAgICBnZXRJbnZlcnNlTWFzcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnZlcnNlTWFzcztcclxuICAgIH1cclxuICAgIGdldFRyYW5zbGF0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldENvbGxpZGVyKCkuZ2V0VHJhbnNsYXRpb24oKTtcclxuICAgIH1cclxuICAgIGdldENvbGxpZGVyKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbGxpZGVyO1xyXG4gICAgfVxyXG4gICAgaXNTdGF0aWMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGljO1xyXG4gICAgfVxyXG4gICAgZ2V0Um90YXRpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29sbGlkZXIoKS5nZXRSbWF0cml4KCk7XHJcbiAgICB9XHJcbiAgICBnZXRWZWxvY2l0eSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy52ZWxvY2l0eTtcclxuICAgIH1cclxuICAgIGdldEFjY2VsZXJhdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hY2NlbGVyYXRpb247XHJcbiAgICB9XHJcbiAgICBnZXRBbmd1bGFyVmVsb2NpdHkoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub21lZ2E7XHJcbiAgICB9XHJcbiAgICBnZXRGcmljdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mcmljdGlvbjtcclxuICAgIH1cclxuICAgIGdldEludmVyc2VJbmVydGlhVGVuc29yKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmludmVyc2VJbmVydGlhVGVuc29yO1xyXG4gICAgfVxyXG4gICAgZ2V0QUFCQigpIHtcclxuICAgICAgICBjb25zdCBhYWJiID0gdGhpcy5jb2xsaWRlci5nZXRBQUJCKCk7XHJcbiAgICAgICAgY29uc3QgdmVsb2NpdHkgPSB0aGlzLnZlbG9jaXR5O1xyXG4gICAgICAgIGNvbnN0IHRyID0gW1JJR0lEX0JPRFlfQUFCQl9CSUFTLCBSSUdJRF9CT0RZX0FBQkJfQklBUywgUklHSURfQk9EWV9BQUJCX0JJQVNdO1xyXG4gICAgICAgIGFhYmIubWluID0gdjMuZGlmZihhYWJiLm1pbiwgdHIpO1xyXG4gICAgICAgIGFhYmIubWF4ID0gdjMuc3VtKGFhYmIubWF4LCB0cik7XHJcbiAgICAgICAgcmV0dXJuIGFhYmI7XHJcbiAgICB9XHJcbiAgICBhZGRWZWxvY2l0eSh2KSB7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHYzLnN1bSh0aGlzLnZlbG9jaXR5LCB2KTtcclxuICAgIH1cclxuICAgIGFkZEFuZ3VsYXJWZWxvY2l0eSh2KSB7XHJcbiAgICAgICAgdGhpcy5vbWVnYSA9IHYzLnN1bSh0aGlzLm9tZWdhLCB2KTtcclxuICAgIH1cclxuICAgIGFkZEFjY2VsZXJhdGlvbih2KSB7XHJcbiAgICAgICAgdGhpcy5hY2NlbGVyYXRpb24gPSB2My5zdW0odGhpcy5hY2NlbGVyYXRpb24sIHYpO1xyXG4gICAgfVxyXG4gICAgdHJhbnNsYXRlKHRyYW5zbGF0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlci50cmFuc2xhdGUodHJhbnNsYXRpb24pO1xyXG4gICAgICAgIHRoaXMubmVlZFRvVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmVtaXRVcGRhdGUoKTtcclxuICAgIH1cclxuICAgIHJvdGF0ZShyb3RhdGlvbikge1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXIucm90YXRlKHJvdGF0aW9uKTtcclxuICAgICAgICB0aGlzLm5lZWRUb1VwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5lbWl0VXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICBzZXRJZChpZCkge1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIH1cclxuICAgIHNldE1hc3MobWFzcykge1xyXG4gICAgICAgIHRoaXMubWFzcyA9IG1hc3M7XHJcbiAgICAgICAgdGhpcy5pbnZlcnNlTWFzcyA9IDEgLyB0aGlzLm1hc3M7XHJcbiAgICB9XHJcbiAgICBzZXRGcmljdGlvbihmKSB7XHJcbiAgICAgICAgdGhpcy5mcmljdGlvbiA9IGY7XHJcbiAgICB9XHJcbiAgICBzZXRSb3RhdGlvbihyKSB7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlci5zZXRSb3RhdGlvbihyKTtcclxuICAgICAgICB0aGlzLm5lZWRUb1VwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5lbWl0VXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICBzZXRUcmFuc2xhdGlvbih0KSB7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlci5zZXRUcmFuc2xhdGlvbih0KTtcclxuICAgICAgICB0aGlzLm5lZWRUb1VwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5lbWl0VXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICBzZXRWZWxvY2l0eSh2KSB7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHY7XHJcbiAgICB9XHJcbiAgICBzZXRBbmd1bGFyVmVsb2NpdHkodikge1xyXG4gICAgICAgIHRoaXMub21lZ2EgPSB2O1xyXG4gICAgfVxyXG4gICAgc2V0U3RhdGljKGIpIHtcclxuICAgICAgICB0aGlzLnN0YXRpYyA9IGI7XHJcbiAgICB9XHJcbiAgICBpbnRlZ3JhdGVSSzQoZHQpIHtcclxuICAgICAgICBjb25zdCB7IGFjY2VsZXJhdGlvbiwgdmVsb2NpdHksIG9tZWdhIH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IF90cmFuc2xhdGlvbiA9IHYzLnNjYWxlKHYzLnN1bSh2ZWxvY2l0eSwgdjMuc2NhbGUoYWNjZWxlcmF0aW9uLCAoMiAvIDMpICogZHQpKSwgZHQpO1xyXG4gICAgICAgIGNvbnN0IF9yb3RhdGlvbiA9IHYzLnNjYWxlKG9tZWdhLCBkdCAvIDIpO1xyXG4gICAgICAgIGNvbnN0IGRlbHRhVmVsb2NpdHkgPSB2My5zY2FsZShhY2NlbGVyYXRpb24sIGR0KTtcclxuICAgICAgICBpZiAodjMubm9ybShfdHJhbnNsYXRpb24pID4gY29uZmlnLlJJR0lEX0JPRFlfTU9WRV9UUkVTSE9MRClcclxuICAgICAgICAgICAgdGhpcy50cmFuc2xhdGUoX3RyYW5zbGF0aW9uKTtcclxuICAgICAgICBpZiAodjMubm9ybShfcm90YXRpb24pID4gY29uZmlnLlJJR0lEX0JPRFlfTU9WRV9UUkVTSE9MRClcclxuICAgICAgICAgICAgdGhpcy5yb3RhdGUoX3JvdGF0aW9uKTtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gdjMuc3VtKHZlbG9jaXR5LCBkZWx0YVZlbG9jaXR5KTtcclxuICAgIH1cclxuICAgIGludGVncmF0ZVBzZXVkb1ZlbG9jaXRpZXMoZHQpIHtcclxuICAgICAgICBjb25zdCB0cmFuc2xhdGlvbiA9IHYzLnNjYWxlKHRoaXMucHNldWRvVmVsb2NpdHksIGR0KTtcclxuICAgICAgICBjb25zdCByb3RhdGlvbiA9IHYzLnNjYWxlKHRoaXMucHNldWRvQW5ndWxhclYsIGR0KTtcclxuICAgICAgICBpZiAodjMubm9ybSh0cmFuc2xhdGlvbikgPiBjb25maWcuUklHSURfQk9EWV9NT1ZFX1RSRVNIT0xEKVxyXG4gICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZSh0cmFuc2xhdGlvbik7XHJcbiAgICAgICAgaWYgKHYzLm5vcm0ocm90YXRpb24pID4gY29uZmlnLlJJR0lEX0JPRFlfTU9WRV9UUkVTSE9MRClcclxuICAgICAgICAgICAgdGhpcy5yb3RhdGUocm90YXRpb24pO1xyXG4gICAgICAgIHRoaXMucHNldWRvVmVsb2NpdHkgPSBbMCwgMCwgMF07XHJcbiAgICAgICAgdGhpcy5wc2V1ZG9Bbmd1bGFyViA9IFswLCAwLCAwXTtcclxuICAgIH1cclxuICAgIGFkZFBzZXVkb1ZlbG9jaXR5KHYpIHtcclxuICAgICAgICB0aGlzLnBzZXVkb1ZlbG9jaXR5ID0gdjMuc3VtKHRoaXMucHNldWRvVmVsb2NpdHksIHYpO1xyXG4gICAgfVxyXG4gICAgYWRkUHNldWRvQW5ndWxhclYodikge1xyXG4gICAgICAgIHRoaXMucHNldWRvQW5ndWxhclYgPSB2My5zdW0odGhpcy5wc2V1ZG9Bbmd1bGFyViwgdik7XHJcbiAgICB9XHJcbiAgICBpbnRlZ3JhdGVWZWxvY2l0aWVzKGR0KSB7XHJcbiAgICAgICAgY29uc3QgdHJhbnNsYXRpb24gPSB2My5zY2FsZSh2My5kaWZmKHRoaXMudmVsb2NpdHksIHYzLnNjYWxlKHRoaXMuYWNjZWxlcmF0aW9uLCBkdCAvIDMpKSwgZHQpO1xyXG4gICAgICAgIGlmICh2My5ub3JtKHRyYW5zbGF0aW9uKSA+IGNvbmZpZy5SSUdJRF9CT0RZX01PVkVfVFJFU0hPTEQpXHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNsYXRlKHRyYW5zbGF0aW9uKTtcclxuICAgICAgICBjb25zdCByb3RhdGlvbiA9IHYzLnNjYWxlKHRoaXMub21lZ2EsIGR0IC8gMik7XHJcbiAgICAgICAgaWYgKHYzLm5vcm0ocm90YXRpb24pID4gY29uZmlnLlJJR0lEX0JPRFlfTU9WRV9UUkVTSE9MRClcclxuICAgICAgICAgICAgdGhpcy5yb3RhdGUocm90YXRpb24pO1xyXG4gICAgfVxyXG4gICAgaW50ZWdyYXRlRm9yY2VzKGR0KSB7XHJcbiAgICAgICAgbGV0IGRlbHRhU3BlZWQgPSB2My5zY2FsZSh0aGlzLmFjY2VsZXJhdGlvbiwgZHQpO1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSB2My5zdW0odGhpcy52ZWxvY2l0eSwgZGVsdGFTcGVlZCk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVJbnZlcnNlSW5lcnRpYSgpIHtcclxuICAgICAgICB0aGlzLmludmVyc2VJbmVydGlhVGVuc29yID0gdGhpcy5jb2xsaWRlci5nZXRJbnZlcnNlSW5lcnRpYVRlbnNvcih0aGlzLm1hc3MpO1xyXG4gICAgfVxyXG4gICAgYXBwbHlJbXB1bHNlKGltcHVsc2UsIHBvaW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGljKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHYzLnN1bSh0aGlzLnZlbG9jaXR5LCB2My5zY2FsZShpbXB1bHNlLCB0aGlzLmludmVyc2VNYXNzKSk7XHJcbiAgICAgICAgY29uc3QgYW5ndWxhckltcHVsc2UgPSBtMy50cmFuc2Zvcm1Qb2ludCh0aGlzLmludmVyc2VJbmVydGlhVGVuc29yLCB2My5jcm9zcyhwb2ludCwgaW1wdWxzZSkpO1xyXG4gICAgICAgIHRoaXMub21lZ2EgPSB2My5zdW0odGhpcy5vbWVnYSwgYW5ndWxhckltcHVsc2UpO1xyXG4gICAgfVxyXG4gICAgYXBwbHlQc2V1ZG9JbXB1bHNlKGltcHVsc2UsIHBvaW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGljKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5wc2V1ZG9WZWxvY2l0eSA9IHYzLnN1bSh0aGlzLnBzZXVkb1ZlbG9jaXR5LCB2My5zY2FsZShpbXB1bHNlLCB0aGlzLmludmVyc2VNYXNzKSk7XHJcbiAgICAgICAgY29uc3QgYW5ndWxhckltcHVsc2UgPSBtMy50cmFuc2Zvcm1Qb2ludCh0aGlzLmludmVyc2VJbmVydGlhVGVuc29yLCB2My5jcm9zcyhwb2ludCwgaW1wdWxzZSkpO1xyXG4gICAgICAgIHRoaXMucHNldWRvQW5ndWxhclYgPSB2My5zdW0odGhpcy5wc2V1ZG9Bbmd1bGFyViwgYW5ndWxhckltcHVsc2UpO1xyXG4gICAgfVxyXG4gICAgLypcclxuICAgIGFwcGx5QW5ndWxhckltcHVsc2UocmFkaXVzIDogbnVtYmVyLCBheGlzLCB2YWx1ZSkge1xyXG4gICAgICBjb25zdCBkaXIgPSBub3JtYWxpemUoW1xyXG4gICAgICAgIGF4aXNbMV0gKyBheGlzWzJdLFxyXG4gICAgICAgIGF4aXNbMl0gLSBheGlzWzBdLFxyXG4gICAgICAgIC1heGlzWzBdIC0gYXhpc1sxXSxcclxuICAgICAgXSk7XHJcbiAgICAgIGNvbnN0IHJhZCA9IHZlY3Rvci5jcm9zcyhkaXIsIGF4aXMpO1xyXG4gICAgICBjb25zdCBnbG9iYWxEaXIgPSBzY2FsZShkaXIsIHZhbHVlKTtcclxuICAgICAgY29uc3QgZ2xvYmFsUmFkID0gc2NhbGUocmFkLCByYWRpdXMpO1xyXG4gIFxyXG4gICAgICB0aGlzLmFwcGx5SW1wdWxzZShnbG9iYWxEaXIsIGdsb2JhbFJhZCk7XHJcbiAgICB9Ki9cclxuICAgIGdldEV4cGFuZGVkQUFCQigpIHtcclxuICAgICAgICBjb25zdCBhYWJiID0gdGhpcy5jb2xsaWRlci5nZXRBQUJCKCk7XHJcbiAgICAgICAgY29uc3QgdmVsb2NpdHkgPSB0aGlzLnZlbG9jaXR5O1xyXG4gICAgICAgIGNvbnN0IHRyID0gW1JJR0lEX0JPRFlfQUFCQl9CSUFTLCBSSUdJRF9CT0RZX0FBQkJfQklBUywgUklHSURfQk9EWV9BQUJCX0JJQVNdO1xyXG4gICAgICAgIGFhYmIubWluID0gdjMuZGlmZihhYWJiLm1pbiwgdHIpO1xyXG4gICAgICAgIGFhYmIubWF4ID0gdjMuc3VtKGFhYmIubWF4LCB0cik7XHJcbiAgICAgICAgLyppZih2ZWxvY2l0eVswXSA+IDEwKSBhYWJiLm1heFswXSArPSB2ZWxvY2l0eVswXVxyXG4gICAgICAgICAgaWYodmVsb2NpdHlbMV0gPiAxMCkgYWFiYi5tYXhbMV0gKz0gdmVsb2NpdHlbMV1cclxuICAgICAgICAgIGlmKHZlbG9jaXR5WzJdID4gMTApIGFhYmIubWF4WzJdICs9IHZlbG9jaXR5WzJdXHJcbiAgICAgICAgICBpZih2ZWxvY2l0eVswXSA8IC0xMCkgYWFiYi5taW5bMF0gKz0gdmVsb2NpdHlbMF1cclxuICAgICAgICAgIGlmKHZlbG9jaXR5WzFdIDwgLTEwKSBhYWJiLm1pblsxXSArPSB2ZWxvY2l0eVsxXVxyXG4gICAgICAgICAgaWYodmVsb2NpdHlbMl0gPCAtMTApIGFhYmIubWluWzJdICs9IHZlbG9jaXR5WzJdKi9cclxuICAgICAgICByZXR1cm4gYWFiYjtcclxuICAgIH1cclxuICAgIG9uVXBkYXRlKGZ1bmMpIHtcclxuICAgICAgICBpZiAodGhpcy51cGRhdGVFdmVudEZ1bmN0aW9ucy5pbmRleE9mKGZ1bmMpID4gLTEpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50RnVuY3Rpb25zLnB1c2goZnVuYyk7XHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVFdmVudEZ1bmN0aW9ucy5maWx0ZXIoZm4gPT4gZm4gIT09IGZ1bmMpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBlbWl0VXBkYXRlKCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlRXZlbnRGdW5jdGlvbnMuZm9yRWFjaChmbiA9PiB7XHJcbiAgICAgICAgICAgIGZuKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuUmlnaWRCb2R5Lmxhc3RJZCA9IDE7XHJcbmNsYXNzIFRlcnJhaW5TZWdtZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbGxpZGVyKSB7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlciA9IGNvbGxpZGVyO1xyXG4gICAgICAgIHRoaXMuZ3JvdXAgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZnJpY3Rpb24gPSA1O1xyXG4gICAgICAgIHRoaXMudXBkYXRlRXZlbnRGdW5jdGlvbnMgPSBbXTtcclxuICAgIH1cclxuICAgIGdldElkKCkge1xyXG4gICAgICAgIHJldHVybiBUZXJyYWluU2VnbWVudC5pZDtcclxuICAgIH1cclxuICAgIGdldEdyb3VwKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdyb3VwO1xyXG4gICAgfVxyXG4gICAgc2V0R3JvdXAoZ3JvdXBJZCkge1xyXG4gICAgICAgIHRoaXMuZ3JvdXAgPSBncm91cElkO1xyXG4gICAgfVxyXG4gICAgZ2V0TWFzcygpIHtcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIH1cclxuICAgIGdldEludmVyc2VNYXNzKCkge1xyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgfVxyXG4gICAgZ2V0VHJhbnNsYXRpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29sbGlkZXIoKS5nZXRUcmFuc2xhdGlvbigpO1xyXG4gICAgfVxyXG4gICAgZ2V0Q29sbGlkZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sbGlkZXI7XHJcbiAgICB9XHJcbiAgICBpc1N0YXRpYygpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGdldFJvdGF0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldENvbGxpZGVyKCkuZ2V0Um1hdHJpeCgpO1xyXG4gICAgfVxyXG4gICAgZ2V0VmVsb2NpdHkoKSB7XHJcbiAgICAgICAgcmV0dXJuIFswLCAwLCAwXTtcclxuICAgIH1cclxuICAgIGdldEFjY2VsZXJhdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gWzAsIDAsIDBdO1xyXG4gICAgfVxyXG4gICAgZ2V0QW5ndWxhclZlbG9jaXR5KCkge1xyXG4gICAgICAgIHJldHVybiBbMCwgMCwgMF07XHJcbiAgICB9XHJcbiAgICBnZXRGcmljdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mcmljdGlvbjtcclxuICAgIH1cclxuICAgIGdldEludmVyc2VJbmVydGlhVGVuc29yKCkge1xyXG4gICAgICAgIHJldHVybiBtMy5pZGVudGl0eSgpO1xyXG4gICAgfVxyXG4gICAgZ2V0QUFCQigpIHtcclxuICAgICAgICBjb25zdCBhYWJiID0gdGhpcy5jb2xsaWRlci5nZXRBQUJCKCk7XHJcbiAgICAgICAgY29uc3QgdHIgPSBbUklHSURfQk9EWV9BQUJCX0JJQVMsIFJJR0lEX0JPRFlfQUFCQl9CSUFTLCBSSUdJRF9CT0RZX0FBQkJfQklBU107XHJcbiAgICAgICAgYWFiYi5taW4gPSB2My5kaWZmKGFhYmIubWluLCB0cik7XHJcbiAgICAgICAgYWFiYi5tYXggPSB2My5zdW0oYWFiYi5tYXgsIHRyKTtcclxuICAgICAgICByZXR1cm4gYWFiYjtcclxuICAgIH1cclxuICAgIGFkZFZlbG9jaXR5KHYpIHtcclxuICAgIH1cclxuICAgIGFkZEFuZ3VsYXJWZWxvY2l0eSh2KSB7XHJcbiAgICB9XHJcbiAgICBhZGRBY2NlbGVyYXRpb24odikge1xyXG4gICAgfVxyXG4gICAgdHJhbnNsYXRlKHRyYW5zbGF0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlci50cmFuc2xhdGUodHJhbnNsYXRpb24pO1xyXG4gICAgICAgIHRoaXMuZW1pdFVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgcm90YXRlKHJvdGF0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlci5yb3RhdGUocm90YXRpb24pO1xyXG4gICAgICAgIHRoaXMuZW1pdFVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgc2V0SWQoaWQpIHtcclxuICAgIH1cclxuICAgIHNldE1hc3MobWFzcykge1xyXG4gICAgfVxyXG4gICAgc2V0RnJpY3Rpb24oZikge1xyXG4gICAgICAgIHRoaXMuZnJpY3Rpb24gPSBmO1xyXG4gICAgfVxyXG4gICAgc2V0Um90YXRpb24ocikge1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXIuc2V0Um90YXRpb24ocik7XHJcbiAgICAgICAgdGhpcy5lbWl0VXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICBzZXRUcmFuc2xhdGlvbih0KSB7XHJcbiAgICAgICAgdGhpcy5lbWl0VXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICBzZXRWZWxvY2l0eSh2KSB7XHJcbiAgICB9XHJcbiAgICBzZXRBbmd1bGFyVmVsb2NpdHkodikge1xyXG4gICAgfVxyXG4gICAgc2V0U3RhdGljKGIpIHtcclxuICAgIH1cclxuICAgIGludGVncmF0ZVJLNChkdCkge1xyXG4gICAgfVxyXG4gICAgaW50ZWdyYXRlUHNldWRvVmVsb2NpdGllcyhkdCkge1xyXG4gICAgfVxyXG4gICAgYWRkUHNldWRvVmVsb2NpdHkodikge1xyXG4gICAgfVxyXG4gICAgYWRkUHNldWRvQW5ndWxhclYodikge1xyXG4gICAgfVxyXG4gICAgaW50ZWdyYXRlVmVsb2NpdGllcyhkdCkge1xyXG4gICAgfVxyXG4gICAgaW50ZWdyYXRlRm9yY2VzKGR0KSB7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVJbnZlcnNlSW5lcnRpYSgpIHtcclxuICAgIH1cclxuICAgIGFwcGx5SW1wdWxzZShpbXB1bHNlLCBwb2ludCkge1xyXG4gICAgfVxyXG4gICAgYXBwbHlQc2V1ZG9JbXB1bHNlKGltcHVsc2UsIHBvaW50KSB7XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgYXBwbHlBbmd1bGFySW1wdWxzZShyYWRpdXMgOiBudW1iZXIsIGF4aXMsIHZhbHVlKSB7XHJcbiAgICAgIGNvbnN0IGRpciA9IG5vcm1hbGl6ZShbXHJcbiAgICAgICAgYXhpc1sxXSArIGF4aXNbMl0sXHJcbiAgICAgICAgYXhpc1syXSAtIGF4aXNbMF0sXHJcbiAgICAgICAgLWF4aXNbMF0gLSBheGlzWzFdLFxyXG4gICAgICBdKTtcclxuICAgICAgY29uc3QgcmFkID0gdmVjdG9yLmNyb3NzKGRpciwgYXhpcyk7XHJcbiAgICAgIGNvbnN0IGdsb2JhbERpciA9IHNjYWxlKGRpciwgdmFsdWUpO1xyXG4gICAgICBjb25zdCBnbG9iYWxSYWQgPSBzY2FsZShyYWQsIHJhZGl1cyk7XHJcbiAgXHJcbiAgICAgIHRoaXMuYXBwbHlJbXB1bHNlKGdsb2JhbERpciwgZ2xvYmFsUmFkKTtcclxuICAgIH0qL1xyXG4gICAgb25VcGRhdGUoZnVuYykge1xyXG4gICAgICAgIGlmICh0aGlzLnVwZGF0ZUV2ZW50RnVuY3Rpb25zLmluZGV4T2YoZnVuYykgPiAtMSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMudXBkYXRlRXZlbnRGdW5jdGlvbnMucHVzaChmdW5jKTtcclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50RnVuY3Rpb25zLmZpbHRlcihmbiA9PiBmbiAhPT0gZnVuYyk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGVtaXRVcGRhdGUoKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVFdmVudEZ1bmN0aW9ucy5mb3JFYWNoKGZuID0+IHtcclxuICAgICAgICAgICAgZm4oKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5UZXJyYWluU2VnbWVudC5pZCA9IDA7XHJcbi8qXHJcbmNsYXNzIFBsYXllciBleHRlbmRzIFJpZ2lkQm9keSB7XHJcbiAgY29uc3RydWN0b3IoY29sbGlkZXIgOiBJQ29sbGlkZXIpIHtcclxuICAgIHN1cGVyKGNvbGxpZGVyKTtcclxuICAgIHRoaXMuZnJpY3Rpb24gPSAwLjM7XHJcbiAgICBcclxuICB9XHJcbiAgYXBwbHlJbXB1bHNlKGltcHVsc2UgOiB2ZWMzLCBwb2ludCA6IHZlYzMpIHtcclxuICAgIHRoaXMudmVsb2NpdHkgPSB2My5zdW0odGhpcy52ZWxvY2l0eSwgdjMuc2NhbGUoaW1wdWxzZSwgdGhpcy5pbnZlcnNlTWFzcykpO1xyXG4gIH1cclxuICBhcHBseVBzZXVkb0ltcHVsc2UoaW1wdWxzZSA6IHZlYzMpIHtcclxuICAgIHRoaXMucHNldWRvVmVsb2NpdHkgPSB2My5zdW0oXHJcbiAgICAgIHRoaXMucHNldWRvVmVsb2NpdHksXHJcbiAgICAgIHYzLnNjYWxlKGltcHVsc2UsIHRoaXMuaW52ZXJzZU1hc3MpXHJcbiAgICApO1xyXG4gIH1cclxuICBcclxuICBcclxufVxyXG4qL1xyXG5leHBvcnQgeyBSaWdpZEJvZHksIFRlcnJhaW5TZWdtZW50IH07XHJcbiIsImltcG9ydCBUcmVlIGZyb20gXCIuL1RyZWVcIjtcclxuLy9pbXBvcnQgeyBnZXRDb250YWN0cyBhcyBnamsgfSBmcm9tIFwiLi9namtcIjtcclxuaW1wb3J0IGdqayBmcm9tIFwiLi9nZXRDb2xsaXNpb25GZWF0dXJlc1wiO1xyXG5pbXBvcnQgQ29udGFjdE1hbmlmb2xkIGZyb20gXCIuL0NvbnRhY3RNYW5pZm9sZFwiO1xyXG5pbXBvcnQgU3lzdGVtIGZyb20gXCIuL1N5c3RlbVwiO1xyXG4vL2ltcG9ydCBJU3BhdGlhbENvbnRhaW5lciBmcm9tIFwiLi9tb2RlbHMvSVNwYXRpYWxDb250YWluZXJcIjtcclxuY29uc3Qgc2FtZUdyb3VwID0gKGJvZHkxLCBib2R5MikgPT4ge1xyXG4gICAgaWYgKCFib2R5MS5nZXRHcm91cCgpKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIGlmICghYm9keTIuZ2V0R3JvdXAoKSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICByZXR1cm4gYm9keTEuZ2V0R3JvdXAoKSA9PT0gYm9keTIuZ2V0R3JvdXAoKTtcclxufTtcclxuY29uc3QgcGFpckhhc2ggPSAoeCwgeSkgPT4geCA9PT0gTWF0aC5tYXgoeCwgeSkgPyB4ICogeCArIHggKyB5IDogeSAqIHkgKyB4ICsgeTtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2ltdWxhdGlvbiB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmR5bmFtaWNPYmplY3RzID0gW107XHJcbiAgICAgICAgdGhpcy5fc3RhdGljT2JqZWN0cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZHluYW1pY09iamVjdHNUcmVlID0gbmV3IFRyZWUoKTtcclxuICAgICAgICB0aGlzLnN0YXRpY09iamVjdHNUcmVlID0gbmV3IFRyZWUoKTtcclxuICAgICAgICB0aGlzLmR5bmFtaWNPYmplY3RzVHJlZS5zZXRLZXkoKHJpZ2lkQm9keSkgPT4gcmlnaWRCb2R5LmdldENvbGxpZGVyKCkuZ2V0SWQoKSk7XHJcbiAgICAgICAgdGhpcy5zdGF0aWNPYmplY3RzVHJlZS5zZXRLZXkoKHJpZ2lkQm9keSkgPT4gcmlnaWRCb2R5LmdldENvbGxpZGVyKCkuZ2V0SWQoKSk7XHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb25zID0gW107XHJcbiAgICAgICAgdGhpcy5jb25zdHJhaW50cyA9IG5ldyBNYXAoKTtcclxuICAgICAgICB0aGlzLnVzZUNhY2hlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNvbnRhY3RNYW5pZm9sZHMgPSBuZXcgTWFwKCk7XHJcbiAgICB9XHJcbiAgICBnZXRDb250YWN0TWFuaWZvbGQoaWQxLCBpZDIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb250YWN0TWFuaWZvbGRzLmdldChpZDEgPT09IE1hdGgubWF4KGlkMSwgaWQyKSA/IGlkMSAqIGlkMSArIGlkMSArIGlkMiA6IGlkMiAqIGlkMiArIGlkMSArIGlkMik7XHJcbiAgICB9XHJcbiAgICBhZGRDb250YWN0TWFuaWZvbGQoaWQxLCBpZDIsIG1hbmlmb2xkKSB7XHJcbiAgICAgICAgdGhpcy5jb250YWN0TWFuaWZvbGRzLnNldChpZDEgPT09IE1hdGgubWF4KGlkMSwgaWQyKSA/IGlkMSAqIGlkMSArIGlkMSArIGlkMiA6IGlkMiAqIGlkMiArIGlkMSArIGlkMiwgbWFuaWZvbGQpO1xyXG4gICAgfVxyXG4gICAgYWRkT2JqZWN0KG9iamVjdCkge1xyXG4gICAgICAgIGNvbnN0IHsgZHluYW1pY09iamVjdHNUcmVlLCBvYmplY3RzLCBzdGF0aWNPYmplY3RzVHJlZSB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCBhYWJiID0gb2JqZWN0LmdldEFBQkIoKTtcclxuICAgICAgICBpZiAob2JqZWN0LmlzU3RhdGljKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RhdGljT2JqZWN0cy5wdXNoKG9iamVjdCk7XHJcbiAgICAgICAgICAgIHN0YXRpY09iamVjdHNUcmVlLmluc2VydChvYmplY3QpO1xyXG4gICAgICAgICAgICBvYmplY3Qub25VcGRhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3RhdGljT2JqZWN0c1RyZWUucmVtb3ZlKG9iamVjdC5nZXRDb2xsaWRlcigpLmdldElkKCkpO1xyXG4gICAgICAgICAgICAgICAgc3RhdGljT2JqZWN0c1RyZWUuaW5zZXJ0KG9iamVjdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGR5bmFtaWNPYmplY3RzVHJlZS5pbnNlcnQob2JqZWN0KTtcclxuICAgICAgICB0aGlzLmR5bmFtaWNPYmplY3RzLnB1c2gob2JqZWN0KTtcclxuICAgICAgICBvYmplY3Qub25VcGRhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICBkeW5hbWljT2JqZWN0c1RyZWUucmVtb3ZlKG9iamVjdC5nZXRDb2xsaWRlcigpLmdldElkKCkpO1xyXG4gICAgICAgICAgICBkeW5hbWljT2JqZWN0c1RyZWUuaW5zZXJ0KG9iamVjdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBhZGRDb25zdHJhaW50cyhjb25zdHJhaW50cywgbmFtZSkge1xyXG4gICAgICAgIHRoaXMuY29uc3RyYWludHMuc2V0KG5hbWUsIFsuLi5jb25zdHJhaW50c10pO1xyXG4gICAgfVxyXG4gICAgYWRkUG9zaXRpb25Db25zdHJhaW50cyhjb25zdHJhaW50cywgbmFtZSkge1xyXG4gICAgICAgIHRoaXMucG9zaXRpb25Db25zdHJhaW50cy5zZXQobmFtZSwgWy4uLmNvbnN0cmFpbnRzXSk7XHJcbiAgICB9XHJcbiAgICByZW1vdmVPYmplY3Qob2JqZWN0KSB7XHJcbiAgICAgICAgdGhpcy5keW5hbWljT2JqZWN0c1RyZWUucmVtb3ZlKG9iamVjdC5nZXRDb2xsaWRlcigpLmdldElkKCkpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlY29udGFjdE1hbmlmb2xkcygpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IFtoYXNoLCBtYW5pZm9sZF0gb2YgdGhpcy5jb250YWN0TWFuaWZvbGRzKSB7XHJcbiAgICAgICAgICAgIG1hbmlmb2xkLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICBpZiAoIW1hbmlmb2xkLmtlZXApXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhY3RNYW5pZm9sZHMuZGVsZXRlKGhhc2gpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHVwZGF0ZUR5bmFtaWNDb2xsaXNpb25zKCkge1xyXG4gICAgICAgIGNvbnN0IGNvbGxpc2lvbnMgPSB0aGlzLmR5bmFtaWNPYmplY3RzVHJlZS5nZXRDb2xsaXNpb25zUGFpcnMoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbiA9IGNvbGxpc2lvbnMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhaXIgPSBjb2xsaXNpb25zW2ldO1xyXG4gICAgICAgICAgICBpZiAoc2FtZUdyb3VwKHBhaXJbMF0sIHBhaXJbMV0pKVxyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIGNvbnN0IGhhc2ggPSBwYWlySGFzaChwYWlyWzBdLmdldENvbGxpZGVyKCkuZ2V0SWQoKSwgcGFpclsxXS5nZXRDb2xsaWRlcigpLmdldElkKCkpO1xyXG4gICAgICAgICAgICBsZXQgbWFuaWZvbGQgPSB0aGlzLmNvbnRhY3RNYW5pZm9sZHMuZ2V0KGhhc2gpO1xyXG4gICAgICAgICAgICBpZiAobWFuaWZvbGQpXHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgY29uc3QgZmVhdHVyZXMgPSBnamsocGFpclswXS5nZXRDb2xsaWRlcigpLCBwYWlyWzFdLmdldENvbGxpZGVyKCkpO1xyXG4gICAgICAgICAgICBpZiAoZmVhdHVyZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWN0TWFuaWZvbGRzLnNldChoYXNoLCBDb250YWN0TWFuaWZvbGQuZnJvbUZlYXR1cmVzQXJyYXkocGFpclswXSwgcGFpclsxXSwgZmVhdHVyZXMpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHVwZGF0ZUNvbGxpc2lvbnMoKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVjb250YWN0TWFuaWZvbGRzKCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVEeW5hbWljQ29sbGlzaW9ucygpO1xyXG4gICAgICAgIHRoaXMuZHluYW1pY09iamVjdHMuZm9yRWFjaCgoYm9keTEpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgYWFiYiA9IGJvZHkxLmdldEFBQkIoKTtcclxuICAgICAgICAgICAgY29uc3QgY29sbGlzaW9ucyA9IHRoaXMuc3RhdGljT2JqZWN0c1RyZWUucXVlcnkoYWFiYik7XHJcbiAgICAgICAgICAgIC8vdHJlZS5lbGVtZW50cy5nZXQoYm9keTEuZ2V0Q29sbGlkZXIoKS5nZXRJZCgpKS5pc0NoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMCwgbiA9IGNvbGxpc2lvbnMubGVuZ3RoOyBqIDwgbjsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBib2R5MiA9IGNvbGxpc2lvbnNbal07XHJcbiAgICAgICAgICAgICAgICBpZiAoYm9keTEgPT09IGJvZHkyKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGFzaCA9IHBhaXJIYXNoKGJvZHkxLmdldENvbGxpZGVyKCkuZ2V0SWQoKSwgYm9keTIuZ2V0Q29sbGlkZXIoKS5nZXRJZCgpKTtcclxuICAgICAgICAgICAgICAgIGxldCBtYW5pZm9sZCA9IHRoaXMuY29udGFjdE1hbmlmb2xkcy5nZXQoaGFzaCk7XHJcbiAgICAgICAgICAgICAgICAvL2lmIChtYW5pZm9sZCkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBpZiAobWFuaWZvbGQpXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmZWF0dXJlcyA9IGdqayhib2R5MS5nZXRDb2xsaWRlcigpLCBib2R5Mi5nZXRDb2xsaWRlcigpKTtcclxuICAgICAgICAgICAgICAgIGlmIChmZWF0dXJlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250YWN0TWFuaWZvbGRzLnNldChoYXNoLCBDb250YWN0TWFuaWZvbGQuZnJvbUZlYXR1cmVzQXJyYXkoYm9keTEsIGJvZHkyLCBmZWF0dXJlcykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5keW5hbWljT2JqZWN0c1RyZWUuc2V0VW5jaGVja2VkKCk7XHJcbiAgICAgICAgdGhpcy5zdGF0aWNPYmplY3RzVHJlZS5zZXRVbmNoZWNrZWQoKTtcclxuICAgIH1cclxuICAgIHRpY2soZHQpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUNvbGxpc2lvbnMoKTtcclxuICAgICAgICBjb25zdCB7IG9iamVjdHMsIGNvbnRhY3RNYW5pZm9sZHMgfSA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5keW5hbWljT2JqZWN0cy5mb3JFYWNoKChib2R5KSA9PiBib2R5LmludGVncmF0ZUZvcmNlcyhkdCkpO1xyXG4gICAgICAgIGNvbnN0IHN5c3RlbSA9IG5ldyBTeXN0ZW0oKTtcclxuICAgICAgICBzeXN0ZW0udXNlQ2FjaGUgPSB0aGlzLnVzZUNhY2hlO1xyXG4gICAgICAgIGNvbnN0IGZyaWN0aW9uU3lzdGVtID0gbmV3IFN5c3RlbShmYWxzZSk7XHJcbiAgICAgICAgY29uc3QgY29udGFjdEVxdWF0aW9ucyA9IFtdO1xyXG4gICAgICAgIGNvbnN0IGZyaWN0aW9uRXF1YXRpb25zID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgW2tleSwgbWFuaWZvbGRdIG9mIGNvbnRhY3RNYW5pZm9sZHMpIHtcclxuICAgICAgICAgICAgY29uc3QgdXNlVmVsb2NpdHlCaWFzID0gbWFuaWZvbGQuY29udGFjdHMubGVuZ3RoIDwgMjtcclxuICAgICAgICAgICAgbWFuaWZvbGQuY29udGFjdHMuZm9yRWFjaCgoY29udGFjdENvbnN0cmFpbnQsIF9pKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb250YWN0RXF1YXRpb24gPSBjb250YWN0Q29uc3RyYWludC5nZXRFcXVhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgW2ZFcXVhdGlvbjEsIGZFcXVhdGlvbjJdID0gY29udGFjdENvbnN0cmFpbnQuZ2V0RnJpY3Rpb25FcXVhdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgIGNvbnRhY3RFcXVhdGlvbnMucHVzaChjb250YWN0RXF1YXRpb24pO1xyXG4gICAgICAgICAgICAgICAgZnJpY3Rpb25FcXVhdGlvbnMucHVzaChmRXF1YXRpb24xLCBmRXF1YXRpb24yKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN5c3RlbS5hZGRFcXVhdGlvbnMoY29udGFjdEVxdWF0aW9ucyk7XHJcbiAgICAgICAgZm9yIChsZXQgW25hbWUsIGNvbnN0cmFpbnRzXSBvZiB0aGlzLmNvbnN0cmFpbnRzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVxdWF0aW9ucyA9IFtdO1xyXG4gICAgICAgICAgICBjb25zdHJhaW50cy5mb3JFYWNoKChjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZXF1YXRpb24gPSBjLmdldEVxdWF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBlcXVhdGlvbnMucHVzaChlcXVhdGlvbik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzeXN0ZW0uYWRkRXF1YXRpb25zKGVxdWF0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vc3lzdGVtLnVwZGF0ZUVxdWF0aW9ucyhkdCk7XHJcbiAgICAgICAgZnJpY3Rpb25TeXN0ZW0uYWRkRXF1YXRpb25zKGZyaWN0aW9uRXF1YXRpb25zKTtcclxuICAgICAgICBmcmljdGlvblN5c3RlbS51cGRhdGVFcXVhdGlvbnMoZHQpO1xyXG4gICAgICAgIGZyaWN0aW9uU3lzdGVtLmdlbmVyYXRlU3lzdGVtKGR0KTtcclxuICAgICAgICBmcmljdGlvblN5c3RlbS5zb2x2ZVBHUyhkdCk7XHJcbiAgICAgICAgc3lzdGVtLnVwZGF0ZUVxdWF0aW9ucyhkdCk7XHJcbiAgICAgICAgc3lzdGVtLmdlbmVyYXRlU3lzdGVtKGR0KTtcclxuICAgICAgICBjb25zdCBsYW1iZGEgPSBzeXN0ZW0uc29sdmVQR1MoZHQsIHRydWUpO1xyXG4gICAgICAgIGNvbnN0IGxlbiA9IGZyaWN0aW9uRXF1YXRpb25zLmxlbmd0aCAvIDI7XHJcbiAgICAgICAgLypmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICBmcmljdGlvbkVxdWF0aW9uc1syICogaV0ubGFtYmRhTWluICo9IGxhbWJkYVtpXTtcclxuICAgICAgICAgIGZyaWN0aW9uRXF1YXRpb25zWzIgKiBpXS5sYW1iZGFNYXggPSBsYW1iZGFbaV07XHJcbiAgICAgICAgICBmcmljdGlvbkVxdWF0aW9uc1syICogaSArIDFdLmxhbWJkYU1pbiAqPSBsYW1iZGFbaV07XHJcbiAgICAgICAgICBmcmljdGlvbkVxdWF0aW9uc1syICogaSArIDFdLmxhbWJkYU1heCA9IGxhbWJkYVtpXTtcclxuICAgICAgICB9Ki9cclxuICAgICAgICB0aGlzLmR5bmFtaWNPYmplY3RzLmZvckVhY2goKG9iamVjdCkgPT4gb2JqZWN0LnVwZGF0ZUludmVyc2VJbmVydGlhKCkpO1xyXG4gICAgICAgIHRoaXMuZHluYW1pY09iamVjdHMuZm9yRWFjaCgob2JqZWN0KSA9PiBvYmplY3QuaW50ZWdyYXRlVmVsb2NpdGllcyhkdCkpO1xyXG4gICAgICAgIGxldCBuZHggPSAwO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCBtYW5pZm9sZF0gb2YgdGhpcy5jb250YWN0TWFuaWZvbGRzKSB7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIG1hbmlmb2xkLmNvbnRhY3RzLmZvckVhY2goKGMpID0+IHtcclxuICAgICAgICAgICAgYy5wcmV2TGFtYmRhID0gbGFtYmRhW25keF1cclxuICAgICAgICAgICAgbmR4Kys7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9Ki9cclxuICAgICAgICAvKlxyXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uU3lzdGVtID0gbmV3IFN5c3RlbSgpO1xyXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uQ29uc3RyYWludHMgPSBbXTtcclxuICAgIFxyXG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgbWFuaWZvbGRdIG9mIG1hbmlmb2xkcykge1xyXG4gICAgICAgICAgY29uc3QgeyBjb250YWN0cyB9ID0gbWFuaWZvbGQ7XHJcbiAgICAgICAgICBpZiAoY29udGFjdHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICBwb3NpdGlvbkNvbnN0cmFpbnRzLnB1c2goXHJcbiAgICAgICAgICAgICAgLi4uY29udGFjdHMubWFwKChjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7XHJcbiAgICAgICAgICAgICAgICAgIGJvZHkxLFxyXG4gICAgICAgICAgICAgICAgICBib2R5MixcclxuICAgICAgICAgICAgICAgICAgcmFMb2NhbCxcclxuICAgICAgICAgICAgICAgICAgcmJMb2NhbCxcclxuICAgICAgICAgICAgICAgICAgcmEsXHJcbiAgICAgICAgICAgICAgICAgIHJiLFxyXG4gICAgICAgICAgICAgICAgICBpLFxyXG4gICAgICAgICAgICAgICAgICBqLFxyXG4gICAgICAgICAgICAgICAgICBwZW5EZXB0aCxcclxuICAgICAgICAgICAgICAgICAgbixcclxuICAgICAgICAgICAgICAgIH0gPSBjO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29uc3RyYWludCA9IG5ldyBQb3NpdGlvbkNvbnN0cmFpbnQoXHJcbiAgICAgICAgICAgICAgICAgIGJvZHkxLFxyXG4gICAgICAgICAgICAgICAgICBib2R5MixcclxuICAgICAgICAgICAgICAgICAgbixcclxuICAgICAgICAgICAgICAgICAgcmEsXHJcbiAgICAgICAgICAgICAgICAgIHJiLFxyXG4gICAgICAgICAgICAgICAgICByYUxvY2FsLFxyXG4gICAgICAgICAgICAgICAgICByYkxvY2FsLFxyXG4gICAgICAgICAgICAgICAgICAwLjEsXHJcbiAgICAgICAgICAgICAgICAgIDAuMDAwMSxcclxuICAgICAgICAgICAgICAgICAgcGVuRGVwdGhcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb25zdHJhaW50O1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBvc2l0aW9uU3lzdGVtLmFkZENvbnN0cmFpbnQocG9zaXRpb25Db25zdHJhaW50cyk7XHJcbiAgICAgICAgZm9yIChsZXQgW25hbWUsIGNvbnN0cmFpbnRzXSBvZiB0aGlzLnBvc2l0aW9uQ29uc3RyYWludHMpIHtcclxuICAgICAgICAgIHBvc2l0aW9uU3lzdGVtLmFkZENvbnN0cmFpbnQoY29uc3RyYWludHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwb3NpdGlvblN5c3RlbS51cGRhdGVFcXVhdGlvbnMoZHQpO1xyXG4gICAgICAgIHBvc2l0aW9uU3lzdGVtLmdlbmVyYXRlU3lzdGVtKGR0KTtcclxuICAgIFxyXG4gICAgICAgIHBvc2l0aW9uU3lzdGVtLnNvbHZlUEdTKGR0KTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbiA9IHRoaXMub2JqZWN0cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgIHRoaXMub2JqZWN0c1tpXS5pbnRlZ3JhdGVQc2V1ZG9WZWxvY2l0aWVzKGR0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLmZvckVhY2goKG9iamVjdCkgPT4gb2JqZWN0LnVwZGF0ZUludmVyc2VJbmVydGlhKCkpOyovXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgdjMgfSBmcm9tIFwicm9tYW5wcHBtYXRoXCI7XHJcbmltcG9ydCBjb25maWcgZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCBEZWJ1ZyBmcm9tIFwiLi9EZWJ1Z1wiO1xyXG5sZXQgYXJyID0gW107XHJcbmxldCBvID0gMDtcclxubGV0IGYgPSB0cnVlO1xyXG5jb25zdCBfbG9nID0gKHZhbCkgPT4ge1xyXG4gICAgbysrO1xyXG4gICAgaWYgKGYpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhhcnIpO1xyXG4gICAgICAgIGYgPSBmYWxzZTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAobyA8IDIwMCAmJiBvICUgMTAgPT0gMCkge1xyXG4gICAgICAgIGFyci5wdXNoKHZhbCk7XHJcbiAgICB9XHJcbn07XHJcbmNvbnN0IHsgU09MVkVSX0lURVJBVElPTlNfTlVNIH0gPSBjb25maWc7XHJcbmNvbnN0IG51bGxWZWMgPSBbMCwgMCwgMF07XHJcbmNvbnN0IHY2ID0ge1xyXG4gICAgZG90KGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gYVswXSAqIGJbMF0gK1xyXG4gICAgICAgICAgICBhWzFdICogYlsxXSArXHJcbiAgICAgICAgICAgIGFbMl0gKiBiWzJdICtcclxuICAgICAgICAgICAgYVszXSAqIGJbM10gK1xyXG4gICAgICAgICAgICBhWzRdICogYls0XSArXHJcbiAgICAgICAgICAgIGFbNV0gKiBiWzVdO1xyXG4gICAgfSxcclxuICAgIHNjYWxlKGEsIGZhYykge1xyXG4gICAgICAgIHJldHVybiBbYVswXSAqIGZhYywgYVsxXSAqIGZhYywgYVsyXSAqIGZhYywgYVszXSAqIGZhYywgYVs0XSAqIGZhYywgYVs1XSAqIGZhY107XHJcbiAgICB9LFxyXG4gICAgc3VtKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBhWzBdICsgYlswXSxcclxuICAgICAgICAgICAgYVsxXSArIGJbMV0sXHJcbiAgICAgICAgICAgIGFbMl0gKyBiWzJdLFxyXG4gICAgICAgICAgICBhWzNdICsgYlszXSxcclxuICAgICAgICAgICAgYVs0XSArIGJbNF0sXHJcbiAgICAgICAgICAgIGFbNV0gKyBiWzVdXHJcbiAgICAgICAgXTtcclxuICAgIH0sXHJcbiAgICBmcm9tdjMoYSwgYikge1xyXG4gICAgICAgIHJldHVybiBbLi4uYSwgLi4uYl07XHJcbiAgICB9XHJcbn07XHJcbmNvbnN0IG5vcm0gPSAodikgPT4gTWF0aC5zcXJ0KHYucmVkdWNlKChhY2MsIGVsKSA9PiBhY2MgKz0gZWwgKiBlbCwgMCkpO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTeXN0ZW0ge1xyXG4gICAgY29uc3RydWN0b3IodXNlQ2FjaGUgPSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5lcXVhdGlvbnMgPSBbXTtcclxuICAgICAgICB0aGlzLnVzZUNhY2hlID0gdXNlQ2FjaGU7XHJcbiAgICB9XHJcbiAgICBhZGRFcXVhdGlvbnMoZXF1YXRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5lcXVhdGlvbnMucHVzaCguLi5lcXVhdGlvbnMpO1xyXG4gICAgfVxyXG4gICAgZ2VuZXJhdGVCb2R5TWFwcGluZygpIHtcclxuICAgICAgICBjb25zdCBlcXVhdGlvbnMgPSB0aGlzLmVxdWF0aW9ucztcclxuICAgICAgICBjb25zdCBuID0gZXF1YXRpb25zLmxlbmd0aDtcclxuICAgICAgICBjb25zdCBib2RpZXNNYXAgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgY29uc3QgSm1hcCA9IFtdO1xyXG4gICAgICAgIGxldCBjb3VudGVyID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBlcSA9IGVxdWF0aW9uc1tpXTtcclxuICAgICAgICAgICAgbGV0IGJvZHlJbmRleDEgPSBib2RpZXNNYXAuZ2V0KGVxLmNvbnN0cmFpbnQuYm9keTEuZ2V0SWQoKSk7XHJcbiAgICAgICAgICAgIGlmIChib2R5SW5kZXgxID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGJvZHlJbmRleDEgPSBjb3VudGVyKys7XHJcbiAgICAgICAgICAgICAgICBib2RpZXNNYXAuc2V0KGVxLmNvbnN0cmFpbnQuYm9keTEuZ2V0SWQoKSwgYm9keUluZGV4MSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGJvZHlJbmRleDIgPSBib2RpZXNNYXAuZ2V0KGVxLmNvbnN0cmFpbnQuYm9keTIuZ2V0SWQoKSk7XHJcbiAgICAgICAgICAgIGlmIChib2R5SW5kZXgyID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGJvZHlJbmRleDIgPSBjb3VudGVyKys7XHJcbiAgICAgICAgICAgICAgICBib2RpZXNNYXAuc2V0KGVxLmNvbnN0cmFpbnQuYm9keTIuZ2V0SWQoKSwgYm9keUluZGV4Mik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgSm1hcC5wdXNoKGJvZHlJbmRleDEsIGJvZHlJbmRleDIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmJvZGllc01hcCA9IGJvZGllc01hcDtcclxuICAgICAgICB0aGlzLkptYXAgPSBKbWFwO1xyXG4gICAgfVxyXG4gICAgZ2VuZXJhdGVTeXN0ZW0oZGVsdGFUaW1lKSB7XHJcbiAgICAgICAgLy9OdW1lcmF0aW5nIGJvZGllc1xyXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVCb2R5TWFwcGluZygpO1xyXG4gICAgfVxyXG4gICAgLy9KICogVmVsXHJcbiAgICBzb2x2ZVBHUyhkZWx0YVRpbWUsIGxvZyA9IGZhbHNlKSB7XHJcbiAgICAgICAgY29uc3QgeyBKbWFwLCBib2RpZXNNYXAsIGVxdWF0aW9ucyB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCBudW1Cb2RpZXMgPSBib2RpZXNNYXAuc2l6ZTtcclxuICAgICAgICBjb25zdCBuID0gZXF1YXRpb25zLmxlbmd0aDtcclxuICAgICAgICBjb25zdCBkID0gW107XHJcbiAgICAgICAgY29uc3QgbGFtYmRhMCA9IG5ldyBBcnJheShuKS5maWxsKDApO1xyXG4gICAgICAgIGNvbnN0IGxhbWJkYSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxhbWJkYTBbaV0gPSBlcXVhdGlvbnNbaV0ucHJldkxhbWJkYTtcclxuICAgICAgICAgICAgbGFtYmRhW2ldID0gbGFtYmRhMFtpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgQmwgPSBuZXcgQXJyYXkobnVtQm9kaWVzKS5maWxsKG51bGxWZWMpO1xyXG4gICAgICAgIGNvbnN0IEIybCA9IG5ldyBBcnJheShudW1Cb2RpZXMpLmZpbGwobnVsbFZlYyk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgYjEgPSBKbWFwW2kgKiAyXTtcclxuICAgICAgICAgICAgY29uc3QgYjIgPSBKbWFwW2kgKiAyICsgMV07XHJcbiAgICAgICAgICAgIGNvbnN0IGVxID0gZXF1YXRpb25zW2ldO1xyXG4gICAgICAgICAgICBjb25zdCBsID0gbGFtYmRhMFtpXTtcclxuICAgICAgICAgICAgLyogQmxbYjFdID0gdjYuc3VtKHY2LnNjYWxlKFxyXG4gICAgICAgICAgICAgICBlcXVhdGlvbnNbaV0uQlswXSxcclxuICAgICAgICAgICAgICAgbGFtYmRhMFtpXSksXHJcbiAgICAgICAgICAgICAgIEJsW2IxXSkqL1xyXG4gICAgICAgICAgICBpZiAoIWVxLmNvbnN0cmFpbnQuYm9keTEuaXNTdGF0aWMoKSkge1xyXG4gICAgICAgICAgICAgICAgQmxbYjFdID0gdjMuc3VtKHYzLnNjYWxlKGVxLkpNMSwgbCksIEJsW2IxXSk7XHJcbiAgICAgICAgICAgICAgICBCMmxbYjFdID0gdjMuc3VtKHYzLnNjYWxlKGVxLkpNMiwgbCksIEIybFtiMV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghZXEuY29uc3RyYWludC5ib2R5Mi5pc1N0YXRpYygpKSB7XHJcbiAgICAgICAgICAgICAgICBCbFtiMl0gPSB2My5zdW0odjMuc2NhbGUoZXEuSk0zLCBsKSwgQmxbYjJdKTtcclxuICAgICAgICAgICAgICAgIEIybFtiMl0gPSB2My5zdW0odjMuc2NhbGUoZXEuSk00LCBsKSwgQjJsW2IyXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLypCbFtiMl0gPSB2Ni5zdW0odjYuc2NhbGUoXHJcbiAgICAgICAgICAgICAgZXF1YXRpb25zW2ldLkJbMV0sXHJcbiAgICAgICAgICAgICAgIGxhbWJkYTBbaV0pLFxyXG4gICAgICAgICAgICAgICAgQmxbYjJdKSovXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vUEdTXHJcbiAgICAgICAgbGV0IGZsYWcgPSB0cnVlO1xyXG4gICAgICAgIGxldCBudW1JdGVyID0gU09MVkVSX0lURVJBVElPTlNfTlVNO1xyXG4gICAgICAgIGNvbnN0IGRlbHRhTGFtYmRhID0gbmV3IEFycmF5KG4pO1xyXG4gICAgICAgIHdoaWxlIChudW1JdGVyID4gMCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZXEgPSBlcXVhdGlvbnNbaV07XHJcbiAgICAgICAgICAgICAgICAvL2NvbnN0IEogPSBlcS5fSlxyXG4gICAgICAgICAgICAgICAgY29uc3QgYjEgPSBKbWFwW2kgKiAyXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGIyID0gSm1hcFtpICogMiArIDFdO1xyXG4gICAgICAgICAgICAgICAgLy9kZWx0YUxhbWJkYVtpXSA9IChlcS5iaWFzIC0gdjYuZG90KEpbMF0sIEJsW2IxXSkgLSB2Ni5kb3QoSlsxXSwgQmxbYjJdKSkgLyBkW2ldXHJcbiAgICAgICAgICAgICAgICAvL2RlbHRhTGFtYmRhW2ldID0gKGVxLmJpYXMgLSB2My5kb3QoZXEuSjEsIEJsW2IxXSkgLSB2My5kb3QoZXEuSjIsIEIybFtiMV0pIC0gdjMuZG90KGVxLkozLCBCbFtiMl0pIC0gdjMuZG90KGVxLko0LCBCMmxbYjJdKSkgLyBlcXVhdGlvbnNbaV0uZWZmTWFzc1xyXG4gICAgICAgICAgICAgICAgZGVsdGFMYW1iZGFbaV0gPSBlcS5iaWFzO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFlcS5jb25zdHJhaW50LmJvZHkxLmlzU3RhdGljKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWx0YUxhbWJkYVtpXSAtPSB2My5kb3QoZXEuSjEsIEJsW2IxXSkgKyB2My5kb3QoZXEuSjIsIEIybFtiMV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFlcS5jb25zdHJhaW50LmJvZHkyLmlzU3RhdGljKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWx0YUxhbWJkYVtpXSAtPSB2My5kb3QoZXEuSjMsIEJsW2IyXSkgKyB2My5kb3QoZXEuSjQsIEIybFtiMl0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGVsdGFMYW1iZGFbaV0gLz0gZXEuZWZmTWFzcztcclxuICAgICAgICAgICAgICAgIGxhbWJkYTBbaV0gPSBsYW1iZGFbaV07XHJcbiAgICAgICAgICAgICAgICBsYW1iZGFbaV0gPSBNYXRoLm1heChlcS5sYW1iZGFNaW4sIE1hdGgubWluKGxhbWJkYTBbaV0gKyBkZWx0YUxhbWJkYVtpXSwgZXEubGFtYmRhTWF4KSk7XHJcbiAgICAgICAgICAgICAgICBkZWx0YUxhbWJkYVtpXSA9IGxhbWJkYVtpXSAtIGxhbWJkYTBbaV07XHJcbiAgICAgICAgICAgICAgICAvL0JsW2IxXSA9IHY2LnN1bShCbFtiMV0sIHY2LnNjYWxlKGVxLkJbMF0sIGRlbHRhTGFtYmRhW2ldKSlcclxuICAgICAgICAgICAgICAgIEJsW2IxXSA9IHYzLnN1bSh2My5zY2FsZShlcS5KTTEsIGRlbHRhTGFtYmRhW2ldKSwgQmxbYjFdKTtcclxuICAgICAgICAgICAgICAgIEIybFtiMV0gPSB2My5zdW0odjMuc2NhbGUoZXEuSk0yLCBkZWx0YUxhbWJkYVtpXSksIEIybFtiMV0pO1xyXG4gICAgICAgICAgICAgICAgLy8gQmxbYjJdID0gdjYuc3VtKEJsW2IyXSwgdjYuc2NhbGUoZXEuQlsxXSwgZGVsdGFMYW1iZGFbaV0pKVxyXG4gICAgICAgICAgICAgICAgQmxbYjJdID0gdjMuc3VtKHYzLnNjYWxlKGVxLkpNMywgZGVsdGFMYW1iZGFbaV0pLCBCbFtiMl0pO1xyXG4gICAgICAgICAgICAgICAgQjJsW2IyXSA9IHYzLnN1bSh2My5zY2FsZShlcS5KTTQsIGRlbHRhTGFtYmRhW2ldKSwgQjJsW2IyXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbnVtSXRlci0tO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobG9nKVxyXG4gICAgICAgICAgICBEZWJ1Zy5kYXRhLlNPTFZFUl9FUlJPUiA9IG5vcm0oZGVsdGFMYW1iZGEpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGVxdWF0aW9uc1tpXS5hcHBseUltcHVsc2UobGFtYmRhW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxhbWJkYTtcclxuICAgIH1cclxuICAgIHVwZGF0ZUVxdWF0aW9ucyhkZWx0YVRpbWUpIHtcclxuICAgICAgICBjb25zdCB7IGVxdWF0aW9ucyB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCBuID0gZXF1YXRpb25zLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBlcXVhdGlvbnNbaV0udXBkYXRlTGVmdFBhcnQoZGVsdGFUaW1lKTtcclxuICAgICAgICAgICAgZXF1YXRpb25zW2ldLnVwZGF0ZVJpZ2h0UGFydChkZWx0YVRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGFwcGx5UmVzb2x2aW5nSW1wdWxzZXMobGFtYmRhKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSB0aGlzLmVxdWF0aW9ucy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5lcXVhdGlvbnNbaV0uYXBwbHlJbXB1bHNlKGxhbWJkYVtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYXBwbHlSZXNvbHZpbmdQc2V1ZG9JbXB1bHNlcyhsYW1iZGEpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbiA9IHRoaXMuZXF1YXRpb25zLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmVxdWF0aW9uc1tpXS5hcHBseVBzZXVkb0ltcHVsc2UobGFtYmRhW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuU3lzdGVtLnVzZUNhY2hlID0gdHJ1ZTtcclxuIiwiaW1wb3J0IEFBQkIgZnJvbSBcIi4vQUFCQlwiO1xyXG5jb25zdCBnZXRCb3VuZEFhYmIgPSAoYWFiYjEsIGFhYmIyKSA9PiB7XHJcbiAgICBjb25zdCB4MSA9IGFhYmIxLm1pblswXSA8IGFhYmIyLm1pblswXSA/IGFhYmIxLm1pblswXSA6IGFhYmIyLm1pblswXTtcclxuICAgIGNvbnN0IHgyID0gYWFiYjEubWF4WzBdID4gYWFiYjIubWF4WzBdID8gYWFiYjEubWF4WzBdIDogYWFiYjIubWF4WzBdO1xyXG4gICAgY29uc3QgeTEgPSBhYWJiMS5taW5bMV0gPCBhYWJiMi5taW5bMV0gPyBhYWJiMS5taW5bMV0gOiBhYWJiMi5taW5bMV07XHJcbiAgICBjb25zdCB5MiA9IGFhYmIxLm1heFsxXSA+IGFhYmIyLm1heFsxXSA/IGFhYmIxLm1heFsxXSA6IGFhYmIyLm1heFsxXTtcclxuICAgIGNvbnN0IHoxID0gYWFiYjEubWluWzJdIDwgYWFiYjIubWluWzJdID8gYWFiYjEubWluWzJdIDogYWFiYjIubWluWzJdO1xyXG4gICAgY29uc3QgejIgPSBhYWJiMS5tYXhbMl0gPiBhYWJiMi5tYXhbMl0gPyBhYWJiMS5tYXhbMl0gOiBhYWJiMi5tYXhbMl07XHJcbiAgICByZXR1cm4gbmV3IEFBQkIoW3gxLCB5MSwgejFdLCBbeDIsIHkyLCB6Ml0pO1xyXG59O1xyXG5jb25zdCBpc0NvbGxpZGUgPSAoYWFiYjEsIGFhYmIyKSA9PiB7XHJcbiAgICBpZiAoYWFiYjEubWluWzBdIDw9IGFhYmIyLm1heFswXSAmJlxyXG4gICAgICAgIGFhYmIxLm1heFswXSA+PSBhYWJiMi5taW5bMF0gJiZcclxuICAgICAgICBhYWJiMS5taW5bMV0gPD0gYWFiYjIubWF4WzFdICYmXHJcbiAgICAgICAgYWFiYjEubWF4WzFdID49IGFhYmIyLm1pblsxXSAmJlxyXG4gICAgICAgIGFhYmIxLm1pblsyXSA8PSBhYWJiMi5tYXhbMl0gJiZcclxuICAgICAgICBhYWJiMS5tYXhbMl0gPj0gYWFiYjIubWluWzJdKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcbmNvbnN0IGdldFNpemUgPSAoYWFiYikgPT4ge1xyXG4gICAgY29uc3QgYXJlYSA9IE1hdGguYWJzKGFhYmIubWF4WzBdIC0gYWFiYi5taW5bMF0pICpcclxuICAgICAgICBNYXRoLmFicyhhYWJiLm1heFsxXSAtIGFhYmIubWluWzFdKSAqXHJcbiAgICAgICAgTWF0aC5hYnMoYWFiYi5tYXhbMl0gLSBhYWJiLm1pblsyXSk7XHJcbiAgICByZXR1cm4gYXJlYTtcclxufTtcclxuY2xhc3MgTm9kZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihhYWJiLCBpc0xlYWYsIG9iamVjdCwgaWQpIHtcclxuICAgICAgICB0aGlzLmFhYmIgPSBhYWJiO1xyXG4gICAgICAgIHRoaXMuaXNMZWFmID0gaXNMZWFmO1xyXG4gICAgICAgIHRoaXMucGFyZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5sZWZ0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnJpZ2h0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmlzQ2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMub2JqZWN0ID0gb2JqZWN0O1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMDtcclxuICAgICAgICB0aGlzLnF1ZXJ5SWQgPSAwO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyZWUge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5yb290ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmVsZW1lbnRzID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIHRoaXMucXVlcnlJZCA9IDA7XHJcbiAgICAgICAgdGhpcy5nZXRJZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb25zID0gW107XHJcbiAgICB9XHJcbiAgICBzZXRLZXkoZikge1xyXG4gICAgICAgIHRoaXMuZ2V0SWQgPSBmO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlUXVlcnlJZCgpIHtcclxuICAgICAgICB0aGlzLnF1ZXJ5SWQrKztcclxuICAgIH1cclxuICAgIHNldFVuY2hlY2tlZCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMucm9vdClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IHN0YWNrID0gW3RoaXMucm9vdF07XHJcbiAgICAgICAgd2hpbGUgKHN0YWNrLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBzdGFjay5wb3AoKTtcclxuICAgICAgICAgICAgbm9kZS5pc0NoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKG5vZGUuaXNMZWFmKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobm9kZS5sZWZ0KVxyXG4gICAgICAgICAgICAgICAgc3RhY2sucHVzaChub2RlLmxlZnQpO1xyXG4gICAgICAgICAgICBpZiAobm9kZS5yaWdodClcclxuICAgICAgICAgICAgICAgIHN0YWNrLnB1c2gobm9kZS5yaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0QmVzdFNpYmxpbmcobGVhZikge1xyXG4gICAgICAgIGxldCBwb3RlbnRpYWwgPSB0aGlzLnJvb3Q7XHJcbiAgICAgICAgd2hpbGUgKCFwb3RlbnRpYWwuaXNMZWFmKSB7XHJcbiAgICAgICAgICAgIHBvdGVudGlhbC5oZWlnaHQrKztcclxuICAgICAgICAgICAgY29uc3Qgc2l6ZSA9IHBvdGVudGlhbC5hYWJiLmdldFNpemUoKTtcclxuICAgICAgICAgICAgY29uc3QgY29tYmluZWRBQUJCID0gcG90ZW50aWFsLmFhYmIubWVyZ2UobGVhZi5hYWJiKTtcclxuICAgICAgICAgICAgY29uc3QgY29tYmluZWRTaXplID0gY29tYmluZWRBQUJCLmdldFNpemUoKTtcclxuICAgICAgICAgICAgbGV0IGNvc3QgPSBjb21iaW5lZFNpemU7XHJcbiAgICAgICAgICAgIGxldCBpbmhlckNvc3QgPSBjb21iaW5lZFNpemUgLSBzaXplO1xyXG4gICAgICAgICAgICBsZXQgY29zdDE7XHJcbiAgICAgICAgICAgIGlmIChwb3RlbnRpYWwubGVmdC5pc0xlYWYpIHtcclxuICAgICAgICAgICAgICAgIGNvc3QxID0gcG90ZW50aWFsLmxlZnQuYWFiYi5nZXRTaXplKCkgKyBpbmhlckNvc3Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb3N0MSA9XHJcbiAgICAgICAgICAgICAgICAgICAgbGVhZi5hYWJiLm1lcmdlKHBvdGVudGlhbC5sZWZ0LmFhYmIpLmdldFNpemUoKSAtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvdGVudGlhbC5sZWZ0LmFhYmIuZ2V0U2l6ZSgpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5oZXJDb3N0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBjb3N0MjtcclxuICAgICAgICAgICAgaWYgKHBvdGVudGlhbC5yaWdodC5pc0xlYWYpIHtcclxuICAgICAgICAgICAgICAgIGNvc3QyID0gcG90ZW50aWFsLnJpZ2h0LmFhYmIuZ2V0U2l6ZSgpICsgaW5oZXJDb3N0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29zdDIgPVxyXG4gICAgICAgICAgICAgICAgICAgIGxlYWYuYWFiYi5tZXJnZShwb3RlbnRpYWwucmlnaHQuYWFiYikuZ2V0U2l6ZSgpIC1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcG90ZW50aWFsLnJpZ2h0LmFhYmIuZ2V0U2l6ZSgpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5oZXJDb3N0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb3N0IDwgY29zdDEgJiYgY29zdCA8IGNvc3QyKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvdGVudGlhbDtcclxuICAgICAgICAgICAgaWYgKGNvc3QxIDwgY29zdDIpIHtcclxuICAgICAgICAgICAgICAgIHBvdGVudGlhbCA9IHBvdGVudGlhbC5sZWZ0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHBvdGVudGlhbCA9IHBvdGVudGlhbC5yaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBvdGVudGlhbDtcclxuICAgIH1cclxuICAgIGluc2VydChvYmplY3QpIHtcclxuICAgICAgICBjb25zdCBhYWJiID0gb2JqZWN0LmdldEFBQkIoKTtcclxuICAgICAgICBjb25zdCBpZCA9IHRoaXMuZ2V0SWQob2JqZWN0KTtcclxuICAgICAgICBjb25zdCBsZWFmID0gbmV3IE5vZGUoYWFiYiwgdHJ1ZSwgb2JqZWN0LCBpZCk7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50cy5zZXQoaWQsIGxlYWYpO1xyXG4gICAgICAgIGlmICh0aGlzLnJvb3QgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5yb290ID0gbGVhZjtcclxuICAgICAgICAgICAgdGhpcy5yb290LmhlaWdodCA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMucm9vdC5wYXJlbnQgPSBudWxsO1xyXG4gICAgICAgICAgICByZXR1cm4gbGVhZjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc2libGluZyA9IHRoaXMuZ2V0QmVzdFNpYmxpbmcobGVhZik7XHJcbiAgICAgICAgY29uc3Qgb2xkUGFyZW50ID0gc2libGluZy5wYXJlbnQ7XHJcbiAgICAgICAgY29uc3QgbmV3UGFyZW50ID0gbmV3IE5vZGUobnVsbCwgZmFsc2UsIG51bGwsIG51bGwpO1xyXG4gICAgICAgIG5ld1BhcmVudC5wYXJlbnQgPSBvbGRQYXJlbnQ7XHJcbiAgICAgICAgbmV3UGFyZW50LmFhYmIgPSBsZWFmLmFhYmIubWVyZ2Uoc2libGluZy5hYWJiKTtcclxuICAgICAgICBuZXdQYXJlbnQuaGVpZ2h0ID0gc2libGluZy5oZWlnaHQgKyAxO1xyXG4gICAgICAgIGlmIChvbGRQYXJlbnQpIHtcclxuICAgICAgICAgICAgaWYgKG9sZFBhcmVudC5sZWZ0ID09PSBzaWJsaW5nKVxyXG4gICAgICAgICAgICAgICAgb2xkUGFyZW50LmxlZnQgPSBuZXdQYXJlbnQ7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIG9sZFBhcmVudC5yaWdodCA9IG5ld1BhcmVudDtcclxuICAgICAgICAgICAgbmV3UGFyZW50LmxlZnQgPSBzaWJsaW5nO1xyXG4gICAgICAgICAgICBuZXdQYXJlbnQucmlnaHQgPSBsZWFmO1xyXG4gICAgICAgICAgICBzaWJsaW5nLnBhcmVudCA9IG5ld1BhcmVudDtcclxuICAgICAgICAgICAgbGVhZi5wYXJlbnQgPSBuZXdQYXJlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBuZXdQYXJlbnQubGVmdCA9IHNpYmxpbmc7XHJcbiAgICAgICAgICAgIG5ld1BhcmVudC5yaWdodCA9IGxlYWY7XHJcbiAgICAgICAgICAgIHNpYmxpbmcucGFyZW50ID0gbmV3UGFyZW50O1xyXG4gICAgICAgICAgICBsZWFmLnBhcmVudCA9IG5ld1BhcmVudDtcclxuICAgICAgICAgICAgdGhpcy5yb290ID0gbmV3UGFyZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgX25vZGUgPSBsZWFmLnBhcmVudDtcclxuICAgICAgICB3aGlsZSAoX25vZGUpIHtcclxuICAgICAgICAgICAgX25vZGUgPSB0aGlzLmJhbGFuY2UoX25vZGUpO1xyXG4gICAgICAgICAgICBfbm9kZS5oZWlnaHQgPSAxICsgTWF0aC5tYXgoX25vZGUubGVmdC5oZWlnaHQsIF9ub2RlLnJpZ2h0LmhlaWdodCk7XHJcbiAgICAgICAgICAgIF9ub2RlID0gX25vZGUucGFyZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGVhZjtcclxuICAgIH1cclxuICAgIGJhbGFuY2Uobm9kZSkge1xyXG4gICAgICAgIGlmICghbm9kZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5vZGUuaXNMZWFmIHx8IG5vZGUuaGVpZ2h0IDwgMikge1xyXG4gICAgICAgICAgICBub2RlLmFhYmIgPSBub2RlLmxlZnQuYWFiYi5tZXJnZShub2RlLnJpZ2h0LmFhYmIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbGVmdCA9IG5vZGUubGVmdDtcclxuICAgICAgICBjb25zdCByaWdodCA9IG5vZGUucmlnaHQ7XHJcbiAgICAgICAgY29uc3QgYmFsYW5jZSA9IG5vZGUucmlnaHQuaGVpZ2h0IC0gbm9kZS5sZWZ0LmhlaWdodDtcclxuICAgICAgICBpZiAoYmFsYW5jZSA+IDEpIHtcclxuICAgICAgICAgICAgY29uc3QgcmlnaHRsZWZ0ID0gcmlnaHQubGVmdDtcclxuICAgICAgICAgICAgY29uc3QgcmlnaHRyaWdodCA9IHJpZ2h0LnJpZ2h0O1xyXG4gICAgICAgICAgICByaWdodC5sZWZ0ID0gbm9kZTtcclxuICAgICAgICAgICAgcmlnaHQucGFyZW50ID0gbm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gcmlnaHQ7XHJcbiAgICAgICAgICAgIGlmIChyaWdodC5wYXJlbnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJpZ2h0LnBhcmVudC5sZWZ0ID09PSBub2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQucGFyZW50LmxlZnQgPSByaWdodDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0LnBhcmVudC5yaWdodCA9IHJpZ2h0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMucm9vdCA9IHJpZ2h0O1xyXG4gICAgICAgICAgICBpZiAocmlnaHQubGVmdC5oZWlnaHQgPiByaWdodHJpZ2h0LmhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgcmlnaHQucmlnaHQgPSByaWdodGxlZnQ7XHJcbiAgICAgICAgICAgICAgICBub2RlLnJpZ2h0ID0gcmlnaHRyaWdodDtcclxuICAgICAgICAgICAgICAgIHJpZ2h0cmlnaHQucGFyZW50ID0gbm9kZTtcclxuICAgICAgICAgICAgICAgIG5vZGUuaGVpZ2h0ID0gMSArIE1hdGgubWF4KGxlZnQuaGVpZ2h0LCByaWdodHJpZ2h0LmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICByaWdodC5oZWlnaHQgPSAxICsgTWF0aC5tYXgobm9kZS5oZWlnaHQsIHJpZ2h0bGVmdC5oZWlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5yaWdodCA9IHJpZ2h0bGVmdDtcclxuICAgICAgICAgICAgICAgIHJpZ2h0bGVmdC5wYXJlbnQgPSBub2RlO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5oZWlnaHQgPSAxICsgTWF0aC5tYXgobGVmdC5oZWlnaHQsIHJpZ2h0bGVmdC5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgcmlnaHQuaGVpZ2h0ID0gMSArIE1hdGgubWF4KG5vZGUuaGVpZ2h0LCByaWdodHJpZ2h0LmhlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbm9kZS5hYWJiID0gbm9kZS5sZWZ0LmFhYmIubWVyZ2Uobm9kZS5yaWdodC5hYWJiKTtcclxuICAgICAgICAgICAgcmlnaHQuYWFiYiA9IHJpZ2h0LmxlZnQuYWFiYi5tZXJnZShyaWdodC5yaWdodC5hYWJiKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYmFsYW5jZSA8IC0xKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxlZnRsZWZ0ID0gbGVmdC5sZWZ0O1xyXG4gICAgICAgICAgICBjb25zdCBsZWZ0cmlnaHQgPSBsZWZ0LnJpZ2h0O1xyXG4gICAgICAgICAgICBsZWZ0LmxlZnQgPSBub2RlO1xyXG4gICAgICAgICAgICBsZWZ0LnBhcmVudCA9IG5vZGUucGFyZW50O1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IGxlZnQ7XHJcbiAgICAgICAgICAgIGlmIChsZWZ0LnBhcmVudCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGVmdC5wYXJlbnQubGVmdCA9PT0gbm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQucGFyZW50LmxlZnQgPSBsZWZ0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdC5wYXJlbnQucmlnaHQgPSBsZWZ0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMucm9vdCA9IGxlZnQ7XHJcbiAgICAgICAgICAgIGlmIChsZWZ0bGVmdC5oZWlnaHQgPiBsZWZ0cmlnaHQuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICBsZWZ0LnJpZ2h0ID0gbGVmdGxlZnQ7XHJcbiAgICAgICAgICAgICAgICBub2RlLmxlZnQgPSBsZWZ0cmlnaHQ7XHJcbiAgICAgICAgICAgICAgICBsZWZ0cmlnaHQucGFyZW50ID0gbm9kZTtcclxuICAgICAgICAgICAgICAgIG5vZGUuaGVpZ2h0ID0gMSArIE1hdGgubWF4KHJpZ2h0LmhlaWdodCwgbGVmdHJpZ2h0LmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBsZWZ0LmhlaWdodCA9IDEgKyBNYXRoLm1heChub2RlLmhlaWdodCwgbGVmdGxlZnQuaGVpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxlZnQucmlnaHQgPSBsZWZ0cmlnaHQ7XHJcbiAgICAgICAgICAgICAgICBub2RlLmxlZnQgPSBsZWZ0bGVmdDtcclxuICAgICAgICAgICAgICAgIGxlZnRsZWZ0LnBhcmVudCA9IG5vZGU7XHJcbiAgICAgICAgICAgICAgICBub2RlLmhlaWdodCA9IDEgKyBNYXRoLm1heChyaWdodC5oZWlnaHQsIGxlZnRsZWZ0LmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBsZWZ0LmhlaWdodCA9IDEgKyBNYXRoLm1heChub2RlLmhlaWdodCwgbGVmdHJpZ2h0LmhlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbm9kZS5hYWJiID0gbm9kZS5sZWZ0LmFhYmIubWVyZ2Uobm9kZS5yaWdodC5hYWJiKTtcclxuICAgICAgICAgICAgbGVmdC5hYWJiID0gbGVmdC5sZWZ0LmFhYmIubWVyZ2UobGVmdC5yaWdodC5hYWJiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGxlZnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5vZGUuYWFiYiA9IG5vZGUubGVmdC5hYWJiLm1lcmdlKG5vZGUucmlnaHQuYWFiYik7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcbiAgICBxdWVyeShhYWJiLCBjb2xzID0gW10pIHtcclxuICAgICAgICAvL2NvbnN0IGFhYmIgPSBvYmplY3QuZ2V0QUFCQigpO1xyXG4gICAgICAgIC8vIHRoaXMuZWxlbWVudHMuZ2V0KHRoaXMuZ2V0SWQob2JqZWN0KSkucXVlcnlJZCA9IHRoaXMucXVlcnlJZFxyXG4gICAgICAgIGNvbnN0IGl0ZXIgPSAoX25vZGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFfbm9kZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8qIGlmIChfbm9kZS5vYmplY3QgPT09IG9iamVjdCkge1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgIGlmIChhYWJiLmlzQ29sbGlkZShfbm9kZS5hYWJiKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKF9ub2RlLmlzTGVhZiAmJiAhX25vZGUuaXNDaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29scy5wdXNoKF9ub2RlLm9iamVjdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpdGVyKF9ub2RlLmxlZnQpO1xyXG4gICAgICAgICAgICAgICAgaXRlcihfbm9kZS5yaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGl0ZXIodGhpcy5yb290KTtcclxuICAgICAgICByZXR1cm4gY29scztcclxuICAgIH1cclxuICAgIHBpY2socG9pbnQsIGNvbHMgPSBbXSkge1xyXG4gICAgICAgIGNvbnN0IGl0ZXIgPSAoX25vZGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFfbm9kZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8qIGlmIChfbm9kZS5vYmplY3QgPT09IG9iamVjdCkge1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgIGlmIChfbm9kZS5hYWJiLmNvbnRhaW4ocG9pbnQpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoX25vZGUuaXNMZWFmICYmICFfbm9kZS5pc0NoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xzLnB1c2goX25vZGUub2JqZWN0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGl0ZXIoX25vZGUubGVmdCk7XHJcbiAgICAgICAgICAgICAgICBpdGVyKF9ub2RlLnJpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaXRlcih0aGlzLnJvb3QpO1xyXG4gICAgICAgIHJldHVybiBjb2xzO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlKGlkKSB7XHJcbiAgICAgICAgY29uc3QgbGVhZiA9IHRoaXMuZWxlbWVudHMuZ2V0KGlkKTtcclxuICAgICAgICBpZiAoIWxlYWYpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZiAobGVhZiA9PT0gdGhpcy5yb290KSB7XHJcbiAgICAgICAgICAgIHRoaXMucm9vdCA9IG51bGw7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcGFyZW50ID0gbGVhZi5wYXJlbnQ7XHJcbiAgICAgICAgY29uc3QgZ3JhbmRQYXJlbnQgPSBwYXJlbnQucGFyZW50O1xyXG4gICAgICAgIGxldCBzaWJsaW5nO1xyXG4gICAgICAgIGlmIChwYXJlbnQubGVmdCA9PT0gbGVhZilcclxuICAgICAgICAgICAgc2libGluZyA9IHBhcmVudC5yaWdodDtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHNpYmxpbmcgPSBwYXJlbnQubGVmdDtcclxuICAgICAgICBpZiAoZ3JhbmRQYXJlbnQpIHtcclxuICAgICAgICAgICAgaWYgKGdyYW5kUGFyZW50LmxlZnQgPT09IHBhcmVudClcclxuICAgICAgICAgICAgICAgIGdyYW5kUGFyZW50LmxlZnQgPSBzaWJsaW5nO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBncmFuZFBhcmVudC5yaWdodCA9IHNpYmxpbmc7XHJcbiAgICAgICAgICAgIHNpYmxpbmcucGFyZW50ID0gZ3JhbmRQYXJlbnQ7XHJcbiAgICAgICAgICAgIGxldCBfbm9kZSA9IGdyYW5kUGFyZW50O1xyXG4gICAgICAgICAgICB3aGlsZSAoX25vZGUpIHtcclxuICAgICAgICAgICAgICAgIF9ub2RlID0gdGhpcy5iYWxhbmNlKF9ub2RlKTtcclxuICAgICAgICAgICAgICAgIF9ub2RlLmhlaWdodCA9IDEgKyBNYXRoLm1heChfbm9kZS5yaWdodC5oZWlnaHQsIF9ub2RlLmxlZnQuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIF9ub2RlID0gX25vZGUucGFyZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJvb3QgPSBzaWJsaW5nO1xyXG4gICAgICAgICAgICBzaWJsaW5nLnBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZWxlbWVudHMuZGVsZXRlKGlkKTtcclxuICAgIH1cclxuICAgIHRvQXJyYXkobm9kZSkge1xyXG4gICAgICAgIGNvbnN0IGl0ZXIgPSAobGVhZikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWxlYWYpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChsZWFmLmlzTGVhZilcclxuICAgICAgICAgICAgICAgIHJldHVybiBsZWFmLmlkO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW2l0ZXIobGVhZi5sZWZ0KSwgaXRlcihsZWFmLnJpZ2h0KV07XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAoIW5vZGUpXHJcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLnJvb3Q7XHJcbiAgICAgICAgcmV0dXJuIGl0ZXIobm9kZSk7XHJcbiAgICB9XHJcbiAgICBnZXRDb2xsaXNpb25zUGFpcnMoKSB7XHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb25zID0gW107XHJcbiAgICAgICAgaWYgKCF0aGlzLnJvb3QgfHwgdGhpcy5yb290LmlzTGVhZilcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29sbGlzaW9ucztcclxuICAgICAgICB0aGlzLnNldFVuY2hlY2tlZCgpO1xyXG4gICAgICAgIHRoaXMuX2dldENvbGxpc2lvbnNIZWxwZXIodGhpcy5yb290LmxlZnQsIHRoaXMucm9vdC5yaWdodCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sbGlzaW9ucztcclxuICAgIH1cclxuICAgIF9nZXRDb2xsaXNpb25zSGVscGVyKG5vZGUxLCBub2RlMikge1xyXG4gICAgICAgIGlmIChub2RlMS5pc0xlYWYpIHtcclxuICAgICAgICAgICAgaWYgKG5vZGUyLmlzTGVhZikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzQ29sbGlkZShub2RlMS5hYWJiLCBub2RlMi5hYWJiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29sbGlzaW9ucy5wdXNoKFtub2RlMS5vYmplY3QsIG5vZGUyLm9iamVjdF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcm9zc0NoaWxkcmVuKG5vZGUyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2dldENvbGxpc2lvbnNIZWxwZXIobm9kZTEsIG5vZGUyLnJpZ2h0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2dldENvbGxpc2lvbnNIZWxwZXIobm9kZTEsIG5vZGUyLmxlZnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAobm9kZTIuaXNMZWFmKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyb3NzQ2hpbGRyZW4obm9kZTEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2V0Q29sbGlzaW9uc0hlbHBlcihub2RlMS5yaWdodCwgbm9kZTIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2V0Q29sbGlzaW9uc0hlbHBlcihub2RlMS5sZWZ0LCBub2RlMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyb3NzQ2hpbGRyZW4obm9kZTEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcm9zc0NoaWxkcmVuKG5vZGUyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2dldENvbGxpc2lvbnNIZWxwZXIobm9kZTEucmlnaHQsIG5vZGUyLnJpZ2h0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2dldENvbGxpc2lvbnNIZWxwZXIobm9kZTEubGVmdCwgbm9kZTIubGVmdCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9nZXRDb2xsaXNpb25zSGVscGVyKG5vZGUxLnJpZ2h0LCBub2RlMi5sZWZ0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2dldENvbGxpc2lvbnNIZWxwZXIobm9kZTEubGVmdCwgbm9kZTIucmlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY3Jvc3NDaGlsZHJlbihub2RlKSB7XHJcbiAgICAgICAgaWYgKCFub2RlLmlzQ2hlY2tlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9nZXRDb2xsaXNpb25zSGVscGVyKG5vZGUucmlnaHQsIG5vZGUubGVmdCk7XHJcbiAgICAgICAgICAgIG5vZGUuaXNDaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiY29uc3QgaXNJbnNpZGUgPSAocDEsIHAyLCBxKSA9PiB7XHJcbiAgICBjb25zdCBSID0gKHAyWzBdIC0gcDFbMF0pICogKHFbMV0gLSBwMVsxXSkgLSAocDJbMV0gLSBwMVsxXSkgKiAocVswXSAtIHAxWzBdKTtcclxuICAgIHJldHVybiBSIDw9IDAgKyAwLjAwMTtcclxufTtcclxuY29uc3QgZG90ID0gKGEsIGIpID0+IGFbMF0gKiBiWzBdICsgYVsxXSAqIGJbMV07XHJcbi8qXHJcbmNvbnN0IGlzSW5DbG9ja3dpc2UgPSAocG9pbnRzIDogQXJyYXk8dmVjMj4pID0+IHtcclxuICBpZiAocG9pbnRzLmxlbmd0aCA8IDMpIHJldHVybiAxO1xyXG4gIGNvbnN0IFtwMSwgcDIsIHAzXSA9IHBvaW50cztcclxuICBjb25zdCBkZXQgPVxyXG4gICAgcDJbMF0gKiBwM1sxXSArXHJcbiAgICBwM1swXSAqIHAxWzFdICtcclxuICAgIHAxWzBdICogcDJbMV0gLVxyXG4gICAgcDFbMF0gKiBwMVsxXSAtXHJcbiAgICBwM1swXSAqIHAyWzFdIC1cclxuICAgIHAxWzBdICogcDNbMV07XHJcblxyXG4gIGlmIChkZXQgPD0gMCkgcmV0dXJuIDE7XHJcbiAgcmV0dXJuIC0xO1xyXG59O1xyXG4qL1xyXG5mdW5jdGlvbiBpc0luQ2xvY2t3aXNlKHBvbHkpIHtcclxuICAgIGlmIChwb2x5Lmxlbmd0aCA8IDMpXHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICBsZXQgZW5kID0gcG9seS5sZW5ndGggLSAxO1xyXG4gICAgbGV0IHN1bSA9IHBvbHlbZW5kXVswXSAqIHBvbHlbMF1bMV0gLSBwb2x5WzBdWzBdICogcG9seVtlbmRdWzFdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbmQ7ICsraSkge1xyXG4gICAgICAgIGNvbnN0IG4gPSBpICsgMTtcclxuICAgICAgICBzdW0gKz0gcG9seVtpXVswXSAqIHBvbHlbbl1bMV0gLSBwb2x5W25dWzBdICogcG9seVtpXVsxXTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdW0gPiAwO1xyXG59XHJcbmNvbnN0IGNvbXB1dGVJbnRlcnNlY3Rpb24gPSAocDEsIHAyLCBwMywgcDQpID0+IHtcclxuICAgIGlmIChwMlswXSAtIHAxWzBdID09PSAwKSB7XHJcbiAgICAgICAgY29uc3QgeCA9IHAxWzBdO1xyXG4gICAgICAgIGNvbnN0IG0yID0gKHA0WzFdIC0gcDNbMV0pIC8gKHA0WzBdIC0gcDNbMF0pO1xyXG4gICAgICAgIGNvbnN0IGIyID0gcDNbMV0gLSBtMiAqIHAzWzBdO1xyXG4gICAgICAgIGNvbnN0IHkgPSBtMiAqIHggKyBiMjtcclxuICAgICAgICByZXR1cm4gW3gsIHldO1xyXG4gICAgfVxyXG4gICAgaWYgKHA0WzBdIC0gcDNbMF0gPT09IDApIHtcclxuICAgICAgICBjb25zdCB4ID0gcDNbMF07XHJcbiAgICAgICAgY29uc3QgbTEgPSAocDJbMV0gLSBwMVsxXSkgLyAocDJbMF0gLSBwMVswXSk7XHJcbiAgICAgICAgY29uc3QgYjEgPSBwMVsxXSAtIG0xICogcDFbMF07XHJcbiAgICAgICAgY29uc3QgeSA9IG0xICogeCArIGIxO1xyXG4gICAgICAgIHJldHVybiBbeCwgeV07XHJcbiAgICB9XHJcbiAgICBjb25zdCBtMSA9IChwMlsxXSAtIHAxWzFdKSAvIChwMlswXSAtIHAxWzBdKTtcclxuICAgIGNvbnN0IGIxID0gcDFbMV0gLSBtMSAqIHAxWzBdO1xyXG4gICAgY29uc3QgbTIgPSAocDRbMV0gLSBwM1sxXSkgLyAocDRbMF0gLSBwM1swXSk7XHJcbiAgICBjb25zdCBiMiA9IHAzWzFdIC0gbTIgKiBwM1swXTtcclxuICAgIGNvbnN0IHggPSAoYjIgLSBiMSkgLyAobTEgLSBtMik7XHJcbiAgICBjb25zdCB5ID0gbTEgKiB4ICsgYjE7XHJcbiAgICByZXR1cm4gW3gsIHldO1xyXG59O1xyXG5jb25zdCBjbGlwUG9seVZzUG9seSA9IChBLCBCKSA9PiB7XHJcbiAgICBsZXQgcmVzdWx0ID0gWy4uLkFdO1xyXG4gICAgZm9yIChsZXQgaSA9IDAsIG4gPSBCLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgIGNvbnN0IG5leHQgPSBbLi4ucmVzdWx0XTtcclxuICAgICAgICByZXN1bHQgPSBbXTtcclxuICAgICAgICBjb25zdCBhRWRnZTEgPSBCLmF0KGkgLSAxKTtcclxuICAgICAgICBjb25zdCBhRWRnZTIgPSBCLmF0KGkpO1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwLCBfbiA9IG5leHQubGVuZ3RoOyBqIDwgX247IGorKykge1xyXG4gICAgICAgICAgICBjb25zdCBiRWRnZTEgPSBuZXh0LmF0KGogLSAxKTtcclxuICAgICAgICAgICAgY29uc3QgYkVkZ2UyID0gbmV4dC5hdChqKTtcclxuICAgICAgICAgICAgaWYgKGlzSW5zaWRlKGFFZGdlMSwgYUVkZ2UyLCBiRWRnZTIpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzSW5zaWRlKGFFZGdlMSwgYUVkZ2UyLCBiRWRnZTEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW50ZXJzZWN0aW9uID0gY29tcHV0ZUludGVyc2VjdGlvbihiRWRnZTEsIGJFZGdlMiwgYUVkZ2UxLCBhRWRnZTIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGludGVyc2VjdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChiRWRnZTIpO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlzSW5zaWRlKGFFZGdlMSwgYUVkZ2UyLCBiRWRnZTEpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbnRlcnNlY3Rpb24gPSBjb21wdXRlSW50ZXJzZWN0aW9uKGJFZGdlMSwgYkVkZ2UyLCBhRWRnZTEsIGFFZGdlMik7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChpbnRlcnNlY3Rpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuY29uc3QgbGVycCA9IChhLCBiLCB0KSA9PiBhICsgKGIgLSBhKSAqIHQ7XHJcbmNvbnN0IGNsaXBTZWdtZW50VnNTZWdtZW50ID0gKHMxLCBzMikgPT4ge1xyXG4gICAgY29uc3QgW3AxLCBwMl0gPSBzMTtcclxuICAgIGNvbnN0IFtwMywgcDRdID0gczI7XHJcbiAgICBjb25zdCB0b3AgPSAocDRbMF0gLSBwM1swXSkgKiAocDFbMV0gLSBwM1sxXSkgLSAocDRbMV0gLSBwM1sxXSkgKiAocDFbMF0gLSBwM1swXSk7XHJcbiAgICBjb25zdCBib3R0b20gPSAocDRbMV0gLSBwM1sxXSkgKiAocDJbMF0gLSBwMVswXSkgLSAocDRbMF0gLSBwM1swXSkgKiAocDJbMV0gLSBwMVsxXSk7XHJcbiAgICBpZiAoIWJvdHRvbSlcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICBjb25zdCB0ID0gdG9wIC8gYm90dG9tO1xyXG4gICAgaWYgKHQgPCAwIHx8IHQgPiAxKVxyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIHJldHVybiBbW2xlcnAocDFbMF0sIHAyWzBdLCB0KSwgbGVycChwMVsxXSwgcDJbMV0sIHQpXV07XHJcbn07XHJcbmNvbnN0IGNsaXBQb2ludFZzUG9seSA9IChwb2ludCwgdmVydGljZXMpID0+IHtcclxuICAgIGNvbnN0IHggPSBwb2ludFswXTtcclxuICAgIGNvbnN0IHkgPSBwb2ludFsxXTtcclxuICAgIGxldCBpbnNpZGUgPSBmYWxzZTtcclxuICAgIGZvciAobGV0IGkgPSAwLCBqID0gdmVydGljZXMubGVuZ3RoIC0gMTsgaSA8IHZlcnRpY2VzLmxlbmd0aDsgaiA9IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHhpID0gdmVydGljZXNbaV1bMF0sIHlpID0gdmVydGljZXNbaV1bMV07XHJcbiAgICAgICAgY29uc3QgeGogPSB2ZXJ0aWNlc1tqXVswXSwgeWogPSB2ZXJ0aWNlc1tqXVsxXTtcclxuICAgICAgICBjb25zdCBpbnRlcnNlY3QgPSB5aSA+IHkgIT0geWogPiB5ICYmIHggPCAoKHhqIC0geGkpICogKHkgLSB5aSkpIC8gKHlqIC0geWkpICsgeGk7XHJcbiAgICAgICAgaWYgKGludGVyc2VjdClcclxuICAgICAgICAgICAgaW5zaWRlID0gIWluc2lkZTtcclxuICAgIH1cclxuICAgIHJldHVybiBbcG9pbnRdO1xyXG59O1xyXG5jb25zdCBjbGlwU2VnbWVudFZzUG9seSA9IChzZWdtZW50LCBwb2x5KSA9PiB7XHJcbiAgICBjb25zdCBbcDEsIHAyXSA9IHNlZ21lbnQ7XHJcbiAgICBjb25zdCBwb2ludHMgPSBbXTtcclxuICAgIGlmIChjbGlwUG9pbnRWc1BvbHkocDEsIHBvbHkpKVxyXG4gICAgICAgIHBvaW50cy5wdXNoKHAxKTtcclxuICAgIGlmIChjbGlwUG9pbnRWc1BvbHkocDIsIHBvbHkpKVxyXG4gICAgICAgIHBvaW50cy5wdXNoKHAyKTtcclxuICAgIGlmIChwb2ludHMubGVuZ3RoID4gMSlcclxuICAgICAgICByZXR1cm4gcG9pbnRzO1xyXG4gICAgZm9yIChsZXQgaSA9IDAsIG4gPSBwb2x5Lmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHExID0gcG9seS5hdChpIC0gMSk7XHJcbiAgICAgICAgY29uc3QgcTIgPSBwb2x5LmF0KGkpO1xyXG4gICAgICAgIGNvbnN0IGludGVyc2VjdGlvbiA9IGNsaXBTZWdtZW50VnNTZWdtZW50KFtwMSwgcDJdLCBbcTEsIHEyXSk7XHJcbiAgICAgICAgaWYgKGludGVyc2VjdGlvbi5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICBwb2ludHMucHVzaChpbnRlcnNlY3Rpb25bMF0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBvaW50cztcclxufTtcclxuY29uc3QgcGFpckhhc2ggPSAoeCwgeSkgPT4geCA9PT0gTWF0aC5tYXgoeCwgeSkgPyB4ICogeCArIHkgKyB4IDogeSAqIHggKyB5O1xyXG5jb25zdCBQT0xZID0gMztcclxuY29uc3QgU0VHTUVOVCA9IDI7XHJcbmNvbnN0IFBPSU5UID0gMTtcclxuY29uc3QgZmFjZVR5cGVNYXAgPSB7fTtcclxuZmFjZVR5cGVNYXBbcGFpckhhc2goUE9MWSwgUE9MWSldID0gY2xpcFBvbHlWc1BvbHk7XHJcbmZhY2VUeXBlTWFwW3BhaXJIYXNoKFNFR01FTlQsIFBPTFkpXSA9IGNsaXBTZWdtZW50VnNQb2x5O1xyXG5mYWNlVHlwZU1hcFtwYWlySGFzaChTRUdNRU5ULCBTRUdNRU5UKV0gPSBjbGlwU2VnbWVudFZzU2VnbWVudDtcclxuZmFjZVR5cGVNYXBbcGFpckhhc2goUE9JTlQsIFBPTFkpXSA9IChmYWNlMSwgZmFjZTIpID0+IGNsaXBQb2ludFZzUG9seShmYWNlMVswXSwgZmFjZTIpO1xyXG5mdW5jdGlvbiBjbGlwRmFjZVZzRmFjZShmYWNlMSwgZmFjZTIpIHtcclxuICAgIGNvbnN0IHR5cGUxID0gTWF0aC5taW4oZmFjZTEubGVuZ3RoLCBQT0xZKTtcclxuICAgIGNvbnN0IHR5cGUyID0gTWF0aC5taW4oZmFjZTIubGVuZ3RoLCBQT0xZKTtcclxuICAgIGxldCBhcmdzID0gW2ZhY2UxLCBmYWNlMl07XHJcbiAgICBpZiAodHlwZTEgPiB0eXBlMikge1xyXG4gICAgICAgIHJldHVybiBmYWNlVHlwZU1hcFtwYWlySGFzaCh0eXBlMiwgdHlwZTEpXShhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1swXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFjZVR5cGVNYXBbcGFpckhhc2godHlwZTEsIHR5cGUyKV0oYXJndW1lbnRzWzBdLCBhcmd1bWVudHNbMV0pO1xyXG59XHJcbmV4cG9ydCB7IGNsaXBTZWdtZW50VnNTZWdtZW50LCBpc0luc2lkZSwgY29tcHV0ZUludGVyc2VjdGlvbiwgY2xpcFBvbHlWc1BvbHksIGNsaXBGYWNlVnNGYWNlLCBpc0luQ2xvY2t3aXNlLCBjbGlwU2VnbWVudFZzUG9seSwgY2xpcFBvaW50VnNQb2x5LCB9O1xyXG4iLCJjb25zdCBjb25maWcgPSB7XHJcbiAgICBSSUdJRF9CT0RZX01PVkVfVFJFU0hPTEQ6IDAuMDA1LFxyXG4gICAgUklHSURfQk9EWV9BQUJCX0JJQVM6IDAuMTEsXHJcbiAgICBDTElQX0JJQVM6IDAuMDAxLFxyXG4gICAgR0pLX01BWF9JVEVSQVRJT05TX05VTTogNjQsXHJcbiAgICBFUEFfQklBUzogMC4wMDAwMSxcclxuICAgIENPTlRBQ1RfQklBUzogMC4xMjUsXHJcbiAgICBDT05UQUNUX1RSRVNIT0xEOiAwLjA1LFxyXG4gICAgQ09OVEFDVF9NQU5JRk9MRF9LRUVQX1RSRVNIT0xEOiAwLjAwMSxcclxuICAgIFNPTFZFUl9JVEVSQVRJT05TX05VTTogMTgsXHJcbiAgICBVU0VfQ09OVEFDVF9DQUNIRTogZmFsc2VcclxufTtcclxud2luZG93LmNvbmZpZyA9IGNvbmZpZztcclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xyXG4iLCJpbXBvcnQgeyB2MywgbTMgfSBmcm9tIFwicm9tYW5wcHBtYXRoXCI7XHJcbmltcG9ydCB7IEVQQSwgZ2prIH0gZnJvbSBcIi4vZ2prXCI7XHJcbmltcG9ydCBjb25maWcgZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7IGNsaXBGYWNlVnNGYWNlLCBpc0luQ2xvY2t3aXNlIH0gZnJvbSBcIi4vY2xpcHBpbmdcIjtcclxuaW1wb3J0IHsgY29sbGlkZXJUeXBlcyB9IGZyb20gXCIuL0NvbGxpZGVyXCI7XHJcbi8qIC8vRm9yIGRlYnVnIVxyXG5jb25zdCBkcmF3UG9seXMgPSAoX3AxLF9wMikgPT57XHJcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhczJcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgXHJcbiAgICBjb25zdCBwMSA9IF9wMS5tYXAoZWwgPT4gWzEwMCArIGVsWzBdICogMTAsIDEwMCArIGVsWzFdKjEwXSlcclxuICAgIGNvbnN0IHAyID0gX3AyLm1hcChlbCA9PiBbMTAwICsgZWxbMF0gKiAxMCwgMTAwICsgZWxbMV0qMTBdKVxyXG5cclxuICAgIFxyXG4gICAgY29uc3QgZGlyMSA9IGlzSW5DbG9ja3dpc2UoX3AxKTtcclxuICAgIGNvbnN0IGRpcjIgPSBpc0luQ2xvY2t3aXNlKF9wMik7XHJcbiAgICBjb25zb2xlLmxvZyhfcDEsIGRpcjEsIF9wMiwgZGlyMilcclxuICAgIGNvbnNvbGUubG9nKGNsaXBGYWNlVnNGYWNlKF9wMSwgX3AyKSk7XHJcblxyXG4gICAgY3R4LmJlZ2luUGF0aCgpOyAvLyBTdGFydCBhIG5ldyBwYXRoXHJcbiAgICBjdHgubW92ZVRvKHAxWzBdWzBdLCBwMVswXVsxXSk7IC8vIE1vdmUgdGhlIHBlbiB0byAoMzAsIDUwKVxyXG4gICAgXHJcbiAgICBcclxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCBwMS5sZW5ndGg7IGkrKykgY3R4LmxpbmVUbyhwMVtpXVswXSwgcDFbaV1bMV0pXHJcbiAgIC8vY3R4LmxpbmVUbyhwMVswXVswXSwgcDFbMF1bMV0pXHJcbiAgICBjdHguc3Ryb2tlKCk7IC8vIFJlbmRlciB0aGUgcGF0aFxyXG4gICAgXHJcbiAgICBjdHgubW92ZVRvKHAyWzBdWzBdLCBwMlswXVsxXSk7IC8vIE1vdmUgdGhlIHBlbiB0byAoMzAsIDUwKVxyXG4gICAgXHJcbiAgICBjdHguZmlsbFN0eWxlID0gXCJyZ2IoMjU1LCAxNjUsIDApXCI7XHJcbiAgICBcclxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCBwMi5sZW5ndGg7IGkrKykgY3R4LmxpbmVUbyhwMltpXVswXSwgcDJbaV1bMV0pXHJcbiAgICAvL2N0eC5saW5lVG8ocDJbMF1bMF0sIHAyWzBdWzFdKVxyXG4gICAgY3R4LnN0cm9rZSgpOyAvLyBSZW5kZXIgdGhlIHBhdGhcclxuICAgIFxyXG59XHJcbiovXHJcbmNvbnN0IHJheVZzUGxhbmVJbnRlcnNlYyA9IChwbGFuZSwgcG9pbnQsIGRpcmVjdGlvbikgPT4ge1xyXG4gICAgY29uc3QgW29yaWdpbiwgbm9ybWFsXSA9IHBsYW5lO1xyXG4gICAgY29uc3QgX2RvdCA9IHYzLmRvdChub3JtYWwsIGRpcmVjdGlvbik7XHJcbiAgICBjb25zdCBmcm9tUG9pbnRUb09yaWdpbiA9IHYzLmRpZmYocG9pbnQsIG9yaWdpbik7XHJcbiAgICBjb25zdCBmYWMgPSB2My5kb3QoZnJvbVBvaW50VG9PcmlnaW4sIG5vcm1hbCkgLyBfZG90O1xyXG4gICAgcmV0dXJuIHYzLmRpZmYocG9pbnQsIHYzLnNjYWxlKGRpcmVjdGlvbiwgZmFjKSk7XHJcbn07XHJcbmNvbnN0IGlzUG9pbnRCZWhpbmRQbGFuZSA9IChvcmlnaW4sIG5vcm1hbCwgcG9pbnQsIHNpZ24gPSAxKSA9PiB7XHJcbiAgICAvL2NvbnN0IFtvcmlnaW4sIG5vcm1hbF0gPSBwbGFuZTtcclxuICAgIGxldCBfZCA9IHYzLmRvdChub3JtYWwsIHYzLmRpZmYocG9pbnQsIG9yaWdpbikpICogc2lnbjtcclxuICAgIHJldHVybiBfZCA+IDAgLSBjb25maWcuQ0xJUF9CSUFTO1xyXG59O1xyXG5jb25zdCBwb2ludE9uUGxhbmVQcm9qZWN0aW9uID0gKG9yaWdpbiwgbm9ybWFsLCBwb2ludCkgPT4ge1xyXG4gICAgLy9jb25zdCBbb3JpZ2luLCBub3JtYWxdID0gcGxhbmU7XHJcbiAgICBjb25zdCBmcm9tUG9pbnRUb09yaWdpbiA9IHYzLmRpZmYocG9pbnQsIG9yaWdpbik7XHJcbiAgICBjb25zdCBwcm9qQWxvbmdOb3JtYWwgPSB2My5kb3Qobm9ybWFsLCBmcm9tUG9pbnRUb09yaWdpbik7XHJcbiAgICByZXR1cm4gdjMuZGlmZihwb2ludCwgdjMuc2NhbGUobm9ybWFsLCBwcm9qQWxvbmdOb3JtYWwpKTtcclxufTtcclxuY29uc3QgY2xpcFBvaW50c0JlaGluZFBsYW5lID0gKHBsYW5lLCBwb2ludHMsIHNpZ24gPSAxKSA9PiB7XHJcbiAgICBjb25zdCBbb3JpZ2luLCBub3JtYWxdID0gcGxhbmU7XHJcbiAgICByZXR1cm4gcG9pbnRzLmZpbHRlcigocG9pbnQpID0+IHYzLmRvdChub3JtYWwsIHYzLmRpZmYocG9pbnQsIG9yaWdpbikpICogc2lnbiArIGNvbmZpZy5DTElQX0JJQVMgPiAwKTtcclxufTtcclxuY29uc3QgZ2V0MkRjb29yZHNPblBsYW5lID0gKGksIGosIHBvaW50KSA9PiB7XHJcbiAgICByZXR1cm4gW3YzLmRvdChpLCBwb2ludCksIHYzLmRvdChqLCBwb2ludCldO1xyXG59O1xyXG5jb25zdCB0cmlhbmdsZVZzQ29sbGlkZXIgPSAodHJpYW5nbGUsIGNvbGxpZGVyKSA9PiB7XHJcbiAgICBjb25zdCBjb250YWN0RmFjZTEgPSBbXTtcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Q29sbGlzaW9uRmVhdHVyZXMoY29sbDEsIGNvbGwyKSB7XHJcbiAgICBjb25zdCBjb2xsaXNpb25TaW1wbGV4ID0gZ2prKGNvbGwxLCBjb2xsMik7XHJcbiAgICBpZiAoIWNvbGxpc2lvblNpbXBsZXgpXHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgbGV0IGNvbnRhY3RGYWNlMSA9IG51bGw7XHJcbiAgICBsZXQgY29udGFjdEZhY2UyID0gbnVsbDtcclxuICAgIGxldCBuID0gbnVsbDtcclxuICAgIGxldCBwb3NpdGlvbkVycm9yID0gbnVsbDtcclxuICAgIGlmIChjb2xsMS5nZXRUeXBlKCkgPT09IGNvbGxpZGVyVHlwZXMuVHJpYW5nbGUpIHtcclxuICAgICAgICBuID0gdjMuc2NhbGUoY29udGFjdEZhY2UxLm5vcm1hbCwgLTEpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNvbGwyLmdldFR5cGUoKSA9PT0gY29sbGlkZXJUeXBlcy5UcmlhbmdsZSkge1xyXG4gICAgICAgIG4gPSBjb250YWN0RmFjZTIubm9ybWFsO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc3QgY29udGFjdERhdGEgPSBFUEEoY29sbGlzaW9uU2ltcGxleC5hLCBjb2xsaXNpb25TaW1wbGV4LmIsIGNvbGxpc2lvblNpbXBsZXguYywgY29sbGlzaW9uU2ltcGxleC5kLCBjb2xsaXNpb25TaW1wbGV4Lm9yaWdpbnNNYXAsIGNvbGxpc2lvblNpbXBsZXguY29sbDEsIGNvbGxpc2lvblNpbXBsZXguY29sbDIpO1xyXG4gICAgICAgIGlmICghY29udGFjdERhdGEpXHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICBuID0gY29udGFjdERhdGEubjtcclxuICAgICAgICBwb3NpdGlvbkVycm9yID0gY29udGFjdERhdGEucG9zaXRpb25FcnJvcjtcclxuICAgIH1cclxuICAgIGlmIChjb2xsMS5nZXRUeXBlKCkgPT09IGNvbGxpZGVyVHlwZXMuU3BoZXJlKSB7XHJcbiAgICAgICAgY29uc3QgUEEgPSBjb2xsMS5zdXBwb3J0KHYzLnNjYWxlKG4sIC0xKSk7XHJcbiAgICAgICAgY29uc3QgUEIgPSB2My5zdW0oUEEsIHYzLnNjYWxlKG4sIHBvc2l0aW9uRXJyb3IpKTtcclxuICAgICAgICBjb25zdCByYiA9IHYzLmRpZmYoUEIsIGNvbGwyLmdldFRyYW5zbGF0aW9uKCkpO1xyXG4gICAgICAgIGNvbnN0IHJhID0gdjMuZGlmZihQQSwgY29sbDEuZ2V0VHJhbnNsYXRpb24oKSk7XHJcbiAgICAgICAgY29uc3QgcmFMb2NhbCA9IG0zLnRyYW5zZm9ybVBvaW50KGNvbGwxLmdldFJtYXRyaXhJbnZlcnNlKCksIHJhKTtcclxuICAgICAgICBjb25zdCByYkxvY2FsID0gbTMudHJhbnNmb3JtUG9pbnQoY29sbDIuZ2V0Um1hdHJpeEludmVyc2UoKSwgcmIpO1xyXG4gICAgICAgIGNvbnN0IGkgPSBbblsxXSArIG5bMl0sIG5bMl0gLSBuWzBdLCAtblswXSAtIG5bMV1dO1xyXG4gICAgICAgIGNvbnN0IGogPSB2My5jcm9zcyh2My5zY2FsZShuLCAtMSksIGkpO1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJhLFxyXG4gICAgICAgICAgICAgICAgcmIsXHJcbiAgICAgICAgICAgICAgICBuLFxyXG4gICAgICAgICAgICAgICAgUEEsXHJcbiAgICAgICAgICAgICAgICBQQixcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uRXJyb3IsXHJcbiAgICAgICAgICAgICAgICBpLFxyXG4gICAgICAgICAgICAgICAgaixcclxuICAgICAgICAgICAgICAgIHJhTG9jYWwsXHJcbiAgICAgICAgICAgICAgICByYkxvY2FsLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcbiAgICBpZiAoY29sbDIuZ2V0VHlwZSgpID09PSBjb2xsaWRlclR5cGVzLlNwaGVyZSkge1xyXG4gICAgICAgIGNvbnN0IFBCID0gY29sbDEuc3VwcG9ydChuKTtcclxuICAgICAgICBjb25zdCBQQSA9IHYzLnN1bShQQiwgdjMuc2NhbGUobiwgLXBvc2l0aW9uRXJyb3IpKTtcclxuICAgICAgICBjb25zdCByYiA9IHYzLmRpZmYoUEIsIGNvbGwyLmdldFRyYW5zbGF0aW9uKCkpO1xyXG4gICAgICAgIGNvbnN0IHJhID0gdjMuZGlmZihQQSwgY29sbDEuZ2V0VHJhbnNsYXRpb24oKSk7XHJcbiAgICAgICAgY29uc3QgcmFMb2NhbCA9IG0zLnRyYW5zZm9ybVBvaW50KGNvbGwxLmdldFJtYXRyaXhJbnZlcnNlKCksIHJhKTtcclxuICAgICAgICBjb25zdCByYkxvY2FsID0gbTMudHJhbnNmb3JtUG9pbnQoY29sbDIuZ2V0Um1hdHJpeEludmVyc2UoKSwgcmIpO1xyXG4gICAgICAgIGNvbnN0IGkgPSBbblsxXSArIG5bMl0sIG5bMl0gLSBuWzBdLCAtblswXSAtIG5bMV1dO1xyXG4gICAgICAgIGNvbnN0IGogPSB2My5jcm9zcyh2My5zY2FsZShuLCAtMSksIGkpO1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJhLFxyXG4gICAgICAgICAgICAgICAgcmIsXHJcbiAgICAgICAgICAgICAgICBuLFxyXG4gICAgICAgICAgICAgICAgUEEsXHJcbiAgICAgICAgICAgICAgICBQQixcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uRXJyb3IsXHJcbiAgICAgICAgICAgICAgICBpLFxyXG4gICAgICAgICAgICAgICAgaixcclxuICAgICAgICAgICAgICAgIHJhTG9jYWwsXHJcbiAgICAgICAgICAgICAgICByYkxvY2FsLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcbiAgICAvKmNvbnN0IHsgUEEsIFBCLCBuLCBwb3NpdGlvbkVycm9yIH0gPSBjb250YWN0RGF0YTtcclxuICBcclxuICAgIGlmIChcclxuICAgICAgY29sbDEuZ2V0VHlwZSgpID09PSBjb2xsaWRlclR5cGVzLlNwaGVyZSB8fFxyXG4gICAgICBjb2xsMi5nZXRUeXBlKCkgPT09IGNvbGxpZGVyVHlwZXMuU3BoZXJlXHJcbiAgICApIHtcclxuICAgICAgY29uc3QgcmIgPSB2My5kaWZmKFBCLCBjb2xsMi5nZXRUcmFuc2xhdGlvbigpKTtcclxuICAgICAgY29uc3QgcmEgPSB2My5kaWZmKFBBLCBjb2xsMS5nZXRUcmFuc2xhdGlvbigpKTtcclxuICBcclxuICAgICAgY29uc3QgcmFMb2NhbCA9IG0zLnRyYW5zZm9ybVBvaW50KGNvbGwxLmdldFJtYXRyaXhJbnZlcnNlKCksIHJhKTtcclxuICAgICAgY29uc3QgcmJMb2NhbCA9IG0zLnRyYW5zZm9ybVBvaW50KGNvbGwyLmdldFJtYXRyaXhJbnZlcnNlKCksIHJiKTtcclxuICAgICAgY29uc3QgaTogdmVjMyA9IFtuWzFdICsgblsyXSwgblsyXSAtIG5bMF0sIC1uWzBdIC0gblsxXV07XHJcbiAgXHJcbiAgICAgIGNvbnN0IGogPSB2My5jcm9zcyh2My5zY2FsZShuLCAtMSksIGkpO1xyXG4gICAgICByZXR1cm4gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHJhLFxyXG4gICAgICAgICAgcmIsXHJcbiAgICAgICAgICBuLFxyXG4gICAgICAgICAgUEEsXHJcbiAgICAgICAgICBQQixcclxuICAgICAgICAgIHBvc2l0aW9uRXJyb3IsXHJcbiAgICAgICAgICBpLFxyXG4gICAgICAgICAgaixcclxuICAgICAgICAgIHJhTG9jYWwsXHJcbiAgICAgICAgICByYkxvY2FsLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF07XHJcbiAgICB9XHJcbiAgKi9cclxuICAgIGNvbnN0IG5SZXZlcnNlID0gdjMuc2NhbGUobiwgLTEpO1xyXG4gICAgY29udGFjdEZhY2UxID0gY29sbDEuZ2V0Q2xvc2VzdEZhY2VCeU5vcm1hbChuUmV2ZXJzZSk7XHJcbiAgICBjb250YWN0RmFjZTIgPSBjb2xsMi5nZXRDbG9zZXN0RmFjZUJ5Tm9ybWFsKG4pO1xyXG4gICAgY29uc3QgcGxhbmUgPSBbWzAsIDAsIDBdLCBuXTtcclxuICAgIC8vY29uc3QgcGxhbmU6IFt2ZWMzLCB2ZWMzXSA9IFt2My5zY2FsZSh2My5zdW0oUEEsIFBCKSwgMC41KSwgbl07XHJcbiAgICBjb25zdCBwcm9qZWN0aW9uczEgPSBjb250YWN0RmFjZTEudmVydGljZXMubWFwKChwKSA9PiBwb2ludE9uUGxhbmVQcm9qZWN0aW9uKFswLCAwLCAwXSwgbiwgcCkpO1xyXG4gICAgY29uc3QgcHJvamVjdGlvbnMyID0gY29udGFjdEZhY2UyLnZlcnRpY2VzLm1hcCgocCkgPT4gcG9pbnRPblBsYW5lUHJvamVjdGlvbihbMCwgMCwgMF0sIG4sIHApKTtcclxuICAgIGNvbnN0IG9yaWdpbiA9IHBsYW5lWzBdO1xyXG4gICAgY29uc3QgaSA9IHYzLm5vcm1hbGl6ZShbblsxXSArIG5bMl0sIG5bMl0gLSBuWzBdLCAtblswXSAtIG5bMV1dKTtcclxuICAgIGNvbnN0IGogPSB2My5jcm9zcyh2My5zY2FsZShuLCAtMSksIGkpO1xyXG4gICAgbGV0IF8yZDEgPSBwcm9qZWN0aW9uczEubWFwKChwKSA9PiBnZXQyRGNvb3Jkc09uUGxhbmUoaSwgaiwgdjMuZGlmZihwLCBvcmlnaW4pKSk7XHJcbiAgICBsZXQgXzJkMiA9IHByb2plY3Rpb25zMi5tYXAoKHApID0+IGdldDJEY29vcmRzT25QbGFuZShpLCBqLCB2My5kaWZmKHAsIG9yaWdpbikpKTtcclxuICAgIGlmIChpc0luQ2xvY2t3aXNlKF8yZDEpKVxyXG4gICAgICAgIF8yZDEgPSBfMmQxLm1hcCgoXywgaSkgPT4gXzJkMS5hdCgtaSkpO1xyXG4gICAgaWYgKGlzSW5DbG9ja3dpc2UoXzJkMikpXHJcbiAgICAgICAgXzJkMiA9IF8yZDIubWFwKChfLCBpKSA9PiBfMmQyLmF0KC1pKSk7XHJcbiAgICBsZXQgY2xpcHBlZCA9IGNsaXBGYWNlVnNGYWNlKF8yZDEsIF8yZDIpO1xyXG4gICAgaWYgKGNsaXBwZWQubGVuZ3RoID09PSAwKVxyXG4gICAgICAgIGNsaXBwZWQgPSBjbGlwRmFjZVZzRmFjZShfMmQyLCBfMmQxKTtcclxuICAgIGNvbnN0IF8zZCA9IGNsaXBwZWQubWFwKChwKSA9PiB2My5zdW0ob3JpZ2luLCB2My5zdW0odjMuc2NhbGUoaSwgcFswXSksIHYzLnNjYWxlKGosIHBbMV0pKSkpO1xyXG4gICAgY29uc3QgZmVhdHVyZXMgPSBbXTtcclxuICAgIF8zZC5mb3JFYWNoKChwb2ludCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IFBBID0gcmF5VnNQbGFuZUludGVyc2VjKFtjb250YWN0RmFjZTEudmVydGljZXNbMF0sIGNvbnRhY3RGYWNlMS5ub3JtYWxdLCBwb2ludCwgbik7XHJcbiAgICAgICAgaWYgKCFpc1BvaW50QmVoaW5kUGxhbmUoY29udGFjdEZhY2UyLnZlcnRpY2VzWzBdLCBjb250YWN0RmFjZTIubm9ybWFsLCBQQSwgLTEpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgY29uc3QgUEIgPSByYXlWc1BsYW5lSW50ZXJzZWMoW2NvbnRhY3RGYWNlMi52ZXJ0aWNlc1swXSwgY29udGFjdEZhY2UyLm5vcm1hbF0sIHBvaW50LCBuKTtcclxuICAgICAgICBpZiAoIWlzUG9pbnRCZWhpbmRQbGFuZShjb250YWN0RmFjZTEudmVydGljZXNbMF0sIGNvbnRhY3RGYWNlMS5ub3JtYWwsIFBCLCAtMSkpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBjb25zdCByYiA9IHYzLmRpZmYoUEIsIGNvbGwyLmdldFRyYW5zbGF0aW9uKCkpO1xyXG4gICAgICAgIGNvbnN0IHJhID0gdjMuZGlmZihQQSwgY29sbDEuZ2V0VHJhbnNsYXRpb24oKSk7XHJcbiAgICAgICAgY29uc3QgcG9zaXRpb25FcnJvciA9IC12My5kb3QodjMuZGlmZihQQiwgUEEpLCBuKTtcclxuICAgICAgICBjb25zdCByYUxvY2FsID0gbTMudHJhbnNmb3JtUG9pbnQoY29sbDEuZ2V0Um1hdHJpeEludmVyc2UoKSwgcmEpO1xyXG4gICAgICAgIGNvbnN0IHJiTG9jYWwgPSBtMy50cmFuc2Zvcm1Qb2ludChjb2xsMi5nZXRSbWF0cml4SW52ZXJzZSgpLCByYik7XHJcbiAgICAgICAgZmVhdHVyZXMucHVzaCh7XHJcbiAgICAgICAgICAgIHJhLFxyXG4gICAgICAgICAgICByYixcclxuICAgICAgICAgICAgbixcclxuICAgICAgICAgICAgUEEsXHJcbiAgICAgICAgICAgIFBCLFxyXG4gICAgICAgICAgICBwb3NpdGlvbkVycm9yLFxyXG4gICAgICAgICAgICBpLFxyXG4gICAgICAgICAgICBqLFxyXG4gICAgICAgICAgICByYUxvY2FsLFxyXG4gICAgICAgICAgICByYkxvY2FsLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICAvKlxyXG4gICAgICBpZiAoZmVhdHVyZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgIFxyXG4gICAgICAgIC8vICBkcmF3UG9seXMoXzJkMSwgXzJkMilcclxuICAgICAgICAgLy8gdGhyb3cgMVxyXG4gICAgICAgICAgY29uc3QgcmIgPSB2My5kaWZmKFBCLCBjb2xsMi5nZXRUcmFuc2xhdGlvbigpKTtcclxuICAgICAgICAgIGNvbnN0IHJhID0gIHYzLmRpZmYoUEEsIGNvbGwxLmdldFRyYW5zbGF0aW9uKCkpO1xyXG4gICAgICAgICAgY29uc3QgcmFMb2NhbCA9IG0zLnRyYW5zZm9ybVBvaW50KGNvbGwxLmdldFJtYXRyaXhJbnZlcnNlKCksIHJhKTtcclxuICAgICAgICAgIGNvbnN0IHJiTG9jYWwgPSBtMy50cmFuc2Zvcm1Qb2ludChjb2xsMi5nZXRSbWF0cml4SW52ZXJzZSgpLCByYik7XHJcbiAgICAgICAgICBmZWF0dXJlcy5wdXNoKFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgcmEsIHJiLCBuLCBQQSwgUEIsIHBvc2l0aW9uRXJyb3IsIGksIGosIHJhTG9jYWwsIHJiTG9jYWxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgKi9cclxuICAgIHJldHVybiBmZWF0dXJlcztcclxufVxyXG4iLCJpbXBvcnQgeyB2MyB9IGZyb20gXCJyb21hbnBwcG1hdGhcIjtcclxuY29uc3QgeyBkb3QsIGNyb3NzLCBub3JtYWxpemUsIHN1bSwgZGlmZiwgc2NhbGUsIGlzTnVsbCwgbm9ybSB9ID0gdjM7XHJcbmltcG9ydCBjb25maWcgZnJvbSBcIi4vY29uZmlnXCI7XHJcbmNvbnN0IHsgQ0xJUF9CSUFTLCBHSktfTUFYX0lURVJBVElPTlNfTlVNLCBFUEFfQklBUyB9ID0gY29uZmlnO1xyXG5jb25zdCByYXlWc1BsYW5lSW50ZXJzZWMgPSAocGxhbmUsIHBvaW50LCBkaXJlY3Rpb24pID0+IHtcclxuICAgIGNvbnN0IFtvcmlnaW4sIG5vcm1hbF0gPSBwbGFuZTtcclxuICAgIGNvbnN0IF9kb3QgPSBkb3Qobm9ybWFsLCBkaXJlY3Rpb24pO1xyXG4gICAgY29uc3QgZnJvbVBvaW50VG9PcmlnaW4gPSBkaWZmKHBvaW50LCBvcmlnaW4pO1xyXG4gICAgY29uc3QgZmFjID0gZG90KGZyb21Qb2ludFRvT3JpZ2luLCBub3JtYWwpIC8gX2RvdDtcclxuICAgIHJldHVybiBkaWZmKHBvaW50LCBzY2FsZShkaXJlY3Rpb24sIGZhYykpO1xyXG59O1xyXG5jb25zdCBpc1BvaW50QmVoaW5kUGxhbmUgPSAocGxhbmUsIHBvaW50LCBzaWduID0gMSkgPT4ge1xyXG4gICAgY29uc3QgW29yaWdpbiwgbm9ybWFsXSA9IHBsYW5lO1xyXG4gICAgbGV0IF9kID0gZG90KG5vcm1hbCwgZGlmZihwb2ludCwgb3JpZ2luKSkgKiBzaWduO1xyXG4gICAgcmV0dXJuIF9kID4gMCAtIENMSVBfQklBUztcclxufTtcclxuY29uc3QgcG9pbnRPblBsYW5lUHJvamVjdGlvbiA9IChwbGFuZSwgcG9pbnQpID0+IHtcclxuICAgIGNvbnN0IFtvcmlnaW4sIG5vcm1hbF0gPSBwbGFuZTtcclxuICAgIGNvbnN0IGZyb21Qb2ludFRvT3JpZ2luID0gZGlmZihwb2ludCwgb3JpZ2luKTtcclxuICAgIGNvbnN0IHByb2pBbG9uZ05vcm1hbCA9IGRvdChub3JtYWwsIGZyb21Qb2ludFRvT3JpZ2luKTtcclxuICAgIHJldHVybiBkaWZmKHBvaW50LCBzY2FsZShub3JtYWwsIHByb2pBbG9uZ05vcm1hbCkpO1xyXG59O1xyXG5jb25zdCBjbGlwUG9pbnRzQmVoaW5kUGxhbmUgPSAocGxhbmUsIHBvaW50cywgc2lnbiA9IDEpID0+IHtcclxuICAgIGNvbnN0IFtvcmlnaW4sIG5vcm1hbF0gPSBwbGFuZTtcclxuICAgIHJldHVybiBwb2ludHMuZmlsdGVyKChwb2ludCkgPT4gZG90KG5vcm1hbCwgZGlmZihwb2ludCwgb3JpZ2luKSkgKiBzaWduICsgQ0xJUF9CSUFTID4gMCk7XHJcbn07XHJcbmNvbnN0IGdldDJEY29vcmRzT25QbGFuZSA9IChpLCBqLCBwb2ludCkgPT4ge1xyXG4gICAgcmV0dXJuIFtkb3QoaSwgcG9pbnQpLCBkb3QoaiwgcG9pbnQpXTtcclxufTtcclxuZnVuY3Rpb24gdXBkYXRlX3NpbXBsZXgzKHByb3BzKSB7XHJcbiAgICBjb25zdCBuID0gY3Jvc3MoZGlmZihwcm9wcy5iLCBwcm9wcy5hKSwgZGlmZihwcm9wcy5jLCBwcm9wcy5hKSk7XHJcbiAgICBjb25zdCBBTyA9IHNjYWxlKHByb3BzLmEsIC0xKTtcclxuICAgIHByb3BzLnNpbXBfZGltID0gMjtcclxuICAgIGlmIChkb3QoY3Jvc3MoZGlmZihwcm9wcy5iLCBwcm9wcy5hKSwgbiksIEFPKSA+IDApIHtcclxuICAgICAgICBwcm9wcy5jID0gcHJvcHMuYTtcclxuICAgICAgICBwcm9wcy5zZWFyY2hfZGlyID0gY3Jvc3MoY3Jvc3MoZGlmZihwcm9wcy5iLCBwcm9wcy5hKSwgQU8pLCBkaWZmKHByb3BzLmIsIHByb3BzLmEpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoZG90KGNyb3NzKG4sIGRpZmYocHJvcHMuYywgcHJvcHMuYSkpLCBBTykgPiAwKSB7XHJcbiAgICAgICAgcHJvcHMuYiA9IHByb3BzLmE7XHJcbiAgICAgICAgcHJvcHMuc2VhcmNoX2RpciA9IGNyb3NzKGNyb3NzKGRpZmYocHJvcHMuYywgcHJvcHMuYSksIEFPKSwgZGlmZihwcm9wcy5jLCBwcm9wcy5hKSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcHJvcHMuc2ltcF9kaW0gPSAzO1xyXG4gICAgaWYgKGRvdChuLCBBTykgPiAwKSB7XHJcbiAgICAgICAgcHJvcHMuZCA9IHByb3BzLmM7XHJcbiAgICAgICAgcHJvcHMuYyA9IHByb3BzLmI7XHJcbiAgICAgICAgcHJvcHMuYiA9IHByb3BzLmE7XHJcbiAgICAgICAgcHJvcHMuc2VhcmNoX2RpciA9IG47XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcHJvcHMuZCA9IHByb3BzLmI7XHJcbiAgICBwcm9wcy5iID0gcHJvcHMuYTtcclxuICAgIHByb3BzLnNlYXJjaF9kaXIgPSBzY2FsZShuLCAtMSk7XHJcbiAgICByZXR1cm47XHJcbn1cclxuZnVuY3Rpb24gdXBkYXRlX3NpbXBsZXg0KHByb3BzKSB7XHJcbiAgICBjb25zdCBBQkMgPSBjcm9zcyhkaWZmKHByb3BzLmIsIHByb3BzLmEpLCBkaWZmKHByb3BzLmMsIHByb3BzLmEpKTtcclxuICAgIGNvbnN0IEFDRCA9IGNyb3NzKGRpZmYocHJvcHMuYywgcHJvcHMuYSksIGRpZmYocHJvcHMuZCwgcHJvcHMuYSkpO1xyXG4gICAgY29uc3QgQURCID0gY3Jvc3MoZGlmZihwcm9wcy5kLCBwcm9wcy5hKSwgZGlmZihwcm9wcy5iLCBwcm9wcy5hKSk7XHJcbiAgICBjb25zdCBBTyA9IHNjYWxlKHByb3BzLmEsIC0xKTtcclxuICAgIHByb3BzLnNpbXBfZGltID0gMztcclxuICAgIGlmIChkb3QoQUJDLCBBTykgPiAwKSB7XHJcbiAgICAgICAgcHJvcHMuZCA9IHByb3BzLmM7XHJcbiAgICAgICAgcHJvcHMuYyA9IHByb3BzLmI7XHJcbiAgICAgICAgcHJvcHMuYiA9IHByb3BzLmE7XHJcbiAgICAgICAgcHJvcHMuc2VhcmNoX2RpciA9IEFCQztcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoZG90KEFDRCwgQU8pID4gMCkge1xyXG4gICAgICAgIHByb3BzLmIgPSBwcm9wcy5hO1xyXG4gICAgICAgIHByb3BzLnNlYXJjaF9kaXIgPSBBQ0Q7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGRvdChBREIsIEFPKSA+IDApIHtcclxuICAgICAgICBwcm9wcy5jID0gcHJvcHMuZDtcclxuICAgICAgICBwcm9wcy5kID0gcHJvcHMuYjtcclxuICAgICAgICBwcm9wcy5iID0gcHJvcHMuYTtcclxuICAgICAgICBwcm9wcy5zZWFyY2hfZGlyID0gQURCO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG59XHJcbmZ1bmN0aW9uIGdqayhjb2xsMSwgY29sbDIpIHtcclxuICAgIGNvbnN0IHByb3BzID0ge1xyXG4gICAgICAgIGE6IFswLCAwLCAwXSxcclxuICAgICAgICBiOiBbMCwgMCwgMF0sXHJcbiAgICAgICAgYzogWzAsIDAsIDBdLFxyXG4gICAgICAgIGQ6IFswLCAwLCAwXSxcclxuICAgICAgICBzZWFyY2hfZGlyOiBbMCwgMCwgMF0sXHJcbiAgICAgICAgc2ltcF9kaW06IDAsXHJcbiAgICB9O1xyXG4gICAgY29uc3Qgb3JpZ2luc01hcCA9IG5ldyBNYXAoKTtcclxuICAgIGxldCBtdHYgPSBbMCwgMCwgMF07XHJcbiAgICBwcm9wcy5zZWFyY2hfZGlyID0gZGlmZihjb2xsMS5nZXRUcmFuc2xhdGlvbigpLCBjb2xsMi5nZXRUcmFuc2xhdGlvbigpKTtcclxuICAgIGNvbnN0IGNfb3JpZ2luMSA9IGNvbGwxLnN1cHBvcnQoc2NhbGUocHJvcHMuc2VhcmNoX2RpciwgLTEpKTtcclxuICAgIGNvbnN0IGNfb3JpZ2luMiA9IGNvbGwyLnN1cHBvcnQocHJvcHMuc2VhcmNoX2Rpcik7XHJcbiAgICBwcm9wcy5jID0gZGlmZihjX29yaWdpbjIsIGNfb3JpZ2luMSk7XHJcbiAgICBvcmlnaW5zTWFwLnNldChwcm9wcy5jLCBbY19vcmlnaW4xLCBjX29yaWdpbjJdKTtcclxuICAgIHByb3BzLnNlYXJjaF9kaXIgPSBzY2FsZShwcm9wcy5jLCAtMSk7XHJcbiAgICBjb25zdCBiX29yaWdpbjEgPSBjb2xsMS5zdXBwb3J0KHNjYWxlKHByb3BzLnNlYXJjaF9kaXIsIC0xKSk7XHJcbiAgICBjb25zdCBiX29yaWdpbjIgPSBjb2xsMi5zdXBwb3J0KHByb3BzLnNlYXJjaF9kaXIpO1xyXG4gICAgcHJvcHMuYiA9IGRpZmYoYl9vcmlnaW4yLCBiX29yaWdpbjEpO1xyXG4gICAgb3JpZ2luc01hcC5zZXQocHJvcHMuYiwgW2Jfb3JpZ2luMSwgYl9vcmlnaW4yXSk7XHJcbiAgICBpZiAoZG90KHByb3BzLmIsIHByb3BzLnNlYXJjaF9kaXIpIDwgMCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcHJvcHMuc2VhcmNoX2RpciA9IGNyb3NzKGNyb3NzKGRpZmYocHJvcHMuYywgcHJvcHMuYiksIHNjYWxlKHByb3BzLmIsIC0xKSksIGRpZmYocHJvcHMuYywgcHJvcHMuYikpO1xyXG4gICAgaWYgKGlzTnVsbChwcm9wcy5zZWFyY2hfZGlyKSkge1xyXG4gICAgICAgIHByb3BzLnNlYXJjaF9kaXIgPSBjcm9zcyhkaWZmKHByb3BzLmMsIHByb3BzLmIpLCBbMSwgMCwgMF0pO1xyXG4gICAgICAgIGlmIChpc051bGwocHJvcHMuc2VhcmNoX2RpcikpIHtcclxuICAgICAgICAgICAgcHJvcHMuc2VhcmNoX2RpciA9IGNyb3NzKGRpZmYocHJvcHMuYywgcHJvcHMuYiksIFswLCAwLCAtMV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb3BzLnNpbXBfZGltID0gMjtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR0pLX01BWF9JVEVSQVRJT05TX05VTTsgKytpKSB7XHJcbiAgICAgICAgY29uc3QgYV9vcmlnaW4xID0gY29sbDEuc3VwcG9ydChzY2FsZShwcm9wcy5zZWFyY2hfZGlyLCAtMSkpO1xyXG4gICAgICAgIGNvbnN0IGFfb3JpZ2luMiA9IGNvbGwyLnN1cHBvcnQocHJvcHMuc2VhcmNoX2Rpcik7XHJcbiAgICAgICAgcHJvcHMuYSA9IGRpZmYoYV9vcmlnaW4yLCBhX29yaWdpbjEpO1xyXG4gICAgICAgIG9yaWdpbnNNYXAuc2V0KHByb3BzLmEsIFthX29yaWdpbjEsIGFfb3JpZ2luMl0pO1xyXG4gICAgICAgIGlmIChkb3QocHJvcHMuYSwgcHJvcHMuc2VhcmNoX2RpcikgPCAwKVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICBwcm9wcy5zaW1wX2RpbSsrO1xyXG4gICAgICAgIGlmIChwcm9wcy5zaW1wX2RpbSA9PT0gMykge1xyXG4gICAgICAgICAgICB1cGRhdGVfc2ltcGxleDMocHJvcHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh1cGRhdGVfc2ltcGxleDQocHJvcHMpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHByb3BzKSwgeyBjb2xsMSwgY29sbDIsIG9yaWdpbnNNYXAgfSk7IC8vRVBBKHByb3BzLmEsIHByb3BzLmIsIHByb3BzLmMsIHByb3BzLmQsIG9yaWdpbnNNYXAsIGNvbGwxLCBjb2xsMik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn1cclxuY29uc3QgYmFyaWNlbnRyaWMgPSAoZmFjZSwgcG9pbnQpID0+IHtcclxuICAgIGxldCBhMTEgPSBmYWNlWzBdWzBdO1xyXG4gICAgbGV0IGExMiA9IGZhY2VbMV1bMF07XHJcbiAgICBsZXQgYTEzID0gZmFjZVsyXVswXTtcclxuICAgIGxldCBiMSA9IHBvaW50WzBdO1xyXG4gICAgbGV0IGEyMSA9IGZhY2VbMF1bMV07XHJcbiAgICBsZXQgYTIyID0gZmFjZVsxXVsxXTtcclxuICAgIGxldCBhMjMgPSBmYWNlWzJdWzFdO1xyXG4gICAgbGV0IGIyID0gcG9pbnRbMV07XHJcbiAgICBsZXQgYTMxID0gZmFjZVswXVsyXTtcclxuICAgIGxldCBhMzIgPSBmYWNlWzFdWzJdO1xyXG4gICAgbGV0IGEzMyA9IGZhY2VbMl1bMl07XHJcbiAgICBsZXQgYjMgPSBwb2ludFsyXTtcclxuICAgIGNvbnN0IGQgPSBhMTEgKiBhMjIgKiBhMzMgK1xyXG4gICAgICAgIGEyMSAqIGEzMiAqIGExMyArXHJcbiAgICAgICAgYTEyICogYTIzICogYTMxIC1cclxuICAgICAgICBhMTMgKiBhMjIgKiBhMzEgLVxyXG4gICAgICAgIGEyMSAqIGExMiAqIGEzMyAtXHJcbiAgICAgICAgYTMyICogYTIzICogYTExO1xyXG4gICAgY29uc3QgZDEgPSBiMSAqIGEyMiAqIGEzMyArXHJcbiAgICAgICAgYjIgKiBhMzIgKiBhMTMgK1xyXG4gICAgICAgIGExMiAqIGEyMyAqIGIzIC1cclxuICAgICAgICBhMTMgKiBhMjIgKiBiMyAtXHJcbiAgICAgICAgYjIgKiBhMTIgKiBhMzMgLVxyXG4gICAgICAgIGEzMiAqIGEyMyAqIGIxO1xyXG4gICAgY29uc3QgZDIgPSBhMTEgKiBiMiAqIGEzMyArXHJcbiAgICAgICAgYTIxICogYjMgKiBhMTMgK1xyXG4gICAgICAgIGIxICogYTIzICogYTMxIC1cclxuICAgICAgICBhMTMgKiBiMiAqIGEzMSAtXHJcbiAgICAgICAgYTExICogYjMgKiBhMjMgLVxyXG4gICAgICAgIGEyMSAqIGIxICogYTMzO1xyXG4gICAgY29uc3QgZDMgPSBhMTEgKiBhMjIgKiBiMyArXHJcbiAgICAgICAgYTIxICogYTMyICogYjEgK1xyXG4gICAgICAgIGExMiAqIGIyICogYTMxIC1cclxuICAgICAgICBiMSAqIGEyMiAqIGEzMSAtXHJcbiAgICAgICAgYTIxICogYTEyICogYjMgLVxyXG4gICAgICAgIGIyICogYTMyICogYTExO1xyXG4gICAgcmV0dXJuIFtkMSAvIGQsIGQyIC8gZCwgZDMgLyBkXTtcclxufTtcclxuY29uc3Qgb3JpZ2luVG9GYWNlUHJvaiA9IChmYWNlKSA9PiB7XHJcbiAgICBjb25zdCBub3JtYWwgPSBmYWNlWzNdO1xyXG4gICAgY29uc3QgcG9pbnQgPSBmYWNlWzBdO1xyXG4gICAgY29uc3QgYyA9IC1ub3JtYWxbMF0gKiBwb2ludFswXSAtIG5vcm1hbFsxXSAqIHBvaW50WzFdIC0gbm9ybWFsWzJdICogcG9pbnRbMl07XHJcbiAgICBjb25zdCB0ID0gLWMgL1xyXG4gICAgICAgIChub3JtYWxbMF0gKiBub3JtYWxbMF0gKyBub3JtYWxbMV0gKiBub3JtYWxbMV0gKyBub3JtYWxbMl0gKiBub3JtYWxbMl0pO1xyXG4gICAgcmV0dXJuIFt0ICogbm9ybWFsWzBdLCB0ICogbm9ybWFsWzFdLCB0ICogbm9ybWFsWzJdXTtcclxufTtcclxuY29uc3QgTUFYX05VTV9GQUNFUyA9IDY0O1xyXG5jb25zdCBNQVhfTlVNX0xPT1NFX0VER0VTID0gMzI7XHJcbmNvbnN0IEVQQV9NQVhfTlVNX0lURVIgPSA2NDtcclxuY29uc3QgRVBBID0gKGEsIGIsIGMsIGQsIG9yaWdpbnNNYXAsIGNvbGwxLCBjb2xsMikgPT4ge1xyXG4gICAgY29uc3QgZmFjZXMgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XHJcbiAgICAgICAgZmFjZXNbaV0gPSBbXTtcclxuICAgIH1cclxuICAgIGZhY2VzWzBdWzBdID0gYTtcclxuICAgIGZhY2VzWzBdWzFdID0gYjtcclxuICAgIGZhY2VzWzBdWzJdID0gYztcclxuICAgIGZhY2VzWzBdWzNdID0gbm9ybWFsaXplKGNyb3NzKGRpZmYoYiwgYSksIGRpZmYoYywgYSkpKTtcclxuICAgIGZhY2VzWzFdWzBdID0gYTtcclxuICAgIGZhY2VzWzFdWzFdID0gYztcclxuICAgIGZhY2VzWzFdWzJdID0gZDtcclxuICAgIGZhY2VzWzFdWzNdID0gbm9ybWFsaXplKGNyb3NzKGRpZmYoYywgYSksIGRpZmYoZCwgYSkpKTtcclxuICAgIGZhY2VzWzJdWzBdID0gYTtcclxuICAgIGZhY2VzWzJdWzFdID0gZDtcclxuICAgIGZhY2VzWzJdWzJdID0gYjtcclxuICAgIGZhY2VzWzJdWzNdID0gbm9ybWFsaXplKGNyb3NzKGRpZmYoZCwgYSksIGRpZmYoYiwgYSkpKTtcclxuICAgIGZhY2VzWzNdWzBdID0gYjtcclxuICAgIGZhY2VzWzNdWzFdID0gZDtcclxuICAgIGZhY2VzWzNdWzJdID0gYztcclxuICAgIGZhY2VzWzNdWzNdID0gbm9ybWFsaXplKGNyb3NzKGRpZmYoZCwgYiksIGRpZmYoYywgYikpKTtcclxuICAgIGxldCBudW1fZmFjZXMgPSA0O1xyXG4gICAgbGV0IGNsb3Nlc3RfZmFjZSA9IG51bGw7XHJcbiAgICBsZXQgc2VhcmNoX2RpcjtcclxuICAgIGxldCBwO1xyXG4gICAgZm9yIChsZXQgaXRlcmF0aW9uID0gMDsgaXRlcmF0aW9uIDwgRVBBX01BWF9OVU1fSVRFUjsgKytpdGVyYXRpb24pIHtcclxuICAgICAgICBsZXQgbWluX2Rpc3QgPSBkb3QoZmFjZXNbMF1bMF0sIGZhY2VzWzBdWzNdKTtcclxuICAgICAgICBjbG9zZXN0X2ZhY2UgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtX2ZhY2VzOyArK2kpIHtcclxuICAgICAgICAgICAgbGV0IGRpc3QgPSBkb3QoZmFjZXNbaV1bMF0sIGZhY2VzW2ldWzNdKTtcclxuICAgICAgICAgICAgaWYgKGRpc3QgPCBtaW5fZGlzdCkge1xyXG4gICAgICAgICAgICAgICAgbWluX2Rpc3QgPSBkaXN0O1xyXG4gICAgICAgICAgICAgICAgY2xvc2VzdF9mYWNlID0gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzZWFyY2hfZGlyID0gZmFjZXNbY2xvc2VzdF9mYWNlXVszXTtcclxuICAgICAgICBjb25zdCBwX29yaWdpbjEgPSBjb2xsMS5zdXBwb3J0KHNjYWxlKHNlYXJjaF9kaXIsIC0xKSk7XHJcbiAgICAgICAgY29uc3QgcF9vcmlnaW4yID0gY29sbDIuc3VwcG9ydChzZWFyY2hfZGlyKTtcclxuICAgICAgICBwID0gZGlmZihwX29yaWdpbjIsIHBfb3JpZ2luMSk7XHJcbiAgICAgICAgb3JpZ2luc01hcC5zZXQocCwgW3Bfb3JpZ2luMSwgcF9vcmlnaW4yXSk7XHJcbiAgICAgICAgaWYgKGRvdChwLCBzZWFyY2hfZGlyKSAtIG1pbl9kaXN0IDwgRVBBX0JJQVMpIHtcclxuICAgICAgICAgICAgY29uc3QgZmFjZSA9IGZhY2VzW2Nsb3Nlc3RfZmFjZV07XHJcbiAgICAgICAgICAgIGNvbnN0IHBvaW50ID0gb3JpZ2luVG9GYWNlUHJvaihmYWNlKTtcclxuICAgICAgICAgICAgY29uc3QgW0FhLCBCYV0gPSBvcmlnaW5zTWFwLmdldChmYWNlWzBdKTtcclxuICAgICAgICAgICAgLy9jb25zdCBBYSA9IGZhY2VbMF0ub2FcclxuICAgICAgICAgICAgLy9jb25zdCBCYSA9IGZhY2VbMF0ub2JcclxuICAgICAgICAgICAgY29uc3QgW0FiLCBCYl0gPSBvcmlnaW5zTWFwLmdldChmYWNlWzFdKTtcclxuICAgICAgICAgICAgLy9jb25zdCBBYiA9IGZhY2VbMV0ub2FcclxuICAgICAgICAgICAgLy9jb25zdCBCYiA9IGZhY2VbMV0ub2JcclxuICAgICAgICAgICAgY29uc3QgW0FjLCBCY10gPSBvcmlnaW5zTWFwLmdldChmYWNlWzJdKTtcclxuICAgICAgICAgICAgLy9jb25zdCBBYyA9IGZhY2VbMl0ub2FcclxuICAgICAgICAgICAgLy9jb25zdCBCYyA9IGZhY2VbMl0ub2JcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYmFyaWNlbnRyaWMoZmFjZSwgcG9pbnQpO1xyXG4gICAgICAgICAgICBpZiAoaXNOYU4ocmVzdWx0WzBdICsgcmVzdWx0WzFdICsgcmVzdWx0WzJdKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IFBBID0gc3VtKHN1bShzY2FsZShBYSwgcmVzdWx0WzBdKSwgc2NhbGUoQWIsIHJlc3VsdFsxXSkpLCBzY2FsZShBYywgcmVzdWx0WzJdKSk7XHJcbiAgICAgICAgICAgIC8vQWEubXVsdGlwbHkocmVzdWx0WzBdKS5hZGQoQWIubXVsdGlwbHkocmVzdWx0WzFdKSkuYWRkKEFjLm11bHRpcGx5KHJlc3VsdFsyXSkpXHJcbiAgICAgICAgICAgIGxldCBQQiA9IHN1bShzdW0oc2NhbGUoQmEsIHJlc3VsdFswXSksIHNjYWxlKEJiLCByZXN1bHRbMV0pKSwgc2NhbGUoQmMsIHJlc3VsdFsyXSkpO1xyXG4gICAgICAgICAgICAvL0JhLm11bHRpcGx5KHJlc3VsdFswXSkuYWRkKEJiLm11bHRpcGx5KHJlc3VsdFsxXSkpLmFkZChCYy5tdWx0aXBseShyZXN1bHRbMl0pKVxyXG4gICAgICAgICAgICAvL2NvbnN0IHJhID0gUEEuc3Vic3RyYWN0KGNvbGwxLnBvcylcclxuICAgICAgICAgICAgY29uc3QgbiA9IHNjYWxlKGZhY2VbM10sIC0xKTsgLy9cclxuICAgICAgICAgICAgLy9jb25zdCBuID0gbm9ybWFsaXplKHNjYWxlKGZhY2VbM10sIC1kb3QocCwgc2VhcmNoX2RpcikpKTtcclxuICAgICAgICAgICAgLy9pZiAobm9ybShuKSA8IDAuMDEpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbkVycm9yID0gLWRvdChkaWZmKFBCLCBQQSksIG4pO1xyXG4gICAgICAgICAgICByZXR1cm4geyBQQSwgUEIsIG4sIHBvc2l0aW9uRXJyb3IgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbG9vc2VfZWRnZXMgPSBbXTtcclxuICAgICAgICBsZXQgbnVtX2xvb3NlX2VkZ2VzID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bV9mYWNlczsgKytpKSB7XHJcbiAgICAgICAgICAgIGlmIChkb3QoZmFjZXNbaV1bM10sIGRpZmYocCwgZmFjZXNbaV1bMF0pKSA+IDApIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMzsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRfZWRnZSA9IFtmYWNlc1tpXVtqXSwgZmFjZXNbaV1bKGogKyAxKSAlIDNdXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZm91bmRfZWRnZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgbnVtX2xvb3NlX2VkZ2VzOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvb3NlX2VkZ2VzW2tdWzFdID09PSBjdXJyZW50X2VkZ2VbMF0gJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvb3NlX2VkZ2VzW2tdWzBdID09PSBjdXJyZW50X2VkZ2VbMV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvb3NlX2VkZ2VzW2tdWzBdID0gbG9vc2VfZWRnZXNbbnVtX2xvb3NlX2VkZ2VzIC0gMV1bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb29zZV9lZGdlc1trXVsxXSA9IGxvb3NlX2VkZ2VzW251bV9sb29zZV9lZGdlcyAtIDFdWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtX2xvb3NlX2VkZ2VzLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3VuZF9lZGdlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSBudW1fbG9vc2VfZWRnZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFmb3VuZF9lZGdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChudW1fbG9vc2VfZWRnZXMgPj0gTUFYX05VTV9MT09TRV9FREdFUylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb29zZV9lZGdlc1tudW1fbG9vc2VfZWRnZXNdID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvb3NlX2VkZ2VzW251bV9sb29zZV9lZGdlc11bMF0gPSBjdXJyZW50X2VkZ2VbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvb3NlX2VkZ2VzW251bV9sb29zZV9lZGdlc11bMV0gPSBjdXJyZW50X2VkZ2VbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bV9sb29zZV9lZGdlcysrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZhY2VzW2ldWzBdID0gZmFjZXNbbnVtX2ZhY2VzIC0gMV1bMF07XHJcbiAgICAgICAgICAgICAgICBmYWNlc1tpXVsxXSA9IGZhY2VzW251bV9mYWNlcyAtIDFdWzFdO1xyXG4gICAgICAgICAgICAgICAgZmFjZXNbaV1bMl0gPSBmYWNlc1tudW1fZmFjZXMgLSAxXVsyXTtcclxuICAgICAgICAgICAgICAgIGZhY2VzW2ldWzNdID0gZmFjZXNbbnVtX2ZhY2VzIC0gMV1bM107XHJcbiAgICAgICAgICAgICAgICBudW1fZmFjZXMtLTtcclxuICAgICAgICAgICAgICAgIGktLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bV9sb29zZV9lZGdlczsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChudW1fZmFjZXMgPj0gTUFYX05VTV9GQUNFUylcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBmYWNlc1tudW1fZmFjZXNdID0gW107XHJcbiAgICAgICAgICAgIGZhY2VzW251bV9mYWNlc11bMF0gPSBsb29zZV9lZGdlc1tpXVswXTtcclxuICAgICAgICAgICAgZmFjZXNbbnVtX2ZhY2VzXVsxXSA9IGxvb3NlX2VkZ2VzW2ldWzFdO1xyXG4gICAgICAgICAgICBmYWNlc1tudW1fZmFjZXNdWzJdID0gcDtcclxuICAgICAgICAgICAgZmFjZXNbbnVtX2ZhY2VzXVszXSA9IG5vcm1hbGl6ZShjcm9zcyhkaWZmKGxvb3NlX2VkZ2VzW2ldWzBdLCBsb29zZV9lZGdlc1tpXVsxXSksIGRpZmYobG9vc2VfZWRnZXNbaV1bMF0sIHApKSk7XHJcbiAgICAgICAgICAgIGlmIChkb3QoZmFjZXNbbnVtX2ZhY2VzXVswXSwgZmFjZXNbbnVtX2ZhY2VzXVszXSkgKyAwLjAxIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGVtcCA9IGZhY2VzW251bV9mYWNlc11bMF07XHJcbiAgICAgICAgICAgICAgICBmYWNlc1tudW1fZmFjZXNdWzBdID0gZmFjZXNbbnVtX2ZhY2VzXVsxXTtcclxuICAgICAgICAgICAgICAgIGZhY2VzW251bV9mYWNlc11bMV0gPSB0ZW1wO1xyXG4gICAgICAgICAgICAgICAgZmFjZXNbbnVtX2ZhY2VzXVszXSA9IHNjYWxlKGZhY2VzW251bV9mYWNlc11bM10sIC0xKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBudW1fZmFjZXMrKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuLypcclxuY29uc3QgZ2V0Q29udGFjdHMgPSAoXHJcbiAgY29sbDE6IElDb2xsaWRlcixcclxuICBjb2xsMjogSUNvbGxpZGVyXHJcbik6IHtcclxuICByYUxvY2FsOiB2ZWMzO1xyXG4gIHJiTG9jYWw6IHZlYzM7XHJcbiAgcmE6IHZlYzM7XHJcbiAgcmI6IHZlYzM7XHJcbiAgUEE6IHZlYzM7XHJcbiAgUEI6IHZlYzM7XHJcbiAgbjogdmVjMztcclxuICBwb3NpdGlvbkVycm9yOiBudW1iZXI7XHJcbiAgaTogdmVjMztcclxuICBqOiB2ZWMzO1xyXG59W10gPT4ge1xyXG4gIGNvbnN0IGNvbnRhY3REYXRhID0gZ2prKGNvbGwxLCBjb2xsMik7XHJcbiAgaWYgKCFjb250YWN0RGF0YSkgcmV0dXJuIFtdO1xyXG5cclxuICBjb25zdCB7IFBBLCBQQiwgbiwgcG9zaXRpb25FcnJvciB9ID0gY29udGFjdERhdGE7XHJcblxyXG5cclxuICBpZiAoY29sbDEuZ2V0VHlwZSgpID09PSBcInNwaGVyZVwiIHx8IGNvbGwyLmdldFR5cGUoKSA9PT0gXCJzcGhlcmVcIikge1xyXG4gICAgY29uc3QgcmIgPSBkaWZmKFBCLCBjb2xsMi5nZXRUcmFuc2xhdGlvbigpKTtcclxuICAgIGNvbnN0IHJhID0gZGlmZihQQSwgY29sbDEuZ2V0VHJhbnNsYXRpb24oKSk7XHJcblxyXG4gICAgY29uc3QgcmFMb2NhbCA9IG0zLnRyYW5zZm9ybVBvaW50KGNvbGwxLmdldFJtYXRyaXhJbnZlcnNlKCksIHJhKTtcclxuICAgIGNvbnN0IHJiTG9jYWwgPSBtMy50cmFuc2Zvcm1Qb2ludChjb2xsMi5nZXRSbWF0cml4SW52ZXJzZSgpLCByYik7XHJcbiAgICBjb25zdCBpOiB2ZWMzID0gW25bMV0gKyBuWzJdLCBuWzJdIC0gblswXSwgLW5bMF0gLSBuWzFdXTtcclxuXHJcbiAgICBjb25zdCBqID0gY3Jvc3Moc2NhbGUobiwgLTEpLCBpKTtcclxuICAgIHJldHVybiBbXHJcbiAgICAgIHtcclxuICAgICAgICByYSwgcmIsIG4sIFBBLCBQQiwgcG9zaXRpb25FcnJvciwgaSwgaiwgcmFMb2NhbCwgcmJMb2NhbFxyXG4gICAgICB9XHJcbiAgICBdO1xyXG4gIH1cclxuICBcclxuICBjb25zdCBuUmV2ZXJzZSA9IHNjYWxlKG4sIC0xKTtcclxuXHJcbiAgY29uc3QgY29udGFjdEZhY2UxID0gY29sbDEuZ2V0Q2xvc2VzdEZhY2VCeU5vcm1hbChuUmV2ZXJzZSk7XHJcbiAgY29uc3QgY29udGFjdEZhY2UyID0gY29sbDIuZ2V0Q2xvc2VzdEZhY2VCeU5vcm1hbChuKTtcclxuXHJcbiAgY29uc3QgcGxhbmU6IHBsYW5lID0gW3NjYWxlKHN1bShQQSwgUEIpLCAwLjUpLCBuXTtcclxuICBjb25zdCBwcm9qZWN0aW9uczEgPSBjb250YWN0RmFjZTEudmVydGljZXMubWFwKChwKSA9PlxyXG4gICAgcG9pbnRPblBsYW5lUHJvamVjdGlvbihwbGFuZSwgcClcclxuICApO1xyXG4gIGNvbnN0IHByb2plY3Rpb25zMiA9IGNvbnRhY3RGYWNlMi52ZXJ0aWNlcy5tYXAoKHApID0+XHJcbiAgICBwb2ludE9uUGxhbmVQcm9qZWN0aW9uKHBsYW5lLCBwKVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IG9yaWdpbiA9IHBsYW5lWzBdO1xyXG4gIGNvbnN0IGkgPSBub3JtYWxpemUoW25bMV0gKyBuWzJdLCBuWzJdIC0gblswXSwgLW5bMF0gLSBuWzFdXSk7XHJcblxyXG4gIGNvbnN0IGogPSBjcm9zcyhzY2FsZShuLCAtMSksIGkpO1xyXG5cclxuICBsZXQgXzJkMSA9IHByb2plY3Rpb25zMS5tYXAoKHApID0+IGdldDJEY29vcmRzT25QbGFuZShpLCBqLCBkaWZmKHAsIG9yaWdpbikpKTtcclxuICBsZXQgXzJkMiA9IHByb2plY3Rpb25zMi5tYXAoKHApID0+IGdldDJEY29vcmRzT25QbGFuZShpLCBqLCBkaWZmKHAsIG9yaWdpbikpKTtcclxuXHJcbiAgY29uc3QgZGlyMSA9IGlzSW5DbG9ja3dpc2UoXzJkMSk7XHJcbiAgY29uc3QgZGlyMiA9IGlzSW5DbG9ja3dpc2UoXzJkMik7XHJcbiAgaWYgKGRpcjEgPCAwKSBfMmQxID0gXzJkMS5tYXAoKF8sIGkpID0+IF8yZDEuYXQoLWkpKTtcclxuICBpZiAoZGlyMiA8IDApIF8yZDIgPSBfMmQyLm1hcCgoXywgaSkgPT4gXzJkMi5hdCgtaSkpO1xyXG5cclxuICBjb25zdCBjbGlwcGVkID0gY2xpcEZhY2VWc0ZhY2UoXzJkMSwgXzJkMik7XHJcblxyXG4gIGNvbnN0IF8zZCA9IGNsaXBwZWQubWFwKChwKSA9PlxyXG4gICAgc3VtKG9yaWdpbiwgc3VtKHNjYWxlKGksIHBbMF0pLCBzY2FsZShqLCBwWzFdKSkpXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgZmVhdHVyZXMgPSBbXTtcclxuICBfM2QuZm9yRWFjaCgocG9pbnQpID0+IHtcclxuICAgIGNvbnN0IFBBID0gcmF5VnNQbGFuZUludGVyc2VjKFxyXG4gICAgICBbY29udGFjdEZhY2UxLnZlcnRpY2VzWzBdLCBjb250YWN0RmFjZTEubm9ybWFsXSxcclxuICAgICAgcG9pbnQsXHJcbiAgICAgIG5cclxuICAgICk7XHJcbiAgICBpZiAoIWlzUG9pbnRCZWhpbmRQbGFuZShwbGFuZSwgUEEsIDEpKSByZXR1cm47XHJcbiAgICBjb25zdCBQQiA9IHJheVZzUGxhbmVJbnRlcnNlYyhcclxuICAgICAgW2NvbnRhY3RGYWNlMi52ZXJ0aWNlc1swXSwgY29udGFjdEZhY2UyLm5vcm1hbF0sXHJcbiAgICAgIHBvaW50LFxyXG4gICAgICBuXHJcbiAgICApO1xyXG4gICAgaWYgKCFpc1BvaW50QmVoaW5kUGxhbmUocGxhbmUsIFBCLCAtMSkpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCByYiA9IGRpZmYoUEIsIGNvbGwyLmdldFRyYW5zbGF0aW9uKCkpO1xyXG4gICAgY29uc3QgcmEgPSBkaWZmKFBBLCBjb2xsMS5nZXRUcmFuc2xhdGlvbigpKTtcclxuICAgIGNvbnN0IHBvc2l0aW9uRXJyb3IgPSAtZG90KGRpZmYoUEIsIFBBKSwgbik7XHJcbiAgICBjb25zdCByYUxvY2FsID0gbTMudHJhbnNmb3JtUG9pbnQoY29sbDEuZ2V0Um1hdHJpeEludmVyc2UoKSwgcmEpO1xyXG4gICAgY29uc3QgcmJMb2NhbCA9IG0zLnRyYW5zZm9ybVBvaW50KGNvbGwyLmdldFJtYXRyaXhJbnZlcnNlKCksIHJiKTtcclxuXHJcbiAgICBmZWF0dXJlcy5wdXNoKFxyXG4gICAgICB7XHJcbiAgICAgICAgcmEsIHJiLCBuLCBQQSwgUEIsIHBvc2l0aW9uRXJyb3IsIGksIGosIHJhTG9jYWwsIHJiTG9jYWxcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9KTtcclxuXHJcbiAgaWYgKGZlYXR1cmVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgY29uc29sZS5sb2coXzJkMSwgXzJkMiwgY2xpcHBlZCApXHJcbiAgICB0aHJvdyAxXHJcbiAgICBjb25zdCByYiA9IGRpZmYoUEIsIGNvbGwyLmdldFRyYW5zbGF0aW9uKCkpO1xyXG4gICAgY29uc3QgcmEgPSBkaWZmKFBBLCBjb2xsMS5nZXRUcmFuc2xhdGlvbigpKTtcclxuICAgIGNvbnN0IHJhTG9jYWwgPSBtMy50cmFuc2Zvcm1Qb2ludChjb2xsMS5nZXRSbWF0cml4SW52ZXJzZSgpLCByYSk7XHJcbiAgICBjb25zdCByYkxvY2FsID0gbTMudHJhbnNmb3JtUG9pbnQoY29sbDIuZ2V0Um1hdHJpeEludmVyc2UoKSwgcmIpO1xyXG4gICAgZmVhdHVyZXMucHVzaChcclxuICAgICAge1xyXG4gICAgICAgIHJhLCByYiwgbiwgUEEsIFBCLCBwb3NpdGlvbkVycm9yLCBpLCBqLCByYUxvY2FsLCByYkxvY2FsXHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZmVhdHVyZXM7XHJcbn07XHJcbiovXHJcbmV4cG9ydCB7IGdqaywgRVBBLCBcclxuLy8gZ2V0Q29udGFjdHMsXHJcbnBvaW50T25QbGFuZVByb2plY3Rpb24sIGNsaXBQb2ludHNCZWhpbmRQbGFuZSwgZ2V0MkRjb29yZHNPblBsYW5lLCByYXlWc1BsYW5lSW50ZXJzZWMsIH07XHJcbiIsIlxyXG5pbXBvcnQge200LCBtMywgdjN9IGZyb20gJ3JvbWFucHBwbWF0aCdcclxuXHJcbmNvbnN0IEtFWVMgPSB7XHJcbiAgICAndycgOiAnbW92ZUZvcndhcmQnLFxyXG4gICAgJ3MnIDogJ21vdmVCYWNrd2FyZCcsXHJcbiAgICAnYScgOiAnbW92ZUxlZnQnLFxyXG4gICAgJ2QnIDogJ21vdmVSaWdodCcsXHJcbiAgICAnICcgOiAnbW92ZVVwJ1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGcmVlQ2FtIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMua2V5SW5wdXQgPSBudWxsO1xyXG4gICAgdGhpcy5tb3VzZUlucHV0ID0gbnVsbDtcclxuICAgIHRoaXMucm90YXRpb25YID0gMDtcclxuICAgIHRoaXMucm90YXRpb25ZID0gMDtcclxuICAgIHRoaXMuZGVsdGFSWSA9IDA7XHJcbiAgICB0aGlzLmNhbVBvcyA9IFswLCAwLCAxMF07XHJcbiAgICB0aGlzLmNhbVJvdCA9IG0zLmlkZW50aXR5KCk7XHJcbiAgfVxyXG4gIGxpc3Rlbk1vdXNlKG1vdXNlSW5wdXQpIHtcclxuICAgIHRoaXMubW91c2VJbnB1dCA9IG1vdXNlSW5wdXQ7XHJcbiAgICBtb3VzZUlucHV0Lm9uKFwibW92ZVwiLCAoW2RlbHRhWCwgZGVsdGFZXSkgPT4ge1xyXG4gICAgICB0aGlzLnJvdGF0aW9uWSAtPSBkZWx0YVggKiAwLjAwNTtcclxuICAgICAgdGhpcy5yb3RhdGlvblggLT0gZGVsdGFZICogMC4wMDU7XHJcbiAgICAgIHRoaXMucm90YXRpb25YID0gTWF0aC5tYXgoXHJcbiAgICAgICAgLU1hdGguUEkgLyAyLFxyXG4gICAgICAgIE1hdGgubWluKE1hdGguUEkgLyAyLCB0aGlzLnJvdGF0aW9uWClcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5kZWx0YVJZID0gZGVsdGFYICogMC4wMDU7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgbGlzdGVuS2V5Ym9hcmQoa2V5SW5wdXQpIHtcclxuICAgIHRoaXMua2V5SW5wdXQgPSBrZXlJbnB1dDtcclxuICB9XHJcbiAgdGljaygpIHtcclxuICAgIGZvciAoY29uc3Qga2V5IG9mIHRoaXMua2V5SW5wdXQua2V5cykge1xyXG4gICAgICBjb25zdCBhY3Rpb25OYW1lID0gS0VZU1trZXldO1xyXG4gICAgICBpZiAoYWN0aW9uTmFtZSkge1xyXG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IHRoaXNbYWN0aW9uTmFtZV0uYmluZCh0aGlzKTtcclxuICAgICAgICBhY3Rpb24oKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2FtTWF0cml4ID0gbTQudHJhbnNsYXRpb24oLi4udGhpcy5jYW1Qb3MpO1xyXG4gICAgdGhpcy5jYW1NYXRyaXggPSBtNC54Um90YXRlKFxyXG4gICAgICBtNC55Um90YXRlKHRoaXMuY2FtTWF0cml4LCB0aGlzLnJvdGF0aW9uWSksXHJcbiAgICAgIHRoaXMucm90YXRpb25YXHJcbiAgICApO1xyXG4gIH1cclxuICBtb3ZlKGRpcikge1xyXG4gICAgY29uc3QgbSA9IG00Lm00VG9tMyh0aGlzLmNhbU1hdHJpeCk7XHJcbiAgICB0aGlzLmNhbVBvcyA9IHYzLnN1bSh0aGlzLmNhbVBvcywgbTMudHJhbnNmb3JtUG9pbnQobSwgZGlyKSk7XHJcbiAgfVxyXG4gIG1vdmVGb3J3YXJkKCkge1xyXG4gICAgdGhpcy5tb3ZlKFswLCAwLCAtMV0pO1xyXG4gIH1cclxuICBtb3ZlQmFja3dhcmQoKSB7XHJcbiAgICB0aGlzLm1vdmUoWzAsIDAsIDFdKTtcclxuICB9XHJcbiAgbW92ZUxlZnQoKSB7XHJcbiAgICB0aGlzLm1vdmUoWy0xLCAwLCAwXSk7XHJcbiAgfVxyXG4gIG1vdmVSaWdodCgpIHtcclxuICAgIHRoaXMubW92ZShbMSwgMCwgMF0pO1xyXG4gIH1cclxuICBtb3ZlVXAoKSB7XHJcbiAgICB0aGlzLm1vdmUoWzAsIDEsIDBdKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0ICBFdmVudEVtaXR0ZXIgIGZyb20gXCIuLi9waHlzaWNzL0V2ZW50RW1pdHRlci50c1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS2V5SW5wdXQgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgdGhpcy5rZXlzID0gbmV3IFNldCgpO1xyXG4gIH1cclxuICBsb2dEb3duKHsga2V5IH0pIHtcclxuICAgIHRoaXMua2V5cy5hZGQoa2V5KTtcclxuICAgIHRoaXMuZW1pdChcImtleWRvd25cIiwgeyBrZXkgfSk7XHJcbiAgfVxyXG4gIGxvZ1VwKHsga2V5IH0pIHtcclxuICAgIHRoaXMua2V5cy5kZWxldGUoa2V5KTtcclxuICAgIHRoaXMuZW1pdChcImtleXVwXCIsIHsga2V5IH0pO1xyXG4gIH1cclxuICBsaXN0ZW4oKSB7XHJcbiAgICBjb25zdCBsb2dEb3duID0gdGhpcy5sb2dEb3duLmJpbmQodGhpcyk7XHJcbiAgICBjb25zdCBsb2dVcCA9IHRoaXMubG9nVXAuYmluZCh0aGlzKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGxvZ0Rvd24pO1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGxvZ1VwKTtcclxuICAgIHRoaXMudW5zdWJzaWNyaWJlID0gKCkgPT4ge1xyXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBsb2dEb3duKTtcclxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGxvZ1VwKTtcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCAgRXZlbnRFbWl0dGVyICBmcm9tIFwiLi4vcGh5c2ljcy9FdmVudEVtaXR0ZXIudHNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdXNlSW5wdXQgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQgPSBkb2N1bWVudCkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMubGFzdFggPSAwO1xyXG4gICAgdGhpcy5sYXN0WSA9IDA7XHJcbiAgICB0aGlzLmVuYWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5tb3ZlcyA9IFtdXHJcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50XHJcbiAgfVxyXG4gIGxvZ01vdmUoeyBvZmZzZXRYLCBvZmZzZXRZIH0pIHtcclxuICAgIGNvbnN0IGRlbHRhWCA9IG9mZnNldFggLSB0aGlzLmxhc3RYO1xyXG4gICAgdGhpcy5sYXN0WCA9IG9mZnNldFg7XHJcbiAgICBjb25zdCBkZWx0YVkgPSBvZmZzZXRZIC0gdGhpcy5sYXN0WTtcclxuICAgIHRoaXMubGFzdFkgPSBvZmZzZXRZO1xyXG4gICAgdGhpcy5lbWl0KFwibW92ZVwiLCBbZGVsdGFYLCBkZWx0YVldKTtcclxuICAgIHRoaXMubW92ZXMucHVzaChbZGVsdGFYLCBkZWx0YVldKVxyXG4gIH1cclxuICBsaXN0ZW4oKSB7XHJcbiAgICBjb25zdCBsb2dNb3ZlID0gdGhpcy5sb2dNb3ZlLmJpbmQodGhpcyk7XHJcbiAgICBjb25zdCBfID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgaWYgKHRoaXMuZW5hYmxlKSBsb2dNb3ZlKGUpO1xyXG4gICAgfS5iaW5kKHRoaXMpO1xyXG4gICAgY29uc3QgZG93biA9IGZ1bmN0aW9uICh7IG9mZnNldFgsIG9mZnNldFkgfSkge1xyXG4gICAgICB0aGlzLmxhc3RYID0gb2Zmc2V0WDtcclxuICAgICAgdGhpcy5sYXN0WSA9IG9mZnNldFk7XHJcbiAgICAgIHRoaXMuZW5hYmxlID0gdHJ1ZTtcclxuICAgIH0uYmluZCh0aGlzKTtcclxuICAgIGNvbnN0IHVwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aGlzLmVuYWJsZSA9IGZhbHNlO1xyXG4gICAgfS5iaW5kKHRoaXMpO1xyXG5cclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIF8pO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgZG93bik7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdXApO1xyXG4gICAgdGhpcy51bnN1YnNjcmliZSA9ICgpID0+IHtcclxuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgXyk7XHJcbiAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGRvd24pO1xyXG4gICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdXApO1xyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBtNCB9IGZyb20gXCJyb21hbnBwcG1hdGhcIjtcclxuaW1wb3J0IHsgY3JlYXRlQm94LCBHTGNvbnRleHRXcmFwcGVyLCBwb2ludExpZ2h0U2hhZGVycywgZGVmYXVsdFNoYWRlcnMsIGNyZWF0ZVNwaGVyZSwgfSBmcm9tIFwicm9tYW5wcHBncmFwaGljc1wiO1xyXG5pbXBvcnQgdGV4dHVyZVNoYWRlcnMgZnJvbSBcIi4vdGV4dHVyZVNoYWRlclwiO1xyXG5pbXBvcnQgeyBnZXRCb3hVVnMgfSBmcm9tIFwiLi9ib3hVVnNcIjtcclxuaW1wb3J0IEZyZWVDYW0gZnJvbSBcIi4uLy4uL3NyYy9taXNjL0ZyZWVDYW1cIjtcclxuaW1wb3J0IEtleUlucHV0IGZyb20gXCIuLi8uLi9zcmMvbWlzYy9rZXlJbnB1dFwiO1xyXG5pbXBvcnQgTW91c2VJbnB1dCBmcm9tIFwiLi4vLi4vc3JjL21pc2MvbW91c2VJbnB1dFwiO1xyXG5jb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiKTtcclxuaWYgKCFjYW52YXMpXHJcbiAgICB0aHJvdyBcIk5vIGNhbnZhcyBmb3VuZFwiO1xyXG5jb25zdCBtb3VzZUlucHV0ID0gbmV3IE1vdXNlSW5wdXQoY2FudmFzKTtcclxubW91c2VJbnB1dC5saXN0ZW4oKTtcclxuY29uc3Qga2V5SW5wdXQgPSBuZXcgS2V5SW5wdXQoKTtcclxua2V5SW5wdXQubGlzdGVuKCk7XHJcbmNvbnN0IHBsYXllciA9IG5ldyBGcmVlQ2FtKCk7XHJcbnBsYXllci5saXN0ZW5LZXlib2FyZChrZXlJbnB1dCk7XHJcbnBsYXllci5saXN0ZW5Nb3VzZShtb3VzZUlucHV0KTtcclxucGxheWVyLmNhbVBvcyA9IFstMTAsIDE1LCAyMF07XHJcbnBsYXllci5yb3RhdGlvblggPSAtTWF0aC5QSSAqIDAuMTtcclxucGxheWVyLnJvdGF0aW9uWSA9IC1NYXRoLlBJICogMC4xO1xyXG5jb25zdCBjb250ZXh0ID0gbmV3IEdMY29udGV4dFdyYXBwZXIoXCJjYW52YXNcIik7XHJcbmNvbnN0IHsgUHJpbWl0aXZlUmVuZGVyZXIsIERyYXdlciwgUHJvZ3JhbUluZm8sIFRleHR1cmVJbmZvLCBnbCB9ID0gY29udGV4dDtcclxuY29udGV4dC5yZXNpemVDYW52YXNUb0Rpc3BsYXlTaXplKCk7XHJcbmNvbnN0IGRyYXdlciA9IG5ldyBEcmF3ZXIoKTtcclxuZHJhd2VyLnByb2plY3Rpb25NYXRyaXggPSBEcmF3ZXIuY3JlYXRlM2RQcm9qZWN0aW9uTWF0cml4KDEsIDIwMDAsIGdsLmNhbnZhcy53aWR0aCwgZ2wuY2FudmFzLmhlaWdodCk7XHJcbmNvbnN0IHBvaW50TGlnaHRQcm9ncmFtSW5mbyA9IG5ldyBQcm9ncmFtSW5mbyhwb2ludExpZ2h0U2hhZGVycy52ZXJ0LCBwb2ludExpZ2h0U2hhZGVycy5mcmFnKTtcclxucG9pbnRMaWdodFByb2dyYW1JbmZvLmNvbXBpbGVTaGFkZXJzKCkuY3JlYXRlVW5pZm9ybVNldHRlcnMoKTtcclxuY29uc3QgZGVmYXVsdFByb2dyYW1JbmZvID0gbmV3IFByb2dyYW1JbmZvKGRlZmF1bHRTaGFkZXJzLnZlcnQsIGRlZmF1bHRTaGFkZXJzLmZyYWcpO1xyXG5jb25zdCB0ZXh0dXJlUHJvZ3JhbUluZm8gPSBuZXcgUHJvZ3JhbUluZm8odGV4dHVyZVNoYWRlcnMudmVydCwgdGV4dHVyZVNoYWRlcnMuZnJhZyk7XHJcbnRleHR1cmVQcm9ncmFtSW5mby5jb21waWxlU2hhZGVycygpLmNyZWF0ZVVuaWZvcm1TZXR0ZXJzKCk7XHJcbmRlZmF1bHRQcm9ncmFtSW5mby5jb21waWxlU2hhZGVycygpLmNyZWF0ZVVuaWZvcm1TZXR0ZXJzKCk7XHJcbmNvbnN0IGN1YmUgPSBQcmltaXRpdmVSZW5kZXJlci5mcm9tQXJyYXlEYXRhKGNyZWF0ZUJveCgxLCAxLCAxKSk7XHJcbmNvbnN0IHBvaW50ID0gbmV3IFByaW1pdGl2ZVJlbmRlcmVyKCk7XHJcbmNvbnN0IGxpbmUgPSBuZXcgUHJpbWl0aXZlUmVuZGVyZXIoKTtcclxuY29uc3QgdGV4dHVyZTEgPSBuZXcgVGV4dHVyZUluZm8oKTtcclxudGV4dHVyZTEuY3JlYXRlVGV4dHVyZUZyb21VUkwoXCJyZXNvdXJjZXMvYXRsYXMucG5nXCIpO1xyXG5jb25zdCBzZXR0aW5ncyA9IFtcclxuICAgIHsgeDogLTEsIHk6IDEsIHpSb3Q6IDAsIG1hZ0ZpbHRlcjogZ2wuTkVBUkVTVCwgbWluRmlsdGVyOiBnbC5ORUFSRVNUIH0sXHJcbiAgICB7IHg6IDAsIHk6IDEsIHpSb3Q6IDAsIG1hZ0ZpbHRlcjogZ2wuTElORUFSLCBtaW5GaWx0ZXI6IGdsLkxJTkVBUiB9LFxyXG4gICAge1xyXG4gICAgICAgIHg6IDEsXHJcbiAgICAgICAgeTogMSxcclxuICAgICAgICB6Um90OiAwLFxyXG4gICAgICAgIG1hZ0ZpbHRlcjogZ2wuTElORUFSLFxyXG4gICAgICAgIG1pbkZpbHRlcjogZ2wuTkVBUkVTVF9NSVBNQVBfTkVBUkVTVCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgeDogLTEsXHJcbiAgICAgICAgeTogLTEsXHJcbiAgICAgICAgelJvdDogMSxcclxuICAgICAgICBtYWdGaWx0ZXI6IGdsLkxJTkVBUixcclxuICAgICAgICBtaW5GaWx0ZXI6IGdsLkxJTkVBUl9NSVBNQVBfTkVBUkVTVCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgeDogMCxcclxuICAgICAgICB5OiAtMSxcclxuICAgICAgICB6Um90OiAxLFxyXG4gICAgICAgIG1hZ0ZpbHRlcjogZ2wuTElORUFSLFxyXG4gICAgICAgIG1pbkZpbHRlcjogZ2wuTkVBUkVTVF9NSVBNQVBfTElORUFSLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICB4OiAxLFxyXG4gICAgICAgIHk6IC0xLFxyXG4gICAgICAgIHpSb3Q6IDEsXHJcbiAgICAgICAgbWFnRmlsdGVyOiBnbC5MSU5FQVIsXHJcbiAgICAgICAgbWluRmlsdGVyOiBnbC5MSU5FQVJfTUlQTUFQX0xJTkVBUixcclxuICAgIH0sXHJcbl07XHJcbmNvbnN0IHMgPSBzZXR0aW5nc1swXTtcclxuZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZTEudGV4dHVyZSk7XHJcbmdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBzLm1pbkZpbHRlcik7XHJcbmdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBzLm1hZ0ZpbHRlcik7XHJcbmNvbnN0IHV2cyA9IGdldEJveFVWcygxNiwgNCk7XHJcbmN1YmVcclxuICAgIC5jcmVhdGVWQU8oKVxyXG4gICAgLnNldERyYXdlcihkcmF3ZXIpXHJcbiAgICAuc2V0UHJvZ3JhbUluZm8odGV4dHVyZVByb2dyYW1JbmZvKVxyXG4gICAgLmJ1ZmZlckRhdGEoXCJURVhDT09SRF8wXCIsIHV2cylcclxuICAgIC5zZXRNb2RlKDQpO1xyXG5jb25zdCBzcGhlcmUgPSBQcmltaXRpdmVSZW5kZXJlci5mcm9tQXJyYXlEYXRhKGNyZWF0ZVNwaGVyZSgxLCAxMCwgMTApKTtcclxuc3BoZXJlXHJcbiAgICAuY3JlYXRlVkFPKClcclxuICAgIC5zZXREcmF3ZXIoZHJhd2VyKVxyXG4gICAgLnNldFByb2dyYW1JbmZvKHBvaW50TGlnaHRQcm9ncmFtSW5mbylcclxuICAgIC5zZXRNb2RlKDQpO1xyXG5wb2ludFxyXG4gICAgLmNyZWF0ZVZBTygpXHJcbiAgICAuc2V0RHJhd2VyKGRyYXdlcilcclxuICAgIC5zZXRQcm9ncmFtSW5mbyhkZWZhdWx0UHJvZ3JhbUluZm8pXHJcbiAgICAuY3JlYXRlQnVmZmVyQXR0cmliRGF0YSh7XHJcbiAgICBhdHRyaWJOYW1lOiBcImFfcG9zaXRpb25cIixcclxuICAgIGxvY2F0aW9uOiAwLFxyXG4gICAgYXR0cmlidXRlVHlwZTogV2ViR0wyUmVuZGVyaW5nQ29udGV4dC5GTE9BVF9WRUMzLFxyXG4gICAgbnVtQ29tcG9uZW50czogMyxcclxufSlcclxuICAgIC5zZXRBdHRyaWJ1dGVzKClcclxuICAgIC5idWZmZXJEYXRhKFwiYV9wb3NpdGlvblwiLCBuZXcgRmxvYXQzMkFycmF5KFsxLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAxXSkpXHJcbiAgICAuc2V0TW9kZSgzKVxyXG4gICAgLnNldE51bUVsZW1lbnRzKDUpO1xyXG5saW5lXHJcbiAgICAuY3JlYXRlVkFPKClcclxuICAgIC5zZXREcmF3ZXIoZHJhd2VyKVxyXG4gICAgLnNldFByb2dyYW1JbmZvKGRlZmF1bHRQcm9ncmFtSW5mbylcclxuICAgIC5jcmVhdGVCdWZmZXJBdHRyaWJEYXRhKHtcclxuICAgIGF0dHJpYk5hbWU6IFwiYV9wb3NpdGlvblwiLFxyXG4gICAgbG9jYXRpb246IDAsXHJcbiAgICBhdHRyaWJ1dGVUeXBlOiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0LkZMT0FUX1ZFQzMsXHJcbiAgICBudW1Db21wb25lbnRzOiAzLFxyXG59KVxyXG4gICAgLnNldEF0dHJpYnV0ZXMoKVxyXG4gICAgLnNldE1vZGUoMylcclxuICAgIC5zZXROdW1FbGVtZW50cygyKTtcclxuY29uc3QgdW5pZm9ybXMgPSB7XHJcbiAgICB1X2xpZ2h0V29ybGRQb3NpdGlvbjogWzMwLCA1MCwgMzBdLFxyXG4gICAgdV9hbWJpZW50TGlnaHQ6IFsxLCAxLCAwLjMsIDAuMTFdLFxyXG4gICAgdV9yZXZlcnNlTGlnaHREaXJlY3Rpb246IFsxLCAwLCAwXSxcclxuICAgIHVfc2hpbmluZXNzOiAzMDAsXHJcbn07XHJcbmltcG9ydCB7IFJpZ2lkQm9keSB9IGZyb20gXCIuLi8uLi9zcmMvcGh5c2ljcy9SaWdpZEJvZHlcIjtcclxuaW1wb3J0IFNpbXVsYXRpb24gZnJvbSBcIi4uLy4uL3NyYy9waHlzaWNzL1NpbXVsYXRpb25cIjtcclxuaW1wb3J0IHsgQm94LCBTcGhlcmUgfSBmcm9tIFwiLi4vLi4vc3JjL3BoeXNpY3MvQ29sbGlkZXJcIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vLi4vc3JjL3BoeXNpY3MvY29uZmlnXCI7XHJcbmltcG9ydCBEZWJ1ZyBmcm9tIFwiLi4vLi4vc3JjL3BoeXNpY3MvRGVidWdcIjtcclxuY29uZmlnLlJJR0lEX0JPRFlfTU9WRV9UUkVTSE9MRCA9IDAuMDAxO1xyXG5jb25maWcuQ09OVEFDVF9UUkVTSE9MRCA9IDAuMDAwMDE7XHJcbi8vY29uZmlnLkNMSVBfQklBUyA9IDAuMDE7XHJcbmNvbmZpZy5DT05UQUNUX01BTklGT0xEX0tFRVBfVFJFU0hPTEQgPSAwLjAwMTtcclxuY29uc3Qgc2ltID0gbmV3IFNpbXVsYXRpb24oKTtcclxuY29uc3QgYm9keSA9IG5ldyBSaWdpZEJvZHkobmV3IEJveCgxLCAxLCAxKSk7XHJcbmNvbnN0IGZsb29yID0ge1xyXG4gICAgcGh5c2ljczogbmV3IFJpZ2lkQm9keShuZXcgQm94KDEwMCwgNSwgMTAwKSksXHJcbiAgICBzcHJpdGU6IGN1YmUsXHJcbiAgICB1bmlmb3JtczogeyB1X2NvbG9yOiBbMSwgMCwgMSwgMV0gfSxcclxufTtcclxuZmxvb3IucGh5c2ljcy5zZXRNYXNzKDEpO1xyXG5mbG9vci5waHlzaWNzLnN0YXRpYyA9IHRydWU7XHJcbmZsb29yLnBoeXNpY3MudHJhbnNsYXRlKFswLCAtMi41LCAwXSk7XHJcbnNpbS5hZGRPYmplY3QoZmxvb3IucGh5c2ljcyk7XHJcbmxldCBvYmplY3RzVG9EcmF3ID0gW107XHJcbm9iamVjdHNUb0RyYXcucHVzaChmbG9vcik7XHJcbmZvciAobGV0IGkgPSAwOyBpIDwgMTU7IGkrKykge1xyXG4gICAgY29uc3QgYm94ID0ge1xyXG4gICAgICAgIHBoeXNpY3M6IG5ldyBSaWdpZEJvZHkobmV3IEJveCgzLCAzLCAzKSksXHJcbiAgICAgICAgc3ByaXRlOiBjdWJlLFxyXG4gICAgICAgIHVuaWZvcm1zOiB7IHVfY29sb3I6IFswLCAwLCAxLCAxXSB9LFxyXG4gICAgfTtcclxuICAgIGJveC5waHlzaWNzLnRyYW5zbGF0ZShbLTIuNSArIChpICUgNSkgKiAzLCAxICsgMy4wMSAqIChpICUgMyksIDBdKTtcclxuICAgIC8vYm94LnBoeXNpY3MudHJhbnNsYXRlKFswLCAgMSArIDMuMDEgKiAoaSksIDBdKTtcclxuICAgIGJveC5waHlzaWNzLnNldE1hc3MoNSk7XHJcbiAgICBib3gucGh5c2ljcy5hZGRBY2NlbGVyYXRpb24oWzAsIC05LCAwXSk7XHJcbiAgICBzaW0uYWRkT2JqZWN0KGJveC5waHlzaWNzKTtcclxuICAgIG9iamVjdHNUb0RyYXcucHVzaChib3gpO1xyXG59XHJcbmNvbnN0IGJveCA9IHtcclxuICAgIHBoeXNpY3M6IG5ldyBSaWdpZEJvZHkobmV3IFNwaGVyZSg1KSksXHJcbiAgICBzcHJpdGU6IHNwaGVyZSxcclxuICAgIHVuaWZvcm1zOiB7IHVfY29sb3I6IFswLCAwLCAxLCAxXSB9LFxyXG59O1xyXG5ib3gucGh5c2ljcy50cmFuc2xhdGUoWzAsIDUsIC0zMF0pO1xyXG5ib3gucGh5c2ljcy5zZXRNYXNzKDMyKTtcclxuYm94LnBoeXNpY3MuYWRkQWNjZWxlcmF0aW9uKFswLCAtOSwgMF0pO1xyXG5ib3gucGh5c2ljcy5hZGRWZWxvY2l0eShbMCwgMCwgMTBdKTtcclxuLy9ib3gucGh5c2ljcy5hZGRBbmd1bGFyVmVsb2NpdHkoWzEsIDEsIDFdKTtcclxuc2ltLmFkZE9iamVjdChib3gucGh5c2ljcyk7XHJcbm9iamVjdHNUb0RyYXcucHVzaChib3gpO1xyXG4vKlxyXG5jb25zdCBib3gyID0geyBwaHlzaWNzOiBuZXcgUmlnaWRCb2R5KG5ldyBCb3goNSkpLCBzcHJpdGU6IGN1YmUsIHVuaWZvcm1zIDoge3VfY29sb3IgOiBbMCwwLDEsMV19IH07XHJcbiAgYm94Mi5waHlzaWNzLnRyYW5zbGF0ZShbMCw1LDBdKTtcclxuICBib3gyLnBoeXNpY3Muc2V0TWFzcygyKTtcclxuICBib3gyLnBoeXNpY3MuYWRkQWNjZWxlcmF0aW9uKFswLCAtOSwgMF0pO1xyXG4gIGJveDIucGh5c2ljcy5hZGRWZWxvY2l0eShbMCwyMCwtMF0pXHJcbiAgYm94Mi5waHlzaWNzLmFkZEFuZ3VsYXJWKFsxLDEsMV0pXHJcbiAgc2ltLmFkZE9iamVjdChib3gyLnBoeXNpY3MpO1xyXG4gIG9iamVjdHNUb0RyYXcucHVzaChib3gyKTtcclxuKi9cclxubGV0IGxhc3RDYWxsID0gRGF0ZS5ub3coKTtcclxuY29uc3Qgc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcclxuY29uc3QgbG9vcCA9ICgpID0+IHtcclxuICAgIHBsYXllci50aWNrKCk7XHJcbiAgICBzaW0udGljaygwLjAxNSk7XHJcbiAgICBjb25zdCBjdXJlbnRUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgIGNvbnN0IGRlbHRhID0gY3VyZW50VGltZSAtIGxhc3RDYWxsO1xyXG4gICAgRGVidWcuZGF0YS5GUFMgPSBNYXRoLmZsb29yKE51bWJlcigoMSAvIGRlbHRhKSAqIDEwMDApKTtcclxuICAgIERlYnVnLmRhdGEuUlVOVElNRSA9IChjdXJlbnRUaW1lIC0gc3RhcnRUaW1lKSAvIDEwMDA7XHJcbiAgICBsYXN0Q2FsbCA9IGN1cmVudFRpbWU7XHJcbiAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUIHwgZ2wuREVQVEhfQlVGRkVSX0JJVCk7XHJcbiAgICBnbC5lbmFibGUoZ2wuQ1VMTF9GQUNFKTtcclxuICAgIGdsLmVuYWJsZShnbC5ERVBUSF9URVNUKTtcclxuICAgIGNvbnN0IGNhbWVyYU1hdHJpeCA9IHBsYXllci5jYW1NYXRyaXg7XHJcbiAgICBjb25zdCB7IHRyYW5zbGF0aW9uIH0gPSBtNC5kZWNvbXBvc2UoY2FtZXJhTWF0cml4KTtcclxuICAgIGNvbnN0IHVfdmlld1dvcmxkUG9zaXRpb24gPSB0cmFuc2xhdGlvbjtcclxuICAgIG9iamVjdHNUb0RyYXcuZm9yRWFjaCgob2JqKSA9PiB7XHJcbiAgICAgICAgb2JqLnNwcml0ZS5kcmF3KE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB1bmlmb3JtcyksIHsgdV9tYXRyaXg6IG9iai5waHlzaWNzLmdldENvbGxpZGVyKCkuZ2V0TTQoKSwgdV92aWV3V29ybGRQb3NpdGlvbiB9KSwgb2JqLnVuaWZvcm1zKSwgY2FtZXJhTWF0cml4KTtcclxuICAgIH0pO1xyXG4gICAgcG9pbnQuZHJhdyhPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHVuaWZvcm1zKSwgeyB1X21hdHJpeDogbTQuc2NhbGluZyg2LCA2LCA2KSwgdV9jb2xvcjogWzAsIDAsIDAsIDFdLCB1X3ZpZXdXb3JsZFBvc2l0aW9uIH0pLCBjYW1lcmFNYXRyaXgpO1xyXG4gICAgcG9pbnQuZHJhdyhPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHVuaWZvcm1zKSwgeyB1X21hdHJpeDogbTQuc2NhbGUobTQuelJvdGF0ZShtNC55Um90YXRpb24oTWF0aC5QSSksIC1NYXRoLlBJIC8gMiksIDYsIDYsIDYpLCB1X2NvbG9yOiBbMSwgMC4xLCAxLCAxXSwgdV92aWV3V29ybGRQb3NpdGlvbiB9KSwgY2FtZXJhTWF0cml4KTtcclxuICAgIC8qXHJcbiAgICAgIGZvciAoY29uc3QgW2lkLCBtYW5pZm9sZF0gb2Ygc2ltLmNvbGxpc2lvbk1hbmlmb2xkcykge1xyXG4gICAgICAgIG1hbmlmb2xkLmNvbnRhY3RzLmZvckVhY2goKGNvbnRhY3QpID0+IHtcclxuICAgICAgICAgIHBvaW50XHJcbiAgICAgICAgICAgIC5kcmF3KFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHVfbWF0cml4OiBtNC50cmFuc2xhdGlvbiguLi5jb250YWN0LlBBKSxcclxuICAgICAgICAgICAgICAgIHVfY29sb3I6IFswLjYsIDAuNiwgMC4wLCAxXSxcclxuICAgICAgICAgICAgICAgIC4uLnVuaWZvcm1zLFxyXG4gICAgICAgICAgICAgICAgdV92aWV3V29ybGRQb3NpdGlvbixcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGNhbWVyYU1hdHJpeFxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5kcmF3KFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHVfbWF0cml4OiBtNC50cmFuc2xhdGlvbiguLi5jb250YWN0LlBCKSxcclxuICAgICAgICAgICAgICAgIHVfY29sb3I6IFswLjUsIDAuMSwgMC4yLCAxXSxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGNhbWVyYU1hdHJpeFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgbGluZVxyXG4gICAgICAgICAgICAuYnVmZmVyRGF0YShcclxuICAgICAgICAgICAgICBcImFfcG9zaXRpb25cIixcclxuICAgICAgICAgICAgICBuZXcgRmxvYXQzMkFycmF5KFsuLi5jb250YWN0LlBBLCAuLi52My5zdW0oY29udGFjdC5QQSwgY29udGFjdC5qKV0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLmRyYXcoXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdV9tYXRyaXg6IG00LmlkZW50aXR5KCksXHJcbiAgICAgICAgICAgICAgICB1X2NvbG9yOiBbMC41LCAwLjEsIDAuMiwgMV0sXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBjYW1lcmFNYXRyaXhcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIGxpbmVcclxuICAgICAgICAgICAgLmJ1ZmZlckRhdGEoXHJcbiAgICAgICAgICAgICAgXCJhX3Bvc2l0aW9uXCIsXHJcbiAgICAgICAgICAgICAgbmV3IEZsb2F0MzJBcnJheShbLi4uY29udGFjdC5QQSwgLi4udjMuc3VtKGNvbnRhY3QuUEEsIGNvbnRhY3QuaSldKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5kcmF3KFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHVfbWF0cml4OiBtNC5pZGVudGl0eSgpLFxyXG4gICAgICAgICAgICAgICAgdV9jb2xvcjogWzAuOSwgMC45LCAwLjIsIDFdLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgY2FtZXJhTWF0cml4XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gKi9cclxuICAgIGdsLnZpZXdwb3J0KDAsIDAsIGdsLmNhbnZhcy53aWR0aCwgZ2wuY2FudmFzLmhlaWdodCk7XHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XHJcbn07XHJcbmxvb3AoKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9