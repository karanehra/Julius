import { getUUID } from "./helpers";

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
    if (this.ID == ID) {
      if (this.parent) {
        node.level = this.level++;
      } else {
        this.level = 0;
        node.level = 1;
      }
      this.children.push(node);
      return;
    }
    for (let child of this.children) {
      if (child.ID === ID) {
        node.parent = ID;
        node.level = this.level++;
        child.children.push(node);
        return;
      } else {
        if (child.children.length) {
          for (let subchild of child.children) {
            this.addNodeByID(subchild, ID);
          }
        } else {
          return;
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
