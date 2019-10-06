import React, { Component } from 'react';
import Back from '../Layout/Back';
import Icon from '../Layout/Icon';
import LowNav from '../Layout/LowNav';
import axios from 'axios';
import './styles.css';

export default class index extends Component {
  state = {
    message: '',
    subject: '',
    msg: '',
    failed: false
  };
  onBack = () => {
    this.props.history.goBack();
  };

  componentDidMount() {
    if (
      this.props.location.state &&
      this.props.location.state.message &&
      this.props.location.state.subject
    ) {
      this.setState({
        message: this.props.location.state.message,
        subject: this.props.location.state.subject
      });
    }
  }

  send = e => {
    e.preventDefault();
    axios
      .post('https://hit-chat.herokuapp.com/user/send_mail', {
        name: localStorage.getItem('username'),
        email: localStorage.getItem('email'),
        subject: e.target.subject.value,
        message: e.target.message.value
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          msg: 'Email sent!',
          subject: '',
          message: '',
          failed: false
        });
      })
      .catch(err => {
        console.log(err.data);
        this.setState({
          msg: 'Email failed!',
          failed: true
        });
      });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className='container mt-4'>
        <header className='pt-3'>
          <div className='d-flex align-items-center'>
            <Back dest={`/discover`} />
            <Icon />
          </div>
        </header>
        <h3 className='text-center mt-3'>Contact Us</h3>
          <div className='msg'>
            <form method='post' onSubmit={e => this.send(e)}>
              <div className='form-group'>
                <div className='mb-2'>
                  <h4 className='text-center'>Send us a message</h4>
                  <p
                    className={`text-${
                      this.state.failed ? 'danger' : 'success'
                    }`}
                  >
                    {this.state.msg}
                  </p>
                  <input
                    type='text'
                    name='subject'
                    className='form-control'
                    placeholder='Subject'
                    required
                    value={this.state.subject}
                    onChange={e => this.onChange(e)}
                  />
                </div>
                <textarea
                  value={this.state.message}
                  required
                  placeholder='Message'
                  name='message'
                  className='form-control'
                  id=''
                  cols='25'
                  rows='10'
                  onChange={e => this.onChange(e)}
                  style={box}
                ></textarea>
                <div className='form-group mt-2 d-flex justify-content-end'>
                  <button className='btn btn-primary'>Send</button>
                </div>
              </div>
            </form>
          </div>
          <div></div>
        <LowNav />
      </div>
    );
  }
}

const box = {
  resize: 'none'
};
