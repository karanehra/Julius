// const API_BASE_URL = "http://api.karanehra.me";
const API_BASE_URL = "http://localhost:3001";
const CRON_SERVER_BASE_URL = API_BASE_URL + ":8800";
import Axios from "axios";
import store from "../../store";

let axios = Axios.create({
  headers: store.getState().usersReducer.userData
    ? {
        Authorization: "Bearer " + store.getState().usersReducer.token
      }
    : {}
});

export const callGetArticlesApi = () => {
  return axios.get(API_BASE_URL + "/articles/");
};

export const callGetStatusDataApi = () => {
  return axios.get(API_BASE_URL + "/datasets");
};

export const callGetFeedsApi = () => {
  return axios.get(API_BASE_URL + "/feeds/");
};

export const callAddFeedApi = payload => {
  return axios.post(API_BASE_URL + "/feeds/", payload);
};

export const callGetCronDataApi = () => {
  return axios.get(CRON_SERVER_BASE_URL);
};

export const callGetGraphDataApi = () => {
  return axios.get(API_BASE_URL + "/datasets/dataset");
};

export const callStopCronApi = id => {
  return axios.get(CRON_SERVER_BASE_URL + `/stop/${id}`);
};
export const callStartCronApi = id => {
  return axios.get(CRON_SERVER_BASE_URL + `/start/${id}`);
};

export const callGetLogsApi = () => {
  return axios.get(API_BASE_URL + "/logs");
};

export const callClearLogsApi = () => {
  return axios.get(API_BASE_URL + "/logs/clear");
};

export const callParseArticleApi = payload => {
  return axios.post(API_BASE_URL + "/articles/parse", payload);
};

export const callGetNotesApi = payload => {
  return axios.get(API_BASE_URL + "/notes", payload);
};

export const callPostCardApi = payload => {
  return axios.post(API_BASE_URL + "/cards", payload);
};

export const callPutCardApi = (payload, cardId) => {
  return axios.put(API_BASE_URL + `/cards/${cardId}`, payload);
};

export const callGetUserBoardsApi = userId => {
  return axios.get(API_BASE_URL + `/boards/${userId}`);
};

export const callPostBoardApi = payload => {
  return axios.post(API_BASE_URL + "/boards", payload);
};

export const callDeleteUserBoardApi = boardId => {
  return axios.delete(API_BASE_URL + `/boards/${boardId}`);
};

/**
 * Calls the create new tree endpoint
 * @param {Object} payload Request payload
 * @param {string} payload.title Tree title
 * @param {string} payload.userID Tree owner userID
 * @param {Object} payload.representation Tree object representation
 */
export const callPostTreeApi = payload => {
  return Axios.post(API_BASE_URL + "/tree", payload);
};

/**
 * Calls the create new tree node endpoint
 * @param {Object} payload Request payload
 * @param {string} payload.title Node title
 * @param {string} payload.parent Node parent's nodeID
 * @param {Array<string>} payload.children Node's children nodeID
 */
export const callPostTreeNodeApi = payload => {
  return Axios.post(API_BASE_URL + "/node", payload);
};

/**
 * Gets all trees associated with the given userID
 * @param {string} userID The userID whose trees to get
 */
export const callGetUserTreesApi = userID => {
  return Axios.get(API_BASE_URL + `/tree/user/${userID}`);
};

/**
 * Updates the tree with given ID with the provided payload
 * @param {string} treeID The treeID to update
 * @param {Object} payload The treeID to update
 * @param {string=} payload.title The tree title
 * @param {Object=} payload.representation The tree object representation
 */
export const callPatchTreeApi = (treeID, payload) => {
  return Axios.patch(API_BASE_URL + `/tree/${treeID}`, payload);
};
