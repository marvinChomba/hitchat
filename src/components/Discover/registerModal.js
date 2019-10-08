import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProfile1 } from '../../store/actions/authActions';

class Reg extends Component {
  state = {
    isOpen: true,
    email: '',
    number: ''
  };

  submit = e => {
    e.preventDefault();
    const { email, number } = this.state;
    this.props.updateProfile1({ email, number });
    this.setState({
      isOpen: false
    });
    this.props.history.push('/discover');
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className='d-flex justify-content-center'>
        <form onSubmit={e => this.submit(e)}>
          <div className='form-group'>
            <label htmlFor='email' className='form-control'>
              Email
            </label>
            <input
              type='email'
              name='email'
              id=''
              onChange={e => this.onChange(e)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='number'>Number</label>
            <input
              type='number'
              name='number'
              id=''
              onChange={e => this.onChange(e)}
            />
          </div>
          <div>
            <button className='btn text-white'>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  undefined,
  { updateProfile1 }
)(Reg);
