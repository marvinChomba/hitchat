import React from 'react';

export default function controls(props) {
  return (
    <div className='header d-flex justify-content-between my-3'>
      <div className='all'>
        <button onClick={props.resetAll} className=' btn btn-light btn-sm'>
          All
        </button>
      </div>
      <div className='mine'>
        <button onClick={props.filterMine} className=' btn btn-light btn-sm'>
          Mine
        </button>
      </div>
      <div>
        <button onClick={props.showSearchBar} className='py-1 btn btn-light'>
          <i className='fas fa-search' />
        </button>
      </div>
      <div className='btn btn-light' onClick={props.toggleModal}>
        <i className='fas fa-plus' />
      </div>
    </div>
  );
}
