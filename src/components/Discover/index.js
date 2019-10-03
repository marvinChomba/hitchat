import React, { PureComponent } from 'react';
import axios from 'axios';
import query_string from 'query-string';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { withRouter, Link } from 'react-router-dom';
import {
  logoutUser,
  uploadVid,
  setCurrentUser
} from '../../store/actions/authActions';
import Icon from '../Layout/Icon';
import LowNav from '../Layout/LowNav';
import Spinner from '../Layout/Spinner';
import './discover.css';
import Video from '../Layout/Video/Video';
import './style.css';
import SideNav from './SideNav';
import Facebook from './share/facebook';

class Discover extends PureComponent {
  state = {
    modalIsOpen: false,
    showSearch: false,
    title: '',
    artist: '',
    file: '',
    thumb: '',
    genre: '',
    videos: [],
    toShow: [],
    loading: false,
    uploadError: false
  };

  toggleModal = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  };

  componentDidMount = async () => {
    this.setState({
      loading: true
    });
    const parsed = query_string.parse(this.props.location.search);
    const { key } = parsed;
    // eslint-disable-next-line
    if (key == undefined && localStorage.getItem('jwtToken') === null) {
      this.props.history.push('/');
    } else if (
      (localStorage.getItem('jwtToken') !== null && key !== undefined) ||
      (localStorage.getItem('jwtToken') !== null && key !== undefined) ||
      (localStorage.getItem('jwtToken') === null && key !== undefined)
    ) {
      axios
        .get(`https://hit-chat.herokuapp.com/user/loggedin/${key}`)
        .then(res => {
          const decoded = jwt_decode(res.data.token);
          console.log(decoded);
          const { username, _id, email, profile_image } = decoded.user;
          let userDate = null;
          if (email !== undefined) {
            userData = {
              username,
              email,
              number: ''
            };
            localStorage.setItem('email', email);
          } else {
            userData = {
              username,
              email: '',
              number: ''
            };
          }
          // console.log(token,username,_id);
          localStorage.setItem('jwtToken', res.data.token);
          localStorage.setItem('_id', _id);
          localStorage.setItem('username', username);
          localStorage.setItem('number', '');

          this.props.setCurrentUser(userData);
          window.location.href = window.location.origin + '/register';
        })
        .catch(err => {
          console.log(err.message);
        });
      window.location.href = window.location.origin + '/discover';
    }
    // eslint-disable-next-line

    if (this.state.videos.length !== -1980) {
      axios
        .get('https://hit-chat.herokuapp.com/profile/list_videos')
        .then(res => {
          const videos = res.data.map(video => {
            return {
              id: video._id,
              shares: 0,
              views: 0,
              artist: video.artist,
              title: video.title,
              url: video.download_link,
              userid: video.userid,
              thumbnail: video.thumbnail,
              owner: video.owner
            };
          });
          videos.reverse();
          this.setState({
            videos: [...videos],
            toShow: [...videos],
            loading: false
          });
        });
    }
  };

  filterMine = () => {
    const id = localStorage.getItem('_id');
    this.setState({
      toShow: [...this.state.videos].filter(video => video.userid === id)
    });
    console.log();
  };

  resetAll = () => {
    this.setState({
      toShow: [...this.state.videos]
    });
  };

  fileOnChange = e => {
    this.setState({
      [e.target.name]: e.target.files[0]
    });
  };

  uploadVid = () => {
    if (
      this.state.title.length === 0 ||
      this.state.artist.length === 0 ||
      this.state.file === '' ||
      this.state.genre === '' ||
      this.state.thumb === ''
    ) {
      this.setState({
        uploadError: true
      });
    } else {
      const data = new FormData();
      data.set('file', this.state.file);
      data.set('_id', localStorage.getItem('_id'));
      data.set('title', this.state.title);
      data.set('artist', this.state.artist);
      data.set('genre', this.state.genre);
      data.set('thumb', this.state.thumb);
      data.set('owner', localStorage.getItem('username'));
      this.props.uploadVid(data);
      for (let k of data.values()) {
        console.log(k);
      }
      this.setState({
        modalIsOpen: false,
        uploadError: false
      });
    }
  };

  onLogoutHandler = e => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  };

  onDetailsChanger = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  showSearchBar = () => {
    this.setState({
      showSearch: !this.state.showSearch
    });
  };

  render() {
    const searchBar = this.state.showSearch ? (
      <div className='search-bar my-3 d-flex'>
        <input
          type='text'
          name='search'
          className='form-control w-75 mr-4'
          style={{ borderRadius: 0 }}
        />
        <button className='btn border py-2 border-black'>
          <i className='fas fa-search' />
        </button>
      </div>
    ) : null;
    let videos;
    if (this.state.toShow.length > 0 && this.state.loading === false) {
      videos = this.state.toShow.map(video => {
        const to = '/public-profile/' + video.userid;
        console.log(video);
        return (
          <div key={video.id} className='mb-5 border-bottom pb-3 border-black'>
            <div className='w-100 img-responsive'>
              <Video url={video.url} thumb={video.thumbnail} />
            </div>
            <div className=''>
              <p className='lead mt-2'>
                {video.title} - {video.artist}
              </p>
              <p className='lead'>
                Posted by{' '}
                <Link to={to}>
                  <span style={name}>{video.owner}</span>
                </Link>
              </p>
              <div className='info'>
                <p>Shares: {video.shares}</p>
                {/* <p>Rank: 0</p> */}
              </div>
              <div className='w-25'>
                <div className='share'>
                  <Facebook />
                </div>
              </div>
            </div>
          </div>
        );
      });
    } else if (this.state.toShow.length === 0 && this.state.loading === false) {
      videos = <p>There are no videos at the moment.</p>;
    } else if (this.state.loading === true) {
      videos = <Spinner />;
      // videos = <Spinner />;
    }
    return (
      <React.Fragment>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-10 col-md-8 col-lg-8'>
              <Modal isOpen={this.state.modalIsOpen}>
                <ModalHeader toggle={this.toggleModal}>Add Video</ModalHeader>
                <ModalBody>
                  <div>
                    <form className='form-group'>
                      <label htmlFor='title'>Title</label>
                      <input
                        className='form-control'
                        type='text'
                        name='title'
                        id=''
                        onChange={this.onDetailsChanger}
                        required
                      />
                      <label htmlFor='name'>Name</label>
                      <input
                        className='form-control mb-3'
                        type='text'
                        name='artist'
                        id=''
                        onChange={this.onDetailsChanger}
                        required
                      />
                      <label htmlFor='genre'>Genre</label>
                      <select
                        className='form-control'
                        name='genre'
                        onChange={this.onDetailsChanger}
                      >
                        <option value=''></option>
                        <option value='hip-hop'>Hip Hop</option>
                        <option value='gqom'>Gqom</option>
                        <option value='african-trap'>African Trap</option>
                        <option value='house'>House</option>
                        <option value='electronic'>Electronic/Dance</option>
                        <option value='other'>Other</option>
                      </select>
                      <div className='my-2'>
                        <label htmlFor='file' className='mx-2'>
                          Video
                        </label>
                        <input
                          className='mb-2'
                          type='file'
                          name='file'
                          id=''
                          onChange={e => this.fileOnChange(e)}
                        />
                      </div>
                      <div className='my-2'>
                        <label htmlFor='thumb' className='mx-2'>
                          Thumnail
                        </label>
                        <input
                          type='file'
                          name='thumb'
                          id=''
                          onChange={e => this.fileOnChange(e)}
                        />
                      </div>
                    </form>
                    <p className='text-center text-danger'>
                      {this.state.uploadError
                        ? 'Please fill in all the details'
                        : null}
                    </p>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <button
                    className='btn btn-sm btn-primary'
                    onClick={this.uploadVid}
                  >
                    Upload
                  </button>
                  <button
                    className='btn btn-sm btn-danger'
                    onClick={this.toggleModal}
                  >
                    Dismiss
                  </button>
                </ModalFooter>
              </Modal>
              <div className='container' style={{ marginBottom: '60px' }}>
                <div>
                  <Icon />
                </div>
                <div
                  className='header d-flex 
          justify-content-between my-3'
                >
                  <div className='all'>
                    <button
                      onClick={this.resetAll}
                      className=' btn btn-light btn-sm border border-black'
                    >
                      All
                    </button>
                  </div>
                  <div className='mine'>
                    <button
                      onClick={this.filterMine}
                      className=' btn btn-light btn-sm border border-black'
                    >
                      Mine
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={this.showSearchBar}
                      className='py-1 btn btn-light border border-black'
                    >
                      <i className='fas fa-search' />
                    </button>
                  </div>
                  <div
                    className='btn btn-light border border-black'
                    onClick={this.toggleModal}
                  >
                    <i className='fas fa-plus' />
                  </div>
                </div>
                {searchBar}
                <div className='sort'>
                  <form className='form-group options'>
                    <select
                      className='border border-black btn form-control'
                      id='exampleFormControlSelect1'
                    >
                      <option>Random</option>
                      <option>Most iewed</option>
                      <option>Most Shared</option>
                    </select>
                  </form>
                </div>
                <main className='px-autop w-2 mb-5'>{videos}</main>
              </div>
            </div>
            <SideNav />
          </div>
        </div>
        <LowNav />
      </React.Fragment>
    );
  }
}

// Discover.propTypes = {
//   logoutUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired
// ;
const name = {
  textDecoration: 'underline'
};
const mapStateToProps = state => ({
  auth: state.auth,
  videos: state.videos.videos
});

export default connect(
  mapStateToProps,
  { logoutUser, uploadVid, setCurrentUser }
)(withRouter(Discover));
