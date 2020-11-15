import React, { createContext } from 'react'

export const Store = createContext({})

const initialState = {
  user: 'user'
}

function RootReducer(state, action) {
  const { type, payload } = action
  switch (type) {
    case 'USER_LOGIN_SUCCESS':
      return { ...state, user: payload }
    default:
      return state
  }
}

export function StoreProvider(props) {
  return <Store.Provider value={initialState}>{props.children}</Store.Provider>
}
