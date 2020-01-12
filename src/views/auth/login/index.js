import React, { useState } from 'react'
import GenericText from '@shared/genericText'
import { TextField } from '@material-ui/core/'
import { Button } from '@material-ui/core'

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    emailError: '',
    passwordError: ''
  })
  const { email, password } = values

  const handleChange = event => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = () => {
    console.log('submit')
  }

  return (
    <React.Fragment>
      <GenericText size={34} bold gutters={35}>
        Login To Julius
      </GenericText>
      <TextField
        label='Email'
        value={email}
        name='email'
        variant='outlined'
        onChange={handleChange}
        className='field'
      />
      <TextField
        label='Password'
        value={password}
        name='password'
        variant='outlined'
        type='password'
        onChange={handleChange}
        className='field'
      />
      <Button color='primary' variant='contained' onClick={handleSubmit}>
        Login
      </Button>
    </React.Fragment>
  )
}

export default Login
