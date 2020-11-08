import { DEVICE_DETECT } from "../constants/actionTypes";

export const deviceDetectAcion = isMobile => ({
  type: DEVICE_DETECT,
  payload:isMobile
})
