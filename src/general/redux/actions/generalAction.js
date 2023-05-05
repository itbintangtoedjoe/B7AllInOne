import { Alert } from "react-native";
import { isReachable } from "./authAction";
import Notification from "../../models/Notification";

export const SAVE_USER_TOKEN = "SAVE_USER_TOKEN";
export const GET_USER_NOTIFICATIONS = "GET_USER_NOTIFICATIONS";
export const READ_RECEIPT = "READ_RECEIPT";
export const GET_APP_BANNERS = "GET_APP_BANNERS";
export const CHECK_APP_VERSION = "CHECK_APP_VERSION";

export const saveUserToken = (nik, token) => {
  return async (dispatch, getState) => {
    dispatch({
      type: SAVE_USER_TOKEN,
    });

    let data = {
      nik,
      usertoken: token,
    };
    // console.log(data);
    const goodToGo = await isReachable();
    if (goodToGo === true) {
      try {
        const responseBase = await fetch(
          "https://portal.bintang7.com/tara/users/save-user-token",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (!responseBase.ok) {
          throw new Error("Something went wrong!");
          // console.log(responseBase);
        }

        const responseData = await responseBase.json();
        // console.log(responseData);

        dispatch({
          type: SAVE_USER_TOKEN,
        });
      } catch (err) {
        throw err;
      }
    } else {
      saveUserToken(data);
    }
  };
};

export const getUserNotifications = (nik) => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_USER_NOTIFICATIONS,
      notificationLoadingState: true,
    });

    let data = {
      nik,
    };
    // console.log(data);
    const goodToGo = await isReachable();
    if (goodToGo === true) {
      try {
        const responseBase = await fetch(
          "https://portal.bintang7.com/tara/notification/get-user-notifications",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (!responseBase.ok) {
          dispatch({
            type: GET_USER_NOTIFICATIONS,
            notificationLoadingState: false,
          });
          throw new Error("Something went wrong!");
          // console.log(responseBase);
        }

        const responseData = await responseBase.json();
        // console.log(responseData);

        let userNotifications = [];
        // recordID, appName, title, body, url, isRead, creationDate
        responseData.map(function (item) {
          userNotifications.push(
            new Notification(
              item.RecordID,
              item.AppsID,
              item.ApplicationName,
              item.Title,
              item.Body,
              item.TransactionID,
              item.UrlWeb,
              item.UrlMobileRoute,
              item.IsRead,
              item.CreationDate
            )
          );
        });
        // console.log(userNotifications);
        dispatch({
          type: GET_USER_NOTIFICATIONS,
          notificationLoadingState: false,
          userNotifications: userNotifications,
        });
      } catch (err) {
        throw err;
      }
    } else {
      dispatch({
        type: GET_USER_NOTIFICATIONS,
        notificationLoadingState: false,
      });
      return goodToGo;
    }
  };
};

export const setNotificationIsRead = (notifID) => {
  return async (dispatch, getState) => {
    let data = {
      NotificationID: notifID,
    };
    dispatch({
      type: READ_RECEIPT,
      uploadingState: true,
    });
    // console.log(JSON.stringify(data));
    const goodToGo = await isReachable();
    if (goodToGo === true) {
      try {
        const response = await fetch(
          "https://portal.bintang7.com/tara/notification/read-receipt",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        await response.json();

        dispatch({
          type: READ_RECEIPT,
        });
      } catch (err) {
        console.log(err.message);

        dispatch({
          type: READ_RECEIPT,
        });
      }
    } else {
      dispatch({
        type: READ_RECEIPT,
      });
      return goodToGo;
    }
  };
};

export const getAppBanners = () => {
  // console.log('masok func');
  return async (dispatch, getState) => {
    dispatch({
      type: GET_APP_BANNERS,
      loadingState: true,
    });
    // console.log(data);
    const goodToGo = await isReachable();
    if (goodToGo === true) {
      try {
        const responseBase = await fetch(
          "https://portal.bintang7.com/tara/b7connect/get-banners",
          // 'https://b7connect.bintang7.com/b7connect/b7connect/get-banners',
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
              // app_id: "4f19e036",
              // app_key: "bea1235dd0ab23f07f53edfe7b83c27b",
            },
          }
        );
        if (!responseBase.ok) {
          dispatch({
            type: GET_APP_BANNERS,
            loadingState: false,
          });
          // console.log(responseBase);
          return Alert.alert(
            "Something went wrong",
            "Tidak dapat memuat banner, mohon coba beberapa saat lagi"
          );
          // throw new Error('Something went wrong!');
        }

        const responseData = await responseBase.json();
        // console.log(responseData);

        let appBanners = [];
        responseData.map(function (item) {
          appBanners.push({ id: item.OrderNumber, url: item.Url });
        });
        // console.log(appBanners);
        dispatch({
          type: GET_APP_BANNERS,
          loadingState: false,
          appBanners: appBanners,
        });
      } catch (err) {
        dispatch({
          type: GET_APP_BANNERS,
          loadingState: false,
          appBanners: [],
        });
        return Alert.alert("Something went wrong", err.message);
        // throw err;
      }
    } else {
      dispatch({
        type: GET_APP_BANNERS,
        loadingState: false,
      });
      return goodToGo;
    }
  };
};

export const checkAppVersion = (data) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CHECK_APP_VERSION,
      loadingState: true,
    });
    // console.log(data);
    const goodToGo = await isReachable();
    if (goodToGo === true) {
      try {
        const responseBase = await fetch(
          "https://portal.bintang7.com/tara/b7connect/check-app-version",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        const responseData = await responseBase.json();
        // console.log(responseData);

        dispatch({
          type: CHECK_APP_VERSION,
          loadingState: false,
          latestAppVersion: responseData[0],
        });
      } catch (err) {
        return Alert.alert("Something went wrong", err);
      }
    } else {
      dispatch({
        type: CHECK_APP_VERSION,
        loadingState: false,
      });
      return goodToGo;
    }
  };
};
