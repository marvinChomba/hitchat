import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import PropTypes from "prop-types";
import { registerUser } from '../../../store/actions/authActions';
import Icon from '../../Layout/Icon';

import Back from '../../Layout/Back';
const validator = require('validator');

class index extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    number: '',
    errors: {},
    checked: false
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/discover');
    }
  }

  toggleHandler = e => {
    // toggle checking for accepting terms and conditions
    this.setState(prevState => {
      return {
        checked: !prevState.checked
      };
    });
  };

  onChangeHandler = e => {
    // handler for change in input
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  onSubmitHandler = e => {

    //submit handler
    e.preventDefault();
    const errors = {};

    const user = { ...this.state };

    if (!validator.isEmail(user.email))
      errors.email = 'Please enter a valid email.';
    if (!validator.isAscii(user.username))
      errors.username = 'Please enter alphanumeric characters only';
    if (!validator.isMobilePhone(user.number.toString()))
      errors.number = 'Invalid phone number';
    if (user.password.length < 6) errors.password = 'Password is too short';
    if (!this.state.checked) {
      errors.register = 'Please accept terms and conditions.';
    }
    if (Object.keys(errors).length === 0) {
      this.setState({
        errors: {}
      });
      this.props.registerUser(user, this.props.history);
    } else {
      this.setState({
        errors
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className='container pt-3'>
        <div className='d-flex align-items-center'>
          <Back dest='/signup' />
          <Icon />
        </div>
        <div className='d-flex justify-content-center mt-4'>
          <form
            className='form-group'
            noValidate
            onSubmit={this.onSubmitHandler}
          >
            <div className='mb-2'>
              <label htmlFor='username'>Pofile name</label>
              <input
                value={this.props.name}
                type='text'
                className='form-control'
                onChange={this.onChangeHandler}
                error={errors.name}
                id='username'
                autoComplete='off'
                style={inputStyle}
              />
              <p className='text-center text-white'>
                {this.state.errors.username ? this.state.errors.username : null}
              </p>
            </div>
            <div className='mb-2'>
              <label htmlFor='email'>Email</label>
              <input
                value={this.props.email}
                type='email'
                className='form-control'
                onChange={this.onChangeHandler}
                error={errors.email}
                id='email'
                autoComplete='off'
                style={inputStyle}
              />
              <p className='text-center text-white'>
                {this.state.errors.email ? this.state.errors.email : null}
              </p>
            </div>
            <div className='mb-2'>
              <label htmlFor='number'>Mobile number</label>
              <input
                value={this.props.number}
                type='number'
                className='form-control'
                onChange={this.onChangeHandler}
                error={errors.number}
                id='number'
                autoComplete='off'
                style={inputStyle}
              />
              <p className='text-center text-white'>
                {' '}
                {this.state.errors.number ? this.state.errors.number : null}
              </p>
            </div>
            <div className='mb-2'>
              <label htmlFor='password'>Password</label>
              <input
                value={this.props.password}
                type='password'
                className='form-control'
                onChange={this.onChangeHandler}
                error={errors.password}
                id='password'
                autoComplete='off'
                style={inputStyle}
              />
              <p className='text-center text-white'>
                {this.state.errors.password ? this.state.errors.password : null}
              </p>
            </div>
            <div className='custom-control custom-checkbox mt-2'>
              <input
                type='checkbox'
                onClick={this.toggleHandler}
                className='custom-control-input'
                id='defaultUnchecked'
                style={inputStyle}
              />
              <label
                className='custom-control-label'
                htmlFor='defaultUnchecked'
              >
                Accept{' '}
                <Link to='/terms-and-conditions'>terms & conditions.</Link>
              </label>
            </div>
            <div className='submitBtn text-center'>
              <button className='btn btn-light mt-2 px-4'>Create</button>
            </div>
          </form>
        </div>
        <div className='error '>
          <p className='text-center mt-3' style={{ color: 'red' }}>
            {errors.register ? errors.register : ''}
          </p>
        </div>
      </div>
    );
  }
}

const inputStyle = {
  borderRadius: 0
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(index);
