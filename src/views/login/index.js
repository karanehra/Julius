import React, { Component } from "react";
import { Paper, TextField, Button } from "@material-ui/core/";
import "@styles/views/login.scss";
import GenericText from "@shared/genericText";
import { connect } from "react-redux";

class LoginPage extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    console.log(this.state);
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="login-wrapper">
        <Paper className="login-box">
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
    );
  }
}

const mapStateToProps = state => ({
  userData: state.usersReducer.userData,
  loading: state.usersReducer.loading
});

export default connect(mapStateToProps)(LoginPage);
