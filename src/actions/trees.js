import api from "../data/api";

const uuidv4 = require("uuid/v4");

/**
 * Load a single tree
 * @param {string} treeId The tree's unique identifier.
 */
export function loadTree(treeId) {
  return dispatch => {
    api.getTree(treeId).then(data => {
      dispatch({
        type: "LOAD_TREE_END",
        payload: data
      });
    });
  };
}

export function loadTreeForPerson(personId) {
  return dispatch => {
    api.getTreeForPerson(personId).then(data => {
      dispatch({
        type: "LOAD_TREE_END",
        payload: data
      });
    });
  };
}

export function loadTrees() {
  return dispatch => {
    api
      .indexTrees()
      .then(trees => {
        dispatch({
          type: "LOAD_TREES_END",
          payload: { trees }
        });
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          // do something.
        }
      });
  };
}

export function addTreeStart() {
  return { type: "ADD_TREE_START" };
}

export function addTreeCancel() {
  return { type: "ADD_TREE_CANCEL" };
}

export function addTreeEnd(newTree) {
  const tree = { _id: uuidv4(), ...newTree };
  api.postTree(tree);
  return {
    type: "ADD_TREE_END",
    payload: { tree }
  };
}

export function editTreeStart() {
  return { type: "EDIT_TREE_START" };
}

export function editTreeCancel() {
  return { type: "EDIT_TREE_CANCEL" };
}

export function editTreeEnd(tree) {
  api.patchTree(tree);
  return {
    type: "EDIT_TREE_END",
    payload: { tree }
  };
}
