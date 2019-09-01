const API_BASE_URL = "http://35.238.236.191/"
import { Axios } from 'axios';

export const callGetArticlesApi = () => {
  return Axios.get(API_BASE_URL + 'articles');
}