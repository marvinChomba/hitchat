import React from 'react'

export default function Socials() {
  const socials = ["facebook-f", "twitter", "instagram"];
  const icons = socials.map(social => {
    const classN = `fab fa-${social}`;
    const classD = `${social} icon d-flex justify-content-center p-auto align-items-center`;
    return (<div key={Math.random()*3456789} className={classD}> 
      <i className={classN}></i>
    </div>)
  })
  return (
    <div className="socials d-flex justify-content-around ">
      {icons}
    </div>
  )
}

