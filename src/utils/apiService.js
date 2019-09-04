const API_BASE_URL = "http://35.238.236.191";
const CRON_SERVER_BASE_URL = API_BASE_URL + ":8800/";
import Axios from "axios";

export const callGetArticlesApi = () => {
  return Axios.get(API_BASE_URL + "/articles");
};

export const callGetStatusDataApi = () => {
  return Axios.get(API_BASE_URL);
};

export const callGetFeedsApi = () => {
  return Axios.get(API_BASE_URL + "/feed");
};

export const callAddFeedApi = payload => {
  return Axios.post(API_BASE_URL + "/feed", payload);
};

export const callGetCronDataApi = () => {
  return Axios.get(CRON_SERVER_BASE_URL);
};

export const callGetGraphDataApi = () => {
  return Axios.get(API_BASE_URL + "/dataset");
};
