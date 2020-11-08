import { createStore, combineReducers, applyMiddleware } from 'redux'
import dashboardReducer from '../reducers/dashboard.reducer'
import { logger } from 'redux-logger'
import thunk from 'redux-thunk'
import deviceReducer from '../reducers/device.reducer'
import usersReducer from '../reducers/users.reducer'
import appstateReducer from '../reducers/appstate.reducer'

let persistedState = JSON.parse(localStorage.getItem('juliusStore')) || {}

export default createStore(
  combineReducers({
    dashboardReducer,
    deviceReducer,
    usersReducer,
    appstateReducer
  }),
  persistedState,
  applyMiddleware(logger, thunk)
)
