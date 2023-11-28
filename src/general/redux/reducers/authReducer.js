import {
  FETCH_ACTIVE_USER,
  LOGOUT,
  LOGIN_RADIUS,
} from "../../../tara/redux/actions";

const initialState = {
  activeUser: null,
  activeUserEO: null,

  loadingState: false,
  isLoggedIn: false,
  loginStatus: "none",

  //radius
  loginRadiusStatus: "none",
  loginRadiusLoadingState: false,
  isRadiusLoggedIn: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACTIVE_USER:
      // console.log("user di reducer: ");
      // console.log(action);
      return {
        ...state,
        activeUser: action.activeUser,
        activeUserEO: action.activeUserEO,
        isLoggedIn: action.isLoggedIn,
        loginStatus: action.loginStatus,
      };
    // case LOGIN_RADIUS:
    //   console.log("user radius di reducer: ");
    //   console.log(action);
    //   return {
    //     ...state,
    //     loginRadiusLoadingState: action.loadingState,
    //     isRadiusLoggedIn: action.isLoggedIn,
    //     loginRadiusStatus: action.loginStatus,
    //   };
    case LOGOUT:
      return {
        ...state,
        activeUser: action.activeUser,
        activeUserEO: action.activeUserEO,
        isLoggedIn: action.isLoggedIn,
        loginRadiusLoadingState: action.loadingState,
        isRadiusLoggedIn: action.isLoggedIn,
        loginRadiusStatus: action.loginStatus,
      };
    default:
      return state;
  }
};
