import Axios from "axios";
// const API_BASE_URL = "http://api.karanehra.me";
const API_BASE_URL = "http://localhost:3001";

export const callUserSignupApi = payload => {
  return Axios.post(API_BASE_URL + "/users/signup", payload);
};

export const callUserLoginpApi = payload => {
  return Axios.post(API_BASE_URL + "/users/login", payload);
};
