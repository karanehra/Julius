import React, { useState } from 'react'
import './index.scss'
import { Paper, TextField, Button } from '@material-ui/core'
import { callUserSignupApi } from '../../utils/api/user'

const LoginView: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleFormSubmission = async e => {
    e.preventDefault()
    const { status, data } = await callUserSignupApi({
      email: username,
      password
    })

    if (status === 200) {
      console.log(data)
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
