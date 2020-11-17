export default function RootReducer(state, action) {
  const { type, payload } = action
  let newState
  switch (type) {
    case 'USER_LOGIN_SUCCESS':
      newState = { ...state, user: payload }
      break
    default:
      newState = state
      break
  }
  localStorage.setItem('JULIUS_STORE', JSON.stringify(newState))
  return newState
}
