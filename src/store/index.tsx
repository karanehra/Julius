import React, { createContext, useReducer, useContext, Dispatch } from 'react'
import RootReducer from '../reducers/index'

export const Store = createContext(null)

const initialState = {
  user: 'users'
}

export const useStore = (): { store: any; dispatch: Dispatch<any> } => {
  return useContext(Store)
}

export function StoreProvider(props) {
  const [store, dispatch] = useReducer(RootReducer, initialState)
  return <Store.Provider value={{ store, dispatch }}>{props.children}</Store.Provider>
}
