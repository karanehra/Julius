import React, { useState } from 'react'
import './index.scss'
import { Paper, TextField, Button } from '@material-ui/core'

const LoginView: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleFormSubmission = () => {
    console.log('submit')
  }
  return (
    <Paper>
      <form onSubmit={handleFormSubmission}>
        <TextField
          label='username'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
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
