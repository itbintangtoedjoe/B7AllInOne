/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useMemo } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  BackHandler,
  Alert,
  Image,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Provider } from "react-redux";
import SplashScreen from "react-native-splash-screen";
import { ToastProvider } from "react-native-toast-notifications";
import { useSelector, useDispatch } from "react-redux";
import { Notifications } from "react-native-notifications";

import Colors from "./src/general/constants/Colors";
import MilliardText from "./src/general/components/MilliardText";
import BaseNavigator from "./src/general/navigation";
import { store } from "./src/general/redux/store";
import NavigationService from "./src/general/NavigationService";
// import RemotePushController from "./src/general/services/RemotePushController";

import * as generalAction from "./src/general/redux/actions/generalAction";
import { version } from "./package.json";

console.reportErrorsAsExceptions = false;

const App = () => {
  ////////////////CHECK VERSION////////////////
  // const latestAppVersion = useSelector(state => state.general.latestAppVersion);
  // const checkingVerLoadingState = useSelector(
  //   state => state.general.checkingVerLoadingState,
  // );

  const dispatch = useDispatch();

  // const VersionCheckMessage = () => {
  //   if (Platform.OS === 'ios') {
  //     SplashScreen.hide();
  //     return (
  //       <ToastProvider
  //         successColor={Colors.primaryColor}
  //         textStyle={{
  //           fontFamily: 'Milliard-Book',
  //         }}
  //         offsetBottom={40}>
  //         {/* <Provider store={store}> */}
  //         <BaseNavigator
  //           ref={navigatorRef => {
  //             NavigationService.setTopLevelNavigator(navigatorRef);
  //           }}
  //         />
  //         {/* </Provider> */}
  //         {/* <RemotePushController /> */}
  //       </ToastProvider>
  //     );
  //   } else {
  //     if (checkingVerLoadingState) {
  //       console.log('still checking');
  //       return (
  //         <View style={styles.content}>
  //           <ActivityIndicator size="small" color={Colors.primaryColor} />
  //         </View>
  //       );
  //     }
  //     if (
  //       latestAppVersion == undefined ||
  //       latestAppVersion == null ||
  //       latestAppVersion == ''
  //     ) {
  //       console.log('masih kosong');
  //       return null;
  //     } else if (version == latestAppVersion.LatestVersion) {
  //       console.log('up to date(y)');
  //       SplashScreen.hide();
  //       if (Platform.OS === 'android') {
  //         Alert.alert(
  //           'Youre good to go',
  //           'Please update on the Play Store to access the app',
  //         );
  //       } else {
  //         Alert.alert('Youre good to go');
  //       }
  //       return (
  //         <ToastProvider
  //           successColor={Colors.primaryColor}
  //           textStyle={{
  //             fontFamily: 'Milliard-Book',
  //           }}
  //           offsetBottom={40}>
  //           {/* <Provider store={store}> */}
  //           <BaseNavigator
  //             ref={navigatorRef => {
  //               NavigationService.setTopLevelNavigator(navigatorRef);
  //             }}
  //           />
  //           {/* </Provider> */}
  //           {/* <RemotePushController /> */}
  //         </ToastProvider>
  //       );
  //     } else {
  //       console.log('needs an update');
  //       if (latestAppVersion.IsMandatory === true) {
  //         if (Platform.OS === 'android') {
  //           Alert.alert(
  //             'B7 Connect needs an update',
  //             'Please update on the Play Store to access the app',
  //             [],
  //           );
  //           setTimeout(() => {
  //             BackHandler.exitApp();
  //           }, 1500);
  //         } else {
  //           Alert.alert('B7 Connect needs an update');
  //         }
  //         // SplashScreen.show();
  //         return null;
  //       } else {
  //         Alert.alert(
  //           "There's an update available",
  //           'Update on the Play Store to access the newest features',
  //         );
  //         SplashScreen.hide();
  //         return (
  //           <ToastProvider
  //             successColor={Colors.primaryColor}
  //             textStyle={{
  //               fontFamily: 'Milliard-Book',
  //             }}
  //             offsetBottom={40}>
  //             {/* <Provider store={store}> */}
  //             <BaseNavigator
  //               ref={navigatorRef => {
  //                 NavigationService.setTopLevelNavigator(navigatorRef);
  //               }}
  //             />
  //             {/* </Provider> */}
  //             {/* <RemotePushController /> */}
  //           </ToastProvider>
  //         );
  //       }
  //     }
  //     // return <CarouselCards data={appBanners} />;
  //   }
  // };

  // useEffect(() => {
  //   //check app ver
  //   const data = {
  //     appVersion: version,
  //   };
  //   dispatch(generalAction.checkAppVersion(data));
  // }, [dispatch]);
  ////////////////CHECK VERSION////////////////

  // if (checkingVerLoadingState) {
  //   return (
  //     <View style={styles.content}>
  //       <ActivityIndicator size="small" color={Colors.primaryColor} />
  //     </View>
  //   );
  // } else if (!checkingVerLoadingState) {
  //   console.log('curr ver: ' + version);
  //   console.log('latest ver: ' + latestAppVersion);
  //   console.log(version == latestAppVersion);
  //   if (version == latestAppVersion) {
  //     SplashScreen.hide();
  //     Alert.alert(
  //       'Youre good to go',
  //       'Please update on the Play Store to access the app',
  //     );
  //   } else {
  //     Alert.alert(
  //       'B7 Connect needs an update',
  //       'Please update on the Play Store to access the app',
  //     );
  //     // SplashScreen.show();
  //     return null;
  //   }
  // }

  // if (checkingVerLoadingState) {
  //   return (
  //     <View style={styles.content}>
  //       <MilliardText style={{marginBottom: 10}}>
  //         Please wait while we're checking your app version
  //       </MilliardText>
  //       <ActivityIndicator size="small" color={Colors.primaryColor} />
  //     </View>
  //   );
  // }

  useEffect(() => {
    SplashScreen.hide();
  });
  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert(
  //       'Exit B7 All-In-One?',
  //       'Anda yakin keluar dari aplikasi TARA?',
  //       [
  //         {
  //           text: 'Batalkan',
  //           onPress: () => null,
  //           style: 'cancel',
  //         },
  //         {text: 'Ya', onPress: () => BackHandler.exitApp()},
  //       ],
  //     );
  //     return true;
  //   };
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // });
  useMemo(() => {
    console.log("This is useMemo");
    Notifications.registerRemoteNotifications();
    Notifications.events().registerRemoteNotificationsRegistered((event) => {
      // TODO: Send the token to my server so it could send back push notifications...
      console.log("Device Token Received", event.deviceToken);
      dispatch(generalAction.saveDeviceToken(event.deviceToken));
    });
    Notifications.events().registerRemoteNotificationsRegistrationFailed(
      (event) => {
        console.error(event);
      }
    );
    // Notifications.events().registerNotificationOpened(
    //   (notification, completion, action) => {
    //     console.log("Notification opened by device user", notification.payload);
    //     console.log(
    //       `Notification opened with an action identifier: ${action.identifier} and response text: ${action.text}`
    //     );
    //     completion();
    //   }
    // );
    //to get notif when the app is opened by user
    Notifications.events().registerNotificationReceivedForeground(
      (notification, completion) => {
        console.log("Notification Received - Foreground", notification.payload);

        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({ alert: true, sound: true, badge: false });
      }
    );
  }, []);

  return (
    <ToastProvider
      successColor={Colors.primaryColor}
      textStyle={{
        fontFamily: "Milliard-Book",
      }}
      offsetBottom={40}
    >
      {/* <Provider store={store}> */}
      <BaseNavigator
        ref={(navigatorRef) => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
      {/* </Provider> */}
      {/* <RemotePushController /> */}
    </ToastProvider>
  );

  // return <VersionCheckMessage />;
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
