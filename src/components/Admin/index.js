import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteVideo } from '../../store/actions/authActions';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Video from '../Layout/Video/Video';

class index extends Component {
  state = {
    videos: [],
    toShow: [],
    loading: false,
    user: null,
    showProfile: false
  };

  deleteVideo = id => {
    this.props.deleteVideo(id);
  };

  componentDidMount() {
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
            owner: video.owner,
            thumbnail: video.thumbnail
          };
        });
        videos.reverse();
        this.setState({
          videos: [...videos],
          loading: false
        });
      });
  }

  render() {
    let videos = null;
    videos = this.state.videos.map(video => {
      const to = '/profile-admin/' + video.userid;
      return (
        <div key={video.id} className='mb-5 border-bottom pb-3 border-black'>
          <div className='w-100 img-responsive'>
            <Video url={video.url} thumb={video.thumbnail} />
          </div>
          <div className='d-flex justify-content-between mt-2 '>
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
            </div>
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
          </div>
        </div>
      );
    });
    return (
      <div className='container p-3'>
        <form className='form-group w-50'>
          <input className='form-control' type='text' placeholder='Filter' />
        </form>
        <div className='w-50'>
          <h3 className='text-center my-3'>All Videos</h3>
          {videos}
        </div>
      </div>
    );
  }
}

const name = {
  textDecoration: 'underline'
};

export default connect(
  undefined,
  { deleteVideo }
)(index);
