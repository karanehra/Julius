// const API_BASE_URL = "http://35.238.236.191";
const API_BASE_URL = "http://localhost:3000";
const CRON_SERVER_BASE_URL = API_BASE_URL + ":8800";
import Axios from "axios";

export const callGetArticlesApi = () => {
  return Axios.get(API_BASE_URL + "/articles/");
};

export const callGetStatusDataApi = () => {
  return Axios.get(API_BASE_URL + "/datasets");
};

export const callGetFeedsApi = () => {
  return Axios.get(API_BASE_URL + "/feeds/");
};

export const callAddFeedApi = payload => {
  return Axios.post(API_BASE_URL + "/feeds/", payload);
};

export const callGetCronDataApi = () => {
  return Axios.get(CRON_SERVER_BASE_URL);
};

export const callGetGraphDataApi = () => {
  return Axios.get(API_BASE_URL + "/datasets/dataset");
};

export const callStopCronApi = id => {
  return Axios.get(CRON_SERVER_BASE_URL + "/stop/" + id);
};
export const callStartCronApi = id => {
  return Axios.get(CRON_SERVER_BASE_URL + "/start/" + id);
};

export const callGetLogsApi = payload => {
  return Axios.get(API_BASE_URL + "/logs");
};

export const callParseArticleApi = payload => {
  return Axios.post(API_BASE_URL + "/articles/parse", payload);
};
