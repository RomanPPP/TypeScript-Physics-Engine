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
        this.biasFactor = opt.biasFactor | 0.125;
        this.treshold = opt.treshold | 0.000005;
        this.lambdaMin = opt.lambdaMin | -Infinity;
        this.lambdaMax = opt.lambdaMax | Infinity;
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
        this.positionError = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.norm(direction);
        this.n = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(direction, 1 / this.positionError);
        return {
            deltaPA,
            deltaPB,
        };
    }
    getEquation() {
        return new _Equations__WEBPACK_IMPORTED_MODULE_1__.ConstraintEquation(this.body1, this.body2, this.ra, this.rb, this.n, this.positionError, this.biasFactor, this.lambdaMin, this.lambdaMax, this.treshold);
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
        this.biasFactor = CONTACT_BIAS;
        this.treshold = CONTACT_TRESHOLD;
        this.lambdaMin = ContactConstraint.opt.lambdaMin;
        this.lambdaMax = ContactConstraint.opt.lambdaMax;
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
        return new _Equations__WEBPACK_IMPORTED_MODULE_1__.ContactEquation(this.body1, this.body2, this.ra, this.rb, this.n, this.positionError, this.biasFactor, 0, lambdaMax, this.treshold);
    }
    getFrictionEquations() {
        return [
            new _Equations__WEBPACK_IMPORTED_MODULE_1__.FrictionEquation(this.body1, this.body2, this.ra, this.rb, romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(this.i, 1), this.positionError, this.biasFactor, -this.body1.friction - this.body2.friction, this.body1.friction + this.body2.friction, this.treshold),
            new _Equations__WEBPACK_IMPORTED_MODULE_1__.FrictionEquation(this.body1, this.body2, this.ra, this.rb, romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(this.j, 1), this.positionError, this.biasFactor, -this.body1.friction - this.body2.friction, this.body1.friction + this.body2.friction, this.treshold)
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
    constructor(body1, body2, ra, rb, n, positionError, biasFactor, lambdaMin, lambdaMax, treshold) {
        this.ra = ra;
        this.rb = rb;
        this.n = n;
        this.positionError = positionError;
        this.biasFactor = biasFactor;
        this.J = null;
        this.JM = null;
        this.B = null;
        this.body1 = body1;
        this.body2 = body2;
        this.treshold = treshold;
        this.lambdaAcc = 0;
        this.lambdaMin = lambdaMin;
        this.lambdaMax = lambdaMax;
        this.prevLambda = 0;
    }
    updateJacobian() {
        const { body1, body2, ra, rb, n } = this;
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
        const { body1, body2 } = this;
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
        const { biasFactor, treshold, body1, body2, n, ra, rb, positionError } = this;
        const relativeVelocity = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.diff(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(body2.velocity, romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.cross(body2.angularV, rb)), romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(body1.velocity, romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.cross(body1.angularV, ra)));
        const relativeVelocityNormalProjection = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.dot(relativeVelocity, n);
        this.bias =
            (biasFactor * Math.max(Math.pow(positionError, 2) - treshold, 0)) / dt -
                relativeVelocityNormalProjection;
        this.bias *= ConstraintEquation.biasMultiplier;
    }
    applyImpulse(lambda) {
        this.body1.applyImpulse(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(this.J[0], lambda), this.ra);
        this.body2.applyImpulse(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(this.J[2], lambda), this.rb);
    }
    applyPseudoImpulse(lambda) {
        this.body1.applyPseudoImpulse(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(this.J[0], lambda), this.ra);
        this.body2.applyPseudoImpulse(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.scale(this.J[2], lambda), this.rb);
    }
}
ConstraintEquation.biasMultiplier = 0.5;
class ContactEquation extends ConstraintEquation {
    updateRightPart(dt) {
        const { body1, body2, treshold, biasFactor, ra, rb, n, positionError } = this;
        const relativeVelocity = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.diff(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(body2.velocity, romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.cross(body2.angularV, rb)), romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(body1.velocity, romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.cross(body1.angularV, ra)));
        const relativeVelocityNormalProjection = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.dot(relativeVelocity, n);
        this.bias =
            (Math.max(0, positionError - treshold) / dt) * biasFactor -
                relativeVelocityNormalProjection;
    }
}
class FrictionEquation extends ConstraintEquation {
    updateRightPart() {
        const { body1, body2, ra, rb, n } = this;
        const relativeVelocity = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.diff(romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(body2.velocity, romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.cross(body2.angularV, rb)), romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.sum(body1.velocity, romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.cross(body1.angularV, ra)));
        const relativeVelocityNormalProjection = romanpppmath__WEBPACK_IMPORTED_MODULE_0__.v3.dot(relativeVelocity, n);
        this.bias = -relativeVelocityNormalProjection;
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
        const frictionSystem = new _System__WEBPACK_IMPORTED_MODULE_3__["default"]();
        const contactEquations = [];
        const frictionEquations = [];
        for (let [key, manifold] of collisionManifolds) {
            const useVelocityBias = manifold.contacts.length < 2;
            manifold.contacts.forEach((contactConstraint, _i) => {
                const contactEquation = contactConstraint.getEquation();
                contactEquation.prevLambda = contactConstraint.prevLambda;
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
        system.updateEquations(dt);
        system.generateSystem(dt);
        frictionSystem.updateEquations(dt);
        frictionSystem.generateSystem(dt);
        const lambda = system.solvePGS(dt, true);
        const len = frictionEquations.length / 2;
        for (let i = 0; i < len; i++) {
            frictionEquations[2 * i].lambdaMin *= lambda[i];
            frictionEquations[2 * i].lambdaMax *= lambda[i];
            frictionEquations[2 * i + 1].lambdaMin *= lambda[i];
            frictionEquations[2 * i + 1].lambdaMax *= lambda[i];
        }
        frictionSystem.solvePGS(dt);
        for (const [id, object] of objects) {
            object.integrateVelocities(dt);
        }
        this.objects.forEach((object) => object.updateInverseInertia());
        let ndx = 0;
        for (const [key, manifold] of this.collisionManifolds) {
            manifold.contacts.forEach((c) => {
                c.prevLambda = lambda[ndx];
                ndx++;
            });
        }
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
    constructor() {
        this.equations = [];
        this.useCache = true;
    }
    addEquations(equations) {
        this.equations.push(...equations);
    }
    generateBodyMapping() {
        const constraints = this.equations;
        const n = constraints.length;
        const bodiesMap = new Map();
        const Jmap = [];
        let counter = 0;
        for (let i = 0; i < n; i++) {
            const c = constraints[i];
            let bodyIndex1 = bodiesMap.get(c.body1.id);
            if (bodyIndex1 === undefined) {
                bodyIndex1 = counter++;
                bodiesMap.set(c.body1.id, bodyIndex1);
            }
            let bodyIndex2 = bodiesMap.get(c.body2.id);
            if (bodyIndex2 === undefined) {
                bodyIndex2 = counter++;
                bodiesMap.set(c.body2.id, bodyIndex2);
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
        console.log(this.useCache);
        if (this.useCache) {
            for (let i = 0; i < n; i++) {
                if (equations[i].prevLambda)
                    lambda0[i] = equations[i].prevLambda;
            }
        }
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
                const c = equations[i];
                const J = c._J;
                const b1 = Jmap[i * 2];
                const b2 = Jmap[i * 2 + 1];
                deltaLambda[i] = (c.bias - v6.dot(J[0], Bl[b1]) - v6.dot(J[1], Bl[b2])) / d[i];
                lambda0[i] = lambda[i];
                lambda[i] = Math.max(c.lambdaMin, Math.min(lambda0[i] + deltaLambda[i], c.lambdaMax));
                deltaLambda[i] = lambda[i] - lambda0[i];
                Bl[b1] = v6.sum(Bl[b1], v6.scale(c.B[0], deltaLambda[i]));
                Bl[b2] = v6.sum(Bl[b2], v6.scale(c.B[1], deltaLambda[i]));
            }
            if (log)
                str += `${norm(deltaLambda)}\n`;
            numIter--;
        }
        if (log)
            document.getElementById('error').textContent = `lambda error : \n${norm(deltaLambda)}`;
        _log(norm(deltaLambda));
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
    USE_CONTACT_CACHE: true
};
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
  constructor() {
    super();
    this.lastX = 0;
    this.lastY = 0;
    this.enable = false;
    this.moves = []
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

    document.addEventListener("mousemove", _);
    document.addEventListener("mousedown", down);
    document.addEventListener("mouseup", up);
    this.unsubscribe = () => {
      document.removeEventListener("mousemove", _);
      document.removeEventListener("mousedown", down);
      document.removeEventListener("mouseup", up);
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
/*!********************************!*\
  !*** ./stackNoCacheContact.ts ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var romanpppmath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! romanpppmath */ "./node_modules/romanpppmath/lib/index.js");
/* harmony import */ var romanpppgraphics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! romanpppgraphics */ "./node_modules/romanpppgraphics/lib/index.js");
/* harmony import */ var _src_misc_FreeCam__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/misc/FreeCam */ "./src/misc/FreeCam.js");
/* harmony import */ var _src_misc_keyInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/misc/keyInput */ "./src/misc/keyInput.js");
/* harmony import */ var _src_misc_mouseInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/misc/mouseInput */ "./src/misc/mouseInput.js");
/* harmony import */ var _src_physics_RigidBody__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./src/physics/RigidBody */ "./src/physics/RigidBody.ts");
/* harmony import */ var _src_physics_Simulation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./src/physics/Simulation */ "./src/physics/Simulation.ts");
/* harmony import */ var _src_physics_Collider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./src/physics/Collider */ "./src/physics/Collider.ts");





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



const sim = new _src_physics_Simulation__WEBPACK_IMPORTED_MODULE_6__["default"]();
sim.useCache = false;
const floor = { physics: new _src_physics_RigidBody__WEBPACK_IMPORTED_MODULE_5__.RigidBody(new _src_physics_Collider__WEBPACK_IMPORTED_MODULE_7__.Box(50, 5, 50)), sprite: cube, uniforms: { u_color: [1, 0, 1, 1] } };
floor.physics.setMass(99999999);
floor.physics.static = true;
floor.physics.friction = 2;
floor.physics.translate([0, -2.5, 0]);
sim.addObject(floor.physics);
let objectsToDraw = [];
objectsToDraw.push(floor);
for (let i = 0; i < 10; i++) {
    const box = { physics: new _src_physics_RigidBody__WEBPACK_IMPORTED_MODULE_5__.RigidBody(new _src_physics_Collider__WEBPACK_IMPORTED_MODULE_7__.Box(3, 3, 3)), sprite: cube, uniforms: { u_color: [0, 0, 1, 1] } };
    box.physics.translate([0, 1.5 + 3.1 * (i), 0]);
    //box.physics.translate([0,  1 + 3.01 * (i), 0]);
    box.physics.setMass(2);
    box.physics.addAcceleration([0, -9, 0]);
    sim.addObject(box.physics);
    objectsToDraw.push(box);
}
/*
const box = { physics: new RigidBody(new Sphere(5)), sprite: sphere, uniforms : {u_color : [0,0,1,1]} };
  box.physics.translate([0,5,0]);
  box.physics.setMass(2);
  box.physics.addAcceleration([0, -9, 0]);
  box.physics.addVelocity([0,0,-3])
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
    time.textContent = `Collisions : \n${sim.broadPhaseCollisions.map(e => `${e[0]} : ${e[1].join(',')}`).join('\n')}`;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixLQUFLO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixjQUFjO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDdUI7Ozs7Ozs7Ozs7Ozs7OztBQy9HdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSwyQkFBMkIsY0FBYztBQUN6QywwQkFBMEIsY0FBYztBQUN4QyxLQUFLO0FBQ0w7QUFDQSxpRUFBZSxFQUFFLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxSUk7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLHNCQUFzQixxREFBWSxDQUFDLGdEQUFPO0FBQzFDLHNCQUFzQixxREFBWSxDQUFDLGlEQUFRO0FBQzNDLHNCQUFzQixxREFBWSxDQUFDLGlEQUFRO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxpQ0FBaUM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLDBEQUEwRDtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxpQ0FBaUM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBT0U7Ozs7Ozs7Ozs7Ozs7OztBQzFWWTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCMEM7QUFDSjtBQUNSO0FBQzlCLFFBQVEsaURBQWlELEVBQUUsK0NBQU07QUFDakUsd0JBQXdCLHFEQUFZO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLG1DQUFtQztBQUNuRCw2QkFBNkIsa0RBQVEsQ0FBQyxnREFBTSxXQUFXLGtEQUFRO0FBQy9ELDBCQUEwQixrREFBUTtBQUNsQyw4QkFBOEIsa0RBQVE7QUFDdEMsWUFBWSxpREFBTyxpQkFBaUIsd0VBQStCO0FBQ25FO0FBQ0EsWUFBWSxpREFBTyxjQUFjLHdFQUErQjtBQUNoRTtBQUNBLHdCQUF3QixnREFBTTtBQUM5QjtBQUNBO0FBQ0EsNEJBQTRCLGtEQUFRO0FBQ3BDLHlCQUF5QixrREFBUTtBQUNqQyxZQUFZLGlEQUFPLGdCQUFnQix3RUFBK0I7QUFDbEU7QUFDQSxZQUFZLGlEQUFPLGFBQWEsd0VBQStCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsZ0RBQU07QUFDcEM7QUFDQTtBQUNBLDhCQUE4QixnREFBTTtBQUNwQztBQUNBO0FBQ0EsNEJBQTRCLGtEQUFRLENBQUMsaURBQU8sZ0JBQWdCLGtEQUFRO0FBQ3BFLFlBQVksaURBQU8sZ0JBQWdCLHdFQUErQjtBQUNsRTtBQUNBLHlCQUF5QixrREFBUTtBQUNqQyxZQUFZLGlEQUFPLGFBQWEsd0VBQStCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixrREFBUTtBQUNqQyx3QkFBd0IsZ0RBQU07QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdEQUFNLGdCQUFnQixrREFBUTtBQUN0RCwrQkFBK0IsMkRBQWlCLHNCQUFzQixrREFBUTtBQUM5RSx3QkFBd0IsZ0RBQU07QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsZ0RBQU0sc0JBQXNCLGtEQUFRO0FBQ2xFLCtCQUErQiwyREFBaUIsc0JBQXNCLGtEQUFRO0FBQzlFLDhCQUE4QixnREFBTTtBQUNwQztBQUNBO0FBQ0Esd0JBQXdCLGdEQUFNO0FBQzlCO0FBQ0E7QUFDQSx3QkFBd0IsZ0RBQU07QUFDOUI7QUFDQTtBQUNBLDRCQUE0QixnREFBTTtBQUNsQyxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixpREFBTztBQUMxQixtQkFBbUIsZ0RBQU07QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0RBQU0sZ0JBQWdCLGtEQUFRO0FBQ3REO0FBQ0E7QUFDQSw4QkFBOEIsZ0RBQU0sc0JBQXNCLGtEQUFRO0FBQ2xFO0FBQ0E7QUFDNkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEtIO0FBQ2lCO0FBQ0Y7QUFDWDtBQUNvQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2U7QUFDZjtBQUNBO0FBQ0Esd0JBQXdCLDZDQUFJO0FBQzVCLDhCQUE4Qiw2Q0FBSTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsNEJBQTRCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsZ0RBQWdEO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBELE9BQU87QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsaURBQUc7QUFDOUM7QUFDQSx1Q0FBdUMsd0RBQVEsK0JBQStCLDJEQUFpQjtBQUMvRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsOEJBQThCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQiwrQ0FBTTtBQUNqQztBQUNBLG1DQUFtQywrQ0FBTTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFNBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixXQUFXO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELE9BQU87QUFDeEQ7QUFDQTtBQUNBLHdFQUF3RTtBQUN4RTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDdk04QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSx3QkFBd0IsRUFBRSwrQ0FBTTtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLE9BQU87QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsNkJBQTZCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixPQUFPO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsT0FBTztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLE9BQU87QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsT0FBTztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsa0JBQWtCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBLCtFQUErRSxrQkFBa0I7QUFDakc7QUFDQSx3QkFBd0IsT0FBTztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFlBQVk7QUFDNUI7QUFDQSx3QkFBd0IsT0FBTztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELE9BQU87QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsT0FBTztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDekpvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsOENBQUk7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsV0FBVztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLE9BQU87QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsUUFBUTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLHFCQUFxQjtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLE9BQU87QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNtSjs7Ozs7Ozs7Ozs7Ozs7O0FDbEluSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxNQUFNLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNaZ0I7QUFDcUI7QUFDM0QsUUFBUSx3REFBd0QsRUFBRSw0Q0FBRTtBQUN0QztBQUM5QixRQUFRLDhDQUE4QyxFQUFFLCtDQUFNO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiw0QkFBNEI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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InNvdXJjZXMiOlsid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL2NvbXBvbmVudHMvQnVmZmVyQXR0cmlidXRlLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL2NvbXBvbmVudHMvRHJhd2VyLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL2NvbXBvbmVudHMvR0xXcmFwcGVyLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL2NvbXBvbmVudHMvR2x0ZlV0aWxzLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL2NvbXBvbmVudHMvTWVzaFJlbmRlcmVyLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL2NvbXBvbmVudHMvTW9kZWwuanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBncmFwaGljcy9saWIvY29tcG9uZW50cy9QcmltaXRpdmVSZW5kZXJlci5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcGdyYXBoaWNzL2xpYi9jb21wb25lbnRzL1ByaW1pdGl2ZXMuanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBncmFwaGljcy9saWIvY29tcG9uZW50cy9Qcm9ncmFtSW5mby5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcGdyYXBoaWNzL2xpYi9jb21wb25lbnRzL1RleHR1cmVJbmZvLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL2NvbXBvbmVudHMvYXR0cmliVHlwZVByb3BzLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL2NvbXBvbmVudHMvZW51bXMuanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBncmFwaGljcy9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBncmFwaGljcy9saWIvcmVuZGVyL3NoYWRlcnMvZGVmYXVsdC9mcmFnLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL3JlbmRlci9zaGFkZXJzL2RlZmF1bHQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBncmFwaGljcy9saWIvcmVuZGVyL3NoYWRlcnMvZGVmYXVsdC92ZXJ0LmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL3JlbmRlci9zaGFkZXJzL2luZGV4LmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL3JlbmRlci9zaGFkZXJzL3BvaW50TGlnaHQvZnJhZy5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcGdyYXBoaWNzL2xpYi9yZW5kZXIvc2hhZGVycy9wb2ludExpZ2h0L2luZGV4LmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwZ3JhcGhpY3MvbGliL3JlbmRlci9zaGFkZXJzL3BvaW50TGlnaHQvdmVydC5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcG1hdGgvbGliL09jdHJlZS5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcG1hdGgvbGliL2FhYmIuanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBtYXRoL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL25vZGVfbW9kdWxlcy9yb21hbnBwcG1hdGgvbGliL20zLmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vbm9kZV9tb2R1bGVzL3JvbWFucHBwbWF0aC9saWIvbTQuanMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9ub2RlX21vZHVsZXMvcm9tYW5wcHBtYXRoL2xpYi92My5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL3NyYy9waHlzaWNzL0NvbGxpZGVyLnRzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL3BoeXNpY3MvQ29uc3RyYWludHMudHMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9zcmMvcGh5c2ljcy9Db250YWN0TWFuaWZvbGQudHMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9zcmMvcGh5c2ljcy9FcXVhdGlvbnMudHMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9zcmMvcGh5c2ljcy9FdmVudEVtaXR0ZXIudHMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9zcmMvcGh5c2ljcy9SaWdpZEJvZHkudHMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvLi9zcmMvcGh5c2ljcy9TaW11bGF0aW9uLnRzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL3BoeXNpY3MvU3lzdGVtLnRzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL3BoeXNpY3MvVHJlZS50cyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL3NyYy9waHlzaWNzL2NsaXBwaW5nLnRzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL3BoeXNpY3MvY29uZmlnLnRzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL3BoeXNpY3MvZ2prLnRzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL21pc2MvRnJlZUNhbS5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy8uL3NyYy9taXNjL2tleUlucHV0LmpzIiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3JjL21pc2MvbW91c2VJbnB1dC5qcyIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcm9tYW5wcHBwaHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9yb21hbnBwcHBocy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3JvbWFucHBwcGhzLy4vc3RhY2tOb0NhY2hlQ29udGFjdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGTE9BVCwgRkxPQVRfTUFUMiwgRkxPQVRfTUFUMywgRkxPQVRfTUFUNCwgRkxPQVRfVkVDMiwgSU5ULCBGTE9BVF9WRUMzLCBGTE9BVF9WRUM0LCBVTlNJR05FRF9JTlQsIFVOU0lHTkVEX0lOVF9WRUMyLCBVTlNJR05FRF9JTlRfVkVDMywgVU5TSUdORURfSU5UX1ZFQzQsIElOVF9WRUMyLCBJTlRfVkVDMywgSU5UX1ZFQzQsIEJPT0wsIEJPT0xfVkVDMiwgQk9PTF9WRUMzLCBCT09MX1ZFQzQsIH0gZnJvbSBcIi4vZW51bXNcIjtcclxuY29uc3QgdHlwZUluZm8gPSB7XHJcbiAgICBbRkxPQVRfTUFUNF06IHsgc2l6ZTogNjQsIHJvd3M6IDQsIGNvbHM6IDQgfSxcclxuICAgIFtGTE9BVF9NQVQyXTogeyBzaXplOiAzMiwgcm93czogMiwgY29sczogMiB9LFxyXG4gICAgW0ZMT0FUX01BVDNdOiB7IHNpemU6IDQ4LCByb3dzOiAzLCBjb2xzOiAzIH0sXHJcbn07XHJcbmNvbnN0IGZsb2F0QXR0cmliU2V0dGVyID0gKHsgbnVtQ29tcG9uZW50cywgdHlwZSwgbG9jYXRpb24sIHN0cmlkZSwgb2Zmc2V0LCBidWZmZXIsIGdsLCBkaXZpc29yLCBub3JtYWxpemUsIH0pID0+IHtcclxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBidWZmZXIpO1xyXG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkobG9jYXRpb24pO1xyXG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihsb2NhdGlvbiwgbnVtQ29tcG9uZW50cywgdHlwZSB8fCBnbC5GTE9BVCwgbm9ybWFsaXplIHx8IGZhbHNlLCBzdHJpZGUgfHwgMCwgb2Zmc2V0IHx8IDApO1xyXG4gICAgZ2wudmVydGV4QXR0cmliRGl2aXNvcihsb2NhdGlvbiwgZGl2aXNvciB8fCAwKTtcclxufTtcclxuY29uc3QgbWF0QXR0cmliU2V0dGVyID0gKHsgbnVtQ29tcG9uZW50cywgdHlwZSwgbG9jYXRpb24sIG9mZnNldCwgYnVmZmVyLCBnbCwgZGl2aXNvciwgbm9ybWFsaXplLCBhdHRyaWJ1dGVUeXBlLCB9KSA9PiB7XHJcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgYnVmZmVyKTtcclxuICAgIGNvbnN0IHN0cmlkZSA9IHR5cGVJbmZvW2F0dHJpYnV0ZVR5cGVdLnNpemU7XHJcbiAgICBjb25zdCBjb3VudCA9IHR5cGVJbmZvW2F0dHJpYnV0ZVR5cGVdLnJvd3M7XHJcbiAgICBjb25zdCByb3dPZmZzZXQgPSBzdHJpZGUgLyBjb3VudDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGxvY2F0aW9uICsgaSk7XHJcbiAgICAgICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihsb2NhdGlvbiwgbnVtQ29tcG9uZW50cywgdHlwZSB8IGdsLkZMT0FULCBmYWxzZSwgc3RyaWRlIHwgMCwgb2Zmc2V0ICsgcm93T2Zmc2V0ICogaSk7XHJcbiAgICAgICAgZ2wudmVydGV4QXR0cmliRGl2aXNvcihsb2NhdGlvbiArIGksIGRpdmlzb3IgfHwgMCk7XHJcbiAgICB9XHJcbn07XHJcbmNvbnN0IGludEF0dHJpYlNldHRlciA9ICh7IG51bUNvbXBvbmVudHMsIHR5cGUsIGxvY2F0aW9uLCBzdHJpZGUsIG9mZnNldCwgYnVmZmVyLCBnbCwgZGl2aXNvciwgfSkgPT4ge1xyXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGJ1ZmZlcik7XHJcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShsb2NhdGlvbik7XHJcbiAgICBnbC52ZXJ0ZXhBdHRyaWJJUG9pbnRlcihsb2NhdGlvbiwgbnVtQ29tcG9uZW50cywgdHlwZSB8fCBnbC5JTlQsIHN0cmlkZSB8fCAwLCBvZmZzZXQgfHwgMCk7XHJcbiAgICBnbC52ZXJ0ZXhBdHRyaWJEaXZpc29yKGxvY2F0aW9uLCBkaXZpc29yIHx8IDApO1xyXG59O1xyXG5jb25zdCBhdHRyaWJUeXBlTWFwID0ge307XHJcbmF0dHJpYlR5cGVNYXBbSU5UXSA9IGludEF0dHJpYlNldHRlcjtcclxuYXR0cmliVHlwZU1hcFtGTE9BVF0gPSBmbG9hdEF0dHJpYlNldHRlcjtcclxuYXR0cmliVHlwZU1hcFtGTE9BVF9WRUMyXSA9IGZsb2F0QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW0ZMT0FUX1ZFQzNdID0gZmxvYXRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbRkxPQVRfVkVDNF0gPSBmbG9hdEF0dHJpYlNldHRlcjtcclxuYXR0cmliVHlwZU1hcFtGTE9BVF9NQVQyXSA9IG1hdEF0dHJpYlNldHRlcjtcclxuYXR0cmliVHlwZU1hcFtGTE9BVF9NQVQzXSA9IG1hdEF0dHJpYlNldHRlcjtcclxuYXR0cmliVHlwZU1hcFtGTE9BVF9NQVQ0XSA9IG1hdEF0dHJpYlNldHRlcjtcclxuYXR0cmliVHlwZU1hcFtVTlNJR05FRF9JTlRdID0gaW50QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW1VOU0lHTkVEX0lOVF9WRUMyXSA9IGludEF0dHJpYlNldHRlcjtcclxuYXR0cmliVHlwZU1hcFtVTlNJR05FRF9JTlRfVkVDM10gPSBpbnRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbVU5TSUdORURfSU5UX1ZFQzNdID0gaW50QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW1VOU0lHTkVEX0lOVF9WRUM0XSA9IGludEF0dHJpYlNldHRlcjtcclxuYXR0cmliVHlwZU1hcFtJTlRfVkVDMl0gPSBpbnRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbSU5UX1ZFQzNdID0gaW50QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW0lOVF9WRUM0XSA9IGludEF0dHJpYlNldHRlcjtcclxuYXR0cmliVHlwZU1hcFtCT09MXSA9IGludEF0dHJpYlNldHRlcjtcclxuYXR0cmliVHlwZU1hcFtCT09MX1ZFQzJdID0gaW50QXR0cmliU2V0dGVyO1xyXG5hdHRyaWJUeXBlTWFwW0JPT0xfVkVDM10gPSBpbnRBdHRyaWJTZXR0ZXI7XHJcbmF0dHJpYlR5cGVNYXBbQk9PTF9WRUM0XSA9IGludEF0dHJpYlNldHRlcjtcclxuY2xhc3MgQnVmZmVyQXR0cmlidXRlSW5mbyB7XHJcbiAgICBjb25zdHJ1Y3RvcihnbCwgeyBzdHJpZGUsIHR5cGUsIG9mZnNldCwgbG9jYXRpb24sIG51bUNvbXBvbmVudHMsIGF0dHJpYnV0ZVR5cGUsIGRpdmlzb3IgfSkge1xyXG4gICAgICAgIHRoaXMuZ2wgPSBnbDtcclxuICAgICAgICB0aGlzLmJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xyXG4gICAgICAgIHRoaXMuc3RyaWRlID0gc3RyaWRlIHwgMDtcclxuICAgICAgICB0aGlzLm51bUNvbXBvbmVudHMgPSBudW1Db21wb25lbnRzO1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlVHlwZSA9IGF0dHJpYnV0ZVR5cGU7XHJcbiAgICAgICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQgfCAwO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbiA9IGxvY2F0aW9uO1xyXG4gICAgICAgIHRoaXMuZGl2aXNvciA9IGRpdmlzb3I7XHJcbiAgICB9XHJcbiAgICBzZXRBdHRyaWJ1dGUoKSB7XHJcbiAgICAgICAgY29uc3QgeyBhdHRyaWJ1dGVUeXBlIH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IHNldHRlciA9IGF0dHJpYlR5cGVNYXBbYXR0cmlidXRlVHlwZV07XHJcbiAgICAgICAgc2V0dGVyKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgYnVmZmVyRGF0YShkYXRhLCB1c2FnZSA9IDB4ODhlNCkge1xyXG4gICAgICAgIGNvbnN0IHsgZ2wsIGJ1ZmZlciB9ID0gdGhpcztcclxuICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgYnVmZmVyKTtcclxuICAgICAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgZGF0YSwgdXNhZ2UpO1xyXG4gICAgfVxyXG4gICAgYWxsb2NCdWZmZXIoYnl0ZUxlbmd0aCwgdXNhZ2UgPSAweDg4ZTQpIHtcclxuICAgICAgICBjb25zdCB7IGdsLCBidWZmZXIgfSA9IHRoaXM7XHJcbiAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGJ1ZmZlcik7XHJcbiAgICAgICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIGJ5dGVMZW5ndGgsIHVzYWdlKTtcclxuICAgIH1cclxuICAgIGJ1ZmZlclN1YkRhdGEoZGF0YSwgb2Zmc2V0ID0gMCkge1xyXG4gICAgICAgIGNvbnN0IHsgZ2wsIGJ1ZmZlciB9ID0gdGhpcztcclxuICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgYnVmZmVyKTtcclxuICAgICAgICBnbC5idWZmZXJTdWJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgb2Zmc2V0LCBkYXRhKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgeyBCdWZmZXJBdHRyaWJ1dGVJbmZvIH07XHJcbiIsImltcG9ydCB7IG00IH0gZnJvbSBcInJvbWFucHBwbWF0aFwiO1xyXG5jb25zdCBkZWdUb1JhZCA9IChkKSA9PiAoZCAqIE1hdGguUEkpIC8gMTgwO1xyXG5jb25zdCBmaWVsZE9mVmlld1JhZGlhbnMgPSBkZWdUb1JhZCg5MCk7XHJcbmNsYXNzIERyYXdlciB7XHJcbiAgICBzdGF0aWMgY3JlYXRlM2RQcm9qZWN0aW9uTWF0cml4KHpOZWFyLCB6RmFyLCBjbGllbnRXaWR0aCwgY2xpZW50SGVpZ2h0KSB7XHJcbiAgICAgICAgY29uc3QgYXNwZWN0ID0gY2xpZW50V2lkdGggLyBjbGllbnRIZWlnaHQ7XHJcbiAgICAgICAgcmV0dXJuIG00LnBlcnNwZWN0aXZlKGZpZWxkT2ZWaWV3UmFkaWFucywgYXNwZWN0LCB6TmVhciwgekZhcik7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxuICAgICAgICB0aGlzLnByb2plY3Rpb25NYXRyaXggPSBudWxsO1xyXG4gICAgfVxyXG4gICAgc2V0Q29udGV4dChnbENvbnRleHRXcmFwcGVyKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gZ2xDb250ZXh0V3JhcHBlcjtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGRyYXcocHJpbWl0aXZlUmVuZGVyZXIsIHVuaWZvcm1zLCBjYW1lcmFNYXRyaXgpIHtcclxuICAgICAgICBjb25zdCB7IFZBTywgbW9kZSwgb2Zmc2V0LCBudW1FbGVtZW50cywgaW5kaWNlcywgcHJvZ3JhbUluZm8sIGNvbXBvbmVudFR5cGUsIH0gPSBwcmltaXRpdmVSZW5kZXJlcjtcclxuICAgICAgICBjb25zdCB7IHByb2plY3Rpb25NYXRyaXggfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgeyBnbCB9ID0gdGhpcy5jb250ZXh0O1xyXG4gICAgICAgIGNvbnN0IHZpZXdNYXRyaXggPSBtNC5pbnZlcnNlKGNhbWVyYU1hdHJpeCk7XHJcbiAgICAgICAgY29uc3Qgdmlld1Byb2plY3Rpb25NYXRyaXggPSBtNC5tdWx0aXBseShwcm9qZWN0aW9uTWF0cml4LCB2aWV3TWF0cml4KTtcclxuICAgICAgICBjb25zdCB1X3dvcmxkVmlld1Byb2plY3Rpb24gPSBtNC5tdWx0aXBseSh2aWV3UHJvamVjdGlvbk1hdHJpeCwgdW5pZm9ybXMudV9tYXRyaXgpO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC51c2VQcm9ncmFtSW5mbyhwcm9ncmFtSW5mbyk7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0XHJcbiAgICAgICAgICAgIC5sYXN0VXNlZFByb2dyYW1JbmZvXHJcbiAgICAgICAgICAgIC5zZXRVbmlmb3JtcyhPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHVuaWZvcm1zKSwgeyB1X3dvcmxkVmlld1Byb2plY3Rpb24gfSkpO1xyXG4gICAgICAgIGdsLmJpbmRWZXJ0ZXhBcnJheShWQU8pO1xyXG4gICAgICAgIGlmICghaW5kaWNlcykge1xyXG4gICAgICAgICAgICBnbC5kcmF3QXJyYXlzKG1vZGUsIG9mZnNldCwgbnVtRWxlbWVudHMpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdsLmRyYXdFbGVtZW50cyhtb2RlLCBudW1FbGVtZW50cywgY29tcG9uZW50VHlwZSwgb2Zmc2V0KTtcclxuICAgIH1cclxuICAgIGRyYXdJbnN0YW5jZWQocHJpbWl0aXZlUmVuZGVyZXIsIHVuaWZvcm1zLCBjYW1lcmFNYXRyaXgsIG51bUluc3RhbmNlcykge1xyXG4gICAgICAgIGNvbnN0IHsgVkFPLCBtb2RlLCBvZmZzZXQsIG51bUVsZW1lbnRzLCBpbmRpY2VzLCBwcm9ncmFtSW5mbywgY29tcG9uZW50VHlwZSwgfSA9IHByaW1pdGl2ZVJlbmRlcmVyO1xyXG4gICAgICAgIGNvbnN0IHsgcHJvamVjdGlvbk1hdHJpeCB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCB7IGdsIH0gPSB0aGlzLmNvbnRleHQ7XHJcbiAgICAgICAgY29uc3Qgdmlld01hdHJpeCA9IG00LmludmVyc2UoY2FtZXJhTWF0cml4KTtcclxuICAgICAgICBjb25zdCB2aWV3UHJvamVjdGlvbk1hdHJpeCA9IG00Lm11bHRpcGx5KHByb2plY3Rpb25NYXRyaXgsIHZpZXdNYXRyaXgpO1xyXG4gICAgICAgIGNvbnN0IHdvcmxkVmlld1Byb2plY3Rpb24gPSBtNC5tdWx0aXBseSh2aWV3UHJvamVjdGlvbk1hdHJpeCwgdW5pZm9ybXMudV9tYXRyaXgpO1xyXG4gICAgICAgIGNvbnN0IHdvcmxkTWF0cml4ID0gdW5pZm9ybXMudV9tYXRyaXg7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnVzZVByb2dyYW1JbmZvKHByb2dyYW1JbmZvKTtcclxuICAgICAgICB0aGlzLmNvbnRleHQuXHJcbiAgICAgICAgICAgIGxhc3RVc2VkUHJvZ3JhbUluZm9cclxuICAgICAgICAgICAgLnNldFVuaWZvcm1zKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdW5pZm9ybXMpLCB7IHdvcmxkTWF0cml4LCB3b3JsZFZpZXdQcm9qZWN0aW9uIH0pKTtcclxuICAgICAgICBnbC5iaW5kVmVydGV4QXJyYXkoVkFPKTtcclxuICAgICAgICBpZiAoIWluZGljZXMpIHtcclxuICAgICAgICAgICAgZ2wuZHJhd0FycmF5c0luc3RhbmNlZChtb2RlLCBvZmZzZXQsIG51bUVsZW1lbnRzLCBudW1JbnN0YW5jZXMpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdsLmRyYXdFbGVtZW50c0luc3RhbmNlZChtb2RlLCBudW1FbGVtZW50cywgZ2wuVU5TSUdORURfU0hPUlQsIG9mZnNldCwgbnVtSW5zdGFuY2VzKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBEcmF3ZXI7XHJcbiIsImltcG9ydCB7IFRleHR1cmVJbmZvIH0gZnJvbSBcIi4vVGV4dHVyZUluZm9cIjtcclxuaW1wb3J0IFByaW1pdGl2ZVJlbmRlcmVyIGZyb20gXCIuL1ByaW1pdGl2ZVJlbmRlcmVyXCI7XHJcbmltcG9ydCBEcmF3ZXIgZnJvbSBcIi4vRHJhd2VyXCI7XHJcbmltcG9ydCB7IFByb2dyYW1JbmZvIH0gZnJvbSBcIi4vUHJvZ3JhbUluZm9cIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR0xXcmFwcGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKGdsKSB7XHJcbiAgICAgICAgdGhpcy5Qcm9ncmFtSW5mbyA9ICgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gY2xhc3MgZXh0ZW5kcyBQcm9ncmFtSW5mbyB7XHJcbiAgICAgICAgICAgICAgICBjb25zdHJ1Y3Rvcih2ZXJ0ZXhTaGFkZXJTb3VyY2UsIGZyYWdtZW50U2hhZGVyU291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VwZXIoc2VsZiwgdmVydGV4U2hhZGVyU291cmNlLCBmcmFnbWVudFNoYWRlclNvdXJjZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSkoKTtcclxuICAgICAgICB0aGlzLlByaW1pdGl2ZVJlbmRlcmVyID0gKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHJldHVybiBjbGFzcyBleHRlbmRzIFByaW1pdGl2ZVJlbmRlcmVyIHtcclxuICAgICAgICAgICAgICAgIHN0YXRpYyBmcm9tQXJyYXlEYXRhKGFycmF5RGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByaW1pdGl2ZVJlbmRlcmVyID0gbmV3IFByaW1pdGl2ZVJlbmRlcmVyKHNlbGYuZ2wpO1xyXG4gICAgICAgICAgICAgICAgICAgIHByaW1pdGl2ZVJlbmRlcmVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jcmVhdGVWQU8oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY3JlYXRlR2VvbWV0cnlCdWZmZXJzKGFycmF5RGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNldEF0dHJpYnV0ZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJpbWl0aXZlUmVuZGVyZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdXBlcihzZWxmLmdsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KSgpO1xyXG4gICAgICAgIHRoaXMuRHJhd2VyID0gKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHJldHVybiBjbGFzcyBleHRlbmRzIERyYXdlciB7XHJcbiAgICAgICAgICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdXBlcihzZWxmKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KSgpO1xyXG4gICAgICAgIHRoaXMuVGV4dHVyZUluZm8gPSAoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuIGNsYXNzIGV4dGVuZHMgVGV4dHVyZUluZm8ge1xyXG4gICAgICAgICAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VwZXIoc2VsZi5nbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSkoKTtcclxuICAgICAgICBpZiAoIWdsKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHdlYmdsIVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nbCA9IGdsO1xyXG4gICAgICAgIHRoaXMucHJvZ3JhbXMgPSB7fTtcclxuICAgIH1cclxuICAgIC8qXHJcbiAgICBnZXRMYXN0VXNlZFByb2dyYW1JbmZvKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJDYWNoZS5sYXN0VXNlZFByb2dyYW1JbmZvO1xyXG4gICAgfVxyXG4gICAgc2V0TGFzdFVzZWRQcm9ncmFtKHByb2dyYW1JbmZvKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyQ2FjaGUubGFzdFVzZWRQcm9ncmFtSW5mbyA9IHByb2dyYW1JbmZvO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgICovXHJcbiAgICB1c2VQcm9ncmFtSW5mbyhwcm9ncmFtSW5mbykge1xyXG4gICAgICAgIGlmIChwcm9ncmFtSW5mbyAhPSB0aGlzLmxhc3RVc2VkUHJvZ3JhbUluZm8pIHtcclxuICAgICAgICAgICAgdGhpcy5nbC51c2VQcm9ncmFtKHByb2dyYW1JbmZvLnByb2dyYW0pO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RVc2VkUHJvZ3JhbUluZm8gPSBwcm9ncmFtSW5mbztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICByZXNpemVDYW52YXNUb0Rpc3BsYXlTaXplKG11bHRpcGxpZXIgPSAxKSB7XHJcbiAgICAgICAgY29uc3QgY2FudmFzID0gdGhpcy5nbC5jYW52YXM7XHJcbiAgICAgICAgY29uc3Qgd2lkdGggPSAoY2FudmFzLmNsaWVudFdpZHRoICogbXVsdGlwbGllcikgfCAwO1xyXG4gICAgICAgIGNvbnN0IGhlaWdodCA9IChjYW52YXMuY2xpZW50SGVpZ2h0ICogbXVsdGlwbGllcikgfCAwO1xyXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICByZXNpemVDYW52YXMod2lkdGgsIGhlaWdodCkge1xyXG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuZ2wuY2FudmFzO1xyXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBzZXRWaWV3cG9ydCgpIHtcclxuICAgICAgICB0aGlzLmdsLnZpZXdwb3J0KDAsIDAsIHRoaXMuZ2wuY2FudmFzLndpZHRoLCB0aGlzLmdsLmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgZ2V0Q29udGV4dCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nbDtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgUHJpbWl0aXZlUmVuZGVyZXIgZnJvbSBcIi4vUHJpbWl0aXZlUmVuZGVyZXJcIjtcclxuaW1wb3J0IHsgTWVzaFJlbmRlcmVyIH0gZnJvbSBcIi4vTWVzaFJlbmRlcmVyXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVNldHRlciwgQnVmZmVyQ29udHJvbGxlciB9IGZyb20gXCIuL0J1ZmZlckF0dHJpYnV0ZVwiO1xyXG5pbXBvcnQgeyBOVU1fQ09NUE9ORU5UUywgVFlQRURfQVJSQVlTLCBMT0NBVElPTlMgfSBmcm9tIFwiLi9lbnVtc1wiO1xyXG4vLy8gVE9ETyAvLy9cclxuY29uc3QgQXJyYXlEYXRhRnJvbUdsdGYgPSAoZ2x0ZiwgYnVmZmVycykgPT4ge1xyXG4gICAgY29uc3QgeyBidWZmZXJWaWV3cywgYWNjZXNzb3JzLCBtZXNoZXMsIG5vZGVzIH0gPSBnbHRmO1xyXG4gICAgY29uc3QgYXR0cmliRGF0YUZyb21BY2Nlc3NvciA9IChhY2Nlc3NvcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGJ1ZmZlclZpZXcgPSBidWZmZXJWaWV3c1thY2Nlc3Nvci5idWZmZXJWaWV3XTtcclxuICAgICAgICBjb25zdCB7IGNvdW50LCBjb21wb25lbnRUeXBlLCB0eXBlIH0gPSBhY2Nlc3NvcjtcclxuICAgICAgICBjb25zdCBieXRlT2Zmc2V0ID0gYWNjZXNzb3IuYnl0ZU9mZnNldCB8fCAwO1xyXG4gICAgICAgIGNvbnN0IHsgYnl0ZUxlbmd0aCwgdGFyZ2V0IH0gPSBidWZmZXJWaWV3O1xyXG4gICAgICAgIGNvbnN0IHN0cmlkZSA9IGJ1ZmZlclZpZXcuYnl0ZVN0cmlkZSB8fCAwO1xyXG4gICAgICAgIGNvbnN0IGJ1ZmZlclZpZXdCeXRlT2Zmc2V0ID0gYnVmZmVyVmlldy5ieXRlT2Zmc2V0IHx8IDA7XHJcbiAgICAgICAgY29uc3QgYnVmZmVyID0gYnVmZmVyc1tidWZmZXJWaWV3LmJ1ZmZlcl07XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGF0YTogbmV3IFVpbnQ4QXJyYXkoYnVmZmVyLCBidWZmZXJWaWV3Qnl0ZU9mZnNldCwgYnl0ZUxlbmd0aCksXHJcbiAgICAgICAgICAgIG51bUNvbXBvbmVudHM6IE5VTV9DT01QT05FTlRTW3R5cGVdLFxyXG4gICAgICAgICAgICBzdHJpZGUsXHJcbiAgICAgICAgICAgIGJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgIGxvY2F0aW9uOiBudWxsLFxyXG4gICAgICAgICAgICBjb3VudCxcclxuICAgICAgICAgICAgdHlwZTogY29tcG9uZW50VHlwZSxcclxuICAgICAgICAgICAgb2Zmc2V0OiBieXRlT2Zmc2V0IHx8IDAsXHJcbiAgICAgICAgICAgIGNvbXBvbmVudFR5cGU6IGFjY2Vzc29yLmNvbXBvbmVudFR5cGUsXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICBjb25zdCBfbWVzaGVzID0gbWVzaGVzLm1hcCgobWVzaCkgPT4gKHtcclxuICAgICAgICBwcmltaXRpdmVzOiBtZXNoLnByaW1pdGl2ZXMubWFwKChfcHJpbWl0aXZlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByaW1pdGl2ZSA9IHtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHt9LFxyXG4gICAgICAgICAgICAgICAgbW9kZTogX3ByaW1pdGl2ZS5tb2RlLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZiAoX3ByaW1pdGl2ZS5oYXNPd25Qcm9wZXJ0eShcImluZGljZXNcIikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGluZGljZXNJbmZvID0gYXR0cmliRGF0YUZyb21BY2Nlc3NvcihhY2Nlc3NvcnNbX3ByaW1pdGl2ZS5pbmRpY2VzXSk7XHJcbiAgICAgICAgICAgICAgICBwcmltaXRpdmUuaW5kaWNlcyA9IGluZGljZXNJbmZvLmRhdGE7XHJcbiAgICAgICAgICAgICAgICBwcmltaXRpdmUubnVtRWxlbWVudHMgPSBpbmRpY2VzSW5mby5jb3VudDtcclxuICAgICAgICAgICAgICAgIHByaW1pdGl2ZS5jb21wb25lbnRUeXBlID0gaW5kaWNlc0luZm8uY29tcG9uZW50VHlwZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhfcHJpbWl0aXZlLmF0dHJpYnV0ZXMpLmZvckVhY2goKGF0dHJpYk5hbWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZSA9IF9wcmltaXRpdmUuYXR0cmlidXRlc1thdHRyaWJOYW1lXTtcclxuICAgICAgICAgICAgICAgIHByaW1pdGl2ZS5hdHRyaWJ1dGVzW2F0dHJpYk5hbWVdID0gYXR0cmliRGF0YUZyb21BY2Nlc3NvcihhY2Nlc3NvcnNbYXR0cmlidXRlXSk7XHJcbiAgICAgICAgICAgICAgICAvL2lmKGF0dHJpYk5hbWUgPT09ICdKT0lOVFNfMCcpIF9wcmltaXRpdmUuYXR0cmlidXRlc1thdHRyaWJOYW1lXS5kYXRhID0gbmV3IFVpbnQzMkFycmF5KF9wcmltaXRpdmUuYXR0cmlidXRlc1thdHRyaWJOYW1lXS5kYXRhKVxyXG4gICAgICAgICAgICAgICAgcHJpbWl0aXZlLmF0dHJpYnV0ZXNbYXR0cmliTmFtZV0ubG9jYXRpb24gPSBMT0NBVElPTlNbYXR0cmliTmFtZV07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcHJpbWl0aXZlO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIG5hbWU6IG1lc2gubmFtZSxcclxuICAgIH0pKTtcclxuICAgIHJldHVybiBfbWVzaGVzLm1hcCgobWVzaCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHByaW1pdGl2ZXMgPSBtZXNoLnByaW1pdGl2ZXMubWFwKChwcmltaXRpdmUpID0+IG5ldyBQcmltaXRpdmVSZW5kZXJlcihwcmltaXRpdmUpKTtcclxuICAgICAgICBjb25zdCBuYW1lID0gbWVzaC5uYW1lO1xyXG4gICAgICAgIHJldHVybiBuZXcgTWVzaFJlbmRlcmVyKHsgcHJpbWl0aXZlcywgbmFtZSB9KTtcclxuICAgIH0pO1xyXG59O1xyXG5jb25zdCBQcmltaXRpdmVSZW5kZXJJbmZvRnJvbUFycmF5RGF0YSA9IChtZXNoZXMpID0+IG1lc2hlcy5tYXAoKG1lc2gpID0+IHtcclxuICAgIGNvbnN0IHByaW1pdGl2ZXMgPSBtZXNoLnByaW1pdGl2ZXMubWFwKChwcmltaXRpdmUpID0+IG5ldyBQcmltaXRpdmVSZW5kZXJlcihwcmltaXRpdmUpKTtcclxuICAgIGNvbnN0IG5hbWUgPSBtZXNoLm5hbWU7XHJcbiAgICByZXR1cm4gbmV3IE1lc2hSZW5kZXJlcih7IG5hbWUsIHByaW1pdGl2ZXMgfSk7XHJcbn0pO1xyXG5jb25zdCBFbnRpdHlEYXRhRnJvbUdsdGYgPSAoZ2x0ZiwgYnVmZmVycykgPT4gUHJpbWl0aXZlUmVuZGVySW5mb0Zyb21BcnJheURhdGEoQXJyYXlEYXRhRnJvbUdsdGYoZ2x0ZiwgYnVmZmVycykpO1xyXG5jbGFzcyBHTFRGIHtcclxuICAgIGNvbnN0cnVjdG9yKGdsdGYsIGJpbmFyeUJ1ZmZlcnMpIHtcclxuICAgICAgICBjb25zdCB7IG5vZGVzIH0gPSBnbHRmO1xyXG4gICAgICAgIHRoaXMubm9kZXMgPSBub2RlcztcclxuICAgICAgICB0aGlzLm1lc2hlcyA9IEFycmF5RGF0YUZyb21HbHRmKGdsdGYsIGJpbmFyeUJ1ZmZlcnMpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7IEFycmF5RGF0YUZyb21HbHRmLCBQcmltaXRpdmVSZW5kZXJJbmZvRnJvbUFycmF5RGF0YSwgRW50aXR5RGF0YUZyb21HbHRmLCBHTFRGLCB9O1xyXG4iLCJpbXBvcnQgZ2V0QXR0cmlidXRlUHJvcHNCeVR5cGUgZnJvbSBcIi4vYXR0cmliVHlwZVByb3BzXCI7XHJcbmltcG9ydCBhdHRyaWJUeXBlUHJvcHMgZnJvbSBcIi4vYXR0cmliVHlwZVByb3BzXCI7XHJcbmltcG9ydCB7IEJ1ZmZlckF0dHJpYnV0ZSB9IGZyb20gXCIuL0J1ZmZlckF0dHJpYnV0ZVwiO1xyXG5jbGFzcyBNZXNoUmVuZGVyZXIge1xyXG4gICAgY29uc3RydWN0b3IoeyBwcmltaXRpdmVzLCBuYW1lIH0pIHtcclxuICAgICAgICB0aGlzLnByaW1pdGl2ZXMgPSBwcmltaXRpdmVzO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmJ1ZmZlcnMgPSB7fTtcclxuICAgIH1cclxuICAgIGRyYXcodW5pZm9ybXMsIGNhbWVyYU1hdHJpeCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gdGhpcy5wcmltaXRpdmVzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnByaW1pdGl2ZXNbaV0uZHJhdyh1bmlmb3JtcywgY2FtZXJhTWF0cml4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBkcmF3SW5zdGFuY2VkKHVuaWZvcm1zLCBjYW1lcmFNYXRyaXgsIG51bUluc3RhbmNlcykge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gdGhpcy5wcmltaXRpdmVzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnByaW1pdGl2ZXNbaV0uZHJhd0luc3RhbmNlZCh1bmlmb3JtcywgY2FtZXJhTWF0cml4LCBudW1JbnN0YW5jZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG5jbGFzcyBTa2lubmVkTWVzaFJlbmRlcmVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHByaW1pdGl2ZXMsIHNraW4pIHtcclxuICAgICAgICB0aGlzLnByaW1pdGl2ZXMgPSBwcmltaXRpdmVzO1xyXG4gICAgICAgIHRoaXMuc2tpbiA9IHNraW47XHJcbiAgICB9XHJcbiAgICBkcmF3KHVuaWZvcm1zLCBjYW1lcmFNYXRyaXgpIHtcclxuICAgICAgICB0aGlzLnNraW4udXBkYXRlKHVuaWZvcm1zLnVfbWF0cml4KTtcclxuICAgICAgICBjb25zdCBfdW5pZm9ybXMgPSBPYmplY3QuYXNzaWduKHsgdV9qb2ludFRleHR1cmU6IHRoaXMuc2tpbi5qb2ludFRleHR1cmUsIHVfbnVtSm9pbnRzOiB0aGlzLnNraW4uam9pbnRzLmxlbmd0aCB9LCB1bmlmb3Jtcyk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSB0aGlzLnByaW1pdGl2ZXMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJpbWl0aXZlc1tpXS5kcmF3KF91bmlmb3JtcywgY2FtZXJhTWF0cml4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IHsgTWVzaFJlbmRlcmVyLCBTa2lubmVkTWVzaFJlbmRlcmVyIH07XHJcbiIsImNsYXNzIFRSUyB7XHJcbiAgICBjb25zdHJ1Y3Rvcih0cmFuc2xhdGlvbiwgcm90YXRpb24sIHNjYWxlKSB7XHJcbiAgICAgICAgdGhpcy50cmFuc2xhdGlvbiA9IHRyYW5zbGF0aW9uO1xyXG4gICAgICAgIHRoaXMucm90YXRpb24gPSByb3RhdGlvbjtcclxuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XHJcbiAgICB9XHJcbiAgICBnZXRNYXRyaXgobSkge1xyXG4gICAgICAgIGxldCBkc3QgPSBtIHx8IG00LmlkZW50aXR5KCk7XHJcbiAgICAgICAgdmFyIHQgPSB0aGlzLnRyYW5zbGF0aW9uO1xyXG4gICAgICAgIHZhciByID0gdGhpcy5yb3RhdGlvbjtcclxuICAgICAgICB2YXIgcyA9IHRoaXMuc2NhbGU7XHJcbiAgICAgICAgY29uc3Qgc2luID0gTWF0aC5zaW4oclszXSAvIDIpO1xyXG4gICAgICAgIGNvbnN0IGNvcyA9IE1hdGguY29zKHJbM10gLyAyKTtcclxuICAgICAgICBkc3QgPSBtNC50cmFuc2xhdGUoZHN0LCB0WzBdLCB0WzFdLCB0WzJdKTtcclxuICAgICAgICBkc3QgPSBtNC5tdWx0aXBseShkc3QsIG00LmZyb21RdWF0ZXJuaW9uKHIpKTtcclxuICAgICAgICBkc3QgPSBtNC5zY2FsZShkc3QsIHNbMF0sIHNbMV0sIHNbMl0pO1xyXG4gICAgICAgIHJldHVybiBkc3Q7XHJcbiAgICB9XHJcbiAgICBnZXRSTWF0cml4KCkge1xyXG4gICAgICAgIGxldCBkc3QgPSBtNC5pZGVudGl0eSgpO1xyXG4gICAgICAgIHZhciByID0gdGhpcy5yb3RhdGlvbjtcclxuICAgICAgICBkc3QgPSBtNC54Um90YXRlKGRzdCwgclswXSk7XHJcbiAgICAgICAgZHN0ID0gbTQueVJvdGF0ZShkc3QsIHJbMV0pO1xyXG4gICAgICAgIGRzdCA9IG00LnpSb3RhdGUoZHN0LCByWzJdKTtcclxuICAgICAgICByZXR1cm4gZHN0O1xyXG4gICAgfVxyXG4gICAgZ2V0VFJtYXRyaXgoKSB7XHJcbiAgICAgICAgY29uc3QgdCA9IHRoaXMudHJhbnNsYXRpb247XHJcbiAgICAgICAgY29uc3QgciA9IHRoaXMucm90YXRpb247XHJcbiAgICAgICAgbGV0IG0gPSBtNC50cmFuc2xhdGlvbih0WzBdLCB0WzFdLCB0WzJdKTtcclxuICAgICAgICBtID0gbTQueFJvdGF0ZShtLCByWzBdKTtcclxuICAgICAgICBtID0gbTQueVJvdGF0ZShtLCByWzFdKTtcclxuICAgICAgICBtID0gbTQuelJvdGF0ZShtLCByWzJdKTtcclxuICAgICAgICByZXR1cm4gbTtcclxuICAgIH1cclxufVxyXG5jbGFzcyBOb2RlIHtcclxuICAgIHN0YXRpYyBtYWtlTW9kZWwoZW50aXR5RGVzY3JpcHRpb24sIHJvb3ROb2RlTmR4KSB7XHJcbiAgICAgICAgY29uc3QgeyBub2RlcywgbWVzaGVzIH0gPSBlbnRpdHlEZXNjcmlwdGlvbjtcclxuICAgICAgICBjb25zdCByb290Tm9kZSA9IG5vZGVzW3Jvb3ROb2RlTmR4XTtcclxuICAgICAgICBjb25zdCBtYWtlTm9kZSA9IChub2RlRGVzY3JpcHRpb24sIG5keCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0cnMgPSBuZXcgVFJTKG5vZGVEZXNjcmlwdGlvbi50cmFuc2xhdGlvbiB8fCBbMCwgMCwgMF0sIG5vZGVEZXNjcmlwdGlvbi5yb3RhdGlvbiB8fCBbMCwgMCwgMF0sIG5vZGVEZXNjcmlwdGlvbi5zY2FsZSB8fCBbMSwgMSwgMV0pO1xyXG4gICAgICAgICAgICBjb25zdCBub2RlID0gbmV3IE5vZGUobm9kZURlc2NyaXB0aW9uLm5hbWUsIHRycywgbmR4KTtcclxuICAgICAgICAgICAgaWYgKG5vZGVEZXNjcmlwdGlvbi5tZXNoICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5yZW5kZXJlciA9IG1lc2hlc1tub2RlRGVzY3JpcHRpb24ubWVzaF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5vZGVEZXNjcmlwdGlvbi5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgbm9kZURlc2NyaXB0aW9uLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkTmR4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBtYWtlTm9kZShub2Rlc1tjaGlsZE5keF0sIGNoaWxkTmR4KTtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5zZXRQYXJlbnQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBtYWtlTm9kZShyb290Tm9kZSwgcm9vdE5vZGVOZHgpO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IobmFtZSwgdHJzID0gbmV3IFRSUygpKSB7XHJcbiAgICAgICAgdGhpcy53b3JsZE1hdHJpeCA9IG00LmlkZW50aXR5KCk7XHJcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcclxuICAgICAgICB0aGlzLnRycyA9IHRycztcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMucGFydHMgPSBbXTtcclxuICAgICAgICB0aGlzLm5keCA9IG5keDtcclxuICAgICAgICB0aGlzLnNraW5OZHggPSBudWxsO1xyXG4gICAgICAgIHRoaXMub2JqZWN0c1RvRHJhdyA9IFtdO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgc2V0UGFyZW50KHBhcmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBhcmVudCkge1xyXG4gICAgICAgICAgICBjb25zdCBuZHggPSB0aGlzLnBhcmVudC5jaGlsZHJlbi5pbmRleE9mKHRoaXMpO1xyXG4gICAgICAgICAgICBpZiAobmR4ID49IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50LmNoaWxkcmVuLnNwbGljZShuZHgsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYXJlbnQpIHtcclxuICAgICAgICAgICAgcGFyZW50LmNoaWxkcmVuLnB1c2godGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xyXG4gICAgfVxyXG4gICAgdXBkYXRlV29ybGRNYXRyaXgocGFyZW50V29ybGRNYXRyaXgpIHtcclxuICAgICAgICBsZXQgbWF0cml4ID0gdGhpcy50cnMuZ2V0TWF0cml4KCk7XHJcbiAgICAgICAgaWYgKHBhcmVudFdvcmxkTWF0cml4KSB7XHJcbiAgICAgICAgICAgIG1hdHJpeCA9IG00Lm11bHRpcGx5KHBhcmVudFdvcmxkTWF0cml4LCBtYXRyaXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLndvcmxkTWF0cml4ID0gbWF0cml4O1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcclxuICAgICAgICAgICAgY2hpbGQudXBkYXRlV29ybGRNYXRyaXgobWF0cml4KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHVwZGF0ZVBhcnRzTGlzdCgpIHtcclxuICAgICAgICBjb25zdCBpdGVyID0gKG5vZGUsIGFycikgPT4ge1xyXG4gICAgICAgICAgICBhcnIucHVzaChub2RlKTtcclxuICAgICAgICAgICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4gaXRlcihjaGlsZCwgYXJyKSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpdGVyKHRoaXMsIHRoaXMucGFydHMpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlT2JqZWN0c1RvRHJhdygpIHtcclxuICAgICAgICBjb25zdCBxdWV1ZSA9IFt0aGlzXTtcclxuICAgICAgICB3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjb25zdCBub2RlID0gcXVldWUucG9wKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5vZGUpO1xyXG4gICAgICAgICAgICBpZiAobm9kZS5yZW5kZXJlcilcclxuICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0c1RvRHJhdy5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgICBpZiAobm9kZS5jaGlsZHJlbilcclxuICAgICAgICAgICAgICAgIHF1ZXVlLnB1c2goLi4ubm9kZS5jaGlsZHJlbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdHJhdmVyc2UoZm4pIHtcclxuICAgICAgICBmbih0aGlzKTtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiBjaGlsZC50cmF2ZXJzZShmbikpO1xyXG4gICAgfVxyXG4gICAgZmluZChuZHgpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcclxuICAgICAgICBjb25zdCBpdGVyID0gKG5vZGVzKSA9PiB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IG5vZGUgb2Ygbm9kZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChub2RlLm5keCA9PT0gbmR4KVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IG5vZGU7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlcihub2RlLmNoaWxkcmVuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaXRlcihbdGhpc10pO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBmaW5kQnlOYW1lKG5hbWUpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcclxuICAgICAgICBjb25zdCBpdGVyID0gKG5vZGVzKSA9PiB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IG5vZGUgb2Ygbm9kZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChub2RlLm5hbWUgPT09IG5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gbm9kZTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBpdGVyKG5vZGUuY2hpbGRyZW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpdGVyKFt0aGlzXSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHJlbmRlcih1bmlmb3JtcywgY2FtZXJhTWF0cml4KSB7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzVG9EcmF3LmZvckVhY2goKG9iamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBvYmplY3QucmVuZGVyZXIuZHJhdyhPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHVuaWZvcm1zKSwgeyB1X21hdHJpeDogb2JqZWN0LndvcmxkTWF0cml4IH0pLCBjYW1lcmFNYXRyaXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmNsYXNzIE1vZGVsIGV4dGVuZHMgTm9kZSB7XHJcbiAgICBzdGF0aWMgbWFrZU1vZGVsKGVudGl0eURlc2NyaXB0aW9uLCByb290Tm9kZU5keCkge1xyXG4gICAgICAgIGNvbnN0IHsgbm9kZXMsIG1lc2hlcyB9ID0gZW50aXR5RGVzY3JpcHRpb247XHJcbiAgICAgICAgY29uc3Qgcm9vdE5vZGUgPSBub2Rlc1tyb290Tm9kZU5keF07XHJcbiAgICAgICAgY29uc3QgbWFrZU5vZGUgPSAobm9kZURlc2NyaXB0aW9uLCBuZHgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdHJzID0gbmV3IFRSUyhub2RlRGVzY3JpcHRpb24udHJhbnNsYXRpb24gfHwgWzAsIDAsIDBdLCBub2RlRGVzY3JpcHRpb24ucm90YXRpb24gfHwgWzAsIDAsIDAsIDBdLCBub2RlRGVzY3JpcHRpb24uc2NhbGUgfHwgWzEsIDEsIDFdKTtcclxuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IG5ldyBFbnRpdHkobm9kZURlc2NyaXB0aW9uLm5hbWUsIHRycywgbmR4KTtcclxuICAgICAgICAgICAgaWYgKG5vZGVEZXNjcmlwdGlvbi5tZXNoICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5yZW5kZXJlciA9IG1lc2hlc1tub2RlRGVzY3JpcHRpb24ubWVzaF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5vZGVEZXNjcmlwdGlvbi5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgbm9kZURlc2NyaXB0aW9uLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkTmR4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBtYWtlTm9kZShub2Rlc1tjaGlsZE5keF0sIGNoaWxkTmR4KTtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5zZXRQYXJlbnQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBtYWtlTm9kZShyb290Tm9kZSwgcm9vdE5vZGVOZHgpO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IobmFtZSwgdHJzLCBuZHgpIHtcclxuICAgICAgICBzdXBlcihuYW1lLCB0cnMpO1xyXG4gICAgICAgIHRoaXMubmR4ID0gbmR4O1xyXG4gICAgICAgIHRoaXMucGh5c2ljcyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5za2luTmR4ID0gbnVsbDtcclxuICAgICAgICB0aGlzLm9iamVjdHNUb0RyYXcgPSBbXTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyID0gbnVsbDtcclxuICAgIH1cclxuICAgIHVwZGF0ZU9iamVjdHNUb0RyYXcoKSB7XHJcbiAgICAgICAgY29uc3QgcXVldWUgPSBbdGhpc107XHJcbiAgICAgICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHF1ZXVlLnBvcCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhub2RlKTtcclxuICAgICAgICAgICAgaWYgKG5vZGUucmVuZGVyZXIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9iamVjdHNUb0RyYXcucHVzaChub2RlKTtcclxuICAgICAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW4pXHJcbiAgICAgICAgICAgICAgICBxdWV1ZS5wdXNoKC4uLm5vZGUuY2hpbGRyZW4pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHRyYXZlcnNlKGZuKSB7XHJcbiAgICAgICAgZm4odGhpcyk7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4gY2hpbGQudHJhdmVyc2UoZm4pKTtcclxuICAgIH1cclxuICAgIGZpbmQobmR4KSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgY29uc3QgaXRlciA9IChub2RlcykgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBub2RlIG9mIG5vZGVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5uZHggPT09IG5keClcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBub2RlO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZXIobm9kZS5jaGlsZHJlbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGl0ZXIoW3RoaXNdKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgZmluZEJ5TmFtZShuYW1lKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgY29uc3QgaXRlciA9IChub2RlcykgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBub2RlIG9mIG5vZGVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5uYW1lID09PSBuYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IG5vZGU7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlcihub2RlLmNoaWxkcmVuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaXRlcihbdGhpc10pO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICByZW5kZXIodW5pZm9ybXMsIGNhbWVyYU1hdHJpeCkge1xyXG4gICAgICAgIHRoaXMub2JqZWN0c1RvRHJhdy5mb3JFYWNoKChvYmplY3QpID0+IHtcclxuICAgICAgICAgICAgb2JqZWN0LnJlbmRlcmVyLmRyYXcoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB1bmlmb3JtcyksIHsgdV9tYXRyaXg6IG9iamVjdC53b3JsZE1hdHJpeCB9KSwgY2FtZXJhTWF0cml4KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBNb2RlbDtcclxuIiwiaW1wb3J0IHsgQnVmZmVyQXR0cmlidXRlSW5mbyB9IGZyb20gXCIuL0J1ZmZlckF0dHJpYnV0ZVwiO1xyXG5jbGFzcyBQcmltaXRpdmVSZW5kZXJlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihnbCkge1xyXG4gICAgICAgIHRoaXMuYnVmZmVyQXR0cmlicyA9IHt9O1xyXG4gICAgICAgIHRoaXMucHJvZ3JhbUluZm8gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZ2wgPSBnbDtcclxuICAgICAgICB0aGlzLmRyYXdlciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5tb2RlID0gbnVsbDtcclxuICAgICAgICB0aGlzLm9mZnNldCA9IDA7XHJcbiAgICAgICAgdGhpcy5udW1FbGVtZW50cyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5WQU8gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50VHlwZSA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBzZXRDb250ZXh0KGdsKSB7XHJcbiAgICAgICAgdGhpcy5nbCA9IGdsO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlVkFPKCkge1xyXG4gICAgICAgIGlmICh0aGlzLlZBTylcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgdGhpcy5WQU8gPSB0aGlzLmdsLmNyZWF0ZVZlcnRleEFycmF5KCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBzZXRNb2RlKG1vZGUpIHtcclxuICAgICAgICB0aGlzLm1vZGUgPSBtb2RlO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2V0TnVtRWxlbWVudHMobnVtRWxlbWVudHMpIHtcclxuICAgICAgICB0aGlzLm51bUVsZW1lbnRzID0gbnVtRWxlbWVudHM7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBzZXRPZmZzZXQob2Zmc2V0KSB7XHJcbiAgICAgICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBzZXRJbmRpY2VzKGFycmF5QnVmZmVyKSB7XHJcbiAgICAgICAgY29uc3QgeyBnbCwgVkFPIH0gPSB0aGlzO1xyXG4gICAgICAgIGdsLmJpbmRWZXJ0ZXhBcnJheShWQU8pO1xyXG4gICAgICAgIHRoaXMubnVtRWxlbWVudHMgPSBhcnJheUJ1ZmZlci5ieXRlTGVuZ3RoIC8gMjtcclxuICAgICAgICBjb25zdCBpbmRpY2VzQnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XHJcbiAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgaW5kaWNlc0J1ZmZlcik7XHJcbiAgICAgICAgZ2wuYnVmZmVyRGF0YShnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgYXJyYXlCdWZmZXIsIGdsLlNUQVRJQ19EUkFXKTtcclxuICAgICAgICBnbC5iaW5kVmVydGV4QXJyYXkobnVsbCk7XHJcbiAgICAgICAgdGhpcy5pbmRpY2VzID0gaW5kaWNlc0J1ZmZlcjtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGNyZWF0ZUdlb21ldHJ5QnVmZmVycyhhcnJheURhdGEpIHtcclxuICAgICAgICBjb25zdCB7IGdsIH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IHsgYXR0cmlidXRlcywgaW5kaWNlcywgY29tcG9uZW50VHlwZSwgbnVtRWxlbWVudHMsIG1vZGUsIG9mZnNldCB9ID0gYXJyYXlEYXRhO1xyXG4gICAgICAgIHRoaXMubnVtRWxlbWVudHMgPSBudW1FbGVtZW50cztcclxuICAgICAgICB0aGlzLm1vZGUgPSBtb2RlO1xyXG4gICAgICAgIHRoaXMuY29tcG9uZW50VHlwZSA9IGNvbXBvbmVudFR5cGUgfHwgNTEyMztcclxuICAgICAgICB0aGlzLm9mZnNldCA9IDA7XHJcbiAgICAgICAgaWYgKGF0dHJpYnV0ZXMpIHtcclxuICAgICAgICAgICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaCgoYXR0cmlidXRlTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYXR0cmliUHJvcHMgPSBhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYnVmZmVyQXR0cmlidXRlSW5mbyA9IG5ldyBCdWZmZXJBdHRyaWJ1dGVJbmZvKGdsLCBhdHRyaWJQcm9wcyk7XHJcbiAgICAgICAgICAgICAgICBidWZmZXJBdHRyaWJ1dGVJbmZvLmJ1ZmZlckRhdGEoYXR0cmliUHJvcHMuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlckF0dHJpYnNbYXR0cmlidXRlTmFtZV0gPSBidWZmZXJBdHRyaWJ1dGVJbmZvO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGluZGljZXMpIHtcclxuICAgICAgICAgICAgY29uc3QgaW5kaWNlc0J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xyXG4gICAgICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBpbmRpY2VzQnVmZmVyKTtcclxuICAgICAgICAgICAgZ2wuYnVmZmVyRGF0YShnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgaW5kaWNlcywgZ2wuU1RBVElDX0RSQVcpO1xyXG4gICAgICAgICAgICB0aGlzLmluZGljZXMgPSBpbmRpY2VzQnVmZmVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNldEF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgICAgY29uc3QgeyBnbCB9ID0gdGhpcztcclxuICAgICAgICBnbC5iaW5kVmVydGV4QXJyYXkodGhpcy5WQU8pO1xyXG4gICAgICAgIGZvciAoY29uc3QgYXR0cmliIGluIHRoaXMuYnVmZmVyQXR0cmlicykge1xyXG4gICAgICAgICAgICBjb25zdCBidWZmZXJBdHRyaWJ1dGVJbmZvID0gdGhpcy5idWZmZXJBdHRyaWJzW2F0dHJpYl07XHJcbiAgICAgICAgICAgIGJ1ZmZlckF0dHJpYnV0ZUluZm8uc2V0QXR0cmlidXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuaW5kaWNlcyk7XHJcbiAgICAgICAgZ2wuYmluZFZlcnRleEFycmF5KG51bGwpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2V0RHJhd2VyKGRyYXdlcikge1xyXG4gICAgICAgIHRoaXMuZHJhd2VyID0gZHJhd2VyO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2V0UHJvZ3JhbUluZm8ocHJvZ3JhbUluZm8pIHtcclxuICAgICAgICB0aGlzLnByb2dyYW1JbmZvID0gcHJvZ3JhbUluZm87XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBjcmVhdGVCdWZmZXJBdHRyaWJEYXRhKHsgYXR0cmliTmFtZSwgbG9jYXRpb24sIHN0cmlkZSwgbnVtQ29tcG9uZW50cywgb2Zmc2V0LCB0eXBlLCBkaXZpc29yLCBhdHRyaWJ1dGVUeXBlLCB9KSB7XHJcbiAgICAgICAgY29uc3QgeyBnbCB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCBidWZmZXJBdHRyaWJJbmZvID0gbmV3IEJ1ZmZlckF0dHJpYnV0ZUluZm8oZ2wsIHtcclxuICAgICAgICAgICAgbG9jYXRpb24sXHJcbiAgICAgICAgICAgIHN0cmlkZSxcclxuICAgICAgICAgICAgbnVtQ29tcG9uZW50cyxcclxuICAgICAgICAgICAgb2Zmc2V0LFxyXG4gICAgICAgICAgICB0eXBlLFxyXG4gICAgICAgICAgICBkaXZpc29yLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVUeXBlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuYnVmZmVyQXR0cmlic1thdHRyaWJOYW1lXSA9IGJ1ZmZlckF0dHJpYkluZm87XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgc2V0QnVmZmVyQXR0cmliRGF0YShuYW1lLCBidWZmZXJBdHRyaWJEYXRhKSB7XHJcbiAgICAgIHRoaXMuYnVmZmVycyA9IHsgLi4udGhpcy5idWZmZXJzLCBbbmFtZV06IGJ1ZmZlckF0dHJpYkRhdGEgfTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAqL1xyXG4gICAgc2V0QXR0cmlidXRlKGF0dHJpYk5hbWUpIHtcclxuICAgICAgICBjb25zdCB7IGdsIH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IGJ1ZmZlckF0dHJpYkRhdGEgPSB0aGlzLmJ1ZmZlckF0dHJpYnNbYXR0cmliTmFtZV07XHJcbiAgICAgICAgZ2wuYmluZFZlcnRleEFycmF5KHRoaXMuVkFPKTtcclxuICAgICAgICBidWZmZXJBdHRyaWJEYXRhLnNldEF0dHJpYnV0ZSgpO1xyXG4gICAgICAgIGdsLmJpbmRWZXJ0ZXhBcnJheShudWxsKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8qXHJcbiAgICBfc2V0QXR0cmlidXRlKGJ1ZmZlckF0dHJpYkRhdGEpIHtcclxuICAgICAgY29uc3QgeyBnbCB9ID0gdGhpcztcclxuICAgICAgZ2wuYmluZFZlcnRleEFycmF5KHRoaXMudmFvKTtcclxuICAgICAgYnVmZmVyQXR0cmliRGF0YS5zZXRBdHRyaWJ1dGUoKTtcclxuICAgICAgZ2wuYmluZFZlcnRleEFycmF5KG51bGwpO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgICovXHJcbiAgICBidWZmZXJEYXRhKGF0dHJpYk5hbWUsIGRhdGEsIHVzYWdlKSB7XHJcbiAgICAgICAgY29uc3QgYnVmZmVyQXR0cmliSW5mbyA9IHRoaXMuYnVmZmVyQXR0cmlic1thdHRyaWJOYW1lXTtcclxuICAgICAgICBidWZmZXJBdHRyaWJJbmZvLmJ1ZmZlckRhdGEoZGF0YSwgdXNhZ2UpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgYnVmZmVyU3ViRGF0YShhdHRyaWJOYW1lLCBkYXRhLCBvZmZzZXQpIHtcclxuICAgICAgICBjb25zdCBidWZmZXJBdHRyaWJJbmZvID0gdGhpcy5idWZmZXJBdHRyaWJzW2F0dHJpYk5hbWVdO1xyXG4gICAgICAgIGJ1ZmZlckF0dHJpYkluZm8uYnVmZmVyU3ViRGF0YShkYXRhLCBvZmZzZXQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgYWxsb2NCdWZmZXIoYXR0cmliTmFtZSwgYnl0ZUxlbmd0aCwgdXNhZ2UpIHtcclxuICAgICAgICBjb25zdCBidWZmZXJBdHRyaWJJbmZvID0gdGhpcy5idWZmZXJBdHRyaWJzW2F0dHJpYk5hbWVdO1xyXG4gICAgICAgIGJ1ZmZlckF0dHJpYkluZm8uYWxsb2NCdWZmZXIoYnl0ZUxlbmd0aCwgdXNhZ2UpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgZHJhdyh1bmlmb3JtcywgY2FtZXJhTWF0cml4KSB7XHJcbiAgICAgICAgdGhpcy5kcmF3ZXIuZHJhdyh0aGlzLCB1bmlmb3JtcywgY2FtZXJhTWF0cml4KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGRyYXdJbnN0YW5jZWQodW5pZm9ybXMsIGNhbWVyYU1hdHJpeCwgbnVtSW5zdGFuY2VzKSB7XHJcbiAgICAgICAgdGhpcy5kcmF3ZXIuZHJhd0luc3RhbmNlZCh0aGlzLCB1bmlmb3JtcywgY2FtZXJhTWF0cml4LCBudW1JbnN0YW5jZXMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IFByaW1pdGl2ZVJlbmRlcmVyO1xyXG4iLCJpbXBvcnQgeyB2MyB9IGZyb20gJ3JvbWFucHBwbWF0aCc7XHJcbmltcG9ydCB7IEZMT0FUX1ZFQzIsIEZMT0FUX1ZFQzMgfSBmcm9tIFwiLi9lbnVtc1wiO1xyXG5jb25zdCB7IGNyb3NzLCBkaWZmLCBub3JtYWxpemUgfSA9IHYzO1xyXG5jb25zdCBsaW5lZEJveEluZGljZXMgPSBuZXcgVWludDE2QXJyYXkoW1xyXG4gICAgMCxcclxuICAgIDEsXHJcbiAgICAxLFxyXG4gICAgMixcclxuICAgIDIsXHJcbiAgICAzLFxyXG4gICAgMyxcclxuICAgIDAsXHJcbiAgICAwLFxyXG4gICAgNSxcclxuICAgIDUsXHJcbiAgICA0LFxyXG4gICAgNCxcclxuICAgIDEsXHJcbiAgICAxLFxyXG4gICAgMCxcclxuICAgIDAsXHJcbiAgICA0LFxyXG4gICAgNCxcclxuICAgIDcsXHJcbiAgICA3LFxyXG4gICAgMyxcclxuICAgIDMsXHJcbiAgICAwLFxyXG4gICAgMSxcclxuICAgIDIsXHJcbiAgICAyLFxyXG4gICAgNixcclxuICAgIDYsXHJcbiAgICA1LFxyXG4gICAgNSxcclxuICAgIDEsXHJcbiAgICA0LFxyXG4gICAgNSxcclxuICAgIDUsXHJcbiAgICA2LFxyXG4gICAgNixcclxuICAgIDcsXHJcbiAgICA3LFxyXG4gICAgNCxcclxuICAgIDIsXHJcbiAgICA3LFxyXG4gICAgNyxcclxuICAgIDMsXHJcbiAgICAzLFxyXG4gICAgNixcclxuICAgIDYsXHJcbiAgICAyLCAvLyB0b3BcclxuXSk7XHJcbmNvbnN0IENVQkVfRkFDRV9JTkRJQ0VTID0gW1xyXG4gICAgWzMsIDcsIDUsIDFdLFxyXG4gICAgWzYsIDIsIDAsIDRdLFxyXG4gICAgWzYsIDcsIDMsIDJdLFxyXG4gICAgWzAsIDEsIDUsIDRdLFxyXG4gICAgWzcsIDYsIDQsIDVdLFxyXG4gICAgWzIsIDMsIDEsIDBdLCAvLyBiYWNrXHJcbl07XHJcbmZ1bmN0aW9uIGNyZWF0ZUJveChfYSA9IDEsIF9iID0gMSwgX2MgPSAxKSB7XHJcbiAgICBjb25zdCBhID0gX2EgLyAyLCBiID0gX2IgLyAyLCBjID0gX2MgLyAyO1xyXG4gICAgY29uc3QgY29ybmVyVmVydGljZXMgPSBbXHJcbiAgICAgICAgWy1hLCAtYiwgLWNdLFxyXG4gICAgICAgIFsrYSwgLWIsIC1jXSxcclxuICAgICAgICBbLWEsICtiLCAtY10sXHJcbiAgICAgICAgWythLCArYiwgLWNdLFxyXG4gICAgICAgIFstYSwgLWIsICtjXSxcclxuICAgICAgICBbK2EsIC1iLCArY10sXHJcbiAgICAgICAgWy1hLCArYiwgK2NdLFxyXG4gICAgICAgIFsrYSwgK2IsICtjXSxcclxuICAgIF07XHJcbiAgICBjb25zdCBmYWNlTm9ybWFscyA9IFtcclxuICAgICAgICBbKzEsICswLCArMF0sXHJcbiAgICAgICAgWy0xLCArMCwgKzBdLFxyXG4gICAgICAgIFsrMCwgKzEsICswXSxcclxuICAgICAgICBbKzAsIC0xLCArMF0sXHJcbiAgICAgICAgWyswLCArMCwgKzFdLFxyXG4gICAgICAgIFsrMCwgKzAsIC0xXSxcclxuICAgIF07XHJcbiAgICBjb25zdCB1dkNvb3JkcyA9IFtcclxuICAgICAgICBbMSwgMF0sXHJcbiAgICAgICAgWzAsIDBdLFxyXG4gICAgICAgIFswLCAxXSxcclxuICAgICAgICBbMSwgMV0sXHJcbiAgICBdO1xyXG4gICAgY29uc3QgcG9zaXRpb25zID0gW107XHJcbiAgICBjb25zdCBub3JtYWxzID0gW107XHJcbiAgICAvL2NvbnN0IHRleENvb3JkcyA9IHdlYmdsVXRpbHMuY3JlYXRlQXVnbWVudGVkVHlwZWRBcnJheSgyICwgbnVtVmVydGljZXMpO1xyXG4gICAgY29uc3QgaW5kaWNlcyA9IFtdO1xyXG4gICAgZm9yIChsZXQgZiA9IDA7IGYgPCA2OyArK2YpIHtcclxuICAgICAgICBjb25zdCBmYWNlSW5kaWNlcyA9IENVQkVfRkFDRV9JTkRJQ0VTW2ZdO1xyXG4gICAgICAgIGZvciAobGV0IHYgPSAwOyB2IDwgNDsgKyt2KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uID0gY29ybmVyVmVydGljZXNbZmFjZUluZGljZXNbdl1dO1xyXG4gICAgICAgICAgICBjb25zdCBub3JtYWwgPSBmYWNlTm9ybWFsc1tmXTtcclxuICAgICAgICAgICAgcG9zaXRpb25zLnB1c2goLi4ucG9zaXRpb24pO1xyXG4gICAgICAgICAgICBub3JtYWxzLnB1c2goLi4ubm9ybWFsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gNCAqIGY7XHJcbiAgICAgICAgaW5kaWNlcy5wdXNoKG9mZnNldCArIDAsIG9mZnNldCArIDEsIG9mZnNldCArIDIpO1xyXG4gICAgICAgIGluZGljZXMucHVzaChvZmZzZXQgKyAwLCBvZmZzZXQgKyAyLCBvZmZzZXQgKyAzKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHRleGNvb3JkID0gbmV3IEZsb2F0MzJBcnJheShbXHJcbiAgICAgICAgLy8gRnJvbnRcclxuICAgICAgICAwLjAsIDAuMCwgMS4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDEuMCxcclxuICAgICAgICAvLyBCYWNrXHJcbiAgICAgICAgMC4wLCAwLjAsIDEuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAxLjAsXHJcbiAgICAgICAgLy8gVG9wXHJcbiAgICAgICAgMC4wLCAwLjAsIDEuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAxLjAsXHJcbiAgICAgICAgLy8gQm90dG9tXHJcbiAgICAgICAgMC4wLCAwLjAsIDEuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAxLjAsXHJcbiAgICAgICAgLy8gUmlnaHRcclxuICAgICAgICAwLjAsIDAuMCwgMS4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDEuMCxcclxuICAgICAgICAvLyBMZWZ0XHJcbiAgICAgICAgMC4wLCAwLjAsIDEuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAxLjAsXHJcbiAgICBdKTtcclxuICAgIGNvbnN0IF9ub3JtYWxzID0gbmV3IEZsb2F0MzJBcnJheShub3JtYWxzKTtcclxuICAgIGNvbnN0IF9wb3NpdGlvbnMgPSBuZXcgRmxvYXQzMkFycmF5KHBvc2l0aW9ucyk7XHJcbiAgICBjb25zdCBfaW5kaWNlcyA9IG5ldyBVaW50MTZBcnJheShpbmRpY2VzKTtcclxuICAgIGNvbnN0IF90ZXhjb29yZHMgPSBuZXcgRmxvYXQzMkFycmF5KHRleGNvb3JkKTtcclxuICAgIGNvbnN0IEFycmF5RGF0YSA9IHtcclxuICAgICAgICBhdHRyaWJ1dGVzOiB7XHJcbiAgICAgICAgICAgIE5PUk1BTDoge1xyXG4gICAgICAgICAgICAgICAgZGF0YTogX25vcm1hbHMsXHJcbiAgICAgICAgICAgICAgICBjb3VudDogNiAqIDQgKiAzLFxyXG4gICAgICAgICAgICAgICAgbG9jYXRpb246IDEsXHJcbiAgICAgICAgICAgICAgICBieXRlTGVuZ3RoOiBfbm9ybWFscy5ieXRlTGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgc3RyaWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAwLFxyXG4gICAgICAgICAgICAgICAgbnVtQ29tcG9uZW50czogMyxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDUxMjYsXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVUeXBlOiBGTE9BVF9WRUMzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFBPU0lUSU9OOiB7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiBfcG9zaXRpb25zLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IDYgKiA0ICogMyxcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAwLFxyXG4gICAgICAgICAgICAgICAgYnl0ZUxlbmd0aDogX3Bvc2l0aW9ucy5ieXRlTGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgc3RyaWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAwLFxyXG4gICAgICAgICAgICAgICAgbnVtQ29tcG9uZW50czogMyxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDUxMjYsXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVUeXBlOiBGTE9BVF9WRUMzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFRFWENPT1JEXzA6IHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IF90ZXhjb29yZHMsXHJcbiAgICAgICAgICAgICAgICBjb3VudDogNDgsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiA1MTI2LFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAwLFxyXG4gICAgICAgICAgICAgICAgc3RyaWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgYnl0ZUxlbmd0aDogX3RleGNvb3Jkcy5ieXRlTGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgbG9jYXRpb246IDQsXHJcbiAgICAgICAgICAgICAgICBudW1Db21wb25lbnRzOiAyLFxyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlVHlwZTogRkxPQVRfVkVDMlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5kaWNlczogX2luZGljZXMsXHJcbiAgICAgICAgbnVtRWxlbWVudHM6IF9pbmRpY2VzLmxlbmd0aCxcclxuICAgICAgICBjb21wb25lbnRUeXBlOiA1MTIzLFxyXG4gICAgICAgIG1vZGU6IDQsXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEFycmF5RGF0YTtcclxuICAgIC8qcmV0dXJuIHtcclxuICAgICAgICAgICAgZ2x0ZiA6IHtcclxuICAgICAgICAgICAgICBhY2Nlc3NvcnMgOiBbXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICBidWZmZXJWaWV3IDogMCxcclxuICAgICAgICAgICAgICAgICAgYnl0ZU9mZnNldCA6IDAsXHJcbiAgICAgICAgICAgICAgICAgIGNvdW50IDo3MixcclxuICAgICAgICAgICAgICAgICAgY29tcG9uZW50VHlwZSA6IDUxMjYsXHJcbiAgICAgICAgICAgICAgICAgIHR5cGUgOiAnVkVDMydcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlclZpZXcgOiAxLFxyXG4gICAgICAgICAgICAgICAgYnl0ZU9mZnNldCA6IDAsXHJcbiAgICAgICAgICAgICAgICBjb3VudCA6IDcyLFxyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50VHlwZSA6IDUxMjYsXHJcbiAgICAgICAgICAgICAgICB0eXBlIDogJ1ZFQzMnXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBidWZmZXJWaWV3IDogMixcclxuICAgICAgICAgICAgICAgIGJ5dGVPZmZzZXQgOiAwLFxyXG4gICAgICAgICAgICAgICAgY291bnQgOiAzNixcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudFR5cGUgOiA1MTIzLFxyXG4gICAgICAgICAgICAgICAgdHlwZSA6ICdTQ0FMQVInXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBidWZmZXJWaWV3IDogMyxcclxuICAgICAgICAgICAgICAgIGJ5dGVPZmZzZXQgOiAwLFxyXG4gICAgICAgICAgICAgICAgY291bnQgOiA0OCxcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudFR5cGUgOiA1MTI2LFxyXG4gICAgICAgICAgICAgICAgdHlwZSA6ICdWRUMyJ1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBidWZmZXJWaWV3cyA6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgYnVmZmVyIDogMCxcclxuICAgICAgICAgICAgICAgICAgYnl0ZUxlbmd0aCA6IHBvc2l0aW9ucy5ieXRlTGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgICBieXRlT2Zmc2V0IDogMFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgYnVmZmVyIDogMSxcclxuICAgICAgICAgICAgICAgICAgYnl0ZUxlbmd0aCA6IG5vcm1hbHMuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgICAgYnl0ZU9mZnNldCA6IDBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIGJ1ZmZlciA6IDIsXHJcbiAgICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGggOiBpbmRpY2VzLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgIGJ5dGVPZmZzZXQgOiAwXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICBidWZmZXIgOiAzLFxyXG4gICAgICAgICAgICAgICAgICBieXRlTGVuZ3RoIDogdGV4Y29vcmQuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgICAgYnl0ZU9mZnNldCA6IDBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBtZXNoZXMgOiBbXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZSA6ICdDdWJlJyxcclxuICAgICAgICAgICAgICAgIHByaW1pdGl2ZXMgOiBbXHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzIDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgTk9STUFMIDogMSxcclxuICAgICAgICAgICAgICAgICAgICAgIFBPU0lUSU9OIDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgIFRFWENPT1JEXzAgOiAzXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBpbmRpY2VzIDogMixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlIDogNFxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBub2RlcyA6IFtcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lIDogXCJDdWJlXCIsXHJcbiAgICAgICAgICAgICAgICBtZXNoIDogMCxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuIDogWzFdXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lIDogJ0N1YmUyJyxcclxuICAgICAgICAgICAgICAgIG1lc2ggOiAwLFxyXG4gICAgICAgICAgICAgICAgdHJhbnNsYXRpb24gOiBbMSwxLDFdXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgYmluYXJ5QnVmZmVycyA6IFtcclxuICAgICAgICAgICAgcG9zaXRpb25zLmJ1ZmZlciwgbm9ybWFscy5idWZmZXIsIGluZGljZXMuYnVmZmVyLCB0ZXhjb29yZC5idWZmZXJcclxuICAgICAgICAgIF1cclxuICAgICAgICB9OyovXHJcbn1cclxuY29uc3QgY3JlYXRlQ29uZSA9IChyYWRpdXMgPSAyLCBoZWlnaHQgPSAyLCBudW1Db3JuZXJzID0gNCkgPT4ge1xyXG4gICAgY29uc3QgdmVydGljZXMgPSBbMCwgLWhlaWdodCAvIDIsIDBdO1xyXG4gICAgY29uc3Qgbm9ybWFscyA9IFtdO1xyXG4gICAgY29uc3QgaW5kaWNlcyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1Db3JuZXJzICsgMTsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgYW5nbGUgPSAoMiAqIGkgKiBNYXRoLlBJKSAvIG51bUNvcm5lcnM7XHJcbiAgICAgICAgY29uc3QgeCA9IE1hdGguY29zKGFuZ2xlKSAqIHJhZGl1cztcclxuICAgICAgICBjb25zdCB6ID0gTWF0aC5zaW4oYW5nbGUpICogcmFkaXVzO1xyXG4gICAgICAgIGNvbnN0IHkgPSAtaGVpZ2h0IC8gMjtcclxuICAgICAgICB2ZXJ0aWNlcy5wdXNoKHgsIC1oZWlnaHQgLyAyLCB6KTtcclxuICAgICAgICBub3JtYWxzLnB1c2goMCwgLTEsIDApO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1Db3JuZXJzOyBpKyspIHtcclxuICAgICAgICBpbmRpY2VzLnB1c2goMCwgaSArIDEsIGkgKyAyKTtcclxuICAgIH1cclxuICAgIC8vdmVydGljZXMucHVzaCh2ZXJ0aWNlc1sxXSwgLWhlaWdodC8yLCB2ZXJ0aWNlc1szXSlcclxuICAgIGNvbnN0IG4gPSB2ZXJ0aWNlcy5sZW5ndGggLyAzO1xyXG4gICAgY29uc3Qgc3RyaWRlID0gMztcclxuICAgIGNvbnN0IHN0YXJ0ID0gbjtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtQ29ybmVycyArIDI7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGFuZ2xlID0gKDIgKiBpICogTWF0aC5QSSkgLyBudW1Db3JuZXJzO1xyXG4gICAgICAgIGNvbnN0IHggPSBNYXRoLmNvcyhhbmdsZSkgKiByYWRpdXM7XHJcbiAgICAgICAgY29uc3QgeiA9IE1hdGguc2luKGFuZ2xlKSAqIHJhZGl1cztcclxuICAgICAgICBjb25zdCB5ID0gLWhlaWdodCAvIDI7XHJcbiAgICAgICAgY29uc3QgYSA9IFt2ZXJ0aWNlc1tpICogM10sIHZlcnRpY2VzW2kgKiAzICsgMV0sIHZlcnRpY2VzW2kgKiAzICsgMl1dO1xyXG4gICAgICAgIGNvbnN0IGIgPSBbdmVydGljZXNbaSAqIDMgKyAzXSwgdmVydGljZXNbaSAqIDMgKyA0XSwgdmVydGljZXNbaSAqIDMgKyA1XV07XHJcbiAgICAgICAgY29uc3QgYyA9IFswLCBoZWlnaHQgLyAyLCAwXTtcclxuICAgICAgICBpbmRpY2VzLnB1c2goc3RhcnQgKyBpICogc3RyaWRlICsgMiwgc3RhcnQgKyBpICogc3RyaWRlICsgMSwgc3RhcnQgKyBpICogc3RyaWRlICsgMyk7XHJcbiAgICAgICAgdmVydGljZXMucHVzaCguLi5jLCAuLi5hLCAuLi5iKTtcclxuICAgICAgICBjb25zdCBub3JtYWwgPSBub3JtYWxpemUoY3Jvc3MoZGlmZihiLCBjKSwgZGlmZihhLCBjKSkpO1xyXG4gICAgICAgIG5vcm1hbHMucHVzaCguLi5ub3JtYWwsIC4uLm5vcm1hbCwgLi4ubm9ybWFsKTtcclxuICAgIH1cclxuICAgIGNvbnN0IF9ub3JtYWwgPSBuZXcgRmxvYXQzMkFycmF5KG5vcm1hbHMpO1xyXG4gICAgY29uc3QgX3Bvc2l0aW9uID0gbmV3IEZsb2F0MzJBcnJheSh2ZXJ0aWNlcyk7XHJcbiAgICBjb25zdCBfaW5kaWNlcyA9IG5ldyBVaW50MTZBcnJheShpbmRpY2VzKTtcclxuICAgIGNvbnN0IEFycmF5RGF0YSA9IHtcclxuICAgICAgICBhdHRyaWJ1dGVzOiB7XHJcbiAgICAgICAgICAgIFBPU0lUSU9OOiB7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogMCxcclxuICAgICAgICAgICAgICAgIGNvdW50OiB2ZXJ0aWNlcy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IDAsXHJcbiAgICAgICAgICAgICAgICBzdHJpZGU6IDAsXHJcbiAgICAgICAgICAgICAgICBudW1Db21wb25lbnRzOiAzLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNTEyNixcclxuICAgICAgICAgICAgICAgIGRhdGE6IF9wb3NpdGlvbixcclxuICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGg6IF9wb3NpdGlvbi5ieXRlTGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlVHlwZTogRkxPQVRfVkVDM1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBOT1JNQUw6IHtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAxLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IG5vcm1hbHMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgbnVtQ29tcG9uZW50czogMyxcclxuICAgICAgICAgICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICAgICAgICAgIHN0cmlkZTogMCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDUxMjYsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBfbm9ybWFsLFxyXG4gICAgICAgICAgICAgICAgYnl0ZUxlbmd0aDogX25vcm1hbC5ieXRlTGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlVHlwZTogRkxPQVRfVkVDM1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcG9uZW50VHlwZTogNTEyMyxcclxuICAgICAgICBpbmRpY2VzOiBfaW5kaWNlcyxcclxuICAgICAgICBudW1FbGVtZW50czogaW5kaWNlcy5sZW5ndGgsXHJcbiAgICAgICAgbW9kZTogNCxcclxuICAgIH07XHJcbiAgICByZXR1cm4gQXJyYXlEYXRhO1xyXG59O1xyXG5jb25zdCBjcmVhdGVDaXJjbGUgPSAocmFkaXVzLCBudW1Db3JuZXJzKSA9PiB7XHJcbiAgICBjb25zdCB2ZXJ0aWNlcyA9IFswLCAwLCAwXTtcclxuICAgIGNvbnN0IG5vcm1hbHMgPSBbXTtcclxuICAgIGNvbnN0IGluZGljZXMgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtQ29ybmVycyArIDE7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGFuZ2xlID0gKDIgKiBpICogTWF0aC5QSSkgLyBudW1Db3JuZXJzO1xyXG4gICAgICAgIGNvbnN0IHggPSBNYXRoLmNvcyhhbmdsZSkgKiByYWRpdXM7XHJcbiAgICAgICAgY29uc3QgeiA9IE1hdGguc2luKGFuZ2xlKSAqIHJhZGl1cztcclxuICAgICAgICB2ZXJ0aWNlcy5wdXNoKHgsIDAsIHopO1xyXG4gICAgICAgIG5vcm1hbHMucHVzaCgwLCAxLCAwKTtcclxuICAgIH1cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtQ29ybmVyczsgaSsrKSB7XHJcbiAgICAgICAgaW5kaWNlcy5wdXNoKDAsIGkgKyAxLCBpICsgMik7XHJcbiAgICB9XHJcbiAgICBjb25zdCBfbm9ybWFsID0gbmV3IEZsb2F0MzJBcnJheShub3JtYWxzKTtcclxuICAgIGNvbnN0IF9wb3NpdGlvbiA9IG5ldyBGbG9hdDMyQXJyYXkodmVydGljZXMpO1xyXG4gICAgY29uc3QgX2luZGljZXMgPSBuZXcgVWludDE2QXJyYXkoaW5kaWNlcyk7XHJcbiAgICBjb25zdCBBcnJheURhdGEgPSB7XHJcbiAgICAgICAgYXR0cmlidXRlczoge1xyXG4gICAgICAgICAgICBQT1NJVElPTjoge1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb246IDAsXHJcbiAgICAgICAgICAgICAgICBjb3VudDogdmVydGljZXMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAwLFxyXG4gICAgICAgICAgICAgICAgc3RyaWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgbnVtQ29tcG9uZW50czogMyxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDUxMjYsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBfcG9zaXRpb24sXHJcbiAgICAgICAgICAgICAgICBieXRlTGVuZ3RoOiBfcG9zaXRpb24uYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGU6IEZMT0FUX1ZFQzNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgTk9STUFMOiB7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogMSxcclxuICAgICAgICAgICAgICAgIGNvdW50OiBub3JtYWxzLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgIG51bUNvbXBvbmVudHM6IDMsXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IDAsXHJcbiAgICAgICAgICAgICAgICBzdHJpZGU6IDAsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiA1MTI2LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogX25vcm1hbCxcclxuICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGg6IF9ub3JtYWwuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGU6IEZMT0FUX1ZFQzNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBvbmVudFR5cGU6IDUxMjMsXHJcbiAgICAgICAgaW5kaWNlczogX2luZGljZXMsXHJcbiAgICAgICAgbnVtRWxlbWVudHM6IGluZGljZXMubGVuZ3RoLFxyXG4gICAgICAgIG1vZGU6IDQsXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEFycmF5RGF0YTtcclxufTtcclxuY29uc3QgY3JlYXRlU3BoZXJlID0gKHJhZGl1cywgc3ViZGl2aXNpb25zQXhpcywgc3ViZGl2aXNpb25zSGVpZ2h0LCBvcHRfc3RhcnRMYXRpdHVkZUluUmFkaWFucywgb3B0X2VuZExhdGl0dWRlSW5SYWRpYW5zLCBvcHRfc3RhcnRMb25naXR1ZGVJblJhZGlhbnMsIG9wdF9lbmRMb25naXR1ZGVJblJhZGlhbnMpID0+IHtcclxuICAgIGlmIChzdWJkaXZpc2lvbnNBeGlzIDw9IDAgfHwgc3ViZGl2aXNpb25zSGVpZ2h0IDw9IDApIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzdWJkaXZpc2lvbkF4aXMgYW5kIHN1YmRpdmlzaW9uSGVpZ2h0IG11c3QgYmUgPiAwXCIpO1xyXG4gICAgfVxyXG4gICAgb3B0X3N0YXJ0TGF0aXR1ZGVJblJhZGlhbnMgPSBvcHRfc3RhcnRMYXRpdHVkZUluUmFkaWFucyB8fCAwO1xyXG4gICAgb3B0X2VuZExhdGl0dWRlSW5SYWRpYW5zID0gb3B0X2VuZExhdGl0dWRlSW5SYWRpYW5zIHx8IE1hdGguUEk7XHJcbiAgICBvcHRfc3RhcnRMb25naXR1ZGVJblJhZGlhbnMgPSBvcHRfc3RhcnRMb25naXR1ZGVJblJhZGlhbnMgfHwgMDtcclxuICAgIG9wdF9lbmRMb25naXR1ZGVJblJhZGlhbnMgPSBvcHRfZW5kTG9uZ2l0dWRlSW5SYWRpYW5zIHx8IE1hdGguUEkgKiAyO1xyXG4gICAgY29uc3QgbGF0UmFuZ2UgPSBvcHRfZW5kTGF0aXR1ZGVJblJhZGlhbnMgLSBvcHRfc3RhcnRMYXRpdHVkZUluUmFkaWFucztcclxuICAgIGNvbnN0IGxvbmdSYW5nZSA9IG9wdF9lbmRMb25naXR1ZGVJblJhZGlhbnMgLSBvcHRfc3RhcnRMb25naXR1ZGVJblJhZGlhbnM7XHJcbiAgICBjb25zdCBwb3NpdGlvbnMgPSBbXTtcclxuICAgIGNvbnN0IG5vcm1hbHMgPSBbXTtcclxuICAgIGNvbnN0IHRleGNvb3JkcyA9IFtdO1xyXG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPD0gc3ViZGl2aXNpb25zSGVpZ2h0OyB5KyspIHtcclxuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8PSBzdWJkaXZpc2lvbnNBeGlzOyB4KyspIHtcclxuICAgICAgICAgICAgY29uc3QgdSA9IHggLyBzdWJkaXZpc2lvbnNBeGlzO1xyXG4gICAgICAgICAgICBjb25zdCB2ID0geSAvIHN1YmRpdmlzaW9uc0hlaWdodDtcclxuICAgICAgICAgICAgY29uc3QgdGhldGEgPSBsb25nUmFuZ2UgKiB1ICsgb3B0X3N0YXJ0TG9uZ2l0dWRlSW5SYWRpYW5zO1xyXG4gICAgICAgICAgICBjb25zdCBwaGkgPSBsYXRSYW5nZSAqIHYgKyBvcHRfc3RhcnRMYXRpdHVkZUluUmFkaWFucztcclxuICAgICAgICAgICAgY29uc3Qgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvc1RoZXRhID0gTWF0aC5jb3ModGhldGEpO1xyXG4gICAgICAgICAgICBjb25zdCBzaW5QaGkgPSBNYXRoLnNpbihwaGkpO1xyXG4gICAgICAgICAgICBjb25zdCBjb3NQaGkgPSBNYXRoLmNvcyhwaGkpO1xyXG4gICAgICAgICAgICBjb25zdCB1eCA9IGNvc1RoZXRhICogc2luUGhpO1xyXG4gICAgICAgICAgICBjb25zdCB1eSA9IGNvc1BoaTtcclxuICAgICAgICAgICAgY29uc3QgdXogPSBzaW5UaGV0YSAqIHNpblBoaTtcclxuICAgICAgICAgICAgcG9zaXRpb25zLnB1c2gocmFkaXVzICogdXgsIHJhZGl1cyAqIHV5LCByYWRpdXMgKiB1eik7XHJcbiAgICAgICAgICAgIG5vcm1hbHMucHVzaCh1eCwgdXksIHV6KTtcclxuICAgICAgICAgICAgdGV4Y29vcmRzLnB1c2goMSAtIHUsIHYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IG51bVZlcnRzQXJvdW5kID0gc3ViZGl2aXNpb25zQXhpcyArIDE7XHJcbiAgICBjb25zdCBpbmRpY2VzID0gW107XHJcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHN1YmRpdmlzaW9uc0F4aXM7IHgrKykge1xyXG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgc3ViZGl2aXNpb25zSGVpZ2h0OyB5KyspIHtcclxuICAgICAgICAgICAgaW5kaWNlcy5wdXNoKCh5ICsgMCkgKiBudW1WZXJ0c0Fyb3VuZCArIHgsICh5ICsgMCkgKiBudW1WZXJ0c0Fyb3VuZCArIHggKyAxLCAoeSArIDEpICogbnVtVmVydHNBcm91bmQgKyB4KTtcclxuICAgICAgICAgICAgaW5kaWNlcy5wdXNoKCh5ICsgMSkgKiBudW1WZXJ0c0Fyb3VuZCArIHgsICh5ICsgMCkgKiBudW1WZXJ0c0Fyb3VuZCArIHggKyAxLCAoeSArIDEpICogbnVtVmVydHNBcm91bmQgKyB4ICsgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3QgX3Bvc2l0aW9ucyA9IG5ldyBGbG9hdDMyQXJyYXkocG9zaXRpb25zKTtcclxuICAgIGNvbnN0IF9ub3JtYWxzID0gbmV3IEZsb2F0MzJBcnJheShub3JtYWxzKTtcclxuICAgIGNvbnN0IF90ZXhjb29yZHMgPSBuZXcgRmxvYXQzMkFycmF5KHRleGNvb3Jkcyk7XHJcbiAgICBjb25zdCBfaW5kaWNlcyA9IG5ldyBVaW50MTZBcnJheShpbmRpY2VzKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYXR0cmlidXRlczoge1xyXG4gICAgICAgICAgICBQT1NJVElPTjoge1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb246IDAsXHJcbiAgICAgICAgICAgICAgICBjb3VudDogcG9zaXRpb25zLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICAgICAgICAgIHN0cmlkZTogMCxcclxuICAgICAgICAgICAgICAgIG51bUNvbXBvbmVudHM6IDMsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiA1MTI2LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogX3Bvc2l0aW9ucyxcclxuICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGg6IF9wb3NpdGlvbnMuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGU6IEZMT0FUX1ZFQzNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgTk9STUFMOiB7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogMSxcclxuICAgICAgICAgICAgICAgIGNvdW50OiBub3JtYWxzLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgIG51bUNvbXBvbmVudHM6IDMsXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IDAsXHJcbiAgICAgICAgICAgICAgICBzdHJpZGU6IDAsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiA1MTI2LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogX25vcm1hbHMsXHJcbiAgICAgICAgICAgICAgICBieXRlTGVuZ3RoOiBfbm9ybWFscy5ieXRlTGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlVHlwZTogRkxPQVRfVkVDM1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBURVhDT09SRF8wOiB7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiBfdGV4Y29vcmRzLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IF90ZXhjb29yZHMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNTEyNixcclxuICAgICAgICAgICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICAgICAgICAgIHN0cmlkZTogMCxcclxuICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGg6IF90ZXhjb29yZHMuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiA0LFxyXG4gICAgICAgICAgICAgICAgbnVtQ29tcG9uZW50czogMixcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGU6IEZMT0FUX1ZFQzJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBvbmVudFR5cGU6IDUxMjMsXHJcbiAgICAgICAgaW5kaWNlczogX2luZGljZXMsXHJcbiAgICAgICAgbnVtRWxlbWVudHM6IGluZGljZXMubGVuZ3RoLFxyXG4gICAgICAgIG1vZGU6IDQsXHJcbiAgICB9O1xyXG59O1xyXG5jb25zdCBjcmVhdGVUcnVuY2F0ZWRDb25lID0gKGJvdHRvbVJhZGl1cywgdG9wUmFkaXVzLCBoZWlnaHQsIHJhZGlhbFN1YmRpdmlzaW9ucywgdmVydGljYWxTdWJkaXZpc2lvbnMsIG9wdF90b3BDYXAsIG9wdF9ib3R0b21DYXApID0+IHtcclxuICAgIGlmIChyYWRpYWxTdWJkaXZpc2lvbnMgPCAzKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwicmFkaWFsU3ViZGl2aXNpb25zIG11c3QgYmUgMyBvciBncmVhdGVyXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKHZlcnRpY2FsU3ViZGl2aXNpb25zIDwgMSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInZlcnRpY2FsU3ViZGl2aXNpb25zIG11c3QgYmUgMSBvciBncmVhdGVyXCIpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdG9wQ2FwID0gb3B0X3RvcENhcCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IG9wdF90b3BDYXA7XHJcbiAgICBjb25zdCBib3R0b21DYXAgPSBvcHRfYm90dG9tQ2FwID09PSB1bmRlZmluZWQgPyB0cnVlIDogb3B0X2JvdHRvbUNhcDtcclxuICAgIGNvbnN0IGV4dHJhID0gKHRvcENhcCA/IDIgOiAwKSArIChib3R0b21DYXAgPyAyIDogMCk7XHJcbiAgICBjb25zdCBudW1WZXJ0aWNlcyA9IChyYWRpYWxTdWJkaXZpc2lvbnMgKyAxKSAqICh2ZXJ0aWNhbFN1YmRpdmlzaW9ucyArIDEgKyBleHRyYSk7XHJcbiAgICBjb25zdCBwb3NpdGlvbnMgPSBbXTtcclxuICAgIGNvbnN0IG5vcm1hbHMgPSBbXTtcclxuICAgIGNvbnN0IHRleGNvb3JkcyA9IFtdO1xyXG4gICAgY29uc3QgaW5kaWNlcyA9IFtdO1xyXG4gICAgY29uc3QgdmVydHNBcm91bmRFZGdlID0gcmFkaWFsU3ViZGl2aXNpb25zICsgMTtcclxuICAgIGNvbnN0IHNsYW50ID0gTWF0aC5hdGFuMihib3R0b21SYWRpdXMgLSB0b3BSYWRpdXMsIGhlaWdodCk7XHJcbiAgICBjb25zdCBjb3NTbGFudCA9IE1hdGguY29zKHNsYW50KTtcclxuICAgIGNvbnN0IHNpblNsYW50ID0gTWF0aC5zaW4oc2xhbnQpO1xyXG4gICAgY29uc3Qgc3RhcnQgPSB0b3BDYXAgPyAtMiA6IDA7XHJcbiAgICBjb25zdCBlbmQgPSB2ZXJ0aWNhbFN1YmRpdmlzaW9ucyArIChib3R0b21DYXAgPyAyIDogMCk7XHJcbiAgICBmb3IgKGxldCB5eSA9IHN0YXJ0OyB5eSA8PSBlbmQ7ICsreXkpIHtcclxuICAgICAgICBsZXQgdiA9IHl5IC8gdmVydGljYWxTdWJkaXZpc2lvbnM7XHJcbiAgICAgICAgbGV0IHkgPSBoZWlnaHQgKiB2O1xyXG4gICAgICAgIGxldCByaW5nUmFkaXVzO1xyXG4gICAgICAgIGlmICh5eSA8IDApIHtcclxuICAgICAgICAgICAgeSA9IDA7XHJcbiAgICAgICAgICAgIHYgPSAxO1xyXG4gICAgICAgICAgICByaW5nUmFkaXVzID0gYm90dG9tUmFkaXVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh5eSA+IHZlcnRpY2FsU3ViZGl2aXNpb25zKSB7XHJcbiAgICAgICAgICAgIHkgPSBoZWlnaHQ7XHJcbiAgICAgICAgICAgIHYgPSAxO1xyXG4gICAgICAgICAgICByaW5nUmFkaXVzID0gdG9wUmFkaXVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmluZ1JhZGl1cyA9XHJcbiAgICAgICAgICAgICAgICBib3R0b21SYWRpdXMgKyAodG9wUmFkaXVzIC0gYm90dG9tUmFkaXVzKSAqICh5eSAvIHZlcnRpY2FsU3ViZGl2aXNpb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHl5ID09PSAtMiB8fCB5eSA9PT0gdmVydGljYWxTdWJkaXZpc2lvbnMgKyAyKSB7XHJcbiAgICAgICAgICAgIHJpbmdSYWRpdXMgPSAwO1xyXG4gICAgICAgICAgICB2ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgeSAtPSBoZWlnaHQgLyAyO1xyXG4gICAgICAgIGZvciAobGV0IGlpID0gMDsgaWkgPCB2ZXJ0c0Fyb3VuZEVkZ2U7ICsraWkpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2luID0gTWF0aC5zaW4oKGlpICogTWF0aC5QSSAqIDIpIC8gcmFkaWFsU3ViZGl2aXNpb25zKTtcclxuICAgICAgICAgICAgY29uc3QgY29zID0gTWF0aC5jb3MoKGlpICogTWF0aC5QSSAqIDIpIC8gcmFkaWFsU3ViZGl2aXNpb25zKTtcclxuICAgICAgICAgICAgcG9zaXRpb25zLnB1c2goc2luICogcmluZ1JhZGl1cywgeSwgY29zICogcmluZ1JhZGl1cyk7XHJcbiAgICAgICAgICAgIGlmICh5eSA8IDApIHtcclxuICAgICAgICAgICAgICAgIG5vcm1hbHMucHVzaCgwLCAtMSwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoeXkgPiB2ZXJ0aWNhbFN1YmRpdmlzaW9ucykge1xyXG4gICAgICAgICAgICAgICAgbm9ybWFscy5wdXNoKDAsIDEsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHJpbmdSYWRpdXMgPT09IDAuMCkge1xyXG4gICAgICAgICAgICAgICAgbm9ybWFscy5wdXNoKDAsIDAsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbm9ybWFscy5wdXNoKHNpbiAqIGNvc1NsYW50LCBzaW5TbGFudCwgY29zICogY29zU2xhbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRleGNvb3Jkcy5wdXNoKGlpIC8gcmFkaWFsU3ViZGl2aXNpb25zLCAxIC0gdik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgeXkgPSAwOyB5eSA8IHZlcnRpY2FsU3ViZGl2aXNpb25zICsgZXh0cmE7ICsreXkpIHtcclxuICAgICAgICBpZiAoKHl5ID09PSAxICYmIHRvcENhcCkgfHxcclxuICAgICAgICAgICAgKHl5ID09PSB2ZXJ0aWNhbFN1YmRpdmlzaW9ucyArIGV4dHJhIC0gMiAmJiBib3R0b21DYXApKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpaSA9IDA7IGlpIDwgcmFkaWFsU3ViZGl2aXNpb25zOyArK2lpKSB7XHJcbiAgICAgICAgICAgIGluZGljZXMucHVzaCh2ZXJ0c0Fyb3VuZEVkZ2UgKiAoeXkgKyAwKSArIDAgKyBpaSwgdmVydHNBcm91bmRFZGdlICogKHl5ICsgMCkgKyAxICsgaWksIHZlcnRzQXJvdW5kRWRnZSAqICh5eSArIDEpICsgMSArIGlpKTtcclxuICAgICAgICAgICAgaW5kaWNlcy5wdXNoKHZlcnRzQXJvdW5kRWRnZSAqICh5eSArIDApICsgMCArIGlpLCB2ZXJ0c0Fyb3VuZEVkZ2UgKiAoeXkgKyAxKSArIDEgKyBpaSwgdmVydHNBcm91bmRFZGdlICogKHl5ICsgMSkgKyAwICsgaWkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IF9wb3NpdGlvbnMgPSBuZXcgRmxvYXQzMkFycmF5KHBvc2l0aW9ucyk7XHJcbiAgICBjb25zdCBfbm9ybWFscyA9IG5ldyBGbG9hdDMyQXJyYXkobm9ybWFscyk7XHJcbiAgICBjb25zdCBfdGV4Y29vcmRzID0gbmV3IEZsb2F0MzJBcnJheSh0ZXhjb29yZHMpO1xyXG4gICAgY29uc3QgX2luZGljZXMgPSBuZXcgVWludDE2QXJyYXkoaW5kaWNlcyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcclxuICAgICAgICAgICAgUE9TSVRJT046IHtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAwLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IHBvc2l0aW9ucy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IDAsXHJcbiAgICAgICAgICAgICAgICBzdHJpZGU6IDAsXHJcbiAgICAgICAgICAgICAgICBudW1Db21wb25lbnRzOiAzLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNTEyNixcclxuICAgICAgICAgICAgICAgIGRhdGE6IF9wb3NpdGlvbnMsXHJcbiAgICAgICAgICAgICAgICBieXRlTGVuZ3RoOiBfcG9zaXRpb25zLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVUeXBlOiBGTE9BVF9WRUMzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIE5PUk1BTDoge1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb246IDEsXHJcbiAgICAgICAgICAgICAgICBjb3VudDogbm9ybWFscy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBudW1Db21wb25lbnRzOiAzLFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAwLFxyXG4gICAgICAgICAgICAgICAgc3RyaWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogNTEyNixcclxuICAgICAgICAgICAgICAgIGRhdGE6IF9ub3JtYWxzLFxyXG4gICAgICAgICAgICAgICAgYnl0ZUxlbmd0aDogX25vcm1hbHMuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZVR5cGU6IEZMT0FUX1ZFQzNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgVEVYQ09PUkRfMDoge1xyXG4gICAgICAgICAgICAgICAgZGF0YTogX3RleGNvb3JkcyxcclxuICAgICAgICAgICAgICAgIGNvdW50OiBfdGV4Y29vcmRzLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IDUxMjYsXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IDAsXHJcbiAgICAgICAgICAgICAgICBzdHJpZGU6IDAsXHJcbiAgICAgICAgICAgICAgICBieXRlTGVuZ3RoOiBfdGV4Y29vcmRzLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogNCxcclxuICAgICAgICAgICAgICAgIG51bUNvbXBvbmVudHM6IDIsXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVUeXBlOiBGTE9BVF9WRUMyXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wb25lbnRUeXBlOiA1MTIzLFxyXG4gICAgICAgIGluZGljZXM6IF9pbmRpY2VzLFxyXG4gICAgICAgIG51bUVsZW1lbnRzOiBpbmRpY2VzLmxlbmd0aCxcclxuICAgICAgICBtb2RlOiA0LFxyXG4gICAgfTtcclxufTtcclxuZXhwb3J0IHsgY3JlYXRlQm94LCBjcmVhdGVDb25lLCBjcmVhdGVDaXJjbGUsIGNyZWF0ZVNwaGVyZSwgY3JlYXRlVHJ1bmNhdGVkQ29uZSB9O1xyXG4iLCJmdW5jdGlvbiBjcmVhdGVVbmlmb3JtU2V0dGVycyhnbCwgcHJvZ3JhbSkge1xyXG4gICAgY29uc3QgY3JlYXRlVGV4dHVyZVNldHRlciA9IChwcm9ncmFtLCB1bmlmb3JtSW5mbykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sIHVuaWZvcm1JbmZvLm5hbWUpO1xyXG4gICAgICAgIHJldHVybiAodGV4QmxvY2tOdW0pID0+IHtcclxuICAgICAgICAgICAgZ2wudW5pZm9ybTFpKGxvY2F0aW9uLCB0ZXhCbG9ja051bSk7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICBmdW5jdGlvbiBjcmVhdGVVbmlmb3JtU2V0dGVyKHByb2dyYW0sIHVuaWZvcm1JbmZvKSB7XHJcbiAgICAgICAgY29uc3QgbG9jYXRpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgdW5pZm9ybUluZm8ubmFtZSk7XHJcbiAgICAgICAgY29uc3QgdHlwZSA9IHVuaWZvcm1JbmZvLnR5cGU7XHJcbiAgICAgICAgY29uc3QgaXNBcnJheSA9IHVuaWZvcm1JbmZvLnNpemUgPiAxICYmIHVuaWZvcm1JbmZvLm5hbWUuc3Vic3RyKC0zKSA9PT0gXCJbMF1cIjtcclxuICAgICAgICBpZiAodHlwZSA9PT0gZ2wuRkxPQVQgJiYgaXNBcnJheSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgICAgIGdsLnVuaWZvcm0xZnYobG9jYXRpb24sIHYpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gZ2wuRkxPQVQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtMWYobG9jYXRpb24sIHYpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gZ2wuRkxPQVRfVkVDMikge1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgICAgIGdsLnVuaWZvcm0yZnYobG9jYXRpb24sIHYpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gZ2wuRkxPQVRfVkVDMykge1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgICAgIGdsLnVuaWZvcm0zZnYobG9jYXRpb24sIHYpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gZ2wuRkxPQVRfVkVDNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgICAgIGdsLnVuaWZvcm00ZnYobG9jYXRpb24sIHYpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gZ2wuSU5UICYmIGlzQXJyYXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtMWl2KGxvY2F0aW9uLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLklOVCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgICAgIGdsLnVuaWZvcm0xaShsb2NhdGlvbiwgdik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSBnbC5JTlRfVkVDMikge1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgICAgIGdsLnVuaWZvcm0yaXYobG9jYXRpb24sIHYpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gZ2wuSU5UX1ZFQzMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtM2l2KGxvY2F0aW9uLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLklOVF9WRUM0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgZ2wudW5pZm9ybTRpdihsb2NhdGlvbiwgdik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSBnbC5CT09MKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgZ2wudW5pZm9ybTFpdihsb2NhdGlvbiwgdik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSBnbC5CT09MX1ZFQzIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtMml2KGxvY2F0aW9uLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLkJPT0xfVkVDMykge1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgICAgIGdsLnVuaWZvcm0zaXYobG9jYXRpb24sIHYpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gZ2wuQk9PTF9WRUM0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgZ2wudW5pZm9ybTRpdihsb2NhdGlvbiwgdik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSBnbC5GTE9BVF9NQVQyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgZ2wudW5pZm9ybU1hdHJpeDJmdihsb2NhdGlvbiwgZmFsc2UsIHYpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gZ2wuRkxPQVRfTUFUMykge1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgICAgIGdsLnVuaWZvcm1NYXRyaXgzZnYobG9jYXRpb24sIGZhbHNlLCB2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IGdsLkZMT0FUX01BVDQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtTWF0cml4NGZ2KGxvY2F0aW9uLCBmYWxzZSwgdik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3QgdW5pZm9ybVNldHRlcnMgPSB7fTtcclxuICAgIGNvbnN0IHRleHR1cmVTZXR0ZXJzID0ge307XHJcbiAgICBjb25zdCBudW1Vbmlmb3JtcyA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuQUNUSVZFX1VOSUZPUk1TKTtcclxuICAgIGZvciAobGV0IGlpID0gMDsgaWkgPCBudW1Vbmlmb3JtczsgKytpaSkge1xyXG4gICAgICAgIGNvbnN0IHVuaWZvcm1JbmZvID0gZ2wuZ2V0QWN0aXZlVW5pZm9ybShwcm9ncmFtLCBpaSk7XHJcbiAgICAgICAgaWYgKCF1bmlmb3JtSW5mbykge1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG5hbWUgPSB1bmlmb3JtSW5mby5uYW1lO1xyXG4gICAgICAgIGlmICh1bmlmb3JtSW5mby50eXBlID09PSBnbC5TQU1QTEVSXzJEKSB7XHJcbiAgICAgICAgICAgIHRleHR1cmVTZXR0ZXJzW25hbWVdID0gY3JlYXRlVGV4dHVyZVNldHRlcihwcm9ncmFtLCB1bmlmb3JtSW5mbyk7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmFtZS5zdWJzdHIoLTMpID09PSBcIlswXVwiKSB7XHJcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lLnN1YnN0cigwLCBuYW1lLmxlbmd0aCAtIDMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodW5pZm9ybUluZm8uc2l6ZSA+IDEpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB1bmlmb3JtSW5mby5zaXplOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9iaiA9IHtcclxuICAgICAgICAgICAgICAgICAgICBzaXplOiB1bmlmb3JtSW5mby5zaXplLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHVuaWZvcm1JbmZvLnR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogbmFtZSArIGBbJHtpfV1gLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHVuaWZvcm1TZXR0ZXJzW25hbWUgKyBgWyR7aX1dYF0gPSBjcmVhdGVVbmlmb3JtU2V0dGVyKHByb2dyYW0sIG9iaik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNldHRlciA9IGNyZWF0ZVVuaWZvcm1TZXR0ZXIocHJvZ3JhbSwgdW5pZm9ybUluZm8pO1xyXG4gICAgICAgICAgICB1bmlmb3JtU2V0dGVyc1tuYW1lXSA9IHNldHRlcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4geyB1bmlmb3JtU2V0dGVycywgdGV4dHVyZVNldHRlcnMgfTtcclxufVxyXG5jbGFzcyBQcm9ncmFtSW5mbyB7XHJcbiAgICBjb25zdHJ1Y3RvcihnbFdyYXBwZXIsIHZlcnRleFNoYWRlclNvdXJjZSwgZnJhZ21lbnRTaGFkZXJTb3VyY2UpIHtcclxuICAgICAgICB0aGlzLnZlcnRleFNoYWRlclNvdXJjZSA9IHZlcnRleFNoYWRlclNvdXJjZTtcclxuICAgICAgICB0aGlzLmZyYWdtZW50U2hhZGVyU291cmNlID0gZnJhZ21lbnRTaGFkZXJTb3VyY2U7XHJcbiAgICAgICAgdGhpcy51bmlmb3JtU2V0dGVycyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy50ZXh0dXJlU2V0dGVycyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy52ZXJ0ZXhTaGFkZXIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZnJhZ21lbnRTaGFkZXIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucHJvZ3JhbSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5nbFdyYXBwZXIgPSBnbFdyYXBwZXI7XHJcbiAgICB9XHJcbiAgICBjcmVhdGVVbmlmb3JtU2V0dGVycygpIHtcclxuICAgICAgICBjb25zdCB7IGdsV3JhcHBlciwgcHJvZ3JhbSB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCB7IGdsIH0gPSBnbFdyYXBwZXI7XHJcbiAgICAgICAgY29uc3QgeyB1bmlmb3JtU2V0dGVycywgdGV4dHVyZVNldHRlcnMgfSA9IGNyZWF0ZVVuaWZvcm1TZXR0ZXJzKGdsLCBwcm9ncmFtKTtcclxuICAgICAgICB0aGlzLnRleHR1cmVTZXR0ZXJzID0gdGV4dHVyZVNldHRlcnM7XHJcbiAgICAgICAgdGhpcy51bmlmb3JtU2V0dGVycyA9IHVuaWZvcm1TZXR0ZXJzO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgY29tcGlsZVNoYWRlcnMoKSB7XHJcbiAgICAgICAgY29uc3QgeyBnbFdyYXBwZXIsIGZyYWdtZW50U2hhZGVyU291cmNlLCB2ZXJ0ZXhTaGFkZXJTb3VyY2UgfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgeyBnbCB9ID0gZ2xXcmFwcGVyO1xyXG4gICAgICAgIHRoaXMudmVydGV4U2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKGdsLlZFUlRFWF9TSEFERVIpO1xyXG4gICAgICAgIGdsLnNoYWRlclNvdXJjZSh0aGlzLnZlcnRleFNoYWRlciwgdmVydGV4U2hhZGVyU291cmNlKTtcclxuICAgICAgICBnbC5jb21waWxlU2hhZGVyKHRoaXMudmVydGV4U2hhZGVyKTtcclxuICAgICAgICBpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlcih0aGlzLnZlcnRleFNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihnbC5nZXRTaGFkZXJJbmZvTG9nKHRoaXMudmVydGV4U2hhZGVyKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZnJhZ21lbnRTaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuRlJBR01FTlRfU0hBREVSKTtcclxuICAgICAgICBnbC5zaGFkZXJTb3VyY2UodGhpcy5mcmFnbWVudFNoYWRlciwgZnJhZ21lbnRTaGFkZXJTb3VyY2UpO1xyXG4gICAgICAgIGdsLmNvbXBpbGVTaGFkZXIodGhpcy5mcmFnbWVudFNoYWRlcik7XHJcbiAgICAgICAgaWYgKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIodGhpcy5mcmFnbWVudFNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihnbC5nZXRTaGFkZXJJbmZvTG9nKHRoaXMuZnJhZ21lbnRTaGFkZXIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xyXG4gICAgICAgIGdsLmF0dGFjaFNoYWRlcih0aGlzLnByb2dyYW0sIHRoaXMudmVydGV4U2hhZGVyKTtcclxuICAgICAgICBnbC5hdHRhY2hTaGFkZXIodGhpcy5wcm9ncmFtLCB0aGlzLmZyYWdtZW50U2hhZGVyKTtcclxuICAgICAgICBnbC5saW5rUHJvZ3JhbSh0aGlzLnByb2dyYW0pO1xyXG4gICAgICAgIGlmICghZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcih0aGlzLnByb2dyYW0sIGdsLkxJTktfU1RBVFVTKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZ2wuZ2V0UHJvZ3JhbUluZm9Mb2codGhpcy5wcm9ncmFtKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2V0VW5pZm9ybXModW5pZm9ybXMpIHtcclxuICAgICAgICBjb25zdCB7IHVuaWZvcm1TZXR0ZXJzLCBnbFdyYXBwZXIgfSA9IHRoaXM7XHJcbiAgICAgICAgZ2xXcmFwcGVyLnVzZVByb2dyYW1JbmZvKHRoaXMpO1xyXG4gICAgICAgIE9iamVjdC5rZXlzKHVuaWZvcm1zKS5mb3JFYWNoKChuYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNldHRlciA9IHVuaWZvcm1TZXR0ZXJzW25hbWVdO1xyXG4gICAgICAgICAgICBpZiAoc2V0dGVyKVxyXG4gICAgICAgICAgICAgICAgc2V0dGVyKHVuaWZvcm1zW25hbWVdKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNldFRleHR1cmVVbmlmb3JtVW5pdChuYW1lLCB1bml0KSB7XHJcbiAgICAgICAgY29uc3QgeyB0ZXh0dXJlU2V0dGVycywgZ2xXcmFwcGVyIH0gPSB0aGlzO1xyXG4gICAgICAgIGdsV3JhcHBlci51c2VQcm9ncmFtSW5mbyh0aGlzKTtcclxuICAgICAgICBjb25zdCBzZXR0ZXIgPSB0ZXh0dXJlU2V0dGVyc1tuYW1lXTtcclxuICAgICAgICBpZiAoc2V0dGVyKVxyXG4gICAgICAgICAgICBzZXR0ZXIodW5pdCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IHsgUHJvZ3JhbUluZm8gfTtcclxuIiwiLypjb25zdCBzZXRDYW52YXNTaXplID0gKGN0eCwgd2lkdGgsIGhlaWdodCkgPT4ge1xyXG4gIGN0eC5jYW52YXMud2lkdGggPSB3aWR0aDtcclxuICBjdHguY2FudmFzLmhlaWdodCA9IGhlaWdodDtcclxufTtcclxuXHJcbmNvbnN0IG1ha2VUZXh0dXJlID0gKGdsLCBjdHgpID0+IHtcclxuICBjb25zdCB0ZXggPSBnbC5jcmVhdGVUZXh0dXJlKCk7XHJcbiAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGV4KTtcclxuXHJcbiAgZ2wudGV4SW1hZ2UyRChcclxuICAgIGdsLlRFWFRVUkVfMkQsXHJcbiAgICAwLFxyXG4gICAgZ2wuUkdCQSxcclxuICAgIGdsLlJHQkEsXHJcbiAgICBnbC5VTlNJR05FRF9CWVRFLFxyXG4gICAgY3R4LmNhbnZhc1xyXG4gICk7XHJcbiAgcmV0dXJuIHRleDtcclxufTtcclxuXHJcbmNvbnN0IG1ha2VTdHJpcGVUZXh0dXJlID0gKGdsLCBvcHRpb25zKSA9PiB7XHJcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgdmFyIHdpZHRoID0gb3B0aW9ucy53aWR0aCB8fCA0O1xyXG4gIHZhciBoZWlnaHQgPSBvcHRpb25zLmhlaWdodCB8fCA0O1xyXG4gIHZhciBjb2xvcjEgPSBvcHRpb25zLmNvbG9yMSB8fCBcInJnYmEoMSwwLDAsMC4xKVwiO1xyXG4gIHZhciBjb2xvcjIgPSBvcHRpb25zLmNvbG9yMiB8fCBcInJnYmEoMSwxLDEsMC41KVwiO1xyXG4gIGNvbnN0IGN0eCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIikuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gIHNldENhbnZhc1NpemUoY3R4LCB3aWR0aCwgaGVpZ2h0KTtcclxuXHJcbiAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yMTtcclxuICBjdHguZmlsbFJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XHJcbiAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yMjtcclxuICBjdHguZmlsbFJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCAvIDIpO1xyXG5cclxuICByZXR1cm4gbWFrZVRleHR1cmUoZ2wsIGN0eCk7XHJcbn07XHJcblxyXG5jb25zdCBtYWtlU3RyaXBlSW1nID0gKG9wdGlvbnMpID0+IHtcclxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICB2YXIgd2lkdGggPSBvcHRpb25zLndpZHRoIHx8IDQ7XHJcbiAgdmFyIGhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0IHx8IDQ7XHJcbiAgdmFyIGNvbG9yMSA9IG9wdGlvbnMuY29sb3IxIHx8IFwicmdiYSgxLDAsMCwwLjUpXCI7XHJcbiAgdmFyIGNvbG9yMiA9IG9wdGlvbnMuY29sb3IyIHx8IFwicmdiYSgwLDAsMSwxKVwiO1xyXG4gIGNvbnN0IGN0eCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIikuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gIHNldENhbnZhc1NpemUoY3R4LCB3aWR0aCwgaGVpZ2h0KTtcclxuXHJcbiAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yMTtcclxuICBjdHguZmlsbFJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XHJcbiAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yMjtcclxuICBjdHguZmlsbFJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCAvIDIpO1xyXG5cclxuICByZXR1cm4gY3R4LmNhbnZhcztcclxufTtcclxuXHJcbmNvbnN0IG1ha2VJbWdGcm9tU3ZnWG1sID0gKHhtbCwgb3B0aW9ucyA9IHt9KSA9PiB7XHJcbiAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcclxuICB2YXIgc3ZnNjQgPSBidG9hKHhtbCk7XHJcbiAgdmFyIGI2NFN0YXJ0ID0gXCJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFwiO1xyXG4gIHZhciBpbWFnZTY0ID0gYjY0U3RhcnQgKyBzdmc2NDtcclxuICBpbWcuc3JjID0gaW1hZ2U2NDtcclxuXHJcbiAgY29uc3Qgd2lkdGggPSBvcHRpb25zLndpZHRoIHx8IDEwMDtcclxuICBjb25zdCBoZWlnaHQgPSBvcHRpb25zLmhlaWdodCB8fCAxMDA7XHJcbiAgY29uc3QgeCA9IG9wdGlvbnMueCB8fCAxO1xyXG4gIGNvbnN0IHkgPSBvcHRpb25zLnkgfHwgNTA7XHJcblxyXG4gIGNvbnN0IGN0eCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIikuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gIHNldENhbnZhc1NpemUoY3R4LCB3aWR0aCwgaGVpZ2h0KTtcclxuXHJcbiAgY3R4LmRyYXdJbWFnZShpbWcsIHgsIHksIHdpZHRoLCBoZWlnaHQpO1xyXG4gIGN0eC5maWxsU3R5bGUgPSBcInJnYmEoMCwwLDAsMSlcIjtcclxuICBjdHguZmlsbFJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XHJcbiAgcmV0dXJuIGN0eC5pbWc7XHJcbn07XHJcbiovXHJcbmNvbnN0IHJlcXVlc3RDT1JTSWZOb3RTYW1lT3JpZ2luID0gKGltZywgdXJsKSA9PiB7XHJcbiAgICBpZiAobmV3IFVSTCh1cmwsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKS5vcmlnaW4gIT09IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pIHtcclxuICAgICAgICBpbWcuY3Jvc3NPcmlnaW4gPSBcIlwiO1xyXG4gICAgfVxyXG59O1xyXG5jbGFzcyBUZXh0dXJlSW5mbyB7XHJcbiAgICBjb25zdHJ1Y3RvcihnbCkge1xyXG4gICAgICAgIHRoaXMud2lkdGggPSBudWxsO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmdsID0gZ2w7XHJcbiAgICB9XHJcbiAgICBjcmVhdGVUZXh0dXJlRnJvbVVSTCh1cmwpIHtcclxuICAgICAgICBjb25zdCB7IGdsIH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IHRleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XHJcbiAgICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZSk7XHJcbiAgICAgICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCAxLCAxLCAwLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCBuZXcgVWludDhBcnJheShbMCwgMCwgMjU1LCAyNTVdKSk7XHJcbiAgICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgaW1nLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IGltZy53aWR0aDtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBpbWcuaGVpZ2h0O1xyXG4gICAgICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0ZXh0dXJlKTtcclxuICAgICAgICAgICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCBpbWcpO1xyXG4gICAgICAgICAgICBnbC5nZW5lcmF0ZU1pcG1hcChnbC5URVhUVVJFXzJEKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXF1ZXN0Q09SU0lmTm90U2FtZU9yaWdpbihpbWcsIHVybCk7XHJcbiAgICAgICAgaW1nLnNyYyA9IHVybDtcclxuICAgICAgICB0aGlzLnRleHR1cmUgPSB0ZXh0dXJlO1xyXG4gICAgICAgIHJldHVybiB0ZXh0dXJlO1xyXG4gICAgfVxyXG4gICAgc2V0VGV4dHVyZVVuaXQodW5pdE51bSkge1xyXG4gICAgICAgIGNvbnN0IHsgZ2wsIHRleHR1cmUgfSA9IHRoaXM7XHJcbiAgICAgICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMCArIHVuaXROdW0pO1xyXG4gICAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleHR1cmUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCB7IFRleHR1cmVJbmZvIH07XHJcbiIsImNvbnN0IHByb3BzID0ge1xyXG4gICAgbWF0NDoge1xyXG4gICAgICAgIHN0cmlkZTogNjQsXHJcbiAgICAgICAgYnl0ZUxlbmd0aDogNjQsXHJcbiAgICAgICAgdHlwZTogMHgxNDA2LFxyXG4gICAgICAgIG51bUF0dHJpYnV0ZXM6IDQsXHJcbiAgICAgICAgbnVtQ29tcG9uZW50czogNCxcclxuICAgIH0sXHJcbiAgICB2ZWMzOiB7XHJcbiAgICAgICAgbnVtQ29tcG9uZW50czogMyxcclxuICAgICAgICB0eXBlOiAweDE0MDYsXHJcbiAgICAgICAgbnVtQXR0cmlidXRlczogMSxcclxuICAgIH0sXHJcbn07XHJcbmNvbnN0IGdldEF0dHJpYnV0ZVByb3BzQnlUeXBlID0gKHR5cGUpID0+IHByb3BzW3R5cGVdO1xyXG5leHBvcnQgZGVmYXVsdCBnZXRBdHRyaWJ1dGVQcm9wc0J5VHlwZTtcclxuIiwiY29uc3QgVFlQRURfQVJSQVlTID0ge1xyXG4gICAgNTEyMDogSW50OEFycmF5LFxyXG4gICAgNTEyMTogVWludDhBcnJheSxcclxuICAgIDUxMjI6IEludDE2QXJyYXksXHJcbiAgICA1MTIzOiBVaW50MTZBcnJheSxcclxuICAgIDUxMjQ6IEludDMyQXJyYXksXHJcbiAgICA1MTI1OiBVaW50MzJBcnJheSxcclxuICAgIDUxMjY6IEZsb2F0MzJBcnJheSxcclxufTtcclxuY29uc3QgTlVNX0NPTVBPTkVOVFMgPSB7XHJcbiAgICBTQ0FMQVI6IDEsXHJcbiAgICBWRUMyOiAyLFxyXG4gICAgVkVDMzogMyxcclxuICAgIFZFQzQ6IDQsXHJcbiAgICBNQVQyOiA0LFxyXG4gICAgTUFUMzogOSxcclxuICAgIE1BVDQ6IDE2LFxyXG59O1xyXG5jb25zdCBMT0NBVElPTlMgPSB7XHJcbiAgICBQT1NJVElPTjogMCxcclxuICAgIE5PUk1BTDogMSxcclxuICAgIFdFSUdIVFNfMDogMixcclxuICAgIEpPSU5UU18wOiAzLFxyXG4gICAgVEVYQ09PUkRfMDogNCxcclxufTtcclxuY29uc3QgRUxFTUVOVF9TSVpFID0ge1xyXG4gICAgMHgxNDA2OiA0LFxyXG59O1xyXG5jb25zdCBURVhUVVJFMCA9IDB4ODRjMDtcclxuY29uc3QgRFlOQU1JQ19EUkFXID0gMHg4OGU4O1xyXG5jb25zdCBBUlJBWV9CVUZGRVIgPSAweDg4OTI7XHJcbmNvbnN0IEVMRU1FTlRfQVJSQVlfQlVGRkVSID0gMHg4ODkzO1xyXG5jb25zdCBVTklGT1JNX0JVRkZFUiA9IDB4OGExMTtcclxuY29uc3QgVFJBTlNGT1JNX0ZFRURCQUNLX0JVRkZFUiA9IDB4OGM4ZTtcclxuY29uc3QgVFJBTlNGT1JNX0ZFRURCQUNLID0gMHg4ZTIyO1xyXG5jb25zdCBDT01QSUxFX1NUQVRVUyA9IDB4OGI4MTtcclxuY29uc3QgTElOS19TVEFUVVMgPSAweDhiODI7XHJcbmNvbnN0IEZSQUdNRU5UX1NIQURFUiA9IDB4OGIzMDtcclxuY29uc3QgVkVSVEVYX1NIQURFUiA9IDB4OGIzMTtcclxuY29uc3QgU0VQQVJBVEVfQVRUUklCUyA9IDB4OGM4ZDtcclxuY29uc3QgQUNUSVZFX1VOSUZPUk1TID0gMHg4Yjg2O1xyXG5jb25zdCBBQ1RJVkVfQVRUUklCVVRFUyA9IDB4OGI4OTtcclxuY29uc3QgVFJBTlNGT1JNX0ZFRURCQUNLX1ZBUllJTkdTID0gMHg4YzgzO1xyXG5jb25zdCBBQ1RJVkVfVU5JRk9STV9CTE9DS1MgPSAweDhhMzY7XHJcbmNvbnN0IFVOSUZPUk1fQkxPQ0tfUkVGRVJFTkNFRF9CWV9WRVJURVhfU0hBREVSID0gMHg4YTQ0O1xyXG5jb25zdCBVTklGT1JNX0JMT0NLX1JFRkVSRU5DRURfQllfRlJBR01FTlRfU0hBREVSID0gMHg4YTQ2O1xyXG5jb25zdCBVTklGT1JNX0JMT0NLX0RBVEFfU0laRSA9IDB4OGE0MDtcclxuY29uc3QgVU5JRk9STV9CTE9DS19BQ1RJVkVfVU5JRk9STV9JTkRJQ0VTID0gMHg4YTQzO1xyXG5jb25zdCBGTE9BVCA9IDB4MTQwNjtcclxuY29uc3QgRkxPQVRfVkVDMiA9IDB4OGI1MDtcclxuY29uc3QgRkxPQVRfVkVDMyA9IDB4OGI1MTtcclxuY29uc3QgRkxPQVRfVkVDNCA9IDB4OGI1MjtcclxuY29uc3QgSU5UID0gMHgxNDA0O1xyXG5jb25zdCBJTlRfVkVDMiA9IDB4OGI1MztcclxuY29uc3QgSU5UX1ZFQzMgPSAweDhiNTQ7XHJcbmNvbnN0IElOVF9WRUM0ID0gMHg4YjU1O1xyXG5jb25zdCBCT09MID0gMHg4YjU2O1xyXG5jb25zdCBCT09MX1ZFQzIgPSAweDhiNTc7XHJcbmNvbnN0IEJPT0xfVkVDMyA9IDB4OGI1ODtcclxuY29uc3QgQk9PTF9WRUM0ID0gMHg4YjU5O1xyXG5jb25zdCBGTE9BVF9NQVQyID0gMHg4YjVhO1xyXG5jb25zdCBGTE9BVF9NQVQzID0gMHg4YjViO1xyXG5jb25zdCBGTE9BVF9NQVQ0ID0gMHg4YjVjO1xyXG5jb25zdCBTQU1QTEVSXzJEID0gMHg4YjVlO1xyXG5jb25zdCBTQU1QTEVSX0NVQkUgPSAweDhiNjA7XHJcbmNvbnN0IFNBTVBMRVJfM0QgPSAweDhiNWY7XHJcbmNvbnN0IFNBTVBMRVJfMkRfU0hBRE9XID0gMHg4YjYyO1xyXG5jb25zdCBGTE9BVF9NQVQyeDMgPSAweDhiNjU7XHJcbmNvbnN0IEZMT0FUX01BVDJ4NCA9IDB4OGI2NjtcclxuY29uc3QgRkxPQVRfTUFUM3gyID0gMHg4YjY3O1xyXG5jb25zdCBGTE9BVF9NQVQzeDQgPSAweDhiNjg7XHJcbmNvbnN0IEZMT0FUX01BVDR4MiA9IDB4OGI2OTtcclxuY29uc3QgRkxPQVRfTUFUNHgzID0gMHg4YjZhO1xyXG5jb25zdCBTQU1QTEVSXzJEX0FSUkFZID0gMHg4ZGMxO1xyXG5jb25zdCBTQU1QTEVSXzJEX0FSUkFZX1NIQURPVyA9IDB4OGRjNDtcclxuY29uc3QgU0FNUExFUl9DVUJFX1NIQURPVyA9IDB4OGRjNTtcclxuY29uc3QgVU5TSUdORURfSU5UID0gMHgxNDA1O1xyXG5jb25zdCBVTlNJR05FRF9JTlRfVkVDMiA9IDB4OGRjNjtcclxuY29uc3QgVU5TSUdORURfSU5UX1ZFQzMgPSAweDhkYzc7XHJcbmNvbnN0IFVOU0lHTkVEX0lOVF9WRUM0ID0gMHg4ZGM4O1xyXG5jb25zdCBJTlRfU0FNUExFUl8yRCA9IDB4OGRjYTtcclxuY29uc3QgSU5UX1NBTVBMRVJfM0QgPSAweDhkY2I7XHJcbmNvbnN0IElOVF9TQU1QTEVSX0NVQkUgPSAweDhkY2M7XHJcbmNvbnN0IElOVF9TQU1QTEVSXzJEX0FSUkFZID0gMHg4ZGNmO1xyXG5jb25zdCBVTlNJR05FRF9JTlRfU0FNUExFUl8yRCA9IDB4OGRkMjtcclxuY29uc3QgVU5TSUdORURfSU5UX1NBTVBMRVJfM0QgPSAweDhkZDM7XHJcbmNvbnN0IFVOU0lHTkVEX0lOVF9TQU1QTEVSX0NVQkUgPSAweDhkZDQ7XHJcbmNvbnN0IFVOU0lHTkVEX0lOVF9TQU1QTEVSXzJEX0FSUkFZID0gMHg4ZGQ3O1xyXG5jb25zdCBURVhUVVJFXzJEID0gMHgwZGUxO1xyXG5jb25zdCBURVhUVVJFX0NVQkVfTUFQID0gMHg4NTEzO1xyXG5jb25zdCBURVhUVVJFXzNEID0gMHg4MDZmO1xyXG5jb25zdCBURVhUVVJFXzJEX0FSUkFZID0gMHg4YzFhO1xyXG5leHBvcnQgeyBMT0NBVElPTlMsIE5VTV9DT01QT05FTlRTLCBUWVBFRF9BUlJBWVMsIEVMRU1FTlRfU0laRSwgRkxPQVQsIEZMT0FUX01BVDIsIEZMT0FUX01BVDJ4MywgRkxPQVRfTUFUNCwgRkxPQVRfTUFUMng0LCBVTlNJR05FRF9JTlQsIEZMT0FUX01BVDMsIFVOU0lHTkVEX0lOVF9WRUMyLCBVTlNJR05FRF9JTlRfVkVDMywgVU5TSUdORURfSU5UX1ZFQzQsIEZMT0FUX1ZFQzIsIEZMT0FUX1ZFQzMsIEZMT0FUX1ZFQzQsIElOVCwgSU5UX1ZFQzIsIElOVF9WRUMzLCBJTlRfVkVDNCwgQk9PTCwgQk9PTF9WRUMyLCBCT09MX1ZFQzMsIEJPT0xfVkVDNCB9O1xyXG4iLCJpbXBvcnQgeyBQcmltaXRpdmVSZW5kZXJJbmZvRnJvbUFycmF5RGF0YSwgQXJyYXlEYXRhRnJvbUdsdGYsIEVudGl0eURhdGFGcm9tR2x0ZiwgR0xURiwgfSBmcm9tIFwiLi9jb21wb25lbnRzL0dsdGZVdGlsc1wiO1xyXG5pbXBvcnQgeyBNZXNoUmVuZGVyZXIsIFNraW5uZWRNZXNoUmVuZGVyZXIgfSBmcm9tIFwiLi9jb21wb25lbnRzL01lc2hSZW5kZXJlclwiO1xyXG5pbXBvcnQgeyBjcmVhdGVCb3gsIGNyZWF0ZUNvbmUsIGNyZWF0ZUNpcmNsZSwgY3JlYXRlU3BoZXJlLCBjcmVhdGVUcnVuY2F0ZWRDb25lIH0gZnJvbSBcIi4vY29tcG9uZW50cy9QcmltaXRpdmVzXCI7XHJcbmltcG9ydCBQcmltaXRpdmVSZW5kZXJlciBmcm9tIFwiLi9jb21wb25lbnRzL1ByaW1pdGl2ZVJlbmRlcmVyXCI7XHJcbmltcG9ydCB7IFByb2dyYW1JbmZvLCB9IGZyb20gXCIuL2NvbXBvbmVudHMvUHJvZ3JhbUluZm9cIjtcclxuaW1wb3J0IERyYXdlciBmcm9tIFwiLi9jb21wb25lbnRzL0RyYXdlclwiO1xyXG5pbXBvcnQgeyBUZXh0dXJlSW5mbywgfSBmcm9tIFwiLi9jb21wb25lbnRzL1RleHR1cmVJbmZvXCI7XHJcbmltcG9ydCBNb2RlbCBmcm9tIFwiLi9jb21wb25lbnRzL01vZGVsXCI7XHJcbmltcG9ydCB7IGRlZmF1bHRTaGFkZXJzLCBwb2ludExpZ2h0U2hhZGVycyB9IGZyb20gXCIuL3JlbmRlci9zaGFkZXJzXCI7XHJcbmltcG9ydCBHTGNvbnRleHRXcmFwcGVyIGZyb20gXCIuL2NvbXBvbmVudHMvR0xXcmFwcGVyXCI7XHJcbmV4cG9ydCB7IEdMVEYsIEdMY29udGV4dFdyYXBwZXIsIFRleHR1cmVJbmZvLCBNb2RlbCwgUHJpbWl0aXZlUmVuZGVyZXIsIEVudGl0eURhdGFGcm9tR2x0ZiwgUHJpbWl0aXZlUmVuZGVySW5mb0Zyb21BcnJheURhdGEsIEFycmF5RGF0YUZyb21HbHRmLCBNZXNoUmVuZGVyZXIsIFNraW5uZWRNZXNoUmVuZGVyZXIsIGNyZWF0ZUJveCwgUHJvZ3JhbUluZm8sIERyYXdlciwgY3JlYXRlQ29uZSwgY3JlYXRlQ2lyY2xlLCBkZWZhdWx0U2hhZGVycywgcG9pbnRMaWdodFNoYWRlcnMsIGNyZWF0ZVNwaGVyZSwgY3JlYXRlVHJ1bmNhdGVkQ29uZSB9O1xyXG4iLCJleHBvcnQgZGVmYXVsdCBgI3ZlcnNpb24gMzAwIGVzXHJcbnByZWNpc2lvbiBoaWdocCBmbG9hdDtcclxuIFxyXG5cclxuXHJcbnVuaWZvcm0gdmVjNCB1X2NvbG9yO1xyXG5vdXQgdmVjNCBvdXRDb2xvcjtcclxudm9pZCBtYWluKCkge1xyXG4gIFxyXG4gIFxyXG4gIG91dENvbG9yID0gdV9jb2xvcjtcclxuIFxyXG4gIFxyXG4gIFxyXG59YDtcclxuIiwiaW1wb3J0IHZlcnQgZnJvbSAnLi92ZXJ0LmpzJztcclxuaW1wb3J0IGZyYWcgZnJvbSAnLi9mcmFnLmpzJztcclxuZXhwb3J0IGRlZmF1bHQgeyB2ZXJ0LCBmcmFnIH07XHJcbiIsImV4cG9ydCBkZWZhdWx0IGAjdmVyc2lvbiAzMDAgZXNcclxuXHJcbnByZWNpc2lvbiBoaWdocCBmbG9hdDtcclxuXHJcbnVuaWZvcm0gbWF0NCB1X3dvcmxkVmlld1Byb2plY3Rpb247XHJcblxyXG5cclxubGF5b3V0KGxvY2F0aW9uID0gMCkgaW4gdmVjNCBhX3Bvc2l0aW9uO1xyXG52b2lkIG1haW4oKSB7XHJcbiAgZ2xfUG9zaXRpb24gPSB1X3dvcmxkVmlld1Byb2plY3Rpb24gKiBhX3Bvc2l0aW9uO1xyXG4gIGdsX1BvaW50U2l6ZSA9IDEwLjA7XHJcbn1gO1xyXG4iLCJpbXBvcnQgZGVmYXVsdFNoYWRlcnMgZnJvbSBcIi4vZGVmYXVsdFwiO1xyXG5pbXBvcnQgcG9pbnRMaWdodFNoYWRlcnMgZnJvbSBcIi4vcG9pbnRMaWdodFwiO1xyXG5leHBvcnQgeyBkZWZhdWx0U2hhZGVycywgcG9pbnRMaWdodFNoYWRlcnMgfTtcclxuIiwiZXhwb3J0IGRlZmF1bHQgYCN2ZXJzaW9uIDMwMCBlc1xyXG5wcmVjaXNpb24gaGlnaHAgZmxvYXQ7XHJcbiBcclxuXHJcblxyXG5cclxuaW4gdmVjMyB2X25vcm1hbDtcclxuaW4gdmVjMyB2X3N1cmZhY2VUb1ZpZXc7XHJcbmluIHZlYzMgdl9zdXJmYWNlVG9MaWdodDtcclxuXHJcblxyXG4vL3VuaWZvcm0gc2FtcGxlcjJEIHVfdGV4dHVyZTE7XHJcbnVuaWZvcm0gZmxvYXQgdV9zaGluaW5lc3M7XHJcbnVuaWZvcm0gdmVjNCB1X2NvbG9yO1xyXG51bmlmb3JtIHZlYzQgdV9hbWJpZW50TGlnaHQ7XHJcbm91dCB2ZWM0IG91dENvbG9yO1xyXG5cclxuXHJcbnZvaWQgbWFpbigpIHtcclxuICBcclxuICB2ZWMzIHN1cmZhY2VUb0xpZ2h0RGlyZWN0aW9uID0gbm9ybWFsaXplKHZfc3VyZmFjZVRvTGlnaHQpO1xyXG4gIHZlYzMgc3VyZmFjZVRvVmlld0RpcmVjdGlvbiA9IG5vcm1hbGl6ZSh2X3N1cmZhY2VUb1ZpZXcpO1xyXG4gIHZlYzMgaGFsZlZlY3RvciA9IG5vcm1hbGl6ZShzdXJmYWNlVG9MaWdodERpcmVjdGlvbiArIHN1cmZhY2VUb1ZpZXdEaXJlY3Rpb24pO1xyXG5cclxuICB2ZWMzIG5vcm1hbCA9IG5vcm1hbGl6ZSh2X25vcm1hbCk7XHJcbiAgZmxvYXQgbGlnaHQgPSBkb3Qobm9ybWFsLCBzdXJmYWNlVG9MaWdodERpcmVjdGlvbik7XHJcbiAgZmxvYXQgc3BlY3VsYXIgPSAwLjA7XHJcbiAgaWYgKGxpZ2h0ID4gMC4wKSB7XHJcbiAgICBzcGVjdWxhciA9IHBvdyhkb3Qobm9ybWFsLCBoYWxmVmVjdG9yKSwgdV9zaGluaW5lc3MpO1xyXG4gIH1cclxuICBcclxuICBvdXRDb2xvciA9ICB1X2NvbG9yO1xyXG4gIG91dENvbG9yLnJnYiAqPSBsaWdodDtcclxuICBvdXRDb2xvci5yZ2IgKz0gc3BlY3VsYXI7XHJcblxyXG4gIG91dENvbG9yLnJnYiArPSB1X2FtYmllbnRMaWdodC5yZ2IgKjAuMztcclxuICBcclxufWA7XHJcbiIsImltcG9ydCB2ZXJ0IGZyb20gJy4vdmVydC5qcyc7XHJcbmltcG9ydCBmcmFnIGZyb20gJy4vZnJhZy5qcyc7XHJcbmV4cG9ydCBkZWZhdWx0IHsgdmVydCwgZnJhZyB9O1xyXG4iLCJleHBvcnQgZGVmYXVsdCBgI3ZlcnNpb24gMzAwIGVzXHJcbiBcclxubGF5b3V0KGxvY2F0aW9uID0gMCkgaW4gdmVjNCBhX3Bvc2l0aW9uO1xyXG5sYXlvdXQobG9jYXRpb24gPSAxKSBpbiB2ZWMzIGFfbm9ybWFsO1xyXG5cclxuXHJcbnVuaWZvcm0gbWF0NCB1X21hdHJpeDtcclxudW5pZm9ybSBtYXQ0IHVfd29ybGRWaWV3UHJvamVjdGlvbjtcclxudW5pZm9ybSB2ZWMzIHVfbGlnaHRXb3JsZFBvc2l0aW9uO1xyXG51bmlmb3JtIHZlYzMgdV92aWV3V29ybGRQb3NpdGlvbjtcclxuXHJcbm91dCB2ZWMzIHZfbm9ybWFsO1xyXG5vdXQgdmVjMyB2X3N1cmZhY2VUb0xpZ2h0O1xyXG5vdXQgdmVjMyB2X3N1cmZhY2VUb1ZpZXc7XHJcbnZvaWQgbWFpbigpIHtcclxuICAgIFxyXG4gICAgZ2xfUG9zaXRpb24gPSB1X3dvcmxkVmlld1Byb2plY3Rpb24gKiBhX3Bvc2l0aW9uO1xyXG4gICAgXHJcbiAgICB2ZWMzIHN1cmZhY2VXb3JsZFBvc2l0aW9uID0gKHVfbWF0cml4ICogYV9wb3NpdGlvbikueHl6O1xyXG4gICAgXHJcbiAgICB2X3N1cmZhY2VUb0xpZ2h0ID0gdV9saWdodFdvcmxkUG9zaXRpb24gLSBzdXJmYWNlV29ybGRQb3NpdGlvbjtcclxuXHJcbiAgICB2X25vcm1hbCA9IG1hdDMoICB1X21hdHJpeCApICogYV9ub3JtYWw7XHJcbiAgICBcclxuICAgIHZfc3VyZmFjZVRvVmlldyA9IHVfdmlld1dvcmxkUG9zaXRpb24gLSBzdXJmYWNlV29ybGRQb3NpdGlvbjtcclxuICAgICAgXHJcbn1gO1xyXG4iLCJpbXBvcnQgQUFCQiwgeyBnZXRDZW50ZXIsIGdldERpYWdvbmFsLCBpc0NvbGxpZGUgfSBmcm9tIFwiLi9hYWJiXCI7XHJcbmltcG9ydCB2MyBmcm9tIFwiLi92M1wiO1xyXG5jb25zdCBlbGVtZW50U2l6ZSA9IDE7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9jdHJlZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihhYWJiKSB7XHJcbiAgICAgICAgdGhpcy5hYWJiID0gYWFiYjtcclxuICAgICAgICB0aGlzLmRpYWdvbmFsID0gZ2V0RGlhZ29uYWwoYWFiYik7XHJcbiAgICAgICAgdGhpcy5jZW50ZXIgPSBnZXRDZW50ZXIoYWFiYik7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcclxuICAgICAgICB0aGlzLmNhcGFjaXR5ID0gNDtcclxuICAgIH1cclxuICAgIHN1YmRpdmlkZSgpIHtcclxuICAgICAgICBjb25zdCBtaW4gPSB0aGlzLmFhYmIubWluO1xyXG4gICAgICAgIGNvbnN0IG1heCA9IHRoaXMuYWFiYi5tYXg7XHJcbiAgICAgICAgY29uc3QgW3gxLCB5MSwgejFdID0gbWluO1xyXG4gICAgICAgIGNvbnN0IFt4MiwgeTIsIHoyXSA9IG1heDtcclxuICAgICAgICBjb25zdCB4YyA9IHRoaXMuY2VudGVyWzBdO1xyXG4gICAgICAgIGNvbnN0IHljID0gdGhpcy5jZW50ZXJbMV07XHJcbiAgICAgICAgY29uc3QgemMgPSB0aGlzLmNlbnRlclsyXTtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuWzBdID0gbmV3IE9jdHJlZShuZXcgQUFCQihbeDEsIHkxLCB6MV0sIFt4YywgeWMsIHpjXSkpO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5bMV0gPSBuZXcgT2N0cmVlKG5ldyBBQUJCKFt4MSwgeTEsIHpjXSwgW3hjLCB5YywgejJdKSk7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlblsyXSA9IG5ldyBPY3RyZWUobmV3IEFBQkIoW3gxLCB5YywgejFdLCBbeGMsIHkyLCB6Y10pKTtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuWzNdID0gbmV3IE9jdHJlZShuZXcgQUFCQihbeDEsIHljLCB6Y10sIFt4YywgeTIsIHoyXSkpO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5bNF0gPSBuZXcgT2N0cmVlKG5ldyBBQUJCKFt4YywgeTEsIHoxXSwgW3gyLCB5YywgemNdKSk7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbls1XSA9IG5ldyBPY3RyZWUobmV3IEFBQkIoW3hjLCB5MSwgemNdLCBbeDIsIHljLCB6Ml0pKTtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuWzZdID0gbmV3IE9jdHJlZShuZXcgQUFCQihbeGMsIHljLCB6MV0sIFt4MiwgeTIsIHpjXSkpO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5bN10gPSBuZXcgT2N0cmVlKG5ldyBBQUJCKFt4YywgeWMsIHpjXSwgW3gyLCB5MiwgejJdKSk7XHJcbiAgICB9XHJcbiAgICBpbnNlcnQodm94ZWwpIHtcclxuICAgICAgICBpZiAodGhpcy5lbGVtZW50cy5sZW5ndGggPCB0aGlzLmNhcGFjaXR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudHMucHVzaCh2b3hlbCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID09PSAwKVxyXG4gICAgICAgICAgICB0aGlzLnN1YmRpdmlkZSgpO1xyXG4gICAgICAgIGNvbnN0IHhjID0gdGhpcy5jZW50ZXJbMF07XHJcbiAgICAgICAgY29uc3QgeWMgPSB0aGlzLmNlbnRlclsxXTtcclxuICAgICAgICBjb25zdCB6YyA9IHRoaXMuY2VudGVyWzJdO1xyXG4gICAgICAgIGNvbnN0IHggPSBOdW1iZXIodm94ZWxbMF0gPiB4YykgKiA0O1xyXG4gICAgICAgIGNvbnN0IHkgPSBOdW1iZXIodm94ZWxbMV0gPiB5YykgKiAyO1xyXG4gICAgICAgIGNvbnN0IHogPSBOdW1iZXIodm94ZWxbMl0gPiB6Yyk7XHJcbiAgICAgICAgY29uc3QgaWR4ID0geiB8IHkgfCB4O1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5baWR4XS5pbnNlcnQodm94ZWwpO1xyXG4gICAgfVxyXG4gICAgcXVlcnkoYWFiYikge1xyXG4gICAgICAgIGNvbnN0IGZvdW5kID0gW107XHJcbiAgICAgICAgaWYgKCFpc0NvbGxpZGUodGhpcy5hYWJiLCBhYWJiKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZm91bmQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgY29uc3QgX2FhYmIgPSBuZXcgQUFCQih2My5zdW0oZWxlbWVudCwgWy0wLjUsIC0wLjUsIC0wLjVdKSwgdjMuc3VtKGVsZW1lbnQsIFswLjUsIDAuNSwgMC41XSkpO1xyXG4gICAgICAgICAgICBpZiAoaXNDb2xsaWRlKGFhYmIsIF9hYWJiKSkge1xyXG4gICAgICAgICAgICAgICAgZm91bmQucHVzaChlbGVtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgICAgICAgIGZvdW5kLnB1c2goLi4uY2hpbGQucXVlcnkoYWFiYikpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBmb3VuZDtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgdjMgZnJvbSBcIi4vdjNcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQUFCQiB7XHJcbiAgICBjb25zdHJ1Y3RvcihtaW4sIG1heCkge1xyXG4gICAgICAgIHRoaXMubWluID0gbWluO1xyXG4gICAgICAgIHRoaXMubWF4ID0gbWF4O1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjb25zdCBpc0NvbGxpZGUgPSAoYWFiYjEsIGFhYmIyKSA9PiB7XHJcbiAgICBpZiAoYWFiYjEubWluWzBdIDw9IGFhYmIyLm1heFswXSAmJlxyXG4gICAgICAgIGFhYmIxLm1heFswXSA+PSBhYWJiMi5taW5bMF0gJiZcclxuICAgICAgICBhYWJiMS5taW5bMV0gPD0gYWFiYjIubWF4WzFdICYmXHJcbiAgICAgICAgYWFiYjEubWF4WzFdID49IGFhYmIyLm1pblsxXSAmJlxyXG4gICAgICAgIGFhYmIxLm1pblsyXSA8PSBhYWJiMi5tYXhbMl0gJiZcclxuICAgICAgICBhYWJiMS5tYXhbMl0gPj0gYWFiYjIubWluWzJdKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRDZW50ZXIgPSAoYWFiYikgPT4ge1xyXG4gICAgY29uc3Qgc3VtID0gdjMuc3VtKGFhYmIubWF4LCBhYWJiLm1pbik7XHJcbiAgICByZXR1cm4gW3N1bVswXSAvIDIsIHN1bVsxXSAvIDIsIHN1bVsyXSAvIDJdO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZ2V0RGlhZ29uYWwgPSAoYWFiYikgPT4gdjMuZGlmZihhYWJiLm1heCwgYWFiYi5taW4pO1xyXG5leHBvcnQgY29uc3QgY29udGFpbnMgPSAoYWFiYiwgcCkgPT4geyB9O1xyXG4iLCJpbXBvcnQgQUFCQiBmcm9tIFwiLi9hYWJiXCI7XHJcbmltcG9ydCB2MyBmcm9tIFwiLi92M1wiO1xyXG5pbXBvcnQgbTMgZnJvbSBcIi4vbTNcIjtcclxuaW1wb3J0IG00IGZyb20gXCIuL200XCI7XHJcbmltcG9ydCBPY3RyZWUgZnJvbSBcIi4vT2N0cmVlXCI7XHJcbmV4cG9ydCB7IEFBQkIsIHYzLCBtNCwgbTMsIE9jdHJlZSB9O1xyXG4iLCJjb25zdCBtMyA9IHtcclxuICAgIG11bHRpcGx5OiBmdW5jdGlvbiAoYiwgYSkge1xyXG4gICAgICAgIGNvbnN0IGEwMCA9IGFbMCAqIDMgKyAwXTtcclxuICAgICAgICBjb25zdCBhMDEgPSBhWzAgKiAzICsgMV07XHJcbiAgICAgICAgY29uc3QgYTAyID0gYVswICogMyArIDJdO1xyXG4gICAgICAgIGNvbnN0IGExMCA9IGFbMSAqIDMgKyAwXTtcclxuICAgICAgICBjb25zdCBhMTEgPSBhWzEgKiAzICsgMV07XHJcbiAgICAgICAgY29uc3QgYTEyID0gYVsxICogMyArIDJdO1xyXG4gICAgICAgIGNvbnN0IGEyMCA9IGFbMiAqIDMgKyAwXTtcclxuICAgICAgICBjb25zdCBhMjEgPSBhWzIgKiAzICsgMV07XHJcbiAgICAgICAgY29uc3QgYTIyID0gYVsyICogMyArIDJdO1xyXG4gICAgICAgIGNvbnN0IGIwMCA9IGJbMCAqIDMgKyAwXTtcclxuICAgICAgICBjb25zdCBiMDEgPSBiWzAgKiAzICsgMV07XHJcbiAgICAgICAgY29uc3QgYjAyID0gYlswICogMyArIDJdO1xyXG4gICAgICAgIGNvbnN0IGIxMCA9IGJbMSAqIDMgKyAwXTtcclxuICAgICAgICBjb25zdCBiMTEgPSBiWzEgKiAzICsgMV07XHJcbiAgICAgICAgY29uc3QgYjEyID0gYlsxICogMyArIDJdO1xyXG4gICAgICAgIGNvbnN0IGIyMCA9IGJbMiAqIDMgKyAwXTtcclxuICAgICAgICBjb25zdCBiMjEgPSBiWzIgKiAzICsgMV07XHJcbiAgICAgICAgY29uc3QgYjIyID0gYlsyICogMyArIDJdO1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIGIwMCAqIGEwMCArIGIwMSAqIGExMCArIGIwMiAqIGEyMCxcclxuICAgICAgICAgICAgYjAwICogYTAxICsgYjAxICogYTExICsgYjAyICogYTIxLFxyXG4gICAgICAgICAgICBiMDAgKiBhMDIgKyBiMDEgKiBhMTIgKyBiMDIgKiBhMjIsXHJcbiAgICAgICAgICAgIGIxMCAqIGEwMCArIGIxMSAqIGExMCArIGIxMiAqIGEyMCxcclxuICAgICAgICAgICAgYjEwICogYTAxICsgYjExICogYTExICsgYjEyICogYTIxLFxyXG4gICAgICAgICAgICBiMTAgKiBhMDIgKyBiMTEgKiBhMTIgKyBiMTIgKiBhMjIsXHJcbiAgICAgICAgICAgIGIyMCAqIGEwMCArIGIyMSAqIGExMCArIGIyMiAqIGEyMCxcclxuICAgICAgICAgICAgYjIwICogYTAxICsgYjIxICogYTExICsgYjIyICogYTIxLFxyXG4gICAgICAgICAgICBiMjAgKiBhMDIgKyBiMjEgKiBhMTIgKyBiMjIgKiBhMjIsXHJcbiAgICAgICAgXTtcclxuICAgIH0sXHJcbiAgICB4Um90YXRpb246IGZ1bmN0aW9uIChhbmdsZUluUmFkaWFucykge1xyXG4gICAgICAgIGNvbnN0IGMgPSBNYXRoLmNvcyhhbmdsZUluUmFkaWFucyk7XHJcbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKGFuZ2xlSW5SYWRpYW5zKTtcclxuICAgICAgICByZXR1cm4gWzEsIDAsIDAsIDAsIGMsIHMsIDAsIC1zLCBjXTtcclxuICAgIH0sXHJcbiAgICB5Um90YXRpb246IGZ1bmN0aW9uIChhbmdsZUluUmFkaWFucykge1xyXG4gICAgICAgIGNvbnN0IGMgPSBNYXRoLmNvcyhhbmdsZUluUmFkaWFucyk7XHJcbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKGFuZ2xlSW5SYWRpYW5zKTtcclxuICAgICAgICByZXR1cm4gW2MsIDAsIC1zLCAwLCAxLCAwLCBzLCAwLCBjXTtcclxuICAgIH0sXHJcbiAgICB6Um90YXRpb246IGZ1bmN0aW9uIChhbmdsZUluUmFkaWFucykge1xyXG4gICAgICAgIGNvbnN0IGMgPSBNYXRoLmNvcyhhbmdsZUluUmFkaWFucyk7XHJcbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKGFuZ2xlSW5SYWRpYW5zKTtcclxuICAgICAgICByZXR1cm4gW2MsIHMsIDAsIC1zLCBjLCAwLCAwLCAwLCAxXTtcclxuICAgIH0sXHJcbiAgICBtM1RvbTQ6IGZ1bmN0aW9uIChtKSB7XHJcbiAgICAgICAgY29uc3QgZHN0ID0gbmV3IEFycmF5KDE2KTtcclxuICAgICAgICBkc3RbMF0gPSBtWzBdO1xyXG4gICAgICAgIGRzdFsxXSA9IG1bMV07XHJcbiAgICAgICAgZHN0WzJdID0gbVsyXTtcclxuICAgICAgICBkc3RbM10gPSAwO1xyXG4gICAgICAgIGRzdFs0XSA9IG1bM107XHJcbiAgICAgICAgZHN0WzVdID0gbVs0XTtcclxuICAgICAgICBkc3RbNl0gPSBtWzVdO1xyXG4gICAgICAgIGRzdFs3XSA9IDA7XHJcbiAgICAgICAgZHN0WzhdID0gbVs2XTtcclxuICAgICAgICBkc3RbOV0gPSBtWzddO1xyXG4gICAgICAgIGRzdFsxMF0gPSBtWzhdO1xyXG4gICAgICAgIGRzdFsxMV0gPSAwO1xyXG4gICAgICAgIGRzdFsxMl0gPSAwO1xyXG4gICAgICAgIGRzdFsxM10gPSAwO1xyXG4gICAgICAgIGRzdFsxNF0gPSAwO1xyXG4gICAgICAgIGRzdFsxNV0gPSAxO1xyXG4gICAgICAgIHJldHVybiBkc3Q7XHJcbiAgICB9LFxyXG4gICAgeFJvdGF0ZTogZnVuY3Rpb24gKG0sIGFuZ2xlSW5SYWRpYW5zKSB7XHJcbiAgICAgICAgcmV0dXJuIG0zLm11bHRpcGx5KG0sIG0zLnhSb3RhdGlvbihhbmdsZUluUmFkaWFucykpO1xyXG4gICAgfSxcclxuICAgIHlSb3RhdGU6IGZ1bmN0aW9uIChtLCBhbmdsZUluUmFkaWFucykge1xyXG4gICAgICAgIHJldHVybiBtMy5tdWx0aXBseShtLCBtMy55Um90YXRpb24oYW5nbGVJblJhZGlhbnMpKTtcclxuICAgIH0sXHJcbiAgICB6Um90YXRlOiBmdW5jdGlvbiAobSwgYW5nbGVJblJhZGlhbnMpIHtcclxuICAgICAgICByZXR1cm4gbTMubXVsdGlwbHkobSwgbTMuelJvdGF0aW9uKGFuZ2xlSW5SYWRpYW5zKSk7XHJcbiAgICB9LFxyXG4gICAgdHJhbnNmb3JtUG9pbnQ6IGZ1bmN0aW9uIChtLCB2KSB7XHJcbiAgICAgICAgY29uc3QgZHN0ID0gWzAsIDAsIDBdO1xyXG4gICAgICAgIGNvbnN0IHYwID0gdlswXTtcclxuICAgICAgICBjb25zdCB2MSA9IHZbMV07XHJcbiAgICAgICAgY29uc3QgdjIgPSB2WzJdO1xyXG4gICAgICAgIGRzdFswXSA9IHYwICogbVswICogMyArIDBdICsgdjEgKiBtWzEgKiAzICsgMF0gKyB2MiAqIG1bMiAqIDMgKyAwXTtcclxuICAgICAgICBkc3RbMV0gPSB2MCAqIG1bMCAqIDMgKyAxXSArIHYxICogbVsxICogMyArIDFdICsgdjIgKiBtWzIgKiAzICsgMV07XHJcbiAgICAgICAgZHN0WzJdID0gdjAgKiBtWzAgKiAzICsgMl0gKyB2MSAqIG1bMSAqIDMgKyAyXSArIHYyICogbVsyICogMyArIDJdO1xyXG4gICAgICAgIHJldHVybiBkc3Q7XHJcbiAgICB9LFxyXG4gICAgaWRlbnRpdHk6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gWzEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDFdO1xyXG4gICAgfSxcclxuICAgIHRyYW5zcG9zZTogZnVuY3Rpb24gKG0pIHtcclxuICAgICAgICBjb25zdCBkc3QgPSBuZXcgQXJyYXkoOSk7XHJcbiAgICAgICAgZHN0WzBdID0gbVswXTtcclxuICAgICAgICBkc3RbMV0gPSBtWzNdO1xyXG4gICAgICAgIGRzdFsyXSA9IG1bNl07XHJcbiAgICAgICAgZHN0WzNdID0gbVsxXTtcclxuICAgICAgICBkc3RbNF0gPSBtWzRdO1xyXG4gICAgICAgIGRzdFs1XSA9IG1bN107XHJcbiAgICAgICAgZHN0WzZdID0gbVsyXTtcclxuICAgICAgICBkc3RbN10gPSBtWzVdO1xyXG4gICAgICAgIGRzdFs4XSA9IG1bOF07XHJcbiAgICAgICAgcmV0dXJuIGRzdDtcclxuICAgIH0sXHJcbiAgICBzY2FsaW5nOiBmdW5jdGlvbiAoc3gsIHN5LCBzeikge1xyXG4gICAgICAgIHJldHVybiBbc3gsIDAsIDAsIDAsIHN5LCAwLCAwLCAwLCBzel07XHJcbiAgICB9LFxyXG4gICAgc2NhbGU6IGZ1bmN0aW9uIChtLCBzeCwgc3ksIHN6KSB7XHJcbiAgICAgICAgcmV0dXJuIG0zLm11bHRpcGx5KG0sIG0zLnNjYWxpbmcoc3gsIHN5LCBzeikpO1xyXG4gICAgfSxcclxuICAgIC8qXHJcbiAgICAgICAgMCAxIDJcclxuICAgICAgICAzIDQgNVxyXG4gICAgICAgIDYgNyA4XHJcbiAgICAgICAgKi9cclxuICAgIGludmVyc2U6IGZ1bmN0aW9uIChtKSB7XHJcbiAgICAgICAgY29uc3QgZGV0ID0gbVswXSAqIG1bNF0gKiBtWzhdICtcclxuICAgICAgICAgICAgbVsyXSAqIG1bM10gKiBtWzddICtcclxuICAgICAgICAgICAgbVsxXSAqIG1bNV0gKiBtWzZdIC1cclxuICAgICAgICAgICAgbVsyXSAqIG1bNF0gKiBtWzZdIC1cclxuICAgICAgICAgICAgbVswXSAqIG1bNV0gKiBtWzddIC1cclxuICAgICAgICAgICAgbVs4XSAqIG1bM10gKiBtWzJdO1xyXG4gICAgICAgIGNvbnN0IGRzdCA9IG5ldyBBcnJheSg5KTtcclxuICAgICAgICBkc3RbMF0gPSAobVs0XSAqIG1bOF0gLSBtWzddICogbVs1XSkgLyBkZXQ7XHJcbiAgICAgICAgZHN0WzFdID0gKG1bM10gKiBtWzhdIC0gbVs2XSAqIG1bNV0pIC8gZGV0O1xyXG4gICAgICAgIGRzdFsyXSA9IChtWzNdICogbVs3XSAtIG1bNl0gKiBtWzRdKSAvIGRldDtcclxuICAgICAgICBkc3RbM10gPSAobVsxXSAqIG1bOF0gLSBtWzJdICogbVs3XSkgLyBkZXQ7XHJcbiAgICAgICAgZHN0WzRdID0gKG1bMF0gKiBtWzhdIC0gbVsyXSAqIG1bNl0pIC8gZGV0O1xyXG4gICAgICAgIGRzdFs1XSA9IChtWzBdICogbVs3XSAtIG1bMV0gKiBtWzZdKSAvIGRldDtcclxuICAgICAgICBkc3RbNl0gPSAobVsxXSAqIG1bNV0gLSBtWzJdICogbVs0XSkgLyBkZXQ7XHJcbiAgICAgICAgZHN0WzddID0gKG1bMF0gKiBtWzVdIC0gbVsyXSAqIG1bM10pIC8gZGV0O1xyXG4gICAgICAgIGRzdFs4XSA9IChtWzBdICogbVs0XSAtIG1bMV0gKiBtWzRdKSAvIGRldDtcclxuICAgICAgICByZXR1cm4gZHN0O1xyXG4gICAgfSxcclxuICAgIHRvU3RyaW5nKG0pIHtcclxuICAgICAgICByZXR1cm4gbS5yZWR1Y2UoKGFjYywgZWwsIGlkeCkgPT4gaWR4ICUgMyA9PT0gMFxyXG4gICAgICAgICAgICA/IChhY2MgKz0gYFxcbiR7ZWwudG9TdHJpbmcoKX1gKVxyXG4gICAgICAgICAgICA6IChhY2MgKz0gYCAke2VsLnRvU3RyaW5nKCl9YCksIFwiXCIpO1xyXG4gICAgfSxcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgbTM7XHJcbiIsImltcG9ydCB2MyBmcm9tIFwiLi92M1wiO1xyXG5jb25zdCBtNCA9IHtcclxuICAgIG11bHRpcGx5OiBmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgIGNvbnN0IGEwMCA9IGFbMCAqIDQgKyAwXTtcclxuICAgICAgICBjb25zdCBhMDEgPSBhWzAgKiA0ICsgMV07XHJcbiAgICAgICAgY29uc3QgYTAyID0gYVswICogNCArIDJdO1xyXG4gICAgICAgIGNvbnN0IGEwMyA9IGFbMCAqIDQgKyAzXTtcclxuICAgICAgICBjb25zdCBhMTAgPSBhWzEgKiA0ICsgMF07XHJcbiAgICAgICAgY29uc3QgYTExID0gYVsxICogNCArIDFdO1xyXG4gICAgICAgIGNvbnN0IGExMiA9IGFbMSAqIDQgKyAyXTtcclxuICAgICAgICBjb25zdCBhMTMgPSBhWzEgKiA0ICsgM107XHJcbiAgICAgICAgY29uc3QgYTIwID0gYVsyICogNCArIDBdO1xyXG4gICAgICAgIGNvbnN0IGEyMSA9IGFbMiAqIDQgKyAxXTtcclxuICAgICAgICBjb25zdCBhMjIgPSBhWzIgKiA0ICsgMl07XHJcbiAgICAgICAgY29uc3QgYTIzID0gYVsyICogNCArIDNdO1xyXG4gICAgICAgIGNvbnN0IGEzMCA9IGFbMyAqIDQgKyAwXTtcclxuICAgICAgICBjb25zdCBhMzEgPSBhWzMgKiA0ICsgMV07XHJcbiAgICAgICAgY29uc3QgYTMyID0gYVszICogNCArIDJdO1xyXG4gICAgICAgIGNvbnN0IGEzMyA9IGFbMyAqIDQgKyAzXTtcclxuICAgICAgICBjb25zdCBiMDAgPSBiWzAgKiA0ICsgMF07XHJcbiAgICAgICAgY29uc3QgYjAxID0gYlswICogNCArIDFdO1xyXG4gICAgICAgIGNvbnN0IGIwMiA9IGJbMCAqIDQgKyAyXTtcclxuICAgICAgICBjb25zdCBiMDMgPSBiWzAgKiA0ICsgM107XHJcbiAgICAgICAgY29uc3QgYjEwID0gYlsxICogNCArIDBdO1xyXG4gICAgICAgIGNvbnN0IGIxMSA9IGJbMSAqIDQgKyAxXTtcclxuICAgICAgICBjb25zdCBiMTIgPSBiWzEgKiA0ICsgMl07XHJcbiAgICAgICAgY29uc3QgYjEzID0gYlsxICogNCArIDNdO1xyXG4gICAgICAgIGNvbnN0IGIyMCA9IGJbMiAqIDQgKyAwXTtcclxuICAgICAgICBjb25zdCBiMjEgPSBiWzIgKiA0ICsgMV07XHJcbiAgICAgICAgY29uc3QgYjIyID0gYlsyICogNCArIDJdO1xyXG4gICAgICAgIGNvbnN0IGIyMyA9IGJbMiAqIDQgKyAzXTtcclxuICAgICAgICBjb25zdCBiMzAgPSBiWzMgKiA0ICsgMF07XHJcbiAgICAgICAgY29uc3QgYjMxID0gYlszICogNCArIDFdO1xyXG4gICAgICAgIGNvbnN0IGIzMiA9IGJbMyAqIDQgKyAyXTtcclxuICAgICAgICBjb25zdCBiMzMgPSBiWzMgKiA0ICsgM107XHJcbiAgICAgICAgY29uc3QgZHN0ID0gW1xyXG4gICAgICAgICAgICBiMDAgKiBhMDAgKyBiMDEgKiBhMTAgKyBiMDIgKiBhMjAgKyBiMDMgKiBhMzAsXHJcbiAgICAgICAgICAgIGIwMCAqIGEwMSArIGIwMSAqIGExMSArIGIwMiAqIGEyMSArIGIwMyAqIGEzMSxcclxuICAgICAgICAgICAgYjAwICogYTAyICsgYjAxICogYTEyICsgYjAyICogYTIyICsgYjAzICogYTMyLFxyXG4gICAgICAgICAgICBiMDAgKiBhMDMgKyBiMDEgKiBhMTMgKyBiMDIgKiBhMjMgKyBiMDMgKiBhMzMsXHJcbiAgICAgICAgICAgIGIxMCAqIGEwMCArIGIxMSAqIGExMCArIGIxMiAqIGEyMCArIGIxMyAqIGEzMCxcclxuICAgICAgICAgICAgYjEwICogYTAxICsgYjExICogYTExICsgYjEyICogYTIxICsgYjEzICogYTMxLFxyXG4gICAgICAgICAgICBiMTAgKiBhMDIgKyBiMTEgKiBhMTIgKyBiMTIgKiBhMjIgKyBiMTMgKiBhMzIsXHJcbiAgICAgICAgICAgIGIxMCAqIGEwMyArIGIxMSAqIGExMyArIGIxMiAqIGEyMyArIGIxMyAqIGEzMyxcclxuICAgICAgICAgICAgYjIwICogYTAwICsgYjIxICogYTEwICsgYjIyICogYTIwICsgYjIzICogYTMwLFxyXG4gICAgICAgICAgICBiMjAgKiBhMDEgKyBiMjEgKiBhMTEgKyBiMjIgKiBhMjEgKyBiMjMgKiBhMzEsXHJcbiAgICAgICAgICAgIGIyMCAqIGEwMiArIGIyMSAqIGExMiArIGIyMiAqIGEyMiArIGIyMyAqIGEzMixcclxuICAgICAgICAgICAgYjIwICogYTAzICsgYjIxICogYTEzICsgYjIyICogYTIzICsgYjIzICogYTMzLFxyXG4gICAgICAgICAgICBiMzAgKiBhMDAgKyBiMzEgKiBhMTAgKyBiMzIgKiBhMjAgKyBiMzMgKiBhMzAsXHJcbiAgICAgICAgICAgIGIzMCAqIGEwMSArIGIzMSAqIGExMSArIGIzMiAqIGEyMSArIGIzMyAqIGEzMSxcclxuICAgICAgICAgICAgYjMwICogYTAyICsgYjMxICogYTEyICsgYjMyICogYTIyICsgYjMzICogYTMyLFxyXG4gICAgICAgICAgICBiMzAgKiBhMDMgKyBiMzEgKiBhMTMgKyBiMzIgKiBhMjMgKyBiMzMgKiBhMzMsXHJcbiAgICAgICAgXTtcclxuICAgICAgICByZXR1cm4gZHN0O1xyXG4gICAgfSxcclxuICAgIHRyYW5zbGF0aW9uOiBmdW5jdGlvbiAodHgsIHR5LCB0eikge1xyXG4gICAgICAgIHJldHVybiBbMSwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMSwgMCwgdHgsIHR5LCB0eiwgMV07XHJcbiAgICB9LFxyXG4gICAgeFJvdGF0aW9uOiBmdW5jdGlvbiAoYW5nbGVJblJhZGlhbnMpIHtcclxuICAgICAgICBjb25zdCBjID0gTWF0aC5jb3MoYW5nbGVJblJhZGlhbnMpO1xyXG4gICAgICAgIGNvbnN0IHMgPSBNYXRoLnNpbihhbmdsZUluUmFkaWFucyk7XHJcbiAgICAgICAgcmV0dXJuIFsxLCAwLCAwLCAwLCAwLCBjLCBzLCAwLCAwLCAtcywgYywgMCwgMCwgMCwgMCwgMV07XHJcbiAgICB9LFxyXG4gICAgeVJvdGF0aW9uOiBmdW5jdGlvbiAoYW5nbGVJblJhZGlhbnMpIHtcclxuICAgICAgICBjb25zdCBjID0gTWF0aC5jb3MoYW5nbGVJblJhZGlhbnMpO1xyXG4gICAgICAgIGNvbnN0IHMgPSBNYXRoLnNpbihhbmdsZUluUmFkaWFucyk7XHJcbiAgICAgICAgcmV0dXJuIFtjLCAwLCAtcywgMCwgMCwgMSwgMCwgMCwgcywgMCwgYywgMCwgMCwgMCwgMCwgMV07XHJcbiAgICB9LFxyXG4gICAgelJvdGF0aW9uOiBmdW5jdGlvbiAoYW5nbGVJblJhZGlhbnMpIHtcclxuICAgICAgICBjb25zdCBjID0gTWF0aC5jb3MoYW5nbGVJblJhZGlhbnMpO1xyXG4gICAgICAgIGNvbnN0IHMgPSBNYXRoLnNpbihhbmdsZUluUmFkaWFucyk7XHJcbiAgICAgICAgcmV0dXJuIFtjLCBzLCAwLCAwLCAtcywgYywgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMV07XHJcbiAgICB9LFxyXG4gICAgc2NhbGluZzogZnVuY3Rpb24gKHN4LCBzeSwgc3opIHtcclxuICAgICAgICByZXR1cm4gW3N4LCAwLCAwLCAwLCAwLCBzeSwgMCwgMCwgMCwgMCwgc3osIDAsIDAsIDAsIDAsIDFdO1xyXG4gICAgfSxcclxuICAgIHRyYW5zbGF0ZTogZnVuY3Rpb24gKG0sIHR4LCB0eSwgdHopIHtcclxuICAgICAgICByZXR1cm4gbTQubXVsdGlwbHkobSwgbTQudHJhbnNsYXRpb24odHgsIHR5LCB0eikpO1xyXG4gICAgfSxcclxuICAgIHhSb3RhdGU6IGZ1bmN0aW9uIChtLCBhbmdsZUluUmFkaWFucykge1xyXG4gICAgICAgIHJldHVybiBtNC5tdWx0aXBseShtLCBtNC54Um90YXRpb24oYW5nbGVJblJhZGlhbnMpKTtcclxuICAgIH0sXHJcbiAgICB5Um90YXRlOiBmdW5jdGlvbiAobSwgYW5nbGVJblJhZGlhbnMpIHtcclxuICAgICAgICByZXR1cm4gbTQubXVsdGlwbHkobSwgbTQueVJvdGF0aW9uKGFuZ2xlSW5SYWRpYW5zKSk7XHJcbiAgICB9LFxyXG4gICAgelJvdGF0ZTogZnVuY3Rpb24gKG0sIGFuZ2xlSW5SYWRpYW5zKSB7XHJcbiAgICAgICAgcmV0dXJuIG00Lm11bHRpcGx5KG0sIG00LnpSb3RhdGlvbihhbmdsZUluUmFkaWFucykpO1xyXG4gICAgfSxcclxuICAgIHNjYWxlOiBmdW5jdGlvbiAobSwgc3gsIHN5LCBzeikge1xyXG4gICAgICAgIHJldHVybiBtNC5tdWx0aXBseShtLCBtNC5zY2FsaW5nKHN4LCBzeSwgc3opKTtcclxuICAgIH0sXHJcbiAgICBtYWtlT3J0OiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgIGNvbnN0IG8gPSBbMCwgMCwgMF07XHJcbiAgICAgICAgY29uc3Qgbm9ybSA9IE1hdGguc3FydCh2WzBdICogdlswXSArIHZbMV0gKiB2WzFdICsgdlsyXSAqIHZbMl0pO1xyXG4gICAgICAgIG9bMF0gPSB2WzBdIC8gbm9ybTtcclxuICAgICAgICBvWzFdID0gdlsxXSAvIG5vcm07XHJcbiAgICAgICAgb1syXSA9IHZbMl0gLyBub3JtO1xyXG4gICAgICAgIHJldHVybiBvO1xyXG4gICAgfSxcclxuICAgIHByb2plY3Rpb246IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0LCBkZXB0aCkge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIDIgLyB3aWR0aCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgLTIgLyBoZWlnaHQsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDIgLyBkZXB0aCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgLTEsXHJcbiAgICAgICAgICAgIDEsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDEsXHJcbiAgICAgICAgXTtcclxuICAgIH0sXHJcbiAgICBwZXJzcGVjdGl2ZTogZnVuY3Rpb24gKGZpZWxkT2ZWaWV3SW5SYWRpYW5zLCBhc3BlY3QsIG5lYXIsIGZhcikge1xyXG4gICAgICAgIGNvbnN0IGYgPSBNYXRoLnRhbihNYXRoLlBJICogMC41IC0gMC41ICogZmllbGRPZlZpZXdJblJhZGlhbnMpO1xyXG4gICAgICAgIGNvbnN0IHJhbmdlSW52ID0gMS4wIC8gKG5lYXIgLSBmYXIpO1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIGYgLyBhc3BlY3QsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIGYsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIChuZWFyICsgZmFyKSAqIHJhbmdlSW52LFxyXG4gICAgICAgICAgICAtMSxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgbmVhciAqIGZhciAqIHJhbmdlSW52ICogMixcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICBdO1xyXG4gICAgfSxcclxuICAgIGludmVyc2U6IGZ1bmN0aW9uIChtKSB7XHJcbiAgICAgICAgY29uc3QgbTAwID0gbVswICogNCArIDBdO1xyXG4gICAgICAgIGNvbnN0IG0wMSA9IG1bMCAqIDQgKyAxXTtcclxuICAgICAgICBjb25zdCBtMDIgPSBtWzAgKiA0ICsgMl07XHJcbiAgICAgICAgY29uc3QgbTAzID0gbVswICogNCArIDNdO1xyXG4gICAgICAgIGNvbnN0IG0xMCA9IG1bMSAqIDQgKyAwXTtcclxuICAgICAgICBjb25zdCBtMTEgPSBtWzEgKiA0ICsgMV07XHJcbiAgICAgICAgY29uc3QgbTEyID0gbVsxICogNCArIDJdO1xyXG4gICAgICAgIGNvbnN0IG0xMyA9IG1bMSAqIDQgKyAzXTtcclxuICAgICAgICBjb25zdCBtMjAgPSBtWzIgKiA0ICsgMF07XHJcbiAgICAgICAgY29uc3QgbTIxID0gbVsyICogNCArIDFdO1xyXG4gICAgICAgIGNvbnN0IG0yMiA9IG1bMiAqIDQgKyAyXTtcclxuICAgICAgICBjb25zdCBtMjMgPSBtWzIgKiA0ICsgM107XHJcbiAgICAgICAgY29uc3QgbTMwID0gbVszICogNCArIDBdO1xyXG4gICAgICAgIGNvbnN0IG0zMSA9IG1bMyAqIDQgKyAxXTtcclxuICAgICAgICBjb25zdCBtMzIgPSBtWzMgKiA0ICsgMl07XHJcbiAgICAgICAgY29uc3QgbTMzID0gbVszICogNCArIDNdO1xyXG4gICAgICAgIGNvbnN0IHRtcF8wID0gbTIyICogbTMzO1xyXG4gICAgICAgIGNvbnN0IHRtcF8xID0gbTMyICogbTIzO1xyXG4gICAgICAgIGNvbnN0IHRtcF8yID0gbTEyICogbTMzO1xyXG4gICAgICAgIGNvbnN0IHRtcF8zID0gbTMyICogbTEzO1xyXG4gICAgICAgIGNvbnN0IHRtcF80ID0gbTEyICogbTIzO1xyXG4gICAgICAgIGNvbnN0IHRtcF81ID0gbTIyICogbTEzO1xyXG4gICAgICAgIGNvbnN0IHRtcF82ID0gbTAyICogbTMzO1xyXG4gICAgICAgIGNvbnN0IHRtcF83ID0gbTMyICogbTAzO1xyXG4gICAgICAgIGNvbnN0IHRtcF84ID0gbTAyICogbTIzO1xyXG4gICAgICAgIGNvbnN0IHRtcF85ID0gbTIyICogbTAzO1xyXG4gICAgICAgIGNvbnN0IHRtcF8xMCA9IG0wMiAqIG0xMztcclxuICAgICAgICBjb25zdCB0bXBfMTEgPSBtMTIgKiBtMDM7XHJcbiAgICAgICAgY29uc3QgdG1wXzEyID0gbTIwICogbTMxO1xyXG4gICAgICAgIGNvbnN0IHRtcF8xMyA9IG0zMCAqIG0yMTtcclxuICAgICAgICBjb25zdCB0bXBfMTQgPSBtMTAgKiBtMzE7XHJcbiAgICAgICAgY29uc3QgdG1wXzE1ID0gbTMwICogbTExO1xyXG4gICAgICAgIGNvbnN0IHRtcF8xNiA9IG0xMCAqIG0yMTtcclxuICAgICAgICBjb25zdCB0bXBfMTcgPSBtMjAgKiBtMTE7XHJcbiAgICAgICAgY29uc3QgdG1wXzE4ID0gbTAwICogbTMxO1xyXG4gICAgICAgIGNvbnN0IHRtcF8xOSA9IG0zMCAqIG0wMTtcclxuICAgICAgICBjb25zdCB0bXBfMjAgPSBtMDAgKiBtMjE7XHJcbiAgICAgICAgY29uc3QgdG1wXzIxID0gbTIwICogbTAxO1xyXG4gICAgICAgIGNvbnN0IHRtcF8yMiA9IG0wMCAqIG0xMTtcclxuICAgICAgICBjb25zdCB0bXBfMjMgPSBtMTAgKiBtMDE7XHJcbiAgICAgICAgY29uc3QgdDAgPSB0bXBfMCAqIG0xMSArXHJcbiAgICAgICAgICAgIHRtcF8zICogbTIxICtcclxuICAgICAgICAgICAgdG1wXzQgKiBtMzEgLVxyXG4gICAgICAgICAgICAodG1wXzEgKiBtMTEgKyB0bXBfMiAqIG0yMSArIHRtcF81ICogbTMxKTtcclxuICAgICAgICBjb25zdCB0MSA9IHRtcF8xICogbTAxICtcclxuICAgICAgICAgICAgdG1wXzYgKiBtMjEgK1xyXG4gICAgICAgICAgICB0bXBfOSAqIG0zMSAtXHJcbiAgICAgICAgICAgICh0bXBfMCAqIG0wMSArIHRtcF83ICogbTIxICsgdG1wXzggKiBtMzEpO1xyXG4gICAgICAgIGNvbnN0IHQyID0gdG1wXzIgKiBtMDEgK1xyXG4gICAgICAgICAgICB0bXBfNyAqIG0xMSArXHJcbiAgICAgICAgICAgIHRtcF8xMCAqIG0zMSAtXHJcbiAgICAgICAgICAgICh0bXBfMyAqIG0wMSArIHRtcF82ICogbTExICsgdG1wXzExICogbTMxKTtcclxuICAgICAgICBjb25zdCB0MyA9IHRtcF81ICogbTAxICtcclxuICAgICAgICAgICAgdG1wXzggKiBtMTEgK1xyXG4gICAgICAgICAgICB0bXBfMTEgKiBtMjEgLVxyXG4gICAgICAgICAgICAodG1wXzQgKiBtMDEgKyB0bXBfOSAqIG0xMSArIHRtcF8xMCAqIG0yMSk7XHJcbiAgICAgICAgY29uc3QgZCA9IDEuMCAvIChtMDAgKiB0MCArIG0xMCAqIHQxICsgbTIwICogdDIgKyBtMzAgKiB0Myk7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgZCAqIHQwLFxyXG4gICAgICAgICAgICBkICogdDEsXHJcbiAgICAgICAgICAgIGQgKiB0MixcclxuICAgICAgICAgICAgZCAqIHQzLFxyXG4gICAgICAgICAgICBkICpcclxuICAgICAgICAgICAgICAgICh0bXBfMSAqIG0xMCArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzIgKiBtMjAgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF81ICogbTMwIC1cclxuICAgICAgICAgICAgICAgICAgICAodG1wXzAgKiBtMTAgKyB0bXBfMyAqIG0yMCArIHRtcF80ICogbTMwKSksXHJcbiAgICAgICAgICAgIGQgKlxyXG4gICAgICAgICAgICAgICAgKHRtcF8wICogbTAwICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfNyAqIG0yMCArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzggKiBtMzAgLVxyXG4gICAgICAgICAgICAgICAgICAgICh0bXBfMSAqIG0wMCArIHRtcF82ICogbTIwICsgdG1wXzkgKiBtMzApKSxcclxuICAgICAgICAgICAgZCAqXHJcbiAgICAgICAgICAgICAgICAodG1wXzMgKiBtMDAgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF82ICogbTEwICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfMTEgKiBtMzAgLVxyXG4gICAgICAgICAgICAgICAgICAgICh0bXBfMiAqIG0wMCArIHRtcF83ICogbTEwICsgdG1wXzEwICogbTMwKSksXHJcbiAgICAgICAgICAgIGQgKlxyXG4gICAgICAgICAgICAgICAgKHRtcF80ICogbTAwICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfOSAqIG0xMCArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzEwICogbTIwIC1cclxuICAgICAgICAgICAgICAgICAgICAodG1wXzUgKiBtMDAgKyB0bXBfOCAqIG0xMCArIHRtcF8xMSAqIG0yMCkpLFxyXG4gICAgICAgICAgICBkICpcclxuICAgICAgICAgICAgICAgICh0bXBfMTIgKiBtMTMgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF8xNSAqIG0yMyArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzE2ICogbTMzIC1cclxuICAgICAgICAgICAgICAgICAgICAodG1wXzEzICogbTEzICsgdG1wXzE0ICogbTIzICsgdG1wXzE3ICogbTMzKSksXHJcbiAgICAgICAgICAgIGQgKlxyXG4gICAgICAgICAgICAgICAgKHRtcF8xMyAqIG0wMyArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzE4ICogbTIzICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfMjEgKiBtMzMgLVxyXG4gICAgICAgICAgICAgICAgICAgICh0bXBfMTIgKiBtMDMgKyB0bXBfMTkgKiBtMjMgKyB0bXBfMjAgKiBtMzMpKSxcclxuICAgICAgICAgICAgZCAqXHJcbiAgICAgICAgICAgICAgICAodG1wXzE0ICogbTAzICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfMTkgKiBtMTMgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF8yMiAqIG0zMyAtXHJcbiAgICAgICAgICAgICAgICAgICAgKHRtcF8xNSAqIG0wMyArIHRtcF8xOCAqIG0xMyArIHRtcF8yMyAqIG0zMykpLFxyXG4gICAgICAgICAgICBkICpcclxuICAgICAgICAgICAgICAgICh0bXBfMTcgKiBtMDMgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF8yMCAqIG0xMyArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzIzICogbTIzIC1cclxuICAgICAgICAgICAgICAgICAgICAodG1wXzE2ICogbTAzICsgdG1wXzIxICogbTEzICsgdG1wXzIyICogbTIzKSksXHJcbiAgICAgICAgICAgIGQgKlxyXG4gICAgICAgICAgICAgICAgKHRtcF8xNCAqIG0yMiArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzE3ICogbTMyICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfMTMgKiBtMTIgLVxyXG4gICAgICAgICAgICAgICAgICAgICh0bXBfMTYgKiBtMzIgKyB0bXBfMTIgKiBtMTIgKyB0bXBfMTUgKiBtMjIpKSxcclxuICAgICAgICAgICAgZCAqXHJcbiAgICAgICAgICAgICAgICAodG1wXzIwICogbTMyICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfMTIgKiBtMDIgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF8xOSAqIG0yMiAtXHJcbiAgICAgICAgICAgICAgICAgICAgKHRtcF8xOCAqIG0yMiArIHRtcF8yMSAqIG0zMiArIHRtcF8xMyAqIG0wMikpLFxyXG4gICAgICAgICAgICBkICpcclxuICAgICAgICAgICAgICAgICh0bXBfMTggKiBtMTIgK1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcF8yMyAqIG0zMiArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzE1ICogbTAyIC1cclxuICAgICAgICAgICAgICAgICAgICAodG1wXzIyICogbTMyICsgdG1wXzE0ICogbTAyICsgdG1wXzE5ICogbTEyKSksXHJcbiAgICAgICAgICAgIGQgKlxyXG4gICAgICAgICAgICAgICAgKHRtcF8yMiAqIG0yMiArXHJcbiAgICAgICAgICAgICAgICAgICAgdG1wXzE2ICogbTAyICtcclxuICAgICAgICAgICAgICAgICAgICB0bXBfMjEgKiBtMTIgLVxyXG4gICAgICAgICAgICAgICAgICAgICh0bXBfMjAgKiBtMTIgKyB0bXBfMjMgKiBtMjIgKyB0bXBfMTcgKiBtMDIpKSxcclxuICAgICAgICBdO1xyXG4gICAgfSxcclxuICAgIGxvb2tBdDogZnVuY3Rpb24gKGNhbWVyYVBvc2l0aW9uLCB0YXJnZXQsIHVwKSB7XHJcbiAgICAgICAgY29uc3QgekF4aXMgPSB2My5ub3JtYWxpemUodjMuZGlmZihjYW1lcmFQb3NpdGlvbiwgdGFyZ2V0KSk7XHJcbiAgICAgICAgY29uc3QgeEF4aXMgPSB2My5ub3JtYWxpemUodjMuY3Jvc3ModXAsIHpBeGlzKSk7XHJcbiAgICAgICAgY29uc3QgeUF4aXMgPSB2My5ub3JtYWxpemUodjMuY3Jvc3MoekF4aXMsIHhBeGlzKSk7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgeEF4aXNbMF0sXHJcbiAgICAgICAgICAgIHhBeGlzWzFdLFxyXG4gICAgICAgICAgICB4QXhpc1syXSxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgeUF4aXNbMF0sXHJcbiAgICAgICAgICAgIHlBeGlzWzFdLFxyXG4gICAgICAgICAgICB5QXhpc1syXSxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgekF4aXNbMF0sXHJcbiAgICAgICAgICAgIHpBeGlzWzFdLFxyXG4gICAgICAgICAgICB6QXhpc1syXSxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgY2FtZXJhUG9zaXRpb25bMF0sXHJcbiAgICAgICAgICAgIGNhbWVyYVBvc2l0aW9uWzFdLFxyXG4gICAgICAgICAgICBjYW1lcmFQb3NpdGlvblsyXSxcclxuICAgICAgICAgICAgMSxcclxuICAgICAgICBdO1xyXG4gICAgfSxcclxuICAgIGNvcHk6IGZ1bmN0aW9uIChzcmMpIHtcclxuICAgICAgICByZXR1cm4gWy4uLnNyY107XHJcbiAgICB9LFxyXG4gICAgdHJhbnNmb3JtUG9pbnQ6IGZ1bmN0aW9uIChtLCB2LCBkc3QpIHtcclxuICAgICAgICBkc3QgPSBkc3QgfHwgbmV3IEFycmF5KDMpO1xyXG4gICAgICAgIGNvbnN0IHYwID0gdlswXTtcclxuICAgICAgICBjb25zdCB2MSA9IHZbMV07XHJcbiAgICAgICAgY29uc3QgdjIgPSB2WzJdO1xyXG4gICAgICAgIGNvbnN0IGQgPSB2MCAqIG1bMCAqIDQgKyAzXSArIHYxICogbVsxICogNCArIDNdICsgdjIgKiBtWzIgKiA0ICsgM10gKyBtWzMgKiA0ICsgM107XHJcbiAgICAgICAgZHN0WzBdID1cclxuICAgICAgICAgICAgKHYwICogbVswICogNCArIDBdICtcclxuICAgICAgICAgICAgICAgIHYxICogbVsxICogNCArIDBdICtcclxuICAgICAgICAgICAgICAgIHYyICogbVsyICogNCArIDBdICtcclxuICAgICAgICAgICAgICAgIG1bMyAqIDQgKyAwXSkgL1xyXG4gICAgICAgICAgICAgICAgZDtcclxuICAgICAgICBkc3RbMV0gPVxyXG4gICAgICAgICAgICAodjAgKiBtWzAgKiA0ICsgMV0gK1xyXG4gICAgICAgICAgICAgICAgdjEgKiBtWzEgKiA0ICsgMV0gK1xyXG4gICAgICAgICAgICAgICAgdjIgKiBtWzIgKiA0ICsgMV0gK1xyXG4gICAgICAgICAgICAgICAgbVszICogNCArIDFdKSAvXHJcbiAgICAgICAgICAgICAgICBkO1xyXG4gICAgICAgIGRzdFsyXSA9XHJcbiAgICAgICAgICAgICh2MCAqIG1bMCAqIDQgKyAyXSArXHJcbiAgICAgICAgICAgICAgICB2MSAqIG1bMSAqIDQgKyAyXSArXHJcbiAgICAgICAgICAgICAgICB2MiAqIG1bMiAqIDQgKyAyXSArXHJcbiAgICAgICAgICAgICAgICBtWzMgKiA0ICsgMl0pIC9cclxuICAgICAgICAgICAgICAgIGQ7XHJcbiAgICAgICAgcmV0dXJuIGRzdDtcclxuICAgIH0sXHJcbiAgICBpZGVudGl0eTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnN0IGRzdCA9IG5ldyBBcnJheSgxNik7XHJcbiAgICAgICAgZHN0WzBdID0gMTtcclxuICAgICAgICBkc3RbMV0gPSAwO1xyXG4gICAgICAgIGRzdFsyXSA9IDA7XHJcbiAgICAgICAgZHN0WzNdID0gMDtcclxuICAgICAgICBkc3RbNF0gPSAwO1xyXG4gICAgICAgIGRzdFs1XSA9IDE7XHJcbiAgICAgICAgZHN0WzZdID0gMDtcclxuICAgICAgICBkc3RbN10gPSAwO1xyXG4gICAgICAgIGRzdFs4XSA9IDA7XHJcbiAgICAgICAgZHN0WzldID0gMDtcclxuICAgICAgICBkc3RbMTBdID0gMTtcclxuICAgICAgICBkc3RbMTFdID0gMDtcclxuICAgICAgICBkc3RbMTJdID0gMDtcclxuICAgICAgICBkc3RbMTNdID0gMDtcclxuICAgICAgICBkc3RbMTRdID0gMDtcclxuICAgICAgICBkc3RbMTVdID0gMTtcclxuICAgICAgICByZXR1cm4gZHN0O1xyXG4gICAgfSxcclxuICAgIG0zVG9tNDogZnVuY3Rpb24gKG0pIHtcclxuICAgICAgICBjb25zdCBkc3QgPSBuZXcgQXJyYXkoMTYpO1xyXG4gICAgICAgIGRzdFswXSA9IG1bMF07XHJcbiAgICAgICAgZHN0WzFdID0gbVsxXTtcclxuICAgICAgICBkc3RbMl0gPSBtWzJdO1xyXG4gICAgICAgIGRzdFszXSA9IDA7XHJcbiAgICAgICAgZHN0WzRdID0gbVszXTtcclxuICAgICAgICBkc3RbNV0gPSBtWzRdO1xyXG4gICAgICAgIGRzdFs2XSA9IG1bNV07XHJcbiAgICAgICAgZHN0WzddID0gMDtcclxuICAgICAgICBkc3RbOF0gPSBtWzZdO1xyXG4gICAgICAgIGRzdFs5XSA9IG1bN107XHJcbiAgICAgICAgZHN0WzEwXSA9IG1bOF07XHJcbiAgICAgICAgZHN0WzExXSA9IDA7XHJcbiAgICAgICAgZHN0WzEyXSA9IDA7XHJcbiAgICAgICAgZHN0WzEzXSA9IDA7XHJcbiAgICAgICAgZHN0WzE0XSA9IDA7XHJcbiAgICAgICAgZHN0WzE1XSA9IDE7XHJcbiAgICAgICAgcmV0dXJuIGRzdDtcclxuICAgIH0sXHJcbiAgICBtNFRvbTM6IGZ1bmN0aW9uIChtKSB7XHJcbiAgICAgICAgY29uc3QgZHN0ID0gbmV3IEFycmF5KDkpO1xyXG4gICAgICAgIGRzdFswXSA9IG1bMF07XHJcbiAgICAgICAgZHN0WzFdID0gbVsxXTtcclxuICAgICAgICBkc3RbMl0gPSBtWzJdO1xyXG4gICAgICAgIGRzdFszXSA9IG1bNF07XHJcbiAgICAgICAgZHN0WzRdID0gbVs1XTtcclxuICAgICAgICBkc3RbNV0gPSBtWzZdO1xyXG4gICAgICAgIGRzdFs2XSA9IG1bOF07XHJcbiAgICAgICAgZHN0WzddID0gbVs5XTtcclxuICAgICAgICBkc3RbOF0gPSBtWzEwXTtcclxuICAgICAgICByZXR1cm4gZHN0O1xyXG4gICAgfSxcclxuICAgIHRvU3RyaW5nKG0pIHtcclxuICAgICAgICByZXR1cm4gbS5yZWR1Y2UoKGFjYywgZWwsIGlkeCkgPT4gaWR4ICUgNCA9PT0gMFxyXG4gICAgICAgICAgICA/IChhY2MgKz0gYFxcbiR7ZWwudG9TdHJpbmcoKX1gKVxyXG4gICAgICAgICAgICA6IChhY2MgKz0gYCAke2VsLnRvU3RyaW5nKCl9YCksIFwiXCIpO1xyXG4gICAgfSxcclxuICAgIHRyYW5zcG9zZTogZnVuY3Rpb24gKG0pIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBtWzBdLFxyXG4gICAgICAgICAgICBtWzRdLFxyXG4gICAgICAgICAgICBtWzhdLFxyXG4gICAgICAgICAgICBtWzEyXSxcclxuICAgICAgICAgICAgbVsxXSxcclxuICAgICAgICAgICAgbVs1XSxcclxuICAgICAgICAgICAgbVs5XSxcclxuICAgICAgICAgICAgbVsxM10sXHJcbiAgICAgICAgICAgIG1bMl0sXHJcbiAgICAgICAgICAgIG1bNl0sXHJcbiAgICAgICAgICAgIG1bMTBdLFxyXG4gICAgICAgICAgICBtWzE0XSxcclxuICAgICAgICAgICAgbVszXSxcclxuICAgICAgICAgICAgbVs3XSxcclxuICAgICAgICAgICAgbVsxMV0sXHJcbiAgICAgICAgICAgIG1bMTVdLFxyXG4gICAgICAgIF07XHJcbiAgICB9LFxyXG4gICAgZnJvbVF1YXRlcm5pb246IChxKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYTExID0gMSAtIDIgKiAocVsxXSAqIHFbMV0gKyBxWzJdICogcVsyXSk7XHJcbiAgICAgICAgY29uc3QgYTEyID0gMiAqIChxWzBdICogcVsxXSAtIHFbMl0gKiBxWzNdKTtcclxuICAgICAgICBjb25zdCBhMTMgPSAyICogKHFbMF0gKiBxWzJdICsgcVsxXSAqIHFbM10pO1xyXG4gICAgICAgIGNvbnN0IGEyMSA9IDIgKiAocVswXSAqIHFbMV0gKyBxWzJdICogcVszXSk7XHJcbiAgICAgICAgY29uc3QgYTIyID0gMSAtIDIgKiAocVswXSAqIHFbMF0gKyBxWzJdICogcVsyXSk7XHJcbiAgICAgICAgY29uc3QgYTIzID0gMiAqIChxWzFdICogcVsyXSAtIHFbMF0gKiBxWzNdKTtcclxuICAgICAgICBjb25zdCBhMzEgPSAyICogKHFbMF0gKiBxWzJdIC0gcVsxXSAqIHFbM10pO1xyXG4gICAgICAgIGNvbnN0IGEzMiA9IDIgKiAocVsxXSAqIHFbMl0gKyBxWzBdICogcVszXSk7XHJcbiAgICAgICAgY29uc3QgYTMzID0gMSAtIDIgKiAocVswXSAqIHFbMF0gKyBxWzFdICogcVsxXSk7XHJcbiAgICAgICAgcmV0dXJuIFthMTEsIGExMiwgYTEzLCAwLCBhMjEsIGEyMiwgYTIzLCAwLCBhMzEsIGEzMiwgYTMzLCAwLCAwLCAwLCAwLCAxXTtcclxuICAgIH0sXHJcbiAgICAvKlxyXG4gICAgcm90YXRpb24oeCwgeSwgeikge1xyXG4gICAgICByZXR1cm4gdGhpcy54Um90YXRlKHRoaXMueVJvdGF0ZSh0aGlzLnpSb3RhdGlvbih6KSwgeSksIHgpO1xyXG4gICAgfSxcclxuICAgIHJvdGF0aW9uRnJvbU5vcm1hbChuKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnJvdGF0aW9uKE1hdGguYWNvcyhuWzFdKSwgTWF0aC5hY29zKG5bMl0pLCBNYXRoLmFjb3MoblswXSkpO1xyXG4gICAgfSwqL1xyXG4gICAgZGV0ZXJtaW5hdGUobSkge1xyXG4gICAgICAgIGNvbnN0IG0wMCA9IG1bMCAqIDQgKyAwXTtcclxuICAgICAgICBjb25zdCBtMDEgPSBtWzAgKiA0ICsgMV07XHJcbiAgICAgICAgY29uc3QgbTAyID0gbVswICogNCArIDJdO1xyXG4gICAgICAgIGNvbnN0IG0wMyA9IG1bMCAqIDQgKyAzXTtcclxuICAgICAgICBjb25zdCBtMTAgPSBtWzEgKiA0ICsgMF07XHJcbiAgICAgICAgY29uc3QgbTExID0gbVsxICogNCArIDFdO1xyXG4gICAgICAgIGNvbnN0IG0xMiA9IG1bMSAqIDQgKyAyXTtcclxuICAgICAgICBjb25zdCBtMTMgPSBtWzEgKiA0ICsgM107XHJcbiAgICAgICAgY29uc3QgbTIwID0gbVsyICogNCArIDBdO1xyXG4gICAgICAgIGNvbnN0IG0yMSA9IG1bMiAqIDQgKyAxXTtcclxuICAgICAgICBjb25zdCBtMjIgPSBtWzIgKiA0ICsgMl07XHJcbiAgICAgICAgY29uc3QgbTIzID0gbVsyICogNCArIDNdO1xyXG4gICAgICAgIGNvbnN0IG0zMCA9IG1bMyAqIDQgKyAwXTtcclxuICAgICAgICBjb25zdCBtMzEgPSBtWzMgKiA0ICsgMV07XHJcbiAgICAgICAgY29uc3QgbTMyID0gbVszICogNCArIDJdO1xyXG4gICAgICAgIGNvbnN0IG0zMyA9IG1bMyAqIDQgKyAzXTtcclxuICAgICAgICBjb25zdCB0bXBfMCA9IG0yMiAqIG0zMztcclxuICAgICAgICBjb25zdCB0bXBfMSA9IG0zMiAqIG0yMztcclxuICAgICAgICBjb25zdCB0bXBfMiA9IG0xMiAqIG0zMztcclxuICAgICAgICBjb25zdCB0bXBfMyA9IG0zMiAqIG0xMztcclxuICAgICAgICBjb25zdCB0bXBfNCA9IG0xMiAqIG0yMztcclxuICAgICAgICBjb25zdCB0bXBfNSA9IG0yMiAqIG0xMztcclxuICAgICAgICBjb25zdCB0bXBfNiA9IG0wMiAqIG0zMztcclxuICAgICAgICBjb25zdCB0bXBfNyA9IG0zMiAqIG0wMztcclxuICAgICAgICBjb25zdCB0bXBfOCA9IG0wMiAqIG0yMztcclxuICAgICAgICBjb25zdCB0bXBfOSA9IG0yMiAqIG0wMztcclxuICAgICAgICBjb25zdCB0bXBfMTAgPSBtMDIgKiBtMTM7XHJcbiAgICAgICAgY29uc3QgdG1wXzExID0gbTEyICogbTAzO1xyXG4gICAgICAgIGNvbnN0IHQwID0gdG1wXzAgKiBtMTEgK1xyXG4gICAgICAgICAgICB0bXBfMyAqIG0yMSArXHJcbiAgICAgICAgICAgIHRtcF80ICogbTMxIC1cclxuICAgICAgICAgICAgKHRtcF8xICogbTExICsgdG1wXzIgKiBtMjEgKyB0bXBfNSAqIG0zMSk7XHJcbiAgICAgICAgY29uc3QgdDEgPSB0bXBfMSAqIG0wMSArXHJcbiAgICAgICAgICAgIHRtcF82ICogbTIxICtcclxuICAgICAgICAgICAgdG1wXzkgKiBtMzEgLVxyXG4gICAgICAgICAgICAodG1wXzAgKiBtMDEgKyB0bXBfNyAqIG0yMSArIHRtcF84ICogbTMxKTtcclxuICAgICAgICBjb25zdCB0MiA9IHRtcF8yICogbTAxICtcclxuICAgICAgICAgICAgdG1wXzcgKiBtMTEgK1xyXG4gICAgICAgICAgICB0bXBfMTAgKiBtMzEgLVxyXG4gICAgICAgICAgICAodG1wXzMgKiBtMDEgKyB0bXBfNiAqIG0xMSArIHRtcF8xMSAqIG0zMSk7XHJcbiAgICAgICAgY29uc3QgdDMgPSB0bXBfNSAqIG0wMSArXHJcbiAgICAgICAgICAgIHRtcF84ICogbTExICtcclxuICAgICAgICAgICAgdG1wXzExICogbTIxIC1cclxuICAgICAgICAgICAgKHRtcF80ICogbTAxICsgdG1wXzkgKiBtMTEgKyB0bXBfMTAgKiBtMjEpO1xyXG4gICAgICAgIHJldHVybiAxLjAgLyAobTAwICogdDAgKyBtMTAgKiB0MSArIG0yMCAqIHQyICsgbTMwICogdDMpO1xyXG4gICAgfSxcclxuICAgIGRlY29tcG9zZShtKSB7XHJcbiAgICAgICAgbGV0IHN4ID0gdjMubm9ybShtLnNsaWNlKDAsIDMpKTtcclxuICAgICAgICBjb25zdCBzeSA9IHYzLm5vcm0obS5zbGljZSg0LCA3KSk7XHJcbiAgICAgICAgY29uc3Qgc3ogPSB2My5ub3JtKG0uc2xpY2UoOCwgMTEpKTtcclxuICAgICAgICBjb25zdCBkZXQgPSB0aGlzLmRldGVybWluYXRlKG0pO1xyXG4gICAgICAgIGlmIChkZXQgPCAwKSB7XHJcbiAgICAgICAgICAgIHN4ID0gLXN4O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB0cmFuc2xhdGlvbiA9IG5ldyBBcnJheSgzKTtcclxuICAgICAgICBjb25zdCBzY2FsZSA9IG5ldyBBcnJheSgzKTtcclxuICAgICAgICBjb25zdCBSbWF0cml4ID0gWy4uLm1dO1xyXG4gICAgICAgIHRyYW5zbGF0aW9uWzBdID0gbVsxMl07XHJcbiAgICAgICAgdHJhbnNsYXRpb25bMV0gPSBtWzEzXTtcclxuICAgICAgICB0cmFuc2xhdGlvblsyXSA9IG1bMTRdO1xyXG4gICAgICAgIGNvbnN0IGludlNYID0gMSAvIHN4O1xyXG4gICAgICAgIGNvbnN0IGludlNZID0gMSAvIHN5O1xyXG4gICAgICAgIGNvbnN0IGludlNaID0gMSAvIHN6O1xyXG4gICAgICAgIFJtYXRyaXhbMF0gKj0gaW52U1g7XHJcbiAgICAgICAgUm1hdHJpeFsxXSAqPSBpbnZTWDtcclxuICAgICAgICBSbWF0cml4WzJdICo9IGludlNYO1xyXG4gICAgICAgIFJtYXRyaXhbNF0gKj0gaW52U1k7XHJcbiAgICAgICAgUm1hdHJpeFs1XSAqPSBpbnZTWTtcclxuICAgICAgICBSbWF0cml4WzZdICo9IGludlNZO1xyXG4gICAgICAgIFJtYXRyaXhbOF0gKj0gaW52U1o7XHJcbiAgICAgICAgUm1hdHJpeFs5XSAqPSBpbnZTWjtcclxuICAgICAgICBSbWF0cml4WzEwXSAqPSBpbnZTWjtcclxuICAgICAgICBzY2FsZVswXSA9IHN4O1xyXG4gICAgICAgIHNjYWxlWzFdID0gc3k7XHJcbiAgICAgICAgc2NhbGVbMl0gPSBzejtcclxuICAgICAgICByZXR1cm4geyB0cmFuc2xhdGlvbiwgUm1hdHJpeCwgc2NhbGUgfTtcclxuICAgIH0sXHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IG00O1xyXG4iLCJjb25zdCBkb3QgPSAoYSwgYikgPT4gYVswXSAqIGJbMF0gKyBhWzFdICogYlsxXSArIGFbMl0gKiBiWzJdO1xyXG5jb25zdCBjcm9zcyA9IChhLCBiKSA9PiBbXHJcbiAgICBhWzFdICogYlsyXSAtIGJbMV0gKiBhWzJdLFxyXG4gICAgYVsyXSAqIGJbMF0gLSBiWzJdICogYVswXSxcclxuICAgIGFbMF0gKiBiWzFdIC0gYlswXSAqIGFbMV0sXHJcbl07XHJcbmNvbnN0IHNjYWxlID0gKGEsIHNjYWxhcikgPT4gW2FbMF0gKiBzY2FsYXIsIGFbMV0gKiBzY2FsYXIsIGFbMl0gKiBzY2FsYXJdO1xyXG5jb25zdCBzdW0gPSAoYSwgYikgPT4gW2FbMF0gKyBiWzBdLCBhWzFdICsgYlsxXSwgYVsyXSArIGJbMl1dO1xyXG5jb25zdCBkaWZmID0gKGEsIGIpID0+IFthWzBdIC0gYlswXSwgYVsxXSAtIGJbMV0sIGFbMl0gLSBiWzJdXTtcclxuY29uc3Qgbm9ybSA9IChhKSA9PiBNYXRoLnNxcnQoYVswXSAqIGFbMF0gKyBhWzFdICogYVsxXSArIGFbMl0gKiBhWzJdKTtcclxuY29uc3Qgbm9ybVNxID0gKGEpID0+IGFbMF0gKiBhWzBdICsgYVsxXSAqIGFbMV0gKyBhWzJdICogYVsyXTtcclxuY29uc3Qgbm9ybWFsaXplID0gKGEpID0+IHtcclxuICAgIGNvbnN0IGxlbmd0aCA9IG5vcm0oYSk7XHJcbiAgICBpZiAobGVuZ3RoID09PSAwKVxyXG4gICAgICAgIHJldHVybiBhO1xyXG4gICAgcmV0dXJuIFthWzBdIC8gbGVuZ3RoLCBhWzFdIC8gbGVuZ3RoLCBhWzJdIC8gbGVuZ3RoXTtcclxufTtcclxuY29uc3QgaXNOdWxsID0gKGEpID0+IGFbMF0gKiBhWzBdICsgYVsxXSAqIGFbMV0gKyBhWzJdICogYVsyXSA9PT0gMDtcclxuY29uc3QgaXNFcXVhbCA9IChhLCBiKSA9PiBhWzBdID09IGJbMF0gJiYgYVsxXSA9PSBiWzFdICYmIGFbMl0gPT0gYlsyXTtcclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgc3VtLFxyXG4gICAgZGlmZixcclxuICAgIHNjYWxlLFxyXG4gICAgZG90LFxyXG4gICAgY3Jvc3MsXHJcbiAgICBub3JtLFxyXG4gICAgbm9ybVNxLFxyXG4gICAgbm9ybWFsaXplLFxyXG4gICAgaXNFcXVhbCxcclxuICAgIGlzTnVsbCxcclxufTtcclxuIiwiaW1wb3J0IHsgdjMsIG0zLCBBQUJCLCBtNCB9IGZyb20gXCJyb21hbnBwcG1hdGhcIjtcclxuY29uc3QgeEF4aXMgPSBbMSwgMCwgMF07XHJcbmNvbnN0IHlBeGlzID0gWzAsIDEsIDBdO1xyXG5jb25zdCB6QXhpcyA9IFswLCAwLCAxXTtcclxuY29uc3QgeEF4aXNOZWdhdGl2ZSA9IHYzLnNjYWxlKHhBeGlzLCAtMSk7XHJcbmNvbnN0IHlBeGlzTmVnYXRpdmUgPSB2My5zY2FsZSh5QXhpcywgLTEpO1xyXG5jb25zdCB6QXhpc05lZ2F0aXZlID0gdjMuc2NhbGUoekF4aXMsIC0xKTtcclxuY2xhc3MgQ29sbGlkZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5SbWF0cml4ID0gbTMuaWRlbnRpdHkoKTtcclxuICAgICAgICB0aGlzLlJtYXRyaXhJbnZlcnNlID0gbTMuaWRlbnRpdHkoKTtcclxuICAgICAgICB0aGlzLnBvcyA9IFswLCAwLCAwXTtcclxuICAgICAgICB0aGlzLnR5cGUgPSBcInBvaW50XCI7XHJcbiAgICB9XHJcbiAgICB0cmFuc2xhdGUodikge1xyXG4gICAgICAgIHRoaXMucG9zID0gdjMuc3VtKHRoaXMucG9zLCB2KTtcclxuICAgIH1cclxuICAgIHNldFRyYW5zbGF0aW9uKHRyYW5zbGF0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5wb3MgPSBbLi4udHJhbnNsYXRpb25dO1xyXG4gICAgfVxyXG4gICAgcm90YXRlKHIpIHtcclxuICAgICAgICB0aGlzLlJtYXRyaXggPSBtMy54Um90YXRlKHRoaXMuUm1hdHJpeCwgclswXSk7XHJcbiAgICAgICAgdGhpcy5SbWF0cml4ID0gbTMueVJvdGF0ZSh0aGlzLlJtYXRyaXgsIHJbMV0pO1xyXG4gICAgICAgIHRoaXMuUm1hdHJpeCA9IG0zLnpSb3RhdGUodGhpcy5SbWF0cml4LCByWzJdKTtcclxuICAgICAgICB0aGlzLlJtYXRyaXhJbnZlcnNlID0gbTMudHJhbnNwb3NlKHRoaXMuUm1hdHJpeCk7XHJcbiAgICB9XHJcbiAgICBzZXRSb3RhdGlvbihyKSB7XHJcbiAgICAgICAgdGhpcy5SbWF0cml4ID0gbTMueFJvdGF0aW9uKHJbMF0pO1xyXG4gICAgICAgIHRoaXMuUm1hdHJpeCA9IG0zLnlSb3RhdGUodGhpcy5SbWF0cml4LCByWzFdKTtcclxuICAgICAgICB0aGlzLlJtYXRyaXggPSBtMy56Um90YXRlKHRoaXMuUm1hdHJpeCwgclsyXSk7XHJcbiAgICAgICAgdGhpcy5SbWF0cml4SW52ZXJzZSA9IG0zLnRyYW5zcG9zZSh0aGlzLlJtYXRyaXgpO1xyXG4gICAgfVxyXG4gICAgZ2V0QUFCQigpIHtcclxuICAgICAgICBjb25zdCBtYXhYID0gdGhpcy5zdXBwb3J0KHhBeGlzKVswXTtcclxuICAgICAgICBjb25zdCBtYXhZID0gdGhpcy5zdXBwb3J0KHlBeGlzKVsxXTtcclxuICAgICAgICBjb25zdCBtYXhaID0gdGhpcy5zdXBwb3J0KHpBeGlzKVsyXTtcclxuICAgICAgICBjb25zdCBtaW5YID0gdGhpcy5zdXBwb3J0KHhBeGlzTmVnYXRpdmUpWzBdO1xyXG4gICAgICAgIGNvbnN0IG1pblkgPSB0aGlzLnN1cHBvcnQoeUF4aXNOZWdhdGl2ZSlbMV07XHJcbiAgICAgICAgY29uc3QgbWluWiA9IHRoaXMuc3VwcG9ydCh6QXhpc05lZ2F0aXZlKVsyXTtcclxuICAgICAgICByZXR1cm4gbmV3IEFBQkIoW21pblgsIG1pblksIG1pblpdLCBbbWF4WCwgbWF4WSwgbWF4Wl0pO1xyXG4gICAgfVxyXG4gICAgc2V0Um1hdHJpeChtYXRyaXgpIHtcclxuICAgICAgICB0aGlzLlJtYXRyaXggPSBbLi4ubWF0cml4XTtcclxuICAgICAgICB0aGlzLlJtYXRyaXhJbnZlcnNlID0gbTMudHJhbnNwb3NlKG1hdHJpeCk7XHJcbiAgICB9XHJcbiAgICBnZXRNNCgpIHtcclxuICAgICAgICBjb25zdCBtID0gbTQubTNUb200KHRoaXMuUm1hdHJpeCk7XHJcbiAgICAgICAgbVsxMl0gPSB0aGlzLnBvc1swXTtcclxuICAgICAgICBtWzEzXSA9IHRoaXMucG9zWzFdO1xyXG4gICAgICAgIG1bMTRdID0gdGhpcy5wb3NbMl07XHJcbiAgICAgICAgbVsxNV0gPSAxO1xyXG4gICAgICAgIHJldHVybiBtO1xyXG4gICAgfVxyXG4gICAgbG9jYWxUb0dsb2JhbCh2KSB7XHJcbiAgICAgICAgbGV0IGdsb2JhbCA9IG0zLnRyYW5zZm9ybVBvaW50KHRoaXMuUm1hdHJpeCwgdik7XHJcbiAgICAgICAgcmV0dXJuIHYzLnN1bSh0aGlzLnBvcywgZ2xvYmFsKTtcclxuICAgIH1cclxuICAgIGdldENsb3Nlc3RGYWNlQnlOb3JtYWwobm9ybWFsKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmVydGljZXM6IFt0aGlzLnBvc10sXHJcbiAgICAgICAgICAgIG5vcm1hbDogdjMuc2NhbGUobm9ybWFsLCAtMSksXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGdldEludmVyc2VJbmVydGlhVGVuc29yKG1hc3MpIHtcclxuICAgICAgICByZXR1cm4gbTMuaWRlbnRpdHkoKTtcclxuICAgIH1cclxuICAgIHN1cHBvcnQoZGlyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zO1xyXG4gICAgfVxyXG59XHJcbmNsYXNzIEJveCBleHRlbmRzIENvbGxpZGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKGEgPSAxLCBiID0gMSwgYyA9IDEpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMubWluID0gWy1hIC8gMiwgLWIgLyAyLCAtYyAvIDJdO1xyXG4gICAgICAgIHRoaXMubWF4ID0gW2EgLyAyLCBiIC8gMiwgYyAvIDJdO1xyXG4gICAgfVxyXG4gICAgZ2V0QUFCQigpIHtcclxuICAgICAgICBjb25zdCBtYXhYID0gdGhpcy5zdXBwb3J0KHhBeGlzKVswXTtcclxuICAgICAgICBjb25zdCBtYXhZID0gdGhpcy5zdXBwb3J0KHlBeGlzKVsxXTtcclxuICAgICAgICBjb25zdCBtYXhaID0gdGhpcy5zdXBwb3J0KHpBeGlzKVsyXTtcclxuICAgICAgICBjb25zdCBtaW5YID0gdGhpcy5zdXBwb3J0KHhBeGlzTmVnYXRpdmUpWzBdO1xyXG4gICAgICAgIGNvbnN0IG1pblkgPSB0aGlzLnN1cHBvcnQoeUF4aXNOZWdhdGl2ZSlbMV07XHJcbiAgICAgICAgY29uc3QgbWluWiA9IHRoaXMuc3VwcG9ydCh6QXhpc05lZ2F0aXZlKVsyXTtcclxuICAgICAgICByZXR1cm4gbmV3IEFBQkIoW21pblgsIG1pblksIG1pblpdLCBbbWF4WCwgbWF4WSwgbWF4Wl0pO1xyXG4gICAgfVxyXG4gICAgc3VwcG9ydChkaXIpIHtcclxuICAgICAgICBjb25zdCBfZGlyID0gbTMudHJhbnNmb3JtUG9pbnQodGhpcy5SbWF0cml4SW52ZXJzZSwgZGlyKTtcclxuICAgICAgICBjb25zdCByZXMgPSBbMCwgMCwgMF07XHJcbiAgICAgICAgcmVzWzBdID0gX2RpclswXSA+IDAgPyB0aGlzLm1heFswXSA6IHRoaXMubWluWzBdO1xyXG4gICAgICAgIHJlc1sxXSA9IF9kaXJbMV0gPiAwID8gdGhpcy5tYXhbMV0gOiB0aGlzLm1pblsxXTtcclxuICAgICAgICByZXNbMl0gPSBfZGlyWzJdID4gMCA/IHRoaXMubWF4WzJdIDogdGhpcy5taW5bMl07XHJcbiAgICAgICAgY29uc3Qgc3VwID0gbTMudHJhbnNmb3JtUG9pbnQodGhpcy5SbWF0cml4LCByZXMpO1xyXG4gICAgICAgIHJldHVybiB2My5zdW0oc3VwLCB0aGlzLnBvcyk7XHJcbiAgICB9XHJcbiAgICBnZXRJbnZlcnNlSW5lcnRpYVRlbnNvcihtYXNzKSB7XHJcbiAgICAgICAgY29uc3QgaTEgPSAobWFzcyAvIDEyKSAqICh0aGlzLm1heFsxXSAqIHRoaXMubWF4WzFdICsgdGhpcy5tYXhbMl0gKiB0aGlzLm1heFsyXSk7XHJcbiAgICAgICAgY29uc3QgaTIgPSAobWFzcyAvIDEyKSAqICh0aGlzLm1heFswXSAqIHRoaXMubWF4WzBdICsgdGhpcy5tYXhbMl0gKiB0aGlzLm1heFsyXSk7XHJcbiAgICAgICAgY29uc3QgaTMgPSAobWFzcyAvIDEyKSAqICh0aGlzLm1heFswXSAqIHRoaXMubWF4WzBdICsgdGhpcy5tYXhbMV0gKiB0aGlzLm1heFsxXSk7XHJcbiAgICAgICAgY29uc3QgbSA9IG0zLm11bHRpcGx5KG0zLm11bHRpcGx5KHRoaXMuUm1hdHJpeEludmVyc2UsIFtcclxuICAgICAgICAgICAgMSAvIGkxLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAxIC8gaTIsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDEgLyBpMyxcclxuICAgICAgICBdKSwgdGhpcy5SbWF0cml4KTtcclxuICAgICAgICByZXR1cm4gbTtcclxuICAgIH1cclxuICAgIGdldE00KCkge1xyXG4gICAgICAgIGNvbnN0IG0gPSBtNC5tM1RvbTQodGhpcy5SbWF0cml4KTtcclxuICAgICAgICBtWzEyXSA9IHRoaXMucG9zWzBdO1xyXG4gICAgICAgIG1bMTNdID0gdGhpcy5wb3NbMV07XHJcbiAgICAgICAgbVsxNF0gPSB0aGlzLnBvc1syXTtcclxuICAgICAgICBtWzE1XSA9IDE7XHJcbiAgICAgICAgY29uc3Qgc2NhbGUgPSB2My5kaWZmKHRoaXMubWF4LCB0aGlzLm1pbik7XHJcbiAgICAgICAgcmV0dXJuIG00LnNjYWxlKG0sIC4uLnNjYWxlKTtcclxuICAgIH1cclxuICAgIGdldENsb3Nlc3RGYWNlQnlOb3JtYWwobm9ybWFsKSB7XHJcbiAgICAgICAgY29uc3QgeyBSbWF0cml4IH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IGdsb2JhbE5vcm1hbHMgPSBCb3gubm9ybWFscy5tYXAoKG4pID0+IG0zLnRyYW5zZm9ybVBvaW50KFJtYXRyaXgsIG4pKTtcclxuICAgICAgICBsZXQgbWluRG90ID0gdjMuZG90KG5vcm1hbCwgZ2xvYmFsTm9ybWFsc1swXSk7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMSwgbiA9IGdsb2JhbE5vcm1hbHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vY29uc3QgX25vcm1hbCA9IG0zLnRyYW5zZm9ybVBvaW50KFJtYXRyaXgsIG5vcm1hbHNbaV0pXHJcbiAgICAgICAgICAgIGNvbnN0IF9kb3QgPSB2My5kb3QoZ2xvYmFsTm9ybWFsc1tpXSwgbm9ybWFsKTtcclxuICAgICAgICAgICAgaWYgKF9kb3QgPCBtaW5Eb3QpIHtcclxuICAgICAgICAgICAgICAgIG1pbkRvdCA9IF9kb3Q7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZmFjZUluZGljZXMgPSBCb3guaW5kaWNlc1tpbmRleF07XHJcbiAgICAgICAgY29uc3QgbSA9IHRoaXMuZ2V0TTQoKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2ZXJ0aWNlczogZmFjZUluZGljZXMubWFwKChpKSA9PiBtNC50cmFuc2Zvcm1Qb2ludChtLCBCb3gucG9pbnRzW2ldKSksXHJcbiAgICAgICAgICAgIG5vcm1hbDogZ2xvYmFsTm9ybWFsc1tpbmRleF0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5Cb3gucG9pbnRzID0gW1xyXG4gICAgWy0xIC8gMiwgLTEgLyAyLCAtMSAvIDJdLFxyXG4gICAgWzEgLyAyLCAtMSAvIDIsIC0xIC8gMl0sXHJcbiAgICBbMSAvIDIsIC0xIC8gMiwgMSAvIDJdLFxyXG4gICAgWy0xIC8gMiwgLTEgLyAyLCAxIC8gMl0sXHJcbiAgICBbLTEgLyAyLCAxIC8gMiwgLTEgLyAyXSxcclxuICAgIFsxIC8gMiwgMSAvIDIsIC0xIC8gMl0sXHJcbiAgICBbMSAvIDIsIDEgLyAyLCAxIC8gMl0sXHJcbiAgICBbLTEgLyAyLCAxIC8gMiwgMSAvIDJdLFxyXG5dO1xyXG5Cb3guaW5kaWNlcyA9IFtcclxuICAgIFswLCA0LCA1LCAxXSxcclxuICAgIFszLCA3LCA2LCAyXSxcclxuICAgIFswLCAxLCAyLCAzXSxcclxuICAgIFs0LCA1LCA2LCA3XSxcclxuICAgIFswLCAzLCA3LCA0XSxcclxuICAgIFsxLCAyLCA2LCA1XSwgLy8gK3hcclxuXTtcclxuQm94Lm5vcm1hbHMgPSBbXHJcbiAgICBbMCwgMCwgLTFdLFxyXG4gICAgWzAsIDAsIDFdLFxyXG4gICAgWzAsIC0xLCAwXSxcclxuICAgIFswLCAxLCAwXSxcclxuICAgIFstMSwgMCwgMF0sXHJcbiAgICBbMSwgMCwgMF0sXHJcbl07XHJcbmNsYXNzIFNwaGVyZSBleHRlbmRzIENvbGxpZGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHJhZGl1cyA9IDEpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMucmFkaXVzID0gcmFkaXVzO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IFwic3BoZXJlXCI7XHJcbiAgICB9XHJcbiAgICBnZXRBQUJCKCkge1xyXG4gICAgICAgIGNvbnN0IHsgcmFkaXVzIH0gPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBuZXcgQUFCQih2My5zdW0odGhpcy5wb3MsIFstcmFkaXVzLCAtcmFkaXVzLCAtcmFkaXVzXSksIHYzLnN1bSh0aGlzLnBvcywgW3JhZGl1cywgcmFkaXVzLCByYWRpdXNdKSk7XHJcbiAgICB9XHJcbiAgICBzdXBwb3J0KGRpcikge1xyXG4gICAgICAgIHJldHVybiB2My5zdW0odjMuc2NhbGUodjMubm9ybWFsaXplKGRpciksIHRoaXMucmFkaXVzKSwgdGhpcy5wb3MpO1xyXG4gICAgfVxyXG4gICAgZ2V0TTQoKSB7XHJcbiAgICAgICAgY29uc3QgbSA9IG00Lm0zVG9tNCh0aGlzLlJtYXRyaXgpO1xyXG4gICAgICAgIG1bMTJdID0gdGhpcy5wb3NbMF07XHJcbiAgICAgICAgbVsxM10gPSB0aGlzLnBvc1sxXTtcclxuICAgICAgICBtWzE0XSA9IHRoaXMucG9zWzJdO1xyXG4gICAgICAgIG1bMTVdID0gMTtcclxuICAgICAgICBjb25zdCB7IHJhZGl1cyB9ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gbTQuc2NhbGUobSwgcmFkaXVzLCByYWRpdXMsIHJhZGl1cyk7XHJcbiAgICB9XHJcbiAgICBnZXRDbG9zZXN0RmFjZUJ5Tm9ybWFsKG5vcm1hbCkge1xyXG4gICAgICAgIGNvbnN0IHJldmVyc2UgPSB2My5zY2FsZShub3JtYWwsIC0xKTtcclxuICAgICAgICByZXR1cm4geyB2ZXJ0aWNlczogW3YzLnNjYWxlKHJldmVyc2UsIHRoaXMucmFkaXVzKV0sIG5vcm1hbDogcmV2ZXJzZSB9O1xyXG4gICAgfVxyXG4gICAgZ2V0SW52ZXJzZUluZXJ0aWFUZW5zb3IobWFzcykge1xyXG4gICAgICAgIGNvbnN0IHsgcmFkaXVzIH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IG0gPSBbXHJcbiAgICAgICAgICAgICgyICogbWFzcyAqIHJhZGl1cyAqIHJhZGl1cykgLyA1LFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAoMiAqIG1hc3MgKiByYWRpdXMgKiByYWRpdXMpIC8gNSxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgKDIgKiBtYXNzICogcmFkaXVzICogcmFkaXVzKSAvIDUsXHJcbiAgICAgICAgXTtcclxuICAgICAgICByZXR1cm4gbTtcclxuICAgIH1cclxufVxyXG5jbGFzcyBDeWxpbmRlciBleHRlbmRzIENvbGxpZGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHJhZGl1cywgaGVpZ2h0LCBudW1TZWdtZW50cyA9IDYpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMucmFkaXVzID0gcmFkaXVzO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIGNvbnN0IHNlZ21lbnRBbmdsZSA9ICgyICogTWF0aC5QSSkgLyBudW1TZWdtZW50cztcclxuICAgICAgICB0aGlzLmNpcmNsZVBvaW50cyA9IFsuLi5uZXcgQXJyYXkobnVtU2VnbWVudHMpXS5tYXAoKF8sIGkpID0+IFtcclxuICAgICAgICAgICAgTWF0aC5jb3MoaSAqIHNlZ21lbnRBbmdsZSksXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIE1hdGguc2luKGkgKiBzZWdtZW50QW5nbGUpLFxyXG4gICAgICAgIF0pO1xyXG4gICAgfVxyXG4gICAgc3VwcG9ydChkaXIpIHtcclxuICAgICAgICBjb25zdCBfZGlyID0gbTMudHJhbnNmb3JtUG9pbnQodGhpcy5SbWF0cml4SW52ZXJzZSwgZGlyKTtcclxuICAgICAgICBjb25zdCBkaXJfeHogPSBbX2RpclswXSwgMCwgX2RpclsyXV07XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdjMuc2NhbGUodjMubm9ybWFsaXplKGRpcl94eiksIHRoaXMucmFkaXVzKTtcclxuICAgICAgICByZXN1bHRbMV0gPSBfZGlyWzFdID4gMCA/IHRoaXMuaGVpZ2h0IC8gMiA6IC10aGlzLmhlaWdodCAvIDI7XHJcbiAgICAgICAgcmV0dXJuIHYzLnN1bShtMy50cmFuc2Zvcm1Qb2ludCh0aGlzLlJtYXRyaXgsIHJlc3VsdCksIHRoaXMucG9zKTtcclxuICAgIH1cclxuICAgIGdldE00KCkge1xyXG4gICAgICAgIGNvbnN0IG0gPSBtNC5tM1RvbTQodGhpcy5SbWF0cml4KTtcclxuICAgICAgICBtWzEyXSA9IHRoaXMucG9zWzBdO1xyXG4gICAgICAgIG1bMTNdID0gdGhpcy5wb3NbMV07XHJcbiAgICAgICAgbVsxNF0gPSB0aGlzLnBvc1syXTtcclxuICAgICAgICBtWzE1XSA9IDE7XHJcbiAgICAgICAgY29uc3QgeyByYWRpdXMsIGhlaWdodCB9ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gbTQuc2NhbGUobSwgcmFkaXVzLCBoZWlnaHQsIHJhZGl1cyk7XHJcbiAgICB9XHJcbiAgICBnZXRDbG9zZXN0RmFjZUJ5Tm9ybWFsKG5vcm1hbCkge1xyXG4gICAgICAgIGNvbnN0IHsgUm1hdHJpeCwgUm1hdHJpeEludmVyc2UgfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgX25vcm1hbCA9IG0zLnRyYW5zZm9ybVBvaW50KFJtYXRyaXhJbnZlcnNlLCB2My5zY2FsZShub3JtYWwsIC0xKSk7XHJcbiAgICAgICAgY29uc3QgbSA9IHRoaXMuZ2V0TTQoKTtcclxuICAgICAgICBjb25zdCBjb3MgPSB2My5kb3QoX25vcm1hbCwgWzAsIDEsIDBdKTtcclxuICAgICAgICBjb25zdCBzaWduID0gTWF0aC5zaWduKGNvcyk7XHJcbiAgICAgICAgaWYgKGNvcyAqIHNpZ24gPCAwLjcwNykge1xyXG4gICAgICAgICAgICBjb25zdCBsb2NhbE5vcm1hbCA9IHYzLm5vcm1hbGl6ZShbX25vcm1hbFswXSwgMCwgX25vcm1hbFsyXV0pO1xyXG4gICAgICAgICAgICBjb25zdCB2ZXJ0aWNlcyA9IFtcclxuICAgICAgICAgICAgICAgIG00LnRyYW5zZm9ybVBvaW50KG0sIFtfbm9ybWFsWzBdLCAwLjUsIF9ub3JtYWxbMl1dKSxcclxuICAgICAgICAgICAgICAgIG00LnRyYW5zZm9ybVBvaW50KG0sIFtfbm9ybWFsWzBdLCAtMC41LCBfbm9ybWFsWzJdXSksXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZlcnRpY2VzLCBub3JtYWw6IG0zLnRyYW5zZm9ybVBvaW50KFJtYXRyaXgsIGxvY2FsTm9ybWFsKSB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBsb2NhbE5vcm1hbCA9IHYzLnNjYWxlKFswLCAxLCAwXSwgc2lnbik7XHJcbiAgICAgICAgY29uc3QgdmVydGljZXMgPSB0aGlzLmNpcmNsZVBvaW50cy5tYXAoKHApID0+IG00LnRyYW5zZm9ybVBvaW50KG0sIFtwWzBdLCBzaWduICogMC41LCBwWzJdXSkpO1xyXG4gICAgICAgIHJldHVybiB7IHZlcnRpY2VzLCBub3JtYWw6IG0zLnRyYW5zZm9ybVBvaW50KFJtYXRyaXgsIGxvY2FsTm9ybWFsKSB9O1xyXG4gICAgfVxyXG4gICAgZ2V0SW52ZXJzZUluZXJ0aWFUZW5zb3IobWFzcykge1xyXG4gICAgICAgIGNvbnN0IHsgcmFkaXVzLCBoZWlnaHQgfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgaTEgPSAobWFzcyAvIDEyKSAqICgzICogcmFkaXVzICogcmFkaXVzICsgaGVpZ2h0ICogaGVpZ2h0KTtcclxuICAgICAgICBjb25zdCBpMyA9IChtYXNzIC8gMikgKiByYWRpdXMgKiByYWRpdXM7XHJcbiAgICAgICAgY29uc3QgbSA9IG0zLm11bHRpcGx5KG0zLm11bHRpcGx5KHRoaXMuUm1hdHJpeCwgWzEgLyBpMSwgMCwgMCwgMCwgMSAvIGkxLCAwLCAwLCAwLCAxIC8gaTNdKSwgdGhpcy5SbWF0cml4SW52ZXJzZSk7XHJcbiAgICAgICAgcmV0dXJuIG07XHJcbiAgICB9XHJcbiAgICBnZXRBQUJCKCkge1xyXG4gICAgICAgIGNvbnN0IHsgcmFkaXVzLCBoZWlnaHQgfSA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBBQUJCKHYzLnN1bSh0aGlzLnBvcywgWy1yYWRpdXMsIC1oZWlnaHQsIC1yYWRpdXNdKSwgdjMuc3VtKHRoaXMucG9zLCBbcmFkaXVzLCBoZWlnaHQsIHJhZGl1c10pKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgeyBCb3gsIFNwaGVyZSwgQ3lsaW5kZXIgfTtcclxuIiwiaW1wb3J0IHsgdjMsIG0zIH0gZnJvbSBcInJvbWFucHBwbWF0aFwiO1xyXG5pbXBvcnQgeyBDb25zdHJhaW50RXF1YXRpb24sIENvbnRhY3RFcXVhdGlvbiwgRnJpY3Rpb25FcXVhdGlvbiwgfSBmcm9tIFwiLi9FcXVhdGlvbnNcIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi9jb25maWdcIjtcclxuY29uc3QgeyBDT05UQUNUX1RSRVNIT0xELCBDT05UQUNUX0JJQVMgfSA9IGNvbmZpZztcclxuZXhwb3J0IGNsYXNzIENvbnN0cmFpbnQge1xyXG4gICAgY29uc3RydWN0b3IoYm9keTEsIGJvZHkyLCByYUxvY2FsLCByYkxvY2FsLCBvcHQpIHtcclxuICAgICAgICB0aGlzLmJvZHkxID0gYm9keTE7XHJcbiAgICAgICAgdGhpcy5ib2R5MiA9IGJvZHkyO1xyXG4gICAgICAgIHRoaXMucmFMb2NhbCA9IHJhTG9jYWw7XHJcbiAgICAgICAgdGhpcy5yYkxvY2FsID0gcmJMb2NhbDtcclxuICAgICAgICB0aGlzLmJpYXNGYWN0b3IgPSBvcHQuYmlhc0ZhY3RvciB8IDAuMTI1O1xyXG4gICAgICAgIHRoaXMudHJlc2hvbGQgPSBvcHQudHJlc2hvbGQgfCAwLjAwMDAwNTtcclxuICAgICAgICB0aGlzLmxhbWJkYU1pbiA9IG9wdC5sYW1iZGFNaW4gfCAtSW5maW5pdHk7XHJcbiAgICAgICAgdGhpcy5sYW1iZGFNYXggPSBvcHQubGFtYmRhTWF4IHwgSW5maW5pdHk7XHJcbiAgICAgICAgdGhpcy5wcmV2TGFtYmRhID0gMDtcclxuICAgIH1cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICBjb25zdCBjb2xsaWRlcjEgPSB0aGlzLmJvZHkxLmNvbGxpZGVyO1xyXG4gICAgICAgIGNvbnN0IGNvbGxpZGVyMiA9IHRoaXMuYm9keTIuY29sbGlkZXI7XHJcbiAgICAgICAgdGhpcy5yYSA9IG0zLnRyYW5zZm9ybVBvaW50KGNvbGxpZGVyMS5SbWF0cml4LCB0aGlzLnJhTG9jYWwpO1xyXG4gICAgICAgIHRoaXMucmIgPSBtMy50cmFuc2Zvcm1Qb2ludChjb2xsaWRlcjIuUm1hdHJpeCwgdGhpcy5yYkxvY2FsKTtcclxuICAgICAgICBjb25zdCBQQSA9IHYzLnN1bShjb2xsaWRlcjEucG9zLCB0aGlzLnJhKTtcclxuICAgICAgICBjb25zdCBQQiA9IHYzLnN1bShjb2xsaWRlcjIucG9zLCB0aGlzLnJiKTtcclxuICAgICAgICBjb25zdCBkZWx0YVBBID0gdjMuZGlmZihQQSwgdGhpcy5QQSk7XHJcbiAgICAgICAgY29uc3QgZGVsdGFQQiA9IHYzLmRpZmYoUEIsIHRoaXMuUEIpO1xyXG4gICAgICAgIHRoaXMuUEEgPSBQQTtcclxuICAgICAgICB0aGlzLlBCID0gUEI7XHJcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gdjMuZGlmZihQQSwgUEIpO1xyXG4gICAgICAgIHRoaXMucG9zaXRpb25FcnJvciA9IHYzLm5vcm0oZGlyZWN0aW9uKTtcclxuICAgICAgICB0aGlzLm4gPSB2My5zY2FsZShkaXJlY3Rpb24sIDEgLyB0aGlzLnBvc2l0aW9uRXJyb3IpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRlbHRhUEEsXHJcbiAgICAgICAgICAgIGRlbHRhUEIsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGdldEVxdWF0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgQ29uc3RyYWludEVxdWF0aW9uKHRoaXMuYm9keTEsIHRoaXMuYm9keTIsIHRoaXMucmEsIHRoaXMucmIsIHRoaXMubiwgdGhpcy5wb3NpdGlvbkVycm9yLCB0aGlzLmJpYXNGYWN0b3IsIHRoaXMubGFtYmRhTWluLCB0aGlzLmxhbWJkYU1heCwgdGhpcy50cmVzaG9sZCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIENvbnRhY3RDb25zdHJhaW50IHtcclxuICAgIGNvbnN0cnVjdG9yKGJvZHkxLCBib2R5MiwgcmFMb2NhbCwgcmJMb2NhbCwgcmEsIHJiLCBQQSwgUEIsIG4sIHBvc2l0aW9uRXJyb3IsIGksIGopIHtcclxuICAgICAgICB0aGlzLmJvZHkxID0gYm9keTE7XHJcbiAgICAgICAgdGhpcy5ib2R5MiA9IGJvZHkyO1xyXG4gICAgICAgIHRoaXMucmFMb2NhbCA9IHJhTG9jYWw7XHJcbiAgICAgICAgdGhpcy5yYkxvY2FsID0gcmJMb2NhbDtcclxuICAgICAgICB0aGlzLnJhID0gcmE7XHJcbiAgICAgICAgdGhpcy5yYiA9IHJiO1xyXG4gICAgICAgIHRoaXMuUEEgPSBQQTtcclxuICAgICAgICB0aGlzLlBCID0gUEI7XHJcbiAgICAgICAgdGhpcy5uID0gbjtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uRXJyb3IgPSBwb3NpdGlvbkVycm9yO1xyXG4gICAgICAgIHRoaXMuaSA9IGk7XHJcbiAgICAgICAgdGhpcy5qID0gajtcclxuICAgICAgICB0aGlzLmJpYXNGYWN0b3IgPSBDT05UQUNUX0JJQVM7XHJcbiAgICAgICAgdGhpcy50cmVzaG9sZCA9IENPTlRBQ1RfVFJFU0hPTEQ7XHJcbiAgICAgICAgdGhpcy5sYW1iZGFNaW4gPSBDb250YWN0Q29uc3RyYWludC5vcHQubGFtYmRhTWluO1xyXG4gICAgICAgIHRoaXMubGFtYmRhTWF4ID0gQ29udGFjdENvbnN0cmFpbnQub3B0LmxhbWJkYU1heDtcclxuICAgIH1cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICBjb25zdCBjb2xsaWRlcjEgPSB0aGlzLmJvZHkxLmNvbGxpZGVyO1xyXG4gICAgICAgIGNvbnN0IGNvbGxpZGVyMiA9IHRoaXMuYm9keTIuY29sbGlkZXI7XHJcbiAgICAgICAgdGhpcy5yYSA9IG0zLnRyYW5zZm9ybVBvaW50KGNvbGxpZGVyMS5SbWF0cml4LCB0aGlzLnJhTG9jYWwpO1xyXG4gICAgICAgIHRoaXMucmIgPSBtMy50cmFuc2Zvcm1Qb2ludChjb2xsaWRlcjIuUm1hdHJpeCwgdGhpcy5yYkxvY2FsKTtcclxuICAgICAgICBjb25zdCBQQSA9IHYzLnN1bShjb2xsaWRlcjEucG9zLCB0aGlzLnJhKTtcclxuICAgICAgICBjb25zdCBQQiA9IHYzLnN1bShjb2xsaWRlcjIucG9zLCB0aGlzLnJiKTtcclxuICAgICAgICBjb25zdCBkZWx0YVBBID0gdjMuZGlmZihQQSwgdGhpcy5QQSk7XHJcbiAgICAgICAgY29uc3QgZGVsdGFQQiA9IHYzLmRpZmYoUEIsIHRoaXMuUEIpO1xyXG4gICAgICAgIHRoaXMuUEEgPSBQQTtcclxuICAgICAgICB0aGlzLlBCID0gUEI7XHJcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gdjMuZGlmZihQQSwgUEIpO1xyXG4gICAgICAgIHRoaXMucG9zaXRpb25FcnJvciA9IHYzLmRvdCh0aGlzLm4sIGRpcmVjdGlvbik7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGVsdGFQQSxcclxuICAgICAgICAgICAgZGVsdGFQQixcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgZ2V0RXF1YXRpb24oKSB7XHJcbiAgICAgICAgY29uc3QgbGFtYmRhTWF4ID0gTWF0aC5tYXgoMSwgdjMubm9ybSh2My5zdW0odjMuc2NhbGUodGhpcy5ib2R5MS52ZWxvY2l0eSwgdGhpcy5ib2R5MS5tYXNzKSwgdjMuc2NhbGUodGhpcy5ib2R5Mi52ZWxvY2l0eSwgdGhpcy5ib2R5Mi5tYXNzKSkpICogMTApO1xyXG4gICAgICAgIHJldHVybiBuZXcgQ29udGFjdEVxdWF0aW9uKHRoaXMuYm9keTEsIHRoaXMuYm9keTIsIHRoaXMucmEsIHRoaXMucmIsIHRoaXMubiwgdGhpcy5wb3NpdGlvbkVycm9yLCB0aGlzLmJpYXNGYWN0b3IsIDAsIGxhbWJkYU1heCwgdGhpcy50cmVzaG9sZCk7XHJcbiAgICB9XHJcbiAgICBnZXRGcmljdGlvbkVxdWF0aW9ucygpIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBuZXcgRnJpY3Rpb25FcXVhdGlvbih0aGlzLmJvZHkxLCB0aGlzLmJvZHkyLCB0aGlzLnJhLCB0aGlzLnJiLCB2My5zY2FsZSh0aGlzLmksIDEpLCB0aGlzLnBvc2l0aW9uRXJyb3IsIHRoaXMuYmlhc0ZhY3RvciwgLXRoaXMuYm9keTEuZnJpY3Rpb24gLSB0aGlzLmJvZHkyLmZyaWN0aW9uLCB0aGlzLmJvZHkxLmZyaWN0aW9uICsgdGhpcy5ib2R5Mi5mcmljdGlvbiwgdGhpcy50cmVzaG9sZCksXHJcbiAgICAgICAgICAgIG5ldyBGcmljdGlvbkVxdWF0aW9uKHRoaXMuYm9keTEsIHRoaXMuYm9keTIsIHRoaXMucmEsIHRoaXMucmIsIHYzLnNjYWxlKHRoaXMuaiwgMSksIHRoaXMucG9zaXRpb25FcnJvciwgdGhpcy5iaWFzRmFjdG9yLCAtdGhpcy5ib2R5MS5mcmljdGlvbiAtIHRoaXMuYm9keTIuZnJpY3Rpb24sIHRoaXMuYm9keTEuZnJpY3Rpb24gKyB0aGlzLmJvZHkyLmZyaWN0aW9uLCB0aGlzLnRyZXNob2xkKVxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcbn1cclxuQ29udGFjdENvbnN0cmFpbnQub3B0ID0ge1xyXG4gICAgYmlhc0ZhY3RvcjogMC4xMjUsXHJcbiAgICB0cmVzaG9sZDogMC4wMDA1LFxyXG4gICAgbGFtYmRhTWluOiAwLFxyXG4gICAgbGFtYmRhTWF4OiBJbmZpbml0eSxcclxufTtcclxuIiwiaW1wb3J0IHsgdjMgfSBmcm9tIFwicm9tYW5wcHBtYXRoXCI7XHJcbmltcG9ydCBjb25maWcgZnJvbSBcIi4vY29uZmlnXCI7XHJcbmNvbnN0IHsgQ09OVEFDVF9NQU5JRk9MRF9LRUVQX1RSRVNIT0xEIH0gPSBjb25maWc7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRhY3RNYW5pZm9sZCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb250YWN0cykge1xyXG4gICAgICAgIHRoaXMuY29udGFjdHMgPSBjb250YWN0cztcclxuICAgICAgICB0aGlzLmtlZXAgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhY3RzID0gdGhpcy5jb250YWN0cztcclxuICAgICAgICBpZiAoY29udGFjdHMubGVuZ3RoIDwgMykge1xyXG4gICAgICAgICAgICB0aGlzLmtlZXAgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbiA9IGNvbnRhY3RzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBjb250YWN0ID0gY29udGFjdHNbaV07XHJcbiAgICAgICAgICAgIGNvbnN0IHsgZGVsdGFQQSwgZGVsdGFQQiB9ID0gY29udGFjdC51cGRhdGUoKTtcclxuICAgICAgICAgICAgaWYgKHYzLm5vcm0oZGVsdGFQQSkgPiBDT05UQUNUX01BTklGT0xEX0tFRVBfVFJFU0hPTEQgfHwgdjMubm9ybShkZWx0YVBCKSA+IENPTlRBQ1RfTUFOSUZPTERfS0VFUF9UUkVTSE9MRCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rZWVwID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgdjMsIG0zIH0gZnJvbSBcInJvbWFucHBwbWF0aFwiO1xyXG5jb25zdCBjbGFtcCA9ICh2LCBtaW4sIG1heCkgPT4ge1xyXG4gICAgaWYgKHYgPiBtaW4pIHtcclxuICAgICAgICBpZiAodiA8IG1heClcclxuICAgICAgICAgICAgcmV0dXJuIHY7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gbWF4O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1pbjtcclxufTtcclxuY2xhc3MgQ29uc3RyYWludEVxdWF0aW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKGJvZHkxLCBib2R5MiwgcmEsIHJiLCBuLCBwb3NpdGlvbkVycm9yLCBiaWFzRmFjdG9yLCBsYW1iZGFNaW4sIGxhbWJkYU1heCwgdHJlc2hvbGQpIHtcclxuICAgICAgICB0aGlzLnJhID0gcmE7XHJcbiAgICAgICAgdGhpcy5yYiA9IHJiO1xyXG4gICAgICAgIHRoaXMubiA9IG47XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbkVycm9yID0gcG9zaXRpb25FcnJvcjtcclxuICAgICAgICB0aGlzLmJpYXNGYWN0b3IgPSBiaWFzRmFjdG9yO1xyXG4gICAgICAgIHRoaXMuSiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5KTSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5CID0gbnVsbDtcclxuICAgICAgICB0aGlzLmJvZHkxID0gYm9keTE7XHJcbiAgICAgICAgdGhpcy5ib2R5MiA9IGJvZHkyO1xyXG4gICAgICAgIHRoaXMudHJlc2hvbGQgPSB0cmVzaG9sZDtcclxuICAgICAgICB0aGlzLmxhbWJkYUFjYyA9IDA7XHJcbiAgICAgICAgdGhpcy5sYW1iZGFNaW4gPSBsYW1iZGFNaW47XHJcbiAgICAgICAgdGhpcy5sYW1iZGFNYXggPSBsYW1iZGFNYXg7XHJcbiAgICAgICAgdGhpcy5wcmV2TGFtYmRhID0gMDtcclxuICAgIH1cclxuICAgIHVwZGF0ZUphY29iaWFuKCkge1xyXG4gICAgICAgIGNvbnN0IHsgYm9keTEsIGJvZHkyLCByYSwgcmIsIG4gfSA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5KID0gW3YzLnNjYWxlKG4sIC0xKSwgdjMuY3Jvc3MobiwgcmEpLCBuLCB2My5jcm9zcyhyYiwgbildO1xyXG4gICAgICAgIGlmIChib2R5MS5zdGF0aWMpIHtcclxuICAgICAgICAgICAgdGhpcy5KWzBdID0gWzAsIDAsIDBdO1xyXG4gICAgICAgICAgICB0aGlzLkpbMV0gPSBbMCwgMCwgMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChib2R5Mi5zdGF0aWMpIHtcclxuICAgICAgICAgICAgdGhpcy5KWzJdID0gWzAsIDAsIDBdO1xyXG4gICAgICAgICAgICB0aGlzLkpbM10gPSBbMCwgMCwgMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qICBjb25zdCBkb2YxID0gYm9keTEuZG9mO1xyXG4gICAgICAgICAgY29uc3QgZG9mMiA9IGJvZHkyLmRvZjtcclxuICAgICAgXHJcbiAgICAgICAgICB0aGlzLkpbMF1bMF0gKj0gZG9mMVswXTtcclxuICAgICAgICAgIHRoaXMuSlswXVsxXSAqPSBkb2YxWzFdO1xyXG4gICAgICAgICAgdGhpcy5KWzBdWzJdICo9IGRvZjFbMl07XHJcbiAgICAgIFxyXG4gICAgICAgICAgdGhpcy5KWzFdWzBdICo9IGRvZjFbM107XHJcbiAgICAgICAgICB0aGlzLkpbMV1bMV0gKj0gZG9mMVs0XTtcclxuICAgICAgICAgIHRoaXMuSlsxXVsyXSAqPSBkb2YxWzVdO1xyXG4gICAgICBcclxuICAgICAgICAgIHRoaXMuSlsyXVswXSAqPSBkb2YyWzBdO1xyXG4gICAgICAgICAgdGhpcy5KWzJdWzFdICo9IGRvZjJbMV07XHJcbiAgICAgICAgICB0aGlzLkpbMl1bMl0gKj0gZG9mMlsyXTtcclxuICAgICAgXHJcbiAgICAgICAgICB0aGlzLkpbM11bMF0gKj0gZG9mMlszXTtcclxuICAgICAgICAgIHRoaXMuSlszXVsxXSAqPSBkb2YyWzRdO1xyXG4gICAgICAgICAgdGhpcy5KWzNdWzJdICo9IGRvZjJbNV07Ki9cclxuICAgIH1cclxuICAgIHVwZGF0ZUxlZnRQYXJ0KGR0KSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVKYWNvYmlhbigpO1xyXG4gICAgICAgIGNvbnN0IHsgYm9keTEsIGJvZHkyIH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IEkxID0gYm9keTEuaW52ZXJzZUluZXJ0aWE7XHJcbiAgICAgICAgY29uc3QgSTIgPSBib2R5Mi5pbnZlcnNlSW5lcnRpYTtcclxuICAgICAgICBsZXQgTTEgPSBib2R5MS5pbnZlcnNlTWFzcztcclxuICAgICAgICBsZXQgTTIgPSBib2R5Mi5pbnZlcnNlTWFzcztcclxuICAgICAgICB0aGlzLkpNID0gW1xyXG4gICAgICAgICAgICB2My5zY2FsZSh0aGlzLkpbMF0sIE0xKSxcclxuICAgICAgICAgICAgbTMudHJhbnNmb3JtUG9pbnQoSTEsIHRoaXMuSlsxXSksXHJcbiAgICAgICAgICAgIHYzLnNjYWxlKHRoaXMuSlsyXSwgTTIpLFxyXG4gICAgICAgICAgICBtMy50cmFuc2Zvcm1Qb2ludChJMiwgdGhpcy5KWzNdKSxcclxuICAgICAgICBdO1xyXG4gICAgICAgIC8vSk1KKiA9IEpCOyBCID0gTUoqIGFzIDIgdmVjNiwgX0ogPSBKYWNvYmlhbiBhcyAyIHZlYzZcclxuICAgICAgICB0aGlzLl9KID0gW1xyXG4gICAgICAgICAgICBbLi4udGhpcy5KWzBdLCAuLi50aGlzLkpbMV1dLFxyXG4gICAgICAgICAgICBbLi4udGhpcy5KWzJdLCAuLi50aGlzLkpbM11dLFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgdGhpcy5CID0gW1xyXG4gICAgICAgICAgICBbLi4udGhpcy5KTVswXSwgLi4udGhpcy5KTVsxXV0sXHJcbiAgICAgICAgICAgIFsuLi50aGlzLkpNWzJdLCAuLi50aGlzLkpNWzNdXSxcclxuICAgICAgICBdO1xyXG4gICAgICAgIHRoaXMuZWZmTWFzcyA9XHJcbiAgICAgICAgICAgIHYzLmRvdCh0aGlzLkpbMF0sIHRoaXMuSk1bMF0pICtcclxuICAgICAgICAgICAgICAgIHYzLmRvdCh0aGlzLkpNWzFdLCB0aGlzLkpbMV0pICtcclxuICAgICAgICAgICAgICAgIHYzLmRvdCh0aGlzLkpbMl0sIHRoaXMuSk1bMl0pICtcclxuICAgICAgICAgICAgICAgIHYzLmRvdCh0aGlzLkpNWzNdLCB0aGlzLkpbM10pO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlUmlnaHRQYXJ0KGR0KSB7XHJcbiAgICAgICAgY29uc3QgeyBiaWFzRmFjdG9yLCB0cmVzaG9sZCwgYm9keTEsIGJvZHkyLCBuLCByYSwgcmIsIHBvc2l0aW9uRXJyb3IgfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgcmVsYXRpdmVWZWxvY2l0eSA9IHYzLmRpZmYodjMuc3VtKGJvZHkyLnZlbG9jaXR5LCB2My5jcm9zcyhib2R5Mi5hbmd1bGFyViwgcmIpKSwgdjMuc3VtKGJvZHkxLnZlbG9jaXR5LCB2My5jcm9zcyhib2R5MS5hbmd1bGFyViwgcmEpKSk7XHJcbiAgICAgICAgY29uc3QgcmVsYXRpdmVWZWxvY2l0eU5vcm1hbFByb2plY3Rpb24gPSB2My5kb3QocmVsYXRpdmVWZWxvY2l0eSwgbik7XHJcbiAgICAgICAgdGhpcy5iaWFzID1cclxuICAgICAgICAgICAgKGJpYXNGYWN0b3IgKiBNYXRoLm1heChNYXRoLnBvdyhwb3NpdGlvbkVycm9yLCAyKSAtIHRyZXNob2xkLCAwKSkgLyBkdCAtXHJcbiAgICAgICAgICAgICAgICByZWxhdGl2ZVZlbG9jaXR5Tm9ybWFsUHJvamVjdGlvbjtcclxuICAgICAgICB0aGlzLmJpYXMgKj0gQ29uc3RyYWludEVxdWF0aW9uLmJpYXNNdWx0aXBsaWVyO1xyXG4gICAgfVxyXG4gICAgYXBwbHlJbXB1bHNlKGxhbWJkYSkge1xyXG4gICAgICAgIHRoaXMuYm9keTEuYXBwbHlJbXB1bHNlKHYzLnNjYWxlKHRoaXMuSlswXSwgbGFtYmRhKSwgdGhpcy5yYSk7XHJcbiAgICAgICAgdGhpcy5ib2R5Mi5hcHBseUltcHVsc2UodjMuc2NhbGUodGhpcy5KWzJdLCBsYW1iZGEpLCB0aGlzLnJiKTtcclxuICAgIH1cclxuICAgIGFwcGx5UHNldWRvSW1wdWxzZShsYW1iZGEpIHtcclxuICAgICAgICB0aGlzLmJvZHkxLmFwcGx5UHNldWRvSW1wdWxzZSh2My5zY2FsZSh0aGlzLkpbMF0sIGxhbWJkYSksIHRoaXMucmEpO1xyXG4gICAgICAgIHRoaXMuYm9keTIuYXBwbHlQc2V1ZG9JbXB1bHNlKHYzLnNjYWxlKHRoaXMuSlsyXSwgbGFtYmRhKSwgdGhpcy5yYik7XHJcbiAgICB9XHJcbn1cclxuQ29uc3RyYWludEVxdWF0aW9uLmJpYXNNdWx0aXBsaWVyID0gMC41O1xyXG5jbGFzcyBDb250YWN0RXF1YXRpb24gZXh0ZW5kcyBDb25zdHJhaW50RXF1YXRpb24ge1xyXG4gICAgdXBkYXRlUmlnaHRQYXJ0KGR0KSB7XHJcbiAgICAgICAgY29uc3QgeyBib2R5MSwgYm9keTIsIHRyZXNob2xkLCBiaWFzRmFjdG9yLCByYSwgcmIsIG4sIHBvc2l0aW9uRXJyb3IgfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgcmVsYXRpdmVWZWxvY2l0eSA9IHYzLmRpZmYodjMuc3VtKGJvZHkyLnZlbG9jaXR5LCB2My5jcm9zcyhib2R5Mi5hbmd1bGFyViwgcmIpKSwgdjMuc3VtKGJvZHkxLnZlbG9jaXR5LCB2My5jcm9zcyhib2R5MS5hbmd1bGFyViwgcmEpKSk7XHJcbiAgICAgICAgY29uc3QgcmVsYXRpdmVWZWxvY2l0eU5vcm1hbFByb2plY3Rpb24gPSB2My5kb3QocmVsYXRpdmVWZWxvY2l0eSwgbik7XHJcbiAgICAgICAgdGhpcy5iaWFzID1cclxuICAgICAgICAgICAgKE1hdGgubWF4KDAsIHBvc2l0aW9uRXJyb3IgLSB0cmVzaG9sZCkgLyBkdCkgKiBiaWFzRmFjdG9yIC1cclxuICAgICAgICAgICAgICAgIHJlbGF0aXZlVmVsb2NpdHlOb3JtYWxQcm9qZWN0aW9uO1xyXG4gICAgfVxyXG59XHJcbmNsYXNzIEZyaWN0aW9uRXF1YXRpb24gZXh0ZW5kcyBDb25zdHJhaW50RXF1YXRpb24ge1xyXG4gICAgdXBkYXRlUmlnaHRQYXJ0KCkge1xyXG4gICAgICAgIGNvbnN0IHsgYm9keTEsIGJvZHkyLCByYSwgcmIsIG4gfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgcmVsYXRpdmVWZWxvY2l0eSA9IHYzLmRpZmYodjMuc3VtKGJvZHkyLnZlbG9jaXR5LCB2My5jcm9zcyhib2R5Mi5hbmd1bGFyViwgcmIpKSwgdjMuc3VtKGJvZHkxLnZlbG9jaXR5LCB2My5jcm9zcyhib2R5MS5hbmd1bGFyViwgcmEpKSk7XHJcbiAgICAgICAgY29uc3QgcmVsYXRpdmVWZWxvY2l0eU5vcm1hbFByb2plY3Rpb24gPSB2My5kb3QocmVsYXRpdmVWZWxvY2l0eSwgbik7XHJcbiAgICAgICAgdGhpcy5iaWFzID0gLXJlbGF0aXZlVmVsb2NpdHlOb3JtYWxQcm9qZWN0aW9uO1xyXG4gICAgfVxyXG59XHJcbi8qXHJcbmNsYXNzIFBvc2l0aW9uQ29uc3RyYWludCBleHRlbmRzIENvbnN0cmFpbnQge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgYm9keTEsXHJcbiAgICBib2R5MixcclxuICAgIG4sXHJcbiAgICByYSxcclxuICAgIHJiLFxyXG4gICAgcmFMb2NhbCxcclxuICAgIHJiTG9jYWwsXHJcbiAgICBiaWFzRmFjdG9yLFxyXG4gICAgdHJlc2hvbGQsXHJcbiAgICBwZW5EZXB0aFxyXG4gICkge1xyXG4gICAgc3VwZXIoXHJcbiAgICAgIGJvZHkxLFxyXG4gICAgICBib2R5MixcclxuICAgICAgbixcclxuICAgICAgcmEsXHJcbiAgICAgIHJiLFxyXG4gICAgICByYUxvY2FsLFxyXG4gICAgICByYkxvY2FsLFxyXG4gICAgICBiaWFzRmFjdG9yLFxyXG4gICAgICBudWxsLFxyXG4gICAgICBudWxsLFxyXG4gICAgICB0cmVzaG9sZFxyXG4gICAgKTtcclxuICAgIHRoaXMucGVuRGVwdGggPSBwZW5EZXB0aDtcclxuICB9XHJcbiAgYXBwbHlSZXNvbHZpbmdJbXB1bHNlKGxhbWJkYSkge1xyXG4gICAgdGhpcy5ib2R5MS5hcHBseVBzZXVkb0ltcHVsc2UodjMuc2NhbGUodGhpcy5KWzBdLCBsYW1iZGEpLCB0aGlzLnJhKTtcclxuICAgIHRoaXMuYm9keTIuYXBwbHlQc2V1ZG9JbXB1bHNlKHYzLnNjYWxlKHRoaXMuSlsyXSwgbGFtYmRhKSwgdGhpcy5yYik7XHJcbiAgfVxyXG4gIHVwZGF0ZVJpZ2h0UGFydChkZWx0YVRpbWUpIHtcclxuICAgIGNvbnN0IHsgYm9keTEsIGJvZHkyLCByYSwgcmIsIG4sIHBlbkRlcHRoLCB0cmVzaG9sZCwgYmlhc0ZhY3RvciB9ID0gdGhpcztcclxuXHJcbiAgICB0aGlzLmJpYXMgPSAoTWF0aC5tYXgoMCwgcGVuRGVwdGggLSB0cmVzaG9sZCkgLyBkZWx0YVRpbWUpICogYmlhc0ZhY3RvcjtcclxuICB9XHJcbn1cclxuY2xhc3MgUm90YXRpb25hbENvbnN0cmFpbnQgZXh0ZW5kcyBDb25zdHJhaW50IHtcclxuICBjb25zdHJ1Y3Rvcihib2R5MSwgYm9keTIsIHJhTG9jYWwsIHJiTG9jYWwpIHtcclxuICAgIHN1cGVyKGJvZHkxLCBib2R5MiwgbnVsbCwgbnVsbCwgbnVsbCwgcmFMb2NhbCwgcmJMb2NhbCk7XHJcbiAgfVxyXG4gIHVwZGF0ZUxlZnRQYXJ0KGRlbHRhVGltZSkge1xyXG4gICAgY29uc3QgeyBib2R5MSwgYm9keTIsIHJhTG9jYWwsIHJiTG9jYWwgfSA9IHRoaXM7XHJcbiAgICB0aGlzLlBBID0gYm9keTEuY29sbGlkZXIubG9jYWxUb0dsb2JhbChyYUxvY2FsKTtcclxuICAgIHRoaXMuUEIgPSBib2R5Mi5jb2xsaWRlci5sb2NhbFRvR2xvYmFsKHJiTG9jYWwpO1xyXG4gICAgY29uc3QgcyA9IG0zLnRyYW5zZm9ybVBvaW50KGJvZHkxLmNvbGxpZGVyLlJtYXRyaXgsIHJhTG9jYWwpO1xyXG4gICAgY29uc3QgYiA9IG0zLnRyYW5zZm9ybVBvaW50KGJvZHkyLmNvbGxpZGVyLlJtYXRyaXgsIHJiTG9jYWwpO1xyXG5cclxuICAgIHRoaXMucmEgPSBzO1xyXG4gICAgdGhpcy5yYiA9IGI7XHJcblxyXG4gICAgY29uc3QgSiA9IFtbMCwgMCwgMF0sIHYzLmNyb3NzKHMsIGIpLCBbMCwgMCwgMF0sIHYzLmNyb3NzKGIsIHMpXTtcclxuXHJcbiAgICBjb25zdCBkb2YxID0gYm9keTEuRE9GO1xyXG4gICAgY29uc3QgZG9mMiA9IGJvZHkyLkRPRjtcclxuXHJcbiAgICBKWzBdWzBdICo9IGRvZjFbMF07XHJcbiAgICBKWzBdWzFdICo9IGRvZjFbMV07XHJcbiAgICBKWzBdWzJdICo9IGRvZjFbMl07XHJcblxyXG4gICAgSlsxXVswXSAqPSBkb2YxWzNdO1xyXG4gICAgSlsxXVsxXSAqPSBkb2YxWzRdO1xyXG4gICAgSlsxXVsyXSAqPSBkb2YxWzVdO1xyXG5cclxuICAgIEpbMl1bMF0gKj0gZG9mMlswXTtcclxuICAgIEpbMl1bMV0gKj0gZG9mMlsxXTtcclxuICAgIEpbMl1bMl0gKj0gZG9mMlsyXTtcclxuXHJcbiAgICBKWzNdWzBdICo9IGRvZjJbM107XHJcbiAgICBKWzNdWzFdICo9IGRvZjJbNF07XHJcbiAgICBKWzNdWzJdICo9IGRvZjJbNV07XHJcbiAgICBjb25zdCBJMSA9IGJvZHkxLmludmVyc2VJbmVydGlhO1xyXG4gICAgY29uc3QgSTIgPSBib2R5Mi5pbnZlcnNlSW5lcnRpYTtcclxuICAgIHRoaXMuSiA9IEo7XHJcbiAgICB0aGlzLkpNID0gW1xyXG4gICAgICBbMCwgMCwgMF0sXHJcbiAgICAgIG0zLnRyYW5zZm9ybVBvaW50KEkxLCB0aGlzLkpbMV0pLFxyXG4gICAgICBbMCwgMCwgMF0sXHJcbiAgICAgIG0zLnRyYW5zZm9ybVBvaW50KEkyLCB0aGlzLkpbM10pLFxyXG4gICAgXTtcclxuICAgIHRoaXMuZWZmTWFzcyA9XHJcbiAgICAgIHYzLmRvdCh0aGlzLkpNWzFdLCB0aGlzLkpbMV0pICsgdjMuZG90KHRoaXMuSk1bM10sIHRoaXMuSlszXSk7XHJcbiAgICB0aGlzLkIgPSBbXHJcbiAgICAgIFswLCAwLCAwLCAuLi50aGlzLkpNWzFdXSxcclxuICAgICAgWzAsIDAsIDAsIC4uLnRoaXMuSk1bM11dLFxyXG4gICAgXTtcclxuICAgIHRoaXMuX0ogPSBbXHJcbiAgICAgIFsuLi50aGlzLkpbMF0sIC4uLnRoaXMuSlsxXV0sXHJcbiAgICAgIFsuLi50aGlzLkpbMl0sIC4uLnRoaXMuSlszXV0sXHJcbiAgICBdO1xyXG4gIH1cclxuICB1cGRhdGVSaWdodFBhcnQoZGVsdGFUaW1lKSB7XHJcbiAgICBjb25zdCB7IGJvZHkxLCBib2R5MiB9ID0gdGhpcztcclxuXHJcbiAgICB0aGlzLmJpYXMgPVxyXG4gICAgICAtdjMuZG90KHRoaXMuSlsxXSwgYm9keTEuYW5ndWxhclYpICsgdjMuZG90KHRoaXMuSlszXSwgYm9keTIuYW5ndWxhclYpO1xyXG4gIH1cclxuICBhcHBseVJlc29sdmluZ0ltcHVsc2UobGFtYmRhKSB7XHJcbiAgICBjb25zdCB7IGJvZHkxLCBib2R5MiB9ID0gdGhpcztcclxuICAgIGJvZHkxLmFkZEFuZ3VsYXJWKHYzLnNjYWxlKHRoaXMucmEsIGxhbWJkYSkpO1xyXG4gICAgYm9keTIuYWRkQW5ndWxhclYodjMuc2NhbGUodGhpcy5yYiwgbGFtYmRhKSk7XHJcbiAgfVxyXG59XHJcbiovXHJcbi8qXHJcbmNsYXNzIEpvaW50IGV4dGVuZHMgQ29uc3RyYWludCB7XHJcbiAgY29uc3RydWN0b3IoYm9keTEsIGJvZHkyLCByYUxvY2FsLCByYkxvY2FsLCBiaWFzRmFjdG9yID0gMCkge1xyXG4gICAgc3VwZXIoYm9keTEsIGJvZHkyLCBudWxsLCBudWxsLCBudWxsLCByYUxvY2FsLCByYkxvY2FsLCBiaWFzRmFjdG9yKTtcclxuXHJcbiAgICB0aGlzLnRyZXNob2xkID0gMC4wMDAxO1xyXG4gICAgdGhpcy5yZWR1Y2VyID0gMC41O1xyXG4gICAgdGhpcy5tYXhJbXB1bHNlID0gMC43O1xyXG4gIH1cclxuICB1cGRhdGVMZWZ0UGFydChkZWx0YVRpbWUpIHtcclxuICAgIGNvbnN0IHsgYm9keTEsIGJvZHkyLCByYUxvY2FsLCByYkxvY2FsIH0gPSB0aGlzO1xyXG4gICAgdGhpcy5QQSA9IGJvZHkxLmNvbGxpZGVyLmxvY2FsVG9HbG9iYWwocmFMb2NhbCk7XHJcbiAgICB0aGlzLlBCID0gYm9keTIuY29sbGlkZXIubG9jYWxUb0dsb2JhbChyYkxvY2FsKTtcclxuICAgIGNvbnN0IGRpciA9IHYzLmRpZmYodGhpcy5QQSwgdGhpcy5QQik7XHJcbiAgICBjb25zdCBuID0gZGlyO1xyXG4gICAgdGhpcy5uID0gbjtcclxuICAgIHRoaXMucmEgPSBkaWZmKHRoaXMuUEEsIHRoaXMuYm9keTEuY29sbGlkZXIucG9zKTtcclxuICAgIHRoaXMucmIgPSBkaWZmKHRoaXMuUEIsIHRoaXMuYm9keTIuY29sbGlkZXIucG9zKTtcclxuICAgIHRoaXMucGVuRGVwdGggPSBub3JtKGRpcik7XHJcblxyXG4gICAgY29uc3QgSiA9IFtcclxuICAgICAgdjMuc2NhbGUodGhpcy5uLCAtMSksXHJcbiAgICAgIHYzLmNyb3NzKHRoaXMubiwgdGhpcy5yYSksXHJcbiAgICAgIHRoaXMubixcclxuICAgICAgdjMuY3Jvc3ModGhpcy5yYiwgdGhpcy5uKSxcclxuICAgIF07XHJcblxyXG4gICAgY29uc3QgZG9mMSA9IGJvZHkxLkRPRjtcclxuICAgIGNvbnN0IGRvZjIgPSBib2R5Mi5ET0Y7XHJcblxyXG4gICAgSlswXVswXSAqPSBkb2YxWzBdO1xyXG4gICAgSlswXVsxXSAqPSBkb2YxWzFdO1xyXG4gICAgSlswXVsyXSAqPSBkb2YxWzJdO1xyXG5cclxuICAgIEpbMV1bMF0gKj0gZG9mMVszXTtcclxuICAgIEpbMV1bMV0gKj0gZG9mMVs0XTtcclxuICAgIEpbMV1bMl0gKj0gZG9mMVs1XTtcclxuXHJcbiAgICBKWzJdWzBdICo9IGRvZjJbMF07XHJcbiAgICBKWzJdWzFdICo9IGRvZjJbMV07XHJcbiAgICBKWzJdWzJdICo9IGRvZjJbMl07XHJcblxyXG4gICAgSlszXVswXSAqPSBkb2YyWzNdO1xyXG4gICAgSlszXVsxXSAqPSBkb2YyWzRdO1xyXG4gICAgSlszXVsyXSAqPSBkb2YyWzVdO1xyXG4gICAgY29uc3QgSTEgPSBib2R5MS5pbnZlcnNlSW5lcnRpYTtcclxuICAgIGNvbnN0IEkyID0gYm9keTIuaW52ZXJzZUluZXJ0aWE7XHJcbiAgICBsZXQgTTEgPSBib2R5MS5pbnZlcnNlTWFzcztcclxuICAgIGxldCBNMiA9IGJvZHkyLmludmVyc2VNYXNzO1xyXG4gICAgdGhpcy5KID0gSjtcclxuICAgIHRoaXMuSk0gPSBbXHJcbiAgICAgIHNjYWxlKHRoaXMuSlswXSwgTTEpLFxyXG4gICAgICBtMy50cmFuc2Zvcm1Qb2ludChJMSwgdGhpcy5KWzFdKSxcclxuICAgICAgc2NhbGUodGhpcy5KWzJdLCBNMiksXHJcbiAgICAgIG0zLnRyYW5zZm9ybVBvaW50KEkyLCB0aGlzLkpbM10pLFxyXG4gICAgXTtcclxuICAgIHRoaXMuZWZmTWFzcyA9XHJcbiAgICAgIGRvdCh0aGlzLkpNWzBdLCBKWzBdKSArXHJcbiAgICAgIGRvdCh0aGlzLkpNWzFdLCB0aGlzLkpbMV0pICtcclxuICAgICAgZG90KHRoaXMuSk1bMl0sIEpbMl0pICtcclxuICAgICAgZG90KHRoaXMuSk1bM10sIHRoaXMuSlszXSk7XHJcbiAgICB0aGlzLkIgPSBbXHJcbiAgICAgIFsuLi50aGlzLkpNWzBdLCAuLi50aGlzLkpNWzFdXSxcclxuICAgICAgWy4uLnRoaXMuSk1bMl0sIC4uLnRoaXMuSk1bM11dLFxyXG4gICAgXTtcclxuICAgIHRoaXMuX0ogPSBbXHJcbiAgICAgIFsuLi50aGlzLkpbMF0sIC4uLnRoaXMuSlsxXV0sXHJcbiAgICAgIFsuLi50aGlzLkpbMl0sIC4uLnRoaXMuSlszXV0sXHJcbiAgICBdO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlUmlnaHRQYXJ0KGRlbHRhVGltZSkge1xyXG4gICAgY29uc3QgeyBib2R5MSwgYm9keTIsIHJhLCByYiwgbiwgcGVuRGVwdGgsIHRyZXNob2xkLCBiaWFzRmFjdG9yIH0gPSB0aGlzO1xyXG5cclxuICAgIGNvbnN0IHJlbGF0aXZlVmVsb2NpdHkgPSBkaWZmKFxyXG4gICAgICBzdW0oYm9keTIudmVsb2NpdHksIGNyb3NzKGJvZHkyLmFuZ3VsYXJWLCByYikpLFxyXG4gICAgICBzdW0oYm9keTEudmVsb2NpdHksIGNyb3NzKGJvZHkxLmFuZ3VsYXJWLCByYSkpXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IHJlbGF0aXZlVmVsb2NpdHlOb3JtYWxQcm9qZWN0aW9uID0gZG90KHJlbGF0aXZlVmVsb2NpdHksIG4pO1xyXG4gICAgY29uc3QgZmFjID0gcGVuRGVwdGggKiogMiA+IHRyZXNob2xkO1xyXG4gICAgdGhpcy5iaWFzID1cclxuICAgICAgKGJpYXNGYWN0b3IgKiBNYXRoLm1heChwZW5EZXB0aCAqKiAyIC0gdHJlc2hvbGQsIDApKSAvIGRlbHRhVGltZSAtXHJcbiAgICAgIHJlbGF0aXZlVmVsb2NpdHlOb3JtYWxQcm9qZWN0aW9uO1xyXG4gICAgdGhpcy5iaWFzICo9IGZhYztcclxuICB9XHJcbiAgYXBwbHlSZXNvbHZpbmdJbXB1bHNlKGxhbWJkYSkge1xyXG4gICAgdGhpcy5ib2R5MS5hcHBseUltcHVsc2Uoc2NhbGUodGhpcy5KWzBdLCBsYW1iZGEpLCB0aGlzLnJhKTtcclxuICAgIHRoaXMuYm9keTIuYXBwbHlJbXB1bHNlKHNjYWxlKHRoaXMuSlsyXSwgbGFtYmRhKSwgdGhpcy5yYik7XHJcbiAgfVxyXG4gIGFwcGx5UmVzb2x2aW5nUHNldWRvSW1wdWxzZShsYW1iZGEpIHtcclxuICAgIGNvbnN0IG1heCA9IHRoaXMuZWZmTWFzcyAqIDEwO1xyXG4gICAgLy9sYW1iZGEgPSBjbGFtcChsYW1iZGEsIC0xLCAxKVxyXG4gICAgdGhpcy5ib2R5MS5hcHBseVBzZXVkb0ltcHVsc2Uoc2NhbGUodGhpcy5uLCAtbGFtYmRhKSwgWzAsIDAsIDBdKTtcclxuICAgIHRoaXMuYm9keTIuYXBwbHlQc2V1ZG9JbXB1bHNlKHNjYWxlKHRoaXMubiwgbGFtYmRhKSwgWzAsIDAsIDBdKTtcclxuICB9XHJcbn1cclxuY2xhc3MgSm9pbnRQb3NpdGlvbkNvbnN0cmFpbnQgZXh0ZW5kcyBKb2ludCB7XHJcbiAgdXBkYXRlUmlnaHRQYXJ0KGRlbHRhVGltZSkge1xyXG4gICAgY29uc3QgeyBwZW5EZXB0aCwgdHJlc2hvbGQsIGJpYXNGYWN0b3IgfSA9IHRoaXM7XHJcblxyXG4gICAgY29uc3QgZmFjID0gcGVuRGVwdGggKiogMiA+IHRyZXNob2xkO1xyXG4gICAgdGhpcy5iaWFzID1cclxuICAgICAgKChiaWFzRmFjdG9yICogTWF0aC5tYXgocGVuRGVwdGggKiogMiAtIHRyZXNob2xkLCAwKSkgLyBkZWx0YVRpbWUpICogZmFjO1xyXG4gIH1cclxuICBhcHBseVJlc29sdmluZ0ltcHVsc2UobGFtYmRhKSB7XHJcbiAgICAvL2lmKGxhbWJkYSA8IDAuMSlyZXR1cm5cclxuICAgIHRoaXMuYm9keTEuYXBwbHlQc2V1ZG9JbXB1bHNlKHNjYWxlKHRoaXMuSlswXSwgbGFtYmRhKSwgdGhpcy5yYSk7XHJcbiAgICB0aGlzLmJvZHkyLmFwcGx5UHNldWRvSW1wdWxzZShzY2FsZSh0aGlzLkpbMl0sIGxhbWJkYSksIHRoaXMucmIpO1xyXG4gIH1cclxufSovXHJcbmV4cG9ydCB7IENvbnRhY3RFcXVhdGlvbiwgQ29uc3RyYWludEVxdWF0aW9uLCBcclxuLy9Kb2ludCxcclxuRnJpY3Rpb25FcXVhdGlvbixcclxuLy9Qb3NpdGlvbkNvbnN0cmFpbnQsXHJcbi8vSm9pbnRQb3NpdGlvbkNvbnN0cmFpbnQsXHJcbi8vUm90YXRpb25hbENvbnN0cmFpbnQsXHJcbiB9O1xyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudEVtaXR0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudHMgPSB7fTtcclxuICAgIH1cclxuICAgIG9uKGV2ZW50TmFtZSwgZm4pIHtcclxuICAgICAgICBpZiAoIXRoaXMuZXZlbnRzW2V2ZW50TmFtZV0pIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLnB1c2goZm4pO1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdLmZpbHRlcigoZXZlbnRGbikgPT4gZm4gIT09IGV2ZW50Rm4pO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBlbWl0KGV2ZW50TmFtZSwgZGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLmV2ZW50c1tldmVudE5hbWVdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0uZm9yRWFjaCgoZm4pID0+IHtcclxuICAgICAgICAgICAgICAgIGZuLmNhbGwobnVsbCwgZGF0YSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCIuL0V2ZW50RW1pdHRlclwiO1xyXG5pbXBvcnQgeyBtMywgdjMgfSBmcm9tICdyb21hbnBwcG1hdGgnO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5jb25zdCB7IFJJR0lEX0JPRFlfTU9WRV9UUkVTSE9MRCwgUklHSURfQk9EWV9BQUJCX0JJQVMgfSA9IGNvbmZpZztcclxuY2xhc3MgUmlnaWRCb2R5IGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcclxuICAgIHN0YXRpYyBzZXRSSUdJRF9CT0RZX01PVkVfVFJFU0hPTEQoUklHSURfQk9EWV9NT1ZFX1RSRVNIT0xEKSB7XHJcbiAgICAgICAgUmlnaWRCb2R5LmNvbmZpZy5SSUdJRF9CT0RZX01PVkVfVFJFU0hPTEQgPSBSSUdJRF9CT0RZX01PVkVfVFJFU0hPTEQ7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3Rvcihjb2xsaWRlcikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zdGF0aWMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvbGxpZGVyID0gY29sbGlkZXI7XHJcbiAgICAgICAgdGhpcy5tYXNzID0gMTtcclxuICAgICAgICB0aGlzLmludmVyc2VNYXNzID0gMSAvIHRoaXMubWFzcztcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gWzAsIDAsIDBdO1xyXG4gICAgICAgIHRoaXMucHNldWRvVmVsb2NpdHkgPSBbMCwgMCwgMF07XHJcbiAgICAgICAgdGhpcy5wc2V1ZG9Bbmd1bGFyViA9IFswLCAwLCAwXTtcclxuICAgICAgICB0aGlzLmFjY2VsZXJhdGlvbiA9IFswLCAwLCAwXTtcclxuICAgICAgICB0aGlzLmFuZ3VsYXJWID0gWzAsIDAsIDBdO1xyXG4gICAgICAgIHRoaXMuaW52ZXJzZUluZXJ0aWEgPSBjb2xsaWRlci5nZXRJbnZlcnNlSW5lcnRpYVRlbnNvcih0aGlzLm1hc3MpO1xyXG4gICAgICAgIHRoaXMuaWQgPSBSaWdpZEJvZHkubGFzdElkKys7XHJcbiAgICAgICAgdGhpcy5mcmljdGlvbiA9IDU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVFdmVudEZ1bmN0aW9ucyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZ3JvdXAgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubmVlZFRvVXBkYXRlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpbnRlZ3JhdGVSSzQoZHQpIHtcclxuICAgICAgICBjb25zdCB7IGFjY2VsZXJhdGlvbiwgdmVsb2NpdHksIGFuZ3VsYXJWIH0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IF90cmFuc2xhdGlvbiA9IHYzLnNjYWxlKHYzLnN1bSh2ZWxvY2l0eSwgdjMuc2NhbGUoYWNjZWxlcmF0aW9uLCAoMiAvIDMpICogZHQpKSwgZHQpO1xyXG4gICAgICAgIGNvbnN0IF9yb3RhdGlvbiA9IHYzLnNjYWxlKGFuZ3VsYXJWLCBkdCAvIDIpO1xyXG4gICAgICAgIGNvbnN0IGRlbHRhVmVsb2NpdHkgPSB2My5zY2FsZShhY2NlbGVyYXRpb24sIGR0KTtcclxuICAgICAgICBpZiAodjMubm9ybShfdHJhbnNsYXRpb24pID4gY29uZmlnLlJJR0lEX0JPRFlfTU9WRV9UUkVTSE9MRClcclxuICAgICAgICAgICAgdGhpcy50cmFuc2xhdGUoX3RyYW5zbGF0aW9uKTtcclxuICAgICAgICBpZiAodjMubm9ybShfcm90YXRpb24pID4gY29uZmlnLlJJR0lEX0JPRFlfTU9WRV9UUkVTSE9MRClcclxuICAgICAgICAgICAgdGhpcy5yb3RhdGUoX3JvdGF0aW9uKTtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gdjMuc3VtKHZlbG9jaXR5LCBkZWx0YVZlbG9jaXR5KTtcclxuICAgIH1cclxuICAgIGludGVncmF0ZVBzZXVkb1ZlbG9jaXRpZXMoZHQpIHtcclxuICAgICAgICBjb25zdCB0cmFuc2xhdGlvbiA9IHYzLnNjYWxlKHRoaXMucHNldWRvVmVsb2NpdHksIGR0KTtcclxuICAgICAgICBjb25zdCByb3RhdGlvbiA9IHYzLnNjYWxlKHRoaXMucHNldWRvQW5ndWxhclYsIGR0KTtcclxuICAgICAgICBpZiAodjMubm9ybSh0cmFuc2xhdGlvbikgPiBjb25maWcuUklHSURfQk9EWV9NT1ZFX1RSRVNIT0xEKVxyXG4gICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZSh0cmFuc2xhdGlvbik7XHJcbiAgICAgICAgaWYgKHYzLm5vcm0ocm90YXRpb24pID4gY29uZmlnLlJJR0lEX0JPRFlfTU9WRV9UUkVTSE9MRClcclxuICAgICAgICAgICAgdGhpcy5yb3RhdGUocm90YXRpb24pO1xyXG4gICAgICAgIHRoaXMucHNldWRvVmVsb2NpdHkgPSBbMCwgMCwgMF07XHJcbiAgICAgICAgdGhpcy5wc2V1ZG9Bbmd1bGFyViA9IFswLCAwLCAwXTtcclxuICAgIH1cclxuICAgIGFkZFBzZXVkb1ZlbG9jaXR5KHYpIHtcclxuICAgICAgICB0aGlzLnBzZXVkb1ZlbG9jaXR5ID0gdjMuc3VtKHRoaXMucHNldWRvVmVsb2NpdHksIHYpO1xyXG4gICAgfVxyXG4gICAgYWRkUHNldWRvQW5ndWxhclYodikge1xyXG4gICAgICAgIHRoaXMucHNldWRvQW5ndWxhclYgPSB2My5zdW0odGhpcy5wc2V1ZG9Bbmd1bGFyViwgdik7XHJcbiAgICB9XHJcbiAgICBpbnRlZ3JhdGVWZWxvY2l0aWVzKGR0KSB7XHJcbiAgICAgICAgY29uc3QgdHJhbnNsYXRpb24gPSB2My5zY2FsZSh2My5kaWZmKHRoaXMudmVsb2NpdHksIHYzLnNjYWxlKHRoaXMuYWNjZWxlcmF0aW9uLCBkdCAvIDMpKSwgZHQpO1xyXG4gICAgICAgIGlmICh2My5ub3JtKHRyYW5zbGF0aW9uKSA+IGNvbmZpZy5SSUdJRF9CT0RZX01PVkVfVFJFU0hPTEQpXHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNsYXRlKHRyYW5zbGF0aW9uKTtcclxuICAgICAgICBjb25zdCByb3RhdGlvbiA9IHYzLnNjYWxlKHRoaXMuYW5ndWxhclYsIGR0IC8gMik7XHJcbiAgICAgICAgaWYgKHYzLm5vcm0ocm90YXRpb24pID4gY29uZmlnLlJJR0lEX0JPRFlfTU9WRV9UUkVTSE9MRClcclxuICAgICAgICAgICAgdGhpcy5yb3RhdGUocm90YXRpb24pO1xyXG4gICAgfVxyXG4gICAgaW50ZWdyYXRlRm9yY2VzKGR0KSB7XHJcbiAgICAgICAgbGV0IGRlbHRhU3BlZWQgPSB2My5zY2FsZSh0aGlzLmFjY2VsZXJhdGlvbiwgZHQpO1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSB2My5zdW0odGhpcy52ZWxvY2l0eSwgZGVsdGFTcGVlZCk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVJbnZlcnNlSW5lcnRpYSgpIHtcclxuICAgICAgICB0aGlzLmludmVyc2VJbmVydGlhID0gdGhpcy5jb2xsaWRlci5nZXRJbnZlcnNlSW5lcnRpYVRlbnNvcih0aGlzLm1hc3MpO1xyXG4gICAgfVxyXG4gICAgZ2V0SW52ZXJzZUluZXJ0aWFUZW5zb3IoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sbGlkZXIuZ2V0SW52ZXJzZUluZXJ0aWFUZW5zb3IodGhpcy5tYXNzKTtcclxuICAgIH1cclxuICAgIHNldE1hc3MobWFzcykge1xyXG4gICAgICAgIHRoaXMubWFzcyA9IG1hc3M7XHJcbiAgICAgICAgdGhpcy5pbnZlcnNlTWFzcyA9IDEgLyB0aGlzLm1hc3M7XHJcbiAgICB9XHJcbiAgICB0cmFuc2xhdGUodHJhbnNsYXRpb24pIHtcclxuICAgICAgICB0aGlzLmNvbGxpZGVyLnRyYW5zbGF0ZSh0cmFuc2xhdGlvbik7XHJcbiAgICAgICAgdGhpcy5uZWVkVG9VcGRhdGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZW1pdFVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgcm90YXRlKHJvdGF0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlci5yb3RhdGUocm90YXRpb24pO1xyXG4gICAgICAgIHRoaXMubmVlZFRvVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmVtaXRVcGRhdGUoKTtcclxuICAgIH1cclxuICAgIGFwcGx5SW1wdWxzZShpbXB1bHNlLCBwb2ludCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRpYylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSB2My5zdW0odGhpcy52ZWxvY2l0eSwgdjMuc2NhbGUoaW1wdWxzZSwgdGhpcy5pbnZlcnNlTWFzcykpO1xyXG4gICAgICAgIGNvbnN0IGFuZ3VsYXJJbXB1bHNlID0gbTMudHJhbnNmb3JtUG9pbnQodGhpcy5pbnZlcnNlSW5lcnRpYSwgdjMuY3Jvc3MocG9pbnQsIGltcHVsc2UpKTtcclxuICAgICAgICB0aGlzLmFuZ3VsYXJWID0gdjMuc3VtKHRoaXMuYW5ndWxhclYsIGFuZ3VsYXJJbXB1bHNlKTtcclxuICAgIH1cclxuICAgIGFwcGx5UHNldWRvSW1wdWxzZShpbXB1bHNlLCBwb2ludCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRpYylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMucHNldWRvVmVsb2NpdHkgPSB2My5zdW0odGhpcy5wc2V1ZG9WZWxvY2l0eSwgdjMuc2NhbGUoaW1wdWxzZSwgdGhpcy5pbnZlcnNlTWFzcykpO1xyXG4gICAgICAgIGNvbnN0IGFuZ3VsYXJJbXB1bHNlID0gbTMudHJhbnNmb3JtUG9pbnQodGhpcy5pbnZlcnNlSW5lcnRpYSwgdjMuY3Jvc3MocG9pbnQsIGltcHVsc2UpKTtcclxuICAgICAgICB0aGlzLnBzZXVkb0FuZ3VsYXJWID0gdjMuc3VtKHRoaXMucHNldWRvQW5ndWxhclYsIGFuZ3VsYXJJbXB1bHNlKTtcclxuICAgIH1cclxuICAgIGFkZFZlbG9jaXR5KHYpIHtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gdjMuc3VtKHRoaXMudmVsb2NpdHksIHYpO1xyXG4gICAgfVxyXG4gICAgYWRkQW5ndWxhclYodikge1xyXG4gICAgICAgIHRoaXMuYW5ndWxhclYgPSB2My5zdW0odGhpcy5hbmd1bGFyViwgdik7XHJcbiAgICB9XHJcbiAgICBhZGRBY2NlbGVyYXRpb24odikge1xyXG4gICAgICAgIHRoaXMuYWNjZWxlcmF0aW9uID0gdjMuc3VtKHRoaXMuYWNjZWxlcmF0aW9uLCB2KTtcclxuICAgIH0gLypcclxuICAgIGFwcGx5QW5ndWxhckltcHVsc2UocmFkaXVzIDogbnVtYmVyLCBheGlzLCB2YWx1ZSkge1xyXG4gICAgICBjb25zdCBkaXIgPSBub3JtYWxpemUoW1xyXG4gICAgICAgIGF4aXNbMV0gKyBheGlzWzJdLFxyXG4gICAgICAgIGF4aXNbMl0gLSBheGlzWzBdLFxyXG4gICAgICAgIC1heGlzWzBdIC0gYXhpc1sxXSxcclxuICAgICAgXSk7XHJcbiAgICAgIGNvbnN0IHJhZCA9IHZlY3Rvci5jcm9zcyhkaXIsIGF4aXMpO1xyXG4gICAgICBjb25zdCBnbG9iYWxEaXIgPSBzY2FsZShkaXIsIHZhbHVlKTtcclxuICAgICAgY29uc3QgZ2xvYmFsUmFkID0gc2NhbGUocmFkLCByYWRpdXMpO1xyXG4gIFxyXG4gICAgICB0aGlzLmFwcGx5SW1wdWxzZShnbG9iYWxEaXIsIGdsb2JhbFJhZCk7XHJcbiAgICB9Ki9cclxuICAgIGdldEV4cGFuZGVkQUFCQigpIHtcclxuICAgICAgICBjb25zdCBhYWJiID0gdGhpcy5jb2xsaWRlci5nZXRBQUJCKCk7XHJcbiAgICAgICAgY29uc3QgdmVsb2NpdHkgPSB0aGlzLnZlbG9jaXR5O1xyXG4gICAgICAgIGNvbnN0IHRyID0gW1JJR0lEX0JPRFlfQUFCQl9CSUFTLCBSSUdJRF9CT0RZX0FBQkJfQklBUywgUklHSURfQk9EWV9BQUJCX0JJQVNdO1xyXG4gICAgICAgIGFhYmIubWluID0gdjMuZGlmZihhYWJiLm1pbiwgdHIpO1xyXG4gICAgICAgIGFhYmIubWF4ID0gdjMuc3VtKGFhYmIubWF4LCB0cik7XHJcbiAgICAgICAgLyppZih2ZWxvY2l0eVswXSA+IDEwKSBhYWJiLm1heFswXSArPSB2ZWxvY2l0eVswXVxyXG4gICAgICAgICAgaWYodmVsb2NpdHlbMV0gPiAxMCkgYWFiYi5tYXhbMV0gKz0gdmVsb2NpdHlbMV1cclxuICAgICAgICAgIGlmKHZlbG9jaXR5WzJdID4gMTApIGFhYmIubWF4WzJdICs9IHZlbG9jaXR5WzJdXHJcbiAgICAgICAgICBpZih2ZWxvY2l0eVswXSA8IC0xMCkgYWFiYi5taW5bMF0gKz0gdmVsb2NpdHlbMF1cclxuICAgICAgICAgIGlmKHZlbG9jaXR5WzFdIDwgLTEwKSBhYWJiLm1pblsxXSArPSB2ZWxvY2l0eVsxXVxyXG4gICAgICAgICAgaWYodmVsb2NpdHlbMl0gPCAtMTApIGFhYmIubWluWzJdICs9IHZlbG9jaXR5WzJdKi9cclxuICAgICAgICByZXR1cm4gYWFiYjtcclxuICAgIH1cclxuICAgIGdldEFBQkIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sbGlkZXIuZ2V0QUFCQigpO1xyXG4gICAgfVxyXG4gICAgb25VcGRhdGUoZnVuYykge1xyXG4gICAgICAgIGlmICh0aGlzLnVwZGF0ZUV2ZW50RnVuY3Rpb25zLmluZGV4T2YoZnVuYykgPiAtMSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMudXBkYXRlRXZlbnRGdW5jdGlvbnMucHVzaChmdW5jKTtcclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50RnVuY3Rpb25zLmZpbHRlcihmbiA9PiBmbiAhPT0gZnVuYyk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGVtaXRVcGRhdGUoKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVFdmVudEZ1bmN0aW9ucy5mb3JFYWNoKGZuID0+IHtcclxuICAgICAgICAgICAgZm4oKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5SaWdpZEJvZHkuY29uZmlnID0ge1xyXG4gICAgUklHSURfQk9EWV9NT1ZFX1RSRVNIT0xEOiAwLjAwNSxcclxuICAgIFJJR0lEX0JPRFlfQUFCQl9CSUFTOiAwLjAwMDAxXHJcbn07XHJcblJpZ2lkQm9keS5sYXN0SWQgPSAxO1xyXG5jbGFzcyBQbGF5ZXIgZXh0ZW5kcyBSaWdpZEJvZHkge1xyXG4gICAgY29uc3RydWN0b3IoY29sbGlkZXIpIHtcclxuICAgICAgICBzdXBlcihjb2xsaWRlcik7XHJcbiAgICAgICAgdGhpcy5mcmljdGlvbiA9IDAuMztcclxuICAgIH1cclxuICAgIGFwcGx5SW1wdWxzZShpbXB1bHNlLCBwb2ludCkge1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSB2My5zdW0odGhpcy52ZWxvY2l0eSwgdjMuc2NhbGUoaW1wdWxzZSwgdGhpcy5pbnZlcnNlTWFzcykpO1xyXG4gICAgfVxyXG4gICAgYXBwbHlQc2V1ZG9JbXB1bHNlKGltcHVsc2UpIHtcclxuICAgICAgICB0aGlzLnBzZXVkb1ZlbG9jaXR5ID0gdjMuc3VtKHRoaXMucHNldWRvVmVsb2NpdHksIHYzLnNjYWxlKGltcHVsc2UsIHRoaXMuaW52ZXJzZU1hc3MpKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgeyBSaWdpZEJvZHksIFBsYXllciB9O1xyXG4iLCJpbXBvcnQgVHJlZSBmcm9tIFwiLi9UcmVlXCI7XHJcbmltcG9ydCB7IGdldENvbnRhY3RzIGFzIGdqayB9IGZyb20gXCIuL2dqa1wiO1xyXG5pbXBvcnQgTWFuaWZvbGQgZnJvbSBcIi4vQ29udGFjdE1hbmlmb2xkXCI7XHJcbmltcG9ydCBTeXN0ZW0gZnJvbSBcIi4vU3lzdGVtXCI7XHJcbmltcG9ydCB7IENvbnRhY3RDb25zdHJhaW50IH0gZnJvbSBcIi4vQ29uc3RyYWludHNcIjtcclxuY29uc3Qgc2FtZUdyb3VwID0gKGJvZHkxLCBib2R5MikgPT4ge1xyXG4gICAgaWYgKCFib2R5MS5ncm91cClcclxuICAgICAgICByZXR1cm47XHJcbiAgICBpZiAoIWJvZHkyLmdyb3VwKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIHJldHVybiBib2R5MS5ncm91cCA9PT0gYm9keTIuZ3JvdXA7XHJcbn07XHJcbmNvbnN0IHBhaXJIYXNoID0gKHgsIHkpID0+IHggPT09IE1hdGgubWF4KHgsIHkpID8geCAqIHggKyB4ICsgeSA6IHkgKiB5ICsgeCArIHk7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpbXVsYXRpb24ge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIHRoaXMudHJlZSA9IG5ldyBUcmVlKCk7XHJcbiAgICAgICAgdGhpcy5zdGF0aWNUcmVlID0gbmV3IFRyZWUoKTtcclxuICAgICAgICB0aGlzLmNvbGxpc2lvbnMgPSBbXTtcclxuICAgICAgICB0aGlzLmNvbnN0cmFpbnRzID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIHRoaXMudXNlQ2FjaGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY29sbGlzaW9uTWFuaWZvbGRzID0gbmV3IE1hcCgpO1xyXG4gICAgfVxyXG4gICAgYWRkT2JqZWN0KG9iamVjdCkge1xyXG4gICAgICAgIGNvbnN0IHsgdHJlZSwgb2JqZWN0cywgc3RhdGljVHJlZSB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCBhYWJiID0gb2JqZWN0LmdldEV4cGFuZGVkQUFCQigpO1xyXG4gICAgICAgIG9iamVjdHMuc2V0KG9iamVjdC5pZCwgb2JqZWN0KTtcclxuICAgICAgICBpZiAob2JqZWN0LnN0YXRpYykge1xyXG4gICAgICAgICAgICBzdGF0aWNUcmVlLmluc2VydChhYWJiLCBvYmplY3QuaWQpO1xyXG4gICAgICAgICAgICBvYmplY3Qub25VcGRhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYWFiYiA9IG9iamVjdC5nZXRBQUJCKCk7XHJcbiAgICAgICAgICAgICAgICBzdGF0aWNUcmVlLnJlbW92ZShvYmplY3QuaWQpO1xyXG4gICAgICAgICAgICAgICAgc3RhdGljVHJlZS5pbnNlcnQoYWFiYiwgb2JqZWN0LmlkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJlZS5pbnNlcnQoYWFiYiwgb2JqZWN0LmlkKTtcclxuICAgICAgICBvYmplY3Qub25VcGRhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBhYWJiID0gb2JqZWN0LmdldEFBQkIoKTtcclxuICAgICAgICAgICAgdHJlZS5yZW1vdmUob2JqZWN0LmlkKTtcclxuICAgICAgICAgICAgdHJlZS5pbnNlcnQoYWFiYiwgb2JqZWN0LmlkKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGFkZENvbnN0cmFpbnRzKGNvbnN0cmFpbnRzLCBuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5jb25zdHJhaW50cy5zZXQobmFtZSwgWy4uLmNvbnN0cmFpbnRzXSk7XHJcbiAgICB9XHJcbiAgICBhZGRQb3NpdGlvbkNvbnN0cmFpbnRzKGNvbnN0cmFpbnRzLCBuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbkNvbnN0cmFpbnRzLnNldChuYW1lLCBbLi4uY29uc3RyYWludHNdKTtcclxuICAgIH1cclxuICAgIHJlbW92ZU9iamVjdChvYmplY3QpIHtcclxuICAgICAgICB0aGlzLnRyZWUucmVtb3ZlKG9iamVjdC5pZCk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLmRlbGV0ZShvYmplY3QuaWQpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlQ29sbGlzaW9ucygpIHtcclxuICAgICAgICB0aGlzLmJyb2FkUGhhc2VDb2xsaXNpb25zID0gW107XHJcbiAgICAgICAgY29uc3QgeyBjb2xsaXNpb25NYW5pZm9sZHMsIHRyZWUsIHN0YXRpY1RyZWUsIG9iamVjdHMgfSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGtlZXAgPSAwO1xyXG4gICAgICAgIGZvciAoY29uc3QgW2hhc2gsIG1hbmlmb2xkXSBvZiBjb2xsaXNpb25NYW5pZm9sZHMpIHtcclxuICAgICAgICAgICAgbWFuaWZvbGQudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIGlmICghbWFuaWZvbGQua2VlcClcclxuICAgICAgICAgICAgICAgIGNvbGxpc2lvbk1hbmlmb2xkcy5kZWxldGUoaGFzaCk7XHJcbiAgICAgICAgICAgIGtlZXArKztcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChjb25zdCBbaWQsIGJvZHkxXSBvZiBvYmplY3RzKSB7XHJcbiAgICAgICAgICAgIGlmIChib2R5MS5zdGF0aWMpXHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgY29uc3QgaW50ZXJzZWN0cyA9IHRyZWUuZ2V0Q29sbGlzaW9ucyhib2R5MS5nZXRBQUJCKCksIGlkKTtcclxuICAgICAgICAgICAgY29uc3QgaW50ZXJzZWN0V2l0aFN0YXRpY3MgPSBzdGF0aWNUcmVlLmdldENvbGxpc2lvbnMoYm9keTEuZ2V0QUFCQigpLCBpZCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGJyb2FkUGhhc2VJZHMgPSBbLi4uaW50ZXJzZWN0V2l0aFN0YXRpY3MsIC4uLmludGVyc2VjdHNdO1xyXG4gICAgICAgICAgICB0aGlzLmJyb2FkUGhhc2VDb2xsaXNpb25zLnB1c2goW2JvZHkxLmlkLCBicm9hZFBoYXNlSWRzXSk7XHJcbiAgICAgICAgICAgIHRyZWUuZWxlbWVudHMuZ2V0KGlkKS5pc0NoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoYnJvYWRQaGFzZUlkcy5sZW5ndGggIT0gMClcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwLCBuID0gYnJvYWRQaGFzZUlkcy5sZW5ndGg7IGogPCBuOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBib2R5MiA9IG9iamVjdHMuZ2V0KGJyb2FkUGhhc2VJZHNbal0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzYW1lR3JvdXAoYm9keTEsIGJvZHkyKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzaCA9IHBhaXJIYXNoKGJvZHkxLmlkLCBib2R5Mi5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1hbmlmb2xkID0gdGhpcy5jb2xsaXNpb25NYW5pZm9sZHMuZ2V0KGhhc2gpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYW5pZm9sZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0dWFsQ29udGFjdHMgPSBnamsoYm9keTEuY29sbGlkZXIsIGJvZHkyLmNvbGxpZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0dWFsQ29udGFjdHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYW5pZm9sZCA9IG5ldyBNYW5pZm9sZChhY3R1YWxDb250YWN0cy5tYXAoKGMpID0+IG5ldyBDb250YWN0Q29uc3RyYWludChib2R5MSwgYm9keTIsIGMucmFMb2NhbCwgYy5yYkxvY2FsLCBjLnJhLCBjLnJiLCBjLlBBLCBjLlBCLCBjLm4sIGMucG9zaXRpb25FcnJvciwgYy5pLCBjLmopKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29sbGlzaW9uTWFuaWZvbGRzLnNldChoYXNoLCBtYW5pZm9sZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRyZWUuc2V0VW5jaGVja2VkKCk7XHJcbiAgICAgICAgdGhpcy5zdGF0aWNUcmVlLnNldFVuY2hlY2tlZCgpO1xyXG4gICAgfVxyXG4gICAgdGljayhkdCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ29sbGlzaW9ucygpO1xyXG4gICAgICAgIGNvbnN0IHsgb2JqZWN0cywgY29sbGlzaW9uTWFuaWZvbGRzIH0gPSB0aGlzO1xyXG4gICAgICAgIGZvciAoY29uc3QgW2lkLCBvYmplY3RdIG9mIG9iamVjdHMpIHtcclxuICAgICAgICAgICAgb2JqZWN0LmludGVncmF0ZUZvcmNlcyhkdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHN5c3RlbSA9IG5ldyBTeXN0ZW0oKTtcclxuICAgICAgICBzeXN0ZW0udXNlQ2FjaGUgPSB0aGlzLnVzZUNhY2hlO1xyXG4gICAgICAgIGNvbnN0IGZyaWN0aW9uU3lzdGVtID0gbmV3IFN5c3RlbSgpO1xyXG4gICAgICAgIGNvbnN0IGNvbnRhY3RFcXVhdGlvbnMgPSBbXTtcclxuICAgICAgICBjb25zdCBmcmljdGlvbkVxdWF0aW9ucyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IFtrZXksIG1hbmlmb2xkXSBvZiBjb2xsaXNpb25NYW5pZm9sZHMpIHtcclxuICAgICAgICAgICAgY29uc3QgdXNlVmVsb2NpdHlCaWFzID0gbWFuaWZvbGQuY29udGFjdHMubGVuZ3RoIDwgMjtcclxuICAgICAgICAgICAgbWFuaWZvbGQuY29udGFjdHMuZm9yRWFjaCgoY29udGFjdENvbnN0cmFpbnQsIF9pKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb250YWN0RXF1YXRpb24gPSBjb250YWN0Q29uc3RyYWludC5nZXRFcXVhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgY29udGFjdEVxdWF0aW9uLnByZXZMYW1iZGEgPSBjb250YWN0Q29uc3RyYWludC5wcmV2TGFtYmRhO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgW2ZFcXVhdGlvbjEsIGZFcXVhdGlvbjJdID0gY29udGFjdENvbnN0cmFpbnQuZ2V0RnJpY3Rpb25FcXVhdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgIGNvbnRhY3RFcXVhdGlvbnMucHVzaChjb250YWN0RXF1YXRpb24pO1xyXG4gICAgICAgICAgICAgICAgZnJpY3Rpb25FcXVhdGlvbnMucHVzaChmRXF1YXRpb24xLCBmRXF1YXRpb24yKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN5c3RlbS5hZGRFcXVhdGlvbnMoY29udGFjdEVxdWF0aW9ucyk7XHJcbiAgICAgICAgZm9yIChsZXQgW25hbWUsIGNvbnN0cmFpbnRzXSBvZiB0aGlzLmNvbnN0cmFpbnRzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVxdWF0aW9ucyA9IFtdO1xyXG4gICAgICAgICAgICBjb25zdHJhaW50cy5mb3JFYWNoKGMgPT4ge1xyXG4gICAgICAgICAgICAgICAgYy51cGRhdGUoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVxdWF0aW9uID0gYy5nZXRFcXVhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgZXF1YXRpb25zLnB1c2goZXF1YXRpb24pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc3lzdGVtLmFkZEVxdWF0aW9ucyhlcXVhdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL3N5c3RlbS51cGRhdGVFcXVhdGlvbnMoZHQpO1xyXG4gICAgICAgIGZyaWN0aW9uU3lzdGVtLmFkZEVxdWF0aW9ucyhmcmljdGlvbkVxdWF0aW9ucyk7XHJcbiAgICAgICAgc3lzdGVtLnVwZGF0ZUVxdWF0aW9ucyhkdCk7XHJcbiAgICAgICAgc3lzdGVtLmdlbmVyYXRlU3lzdGVtKGR0KTtcclxuICAgICAgICBmcmljdGlvblN5c3RlbS51cGRhdGVFcXVhdGlvbnMoZHQpO1xyXG4gICAgICAgIGZyaWN0aW9uU3lzdGVtLmdlbmVyYXRlU3lzdGVtKGR0KTtcclxuICAgICAgICBjb25zdCBsYW1iZGEgPSBzeXN0ZW0uc29sdmVQR1MoZHQsIHRydWUpO1xyXG4gICAgICAgIGNvbnN0IGxlbiA9IGZyaWN0aW9uRXF1YXRpb25zLmxlbmd0aCAvIDI7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBmcmljdGlvbkVxdWF0aW9uc1syICogaV0ubGFtYmRhTWluICo9IGxhbWJkYVtpXTtcclxuICAgICAgICAgICAgZnJpY3Rpb25FcXVhdGlvbnNbMiAqIGldLmxhbWJkYU1heCAqPSBsYW1iZGFbaV07XHJcbiAgICAgICAgICAgIGZyaWN0aW9uRXF1YXRpb25zWzIgKiBpICsgMV0ubGFtYmRhTWluICo9IGxhbWJkYVtpXTtcclxuICAgICAgICAgICAgZnJpY3Rpb25FcXVhdGlvbnNbMiAqIGkgKyAxXS5sYW1iZGFNYXggKj0gbGFtYmRhW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmcmljdGlvblN5c3RlbS5zb2x2ZVBHUyhkdCk7XHJcbiAgICAgICAgZm9yIChjb25zdCBbaWQsIG9iamVjdF0gb2Ygb2JqZWN0cykge1xyXG4gICAgICAgICAgICBvYmplY3QuaW50ZWdyYXRlVmVsb2NpdGllcyhkdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub2JqZWN0cy5mb3JFYWNoKChvYmplY3QpID0+IG9iamVjdC51cGRhdGVJbnZlcnNlSW5lcnRpYSgpKTtcclxuICAgICAgICBsZXQgbmR4ID0gMDtcclxuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIG1hbmlmb2xkXSBvZiB0aGlzLmNvbGxpc2lvbk1hbmlmb2xkcykge1xyXG4gICAgICAgICAgICBtYW5pZm9sZC5jb250YWN0cy5mb3JFYWNoKChjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjLnByZXZMYW1iZGEgPSBsYW1iZGFbbmR4XTtcclxuICAgICAgICAgICAgICAgIG5keCsrO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLypcclxuICAgICAgICBjb25zdCBwb3NpdGlvblN5c3RlbSA9IG5ldyBTeXN0ZW0oKTtcclxuICAgICAgICBjb25zdCBwb3NpdGlvbkNvbnN0cmFpbnRzID0gW107XHJcbiAgICBcclxuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIG1hbmlmb2xkXSBvZiBtYW5pZm9sZHMpIHtcclxuICAgICAgICAgIGNvbnN0IHsgY29udGFjdHMgfSA9IG1hbmlmb2xkO1xyXG4gICAgICAgICAgaWYgKGNvbnRhY3RzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgcG9zaXRpb25Db25zdHJhaW50cy5wdXNoKFxyXG4gICAgICAgICAgICAgIC4uLmNvbnRhY3RzLm1hcCgoYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qge1xyXG4gICAgICAgICAgICAgICAgICBib2R5MSxcclxuICAgICAgICAgICAgICAgICAgYm9keTIsXHJcbiAgICAgICAgICAgICAgICAgIHJhTG9jYWwsXHJcbiAgICAgICAgICAgICAgICAgIHJiTG9jYWwsXHJcbiAgICAgICAgICAgICAgICAgIHJhLFxyXG4gICAgICAgICAgICAgICAgICByYixcclxuICAgICAgICAgICAgICAgICAgaSxcclxuICAgICAgICAgICAgICAgICAgaixcclxuICAgICAgICAgICAgICAgICAgcGVuRGVwdGgsXHJcbiAgICAgICAgICAgICAgICAgIG4sXHJcbiAgICAgICAgICAgICAgICB9ID0gYztcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnN0cmFpbnQgPSBuZXcgUG9zaXRpb25Db25zdHJhaW50KFxyXG4gICAgICAgICAgICAgICAgICBib2R5MSxcclxuICAgICAgICAgICAgICAgICAgYm9keTIsXHJcbiAgICAgICAgICAgICAgICAgIG4sXHJcbiAgICAgICAgICAgICAgICAgIHJhLFxyXG4gICAgICAgICAgICAgICAgICByYixcclxuICAgICAgICAgICAgICAgICAgcmFMb2NhbCxcclxuICAgICAgICAgICAgICAgICAgcmJMb2NhbCxcclxuICAgICAgICAgICAgICAgICAgMC4xLFxyXG4gICAgICAgICAgICAgICAgICAwLjAwMDEsXHJcbiAgICAgICAgICAgICAgICAgIHBlbkRlcHRoXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uc3RyYWludDtcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwb3NpdGlvblN5c3RlbS5hZGRDb25zdHJhaW50KHBvc2l0aW9uQ29uc3RyYWludHMpO1xyXG4gICAgICAgIGZvciAobGV0IFtuYW1lLCBjb25zdHJhaW50c10gb2YgdGhpcy5wb3NpdGlvbkNvbnN0cmFpbnRzKSB7XHJcbiAgICAgICAgICBwb3NpdGlvblN5c3RlbS5hZGRDb25zdHJhaW50KGNvbnN0cmFpbnRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcG9zaXRpb25TeXN0ZW0udXBkYXRlRXF1YXRpb25zKGR0KTtcclxuICAgICAgICBwb3NpdGlvblN5c3RlbS5nZW5lcmF0ZVN5c3RlbShkdCk7XHJcbiAgICBcclxuICAgICAgICBwb3NpdGlvblN5c3RlbS5zb2x2ZVBHUyhkdCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSB0aGlzLm9iamVjdHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICB0aGlzLm9iamVjdHNbaV0uaW50ZWdyYXRlUHNldWRvVmVsb2NpdGllcyhkdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub2JqZWN0cy5mb3JFYWNoKChvYmplY3QpID0+IG9iamVjdC51cGRhdGVJbnZlcnNlSW5lcnRpYSgpKTsqL1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBjb25maWcgZnJvbSBcIi4vY29uZmlnXCI7XHJcbmxldCBhcnIgPSBbXTtcclxubGV0IG8gPSAwO1xyXG5sZXQgZiA9IHRydWU7XHJcbmNvbnN0IF9sb2cgPSAodmFsKSA9PiB7XHJcbiAgICBvKys7XHJcbiAgICBpZiAoZikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGFycik7XHJcbiAgICAgICAgZiA9IGZhbHNlO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChvIDwgMjAwICYmIG8gJSAxMCA9PSAwKSB7XHJcbiAgICAgICAgYXJyLnB1c2godmFsKTtcclxuICAgIH1cclxufTtcclxuY29uc3QgeyBTT0xWRVJfSVRFUkFUSU9OU19OVU0gfSA9IGNvbmZpZztcclxuY29uc3QgdjYgPSB7XHJcbiAgICBkb3QoYSwgYikge1xyXG4gICAgICAgIHJldHVybiBhWzBdICogYlswXSArXHJcbiAgICAgICAgICAgIGFbMV0gKiBiWzFdICtcclxuICAgICAgICAgICAgYVsyXSAqIGJbMl0gK1xyXG4gICAgICAgICAgICBhWzNdICogYlszXSArXHJcbiAgICAgICAgICAgIGFbNF0gKiBiWzRdICtcclxuICAgICAgICAgICAgYVs1XSAqIGJbNV07XHJcbiAgICB9LFxyXG4gICAgc2NhbGUoYSwgZmFjKSB7XHJcbiAgICAgICAgcmV0dXJuIFthWzBdICogZmFjLCBhWzFdICogZmFjLCBhWzJdICogZmFjLCBhWzNdICogZmFjLCBhWzRdICogZmFjLCBhWzVdICogZmFjXTtcclxuICAgIH0sXHJcbiAgICBzdW0oYSwgYikge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIGFbMF0gKyBiWzBdLFxyXG4gICAgICAgICAgICBhWzFdICsgYlsxXSxcclxuICAgICAgICAgICAgYVsyXSArIGJbMl0sXHJcbiAgICAgICAgICAgIGFbM10gKyBiWzNdLFxyXG4gICAgICAgICAgICBhWzRdICsgYls0XSxcclxuICAgICAgICAgICAgYVs1XSArIGJbNV1cclxuICAgICAgICBdO1xyXG4gICAgfSxcclxuICAgIGZyb212MyhhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIFsuLi5hLCAuLi5iXTtcclxuICAgIH1cclxufTtcclxuY29uc3Qgbm9ybSA9ICh2KSA9PiBNYXRoLnNxcnQodi5yZWR1Y2UoKGFjYywgZWwpID0+IGFjYyArPSBlbCAqIGVsLCAwKSk7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN5c3RlbSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmVxdWF0aW9ucyA9IFtdO1xyXG4gICAgICAgIHRoaXMudXNlQ2FjaGUgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgYWRkRXF1YXRpb25zKGVxdWF0aW9ucykge1xyXG4gICAgICAgIHRoaXMuZXF1YXRpb25zLnB1c2goLi4uZXF1YXRpb25zKTtcclxuICAgIH1cclxuICAgIGdlbmVyYXRlQm9keU1hcHBpbmcoKSB7XHJcbiAgICAgICAgY29uc3QgY29uc3RyYWludHMgPSB0aGlzLmVxdWF0aW9ucztcclxuICAgICAgICBjb25zdCBuID0gY29uc3RyYWludHMubGVuZ3RoO1xyXG4gICAgICAgIGNvbnN0IGJvZGllc01hcCA9IG5ldyBNYXAoKTtcclxuICAgICAgICBjb25zdCBKbWFwID0gW107XHJcbiAgICAgICAgbGV0IGNvdW50ZXIgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGMgPSBjb25zdHJhaW50c1tpXTtcclxuICAgICAgICAgICAgbGV0IGJvZHlJbmRleDEgPSBib2RpZXNNYXAuZ2V0KGMuYm9keTEuaWQpO1xyXG4gICAgICAgICAgICBpZiAoYm9keUluZGV4MSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBib2R5SW5kZXgxID0gY291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgYm9kaWVzTWFwLnNldChjLmJvZHkxLmlkLCBib2R5SW5kZXgxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgYm9keUluZGV4MiA9IGJvZGllc01hcC5nZXQoYy5ib2R5Mi5pZCk7XHJcbiAgICAgICAgICAgIGlmIChib2R5SW5kZXgyID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGJvZHlJbmRleDIgPSBjb3VudGVyKys7XHJcbiAgICAgICAgICAgICAgICBib2RpZXNNYXAuc2V0KGMuYm9keTIuaWQsIGJvZHlJbmRleDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEptYXAucHVzaChib2R5SW5kZXgxLCBib2R5SW5kZXgyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ib2RpZXNNYXAgPSBib2RpZXNNYXA7XHJcbiAgICAgICAgdGhpcy5KbWFwID0gSm1hcDtcclxuICAgIH1cclxuICAgIGdlbmVyYXRlU3lzdGVtKGRlbHRhVGltZSkge1xyXG4gICAgICAgIC8vTnVtZXJhdGluZyBib2RpZXNcclxuICAgICAgICB0aGlzLmdlbmVyYXRlQm9keU1hcHBpbmcoKTtcclxuICAgIH1cclxuICAgIC8vSiAqIFZlbFxyXG4gICAgc29sdmVQR1MoZGVsdGFUaW1lLCBsb2cgPSBmYWxzZSkge1xyXG4gICAgICAgIGNvbnN0IHsgSm1hcCwgYm9kaWVzTWFwLCBlcXVhdGlvbnMgfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgbnVtQm9kaWVzID0gYm9kaWVzTWFwLnNpemU7XHJcbiAgICAgICAgY29uc3QgbiA9IGVxdWF0aW9ucy5sZW5ndGg7XHJcbiAgICAgICAgY29uc3QgZCA9IFtdO1xyXG4gICAgICAgIGNvbnN0IGxhbWJkYTAgPSBuZXcgQXJyYXkobikuZmlsbCgwKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnVzZUNhY2hlKTtcclxuICAgICAgICBpZiAodGhpcy51c2VDYWNoZSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVxdWF0aW9uc1tpXS5wcmV2TGFtYmRhKVxyXG4gICAgICAgICAgICAgICAgICAgIGxhbWJkYTBbaV0gPSBlcXVhdGlvbnNbaV0ucHJldkxhbWJkYTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBCbCA9IG5ldyBBcnJheShudW1Cb2RpZXMpLmZpbGwoWzAsIDAsIDAsIDAsIDAsIDBdKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBiMSA9IEptYXBbaSAqIDJdO1xyXG4gICAgICAgICAgICBjb25zdCBiMiA9IEptYXBbaSAqIDIgKyAxXTtcclxuICAgICAgICAgICAgQmxbYjFdID0gdjYuc3VtKHY2LnNjYWxlKGVxdWF0aW9uc1tpXS5CWzBdLCBsYW1iZGEwW2ldKSwgQmxbYjFdKTtcclxuICAgICAgICAgICAgQmxbYjJdID0gdjYuc3VtKHY2LnNjYWxlKGVxdWF0aW9uc1tpXS5CWzFdLCBsYW1iZGEwW2ldKSwgQmxbYjJdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9QR1NcclxuICAgICAgICBjb25zdCBsYW1iZGEgPSBbLi4ubGFtYmRhMF07XHJcbiAgICAgICAgY29uc3QgbGFtYmRhT2xkID0gWy4uLmxhbWJkYV07XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgZC5wdXNoKGVxdWF0aW9uc1tpXS5lZmZNYXNzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGZsYWcgPSB0cnVlO1xyXG4gICAgICAgIGxldCBudW1JdGVyID0gU09MVkVSX0lURVJBVElPTlNfTlVNO1xyXG4gICAgICAgIGNvbnN0IGRlbHRhTGFtYmRhID0gbmV3IEFycmF5KG4pLmZpbGwoMCk7XHJcbiAgICAgICAgbGV0IHN0ciA9ICcnO1xyXG4gICAgICAgIHdoaWxlIChudW1JdGVyID4gMCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYyA9IGVxdWF0aW9uc1tpXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IEogPSBjLl9KO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYjEgPSBKbWFwW2kgKiAyXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGIyID0gSm1hcFtpICogMiArIDFdO1xyXG4gICAgICAgICAgICAgICAgZGVsdGFMYW1iZGFbaV0gPSAoYy5iaWFzIC0gdjYuZG90KEpbMF0sIEJsW2IxXSkgLSB2Ni5kb3QoSlsxXSwgQmxbYjJdKSkgLyBkW2ldO1xyXG4gICAgICAgICAgICAgICAgbGFtYmRhMFtpXSA9IGxhbWJkYVtpXTtcclxuICAgICAgICAgICAgICAgIGxhbWJkYVtpXSA9IE1hdGgubWF4KGMubGFtYmRhTWluLCBNYXRoLm1pbihsYW1iZGEwW2ldICsgZGVsdGFMYW1iZGFbaV0sIGMubGFtYmRhTWF4KSk7XHJcbiAgICAgICAgICAgICAgICBkZWx0YUxhbWJkYVtpXSA9IGxhbWJkYVtpXSAtIGxhbWJkYTBbaV07XHJcbiAgICAgICAgICAgICAgICBCbFtiMV0gPSB2Ni5zdW0oQmxbYjFdLCB2Ni5zY2FsZShjLkJbMF0sIGRlbHRhTGFtYmRhW2ldKSk7XHJcbiAgICAgICAgICAgICAgICBCbFtiMl0gPSB2Ni5zdW0oQmxbYjJdLCB2Ni5zY2FsZShjLkJbMV0sIGRlbHRhTGFtYmRhW2ldKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGxvZylcclxuICAgICAgICAgICAgICAgIHN0ciArPSBgJHtub3JtKGRlbHRhTGFtYmRhKX1cXG5gO1xyXG4gICAgICAgICAgICBudW1JdGVyLS07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChsb2cpXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlcnJvcicpLnRleHRDb250ZW50ID0gYGxhbWJkYSBlcnJvciA6IFxcbiR7bm9ybShkZWx0YUxhbWJkYSl9YDtcclxuICAgICAgICBfbG9nKG5vcm0oZGVsdGFMYW1iZGEpKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBlcXVhdGlvbnNbaV0uYXBwbHlJbXB1bHNlKGxhbWJkYVtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsYW1iZGE7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVFcXVhdGlvbnMoZGVsdGFUaW1lKSB7XHJcbiAgICAgICAgY29uc3QgeyBlcXVhdGlvbnMgfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgbiA9IGVxdWF0aW9ucy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgZXF1YXRpb25zW2ldLnVwZGF0ZUxlZnRQYXJ0KGRlbHRhVGltZSk7XHJcbiAgICAgICAgICAgIGVxdWF0aW9uc1tpXS51cGRhdGVSaWdodFBhcnQoZGVsdGFUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBhcHBseVJlc29sdmluZ0ltcHVsc2VzKGxhbWJkYSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gdGhpcy5lcXVhdGlvbnMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXF1YXRpb25zW2ldLmFwcGx5SW1wdWxzZShsYW1iZGFbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGFwcGx5UmVzb2x2aW5nUHNldWRvSW1wdWxzZXMobGFtYmRhKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSB0aGlzLmVxdWF0aW9ucy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5lcXVhdGlvbnNbaV0uYXBwbHlQc2V1ZG9JbXB1bHNlKGxhbWJkYVtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblN5c3RlbS51c2VDYWNoZSA9IHRydWU7XHJcbiIsImltcG9ydCB7IEFBQkIgfSBmcm9tIFwicm9tYW5wcHBtYXRoXCI7XHJcbmNvbnN0IGdldEJvdW5kQWFiYiA9IChhYWJiMSwgYWFiYjIpID0+IHtcclxuICAgIGNvbnN0IHgxID0gYWFiYjEubWluWzBdIDwgYWFiYjIubWluWzBdID8gYWFiYjEubWluWzBdIDogYWFiYjIubWluWzBdO1xyXG4gICAgY29uc3QgeDIgPSBhYWJiMS5tYXhbMF0gPiBhYWJiMi5tYXhbMF0gPyBhYWJiMS5tYXhbMF0gOiBhYWJiMi5tYXhbMF07XHJcbiAgICBjb25zdCB5MSA9IGFhYmIxLm1pblsxXSA8IGFhYmIyLm1pblsxXSA/IGFhYmIxLm1pblsxXSA6IGFhYmIyLm1pblsxXTtcclxuICAgIGNvbnN0IHkyID0gYWFiYjEubWF4WzFdID4gYWFiYjIubWF4WzFdID8gYWFiYjEubWF4WzFdIDogYWFiYjIubWF4WzFdO1xyXG4gICAgY29uc3QgejEgPSBhYWJiMS5taW5bMl0gPCBhYWJiMi5taW5bMl0gPyBhYWJiMS5taW5bMl0gOiBhYWJiMi5taW5bMl07XHJcbiAgICBjb25zdCB6MiA9IGFhYmIxLm1heFsyXSA+IGFhYmIyLm1heFsyXSA/IGFhYmIxLm1heFsyXSA6IGFhYmIyLm1heFsyXTtcclxuICAgIHJldHVybiBuZXcgQUFCQihbeDEsIHkxLCB6MV0sIFt4MiwgeTIsIHoyXSk7XHJcbn07XHJcbmNvbnN0IGlzQ29sbGlkZSA9IChhYWJiMSwgYWFiYjIpID0+IHtcclxuICAgIGlmIChhYWJiMS5taW5bMF0gPD0gYWFiYjIubWF4WzBdICYmXHJcbiAgICAgICAgYWFiYjEubWF4WzBdID49IGFhYmIyLm1pblswXSAmJlxyXG4gICAgICAgIGFhYmIxLm1pblsxXSA8PSBhYWJiMi5tYXhbMV0gJiZcclxuICAgICAgICBhYWJiMS5tYXhbMV0gPj0gYWFiYjIubWluWzFdICYmXHJcbiAgICAgICAgYWFiYjEubWluWzJdIDw9IGFhYmIyLm1heFsyXSAmJlxyXG4gICAgICAgIGFhYmIxLm1heFsyXSA+PSBhYWJiMi5taW5bMl0pIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufTtcclxuY29uc3QgZ2V0U2l6ZSA9IChhYWJiKSA9PiB7XHJcbiAgICBjb25zdCBhcmVhID0gTWF0aC5hYnMoYWFiYi5tYXhbMF0gLSBhYWJiLm1pblswXSkgKlxyXG4gICAgICAgIE1hdGguYWJzKGFhYmIubWF4WzFdIC0gYWFiYi5taW5bMV0pICpcclxuICAgICAgICBNYXRoLmFicyhhYWJiLm1heFsyXSAtIGFhYmIubWluWzJdKTtcclxuICAgIHJldHVybiBhcmVhO1xyXG59O1xyXG5jbGFzcyBOb2RlIHtcclxuICAgIGNvbnN0cnVjdG9yKGFhYmIsIGlzTGVhZiwgaWQpIHtcclxuICAgICAgICB0aGlzLmFhYmIgPSBhYWJiO1xyXG4gICAgICAgIHRoaXMuaXNMZWFmID0gaXNMZWFmO1xyXG4gICAgICAgIHRoaXMucGFyZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5jaGlsZDEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY2hpbGQyID0gbnVsbDtcclxuICAgICAgICB0aGlzLmlzQ2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyZWUge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5yb290ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmVsZW1lbnRzID0gbmV3IE1hcCgpO1xyXG4gICAgfVxyXG4gICAgc2V0VW5jaGVja2VkKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5yb290KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgY29uc3Qgc3RhY2sgPSBbdGhpcy5yb290XTtcclxuICAgICAgICB3aGlsZSAoc3RhY2subGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHN0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICBpZiAobm9kZS5pc0xlYWYpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUuaXNDaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobm9kZS5jaGlsZDEpXHJcbiAgICAgICAgICAgICAgICBzdGFjay5wdXNoKG5vZGUuY2hpbGQxKTtcclxuICAgICAgICAgICAgaWYgKG5vZGUuY2hpbGQyKVxyXG4gICAgICAgICAgICAgICAgc3RhY2sucHVzaChub2RlLmNoaWxkMik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0QmVzdFNpYmxpbmcobGVhZikge1xyXG4gICAgICAgIGxldCBwb3RlbnRpYWwgPSB0aGlzLnJvb3Q7XHJcbiAgICAgICAgd2hpbGUgKCFwb3RlbnRpYWwuaXNMZWFmKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNpemUgPSBnZXRTaXplKHBvdGVudGlhbC5hYWJiKTtcclxuICAgICAgICAgICAgY29uc3QgY29tYmluZWRBQUJCID0gZ2V0Qm91bmRBYWJiKHBvdGVudGlhbC5hYWJiLCBsZWFmLmFhYmIpO1xyXG4gICAgICAgICAgICBjb25zdCBjb21iaW5lZFNpemUgPSBnZXRTaXplKGNvbWJpbmVkQUFCQik7XHJcbiAgICAgICAgICAgIGxldCBjb3N0ID0gY29tYmluZWRTaXplO1xyXG4gICAgICAgICAgICBsZXQgaW5oZXJDb3N0ID0gY29tYmluZWRTaXplIC0gc2l6ZTtcclxuICAgICAgICAgICAgbGV0IGNvc3QxO1xyXG4gICAgICAgICAgICBpZiAocG90ZW50aWFsLmNoaWxkMS5pc0xlYWYpIHtcclxuICAgICAgICAgICAgICAgIGNvc3QxID0gZ2V0U2l6ZShwb3RlbnRpYWwuY2hpbGQxLmFhYmIpICsgaW5oZXJDb3N0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29zdDEgPVxyXG4gICAgICAgICAgICAgICAgICAgIGdldFNpemUoZ2V0Qm91bmRBYWJiKGxlYWYuYWFiYiwgcG90ZW50aWFsLmNoaWxkMS5hYWJiKSkgLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRTaXplKHBvdGVudGlhbC5jaGlsZDEuYWFiYikgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmhlckNvc3Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGNvc3QyO1xyXG4gICAgICAgICAgICBpZiAocG90ZW50aWFsLmNoaWxkMi5pc0xlYWYpIHtcclxuICAgICAgICAgICAgICAgIGNvc3QyID0gZ2V0U2l6ZShwb3RlbnRpYWwuY2hpbGQyLmFhYmIpICsgaW5oZXJDb3N0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29zdDIgPVxyXG4gICAgICAgICAgICAgICAgICAgIGdldFNpemUoZ2V0Qm91bmRBYWJiKGxlYWYuYWFiYiwgcG90ZW50aWFsLmNoaWxkMi5hYWJiKSkgLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRTaXplKHBvdGVudGlhbC5jaGlsZDIuYWFiYikgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmhlckNvc3Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvc3QgPCBjb3N0MSAmJiBjb3N0IDwgY29zdDIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcG90ZW50aWFsO1xyXG4gICAgICAgICAgICBpZiAoY29zdDEgPCBjb3N0Mikge1xyXG4gICAgICAgICAgICAgICAgcG90ZW50aWFsID0gcG90ZW50aWFsLmNoaWxkMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBwb3RlbnRpYWwgPSBwb3RlbnRpYWwuY2hpbGQyO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcG90ZW50aWFsO1xyXG4gICAgfVxyXG4gICAgaW5zZXJ0KGFhYmIsIGlkKSB7XHJcbiAgICAgICAgY29uc3QgbGVhZiA9IG5ldyBOb2RlKGFhYmIsIHRydWUsIGlkKTtcclxuICAgICAgICB0aGlzLmVsZW1lbnRzLnNldChpZCwgbGVhZik7XHJcbiAgICAgICAgaWYgKHRoaXMucm9vdCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnJvb3QgPSBsZWFmO1xyXG4gICAgICAgICAgICB0aGlzLnJvb3QucGFyZW50ID0gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuIGxlYWY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHNpYmxpbmcgPSB0aGlzLmdldEJlc3RTaWJsaW5nKGxlYWYpO1xyXG4gICAgICAgIGNvbnN0IG9sZFBhcmVudCA9IHNpYmxpbmcucGFyZW50O1xyXG4gICAgICAgIGNvbnN0IG5ld1BhcmVudCA9IG5ldyBOb2RlKGxlYWYuYWFiYiwgZmFsc2UsIG51bGwpO1xyXG4gICAgICAgIG5ld1BhcmVudC5wYXJlbnQgPSBvbGRQYXJlbnQ7XHJcbiAgICAgICAgbmV3UGFyZW50LmFhYmIgPSBnZXRCb3VuZEFhYmIobGVhZi5hYWJiLCBzaWJsaW5nLmFhYmIpO1xyXG4gICAgICAgIGlmIChvbGRQYXJlbnQpIHtcclxuICAgICAgICAgICAgaWYgKG9sZFBhcmVudC5jaGlsZDEgPT09IHNpYmxpbmcpXHJcbiAgICAgICAgICAgICAgICBvbGRQYXJlbnQuY2hpbGQxID0gbmV3UGFyZW50O1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBvbGRQYXJlbnQuY2hpbGQyID0gbmV3UGFyZW50O1xyXG4gICAgICAgICAgICBuZXdQYXJlbnQuY2hpbGQxID0gc2libGluZztcclxuICAgICAgICAgICAgbmV3UGFyZW50LmNoaWxkMiA9IGxlYWY7XHJcbiAgICAgICAgICAgIHNpYmxpbmcucGFyZW50ID0gbmV3UGFyZW50O1xyXG4gICAgICAgICAgICBsZWFmLnBhcmVudCA9IG5ld1BhcmVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIG5ld1BhcmVudC5jaGlsZDEgPSBzaWJsaW5nO1xyXG4gICAgICAgICAgICBuZXdQYXJlbnQuY2hpbGQyID0gbGVhZjtcclxuICAgICAgICAgICAgc2libGluZy5wYXJlbnQgPSBuZXdQYXJlbnQ7XHJcbiAgICAgICAgICAgIGxlYWYucGFyZW50ID0gbmV3UGFyZW50O1xyXG4gICAgICAgICAgICB0aGlzLnJvb3QgPSBuZXdQYXJlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpbmRleCA9IGxlYWYucGFyZW50O1xyXG4gICAgICAgIHdoaWxlIChpbmRleCkge1xyXG4gICAgICAgICAgICBpbmRleCA9IHRoaXMucmViYWxhbmNlKGluZGV4KTtcclxuICAgICAgICAgICAgaW5kZXggPSBpbmRleC5wYXJlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsZWFmO1xyXG4gICAgfVxyXG4gICAgZ2V0Q29sbGlzaW9ucyhhYWJiLCBpZCkge1xyXG4gICAgICAgIGNvbnN0IGNvbHMgPSBbXTtcclxuICAgICAgICBjb25zdCBpdGVyID0gKF9ub2RlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghX25vZGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoX25vZGUuaWQgPT09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlzQ29sbGlkZShhYWJiLCBfbm9kZS5hYWJiKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKF9ub2RlLmlzTGVhZiAmJiAhX25vZGUuaXNDaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29scy5wdXNoKF9ub2RlLmlkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGl0ZXIoX25vZGUuY2hpbGQxKTtcclxuICAgICAgICAgICAgICAgIGl0ZXIoX25vZGUuY2hpbGQyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaXRlcih0aGlzLnJvb3QpO1xyXG4gICAgICAgIHJldHVybiBjb2xzO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlKGlkKSB7XHJcbiAgICAgICAgY29uc3QgbGVhZiA9IHRoaXMuZWxlbWVudHMuZ2V0KGlkKTtcclxuICAgICAgICBpZiAoIWxlYWYpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZiAobGVhZiA9PT0gdGhpcy5yb290KSB7XHJcbiAgICAgICAgICAgIHRoaXMucm9vdCA9IG51bGw7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcGFyZW50ID0gbGVhZi5wYXJlbnQ7XHJcbiAgICAgICAgY29uc3QgZ3JhbmRQYXJlbnQgPSBwYXJlbnQgPyBwYXJlbnQucGFyZW50IDogbnVsbDtcclxuICAgICAgICBsZXQgc2libGluZztcclxuICAgICAgICBpZiAocGFyZW50LmNoaWxkMSA9PT0gbGVhZilcclxuICAgICAgICAgICAgc2libGluZyA9IHBhcmVudC5jaGlsZDI7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBzaWJsaW5nID0gcGFyZW50LmNoaWxkMTtcclxuICAgICAgICBpZiAoZ3JhbmRQYXJlbnQpIHtcclxuICAgICAgICAgICAgaWYgKGdyYW5kUGFyZW50LmNoaWxkMSA9PT0gcGFyZW50KVxyXG4gICAgICAgICAgICAgICAgZ3JhbmRQYXJlbnQuY2hpbGQxID0gc2libGluZztcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgZ3JhbmRQYXJlbnQuY2hpbGQyID0gc2libGluZztcclxuICAgICAgICAgICAgc2libGluZy5wYXJlbnQgPSBncmFuZFBhcmVudDtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gZ3JhbmRQYXJlbnQ7XHJcbiAgICAgICAgICAgIHdoaWxlIChpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSB0aGlzLnJlYmFsYW5jZShpbmRleCk7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IGluZGV4LnBhcmVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yb290ID0gc2libGluZztcclxuICAgICAgICAgICAgc2libGluZy5wYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVsZW1lbnRzLmRlbGV0ZShpZCk7XHJcbiAgICB9XHJcbiAgICByZWJhbGFuY2UobGVhZikge1xyXG4gICAgICAgIGlmICghbGVhZikge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxlYWYuaXNMZWFmIHx8IHRoaXMuZ2V0SGVpZ2h0KGxlYWYpIDwgMikge1xyXG4gICAgICAgICAgICBsZWFmLmFhYmIgPSBnZXRCb3VuZEFhYmIobGVhZi5jaGlsZDEuYWFiYiwgbGVhZi5jaGlsZDIuYWFiYik7XHJcbiAgICAgICAgICAgIHJldHVybiBsZWFmO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjaGlsZDEgPSBsZWFmLmNoaWxkMTtcclxuICAgICAgICBjb25zdCBjaGlsZDIgPSBsZWFmLmNoaWxkMjtcclxuICAgICAgICBjb25zdCBiYWxhbmNlID0gdGhpcy5nZXRIZWlnaHQoY2hpbGQyKSAtIHRoaXMuZ2V0SGVpZ2h0KGNoaWxkMSk7XHJcbiAgICAgICAgaWYgKGJhbGFuY2UgPiAxKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkMkNoaWxkMSA9IGNoaWxkMi5jaGlsZDE7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkMkNoaWxkMiA9IGNoaWxkMi5jaGlsZDI7XHJcbiAgICAgICAgICAgIGNoaWxkMi5jaGlsZDEgPSBsZWFmO1xyXG4gICAgICAgICAgICBjaGlsZDIucGFyZW50ID0gbGVhZi5wYXJlbnQ7XHJcbiAgICAgICAgICAgIGxlYWYucGFyZW50ID0gY2hpbGQyO1xyXG4gICAgICAgICAgICBpZiAoY2hpbGQyLnBhcmVudCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQyLnBhcmVudC5jaGlsZDEgPT09IGxlYWYpIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZDIucGFyZW50LmNoaWxkMSA9IGNoaWxkMjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkMi5wYXJlbnQuY2hpbGQyID0gY2hpbGQyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMucm9vdCA9IGNoaWxkMjtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0SGVpZ2h0KGNoaWxkMkNoaWxkMSkgPiB0aGlzLmdldEhlaWdodChjaGlsZDJDaGlsZDIpKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZDIuY2hpbGQyID0gY2hpbGQyQ2hpbGQxO1xyXG4gICAgICAgICAgICAgICAgbGVhZi5jaGlsZDIgPSBjaGlsZDJDaGlsZDI7XHJcbiAgICAgICAgICAgICAgICBjaGlsZDJDaGlsZDIucGFyZW50ID0gbGVhZjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxlYWYuY2hpbGQyID0gY2hpbGQyQ2hpbGQxO1xyXG4gICAgICAgICAgICAgICAgY2hpbGQyQ2hpbGQxLnBhcmVudCA9IGxlYWY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGVhZi5hYWJiID0gZ2V0Qm91bmRBYWJiKGxlYWYuY2hpbGQxLmFhYmIsIGxlYWYuY2hpbGQyLmFhYmIpO1xyXG4gICAgICAgICAgICBjaGlsZDIuYWFiYiA9IGdldEJvdW5kQWFiYihjaGlsZDIuY2hpbGQxLmFhYmIsIGNoaWxkMi5jaGlsZDIuYWFiYik7XHJcbiAgICAgICAgICAgIHJldHVybiBjaGlsZDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChiYWxhbmNlIDwgLTEpIHtcclxuICAgICAgICAgICAgY29uc3QgY2hpbGQxQ2hpbGQxID0gY2hpbGQxLmNoaWxkMTtcclxuICAgICAgICAgICAgY29uc3QgY2hpbGQxQ2hpbGQyID0gY2hpbGQxLmNoaWxkMjtcclxuICAgICAgICAgICAgY2hpbGQxLmNoaWxkMSA9IGxlYWY7XHJcbiAgICAgICAgICAgIGNoaWxkMS5wYXJlbnQgPSBsZWFmLnBhcmVudDtcclxuICAgICAgICAgICAgbGVhZi5wYXJlbnQgPSBjaGlsZDE7XHJcbiAgICAgICAgICAgIGlmIChjaGlsZDEucGFyZW50ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjaGlsZDEucGFyZW50LmNoaWxkMSA9PT0gbGVhZikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkMS5wYXJlbnQuY2hpbGQxID0gY2hpbGQxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQxLnBhcmVudC5jaGlsZDIgPSBjaGlsZDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5yb290ID0gY2hpbGQxO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nZXRIZWlnaHQoY2hpbGQxQ2hpbGQxKSA+IHRoaXMuZ2V0SGVpZ2h0KGNoaWxkMUNoaWxkMikpIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkMS5jaGlsZDIgPSBjaGlsZDFDaGlsZDE7XHJcbiAgICAgICAgICAgICAgICBsZWFmLmNoaWxkMSA9IGNoaWxkMUNoaWxkMjtcclxuICAgICAgICAgICAgICAgIGNoaWxkMUNoaWxkMi5wYXJlbnQgPSBsZWFmO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2hpbGQxLmNoaWxkMiA9IGNoaWxkMUNoaWxkMjtcclxuICAgICAgICAgICAgICAgIGxlYWYuY2hpbGQxID0gY2hpbGQxQ2hpbGQxO1xyXG4gICAgICAgICAgICAgICAgY2hpbGQxQ2hpbGQxLnBhcmVudCA9IGxlYWY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGVhZi5hYWJiID0gZ2V0Qm91bmRBYWJiKGxlYWYuY2hpbGQxLmFhYmIsIGxlYWYuY2hpbGQyLmFhYmIpO1xyXG4gICAgICAgICAgICBjaGlsZDEuYWFiYiA9IGdldEJvdW5kQWFiYihjaGlsZDEuY2hpbGQxLmFhYmIsIGNoaWxkMS5jaGlsZDIuYWFiYik7XHJcbiAgICAgICAgICAgIHJldHVybiBjaGlsZDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxlYWYuYWFiYiA9IGdldEJvdW5kQWFiYihsZWFmLmNoaWxkMS5hYWJiLCBsZWFmLmNoaWxkMi5hYWJiKTtcclxuICAgICAgICByZXR1cm4gbGVhZjtcclxuICAgIH1cclxuICAgIHRvQXJyYXkobm9kZSkge1xyXG4gICAgICAgIGNvbnN0IGl0ZXIgPSAobGVhZikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWxlYWYpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChsZWFmLmlzTGVhZilcclxuICAgICAgICAgICAgICAgIHJldHVybiBsZWFmLmlkO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW2l0ZXIobGVhZi5jaGlsZDEpLCBpdGVyKGxlYWYuY2hpbGQyKV07XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAoIW5vZGUpXHJcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLnJvb3Q7XHJcbiAgICAgICAgcmV0dXJuIGl0ZXIobm9kZSk7XHJcbiAgICB9XHJcbiAgICAvKmdldEhlaWdodChsZWFmKSB7XHJcbiAgICAgIGNvbnN0IGl0ZXIgPSAobGVhZiwgbGV2ZWwpID0+IHtcclxuICAgICAgICBpZiAoIWxlYWYpIHtcclxuICAgICAgICAgIHJldHVybiBsZXZlbDtcclxuICAgICAgICB9XHJcbiAgXHJcbiAgICAgICAgbGV0IGgxID0gaXRlcihsZWFmLmNoaWxkMSwgbGV2ZWwgKyAxKTtcclxuICAgICAgICBsZXQgaDIgPSBpdGVyKGxlYWYuY2hpbGQyLCBsZXZlbCArIDEpO1xyXG4gICAgICAgIHJldHVybiBoMSA+IGgyID8gaDEgOiBoMjtcclxuICAgICAgfTtcclxuICAgICAgcmV0dXJuIGl0ZXIobGVhZiwgMSk7XHJcbiAgICB9Ki9cclxuICAgIGdldEhlaWdodChyb290KSB7XHJcbiAgICAgICAgaWYgKCFyb290KVxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICBsZXQgaGVpZ2h0ID0gMDtcclxuICAgICAgICBjb25zdCBxdWV1ZSA9IFtyb290XTtcclxuICAgICAgICB3aGlsZSAocXVldWUubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgaGVpZ2h0ICs9IDE7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvdW50ID0gcXVldWUubGVuZ3RoO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRtcCA9IHF1ZXVlLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRtcC5jaGlsZDEpXHJcbiAgICAgICAgICAgICAgICAgICAgcXVldWUucHVzaCh0bXAuY2hpbGQxKTtcclxuICAgICAgICAgICAgICAgIGlmICh0bXAuY2hpbGQyKVxyXG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlLnB1c2godG1wLmNoaWxkMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGhlaWdodDtcclxuICAgIH1cclxuICAgIGdldE5vZGVzKCkge1xyXG4gICAgICAgIGNvbnN0IGl0ZXIgPSAobm9kZSwgYXJyKSA9PiB7XHJcbiAgICAgICAgICAgIGFyci5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgICBpZiAobm9kZS5jaGlsZDEpXHJcbiAgICAgICAgICAgICAgICBpdGVyKG5vZGUuY2hpbGQxLCBhcnIpO1xyXG4gICAgICAgICAgICBpZiAobm9kZS5jaGlsZDIpXHJcbiAgICAgICAgICAgICAgICBpdGVyKG5vZGUuY2hpbGQyLCBhcnIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgYSA9IFtdO1xyXG4gICAgICAgIGl0ZXIodGhpcy5yb290LCBhKTtcclxuICAgICAgICByZXR1cm4gYTtcclxuICAgIH1cclxufVxyXG4iLCJjb25zdCBpc0luc2lkZSA9IChwMSwgcDIsIHEpID0+IHtcclxuICAgIGNvbnN0IFIgPSAocDJbMF0gLSBwMVswXSkgKiAocVsxXSAtIHAxWzFdKSAtIChwMlsxXSAtIHAxWzFdKSAqIChxWzBdIC0gcDFbMF0pO1xyXG4gICAgcmV0dXJuIFIgPD0gMCArIDAuMDAxO1xyXG59O1xyXG5jb25zdCBkb3QgPSAoYSwgYikgPT4gYVswXSAqIGJbMF0gKyBhWzFdICogYlsxXTtcclxuY29uc3QgaXNJbkNsb2Nrd2lzZSA9IChwb2ludHMpID0+IHtcclxuICAgIGlmIChwb2ludHMubGVuZ3RoIDwgMylcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIGNvbnN0IFtwMSwgcDIsIHAzXSA9IHBvaW50cztcclxuICAgIGNvbnN0IGRldCA9IHAyWzBdICogcDNbMV0gK1xyXG4gICAgICAgIHAzWzBdICogcDFbMV0gK1xyXG4gICAgICAgIHAxWzBdICogcDJbMV0gLVxyXG4gICAgICAgIHAxWzBdICogcDFbMV0gLVxyXG4gICAgICAgIHAzWzBdICogcDJbMV0gLVxyXG4gICAgICAgIHAxWzBdICogcDNbMV07XHJcbiAgICBpZiAoZGV0IDwgMClcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIHJldHVybiAtMTtcclxufTtcclxuY29uc3QgY29tcHV0ZUludGVyc2VjdGlvbiA9IChwMSwgcDIsIHAzLCBwNCkgPT4ge1xyXG4gICAgaWYgKHAyWzBdIC0gcDFbMF0gPT09IDApIHtcclxuICAgICAgICBjb25zdCB4ID0gcDFbMF07XHJcbiAgICAgICAgY29uc3QgbTIgPSAocDRbMV0gLSBwM1sxXSkgLyAocDRbMF0gLSBwM1swXSk7XHJcbiAgICAgICAgY29uc3QgYjIgPSBwM1sxXSAtIG0yICogcDNbMF07XHJcbiAgICAgICAgY29uc3QgeSA9IG0yICogeCArIGIyO1xyXG4gICAgICAgIHJldHVybiBbeCwgeV07XHJcbiAgICB9XHJcbiAgICBpZiAocDRbMF0gLSBwM1swXSA9PT0gMCkge1xyXG4gICAgICAgIGNvbnN0IHggPSBwM1swXTtcclxuICAgICAgICBjb25zdCBtMSA9IChwMlsxXSAtIHAxWzFdKSAvIChwMlswXSAtIHAxWzBdKTtcclxuICAgICAgICBjb25zdCBiMSA9IHAxWzFdIC0gbTEgKiBwMVswXTtcclxuICAgICAgICBjb25zdCB5ID0gbTEgKiB4ICsgYjE7XHJcbiAgICAgICAgcmV0dXJuIFt4LCB5XTtcclxuICAgIH1cclxuICAgIGNvbnN0IG0xID0gKHAyWzFdIC0gcDFbMV0pIC8gKHAyWzBdIC0gcDFbMF0pO1xyXG4gICAgY29uc3QgYjEgPSBwMVsxXSAtIG0xICogcDFbMF07XHJcbiAgICBjb25zdCBtMiA9IChwNFsxXSAtIHAzWzFdKSAvIChwNFswXSAtIHAzWzBdKTtcclxuICAgIGNvbnN0IGIyID0gcDNbMV0gLSBtMiAqIHAzWzBdO1xyXG4gICAgY29uc3QgeCA9IChiMiAtIGIxKSAvIChtMSAtIG0yKTtcclxuICAgIGNvbnN0IHkgPSBtMSAqIHggKyBiMTtcclxuICAgIHJldHVybiBbeCwgeV07XHJcbn07XHJcbmNvbnN0IGNsaXBQb2x5VnNQb2x5ID0gKEEsIEIpID0+IHtcclxuICAgIGxldCByZXN1bHQgPSBbLi4uQV07XHJcbiAgICBmb3IgKGxldCBpID0gMCwgbiA9IEIubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgbmV4dCA9IFsuLi5yZXN1bHRdO1xyXG4gICAgICAgIHJlc3VsdCA9IFtdO1xyXG4gICAgICAgIGNvbnN0IGFFZGdlMSA9IEIuYXQoaSAtIDEpO1xyXG4gICAgICAgIGNvbnN0IGFFZGdlMiA9IEIuYXQoaSk7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDAsIF9uID0gbmV4dC5sZW5ndGg7IGogPCBfbjsgaisrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJFZGdlMSA9IG5leHQuYXQoaiAtIDEpO1xyXG4gICAgICAgICAgICBjb25zdCBiRWRnZTIgPSBuZXh0LmF0KGopO1xyXG4gICAgICAgICAgICBpZiAoaXNJbnNpZGUoYUVkZ2UxLCBhRWRnZTIsIGJFZGdlMikpIHtcclxuICAgICAgICAgICAgICAgIGlmICghaXNJbnNpZGUoYUVkZ2UxLCBhRWRnZTIsIGJFZGdlMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbnRlcnNlY3Rpb24gPSBjb21wdXRlSW50ZXJzZWN0aW9uKGJFZGdlMSwgYkVkZ2UyLCBhRWRnZTEsIGFFZGdlMik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goaW50ZXJzZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGJFZGdlMik7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaXNJbnNpZGUoYUVkZ2UxLCBhRWRnZTIsIGJFZGdlMSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGludGVyc2VjdGlvbiA9IGNvbXB1dGVJbnRlcnNlY3Rpb24oYkVkZ2UxLCBiRWRnZTIsIGFFZGdlMSwgYUVkZ2UyKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGludGVyc2VjdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5jb25zdCBsZXJwID0gKGEsIGIsIHQpID0+IGEgKyAoYiAtIGEpICogdDtcclxuY29uc3QgY2xpcFNlZ21lbnRWc1NlZ21lbnQgPSAoczEsIHMyKSA9PiB7XHJcbiAgICBjb25zdCBbcDEsIHAyXSA9IHMxO1xyXG4gICAgY29uc3QgW3AzLCBwNF0gPSBzMjtcclxuICAgIGNvbnN0IHRvcCA9IChwNFswXSAtIHAzWzBdKSAqIChwMVsxXSAtIHAzWzFdKSAtIChwNFsxXSAtIHAzWzFdKSAqIChwMVswXSAtIHAzWzBdKTtcclxuICAgIGNvbnN0IGJvdHRvbSA9IChwNFsxXSAtIHAzWzFdKSAqIChwMlswXSAtIHAxWzBdKSAtIChwNFswXSAtIHAzWzBdKSAqIChwMlsxXSAtIHAxWzFdKTtcclxuICAgIGlmICghYm90dG9tKVxyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIGNvbnN0IHQgPSB0b3AgLyBib3R0b207XHJcbiAgICBpZiAodCA8IDAgfHwgdCA+IDEpXHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgcmV0dXJuIFtbbGVycChwMVswXSwgcDJbMF0sIHQpLCBsZXJwKHAxWzFdLCBwMlsxXSwgdCldXTtcclxufTtcclxuY29uc3QgY2xpcFBvaW50VnNQb2x5ID0gKHBvaW50LCB2ZXJ0aWNlcykgPT4ge1xyXG4gICAgY29uc3QgeCA9IHBvaW50WzBdO1xyXG4gICAgY29uc3QgeSA9IHBvaW50WzFdO1xyXG4gICAgbGV0IGluc2lkZSA9IGZhbHNlO1xyXG4gICAgZm9yIChsZXQgaSA9IDAsIGogPSB2ZXJ0aWNlcy5sZW5ndGggLSAxOyBpIDwgdmVydGljZXMubGVuZ3RoOyBqID0gaSsrKSB7XHJcbiAgICAgICAgY29uc3QgeGkgPSB2ZXJ0aWNlc1tpXVswXSwgeWkgPSB2ZXJ0aWNlc1tpXVsxXTtcclxuICAgICAgICBjb25zdCB4aiA9IHZlcnRpY2VzW2pdWzBdLCB5aiA9IHZlcnRpY2VzW2pdWzFdO1xyXG4gICAgICAgIGNvbnN0IGludGVyc2VjdCA9IHlpID4geSAhPSB5aiA+IHkgJiYgeCA8ICgoeGogLSB4aSkgKiAoeSAtIHlpKSkgLyAoeWogLSB5aSkgKyB4aTtcclxuICAgICAgICBpZiAoaW50ZXJzZWN0KVxyXG4gICAgICAgICAgICBpbnNpZGUgPSAhaW5zaWRlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFtwb2ludF07XHJcbn07XHJcbmNvbnN0IGNsaXBTZWdtZW50VnNQb2x5ID0gKHNlZ21lbnQsIHBvbHkpID0+IHtcclxuICAgIGNvbnN0IFtwMSwgcDJdID0gc2VnbWVudDtcclxuICAgIGNvbnN0IHBvaW50cyA9IFtdO1xyXG4gICAgaWYgKGNsaXBQb2ludFZzUG9seShwMSwgcG9seSkpXHJcbiAgICAgICAgcG9pbnRzLnB1c2gocDEpO1xyXG4gICAgaWYgKGNsaXBQb2ludFZzUG9seShwMiwgcG9seSkpXHJcbiAgICAgICAgcG9pbnRzLnB1c2gocDIpO1xyXG4gICAgaWYgKHBvaW50cy5sZW5ndGggPiAxKVxyXG4gICAgICAgIHJldHVybiBwb2ludHM7XHJcbiAgICBmb3IgKGxldCBpID0gMCwgbiA9IHBvbHkubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgcTEgPSBwb2x5LmF0KGkgLSAxKTtcclxuICAgICAgICBjb25zdCBxMiA9IHBvbHkuYXQoaSk7XHJcbiAgICAgICAgY29uc3QgaW50ZXJzZWN0aW9uID0gY2xpcFNlZ21lbnRWc1NlZ21lbnQoW3AxLCBwMl0sIFtxMSwgcTJdKTtcclxuICAgICAgICBpZiAoaW50ZXJzZWN0aW9uLmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKGludGVyc2VjdGlvblswXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcG9pbnRzO1xyXG59O1xyXG5jb25zdCBwYWlySGFzaCA9ICh4LCB5KSA9PiB4ID09PSBNYXRoLm1heCh4LCB5KSA/IHggKiB4ICsgeSArIHggOiB5ICogeCArIHk7XHJcbmNvbnN0IFBPTFkgPSAzO1xyXG5jb25zdCBTRUdNRU5UID0gMjtcclxuY29uc3QgUE9JTlQgPSAxO1xyXG5jb25zdCBmYWNlVHlwZU1hcCA9IHt9O1xyXG5mYWNlVHlwZU1hcFtwYWlySGFzaChQT0xZLCBQT0xZKV0gPSBjbGlwUG9seVZzUG9seTtcclxuZmFjZVR5cGVNYXBbcGFpckhhc2goU0VHTUVOVCwgUE9MWSldID0gY2xpcFNlZ21lbnRWc1BvbHk7XHJcbmZhY2VUeXBlTWFwW3BhaXJIYXNoKFNFR01FTlQsIFNFR01FTlQpXSA9IGNsaXBTZWdtZW50VnNTZWdtZW50O1xyXG5mYWNlVHlwZU1hcFtwYWlySGFzaChQT0lOVCwgUE9MWSldID0gKGZhY2UxLCBmYWNlMikgPT4gY2xpcFBvaW50VnNQb2x5KGZhY2UxWzBdLCBmYWNlMik7XHJcbmZ1bmN0aW9uIGNsaXBGYWNlVnNGYWNlKGZhY2UxLCBmYWNlMikge1xyXG4gICAgY29uc3QgdHlwZTEgPSBNYXRoLm1pbihmYWNlMS5sZW5ndGgsIFBPTFkpO1xyXG4gICAgY29uc3QgdHlwZTIgPSBNYXRoLm1pbihmYWNlMi5sZW5ndGgsIFBPTFkpO1xyXG4gICAgbGV0IGFyZ3MgPSBbZmFjZTEsIGZhY2UyXTtcclxuICAgIGlmICh0eXBlMSA+IHR5cGUyKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhY2VUeXBlTWFwW3BhaXJIYXNoKHR5cGUyLCB0eXBlMSldKGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzBdKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWNlVHlwZU1hcFtwYWlySGFzaCh0eXBlMSwgdHlwZTIpXShhcmd1bWVudHNbMF0sIGFyZ3VtZW50c1sxXSk7XHJcbn1cclxuZXhwb3J0IHsgY2xpcFNlZ21lbnRWc1NlZ21lbnQsIGlzSW5zaWRlLCBjb21wdXRlSW50ZXJzZWN0aW9uLCBjbGlwUG9seVZzUG9seSwgY2xpcEZhY2VWc0ZhY2UsIGlzSW5DbG9ja3dpc2UsIGNsaXBTZWdtZW50VnNQb2x5LCBjbGlwUG9pbnRWc1BvbHksIH07XHJcbiIsImNvbnN0IGNvbmZpZyA9IHtcclxuICAgIFJJR0lEX0JPRFlfTU9WRV9UUkVTSE9MRDogMC4wMDUsXHJcbiAgICBSSUdJRF9CT0RZX0FBQkJfQklBUzogMC4xMSxcclxuICAgIENMSVBfQklBUzogMC4wMDEsXHJcbiAgICBHSktfTUFYX0lURVJBVElPTlNfTlVNOiA2NCxcclxuICAgIEVQQV9CSUFTOiAwLjAwMDAxLFxyXG4gICAgQ09OVEFDVF9CSUFTOiAwLjEyNSxcclxuICAgIENPTlRBQ1RfVFJFU0hPTEQ6IDAuMDUsXHJcbiAgICBDT05UQUNUX01BTklGT0xEX0tFRVBfVFJFU0hPTEQ6IDAuMDAxLFxyXG4gICAgU09MVkVSX0lURVJBVElPTlNfTlVNOiAxOCxcclxuICAgIFVTRV9DT05UQUNUX0NBQ0hFOiB0cnVlXHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcclxuIiwiaW1wb3J0IHsgdjMsIG0zIH0gZnJvbSBcInJvbWFucHBwbWF0aFwiO1xyXG5pbXBvcnQgeyBjbGlwRmFjZVZzRmFjZSwgaXNJbkNsb2Nrd2lzZSB9IGZyb20gXCIuL2NsaXBwaW5nXCI7XHJcbmNvbnN0IHsgZG90LCBjcm9zcywgbm9ybWFsaXplLCBzdW0sIGRpZmYsIHNjYWxlLCBpc051bGwsIG5vcm0gfSA9IHYzO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5jb25zdCB7IENMSVBfQklBUywgR0pLX01BWF9JVEVSQVRJT05TX05VTSwgRVBBX0JJQVMgfSA9IGNvbmZpZztcclxuY29uc3QgcmF5VnNQbGFuZUludGVyc2VjID0gKHBsYW5lLCBwb2ludCwgZGlyZWN0aW9uKSA9PiB7XHJcbiAgICBjb25zdCBbb3JpZ2luLCBub3JtYWxdID0gcGxhbmU7XHJcbiAgICBjb25zdCBfZG90ID0gZG90KG5vcm1hbCwgZGlyZWN0aW9uKTtcclxuICAgIGNvbnN0IGZyb21Qb2ludFRvT3JpZ2luID0gZGlmZihwb2ludCwgb3JpZ2luKTtcclxuICAgIGNvbnN0IGZhYyA9IGRvdChmcm9tUG9pbnRUb09yaWdpbiwgbm9ybWFsKSAvIF9kb3Q7XHJcbiAgICByZXR1cm4gZGlmZihwb2ludCwgc2NhbGUoZGlyZWN0aW9uLCBmYWMpKTtcclxufTtcclxuY29uc3QgaXNQb2ludEJlaGluZFBsYW5lID0gKHBsYW5lLCBwb2ludCwgc2lnbiA9IDEpID0+IHtcclxuICAgIGNvbnN0IFtvcmlnaW4sIG5vcm1hbF0gPSBwbGFuZTtcclxuICAgIGxldCBfZCA9IGRvdChub3JtYWwsIGRpZmYocG9pbnQsIG9yaWdpbikpICogc2lnbjtcclxuICAgIHJldHVybiBfZCA+IDAgLSBDTElQX0JJQVM7XHJcbn07XHJcbmNvbnN0IHBvaW50T25QbGFuZVByb2plY3Rpb24gPSAocGxhbmUsIHBvaW50KSA9PiB7XHJcbiAgICBjb25zdCBbb3JpZ2luLCBub3JtYWxdID0gcGxhbmU7XHJcbiAgICBjb25zdCBmcm9tUG9pbnRUb09yaWdpbiA9IGRpZmYocG9pbnQsIG9yaWdpbik7XHJcbiAgICBjb25zdCBwcm9qQWxvbmdOb3JtYWwgPSBkb3Qobm9ybWFsLCBmcm9tUG9pbnRUb09yaWdpbik7XHJcbiAgICByZXR1cm4gZGlmZihwb2ludCwgc2NhbGUobm9ybWFsLCBwcm9qQWxvbmdOb3JtYWwpKTtcclxufTtcclxuY29uc3QgY2xpcFBvaW50c0JlaGluZFBsYW5lID0gKHBsYW5lLCBwb2ludHMsIHNpZ24gPSAxKSA9PiB7XHJcbiAgICBjb25zdCBbb3JpZ2luLCBub3JtYWxdID0gcGxhbmU7XHJcbiAgICByZXR1cm4gcG9pbnRzLmZpbHRlcigocG9pbnQpID0+IGRvdChub3JtYWwsIGRpZmYocG9pbnQsIG9yaWdpbikpICogc2lnbiArIENMSVBfQklBUyA+IDApO1xyXG59O1xyXG5jb25zdCBnZXQyRGNvb3Jkc09uUGxhbmUgPSAoaSwgaiwgcG9pbnQpID0+IHtcclxuICAgIHJldHVybiBbZG90KGksIHBvaW50KSwgZG90KGosIHBvaW50KV07XHJcbn07XHJcbmZ1bmN0aW9uIHVwZGF0ZV9zaW1wbGV4Myhwcm9wcykge1xyXG4gICAgY29uc3QgbiA9IGNyb3NzKGRpZmYocHJvcHMuYiwgcHJvcHMuYSksIGRpZmYocHJvcHMuYywgcHJvcHMuYSkpO1xyXG4gICAgY29uc3QgQU8gPSBzY2FsZShwcm9wcy5hLCAtMSk7XHJcbiAgICBwcm9wcy5zaW1wX2RpbSA9IDI7XHJcbiAgICBpZiAoZG90KGNyb3NzKGRpZmYocHJvcHMuYiwgcHJvcHMuYSksIG4pLCBBTykgPiAwKSB7XHJcbiAgICAgICAgcHJvcHMuYyA9IHByb3BzLmE7XHJcbiAgICAgICAgcHJvcHMuc2VhcmNoX2RpciA9IGNyb3NzKGNyb3NzKGRpZmYocHJvcHMuYiwgcHJvcHMuYSksIEFPKSwgZGlmZihwcm9wcy5iLCBwcm9wcy5hKSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKGRvdChjcm9zcyhuLCBkaWZmKHByb3BzLmMsIHByb3BzLmEpKSwgQU8pID4gMCkge1xyXG4gICAgICAgIHByb3BzLmIgPSBwcm9wcy5hO1xyXG4gICAgICAgIHByb3BzLnNlYXJjaF9kaXIgPSBjcm9zcyhjcm9zcyhkaWZmKHByb3BzLmMsIHByb3BzLmEpLCBBTyksIGRpZmYocHJvcHMuYywgcHJvcHMuYSkpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHByb3BzLnNpbXBfZGltID0gMztcclxuICAgIGlmIChkb3QobiwgQU8pID4gMCkge1xyXG4gICAgICAgIHByb3BzLmQgPSBwcm9wcy5jO1xyXG4gICAgICAgIHByb3BzLmMgPSBwcm9wcy5iO1xyXG4gICAgICAgIHByb3BzLmIgPSBwcm9wcy5hO1xyXG4gICAgICAgIHByb3BzLnNlYXJjaF9kaXIgPSBuO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHByb3BzLmQgPSBwcm9wcy5iO1xyXG4gICAgcHJvcHMuYiA9IHByb3BzLmE7XHJcbiAgICBwcm9wcy5zZWFyY2hfZGlyID0gc2NhbGUobiwgLTEpO1xyXG4gICAgcmV0dXJuO1xyXG59XHJcbmZ1bmN0aW9uIHVwZGF0ZV9zaW1wbGV4NChwcm9wcykge1xyXG4gICAgY29uc3QgQUJDID0gY3Jvc3MoZGlmZihwcm9wcy5iLCBwcm9wcy5hKSwgZGlmZihwcm9wcy5jLCBwcm9wcy5hKSk7XHJcbiAgICBjb25zdCBBQ0QgPSBjcm9zcyhkaWZmKHByb3BzLmMsIHByb3BzLmEpLCBkaWZmKHByb3BzLmQsIHByb3BzLmEpKTtcclxuICAgIGNvbnN0IEFEQiA9IGNyb3NzKGRpZmYocHJvcHMuZCwgcHJvcHMuYSksIGRpZmYocHJvcHMuYiwgcHJvcHMuYSkpO1xyXG4gICAgY29uc3QgQU8gPSBzY2FsZShwcm9wcy5hLCAtMSk7XHJcbiAgICBwcm9wcy5zaW1wX2RpbSA9IDM7XHJcbiAgICBpZiAoZG90KEFCQywgQU8pID4gMCkge1xyXG4gICAgICAgIHByb3BzLmQgPSBwcm9wcy5jO1xyXG4gICAgICAgIHByb3BzLmMgPSBwcm9wcy5iO1xyXG4gICAgICAgIHByb3BzLmIgPSBwcm9wcy5hO1xyXG4gICAgICAgIHByb3BzLnNlYXJjaF9kaXIgPSBBQkM7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGRvdChBQ0QsIEFPKSA+IDApIHtcclxuICAgICAgICBwcm9wcy5iID0gcHJvcHMuYTtcclxuICAgICAgICBwcm9wcy5zZWFyY2hfZGlyID0gQUNEO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChkb3QoQURCLCBBTykgPiAwKSB7XHJcbiAgICAgICAgcHJvcHMuYyA9IHByb3BzLmQ7XHJcbiAgICAgICAgcHJvcHMuZCA9IHByb3BzLmI7XHJcbiAgICAgICAgcHJvcHMuYiA9IHByb3BzLmE7XHJcbiAgICAgICAgcHJvcHMuc2VhcmNoX2RpciA9IEFEQjtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5mdW5jdGlvbiBnamsoY29sbDEsIGNvbGwyKSB7XHJcbiAgICBjb25zdCBwcm9wcyA9IHtcclxuICAgICAgICBhOiBbMCwgMCwgMF0sXHJcbiAgICAgICAgYjogWzAsIDAsIDBdLFxyXG4gICAgICAgIGM6IFswLCAwLCAwXSxcclxuICAgICAgICBkOiBbMCwgMCwgMF0sXHJcbiAgICAgICAgc2VhcmNoX2RpcjogWzAsIDAsIDBdLFxyXG4gICAgICAgIHNpbXBfZGltOiAwLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IG9yaWdpbnNNYXAgPSBuZXcgTWFwKCk7XHJcbiAgICBsZXQgbXR2ID0gWzAsIDAsIDBdO1xyXG4gICAgcHJvcHMuc2VhcmNoX2RpciA9IGRpZmYoY29sbDEucG9zLCBjb2xsMi5wb3MpO1xyXG4gICAgY29uc3QgY19vcmlnaW4xID0gY29sbDEuc3VwcG9ydChzY2FsZShwcm9wcy5zZWFyY2hfZGlyLCAtMSkpO1xyXG4gICAgY29uc3QgY19vcmlnaW4yID0gY29sbDIuc3VwcG9ydChwcm9wcy5zZWFyY2hfZGlyKTtcclxuICAgIHByb3BzLmMgPSBkaWZmKGNfb3JpZ2luMiwgY19vcmlnaW4xKTtcclxuICAgIG9yaWdpbnNNYXAuc2V0KHByb3BzLmMsIFtjX29yaWdpbjEsIGNfb3JpZ2luMl0pO1xyXG4gICAgcHJvcHMuc2VhcmNoX2RpciA9IHNjYWxlKHByb3BzLmMsIC0xKTtcclxuICAgIGNvbnN0IGJfb3JpZ2luMSA9IGNvbGwxLnN1cHBvcnQoc2NhbGUocHJvcHMuc2VhcmNoX2RpciwgLTEpKTtcclxuICAgIGNvbnN0IGJfb3JpZ2luMiA9IGNvbGwyLnN1cHBvcnQocHJvcHMuc2VhcmNoX2Rpcik7XHJcbiAgICBwcm9wcy5iID0gZGlmZihiX29yaWdpbjIsIGJfb3JpZ2luMSk7XHJcbiAgICBvcmlnaW5zTWFwLnNldChwcm9wcy5iLCBbYl9vcmlnaW4xLCBiX29yaWdpbjJdKTtcclxuICAgIGlmIChkb3QocHJvcHMuYiwgcHJvcHMuc2VhcmNoX2RpcikgPCAwKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBwcm9wcy5zZWFyY2hfZGlyID0gY3Jvc3MoY3Jvc3MoZGlmZihwcm9wcy5jLCBwcm9wcy5iKSwgc2NhbGUocHJvcHMuYiwgLTEpKSwgZGlmZihwcm9wcy5jLCBwcm9wcy5iKSk7XHJcbiAgICBpZiAoaXNOdWxsKHByb3BzLnNlYXJjaF9kaXIpKSB7XHJcbiAgICAgICAgcHJvcHMuc2VhcmNoX2RpciA9IGNyb3NzKGRpZmYocHJvcHMuYywgcHJvcHMuYiksIFsxLCAwLCAwXSk7XHJcbiAgICAgICAgaWYgKGlzTnVsbChwcm9wcy5zZWFyY2hfZGlyKSkge1xyXG4gICAgICAgICAgICBwcm9wcy5zZWFyY2hfZGlyID0gY3Jvc3MoZGlmZihwcm9wcy5jLCBwcm9wcy5iKSwgWzAsIDAsIC0xXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvcHMuc2ltcF9kaW0gPSAyO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHSktfTUFYX0lURVJBVElPTlNfTlVNOyArK2kpIHtcclxuICAgICAgICBjb25zdCBhX29yaWdpbjEgPSBjb2xsMS5zdXBwb3J0KHNjYWxlKHByb3BzLnNlYXJjaF9kaXIsIC0xKSk7XHJcbiAgICAgICAgY29uc3QgYV9vcmlnaW4yID0gY29sbDIuc3VwcG9ydChwcm9wcy5zZWFyY2hfZGlyKTtcclxuICAgICAgICBwcm9wcy5hID0gZGlmZihhX29yaWdpbjIsIGFfb3JpZ2luMSk7XHJcbiAgICAgICAgb3JpZ2luc01hcC5zZXQocHJvcHMuYSwgW2Ffb3JpZ2luMSwgYV9vcmlnaW4yXSk7XHJcbiAgICAgICAgaWYgKGRvdChwcm9wcy5hLCBwcm9wcy5zZWFyY2hfZGlyKSA8IDApXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIHByb3BzLnNpbXBfZGltKys7XHJcbiAgICAgICAgaWYgKHByb3BzLnNpbXBfZGltID09PSAzKSB7XHJcbiAgICAgICAgICAgIHVwZGF0ZV9zaW1wbGV4Myhwcm9wcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHVwZGF0ZV9zaW1wbGV4NChwcm9wcykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIEVQQShwcm9wcy5hLCBwcm9wcy5iLCBwcm9wcy5jLCBwcm9wcy5kLCBvcmlnaW5zTWFwLCBjb2xsMSwgY29sbDIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59XHJcbmNvbnN0IGJhcmljZW50cmljID0gKGZhY2UsIHBvaW50KSA9PiB7XHJcbiAgICBsZXQgYTExID0gZmFjZVswXVswXTtcclxuICAgIGxldCBhMTIgPSBmYWNlWzFdWzBdO1xyXG4gICAgbGV0IGExMyA9IGZhY2VbMl1bMF07XHJcbiAgICBsZXQgYjEgPSBwb2ludFswXTtcclxuICAgIGxldCBhMjEgPSBmYWNlWzBdWzFdO1xyXG4gICAgbGV0IGEyMiA9IGZhY2VbMV1bMV07XHJcbiAgICBsZXQgYTIzID0gZmFjZVsyXVsxXTtcclxuICAgIGxldCBiMiA9IHBvaW50WzFdO1xyXG4gICAgbGV0IGEzMSA9IGZhY2VbMF1bMl07XHJcbiAgICBsZXQgYTMyID0gZmFjZVsxXVsyXTtcclxuICAgIGxldCBhMzMgPSBmYWNlWzJdWzJdO1xyXG4gICAgbGV0IGIzID0gcG9pbnRbMl07XHJcbiAgICBjb25zdCBkID0gYTExICogYTIyICogYTMzICtcclxuICAgICAgICBhMjEgKiBhMzIgKiBhMTMgK1xyXG4gICAgICAgIGExMiAqIGEyMyAqIGEzMSAtXHJcbiAgICAgICAgYTEzICogYTIyICogYTMxIC1cclxuICAgICAgICBhMjEgKiBhMTIgKiBhMzMgLVxyXG4gICAgICAgIGEzMiAqIGEyMyAqIGExMTtcclxuICAgIGNvbnN0IGQxID0gYjEgKiBhMjIgKiBhMzMgK1xyXG4gICAgICAgIGIyICogYTMyICogYTEzICtcclxuICAgICAgICBhMTIgKiBhMjMgKiBiMyAtXHJcbiAgICAgICAgYTEzICogYTIyICogYjMgLVxyXG4gICAgICAgIGIyICogYTEyICogYTMzIC1cclxuICAgICAgICBhMzIgKiBhMjMgKiBiMTtcclxuICAgIGNvbnN0IGQyID0gYTExICogYjIgKiBhMzMgK1xyXG4gICAgICAgIGEyMSAqIGIzICogYTEzICtcclxuICAgICAgICBiMSAqIGEyMyAqIGEzMSAtXHJcbiAgICAgICAgYTEzICogYjIgKiBhMzEgLVxyXG4gICAgICAgIGExMSAqIGIzICogYTIzIC1cclxuICAgICAgICBhMjEgKiBiMSAqIGEzMztcclxuICAgIGNvbnN0IGQzID0gYTExICogYTIyICogYjMgK1xyXG4gICAgICAgIGEyMSAqIGEzMiAqIGIxICtcclxuICAgICAgICBhMTIgKiBiMiAqIGEzMSAtXHJcbiAgICAgICAgYjEgKiBhMjIgKiBhMzEgLVxyXG4gICAgICAgIGEyMSAqIGExMiAqIGIzIC1cclxuICAgICAgICBiMiAqIGEzMiAqIGExMTtcclxuICAgIHJldHVybiBbZDEgLyBkLCBkMiAvIGQsIGQzIC8gZF07XHJcbn07XHJcbmNvbnN0IG9yaWdpblRvRmFjZVByb2ogPSAoZmFjZSkgPT4ge1xyXG4gICAgY29uc3Qgbm9ybWFsID0gZmFjZVszXTtcclxuICAgIGNvbnN0IHBvaW50ID0gZmFjZVswXTtcclxuICAgIGNvbnN0IGMgPSAtbm9ybWFsWzBdICogcG9pbnRbMF0gLSBub3JtYWxbMV0gKiBwb2ludFsxXSAtIG5vcm1hbFsyXSAqIHBvaW50WzJdO1xyXG4gICAgY29uc3QgdCA9IC1jIC9cclxuICAgICAgICAobm9ybWFsWzBdICogbm9ybWFsWzBdICsgbm9ybWFsWzFdICogbm9ybWFsWzFdICsgbm9ybWFsWzJdICogbm9ybWFsWzJdKTtcclxuICAgIHJldHVybiBbdCAqIG5vcm1hbFswXSwgdCAqIG5vcm1hbFsxXSwgdCAqIG5vcm1hbFsyXV07XHJcbn07XHJcbmNvbnN0IE1BWF9OVU1fRkFDRVMgPSA2NDtcclxuY29uc3QgTUFYX05VTV9MT09TRV9FREdFUyA9IDMyO1xyXG5jb25zdCBFUEFfTUFYX05VTV9JVEVSID0gNjQ7XHJcbmNvbnN0IEVQQSA9IChhLCBiLCBjLCBkLCBvcmlnaW5zTWFwLCBjb2xsMSwgY29sbDIpID0+IHtcclxuICAgIGNvbnN0IGZhY2VzID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgIGZhY2VzW2ldID0gW107XHJcbiAgICB9XHJcbiAgICBmYWNlc1swXVswXSA9IGE7XHJcbiAgICBmYWNlc1swXVsxXSA9IGI7XHJcbiAgICBmYWNlc1swXVsyXSA9IGM7XHJcbiAgICBmYWNlc1swXVszXSA9IG5vcm1hbGl6ZShjcm9zcyhkaWZmKGIsIGEpLCBkaWZmKGMsIGEpKSk7XHJcbiAgICBmYWNlc1sxXVswXSA9IGE7XHJcbiAgICBmYWNlc1sxXVsxXSA9IGM7XHJcbiAgICBmYWNlc1sxXVsyXSA9IGQ7XHJcbiAgICBmYWNlc1sxXVszXSA9IG5vcm1hbGl6ZShjcm9zcyhkaWZmKGMsIGEpLCBkaWZmKGQsIGEpKSk7XHJcbiAgICBmYWNlc1syXVswXSA9IGE7XHJcbiAgICBmYWNlc1syXVsxXSA9IGQ7XHJcbiAgICBmYWNlc1syXVsyXSA9IGI7XHJcbiAgICBmYWNlc1syXVszXSA9IG5vcm1hbGl6ZShjcm9zcyhkaWZmKGQsIGEpLCBkaWZmKGIsIGEpKSk7XHJcbiAgICBmYWNlc1szXVswXSA9IGI7XHJcbiAgICBmYWNlc1szXVsxXSA9IGQ7XHJcbiAgICBmYWNlc1szXVsyXSA9IGM7XHJcbiAgICBmYWNlc1szXVszXSA9IG5vcm1hbGl6ZShjcm9zcyhkaWZmKGQsIGIpLCBkaWZmKGMsIGIpKSk7XHJcbiAgICBsZXQgbnVtX2ZhY2VzID0gNDtcclxuICAgIGxldCBjbG9zZXN0X2ZhY2UgPSBudWxsO1xyXG4gICAgbGV0IHNlYXJjaF9kaXI7XHJcbiAgICBsZXQgcDtcclxuICAgIGZvciAobGV0IGl0ZXJhdGlvbiA9IDA7IGl0ZXJhdGlvbiA8IEVQQV9NQVhfTlVNX0lURVI7ICsraXRlcmF0aW9uKSB7XHJcbiAgICAgICAgbGV0IG1pbl9kaXN0ID0gZG90KGZhY2VzWzBdWzBdLCBmYWNlc1swXVszXSk7XHJcbiAgICAgICAgY2xvc2VzdF9mYWNlID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bV9mYWNlczsgKytpKSB7XHJcbiAgICAgICAgICAgIGxldCBkaXN0ID0gZG90KGZhY2VzW2ldWzBdLCBmYWNlc1tpXVszXSk7XHJcbiAgICAgICAgICAgIGlmIChkaXN0IDwgbWluX2Rpc3QpIHtcclxuICAgICAgICAgICAgICAgIG1pbl9kaXN0ID0gZGlzdDtcclxuICAgICAgICAgICAgICAgIGNsb3Nlc3RfZmFjZSA9IGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc2VhcmNoX2RpciA9IGZhY2VzW2Nsb3Nlc3RfZmFjZV1bM107XHJcbiAgICAgICAgY29uc3QgcF9vcmlnaW4xID0gY29sbDEuc3VwcG9ydChzY2FsZShzZWFyY2hfZGlyLCAtMSkpO1xyXG4gICAgICAgIGNvbnN0IHBfb3JpZ2luMiA9IGNvbGwyLnN1cHBvcnQoc2VhcmNoX2Rpcik7XHJcbiAgICAgICAgcCA9IGRpZmYocF9vcmlnaW4yLCBwX29yaWdpbjEpO1xyXG4gICAgICAgIG9yaWdpbnNNYXAuc2V0KHAsIFtwX29yaWdpbjEsIHBfb3JpZ2luMl0pO1xyXG4gICAgICAgIGlmIChkb3QocCwgc2VhcmNoX2RpcikgLSBtaW5fZGlzdCA8IEVQQV9CSUFTKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZhY2UgPSBmYWNlc1tjbG9zZXN0X2ZhY2VdO1xyXG4gICAgICAgICAgICBjb25zdCBwb2ludCA9IG9yaWdpblRvRmFjZVByb2ooZmFjZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IFtBYSwgQmFdID0gb3JpZ2luc01hcC5nZXQoZmFjZVswXSk7XHJcbiAgICAgICAgICAgIC8vY29uc3QgQWEgPSBmYWNlWzBdLm9hXHJcbiAgICAgICAgICAgIC8vY29uc3QgQmEgPSBmYWNlWzBdLm9iXHJcbiAgICAgICAgICAgIGNvbnN0IFtBYiwgQmJdID0gb3JpZ2luc01hcC5nZXQoZmFjZVsxXSk7XHJcbiAgICAgICAgICAgIC8vY29uc3QgQWIgPSBmYWNlWzFdLm9hXHJcbiAgICAgICAgICAgIC8vY29uc3QgQmIgPSBmYWNlWzFdLm9iXHJcbiAgICAgICAgICAgIGNvbnN0IFtBYywgQmNdID0gb3JpZ2luc01hcC5nZXQoZmFjZVsyXSk7XHJcbiAgICAgICAgICAgIC8vY29uc3QgQWMgPSBmYWNlWzJdLm9hXHJcbiAgICAgICAgICAgIC8vY29uc3QgQmMgPSBmYWNlWzJdLm9iXHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGJhcmljZW50cmljKGZhY2UsIHBvaW50KTtcclxuICAgICAgICAgICAgaWYgKGlzTmFOKHJlc3VsdFswXSArIHJlc3VsdFsxXSArIHJlc3VsdFsyXSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBQQSA9IHN1bShzdW0oc2NhbGUoQWEsIHJlc3VsdFswXSksIHNjYWxlKEFiLCByZXN1bHRbMV0pKSwgc2NhbGUoQWMsIHJlc3VsdFsyXSkpO1xyXG4gICAgICAgICAgICAvL0FhLm11bHRpcGx5KHJlc3VsdFswXSkuYWRkKEFiLm11bHRpcGx5KHJlc3VsdFsxXSkpLmFkZChBYy5tdWx0aXBseShyZXN1bHRbMl0pKVxyXG4gICAgICAgICAgICBsZXQgUEIgPSBzdW0oc3VtKHNjYWxlKEJhLCByZXN1bHRbMF0pLCBzY2FsZShCYiwgcmVzdWx0WzFdKSksIHNjYWxlKEJjLCByZXN1bHRbMl0pKTtcclxuICAgICAgICAgICAgLy9CYS5tdWx0aXBseShyZXN1bHRbMF0pLmFkZChCYi5tdWx0aXBseShyZXN1bHRbMV0pKS5hZGQoQmMubXVsdGlwbHkocmVzdWx0WzJdKSlcclxuICAgICAgICAgICAgLy9jb25zdCByYSA9IFBBLnN1YnN0cmFjdChjb2xsMS5wb3MpXHJcbiAgICAgICAgICAgIGNvbnN0IG4gPSBub3JtYWxpemUoc2NhbGUoZmFjZVszXSwgLWRvdChwLCBzZWFyY2hfZGlyKSkpO1xyXG4gICAgICAgICAgICAvL2lmIChub3JtKG4pIDwgMC4wMSkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uRXJyb3IgPSAtZG90KGRpZmYoUEIsIFBBKSwgbik7XHJcbiAgICAgICAgICAgIHJldHVybiB7IFBBLCBQQiwgbiwgcG9zaXRpb25FcnJvciB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBsb29zZV9lZGdlcyA9IFtdO1xyXG4gICAgICAgIGxldCBudW1fbG9vc2VfZWRnZXMgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtX2ZhY2VzOyArK2kpIHtcclxuICAgICAgICAgICAgaWYgKGRvdChmYWNlc1tpXVszXSwgZGlmZihwLCBmYWNlc1tpXVswXSkpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAzOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudF9lZGdlID0gW2ZhY2VzW2ldW2pdLCBmYWNlc1tpXVsoaiArIDEpICUgM11dO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmb3VuZF9lZGdlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBudW1fbG9vc2VfZWRnZXM7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9vc2VfZWRnZXNba11bMV0gPT09IGN1cnJlbnRfZWRnZVswXSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9vc2VfZWRnZXNba11bMF0gPT09IGN1cnJlbnRfZWRnZVsxXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9vc2VfZWRnZXNba11bMF0gPSBsb29zZV9lZGdlc1tudW1fbG9vc2VfZWRnZXMgLSAxXVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvb3NlX2VkZ2VzW2tdWzFdID0gbG9vc2VfZWRnZXNbbnVtX2xvb3NlX2VkZ2VzIC0gMV1bMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1fbG9vc2VfZWRnZXMtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kX2VkZ2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IG51bV9sb29zZV9lZGdlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWZvdW5kX2VkZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG51bV9sb29zZV9lZGdlcyA+PSBNQVhfTlVNX0xPT1NFX0VER0VTKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvb3NlX2VkZ2VzW251bV9sb29zZV9lZGdlc10gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9vc2VfZWRnZXNbbnVtX2xvb3NlX2VkZ2VzXVswXSA9IGN1cnJlbnRfZWRnZVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9vc2VfZWRnZXNbbnVtX2xvb3NlX2VkZ2VzXVsxXSA9IGN1cnJlbnRfZWRnZVsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnVtX2xvb3NlX2VkZ2VzKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZmFjZXNbaV1bMF0gPSBmYWNlc1tudW1fZmFjZXMgLSAxXVswXTtcclxuICAgICAgICAgICAgICAgIGZhY2VzW2ldWzFdID0gZmFjZXNbbnVtX2ZhY2VzIC0gMV1bMV07XHJcbiAgICAgICAgICAgICAgICBmYWNlc1tpXVsyXSA9IGZhY2VzW251bV9mYWNlcyAtIDFdWzJdO1xyXG4gICAgICAgICAgICAgICAgZmFjZXNbaV1bM10gPSBmYWNlc1tudW1fZmFjZXMgLSAxXVszXTtcclxuICAgICAgICAgICAgICAgIG51bV9mYWNlcy0tO1xyXG4gICAgICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtX2xvb3NlX2VkZ2VzOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKG51bV9mYWNlcyA+PSBNQVhfTlVNX0ZBQ0VTKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGZhY2VzW251bV9mYWNlc10gPSBbXTtcclxuICAgICAgICAgICAgZmFjZXNbbnVtX2ZhY2VzXVswXSA9IGxvb3NlX2VkZ2VzW2ldWzBdO1xyXG4gICAgICAgICAgICBmYWNlc1tudW1fZmFjZXNdWzFdID0gbG9vc2VfZWRnZXNbaV1bMV07XHJcbiAgICAgICAgICAgIGZhY2VzW251bV9mYWNlc11bMl0gPSBwO1xyXG4gICAgICAgICAgICBmYWNlc1tudW1fZmFjZXNdWzNdID0gbm9ybWFsaXplKGNyb3NzKGRpZmYobG9vc2VfZWRnZXNbaV1bMF0sIGxvb3NlX2VkZ2VzW2ldWzFdKSwgZGlmZihsb29zZV9lZGdlc1tpXVswXSwgcCkpKTtcclxuICAgICAgICAgICAgaWYgKGRvdChmYWNlc1tudW1fZmFjZXNdWzBdLCBmYWNlc1tudW1fZmFjZXNdWzNdKSArIDAuMDEgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0ZW1wID0gZmFjZXNbbnVtX2ZhY2VzXVswXTtcclxuICAgICAgICAgICAgICAgIGZhY2VzW251bV9mYWNlc11bMF0gPSBmYWNlc1tudW1fZmFjZXNdWzFdO1xyXG4gICAgICAgICAgICAgICAgZmFjZXNbbnVtX2ZhY2VzXVsxXSA9IHRlbXA7XHJcbiAgICAgICAgICAgICAgICBmYWNlc1tudW1fZmFjZXNdWzNdID0gc2NhbGUoZmFjZXNbbnVtX2ZhY2VzXVszXSwgLTEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG51bV9mYWNlcysrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5jb25zdCBnamtTY29wZSA9IHt9O1xyXG5jb25zdCBfZ2prID0gZ2prLmJpbmQoZ2prU2NvcGUpO1xyXG5jb25zdCBnZXRDb250YWN0cyA9IChjb2xsMSwgY29sbDIpID0+IHtcclxuICAgIGNvbnN0IGNvbnRhY3REYXRhID0gZ2prKGNvbGwxLCBjb2xsMik7XHJcbiAgICBpZiAoIWNvbnRhY3REYXRhKVxyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIGNvbnN0IHsgUEEsIFBCLCBuLCBwb3NpdGlvbkVycm9yIH0gPSBjb250YWN0RGF0YTtcclxuICAgIGlmIChjb2xsMS50eXBlID09PSBcInNwaGVyZVwiIHx8IGNvbGwyLnR5cGUgPT09IFwic3BoZXJlXCIpIHtcclxuICAgICAgICBjb25zdCByYiA9IGRpZmYoUEIsIGNvbGwyLnBvcyk7XHJcbiAgICAgICAgY29uc3QgcmEgPSBkaWZmKFBBLCBjb2xsMS5wb3MpO1xyXG4gICAgICAgIGNvbnN0IHJhTG9jYWwgPSBtMy50cmFuc2Zvcm1Qb2ludChjb2xsMS5SbWF0cml4SW52ZXJzZSwgcmEpO1xyXG4gICAgICAgIGNvbnN0IHJiTG9jYWwgPSBtMy50cmFuc2Zvcm1Qb2ludChjb2xsMi5SbWF0cml4SW52ZXJzZSwgcmIpO1xyXG4gICAgICAgIGNvbnN0IGkgPSBbblsxXSArIG5bMl0sIG5bMl0gLSBuWzBdLCAtblswXSAtIG5bMV1dO1xyXG4gICAgICAgIGNvbnN0IGogPSBjcm9zcyhzY2FsZShuLCAtMSksIGkpO1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJhLCByYiwgbiwgUEEsIFBCLCBwb3NpdGlvbkVycm9yLCBpLCBqLCByYUxvY2FsLCByYkxvY2FsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdO1xyXG4gICAgfVxyXG4gICAgY29uc3QgblJldmVyc2UgPSBzY2FsZShuLCAtMSk7XHJcbiAgICBjb25zdCBjb250YWN0RmFjZTEgPSBjb2xsMS5nZXRDbG9zZXN0RmFjZUJ5Tm9ybWFsKG5SZXZlcnNlKTtcclxuICAgIGNvbnN0IGNvbnRhY3RGYWNlMiA9IGNvbGwyLmdldENsb3Nlc3RGYWNlQnlOb3JtYWwobik7XHJcbiAgICBjb25zdCBwbGFuZSA9IFtzY2FsZShzdW0oUEEsIFBCKSwgMC41KSwgbl07XHJcbiAgICBjb25zdCBwcm9qZWN0aW9uczEgPSBjb250YWN0RmFjZTEudmVydGljZXMubWFwKChwKSA9PiBwb2ludE9uUGxhbmVQcm9qZWN0aW9uKHBsYW5lLCBwKSk7XHJcbiAgICBjb25zdCBwcm9qZWN0aW9uczIgPSBjb250YWN0RmFjZTIudmVydGljZXMubWFwKChwKSA9PiBwb2ludE9uUGxhbmVQcm9qZWN0aW9uKHBsYW5lLCBwKSk7XHJcbiAgICBjb25zdCBvcmlnaW4gPSBwbGFuZVswXTtcclxuICAgIGNvbnN0IGkgPSBub3JtYWxpemUoW25bMV0gKyBuWzJdLCBuWzJdIC0gblswXSwgLW5bMF0gLSBuWzFdXSk7XHJcbiAgICBjb25zdCBqID0gY3Jvc3Moc2NhbGUobiwgLTEpLCBpKTtcclxuICAgIGxldCBfMmQxID0gcHJvamVjdGlvbnMxLm1hcCgocCkgPT4gZ2V0MkRjb29yZHNPblBsYW5lKGksIGosIGRpZmYocCwgb3JpZ2luKSkpO1xyXG4gICAgbGV0IF8yZDIgPSBwcm9qZWN0aW9uczIubWFwKChwKSA9PiBnZXQyRGNvb3Jkc09uUGxhbmUoaSwgaiwgZGlmZihwLCBvcmlnaW4pKSk7XHJcbiAgICBjb25zdCBkaXIxID0gaXNJbkNsb2Nrd2lzZShfMmQxKTtcclxuICAgIGNvbnN0IGRpcjIgPSBpc0luQ2xvY2t3aXNlKF8yZDIpO1xyXG4gICAgaWYgKGRpcjEgPCAwKVxyXG4gICAgICAgIF8yZDEgPSBfMmQxLm1hcCgoXywgaSkgPT4gXzJkMS5hdCgtaSkpO1xyXG4gICAgaWYgKGRpcjIgPCAwKVxyXG4gICAgICAgIF8yZDIgPSBfMmQyLm1hcCgoXywgaSkgPT4gXzJkMi5hdCgtaSkpO1xyXG4gICAgY29uc3QgY2xpcHBlZCA9IGNsaXBGYWNlVnNGYWNlKF8yZDEsIF8yZDIpO1xyXG4gICAgY29uc3QgXzNkID0gY2xpcHBlZC5tYXAoKHApID0+IHN1bShvcmlnaW4sIHN1bShzY2FsZShpLCBwWzBdKSwgc2NhbGUoaiwgcFsxXSkpKSk7XHJcbiAgICBjb25zdCBmZWF0dXJlcyA9IFtdO1xyXG4gICAgXzNkLmZvckVhY2goKHBvaW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgUEEgPSByYXlWc1BsYW5lSW50ZXJzZWMoW2NvbnRhY3RGYWNlMS52ZXJ0aWNlc1swXSwgY29udGFjdEZhY2UxLm5vcm1hbF0sIHBvaW50LCBuKTtcclxuICAgICAgICBpZiAoIWlzUG9pbnRCZWhpbmRQbGFuZShwbGFuZSwgUEEsIDEpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgY29uc3QgUEIgPSByYXlWc1BsYW5lSW50ZXJzZWMoW2NvbnRhY3RGYWNlMi52ZXJ0aWNlc1swXSwgY29udGFjdEZhY2UyLm5vcm1hbF0sIHBvaW50LCBuKTtcclxuICAgICAgICBpZiAoIWlzUG9pbnRCZWhpbmRQbGFuZShwbGFuZSwgUEIsIC0xKSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IHJiID0gZGlmZihQQiwgY29sbDIucG9zKTtcclxuICAgICAgICBjb25zdCByYSA9IGRpZmYoUEEsIGNvbGwxLnBvcyk7XHJcbiAgICAgICAgY29uc3QgcG9zaXRpb25FcnJvciA9IC1kb3QoZGlmZihQQiwgUEEpLCBuKTtcclxuICAgICAgICBjb25zdCByYUxvY2FsID0gbTMudHJhbnNmb3JtUG9pbnQoY29sbDEuUm1hdHJpeEludmVyc2UsIHJhKTtcclxuICAgICAgICBjb25zdCByYkxvY2FsID0gbTMudHJhbnNmb3JtUG9pbnQoY29sbDIuUm1hdHJpeEludmVyc2UsIHJiKTtcclxuICAgICAgICBmZWF0dXJlcy5wdXNoKHtcclxuICAgICAgICAgICAgcmEsIHJiLCBuLCBQQSwgUEIsIHBvc2l0aW9uRXJyb3IsIGksIGosIHJhTG9jYWwsIHJiTG9jYWxcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgaWYgKGZlYXR1cmVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIGNvbnN0IHJiID0gZGlmZihQQiwgY29sbDIucG9zKTtcclxuICAgICAgICBjb25zdCByYSA9IGRpZmYoUEEsIGNvbGwxLnBvcyk7XHJcbiAgICAgICAgY29uc3QgcmFMb2NhbCA9IG0zLnRyYW5zZm9ybVBvaW50KGNvbGwxLlJtYXRyaXhJbnZlcnNlLCByYSk7XHJcbiAgICAgICAgY29uc3QgcmJMb2NhbCA9IG0zLnRyYW5zZm9ybVBvaW50KGNvbGwyLlJtYXRyaXhJbnZlcnNlLCByYik7XHJcbiAgICAgICAgZmVhdHVyZXMucHVzaCh7XHJcbiAgICAgICAgICAgIHJhLCByYiwgbiwgUEEsIFBCLCBwb3NpdGlvbkVycm9yLCBpLCBqLCByYUxvY2FsLCByYkxvY2FsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmVhdHVyZXM7XHJcbn07XHJcbmV4cG9ydCB7IGdldENvbnRhY3RzLCBwb2ludE9uUGxhbmVQcm9qZWN0aW9uLCBjbGlwUG9pbnRzQmVoaW5kUGxhbmUsIGdldDJEY29vcmRzT25QbGFuZSwgcmF5VnNQbGFuZUludGVyc2VjLCB9O1xyXG4iLCJcclxuaW1wb3J0IHttNCwgbTMsIHYzfSBmcm9tICdyb21hbnBwcG1hdGgnXHJcblxyXG5jb25zdCBLRVlTID0ge1xyXG4gICAgJ3cnIDogJ21vdmVGb3J3YXJkJyxcclxuICAgICdzJyA6ICdtb3ZlQmFja3dhcmQnLFxyXG4gICAgJ2EnIDogJ21vdmVMZWZ0JyxcclxuICAgICdkJyA6ICdtb3ZlUmlnaHQnLFxyXG4gICAgJyAnIDogJ21vdmVVcCdcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnJlZUNhbSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmtleUlucHV0ID0gbnVsbDtcclxuICAgIHRoaXMubW91c2VJbnB1dCA9IG51bGw7XHJcbiAgICB0aGlzLnJvdGF0aW9uWCA9IDA7XHJcbiAgICB0aGlzLnJvdGF0aW9uWSA9IDA7XHJcbiAgICB0aGlzLmRlbHRhUlkgPSAwO1xyXG4gICAgdGhpcy5jYW1Qb3MgPSBbMCwgMCwgMTBdO1xyXG4gICAgdGhpcy5jYW1Sb3QgPSBtMy5pZGVudGl0eSgpO1xyXG4gIH1cclxuICBsaXN0ZW5Nb3VzZShtb3VzZUlucHV0KSB7XHJcbiAgICB0aGlzLm1vdXNlSW5wdXQgPSBtb3VzZUlucHV0O1xyXG4gICAgbW91c2VJbnB1dC5vbihcIm1vdmVcIiwgKFtkZWx0YVgsIGRlbHRhWV0pID0+IHtcclxuICAgICAgdGhpcy5yb3RhdGlvblkgLT0gZGVsdGFYICogMC4wMDU7XHJcbiAgICAgIHRoaXMucm90YXRpb25YIC09IGRlbHRhWSAqIDAuMDA1O1xyXG4gICAgICB0aGlzLnJvdGF0aW9uWCA9IE1hdGgubWF4KFxyXG4gICAgICAgIC1NYXRoLlBJIC8gMixcclxuICAgICAgICBNYXRoLm1pbihNYXRoLlBJIC8gMiwgdGhpcy5yb3RhdGlvblgpXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMuZGVsdGFSWSA9IGRlbHRhWCAqIDAuMDA1O1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIGxpc3RlbktleWJvYXJkKGtleUlucHV0KSB7XHJcbiAgICB0aGlzLmtleUlucHV0ID0ga2V5SW5wdXQ7XHJcbiAgfVxyXG4gIHRpY2soKSB7XHJcbiAgICBmb3IgKGNvbnN0IGtleSBvZiB0aGlzLmtleUlucHV0LmtleXMpIHtcclxuICAgICAgY29uc3QgYWN0aW9uTmFtZSA9IEtFWVNba2V5XTtcclxuICAgICAgaWYgKGFjdGlvbk5hbWUpIHtcclxuICAgICAgICBjb25zdCBhY3Rpb24gPSB0aGlzW2FjdGlvbk5hbWVdLmJpbmQodGhpcyk7XHJcbiAgICAgICAgYWN0aW9uKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNhbU1hdHJpeCA9IG00LnRyYW5zbGF0aW9uKC4uLnRoaXMuY2FtUG9zKTtcclxuICAgIHRoaXMuY2FtTWF0cml4ID0gbTQueFJvdGF0ZShcclxuICAgICAgbTQueVJvdGF0ZSh0aGlzLmNhbU1hdHJpeCwgdGhpcy5yb3RhdGlvblkpLFxyXG4gICAgICB0aGlzLnJvdGF0aW9uWFxyXG4gICAgKTtcclxuICB9XHJcbiAgbW92ZShkaXIpIHtcclxuICAgIGNvbnN0IG0gPSBtNC5tNFRvbTModGhpcy5jYW1NYXRyaXgpO1xyXG4gICAgdGhpcy5jYW1Qb3MgPSB2My5zdW0odGhpcy5jYW1Qb3MsIG0zLnRyYW5zZm9ybVBvaW50KG0sIGRpcikpO1xyXG4gIH1cclxuICBtb3ZlRm9yd2FyZCgpIHtcclxuICAgIHRoaXMubW92ZShbMCwgMCwgLTFdKTtcclxuICB9XHJcbiAgbW92ZUJhY2t3YXJkKCkge1xyXG4gICAgdGhpcy5tb3ZlKFswLCAwLCAxXSk7XHJcbiAgfVxyXG4gIG1vdmVMZWZ0KCkge1xyXG4gICAgdGhpcy5tb3ZlKFstMSwgMCwgMF0pO1xyXG4gIH1cclxuICBtb3ZlUmlnaHQoKSB7XHJcbiAgICB0aGlzLm1vdmUoWzEsIDAsIDBdKTtcclxuICB9XHJcbiAgbW92ZVVwKCkge1xyXG4gICAgdGhpcy5tb3ZlKFswLCAxLCAwXSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCAgRXZlbnRFbWl0dGVyICBmcm9tIFwiLi4vcGh5c2ljcy9FdmVudEVtaXR0ZXIudHNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtleUlucHV0IGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKClcclxuICAgIHRoaXMua2V5cyA9IG5ldyBTZXQoKTtcclxuICB9XHJcbiAgbG9nRG93bih7IGtleSB9KSB7XHJcbiAgICB0aGlzLmtleXMuYWRkKGtleSk7XHJcbiAgICB0aGlzLmVtaXQoXCJrZXlkb3duXCIsIHsga2V5IH0pO1xyXG4gIH1cclxuICBsb2dVcCh7IGtleSB9KSB7XHJcbiAgICB0aGlzLmtleXMuZGVsZXRlKGtleSk7XHJcbiAgICB0aGlzLmVtaXQoXCJrZXl1cFwiLCB7IGtleSB9KTtcclxuICB9XHJcbiAgbGlzdGVuKCkge1xyXG4gICAgY29uc3QgbG9nRG93biA9IHRoaXMubG9nRG93bi5iaW5kKHRoaXMpO1xyXG4gICAgY29uc3QgbG9nVXAgPSB0aGlzLmxvZ1VwLmJpbmQodGhpcyk7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBsb2dEb3duKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBsb2dVcCk7XHJcbiAgICB0aGlzLnVuc3Vic2ljcmliZSA9ICgpID0+IHtcclxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgbG9nRG93bik7XHJcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBsb2dVcCk7XHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgIEV2ZW50RW1pdHRlciAgZnJvbSBcIi4uL3BoeXNpY3MvRXZlbnRFbWl0dGVyLnRzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb3VzZUlucHV0IGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLmxhc3RYID0gMDtcclxuICAgIHRoaXMubGFzdFkgPSAwO1xyXG4gICAgdGhpcy5lbmFibGUgPSBmYWxzZTtcclxuICAgIHRoaXMubW92ZXMgPSBbXVxyXG4gIH1cclxuICBsb2dNb3ZlKHsgb2Zmc2V0WCwgb2Zmc2V0WSB9KSB7XHJcbiAgICBjb25zdCBkZWx0YVggPSBvZmZzZXRYIC0gdGhpcy5sYXN0WDtcclxuICAgIHRoaXMubGFzdFggPSBvZmZzZXRYO1xyXG4gICAgY29uc3QgZGVsdGFZID0gb2Zmc2V0WSAtIHRoaXMubGFzdFk7XHJcbiAgICB0aGlzLmxhc3RZID0gb2Zmc2V0WTtcclxuICAgIHRoaXMuZW1pdChcIm1vdmVcIiwgW2RlbHRhWCwgZGVsdGFZXSk7XHJcbiAgICB0aGlzLm1vdmVzLnB1c2goW2RlbHRhWCwgZGVsdGFZXSlcclxuICB9XHJcbiAgbGlzdGVuKCkge1xyXG4gICAgY29uc3QgbG9nTW92ZSA9IHRoaXMubG9nTW92ZS5iaW5kKHRoaXMpO1xyXG4gICAgY29uc3QgXyA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGlmICh0aGlzLmVuYWJsZSkgbG9nTW92ZShlKTtcclxuICAgIH0uYmluZCh0aGlzKTtcclxuICAgIGNvbnN0IGRvd24gPSBmdW5jdGlvbiAoeyBvZmZzZXRYLCBvZmZzZXRZIH0pIHtcclxuICAgICAgdGhpcy5sYXN0WCA9IG9mZnNldFg7XHJcbiAgICAgIHRoaXMubGFzdFkgPSBvZmZzZXRZO1xyXG4gICAgICB0aGlzLmVuYWJsZSA9IHRydWU7XHJcbiAgICB9LmJpbmQodGhpcyk7XHJcbiAgICBjb25zdCB1cCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpcy5lbmFibGUgPSBmYWxzZTtcclxuICAgIH0uYmluZCh0aGlzKTtcclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIF8pO1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBkb3duKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHVwKTtcclxuICAgIHRoaXMudW5zdWJzY3JpYmUgPSAoKSA9PiB7XHJcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgXyk7XHJcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgZG93bik7XHJcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHVwKTtcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgbTQgfSBmcm9tIFwicm9tYW5wcHBtYXRoXCI7XHJcbmltcG9ydCB7IGNyZWF0ZUJveCwgR0xjb250ZXh0V3JhcHBlciwgcG9pbnRMaWdodFNoYWRlcnMsIGRlZmF1bHRTaGFkZXJzLCBjcmVhdGVTcGhlcmUgfSBmcm9tIFwicm9tYW5wcHBncmFwaGljc1wiO1xyXG5pbXBvcnQgRnJlZUNhbSBmcm9tIFwiLi9zcmMvbWlzYy9GcmVlQ2FtXCI7XHJcbmltcG9ydCBLZXlJbnB1dCBmcm9tIFwiLi9zcmMvbWlzYy9rZXlJbnB1dFwiO1xyXG5pbXBvcnQgTW91c2VJbnB1dCBmcm9tIFwiLi9zcmMvbWlzYy9tb3VzZUlucHV0XCI7XHJcbmNvbnN0IG1vdXNlSW5wdXQgPSBuZXcgTW91c2VJbnB1dCgpO1xyXG5tb3VzZUlucHV0Lmxpc3RlbigpO1xyXG5jb25zdCBrZXlJbnB1dCA9IG5ldyBLZXlJbnB1dCgpO1xyXG5rZXlJbnB1dC5saXN0ZW4oKTtcclxuY29uc3QgcGxheWVyID0gbmV3IEZyZWVDYW0oKTtcclxucGxheWVyLmxpc3RlbktleWJvYXJkKGtleUlucHV0KTtcclxucGxheWVyLmxpc3Rlbk1vdXNlKG1vdXNlSW5wdXQpO1xyXG5wbGF5ZXIuY2FtUG9zID0gWy0xMCwgMzAsIDI1XTtcclxucGxheWVyLnJvdGF0aW9uWCA9IC1NYXRoLlBJICogMC4xO1xyXG5wbGF5ZXIucm90YXRpb25ZID0gLU1hdGguUEkgKiAwLjE7XHJcbmNvbnN0IGdsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIikuZ2V0Q29udGV4dChcIndlYmdsMlwiKTtcclxuY29uc3QgY29udGV4dCA9IG5ldyBHTGNvbnRleHRXcmFwcGVyKGdsKTtcclxuY29uc3QgeyBQcmltaXRpdmVSZW5kZXJlciwgRHJhd2VyLCBQcm9ncmFtSW5mbyB9ID0gY29udGV4dDtcclxuY29udGV4dC5yZXNpemVDYW52YXNUb0Rpc3BsYXlTaXplKCk7XHJcbmNvbnN0IGRyYXdlciA9IG5ldyBEcmF3ZXIoKTtcclxuZHJhd2VyLnByb2plY3Rpb25NYXRyaXggPSBEcmF3ZXIuY3JlYXRlM2RQcm9qZWN0aW9uTWF0cml4KDEsIDIwMDAsIGdsLmNhbnZhcy53aWR0aCwgZ2wuY2FudmFzLmhlaWdodCk7XHJcbmNvbnN0IHBvaW50TGlnaHRQcm9ncmFtSW5mbyA9IG5ldyBQcm9ncmFtSW5mbyhwb2ludExpZ2h0U2hhZGVycy52ZXJ0LCBwb2ludExpZ2h0U2hhZGVycy5mcmFnKTtcclxucG9pbnRMaWdodFByb2dyYW1JbmZvLmNvbXBpbGVTaGFkZXJzKCkuY3JlYXRlVW5pZm9ybVNldHRlcnMoKTtcclxuY29uc3QgZGVmYXVsdFByb2dyYW1JbmZvID0gbmV3IFByb2dyYW1JbmZvKGRlZmF1bHRTaGFkZXJzLnZlcnQsIGRlZmF1bHRTaGFkZXJzLmZyYWcpO1xyXG5kZWZhdWx0UHJvZ3JhbUluZm8uY29tcGlsZVNoYWRlcnMoKS5jcmVhdGVVbmlmb3JtU2V0dGVycygpO1xyXG5jb25zdCBjdWJlID0gUHJpbWl0aXZlUmVuZGVyZXIuZnJvbUFycmF5RGF0YShjcmVhdGVCb3goMSwgMSwgMSkpO1xyXG5jb25zdCBwb2ludCA9IG5ldyBQcmltaXRpdmVSZW5kZXJlcigpO1xyXG5jdWJlXHJcbiAgICAuY3JlYXRlVkFPKClcclxuICAgIC5zZXREcmF3ZXIoZHJhd2VyKVxyXG4gICAgLnNldFByb2dyYW1JbmZvKHBvaW50TGlnaHRQcm9ncmFtSW5mbylcclxuICAgIC5zZXRNb2RlKDQpO1xyXG5jb25zdCBzcGhlcmUgPSBQcmltaXRpdmVSZW5kZXJlci5mcm9tQXJyYXlEYXRhKGNyZWF0ZVNwaGVyZSgxLCAxMCwgMTApKTtcclxuc3BoZXJlXHJcbiAgICAuY3JlYXRlVkFPKClcclxuICAgIC5zZXREcmF3ZXIoZHJhd2VyKVxyXG4gICAgLnNldFByb2dyYW1JbmZvKHBvaW50TGlnaHRQcm9ncmFtSW5mbylcclxuICAgIC5zZXRNb2RlKDIpO1xyXG5wb2ludFxyXG4gICAgLmNyZWF0ZVZBTygpXHJcbiAgICAuc2V0RHJhd2VyKGRyYXdlcilcclxuICAgIC5zZXRQcm9ncmFtSW5mbyhkZWZhdWx0UHJvZ3JhbUluZm8pXHJcbiAgICAuY3JlYXRlQnVmZmVyQXR0cmliRGF0YSh7XHJcbiAgICBhdHRyaWJOYW1lOiBcImFfcG9zaXRpb25cIixcclxuICAgIGxvY2F0aW9uOiAwLFxyXG4gICAgYXR0cmlidXRlVHlwZTogV2ViR0wyUmVuZGVyaW5nQ29udGV4dC5GTE9BVF9WRUMzLFxyXG4gICAgbnVtQ29tcG9uZW50czogMyxcclxufSlcclxuICAgIC5zZXRBdHRyaWJ1dGVzKClcclxuICAgIC5idWZmZXJEYXRhKFwiYV9wb3NpdGlvblwiLCBuZXcgRmxvYXQzMkFycmF5KFsxLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAxXSkpXHJcbiAgICAuc2V0TW9kZSgzKVxyXG4gICAgLnNldE51bUVsZW1lbnRzKDUpO1xyXG5jb25zdCB1bmlmb3JtcyA9IHtcclxuICAgIHVfbGlnaHRXb3JsZFBvc2l0aW9uOiBbMzAsIDUwLCAzMF0sXHJcbiAgICB1X2FtYmllbnRMaWdodDogWzEsIDEsIDAuMywgMC4xMV0sXHJcbiAgICB1X3JldmVyc2VMaWdodERpcmVjdGlvbjogWzEsIDAsIDBdLFxyXG4gICAgdV9zaGluaW5lc3M6IDMwMCxcclxufTtcclxuaW1wb3J0IHsgUmlnaWRCb2R5IH0gZnJvbSBcIi4vc3JjL3BoeXNpY3MvUmlnaWRCb2R5XCI7XHJcbmltcG9ydCBTaW11bGF0aW9uIGZyb20gXCIuL3NyYy9waHlzaWNzL1NpbXVsYXRpb25cIjtcclxuaW1wb3J0IHsgQm94IH0gZnJvbSBcIi4vc3JjL3BoeXNpY3MvQ29sbGlkZXJcIjtcclxuY29uc3Qgc2ltID0gbmV3IFNpbXVsYXRpb24oKTtcclxuc2ltLnVzZUNhY2hlID0gZmFsc2U7XHJcbmNvbnN0IGZsb29yID0geyBwaHlzaWNzOiBuZXcgUmlnaWRCb2R5KG5ldyBCb3goNTAsIDUsIDUwKSksIHNwcml0ZTogY3ViZSwgdW5pZm9ybXM6IHsgdV9jb2xvcjogWzEsIDAsIDEsIDFdIH0gfTtcclxuZmxvb3IucGh5c2ljcy5zZXRNYXNzKDk5OTk5OTk5KTtcclxuZmxvb3IucGh5c2ljcy5zdGF0aWMgPSB0cnVlO1xyXG5mbG9vci5waHlzaWNzLmZyaWN0aW9uID0gMjtcclxuZmxvb3IucGh5c2ljcy50cmFuc2xhdGUoWzAsIC0yLjUsIDBdKTtcclxuc2ltLmFkZE9iamVjdChmbG9vci5waHlzaWNzKTtcclxubGV0IG9iamVjdHNUb0RyYXcgPSBbXTtcclxub2JqZWN0c1RvRHJhdy5wdXNoKGZsb29yKTtcclxuZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XHJcbiAgICBjb25zdCBib3ggPSB7IHBoeXNpY3M6IG5ldyBSaWdpZEJvZHkobmV3IEJveCgzLCAzLCAzKSksIHNwcml0ZTogY3ViZSwgdW5pZm9ybXM6IHsgdV9jb2xvcjogWzAsIDAsIDEsIDFdIH0gfTtcclxuICAgIGJveC5waHlzaWNzLnRyYW5zbGF0ZShbMCwgMS41ICsgMy4xICogKGkpLCAwXSk7XHJcbiAgICAvL2JveC5waHlzaWNzLnRyYW5zbGF0ZShbMCwgIDEgKyAzLjAxICogKGkpLCAwXSk7XHJcbiAgICBib3gucGh5c2ljcy5zZXRNYXNzKDIpO1xyXG4gICAgYm94LnBoeXNpY3MuYWRkQWNjZWxlcmF0aW9uKFswLCAtOSwgMF0pO1xyXG4gICAgc2ltLmFkZE9iamVjdChib3gucGh5c2ljcyk7XHJcbiAgICBvYmplY3RzVG9EcmF3LnB1c2goYm94KTtcclxufVxyXG4vKlxyXG5jb25zdCBib3ggPSB7IHBoeXNpY3M6IG5ldyBSaWdpZEJvZHkobmV3IFNwaGVyZSg1KSksIHNwcml0ZTogc3BoZXJlLCB1bmlmb3JtcyA6IHt1X2NvbG9yIDogWzAsMCwxLDFdfSB9O1xyXG4gIGJveC5waHlzaWNzLnRyYW5zbGF0ZShbMCw1LDBdKTtcclxuICBib3gucGh5c2ljcy5zZXRNYXNzKDIpO1xyXG4gIGJveC5waHlzaWNzLmFkZEFjY2VsZXJhdGlvbihbMCwgLTksIDBdKTtcclxuICBib3gucGh5c2ljcy5hZGRWZWxvY2l0eShbMCwwLC0zXSlcclxuICBib3gucGh5c2ljcy5hZGRBbmd1bGFyVihbMSwxLDFdKVxyXG4gIHNpbS5hZGRPYmplY3QoYm94LnBoeXNpY3MpO1xyXG4gIG9iamVjdHNUb0RyYXcucHVzaChib3gpO1xyXG4vKlxyXG5cclxuY29uc3QgYm94MiA9IHsgcGh5c2ljczogbmV3IFJpZ2lkQm9keShuZXcgQm94KDUpKSwgc3ByaXRlOiBjdWJlLCB1bmlmb3JtcyA6IHt1X2NvbG9yIDogWzAsMCwxLDFdfSB9O1xyXG4gIGJveDIucGh5c2ljcy50cmFuc2xhdGUoWzAsNSwwXSk7XHJcbiAgYm94Mi5waHlzaWNzLnNldE1hc3MoMik7XHJcbiAgYm94Mi5waHlzaWNzLmFkZEFjY2VsZXJhdGlvbihbMCwgLTksIDBdKTtcclxuICBib3gyLnBoeXNpY3MuYWRkVmVsb2NpdHkoWzAsMjAsLTBdKVxyXG4gIGJveDIucGh5c2ljcy5hZGRBbmd1bGFyVihbMSwxLDFdKVxyXG4gIHNpbS5hZGRPYmplY3QoYm94Mi5waHlzaWNzKTtcclxuICBvYmplY3RzVG9EcmF3LnB1c2goYm94Mik7XHJcbiovXHJcbmxldCBsYXN0Q2FsbCA9IERhdGUubm93KCk7XHJcbmNvbnN0IGZwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZnBzXCIpO1xyXG5jb25zdCB0aW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0aW1lXCIpO1xyXG5jb25zdCB0aW1lMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGltZTJcIik7XHJcbmNvbnN0IG51bUl0ZXIgPSAxO1xyXG5jb25zdCBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xyXG5jb25zdCBsb29wID0gKCkgPT4ge1xyXG4gICAgcGxheWVyLnRpY2soKTtcclxuICAgIHNpbS50aWNrKDAuMDE1KTtcclxuICAgIGNvbnN0IGN1cmVudFRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgY29uc3QgZGVsdGEgPSBjdXJlbnRUaW1lIC0gbGFzdENhbGw7XHJcbiAgICBjb25zdCB0b3RhbFRpbWUgPSBjdXJlbnRUaW1lIC0gc3RhcnRUaW1lO1xyXG4gICAgZnBzLnRleHRDb250ZW50ID0gTnVtYmVyKCgxIC8gZGVsdGEpICogMTAwMCkudG9TdHJpbmcoKTtcclxuICAgIHRpbWUudGV4dENvbnRlbnQgPSBgQ29sbGlzaW9ucyA6IFxcbiR7c2ltLmJyb2FkUGhhc2VDb2xsaXNpb25zLm1hcChlID0+IGAke2VbMF19IDogJHtlWzFdLmpvaW4oJywnKX1gKS5qb2luKCdcXG4nKX1gO1xyXG4gICAgdGltZTIudGV4dENvbnRlbnQgPSBgUnVuIHRpbWUgOiAke3RvdGFsVGltZSAvIDEwMDB9YDtcclxuICAgIGxhc3RDYWxsID0gY3VyZW50VGltZTtcclxuICAgIGdsLmNsZWFyQ29sb3IoMC43LCAwLjksIDAuOSwgMSk7XHJcbiAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUIHwgZ2wuREVQVEhfQlVGRkVSX0JJVCk7XHJcbiAgICBnbC5lbmFibGUoZ2wuQ1VMTF9GQUNFKTtcclxuICAgIGdsLmVuYWJsZShnbC5ERVBUSF9URVNUKTtcclxuICAgIGNvbnN0IGNhbWVyYU1hdHJpeCA9IHBsYXllci5jYW1NYXRyaXg7XHJcbiAgICBjb25zdCB7IHRyYW5zbGF0aW9uIH0gPSBtNC5kZWNvbXBvc2UoY2FtZXJhTWF0cml4KTtcclxuICAgIGNvbnN0IHVfdmlld1dvcmxkUG9zaXRpb24gPSB0cmFuc2xhdGlvbjtcclxuICAgIG9iamVjdHNUb0RyYXcuZm9yRWFjaCgob2JqKSA9PiB7XHJcbiAgICAgICAgb2JqLnNwcml0ZS5kcmF3KE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB1bmlmb3JtcyksIHsgdV9tYXRyaXg6IG9iai5waHlzaWNzLmNvbGxpZGVyLmdldE00KCksIHVfdmlld1dvcmxkUG9zaXRpb24gfSksIG9iai51bmlmb3JtcyksIGNhbWVyYU1hdHJpeCk7XHJcbiAgICB9KTtcclxuICAgIHBvaW50LmRyYXcoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB1bmlmb3JtcyksIHsgdV9tYXRyaXg6IG00LnNjYWxpbmcoNiwgNiwgNiksIHVfY29sb3I6IFswLCAwLCAwLCAxXSwgdV92aWV3V29ybGRQb3NpdGlvbiB9KSwgY2FtZXJhTWF0cml4KTtcclxuICAgIHBvaW50LmRyYXcoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB1bmlmb3JtcyksIHsgdV9tYXRyaXg6IG00LnNjYWxlKG00LnpSb3RhdGUobTQueVJvdGF0aW9uKE1hdGguUEkpLCAtTWF0aC5QSSAvIDIpLCA2LCA2LCA2KSwgdV9jb2xvcjogWzEsIDAuMSwgMSwgMV0sIHVfdmlld1dvcmxkUG9zaXRpb24gfSksIGNhbWVyYU1hdHJpeCk7XHJcbiAgICBmb3IgKGNvbnN0IFtpZCwgbWFuaWZvbGRdIG9mIHNpbS5jb2xsaXNpb25NYW5pZm9sZHMpIHtcclxuICAgICAgICBtYW5pZm9sZC5jb250YWN0cy5mb3JFYWNoKChjb250YWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHBvaW50XHJcbiAgICAgICAgICAgICAgICAuZHJhdyhPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oeyB1X21hdHJpeDogbTQudHJhbnNsYXRpb24oLi4uY29udGFjdC5QQSksIHVfY29sb3I6IFswLjYsIDAuNiwgMC4wLCAxXSB9LCB1bmlmb3JtcyksIHsgdV92aWV3V29ybGRQb3NpdGlvbiB9KSwgY2FtZXJhTWF0cml4KVxyXG4gICAgICAgICAgICAgICAgLmRyYXcoe1xyXG4gICAgICAgICAgICAgICAgdV9tYXRyaXg6IG00LnRyYW5zbGF0aW9uKC4uLmNvbnRhY3QuUEIpLFxyXG4gICAgICAgICAgICAgICAgdV9jb2xvcjogWzAuNSwgMC4xLCAwLjIsIDFdLFxyXG4gICAgICAgICAgICB9LCBjYW1lcmFNYXRyaXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZ2wudmlld3BvcnQoMCwgMCwgZ2wuY2FudmFzLndpZHRoLCBnbC5jYW52YXMuaGVpZ2h0KTtcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcclxufTtcclxubG9vcCgpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=