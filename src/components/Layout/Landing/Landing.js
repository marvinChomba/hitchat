import React, { Component } from 'react';
import { connect } from 'react-redux';
import Video from '../Video/Video';
import UserBtns from '../userBtns/userBtns';
import Icon from '../Icon';
import './Landing.css';

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/discover');
    }
  }
  render() {
    return (
      <div className='pt-3'>
        <Icon />
        <h3 className='text-center my-2'>Welcome to HitChat.</h3>
        <div className='text-center d-flex justify-content-center mt-4 mb-4'>
          <div className='videoContainer h-100 p-0'>
            <Video
              className='videoPlayer'
              url={
                'https://firebasestorage.googleapis.com/v0/b/hitc-f8b15.appspot.com/o/HitChat_AD_video.mp4?alt=media&token=f5eb5b59-4f24-4882-ba26-08636462b7ac'
              }
              thumb={Icon}
            />
          </div>
        </div>
        <div className='mt-4 mb-4'>
          <UserBtns />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
