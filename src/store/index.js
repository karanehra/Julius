import { createStore, combineReducers, applyMiddleware } from "redux";
import dashboardReducer from "../reducers/dashboard.reducer";
import { logger } from "redux-logger";
import thunk from "redux-thunk";

export default createStore(
  combineReducers({ dashboardReducer }),
  {},
  applyMiddleware(logger,thunk)
);
