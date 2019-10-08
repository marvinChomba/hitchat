import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProfile1 } from '../../store/actions/authActions';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Reg extends Component {
  state = {
    isOpen: true,
    email: '',
    number: ''
  };

  submit() {
    const { email, number } = this.state;
    this.props.updateProfile1({ email, number });
    this.setState({
      isOpen: false
    });
    this.props.history.push('/discover');
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <Modal isOpen={this.state.isOpen} className='text-primary'>
        <ModalHeader className='text-primary'>
          <p className='text-primary'>Fill in Details</p>
        </ModalHeader>
        <ModalBody>
          <form className=''>
            <div className='form-group'>
              <label htmlFor='email' className='form-control'>
                Email
              </label>
              <input type='email' name='email' id='' />
            </div>
            <div className='form-group'>
              <label htmlFor='number'>Number</label>
              <input type='number' name='number' id='' />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-sm text-white' onClick={this.update}>
            Update
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default connect(
  undefined,
  { updateProfile1 }
)(Reg);
