import React, { Component } from 'react';
import Icon from '../../Layout/Icon';
import Back from '../../Layout/Back';
import './oauth.css';

export default class index extends Component {
  change = dest => {
    window.location.href = `https://hit-chat.herokuapp.com/user/${dest}`;
  };
  onEmail = () => {
    this.props.history.push('/signup-email');
  };

  render() {
    return (
      <div className='container pt-3'>
        <div className='d-flex align-items-center'>
          <Back dest='/' />
          <Icon />
        </div>
        <h4 className='text-center mt-2'>Sign up with: </h4>
        <div className='d-flex justify-content-center'>
          <div className='oAuthLinks text-center'>
            <div className='facebook ' onClick={() => this.change('facebook')}>
              <p className='text-white my-auto'>Facebook</p>
            </div>
            <div className='google ' onClick={() => this.change('google')}>
              <p className='text-white my-auto'>Google</p>
            </div>
            <div className='email bg-white' onClick={this.onEmail}>
              <p className='link my-auto'>Email</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
