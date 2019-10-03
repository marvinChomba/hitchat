import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../Layout/Icon';
import Back from '../../Layout/Back';
import './oauth.css';

export default class index extends Component {
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
            <div className='facebook'>
              {/* eslint-disable-next-line */}
              <a
                className='text-white'
                href='https://hit-chat.herokuapp.com/user/facebook'
              >
                Facebook
              </a>
            </div>
            <div className='google'>
              {/* eslint-disable-next-line */}
              <a
                className='text-white'
                href='https://hit-chat.herokuapp.com/user/google'
              >
                Google
              </a>
            </div>
            <div className='email bg-white'>
              <Link to='/signup-email' className='link'>
                Email
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
