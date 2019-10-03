import React from 'react'
import { withRouter } from "react-router-dom"
import "./back.css"

class index extends React.Component {
  onBackHandler = () => {
    this.props.history.push(this.props.dest);
  }
  render () {
    return (
      <div className="back">
        <i onClick={() => this.onBackHandler()} className="fas fa-arrow-left"></i>
      </div>
    )
  }

}

export default withRouter(index);
