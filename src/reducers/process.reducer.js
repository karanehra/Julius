import { GET_PROCESS_SUCCESS } from '../constants/actionTypes'

const intialState = {
  processData: null
}

export default function processReducer(state = intialState, action) {
  const { payload, type } = action
  switch (type) {
    case GET_PROCESS_SUCCESS:
      return {
        ...state,
        processData: payload
      }
    default:
      return state
  }
}
