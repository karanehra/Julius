import React, { useState, FunctionComponent } from 'react'
import { Paper, TextField, Button } from '@material-ui/core'
import { callUserLoginpApi } from '@utils/api/user'
import history from '@utils/history'
import { DASHBOARD_HOME_PAGE_ROUTE } from '@constants/routerUrls'
import { userLoginSuccessAction } from '@actions'
import { useStore } from '@store'
import './index.scss'

const LoginView: FunctionComponent = () => {
  const { dispatch } = useStore()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleFormSubmission = async e => {
    e.preventDefault()

    const { status, data } = await callUserLoginpApi({ email: username, password })

    if (status === 200) {
      dispatch(userLoginSuccessAction(data.data))
      history.push(DASHBOARD_HOME_PAGE_ROUTE)
    }
  }

  return (
    <div className='login-wrapper'>
      <Paper className='login-box'>
        <h1>Julius</h1>
        <h3>Login</h3>
        <form onSubmit={handleFormSubmission}>
          <TextField
            label='username'
            margin='normal'
            autoComplete='on'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            label='password'
            type='password'
            margin='normal'
            autoComplete='on'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <br />
          <br />
          <Button type='submit'>Submit</Button>
        </form>
      </Paper>
    </div>
  )
}

export default LoginView
