import {
  GET_USER_NOTIFICATIONS,
  GET_APP_BANNERS,
  CHECK_APP_VERSION,
} from '../actions';

const initialState = {
  userNotifications: [],
  notificationLoadingState: false,

  appBanners: [],
  bannerLoadingState: false,
  loadingState: false,

  latestAppVersion: '',
  checkingVerLoadingState: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_NOTIFICATIONS:
      return {
        ...state,
        userNotifications: action.userNotifications,
        notificationLoadingState: action.notificationLoadingState,
      };
    case GET_APP_BANNERS:
      return {
        ...state,
        appBanners: action.appBanners,
        bannerLoadingState: action.loadingState,
      };
    case CHECK_APP_VERSION:
      return {
        ...state,
        latestAppVersion: action.latestAppVersion,
        checkingVerLoadingState: action.loadingState,
      };
    default:
      return state;
  }
};
