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
const vert = `#version 300 es
 
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
const frag = `#version 300 es
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
    }
    translate(v) {
        this.pos = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(this.pos, v);
    }
    setTranslation(translation) {
        this.pos = [...translation];
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
    setRmatrix(matrix) {
        this.Rmatrix = [...matrix];
        this.RmatrixInverse = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transpose(matrix);
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
class Box extends Collider {
    constructor(a = 1, b = 1, c = 1) {
        super();
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
        const collider1 = this.body1.collider;
        const collider2 = this.body2.collider;
        this.ra = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(collider1.Rmatrix, this.raLocal);
        this.rb = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(collider2.Rmatrix, this.rbLocal);
        this.PA = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(collider1.pos, this.ra);
        this.PB = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(collider2.pos, this.rb);
    }
    update() {
        const collider1 = this.body1.collider;
        const collider2 = this.body2.collider;
        this.ra = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(collider1.Rmatrix, this.raLocal);
        this.rb = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(collider2.Rmatrix, this.rbLocal);
        const PA = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(collider1.pos, this.ra);
        const PB = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(collider2.pos, this.rb);
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
        const collider1 = this.body1.collider;
        const collider2 = this.body2.collider;
        this.ra = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(collider1.Rmatrix, this.raLocal);
        this.rb = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(collider2.Rmatrix, this.rbLocal);
        const PA = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(collider1.pos, this.ra);
        const PB = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(collider2.pos, this.rb);
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
        const lambdaMax = Math.max(1, romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.norm(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(this.body1.velocity, this.body1.mass), romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(this.body2.velocity, this.body2.mass))) * 10);
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
class ConstraintEquation {
    constructor(constraint) {
        this.J = null;
        this.JM = null;
        this.B = null;
        this.constraint = constraint;
        this.prevLambda = constraint.prevLambda;
    }
    updateJacobian() {
        const { body1, body2, ra, rb, n } = this.constraint;
        this.J = [romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(n, -1), romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.cross(n, ra), n, romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.cross(rb, n)];
        if (body1.static) {
            this.J[0] = [0, 0, 0];
            this.J[1] = [0, 0, 0];
        }
        if (body2.static) {
            this.J[2] = [0, 0, 0];
            this.J[3] = [0, 0, 0];
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
        const I1 = body1.inverseInertia;
        const I2 = body2.inverseInertia;
        let M1 = body1.inverseMass;
        let M2 = body2.inverseMass;
        this.JM = [
            romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(this.J[0], M1),
            romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(I1, this.J[1]),
            romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(this.J[2], M2),
            romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(I2, this.J[3]),
        ];
        //JMJ* = JB; B = MJ* as 2 vec6, _J = Jacobian as 2 vec6
        this._J = [
            [...this.J[0], ...this.J[1]],
            [...this.J[2], ...this.J[3]],
        ];
        this.B = [
            [...this.JM[0], ...this.JM[1]],
            [...this.JM[2], ...this.JM[3]],
        ];
        this.effMass =
            romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.dot(this.J[0], this.JM[0]) +
                romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.dot(this.JM[1], this.J[1]) +
                romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.dot(this.J[2], this.JM[2]) +
                romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.dot(this.JM[3], this.J[3]);
    }
    updateRightPart(dt) {
        const { biasFactor, treshold, body1, body2, n, ra, rb, positionError } = this.constraint;
        const relativeVelocity = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.diff(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(body2.velocity, romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.cross(body2.angularV, rb)), romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(body1.velocity, romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.cross(body1.angularV, ra)));
        const relativeVelocityNormalProjection = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.dot(relativeVelocity, n);
        this.bias =
            (biasFactor * Math.max(positionError - treshold, 0)) / dt -
                relativeVelocityNormalProjection;
    }
    applyImpulse(lambda) {
        console.log(lambda);
        this.constraint.prevLambda = lambda;
        this.constraint.body1.applyImpulse(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(this.J[0], lambda), this.constraint.ra);
        this.constraint.body2.applyImpulse(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(this.J[2], lambda), this.constraint.rb);
    }
    applyPseudoImpulse(lambda) {
        this.constraint.body1.applyPseudoImpulse(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(this.J[0], lambda), this.constraint.ra);
        this.constraint.body2.applyPseudoImpulse(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(this.J[2], lambda), this.constraint.rb);
    }
}
ConstraintEquation.biasMultiplier = 0.5;
class ContactEquation extends ConstraintEquation {
    updateRightPart(dt) {
        const { body1, body2, treshold, biasFactor, ra, rb, n, positionError } = this.constraint;
        const relativeVelocity = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.diff(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(body2.velocity, romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.cross(body2.angularV, rb)), romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(body1.velocity, romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.cross(body1.angularV, ra)));
        const relativeVelocityNormalProjection = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.dot(relativeVelocity, n);
        this.bias =
            (Math.max(0, positionError - treshold) / dt) * biasFactor -
                relativeVelocityNormalProjection;
    }
    applyImpulse(lambda) {
        //console.log(lambda)
        this.constraint.prevLambda = lambda;
        this.constraint.body1.applyImpulse(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(this.J[0], lambda), this.constraint.ra);
        this.constraint.body2.applyImpulse(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(this.J[2], lambda), this.constraint.rb);
    }
}
class FrictionEquation extends ConstraintEquation {
    constructor(constraint, dir) {
        super(constraint);
        this.dir = dir;
        this.prevLambda = this.constraint.prevTanLambdas[dir];
        this.lambdaMax = this.prevLambda * (this.constraint.body1.friction + this.constraint.body2.friction);
        this.lambdaMin = -this.lambdaMax;
    }
    updateJacobian() {
        const { body1, body2, ra, rb } = this.constraint;
        const n = this.dir
            ? this.constraint.j
            : this.constraint.i;
        this.J = [romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(n, -1), romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.cross(n, ra), n, romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.cross(rb, n)];
        if (body1.static) {
            this.J[0] = [0, 0, 0];
            this.J[1] = [0, 0, 0];
        }
        if (body2.static) {
            this.J[2] = [0, 0, 0];
            this.J[3] = [0, 0, 0];
        }
    }
    updateRightPart() {
        const { body1, body2, ra, rb } = this.constraint;
        const n = this.dir
            ? this.constraint.j
            : this.constraint.i;
        const relativeVelocity = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.diff(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(body2.velocity, romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.cross(body2.angularV, rb)), romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(body1.velocity, romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.cross(body1.angularV, ra)));
        let relativeVelocityNormalProjection = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.dot(relativeVelocity, n);
        //if(Math.abs(relativeVelocityNormalProjection) < 0.000001) relativeVelocityNormalProjection = 0
        this.bias = -(relativeVelocityNormalProjection);
    }
    applyImpulse(lambda) {
        this.constraint.prevTanLambdas[this.dir] = lambda;
        this.constraint.body1.applyImpulse(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(this.J[0], lambda), this.constraint.ra);
        this.constraint.body2.applyImpulse(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(this.J[2], lambda), this.constraint.rb);
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
    const I1 = body1.inverseInertia;
    const I2 = body2.inverseInertia;
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
      -v3.dot(this.J[1], body1.angularV) + v3.dot(this.J[3], body2.angularV);
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
    const I1 = body1.inverseInertia;
    const I2 = body2.inverseInertia;
    let M1 = body1.inverseMass;
    let M2 = body2.inverseMass;
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
      sum(body2.velocity, cross(body2.angularV, rb)),
      sum(body1.velocity, cross(body1.angularV, ra))
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
/* harmony export */   "RigidBody": () => (/* binding */ RigidBody)
/* harmony export */ });
/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventEmitter */ "./src/physics/EventEmitter.ts");
/* harmony import */ var romanpppmath__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! romanpppmath */ "./node_modules/romanpppmath/lib/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config */ "./src/physics/config.ts");



const { RIGID_BODY_MOVE_TRESHOLD, RIGID_BODY_AABB_BIAS } = _config__WEBPACK_IMPORTED_MODULE_2__["default"];
class RigidBody extends _EventEmitter__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static setRIGID_BODY_MOVE_TRESHOLD(RIGID_BODY_MOVE_TRESHOLD) {
        RigidBody.config.RIGID_BODY_MOVE_TRESHOLD = RIGID_BODY_MOVE_TRESHOLD;
    }
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
        this.angularV = [0, 0, 0];
        this.inverseInertia = collider.getInverseInertiaTensor(this.mass);
        this.id = RigidBody.lastId++;
        this.friction = 5;
        this.updateEventFunctions = [];
        this.group = null;
        this.needToUpdate = false;
    }
    integrateRK4(dt) {
        const { acceleration, velocity, angularV } = this;
        const _translation = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.scale(romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.sum(velocity, romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.scale(acceleration, (2 / 3) * dt)), dt);
        const _rotation = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.scale(angularV, dt / 2);
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
        const rotation = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.scale(this.angularV, dt / 2);
        if (romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.norm(rotation) > _config__WEBPACK_IMPORTED_MODULE_2__["default"].RIGID_BODY_MOVE_TRESHOLD)
            this.rotate(rotation);
    }
    integrateForces(dt) {
        let deltaSpeed = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.scale(this.acceleration, dt);
        this.velocity = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.sum(this.velocity, deltaSpeed);
    }
    updateInverseInertia() {
        this.inverseInertia = this.collider.getInverseInertiaTensor(this.mass);
    }
    getInverseInertiaTensor() {
        return this.collider.getInverseInertiaTensor(this.mass);
    }
    setMass(mass) {
        this.mass = mass;
        this.inverseMass = 1 / this.mass;
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
    applyImpulse(impulse, point) {
        if (this.static)
            return;
        this.velocity = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.sum(this.velocity, romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.scale(impulse, this.inverseMass));
        const angularImpulse = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.m3.transformPoint(this.inverseInertia, romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.cross(point, impulse));
        this.angularV = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.sum(this.angularV, angularImpulse);
    }
    applyPseudoImpulse(impulse, point) {
        if (this.static)
            return;
        this.pseudoVelocity = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.sum(this.pseudoVelocity, romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.scale(impulse, this.inverseMass));
        const angularImpulse = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.m3.transformPoint(this.inverseInertia, romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.cross(point, impulse));
        this.pseudoAngularV = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.sum(this.pseudoAngularV, angularImpulse);
    }
    addVelocity(v) {
        this.velocity = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.sum(this.velocity, v);
    }
    addAngularV(v) {
        this.angularV = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.sum(this.angularV, v);
    }
    addAcceleration(v) {
        this.acceleration = romanpppmath__WEBPACK_IMPORTED_MODULE_1__.v3.sum(this.acceleration, v);
    } /*
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
    getAABB() {
        return this.collider.getAABB();
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
RigidBody.config = {
    RIGID_BODY_MOVE_TRESHOLD: 0.005,
    RIGID_BODY_AABB_BIAS: 0.00001
};
RigidBody.lastId = 1;
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
    if (!body1.group)
        return;
    if (!body2.group)
        return;
    return body1.group === body2.group;
};
const pairHash = (x, y) => x === Math.max(x, y) ? x * x + x + y : y * y + x + y;
class Simulation {
    constructor() {
        this.objects = new Map();
        this.tree = new _Tree__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.staticTree = new _Tree__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.collisions = [];
        this.constraints = new Map();
        this.useCache = true;
        this.collisionManifolds = new Map();
    }
    addObject(object) {
        const { tree, objects, staticTree } = this;
        const aabb = object.getExpandedAABB();
        objects.set(object.id, object);
        if (object.static) {
            staticTree.insert(aabb, object.id);
            object.onUpdate(() => {
                const aabb = object.getAABB();
                staticTree.remove(object.id);
                staticTree.insert(aabb, object.id);
            });
            return;
        }
        tree.insert(aabb, object.id);
        object.onUpdate(() => {
            const aabb = object.getAABB();
            tree.remove(object.id);
            tree.insert(aabb, object.id);
        });
    }
    addConstraints(constraints, name) {
        this.constraints.set(name, [...constraints]);
    }
    addPositionConstraints(constraints, name) {
        this.positionConstraints.set(name, [...constraints]);
    }
    removeObject(object) {
        this.tree.remove(object.id);
        this.objects.delete(object.id);
    }
    updateCollisions() {
        this.broadPhaseCollisions = [];
        const { collisionManifolds, tree, staticTree, objects } = this;
        let keep = 0;
        for (const [hash, manifold] of collisionManifolds) {
            manifold.update();
            if (!manifold.keep)
                collisionManifolds.delete(hash);
            keep++;
        }
        for (const [id, body1] of objects) {
            if (body1.static)
                continue;
            const intersects = tree.getCollisions(body1.getAABB(), id);
            const intersectWithStatics = staticTree.getCollisions(body1.getAABB(), id);
            const broadPhaseIds = [...intersectWithStatics, ...intersects];
            this.broadPhaseCollisions.push([body1.id, broadPhaseIds]);
            tree.elements.get(id).isChecked = true;
            if (broadPhaseIds.length != 0)
                for (let j = 0, n = broadPhaseIds.length; j < n; j++) {
                    const body2 = objects.get(broadPhaseIds[j]);
                    if (sameGroup(body1, body2))
                        continue;
                    const hash = pairHash(body1.id, body2.id);
                    let manifold = this.collisionManifolds.get(hash);
                    if (manifold)
                        continue;
                    const actualContacts = (0,_gjk__WEBPACK_IMPORTED_MODULE_1__.getContacts)(body1.collider, body2.collider);
                    if (actualContacts.length > 0) {
                        manifold = new _ContactManifold__WEBPACK_IMPORTED_MODULE_2__["default"](actualContacts.map((c) => new _Constraints__WEBPACK_IMPORTED_MODULE_4__.ContactConstraint(body1, body2, c.raLocal, c.rbLocal, c.ra, c.rb, c.PA, c.PB, c.n, c.positionError, c.i, c.j)));
                        this.collisionManifolds.set(hash, manifold);
                    }
                }
        }
        this.tree.setUnchecked();
        this.staticTree.setUnchecked();
    }
    tick(dt) {
        this.updateCollisions();
        const { objects, collisionManifolds } = this;
        for (const [id, object] of objects) {
            object.integrateForces(dt);
        }
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
            constraints.forEach(c => {
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
        for (const [id, object] of objects) {
            object.integrateVelocities(dt);
        }
        this.objects.forEach((object) => object.updateInverseInertia());
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
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/physics/config.ts");
/* harmony import */ var _Debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Debug */ "./src/physics/Debug.ts");


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
const { SOLVER_ITERATIONS_NUM } = _config__WEBPACK_IMPORTED_MODULE_0__["default"];
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
            let bodyIndex1 = bodiesMap.get(eq.constraint.body1.id);
            if (bodyIndex1 === undefined) {
                bodyIndex1 = counter++;
                bodiesMap.set(eq.constraint.body1.id, bodyIndex1);
            }
            let bodyIndex2 = bodiesMap.get(eq.constraint.body2.id);
            if (bodyIndex2 === undefined) {
                bodyIndex2 = counter++;
                bodiesMap.set(eq.constraint.body2.id, bodyIndex2);
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
        for (let i = 0; i < n; i++)
            if (equations[i].prevLambda)
                lambda0[i] = equations[i].prevLambda;
        const Bl = new Array(numBodies).fill([0, 0, 0, 0, 0, 0]);
        for (let i = 0; i < n; i++) {
            const b1 = Jmap[i * 2];
            const b2 = Jmap[i * 2 + 1];
            Bl[b1] = v6.sum(v6.scale(equations[i].B[0], lambda0[i]), Bl[b1]);
            Bl[b2] = v6.sum(v6.scale(equations[i].B[1], lambda0[i]), Bl[b2]);
        }
        //PGS
        const lambda = [...lambda0];
        const lambdaOld = [...lambda];
        for (let i = 0; i < n; i++) {
            d.push(equations[i].effMass);
        }
        let flag = true;
        let numIter = SOLVER_ITERATIONS_NUM;
        const deltaLambda = new Array(n).fill(0);
        let str = '';
        while (numIter > 0) {
            for (let i = 0; i < n; i++) {
                const eq = equations[i];
                const J = eq._J;
                const b1 = Jmap[i * 2];
                const b2 = Jmap[i * 2 + 1];
                deltaLambda[i] = (eq.bias - v6.dot(J[0], Bl[b1]) - v6.dot(J[1], Bl[b2])) / d[i];
                lambda0[i] = lambda[i];
                lambda[i] = Math.max(eq.lambdaMin, Math.min(lambda0[i] + deltaLambda[i], eq.lambdaMax));
                deltaLambda[i] = lambda[i] - lambda0[i];
                Bl[b1] = v6.sum(Bl[b1], v6.scale(eq.B[0], deltaLambda[i]));
                Bl[b2] = v6.sum(Bl[b2], v6.scale(eq.B[1], deltaLambda[i]));
            }
            if (log)
                str += `${norm(deltaLambda)}\n`;
            numIter--;
        }
        if (log)
            _Debug__WEBPACK_IMPORTED_MODULE_1__["default"].data.SOLVER_ERROR = norm(deltaLambda);
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
    constructor(aabb, isLeaf, id) {
        this.aabb = aabb;
        this.isLeaf = isLeaf;
        this.parent = null;
        this.id = id;
        this.child1 = null;
        this.child2 = null;
        this.isChecked = false;
    }
}
class Tree {
    constructor() {
        this.root = null;
        this.elements = new Map();
    }
    setUnchecked() {
        if (!this.root)
            return;
        const stack = [this.root];
        while (stack.length != 0) {
            const node = stack.pop();
            if (node.isLeaf) {
                node.isChecked = false;
                continue;
            }
            if (node.child1)
                stack.push(node.child1);
            if (node.child2)
                stack.push(node.child2);
        }
    }
    getBestSibling(leaf) {
        let potential = this.root;
        while (!potential.isLeaf) {
            const size = getSize(potential.aabb);
            const combinedAABB = getBoundAabb(potential.aabb, leaf.aabb);
            const combinedSize = getSize(combinedAABB);
            let cost = combinedSize;
            let inherCost = combinedSize - size;
            let cost1;
            if (potential.child1.isLeaf) {
                cost1 = getSize(potential.child1.aabb) + inherCost;
            }
            else {
                cost1 =
                    getSize(getBoundAabb(leaf.aabb, potential.child1.aabb)) -
                        getSize(potential.child1.aabb) +
                        inherCost;
            }
            let cost2;
            if (potential.child2.isLeaf) {
                cost2 = getSize(potential.child2.aabb) + inherCost;
            }
            else {
                cost2 =
                    getSize(getBoundAabb(leaf.aabb, potential.child2.aabb)) -
                        getSize(potential.child2.aabb) +
                        inherCost;
            }
            if (cost < cost1 && cost < cost2)
                return potential;
            if (cost1 < cost2) {
                potential = potential.child1;
            }
            else
                potential = potential.child2;
        }
        return potential;
    }
    insert(aabb, id) {
        const leaf = new Node(aabb, true, id);
        this.elements.set(id, leaf);
        if (this.root === null) {
            this.root = leaf;
            this.root.parent = null;
            return leaf;
        }
        const sibling = this.getBestSibling(leaf);
        const oldParent = sibling.parent;
        const newParent = new Node(leaf.aabb, false, null);
        newParent.parent = oldParent;
        newParent.aabb = getBoundAabb(leaf.aabb, sibling.aabb);
        if (oldParent) {
            if (oldParent.child1 === sibling)
                oldParent.child1 = newParent;
            else
                oldParent.child2 = newParent;
            newParent.child1 = sibling;
            newParent.child2 = leaf;
            sibling.parent = newParent;
            leaf.parent = newParent;
        }
        else {
            newParent.child1 = sibling;
            newParent.child2 = leaf;
            sibling.parent = newParent;
            leaf.parent = newParent;
            this.root = newParent;
        }
        let index = leaf.parent;
        while (index) {
            index = this.rebalance(index);
            index = index.parent;
        }
        return leaf;
    }
    getCollisions(aabb, id) {
        const cols = [];
        const iter = (_node) => {
            if (!_node) {
                return;
            }
            if (_node.id === id) {
                return;
            }
            if (isCollide(aabb, _node.aabb)) {
                if (_node.isLeaf && !_node.isChecked) {
                    cols.push(_node.id);
                }
                iter(_node.child1);
                iter(_node.child2);
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
        const grandParent = parent ? parent.parent : null;
        let sibling;
        if (parent.child1 === leaf)
            sibling = parent.child2;
        else
            sibling = parent.child1;
        if (grandParent) {
            if (grandParent.child1 === parent)
                grandParent.child1 = sibling;
            else
                grandParent.child2 = sibling;
            sibling.parent = grandParent;
            let index = grandParent;
            while (index) {
                index = this.rebalance(index);
                index = index.parent;
            }
        }
        else {
            this.root = sibling;
            sibling.parent = null;
        }
        this.elements.delete(id);
    }
    rebalance(leaf) {
        if (!leaf) {
            return null;
        }
        if (leaf.isLeaf || this.getHeight(leaf) < 2) {
            leaf.aabb = getBoundAabb(leaf.child1.aabb, leaf.child2.aabb);
            return leaf;
        }
        const child1 = leaf.child1;
        const child2 = leaf.child2;
        const balance = this.getHeight(child2) - this.getHeight(child1);
        if (balance > 1) {
            const child2Child1 = child2.child1;
            const child2Child2 = child2.child2;
            child2.child1 = leaf;
            child2.parent = leaf.parent;
            leaf.parent = child2;
            if (child2.parent != null) {
                if (child2.parent.child1 === leaf) {
                    child2.parent.child1 = child2;
                }
                else {
                    child2.parent.child2 = child2;
                }
            }
            else
                this.root = child2;
            if (this.getHeight(child2Child1) > this.getHeight(child2Child2)) {
                child2.child2 = child2Child1;
                leaf.child2 = child2Child2;
                child2Child2.parent = leaf;
            }
            else {
                leaf.child2 = child2Child1;
                child2Child1.parent = leaf;
            }
            leaf.aabb = getBoundAabb(leaf.child1.aabb, leaf.child2.aabb);
            child2.aabb = getBoundAabb(child2.child1.aabb, child2.child2.aabb);
            return child2;
        }
        if (balance < -1) {
            const child1Child1 = child1.child1;
            const child1Child2 = child1.child2;
            child1.child1 = leaf;
            child1.parent = leaf.parent;
            leaf.parent = child1;
            if (child1.parent != null) {
                if (child1.parent.child1 === leaf) {
                    child1.parent.child1 = child1;
                }
                else {
                    child1.parent.child2 = child1;
                }
            }
            else
                this.root = child1;
            if (this.getHeight(child1Child1) > this.getHeight(child1Child2)) {
                child1.child2 = child1Child1;
                leaf.child1 = child1Child2;
                child1Child2.parent = leaf;
            }
            else {
                child1.child2 = child1Child2;
                leaf.child1 = child1Child1;
                child1Child1.parent = leaf;
            }
            leaf.aabb = getBoundAabb(leaf.child1.aabb, leaf.child2.aabb);
            child1.aabb = getBoundAabb(child1.child1.aabb, child1.child2.aabb);
            return child1;
        }
        leaf.aabb = getBoundAabb(leaf.child1.aabb, leaf.child2.aabb);
        return leaf;
    }
    toArray(node) {
        const iter = (leaf) => {
            if (!leaf) {
                return null;
            }
            if (leaf.isLeaf)
                return leaf.id;
            else
                return [iter(leaf.child1), iter(leaf.child2)];
        };
        if (!node)
            node = this.root;
        return iter(node);
    }
    /*getHeight(leaf) {
      const iter = (leaf, level) => {
        if (!leaf) {
          return level;
        }
  
        let h1 = iter(leaf.child1, level + 1);
        let h2 = iter(leaf.child2, level + 1);
        return h1 > h2 ? h1 : h2;
      };
      return iter(leaf, 1);
    }*/
    getHeight(root) {
        if (!root)
            return 0;
        let height = 0;
        const queue = [root];
        while (queue.length != 0) {
            height += 1;
            const count = queue.length;
            for (let i = 0; i < count; i++) {
                const tmp = queue.pop();
                if (tmp.child1)
                    queue.push(tmp.child1);
                if (tmp.child2)
                    queue.push(tmp.child2);
            }
        }
        return height;
    }
    getNodes() {
        const iter = (node, arr) => {
            arr.push(node);
            if (node.child1)
                iter(node.child1, arr);
            if (node.child2)
                iter(node.child2, arr);
        };
        const a = [];
        iter(this.root, a);
        return a;
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
    props.search_dir = diff(coll1.pos, coll2.pos);
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
    if (coll1.type === "sphere" || coll2.type === "sphere") {
        const rb = diff(PB, coll2.pos);
        const ra = diff(PA, coll1.pos);
        const raLocal = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(coll1.RmatrixInverse, ra);
        const rbLocal = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(coll2.RmatrixInverse, rb);
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
        const rb = diff(PB, coll2.pos);
        const ra = diff(PA, coll1.pos);
        const positionError = -dot(diff(PB, PA), n);
        const raLocal = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(coll1.RmatrixInverse, ra);
        const rbLocal = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(coll2.RmatrixInverse, rb);
        features.push({
            ra, rb, n, PA, PB, positionError, i, j, raLocal, rbLocal
        });
    });
    if (features.length === 0) {
        const rb = diff(PB, coll2.pos);
        const ra = diff(PA, coll1.pos);
        const raLocal = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(coll1.RmatrixInverse, ra);
        const rbLocal = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m3.transformPoint(coll2.RmatrixInverse, rb);
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
    throw 'No canvas found';
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
const texture1 = new TextureInfo();
texture1.createTextureFromURL("resources/atlas.png");
const settings = [
    { x: -1, y: 1, zRot: 0, magFilter: gl.NEAREST, minFilter: gl.NEAREST, },
    { x: 0, y: 1, zRot: 0, magFilter: gl.LINEAR, minFilter: gl.LINEAR, },
    { x: 1, y: 1, zRot: 0, magFilter: gl.LINEAR, minFilter: gl.NEAREST_MIPMAP_NEAREST, },
    { x: -1, y: -1, zRot: 1, magFilter: gl.LINEAR, minFilter: gl.LINEAR_MIPMAP_NEAREST, },
    { x: 0, y: -1, zRot: 1, magFilter: gl.LINEAR, minFilter: gl.NEAREST_MIPMAP_LINEAR, },
    { x: 1, y: -1, zRot: 1, magFilter: gl.LINEAR, minFilter: gl.LINEAR_MIPMAP_LINEAR, },
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
    .bufferData('TEXCOORD_0', uvs)
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
const body = new _src_physics_RigidBody__WEBPACK_IMPORTED_MODULE_7__.RigidBody(new _src_physics_Collider__WEBPACK_IMPORTED_MODULE_9__.Box(1, 1, 1));
const floor = { physics: new _src_physics_RigidBody__WEBPACK_IMPORTED_MODULE_7__.RigidBody(new _src_physics_Collider__WEBPACK_IMPORTED_MODULE_9__.Box(100, 5, 100)), sprite: cube, uniforms: { u_color: [1, 0, 1, 1] } };
floor.physics.setMass(1);
floor.physics.static = true;
floor.physics.translate([0, -2.5, 0]);
sim.addObject(floor.physics);
let objectsToDraw = [];
objectsToDraw.push(floor);
for (let i = 0; i < 15; i++) {
    const box = { physics: new _src_physics_RigidBody__WEBPACK_IMPORTED_MODULE_7__.RigidBody(new _src_physics_Collider__WEBPACK_IMPORTED_MODULE_9__.Box(3, 3, 3)), sprite: cube, uniforms: { u_color: [0, 0, 1, 1] } };
    box.physics.translate([-2.5 + (i % 5) * 3, 1 + 3.01 * (i % 3), 0]);
    //box.physics.translate([0,  1 + 3.01 * (i), 0]);
    box.physics.setMass(5);
    box.physics.addAcceleration([0, -9, 0]);
    sim.addObject(box.physics);
    objectsToDraw.push(box);
}
const box = { physics: new _src_physics_RigidBody__WEBPACK_IMPORTED_MODULE_7__.RigidBody(new _src_physics_Collider__WEBPACK_IMPORTED_MODULE_9__.Sphere(5)), sprite: sphere, uniforms: { u_color: [0, 0, 1, 1] } };
box.physics.translate([0, 5, -30]);
box.physics.setMass(32);
box.physics.addAcceleration([0, -9, 0]);
box.physics.addVelocity([0, 0, 10]);
box.physics.addAngularV([1, 1, 1]);
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
    point.draw(Object.assign(Object.assign({}, uniforms), { u_matrix: romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m4.scaling(6, 6, 6), u_color: [0, 0, 0, 1], u_viewWorldPosition }), cameraMatrix);
    point.draw(Object.assign(Object.assign({}, uniforms), { u_matrix: romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m4.scale(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m4.zRotate(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m4.yRotation(Math.PI), -Math.PI / 2), 6, 6, 6), u_color: [1, 0.1, 1, 1], u_viewWorldPosition }), cameraMatrix);
    for (const [id, manifold] of sim.collisionManifolds) {
        manifold.contacts.forEach((contact) => {
            point
                .draw(Object.assign(Object.assign({ u_matrix: romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m4.translation(...contact.PA), u_color: [0.6, 0.6, 0.0, 1] }, uniforms), { u_viewWorldPosition }), cameraMatrix)
                .draw({
                u_matrix: romanpppmath__WEBPACK_IMPORTED_MODULE_0__.m4.translation(...contact.PB),
                u_color: [0.5, 0.1, 0.2, 1],
            }, cameraMatrix);
        });
    }
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    requestAnimationFrame(loop);
};
loop();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixLQUFLO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixjQUFjO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDdUI7Ozs7Ozs7Ozs7Ozs7OztBQy9HdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUM2VDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVGck07QUFDMUM7QUFDbUM7QUFDbEQ7QUFDUDtBQUNmO0FBQ2U7QUFDakI7QUFDOEI7QUFDZjtBQUMrUDs7Ozs7Ozs7Ozs7Ozs7O0FDVnJULGlFQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLENBQUMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkMEI7QUFDQTtBQUM3QixpRUFBZSxFQUFFLElBQUksd0RBQU0sb0RBQUUsRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDRjlCLGlFQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLENBQUMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWG9DO0FBQ007QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDRjdDLGlFQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxDQUFDLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckMwQjtBQUNBO0FBQzdCLGlFQUFlLEVBQUUsSUFBSSx3REFBTSxvREFBRSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNGOUIsaUVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsQ0FBQyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQzFCOEQ7QUFDM0M7QUFDdEI7QUFDZTtBQUNmO0FBQ0E7QUFDQSx3QkFBd0Isa0RBQVc7QUFDbkMsc0JBQXNCLGdEQUFTO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyw2Q0FBSTtBQUM5QywwQ0FBMEMsNkNBQUk7QUFDOUMsMENBQTBDLDZDQUFJO0FBQzlDLDBDQUEwQyw2Q0FBSTtBQUM5QywwQ0FBMEMsNkNBQUk7QUFDOUMsMENBQTBDLDZDQUFJO0FBQzlDLDBDQUEwQyw2Q0FBSTtBQUM5QywwQ0FBMEMsNkNBQUk7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGdEQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLDhCQUE4Qiw2Q0FBSSxDQUFDLCtDQUFNLCtCQUErQiwrQ0FBTTtBQUM5RSxnQkFBZ0IsZ0RBQVM7QUFDekI7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3RHNCO0FBQ1A7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1AsZ0JBQWdCLCtDQUFNO0FBQ3RCO0FBQ0E7QUFDTyw4QkFBOEIsZ0RBQU87QUFDckM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCbUI7QUFDSjtBQUNBO0FBQ0E7QUFDUTtBQUNNOzs7Ozs7Ozs7Ozs7Ozs7QUNMcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSwyQkFBMkIsY0FBYztBQUN6QywwQkFBMEIsY0FBYztBQUN4QyxLQUFLO0FBQ0w7QUFDQSxpRUFBZSxFQUFFLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxSUk7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLHNCQUFzQixxREFBWSxDQUFDLGdEQUFPO0FBQzFDLHNCQUFzQixxREFBWSxDQUFDLGlEQUFRO0FBQzNDLHNCQUFzQixxREFBWSxDQUFDLGlEQUFRO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFDQTtBQUNBO0FBQ0EsWUFBWSwwREFBMEQ7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxpQ0FBaUM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGVBQWU7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksZUFBZTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGlDQUFpQztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksMERBQTBEO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixXQUFXO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNVRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsT0FBTztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxRQUFRO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMscUJBQXFCO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsT0FBTztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ21KOzs7Ozs7Ozs7Ozs7Ozs7QUNsSW5KO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsTUFBTSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDYmdCO0FBQ3FCO0FBQzNELFFBQVEsd0RBQXdELEVBQUUsNENBQUU7QUFDdEM7QUFDOUIsUUFBUSw4Q0FBOEMsRUFBRSwrQ0FBTTtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Is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QUFDeEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEIsa0JBQWtCLGFBQWEsNkRBQVMsS0FBSyxzREFBRyxzQ0FBc0M7QUFDdEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLGFBQWEsNkRBQVMsS0FBSyx5REFBTSxrQ0FBa0M7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsOERBQThEO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksb0VBQWM7QUFDbEIsSUFBSSx3RUFBa0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksY0FBYyxFQUFFLHNEQUFZO0FBQ3hDO0FBQ0E7QUFDQSxvRUFBb0UsZUFBZSw2REFBNkQ7QUFDaEosS0FBSztBQUNMLDZDQUE2QyxlQUFlLFVBQVUsb0RBQVUsdURBQXVEO0FBQ3ZJLDZDQUE2QyxlQUFlLFVBQVUsa0RBQVEsQ0FBQyxvREFBVSxDQUFDLHNEQUFZLGtGQUFrRjtBQUN4TDtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsVUFBVSx3REFBYyw4Q0FBOEMsZUFBZSxxQkFBcUI7QUFDOUo7QUFDQSwwQkFBMEIsd0RBQWM7QUFDeEM7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcGdyYXBoaWNzL2xpYi9jb21wb25lbnRzL0J1ZmZlckF0dHJpYnV0ZS5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcGdyYXBoaWNzL2xpYi9jb21wb25lbnRzL0RyYXdlci5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcGdyYXBoaWNzL2xpYi9jb21wb25lbnRzL0dMV3JhcHBlci5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcGdyYXBoaWNzL2xpYi9jb21wb25lbnRzL0dsdGZVdGlscy5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcGdyYXBoaWNzL2xpYi9jb21wb25lbnRzL01lc2hSZW5kZXJlci5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcGdyYXBoaWNzL2xpYi9jb21wb25lbnRzL01vZGVsLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL2NvbXBvbmVudHMvUHJpbWl0aXZlUmVuZGVyZXIuanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBncmFwaGljcy9saWIvY29tcG9uZW50cy9QcmltaXRpdmVzLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL2NvbXBvbmVudHMvUHJvZ3JhbUluZm8uanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBncmFwaGljcy9saWIvY29tcG9uZW50cy9UZXh0dXJlSW5mby5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcGdyYXBoaWNzL2xpYi9jb21wb25lbnRzL2F0dHJpYlR5cGVQcm9wcy5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcGdyYXBoaWNzL2xpYi9jb21wb25lbnRzL2VudW1zLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL2luZGV4LmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL3JlbmRlci9zaGFkZXJzL2RlZmF1bHQvZnJhZy5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcGdyYXBoaWNzL2xpYi9yZW5kZXIvc2hhZGVycy9kZWZhdWx0L2luZGV4LmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL3JlbmRlci9zaGFkZXJzL2RlZmF1bHQvdmVydC5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcGdyYXBoaWNzL2xpYi9yZW5kZXIvc2hhZGVycy9pbmRleC5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcGdyYXBoaWNzL2xpYi9yZW5kZXIvc2hhZGVycy9wb2ludExpZ2h0L2ZyYWcuanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBncmFwaGljcy9saWIvcmVuZGVyL3NoYWRlcnMvcG9pbnRMaWdodC9pbmRleC5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcGdyYXBoaWNzL2xpYi9yZW5kZXIvc2hhZGVycy9wb2ludExpZ2h0L3ZlcnQuanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBtYXRoL2xpYi9PY3RyZWUuanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBtYXRoL2xpYi9hYWJiLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwbWF0aC9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBtYXRoL2xpYi9tMy5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcG1hdGgvbGliL200LmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwbWF0aC9saWIvdjMuanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9kZW1vL2JhbGwvYm94VVZzLnRzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vZGVtby9iYWxsL3RleHR1cmVTaGFkZXIudHMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9zcmMvcGh5c2ljcy9Db2xsaWRlci50cyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL3NyYy9waHlzaWNzL0NvbnN0cmFpbnRzLnRzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL3BoeXNpY3MvQ29udGFjdE1hbmlmb2xkLnRzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL3BoeXNpY3MvRGVidWcudHMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9zcmMvcGh5c2ljcy9FcXVhdGlvbnMudHMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9zcmMvcGh5c2ljcy9FdmVudEVtaXR0ZXIudHMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9zcmMvcGh5c2ljcy9SaWdpZEJvZHkudHMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9zcmMvcGh5c2ljcy9TaW11bGF0aW9uLnRzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL3BoeXNpY3MvU3lzdGVtLnRzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL3BoeXNpY3MvVHJlZS50cyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL3NyYy9waHlzaWNzL2NsaXBwaW5nLnRzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL3BoeXNpY3MvY29uZmlnLnRzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL3BoeXNpY3MvZ2prLnRzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL21pc2MvRnJlZUNhbS5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL3NyYy9taXNjL2tleUlucHV0LmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL21pc2MvbW91c2VJbnB1dC5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vZGVtby9iYWxsL2JhbGwudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRkxPQVQsIEZMT0FUX01BVDIsIEZMT0FUX01BVDMsIEZMT0FUX01BVDQsIEZMT0FUX1ZFQzIsIElOVCwgRkxPQVRfVkVDMywgRkxPQVRfVkVDNCwgVU5TSUdORURfSU5ULCBVTlNJR05FRF9JTlRfVkVDMiwgVU5TSUdORURfSU5UX1ZFQzMsIFVOU0lHTkVEX0lOVF9WRUM0LCBJTlRfVkVDMiwgSU5UX1ZFQzMsIElOVF9WRUM0LCBCT09MLCBCT09MX1ZFQzIsIEJPT0xfVkVDMywgQk9PTF9WRUM0LCB9IGZyb20gXCIuL2VudW1zXCI7XHJcbmNvbnN0IHR5cGVJbmZvID0ge1xyXG4gICAgW0ZMT0FUX01BVDRdOiB7IHNpemU6IDY0LCByb3dzOiA0LCBjb2xzOiA0IH0sXHJcbiAgICBbRkxPQVRfTUFUMl06IHsgc2l6ZTogMzIsIHJvd3M6IDIsIGNvbHM6IDIgfSxcclxuICAgIFtGTE9BVF9NQVQzXTogeyBzaXplOiA0OCwgcm93czogMywgY29sczogMyB9LFxyXG59O1xyXG5jb25zdCBmbG9hdEF0dHJpYlNldHRlciA9ICh7IG51bUNvbXBvbmVudHMsIHR5cGUsIGxvY2F0aW9uLCBzdHJpZGUsIG9mZnNldCwgYnVmZmVyLCBnbCwgZGl2aXNvciwgbm9ybWFsaXplLCB9KSA9PiB7XHJcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgYnVmZmVyKTtcclxuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGxvY2F0aW9uKTtcclxuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIobG9jYXRpb24sIG51bUNvbXBvbmVudHMsIHR5cGUgfHwgZ2wuRkxPQVQsIG5vcm1hbGl6ZSB8fCBmYWxzZSwgc3RyaWRlIHx8IDAsIG9mZnNldCB8fCAwKTtcclxuICAgIGdsLnZlcnRleEF0dHJpYkRpdmlzb3IobG9jYXRpb24sIGRpdmlzb3IgfHwgMCk7XHJcbn07XHJcbmNvbnN0IG1hdEF0dHJpYlNldHRlciA9ICh7IG51bUNvbXBvbmVudHMsIHR5cGUsIGxvY2F0aW9uLCBvZmZzZXQsIGJ1ZmZlciwgZ2wsIGRpdmlzb3IsIG5vcm1hbGl6ZSwgYXR0cmlidXRlVHlwZSwgfSkgPT4ge1xyXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGJ1ZmZlcik7XHJcbiAgICBjb25zdCBzdHJpZGUgPSB0eXBlSW5mb1thdHRyaWJ1dGVUeXBlXS5zaXplO1xyXG4gICAgY29uc3QgY291bnQgPSB0eXBlSW5mb1thdHRyaWJ1dGVUeXBlXS5yb3dzO1xyXG4gICAgY29uc3Qgcm93T2Zmc2V0ID0gc3RyaWRlIC8gY291bnQ7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShsb2NhdGlvbiArIGkpO1xyXG4gICAgICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIobG9jYXRpb24sIG51bUNvbXBvbmVudHMsIHR5cGUgfCBnbC5GTE9BVCwgZmFsc2UsIHN0cmlkZSB8IDAsIG9mZnNldCArIHJvd09mZnNldCAqIGkpO1xyXG4gICAgICAgIGdsLnZlcnRleEF0dHJpYkRpdmlzb3IobG9jYXRpb24gKyBpLCBkaXZpc29yIHx8IDApO1xyXG4gICAgfVxyXG59O1xyXG5jb25zdCBpbnRBdHRyaWJTZXR0ZXIgPSAoeyBudW1Db21wb25lbnRzLCB0eXBlLCBsb2NhdGlvbiwgc3RyaWRlLCBvZmZzZXQsIGJ1ZmZlciwgZ2wsIGRpdmlzb3IsIH0pID0+IHtcclxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBidWZmZXIpO1xyXG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkobG9jYXRpb24pO1xyXG4gICAgZ2wudmVydGV4QXR0cmliSVBvaW50ZXIobG9jYXRpb24sIG51bUNvbXBvbmVudHMsIHR5cGUgfHwgZ2wuSU5ULCBzdHJpZGUgfHwgMCwgb2Zmc2V0IHx8IDApO1xyXG4gICAgZ2wudmVydGV4QXR0cmliRGl2aXNvcihsb2NhdGlvbiwgZGl2aXNvciB8fCAwKTtcclxufTtcclxuY29uc3QgYXR0cmliVHlwZU1hcCA9IHt9O1xyXG5hdHRyaWJUeXBlTWFwW0lOVF0gPSBpbnRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbRkxPQVRdID0gZmxvYXRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbRkxPQVRfVkVDMl0gPSBmbG9hdEF0dHJpYlNldHRlcjtcclxuYXR0cmliVHlwZU1hcFtGTE9BVF9WRUMzXSA9IGZsb2F0QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW0ZMT0FUX1ZFQzRdID0gZmxvYXRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbRkxPQVRfTUFUMl0gPSBtYXRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbRkxPQVRfTUFUM10gPSBtYXRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbRkxPQVRfTUFUNF0gPSBtYXRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbVU5TSUdORURfSU5UXSA9IGludEF0dHJpYlNldHRlcjtcclxuYXR0cmliVHlwZU1hcFtVTlNJR05FRF9JTlRfVkVDMl0gPSBpbnRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbVU5TSUdORURfSU5UX1ZFQzNdID0gaW50QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW1VOU0lHTkVEX0lOVF9WRUMzXSA9IGludEF0dHJpYlNldHRlcjtcclxuYXR0cmliVHlwZU1hcFtVTlNJR05FRF9JTlRfVkVDNF0gPSBpbnRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbSU5UX1ZFQzJdID0gaW50QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW0lOVF9WRUMzXSA9IGludEF0dHJpYlNldHRlcjtcclxuYXR0cmliVHlwZU1hcFtJTlRfVkVDNF0gPSBpbnRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbQk9PTF0gPSBpbnRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbQk9PTF9WRUMyXSA9IGludEF0dHJpYlNldHRlcjtcclxuYXR0cmliVHlwZU1hcFtCT09MX1ZFQzNdID0gaW50QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW0JPT0xfVkVDNF0gPSBpbnRBdHRyaWJTZXR0ZXI7XHJcbmNsYXNzIEJ1ZmZlckF0dHJpYnV0ZUluZm8ge1xyXG4gICAgY29uc3RydWN0b3IoZ2wsIHsgc3RyaWRlLCB0eXBlLCBvZmZzZXQsIGxvY2F0aW9uLCBudW1Db21wb25lbnRzLCBhdHRyaWJ1dGVUeXBlLCBkaXZpc29yIH0pIHtcclxuICAgICAgICB0aGlzLmdsID0gZ2w7XHJcbiAgICAgICAgdGhpcy5idWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcclxuICAgICAgICB0aGlzLnN0cmlkZSA9IHN0cmlkZSB8IDA7XHJcbiAgICAgICAgdGhpcy5udW1Db21wb25lbnRzID0gbnVtQ29tcG9uZW50cztcclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZVR5cGUgPSBhdHRyaWJ1dGVUeXBlO1xyXG4gICAgICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0IHwgMDtcclxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgIHRoaXMubG9jYXRpb24gPSBsb2NhdGlvbjtcclxuICAgICAgICB0aGlzLmRpdmlzb3IgPSBkaXZpc29yO1xyXG4gICAgfVxyXG4gICAgc2V0QXR0cmlidXRlKCkge1xyXG4gICAgICAgIGNvbnN0IHsgYXR0cmlidXRlVHlwZSB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCBzZXR0ZXIgPSBhdHRyaWJUeXBlTWFwW2F0dHJpYnV0ZVR5cGVdO1xyXG4gICAgICAgIHNldHRlcih0aGlzKTtcclxuICAgIH1cclxuICAgIGJ1ZmZlckRhdGEoZGF0YSwgdXNhZ2UgPSAweDg4ZTQpIHtcclxuICAgICAgICBjb25zdCB7IGdsLCBidWZmZXIgfSA9IHRoaXM7XHJcbiAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGJ1ZmZlcik7XHJcbiAgICAgICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIGRhdGEsIHVzYWdlKTtcclxuICAgIH1cclxuICAgIGFsbG9jQnVmZmVyKGJ5dGVMZW5ndGgsIHVzYWdlID0gMHg4OGU0KSB7XHJcbiAgICAgICAgY29uc3QgeyBnbCwgYnVmZmVyIH0gPSB0aGlzO1xyXG4gICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBidWZmZXIpO1xyXG4gICAgICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBieXRlTGVuZ3RoLCB1c2FnZSk7XHJcbiAgICB9XHJcbiAgICBidWZmZXJTdWJEYXRhKGRhdGEsIG9mZnNldCA9IDApIHtcclxuICAgICAgICBjb25zdCB7IGdsLCBidWZmZXIgfSA9IHRoaXM7XHJcbiAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGJ1ZmZlcik7XHJcbiAgICAgICAgZ2wuYnVmZmVyU3ViRGF0YShnbC5BUlJBWV9CVUZGRVIsIG9mZnNldCwgZGF0YSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IHsgQnVmZmVyQXR0cmlidXRlSW5mbyB9O1xyXG4iLCJpbXBvcnQgeyBtNCB9IGZyb20gXCJyb21hbnBwcG1hdGhcIjtcclxuY29uc3QgZGVnVG9SYWQgPSAoZCkgPT4gKGQgKiBNYXRoLlBJKSAvIDE4MDtcclxuY29uc3QgZmllbGRPZlZpZXdSYWRpYW5zID0gZGVnVG9SYWQoOTApO1xyXG5jbGFzcyBEcmF3ZXIge1xyXG4gICAgc3RhdGljIGNyZWF0ZTNkUHJvamVjdGlvbk1hdHJpeCh6TmVhciwgekZhciwgY2xpZW50V2lkdGgsIGNsaWVudEhlaWdodCkge1xyXG4gICAgICAgIGNvbnN0IGFzcGVjdCA9IGNsaWVudFdpZHRoIC8gY2xpZW50SGVpZ2h0O1xyXG4gICAgICAgIHJldHVybiBtNC5wZXJzcGVjdGl2ZShmaWVsZE9mVmlld1JhZGlhbnMsIGFzcGVjdCwgek5lYXIsIHpGYXIpO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xyXG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XHJcbiAgICAgICAgdGhpcy5wcm9qZWN0aW9uTWF0cml4ID0gbnVsbDtcclxuICAgIH1cclxuICAgIHNldENvbnRleHQoZ2xDb250ZXh0V3JhcHBlcikge1xyXG4gICAgICAgIHRoaXMuY29udGV4dCA9IGdsQ29udGV4dFdyYXBwZXI7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBkcmF3KHByaW1pdGl2ZVJlbmRlcmVyLCB1bmlmb3JtcywgY2FtZXJhTWF0cml4KSB7XHJcbiAgICAgICAgY29uc3QgeyBWQU8sIG1vZGUsIG9mZnNldCwgbnVtRWxlbWVudHMsIGluZGljZXMsIHByb2dyYW1JbmZvLCBjb21wb25lbnRUeXBlLCB9ID0gcHJpbWl0aXZlUmVuZGVyZXI7XHJcbiAgICAgICAgY29uc3QgeyBwcm9qZWN0aW9uTWF0cml4IH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuY29udGV4dDtcclxuICAgICAgICBjb25zdCB2aWV3TWF0cml4ID0gbTQuaW52ZXJzZShjYW1lcmFNYXRyaXgpO1xyXG4gICAgICAgIGNvbnN0IHZpZXdQcm9qZWN0aW9uTWF0cml4ID0gbTQubXVsdGlwbHkocHJvamVjdGlvbk1hdHJpeCwgdmlld01hdHJpeCk7XHJcbiAgICAgICAgY29uc3QgdV93b3JsZFZpZXdQcm9qZWN0aW9uID0gbTQubXVsdGlwbHkodmlld1Byb2plY3Rpb25NYXRyaXgsIHVuaWZvcm1zLnVfbWF0cml4KTtcclxuICAgICAgICB0aGlzLmNvbnRleHQudXNlUHJvZ3JhbUluZm8ocHJvZ3JhbUluZm8pO1xyXG4gICAgICAgIHRoaXMuY29udGV4dFxyXG4gICAgICAgICAgICAubGFzdFVzZWRQcm9ncmFtSW5mb1xyXG4gICAgICAgICAgICAuc2V0VW5pZm9ybXMoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB1bmlmb3JtcyksIHsgdV93b3JsZFZpZXdQcm9qZWN0aW9uIH0pKTtcclxuICAgICAgICBnbC5iaW5kVmVydGV4QXJyYXkoVkFPKTtcclxuICAgICAgICBpZiAoIWluZGljZXMpIHtcclxuICAgICAgICAgICAgZ2wuZHJhd0FycmF5cyhtb2RlLCBvZmZzZXQsIG51bUVsZW1lbnRzKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnbC5kcmF3RWxlbWVudHMobW9kZSwgbnVtRWxlbWVudHMsIGNvbXBvbmVudFR5cGUsIG9mZnNldCk7XHJcbiAgICB9XHJcbiAgICBkcmF3SW5zdGFuY2VkKHByaW1pdGl2ZVJlbmRlcmVyLCB1bmlmb3JtcywgY2FtZXJhTWF0cml4LCBudW1JbnN0YW5jZXMpIHtcclxuICAgICAgICBjb25zdCB7IFZBTywgbW9kZSwgb2Zmc2V0LCBudW1FbGVtZW50cywgaW5kaWNlcywgcHJvZ3JhbUluZm8sIGNvbXBvbmVudFR5cGUsIH0gPSBwcmltaXRpdmVSZW5kZXJlcjtcclxuICAgICAgICBjb25zdCB7IHByb2plY3Rpb25NYXRyaXggfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgeyBnbCB9ID0gdGhpcy5jb250ZXh0O1xyXG4gICAgICAgIGNvbnN0IHZpZXdNYXRyaXggPSBtNC5pbnZlcnNlKGNhbWVyYU1hdHJpeCk7XHJcbiAgICAgICAgY29uc3Qgdmlld1Byb2plY3Rpb25NYXRyaXggPSBtNC5tdWx0aXBseShwcm9qZWN0aW9uTWF0cml4LCB2aWV3TWF0cml4KTtcclxuICAgICAgICBjb25zdCB3b3JsZFZpZXdQcm9qZWN0aW9uID0gbTQubXVsdGlwbHkodmlld1Byb2plY3Rpb25NYXRyaXgsIHVuaWZvcm1zLnVfbWF0cml4KTtcclxuICAgICAgICBjb25zdCB3b3JsZE1hdHJpeCA9IHVuaWZvcm1zLnVfbWF0cml4O1xyXG4gICAgICAgIHRoaXMuY29udGV4dC51c2VQcm9ncmFtSW5mbyhwcm9ncmFtSW5mbyk7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LlxyXG4gICAgICAgICAgICBsYXN0VXNlZFByb2dyYW1JbmZvXHJcbiAgICAgICAgICAgIC5zZXRVbmlmb3JtcyhPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHVuaWZvcm1zKSwgeyB3b3JsZE1hdHJpeCwgd29ybGRWaWV3UHJvamVjdGlvbiB9KSk7XHJcbiAgICAgICAgZ2wuYmluZFZlcnRleEFycmF5KFZBTyk7XHJcbiAgICAgICAgaWYgKCFpbmRpY2VzKSB7XHJcbiAgICAgICAgICAgIGdsLmRyYXdBcnJheXNJbnN0YW5jZWQobW9kZSwgb2Zmc2V0LCBudW1FbGVtZW50cywgbnVtSW5zdGFuY2VzKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnbC5kcmF3RWxlbWVudHNJbnN0YW5jZWQobW9kZSwgbnVtRWxlbWVudHMsIGdsLlVOU0lHTkVEX1NIT1JULCBvZmZzZXQsIG51bUluc3RhbmNlcyk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgRHJhd2VyO1xyXG4iLCJpbXBvcnQgeyBUZXh0dXJlSW5mbyB9IGZyb20gXCIuL1RleHR1cmVJbmZvXCI7XHJcbmltcG9ydCBQcmltaXRpdmVSZW5kZXJlciBmcm9tIFwiLi9QcmltaXRpdmVSZW5kZXJlclwiO1xyXG5pbXBvcnQgRHJhd2VyIGZyb20gXCIuL0RyYXdlclwiO1xyXG5pbXBvcnQgeyBQcm9ncmFtSW5mbyB9IGZyb20gXCIuL1Byb2dyYW1JbmZvXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdMV3JhcHBlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihnbCkge1xyXG4gICAgICAgIHRoaXMuUHJvZ3JhbUluZm8gPSAoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuIGNsYXNzIGV4dGVuZHMgUHJvZ3JhbUluZm8ge1xyXG4gICAgICAgICAgICAgICAgY29uc3RydWN0b3IodmVydGV4U2hhZGVyU291cmNlLCBmcmFnbWVudFNoYWRlclNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cGVyKHNlbGYsIHZlcnRleFNoYWRlclNvdXJjZSwgZnJhZ21lbnRTaGFkZXJTb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICAgICAgdGhpcy5QcmltaXRpdmVSZW5kZXJlciA9ICgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gY2xhc3MgZXh0ZW5kcyBQcmltaXRpdmVSZW5kZXJlciB7XHJcbiAgICAgICAgICAgICAgICBzdGF0aWMgZnJvbUFycmF5RGF0YShhcnJheURhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcmltaXRpdmVSZW5kZXJlciA9IG5ldyBQcmltaXRpdmVSZW5kZXJlcihzZWxmLmdsKTtcclxuICAgICAgICAgICAgICAgICAgICBwcmltaXRpdmVSZW5kZXJlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY3JlYXRlVkFPKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNyZWF0ZUdlb21ldHJ5QnVmZmVycyhhcnJheURhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZXRBdHRyaWJ1dGVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByaW1pdGl2ZVJlbmRlcmVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VwZXIoc2VsZi5nbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSkoKTtcclxuICAgICAgICB0aGlzLkRyYXdlciA9ICgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gY2xhc3MgZXh0ZW5kcyBEcmF3ZXIge1xyXG4gICAgICAgICAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VwZXIoc2VsZik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSkoKTtcclxuICAgICAgICB0aGlzLlRleHR1cmVJbmZvID0gKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHJldHVybiBjbGFzcyBleHRlbmRzIFRleHR1cmVJbmZvIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cGVyKHNlbGYuZ2wpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICAgICAgaWYgKCFnbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyB3ZWJnbCFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2wgPSBnbDtcclxuICAgICAgICB0aGlzLnByb2dyYW1zID0ge307XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgZ2V0TGFzdFVzZWRQcm9ncmFtSW5mbygpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyQ2FjaGUubGFzdFVzZWRQcm9ncmFtSW5mbztcclxuICAgIH1cclxuICAgIHNldExhc3RVc2VkUHJvZ3JhbShwcm9ncmFtSW5mbykge1xyXG4gICAgICB0aGlzLnJlbmRlckNhY2hlLmxhc3RVc2VkUHJvZ3JhbUluZm8gPSBwcm9ncmFtSW5mbztcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAqL1xyXG4gICAgdXNlUHJvZ3JhbUluZm8ocHJvZ3JhbUluZm8pIHtcclxuICAgICAgICBpZiAocHJvZ3JhbUluZm8gIT0gdGhpcy5sYXN0VXNlZFByb2dyYW1JbmZvKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2wudXNlUHJvZ3JhbShwcm9ncmFtSW5mby5wcm9ncmFtKTtcclxuICAgICAgICAgICAgdGhpcy5sYXN0VXNlZFByb2dyYW1JbmZvID0gcHJvZ3JhbUluZm87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgcmVzaXplQ2FudmFzVG9EaXNwbGF5U2l6ZShtdWx0aXBsaWVyID0gMSkge1xyXG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuZ2wuY2FudmFzO1xyXG4gICAgICAgIGNvbnN0IHdpZHRoID0gKGNhbnZhcy5jbGllbnRXaWR0aCAqIG11bHRpcGxpZXIpIHwgMDtcclxuICAgICAgICBjb25zdCBoZWlnaHQgPSAoY2FudmFzLmNsaWVudEhlaWdodCAqIG11bHRpcGxpZXIpIHwgMDtcclxuICAgICAgICBjYW52YXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgcmVzaXplQ2FudmFzKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgICBjb25zdCBjYW52YXMgPSB0aGlzLmdsLmNhbnZhcztcclxuICAgICAgICBjYW52YXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2V0Vmlld3BvcnQoKSB7XHJcbiAgICAgICAgdGhpcy5nbC52aWV3cG9ydCgwLCAwLCB0aGlzLmdsLmNhbnZhcy53aWR0aCwgdGhpcy5nbC5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGdldENvbnRleHQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2w7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IFByaW1pdGl2ZVJlbmRlcmVyIGZyb20gXCIuL1ByaW1pdGl2ZVJlbmRlcmVyXCI7XHJcbmltcG9ydCB7IE1lc2hSZW5kZXJlciB9IGZyb20gXCIuL01lc2hSZW5kZXJlclwiO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVTZXR0ZXIsIEJ1ZmZlckNvbnRyb2xsZXIgfSBmcm9tIFwiLi9CdWZmZXJBdHRyaWJ1dGVcIjtcclxuaW1wb3J0IHsgTlVNX0NPTVBPTkVOVFMsIFRZUEVEX0FSUkFZUywgTE9DQVRJT05TIH0gZnJvbSBcIi4vZW51bXNcIjtcclxuLy8vIFRPRE8gLy8vXHJcbmNvbnN0IEFycmF5RGF0YUZyb21HbHRmID0gKGdsdGYsIGJ1ZmZlcnMpID0+IHtcclxuICAgIGNvbnN0IHsgYnVmZmVyVmlld3MsIGFjY2Vzc29ycywgbWVzaGVzLCBub2RlcyB9ID0gZ2x0ZjtcclxuICAgIGNvbnN0IGF0dHJpYkRhdGFGcm9tQWNjZXNzb3IgPSAoYWNjZXNzb3IpID0+IHtcclxuICAgICAgICBjb25zdCBidWZmZXJWaWV3ID0gYnVmZmVyVmlld3NbYWNjZXNzb3IuYnVmZmVyVmlld107XHJcbiAgICAgICAgY29uc3QgeyBjb3VudCwgY29tcG9uZW50VHlwZSwgdHlwZSB9ID0gYWNjZXNzb3I7XHJcbiAgICAgICAgY29uc3QgYnl0ZU9mZnNldCA9IGFjY2Vzc29yLmJ5dGVPZmZzZXQgfHwgMDtcclxuICAgICAgICBjb25zdCB7IGJ5dGVMZW5ndGgsIHRhcmdldCB9ID0gYnVmZmVyVmlldztcclxuICAgICAgICBjb25zdCBzdHJpZGUgPSBidWZmZXJWaWV3LmJ5dGVTdHJpZGUgfHwgMDtcclxuICAgICAgICBjb25zdCBidWZmZXJWaWV3Qnl0ZU9mZnNldCA9IGJ1ZmZlclZpZXcuYnl0ZU9mZnNldCB8fCAwO1xyXG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IGJ1ZmZlcnNbYnVmZmVyVmlldy5idWZmZXJdO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRhdGE6IG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgYnVmZmVyVmlld0J5dGVPZmZzZXQsIGJ5dGVMZW5ndGgpLFxyXG4gICAgICAgICAgICBudW1Db21wb25lbnRzOiBOVU1fQ09NUE9ORU5UU1t0eXBlXSxcclxuICAgICAgICAgICAgc3RyaWRlLFxyXG4gICAgICAgICAgICBieXRlTGVuZ3RoLFxyXG4gICAgICAgICAgICBsb2NhdGlvbjogbnVsbCxcclxuICAgICAgICAgICAgY291bnQsXHJcbiAgICAgICAgICAgIHR5cGU6IGNvbXBvbmVudFR5cGUsXHJcbiAgICAgICAgICAgIG9mZnNldDogYnl0ZU9mZnNldCB8fCAwLFxyXG4gICAgICAgICAgICBjb21wb25lbnRUeXBlOiBhY2Nlc3Nvci5jb21wb25lbnRUeXBlLFxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgY29uc3QgX21lc2hlcyA9IG1lc2hlcy5tYXAoKG1lc2gpID0+ICh7XHJcbiAgICAgICAgcHJpbWl0aXZlczogbWVzaC5wcmltaXRpdmVzLm1hcCgoX3ByaW1pdGl2ZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwcmltaXRpdmUgPSB7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7fSxcclxuICAgICAgICAgICAgICAgIG1vZGU6IF9wcmltaXRpdmUubW9kZSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKF9wcmltaXRpdmUuaGFzT3duUHJvcGVydHkoXCJpbmRpY2VzXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRpY2VzSW5mbyA9IGF0dHJpYkRhdGFGcm9tQWNjZXNzb3IoYWNjZXNzb3JzW19wcmltaXRpdmUuaW5kaWNlc10pO1xyXG4gICAgICAgICAgICAgICAgcHJpbWl0aXZlLmluZGljZXMgPSBpbmRpY2VzSW5mby5kYXRhO1xyXG4gICAgICAgICAgICAgICAgcHJpbWl0aXZlLm51bUVsZW1lbnRzID0gaW5kaWNlc0luZm8uY291bnQ7XHJcbiAgICAgICAgICAgICAgICBwcmltaXRpdmUuY29tcG9uZW50VHlwZSA9IGluZGljZXNJbmZvLmNvbXBvbmVudFR5cGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgT2JqZWN0LmtleXMoX3ByaW1pdGl2ZS5hdHRyaWJ1dGVzKS5mb3JFYWNoKChhdHRyaWJOYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhdHRyaWJ1dGUgPSBfcHJpbWl0aXZlLmF0dHJpYnV0ZXNbYXR0cmliTmFtZV07XHJcbiAgICAgICAgICAgICAgICBwcmltaXRpdmUuYXR0cmlidXRlc1thdHRyaWJOYW1lXSA9IGF0dHJpYkRhdGFGcm9tQWNjZXNzb3IoYWNjZXNzb3JzW2F0dHJpYnV0ZV0pO1xyXG4gICAgICAgICAgICAgICAgLy9pZihhdHRyaWJOYW1lID09PSAnSk9JTlRTXzAnKSBfcHJpbWl0aXZlLmF0dHJpYnV0ZXNbYXR0cmliTmFtZV0uZGF0YSA9IG5ldyBVaW50MzJBcnJheShfcHJpbWl0aXZlLmF0dHJpYnV0ZXNbYXR0cmliTmFtZV0uZGF0YSlcclxuICAgICAgICAgICAgICAgIHByaW1pdGl2ZS5hdHRyaWJ1dGVzW2F0dHJpYk5hbWVdLmxvY2F0aW9uID0gTE9DQVRJT05TW2F0dHJpYk5hbWVdO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHByaW1pdGl2ZTtcclxuICAgICAgICB9KSxcclxuICAgICAgICBuYW1lOiBtZXNoLm5hbWUsXHJcbiAgICB9KSk7XHJcbiAgICByZXR1cm4gX21lc2hlcy5tYXAoKG1lc2gpID0+IHtcclxuICAgICAgICBjb25zdCBwcmltaXRpdmVzID0gbWVzaC5wcmltaXRpdmVzLm1hcCgocHJpbWl0aXZlKSA9PiBuZXcgUHJpbWl0aXZlUmVuZGVyZXIocHJpbWl0aXZlKSk7XHJcbiAgICAgICAgY29uc3QgbmFtZSA9IG1lc2gubmFtZTtcclxuICAgICAgICByZXR1cm4gbmV3IE1lc2hSZW5kZXJlcih7IHByaW1pdGl2ZXMsIG5hbWUgfSk7XHJcbiAgICB9KTtcclxufTtcclxuY29uc3QgUHJpbWl0aXZlUmVuZGVySW5mb0Zyb21BcnJheURhdGEgPSAobWVzaGVzKSA9PiBtZXNoZXMubWFwKChtZXNoKSA9PiB7XHJcbiAgICBjb25zdCBwcmltaXRpdmVzID0gbWVzaC5wcmltaXRpdmVzLm1hcCgocHJpbWl0aXZlKSA9PiBuZXcgUHJpbWl0aXZlUmVuZGVyZXIocHJpbWl0aXZlKSk7XHJcbiAgICBjb25zdCBuYW1lID0gbWVzaC5uYW1lO1xyXG4gICAgcmV0dXJuIG5ldyBNZXNoUmVuZGVyZXIoeyBuYW1lLCBwcmltaXRpdmVzIH0pO1xyXG59KTtcclxuY29uc3QgRW50aXR5RGF0YUZyb21HbHRmID0gKGdsdGYsIGJ1ZmZlcnMpID0+IFByaW1pdGl2ZVJlbmRlckluZm9Gcm9tQXJyYXlEYXRhKEFycmF5RGF0YUZyb21HbHRmKGdsdGYsIGJ1ZmZlcnMpKTtcclxuY2xhc3MgR0xURiB7XHJcbiAgICBjb25zdHJ1Y3RvcihnbHRmLCBiaW5hcnlCdWZmZXJzKSB7XHJcbiAgICAgICAgY29uc3QgeyBub2RlcyB9ID0gZ2x0ZjtcclxuICAgICAgICB0aGlzLm5vZGVzID0gbm9kZXM7XHJcbiAgICAgICAgdGhpcy5tZXNoZXMgPSBBcnJheURhdGFGcm9tR2x0ZihnbHRmLCBiaW5hcnlCdWZmZXJzKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgeyBBcnJheURhdGFGcm9tR2x0ZiwgUHJpbWl0aXZlUmVuZGVySW5mb0Zyb21BcnJheURhdGEsIEVudGl0eURhdGFGcm9tR2x0ZiwgR0xURiwgfTtcclxuIiwiaW1wb3J0IGdldEF0dHJpYnV0ZVByb3BzQnlUeXBlIGZyb20gXCIuL2F0dHJpYlR5cGVQcm9wc1wiO1xyXG5pbXBvcnQgYXR0cmliVHlwZVByb3BzIGZyb20gXCIuL2F0dHJpYlR5cGVQcm9wc1wiO1xyXG5pbXBvcnQgeyBCdWZmZXJBdHRyaWJ1dGUgfSBmcm9tIFwiLi9CdWZmZXJBdHRyaWJ1dGVcIjtcclxuY2xhc3MgTWVzaFJlbmRlcmVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHsgcHJpbWl0aXZlcywgbmFtZSB9KSB7XHJcbiAgICAgICAgdGhpcy5wcmltaXRpdmVzID0gcHJpbWl0aXZlcztcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuY29udGV4dCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5idWZmZXJzID0ge307XHJcbiAgICB9XHJcbiAgICBkcmF3KHVuaWZvcm1zLCBjYW1lcmFNYXRyaXgpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbiA9IHRoaXMucHJpbWl0aXZlcy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5wcmltaXRpdmVzW2ldLmRyYXcodW5pZm9ybXMsIGNhbWVyYU1hdHJpeCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgZHJhd0luc3RhbmNlZCh1bmlmb3JtcywgY2FtZXJhTWF0cml4LCBudW1JbnN0YW5jZXMpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbiA9IHRoaXMucHJpbWl0aXZlcy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5wcmltaXRpdmVzW2ldLmRyYXdJbnN0YW5jZWQodW5pZm9ybXMsIGNhbWVyYU1hdHJpeCwgbnVtSW5zdGFuY2VzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgU2tpbm5lZE1lc2hSZW5kZXJlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihwcmltaXRpdmVzLCBza2luKSB7XHJcbiAgICAgICAgdGhpcy5wcmltaXRpdmVzID0gcHJpbWl0aXZlcztcclxuICAgICAgICB0aGlzLnNraW4gPSBza2luO1xyXG4gICAgfVxyXG4gICAgZHJhdyh1bmlmb3JtcywgY2FtZXJhTWF0cml4KSB7XHJcbiAgICAgICAgdGhpcy5za2luLnVwZGF0ZSh1bmlmb3Jtcy51X21hdHJpeCk7XHJcbiAgICAgICAgY29uc3QgX3VuaWZvcm1zID0gT2JqZWN0LmFzc2lnbih7IHVfam9pbnRUZXh0dXJlOiB0aGlzLnNraW4uam9pbnRUZXh0dXJlLCB1X251bUpvaW50czogdGhpcy5za2luLmpvaW50cy5sZW5ndGggfSwgdW5pZm9ybXMpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gdGhpcy5wcmltaXRpdmVzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnByaW1pdGl2ZXNbaV0uZHJhdyhfdW5pZm9ybXMsIGNhbWVyYU1hdHJpeCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7IE1lc2hSZW5kZXJlciwgU2tpbm5lZE1lc2hSZW5kZXJlciB9O1xyXG4iLCJjbGFzcyBUUlMge1xyXG4gICAgY29uc3RydWN0b3IodHJhbnNsYXRpb24sIHJvdGF0aW9uLCBzY2FsZSkge1xyXG4gICAgICAgIHRoaXMudHJhbnNsYXRpb24gPSB0cmFuc2xhdGlvbjtcclxuICAgICAgICB0aGlzLnJvdGF0aW9uID0gcm90YXRpb247XHJcbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xyXG4gICAgfVxyXG4gICAgZ2V0TWF0cml4KG0pIHtcclxuICAgICAgICBsZXQgZHN0ID0gbSB8fCBtNC5pZGVudGl0eSgpO1xyXG4gICAgICAgIHZhciB0ID0gdGhpcy50cmFuc2xhdGlvbjtcclxuICAgICAgICB2YXIgciA9IHRoaXMucm90YXRpb247XHJcbiAgICAgICAgdmFyIHMgPSB0aGlzLnNjYWxlO1xyXG4gICAgICAgIGNvbnN0IHNpbiA9IE1hdGguc2luKHJbM10gLyAyKTtcclxuICAgICAgICBjb25zdCBjb3MgPSBNYXRoLmNvcyhyWzNdIC8gMik7XHJcbiAgICAgICAgZHN0ID0gbTQudHJhbnNsYXRlKGRzdCwgdFswXSwgdFsxXSwgdFsyXSk7XHJcbiAgICAgICAgZHN0ID0gbTQubXVsdGlwbHkoZHN0LCBtNC5mcm9tUXVhdGVybmlvbihyKSk7XHJcbiAgICAgICAgZHN0ID0gbTQuc2NhbGUoZHN0LCBzWzBdLCBzWzFdLCBzWzJdKTtcclxuICAgICAgICByZXR1cm4gZHN0O1xyXG4gICAgfVxyXG4gICAgZ2V0Uk1hdHJpeCgpIHtcclxuICAgICAgICBsZXQgZHN0ID0gbTQuaWRlbnRpdHkoKTtcclxuICAgICAgICB2YXIgciA9IHRoaXMucm90YXRpb247XHJcbiAgICAgICAgZHN0ID0gbTQueFJvdGF0ZShkc3QsIHJbMF0pO1xyXG4gICAgICAgIGRzdCA9IG00LnlSb3RhdGUoZHN0LCByWzFdKTtcclxuICAgICAgICBkc3QgPSBtNC56Um90YXRlKGRzdCwgclsyXSk7XHJcbiAgICAgICAgcmV0dXJuIGRzdDtcclxuICAgIH1cclxuICAgIGdldFRSbWF0cml4KCkge1xyXG4gICAgICAgIGNvbnN0IHQgPSB0aGlzLnRyYW5zbGF0aW9uO1xyXG4gICAgICAgIGNvbnN0IHIgPSB0aGlzLnJvdGF0aW9uO1xyXG4gICAgICAgIGxldCBtID0gbTQudHJhbnNsYXRpb24odFswXSwgdFsxXSwgdFsyXSk7XHJcbiAgICAgICAgbSA9IG00LnhSb3RhdGUobSwgclswXSk7XHJcbiAgICAgICAgbSA9IG00LnlSb3RhdGUobSwgclsxXSk7XHJcbiAgICAgICAgbSA9IG00LnpSb3RhdGUobSwgclsyXSk7XHJcbiAgICAgICAgcmV0dXJuIG07XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgTm9kZSB7XHJcbiAgICBzdGF0aWMgbWFrZU1vZGVsKGVudGl0eURlc2NyaXB0aW9uLCByb290Tm9kZU5keCkge1xyXG4gICAgICAgIGNvbnN0IHsgbm9kZXMsIG1lc2hlcyB9ID0gZW50aXR5RGVzY3JpcHRpb247XHJcbiAgICAgICAgY29uc3Qgcm9vdE5vZGUgPSBub2Rlc1tyb290Tm9kZU5keF07XHJcbiAgICAgICAgY29uc3QgbWFrZU5vZGUgPSAobm9kZURlc2NyaXB0aW9uLCBuZHgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdHJzID0gbmV3IFRSUyhub2RlRGVzY3JpcHRpb24udHJhbnNsYXRpb24gfHwgWzAsIDAsIDBdLCBub2RlRGVzY3JpcHRpb24ucm90YXRpb24gfHwgWzAsIDAsIDBdLCBub2RlRGVzY3JpcHRpb24uc2NhbGUgfHwgWzEsIDEsIDFdKTtcclxuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IG5ldyBOb2RlKG5vZGVEZXNjcmlwdGlvbi5uYW1lLCB0cnMsIG5keCk7XHJcbiAgICAgICAgICAgIGlmIChub2RlRGVzY3JpcHRpb24ubWVzaCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUucmVuZGVyZXIgPSBtZXNoZXNbbm9kZURlc2NyaXB0aW9uLm1lc2hdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChub2RlRGVzY3JpcHRpb24uY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgIG5vZGVEZXNjcmlwdGlvbi5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZE5keCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gbWFrZU5vZGUobm9kZXNbY2hpbGROZHhdLCBjaGlsZE5keCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuc2V0UGFyZW50KG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gbWFrZU5vZGUocm9vdE5vZGUsIHJvb3ROb2RlTmR4KTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIHRycyA9IG5ldyBUUlMoKSkge1xyXG4gICAgICAgIHRoaXMud29ybGRNYXRyaXggPSBtNC5pZGVudGl0eSgpO1xyXG4gICAgICAgIHRoaXMucGFyZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuID0gW107XHJcbiAgICAgICAgdGhpcy50cnMgPSB0cnM7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLnBhcnRzID0gW107XHJcbiAgICAgICAgdGhpcy5uZHggPSBuZHg7XHJcbiAgICAgICAgdGhpcy5za2luTmR4ID0gbnVsbDtcclxuICAgICAgICB0aGlzLm9iamVjdHNUb0RyYXcgPSBbXTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyID0gbnVsbDtcclxuICAgIH1cclxuICAgIHNldFBhcmVudChwYXJlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5wYXJlbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgbmR4ID0gdGhpcy5wYXJlbnQuY2hpbGRyZW4uaW5kZXhPZih0aGlzKTtcclxuICAgICAgICAgICAgaWYgKG5keCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5jaGlsZHJlbi5zcGxpY2UobmR4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGFyZW50KSB7XHJcbiAgICAgICAgICAgIHBhcmVudC5jaGlsZHJlbi5wdXNoKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcclxuICAgIH1cclxuICAgIHVwZGF0ZVdvcmxkTWF0cml4KHBhcmVudFdvcmxkTWF0cml4KSB7XHJcbiAgICAgICAgbGV0IG1hdHJpeCA9IHRoaXMudHJzLmdldE1hdHJpeCgpO1xyXG4gICAgICAgIGlmIChwYXJlbnRXb3JsZE1hdHJpeCkge1xyXG4gICAgICAgICAgICBtYXRyaXggPSBtNC5tdWx0aXBseShwYXJlbnRXb3JsZE1hdHJpeCwgbWF0cml4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy53b3JsZE1hdHJpeCA9IG1hdHJpeDtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XHJcbiAgICAgICAgICAgIGNoaWxkLnVwZGF0ZVdvcmxkTWF0cml4KG1hdHJpeCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVQYXJ0c0xpc3QoKSB7XHJcbiAgICAgICAgY29uc3QgaXRlciA9IChub2RlLCBhcnIpID0+IHtcclxuICAgICAgICAgICAgYXJyLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IGl0ZXIoY2hpbGQsIGFycikpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaXRlcih0aGlzLCB0aGlzLnBhcnRzKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZU9iamVjdHNUb0RyYXcoKSB7XHJcbiAgICAgICAgY29uc3QgcXVldWUgPSBbdGhpc107XHJcbiAgICAgICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHF1ZXVlLnBvcCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhub2RlKTtcclxuICAgICAgICAgICAgaWYgKG5vZGUucmVuZGVyZXIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9iamVjdHNUb0RyYXcucHVzaChub2RlKTtcclxuICAgICAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW4pXHJcbiAgICAgICAgICAgICAgICBxdWV1ZS5wdXNoKC4uLm5vZGUuY2hpbGRyZW4pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHRyYXZlcnNlKGZuKSB7XHJcbiAgICAgICAgZm4odGhpcyk7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4gY2hpbGQudHJhdmVyc2UoZm4pKTtcclxuICAgIH1cclxuICAgIGZpbmQobmR4KSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgY29uc3QgaXRlciA9IChub2RlcykgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBub2RlIG9mIG5vZGVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5uZHggPT09IG5keClcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBub2RlO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZXIobm9kZS5jaGlsZHJlbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGl0ZXIoW3RoaXNdKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgZmluZEJ5TmFtZShuYW1lKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgY29uc3QgaXRlciA9IChub2RlcykgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBub2RlIG9mIG5vZGVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5uYW1lID09PSBuYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IG5vZGU7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlcihub2RlLmNoaWxkcmVuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaXRlcihbdGhpc10pO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICByZW5kZXIodW5pZm9ybXMsIGNhbWVyYU1hdHJpeCkge1xyXG4gICAgICAgIHRoaXMub2JqZWN0c1RvRHJhdy5mb3JFYWNoKChvYmplY3QpID0+IHtcclxuICAgICAgICAgICAgb2JqZWN0LnJlbmRlcmVyLmRyYXcoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB1bmlmb3JtcyksIHsgdV9tYXRyaXg6IG9iamVjdC53b3JsZE1hdHJpeCB9KSwgY2FtZXJhTWF0cml4KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5jbGFzcyBNb2RlbCBleHRlbmRzIE5vZGUge1xyXG4gICAgc3RhdGljIG1ha2VNb2RlbChlbnRpdHlEZXNjcmlwdGlvbiwgcm9vdE5vZGVOZHgpIHtcclxuICAgICAgICBjb25zdCB7IG5vZGVzLCBtZXNoZXMgfSA9IGVudGl0eURlc2NyaXB0aW9uO1xyXG4gICAgICAgIGNvbnN0IHJvb3ROb2RlID0gbm9kZXNbcm9vdE5vZGVOZHhdO1xyXG4gICAgICAgIGNvbnN0IG1ha2VOb2RlID0gKG5vZGVEZXNjcmlwdGlvbiwgbmR4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRycyA9IG5ldyBUUlMobm9kZURlc2NyaXB0aW9uLnRyYW5zbGF0aW9uIHx8IFswLCAwLCAwXSwgbm9kZURlc2NyaXB0aW9uLnJvdGF0aW9uIHx8IFswLCAwLCAwLCAwXSwgbm9kZURlc2NyaXB0aW9uLnNjYWxlIHx8IFsxLCAxLCAxXSk7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBuZXcgRW50aXR5KG5vZGVEZXNjcmlwdGlvbi5uYW1lLCB0cnMsIG5keCk7XHJcbiAgICAgICAgICAgIGlmIChub2RlRGVzY3JpcHRpb24ubWVzaCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUucmVuZGVyZXIgPSBtZXNoZXNbbm9kZURlc2NyaXB0aW9uLm1lc2hdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChub2RlRGVzY3JpcHRpb24uY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgIG5vZGVEZXNjcmlwdGlvbi5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZE5keCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gbWFrZU5vZGUobm9kZXNbY2hpbGROZHhdLCBjaGlsZE5keCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuc2V0UGFyZW50KG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gbWFrZU5vZGUocm9vdE5vZGUsIHJvb3ROb2RlTmR4KTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIHRycywgbmR4KSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSwgdHJzKTtcclxuICAgICAgICB0aGlzLm5keCA9IG5keDtcclxuICAgICAgICB0aGlzLnBoeXNpY3MgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc2tpbk5keCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzVG9EcmF3ID0gW107XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG51bGw7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVPYmplY3RzVG9EcmF3KCkge1xyXG4gICAgICAgIGNvbnN0IHF1ZXVlID0gW3RoaXNdO1xyXG4gICAgICAgIHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBxdWV1ZS5wb3AoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobm9kZSk7XHJcbiAgICAgICAgICAgIGlmIChub2RlLnJlbmRlcmVyKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vYmplY3RzVG9EcmF3LnB1c2gobm9kZSk7XHJcbiAgICAgICAgICAgIGlmIChub2RlLmNoaWxkcmVuKVxyXG4gICAgICAgICAgICAgICAgcXVldWUucHVzaCguLi5ub2RlLmNoaWxkcmVuKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB0cmF2ZXJzZShmbikge1xyXG4gICAgICAgIGZuKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IGNoaWxkLnRyYXZlcnNlKGZuKSk7XHJcbiAgICB9XHJcbiAgICBmaW5kKG5keCkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xyXG4gICAgICAgIGNvbnN0IGl0ZXIgPSAobm9kZXMpID0+IHtcclxuICAgICAgICAgICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubmR4ID09PSBuZHgpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gbm9kZTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBpdGVyKG5vZGUuY2hpbGRyZW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpdGVyKFt0aGlzXSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIGZpbmRCeU5hbWUobmFtZSkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xyXG4gICAgICAgIGNvbnN0IGl0ZXIgPSAobm9kZXMpID0+IHtcclxuICAgICAgICAgICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubmFtZSA9PT0gbmFtZSlcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBub2RlO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZXIobm9kZS5jaGlsZHJlbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGl0ZXIoW3RoaXNdKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKHVuaWZvcm1zLCBjYW1lcmFNYXRyaXgpIHtcclxuICAgICAgICB0aGlzLm9iamVjdHNUb0RyYXcuZm9yRWFjaCgob2JqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIG9iamVjdC5yZW5kZXJlci5kcmF3KE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdW5pZm9ybXMpLCB7IHVfbWF0cml4OiBvYmplY3Qud29ybGRNYXRyaXggfSksIGNhbWVyYU1hdHJpeCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgTW9kZWw7XHJcbiIsImltcG9ydCB7IEJ1ZmZlckF0dHJpYnV0ZUluZm8gfSBmcm9tIFwiLi9CdWZmZXJBdHRyaWJ1dGVcIjtcclxuY2xhc3MgUHJpbWl0aXZlUmVuZGVyZXIge1xyXG4gICAgY29uc3RydWN0b3IoZ2wpIHtcclxuICAgICAgICB0aGlzLmJ1ZmZlckF0dHJpYnMgPSB7fTtcclxuICAgICAgICB0aGlzLnByb2dyYW1JbmZvID0gbnVsbDtcclxuICAgICAgICB0aGlzLmdsID0gZ2w7XHJcbiAgICAgICAgdGhpcy5kcmF3ZXIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubW9kZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5vZmZzZXQgPSAwO1xyXG4gICAgICAgIHRoaXMubnVtRWxlbWVudHMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuVkFPID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudFR5cGUgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgc2V0Q29udGV4dChnbCkge1xyXG4gICAgICAgIHRoaXMuZ2wgPSBnbDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGNyZWF0ZVZBTygpIHtcclxuICAgICAgICBpZiAodGhpcy5WQU8pXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIHRoaXMuVkFPID0gdGhpcy5nbC5jcmVhdGVWZXJ0ZXhBcnJheSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2V0TW9kZShtb2RlKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlID0gbW9kZTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNldE51bUVsZW1lbnRzKG51bUVsZW1lbnRzKSB7XHJcbiAgICAgICAgdGhpcy5udW1FbGVtZW50cyA9IG51bUVsZW1lbnRzO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2V0T2Zmc2V0KG9mZnNldCkge1xyXG4gICAgICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2V0SW5kaWNlcyhhcnJheUJ1ZmZlcikge1xyXG4gICAgICAgIGNvbnN0IHsgZ2wsIFZBTyB9ID0gdGhpcztcclxuICAgICAgICBnbC5iaW5kVmVydGV4QXJyYXkoVkFPKTtcclxuICAgICAgICB0aGlzLm51bUVsZW1lbnRzID0gYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCAvIDI7XHJcbiAgICAgICAgY29uc3QgaW5kaWNlc0J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xyXG4gICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGluZGljZXNCdWZmZXIpO1xyXG4gICAgICAgIGdsLmJ1ZmZlckRhdGEoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGFycmF5QnVmZmVyLCBnbC5TVEFUSUNfRFJBVyk7XHJcbiAgICAgICAgZ2wuYmluZFZlcnRleEFycmF5KG51bGwpO1xyXG4gICAgICAgIHRoaXMuaW5kaWNlcyA9IGluZGljZXNCdWZmZXI7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBjcmVhdGVHZW9tZXRyeUJ1ZmZlcnMoYXJyYXlEYXRhKSB7XHJcbiAgICAgICAgY29uc3QgeyBnbCB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCB7IGF0dHJpYnV0ZXMsIGluZGljZXMsIGNvbXBvbmVudFR5cGUsIG51bUVsZW1lbnRzLCBtb2RlLCBvZmZzZXQgfSA9IGFycmF5RGF0YTtcclxuICAgICAgICB0aGlzLm51bUVsZW1lbnRzID0gbnVtRWxlbWVudHM7XHJcbiAgICAgICAgdGhpcy5tb2RlID0gbW9kZTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudFR5cGUgPSBjb21wb25lbnRUeXBlIHx8IDUxMjM7XHJcbiAgICAgICAgdGhpcy5vZmZzZXQgPSAwO1xyXG4gICAgICAgIGlmIChhdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goKGF0dHJpYnV0ZU5hbWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGF0dHJpYlByb3BzID0gYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJ1ZmZlckF0dHJpYnV0ZUluZm8gPSBuZXcgQnVmZmVyQXR0cmlidXRlSW5mbyhnbCwgYXR0cmliUHJvcHMpO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyQXR0cmlidXRlSW5mby5idWZmZXJEYXRhKGF0dHJpYlByb3BzLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idWZmZXJBdHRyaWJzW2F0dHJpYnV0ZU5hbWVdID0gYnVmZmVyQXR0cmlidXRlSW5mbztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbmRpY2VzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGljZXNCdWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcclxuICAgICAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgaW5kaWNlc0J1ZmZlcik7XHJcbiAgICAgICAgICAgIGdsLmJ1ZmZlckRhdGEoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGluZGljZXMsIGdsLlNUQVRJQ19EUkFXKTtcclxuICAgICAgICAgICAgdGhpcy5pbmRpY2VzID0gaW5kaWNlc0J1ZmZlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBzZXRBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXM7XHJcbiAgICAgICAgZ2wuYmluZFZlcnRleEFycmF5KHRoaXMuVkFPKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGF0dHJpYiBpbiB0aGlzLmJ1ZmZlckF0dHJpYnMpIHtcclxuICAgICAgICAgICAgY29uc3QgYnVmZmVyQXR0cmlidXRlSW5mbyA9IHRoaXMuYnVmZmVyQXR0cmlic1thdHRyaWJdO1xyXG4gICAgICAgICAgICBidWZmZXJBdHRyaWJ1dGVJbmZvLnNldEF0dHJpYnV0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLmluZGljZXMpO1xyXG4gICAgICAgIGdsLmJpbmRWZXJ0ZXhBcnJheShudWxsKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNldERyYXdlcihkcmF3ZXIpIHtcclxuICAgICAgICB0aGlzLmRyYXdlciA9IGRyYXdlcjtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNldFByb2dyYW1JbmZvKHByb2dyYW1JbmZvKSB7XHJcbiAgICAgICAgdGhpcy5wcm9ncmFtSW5mbyA9IHByb2dyYW1JbmZvO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlQnVmZmVyQXR0cmliRGF0YSh7IGF0dHJpYk5hbWUsIGxvY2F0aW9uLCBzdHJpZGUsIG51bUNvbXBvbmVudHMsIG9mZnNldCwgdHlwZSwgZGl2aXNvciwgYXR0cmlidXRlVHlwZSwgfSkge1xyXG4gICAgICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgYnVmZmVyQXR0cmliSW5mbyA9IG5ldyBCdWZmZXJBdHRyaWJ1dGVJbmZvKGdsLCB7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLFxyXG4gICAgICAgICAgICBzdHJpZGUsXHJcbiAgICAgICAgICAgIG51bUNvbXBvbmVudHMsXHJcbiAgICAgICAgICAgIG9mZnNldCxcclxuICAgICAgICAgICAgdHlwZSxcclxuICAgICAgICAgICAgZGl2aXNvcixcclxuICAgICAgICAgICAgYXR0cmlidXRlVHlwZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmJ1ZmZlckF0dHJpYnNbYXR0cmliTmFtZV0gPSBidWZmZXJBdHRyaWJJbmZvO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgLypcclxuICAgIHNldEJ1ZmZlckF0dHJpYkRhdGEobmFtZSwgYnVmZmVyQXR0cmliRGF0YSkge1xyXG4gICAgICB0aGlzLmJ1ZmZlcnMgPSB7IC4uLnRoaXMuYnVmZmVycywgW25hbWVdOiBidWZmZXJBdHRyaWJEYXRhIH07XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgKi9cclxuICAgIHNldEF0dHJpYnV0ZShhdHRyaWJOYW1lKSB7XHJcbiAgICAgICAgY29uc3QgeyBnbCB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCBidWZmZXJBdHRyaWJEYXRhID0gdGhpcy5idWZmZXJBdHRyaWJzW2F0dHJpYk5hbWVdO1xyXG4gICAgICAgIGdsLmJpbmRWZXJ0ZXhBcnJheSh0aGlzLlZBTyk7XHJcbiAgICAgICAgYnVmZmVyQXR0cmliRGF0YS5zZXRBdHRyaWJ1dGUoKTtcclxuICAgICAgICBnbC5iaW5kVmVydGV4QXJyYXkobnVsbCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgX3NldEF0dHJpYnV0ZShidWZmZXJBdHRyaWJEYXRhKSB7XHJcbiAgICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXM7XHJcbiAgICAgIGdsLmJpbmRWZXJ0ZXhBcnJheSh0aGlzLnZhbyk7XHJcbiAgICAgIGJ1ZmZlckF0dHJpYkRhdGEuc2V0QXR0cmlidXRlKCk7XHJcbiAgICAgIGdsLmJpbmRWZXJ0ZXhBcnJheShudWxsKTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAqL1xyXG4gICAgYnVmZmVyRGF0YShhdHRyaWJOYW1lLCBkYXRhLCB1c2FnZSkge1xyXG4gICAgICAgIGNvbnN0IGJ1ZmZlckF0dHJpYkluZm8gPSB0aGlzLmJ1ZmZlckF0dHJpYnNbYXR0cmliTmFtZV07XHJcbiAgICAgICAgYnVmZmVyQXR0cmliSW5mby5idWZmZXJEYXRhKGRhdGEsIHVzYWdlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGJ1ZmZlclN1YkRhdGEoYXR0cmliTmFtZSwgZGF0YSwgb2Zmc2V0KSB7XHJcbiAgICAgICAgY29uc3QgYnVmZmVyQXR0cmliSW5mbyA9IHRoaXMuYnVmZmVyQXR0cmlic1thdHRyaWJOYW1lXTtcclxuICAgICAgICBidWZmZXJBdHRyaWJJbmZvLmJ1ZmZlclN1YkRhdGEoZGF0YSwgb2Zmc2V0KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGFsbG9jQnVmZmVyKGF0dHJpYk5hbWUsIGJ5dGVMZW5ndGgsIHVzYWdlKSB7XHJcbiAgICAgICAgY29uc3QgYnVmZmVyQXR0cmliSW5mbyA9IHRoaXMuYnVmZmVyQXR0cmlic1thdHRyaWJOYW1lXTtcclxuICAgICAgICBidWZmZXJBdHRyaWJJbmZvLmFsbG9jQnVmZmVyKGJ5dGVMZW5ndGgsIHVzYWdlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGRyYXcodW5pZm9ybXMsIGNhbWVyYU1hdHJpeCkge1xyXG4gICAgICAgIHRoaXMuZHJhd2VyLmRyYXcodGhpcywgdW5pZm9ybXMsIGNhbWVyYU1hdHJpeCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBkcmF3SW5zdGFuY2VkKHVuaWZvcm1zLCBjYW1lcmFNYXRyaXgsIG51bUluc3RhbmNlcykge1xyXG4gICAgICAgIHRoaXMuZHJhd2VyLmRyYXdJbnN0YW5jZWQodGhpcywgdW5pZm9ybXMsIGNhbWVyYU1hdHJpeCwgbnVtSW5zdGFuY2VzKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBQcmltaXRpdmVSZW5kZXJlcjtcclxuIiwiaW1wb3J0IHsgdjMgfSBmcm9tICdyb21hbnBwcG1hdGgnO1xyXG5pbXBvcnQgeyBGTE9BVF9WRUMyLCBGTE9BVF9WRUMzIH0gZnJvbSBcIi4vZW51bXNcIjtcclxuY29uc3QgeyBjcm9zcywgZGlmZiwgbm9ybWFsaXplIH0gPSB2MztcclxuY29uc3QgbGluZWRCb3hJbmRpY2VzID0gbmV3IFVpbnQxNkFycmF5KFtcclxuICAgIDAsXHJcbiAgICAxLFxyXG4gICAgMSxcclxuICAgIDIsXHJcbiAgICAyLFxyXG4gICAgMyxcclxuICAgIDMsXHJcbiAgICAwLFxyXG4gICAgMCxcclxuICAgIDUsXHJcbiAgICA1LFxyXG4gICAgNCxcclxuICAgIDQsXHJcbiAgICAxLFxyXG4gICAgMSxcclxuICAgIDAsXHJcbiAgICAwLFxyXG4gICAgNCxcclxuICAgIDQsXHJcbiAgICA3LFxyXG4gICAgNyxcclxuICAgIDMsXHJcbiAgICAzLFxyXG4gICAgMCxcclxuICAgIDEsXHJcbiAgICAyLFxyXG4gICAgMixcclxuICAgIDYsXHJcbiAgICA2LFxyXG4gICAgNSxcclxuICAgIDUsXHJcbiAgICAxLFxyXG4gICAgNCxcclxuICAgIDUsXHJcbiAgICA1LFxyXG4gICAgNixcclxuICAgIDYsXHJcbiAgICA3LFxyXG4gICAgNyxcclxuICAgIDQsXHJcbiAgICAyLFxyXG4gICAgNyxcclxuICAgIDcsXHJcbiAgICAzLFxyXG4gICAgMyxcclxuICAgIDYsXHJcbiAgICA2LFxyXG4gICAgMiwgLy8gdG9wXHJcbl0pO1xyXG5jb25zdCBDVUJFX0ZBQ0VfSU5ESUNFUyA9IFtcclxuICAgIFszLCA3LCA1LCAxXSxcclxuICAgIFs2LCAyLCAwLCA0XSxcclxuICAgIFs2LCA3LCAzLCAyXSxcclxuICAgIFswLCAxLCA1LCA0XSxcclxuICAgIFs3LCA2LCA0LCA1XSxcclxuICAgIFsyLCAzLCAxLCAwXSwgLy8gYmFja1xyXG5dO1xyXG5mdW5jdGlvbiBjcmVhdGVCb3goX2EgPSAxLCBfYiA9IDEsIF9jID0gMSkge1xyXG4gICAgY29uc3QgYSA9IF9hIC8gMiwgYiA9IF9iIC8gMiwgYyA9IF9jIC8gMjtcclxuICAgIGNvbnN0IGNvcm5lclZlcnRpY2VzID0gW1xyXG4gICAgICAgIFstYSwgLWIsIC1jXSxcclxuICAgICAgICBbK2EsIC1iLCAtY10sXHJcbiAgICAgICAgWy1hLCArYiwgLWNdLFxyXG4gICAgICAgIFsrYSwgK2IsIC1jXSxcclxuICAgICAgICBbLWEsIC1iLCArY10sXHJcbiAgICAgICAgWythLCAtYiwgK2NdLFxyXG4gICAgICAgIFstYSwgK2IsICtjXSxcclxuICAgICAgICBbK2EsICtiLCArY10sXHJcbiAgICBdO1xyXG4gICAgY29uc3QgZmFjZU5vcm1hbHMgPSBbXHJcbiAgICAgICAgWysxLCArMCwgKzBdLFxyXG4gICAgICAgIFstMSwgKzAsICswXSxcclxuICAgICAgICBbKzAsICsxLCArMF0sXHJcbiAgICAgICAgWyswLCAtMSwgKzBdLFxyXG4gICAgICAgIFsrMCwgKzAsICsxXSxcclxuICAgICAgICBbKzAsICswLCAtMV0sXHJcbiAgICBdO1xyXG4gICAgY29uc3QgdXZDb29yZHMgPSBbXHJcbiAgICAgICAgWzEsIDBdLFxyXG4gICAgICAgIFswLCAwXSxcclxuICAgICAgICBbMCwgMV0sXHJcbiAgICAgICAgWzEsIDFdLFxyXG4gICAgXTtcclxuICAgIGNvbnN0IHBvc2l0aW9ucyA9IFtdO1xyXG4gICAgY29uc3Qgbm9ybWFscyA9IFtdO1xyXG4gICAgLy9jb25zdCB0ZXhDb29yZHMgPSB3ZWJnbFV0aWxzLmNyZWF0ZUF1Z21lbnRlZFR5cGVkQXJyYXkoMiAsIG51bVZlcnRpY2VzKTtcclxuICAgIGNvbnN0IGluZGljZXMgPSBbXTtcclxuICAgIGZvciAobGV0IGYgPSAwOyBmIDwgNjsgKytmKSB7XHJcbiAgICAgICAgY29uc3QgZmFjZUluZGljZXMgPSBDVUJFX0ZBQ0VfSU5ESUNFU1tmXTtcclxuICAgICAgICBmb3IgKGxldCB2ID0gMDsgdiA8IDQ7ICsrdikge1xyXG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IGNvcm5lclZlcnRpY2VzW2ZhY2VJbmRpY2VzW3ZdXTtcclxuICAgICAgICAgICAgY29uc3Qgbm9ybWFsID0gZmFjZU5vcm1hbHNbZl07XHJcbiAgICAgICAgICAgIHBvc2l0aW9ucy5wdXNoKC4uLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgbm9ybWFscy5wdXNoKC4uLm5vcm1hbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG9mZnNldCA9IDQgKiBmO1xyXG4gICAgICAgIGluZGljZXMucHVzaChvZmZzZXQgKyAwLCBvZmZzZXQgKyAxLCBvZmZzZXQgKyAyKTtcclxuICAgICAgICBpbmRpY2VzLnB1c2gob2Zmc2V0ICsgMCwgb2Zmc2V0ICsgMiwgb2Zmc2V0ICsgMyk7XHJcbiAgICB9XHJcbiAgICBjb25zdCB0ZXhjb29yZCA9IG5ldyBGbG9hdDMyQXJyYXkoW1xyXG4gICAgICAgIC8vIEZyb250XHJcbiAgICAgICAgMC4wLCAwLjAsIDEuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAxLjAsXHJcbiAgICAgICAgLy8gQmFja1xyXG4gICAgICAgIDAuMCwgMC4wLCAxLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMS4wLFxyXG4gICAgICAgIC8vIFRvcFxyXG4gICAgICAgIDAuMCwgMC4wLCAxLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMS4wLFxyXG4gICAgICAgIC8vIEJvdHRvbVxyXG4gICAgICAgIDAuMCwgMC4wLCAxLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMS4wLFxyXG4gICAgICAgIC8vIFJpZ2h0XHJcbiAgICAgICAgMC4wLCAwLjAsIDEuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAxLjAsXHJcbiAgICAgICAgLy8gTGVmdFxyXG4gICAgICAgIDAuMCwgMC4wLCAxLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMS4wLFxyXG4gICAgXSk7XHJcbiAgICBjb25zdCBfbm9ybWFscyA9IG5ldyBGbG9hdDMyQXJyYXkobm9ybWFscyk7XHJcbiAgICBjb25zdCBfcG9zaXRpb25zID0gbmV3IEZsb2F0MzJBcnJheShwb3NpdGlvbnMpO1xyXG4gICAgY29uc3QgX2luZGljZXMgPSBuZXcgVWludDE2QXJyYXkoaW5kaWNlcyk7XHJcbiAgICBjb25zdCBfdGV4Y29vcmRzID0gbmV3IEZsb2F0MzJBcnJheSh0ZXhjb29yZCk7XHJcbiAgICBjb25zdCBBcnJheURhdGEgPSB7XHJcbiAgICAgICAgYXR0cmlidXRlczoge1xyXG4gICAgICAgICAgICBOT1JNQUw6IHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IF9ub3JtYWxzLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IDYgKiA0ICogMyxcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAxLFxyXG4gICAgICAgICAgICAgICAgYnl0ZUxlbmd0aDogX25vcm1hbHMuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgIHN0cmlkZTogMCxcclxuICAgICAgICAgICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICAgICAgICAgIG51bUNvbXBvbmVudHM6IDMsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiA1MTI2LFxyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlVHlwZTogRkxPQVRfVkVDM1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBQT1NJVElPTjoge1xyXG4gICAgICAgICAgICAgICAgZGF0YTogX3Bvc2l0aW9ucyxcclxuICAgICAgICAgICAgICAgIGNvdW50OiA2ICogNCAqIDMsXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogMCxcclxuICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGg6IF9wb3NpdGlvbnMuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgIHN0cmlkZTogMCxcclxuICAgICAgICAgICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICAgICAgICAgIG51bUNvbXBvbmVudHM6IDMsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiA1MTI2LFxyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlVHlwZTogRkxPQVRfVkVDM1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBURVhDT09SRF8wOiB7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiBfdGV4Y29vcmRzLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IDQ4LFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNTEyNixcclxuICAgICAgICAgICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICAgICAgICAgIHN0cmlkZTogMCxcclxuICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGg6IF90ZXhjb29yZHMuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiA0LFxyXG4gICAgICAgICAgICAgICAgbnVtQ29tcG9uZW50czogMixcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGU6IEZMT0FUX1ZFQzJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluZGljZXM6IF9pbmRpY2VzLFxyXG4gICAgICAgIG51bUVsZW1lbnRzOiBfaW5kaWNlcy5sZW5ndGgsXHJcbiAgICAgICAgY29tcG9uZW50VHlwZTogNTEyMyxcclxuICAgICAgICBtb2RlOiA0LFxyXG4gICAgfTtcclxuICAgIHJldHVybiBBcnJheURhdGE7XHJcbiAgICAvKnJldHVybiB7XHJcbiAgICAgICAgICAgIGdsdGYgOiB7XHJcbiAgICAgICAgICAgICAgYWNjZXNzb3JzIDogW1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgYnVmZmVyVmlldyA6IDAsXHJcbiAgICAgICAgICAgICAgICAgIGJ5dGVPZmZzZXQgOiAwLFxyXG4gICAgICAgICAgICAgICAgICBjb3VudCA6NzIsXHJcbiAgICAgICAgICAgICAgICAgIGNvbXBvbmVudFR5cGUgOiA1MTI2LFxyXG4gICAgICAgICAgICAgICAgICB0eXBlIDogJ1ZFQzMnXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBidWZmZXJWaWV3IDogMSxcclxuICAgICAgICAgICAgICAgIGJ5dGVPZmZzZXQgOiAwLFxyXG4gICAgICAgICAgICAgICAgY291bnQgOiA3MixcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudFR5cGUgOiA1MTI2LFxyXG4gICAgICAgICAgICAgICAgdHlwZSA6ICdWRUMzJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyVmlldyA6IDIsXHJcbiAgICAgICAgICAgICAgICBieXRlT2Zmc2V0IDogMCxcclxuICAgICAgICAgICAgICAgIGNvdW50IDogMzYsXHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnRUeXBlIDogNTEyMyxcclxuICAgICAgICAgICAgICAgIHR5cGUgOiAnU0NBTEFSJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyVmlldyA6IDMsXHJcbiAgICAgICAgICAgICAgICBieXRlT2Zmc2V0IDogMCxcclxuICAgICAgICAgICAgICAgIGNvdW50IDogNDgsXHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnRUeXBlIDogNTEyNixcclxuICAgICAgICAgICAgICAgIHR5cGUgOiAnVkVDMidcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgYnVmZmVyVmlld3MgOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIGJ1ZmZlciA6IDAsXHJcbiAgICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGggOiBwb3NpdGlvbnMuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgICAgYnl0ZU9mZnNldCA6IDBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIGJ1ZmZlciA6IDEsXHJcbiAgICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGggOiBub3JtYWxzLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgIGJ5dGVPZmZzZXQgOiAwXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICBidWZmZXIgOiAyLFxyXG4gICAgICAgICAgICAgICAgICBieXRlTGVuZ3RoIDogaW5kaWNlcy5ieXRlTGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgICBieXRlT2Zmc2V0IDogMFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgYnVmZmVyIDogMyxcclxuICAgICAgICAgICAgICAgICAgYnl0ZUxlbmd0aCA6IHRleGNvb3JkLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgIGJ5dGVPZmZzZXQgOiAwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgbWVzaGVzIDogW1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWUgOiAnQ3ViZScsXHJcbiAgICAgICAgICAgICAgICBwcmltaXRpdmVzIDogW1xyXG4gICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlcyA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgIE5PUk1BTCA6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICBQT1NJVElPTiA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICBURVhDT09SRF8wIDogM1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kaWNlcyA6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZSA6IDRcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgbm9kZXMgOiBbXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZSA6IFwiQ3ViZVwiLFxyXG4gICAgICAgICAgICAgICAgbWVzaCA6IDAsXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbiA6IFsxXVxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZSA6ICdDdWJlMicsXHJcbiAgICAgICAgICAgICAgICBtZXNoIDogMCxcclxuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uIDogWzEsMSwxXVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGJpbmFyeUJ1ZmZlcnMgOiBbXHJcbiAgICAgICAgICAgIHBvc2l0aW9ucy5idWZmZXIsIG5vcm1hbHMuYnVmZmVyLCBpbmRpY2VzLmJ1ZmZlciwgdGV4Y29vcmQuYnVmZmVyXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfTsqL1xyXG59XHJcbmNvbnN0IGNyZWF0ZUNvbmUgPSAocmFkaXVzID0gMiwgaGVpZ2h0ID0gMiwgbnVtQ29ybmVycyA9IDQpID0+IHtcclxuICAgIGNvbnN0IHZlcnRpY2VzID0gWzAsIC1oZWlnaHQgLyAyLCAwXTtcclxuICAgIGNvbnN0IG5vcm1hbHMgPSBbXTtcclxuICAgIGNvbnN0IGluZGljZXMgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtQ29ybmVycyArIDE7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGFuZ2xlID0gKDIgKiBpICogTWF0aC5QSSkgLyBudW1Db3JuZXJzO1xyXG4gICAgICAgIGNvbnN0IHggPSBNYXRoLmNvcyhhbmdsZSkgKiByYWRpdXM7XHJcbiAgICAgICAgY29uc3QgeiA9IE1hdGguc2luKGFuZ2xlKSAqIHJhZGl1cztcclxuICAgICAgICBjb25zdCB5ID0gLWhlaWdodCAvIDI7XHJcbiAgICAgICAgdmVydGljZXMucHVzaCh4LCAtaGVpZ2h0IC8gMiwgeik7XHJcbiAgICAgICAgbm9ybWFscy5wdXNoKDAsIC0xLCAwKTtcclxuICAgIH1cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtQ29ybmVyczsgaSsrKSB7XHJcbiAgICAgICAgaW5kaWNlcy5wdXNoKDAsIGkgKyAxLCBpICsgMik7XHJcbiAgICB9XHJcbiAgICAvL3ZlcnRpY2VzLnB1c2godmVydGljZXNbMV0sIC1oZWlnaHQvMiwgdmVydGljZXNbM10pXHJcbiAgICBjb25zdCBuID0gdmVydGljZXMubGVuZ3RoIC8gMztcclxuICAgIGNvbnN0IHN0cmlkZSA9IDM7XHJcbiAgICBjb25zdCBzdGFydCA9IG47XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNvcm5lcnMgKyAyOyBpKyspIHtcclxuICAgICAgICBjb25zdCBhbmdsZSA9ICgyICogaSAqIE1hdGguUEkpIC8gbnVtQ29ybmVycztcclxuICAgICAgICBjb25zdCB4ID0gTWF0aC5jb3MoYW5nbGUpICogcmFkaXVzO1xyXG4gICAgICAgIGNvbnN0IHogPSBNYXRoLnNpbihhbmdsZSkgKiByYWRpdXM7XHJcbiAgICAgICAgY29uc3QgeSA9IC1oZWlnaHQgLyAyO1xyXG4gICAgICAgIGNvbnN0IGEgPSBbdmVydGljZXNbaSAqIDNdLCB2ZXJ0aWNlc1tpICogMyArIDFdLCB2ZXJ0aWNlc1tpICogMyArIDJdXTtcclxuICAgICAgICBjb25zdCBiID0gW3ZlcnRpY2VzW2kgKiAzICsgM10sIHZlcnRpY2VzW2kgKiAzICsgNF0sIHZlcnRpY2VzW2kgKiAzICsgNV1dO1xyXG4gICAgICAgIGNvbnN0IGMgPSBbMCwgaGVpZ2h0IC8gMiwgMF07XHJcbiAgICAgICAgaW5kaWNlcy5wdXNoKHN0YXJ0ICsgaSAqIHN0cmlkZSArIDIsIHN0YXJ0ICsgaSAqIHN0cmlkZSArIDEsIHN0YXJ0ICsgaSAqIHN0cmlkZSArIDMpO1xyXG4gICAgICAgIHZlcnRpY2VzLnB1c2goLi4uYywgLi4uYSwgLi4uYik7XHJcbiAgICAgICAgY29uc3Qgbm9ybWFsID0gbm9ybWFsaXplKGNyb3NzKGRpZmYoYiwgYyksIGRpZmYoYSwgYykpKTtcclxuICAgICAgICBub3JtYWxzLnB1c2goLi4ubm9ybWFsLCAuLi5ub3JtYWwsIC4uLm5vcm1hbCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBfbm9ybWFsID0gbmV3IEZsb2F0MzJBcnJheShub3JtYWxzKTtcclxuICAgIGNvbnN0IF9wb3NpdGlvbiA9IG5ldyBGbG9hdDMyQXJyYXkodmVydGljZXMpO1xyXG4gICAgY29uc3QgX2luZGljZXMgPSBuZXcgVWludDE2QXJyYXkoaW5kaWNlcyk7XHJcbiAgICBjb25zdCBBcnJheURhdGEgPSB7XHJcbiAgICAgICAgYXR0cmlidXRlczoge1xyXG4gICAgICAgICAgICBQT1NJVElPTjoge1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb246IDAsXHJcbiAgICAgICAgICAgICAgICBjb3VudDogdmVydGljZXMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAwLFxyXG4gICAgICAgICAgICAgICAgc3RyaWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgbnVtQ29tcG9uZW50czogMyxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDUxMjYsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBfcG9zaXRpb24sXHJcbiAgICAgICAgICAgICAgICBieXRlTGVuZ3RoOiBfcG9zaXRpb24uYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGU6IEZMT0FUX1ZFQzNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgTk9STUFMOiB7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogMSxcclxuICAgICAgICAgICAgICAgIGNvdW50OiBub3JtYWxzLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgIG51bUNvbXBvbmVudHM6IDMsXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IDAsXHJcbiAgICAgICAgICAgICAgICBzdHJpZGU6IDAsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiA1MTI2LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogX25vcm1hbCxcclxuICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGg6IF9ub3JtYWwuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGU6IEZMT0FUX1ZFQzNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBvbmVudFR5cGU6IDUxMjMsXHJcbiAgICAgICAgaW5kaWNlczogX2luZGljZXMsXHJcbiAgICAgICAgbnVtRWxlbWVudHM6IGluZGljZXMubGVuZ3RoLFxyXG4gICAgICAgIG1vZGU6IDQsXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEFycmF5RGF0YTtcclxufTtcclxuY29uc3QgY3JlYXRlQ2lyY2xlID0gKHJhZGl1cywgbnVtQ29ybmVycykgPT4ge1xyXG4gICAgY29uc3QgdmVydGljZXMgPSBbMCwgMCwgMF07XHJcbiAgICBjb25zdCBub3JtYWxzID0gW107XHJcbiAgICBjb25zdCBpbmRpY2VzID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNvcm5lcnMgKyAxOyBpKyspIHtcclxuICAgICAgICBjb25zdCBhbmdsZSA9ICgyICogaSAqIE1hdGguUEkpIC8gbnVtQ29ybmVycztcclxuICAgICAgICBjb25zdCB4ID0gTWF0aC5jb3MoYW5nbGUpICogcmFkaXVzO1xyXG4gICAgICAgIGNvbnN0IHogPSBNYXRoLnNpbihhbmdsZSkgKiByYWRpdXM7XHJcbiAgICAgICAgdmVydGljZXMucHVzaCh4LCAwLCB6KTtcclxuICAgICAgICBub3JtYWxzLnB1c2goMCwgMSwgMCk7XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNvcm5lcnM7IGkrKykge1xyXG4gICAgICAgIGluZGljZXMucHVzaCgwLCBpICsgMSwgaSArIDIpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgX25vcm1hbCA9IG5ldyBGbG9hdDMyQXJyYXkobm9ybWFscyk7XHJcbiAgICBjb25zdCBfcG9zaXRpb24gPSBuZXcgRmxvYXQzMkFycmF5KHZlcnRpY2VzKTtcclxuICAgIGNvbnN0IF9pbmRpY2VzID0gbmV3IFVpbnQxNkFycmF5KGluZGljZXMpO1xyXG4gICAgY29uc3QgQXJyYXlEYXRhID0ge1xyXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcclxuICAgICAgICAgICAgUE9TSVRJT046IHtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAwLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IHZlcnRpY2VzLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICAgICAgICAgIHN0cmlkZTogMCxcclxuICAgICAgICAgICAgICAgIG51bUNvbXBvbmVudHM6IDMsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiA1MTI2LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogX3Bvc2l0aW9uLFxyXG4gICAgICAgICAgICAgICAgYnl0ZUxlbmd0aDogX3Bvc2l0aW9uLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVUeXBlOiBGTE9BVF9WRUMzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIE5PUk1BTDoge1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb246IDEsXHJcbiAgICAgICAgICAgICAgICBjb3VudDogbm9ybWFscy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBudW1Db21wb25lbnRzOiAzLFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAwLFxyXG4gICAgICAgICAgICAgICAgc3RyaWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNTEyNixcclxuICAgICAgICAgICAgICAgIGRhdGE6IF9ub3JtYWwsXHJcbiAgICAgICAgICAgICAgICBieXRlTGVuZ3RoOiBfbm9ybWFsLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVUeXBlOiBGTE9BVF9WRUMzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wb25lbnRUeXBlOiA1MTIzLFxyXG4gICAgICAgIGluZGljZXM6IF9pbmRpY2VzLFxyXG4gICAgICAgIG51bUVsZW1lbnRzOiBpbmRpY2VzLmxlbmd0aCxcclxuICAgICAgICBtb2RlOiA0LFxyXG4gICAgfTtcclxuICAgIHJldHVybiBBcnJheURhdGE7XHJcbn07XHJcbmNvbnN0IGNyZWF0ZVNwaGVyZSA9IChyYWRpdXMsIHN1YmRpdmlzaW9uc0F4aXMsIHN1YmRpdmlzaW9uc0hlaWdodCwgb3B0X3N0YXJ0TGF0aXR1ZGVJblJhZGlhbnMsIG9wdF9lbmRMYXRpdHVkZUluUmFkaWFucywgb3B0X3N0YXJ0TG9uZ2l0dWRlSW5SYWRpYW5zLCBvcHRfZW5kTG9uZ2l0dWRlSW5SYWRpYW5zKSA9PiB7XHJcbiAgICBpZiAoc3ViZGl2aXNpb25zQXhpcyA8PSAwIHx8IHN1YmRpdmlzaW9uc0hlaWdodCA8PSAwKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic3ViZGl2aXNpb25BeGlzIGFuZCBzdWJkaXZpc2lvbkhlaWdodCBtdXN0IGJlID4gMFwiKTtcclxuICAgIH1cclxuICAgIG9wdF9zdGFydExhdGl0dWRlSW5SYWRpYW5zID0gb3B0X3N0YXJ0TGF0aXR1ZGVJblJhZGlhbnMgfHwgMDtcclxuICAgIG9wdF9lbmRMYXRpdHVkZUluUmFkaWFucyA9IG9wdF9lbmRMYXRpdHVkZUluUmFkaWFucyB8fCBNYXRoLlBJO1xyXG4gICAgb3B0X3N0YXJ0TG9uZ2l0dWRlSW5SYWRpYW5zID0gb3B0X3N0YXJ0TG9uZ2l0dWRlSW5SYWRpYW5zIHx8IDA7XHJcbiAgICBvcHRfZW5kTG9uZ2l0dWRlSW5SYWRpYW5zID0gb3B0X2VuZExvbmdpdHVkZUluUmFkaWFucyB8fCBNYXRoLlBJICogMjtcclxuICAgIGNvbnN0IGxhdFJhbmdlID0gb3B0X2VuZExhdGl0dWRlSW5SYWRpYW5zIC0gb3B0X3N0YXJ0TGF0aXR1ZGVJblJhZGlhbnM7XHJcbiAgICBjb25zdCBsb25nUmFuZ2UgPSBvcHRfZW5kTG9uZ2l0dWRlSW5SYWRpYW5zIC0gb3B0X3N0YXJ0TG9uZ2l0dWRlSW5SYWRpYW5zO1xyXG4gICAgY29uc3QgcG9zaXRpb25zID0gW107XHJcbiAgICBjb25zdCBub3JtYWxzID0gW107XHJcbiAgICBjb25zdCB0ZXhjb29yZHMgPSBbXTtcclxuICAgIGZvciAobGV0IHkgPSAwOyB5IDw9IHN1YmRpdmlzaW9uc0hlaWdodDsgeSsrKSB7XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPD0gc3ViZGl2aXNpb25zQXhpczsgeCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHUgPSB4IC8gc3ViZGl2aXNpb25zQXhpcztcclxuICAgICAgICAgICAgY29uc3QgdiA9IHkgLyBzdWJkaXZpc2lvbnNIZWlnaHQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoZXRhID0gbG9uZ1JhbmdlICogdSArIG9wdF9zdGFydExvbmdpdHVkZUluUmFkaWFucztcclxuICAgICAgICAgICAgY29uc3QgcGhpID0gbGF0UmFuZ2UgKiB2ICsgb3B0X3N0YXJ0TGF0aXR1ZGVJblJhZGlhbnM7XHJcbiAgICAgICAgICAgIGNvbnN0IHNpblRoZXRhID0gTWF0aC5zaW4odGhldGEpO1xyXG4gICAgICAgICAgICBjb25zdCBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKTtcclxuICAgICAgICAgICAgY29uc3Qgc2luUGhpID0gTWF0aC5zaW4ocGhpKTtcclxuICAgICAgICAgICAgY29uc3QgY29zUGhpID0gTWF0aC5jb3MocGhpKTtcclxuICAgICAgICAgICAgY29uc3QgdXggPSBjb3NUaGV0YSAqIHNpblBoaTtcclxuICAgICAgICAgICAgY29uc3QgdXkgPSBjb3NQaGk7XHJcbiAgICAgICAgICAgIGNvbnN0IHV6ID0gc2luVGhldGEgKiBzaW5QaGk7XHJcbiAgICAgICAgICAgIHBvc2l0aW9ucy5wdXNoKHJhZGl1cyAqIHV4LCByYWRpdXMgKiB1eSwgcmFkaXVzICogdXopO1xyXG4gICAgICAgICAgICBub3JtYWxzLnB1c2godXgsIHV5LCB1eik7XHJcbiAgICAgICAgICAgIHRleGNvb3Jkcy5wdXNoKDEgLSB1LCB2KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCBudW1WZXJ0c0Fyb3VuZCA9IHN1YmRpdmlzaW9uc0F4aXMgKyAxO1xyXG4gICAgY29uc3QgaW5kaWNlcyA9IFtdO1xyXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCBzdWJkaXZpc2lvbnNBeGlzOyB4KyspIHtcclxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHN1YmRpdmlzaW9uc0hlaWdodDsgeSsrKSB7XHJcbiAgICAgICAgICAgIGluZGljZXMucHVzaCgoeSArIDApICogbnVtVmVydHNBcm91bmQgKyB4LCAoeSArIDApICogbnVtVmVydHNBcm91bmQgKyB4ICsgMSwgKHkgKyAxKSAqIG51bVZlcnRzQXJvdW5kICsgeCk7XHJcbiAgICAgICAgICAgIGluZGljZXMucHVzaCgoeSArIDEpICogbnVtVmVydHNBcm91bmQgKyB4LCAoeSArIDApICogbnVtVmVydHNBcm91bmQgKyB4ICsgMSwgKHkgKyAxKSAqIG51bVZlcnRzQXJvdW5kICsgeCArIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IF9wb3NpdGlvbnMgPSBuZXcgRmxvYXQzMkFycmF5KHBvc2l0aW9ucyk7XHJcbiAgICBjb25zdCBfbm9ybWFscyA9IG5ldyBGbG9hdDMyQXJyYXkobm9ybWFscyk7XHJcbiAgICBjb25zdCBfdGV4Y29vcmRzID0gbmV3IEZsb2F0MzJBcnJheSh0ZXhjb29yZHMpO1xyXG4gICAgY29uc3QgX2luZGljZXMgPSBuZXcgVWludDE2QXJyYXkoaW5kaWNlcyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcclxuICAgICAgICAgICAgUE9TSVRJT046IHtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAwLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IHBvc2l0aW9ucy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IDAsXHJcbiAgICAgICAgICAgICAgICBzdHJpZGU6IDAsXHJcbiAgICAgICAgICAgICAgICBudW1Db21wb25lbnRzOiAzLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNTEyNixcclxuICAgICAgICAgICAgICAgIGRhdGE6IF9wb3NpdGlvbnMsXHJcbiAgICAgICAgICAgICAgICBieXRlTGVuZ3RoOiBfcG9zaXRpb25zLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVUeXBlOiBGTE9BVF9WRUMzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIE5PUk1BTDoge1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb246IDEsXHJcbiAgICAgICAgICAgICAgICBjb3VudDogbm9ybWFscy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBudW1Db21wb25lbnRzOiAzLFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAwLFxyXG4gICAgICAgICAgICAgICAgc3RyaWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNTEyNixcclxuICAgICAgICAgICAgICAgIGRhdGE6IF9ub3JtYWxzLFxyXG4gICAgICAgICAgICAgICAgYnl0ZUxlbmd0aDogX25vcm1hbHMuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGU6IEZMT0FUX1ZFQzNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgVEVYQ09PUkRfMDoge1xyXG4gICAgICAgICAgICAgICAgZGF0YTogX3RleGNvb3JkcyxcclxuICAgICAgICAgICAgICAgIGNvdW50OiBfdGV4Y29vcmRzLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDUxMjYsXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IDAsXHJcbiAgICAgICAgICAgICAgICBzdHJpZGU6IDAsXHJcbiAgICAgICAgICAgICAgICBieXRlTGVuZ3RoOiBfdGV4Y29vcmRzLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogNCxcclxuICAgICAgICAgICAgICAgIG51bUNvbXBvbmVudHM6IDIsXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVUeXBlOiBGTE9BVF9WRUMyXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wb25lbnRUeXBlOiA1MTIzLFxyXG4gICAgICAgIGluZGljZXM6IF9pbmRpY2VzLFxyXG4gICAgICAgIG51bUVsZW1lbnRzOiBpbmRpY2VzLmxlbmd0aCxcclxuICAgICAgICBtb2RlOiA0LFxyXG4gICAgfTtcclxufTtcclxuY29uc3QgY3JlYXRlVHJ1bmNhdGVkQ29uZSA9IChib3R0b21SYWRpdXMsIHRvcFJhZGl1cywgaGVpZ2h0LCByYWRpYWxTdWJkaXZpc2lvbnMsIHZlcnRpY2FsU3ViZGl2aXNpb25zLCBvcHRfdG9wQ2FwLCBvcHRfYm90dG9tQ2FwKSA9PiB7XHJcbiAgICBpZiAocmFkaWFsU3ViZGl2aXNpb25zIDwgMykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInJhZGlhbFN1YmRpdmlzaW9ucyBtdXN0IGJlIDMgb3IgZ3JlYXRlclwiKTtcclxuICAgIH1cclxuICAgIGlmICh2ZXJ0aWNhbFN1YmRpdmlzaW9ucyA8IDEpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ2ZXJ0aWNhbFN1YmRpdmlzaW9ucyBtdXN0IGJlIDEgb3IgZ3JlYXRlclwiKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHRvcENhcCA9IG9wdF90b3BDYXAgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBvcHRfdG9wQ2FwO1xyXG4gICAgY29uc3QgYm90dG9tQ2FwID0gb3B0X2JvdHRvbUNhcCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IG9wdF9ib3R0b21DYXA7XHJcbiAgICBjb25zdCBleHRyYSA9ICh0b3BDYXAgPyAyIDogMCkgKyAoYm90dG9tQ2FwID8gMiA6IDApO1xyXG4gICAgY29uc3QgbnVtVmVydGljZXMgPSAocmFkaWFsU3ViZGl2aXNpb25zICsgMSkgKiAodmVydGljYWxTdWJkaXZpc2lvbnMgKyAxICsgZXh0cmEpO1xyXG4gICAgY29uc3QgcG9zaXRpb25zID0gW107XHJcbiAgICBjb25zdCBub3JtYWxzID0gW107XHJcbiAgICBjb25zdCB0ZXhjb29yZHMgPSBbXTtcclxuICAgIGNvbnN0IGluZGljZXMgPSBbXTtcclxuICAgIGNvbnN0IHZlcnRzQXJvdW5kRWRnZSA9IHJhZGlhbFN1YmRpdmlzaW9ucyArIDE7XHJcbiAgICBjb25zdCBzbGFudCA9IE1hdGguYXRhbjIoYm90dG9tUmFkaXVzIC0gdG9wUmFkaXVzLCBoZWlnaHQpO1xyXG4gICAgY29uc3QgY29zU2xhbnQgPSBNYXRoLmNvcyhzbGFudCk7XHJcbiAgICBjb25zdCBzaW5TbGFudCA9IE1hdGguc2luKHNsYW50KTtcclxuICAgIGNvbnN0IHN0YXJ0ID0gdG9wQ2FwID8gLTIgOiAwO1xyXG4gICAgY29uc3QgZW5kID0gdmVydGljYWxTdWJkaXZpc2lvbnMgKyAoYm90dG9tQ2FwID8gMiA6IDApO1xyXG4gICAgZm9yIChsZXQgeXkgPSBzdGFydDsgeXkgPD0gZW5kOyArK3l5KSB7XHJcbiAgICAgICAgbGV0IHYgPSB5eSAvIHZlcnRpY2FsU3ViZGl2aXNpb25zO1xyXG4gICAgICAgIGxldCB5ID0gaGVpZ2h0ICogdjtcclxuICAgICAgICBsZXQgcmluZ1JhZGl1cztcclxuICAgICAgICBpZiAoeXkgPCAwKSB7XHJcbiAgICAgICAgICAgIHkgPSAwO1xyXG4gICAgICAgICAgICB2ID0gMTtcclxuICAgICAgICAgICAgcmluZ1JhZGl1cyA9IGJvdHRvbVJhZGl1cztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoeXkgPiB2ZXJ0aWNhbFN1YmRpdmlzaW9ucykge1xyXG4gICAgICAgICAgICB5ID0gaGVpZ2h0O1xyXG4gICAgICAgICAgICB2ID0gMTtcclxuICAgICAgICAgICAgcmluZ1JhZGl1cyA9IHRvcFJhZGl1cztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJpbmdSYWRpdXMgPVxyXG4gICAgICAgICAgICAgICAgYm90dG9tUmFkaXVzICsgKHRvcFJhZGl1cyAtIGJvdHRvbVJhZGl1cykgKiAoeXkgLyB2ZXJ0aWNhbFN1YmRpdmlzaW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh5eSA9PT0gLTIgfHwgeXkgPT09IHZlcnRpY2FsU3ViZGl2aXNpb25zICsgMikge1xyXG4gICAgICAgICAgICByaW5nUmFkaXVzID0gMDtcclxuICAgICAgICAgICAgdiA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHkgLT0gaGVpZ2h0IC8gMjtcclxuICAgICAgICBmb3IgKGxldCBpaSA9IDA7IGlpIDwgdmVydHNBcm91bmRFZGdlOyArK2lpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNpbiA9IE1hdGguc2luKChpaSAqIE1hdGguUEkgKiAyKSAvIHJhZGlhbFN1YmRpdmlzaW9ucyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvcyA9IE1hdGguY29zKChpaSAqIE1hdGguUEkgKiAyKSAvIHJhZGlhbFN1YmRpdmlzaW9ucyk7XHJcbiAgICAgICAgICAgIHBvc2l0aW9ucy5wdXNoKHNpbiAqIHJpbmdSYWRpdXMsIHksIGNvcyAqIHJpbmdSYWRpdXMpO1xyXG4gICAgICAgICAgICBpZiAoeXkgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBub3JtYWxzLnB1c2goMCwgLTEsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHl5ID4gdmVydGljYWxTdWJkaXZpc2lvbnMpIHtcclxuICAgICAgICAgICAgICAgIG5vcm1hbHMucHVzaCgwLCAxLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChyaW5nUmFkaXVzID09PSAwLjApIHtcclxuICAgICAgICAgICAgICAgIG5vcm1hbHMucHVzaCgwLCAwLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5vcm1hbHMucHVzaChzaW4gKiBjb3NTbGFudCwgc2luU2xhbnQsIGNvcyAqIGNvc1NsYW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0ZXhjb29yZHMucHVzaChpaSAvIHJhZGlhbFN1YmRpdmlzaW9ucywgMSAtIHYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZvciAobGV0IHl5ID0gMDsgeXkgPCB2ZXJ0aWNhbFN1YmRpdmlzaW9ucyArIGV4dHJhOyArK3l5KSB7XHJcbiAgICAgICAgaWYgKCh5eSA9PT0gMSAmJiB0b3BDYXApIHx8XHJcbiAgICAgICAgICAgICh5eSA9PT0gdmVydGljYWxTdWJkaXZpc2lvbnMgKyBleHRyYSAtIDIgJiYgYm90dG9tQ2FwKSkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaWkgPSAwOyBpaSA8IHJhZGlhbFN1YmRpdmlzaW9uczsgKytpaSkge1xyXG4gICAgICAgICAgICBpbmRpY2VzLnB1c2godmVydHNBcm91bmRFZGdlICogKHl5ICsgMCkgKyAwICsgaWksIHZlcnRzQXJvdW5kRWRnZSAqICh5eSArIDApICsgMSArIGlpLCB2ZXJ0c0Fyb3VuZEVkZ2UgKiAoeXkgKyAxKSArIDEgKyBpaSk7XHJcbiAgICAgICAgICAgIGluZGljZXMucHVzaCh2ZXJ0c0Fyb3VuZEVkZ2UgKiAoeXkgKyAwKSArIDAgKyBpaSwgdmVydHNBcm91bmRFZGdlICogKHl5ICsgMSkgKyAxICsgaWksIHZlcnRzQXJvdW5kRWRnZSAqICh5eSArIDEpICsgMCArIGlpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCBfcG9zaXRpb25zID0gbmV3IEZsb2F0MzJBcnJheShwb3NpdGlvbnMpO1xyXG4gICAgY29uc3QgX25vcm1hbHMgPSBuZXcgRmxvYXQzMkFycmF5KG5vcm1hbHMpO1xyXG4gICAgY29uc3QgX3RleGNvb3JkcyA9IG5ldyBGbG9hdDMyQXJyYXkodGV4Y29vcmRzKTtcclxuICAgIGNvbnN0IF9pbmRpY2VzID0gbmV3IFVpbnQxNkFycmF5KGluZGljZXMpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBhdHRyaWJ1dGVzOiB7XHJcbiAgICAgICAgICAgIFBPU0lUSU9OOiB7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogMCxcclxuICAgICAgICAgICAgICAgIGNvdW50OiBwb3NpdGlvbnMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAwLFxyXG4gICAgICAgICAgICAgICAgc3RyaWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgbnVtQ29tcG9uZW50czogMyxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDUxMjYsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBfcG9zaXRpb25zLFxyXG4gICAgICAgICAgICAgICAgYnl0ZUxlbmd0aDogX3Bvc2l0aW9ucy5ieXRlTGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlVHlwZTogRkxPQVRfVkVDM1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBOT1JNQUw6IHtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAxLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IG5vcm1hbHMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgbnVtQ29tcG9uZW50czogMyxcclxuICAgICAgICAgICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICAgICAgICAgIHN0cmlkZTogMCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDUxMjYsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBfbm9ybWFscyxcclxuICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGg6IF9ub3JtYWxzLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVUeXBlOiBGTE9BVF9WRUMzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFRFWENPT1JEXzA6IHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IF90ZXhjb29yZHMsXHJcbiAgICAgICAgICAgICAgICBjb3VudDogX3RleGNvb3Jkcy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiA1MTI2LFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAwLFxyXG4gICAgICAgICAgICAgICAgc3RyaWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgYnl0ZUxlbmd0aDogX3RleGNvb3Jkcy5ieXRlTGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgbG9jYXRpb246IDQsXHJcbiAgICAgICAgICAgICAgICBudW1Db21wb25lbnRzOiAyLFxyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlVHlwZTogRkxPQVRfVkVDMlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcG9uZW50VHlwZTogNTEyMyxcclxuICAgICAgICBpbmRpY2VzOiBfaW5kaWNlcyxcclxuICAgICAgICBudW1FbGVtZW50czogaW5kaWNlcy5sZW5ndGgsXHJcbiAgICAgICAgbW9kZTogNCxcclxuICAgIH07XHJcbn07XHJcbmV4cG9ydCB7IGNyZWF0ZUJveCwgY3JlYXRlQ29uZSwgY3JlYXRlQ2lyY2xlLCBjcmVhdGVTcGhlcmUsIGNyZWF0ZVRydW5jYXRlZENvbmUgfTtcclxuIiwiZnVuY3Rpb24gY3JlYXRlVW5pZm9ybVNldHRlcnMoZ2wsIHByb2dyYW0pIHtcclxuICAgIGNvbnN0IGNyZWF0ZVRleHR1cmVTZXR0ZXIgPSAocHJvZ3JhbSwgdW5pZm9ybUluZm8pID0+IHtcclxuICAgICAgICBjb25zdCBsb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCB1bmlmb3JtSW5mby5uYW1lKTtcclxuICAgICAgICByZXR1cm4gKHRleEJsb2NrTnVtKSA9PiB7XHJcbiAgICAgICAgICAgIGdsLnVuaWZvcm0xaShsb2NhdGlvbiwgdGV4QmxvY2tOdW0pO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgZnVuY3Rpb24gY3JlYXRlVW5pZm9ybVNldHRlcihwcm9ncmFtLCB1bmlmb3JtSW5mbykge1xyXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sIHVuaWZvcm1JbmZvLm5hbWUpO1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSB1bmlmb3JtSW5mby50eXBlO1xyXG4gICAgICAgIGNvbnN0IGlzQXJyYXkgPSB1bmlmb3JtSW5mby5zaXplID4gMSAmJiB1bmlmb3JtSW5mby5uYW1lLnN1YnN0cigtMykgPT09IFwiWzBdXCI7XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLkZMT0FUICYmIGlzQXJyYXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtMWZ2KGxvY2F0aW9uLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLkZMT0FUKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgZ2wudW5pZm9ybTFmKGxvY2F0aW9uLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLkZMT0FUX1ZFQzIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtMmZ2KGxvY2F0aW9uLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLkZMT0FUX1ZFQzMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtM2Z2KGxvY2F0aW9uLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLkZMT0FUX1ZFQzQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtNGZ2KGxvY2F0aW9uLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLklOVCAmJiBpc0FycmF5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgZ2wudW5pZm9ybTFpdihsb2NhdGlvbiwgdik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSBnbC5JTlQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtMWkobG9jYXRpb24sIHYpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gZ2wuSU5UX1ZFQzIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtMml2KGxvY2F0aW9uLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLklOVF9WRUMzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgZ2wudW5pZm9ybTNpdihsb2NhdGlvbiwgdik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSBnbC5JTlRfVkVDNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgICAgIGdsLnVuaWZvcm00aXYobG9jYXRpb24sIHYpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gZ2wuQk9PTCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgICAgIGdsLnVuaWZvcm0xaXYobG9jYXRpb24sIHYpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gZ2wuQk9PTF9WRUMyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgZ2wudW5pZm9ybTJpdihsb2NhdGlvbiwgdik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSBnbC5CT09MX1ZFQzMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtM2l2KGxvY2F0aW9uLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLkJPT0xfVkVDNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgICAgIGdsLnVuaWZvcm00aXYobG9jYXRpb24sIHYpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gZ2wuRkxPQVRfTUFUMikge1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgICAgIGdsLnVuaWZvcm1NYXRyaXgyZnYobG9jYXRpb24sIGZhbHNlLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLkZMT0FUX01BVDMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtTWF0cml4M2Z2KGxvY2F0aW9uLCBmYWxzZSwgdik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSBnbC5GTE9BVF9NQVQ0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgZ2wudW5pZm9ybU1hdHJpeDRmdihsb2NhdGlvbiwgZmFsc2UsIHYpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IHVuaWZvcm1TZXR0ZXJzID0ge307XHJcbiAgICBjb25zdCB0ZXh0dXJlU2V0dGVycyA9IHt9O1xyXG4gICAgY29uc3QgbnVtVW5pZm9ybXMgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLkFDVElWRV9VTklGT1JNUyk7XHJcbiAgICBmb3IgKGxldCBpaSA9IDA7IGlpIDwgbnVtVW5pZm9ybXM7ICsraWkpIHtcclxuICAgICAgICBjb25zdCB1bmlmb3JtSW5mbyA9IGdsLmdldEFjdGl2ZVVuaWZvcm0ocHJvZ3JhbSwgaWkpO1xyXG4gICAgICAgIGlmICghdW5pZm9ybUluZm8pIHtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBuYW1lID0gdW5pZm9ybUluZm8ubmFtZTtcclxuICAgICAgICBpZiAodW5pZm9ybUluZm8udHlwZSA9PT0gZ2wuU0FNUExFUl8yRCkge1xyXG4gICAgICAgICAgICB0ZXh0dXJlU2V0dGVyc1tuYW1lXSA9IGNyZWF0ZVRleHR1cmVTZXR0ZXIocHJvZ3JhbSwgdW5pZm9ybUluZm8pO1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5hbWUuc3Vic3RyKC0zKSA9PT0gXCJbMF1cIikge1xyXG4gICAgICAgICAgICBuYW1lID0gbmFtZS5zdWJzdHIoMCwgbmFtZS5sZW5ndGggLSAzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVuaWZvcm1JbmZvLnNpemUgPiAxKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdW5pZm9ybUluZm8uc2l6ZTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvYmogPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2l6ZTogdW5pZm9ybUluZm8uc2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiB1bmlmb3JtSW5mby50eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUgKyBgWyR7aX1dYCxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB1bmlmb3JtU2V0dGVyc1tuYW1lICsgYFske2l9XWBdID0gY3JlYXRlVW5pZm9ybVNldHRlcihwcm9ncmFtLCBvYmopO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBzZXR0ZXIgPSBjcmVhdGVVbmlmb3JtU2V0dGVyKHByb2dyYW0sIHVuaWZvcm1JbmZvKTtcclxuICAgICAgICAgICAgdW5pZm9ybVNldHRlcnNbbmFtZV0gPSBzZXR0ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHsgdW5pZm9ybVNldHRlcnMsIHRleHR1cmVTZXR0ZXJzIH07XHJcbn1cclxuY2xhc3MgUHJvZ3JhbUluZm8ge1xyXG4gICAgY29uc3RydWN0b3IoZ2xXcmFwcGVyLCB2ZXJ0ZXhTaGFkZXJTb3VyY2UsIGZyYWdtZW50U2hhZGVyU291cmNlKSB7XHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhTaGFkZXJTb3VyY2UgPSB2ZXJ0ZXhTaGFkZXJTb3VyY2U7XHJcbiAgICAgICAgdGhpcy5mcmFnbWVudFNoYWRlclNvdXJjZSA9IGZyYWdtZW50U2hhZGVyU291cmNlO1xyXG4gICAgICAgIHRoaXMudW5pZm9ybVNldHRlcnMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudGV4dHVyZVNldHRlcnMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudmVydGV4U2hhZGVyID0gbnVsbDtcclxuICAgICAgICB0aGlzLmZyYWdtZW50U2hhZGVyID0gbnVsbDtcclxuICAgICAgICB0aGlzLnByb2dyYW0gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZ2xXcmFwcGVyID0gZ2xXcmFwcGVyO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlVW5pZm9ybVNldHRlcnMoKSB7XHJcbiAgICAgICAgY29uc3QgeyBnbFdyYXBwZXIsIHByb2dyYW0gfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgeyBnbCB9ID0gZ2xXcmFwcGVyO1xyXG4gICAgICAgIGNvbnN0IHsgdW5pZm9ybVNldHRlcnMsIHRleHR1cmVTZXR0ZXJzIH0gPSBjcmVhdGVVbmlmb3JtU2V0dGVycyhnbCwgcHJvZ3JhbSk7XHJcbiAgICAgICAgdGhpcy50ZXh0dXJlU2V0dGVycyA9IHRleHR1cmVTZXR0ZXJzO1xyXG4gICAgICAgIHRoaXMudW5pZm9ybVNldHRlcnMgPSB1bmlmb3JtU2V0dGVycztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGNvbXBpbGVTaGFkZXJzKCkge1xyXG4gICAgICAgIGNvbnN0IHsgZ2xXcmFwcGVyLCBmcmFnbWVudFNoYWRlclNvdXJjZSwgdmVydGV4U2hhZGVyU291cmNlIH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IHsgZ2wgfSA9IGdsV3JhcHBlcjtcclxuICAgICAgICB0aGlzLnZlcnRleFNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcihnbC5WRVJURVhfU0hBREVSKTtcclxuICAgICAgICBnbC5zaGFkZXJTb3VyY2UodGhpcy52ZXJ0ZXhTaGFkZXIsIHZlcnRleFNoYWRlclNvdXJjZSk7XHJcbiAgICAgICAgZ2wuY29tcGlsZVNoYWRlcih0aGlzLnZlcnRleFNoYWRlcik7XHJcbiAgICAgICAgaWYgKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIodGhpcy52ZXJ0ZXhTaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZ2wuZ2V0U2hhZGVySW5mb0xvZyh0aGlzLnZlcnRleFNoYWRlcikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZyYWdtZW50U2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKGdsLkZSQUdNRU5UX1NIQURFUik7XHJcbiAgICAgICAgZ2wuc2hhZGVyU291cmNlKHRoaXMuZnJhZ21lbnRTaGFkZXIsIGZyYWdtZW50U2hhZGVyU291cmNlKTtcclxuICAgICAgICBnbC5jb21waWxlU2hhZGVyKHRoaXMuZnJhZ21lbnRTaGFkZXIpO1xyXG4gICAgICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHRoaXMuZnJhZ21lbnRTaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZ2wuZ2V0U2hhZGVySW5mb0xvZyh0aGlzLmZyYWdtZW50U2hhZGVyKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucHJvZ3JhbSA9IGdsLmNyZWF0ZVByb2dyYW0oKTtcclxuICAgICAgICBnbC5hdHRhY2hTaGFkZXIodGhpcy5wcm9ncmFtLCB0aGlzLnZlcnRleFNoYWRlcik7XHJcbiAgICAgICAgZ2wuYXR0YWNoU2hhZGVyKHRoaXMucHJvZ3JhbSwgdGhpcy5mcmFnbWVudFNoYWRlcik7XHJcbiAgICAgICAgZ2wubGlua1Byb2dyYW0odGhpcy5wcm9ncmFtKTtcclxuICAgICAgICBpZiAoIWdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5wcm9ncmFtLCBnbC5MSU5LX1NUQVRVUykpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGdsLmdldFByb2dyYW1JbmZvTG9nKHRoaXMucHJvZ3JhbSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNldFVuaWZvcm1zKHVuaWZvcm1zKSB7XHJcbiAgICAgICAgY29uc3QgeyB1bmlmb3JtU2V0dGVycywgZ2xXcmFwcGVyIH0gPSB0aGlzO1xyXG4gICAgICAgIGdsV3JhcHBlci51c2VQcm9ncmFtSW5mbyh0aGlzKTtcclxuICAgICAgICBPYmplY3Qua2V5cyh1bmlmb3JtcykuZm9yRWFjaCgobmFtZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzZXR0ZXIgPSB1bmlmb3JtU2V0dGVyc1tuYW1lXTtcclxuICAgICAgICAgICAgaWYgKHNldHRlcilcclxuICAgICAgICAgICAgICAgIHNldHRlcih1bmlmb3Jtc1tuYW1lXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBzZXRUZXh0dXJlVW5pZm9ybVVuaXQobmFtZSwgdW5pdCkge1xyXG4gICAgICAgIGNvbnN0IHsgdGV4dHVyZVNldHRlcnMsIGdsV3JhcHBlciB9ID0gdGhpcztcclxuICAgICAgICBnbFdyYXBwZXIudXNlUHJvZ3JhbUluZm8odGhpcyk7XHJcbiAgICAgICAgY29uc3Qgc2V0dGVyID0gdGV4dHVyZVNldHRlcnNbbmFtZV07XHJcbiAgICAgICAgaWYgKHNldHRlcilcclxuICAgICAgICAgICAgc2V0dGVyKHVuaXQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7IFByb2dyYW1JbmZvIH07XHJcbiIsIi8qY29uc3Qgc2V0Q2FudmFzU2l6ZSA9IChjdHgsIHdpZHRoLCBoZWlnaHQpID0+IHtcclxuICBjdHguY2FudmFzLndpZHRoID0gd2lkdGg7XHJcbiAgY3R4LmNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbn07XHJcblxyXG5jb25zdCBtYWtlVGV4dHVyZSA9IChnbCwgY3R4KSA9PiB7XHJcbiAgY29uc3QgdGV4ID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xyXG4gIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleCk7XHJcblxyXG4gIGdsLnRleEltYWdlMkQoXHJcbiAgICBnbC5URVhUVVJFXzJELFxyXG4gICAgMCxcclxuICAgIGdsLlJHQkEsXHJcbiAgICBnbC5SR0JBLFxyXG4gICAgZ2wuVU5TSUdORURfQllURSxcclxuICAgIGN0eC5jYW52YXNcclxuICApO1xyXG4gIHJldHVybiB0ZXg7XHJcbn07XHJcblxyXG5jb25zdCBtYWtlU3RyaXBlVGV4dHVyZSA9IChnbCwgb3B0aW9ucykgPT4ge1xyXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gIHZhciB3aWR0aCA9IG9wdGlvbnMud2lkdGggfHwgNDtcclxuICB2YXIgaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQgfHwgNDtcclxuICB2YXIgY29sb3IxID0gb3B0aW9ucy5jb2xvcjEgfHwgXCJyZ2JhKDEsMCwwLDAuMSlcIjtcclxuICB2YXIgY29sb3IyID0gb3B0aW9ucy5jb2xvcjIgfHwgXCJyZ2JhKDEsMSwxLDAuNSlcIjtcclxuICBjb25zdCBjdHggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLmdldENvbnRleHQoXCIyZFwiKTtcclxuICBzZXRDYW52YXNTaXplKGN0eCwgd2lkdGgsIGhlaWdodCk7XHJcblxyXG4gIGN0eC5maWxsU3R5bGUgPSBjb2xvcjE7XHJcbiAgY3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gIGN0eC5maWxsU3R5bGUgPSBjb2xvcjI7XHJcbiAgY3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQgLyAyKTtcclxuXHJcbiAgcmV0dXJuIG1ha2VUZXh0dXJlKGdsLCBjdHgpO1xyXG59O1xyXG5cclxuY29uc3QgbWFrZVN0cmlwZUltZyA9IChvcHRpb25zKSA9PiB7XHJcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgdmFyIHdpZHRoID0gb3B0aW9ucy53aWR0aCB8fCA0O1xyXG4gIHZhciBoZWlnaHQgPSBvcHRpb25zLmhlaWdodCB8fCA0O1xyXG4gIHZhciBjb2xvcjEgPSBvcHRpb25zLmNvbG9yMSB8fCBcInJnYmEoMSwwLDAsMC41KVwiO1xyXG4gIHZhciBjb2xvcjIgPSBvcHRpb25zLmNvbG9yMiB8fCBcInJnYmEoMCwwLDEsMSlcIjtcclxuICBjb25zdCBjdHggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLmdldENvbnRleHQoXCIyZFwiKTtcclxuICBzZXRDYW52YXNTaXplKGN0eCwgd2lkdGgsIGhlaWdodCk7XHJcblxyXG4gIGN0eC5maWxsU3R5bGUgPSBjb2xvcjE7XHJcbiAgY3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gIGN0eC5maWxsU3R5bGUgPSBjb2xvcjI7XHJcbiAgY3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQgLyAyKTtcclxuXHJcbiAgcmV0dXJuIGN0eC5jYW52YXM7XHJcbn07XHJcblxyXG5jb25zdCBtYWtlSW1nRnJvbVN2Z1htbCA9ICh4bWwsIG9wdGlvbnMgPSB7fSkgPT4ge1xyXG4gIGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcbiAgdmFyIHN2ZzY0ID0gYnRvYSh4bWwpO1xyXG4gIHZhciBiNjRTdGFydCA9IFwiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxcIjtcclxuICB2YXIgaW1hZ2U2NCA9IGI2NFN0YXJ0ICsgc3ZnNjQ7XHJcbiAgaW1nLnNyYyA9IGltYWdlNjQ7XHJcblxyXG4gIGNvbnN0IHdpZHRoID0gb3B0aW9ucy53aWR0aCB8fCAxMDA7XHJcbiAgY29uc3QgaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQgfHwgMTAwO1xyXG4gIGNvbnN0IHggPSBvcHRpb25zLnggfHwgMTtcclxuICBjb25zdCB5ID0gb3B0aW9ucy55IHx8IDUwO1xyXG5cclxuICBjb25zdCBjdHggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLmdldENvbnRleHQoXCIyZFwiKTtcclxuICBzZXRDYW52YXNTaXplKGN0eCwgd2lkdGgsIGhlaWdodCk7XHJcblxyXG4gIGN0eC5kcmF3SW1hZ2UoaW1nLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcclxuICBjdHguZmlsbFN0eWxlID0gXCJyZ2JhKDAsMCwwLDEpXCI7XHJcbiAgY3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gIHJldHVybiBjdHguaW1nO1xyXG59O1xyXG4qL1xyXG5jb25zdCByZXF1ZXN0Q09SU0lmTm90U2FtZU9yaWdpbiA9IChpbWcsIHVybCkgPT4ge1xyXG4gICAgaWYgKG5ldyBVUkwodXJsLCB3aW5kb3cubG9jYXRpb24uaHJlZikub3JpZ2luICE9PSB3aW5kb3cubG9jYXRpb24ub3JpZ2luKSB7XHJcbiAgICAgICAgaW1nLmNyb3NzT3JpZ2luID0gXCJcIjtcclxuICAgIH1cclxufTtcclxuY2xhc3MgVGV4dHVyZUluZm8ge1xyXG4gICAgY29uc3RydWN0b3IoZ2wpIHtcclxuICAgICAgICB0aGlzLndpZHRoID0gbnVsbDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5nbCA9IGdsO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlVGV4dHVyZUZyb21VUkwodXJsKSB7XHJcbiAgICAgICAgY29uc3QgeyBnbCB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCB0ZXh0dXJlID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xyXG4gICAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleHR1cmUpO1xyXG4gICAgICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuUkdCQSwgMSwgMSwgMCwgZ2wuUkdCQSwgZ2wuVU5TSUdORURfQllURSwgbmV3IFVpbnQ4QXJyYXkoWzAsIDAsIDI1NSwgMjU1XSkpO1xyXG4gICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIGltZy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSBpbWcud2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gaW1nLmhlaWdodDtcclxuICAgICAgICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZSk7XHJcbiAgICAgICAgICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuUkdCQSwgZ2wuUkdCQSwgZ2wuVU5TSUdORURfQllURSwgaW1nKTtcclxuICAgICAgICAgICAgZ2wuZ2VuZXJhdGVNaXBtYXAoZ2wuVEVYVFVSRV8yRCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmVxdWVzdENPUlNJZk5vdFNhbWVPcmlnaW4oaW1nLCB1cmwpO1xyXG4gICAgICAgIGltZy5zcmMgPSB1cmw7XHJcbiAgICAgICAgdGhpcy50ZXh0dXJlID0gdGV4dHVyZTtcclxuICAgICAgICByZXR1cm4gdGV4dHVyZTtcclxuICAgIH1cclxuICAgIHNldFRleHR1cmVVbml0KHVuaXROdW0pIHtcclxuICAgICAgICBjb25zdCB7IGdsLCB0ZXh0dXJlIH0gPSB0aGlzO1xyXG4gICAgICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTAgKyB1bml0TnVtKTtcclxuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0ZXh0dXJlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG5leHBvcnQgeyBUZXh0dXJlSW5mbyB9O1xyXG4iLCJjb25zdCBwcm9wcyA9IHtcclxuICAgIG1hdDQ6IHtcclxuICAgICAgICBzdHJpZGU6IDY0LFxyXG4gICAgICAgIGJ5dGVMZW5ndGg6IDY0LFxyXG4gICAgICAgIHR5cGU6IDB4MTQwNixcclxuICAgICAgICBudW1BdHRyaWJ1dGVzOiA0LFxyXG4gICAgICAgIG51bUNvbXBvbmVudHM6IDQsXHJcbiAgICB9LFxyXG4gICAgdmVjMzoge1xyXG4gICAgICAgIG51bUNvbXBvbmVudHM6IDMsXHJcbiAgICAgICAgdHlwZTogMHgxNDA2LFxyXG4gICAgICAgIG51bUF0dHJpYnV0ZXM6IDEsXHJcbiAgICB9LFxyXG59O1xyXG5jb25zdCBnZXRBdHRyaWJ1dGVQcm9wc0J5VHlwZSA9ICh0eXBlKSA9PiBwcm9wc1t0eXBlXTtcclxuZXhwb3J0IGRlZmF1bHQgZ2V0QXR0cmlidXRlUHJvcHNCeVR5cGU7XHJcbiIsImNvbnN0IFRZUEVEX0FSUkFZUyA9IHtcclxuICAgIDUxMjA6IEludDhBcnJheSxcclxuICAgIDUxMjE6IFVpbnQ4QXJyYXksXHJcbiAgICA1MTIyOiBJbnQxNkFycmF5LFxyXG4gICAgNTEyMzogVWludDE2QXJyYXksXHJcbiAgICA1MTI0OiBJbnQzMkFycmF5LFxyXG4gICAgNTEyNTogVWludDMyQXJyYXksXHJcbiAgICA1MTI2OiBGbG9hdDMyQXJyYXksXHJcbn07XHJcbmNvbnN0IE5VTV9DT01QT05FTlRTID0ge1xyXG4gICAgU0NBTEFSOiAxLFxyXG4gICAgVkVDMjogMixcclxuICAgIFZFQzM6IDMsXHJcbiAgICBWRUM0OiA0LFxyXG4gICAgTUFUMjogNCxcclxuICAgIE1BVDM6IDksXHJcbiAgICBNQVQ0OiAxNixcclxufTtcclxuY29uc3QgTE9DQVRJT05TID0ge1xyXG4gICAgUE9TSVRJT046IDAsXHJcbiAgICBOT1JNQUw6IDEsXHJcbiAgICBXRUlHSFRTXzA6IDIsXHJcbiAgICBKT0lOVFNfMDogMyxcclxuICAgIFRFWENPT1JEXzA6IDQsXHJcbn07XHJcbmNvbnN0IEVMRU1FTlRfU0laRSA9IHtcclxuICAgIDB4MTQwNjogNCxcclxufTtcclxuY29uc3QgVEVYVFVSRTAgPSAweDg0YzA7XHJcbmNvbnN0IERZTkFNSUNfRFJBVyA9IDB4ODhlODtcclxuY29uc3QgQVJSQVlfQlVGRkVSID0gMHg4ODkyO1xyXG5jb25zdCBFTEVNRU5UX0FSUkFZX0JVRkZFUiA9IDB4ODg5MztcclxuY29uc3QgVU5JRk9STV9CVUZGRVIgPSAweDhhMTE7XHJcbmNvbnN0IFRSQU5TRk9STV9GRUVEQkFDS19CVUZGRVIgPSAweDhjOGU7XHJcbmNvbnN0IFRSQU5TRk9STV9GRUVEQkFDSyA9IDB4OGUyMjtcclxuY29uc3QgQ09NUElMRV9TVEFUVVMgPSAweDhiODE7XHJcbmNvbnN0IExJTktfU1RBVFVTID0gMHg4YjgyO1xyXG5jb25zdCBGUkFHTUVOVF9TSEFERVIgPSAweDhiMzA7XHJcbmNvbnN0IFZFUlRFWF9TSEFERVIgPSAweDhiMzE7XHJcbmNvbnN0IFNFUEFSQVRFX0FUVFJJQlMgPSAweDhjOGQ7XHJcbmNvbnN0IEFDVElWRV9VTklGT1JNUyA9IDB4OGI4NjtcclxuY29uc3QgQUNUSVZFX0FUVFJJQlVURVMgPSAweDhiODk7XHJcbmNvbnN0IFRSQU5TRk9STV9GRUVEQkFDS19WQVJZSU5HUyA9IDB4OGM4MztcclxuY29uc3QgQUNUSVZFX1VOSUZPUk1fQkxPQ0tTID0gMHg4YTM2O1xyXG5jb25zdCBVTklGT1JNX0JMT0NLX1JFRkVSRU5DRURfQllfVkVSVEVYX1NIQURFUiA9IDB4OGE0NDtcclxuY29uc3QgVU5JRk9STV9CTE9DS19SRUZFUkVOQ0VEX0JZX0ZSQUdNRU5UX1NIQURFUiA9IDB4OGE0NjtcclxuY29uc3QgVU5JRk9STV9CTE9DS19EQVRBX1NJWkUgPSAweDhhNDA7XHJcbmNvbnN0IFVOSUZPUk1fQkxPQ0tfQUNUSVZFX1VOSUZPUk1fSU5ESUNFUyA9IDB4OGE0MztcclxuY29uc3QgRkxPQVQgPSAweDE0MDY7XHJcbmNvbnN0IEZMT0FUX1ZFQzIgPSAweDhiNTA7XHJcbmNvbnN0IEZMT0FUX1ZFQzMgPSAweDhiNTE7XHJcbmNvbnN0IEZMT0FUX1ZFQzQgPSAweDhiNTI7XHJcbmNvbnN0IElOVCA9IDB4MTQwNDtcclxuY29uc3QgSU5UX1ZFQzIgPSAweDhiNTM7XHJcbmNvbnN0IElOVF9WRUMzID0gMHg4YjU0O1xyXG5jb25zdCBJTlRfVkVDNCA9IDB4OGI1NTtcclxuY29uc3QgQk9PTCA9IDB4OGI1NjtcclxuY29uc3QgQk9PTF9WRUMyID0gMHg4YjU3O1xyXG5jb25zdCBCT09MX1ZFQzMgPSAweDhiNTg7XHJcbmNvbnN0IEJPT0xfVkVDNCA9IDB4OGI1OTtcclxuY29uc3QgRkxPQVRfTUFUMiA9IDB4OGI1YTtcclxuY29uc3QgRkxPQVRfTUFUMyA9IDB4OGI1YjtcclxuY29uc3QgRkxPQVRfTUFUNCA9IDB4OGI1YztcclxuY29uc3QgU0FNUExFUl8yRCA9IDB4OGI1ZTtcclxuY29uc3QgU0FNUExFUl9DVUJFID0gMHg4YjYwO1xyXG5jb25zdCBTQU1QTEVSXzNEID0gMHg4YjVmO1xyXG5jb25zdCBTQU1QTEVSXzJEX1NIQURPVyA9IDB4OGI2MjtcclxuY29uc3QgRkxPQVRfTUFUMngzID0gMHg4YjY1O1xyXG5jb25zdCBGTE9BVF9NQVQyeDQgPSAweDhiNjY7XHJcbmNvbnN0IEZMT0FUX01BVDN4MiA9IDB4OGI2NztcclxuY29uc3QgRkxPQVRfTUFUM3g0ID0gMHg4YjY4O1xyXG5jb25zdCBGTE9BVF9NQVQ0eDIgPSAweDhiNjk7XHJcbmNvbnN0IEZMT0FUX01BVDR4MyA9IDB4OGI2YTtcclxuY29uc3QgU0FNUExFUl8yRF9BUlJBWSA9IDB4OGRjMTtcclxuY29uc3QgU0FNUExFUl8yRF9BUlJBWV9TSEFET1cgPSAweDhkYzQ7XHJcbmNvbnN0IFNBTVBMRVJfQ1VCRV9TSEFET1cgPSAweDhkYzU7XHJcbmNvbnN0IFVOU0lHTkVEX0lOVCA9IDB4MTQwNTtcclxuY29uc3QgVU5TSUdORURfSU5UX1ZFQzIgPSAweDhkYzY7XHJcbmNvbnN0IFVOU0lHTkVEX0lOVF9WRUMzID0gMHg4ZGM3O1xyXG5jb25zdCBVTlNJR05FRF9JTlRfVkVDNCA9IDB4OGRjODtcclxuY29uc3QgSU5UX1NBTVBMRVJfMkQgPSAweDhkY2E7XHJcbmNvbnN0IElOVF9TQU1QTEVSXzNEID0gMHg4ZGNiO1xyXG5jb25zdCBJTlRfU0FNUExFUl9DVUJFID0gMHg4ZGNjO1xyXG5jb25zdCBJTlRfU0FNUExFUl8yRF9BUlJBWSA9IDB4OGRjZjtcclxuY29uc3QgVU5TSUdORURfSU5UX1NBTVBMRVJfMkQgPSAweDhkZDI7XHJcbmNvbnN0IFVOU0lHTkVEX0lOVF9TQU1QTEVSXzNEID0gMHg4ZGQzO1xyXG5jb25zdCBVTlNJR05FRF9JTlRfU0FNUExFUl9DVUJFID0gMHg4ZGQ0O1xyXG5jb25zdCBVTlNJR05FRF9JTlRfU0FNUExFUl8yRF9BUlJBWSA9IDB4OGRkNztcclxuY29uc3QgVEVYVFVSRV8yRCA9IDB4MGRlMTtcclxuY29uc3QgVEVYVFVSRV9DVUJFX01BUCA9IDB4ODUxMztcclxuY29uc3QgVEVYVFVSRV8zRCA9IDB4ODA2ZjtcclxuY29uc3QgVEVYVFVSRV8yRF9BUlJBWSA9IDB4OGMxYTtcclxuZXhwb3J0IHsgTE9DQVRJT05TLCBOVU1fQ09NUE9ORU5UUywgVFlQRURfQVJSQVlTLCBFTEVNRU5UX1NJWkUsIEZMT0FULCBGTE9BVF9NQVQyLCBGTE9BVF9NQVQyeDMsIEZMT0FUX01BVDQsIEZMT0FUX01BVDJ4NCwgVU5TSUdORURfSU5ULCBGTE9BVF9NQVQzLCBVTlNJR05FRF9JTlRfVkVDMiwgVU5TSUdORURfSU5UX1ZFQzMsIFVOU0lHTkVEX0lOVF9WRUM0LCBGTE9BVF9WRUMyLCBGTE9BVF9WRUMzLCBGTE9BVF9WRUM0LCBJTlQsIElOVF9WRUMyLCBJTlRfVkVDMywgSU5UX1ZFQzQsIEJPT0wsIEJPT0xfVkVDMiwgQk9PTF9WRUMzLCBCT09MX1ZFQzQgfTtcclxuIiwiaW1wb3J0IHsgUHJpbWl0aXZlUmVuZGVySW5mb0Zyb21BcnJheURhdGEsIEFycmF5RGF0YUZyb21HbHRmLCBFbnRpdHlEYXRhRnJvbUdsdGYsIEdMVEYsIH0gZnJvbSBcIi4vY29tcG9uZW50cy9HbHRmVXRpbHNcIjtcclxuaW1wb3J0IHsgTWVzaFJlbmRlcmVyLCBTa2lubmVkTWVzaFJlbmRlcmVyIH0gZnJvbSBcIi4vY29tcG9uZW50cy9NZXNoUmVuZGVyZXJcIjtcclxuaW1wb3J0IHsgY3JlYXRlQm94LCBjcmVhdGVDb25lLCBjcmVhdGVDaXJjbGUsIGNyZWF0ZVNwaGVyZSwgY3JlYXRlVHJ1bmNhdGVkQ29uZSB9IGZyb20gXCIuL2NvbXBvbmVudHMvUHJpbWl0aXZlc1wiO1xyXG5pbXBvcnQgUHJpbWl0aXZlUmVuZGVyZXIgZnJvbSBcIi4vY29tcG9uZW50cy9QcmltaXRpdmVSZW5kZXJlclwiO1xyXG5pbXBvcnQgeyBQcm9ncmFtSW5mbywgfSBmcm9tIFwiLi9jb21wb25lbnRzL1Byb2dyYW1JbmZvXCI7XHJcbmltcG9ydCBEcmF3ZXIgZnJvbSBcIi4vY29tcG9uZW50cy9EcmF3ZXJcIjtcclxuaW1wb3J0IHsgVGV4dHVyZUluZm8sIH0gZnJvbSBcIi4vY29tcG9uZW50cy9UZXh0dXJlSW5mb1wiO1xyXG5pbXBvcnQgTW9kZWwgZnJvbSBcIi4vY29tcG9uZW50cy9Nb2RlbFwiO1xyXG5pbXBvcnQgeyBkZWZhdWx0U2hhZGVycywgcG9pbnRMaWdodFNoYWRlcnMgfSBmcm9tIFwiLi9yZW5kZXIvc2hhZGVyc1wiO1xyXG5pbXBvcnQgR0xjb250ZXh0V3JhcHBlciBmcm9tIFwiLi9jb21wb25lbnRzL0dMV3JhcHBlclwiO1xyXG5leHBvcnQgeyBHTFRGLCBHTGNvbnRleHRXcmFwcGVyLCBUZXh0dXJlSW5mbywgTW9kZWwsIFByaW1pdGl2ZVJlbmRlcmVyLCBFbnRpdHlEYXRhRnJvbUdsdGYsIFByaW1pdGl2ZVJlbmRlckluZm9Gcm9tQXJyYXlEYXRhLCBBcnJheURhdGFGcm9tR2x0ZiwgTWVzaFJlbmRlcmVyLCBTa2lubmVkTWVzaFJlbmRlcmVyLCBjcmVhdGVCb3gsIFByb2dyYW1JbmZvLCBEcmF3ZXIsIGNyZWF0ZUNvbmUsIGNyZWF0ZUNpcmNsZSwgZGVmYXVsdFNoYWRlcnMsIHBvaW50TGlnaHRTaGFkZXJzLCBjcmVhdGVTcGhlcmUsIGNyZWF0ZVRydW5jYXRlZENvbmUgfTtcclxuIiwiZXhwb3J0IGRlZmF1bHQgYCN2ZXJzaW9uIDMwMCBlc1xyXG5wcmVjaXNpb24gaGlnaHAgZmxvYXQ7XHJcbiBcclxuXHJcblxyXG51bmlmb3JtIHZlYzQgdV9jb2xvcjtcclxub3V0IHZlYzQgb3V0Q29sb3I7XHJcbnZvaWQgbWFpbigpIHtcclxuICBcclxuICBcclxuICBvdXRDb2xvciA9IHVfY29sb3I7XHJcbiBcclxuICBcclxuICBcclxufWA7XHJcbiIsImltcG9ydCB2ZXJ0IGZyb20gJy4vdmVydC5qcyc7XHJcbmltcG9ydCBmcmFnIGZyb20gJy4vZnJhZy5qcyc7XHJcbmV4cG9ydCBkZWZhdWx0IHsgdmVydCwgZnJhZyB9O1xyXG4iLCJleHBvcnQgZGVmYXVsdCBgI3ZlcnNpb24gMzAwIGVzXHJcblxyXG5wcmVjaXNpb24gaGlnaHAgZmxvYXQ7XHJcblxyXG51bmlmb3JtIG1hdDQgdV93b3JsZFZpZXdQcm9qZWN0aW9uO1xyXG5cclxuXHJcbmxheW91dChsb2NhdGlvbiA9IDApIGluIHZlYzQgYV9wb3NpdGlvbjtcclxudm9pZCBtYWluKCkge1xyXG4gIGdsX1Bvc2l0aW9uID0gdV93b3JsZFZpZXdQcm9qZWN0aW9uICogYV9wb3NpdGlvbjtcclxuICBnbF9Qb2ludFNpemUgPSAxMC4wO1xyXG59YDtcclxuIiwiaW1wb3J0IGRlZmF1bHRTaGFkZXJzIGZyb20gXCIuL2RlZmF1bHRcIjtcclxuaW1wb3J0IHBvaW50TGlnaHRTaGFkZXJzIGZyb20gXCIuL3BvaW50TGlnaHRcIjtcclxuZXhwb3J0IHsgZGVmYXVsdFNoYWRlcnMsIHBvaW50TGlnaHRTaGFkZXJzIH07XHJcbiIsImV4cG9ydCBkZWZhdWx0IGAjdmVyc2lvbiAzMDAgZXNcclxucHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xyXG4gXHJcblxyXG5cclxuXHJcbmluIHZlYzMgdl9ub3JtYWw7XHJcbmluIHZlYzMgdl9zdXJmYWNlVG9WaWV3O1xyXG5pbiB2ZWMzIHZfc3VyZmFjZVRvTGlnaHQ7XHJcblxyXG5cclxuLy91bmlmb3JtIHNhbXBsZXIyRCB1X3RleHR1cmUxO1xyXG51bmlmb3JtIGZsb2F0IHVfc2hpbmluZXNzO1xyXG51bmlmb3JtIHZlYzQgdV9jb2xvcjtcclxudW5pZm9ybSB2ZWM0IHVfYW1iaWVudExpZ2h0O1xyXG5vdXQgdmVjNCBvdXRDb2xvcjtcclxuXHJcblxyXG52b2lkIG1haW4oKSB7XHJcbiAgXHJcbiAgdmVjMyBzdXJmYWNlVG9MaWdodERpcmVjdGlvbiA9IG5vcm1hbGl6ZSh2X3N1cmZhY2VUb0xpZ2h0KTtcclxuICB2ZWMzIHN1cmZhY2VUb1ZpZXdEaXJlY3Rpb24gPSBub3JtYWxpemUodl9zdXJmYWNlVG9WaWV3KTtcclxuICB2ZWMzIGhhbGZWZWN0b3IgPSBub3JtYWxpemUoc3VyZmFjZVRvTGlnaHREaXJlY3Rpb24gKyBzdXJmYWNlVG9WaWV3RGlyZWN0aW9uKTtcclxuXHJcbiAgdmVjMyBub3JtYWwgPSBub3JtYWxpemUodl9ub3JtYWwpO1xyXG4gIGZsb2F0IGxpZ2h0ID0gZG90KG5vcm1hbCwgc3VyZmFjZVRvTGlnaHREaXJlY3Rpb24pO1xyXG4gIGZsb2F0IHNwZWN1bGFyID0gMC4wO1xyXG4gIGlmIChsaWdodCA+IDAuMCkge1xyXG4gICAgc3BlY3VsYXIgPSBwb3coZG90KG5vcm1hbCwgaGFsZlZlY3RvciksIHVfc2hpbmluZXNzKTtcclxuICB9XHJcbiAgXHJcbiAgb3V0Q29sb3IgPSAgdV9jb2xvcjtcclxuICBvdXRDb2xvci5yZ2IgKj0gbGlnaHQ7XHJcbiAgb3V0Q29sb3IucmdiICs9IHNwZWN1bGFyO1xyXG5cclxuICBvdXRDb2xvci5yZ2IgKz0gdV9hbWJpZW50TGlnaHQucmdiICowLjM7XHJcbiAgXHJcbn1gO1xyXG4iLCJpbXBvcnQgdmVydCBmcm9tICcuL3ZlcnQuanMnO1xyXG5pbXBvcnQgZnJhZyBmcm9tICcuL2ZyYWcuanMnO1xyXG5leHBvcnQgZGVmYXVsdCB7IHZlcnQsIGZyYWcgfTtcclxuIiwiZXhwb3J0IGRlZmF1bHQgYCN2ZXJzaW9uIDMwMCBlc1xyXG4gXHJcbmxheW91dChsb2NhdGlvbiA9IDApIGluIHZlYzQgYV9wb3NpdGlvbjtcclxubGF5b3V0KGxvY2F0aW9uID0gMSkgaW4gdmVjMyBhX25vcm1hbDtcclxuXHJcblxyXG51bmlmb3JtIG1hdDQgdV9tYXRyaXg7XHJcbnVuaWZvcm0gbWF0NCB1X3dvcmxkVmlld1Byb2plY3Rpb247XHJcbnVuaWZvcm0gdmVjMyB1X2xpZ2h0V29ybGRQb3NpdGlvbjtcclxudW5pZm9ybSB2ZWMzIHVfdmlld1dvcmxkUG9zaXRpb247XHJcblxyXG5vdXQgdmVjMyB2X25vcm1hbDtcclxub3V0IHZlYzMgdl9zdXJmYWNlVG9MaWdodDtcclxub3V0IHZlYzMgdl9zdXJmYWNlVG9WaWV3O1xyXG52b2lkIG1haW4oKSB7XHJcbiAgICBcclxuICAgIGdsX1Bvc2l0aW9uID0gdV93b3JsZFZpZXdQcm9qZWN0aW9uICogYV9wb3NpdGlvbjtcclxuICAgIFxyXG4gICAgdmVjMyBzdXJmYWNlV29ybGRQb3NpdGlvbiA9ICh1X21hdHJpeCAqIGFfcG9zaXRpb24pLnh5ejtcclxuICAgIFxyXG4gICAgdl9zdXJmYWNlVG9MaWdodCA9IHVfbGlnaHRXb3JsZFBvc2l0aW9uIC0gc3VyZmFjZVdvcmxkUG9zaXRpb247XHJcblxyXG4gICAgdl9ub3JtYWwgPSBtYXQzKCAgdV9tYXRyaXggKSAqIGFfbm9ybWFsO1xyXG4gICAgXHJcbiAgICB2X3N1cmZhY2VUb1ZpZXcgPSB1X3ZpZXdXb3JsZFBvc2l0aW9uIC0gc3VyZmFjZVdvcmxkUG9zaXRpb247XHJcbiAgICAgIFxyXG59YDtcclxuIiwiaW1wb3J0IEFBQkIsIHsgZ2V0Q2VudGVyLCBnZXREaWFnb25hbCwgaXNDb2xsaWRlIH0gZnJvbSBcIi4vYWFiYlwiO1xyXG5pbXBvcnQgdjMgZnJvbSBcIi4vdjNcIjtcclxuY29uc3QgZWxlbWVudFNpemUgPSAxO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPY3RyZWUge1xyXG4gICAgY29uc3RydWN0b3IoYWFiYikge1xyXG4gICAgICAgIHRoaXMuYWFiYiA9IGFhYmI7XHJcbiAgICAgICAgdGhpcy5kaWFnb25hbCA9IGdldERpYWdvbmFsKGFhYmIpO1xyXG4gICAgICAgIHRoaXMuY2VudGVyID0gZ2V0Q2VudGVyKGFhYmIpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudHMgPSBbXTtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuID0gW107XHJcbiAgICAgICAgdGhpcy5jYXBhY2l0eSA9IDQ7XHJcbiAgICB9XHJcbiAgICBzdWJkaXZpZGUoKSB7XHJcbiAgICAgICAgY29uc3QgbWluID0gdGhpcy5hYWJiLm1pbjtcclxuICAgICAgICBjb25zdCBtYXggPSB0aGlzLmFhYmIubWF4O1xyXG4gICAgICAgIGNvbnN0IFt4MSwgeTEsIHoxXSA9IG1pbjtcclxuICAgICAgICBjb25zdCBbeDIsIHkyLCB6Ml0gPSBtYXg7XHJcbiAgICAgICAgY29uc3QgeGMgPSB0aGlzLmNlbnRlclswXTtcclxuICAgICAgICBjb25zdCB5YyA9IHRoaXMuY2VudGVyWzFdO1xyXG4gICAgICAgIGNvbnN0IHpjID0gdGhpcy5jZW50ZXJbMl07XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlblswXSA9IG5ldyBPY3RyZWUobmV3IEFBQkIoW3gxLCB5MSwgejFdLCBbeGMsIHljLCB6Y10pKTtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuWzFdID0gbmV3IE9jdHJlZShuZXcgQUFCQihbeDEsIHkxLCB6Y10sIFt4YywgeWMsIHoyXSkpO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5bMl0gPSBuZXcgT2N0cmVlKG5ldyBBQUJCKFt4MSwgeWMsIHoxXSwgW3hjLCB5MiwgemNdKSk7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlblszXSA9IG5ldyBPY3RyZWUobmV3IEFBQkIoW3gxLCB5YywgemNdLCBbeGMsIHkyLCB6Ml0pKTtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuWzRdID0gbmV3IE9jdHJlZShuZXcgQUFCQihbeGMsIHkxLCB6MV0sIFt4MiwgeWMsIHpjXSkpO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5bNV0gPSBuZXcgT2N0cmVlKG5ldyBBQUJCKFt4YywgeTEsIHpjXSwgW3gyLCB5YywgejJdKSk7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbls2XSA9IG5ldyBPY3RyZWUobmV3IEFBQkIoW3hjLCB5YywgejFdLCBbeDIsIHkyLCB6Y10pKTtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuWzddID0gbmV3IE9jdHJlZShuZXcgQUFCQihbeGMsIHljLCB6Y10sIFt4MiwgeTIsIHoyXSkpO1xyXG4gICAgfVxyXG4gICAgaW5zZXJ0KHZveGVsKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudHMubGVuZ3RoIDwgdGhpcy5jYXBhY2l0eSkge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzLnB1c2godm94ZWwpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCA9PT0gMClcclxuICAgICAgICAgICAgdGhpcy5zdWJkaXZpZGUoKTtcclxuICAgICAgICBjb25zdCB4YyA9IHRoaXMuY2VudGVyWzBdO1xyXG4gICAgICAgIGNvbnN0IHljID0gdGhpcy5jZW50ZXJbMV07XHJcbiAgICAgICAgY29uc3QgemMgPSB0aGlzLmNlbnRlclsyXTtcclxuICAgICAgICBjb25zdCB4ID0gTnVtYmVyKHZveGVsWzBdID4geGMpICogNDtcclxuICAgICAgICBjb25zdCB5ID0gTnVtYmVyKHZveGVsWzFdID4geWMpICogMjtcclxuICAgICAgICBjb25zdCB6ID0gTnVtYmVyKHZveGVsWzJdID4gemMpO1xyXG4gICAgICAgIGNvbnN0IGlkeCA9IHogfCB5IHwgeDtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuW2lkeF0uaW5zZXJ0KHZveGVsKTtcclxuICAgIH1cclxuICAgIHF1ZXJ5KGFhYmIpIHtcclxuICAgICAgICBjb25zdCBmb3VuZCA9IFtdO1xyXG4gICAgICAgIGlmICghaXNDb2xsaWRlKHRoaXMuYWFiYiwgYWFiYikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IF9hYWJiID0gbmV3IEFBQkIodjMuc3VtKGVsZW1lbnQsIFstMC41LCAtMC41LCAtMC41XSksIHYzLnN1bShlbGVtZW50LCBbMC41LCAwLjUsIDAuNV0pKTtcclxuICAgICAgICAgICAgaWYgKGlzQ29sbGlkZShhYWJiLCBfYWFiYikpIHtcclxuICAgICAgICAgICAgICAgIGZvdW5kLnB1c2goZWxlbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xyXG4gICAgICAgICAgICBmb3VuZC5wdXNoKC4uLmNoaWxkLnF1ZXJ5KGFhYmIpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZm91bmQ7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHYzIGZyb20gXCIuL3YzXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFBQkIge1xyXG4gICAgY29uc3RydWN0b3IobWluLCBtYXgpIHtcclxuICAgICAgICB0aGlzLm1pbiA9IG1pbjtcclxuICAgICAgICB0aGlzLm1heCA9IG1heDtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY29uc3QgaXNDb2xsaWRlID0gKGFhYmIxLCBhYWJiMikgPT4ge1xyXG4gICAgaWYgKGFhYmIxLm1pblswXSA8PSBhYWJiMi5tYXhbMF0gJiZcclxuICAgICAgICBhYWJiMS5tYXhbMF0gPj0gYWFiYjIubWluWzBdICYmXHJcbiAgICAgICAgYWFiYjEubWluWzFdIDw9IGFhYmIyLm1heFsxXSAmJlxyXG4gICAgICAgIGFhYmIxLm1heFsxXSA+PSBhYWJiMi5taW5bMV0gJiZcclxuICAgICAgICBhYWJiMS5taW5bMl0gPD0gYWFiYjIubWF4WzJdICYmXHJcbiAgICAgICAgYWFiYjEubWF4WzJdID49IGFhYmIyLm1pblsyXSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZ2V0Q2VudGVyID0gKGFhYmIpID0+IHtcclxuICAgIGNvbnN0IHN1bSA9IHYzLnN1bShhYWJiLm1heCwgYWFiYi5taW4pO1xyXG4gICAgcmV0dXJuIFtzdW1bMF0gLyAyLCBzdW1bMV0gLyAyLCBzdW1bMl0gLyAyXTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGdldERpYWdvbmFsID0gKGFhYmIpID0+IHYzLmRpZmYoYWFiYi5tYXgsIGFhYmIubWluKTtcclxuZXhwb3J0IGNvbnN0IGNvbnRhaW5zID0gKGFhYmIsIHApID0+IHsgfTtcclxuIiwiaW1wb3J0IEFBQkIgZnJvbSBcIi4vYWFiYlwiO1xyXG5pbXBvcnQgdjMgZnJvbSBcIi4vdjNcIjtcclxuaW1wb3J0IG0zIGZyb20gXCIuL20zXCI7XHJcbmltcG9ydCBtNCBmcm9tIFwiLi9tNFwiO1xyXG5pbXBvcnQgT2N0cmVlIGZyb20gXCIuL09jdHJlZVwiO1xyXG5leHBvcnQgeyBBQUJCLCB2MywgbTQsIG0zLCBPY3RyZWUgfTtcclxuIiwiY29uc3QgbTMgPSB7XHJcbiAgICBtdWx0aXBseTogZnVuY3Rpb24gKGIsIGEpIHtcclxuICAgICAgICBjb25zdCBhMDAgPSBhWzAgKiAzICsgMF07XHJcbiAgICAgICAgY29uc3QgYTAxID0gYVswICogMyArIDFdO1xyXG4gICAgICAgIGNvbnN0IGEwMiA9IGFbMCAqIDMgKyAyXTtcclxuICAgICAgICBjb25zdCBhMTAgPSBhWzEgKiAzICsgMF07XHJcbiAgICAgICAgY29uc3QgYTExID0gYVsxICogMyArIDFdO1xyXG4gICAgICAgIGNvbnN0IGExMiA9IGFbMSAqIDMgKyAyXTtcclxuICAgICAgICBjb25zdCBhMjAgPSBhWzIgKiAzICsgMF07XHJcbiAgICAgICAgY29uc3QgYTIxID0gYVsyICogMyArIDFdO1xyXG4gICAgICAgIGNvbnN0IGEyMiA9IGFbMiAqIDMgKyAyXTtcclxuICAgICAgICBjb25zdCBiMDAgPSBiWzAgKiAzICsgMF07XHJcbiAgICAgICAgY29uc3QgYjAxID0gYlswICogMyArIDFdO1xyXG4gICAgICAgIGNvbnN0IGIwMiA9IGJbMCAqIDMgKyAyXTtcclxuICAgICAgICBjb25zdCBiMTAgPSBiWzEgKiAzICsgMF07XHJcbiAgICAgICAgY29uc3QgYjExID0gYlsxICogMyArIDFdO1xyXG4gICAgICAgIGNvbnN0IGIxMiA9IGJbMSAqIDMgKyAyXTtcclxuICAgICAgICBjb25zdCBiMjAgPSBiWzIgKiAzICsgMF07XHJcbiAgICAgICAgY29uc3QgYjIxID0gYlsyICogMyArIDFdO1xyXG4gICAgICAgIGNvbnN0IGIyMiA9IGJbMiAqIDMgKyAyXTtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBiMDAgKiBhMDAgKyBiMDEgKiBhMTAgKyBiMDIgKiBhMjAsXHJcbiAgICAgICAgICAgIGIwMCAqIGEwMSArIGIwMSAqIGExMSArIGIwMiAqIGEyMSxcclxuICAgICAgICAgICAgYjAwICogYTAyICsgYjAxICogYTEyICsgYjAyICogYTIyLFxyXG4gICAgICAgICAgICBiMTAgKiBhMDAgKyBiMTEgKiBhMTAgKyBiMTIgKiBhMjAsXHJcbiAgICAgICAgICAgIGIxMCAqIGEwMSArIGIxMSAqIGExMSArIGIxMiAqIGEyMSxcclxuICAgICAgICAgICAgYjEwICogYTAyICsgYjExICogYTEyICsgYjEyICogYTIyLFxyXG4gICAgICAgICAgICBiMjAgKiBhMDAgKyBiMjEgKiBhMTAgKyBiMjIgKiBhMjAsXHJcbiAgICAgICAgICAgIGIyMCAqIGEwMSArIGIyMSAqIGExMSArIGIyMiAqIGEyMSxcclxuICAgICAgICAgICAgYjIwICogYTAyICsgYjIxICogYTEyICsgYjIyICogYTIyLFxyXG4gICAgICAgIF07XHJcbiAgICB9LFxyXG4gICAgeFJvdGF0aW9uOiBmdW5jdGlvbiAoYW5nbGVJblJhZGlhbnMpIHtcclxuICAgICAgICBjb25zdCBjID0gTWF0aC5jb3MoYW5nbGVJblJhZGlhbnMpO1xyXG4gICAgICAgIGNvbnN0IHMgPSBNYXRoLnNpbihhbmdsZUluUmFkaWFucyk7XHJcbiAgICAgICAgcmV0dXJuIFsxLCAwLCAwLCAwLCBjLCBzLCAwLCAtcywgY107XHJcbiAgICB9LFxyXG4gICAgeVJvdGF0aW9uOiBmdW5jdGlvbiAoYW5nbGVJblJhZGlhbnMpIHtcclxuICAgICAgICBjb25zdCBjID0gTWF0aC5jb3MoYW5nbGVJblJhZGlhbnMpO1xyXG4gICAgICAgIGNvbnN0IHMgPSBNYXRoLnNpbihhbmdsZUluUmFkaWFucyk7XHJcbiAgICAgICAgcmV0dXJuIFtjLCAwLCAtcywgMCwgMSwgMCwgcywgMCwgY107XHJcbiAgICB9LFxyXG4gICAgelJvdGF0aW9uOiBmdW5jdGlvbiAoYW5nbGVJblJhZGlhbnMpIHtcclxuICAgICAgICBjb25zdCBjID0gTWF0aC5jb3MoYW5nbGVJblJhZGlhbnMpO1xyXG4gICAgICAgIGNvbnN0IHMgPSBNYXRoLnNpbihhbmdsZUluUmFkaWFucyk7XHJcbiAgICAgICAgcmV0dXJuIFtjLCBzLCAwLCAtcywgYywgMCwgMCwgMCwgMV07XHJcbiAgICB9LFxyXG4gICAgbTNUb200OiBmdW5jdGlvbiAobSkge1xyXG4gICAgICAgIGNvbnN0IGRzdCA9IG5ldyBBcnJheSgxNik7XHJcbiAgICAgICAgZHN0WzBdID0gbVswXTtcclxuICAgICAgICBkc3RbMV0gPSBtWzFdO1xyXG4gICAgICAgIGRzdFsyXSA9IG1bMl07XHJcbiAgICAgICAgZHN0WzNdID0gMDtcclxuICAgICAgICBkc3RbNF0gPSBtWzNdO1xyXG4gICAgICAgIGRzdFs1XSA9IG1bNF07XHJcbiAgICAgICAgZHN0WzZdID0gbVs1XTtcclxuICAgICAgICBkc3RbN10gPSAwO1xyXG4gICAgICAgIGRzdFs4XSA9IG1bNl07XHJcbiAgICAgICAgZHN0WzldID0gbVs3XTtcclxuICAgICAgICBkc3RbMTBdID0gbVs4XTtcclxuICAgICAgICBkc3RbMTFdID0gMDtcclxuICAgICAgICBkc3RbMTJdID0gMDtcclxuICAgICAgICBkc3RbMTNdID0gMDtcclxuICAgICAgICBkc3RbMTRdID0gMDtcclxuICAgICAgICBkc3RbMTVdID0gMTtcclxuICAgICAgICByZXR1cm4gZHN0O1xyXG4gICAgfSxcclxuICAgIHhSb3RhdGU6IGZ1bmN0aW9uIChtLCBhbmdsZUluUmFkaWFucykge1xyXG4gICAgICAgIHJldHVybiBtMy5tdWx0aXBseShtLCBtMy54Um90YXRpb24oYW5nbGVJblJhZGlhbnMpKTtcclxuICAgIH0sXHJcbiAgICB5Um90YXRlOiBmdW5jdGlvbiAobSwgYW5nbGVJblJhZGlhbnMpIHtcclxuICAgICAgICByZXR1cm4gbTMubXVsdGlwbHkobSwgbTMueVJvdGF0aW9uKGFuZ2xlSW5SYWRpYW5zKSk7XHJcbiAgICB9LFxyXG4gICAgelJvdGF0ZTogZnVuY3Rpb24gKG0sIGFuZ2xlSW5SYWRpYW5zKSB7XHJcbiAgICAgICAgcmV0dXJuIG0zLm11bHRpcGx5KG0sIG0zLnpSb3RhdGlvbihhbmdsZUluUmFkaWFucykpO1xyXG4gICAgfSxcclxuICAgIHRyYW5zZm9ybVBvaW50OiBmdW5jdGlvbiAobSwgdikge1xyXG4gICAgICAgIGNvbnN0IGRzdCA9IFswLCAwLCAwXTtcclxuICAgICAgICBjb25zdCB2MCA9IHZbMF07XHJcbiAgICAgICAgY29uc3QgdjEgPSB2WzFdO1xyXG4gICAgICAgIGNvbnN0IHYyID0gdlsyXTtcclxuICAgICAgICBkc3RbMF0gPSB2MCAqIG1bMCAqIDMgKyAwXSArIHYxICogbVsxICogMyArIDBdICsgdjIgKiBtWzIgKiAzICsgMF07XHJcbiAgICAgICAgZHN0WzFdID0gdjAgKiBtWzAgKiAzICsgMV0gKyB2MSAqIG1bMSAqIDMgKyAxXSArIHYyICogbVsyICogMyArIDFdO1xyXG4gICAgICAgIGRzdFsyXSA9IHYwICogbVswICogMyArIDJdICsgdjEgKiBtWzEgKiAzICsgMl0gKyB2MiAqIG1bMiAqIDMgKyAyXTtcclxuICAgICAgICByZXR1cm4gZHN0O1xyXG4gICAgfSxcclxuICAgIGlkZW50aXR5OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIFsxLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAxXTtcclxuICAgIH0sXHJcbiAgICB0cmFuc3Bvc2U6IGZ1bmN0aW9uIChtKSB7XHJcbiAgICAgICAgY29uc3QgZHN0ID0gbmV3IEFycmF5KDkpO1xyXG4gICAgICAgIGRzdFswXSA9IG1bMF07XHJcbiAgICAgICAgZHN0WzFdID0gbVszXTtcclxuICAgICAgICBkc3RbMl0gPSBtWzZdO1xyXG4gICAgICAgIGRzdFszXSA9IG1bMV07XHJcbiAgICAgICAgZHN0WzRdID0gbVs0XTtcclxuICAgICAgICBkc3RbNV0gPSBtWzddO1xyXG4gICAgICAgIGRzdFs2XSA9IG1bMl07XHJcbiAgICAgICAgZHN0WzddID0gbVs1XTtcclxuICAgICAgICBkc3RbOF0gPSBtWzhdO1xyXG4gICAgICAgIHJldHVybiBkc3Q7XHJcbiAgICB9LFxyXG4gICAgc2NhbGluZzogZnVuY3Rpb24gKHN4LCBzeSwgc3opIHtcclxuICAgICAgICByZXR1cm4gW3N4LCAwLCAwLCAwLCBzeSwgMCwgMCwgMCwgc3pdO1xyXG4gICAgfSxcclxuICAgIHNjYWxlOiBmdW5jdGlvbiAobSwgc3gsIHN5LCBzeikge1xyXG4gICAgICAgIHJldHVybiBtMy5tdWx0aXBseShtLCBtMy5zY2FsaW5nKHN4LCBzeSwgc3opKTtcclxuICAgIH0sXHJcbiAgICAvKlxyXG4gICAgICAgIDAgMSAyXHJcbiAgICAgICAgMyA0IDVcclxuICAgICAgICA2IDcgOFxyXG4gICAgICAgICovXHJcbiAgICBpbnZlcnNlOiBmdW5jdGlvbiAobSkge1xyXG4gICAgICAgIGNvbnN0IGRldCA9IG1bMF0gKiBtWzRdICogbVs4XSArXHJcbiAgICAgICAgICAgIG1bMl0gKiBtWzNdICogbVs3XSArXHJcbiAgICAgICAgICAgIG1bMV0gKiBtWzVdICogbVs2XSAtXHJcbiAgICAgICAgICAgIG1bMl0gKiBtWzRdICogbVs2XSAtXHJcbiAgICAgICAgICAgIG1bMF0gKiBtWzVdICogbVs3XSAtXHJcbiAgICAgICAgICAgIG1bOF0gKiBtWzNdICogbVsyXTtcclxuICAgICAgICBjb25zdCBkc3QgPSBuZXcgQXJyYXkoOSk7XHJcbiAgICAgICAgZHN0WzBdID0gKG1bNF0gKiBtWzhdIC0gbVs3XSAqIG1bNV0pIC8gZGV0O1xyXG4gICAgICAgIGRzdFsxXSA9IChtWzNdICogbVs4XSAtIG1bNl0gKiBtWzVdKSAvIGRldDtcclxuICAgICAgICBkc3RbMl0gPSAobVszXSAqIG1bN10gLSBtWzZdICogbVs0XSkgLyBkZXQ7XHJcbiAgICAgICAgZHN0WzNdID0gKG1bMV0gKiBtWzhdIC0gbVsyXSAqIG1bN10pIC8gZGV0O1xyXG4gICAgICAgIGRzdFs0XSA9IChtWzBdICogbVs4XSAtIG1bMl0gKiBtWzZdKSAvIGRldDtcclxuICAgICAgICBkc3RbNV0gPSAobVswXSAqIG1bN10gLSBtWzFdICogbVs2XSkgLyBkZXQ7XHJcbiAgICAgICAgZHN0WzZdID0gKG1bMV0gKiBtWzVdIC0gbVsyXSAqIG1bNF0pIC8gZGV0O1xyXG4gICAgICAgIGRzdFs3XSA9IChtWzBdICogbVs1XSAtIG1bMl0gKiBtWzNdKSAvIGRldDtcclxuICAgICAgICBkc3RbOF0gPSAobVswXSAqIG1bNF0gLSBtWzFdICogbVs0XSkgLyBkZXQ7XHJcbiAgICAgICAgcmV0dXJuIGRzdDtcclxuICAgIH0sXHJcbiAgICB0b1N0cmluZyhtKSB7XHJcbiAgICAgICAgcmV0dXJuIG0ucmVkdWNlKChhY2MsIGVsLCBpZHgpID0+IGlkeCAlIDMgPT09IDBcclxuICAgICAgICAgICAgPyAoYWNjICs9IGBcXG4ke2VsLnRvU3RyaW5nKCl9YClcclxuICAgICAgICAgICAgOiAoYWNjICs9IGAgJHtlbC50b1N0cmluZygpfWApLCBcIlwiKTtcclxuICAgIH0sXHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IG0zO1xyXG4iLCJpbXBvcnQgdjMgZnJvbSBcIi4vdjNcIjtcclxuY29uc3QgbTQgPSB7XHJcbiAgICBtdWx0aXBseTogZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICBjb25zdCBhMDAgPSBhWzAgKiA0ICsgMF07XHJcbiAgICAgICAgY29uc3QgYTAxID0gYVswICogNCArIDFdO1xyXG4gICAgICAgIGNvbnN0IGEwMiA9IGFbMCAqIDQgKyAyXTtcclxuICAgICAgICBjb25zdCBhMDMgPSBhWzAgKiA0ICsgM107XHJcbiAgICAgICAgY29uc3QgYTEwID0gYVsxICogNCArIDBdO1xyXG4gICAgICAgIGNvbnN0IGExMSA9IGFbMSAqIDQgKyAxXTtcclxuICAgICAgICBjb25zdCBhMTIgPSBhWzEgKiA0ICsgMl07XHJcbiAgICAgICAgY29uc3QgYTEzID0gYVsxICogNCArIDNdO1xyXG4gICAgICAgIGNvbnN0IGEyMCA9IGFbMiAqIDQgKyAwXTtcclxuICAgICAgICBjb25zdCBhMjEgPSBhWzIgKiA0ICsgMV07XHJcbiAgICAgICAgY29uc3QgYTIyID0gYVsyICogNCArIDJdO1xyXG4gICAgICAgIGNvbnN0IGEyMyA9IGFbMiAqIDQgKyAzXTtcclxuICAgICAgICBjb25zdCBhMzAgPSBhWzMgKiA0ICsgMF07XHJcbiAgICAgICAgY29uc3QgYTMxID0gYVszICogNCArIDFdO1xyXG4gICAgICAgIGNvbnN0IGEzMiA9IGFbMyAqIDQgKyAyXTtcclxuICAgICAgICBjb25zdCBhMzMgPSBhWzMgKiA0ICsgM107XHJcbiAgICAgICAgY29uc3QgYjAwID0gYlswICogNCArIDBdO1xyXG4gICAgICAgIGNvbnN0IGIwMSA9IGJbMCAqIDQgKyAxXTtcclxuICAgICAgICBjb25zdCBiMDIgPSBiWzAgKiA0ICsgMl07XHJcbiAgICAgICAgY29uc3QgYjAzID0gYlswICogNCArIDNdO1xyXG4gICAgICAgIGNvbnN0IGIxMCA9IGJbMSAqIDQgKyAwXTtcclxuICAgICAgICBjb25zdCBiMTEgPSBiWzEgKiA0ICsgMV07XHJcbiAgICAgICAgY29uc3QgYjEyID0gYlsxICogNCArIDJdO1xyXG4gICAgICAgIGNvbnN0IGIxMyA9IGJbMSAqIDQgKyAzXTtcclxuICAgICAgICBjb25zdCBiMjAgPSBiWzIgKiA0ICsgMF07XHJcbiAgICAgICAgY29uc3QgYjIxID0gYlsyICogNCArIDFdO1xyXG4gICAgICAgIGNvbnN0IGIyMiA9IGJbMiAqIDQgKyAyXTtcclxuICAgICAgICBjb25zdCBiMjMgPSBiWzIgKiA0ICsgM107XHJcbiAgICAgICAgY29uc3QgYjMwID0gYlszICogNCArIDBdO1xyXG4gICAgICAgIGNvbnN0IGIzMSA9IGJbMyAqIDQgKyAxXTtcclxuICAgICAgICBjb25zdCBiMzIgPSBiWzMgKiA0ICsgMl07XHJcbiAgICAgICAgY29uc3QgYjMzID0gYlszICogNCArIDNdO1xyXG4gICAgICAgIGNvbnN0IGRzdCA9IFtcclxuICAgICAgICAgICAgYjAwICogYTAwICsgYjAxICogYTEwICsgYjAyICogYTIwICsgYjAzICogYTMwLFxyXG4gICAgICAgICAgICBiMDAgKiBhMDEgKyBiMDEgKiBhMTEgKyBiMDIgKiBhMjEgKyBiMDMgKiBhMzEsXHJcbiAgICAgICAgICAgIGIwMCAqIGEwMiArIGIwMSAqIGExMiArIGIwMiAqIGEyMiArIGIwMyAqIGEzMixcclxuICAgICAgICAgICAgYjAwICogYTAzICsgYjAxICogYTEzICsgYjAyICogYTIzICsgYjAzICogYTMzLFxyXG4gICAgICAgICAgICBiMTAgKiBhMDAgKyBiMTEgKiBhMTAgKyBiMTIgKiBhMjAgKyBiMTMgKiBhMzAsXHJcbiAgICAgICAgICAgIGIxMCAqIGEwMSArIGIxMSAqIGExMSArIGIxMiAqIGEyMSArIGIxMyAqIGEzMSxcclxuICAgICAgICAgICAgYjEwICogYTAyICsgYjExICogYTEyICsgYjEyICogYTIyICsgYjEzICogYTMyLFxyXG4gICAgICAgICAgICBiMTAgKiBhMDMgKyBiMTEgKiBhMTMgKyBiMTIgKiBhMjMgKyBiMTMgKiBhMzMsXHJcbiAgICAgICAgICAgIGIyMCAqIGEwMCArIGIyMSAqIGExMCArIGIyMiAqIGEyMCArIGIyMyAqIGEzMCxcclxuICAgICAgICAgICAgYjIwICogYTAxICsgYjIxICogYTExICsgYjIyICogYTIxICsgYjIzICogYTMxLFxyXG4gICAgICAgICAgICBiMjAgKiBhMDIgKyBiMjEgKiBhMTIgKyBiMjIgKiBhMjIgKyBiMjMgKiBhMzIsXHJcbiAgICAgICAgICAgIGIyMCAqIGEwMyArIGIyMSAqIGExMyArIGIyMiAqIGEyMyArIGIyMyAqIGEzMyxcclxuICAgICAgICAgICAgYjMwICogYTAwICsgYjMxICogYTEwICsgYjMyICogYTIwICsgYjMzICogYTMwLFxyXG4gICAgICAgICAgICBiMzAgKiBhMDEgKyBiMzEgKiBhMTEgKyBiMzIgKiBhMjEgKyBiMzMgKiBhMzEsXHJcbiAgICAgICAgICAgIGIzMCAqIGEwMiArIGIzMSAqIGExMiArIGIzMiAqIGEyMiArIGIzMyAqIGEzMixcclxuICAgICAgICAgICAgYjMwICogYTAzICsgYjMxICogYTEzICsgYjMyICogYTIzICsgYjMzICogYTMzLFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgcmV0dXJuIGRzdDtcclxuICAgIH0sXHJcbiAgICB0cmFuc2xhdGlvbjogZnVuY3Rpb24gKHR4LCB0eSwgdHopIHtcclxuICAgICAgICByZXR1cm4gWzEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIHR4LCB0eSwgdHosIDFdO1xyXG4gICAgfSxcclxuICAgIHhSb3RhdGlvbjogZnVuY3Rpb24gKGFuZ2xlSW5SYWRpYW5zKSB7XHJcbiAgICAgICAgY29uc3QgYyA9IE1hdGguY29zKGFuZ2xlSW5SYWRpYW5zKTtcclxuICAgICAgICBjb25zdCBzID0gTWF0aC5zaW4oYW5nbGVJblJhZGlhbnMpO1xyXG4gICAgICAgIHJldHVybiBbMSwgMCwgMCwgMCwgMCwgYywgcywgMCwgMCwgLXMsIGMsIDAsIDAsIDAsIDAsIDFdO1xyXG4gICAgfSxcclxuICAgIHlSb3RhdGlvbjogZnVuY3Rpb24gKGFuZ2xlSW5SYWRpYW5zKSB7XHJcbiAgICAgICAgY29uc3QgYyA9IE1hdGguY29zKGFuZ2xlSW5SYWRpYW5zKTtcclxuICAgICAgICBjb25zdCBzID0gTWF0aC5zaW4oYW5nbGVJblJhZGlhbnMpO1xyXG4gICAgICAgIHJldHVybiBbYywgMCwgLXMsIDAsIDAsIDEsIDAsIDAsIHMsIDAsIGMsIDAsIDAsIDAsIDAsIDFdO1xyXG4gICAgfSxcclxuICAgIHpSb3RhdGlvbjogZnVuY3Rpb24gKGFuZ2xlSW5SYWRpYW5zKSB7XHJcbiAgICAgICAgY29uc3QgYyA9IE1hdGguY29zKGFuZ2xlSW5SYWRpYW5zKTtcclxuICAgICAgICBjb25zdCBzID0gTWF0aC5zaW4oYW5nbGVJblJhZGlhbnMpO1xyXG4gICAgICAgIHJldHVybiBbYywgcywgMCwgMCwgLXMsIGMsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDFdO1xyXG4gICAgfSxcclxuICAgIHNjYWxpbmc6IGZ1bmN0aW9uIChzeCwgc3ksIHN6KSB7XHJcbiAgICAgICAgcmV0dXJuIFtzeCwgMCwgMCwgMCwgMCwgc3ksIDAsIDAsIDAsIDAsIHN6LCAwLCAwLCAwLCAwLCAxXTtcclxuICAgIH0sXHJcbiAgICB0cmFuc2xhdGU6IGZ1bmN0aW9uIChtLCB0eCwgdHksIHR6KSB7XHJcbiAgICAgICAgcmV0dXJuIG00Lm11bHRpcGx5KG0sIG00LnRyYW5zbGF0aW9uKHR4LCB0eSwgdHopKTtcclxuICAgIH0sXHJcbiAgICB4Um90YXRlOiBmdW5jdGlvbiAobSwgYW5nbGVJblJhZGlhbnMpIHtcclxuICAgICAgICByZXR1cm4gbTQubXVsdGlwbHkobSwgbTQueFJvdGF0aW9uKGFuZ2xlSW5SYWRpYW5zKSk7XHJcbiAgICB9LFxyXG4gICAgeVJvdGF0ZTogZnVuY3Rpb24gKG0sIGFuZ2xlSW5SYWRpYW5zKSB7XHJcbiAgICAgICAgcmV0dXJuIG00Lm11bHRpcGx5KG0sIG00LnlSb3RhdGlvbihhbmdsZUluUmFkaWFucykpO1xyXG4gICAgfSxcclxuICAgIHpSb3RhdGU6IGZ1bmN0aW9uIChtLCBhbmdsZUluUmFkaWFucykge1xyXG4gICAgICAgIHJldHVybiBtNC5tdWx0aXBseShtLCBtNC56Um90YXRpb24oYW5nbGVJblJhZGlhbnMpKTtcclxuICAgIH0sXHJcbiAgICBzY2FsZTogZnVuY3Rpb24gKG0sIHN4LCBzeSwgc3opIHtcclxuICAgICAgICByZXR1cm4gbTQubXVsdGlwbHkobSwgbTQuc2NhbGluZyhzeCwgc3ksIHN6KSk7XHJcbiAgICB9LFxyXG4gICAgbWFrZU9ydDogZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICBjb25zdCBvID0gWzAsIDAsIDBdO1xyXG4gICAgICAgIGNvbnN0IG5vcm0gPSBNYXRoLnNxcnQodlswXSAqIHZbMF0gKyB2WzFdICogdlsxXSArIHZbMl0gKiB2WzJdKTtcclxuICAgICAgICBvWzBdID0gdlswXSAvIG5vcm07XHJcbiAgICAgICAgb1sxXSA9IHZbMV0gLyBub3JtO1xyXG4gICAgICAgIG9bMl0gPSB2WzJdIC8gbm9ybTtcclxuICAgICAgICByZXR1cm4gbztcclxuICAgIH0sXHJcbiAgICBwcm9qZWN0aW9uOiBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCwgZGVwdGgpIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAyIC8gd2lkdGgsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIC0yIC8gaGVpZ2h0LFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAyIC8gZGVwdGgsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIC0xLFxyXG4gICAgICAgICAgICAxLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAxLFxyXG4gICAgICAgIF07XHJcbiAgICB9LFxyXG4gICAgcGVyc3BlY3RpdmU6IGZ1bmN0aW9uIChmaWVsZE9mVmlld0luUmFkaWFucywgYXNwZWN0LCBuZWFyLCBmYXIpIHtcclxuICAgICAgICBjb25zdCBmID0gTWF0aC50YW4oTWF0aC5QSSAqIDAuNSAtIDAuNSAqIGZpZWxkT2ZWaWV3SW5SYWRpYW5zKTtcclxuICAgICAgICBjb25zdCByYW5nZUludiA9IDEuMCAvIChuZWFyIC0gZmFyKTtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBmIC8gYXNwZWN0LFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICBmLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAobmVhciArIGZhcikgKiByYW5nZUludixcclxuICAgICAgICAgICAgLTEsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIG5lYXIgKiBmYXIgKiByYW5nZUludiAqIDIsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgXTtcclxuICAgIH0sXHJcbiAgICBpbnZlcnNlOiBmdW5jdGlvbiAobSkge1xyXG4gICAgICAgIGNvbnN0IG0wMCA9IG1bMCAqIDQgKyAwXTtcclxuICAgICAgICBjb25zdCBtMDEgPSBtWzAgKiA0ICsgMV07XHJcbiAgICAgICAgY29uc3QgbTAyID0gbVswICogNCArIDJdO1xyXG4gICAgICAgIGNvbnN0IG0wMyA9IG1bMCAqIDQgKyAzXTtcclxuICAgICAgICBjb25zdCBtMTAgPSBtWzEgKiA0ICsgMF07XHJcbiAgICAgICAgY29uc3QgbTExID0gbVsxICogNCArIDFdO1xyXG4gICAgICAgIGNvbnN0IG0xMiA9IG1bMSAqIDQgKyAyXTtcclxuICAgICAgICBjb25zdCBtMTMgPSBtWzEgKiA0ICsgM107XHJcbiAgICAgICAgY29uc3QgbTIwID0gbVsyICogNCArIDBdO1xyXG4gICAgICAgIGNvbnN0IG0yMSA9IG1bMiAqIDQgKyAxXTtcclxuICAgICAgICBjb25zdCBtMjIgPSBtWzIgKiA0ICsgMl07XHJcbiAgICAgICAgY29uc3QgbTIzID0gbVsyICogNCArIDNdO1xyXG4gICAgICAgIGNvbnN0IG0zMCA9IG1bMyAqIDQgKyAwXTtcclxuICAgICAgICBjb25zdCBtMzEgPSBtWzMgKiA0ICsgMV07XHJcbiAgICAgICAgY29uc3QgbTMyID0gbVszICogNCArIDJdO1xyXG4gICAgICAgIGNvbnN0IG0zMyA9IG1bMyAqIDQgKyAzXTtcclxuICAgICAgICBjb25zdCB0bXBfMCA9IG0yMiAqIG0zMztcclxuICAgICAgICBjb25zdCB0bXBfMSA9IG0zMiAqIG0yMztcclxuICAgICAgICBjb25zdCB0bXBfMiA9IG0xMiAqIG0zMztcclxuICAgICAgICBjb25zdCB0bXBfMyA9IG0zMiAqIG0xMztcclxuICAgICAgICBjb25zdCB0bXBfNCA9IG0xMiAqIG0yMztcclxuICAgICAgICBjb25zdCB0bXBfNSA9IG0yMiAqIG0xMztcclxuICAgICAgICBjb25zdCB0bXBfNiA9IG0wMiAqIG0zMztcclxuICAgICAgICBjb25zdCB0bXBfNyA9IG0zMiAqIG0wMztcclxuICAgICAgICBjb25zdCB0bXBfOCA9IG0wMiAqIG0yMztcclxuICAgICAgICBjb25zdCB0bXBfOSA9IG0yMiAqIG0wMztcclxuICAgICAgICBjb25zdCB0bXBfMTAgPSBtMDIgKiBtMTM7XHJcbiAgICAgICAgY29uc3QgdG1wXzExID0gbTEyICogbTAzO1xyXG4gICAgICAgIGNvbnN0IHRtcF8xMiA9IG0yMCAqIG0zMTtcclxuICAgICAgICBjb25zdCB0bXBfMTMgPSBtMzAgKiBtMjE7XHJcbiAgICAgICAgY29uc3QgdG1wXzE0ID0gbTEwICogbTMxO1xyXG4gICAgICAgIGNvbnN0IHRtcF8xNSA9IG0zMCAqIG0xMTtcclxuICAgICAgICBjb25zdCB0bXBfMTYgPSBtMTAgKiBtMjE7XHJcbiAgICAgICAgY29uc3QgdG1wXzE3ID0gbTIwICogbTExO1xyXG4gICAgICAgIGNvbnN0IHRtcF8xOCA9IG0wMCAqIG0zMTtcclxuICAgICAgICBjb25zdCB0bXBfMTkgPSBtMzAgKiBtMDE7XHJcbiAgICAgICAgY29uc3QgdG1wXzIwID0gbTAwICogbTIxO1xyXG4gICAgICAgIGNvbnN0IHRtcF8yMSA9IG0yMCAqIG0wMTtcclxuICAgICAgICBjb25zdCB0bXBfMjIgPSBtMDAgKiBtMTE7XHJcbiAgICAgICAgY29uc3QgdG1wXzIzID0gbTEwICogbTAxO1xyXG4gICAgICAgIGNvbnN0IHQwID0gdG1wXzAgKiBtMTEgK1xyXG4gICAgICAgICAgICB0bXBfMyAqIG0yMSArXHJcbiAgICAgICAgICAgIHRtcF80ICogbTMxIC1cclxuICAgICAgICAgICAgKHRtcF8xICogbTExICsgdG1wXzIgKiBtMjEgKyB0bXBfNSAqIG0zMSk7XHJcbiAgICAgICAgY29uc3QgdDEgPSB0bXBfMSAqIG0wMSArXHJcbiAgICAgICAgICAgIHRtcF82ICogbTIxICtcclxuICAgICAgICAgICAgdG1wXzkgKiBtMzEgLVxyXG4gICAgICAgICAgICAodG1wXzAgKiBtMDEgKyB0bXBfNyAqIG0yMSArIHRtcF84ICogbTMxKTtcclxuICAgICAgICBjb25zdCB0MiA9IHRtcF8yICogbTAxICtcclxuICAgICAgICAgICAgdG1wXzcgKiBtMTEgK1xyXG4gICAgICAgICAgICB0bXBfMTAgKiBtMzEgLVxyXG4gICAgICAgICAgICAodG1wXzMgKiBtMDEgKyB0bXBfNiAqIG0xMSArIHRtcF8xMSAqIG0zMSk7XHJcbiAgICAgICAgY29uc3QgdDMgPSB0bXBfNSAqIG0wMSArXHJcbiAgICAgICAgICAgIHRtcF84ICogbTExICtcclxuICAgICAgICAgICAgdG1wXzExICogbTIxIC1cclxuICAgICAgICAgICAgKHRtcF80ICogbTAxICsgdG1wXzkgKiBtMTEgKyB0bXBfMTAgKiBtMjEpO1xyXG4gICAgICAgIGNvbnN0IGQgPSAxLjAgLyAobTAwICogdDAgKyBtMTAgKiB0MSArIG0yMCAqIHQyICsgbTMwICogdDMpO1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIGQgKiB0MCxcclxuICAgICAgICAgICAgZCAqIHQxLFxyXG4gICAgICAgICAgICBkICogdDIsXHJcbiAgICAgICAgICAgIGQgKiB0MyxcclxuICAgICAgICAgICAgZCAqXHJcbiAgICAgICAgICAgICAgICAodG1wXzEgKiBtMTAgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF8yICogbTIwICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfNSAqIG0zMCAtXHJcbiAgICAgICAgICAgICAgICAgICAgKHRtcF8wICogbTEwICsgdG1wXzMgKiBtMjAgKyB0bXBfNCAqIG0zMCkpLFxyXG4gICAgICAgICAgICBkICpcclxuICAgICAgICAgICAgICAgICh0bXBfMCAqIG0wMCArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzcgKiBtMjAgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF84ICogbTMwIC1cclxuICAgICAgICAgICAgICAgICAgICAodG1wXzEgKiBtMDAgKyB0bXBfNiAqIG0yMCArIHRtcF85ICogbTMwKSksXHJcbiAgICAgICAgICAgIGQgKlxyXG4gICAgICAgICAgICAgICAgKHRtcF8zICogbTAwICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfNiAqIG0xMCArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzExICogbTMwIC1cclxuICAgICAgICAgICAgICAgICAgICAodG1wXzIgKiBtMDAgKyB0bXBfNyAqIG0xMCArIHRtcF8xMCAqIG0zMCkpLFxyXG4gICAgICAgICAgICBkICpcclxuICAgICAgICAgICAgICAgICh0bXBfNCAqIG0wMCArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzkgKiBtMTAgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF8xMCAqIG0yMCAtXHJcbiAgICAgICAgICAgICAgICAgICAgKHRtcF81ICogbTAwICsgdG1wXzggKiBtMTAgKyB0bXBfMTEgKiBtMjApKSxcclxuICAgICAgICAgICAgZCAqXHJcbiAgICAgICAgICAgICAgICAodG1wXzEyICogbTEzICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfMTUgKiBtMjMgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF8xNiAqIG0zMyAtXHJcbiAgICAgICAgICAgICAgICAgICAgKHRtcF8xMyAqIG0xMyArIHRtcF8xNCAqIG0yMyArIHRtcF8xNyAqIG0zMykpLFxyXG4gICAgICAgICAgICBkICpcclxuICAgICAgICAgICAgICAgICh0bXBfMTMgKiBtMDMgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF8xOCAqIG0yMyArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzIxICogbTMzIC1cclxuICAgICAgICAgICAgICAgICAgICAodG1wXzEyICogbTAzICsgdG1wXzE5ICogbTIzICsgdG1wXzIwICogbTMzKSksXHJcbiAgICAgICAgICAgIGQgKlxyXG4gICAgICAgICAgICAgICAgKHRtcF8xNCAqIG0wMyArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzE5ICogbTEzICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfMjIgKiBtMzMgLVxyXG4gICAgICAgICAgICAgICAgICAgICh0bXBfMTUgKiBtMDMgKyB0bXBfMTggKiBtMTMgKyB0bXBfMjMgKiBtMzMpKSxcclxuICAgICAgICAgICAgZCAqXHJcbiAgICAgICAgICAgICAgICAodG1wXzE3ICogbTAzICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfMjAgKiBtMTMgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF8yMyAqIG0yMyAtXHJcbiAgICAgICAgICAgICAgICAgICAgKHRtcF8xNiAqIG0wMyArIHRtcF8yMSAqIG0xMyArIHRtcF8yMiAqIG0yMykpLFxyXG4gICAgICAgICAgICBkICpcclxuICAgICAgICAgICAgICAgICh0bXBfMTQgKiBtMjIgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF8xNyAqIG0zMiArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzEzICogbTEyIC1cclxuICAgICAgICAgICAgICAgICAgICAodG1wXzE2ICogbTMyICsgdG1wXzEyICogbTEyICsgdG1wXzE1ICogbTIyKSksXHJcbiAgICAgICAgICAgIGQgKlxyXG4gICAgICAgICAgICAgICAgKHRtcF8yMCAqIG0zMiArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzEyICogbTAyICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfMTkgKiBtMjIgLVxyXG4gICAgICAgICAgICAgICAgICAgICh0bXBfMTggKiBtMjIgKyB0bXBfMjEgKiBtMzIgKyB0bXBfMTMgKiBtMDIpKSxcclxuICAgICAgICAgICAgZCAqXHJcbiAgICAgICAgICAgICAgICAodG1wXzE4ICogbTEyICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfMjMgKiBtMzIgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF8xNSAqIG0wMiAtXHJcbiAgICAgICAgICAgICAgICAgICAgKHRtcF8yMiAqIG0zMiArIHRtcF8xNCAqIG0wMiArIHRtcF8xOSAqIG0xMikpLFxyXG4gICAgICAgICAgICBkICpcclxuICAgICAgICAgICAgICAgICh0bXBfMjIgKiBtMjIgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF8xNiAqIG0wMiArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzIxICogbTEyIC1cclxuICAgICAgICAgICAgICAgICAgICAodG1wXzIwICogbTEyICsgdG1wXzIzICogbTIyICsgdG1wXzE3ICogbTAyKSksXHJcbiAgICAgICAgXTtcclxuICAgIH0sXHJcbiAgICBsb29rQXQ6IGZ1bmN0aW9uIChjYW1lcmFQb3NpdGlvbiwgdGFyZ2V0LCB1cCkge1xyXG4gICAgICAgIGNvbnN0IHpBeGlzID0gdjMubm9ybWFsaXplKHYzLmRpZmYoY2FtZXJhUG9zaXRpb24sIHRhcmdldCkpO1xyXG4gICAgICAgIGNvbnN0IHhBeGlzID0gdjMubm9ybWFsaXplKHYzLmNyb3NzKHVwLCB6QXhpcykpO1xyXG4gICAgICAgIGNvbnN0IHlBeGlzID0gdjMubm9ybWFsaXplKHYzLmNyb3NzKHpBeGlzLCB4QXhpcykpO1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIHhBeGlzWzBdLFxyXG4gICAgICAgICAgICB4QXhpc1sxXSxcclxuICAgICAgICAgICAgeEF4aXNbMl0sXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIHlBeGlzWzBdLFxyXG4gICAgICAgICAgICB5QXhpc1sxXSxcclxuICAgICAgICAgICAgeUF4aXNbMl0sXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIHpBeGlzWzBdLFxyXG4gICAgICAgICAgICB6QXhpc1sxXSxcclxuICAgICAgICAgICAgekF4aXNbMl0sXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIGNhbWVyYVBvc2l0aW9uWzBdLFxyXG4gICAgICAgICAgICBjYW1lcmFQb3NpdGlvblsxXSxcclxuICAgICAgICAgICAgY2FtZXJhUG9zaXRpb25bMl0sXHJcbiAgICAgICAgICAgIDEsXHJcbiAgICAgICAgXTtcclxuICAgIH0sXHJcbiAgICBjb3B5OiBmdW5jdGlvbiAoc3JjKSB7XHJcbiAgICAgICAgcmV0dXJuIFsuLi5zcmNdO1xyXG4gICAgfSxcclxuICAgIHRyYW5zZm9ybVBvaW50OiBmdW5jdGlvbiAobSwgdiwgZHN0KSB7XHJcbiAgICAgICAgZHN0ID0gZHN0IHx8IG5ldyBBcnJheSgzKTtcclxuICAgICAgICBjb25zdCB2MCA9IHZbMF07XHJcbiAgICAgICAgY29uc3QgdjEgPSB2WzFdO1xyXG4gICAgICAgIGNvbnN0IHYyID0gdlsyXTtcclxuICAgICAgICBjb25zdCBkID0gdjAgKiBtWzAgKiA0ICsgM10gKyB2MSAqIG1bMSAqIDQgKyAzXSArIHYyICogbVsyICogNCArIDNdICsgbVszICogNCArIDNdO1xyXG4gICAgICAgIGRzdFswXSA9XHJcbiAgICAgICAgICAgICh2MCAqIG1bMCAqIDQgKyAwXSArXHJcbiAgICAgICAgICAgICAgICB2MSAqIG1bMSAqIDQgKyAwXSArXHJcbiAgICAgICAgICAgICAgICB2MiAqIG1bMiAqIDQgKyAwXSArXHJcbiAgICAgICAgICAgICAgICBtWzMgKiA0ICsgMF0pIC9cclxuICAgICAgICAgICAgICAgIGQ7XHJcbiAgICAgICAgZHN0WzFdID1cclxuICAgICAgICAgICAgKHYwICogbVswICogNCArIDFdICtcclxuICAgICAgICAgICAgICAgIHYxICogbVsxICogNCArIDFdICtcclxuICAgICAgICAgICAgICAgIHYyICogbVsyICogNCArIDFdICtcclxuICAgICAgICAgICAgICAgIG1bMyAqIDQgKyAxXSkgL1xyXG4gICAgICAgICAgICAgICAgZDtcclxuICAgICAgICBkc3RbMl0gPVxyXG4gICAgICAgICAgICAodjAgKiBtWzAgKiA0ICsgMl0gK1xyXG4gICAgICAgICAgICAgICAgdjEgKiBtWzEgKiA0ICsgMl0gK1xyXG4gICAgICAgICAgICAgICAgdjIgKiBtWzIgKiA0ICsgMl0gK1xyXG4gICAgICAgICAgICAgICAgbVszICogNCArIDJdKSAvXHJcbiAgICAgICAgICAgICAgICBkO1xyXG4gICAgICAgIHJldHVybiBkc3Q7XHJcbiAgICB9LFxyXG4gICAgaWRlbnRpdHk6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zdCBkc3QgPSBuZXcgQXJyYXkoMTYpO1xyXG4gICAgICAgIGRzdFswXSA9IDE7XHJcbiAgICAgICAgZHN0WzFdID0gMDtcclxuICAgICAgICBkc3RbMl0gPSAwO1xyXG4gICAgICAgIGRzdFszXSA9IDA7XHJcbiAgICAgICAgZHN0WzRdID0gMDtcclxuICAgICAgICBkc3RbNV0gPSAxO1xyXG4gICAgICAgIGRzdFs2XSA9IDA7XHJcbiAgICAgICAgZHN0WzddID0gMDtcclxuICAgICAgICBkc3RbOF0gPSAwO1xyXG4gICAgICAgIGRzdFs5XSA9IDA7XHJcbiAgICAgICAgZHN0WzEwXSA9IDE7XHJcbiAgICAgICAgZHN0WzExXSA9IDA7XHJcbiAgICAgICAgZHN0WzEyXSA9IDA7XHJcbiAgICAgICAgZHN0WzEzXSA9IDA7XHJcbiAgICAgICAgZHN0WzE0XSA9IDA7XHJcbiAgICAgICAgZHN0WzE1XSA9IDE7XHJcbiAgICAgICAgcmV0dXJuIGRzdDtcclxuICAgIH0sXHJcbiAgICBtM1RvbTQ6IGZ1bmN0aW9uIChtKSB7XHJcbiAgICAgICAgY29uc3QgZHN0ID0gbmV3IEFycmF5KDE2KTtcclxuICAgICAgICBkc3RbMF0gPSBtWzBdO1xyXG4gICAgICAgIGRzdFsxXSA9IG1bMV07XHJcbiAgICAgICAgZHN0WzJdID0gbVsyXTtcclxuICAgICAgICBkc3RbM10gPSAwO1xyXG4gICAgICAgIGRzdFs0XSA9IG1bM107XHJcbiAgICAgICAgZHN0WzVdID0gbVs0XTtcclxuICAgICAgICBkc3RbNl0gPSBtWzVdO1xyXG4gICAgICAgIGRzdFs3XSA9IDA7XHJcbiAgICAgICAgZHN0WzhdID0gbVs2XTtcclxuICAgICAgICBkc3RbOV0gPSBtWzddO1xyXG4gICAgICAgIGRzdFsxMF0gPSBtWzhdO1xyXG4gICAgICAgIGRzdFsxMV0gPSAwO1xyXG4gICAgICAgIGRzdFsxMl0gPSAwO1xyXG4gICAgICAgIGRzdFsxM10gPSAwO1xyXG4gICAgICAgIGRzdFsxNF0gPSAwO1xyXG4gICAgICAgIGRzdFsxNV0gPSAxO1xyXG4gICAgICAgIHJldHVybiBkc3Q7XHJcbiAgICB9LFxyXG4gICAgbTRUb20zOiBmdW5jdGlvbiAobSkge1xyXG4gICAgICAgIGNvbnN0IGRzdCA9IG5ldyBBcnJheSg5KTtcclxuICAgICAgICBkc3RbMF0gPSBtWzBdO1xyXG4gICAgICAgIGRzdFsxXSA9IG1bMV07XHJcbiAgICAgICAgZHN0WzJdID0gbVsyXTtcclxuICAgICAgICBkc3RbM10gPSBtWzRdO1xyXG4gICAgICAgIGRzdFs0XSA9IG1bNV07XHJcbiAgICAgICAgZHN0WzVdID0gbVs2XTtcclxuICAgICAgICBkc3RbNl0gPSBtWzhdO1xyXG4gICAgICAgIGRzdFs3XSA9IG1bOV07XHJcbiAgICAgICAgZHN0WzhdID0gbVsxMF07XHJcbiAgICAgICAgcmV0dXJuIGRzdDtcclxuICAgIH0sXHJcbiAgICB0b1N0cmluZyhtKSB7XHJcbiAgICAgICAgcmV0dXJuIG0ucmVkdWNlKChhY2MsIGVsLCBpZHgpID0+IGlkeCAlIDQgPT09IDBcclxuICAgICAgICAgICAgPyAoYWNjICs9IGBcXG4ke2VsLnRvU3RyaW5nKCl9YClcclxuICAgICAgICAgICAgOiAoYWNjICs9IGAgJHtlbC50b1N0cmluZygpfWApLCBcIlwiKTtcclxuICAgIH0sXHJcbiAgICB0cmFuc3Bvc2U6IGZ1bmN0aW9uIChtKSB7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgbVswXSxcclxuICAgICAgICAgICAgbVs0XSxcclxuICAgICAgICAgICAgbVs4XSxcclxuICAgICAgICAgICAgbVsxMl0sXHJcbiAgICAgICAgICAgIG1bMV0sXHJcbiAgICAgICAgICAgIG1bNV0sXHJcbiAgICAgICAgICAgIG1bOV0sXHJcbiAgICAgICAgICAgIG1bMTNdLFxyXG4gICAgICAgICAgICBtWzJdLFxyXG4gICAgICAgICAgICBtWzZdLFxyXG4gICAgICAgICAgICBtWzEwXSxcclxuICAgICAgICAgICAgbVsxNF0sXHJcbiAgICAgICAgICAgIG1bM10sXHJcbiAgICAgICAgICAgIG1bN10sXHJcbiAgICAgICAgICAgIG1bMTFdLFxyXG4gICAgICAgICAgICBtWzE1XSxcclxuICAgICAgICBdO1xyXG4gICAgfSxcclxuICAgIGZyb21RdWF0ZXJuaW9uOiAocSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGExMSA9IDEgLSAyICogKHFbMV0gKiBxWzFdICsgcVsyXSAqIHFbMl0pO1xyXG4gICAgICAgIGNvbnN0IGExMiA9IDIgKiAocVswXSAqIHFbMV0gLSBxWzJdICogcVszXSk7XHJcbiAgICAgICAgY29uc3QgYTEzID0gMiAqIChxWzBdICogcVsyXSArIHFbMV0gKiBxWzNdKTtcclxuICAgICAgICBjb25zdCBhMjEgPSAyICogKHFbMF0gKiBxWzFdICsgcVsyXSAqIHFbM10pO1xyXG4gICAgICAgIGNvbnN0IGEyMiA9IDEgLSAyICogKHFbMF0gKiBxWzBdICsgcVsyXSAqIHFbMl0pO1xyXG4gICAgICAgIGNvbnN0IGEyMyA9IDIgKiAocVsxXSAqIHFbMl0gLSBxWzBdICogcVszXSk7XHJcbiAgICAgICAgY29uc3QgYTMxID0gMiAqIChxWzBdICogcVsyXSAtIHFbMV0gKiBxWzNdKTtcclxuICAgICAgICBjb25zdCBhMzIgPSAyICogKHFbMV0gKiBxWzJdICsgcVswXSAqIHFbM10pO1xyXG4gICAgICAgIGNvbnN0IGEzMyA9IDEgLSAyICogKHFbMF0gKiBxWzBdICsgcVsxXSAqIHFbMV0pO1xyXG4gICAgICAgIHJldHVybiBbYTExLCBhMTIsIGExMywgMCwgYTIxLCBhMjIsIGEyMywgMCwgYTMxLCBhMzIsIGEzMywgMCwgMCwgMCwgMCwgMV07XHJcbiAgICB9LFxyXG4gICAgLypcclxuICAgIHJvdGF0aW9uKHgsIHksIHopIHtcclxuICAgICAgcmV0dXJuIHRoaXMueFJvdGF0ZSh0aGlzLnlSb3RhdGUodGhpcy56Um90YXRpb24oeiksIHkpLCB4KTtcclxuICAgIH0sXHJcbiAgICByb3RhdGlvbkZyb21Ob3JtYWwobikge1xyXG4gICAgICByZXR1cm4gdGhpcy5yb3RhdGlvbihNYXRoLmFjb3MoblsxXSksIE1hdGguYWNvcyhuWzJdKSwgTWF0aC5hY29zKG5bMF0pKTtcclxuICAgIH0sKi9cclxuICAgIGRldGVybWluYXRlKG0pIHtcclxuICAgICAgICBjb25zdCBtMDAgPSBtWzAgKiA0ICsgMF07XHJcbiAgICAgICAgY29uc3QgbTAxID0gbVswICogNCArIDFdO1xyXG4gICAgICAgIGNvbnN0IG0wMiA9IG1bMCAqIDQgKyAyXTtcclxuICAgICAgICBjb25zdCBtMDMgPSBtWzAgKiA0ICsgM107XHJcbiAgICAgICAgY29uc3QgbTEwID0gbVsxICogNCArIDBdO1xyXG4gICAgICAgIGNvbnN0IG0xMSA9IG1bMSAqIDQgKyAxXTtcclxuICAgICAgICBjb25zdCBtMTIgPSBtWzEgKiA0ICsgMl07XHJcbiAgICAgICAgY29uc3QgbTEzID0gbVsxICogNCArIDNdO1xyXG4gICAgICAgIGNvbnN0IG0yMCA9IG1bMiAqIDQgKyAwXTtcclxuICAgICAgICBjb25zdCBtMjEgPSBtWzIgKiA0ICsgMV07XHJcbiAgICAgICAgY29uc3QgbTIyID0gbVsyICogNCArIDJdO1xyXG4gICAgICAgIGNvbnN0IG0yMyA9IG1bMiAqIDQgKyAzXTtcclxuICAgICAgICBjb25zdCBtMzAgPSBtWzMgKiA0ICsgMF07XHJcbiAgICAgICAgY29uc3QgbTMxID0gbVszICogNCArIDFdO1xyXG4gICAgICAgIGNvbnN0IG0zMiA9IG1bMyAqIDQgKyAyXTtcclxuICAgICAgICBjb25zdCBtMzMgPSBtWzMgKiA0ICsgM107XHJcbiAgICAgICAgY29uc3QgdG1wXzAgPSBtMjIgKiBtMzM7XHJcbiAgICAgICAgY29uc3QgdG1wXzEgPSBtMzIgKiBtMjM7XHJcbiAgICAgICAgY29uc3QgdG1wXzIgPSBtMTIgKiBtMzM7XHJcbiAgICAgICAgY29uc3QgdG1wXzMgPSBtMzIgKiBtMTM7XHJcbiAgICAgICAgY29uc3QgdG1wXzQgPSBtMTIgKiBtMjM7XHJcbiAgICAgICAgY29uc3QgdG1wXzUgPSBtMjIgKiBtMTM7XHJcbiAgICAgICAgY29uc3QgdG1wXzYgPSBtMDIgKiBtMzM7XHJcbiAgICAgICAgY29uc3QgdG1wXzcgPSBtMzIgKiBtMDM7XHJcbiAgICAgICAgY29uc3QgdG1wXzggPSBtMDIgKiBtMjM7XHJcbiAgICAgICAgY29uc3QgdG1wXzkgPSBtMjIgKiBtMDM7XHJcbiAgICAgICAgY29uc3QgdG1wXzEwID0gbTAyICogbTEzO1xyXG4gICAgICAgIGNvbnN0IHRtcF8xMSA9IG0xMiAqIG0wMztcclxuICAgICAgICBjb25zdCB0MCA9IHRtcF8wICogbTExICtcclxuICAgICAgICAgICAgdG1wXzMgKiBtMjEgK1xyXG4gICAgICAgICAgICB0bXBfNCAqIG0zMSAtXHJcbiAgICAgICAgICAgICh0bXBfMSAqIG0xMSArIHRtcF8yICogbTIxICsgdG1wXzUgKiBtMzEpO1xyXG4gICAgICAgIGNvbnN0IHQxID0gdG1wXzEgKiBtMDEgK1xyXG4gICAgICAgICAgICB0bXBfNiAqIG0yMSArXHJcbiAgICAgICAgICAgIHRtcF85ICogbTMxIC1cclxuICAgICAgICAgICAgKHRtcF8wICogbTAxICsgdG1wXzcgKiBtMjEgKyB0bXBfOCAqIG0zMSk7XHJcbiAgICAgICAgY29uc3QgdDIgPSB0bXBfMiAqIG0wMSArXHJcbiAgICAgICAgICAgIHRtcF83ICogbTExICtcclxuICAgICAgICAgICAgdG1wXzEwICogbTMxIC1cclxuICAgICAgICAgICAgKHRtcF8zICogbTAxICsgdG1wXzYgKiBtMTEgKyB0bXBfMTEgKiBtMzEpO1xyXG4gICAgICAgIGNvbnN0IHQzID0gdG1wXzUgKiBtMDEgK1xyXG4gICAgICAgICAgICB0bXBfOCAqIG0xMSArXHJcbiAgICAgICAgICAgIHRtcF8xMSAqIG0yMSAtXHJcbiAgICAgICAgICAgICh0bXBfNCAqIG0wMSArIHRtcF85ICogbTExICsgdG1wXzEwICogbTIxKTtcclxuICAgICAgICByZXR1cm4gMS4wIC8gKG0wMCAqIHQwICsgbTEwICogdDEgKyBtMjAgKiB0MiArIG0zMCAqIHQzKTtcclxuICAgIH0sXHJcbiAgICBkZWNvbXBvc2UobSkge1xyXG4gICAgICAgIGxldCBzeCA9IHYzLm5vcm0obS5zbGljZSgwLCAzKSk7XHJcbiAgICAgICAgY29uc3Qgc3kgPSB2My5ub3JtKG0uc2xpY2UoNCwgNykpO1xyXG4gICAgICAgIGNvbnN0IHN6ID0gdjMubm9ybShtLnNsaWNlKDgsIDExKSk7XHJcbiAgICAgICAgY29uc3QgZGV0ID0gdGhpcy5kZXRlcm1pbmF0ZShtKTtcclxuICAgICAgICBpZiAoZGV0IDwgMCkge1xyXG4gICAgICAgICAgICBzeCA9IC1zeDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdHJhbnNsYXRpb24gPSBuZXcgQXJyYXkoMyk7XHJcbiAgICAgICAgY29uc3Qgc2NhbGUgPSBuZXcgQXJyYXkoMyk7XHJcbiAgICAgICAgY29uc3QgUm1hdHJpeCA9IFsuLi5tXTtcclxuICAgICAgICB0cmFuc2xhdGlvblswXSA9IG1bMTJdO1xyXG4gICAgICAgIHRyYW5zbGF0aW9uWzFdID0gbVsxM107XHJcbiAgICAgICAgdHJhbnNsYXRpb25bMl0gPSBtWzE0XTtcclxuICAgICAgICBjb25zdCBpbnZTWCA9IDEgLyBzeDtcclxuICAgICAgICBjb25zdCBpbnZTWSA9IDEgLyBzeTtcclxuICAgICAgICBjb25zdCBpbnZTWiA9IDEgLyBzejtcclxuICAgICAgICBSbWF0cml4WzBdICo9IGludlNYO1xyXG4gICAgICAgIFJtYXRyaXhbMV0gKj0gaW52U1g7XHJcbiAgICAgICAgUm1hdHJpeFsyXSAqPSBpbnZTWDtcclxuICAgICAgICBSbWF0cml4WzRdICo9IGludlNZO1xyXG4gICAgICAgIFJtYXRyaXhbNV0gKj0gaW52U1k7XHJcbiAgICAgICAgUm1hdHJpeFs2XSAqPSBpbnZTWTtcclxuICAgICAgICBSbWF0cml4WzhdICo9IGludlNaO1xyXG4gICAgICAgIFJtYXRyaXhbOV0gKj0gaW52U1o7XHJcbiAgICAgICAgUm1hdHJpeFsxMF0gKj0gaW52U1o7XHJcbiAgICAgICAgc2NhbGVbMF0gPSBzeDtcclxuICAgICAgICBzY2FsZVsxXSA9IHN5O1xyXG4gICAgICAgIHNjYWxlWzJdID0gc3o7XHJcbiAgICAgICAgcmV0dXJuIHsgdHJhbnNsYXRpb24sIFJtYXRyaXgsIHNjYWxlIH07XHJcbiAgICB9LFxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBtNDtcclxuIiwiY29uc3QgZG90ID0gKGEsIGIpID0+IGFbMF0gKiBiWzBdICsgYVsxXSAqIGJbMV0gKyBhWzJdICogYlsyXTtcclxuY29uc3QgY3Jvc3MgPSAoYSwgYikgPT4gW1xyXG4gICAgYVsxXSAqIGJbMl0gLSBiWzFdICogYVsyXSxcclxuICAgIGFbMl0gKiBiWzBdIC0gYlsyXSAqIGFbMF0sXHJcbiAgICBhWzBdICogYlsxXSAtIGJbMF0gKiBhWzFdLFxyXG5dO1xyXG5jb25zdCBzY2FsZSA9IChhLCBzY2FsYXIpID0+IFthWzBdICogc2NhbGFyLCBhWzFdICogc2NhbGFyLCBhWzJdICogc2NhbGFyXTtcclxuY29uc3Qgc3VtID0gKGEsIGIpID0+IFthWzBdICsgYlswXSwgYVsxXSArIGJbMV0sIGFbMl0gKyBiWzJdXTtcclxuY29uc3QgZGlmZiA9IChhLCBiKSA9PiBbYVswXSAtIGJbMF0sIGFbMV0gLSBiWzFdLCBhWzJdIC0gYlsyXV07XHJcbmNvbnN0IG5vcm0gPSAoYSkgPT4gTWF0aC5zcXJ0KGFbMF0gKiBhWzBdICsgYVsxXSAqIGFbMV0gKyBhWzJdICogYVsyXSk7XHJcbmNvbnN0IG5vcm1TcSA9IChhKSA9PiBhWzBdICogYVswXSArIGFbMV0gKiBhWzFdICsgYVsyXSAqIGFbMl07XHJcbmNvbnN0IG5vcm1hbGl6ZSA9IChhKSA9PiB7XHJcbiAgICBjb25zdCBsZW5ndGggPSBub3JtKGEpO1xyXG4gICAgaWYgKGxlbmd0aCA9PT0gMClcclxuICAgICAgICByZXR1cm4gYTtcclxuICAgIHJldHVybiBbYVswXSAvIGxlbmd0aCwgYVsxXSAvIGxlbmd0aCwgYVsyXSAvIGxlbmd0aF07XHJcbn07XHJcbmNvbnN0IGlzTnVsbCA9IChhKSA9PiBhWzBdICogYVswXSArIGFbMV0gKiBhWzFdICsgYVsyXSAqIGFbMl0gPT09IDA7XHJcbmNvbnN0IGlzRXF1YWwgPSAoYSwgYikgPT4gYVswXSA9PSBiWzBdICYmIGFbMV0gPT0gYlsxXSAmJiBhWzJdID09IGJbMl07XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIHN1bSxcclxuICAgIGRpZmYsXHJcbiAgICBzY2FsZSxcclxuICAgIGRvdCxcclxuICAgIGNyb3NzLFxyXG4gICAgbm9ybSxcclxuICAgIG5vcm1TcSxcclxuICAgIG5vcm1hbGl6ZSxcclxuICAgIGlzRXF1YWwsXHJcbiAgICBpc051bGwsXHJcbn07XHJcbiIsImNvbnN0IGRlZmF1bHRVdnMgPSBbXHJcbiAgICAvLyBGcm9udFxyXG4gICAgMC4wLCAwLjAsIDAuMjUsIDAuMCwgMS4wICogMC4yNSwgMS4wICogMC4yNSwgMC4wLCAxLjAgKiAwLjI1LFxyXG4gICAgLy8gQmFja1xyXG4gICAgMC4wLCAwLjAsIDEuMCAqIDAuMjUsIDAuMCwgMS4wICogMC4yNSwgMS4wICogMC4yNSwgMC4wLCAxLjAgKiAwLjI1LFxyXG4gICAgLy8gVG9wXHJcbiAgICAwLjAsIDAuMCwgMS4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDEuMCxcclxuICAgIC8vIEJvdHRvbVxyXG4gICAgMC4wLCAwLjAsIDEuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAxLjAsXHJcbiAgICAvLyBSaWdodFxyXG4gICAgMC4wLCAwLjAsIDEuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAxLjAsXHJcbiAgICAvLyBMZWZ0XHJcbiAgICAwLjAsIDAuMCwgMS4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDEuMCxcclxuXTtcclxuZXhwb3J0IGNvbnN0IGdldEJveFVWcyA9IChudW1UaWxlc1gsIG51bVRpbGVzWSkgPT4ge1xyXG4gICAgY29uc3QgYXJyID0gWzAuMCwgMC4wLCAxLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMS4wLF07XHJcbiAgICBjb25zdCB0aWxlWCA9IDEgLyBudW1UaWxlc1g7XHJcbiAgICBjb25zdCBib3R0b20gPSBhcnIubWFwKChfLCBpKSA9PiBpICUgMiA/IGFycltpXSAqIDAuMjUgKyAwLjI1IDogYXJyW2ldICogdGlsZVggKyA1ICogdGlsZVgpO1xyXG4gICAgY29uc3QgdG9wID0gYm90dG9tLm1hcCgoXywgaSkgPT4gaSAlIDIgPyBib3R0b21baV0gKyAwLjI1IDogYm90dG9tW2ldKTtcclxuICAgIGNvbnN0IHNpZGUgPSBib3R0b20ubWFwKChfLCBpKSA9PiBpICUgMiA/IGJvdHRvbVtpXSArIDAuNSA6IGJvdHRvbVtpXSk7XHJcbiAgICByZXR1cm4gbmV3IEZsb2F0MzJBcnJheShbXHJcbiAgICAgICAgLy8gRnJvbnRcclxuICAgICAgICAuLi5zaWRlLFxyXG4gICAgICAgIC8vIEJhY2tcclxuICAgICAgICAuLi5zaWRlLFxyXG4gICAgICAgIC8vIFRvcFxyXG4gICAgICAgIC4uLnRvcCxcclxuICAgICAgICAvLyBCb3R0b21cclxuICAgICAgICAuLi5ib3R0b20sXHJcbiAgICAgICAgLy8gUmlnaHRcclxuICAgICAgICAuLi5zaWRlLFxyXG4gICAgICAgIC8vIExlZnRcclxuICAgICAgICAuLi5zaWRlLFxyXG4gICAgXSk7XHJcbn07XHJcbiIsImNvbnN0IHZlcnQgPSBgI3ZlcnNpb24gMzAwIGVzXHJcbiBcclxubGF5b3V0KGxvY2F0aW9uID0gMCkgaW4gdmVjNCBhX3Bvc2l0aW9uO1xyXG5sYXlvdXQobG9jYXRpb24gPSAxKSBpbiB2ZWMzIGFfbm9ybWFsO1xyXG5sYXlvdXQobG9jYXRpb24gPSA0KSBpbiB2ZWMyIGFfdGV4Y29vcmQ7XHJcblxyXG51bmlmb3JtIG1hdDQgdV9tYXRyaXg7XHJcbnVuaWZvcm0gbWF0NCB1X3dvcmxkVmlld1Byb2plY3Rpb247XHJcbnVuaWZvcm0gdmVjMyB1X2xpZ2h0V29ybGRQb3NpdGlvbjtcclxudW5pZm9ybSB2ZWMzIHVfdmlld1dvcmxkUG9zaXRpb247XHJcblxyXG5vdXQgdmVjMyB2X25vcm1hbDtcclxub3V0IHZlYzMgdl9zdXJmYWNlVG9MaWdodDtcclxub3V0IHZlYzMgdl9zdXJmYWNlVG9WaWV3O1xyXG5vdXQgdmVjMiB2X3RleGNvb3JkO1xyXG5cclxudm9pZCBtYWluKCkge1xyXG4gICAgXHJcbiAgICBnbF9Qb3NpdGlvbiA9IHVfd29ybGRWaWV3UHJvamVjdGlvbiAqIGFfcG9zaXRpb247XHJcbiAgICBcclxuICAgIHZlYzMgc3VyZmFjZVdvcmxkUG9zaXRpb24gPSAodV9tYXRyaXggKiBhX3Bvc2l0aW9uKS54eXo7XHJcbiAgICBcclxuICAgIHZfc3VyZmFjZVRvTGlnaHQgPSB1X2xpZ2h0V29ybGRQb3NpdGlvbiAtIHN1cmZhY2VXb3JsZFBvc2l0aW9uO1xyXG5cclxuICAgIHZfbm9ybWFsID0gbWF0MyggIHVfbWF0cml4ICkgKiBhX25vcm1hbDtcclxuICAgIFxyXG4gICAgdl9zdXJmYWNlVG9WaWV3ID0gdV92aWV3V29ybGRQb3NpdGlvbiAtIHN1cmZhY2VXb3JsZFBvc2l0aW9uO1xyXG5cclxuICAgIHZfdGV4Y29vcmQgPSBhX3RleGNvb3JkO1xyXG4gICAgICBcclxufWA7XHJcbmNvbnN0IGZyYWcgPSBgI3ZlcnNpb24gMzAwIGVzXHJcbnByZWNpc2lvbiBoaWdocCBmbG9hdDtcclxuIFxyXG5cclxuXHJcblxyXG5pbiB2ZWMzIHZfbm9ybWFsO1xyXG5pbiB2ZWMzIHZfc3VyZmFjZVRvVmlldztcclxuaW4gdmVjMyB2X3N1cmZhY2VUb0xpZ2h0O1xyXG5cclxuXHJcbi8vdW5pZm9ybSBzYW1wbGVyMkQgdV90ZXh0dXJlMTtcclxudW5pZm9ybSBmbG9hdCB1X3NoaW5pbmVzcztcclxudW5pZm9ybSB2ZWM0IHVfY29sb3I7XHJcbnVuaWZvcm0gdmVjNCB1X2FtYmllbnRMaWdodDtcclxuXHJcbmluIHZlYzIgdl90ZXhjb29yZDtcclxuXHJcbi8vIFRoZSB0ZXh0dXJlLlxyXG51bmlmb3JtIHNhbXBsZXIyRCB1X3RleHR1cmU7XHJcblxyXG5vdXQgdmVjNCBvdXRDb2xvcjtcclxuXHJcblxyXG52b2lkIG1haW4oKSB7XHJcbiAgXHJcbiAgdmVjMyBzdXJmYWNlVG9MaWdodERpcmVjdGlvbiA9IG5vcm1hbGl6ZSh2X3N1cmZhY2VUb0xpZ2h0KTtcclxuICB2ZWMzIHN1cmZhY2VUb1ZpZXdEaXJlY3Rpb24gPSBub3JtYWxpemUodl9zdXJmYWNlVG9WaWV3KTtcclxuICB2ZWMzIGhhbGZWZWN0b3IgPSBub3JtYWxpemUoc3VyZmFjZVRvTGlnaHREaXJlY3Rpb24gKyBzdXJmYWNlVG9WaWV3RGlyZWN0aW9uKTtcclxuXHJcbiAgdmVjMyBub3JtYWwgPSBub3JtYWxpemUodl9ub3JtYWwpO1xyXG4gIGZsb2F0IGxpZ2h0ID0gZG90KG5vcm1hbCwgc3VyZmFjZVRvTGlnaHREaXJlY3Rpb24pO1xyXG4gIGZsb2F0IHNwZWN1bGFyID0gMC4wO1xyXG4gIGlmIChsaWdodCA+IDAuMCkge1xyXG4gICAgc3BlY3VsYXIgPSBwb3coZG90KG5vcm1hbCwgaGFsZlZlY3RvciksIHVfc2hpbmluZXNzKTtcclxuICB9XHJcbiAgXHJcbiAgb3V0Q29sb3IgPSB0ZXh0dXJlKHVfdGV4dHVyZSwgdl90ZXhjb29yZCk7XHJcbiAgb3V0Q29sb3IucmdiICo9IGxpZ2h0O1xyXG4gIG91dENvbG9yLnJnYiArPSBzcGVjdWxhcjtcclxuXHJcbiAgb3V0Q29sb3IucmdiICs9IHVfYW1iaWVudExpZ2h0LnJnYiAqMC4zO1xyXG4gIFxyXG59YDtcclxuZXhwb3J0IGRlZmF1bHQgeyB2ZXJ0LCBmcmFnIH07XHJcbiIsImltcG9ydCB7IHYzLCBtMywgQUFCQiwgbTQgfSBmcm9tIFwicm9tYW5wcHBtYXRoXCI7XHJcbmNvbnN0IHhBeGlzID0gWzEsIDAsIDBdO1xyXG5jb25zdCB5QXhpcyA9IFswLCAxLCAwXTtcclxuY29uc3QgekF4aXMgPSBbMCwgMCwgMV07XHJcbmNvbnN0IHhBeGlzTmVnYXRpdmUgPSB2My5zY2FsZSh4QXhpcywgLTEpO1xyXG5jb25zdCB5QXhpc05lZ2F0aXZlID0gdjMuc2NhbGUoeUF4aXMsIC0xKTtcclxuY29uc3QgekF4aXNOZWdhdGl2ZSA9IHYzLnNjYWxlKHpBeGlzLCAtMSk7XHJcbmNsYXNzIENvbGxpZGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuUm1hdHJpeCA9IG0zLmlkZW50aXR5KCk7XHJcbiAgICAgICAgdGhpcy5SbWF0cml4SW52ZXJzZSA9IG0zLmlkZW50aXR5KCk7XHJcbiAgICAgICAgdGhpcy5wb3MgPSBbMCwgMCwgMF07XHJcbiAgICAgICAgdGhpcy50eXBlID0gXCJwb2ludFwiO1xyXG4gICAgfVxyXG4gICAgdHJhbnNsYXRlKHYpIHtcclxuICAgICAgICB0aGlzLnBvcyA9IHYzLnN1bSh0aGlzLnBvcywgdik7XHJcbiAgICB9XHJcbiAgICBzZXRUcmFuc2xhdGlvbih0cmFuc2xhdGlvbikge1xyXG4gICAgICAgIHRoaXMucG9zID0gWy4uLnRyYW5zbGF0aW9uXTtcclxuICAgIH1cclxuICAgIHJvdGF0ZShyKSB7XHJcbiAgICAgICAgdGhpcy5SbWF0cml4ID0gbTMueFJvdGF0ZSh0aGlzLlJtYXRyaXgsIHJbMF0pO1xyXG4gICAgICAgIHRoaXMuUm1hdHJpeCA9IG0zLnlSb3RhdGUodGhpcy5SbWF0cml4LCByWzFdKTtcclxuICAgICAgICB0aGlzLlJtYXRyaXggPSBtMy56Um90YXRlKHRoaXMuUm1hdHJpeCwgclsyXSk7XHJcbiAgICAgICAgdGhpcy5SbWF0cml4SW52ZXJzZSA9IG0zLnRyYW5zcG9zZSh0aGlzLlJtYXRyaXgpO1xyXG4gICAgfVxyXG4gICAgc2V0Um90YXRpb24ocikge1xyXG4gICAgICAgIHRoaXMuUm1hdHJpeCA9IG0zLnhSb3RhdGlvbihyWzBdKTtcclxuICAgICAgICB0aGlzLlJtYXRyaXggPSBtMy55Um90YXRlKHRoaXMuUm1hdHJpeCwgclsxXSk7XHJcbiAgICAgICAgdGhpcy5SbWF0cml4ID0gbTMuelJvdGF0ZSh0aGlzLlJtYXRyaXgsIHJbMl0pO1xyXG4gICAgICAgIHRoaXMuUm1hdHJpeEludmVyc2UgPSBtMy50cmFuc3Bvc2UodGhpcy5SbWF0cml4KTtcclxuICAgIH1cclxuICAgIGdldEFBQkIoKSB7XHJcbiAgICAgICAgY29uc3QgbWF4WCA9IHRoaXMuc3VwcG9ydCh4QXhpcylbMF07XHJcbiAgICAgICAgY29uc3QgbWF4WSA9IHRoaXMuc3VwcG9ydCh5QXhpcylbMV07XHJcbiAgICAgICAgY29uc3QgbWF4WiA9IHRoaXMuc3VwcG9ydCh6QXhpcylbMl07XHJcbiAgICAgICAgY29uc3QgbWluWCA9IHRoaXMuc3VwcG9ydCh4QXhpc05lZ2F0aXZlKVswXTtcclxuICAgICAgICBjb25zdCBtaW5ZID0gdGhpcy5zdXBwb3J0KHlBeGlzTmVnYXRpdmUpWzFdO1xyXG4gICAgICAgIGNvbnN0IG1pblogPSB0aGlzLnN1cHBvcnQoekF4aXNOZWdhdGl2ZSlbMl07XHJcbiAgICAgICAgcmV0dXJuIG5ldyBBQUJCKFttaW5YLCBtaW5ZLCBtaW5aXSwgW21heFgsIG1heFksIG1heFpdKTtcclxuICAgIH1cclxuICAgIHNldFJtYXRyaXgobWF0cml4KSB7XHJcbiAgICAgICAgdGhpcy5SbWF0cml4ID0gWy4uLm1hdHJpeF07XHJcbiAgICAgICAgdGhpcy5SbWF0cml4SW52ZXJzZSA9IG0zLnRyYW5zcG9zZShtYXRyaXgpO1xyXG4gICAgfVxyXG4gICAgZ2V0TTQoKSB7XHJcbiAgICAgICAgY29uc3QgbSA9IG00Lm0zVG9tNCh0aGlzLlJtYXRyaXgpO1xyXG4gICAgICAgIG1bMTJdID0gdGhpcy5wb3NbMF07XHJcbiAgICAgICAgbVsxM10gPSB0aGlzLnBvc1sxXTtcclxuICAgICAgICBtWzE0XSA9IHRoaXMucG9zWzJdO1xyXG4gICAgICAgIG1bMTVdID0gMTtcclxuICAgICAgICByZXR1cm4gbTtcclxuICAgIH1cclxuICAgIGxvY2FsVG9HbG9iYWwodikge1xyXG4gICAgICAgIGxldCBnbG9iYWwgPSBtMy50cmFuc2Zvcm1Qb2ludCh0aGlzLlJtYXRyaXgsIHYpO1xyXG4gICAgICAgIHJldHVybiB2My5zdW0odGhpcy5wb3MsIGdsb2JhbCk7XHJcbiAgICB9XHJcbiAgICBnZXRDbG9zZXN0RmFjZUJ5Tm9ybWFsKG5vcm1hbCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHZlcnRpY2VzOiBbdGhpcy5wb3NdLFxyXG4gICAgICAgICAgICBub3JtYWw6IHYzLnNjYWxlKG5vcm1hbCwgLTEpLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBnZXRJbnZlcnNlSW5lcnRpYVRlbnNvcihtYXNzKSB7XHJcbiAgICAgICAgcmV0dXJuIG0zLmlkZW50aXR5KCk7XHJcbiAgICB9XHJcbiAgICBzdXBwb3J0KGRpcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvcztcclxuICAgIH1cclxufVxyXG5jbGFzcyBCb3ggZXh0ZW5kcyBDb2xsaWRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihhID0gMSwgYiA9IDEsIGMgPSAxKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLm1pbiA9IFstYSAvIDIsIC1iIC8gMiwgLWMgLyAyXTtcclxuICAgICAgICB0aGlzLm1heCA9IFthIC8gMiwgYiAvIDIsIGMgLyAyXTtcclxuICAgIH1cclxuICAgIGdldEFBQkIoKSB7XHJcbiAgICAgICAgY29uc3QgbWF4WCA9IHRoaXMuc3VwcG9ydCh4QXhpcylbMF07XHJcbiAgICAgICAgY29uc3QgbWF4WSA9IHRoaXMuc3VwcG9ydCh5QXhpcylbMV07XHJcbiAgICAgICAgY29uc3QgbWF4WiA9IHRoaXMuc3VwcG9ydCh6QXhpcylbMl07XHJcbiAgICAgICAgY29uc3QgbWluWCA9IHRoaXMuc3VwcG9ydCh4QXhpc05lZ2F0aXZlKVswXTtcclxuICAgICAgICBjb25zdCBtaW5ZID0gdGhpcy5zdXBwb3J0KHlBeGlzTmVnYXRpdmUpWzFdO1xyXG4gICAgICAgIGNvbnN0IG1pblogPSB0aGlzLnN1cHBvcnQoekF4aXNOZWdhdGl2ZSlbMl07XHJcbiAgICAgICAgcmV0dXJuIG5ldyBBQUJCKFttaW5YLCBtaW5ZLCBtaW5aXSwgW21heFgsIG1heFksIG1heFpdKTtcclxuICAgIH1cclxuICAgIHN1cHBvcnQoZGlyKSB7XHJcbiAgICAgICAgY29uc3QgX2RpciA9IG0zLnRyYW5zZm9ybVBvaW50KHRoaXMuUm1hdHJpeEludmVyc2UsIGRpcik7XHJcbiAgICAgICAgY29uc3QgcmVzID0gWzAsIDAsIDBdO1xyXG4gICAgICAgIHJlc1swXSA9IF9kaXJbMF0gPiAwID8gdGhpcy5tYXhbMF0gOiB0aGlzLm1pblswXTtcclxuICAgICAgICByZXNbMV0gPSBfZGlyWzFdID4gMCA/IHRoaXMubWF4WzFdIDogdGhpcy5taW5bMV07XHJcbiAgICAgICAgcmVzWzJdID0gX2RpclsyXSA+IDAgPyB0aGlzLm1heFsyXSA6IHRoaXMubWluWzJdO1xyXG4gICAgICAgIGNvbnN0IHN1cCA9IG0zLnRyYW5zZm9ybVBvaW50KHRoaXMuUm1hdHJpeCwgcmVzKTtcclxuICAgICAgICByZXR1cm4gdjMuc3VtKHN1cCwgdGhpcy5wb3MpO1xyXG4gICAgfVxyXG4gICAgZ2V0SW52ZXJzZUluZXJ0aWFUZW5zb3IobWFzcykge1xyXG4gICAgICAgIGNvbnN0IGkxID0gKG1hc3MgLyAxMikgKiAodGhpcy5tYXhbMV0gKiB0aGlzLm1heFsxXSArIHRoaXMubWF4WzJdICogdGhpcy5tYXhbMl0pO1xyXG4gICAgICAgIGNvbnN0IGkyID0gKG1hc3MgLyAxMikgKiAodGhpcy5tYXhbMF0gKiB0aGlzLm1heFswXSArIHRoaXMubWF4WzJdICogdGhpcy5tYXhbMl0pO1xyXG4gICAgICAgIGNvbnN0IGkzID0gKG1hc3MgLyAxMikgKiAodGhpcy5tYXhbMF0gKiB0aGlzLm1heFswXSArIHRoaXMubWF4WzFdICogdGhpcy5tYXhbMV0pO1xyXG4gICAgICAgIGNvbnN0IG0gPSBtMy5tdWx0aXBseShtMy5tdWx0aXBseSh0aGlzLlJtYXRyaXhJbnZlcnNlLCBbXHJcbiAgICAgICAgICAgIDEgLyBpMSxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMSAvIGkyLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAxIC8gaTMsXHJcbiAgICAgICAgXSksIHRoaXMuUm1hdHJpeCk7XHJcbiAgICAgICAgcmV0dXJuIG07XHJcbiAgICB9XHJcbiAgICBnZXRNNCgpIHtcclxuICAgICAgICBjb25zdCBtID0gbTQubTNUb200KHRoaXMuUm1hdHJpeCk7XHJcbiAgICAgICAgbVsxMl0gPSB0aGlzLnBvc1swXTtcclxuICAgICAgICBtWzEzXSA9IHRoaXMucG9zWzFdO1xyXG4gICAgICAgIG1bMTRdID0gdGhpcy5wb3NbMl07XHJcbiAgICAgICAgbVsxNV0gPSAxO1xyXG4gICAgICAgIGNvbnN0IHNjYWxlID0gdjMuZGlmZih0aGlzLm1heCwgdGhpcy5taW4pO1xyXG4gICAgICAgIHJldHVybiBtNC5zY2FsZShtLCAuLi5zY2FsZSk7XHJcbiAgICB9XHJcbiAgICBnZXRDbG9zZXN0RmFjZUJ5Tm9ybWFsKG5vcm1hbCkge1xyXG4gICAgICAgIGNvbnN0IHsgUm1hdHJpeCB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCBnbG9iYWxOb3JtYWxzID0gQm94Lm5vcm1hbHMubWFwKChuKSA9PiBtMy50cmFuc2Zvcm1Qb2ludChSbWF0cml4LCBuKSk7XHJcbiAgICAgICAgbGV0IG1pbkRvdCA9IHYzLmRvdChub3JtYWwsIGdsb2JhbE5vcm1hbHNbMF0pO1xyXG4gICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDEsIG4gPSBnbG9iYWxOb3JtYWxzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICAvL2NvbnN0IF9ub3JtYWwgPSBtMy50cmFuc2Zvcm1Qb2ludChSbWF0cml4LCBub3JtYWxzW2ldKVxyXG4gICAgICAgICAgICBjb25zdCBfZG90ID0gdjMuZG90KGdsb2JhbE5vcm1hbHNbaV0sIG5vcm1hbCk7XHJcbiAgICAgICAgICAgIGlmIChfZG90IDwgbWluRG90KSB7XHJcbiAgICAgICAgICAgICAgICBtaW5Eb3QgPSBfZG90O1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGZhY2VJbmRpY2VzID0gQm94LmluZGljZXNbaW5kZXhdO1xyXG4gICAgICAgIGNvbnN0IG0gPSB0aGlzLmdldE00KCk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmVydGljZXM6IGZhY2VJbmRpY2VzLm1hcCgoaSkgPT4gbTQudHJhbnNmb3JtUG9pbnQobSwgQm94LnBvaW50c1tpXSkpLFxyXG4gICAgICAgICAgICBub3JtYWw6IGdsb2JhbE5vcm1hbHNbaW5kZXhdLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuQm94LnBvaW50cyA9IFtcclxuICAgIFstMSAvIDIsIC0xIC8gMiwgLTEgLyAyXSxcclxuICAgIFsxIC8gMiwgLTEgLyAyLCAtMSAvIDJdLFxyXG4gICAgWzEgLyAyLCAtMSAvIDIsIDEgLyAyXSxcclxuICAgIFstMSAvIDIsIC0xIC8gMiwgMSAvIDJdLFxyXG4gICAgWy0xIC8gMiwgMSAvIDIsIC0xIC8gMl0sXHJcbiAgICBbMSAvIDIsIDEgLyAyLCAtMSAvIDJdLFxyXG4gICAgWzEgLyAyLCAxIC8gMiwgMSAvIDJdLFxyXG4gICAgWy0xIC8gMiwgMSAvIDIsIDEgLyAyXSxcclxuXTtcclxuQm94LmluZGljZXMgPSBbXHJcbiAgICBbMCwgNCwgNSwgMV0sXHJcbiAgICBbMywgNywgNiwgMl0sXHJcbiAgICBbMCwgMSwgMiwgM10sXHJcbiAgICBbNCwgNSwgNiwgN10sXHJcbiAgICBbMCwgMywgNywgNF0sXHJcbiAgICBbMSwgMiwgNiwgNV0sIC8vICt4XHJcbl07XHJcbkJveC5ub3JtYWxzID0gW1xyXG4gICAgWzAsIDAsIC0xXSxcclxuICAgIFswLCAwLCAxXSxcclxuICAgIFswLCAtMSwgMF0sXHJcbiAgICBbMCwgMSwgMF0sXHJcbiAgICBbLTEsIDAsIDBdLFxyXG4gICAgWzEsIDAsIDBdLFxyXG5dO1xyXG5jbGFzcyBTcGhlcmUgZXh0ZW5kcyBDb2xsaWRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihyYWRpdXMgPSAxKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcclxuICAgICAgICB0aGlzLnR5cGUgPSBcInNwaGVyZVwiO1xyXG4gICAgfVxyXG4gICAgZ2V0QUFCQigpIHtcclxuICAgICAgICBjb25zdCB7IHJhZGl1cyB9ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gbmV3IEFBQkIodjMuc3VtKHRoaXMucG9zLCBbLXJhZGl1cywgLXJhZGl1cywgLXJhZGl1c10pLCB2My5zdW0odGhpcy5wb3MsIFtyYWRpdXMsIHJhZGl1cywgcmFkaXVzXSkpO1xyXG4gICAgfVxyXG4gICAgc3VwcG9ydChkaXIpIHtcclxuICAgICAgICByZXR1cm4gdjMuc3VtKHYzLnNjYWxlKHYzLm5vcm1hbGl6ZShkaXIpLCB0aGlzLnJhZGl1cyksIHRoaXMucG9zKTtcclxuICAgIH1cclxuICAgIGdldE00KCkge1xyXG4gICAgICAgIGNvbnN0IG0gPSBtNC5tM1RvbTQodGhpcy5SbWF0cml4KTtcclxuICAgICAgICBtWzEyXSA9IHRoaXMucG9zWzBdO1xyXG4gICAgICAgIG1bMTNdID0gdGhpcy5wb3NbMV07XHJcbiAgICAgICAgbVsxNF0gPSB0aGlzLnBvc1syXTtcclxuICAgICAgICBtWzE1XSA9IDE7XHJcbiAgICAgICAgY29uc3QgeyByYWRpdXMgfSA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIG00LnNjYWxlKG0sIHJhZGl1cywgcmFkaXVzLCByYWRpdXMpO1xyXG4gICAgfVxyXG4gICAgZ2V0Q2xvc2VzdEZhY2VCeU5vcm1hbChub3JtYWwpIHtcclxuICAgICAgICBjb25zdCByZXZlcnNlID0gdjMuc2NhbGUobm9ybWFsLCAtMSk7XHJcbiAgICAgICAgcmV0dXJuIHsgdmVydGljZXM6IFt2My5zY2FsZShyZXZlcnNlLCB0aGlzLnJhZGl1cyldLCBub3JtYWw6IHJldmVyc2UgfTtcclxuICAgIH1cclxuICAgIGdldEludmVyc2VJbmVydGlhVGVuc29yKG1hc3MpIHtcclxuICAgICAgICBjb25zdCB7IHJhZGl1cyB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCBtID0gW1xyXG4gICAgICAgICAgICAoMiAqIG1hc3MgKiByYWRpdXMgKiByYWRpdXMpIC8gNSxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgKDIgKiBtYXNzICogcmFkaXVzICogcmFkaXVzKSAvIDUsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICgyICogbWFzcyAqIHJhZGl1cyAqIHJhZGl1cykgLyA1LFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgcmV0dXJuIG07XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgQ3lsaW5kZXIgZXh0ZW5kcyBDb2xsaWRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihyYWRpdXMsIGhlaWdodCwgbnVtU2VnbWVudHMgPSA2KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICBjb25zdCBzZWdtZW50QW5nbGUgPSAoMiAqIE1hdGguUEkpIC8gbnVtU2VnbWVudHM7XHJcbiAgICAgICAgdGhpcy5jaXJjbGVQb2ludHMgPSBbLi4ubmV3IEFycmF5KG51bVNlZ21lbnRzKV0ubWFwKChfLCBpKSA9PiBbXHJcbiAgICAgICAgICAgIE1hdGguY29zKGkgKiBzZWdtZW50QW5nbGUpLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICBNYXRoLnNpbihpICogc2VnbWVudEFuZ2xlKSxcclxuICAgICAgICBdKTtcclxuICAgIH1cclxuICAgIHN1cHBvcnQoZGlyKSB7XHJcbiAgICAgICAgY29uc3QgX2RpciA9IG0zLnRyYW5zZm9ybVBvaW50KHRoaXMuUm1hdHJpeEludmVyc2UsIGRpcik7XHJcbiAgICAgICAgY29uc3QgZGlyX3h6ID0gW19kaXJbMF0sIDAsIF9kaXJbMl1dO1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHYzLnNjYWxlKHYzLm5vcm1hbGl6ZShkaXJfeHopLCB0aGlzLnJhZGl1cyk7XHJcbiAgICAgICAgcmVzdWx0WzFdID0gX2RpclsxXSA+IDAgPyB0aGlzLmhlaWdodCAvIDIgOiAtdGhpcy5oZWlnaHQgLyAyO1xyXG4gICAgICAgIHJldHVybiB2My5zdW0obTMudHJhbnNmb3JtUG9pbnQodGhpcy5SbWF0cml4LCByZXN1bHQpLCB0aGlzLnBvcyk7XHJcbiAgICB9XHJcbiAgICBnZXRNNCgpIHtcclxuICAgICAgICBjb25zdCBtID0gbTQubTNUb200KHRoaXMuUm1hdHJpeCk7XHJcbiAgICAgICAgbVsxMl0gPSB0aGlzLnBvc1swXTtcclxuICAgICAgICBtWzEzXSA9IHRoaXMucG9zWzFdO1xyXG4gICAgICAgIG1bMTRdID0gdGhpcy5wb3NbMl07XHJcbiAgICAgICAgbVsxNV0gPSAxO1xyXG4gICAgICAgIGNvbnN0IHsgcmFkaXVzLCBoZWlnaHQgfSA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIG00LnNjYWxlKG0sIHJhZGl1cywgaGVpZ2h0LCByYWRpdXMpO1xyXG4gICAgfVxyXG4gICAgZ2V0Q2xvc2VzdEZhY2VCeU5vcm1hbChub3JtYWwpIHtcclxuICAgICAgICBjb25zdCB7IFJtYXRyaXgsIFJtYXRyaXhJbnZlcnNlIH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IF9ub3JtYWwgPSBtMy50cmFuc2Zvcm1Qb2ludChSbWF0cml4SW52ZXJzZSwgdjMuc2NhbGUobm9ybWFsLCAtMSkpO1xyXG4gICAgICAgIGNvbnN0IG0gPSB0aGlzLmdldE00KCk7XHJcbiAgICAgICAgY29uc3QgY29zID0gdjMuZG90KF9ub3JtYWwsIFswLCAxLCAwXSk7XHJcbiAgICAgICAgY29uc3Qgc2lnbiA9IE1hdGguc2lnbihjb3MpO1xyXG4gICAgICAgIGlmIChjb3MgKiBzaWduIDwgMC43MDcpIHtcclxuICAgICAgICAgICAgY29uc3QgbG9jYWxOb3JtYWwgPSB2My5ub3JtYWxpemUoW19ub3JtYWxbMF0sIDAsIF9ub3JtYWxbMl1dKTtcclxuICAgICAgICAgICAgY29uc3QgdmVydGljZXMgPSBbXHJcbiAgICAgICAgICAgICAgICBtNC50cmFuc2Zvcm1Qb2ludChtLCBbX25vcm1hbFswXSwgMC41LCBfbm9ybWFsWzJdXSksXHJcbiAgICAgICAgICAgICAgICBtNC50cmFuc2Zvcm1Qb2ludChtLCBbX25vcm1hbFswXSwgLTAuNSwgX25vcm1hbFsyXV0pLFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2ZXJ0aWNlcywgbm9ybWFsOiBtMy50cmFuc2Zvcm1Qb2ludChSbWF0cml4LCBsb2NhbE5vcm1hbCkgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbG9jYWxOb3JtYWwgPSB2My5zY2FsZShbMCwgMSwgMF0sIHNpZ24pO1xyXG4gICAgICAgIGNvbnN0IHZlcnRpY2VzID0gdGhpcy5jaXJjbGVQb2ludHMubWFwKChwKSA9PiBtNC50cmFuc2Zvcm1Qb2ludChtLCBbcFswXSwgc2lnbiAqIDAuNSwgcFsyXV0pKTtcclxuICAgICAgICByZXR1cm4geyB2ZXJ0aWNlcywgbm9ybWFsOiBtMy50cmFuc2Zvcm1Qb2ludChSbWF0cml4LCBsb2NhbE5vcm1hbCkgfTtcclxuICAgIH1cclxuICAgIGdldEludmVyc2VJbmVydGlhVGVuc29yKG1hc3MpIHtcclxuICAgICAgICBjb25zdCB7IHJhZGl1cywgaGVpZ2h0IH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IGkxID0gKG1hc3MgLyAxMikgKiAoMyAqIHJhZGl1cyAqIHJhZGl1cyArIGhlaWdodCAqIGhlaWdodCk7XHJcbiAgICAgICAgY29uc3QgaTMgPSAobWFzcyAvIDIpICogcmFkaXVzICogcmFkaXVzO1xyXG4gICAgICAgIGNvbnN0IG0gPSBtMy5tdWx0aXBseShtMy5tdWx0aXBseSh0aGlzLlJtYXRyaXgsIFsxIC8gaTEsIDAsIDAsIDAsIDEgLyBpMSwgMCwgMCwgMCwgMSAvIGkzXSksIHRoaXMuUm1hdHJpeEludmVyc2UpO1xyXG4gICAgICAgIHJldHVybiBtO1xyXG4gICAgfVxyXG4gICAgZ2V0QUFCQigpIHtcclxuICAgICAgICBjb25zdCB7IHJhZGl1cywgaGVpZ2h0IH0gPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBuZXcgQUFCQih2My5zdW0odGhpcy5wb3MsIFstcmFkaXVzLCAtaGVpZ2h0LCAtcmFkaXVzXSksIHYzLnN1bSh0aGlzLnBvcywgW3JhZGl1cywgaGVpZ2h0LCByYWRpdXNdKSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IHsgQm94LCBTcGhlcmUsIEN5bGluZGVyIH07XHJcbiIsImltcG9ydCB7IHYzLCBtMyB9IGZyb20gXCJyb21hbnBwcG1hdGhcIjtcclxuaW1wb3J0IHsgQ29uc3RyYWludEVxdWF0aW9uLCBDb250YWN0RXF1YXRpb24sIEZyaWN0aW9uRXF1YXRpb24sIH0gZnJvbSBcIi4vRXF1YXRpb25zXCI7XHJcbmltcG9ydCBjb25maWcgZnJvbSBcIi4vY29uZmlnXCI7XHJcbmNvbnN0IHsgQ09OVEFDVF9UUkVTSE9MRCwgQ09OVEFDVF9CSUFTIH0gPSBjb25maWc7XHJcbmV4cG9ydCBjbGFzcyBDb25zdHJhaW50IHtcclxuICAgIGNvbnN0cnVjdG9yKGJvZHkxLCBib2R5MiwgcmFMb2NhbCwgcmJMb2NhbCwgb3B0KSB7XHJcbiAgICAgICAgdGhpcy5ib2R5MSA9IGJvZHkxO1xyXG4gICAgICAgIHRoaXMuYm9keTIgPSBib2R5MjtcclxuICAgICAgICB0aGlzLnJhTG9jYWwgPSByYUxvY2FsO1xyXG4gICAgICAgIHRoaXMucmJMb2NhbCA9IHJiTG9jYWw7XHJcbiAgICAgICAgdGhpcy5iaWFzRmFjdG9yID0gb3B0LmJpYXNGYWN0b3IgfHwgMC4xMjU7XHJcbiAgICAgICAgdGhpcy50cmVzaG9sZCA9IG9wdC50cmVzaG9sZCB8fCAwLjAwMDAwNTtcclxuICAgICAgICB0aGlzLmxhbWJkYU1pbiA9IG9wdC5sYW1iZGFNaW4gfHwgLTk5OTk5OTk5O1xyXG4gICAgICAgIHRoaXMubGFtYmRhTWF4ID0gb3B0LmxhbWJkYU1heCB8fCA5OTk5OTk5OTtcclxuICAgICAgICB0aGlzLnByZXZMYW1iZGEgPSAwO1xyXG4gICAgICAgIGNvbnN0IGNvbGxpZGVyMSA9IHRoaXMuYm9keTEuY29sbGlkZXI7XHJcbiAgICAgICAgY29uc3QgY29sbGlkZXIyID0gdGhpcy5ib2R5Mi5jb2xsaWRlcjtcclxuICAgICAgICB0aGlzLnJhID0gbTMudHJhbnNmb3JtUG9pbnQoY29sbGlkZXIxLlJtYXRyaXgsIHRoaXMucmFMb2NhbCk7XHJcbiAgICAgICAgdGhpcy5yYiA9IG0zLnRyYW5zZm9ybVBvaW50KGNvbGxpZGVyMi5SbWF0cml4LCB0aGlzLnJiTG9jYWwpO1xyXG4gICAgICAgIHRoaXMuUEEgPSB2My5zdW0oY29sbGlkZXIxLnBvcywgdGhpcy5yYSk7XHJcbiAgICAgICAgdGhpcy5QQiA9IHYzLnN1bShjb2xsaWRlcjIucG9zLCB0aGlzLnJiKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICBjb25zdCBjb2xsaWRlcjEgPSB0aGlzLmJvZHkxLmNvbGxpZGVyO1xyXG4gICAgICAgIGNvbnN0IGNvbGxpZGVyMiA9IHRoaXMuYm9keTIuY29sbGlkZXI7XHJcbiAgICAgICAgdGhpcy5yYSA9IG0zLnRyYW5zZm9ybVBvaW50KGNvbGxpZGVyMS5SbWF0cml4LCB0aGlzLnJhTG9jYWwpO1xyXG4gICAgICAgIHRoaXMucmIgPSBtMy50cmFuc2Zvcm1Qb2ludChjb2xsaWRlcjIuUm1hdHJpeCwgdGhpcy5yYkxvY2FsKTtcclxuICAgICAgICBjb25zdCBQQSA9IHYzLnN1bShjb2xsaWRlcjEucG9zLCB0aGlzLnJhKTtcclxuICAgICAgICBjb25zdCBQQiA9IHYzLnN1bShjb2xsaWRlcjIucG9zLCB0aGlzLnJiKTtcclxuICAgICAgICBjb25zdCBkZWx0YVBBID0gdjMuZGlmZihQQSwgdGhpcy5QQSk7XHJcbiAgICAgICAgY29uc3QgZGVsdGFQQiA9IHYzLmRpZmYoUEIsIHRoaXMuUEIpO1xyXG4gICAgICAgIHRoaXMuUEEgPSBQQTtcclxuICAgICAgICB0aGlzLlBCID0gUEI7XHJcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gdjMuZGlmZihQQSwgUEIpO1xyXG4gICAgICAgIHRoaXMucG9zaXRpb25FcnJvciA9IHYzLm5vcm0odjMuc3VtKFswLjAwMSwgMC4wMDEsIDAuMDAxXSwgZGlyZWN0aW9uKSk7XHJcbiAgICAgICAgdGhpcy5uID0gdjMuc2NhbGUoZGlyZWN0aW9uLCAxIC8gdGhpcy5wb3NpdGlvbkVycm9yKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkZWx0YVBBLFxyXG4gICAgICAgICAgICBkZWx0YVBCLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBnZXRFcXVhdGlvbigpIHtcclxuICAgICAgICBjb25zdCBlcXVhdGlvbiA9IG5ldyBDb25zdHJhaW50RXF1YXRpb24odGhpcyk7XHJcbiAgICAgICAgZXF1YXRpb24ubGFtYmRhTWF4ID0gdGhpcy5sYW1iZGFNYXg7XHJcbiAgICAgICAgZXF1YXRpb24ubGFtYmRhTWluID0gdGhpcy5sYW1iZGFNaW47XHJcbiAgICAgICAgcmV0dXJuIGVxdWF0aW9uO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBDb250YWN0Q29uc3RyYWludCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihib2R5MSwgYm9keTIsIHJhTG9jYWwsIHJiTG9jYWwsIHJhLCByYiwgUEEsIFBCLCBuLCBwb3NpdGlvbkVycm9yLCBpLCBqKSB7XHJcbiAgICAgICAgdGhpcy5ib2R5MSA9IGJvZHkxO1xyXG4gICAgICAgIHRoaXMuYm9keTIgPSBib2R5MjtcclxuICAgICAgICB0aGlzLnJhTG9jYWwgPSByYUxvY2FsO1xyXG4gICAgICAgIHRoaXMucmJMb2NhbCA9IHJiTG9jYWw7XHJcbiAgICAgICAgdGhpcy5yYSA9IHJhO1xyXG4gICAgICAgIHRoaXMucmIgPSByYjtcclxuICAgICAgICB0aGlzLlBBID0gUEE7XHJcbiAgICAgICAgdGhpcy5QQiA9IFBCO1xyXG4gICAgICAgIHRoaXMubiA9IG47XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbkVycm9yID0gcG9zaXRpb25FcnJvcjtcclxuICAgICAgICB0aGlzLmkgPSBpO1xyXG4gICAgICAgIHRoaXMuaiA9IGo7XHJcbiAgICAgICAgdGhpcy5iaWFzRmFjdG9yID0gY29uZmlnLkNPTlRBQ1RfQklBUztcclxuICAgICAgICB0aGlzLnRyZXNob2xkID0gY29uZmlnLkNPTlRBQ1RfVFJFU0hPTEQ7XHJcbiAgICAgICAgdGhpcy5sYW1iZGFNaW4gPSBDb250YWN0Q29uc3RyYWludC5vcHQubGFtYmRhTWluO1xyXG4gICAgICAgIHRoaXMubGFtYmRhTWF4ID0gQ29udGFjdENvbnN0cmFpbnQub3B0LmxhbWJkYU1heDtcclxuICAgICAgICB0aGlzLnByZXZUYW5MYW1iZGFzID0gWzAsIDBdO1xyXG4gICAgICAgIHRoaXMucHJldkxhbWJkYSA9IDA7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgY29uc3QgY29sbGlkZXIxID0gdGhpcy5ib2R5MS5jb2xsaWRlcjtcclxuICAgICAgICBjb25zdCBjb2xsaWRlcjIgPSB0aGlzLmJvZHkyLmNvbGxpZGVyO1xyXG4gICAgICAgIHRoaXMucmEgPSBtMy50cmFuc2Zvcm1Qb2ludChjb2xsaWRlcjEuUm1hdHJpeCwgdGhpcy5yYUxvY2FsKTtcclxuICAgICAgICB0aGlzLnJiID0gbTMudHJhbnNmb3JtUG9pbnQoY29sbGlkZXIyLlJtYXRyaXgsIHRoaXMucmJMb2NhbCk7XHJcbiAgICAgICAgY29uc3QgUEEgPSB2My5zdW0oY29sbGlkZXIxLnBvcywgdGhpcy5yYSk7XHJcbiAgICAgICAgY29uc3QgUEIgPSB2My5zdW0oY29sbGlkZXIyLnBvcywgdGhpcy5yYik7XHJcbiAgICAgICAgY29uc3QgZGVsdGFQQSA9IHYzLmRpZmYoUEEsIHRoaXMuUEEpO1xyXG4gICAgICAgIGNvbnN0IGRlbHRhUEIgPSB2My5kaWZmKFBCLCB0aGlzLlBCKTtcclxuICAgICAgICB0aGlzLlBBID0gUEE7XHJcbiAgICAgICAgdGhpcy5QQiA9IFBCO1xyXG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHYzLmRpZmYoUEEsIFBCKTtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uRXJyb3IgPSB2My5kb3QodGhpcy5uLCBkaXJlY3Rpb24pO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRlbHRhUEEsXHJcbiAgICAgICAgICAgIGRlbHRhUEIsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGdldEVxdWF0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IGxhbWJkYU1heCA9IE1hdGgubWF4KDEsIHYzLm5vcm0odjMuc3VtKHYzLnNjYWxlKHRoaXMuYm9keTEudmVsb2NpdHksIHRoaXMuYm9keTEubWFzcyksIHYzLnNjYWxlKHRoaXMuYm9keTIudmVsb2NpdHksIHRoaXMuYm9keTIubWFzcykpKSAqIDEwKTtcclxuICAgICAgICBjb25zdCBlcXVhdGlvbiA9IG5ldyBDb250YWN0RXF1YXRpb24odGhpcyk7XHJcbiAgICAgICAgZXF1YXRpb24ubGFtYmRhTWF4ID0gbGFtYmRhTWF4O1xyXG4gICAgICAgIGVxdWF0aW9uLmxhbWJkYU1pbiA9IDA7XHJcbiAgICAgICAgcmV0dXJuIGVxdWF0aW9uO1xyXG4gICAgfVxyXG4gICAgZ2V0RnJpY3Rpb25FcXVhdGlvbnMoKSB7XHJcbiAgICAgICAgY29uc3QgZXExID0gbmV3IEZyaWN0aW9uRXF1YXRpb24odGhpcywgMCk7XHJcbiAgICAgICAgY29uc3QgZXEyID0gbmV3IEZyaWN0aW9uRXF1YXRpb24odGhpcywgMSk7XHJcbiAgICAgICAgZXExLmxhbWJkYU1heCA9IEluZmluaXR5O1xyXG4gICAgICAgIGVxMS5sYW1iZGFNaW4gPSAtSW5maW5pdHk7XHJcbiAgICAgICAgZXEyLmxhbWJkYU1heCA9IEluZmluaXR5O1xyXG4gICAgICAgIGVxMi5sYW1iZGFNaW4gPSAtSW5maW5pdHk7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgZXExLCBlcTJcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG59XHJcbkNvbnRhY3RDb25zdHJhaW50Lm9wdCA9IHtcclxuICAgIGJpYXNGYWN0b3I6IDAuMTI1LFxyXG4gICAgdHJlc2hvbGQ6IDAuMDAwNSxcclxuICAgIGxhbWJkYU1pbjogMCxcclxuICAgIGxhbWJkYU1heDogSW5maW5pdHksXHJcbn07XHJcbiIsImltcG9ydCB7IHYzIH0gZnJvbSBcInJvbWFucHBwbWF0aFwiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5jb25zdCB7IENPTlRBQ1RfTUFOSUZPTERfS0VFUF9UUkVTSE9MRCB9ID0gY29uZmlnO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250YWN0TWFuaWZvbGQge1xyXG4gICAgY29uc3RydWN0b3IoY29udGFjdHMpIHtcclxuICAgICAgICB0aGlzLmNvbnRhY3RzID0gY29udGFjdHM7XHJcbiAgICAgICAgdGhpcy5rZWVwID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICBjb25zdCBjb250YWN0cyA9IHRoaXMuY29udGFjdHM7XHJcbiAgICAgICAgaWYgKGNvbnRhY3RzLmxlbmd0aCA8IDMpIHtcclxuICAgICAgICAgICAgdGhpcy5rZWVwID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSBjb250YWN0cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgY29udGFjdCA9IGNvbnRhY3RzW2ldO1xyXG4gICAgICAgICAgICBjb25zdCB7IGRlbHRhUEEsIGRlbHRhUEIgfSA9IGNvbnRhY3QudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIGlmICh2My5ub3JtKGRlbHRhUEEpID4gQ09OVEFDVF9NQU5JRk9MRF9LRUVQX1RSRVNIT0xEIHx8IHYzLm5vcm0oZGVsdGFQQikgPiBDT05UQUNUX01BTklGT0xEX0tFRVBfVFJFU0hPTEQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMua2VlcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcIi4vRXZlbnRFbWl0dGVyXCI7XHJcbmNvbnN0IGRhdGEgPSB7XHJcbiAgICBTT0xWRVJfRVJST1I6IDAsXHJcbiAgICBSVU5USU1FOiAwLFxyXG4gICAgRlBTOiAwLFxyXG59O1xyXG5jbGFzcyBEZWJ1ZyBleHRlbmRzIEV2ZW50RW1pdHRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldEluc3RhbmNlKCkge1xyXG4gICAgICAgIGlmICghRGVidWcuaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgRGVidWcuaW5zdGFuY2UgPSBuZXcgRGVidWcoKTtcclxuICAgICAgICAgICAgRGVidWcuaW5zdGFuY2UuZGF0YSA9IHt9O1xyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgICAgICAgICBEZWJ1Zy5pbnN0YW5jZS5kYXRhW2BfJHtrZXl9YF0gPSBkYXRhW2tleV07XHJcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRGVidWcuaW5zdGFuY2UuZGF0YSwga2V5LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1tgXyR7a2V5fWBdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0KHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbYF8ke2tleX1gXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBEZWJ1Zy5pbnN0YW5jZS5lbWl0KGB1cGRhdGVgLCB7IGtleTogYF8ke2tleX1gLCB2YWx1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBEZWJ1Zy5pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIHNvbWVNZXRob2QoKSB7IH1cclxufVxyXG53aW5kb3cuRGVidWcgPSBEZWJ1Zy5nZXRJbnN0YW5jZSgpO1xyXG5leHBvcnQgZGVmYXVsdCBEZWJ1Zy5nZXRJbnN0YW5jZSgpO1xyXG4iLCJpbXBvcnQgeyB2MywgbTMgfSBmcm9tIFwicm9tYW5wcHBtYXRoXCI7XHJcbmNvbnN0IGNsYW1wID0gKHYsIG1pbiwgbWF4KSA9PiB7XHJcbiAgICBpZiAodiA+IG1pbikge1xyXG4gICAgICAgIGlmICh2IDwgbWF4KVxyXG4gICAgICAgICAgICByZXR1cm4gdjtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBtYXg7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWluO1xyXG59O1xyXG5jbGFzcyBDb25zdHJhaW50RXF1YXRpb24ge1xyXG4gICAgY29uc3RydWN0b3IoY29uc3RyYWludCkge1xyXG4gICAgICAgIHRoaXMuSiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5KTSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5CID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNvbnN0cmFpbnQgPSBjb25zdHJhaW50O1xyXG4gICAgICAgIHRoaXMucHJldkxhbWJkYSA9IGNvbnN0cmFpbnQucHJldkxhbWJkYTtcclxuICAgIH1cclxuICAgIHVwZGF0ZUphY29iaWFuKCkge1xyXG4gICAgICAgIGNvbnN0IHsgYm9keTEsIGJvZHkyLCByYSwgcmIsIG4gfSA9IHRoaXMuY29uc3RyYWludDtcclxuICAgICAgICB0aGlzLkogPSBbdjMuc2NhbGUobiwgLTEpLCB2My5jcm9zcyhuLCByYSksIG4sIHYzLmNyb3NzKHJiLCBuKV07XHJcbiAgICAgICAgaWYgKGJvZHkxLnN0YXRpYykge1xyXG4gICAgICAgICAgICB0aGlzLkpbMF0gPSBbMCwgMCwgMF07XHJcbiAgICAgICAgICAgIHRoaXMuSlsxXSA9IFswLCAwLCAwXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJvZHkyLnN0YXRpYykge1xyXG4gICAgICAgICAgICB0aGlzLkpbMl0gPSBbMCwgMCwgMF07XHJcbiAgICAgICAgICAgIHRoaXMuSlszXSA9IFswLCAwLCAwXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyogIGNvbnN0IGRvZjEgPSBib2R5MS5kb2Y7XHJcbiAgICAgICAgY29uc3QgZG9mMiA9IGJvZHkyLmRvZjtcclxuICAgIFxyXG4gICAgICAgIHRoaXMuSlswXVswXSAqPSBkb2YxWzBdO1xyXG4gICAgICAgIHRoaXMuSlswXVsxXSAqPSBkb2YxWzFdO1xyXG4gICAgICAgIHRoaXMuSlswXVsyXSAqPSBkb2YxWzJdO1xyXG4gICAgXHJcbiAgICAgICAgdGhpcy5KWzFdWzBdICo9IGRvZjFbM107XHJcbiAgICAgICAgdGhpcy5KWzFdWzFdICo9IGRvZjFbNF07XHJcbiAgICAgICAgdGhpcy5KWzFdWzJdICo9IGRvZjFbNV07XHJcbiAgICBcclxuICAgICAgICB0aGlzLkpbMl1bMF0gKj0gZG9mMlswXTtcclxuICAgICAgICB0aGlzLkpbMl1bMV0gKj0gZG9mMlsxXTtcclxuICAgICAgICB0aGlzLkpbMl1bMl0gKj0gZG9mMlsyXTtcclxuICAgIFxyXG4gICAgICAgIHRoaXMuSlszXVswXSAqPSBkb2YyWzNdO1xyXG4gICAgICAgIHRoaXMuSlszXVsxXSAqPSBkb2YyWzRdO1xyXG4gICAgICAgIHRoaXMuSlszXVsyXSAqPSBkb2YyWzVdOyovXHJcbiAgICB9XHJcbiAgICB1cGRhdGVMZWZ0UGFydChkdCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlSmFjb2JpYW4oKTtcclxuICAgICAgICBjb25zdCB7IGJvZHkxLCBib2R5MiB9ID0gdGhpcy5jb25zdHJhaW50O1xyXG4gICAgICAgIGNvbnN0IEkxID0gYm9keTEuaW52ZXJzZUluZXJ0aWE7XHJcbiAgICAgICAgY29uc3QgSTIgPSBib2R5Mi5pbnZlcnNlSW5lcnRpYTtcclxuICAgICAgICBsZXQgTTEgPSBib2R5MS5pbnZlcnNlTWFzcztcclxuICAgICAgICBsZXQgTTIgPSBib2R5Mi5pbnZlcnNlTWFzcztcclxuICAgICAgICB0aGlzLkpNID0gW1xyXG4gICAgICAgICAgICB2My5zY2FsZSh0aGlzLkpbMF0sIE0xKSxcclxuICAgICAgICAgICAgbTMudHJhbnNmb3JtUG9pbnQoSTEsIHRoaXMuSlsxXSksXHJcbiAgICAgICAgICAgIHYzLnNjYWxlKHRoaXMuSlsyXSwgTTIpLFxyXG4gICAgICAgICAgICBtMy50cmFuc2Zvcm1Qb2ludChJMiwgdGhpcy5KWzNdKSxcclxuICAgICAgICBdO1xyXG4gICAgICAgIC8vSk1KKiA9IEpCOyBCID0gTUoqIGFzIDIgdmVjNiwgX0ogPSBKYWNvYmlhbiBhcyAyIHZlYzZcclxuICAgICAgICB0aGlzLl9KID0gW1xyXG4gICAgICAgICAgICBbLi4udGhpcy5KWzBdLCAuLi50aGlzLkpbMV1dLFxyXG4gICAgICAgICAgICBbLi4udGhpcy5KWzJdLCAuLi50aGlzLkpbM11dLFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgdGhpcy5CID0gW1xyXG4gICAgICAgICAgICBbLi4udGhpcy5KTVswXSwgLi4udGhpcy5KTVsxXV0sXHJcbiAgICAgICAgICAgIFsuLi50aGlzLkpNWzJdLCAuLi50aGlzLkpNWzNdXSxcclxuICAgICAgICBdO1xyXG4gICAgICAgIHRoaXMuZWZmTWFzcyA9XHJcbiAgICAgICAgICAgIHYzLmRvdCh0aGlzLkpbMF0sIHRoaXMuSk1bMF0pICtcclxuICAgICAgICAgICAgICAgIHYzLmRvdCh0aGlzLkpNWzFdLCB0aGlzLkpbMV0pICtcclxuICAgICAgICAgICAgICAgIHYzLmRvdCh0aGlzLkpbMl0sIHRoaXMuSk1bMl0pICtcclxuICAgICAgICAgICAgICAgIHYzLmRvdCh0aGlzLkpNWzNdLCB0aGlzLkpbM10pO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlUmlnaHRQYXJ0KGR0KSB7XHJcbiAgICAgICAgY29uc3QgeyBiaWFzRmFjdG9yLCB0cmVzaG9sZCwgYm9keTEsIGJvZHkyLCBuLCByYSwgcmIsIHBvc2l0aW9uRXJyb3IgfSA9IHRoaXMuY29uc3RyYWludDtcclxuICAgICAgICBjb25zdCByZWxhdGl2ZVZlbG9jaXR5ID0gdjMuZGlmZih2My5zdW0oYm9keTIudmVsb2NpdHksIHYzLmNyb3NzKGJvZHkyLmFuZ3VsYXJWLCByYikpLCB2My5zdW0oYm9keTEudmVsb2NpdHksIHYzLmNyb3NzKGJvZHkxLmFuZ3VsYXJWLCByYSkpKTtcclxuICAgICAgICBjb25zdCByZWxhdGl2ZVZlbG9jaXR5Tm9ybWFsUHJvamVjdGlvbiA9IHYzLmRvdChyZWxhdGl2ZVZlbG9jaXR5LCBuKTtcclxuICAgICAgICB0aGlzLmJpYXMgPVxyXG4gICAgICAgICAgICAoYmlhc0ZhY3RvciAqIE1hdGgubWF4KHBvc2l0aW9uRXJyb3IgLSB0cmVzaG9sZCwgMCkpIC8gZHQgLVxyXG4gICAgICAgICAgICAgICAgcmVsYXRpdmVWZWxvY2l0eU5vcm1hbFByb2plY3Rpb247XHJcbiAgICB9XHJcbiAgICBhcHBseUltcHVsc2UobGFtYmRhKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cobGFtYmRhKTtcclxuICAgICAgICB0aGlzLmNvbnN0cmFpbnQucHJldkxhbWJkYSA9IGxhbWJkYTtcclxuICAgICAgICB0aGlzLmNvbnN0cmFpbnQuYm9keTEuYXBwbHlJbXB1bHNlKHYzLnNjYWxlKHRoaXMuSlswXSwgbGFtYmRhKSwgdGhpcy5jb25zdHJhaW50LnJhKTtcclxuICAgICAgICB0aGlzLmNvbnN0cmFpbnQuYm9keTIuYXBwbHlJbXB1bHNlKHYzLnNjYWxlKHRoaXMuSlsyXSwgbGFtYmRhKSwgdGhpcy5jb25zdHJhaW50LnJiKTtcclxuICAgIH1cclxuICAgIGFwcGx5UHNldWRvSW1wdWxzZShsYW1iZGEpIHtcclxuICAgICAgICB0aGlzLmNvbnN0cmFpbnQuYm9keTEuYXBwbHlQc2V1ZG9JbXB1bHNlKHYzLnNjYWxlKHRoaXMuSlswXSwgbGFtYmRhKSwgdGhpcy5jb25zdHJhaW50LnJhKTtcclxuICAgICAgICB0aGlzLmNvbnN0cmFpbnQuYm9keTIuYXBwbHlQc2V1ZG9JbXB1bHNlKHYzLnNjYWxlKHRoaXMuSlsyXSwgbGFtYmRhKSwgdGhpcy5jb25zdHJhaW50LnJiKTtcclxuICAgIH1cclxufVxyXG5Db25zdHJhaW50RXF1YXRpb24uYmlhc011bHRpcGxpZXIgPSAwLjU7XHJcbmNsYXNzIENvbnRhY3RFcXVhdGlvbiBleHRlbmRzIENvbnN0cmFpbnRFcXVhdGlvbiB7XHJcbiAgICB1cGRhdGVSaWdodFBhcnQoZHQpIHtcclxuICAgICAgICBjb25zdCB7IGJvZHkxLCBib2R5MiwgdHJlc2hvbGQsIGJpYXNGYWN0b3IsIHJhLCByYiwgbiwgcG9zaXRpb25FcnJvciB9ID0gdGhpcy5jb25zdHJhaW50O1xyXG4gICAgICAgIGNvbnN0IHJlbGF0aXZlVmVsb2NpdHkgPSB2My5kaWZmKHYzLnN1bShib2R5Mi52ZWxvY2l0eSwgdjMuY3Jvc3MoYm9keTIuYW5ndWxhclYsIHJiKSksIHYzLnN1bShib2R5MS52ZWxvY2l0eSwgdjMuY3Jvc3MoYm9keTEuYW5ndWxhclYsIHJhKSkpO1xyXG4gICAgICAgIGNvbnN0IHJlbGF0aXZlVmVsb2NpdHlOb3JtYWxQcm9qZWN0aW9uID0gdjMuZG90KHJlbGF0aXZlVmVsb2NpdHksIG4pO1xyXG4gICAgICAgIHRoaXMuYmlhcyA9XHJcbiAgICAgICAgICAgIChNYXRoLm1heCgwLCBwb3NpdGlvbkVycm9yIC0gdHJlc2hvbGQpIC8gZHQpICogYmlhc0ZhY3RvciAtXHJcbiAgICAgICAgICAgICAgICByZWxhdGl2ZVZlbG9jaXR5Tm9ybWFsUHJvamVjdGlvbjtcclxuICAgIH1cclxuICAgIGFwcGx5SW1wdWxzZShsYW1iZGEpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGxhbWJkYSlcclxuICAgICAgICB0aGlzLmNvbnN0cmFpbnQucHJldkxhbWJkYSA9IGxhbWJkYTtcclxuICAgICAgICB0aGlzLmNvbnN0cmFpbnQuYm9keTEuYXBwbHlJbXB1bHNlKHYzLnNjYWxlKHRoaXMuSlswXSwgbGFtYmRhKSwgdGhpcy5jb25zdHJhaW50LnJhKTtcclxuICAgICAgICB0aGlzLmNvbnN0cmFpbnQuYm9keTIuYXBwbHlJbXB1bHNlKHYzLnNjYWxlKHRoaXMuSlsyXSwgbGFtYmRhKSwgdGhpcy5jb25zdHJhaW50LnJiKTtcclxuICAgIH1cclxufVxyXG5jbGFzcyBGcmljdGlvbkVxdWF0aW9uIGV4dGVuZHMgQ29uc3RyYWludEVxdWF0aW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbnN0cmFpbnQsIGRpcikge1xyXG4gICAgICAgIHN1cGVyKGNvbnN0cmFpbnQpO1xyXG4gICAgICAgIHRoaXMuZGlyID0gZGlyO1xyXG4gICAgICAgIHRoaXMucHJldkxhbWJkYSA9IHRoaXMuY29uc3RyYWludC5wcmV2VGFuTGFtYmRhc1tkaXJdO1xyXG4gICAgICAgIHRoaXMubGFtYmRhTWF4ID0gdGhpcy5wcmV2TGFtYmRhICogKHRoaXMuY29uc3RyYWludC5ib2R5MS5mcmljdGlvbiArIHRoaXMuY29uc3RyYWludC5ib2R5Mi5mcmljdGlvbik7XHJcbiAgICAgICAgdGhpcy5sYW1iZGFNaW4gPSAtdGhpcy5sYW1iZGFNYXg7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVKYWNvYmlhbigpIHtcclxuICAgICAgICBjb25zdCB7IGJvZHkxLCBib2R5MiwgcmEsIHJiIH0gPSB0aGlzLmNvbnN0cmFpbnQ7XHJcbiAgICAgICAgY29uc3QgbiA9IHRoaXMuZGlyXHJcbiAgICAgICAgICAgID8gdGhpcy5jb25zdHJhaW50LmpcclxuICAgICAgICAgICAgOiB0aGlzLmNvbnN0cmFpbnQuaTtcclxuICAgICAgICB0aGlzLkogPSBbdjMuc2NhbGUobiwgLTEpLCB2My5jcm9zcyhuLCByYSksIG4sIHYzLmNyb3NzKHJiLCBuKV07XHJcbiAgICAgICAgaWYgKGJvZHkxLnN0YXRpYykge1xyXG4gICAgICAgICAgICB0aGlzLkpbMF0gPSBbMCwgMCwgMF07XHJcbiAgICAgICAgICAgIHRoaXMuSlsxXSA9IFswLCAwLCAwXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJvZHkyLnN0YXRpYykge1xyXG4gICAgICAgICAgICB0aGlzLkpbMl0gPSBbMCwgMCwgMF07XHJcbiAgICAgICAgICAgIHRoaXMuSlszXSA9IFswLCAwLCAwXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB1cGRhdGVSaWdodFBhcnQoKSB7XHJcbiAgICAgICAgY29uc3QgeyBib2R5MSwgYm9keTIsIHJhLCByYiB9ID0gdGhpcy5jb25zdHJhaW50O1xyXG4gICAgICAgIGNvbnN0IG4gPSB0aGlzLmRpclxyXG4gICAgICAgICAgICA/IHRoaXMuY29uc3RyYWludC5qXHJcbiAgICAgICAgICAgIDogdGhpcy5jb25zdHJhaW50Lmk7XHJcbiAgICAgICAgY29uc3QgcmVsYXRpdmVWZWxvY2l0eSA9IHYzLmRpZmYodjMuc3VtKGJvZHkyLnZlbG9jaXR5LCB2My5jcm9zcyhib2R5Mi5hbmd1bGFyViwgcmIpKSwgdjMuc3VtKGJvZHkxLnZlbG9jaXR5LCB2My5jcm9zcyhib2R5MS5hbmd1bGFyViwgcmEpKSk7XHJcbiAgICAgICAgbGV0IHJlbGF0aXZlVmVsb2NpdHlOb3JtYWxQcm9qZWN0aW9uID0gdjMuZG90KHJlbGF0aXZlVmVsb2NpdHksIG4pO1xyXG4gICAgICAgIC8vaWYoTWF0aC5hYnMocmVsYXRpdmVWZWxvY2l0eU5vcm1hbFByb2plY3Rpb24pIDwgMC4wMDAwMDEpIHJlbGF0aXZlVmVsb2NpdHlOb3JtYWxQcm9qZWN0aW9uID0gMFxyXG4gICAgICAgIHRoaXMuYmlhcyA9IC0ocmVsYXRpdmVWZWxvY2l0eU5vcm1hbFByb2plY3Rpb24pO1xyXG4gICAgfVxyXG4gICAgYXBwbHlJbXB1bHNlKGxhbWJkYSkge1xyXG4gICAgICAgIHRoaXMuY29uc3RyYWludC5wcmV2VGFuTGFtYmRhc1t0aGlzLmRpcl0gPSBsYW1iZGE7XHJcbiAgICAgICAgdGhpcy5jb25zdHJhaW50LmJvZHkxLmFwcGx5SW1wdWxzZSh2My5zY2FsZSh0aGlzLkpbMF0sIGxhbWJkYSksIHRoaXMuY29uc3RyYWludC5yYSk7XHJcbiAgICAgICAgdGhpcy5jb25zdHJhaW50LmJvZHkyLmFwcGx5SW1wdWxzZSh2My5zY2FsZSh0aGlzLkpbMl0sIGxhbWJkYSksIHRoaXMuY29uc3RyYWludC5yYik7XHJcbiAgICB9XHJcbn1cclxuLypcclxuY2xhc3MgUG9zaXRpb25Db25zdHJhaW50IGV4dGVuZHMgQ29uc3RyYWludCB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBib2R5MSxcclxuICAgIGJvZHkyLFxyXG4gICAgbixcclxuICAgIHJhLFxyXG4gICAgcmIsXHJcbiAgICByYUxvY2FsLFxyXG4gICAgcmJMb2NhbCxcclxuICAgIGJpYXNGYWN0b3IsXHJcbiAgICB0cmVzaG9sZCxcclxuICAgIHBlbkRlcHRoXHJcbiAgKSB7XHJcbiAgICBzdXBlcihcclxuICAgICAgYm9keTEsXHJcbiAgICAgIGJvZHkyLFxyXG4gICAgICBuLFxyXG4gICAgICByYSxcclxuICAgICAgcmIsXHJcbiAgICAgIHJhTG9jYWwsXHJcbiAgICAgIHJiTG9jYWwsXHJcbiAgICAgIGJpYXNGYWN0b3IsXHJcbiAgICAgIG51bGwsXHJcbiAgICAgIG51bGwsXHJcbiAgICAgIHRyZXNob2xkXHJcbiAgICApO1xyXG4gICAgdGhpcy5wZW5EZXB0aCA9IHBlbkRlcHRoO1xyXG4gIH1cclxuICBhcHBseVJlc29sdmluZ0ltcHVsc2UobGFtYmRhKSB7XHJcbiAgICB0aGlzLmJvZHkxLmFwcGx5UHNldWRvSW1wdWxzZSh2My5zY2FsZSh0aGlzLkpbMF0sIGxhbWJkYSksIHRoaXMucmEpO1xyXG4gICAgdGhpcy5ib2R5Mi5hcHBseVBzZXVkb0ltcHVsc2UodjMuc2NhbGUodGhpcy5KWzJdLCBsYW1iZGEpLCB0aGlzLnJiKTtcclxuICB9XHJcbiAgdXBkYXRlUmlnaHRQYXJ0KGRlbHRhVGltZSkge1xyXG4gICAgY29uc3QgeyBib2R5MSwgYm9keTIsIHJhLCByYiwgbiwgcGVuRGVwdGgsIHRyZXNob2xkLCBiaWFzRmFjdG9yIH0gPSB0aGlzO1xyXG5cclxuICAgIHRoaXMuYmlhcyA9IChNYXRoLm1heCgwLCBwZW5EZXB0aCAtIHRyZXNob2xkKSAvIGRlbHRhVGltZSkgKiBiaWFzRmFjdG9yO1xyXG4gIH1cclxufVxyXG5jbGFzcyBSb3RhdGlvbmFsQ29uc3RyYWludCBleHRlbmRzIENvbnN0cmFpbnQge1xyXG4gIGNvbnN0cnVjdG9yKGJvZHkxLCBib2R5MiwgcmFMb2NhbCwgcmJMb2NhbCkge1xyXG4gICAgc3VwZXIoYm9keTEsIGJvZHkyLCBudWxsLCBudWxsLCBudWxsLCByYUxvY2FsLCByYkxvY2FsKTtcclxuICB9XHJcbiAgdXBkYXRlTGVmdFBhcnQoZGVsdGFUaW1lKSB7XHJcbiAgICBjb25zdCB7IGJvZHkxLCBib2R5MiwgcmFMb2NhbCwgcmJMb2NhbCB9ID0gdGhpcztcclxuICAgIHRoaXMuUEEgPSBib2R5MS5jb2xsaWRlci5sb2NhbFRvR2xvYmFsKHJhTG9jYWwpO1xyXG4gICAgdGhpcy5QQiA9IGJvZHkyLmNvbGxpZGVyLmxvY2FsVG9HbG9iYWwocmJMb2NhbCk7XHJcbiAgICBjb25zdCBzID0gbTMudHJhbnNmb3JtUG9pbnQoYm9keTEuY29sbGlkZXIuUm1hdHJpeCwgcmFMb2NhbCk7XHJcbiAgICBjb25zdCBiID0gbTMudHJhbnNmb3JtUG9pbnQoYm9keTIuY29sbGlkZXIuUm1hdHJpeCwgcmJMb2NhbCk7XHJcblxyXG4gICAgdGhpcy5yYSA9IHM7XHJcbiAgICB0aGlzLnJiID0gYjtcclxuXHJcbiAgICBjb25zdCBKID0gW1swLCAwLCAwXSwgdjMuY3Jvc3MocywgYiksIFswLCAwLCAwXSwgdjMuY3Jvc3MoYiwgcyldO1xyXG5cclxuICAgIGNvbnN0IGRvZjEgPSBib2R5MS5ET0Y7XHJcbiAgICBjb25zdCBkb2YyID0gYm9keTIuRE9GO1xyXG5cclxuICAgIEpbMF1bMF0gKj0gZG9mMVswXTtcclxuICAgIEpbMF1bMV0gKj0gZG9mMVsxXTtcclxuICAgIEpbMF1bMl0gKj0gZG9mMVsyXTtcclxuXHJcbiAgICBKWzFdWzBdICo9IGRvZjFbM107XHJcbiAgICBKWzFdWzFdICo9IGRvZjFbNF07XHJcbiAgICBKWzFdWzJdICo9IGRvZjFbNV07XHJcblxyXG4gICAgSlsyXVswXSAqPSBkb2YyWzBdO1xyXG4gICAgSlsyXVsxXSAqPSBkb2YyWzFdO1xyXG4gICAgSlsyXVsyXSAqPSBkb2YyWzJdO1xyXG5cclxuICAgIEpbM11bMF0gKj0gZG9mMlszXTtcclxuICAgIEpbM11bMV0gKj0gZG9mMls0XTtcclxuICAgIEpbM11bMl0gKj0gZG9mMls1XTtcclxuICAgIGNvbnN0IEkxID0gYm9keTEuaW52ZXJzZUluZXJ0aWE7XHJcbiAgICBjb25zdCBJMiA9IGJvZHkyLmludmVyc2VJbmVydGlhO1xyXG4gICAgdGhpcy5KID0gSjtcclxuICAgIHRoaXMuSk0gPSBbXHJcbiAgICAgIFswLCAwLCAwXSxcclxuICAgICAgbTMudHJhbnNmb3JtUG9pbnQoSTEsIHRoaXMuSlsxXSksXHJcbiAgICAgIFswLCAwLCAwXSxcclxuICAgICAgbTMudHJhbnNmb3JtUG9pbnQoSTIsIHRoaXMuSlszXSksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5lZmZNYXNzID1cclxuICAgICAgdjMuZG90KHRoaXMuSk1bMV0sIHRoaXMuSlsxXSkgKyB2My5kb3QodGhpcy5KTVszXSwgdGhpcy5KWzNdKTtcclxuICAgIHRoaXMuQiA9IFtcclxuICAgICAgWzAsIDAsIDAsIC4uLnRoaXMuSk1bMV1dLFxyXG4gICAgICBbMCwgMCwgMCwgLi4udGhpcy5KTVszXV0sXHJcbiAgICBdO1xyXG4gICAgdGhpcy5fSiA9IFtcclxuICAgICAgWy4uLnRoaXMuSlswXSwgLi4udGhpcy5KWzFdXSxcclxuICAgICAgWy4uLnRoaXMuSlsyXSwgLi4udGhpcy5KWzNdXSxcclxuICAgIF07XHJcbiAgfVxyXG4gIHVwZGF0ZVJpZ2h0UGFydChkZWx0YVRpbWUpIHtcclxuICAgIGNvbnN0IHsgYm9keTEsIGJvZHkyIH0gPSB0aGlzO1xyXG5cclxuICAgIHRoaXMuYmlhcyA9XHJcbiAgICAgIC12My5kb3QodGhpcy5KWzFdLCBib2R5MS5hbmd1bGFyVikgKyB2My5kb3QodGhpcy5KWzNdLCBib2R5Mi5hbmd1bGFyVik7XHJcbiAgfVxyXG4gIGFwcGx5UmVzb2x2aW5nSW1wdWxzZShsYW1iZGEpIHtcclxuICAgIGNvbnN0IHsgYm9keTEsIGJvZHkyIH0gPSB0aGlzO1xyXG4gICAgYm9keTEuYWRkQW5ndWxhclYodjMuc2NhbGUodGhpcy5yYSwgbGFtYmRhKSk7XHJcbiAgICBib2R5Mi5hZGRBbmd1bGFyVih2My5zY2FsZSh0aGlzLnJiLCBsYW1iZGEpKTtcclxuICB9XHJcbn1cclxuKi9cclxuLypcclxuY2xhc3MgSm9pbnQgZXh0ZW5kcyBDb25zdHJhaW50IHtcclxuICBjb25zdHJ1Y3Rvcihib2R5MSwgYm9keTIsIHJhTG9jYWwsIHJiTG9jYWwsIGJpYXNGYWN0b3IgPSAwKSB7XHJcbiAgICBzdXBlcihib2R5MSwgYm9keTIsIG51bGwsIG51bGwsIG51bGwsIHJhTG9jYWwsIHJiTG9jYWwsIGJpYXNGYWN0b3IpO1xyXG5cclxuICAgIHRoaXMudHJlc2hvbGQgPSAwLjAwMDE7XHJcbiAgICB0aGlzLnJlZHVjZXIgPSAwLjU7XHJcbiAgICB0aGlzLm1heEltcHVsc2UgPSAwLjc7XHJcbiAgfVxyXG4gIHVwZGF0ZUxlZnRQYXJ0KGRlbHRhVGltZSkge1xyXG4gICAgY29uc3QgeyBib2R5MSwgYm9keTIsIHJhTG9jYWwsIHJiTG9jYWwgfSA9IHRoaXM7XHJcbiAgICB0aGlzLlBBID0gYm9keTEuY29sbGlkZXIubG9jYWxUb0dsb2JhbChyYUxvY2FsKTtcclxuICAgIHRoaXMuUEIgPSBib2R5Mi5jb2xsaWRlci5sb2NhbFRvR2xvYmFsKHJiTG9jYWwpO1xyXG4gICAgY29uc3QgZGlyID0gdjMuZGlmZih0aGlzLlBBLCB0aGlzLlBCKTtcclxuICAgIGNvbnN0IG4gPSBkaXI7XHJcbiAgICB0aGlzLm4gPSBuO1xyXG4gICAgdGhpcy5yYSA9IGRpZmYodGhpcy5QQSwgdGhpcy5ib2R5MS5jb2xsaWRlci5wb3MpO1xyXG4gICAgdGhpcy5yYiA9IGRpZmYodGhpcy5QQiwgdGhpcy5ib2R5Mi5jb2xsaWRlci5wb3MpO1xyXG4gICAgdGhpcy5wZW5EZXB0aCA9IG5vcm0oZGlyKTtcclxuXHJcbiAgICBjb25zdCBKID0gW1xyXG4gICAgICB2My5zY2FsZSh0aGlzLm4sIC0xKSxcclxuICAgICAgdjMuY3Jvc3ModGhpcy5uLCB0aGlzLnJhKSxcclxuICAgICAgdGhpcy5uLFxyXG4gICAgICB2My5jcm9zcyh0aGlzLnJiLCB0aGlzLm4pLFxyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdCBkb2YxID0gYm9keTEuRE9GO1xyXG4gICAgY29uc3QgZG9mMiA9IGJvZHkyLkRPRjtcclxuXHJcbiAgICBKWzBdWzBdICo9IGRvZjFbMF07XHJcbiAgICBKWzBdWzFdICo9IGRvZjFbMV07XHJcbiAgICBKWzBdWzJdICo9IGRvZjFbMl07XHJcblxyXG4gICAgSlsxXVswXSAqPSBkb2YxWzNdO1xyXG4gICAgSlsxXVsxXSAqPSBkb2YxWzRdO1xyXG4gICAgSlsxXVsyXSAqPSBkb2YxWzVdO1xyXG5cclxuICAgIEpbMl1bMF0gKj0gZG9mMlswXTtcclxuICAgIEpbMl1bMV0gKj0gZG9mMlsxXTtcclxuICAgIEpbMl1bMl0gKj0gZG9mMlsyXTtcclxuXHJcbiAgICBKWzNdWzBdICo9IGRvZjJbM107XHJcbiAgICBKWzNdWzFdICo9IGRvZjJbNF07XHJcbiAgICBKWzNdWzJdICo9IGRvZjJbNV07XHJcbiAgICBjb25zdCBJMSA9IGJvZHkxLmludmVyc2VJbmVydGlhO1xyXG4gICAgY29uc3QgSTIgPSBib2R5Mi5pbnZlcnNlSW5lcnRpYTtcclxuICAgIGxldCBNMSA9IGJvZHkxLmludmVyc2VNYXNzO1xyXG4gICAgbGV0IE0yID0gYm9keTIuaW52ZXJzZU1hc3M7XHJcbiAgICB0aGlzLkogPSBKO1xyXG4gICAgdGhpcy5KTSA9IFtcclxuICAgICAgc2NhbGUodGhpcy5KWzBdLCBNMSksXHJcbiAgICAgIG0zLnRyYW5zZm9ybVBvaW50KEkxLCB0aGlzLkpbMV0pLFxyXG4gICAgICBzY2FsZSh0aGlzLkpbMl0sIE0yKSxcclxuICAgICAgbTMudHJhbnNmb3JtUG9pbnQoSTIsIHRoaXMuSlszXSksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5lZmZNYXNzID1cclxuICAgICAgZG90KHRoaXMuSk1bMF0sIEpbMF0pICtcclxuICAgICAgZG90KHRoaXMuSk1bMV0sIHRoaXMuSlsxXSkgK1xyXG4gICAgICBkb3QodGhpcy5KTVsyXSwgSlsyXSkgK1xyXG4gICAgICBkb3QodGhpcy5KTVszXSwgdGhpcy5KWzNdKTtcclxuICAgIHRoaXMuQiA9IFtcclxuICAgICAgWy4uLnRoaXMuSk1bMF0sIC4uLnRoaXMuSk1bMV1dLFxyXG4gICAgICBbLi4udGhpcy5KTVsyXSwgLi4udGhpcy5KTVszXV0sXHJcbiAgICBdO1xyXG4gICAgdGhpcy5fSiA9IFtcclxuICAgICAgWy4uLnRoaXMuSlswXSwgLi4udGhpcy5KWzFdXSxcclxuICAgICAgWy4uLnRoaXMuSlsyXSwgLi4udGhpcy5KWzNdXSxcclxuICAgIF07XHJcbiAgfVxyXG5cclxuICB1cGRhdGVSaWdodFBhcnQoZGVsdGFUaW1lKSB7XHJcbiAgICBjb25zdCB7IGJvZHkxLCBib2R5MiwgcmEsIHJiLCBuLCBwZW5EZXB0aCwgdHJlc2hvbGQsIGJpYXNGYWN0b3IgfSA9IHRoaXM7XHJcblxyXG4gICAgY29uc3QgcmVsYXRpdmVWZWxvY2l0eSA9IGRpZmYoXHJcbiAgICAgIHN1bShib2R5Mi52ZWxvY2l0eSwgY3Jvc3MoYm9keTIuYW5ndWxhclYsIHJiKSksXHJcbiAgICAgIHN1bShib2R5MS52ZWxvY2l0eSwgY3Jvc3MoYm9keTEuYW5ndWxhclYsIHJhKSlcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgcmVsYXRpdmVWZWxvY2l0eU5vcm1hbFByb2plY3Rpb24gPSBkb3QocmVsYXRpdmVWZWxvY2l0eSwgbik7XHJcbiAgICBjb25zdCBmYWMgPSBwZW5EZXB0aCAqKiAyID4gdHJlc2hvbGQ7XHJcbiAgICB0aGlzLmJpYXMgPVxyXG4gICAgICAoYmlhc0ZhY3RvciAqIE1hdGgubWF4KHBlbkRlcHRoICoqIDIgLSB0cmVzaG9sZCwgMCkpIC8gZGVsdGFUaW1lIC1cclxuICAgICAgcmVsYXRpdmVWZWxvY2l0eU5vcm1hbFByb2plY3Rpb247XHJcbiAgICB0aGlzLmJpYXMgKj0gZmFjO1xyXG4gIH1cclxuICBhcHBseVJlc29sdmluZ0ltcHVsc2UobGFtYmRhKSB7XHJcbiAgICB0aGlzLmJvZHkxLmFwcGx5SW1wdWxzZShzY2FsZSh0aGlzLkpbMF0sIGxhbWJkYSksIHRoaXMucmEpO1xyXG4gICAgdGhpcy5ib2R5Mi5hcHBseUltcHVsc2Uoc2NhbGUodGhpcy5KWzJdLCBsYW1iZGEpLCB0aGlzLnJiKTtcclxuICB9XHJcbiAgYXBwbHlSZXNvbHZpbmdQc2V1ZG9JbXB1bHNlKGxhbWJkYSkge1xyXG4gICAgY29uc3QgbWF4ID0gdGhpcy5lZmZNYXNzICogMTA7XHJcbiAgICAvL2xhbWJkYSA9IGNsYW1wKGxhbWJkYSwgLTEsIDEpXHJcbiAgICB0aGlzLmJvZHkxLmFwcGx5UHNldWRvSW1wdWxzZShzY2FsZSh0aGlzLm4sIC1sYW1iZGEpLCBbMCwgMCwgMF0pO1xyXG4gICAgdGhpcy5ib2R5Mi5hcHBseVBzZXVkb0ltcHVsc2Uoc2NhbGUodGhpcy5uLCBsYW1iZGEpLCBbMCwgMCwgMF0pO1xyXG4gIH1cclxufVxyXG5jbGFzcyBKb2ludFBvc2l0aW9uQ29uc3RyYWludCBleHRlbmRzIEpvaW50IHtcclxuICB1cGRhdGVSaWdodFBhcnQoZGVsdGFUaW1lKSB7XHJcbiAgICBjb25zdCB7IHBlbkRlcHRoLCB0cmVzaG9sZCwgYmlhc0ZhY3RvciB9ID0gdGhpcztcclxuXHJcbiAgICBjb25zdCBmYWMgPSBwZW5EZXB0aCAqKiAyID4gdHJlc2hvbGQ7XHJcbiAgICB0aGlzLmJpYXMgPVxyXG4gICAgICAoKGJpYXNGYWN0b3IgKiBNYXRoLm1heChwZW5EZXB0aCAqKiAyIC0gdHJlc2hvbGQsIDApKSAvIGRlbHRhVGltZSkgKiBmYWM7XHJcbiAgfVxyXG4gIGFwcGx5UmVzb2x2aW5nSW1wdWxzZShsYW1iZGEpIHtcclxuICAgIC8vaWYobGFtYmRhIDwgMC4xKXJldHVyblxyXG4gICAgdGhpcy5ib2R5MS5hcHBseVBzZXVkb0ltcHVsc2Uoc2NhbGUodGhpcy5KWzBdLCBsYW1iZGEpLCB0aGlzLnJhKTtcclxuICAgIHRoaXMuYm9keTIuYXBwbHlQc2V1ZG9JbXB1bHNlKHNjYWxlKHRoaXMuSlsyXSwgbGFtYmRhKSwgdGhpcy5yYik7XHJcbiAgfVxyXG59Ki9cclxuZXhwb3J0IHsgQ29udGFjdEVxdWF0aW9uLCBDb25zdHJhaW50RXF1YXRpb24sIFxyXG4vL0pvaW50LFxyXG5GcmljdGlvbkVxdWF0aW9uLFxyXG4vL1Bvc2l0aW9uQ29uc3RyYWludCxcclxuLy9Kb2ludFBvc2l0aW9uQ29uc3RyYWludCxcclxuLy9Sb3RhdGlvbmFsQ29uc3RyYWludCxcclxuIH07XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50RW1pdHRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmV2ZW50cyA9IHt9O1xyXG4gICAgfVxyXG4gICAgb24oZXZlbnROYW1lLCBmbikge1xyXG4gICAgICAgIGlmICghdGhpcy5ldmVudHNbZXZlbnROYW1lXSkge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0ucHVzaChmbik7XHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0uZmlsdGVyKChldmVudEZuKSA9PiBmbiAhPT0gZXZlbnRGbik7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGVtaXQoZXZlbnROYW1lLCBkYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0pIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5mb3JFYWNoKChmbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgZm4uY2FsbChudWxsLCBkYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcIi4vRXZlbnRFbWl0dGVyXCI7XHJcbmltcG9ydCB7IG0zLCB2MyB9IGZyb20gJ3JvbWFucHBwbWF0aCc7XHJcbmltcG9ydCBjb25maWcgZnJvbSBcIi4vY29uZmlnXCI7XHJcbmNvbnN0IHsgUklHSURfQk9EWV9NT1ZFX1RSRVNIT0xELCBSSUdJRF9CT0RZX0FBQkJfQklBUyB9ID0gY29uZmlnO1xyXG5jbGFzcyBSaWdpZEJvZHkgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xyXG4gICAgc3RhdGljIHNldFJJR0lEX0JPRFlfTU9WRV9UUkVTSE9MRChSSUdJRF9CT0RZX01PVkVfVFJFU0hPTEQpIHtcclxuICAgICAgICBSaWdpZEJvZHkuY29uZmlnLlJJR0lEX0JPRFlfTU9WRV9UUkVTSE9MRCA9IFJJR0lEX0JPRFlfTU9WRV9UUkVTSE9MRDtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKGNvbGxpZGVyKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnN0YXRpYyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXIgPSBjb2xsaWRlcjtcclxuICAgICAgICB0aGlzLm1hc3MgPSAxO1xyXG4gICAgICAgIHRoaXMuaW52ZXJzZU1hc3MgPSAxIC8gdGhpcy5tYXNzO1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSBbMCwgMCwgMF07XHJcbiAgICAgICAgdGhpcy5wc2V1ZG9WZWxvY2l0eSA9IFswLCAwLCAwXTtcclxuICAgICAgICB0aGlzLnBzZXVkb0FuZ3VsYXJWID0gWzAsIDAsIDBdO1xyXG4gICAgICAgIHRoaXMuYWNjZWxlcmF0aW9uID0gWzAsIDAsIDBdO1xyXG4gICAgICAgIHRoaXMuYW5ndWxhclYgPSBbMCwgMCwgMF07XHJcbiAgICAgICAgdGhpcy5pbnZlcnNlSW5lcnRpYSA9IGNvbGxpZGVyLmdldEludmVyc2VJbmVydGlhVGVuc29yKHRoaXMubWFzcyk7XHJcbiAgICAgICAgdGhpcy5pZCA9IFJpZ2lkQm9keS5sYXN0SWQrKztcclxuICAgICAgICB0aGlzLmZyaWN0aW9uID0gNTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50RnVuY3Rpb25zID0gW107XHJcbiAgICAgICAgdGhpcy5ncm91cCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5uZWVkVG9VcGRhdGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGludGVncmF0ZVJLNChkdCkge1xyXG4gICAgICAgIGNvbnN0IHsgYWNjZWxlcmF0aW9uLCB2ZWxvY2l0eSwgYW5ndWxhclYgfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgX3RyYW5zbGF0aW9uID0gdjMuc2NhbGUodjMuc3VtKHZlbG9jaXR5LCB2My5zY2FsZShhY2NlbGVyYXRpb24sICgyIC8gMykgKiBkdCkpLCBkdCk7XHJcbiAgICAgICAgY29uc3QgX3JvdGF0aW9uID0gdjMuc2NhbGUoYW5ndWxhclYsIGR0IC8gMik7XHJcbiAgICAgICAgY29uc3QgZGVsdGFWZWxvY2l0eSA9IHYzLnNjYWxlKGFjY2VsZXJhdGlvbiwgZHQpO1xyXG4gICAgICAgIGlmICh2My5ub3JtKF90cmFuc2xhdGlvbikgPiBjb25maWcuUklHSURfQk9EWV9NT1ZFX1RSRVNIT0xEKVxyXG4gICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZShfdHJhbnNsYXRpb24pO1xyXG4gICAgICAgIGlmICh2My5ub3JtKF9yb3RhdGlvbikgPiBjb25maWcuUklHSURfQk9EWV9NT1ZFX1RSRVNIT0xEKVxyXG4gICAgICAgICAgICB0aGlzLnJvdGF0ZShfcm90YXRpb24pO1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSB2My5zdW0odmVsb2NpdHksIGRlbHRhVmVsb2NpdHkpO1xyXG4gICAgfVxyXG4gICAgaW50ZWdyYXRlUHNldWRvVmVsb2NpdGllcyhkdCkge1xyXG4gICAgICAgIGNvbnN0IHRyYW5zbGF0aW9uID0gdjMuc2NhbGUodGhpcy5wc2V1ZG9WZWxvY2l0eSwgZHQpO1xyXG4gICAgICAgIGNvbnN0IHJvdGF0aW9uID0gdjMuc2NhbGUodGhpcy5wc2V1ZG9Bbmd1bGFyViwgZHQpO1xyXG4gICAgICAgIGlmICh2My5ub3JtKHRyYW5zbGF0aW9uKSA+IGNvbmZpZy5SSUdJRF9CT0RZX01PVkVfVFJFU0hPTEQpXHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNsYXRlKHRyYW5zbGF0aW9uKTtcclxuICAgICAgICBpZiAodjMubm9ybShyb3RhdGlvbikgPiBjb25maWcuUklHSURfQk9EWV9NT1ZFX1RSRVNIT0xEKVxyXG4gICAgICAgICAgICB0aGlzLnJvdGF0ZShyb3RhdGlvbik7XHJcbiAgICAgICAgdGhpcy5wc2V1ZG9WZWxvY2l0eSA9IFswLCAwLCAwXTtcclxuICAgICAgICB0aGlzLnBzZXVkb0FuZ3VsYXJWID0gWzAsIDAsIDBdO1xyXG4gICAgfVxyXG4gICAgYWRkUHNldWRvVmVsb2NpdHkodikge1xyXG4gICAgICAgIHRoaXMucHNldWRvVmVsb2NpdHkgPSB2My5zdW0odGhpcy5wc2V1ZG9WZWxvY2l0eSwgdik7XHJcbiAgICB9XHJcbiAgICBhZGRQc2V1ZG9Bbmd1bGFyVih2KSB7XHJcbiAgICAgICAgdGhpcy5wc2V1ZG9Bbmd1bGFyViA9IHYzLnN1bSh0aGlzLnBzZXVkb0FuZ3VsYXJWLCB2KTtcclxuICAgIH1cclxuICAgIGludGVncmF0ZVZlbG9jaXRpZXMoZHQpIHtcclxuICAgICAgICBjb25zdCB0cmFuc2xhdGlvbiA9IHYzLnNjYWxlKHYzLmRpZmYodGhpcy52ZWxvY2l0eSwgdjMuc2NhbGUodGhpcy5hY2NlbGVyYXRpb24sIGR0IC8gMykpLCBkdCk7XHJcbiAgICAgICAgaWYgKHYzLm5vcm0odHJhbnNsYXRpb24pID4gY29uZmlnLlJJR0lEX0JPRFlfTU9WRV9UUkVTSE9MRClcclxuICAgICAgICAgICAgdGhpcy50cmFuc2xhdGUodHJhbnNsYXRpb24pO1xyXG4gICAgICAgIGNvbnN0IHJvdGF0aW9uID0gdjMuc2NhbGUodGhpcy5hbmd1bGFyViwgZHQgLyAyKTtcclxuICAgICAgICBpZiAodjMubm9ybShyb3RhdGlvbikgPiBjb25maWcuUklHSURfQk9EWV9NT1ZFX1RSRVNIT0xEKVxyXG4gICAgICAgICAgICB0aGlzLnJvdGF0ZShyb3RhdGlvbik7XHJcbiAgICB9XHJcbiAgICBpbnRlZ3JhdGVGb3JjZXMoZHQpIHtcclxuICAgICAgICBsZXQgZGVsdGFTcGVlZCA9IHYzLnNjYWxlKHRoaXMuYWNjZWxlcmF0aW9uLCBkdCk7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHYzLnN1bSh0aGlzLnZlbG9jaXR5LCBkZWx0YVNwZWVkKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZUludmVyc2VJbmVydGlhKCkge1xyXG4gICAgICAgIHRoaXMuaW52ZXJzZUluZXJ0aWEgPSB0aGlzLmNvbGxpZGVyLmdldEludmVyc2VJbmVydGlhVGVuc29yKHRoaXMubWFzcyk7XHJcbiAgICB9XHJcbiAgICBnZXRJbnZlcnNlSW5lcnRpYVRlbnNvcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb2xsaWRlci5nZXRJbnZlcnNlSW5lcnRpYVRlbnNvcih0aGlzLm1hc3MpO1xyXG4gICAgfVxyXG4gICAgc2V0TWFzcyhtYXNzKSB7XHJcbiAgICAgICAgdGhpcy5tYXNzID0gbWFzcztcclxuICAgICAgICB0aGlzLmludmVyc2VNYXNzID0gMSAvIHRoaXMubWFzcztcclxuICAgIH1cclxuICAgIHRyYW5zbGF0ZSh0cmFuc2xhdGlvbikge1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXIudHJhbnNsYXRlKHRyYW5zbGF0aW9uKTtcclxuICAgICAgICB0aGlzLm5lZWRUb1VwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5lbWl0VXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICByb3RhdGUocm90YXRpb24pIHtcclxuICAgICAgICB0aGlzLmNvbGxpZGVyLnJvdGF0ZShyb3RhdGlvbik7XHJcbiAgICAgICAgdGhpcy5uZWVkVG9VcGRhdGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZW1pdFVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgYXBwbHlJbXB1bHNlKGltcHVsc2UsIHBvaW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGljKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHYzLnN1bSh0aGlzLnZlbG9jaXR5LCB2My5zY2FsZShpbXB1bHNlLCB0aGlzLmludmVyc2VNYXNzKSk7XHJcbiAgICAgICAgY29uc3QgYW5ndWxhckltcHVsc2UgPSBtMy50cmFuc2Zvcm1Qb2ludCh0aGlzLmludmVyc2VJbmVydGlhLCB2My5jcm9zcyhwb2ludCwgaW1wdWxzZSkpO1xyXG4gICAgICAgIHRoaXMuYW5ndWxhclYgPSB2My5zdW0odGhpcy5hbmd1bGFyViwgYW5ndWxhckltcHVsc2UpO1xyXG4gICAgfVxyXG4gICAgYXBwbHlQc2V1ZG9JbXB1bHNlKGltcHVsc2UsIHBvaW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGljKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5wc2V1ZG9WZWxvY2l0eSA9IHYzLnN1bSh0aGlzLnBzZXVkb1ZlbG9jaXR5LCB2My5zY2FsZShpbXB1bHNlLCB0aGlzLmludmVyc2VNYXNzKSk7XHJcbiAgICAgICAgY29uc3QgYW5ndWxhckltcHVsc2UgPSBtMy50cmFuc2Zvcm1Qb2ludCh0aGlzLmludmVyc2VJbmVydGlhLCB2My5jcm9zcyhwb2ludCwgaW1wdWxzZSkpO1xyXG4gICAgICAgIHRoaXMucHNldWRvQW5ndWxhclYgPSB2My5zdW0odGhpcy5wc2V1ZG9Bbmd1bGFyViwgYW5ndWxhckltcHVsc2UpO1xyXG4gICAgfVxyXG4gICAgYWRkVmVsb2NpdHkodikge1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSB2My5zdW0odGhpcy52ZWxvY2l0eSwgdik7XHJcbiAgICB9XHJcbiAgICBhZGRBbmd1bGFyVih2KSB7XHJcbiAgICAgICAgdGhpcy5hbmd1bGFyViA9IHYzLnN1bSh0aGlzLmFuZ3VsYXJWLCB2KTtcclxuICAgIH1cclxuICAgIGFkZEFjY2VsZXJhdGlvbih2KSB7XHJcbiAgICAgICAgdGhpcy5hY2NlbGVyYXRpb24gPSB2My5zdW0odGhpcy5hY2NlbGVyYXRpb24sIHYpO1xyXG4gICAgfSAvKlxyXG4gICAgYXBwbHlBbmd1bGFySW1wdWxzZShyYWRpdXMgOiBudW1iZXIsIGF4aXMsIHZhbHVlKSB7XHJcbiAgICAgIGNvbnN0IGRpciA9IG5vcm1hbGl6ZShbXHJcbiAgICAgICAgYXhpc1sxXSArIGF4aXNbMl0sXHJcbiAgICAgICAgYXhpc1syXSAtIGF4aXNbMF0sXHJcbiAgICAgICAgLWF4aXNbMF0gLSBheGlzWzFdLFxyXG4gICAgICBdKTtcclxuICAgICAgY29uc3QgcmFkID0gdmVjdG9yLmNyb3NzKGRpciwgYXhpcyk7XHJcbiAgICAgIGNvbnN0IGdsb2JhbERpciA9IHNjYWxlKGRpciwgdmFsdWUpO1xyXG4gICAgICBjb25zdCBnbG9iYWxSYWQgPSBzY2FsZShyYWQsIHJhZGl1cyk7XHJcbiAgXHJcbiAgICAgIHRoaXMuYXBwbHlJbXB1bHNlKGdsb2JhbERpciwgZ2xvYmFsUmFkKTtcclxuICAgIH0qL1xyXG4gICAgZ2V0RXhwYW5kZWRBQUJCKCkge1xyXG4gICAgICAgIGNvbnN0IGFhYmIgPSB0aGlzLmNvbGxpZGVyLmdldEFBQkIoKTtcclxuICAgICAgICBjb25zdCB2ZWxvY2l0eSA9IHRoaXMudmVsb2NpdHk7XHJcbiAgICAgICAgY29uc3QgdHIgPSBbUklHSURfQk9EWV9BQUJCX0JJQVMsIFJJR0lEX0JPRFlfQUFCQl9CSUFTLCBSSUdJRF9CT0RZX0FBQkJfQklBU107XHJcbiAgICAgICAgYWFiYi5taW4gPSB2My5kaWZmKGFhYmIubWluLCB0cik7XHJcbiAgICAgICAgYWFiYi5tYXggPSB2My5zdW0oYWFiYi5tYXgsIHRyKTtcclxuICAgICAgICAvKmlmKHZlbG9jaXR5WzBdID4gMTApIGFhYmIubWF4WzBdICs9IHZlbG9jaXR5WzBdXHJcbiAgICAgICAgICBpZih2ZWxvY2l0eVsxXSA+IDEwKSBhYWJiLm1heFsxXSArPSB2ZWxvY2l0eVsxXVxyXG4gICAgICAgICAgaWYodmVsb2NpdHlbMl0gPiAxMCkgYWFiYi5tYXhbMl0gKz0gdmVsb2NpdHlbMl1cclxuICAgICAgICAgIGlmKHZlbG9jaXR5WzBdIDwgLTEwKSBhYWJiLm1pblswXSArPSB2ZWxvY2l0eVswXVxyXG4gICAgICAgICAgaWYodmVsb2NpdHlbMV0gPCAtMTApIGFhYmIubWluWzFdICs9IHZlbG9jaXR5WzFdXHJcbiAgICAgICAgICBpZih2ZWxvY2l0eVsyXSA8IC0xMCkgYWFiYi5taW5bMl0gKz0gdmVsb2NpdHlbMl0qL1xyXG4gICAgICAgIHJldHVybiBhYWJiO1xyXG4gICAgfVxyXG4gICAgZ2V0QUFCQigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb2xsaWRlci5nZXRBQUJCKCk7XHJcbiAgICB9XHJcbiAgICBvblVwZGF0ZShmdW5jKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudXBkYXRlRXZlbnRGdW5jdGlvbnMuaW5kZXhPZihmdW5jKSA+IC0xKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy51cGRhdGVFdmVudEZ1bmN0aW9ucy5wdXNoKGZ1bmMpO1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRXZlbnRGdW5jdGlvbnMuZmlsdGVyKGZuID0+IGZuICE9PSBmdW5jKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgZW1pdFVwZGF0ZSgpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50RnVuY3Rpb25zLmZvckVhY2goZm4gPT4ge1xyXG4gICAgICAgICAgICBmbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblJpZ2lkQm9keS5jb25maWcgPSB7XHJcbiAgICBSSUdJRF9CT0RZX01PVkVfVFJFU0hPTEQ6IDAuMDA1LFxyXG4gICAgUklHSURfQk9EWV9BQUJCX0JJQVM6IDAuMDAwMDFcclxufTtcclxuUmlnaWRCb2R5Lmxhc3RJZCA9IDE7XHJcbmNsYXNzIFBsYXllciBleHRlbmRzIFJpZ2lkQm9keSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb2xsaWRlcikge1xyXG4gICAgICAgIHN1cGVyKGNvbGxpZGVyKTtcclxuICAgICAgICB0aGlzLmZyaWN0aW9uID0gMC4zO1xyXG4gICAgfVxyXG4gICAgYXBwbHlJbXB1bHNlKGltcHVsc2UsIHBvaW50KSB7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHYzLnN1bSh0aGlzLnZlbG9jaXR5LCB2My5zY2FsZShpbXB1bHNlLCB0aGlzLmludmVyc2VNYXNzKSk7XHJcbiAgICB9XHJcbiAgICBhcHBseVBzZXVkb0ltcHVsc2UoaW1wdWxzZSkge1xyXG4gICAgICAgIHRoaXMucHNldWRvVmVsb2NpdHkgPSB2My5zdW0odGhpcy5wc2V1ZG9WZWxvY2l0eSwgdjMuc2NhbGUoaW1wdWxzZSwgdGhpcy5pbnZlcnNlTWFzcykpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7IFJpZ2lkQm9keSwgUGxheWVyIH07XHJcbiIsImltcG9ydCBUcmVlIGZyb20gXCIuL1RyZWVcIjtcclxuaW1wb3J0IHsgZ2V0Q29udGFjdHMgYXMgZ2prIH0gZnJvbSBcIi4vZ2prXCI7XHJcbmltcG9ydCBNYW5pZm9sZCBmcm9tIFwiLi9Db250YWN0TWFuaWZvbGRcIjtcclxuaW1wb3J0IFN5c3RlbSBmcm9tIFwiLi9TeXN0ZW1cIjtcclxuaW1wb3J0IHsgQ29udGFjdENvbnN0cmFpbnQgfSBmcm9tIFwiLi9Db25zdHJhaW50c1wiO1xyXG5jb25zdCBzYW1lR3JvdXAgPSAoYm9keTEsIGJvZHkyKSA9PiB7XHJcbiAgICBpZiAoIWJvZHkxLmdyb3VwKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIGlmICghYm9keTIuZ3JvdXApXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgcmV0dXJuIGJvZHkxLmdyb3VwID09PSBib2R5Mi5ncm91cDtcclxufTtcclxuY29uc3QgcGFpckhhc2ggPSAoeCwgeSkgPT4geCA9PT0gTWF0aC5tYXgoeCwgeSkgPyB4ICogeCArIHggKyB5IDogeSAqIHkgKyB4ICsgeTtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2ltdWxhdGlvbiB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLm9iamVjdHMgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgdGhpcy50cmVlID0gbmV3IFRyZWUoKTtcclxuICAgICAgICB0aGlzLnN0YXRpY1RyZWUgPSBuZXcgVHJlZSgpO1xyXG4gICAgICAgIHRoaXMuY29sbGlzaW9ucyA9IFtdO1xyXG4gICAgICAgIHRoaXMuY29uc3RyYWludHMgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgdGhpcy51c2VDYWNoZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb25NYW5pZm9sZHMgPSBuZXcgTWFwKCk7XHJcbiAgICB9XHJcbiAgICBhZGRPYmplY3Qob2JqZWN0KSB7XHJcbiAgICAgICAgY29uc3QgeyB0cmVlLCBvYmplY3RzLCBzdGF0aWNUcmVlIH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IGFhYmIgPSBvYmplY3QuZ2V0RXhwYW5kZWRBQUJCKCk7XHJcbiAgICAgICAgb2JqZWN0cy5zZXQob2JqZWN0LmlkLCBvYmplY3QpO1xyXG4gICAgICAgIGlmIChvYmplY3Quc3RhdGljKSB7XHJcbiAgICAgICAgICAgIHN0YXRpY1RyZWUuaW5zZXJ0KGFhYmIsIG9iamVjdC5pZCk7XHJcbiAgICAgICAgICAgIG9iamVjdC5vblVwZGF0ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhYWJiID0gb2JqZWN0LmdldEFBQkIoKTtcclxuICAgICAgICAgICAgICAgIHN0YXRpY1RyZWUucmVtb3ZlKG9iamVjdC5pZCk7XHJcbiAgICAgICAgICAgICAgICBzdGF0aWNUcmVlLmluc2VydChhYWJiLCBvYmplY3QuaWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0cmVlLmluc2VydChhYWJiLCBvYmplY3QuaWQpO1xyXG4gICAgICAgIG9iamVjdC5vblVwZGF0ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFhYmIgPSBvYmplY3QuZ2V0QUFCQigpO1xyXG4gICAgICAgICAgICB0cmVlLnJlbW92ZShvYmplY3QuaWQpO1xyXG4gICAgICAgICAgICB0cmVlLmluc2VydChhYWJiLCBvYmplY3QuaWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgYWRkQ29uc3RyYWludHMoY29uc3RyYWludHMsIG5hbWUpIHtcclxuICAgICAgICB0aGlzLmNvbnN0cmFpbnRzLnNldChuYW1lLCBbLi4uY29uc3RyYWludHNdKTtcclxuICAgIH1cclxuICAgIGFkZFBvc2l0aW9uQ29uc3RyYWludHMoY29uc3RyYWludHMsIG5hbWUpIHtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uQ29uc3RyYWludHMuc2V0KG5hbWUsIFsuLi5jb25zdHJhaW50c10pO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlT2JqZWN0KG9iamVjdCkge1xyXG4gICAgICAgIHRoaXMudHJlZS5yZW1vdmUob2JqZWN0LmlkKTtcclxuICAgICAgICB0aGlzLm9iamVjdHMuZGVsZXRlKG9iamVjdC5pZCk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVDb2xsaXNpb25zKCkge1xyXG4gICAgICAgIHRoaXMuYnJvYWRQaGFzZUNvbGxpc2lvbnMgPSBbXTtcclxuICAgICAgICBjb25zdCB7IGNvbGxpc2lvbk1hbmlmb2xkcywgdHJlZSwgc3RhdGljVHJlZSwgb2JqZWN0cyB9ID0gdGhpcztcclxuICAgICAgICBsZXQga2VlcCA9IDA7XHJcbiAgICAgICAgZm9yIChjb25zdCBbaGFzaCwgbWFuaWZvbGRdIG9mIGNvbGxpc2lvbk1hbmlmb2xkcykge1xyXG4gICAgICAgICAgICBtYW5pZm9sZC51cGRhdGUoKTtcclxuICAgICAgICAgICAgaWYgKCFtYW5pZm9sZC5rZWVwKVxyXG4gICAgICAgICAgICAgICAgY29sbGlzaW9uTWFuaWZvbGRzLmRlbGV0ZShoYXNoKTtcclxuICAgICAgICAgICAga2VlcCsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGNvbnN0IFtpZCwgYm9keTFdIG9mIG9iamVjdHMpIHtcclxuICAgICAgICAgICAgaWYgKGJvZHkxLnN0YXRpYylcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBjb25zdCBpbnRlcnNlY3RzID0gdHJlZS5nZXRDb2xsaXNpb25zKGJvZHkxLmdldEFBQkIoKSwgaWQpO1xyXG4gICAgICAgICAgICBjb25zdCBpbnRlcnNlY3RXaXRoU3RhdGljcyA9IHN0YXRpY1RyZWUuZ2V0Q29sbGlzaW9ucyhib2R5MS5nZXRBQUJCKCksIGlkKTtcclxuICAgICAgICAgICAgY29uc3QgYnJvYWRQaGFzZUlkcyA9IFsuLi5pbnRlcnNlY3RXaXRoU3RhdGljcywgLi4uaW50ZXJzZWN0c107XHJcbiAgICAgICAgICAgIHRoaXMuYnJvYWRQaGFzZUNvbGxpc2lvbnMucHVzaChbYm9keTEuaWQsIGJyb2FkUGhhc2VJZHNdKTtcclxuICAgICAgICAgICAgdHJlZS5lbGVtZW50cy5nZXQoaWQpLmlzQ2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChicm9hZFBoYXNlSWRzLmxlbmd0aCAhPSAwKVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDAsIG4gPSBicm9hZFBoYXNlSWRzLmxlbmd0aDsgaiA8IG47IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvZHkyID0gb2JqZWN0cy5nZXQoYnJvYWRQaGFzZUlkc1tqXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNhbWVHcm91cChib2R5MSwgYm9keTIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoYXNoID0gcGFpckhhc2goYm9keTEuaWQsIGJvZHkyLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWFuaWZvbGQgPSB0aGlzLmNvbGxpc2lvbk1hbmlmb2xkcy5nZXQoaGFzaCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hbmlmb2xkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3R1YWxDb250YWN0cyA9IGdqayhib2R5MS5jb2xsaWRlciwgYm9keTIuY29sbGlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3R1YWxDb250YWN0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hbmlmb2xkID0gbmV3IE1hbmlmb2xkKGFjdHVhbENvbnRhY3RzLm1hcCgoYykgPT4gbmV3IENvbnRhY3RDb25zdHJhaW50KGJvZHkxLCBib2R5MiwgYy5yYUxvY2FsLCBjLnJiTG9jYWwsIGMucmEsIGMucmIsIGMuUEEsIGMuUEIsIGMubiwgYy5wb3NpdGlvbkVycm9yLCBjLmksIGMuaikpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xsaXNpb25NYW5pZm9sZHMuc2V0KGhhc2gsIG1hbmlmb2xkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudHJlZS5zZXRVbmNoZWNrZWQoKTtcclxuICAgICAgICB0aGlzLnN0YXRpY1RyZWUuc2V0VW5jaGVja2VkKCk7XHJcbiAgICB9XHJcbiAgICB0aWNrKGR0KSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDb2xsaXNpb25zKCk7XHJcbiAgICAgICAgY29uc3QgeyBvYmplY3RzLCBjb2xsaXNpb25NYW5pZm9sZHMgfSA9IHRoaXM7XHJcbiAgICAgICAgZm9yIChjb25zdCBbaWQsIG9iamVjdF0gb2Ygb2JqZWN0cykge1xyXG4gICAgICAgICAgICBvYmplY3QuaW50ZWdyYXRlRm9yY2VzKGR0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc3lzdGVtID0gbmV3IFN5c3RlbSgpO1xyXG4gICAgICAgIHN5c3RlbS51c2VDYWNoZSA9IHRoaXMudXNlQ2FjaGU7XHJcbiAgICAgICAgY29uc3QgZnJpY3Rpb25TeXN0ZW0gPSBuZXcgU3lzdGVtKGZhbHNlKTtcclxuICAgICAgICBjb25zdCBjb250YWN0RXF1YXRpb25zID0gW107XHJcbiAgICAgICAgY29uc3QgZnJpY3Rpb25FcXVhdGlvbnMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBba2V5LCBtYW5pZm9sZF0gb2YgY29sbGlzaW9uTWFuaWZvbGRzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHVzZVZlbG9jaXR5QmlhcyA9IG1hbmlmb2xkLmNvbnRhY3RzLmxlbmd0aCA8IDI7XHJcbiAgICAgICAgICAgIG1hbmlmb2xkLmNvbnRhY3RzLmZvckVhY2goKGNvbnRhY3RDb25zdHJhaW50LCBfaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29udGFjdEVxdWF0aW9uID0gY29udGFjdENvbnN0cmFpbnQuZ2V0RXF1YXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IFtmRXF1YXRpb24xLCBmRXF1YXRpb24yXSA9IGNvbnRhY3RDb25zdHJhaW50LmdldEZyaWN0aW9uRXF1YXRpb25zKCk7XHJcbiAgICAgICAgICAgICAgICBjb250YWN0RXF1YXRpb25zLnB1c2goY29udGFjdEVxdWF0aW9uKTtcclxuICAgICAgICAgICAgICAgIGZyaWN0aW9uRXF1YXRpb25zLnB1c2goZkVxdWF0aW9uMSwgZkVxdWF0aW9uMik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzeXN0ZW0uYWRkRXF1YXRpb25zKGNvbnRhY3RFcXVhdGlvbnMpO1xyXG4gICAgICAgIGZvciAobGV0IFtuYW1lLCBjb25zdHJhaW50c10gb2YgdGhpcy5jb25zdHJhaW50cykge1xyXG4gICAgICAgICAgICBjb25zdCBlcXVhdGlvbnMgPSBbXTtcclxuICAgICAgICAgICAgY29uc3RyYWludHMuZm9yRWFjaChjID0+IHtcclxuICAgICAgICAgICAgICAgIGMudXBkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlcXVhdGlvbiA9IGMuZ2V0RXF1YXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGVxdWF0aW9ucy5wdXNoKGVxdWF0aW9uKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHN5c3RlbS5hZGRFcXVhdGlvbnMoZXF1YXRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9zeXN0ZW0udXBkYXRlRXF1YXRpb25zKGR0KTtcclxuICAgICAgICBmcmljdGlvblN5c3RlbS5hZGRFcXVhdGlvbnMoZnJpY3Rpb25FcXVhdGlvbnMpO1xyXG4gICAgICAgIGZyaWN0aW9uU3lzdGVtLnVwZGF0ZUVxdWF0aW9ucyhkdCk7XHJcbiAgICAgICAgZnJpY3Rpb25TeXN0ZW0uZ2VuZXJhdGVTeXN0ZW0oZHQpO1xyXG4gICAgICAgIGZyaWN0aW9uU3lzdGVtLnNvbHZlUEdTKGR0KTtcclxuICAgICAgICBzeXN0ZW0udXBkYXRlRXF1YXRpb25zKGR0KTtcclxuICAgICAgICBzeXN0ZW0uZ2VuZXJhdGVTeXN0ZW0oZHQpO1xyXG4gICAgICAgIGNvbnN0IGxhbWJkYSA9IHN5c3RlbS5zb2x2ZVBHUyhkdCwgdHJ1ZSk7XHJcbiAgICAgICAgY29uc3QgbGVuID0gZnJpY3Rpb25FcXVhdGlvbnMubGVuZ3RoIC8gMjtcclxuICAgICAgICAvKmZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgZnJpY3Rpb25FcXVhdGlvbnNbMiAqIGldLmxhbWJkYU1pbiAqPSBsYW1iZGFbaV07XHJcbiAgICAgICAgICAgIGZyaWN0aW9uRXF1YXRpb25zWzIgKiBpXS5sYW1iZGFNYXggPSBsYW1iZGFbaV07XHJcbiAgICAgICAgICAgIGZyaWN0aW9uRXF1YXRpb25zWzIgKiBpICsgMV0ubGFtYmRhTWluICo9IGxhbWJkYVtpXTtcclxuICAgICAgICAgICAgZnJpY3Rpb25FcXVhdGlvbnNbMiAqIGkgKyAxXS5sYW1iZGFNYXggPSBsYW1iZGFbaV07XHJcbiAgICAgICAgICB9Ki9cclxuICAgICAgICBmb3IgKGNvbnN0IFtpZCwgb2JqZWN0XSBvZiBvYmplY3RzKSB7XHJcbiAgICAgICAgICAgIG9iamVjdC5pbnRlZ3JhdGVWZWxvY2l0aWVzKGR0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLmZvckVhY2goKG9iamVjdCkgPT4gb2JqZWN0LnVwZGF0ZUludmVyc2VJbmVydGlhKCkpO1xyXG4gICAgICAgIGxldCBuZHggPSAwO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCBtYW5pZm9sZF0gb2YgdGhpcy5jb2xsaXNpb25NYW5pZm9sZHMpIHtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgbWFuaWZvbGQuY29udGFjdHMuZm9yRWFjaCgoYykgPT4ge1xyXG4gICAgICAgICAgICBjLnByZXZMYW1iZGEgPSBsYW1iZGFbbmR4XVxyXG4gICAgICAgICAgICBuZHgrKztcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0qL1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgY29uc3QgcG9zaXRpb25TeXN0ZW0gPSBuZXcgU3lzdGVtKCk7XHJcbiAgICAgICAgY29uc3QgcG9zaXRpb25Db25zdHJhaW50cyA9IFtdO1xyXG4gICAgXHJcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCBtYW5pZm9sZF0gb2YgbWFuaWZvbGRzKSB7XHJcbiAgICAgICAgICBjb25zdCB7IGNvbnRhY3RzIH0gPSBtYW5pZm9sZDtcclxuICAgICAgICAgIGlmIChjb250YWN0cy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uQ29uc3RyYWludHMucHVzaChcclxuICAgICAgICAgICAgICAuLi5jb250YWN0cy5tYXAoKGMpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgICAgICAgYm9keTEsXHJcbiAgICAgICAgICAgICAgICAgIGJvZHkyLFxyXG4gICAgICAgICAgICAgICAgICByYUxvY2FsLFxyXG4gICAgICAgICAgICAgICAgICByYkxvY2FsLFxyXG4gICAgICAgICAgICAgICAgICByYSxcclxuICAgICAgICAgICAgICAgICAgcmIsXHJcbiAgICAgICAgICAgICAgICAgIGksXHJcbiAgICAgICAgICAgICAgICAgIGosXHJcbiAgICAgICAgICAgICAgICAgIHBlbkRlcHRoLFxyXG4gICAgICAgICAgICAgICAgICBuLFxyXG4gICAgICAgICAgICAgICAgfSA9IGM7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb25zdHJhaW50ID0gbmV3IFBvc2l0aW9uQ29uc3RyYWludChcclxuICAgICAgICAgICAgICAgICAgYm9keTEsXHJcbiAgICAgICAgICAgICAgICAgIGJvZHkyLFxyXG4gICAgICAgICAgICAgICAgICBuLFxyXG4gICAgICAgICAgICAgICAgICByYSxcclxuICAgICAgICAgICAgICAgICAgcmIsXHJcbiAgICAgICAgICAgICAgICAgIHJhTG9jYWwsXHJcbiAgICAgICAgICAgICAgICAgIHJiTG9jYWwsXHJcbiAgICAgICAgICAgICAgICAgIDAuMSxcclxuICAgICAgICAgICAgICAgICAgMC4wMDAxLFxyXG4gICAgICAgICAgICAgICAgICBwZW5EZXB0aFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnN0cmFpbnQ7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcG9zaXRpb25TeXN0ZW0uYWRkQ29uc3RyYWludChwb3NpdGlvbkNvbnN0cmFpbnRzKTtcclxuICAgICAgICBmb3IgKGxldCBbbmFtZSwgY29uc3RyYWludHNdIG9mIHRoaXMucG9zaXRpb25Db25zdHJhaW50cykge1xyXG4gICAgICAgICAgcG9zaXRpb25TeXN0ZW0uYWRkQ29uc3RyYWludChjb25zdHJhaW50cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBvc2l0aW9uU3lzdGVtLnVwZGF0ZUVxdWF0aW9ucyhkdCk7XHJcbiAgICAgICAgcG9zaXRpb25TeXN0ZW0uZ2VuZXJhdGVTeXN0ZW0oZHQpO1xyXG4gICAgXHJcbiAgICAgICAgcG9zaXRpb25TeXN0ZW0uc29sdmVQR1MoZHQpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gdGhpcy5vYmplY3RzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgdGhpcy5vYmplY3RzW2ldLmludGVncmF0ZVBzZXVkb1ZlbG9jaXRpZXMoZHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm9iamVjdHMuZm9yRWFjaCgob2JqZWN0KSA9PiBvYmplY3QudXBkYXRlSW52ZXJzZUluZXJ0aWEoKSk7Ki9cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgY29uZmlnIGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5pbXBvcnQgRGVidWcgZnJvbSBcIi4vRGVidWdcIjtcclxubGV0IGFyciA9IFtdO1xyXG5sZXQgbyA9IDA7XHJcbmxldCBmID0gdHJ1ZTtcclxuY29uc3QgX2xvZyA9ICh2YWwpID0+IHtcclxuICAgIG8rKztcclxuICAgIGlmIChmKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYXJyKTtcclxuICAgICAgICBmID0gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKG8gPCAyMDAgJiYgbyAlIDEwID09IDApIHtcclxuICAgICAgICBhcnIucHVzaCh2YWwpO1xyXG4gICAgfVxyXG59O1xyXG5jb25zdCB7IFNPTFZFUl9JVEVSQVRJT05TX05VTSB9ID0gY29uZmlnO1xyXG5jb25zdCB2NiA9IHtcclxuICAgIGRvdChhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIGFbMF0gKiBiWzBdICtcclxuICAgICAgICAgICAgYVsxXSAqIGJbMV0gK1xyXG4gICAgICAgICAgICBhWzJdICogYlsyXSArXHJcbiAgICAgICAgICAgIGFbM10gKiBiWzNdICtcclxuICAgICAgICAgICAgYVs0XSAqIGJbNF0gK1xyXG4gICAgICAgICAgICBhWzVdICogYls1XTtcclxuICAgIH0sXHJcbiAgICBzY2FsZShhLCBmYWMpIHtcclxuICAgICAgICByZXR1cm4gW2FbMF0gKiBmYWMsIGFbMV0gKiBmYWMsIGFbMl0gKiBmYWMsIGFbM10gKiBmYWMsIGFbNF0gKiBmYWMsIGFbNV0gKiBmYWNdO1xyXG4gICAgfSxcclxuICAgIHN1bShhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgYVswXSArIGJbMF0sXHJcbiAgICAgICAgICAgIGFbMV0gKyBiWzFdLFxyXG4gICAgICAgICAgICBhWzJdICsgYlsyXSxcclxuICAgICAgICAgICAgYVszXSArIGJbM10sXHJcbiAgICAgICAgICAgIGFbNF0gKyBiWzRdLFxyXG4gICAgICAgICAgICBhWzVdICsgYls1XVxyXG4gICAgICAgIF07XHJcbiAgICB9LFxyXG4gICAgZnJvbXYzKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gWy4uLmEsIC4uLmJdO1xyXG4gICAgfVxyXG59O1xyXG5jb25zdCBub3JtID0gKHYpID0+IE1hdGguc3FydCh2LnJlZHVjZSgoYWNjLCBlbCkgPT4gYWNjICs9IGVsICogZWwsIDApKTtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3lzdGVtIHtcclxuICAgIGNvbnN0cnVjdG9yKHVzZUNhY2hlID0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMuZXF1YXRpb25zID0gW107XHJcbiAgICAgICAgdGhpcy51c2VDYWNoZSA9IHVzZUNhY2hlO1xyXG4gICAgfVxyXG4gICAgYWRkRXF1YXRpb25zKGVxdWF0aW9ucykge1xyXG4gICAgICAgIHRoaXMuZXF1YXRpb25zLnB1c2goLi4uZXF1YXRpb25zKTtcclxuICAgIH1cclxuICAgIGdlbmVyYXRlQm9keU1hcHBpbmcoKSB7XHJcbiAgICAgICAgY29uc3QgZXF1YXRpb25zID0gdGhpcy5lcXVhdGlvbnM7XHJcbiAgICAgICAgY29uc3QgbiA9IGVxdWF0aW9ucy5sZW5ndGg7XHJcbiAgICAgICAgY29uc3QgYm9kaWVzTWFwID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIGNvbnN0IEptYXAgPSBbXTtcclxuICAgICAgICBsZXQgY291bnRlciA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgZXEgPSBlcXVhdGlvbnNbaV07XHJcbiAgICAgICAgICAgIGxldCBib2R5SW5kZXgxID0gYm9kaWVzTWFwLmdldChlcS5jb25zdHJhaW50LmJvZHkxLmlkKTtcclxuICAgICAgICAgICAgaWYgKGJvZHlJbmRleDEgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgYm9keUluZGV4MSA9IGNvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgIGJvZGllc01hcC5zZXQoZXEuY29uc3RyYWludC5ib2R5MS5pZCwgYm9keUluZGV4MSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGJvZHlJbmRleDIgPSBib2RpZXNNYXAuZ2V0KGVxLmNvbnN0cmFpbnQuYm9keTIuaWQpO1xyXG4gICAgICAgICAgICBpZiAoYm9keUluZGV4MiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBib2R5SW5kZXgyID0gY291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgYm9kaWVzTWFwLnNldChlcS5jb25zdHJhaW50LmJvZHkyLmlkLCBib2R5SW5kZXgyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBKbWFwLnB1c2goYm9keUluZGV4MSwgYm9keUluZGV4Mik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYm9kaWVzTWFwID0gYm9kaWVzTWFwO1xyXG4gICAgICAgIHRoaXMuSm1hcCA9IEptYXA7XHJcbiAgICB9XHJcbiAgICBnZW5lcmF0ZVN5c3RlbShkZWx0YVRpbWUpIHtcclxuICAgICAgICAvL051bWVyYXRpbmcgYm9kaWVzXHJcbiAgICAgICAgdGhpcy5nZW5lcmF0ZUJvZHlNYXBwaW5nKCk7XHJcbiAgICB9XHJcbiAgICAvL0ogKiBWZWxcclxuICAgIHNvbHZlUEdTKGRlbHRhVGltZSwgbG9nID0gZmFsc2UpIHtcclxuICAgICAgICBjb25zdCB7IEptYXAsIGJvZGllc01hcCwgZXF1YXRpb25zIH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IG51bUJvZGllcyA9IGJvZGllc01hcC5zaXplO1xyXG4gICAgICAgIGNvbnN0IG4gPSBlcXVhdGlvbnMubGVuZ3RoO1xyXG4gICAgICAgIGNvbnN0IGQgPSBbXTtcclxuICAgICAgICBjb25zdCBsYW1iZGEwID0gbmV3IEFycmF5KG4pLmZpbGwoMCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspXHJcbiAgICAgICAgICAgIGlmIChlcXVhdGlvbnNbaV0ucHJldkxhbWJkYSlcclxuICAgICAgICAgICAgICAgIGxhbWJkYTBbaV0gPSBlcXVhdGlvbnNbaV0ucHJldkxhbWJkYTtcclxuICAgICAgICBjb25zdCBCbCA9IG5ldyBBcnJheShudW1Cb2RpZXMpLmZpbGwoWzAsIDAsIDAsIDAsIDAsIDBdKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBiMSA9IEptYXBbaSAqIDJdO1xyXG4gICAgICAgICAgICBjb25zdCBiMiA9IEptYXBbaSAqIDIgKyAxXTtcclxuICAgICAgICAgICAgQmxbYjFdID0gdjYuc3VtKHY2LnNjYWxlKGVxdWF0aW9uc1tpXS5CWzBdLCBsYW1iZGEwW2ldKSwgQmxbYjFdKTtcclxuICAgICAgICAgICAgQmxbYjJdID0gdjYuc3VtKHY2LnNjYWxlKGVxdWF0aW9uc1tpXS5CWzFdLCBsYW1iZGEwW2ldKSwgQmxbYjJdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9QR1NcclxuICAgICAgICBjb25zdCBsYW1iZGEgPSBbLi4ubGFtYmRhMF07XHJcbiAgICAgICAgY29uc3QgbGFtYmRhT2xkID0gWy4uLmxhbWJkYV07XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgZC5wdXNoKGVxdWF0aW9uc1tpXS5lZmZNYXNzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGZsYWcgPSB0cnVlO1xyXG4gICAgICAgIGxldCBudW1JdGVyID0gU09MVkVSX0lURVJBVElPTlNfTlVNO1xyXG4gICAgICAgIGNvbnN0IGRlbHRhTGFtYmRhID0gbmV3IEFycmF5KG4pLmZpbGwoMCk7XHJcbiAgICAgICAgbGV0IHN0ciA9ICcnO1xyXG4gICAgICAgIHdoaWxlIChudW1JdGVyID4gMCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZXEgPSBlcXVhdGlvbnNbaV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBKID0gZXEuX0o7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBiMSA9IEptYXBbaSAqIDJdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYjIgPSBKbWFwW2kgKiAyICsgMV07XHJcbiAgICAgICAgICAgICAgICBkZWx0YUxhbWJkYVtpXSA9IChlcS5iaWFzIC0gdjYuZG90KEpbMF0sIEJsW2IxXSkgLSB2Ni5kb3QoSlsxXSwgQmxbYjJdKSkgLyBkW2ldO1xyXG4gICAgICAgICAgICAgICAgbGFtYmRhMFtpXSA9IGxhbWJkYVtpXTtcclxuICAgICAgICAgICAgICAgIGxhbWJkYVtpXSA9IE1hdGgubWF4KGVxLmxhbWJkYU1pbiwgTWF0aC5taW4obGFtYmRhMFtpXSArIGRlbHRhTGFtYmRhW2ldLCBlcS5sYW1iZGFNYXgpKTtcclxuICAgICAgICAgICAgICAgIGRlbHRhTGFtYmRhW2ldID0gbGFtYmRhW2ldIC0gbGFtYmRhMFtpXTtcclxuICAgICAgICAgICAgICAgIEJsW2IxXSA9IHY2LnN1bShCbFtiMV0sIHY2LnNjYWxlKGVxLkJbMF0sIGRlbHRhTGFtYmRhW2ldKSk7XHJcbiAgICAgICAgICAgICAgICBCbFtiMl0gPSB2Ni5zdW0oQmxbYjJdLCB2Ni5zY2FsZShlcS5CWzFdLCBkZWx0YUxhbWJkYVtpXSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChsb2cpXHJcbiAgICAgICAgICAgICAgICBzdHIgKz0gYCR7bm9ybShkZWx0YUxhbWJkYSl9XFxuYDtcclxuICAgICAgICAgICAgbnVtSXRlci0tO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobG9nKVxyXG4gICAgICAgICAgICBEZWJ1Zy5kYXRhLlNPTFZFUl9FUlJPUiA9IG5vcm0oZGVsdGFMYW1iZGEpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGVxdWF0aW9uc1tpXS5hcHBseUltcHVsc2UobGFtYmRhW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxhbWJkYTtcclxuICAgIH1cclxuICAgIHVwZGF0ZUVxdWF0aW9ucyhkZWx0YVRpbWUpIHtcclxuICAgICAgICBjb25zdCB7IGVxdWF0aW9ucyB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCBuID0gZXF1YXRpb25zLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBlcXVhdGlvbnNbaV0udXBkYXRlTGVmdFBhcnQoZGVsdGFUaW1lKTtcclxuICAgICAgICAgICAgZXF1YXRpb25zW2ldLnVwZGF0ZVJpZ2h0UGFydChkZWx0YVRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGFwcGx5UmVzb2x2aW5nSW1wdWxzZXMobGFtYmRhKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSB0aGlzLmVxdWF0aW9ucy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5lcXVhdGlvbnNbaV0uYXBwbHlJbXB1bHNlKGxhbWJkYVtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYXBwbHlSZXNvbHZpbmdQc2V1ZG9JbXB1bHNlcyhsYW1iZGEpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbiA9IHRoaXMuZXF1YXRpb25zLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmVxdWF0aW9uc1tpXS5hcHBseVBzZXVkb0ltcHVsc2UobGFtYmRhW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuU3lzdGVtLnVzZUNhY2hlID0gdHJ1ZTtcclxuIiwiaW1wb3J0IHsgQUFCQiB9IGZyb20gXCJyb21hbnBwcG1hdGhcIjtcclxuY29uc3QgZ2V0Qm91bmRBYWJiID0gKGFhYmIxLCBhYWJiMikgPT4ge1xyXG4gICAgY29uc3QgeDEgPSBhYWJiMS5taW5bMF0gPCBhYWJiMi5taW5bMF0gPyBhYWJiMS5taW5bMF0gOiBhYWJiMi5taW5bMF07XHJcbiAgICBjb25zdCB4MiA9IGFhYmIxLm1heFswXSA+IGFhYmIyLm1heFswXSA/IGFhYmIxLm1heFswXSA6IGFhYmIyLm1heFswXTtcclxuICAgIGNvbnN0IHkxID0gYWFiYjEubWluWzFdIDwgYWFiYjIubWluWzFdID8gYWFiYjEubWluWzFdIDogYWFiYjIubWluWzFdO1xyXG4gICAgY29uc3QgeTIgPSBhYWJiMS5tYXhbMV0gPiBhYWJiMi5tYXhbMV0gPyBhYWJiMS5tYXhbMV0gOiBhYWJiMi5tYXhbMV07XHJcbiAgICBjb25zdCB6MSA9IGFhYmIxLm1pblsyXSA8IGFhYmIyLm1pblsyXSA/IGFhYmIxLm1pblsyXSA6IGFhYmIyLm1pblsyXTtcclxuICAgIGNvbnN0IHoyID0gYWFiYjEubWF4WzJdID4gYWFiYjIubWF4WzJdID8gYWFiYjEubWF4WzJdIDogYWFiYjIubWF4WzJdO1xyXG4gICAgcmV0dXJuIG5ldyBBQUJCKFt4MSwgeTEsIHoxXSwgW3gyLCB5MiwgejJdKTtcclxufTtcclxuY29uc3QgaXNDb2xsaWRlID0gKGFhYmIxLCBhYWJiMikgPT4ge1xyXG4gICAgaWYgKGFhYmIxLm1pblswXSA8PSBhYWJiMi5tYXhbMF0gJiZcclxuICAgICAgICBhYWJiMS5tYXhbMF0gPj0gYWFiYjIubWluWzBdICYmXHJcbiAgICAgICAgYWFiYjEubWluWzFdIDw9IGFhYmIyLm1heFsxXSAmJlxyXG4gICAgICAgIGFhYmIxLm1heFsxXSA+PSBhYWJiMi5taW5bMV0gJiZcclxuICAgICAgICBhYWJiMS5taW5bMl0gPD0gYWFiYjIubWF4WzJdICYmXHJcbiAgICAgICAgYWFiYjEubWF4WzJdID49IGFhYmIyLm1pblsyXSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5jb25zdCBnZXRTaXplID0gKGFhYmIpID0+IHtcclxuICAgIGNvbnN0IGFyZWEgPSBNYXRoLmFicyhhYWJiLm1heFswXSAtIGFhYmIubWluWzBdKSAqXHJcbiAgICAgICAgTWF0aC5hYnMoYWFiYi5tYXhbMV0gLSBhYWJiLm1pblsxXSkgKlxyXG4gICAgICAgIE1hdGguYWJzKGFhYmIubWF4WzJdIC0gYWFiYi5taW5bMl0pO1xyXG4gICAgcmV0dXJuIGFyZWE7XHJcbn07XHJcbmNsYXNzIE5vZGUge1xyXG4gICAgY29uc3RydWN0b3IoYWFiYiwgaXNMZWFmLCBpZCkge1xyXG4gICAgICAgIHRoaXMuYWFiYiA9IGFhYmI7XHJcbiAgICAgICAgdGhpcy5pc0xlYWYgPSBpc0xlYWY7XHJcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLmNoaWxkMSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jaGlsZDIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuaXNDaGVja2VkID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJlZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnJvb3QgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudHMgPSBuZXcgTWFwKCk7XHJcbiAgICB9XHJcbiAgICBzZXRVbmNoZWNrZWQoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnJvb3QpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBjb25zdCBzdGFjayA9IFt0aGlzLnJvb3RdO1xyXG4gICAgICAgIHdoaWxlIChzdGFjay5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICBjb25zdCBub2RlID0gc3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgIGlmIChub2RlLmlzTGVhZikge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5pc0NoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChub2RlLmNoaWxkMSlcclxuICAgICAgICAgICAgICAgIHN0YWNrLnB1c2gobm9kZS5jaGlsZDEpO1xyXG4gICAgICAgICAgICBpZiAobm9kZS5jaGlsZDIpXHJcbiAgICAgICAgICAgICAgICBzdGFjay5wdXNoKG5vZGUuY2hpbGQyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRCZXN0U2libGluZyhsZWFmKSB7XHJcbiAgICAgICAgbGV0IHBvdGVudGlhbCA9IHRoaXMucm9vdDtcclxuICAgICAgICB3aGlsZSAoIXBvdGVudGlhbC5pc0xlYWYpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2l6ZSA9IGdldFNpemUocG90ZW50aWFsLmFhYmIpO1xyXG4gICAgICAgICAgICBjb25zdCBjb21iaW5lZEFBQkIgPSBnZXRCb3VuZEFhYmIocG90ZW50aWFsLmFhYmIsIGxlYWYuYWFiYik7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbWJpbmVkU2l6ZSA9IGdldFNpemUoY29tYmluZWRBQUJCKTtcclxuICAgICAgICAgICAgbGV0IGNvc3QgPSBjb21iaW5lZFNpemU7XHJcbiAgICAgICAgICAgIGxldCBpbmhlckNvc3QgPSBjb21iaW5lZFNpemUgLSBzaXplO1xyXG4gICAgICAgICAgICBsZXQgY29zdDE7XHJcbiAgICAgICAgICAgIGlmIChwb3RlbnRpYWwuY2hpbGQxLmlzTGVhZikge1xyXG4gICAgICAgICAgICAgICAgY29zdDEgPSBnZXRTaXplKHBvdGVudGlhbC5jaGlsZDEuYWFiYikgKyBpbmhlckNvc3Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb3N0MSA9XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0U2l6ZShnZXRCb3VuZEFhYmIobGVhZi5hYWJiLCBwb3RlbnRpYWwuY2hpbGQxLmFhYmIpKSAtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldFNpemUocG90ZW50aWFsLmNoaWxkMS5hYWJiKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaGVyQ29zdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgY29zdDI7XHJcbiAgICAgICAgICAgIGlmIChwb3RlbnRpYWwuY2hpbGQyLmlzTGVhZikge1xyXG4gICAgICAgICAgICAgICAgY29zdDIgPSBnZXRTaXplKHBvdGVudGlhbC5jaGlsZDIuYWFiYikgKyBpbmhlckNvc3Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb3N0MiA9XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0U2l6ZShnZXRCb3VuZEFhYmIobGVhZi5hYWJiLCBwb3RlbnRpYWwuY2hpbGQyLmFhYmIpKSAtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldFNpemUocG90ZW50aWFsLmNoaWxkMi5hYWJiKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaGVyQ29zdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY29zdCA8IGNvc3QxICYmIGNvc3QgPCBjb3N0MilcclxuICAgICAgICAgICAgICAgIHJldHVybiBwb3RlbnRpYWw7XHJcbiAgICAgICAgICAgIGlmIChjb3N0MSA8IGNvc3QyKSB7XHJcbiAgICAgICAgICAgICAgICBwb3RlbnRpYWwgPSBwb3RlbnRpYWwuY2hpbGQxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHBvdGVudGlhbCA9IHBvdGVudGlhbC5jaGlsZDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwb3RlbnRpYWw7XHJcbiAgICB9XHJcbiAgICBpbnNlcnQoYWFiYiwgaWQpIHtcclxuICAgICAgICBjb25zdCBsZWFmID0gbmV3IE5vZGUoYWFiYiwgdHJ1ZSwgaWQpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudHMuc2V0KGlkLCBsZWFmKTtcclxuICAgICAgICBpZiAodGhpcy5yb290ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm9vdCA9IGxlYWY7XHJcbiAgICAgICAgICAgIHRoaXMucm9vdC5wYXJlbnQgPSBudWxsO1xyXG4gICAgICAgICAgICByZXR1cm4gbGVhZjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc2libGluZyA9IHRoaXMuZ2V0QmVzdFNpYmxpbmcobGVhZik7XHJcbiAgICAgICAgY29uc3Qgb2xkUGFyZW50ID0gc2libGluZy5wYXJlbnQ7XHJcbiAgICAgICAgY29uc3QgbmV3UGFyZW50ID0gbmV3IE5vZGUobGVhZi5hYWJiLCBmYWxzZSwgbnVsbCk7XHJcbiAgICAgICAgbmV3UGFyZW50LnBhcmVudCA9IG9sZFBhcmVudDtcclxuICAgICAgICBuZXdQYXJlbnQuYWFiYiA9IGdldEJvdW5kQWFiYihsZWFmLmFhYmIsIHNpYmxpbmcuYWFiYik7XHJcbiAgICAgICAgaWYgKG9sZFBhcmVudCkge1xyXG4gICAgICAgICAgICBpZiAob2xkUGFyZW50LmNoaWxkMSA9PT0gc2libGluZylcclxuICAgICAgICAgICAgICAgIG9sZFBhcmVudC5jaGlsZDEgPSBuZXdQYXJlbnQ7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIG9sZFBhcmVudC5jaGlsZDIgPSBuZXdQYXJlbnQ7XHJcbiAgICAgICAgICAgIG5ld1BhcmVudC5jaGlsZDEgPSBzaWJsaW5nO1xyXG4gICAgICAgICAgICBuZXdQYXJlbnQuY2hpbGQyID0gbGVhZjtcclxuICAgICAgICAgICAgc2libGluZy5wYXJlbnQgPSBuZXdQYXJlbnQ7XHJcbiAgICAgICAgICAgIGxlYWYucGFyZW50ID0gbmV3UGFyZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbmV3UGFyZW50LmNoaWxkMSA9IHNpYmxpbmc7XHJcbiAgICAgICAgICAgIG5ld1BhcmVudC5jaGlsZDIgPSBsZWFmO1xyXG4gICAgICAgICAgICBzaWJsaW5nLnBhcmVudCA9IG5ld1BhcmVudDtcclxuICAgICAgICAgICAgbGVhZi5wYXJlbnQgPSBuZXdQYXJlbnQ7XHJcbiAgICAgICAgICAgIHRoaXMucm9vdCA9IG5ld1BhcmVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGluZGV4ID0gbGVhZi5wYXJlbnQ7XHJcbiAgICAgICAgd2hpbGUgKGluZGV4KSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5yZWJhbGFuY2UoaW5kZXgpO1xyXG4gICAgICAgICAgICBpbmRleCA9IGluZGV4LnBhcmVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxlYWY7XHJcbiAgICB9XHJcbiAgICBnZXRDb2xsaXNpb25zKGFhYmIsIGlkKSB7XHJcbiAgICAgICAgY29uc3QgY29scyA9IFtdO1xyXG4gICAgICAgIGNvbnN0IGl0ZXIgPSAoX25vZGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFfbm9kZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChfbm9kZS5pZCA9PT0gaWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaXNDb2xsaWRlKGFhYmIsIF9ub2RlLmFhYmIpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoX25vZGUuaXNMZWFmICYmICFfbm9kZS5pc0NoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xzLnB1c2goX25vZGUuaWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaXRlcihfbm9kZS5jaGlsZDEpO1xyXG4gICAgICAgICAgICAgICAgaXRlcihfbm9kZS5jaGlsZDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpdGVyKHRoaXMucm9vdCk7XHJcbiAgICAgICAgcmV0dXJuIGNvbHM7XHJcbiAgICB9XHJcbiAgICByZW1vdmUoaWQpIHtcclxuICAgICAgICBjb25zdCBsZWFmID0gdGhpcy5lbGVtZW50cy5nZXQoaWQpO1xyXG4gICAgICAgIGlmICghbGVhZilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmIChsZWFmID09PSB0aGlzLnJvb3QpIHtcclxuICAgICAgICAgICAgdGhpcy5yb290ID0gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwYXJlbnQgPSBsZWFmLnBhcmVudDtcclxuICAgICAgICBjb25zdCBncmFuZFBhcmVudCA9IHBhcmVudCA/IHBhcmVudC5wYXJlbnQgOiBudWxsO1xyXG4gICAgICAgIGxldCBzaWJsaW5nO1xyXG4gICAgICAgIGlmIChwYXJlbnQuY2hpbGQxID09PSBsZWFmKVxyXG4gICAgICAgICAgICBzaWJsaW5nID0gcGFyZW50LmNoaWxkMjtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHNpYmxpbmcgPSBwYXJlbnQuY2hpbGQxO1xyXG4gICAgICAgIGlmIChncmFuZFBhcmVudCkge1xyXG4gICAgICAgICAgICBpZiAoZ3JhbmRQYXJlbnQuY2hpbGQxID09PSBwYXJlbnQpXHJcbiAgICAgICAgICAgICAgICBncmFuZFBhcmVudC5jaGlsZDEgPSBzaWJsaW5nO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBncmFuZFBhcmVudC5jaGlsZDIgPSBzaWJsaW5nO1xyXG4gICAgICAgICAgICBzaWJsaW5nLnBhcmVudCA9IGdyYW5kUGFyZW50O1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSBncmFuZFBhcmVudDtcclxuICAgICAgICAgICAgd2hpbGUgKGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IHRoaXMucmViYWxhbmNlKGluZGV4KTtcclxuICAgICAgICAgICAgICAgIGluZGV4ID0gaW5kZXgucGFyZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJvb3QgPSBzaWJsaW5nO1xyXG4gICAgICAgICAgICBzaWJsaW5nLnBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZWxlbWVudHMuZGVsZXRlKGlkKTtcclxuICAgIH1cclxuICAgIHJlYmFsYW5jZShsZWFmKSB7XHJcbiAgICAgICAgaWYgKCFsZWFmKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobGVhZi5pc0xlYWYgfHwgdGhpcy5nZXRIZWlnaHQobGVhZikgPCAyKSB7XHJcbiAgICAgICAgICAgIGxlYWYuYWFiYiA9IGdldEJvdW5kQWFiYihsZWFmLmNoaWxkMS5hYWJiLCBsZWFmLmNoaWxkMi5hYWJiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGxlYWY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGNoaWxkMSA9IGxlYWYuY2hpbGQxO1xyXG4gICAgICAgIGNvbnN0IGNoaWxkMiA9IGxlYWYuY2hpbGQyO1xyXG4gICAgICAgIGNvbnN0IGJhbGFuY2UgPSB0aGlzLmdldEhlaWdodChjaGlsZDIpIC0gdGhpcy5nZXRIZWlnaHQoY2hpbGQxKTtcclxuICAgICAgICBpZiAoYmFsYW5jZSA+IDEpIHtcclxuICAgICAgICAgICAgY29uc3QgY2hpbGQyQ2hpbGQxID0gY2hpbGQyLmNoaWxkMTtcclxuICAgICAgICAgICAgY29uc3QgY2hpbGQyQ2hpbGQyID0gY2hpbGQyLmNoaWxkMjtcclxuICAgICAgICAgICAgY2hpbGQyLmNoaWxkMSA9IGxlYWY7XHJcbiAgICAgICAgICAgIGNoaWxkMi5wYXJlbnQgPSBsZWFmLnBhcmVudDtcclxuICAgICAgICAgICAgbGVhZi5wYXJlbnQgPSBjaGlsZDI7XHJcbiAgICAgICAgICAgIGlmIChjaGlsZDIucGFyZW50ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjaGlsZDIucGFyZW50LmNoaWxkMSA9PT0gbGVhZikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkMi5wYXJlbnQuY2hpbGQxID0gY2hpbGQyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQyLnBhcmVudC5jaGlsZDIgPSBjaGlsZDI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5yb290ID0gY2hpbGQyO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nZXRIZWlnaHQoY2hpbGQyQ2hpbGQxKSA+IHRoaXMuZ2V0SGVpZ2h0KGNoaWxkMkNoaWxkMikpIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkMi5jaGlsZDIgPSBjaGlsZDJDaGlsZDE7XHJcbiAgICAgICAgICAgICAgICBsZWFmLmNoaWxkMiA9IGNoaWxkMkNoaWxkMjtcclxuICAgICAgICAgICAgICAgIGNoaWxkMkNoaWxkMi5wYXJlbnQgPSBsZWFmO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGVhZi5jaGlsZDIgPSBjaGlsZDJDaGlsZDE7XHJcbiAgICAgICAgICAgICAgICBjaGlsZDJDaGlsZDEucGFyZW50ID0gbGVhZjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZWFmLmFhYmIgPSBnZXRCb3VuZEFhYmIobGVhZi5jaGlsZDEuYWFiYiwgbGVhZi5jaGlsZDIuYWFiYik7XHJcbiAgICAgICAgICAgIGNoaWxkMi5hYWJiID0gZ2V0Qm91bmRBYWJiKGNoaWxkMi5jaGlsZDEuYWFiYiwgY2hpbGQyLmNoaWxkMi5hYWJiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNoaWxkMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJhbGFuY2UgPCAtMSkge1xyXG4gICAgICAgICAgICBjb25zdCBjaGlsZDFDaGlsZDEgPSBjaGlsZDEuY2hpbGQxO1xyXG4gICAgICAgICAgICBjb25zdCBjaGlsZDFDaGlsZDIgPSBjaGlsZDEuY2hpbGQyO1xyXG4gICAgICAgICAgICBjaGlsZDEuY2hpbGQxID0gbGVhZjtcclxuICAgICAgICAgICAgY2hpbGQxLnBhcmVudCA9IGxlYWYucGFyZW50O1xyXG4gICAgICAgICAgICBsZWFmLnBhcmVudCA9IGNoaWxkMTtcclxuICAgICAgICAgICAgaWYgKGNoaWxkMS5wYXJlbnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkMS5wYXJlbnQuY2hpbGQxID09PSBsZWFmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQxLnBhcmVudC5jaGlsZDEgPSBjaGlsZDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZDEucGFyZW50LmNoaWxkMiA9IGNoaWxkMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3QgPSBjaGlsZDE7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdldEhlaWdodChjaGlsZDFDaGlsZDEpID4gdGhpcy5nZXRIZWlnaHQoY2hpbGQxQ2hpbGQyKSkge1xyXG4gICAgICAgICAgICAgICAgY2hpbGQxLmNoaWxkMiA9IGNoaWxkMUNoaWxkMTtcclxuICAgICAgICAgICAgICAgIGxlYWYuY2hpbGQxID0gY2hpbGQxQ2hpbGQyO1xyXG4gICAgICAgICAgICAgICAgY2hpbGQxQ2hpbGQyLnBhcmVudCA9IGxlYWY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZDEuY2hpbGQyID0gY2hpbGQxQ2hpbGQyO1xyXG4gICAgICAgICAgICAgICAgbGVhZi5jaGlsZDEgPSBjaGlsZDFDaGlsZDE7XHJcbiAgICAgICAgICAgICAgICBjaGlsZDFDaGlsZDEucGFyZW50ID0gbGVhZjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZWFmLmFhYmIgPSBnZXRCb3VuZEFhYmIobGVhZi5jaGlsZDEuYWFiYiwgbGVhZi5jaGlsZDIuYWFiYik7XHJcbiAgICAgICAgICAgIGNoaWxkMS5hYWJiID0gZ2V0Qm91bmRBYWJiKGNoaWxkMS5jaGlsZDEuYWFiYiwgY2hpbGQxLmNoaWxkMi5hYWJiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNoaWxkMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGVhZi5hYWJiID0gZ2V0Qm91bmRBYWJiKGxlYWYuY2hpbGQxLmFhYmIsIGxlYWYuY2hpbGQyLmFhYmIpO1xyXG4gICAgICAgIHJldHVybiBsZWFmO1xyXG4gICAgfVxyXG4gICAgdG9BcnJheShub2RlKSB7XHJcbiAgICAgICAgY29uc3QgaXRlciA9IChsZWFmKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghbGVhZikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGxlYWYuaXNMZWFmKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxlYWYuaWQ7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiBbaXRlcihsZWFmLmNoaWxkMSksIGl0ZXIobGVhZi5jaGlsZDIpXTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICghbm9kZSlcclxuICAgICAgICAgICAgbm9kZSA9IHRoaXMucm9vdDtcclxuICAgICAgICByZXR1cm4gaXRlcihub2RlKTtcclxuICAgIH1cclxuICAgIC8qZ2V0SGVpZ2h0KGxlYWYpIHtcclxuICAgICAgY29uc3QgaXRlciA9IChsZWFmLCBsZXZlbCkgPT4ge1xyXG4gICAgICAgIGlmICghbGVhZikge1xyXG4gICAgICAgICAgcmV0dXJuIGxldmVsO1xyXG4gICAgICAgIH1cclxuICBcclxuICAgICAgICBsZXQgaDEgPSBpdGVyKGxlYWYuY2hpbGQxLCBsZXZlbCArIDEpO1xyXG4gICAgICAgIGxldCBoMiA9IGl0ZXIobGVhZi5jaGlsZDIsIGxldmVsICsgMSk7XHJcbiAgICAgICAgcmV0dXJuIGgxID4gaDIgPyBoMSA6IGgyO1xyXG4gICAgICB9O1xyXG4gICAgICByZXR1cm4gaXRlcihsZWFmLCAxKTtcclxuICAgIH0qL1xyXG4gICAgZ2V0SGVpZ2h0KHJvb3QpIHtcclxuICAgICAgICBpZiAoIXJvb3QpXHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIGxldCBoZWlnaHQgPSAwO1xyXG4gICAgICAgIGNvbnN0IHF1ZXVlID0gW3Jvb3RdO1xyXG4gICAgICAgIHdoaWxlIChxdWV1ZS5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICBoZWlnaHQgKz0gMTtcclxuICAgICAgICAgICAgY29uc3QgY291bnQgPSBxdWV1ZS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdG1wID0gcXVldWUucG9wKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodG1wLmNoaWxkMSlcclxuICAgICAgICAgICAgICAgICAgICBxdWV1ZS5wdXNoKHRtcC5jaGlsZDEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRtcC5jaGlsZDIpXHJcbiAgICAgICAgICAgICAgICAgICAgcXVldWUucHVzaCh0bXAuY2hpbGQyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaGVpZ2h0O1xyXG4gICAgfVxyXG4gICAgZ2V0Tm9kZXMoKSB7XHJcbiAgICAgICAgY29uc3QgaXRlciA9IChub2RlLCBhcnIpID0+IHtcclxuICAgICAgICAgICAgYXJyLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICAgIGlmIChub2RlLmNoaWxkMSlcclxuICAgICAgICAgICAgICAgIGl0ZXIobm9kZS5jaGlsZDEsIGFycik7XHJcbiAgICAgICAgICAgIGlmIChub2RlLmNoaWxkMilcclxuICAgICAgICAgICAgICAgIGl0ZXIobm9kZS5jaGlsZDIsIGFycik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBhID0gW107XHJcbiAgICAgICAgaXRlcih0aGlzLnJvb3QsIGEpO1xyXG4gICAgICAgIHJldHVybiBhO1xyXG4gICAgfVxyXG59XHJcbiIsImNvbnN0IGlzSW5zaWRlID0gKHAxLCBwMiwgcSkgPT4ge1xyXG4gICAgY29uc3QgUiA9IChwMlswXSAtIHAxWzBdKSAqIChxWzFdIC0gcDFbMV0pIC0gKHAyWzFdIC0gcDFbMV0pICogKHFbMF0gLSBwMVswXSk7XHJcbiAgICByZXR1cm4gUiA8PSAwICsgMC4wMDE7XHJcbn07XHJcbmNvbnN0IGRvdCA9IChhLCBiKSA9PiBhWzBdICogYlswXSArIGFbMV0gKiBiWzFdO1xyXG5jb25zdCBpc0luQ2xvY2t3aXNlID0gKHBvaW50cykgPT4ge1xyXG4gICAgaWYgKHBvaW50cy5sZW5ndGggPCAzKVxyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgY29uc3QgW3AxLCBwMiwgcDNdID0gcG9pbnRzO1xyXG4gICAgY29uc3QgZGV0ID0gcDJbMF0gKiBwM1sxXSArXHJcbiAgICAgICAgcDNbMF0gKiBwMVsxXSArXHJcbiAgICAgICAgcDFbMF0gKiBwMlsxXSAtXHJcbiAgICAgICAgcDFbMF0gKiBwMVsxXSAtXHJcbiAgICAgICAgcDNbMF0gKiBwMlsxXSAtXHJcbiAgICAgICAgcDFbMF0gKiBwM1sxXTtcclxuICAgIGlmIChkZXQgPCAwKVxyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgcmV0dXJuIC0xO1xyXG59O1xyXG5jb25zdCBjb21wdXRlSW50ZXJzZWN0aW9uID0gKHAxLCBwMiwgcDMsIHA0KSA9PiB7XHJcbiAgICBpZiAocDJbMF0gLSBwMVswXSA9PT0gMCkge1xyXG4gICAgICAgIGNvbnN0IHggPSBwMVswXTtcclxuICAgICAgICBjb25zdCBtMiA9IChwNFsxXSAtIHAzWzFdKSAvIChwNFswXSAtIHAzWzBdKTtcclxuICAgICAgICBjb25zdCBiMiA9IHAzWzFdIC0gbTIgKiBwM1swXTtcclxuICAgICAgICBjb25zdCB5ID0gbTIgKiB4ICsgYjI7XHJcbiAgICAgICAgcmV0dXJuIFt4LCB5XTtcclxuICAgIH1cclxuICAgIGlmIChwNFswXSAtIHAzWzBdID09PSAwKSB7XHJcbiAgICAgICAgY29uc3QgeCA9IHAzWzBdO1xyXG4gICAgICAgIGNvbnN0IG0xID0gKHAyWzFdIC0gcDFbMV0pIC8gKHAyWzBdIC0gcDFbMF0pO1xyXG4gICAgICAgIGNvbnN0IGIxID0gcDFbMV0gLSBtMSAqIHAxWzBdO1xyXG4gICAgICAgIGNvbnN0IHkgPSBtMSAqIHggKyBiMTtcclxuICAgICAgICByZXR1cm4gW3gsIHldO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbTEgPSAocDJbMV0gLSBwMVsxXSkgLyAocDJbMF0gLSBwMVswXSk7XHJcbiAgICBjb25zdCBiMSA9IHAxWzFdIC0gbTEgKiBwMVswXTtcclxuICAgIGNvbnN0IG0yID0gKHA0WzFdIC0gcDNbMV0pIC8gKHA0WzBdIC0gcDNbMF0pO1xyXG4gICAgY29uc3QgYjIgPSBwM1sxXSAtIG0yICogcDNbMF07XHJcbiAgICBjb25zdCB4ID0gKGIyIC0gYjEpIC8gKG0xIC0gbTIpO1xyXG4gICAgY29uc3QgeSA9IG0xICogeCArIGIxO1xyXG4gICAgcmV0dXJuIFt4LCB5XTtcclxufTtcclxuY29uc3QgY2xpcFBvbHlWc1BvbHkgPSAoQSwgQikgPT4ge1xyXG4gICAgbGV0IHJlc3VsdCA9IFsuLi5BXTtcclxuICAgIGZvciAobGV0IGkgPSAwLCBuID0gQi5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICBjb25zdCBuZXh0ID0gWy4uLnJlc3VsdF07XHJcbiAgICAgICAgcmVzdWx0ID0gW107XHJcbiAgICAgICAgY29uc3QgYUVkZ2UxID0gQi5hdChpIC0gMSk7XHJcbiAgICAgICAgY29uc3QgYUVkZ2UyID0gQi5hdChpKTtcclxuICAgICAgICBmb3IgKGxldCBqID0gMCwgX24gPSBuZXh0Lmxlbmd0aDsgaiA8IF9uOyBqKyspIHtcclxuICAgICAgICAgICAgY29uc3QgYkVkZ2UxID0gbmV4dC5hdChqIC0gMSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGJFZGdlMiA9IG5leHQuYXQoaik7XHJcbiAgICAgICAgICAgIGlmIChpc0luc2lkZShhRWRnZTEsIGFFZGdlMiwgYkVkZ2UyKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc0luc2lkZShhRWRnZTEsIGFFZGdlMiwgYkVkZ2UxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGludGVyc2VjdGlvbiA9IGNvbXB1dGVJbnRlcnNlY3Rpb24oYkVkZ2UxLCBiRWRnZTIsIGFFZGdlMSwgYUVkZ2UyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChpbnRlcnNlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goYkVkZ2UyKTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpc0luc2lkZShhRWRnZTEsIGFFZGdlMiwgYkVkZ2UxKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW50ZXJzZWN0aW9uID0gY29tcHV0ZUludGVyc2VjdGlvbihiRWRnZTEsIGJFZGdlMiwgYUVkZ2UxLCBhRWRnZTIpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goaW50ZXJzZWN0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcbmNvbnN0IGxlcnAgPSAoYSwgYiwgdCkgPT4gYSArIChiIC0gYSkgKiB0O1xyXG5jb25zdCBjbGlwU2VnbWVudFZzU2VnbWVudCA9IChzMSwgczIpID0+IHtcclxuICAgIGNvbnN0IFtwMSwgcDJdID0gczE7XHJcbiAgICBjb25zdCBbcDMsIHA0XSA9IHMyO1xyXG4gICAgY29uc3QgdG9wID0gKHA0WzBdIC0gcDNbMF0pICogKHAxWzFdIC0gcDNbMV0pIC0gKHA0WzFdIC0gcDNbMV0pICogKHAxWzBdIC0gcDNbMF0pO1xyXG4gICAgY29uc3QgYm90dG9tID0gKHA0WzFdIC0gcDNbMV0pICogKHAyWzBdIC0gcDFbMF0pIC0gKHA0WzBdIC0gcDNbMF0pICogKHAyWzFdIC0gcDFbMV0pO1xyXG4gICAgaWYgKCFib3R0b20pXHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgY29uc3QgdCA9IHRvcCAvIGJvdHRvbTtcclxuICAgIGlmICh0IDwgMCB8fCB0ID4gMSlcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICByZXR1cm4gW1tsZXJwKHAxWzBdLCBwMlswXSwgdCksIGxlcnAocDFbMV0sIHAyWzFdLCB0KV1dO1xyXG59O1xyXG5jb25zdCBjbGlwUG9pbnRWc1BvbHkgPSAocG9pbnQsIHZlcnRpY2VzKSA9PiB7XHJcbiAgICBjb25zdCB4ID0gcG9pbnRbMF07XHJcbiAgICBjb25zdCB5ID0gcG9pbnRbMV07XHJcbiAgICBsZXQgaW5zaWRlID0gZmFsc2U7XHJcbiAgICBmb3IgKGxldCBpID0gMCwgaiA9IHZlcnRpY2VzLmxlbmd0aCAtIDE7IGkgPCB2ZXJ0aWNlcy5sZW5ndGg7IGogPSBpKyspIHtcclxuICAgICAgICBjb25zdCB4aSA9IHZlcnRpY2VzW2ldWzBdLCB5aSA9IHZlcnRpY2VzW2ldWzFdO1xyXG4gICAgICAgIGNvbnN0IHhqID0gdmVydGljZXNbal1bMF0sIHlqID0gdmVydGljZXNbal1bMV07XHJcbiAgICAgICAgY29uc3QgaW50ZXJzZWN0ID0geWkgPiB5ICE9IHlqID4geSAmJiB4IDwgKCh4aiAtIHhpKSAqICh5IC0geWkpKSAvICh5aiAtIHlpKSArIHhpO1xyXG4gICAgICAgIGlmIChpbnRlcnNlY3QpXHJcbiAgICAgICAgICAgIGluc2lkZSA9ICFpbnNpZGU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW3BvaW50XTtcclxufTtcclxuY29uc3QgY2xpcFNlZ21lbnRWc1BvbHkgPSAoc2VnbWVudCwgcG9seSkgPT4ge1xyXG4gICAgY29uc3QgW3AxLCBwMl0gPSBzZWdtZW50O1xyXG4gICAgY29uc3QgcG9pbnRzID0gW107XHJcbiAgICBpZiAoY2xpcFBvaW50VnNQb2x5KHAxLCBwb2x5KSlcclxuICAgICAgICBwb2ludHMucHVzaChwMSk7XHJcbiAgICBpZiAoY2xpcFBvaW50VnNQb2x5KHAyLCBwb2x5KSlcclxuICAgICAgICBwb2ludHMucHVzaChwMik7XHJcbiAgICBpZiAocG9pbnRzLmxlbmd0aCA+IDEpXHJcbiAgICAgICAgcmV0dXJuIHBvaW50cztcclxuICAgIGZvciAobGV0IGkgPSAwLCBuID0gcG9seS5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICBjb25zdCBxMSA9IHBvbHkuYXQoaSAtIDEpO1xyXG4gICAgICAgIGNvbnN0IHEyID0gcG9seS5hdChpKTtcclxuICAgICAgICBjb25zdCBpbnRlcnNlY3Rpb24gPSBjbGlwU2VnbWVudFZzU2VnbWVudChbcDEsIHAyXSwgW3ExLCBxMl0pO1xyXG4gICAgICAgIGlmIChpbnRlcnNlY3Rpb24ubGVuZ3RoID4gMClcclxuICAgICAgICAgICAgcG9pbnRzLnB1c2goaW50ZXJzZWN0aW9uWzBdKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwb2ludHM7XHJcbn07XHJcbmNvbnN0IHBhaXJIYXNoID0gKHgsIHkpID0+IHggPT09IE1hdGgubWF4KHgsIHkpID8geCAqIHggKyB5ICsgeCA6IHkgKiB4ICsgeTtcclxuY29uc3QgUE9MWSA9IDM7XHJcbmNvbnN0IFNFR01FTlQgPSAyO1xyXG5jb25zdCBQT0lOVCA9IDE7XHJcbmNvbnN0IGZhY2VUeXBlTWFwID0ge307XHJcbmZhY2VUeXBlTWFwW3BhaXJIYXNoKFBPTFksIFBPTFkpXSA9IGNsaXBQb2x5VnNQb2x5O1xyXG5mYWNlVHlwZU1hcFtwYWlySGFzaChTRUdNRU5ULCBQT0xZKV0gPSBjbGlwU2VnbWVudFZzUG9seTtcclxuZmFjZVR5cGVNYXBbcGFpckhhc2goU0VHTUVOVCwgU0VHTUVOVCldID0gY2xpcFNlZ21lbnRWc1NlZ21lbnQ7XHJcbmZhY2VUeXBlTWFwW3BhaXJIYXNoKFBPSU5ULCBQT0xZKV0gPSAoZmFjZTEsIGZhY2UyKSA9PiBjbGlwUG9pbnRWc1BvbHkoZmFjZTFbMF0sIGZhY2UyKTtcclxuZnVuY3Rpb24gY2xpcEZhY2VWc0ZhY2UoZmFjZTEsIGZhY2UyKSB7XHJcbiAgICBjb25zdCB0eXBlMSA9IE1hdGgubWluKGZhY2UxLmxlbmd0aCwgUE9MWSk7XHJcbiAgICBjb25zdCB0eXBlMiA9IE1hdGgubWluKGZhY2UyLmxlbmd0aCwgUE9MWSk7XHJcbiAgICBsZXQgYXJncyA9IFtmYWNlMSwgZmFjZTJdO1xyXG4gICAgaWYgKHR5cGUxID4gdHlwZTIpIHtcclxuICAgICAgICByZXR1cm4gZmFjZVR5cGVNYXBbcGFpckhhc2godHlwZTIsIHR5cGUxKV0oYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMF0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhY2VUeXBlTWFwW3BhaXJIYXNoKHR5cGUxLCB0eXBlMildKGFyZ3VtZW50c1swXSwgYXJndW1lbnRzWzFdKTtcclxufVxyXG5leHBvcnQgeyBjbGlwU2VnbWVudFZzU2VnbWVudCwgaXNJbnNpZGUsIGNvbXB1dGVJbnRlcnNlY3Rpb24sIGNsaXBQb2x5VnNQb2x5LCBjbGlwRmFjZVZzRmFjZSwgaXNJbkNsb2Nrd2lzZSwgY2xpcFNlZ21lbnRWc1BvbHksIGNsaXBQb2ludFZzUG9seSwgfTtcclxuIiwiY29uc3QgY29uZmlnID0ge1xyXG4gICAgUklHSURfQk9EWV9NT1ZFX1RSRVNIT0xEOiAwLjAwNSxcclxuICAgIFJJR0lEX0JPRFlfQUFCQl9CSUFTOiAwLjExLFxyXG4gICAgQ0xJUF9CSUFTOiAwLjAwMSxcclxuICAgIEdKS19NQVhfSVRFUkFUSU9OU19OVU06IDY0LFxyXG4gICAgRVBBX0JJQVM6IDAuMDAwMDEsXHJcbiAgICBDT05UQUNUX0JJQVM6IDAuMTI1LFxyXG4gICAgQ09OVEFDVF9UUkVTSE9MRDogMC4wNSxcclxuICAgIENPTlRBQ1RfTUFOSUZPTERfS0VFUF9UUkVTSE9MRDogMC4wMDEsXHJcbiAgICBTT0xWRVJfSVRFUkFUSU9OU19OVU06IDE4LFxyXG4gICAgVVNFX0NPTlRBQ1RfQ0FDSEU6IGZhbHNlXHJcbn07XHJcbndpbmRvdy5jb25maWcgPSBjb25maWc7XHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcclxuIiwiaW1wb3J0IHsgdjMsIG0zIH0gZnJvbSBcInJvbWFucHBwbWF0aFwiO1xyXG5pbXBvcnQgeyBjbGlwRmFjZVZzRmFjZSwgaXNJbkNsb2Nrd2lzZSB9IGZyb20gXCIuL2NsaXBwaW5nXCI7XHJcbmNvbnN0IHsgZG90LCBjcm9zcywgbm9ybWFsaXplLCBzdW0sIGRpZmYsIHNjYWxlLCBpc051bGwsIG5vcm0gfSA9IHYzO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5jb25zdCB7IENMSVBfQklBUywgR0pLX01BWF9JVEVSQVRJT05TX05VTSwgRVBBX0JJQVMgfSA9IGNvbmZpZztcclxuY29uc3QgcmF5VnNQbGFuZUludGVyc2VjID0gKHBsYW5lLCBwb2ludCwgZGlyZWN0aW9uKSA9PiB7XHJcbiAgICBjb25zdCBbb3JpZ2luLCBub3JtYWxdID0gcGxhbmU7XHJcbiAgICBjb25zdCBfZG90ID0gZG90KG5vcm1hbCwgZGlyZWN0aW9uKTtcclxuICAgIGNvbnN0IGZyb21Qb2ludFRvT3JpZ2luID0gZGlmZihwb2ludCwgb3JpZ2luKTtcclxuICAgIGNvbnN0IGZhYyA9IGRvdChmcm9tUG9pbnRUb09yaWdpbiwgbm9ybWFsKSAvIF9kb3Q7XHJcbiAgICByZXR1cm4gZGlmZihwb2ludCwgc2NhbGUoZGlyZWN0aW9uLCBmYWMpKTtcclxufTtcclxuY29uc3QgaXNQb2ludEJlaGluZFBsYW5lID0gKHBsYW5lLCBwb2ludCwgc2lnbiA9IDEpID0+IHtcclxuICAgIGNvbnN0IFtvcmlnaW4sIG5vcm1hbF0gPSBwbGFuZTtcclxuICAgIGxldCBfZCA9IGRvdChub3JtYWwsIGRpZmYocG9pbnQsIG9yaWdpbikpICogc2lnbjtcclxuICAgIHJldHVybiBfZCA+IDAgLSBDTElQX0JJQVM7XHJcbn07XHJcbmNvbnN0IHBvaW50T25QbGFuZVByb2plY3Rpb24gPSAocGxhbmUsIHBvaW50KSA9PiB7XHJcbiAgICBjb25zdCBbb3JpZ2luLCBub3JtYWxdID0gcGxhbmU7XHJcbiAgICBjb25zdCBmcm9tUG9pbnRUb09yaWdpbiA9IGRpZmYocG9pbnQsIG9yaWdpbik7XHJcbiAgICBjb25zdCBwcm9qQWxvbmdOb3JtYWwgPSBkb3Qobm9ybWFsLCBmcm9tUG9pbnRUb09yaWdpbik7XHJcbiAgICByZXR1cm4gZGlmZihwb2ludCwgc2NhbGUobm9ybWFsLCBwcm9qQWxvbmdOb3JtYWwpKTtcclxufTtcclxuY29uc3QgY2xpcFBvaW50c0JlaGluZFBsYW5lID0gKHBsYW5lLCBwb2ludHMsIHNpZ24gPSAxKSA9PiB7XHJcbiAgICBjb25zdCBbb3JpZ2luLCBub3JtYWxdID0gcGxhbmU7XHJcbiAgICByZXR1cm4gcG9pbnRzLmZpbHRlcigocG9pbnQpID0+IGRvdChub3JtYWwsIGRpZmYocG9pbnQsIG9yaWdpbikpICogc2lnbiArIENMSVBfQklBUyA+IDApO1xyXG59O1xyXG5jb25zdCBnZXQyRGNvb3Jkc09uUGxhbmUgPSAoaSwgaiwgcG9pbnQpID0+IHtcclxuICAgIHJldHVybiBbZG90KGksIHBvaW50KSwgZG90KGosIHBvaW50KV07XHJcbn07XHJcbmZ1bmN0aW9uIHVwZGF0ZV9zaW1wbGV4Myhwcm9wcykge1xyXG4gICAgY29uc3QgbiA9IGNyb3NzKGRpZmYocHJvcHMuYiwgcHJvcHMuYSksIGRpZmYocHJvcHMuYywgcHJvcHMuYSkpO1xyXG4gICAgY29uc3QgQU8gPSBzY2FsZShwcm9wcy5hLCAtMSk7XHJcbiAgICBwcm9wcy5zaW1wX2RpbSA9IDI7XHJcbiAgICBpZiAoZG90KGNyb3NzKGRpZmYocHJvcHMuYiwgcHJvcHMuYSksIG4pLCBBTykgPiAwKSB7XHJcbiAgICAgICAgcHJvcHMuYyA9IHByb3BzLmE7XHJcbiAgICAgICAgcHJvcHMuc2VhcmNoX2RpciA9IGNyb3NzKGNyb3NzKGRpZmYocHJvcHMuYiwgcHJvcHMuYSksIEFPKSwgZGlmZihwcm9wcy5iLCBwcm9wcy5hKSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKGRvdChjcm9zcyhuLCBkaWZmKHByb3BzLmMsIHByb3BzLmEpKSwgQU8pID4gMCkge1xyXG4gICAgICAgIHByb3BzLmIgPSBwcm9wcy5hO1xyXG4gICAgICAgIHByb3BzLnNlYXJjaF9kaXIgPSBjcm9zcyhjcm9zcyhkaWZmKHByb3BzLmMsIHByb3BzLmEpLCBBTyksIGRpZmYocHJvcHMuYywgcHJvcHMuYSkpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHByb3BzLnNpbXBfZGltID0gMztcclxuICAgIGlmIChkb3QobiwgQU8pID4gMCkge1xyXG4gICAgICAgIHByb3BzLmQgPSBwcm9wcy5jO1xyXG4gICAgICAgIHByb3BzLmMgPSBwcm9wcy5iO1xyXG4gICAgICAgIHByb3BzLmIgPSBwcm9wcy5hO1xyXG4gICAgICAgIHByb3BzLnNlYXJjaF9kaXIgPSBuO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHByb3BzLmQgPSBwcm9wcy5iO1xyXG4gICAgcHJvcHMuYiA9IHByb3BzLmE7XHJcbiAgICBwcm9wcy5zZWFyY2hfZGlyID0gc2NhbGUobiwgLTEpO1xyXG4gICAgcmV0dXJuO1xyXG59XHJcbmZ1bmN0aW9uIHVwZGF0ZV9zaW1wbGV4NChwcm9wcykge1xyXG4gICAgY29uc3QgQUJDID0gY3Jvc3MoZGlmZihwcm9wcy5iLCBwcm9wcy5hKSwgZGlmZihwcm9wcy5jLCBwcm9wcy5hKSk7XHJcbiAgICBjb25zdCBBQ0QgPSBjcm9zcyhkaWZmKHByb3BzLmMsIHByb3BzLmEpLCBkaWZmKHByb3BzLmQsIHByb3BzLmEpKTtcclxuICAgIGNvbnN0IEFEQiA9IGNyb3NzKGRpZmYocHJvcHMuZCwgcHJvcHMuYSksIGRpZmYocHJvcHMuYiwgcHJvcHMuYSkpO1xyXG4gICAgY29uc3QgQU8gPSBzY2FsZShwcm9wcy5hLCAtMSk7XHJcbiAgICBwcm9wcy5zaW1wX2RpbSA9IDM7XHJcbiAgICBpZiAoZG90KEFCQywgQU8pID4gMCkge1xyXG4gICAgICAgIHByb3BzLmQgPSBwcm9wcy5jO1xyXG4gICAgICAgIHByb3BzLmMgPSBwcm9wcy5iO1xyXG4gICAgICAgIHByb3BzLmIgPSBwcm9wcy5hO1xyXG4gICAgICAgIHByb3BzLnNlYXJjaF9kaXIgPSBBQkM7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGRvdChBQ0QsIEFPKSA+IDApIHtcclxuICAgICAgICBwcm9wcy5iID0gcHJvcHMuYTtcclxuICAgICAgICBwcm9wcy5zZWFyY2hfZGlyID0gQUNEO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChkb3QoQURCLCBBTykgPiAwKSB7XHJcbiAgICAgICAgcHJvcHMuYyA9IHByb3BzLmQ7XHJcbiAgICAgICAgcHJvcHMuZCA9IHByb3BzLmI7XHJcbiAgICAgICAgcHJvcHMuYiA9IHByb3BzLmE7XHJcbiAgICAgICAgcHJvcHMuc2VhcmNoX2RpciA9IEFEQjtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5mdW5jdGlvbiBnamsoY29sbDEsIGNvbGwyKSB7XHJcbiAgICBjb25zdCBwcm9wcyA9IHtcclxuICAgICAgICBhOiBbMCwgMCwgMF0sXHJcbiAgICAgICAgYjogWzAsIDAsIDBdLFxyXG4gICAgICAgIGM6IFswLCAwLCAwXSxcclxuICAgICAgICBkOiBbMCwgMCwgMF0sXHJcbiAgICAgICAgc2VhcmNoX2RpcjogWzAsIDAsIDBdLFxyXG4gICAgICAgIHNpbXBfZGltOiAwLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IG9yaWdpbnNNYXAgPSBuZXcgTWFwKCk7XHJcbiAgICBsZXQgbXR2ID0gWzAsIDAsIDBdO1xyXG4gICAgcHJvcHMuc2VhcmNoX2RpciA9IGRpZmYoY29sbDEucG9zLCBjb2xsMi5wb3MpO1xyXG4gICAgY29uc3QgY19vcmlnaW4xID0gY29sbDEuc3VwcG9ydChzY2FsZShwcm9wcy5zZWFyY2hfZGlyLCAtMSkpO1xyXG4gICAgY29uc3QgY19vcmlnaW4yID0gY29sbDIuc3VwcG9ydChwcm9wcy5zZWFyY2hfZGlyKTtcclxuICAgIHByb3BzLmMgPSBkaWZmKGNfb3JpZ2luMiwgY19vcmlnaW4xKTtcclxuICAgIG9yaWdpbnNNYXAuc2V0KHByb3BzLmMsIFtjX29yaWdpbjEsIGNfb3JpZ2luMl0pO1xyXG4gICAgcHJvcHMuc2VhcmNoX2RpciA9IHNjYWxlKHByb3BzLmMsIC0xKTtcclxuICAgIGNvbnN0IGJfb3JpZ2luMSA9IGNvbGwxLnN1cHBvcnQoc2NhbGUocHJvcHMuc2VhcmNoX2RpciwgLTEpKTtcclxuICAgIGNvbnN0IGJfb3JpZ2luMiA9IGNvbGwyLnN1cHBvcnQocHJvcHMuc2VhcmNoX2Rpcik7XHJcbiAgICBwcm9wcy5iID0gZGlmZihiX29yaWdpbjIsIGJfb3JpZ2luMSk7XHJcbiAgICBvcmlnaW5zTWFwLnNldChwcm9wcy5iLCBbYl9vcmlnaW4xLCBiX29yaWdpbjJdKTtcclxuICAgIGlmIChkb3QocHJvcHMuYiwgcHJvcHMuc2VhcmNoX2RpcikgPCAwKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBwcm9wcy5zZWFyY2hfZGlyID0gY3Jvc3MoY3Jvc3MoZGlmZihwcm9wcy5jLCBwcm9wcy5iKSwgc2NhbGUocHJvcHMuYiwgLTEpKSwgZGlmZihwcm9wcy5jLCBwcm9wcy5iKSk7XHJcbiAgICBpZiAoaXNOdWxsKHByb3BzLnNlYXJjaF9kaXIpKSB7XHJcbiAgICAgICAgcHJvcHMuc2VhcmNoX2RpciA9IGNyb3NzKGRpZmYocHJvcHMuYywgcHJvcHMuYiksIFsxLCAwLCAwXSk7XHJcbiAgICAgICAgaWYgKGlzTnVsbChwcm9wcy5zZWFyY2hfZGlyKSkge1xyXG4gICAgICAgICAgICBwcm9wcy5zZWFyY2hfZGlyID0gY3Jvc3MoZGlmZihwcm9wcy5jLCBwcm9wcy5iKSwgWzAsIDAsIC0xXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvcHMuc2ltcF9kaW0gPSAyO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHSktfTUFYX0lURVJBVElPTlNfTlVNOyArK2kpIHtcclxuICAgICAgICBjb25zdCBhX29yaWdpbjEgPSBjb2xsMS5zdXBwb3J0KHNjYWxlKHByb3BzLnNlYXJjaF9kaXIsIC0xKSk7XHJcbiAgICAgICAgY29uc3QgYV9vcmlnaW4yID0gY29sbDIuc3VwcG9ydChwcm9wcy5zZWFyY2hfZGlyKTtcclxuICAgICAgICBwcm9wcy5hID0gZGlmZihhX29yaWdpbjIsIGFfb3JpZ2luMSk7XHJcbiAgICAgICAgb3JpZ2luc01hcC5zZXQocHJvcHMuYSwgW2Ffb3JpZ2luMSwgYV9vcmlnaW4yXSk7XHJcbiAgICAgICAgaWYgKGRvdChwcm9wcy5hLCBwcm9wcy5zZWFyY2hfZGlyKSA8IDApXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIHByb3BzLnNpbXBfZGltKys7XHJcbiAgICAgICAgaWYgKHByb3BzLnNpbXBfZGltID09PSAzKSB7XHJcbiAgICAgICAgICAgIHVwZGF0ZV9zaW1wbGV4Myhwcm9wcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHVwZGF0ZV9zaW1wbGV4NChwcm9wcykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIEVQQShwcm9wcy5hLCBwcm9wcy5iLCBwcm9wcy5jLCBwcm9wcy5kLCBvcmlnaW5zTWFwLCBjb2xsMSwgY29sbDIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59XHJcbmNvbnN0IGJhcmljZW50cmljID0gKGZhY2UsIHBvaW50KSA9PiB7XHJcbiAgICBsZXQgYTExID0gZmFjZVswXVswXTtcclxuICAgIGxldCBhMTIgPSBmYWNlWzFdWzBdO1xyXG4gICAgbGV0IGExMyA9IGZhY2VbMl1bMF07XHJcbiAgICBsZXQgYjEgPSBwb2ludFswXTtcclxuICAgIGxldCBhMjEgPSBmYWNlWzBdWzFdO1xyXG4gICAgbGV0IGEyMiA9IGZhY2VbMV1bMV07XHJcbiAgICBsZXQgYTIzID0gZmFjZVsyXVsxXTtcclxuICAgIGxldCBiMiA9IHBvaW50WzFdO1xyXG4gICAgbGV0IGEzMSA9IGZhY2VbMF1bMl07XHJcbiAgICBsZXQgYTMyID0gZmFjZVsxXVsyXTtcclxuICAgIGxldCBhMzMgPSBmYWNlWzJdWzJdO1xyXG4gICAgbGV0IGIzID0gcG9pbnRbMl07XHJcbiAgICBjb25zdCBkID0gYTExICogYTIyICogYTMzICtcclxuICAgICAgICBhMjEgKiBhMzIgKiBhMTMgK1xyXG4gICAgICAgIGExMiAqIGEyMyAqIGEzMSAtXHJcbiAgICAgICAgYTEzICogYTIyICogYTMxIC1cclxuICAgICAgICBhMjEgKiBhMTIgKiBhMzMgLVxyXG4gICAgICAgIGEzMiAqIGEyMyAqIGExMTtcclxuICAgIGNvbnN0IGQxID0gYjEgKiBhMjIgKiBhMzMgK1xyXG4gICAgICAgIGIyICogYTMyICogYTEzICtcclxuICAgICAgICBhMTIgKiBhMjMgKiBiMyAtXHJcbiAgICAgICAgYTEzICogYTIyICogYjMgLVxyXG4gICAgICAgIGIyICogYTEyICogYTMzIC1cclxuICAgICAgICBhMzIgKiBhMjMgKiBiMTtcclxuICAgIGNvbnN0IGQyID0gYTExICogYjIgKiBhMzMgK1xyXG4gICAgICAgIGEyMSAqIGIzICogYTEzICtcclxuICAgICAgICBiMSAqIGEyMyAqIGEzMSAtXHJcbiAgICAgICAgYTEzICogYjIgKiBhMzEgLVxyXG4gICAgICAgIGExMSAqIGIzICogYTIzIC1cclxuICAgICAgICBhMjEgKiBiMSAqIGEzMztcclxuICAgIGNvbnN0IGQzID0gYTExICogYTIyICogYjMgK1xyXG4gICAgICAgIGEyMSAqIGEzMiAqIGIxICtcclxuICAgICAgICBhMTIgKiBiMiAqIGEzMSAtXHJcbiAgICAgICAgYjEgKiBhMjIgKiBhMzEgLVxyXG4gICAgICAgIGEyMSAqIGExMiAqIGIzIC1cclxuICAgICAgICBiMiAqIGEzMiAqIGExMTtcclxuICAgIHJldHVybiBbZDEgLyBkLCBkMiAvIGQsIGQzIC8gZF07XHJcbn07XHJcbmNvbnN0IG9yaWdpblRvRmFjZVByb2ogPSAoZmFjZSkgPT4ge1xyXG4gICAgY29uc3Qgbm9ybWFsID0gZmFjZVszXTtcclxuICAgIGNvbnN0IHBvaW50ID0gZmFjZVswXTtcclxuICAgIGNvbnN0IGMgPSAtbm9ybWFsWzBdICogcG9pbnRbMF0gLSBub3JtYWxbMV0gKiBwb2ludFsxXSAtIG5vcm1hbFsyXSAqIHBvaW50WzJdO1xyXG4gICAgY29uc3QgdCA9IC1jIC9cclxuICAgICAgICAobm9ybWFsWzBdICogbm9ybWFsWzBdICsgbm9ybWFsWzFdICogbm9ybWFsWzFdICsgbm9ybWFsWzJdICogbm9ybWFsWzJdKTtcclxuICAgIHJldHVybiBbdCAqIG5vcm1hbFswXSwgdCAqIG5vcm1hbFsxXSwgdCAqIG5vcm1hbFsyXV07XHJcbn07XHJcbmNvbnN0IE1BWF9OVU1fRkFDRVMgPSA2NDtcclxuY29uc3QgTUFYX05VTV9MT09TRV9FREdFUyA9IDMyO1xyXG5jb25zdCBFUEFfTUFYX05VTV9JVEVSID0gNjQ7XHJcbmNvbnN0IEVQQSA9IChhLCBiLCBjLCBkLCBvcmlnaW5zTWFwLCBjb2xsMSwgY29sbDIpID0+IHtcclxuICAgIGNvbnN0IGZhY2VzID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgIGZhY2VzW2ldID0gW107XHJcbiAgICB9XHJcbiAgICBmYWNlc1swXVswXSA9IGE7XHJcbiAgICBmYWNlc1swXVsxXSA9IGI7XHJcbiAgICBmYWNlc1swXVsyXSA9IGM7XHJcbiAgICBmYWNlc1swXVszXSA9IG5vcm1hbGl6ZShjcm9zcyhkaWZmKGIsIGEpLCBkaWZmKGMsIGEpKSk7XHJcbiAgICBmYWNlc1sxXVswXSA9IGE7XHJcbiAgICBmYWNlc1sxXVsxXSA9IGM7XHJcbiAgICBmYWNlc1sxXVsyXSA9IGQ7XHJcbiAgICBmYWNlc1sxXVszXSA9IG5vcm1hbGl6ZShjcm9zcyhkaWZmKGMsIGEpLCBkaWZmKGQsIGEpKSk7XHJcbiAgICBmYWNlc1syXVswXSA9IGE7XHJcbiAgICBmYWNlc1syXVsxXSA9IGQ7XHJcbiAgICBmYWNlc1syXVsyXSA9IGI7XHJcbiAgICBmYWNlc1syXVszXSA9IG5vcm1hbGl6ZShjcm9zcyhkaWZmKGQsIGEpLCBkaWZmKGIsIGEpKSk7XHJcbiAgICBmYWNlc1szXVswXSA9IGI7XHJcbiAgICBmYWNlc1szXVsxXSA9IGQ7XHJcbiAgICBmYWNlc1szXVsyXSA9IGM7XHJcbiAgICBmYWNlc1szXVszXSA9IG5vcm1hbGl6ZShjcm9zcyhkaWZmKGQsIGIpLCBkaWZmKGMsIGIpKSk7XHJcbiAgICBsZXQgbnVtX2ZhY2VzID0gNDtcclxuICAgIGxldCBjbG9zZXN0X2ZhY2UgPSBudWxsO1xyXG4gICAgbGV0IHNlYXJjaF9kaXI7XHJcbiAgICBsZXQgcDtcclxuICAgIGZvciAobGV0IGl0ZXJhdGlvbiA9IDA7IGl0ZXJhdGlvbiA8IEVQQV9NQVhfTlVNX0lURVI7ICsraXRlcmF0aW9uKSB7XHJcbiAgICAgICAgbGV0IG1pbl9kaXN0ID0gZG90KGZhY2VzWzBdWzBdLCBmYWNlc1swXVszXSk7XHJcbiAgICAgICAgY2xvc2VzdF9mYWNlID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bV9mYWNlczsgKytpKSB7XHJcbiAgICAgICAgICAgIGxldCBkaXN0ID0gZG90KGZhY2VzW2ldWzBdLCBmYWNlc1tpXVszXSk7XHJcbiAgICAgICAgICAgIGlmIChkaXN0IDwgbWluX2Rpc3QpIHtcclxuICAgICAgICAgICAgICAgIG1pbl9kaXN0ID0gZGlzdDtcclxuICAgICAgICAgICAgICAgIGNsb3Nlc3RfZmFjZSA9IGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc2VhcmNoX2RpciA9IGZhY2VzW2Nsb3Nlc3RfZmFjZV1bM107XHJcbiAgICAgICAgY29uc3QgcF9vcmlnaW4xID0gY29sbDEuc3VwcG9ydChzY2FsZShzZWFyY2hfZGlyLCAtMSkpO1xyXG4gICAgICAgIGNvbnN0IHBfb3JpZ2luMiA9IGNvbGwyLnN1cHBvcnQoc2VhcmNoX2Rpcik7XHJcbiAgICAgICAgcCA9IGRpZmYocF9vcmlnaW4yLCBwX29yaWdpbjEpO1xyXG4gICAgICAgIG9yaWdpbnNNYXAuc2V0KHAsIFtwX29yaWdpbjEsIHBfb3JpZ2luMl0pO1xyXG4gICAgICAgIGlmIChkb3QocCwgc2VhcmNoX2RpcikgLSBtaW5fZGlzdCA8IEVQQV9CSUFTKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZhY2UgPSBmYWNlc1tjbG9zZXN0X2ZhY2VdO1xyXG4gICAgICAgICAgICBjb25zdCBwb2ludCA9IG9yaWdpblRvRmFjZVByb2ooZmFjZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IFtBYSwgQmFdID0gb3JpZ2luc01hcC5nZXQoZmFjZVswXSk7XHJcbiAgICAgICAgICAgIC8vY29uc3QgQWEgPSBmYWNlWzBdLm9hXHJcbiAgICAgICAgICAgIC8vY29uc3QgQmEgPSBmYWNlWzBdLm9iXHJcbiAgICAgICAgICAgIGNvbnN0IFtBYiwgQmJdID0gb3JpZ2luc01hcC5nZXQoZmFjZVsxXSk7XHJcbiAgICAgICAgICAgIC8vY29uc3QgQWIgPSBmYWNlWzFdLm9hXHJcbiAgICAgICAgICAgIC8vY29uc3QgQmIgPSBmYWNlWzFdLm9iXHJcbiAgICAgICAgICAgIGNvbnN0IFtBYywgQmNdID0gb3JpZ2luc01hcC5nZXQoZmFjZVsyXSk7XHJcbiAgICAgICAgICAgIC8vY29uc3QgQWMgPSBmYWNlWzJdLm9hXHJcbiAgICAgICAgICAgIC8vY29uc3QgQmMgPSBmYWNlWzJdLm9iXHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGJhcmljZW50cmljKGZhY2UsIHBvaW50KTtcclxuICAgICAgICAgICAgaWYgKGlzTmFOKHJlc3VsdFswXSArIHJlc3VsdFsxXSArIHJlc3VsdFsyXSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBQQSA9IHN1bShzdW0oc2NhbGUoQWEsIHJlc3VsdFswXSksIHNjYWxlKEFiLCByZXN1bHRbMV0pKSwgc2NhbGUoQWMsIHJlc3VsdFsyXSkpO1xyXG4gICAgICAgICAgICAvL0FhLm11bHRpcGx5KHJlc3VsdFswXSkuYWRkKEFiLm11bHRpcGx5KHJlc3VsdFsxXSkpLmFkZChBYy5tdWx0aXBseShyZXN1bHRbMl0pKVxyXG4gICAgICAgICAgICBsZXQgUEIgPSBzdW0oc3VtKHNjYWxlKEJhLCByZXN1bHRbMF0pLCBzY2FsZShCYiwgcmVzdWx0WzFdKSksIHNjYWxlKEJjLCByZXN1bHRbMl0pKTtcclxuICAgICAgICAgICAgLy9CYS5tdWx0aXBseShyZXN1bHRbMF0pLmFkZChCYi5tdWx0aXBseShyZXN1bHRbMV0pKS5hZGQoQmMubXVsdGlwbHkocmVzdWx0WzJdKSlcclxuICAgICAgICAgICAgLy9jb25zdCByYSA9IFBBLnN1YnN0cmFjdChjb2xsMS5wb3MpXHJcbiAgICAgICAgICAgIGNvbnN0IG4gPSBub3JtYWxpemUoc2NhbGUoZmFjZVszXSwgLWRvdChwLCBzZWFyY2hfZGlyKSkpO1xyXG4gICAgICAgICAgICAvL2lmIChub3JtKG4pIDwgMC4wMSkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uRXJyb3IgPSAtZG90KGRpZmYoUEIsIFBBKSwgbik7XHJcbiAgICAgICAgICAgIHJldHVybiB7IFBBLCBQQiwgbiwgcG9zaXRpb25FcnJvciB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBsb29zZV9lZGdlcyA9IFtdO1xyXG4gICAgICAgIGxldCBudW1fbG9vc2VfZWRnZXMgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtX2ZhY2VzOyArK2kpIHtcclxuICAgICAgICAgICAgaWYgKGRvdChmYWNlc1tpXVszXSwgZGlmZihwLCBmYWNlc1tpXVswXSkpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAzOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudF9lZGdlID0gW2ZhY2VzW2ldW2pdLCBmYWNlc1tpXVsoaiArIDEpICUgM11dO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmb3VuZF9lZGdlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBudW1fbG9vc2VfZWRnZXM7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9vc2VfZWRnZXNba11bMV0gPT09IGN1cnJlbnRfZWRnZVswXSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9vc2VfZWRnZXNba11bMF0gPT09IGN1cnJlbnRfZWRnZVsxXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9vc2VfZWRnZXNba11bMF0gPSBsb29zZV9lZGdlc1tudW1fbG9vc2VfZWRnZXMgLSAxXVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvb3NlX2VkZ2VzW2tdWzFdID0gbG9vc2VfZWRnZXNbbnVtX2xvb3NlX2VkZ2VzIC0gMV1bMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1fbG9vc2VfZWRnZXMtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kX2VkZ2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IG51bV9sb29zZV9lZGdlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWZvdW5kX2VkZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG51bV9sb29zZV9lZGdlcyA+PSBNQVhfTlVNX0xPT1NFX0VER0VTKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvb3NlX2VkZ2VzW251bV9sb29zZV9lZGdlc10gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9vc2VfZWRnZXNbbnVtX2xvb3NlX2VkZ2VzXVswXSA9IGN1cnJlbnRfZWRnZVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9vc2VfZWRnZXNbbnVtX2xvb3NlX2VkZ2VzXVsxXSA9IGN1cnJlbnRfZWRnZVsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnVtX2xvb3NlX2VkZ2VzKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZmFjZXNbaV1bMF0gPSBmYWNlc1tudW1fZmFjZXMgLSAxXVswXTtcclxuICAgICAgICAgICAgICAgIGZhY2VzW2ldWzFdID0gZmFjZXNbbnVtX2ZhY2VzIC0gMV1bMV07XHJcbiAgICAgICAgICAgICAgICBmYWNlc1tpXVsyXSA9IGZhY2VzW251bV9mYWNlcyAtIDFdWzJdO1xyXG4gICAgICAgICAgICAgICAgZmFjZXNbaV1bM10gPSBmYWNlc1tudW1fZmFjZXMgLSAxXVszXTtcclxuICAgICAgICAgICAgICAgIG51bV9mYWNlcy0tO1xyXG4gICAgICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtX2xvb3NlX2VkZ2VzOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKG51bV9mYWNlcyA+PSBNQVhfTlVNX0ZBQ0VTKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGZhY2VzW251bV9mYWNlc10gPSBbXTtcclxuICAgICAgICAgICAgZmFjZXNbbnVtX2ZhY2VzXVswXSA9IGxvb3NlX2VkZ2VzW2ldWzBdO1xyXG4gICAgICAgICAgICBmYWNlc1tudW1fZmFjZXNdWzFdID0gbG9vc2VfZWRnZXNbaV1bMV07XHJcbiAgICAgICAgICAgIGZhY2VzW251bV9mYWNlc11bMl0gPSBwO1xyXG4gICAgICAgICAgICBmYWNlc1tudW1fZmFjZXNdWzNdID0gbm9ybWFsaXplKGNyb3NzKGRpZmYobG9vc2VfZWRnZXNbaV1bMF0sIGxvb3NlX2VkZ2VzW2ldWzFdKSwgZGlmZihsb29zZV9lZGdlc1tpXVswXSwgcCkpKTtcclxuICAgICAgICAgICAgaWYgKGRvdChmYWNlc1tudW1fZmFjZXNdWzBdLCBmYWNlc1tudW1fZmFjZXNdWzNdKSArIDAuMDEgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0ZW1wID0gZmFjZXNbbnVtX2ZhY2VzXVswXTtcclxuICAgICAgICAgICAgICAgIGZhY2VzW251bV9mYWNlc11bMF0gPSBmYWNlc1tudW1fZmFjZXNdWzFdO1xyXG4gICAgICAgICAgICAgICAgZmFjZXNbbnVtX2ZhY2VzXVsxXSA9IHRlbXA7XHJcbiAgICAgICAgICAgICAgICBmYWNlc1tudW1fZmFjZXNdWzNdID0gc2NhbGUoZmFjZXNbbnVtX2ZhY2VzXVszXSwgLTEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG51bV9mYWNlcysrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5jb25zdCBnamtTY29wZSA9IHt9O1xyXG5jb25zdCBfZ2prID0gZ2prLmJpbmQoZ2prU2NvcGUpO1xyXG5jb25zdCBnZXRDb250YWN0cyA9IChjb2xsMSwgY29sbDIpID0+IHtcclxuICAgIGNvbnN0IGNvbnRhY3REYXRhID0gZ2prKGNvbGwxLCBjb2xsMik7XHJcbiAgICBpZiAoIWNvbnRhY3REYXRhKVxyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIGNvbnN0IHsgUEEsIFBCLCBuLCBwb3NpdGlvbkVycm9yIH0gPSBjb250YWN0RGF0YTtcclxuICAgIGlmIChjb2xsMS50eXBlID09PSBcInNwaGVyZVwiIHx8IGNvbGwyLnR5cGUgPT09IFwic3BoZXJlXCIpIHtcclxuICAgICAgICBjb25zdCByYiA9IGRpZmYoUEIsIGNvbGwyLnBvcyk7XHJcbiAgICAgICAgY29uc3QgcmEgPSBkaWZmKFBBLCBjb2xsMS5wb3MpO1xyXG4gICAgICAgIGNvbnN0IHJhTG9jYWwgPSBtMy50cmFuc2Zvcm1Qb2ludChjb2xsMS5SbWF0cml4SW52ZXJzZSwgcmEpO1xyXG4gICAgICAgIGNvbnN0IHJiTG9jYWwgPSBtMy50cmFuc2Zvcm1Qb2ludChjb2xsMi5SbWF0cml4SW52ZXJzZSwgcmIpO1xyXG4gICAgICAgIGNvbnN0IGkgPSBbblsxXSArIG5bMl0sIG5bMl0gLSBuWzBdLCAtblswXSAtIG5bMV1dO1xyXG4gICAgICAgIGNvbnN0IGogPSBjcm9zcyhzY2FsZShuLCAtMSksIGkpO1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJhLCByYiwgbiwgUEEsIFBCLCBwb3NpdGlvbkVycm9yLCBpLCBqLCByYUxvY2FsLCByYkxvY2FsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdO1xyXG4gICAgfVxyXG4gICAgY29uc3QgblJldmVyc2UgPSBzY2FsZShuLCAtMSk7XHJcbiAgICBjb25zdCBjb250YWN0RmFjZTEgPSBjb2xsMS5nZXRDbG9zZXN0RmFjZUJ5Tm9ybWFsKG5SZXZlcnNlKTtcclxuICAgIGNvbnN0IGNvbnRhY3RGYWNlMiA9IGNvbGwyLmdldENsb3Nlc3RGYWNlQnlOb3JtYWwobik7XHJcbiAgICBjb25zdCBwbGFuZSA9IFtzY2FsZShzdW0oUEEsIFBCKSwgMC41KSwgbl07XHJcbiAgICBjb25zdCBwcm9qZWN0aW9uczEgPSBjb250YWN0RmFjZTEudmVydGljZXMubWFwKChwKSA9PiBwb2ludE9uUGxhbmVQcm9qZWN0aW9uKHBsYW5lLCBwKSk7XHJcbiAgICBjb25zdCBwcm9qZWN0aW9uczIgPSBjb250YWN0RmFjZTIudmVydGljZXMubWFwKChwKSA9PiBwb2ludE9uUGxhbmVQcm9qZWN0aW9uKHBsYW5lLCBwKSk7XHJcbiAgICBjb25zdCBvcmlnaW4gPSBwbGFuZVswXTtcclxuICAgIGNvbnN0IGkgPSBub3JtYWxpemUoW25bMV0gKyBuWzJdLCBuWzJdIC0gblswXSwgLW5bMF0gLSBuWzFdXSk7XHJcbiAgICBjb25zdCBqID0gY3Jvc3Moc2NhbGUobiwgLTEpLCBpKTtcclxuICAgIGxldCBfMmQxID0gcHJvamVjdGlvbnMxLm1hcCgocCkgPT4gZ2V0MkRjb29yZHNPblBsYW5lKGksIGosIGRpZmYocCwgb3JpZ2luKSkpO1xyXG4gICAgbGV0IF8yZDIgPSBwcm9qZWN0aW9uczIubWFwKChwKSA9PiBnZXQyRGNvb3Jkc09uUGxhbmUoaSwgaiwgZGlmZihwLCBvcmlnaW4pKSk7XHJcbiAgICBjb25zdCBkaXIxID0gaXNJbkNsb2Nrd2lzZShfMmQxKTtcclxuICAgIGNvbnN0IGRpcjIgPSBpc0luQ2xvY2t3aXNlKF8yZDIpO1xyXG4gICAgaWYgKGRpcjEgPCAwKVxyXG4gICAgICAgIF8yZDEgPSBfMmQxLm1hcCgoXywgaSkgPT4gXzJkMS5hdCgtaSkpO1xyXG4gICAgaWYgKGRpcjIgPCAwKVxyXG4gICAgICAgIF8yZDIgPSBfMmQyLm1hcCgoXywgaSkgPT4gXzJkMi5hdCgtaSkpO1xyXG4gICAgY29uc3QgY2xpcHBlZCA9IGNsaXBGYWNlVnNGYWNlKF8yZDEsIF8yZDIpO1xyXG4gICAgY29uc3QgXzNkID0gY2xpcHBlZC5tYXAoKHApID0+IHN1bShvcmlnaW4sIHN1bShzY2FsZShpLCBwWzBdKSwgc2NhbGUoaiwgcFsxXSkpKSk7XHJcbiAgICBjb25zdCBmZWF0dXJlcyA9IFtdO1xyXG4gICAgXzNkLmZvckVhY2goKHBvaW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgUEEgPSByYXlWc1BsYW5lSW50ZXJzZWMoW2NvbnRhY3RGYWNlMS52ZXJ0aWNlc1swXSwgY29udGFjdEZhY2UxLm5vcm1hbF0sIHBvaW50LCBuKTtcclxuICAgICAgICBpZiAoIWlzUG9pbnRCZWhpbmRQbGFuZShwbGFuZSwgUEEsIDEpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgY29uc3QgUEIgPSByYXlWc1BsYW5lSW50ZXJzZWMoW2NvbnRhY3RGYWNlMi52ZXJ0aWNlc1swXSwgY29udGFjdEZhY2UyLm5vcm1hbF0sIHBvaW50LCBuKTtcclxuICAgICAgICBpZiAoIWlzUG9pbnRCZWhpbmRQbGFuZShwbGFuZSwgUEIsIC0xKSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IHJiID0gZGlmZihQQiwgY29sbDIucG9zKTtcclxuICAgICAgICBjb25zdCByYSA9IGRpZmYoUEEsIGNvbGwxLnBvcyk7XHJcbiAgICAgICAgY29uc3QgcG9zaXRpb25FcnJvciA9IC1kb3QoZGlmZihQQiwgUEEpLCBuKTtcclxuICAgICAgICBjb25zdCByYUxvY2FsID0gbTMudHJhbnNmb3JtUG9pbnQoY29sbDEuUm1hdHJpeEludmVyc2UsIHJhKTtcclxuICAgICAgICBjb25zdCByYkxvY2FsID0gbTMudHJhbnNmb3JtUG9pbnQoY29sbDIuUm1hdHJpeEludmVyc2UsIHJiKTtcclxuICAgICAgICBmZWF0dXJlcy5wdXNoKHtcclxuICAgICAgICAgICAgcmEsIHJiLCBuLCBQQSwgUEIsIHBvc2l0aW9uRXJyb3IsIGksIGosIHJhTG9jYWwsIHJiTG9jYWxcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgaWYgKGZlYXR1cmVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIGNvbnN0IHJiID0gZGlmZihQQiwgY29sbDIucG9zKTtcclxuICAgICAgICBjb25zdCByYSA9IGRpZmYoUEEsIGNvbGwxLnBvcyk7XHJcbiAgICAgICAgY29uc3QgcmFMb2NhbCA9IG0zLnRyYW5zZm9ybVBvaW50KGNvbGwxLlJtYXRyaXhJbnZlcnNlLCByYSk7XHJcbiAgICAgICAgY29uc3QgcmJMb2NhbCA9IG0zLnRyYW5zZm9ybVBvaW50KGNvbGwyLlJtYXRyaXhJbnZlcnNlLCByYik7XHJcbiAgICAgICAgZmVhdHVyZXMucHVzaCh7XHJcbiAgICAgICAgICAgIHJhLCByYiwgbiwgUEEsIFBCLCBwb3NpdGlvbkVycm9yLCBpLCBqLCByYUxvY2FsLCByYkxvY2FsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmVhdHVyZXM7XHJcbn07XHJcbmV4cG9ydCB7IGdldENvbnRhY3RzLCBwb2ludE9uUGxhbmVQcm9qZWN0aW9uLCBjbGlwUG9pbnRzQmVoaW5kUGxhbmUsIGdldDJEY29vcmRzT25QbGFuZSwgcmF5VnNQbGFuZUludGVyc2VjLCB9O1xyXG4iLCJcbmltcG9ydCB7bTQsIG0zLCB2M30gZnJvbSAncm9tYW5wcHBtYXRoJ1xuXG5jb25zdCBLRVlTID0ge1xuICAgICd3JyA6ICdtb3ZlRm9yd2FyZCcsXG4gICAgJ3MnIDogJ21vdmVCYWNrd2FyZCcsXG4gICAgJ2EnIDogJ21vdmVMZWZ0JyxcbiAgICAnZCcgOiAnbW92ZVJpZ2h0JyxcbiAgICAnICcgOiAnbW92ZVVwJ1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGcmVlQ2FtIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5rZXlJbnB1dCA9IG51bGw7XG4gICAgdGhpcy5tb3VzZUlucHV0ID0gbnVsbDtcbiAgICB0aGlzLnJvdGF0aW9uWCA9IDA7XG4gICAgdGhpcy5yb3RhdGlvblkgPSAwO1xuICAgIHRoaXMuZGVsdGFSWSA9IDA7XG4gICAgdGhpcy5jYW1Qb3MgPSBbMCwgMCwgMTBdO1xuICAgIHRoaXMuY2FtUm90ID0gbTMuaWRlbnRpdHkoKTtcbiAgfVxuICBsaXN0ZW5Nb3VzZShtb3VzZUlucHV0KSB7XG4gICAgdGhpcy5tb3VzZUlucHV0ID0gbW91c2VJbnB1dDtcbiAgICBtb3VzZUlucHV0Lm9uKFwibW92ZVwiLCAoW2RlbHRhWCwgZGVsdGFZXSkgPT4ge1xuICAgICAgdGhpcy5yb3RhdGlvblkgLT0gZGVsdGFYICogMC4wMDU7XG4gICAgICB0aGlzLnJvdGF0aW9uWCAtPSBkZWx0YVkgKiAwLjAwNTtcbiAgICAgIHRoaXMucm90YXRpb25YID0gTWF0aC5tYXgoXG4gICAgICAgIC1NYXRoLlBJIC8gMixcbiAgICAgICAgTWF0aC5taW4oTWF0aC5QSSAvIDIsIHRoaXMucm90YXRpb25YKVxuICAgICAgKTtcbiAgICAgIHRoaXMuZGVsdGFSWSA9IGRlbHRhWCAqIDAuMDA1O1xuICAgIH0pO1xuICB9XG4gIGxpc3RlbktleWJvYXJkKGtleUlucHV0KSB7XG4gICAgdGhpcy5rZXlJbnB1dCA9IGtleUlucHV0O1xuICB9XG4gIHRpY2soKSB7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgdGhpcy5rZXlJbnB1dC5rZXlzKSB7XG4gICAgICBjb25zdCBhY3Rpb25OYW1lID0gS0VZU1trZXldO1xuICAgICAgaWYgKGFjdGlvbk5hbWUpIHtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gdGhpc1thY3Rpb25OYW1lXS5iaW5kKHRoaXMpO1xuICAgICAgICBhY3Rpb24oKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmNhbU1hdHJpeCA9IG00LnRyYW5zbGF0aW9uKC4uLnRoaXMuY2FtUG9zKTtcbiAgICB0aGlzLmNhbU1hdHJpeCA9IG00LnhSb3RhdGUoXG4gICAgICBtNC55Um90YXRlKHRoaXMuY2FtTWF0cml4LCB0aGlzLnJvdGF0aW9uWSksXG4gICAgICB0aGlzLnJvdGF0aW9uWFxuICAgICk7XG4gIH1cbiAgbW92ZShkaXIpIHtcbiAgICBjb25zdCBtID0gbTQubTRUb20zKHRoaXMuY2FtTWF0cml4KTtcbiAgICB0aGlzLmNhbVBvcyA9IHYzLnN1bSh0aGlzLmNhbVBvcywgbTMudHJhbnNmb3JtUG9pbnQobSwgZGlyKSk7XG4gIH1cbiAgbW92ZUZvcndhcmQoKSB7XG4gICAgdGhpcy5tb3ZlKFswLCAwLCAtMV0pO1xuICB9XG4gIG1vdmVCYWNrd2FyZCgpIHtcbiAgICB0aGlzLm1vdmUoWzAsIDAsIDFdKTtcbiAgfVxuICBtb3ZlTGVmdCgpIHtcbiAgICB0aGlzLm1vdmUoWy0xLCAwLCAwXSk7XG4gIH1cbiAgbW92ZVJpZ2h0KCkge1xuICAgIHRoaXMubW92ZShbMSwgMCwgMF0pO1xuICB9XG4gIG1vdmVVcCgpIHtcbiAgICB0aGlzLm1vdmUoWzAsIDEsIDBdKTtcbiAgfVxufVxuIiwiaW1wb3J0ICBFdmVudEVtaXR0ZXIgIGZyb20gXCIuLi9waHlzaWNzL0V2ZW50RW1pdHRlci50c1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLZXlJbnB1dCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLmtleXMgPSBuZXcgU2V0KCk7XG4gIH1cbiAgbG9nRG93bih7IGtleSB9KSB7XG4gICAgdGhpcy5rZXlzLmFkZChrZXkpO1xuICAgIHRoaXMuZW1pdChcImtleWRvd25cIiwgeyBrZXkgfSk7XG4gIH1cbiAgbG9nVXAoeyBrZXkgfSkge1xuICAgIHRoaXMua2V5cy5kZWxldGUoa2V5KTtcbiAgICB0aGlzLmVtaXQoXCJrZXl1cFwiLCB7IGtleSB9KTtcbiAgfVxuICBsaXN0ZW4oKSB7XG4gICAgY29uc3QgbG9nRG93biA9IHRoaXMubG9nRG93bi5iaW5kKHRoaXMpO1xuICAgIGNvbnN0IGxvZ1VwID0gdGhpcy5sb2dVcC5iaW5kKHRoaXMpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGxvZ0Rvd24pO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBsb2dVcCk7XG4gICAgdGhpcy51bnN1YnNpY3JpYmUgPSAoKSA9PiB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBsb2dEb3duKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBsb2dVcCk7XG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0ICBFdmVudEVtaXR0ZXIgIGZyb20gXCIuLi9waHlzaWNzL0V2ZW50RW1pdHRlci50c1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb3VzZUlucHV0IGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCA9IGRvY3VtZW50KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmxhc3RYID0gMDtcbiAgICB0aGlzLmxhc3RZID0gMDtcbiAgICB0aGlzLmVuYWJsZSA9IGZhbHNlO1xuICAgIHRoaXMubW92ZXMgPSBbXVxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnRcbiAgfVxuICBsb2dNb3ZlKHsgb2Zmc2V0WCwgb2Zmc2V0WSB9KSB7XG4gICAgY29uc3QgZGVsdGFYID0gb2Zmc2V0WCAtIHRoaXMubGFzdFg7XG4gICAgdGhpcy5sYXN0WCA9IG9mZnNldFg7XG4gICAgY29uc3QgZGVsdGFZID0gb2Zmc2V0WSAtIHRoaXMubGFzdFk7XG4gICAgdGhpcy5sYXN0WSA9IG9mZnNldFk7XG4gICAgdGhpcy5lbWl0KFwibW92ZVwiLCBbZGVsdGFYLCBkZWx0YVldKTtcbiAgICB0aGlzLm1vdmVzLnB1c2goW2RlbHRhWCwgZGVsdGFZXSlcbiAgfVxuICBsaXN0ZW4oKSB7XG4gICAgY29uc3QgbG9nTW92ZSA9IHRoaXMubG9nTW92ZS5iaW5kKHRoaXMpO1xuICAgIGNvbnN0IF8gPSBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKHRoaXMuZW5hYmxlKSBsb2dNb3ZlKGUpO1xuICAgIH0uYmluZCh0aGlzKTtcbiAgICBjb25zdCBkb3duID0gZnVuY3Rpb24gKHsgb2Zmc2V0WCwgb2Zmc2V0WSB9KSB7XG4gICAgICB0aGlzLmxhc3RYID0gb2Zmc2V0WDtcbiAgICAgIHRoaXMubGFzdFkgPSBvZmZzZXRZO1xuICAgICAgdGhpcy5lbmFibGUgPSB0cnVlO1xuICAgIH0uYmluZCh0aGlzKTtcbiAgICBjb25zdCB1cCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuZW5hYmxlID0gZmFsc2U7XG4gICAgfS5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgXyk7XG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgZG93bik7XG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHVwKTtcbiAgICB0aGlzLnVuc3Vic2NyaWJlID0gKCkgPT4ge1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgXyk7XG4gICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBkb3duKTtcbiAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB1cCk7XG4gICAgfTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBtNCB9IGZyb20gXCJyb21hbnBwcG1hdGhcIjtcclxuaW1wb3J0IHsgY3JlYXRlQm94LCBHTGNvbnRleHRXcmFwcGVyLCBwb2ludExpZ2h0U2hhZGVycywgZGVmYXVsdFNoYWRlcnMsIGNyZWF0ZVNwaGVyZSB9IGZyb20gXCJyb21hbnBwcGdyYXBoaWNzXCI7XHJcbmltcG9ydCB0ZXh0dXJlU2hhZGVycyBmcm9tIFwiLi90ZXh0dXJlU2hhZGVyXCI7XHJcbmltcG9ydCB7IGdldEJveFVWcyB9IGZyb20gXCIuL2JveFVWc1wiO1xyXG5pbXBvcnQgRnJlZUNhbSBmcm9tIFwiLi4vLi4vc3JjL21pc2MvRnJlZUNhbVwiO1xyXG5pbXBvcnQgS2V5SW5wdXQgZnJvbSBcIi4uLy4uL3NyYy9taXNjL2tleUlucHV0XCI7XHJcbmltcG9ydCBNb3VzZUlucHV0IGZyb20gXCIuLi8uLi9zcmMvbWlzYy9tb3VzZUlucHV0XCI7XHJcbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpO1xyXG5pZiAoIWNhbnZhcylcclxuICAgIHRocm93ICdObyBjYW52YXMgZm91bmQnO1xyXG5jb25zdCBtb3VzZUlucHV0ID0gbmV3IE1vdXNlSW5wdXQoY2FudmFzKTtcclxubW91c2VJbnB1dC5saXN0ZW4oKTtcclxuY29uc3Qga2V5SW5wdXQgPSBuZXcgS2V5SW5wdXQoKTtcclxua2V5SW5wdXQubGlzdGVuKCk7XHJcbmNvbnN0IHBsYXllciA9IG5ldyBGcmVlQ2FtKCk7XHJcbnBsYXllci5saXN0ZW5LZXlib2FyZChrZXlJbnB1dCk7XHJcbnBsYXllci5saXN0ZW5Nb3VzZShtb3VzZUlucHV0KTtcclxucGxheWVyLmNhbVBvcyA9IFstMTAsIDE1LCAyMF07XHJcbnBsYXllci5yb3RhdGlvblggPSAtTWF0aC5QSSAqIDAuMTtcclxucGxheWVyLnJvdGF0aW9uWSA9IC1NYXRoLlBJICogMC4xO1xyXG5jb25zdCBnbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpLmdldENvbnRleHQoXCJ3ZWJnbDJcIik7XHJcbmNvbnN0IGNvbnRleHQgPSBuZXcgR0xjb250ZXh0V3JhcHBlcihnbCk7XHJcbmNvbnN0IHsgUHJpbWl0aXZlUmVuZGVyZXIsIERyYXdlciwgUHJvZ3JhbUluZm8sIFRleHR1cmVJbmZvIH0gPSBjb250ZXh0O1xyXG5jb250ZXh0LnJlc2l6ZUNhbnZhc1RvRGlzcGxheVNpemUoKTtcclxuY29uc3QgZHJhd2VyID0gbmV3IERyYXdlcigpO1xyXG5kcmF3ZXIucHJvamVjdGlvbk1hdHJpeCA9IERyYXdlci5jcmVhdGUzZFByb2plY3Rpb25NYXRyaXgoMSwgMjAwMCwgZ2wuY2FudmFzLndpZHRoLCBnbC5jYW52YXMuaGVpZ2h0KTtcclxuY29uc3QgcG9pbnRMaWdodFByb2dyYW1JbmZvID0gbmV3IFByb2dyYW1JbmZvKHBvaW50TGlnaHRTaGFkZXJzLnZlcnQsIHBvaW50TGlnaHRTaGFkZXJzLmZyYWcpO1xyXG5wb2ludExpZ2h0UHJvZ3JhbUluZm8uY29tcGlsZVNoYWRlcnMoKS5jcmVhdGVVbmlmb3JtU2V0dGVycygpO1xyXG5jb25zdCBkZWZhdWx0UHJvZ3JhbUluZm8gPSBuZXcgUHJvZ3JhbUluZm8oZGVmYXVsdFNoYWRlcnMudmVydCwgZGVmYXVsdFNoYWRlcnMuZnJhZyk7XHJcbmNvbnN0IHRleHR1cmVQcm9ncmFtSW5mbyA9IG5ldyBQcm9ncmFtSW5mbyh0ZXh0dXJlU2hhZGVycy52ZXJ0LCB0ZXh0dXJlU2hhZGVycy5mcmFnKTtcclxudGV4dHVyZVByb2dyYW1JbmZvLmNvbXBpbGVTaGFkZXJzKCkuY3JlYXRlVW5pZm9ybVNldHRlcnMoKTtcclxuZGVmYXVsdFByb2dyYW1JbmZvLmNvbXBpbGVTaGFkZXJzKCkuY3JlYXRlVW5pZm9ybVNldHRlcnMoKTtcclxuY29uc3QgY3ViZSA9IFByaW1pdGl2ZVJlbmRlcmVyLmZyb21BcnJheURhdGEoY3JlYXRlQm94KDEsIDEsIDEpKTtcclxuY29uc3QgcG9pbnQgPSBuZXcgUHJpbWl0aXZlUmVuZGVyZXIoKTtcclxuY29uc3QgdGV4dHVyZTEgPSBuZXcgVGV4dHVyZUluZm8oKTtcclxudGV4dHVyZTEuY3JlYXRlVGV4dHVyZUZyb21VUkwoXCJyZXNvdXJjZXMvYXRsYXMucG5nXCIpO1xyXG5jb25zdCBzZXR0aW5ncyA9IFtcclxuICAgIHsgeDogLTEsIHk6IDEsIHpSb3Q6IDAsIG1hZ0ZpbHRlcjogZ2wuTkVBUkVTVCwgbWluRmlsdGVyOiBnbC5ORUFSRVNULCB9LFxyXG4gICAgeyB4OiAwLCB5OiAxLCB6Um90OiAwLCBtYWdGaWx0ZXI6IGdsLkxJTkVBUiwgbWluRmlsdGVyOiBnbC5MSU5FQVIsIH0sXHJcbiAgICB7IHg6IDEsIHk6IDEsIHpSb3Q6IDAsIG1hZ0ZpbHRlcjogZ2wuTElORUFSLCBtaW5GaWx0ZXI6IGdsLk5FQVJFU1RfTUlQTUFQX05FQVJFU1QsIH0sXHJcbiAgICB7IHg6IC0xLCB5OiAtMSwgelJvdDogMSwgbWFnRmlsdGVyOiBnbC5MSU5FQVIsIG1pbkZpbHRlcjogZ2wuTElORUFSX01JUE1BUF9ORUFSRVNULCB9LFxyXG4gICAgeyB4OiAwLCB5OiAtMSwgelJvdDogMSwgbWFnRmlsdGVyOiBnbC5MSU5FQVIsIG1pbkZpbHRlcjogZ2wuTkVBUkVTVF9NSVBNQVBfTElORUFSLCB9LFxyXG4gICAgeyB4OiAxLCB5OiAtMSwgelJvdDogMSwgbWFnRmlsdGVyOiBnbC5MSU5FQVIsIG1pbkZpbHRlcjogZ2wuTElORUFSX01JUE1BUF9MSU5FQVIsIH0sXHJcbl07XHJcbmNvbnN0IHMgPSBzZXR0aW5nc1swXTtcclxuZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZTEudGV4dHVyZSk7XHJcbmdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBzLm1pbkZpbHRlcik7XHJcbmdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBzLm1hZ0ZpbHRlcik7XHJcbmNvbnN0IHV2cyA9IGdldEJveFVWcygxNiwgNCk7XHJcbmN1YmVcclxuICAgIC5jcmVhdGVWQU8oKVxyXG4gICAgLnNldERyYXdlcihkcmF3ZXIpXHJcbiAgICAuc2V0UHJvZ3JhbUluZm8odGV4dHVyZVByb2dyYW1JbmZvKVxyXG4gICAgLmJ1ZmZlckRhdGEoJ1RFWENPT1JEXzAnLCB1dnMpXHJcbiAgICAuc2V0TW9kZSg0KTtcclxuY29uc3Qgc3BoZXJlID0gUHJpbWl0aXZlUmVuZGVyZXIuZnJvbUFycmF5RGF0YShjcmVhdGVTcGhlcmUoMSwgMTAsIDEwKSk7XHJcbnNwaGVyZVxyXG4gICAgLmNyZWF0ZVZBTygpXHJcbiAgICAuc2V0RHJhd2VyKGRyYXdlcilcclxuICAgIC5zZXRQcm9ncmFtSW5mbyhwb2ludExpZ2h0UHJvZ3JhbUluZm8pXHJcbiAgICAuc2V0TW9kZSg0KTtcclxucG9pbnRcclxuICAgIC5jcmVhdGVWQU8oKVxyXG4gICAgLnNldERyYXdlcihkcmF3ZXIpXHJcbiAgICAuc2V0UHJvZ3JhbUluZm8oZGVmYXVsdFByb2dyYW1JbmZvKVxyXG4gICAgLmNyZWF0ZUJ1ZmZlckF0dHJpYkRhdGEoe1xyXG4gICAgYXR0cmliTmFtZTogXCJhX3Bvc2l0aW9uXCIsXHJcbiAgICBsb2NhdGlvbjogMCxcclxuICAgIGF0dHJpYnV0ZVR5cGU6IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQuRkxPQVRfVkVDMyxcclxuICAgIG51bUNvbXBvbmVudHM6IDMsXHJcbn0pXHJcbiAgICAuc2V0QXR0cmlidXRlcygpXHJcbiAgICAuYnVmZmVyRGF0YShcImFfcG9zaXRpb25cIiwgbmV3IEZsb2F0MzJBcnJheShbMSwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMV0pKVxyXG4gICAgLnNldE1vZGUoMylcclxuICAgIC5zZXROdW1FbGVtZW50cyg1KTtcclxuY29uc3QgdW5pZm9ybXMgPSB7XHJcbiAgICB1X2xpZ2h0V29ybGRQb3NpdGlvbjogWzMwLCA1MCwgMzBdLFxyXG4gICAgdV9hbWJpZW50TGlnaHQ6IFsxLCAxLCAwLjMsIDAuMTFdLFxyXG4gICAgdV9yZXZlcnNlTGlnaHREaXJlY3Rpb246IFsxLCAwLCAwXSxcclxuICAgIHVfc2hpbmluZXNzOiAzMDAsXHJcbn07XHJcbmltcG9ydCB7IFJpZ2lkQm9keSB9IGZyb20gXCIuLi8uLi9zcmMvcGh5c2ljcy9SaWdpZEJvZHlcIjtcclxuaW1wb3J0IFNpbXVsYXRpb24gZnJvbSBcIi4uLy4uL3NyYy9waHlzaWNzL1NpbXVsYXRpb25cIjtcclxuaW1wb3J0IHsgQm94LCBTcGhlcmUgfSBmcm9tIFwiLi4vLi4vc3JjL3BoeXNpY3MvQ29sbGlkZXJcIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vLi4vc3JjL3BoeXNpY3MvY29uZmlnXCI7XHJcbmltcG9ydCBEZWJ1ZyBmcm9tIFwiLi4vLi4vc3JjL3BoeXNpY3MvRGVidWdcIjtcclxuY29uZmlnLlJJR0lEX0JPRFlfTU9WRV9UUkVTSE9MRCA9IDAuMDAxO1xyXG5jb25maWcuQ09OVEFDVF9UUkVTSE9MRCA9IDAuMDAwMDE7XHJcbmNvbmZpZy5DTElQX0JJQVMgPSAwLjAxO1xyXG5jb25maWcuQ09OVEFDVF9NQU5JRk9MRF9LRUVQX1RSRVNIT0xEID0gMC4wMDE7XHJcbmNvbnN0IHNpbSA9IG5ldyBTaW11bGF0aW9uKCk7XHJcbmNvbnN0IGJvZHkgPSBuZXcgUmlnaWRCb2R5KG5ldyBCb3goMSwgMSwgMSkpO1xyXG5jb25zdCBmbG9vciA9IHsgcGh5c2ljczogbmV3IFJpZ2lkQm9keShuZXcgQm94KDEwMCwgNSwgMTAwKSksIHNwcml0ZTogY3ViZSwgdW5pZm9ybXM6IHsgdV9jb2xvcjogWzEsIDAsIDEsIDFdIH0gfTtcclxuZmxvb3IucGh5c2ljcy5zZXRNYXNzKDEpO1xyXG5mbG9vci5waHlzaWNzLnN0YXRpYyA9IHRydWU7XHJcbmZsb29yLnBoeXNpY3MudHJhbnNsYXRlKFswLCAtMi41LCAwXSk7XHJcbnNpbS5hZGRPYmplY3QoZmxvb3IucGh5c2ljcyk7XHJcbmxldCBvYmplY3RzVG9EcmF3ID0gW107XHJcbm9iamVjdHNUb0RyYXcucHVzaChmbG9vcik7XHJcbmZvciAobGV0IGkgPSAwOyBpIDwgMTU7IGkrKykge1xyXG4gICAgY29uc3QgYm94ID0geyBwaHlzaWNzOiBuZXcgUmlnaWRCb2R5KG5ldyBCb3goMywgMywgMykpLCBzcHJpdGU6IGN1YmUsIHVuaWZvcm1zOiB7IHVfY29sb3I6IFswLCAwLCAxLCAxXSB9IH07XHJcbiAgICBib3gucGh5c2ljcy50cmFuc2xhdGUoWy0yLjUgKyAoaSAlIDUpICogMywgMSArIDMuMDEgKiAoaSAlIDMpLCAwXSk7XHJcbiAgICAvL2JveC5waHlzaWNzLnRyYW5zbGF0ZShbMCwgIDEgKyAzLjAxICogKGkpLCAwXSk7XHJcbiAgICBib3gucGh5c2ljcy5zZXRNYXNzKDUpO1xyXG4gICAgYm94LnBoeXNpY3MuYWRkQWNjZWxlcmF0aW9uKFswLCAtOSwgMF0pO1xyXG4gICAgc2ltLmFkZE9iamVjdChib3gucGh5c2ljcyk7XHJcbiAgICBvYmplY3RzVG9EcmF3LnB1c2goYm94KTtcclxufVxyXG5jb25zdCBib3ggPSB7IHBoeXNpY3M6IG5ldyBSaWdpZEJvZHkobmV3IFNwaGVyZSg1KSksIHNwcml0ZTogc3BoZXJlLCB1bmlmb3JtczogeyB1X2NvbG9yOiBbMCwgMCwgMSwgMV0gfSB9O1xyXG5ib3gucGh5c2ljcy50cmFuc2xhdGUoWzAsIDUsIC0zMF0pO1xyXG5ib3gucGh5c2ljcy5zZXRNYXNzKDMyKTtcclxuYm94LnBoeXNpY3MuYWRkQWNjZWxlcmF0aW9uKFswLCAtOSwgMF0pO1xyXG5ib3gucGh5c2ljcy5hZGRWZWxvY2l0eShbMCwgMCwgMTBdKTtcclxuYm94LnBoeXNpY3MuYWRkQW5ndWxhclYoWzEsIDEsIDFdKTtcclxuc2ltLmFkZE9iamVjdChib3gucGh5c2ljcyk7XHJcbm9iamVjdHNUb0RyYXcucHVzaChib3gpO1xyXG4vKlxyXG5jb25zdCBib3gyID0geyBwaHlzaWNzOiBuZXcgUmlnaWRCb2R5KG5ldyBCb3goNSkpLCBzcHJpdGU6IGN1YmUsIHVuaWZvcm1zIDoge3VfY29sb3IgOiBbMCwwLDEsMV19IH07XHJcbiAgYm94Mi5waHlzaWNzLnRyYW5zbGF0ZShbMCw1LDBdKTtcclxuICBib3gyLnBoeXNpY3Muc2V0TWFzcygyKTtcclxuICBib3gyLnBoeXNpY3MuYWRkQWNjZWxlcmF0aW9uKFswLCAtOSwgMF0pO1xyXG4gIGJveDIucGh5c2ljcy5hZGRWZWxvY2l0eShbMCwyMCwtMF0pXHJcbiAgYm94Mi5waHlzaWNzLmFkZEFuZ3VsYXJWKFsxLDEsMV0pXHJcbiAgc2ltLmFkZE9iamVjdChib3gyLnBoeXNpY3MpO1xyXG4gIG9iamVjdHNUb0RyYXcucHVzaChib3gyKTtcclxuKi9cclxubGV0IGxhc3RDYWxsID0gRGF0ZS5ub3coKTtcclxuY29uc3Qgc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcclxuY29uc3QgbG9vcCA9ICgpID0+IHtcclxuICAgIHBsYXllci50aWNrKCk7XHJcbiAgICBzaW0udGljaygwLjAxNSk7XHJcbiAgICBjb25zdCBjdXJlbnRUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgIGNvbnN0IGRlbHRhID0gY3VyZW50VGltZSAtIGxhc3RDYWxsO1xyXG4gICAgRGVidWcuZGF0YS5GUFMgPSBNYXRoLmZsb29yKE51bWJlcigoMSAvIGRlbHRhKSAqIDEwMDApKTtcclxuICAgIERlYnVnLmRhdGEuUlVOVElNRSA9IChjdXJlbnRUaW1lIC0gc3RhcnRUaW1lKSAvIDEwMDA7XHJcbiAgICBsYXN0Q2FsbCA9IGN1cmVudFRpbWU7XHJcbiAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUIHwgZ2wuREVQVEhfQlVGRkVSX0JJVCk7XHJcbiAgICBnbC5lbmFibGUoZ2wuQ1VMTF9GQUNFKTtcclxuICAgIGdsLmVuYWJsZShnbC5ERVBUSF9URVNUKTtcclxuICAgIGNvbnN0IGNhbWVyYU1hdHJpeCA9IHBsYXllci5jYW1NYXRyaXg7XHJcbiAgICBjb25zdCB7IHRyYW5zbGF0aW9uIH0gPSBtNC5kZWNvbXBvc2UoY2FtZXJhTWF0cml4KTtcclxuICAgIGNvbnN0IHVfdmlld1dvcmxkUG9zaXRpb24gPSB0cmFuc2xhdGlvbjtcclxuICAgIG9iamVjdHNUb0RyYXcuZm9yRWFjaCgob2JqKSA9PiB7XHJcbiAgICAgICAgb2JqLnNwcml0ZS5kcmF3KE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB1bmlmb3JtcyksIHsgdV9tYXRyaXg6IG9iai5waHlzaWNzLmNvbGxpZGVyLmdldE00KCksIHVfdmlld1dvcmxkUG9zaXRpb24gfSksIG9iai51bmlmb3JtcyksIGNhbWVyYU1hdHJpeCk7XHJcbiAgICB9KTtcclxuICAgIHBvaW50LmRyYXcoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB1bmlmb3JtcyksIHsgdV9tYXRyaXg6IG00LnNjYWxpbmcoNiwgNiwgNiksIHVfY29sb3I6IFswLCAwLCAwLCAxXSwgdV92aWV3V29ybGRQb3NpdGlvbiB9KSwgY2FtZXJhTWF0cml4KTtcclxuICAgIHBvaW50LmRyYXcoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB1bmlmb3JtcyksIHsgdV9tYXRyaXg6IG00LnNjYWxlKG00LnpSb3RhdGUobTQueVJvdGF0aW9uKE1hdGguUEkpLCAtTWF0aC5QSSAvIDIpLCA2LCA2LCA2KSwgdV9jb2xvcjogWzEsIDAuMSwgMSwgMV0sIHVfdmlld1dvcmxkUG9zaXRpb24gfSksIGNhbWVyYU1hdHJpeCk7XHJcbiAgICBmb3IgKGNvbnN0IFtpZCwgbWFuaWZvbGRdIG9mIHNpbS5jb2xsaXNpb25NYW5pZm9sZHMpIHtcclxuICAgICAgICBtYW5pZm9sZC5jb250YWN0cy5mb3JFYWNoKChjb250YWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHBvaW50XHJcbiAgICAgICAgICAgICAgICAuZHJhdyhPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oeyB1X21hdHJpeDogbTQudHJhbnNsYXRpb24oLi4uY29udGFjdC5QQSksIHVfY29sb3I6IFswLjYsIDAuNiwgMC4wLCAxXSB9LCB1bmlmb3JtcyksIHsgdV92aWV3V29ybGRQb3NpdGlvbiB9KSwgY2FtZXJhTWF0cml4KVxyXG4gICAgICAgICAgICAgICAgLmRyYXcoe1xyXG4gICAgICAgICAgICAgICAgdV9tYXRyaXg6IG00LnRyYW5zbGF0aW9uKC4uLmNvbnRhY3QuUEIpLFxyXG4gICAgICAgICAgICAgICAgdV9jb2xvcjogWzAuNSwgMC4xLCAwLjIsIDFdLFxyXG4gICAgICAgICAgICB9LCBjYW1lcmFNYXRyaXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZ2wudmlld3BvcnQoMCwgMCwgZ2wuY2FudmFzLndpZHRoLCBnbC5jYW52YXMuaGVpZ2h0KTtcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcclxufTtcclxubG9vcCgpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=