import React, { Component } from 'react'
// eslint-disable-next-line
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../../store/actions/authActions"

class index extends Component {

  responseGoogle = (response) => {
    const dets = {
      email:response.profileObj.email,
      name:response.profileObj.name
    }
    console.log(dets)
    sessionStorage.clear();
    this.props.registerUser(dets);
  }

  render() {
    return (
      <div>
        <GoogleLogin
          clientId="274859775950-4sgco4jltovkmv9a1tu00gprpi2naimv.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={'single_host_origin'}
        />,
      </div>
    )
  }
}

export default connect(undefined, { registerUser })(withRouter(index))