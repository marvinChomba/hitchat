import React, { Component } from 'react';
import {
  logoutUser,
  updateProfile,
  changeDp
} from '../../../store/actions/authActions';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import Icon from '../../Layout/Icon';
import Back from '../../Layout/Back';
import './edit.css';
import LowNav from '../../Layout/LowNav';

class RegisterFB extends Component {
  state = {
    visible: true,
    modalIsOpen: false,
    email: '',
    number: '',
    username: '',
    pictures: [],
    pic: '',
    err: false
  };

  onLogoutHandler = e => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  };

  onDrop = picture => {
    this.setState({
      pictures: this.state.pictures.concat(picture)
    });
    console.log(this.state);
  };

  toggleModal = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  };

  componentDidMount() {
    const { email, number, username, image } = localStorage;
    // console.log(localStorage);
    this.setState({
      email: email,
      number: number,
      username: username,
      image: image
    });
  }

  onSubmitProfile = e => {
    e.preventDefault();
    const { email, number, username } = this.state;
    if (email.length === 0 || number.length === 0) {
      this.setState({
        err: true
      });
    } else {
      this.setState({
        err: false
      });
      this.props.updateProfile(
        { email, number, username, _id: localStorage.getItem('_id') },
        this.props.history
      );
      this.props.history.push('/discover');
    }
  };

  onUploadImage = e => {
    const types = ['image/jpeg', 'image/jpg', 'image/png'];
    if (types.indexOf(this.state.pic.type) !== -1) {
      const data = new FormData();
      data.set('file', this.state.pic);
      data.set('_id', localStorage.getItem('_id'));
      this.props.changeDp(data);
    } else {
      alert('Please provide an image.');
    }
    this.setState({
      modalIsOpen: false
    });
  };

  onChangeHandler = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  onChangeImage = e => {
    this.setState({
      [e.target.name]: e.target.files[0]
    });
  };

  render() {
    const { username, email, number, image } = this.state;
    return (
      <React.Fragment>
        <Modal isOpen={this.state.modalIsOpen}>
          <ModalHeader toggle={this.toggleModal} className='text-black'>
            <p className='text-primary'>Edit Photo</p>
          </ModalHeader>
          <ModalBody>
            <div>
              <form className='form-group'>
                <label htmlFor='pic'></label>
                {/* eslint-disable-next-line */}
                <input
                  type='file'
                  name='pic'
                  onChange={this.onChangeImage}
                  id='pic'
                />
              </form>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-sm' onClick={this.onUploadImage}>
              Upload
            </button>
            <button className='btn btn-sm' onClick={this.toggleModal}>
              Dismiss
            </button>
          </ModalFooter>
        </Modal>
        <div className='container' style={{ marginBottom: '60px' }}>
          <header className='pt-3'>
            <div className='d-flex align-items-center'>
              <Icon />
            </div>
          </header>
          <main className='my-3'>
            <div className='row pt-3'>
              <div className='photo-dets col-sm-10 col-lg-5'>
                <div className='photo d-flex justify-content-center mb-2'>
                  <img
                    src={image}
                    alt='profile'
                    className='border border-black'
                  />
                </div>
                <div className='d-flex justify-content-center'>
                  <button className='btn btn-sm' onClick={this.toggleModal}>
                    <i className='fas fa-camera text-white'></i>
                  </button>
                </div>
              </div>

              <div className='d-flex justify-content-center col-sm-10 col-lg-5'>
                <form>
                  <div className='mb-2'>
                    <label htmlFor='name'>Pofile name</label>
                    <input
                      readOnly
                      value={username}
                      type='text'
                      className='form-control'
                      id='username'
                      autoComplete='off'
                      onChange={this.onChangeHandler}
                    />
                  </div>
                  <div className='mb-2'>
                    <label htmlFor='name'>Number</label>
                    <input
                      value={number}
                      type='text'
                      className='form-control'
                      id='number'
                      autoComplete='off'
                      onChange={this.onChangeHandler}
                    />
                  </div>
                  <div className='mb-2'>
                    <label htmlFor='email'>Email</label>
                    <input
                      value={email}
                      type='email'
                      className='form-control'
                      id='email'
                      autoComplete='off'
                      onChange={this.onChangeHandler}
                    />
                  </div>
                  <div className='mb-2'>
                    <label htmlFor='description'>Description</label>
                    <textarea className='form-control'></textarea>
                  </div>
                  <p className='text-center'>Please fill in all the details</p>
                  <div className='d-flex justify-content-around'>
                    <div className='submitBtn text-center'>
                      <button
                        className='btn btn-light mt-2 px-4'
                        onClick={e => this.onSubmitProfile(e)}
                      >
                        Edit
                      </button>
                    </div>
                    <div className='submitBtn text-center'>
                      <button
                        className='btn btn-danger mt-2 px-4'
                        onClick={this.onLogoutHandler}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
        <LowNav />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, updateProfile, changeDp }
)(index);
