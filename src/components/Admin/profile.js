import React, { Component } from 'react';
// import Socials from '../Profile/EditProfile/socials';
import axios from 'axios';
import { Spinner } from 'react-redux-spinner';

export default class profile extends Component {
  state = {
    videos: [],
    loading: false,
    user: null
  };
  componentDidMount() {
    this.setState({
      loading: true
    });
    console.log(this.props);
    // if (this.props && this.props.location.state.id) {
    //   const _id = this.props.location.state.id.toString();
    //   console.log(typeof _id);
    //   axios
    //     .post('https://hit-chat.herokuapp.com/profile/list_my_videos', {
    //       _id
    //     })
    //     .then(res => {
    //       console.log(res);
    //       this.setState(
    //         {
    //           videos: [...res.data.videos],
    //           user: res.data.user
    //         },
    //         () => {
    //           this.setState({
    //             loading: false
    //           });
    //         }
    //       );
    //     });
    // }
  }
  render() {
    const { loading } = this.state;
    let display = '';
    if (!loading && this.state.user) {
      display = (
        <div className='container '>
          <div className='p-3 mt-3' style={{ border: '2px solid black' }}>
            <h3 className='text-center'>{this.state.user.username}</h3>
            <p className='lead my-2'>First Name: Marvin</p>
            <p className='lead my-2'>Last Name: Kangangi</p>
            <div className='border-top border-black pt-3 mb-3'>
              <h4 className='text-center text-underline'>Socials</h4>
              <Socials />
            </div>
            <div className='border-top border-black pt-3'>
              <h4 className='text-center'>Videos</h4>
              <p className='text-center'>There are no videos at the moment.</p>
            </div>
            <div className='d-flex justify-content-around border-top border-black pt-3'>
              <div className='btn btn-primary' style={button}>
                Edit
              </div>
              <div className='btn btn-danger' style={button}>
                Delete
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      display = <Spinner />;
    }

    return { display };
  }
}
  
