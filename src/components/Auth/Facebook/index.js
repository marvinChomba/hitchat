import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login';


export default class index extends Component {
  responseFacebook = (response) => {
    console.log(response);
    console.log(sessionStorage)
  }
  render() {
    return (
      <div>
        {/* <FacebookLogin
          appId="853169785064809"
          fields="name,email,picture"
          onClick={() => this.props.componentClicked()}
          callback={this.responseFacebook} /> */}
        <FacebookLogin
          appId="853169785064809"
          callback={this.responseFacebook}
          render={renderProps => (
            <button onClick={renderProps.onClick}>This is my custom FB button</button>
          )}
        />
      </div>
    )
  }
}


// onClick = { componentClicked }
