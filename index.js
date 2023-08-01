/**
 * @format
 */

import React from "react";
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { Provider } from "react-redux";
// import PushNotification, { Importance } from "react-native-push-notification";

import { store } from "./src/general/redux/store";

const ReduxProvider = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => ReduxProvider);

// PushNotification.createChannel(
//   {
//     channelId: "b7con-chan-id", // (required)
//     channelName: "Notif Channel", // (required)
//     channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
//     playSound: false, // (optional) default: true
//     soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
//     importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
//     vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
//   },
//   (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
// );
