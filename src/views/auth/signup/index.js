import React, { useState } from 'react'
import GenericText from '@shared/genericText'
import { TextField } from '@material-ui/core/'
import { Button } from '@material-ui/core'
import Validator from '../../../utils/validator'
import { callUserSignupApi } from '@utils/apis/login.api'

const SignupPage = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    emailError: '',
    passwordError: ''
  })

  const { email, password, emailError, passwordError } = values

  const handleChange = event => {
    const { name, value } = event.target
    console.log(name, value)
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = async () => {
    let emailValidator = new Validator(email).email().required()
    let passwordValidator = new Validator(password).required()
    setValues({
      ...values,
      emailError: !emailValidator.isValid,
      passwordError: !passwordValidator.isValid
    })
    if (emailValidator.isValid && passwordValidator.isValid) {
      try {
        let res = await callUserSignupApi({
          email,
          password,
          firstName: 'Karan',
          lastName: 'Nehra',
          role: 'MASTER'
        })
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <React.Fragment>
      <GenericText size={34} gutters={35} bold>
        Signup
      </GenericText>
      <TextField
        label='Email'
        value={email}
        name='email'
        variant='outlined'
        onChange={handleChange}
        className='field'
        error={emailError}
        helperText={emailError ? 'Enter a valid Email' : ''}
      />
      <TextField
        label='Password'
        value={password}
        name='password'
        variant='outlined'
        type='password'
        onChange={handleChange}
        error={passwordError}
        className='field'
      />
      <Button color='primary' variant='contained' onClick={handleSubmit}>
        Signup
      </Button>
    </React.Fragment>
  )
}

export default SignupPage
