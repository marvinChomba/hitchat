import React from 'react';
import { NavLink } from 'react-router-dom';
import './low.css';

export default function index() {
  return (
    <nav className=''>
      <div className='row '>
        <div className='col-4'>
          <NavLink to='/discover'>Discover</NavLink>
        </div>
        <div className='col-4'>
          <NavLink to='/edit-profile'>Profile</NavLink>
        </div>
        <div className='col-4 d-flex align-items-center'>
          {/* eslint-disable-next-line */}
          <NavLink to={'/contact'}>Contact</NavLink>
        </div>
      </div>
    </nav>
  );
}
