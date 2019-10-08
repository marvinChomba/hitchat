import React, { Component } from 'react';
import axios from 'axios';
import Video from '../Layout/Video/Video';
import Spinner from '../Layout/Spinner';
import Facebook from './share/facebook';
import { Link } from 'react-router-dom';
import Icon from '../Layout/Icon';
import Back from '../Layout/Back';
import './discover.css';

export default class Single extends Component {
  state = {
    video: {},
    loading: false,
    shares: null
  };
  componentDidMount() {
    this.setState({
      loading: true
    });
    axios
      .get(
        `https://hit-chat.herokuapp.com/profile/videoByID/${this.props.match.params.id}`
      )
      .then(res => {
        console.log(res.data.people_who_shared.length);

        this.setState({
          video: {
            ...res.data
          },
          shares: res.data.people_who_shared.length,
          loading: false
        });
      });
  }

  onShare = id => {
    console.log('Wassup');
    axios
      .post('https://hit-chat.herokuapp.com/profile/increment_share', {
        userid: localStorage.getItem('_id'),
        videoid: id
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          shares: this.state.shares + 1
        });
      });
  };
  render() {
    const { video } = this.state;
    const to = '/public-profile/' + video.userid;
    return (
      <React.Fragment>
        <div className='container'>
          <header className='pt-3'>
            <div className='d-flex align-items-center'>
              <Back dest='/discover' />
              <Icon />
            </div>
          </header>
          <div className='my-4 d-flex justify-content-center'>
            <div className='vids'>
              {!this.state.loading ? (
                <div key={video.id} className='mb-5 pb-3'>
                  <div className='w-100 img-responsive'>
                    <Video url={video.download_link} thumb={video.thumbnail} />
                  </div>
                  <div className=''>
                    <p className='lead mt-2'>
                      {video.title} - {video.artist}
                    </p>
                    <p className='lead'>
                      Posted by{' '}
                      <Link to={to} style={{ textDecoration: 'underline' }}>
                        {video.owner}
                      </Link>
                    </p>
                    <p className='lead'>Share video</p>
                    <div className='w-25'>
                      <div className='share'>
                        <Facebook
                          click={() => this.onShare(video.id)}
                          shares={this.state.shares}
                          url={`/video/${video._id}`}
                        />
                      </div>
                    </div>
                    <div>
                      <p>Shares: {this.state.shares}</p>
                    </div>
                    <div style={{ cursor: 'pointer' }} onClick={this.flag}>
                      <Link
                        to={{
                          pathname: '/contact',
                          state: {
                            subject: 'Report a video',
                            message: window.location.href
                          }
                        }}
                      >
                        <i class='fas fa-flag'></i>{' '}
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <Spinner />
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
