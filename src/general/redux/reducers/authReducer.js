import {FETCH_ACTIVE_USER, LOGOUT} from '../../../tara/redux/actions';

const initialState = {
  activeUser: null,
  activeUserEO: null,

  loadingState: false,
  isLoggedIn: false,
  loginStatus: 'none',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACTIVE_USER:
      return {
        ...state,
        activeUser: action.activeUser,
        activeUserEO: action.activeUserEO,
        isLoggedIn: action.isLoggedIn,
        loginStatus: action.loginStatus,
      };
    case LOGOUT:
      return {
        ...state,
        activeUser: action.activeUser,
        activeUserEO: action.activeUserEO,
        isLoggedIn: action.isLoggedIn,
      };
    default:
      return state;
  }
};
