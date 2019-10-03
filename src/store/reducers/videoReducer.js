import { ADD_VIDEO } from '../actions/actionTypes';

// const isEmpty = require("is-empty");

const initState = {
  videos: []
};

export default function(state = initState, action) {
  switch (action.type) {
    case ADD_VIDEO:
      return {
        videos: [action.payload.vidoe, ...state.videos]
      };
    default:
      return state;
  }
}
