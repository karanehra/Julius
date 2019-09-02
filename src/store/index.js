import { createStore, combineReducers, applyMiddleware } from "redux";
import dashboardReducer from "../reducers/dashboard.reducer";
import feedsReducer from "../reducers/feeds.reducer";
import { logger } from "redux-logger";
import thunk from "redux-thunk";
import articlesReducer from "../reducers/articles.reducer";

export default createStore(
  combineReducers({ dashboardReducer, feedsReducer, articlesReducer }),
  {},
  applyMiddleware(logger, thunk)
);
