import React, { Component } from 'react';
// import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { loginUser } from '../../../store/actions/authActions';
import { withRouter } from 'react-router-dom';
import './styles.css';

class index extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/discover');
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChangeHandler = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    const user = { ...this.state };
    delete user.errors;
    this.props.loginUser(user, this.props.history);
  };
  
  render() {
    const { errors } = this.state;
    return (
      <div className='container pt-3 text-primary'>
        <h3 className='text-center text-primary'>Login</h3>
        <div className='d-flex justify-content-center mt-4'>
          <form
            className='form-group'
            noValidate
            onSubmit={this.onSubmitHandler}
          >
            <div className='mb-2'>
              <label htmlFor='email' className='text-primary'>
                Email
              </label>
              <input
                type='email'
                className='form-control'
                onChange={this.onChangeHandler}
                error={errors.email}
                id='email'
                autoComplete='off'
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor='password' className='text-primary'>
                Password
              </label>
              <input
                type='password'
                className='form-control'
                onChange={this.onChangeHandler}
                error={errors.password}
                id='password'
                autoComplete='off'
                style={inputStyle}
              />
            </div>

            <div className='submitBtn text-center'>
              <button className='btn btn-light mt-2 border border-black'>
                Login
              </button>
            </div>
          </form>
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
  { loginUser }
)(withRouter(index));
