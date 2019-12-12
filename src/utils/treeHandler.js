import { getUUID } from "./helpers";

export class TreeHandler {
  title = null;
  parent = null;
  /**@type {Array<Node>} */
  children = [];

  /**
   * Instantiates a new tree
   * @param {string=} title The name of the tree
   */
  constructor(title) {
    if (title) this.title = title;
  }

  /**
   * Adds a node to the topmost node
   * @param {Node} node The node to append to the topmost node
   */
  addNodeToMaster(node) {
    this.children.push(node);
  }

  /**
   * Appends the given node to a node with the given ID
   * @param {Node} node The node to append
   * @param {string} ID The ID of the parent node
   */
  appendToNodeByID(node, ID) {
    for (let child of this.children) {
      if (child.ID === ID) {
        child.children.push(node);
        return;
      } else {
        for (let child1 of child.children) {
          this.appendToNodeByID(child1, ID);
        }
      }
    }
  }
}

export class Node {
  title = null;
  /**@type {Node} */
  parent = null;
  /**@type {Array<Node>} */
  children = [];
  ID = null;
  level = null;

  /**
   * Instantiates a new node
   * @param {string} title The node's title
   */
  constructor(title) {
    this.title = title;
    this.ID = getUUID(5);
  }
  /**
   * Adds a node to the topmost node
   * @param {Node} node The node to append to the topmost node
   */
  addNode(node) {
    node.parent = this.ID;
    if (this.parent) {
      node.level = this.level++;
    } else {
      this.level = 0;
      node.level = 1;
    }
    this.children.push(node);
  }

  /**
   * Appends the given node to a node with the given ID
   * @param {Node} node The node to append
   * @param {string} ID The ID of the parent node
   */
  addNodeByID(node, ID) {
    for (let child of this.children) {
      if (child.ID === ID) {
        node.parent = ID;
        child.children.push(node);
        return;
      } else {
        for (let subchild of child.children) {
          this.addNodeByID(subchild, ID);
        }
      }
    }
  }
}

/**
 * Decomposes a tree into a plain js object
 * @param {Node} tree The tree to decompose to an object
 */
export const decomposeTreeToObject = tree => {
  let a = {
    title: tree.title,
    children: []
  };
  for (let child of tree.children) {
    let p = decomposeTreeToObject(child);
    a.children.push(p);
  }
  return a;
};

/**
 * Composes a tree from a plain js object representation
 * @param {Object} object The object to compose a tree from
 */
export const composeTreeFromObject = object => {
  if (object) {
    let n = new Node(object.title);
    for (let child of object.children) {
      n.children.push(composeTreeFromObject(child));
    }
    return n;
  }
};
