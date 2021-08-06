// // Test Project.
// // ==========
// // Contract :  0x006F599c0920A5b369dE668E0810e53a9F8b216D.
// // Network : Rinkeby (Ethereum network)

// // Design an application that creates a profile register (last name and first name). Using the contract from the address above, create new record.
// // - Each address can only create one record.
// // - To create a record requires payment of 0.01 ether.
// // - Display the list of records created and generated profileIds.
// // - Make the Dapp update for every creation of profile.
// // - Dapp should consist only of front-end

// // Submit within 72 hours.
import { getContractProfile, requestAccount, createProfile, getAllProfiles } from './action-helpers'


export const USER_SIGNUP_ERROR = 'USER_SIGNUP_ERROR';
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const GET_ALL_USERS = 'GET_ALL_USERS';
export const UPDATE_PROFILE_LIST = 'UPDATE_PROFILE_LIST'
export const USERS_PROFILE_ERROR = 'USERS_PROFILE_ERROR';
export const USERS_PROFILE_LOADING = 'USERS_PROFILE_LOADING';
export const USERS_PROFILE_END = 'USERS_PROFILE_END';
export const REGISTRATION_LOADING = 'REGISTRATION_LOADING';
export const REGISTRATION_END_LOADING = 'REGISTRATION_END_LOADING';
export const FETCH_USER_ACCOUNT = 'FETCH_USER_ACCOUNT';
export const GET_USER_PROFILE = 'GET_USER_PROFILE';
export const USER_PROFILE_LOADING = 'USER_PROFILE_LOADING'
export const USER_PROFILE_ERROR = 'USER_PROFILE_ERROR';


const userSignupError = (error) => ({
    type: USER_SIGNUP_ERROR,
    error
  });
  
  const userSignupSuccess = (data) => ({
    type: USER_SIGNUP_SUCCESS,
    data
  });

  
const loadingRegister = () => ({
    type: REGISTRATION_LOADING
  });

  const loadingRegisterEnds = () => ({
    type: REGISTRATION_END_LOADING
  });


const loadingProfile = () => ({
  type: USERS_PROFILE_LOADING
});


const loadingProfileEnds = () => ({
  type: USERS_PROFILE_END
});

const getAllProfileSuccessfully = (data) => ({
  type: GET_ALL_USERS,
  data
});

const getUserProfileSuccessfully = (data) => ({
    type: GET_USER_PROFILE,
    data
  });

const fetUserAccount = (data) => ({
    type: FETCH_USER_ACCOUNT,
    data
});

const userProfileError = (error) => ({
  type: USERS_PROFILE_ERROR,
  error
});

export const getAllProfile = () => async (dispatch) => {
  try {
    dispatch(loadingProfile());
    const users = await getAllProfiles();
    dispatch(getAllProfileSuccessfully(users));
    dispatch(loadingProfileEnds());
    return true;
  } catch (error) {
    alert(error.code)
    dispatch(userProfileError(error));
    dispatch(loadingProfileEnds());
    return false;
  }
};

export const getProfile = (address) => async (dispatch) => {
    try {
      dispatch(loadingProfile());
      const user = await getContractProfile(address)
      dispatch(getUserProfileSuccessfully(user));
      dispatch(loadingProfileEnds());
      return true;
    } catch (error) {
        alert(error.code)
      dispatch(userProfileError(error));
      dispatch(loadingProfileEnds());
      return false;
    }
  };

export const register = (values) => async (dispatch) => {
  try {
    dispatch(loadingRegister());
    const user = await createProfile(values) 
    dispatch(userSignupSuccess(user));
    dispatch(loadingRegisterEnds());
    return true;
  } catch (error) {
      alert(error.code)
    dispatch(userSignupError(error));
    dispatch(loadingRegisterEnds());
    return false;
  }
};


export const getUserAccount = () => async (dispatch) => {
    try {
      dispatch(loadingRegister());
      const account = await requestAccount()
      dispatch(fetUserAccount(account));
      dispatch(loadingRegisterEnds());
      return true;
    } catch (error) {
    alert(error.code)
      dispatch(userProfileError(error));
      dispatch(loadingProfile());
      return false;
    }
  };
  