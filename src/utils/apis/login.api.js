import Axios from "axios";
import crypto from "crypto";
// const API_BASE_URL = "http://api.karanehra.me";
const API_BASE_URL = "http://localhost:3001";

Axios.interceptors.request.use(
  req => {
    console.log(req);
    let cipher = crypto.createCipheriv(
      "aes-256-gcm",
      "30818902818100c179bef08ae36c77ce93a6c6ffe4027da77ce7fd6c2ece180af5b902451bd324b656415d8e325ac76dea379190f63aa52c1fabf2e568295071e0b589236c303815ec3987b654e706e478c02bc81156a133f1ec1867bf52f0ddf7e8590647ebea92ba3f8d69e21fb7b2d25d4527088ae29326b4aff7e1553c9a6596d594d05f870203010001",
      "afasfasfasfasfasfasfaf"
    );
    req.data = {};
    return req;
  },
  err => {
    console.log(err);
    return Promise.reject(err);
  }
);

export const callUserSignupApi = payload => {
  return Axios.post(API_BASE_URL + "/users/signup", payload);
};

export const callUserLoginpApi = payload => {
  return Axios.post(API_BASE_URL + "/users/login", payload);
};
