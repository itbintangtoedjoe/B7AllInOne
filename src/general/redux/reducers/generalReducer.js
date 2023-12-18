import {
  GET_USER_NOTIFICATIONS,
  GET_APP_BANNERS,
  CHECK_APP_VERSION,
  SAVE_DEVICE_TOKEN,
  USER_REQUEST_DEACTIVATION,
} from "../actions";

const initialState = {
  userNotifications: [],
  notificationLoadingState: false,

  appBanners: [],
  bannerLoadingState: false,
  loadingState: false,

  latestAppVersion: "",
  checkingVerLoadingState: false,

  deviceToken: "",

  deactivationLoadingState: false,
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
    case SAVE_DEVICE_TOKEN:
      return {
        ...state,
        deviceToken: action.deviceToken,
      };
    case USER_REQUEST_DEACTIVATION:
      return {
        ...state,
        deactivationLoadingState: action.loadingState,
      };
    default:
      return state;
  }
};
