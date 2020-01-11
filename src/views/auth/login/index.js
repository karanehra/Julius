import React, { useState, useEffect } from 'react'
import GenericText from '@shared/genericText'
import { TextField } from '@material-ui/core/'
import { Button } from '@material-ui/core'
import { callUserLoginpApi } from '@utils/apis/login.api'

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    emailError: '',
    passwordError: ''
  })
  const { email, password } = values

  useEffect(() => {
    console.log('adsadsda')
  })

  const handleChange = event => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = async () => {
    try {
      let res = await callUserLoginpApi({ email, password })
      if (res.status === 200) {
        console.log('done')
      }
    } catch (e) {
      console.log(e)
    }
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
