import React, { Component } from 'react';
import {
  logoutUser,
  updateProfile,
  deleteUser
} from '../../store/actions/authActions';
import { connect } from 'react-redux';
import Icon from '../Layout/Icon';
import Back from '../Layout/Back';
import '../Profile/EditProfile/edit.css';
import LowNav from '../Layout/LowNav';
import Spinner from '../Layout/Spinner';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import Video from '../Layout/Video/Video';
import Facebook from '../Discover/share/facebook';
import './styles.css';

class AdminP extends Component {
  state = {
    visible: true,
    modalIsOpen: false,
    pictures: [],
    loading: false,
    status: null,
    user: {},
    videos: [],
    email: '',
    number: '',
    username: ''
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
    console.log(this.state);
  };

  deleteUser = _id => {
    this.props.deleteUser({ _id });
    this.props.history.push('/admin1');
  };

  componentDidMount() {
    this.setState({
      loading: true
    });
    axios
      .post('https://hit-chat.herokuapp.com/profile/list_my_videos', {
        _id: this.props.match.params.id
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          loading: false,
          user: res.data.user,
          username: res.data.user.username,
          email: res.data.user.email,
          number: res.data.user.number,
          videos: res.data.videos
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
          status: 'Failed to load profile.'
        });
      });
    this.setState({
      email: '',
      number: '',
      username: ''
    });
  }

  render() {
    const { username, email, number } = this.state;
    const { profile_image } = this.state.user;
    let display = null;
    if (this.state.loading) {
      display = <Spinner />;
    } else if (!this.state.loading && !this.state.status) {
      display = (
        <React.Fragment>
          <div className='container' style={{ marginBottom: '60px' }}>
            <header className='pt-3'>
              <div className='d-flex align-items-center'>
                <Back dest='/discover' />
                <Icon />
              </div>
            </header>
            <main className='my-3'>
              <div className='row pt-3'>
                <div className='photo-dets col-sm-10 col-lg-5'>
                  <div className='photo d-flex justify-content-center mb-2'>
                    <img alt='profile' src={profile_image} />
                  </div>
                  <div className='w-75 mx-auto my-2'></div>
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
                  </form>
                </div>
              </div>
            </main>
          </div>
          <LowNav />
        </React.Fragment>
      );
    } else if (!this.state.loading && this.state.status) {
      display = <p className='lead text-center'>{this.state.status}</p>;
    }
    let videos = null;
    videos = this.state.videos.map(video => {
      return (
        <div>
          <div key={video._id} className='border-bottom border-black mb-3'>
            <div className='img-responsive'>
              <Video url={video.download_link} thumb={video.thumbnail} />
            </div>
            <div className='ml-2'>
              <p className='lead mr-2'>
                {video.title} - {video.artist}
              </p>
              <div className='w-25'>
                <div className='share'>
                  <Facebook url={`/video/${video._id}`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div>
        {display}
        {this.state.loading ? null : (
          <div class='w-50 mx-auto my-3 text-center'>
            <div className='d-flex justify-content-center'>
              <div>
                <button
                  onClick={() => this.deleteUser(this.props.match.params.id)}
                  className='btn btn-sm btn-danger'
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
        <h4 className='text-center'>{!this.state.loading ? 'Videos' : ''}</h4>
        <div className='d-flex justify-content-center mb-5'>
          <div className='user-vids'>{videos}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, updateProfile, deleteUser }
)(AdminP);
