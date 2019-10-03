import {
  SET_CURRENT_USER,
  USER_LOADING
} from "../actions/actionTypes";

// const isEmpty = require("is-empty");

const initState = {
  isAuthenticated:false,
  user:{},
  userName:"",
  loading:false
}

export default function (state = initState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      const actionLength = Object.keys(action.decoded).length;
      return {
        ...state,
        isAuthenticated: actionLength === 0 ? false : true,
        user: actionLength > 0 ? action.decoded: "",
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}