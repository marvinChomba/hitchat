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
  deleteVideo,
  setCurrentUser
} from '../../store/actions/authActions';
import Icon from '../Layout/Icon';
import LowNav from '../Layout/LowNav';
import Spinner from '../Layout/Spinner';
import './discover.css';
// import Video from '../Layout/Video/Video';
import './style.css';
import SideNav from './SideNav';
// import Facebook from './share/facebook';

class Discover extends PureComponent {
  state = {
    modalIsOpen: false,
    showSearch: false,
    uploadSizeErr: false,
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
          const { username, _id } = decoded.user;
          const userData = {
            username,
            email: '',
            number: ''
          };
          // console.log(token,username,_id);
          console.log(res.data.token);
          localStorage.setItem('jwtToken', res.data.token);
          localStorage.setItem('_id', _id);
          localStorage.setItem('username', username);
          localStorage.setItem('email', '');
          localStorage.setItem('number', '');

          this.props.setCurrentUser(userData);
        })
        .catch(err => {
          console.log(err.message);
        });
      window.location.href = window.location.origin + '/register';
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
    console.log(this.state.file);
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
    } else if (this.state.file.size > 19972878) {
      this.setState({
        uploadSizeErr: true
      });
    } else {
      console.log(this.state.file.size);
      const data = new FormData();
      data.set('file', this.state.file);
      data.set('_id', localStorage.getItem('_id'));
      data.set('title', this.state.title);
      data.set('artist', this.state.artist);
      data.set('genre', this.state.genre);
      data.set('thumb', this.state.thumb);
      data.set('owner', localStorage.getItem('username'));
      this.props.uploadVid(data);
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

  singleVideo = (id, prev) => {
    this.props.history.push(`/video/${id}`);
    this.addView(id, prev);
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

  deleteVideo = id => {
    this.props.deleteVideo(id);
  };

  addView = (id, prev) => {
    axios
      .post(`https://hit-chat.herokuapp.com/profile/increment_view`, {
        userid: localStorage.getItem('_id'),
        videoid: id
      })
      .then(res => {
        console.log(res.data);
        // this.setState({
        //   toShow: res.data,
        //   loading: false
        // });
      })
      .catch(err => {
        this.setState({
          loading: false
        });
      });
  };

  searchStuff = e => {
    e.preventDefault();
    let query = e.target.search.value;
    this.setState({
      loading: true
    });
    axios
      .post('https://hit-chat.herokuapp.com/profile/search_video', {
        query
      })
      .then(res => {
        this.setState({
          toShow: res.data,
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          loading: false
        });
      });
  };

  reset = () => {
    this.setState({
      toShow: [...this.state.videos]
    });
  };

  addShare = (id, prev) => {};

  render() {
    const searchBar = this.state.showSearch ? (
      <div className='border border-primary p-3 mb-3'>
        <h5 className='text-center text-white'>Filter</h5>
        <div className='row py-2 my-2'>
          <div className='search-barmy-3 d-flex col-md-6 col-sm-10 mb-2'>
            <form onSubmit={e => this.searchStuff(e)} className='form-inline'>
              <input
                placeholder='query'
                type='text'
                name='search'
                className='form-control w-75 mr-4'
                style={{ borderRadius: 0 }}
              />
              <button className='btn border py-2 border-black' type='submit'>
                <i className='fas fa-search' />
              </button>
            </form>
          </div>
          <div className='col-md-5 col-sm-10 d-flex align-items-center'>
            <select
              className='border border-black btn form-control text-primary bg-white'
              id='exampleFormControlSelect1'
            >
              <option className='text-primary'>Random</option>
              <option className='text-primary'>Most Viewed</option>
              <option className='text-primary'>Most Shared</option>
            </select>
          </div>
        </div>
        <div className='d-flex justify-content-center mb-3'>
          <button className='btn btn-danger btn-sm ' onClick={this.reset}>
            Reset
          </button>
        </div>
      </div>
    ) : null;
    let videos;
    if (this.state.toShow.length > 0 && this.state.loading === false) {
      videos = this.state.toShow.map(video => {
        const to = '/public-profile/' + video.userid;
        return (
          <div key={video.id} className='mb-5 border-bottom pb-3 border-black'>
            <div
              className='w-100 img-responsive thumb-container'
              onClick={() => this.singleVideo(video.id, 0)}
            >
              <img src={video.thumbnail} alt='' className='thumb-img' />
              {/* <Video url={video.url} thumb={video.thumbnail} /> */}
            </div>
            <div className='d-flex justify-content-between'>
              <div>
                <p className='lead mt-2'>
                  {video.title} - {video.artist}
                </p>
                <p className='lead'>
                  Posted by <Link to={to}>{video.owner}</Link>
                </p>
              </div>
              {video.userid === localStorage.getItem('_id') ? (
                <div className=''>
                  <div
                    style={{ cursor: 'pointer' }}
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    <i
                      className='fas fa-ellipsis-v'
                      style={{ fontSize: '1.4rem', cursor: 'pointer' }}
                    ></i>
                  </div>
                  <div
                    className='dropdown-menu text-center h-auto w-25'
                    style={{ cursor: 'pointer' }}
                  >
                    {/* eslint-disable-next-line */}
                    <a href='#' onClick={() => this.deleteVideo(video.id)}>
                      <i className='fas fa-trash text-danger'></i>
                    </a>
                  </div>
                </div>
              ) : null}
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
              <Modal isOpen={this.state.modalIsOpen} className='text-primary'>
                <ModalHeader toggle={this.toggleModal} className='text-primary'>
                  Add Video
                </ModalHeader>
                <ModalBody>
                  <div>
                    <form className='form-group'>
                      <label htmlFor='title' className='text-primary'>
                        Title
                      </label>
                      <input
                        className='form-control'
                        type='text'
                        name='title'
                        id=''
                        onChange={this.onDetailsChanger}
                        required
                      />
                      <label htmlFor='name' className='text-primary'>
                        Name
                      </label>
                      <input
                        className='form-control mb-3'
                        type='text'
                        name='artist'
                        id=''
                        onChange={this.onDetailsChanger}
                        required
                      />
                      <label htmlFor='genre' className='text-primary'>
                        Genre
                      </label>
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
                        <label htmlFor='file' className='mx-2 text-primary'>
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
                        <label htmlFor='thumb' className='mx-2 text-primary'>
                          Thumbnail
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
                      {this.state.uploadSizeErr
                        ? 'The video size should be less than 20MB'
                        : null}
                    </p>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <button
                    className='btn btn-sm text-white'
                    onClick={this.uploadVid}
                  >
                    Upload
                  </button>
                  <button
                    className='btn btn-sm text-white'
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
                      className=' btn btn-light btn-sm'
                    >
                      All
                    </button>
                  </div>
                  <div className='mine'>
                    <button
                      onClick={this.filterMine}
                      className=' btn btn-light btn-sm'
                    >
                      Mine
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={this.showSearchBar}
                      className='py-1 btn btn-light'
                    >
                      <i className='fas fa-search' />
                    </button>
                  </div>
                  <div className='btn btn-light' onClick={this.toggleModal}>
                    <i className='fas fa-plus' />
                  </div>
                </div>
                {searchBar}
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

const mapStateToProps = state => ({
  auth: state.auth,
  videos: state.videos.videos
});

export default connect(
  mapStateToProps,
  { logoutUser, uploadVid, setCurrentUser, deleteVideo }
)(withRouter(Discover));
