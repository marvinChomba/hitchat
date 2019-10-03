import React from 'react';
import './Video.css';
import ReactPlayer from 'react-player';

export default function Video({ url, thumb }) {
  return (
    <ReactPlayer className='video w-100' url={url} light={thumb} controls />
  );
}


