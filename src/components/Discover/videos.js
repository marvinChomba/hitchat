import React, { Component } from 'react';
import Video from '../Layout/Video/Video';
import Spinner from '../Layout/Spinner';

export default class videos extends Component {
  state = {
    videos: []
  };

  objectsAreSame(x, y) {
    var objectsAreSame = true;
    for (var propertyName in x) {
      if (x[propertyName] !== y[propertyName]) {
        objectsAreSame = false;
        break;
      }
    }
    return objectsAreSame;
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if (!this.objectsAreSame(this.props, nextProps)) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    const videos =
      this.props.toShow.length > 0 ? (
        this.state.toShow.map(video => {
          return (
            <div
              key={video.id}
              className='mb-5 border-bottom pb-3 border-black'
            >
              <Video url={video.url} />
              <p className='lead mt-2'>
                {video.title} - {video.artist}
              </p>
              <div className='info'>
                <p>Shares: {video.shares}</p>
                {/* <p>Rank: 0</p> */}
              </div>
              <div className='icons d-flex'>
                <div className='share mr-5'>
                  <i className='fas fa-share' />
                </div>
                <div className='share'>
                  <i className='fas fa-flag' />
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <Spinner />
      );
    return { videos };
  }
}
