import React from 'react'
import Back from "../Layout/Back";
import Icon from "../Layout/Icon";

export default function () {
  return (
    <div className="container pt-3">
      <div className="d-flex align-items-center">
        <Back dest="/signup-email" />
        <Icon />
      </div>
      <main className="main pt-3">
        <h3 className="text-center">These are the terms and conditions</h3>
      </main>
    </div>
  )
}
