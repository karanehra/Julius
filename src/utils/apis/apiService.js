// const API_BASE_URL = "http://api.karanehra.me";
const API_BASE_URL = "http://localhost:3000";
const CRON_SERVER_BASE_URL = API_BASE_URL + ":8800";
import Axios from "axios";
import store from "../../store";

let axios = Axios.create({
  headers: store.getState().usersReducer.userData
    ? {
        Authorization: "Bearer " + store.getState().usersReducer.userData.token
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
  return axios.get(CRON_SERVER_BASE_URL + "/stop/" + id);
};
export const callStartCronApi = id => {
  return axios.get(CRON_SERVER_BASE_URL + "/start/" + id);
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

export const callPostNoteApi = payload => {
  return axios.post(API_BASE_URL + "/notes", payload);
};

export const callGetUserBoardsApi = userId => {
  return axios.get(API_BASE_URL + "/boards/" + userId);
};

export const callPostBoardApi = payload => {
  return axios.post(API_BASE_URL + "/boards", payload);
};

export const callDeleteUserBoardApi = boardId => {
  return axios.delete(API_BASE_URL + "/boards/" + boardId);
};
