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
    for (let child of node.children) {
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

  /**
   * Instantiates a new node
   * @param {string} title The node's title
   */
  constructor(title) {
    this.title = title;
    this.ID = getUUID(5);
  }
}
