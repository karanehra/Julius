import React, { useState, useEffect } from 'react'
import GenericText from '@shared/genericText'
import { TextField } from '@material-ui/core/'
import { Button } from '@material-ui/core'
import { userLoginNewAction } from '../../../actions/users.actions'
import { useDispatch } from 'react-redux'
import { openSnackbarAction } from '../../../actions/appstate.actions'

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    emailError: '',
    passwordError: ''
  })
  const { email, password } = values
  const dispatch = useDispatch()

  const handleChange = event => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = async () => {
    let res = await userLoginNewAction({ email, password })
    if (res) {
      dispatch(
        openSnackbarAction({ type: 'SUCCESS', message: 'Login', isOpen: true })
      )
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
