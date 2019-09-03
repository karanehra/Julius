import { createStore, combineReducers, applyMiddleware } from "redux";
import dashboardReducer from "../reducers/dashboard.reducer";
import feedsReducer from "../reducers/feeds.reducer";
import { logger } from "redux-logger";
import thunk from "redux-thunk";
import articlesReducer from "../reducers/articles.reducer";
import cronReducer from '../reducers/cron.reducer';

export default createStore(
  combineReducers({ dashboardReducer, feedsReducer, articlesReducer,cronReducer }),
  {},
  applyMiddleware(logger, thunk)
);
