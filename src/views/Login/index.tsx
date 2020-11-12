import React, { useState } from 'react'
import { Paper, TextField, Button } from '@material-ui/core'
import { callUserSignupApi } from '../../utils/api/user'
import history from '../../utils/history'
import { DASHBOARD_PAGE_ROUTE } from '../../constants/routerUrls'
import { USER_TYPE } from '../../utils/interfaces'
import './index.scss'

const LoginView: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleFormSubmission = async e => {
    e.preventDefault()

    const { status } = await callUserSignupApi({
      email: username,
      userType: USER_TYPE.MASTER,
      username,
      password
    })

    if (status === 200) {
      history.push(DASHBOARD_PAGE_ROUTE)
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
