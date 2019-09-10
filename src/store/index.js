import { createStore, combineReducers, applyMiddleware } from "redux";
import dashboardReducer from "../reducers/dashboard.reducer";
import feedsReducer from "../reducers/feeds.reducer";
import { logger } from "redux-logger";
import thunk from "redux-thunk";
import articlesReducer from "../reducers/articles.reducer";
import cronReducer from "../reducers/cron.reducer";
import graphsReducer from "../reducers/graphs.reducer";
import logsReducer from "../reducers/logs.reducer";
import deviceReducer from "../reducers/device.reducer";

let persistedState = JSON.parse(localStorage.getItem("juliusStore")) || {};

export default createStore(
  combineReducers({
    dashboardReducer,
    feedsReducer,
    articlesReducer,
    cronReducer,
    graphsReducer,
    logsReducer,
    deviceReducer
  }),
  persistedState,
  applyMiddleware(logger, thunk)
);
