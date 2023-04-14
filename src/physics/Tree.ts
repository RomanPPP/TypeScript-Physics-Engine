import { AABB } from "romanpppmath";

const getBoundAabb = (aabb1: AABB, aabb2: AABB) => {
  const x1 = aabb1.min[0] < aabb2.min[0] ? aabb1.min[0] : aabb2.min[0];
  const x2 = aabb1.max[0] > aabb2.max[0] ? aabb1.max[0] : aabb2.max[0];
  const y1 = aabb1.min[1] < aabb2.min[1] ? aabb1.min[1] : aabb2.min[1];
  const y2 = aabb1.max[1] > aabb2.max[1] ? aabb1.max[1] : aabb2.max[1];
  const z1 = aabb1.min[2] < aabb2.min[2] ? aabb1.min[2] : aabb2.min[2];
  const z2 = aabb1.max[2] > aabb2.max[2] ? aabb1.max[2] : aabb2.max[2];
  return new AABB([x1, y1, z1], [x2, y2, z2]);
};
const isCollide = (aabb1: AABB, aabb2: AABB) => {
  if (
    aabb1.min[0] <= aabb2.max[0] &&
    aabb1.max[0] >= aabb2.min[0] &&
    aabb1.min[1] <= aabb2.max[1] &&
    aabb1.max[1] >= aabb2.min[1] &&
    aabb1.min[2] <= aabb2.max[2] &&
    aabb1.max[2] >= aabb2.min[2]
  ) {
    return true;
  }
  return false;
};
const getSize = (aabb: AABB) => {
  const area =
    Math.abs(aabb.max[0] - aabb.min[0]) *
    Math.abs(aabb.max[1] - aabb.min[1]) *
    Math.abs(aabb.max[2] - aabb.min[2]);
  return area;
};
type ObjectWithAABB = { getAABB(): AABB };
class Node<T> {
  aabb: AABB;
  isLeaf: boolean;
  parent: Node<T>;
  id: number;
  isChecked: boolean;
  left: Node<T>;
  right: Node<T>;
  object: any;
  height: number;
  queryId : number

  constructor(aabb: AABB, isLeaf: boolean, object: T, id: number) {
    this.aabb = aabb;
    this.isLeaf = isLeaf;
    this.parent = null;
    this.id = id;
    this.left = null;
    this.right = null;
    this.isChecked = false;
    this.object = object;
    this.height = 0;
    this.queryId = 0
  }
}
export default class Tree<T extends ObjectWithAABB> {
  root: Node<T>;
  elements: Map<number, Node<T>>;
  queryId : number
  collisions : [T,T][]
  getId : (o : T) =>number
  constructor() {
    this.root = null;
    this.elements = new Map();
    this.queryId = 0
    this.getId = null
    this.collisions = []
  }
  setKey( f : (o : T) =>   number){
    this.getId = f
  }
  updateQueryId(){
    this.queryId++
  }


