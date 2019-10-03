import React from 'react';
import { NavLink } from 'react-router-dom';

export default function SideNav() {
  return (
    <div
      className='d-sm-none d-md-block col-4'
      style={{
        marginTop: '200px',
        background: 'transparent',
        border: 'none',
        fontSize: '1.5rem'
      }}
    >
      <div className='d-flex flex-column align-items-center'>
        <div className='my-2'>
          <NavLink to='/discover' className='text-white'>
            Discover
          </NavLink>
        </div>
        <div className='my-2'>
          <NavLink to='/edit-profile' className='text-white'>
            Profile
          </NavLink>
        </div>
        <div className='my-2'>
          {/* eslint-disable-next-line */}
          <NavLink to={'/contact'} className='text-white'>
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
}
