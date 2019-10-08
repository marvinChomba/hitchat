import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProfile1, changeDp } from '../../store/actions/authActions';

class Reg extends Component {
  state = {
    isOpen: true,
    email: '',
    number: '',
    pic: '',
    err: false
  };

  submit = e => {
    e.preventDefault();
    if (
      this.state.email.length === 0 ||
      this.state.number.length === 0
    ) {
      this.setState({
        err: true
      });
    } else {
      console.log('Awe');
      this.setState({
        err: false
      });
      const { email, number } = this.state;
      this.props.updateProfile1({ email, number });
      this.props.history.push('/discover');
    }
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onChangeImage = e => {
    this.setState({
      [e.target.name]: e.target.files[0]
    });
  };
  render() {
    return (
      <div className='container mt-5'>
        <h4 className='text-center'>Edit Details</h4>
        <div></div>
        <div className='d-flex justify-content-center'>
          <form onSubmit={e => this.submit(e)}>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                name='email'
                className='form-control'
                autoComplete='off'
                id=''
                onChange={e => this.onChange(e)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='number'>Number</label>
              <input
                type='number'
                className='form-control'
                autoComplete='off'
                name='number'
                id=''
                onChange={e => this.onChange(e)}
              />
            </div>
            <p className='text-center text-bold'>
              {this.state.err ? 'Please fill in all the details' : null}
            </p>
            <div>
              <button className='btn text-white'>Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  undefined,
  { updateProfile1, changeDp }
)(Reg);