  setUnchecked() {
    if (!this.root) return;
    const stack = [this.root];

    while (stack.length != 0) {
      const node = stack.pop();
      node.isChecked = false;
      if (node.isLeaf) {
        
        continue;
      }
      if (node.left) stack.push(node.left);
      if (node.right) stack.push(node.right);
    }
  }
  private getBestSibling(leaf: Node<T>) {
    let potential = this.root;

    while (!potential.isLeaf) {
      potential.height++;
      const size = getSize(potential.aabb);
      const combinedAABB = getBoundAabb(potential.aabb, leaf.aabb);
      const combinedSize = getSize(combinedAABB);
      let cost = combinedSize;
      let inherCost = combinedSize - size;

      let cost1: number;
      if (potential.left.isLeaf) {
        cost1 = getSize(potential.left.aabb) + inherCost;
      } else {
        cost1 =
          getSize(getBoundAabb(leaf.aabb, potential.left.aabb)) -
          getSize(potential.left.aabb) +
          inherCost;
      }

      let cost2: number;
      if (potential.right.isLeaf) {
        cost2 = getSize(potential.right.aabb) + inherCost;
      } else {
        cost2 =
          getSize(getBoundAabb(leaf.aabb, potential.right.aabb)) -
          getSize(potential.right.aabb) +
          inherCost;
      }
      if (cost < cost1 && cost < cost2) return potential;
      if (cost1 < cost2) {
        potential = potential.left;
      } else potential = potential.right;
    }
    return potential;
  }
  insert(object: T) {
    const aabb = object.getAABB();
    const id = this.getId(object)
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
      if (oldParent.left === sibling) oldParent.left = newParent;
      else oldParent.right = newParent;

      newParent.left = sibling;
      newParent.right = leaf;

      sibling.parent = newParent;
      leaf.parent = newParent;
    } else {
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
  balance(node: Node<T>) {
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
        } else {
          right.parent.right = right;
        }
      } else this.root = right;
      if (right.left.height > rightright.height) {
        right.right = rightleft;
        node.right = rightright;
        rightright.parent = node;

        node.height = 1 + Math.max(left.height, rightright.height);
        right.height = 1 + Math.max(node.height, rightleft.height);
      } else {
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
        } else {
          left.parent.right = left;
        }
      } else this.root = left;
      if (leftleft.height > leftright.height) {
        left.right = leftleft;
        node.left = leftright;
        leftright.parent = node;

        node.height = 1 + Math.max(right.height, leftright.height);
        left.height = 1 + Math.max(node.height, leftleft.height);
      } else {
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
  getCollisions(object: T) {
    const aabb = object.getAABB();
    const cols: T[] = [];
   // this.elements.get(this.getId(object)).queryId = this.queryId
    const iter = (_node: Node<T>) => {
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

  remove(id: number) {
    const leaf = this.elements.get(id);
    if (!leaf) return;

    if (leaf === this.root) {
      this.root = null;
      return;
    }
    const parent = leaf.parent;
    const grandParent = parent.parent;
    let sibling: Node<T>;
    if (parent.left === leaf) sibling = parent.right;
    else sibling = parent.left;

    if (grandParent) {
      if (grandParent.left === parent) grandParent.left = sibling;
      else grandParent.right = sibling;

      sibling.parent = grandParent;

      let _node = grandParent;
      while (_node) {
        _node = this.balance(_node);
        _node.height = 1 + Math.max(_node.right.height, _node.left.height);
        _node = _node.parent
      }

    } else {
      this.root = sibling;
      sibling.parent = null;
    }
    this.elements.delete(id);
  }
  
  toArray(node: Node<T>) {
    const iter = (leaf: Node<T>) => {
      if (!leaf) {
        return null;
      }
      if (leaf.isLeaf) return leaf.id;
      else return [iter(leaf.left), iter(leaf.right)];
    };
    if (!node) node = this.root;
    return iter(node);
  }
  _getCollisions(){
    this.collisions = []
    if(!this.root || this.root.isLeaf) return this.collisions
    this.setUnchecked()
    this._getCollisionsHelper(this.root.left, this.root.right)
    return this.collisions

  }
  _getCollisionsHelper(node1 : Node<T>, node2 : Node<T>){
    if(node1.isLeaf){
      if(node2.isLeaf){
        if(isCollide(node1.aabb, node2.aabb)){
          this.collisions.push([node1.object, node2.object])
        }
      }
      else{
        this.crossChildren(node2)
        this._getCollisionsHelper(node1, node2.right)
        this._getCollisionsHelper(node1, node2.left)

      }
    }
    else{
      if(node2.isLeaf){
        this.crossChildren(node1)
        this._getCollisionsHelper(node1.right, node2)
        this._getCollisionsHelper(node1.left, node2)
      }
      else{
        this.crossChildren(node1)
        this.crossChildren(node2)
        this._getCollisionsHelper(node1.right, node2.right)
        this._getCollisionsHelper(node1.left, node2.left)
        this._getCollisionsHelper(node1.right, node2.left)
        this._getCollisionsHelper(node1.left, node2.right)
      }
    }
  }
  crossChildren(node : Node<T>){
    if(!node.isChecked){
      this._getCollisionsHelper(node.right, node.left)
      node.isChecked = true
    }
  }
}
