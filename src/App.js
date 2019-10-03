import React from 'react';
import './App.css';
import { Spinner } from 'react-redux-spinner';
import EmailRegistration from './components/Auth/EmailRegistration';
// import Facebook from './components/Auth/Facebook';
import Landing from './components/Layout/Landing/Landing';
import { Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './store/actions/authActions';
import OAuthRegistration from './components/Auth/OAuthRegistration';
import PrivateRoute from './components/Layout/Private';
import Discover from './components/Discover/disover2';
import EditProfile from './components/Profile/EditProfile';
import Terms from './components/Content/Terms';
import Admin from './components/Admin';
import store from './store';
import Profile from './components/Admin/profile2';
import PublicProfile from './components/PublicProfile';
import Single from './components/Discover/single_video';
import profileReg from './components/Auth/profile/profile-reg';
import Contact from './components/contact';
import AdminP from './components/PublicProfile/admin_profile';
import AdminRoute from './components/Layout/Private/admin';

if (localStorage.getItem('jwtToken')) {
  const { jwtToken } = localStorage;
  setAuthToken(jwtToken);
  console.log(jwtToken);
  const decoded = jwt_decode(jwtToken);
  const { username, email, number } = decoded.user;
  store.dispatch(setCurrentUser({ username, email, number }));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/';
  }
}

function App() {
  console.log(localStorage);
  // localStorage.clear()
  return (
    <div className='App'>
      <Spinner />
      <Switch>
        <Route path='/' exact component={Landing} />
        <Route path='/contact' component={Contact} />
        <Route path='/discover' component={Discover} />
        <Route path='/signup' component={OAuthRegistration} />
        <Route path='/signup-email' component={EmailRegistration} />
        <PrivateRoute path='/edit-profile' component={EditProfile} />
        <Route path='/terms-and-conditions' component={Terms} />
        <AdminRoute path='/admin1' component={Admin} />
        <PrivateRoute path='/profile-admin/:id' component={AdminP} />
        <PrivateRoute path='/profile/:id' component={Profile} />
        <PrivateRoute path='/public-profile/:id' component={PublicProfile} />
        <Route path='/video/:id' component={Single} />
        <PrivateRoute path='/register' component={profileReg} />
      </Switch>
    </div>
  );
}

export default App;
