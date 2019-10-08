import React from 'react';
import { Link } from "react-router-dom";
import Login from "../../Auth/Login"

export default function userBtns() {
  return (
    <div>
      <div className="btnContaine d-flex flex-column align-items-center">
        <Link to="/signup" className="btn text-primary bg-white mb-4 border border-black">
          Join Hitchat
        </Link>
        <button type="button" className="btn dropdown-toggle mb-3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Login
        </button>
        <div className="dropdown-menu">
          <Login />
        </div>
      </div>
    </div>
  )
}
