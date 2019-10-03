import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  WhatsappShareButton
  // FacebookShareCount
} from 'react-share';

export default function facebook({ url, click }) {
  const shareUrl = `${window.location.origin}${url}`;
  const title = 'Check out this video';
  return (
    <div>
      <div className='d-flex justify-content-between'>
        <div onClick={click} style={icon}>
          <FacebookShareButton url={shareUrl} quote={title} className=''>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>
        <div onClick={click} style={icon}>
          <TwitterShareButton
            url={shareUrl}
            title={title}
            className='Demo__some-network__share-button'
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </div>
        <div onClick={click} style={icon}>
          <WhatsappShareButton
            url={shareUrl}
            title={title}
            separator=':: '
            className='Demo__some-network__share-button'
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>
      </div>
      <div className='my-2'></div>
    </div>
  );
}

const icon = {
  cursor: 'pointer',
  outlineStyle: 'none'
};
