import React, { useState, FunctionComponent } from 'react'
import { Paper, TextField, Button } from '@material-ui/core'
import { callUserLoginpApi } from '../../utils/api/user'
import history from '../../utils/history'
import { DASHBOARD_HOME_PAGE_ROUTE, DASHBOARD_PAGE_ROUTE } from '../../constants/routerUrls'
import './index.scss'
import { useStore } from '../../store'
import { userLoginSuccessAction } from '../../actions/index'

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
    <Paper>
      <form onSubmit={handleFormSubmission}>
        <TextField label='username' value={username} onChange={e => setUsername(e.target.value)} />
        <TextField
          label='password'
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Paper>
  )
}

export default LoginView
