import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import PushNotification from "react-native-push-notification";
import { getDeviceToken } from "react-native-device-info";

import * as actions from "../redux/actions";

const RemotePushController = () => {
  const activeUser = useSelector((state) => state.auth.activeUser);
  const dispatch = useDispatch();
  //   const [userToken, setUserToken] = useState('');

  useEffect(() => {
    if (activeUser != null) {
      if (Platform.OS === "android") {
        PushNotification.configure({
          // (optional) Called when Token is generated (iOS and Android)
          onRegister: function (token) {
            // setUserToken(token.token);
            dispatch(actions.saveUserToken(activeUser.nik, token.token));
          },
          // (required) Called when a remote or local notification is opened or received
          onNotification: function (notification) {
            // setUserToken(token.token);
            dispatch(actions.saveUserToken(activeUser.nik, token.token));
            console.log("REMOTE NOTIFICATION ==>", notification);
            // process the notification here
          },
          // Android only: GCM or FCM Sender ID
          senderID: "750574496782",
          popInitialNotification: true,
          requestPermissions: true,
        });
      } else if (Platform.OS === "ios") {
        getDeviceToken()
          .then((deviceToken) => {
            if (deviceToken != null && deviceToken != undefined) {
              dispatch(actions.saveUserToken(activeUser.nik, deviceToken));
            }
          })
          .catch((err) => console.log(err));
      }
    }
  }, []);
  return null;
};
export default RemotePushController;
