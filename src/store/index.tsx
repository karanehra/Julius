import React, { createContext, useReducer, useContext, Dispatch } from 'react'
import RootReducer from '../reducers/index'

const StoreContextObject = createContext(null)

const initialState = JSON.parse(localStorage.getItem('JULIUS_STORE')) || {}

export const AppStore = {
  state: null,
  dispatch: null
}

export const useStore = (): { store: any; dispatch: Dispatch<any> } => {
  return useContext(StoreContextObject)
}

export function StoreProvider(props) {
  const [store, dispatch] = useReducer(RootReducer, initialState)
  AppStore.state = store
  AppStore.dispatch = dispatch
  return (
    <StoreContextObject.Provider value={{ store, dispatch }}>
      {props.children}
    </StoreContextObject.Provider>
  )
}
