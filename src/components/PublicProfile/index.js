import React, { Component } from 'react';
import { logoutUser, updateProfile } from '../../store/actions/authActions';
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

class index extends Component {
  state = {
    visible: true,
    modalIsOpen: false,
    pictures: [],
    loading: false,
    status: null,
    user: {},
    videos: [],
    liked: false,
    likes: 0
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

  onChangeHandler = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  likeProf = () => {
    let likes = this.state.likes;
    this.setState({
      liked: !this.state.liked,
      likes
    });
    if (!this.state.liked) {
      likes++;
      this.setState({
        likes
      });
    } else {
      likes--;
      this.setState({ likes });
    }
    // axios.post('https://hit-chat.herokuapp.com/profile/like_user', {
    //   userid: localStorage.getItem('_id')
    // });
  };
  render() {
    let icon = null;
    if (this.state.liked) {
      icon = <i style={{ color: 'red' }} class='fas fa-heart'></i>;
    } else {
      icon = <i class='far fa-heart'></i>;
    }
    const { username, profile_image } = this.state.user;
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
                  <div className=' my-3 d-flex justify-content-center'>
                    <div
                      className='mr-3'
                      style={{ cursor: 'pointer' }}
                      onClick={this.likeProf}
                    >
                      {icon}
                    </div>
                    <div>{this.state.likes}</div>
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
                      <label htmlFor='description'>Description</label>
                      <textarea
                        style={{ resize: 'none' }}
                        readOnly
                        className='form-control'
                      ></textarea>
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
        <div key={video._id} className='border-bottom border-black mb-3'>
          <div className='img-responsive mb-2'>
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
      );
    });
    return (
      <div>
        {display}
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
  { logoutUser, updateProfile }
)(index);
