import { DEVICE_DETECT } from "../constants/actionTypes";
const initialState = {
  isMobile: false
};

export default function deviceReducer(state = initialState, action) {
  switch (action.type) {
    case DEVICE_DETECT:
      return {
        isMobile: action.payload
      };
    default:
      return state;
  }
}
