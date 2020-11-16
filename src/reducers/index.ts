export default function RootReducer(state, action) {
  const { type, payload } = action
  let newState
  switch (type) {
    case 'USER_LOGIN_SUCCESS':
      newState = { ...state, user: payload }
    default:
      newState = state
  }
  console.log(type, newState)
  return newState
}
