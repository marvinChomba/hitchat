import React from 'react';
import Spinner from '../Layout/Spinner';
import { Link } from 'react-router-dom';

export default function videos(props) {
  let videos;
  if (props.toShow.length > 0 && props.loading === false) {
    videos = props.toShow.map(video => {
      const to = '/public-profile/' + video.userid;
      return (
        <div
          key={video.id + video.thumbnail}
          className='mb-5 border-bottom pb-3 border-black'
        >
          <div
            className='w-100 img-responsive thumb-container'
            onClick={() => props.singleVideo(video.id, 0)}
          >
            <img src={video.thumbnail} alt='' className='thumb-img' />
          </div>
          <div className='d-flex justify-content-between'>
            <div>
              <p className='lead mt-2'>
                {video.title} - {video.artist}
              </p>
              <p className='lead'>
                Posted by{' '}
                <Link to={to} style={{ textDecoration: 'underline' }}>
                  {video.owner}
                </Link>
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
                  <a href='#' onClick={() => props.deleteVideo(video.id)}>
                    <i className='fas fa-trash text-danger'></i>
                  </a>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      );
    });
  } else if (props.toShow.length === 0 && props.loading === false) {
    videos = <p>There are no videos at the moment.</p>;
  } else if (props.loading === true) {
    videos = <Spinner />;
  }
  return <div>{videos}</div>;
}
