import React from 'react';

export default function searchBar(props) {
  return (
    <div className='border border-primary p-3 mb-3'>
      <h5 className='text-center text-white'>Filter</h5>
      <div className='py-2 my-2'>
        <div className='search-barmy-3 d-flex mb-2'>
          <form onSubmit={e => props.searchStuff(e)} className='d-flex'>
            <input
              placeholder='query'
              type='text'
              name='search'
              className='form-control mr-4'
              style={{ borderRadius: 0 }}
            />
            <button className='btn border py-2 border-black' type='submit'>
              <i className='fas fa-search' />
            </button>
          </form>
        </div>
      </div>
      <div className='d-flex justify-content-center mb-3'>
        <button className='btn btn-sm ' onClick={props.reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
