import React, { PureComponent } from 'react';
import axios from 'axios';
import query_string from 'query-string';
import Modals from './modal';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { withRouter } from 'react-router-dom';
import {
  logoutUser,
  uploadVid,
  deleteVideo,
  setCurrentUser
} from '../../store/actions/authActions';
import SearchBar from './searchBar';
import Icon from '../Layout/Icon';
import LowNav from '../Layout/LowNav';
import Videos from './videos';
import './discover.css';
import './style.css';
import SideNav from './SideNav';
import Controls from './controls';

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
    console.log(localStorage());
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
          const { username, _id } = decoded.user;
          const userData = {
            username,
            email: '',
            number: ''
          };
          localStorage.setItem('jwtToken', res.data.token);
          localStorage.setItem('_id', _id);
          localStorage.setItem('username', username);
          this.props.setCurrentUser(userData);
        })
        .catch(err => {
          console.log(err.message);
        });
      // window.location.href = window.location.origin + '/register';
    }

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
      this.state.thumb === ''
    ) {
      this.setState({
        uploadError: true
      });
    } else if (this.state.file.size > 20000000) {
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
      .then(res => {})
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

  render() {
    const searchBar = this.state.showSearch ? (
      <SearchBar reset={this.reset} searchStuff={this.searchStuff} />
    ) : null;
    return (
      <React.Fragment>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-10 col-md-8 col-lg-8'>
              <Modals
                uploadVid={this.uploadVid}
                toggleModal={this.toggleModal}
                fileOnChange={this.fileOnChange}
                onDetailsChanger={this.onDetailsChanger}
                modalIsOpen={this.state.modalIsOpen}
                uploadError={this.state.uploadError}
                uploadSizeErr={this.state.uploadSizeErr}
              />
              <div className='container' style={{ marginBottom: '60px' }}>
                <div>
                  <Icon />
                </div>
                <Controls
                  resetAll={this.resetAll}
                  filterMine={this.filterMine}
                  showSearchBar={this.showSearchBar}
                  toggleModal={this.toggleModal}
                />
                {searchBar}
                <main className='px-autop w-2 mb-5'>
                  <Videos
                    toShow={this.state.toShow}
                    loading={this.state.loading}
                    deleteVideo={this.deleteVideo}
                    singleVideo={this.singleVideo}
                  />
                </main>
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
