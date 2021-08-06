import { combineReducers } from 'redux';
import { 
    USER_SIGNUP_SUCCESS, 
    USER_SIGNUP_ERROR,
    USERS_PROFILE_LOADING,
    USER_PROFILE_LOADING,
    GET_USER_PROFILE,
    FETCH_USER_ACCOUNT,
    USER_PROFILE_ERROR,
    GET_ALL_USERS,
    USERS_PROFILE_ERROR

 } from './actions';

const initialState = {
    loading: false,
    user: null,
    error: false,
    account: null,
    users: [],
    profile: null
}

const userSignupReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.data,
        error: false
      };
    case USER_SIGNUP_ERROR:
      return { ...state, error: action.error };

    default:
      return state;
  }
};

const userAccountReducer = (state = initialState, action) => {
    switch (action.type) {
      case USERS_PROFILE_LOADING:
        return {
          ...state,
          loading: true,
        };
      case FETCH_USER_ACCOUNT:
        return { 
            ...state,  
            account: action.data, 
        };
      default:
        return state;
    }
  };

  const userProfileReducer = (state = initialState, action) => {
    switch (action.type) {
      case USER_PROFILE_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_USER_PROFILE:
        return {
          ...state,
          profile: action.data,
          error: false,
        };
      case USER_PROFILE_ERROR:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
  
      default:
        return state;
    }
  };


  
  const allUsersReducer = (state = initialState, action) => {
    switch (action.type) {
      case USERS_PROFILE_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_ALL_USERS:
        return {
          ...state,
          users: action.data,
          error: false,
        };
      case USERS_PROFILE_ERROR:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
  
      default:
        return state;
    }
  };

  export default combineReducers({
    register: userSignupReducer,
    userAccount: userAccountReducer,
    userProfile: userProfileReducer,
    allUsers: allUsersReducer
  
  });