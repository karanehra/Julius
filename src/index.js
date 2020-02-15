import '@babel/polyfill'
import ReactDOM from 'react-dom'
import React, { Suspense } from 'react'
import Julius from './julius'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import { createMuiTheme } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import theme from './constants/theme'
import history from '@utils/history'
import Loader from './shared/loader'

const MUI_THEME = createMuiTheme(theme)

store.subscribe(() => {
  localStorage.setItem('juliusStore', JSON.stringify(store.getState()))
})

ReactDOM.render(
  <ThemeProvider theme={MUI_THEME}>
    <Provider store={store}>
      <Router history={history}>
        <Suspense fallback={<Loader />}>
          <Julius />
        </Suspense>
      </Router>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
)
