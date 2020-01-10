import React, { Component } from 'react'
import { Paper, TextField, Button } from '@material-ui/core/'
import { isMobile } from 'react-device-detect'
import GenericText from '@shared/genericText'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { userLoginAsyncAction } from '@actions/users.actions'
import { HOME_ROUTE_PATH } from '@constants/routeUrls'
import { deviceDetectAcion } from '@actions/device.actions'
import '@styles/views/login.scss'

class LoginPage extends Component {
  state = {
    email: '',
    password: ''
  }

  componentDidMount() {
    this.props.dispatch(deviceDetectAcion(isMobile))
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = () => {
    this.props
      .dispatch(userLoginAsyncAction(this.state))
      .then(res => {
        if (res.status === 200) {
          this.props.history.push(HOME_ROUTE_PATH)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const { email, password } = this.state
    const { isMobile } = this.props
    return (
      <div className="login-wrapper">
        <Paper className={isMobile ? 'login-box mb' : 'login-box'}>
          <GenericText size={34} bold gutters={35}>
            Login To Julius
          </GenericText>
          <TextField
            label="Email"
            value={email}
            name="email"
            variant="outlined"
            onChange={this.handleChange}
            className="field"
          />
          <TextField
            label="Password"
            value={password}
            name="password"
            variant="outlined"
            type="password"
            onChange={this.handleChange}
            className="field"
          />
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleSubmit}
          >
            Login
          </Button>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userData: state.usersReducer.userData,
  loading: state.usersReducer.loading,
  isMobile: state.deviceReducer.isMobile
})

export default withRouter(connect(mapStateToProps)(LoginPage))
