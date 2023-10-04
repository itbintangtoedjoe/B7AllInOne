import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ImageBackground,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import * as authActions from "../redux/actions/authAction";
import * as generalActions from "../redux/actions/generalAction";

const SplashScreen = (props) => {
  const image = { uri: "../assets/splashscreen/splash.png" };
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const activeUser = useSelector((state) => state.auth.activeUser);
  const deviceToken = useSelector((state) => state.general.deviceToken);

  const fetchUserLogin = async () => {
    const emailSaved = await AsyncStorage.getItem("email");
    const pwdSaved = await AsyncStorage.getItem("pwd");

    // if (emailSaved !== null) {
    //   props.navigation.navigate("BaseApp");
    // } else {
    //   console.log("zonk");
    // }
    console.log("----------------");
    console.log("email: " + emailSaved);
    console.log("pass: " + pwdSaved);
    console.log("1");
    if (emailSaved !== null) {
      console.log("1a");
      const data = { email: emailSaved, password: pwdSaved };
      console.log("2");
      const isssLoggedin = await dispatch(authActions.fetchActiveUser(data));
      console.log("isssLoggedin: " + isssLoggedin);
      if (isssLoggedin) {
        console.log("4");
        dispatch(generalActions.saveUserToken(activeUser.nik, deviceToken));
        if (password.value == DEFAULTPASSWORD) {
          console.log("5");
          props.navigation.navigate("ChangePasswordAuthenticated", {
            origin: "login",
          });
        } else {
          console.log("6");
          props.navigation.navigate("BaseHome");
        }
      }
    } else {
      props.navigation.navigate("BaseAuth");
      console.log("8");
    }
  };

  useEffect(() => {
    fetchUserLogin();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(generalActions.saveUserToken(activeUser.nik, deviceToken));
      props.navigation.navigate("BaseHome");
    } else {
      if (
        loginStatus != "none" &&
        loginStatus != undefined &&
        loginStatus != "success"
      ) {
        if (loginStatus == "no access") {
          Alert.alert("Authentication failed", "Acccount not found");
        } else if (loginStatus == "wrong password") {
          Alert.alert("Authentication failed", "Wrong password");
        } else if (loginStatus == "not active") {
          Alert.alert(
            "Authentication failed",
            "You account is currently inactive. Please contact GA."
          );
        } else {
          Alert.alert(loginStatus);
        }
      }
    }
  }, [dispatch, loginStatus]);

  return (
    <ImageBackground
      source={require("../assets/splashscreen/splash.png")}
      resizeMode="stretch"
      style={styles.background}
    ></ImageBackground>
    // <View style={styles.container}>
    //   <Image
    //     source={require("../assets/splashscreen/splash.png")}
    //     style={styles.backgroundImage}
    //   >
    //     <View style={styles.loginForm}>
    //       <Text>TEST</Text>
    //     </View>
    //   </Image>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
});

export default SplashScreen;
