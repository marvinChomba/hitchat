import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import videoReducer from './videoReducer';

import { pendingTasksReducer } from 'react-redux-spinner';

export default combineReducers({
  auth: authReducer,
  pendingTasks: pendingTasksReducer,
  errors: errorReducer,
  videos: videoReducer
});
