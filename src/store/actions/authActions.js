import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
// import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from './actionTypes';
import { pendingTask, begin, end } from 'react-redux-spinner';

export const registerUser = (userData, history) => dispatch => {
  dispatch({
    type: 'SPIN',
    [pendingTask]: begin
  });
  axios
    .post('https://hit-chat.herokuapp.com/user/create_user', userData)
    .then(res => {
      console.log(res.data);
      if (Object.keys(res.data).length !== 2) {
        alert('Failed to login');
      } else {
        const { user, token } = res.data;
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('_id', user._id);
        localStorage.setItem('username', user.username);
        localStorage.setItem('email', user.email);
        localStorage.setItem('number', user.number);
        localStorage.setItem('image', user.profile_image);
        setAuthToken(user.token);
        dispatch(
          setCurrentUser({
            username: user.username,
            email: user.email,
            number: user.number
          })
        );
        history.push('/discover');
        dispatch({
          type: 'SPIN',
          [pendingTask]: end
        });
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: 'Signup Error'
      });
      console.log(err.message);
    });
};

export const deleteVideo = data => dispatch => {
  dispatch({
    type: 'SPIN',
    [pendingTask]: begin
  });
  axios
    .delete(`https://hit-chat.herokuapp.com/profile/delete_video/${data}`)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: 'SPIN',
        [pendingTask]: end
      });
      window.location.reload();
    })
    .catch(err => {
      console.log('Errr', err.message);
      dispatch({
        type: 'SPIN',
        [pendingTask]: end
      });
    });
};

export const loginUser = (userData, history) => dispatch => {
  dispatch({
    type: 'SPIN',
    [pendingTask]: begin
  });
  axios
    .post('https://hit-chat.herokuapp.com/user/login', userData)
    .then(res => {
      if (Object.keys(res.data).length !== 2) {
        alert('Failed to login');
      } else {
        const { user, token } = res.data;
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('_id', user._id);
        localStorage.setItem('username', user.username);
        localStorage.setItem('email', user.email);
        localStorage.setItem('number', user.number);
        localStorage.setItem('image', user.profile_image);
        setAuthToken(user.token);
        // const decoded = jwt_decode(token);
        dispatch(
          setCurrentUser({
            username: user.username,
            email: user.email,
            number: user.number
          })
        );
        history.push('/discover');
      }
      dispatch({
        type: 'SPIN',
        [pendingTask]: end
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: 'Login Error'
      });
      console.log(err);
    });
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    decoded
  };
};

export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

export const logoutUser = (history = []) => dispatch => {
  window.location.href = '/';
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

export const updateProfile = (userDetails, history) => dispatch => {
  dispatch({
    type: 'SPIN',
    [pendingTask]: begin
  });
  axios
    .put('https://hit-chat.herokuapp.com/profile/update_profile', {
      ...userDetails
    })
    .then(res => {
      console.log(res.data, 'nits');
      localStorage.setItem('username', res.data['username']);
      localStorage.setItem('email', res.data['email']);
      localStorage.setItem('number', res.data['number']);
      dispatch({
        type: 'SPIN',
        [pendingTask]: end
      });
    })
    .catch(err => {
      console.log('Woah');

      dispatch({
        type: 'SPIN',
        [pendingTask]: end
      });
    });
};

export const updateProfile1 = (userDetails, history) => dispatch => {
  dispatch({
    type: 'SPIN',
    [pendingTask]: begin
  });
  axios
    .put('https://hit-chat.herokuapp.com/profile/update_profile', {
      ...userDetails
    })
    .then(res => {
      console.log(res.data);
      localStorage.setItem('email', res.data['email']);
      localStorage.setItem('number', res.data['number']);
      dispatch({
        type: 'SPIN',
        [pendingTask]: end
      });
    })
    .catch(err => {
      dispatch({
        type: 'SPIN',
        [pendingTask]: end
      });
    });
};
export const uploadVid = data => dispatch => {
  dispatch({
    type: 'SPIN',
    [pendingTask]: begin
  });
  axios
    .post('https://hit-chat.herokuapp.com/profile/upload', data)
    .then(res => {
      console.log(res);
      dispatch({
        type: 'SPIN',
        [pendingTask]: end
      });
      window.location.reload();
    })
    .catch(err => {
      console.log('Errr', err.message);
      dispatch({
        type: 'SPIN',
        [pendingTask]: end
      });
    });
};

export const changeDp = data => dispatch => {
  dispatch({
    type: 'SPIN',
    [pendingTask]: begin
  });
  axios
    .post('https://hit-chat.herokuapp.com/profile/upload_image', data)
    .then(res => {
      localStorage.setItem('image', res.data.image.download_link);
      dispatch({
        type: 'SPIN',
        [pendingTask]: end
      });
      window.location.reload();
    })
    .catch(err => {
      console.log(err.message);
      dispatch({
        type: 'SPIN',
        [pendingTask]: end
      });
    });
};

export const deleteUser = data => dispatch => {
  dispatch({
    type: 'SPIN',
    [pendingTask]: begin
  });
  axios
    .post('https://hit-chat.herokuapp.com/admin/delete_user', { data })
    .then(res => {
      dispatch({
        type: 'SPIN',
        [pendingTask]: end
      });
      window.location.href = window.location.origin + '/admin1';
    })
    .catch(err => {
      console.log(err.message);
      dispatch({
        type: 'SPIN',
        [pendingTask]: end
      });
    });
};
