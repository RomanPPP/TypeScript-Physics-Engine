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
  !*** ./demo/joints/joints.ts ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var romanpppmath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! romanpppmath */ "./node_modules/romanpppmath/lib/index.js");
/* harmony import */ var romanpppgraphics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! romanpppgraphics */ "./node_modules/romanpppgraphics/lib/index.js");
/* harmony import */ var _src_misc_FreeCam__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../src/misc/FreeCam */ "./src/misc/FreeCam.js");
/* harmony import */ var _src_misc_keyInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../src/misc/keyInput */ "./src/misc/keyInput.js");
/* harmony import */ var _src_misc_mouseInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../src/misc/mouseInput */ "./src/misc/mouseInput.js");
/* harmony import */ var _src_physics_RigidBody__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../src/physics/RigidBody */ "./src/physics/RigidBody.ts");
/* harmony import */ var _src_physics_Simulation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../src/physics/Simulation */ "./src/physics/Simulation.ts");
/* harmony import */ var _src_physics_Collider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../src/physics/Collider */ "./src/physics/Collider.ts");
/* harmony import */ var _src_physics_Constraints__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../src/physics/Constraints */ "./src/physics/Constraints.ts");
/* harmony import */ var _src_physics_config__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../src/physics/config */ "./src/physics/config.ts");





const mouseInput = new _src_misc_mouseInput__WEBPACK_IMPORTED_MODULE_4__["default"]();
mouseInput.listen();
const keyInput = new _src_misc_keyInput__WEBPACK_IMPORTED_MODULE_3__["default"]();
keyInput.listen();
const player = new _src_misc_FreeCam__WEBPACK_IMPORTED_MODULE_2__["default"]();
player.listenKeyboard(keyInput);
player.listenMouse(mouseInput);
player.camPos = [-10, 30, 25];
player.rotationX = -Math.PI * 0.1;
player.rotationY = -Math.PI * 0.1;
const gl = document.getElementById("canvas").getContext("webgl2");
const context = new romanpppgraphics__WEBPACK_IMPORTED_MODULE_1__.GLcontextWrapper(gl);
const { PrimitiveRenderer, Drawer, ProgramInfo } = context;
context.resizeCanvasToDisplaySize();
const drawer = new Drawer();
drawer.projectionMatrix = Drawer.create3dProjectionMatrix(1, 2000, gl.canvas.width, gl.canvas.height);
const pointLightProgramInfo = new ProgramInfo(romanpppgraphics__WEBPACK_IMPORTED_MODULE_1__.pointLightShaders.vert, romanpppgraphics__WEBPACK_IMPORTED_MODULE_1__.pointLightShaders.frag);
pointLightProgramInfo.compileShaders().createUniformSetters();
const defaultProgramInfo = new ProgramInfo(romanpppgraphics__WEBPACK_IMPORTED_MODULE_1__.defaultShaders.vert, romanpppgraphics__WEBPACK_IMPORTED_MODULE_1__.defaultShaders.frag);
defaultProgramInfo.compileShaders().createUniformSetters();
const cube = PrimitiveRenderer.fromArrayData((0,romanpppgraphics__WEBPACK_IMPORTED_MODULE_1__.createBox)(1, 1, 1));
const point = new PrimitiveRenderer();
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
    .setMode(2);
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





_src_physics_config__WEBPACK_IMPORTED_MODULE_9__["default"].RIGID_BODY_MOVE_TRESHOLD = 0.0001;
const sim = new _src_physics_Simulation__WEBPACK_IMPORTED_MODULE_6__["default"]();
const body = new _src_physics_RigidBody__WEBPACK_IMPORTED_MODULE_5__.RigidBody(new _src_physics_Collider__WEBPACK_IMPORTED_MODULE_7__.Box(5, 5, 5));
const floor = {
    physics: new _src_physics_RigidBody__WEBPACK_IMPORTED_MODULE_5__.RigidBody(new _src_physics_Collider__WEBPACK_IMPORTED_MODULE_7__.Box(50, 5, 50)),
    sprite: cube,
    uniforms: { u_color: [1, 0, 1, 1] },
};
floor.physics.setMass(99999999999);
floor.physics.static = true;
floor.physics.translate([0, -2.5, 0]);
sim.addObject(floor.physics);
let objectsToDraw = [];
objectsToDraw.push(floor);
/*
for (let i = 0; i < 10; i++) {
  const box = { physics: new RigidBody(new Box(3, 3, 3)), sprite: cube, uniforms : {u_color : [0,0,1,1]} };
  box.physics.translate([0,  1.5 + 3.1 * (i), 0]);
  //box.physics.translate([0,  1 + 3.01 * (i), 0]);
  box.physics.setMass(2);
  box.physics.addAcceleration([0, -9, 0]);
  sim.addObject(box.physics);
  objectsToDraw.push(box);

}*/
const box = {
    physics: new _src_physics_RigidBody__WEBPACK_IMPORTED_MODULE_5__.RigidBody(new _src_physics_Collider__WEBPACK_IMPORTED_MODULE_7__.Sphere(5)),
    sprite: sphere,
    uniforms: { u_color: [0, 0, 1, 1] },
};
box.physics.translate([0, 5, 0]);
box.physics.setMass(2);
box.physics.addAcceleration([0, -9, 0]);
sim.addObject(box.physics);
objectsToDraw.push(box);
const constr = new _src_physics_Constraints__WEBPACK_IMPORTED_MODULE_8__.Constraint(floor.physics, box.physics, [0, 20, 0], [0, 0, 0], { biasFactor: 0.1 });
const constr2 = new _src_physics_Constraints__WEBPACK_IMPORTED_MODULE_8__.Constraint(floor.physics, box.physics, [0, 25, 0], [0, 5, 0], { biasFactor: 0.1 });
const constr3 = new _src_physics_Constraints__WEBPACK_IMPORTED_MODULE_8__.Constraint(floor.physics, box.physics, [0, 25, 5], [0, 5, 5], { biasFactor: 0.1 });
console.log(constr);
sim.addConstraints([constr, constr2, constr3], '1');
const box2 = { physics: new _src_physics_RigidBody__WEBPACK_IMPORTED_MODULE_5__.RigidBody(new _src_physics_Collider__WEBPACK_IMPORTED_MODULE_7__.Box(5, 5, 5)), sprite: cube, uniforms: { u_color: [0, 0, 1, 1] } };
box2.physics.translate([1, 40, 0]);
box2.physics.setMass(5);
box2.physics.addAcceleration([0, -9, 0]);
sim.addObject(box2.physics);
objectsToDraw.push(box2);
let lastCall = Date.now();
const fps = document.querySelector("#fps");
const time = document.querySelector("#time");
const time2 = document.querySelector("#time2");
const numIter = 1;
const startTime = Date.now();
const loop = () => {
    player.tick();
    sim.tick(0.015);
    const curentTime = Date.now();
    const delta = curentTime - lastCall;
    const totalTime = curentTime - startTime;
    fps.textContent = Number((1 / delta) * 1000).toString();
    time.textContent = `Collisions : \n${sim.broadPhaseCollisions
        .map((e) => `${e[0]} : ${e[1].join(",")}`)
        .join("\n")}`;
    time2.textContent = `Run time : ${totalTime / 1000}`;
    lastCall = curentTime;
    gl.clearColor(0.7, 0.9, 0.9, 1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qb2ludHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQTBQO0FBQzFQO0FBQ0EsS0FBSyw4Q0FBVSxLQUFLLDRCQUE0QjtBQUNoRCxLQUFLLDhDQUFVLEtBQUssNEJBQTRCO0FBQ2hELEtBQUssOENBQVUsS0FBSyw0QkFBNEI7QUFDaEQ7QUFDQSw2QkFBNkIsZ0ZBQWdGO0FBQzdHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsdUZBQXVGO0FBQ2xIO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFdBQVc7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixxRUFBcUU7QUFDaEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyx1Q0FBRztBQUNqQixjQUFjLHlDQUFLO0FBQ25CLGNBQWMsOENBQVU7QUFDeEIsY0FBYyw4Q0FBVTtBQUN4QixjQUFjLDhDQUFVO0FBQ3hCLGNBQWMsOENBQVU7QUFDeEIsY0FBYyw4Q0FBVTtBQUN4QixjQUFjLDhDQUFVO0FBQ3hCLGNBQWMsZ0RBQVk7QUFDMUIsY0FBYyxxREFBaUI7QUFDL0IsY0FBYyxxREFBaUI7QUFDL0IsY0FBYyxxREFBaUI7QUFDL0IsY0FBYyxxREFBaUI7QUFDL0IsY0FBYyw0Q0FBUTtBQUN0QixjQUFjLDRDQUFRO0FBQ3RCLGNBQWMsNENBQVE7QUFDdEIsY0FBYyx3Q0FBSTtBQUNsQixjQUFjLDZDQUFTO0FBQ3ZCLGNBQWMsNkNBQVM7QUFDdkIsY0FBYyw2Q0FBUztBQUN2QjtBQUNBLHNCQUFzQix1RUFBdUU7QUFDN0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixnQkFBZ0I7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsYUFBYTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixhQUFhO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGFBQWE7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDK0I7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuRkc7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsd0RBQWM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsdUVBQXVFO0FBQ3ZGLGdCQUFnQixtQkFBbUI7QUFDbkMsZ0JBQWdCLEtBQUs7QUFDckIsMkJBQTJCLG9EQUFVO0FBQ3JDLHFDQUFxQyxxREFBVztBQUNoRCxzQ0FBc0MscURBQVc7QUFDakQ7QUFDQTtBQUNBO0FBQ0EsdURBQXVELGVBQWUsdUJBQXVCO0FBQzdGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsdUVBQXVFO0FBQ3ZGLGdCQUFnQixtQkFBbUI7QUFDbkMsZ0JBQWdCLEtBQUs7QUFDckIsMkJBQTJCLG9EQUFVO0FBQ3JDLHFDQUFxQyxxREFBVztBQUNoRCxvQ0FBb0MscURBQVc7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsZUFBZSxrQ0FBa0M7QUFDeEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLE1BQU0sRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3REc0I7QUFDUTtBQUN0QjtBQUNjO0FBQzdCO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLHFEQUFXO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxpQ0FBaUMsMERBQWlCO0FBQ2xEO0FBQ0Esa0RBQWtELDBEQUFpQjtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsaUNBQWlDLCtDQUFNO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxpQ0FBaUMscURBQVc7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pGb0Q7QUFDTjtBQUN3QjtBQUNKO0FBQ2xFO0FBQ0E7QUFDQSxZQUFZLHdDQUF3QztBQUNwRDtBQUNBO0FBQ0EsZ0JBQWdCLDZCQUE2QjtBQUM3QztBQUNBLGdCQUFnQixxQkFBcUI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixrREFBYztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNERBQTRELDZDQUFTO0FBQ3JFLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBLGtFQUFrRSwwREFBaUI7QUFDbkY7QUFDQSxtQkFBbUIsdURBQVksR0FBRyxrQkFBa0I7QUFDcEQsS0FBSztBQUNMO0FBQ0E7QUFDQSw4REFBOEQsMERBQWlCO0FBQy9FO0FBQ0EsZUFBZSx1REFBWSxHQUFHLGtCQUFrQjtBQUNoRCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDMEY7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BFbEM7QUFDUjtBQUNJO0FBQ3BEO0FBQ0Esa0JBQWtCLGtCQUFrQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsT0FBTztBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELE9BQU87QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLDhFQUE4RTtBQUN4SCxvREFBb0QsT0FBTztBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUM2Qzs7Ozs7Ozs7Ozs7Ozs7O0FDcEM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGdCQUFnQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEQUErRCxlQUFlLDhCQUE4QjtBQUM1RyxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsZ0JBQWdCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEQUErRCxlQUFlLDhCQUE4QjtBQUM1RyxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGlFQUFlLEtBQUssRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztBQzNObUM7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixVQUFVO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLEtBQUs7QUFDckIsZ0JBQWdCLGdFQUFnRTtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxpRUFBbUI7QUFDbkU7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixLQUFLO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsb0ZBQW9GO0FBQ2pILGdCQUFnQixLQUFLO0FBQ3JCLHFDQUFxQyxpRUFBbUI7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixLQUFLO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLEtBQUs7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsaUJBQWlCLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JKQztBQUNlO0FBQ2pELFFBQVEseUJBQXlCLEVBQUUsNENBQUU7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBLHdCQUF3QixPQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsOENBQVU7QUFDekMsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiw4Q0FBVTtBQUN6QyxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLDhDQUFVO0FBQ3pDLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG9CQUFvQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixnQkFBZ0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG9CQUFvQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLDhDQUFVO0FBQ3pDLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsOENBQVU7QUFDekMsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG9CQUFvQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsZ0JBQWdCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLDhDQUFVO0FBQ3pDLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsOENBQVU7QUFDekMsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHlCQUF5QjtBQUM3Qyx3QkFBd0IsdUJBQXVCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixzQkFBc0I7QUFDMUMsd0JBQXdCLHdCQUF3QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiw4Q0FBVTtBQUN6QyxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLDhDQUFVO0FBQ3pDLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsOENBQVU7QUFDekMsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsV0FBVztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixzQkFBc0I7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLG1DQUFtQztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5Qix5QkFBeUI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsOENBQVU7QUFDekMsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiw4Q0FBVTtBQUN6QyxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLDhDQUFVO0FBQ3pDLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2tGOzs7Ozs7Ozs7Ozs7Ozs7QUMzakJsRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixrQkFBa0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsc0JBQXNCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxFQUFFO0FBQ3ZDO0FBQ0EsMENBQTBDLEVBQUU7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IscUJBQXFCO0FBQ3JDLGdCQUFnQixLQUFLO0FBQ3JCLGdCQUFnQixpQ0FBaUM7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixzREFBc0Q7QUFDdEUsZ0JBQWdCLEtBQUs7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsNEJBQTRCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDRCQUE0QjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUN1Qjs7Ozs7Ozs7Ozs7Ozs7O0FDaE12QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLEtBQUs7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGNBQWM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUN1Qjs7Ozs7Ozs7Ozs7Ozs7O0FDL0d2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsaUVBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2Z2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLDJCQUEyQixjQUFjO0FBQ3pDLDBCQUEwQixjQUFjO0FBQ3hDLEtBQUs7QUFDTDtBQUNBLGlFQUFlLEVBQUUsRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztBQzFJSTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0Esc0JBQXNCLHFEQUFZLENBQUMsZ0RBQU87QUFDMUMsc0JBQXNCLHFEQUFZLENBQUMsaURBQVE7QUFDM0Msc0JBQXNCLHFEQUFZLENBQUMsaURBQVE7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLDBEQUEwRDtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxpQ0FBaUM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBT0U7Ozs7Ozs7Ozs7Ozs7OztBQ2pYWTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQjBDO0FBQ0o7QUFDUjtBQUM5QixRQUFRLGlEQUFpRCxFQUFFLCtDQUFNO0FBQ2pFLHdCQUF3QixxREFBWTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxPQUFPO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLFFBQVE7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxxQkFBcUI7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxPQUFPO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDbUo7Ozs7Ozs7Ozs7Ozs7OztBQ2xJbko7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxNQUFNLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiZ0I7QUFDcUI7QUFDM0QsUUFBUSx3REFBd0QsRUFBRSw0Q0FBRTtBQUN0QztBQUM5QixRQUFRLDhDQUE4QyxFQUFFLCtDQUFNO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiw0QkFBNEI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLDhCQUE4QjtBQUMxRDtBQUNBO0FBQ0Esd0JBQXdCLGVBQWU7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Z3JhcGhpY3MvbGliL2NvbXBvbmVudHMvQnVmZmVyQXR0cmlidXRlLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL2NvbXBvbmVudHMvRHJhd2VyLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL2NvbXBvbmVudHMvR0xXcmFwcGVyLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL2NvbXBvbmVudHMvR2x0ZlV0aWxzLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL2NvbXBvbmVudHMvTWVzaFJlbmRlcmVyLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL2NvbXBvbmVudHMvTW9kZWwuanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBncmFwaGljcy9saWIvY29tcG9uZW50cy9QcmltaXRpdmVSZW5kZXJlci5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcGdyYXBoaWNzL2xpYi9jb21wb25lbnRzL1ByaW1pdGl2ZXMuanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBncmFwaGljcy9saWIvY29tcG9uZW50cy9Qcm9ncmFtSW5mby5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcGdyYXBoaWNzL2xpYi9jb21wb25lbnRzL1RleHR1cmVJbmZvLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL2NvbXBvbmVudHMvYXR0cmliVHlwZVByb3BzLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL2NvbXBvbmVudHMvZW51bXMuanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBncmFwaGljcy9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBncmFwaGljcy9saWIvcmVuZGVyL3NoYWRlcnMvZGVmYXVsdC9mcmFnLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL3JlbmRlci9zaGFkZXJzL2RlZmF1bHQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBncmFwaGljcy9saWIvcmVuZGVyL3NoYWRlcnMvZGVmYXVsdC92ZXJ0LmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL3JlbmRlci9zaGFkZXJzL2luZGV4LmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL3JlbmRlci9zaGFkZXJzL3BvaW50TGlnaHQvZnJhZy5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcGdyYXBoaWNzL2xpYi9yZW5kZXIvc2hhZGVycy9wb2ludExpZ2h0L2luZGV4LmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL3JlbmRlci9zaGFkZXJzL3BvaW50TGlnaHQvdmVydC5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcG1hdGgvbGliL09jdHJlZS5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcG1hdGgvbGliL2FhYmIuanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBtYXRoL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcG1hdGgvbGliL20zLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwbWF0aC9saWIvbTQuanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBtYXRoL2xpYi92My5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL3NyYy9waHlzaWNzL0NvbGxpZGVyLnRzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL3BoeXNpY3MvQ29uc3RyYWludHMudHMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9zcmMvcGh5c2ljcy9Db250YWN0TWFuaWZvbGQudHMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9zcmMvcGh5c2ljcy9EZWJ1Zy50cyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL3NyYy9waHlzaWNzL0VxdWF0aW9ucy50cyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL3NyYy9waHlzaWNzL0V2ZW50RW1pdHRlci50cyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL3NyYy9waHlzaWNzL1JpZ2lkQm9keS50cyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL3NyYy9waHlzaWNzL1NpbXVsYXRpb24udHMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9zcmMvcGh5c2ljcy9TeXN0ZW0udHMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9zcmMvcGh5c2ljcy9UcmVlLnRzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL3BoeXNpY3MvY2xpcHBpbmcudHMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9zcmMvcGh5c2ljcy9jb25maWcudHMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9zcmMvcGh5c2ljcy9namsudHMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9zcmMvbWlzYy9GcmVlQ2FtLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL21pc2Mva2V5SW5wdXQuanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9zcmMvbWlzYy9tb3VzZUlucHV0LmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3JvbWFucHBwcGhzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3JvbWFucHBwcGhzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9kZW1vL2pvaW50cy9qb2ludHMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRkxPQVQsIEZMT0FUX01BVDIsIEZMT0FUX01BVDMsIEZMT0FUX01BVDQsIEZMT0FUX1ZFQzIsIElOVCwgRkxPQVRfVkVDMywgRkxPQVRfVkVDNCwgVU5TSUdORURfSU5ULCBVTlNJR05FRF9JTlRfVkVDMiwgVU5TSUdORURfSU5UX1ZFQzMsIFVOU0lHTkVEX0lOVF9WRUM0LCBJTlRfVkVDMiwgSU5UX1ZFQzMsIElOVF9WRUM0LCBCT09MLCBCT09MX1ZFQzIsIEJPT0xfVkVDMywgQk9PTF9WRUM0LCB9IGZyb20gXCIuL2VudW1zXCI7XHJcbmNvbnN0IHR5cGVJbmZvID0ge1xyXG4gICAgW0ZMT0FUX01BVDRdOiB7IHNpemU6IDY0LCByb3dzOiA0LCBjb2xzOiA0IH0sXHJcbiAgICBbRkxPQVRfTUFUMl06IHsgc2l6ZTogMzIsIHJvd3M6IDIsIGNvbHM6IDIgfSxcclxuICAgIFtGTE9BVF9NQVQzXTogeyBzaXplOiA0OCwgcm93czogMywgY29sczogMyB9LFxyXG59O1xyXG5jb25zdCBmbG9hdEF0dHJpYlNldHRlciA9ICh7IG51bUNvbXBvbmVudHMsIHR5cGUsIGxvY2F0aW9uLCBzdHJpZGUsIG9mZnNldCwgYnVmZmVyLCBnbCwgZGl2aXNvciwgbm9ybWFsaXplLCB9KSA9PiB7XHJcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgYnVmZmVyKTtcclxuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGxvY2F0aW9uKTtcclxuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIobG9jYXRpb24sIG51bUNvbXBvbmVudHMsIHR5cGUgfHwgZ2wuRkxPQVQsIG5vcm1hbGl6ZSB8fCBmYWxzZSwgc3RyaWRlIHx8IDAsIG9mZnNldCB8fCAwKTtcclxuICAgIGdsLnZlcnRleEF0dHJpYkRpdmlzb3IobG9jYXRpb24sIGRpdmlzb3IgfHwgMCk7XHJcbn07XHJcbmNvbnN0IG1hdEF0dHJpYlNldHRlciA9ICh7IG51bUNvbXBvbmVudHMsIHR5cGUsIGxvY2F0aW9uLCBvZmZzZXQsIGJ1ZmZlciwgZ2wsIGRpdmlzb3IsIG5vcm1hbGl6ZSwgYXR0cmlidXRlVHlwZSwgfSkgPT4ge1xyXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGJ1ZmZlcik7XHJcbiAgICBjb25zdCBzdHJpZGUgPSB0eXBlSW5mb1thdHRyaWJ1dGVUeXBlXS5zaXplO1xyXG4gICAgY29uc3QgY291bnQgPSB0eXBlSW5mb1thdHRyaWJ1dGVUeXBlXS5yb3dzO1xyXG4gICAgY29uc3Qgcm93T2Zmc2V0ID0gc3RyaWRlIC8gY291bnQ7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShsb2NhdGlvbiArIGkpO1xyXG4gICAgICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIobG9jYXRpb24sIG51bUNvbXBvbmVudHMsIHR5cGUgfCBnbC5GTE9BVCwgZmFsc2UsIHN0cmlkZSB8IDAsIG9mZnNldCArIHJvd09mZnNldCAqIGkpO1xyXG4gICAgICAgIGdsLnZlcnRleEF0dHJpYkRpdmlzb3IobG9jYXRpb24gKyBpLCBkaXZpc29yIHx8IDApO1xyXG4gICAgfVxyXG59O1xyXG5jb25zdCBpbnRBdHRyaWJTZXR0ZXIgPSAoeyBudW1Db21wb25lbnRzLCB0eXBlLCBsb2NhdGlvbiwgc3RyaWRlLCBvZmZzZXQsIGJ1ZmZlciwgZ2wsIGRpdmlzb3IsIH0pID0+IHtcclxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBidWZmZXIpO1xyXG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkobG9jYXRpb24pO1xyXG4gICAgZ2wudmVydGV4QXR0cmliSVBvaW50ZXIobG9jYXRpb24sIG51bUNvbXBvbmVudHMsIHR5cGUgfHwgZ2wuSU5ULCBzdHJpZGUgfHwgMCwgb2Zmc2V0IHx8IDApO1xyXG4gICAgZ2wudmVydGV4QXR0cmliRGl2aXNvcihsb2NhdGlvbiwgZGl2aXNvciB8fCAwKTtcclxufTtcclxuY29uc3QgYXR0cmliVHlwZU1hcCA9IHt9O1xyXG5hdHRyaWJUeXBlTWFwW0lOVF0gPSBpbnRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbRkxPQVRdID0gZmxvYXRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbRkxPQVRfVkVDMl0gPSBmbG9hdEF0dHJpYlNldHRlcjtcclxuYXR0cmliVHlwZU1hcFtGTE9BVF9WRUMzXSA9IGZsb2F0QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW0ZMT0FUX1ZFQzRdID0gZmxvYXRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbRkxPQVRfTUFUMl0gPSBtYXRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbRkxPQVRfTUFUM10gPSBtYXRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbRkxPQVRfTUFUNF0gPSBtYXRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbVU5TSUdORURfSU5UXSA9IGludEF0dHJpYlNldHRlcjtcclxuYXR0cmliVHlwZU1hcFtVTlNJR05FRF9JTlRfVkVDMl0gPSBpbnRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbVU5TSUdORURfSU5UX1ZFQzNdID0gaW50QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW1VOU0lHTkVEX0lOVF9WRUMzXSA9IGludEF0dHJpYlNldHRlcjtcclxuYXR0cmliVHlwZU1hcFtVTlNJR05FRF9JTlRfVkVDNF0gPSBpbnRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbSU5UX1ZFQzJdID0gaW50QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW0lOVF9WRUMzXSA9IGludEF0dHJpYlNldHRlcjtcclxuYXR0cmliVHlwZU1hcFtJTlRfVkVDNF0gPSBpbnRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbQk9PTF0gPSBpbnRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbQk9PTF9WRUMyXSA9IGludEF0dHJpYlNldHRlcjtcclxuYXR0cmliVHlwZU1hcFtCT09MX1ZFQzNdID0gaW50QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW0JPT0xfVkVDNF0gPSBpbnRBdHRyaWJTZXR0ZXI7XHJcbmNsYXNzIEJ1ZmZlckF0dHJpYnV0ZUluZm8ge1xyXG4gICAgY29uc3RydWN0b3IoZ2wsIHsgc3RyaWRlLCB0eXBlLCBvZmZzZXQsIGxvY2F0aW9uLCBudW1Db21wb25lbnRzLCBhdHRyaWJ1dGVUeXBlLCBkaXZpc29yIH0pIHtcclxuICAgICAgICB0aGlzLmdsID0gZ2w7XHJcbiAgICAgICAgdGhpcy5idWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcclxuICAgICAgICB0aGlzLnN0cmlkZSA9IHN0cmlkZSB8IDA7XHJcbiAgICAgICAgdGhpcy5udW1Db21wb25lbnRzID0gbnVtQ29tcG9uZW50cztcclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZVR5cGUgPSBhdHRyaWJ1dGVUeXBlO1xyXG4gICAgICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0IHwgMDtcclxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgIHRoaXMubG9jYXRpb24gPSBsb2NhdGlvbjtcclxuICAgICAgICB0aGlzLmRpdmlzb3IgPSBkaXZpc29yO1xyXG4gICAgfVxyXG4gICAgc2V0QXR0cmlidXRlKCkge1xyXG4gICAgICAgIGNvbnN0IHsgYXR0cmlidXRlVHlwZSB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCBzZXR0ZXIgPSBhdHRyaWJUeXBlTWFwW2F0dHJpYnV0ZVR5cGVdO1xyXG4gICAgICAgIHNldHRlcih0aGlzKTtcclxuICAgIH1cclxuICAgIGJ1ZmZlckRhdGEoZGF0YSwgdXNhZ2UgPSAweDg4ZTQpIHtcclxuICAgICAgICBjb25zdCB7IGdsLCBidWZmZXIgfSA9IHRoaXM7XHJcbiAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGJ1ZmZlcik7XHJcbiAgICAgICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIGRhdGEsIHVzYWdlKTtcclxuICAgIH1cclxuICAgIGFsbG9jQnVmZmVyKGJ5dGVMZW5ndGgsIHVzYWdlID0gMHg4OGU0KSB7XHJcbiAgICAgICAgY29uc3QgeyBnbCwgYnVmZmVyIH0gPSB0aGlzO1xyXG4gICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBidWZmZXIpO1xyXG4gICAgICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBieXRlTGVuZ3RoLCB1c2FnZSk7XHJcbiAgICB9XHJcbiAgICBidWZmZXJTdWJEYXRhKGRhdGEsIG9mZnNldCA9IDApIHtcclxuICAgICAgICBjb25zdCB7IGdsLCBidWZmZXIgfSA9IHRoaXM7XHJcbiAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGJ1ZmZlcik7XHJcbiAgICAgICAgZ2wuYnVmZmVyU3ViRGF0YShnbC5BUlJBWV9CVUZGRVIsIG9mZnNldCwgZGF0YSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IHsgQnVmZmVyQXR0cmlidXRlSW5mbyB9O1xyXG4iLCJpbXBvcnQgeyBtNCB9IGZyb20gXCJyb21hbnBwcG1hdGhcIjtcclxuY29uc3QgZGVnVG9SYWQgPSAoZCkgPT4gKGQgKiBNYXRoLlBJKSAvIDE4MDtcclxuY29uc3QgZmllbGRPZlZpZXdSYWRpYW5zID0gZGVnVG9SYWQoOTApO1xyXG5jbGFzcyBEcmF3ZXIge1xyXG4gICAgc3RhdGljIGNyZWF0ZTNkUHJvamVjdGlvbk1hdHJpeCh6TmVhciwgekZhciwgY2xpZW50V2lkdGgsIGNsaWVudEhlaWdodCkge1xyXG4gICAgICAgIGNvbnN0IGFzcGVjdCA9IGNsaWVudFdpZHRoIC8gY2xpZW50SGVpZ2h0O1xyXG4gICAgICAgIHJldHVybiBtNC5wZXJzcGVjdGl2ZShmaWVsZE9mVmlld1JhZGlhbnMsIGFzcGVjdCwgek5lYXIsIHpGYXIpO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xyXG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XHJcbiAgICAgICAgdGhpcy5wcm9qZWN0aW9uTWF0cml4ID0gbnVsbDtcclxuICAgIH1cclxuICAgIHNldENvbnRleHQoZ2xDb250ZXh0V3JhcHBlcikge1xyXG4gICAgICAgIHRoaXMuY29udGV4dCA9IGdsQ29udGV4dFdyYXBwZXI7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBkcmF3KHByaW1pdGl2ZVJlbmRlcmVyLCB1bmlmb3JtcywgY2FtZXJhTWF0cml4KSB7XHJcbiAgICAgICAgY29uc3QgeyBWQU8sIG1vZGUsIG9mZnNldCwgbnVtRWxlbWVudHMsIGluZGljZXMsIHByb2dyYW1JbmZvLCBjb21wb25lbnRUeXBlLCB9ID0gcHJpbWl0aXZlUmVuZGVyZXI7XHJcbiAgICAgICAgY29uc3QgeyBwcm9qZWN0aW9uTWF0cml4IH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuY29udGV4dDtcclxuICAgICAgICBjb25zdCB2aWV3TWF0cml4ID0gbTQuaW52ZXJzZShjYW1lcmFNYXRyaXgpO1xyXG4gICAgICAgIGNvbnN0IHZpZXdQcm9qZWN0aW9uTWF0cml4ID0gbTQubXVsdGlwbHkocHJvamVjdGlvbk1hdHJpeCwgdmlld01hdHJpeCk7XHJcbiAgICAgICAgY29uc3QgdV93b3JsZFZpZXdQcm9qZWN0aW9uID0gbTQubXVsdGlwbHkodmlld1Byb2plY3Rpb25NYXRyaXgsIHVuaWZvcm1zLnVfbWF0cml4KTtcclxuICAgICAgICB0aGlzLmNvbnRleHQudXNlUHJvZ3JhbUluZm8ocHJvZ3JhbUluZm8pO1xyXG4gICAgICAgIHRoaXMuY29udGV4dFxyXG4gICAgICAgICAgICAubGFzdFVzZWRQcm9ncmFtSW5mb1xyXG4gICAgICAgICAgICAuc2V0VW5pZm9ybXMoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB1bmlmb3JtcyksIHsgdV93b3JsZFZpZXdQcm9qZWN0aW9uIH0pKTtcclxuICAgICAgICBnbC5iaW5kVmVydGV4QXJyYXkoVkFPKTtcclxuICAgICAgICBpZiAoIWluZGljZXMpIHtcclxuICAgICAgICAgICAgZ2wuZHJhd0FycmF5cyhtb2RlLCBvZmZzZXQsIG51bUVsZW1lbnRzKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnbC5kcmF3RWxlbWVudHMobW9kZSwgbnVtRWxlbWVudHMsIGNvbXBvbmVudFR5cGUsIG9mZnNldCk7XHJcbiAgICB9XHJcbiAgICBkcmF3SW5zdGFuY2VkKHByaW1pdGl2ZVJlbmRlcmVyLCB1bmlmb3JtcywgY2FtZXJhTWF0cml4LCBudW1JbnN0YW5jZXMpIHtcclxuICAgICAgICBjb25zdCB7IFZBTywgbW9kZSwgb2Zmc2V0LCBudW1FbGVtZW50cywgaW5kaWNlcywgcHJvZ3JhbUluZm8sIGNvbXBvbmVudFR5cGUsIH0gPSBwcmltaXRpdmVSZW5kZXJlcjtcclxuICAgICAgICBjb25zdCB7IHByb2plY3Rpb25NYXRyaXggfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgeyBnbCB9ID0gdGhpcy5jb250ZXh0O1xyXG4gICAgICAgIGNvbnN0IHZpZXdNYXRyaXggPSBtNC5pbnZlcnNlKGNhbWVyYU1hdHJpeCk7XHJcbiAgICAgICAgY29uc3Qgdmlld1Byb2plY3Rpb25NYXRyaXggPSBtNC5tdWx0aXBseShwcm9qZWN0aW9uTWF0cml4LCB2aWV3TWF0cml4KTtcclxuICAgICAgICBjb25zdCB3b3JsZFZpZXdQcm9qZWN0aW9uID0gbTQubXVsdGlwbHkodmlld1Byb2plY3Rpb25NYXRyaXgsIHVuaWZvcm1zLnVfbWF0cml4KTtcclxuICAgICAgICBjb25zdCB3b3JsZE1hdHJpeCA9IHVuaWZvcm1zLnVfbWF0cml4O1xyXG4gICAgICAgIHRoaXMuY29udGV4dC51c2VQcm9ncmFtSW5mbyhwcm9ncmFtSW5mbyk7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LlxyXG4gICAgICAgICAgICBsYXN0VXNlZFByb2dyYW1JbmZvXHJcbiAgICAgICAgICAgIC5zZXRVbmlmb3JtcyhPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHVuaWZvcm1zKSwgeyB3b3JsZE1hdHJpeCwgd29ybGRWaWV3UHJvamVjdGlvbiB9KSk7XHJcbiAgICAgICAgZ2wuYmluZFZlcnRleEFycmF5KFZBTyk7XHJcbiAgICAgICAgaWYgKCFpbmRpY2VzKSB7XHJcbiAgICAgICAgICAgIGdsLmRyYXdBcnJheXNJbnN0YW5jZWQobW9kZSwgb2Zmc2V0LCBudW1FbGVtZW50cywgbnVtSW5zdGFuY2VzKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnbC5kcmF3RWxlbWVudHNJbnN0YW5jZWQobW9kZSwgbnVtRWxlbWVudHMsIGdsLlVOU0lHTkVEX1NIT1JULCBvZmZzZXQsIG51bUluc3RhbmNlcyk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgRHJhd2VyO1xyXG4iLCJpbXBvcnQgeyBUZXh0dXJlSW5mbyB9IGZyb20gXCIuL1RleHR1cmVJbmZvXCI7XHJcbmltcG9ydCBQcmltaXRpdmVSZW5kZXJlciBmcm9tIFwiLi9QcmltaXRpdmVSZW5kZXJlclwiO1xyXG5pbXBvcnQgRHJhd2VyIGZyb20gXCIuL0RyYXdlclwiO1xyXG5pbXBvcnQgeyBQcm9ncmFtSW5mbyB9IGZyb20gXCIuL1Byb2dyYW1JbmZvXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdMV3JhcHBlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihnbCkge1xyXG4gICAgICAgIHRoaXMuUHJvZ3JhbUluZm8gPSAoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuIGNsYXNzIGV4dGVuZHMgUHJvZ3JhbUluZm8ge1xyXG4gICAgICAgICAgICAgICAgY29uc3RydWN0b3IodmVydGV4U2hhZGVyU291cmNlLCBmcmFnbWVudFNoYWRlclNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cGVyKHNlbGYsIHZlcnRleFNoYWRlclNvdXJjZSwgZnJhZ21lbnRTaGFkZXJTb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICAgICAgdGhpcy5QcmltaXRpdmVSZW5kZXJlciA9ICgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gY2xhc3MgZXh0ZW5kcyBQcmltaXRpdmVSZW5kZXJlciB7XHJcbiAgICAgICAgICAgICAgICBzdGF0aWMgZnJvbUFycmF5RGF0YShhcnJheURhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcmltaXRpdmVSZW5kZXJlciA9IG5ldyBQcmltaXRpdmVSZW5kZXJlcihzZWxmLmdsKTtcclxuICAgICAgICAgICAgICAgICAgICBwcmltaXRpdmVSZW5kZXJlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY3JlYXRlVkFPKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNyZWF0ZUdlb21ldHJ5QnVmZmVycyhhcnJheURhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZXRBdHRyaWJ1dGVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByaW1pdGl2ZVJlbmRlcmVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VwZXIoc2VsZi5nbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSkoKTtcclxuICAgICAgICB0aGlzLkRyYXdlciA9ICgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gY2xhc3MgZXh0ZW5kcyBEcmF3ZXIge1xyXG4gICAgICAgICAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VwZXIoc2VsZik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSkoKTtcclxuICAgICAgICB0aGlzLlRleHR1cmVJbmZvID0gKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHJldHVybiBjbGFzcyBleHRlbmRzIFRleHR1cmVJbmZvIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cGVyKHNlbGYuZ2wpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICAgICAgaWYgKCFnbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyB3ZWJnbCFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2wgPSBnbDtcclxuICAgICAgICB0aGlzLnByb2dyYW1zID0ge307XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgZ2V0TGFzdFVzZWRQcm9ncmFtSW5mbygpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyQ2FjaGUubGFzdFVzZWRQcm9ncmFtSW5mbztcclxuICAgIH1cclxuICAgIHNldExhc3RVc2VkUHJvZ3JhbShwcm9ncmFtSW5mbykge1xyXG4gICAgICB0aGlzLnJlbmRlckNhY2hlLmxhc3RVc2VkUHJvZ3JhbUluZm8gPSBwcm9ncmFtSW5mbztcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAqL1xyXG4gICAgdXNlUHJvZ3JhbUluZm8ocHJvZ3JhbUluZm8pIHtcclxuICAgICAgICBpZiAocHJvZ3JhbUluZm8gIT0gdGhpcy5sYXN0VXNlZFByb2dyYW1JbmZvKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2wudXNlUHJvZ3JhbShwcm9ncmFtSW5mby5wcm9ncmFtKTtcclxuICAgICAgICAgICAgdGhpcy5sYXN0VXNlZFByb2dyYW1JbmZvID0gcHJvZ3JhbUluZm87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgcmVzaXplQ2FudmFzVG9EaXNwbGF5U2l6ZShtdWx0aXBsaWVyID0gMSkge1xyXG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuZ2wuY2FudmFzO1xyXG4gICAgICAgIGNvbnN0IHdpZHRoID0gKGNhbnZhcy5jbGllbnRXaWR0aCAqIG11bHRpcGxpZXIpIHwgMDtcclxuICAgICAgICBjb25zdCBoZWlnaHQgPSAoY2FudmFzLmNsaWVudEhlaWdodCAqIG11bHRpcGxpZXIpIHwgMDtcclxuICAgICAgICBjYW52YXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgcmVzaXplQ2FudmFzKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgICBjb25zdCBjYW52YXMgPSB0aGlzLmdsLmNhbnZhcztcclxuICAgICAgICBjYW52YXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2V0Vmlld3BvcnQoKSB7XHJcbiAgICAgICAgdGhpcy5nbC52aWV3cG9ydCgwLCAwLCB0aGlzLmdsLmNhbnZhcy53aWR0aCwgdGhpcy5nbC5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGdldENvbnRleHQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2w7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IFByaW1pdGl2ZVJlbmRlcmVyIGZyb20gXCIuL1ByaW1pdGl2ZVJlbmRlcmVyXCI7XHJcbmltcG9ydCB7IE1lc2hSZW5kZXJlciB9IGZyb20gXCIuL01lc2hSZW5kZXJlclwiO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVTZXR0ZXIsIEJ1ZmZlckNvbnRyb2xsZXIgfSBmcm9tIFwiLi9CdWZmZXJBdHRyaWJ1dGVcIjtcclxuaW1wb3J0IHsgTlVNX0NPTVBPTkVOVFMsIFRZUEVEX0FSUkFZUywgTE9DQVRJT05TIH0gZnJvbSBcIi4vZW51bXNcIjtcclxuLy8vIFRPRE8gLy8vXHJcbmNvbnN0IEFycmF5RGF0YUZyb21HbHRmID0gKGdsdGYsIGJ1ZmZlcnMpID0+IHtcclxuICAgIGNvbnN0IHsgYnVmZmVyVmlld3MsIGFjY2Vzc29ycywgbWVzaGVzLCBub2RlcyB9ID0gZ2x0ZjtcclxuICAgIGNvbnN0IGF0dHJpYkRhdGFGcm9tQWNjZXNzb3IgPSAoYWNjZXNzb3IpID0+IHtcclxuICAgICAgICBjb25zdCBidWZmZXJWaWV3ID0gYnVmZmVyVmlld3NbYWNjZXNzb3IuYnVmZmVyVmlld107XHJcbiAgICAgICAgY29uc3QgeyBjb3VudCwgY29tcG9uZW50VHlwZSwgdHlwZSB9ID0gYWNjZXNzb3I7XHJcbiAgICAgICAgY29uc3QgYnl0ZU9mZnNldCA9IGFjY2Vzc29yLmJ5dGVPZmZzZXQgfHwgMDtcclxuICAgICAgICBjb25zdCB7IGJ5dGVMZW5ndGgsIHRhcmdldCB9ID0gYnVmZmVyVmlldztcclxuICAgICAgICBjb25zdCBzdHJpZGUgPSBidWZmZXJWaWV3LmJ5dGVTdHJpZGUgfHwgMDtcclxuICAgICAgICBjb25zdCBidWZmZXJWaWV3Qnl0ZU9mZnNldCA9IGJ1ZmZlclZpZXcuYnl0ZU9mZnNldCB8fCAwO1xyXG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IGJ1ZmZlcnNbYnVmZmVyVmlldy5idWZmZXJdO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRhdGE6IG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgYnVmZmVyVmlld0J5dGVPZmZzZXQsIGJ5dGVMZW5ndGgpLFxyXG4gICAgICAgICAgICBudW1Db21wb25lbnRzOiBOVU1fQ09NUE9ORU5UU1t0eXBlXSxcclxuICAgICAgICAgICAgc3RyaWRlLFxyXG4gICAgICAgICAgICBieXRlTGVuZ3RoLFxyXG4gICAgICAgICAgICBsb2NhdGlvbjogbnVsbCxcclxuICAgICAgICAgICAgY291bnQsXHJcbiAgICAgICAgICAgIHR5cGU6IGNvbXBvbmVudFR5cGUsXHJcbiAgICAgICAgICAgIG9mZnNldDogYnl0ZU9mZnNldCB8fCAwLFxyXG4gICAgICAgICAgICBjb21wb25lbnRUeXBlOiBhY2Nlc3Nvci5jb21wb25lbnRUeXBlLFxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgY29uc3QgX21lc2hlcyA9IG1lc2hlcy5tYXAoKG1lc2gpID0+ICh7XHJcbiAgICAgICAgcHJpbWl0aXZlczogbWVzaC5wcmltaXRpdmVzLm1hcCgoX3ByaW1pdGl2ZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwcmltaXRpdmUgPSB7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7fSxcclxuICAgICAgICAgICAgICAgIG1vZGU6IF9wcmltaXRpdmUubW9kZSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKF9wcmltaXRpdmUuaGFzT3duUHJvcGVydHkoXCJpbmRpY2VzXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRpY2VzSW5mbyA9IGF0dHJpYkRhdGFGcm9tQWNjZXNzb3IoYWNjZXNzb3JzW19wcmltaXRpdmUuaW5kaWNlc10pO1xyXG4gICAgICAgICAgICAgICAgcHJpbWl0aXZlLmluZGljZXMgPSBpbmRpY2VzSW5mby5kYXRhO1xyXG4gICAgICAgICAgICAgICAgcHJpbWl0aXZlLm51bUVsZW1lbnRzID0gaW5kaWNlc0luZm8uY291bnQ7XHJcbiAgICAgICAgICAgICAgICBwcmltaXRpdmUuY29tcG9uZW50VHlwZSA9IGluZGljZXNJbmZvLmNvbXBvbmVudFR5cGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgT2JqZWN0LmtleXMoX3ByaW1pdGl2ZS5hdHRyaWJ1dGVzKS5mb3JFYWNoKChhdHRyaWJOYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhdHRyaWJ1dGUgPSBfcHJpbWl0aXZlLmF0dHJpYnV0ZXNbYXR0cmliTmFtZV07XHJcbiAgICAgICAgICAgICAgICBwcmltaXRpdmUuYXR0cmlidXRlc1thdHRyaWJOYW1lXSA9IGF0dHJpYkRhdGFGcm9tQWNjZXNzb3IoYWNjZXNzb3JzW2F0dHJpYnV0ZV0pO1xyXG4gICAgICAgICAgICAgICAgLy9pZihhdHRyaWJOYW1lID09PSAnSk9JTlRTXzAnKSBfcHJpbWl0aXZlLmF0dHJpYnV0ZXNbYXR0cmliTmFtZV0uZGF0YSA9IG5ldyBVaW50MzJBcnJheShfcHJpbWl0aXZlLmF0dHJpYnV0ZXNbYXR0cmliTmFtZV0uZGF0YSlcclxuICAgICAgICAgICAgICAgIHByaW1pdGl2ZS5hdHRyaWJ1dGVzW2F0dHJpYk5hbWVdLmxvY2F0aW9uID0gTE9DQVRJT05TW2F0dHJpYk5hbWVdO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHByaW1pdGl2ZTtcclxuICAgICAgICB9KSxcclxuICAgICAgICBuYW1lOiBtZXNoLm5hbWUsXHJcbiAgICB9KSk7XHJcbiAgICByZXR1cm4gX21lc2hlcy5tYXAoKG1lc2gpID0+IHtcclxuICAgICAgICBjb25zdCBwcmltaXRpdmVzID0gbWVzaC5wcmltaXRpdmVzLm1hcCgocHJpbWl0aXZlKSA9PiBuZXcgUHJpbWl0aXZlUmVuZGVyZXIocHJpbWl0aXZlKSk7XHJcbiAgICAgICAgY29uc3QgbmFtZSA9IG1lc2gubmFtZTtcclxuICAgICAgICByZXR1cm4gbmV3IE1lc2hSZW5kZXJlcih7IHByaW1pdGl2ZXMsIG5hbWUgfSk7XHJcbiAgICB9KTtcclxufTtcclxuY29uc3QgUHJpbWl0aXZlUmVuZGVySW5mb0Zyb21BcnJheURhdGEgPSAobWVzaGVzKSA9PiBtZXNoZXMubWFwKChtZXNoKSA9PiB7XHJcbiAgICBjb25zdCBwcmltaXRpdmVzID0gbWVzaC5wcmltaXRpdmVzLm1hcCgocHJpbWl0aXZlKSA9PiBuZXcgUHJpbWl0aXZlUmVuZGVyZXIocHJpbWl0aXZlKSk7XHJcbiAgICBjb25zdCBuYW1lID0gbWVzaC5uYW1lO1xyXG4gICAgcmV0dXJuIG5ldyBNZXNoUmVuZGVyZXIoeyBuYW1lLCBwcmltaXRpdmVzIH0pO1xyXG59KTtcclxuY29uc3QgRW50aXR5RGF0YUZyb21HbHRmID0gKGdsdGYsIGJ1ZmZlcnMpID0+IFByaW1pdGl2ZVJlbmRlckluZm9Gcm9tQXJyYXlEYXRhKEFycmF5RGF0YUZyb21HbHRmKGdsdGYsIGJ1ZmZlcnMpKTtcclxuY2xhc3MgR0xURiB7XHJcbiAgICBjb25zdHJ1Y3RvcihnbHRmLCBiaW5hcnlCdWZmZXJzKSB7XHJcbiAgICAgICAgY29uc3QgeyBub2RlcyB9ID0gZ2x0ZjtcclxuICAgICAgICB0aGlzLm5vZGVzID0gbm9kZXM7XHJcbiAgICAgICAgdGhpcy5tZXNoZXMgPSBBcnJheURhdGFGcm9tR2x0ZihnbHRmLCBiaW5hcnlCdWZmZXJzKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgeyBBcnJheURhdGFGcm9tR2x0ZiwgUHJpbWl0aXZlUmVuZGVySW5mb0Zyb21BcnJheURhdGEsIEVudGl0eURhdGFGcm9tR2x0ZiwgR0xURiwgfTtcclxuIiwiaW1wb3J0IGdldEF0dHJpYnV0ZVByb3BzQnlUeXBlIGZyb20gXCIuL2F0dHJpYlR5cGVQcm9wc1wiO1xyXG5pbXBvcnQgYXR0cmliVHlwZVByb3BzIGZyb20gXCIuL2F0dHJpYlR5cGVQcm9wc1wiO1xyXG5pbXBvcnQgeyBCdWZmZXJBdHRyaWJ1dGUgfSBmcm9tIFwiLi9CdWZmZXJBdHRyaWJ1dGVcIjtcclxuY2xhc3MgTWVzaFJlbmRlcmVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHsgcHJpbWl0aXZlcywgbmFtZSB9KSB7XHJcbiAgICAgICAgdGhpcy5wcmltaXRpdmVzID0gcHJpbWl0aXZlcztcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuY29udGV4dCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5idWZmZXJzID0ge307XHJcbiAgICB9XHJcbiAgICBkcmF3KHVuaWZvcm1zLCBjYW1lcmFNYXRyaXgpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbiA9IHRoaXMucHJpbWl0aXZlcy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5wcmltaXRpdmVzW2ldLmRyYXcodW5pZm9ybXMsIGNhbWVyYU1hdHJpeCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgZHJhd0luc3RhbmNlZCh1bmlmb3JtcywgY2FtZXJhTWF0cml4LCBudW1JbnN0YW5jZXMpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbiA9IHRoaXMucHJpbWl0aXZlcy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5wcmltaXRpdmVzW2ldLmRyYXdJbnN0YW5jZWQodW5pZm9ybXMsIGNhbWVyYU1hdHJpeCwgbnVtSW5zdGFuY2VzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgU2tpbm5lZE1lc2hSZW5kZXJlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihwcmltaXRpdmVzLCBza2luKSB7XHJcbiAgICAgICAgdGhpcy5wcmltaXRpdmVzID0gcHJpbWl0aXZlcztcclxuICAgICAgICB0aGlzLnNraW4gPSBza2luO1xyXG4gICAgfVxyXG4gICAgZHJhdyh1bmlmb3JtcywgY2FtZXJhTWF0cml4KSB7XHJcbiAgICAgICAgdGhpcy5za2luLnVwZGF0ZSh1bmlmb3Jtcy51X21hdHJpeCk7XHJcbiAgICAgICAgY29uc3QgX3VuaWZvcm1zID0gT2JqZWN0LmFzc2lnbih7IHVfam9pbnRUZXh0dXJlOiB0aGlzLnNraW4uam9pbnRUZXh0dXJlLCB1X251bUpvaW50czogdGhpcy5za2luLmpvaW50cy5sZW5ndGggfSwgdW5pZm9ybXMpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gdGhpcy5wcmltaXRpdmVzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnByaW1pdGl2ZXNbaV0uZHJhdyhfdW5pZm9ybXMsIGNhbWVyYU1hdHJpeCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7IE1lc2hSZW5kZXJlciwgU2tpbm5lZE1lc2hSZW5kZXJlciB9O1xyXG4iLCJjbGFzcyBUUlMge1xyXG4gICAgY29uc3RydWN0b3IodHJhbnNsYXRpb24sIHJvdGF0aW9uLCBzY2FsZSkge1xyXG4gICAgICAgIHRoaXMudHJhbnNsYXRpb24gPSB0cmFuc2xhdGlvbjtcclxuICAgICAgICB0aGlzLnJvdGF0aW9uID0gcm90YXRpb247XHJcbiAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xyXG4gICAgfVxyXG4gICAgZ2V0TWF0cml4KG0pIHtcclxuICAgICAgICBsZXQgZHN0ID0gbSB8fCBtNC5pZGVudGl0eSgpO1xyXG4gICAgICAgIHZhciB0ID0gdGhpcy50cmFuc2xhdGlvbjtcclxuICAgICAgICB2YXIgciA9IHRoaXMucm90YXRpb247XHJcbiAgICAgICAgdmFyIHMgPSB0aGlzLnNjYWxlO1xyXG4gICAgICAgIGNvbnN0IHNpbiA9IE1hdGguc2luKHJbM10gLyAyKTtcclxuICAgICAgICBjb25zdCBjb3MgPSBNYXRoLmNvcyhyWzNdIC8gMik7XHJcbiAgICAgICAgZHN0ID0gbTQudHJhbnNsYXRlKGRzdCwgdFswXSwgdFsxXSwgdFsyXSk7XHJcbiAgICAgICAgZHN0ID0gbTQubXVsdGlwbHkoZHN0LCBtNC5mcm9tUXVhdGVybmlvbihyKSk7XHJcbiAgICAgICAgZHN0ID0gbTQuc2NhbGUoZHN0LCBzWzBdLCBzWzFdLCBzWzJdKTtcclxuICAgICAgICByZXR1cm4gZHN0O1xyXG4gICAgfVxyXG4gICAgZ2V0Uk1hdHJpeCgpIHtcclxuICAgICAgICBsZXQgZHN0ID0gbTQuaWRlbnRpdHkoKTtcclxuICAgICAgICB2YXIgciA9IHRoaXMucm90YXRpb247XHJcbiAgICAgICAgZHN0ID0gbTQueFJvdGF0ZShkc3QsIHJbMF0pO1xyXG4gICAgICAgIGRzdCA9IG00LnlSb3RhdGUoZHN0LCByWzFdKTtcclxuICAgICAgICBkc3QgPSBtNC56Um90YXRlKGRzdCwgclsyXSk7XHJcbiAgICAgICAgcmV0dXJuIGRzdDtcclxuICAgIH1cclxuICAgIGdldFRSbWF0cml4KCkge1xyXG4gICAgICAgIGNvbnN0IHQgPSB0aGlzLnRyYW5zbGF0aW9uO1xyXG4gICAgICAgIGNvbnN0IHIgPSB0aGlzLnJvdGF0aW9uO1xyXG4gICAgICAgIGxldCBtID0gbTQudHJhbnNsYXRpb24odFswXSwgdFsxXSwgdFsyXSk7XHJcbiAgICAgICAgbSA9IG00LnhSb3RhdGUobSwgclswXSk7XHJcbiAgICAgICAgbSA9IG00LnlSb3RhdGUobSwgclsxXSk7XHJcbiAgICAgICAgbSA9IG00LnpSb3RhdGUobSwgclsyXSk7XHJcbiAgICAgICAgcmV0dXJuIG07XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgTm9kZSB7XHJcbiAgICBzdGF0aWMgbWFrZU1vZGVsKGVudGl0eURlc2NyaXB0aW9uLCByb290Tm9kZU5keCkge1xyXG4gICAgICAgIGNvbnN0IHsgbm9kZXMsIG1lc2hlcyB9ID0gZW50aXR5RGVzY3JpcHRpb247XHJcbiAgICAgICAgY29uc3Qgcm9vdE5vZGUgPSBub2Rlc1tyb290Tm9kZU5keF07XHJcbiAgICAgICAgY29uc3QgbWFrZU5vZGUgPSAobm9kZURlc2NyaXB0aW9uLCBuZHgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdHJzID0gbmV3IFRSUyhub2RlRGVzY3JpcHRpb24udHJhbnNsYXRpb24gfHwgWzAsIDAsIDBdLCBub2RlRGVzY3JpcHRpb24ucm90YXRpb24gfHwgWzAsIDAsIDBdLCBub2RlRGVzY3JpcHRpb24uc2NhbGUgfHwgWzEsIDEsIDFdKTtcclxuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IG5ldyBOb2RlKG5vZGVEZXNjcmlwdGlvbi5uYW1lLCB0cnMsIG5keCk7XHJcbiAgICAgICAgICAgIGlmIChub2RlRGVzY3JpcHRpb24ubWVzaCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUucmVuZGVyZXIgPSBtZXNoZXNbbm9kZURlc2NyaXB0aW9uLm1lc2hdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChub2RlRGVzY3JpcHRpb24uY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgIG5vZGVEZXNjcmlwdGlvbi5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZE5keCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gbWFrZU5vZGUobm9kZXNbY2hpbGROZHhdLCBjaGlsZE5keCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuc2V0UGFyZW50KG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gbWFrZU5vZGUocm9vdE5vZGUsIHJvb3ROb2RlTmR4KTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIHRycyA9IG5ldyBUUlMoKSkge1xyXG4gICAgICAgIHRoaXMud29ybGRNYXRyaXggPSBtNC5pZGVudGl0eSgpO1xyXG4gICAgICAgIHRoaXMucGFyZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuID0gW107XHJcbiAgICAgICAgdGhpcy50cnMgPSB0cnM7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLnBhcnRzID0gW107XHJcbiAgICAgICAgdGhpcy5uZHggPSBuZHg7XHJcbiAgICAgICAgdGhpcy5za2luTmR4ID0gbnVsbDtcclxuICAgICAgICB0aGlzLm9iamVjdHNUb0RyYXcgPSBbXTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyID0gbnVsbDtcclxuICAgIH1cclxuICAgIHNldFBhcmVudChwYXJlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5wYXJlbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgbmR4ID0gdGhpcy5wYXJlbnQuY2hpbGRyZW4uaW5kZXhPZih0aGlzKTtcclxuICAgICAgICAgICAgaWYgKG5keCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5jaGlsZHJlbi5zcGxpY2UobmR4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGFyZW50KSB7XHJcbiAgICAgICAgICAgIHBhcmVudC5jaGlsZHJlbi5wdXNoKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcclxuICAgIH1cclxuICAgIHVwZGF0ZVdvcmxkTWF0cml4KHBhcmVudFdvcmxkTWF0cml4KSB7XHJcbiAgICAgICAgbGV0IG1hdHJpeCA9IHRoaXMudHJzLmdldE1hdHJpeCgpO1xyXG4gICAgICAgIGlmIChwYXJlbnRXb3JsZE1hdHJpeCkge1xyXG4gICAgICAgICAgICBtYXRyaXggPSBtNC5tdWx0aXBseShwYXJlbnRXb3JsZE1hdHJpeCwgbWF0cml4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy53b3JsZE1hdHJpeCA9IG1hdHJpeDtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XHJcbiAgICAgICAgICAgIGNoaWxkLnVwZGF0ZVdvcmxkTWF0cml4KG1hdHJpeCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVQYXJ0c0xpc3QoKSB7XHJcbiAgICAgICAgY29uc3QgaXRlciA9IChub2RlLCBhcnIpID0+IHtcclxuICAgICAgICAgICAgYXJyLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IGl0ZXIoY2hpbGQsIGFycikpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaXRlcih0aGlzLCB0aGlzLnBhcnRzKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZU9iamVjdHNUb0RyYXcoKSB7XHJcbiAgICAgICAgY29uc3QgcXVldWUgPSBbdGhpc107XHJcbiAgICAgICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHF1ZXVlLnBvcCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhub2RlKTtcclxuICAgICAgICAgICAgaWYgKG5vZGUucmVuZGVyZXIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9iamVjdHNUb0RyYXcucHVzaChub2RlKTtcclxuICAgICAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW4pXHJcbiAgICAgICAgICAgICAgICBxdWV1ZS5wdXNoKC4uLm5vZGUuY2hpbGRyZW4pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHRyYXZlcnNlKGZuKSB7XHJcbiAgICAgICAgZm4odGhpcyk7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4gY2hpbGQudHJhdmVyc2UoZm4pKTtcclxuICAgIH1cclxuICAgIGZpbmQobmR4KSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgY29uc3QgaXRlciA9IChub2RlcykgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBub2RlIG9mIG5vZGVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5uZHggPT09IG5keClcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBub2RlO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZXIobm9kZS5jaGlsZHJlbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGl0ZXIoW3RoaXNdKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgZmluZEJ5TmFtZShuYW1lKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgY29uc3QgaXRlciA9IChub2RlcykgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBub2RlIG9mIG5vZGVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5uYW1lID09PSBuYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IG5vZGU7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlcihub2RlLmNoaWxkcmVuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaXRlcihbdGhpc10pO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICByZW5kZXIodW5pZm9ybXMsIGNhbWVyYU1hdHJpeCkge1xyXG4gICAgICAgIHRoaXMub2JqZWN0c1RvRHJhdy5mb3JFYWNoKChvYmplY3QpID0+IHtcclxuICAgICAgICAgICAgb2JqZWN0LnJlbmRlcmVyLmRyYXcoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB1bmlmb3JtcyksIHsgdV9tYXRyaXg6IG9iamVjdC53b3JsZE1hdHJpeCB9KSwgY2FtZXJhTWF0cml4KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5jbGFzcyBNb2RlbCBleHRlbmRzIE5vZGUge1xyXG4gICAgc3RhdGljIG1ha2VNb2RlbChlbnRpdHlEZXNjcmlwdGlvbiwgcm9vdE5vZGVOZHgpIHtcclxuICAgICAgICBjb25zdCB7IG5vZGVzLCBtZXNoZXMgfSA9IGVudGl0eURlc2NyaXB0aW9uO1xyXG4gICAgICAgIGNvbnN0IHJvb3ROb2RlID0gbm9kZXNbcm9vdE5vZGVOZHhdO1xyXG4gICAgICAgIGNvbnN0IG1ha2VOb2RlID0gKG5vZGVEZXNjcmlwdGlvbiwgbmR4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRycyA9IG5ldyBUUlMobm9kZURlc2NyaXB0aW9uLnRyYW5zbGF0aW9uIHx8IFswLCAwLCAwXSwgbm9kZURlc2NyaXB0aW9uLnJvdGF0aW9uIHx8IFswLCAwLCAwLCAwXSwgbm9kZURlc2NyaXB0aW9uLnNjYWxlIHx8IFsxLCAxLCAxXSk7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBuZXcgRW50aXR5KG5vZGVEZXNjcmlwdGlvbi5uYW1lLCB0cnMsIG5keCk7XHJcbiAgICAgICAgICAgIGlmIChub2RlRGVzY3JpcHRpb24ubWVzaCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUucmVuZGVyZXIgPSBtZXNoZXNbbm9kZURlc2NyaXB0aW9uLm1lc2hdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChub2RlRGVzY3JpcHRpb24uY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgIG5vZGVEZXNjcmlwdGlvbi5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZE5keCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gbWFrZU5vZGUobm9kZXNbY2hpbGROZHhdLCBjaGlsZE5keCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuc2V0UGFyZW50KG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gbWFrZU5vZGUocm9vdE5vZGUsIHJvb3ROb2RlTmR4KTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIHRycywgbmR4KSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSwgdHJzKTtcclxuICAgICAgICB0aGlzLm5keCA9IG5keDtcclxuICAgICAgICB0aGlzLnBoeXNpY3MgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc2tpbk5keCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzVG9EcmF3ID0gW107XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG51bGw7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVPYmplY3RzVG9EcmF3KCkge1xyXG4gICAgICAgIGNvbnN0IHF1ZXVlID0gW3RoaXNdO1xyXG4gICAgICAgIHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBxdWV1ZS5wb3AoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobm9kZSk7XHJcbiAgICAgICAgICAgIGlmIChub2RlLnJlbmRlcmVyKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vYmplY3RzVG9EcmF3LnB1c2gobm9kZSk7XHJcbiAgICAgICAgICAgIGlmIChub2RlLmNoaWxkcmVuKVxyXG4gICAgICAgICAgICAgICAgcXVldWUucHVzaCguLi5ub2RlLmNoaWxkcmVuKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB0cmF2ZXJzZShmbikge1xyXG4gICAgICAgIGZuKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IGNoaWxkLnRyYXZlcnNlKGZuKSk7XHJcbiAgICB9XHJcbiAgICBmaW5kKG5keCkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xyXG4gICAgICAgIGNvbnN0IGl0ZXIgPSAobm9kZXMpID0+IHtcclxuICAgICAgICAgICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubmR4ID09PSBuZHgpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gbm9kZTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBpdGVyKG5vZGUuY2hpbGRyZW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpdGVyKFt0aGlzXSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIGZpbmRCeU5hbWUobmFtZSkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xyXG4gICAgICAgIGNvbnN0IGl0ZXIgPSAobm9kZXMpID0+IHtcclxuICAgICAgICAgICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubmFtZSA9PT0gbmFtZSlcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBub2RlO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZXIobm9kZS5jaGlsZHJlbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGl0ZXIoW3RoaXNdKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKHVuaWZvcm1zLCBjYW1lcmFNYXRyaXgpIHtcclxuICAgICAgICB0aGlzLm9iamVjdHNUb0RyYXcuZm9yRWFjaCgob2JqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIG9iamVjdC5yZW5kZXJlci5kcmF3KE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdW5pZm9ybXMpLCB7IHVfbWF0cml4OiBvYmplY3Qud29ybGRNYXRyaXggfSksIGNhbWVyYU1hdHJpeCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgTW9kZWw7XHJcbiIsImltcG9ydCB7IEJ1ZmZlckF0dHJpYnV0ZUluZm8gfSBmcm9tIFwiLi9CdWZmZXJBdHRyaWJ1dGVcIjtcclxuY2xhc3MgUHJpbWl0aXZlUmVuZGVyZXIge1xyXG4gICAgY29uc3RydWN0b3IoZ2wpIHtcclxuICAgICAgICB0aGlzLmJ1ZmZlckF0dHJpYnMgPSB7fTtcclxuICAgICAgICB0aGlzLnByb2dyYW1JbmZvID0gbnVsbDtcclxuICAgICAgICB0aGlzLmdsID0gZ2w7XHJcbiAgICAgICAgdGhpcy5kcmF3ZXIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubW9kZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5vZmZzZXQgPSAwO1xyXG4gICAgICAgIHRoaXMubnVtRWxlbWVudHMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuVkFPID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudFR5cGUgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgc2V0Q29udGV4dChnbCkge1xyXG4gICAgICAgIHRoaXMuZ2wgPSBnbDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGNyZWF0ZVZBTygpIHtcclxuICAgICAgICBpZiAodGhpcy5WQU8pXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIHRoaXMuVkFPID0gdGhpcy5nbC5jcmVhdGVWZXJ0ZXhBcnJheSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2V0TW9kZShtb2RlKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlID0gbW9kZTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNldE51bUVsZW1lbnRzKG51bUVsZW1lbnRzKSB7XHJcbiAgICAgICAgdGhpcy5udW1FbGVtZW50cyA9IG51bUVsZW1lbnRzO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2V0T2Zmc2V0KG9mZnNldCkge1xyXG4gICAgICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2V0SW5kaWNlcyhhcnJheUJ1ZmZlcikge1xyXG4gICAgICAgIGNvbnN0IHsgZ2wsIFZBTyB9ID0gdGhpcztcclxuICAgICAgICBnbC5iaW5kVmVydGV4QXJyYXkoVkFPKTtcclxuICAgICAgICB0aGlzLm51bUVsZW1lbnRzID0gYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCAvIDI7XHJcbiAgICAgICAgY29uc3QgaW5kaWNlc0J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xyXG4gICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGluZGljZXNCdWZmZXIpO1xyXG4gICAgICAgIGdsLmJ1ZmZlckRhdGEoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGFycmF5QnVmZmVyLCBnbC5TVEFUSUNfRFJBVyk7XHJcbiAgICAgICAgZ2wuYmluZFZlcnRleEFycmF5KG51bGwpO1xyXG4gICAgICAgIHRoaXMuaW5kaWNlcyA9IGluZGljZXNCdWZmZXI7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBjcmVhdGVHZW9tZXRyeUJ1ZmZlcnMoYXJyYXlEYXRhKSB7XHJcbiAgICAgICAgY29uc3QgeyBnbCB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCB7IGF0dHJpYnV0ZXMsIGluZGljZXMsIGNvbXBvbmVudFR5cGUsIG51bUVsZW1lbnRzLCBtb2RlLCBvZmZzZXQgfSA9IGFycmF5RGF0YTtcclxuICAgICAgICB0aGlzLm51bUVsZW1lbnRzID0gbnVtRWxlbWVudHM7XHJcbiAgICAgICAgdGhpcy5tb2RlID0gbW9kZTtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudFR5cGUgPSBjb21wb25lbnRUeXBlIHx8IDUxMjM7XHJcbiAgICAgICAgdGhpcy5vZmZzZXQgPSAwO1xyXG4gICAgICAgIGlmIChhdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goKGF0dHJpYnV0ZU5hbWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGF0dHJpYlByb3BzID0gYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJ1ZmZlckF0dHJpYnV0ZUluZm8gPSBuZXcgQnVmZmVyQXR0cmlidXRlSW5mbyhnbCwgYXR0cmliUHJvcHMpO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyQXR0cmlidXRlSW5mby5idWZmZXJEYXRhKGF0dHJpYlByb3BzLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idWZmZXJBdHRyaWJzW2F0dHJpYnV0ZU5hbWVdID0gYnVmZmVyQXR0cmlidXRlSW5mbztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbmRpY2VzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGljZXNCdWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcclxuICAgICAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgaW5kaWNlc0J1ZmZlcik7XHJcbiAgICAgICAgICAgIGdsLmJ1ZmZlckRhdGEoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGluZGljZXMsIGdsLlNUQVRJQ19EUkFXKTtcclxuICAgICAgICAgICAgdGhpcy5pbmRpY2VzID0gaW5kaWNlc0J1ZmZlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBzZXRBdHRyaWJ1dGVzKCkge1xyXG4gICAgICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXM7XHJcbiAgICAgICAgZ2wuYmluZFZlcnRleEFycmF5KHRoaXMuVkFPKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGF0dHJpYiBpbiB0aGlzLmJ1ZmZlckF0dHJpYnMpIHtcclxuICAgICAgICAgICAgY29uc3QgYnVmZmVyQXR0cmlidXRlSW5mbyA9IHRoaXMuYnVmZmVyQXR0cmlic1thdHRyaWJdO1xyXG4gICAgICAgICAgICBidWZmZXJBdHRyaWJ1dGVJbmZvLnNldEF0dHJpYnV0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLmluZGljZXMpO1xyXG4gICAgICAgIGdsLmJpbmRWZXJ0ZXhBcnJheShudWxsKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNldERyYXdlcihkcmF3ZXIpIHtcclxuICAgICAgICB0aGlzLmRyYXdlciA9IGRyYXdlcjtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNldFByb2dyYW1JbmZvKHByb2dyYW1JbmZvKSB7XHJcbiAgICAgICAgdGhpcy5wcm9ncmFtSW5mbyA9IHByb2dyYW1JbmZvO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlQnVmZmVyQXR0cmliRGF0YSh7IGF0dHJpYk5hbWUsIGxvY2F0aW9uLCBzdHJpZGUsIG51bUNvbXBvbmVudHMsIG9mZnNldCwgdHlwZSwgZGl2aXNvciwgYXR0cmlidXRlVHlwZSwgfSkge1xyXG4gICAgICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgYnVmZmVyQXR0cmliSW5mbyA9IG5ldyBCdWZmZXJBdHRyaWJ1dGVJbmZvKGdsLCB7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLFxyXG4gICAgICAgICAgICBzdHJpZGUsXHJcbiAgICAgICAgICAgIG51bUNvbXBvbmVudHMsXHJcbiAgICAgICAgICAgIG9mZnNldCxcclxuICAgICAgICAgICAgdHlwZSxcclxuICAgICAgICAgICAgZGl2aXNvcixcclxuICAgICAgICAgICAgYXR0cmlidXRlVHlwZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmJ1ZmZlckF0dHJpYnNbYXR0cmliTmFtZV0gPSBidWZmZXJBdHRyaWJJbmZvO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgLypcclxuICAgIHNldEJ1ZmZlckF0dHJpYkRhdGEobmFtZSwgYnVmZmVyQXR0cmliRGF0YSkge1xyXG4gICAgICB0aGlzLmJ1ZmZlcnMgPSB7IC4uLnRoaXMuYnVmZmVycywgW25hbWVdOiBidWZmZXJBdHRyaWJEYXRhIH07XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgKi9cclxuICAgIHNldEF0dHJpYnV0ZShhdHRyaWJOYW1lKSB7XHJcbiAgICAgICAgY29uc3QgeyBnbCB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCBidWZmZXJBdHRyaWJEYXRhID0gdGhpcy5idWZmZXJBdHRyaWJzW2F0dHJpYk5hbWVdO1xyXG4gICAgICAgIGdsLmJpbmRWZXJ0ZXhBcnJheSh0aGlzLlZBTyk7XHJcbiAgICAgICAgYnVmZmVyQXR0cmliRGF0YS5zZXRBdHRyaWJ1dGUoKTtcclxuICAgICAgICBnbC5iaW5kVmVydGV4QXJyYXkobnVsbCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgX3NldEF0dHJpYnV0ZShidWZmZXJBdHRyaWJEYXRhKSB7XHJcbiAgICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXM7XHJcbiAgICAgIGdsLmJpbmRWZXJ0ZXhBcnJheSh0aGlzLnZhbyk7XHJcbiAgICAgIGJ1ZmZlckF0dHJpYkRhdGEuc2V0QXR0cmlidXRlKCk7XHJcbiAgICAgIGdsLmJpbmRWZXJ0ZXhBcnJheShudWxsKTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAqL1xyXG4gICAgYnVmZmVyRGF0YShhdHRyaWJOYW1lLCBkYXRhLCB1c2FnZSkge1xyXG4gICAgICAgIGNvbnN0IGJ1ZmZlckF0dHJpYkluZm8gPSB0aGlzLmJ1ZmZlckF0dHJpYnNbYXR0cmliTmFtZV07XHJcbiAgICAgICAgYnVmZmVyQXR0cmliSW5mby5idWZmZXJEYXRhKGRhdGEsIHVzYWdlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGJ1ZmZlclN1YkRhdGEoYXR0cmliTmFtZSwgZGF0YSwgb2Zmc2V0KSB7XHJcbiAgICAgICAgY29uc3QgYnVmZmVyQXR0cmliSW5mbyA9IHRoaXMuYnVmZmVyQXR0cmlic1thdHRyaWJOYW1lXTtcclxuICAgICAgICBidWZmZXJBdHRyaWJJbmZvLmJ1ZmZlclN1YkRhdGEoZGF0YSwgb2Zmc2V0KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGFsbG9jQnVmZmVyKGF0dHJpYk5hbWUsIGJ5dGVMZW5ndGgsIHVzYWdlKSB7XHJcbiAgICAgICAgY29uc3QgYnVmZmVyQXR0cmliSW5mbyA9IHRoaXMuYnVmZmVyQXR0cmlic1thdHRyaWJOYW1lXTtcclxuICAgICAgICBidWZmZXJBdHRyaWJJbmZvLmFsbG9jQnVmZmVyKGJ5dGVMZW5ndGgsIHVzYWdlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGRyYXcodW5pZm9ybXMsIGNhbWVyYU1hdHJpeCkge1xyXG4gICAgICAgIHRoaXMuZHJhd2VyLmRyYXcodGhpcywgdW5pZm9ybXMsIGNhbWVyYU1hdHJpeCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBkcmF3SW5zdGFuY2VkKHVuaWZvcm1zLCBjYW1lcmFNYXRyaXgsIG51bUluc3RhbmNlcykge1xyXG4gICAgICAgIHRoaXMuZHJhd2VyLmRyYXdJbnN0YW5jZWQodGhpcywgdW5pZm9ybXMsIGNhbWVyYU1hdHJpeCwgbnVtSW5zdGFuY2VzKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBQcmltaXRpdmVSZW5kZXJlcjtcclxuIiwiaW1wb3J0IHsgdjMgfSBmcm9tICdyb21hbnBwcG1hdGgnO1xyXG5pbXBvcnQgeyBGTE9BVF9WRUMyLCBGTE9BVF9WRUMzIH0gZnJvbSBcIi4vZW51bXNcIjtcclxuY29uc3QgeyBjcm9zcywgZGlmZiwgbm9ybWFsaXplIH0gPSB2MztcclxuY29uc3QgbGluZWRCb3hJbmRpY2VzID0gbmV3IFVpbnQxNkFycmF5KFtcclxuICAgIDAsXHJcbiAgICAxLFxyXG4gICAgMSxcclxuICAgIDIsXHJcbiAgICAyLFxyXG4gICAgMyxcclxuICAgIDMsXHJcbiAgICAwLFxyXG4gICAgMCxcclxuICAgIDUsXHJcbiAgICA1LFxyXG4gICAgNCxcclxuICAgIDQsXHJcbiAgICAxLFxyXG4gICAgMSxcclxuICAgIDAsXHJcbiAgICAwLFxyXG4gICAgNCxcclxuICAgIDQsXHJcbiAgICA3LFxyXG4gICAgNyxcclxuICAgIDMsXHJcbiAgICAzLFxyXG4gICAgMCxcclxuICAgIDEsXHJcbiAgICAyLFxyXG4gICAgMixcclxuICAgIDYsXHJcbiAgICA2LFxyXG4gICAgNSxcclxuICAgIDUsXHJcbiAgICAxLFxyXG4gICAgNCxcclxuICAgIDUsXHJcbiAgICA1LFxyXG4gICAgNixcclxuICAgIDYsXHJcbiAgICA3LFxyXG4gICAgNyxcclxuICAgIDQsXHJcbiAgICAyLFxyXG4gICAgNyxcclxuICAgIDcsXHJcbiAgICAzLFxyXG4gICAgMyxcclxuICAgIDYsXHJcbiAgICA2LFxyXG4gICAgMiwgLy8gdG9wXHJcbl0pO1xyXG5jb25zdCBDVUJFX0ZBQ0VfSU5ESUNFUyA9IFtcclxuICAgIFszLCA3LCA1LCAxXSxcclxuICAgIFs2LCAyLCAwLCA0XSxcclxuICAgIFs2LCA3LCAzLCAyXSxcclxuICAgIFswLCAxLCA1LCA0XSxcclxuICAgIFs3LCA2LCA0LCA1XSxcclxuICAgIFsyLCAzLCAxLCAwXSwgLy8gYmFja1xyXG5dO1xyXG5mdW5jdGlvbiBjcmVhdGVCb3goX2EgPSAxLCBfYiA9IDEsIF9jID0gMSkge1xyXG4gICAgY29uc3QgYSA9IF9hIC8gMiwgYiA9IF9iIC8gMiwgYyA9IF9jIC8gMjtcclxuICAgIGNvbnN0IGNvcm5lclZlcnRpY2VzID0gW1xyXG4gICAgICAgIFstYSwgLWIsIC1jXSxcclxuICAgICAgICBbK2EsIC1iLCAtY10sXHJcbiAgICAgICAgWy1hLCArYiwgLWNdLFxyXG4gICAgICAgIFsrYSwgK2IsIC1jXSxcclxuICAgICAgICBbLWEsIC1iLCArY10sXHJcbiAgICAgICAgWythLCAtYiwgK2NdLFxyXG4gICAgICAgIFstYSwgK2IsICtjXSxcclxuICAgICAgICBbK2EsICtiLCArY10sXHJcbiAgICBdO1xyXG4gICAgY29uc3QgZmFjZU5vcm1hbHMgPSBbXHJcbiAgICAgICAgWysxLCArMCwgKzBdLFxyXG4gICAgICAgIFstMSwgKzAsICswXSxcclxuICAgICAgICBbKzAsICsxLCArMF0sXHJcbiAgICAgICAgWyswLCAtMSwgKzBdLFxyXG4gICAgICAgIFsrMCwgKzAsICsxXSxcclxuICAgICAgICBbKzAsICswLCAtMV0sXHJcbiAgICBdO1xyXG4gICAgY29uc3QgdXZDb29yZHMgPSBbXHJcbiAgICAgICAgWzEsIDBdLFxyXG4gICAgICAgIFswLCAwXSxcclxuICAgICAgICBbMCwgMV0sXHJcbiAgICAgICAgWzEsIDFdLFxyXG4gICAgXTtcclxuICAgIGNvbnN0IHBvc2l0aW9ucyA9IFtdO1xyXG4gICAgY29uc3Qgbm9ybWFscyA9IFtdO1xyXG4gICAgLy9jb25zdCB0ZXhDb29yZHMgPSB3ZWJnbFV0aWxzLmNyZWF0ZUF1Z21lbnRlZFR5cGVkQXJyYXkoMiAsIG51bVZlcnRpY2VzKTtcclxuICAgIGNvbnN0IGluZGljZXMgPSBbXTtcclxuICAgIGZvciAobGV0IGYgPSAwOyBmIDwgNjsgKytmKSB7XHJcbiAgICAgICAgY29uc3QgZmFjZUluZGljZXMgPSBDVUJFX0ZBQ0VfSU5ESUNFU1tmXTtcclxuICAgICAgICBmb3IgKGxldCB2ID0gMDsgdiA8IDQ7ICsrdikge1xyXG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IGNvcm5lclZlcnRpY2VzW2ZhY2VJbmRpY2VzW3ZdXTtcclxuICAgICAgICAgICAgY29uc3Qgbm9ybWFsID0gZmFjZU5vcm1hbHNbZl07XHJcbiAgICAgICAgICAgIHBvc2l0aW9ucy5wdXNoKC4uLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgbm9ybWFscy5wdXNoKC4uLm5vcm1hbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG9mZnNldCA9IDQgKiBmO1xyXG4gICAgICAgIGluZGljZXMucHVzaChvZmZzZXQgKyAwLCBvZmZzZXQgKyAxLCBvZmZzZXQgKyAyKTtcclxuICAgICAgICBpbmRpY2VzLnB1c2gob2Zmc2V0ICsgMCwgb2Zmc2V0ICsgMiwgb2Zmc2V0ICsgMyk7XHJcbiAgICB9XHJcbiAgICBjb25zdCB0ZXhjb29yZCA9IG5ldyBGbG9hdDMyQXJyYXkoW1xyXG4gICAgICAgIC8vIEZyb250XHJcbiAgICAgICAgMC4wLCAwLjAsIDEuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAxLjAsXHJcbiAgICAgICAgLy8gQmFja1xyXG4gICAgICAgIDAuMCwgMC4wLCAxLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMS4wLFxyXG4gICAgICAgIC8vIFRvcFxyXG4gICAgICAgIDAuMCwgMC4wLCAxLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMS4wLFxyXG4gICAgICAgIC8vIEJvdHRvbVxyXG4gICAgICAgIDAuMCwgMC4wLCAxLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMS4wLFxyXG4gICAgICAgIC8vIFJpZ2h0XHJcbiAgICAgICAgMC4wLCAwLjAsIDEuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAxLjAsXHJcbiAgICAgICAgLy8gTGVmdFxyXG4gICAgICAgIDAuMCwgMC4wLCAxLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMS4wLFxyXG4gICAgXSk7XHJcbiAgICBjb25zdCBfbm9ybWFscyA9IG5ldyBGbG9hdDMyQXJyYXkobm9ybWFscyk7XHJcbiAgICBjb25zdCBfcG9zaXRpb25zID0gbmV3IEZsb2F0MzJBcnJheShwb3NpdGlvbnMpO1xyXG4gICAgY29uc3QgX2luZGljZXMgPSBuZXcgVWludDE2QXJyYXkoaW5kaWNlcyk7XHJcbiAgICBjb25zdCBfdGV4Y29vcmRzID0gbmV3IEZsb2F0MzJBcnJheSh0ZXhjb29yZCk7XHJcbiAgICBjb25zdCBBcnJheURhdGEgPSB7XHJcbiAgICAgICAgYXR0cmlidXRlczoge1xyXG4gICAgICAgICAgICBOT1JNQUw6IHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IF9ub3JtYWxzLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IDYgKiA0ICogMyxcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAxLFxyXG4gICAgICAgICAgICAgICAgYnl0ZUxlbmd0aDogX25vcm1hbHMuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgIHN0cmlkZTogMCxcclxuICAgICAgICAgICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICAgICAgICAgIG51bUNvbXBvbmVudHM6IDMsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiA1MTI2LFxyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlVHlwZTogRkxPQVRfVkVDM1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBQT1NJVElPTjoge1xyXG4gICAgICAgICAgICAgICAgZGF0YTogX3Bvc2l0aW9ucyxcclxuICAgICAgICAgICAgICAgIGNvdW50OiA2ICogNCAqIDMsXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogMCxcclxuICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGg6IF9wb3NpdGlvbnMuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgIHN0cmlkZTogMCxcclxuICAgICAgICAgICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICAgICAgICAgIG51bUNvbXBvbmVudHM6IDMsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiA1MTI2LFxyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlVHlwZTogRkxPQVRfVkVDM1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBURVhDT09SRF8wOiB7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiBfdGV4Y29vcmRzLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IDQ4LFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNTEyNixcclxuICAgICAgICAgICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICAgICAgICAgIHN0cmlkZTogMCxcclxuICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGg6IF90ZXhjb29yZHMuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiA0LFxyXG4gICAgICAgICAgICAgICAgbnVtQ29tcG9uZW50czogMixcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGU6IEZMT0FUX1ZFQzJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluZGljZXM6IF9pbmRpY2VzLFxyXG4gICAgICAgIG51bUVsZW1lbnRzOiBfaW5kaWNlcy5sZW5ndGgsXHJcbiAgICAgICAgY29tcG9uZW50VHlwZTogNTEyMyxcclxuICAgICAgICBtb2RlOiA0LFxyXG4gICAgfTtcclxuICAgIHJldHVybiBBcnJheURhdGE7XHJcbiAgICAvKnJldHVybiB7XHJcbiAgICAgICAgICAgIGdsdGYgOiB7XHJcbiAgICAgICAgICAgICAgYWNjZXNzb3JzIDogW1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgYnVmZmVyVmlldyA6IDAsXHJcbiAgICAgICAgICAgICAgICAgIGJ5dGVPZmZzZXQgOiAwLFxyXG4gICAgICAgICAgICAgICAgICBjb3VudCA6NzIsXHJcbiAgICAgICAgICAgICAgICAgIGNvbXBvbmVudFR5cGUgOiA1MTI2LFxyXG4gICAgICAgICAgICAgICAgICB0eXBlIDogJ1ZFQzMnXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBidWZmZXJWaWV3IDogMSxcclxuICAgICAgICAgICAgICAgIGJ5dGVPZmZzZXQgOiAwLFxyXG4gICAgICAgICAgICAgICAgY291bnQgOiA3MixcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudFR5cGUgOiA1MTI2LFxyXG4gICAgICAgICAgICAgICAgdHlwZSA6ICdWRUMzJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyVmlldyA6IDIsXHJcbiAgICAgICAgICAgICAgICBieXRlT2Zmc2V0IDogMCxcclxuICAgICAgICAgICAgICAgIGNvdW50IDogMzYsXHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnRUeXBlIDogNTEyMyxcclxuICAgICAgICAgICAgICAgIHR5cGUgOiAnU0NBTEFSJ1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyVmlldyA6IDMsXHJcbiAgICAgICAgICAgICAgICBieXRlT2Zmc2V0IDogMCxcclxuICAgICAgICAgICAgICAgIGNvdW50IDogNDgsXHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnRUeXBlIDogNTEyNixcclxuICAgICAgICAgICAgICAgIHR5cGUgOiAnVkVDMidcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgYnVmZmVyVmlld3MgOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIGJ1ZmZlciA6IDAsXHJcbiAgICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGggOiBwb3NpdGlvbnMuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgICAgYnl0ZU9mZnNldCA6IDBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIGJ1ZmZlciA6IDEsXHJcbiAgICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGggOiBub3JtYWxzLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgIGJ5dGVPZmZzZXQgOiAwXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICBidWZmZXIgOiAyLFxyXG4gICAgICAgICAgICAgICAgICBieXRlTGVuZ3RoIDogaW5kaWNlcy5ieXRlTGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgICBieXRlT2Zmc2V0IDogMFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgYnVmZmVyIDogMyxcclxuICAgICAgICAgICAgICAgICAgYnl0ZUxlbmd0aCA6IHRleGNvb3JkLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgIGJ5dGVPZmZzZXQgOiAwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgbWVzaGVzIDogW1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWUgOiAnQ3ViZScsXHJcbiAgICAgICAgICAgICAgICBwcmltaXRpdmVzIDogW1xyXG4gICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlcyA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgIE5PUk1BTCA6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICBQT1NJVElPTiA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICBURVhDT09SRF8wIDogM1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kaWNlcyA6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZSA6IDRcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgbm9kZXMgOiBbXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZSA6IFwiQ3ViZVwiLFxyXG4gICAgICAgICAgICAgICAgbWVzaCA6IDAsXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbiA6IFsxXVxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZSA6ICdDdWJlMicsXHJcbiAgICAgICAgICAgICAgICBtZXNoIDogMCxcclxuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uIDogWzEsMSwxXVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGJpbmFyeUJ1ZmZlcnMgOiBbXHJcbiAgICAgICAgICAgIHBvc2l0aW9ucy5idWZmZXIsIG5vcm1hbHMuYnVmZmVyLCBpbmRpY2VzLmJ1ZmZlciwgdGV4Y29vcmQuYnVmZmVyXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfTsqL1xyXG59XHJcbmNvbnN0IGNyZWF0ZUNvbmUgPSAocmFkaXVzID0gMiwgaGVpZ2h0ID0gMiwgbnVtQ29ybmVycyA9IDQpID0+IHtcclxuICAgIGNvbnN0IHZlcnRpY2VzID0gWzAsIC1oZWlnaHQgLyAyLCAwXTtcclxuICAgIGNvbnN0IG5vcm1hbHMgPSBbXTtcclxuICAgIGNvbnN0IGluZGljZXMgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtQ29ybmVycyArIDE7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGFuZ2xlID0gKDIgKiBpICogTWF0aC5QSSkgLyBudW1Db3JuZXJzO1xyXG4gICAgICAgIGNvbnN0IHggPSBNYXRoLmNvcyhhbmdsZSkgKiByYWRpdXM7XHJcbiAgICAgICAgY29uc3QgeiA9IE1hdGguc2luKGFuZ2xlKSAqIHJhZGl1cztcclxuICAgICAgICBjb25zdCB5ID0gLWhlaWdodCAvIDI7XHJcbiAgICAgICAgdmVydGljZXMucHVzaCh4LCAtaGVpZ2h0IC8gMiwgeik7XHJcbiAgICAgICAgbm9ybWFscy5wdXNoKDAsIC0xLCAwKTtcclxuICAgIH1cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtQ29ybmVyczsgaSsrKSB7XHJcbiAgICAgICAgaW5kaWNlcy5wdXNoKDAsIGkgKyAxLCBpICsgMik7XHJcbiAgICB9XHJcbiAgICAvL3ZlcnRpY2VzLnB1c2godmVydGljZXNbMV0sIC1oZWlnaHQvMiwgdmVydGljZXNbM10pXHJcbiAgICBjb25zdCBuID0gdmVydGljZXMubGVuZ3RoIC8gMztcclxuICAgIGNvbnN0IHN0cmlkZSA9IDM7XHJcbiAgICBjb25zdCBzdGFydCA9IG47XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNvcm5lcnMgKyAyOyBpKyspIHtcclxuICAgICAgICBjb25zdCBhbmdsZSA9ICgyICogaSAqIE1hdGguUEkpIC8gbnVtQ29ybmVycztcclxuICAgICAgICBjb25zdCB4ID0gTWF0aC5jb3MoYW5nbGUpICogcmFkaXVzO1xyXG4gICAgICAgIGNvbnN0IHogPSBNYXRoLnNpbihhbmdsZSkgKiByYWRpdXM7XHJcbiAgICAgICAgY29uc3QgeSA9IC1oZWlnaHQgLyAyO1xyXG4gICAgICAgIGNvbnN0IGEgPSBbdmVydGljZXNbaSAqIDNdLCB2ZXJ0aWNlc1tpICogMyArIDFdLCB2ZXJ0aWNlc1tpICogMyArIDJdXTtcclxuICAgICAgICBjb25zdCBiID0gW3ZlcnRpY2VzW2kgKiAzICsgM10sIHZlcnRpY2VzW2kgKiAzICsgNF0sIHZlcnRpY2VzW2kgKiAzICsgNV1dO1xyXG4gICAgICAgIGNvbnN0IGMgPSBbMCwgaGVpZ2h0IC8gMiwgMF07XHJcbiAgICAgICAgaW5kaWNlcy5wdXNoKHN0YXJ0ICsgaSAqIHN0cmlkZSArIDIsIHN0YXJ0ICsgaSAqIHN0cmlkZSArIDEsIHN0YXJ0ICsgaSAqIHN0cmlkZSArIDMpO1xyXG4gICAgICAgIHZlcnRpY2VzLnB1c2goLi4uYywgLi4uYSwgLi4uYik7XHJcbiAgICAgICAgY29uc3Qgbm9ybWFsID0gbm9ybWFsaXplKGNyb3NzKGRpZmYoYiwgYyksIGRpZmYoYSwgYykpKTtcclxuICAgICAgICBub3JtYWxzLnB1c2goLi4ubm9ybWFsLCAuLi5ub3JtYWwsIC4uLm5vcm1hbCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBfbm9ybWFsID0gbmV3IEZsb2F0MzJBcnJheShub3JtYWxzKTtcclxuICAgIGNvbnN0IF9wb3NpdGlvbiA9IG5ldyBGbG9hdDMyQXJyYXkodmVydGljZXMpO1xyXG4gICAgY29uc3QgX2luZGljZXMgPSBuZXcgVWludDE2QXJyYXkoaW5kaWNlcyk7XHJcbiAgICBjb25zdCBBcnJheURhdGEgPSB7XHJcbiAgICAgICAgYXR0cmlidXRlczoge1xyXG4gICAgICAgICAgICBQT1NJVElPTjoge1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb246IDAsXHJcbiAgICAgICAgICAgICAgICBjb3VudDogdmVydGljZXMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAwLFxyXG4gICAgICAgICAgICAgICAgc3RyaWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgbnVtQ29tcG9uZW50czogMyxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDUxMjYsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBfcG9zaXRpb24sXHJcbiAgICAgICAgICAgICAgICBieXRlTGVuZ3RoOiBfcG9zaXRpb24uYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGU6IEZMT0FUX1ZFQzNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgTk9STUFMOiB7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogMSxcclxuICAgICAgICAgICAgICAgIGNvdW50OiBub3JtYWxzLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgIG51bUNvbXBvbmVudHM6IDMsXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IDAsXHJcbiAgICAgICAgICAgICAgICBzdHJpZGU6IDAsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiA1MTI2LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogX25vcm1hbCxcclxuICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGg6IF9ub3JtYWwuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGU6IEZMT0FUX1ZFQzNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBvbmVudFR5cGU6IDUxMjMsXHJcbiAgICAgICAgaW5kaWNlczogX2luZGljZXMsXHJcbiAgICAgICAgbnVtRWxlbWVudHM6IGluZGljZXMubGVuZ3RoLFxyXG4gICAgICAgIG1vZGU6IDQsXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEFycmF5RGF0YTtcclxufTtcclxuY29uc3QgY3JlYXRlQ2lyY2xlID0gKHJhZGl1cywgbnVtQ29ybmVycykgPT4ge1xyXG4gICAgY29uc3QgdmVydGljZXMgPSBbMCwgMCwgMF07XHJcbiAgICBjb25zdCBub3JtYWxzID0gW107XHJcbiAgICBjb25zdCBpbmRpY2VzID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNvcm5lcnMgKyAxOyBpKyspIHtcclxuICAgICAgICBjb25zdCBhbmdsZSA9ICgyICogaSAqIE1hdGguUEkpIC8gbnVtQ29ybmVycztcclxuICAgICAgICBjb25zdCB4ID0gTWF0aC5jb3MoYW5nbGUpICogcmFkaXVzO1xyXG4gICAgICAgIGNvbnN0IHogPSBNYXRoLnNpbihhbmdsZSkgKiByYWRpdXM7XHJcbiAgICAgICAgdmVydGljZXMucHVzaCh4LCAwLCB6KTtcclxuICAgICAgICBub3JtYWxzLnB1c2goMCwgMSwgMCk7XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNvcm5lcnM7IGkrKykge1xyXG4gICAgICAgIGluZGljZXMucHVzaCgwLCBpICsgMSwgaSArIDIpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgX25vcm1hbCA9IG5ldyBGbG9hdDMyQXJyYXkobm9ybWFscyk7XHJcbiAgICBjb25zdCBfcG9zaXRpb24gPSBuZXcgRmxvYXQzMkFycmF5KHZlcnRpY2VzKTtcclxuICAgIGNvbnN0IF9pbmRpY2VzID0gbmV3IFVpbnQxNkFycmF5KGluZGljZXMpO1xyXG4gICAgY29uc3QgQXJyYXlEYXRhID0ge1xyXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcclxuICAgICAgICAgICAgUE9TSVRJT046IHtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAwLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IHZlcnRpY2VzLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICAgICAgICAgIHN0cmlkZTogMCxcclxuICAgICAgICAgICAgICAgIG51bUNvbXBvbmVudHM6IDMsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiA1MTI2LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogX3Bvc2l0aW9uLFxyXG4gICAgICAgICAgICAgICAgYnl0ZUxlbmd0aDogX3Bvc2l0aW9uLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVUeXBlOiBGTE9BVF9WRUMzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIE5PUk1BTDoge1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb246IDEsXHJcbiAgICAgICAgICAgICAgICBjb3VudDogbm9ybWFscy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBudW1Db21wb25lbnRzOiAzLFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAwLFxyXG4gICAgICAgICAgICAgICAgc3RyaWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNTEyNixcclxuICAgICAgICAgICAgICAgIGRhdGE6IF9ub3JtYWwsXHJcbiAgICAgICAgICAgICAgICBieXRlTGVuZ3RoOiBfbm9ybWFsLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVUeXBlOiBGTE9BVF9WRUMzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wb25lbnRUeXBlOiA1MTIzLFxyXG4gICAgICAgIGluZGljZXM6IF9pbmRpY2VzLFxyXG4gICAgICAgIG51bUVsZW1lbnRzOiBpbmRpY2VzLmxlbmd0aCxcclxuICAgICAgICBtb2RlOiA0LFxyXG4gICAgfTtcclxuICAgIHJldHVybiBBcnJheURhdGE7XHJcbn07XHJcbmNvbnN0IGNyZWF0ZVNwaGVyZSA9IChyYWRpdXMsIHN1YmRpdmlzaW9uc0F4aXMsIHN1YmRpdmlzaW9uc0hlaWdodCwgb3B0X3N0YXJ0TGF0aXR1ZGVJblJhZGlhbnMsIG9wdF9lbmRMYXRpdHVkZUluUmFkaWFucywgb3B0X3N0YXJ0TG9uZ2l0dWRlSW5SYWRpYW5zLCBvcHRfZW5kTG9uZ2l0dWRlSW5SYWRpYW5zKSA9PiB7XHJcbiAgICBpZiAoc3ViZGl2aXNpb25zQXhpcyA8PSAwIHx8IHN1YmRpdmlzaW9uc0hlaWdodCA8PSAwKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic3ViZGl2aXNpb25BeGlzIGFuZCBzdWJkaXZpc2lvbkhlaWdodCBtdXN0IGJlID4gMFwiKTtcclxuICAgIH1cclxuICAgIG9wdF9zdGFydExhdGl0dWRlSW5SYWRpYW5zID0gb3B0X3N0YXJ0TGF0aXR1ZGVJblJhZGlhbnMgfHwgMDtcclxuICAgIG9wdF9lbmRMYXRpdHVkZUluUmFkaWFucyA9IG9wdF9lbmRMYXRpdHVkZUluUmFkaWFucyB8fCBNYXRoLlBJO1xyXG4gICAgb3B0X3N0YXJ0TG9uZ2l0dWRlSW5SYWRpYW5zID0gb3B0X3N0YXJ0TG9uZ2l0dWRlSW5SYWRpYW5zIHx8IDA7XHJcbiAgICBvcHRfZW5kTG9uZ2l0dWRlSW5SYWRpYW5zID0gb3B0X2VuZExvbmdpdHVkZUluUmFkaWFucyB8fCBNYXRoLlBJICogMjtcclxuICAgIGNvbnN0IGxhdFJhbmdlID0gb3B0X2VuZExhdGl0dWRlSW5SYWRpYW5zIC0gb3B0X3N0YXJ0TGF0aXR1ZGVJblJhZGlhbnM7XHJcbiAgICBjb25zdCBsb25nUmFuZ2UgPSBvcHRfZW5kTG9uZ2l0dWRlSW5SYWRpYW5zIC0gb3B0X3N0YXJ0TG9uZ2l0dWRlSW5SYWRpYW5zO1xyXG4gICAgY29uc3QgcG9zaXRpb25zID0gW107XHJcbiAgICBjb25zdCBub3JtYWxzID0gW107XHJcbiAgICBjb25zdCB0ZXhjb29yZHMgPSBbXTtcclxuICAgIGZvciAobGV0IHkgPSAwOyB5IDw9IHN1YmRpdmlzaW9uc0hlaWdodDsgeSsrKSB7XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPD0gc3ViZGl2aXNpb25zQXhpczsgeCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHUgPSB4IC8gc3ViZGl2aXNpb25zQXhpcztcclxuICAgICAgICAgICAgY29uc3QgdiA9IHkgLyBzdWJkaXZpc2lvbnNIZWlnaHQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoZXRhID0gbG9uZ1JhbmdlICogdSArIG9wdF9zdGFydExvbmdpdHVkZUluUmFkaWFucztcclxuICAgICAgICAgICAgY29uc3QgcGhpID0gbGF0UmFuZ2UgKiB2ICsgb3B0X3N0YXJ0TGF0aXR1ZGVJblJhZGlhbnM7XHJcbiAgICAgICAgICAgIGNvbnN0IHNpblRoZXRhID0gTWF0aC5zaW4odGhldGEpO1xyXG4gICAgICAgICAgICBjb25zdCBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKTtcclxuICAgICAgICAgICAgY29uc3Qgc2luUGhpID0gTWF0aC5zaW4ocGhpKTtcclxuICAgICAgICAgICAgY29uc3QgY29zUGhpID0gTWF0aC5jb3MocGhpKTtcclxuICAgICAgICAgICAgY29uc3QgdXggPSBjb3NUaGV0YSAqIHNpblBoaTtcclxuICAgICAgICAgICAgY29uc3QgdXkgPSBjb3NQaGk7XHJcbiAgICAgICAgICAgIGNvbnN0IHV6ID0gc2luVGhldGEgKiBzaW5QaGk7XHJcbiAgICAgICAgICAgIHBvc2l0aW9ucy5wdXNoKHJhZGl1cyAqIHV4LCByYWRpdXMgKiB1eSwgcmFkaXVzICogdXopO1xyXG4gICAgICAgICAgICBub3JtYWxzLnB1c2godXgsIHV5LCB1eik7XHJcbiAgICAgICAgICAgIHRleGNvb3Jkcy5wdXNoKDEgLSB1LCB2KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCBudW1WZXJ0c0Fyb3VuZCA9IHN1YmRpdmlzaW9uc0F4aXMgKyAxO1xyXG4gICAgY29uc3QgaW5kaWNlcyA9IFtdO1xyXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCBzdWJkaXZpc2lvbnNBeGlzOyB4KyspIHtcclxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHN1YmRpdmlzaW9uc0hlaWdodDsgeSsrKSB7XHJcbiAgICAgICAgICAgIGluZGljZXMucHVzaCgoeSArIDApICogbnVtVmVydHNBcm91bmQgKyB4LCAoeSArIDApICogbnVtVmVydHNBcm91bmQgKyB4ICsgMSwgKHkgKyAxKSAqIG51bVZlcnRzQXJvdW5kICsgeCk7XHJcbiAgICAgICAgICAgIGluZGljZXMucHVzaCgoeSArIDEpICogbnVtVmVydHNBcm91bmQgKyB4LCAoeSArIDApICogbnVtVmVydHNBcm91bmQgKyB4ICsgMSwgKHkgKyAxKSAqIG51bVZlcnRzQXJvdW5kICsgeCArIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IF9wb3NpdGlvbnMgPSBuZXcgRmxvYXQzMkFycmF5KHBvc2l0aW9ucyk7XHJcbiAgICBjb25zdCBfbm9ybWFscyA9IG5ldyBGbG9hdDMyQXJyYXkobm9ybWFscyk7XHJcbiAgICBjb25zdCBfdGV4Y29vcmRzID0gbmV3IEZsb2F0MzJBcnJheSh0ZXhjb29yZHMpO1xyXG4gICAgY29uc3QgX2luZGljZXMgPSBuZXcgVWludDE2QXJyYXkoaW5kaWNlcyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcclxuICAgICAgICAgICAgUE9TSVRJT046IHtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAwLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IHBvc2l0aW9ucy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IDAsXHJcbiAgICAgICAgICAgICAgICBzdHJpZGU6IDAsXHJcbiAgICAgICAgICAgICAgICBudW1Db21wb25lbnRzOiAzLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNTEyNixcclxuICAgICAgICAgICAgICAgIGRhdGE6IF9wb3NpdGlvbnMsXHJcbiAgICAgICAgICAgICAgICBieXRlTGVuZ3RoOiBfcG9zaXRpb25zLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVUeXBlOiBGTE9BVF9WRUMzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIE5PUk1BTDoge1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb246IDEsXHJcbiAgICAgICAgICAgICAgICBjb3VudDogbm9ybWFscy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBudW1Db21wb25lbnRzOiAzLFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAwLFxyXG4gICAgICAgICAgICAgICAgc3RyaWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNTEyNixcclxuICAgICAgICAgICAgICAgIGRhdGE6IF9ub3JtYWxzLFxyXG4gICAgICAgICAgICAgICAgYnl0ZUxlbmd0aDogX25vcm1hbHMuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGU6IEZMT0FUX1ZFQzNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgVEVYQ09PUkRfMDoge1xyXG4gICAgICAgICAgICAgICAgZGF0YTogX3RleGNvb3JkcyxcclxuICAgICAgICAgICAgICAgIGNvdW50OiBfdGV4Y29vcmRzLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDUxMjYsXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IDAsXHJcbiAgICAgICAgICAgICAgICBzdHJpZGU6IDAsXHJcbiAgICAgICAgICAgICAgICBieXRlTGVuZ3RoOiBfdGV4Y29vcmRzLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogNCxcclxuICAgICAgICAgICAgICAgIG51bUNvbXBvbmVudHM6IDIsXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVUeXBlOiBGTE9BVF9WRUMyXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wb25lbnRUeXBlOiA1MTIzLFxyXG4gICAgICAgIGluZGljZXM6IF9pbmRpY2VzLFxyXG4gICAgICAgIG51bUVsZW1lbnRzOiBpbmRpY2VzLmxlbmd0aCxcclxuICAgICAgICBtb2RlOiA0LFxyXG4gICAgfTtcclxufTtcclxuY29uc3QgY3JlYXRlVHJ1bmNhdGVkQ29uZSA9IChib3R0b21SYWRpdXMsIHRvcFJhZGl1cywgaGVpZ2h0LCByYWRpYWxTdWJkaXZpc2lvbnMsIHZlcnRpY2FsU3ViZGl2aXNpb25zLCBvcHRfdG9wQ2FwLCBvcHRfYm90dG9tQ2FwKSA9PiB7XHJcbiAgICBpZiAocmFkaWFsU3ViZGl2aXNpb25zIDwgMykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInJhZGlhbFN1YmRpdmlzaW9ucyBtdXN0IGJlIDMgb3IgZ3JlYXRlclwiKTtcclxuICAgIH1cclxuICAgIGlmICh2ZXJ0aWNhbFN1YmRpdmlzaW9ucyA8IDEpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ2ZXJ0aWNhbFN1YmRpdmlzaW9ucyBtdXN0IGJlIDEgb3IgZ3JlYXRlclwiKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHRvcENhcCA9IG9wdF90b3BDYXAgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBvcHRfdG9wQ2FwO1xyXG4gICAgY29uc3QgYm90dG9tQ2FwID0gb3B0X2JvdHRvbUNhcCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IG9wdF9ib3R0b21DYXA7XHJcbiAgICBjb25zdCBleHRyYSA9ICh0b3BDYXAgPyAyIDogMCkgKyAoYm90dG9tQ2FwID8gMiA6IDApO1xyXG4gICAgY29uc3QgbnVtVmVydGljZXMgPSAocmFkaWFsU3ViZGl2aXNpb25zICsgMSkgKiAodmVydGljYWxTdWJkaXZpc2lvbnMgKyAxICsgZXh0cmEpO1xyXG4gICAgY29uc3QgcG9zaXRpb25zID0gW107XHJcbiAgICBjb25zdCBub3JtYWxzID0gW107XHJcbiAgICBjb25zdCB0ZXhjb29yZHMgPSBbXTtcclxuICAgIGNvbnN0IGluZGljZXMgPSBbXTtcclxuICAgIGNvbnN0IHZlcnRzQXJvdW5kRWRnZSA9IHJhZGlhbFN1YmRpdmlzaW9ucyArIDE7XHJcbiAgICBjb25zdCBzbGFudCA9IE1hdGguYXRhbjIoYm90dG9tUmFkaXVzIC0gdG9wUmFkaXVzLCBoZWlnaHQpO1xyXG4gICAgY29uc3QgY29zU2xhbnQgPSBNYXRoLmNvcyhzbGFudCk7XHJcbiAgICBjb25zdCBzaW5TbGFudCA9IE1hdGguc2luKHNsYW50KTtcclxuICAgIGNvbnN0IHN0YXJ0ID0gdG9wQ2FwID8gLTIgOiAwO1xyXG4gICAgY29uc3QgZW5kID0gdmVydGljYWxTdWJkaXZpc2lvbnMgKyAoYm90dG9tQ2FwID8gMiA6IDApO1xyXG4gICAgZm9yIChsZXQgeXkgPSBzdGFydDsgeXkgPD0gZW5kOyArK3l5KSB7XHJcbiAgICAgICAgbGV0IHYgPSB5eSAvIHZlcnRpY2FsU3ViZGl2aXNpb25zO1xyXG4gICAgICAgIGxldCB5ID0gaGVpZ2h0ICogdjtcclxuICAgICAgICBsZXQgcmluZ1JhZGl1cztcclxuICAgICAgICBpZiAoeXkgPCAwKSB7XHJcbiAgICAgICAgICAgIHkgPSAwO1xyXG4gICAgICAgICAgICB2ID0gMTtcclxuICAgICAgICAgICAgcmluZ1JhZGl1cyA9IGJvdHRvbVJhZGl1cztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoeXkgPiB2ZXJ0aWNhbFN1YmRpdmlzaW9ucykge1xyXG4gICAgICAgICAgICB5ID0gaGVpZ2h0O1xyXG4gICAgICAgICAgICB2ID0gMTtcclxuICAgICAgICAgICAgcmluZ1JhZGl1cyA9IHRvcFJhZGl1cztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJpbmdSYWRpdXMgPVxyXG4gICAgICAgICAgICAgICAgYm90dG9tUmFkaXVzICsgKHRvcFJhZGl1cyAtIGJvdHRvbVJhZGl1cykgKiAoeXkgLyB2ZXJ0aWNhbFN1YmRpdmlzaW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh5eSA9PT0gLTIgfHwgeXkgPT09IHZlcnRpY2FsU3ViZGl2aXNpb25zICsgMikge1xyXG4gICAgICAgICAgICByaW5nUmFkaXVzID0gMDtcclxuICAgICAgICAgICAgdiA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHkgLT0gaGVpZ2h0IC8gMjtcclxuICAgICAgICBmb3IgKGxldCBpaSA9IDA7IGlpIDwgdmVydHNBcm91bmRFZGdlOyArK2lpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNpbiA9IE1hdGguc2luKChpaSAqIE1hdGguUEkgKiAyKSAvIHJhZGlhbFN1YmRpdmlzaW9ucyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvcyA9IE1hdGguY29zKChpaSAqIE1hdGguUEkgKiAyKSAvIHJhZGlhbFN1YmRpdmlzaW9ucyk7XHJcbiAgICAgICAgICAgIHBvc2l0aW9ucy5wdXNoKHNpbiAqIHJpbmdSYWRpdXMsIHksIGNvcyAqIHJpbmdSYWRpdXMpO1xyXG4gICAgICAgICAgICBpZiAoeXkgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBub3JtYWxzLnB1c2goMCwgLTEsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHl5ID4gdmVydGljYWxTdWJkaXZpc2lvbnMpIHtcclxuICAgICAgICAgICAgICAgIG5vcm1hbHMucHVzaCgwLCAxLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChyaW5nUmFkaXVzID09PSAwLjApIHtcclxuICAgICAgICAgICAgICAgIG5vcm1hbHMucHVzaCgwLCAwLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5vcm1hbHMucHVzaChzaW4gKiBjb3NTbGFudCwgc2luU2xhbnQsIGNvcyAqIGNvc1NsYW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0ZXhjb29yZHMucHVzaChpaSAvIHJhZGlhbFN1YmRpdmlzaW9ucywgMSAtIHYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZvciAobGV0IHl5ID0gMDsgeXkgPCB2ZXJ0aWNhbFN1YmRpdmlzaW9ucyArIGV4dHJhOyArK3l5KSB7XHJcbiAgICAgICAgaWYgKCh5eSA9PT0gMSAmJiB0b3BDYXApIHx8XHJcbiAgICAgICAgICAgICh5eSA9PT0gdmVydGljYWxTdWJkaXZpc2lvbnMgKyBleHRyYSAtIDIgJiYgYm90dG9tQ2FwKSkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaWkgPSAwOyBpaSA8IHJhZGlhbFN1YmRpdmlzaW9uczsgKytpaSkge1xyXG4gICAgICAgICAgICBpbmRpY2VzLnB1c2godmVydHNBcm91bmRFZGdlICogKHl5ICsgMCkgKyAwICsgaWksIHZlcnRzQXJvdW5kRWRnZSAqICh5eSArIDApICsgMSArIGlpLCB2ZXJ0c0Fyb3VuZEVkZ2UgKiAoeXkgKyAxKSArIDEgKyBpaSk7XHJcbiAgICAgICAgICAgIGluZGljZXMucHVzaCh2ZXJ0c0Fyb3VuZEVkZ2UgKiAoeXkgKyAwKSArIDAgKyBpaSwgdmVydHNBcm91bmRFZGdlICogKHl5ICsgMSkgKyAxICsgaWksIHZlcnRzQXJvdW5kRWRnZSAqICh5eSArIDEpICsgMCArIGlpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCBfcG9zaXRpb25zID0gbmV3IEZsb2F0MzJBcnJheShwb3NpdGlvbnMpO1xyXG4gICAgY29uc3QgX25vcm1hbHMgPSBuZXcgRmxvYXQzMkFycmF5KG5vcm1hbHMpO1xyXG4gICAgY29uc3QgX3RleGNvb3JkcyA9IG5ldyBGbG9hdDMyQXJyYXkodGV4Y29vcmRzKTtcclxuICAgIGNvbnN0IF9pbmRpY2VzID0gbmV3IFVpbnQxNkFycmF5KGluZGljZXMpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBhdHRyaWJ1dGVzOiB7XHJcbiAgICAgICAgICAgIFBPU0lUSU9OOiB7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogMCxcclxuICAgICAgICAgICAgICAgIGNvdW50OiBwb3NpdGlvbnMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAwLFxyXG4gICAgICAgICAgICAgICAgc3RyaWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgbnVtQ29tcG9uZW50czogMyxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDUxMjYsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBfcG9zaXRpb25zLFxyXG4gICAgICAgICAgICAgICAgYnl0ZUxlbmd0aDogX3Bvc2l0aW9ucy5ieXRlTGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlVHlwZTogRkxPQVRfVkVDM1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBOT1JNQUw6IHtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAxLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IG5vcm1hbHMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgbnVtQ29tcG9uZW50czogMyxcclxuICAgICAgICAgICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICAgICAgICAgIHN0cmlkZTogMCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDUxMjYsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBfbm9ybWFscyxcclxuICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGg6IF9ub3JtYWxzLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVUeXBlOiBGTE9BVF9WRUMzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFRFWENPT1JEXzA6IHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IF90ZXhjb29yZHMsXHJcbiAgICAgICAgICAgICAgICBjb3VudDogX3RleGNvb3Jkcy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiA1MTI2LFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAwLFxyXG4gICAgICAgICAgICAgICAgc3RyaWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgYnl0ZUxlbmd0aDogX3RleGNvb3Jkcy5ieXRlTGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgbG9jYXRpb246IDQsXHJcbiAgICAgICAgICAgICAgICBudW1Db21wb25lbnRzOiAyLFxyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlVHlwZTogRkxPQVRfVkVDMlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcG9uZW50VHlwZTogNTEyMyxcclxuICAgICAgICBpbmRpY2VzOiBfaW5kaWNlcyxcclxuICAgICAgICBudW1FbGVtZW50czogaW5kaWNlcy5sZW5ndGgsXHJcbiAgICAgICAgbW9kZTogNCxcclxuICAgIH07XHJcbn07XHJcbmV4cG9ydCB7IGNyZWF0ZUJveCwgY3JlYXRlQ29uZSwgY3JlYXRlQ2lyY2xlLCBjcmVhdGVTcGhlcmUsIGNyZWF0ZVRydW5jYXRlZENvbmUgfTtcclxuIiwiZnVuY3Rpb24gY3JlYXRlVW5pZm9ybVNldHRlcnMoZ2wsIHByb2dyYW0pIHtcclxuICAgIGNvbnN0IGNyZWF0ZVRleHR1cmVTZXR0ZXIgPSAocHJvZ3JhbSwgdW5pZm9ybUluZm8pID0+IHtcclxuICAgICAgICBjb25zdCBsb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCB1bmlmb3JtSW5mby5uYW1lKTtcclxuICAgICAgICByZXR1cm4gKHRleEJsb2NrTnVtKSA9PiB7XHJcbiAgICAgICAgICAgIGdsLnVuaWZvcm0xaShsb2NhdGlvbiwgdGV4QmxvY2tOdW0pO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgZnVuY3Rpb24gY3JlYXRlVW5pZm9ybVNldHRlcihwcm9ncmFtLCB1bmlmb3JtSW5mbykge1xyXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sIHVuaWZvcm1JbmZvLm5hbWUpO1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSB1bmlmb3JtSW5mby50eXBlO1xyXG4gICAgICAgIGNvbnN0IGlzQXJyYXkgPSB1bmlmb3JtSW5mby5zaXplID4gMSAmJiB1bmlmb3JtSW5mby5uYW1lLnN1YnN0cigtMykgPT09IFwiWzBdXCI7XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLkZMT0FUICYmIGlzQXJyYXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtMWZ2KGxvY2F0aW9uLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLkZMT0FUKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgZ2wudW5pZm9ybTFmKGxvY2F0aW9uLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLkZMT0FUX1ZFQzIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtMmZ2KGxvY2F0aW9uLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLkZMT0FUX1ZFQzMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtM2Z2KGxvY2F0aW9uLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLkZMT0FUX1ZFQzQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtNGZ2KGxvY2F0aW9uLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLklOVCAmJiBpc0FycmF5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgZ2wudW5pZm9ybTFpdihsb2NhdGlvbiwgdik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSBnbC5JTlQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtMWkobG9jYXRpb24sIHYpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gZ2wuSU5UX1ZFQzIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtMml2KGxvY2F0aW9uLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLklOVF9WRUMzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgZ2wudW5pZm9ybTNpdihsb2NhdGlvbiwgdik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSBnbC5JTlRfVkVDNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgICAgIGdsLnVuaWZvcm00aXYobG9jYXRpb24sIHYpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gZ2wuQk9PTCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgICAgIGdsLnVuaWZvcm0xaXYobG9jYXRpb24sIHYpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gZ2wuQk9PTF9WRUMyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgZ2wudW5pZm9ybTJpdihsb2NhdGlvbiwgdik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSBnbC5CT09MX1ZFQzMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtM2l2KGxvY2F0aW9uLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLkJPT0xfVkVDNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgICAgIGdsLnVuaWZvcm00aXYobG9jYXRpb24sIHYpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gZ2wuRkxPQVRfTUFUMikge1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgICAgIGdsLnVuaWZvcm1NYXRyaXgyZnYobG9jYXRpb24sIGZhbHNlLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLkZMT0FUX01BVDMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtTWF0cml4M2Z2KGxvY2F0aW9uLCBmYWxzZSwgdik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSBnbC5GTE9BVF9NQVQ0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgZ2wudW5pZm9ybU1hdHJpeDRmdihsb2NhdGlvbiwgZmFsc2UsIHYpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IHVuaWZvcm1TZXR0ZXJzID0ge307XHJcbiAgICBjb25zdCB0ZXh0dXJlU2V0dGVycyA9IHt9O1xyXG4gICAgY29uc3QgbnVtVW5pZm9ybXMgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLkFDVElWRV9VTklGT1JNUyk7XHJcbiAgICBmb3IgKGxldCBpaSA9IDA7IGlpIDwgbnVtVW5pZm9ybXM7ICsraWkpIHtcclxuICAgICAgICBjb25zdCB1bmlmb3JtSW5mbyA9IGdsLmdldEFjdGl2ZVVuaWZvcm0ocHJvZ3JhbSwgaWkpO1xyXG4gICAgICAgIGlmICghdW5pZm9ybUluZm8pIHtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBuYW1lID0gdW5pZm9ybUluZm8ubmFtZTtcclxuICAgICAgICBpZiAodW5pZm9ybUluZm8udHlwZSA9PT0gZ2wuU0FNUExFUl8yRCkge1xyXG4gICAgICAgICAgICB0ZXh0dXJlU2V0dGVyc1tuYW1lXSA9IGNyZWF0ZVRleHR1cmVTZXR0ZXIocHJvZ3JhbSwgdW5pZm9ybUluZm8pO1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5hbWUuc3Vic3RyKC0zKSA9PT0gXCJbMF1cIikge1xyXG4gICAgICAgICAgICBuYW1lID0gbmFtZS5zdWJzdHIoMCwgbmFtZS5sZW5ndGggLSAzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVuaWZvcm1JbmZvLnNpemUgPiAxKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdW5pZm9ybUluZm8uc2l6ZTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvYmogPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2l6ZTogdW5pZm9ybUluZm8uc2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiB1bmlmb3JtSW5mby50eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUgKyBgWyR7aX1dYCxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB1bmlmb3JtU2V0dGVyc1tuYW1lICsgYFske2l9XWBdID0gY3JlYXRlVW5pZm9ybVNldHRlcihwcm9ncmFtLCBvYmopO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBzZXR0ZXIgPSBjcmVhdGVVbmlmb3JtU2V0dGVyKHByb2dyYW0sIHVuaWZvcm1JbmZvKTtcclxuICAgICAgICAgICAgdW5pZm9ybVNldHRlcnNbbmFtZV0gPSBzZXR0ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHsgdW5pZm9ybVNldHRlcnMsIHRleHR1cmVTZXR0ZXJzIH07XHJcbn1cclxuY2xhc3MgUHJvZ3JhbUluZm8ge1xyXG4gICAgY29uc3RydWN0b3IoZ2xXcmFwcGVyLCB2ZXJ0ZXhTaGFkZXJTb3VyY2UsIGZyYWdtZW50U2hhZGVyU291cmNlKSB7XHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhTaGFkZXJTb3VyY2UgPSB2ZXJ0ZXhTaGFkZXJTb3VyY2U7XHJcbiAgICAgICAgdGhpcy5mcmFnbWVudFNoYWRlclNvdXJjZSA9IGZyYWdtZW50U2hhZGVyU291cmNlO1xyXG4gICAgICAgIHRoaXMudW5pZm9ybVNldHRlcnMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudGV4dHVyZVNldHRlcnMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudmVydGV4U2hhZGVyID0gbnVsbDtcclxuICAgICAgICB0aGlzLmZyYWdtZW50U2hhZGVyID0gbnVsbDtcclxuICAgICAgICB0aGlzLnByb2dyYW0gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZ2xXcmFwcGVyID0gZ2xXcmFwcGVyO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlVW5pZm9ybVNldHRlcnMoKSB7XHJcbiAgICAgICAgY29uc3QgeyBnbFdyYXBwZXIsIHByb2dyYW0gfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgeyBnbCB9ID0gZ2xXcmFwcGVyO1xyXG4gICAgICAgIGNvbnN0IHsgdW5pZm9ybVNldHRlcnMsIHRleHR1cmVTZXR0ZXJzIH0gPSBjcmVhdGVVbmlmb3JtU2V0dGVycyhnbCwgcHJvZ3JhbSk7XHJcbiAgICAgICAgdGhpcy50ZXh0dXJlU2V0dGVycyA9IHRleHR1cmVTZXR0ZXJzO1xyXG4gICAgICAgIHRoaXMudW5pZm9ybVNldHRlcnMgPSB1bmlmb3JtU2V0dGVycztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGNvbXBpbGVTaGFkZXJzKCkge1xyXG4gICAgICAgIGNvbnN0IHsgZ2xXcmFwcGVyLCBmcmFnbWVudFNoYWRlclNvdXJjZSwgdmVydGV4U2hhZGVyU291cmNlIH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IHsgZ2wgfSA9IGdsV3JhcHBlcjtcclxuICAgICAgICB0aGlzLnZlcnRleFNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcihnbC5WRVJURVhfU0hBREVSKTtcclxuICAgICAgICBnbC5zaGFkZXJTb3VyY2UodGhpcy52ZXJ0ZXhTaGFkZXIsIHZlcnRleFNoYWRlclNvdXJjZSk7XHJcbiAgICAgICAgZ2wuY29tcGlsZVNoYWRlcih0aGlzLnZlcnRleFNoYWRlcik7XHJcbiAgICAgICAgaWYgKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIodGhpcy52ZXJ0ZXhTaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZ2wuZ2V0U2hhZGVySW5mb0xvZyh0aGlzLnZlcnRleFNoYWRlcikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZyYWdtZW50U2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKGdsLkZSQUdNRU5UX1NIQURFUik7XHJcbiAgICAgICAgZ2wuc2hhZGVyU291cmNlKHRoaXMuZnJhZ21lbnRTaGFkZXIsIGZyYWdtZW50U2hhZGVyU291cmNlKTtcclxuICAgICAgICBnbC5jb21waWxlU2hhZGVyKHRoaXMuZnJhZ21lbnRTaGFkZXIpO1xyXG4gICAgICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHRoaXMuZnJhZ21lbnRTaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZ2wuZ2V0U2hhZGVySW5mb0xvZyh0aGlzLmZyYWdtZW50U2hhZGVyKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucHJvZ3JhbSA9IGdsLmNyZWF0ZVByb2dyYW0oKTtcclxuICAgICAgICBnbC5hdHRhY2hTaGFkZXIodGhpcy5wcm9ncmFtLCB0aGlzLnZlcnRleFNoYWRlcik7XHJcbiAgICAgICAgZ2wuYXR0YWNoU2hhZGVyKHRoaXMucHJvZ3JhbSwgdGhpcy5mcmFnbWVudFNoYWRlcik7XHJcbiAgICAgICAgZ2wubGlua1Byb2dyYW0odGhpcy5wcm9ncmFtKTtcclxuICAgICAgICBpZiAoIWdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5wcm9ncmFtLCBnbC5MSU5LX1NUQVRVUykpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGdsLmdldFByb2dyYW1JbmZvTG9nKHRoaXMucHJvZ3JhbSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNldFVuaWZvcm1zKHVuaWZvcm1zKSB7XHJcbiAgICAgICAgY29uc3QgeyB1bmlmb3JtU2V0dGVycywgZ2xXcmFwcGVyIH0gPSB0aGlzO1xyXG4gICAgICAgIGdsV3JhcHBlci51c2VQcm9ncmFtSW5mbyh0aGlzKTtcclxuICAgICAgICBPYmplY3Qua2V5cyh1bmlmb3JtcykuZm9yRWFjaCgobmFtZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzZXR0ZXIgPSB1bmlmb3JtU2V0dGVyc1tuYW1lXTtcclxuICAgICAgICAgICAgaWYgKHNldHRlcilcclxuICAgICAgICAgICAgICAgIHNldHRlcih1bmlmb3Jtc1tuYW1lXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBzZXRUZXh0dXJlVW5pZm9ybVVuaXQobmFtZSwgdW5pdCkge1xyXG4gICAgICAgIGNvbnN0IHsgdGV4dHVyZVNldHRlcnMsIGdsV3JhcHBlciB9ID0gdGhpcztcclxuICAgICAgICBnbFdyYXBwZXIudXNlUHJvZ3JhbUluZm8odGhpcyk7XHJcbiAgICAgICAgY29uc3Qgc2V0dGVyID0gdGV4dHVyZVNldHRlcnNbbmFtZV07XHJcbiAgICAgICAgaWYgKHNldHRlcilcclxuICAgICAgICAgICAgc2V0dGVyKHVuaXQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7IFByb2dyYW1JbmZvIH07XHJcbiIsIi8qY29uc3Qgc2V0Q2FudmFzU2l6ZSA9IChjdHgsIHdpZHRoLCBoZWlnaHQpID0+IHtcclxuICBjdHguY2FudmFzLndpZHRoID0gd2lkdGg7XHJcbiAgY3R4LmNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbn07XHJcblxyXG5jb25zdCBtYWtlVGV4dHVyZSA9IChnbCwgY3R4KSA9PiB7XHJcbiAgY29uc3QgdGV4ID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xyXG4gIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleCk7XHJcblxyXG4gIGdsLnRleEltYWdlMkQoXHJcbiAgICBnbC5URVhUVVJFXzJELFxyXG4gICAgMCxcclxuICAgIGdsLlJHQkEsXHJcbiAgICBnbC5SR0JBLFxyXG4gICAgZ2wuVU5TSUdORURfQllURSxcclxuICAgIGN0eC5jYW52YXNcclxuICApO1xyXG4gIHJldHVybiB0ZXg7XHJcbn07XHJcblxyXG5jb25zdCBtYWtlU3RyaXBlVGV4dHVyZSA9IChnbCwgb3B0aW9ucykgPT4ge1xyXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gIHZhciB3aWR0aCA9IG9wdGlvbnMud2lkdGggfHwgNDtcclxuICB2YXIgaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQgfHwgNDtcclxuICB2YXIgY29sb3IxID0gb3B0aW9ucy5jb2xvcjEgfHwgXCJyZ2JhKDEsMCwwLDAuMSlcIjtcclxuICB2YXIgY29sb3IyID0gb3B0aW9ucy5jb2xvcjIgfHwgXCJyZ2JhKDEsMSwxLDAuNSlcIjtcclxuICBjb25zdCBjdHggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLmdldENvbnRleHQoXCIyZFwiKTtcclxuICBzZXRDYW52YXNTaXplKGN0eCwgd2lkdGgsIGhlaWdodCk7XHJcblxyXG4gIGN0eC5maWxsU3R5bGUgPSBjb2xvcjE7XHJcbiAgY3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gIGN0eC5maWxsU3R5bGUgPSBjb2xvcjI7XHJcbiAgY3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQgLyAyKTtcclxuXHJcbiAgcmV0dXJuIG1ha2VUZXh0dXJlKGdsLCBjdHgpO1xyXG59O1xyXG5cclxuY29uc3QgbWFrZVN0cmlwZUltZyA9IChvcHRpb25zKSA9PiB7XHJcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgdmFyIHdpZHRoID0gb3B0aW9ucy53aWR0aCB8fCA0O1xyXG4gIHZhciBoZWlnaHQgPSBvcHRpb25zLmhlaWdodCB8fCA0O1xyXG4gIHZhciBjb2xvcjEgPSBvcHRpb25zLmNvbG9yMSB8fCBcInJnYmEoMSwwLDAsMC41KVwiO1xyXG4gIHZhciBjb2xvcjIgPSBvcHRpb25zLmNvbG9yMiB8fCBcInJnYmEoMCwwLDEsMSlcIjtcclxuICBjb25zdCBjdHggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLmdldENvbnRleHQoXCIyZFwiKTtcclxuICBzZXRDYW52YXNTaXplKGN0eCwgd2lkdGgsIGhlaWdodCk7XHJcblxyXG4gIGN0eC5maWxsU3R5bGUgPSBjb2xvcjE7XHJcbiAgY3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gIGN0eC5maWxsU3R5bGUgPSBjb2xvcjI7XHJcbiAgY3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQgLyAyKTtcclxuXHJcbiAgcmV0dXJuIGN0eC5jYW52YXM7XHJcbn07XHJcblxyXG5jb25zdCBtYWtlSW1nRnJvbVN2Z1htbCA9ICh4bWwsIG9wdGlvbnMgPSB7fSkgPT4ge1xyXG4gIGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcbiAgdmFyIHN2ZzY0ID0gYnRvYSh4bWwpO1xyXG4gIHZhciBiNjRTdGFydCA9IFwiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxcIjtcclxuICB2YXIgaW1hZ2U2NCA9IGI2NFN0YXJ0ICsgc3ZnNjQ7XHJcbiAgaW1nLnNyYyA9IGltYWdlNjQ7XHJcblxyXG4gIGNvbnN0IHdpZHRoID0gb3B0aW9ucy53aWR0aCB8fCAxMDA7XHJcbiAgY29uc3QgaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQgfHwgMTAwO1xyXG4gIGNvbnN0IHggPSBvcHRpb25zLnggfHwgMTtcclxuICBjb25zdCB5ID0gb3B0aW9ucy55IHx8IDUwO1xyXG5cclxuICBjb25zdCBjdHggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLmdldENvbnRleHQoXCIyZFwiKTtcclxuICBzZXRDYW52YXNTaXplKGN0eCwgd2lkdGgsIGhlaWdodCk7XHJcblxyXG4gIGN0eC5kcmF3SW1hZ2UoaW1nLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcclxuICBjdHguZmlsbFN0eWxlID0gXCJyZ2JhKDAsMCwwLDEpXCI7XHJcbiAgY3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gIHJldHVybiBjdHguaW1nO1xyXG59O1xyXG4qL1xyXG5jb25zdCByZXF1ZXN0Q09SU0lmTm90U2FtZU9yaWdpbiA9IChpbWcsIHVybCkgPT4ge1xyXG4gICAgaWYgKG5ldyBVUkwodXJsLCB3aW5kb3cubG9jYXRpb24uaHJlZikub3JpZ2luICE9PSB3aW5kb3cubG9jYXRpb24ub3JpZ2luKSB7XHJcbiAgICAgICAgaW1nLmNyb3NzT3JpZ2luID0gXCJcIjtcclxuICAgIH1cclxufTtcclxuY2xhc3MgVGV4dHVyZUluZm8ge1xyXG4gICAgY29uc3RydWN0b3IoZ2wpIHtcclxuICAgICAgICB0aGlzLndpZHRoID0gbnVsbDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5nbCA9IGdsO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlVGV4dHVyZUZyb21VUkwodXJsKSB7XHJcbiAgICAgICAgY29uc3QgeyBnbCB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCB0ZXh0dXJlID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xyXG4gICAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleHR1cmUpO1xyXG4gICAgICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuUkdCQSwgMSwgMSwgMCwgZ2wuUkdCQSwgZ2wuVU5TSUdORURfQllURSwgbmV3IFVpbnQ4QXJyYXkoWzAsIDAsIDI1NSwgMjU1XSkpO1xyXG4gICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIGltZy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSBpbWcud2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gaW1nLmhlaWdodDtcclxuICAgICAgICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZSk7XHJcbiAgICAgICAgICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuUkdCQSwgZ2wuUkdCQSwgZ2wuVU5TSUdORURfQllURSwgaW1nKTtcclxuICAgICAgICAgICAgZ2wuZ2VuZXJhdGVNaXBtYXAoZ2wuVEVYVFVSRV8yRCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmVxdWVzdENPUlNJZk5vdFNhbWVPcmlnaW4oaW1nLCB1cmwpO1xyXG4gICAgICAgIGltZy5zcmMgPSB1cmw7XHJcbiAgICAgICAgdGhpcy50ZXh0dXJlID0gdGV4dHVyZTtcclxuICAgICAgICByZXR1cm4gdGV4dHVyZTtcclxuICAgIH1cclxuICAgIHNldFRleHR1cmVVbml0KHVuaXROdW0pIHtcclxuICAgICAgICBjb25zdCB7IGdsLCB0ZXh0dXJlIH0gPSB0aGlzO1xyXG4gICAgICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTAgKyB1bml0TnVtKTtcclxuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0ZXh0dXJlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG5leHBvcnQgeyBUZXh0dXJlSW5mbyB9O1xyXG4iLCJjb25zdCBwcm9wcyA9IHtcclxuICAgIG1hdDQ6IHtcclxuICAgICAgICBzdHJpZGU6IDY0LFxyXG4gICAgICAgIGJ5dGVMZW5ndGg6IDY0LFxyXG4gICAgICAgIHR5cGU6IDB4MTQwNixcclxuICAgICAgICBudW1BdHRyaWJ1dGVzOiA0LFxyXG4gICAgICAgIG51bUNvbXBvbmVudHM6IDQsXHJcbiAgICB9LFxyXG4gICAgdmVjMzoge1xyXG4gICAgICAgIG51bUNvbXBvbmVudHM6IDMsXHJcbiAgICAgICAgdHlwZTogMHgxNDA2LFxyXG4gICAgICAgIG51bUF0dHJpYnV0ZXM6IDEsXHJcbiAgICB9LFxyXG59O1xyXG5jb25zdCBnZXRBdHRyaWJ1dGVQcm9wc0J5VHlwZSA9ICh0eXBlKSA9PiBwcm9wc1t0eXBlXTtcclxuZXhwb3J0IGRlZmF1bHQgZ2V0QXR0cmlidXRlUHJvcHNCeVR5cGU7XHJcbiIsImNvbnN0IFRZUEVEX0FSUkFZUyA9IHtcclxuICAgIDUxMjA6IEludDhBcnJheSxcclxuICAgIDUxMjE6IFVpbnQ4QXJyYXksXHJcbiAgICA1MTIyOiBJbnQxNkFycmF5LFxyXG4gICAgNTEyMzogVWludDE2QXJyYXksXHJcbiAgICA1MTI0OiBJbnQzMkFycmF5LFxyXG4gICAgNTEyNTogVWludDMyQXJyYXksXHJcbiAgICA1MTI2OiBGbG9hdDMyQXJyYXksXHJcbn07XHJcbmNvbnN0IE5VTV9DT01QT05FTlRTID0ge1xyXG4gICAgU0NBTEFSOiAxLFxyXG4gICAgVkVDMjogMixcclxuICAgIFZFQzM6IDMsXHJcbiAgICBWRUM0OiA0LFxyXG4gICAgTUFUMjogNCxcclxuICAgIE1BVDM6IDksXHJcbiAgICBNQVQ0OiAxNixcclxufTtcclxuY29uc3QgTE9DQVRJT05TID0ge1xyXG4gICAgUE9TSVRJT046IDAsXHJcbiAgICBOT1JNQUw6IDEsXHJcbiAgICBXRUlHSFRTXzA6IDIsXHJcbiAgICBKT0lOVFNfMDogMyxcclxuICAgIFRFWENPT1JEXzA6IDQsXHJcbn07XHJcbmNvbnN0IEVMRU1FTlRfU0laRSA9IHtcclxuICAgIDB4MTQwNjogNCxcclxufTtcclxuY29uc3QgVEVYVFVSRTAgPSAweDg0YzA7XHJcbmNvbnN0IERZTkFNSUNfRFJBVyA9IDB4ODhlODtcclxuY29uc3QgQVJSQVlfQlVGRkVSID0gMHg4ODkyO1xyXG5jb25zdCBFTEVNRU5UX0FSUkFZX0JVRkZFUiA9IDB4ODg5MztcclxuY29uc3QgVU5JRk9STV9CVUZGRVIgPSAweDhhMTE7XHJcbmNvbnN0IFRSQU5TRk9STV9GRUVEQkFDS19CVUZGRVIgPSAweDhjOGU7XHJcbmNvbnN0IFRSQU5TRk9STV9GRUVEQkFDSyA9IDB4OGUyMjtcclxuY29uc3QgQ09NUElMRV9TVEFUVVMgPSAweDhiODE7XHJcbmNvbnN0IExJTktfU1RBVFVTID0gMHg4YjgyO1xyXG5jb25zdCBGUkFHTUVOVF9TSEFERVIgPSAweDhiMzA7XHJcbmNvbnN0IFZFUlRFWF9TSEFERVIgPSAweDhiMzE7XHJcbmNvbnN0IFNFUEFSQVRFX0FUVFJJQlMgPSAweDhjOGQ7XHJcbmNvbnN0IEFDVElWRV9VTklGT1JNUyA9IDB4OGI4NjtcclxuY29uc3QgQUNUSVZFX0FUVFJJQlVURVMgPSAweDhiODk7XHJcbmNvbnN0IFRSQU5TRk9STV9GRUVEQkFDS19WQVJZSU5HUyA9IDB4OGM4MztcclxuY29uc3QgQUNUSVZFX1VOSUZPUk1fQkxPQ0tTID0gMHg4YTM2O1xyXG5jb25zdCBVTklGT1JNX0JMT0NLX1JFRkVSRU5DRURfQllfVkVSVEVYX1NIQURFUiA9IDB4OGE0NDtcclxuY29uc3QgVU5JRk9STV9CTE9DS19SRUZFUkVOQ0VEX0JZX0ZSQUdNRU5UX1NIQURFUiA9IDB4OGE0NjtcclxuY29uc3QgVU5JRk9STV9CTE9DS19EQVRBX1NJWkUgPSAweDhhNDA7XHJcbmNvbnN0IFVOSUZPUk1fQkxPQ0tfQUNUSVZFX1VOSUZPUk1fSU5ESUNFUyA9IDB4OGE0MztcclxuY29uc3QgRkxPQVQgPSAweDE0MDY7XHJcbmNvbnN0IEZMT0FUX1ZFQzIgPSAweDhiNTA7XHJcbmNvbnN0IEZMT0FUX1ZFQzMgPSAweDhiNTE7XHJcbmNvbnN0IEZMT0FUX1ZFQzQgPSAweDhiNTI7XHJcbmNvbnN0IElOVCA9IDB4MTQwNDtcclxuY29uc3QgSU5UX1ZFQzIgPSAweDhiNTM7XHJcbmNvbnN0IElOVF9WRUMzID0gMHg4YjU0O1xyXG5jb25zdCBJTlRfVkVDNCA9IDB4OGI1NTtcclxuY29uc3QgQk9PTCA9IDB4OGI1NjtcclxuY29uc3QgQk9PTF9WRUMyID0gMHg4YjU3O1xyXG5jb25zdCBCT09MX1ZFQzMgPSAweDhiNTg7XHJcbmNvbnN0IEJPT0xfVkVDNCA9IDB4OGI1OTtcclxuY29uc3QgRkxPQVRfTUFUMiA9IDB4OGI1YTtcclxuY29uc3QgRkxPQVRfTUFUMyA9IDB4OGI1YjtcclxuY29uc3QgRkxPQVRfTUFUNCA9IDB4OGI1YztcclxuY29uc3QgU0FNUExFUl8yRCA9IDB4OGI1ZTtcclxuY29uc3QgU0FNUExFUl9DVUJFID0gMHg4YjYwO1xyXG5jb25zdCBTQU1QTEVSXzNEID0gMHg4YjVmO1xyXG5jb25zdCBTQU1QTEVSXzJEX1NIQURPVyA9IDB4OGI2MjtcclxuY29uc3QgRkxPQVRfTUFUMngzID0gMHg4YjY1O1xyXG5jb25zdCBGTE9BVF9NQVQyeDQgPSAweDhiNjY7XHJcbmNvbnN0IEZMT0FUX01BVDN4MiA9IDB4OGI2NztcclxuY29uc3QgRkxPQVRfTUFUM3g0ID0gMHg4YjY4O1xyXG5jb25zdCBGTE9BVF9NQVQ0eDIgPSAweDhiNjk7XHJcbmNvbnN0IEZMT0FUX01BVDR4MyA9IDB4OGI2YTtcclxuY29uc3QgU0FNUExFUl8yRF9BUlJBWSA9IDB4OGRjMTtcclxuY29uc3QgU0FNUExFUl8yRF9BUlJBWV9TSEFET1cgPSAweDhkYzQ7XHJcbmNvbnN0IFNBTVBMRVJfQ1VCRV9TSEFET1cgPSAweDhkYzU7XHJcbmNvbnN0IFVOU0lHTkVEX0lOVCA9IDB4MTQwNTtcclxuY29uc3QgVU5TSUdORURfSU5UX1ZFQzIgPSAweDhkYzY7XHJcbmNvbnN0IFVOU0lHTkVEX0lOVF9WRUMzID0gMHg4ZGM3O1xyXG5jb25zdCBVTlNJR05FRF9JTlRfVkVDNCA9IDB4OGRjODtcclxuY29uc3QgSU5UX1NBTVBMRVJfMkQgPSAweDhkY2E7XHJcbmNvbnN0IElOVF9TQU1QTEVSXzNEID0gMHg4ZGNiO1xyXG5jb25zdCBJTlRfU0FNUExFUl9DVUJFID0gMHg4ZGNjO1xyXG5jb25zdCBJTlRfU0FNUExFUl8yRF9BUlJBWSA9IDB4OGRjZjtcclxuY29uc3QgVU5TSUdORURfSU5UX1NBTVBMRVJfMkQgPSAweDhkZDI7XHJcbmNvbnN0IFVOU0lHTkVEX0lOVF9TQU1QTEVSXzNEID0gMHg4ZGQzO1xyXG5jb25zdCBVTlNJR05FRF9JTlRfU0FNUExFUl9DVUJFID0gMHg4ZGQ0O1xyXG5jb25zdCBVTlNJR05FRF9JTlRfU0FNUExFUl8yRF9BUlJBWSA9IDB4OGRkNztcclxuY29uc3QgVEVYVFVSRV8yRCA9IDB4MGRlMTtcclxuY29uc3QgVEVYVFVSRV9DVUJFX01BUCA9IDB4ODUxMztcclxuY29uc3QgVEVYVFVSRV8zRCA9IDB4ODA2ZjtcclxuY29uc3QgVEVYVFVSRV8yRF9BUlJBWSA9IDB4OGMxYTtcclxuZXhwb3J0IHsgTE9DQVRJT05TLCBOVU1fQ09NUE9ORU5UUywgVFlQRURfQVJSQVlTLCBFTEVNRU5UX1NJWkUsIEZMT0FULCBGTE9BVF9NQVQyLCBGTE9BVF9NQVQyeDMsIEZMT0FUX01BVDQsIEZMT0FUX01BVDJ4NCwgVU5TSUdORURfSU5ULCBGTE9BVF9NQVQzLCBVTlNJR05FRF9JTlRfVkVDMiwgVU5TSUdORURfSU5UX1ZFQzMsIFVOU0lHTkVEX0lOVF9WRUM0LCBGTE9BVF9WRUMyLCBGTE9BVF9WRUMzLCBGTE9BVF9WRUM0LCBJTlQsIElOVF9WRUMyLCBJTlRfVkVDMywgSU5UX1ZFQzQsIEJPT0wsIEJPT0xfVkVDMiwgQk9PTF9WRUMzLCBCT09MX1ZFQzQgfTtcclxuIiwiaW1wb3J0IHsgUHJpbWl0aXZlUmVuZGVySW5mb0Zyb21BcnJheURhdGEsIEFycmF5RGF0YUZyb21HbHRmLCBFbnRpdHlEYXRhRnJvbUdsdGYsIEdMVEYsIH0gZnJvbSBcIi4vY29tcG9uZW50cy9HbHRmVXRpbHNcIjtcclxuaW1wb3J0IHsgTWVzaFJlbmRlcmVyLCBTa2lubmVkTWVzaFJlbmRlcmVyIH0gZnJvbSBcIi4vY29tcG9uZW50cy9NZXNoUmVuZGVyZXJcIjtcclxuaW1wb3J0IHsgY3JlYXRlQm94LCBjcmVhdGVDb25lLCBjcmVhdGVDaXJjbGUsIGNyZWF0ZVNwaGVyZSwgY3JlYXRlVHJ1bmNhdGVkQ29uZSB9IGZyb20gXCIuL2NvbXBvbmVudHMvUHJpbWl0aXZlc1wiO1xyXG5pbXBvcnQgUHJpbWl0aXZlUmVuZGVyZXIgZnJvbSBcIi4vY29tcG9uZW50cy9QcmltaXRpdmVSZW5kZXJlclwiO1xyXG5pbXBvcnQgeyBQcm9ncmFtSW5mbywgfSBmcm9tIFwiLi9jb21wb25lbnRzL1Byb2dyYW1JbmZvXCI7XHJcbmltcG9ydCBEcmF3ZXIgZnJvbSBcIi4vY29tcG9uZW50cy9EcmF3ZXJcIjtcclxuaW1wb3J0IHsgVGV4dHVyZUluZm8sIH0gZnJvbSBcIi4vY29tcG9uZW50cy9UZXh0dXJlSW5mb1wiO1xyXG5pbXBvcnQgTW9kZWwgZnJvbSBcIi4vY29tcG9uZW50cy9Nb2RlbFwiO1xyXG5pbXBvcnQgeyBkZWZhdWx0U2hhZGVycywgcG9pbnRMaWdodFNoYWRlcnMgfSBmcm9tIFwiLi9yZW5kZXIvc2hhZGVyc1wiO1xyXG5pbXBvcnQgR0xjb250ZXh0V3JhcHBlciBmcm9tIFwiLi9jb21wb25lbnRzL0dMV3JhcHBlclwiO1xyXG5leHBvcnQgeyBHTFRGLCBHTGNvbnRleHRXcmFwcGVyLCBUZXh0dXJlSW5mbywgTW9kZWwsIFByaW1pdGl2ZVJlbmRlcmVyLCBFbnRpdHlEYXRhRnJvbUdsdGYsIFByaW1pdGl2ZVJlbmRlckluZm9Gcm9tQXJyYXlEYXRhLCBBcnJheURhdGFGcm9tR2x0ZiwgTWVzaFJlbmRlcmVyLCBTa2lubmVkTWVzaFJlbmRlcmVyLCBjcmVhdGVCb3gsIFByb2dyYW1JbmZvLCBEcmF3ZXIsIGNyZWF0ZUNvbmUsIGNyZWF0ZUNpcmNsZSwgZGVmYXVsdFNoYWRlcnMsIHBvaW50TGlnaHRTaGFkZXJzLCBjcmVhdGVTcGhlcmUsIGNyZWF0ZVRydW5jYXRlZENvbmUgfTtcclxuIiwiZXhwb3J0IGRlZmF1bHQgYCN2ZXJzaW9uIDMwMCBlc1xyXG5wcmVjaXNpb24gaGlnaHAgZmxvYXQ7XHJcbiBcclxuXHJcblxyXG51bmlmb3JtIHZlYzQgdV9jb2xvcjtcclxub3V0IHZlYzQgb3V0Q29sb3I7XHJcbnZvaWQgbWFpbigpIHtcclxuICBcclxuICBcclxuICBvdXRDb2xvciA9IHVfY29sb3I7XHJcbiBcclxuICBcclxuICBcclxufWA7XHJcbiIsImltcG9ydCB2ZXJ0IGZyb20gJy4vdmVydC5qcyc7XHJcbmltcG9ydCBmcmFnIGZyb20gJy4vZnJhZy5qcyc7XHJcbmV4cG9ydCBkZWZhdWx0IHsgdmVydCwgZnJhZyB9O1xyXG4iLCJleHBvcnQgZGVmYXVsdCBgI3ZlcnNpb24gMzAwIGVzXHJcblxyXG5wcmVjaXNpb24gaGlnaHAgZmxvYXQ7XHJcblxyXG51bmlmb3JtIG1hdDQgdV93b3JsZFZpZXdQcm9qZWN0aW9uO1xyXG5cclxuXHJcbmxheW91dChsb2NhdGlvbiA9IDApIGluIHZlYzQgYV9wb3NpdGlvbjtcclxudm9pZCBtYWluKCkge1xyXG4gIGdsX1Bvc2l0aW9uID0gdV93b3JsZFZpZXdQcm9qZWN0aW9uICogYV9wb3NpdGlvbjtcclxuICBnbF9Qb2ludFNpemUgPSAxMC4wO1xyXG59YDtcclxuIiwiaW1wb3J0IGRlZmF1bHRTaGFkZXJzIGZyb20gXCIuL2RlZmF1bHRcIjtcclxuaW1wb3J0IHBvaW50TGlnaHRTaGFkZXJzIGZyb20gXCIuL3BvaW50TGlnaHRcIjtcclxuZXhwb3J0IHsgZGVmYXVsdFNoYWRlcnMsIHBvaW50TGlnaHRTaGFkZXJzIH07XHJcbiIsImV4cG9ydCBkZWZhdWx0IGAjdmVyc2lvbiAzMDAgZXNcclxucHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xyXG4gXHJcblxyXG5cclxuXHJcbmluIHZlYzMgdl9ub3JtYWw7XHJcbmluIHZlYzMgdl9zdXJmYWNlVG9WaWV3O1xyXG5pbiB2ZWMzIHZfc3VyZmFjZVRvTGlnaHQ7XHJcblxyXG5cclxuLy91bmlmb3JtIHNhbXBsZXIyRCB1X3RleHR1cmUxO1xyXG51bmlmb3JtIGZsb2F0IHVfc2hpbmluZXNzO1xyXG51bmlmb3JtIHZlYzQgdV9jb2xvcjtcclxudW5pZm9ybSB2ZWM0IHVfYW1iaWVudExpZ2h0O1xyXG5vdXQgdmVjNCBvdXRDb2xvcjtcclxuXHJcblxyXG52b2lkIG1haW4oKSB7XHJcbiAgXHJcbiAgdmVjMyBzdXJmYWNlVG9MaWdodERpcmVjdGlvbiA9IG5vcm1hbGl6ZSh2X3N1cmZhY2VUb0xpZ2h0KTtcclxuICB2ZWMzIHN1cmZhY2VUb1ZpZXdEaXJlY3Rpb24gPSBub3JtYWxpemUodl9zdXJmYWNlVG9WaWV3KTtcclxuICB2ZWMzIGhhbGZWZWN0b3IgPSBub3JtYWxpemUoc3VyZmFjZVRvTGlnaHREaXJlY3Rpb24gKyBzdXJmYWNlVG9WaWV3RGlyZWN0aW9uKTtcclxuXHJcbiAgdmVjMyBub3JtYWwgPSBub3JtYWxpemUodl9ub3JtYWwpO1xyXG4gIGZsb2F0IGxpZ2h0ID0gZG90KG5vcm1hbCwgc3VyZmFjZVRvTGlnaHREaXJlY3Rpb24pO1xyXG4gIGZsb2F0IHNwZWN1bGFyID0gMC4wO1xyXG4gIGlmIChsaWdodCA+IDAuMCkge1xyXG4gICAgc3BlY3VsYXIgPSBwb3coZG90KG5vcm1hbCwgaGFsZlZlY3RvciksIHVfc2hpbmluZXNzKTtcclxuICB9XHJcbiAgXHJcbiAgb3V0Q29sb3IgPSAgdV9jb2xvcjtcclxuICBvdXRDb2xvci5yZ2IgKj0gbGlnaHQ7XHJcbiAgb3V0Q29sb3IucmdiICs9IHNwZWN1bGFyO1xyXG5cclxuICBvdXRDb2xvci5yZ2IgKz0gdV9hbWJpZW50TGlnaHQucmdiICowLjM7XHJcbiAgXHJcbn1gO1xyXG4iLCJpbXBvcnQgdmVydCBmcm9tICcuL3ZlcnQuanMnO1xyXG5pbXBvcnQgZnJhZyBmcm9tICcuL2ZyYWcuanMnO1xyXG5leHBvcnQgZGVmYXVsdCB7IHZlcnQsIGZyYWcgfTtcclxuIiwiZXhwb3J0IGRlZmF1bHQgYCN2ZXJzaW9uIDMwMCBlc1xyXG4gXHJcbmxheW91dChsb2NhdGlvbiA9IDApIGluIHZlYzQgYV9wb3NpdGlvbjtcclxubGF5b3V0KGxvY2F0aW9uID0gMSkgaW4gdmVjMyBhX25vcm1hbDtcclxuXHJcblxyXG51bmlmb3JtIG1hdDQgdV9tYXRyaXg7XHJcbnVuaWZvcm0gbWF0NCB1X3dvcmxkVmlld1Byb2plY3Rpb247XHJcbnVuaWZvcm0gdmVjMyB1X2xpZ2h0V29ybGRQb3NpdGlvbjtcclxudW5pZm9ybSB2ZWMzIHVfdmlld1dvcmxkUG9zaXRpb247XHJcblxyXG5vdXQgdmVjMyB2X25vcm1hbDtcclxub3V0IHZlYzMgdl9zdXJmYWNlVG9MaWdodDtcclxub3V0IHZlYzMgdl9zdXJmYWNlVG9WaWV3O1xyXG52b2lkIG1haW4oKSB7XHJcbiAgICBcclxuICAgIGdsX1Bvc2l0aW9uID0gdV93b3JsZFZpZXdQcm9qZWN0aW9uICogYV9wb3NpdGlvbjtcclxuICAgIFxyXG4gICAgdmVjMyBzdXJmYWNlV29ybGRQb3NpdGlvbiA9ICh1X21hdHJpeCAqIGFfcG9zaXRpb24pLnh5ejtcclxuICAgIFxyXG4gICAgdl9zdXJmYWNlVG9MaWdodCA9IHVfbGlnaHRXb3JsZFBvc2l0aW9uIC0gc3VyZmFjZVdvcmxkUG9zaXRpb247XHJcblxyXG4gICAgdl9ub3JtYWwgPSBtYXQzKCAgdV9tYXRyaXggKSAqIGFfbm9ybWFsO1xyXG4gICAgXHJcbiAgICB2X3N1cmZhY2VUb1ZpZXcgPSB1X3ZpZXdXb3JsZFBvc2l0aW9uIC0gc3VyZmFjZVdvcmxkUG9zaXRpb247XHJcbiAgICAgIFxyXG59YDtcclxuIiwiaW1wb3J0IEFBQkIsIHsgZ2V0Q2VudGVyLCBnZXREaWFnb25hbCwgaXNDb2xsaWRlIH0gZnJvbSBcIi4vYWFiYlwiO1xyXG5pbXBvcnQgdjMgZnJvbSBcIi4vdjNcIjtcclxuY29uc3QgZWxlbWVudFNpemUgPSAxO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPY3RyZWUge1xyXG4gICAgY29uc3RydWN0b3IoYWFiYikge1xyXG4gICAgICAgIHRoaXMuYWFiYiA9IGFhYmI7XHJcbiAgICAgICAgdGhpcy5kaWFnb25hbCA9IGdldERpYWdvbmFsKGFhYmIpO1xyXG4gICAgICAgIHRoaXMuY2VudGVyID0gZ2V0Q2VudGVyKGFhYmIpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudHMgPSBbXTtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuID0gW107XHJcbiAgICAgICAgdGhpcy5jYXBhY2l0eSA9IDQ7XHJcbiAgICB9XHJcbiAgICBzdWJkaXZpZGUoKSB7XHJcbiAgICAgICAgY29uc3QgbWluID0gdGhpcy5hYWJiLm1pbjtcclxuICAgICAgICBjb25zdCBtYXggPSB0aGlzLmFhYmIubWF4O1xyXG4gICAgICAgIGNvbnN0IFt4MSwgeTEsIHoxXSA9IG1pbjtcclxuICAgICAgICBjb25zdCBbeDIsIHkyLCB6Ml0gPSBtYXg7XHJcbiAgICAgICAgY29uc3QgeGMgPSB0aGlzLmNlbnRlclswXTtcclxuICAgICAgICBjb25zdCB5YyA9IHRoaXMuY2VudGVyWzFdO1xyXG4gICAgICAgIGNvbnN0IHpjID0gdGhpcy5jZW50ZXJbMl07XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlblswXSA9IG5ldyBPY3RyZWUobmV3IEFBQkIoW3gxLCB5MSwgejFdLCBbeGMsIHljLCB6Y10pKTtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuWzFdID0gbmV3IE9jdHJlZShuZXcgQUFCQihbeDEsIHkxLCB6Y10sIFt4YywgeWMsIHoyXSkpO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5bMl0gPSBuZXcgT2N0cmVlKG5ldyBBQUJCKFt4MSwgeWMsIHoxXSwgW3hjLCB5MiwgemNdKSk7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlblszXSA9IG5ldyBPY3RyZWUobmV3IEFBQkIoW3gxLCB5YywgemNdLCBbeGMsIHkyLCB6Ml0pKTtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuWzRdID0gbmV3IE9jdHJlZShuZXcgQUFCQihbeGMsIHkxLCB6MV0sIFt4MiwgeWMsIHpjXSkpO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5bNV0gPSBuZXcgT2N0cmVlKG5ldyBBQUJCKFt4YywgeTEsIHpjXSwgW3gyLCB5YywgejJdKSk7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbls2XSA9IG5ldyBPY3RyZWUobmV3IEFBQkIoW3hjLCB5YywgejFdLCBbeDIsIHkyLCB6Y10pKTtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuWzddID0gbmV3IE9jdHJlZShuZXcgQUFCQihbeGMsIHljLCB6Y10sIFt4MiwgeTIsIHoyXSkpO1xyXG4gICAgfVxyXG4gICAgaW5zZXJ0KHZveGVsKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudHMubGVuZ3RoIDwgdGhpcy5jYXBhY2l0eSkge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzLnB1c2godm94ZWwpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCA9PT0gMClcclxuICAgICAgICAgICAgdGhpcy5zdWJkaXZpZGUoKTtcclxuICAgICAgICBjb25zdCB4YyA9IHRoaXMuY2VudGVyWzBdO1xyXG4gICAgICAgIGNvbnN0IHljID0gdGhpcy5jZW50ZXJbMV07XHJcbiAgICAgICAgY29uc3QgemMgPSB0aGlzLmNlbnRlclsyXTtcclxuICAgICAgICBjb25zdCB4ID0gTnVtYmVyKHZveGVsWzBdID4geGMpICogNDtcclxuICAgICAgICBjb25zdCB5ID0gTnVtYmVyKHZveGVsWzFdID4geWMpICogMjtcclxuICAgICAgICBjb25zdCB6ID0gTnVtYmVyKHZveGVsWzJdID4gemMpO1xyXG4gICAgICAgIGNvbnN0IGlkeCA9IHogfCB5IHwgeDtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuW2lkeF0uaW5zZXJ0KHZveGVsKTtcclxuICAgIH1cclxuICAgIHF1ZXJ5KGFhYmIpIHtcclxuICAgICAgICBjb25zdCBmb3VuZCA9IFtdO1xyXG4gICAgICAgIGlmICghaXNDb2xsaWRlKHRoaXMuYWFiYiwgYWFiYikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IF9hYWJiID0gbmV3IEFBQkIodjMuc3VtKGVsZW1lbnQsIFstMC41LCAtMC41LCAtMC41XSksIHYzLnN1bShlbGVtZW50LCBbMC41LCAwLjUsIDAuNV0pKTtcclxuICAgICAgICAgICAgaWYgKGlzQ29sbGlkZShhYWJiLCBfYWFiYikpIHtcclxuICAgICAgICAgICAgICAgIGZvdW5kLnB1c2goZWxlbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xyXG4gICAgICAgICAgICBmb3VuZC5wdXNoKC4uLmNoaWxkLnF1ZXJ5KGFhYmIpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZm91bmQ7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHYzIGZyb20gXCIuL3YzXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFBQkIge1xyXG4gICAgY29uc3RydWN0b3IobWluLCBtYXgpIHtcclxuICAgICAgICB0aGlzLm1pbiA9IG1pbjtcclxuICAgICAgICB0aGlzLm1heCA9IG1heDtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY29uc3QgaXNDb2xsaWRlID0gKGFhYmIxLCBhYWJiMikgPT4ge1xyXG4gICAgaWYgKGFhYmIxLm1pblswXSA8PSBhYWJiMi5tYXhbMF0gJiZcclxuICAgICAgICBhYWJiMS5tYXhbMF0gPj0gYWFiYjIubWluWzBdICYmXHJcbiAgICAgICAgYWFiYjEubWluWzFdIDw9IGFhYmIyLm1heFsxXSAmJlxyXG4gICAgICAgIGFhYmIxLm1heFsxXSA+PSBhYWJiMi5taW5bMV0gJiZcclxuICAgICAgICBhYWJiMS5taW5bMl0gPD0gYWFiYjIubWF4WzJdICYmXHJcbiAgICAgICAgYWFiYjEubWF4WzJdID49IGFhYmIyLm1pblsyXSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZ2V0Q2VudGVyID0gKGFhYmIpID0+IHtcclxuICAgIGNvbnN0IHN1bSA9IHYzLnN1bShhYWJiLm1heCwgYWFiYi5taW4pO1xyXG4gICAgcmV0dXJuIFtzdW1bMF0gLyAyLCBzdW1bMV0gLyAyLCBzdW1bMl0gLyAyXTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGdldERpYWdvbmFsID0gKGFhYmIpID0+IHYzLmRpZmYoYWFiYi5tYXgsIGFhYmIubWluKTtcclxuZXhwb3J0IGNvbnN0IGNvbnRhaW5zID0gKGFhYmIsIHApID0+IHsgfTtcclxuIiwiaW1wb3J0IEFBQkIgZnJvbSBcIi4vYWFiYlwiO1xyXG5pbXBvcnQgdjMgZnJvbSBcIi4vdjNcIjtcclxuaW1wb3J0IG0zIGZyb20gXCIuL20zXCI7XHJcbmltcG9ydCBtNCBmcm9tIFwiLi9tNFwiO1xyXG5pbXBvcnQgT2N0cmVlIGZyb20gXCIuL09jdHJlZVwiO1xyXG5leHBvcnQgeyBBQUJCLCB2MywgbTQsIG0zLCBPY3RyZWUgfTtcclxuIiwiY29uc3QgbTMgPSB7XHJcbiAgICBtdWx0aXBseTogZnVuY3Rpb24gKGIsIGEpIHtcclxuICAgICAgICBjb25zdCBhMDAgPSBhWzAgKiAzICsgMF07XHJcbiAgICAgICAgY29uc3QgYTAxID0gYVswICogMyArIDFdO1xyXG4gICAgICAgIGNvbnN0IGEwMiA9IGFbMCAqIDMgKyAyXTtcclxuICAgICAgICBjb25zdCBhMTAgPSBhWzEgKiAzICsgMF07XHJcbiAgICAgICAgY29uc3QgYTExID0gYVsxICogMyArIDFdO1xyXG4gICAgICAgIGNvbnN0IGExMiA9IGFbMSAqIDMgKyAyXTtcclxuICAgICAgICBjb25zdCBhMjAgPSBhWzIgKiAzICsgMF07XHJcbiAgICAgICAgY29uc3QgYTIxID0gYVsyICogMyArIDFdO1xyXG4gICAgICAgIGNvbnN0IGEyMiA9IGFbMiAqIDMgKyAyXTtcclxuICAgICAgICBjb25zdCBiMDAgPSBiWzAgKiAzICsgMF07XHJcbiAgICAgICAgY29uc3QgYjAxID0gYlswICogMyArIDFdO1xyXG4gICAgICAgIGNvbnN0IGIwMiA9IGJbMCAqIDMgKyAyXTtcclxuICAgICAgICBjb25zdCBiMTAgPSBiWzEgKiAzICsgMF07XHJcbiAgICAgICAgY29uc3QgYjExID0gYlsxICogMyArIDFdO1xyXG4gICAgICAgIGNvbnN0IGIxMiA9IGJbMSAqIDMgKyAyXTtcclxuICAgICAgICBjb25zdCBiMjAgPSBiWzIgKiAzICsgMF07XHJcbiAgICAgICAgY29uc3QgYjIxID0gYlsyICogMyArIDFdO1xyXG4gICAgICAgIGNvbnN0IGIyMiA9IGJbMiAqIDMgKyAyXTtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBiMDAgKiBhMDAgKyBiMDEgKiBhMTAgKyBiMDIgKiBhMjAsXHJcbiAgICAgICAgICAgIGIwMCAqIGEwMSArIGIwMSAqIGExMSArIGIwMiAqIGEyMSxcclxuICAgICAgICAgICAgYjAwICogYTAyICsgYjAxICogYTEyICsgYjAyICogYTIyLFxyXG4gICAgICAgICAgICBiMTAgKiBhMDAgKyBiMTEgKiBhMTAgKyBiMTIgKiBhMjAsXHJcbiAgICAgICAgICAgIGIxMCAqIGEwMSArIGIxMSAqIGExMSArIGIxMiAqIGEyMSxcclxuICAgICAgICAgICAgYjEwICogYTAyICsgYjExICogYTEyICsgYjEyICogYTIyLFxyXG4gICAgICAgICAgICBiMjAgKiBhMDAgKyBiMjEgKiBhMTAgKyBiMjIgKiBhMjAsXHJcbiAgICAgICAgICAgIGIyMCAqIGEwMSArIGIyMSAqIGExMSArIGIyMiAqIGEyMSxcclxuICAgICAgICAgICAgYjIwICogYTAyICsgYjIxICogYTEyICsgYjIyICogYTIyLFxyXG4gICAgICAgIF07XHJcbiAgICB9LFxyXG4gICAgeFJvdGF0aW9uOiBmdW5jdGlvbiAoYW5nbGVJblJhZGlhbnMpIHtcclxuICAgICAgICBjb25zdCBjID0gTWF0aC5jb3MoYW5nbGVJblJhZGlhbnMpO1xyXG4gICAgICAgIGNvbnN0IHMgPSBNYXRoLnNpbihhbmdsZUluUmFkaWFucyk7XHJcbiAgICAgICAgcmV0dXJuIFsxLCAwLCAwLCAwLCBjLCBzLCAwLCAtcywgY107XHJcbiAgICB9LFxyXG4gICAgeVJvdGF0aW9uOiBmdW5jdGlvbiAoYW5nbGVJblJhZGlhbnMpIHtcclxuICAgICAgICBjb25zdCBjID0gTWF0aC5jb3MoYW5nbGVJblJhZGlhbnMpO1xyXG4gICAgICAgIGNvbnN0IHMgPSBNYXRoLnNpbihhbmdsZUluUmFkaWFucyk7XHJcbiAgICAgICAgcmV0dXJuIFtjLCAwLCAtcywgMCwgMSwgMCwgcywgMCwgY107XHJcbiAgICB9LFxyXG4gICAgelJvdGF0aW9uOiBmdW5jdGlvbiAoYW5nbGVJblJhZGlhbnMpIHtcclxuICAgICAgICBjb25zdCBjID0gTWF0aC5jb3MoYW5nbGVJblJhZGlhbnMpO1xyXG4gICAgICAgIGNvbnN0IHMgPSBNYXRoLnNpbihhbmdsZUluUmFkaWFucyk7XHJcbiAgICAgICAgcmV0dXJuIFtjLCBzLCAwLCAtcywgYywgMCwgMCwgMCwgMV07XHJcbiAgICB9LFxyXG4gICAgbTNUb200OiBmdW5jdGlvbiAobSkge1xyXG4gICAgICAgIGNvbnN0IGRzdCA9IG5ldyBBcnJheSgxNik7XHJcbiAgICAgICAgZHN0WzBdID0gbVswXTtcclxuICAgICAgICBkc3RbMV0gPSBtWzFdO1xyXG4gICAgICAgIGRzdFsyXSA9IG1bMl07XHJcbiAgICAgICAgZHN0WzNdID0gMDtcclxuICAgICAgICBkc3RbNF0gPSBtWzNdO1xyXG4gICAgICAgIGRzdFs1XSA9IG1bNF07XHJcbiAgICAgICAgZHN0WzZdID0gbVs1XTtcclxuICAgICAgICBkc3RbN10gPSAwO1xyXG4gICAgICAgIGRzdFs4XSA9IG1bNl07XHJcbiAgICAgICAgZHN0WzldID0gbVs3XTtcclxuICAgICAgICBkc3RbMTBdID0gbVs4XTtcclxuICAgICAgICBkc3RbMTFdID0gMDtcclxuICAgICAgICBkc3RbMTJdID0gMDtcclxuICAgICAgICBkc3RbMTNdID0gMDtcclxuICAgICAgICBkc3RbMTRdID0gMDtcclxuICAgICAgICBkc3RbMTVdID0gMTtcclxuICAgICAgICByZXR1cm4gZHN0O1xyXG4gICAgfSxcclxuICAgIHhSb3RhdGU6IGZ1bmN0aW9uIChtLCBhbmdsZUluUmFkaWFucykge1xyXG4gICAgICAgIHJldHVybiBtMy5tdWx0aXBseShtLCBtMy54Um90YXRpb24oYW5nbGVJblJhZGlhbnMpKTtcclxuICAgIH0sXHJcbiAgICB5Um90YXRlOiBmdW5jdGlvbiAobSwgYW5nbGVJblJhZGlhbnMpIHtcclxuICAgICAgICByZXR1cm4gbTMubXVsdGlwbHkobSwgbTMueVJvdGF0aW9uKGFuZ2xlSW5SYWRpYW5zKSk7XHJcbiAgICB9LFxyXG4gICAgelJvdGF0ZTogZnVuY3Rpb24gKG0sIGFuZ2xlSW5SYWRpYW5zKSB7XHJcbiAgICAgICAgcmV0dXJuIG0zLm11bHRpcGx5KG0sIG0zLnpSb3RhdGlvbihhbmdsZUluUmFkaWFucykpO1xyXG4gICAgfSxcclxuICAgIHRyYW5zZm9ybVBvaW50OiBmdW5jdGlvbiAobSwgdikge1xyXG4gICAgICAgIGNvbnN0IGRzdCA9IFswLCAwLCAwXTtcclxuICAgICAgICBjb25zdCB2MCA9IHZbMF07XHJcbiAgICAgICAgY29uc3QgdjEgPSB2WzFdO1xyXG4gICAgICAgIGNvbnN0IHYyID0gdlsyXTtcclxuICAgICAgICBkc3RbMF0gPSB2MCAqIG1bMCAqIDMgKyAwXSArIHYxICogbVsxICogMyArIDBdICsgdjIgKiBtWzIgKiAzICsgMF07XHJcbiAgICAgICAgZHN0WzFdID0gdjAgKiBtWzAgKiAzICsgMV0gKyB2MSAqIG1bMSAqIDMgKyAxXSArIHYyICogbVsyICogMyArIDFdO1xyXG4gICAgICAgIGRzdFsyXSA9IHYwICogbVswICogMyArIDJdICsgdjEgKiBtWzEgKiAzICsgMl0gKyB2MiAqIG1bMiAqIDMgKyAyXTtcclxuICAgICAgICByZXR1cm4gZHN0O1xyXG4gICAgfSxcclxuICAgIGlkZW50aXR5OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIFsxLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAxXTtcclxuICAgIH0sXHJcbiAgICB0cmFuc3Bvc2U6IGZ1bmN0aW9uIChtKSB7XHJcbiAgICAgICAgY29uc3QgZHN0ID0gbmV3IEFycmF5KDkpO1xyXG4gICAgICAgIGRzdFswXSA9IG1bMF07XHJcbiAgICAgICAgZHN0WzFdID0gbVszXTtcclxuICAgICAgICBkc3RbMl0gPSBtWzZdO1xyXG4gICAgICAgIGRzdFszXSA9IG1bMV07XHJcbiAgICAgICAgZHN0WzRdID0gbVs0XTtcclxuICAgICAgICBkc3RbNV0gPSBtWzddO1xyXG4gICAgICAgIGRzdFs2XSA9IG1bMl07XHJcbiAgICAgICAgZHN0WzddID0gbVs1XTtcclxuICAgICAgICBkc3RbOF0gPSBtWzhdO1xyXG4gICAgICAgIHJldHVybiBkc3Q7XHJcbiAgICB9LFxyXG4gICAgc2NhbGluZzogZnVuY3Rpb24gKHN4LCBzeSwgc3opIHtcclxuICAgICAgICByZXR1cm4gW3N4LCAwLCAwLCAwLCBzeSwgMCwgMCwgMCwgc3pdO1xyXG4gICAgfSxcclxuICAgIHNjYWxlOiBmdW5jdGlvbiAobSwgc3gsIHN5LCBzeikge1xyXG4gICAgICAgIHJldHVybiBtMy5tdWx0aXBseShtLCBtMy5zY2FsaW5nKHN4LCBzeSwgc3opKTtcclxuICAgIH0sXHJcbiAgICAvKlxyXG4gICAgICAgIDAgMSAyXHJcbiAgICAgICAgMyA0IDVcclxuICAgICAgICA2IDcgOFxyXG4gICAgICAgICovXHJcbiAgICBpbnZlcnNlOiBmdW5jdGlvbiAobSkge1xyXG4gICAgICAgIGNvbnN0IGRldCA9IG1bMF0gKiBtWzRdICogbVs4XSArXHJcbiAgICAgICAgICAgIG1bMl0gKiBtWzNdICogbVs3XSArXHJcbiAgICAgICAgICAgIG1bMV0gKiBtWzVdICogbVs2XSAtXHJcbiAgICAgICAgICAgIG1bMl0gKiBtWzRdICogbVs2XSAtXHJcbiAgICAgICAgICAgIG1bMF0gKiBtWzVdICogbVs3XSAtXHJcbiAgICAgICAgICAgIG1bOF0gKiBtWzNdICogbVsyXTtcclxuICAgICAgICBjb25zdCBkc3QgPSBuZXcgQXJyYXkoOSk7XHJcbiAgICAgICAgZHN0WzBdID0gKG1bNF0gKiBtWzhdIC0gbVs3XSAqIG1bNV0pIC8gZGV0O1xyXG4gICAgICAgIGRzdFsxXSA9IChtWzNdICogbVs4XSAtIG1bNl0gKiBtWzVdKSAvIGRldDtcclxuICAgICAgICBkc3RbMl0gPSAobVszXSAqIG1bN10gLSBtWzZdICogbVs0XSkgLyBkZXQ7XHJcbiAgICAgICAgZHN0WzNdID0gKG1bMV0gKiBtWzhdIC0gbVsyXSAqIG1bN10pIC8gZGV0O1xyXG4gICAgICAgIGRzdFs0XSA9IChtWzBdICogbVs4XSAtIG1bMl0gKiBtWzZdKSAvIGRldDtcclxuICAgICAgICBkc3RbNV0gPSAobVswXSAqIG1bN10gLSBtWzFdICogbVs2XSkgLyBkZXQ7XHJcbiAgICAgICAgZHN0WzZdID0gKG1bMV0gKiBtWzVdIC0gbVsyXSAqIG1bNF0pIC8gZGV0O1xyXG4gICAgICAgIGRzdFs3XSA9IChtWzBdICogbVs1XSAtIG1bMl0gKiBtWzNdKSAvIGRldDtcclxuICAgICAgICBkc3RbOF0gPSAobVswXSAqIG1bNF0gLSBtWzFdICogbVs0XSkgLyBkZXQ7XHJcbiAgICAgICAgcmV0dXJuIGRzdDtcclxuICAgIH0sXHJcbiAgICB0b1N0cmluZyhtKSB7XHJcbiAgICAgICAgcmV0dXJuIG0ucmVkdWNlKChhY2MsIGVsLCBpZHgpID0+IGlkeCAlIDMgPT09IDBcclxuICAgICAgICAgICAgPyAoYWNjICs9IGBcXG4ke2VsLnRvU3RyaW5nKCl9YClcclxuICAgICAgICAgICAgOiAoYWNjICs9IGAgJHtlbC50b1N0cmluZygpfWApLCBcIlwiKTtcclxuICAgIH0sXHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IG0zO1xyXG4iLCJpbXBvcnQgdjMgZnJvbSBcIi4vdjNcIjtcclxuY29uc3QgbTQgPSB7XHJcbiAgICBtdWx0aXBseTogZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICBjb25zdCBhMDAgPSBhWzAgKiA0ICsgMF07XHJcbiAgICAgICAgY29uc3QgYTAxID0gYVswICogNCArIDFdO1xyXG4gICAgICAgIGNvbnN0IGEwMiA9IGFbMCAqIDQgKyAyXTtcclxuICAgICAgICBjb25zdCBhMDMgPSBhWzAgKiA0ICsgM107XHJcbiAgICAgICAgY29uc3QgYTEwID0gYVsxICogNCArIDBdO1xyXG4gICAgICAgIGNvbnN0IGExMSA9IGFbMSAqIDQgKyAxXTtcclxuICAgICAgICBjb25zdCBhMTIgPSBhWzEgKiA0ICsgMl07XHJcbiAgICAgICAgY29uc3QgYTEzID0gYVsxICogNCArIDNdO1xyXG4gICAgICAgIGNvbnN0IGEyMCA9IGFbMiAqIDQgKyAwXTtcclxuICAgICAgICBjb25zdCBhMjEgPSBhWzIgKiA0ICsgMV07XHJcbiAgICAgICAgY29uc3QgYTIyID0gYVsyICogNCArIDJdO1xyXG4gICAgICAgIGNvbnN0IGEyMyA9IGFbMiAqIDQgKyAzXTtcclxuICAgICAgICBjb25zdCBhMzAgPSBhWzMgKiA0ICsgMF07XHJcbiAgICAgICAgY29uc3QgYTMxID0gYVszICogNCArIDFdO1xyXG4gICAgICAgIGNvbnN0IGEzMiA9IGFbMyAqIDQgKyAyXTtcclxuICAgICAgICBjb25zdCBhMzMgPSBhWzMgKiA0ICsgM107XHJcbiAgICAgICAgY29uc3QgYjAwID0gYlswICogNCArIDBdO1xyXG4gICAgICAgIGNvbnN0IGIwMSA9IGJbMCAqIDQgKyAxXTtcclxuICAgICAgICBjb25zdCBiMDIgPSBiWzAgKiA0ICsgMl07XHJcbiAgICAgICAgY29uc3QgYjAzID0gYlswICogNCArIDNdO1xyXG4gICAgICAgIGNvbnN0IGIxMCA9IGJbMSAqIDQgKyAwXTtcclxuICAgICAgICBjb25zdCBiMTEgPSBiWzEgKiA0ICsgMV07XHJcbiAgICAgICAgY29uc3QgYjEyID0gYlsxICogNCArIDJdO1xyXG4gICAgICAgIGNvbnN0IGIxMyA9IGJbMSAqIDQgKyAzXTtcclxuICAgICAgICBjb25zdCBiMjAgPSBiWzIgKiA0ICsgMF07XHJcbiAgICAgICAgY29uc3QgYjIxID0gYlsyICogNCArIDFdO1xyXG4gICAgICAgIGNvbnN0IGIyMiA9IGJbMiAqIDQgKyAyXTtcclxuICAgICAgICBjb25zdCBiMjMgPSBiWzIgKiA0ICsgM107XHJcbiAgICAgICAgY29uc3QgYjMwID0gYlszICogNCArIDBdO1xyXG4gICAgICAgIGNvbnN0IGIzMSA9IGJbMyAqIDQgKyAxXTtcclxuICAgICAgICBjb25zdCBiMzIgPSBiWzMgKiA0ICsgMl07XHJcbiAgICAgICAgY29uc3QgYjMzID0gYlszICogNCArIDNdO1xyXG4gICAgICAgIGNvbnN0IGRzdCA9IFtcclxuICAgICAgICAgICAgYjAwICogYTAwICsgYjAxICogYTEwICsgYjAyICogYTIwICsgYjAzICogYTMwLFxyXG4gICAgICAgICAgICBiMDAgKiBhMDEgKyBiMDEgKiBhMTEgKyBiMDIgKiBhMjEgKyBiMDMgKiBhMzEsXHJcbiAgICAgICAgICAgIGIwMCAqIGEwMiArIGIwMSAqIGExMiArIGIwMiAqIGEyMiArIGIwMyAqIGEzMixcclxuICAgICAgICAgICAgYjAwICogYTAzICsgYjAxICogYTEzICsgYjAyICogYTIzICsgYjAzICogYTMzLFxyXG4gICAgICAgICAgICBiMTAgKiBhMDAgKyBiMTEgKiBhMTAgKyBiMTIgKiBhMjAgKyBiMTMgKiBhMzAsXHJcbiAgICAgICAgICAgIGIxMCAqIGEwMSArIGIxMSAqIGExMSArIGIxMiAqIGEyMSArIGIxMyAqIGEzMSxcclxuICAgICAgICAgICAgYjEwICogYTAyICsgYjExICogYTEyICsgYjEyICogYTIyICsgYjEzICogYTMyLFxyXG4gICAgICAgICAgICBiMTAgKiBhMDMgKyBiMTEgKiBhMTMgKyBiMTIgKiBhMjMgKyBiMTMgKiBhMzMsXHJcbiAgICAgICAgICAgIGIyMCAqIGEwMCArIGIyMSAqIGExMCArIGIyMiAqIGEyMCArIGIyMyAqIGEzMCxcclxuICAgICAgICAgICAgYjIwICogYTAxICsgYjIxICogYTExICsgYjIyICogYTIxICsgYjIzICogYTMxLFxyXG4gICAgICAgICAgICBiMjAgKiBhMDIgKyBiMjEgKiBhMTIgKyBiMjIgKiBhMjIgKyBiMjMgKiBhMzIsXHJcbiAgICAgICAgICAgIGIyMCAqIGEwMyArIGIyMSAqIGExMyArIGIyMiAqIGEyMyArIGIyMyAqIGEzMyxcclxuICAgICAgICAgICAgYjMwICogYTAwICsgYjMxICogYTEwICsgYjMyICogYTIwICsgYjMzICogYTMwLFxyXG4gICAgICAgICAgICBiMzAgKiBhMDEgKyBiMzEgKiBhMTEgKyBiMzIgKiBhMjEgKyBiMzMgKiBhMzEsXHJcbiAgICAgICAgICAgIGIzMCAqIGEwMiArIGIzMSAqIGExMiArIGIzMiAqIGEyMiArIGIzMyAqIGEzMixcclxuICAgICAgICAgICAgYjMwICogYTAzICsgYjMxICogYTEzICsgYjMyICogYTIzICsgYjMzICogYTMzLFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgcmV0dXJuIGRzdDtcclxuICAgIH0sXHJcbiAgICB0cmFuc2xhdGlvbjogZnVuY3Rpb24gKHR4LCB0eSwgdHopIHtcclxuICAgICAgICByZXR1cm4gWzEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIHR4LCB0eSwgdHosIDFdO1xyXG4gICAgfSxcclxuICAgIHhSb3RhdGlvbjogZnVuY3Rpb24gKGFuZ2xlSW5SYWRpYW5zKSB7XHJcbiAgICAgICAgY29uc3QgYyA9IE1hdGguY29zKGFuZ2xlSW5SYWRpYW5zKTtcclxuICAgICAgICBjb25zdCBzID0gTWF0aC5zaW4oYW5nbGVJblJhZGlhbnMpO1xyXG4gICAgICAgIHJldHVybiBbMSwgMCwgMCwgMCwgMCwgYywgcywgMCwgMCwgLXMsIGMsIDAsIDAsIDAsIDAsIDFdO1xyXG4gICAgfSxcclxuICAgIHlSb3RhdGlvbjogZnVuY3Rpb24gKGFuZ2xlSW5SYWRpYW5zKSB7XHJcbiAgICAgICAgY29uc3QgYyA9IE1hdGguY29zKGFuZ2xlSW5SYWRpYW5zKTtcclxuICAgICAgICBjb25zdCBzID0gTWF0aC5zaW4oYW5nbGVJblJhZGlhbnMpO1xyXG4gICAgICAgIHJldHVybiBbYywgMCwgLXMsIDAsIDAsIDEsIDAsIDAsIHMsIDAsIGMsIDAsIDAsIDAsIDAsIDFdO1xyXG4gICAgfSxcclxuICAgIHpSb3RhdGlvbjogZnVuY3Rpb24gKGFuZ2xlSW5SYWRpYW5zKSB7XHJcbiAgICAgICAgY29uc3QgYyA9IE1hdGguY29zKGFuZ2xlSW5SYWRpYW5zKTtcclxuICAgICAgICBjb25zdCBzID0gTWF0aC5zaW4oYW5nbGVJblJhZGlhbnMpO1xyXG4gICAgICAgIHJldHVybiBbYywgcywgMCwgMCwgLXMsIGMsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDFdO1xyXG4gICAgfSxcclxuICAgIHNjYWxpbmc6IGZ1bmN0aW9uIChzeCwgc3ksIHN6KSB7XHJcbiAgICAgICAgcmV0dXJuIFtzeCwgMCwgMCwgMCwgMCwgc3ksIDAsIDAsIDAsIDAsIHN6LCAwLCAwLCAwLCAwLCAxXTtcclxuICAgIH0sXHJcbiAgICB0cmFuc2xhdGU6IGZ1bmN0aW9uIChtLCB0eCwgdHksIHR6KSB7XHJcbiAgICAgICAgcmV0dXJuIG00Lm11bHRpcGx5KG0sIG00LnRyYW5zbGF0aW9uKHR4LCB0eSwgdHopKTtcclxuICAgIH0sXHJcbiAgICB4Um90YXRlOiBmdW5jdGlvbiAobSwgYW5nbGVJblJhZGlhbnMpIHtcclxuICAgICAgICByZXR1cm4gbTQubXVsdGlwbHkobSwgbTQueFJvdGF0aW9uKGFuZ2xlSW5SYWRpYW5zKSk7XHJcbiAgICB9LFxyXG4gICAgeVJvdGF0ZTogZnVuY3Rpb24gKG0sIGFuZ2xlSW5SYWRpYW5zKSB7XHJcbiAgICAgICAgcmV0dXJuIG00Lm11bHRpcGx5KG0sIG00LnlSb3RhdGlvbihhbmdsZUluUmFkaWFucykpO1xyXG4gICAgfSxcclxuICAgIHpSb3RhdGU6IGZ1bmN0aW9uIChtLCBhbmdsZUluUmFkaWFucykge1xyXG4gICAgICAgIHJldHVybiBtNC5tdWx0aXBseShtLCBtNC56Um90YXRpb24oYW5nbGVJblJhZGlhbnMpKTtcclxuICAgIH0sXHJcbiAgICBzY2FsZTogZnVuY3Rpb24gKG0sIHN4LCBzeSwgc3opIHtcclxuICAgICAgICByZXR1cm4gbTQubXVsdGlwbHkobSwgbTQuc2NhbGluZyhzeCwgc3ksIHN6KSk7XHJcbiAgICB9LFxyXG4gICAgbWFrZU9ydDogZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICBjb25zdCBvID0gWzAsIDAsIDBdO1xyXG4gICAgICAgIGNvbnN0IG5vcm0gPSBNYXRoLnNxcnQodlswXSAqIHZbMF0gKyB2WzFdICogdlsxXSArIHZbMl0gKiB2WzJdKTtcclxuICAgICAgICBvWzBdID0gdlswXSAvIG5vcm07XHJcbiAgICAgICAgb1sxXSA9IHZbMV0gLyBub3JtO1xyXG4gICAgICAgIG9bMl0gPSB2WzJdIC8gbm9ybTtcclxuICAgICAgICByZXR1cm4gbztcclxuICAgIH0sXHJcbiAgICBwcm9qZWN0aW9uOiBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCwgZGVwdGgpIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAyIC8gd2lkdGgsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIC0yIC8gaGVpZ2h0LFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAyIC8gZGVwdGgsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIC0xLFxyXG4gICAgICAgICAgICAxLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAxLFxyXG4gICAgICAgIF07XHJcbiAgICB9LFxyXG4gICAgcGVyc3BlY3RpdmU6IGZ1bmN0aW9uIChmaWVsZE9mVmlld0luUmFkaWFucywgYXNwZWN0LCBuZWFyLCBmYXIpIHtcclxuICAgICAgICBjb25zdCBmID0gTWF0aC50YW4oTWF0aC5QSSAqIDAuNSAtIDAuNSAqIGZpZWxkT2ZWaWV3SW5SYWRpYW5zKTtcclxuICAgICAgICBjb25zdCByYW5nZUludiA9IDEuMCAvIChuZWFyIC0gZmFyKTtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBmIC8gYXNwZWN0LFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICBmLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAobmVhciArIGZhcikgKiByYW5nZUludixcclxuICAgICAgICAgICAgLTEsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIG5lYXIgKiBmYXIgKiByYW5nZUludiAqIDIsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgXTtcclxuICAgIH0sXHJcbiAgICBpbnZlcnNlOiBmdW5jdGlvbiAobSkge1xyXG4gICAgICAgIGNvbnN0IG0wMCA9IG1bMCAqIDQgKyAwXTtcclxuICAgICAgICBjb25zdCBtMDEgPSBtWzAgKiA0ICsgMV07XHJcbiAgICAgICAgY29uc3QgbTAyID0gbVswICogNCArIDJdO1xyXG4gICAgICAgIGNvbnN0IG0wMyA9IG1bMCAqIDQgKyAzXTtcclxuICAgICAgICBjb25zdCBtMTAgPSBtWzEgKiA0ICsgMF07XHJcbiAgICAgICAgY29uc3QgbTExID0gbVsxICogNCArIDFdO1xyXG4gICAgICAgIGNvbnN0IG0xMiA9IG1bMSAqIDQgKyAyXTtcclxuICAgICAgICBjb25zdCBtMTMgPSBtWzEgKiA0ICsgM107XHJcbiAgICAgICAgY29uc3QgbTIwID0gbVsyICogNCArIDBdO1xyXG4gICAgICAgIGNvbnN0IG0yMSA9IG1bMiAqIDQgKyAxXTtcclxuICAgICAgICBjb25zdCBtMjIgPSBtWzIgKiA0ICsgMl07XHJcbiAgICAgICAgY29uc3QgbTIzID0gbVsyICogNCArIDNdO1xyXG4gICAgICAgIGNvbnN0IG0zMCA9IG1bMyAqIDQgKyAwXTtcclxuICAgICAgICBjb25zdCBtMzEgPSBtWzMgKiA0ICsgMV07XHJcbiAgICAgICAgY29uc3QgbTMyID0gbVszICogNCArIDJdO1xyXG4gICAgICAgIGNvbnN0IG0zMyA9IG1bMyAqIDQgKyAzXTtcclxuICAgICAgICBjb25zdCB0bXBfMCA9IG0yMiAqIG0zMztcclxuICAgICAgICBjb25zdCB0bXBfMSA9IG0zMiAqIG0yMztcclxuICAgICAgICBjb25zdCB0bXBfMiA9IG0xMiAqIG0zMztcclxuICAgICAgICBjb25zdCB0bXBfMyA9IG0zMiAqIG0xMztcclxuICAgICAgICBjb25zdCB0bXBfNCA9IG0xMiAqIG0yMztcclxuICAgICAgICBjb25zdCB0bXBfNSA9IG0yMiAqIG0xMztcclxuICAgICAgICBjb25zdCB0bXBfNiA9IG0wMiAqIG0zMztcclxuICAgICAgICBjb25zdCB0bXBfNyA9IG0zMiAqIG0wMztcclxuICAgICAgICBjb25zdCB0bXBfOCA9IG0wMiAqIG0yMztcclxuICAgICAgICBjb25zdCB0bXBfOSA9IG0yMiAqIG0wMztcclxuICAgICAgICBjb25zdCB0bXBfMTAgPSBtMDIgKiBtMTM7XHJcbiAgICAgICAgY29uc3QgdG1wXzExID0gbTEyICogbTAzO1xyXG4gICAgICAgIGNvbnN0IHRtcF8xMiA9IG0yMCAqIG0zMTtcclxuICAgICAgICBjb25zdCB0bXBfMTMgPSBtMzAgKiBtMjE7XHJcbiAgICAgICAgY29uc3QgdG1wXzE0ID0gbTEwICogbTMxO1xyXG4gICAgICAgIGNvbnN0IHRtcF8xNSA9IG0zMCAqIG0xMTtcclxuICAgICAgICBjb25zdCB0bXBfMTYgPSBtMTAgKiBtMjE7XHJcbiAgICAgICAgY29uc3QgdG1wXzE3ID0gbTIwICogbTExO1xyXG4gICAgICAgIGNvbnN0IHRtcF8xOCA9IG0wMCAqIG0zMTtcclxuICAgICAgICBjb25zdCB0bXBfMTkgPSBtMzAgKiBtMDE7XHJcbiAgICAgICAgY29uc3QgdG1wXzIwID0gbTAwICogbTIxO1xyXG4gICAgICAgIGNvbnN0IHRtcF8yMSA9IG0yMCAqIG0wMTtcclxuICAgICAgICBjb25zdCB0bXBfMjIgPSBtMDAgKiBtMTE7XHJcbiAgICAgICAgY29uc3QgdG1wXzIzID0gbTEwICogbTAxO1xyXG4gICAgICAgIGNvbnN0IHQwID0gdG1wXzAgKiBtMTEgK1xyXG4gICAgICAgICAgICB0bXBfMyAqIG0yMSArXHJcbiAgICAgICAgICAgIHRtcF80ICogbTMxIC1cclxuICAgICAgICAgICAgKHRtcF8xICogbTExICsgdG1wXzIgKiBtMjEgKyB0bXBfNSAqIG0zMSk7XHJcbiAgICAgICAgY29uc3QgdDEgPSB0bXBfMSAqIG0wMSArXHJcbiAgICAgICAgICAgIHRtcF82ICogbTIxICtcclxuICAgICAgICAgICAgdG1wXzkgKiBtMzEgLVxyXG4gICAgICAgICAgICAodG1wXzAgKiBtMDEgKyB0bXBfNyAqIG0yMSArIHRtcF84ICogbTMxKTtcclxuICAgICAgICBjb25zdCB0MiA9IHRtcF8yICogbTAxICtcclxuICAgICAgICAgICAgdG1wXzcgKiBtMTEgK1xyXG4gICAgICAgICAgICB0bXBfMTAgKiBtMzEgLVxyXG4gICAgICAgICAgICAodG1wXzMgKiBtMDEgKyB0bXBfNiAqIG0xMSArIHRtcF8xMSAqIG0zMSk7XHJcbiAgICAgICAgY29uc3QgdDMgPSB0bXBfNSAqIG0wMSArXHJcbiAgICAgICAgICAgIHRtcF84ICogbTExICtcclxuICAgICAgICAgICAgdG1wXzExICogbTIxIC1cclxuICAgICAgICAgICAgKHRtcF80ICogbTAxICsgdG1wXzkgKiBtMTEgKyB0bXBfMTAgKiBtMjEpO1xyXG4gICAgICAgIGNvbnN0IGQgPSAxLjAgLyAobTAwICogdDAgKyBtMTAgKiB0MSArIG0yMCAqIHQyICsgbTMwICogdDMpO1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIGQgKiB0MCxcclxuICAgICAgICAgICAgZCAqIHQxLFxyXG4gICAgICAgICAgICBkICogdDIsXHJcbiAgICAgICAgICAgIGQgKiB0MyxcclxuICAgICAgICAgICAgZCAqXHJcbiAgICAgICAgICAgICAgICAodG1wXzEgKiBtMTAgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF8yICogbTIwICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfNSAqIG0zMCAtXHJcbiAgICAgICAgICAgICAgICAgICAgKHRtcF8wICogbTEwICsgdG1wXzMgKiBtMjAgKyB0bXBfNCAqIG0zMCkpLFxyXG4gICAgICAgICAgICBkICpcclxuICAgICAgICAgICAgICAgICh0bXBfMCAqIG0wMCArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzcgKiBtMjAgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF84ICogbTMwIC1cclxuICAgICAgICAgICAgICAgICAgICAodG1wXzEgKiBtMDAgKyB0bXBfNiAqIG0yMCArIHRtcF85ICogbTMwKSksXHJcbiAgICAgICAgICAgIGQgKlxyXG4gICAgICAgICAgICAgICAgKHRtcF8zICogbTAwICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfNiAqIG0xMCArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzExICogbTMwIC1cclxuICAgICAgICAgICAgICAgICAgICAodG1wXzIgKiBtMDAgKyB0bXBfNyAqIG0xMCArIHRtcF8xMCAqIG0zMCkpLFxyXG4gICAgICAgICAgICBkICpcclxuICAgICAgICAgICAgICAgICh0bXBfNCAqIG0wMCArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzkgKiBtMTAgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF8xMCAqIG0yMCAtXHJcbiAgICAgICAgICAgICAgICAgICAgKHRtcF81ICogbTAwICsgdG1wXzggKiBtMTAgKyB0bXBfMTEgKiBtMjApKSxcclxuICAgICAgICAgICAgZCAqXHJcbiAgICAgICAgICAgICAgICAodG1wXzEyICogbTEzICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfMTUgKiBtMjMgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF8xNiAqIG0zMyAtXHJcbiAgICAgICAgICAgICAgICAgICAgKHRtcF8xMyAqIG0xMyArIHRtcF8xNCAqIG0yMyArIHRtcF8xNyAqIG0zMykpLFxyXG4gICAgICAgICAgICBkICpcclxuICAgICAgICAgICAgICAgICh0bXBfMTMgKiBtMDMgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF8xOCAqIG0yMyArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzIxICogbTMzIC1cclxuICAgICAgICAgICAgICAgICAgICAodG1wXzEyICogbTAzICsgdG1wXzE5ICogbTIzICsgdG1wXzIwICogbTMzKSksXHJcbiAgICAgICAgICAgIGQgKlxyXG4gICAgICAgICAgICAgICAgKHRtcF8xNCAqIG0wMyArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzE5ICogbTEzICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfMjIgKiBtMzMgLVxyXG4gICAgICAgICAgICAgICAgICAgICh0bXBfMTUgKiBtMDMgKyB0bXBfMTggKiBtMTMgKyB0bXBfMjMgKiBtMzMpKSxcclxuICAgICAgICAgICAgZCAqXHJcbiAgICAgICAgICAgICAgICAodG1wXzE3ICogbTAzICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfMjAgKiBtMTMgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF8yMyAqIG0yMyAtXHJcbiAgICAgICAgICAgICAgICAgICAgKHRtcF8xNiAqIG0wMyArIHRtcF8yMSAqIG0xMyArIHRtcF8yMiAqIG0yMykpLFxyXG4gICAgICAgICAgICBkICpcclxuICAgICAgICAgICAgICAgICh0bXBfMTQgKiBtMjIgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF8xNyAqIG0zMiArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzEzICogbTEyIC1cclxuICAgICAgICAgICAgICAgICAgICAodG1wXzE2ICogbTMyICsgdG1wXzEyICogbTEyICsgdG1wXzE1ICogbTIyKSksXHJcbiAgICAgICAgICAgIGQgKlxyXG4gICAgICAgICAgICAgICAgKHRtcF8yMCAqIG0zMiArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzEyICogbTAyICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfMTkgKiBtMjIgLVxyXG4gICAgICAgICAgICAgICAgICAgICh0bXBfMTggKiBtMjIgKyB0bXBfMjEgKiBtMzIgKyB0bXBfMTMgKiBtMDIpKSxcclxuICAgICAgICAgICAgZCAqXHJcbiAgICAgICAgICAgICAgICAodG1wXzE4ICogbTEyICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfMjMgKiBtMzIgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF8xNSAqIG0wMiAtXHJcbiAgICAgICAgICAgICAgICAgICAgKHRtcF8yMiAqIG0zMiArIHRtcF8xNCAqIG0wMiArIHRtcF8xOSAqIG0xMikpLFxyXG4gICAgICAgICAgICBkICpcclxuICAgICAgICAgICAgICAgICh0bXBfMjIgKiBtMjIgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF8xNiAqIG0wMiArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzIxICogbTEyIC1cclxuICAgICAgICAgICAgICAgICAgICAodG1wXzIwICogbTEyICsgdG1wXzIzICogbTIyICsgdG1wXzE3ICogbTAyKSksXHJcbiAgICAgICAgXTtcclxuICAgIH0sXHJcbiAgICBsb29rQXQ6IGZ1bmN0aW9uIChjYW1lcmFQb3NpdGlvbiwgdGFyZ2V0LCB1cCkge1xyXG4gICAgICAgIGNvbnN0IHpBeGlzID0gdjMubm9ybWFsaXplKHYzLmRpZmYoY2FtZXJhUG9zaXRpb24sIHRhcmdldCkpO1xyXG4gICAgICAgIGNvbnN0IHhBeGlzID0gdjMubm9ybWFsaXplKHYzLmNyb3NzKHVwLCB6QXhpcykpO1xyXG4gICAgICAgIGNvbnN0IHlBeGlzID0gdjMubm9ybWFsaXplKHYzLmNyb3NzKHpBeGlzLCB4QXhpcykpO1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIHhBeGlzWzBdLFxyXG4gICAgICAgICAgICB4QXhpc1sxXSxcclxuICAgICAgICAgICAgeEF4aXNbMl0sXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIHlBeGlzWzBdLFxyXG4gICAgICAgICAgICB5QXhpc1sxXSxcclxuICAgICAgICAgICAgeUF4aXNbMl0sXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIHpBeGlzWzBdLFxyXG4gICAgICAgICAgICB6QXhpc1sxXSxcclxuICAgICAgICAgICAgekF4aXNbMl0sXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIGNhbWVyYVBvc2l0aW9uWzBdLFxyXG4gICAgICAgICAgICBjYW1lcmFQb3NpdGlvblsxXSxcclxuICAgICAgICAgICAgY2FtZXJhUG9zaXRpb25bMl0sXHJcbiAgICAgICAgICAgIDEsXHJcbiAgICAgICAgXTtcclxuICAgIH0sXHJcbiAgICBjb3B5OiBmdW5jdGlvbiAoc3JjKSB7XHJcbiAgICAgICAgcmV0dXJuIFsuLi5zcmNdO1xyXG4gICAgfSxcclxuICAgIHRyYW5zZm9ybVBvaW50OiBmdW5jdGlvbiAobSwgdiwgZHN0KSB7XHJcbiAgICAgICAgZHN0ID0gZHN0IHx8IG5ldyBBcnJheSgzKTtcclxuICAgICAgICBjb25zdCB2MCA9IHZbMF07XHJcbiAgICAgICAgY29uc3QgdjEgPSB2WzFdO1xyXG4gICAgICAgIGNvbnN0IHYyID0gdlsyXTtcclxuICAgICAgICBjb25zdCBkID0gdjAgKiBtWzAgKiA0ICsgM10gKyB2MSAqIG1bMSAqIDQgKyAzXSArIHYyICogbVsyICogNCArIDNdICsgbVszICogNCArIDNdO1xyXG4gICAgICAgIGRzdFswXSA9XHJcbiAgICAgICAgICAgICh2MCAqIG1bMCAqIDQgKyAwXSArXHJcbiAgICAgICAgICAgICAgICB2MSAqIG1bMSAqIDQgKyAwXSArXHJcbiAgICAgICAgICAgICAgICB2MiAqIG1bMiAqIDQgKyAwXSArXHJcbiAgICAgICAgICAgICAgICBtWzMgKiA0ICsgMF0pIC9cclxuICAgICAgICAgICAgICAgIGQ7XHJcbiAgICAgICAgZHN0WzFdID1cclxuICAgICAgICAgICAgKHYwICogbVswICogNCArIDFdICtcclxuICAgICAgICAgICAgICAgIHYxICogbVsxICogNCArIDFdICtcclxuICAgICAgICAgICAgICAgIHYyICogbVsyICogNCArIDFdICtcclxuICAgICAgICAgICAgICAgIG1bMyAqIDQgKyAxXSkgL1xyXG4gICAgICAgICAgICAgICAgZDtcclxuICAgICAgICBkc3RbMl0gPVxyXG4gICAgICAgICAgICAodjAgKiBtWzAgKiA0ICsgMl0gK1xyXG4gICAgICAgICAgICAgICAgdjEgKiBtWzEgKiA0ICsgMl0gK1xyXG4gICAgICAgICAgICAgICAgdjIgKiBtWzIgKiA0ICsgMl0gK1xyXG4gICAgICAgICAgICAgICAgbVszICogNCArIDJdKSAvXHJcbiAgICAgICAgICAgICAgICBkO1xyXG4gICAgICAgIHJldHVybiBkc3Q7XHJcbiAgICB9LFxyXG4gICAgaWRlbnRpdHk6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zdCBkc3QgPSBuZXcgQXJyYXkoMTYpO1xyXG4gICAgICAgIGRzdFswXSA9IDE7XHJcbiAgICAgICAgZHN0WzFdID0gMDtcclxuICAgICAgICBkc3RbMl0gPSAwO1xyXG4gICAgICAgIGRzdFszXSA9IDA7XHJcbiAgICAgICAgZHN0WzRdID0gMDtcclxuICAgICAgICBkc3RbNV0gPSAxO1xyXG4gICAgICAgIGRzdFs2XSA9IDA7XHJcbiAgICAgICAgZHN0WzddID0gMDtcclxuICAgICAgICBkc3RbOF0gPSAwO1xyXG4gICAgICAgIGRzdFs5XSA9IDA7XHJcbiAgICAgICAgZHN0WzEwXSA9IDE7XHJcbiAgICAgICAgZHN0WzExXSA9IDA7XHJcbiAgICAgICAgZHN0WzEyXSA9IDA7XHJcbiAgICAgICAgZHN0WzEzXSA9IDA7XHJcbiAgICAgICAgZHN0WzE0XSA9IDA7XHJcbiAgICAgICAgZHN0WzE1XSA9IDE7XHJcbiAgICAgICAgcmV0dXJuIGRzdDtcclxuICAgIH0sXHJcbiAgICBtM1RvbTQ6IGZ1bmN0aW9uIChtKSB7XHJcbiAgICAgICAgY29uc3QgZHN0ID0gbmV3IEFycmF5KDE2KTtcclxuICAgICAgICBkc3RbMF0gPSBtWzBdO1xyXG4gICAgICAgIGRzdFsxXSA9IG1bMV07XHJcbiAgICAgICAgZHN0WzJdID0gbVsyXTtcclxuICAgICAgICBkc3RbM10gPSAwO1xyXG4gICAgICAgIGRzdFs0XSA9IG1bM107XHJcbiAgICAgICAgZHN0WzVdID0gbVs0XTtcclxuICAgICAgICBkc3RbNl0gPSBtWzVdO1xyXG4gICAgICAgIGRzdFs3XSA9IDA7XHJcbiAgICAgICAgZHN0WzhdID0gbVs2XTtcclxuICAgICAgICBkc3RbOV0gPSBtWzddO1xyXG4gICAgICAgIGRzdFsxMF0gPSBtWzhdO1xyXG4gICAgICAgIGRzdFsxMV0gPSAwO1xyXG4gICAgICAgIGRzdFsxMl0gPSAwO1xyXG4gICAgICAgIGRzdFsxM10gPSAwO1xyXG4gICAgICAgIGRzdFsxNF0gPSAwO1xyXG4gICAgICAgIGRzdFsxNV0gPSAxO1xyXG4gICAgICAgIHJldHVybiBkc3Q7XHJcbiAgICB9LFxyXG4gICAgbTRUb20zOiBmdW5jdGlvbiAobSkge1xyXG4gICAgICAgIGNvbnN0IGRzdCA9IG5ldyBBcnJheSg5KTtcclxuICAgICAgICBkc3RbMF0gPSBtWzBdO1xyXG4gICAgICAgIGRzdFsxXSA9IG1bMV07XHJcbiAgICAgICAgZHN0WzJdID0gbVsyXTtcclxuICAgICAgICBkc3RbM10gPSBtWzRdO1xyXG4gICAgICAgIGRzdFs0XSA9IG1bNV07XHJcbiAgICAgICAgZHN0WzVdID0gbVs2XTtcclxuICAgICAgICBkc3RbNl0gPSBtWzhdO1xyXG4gICAgICAgIGRzdFs3XSA9IG1bOV07XHJcbiAgICAgICAgZHN0WzhdID0gbVsxMF07XHJcbiAgICAgICAgcmV0dXJuIGRzdDtcclxuICAgIH0sXHJcbiAgICB0b1N0cmluZyhtKSB7XHJcbiAgICAgICAgcmV0dXJuIG0ucmVkdWNlKChhY2MsIGVsLCBpZHgpID0+IGlkeCAlIDQgPT09IDBcclxuICAgICAgICAgICAgPyAoYWNjICs9IGBcXG4ke2VsLnRvU3RyaW5nKCl9YClcclxuICAgICAgICAgICAgOiAoYWNjICs9IGAgJHtlbC50b1N0cmluZygpfWApLCBcIlwiKTtcclxuICAgIH0sXHJcbiAgICB0cmFuc3Bvc2U6IGZ1bmN0aW9uIChtKSB7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgbVswXSxcclxuICAgICAgICAgICAgbVs0XSxcclxuICAgICAgICAgICAgbVs4XSxcclxuICAgICAgICAgICAgbVsxMl0sXHJcbiAgICAgICAgICAgIG1bMV0sXHJcbiAgICAgICAgICAgIG1bNV0sXHJcbiAgICAgICAgICAgIG1bOV0sXHJcbiAgICAgICAgICAgIG1bMTNdLFxyXG4gICAgICAgICAgICBtWzJdLFxyXG4gICAgICAgICAgICBtWzZdLFxyXG4gICAgICAgICAgICBtWzEwXSxcclxuICAgICAgICAgICAgbVsxNF0sXHJcbiAgICAgICAgICAgIG1bM10sXHJcbiAgICAgICAgICAgIG1bN10sXHJcbiAgICAgICAgICAgIG1bMTFdLFxyXG4gICAgICAgICAgICBtWzE1XSxcclxuICAgICAgICBdO1xyXG4gICAgfSxcclxuICAgIGZyb21RdWF0ZXJuaW9uOiAocSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGExMSA9IDEgLSAyICogKHFbMV0gKiBxWzFdICsgcVsyXSAqIHFbMl0pO1xyXG4gICAgICAgIGNvbnN0IGExMiA9IDIgKiAocVswXSAqIHFbMV0gLSBxWzJdICogcVszXSk7XHJcbiAgICAgICAgY29uc3QgYTEzID0gMiAqIChxWzBdICogcVsyXSArIHFbMV0gKiBxWzNdKTtcclxuICAgICAgICBjb25zdCBhMjEgPSAyICogKHFbMF0gKiBxWzFdICsgcVsyXSAqIHFbM10pO1xyXG4gICAgICAgIGNvbnN0IGEyMiA9IDEgLSAyICogKHFbMF0gKiBxWzBdICsgcVsyXSAqIHFbMl0pO1xyXG4gICAgICAgIGNvbnN0IGEyMyA9IDIgKiAocVsxXSAqIHFbMl0gLSBxWzBdICogcVszXSk7XHJcbiAgICAgICAgY29uc3QgYTMxID0gMiAqIChxWzBdICogcVsyXSAtIHFbMV0gKiBxWzNdKTtcclxuICAgICAgICBjb25zdCBhMzIgPSAyICogKHFbMV0gKiBxWzJdICsgcVswXSAqIHFbM10pO1xyXG4gICAgICAgIGNvbnN0IGEzMyA9IDEgLSAyICogKHFbMF0gKiBxWzBdICsgcVsxXSAqIHFbMV0pO1xyXG4gICAgICAgIHJldHVybiBbYTExLCBhMTIsIGExMywgMCwgYTIxLCBhMjIsIGEyMywgMCwgYTMxLCBhMzIsIGEzMywgMCwgMCwgMCwgMCwgMV07XHJcbiAgICB9LFxyXG4gICAgLypcclxuICAgIHJvdGF0aW9uKHgsIHksIHopIHtcclxuICAgICAgcmV0dXJuIHRoaXMueFJvdGF0ZSh0aGlzLnlSb3RhdGUodGhpcy56Um90YXRpb24oeiksIHkpLCB4KTtcclxuICAgIH0sXHJcbiAgICByb3RhdGlvbkZyb21Ob3JtYWwobikge1xyXG4gICAgICByZXR1cm4gdGhpcy5yb3RhdGlvbihNYXRoLmFjb3MoblsxXSksIE1hdGguYWNvcyhuWzJdKSwgTWF0aC5hY29zKG5bMF0pKTtcclxuICAgIH0sKi9cclxuICAgIGRldGVybWluYXRlKG0pIHtcclxuICAgICAgICBjb25zdCBtMDAgPSBtWzAgKiA0ICsgMF07XHJcbiAgICAgICAgY29uc3QgbTAxID0gbVswICogNCArIDFdO1xyXG4gICAgICAgIGNvbnN0IG0wMiA9IG1bMCAqIDQgKyAyXTtcclxuICAgICAgICBjb25zdCBtMDMgPSBtWzAgKiA0ICsgM107XHJcbiAgICAgICAgY29uc3QgbTEwID0gbVsxICogNCArIDBdO1xyXG4gICAgICAgIGNvbnN0IG0xMSA9IG1bMSAqIDQgKyAxXTtcclxuICAgICAgICBjb25zdCBtMTIgPSBtWzEgKiA0ICsgMl07XHJcbiAgICAgICAgY29uc3QgbTEzID0gbVsxICogNCArIDNdO1xyXG4gICAgICAgIGNvbnN0IG0yMCA9IG1bMiAqIDQgKyAwXTtcclxuICAgICAgICBjb25zdCBtMjEgPSBtWzIgKiA0ICsgMV07XHJcbiAgICAgICAgY29uc3QgbTIyID0gbVsyICogNCArIDJdO1xyXG4gICAgICAgIGNvbnN0IG0yMyA9IG1bMiAqIDQgKyAzXTtcclxuICAgICAgICBjb25zdCBtMzAgPSBtWzMgKiA0ICsgMF07XHJcbiAgICAgICAgY29uc3QgbTMxID0gbVszICogNCArIDFdO1xyXG4gICAgICAgIGNvbnN0IG0zMiA9IG1bMyAqIDQgKyAyXTtcclxuICAgICAgICBjb25zdCBtMzMgPSBtWzMgKiA0ICsgM107XHJcbiAgICAgICAgY29uc3QgdG1wXzAgPSBtMjIgKiBtMzM7XHJcbiAgICAgICAgY29uc3QgdG1wXzEgPSBtMzIgKiBtMjM7XHJcbiAgICAgICAgY29uc3QgdG1wXzIgPSBtMTIgKiBtMzM7XHJcbiAgICAgICAgY29uc3QgdG1wXzMgPSBtMzIgKiBtMTM7XHJcbiAgICAgICAgY29uc3QgdG1wXzQgPSBtMTIgKiBtMjM7XHJcbiAgICAgICAgY29uc3QgdG1wXzUgPSBtMjIgKiBtMTM7XHJcbiAgICAgICAgY29uc3QgdG1wXzYgPSBtMDIgKiBtMzM7XHJcbiAgICAgICAgY29uc3QgdG1wXzcgPSBtMzIgKiBtMDM7XHJcbiAgICAgICAgY29uc3QgdG1wXzggPSBtMDIgKiBtMjM7XHJcbiAgICAgICAgY29uc3QgdG1wXzkgPSBtMjIgKiBtMDM7XHJcbiAgICAgICAgY29uc3QgdG1wXzEwID0gbTAyICogbTEzO1xyXG4gICAgICAgIGNvbnN0IHRtcF8xMSA9IG0xMiAqIG0wMztcclxuICAgICAgICBjb25zdCB0MCA9IHRtcF8wICogbTExICtcclxuICAgICAgICAgICAgdG1wXzMgKiBtMjEgK1xyXG4gICAgICAgICAgICB0bXBfNCAqIG0zMSAtXHJcbiAgICAgICAgICAgICh0bXBfMSAqIG0xMSArIHRtcF8yICogbTIxICsgdG1wXzUgKiBtMzEpO1xyXG4gICAgICAgIGNvbnN0IHQxID0gdG1wXzEgKiBtMDEgK1xyXG4gICAgICAgICAgICB0bXBfNiAqIG0yMSArXHJcbiAgICAgICAgICAgIHRtcF85ICogbTMxIC1cclxuICAgICAgICAgICAgKHRtcF8wICogbTAxICsgdG1wXzcgKiBtMjEgKyB0bXBfOCAqIG0zMSk7XHJcbiAgICAgICAgY29uc3QgdDIgPSB0bXBfMiAqIG0wMSArXHJcbiAgICAgICAgICAgIHRtcF83ICogbTExICtcclxuICAgICAgICAgICAgdG1wXzEwICogbTMxIC1cclxuICAgICAgICAgICAgKHRtcF8zICogbTAxICsgdG1wXzYgKiBtMTEgKyB0bXBfMTEgKiBtMzEpO1xyXG4gICAgICAgIGNvbnN0IHQzID0gdG1wXzUgKiBtMDEgK1xyXG4gICAgICAgICAgICB0bXBfOCAqIG0xMSArXHJcbiAgICAgICAgICAgIHRtcF8xMSAqIG0yMSAtXHJcbiAgICAgICAgICAgICh0bXBfNCAqIG0wMSArIHRtcF85ICogbTExICsgdG1wXzEwICogbTIxKTtcclxuICAgICAgICByZXR1cm4gMS4wIC8gKG0wMCAqIHQwICsgbTEwICogdDEgKyBtMjAgKiB0MiArIG0zMCAqIHQzKTtcclxuICAgIH0sXHJcbiAgICBkZWNvbXBvc2UobSkge1xyXG4gICAgICAgIGxldCBzeCA9IHYzLm5vcm0obS5zbGljZSgwLCAzKSk7XHJcbiAgICAgICAgY29uc3Qgc3kgPSB2My5ub3JtKG0uc2xpY2UoNCwgNykpO1xyXG4gICAgICAgIGNvbnN0IHN6ID0gdjMubm9ybShtLnNsaWNlKDgsIDExKSk7XHJcbiAgICAgICAgY29uc3QgZGV0ID0gdGhpcy5kZXRlcm1pbmF0ZShtKTtcclxuICAgICAgICBpZiAoZGV0IDwgMCkge1xyXG4gICAgICAgICAgICBzeCA9IC1zeDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdHJhbnNsYXRpb24gPSBuZXcgQXJyYXkoMyk7XHJcbiAgICAgICAgY29uc3Qgc2NhbGUgPSBuZXcgQXJyYXkoMyk7XHJcbiAgICAgICAgY29uc3QgUm1hdHJpeCA9IFsuLi5tXTtcclxuICAgICAgICB0cmFuc2xhdGlvblswXSA9IG1bMTJdO1xyXG4gICAgICAgIHRyYW5zbGF0aW9uWzFdID0gbVsxM107XHJcbiAgICAgICAgdHJhbnNsYXRpb25bMl0gPSBtWzE0XTtcclxuICAgICAgICBjb25zdCBpbnZTWCA9IDEgLyBzeDtcclxuICAgICAgICBjb25zdCBpbnZTWSA9IDEgLyBzeTtcclxuICAgICAgICBjb25zdCBpbnZTWiA9IDEgLyBzejtcclxuICAgICAgICBSbWF0cml4WzBdICo9IGludlNYO1xyXG4gICAgICAgIFJtYXRyaXhbMV0gKj0gaW52U1g7XHJcbiAgICAgICAgUm1hdHJpeFsyXSAqPSBpbnZTWDtcclxuICAgICAgICBSbWF0cml4WzRdICo9IGludlNZO1xyXG4gICAgICAgIFJtYXRyaXhbNV0gKj0gaW52U1k7XHJcbiAgICAgICAgUm1hdHJpeFs2XSAqPSBpbnZTWTtcclxuICAgICAgICBSbWF0cml4WzhdICo9IGludlNaO1xyXG4gICAgICAgIFJtYXRyaXhbOV0gKj0gaW52U1o7XHJcbiAgICAgICAgUm1hdHJpeFsxMF0gKj0gaW52U1o7XHJcbiAgICAgICAgc2NhbGVbMF0gPSBzeDtcclxuICAgICAgICBzY2FsZVsxXSA9IHN5O1xyXG4gICAgICAgIHNjYWxlWzJdID0gc3o7XHJcbiAgICAgICAgcmV0dXJuIHsgdHJhbnNsYXRpb24sIFJtYXRyaXgsIHNjYWxlIH07XHJcbiAgICB9LFxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBtNDtcclxuIiwiY29uc3QgZG90ID0gKGEsIGIpID0+IGFbMF0gKiBiWzBdICsgYVsxXSAqIGJbMV0gKyBhWzJdICogYlsyXTtcclxuY29uc3QgY3Jvc3MgPSAoYSwgYikgPT4gW1xyXG4gICAgYVsxXSAqIGJbMl0gLSBiWzFdICogYVsyXSxcclxuICAgIGFbMl0gKiBiWzBdIC0gYlsyXSAqIGFbMF0sXHJcbiAgICBhWzBdICogYlsxXSAtIGJbMF0gKiBhWzFdLFxyXG5dO1xyXG5jb25zdCBzY2FsZSA9IChhLCBzY2FsYXIpID0+IFthWzBdICogc2NhbGFyLCBhWzFdICogc2NhbGFyLCBhWzJdICogc2NhbGFyXTtcclxuY29uc3Qgc3VtID0gKGEsIGIpID0+IFthWzBdICsgYlswXSwgYVsxXSArIGJbMV0sIGFbMl0gKyBiWzJdXTtcclxuY29uc3QgZGlmZiA9IChhLCBiKSA9PiBbYVswXSAtIGJbMF0sIGFbMV0gLSBiWzFdLCBhWzJdIC0gYlsyXV07XHJcbmNvbnN0IG5vcm0gPSAoYSkgPT4gTWF0aC5zcXJ0KGFbMF0gKiBhWzBdICsgYVsxXSAqIGFbMV0gKyBhWzJdICogYVsyXSk7XHJcbmNvbnN0IG5vcm1TcSA9IChhKSA9PiBhWzBdICogYVswXSArIGFbMV0gKiBhWzFdICsgYVsyXSAqIGFbMl07XHJcbmNvbnN0IG5vcm1hbGl6ZSA9IChhKSA9PiB7XHJcbiAgICBjb25zdCBsZW5ndGggPSBub3JtKGEpO1xyXG4gICAgaWYgKGxlbmd0aCA9PT0gMClcclxuICAgICAgICByZXR1cm4gYTtcclxuICAgIHJldHVybiBbYVswXSAvIGxlbmd0aCwgYVsxXSAvIGxlbmd0aCwgYVsyXSAvIGxlbmd0aF07XHJcbn07XHJcbmNvbnN0IGlzTnVsbCA9IChhKSA9PiBhWzBdICogYVswXSArIGFbMV0gKiBhWzFdICsgYVsyXSAqIGFbMl0gPT09IDA7XHJcbmNvbnN0IGlzRXF1YWwgPSAoYSwgYikgPT4gYVswXSA9PSBiWzBdICYmIGFbMV0gPT0gYlsxXSAmJiBhWzJdID09IGJbMl07XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIHN1bSxcclxuICAgIGRpZmYsXHJcbiAgICBzY2FsZSxcclxuICAgIGRvdCxcclxuICAgIGNyb3NzLFxyXG4gICAgbm9ybSxcclxuICAgIG5vcm1TcSxcclxuICAgIG5vcm1hbGl6ZSxcclxuICAgIGlzRXF1YWwsXHJcbiAgICBpc051bGwsXHJcbn07XHJcbiIsImltcG9ydCB7IHYzLCBtMywgQUFCQiwgbTQgfSBmcm9tIFwicm9tYW5wcHBtYXRoXCI7XHJcbmNvbnN0IHhBeGlzID0gWzEsIDAsIDBdO1xyXG5jb25zdCB5QXhpcyA9IFswLCAxLCAwXTtcclxuY29uc3QgekF4aXMgPSBbMCwgMCwgMV07XHJcbmNvbnN0IHhBeGlzTmVnYXRpdmUgPSB2My5zY2FsZSh4QXhpcywgLTEpO1xyXG5jb25zdCB5QXhpc05lZ2F0aXZlID0gdjMuc2NhbGUoeUF4aXMsIC0xKTtcclxuY29uc3QgekF4aXNOZWdhdGl2ZSA9IHYzLnNjYWxlKHpBeGlzLCAtMSk7XHJcbmNsYXNzIENvbGxpZGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuUm1hdHJpeCA9IG0zLmlkZW50aXR5KCk7XHJcbiAgICAgICAgdGhpcy5SbWF0cml4SW52ZXJzZSA9IG0zLmlkZW50aXR5KCk7XHJcbiAgICAgICAgdGhpcy5wb3MgPSBbMCwgMCwgMF07XHJcbiAgICAgICAgdGhpcy50eXBlID0gXCJwb2ludFwiO1xyXG4gICAgICAgIHRoaXMuaWQgPSBDb2xsaWRlci5sYXN0SWQrKztcclxuICAgIH1cclxuICAgIGdldFJpZ2lkQm9keSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yaWdpZEJvZHk7XHJcbiAgICB9XHJcbiAgICBzZXRSaWdpZEJvZHkoYm9keSkge1xyXG4gICAgICAgIHRoaXMucmlnaWRCb2R5ID0gYm9keTtcclxuICAgIH1cclxuICAgIGdldFR5cGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHlwZTtcclxuICAgIH1cclxuICAgIGdldFJtYXRyaXgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuUm1hdHJpeDtcclxuICAgIH1cclxuICAgIHNldFJtYXRyaXgobWF0cml4KSB7XHJcbiAgICAgICAgdGhpcy5SbWF0cml4ID0gWy4uLm1hdHJpeF07XHJcbiAgICAgICAgdGhpcy5SbWF0cml4SW52ZXJzZSA9IG0zLnRyYW5zcG9zZShtYXRyaXgpO1xyXG4gICAgfVxyXG4gICAgZ2V0Um1hdHJpeEludmVyc2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuUm1hdHJpeEludmVyc2U7XHJcbiAgICB9XHJcbiAgICBnZXRJZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pZDtcclxuICAgIH1cclxuICAgIHNldElkKGlkKSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgfVxyXG4gICAgdHJhbnNsYXRlKHYpIHtcclxuICAgICAgICB0aGlzLnBvcyA9IHYzLnN1bSh0aGlzLnBvcywgdik7XHJcbiAgICB9XHJcbiAgICBzZXRUcmFuc2xhdGlvbih0cmFuc2xhdGlvbikge1xyXG4gICAgICAgIHRoaXMucG9zID0gWy4uLnRyYW5zbGF0aW9uXTtcclxuICAgIH1cclxuICAgIGdldFRyYW5zbGF0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvcztcclxuICAgIH1cclxuICAgIHJvdGF0ZShyKSB7XHJcbiAgICAgICAgdGhpcy5SbWF0cml4ID0gbTMueFJvdGF0ZSh0aGlzLlJtYXRyaXgsIHJbMF0pO1xyXG4gICAgICAgIHRoaXMuUm1hdHJpeCA9IG0zLnlSb3RhdGUodGhpcy5SbWF0cml4LCByWzFdKTtcclxuICAgICAgICB0aGlzLlJtYXRyaXggPSBtMy56Um90YXRlKHRoaXMuUm1hdHJpeCwgclsyXSk7XHJcbiAgICAgICAgdGhpcy5SbWF0cml4SW52ZXJzZSA9IG0zLnRyYW5zcG9zZSh0aGlzLlJtYXRyaXgpO1xyXG4gICAgfVxyXG4gICAgc2V0Um90YXRpb24ocikge1xyXG4gICAgICAgIHRoaXMuUm1hdHJpeCA9IG0zLnhSb3RhdGlvbihyWzBdKTtcclxuICAgICAgICB0aGlzLlJtYXRyaXggPSBtMy55Um90YXRlKHRoaXMuUm1hdHJpeCwgclsxXSk7XHJcbiAgICAgICAgdGhpcy5SbWF0cml4ID0gbTMuelJvdGF0ZSh0aGlzLlJtYXRyaXgsIHJbMl0pO1xyXG4gICAgICAgIHRoaXMuUm1hdHJpeEludmVyc2UgPSBtMy50cmFuc3Bvc2UodGhpcy5SbWF0cml4KTtcclxuICAgIH1cclxuICAgIGdldEFBQkIoKSB7XHJcbiAgICAgICAgY29uc3QgbWF4WCA9IHRoaXMuc3VwcG9ydCh4QXhpcylbMF07XHJcbiAgICAgICAgY29uc3QgbWF4WSA9IHRoaXMuc3VwcG9ydCh5QXhpcylbMV07XHJcbiAgICAgICAgY29uc3QgbWF4WiA9IHRoaXMuc3VwcG9ydCh6QXhpcylbMl07XHJcbiAgICAgICAgY29uc3QgbWluWCA9IHRoaXMuc3VwcG9ydCh4QXhpc05lZ2F0aXZlKVswXTtcclxuICAgICAgICBjb25zdCBtaW5ZID0gdGhpcy5zdXBwb3J0KHlBeGlzTmVnYXRpdmUpWzFdO1xyXG4gICAgICAgIGNvbnN0IG1pblogPSB0aGlzLnN1cHBvcnQoekF4aXNOZWdhdGl2ZSlbMl07XHJcbiAgICAgICAgcmV0dXJuIG5ldyBBQUJCKFttaW5YLCBtaW5ZLCBtaW5aXSwgW21heFgsIG1heFksIG1heFpdKTtcclxuICAgIH1cclxuICAgIGdldE00KCkge1xyXG4gICAgICAgIGNvbnN0IG0gPSBtNC5tM1RvbTQodGhpcy5SbWF0cml4KTtcclxuICAgICAgICBtWzEyXSA9IHRoaXMucG9zWzBdO1xyXG4gICAgICAgIG1bMTNdID0gdGhpcy5wb3NbMV07XHJcbiAgICAgICAgbVsxNF0gPSB0aGlzLnBvc1syXTtcclxuICAgICAgICBtWzE1XSA9IDE7XHJcbiAgICAgICAgcmV0dXJuIG07XHJcbiAgICB9XHJcbiAgICBsb2NhbFRvR2xvYmFsKHYpIHtcclxuICAgICAgICBsZXQgZ2xvYmFsID0gbTMudHJhbnNmb3JtUG9pbnQodGhpcy5SbWF0cml4LCB2KTtcclxuICAgICAgICByZXR1cm4gdjMuc3VtKHRoaXMucG9zLCBnbG9iYWwpO1xyXG4gICAgfVxyXG4gICAgZ2V0Q2xvc2VzdEZhY2VCeU5vcm1hbChub3JtYWwpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2ZXJ0aWNlczogW3RoaXMucG9zXSxcclxuICAgICAgICAgICAgbm9ybWFsOiB2My5zY2FsZShub3JtYWwsIC0xKSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgZ2V0SW52ZXJzZUluZXJ0aWFUZW5zb3IobWFzcykge1xyXG4gICAgICAgIHJldHVybiBtMy5pZGVudGl0eSgpO1xyXG4gICAgfVxyXG4gICAgc3VwcG9ydChkaXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wb3M7XHJcbiAgICB9XHJcbn1cclxuQ29sbGlkZXIubGFzdElkID0gMTtcclxuY2xhc3MgQm94IGV4dGVuZHMgQ29sbGlkZXIge1xyXG4gICAgY29uc3RydWN0b3IoYSA9IDEsIGIgPSAxLCBjID0gMSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zY2FsZSA9IFthLCBiLCBjXTtcclxuICAgICAgICB0aGlzLm1pbiA9IFstYSAvIDIsIC1iIC8gMiwgLWMgLyAyXTtcclxuICAgICAgICB0aGlzLm1heCA9IFthIC8gMiwgYiAvIDIsIGMgLyAyXTtcclxuICAgIH1cclxuICAgIGdldEFBQkIoKSB7XHJcbiAgICAgICAgY29uc3QgbWF4WCA9IHRoaXMuc3VwcG9ydCh4QXhpcylbMF07XHJcbiAgICAgICAgY29uc3QgbWF4WSA9IHRoaXMuc3VwcG9ydCh5QXhpcylbMV07XHJcbiAgICAgICAgY29uc3QgbWF4WiA9IHRoaXMuc3VwcG9ydCh6QXhpcylbMl07XHJcbiAgICAgICAgY29uc3QgbWluWCA9IHRoaXMuc3VwcG9ydCh4QXhpc05lZ2F0aXZlKVswXTtcclxuICAgICAgICBjb25zdCBtaW5ZID0gdGhpcy5zdXBwb3J0KHlBeGlzTmVnYXRpdmUpWzFdO1xyXG4gICAgICAgIGNvbnN0IG1pblogPSB0aGlzLnN1cHBvcnQoekF4aXNOZWdhdGl2ZSlbMl07XHJcbiAgICAgICAgcmV0dXJuIG5ldyBBQUJCKFttaW5YLCBtaW5ZLCBtaW5aXSwgW21heFgsIG1heFksIG1heFpdKTtcclxuICAgIH1cclxuICAgIHN1cHBvcnQoZGlyKSB7XHJcbiAgICAgICAgY29uc3QgX2RpciA9IG0zLnRyYW5zZm9ybVBvaW50KHRoaXMuUm1hdHJpeEludmVyc2UsIGRpcik7XHJcbiAgICAgICAgY29uc3QgcmVzID0gWzAsIDAsIDBdO1xyXG4gICAgICAgIHJlc1swXSA9IF9kaXJbMF0gPiAwID8gdGhpcy5tYXhbMF0gOiB0aGlzLm1pblswXTtcclxuICAgICAgICByZXNbMV0gPSBfZGlyWzFdID4gMCA/IHRoaXMubWF4WzFdIDogdGhpcy5taW5bMV07XHJcbiAgICAgICAgcmVzWzJdID0gX2RpclsyXSA+IDAgPyB0aGlzLm1heFsyXSA6IHRoaXMubWluWzJdO1xyXG4gICAgICAgIGNvbnN0IHN1cCA9IG0zLnRyYW5zZm9ybVBvaW50KHRoaXMuUm1hdHJpeCwgcmVzKTtcclxuICAgICAgICByZXR1cm4gdjMuc3VtKHN1cCwgdGhpcy5wb3MpO1xyXG4gICAgfVxyXG4gICAgZ2V0SW52ZXJzZUluZXJ0aWFUZW5zb3IobWFzcykge1xyXG4gICAgICAgIGNvbnN0IGkxID0gKG1hc3MgLyAxMikgKiAodGhpcy5tYXhbMV0gKiB0aGlzLm1heFsxXSArIHRoaXMubWF4WzJdICogdGhpcy5tYXhbMl0pO1xyXG4gICAgICAgIGNvbnN0IGkyID0gKG1hc3MgLyAxMikgKiAodGhpcy5tYXhbMF0gKiB0aGlzLm1heFswXSArIHRoaXMubWF4WzJdICogdGhpcy5tYXhbMl0pO1xyXG4gICAgICAgIGNvbnN0IGkzID0gKG1hc3MgLyAxMikgKiAodGhpcy5tYXhbMF0gKiB0aGlzLm1heFswXSArIHRoaXMubWF4WzFdICogdGhpcy5tYXhbMV0pO1xyXG4gICAgICAgIGNvbnN0IG0gPSBtMy5tdWx0aXBseShtMy5tdWx0aXBseSh0aGlzLlJtYXRyaXhJbnZlcnNlLCBbXHJcbiAgICAgICAgICAgIDEgLyBpMSxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMSAvIGkyLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAxIC8gaTMsXHJcbiAgICAgICAgXSksIHRoaXMuUm1hdHJpeCk7XHJcbiAgICAgICAgcmV0dXJuIG07XHJcbiAgICB9XHJcbiAgICBnZXRNNCgpIHtcclxuICAgICAgICBjb25zdCBtID0gbTQubTNUb200KHRoaXMuUm1hdHJpeCk7XHJcbiAgICAgICAgbVsxMl0gPSB0aGlzLnBvc1swXTtcclxuICAgICAgICBtWzEzXSA9IHRoaXMucG9zWzFdO1xyXG4gICAgICAgIG1bMTRdID0gdGhpcy5wb3NbMl07XHJcbiAgICAgICAgbVsxNV0gPSAxO1xyXG4gICAgICAgIGNvbnN0IHNjYWxlID0gdjMuZGlmZih0aGlzLm1heCwgdGhpcy5taW4pO1xyXG4gICAgICAgIHJldHVybiBtNC5zY2FsZShtLCAuLi5zY2FsZSk7XHJcbiAgICB9XHJcbiAgICBnZXRDbG9zZXN0RmFjZUJ5Tm9ybWFsKG5vcm1hbCkge1xyXG4gICAgICAgIGNvbnN0IHsgUm1hdHJpeCB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCBnbG9iYWxOb3JtYWxzID0gQm94Lm5vcm1hbHMubWFwKChuKSA9PiBtMy50cmFuc2Zvcm1Qb2ludChSbWF0cml4LCBuKSk7XHJcbiAgICAgICAgbGV0IG1pbkRvdCA9IHYzLmRvdChub3JtYWwsIGdsb2JhbE5vcm1hbHNbMF0pO1xyXG4gICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDEsIG4gPSBnbG9iYWxOb3JtYWxzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICAvL2NvbnN0IF9ub3JtYWwgPSBtMy50cmFuc2Zvcm1Qb2ludChSbWF0cml4LCBub3JtYWxzW2ldKVxyXG4gICAgICAgICAgICBjb25zdCBfZG90ID0gdjMuZG90KGdsb2JhbE5vcm1hbHNbaV0sIG5vcm1hbCk7XHJcbiAgICAgICAgICAgIGlmIChfZG90IDwgbWluRG90KSB7XHJcbiAgICAgICAgICAgICAgICBtaW5Eb3QgPSBfZG90O1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGZhY2VJbmRpY2VzID0gQm94LmluZGljZXNbaW5kZXhdO1xyXG4gICAgICAgIGNvbnN0IG0gPSB0aGlzLmdldE00KCk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmVydGljZXM6IGZhY2VJbmRpY2VzLm1hcCgoaSkgPT4gbTQudHJhbnNmb3JtUG9pbnQobSwgQm94LnBvaW50c1tpXSkpLFxyXG4gICAgICAgICAgICBub3JtYWw6IGdsb2JhbE5vcm1hbHNbaW5kZXhdLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuQm94LnBvaW50cyA9IFtcclxuICAgIFstMSAvIDIsIC0xIC8gMiwgLTEgLyAyXSxcclxuICAgIFsxIC8gMiwgLTEgLyAyLCAtMSAvIDJdLFxyXG4gICAgWzEgLyAyLCAtMSAvIDIsIDEgLyAyXSxcclxuICAgIFstMSAvIDIsIC0xIC8gMiwgMSAvIDJdLFxyXG4gICAgWy0xIC8gMiwgMSAvIDIsIC0xIC8gMl0sXHJcbiAgICBbMSAvIDIsIDEgLyAyLCAtMSAvIDJdLFxyXG4gICAgWzEgLyAyLCAxIC8gMiwgMSAvIDJdLFxyXG4gICAgWy0xIC8gMiwgMSAvIDIsIDEgLyAyXSxcclxuXTtcclxuQm94LmluZGljZXMgPSBbXHJcbiAgICBbMCwgNCwgNSwgMV0sXHJcbiAgICBbMywgNywgNiwgMl0sXHJcbiAgICBbMCwgMSwgMiwgM10sXHJcbiAgICBbNCwgNSwgNiwgN10sXHJcbiAgICBbMCwgMywgNywgNF0sXHJcbiAgICBbMSwgMiwgNiwgNV0sIC8vICt4XHJcbl07XHJcbkJveC5ub3JtYWxzID0gW1xyXG4gICAgWzAsIDAsIC0xXSxcclxuICAgIFswLCAwLCAxXSxcclxuICAgIFswLCAtMSwgMF0sXHJcbiAgICBbMCwgMSwgMF0sXHJcbiAgICBbLTEsIDAsIDBdLFxyXG4gICAgWzEsIDAsIDBdLFxyXG5dO1xyXG5jbGFzcyBTcGhlcmUgZXh0ZW5kcyBDb2xsaWRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihyYWRpdXMgPSAxKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcclxuICAgICAgICB0aGlzLnR5cGUgPSBcInNwaGVyZVwiO1xyXG4gICAgfVxyXG4gICAgZ2V0QUFCQigpIHtcclxuICAgICAgICBjb25zdCB7IHJhZGl1cyB9ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gbmV3IEFBQkIodjMuc3VtKHRoaXMucG9zLCBbLXJhZGl1cywgLXJhZGl1cywgLXJhZGl1c10pLCB2My5zdW0odGhpcy5wb3MsIFtyYWRpdXMsIHJhZGl1cywgcmFkaXVzXSkpO1xyXG4gICAgfVxyXG4gICAgc3VwcG9ydChkaXIpIHtcclxuICAgICAgICByZXR1cm4gdjMuc3VtKHYzLnNjYWxlKHYzLm5vcm1hbGl6ZShkaXIpLCB0aGlzLnJhZGl1cyksIHRoaXMucG9zKTtcclxuICAgIH1cclxuICAgIGdldE00KCkge1xyXG4gICAgICAgIGNvbnN0IG0gPSBtNC5tM1RvbTQodGhpcy5SbWF0cml4KTtcclxuICAgICAgICBtWzEyXSA9IHRoaXMucG9zWzBdO1xyXG4gICAgICAgIG1bMTNdID0gdGhpcy5wb3NbMV07XHJcbiAgICAgICAgbVsxNF0gPSB0aGlzLnBvc1syXTtcclxuICAgICAgICBtWzE1XSA9IDE7XHJcbiAgICAgICAgY29uc3QgeyByYWRpdXMgfSA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIG00LnNjYWxlKG0sIHJhZGl1cywgcmFkaXVzLCByYWRpdXMpO1xyXG4gICAgfVxyXG4gICAgZ2V0Q2xvc2VzdEZhY2VCeU5vcm1hbChub3JtYWwpIHtcclxuICAgICAgICBjb25zdCByZXZlcnNlID0gdjMuc2NhbGUobm9ybWFsLCAtMSk7XHJcbiAgICAgICAgcmV0dXJuIHsgdmVydGljZXM6IFt2My5zY2FsZShyZXZlcnNlLCB0aGlzLnJhZGl1cyldLCBub3JtYWw6IHJldmVyc2UgfTtcclxuICAgIH1cclxuICAgIGdldEludmVyc2VJbmVydGlhVGVuc29yKG1hc3MpIHtcclxuICAgICAgICBjb25zdCB7IHJhZGl1cyB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCBtID0gW1xyXG4gICAgICAgICAgICAoMiAqIG1hc3MgKiByYWRpdXMgKiByYWRpdXMpIC8gNSxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgKDIgKiBtYXNzICogcmFkaXVzICogcmFkaXVzKSAvIDUsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICgyICogbWFzcyAqIHJhZGl1cyAqIHJhZGl1cykgLyA1LFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgcmV0dXJuIG07XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgQ3lsaW5kZXIgZXh0ZW5kcyBDb2xsaWRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihyYWRpdXMsIGhlaWdodCwgbnVtU2VnbWVudHMgPSA2KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICBjb25zdCBzZWdtZW50QW5nbGUgPSAoMiAqIE1hdGguUEkpIC8gbnVtU2VnbWVudHM7XHJcbiAgICAgICAgdGhpcy5jaXJjbGVQb2ludHMgPSBbLi4ubmV3IEFycmF5KG51bVNlZ21lbnRzKV0ubWFwKChfLCBpKSA9PiBbXHJcbiAgICAgICAgICAgIE1hdGguY29zKGkgKiBzZWdtZW50QW5nbGUpLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICBNYXRoLnNpbihpICogc2VnbWVudEFuZ2xlKSxcclxuICAgICAgICBdKTtcclxuICAgIH1cclxuICAgIHN1cHBvcnQoZGlyKSB7XHJcbiAgICAgICAgY29uc3QgX2RpciA9IG0zLnRyYW5zZm9ybVBvaW50KHRoaXMuUm1hdHJpeEludmVyc2UsIGRpcik7XHJcbiAgICAgICAgY29uc3QgZGlyX3h6ID0gW19kaXJbMF0sIDAsIF9kaXJbMl1dO1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHYzLnNjYWxlKHYzLm5vcm1hbGl6ZShkaXJfeHopLCB0aGlzLnJhZGl1cyk7XHJcbiAgICAgICAgcmVzdWx0WzFdID0gX2RpclsxXSA+IDAgPyB0aGlzLmhlaWdodCAvIDIgOiAtdGhpcy5oZWlnaHQgLyAyO1xyXG4gICAgICAgIHJldHVybiB2My5zdW0obTMudHJhbnNmb3JtUG9pbnQodGhpcy5SbWF0cml4LCByZXN1bHQpLCB0aGlzLnBvcyk7XHJcbiAgICB9XHJcbiAgICBnZXRNNCgpIHtcclxuICAgICAgICBjb25zdCBtID0gbTQubTNUb200KHRoaXMuUm1hdHJpeCk7XHJcbiAgICAgICAgbVsxMl0gPSB0aGlzLnBvc1swXTtcclxuICAgICAgICBtWzEzXSA9IHRoaXMucG9zWzFdO1xyXG4gICAgICAgIG1bMTRdID0gdGhpcy5wb3NbMl07XHJcbiAgICAgICAgbVsxNV0gPSAxO1xyXG4gICAgICAgIGNvbnN0IHsgcmFkaXVzLCBoZWlnaHQgfSA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIG00LnNjYWxlKG0sIHJhZGl1cywgaGVpZ2h0LCByYWRpdXMpO1xyXG4gICAgfVxyXG4gICAgZ2V0Q2xvc2VzdEZhY2VCeU5vcm1hbChub3JtYWwpIHtcclxuICAgICAgICBjb25zdCB7IFJtYXRyaXgsIFJtYXRyaXhJbnZlcnNlIH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IF9ub3JtYWwgPSBtMy50cmFuc2Zvcm1Qb2ludChSbWF0cml4SW52ZXJzZSwgdjMuc2NhbGUobm9ybWFsLCAtMSkpO1xyXG4gICAgICAgIGNvbnN0IG0gPSB0aGlzLmdldE00KCk7XHJcbiAgICAgICAgY29uc3QgY29zID0gdjMuZG90KF9ub3JtYWwsIFswLCAxLCAwXSk7XHJcbiAgICAgICAgY29uc3Qgc2lnbiA9IE1hdGguc2lnbihjb3MpO1xyXG4gICAgICAgIGlmIChjb3MgKiBzaWduIDwgMC43MDcpIHtcclxuICAgICAgICAgICAgY29uc3QgbG9jYWxOb3JtYWwgPSB2My5ub3JtYWxpemUoW19ub3JtYWxbMF0sIDAsIF9ub3JtYWxbMl1dKTtcclxuICAgICAgICAgICAgY29uc3QgdmVydGljZXMgPSBbXHJcbiAgICAgICAgICAgICAgICBtNC50cmFuc2Zvcm1Qb2ludChtLCBbX25vcm1hbFswXSwgMC41LCBfbm9ybWFsWzJdXSksXHJcbiAgICAgICAgICAgICAgICBtNC50cmFuc2Zvcm1Qb2ludChtLCBbX25vcm1hbFswXSwgLTAuNSwgX25vcm1hbFsyXV0pLFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2ZXJ0aWNlcywgbm9ybWFsOiBtMy50cmFuc2Zvcm1Qb2ludChSbWF0cml4LCBsb2NhbE5vcm1hbCkgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbG9jYWxOb3JtYWwgPSB2My5zY2FsZShbMCwgMSwgMF0sIHNpZ24pO1xyXG4gICAgICAgIGNvbnN0IHZlcnRpY2VzID0gdGhpcy5jaXJjbGVQb2ludHMubWFwKChwKSA9PiBtNC50cmFuc2Zvcm1Qb2ludChtLCBbcFswXSwgc2lnbiAqIDAuNSwgcFsyXV0pKTtcclxuICAgICAgICByZXR1cm4geyB2ZXJ0aWNlcywgbm9ybWFsOiBtMy50cmFuc2Zvcm1Qb2ludChSbWF0cml4LCBsb2NhbE5vcm1hbCkgfTtcclxuICAgIH1cclxuICAgIGdldEludmVyc2VJbmVydGlhVGVuc29yKG1hc3MpIHtcclxuICAgICAgICBjb25zdCB7IHJhZGl1cywgaGVpZ2h0IH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IGkxID0gKG1hc3MgLyAxMikgKiAoMyAqIHJhZGl1cyAqIHJhZGl1cyArIGhlaWdodCAqIGhlaWdodCk7XHJcbiAgICAgICAgY29uc3QgaTMgPSAobWFzcyAvIDIpICogcmFkaXVzICogcmFkaXVzO1xyXG4gICAgICAgIGNvbnN0IG0gPSBtMy5tdWx0aXBseShtMy5tdWx0aXBseSh0aGlzLlJtYXRyaXgsIFsxIC8gaTEsIDAsIDAsIDAsIDEgLyBpMSwgMCwgMCwgMCwgMSAvIGkzXSksIHRoaXMuUm1hdHJpeEludmVyc2UpO1xyXG4gICAgICAgIHJldHVybiBtO1xyXG4gICAgfVxyXG4gICAgZ2V0QUFCQigpIHtcclxuICAgICAgICBjb25zdCB7IHJhZGl1cywgaGVpZ2h0IH0gPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBuZXcgQUFCQih2My5zdW0odGhpcy5wb3MsIFstcmFkaXVzLCAtaGVpZ2h0LCAtcmFkaXVzXSksIHYzLnN1bSh0aGlzLnBvcywgW3JhZGl1cywgaGVpZ2h0LCByYWRpdXNdKSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IHsgQm94LCBTcGhlcmUsIEN5bGluZGVyIH07XHJcbiIsImltcG9ydCB7IHYzLCBtMyB9IGZyb20gXCJyb21hbnBwcG1hdGhcIjtcclxuaW1wb3J0IHsgQ29uc3RyYWludEVxdWF0aW9uLCBDb250YWN0RXF1YXRpb24sIEZyaWN0aW9uRXF1YXRpb24sIH0gZnJvbSBcIi4vRXF1YXRpb25zXCI7XHJcbmltcG9ydCBjb25maWcgZnJvbSBcIi4vY29uZmlnXCI7XHJcbmNvbnN0IHsgQ09OVEFDVF9UUkVTSE9MRCwgQ09OVEFDVF9CSUFTIH0gPSBjb25maWc7XHJcbmV4cG9ydCBjbGFzcyBDb25zdHJhaW50IHtcclxuICAgIGNvbnN0cnVjdG9yKGJvZHkxLCBib2R5MiwgcmFMb2NhbCwgcmJMb2NhbCwgb3B0KSB7XHJcbiAgICAgICAgdGhpcy5ib2R5MSA9IGJvZHkxO1xyXG4gICAgICAgIHRoaXMuYm9keTIgPSBib2R5MjtcclxuICAgICAgICB0aGlzLnJhTG9jYWwgPSByYUxvY2FsO1xyXG4gICAgICAgIHRoaXMucmJMb2NhbCA9IHJiTG9jYWw7XHJcbiAgICAgICAgdGhpcy5iaWFzRmFjdG9yID0gb3B0LmJpYXNGYWN0b3IgfHwgMC4xMjU7XHJcbiAgICAgICAgdGhpcy50cmVzaG9sZCA9IG9wdC50cmVzaG9sZCB8fCAwLjAwMDAwNTtcclxuICAgICAgICB0aGlzLmxhbWJkYU1pbiA9IG9wdC5sYW1iZGFNaW4gfHwgLTk5OTk5OTk5O1xyXG4gICAgICAgIHRoaXMubGFtYmRhTWF4ID0gb3B0LmxhbWJkYU1heCB8fCA5OTk5OTk5OTtcclxuICAgICAgICB0aGlzLnByZXZMYW1iZGEgPSAwO1xyXG4gICAgICAgIGNvbnN0IGNvbGxpZGVyMSA9IHRoaXMuYm9keTEuZ2V0Q29sbGlkZXIoKTtcclxuICAgICAgICBjb25zdCBjb2xsaWRlcjIgPSB0aGlzLmJvZHkyLmdldENvbGxpZGVyKCk7XHJcbiAgICAgICAgdGhpcy5yYSA9IG0zLnRyYW5zZm9ybVBvaW50KGNvbGxpZGVyMS5nZXRSbWF0cml4KCksIHRoaXMucmFMb2NhbCk7XHJcbiAgICAgICAgdGhpcy5yYiA9IG0zLnRyYW5zZm9ybVBvaW50KGNvbGxpZGVyMi5nZXRSbWF0cml4KCksIHRoaXMucmJMb2NhbCk7XHJcbiAgICAgICAgdGhpcy5QQSA9IHYzLnN1bShjb2xsaWRlcjEuZ2V0VHJhbnNsYXRpb24oKSwgdGhpcy5yYSk7XHJcbiAgICAgICAgdGhpcy5QQiA9IHYzLnN1bShjb2xsaWRlcjIuZ2V0VHJhbnNsYXRpb24oKSwgdGhpcy5yYik7XHJcbiAgICB9XHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgY29uc3QgY29sbGlkZXIxID0gdGhpcy5ib2R5MS5nZXRDb2xsaWRlcigpO1xyXG4gICAgICAgIGNvbnN0IGNvbGxpZGVyMiA9IHRoaXMuYm9keTIuZ2V0Q29sbGlkZXIoKTtcclxuICAgICAgICB0aGlzLnJhID0gbTMudHJhbnNmb3JtUG9pbnQoY29sbGlkZXIxLmdldFJtYXRyaXgoKSwgdGhpcy5yYUxvY2FsKTtcclxuICAgICAgICB0aGlzLnJiID0gbTMudHJhbnNmb3JtUG9pbnQoY29sbGlkZXIyLmdldFJtYXRyaXgoKSwgdGhpcy5yYkxvY2FsKTtcclxuICAgICAgICBjb25zdCBQQSA9IHYzLnN1bShjb2xsaWRlcjEuZ2V0VHJhbnNsYXRpb24oKSwgdGhpcy5yYSk7XHJcbiAgICAgICAgY29uc3QgUEIgPSB2My5zdW0oY29sbGlkZXIyLmdldFRyYW5zbGF0aW9uKCksIHRoaXMucmIpO1xyXG4gICAgICAgIGNvbnN0IGRlbHRhUEEgPSB2My5kaWZmKFBBLCB0aGlzLlBBKTtcclxuICAgICAgICBjb25zdCBkZWx0YVBCID0gdjMuZGlmZihQQiwgdGhpcy5QQik7XHJcbiAgICAgICAgdGhpcy5QQSA9IFBBO1xyXG4gICAgICAgIHRoaXMuUEIgPSBQQjtcclxuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSB2My5kaWZmKFBBLCBQQik7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbkVycm9yID0gdjMubm9ybSh2My5zdW0oWzAuMDAxLCAwLjAwMSwgMC4wMDFdLCBkaXJlY3Rpb24pKTtcclxuICAgICAgICB0aGlzLm4gPSB2My5zY2FsZShkaXJlY3Rpb24sIDEgLyB0aGlzLnBvc2l0aW9uRXJyb3IpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRlbHRhUEEsXHJcbiAgICAgICAgICAgIGRlbHRhUEIsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGdldEVxdWF0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IGVxdWF0aW9uID0gbmV3IENvbnN0cmFpbnRFcXVhdGlvbih0aGlzKTtcclxuICAgICAgICBlcXVhdGlvbi5sYW1iZGFNYXggPSB0aGlzLmxhbWJkYU1heDtcclxuICAgICAgICBlcXVhdGlvbi5sYW1iZGFNaW4gPSB0aGlzLmxhbWJkYU1pbjtcclxuICAgICAgICByZXR1cm4gZXF1YXRpb247XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIENvbnRhY3RDb25zdHJhaW50IHtcclxuICAgIGNvbnN0cnVjdG9yKGJvZHkxLCBib2R5MiwgcmFMb2NhbCwgcmJMb2NhbCwgcmEsIHJiLCBQQSwgUEIsIG4sIHBvc2l0aW9uRXJyb3IsIGksIGopIHtcclxuICAgICAgICB0aGlzLmJvZHkxID0gYm9keTE7XHJcbiAgICAgICAgdGhpcy5ib2R5MiA9IGJvZHkyO1xyXG4gICAgICAgIHRoaXMucmFMb2NhbCA9IHJhTG9jYWw7XHJcbiAgICAgICAgdGhpcy5yYkxvY2FsID0gcmJMb2NhbDtcclxuICAgICAgICB0aGlzLnJhID0gcmE7XHJcbiAgICAgICAgdGhpcy5yYiA9IHJiO1xyXG4gICAgICAgIHRoaXMuUEEgPSBQQTtcclxuICAgICAgICB0aGlzLlBCID0gUEI7XHJcbiAgICAgICAgdGhpcy5uID0gbjtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uRXJyb3IgPSBwb3NpdGlvbkVycm9yO1xyXG4gICAgICAgIHRoaXMuaSA9IGk7XHJcbiAgICAgICAgdGhpcy5qID0gajtcclxuICAgICAgICB0aGlzLmJpYXNGYWN0b3IgPSBjb25maWcuQ09OVEFDVF9CSUFTO1xyXG4gICAgICAgIHRoaXMudHJlc2hvbGQgPSBjb25maWcuQ09OVEFDVF9UUkVTSE9MRDtcclxuICAgICAgICB0aGlzLmxhbWJkYU1pbiA9IENvbnRhY3RDb25zdHJhaW50Lm9wdC5sYW1iZGFNaW47XHJcbiAgICAgICAgdGhpcy5sYW1iZGFNYXggPSBDb250YWN0Q29uc3RyYWludC5vcHQubGFtYmRhTWF4O1xyXG4gICAgICAgIHRoaXMucHJldlRhbkxhbWJkYXMgPSBbMCwgMF07XHJcbiAgICAgICAgdGhpcy5wcmV2TGFtYmRhID0gMDtcclxuICAgIH1cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICBjb25zdCBjb2xsaWRlcjEgPSB0aGlzLmJvZHkxLmdldENvbGxpZGVyKCk7XHJcbiAgICAgICAgY29uc3QgY29sbGlkZXIyID0gdGhpcy5ib2R5Mi5nZXRDb2xsaWRlcigpO1xyXG4gICAgICAgIHRoaXMucmEgPSBtMy50cmFuc2Zvcm1Qb2ludChjb2xsaWRlcjEuZ2V0Um1hdHJpeCgpLCB0aGlzLnJhTG9jYWwpO1xyXG4gICAgICAgIHRoaXMucmIgPSBtMy50cmFuc2Zvcm1Qb2ludChjb2xsaWRlcjIuZ2V0Um1hdHJpeCgpLCB0aGlzLnJiTG9jYWwpO1xyXG4gICAgICAgIGNvbnN0IFBBID0gdjMuc3VtKGNvbGxpZGVyMS5nZXRUcmFuc2xhdGlvbigpLCB0aGlzLnJhKTtcclxuICAgICAgICBjb25zdCBQQiA9IHYzLnN1bShjb2xsaWRlcjIuZ2V0VHJhbnNsYXRpb24oKSwgdGhpcy5yYik7XHJcbiAgICAgICAgY29uc3QgZGVsdGFQQSA9IHYzLmRpZmYoUEEsIHRoaXMuUEEpO1xyXG4gICAgICAgIGNvbnN0IGRlbHRhUEIgPSB2My5kaWZmKFBCLCB0aGlzLlBCKTtcclxuICAgICAgICB0aGlzLlBBID0gUEE7XHJcbiAgICAgICAgdGhpcy5QQiA9IFBCO1xyXG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHYzLmRpZmYoUEEsIFBCKTtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uRXJyb3IgPSB2My5kb3QodGhpcy5uLCBkaXJlY3Rpb24pO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRlbHRhUEEsXHJcbiAgICAgICAgICAgIGRlbHRhUEIsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGdldEVxdWF0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IGxhbWJkYU1heCA9IE1hdGgubWF4KDEsIHYzLm5vcm0odjMuc3VtKHYzLnNjYWxlKHRoaXMuYm9keTEuZ2V0VmVsb2NpdHkoKSwgdGhpcy5ib2R5MS5nZXRNYXNzKCkpLCB2My5zY2FsZSh0aGlzLmJvZHkyLmdldFZlbG9jaXR5KCksIHRoaXMuYm9keTIuZ2V0TWFzcygpKSkpICogMTApO1xyXG4gICAgICAgIGNvbnN0IGVxdWF0aW9uID0gbmV3IENvbnRhY3RFcXVhdGlvbih0aGlzKTtcclxuICAgICAgICBlcXVhdGlvbi5sYW1iZGFNYXggPSBsYW1iZGFNYXg7XHJcbiAgICAgICAgZXF1YXRpb24ubGFtYmRhTWluID0gMDtcclxuICAgICAgICByZXR1cm4gZXF1YXRpb247XHJcbiAgICB9XHJcbiAgICBnZXRGcmljdGlvbkVxdWF0aW9ucygpIHtcclxuICAgICAgICBjb25zdCBlcTEgPSBuZXcgRnJpY3Rpb25FcXVhdGlvbih0aGlzLCAwKTtcclxuICAgICAgICBjb25zdCBlcTIgPSBuZXcgRnJpY3Rpb25FcXVhdGlvbih0aGlzLCAxKTtcclxuICAgICAgICBlcTEubGFtYmRhTWF4ID0gSW5maW5pdHk7XHJcbiAgICAgICAgZXExLmxhbWJkYU1pbiA9IC1JbmZpbml0eTtcclxuICAgICAgICBlcTIubGFtYmRhTWF4ID0gSW5maW5pdHk7XHJcbiAgICAgICAgZXEyLmxhbWJkYU1pbiA9IC1JbmZpbml0eTtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBlcTEsIGVxMlxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcbn1cclxuQ29udGFjdENvbnN0cmFpbnQub3B0ID0ge1xyXG4gICAgYmlhc0ZhY3RvcjogMC4xMjUsXHJcbiAgICB0cmVzaG9sZDogMC4wMDA1LFxyXG4gICAgbGFtYmRhTWluOiAwLFxyXG4gICAgbGFtYmRhTWF4OiBJbmZpbml0eSxcclxufTtcclxuIiwiaW1wb3J0IHsgdjMgfSBmcm9tIFwicm9tYW5wcHBtYXRoXCI7XHJcbmltcG9ydCBjb25maWcgZnJvbSBcIi4vY29uZmlnXCI7XHJcbmNvbnN0IHsgQ09OVEFDVF9NQU5JRk9MRF9LRUVQX1RSRVNIT0xEIH0gPSBjb25maWc7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRhY3RNYW5pZm9sZCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb250YWN0cykge1xyXG4gICAgICAgIHRoaXMuY29udGFjdHMgPSBjb250YWN0cztcclxuICAgICAgICB0aGlzLmtlZXAgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhY3RzID0gdGhpcy5jb250YWN0cztcclxuICAgICAgICBpZiAoY29udGFjdHMubGVuZ3RoIDwgMykge1xyXG4gICAgICAgICAgICB0aGlzLmtlZXAgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbiA9IGNvbnRhY3RzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBjb250YWN0ID0gY29udGFjdHNbaV07XHJcbiAgICAgICAgICAgIGNvbnN0IHsgZGVsdGFQQSwgZGVsdGFQQiB9ID0gY29udGFjdC51cGRhdGUoKTtcclxuICAgICAgICAgICAgaWYgKHYzLm5vcm0oZGVsdGFQQSkgPiBDT05UQUNUX01BTklGT0xEX0tFRVBfVFJFU0hPTEQgfHwgdjMubm9ybShkZWx0YVBCKSA+IENPTlRBQ1RfTUFOSUZPTERfS0VFUF9UUkVTSE9MRCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rZWVwID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiLi9FdmVudEVtaXR0ZXJcIjtcclxuY29uc3QgZGF0YSA9IHtcclxuICAgIFNPTFZFUl9FUlJPUjogMCxcclxuICAgIFJVTlRJTUU6IDAsXHJcbiAgICBGUFM6IDAsXHJcbn07XHJcbmNsYXNzIERlYnVnIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XHJcbiAgICAgICAgaWYgKCFEZWJ1Zy5pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBEZWJ1Zy5pbnN0YW5jZSA9IG5ldyBEZWJ1ZygpO1xyXG4gICAgICAgICAgICBEZWJ1Zy5pbnN0YW5jZS5kYXRhID0ge307XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgICAgICAgIERlYnVnLmluc3RhbmNlLmRhdGFbYF8ke2tleX1gXSA9IGRhdGFba2V5XTtcclxuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEZWJ1Zy5pbnN0YW5jZS5kYXRhLCBrZXksIHtcclxuICAgICAgICAgICAgICAgICAgICBnZXQoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzW2BfJHtrZXl9YF07XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzZXQodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1tgXyR7a2V5fWBdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERlYnVnLmluc3RhbmNlLmVtaXQoYHVwZGF0ZWAsIHsga2V5OiBgXyR7a2V5fWAsIHZhbHVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIERlYnVnLmluc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgc29tZU1ldGhvZCgpIHsgfVxyXG59XHJcbndpbmRvdy5EZWJ1ZyA9IERlYnVnLmdldEluc3RhbmNlKCk7XHJcbmV4cG9ydCBkZWZhdWx0IERlYnVnLmdldEluc3RhbmNlKCk7XHJcbiIsImltcG9ydCB7IHYzLCBtMyB9IGZyb20gXCJyb21hbnBwcG1hdGhcIjtcclxuY29uc3QgY2xhbXAgPSAodiwgbWluLCBtYXgpID0+IHtcclxuICAgIGlmICh2ID4gbWluKSB7XHJcbiAgICAgICAgaWYgKHYgPCBtYXgpXHJcbiAgICAgICAgICAgIHJldHVybiB2O1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIG1heDtcclxuICAgIH1cclxuICAgIHJldHVybiBtaW47XHJcbn07XHJcbmNvbnN0IG51bGxWZWMgPSBbMCwgMCwgMF07XHJcbmNsYXNzIENvbnN0cmFpbnRFcXVhdGlvbiB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb25zdHJhaW50KSB7XHJcbiAgICAgICAgdGhpcy5jb25zdHJhaW50ID0gY29uc3RyYWludDtcclxuICAgICAgICB0aGlzLnByZXZMYW1iZGEgPSBjb25zdHJhaW50LnByZXZMYW1iZGE7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVKYWNvYmlhbigpIHtcclxuICAgICAgICBjb25zdCB7IGJvZHkxLCBib2R5MiwgcmEsIHJiLCBuIH0gPSB0aGlzLmNvbnN0cmFpbnQ7XHJcbiAgICAgICAgaWYgKGJvZHkxLmlzU3RhdGljKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5KMSA9IG51bGxWZWM7XHJcbiAgICAgICAgICAgIHRoaXMuSjIgPSBudWxsVmVjO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5KMSA9IHYzLnNjYWxlKG4sIC0xKTtcclxuICAgICAgICAgICAgdGhpcy5KMiA9IHYzLmNyb3NzKG4sIHJhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJvZHkyLmlzU3RhdGljKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5KMyA9IG51bGxWZWM7XHJcbiAgICAgICAgICAgIHRoaXMuSjQgPSBudWxsVmVjO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5KMyA9IG47XHJcbiAgICAgICAgICAgIHRoaXMuSjQgPSB2My5jcm9zcyhyYiwgbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qICBjb25zdCBkb2YxID0gYm9keTEuZG9mO1xyXG4gICAgICAgIGNvbnN0IGRvZjIgPSBib2R5Mi5kb2Y7XHJcbiAgICBcclxuICAgICAgICB0aGlzLkpbMF1bMF0gKj0gZG9mMVswXTtcclxuICAgICAgICB0aGlzLkpbMF1bMV0gKj0gZG9mMVsxXTtcclxuICAgICAgICB0aGlzLkpbMF1bMl0gKj0gZG9mMVsyXTtcclxuICAgIFxyXG4gICAgICAgIHRoaXMuSlsxXVswXSAqPSBkb2YxWzNdO1xyXG4gICAgICAgIHRoaXMuSlsxXVsxXSAqPSBkb2YxWzRdO1xyXG4gICAgICAgIHRoaXMuSlsxXVsyXSAqPSBkb2YxWzVdO1xyXG4gICAgXHJcbiAgICAgICAgdGhpcy5KWzJdWzBdICo9IGRvZjJbMF07XHJcbiAgICAgICAgdGhpcy5KWzJdWzFdICo9IGRvZjJbMV07XHJcbiAgICAgICAgdGhpcy5KWzJdWzJdICo9IGRvZjJbMl07XHJcbiAgICBcclxuICAgICAgICB0aGlzLkpbM11bMF0gKj0gZG9mMlszXTtcclxuICAgICAgICB0aGlzLkpbM11bMV0gKj0gZG9mMls0XTtcclxuICAgICAgICB0aGlzLkpbM11bMl0gKj0gZG9mMls1XTsqL1xyXG4gICAgfVxyXG4gICAgdXBkYXRlTGVmdFBhcnQoZHQpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUphY29iaWFuKCk7XHJcbiAgICAgICAgY29uc3QgeyBib2R5MSwgYm9keTIgfSA9IHRoaXMuY29uc3RyYWludDtcclxuICAgICAgICBjb25zdCBJMSA9IGJvZHkxLmdldEludmVyc2VJbmVydGlhVGVuc29yKCk7XHJcbiAgICAgICAgY29uc3QgSTIgPSBib2R5Mi5nZXRJbnZlcnNlSW5lcnRpYVRlbnNvcigpO1xyXG4gICAgICAgIGxldCBNMSA9IGJvZHkxLmdldEludmVyc2VNYXNzKCk7XHJcbiAgICAgICAgbGV0IE0yID0gYm9keTIuZ2V0SW52ZXJzZU1hc3MoKTtcclxuICAgICAgICB0aGlzLkpNMSA9IHYzLnNjYWxlKHRoaXMuSjEsIE0xKTtcclxuICAgICAgICB0aGlzLkpNMiA9IG0zLnRyYW5zZm9ybVBvaW50KEkxLCB0aGlzLkoyKTtcclxuICAgICAgICB0aGlzLkpNMyA9IHYzLnNjYWxlKHRoaXMuSjMsIE0yKTtcclxuICAgICAgICB0aGlzLkpNNCA9IG0zLnRyYW5zZm9ybVBvaW50KEkyLCB0aGlzLko0KTtcclxuICAgICAgICAvL0pNSiogPSBKQjsgQiA9IE1KKiBhcyAyIHZlYzYsIF9KID0gSmFjb2JpYW4gYXMgMiB2ZWM2XHJcbiAgICAgICAgdGhpcy5lZmZNYXNzID1cclxuICAgICAgICAgICAgdjMuZG90KHRoaXMuSjEsIHRoaXMuSk0xKSArXHJcbiAgICAgICAgICAgICAgICB2My5kb3QodGhpcy5KTTIsIHRoaXMuSjIpICtcclxuICAgICAgICAgICAgICAgIHYzLmRvdCh0aGlzLkozLCB0aGlzLkpNMykgK1xyXG4gICAgICAgICAgICAgICAgdjMuZG90KHRoaXMuSk00LCB0aGlzLko0KTtcclxuICAgIH1cclxuICAgIHVwZGF0ZVJpZ2h0UGFydChkdCkge1xyXG4gICAgICAgIGNvbnN0IHsgYmlhc0ZhY3RvciwgdHJlc2hvbGQsIGJvZHkxLCBib2R5MiwgbiwgcmEsIHJiLCBwb3NpdGlvbkVycm9yIH0gPSB0aGlzLmNvbnN0cmFpbnQ7XHJcbiAgICAgICAgY29uc3QgcmVsYXRpdmVWZWxvY2l0eSA9IHYzLmRpZmYodjMuc3VtKGJvZHkyLmdldFZlbG9jaXR5KCksIHYzLmNyb3NzKGJvZHkyLmdldEFuZ3VsYXJWZWxvY2l0eSgpLCByYikpLCB2My5zdW0oYm9keTEuZ2V0VmVsb2NpdHkoKSwgdjMuY3Jvc3MoYm9keTEuZ2V0QW5ndWxhclZlbG9jaXR5KCksIHJhKSkpO1xyXG4gICAgICAgIGNvbnN0IHJlbGF0aXZlVmVsb2NpdHlOb3JtYWxQcm9qZWN0aW9uID0gdjMuZG90KHJlbGF0aXZlVmVsb2NpdHksIG4pO1xyXG4gICAgICAgIHRoaXMuYmlhcyA9XHJcbiAgICAgICAgICAgIChiaWFzRmFjdG9yICogTWF0aC5tYXgocG9zaXRpb25FcnJvciAtIHRyZXNob2xkLCAwKSkgLyBkdCAtXHJcbiAgICAgICAgICAgICAgICByZWxhdGl2ZVZlbG9jaXR5Tm9ybWFsUHJvamVjdGlvbjtcclxuICAgIH1cclxuICAgIGFwcGx5SW1wdWxzZShsYW1iZGEpIHtcclxuICAgICAgICB0aGlzLmNvbnN0cmFpbnQucHJldkxhbWJkYSA9IGxhbWJkYTtcclxuICAgICAgICB0aGlzLmNvbnN0cmFpbnQuYm9keTEuYXBwbHlJbXB1bHNlKHYzLnNjYWxlKHRoaXMuSjEsIGxhbWJkYSksIHRoaXMuY29uc3RyYWludC5yYSk7XHJcbiAgICAgICAgdGhpcy5jb25zdHJhaW50LmJvZHkyLmFwcGx5SW1wdWxzZSh2My5zY2FsZSh0aGlzLkozLCBsYW1iZGEpLCB0aGlzLmNvbnN0cmFpbnQucmIpO1xyXG4gICAgfVxyXG4gICAgYXBwbHlQc2V1ZG9JbXB1bHNlKGxhbWJkYSkge1xyXG4gICAgICAgIHRoaXMuY29uc3RyYWludC5ib2R5MS5hcHBseVBzZXVkb0ltcHVsc2UodjMuc2NhbGUodGhpcy5KMSwgbGFtYmRhKSwgdGhpcy5jb25zdHJhaW50LnJhKTtcclxuICAgICAgICB0aGlzLmNvbnN0cmFpbnQuYm9keTIuYXBwbHlQc2V1ZG9JbXB1bHNlKHYzLnNjYWxlKHRoaXMuSjMsIGxhbWJkYSksIHRoaXMuY29uc3RyYWludC5yYik7XHJcbiAgICB9XHJcbn1cclxuQ29uc3RyYWludEVxdWF0aW9uLmJpYXNNdWx0aXBsaWVyID0gMC41O1xyXG5jbGFzcyBDb250YWN0RXF1YXRpb24gZXh0ZW5kcyBDb25zdHJhaW50RXF1YXRpb24ge1xyXG4gICAgdXBkYXRlUmlnaHRQYXJ0KGR0KSB7XHJcbiAgICAgICAgY29uc3QgeyBib2R5MSwgYm9keTIsIHRyZXNob2xkLCBiaWFzRmFjdG9yLCByYSwgcmIsIG4sIHBvc2l0aW9uRXJyb3IgfSA9IHRoaXMuY29uc3RyYWludDtcclxuICAgICAgICBjb25zdCByZWxhdGl2ZVZlbG9jaXR5ID0gdjMuZGlmZih2My5zdW0oYm9keTIuZ2V0VmVsb2NpdHkoKSwgdjMuY3Jvc3MoYm9keTIuZ2V0QW5ndWxhclZlbG9jaXR5KCksIHJiKSksIHYzLnN1bShib2R5MS5nZXRWZWxvY2l0eSgpLCB2My5jcm9zcyhib2R5MS5nZXRBbmd1bGFyVmVsb2NpdHkoKSwgcmEpKSk7XHJcbiAgICAgICAgY29uc3QgcmVsYXRpdmVWZWxvY2l0eU5vcm1hbFByb2plY3Rpb24gPSB2My5kb3QocmVsYXRpdmVWZWxvY2l0eSwgbik7XHJcbiAgICAgICAgdGhpcy5iaWFzID1cclxuICAgICAgICAgICAgKE1hdGgubWF4KDAsIHBvc2l0aW9uRXJyb3IgLSB0cmVzaG9sZCkgLyBkdCkgKiBiaWFzRmFjdG9yIC1cclxuICAgICAgICAgICAgICAgIHJlbGF0aXZlVmVsb2NpdHlOb3JtYWxQcm9qZWN0aW9uO1xyXG4gICAgfVxyXG59XHJcbmNsYXNzIEZyaWN0aW9uRXF1YXRpb24gZXh0ZW5kcyBDb25zdHJhaW50RXF1YXRpb24ge1xyXG4gICAgY29uc3RydWN0b3IoY29uc3RyYWludCwgZGlyKSB7XHJcbiAgICAgICAgc3VwZXIoY29uc3RyYWludCk7XHJcbiAgICAgICAgdGhpcy5kaXIgPSBkaXI7XHJcbiAgICAgICAgdGhpcy5wcmV2TGFtYmRhID0gdGhpcy5jb25zdHJhaW50LnByZXZUYW5MYW1iZGFzW2Rpcl07XHJcbiAgICAgICAgdGhpcy5sYW1iZGFNYXggPSB0aGlzLmNvbnN0cmFpbnQucHJldkxhbWJkYSAqICh0aGlzLmNvbnN0cmFpbnQuYm9keTEuZ2V0RnJpY3Rpb24oKSArIHRoaXMuY29uc3RyYWludC5ib2R5Mi5nZXRGcmljdGlvbigpKSAqIDEwO1xyXG4gICAgICAgIHRoaXMubGFtYmRhTWluID0gLXRoaXMubGFtYmRhTWF4O1xyXG4gICAgfVxyXG4gICAgdXBkYXRlSmFjb2JpYW4oKSB7XHJcbiAgICAgICAgY29uc3QgeyBib2R5MSwgYm9keTIsIHJhLCByYiB9ID0gdGhpcy5jb25zdHJhaW50O1xyXG4gICAgICAgIGNvbnN0IG4gPSB0aGlzLmRpclxyXG4gICAgICAgICAgICA/IHRoaXMuY29uc3RyYWludC5qXHJcbiAgICAgICAgICAgIDogdGhpcy5jb25zdHJhaW50Lmk7XHJcbiAgICAgICAgaWYgKGJvZHkxLmlzU3RhdGljKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5KMSA9IG51bGxWZWM7XHJcbiAgICAgICAgICAgIHRoaXMuSjIgPSBudWxsVmVjO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5KMSA9IHYzLnNjYWxlKG4sIC0xKTtcclxuICAgICAgICAgICAgdGhpcy5KMiA9IHYzLmNyb3NzKG4sIHJhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJvZHkyLmlzU3RhdGljKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5KMyA9IG51bGxWZWM7XHJcbiAgICAgICAgICAgIHRoaXMuSjQgPSBudWxsVmVjO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5KMyA9IG47XHJcbiAgICAgICAgICAgIHRoaXMuSjQgPSB2My5jcm9zcyhyYiwgbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdXBkYXRlUmlnaHRQYXJ0KCkge1xyXG4gICAgICAgIGNvbnN0IHsgYm9keTEsIGJvZHkyLCByYSwgcmIgfSA9IHRoaXMuY29uc3RyYWludDtcclxuICAgICAgICBjb25zdCBuID0gdGhpcy5kaXJcclxuICAgICAgICAgICAgPyB0aGlzLmNvbnN0cmFpbnQualxyXG4gICAgICAgICAgICA6IHRoaXMuY29uc3RyYWludC5pO1xyXG4gICAgICAgIGNvbnN0IHJlbGF0aXZlVmVsb2NpdHkgPSB2My5kaWZmKHYzLnN1bShib2R5Mi5nZXRWZWxvY2l0eSgpLCB2My5jcm9zcyhib2R5Mi5nZXRBbmd1bGFyVmVsb2NpdHkoKSwgcmIpKSwgdjMuc3VtKGJvZHkxLmdldFZlbG9jaXR5KCksIHYzLmNyb3NzKGJvZHkxLmdldEFuZ3VsYXJWZWxvY2l0eSgpLCByYSkpKTtcclxuICAgICAgICBsZXQgcmVsYXRpdmVWZWxvY2l0eU5vcm1hbFByb2plY3Rpb24gPSB2My5kb3QocmVsYXRpdmVWZWxvY2l0eSwgbik7XHJcbiAgICAgICAgLy9pZihNYXRoLmFicyhyZWxhdGl2ZVZlbG9jaXR5Tm9ybWFsUHJvamVjdGlvbikgPCAwLjAwMDAwMSkgcmVsYXRpdmVWZWxvY2l0eU5vcm1hbFByb2plY3Rpb24gPSAwXHJcbiAgICAgICAgdGhpcy5iaWFzID0gLShyZWxhdGl2ZVZlbG9jaXR5Tm9ybWFsUHJvamVjdGlvbik7XHJcbiAgICB9XHJcbiAgICBhcHBseUltcHVsc2UobGFtYmRhKSB7XHJcbiAgICAgICAgdGhpcy5jb25zdHJhaW50LnByZXZUYW5MYW1iZGFzW3RoaXMuZGlyXSA9IGxhbWJkYTtcclxuICAgICAgICB0aGlzLmNvbnN0cmFpbnQuYm9keTEuYXBwbHlJbXB1bHNlKHYzLnNjYWxlKHRoaXMuSjEsIGxhbWJkYSksIHRoaXMuY29uc3RyYWludC5yYSk7XHJcbiAgICAgICAgdGhpcy5jb25zdHJhaW50LmJvZHkyLmFwcGx5SW1wdWxzZSh2My5zY2FsZSh0aGlzLkozLCBsYW1iZGEpLCB0aGlzLmNvbnN0cmFpbnQucmIpO1xyXG4gICAgfVxyXG59XHJcbi8qXHJcbmNsYXNzIFBvc2l0aW9uQ29uc3RyYWludCBleHRlbmRzIENvbnN0cmFpbnQge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgYm9keTEsXHJcbiAgICBib2R5MixcclxuICAgIG4sXHJcbiAgICByYSxcclxuICAgIHJiLFxyXG4gICAgcmFMb2NhbCxcclxuICAgIHJiTG9jYWwsXHJcbiAgICBiaWFzRmFjdG9yLFxyXG4gICAgdHJlc2hvbGQsXHJcbiAgICBwZW5EZXB0aFxyXG4gICkge1xyXG4gICAgc3VwZXIoXHJcbiAgICAgIGJvZHkxLFxyXG4gICAgICBib2R5MixcclxuICAgICAgbixcclxuICAgICAgcmEsXHJcbiAgICAgIHJiLFxyXG4gICAgICByYUxvY2FsLFxyXG4gICAgICByYkxvY2FsLFxyXG4gICAgICBiaWFzRmFjdG9yLFxyXG4gICAgICBudWxsLFxyXG4gICAgICBudWxsLFxyXG4gICAgICB0cmVzaG9sZFxyXG4gICAgKTtcclxuICAgIHRoaXMucGVuRGVwdGggPSBwZW5EZXB0aDtcclxuICB9XHJcbiAgYXBwbHlSZXNvbHZpbmdJbXB1bHNlKGxhbWJkYSkge1xyXG4gICAgdGhpcy5ib2R5MS5hcHBseVBzZXVkb0ltcHVsc2UodjMuc2NhbGUodGhpcy5KWzBdLCBsYW1iZGEpLCB0aGlzLnJhKTtcclxuICAgIHRoaXMuYm9keTIuYXBwbHlQc2V1ZG9JbXB1bHNlKHYzLnNjYWxlKHRoaXMuSlsyXSwgbGFtYmRhKSwgdGhpcy5yYik7XHJcbiAgfVxyXG4gIHVwZGF0ZVJpZ2h0UGFydChkZWx0YVRpbWUpIHtcclxuICAgIGNvbnN0IHsgYm9keTEsIGJvZHkyLCByYSwgcmIsIG4sIHBlbkRlcHRoLCB0cmVzaG9sZCwgYmlhc0ZhY3RvciB9ID0gdGhpcztcclxuXHJcbiAgICB0aGlzLmJpYXMgPSAoTWF0aC5tYXgoMCwgcGVuRGVwdGggLSB0cmVzaG9sZCkgLyBkZWx0YVRpbWUpICogYmlhc0ZhY3RvcjtcclxuICB9XHJcbn1cclxuY2xhc3MgUm90YXRpb25hbENvbnN0cmFpbnQgZXh0ZW5kcyBDb25zdHJhaW50IHtcclxuICBjb25zdHJ1Y3Rvcihib2R5MSwgYm9keTIsIHJhTG9jYWwsIHJiTG9jYWwpIHtcclxuICAgIHN1cGVyKGJvZHkxLCBib2R5MiwgbnVsbCwgbnVsbCwgbnVsbCwgcmFMb2NhbCwgcmJMb2NhbCk7XHJcbiAgfVxyXG4gIHVwZGF0ZUxlZnRQYXJ0KGRlbHRhVGltZSkge1xyXG4gICAgY29uc3QgeyBib2R5MSwgYm9keTIsIHJhTG9jYWwsIHJiTG9jYWwgfSA9IHRoaXM7XHJcbiAgICB0aGlzLlBBID0gYm9keTEuY29sbGlkZXIubG9jYWxUb0dsb2JhbChyYUxvY2FsKTtcclxuICAgIHRoaXMuUEIgPSBib2R5Mi5jb2xsaWRlci5sb2NhbFRvR2xvYmFsKHJiTG9jYWwpO1xyXG4gICAgY29uc3QgcyA9IG0zLnRyYW5zZm9ybVBvaW50KGJvZHkxLmNvbGxpZGVyLlJtYXRyaXgsIHJhTG9jYWwpO1xyXG4gICAgY29uc3QgYiA9IG0zLnRyYW5zZm9ybVBvaW50KGJvZHkyLmNvbGxpZGVyLlJtYXRyaXgsIHJiTG9jYWwpO1xyXG5cclxuICAgIHRoaXMucmEgPSBzO1xyXG4gICAgdGhpcy5yYiA9IGI7XHJcblxyXG4gICAgY29uc3QgSiA9IFtbMCwgMCwgMF0sIHYzLmNyb3NzKHMsIGIpLCBbMCwgMCwgMF0sIHYzLmNyb3NzKGIsIHMpXTtcclxuXHJcbiAgICBjb25zdCBkb2YxID0gYm9keTEuRE9GO1xyXG4gICAgY29uc3QgZG9mMiA9IGJvZHkyLkRPRjtcclxuXHJcbiAgICBKWzBdWzBdICo9IGRvZjFbMF07XHJcbiAgICBKWzBdWzFdICo9IGRvZjFbMV07XHJcbiAgICBKWzBdWzJdICo9IGRvZjFbMl07XHJcblxyXG4gICAgSlsxXVswXSAqPSBkb2YxWzNdO1xyXG4gICAgSlsxXVsxXSAqPSBkb2YxWzRdO1xyXG4gICAgSlsxXVsyXSAqPSBkb2YxWzVdO1xyXG5cclxuICAgIEpbMl1bMF0gKj0gZG9mMlswXTtcclxuICAgIEpbMl1bMV0gKj0gZG9mMlsxXTtcclxuICAgIEpbMl1bMl0gKj0gZG9mMlsyXTtcclxuXHJcbiAgICBKWzNdWzBdICo9IGRvZjJbM107XHJcbiAgICBKWzNdWzFdICo9IGRvZjJbNF07XHJcbiAgICBKWzNdWzJdICo9IGRvZjJbNV07XHJcbiAgICBjb25zdCBJMSA9IGJvZHkxLmdldEludmVyc2VJbmVydGlhVGVuc29yKCk7XHJcbiAgICBjb25zdCBJMiA9IGJvZHkyLmdldEludmVyc2VJbmVydGlhVGVuc29yKCk7XHJcbiAgICB0aGlzLkogPSBKO1xyXG4gICAgdGhpcy5KTSA9IFtcclxuICAgICAgWzAsIDAsIDBdLFxyXG4gICAgICBtMy50cmFuc2Zvcm1Qb2ludChJMSwgdGhpcy5KWzFdKSxcclxuICAgICAgWzAsIDAsIDBdLFxyXG4gICAgICBtMy50cmFuc2Zvcm1Qb2ludChJMiwgdGhpcy5KWzNdKSxcclxuICAgIF07XHJcbiAgICB0aGlzLmVmZk1hc3MgPVxyXG4gICAgICB2My5kb3QodGhpcy5KTVsxXSwgdGhpcy5KWzFdKSArIHYzLmRvdCh0aGlzLkpNWzNdLCB0aGlzLkpbM10pO1xyXG4gICAgdGhpcy5CID0gW1xyXG4gICAgICBbMCwgMCwgMCwgLi4udGhpcy5KTVsxXV0sXHJcbiAgICAgIFswLCAwLCAwLCAuLi50aGlzLkpNWzNdXSxcclxuICAgIF07XHJcbiAgICB0aGlzLl9KID0gW1xyXG4gICAgICBbLi4udGhpcy5KWzBdLCAuLi50aGlzLkpbMV1dLFxyXG4gICAgICBbLi4udGhpcy5KWzJdLCAuLi50aGlzLkpbM11dLFxyXG4gICAgXTtcclxuICB9XHJcbiAgdXBkYXRlUmlnaHRQYXJ0KGRlbHRhVGltZSkge1xyXG4gICAgY29uc3QgeyBib2R5MSwgYm9keTIgfSA9IHRoaXM7XHJcblxyXG4gICAgdGhpcy5iaWFzID1cclxuICAgICAgLXYzLmRvdCh0aGlzLkpbMV0sIGJvZHkxLmdldEFuZ3VsYXJWZWxvY2l0eSgpKSArIHYzLmRvdCh0aGlzLkpbM10sIGJvZHkyLmdldEFuZ3VsYXJWZWxvY2l0eSgpKTtcclxuICB9XHJcbiAgYXBwbHlSZXNvbHZpbmdJbXB1bHNlKGxhbWJkYSkge1xyXG4gICAgY29uc3QgeyBib2R5MSwgYm9keTIgfSA9IHRoaXM7XHJcbiAgICBib2R5MS5hZGRBbmd1bGFyVih2My5zY2FsZSh0aGlzLnJhLCBsYW1iZGEpKTtcclxuICAgIGJvZHkyLmFkZEFuZ3VsYXJWKHYzLnNjYWxlKHRoaXMucmIsIGxhbWJkYSkpO1xyXG4gIH1cclxufVxyXG4qL1xyXG4vKlxyXG5jbGFzcyBKb2ludCBleHRlbmRzIENvbnN0cmFpbnQge1xyXG4gIGNvbnN0cnVjdG9yKGJvZHkxLCBib2R5MiwgcmFMb2NhbCwgcmJMb2NhbCwgYmlhc0ZhY3RvciA9IDApIHtcclxuICAgIHN1cGVyKGJvZHkxLCBib2R5MiwgbnVsbCwgbnVsbCwgbnVsbCwgcmFMb2NhbCwgcmJMb2NhbCwgYmlhc0ZhY3Rvcik7XHJcblxyXG4gICAgdGhpcy50cmVzaG9sZCA9IDAuMDAwMTtcclxuICAgIHRoaXMucmVkdWNlciA9IDAuNTtcclxuICAgIHRoaXMubWF4SW1wdWxzZSA9IDAuNztcclxuICB9XHJcbiAgdXBkYXRlTGVmdFBhcnQoZGVsdGFUaW1lKSB7XHJcbiAgICBjb25zdCB7IGJvZHkxLCBib2R5MiwgcmFMb2NhbCwgcmJMb2NhbCB9ID0gdGhpcztcclxuICAgIHRoaXMuUEEgPSBib2R5MS5jb2xsaWRlci5sb2NhbFRvR2xvYmFsKHJhTG9jYWwpO1xyXG4gICAgdGhpcy5QQiA9IGJvZHkyLmNvbGxpZGVyLmxvY2FsVG9HbG9iYWwocmJMb2NhbCk7XHJcbiAgICBjb25zdCBkaXIgPSB2My5kaWZmKHRoaXMuUEEsIHRoaXMuUEIpO1xyXG4gICAgY29uc3QgbiA9IGRpcjtcclxuICAgIHRoaXMubiA9IG47XHJcbiAgICB0aGlzLnJhID0gZGlmZih0aGlzLlBBLCB0aGlzLmJvZHkxLmNvbGxpZGVyLnBvcyk7XHJcbiAgICB0aGlzLnJiID0gZGlmZih0aGlzLlBCLCB0aGlzLmJvZHkyLmNvbGxpZGVyLnBvcyk7XHJcbiAgICB0aGlzLnBlbkRlcHRoID0gbm9ybShkaXIpO1xyXG5cclxuICAgIGNvbnN0IEogPSBbXHJcbiAgICAgIHYzLnNjYWxlKHRoaXMubiwgLTEpLFxyXG4gICAgICB2My5jcm9zcyh0aGlzLm4sIHRoaXMucmEpLFxyXG4gICAgICB0aGlzLm4sXHJcbiAgICAgIHYzLmNyb3NzKHRoaXMucmIsIHRoaXMubiksXHJcbiAgICBdO1xyXG5cclxuICAgIGNvbnN0IGRvZjEgPSBib2R5MS5ET0Y7XHJcbiAgICBjb25zdCBkb2YyID0gYm9keTIuRE9GO1xyXG5cclxuICAgIEpbMF1bMF0gKj0gZG9mMVswXTtcclxuICAgIEpbMF1bMV0gKj0gZG9mMVsxXTtcclxuICAgIEpbMF1bMl0gKj0gZG9mMVsyXTtcclxuXHJcbiAgICBKWzFdWzBdICo9IGRvZjFbM107XHJcbiAgICBKWzFdWzFdICo9IGRvZjFbNF07XHJcbiAgICBKWzFdWzJdICo9IGRvZjFbNV07XHJcblxyXG4gICAgSlsyXVswXSAqPSBkb2YyWzBdO1xyXG4gICAgSlsyXVsxXSAqPSBkb2YyWzFdO1xyXG4gICAgSlsyXVsyXSAqPSBkb2YyWzJdO1xyXG5cclxuICAgIEpbM11bMF0gKj0gZG9mMlszXTtcclxuICAgIEpbM11bMV0gKj0gZG9mMls0XTtcclxuICAgIEpbM11bMl0gKj0gZG9mMls1XTtcclxuICAgIGNvbnN0IEkxID0gYm9keTEuZ2V0SW52ZXJzZUluZXJ0aWFUZW5zb3IoKTtcclxuICAgIGNvbnN0IEkyID0gYm9keTIuZ2V0SW52ZXJzZUluZXJ0aWFUZW5zb3IoKTtcclxuICAgIGxldCBNMSA9IGJvZHkxLmdldEludmVyc2VNYXNzKCk7XHJcbiAgICBsZXQgTTIgPSBib2R5Mi5nZXRJbnZlcnNlTWFzcygpO1xyXG4gICAgdGhpcy5KID0gSjtcclxuICAgIHRoaXMuSk0gPSBbXHJcbiAgICAgIHNjYWxlKHRoaXMuSlswXSwgTTEpLFxyXG4gICAgICBtMy50cmFuc2Zvcm1Qb2ludChJMSwgdGhpcy5KWzFdKSxcclxuICAgICAgc2NhbGUodGhpcy5KWzJdLCBNMiksXHJcbiAgICAgIG0zLnRyYW5zZm9ybVBvaW50KEkyLCB0aGlzLkpbM10pLFxyXG4gICAgXTtcclxuICAgIHRoaXMuZWZmTWFzcyA9XHJcbiAgICAgIGRvdCh0aGlzLkpNWzBdLCBKWzBdKSArXHJcbiAgICAgIGRvdCh0aGlzLkpNWzFdLCB0aGlzLkpbMV0pICtcclxuICAgICAgZG90KHRoaXMuSk1bMl0sIEpbMl0pICtcclxuICAgICAgZG90KHRoaXMuSk1bM10sIHRoaXMuSlszXSk7XHJcbiAgICB0aGlzLkIgPSBbXHJcbiAgICAgIFsuLi50aGlzLkpNWzBdLCAuLi50aGlzLkpNWzFdXSxcclxuICAgICAgWy4uLnRoaXMuSk1bMl0sIC4uLnRoaXMuSk1bM11dLFxyXG4gICAgXTtcclxuICAgIHRoaXMuX0ogPSBbXHJcbiAgICAgIFsuLi50aGlzLkpbMF0sIC4uLnRoaXMuSlsxXV0sXHJcbiAgICAgIFsuLi50aGlzLkpbMl0sIC4uLnRoaXMuSlszXV0sXHJcbiAgICBdO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlUmlnaHRQYXJ0KGRlbHRhVGltZSkge1xyXG4gICAgY29uc3QgeyBib2R5MSwgYm9keTIsIHJhLCByYiwgbiwgcGVuRGVwdGgsIHRyZXNob2xkLCBiaWFzRmFjdG9yIH0gPSB0aGlzO1xyXG5cclxuICAgIGNvbnN0IHJlbGF0aXZlVmVsb2NpdHkgPSBkaWZmKFxyXG4gICAgICBzdW0oYm9keTIuZ2V0VmVsb2NpdHkoKSwgY3Jvc3MoYm9keTIuZ2V0QW5ndWxhclZlbG9jaXR5KCksIHJiKSksXHJcbiAgICAgIHN1bShib2R5MS5nZXRWZWxvY2l0eSgpLCBjcm9zcyhib2R5MS5nZXRBbmd1bGFyVmVsb2NpdHkoKSwgcmEpKVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCByZWxhdGl2ZVZlbG9jaXR5Tm9ybWFsUHJvamVjdGlvbiA9IGRvdChyZWxhdGl2ZVZlbG9jaXR5LCBuKTtcclxuICAgIGNvbnN0IGZhYyA9IHBlbkRlcHRoICoqIDIgPiB0cmVzaG9sZDtcclxuICAgIHRoaXMuYmlhcyA9XHJcbiAgICAgIChiaWFzRmFjdG9yICogTWF0aC5tYXgocGVuRGVwdGggKiogMiAtIHRyZXNob2xkLCAwKSkgLyBkZWx0YVRpbWUgLVxyXG4gICAgICByZWxhdGl2ZVZlbG9jaXR5Tm9ybWFsUHJvamVjdGlvbjtcclxuICAgIHRoaXMuYmlhcyAqPSBmYWM7XHJcbiAgfVxyXG4gIGFwcGx5UmVzb2x2aW5nSW1wdWxzZShsYW1iZGEpIHtcclxuICAgIHRoaXMuYm9keTEuYXBwbHlJbXB1bHNlKHNjYWxlKHRoaXMuSlswXSwgbGFtYmRhKSwgdGhpcy5yYSk7XHJcbiAgICB0aGlzLmJvZHkyLmFwcGx5SW1wdWxzZShzY2FsZSh0aGlzLkpbMl0sIGxhbWJkYSksIHRoaXMucmIpO1xyXG4gIH1cclxuICBhcHBseVJlc29sdmluZ1BzZXVkb0ltcHVsc2UobGFtYmRhKSB7XHJcbiAgICBjb25zdCBtYXggPSB0aGlzLmVmZk1hc3MgKiAxMDtcclxuICAgIC8vbGFtYmRhID0gY2xhbXAobGFtYmRhLCAtMSwgMSlcclxuICAgIHRoaXMuYm9keTEuYXBwbHlQc2V1ZG9JbXB1bHNlKHNjYWxlKHRoaXMubiwgLWxhbWJkYSksIFswLCAwLCAwXSk7XHJcbiAgICB0aGlzLmJvZHkyLmFwcGx5UHNldWRvSW1wdWxzZShzY2FsZSh0aGlzLm4sIGxhbWJkYSksIFswLCAwLCAwXSk7XHJcbiAgfVxyXG59XHJcbmNsYXNzIEpvaW50UG9zaXRpb25Db25zdHJhaW50IGV4dGVuZHMgSm9pbnQge1xyXG4gIHVwZGF0ZVJpZ2h0UGFydChkZWx0YVRpbWUpIHtcclxuICAgIGNvbnN0IHsgcGVuRGVwdGgsIHRyZXNob2xkLCBiaWFzRmFjdG9yIH0gPSB0aGlzO1xyXG5cclxuICAgIGNvbnN0IGZhYyA9IHBlbkRlcHRoICoqIDIgPiB0cmVzaG9sZDtcclxuICAgIHRoaXMuYmlhcyA9XHJcbiAgICAgICgoYmlhc0ZhY3RvciAqIE1hdGgubWF4KHBlbkRlcHRoICoqIDIgLSB0cmVzaG9sZCwgMCkpIC8gZGVsdGFUaW1lKSAqIGZhYztcclxuICB9XHJcbiAgYXBwbHlSZXNvbHZpbmdJbXB1bHNlKGxhbWJkYSkge1xyXG4gICAgLy9pZihsYW1iZGEgPCAwLjEpcmV0dXJuXHJcbiAgICB0aGlzLmJvZHkxLmFwcGx5UHNldWRvSW1wdWxzZShzY2FsZSh0aGlzLkpbMF0sIGxhbWJkYSksIHRoaXMucmEpO1xyXG4gICAgdGhpcy5ib2R5Mi5hcHBseVBzZXVkb0ltcHVsc2Uoc2NhbGUodGhpcy5KWzJdLCBsYW1iZGEpLCB0aGlzLnJiKTtcclxuICB9XHJcbn0qL1xyXG5leHBvcnQgeyBDb250YWN0RXF1YXRpb24sIENvbnN0cmFpbnRFcXVhdGlvbiwgXHJcbi8vSm9pbnQsXHJcbkZyaWN0aW9uRXF1YXRpb24sXHJcbi8vUG9zaXRpb25Db25zdHJhaW50LFxyXG4vL0pvaW50UG9zaXRpb25Db25zdHJhaW50LFxyXG4vL1JvdGF0aW9uYWxDb25zdHJhaW50LFxyXG4gfTtcclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRFbWl0dGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZXZlbnRzID0ge307XHJcbiAgICB9XHJcbiAgICBvbihldmVudE5hbWUsIGZuKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmV2ZW50c1tldmVudE5hbWVdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5wdXNoKGZuKTtcclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gdGhpcy5ldmVudHNbZXZlbnROYW1lXS5maWx0ZXIoKGV2ZW50Rm4pID0+IGZuICE9PSBldmVudEZuKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgZW1pdChldmVudE5hbWUsIGRhdGEpIHtcclxuICAgICAgICBpZiAodGhpcy5ldmVudHNbZXZlbnROYW1lXSkge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLmZvckVhY2goKGZuKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmbi5jYWxsKG51bGwsIGRhdGEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiLi9FdmVudEVtaXR0ZXJcIjtcclxuaW1wb3J0IHsgbTMsIHYzIH0gZnJvbSAncm9tYW5wcHBtYXRoJztcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi9jb25maWdcIjtcclxuY29uc3QgeyBSSUdJRF9CT0RZX01PVkVfVFJFU0hPTEQsIFJJR0lEX0JPRFlfQUFCQl9CSUFTIH0gPSBjb25maWc7XHJcbmNsYXNzIFJpZ2lkQm9keSBleHRlbmRzIEV2ZW50RW1pdHRlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb2xsaWRlcikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zdGF0aWMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvbGxpZGVyID0gY29sbGlkZXI7XHJcbiAgICAgICAgdGhpcy5tYXNzID0gMTtcclxuICAgICAgICB0aGlzLmludmVyc2VNYXNzID0gMSAvIHRoaXMubWFzcztcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gWzAsIDAsIDBdO1xyXG4gICAgICAgIHRoaXMucHNldWRvVmVsb2NpdHkgPSBbMCwgMCwgMF07XHJcbiAgICAgICAgdGhpcy5wc2V1ZG9Bbmd1bGFyViA9IFswLCAwLCAwXTtcclxuICAgICAgICB0aGlzLmFjY2VsZXJhdGlvbiA9IFswLCAwLCAwXTtcclxuICAgICAgICB0aGlzLm9tZWdhID0gWzAsIDAsIDBdO1xyXG4gICAgICAgIHRoaXMuaW52ZXJzZUluZXJ0aWFUZW5zb3IgPSBjb2xsaWRlci5nZXRJbnZlcnNlSW5lcnRpYVRlbnNvcih0aGlzLm1hc3MpO1xyXG4gICAgICAgIHRoaXMuaWQgPSBSaWdpZEJvZHkubGFzdElkKys7XHJcbiAgICAgICAgdGhpcy5mcmljdGlvbiA9IDU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVFdmVudEZ1bmN0aW9ucyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZ3JvdXAgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubmVlZFRvVXBkYXRlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBnZXRJZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pZDtcclxuICAgIH1cclxuICAgIGdldEdyb3VwKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdyb3VwO1xyXG4gICAgfVxyXG4gICAgc2V0R3JvdXAoZ3JvdXBJZCkge1xyXG4gICAgICAgIHRoaXMuZ3JvdXAgPSBncm91cElkO1xyXG4gICAgfVxyXG4gICAgZ2V0TWFzcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXNzO1xyXG4gICAgfVxyXG4gICAgZ2V0SW52ZXJzZU1hc3MoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW52ZXJzZU1hc3M7XHJcbiAgICB9XHJcbiAgICBnZXRUcmFuc2xhdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRDb2xsaWRlcigpLmdldFRyYW5zbGF0aW9uKCk7XHJcbiAgICB9XHJcbiAgICBnZXRDb2xsaWRlcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb2xsaWRlcjtcclxuICAgIH1cclxuICAgIGlzU3RhdGljKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRpYztcclxuICAgIH1cclxuICAgIGdldFJvdGF0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldENvbGxpZGVyKCkuZ2V0Um1hdHJpeCgpO1xyXG4gICAgfVxyXG4gICAgZ2V0VmVsb2NpdHkoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmVsb2NpdHk7XHJcbiAgICB9XHJcbiAgICBnZXRBY2NlbGVyYXRpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWNjZWxlcmF0aW9uO1xyXG4gICAgfVxyXG4gICAgZ2V0QW5ndWxhclZlbG9jaXR5KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9tZWdhO1xyXG4gICAgfVxyXG4gICAgZ2V0RnJpY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZnJpY3Rpb247XHJcbiAgICB9XHJcbiAgICBnZXRJbnZlcnNlSW5lcnRpYVRlbnNvcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnZlcnNlSW5lcnRpYVRlbnNvcjtcclxuICAgIH1cclxuICAgIGdldEFBQkIoKSB7XHJcbiAgICAgICAgY29uc3QgYWFiYiA9IHRoaXMuY29sbGlkZXIuZ2V0QUFCQigpO1xyXG4gICAgICAgIGNvbnN0IHZlbG9jaXR5ID0gdGhpcy52ZWxvY2l0eTtcclxuICAgICAgICBjb25zdCB0ciA9IFtSSUdJRF9CT0RZX0FBQkJfQklBUywgUklHSURfQk9EWV9BQUJCX0JJQVMsIFJJR0lEX0JPRFlfQUFCQl9CSUFTXTtcclxuICAgICAgICBhYWJiLm1pbiA9IHYzLmRpZmYoYWFiYi5taW4sIHRyKTtcclxuICAgICAgICBhYWJiLm1heCA9IHYzLnN1bShhYWJiLm1heCwgdHIpO1xyXG4gICAgICAgIHJldHVybiBhYWJiO1xyXG4gICAgfVxyXG4gICAgYWRkVmVsb2NpdHkodikge1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSB2My5zdW0odGhpcy52ZWxvY2l0eSwgdik7XHJcbiAgICB9XHJcbiAgICBhZGRBbmd1bGFyVmVsb2NpdHkodikge1xyXG4gICAgICAgIHRoaXMub21lZ2EgPSB2My5zdW0odGhpcy5vbWVnYSwgdik7XHJcbiAgICB9XHJcbiAgICBhZGRBY2NlbGVyYXRpb24odikge1xyXG4gICAgICAgIHRoaXMuYWNjZWxlcmF0aW9uID0gdjMuc3VtKHRoaXMuYWNjZWxlcmF0aW9uLCB2KTtcclxuICAgIH1cclxuICAgIHRyYW5zbGF0ZSh0cmFuc2xhdGlvbikge1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXIudHJhbnNsYXRlKHRyYW5zbGF0aW9uKTtcclxuICAgICAgICB0aGlzLm5lZWRUb1VwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5lbWl0VXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICByb3RhdGUocm90YXRpb24pIHtcclxuICAgICAgICB0aGlzLmNvbGxpZGVyLnJvdGF0ZShyb3RhdGlvbik7XHJcbiAgICAgICAgdGhpcy5uZWVkVG9VcGRhdGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZW1pdFVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgc2V0SWQoaWQpIHtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB9XHJcbiAgICBzZXRNYXNzKG1hc3MpIHtcclxuICAgICAgICB0aGlzLm1hc3MgPSBtYXNzO1xyXG4gICAgICAgIHRoaXMuaW52ZXJzZU1hc3MgPSAxIC8gdGhpcy5tYXNzO1xyXG4gICAgfVxyXG4gICAgc2V0RnJpY3Rpb24oZikge1xyXG4gICAgICAgIHRoaXMuZnJpY3Rpb24gPSBmO1xyXG4gICAgfVxyXG4gICAgc2V0Um90YXRpb24ocikge1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXIuc2V0Um90YXRpb24ocik7XHJcbiAgICAgICAgdGhpcy5uZWVkVG9VcGRhdGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZW1pdFVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgc2V0VHJhbnNsYXRpb24odCkge1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXIuc2V0VHJhbnNsYXRpb24odCk7XHJcbiAgICAgICAgdGhpcy5uZWVkVG9VcGRhdGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZW1pdFVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgc2V0VmVsb2NpdHkodikge1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSB2O1xyXG4gICAgfVxyXG4gICAgc2V0QW5ndWxhclZlbG9jaXR5KHYpIHtcclxuICAgICAgICB0aGlzLm9tZWdhID0gdjtcclxuICAgIH1cclxuICAgIHNldFN0YXRpYyhiKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0aWMgPSBiO1xyXG4gICAgfVxyXG4gICAgaW50ZWdyYXRlUks0KGR0KSB7XHJcbiAgICAgICAgY29uc3QgeyBhY2NlbGVyYXRpb24sIHZlbG9jaXR5LCBvbWVnYSB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCBfdHJhbnNsYXRpb24gPSB2My5zY2FsZSh2My5zdW0odmVsb2NpdHksIHYzLnNjYWxlKGFjY2VsZXJhdGlvbiwgKDIgLyAzKSAqIGR0KSksIGR0KTtcclxuICAgICAgICBjb25zdCBfcm90YXRpb24gPSB2My5zY2FsZShvbWVnYSwgZHQgLyAyKTtcclxuICAgICAgICBjb25zdCBkZWx0YVZlbG9jaXR5ID0gdjMuc2NhbGUoYWNjZWxlcmF0aW9uLCBkdCk7XHJcbiAgICAgICAgaWYgKHYzLm5vcm0oX3RyYW5zbGF0aW9uKSA+IGNvbmZpZy5SSUdJRF9CT0RZX01PVkVfVFJFU0hPTEQpXHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNsYXRlKF90cmFuc2xhdGlvbik7XHJcbiAgICAgICAgaWYgKHYzLm5vcm0oX3JvdGF0aW9uKSA+IGNvbmZpZy5SSUdJRF9CT0RZX01PVkVfVFJFU0hPTEQpXHJcbiAgICAgICAgICAgIHRoaXMucm90YXRlKF9yb3RhdGlvbik7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHYzLnN1bSh2ZWxvY2l0eSwgZGVsdGFWZWxvY2l0eSk7XHJcbiAgICB9XHJcbiAgICBpbnRlZ3JhdGVQc2V1ZG9WZWxvY2l0aWVzKGR0KSB7XHJcbiAgICAgICAgY29uc3QgdHJhbnNsYXRpb24gPSB2My5zY2FsZSh0aGlzLnBzZXVkb1ZlbG9jaXR5LCBkdCk7XHJcbiAgICAgICAgY29uc3Qgcm90YXRpb24gPSB2My5zY2FsZSh0aGlzLnBzZXVkb0FuZ3VsYXJWLCBkdCk7XHJcbiAgICAgICAgaWYgKHYzLm5vcm0odHJhbnNsYXRpb24pID4gY29uZmlnLlJJR0lEX0JPRFlfTU9WRV9UUkVTSE9MRClcclxuICAgICAgICAgICAgdGhpcy50cmFuc2xhdGUodHJhbnNsYXRpb24pO1xyXG4gICAgICAgIGlmICh2My5ub3JtKHJvdGF0aW9uKSA+IGNvbmZpZy5SSUdJRF9CT0RZX01PVkVfVFJFU0hPTEQpXHJcbiAgICAgICAgICAgIHRoaXMucm90YXRlKHJvdGF0aW9uKTtcclxuICAgICAgICB0aGlzLnBzZXVkb1ZlbG9jaXR5ID0gWzAsIDAsIDBdO1xyXG4gICAgICAgIHRoaXMucHNldWRvQW5ndWxhclYgPSBbMCwgMCwgMF07XHJcbiAgICB9XHJcbiAgICBhZGRQc2V1ZG9WZWxvY2l0eSh2KSB7XHJcbiAgICAgICAgdGhpcy5wc2V1ZG9WZWxvY2l0eSA9IHYzLnN1bSh0aGlzLnBzZXVkb1ZlbG9jaXR5LCB2KTtcclxuICAgIH1cclxuICAgIGFkZFBzZXVkb0FuZ3VsYXJWKHYpIHtcclxuICAgICAgICB0aGlzLnBzZXVkb0FuZ3VsYXJWID0gdjMuc3VtKHRoaXMucHNldWRvQW5ndWxhclYsIHYpO1xyXG4gICAgfVxyXG4gICAgaW50ZWdyYXRlVmVsb2NpdGllcyhkdCkge1xyXG4gICAgICAgIGNvbnN0IHRyYW5zbGF0aW9uID0gdjMuc2NhbGUodjMuZGlmZih0aGlzLnZlbG9jaXR5LCB2My5zY2FsZSh0aGlzLmFjY2VsZXJhdGlvbiwgZHQgLyAzKSksIGR0KTtcclxuICAgICAgICBpZiAodjMubm9ybSh0cmFuc2xhdGlvbikgPiBjb25maWcuUklHSURfQk9EWV9NT1ZFX1RSRVNIT0xEKVxyXG4gICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZSh0cmFuc2xhdGlvbik7XHJcbiAgICAgICAgY29uc3Qgcm90YXRpb24gPSB2My5zY2FsZSh0aGlzLm9tZWdhLCBkdCAvIDIpO1xyXG4gICAgICAgIGlmICh2My5ub3JtKHJvdGF0aW9uKSA+IGNvbmZpZy5SSUdJRF9CT0RZX01PVkVfVFJFU0hPTEQpXHJcbiAgICAgICAgICAgIHRoaXMucm90YXRlKHJvdGF0aW9uKTtcclxuICAgIH1cclxuICAgIGludGVncmF0ZUZvcmNlcyhkdCkge1xyXG4gICAgICAgIGxldCBkZWx0YVNwZWVkID0gdjMuc2NhbGUodGhpcy5hY2NlbGVyYXRpb24sIGR0KTtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gdjMuc3VtKHRoaXMudmVsb2NpdHksIGRlbHRhU3BlZWQpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlSW52ZXJzZUluZXJ0aWEoKSB7XHJcbiAgICAgICAgdGhpcy5pbnZlcnNlSW5lcnRpYVRlbnNvciA9IHRoaXMuY29sbGlkZXIuZ2V0SW52ZXJzZUluZXJ0aWFUZW5zb3IodGhpcy5tYXNzKTtcclxuICAgIH1cclxuICAgIGFwcGx5SW1wdWxzZShpbXB1bHNlLCBwb2ludCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRpYylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSB2My5zdW0odGhpcy52ZWxvY2l0eSwgdjMuc2NhbGUoaW1wdWxzZSwgdGhpcy5pbnZlcnNlTWFzcykpO1xyXG4gICAgICAgIGNvbnN0IGFuZ3VsYXJJbXB1bHNlID0gbTMudHJhbnNmb3JtUG9pbnQodGhpcy5pbnZlcnNlSW5lcnRpYVRlbnNvciwgdjMuY3Jvc3MocG9pbnQsIGltcHVsc2UpKTtcclxuICAgICAgICB0aGlzLm9tZWdhID0gdjMuc3VtKHRoaXMub21lZ2EsIGFuZ3VsYXJJbXB1bHNlKTtcclxuICAgIH1cclxuICAgIGFwcGx5UHNldWRvSW1wdWxzZShpbXB1bHNlLCBwb2ludCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRpYylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMucHNldWRvVmVsb2NpdHkgPSB2My5zdW0odGhpcy5wc2V1ZG9WZWxvY2l0eSwgdjMuc2NhbGUoaW1wdWxzZSwgdGhpcy5pbnZlcnNlTWFzcykpO1xyXG4gICAgICAgIGNvbnN0IGFuZ3VsYXJJbXB1bHNlID0gbTMudHJhbnNmb3JtUG9pbnQodGhpcy5pbnZlcnNlSW5lcnRpYVRlbnNvciwgdjMuY3Jvc3MocG9pbnQsIGltcHVsc2UpKTtcclxuICAgICAgICB0aGlzLnBzZXVkb0FuZ3VsYXJWID0gdjMuc3VtKHRoaXMucHNldWRvQW5ndWxhclYsIGFuZ3VsYXJJbXB1bHNlKTtcclxuICAgIH1cclxuICAgIC8qXHJcbiAgICBhcHBseUFuZ3VsYXJJbXB1bHNlKHJhZGl1cyA6IG51bWJlciwgYXhpcywgdmFsdWUpIHtcclxuICAgICAgY29uc3QgZGlyID0gbm9ybWFsaXplKFtcclxuICAgICAgICBheGlzWzFdICsgYXhpc1syXSxcclxuICAgICAgICBheGlzWzJdIC0gYXhpc1swXSxcclxuICAgICAgICAtYXhpc1swXSAtIGF4aXNbMV0sXHJcbiAgICAgIF0pO1xyXG4gICAgICBjb25zdCByYWQgPSB2ZWN0b3IuY3Jvc3MoZGlyLCBheGlzKTtcclxuICAgICAgY29uc3QgZ2xvYmFsRGlyID0gc2NhbGUoZGlyLCB2YWx1ZSk7XHJcbiAgICAgIGNvbnN0IGdsb2JhbFJhZCA9IHNjYWxlKHJhZCwgcmFkaXVzKTtcclxuICBcclxuICAgICAgdGhpcy5hcHBseUltcHVsc2UoZ2xvYmFsRGlyLCBnbG9iYWxSYWQpO1xyXG4gICAgfSovXHJcbiAgICBnZXRFeHBhbmRlZEFBQkIoKSB7XHJcbiAgICAgICAgY29uc3QgYWFiYiA9IHRoaXMuY29sbGlkZXIuZ2V0QUFCQigpO1xyXG4gICAgICAgIGNvbnN0IHZlbG9jaXR5ID0gdGhpcy52ZWxvY2l0eTtcclxuICAgICAgICBjb25zdCB0ciA9IFtSSUdJRF9CT0RZX0FBQkJfQklBUywgUklHSURfQk9EWV9BQUJCX0JJQVMsIFJJR0lEX0JPRFlfQUFCQl9CSUFTXTtcclxuICAgICAgICBhYWJiLm1pbiA9IHYzLmRpZmYoYWFiYi5taW4sIHRyKTtcclxuICAgICAgICBhYWJiLm1heCA9IHYzLnN1bShhYWJiLm1heCwgdHIpO1xyXG4gICAgICAgIC8qaWYodmVsb2NpdHlbMF0gPiAxMCkgYWFiYi5tYXhbMF0gKz0gdmVsb2NpdHlbMF1cclxuICAgICAgICAgIGlmKHZlbG9jaXR5WzFdID4gMTApIGFhYmIubWF4WzFdICs9IHZlbG9jaXR5WzFdXHJcbiAgICAgICAgICBpZih2ZWxvY2l0eVsyXSA+IDEwKSBhYWJiLm1heFsyXSArPSB2ZWxvY2l0eVsyXVxyXG4gICAgICAgICAgaWYodmVsb2NpdHlbMF0gPCAtMTApIGFhYmIubWluWzBdICs9IHZlbG9jaXR5WzBdXHJcbiAgICAgICAgICBpZih2ZWxvY2l0eVsxXSA8IC0xMCkgYWFiYi5taW5bMV0gKz0gdmVsb2NpdHlbMV1cclxuICAgICAgICAgIGlmKHZlbG9jaXR5WzJdIDwgLTEwKSBhYWJiLm1pblsyXSArPSB2ZWxvY2l0eVsyXSovXHJcbiAgICAgICAgcmV0dXJuIGFhYmI7XHJcbiAgICB9XHJcbiAgICBvblVwZGF0ZShmdW5jKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudXBkYXRlRXZlbnRGdW5jdGlvbnMuaW5kZXhPZihmdW5jKSA+IC0xKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy51cGRhdGVFdmVudEZ1bmN0aW9ucy5wdXNoKGZ1bmMpO1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRXZlbnRGdW5jdGlvbnMuZmlsdGVyKGZuID0+IGZuICE9PSBmdW5jKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgZW1pdFVwZGF0ZSgpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50RnVuY3Rpb25zLmZvckVhY2goZm4gPT4ge1xyXG4gICAgICAgICAgICBmbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblJpZ2lkQm9keS5sYXN0SWQgPSAxO1xyXG5jbGFzcyBUZXJyYWluU2VnbWVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb2xsaWRlcikge1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXIgPSBjb2xsaWRlcjtcclxuICAgICAgICB0aGlzLmdyb3VwID0gbnVsbDtcclxuICAgICAgICB0aGlzLmZyaWN0aW9uID0gNTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50RnVuY3Rpb25zID0gW107XHJcbiAgICB9XHJcbiAgICBnZXRJZCgpIHtcclxuICAgICAgICByZXR1cm4gVGVycmFpblNlZ21lbnQuaWQ7XHJcbiAgICB9XHJcbiAgICBnZXRHcm91cCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ncm91cDtcclxuICAgIH1cclxuICAgIHNldEdyb3VwKGdyb3VwSWQpIHtcclxuICAgICAgICB0aGlzLmdyb3VwID0gZ3JvdXBJZDtcclxuICAgIH1cclxuICAgIGdldE1hc3MoKSB7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICB9XHJcbiAgICBnZXRJbnZlcnNlTWFzcygpIHtcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIH1cclxuICAgIGdldFRyYW5zbGF0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldENvbGxpZGVyKCkuZ2V0VHJhbnNsYXRpb24oKTtcclxuICAgIH1cclxuICAgIGdldENvbGxpZGVyKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbGxpZGVyO1xyXG4gICAgfVxyXG4gICAgaXNTdGF0aWMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBnZXRSb3RhdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRDb2xsaWRlcigpLmdldFJtYXRyaXgoKTtcclxuICAgIH1cclxuICAgIGdldFZlbG9jaXR5KCkge1xyXG4gICAgICAgIHJldHVybiBbMCwgMCwgMF07XHJcbiAgICB9XHJcbiAgICBnZXRBY2NlbGVyYXRpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIFswLCAwLCAwXTtcclxuICAgIH1cclxuICAgIGdldEFuZ3VsYXJWZWxvY2l0eSgpIHtcclxuICAgICAgICByZXR1cm4gWzAsIDAsIDBdO1xyXG4gICAgfVxyXG4gICAgZ2V0RnJpY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZnJpY3Rpb247XHJcbiAgICB9XHJcbiAgICBnZXRJbnZlcnNlSW5lcnRpYVRlbnNvcigpIHtcclxuICAgICAgICByZXR1cm4gbTMuaWRlbnRpdHkoKTtcclxuICAgIH1cclxuICAgIGdldEFBQkIoKSB7XHJcbiAgICAgICAgY29uc3QgYWFiYiA9IHRoaXMuY29sbGlkZXIuZ2V0QUFCQigpO1xyXG4gICAgICAgIGNvbnN0IHRyID0gW1JJR0lEX0JPRFlfQUFCQl9CSUFTLCBSSUdJRF9CT0RZX0FBQkJfQklBUywgUklHSURfQk9EWV9BQUJCX0JJQVNdO1xyXG4gICAgICAgIGFhYmIubWluID0gdjMuZGlmZihhYWJiLm1pbiwgdHIpO1xyXG4gICAgICAgIGFhYmIubWF4ID0gdjMuc3VtKGFhYmIubWF4LCB0cik7XHJcbiAgICAgICAgcmV0dXJuIGFhYmI7XHJcbiAgICB9XHJcbiAgICBhZGRWZWxvY2l0eSh2KSB7XHJcbiAgICB9XHJcbiAgICBhZGRBbmd1bGFyVmVsb2NpdHkodikge1xyXG4gICAgfVxyXG4gICAgYWRkQWNjZWxlcmF0aW9uKHYpIHtcclxuICAgIH1cclxuICAgIHRyYW5zbGF0ZSh0cmFuc2xhdGlvbikge1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXIudHJhbnNsYXRlKHRyYW5zbGF0aW9uKTtcclxuICAgICAgICB0aGlzLmVtaXRVcGRhdGUoKTtcclxuICAgIH1cclxuICAgIHJvdGF0ZShyb3RhdGlvbikge1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXIucm90YXRlKHJvdGF0aW9uKTtcclxuICAgICAgICB0aGlzLmVtaXRVcGRhdGUoKTtcclxuICAgIH1cclxuICAgIHNldElkKGlkKSB7XHJcbiAgICB9XHJcbiAgICBzZXRNYXNzKG1hc3MpIHtcclxuICAgIH1cclxuICAgIHNldEZyaWN0aW9uKGYpIHtcclxuICAgICAgICB0aGlzLmZyaWN0aW9uID0gZjtcclxuICAgIH1cclxuICAgIHNldFJvdGF0aW9uKHIpIHtcclxuICAgICAgICB0aGlzLmNvbGxpZGVyLnNldFJvdGF0aW9uKHIpO1xyXG4gICAgICAgIHRoaXMuZW1pdFVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgc2V0VHJhbnNsYXRpb24odCkge1xyXG4gICAgICAgIHRoaXMuZW1pdFVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgc2V0VmVsb2NpdHkodikge1xyXG4gICAgfVxyXG4gICAgc2V0QW5ndWxhclZlbG9jaXR5KHYpIHtcclxuICAgIH1cclxuICAgIHNldFN0YXRpYyhiKSB7XHJcbiAgICB9XHJcbiAgICBpbnRlZ3JhdGVSSzQoZHQpIHtcclxuICAgIH1cclxuICAgIGludGVncmF0ZVBzZXVkb1ZlbG9jaXRpZXMoZHQpIHtcclxuICAgIH1cclxuICAgIGFkZFBzZXVkb1ZlbG9jaXR5KHYpIHtcclxuICAgIH1cclxuICAgIGFkZFBzZXVkb0FuZ3VsYXJWKHYpIHtcclxuICAgIH1cclxuICAgIGludGVncmF0ZVZlbG9jaXRpZXMoZHQpIHtcclxuICAgIH1cclxuICAgIGludGVncmF0ZUZvcmNlcyhkdCkge1xyXG4gICAgfVxyXG4gICAgdXBkYXRlSW52ZXJzZUluZXJ0aWEoKSB7XHJcbiAgICB9XHJcbiAgICBhcHBseUltcHVsc2UoaW1wdWxzZSwgcG9pbnQpIHtcclxuICAgIH1cclxuICAgIGFwcGx5UHNldWRvSW1wdWxzZShpbXB1bHNlLCBwb2ludCkge1xyXG4gICAgfVxyXG4gICAgLypcclxuICAgIGFwcGx5QW5ndWxhckltcHVsc2UocmFkaXVzIDogbnVtYmVyLCBheGlzLCB2YWx1ZSkge1xyXG4gICAgICBjb25zdCBkaXIgPSBub3JtYWxpemUoW1xyXG4gICAgICAgIGF4aXNbMV0gKyBheGlzWzJdLFxyXG4gICAgICAgIGF4aXNbMl0gLSBheGlzWzBdLFxyXG4gICAgICAgIC1heGlzWzBdIC0gYXhpc1sxXSxcclxuICAgICAgXSk7XHJcbiAgICAgIGNvbnN0IHJhZCA9IHZlY3Rvci5jcm9zcyhkaXIsIGF4aXMpO1xyXG4gICAgICBjb25zdCBnbG9iYWxEaXIgPSBzY2FsZShkaXIsIHZhbHVlKTtcclxuICAgICAgY29uc3QgZ2xvYmFsUmFkID0gc2NhbGUocmFkLCByYWRpdXMpO1xyXG4gIFxyXG4gICAgICB0aGlzLmFwcGx5SW1wdWxzZShnbG9iYWxEaXIsIGdsb2JhbFJhZCk7XHJcbiAgICB9Ki9cclxuICAgIG9uVXBkYXRlKGZ1bmMpIHtcclxuICAgICAgICBpZiAodGhpcy51cGRhdGVFdmVudEZ1bmN0aW9ucy5pbmRleE9mKGZ1bmMpID4gLTEpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50RnVuY3Rpb25zLnB1c2goZnVuYyk7XHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVFdmVudEZ1bmN0aW9ucy5maWx0ZXIoZm4gPT4gZm4gIT09IGZ1bmMpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBlbWl0VXBkYXRlKCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlRXZlbnRGdW5jdGlvbnMuZm9yRWFjaChmbiA9PiB7XHJcbiAgICAgICAgICAgIGZuKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuVGVycmFpblNlZ21lbnQuaWQgPSAwO1xyXG5jbGFzcyBQbGF5ZXIgZXh0ZW5kcyBSaWdpZEJvZHkge1xyXG4gICAgY29uc3RydWN0b3IoY29sbGlkZXIpIHtcclxuICAgICAgICBzdXBlcihjb2xsaWRlcik7XHJcbiAgICAgICAgdGhpcy5mcmljdGlvbiA9IDAuMztcclxuICAgIH1cclxuICAgIGFwcGx5SW1wdWxzZShpbXB1bHNlLCBwb2ludCkge1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSB2My5zdW0odGhpcy52ZWxvY2l0eSwgdjMuc2NhbGUoaW1wdWxzZSwgdGhpcy5pbnZlcnNlTWFzcykpO1xyXG4gICAgfVxyXG4gICAgYXBwbHlQc2V1ZG9JbXB1bHNlKGltcHVsc2UpIHtcclxuICAgICAgICB0aGlzLnBzZXVkb1ZlbG9jaXR5ID0gdjMuc3VtKHRoaXMucHNldWRvVmVsb2NpdHksIHYzLnNjYWxlKGltcHVsc2UsIHRoaXMuaW52ZXJzZU1hc3MpKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgeyBSaWdpZEJvZHksIFBsYXllciwgVGVycmFpblNlZ21lbnQgfTtcclxuIiwiaW1wb3J0IFRyZWUgZnJvbSBcIi4vVHJlZVwiO1xyXG5pbXBvcnQgeyBnZXRDb250YWN0cyBhcyBnamsgfSBmcm9tIFwiLi9namtcIjtcclxuaW1wb3J0IE1hbmlmb2xkIGZyb20gXCIuL0NvbnRhY3RNYW5pZm9sZFwiO1xyXG5pbXBvcnQgU3lzdGVtIGZyb20gXCIuL1N5c3RlbVwiO1xyXG5pbXBvcnQgeyBDb250YWN0Q29uc3RyYWludCB9IGZyb20gXCIuL0NvbnN0cmFpbnRzXCI7XHJcbmNvbnN0IHNhbWVHcm91cCA9IChib2R5MSwgYm9keTIpID0+IHtcclxuICAgIGlmICghYm9keTEuZ2V0R3JvdXAoKSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICBpZiAoIWJvZHkyLmdldEdyb3VwKCkpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgcmV0dXJuIGJvZHkxLmdldEdyb3VwKCkgPT09IGJvZHkyLmdldEdyb3VwKCk7XHJcbn07XHJcbmNvbnN0IHBhaXJIYXNoID0gKHgsIHkpID0+IHggPT09IE1hdGgubWF4KHgsIHkpID8geCAqIHggKyB4ICsgeSA6IHkgKiB5ICsgeCArIHk7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpbXVsYXRpb24ge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fb2JqZWN0cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3N0YXRpY09iamVjdHMgPSBbXTtcclxuICAgICAgICB0aGlzLnRyZWUgPSBuZXcgVHJlZSgpO1xyXG4gICAgICAgIHRoaXMuc3RhdGljVHJlZSA9IG5ldyBUcmVlKCk7XHJcbiAgICAgICAgdGhpcy50cmVlLnNldEtleShyaWdpZEJvZHkgPT4gcmlnaWRCb2R5LmdldENvbGxpZGVyKCkuZ2V0SWQoKSk7XHJcbiAgICAgICAgdGhpcy5zdGF0aWNUcmVlLnNldEtleShyaWdpZEJvZHkgPT4gcmlnaWRCb2R5LmdldENvbGxpZGVyKCkuZ2V0SWQoKSk7XHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb25zID0gW107XHJcbiAgICAgICAgdGhpcy5jb25zdHJhaW50cyA9IG5ldyBNYXAoKTtcclxuICAgICAgICB0aGlzLnVzZUNhY2hlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNvbGxpc2lvbk1hbmlmb2xkcyA9IG5ldyBNYXAoKTtcclxuICAgIH1cclxuICAgIGFkZE9iamVjdChvYmplY3QpIHtcclxuICAgICAgICBjb25zdCB7IHRyZWUsIG9iamVjdHMsIHN0YXRpY1RyZWUgfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgYWFiYiA9IG9iamVjdC5nZXRBQUJCKCk7XHJcbiAgICAgICAgaWYgKG9iamVjdC5pc1N0YXRpYygpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0YXRpY09iamVjdHMucHVzaChvYmplY3QpO1xyXG4gICAgICAgICAgICBzdGF0aWNUcmVlLmluc2VydChvYmplY3QpO1xyXG4gICAgICAgICAgICBvYmplY3Qub25VcGRhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3RhdGljVHJlZS5yZW1vdmUob2JqZWN0LmdldENvbGxpZGVyKCkuZ2V0SWQoKSk7XHJcbiAgICAgICAgICAgICAgICBzdGF0aWNUcmVlLmluc2VydChvYmplY3QpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0cmVlLmluc2VydChvYmplY3QpO1xyXG4gICAgICAgIHRoaXMuX29iamVjdHMucHVzaChvYmplY3QpO1xyXG4gICAgICAgIG9iamVjdC5vblVwZGF0ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRyZWUucmVtb3ZlKG9iamVjdC5nZXRDb2xsaWRlcigpLmdldElkKCkpO1xyXG4gICAgICAgICAgICB0cmVlLmluc2VydChvYmplY3QpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgYWRkQ29uc3RyYWludHMoY29uc3RyYWludHMsIG5hbWUpIHtcclxuICAgICAgICB0aGlzLmNvbnN0cmFpbnRzLnNldChuYW1lLCBbLi4uY29uc3RyYWludHNdKTtcclxuICAgIH1cclxuICAgIGFkZFBvc2l0aW9uQ29uc3RyYWludHMoY29uc3RyYWludHMsIG5hbWUpIHtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uQ29uc3RyYWludHMuc2V0KG5hbWUsIFsuLi5jb25zdHJhaW50c10pO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlT2JqZWN0KG9iamVjdCkge1xyXG4gICAgICAgIHRoaXMudHJlZS5yZW1vdmUob2JqZWN0LmdldENvbGxpZGVyKCkuZ2V0SWQoKSk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVDb2xsaXNpb25zKCkge1xyXG4gICAgICAgIGNvbnN0IHsgY29sbGlzaW9uTWFuaWZvbGRzLCB0cmVlLCBzdGF0aWNUcmVlLCBvYmplY3RzIH0gPSB0aGlzO1xyXG4gICAgICAgIGxldCBrZWVwID0gMDtcclxuICAgICAgICBmb3IgKGNvbnN0IFtoYXNoLCBtYW5pZm9sZF0gb2YgY29sbGlzaW9uTWFuaWZvbGRzKSB7XHJcbiAgICAgICAgICAgIG1hbmlmb2xkLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICBpZiAoIW1hbmlmb2xkLmtlZXApXHJcbiAgICAgICAgICAgICAgICBjb2xsaXNpb25NYW5pZm9sZHMuZGVsZXRlKGhhc2gpO1xyXG4gICAgICAgICAgICBrZWVwKys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGNvbGxpc2lvbnMgPSB0cmVlLl9nZXRDb2xsaXNpb25zKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSBjb2xsaXNpb25zLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBwYWlyID0gY29sbGlzaW9uc1tpXTtcclxuICAgICAgICAgICAgaWYgKHNhbWVHcm91cChwYWlyWzBdLCBwYWlyWzFdKSlcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBjb25zdCBoYXNoID0gcGFpckhhc2gocGFpclswXS5nZXRDb2xsaWRlcigpLmdldElkKCksIHBhaXJbMV0uZ2V0Q29sbGlkZXIoKS5nZXRJZCgpKTtcclxuICAgICAgICAgICAgbGV0IG1hbmlmb2xkID0gdGhpcy5jb2xsaXNpb25NYW5pZm9sZHMuZ2V0KGhhc2gpO1xyXG4gICAgICAgICAgICBpZiAobWFuaWZvbGQpXHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgY29uc3QgYWN0dWFsQ29udGFjdHMgPSBnamsocGFpclswXS5nZXRDb2xsaWRlcigpLCBwYWlyWzFdLmdldENvbGxpZGVyKCkpO1xyXG4gICAgICAgICAgICBpZiAoYWN0dWFsQ29udGFjdHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbWFuaWZvbGQgPSBuZXcgTWFuaWZvbGQoYWN0dWFsQ29udGFjdHMubWFwKChjKSA9PiBuZXcgQ29udGFjdENvbnN0cmFpbnQocGFpclswXSwgcGFpclsxXSwgYy5yYUxvY2FsLCBjLnJiTG9jYWwsIGMucmEsIGMucmIsIGMuUEEsIGMuUEIsIGMubiwgYy5wb3NpdGlvbkVycm9yLCBjLmksIGMuaikpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sbGlzaW9uTWFuaWZvbGRzLnNldChoYXNoLCBtYW5pZm9sZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fb2JqZWN0cy5mb3JFYWNoKChib2R5MSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjb2xsaXNpb25zID0gc3RhdGljVHJlZS5nZXRDb2xsaXNpb25zKGJvZHkxKTtcclxuICAgICAgICAgICAgLy90cmVlLmVsZW1lbnRzLmdldChib2R5MS5nZXRDb2xsaWRlcigpLmdldElkKCkpLmlzQ2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChjb2xsaXNpb25zLmxlbmd0aCAhPSAwKVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDAsIG4gPSBjb2xsaXNpb25zLmxlbmd0aDsgaiA8IG47IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvZHkyID0gY29sbGlzaW9uc1tqXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2FtZUdyb3VwKGJvZHkxLCBib2R5MikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc2ggPSBwYWlySGFzaChib2R5MS5nZXRDb2xsaWRlcigpLmdldElkKCksIGJvZHkyLmdldENvbGxpZGVyKCkuZ2V0SWQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1hbmlmb2xkID0gdGhpcy5jb2xsaXNpb25NYW5pZm9sZHMuZ2V0KGhhc2gpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgKG1hbmlmb2xkKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWFuaWZvbGQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdHVhbENvbnRhY3RzID0gZ2prKGJvZHkxLmdldENvbGxpZGVyKCksIGJvZHkyLmdldENvbGxpZGVyKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3R1YWxDb250YWN0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hbmlmb2xkID0gbmV3IE1hbmlmb2xkKGFjdHVhbENvbnRhY3RzLm1hcCgoYykgPT4gbmV3IENvbnRhY3RDb25zdHJhaW50KGJvZHkxLCBib2R5MiwgYy5yYUxvY2FsLCBjLnJiTG9jYWwsIGMucmEsIGMucmIsIGMuUEEsIGMuUEIsIGMubiwgYy5wb3NpdGlvbkVycm9yLCBjLmksIGMuaikpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xsaXNpb25NYW5pZm9sZHMuc2V0KGhhc2gsIG1hbmlmb2xkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy50cmVlLnNldFVuY2hlY2tlZCgpO1xyXG4gICAgICAgIHRoaXMuc3RhdGljVHJlZS5zZXRVbmNoZWNrZWQoKTtcclxuICAgIH1cclxuICAgIHRpY2soZHQpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUNvbGxpc2lvbnMoKTtcclxuICAgICAgICBjb25zdCB7IG9iamVjdHMsIGNvbGxpc2lvbk1hbmlmb2xkcyB9ID0gdGhpcztcclxuICAgICAgICB0aGlzLl9vYmplY3RzLmZvckVhY2goKGJvZHkpID0+IGJvZHkuaW50ZWdyYXRlRm9yY2VzKGR0KSk7XHJcbiAgICAgICAgY29uc3Qgc3lzdGVtID0gbmV3IFN5c3RlbSgpO1xyXG4gICAgICAgIHN5c3RlbS51c2VDYWNoZSA9IHRoaXMudXNlQ2FjaGU7XHJcbiAgICAgICAgY29uc3QgZnJpY3Rpb25TeXN0ZW0gPSBuZXcgU3lzdGVtKGZhbHNlKTtcclxuICAgICAgICBjb25zdCBjb250YWN0RXF1YXRpb25zID0gW107XHJcbiAgICAgICAgY29uc3QgZnJpY3Rpb25FcXVhdGlvbnMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBba2V5LCBtYW5pZm9sZF0gb2YgY29sbGlzaW9uTWFuaWZvbGRzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHVzZVZlbG9jaXR5QmlhcyA9IG1hbmlmb2xkLmNvbnRhY3RzLmxlbmd0aCA8IDI7XHJcbiAgICAgICAgICAgIG1hbmlmb2xkLmNvbnRhY3RzLmZvckVhY2goKGNvbnRhY3RDb25zdHJhaW50LCBfaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29udGFjdEVxdWF0aW9uID0gY29udGFjdENvbnN0cmFpbnQuZ2V0RXF1YXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IFtmRXF1YXRpb24xLCBmRXF1YXRpb24yXSA9IGNvbnRhY3RDb25zdHJhaW50LmdldEZyaWN0aW9uRXF1YXRpb25zKCk7XHJcbiAgICAgICAgICAgICAgICBjb250YWN0RXF1YXRpb25zLnB1c2goY29udGFjdEVxdWF0aW9uKTtcclxuICAgICAgICAgICAgICAgIGZyaWN0aW9uRXF1YXRpb25zLnB1c2goZkVxdWF0aW9uMSwgZkVxdWF0aW9uMik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzeXN0ZW0uYWRkRXF1YXRpb25zKGNvbnRhY3RFcXVhdGlvbnMpO1xyXG4gICAgICAgIGZvciAobGV0IFtuYW1lLCBjb25zdHJhaW50c10gb2YgdGhpcy5jb25zdHJhaW50cykge1xyXG4gICAgICAgICAgICBjb25zdCBlcXVhdGlvbnMgPSBbXTtcclxuICAgICAgICAgICAgY29uc3RyYWludHMuZm9yRWFjaCgoYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgYy51cGRhdGUoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVxdWF0aW9uID0gYy5nZXRFcXVhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgZXF1YXRpb25zLnB1c2goZXF1YXRpb24pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc3lzdGVtLmFkZEVxdWF0aW9ucyhlcXVhdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL3N5c3RlbS51cGRhdGVFcXVhdGlvbnMoZHQpO1xyXG4gICAgICAgIGZyaWN0aW9uU3lzdGVtLmFkZEVxdWF0aW9ucyhmcmljdGlvbkVxdWF0aW9ucyk7XHJcbiAgICAgICAgZnJpY3Rpb25TeXN0ZW0udXBkYXRlRXF1YXRpb25zKGR0KTtcclxuICAgICAgICBmcmljdGlvblN5c3RlbS5nZW5lcmF0ZVN5c3RlbShkdCk7XHJcbiAgICAgICAgZnJpY3Rpb25TeXN0ZW0uc29sdmVQR1MoZHQpO1xyXG4gICAgICAgIHN5c3RlbS51cGRhdGVFcXVhdGlvbnMoZHQpO1xyXG4gICAgICAgIHN5c3RlbS5nZW5lcmF0ZVN5c3RlbShkdCk7XHJcbiAgICAgICAgY29uc3QgbGFtYmRhID0gc3lzdGVtLnNvbHZlUEdTKGR0LCB0cnVlKTtcclxuICAgICAgICBjb25zdCBsZW4gPSBmcmljdGlvbkVxdWF0aW9ucy5sZW5ndGggLyAyO1xyXG4gICAgICAgIC8qZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgZnJpY3Rpb25FcXVhdGlvbnNbMiAqIGldLmxhbWJkYU1pbiAqPSBsYW1iZGFbaV07XHJcbiAgICAgICAgICBmcmljdGlvbkVxdWF0aW9uc1syICogaV0ubGFtYmRhTWF4ID0gbGFtYmRhW2ldO1xyXG4gICAgICAgICAgZnJpY3Rpb25FcXVhdGlvbnNbMiAqIGkgKyAxXS5sYW1iZGFNaW4gKj0gbGFtYmRhW2ldO1xyXG4gICAgICAgICAgZnJpY3Rpb25FcXVhdGlvbnNbMiAqIGkgKyAxXS5sYW1iZGFNYXggPSBsYW1iZGFbaV07XHJcbiAgICAgICAgfSovXHJcbiAgICAgICAgdGhpcy5fb2JqZWN0cy5mb3JFYWNoKChvYmplY3QpID0+IG9iamVjdC51cGRhdGVJbnZlcnNlSW5lcnRpYSgpKTtcclxuICAgICAgICB0aGlzLl9vYmplY3RzLmZvckVhY2goKG9iamVjdCkgPT4gb2JqZWN0LmludGVncmF0ZVZlbG9jaXRpZXMoZHQpKTtcclxuICAgICAgICBsZXQgbmR4ID0gMDtcclxuICAgICAgICAvKlxyXG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgbWFuaWZvbGRdIG9mIHRoaXMuY29sbGlzaW9uTWFuaWZvbGRzKSB7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIG1hbmlmb2xkLmNvbnRhY3RzLmZvckVhY2goKGMpID0+IHtcclxuICAgICAgICAgICAgYy5wcmV2TGFtYmRhID0gbGFtYmRhW25keF1cclxuICAgICAgICAgICAgbmR4Kys7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9Ki9cclxuICAgICAgICAvKlxyXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uU3lzdGVtID0gbmV3IFN5c3RlbSgpO1xyXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uQ29uc3RyYWludHMgPSBbXTtcclxuICAgIFxyXG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgbWFuaWZvbGRdIG9mIG1hbmlmb2xkcykge1xyXG4gICAgICAgICAgY29uc3QgeyBjb250YWN0cyB9ID0gbWFuaWZvbGQ7XHJcbiAgICAgICAgICBpZiAoY29udGFjdHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICBwb3NpdGlvbkNvbnN0cmFpbnRzLnB1c2goXHJcbiAgICAgICAgICAgICAgLi4uY29udGFjdHMubWFwKChjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7XHJcbiAgICAgICAgICAgICAgICAgIGJvZHkxLFxyXG4gICAgICAgICAgICAgICAgICBib2R5MixcclxuICAgICAgICAgICAgICAgICAgcmFMb2NhbCxcclxuICAgICAgICAgICAgICAgICAgcmJMb2NhbCxcclxuICAgICAgICAgICAgICAgICAgcmEsXHJcbiAgICAgICAgICAgICAgICAgIHJiLFxyXG4gICAgICAgICAgICAgICAgICBpLFxyXG4gICAgICAgICAgICAgICAgICBqLFxyXG4gICAgICAgICAgICAgICAgICBwZW5EZXB0aCxcclxuICAgICAgICAgICAgICAgICAgbixcclxuICAgICAgICAgICAgICAgIH0gPSBjO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29uc3RyYWludCA9IG5ldyBQb3NpdGlvbkNvbnN0cmFpbnQoXHJcbiAgICAgICAgICAgICAgICAgIGJvZHkxLFxyXG4gICAgICAgICAgICAgICAgICBib2R5MixcclxuICAgICAgICAgICAgICAgICAgbixcclxuICAgICAgICAgICAgICAgICAgcmEsXHJcbiAgICAgICAgICAgICAgICAgIHJiLFxyXG4gICAgICAgICAgICAgICAgICByYUxvY2FsLFxyXG4gICAgICAgICAgICAgICAgICByYkxvY2FsLFxyXG4gICAgICAgICAgICAgICAgICAwLjEsXHJcbiAgICAgICAgICAgICAgICAgIDAuMDAwMSxcclxuICAgICAgICAgICAgICAgICAgcGVuRGVwdGhcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb25zdHJhaW50O1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBvc2l0aW9uU3lzdGVtLmFkZENvbnN0cmFpbnQocG9zaXRpb25Db25zdHJhaW50cyk7XHJcbiAgICAgICAgZm9yIChsZXQgW25hbWUsIGNvbnN0cmFpbnRzXSBvZiB0aGlzLnBvc2l0aW9uQ29uc3RyYWludHMpIHtcclxuICAgICAgICAgIHBvc2l0aW9uU3lzdGVtLmFkZENvbnN0cmFpbnQoY29uc3RyYWludHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwb3NpdGlvblN5c3RlbS51cGRhdGVFcXVhdGlvbnMoZHQpO1xyXG4gICAgICAgIHBvc2l0aW9uU3lzdGVtLmdlbmVyYXRlU3lzdGVtKGR0KTtcclxuICAgIFxyXG4gICAgICAgIHBvc2l0aW9uU3lzdGVtLnNvbHZlUEdTKGR0KTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbiA9IHRoaXMub2JqZWN0cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgIHRoaXMub2JqZWN0c1tpXS5pbnRlZ3JhdGVQc2V1ZG9WZWxvY2l0aWVzKGR0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLmZvckVhY2goKG9iamVjdCkgPT4gb2JqZWN0LnVwZGF0ZUludmVyc2VJbmVydGlhKCkpOyovXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgdjMgfSBmcm9tIFwicm9tYW5wcHBtYXRoXCI7XHJcbmltcG9ydCBjb25maWcgZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCBEZWJ1ZyBmcm9tIFwiLi9EZWJ1Z1wiO1xyXG5sZXQgYXJyID0gW107XHJcbmxldCBvID0gMDtcclxubGV0IGYgPSB0cnVlO1xyXG5jb25zdCBfbG9nID0gKHZhbCkgPT4ge1xyXG4gICAgbysrO1xyXG4gICAgaWYgKGYpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhhcnIpO1xyXG4gICAgICAgIGYgPSBmYWxzZTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAobyA8IDIwMCAmJiBvICUgMTAgPT0gMCkge1xyXG4gICAgICAgIGFyci5wdXNoKHZhbCk7XHJcbiAgICB9XHJcbn07XHJcbmNvbnN0IHsgU09MVkVSX0lURVJBVElPTlNfTlVNIH0gPSBjb25maWc7XHJcbmNvbnN0IG51bGxWZWMgPSBbMCwgMCwgMF07XHJcbmNvbnN0IHY2ID0ge1xyXG4gICAgZG90KGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gYVswXSAqIGJbMF0gK1xyXG4gICAgICAgICAgICBhWzFdICogYlsxXSArXHJcbiAgICAgICAgICAgIGFbMl0gKiBiWzJdICtcclxuICAgICAgICAgICAgYVszXSAqIGJbM10gK1xyXG4gICAgICAgICAgICBhWzRdICogYls0XSArXHJcbiAgICAgICAgICAgIGFbNV0gKiBiWzVdO1xyXG4gICAgfSxcclxuICAgIHNjYWxlKGEsIGZhYykge1xyXG4gICAgICAgIHJldHVybiBbYVswXSAqIGZhYywgYVsxXSAqIGZhYywgYVsyXSAqIGZhYywgYVszXSAqIGZhYywgYVs0XSAqIGZhYywgYVs1XSAqIGZhY107XHJcbiAgICB9LFxyXG4gICAgc3VtKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBhWzBdICsgYlswXSxcclxuICAgICAgICAgICAgYVsxXSArIGJbMV0sXHJcbiAgICAgICAgICAgIGFbMl0gKyBiWzJdLFxyXG4gICAgICAgICAgICBhWzNdICsgYlszXSxcclxuICAgICAgICAgICAgYVs0XSArIGJbNF0sXHJcbiAgICAgICAgICAgIGFbNV0gKyBiWzVdXHJcbiAgICAgICAgXTtcclxuICAgIH0sXHJcbiAgICBmcm9tdjMoYSwgYikge1xyXG4gICAgICAgIHJldHVybiBbLi4uYSwgLi4uYl07XHJcbiAgICB9XHJcbn07XHJcbmNvbnN0IG5vcm0gPSAodikgPT4gTWF0aC5zcXJ0KHYucmVkdWNlKChhY2MsIGVsKSA9PiBhY2MgKz0gZWwgKiBlbCwgMCkpO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTeXN0ZW0ge1xyXG4gICAgY29uc3RydWN0b3IodXNlQ2FjaGUgPSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5lcXVhdGlvbnMgPSBbXTtcclxuICAgICAgICB0aGlzLnVzZUNhY2hlID0gdXNlQ2FjaGU7XHJcbiAgICB9XHJcbiAgICBhZGRFcXVhdGlvbnMoZXF1YXRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5lcXVhdGlvbnMucHVzaCguLi5lcXVhdGlvbnMpO1xyXG4gICAgfVxyXG4gICAgZ2VuZXJhdGVCb2R5TWFwcGluZygpIHtcclxuICAgICAgICBjb25zdCBlcXVhdGlvbnMgPSB0aGlzLmVxdWF0aW9ucztcclxuICAgICAgICBjb25zdCBuID0gZXF1YXRpb25zLmxlbmd0aDtcclxuICAgICAgICBjb25zdCBib2RpZXNNYXAgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgY29uc3QgSm1hcCA9IFtdO1xyXG4gICAgICAgIGxldCBjb3VudGVyID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBlcSA9IGVxdWF0aW9uc1tpXTtcclxuICAgICAgICAgICAgbGV0IGJvZHlJbmRleDEgPSBib2RpZXNNYXAuZ2V0KGVxLmNvbnN0cmFpbnQuYm9keTEuZ2V0SWQoKSk7XHJcbiAgICAgICAgICAgIGlmIChib2R5SW5kZXgxID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGJvZHlJbmRleDEgPSBjb3VudGVyKys7XHJcbiAgICAgICAgICAgICAgICBib2RpZXNNYXAuc2V0KGVxLmNvbnN0cmFpbnQuYm9keTEuZ2V0SWQoKSwgYm9keUluZGV4MSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGJvZHlJbmRleDIgPSBib2RpZXNNYXAuZ2V0KGVxLmNvbnN0cmFpbnQuYm9keTIuZ2V0SWQoKSk7XHJcbiAgICAgICAgICAgIGlmIChib2R5SW5kZXgyID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGJvZHlJbmRleDIgPSBjb3VudGVyKys7XHJcbiAgICAgICAgICAgICAgICBib2RpZXNNYXAuc2V0KGVxLmNvbnN0cmFpbnQuYm9keTIuZ2V0SWQoKSwgYm9keUluZGV4Mik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgSm1hcC5wdXNoKGJvZHlJbmRleDEsIGJvZHlJbmRleDIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmJvZGllc01hcCA9IGJvZGllc01hcDtcclxuICAgICAgICB0aGlzLkptYXAgPSBKbWFwO1xyXG4gICAgfVxyXG4gICAgZ2VuZXJhdGVTeXN0ZW0oZGVsdGFUaW1lKSB7XHJcbiAgICAgICAgLy9OdW1lcmF0aW5nIGJvZGllc1xyXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVCb2R5TWFwcGluZygpO1xyXG4gICAgfVxyXG4gICAgLy9KICogVmVsXHJcbiAgICBzb2x2ZVBHUyhkZWx0YVRpbWUsIGxvZyA9IGZhbHNlKSB7XHJcbiAgICAgICAgY29uc3QgeyBKbWFwLCBib2RpZXNNYXAsIGVxdWF0aW9ucyB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCBudW1Cb2RpZXMgPSBib2RpZXNNYXAuc2l6ZTtcclxuICAgICAgICBjb25zdCBuID0gZXF1YXRpb25zLmxlbmd0aDtcclxuICAgICAgICBjb25zdCBkID0gW107XHJcbiAgICAgICAgY29uc3QgbGFtYmRhMCA9IG5ldyBBcnJheShuKS5maWxsKDApO1xyXG4gICAgICAgIGNvbnN0IGxhbWJkYSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxhbWJkYTBbaV0gPSBlcXVhdGlvbnNbaV0ucHJldkxhbWJkYTtcclxuICAgICAgICAgICAgbGFtYmRhW2ldID0gbGFtYmRhMFtpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgQmwgPSBuZXcgQXJyYXkobnVtQm9kaWVzKS5maWxsKG51bGxWZWMpO1xyXG4gICAgICAgIGNvbnN0IEIybCA9IG5ldyBBcnJheShudW1Cb2RpZXMpLmZpbGwobnVsbFZlYyk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgYjEgPSBKbWFwW2kgKiAyXTtcclxuICAgICAgICAgICAgY29uc3QgYjIgPSBKbWFwW2kgKiAyICsgMV07XHJcbiAgICAgICAgICAgIGNvbnN0IGVxID0gZXF1YXRpb25zW2ldO1xyXG4gICAgICAgICAgICBjb25zdCBsID0gbGFtYmRhMFtpXTtcclxuICAgICAgICAgICAgLyogQmxbYjFdID0gdjYuc3VtKHY2LnNjYWxlKFxyXG4gICAgICAgICAgICAgICBlcXVhdGlvbnNbaV0uQlswXSxcclxuICAgICAgICAgICAgICAgbGFtYmRhMFtpXSksXHJcbiAgICAgICAgICAgICAgIEJsW2IxXSkqL1xyXG4gICAgICAgICAgICBpZiAoIWVxLmNvbnN0cmFpbnQuYm9keTEuaXNTdGF0aWMoKSkge1xyXG4gICAgICAgICAgICAgICAgQmxbYjFdID0gdjMuc3VtKHYzLnNjYWxlKGVxLkpNMSwgbCksIEJsW2IxXSk7XHJcbiAgICAgICAgICAgICAgICBCMmxbYjFdID0gdjMuc3VtKHYzLnNjYWxlKGVxLkpNMiwgbCksIEIybFtiMV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghZXEuY29uc3RyYWludC5ib2R5Mi5pc1N0YXRpYygpKSB7XHJcbiAgICAgICAgICAgICAgICBCbFtiMl0gPSB2My5zdW0odjMuc2NhbGUoZXEuSk0zLCBsKSwgQmxbYjJdKTtcclxuICAgICAgICAgICAgICAgIEIybFtiMl0gPSB2My5zdW0odjMuc2NhbGUoZXEuSk00LCBsKSwgQjJsW2IyXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLypCbFtiMl0gPSB2Ni5zdW0odjYuc2NhbGUoXHJcbiAgICAgICAgICAgICAgZXF1YXRpb25zW2ldLkJbMV0sXHJcbiAgICAgICAgICAgICAgIGxhbWJkYTBbaV0pLFxyXG4gICAgICAgICAgICAgICAgQmxbYjJdKSovXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vUEdTXHJcbiAgICAgICAgbGV0IGZsYWcgPSB0cnVlO1xyXG4gICAgICAgIGxldCBudW1JdGVyID0gU09MVkVSX0lURVJBVElPTlNfTlVNO1xyXG4gICAgICAgIGNvbnN0IGRlbHRhTGFtYmRhID0gbmV3IEFycmF5KG4pO1xyXG4gICAgICAgIHdoaWxlIChudW1JdGVyID4gMCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZXEgPSBlcXVhdGlvbnNbaV07XHJcbiAgICAgICAgICAgICAgICAvL2NvbnN0IEogPSBlcS5fSlxyXG4gICAgICAgICAgICAgICAgY29uc3QgYjEgPSBKbWFwW2kgKiAyXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGIyID0gSm1hcFtpICogMiArIDFdO1xyXG4gICAgICAgICAgICAgICAgLy9kZWx0YUxhbWJkYVtpXSA9IChlcS5iaWFzIC0gdjYuZG90KEpbMF0sIEJsW2IxXSkgLSB2Ni5kb3QoSlsxXSwgQmxbYjJdKSkgLyBkW2ldXHJcbiAgICAgICAgICAgICAgICAvL2RlbHRhTGFtYmRhW2ldID0gKGVxLmJpYXMgLSB2My5kb3QoZXEuSjEsIEJsW2IxXSkgLSB2My5kb3QoZXEuSjIsIEIybFtiMV0pIC0gdjMuZG90KGVxLkozLCBCbFtiMl0pIC0gdjMuZG90KGVxLko0LCBCMmxbYjJdKSkgLyBlcXVhdGlvbnNbaV0uZWZmTWFzc1xyXG4gICAgICAgICAgICAgICAgZGVsdGFMYW1iZGFbaV0gPSBlcS5iaWFzO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFlcS5jb25zdHJhaW50LmJvZHkxLmlzU3RhdGljKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWx0YUxhbWJkYVtpXSAtPSB2My5kb3QoZXEuSjEsIEJsW2IxXSkgKyB2My5kb3QoZXEuSjIsIEIybFtiMV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFlcS5jb25zdHJhaW50LmJvZHkyLmlzU3RhdGljKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWx0YUxhbWJkYVtpXSAtPSB2My5kb3QoZXEuSjMsIEJsW2IyXSkgKyB2My5kb3QoZXEuSjQsIEIybFtiMl0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGVsdGFMYW1iZGFbaV0gLz0gZXEuZWZmTWFzcztcclxuICAgICAgICAgICAgICAgIGxhbWJkYTBbaV0gPSBsYW1iZGFbaV07XHJcbiAgICAgICAgICAgICAgICBsYW1iZGFbaV0gPSBNYXRoLm1heChlcS5sYW1iZGFNaW4sIE1hdGgubWluKGxhbWJkYTBbaV0gKyBkZWx0YUxhbWJkYVtpXSwgZXEubGFtYmRhTWF4KSk7XHJcbiAgICAgICAgICAgICAgICBkZWx0YUxhbWJkYVtpXSA9IGxhbWJkYVtpXSAtIGxhbWJkYTBbaV07XHJcbiAgICAgICAgICAgICAgICAvL0JsW2IxXSA9IHY2LnN1bShCbFtiMV0sIHY2LnNjYWxlKGVxLkJbMF0sIGRlbHRhTGFtYmRhW2ldKSlcclxuICAgICAgICAgICAgICAgIEJsW2IxXSA9IHYzLnN1bSh2My5zY2FsZShlcS5KTTEsIGRlbHRhTGFtYmRhW2ldKSwgQmxbYjFdKTtcclxuICAgICAgICAgICAgICAgIEIybFtiMV0gPSB2My5zdW0odjMuc2NhbGUoZXEuSk0yLCBkZWx0YUxhbWJkYVtpXSksIEIybFtiMV0pO1xyXG4gICAgICAgICAgICAgICAgLy8gQmxbYjJdID0gdjYuc3VtKEJsW2IyXSwgdjYuc2NhbGUoZXEuQlsxXSwgZGVsdGFMYW1iZGFbaV0pKVxyXG4gICAgICAgICAgICAgICAgQmxbYjJdID0gdjMuc3VtKHYzLnNjYWxlKGVxLkpNMywgZGVsdGFMYW1iZGFbaV0pLCBCbFtiMl0pO1xyXG4gICAgICAgICAgICAgICAgQjJsW2IyXSA9IHYzLnN1bSh2My5zY2FsZShlcS5KTTQsIGRlbHRhTGFtYmRhW2ldKSwgQjJsW2IyXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbnVtSXRlci0tO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobG9nKVxyXG4gICAgICAgICAgICBEZWJ1Zy5kYXRhLlNPTFZFUl9FUlJPUiA9IG5vcm0oZGVsdGFMYW1iZGEpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGVxdWF0aW9uc1tpXS5hcHBseUltcHVsc2UobGFtYmRhW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxhbWJkYTtcclxuICAgIH1cclxuICAgIHVwZGF0ZUVxdWF0aW9ucyhkZWx0YVRpbWUpIHtcclxuICAgICAgICBjb25zdCB7IGVxdWF0aW9ucyB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCBuID0gZXF1YXRpb25zLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBlcXVhdGlvbnNbaV0udXBkYXRlTGVmdFBhcnQoZGVsdGFUaW1lKTtcclxuICAgICAgICAgICAgZXF1YXRpb25zW2ldLnVwZGF0ZVJpZ2h0UGFydChkZWx0YVRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGFwcGx5UmVzb2x2aW5nSW1wdWxzZXMobGFtYmRhKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSB0aGlzLmVxdWF0aW9ucy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5lcXVhdGlvbnNbaV0uYXBwbHlJbXB1bHNlKGxhbWJkYVtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYXBwbHlSZXNvbHZpbmdQc2V1ZG9JbXB1bHNlcyhsYW1iZGEpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbiA9IHRoaXMuZXF1YXRpb25zLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmVxdWF0aW9uc1tpXS5hcHBseVBzZXVkb0ltcHVsc2UobGFtYmRhW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuU3lzdGVtLnVzZUNhY2hlID0gdHJ1ZTtcclxuIiwiaW1wb3J0IHsgQUFCQiB9IGZyb20gXCJyb21hbnBwcG1hdGhcIjtcclxuY29uc3QgZ2V0Qm91bmRBYWJiID0gKGFhYmIxLCBhYWJiMikgPT4ge1xyXG4gICAgY29uc3QgeDEgPSBhYWJiMS5taW5bMF0gPCBhYWJiMi5taW5bMF0gPyBhYWJiMS5taW5bMF0gOiBhYWJiMi5taW5bMF07XHJcbiAgICBjb25zdCB4MiA9IGFhYmIxLm1heFswXSA+IGFhYmIyLm1heFswXSA/IGFhYmIxLm1heFswXSA6IGFhYmIyLm1heFswXTtcclxuICAgIGNvbnN0IHkxID0gYWFiYjEubWluWzFdIDwgYWFiYjIubWluWzFdID8gYWFiYjEubWluWzFdIDogYWFiYjIubWluWzFdO1xyXG4gICAgY29uc3QgeTIgPSBhYWJiMS5tYXhbMV0gPiBhYWJiMi5tYXhbMV0gPyBhYWJiMS5tYXhbMV0gOiBhYWJiMi5tYXhbMV07XHJcbiAgICBjb25zdCB6MSA9IGFhYmIxLm1pblsyXSA8IGFhYmIyLm1pblsyXSA/IGFhYmIxLm1pblsyXSA6IGFhYmIyLm1pblsyXTtcclxuICAgIGNvbnN0IHoyID0gYWFiYjEubWF4WzJdID4gYWFiYjIubWF4WzJdID8gYWFiYjEubWF4WzJdIDogYWFiYjIubWF4WzJdO1xyXG4gICAgcmV0dXJuIG5ldyBBQUJCKFt4MSwgeTEsIHoxXSwgW3gyLCB5MiwgejJdKTtcclxufTtcclxuY29uc3QgaXNDb2xsaWRlID0gKGFhYmIxLCBhYWJiMikgPT4ge1xyXG4gICAgaWYgKGFhYmIxLm1pblswXSA8PSBhYWJiMi5tYXhbMF0gJiZcclxuICAgICAgICBhYWJiMS5tYXhbMF0gPj0gYWFiYjIubWluWzBdICYmXHJcbiAgICAgICAgYWFiYjEubWluWzFdIDw9IGFhYmIyLm1heFsxXSAmJlxyXG4gICAgICAgIGFhYmIxLm1heFsxXSA+PSBhYWJiMi5taW5bMV0gJiZcclxuICAgICAgICBhYWJiMS5taW5bMl0gPD0gYWFiYjIubWF4WzJdICYmXHJcbiAgICAgICAgYWFiYjEubWF4WzJdID49IGFhYmIyLm1pblsyXSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5jb25zdCBnZXRTaXplID0gKGFhYmIpID0+IHtcclxuICAgIGNvbnN0IGFyZWEgPSBNYXRoLmFicyhhYWJiLm1heFswXSAtIGFhYmIubWluWzBdKSAqXHJcbiAgICAgICAgTWF0aC5hYnMoYWFiYi5tYXhbMV0gLSBhYWJiLm1pblsxXSkgKlxyXG4gICAgICAgIE1hdGguYWJzKGFhYmIubWF4WzJdIC0gYWFiYi5taW5bMl0pO1xyXG4gICAgcmV0dXJuIGFyZWE7XHJcbn07XHJcbmNsYXNzIE5vZGUge1xyXG4gICAgY29uc3RydWN0b3IoYWFiYiwgaXNMZWFmLCBvYmplY3QsIGlkKSB7XHJcbiAgICAgICAgdGhpcy5hYWJiID0gYWFiYjtcclxuICAgICAgICB0aGlzLmlzTGVhZiA9IGlzTGVhZjtcclxuICAgICAgICB0aGlzLnBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMubGVmdCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5yaWdodCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5pc0NoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm9iamVjdCA9IG9iamVjdDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IDA7XHJcbiAgICAgICAgdGhpcy5xdWVyeUlkID0gMDtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcmVlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMucm9vdCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50cyA9IG5ldyBNYXAoKTtcclxuICAgICAgICB0aGlzLnF1ZXJ5SWQgPSAwO1xyXG4gICAgICAgIHRoaXMuZ2V0SWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY29sbGlzaW9ucyA9IFtdO1xyXG4gICAgfVxyXG4gICAgc2V0S2V5KGYpIHtcclxuICAgICAgICB0aGlzLmdldElkID0gZjtcclxuICAgIH1cclxuICAgIHVwZGF0ZVF1ZXJ5SWQoKSB7XHJcbiAgICAgICAgdGhpcy5xdWVyeUlkKys7XHJcbiAgICB9XHJcbiAgICBzZXRVbmNoZWNrZWQoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnJvb3QpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBjb25zdCBzdGFjayA9IFt0aGlzLnJvb3RdO1xyXG4gICAgICAgIHdoaWxlIChzdGFjay5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICBjb25zdCBub2RlID0gc3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgIG5vZGUuaXNDaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChub2RlLmlzTGVhZikge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5vZGUubGVmdClcclxuICAgICAgICAgICAgICAgIHN0YWNrLnB1c2gobm9kZS5sZWZ0KTtcclxuICAgICAgICAgICAgaWYgKG5vZGUucmlnaHQpXHJcbiAgICAgICAgICAgICAgICBzdGFjay5wdXNoKG5vZGUucmlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldEJlc3RTaWJsaW5nKGxlYWYpIHtcclxuICAgICAgICBsZXQgcG90ZW50aWFsID0gdGhpcy5yb290O1xyXG4gICAgICAgIHdoaWxlICghcG90ZW50aWFsLmlzTGVhZikge1xyXG4gICAgICAgICAgICBwb3RlbnRpYWwuaGVpZ2h0Kys7XHJcbiAgICAgICAgICAgIGNvbnN0IHNpemUgPSBnZXRTaXplKHBvdGVudGlhbC5hYWJiKTtcclxuICAgICAgICAgICAgY29uc3QgY29tYmluZWRBQUJCID0gZ2V0Qm91bmRBYWJiKHBvdGVudGlhbC5hYWJiLCBsZWFmLmFhYmIpO1xyXG4gICAgICAgICAgICBjb25zdCBjb21iaW5lZFNpemUgPSBnZXRTaXplKGNvbWJpbmVkQUFCQik7XHJcbiAgICAgICAgICAgIGxldCBjb3N0ID0gY29tYmluZWRTaXplO1xyXG4gICAgICAgICAgICBsZXQgaW5oZXJDb3N0ID0gY29tYmluZWRTaXplIC0gc2l6ZTtcclxuICAgICAgICAgICAgbGV0IGNvc3QxO1xyXG4gICAgICAgICAgICBpZiAocG90ZW50aWFsLmxlZnQuaXNMZWFmKSB7XHJcbiAgICAgICAgICAgICAgICBjb3N0MSA9IGdldFNpemUocG90ZW50aWFsLmxlZnQuYWFiYikgKyBpbmhlckNvc3Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb3N0MSA9XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0U2l6ZShnZXRCb3VuZEFhYmIobGVhZi5hYWJiLCBwb3RlbnRpYWwubGVmdC5hYWJiKSkgLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRTaXplKHBvdGVudGlhbC5sZWZ0LmFhYmIpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5oZXJDb3N0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBjb3N0MjtcclxuICAgICAgICAgICAgaWYgKHBvdGVudGlhbC5yaWdodC5pc0xlYWYpIHtcclxuICAgICAgICAgICAgICAgIGNvc3QyID0gZ2V0U2l6ZShwb3RlbnRpYWwucmlnaHQuYWFiYikgKyBpbmhlckNvc3Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb3N0MiA9XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0U2l6ZShnZXRCb3VuZEFhYmIobGVhZi5hYWJiLCBwb3RlbnRpYWwucmlnaHQuYWFiYikpIC1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0U2l6ZShwb3RlbnRpYWwucmlnaHQuYWFiYikgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmhlckNvc3Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvc3QgPCBjb3N0MSAmJiBjb3N0IDwgY29zdDIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcG90ZW50aWFsO1xyXG4gICAgICAgICAgICBpZiAoY29zdDEgPCBjb3N0Mikge1xyXG4gICAgICAgICAgICAgICAgcG90ZW50aWFsID0gcG90ZW50aWFsLmxlZnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcG90ZW50aWFsID0gcG90ZW50aWFsLnJpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcG90ZW50aWFsO1xyXG4gICAgfVxyXG4gICAgaW5zZXJ0KG9iamVjdCkge1xyXG4gICAgICAgIGNvbnN0IGFhYmIgPSBvYmplY3QuZ2V0QUFCQigpO1xyXG4gICAgICAgIGNvbnN0IGlkID0gdGhpcy5nZXRJZChvYmplY3QpO1xyXG4gICAgICAgIGNvbnN0IGxlYWYgPSBuZXcgTm9kZShhYWJiLCB0cnVlLCBvYmplY3QsIGlkKTtcclxuICAgICAgICB0aGlzLmVsZW1lbnRzLnNldChpZCwgbGVhZik7XHJcbiAgICAgICAgaWYgKHRoaXMucm9vdCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnJvb3QgPSBsZWFmO1xyXG4gICAgICAgICAgICB0aGlzLnJvb3QuaGVpZ2h0ID0gMTtcclxuICAgICAgICAgICAgdGhpcy5yb290LnBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgICAgIHJldHVybiBsZWFmO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzaWJsaW5nID0gdGhpcy5nZXRCZXN0U2libGluZyhsZWFmKTtcclxuICAgICAgICBjb25zdCBvbGRQYXJlbnQgPSBzaWJsaW5nLnBhcmVudDtcclxuICAgICAgICBjb25zdCBuZXdQYXJlbnQgPSBuZXcgTm9kZShudWxsLCBmYWxzZSwgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgbmV3UGFyZW50LnBhcmVudCA9IG9sZFBhcmVudDtcclxuICAgICAgICBuZXdQYXJlbnQuYWFiYiA9IGdldEJvdW5kQWFiYihsZWFmLmFhYmIsIHNpYmxpbmcuYWFiYik7XHJcbiAgICAgICAgbmV3UGFyZW50LmhlaWdodCA9IHNpYmxpbmcuaGVpZ2h0ICsgMTtcclxuICAgICAgICBpZiAob2xkUGFyZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChvbGRQYXJlbnQubGVmdCA9PT0gc2libGluZylcclxuICAgICAgICAgICAgICAgIG9sZFBhcmVudC5sZWZ0ID0gbmV3UGFyZW50O1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBvbGRQYXJlbnQucmlnaHQgPSBuZXdQYXJlbnQ7XHJcbiAgICAgICAgICAgIG5ld1BhcmVudC5sZWZ0ID0gc2libGluZztcclxuICAgICAgICAgICAgbmV3UGFyZW50LnJpZ2h0ID0gbGVhZjtcclxuICAgICAgICAgICAgc2libGluZy5wYXJlbnQgPSBuZXdQYXJlbnQ7XHJcbiAgICAgICAgICAgIGxlYWYucGFyZW50ID0gbmV3UGFyZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbmV3UGFyZW50LmxlZnQgPSBzaWJsaW5nO1xyXG4gICAgICAgICAgICBuZXdQYXJlbnQucmlnaHQgPSBsZWFmO1xyXG4gICAgICAgICAgICBzaWJsaW5nLnBhcmVudCA9IG5ld1BhcmVudDtcclxuICAgICAgICAgICAgbGVhZi5wYXJlbnQgPSBuZXdQYXJlbnQ7XHJcbiAgICAgICAgICAgIHRoaXMucm9vdCA9IG5ld1BhcmVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IF9ub2RlID0gbGVhZi5wYXJlbnQ7XHJcbiAgICAgICAgd2hpbGUgKF9ub2RlKSB7XHJcbiAgICAgICAgICAgIF9ub2RlID0gdGhpcy5iYWxhbmNlKF9ub2RlKTtcclxuICAgICAgICAgICAgX25vZGUuaGVpZ2h0ID0gMSArIE1hdGgubWF4KF9ub2RlLmxlZnQuaGVpZ2h0LCBfbm9kZS5yaWdodC5oZWlnaHQpO1xyXG4gICAgICAgICAgICBfbm9kZSA9IF9ub2RlLnBhcmVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxlYWY7XHJcbiAgICB9XHJcbiAgICBiYWxhbmNlKG5vZGUpIHtcclxuICAgICAgICBpZiAoIW5vZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChub2RlLmlzTGVhZiB8fCBub2RlLmhlaWdodCA8IDIpIHtcclxuICAgICAgICAgICAgbm9kZS5hYWJiID0gZ2V0Qm91bmRBYWJiKG5vZGUubGVmdC5hYWJiLCBub2RlLnJpZ2h0LmFhYmIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbGVmdCA9IG5vZGUubGVmdDtcclxuICAgICAgICBjb25zdCByaWdodCA9IG5vZGUucmlnaHQ7XHJcbiAgICAgICAgY29uc3QgYmFsYW5jZSA9IG5vZGUucmlnaHQuaGVpZ2h0IC0gbm9kZS5sZWZ0LmhlaWdodDtcclxuICAgICAgICBpZiAoYmFsYW5jZSA+IDEpIHtcclxuICAgICAgICAgICAgY29uc3QgcmlnaHRsZWZ0ID0gcmlnaHQubGVmdDtcclxuICAgICAgICAgICAgY29uc3QgcmlnaHRyaWdodCA9IHJpZ2h0LnJpZ2h0O1xyXG4gICAgICAgICAgICByaWdodC5sZWZ0ID0gbm9kZTtcclxuICAgICAgICAgICAgcmlnaHQucGFyZW50ID0gbm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gcmlnaHQ7XHJcbiAgICAgICAgICAgIGlmIChyaWdodC5wYXJlbnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJpZ2h0LnBhcmVudC5sZWZ0ID09PSBub2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQucGFyZW50LmxlZnQgPSByaWdodDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0LnBhcmVudC5yaWdodCA9IHJpZ2h0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMucm9vdCA9IHJpZ2h0O1xyXG4gICAgICAgICAgICBpZiAocmlnaHQubGVmdC5oZWlnaHQgPiByaWdodHJpZ2h0LmhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgcmlnaHQucmlnaHQgPSByaWdodGxlZnQ7XHJcbiAgICAgICAgICAgICAgICBub2RlLnJpZ2h0ID0gcmlnaHRyaWdodDtcclxuICAgICAgICAgICAgICAgIHJpZ2h0cmlnaHQucGFyZW50ID0gbm9kZTtcclxuICAgICAgICAgICAgICAgIG5vZGUuaGVpZ2h0ID0gMSArIE1hdGgubWF4KGxlZnQuaGVpZ2h0LCByaWdodHJpZ2h0LmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICByaWdodC5oZWlnaHQgPSAxICsgTWF0aC5tYXgobm9kZS5oZWlnaHQsIHJpZ2h0bGVmdC5oZWlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5yaWdodCA9IHJpZ2h0bGVmdDtcclxuICAgICAgICAgICAgICAgIHJpZ2h0bGVmdC5wYXJlbnQgPSBub2RlO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5oZWlnaHQgPSAxICsgTWF0aC5tYXgobGVmdC5oZWlnaHQsIHJpZ2h0bGVmdC5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgcmlnaHQuaGVpZ2h0ID0gMSArIE1hdGgubWF4KG5vZGUuaGVpZ2h0LCByaWdodHJpZ2h0LmhlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbm9kZS5hYWJiID0gZ2V0Qm91bmRBYWJiKG5vZGUubGVmdC5hYWJiLCBub2RlLnJpZ2h0LmFhYmIpO1xyXG4gICAgICAgICAgICByaWdodC5hYWJiID0gZ2V0Qm91bmRBYWJiKHJpZ2h0LmxlZnQuYWFiYiwgcmlnaHQucmlnaHQuYWFiYik7XHJcbiAgICAgICAgICAgIHJldHVybiByaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJhbGFuY2UgPCAtMSkge1xyXG4gICAgICAgICAgICBjb25zdCBsZWZ0bGVmdCA9IGxlZnQubGVmdDtcclxuICAgICAgICAgICAgY29uc3QgbGVmdHJpZ2h0ID0gbGVmdC5yaWdodDtcclxuICAgICAgICAgICAgbGVmdC5sZWZ0ID0gbm9kZTtcclxuICAgICAgICAgICAgbGVmdC5wYXJlbnQgPSBub2RlLnBhcmVudDtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBsZWZ0O1xyXG4gICAgICAgICAgICBpZiAobGVmdC5wYXJlbnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxlZnQucGFyZW50LmxlZnQgPT09IG5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0LnBhcmVudC5sZWZ0ID0gbGVmdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQucGFyZW50LnJpZ2h0ID0gbGVmdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3QgPSBsZWZ0O1xyXG4gICAgICAgICAgICBpZiAobGVmdGxlZnQuaGVpZ2h0ID4gbGVmdHJpZ2h0LmhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgbGVmdC5yaWdodCA9IGxlZnRsZWZ0O1xyXG4gICAgICAgICAgICAgICAgbm9kZS5sZWZ0ID0gbGVmdHJpZ2h0O1xyXG4gICAgICAgICAgICAgICAgbGVmdHJpZ2h0LnBhcmVudCA9IG5vZGU7XHJcbiAgICAgICAgICAgICAgICBub2RlLmhlaWdodCA9IDEgKyBNYXRoLm1heChyaWdodC5oZWlnaHQsIGxlZnRyaWdodC5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgbGVmdC5oZWlnaHQgPSAxICsgTWF0aC5tYXgobm9kZS5oZWlnaHQsIGxlZnRsZWZ0LmhlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZWZ0LnJpZ2h0ID0gbGVmdHJpZ2h0O1xyXG4gICAgICAgICAgICAgICAgbm9kZS5sZWZ0ID0gbGVmdGxlZnQ7XHJcbiAgICAgICAgICAgICAgICBsZWZ0bGVmdC5wYXJlbnQgPSBub2RlO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5oZWlnaHQgPSAxICsgTWF0aC5tYXgocmlnaHQuaGVpZ2h0LCBsZWZ0bGVmdC5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgbGVmdC5oZWlnaHQgPSAxICsgTWF0aC5tYXgobm9kZS5oZWlnaHQsIGxlZnRyaWdodC5oZWlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5vZGUuYWFiYiA9IGdldEJvdW5kQWFiYihub2RlLmxlZnQuYWFiYiwgbm9kZS5yaWdodC5hYWJiKTtcclxuICAgICAgICAgICAgbGVmdC5hYWJiID0gZ2V0Qm91bmRBYWJiKGxlZnQubGVmdC5hYWJiLCBsZWZ0LnJpZ2h0LmFhYmIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbGVmdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbm9kZS5hYWJiID0gZ2V0Qm91bmRBYWJiKG5vZGUubGVmdC5hYWJiLCBub2RlLnJpZ2h0LmFhYmIpO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG4gICAgZ2V0Q29sbGlzaW9ucyhvYmplY3QpIHtcclxuICAgICAgICBjb25zdCBhYWJiID0gb2JqZWN0LmdldEFBQkIoKTtcclxuICAgICAgICBjb25zdCBjb2xzID0gW107XHJcbiAgICAgICAgLy8gdGhpcy5lbGVtZW50cy5nZXQodGhpcy5nZXRJZChvYmplY3QpKS5xdWVyeUlkID0gdGhpcy5xdWVyeUlkXHJcbiAgICAgICAgY29uc3QgaXRlciA9IChfbm9kZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIV9ub2RlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKF9ub2RlLm9iamVjdCA9PT0gb2JqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlzQ29sbGlkZShhYWJiLCBfbm9kZS5hYWJiKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKF9ub2RlLmlzTGVhZiAmJiAhX25vZGUuaXNDaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29scy5wdXNoKF9ub2RlLm9iamVjdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpdGVyKF9ub2RlLmxlZnQpO1xyXG4gICAgICAgICAgICAgICAgaXRlcihfbm9kZS5yaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGl0ZXIodGhpcy5yb290KTtcclxuICAgICAgICByZXR1cm4gY29scztcclxuICAgIH1cclxuICAgIHJlbW92ZShpZCkge1xyXG4gICAgICAgIGNvbnN0IGxlYWYgPSB0aGlzLmVsZW1lbnRzLmdldChpZCk7XHJcbiAgICAgICAgaWYgKCFsZWFmKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYgKGxlYWYgPT09IHRoaXMucm9vdCkge1xyXG4gICAgICAgICAgICB0aGlzLnJvb3QgPSBudWxsO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHBhcmVudCA9IGxlYWYucGFyZW50O1xyXG4gICAgICAgIGNvbnN0IGdyYW5kUGFyZW50ID0gcGFyZW50LnBhcmVudDtcclxuICAgICAgICBsZXQgc2libGluZztcclxuICAgICAgICBpZiAocGFyZW50LmxlZnQgPT09IGxlYWYpXHJcbiAgICAgICAgICAgIHNpYmxpbmcgPSBwYXJlbnQucmlnaHQ7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBzaWJsaW5nID0gcGFyZW50LmxlZnQ7XHJcbiAgICAgICAgaWYgKGdyYW5kUGFyZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChncmFuZFBhcmVudC5sZWZ0ID09PSBwYXJlbnQpXHJcbiAgICAgICAgICAgICAgICBncmFuZFBhcmVudC5sZWZ0ID0gc2libGluZztcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgZ3JhbmRQYXJlbnQucmlnaHQgPSBzaWJsaW5nO1xyXG4gICAgICAgICAgICBzaWJsaW5nLnBhcmVudCA9IGdyYW5kUGFyZW50O1xyXG4gICAgICAgICAgICBsZXQgX25vZGUgPSBncmFuZFBhcmVudDtcclxuICAgICAgICAgICAgd2hpbGUgKF9ub2RlKSB7XHJcbiAgICAgICAgICAgICAgICBfbm9kZSA9IHRoaXMuYmFsYW5jZShfbm9kZSk7XHJcbiAgICAgICAgICAgICAgICBfbm9kZS5oZWlnaHQgPSAxICsgTWF0aC5tYXgoX25vZGUucmlnaHQuaGVpZ2h0LCBfbm9kZS5sZWZ0LmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBfbm9kZSA9IF9ub2RlLnBhcmVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yb290ID0gc2libGluZztcclxuICAgICAgICAgICAgc2libGluZy5wYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVsZW1lbnRzLmRlbGV0ZShpZCk7XHJcbiAgICB9XHJcbiAgICB0b0FycmF5KG5vZGUpIHtcclxuICAgICAgICBjb25zdCBpdGVyID0gKGxlYWYpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFsZWFmKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobGVhZi5pc0xlYWYpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGVhZi5pZDtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtpdGVyKGxlYWYubGVmdCksIGl0ZXIobGVhZi5yaWdodCldO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKCFub2RlKVxyXG4gICAgICAgICAgICBub2RlID0gdGhpcy5yb290O1xyXG4gICAgICAgIHJldHVybiBpdGVyKG5vZGUpO1xyXG4gICAgfVxyXG4gICAgX2dldENvbGxpc2lvbnMoKSB7XHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb25zID0gW107XHJcbiAgICAgICAgaWYgKCF0aGlzLnJvb3QgfHwgdGhpcy5yb290LmlzTGVhZilcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29sbGlzaW9ucztcclxuICAgICAgICB0aGlzLnNldFVuY2hlY2tlZCgpO1xyXG4gICAgICAgIHRoaXMuX2dldENvbGxpc2lvbnNIZWxwZXIodGhpcy5yb290LmxlZnQsIHRoaXMucm9vdC5yaWdodCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sbGlzaW9ucztcclxuICAgIH1cclxuICAgIF9nZXRDb2xsaXNpb25zSGVscGVyKG5vZGUxLCBub2RlMikge1xyXG4gICAgICAgIGlmIChub2RlMS5pc0xlYWYpIHtcclxuICAgICAgICAgICAgaWYgKG5vZGUyLmlzTGVhZikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzQ29sbGlkZShub2RlMS5hYWJiLCBub2RlMi5hYWJiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29sbGlzaW9ucy5wdXNoKFtub2RlMS5vYmplY3QsIG5vZGUyLm9iamVjdF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcm9zc0NoaWxkcmVuKG5vZGUyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2dldENvbGxpc2lvbnNIZWxwZXIobm9kZTEsIG5vZGUyLnJpZ2h0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2dldENvbGxpc2lvbnNIZWxwZXIobm9kZTEsIG5vZGUyLmxlZnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAobm9kZTIuaXNMZWFmKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyb3NzQ2hpbGRyZW4obm9kZTEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2V0Q29sbGlzaW9uc0hlbHBlcihub2RlMS5yaWdodCwgbm9kZTIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2V0Q29sbGlzaW9uc0hlbHBlcihub2RlMS5sZWZ0LCBub2RlMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyb3NzQ2hpbGRyZW4obm9kZTEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcm9zc0NoaWxkcmVuKG5vZGUyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2dldENvbGxpc2lvbnNIZWxwZXIobm9kZTEucmlnaHQsIG5vZGUyLnJpZ2h0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2dldENvbGxpc2lvbnNIZWxwZXIobm9kZTEubGVmdCwgbm9kZTIubGVmdCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9nZXRDb2xsaXNpb25zSGVscGVyKG5vZGUxLnJpZ2h0LCBub2RlMi5sZWZ0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2dldENvbGxpc2lvbnNIZWxwZXIobm9kZTEubGVmdCwgbm9kZTIucmlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY3Jvc3NDaGlsZHJlbihub2RlKSB7XHJcbiAgICAgICAgaWYgKCFub2RlLmlzQ2hlY2tlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9nZXRDb2xsaXNpb25zSGVscGVyKG5vZGUucmlnaHQsIG5vZGUubGVmdCk7XHJcbiAgICAgICAgICAgIG5vZGUuaXNDaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiY29uc3QgaXNJbnNpZGUgPSAocDEsIHAyLCBxKSA9PiB7XHJcbiAgICBjb25zdCBSID0gKHAyWzBdIC0gcDFbMF0pICogKHFbMV0gLSBwMVsxXSkgLSAocDJbMV0gLSBwMVsxXSkgKiAocVswXSAtIHAxWzBdKTtcclxuICAgIHJldHVybiBSIDw9IDAgKyAwLjAwMTtcclxufTtcclxuY29uc3QgZG90ID0gKGEsIGIpID0+IGFbMF0gKiBiWzBdICsgYVsxXSAqIGJbMV07XHJcbmNvbnN0IGlzSW5DbG9ja3dpc2UgPSAocG9pbnRzKSA9PiB7XHJcbiAgICBpZiAocG9pbnRzLmxlbmd0aCA8IDMpXHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICBjb25zdCBbcDEsIHAyLCBwM10gPSBwb2ludHM7XHJcbiAgICBjb25zdCBkZXQgPSBwMlswXSAqIHAzWzFdICtcclxuICAgICAgICBwM1swXSAqIHAxWzFdICtcclxuICAgICAgICBwMVswXSAqIHAyWzFdIC1cclxuICAgICAgICBwMVswXSAqIHAxWzFdIC1cclxuICAgICAgICBwM1swXSAqIHAyWzFdIC1cclxuICAgICAgICBwMVswXSAqIHAzWzFdO1xyXG4gICAgaWYgKGRldCA8IDApXHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICByZXR1cm4gLTE7XHJcbn07XHJcbmNvbnN0IGNvbXB1dGVJbnRlcnNlY3Rpb24gPSAocDEsIHAyLCBwMywgcDQpID0+IHtcclxuICAgIGlmIChwMlswXSAtIHAxWzBdID09PSAwKSB7XHJcbiAgICAgICAgY29uc3QgeCA9IHAxWzBdO1xyXG4gICAgICAgIGNvbnN0IG0yID0gKHA0WzFdIC0gcDNbMV0pIC8gKHA0WzBdIC0gcDNbMF0pO1xyXG4gICAgICAgIGNvbnN0IGIyID0gcDNbMV0gLSBtMiAqIHAzWzBdO1xyXG4gICAgICAgIGNvbnN0IHkgPSBtMiAqIHggKyBiMjtcclxuICAgICAgICByZXR1cm4gW3gsIHldO1xyXG4gICAgfVxyXG4gICAgaWYgKHA0WzBdIC0gcDNbMF0gPT09IDApIHtcclxuICAgICAgICBjb25zdCB4ID0gcDNbMF07XHJcbiAgICAgICAgY29uc3QgbTEgPSAocDJbMV0gLSBwMVsxXSkgLyAocDJbMF0gLSBwMVswXSk7XHJcbiAgICAgICAgY29uc3QgYjEgPSBwMVsxXSAtIG0xICogcDFbMF07XHJcbiAgICAgICAgY29uc3QgeSA9IG0xICogeCArIGIxO1xyXG4gICAgICAgIHJldHVybiBbeCwgeV07XHJcbiAgICB9XHJcbiAgICBjb25zdCBtMSA9IChwMlsxXSAtIHAxWzFdKSAvIChwMlswXSAtIHAxWzBdKTtcclxuICAgIGNvbnN0IGIxID0gcDFbMV0gLSBtMSAqIHAxWzBdO1xyXG4gICAgY29uc3QgbTIgPSAocDRbMV0gLSBwM1sxXSkgLyAocDRbMF0gLSBwM1swXSk7XHJcbiAgICBjb25zdCBiMiA9IHAzWzFdIC0gbTIgKiBwM1swXTtcclxuICAgIGNvbnN0IHggPSAoYjIgLSBiMSkgLyAobTEgLSBtMik7XHJcbiAgICBjb25zdCB5ID0gbTEgKiB4ICsgYjE7XHJcbiAgICByZXR1cm4gW3gsIHldO1xyXG59O1xyXG5jb25zdCBjbGlwUG9seVZzUG9seSA9IChBLCBCKSA9PiB7XHJcbiAgICBsZXQgcmVzdWx0ID0gWy4uLkFdO1xyXG4gICAgZm9yIChsZXQgaSA9IDAsIG4gPSBCLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgIGNvbnN0IG5leHQgPSBbLi4ucmVzdWx0XTtcclxuICAgICAgICByZXN1bHQgPSBbXTtcclxuICAgICAgICBjb25zdCBhRWRnZTEgPSBCLmF0KGkgLSAxKTtcclxuICAgICAgICBjb25zdCBhRWRnZTIgPSBCLmF0KGkpO1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwLCBfbiA9IG5leHQubGVuZ3RoOyBqIDwgX247IGorKykge1xyXG4gICAgICAgICAgICBjb25zdCBiRWRnZTEgPSBuZXh0LmF0KGogLSAxKTtcclxuICAgICAgICAgICAgY29uc3QgYkVkZ2UyID0gbmV4dC5hdChqKTtcclxuICAgICAgICAgICAgaWYgKGlzSW5zaWRlKGFFZGdlMSwgYUVkZ2UyLCBiRWRnZTIpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzSW5zaWRlKGFFZGdlMSwgYUVkZ2UyLCBiRWRnZTEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW50ZXJzZWN0aW9uID0gY29tcHV0ZUludGVyc2VjdGlvbihiRWRnZTEsIGJFZGdlMiwgYUVkZ2UxLCBhRWRnZTIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGludGVyc2VjdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChiRWRnZTIpO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlzSW5zaWRlKGFFZGdlMSwgYUVkZ2UyLCBiRWRnZTEpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbnRlcnNlY3Rpb24gPSBjb21wdXRlSW50ZXJzZWN0aW9uKGJFZGdlMSwgYkVkZ2UyLCBhRWRnZTEsIGFFZGdlMik7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChpbnRlcnNlY3Rpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuY29uc3QgbGVycCA9IChhLCBiLCB0KSA9PiBhICsgKGIgLSBhKSAqIHQ7XHJcbmNvbnN0IGNsaXBTZWdtZW50VnNTZWdtZW50ID0gKHMxLCBzMikgPT4ge1xyXG4gICAgY29uc3QgW3AxLCBwMl0gPSBzMTtcclxuICAgIGNvbnN0IFtwMywgcDRdID0gczI7XHJcbiAgICBjb25zdCB0b3AgPSAocDRbMF0gLSBwM1swXSkgKiAocDFbMV0gLSBwM1sxXSkgLSAocDRbMV0gLSBwM1sxXSkgKiAocDFbMF0gLSBwM1swXSk7XHJcbiAgICBjb25zdCBib3R0b20gPSAocDRbMV0gLSBwM1sxXSkgKiAocDJbMF0gLSBwMVswXSkgLSAocDRbMF0gLSBwM1swXSkgKiAocDJbMV0gLSBwMVsxXSk7XHJcbiAgICBpZiAoIWJvdHRvbSlcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICBjb25zdCB0ID0gdG9wIC8gYm90dG9tO1xyXG4gICAgaWYgKHQgPCAwIHx8IHQgPiAxKVxyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIHJldHVybiBbW2xlcnAocDFbMF0sIHAyWzBdLCB0KSwgbGVycChwMVsxXSwgcDJbMV0sIHQpXV07XHJcbn07XHJcbmNvbnN0IGNsaXBQb2ludFZzUG9seSA9IChwb2ludCwgdmVydGljZXMpID0+IHtcclxuICAgIGNvbnN0IHggPSBwb2ludFswXTtcclxuICAgIGNvbnN0IHkgPSBwb2ludFsxXTtcclxuICAgIGxldCBpbnNpZGUgPSBmYWxzZTtcclxuICAgIGZvciAobGV0IGkgPSAwLCBqID0gdmVydGljZXMubGVuZ3RoIC0gMTsgaSA8IHZlcnRpY2VzLmxlbmd0aDsgaiA9IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHhpID0gdmVydGljZXNbaV1bMF0sIHlpID0gdmVydGljZXNbaV1bMV07XHJcbiAgICAgICAgY29uc3QgeGogPSB2ZXJ0aWNlc1tqXVswXSwgeWogPSB2ZXJ0aWNlc1tqXVsxXTtcclxuICAgICAgICBjb25zdCBpbnRlcnNlY3QgPSB5aSA+IHkgIT0geWogPiB5ICYmIHggPCAoKHhqIC0geGkpICogKHkgLSB5aSkpIC8gKHlqIC0geWkpICsgeGk7XHJcbiAgICAgICAgaWYgKGludGVyc2VjdClcclxuICAgICAgICAgICAgaW5zaWRlID0gIWluc2lkZTtcclxuICAgIH1cclxuICAgIHJldHVybiBbcG9pbnRdO1xyXG59O1xyXG5jb25zdCBjbGlwU2VnbWVudFZzUG9seSA9IChzZWdtZW50LCBwb2x5KSA9PiB7XHJcbiAgICBjb25zdCBbcDEsIHAyXSA9IHNlZ21lbnQ7XHJcbiAgICBjb25zdCBwb2ludHMgPSBbXTtcclxuICAgIGlmIChjbGlwUG9pbnRWc1BvbHkocDEsIHBvbHkpKVxyXG4gICAgICAgIHBvaW50cy5wdXNoKHAxKTtcclxuICAgIGlmIChjbGlwUG9pbnRWc1BvbHkocDIsIHBvbHkpKVxyXG4gICAgICAgIHBvaW50cy5wdXNoKHAyKTtcclxuICAgIGlmIChwb2ludHMubGVuZ3RoID4gMSlcclxuICAgICAgICByZXR1cm4gcG9pbnRzO1xyXG4gICAgZm9yIChsZXQgaSA9IDAsIG4gPSBwb2x5Lmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHExID0gcG9seS5hdChpIC0gMSk7XHJcbiAgICAgICAgY29uc3QgcTIgPSBwb2x5LmF0KGkpO1xyXG4gICAgICAgIGNvbnN0IGludGVyc2VjdGlvbiA9IGNsaXBTZWdtZW50VnNTZWdtZW50KFtwMSwgcDJdLCBbcTEsIHEyXSk7XHJcbiAgICAgICAgaWYgKGludGVyc2VjdGlvbi5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICBwb2ludHMucHVzaChpbnRlcnNlY3Rpb25bMF0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBvaW50cztcclxufTtcclxuY29uc3QgcGFpckhhc2ggPSAoeCwgeSkgPT4geCA9PT0gTWF0aC5tYXgoeCwgeSkgPyB4ICogeCArIHkgKyB4IDogeSAqIHggKyB5O1xyXG5jb25zdCBQT0xZID0gMztcclxuY29uc3QgU0VHTUVOVCA9IDI7XHJcbmNvbnN0IFBPSU5UID0gMTtcclxuY29uc3QgZmFjZVR5cGVNYXAgPSB7fTtcclxuZmFjZVR5cGVNYXBbcGFpckhhc2goUE9MWSwgUE9MWSldID0gY2xpcFBvbHlWc1BvbHk7XHJcbmZhY2VUeXBlTWFwW3BhaXJIYXNoKFNFR01FTlQsIFBPTFkpXSA9IGNsaXBTZWdtZW50VnNQb2x5O1xyXG5mYWNlVHlwZU1hcFtwYWlySGFzaChTRUdNRU5ULCBTRUdNRU5UKV0gPSBjbGlwU2VnbWVudFZzU2VnbWVudDtcclxuZmFjZVR5cGVNYXBbcGFpckhhc2goUE9JTlQsIFBPTFkpXSA9IChmYWNlMSwgZmFjZTIpID0+IGNsaXBQb2ludFZzUG9seShmYWNlMVswXSwgZmFjZTIpO1xyXG5mdW5jdGlvbiBjbGlwRmFjZVZzRmFjZShmYWNlMSwgZmFjZTIpIHtcclxuICAgIGNvbnN0IHR5cGUxID0gTWF0aC5taW4oZmFjZTEubGVuZ3RoLCBQT0xZKTtcclxuICAgIGNvbnN0IHR5cGUyID0gTWF0aC5taW4oZmFjZTIubGVuZ3RoLCBQT0xZKTtcclxuICAgIGxldCBhcmdzID0gW2ZhY2UxLCBmYWNlMl07XHJcbiAgICBpZiAodHlwZTEgPiB0eXBlMikge1xyXG4gICAgICAgIHJldHVybiBmYWNlVHlwZU1hcFtwYWlySGFzaCh0eXBlMiwgdHlwZTEpXShhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1swXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFjZVR5cGVNYXBbcGFpckhhc2godHlwZTEsIHR5cGUyKV0oYXJndW1lbnRzWzBdLCBhcmd1bWVudHNbMV0pO1xyXG59XHJcbmV4cG9ydCB7IGNsaXBTZWdtZW50VnNTZWdtZW50LCBpc0luc2lkZSwgY29tcHV0ZUludGVyc2VjdGlvbiwgY2xpcFBvbHlWc1BvbHksIGNsaXBGYWNlVnNGYWNlLCBpc0luQ2xvY2t3aXNlLCBjbGlwU2VnbWVudFZzUG9seSwgY2xpcFBvaW50VnNQb2x5LCB9O1xyXG4iLCJjb25zdCBjb25maWcgPSB7XHJcbiAgICBSSUdJRF9CT0RZX01PVkVfVFJFU0hPTEQ6IDAuMDA1LFxyXG4gICAgUklHSURfQk9EWV9BQUJCX0JJQVM6IDAuMTEsXHJcbiAgICBDTElQX0JJQVM6IDAuMDAxLFxyXG4gICAgR0pLX01BWF9JVEVSQVRJT05TX05VTTogNjQsXHJcbiAgICBFUEFfQklBUzogMC4wMDAwMSxcclxuICAgIENPTlRBQ1RfQklBUzogMC4xMjUsXHJcbiAgICBDT05UQUNUX1RSRVNIT0xEOiAwLjA1LFxyXG4gICAgQ09OVEFDVF9NQU5JRk9MRF9LRUVQX1RSRVNIT0xEOiAwLjAwMSxcclxuICAgIFNPTFZFUl9JVEVSQVRJT05TX05VTTogMTgsXHJcbiAgICBVU0VfQ09OVEFDVF9DQUNIRTogZmFsc2VcclxufTtcclxud2luZG93LmNvbmZpZyA9IGNvbmZpZztcclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xyXG4iLCJpbXBvcnQgeyB2MywgbTMgfSBmcm9tIFwicm9tYW5wcHBtYXRoXCI7XHJcbmltcG9ydCB7IGNsaXBGYWNlVnNGYWNlLCBpc0luQ2xvY2t3aXNlIH0gZnJvbSBcIi4vY2xpcHBpbmdcIjtcclxuY29uc3QgeyBkb3QsIGNyb3NzLCBub3JtYWxpemUsIHN1bSwgZGlmZiwgc2NhbGUsIGlzTnVsbCwgbm9ybSB9ID0gdjM7XHJcbmltcG9ydCBjb25maWcgZnJvbSBcIi4vY29uZmlnXCI7XHJcbmNvbnN0IHsgQ0xJUF9CSUFTLCBHSktfTUFYX0lURVJBVElPTlNfTlVNLCBFUEFfQklBUyB9ID0gY29uZmlnO1xyXG5jb25zdCByYXlWc1BsYW5lSW50ZXJzZWMgPSAocGxhbmUsIHBvaW50LCBkaXJlY3Rpb24pID0+IHtcclxuICAgIGNvbnN0IFtvcmlnaW4sIG5vcm1hbF0gPSBwbGFuZTtcclxuICAgIGNvbnN0IF9kb3QgPSBkb3Qobm9ybWFsLCBkaXJlY3Rpb24pO1xyXG4gICAgY29uc3QgZnJvbVBvaW50VG9PcmlnaW4gPSBkaWZmKHBvaW50LCBvcmlnaW4pO1xyXG4gICAgY29uc3QgZmFjID0gZG90KGZyb21Qb2ludFRvT3JpZ2luLCBub3JtYWwpIC8gX2RvdDtcclxuICAgIHJldHVybiBkaWZmKHBvaW50LCBzY2FsZShkaXJlY3Rpb24sIGZhYykpO1xyXG59O1xyXG5jb25zdCBpc1BvaW50QmVoaW5kUGxhbmUgPSAocGxhbmUsIHBvaW50LCBzaWduID0gMSkgPT4ge1xyXG4gICAgY29uc3QgW29yaWdpbiwgbm9ybWFsXSA9IHBsYW5lO1xyXG4gICAgbGV0IF9kID0gZG90KG5vcm1hbCwgZGlmZihwb2ludCwgb3JpZ2luKSkgKiBzaWduO1xyXG4gICAgcmV0dXJuIF9kID4gMCAtIENMSVBfQklBUztcclxufTtcclxuY29uc3QgcG9pbnRPblBsYW5lUHJvamVjdGlvbiA9IChwbGFuZSwgcG9pbnQpID0+IHtcclxuICAgIGNvbnN0IFtvcmlnaW4sIG5vcm1hbF0gPSBwbGFuZTtcclxuICAgIGNvbnN0IGZyb21Qb2ludFRvT3JpZ2luID0gZGlmZihwb2ludCwgb3JpZ2luKTtcclxuICAgIGNvbnN0IHByb2pBbG9uZ05vcm1hbCA9IGRvdChub3JtYWwsIGZyb21Qb2ludFRvT3JpZ2luKTtcclxuICAgIHJldHVybiBkaWZmKHBvaW50LCBzY2FsZShub3JtYWwsIHByb2pBbG9uZ05vcm1hbCkpO1xyXG59O1xyXG5jb25zdCBjbGlwUG9pbnRzQmVoaW5kUGxhbmUgPSAocGxhbmUsIHBvaW50cywgc2lnbiA9IDEpID0+IHtcclxuICAgIGNvbnN0IFtvcmlnaW4sIG5vcm1hbF0gPSBwbGFuZTtcclxuICAgIHJldHVybiBwb2ludHMuZmlsdGVyKChwb2ludCkgPT4gZG90KG5vcm1hbCwgZGlmZihwb2ludCwgb3JpZ2luKSkgKiBzaWduICsgQ0xJUF9CSUFTID4gMCk7XHJcbn07XHJcbmNvbnN0IGdldDJEY29vcmRzT25QbGFuZSA9IChpLCBqLCBwb2ludCkgPT4ge1xyXG4gICAgcmV0dXJuIFtkb3QoaSwgcG9pbnQpLCBkb3QoaiwgcG9pbnQpXTtcclxufTtcclxuZnVuY3Rpb24gdXBkYXRlX3NpbXBsZXgzKHByb3BzKSB7XHJcbiAgICBjb25zdCBuID0gY3Jvc3MoZGlmZihwcm9wcy5iLCBwcm9wcy5hKSwgZGlmZihwcm9wcy5jLCBwcm9wcy5hKSk7XHJcbiAgICBjb25zdCBBTyA9IHNjYWxlKHByb3BzLmEsIC0xKTtcclxuICAgIHByb3BzLnNpbXBfZGltID0gMjtcclxuICAgIGlmIChkb3QoY3Jvc3MoZGlmZihwcm9wcy5iLCBwcm9wcy5hKSwgbiksIEFPKSA+IDApIHtcclxuICAgICAgICBwcm9wcy5jID0gcHJvcHMuYTtcclxuICAgICAgICBwcm9wcy5zZWFyY2hfZGlyID0gY3Jvc3MoY3Jvc3MoZGlmZihwcm9wcy5iLCBwcm9wcy5hKSwgQU8pLCBkaWZmKHByb3BzLmIsIHByb3BzLmEpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoZG90KGNyb3NzKG4sIGRpZmYocHJvcHMuYywgcHJvcHMuYSkpLCBBTykgPiAwKSB7XHJcbiAgICAgICAgcHJvcHMuYiA9IHByb3BzLmE7XHJcbiAgICAgICAgcHJvcHMuc2VhcmNoX2RpciA9IGNyb3NzKGNyb3NzKGRpZmYocHJvcHMuYywgcHJvcHMuYSksIEFPKSwgZGlmZihwcm9wcy5jLCBwcm9wcy5hKSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcHJvcHMuc2ltcF9kaW0gPSAzO1xyXG4gICAgaWYgKGRvdChuLCBBTykgPiAwKSB7XHJcbiAgICAgICAgcHJvcHMuZCA9IHByb3BzLmM7XHJcbiAgICAgICAgcHJvcHMuYyA9IHByb3BzLmI7XHJcbiAgICAgICAgcHJvcHMuYiA9IHByb3BzLmE7XHJcbiAgICAgICAgcHJvcHMuc2VhcmNoX2RpciA9IG47XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcHJvcHMuZCA9IHByb3BzLmI7XHJcbiAgICBwcm9wcy5iID0gcHJvcHMuYTtcclxuICAgIHByb3BzLnNlYXJjaF9kaXIgPSBzY2FsZShuLCAtMSk7XHJcbiAgICByZXR1cm47XHJcbn1cclxuZnVuY3Rpb24gdXBkYXRlX3NpbXBsZXg0KHByb3BzKSB7XHJcbiAgICBjb25zdCBBQkMgPSBjcm9zcyhkaWZmKHByb3BzLmIsIHByb3BzLmEpLCBkaWZmKHByb3BzLmMsIHByb3BzLmEpKTtcclxuICAgIGNvbnN0IEFDRCA9IGNyb3NzKGRpZmYocHJvcHMuYywgcHJvcHMuYSksIGRpZmYocHJvcHMuZCwgcHJvcHMuYSkpO1xyXG4gICAgY29uc3QgQURCID0gY3Jvc3MoZGlmZihwcm9wcy5kLCBwcm9wcy5hKSwgZGlmZihwcm9wcy5iLCBwcm9wcy5hKSk7XHJcbiAgICBjb25zdCBBTyA9IHNjYWxlKHByb3BzLmEsIC0xKTtcclxuICAgIHByb3BzLnNpbXBfZGltID0gMztcclxuICAgIGlmIChkb3QoQUJDLCBBTykgPiAwKSB7XHJcbiAgICAgICAgcHJvcHMuZCA9IHByb3BzLmM7XHJcbiAgICAgICAgcHJvcHMuYyA9IHByb3BzLmI7XHJcbiAgICAgICAgcHJvcHMuYiA9IHByb3BzLmE7XHJcbiAgICAgICAgcHJvcHMuc2VhcmNoX2RpciA9IEFCQztcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoZG90KEFDRCwgQU8pID4gMCkge1xyXG4gICAgICAgIHByb3BzLmIgPSBwcm9wcy5hO1xyXG4gICAgICAgIHByb3BzLnNlYXJjaF9kaXIgPSBBQ0Q7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGRvdChBREIsIEFPKSA+IDApIHtcclxuICAgICAgICBwcm9wcy5jID0gcHJvcHMuZDtcclxuICAgICAgICBwcm9wcy5kID0gcHJvcHMuYjtcclxuICAgICAgICBwcm9wcy5iID0gcHJvcHMuYTtcclxuICAgICAgICBwcm9wcy5zZWFyY2hfZGlyID0gQURCO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG59XHJcbmZ1bmN0aW9uIGdqayhjb2xsMSwgY29sbDIpIHtcclxuICAgIGNvbnN0IHByb3BzID0ge1xyXG4gICAgICAgIGE6IFswLCAwLCAwXSxcclxuICAgICAgICBiOiBbMCwgMCwgMF0sXHJcbiAgICAgICAgYzogWzAsIDAsIDBdLFxyXG4gICAgICAgIGQ6IFswLCAwLCAwXSxcclxuICAgICAgICBzZWFyY2hfZGlyOiBbMCwgMCwgMF0sXHJcbiAgICAgICAgc2ltcF9kaW06IDAsXHJcbiAgICB9O1xyXG4gICAgY29uc3Qgb3JpZ2luc01hcCA9IG5ldyBNYXAoKTtcclxuICAgIGxldCBtdHYgPSBbMCwgMCwgMF07XHJcbiAgICBwcm9wcy5zZWFyY2hfZGlyID0gZGlmZihjb2xsMS5nZXRUcmFuc2xhdGlvbigpLCBjb2xsMi5nZXRUcmFuc2xhdGlvbigpKTtcclxuICAgIGNvbnN0IGNfb3JpZ2luMSA9IGNvbGwxLnN1cHBvcnQoc2NhbGUocHJvcHMuc2VhcmNoX2RpciwgLTEpKTtcclxuICAgIGNvbnN0IGNfb3JpZ2luMiA9IGNvbGwyLnN1cHBvcnQocHJvcHMuc2VhcmNoX2Rpcik7XHJcbiAgICBwcm9wcy5jID0gZGlmZihjX29yaWdpbjIsIGNfb3JpZ2luMSk7XHJcbiAgICBvcmlnaW5zTWFwLnNldChwcm9wcy5jLCBbY19vcmlnaW4xLCBjX29yaWdpbjJdKTtcclxuICAgIHByb3BzLnNlYXJjaF9kaXIgPSBzY2FsZShwcm9wcy5jLCAtMSk7XHJcbiAgICBjb25zdCBiX29yaWdpbjEgPSBjb2xsMS5zdXBwb3J0KHNjYWxlKHByb3BzLnNlYXJjaF9kaXIsIC0xKSk7XHJcbiAgICBjb25zdCBiX29yaWdpbjIgPSBjb2xsMi5zdXBwb3J0KHByb3BzLnNlYXJjaF9kaXIpO1xyXG4gICAgcHJvcHMuYiA9IGRpZmYoYl9vcmlnaW4yLCBiX29yaWdpbjEpO1xyXG4gICAgb3JpZ2luc01hcC5zZXQocHJvcHMuYiwgW2Jfb3JpZ2luMSwgYl9vcmlnaW4yXSk7XHJcbiAgICBpZiAoZG90KHByb3BzLmIsIHByb3BzLnNlYXJjaF9kaXIpIDwgMCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcHJvcHMuc2VhcmNoX2RpciA9IGNyb3NzKGNyb3NzKGRpZmYocHJvcHMuYywgcHJvcHMuYiksIHNjYWxlKHByb3BzLmIsIC0xKSksIGRpZmYocHJvcHMuYywgcHJvcHMuYikpO1xyXG4gICAgaWYgKGlzTnVsbChwcm9wcy5zZWFyY2hfZGlyKSkge1xyXG4gICAgICAgIHByb3BzLnNlYXJjaF9kaXIgPSBjcm9zcyhkaWZmKHByb3BzLmMsIHByb3BzLmIpLCBbMSwgMCwgMF0pO1xyXG4gICAgICAgIGlmIChpc051bGwocHJvcHMuc2VhcmNoX2RpcikpIHtcclxuICAgICAgICAgICAgcHJvcHMuc2VhcmNoX2RpciA9IGNyb3NzKGRpZmYocHJvcHMuYywgcHJvcHMuYiksIFswLCAwLCAtMV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb3BzLnNpbXBfZGltID0gMjtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR0pLX01BWF9JVEVSQVRJT05TX05VTTsgKytpKSB7XHJcbiAgICAgICAgY29uc3QgYV9vcmlnaW4xID0gY29sbDEuc3VwcG9ydChzY2FsZShwcm9wcy5zZWFyY2hfZGlyLCAtMSkpO1xyXG4gICAgICAgIGNvbnN0IGFfb3JpZ2luMiA9IGNvbGwyLnN1cHBvcnQocHJvcHMuc2VhcmNoX2Rpcik7XHJcbiAgICAgICAgcHJvcHMuYSA9IGRpZmYoYV9vcmlnaW4yLCBhX29yaWdpbjEpO1xyXG4gICAgICAgIG9yaWdpbnNNYXAuc2V0KHByb3BzLmEsIFthX29yaWdpbjEsIGFfb3JpZ2luMl0pO1xyXG4gICAgICAgIGlmIChkb3QocHJvcHMuYSwgcHJvcHMuc2VhcmNoX2RpcikgPCAwKVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICBwcm9wcy5zaW1wX2RpbSsrO1xyXG4gICAgICAgIGlmIChwcm9wcy5zaW1wX2RpbSA9PT0gMykge1xyXG4gICAgICAgICAgICB1cGRhdGVfc2ltcGxleDMocHJvcHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh1cGRhdGVfc2ltcGxleDQocHJvcHMpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBFUEEocHJvcHMuYSwgcHJvcHMuYiwgcHJvcHMuYywgcHJvcHMuZCwgb3JpZ2luc01hcCwgY29sbDEsIGNvbGwyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxyXG5jb25zdCBiYXJpY2VudHJpYyA9IChmYWNlLCBwb2ludCkgPT4ge1xyXG4gICAgbGV0IGExMSA9IGZhY2VbMF1bMF07XHJcbiAgICBsZXQgYTEyID0gZmFjZVsxXVswXTtcclxuICAgIGxldCBhMTMgPSBmYWNlWzJdWzBdO1xyXG4gICAgbGV0IGIxID0gcG9pbnRbMF07XHJcbiAgICBsZXQgYTIxID0gZmFjZVswXVsxXTtcclxuICAgIGxldCBhMjIgPSBmYWNlWzFdWzFdO1xyXG4gICAgbGV0IGEyMyA9IGZhY2VbMl1bMV07XHJcbiAgICBsZXQgYjIgPSBwb2ludFsxXTtcclxuICAgIGxldCBhMzEgPSBmYWNlWzBdWzJdO1xyXG4gICAgbGV0IGEzMiA9IGZhY2VbMV1bMl07XHJcbiAgICBsZXQgYTMzID0gZmFjZVsyXVsyXTtcclxuICAgIGxldCBiMyA9IHBvaW50WzJdO1xyXG4gICAgY29uc3QgZCA9IGExMSAqIGEyMiAqIGEzMyArXHJcbiAgICAgICAgYTIxICogYTMyICogYTEzICtcclxuICAgICAgICBhMTIgKiBhMjMgKiBhMzEgLVxyXG4gICAgICAgIGExMyAqIGEyMiAqIGEzMSAtXHJcbiAgICAgICAgYTIxICogYTEyICogYTMzIC1cclxuICAgICAgICBhMzIgKiBhMjMgKiBhMTE7XHJcbiAgICBjb25zdCBkMSA9IGIxICogYTIyICogYTMzICtcclxuICAgICAgICBiMiAqIGEzMiAqIGExMyArXHJcbiAgICAgICAgYTEyICogYTIzICogYjMgLVxyXG4gICAgICAgIGExMyAqIGEyMiAqIGIzIC1cclxuICAgICAgICBiMiAqIGExMiAqIGEzMyAtXHJcbiAgICAgICAgYTMyICogYTIzICogYjE7XHJcbiAgICBjb25zdCBkMiA9IGExMSAqIGIyICogYTMzICtcclxuICAgICAgICBhMjEgKiBiMyAqIGExMyArXHJcbiAgICAgICAgYjEgKiBhMjMgKiBhMzEgLVxyXG4gICAgICAgIGExMyAqIGIyICogYTMxIC1cclxuICAgICAgICBhMTEgKiBiMyAqIGEyMyAtXHJcbiAgICAgICAgYTIxICogYjEgKiBhMzM7XHJcbiAgICBjb25zdCBkMyA9IGExMSAqIGEyMiAqIGIzICtcclxuICAgICAgICBhMjEgKiBhMzIgKiBiMSArXHJcbiAgICAgICAgYTEyICogYjIgKiBhMzEgLVxyXG4gICAgICAgIGIxICogYTIyICogYTMxIC1cclxuICAgICAgICBhMjEgKiBhMTIgKiBiMyAtXHJcbiAgICAgICAgYjIgKiBhMzIgKiBhMTE7XHJcbiAgICByZXR1cm4gW2QxIC8gZCwgZDIgLyBkLCBkMyAvIGRdO1xyXG59O1xyXG5jb25zdCBvcmlnaW5Ub0ZhY2VQcm9qID0gKGZhY2UpID0+IHtcclxuICAgIGNvbnN0IG5vcm1hbCA9IGZhY2VbM107XHJcbiAgICBjb25zdCBwb2ludCA9IGZhY2VbMF07XHJcbiAgICBjb25zdCBjID0gLW5vcm1hbFswXSAqIHBvaW50WzBdIC0gbm9ybWFsWzFdICogcG9pbnRbMV0gLSBub3JtYWxbMl0gKiBwb2ludFsyXTtcclxuICAgIGNvbnN0IHQgPSAtYyAvXHJcbiAgICAgICAgKG5vcm1hbFswXSAqIG5vcm1hbFswXSArIG5vcm1hbFsxXSAqIG5vcm1hbFsxXSArIG5vcm1hbFsyXSAqIG5vcm1hbFsyXSk7XHJcbiAgICByZXR1cm4gW3QgKiBub3JtYWxbMF0sIHQgKiBub3JtYWxbMV0sIHQgKiBub3JtYWxbMl1dO1xyXG59O1xyXG5jb25zdCBNQVhfTlVNX0ZBQ0VTID0gNjQ7XHJcbmNvbnN0IE1BWF9OVU1fTE9PU0VfRURHRVMgPSAzMjtcclxuY29uc3QgRVBBX01BWF9OVU1fSVRFUiA9IDY0O1xyXG5jb25zdCBFUEEgPSAoYSwgYiwgYywgZCwgb3JpZ2luc01hcCwgY29sbDEsIGNvbGwyKSA9PiB7XHJcbiAgICBjb25zdCBmYWNlcyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgICAgICBmYWNlc1tpXSA9IFtdO1xyXG4gICAgfVxyXG4gICAgZmFjZXNbMF1bMF0gPSBhO1xyXG4gICAgZmFjZXNbMF1bMV0gPSBiO1xyXG4gICAgZmFjZXNbMF1bMl0gPSBjO1xyXG4gICAgZmFjZXNbMF1bM10gPSBub3JtYWxpemUoY3Jvc3MoZGlmZihiLCBhKSwgZGlmZihjLCBhKSkpO1xyXG4gICAgZmFjZXNbMV1bMF0gPSBhO1xyXG4gICAgZmFjZXNbMV1bMV0gPSBjO1xyXG4gICAgZmFjZXNbMV1bMl0gPSBkO1xyXG4gICAgZmFjZXNbMV1bM10gPSBub3JtYWxpemUoY3Jvc3MoZGlmZihjLCBhKSwgZGlmZihkLCBhKSkpO1xyXG4gICAgZmFjZXNbMl1bMF0gPSBhO1xyXG4gICAgZmFjZXNbMl1bMV0gPSBkO1xyXG4gICAgZmFjZXNbMl1bMl0gPSBiO1xyXG4gICAgZmFjZXNbMl1bM10gPSBub3JtYWxpemUoY3Jvc3MoZGlmZihkLCBhKSwgZGlmZihiLCBhKSkpO1xyXG4gICAgZmFjZXNbM11bMF0gPSBiO1xyXG4gICAgZmFjZXNbM11bMV0gPSBkO1xyXG4gICAgZmFjZXNbM11bMl0gPSBjO1xyXG4gICAgZmFjZXNbM11bM10gPSBub3JtYWxpemUoY3Jvc3MoZGlmZihkLCBiKSwgZGlmZihjLCBiKSkpO1xyXG4gICAgbGV0IG51bV9mYWNlcyA9IDQ7XHJcbiAgICBsZXQgY2xvc2VzdF9mYWNlID0gbnVsbDtcclxuICAgIGxldCBzZWFyY2hfZGlyO1xyXG4gICAgbGV0IHA7XHJcbiAgICBmb3IgKGxldCBpdGVyYXRpb24gPSAwOyBpdGVyYXRpb24gPCBFUEFfTUFYX05VTV9JVEVSOyArK2l0ZXJhdGlvbikge1xyXG4gICAgICAgIGxldCBtaW5fZGlzdCA9IGRvdChmYWNlc1swXVswXSwgZmFjZXNbMF1bM10pO1xyXG4gICAgICAgIGNsb3Nlc3RfZmFjZSA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1fZmFjZXM7ICsraSkge1xyXG4gICAgICAgICAgICBsZXQgZGlzdCA9IGRvdChmYWNlc1tpXVswXSwgZmFjZXNbaV1bM10pO1xyXG4gICAgICAgICAgICBpZiAoZGlzdCA8IG1pbl9kaXN0KSB7XHJcbiAgICAgICAgICAgICAgICBtaW5fZGlzdCA9IGRpc3Q7XHJcbiAgICAgICAgICAgICAgICBjbG9zZXN0X2ZhY2UgPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlYXJjaF9kaXIgPSBmYWNlc1tjbG9zZXN0X2ZhY2VdWzNdO1xyXG4gICAgICAgIGNvbnN0IHBfb3JpZ2luMSA9IGNvbGwxLnN1cHBvcnQoc2NhbGUoc2VhcmNoX2RpciwgLTEpKTtcclxuICAgICAgICBjb25zdCBwX29yaWdpbjIgPSBjb2xsMi5zdXBwb3J0KHNlYXJjaF9kaXIpO1xyXG4gICAgICAgIHAgPSBkaWZmKHBfb3JpZ2luMiwgcF9vcmlnaW4xKTtcclxuICAgICAgICBvcmlnaW5zTWFwLnNldChwLCBbcF9vcmlnaW4xLCBwX29yaWdpbjJdKTtcclxuICAgICAgICBpZiAoZG90KHAsIHNlYXJjaF9kaXIpIC0gbWluX2Rpc3QgPCBFUEFfQklBUykge1xyXG4gICAgICAgICAgICBjb25zdCBmYWNlID0gZmFjZXNbY2xvc2VzdF9mYWNlXTtcclxuICAgICAgICAgICAgY29uc3QgcG9pbnQgPSBvcmlnaW5Ub0ZhY2VQcm9qKGZhY2UpO1xyXG4gICAgICAgICAgICBjb25zdCBbQWEsIEJhXSA9IG9yaWdpbnNNYXAuZ2V0KGZhY2VbMF0pO1xyXG4gICAgICAgICAgICAvL2NvbnN0IEFhID0gZmFjZVswXS5vYVxyXG4gICAgICAgICAgICAvL2NvbnN0IEJhID0gZmFjZVswXS5vYlxyXG4gICAgICAgICAgICBjb25zdCBbQWIsIEJiXSA9IG9yaWdpbnNNYXAuZ2V0KGZhY2VbMV0pO1xyXG4gICAgICAgICAgICAvL2NvbnN0IEFiID0gZmFjZVsxXS5vYVxyXG4gICAgICAgICAgICAvL2NvbnN0IEJiID0gZmFjZVsxXS5vYlxyXG4gICAgICAgICAgICBjb25zdCBbQWMsIEJjXSA9IG9yaWdpbnNNYXAuZ2V0KGZhY2VbMl0pO1xyXG4gICAgICAgICAgICAvL2NvbnN0IEFjID0gZmFjZVsyXS5vYVxyXG4gICAgICAgICAgICAvL2NvbnN0IEJjID0gZmFjZVsyXS5vYlxyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBiYXJpY2VudHJpYyhmYWNlLCBwb2ludCk7XHJcbiAgICAgICAgICAgIGlmIChpc05hTihyZXN1bHRbMF0gKyByZXN1bHRbMV0gKyByZXN1bHRbMl0pKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgUEEgPSBzdW0oc3VtKHNjYWxlKEFhLCByZXN1bHRbMF0pLCBzY2FsZShBYiwgcmVzdWx0WzFdKSksIHNjYWxlKEFjLCByZXN1bHRbMl0pKTtcclxuICAgICAgICAgICAgLy9BYS5tdWx0aXBseShyZXN1bHRbMF0pLmFkZChBYi5tdWx0aXBseShyZXN1bHRbMV0pKS5hZGQoQWMubXVsdGlwbHkocmVzdWx0WzJdKSlcclxuICAgICAgICAgICAgbGV0IFBCID0gc3VtKHN1bShzY2FsZShCYSwgcmVzdWx0WzBdKSwgc2NhbGUoQmIsIHJlc3VsdFsxXSkpLCBzY2FsZShCYywgcmVzdWx0WzJdKSk7XHJcbiAgICAgICAgICAgIC8vQmEubXVsdGlwbHkocmVzdWx0WzBdKS5hZGQoQmIubXVsdGlwbHkocmVzdWx0WzFdKSkuYWRkKEJjLm11bHRpcGx5KHJlc3VsdFsyXSkpXHJcbiAgICAgICAgICAgIC8vY29uc3QgcmEgPSBQQS5zdWJzdHJhY3QoY29sbDEucG9zKVxyXG4gICAgICAgICAgICBjb25zdCBuID0gbm9ybWFsaXplKHNjYWxlKGZhY2VbM10sIC1kb3QocCwgc2VhcmNoX2RpcikpKTtcclxuICAgICAgICAgICAgLy9pZiAobm9ybShuKSA8IDAuMDEpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbkVycm9yID0gLWRvdChkaWZmKFBCLCBQQSksIG4pO1xyXG4gICAgICAgICAgICByZXR1cm4geyBQQSwgUEIsIG4sIHBvc2l0aW9uRXJyb3IgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbG9vc2VfZWRnZXMgPSBbXTtcclxuICAgICAgICBsZXQgbnVtX2xvb3NlX2VkZ2VzID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bV9mYWNlczsgKytpKSB7XHJcbiAgICAgICAgICAgIGlmIChkb3QoZmFjZXNbaV1bM10sIGRpZmYocCwgZmFjZXNbaV1bMF0pKSA+IDApIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMzsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRfZWRnZSA9IFtmYWNlc1tpXVtqXSwgZmFjZXNbaV1bKGogKyAxKSAlIDNdXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZm91bmRfZWRnZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgbnVtX2xvb3NlX2VkZ2VzOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvb3NlX2VkZ2VzW2tdWzFdID09PSBjdXJyZW50X2VkZ2VbMF0gJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvb3NlX2VkZ2VzW2tdWzBdID09PSBjdXJyZW50X2VkZ2VbMV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvb3NlX2VkZ2VzW2tdWzBdID0gbG9vc2VfZWRnZXNbbnVtX2xvb3NlX2VkZ2VzIC0gMV1bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb29zZV9lZGdlc1trXVsxXSA9IGxvb3NlX2VkZ2VzW251bV9sb29zZV9lZGdlcyAtIDFdWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtX2xvb3NlX2VkZ2VzLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3VuZF9lZGdlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSBudW1fbG9vc2VfZWRnZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFmb3VuZF9lZGdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChudW1fbG9vc2VfZWRnZXMgPj0gTUFYX05VTV9MT09TRV9FREdFUylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb29zZV9lZGdlc1tudW1fbG9vc2VfZWRnZXNdID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvb3NlX2VkZ2VzW251bV9sb29zZV9lZGdlc11bMF0gPSBjdXJyZW50X2VkZ2VbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvb3NlX2VkZ2VzW251bV9sb29zZV9lZGdlc11bMV0gPSBjdXJyZW50X2VkZ2VbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bV9sb29zZV9lZGdlcysrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZhY2VzW2ldWzBdID0gZmFjZXNbbnVtX2ZhY2VzIC0gMV1bMF07XHJcbiAgICAgICAgICAgICAgICBmYWNlc1tpXVsxXSA9IGZhY2VzW251bV9mYWNlcyAtIDFdWzFdO1xyXG4gICAgICAgICAgICAgICAgZmFjZXNbaV1bMl0gPSBmYWNlc1tudW1fZmFjZXMgLSAxXVsyXTtcclxuICAgICAgICAgICAgICAgIGZhY2VzW2ldWzNdID0gZmFjZXNbbnVtX2ZhY2VzIC0gMV1bM107XHJcbiAgICAgICAgICAgICAgICBudW1fZmFjZXMtLTtcclxuICAgICAgICAgICAgICAgIGktLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bV9sb29zZV9lZGdlczsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChudW1fZmFjZXMgPj0gTUFYX05VTV9GQUNFUylcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBmYWNlc1tudW1fZmFjZXNdID0gW107XHJcbiAgICAgICAgICAgIGZhY2VzW251bV9mYWNlc11bMF0gPSBsb29zZV9lZGdlc1tpXVswXTtcclxuICAgICAgICAgICAgZmFjZXNbbnVtX2ZhY2VzXVsxXSA9IGxvb3NlX2VkZ2VzW2ldWzFdO1xyXG4gICAgICAgICAgICBmYWNlc1tudW1fZmFjZXNdWzJdID0gcDtcclxuICAgICAgICAgICAgZmFjZXNbbnVtX2ZhY2VzXVszXSA9IG5vcm1hbGl6ZShjcm9zcyhkaWZmKGxvb3NlX2VkZ2VzW2ldWzBdLCBsb29zZV9lZGdlc1tpXVsxXSksIGRpZmYobG9vc2VfZWRnZXNbaV1bMF0sIHApKSk7XHJcbiAgICAgICAgICAgIGlmIChkb3QoZmFjZXNbbnVtX2ZhY2VzXVswXSwgZmFjZXNbbnVtX2ZhY2VzXVszXSkgKyAwLjAxIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGVtcCA9IGZhY2VzW251bV9mYWNlc11bMF07XHJcbiAgICAgICAgICAgICAgICBmYWNlc1tudW1fZmFjZXNdWzBdID0gZmFjZXNbbnVtX2ZhY2VzXVsxXTtcclxuICAgICAgICAgICAgICAgIGZhY2VzW251bV9mYWNlc11bMV0gPSB0ZW1wO1xyXG4gICAgICAgICAgICAgICAgZmFjZXNbbnVtX2ZhY2VzXVszXSA9IHNjYWxlKGZhY2VzW251bV9mYWNlc11bM10sIC0xKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBudW1fZmFjZXMrKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuY29uc3QgZ2prU2NvcGUgPSB7fTtcclxuY29uc3QgX2dqayA9IGdqay5iaW5kKGdqa1Njb3BlKTtcclxuY29uc3QgZ2V0Q29udGFjdHMgPSAoY29sbDEsIGNvbGwyKSA9PiB7XHJcbiAgICBjb25zdCBjb250YWN0RGF0YSA9IGdqayhjb2xsMSwgY29sbDIpO1xyXG4gICAgaWYgKCFjb250YWN0RGF0YSlcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICBjb25zdCB7IFBBLCBQQiwgbiwgcG9zaXRpb25FcnJvciB9ID0gY29udGFjdERhdGE7XHJcbiAgICBpZiAoY29sbDEuZ2V0VHlwZSgpID09PSBcInNwaGVyZVwiIHx8IGNvbGwyLmdldFR5cGUoKSA9PT0gXCJzcGhlcmVcIikge1xyXG4gICAgICAgIGNvbnN0IHJiID0gZGlmZihQQiwgY29sbDIuZ2V0VHJhbnNsYXRpb24oKSk7XHJcbiAgICAgICAgY29uc3QgcmEgPSBkaWZmKFBBLCBjb2xsMS5nZXRUcmFuc2xhdGlvbigpKTtcclxuICAgICAgICBjb25zdCByYUxvY2FsID0gbTMudHJhbnNmb3JtUG9pbnQoY29sbDEuZ2V0Um1hdHJpeEludmVyc2UoKSwgcmEpO1xyXG4gICAgICAgIGNvbnN0IHJiTG9jYWwgPSBtMy50cmFuc2Zvcm1Qb2ludChjb2xsMi5nZXRSbWF0cml4SW52ZXJzZSgpLCByYik7XHJcbiAgICAgICAgY29uc3QgaSA9IFtuWzFdICsgblsyXSwgblsyXSAtIG5bMF0sIC1uWzBdIC0gblsxXV07XHJcbiAgICAgICAgY29uc3QgaiA9IGNyb3NzKHNjYWxlKG4sIC0xKSwgaSk7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmEsIHJiLCBuLCBQQSwgUEIsIHBvc2l0aW9uRXJyb3IsIGksIGosIHJhTG9jYWwsIHJiTG9jYWxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcbiAgICBjb25zdCBuUmV2ZXJzZSA9IHNjYWxlKG4sIC0xKTtcclxuICAgIGNvbnN0IGNvbnRhY3RGYWNlMSA9IGNvbGwxLmdldENsb3Nlc3RGYWNlQnlOb3JtYWwoblJldmVyc2UpO1xyXG4gICAgY29uc3QgY29udGFjdEZhY2UyID0gY29sbDIuZ2V0Q2xvc2VzdEZhY2VCeU5vcm1hbChuKTtcclxuICAgIGNvbnN0IHBsYW5lID0gW3NjYWxlKHN1bShQQSwgUEIpLCAwLjUpLCBuXTtcclxuICAgIGNvbnN0IHByb2plY3Rpb25zMSA9IGNvbnRhY3RGYWNlMS52ZXJ0aWNlcy5tYXAoKHApID0+IHBvaW50T25QbGFuZVByb2plY3Rpb24ocGxhbmUsIHApKTtcclxuICAgIGNvbnN0IHByb2plY3Rpb25zMiA9IGNvbnRhY3RGYWNlMi52ZXJ0aWNlcy5tYXAoKHApID0+IHBvaW50T25QbGFuZVByb2plY3Rpb24ocGxhbmUsIHApKTtcclxuICAgIGNvbnN0IG9yaWdpbiA9IHBsYW5lWzBdO1xyXG4gICAgY29uc3QgaSA9IG5vcm1hbGl6ZShbblsxXSArIG5bMl0sIG5bMl0gLSBuWzBdLCAtblswXSAtIG5bMV1dKTtcclxuICAgIGNvbnN0IGogPSBjcm9zcyhzY2FsZShuLCAtMSksIGkpO1xyXG4gICAgbGV0IF8yZDEgPSBwcm9qZWN0aW9uczEubWFwKChwKSA9PiBnZXQyRGNvb3Jkc09uUGxhbmUoaSwgaiwgZGlmZihwLCBvcmlnaW4pKSk7XHJcbiAgICBsZXQgXzJkMiA9IHByb2plY3Rpb25zMi5tYXAoKHApID0+IGdldDJEY29vcmRzT25QbGFuZShpLCBqLCBkaWZmKHAsIG9yaWdpbikpKTtcclxuICAgIGNvbnN0IGRpcjEgPSBpc0luQ2xvY2t3aXNlKF8yZDEpO1xyXG4gICAgY29uc3QgZGlyMiA9IGlzSW5DbG9ja3dpc2UoXzJkMik7XHJcbiAgICBpZiAoZGlyMSA8IDApXHJcbiAgICAgICAgXzJkMSA9IF8yZDEubWFwKChfLCBpKSA9PiBfMmQxLmF0KC1pKSk7XHJcbiAgICBpZiAoZGlyMiA8IDApXHJcbiAgICAgICAgXzJkMiA9IF8yZDIubWFwKChfLCBpKSA9PiBfMmQyLmF0KC1pKSk7XHJcbiAgICBjb25zdCBjbGlwcGVkID0gY2xpcEZhY2VWc0ZhY2UoXzJkMSwgXzJkMik7XHJcbiAgICBjb25zdCBfM2QgPSBjbGlwcGVkLm1hcCgocCkgPT4gc3VtKG9yaWdpbiwgc3VtKHNjYWxlKGksIHBbMF0pLCBzY2FsZShqLCBwWzFdKSkpKTtcclxuICAgIGNvbnN0IGZlYXR1cmVzID0gW107XHJcbiAgICBfM2QuZm9yRWFjaCgocG9pbnQpID0+IHtcclxuICAgICAgICBjb25zdCBQQSA9IHJheVZzUGxhbmVJbnRlcnNlYyhbY29udGFjdEZhY2UxLnZlcnRpY2VzWzBdLCBjb250YWN0RmFjZTEubm9ybWFsXSwgcG9pbnQsIG4pO1xyXG4gICAgICAgIGlmICghaXNQb2ludEJlaGluZFBsYW5lKHBsYW5lLCBQQSwgMSkpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBjb25zdCBQQiA9IHJheVZzUGxhbmVJbnRlcnNlYyhbY29udGFjdEZhY2UyLnZlcnRpY2VzWzBdLCBjb250YWN0RmFjZTIubm9ybWFsXSwgcG9pbnQsIG4pO1xyXG4gICAgICAgIGlmICghaXNQb2ludEJlaGluZFBsYW5lKHBsYW5lLCBQQiwgLTEpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgY29uc3QgcmIgPSBkaWZmKFBCLCBjb2xsMi5nZXRUcmFuc2xhdGlvbigpKTtcclxuICAgICAgICBjb25zdCByYSA9IGRpZmYoUEEsIGNvbGwxLmdldFRyYW5zbGF0aW9uKCkpO1xyXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uRXJyb3IgPSAtZG90KGRpZmYoUEIsIFBBKSwgbik7XHJcbiAgICAgICAgY29uc3QgcmFMb2NhbCA9IG0zLnRyYW5zZm9ybVBvaW50KGNvbGwxLmdldFJtYXRyaXhJbnZlcnNlKCksIHJhKTtcclxuICAgICAgICBjb25zdCByYkxvY2FsID0gbTMudHJhbnNmb3JtUG9pbnQoY29sbDIuZ2V0Um1hdHJpeEludmVyc2UoKSwgcmIpO1xyXG4gICAgICAgIGZlYXR1cmVzLnB1c2goe1xyXG4gICAgICAgICAgICByYSwgcmIsIG4sIFBBLCBQQiwgcG9zaXRpb25FcnJvciwgaSwgaiwgcmFMb2NhbCwgcmJMb2NhbFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBpZiAoZmVhdHVyZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgY29uc3QgcmIgPSBkaWZmKFBCLCBjb2xsMi5nZXRUcmFuc2xhdGlvbigpKTtcclxuICAgICAgICBjb25zdCByYSA9IGRpZmYoUEEsIGNvbGwxLmdldFRyYW5zbGF0aW9uKCkpO1xyXG4gICAgICAgIGNvbnN0IHJhTG9jYWwgPSBtMy50cmFuc2Zvcm1Qb2ludChjb2xsMS5nZXRSbWF0cml4SW52ZXJzZSgpLCByYSk7XHJcbiAgICAgICAgY29uc3QgcmJMb2NhbCA9IG0zLnRyYW5zZm9ybVBvaW50KGNvbGwyLmdldFJtYXRyaXhJbnZlcnNlKCksIHJiKTtcclxuICAgICAgICBmZWF0dXJlcy5wdXNoKHtcclxuICAgICAgICAgICAgcmEsIHJiLCBuLCBQQSwgUEIsIHBvc2l0aW9uRXJyb3IsIGksIGosIHJhTG9jYWwsIHJiTG9jYWxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBmZWF0dXJlcztcclxufTtcclxuZXhwb3J0IHsgZ2V0Q29udGFjdHMsIHBvaW50T25QbGFuZVByb2plY3Rpb24sIGNsaXBQb2ludHNCZWhpbmRQbGFuZSwgZ2V0MkRjb29yZHNPblBsYW5lLCByYXlWc1BsYW5lSW50ZXJzZWMsIH07XHJcbiIsIlxuaW1wb3J0IHttNCwgbTMsIHYzfSBmcm9tICdyb21hbnBwcG1hdGgnXG5cbmNvbnN0IEtFWVMgPSB7XG4gICAgJ3cnIDogJ21vdmVGb3J3YXJkJyxcbiAgICAncycgOiAnbW92ZUJhY2t3YXJkJyxcbiAgICAnYScgOiAnbW92ZUxlZnQnLFxuICAgICdkJyA6ICdtb3ZlUmlnaHQnLFxuICAgICcgJyA6ICdtb3ZlVXAnXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZyZWVDYW0ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmtleUlucHV0ID0gbnVsbDtcbiAgICB0aGlzLm1vdXNlSW5wdXQgPSBudWxsO1xuICAgIHRoaXMucm90YXRpb25YID0gMDtcbiAgICB0aGlzLnJvdGF0aW9uWSA9IDA7XG4gICAgdGhpcy5kZWx0YVJZID0gMDtcbiAgICB0aGlzLmNhbVBvcyA9IFswLCAwLCAxMF07XG4gICAgdGhpcy5jYW1Sb3QgPSBtMy5pZGVudGl0eSgpO1xuICB9XG4gIGxpc3Rlbk1vdXNlKG1vdXNlSW5wdXQpIHtcbiAgICB0aGlzLm1vdXNlSW5wdXQgPSBtb3VzZUlucHV0O1xuICAgIG1vdXNlSW5wdXQub24oXCJtb3ZlXCIsIChbZGVsdGFYLCBkZWx0YVldKSA9PiB7XG4gICAgICB0aGlzLnJvdGF0aW9uWSAtPSBkZWx0YVggKiAwLjAwNTtcbiAgICAgIHRoaXMucm90YXRpb25YIC09IGRlbHRhWSAqIDAuMDA1O1xuICAgICAgdGhpcy5yb3RhdGlvblggPSBNYXRoLm1heChcbiAgICAgICAgLU1hdGguUEkgLyAyLFxuICAgICAgICBNYXRoLm1pbihNYXRoLlBJIC8gMiwgdGhpcy5yb3RhdGlvblgpXG4gICAgICApO1xuICAgICAgdGhpcy5kZWx0YVJZID0gZGVsdGFYICogMC4wMDU7XG4gICAgfSk7XG4gIH1cbiAgbGlzdGVuS2V5Ym9hcmQoa2V5SW5wdXQpIHtcbiAgICB0aGlzLmtleUlucHV0ID0ga2V5SW5wdXQ7XG4gIH1cbiAgdGljaygpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiB0aGlzLmtleUlucHV0LmtleXMpIHtcbiAgICAgIGNvbnN0IGFjdGlvbk5hbWUgPSBLRVlTW2tleV07XG4gICAgICBpZiAoYWN0aW9uTmFtZSkge1xuICAgICAgICBjb25zdCBhY3Rpb24gPSB0aGlzW2FjdGlvbk5hbWVdLmJpbmQodGhpcyk7XG4gICAgICAgIGFjdGlvbigpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuY2FtTWF0cml4ID0gbTQudHJhbnNsYXRpb24oLi4udGhpcy5jYW1Qb3MpO1xuICAgIHRoaXMuY2FtTWF0cml4ID0gbTQueFJvdGF0ZShcbiAgICAgIG00LnlSb3RhdGUodGhpcy5jYW1NYXRyaXgsIHRoaXMucm90YXRpb25ZKSxcbiAgICAgIHRoaXMucm90YXRpb25YXG4gICAgKTtcbiAgfVxuICBtb3ZlKGRpcikge1xuICAgIGNvbnN0IG0gPSBtNC5tNFRvbTModGhpcy5jYW1NYXRyaXgpO1xuICAgIHRoaXMuY2FtUG9zID0gdjMuc3VtKHRoaXMuY2FtUG9zLCBtMy50cmFuc2Zvcm1Qb2ludChtLCBkaXIpKTtcbiAgfVxuICBtb3ZlRm9yd2FyZCgpIHtcbiAgICB0aGlzLm1vdmUoWzAsIDAsIC0xXSk7XG4gIH1cbiAgbW92ZUJhY2t3YXJkKCkge1xuICAgIHRoaXMubW92ZShbMCwgMCwgMV0pO1xuICB9XG4gIG1vdmVMZWZ0KCkge1xuICAgIHRoaXMubW92ZShbLTEsIDAsIDBdKTtcbiAgfVxuICBtb3ZlUmlnaHQoKSB7XG4gICAgdGhpcy5tb3ZlKFsxLCAwLCAwXSk7XG4gIH1cbiAgbW92ZVVwKCkge1xuICAgIHRoaXMubW92ZShbMCwgMSwgMF0pO1xuICB9XG59XG4iLCJpbXBvcnQgIEV2ZW50RW1pdHRlciAgZnJvbSBcIi4uL3BoeXNpY3MvRXZlbnRFbWl0dGVyLnRzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtleUlucHV0IGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMua2V5cyA9IG5ldyBTZXQoKTtcbiAgfVxuICBsb2dEb3duKHsga2V5IH0pIHtcbiAgICB0aGlzLmtleXMuYWRkKGtleSk7XG4gICAgdGhpcy5lbWl0KFwia2V5ZG93blwiLCB7IGtleSB9KTtcbiAgfVxuICBsb2dVcCh7IGtleSB9KSB7XG4gICAgdGhpcy5rZXlzLmRlbGV0ZShrZXkpO1xuICAgIHRoaXMuZW1pdChcImtleXVwXCIsIHsga2V5IH0pO1xuICB9XG4gIGxpc3RlbigpIHtcbiAgICBjb25zdCBsb2dEb3duID0gdGhpcy5sb2dEb3duLmJpbmQodGhpcyk7XG4gICAgY29uc3QgbG9nVXAgPSB0aGlzLmxvZ1VwLmJpbmQodGhpcyk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgbG9nRG93bik7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGxvZ1VwKTtcbiAgICB0aGlzLnVuc3Vic2ljcmliZSA9ICgpID0+IHtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGxvZ0Rvd24pO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGxvZ1VwKTtcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQgIEV2ZW50RW1pdHRlciAgZnJvbSBcIi4uL3BoeXNpY3MvRXZlbnRFbWl0dGVyLnRzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdXNlSW5wdXQgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50ID0gZG9jdW1lbnQpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubGFzdFggPSAwO1xuICAgIHRoaXMubGFzdFkgPSAwO1xuICAgIHRoaXMuZW5hYmxlID0gZmFsc2U7XG4gICAgdGhpcy5tb3ZlcyA9IFtdXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudFxuICB9XG4gIGxvZ01vdmUoeyBvZmZzZXRYLCBvZmZzZXRZIH0pIHtcbiAgICBjb25zdCBkZWx0YVggPSBvZmZzZXRYIC0gdGhpcy5sYXN0WDtcbiAgICB0aGlzLmxhc3RYID0gb2Zmc2V0WDtcbiAgICBjb25zdCBkZWx0YVkgPSBvZmZzZXRZIC0gdGhpcy5sYXN0WTtcbiAgICB0aGlzLmxhc3RZID0gb2Zmc2V0WTtcbiAgICB0aGlzLmVtaXQoXCJtb3ZlXCIsIFtkZWx0YVgsIGRlbHRhWV0pO1xuICAgIHRoaXMubW92ZXMucHVzaChbZGVsdGFYLCBkZWx0YVldKVxuICB9XG4gIGxpc3RlbigpIHtcbiAgICBjb25zdCBsb2dNb3ZlID0gdGhpcy5sb2dNb3ZlLmJpbmQodGhpcyk7XG4gICAgY29uc3QgXyA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAodGhpcy5lbmFibGUpIGxvZ01vdmUoZSk7XG4gICAgfS5iaW5kKHRoaXMpO1xuICAgIGNvbnN0IGRvd24gPSBmdW5jdGlvbiAoeyBvZmZzZXRYLCBvZmZzZXRZIH0pIHtcbiAgICAgIHRoaXMubGFzdFggPSBvZmZzZXRYO1xuICAgICAgdGhpcy5sYXN0WSA9IG9mZnNldFk7XG4gICAgICB0aGlzLmVuYWJsZSA9IHRydWU7XG4gICAgfS5iaW5kKHRoaXMpO1xuICAgIGNvbnN0IHVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5lbmFibGUgPSBmYWxzZTtcbiAgICB9LmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBfKTtcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBkb3duKTtcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdXApO1xuICAgIHRoaXMudW5zdWJzY3JpYmUgPSAoKSA9PiB7XG4gICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBfKTtcbiAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGRvd24pO1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHVwKTtcbiAgICB9O1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IG00IH0gZnJvbSBcInJvbWFucHBwbWF0aFwiO1xyXG5pbXBvcnQgeyBjcmVhdGVCb3gsIEdMY29udGV4dFdyYXBwZXIsIHBvaW50TGlnaHRTaGFkZXJzLCBkZWZhdWx0U2hhZGVycywgY3JlYXRlU3BoZXJlLCB9IGZyb20gXCJyb21hbnBwcGdyYXBoaWNzXCI7XHJcbmltcG9ydCBGcmVlQ2FtIGZyb20gXCIuLi8uLi9zcmMvbWlzYy9GcmVlQ2FtXCI7XHJcbmltcG9ydCBLZXlJbnB1dCBmcm9tIFwiLi4vLi4vc3JjL21pc2Mva2V5SW5wdXRcIjtcclxuaW1wb3J0IE1vdXNlSW5wdXQgZnJvbSBcIi4uLy4uL3NyYy9taXNjL21vdXNlSW5wdXRcIjtcclxuY29uc3QgbW91c2VJbnB1dCA9IG5ldyBNb3VzZUlucHV0KCk7XHJcbm1vdXNlSW5wdXQubGlzdGVuKCk7XHJcbmNvbnN0IGtleUlucHV0ID0gbmV3IEtleUlucHV0KCk7XHJcbmtleUlucHV0Lmxpc3RlbigpO1xyXG5jb25zdCBwbGF5ZXIgPSBuZXcgRnJlZUNhbSgpO1xyXG5wbGF5ZXIubGlzdGVuS2V5Ym9hcmQoa2V5SW5wdXQpO1xyXG5wbGF5ZXIubGlzdGVuTW91c2UobW91c2VJbnB1dCk7XHJcbnBsYXllci5jYW1Qb3MgPSBbLTEwLCAzMCwgMjVdO1xyXG5wbGF5ZXIucm90YXRpb25YID0gLU1hdGguUEkgKiAwLjE7XHJcbnBsYXllci5yb3RhdGlvblkgPSAtTWF0aC5QSSAqIDAuMTtcclxuY29uc3QgZ2wgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiKS5nZXRDb250ZXh0KFwid2ViZ2wyXCIpO1xyXG5jb25zdCBjb250ZXh0ID0gbmV3IEdMY29udGV4dFdyYXBwZXIoZ2wpO1xyXG5jb25zdCB7IFByaW1pdGl2ZVJlbmRlcmVyLCBEcmF3ZXIsIFByb2dyYW1JbmZvIH0gPSBjb250ZXh0O1xyXG5jb250ZXh0LnJlc2l6ZUNhbnZhc1RvRGlzcGxheVNpemUoKTtcclxuY29uc3QgZHJhd2VyID0gbmV3IERyYXdlcigpO1xyXG5kcmF3ZXIucHJvamVjdGlvbk1hdHJpeCA9IERyYXdlci5jcmVhdGUzZFByb2plY3Rpb25NYXRyaXgoMSwgMjAwMCwgZ2wuY2FudmFzLndpZHRoLCBnbC5jYW52YXMuaGVpZ2h0KTtcclxuY29uc3QgcG9pbnRMaWdodFByb2dyYW1JbmZvID0gbmV3IFByb2dyYW1JbmZvKHBvaW50TGlnaHRTaGFkZXJzLnZlcnQsIHBvaW50TGlnaHRTaGFkZXJzLmZyYWcpO1xyXG5wb2ludExpZ2h0UHJvZ3JhbUluZm8uY29tcGlsZVNoYWRlcnMoKS5jcmVhdGVVbmlmb3JtU2V0dGVycygpO1xyXG5jb25zdCBkZWZhdWx0UHJvZ3JhbUluZm8gPSBuZXcgUHJvZ3JhbUluZm8oZGVmYXVsdFNoYWRlcnMudmVydCwgZGVmYXVsdFNoYWRlcnMuZnJhZyk7XHJcbmRlZmF1bHRQcm9ncmFtSW5mby5jb21waWxlU2hhZGVycygpLmNyZWF0ZVVuaWZvcm1TZXR0ZXJzKCk7XHJcbmNvbnN0IGN1YmUgPSBQcmltaXRpdmVSZW5kZXJlci5mcm9tQXJyYXlEYXRhKGNyZWF0ZUJveCgxLCAxLCAxKSk7XHJcbmNvbnN0IHBvaW50ID0gbmV3IFByaW1pdGl2ZVJlbmRlcmVyKCk7XHJcbmN1YmVcclxuICAgIC5jcmVhdGVWQU8oKVxyXG4gICAgLnNldERyYXdlcihkcmF3ZXIpXHJcbiAgICAuc2V0UHJvZ3JhbUluZm8ocG9pbnRMaWdodFByb2dyYW1JbmZvKVxyXG4gICAgLnNldE1vZGUoNCk7XHJcbmNvbnN0IHNwaGVyZSA9IFByaW1pdGl2ZVJlbmRlcmVyLmZyb21BcnJheURhdGEoY3JlYXRlU3BoZXJlKDEsIDEwLCAxMCkpO1xyXG5zcGhlcmVcclxuICAgIC5jcmVhdGVWQU8oKVxyXG4gICAgLnNldERyYXdlcihkcmF3ZXIpXHJcbiAgICAuc2V0UHJvZ3JhbUluZm8ocG9pbnRMaWdodFByb2dyYW1JbmZvKVxyXG4gICAgLnNldE1vZGUoMik7XHJcbnBvaW50XHJcbiAgICAuY3JlYXRlVkFPKClcclxuICAgIC5zZXREcmF3ZXIoZHJhd2VyKVxyXG4gICAgLnNldFByb2dyYW1JbmZvKGRlZmF1bHRQcm9ncmFtSW5mbylcclxuICAgIC5jcmVhdGVCdWZmZXJBdHRyaWJEYXRhKHtcclxuICAgIGF0dHJpYk5hbWU6IFwiYV9wb3NpdGlvblwiLFxyXG4gICAgbG9jYXRpb246IDAsXHJcbiAgICBhdHRyaWJ1dGVUeXBlOiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0LkZMT0FUX1ZFQzMsXHJcbiAgICBudW1Db21wb25lbnRzOiAzLFxyXG59KVxyXG4gICAgLnNldEF0dHJpYnV0ZXMoKVxyXG4gICAgLmJ1ZmZlckRhdGEoXCJhX3Bvc2l0aW9uXCIsIG5ldyBGbG9hdDMyQXJyYXkoWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDFdKSlcclxuICAgIC5zZXRNb2RlKDMpXHJcbiAgICAuc2V0TnVtRWxlbWVudHMoNSk7XHJcbmNvbnN0IHVuaWZvcm1zID0ge1xyXG4gICAgdV9saWdodFdvcmxkUG9zaXRpb246IFszMCwgNTAsIDMwXSxcclxuICAgIHVfYW1iaWVudExpZ2h0OiBbMSwgMSwgMC4zLCAwLjExXSxcclxuICAgIHVfcmV2ZXJzZUxpZ2h0RGlyZWN0aW9uOiBbMSwgMCwgMF0sXHJcbiAgICB1X3NoaW5pbmVzczogMzAwLFxyXG59O1xyXG5pbXBvcnQgeyBSaWdpZEJvZHkgfSBmcm9tIFwiLi4vLi4vc3JjL3BoeXNpY3MvUmlnaWRCb2R5XCI7XHJcbmltcG9ydCBTaW11bGF0aW9uIGZyb20gXCIuLi8uLi9zcmMvcGh5c2ljcy9TaW11bGF0aW9uXCI7XHJcbmltcG9ydCB7IEJveCwgU3BoZXJlIH0gZnJvbSBcIi4uLy4uL3NyYy9waHlzaWNzL0NvbGxpZGVyXCI7XHJcbmltcG9ydCB7IENvbnN0cmFpbnQgfSBmcm9tIFwiLi4vLi4vc3JjL3BoeXNpY3MvQ29uc3RyYWludHNcIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vLi4vc3JjL3BoeXNpY3MvY29uZmlnXCI7XHJcbmNvbmZpZy5SSUdJRF9CT0RZX01PVkVfVFJFU0hPTEQgPSAwLjAwMDE7XHJcbmNvbnN0IHNpbSA9IG5ldyBTaW11bGF0aW9uKCk7XHJcbmNvbnN0IGJvZHkgPSBuZXcgUmlnaWRCb2R5KG5ldyBCb3goNSwgNSwgNSkpO1xyXG5jb25zdCBmbG9vciA9IHtcclxuICAgIHBoeXNpY3M6IG5ldyBSaWdpZEJvZHkobmV3IEJveCg1MCwgNSwgNTApKSxcclxuICAgIHNwcml0ZTogY3ViZSxcclxuICAgIHVuaWZvcm1zOiB7IHVfY29sb3I6IFsxLCAwLCAxLCAxXSB9LFxyXG59O1xyXG5mbG9vci5waHlzaWNzLnNldE1hc3MoOTk5OTk5OTk5OTkpO1xyXG5mbG9vci5waHlzaWNzLnN0YXRpYyA9IHRydWU7XHJcbmZsb29yLnBoeXNpY3MudHJhbnNsYXRlKFswLCAtMi41LCAwXSk7XHJcbnNpbS5hZGRPYmplY3QoZmxvb3IucGh5c2ljcyk7XHJcbmxldCBvYmplY3RzVG9EcmF3ID0gW107XHJcbm9iamVjdHNUb0RyYXcucHVzaChmbG9vcik7XHJcbi8qXHJcbmZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xyXG4gIGNvbnN0IGJveCA9IHsgcGh5c2ljczogbmV3IFJpZ2lkQm9keShuZXcgQm94KDMsIDMsIDMpKSwgc3ByaXRlOiBjdWJlLCB1bmlmb3JtcyA6IHt1X2NvbG9yIDogWzAsMCwxLDFdfSB9O1xyXG4gIGJveC5waHlzaWNzLnRyYW5zbGF0ZShbMCwgIDEuNSArIDMuMSAqIChpKSwgMF0pO1xyXG4gIC8vYm94LnBoeXNpY3MudHJhbnNsYXRlKFswLCAgMSArIDMuMDEgKiAoaSksIDBdKTtcclxuICBib3gucGh5c2ljcy5zZXRNYXNzKDIpO1xyXG4gIGJveC5waHlzaWNzLmFkZEFjY2VsZXJhdGlvbihbMCwgLTksIDBdKTtcclxuICBzaW0uYWRkT2JqZWN0KGJveC5waHlzaWNzKTtcclxuICBvYmplY3RzVG9EcmF3LnB1c2goYm94KTtcclxuXHJcbn0qL1xyXG5jb25zdCBib3ggPSB7XHJcbiAgICBwaHlzaWNzOiBuZXcgUmlnaWRCb2R5KG5ldyBTcGhlcmUoNSkpLFxyXG4gICAgc3ByaXRlOiBzcGhlcmUsXHJcbiAgICB1bmlmb3JtczogeyB1X2NvbG9yOiBbMCwgMCwgMSwgMV0gfSxcclxufTtcclxuYm94LnBoeXNpY3MudHJhbnNsYXRlKFswLCA1LCAwXSk7XHJcbmJveC5waHlzaWNzLnNldE1hc3MoMik7XHJcbmJveC5waHlzaWNzLmFkZEFjY2VsZXJhdGlvbihbMCwgLTksIDBdKTtcclxuc2ltLmFkZE9iamVjdChib3gucGh5c2ljcyk7XHJcbm9iamVjdHNUb0RyYXcucHVzaChib3gpO1xyXG5jb25zdCBjb25zdHIgPSBuZXcgQ29uc3RyYWludChmbG9vci5waHlzaWNzLCBib3gucGh5c2ljcywgWzAsIDIwLCAwXSwgWzAsIDAsIDBdLCB7IGJpYXNGYWN0b3I6IDAuMSB9KTtcclxuY29uc3QgY29uc3RyMiA9IG5ldyBDb25zdHJhaW50KGZsb29yLnBoeXNpY3MsIGJveC5waHlzaWNzLCBbMCwgMjUsIDBdLCBbMCwgNSwgMF0sIHsgYmlhc0ZhY3RvcjogMC4xIH0pO1xyXG5jb25zdCBjb25zdHIzID0gbmV3IENvbnN0cmFpbnQoZmxvb3IucGh5c2ljcywgYm94LnBoeXNpY3MsIFswLCAyNSwgNV0sIFswLCA1LCA1XSwgeyBiaWFzRmFjdG9yOiAwLjEgfSk7XHJcbmNvbnNvbGUubG9nKGNvbnN0cik7XHJcbnNpbS5hZGRDb25zdHJhaW50cyhbY29uc3RyLCBjb25zdHIyLCBjb25zdHIzXSwgJzEnKTtcclxuY29uc3QgYm94MiA9IHsgcGh5c2ljczogbmV3IFJpZ2lkQm9keShuZXcgQm94KDUsIDUsIDUpKSwgc3ByaXRlOiBjdWJlLCB1bmlmb3JtczogeyB1X2NvbG9yOiBbMCwgMCwgMSwgMV0gfSB9O1xyXG5ib3gyLnBoeXNpY3MudHJhbnNsYXRlKFsxLCA0MCwgMF0pO1xyXG5ib3gyLnBoeXNpY3Muc2V0TWFzcyg1KTtcclxuYm94Mi5waHlzaWNzLmFkZEFjY2VsZXJhdGlvbihbMCwgLTksIDBdKTtcclxuc2ltLmFkZE9iamVjdChib3gyLnBoeXNpY3MpO1xyXG5vYmplY3RzVG9EcmF3LnB1c2goYm94Mik7XHJcbmxldCBsYXN0Q2FsbCA9IERhdGUubm93KCk7XHJcbmNvbnN0IGZwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZnBzXCIpO1xyXG5jb25zdCB0aW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0aW1lXCIpO1xyXG5jb25zdCB0aW1lMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGltZTJcIik7XHJcbmNvbnN0IG51bUl0ZXIgPSAxO1xyXG5jb25zdCBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xyXG5jb25zdCBsb29wID0gKCkgPT4ge1xyXG4gICAgcGxheWVyLnRpY2soKTtcclxuICAgIHNpbS50aWNrKDAuMDE1KTtcclxuICAgIGNvbnN0IGN1cmVudFRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgY29uc3QgZGVsdGEgPSBjdXJlbnRUaW1lIC0gbGFzdENhbGw7XHJcbiAgICBjb25zdCB0b3RhbFRpbWUgPSBjdXJlbnRUaW1lIC0gc3RhcnRUaW1lO1xyXG4gICAgZnBzLnRleHRDb250ZW50ID0gTnVtYmVyKCgxIC8gZGVsdGEpICogMTAwMCkudG9TdHJpbmcoKTtcclxuICAgIHRpbWUudGV4dENvbnRlbnQgPSBgQ29sbGlzaW9ucyA6IFxcbiR7c2ltLmJyb2FkUGhhc2VDb2xsaXNpb25zXHJcbiAgICAgICAgLm1hcCgoZSkgPT4gYCR7ZVswXX0gOiAke2VbMV0uam9pbihcIixcIil9YClcclxuICAgICAgICAuam9pbihcIlxcblwiKX1gO1xyXG4gICAgdGltZTIudGV4dENvbnRlbnQgPSBgUnVuIHRpbWUgOiAke3RvdGFsVGltZSAvIDEwMDB9YDtcclxuICAgIGxhc3RDYWxsID0gY3VyZW50VGltZTtcclxuICAgIGdsLmNsZWFyQ29sb3IoMC43LCAwLjksIDAuOSwgMSk7XHJcbiAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUIHwgZ2wuREVQVEhfQlVGRkVSX0JJVCk7XHJcbiAgICBnbC5lbmFibGUoZ2wuQ1VMTF9GQUNFKTtcclxuICAgIGdsLmVuYWJsZShnbC5ERVBUSF9URVNUKTtcclxuICAgIGNvbnN0IGNhbWVyYU1hdHJpeCA9IHBsYXllci5jYW1NYXRyaXg7XHJcbiAgICBjb25zdCB7IHRyYW5zbGF0aW9uIH0gPSBtNC5kZWNvbXBvc2UoY2FtZXJhTWF0cml4KTtcclxuICAgIGNvbnN0IHVfdmlld1dvcmxkUG9zaXRpb24gPSB0cmFuc2xhdGlvbjtcclxuICAgIG9iamVjdHNUb0RyYXcuZm9yRWFjaCgob2JqKSA9PiB7XHJcbiAgICAgICAgb2JqLnNwcml0ZS5kcmF3KE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB1bmlmb3JtcyksIHsgdV9tYXRyaXg6IG9iai5waHlzaWNzLmNvbGxpZGVyLmdldE00KCksIHVfdmlld1dvcmxkUG9zaXRpb24gfSksIG9iai51bmlmb3JtcyksIGNhbWVyYU1hdHJpeCk7XHJcbiAgICB9KTtcclxuICAgIHBvaW50LmRyYXcoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB1bmlmb3JtcyksIHsgdV9tYXRyaXg6IG00LnNjYWxpbmcoNiwgNiwgNiksIHVfY29sb3I6IFswLCAwLCAwLCAxXSwgdV92aWV3V29ybGRQb3NpdGlvbiB9KSwgY2FtZXJhTWF0cml4KTtcclxuICAgIHBvaW50LmRyYXcoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB1bmlmb3JtcyksIHsgdV9tYXRyaXg6IG00LnNjYWxlKG00LnpSb3RhdGUobTQueVJvdGF0aW9uKE1hdGguUEkpLCAtTWF0aC5QSSAvIDIpLCA2LCA2LCA2KSwgdV9jb2xvcjogWzEsIDAuMSwgMSwgMV0sIHVfdmlld1dvcmxkUG9zaXRpb24gfSksIGNhbWVyYU1hdHJpeCk7XHJcbiAgICBmb3IgKGNvbnN0IFtpZCwgbWFuaWZvbGRdIG9mIHNpbS5jb2xsaXNpb25NYW5pZm9sZHMpIHtcclxuICAgICAgICBtYW5pZm9sZC5jb250YWN0cy5mb3JFYWNoKChjb250YWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHBvaW50XHJcbiAgICAgICAgICAgICAgICAuZHJhdyhPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oeyB1X21hdHJpeDogbTQudHJhbnNsYXRpb24oLi4uY29udGFjdC5QQSksIHVfY29sb3I6IFswLjYsIDAuNiwgMC4wLCAxXSB9LCB1bmlmb3JtcyksIHsgdV92aWV3V29ybGRQb3NpdGlvbiB9KSwgY2FtZXJhTWF0cml4KVxyXG4gICAgICAgICAgICAgICAgLmRyYXcoe1xyXG4gICAgICAgICAgICAgICAgdV9tYXRyaXg6IG00LnRyYW5zbGF0aW9uKC4uLmNvbnRhY3QuUEIpLFxyXG4gICAgICAgICAgICAgICAgdV9jb2xvcjogWzAuNSwgMC4xLCAwLjIsIDFdLFxyXG4gICAgICAgICAgICB9LCBjYW1lcmFNYXRyaXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZ2wudmlld3BvcnQoMCwgMCwgZ2wuY2FudmFzLndpZHRoLCBnbC5jYW52YXMuaGVpZ2h0KTtcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcclxufTtcclxubG9vcCgpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=