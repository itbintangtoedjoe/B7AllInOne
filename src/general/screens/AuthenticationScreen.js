//140923 authen screen

import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Alert,
  Image,
  ActivityIndicator,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSelector, useDispatch } from "react-redux";

import Background from "../components/template/Background";
import Logo from "../components/template/Logo";
import Header from "../components/template/Header";
import Button from "../components/template/Button";
import TextInput from "../components/template/TextInput";
import MilliardText from "../components/MilliardText";
import Colors from "../constants/Colors";
import Strings from "../constants/Strings";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import * as authActions from "../redux/actions/authAction";
import * as generalActions from "../redux/actions/generalAction";
import User from "../models/User";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthenticationScreen = (props) => {
  const DEFAULTPASSWORD = "b7c#default";
  const [email, setEmail] = useState({
    // value: "bong.tonny@icloud.com",
    // value: "dennyirawan9@gmail.com",
    // value: "feliciabrilliantb@gmail.com",
    // value: "agus_lemans@yahoo.com",
    value: "",
    error: "",
  });
  const [password, setPassword] = useState({ value: "", error: "" });
  const activeUser = useSelector((state) => state.auth.activeUser);
  const [loadingState, setLoadingState] = useState(false);
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const deviceToken = useSelector((state) => state.general.deviceToken);
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log('app ver: ' + version);
  // }, []);

  const fetchUserLogin = async () => {
    const emailSaved = await AsyncStorage.getItem("email");
    const pwdSaved = await AsyncStorage.getItem("pwd");

    // if (emailSaved !== null) {
    //   props.navigation.navigate("BaseHome");
    // } else {
    //   console.log("zonk");
    // }
    // console.log("----------------");
    // console.log("email: " + emailSaved);
    // console.log("pass: " + pwdSaved);
    if (emailSaved !== null) {
      const data = { email: emailSaved, password: pwdSaved };
      const isssLoggedin = await dispatch(authActions.fetchActiveUser(data));
      if (isssLoggedin) {
        dispatch(generalActions.saveUserToken(activeUser.nik, deviceToken));
        if (password.value == DEFAULTPASSWORD) {
          props.navigation.navigate("ChangePasswordAuthenticated", {
            origin: "login",
          });
        } else {
          props.navigation.navigate("BaseHome");
        }
      } else {
        if (loginStatus == "success") {
          if (password.value == DEFAULTPASSWORD) {
            props.navigation.navigate("ChangePasswordAuthenticated", {
              origin: "login",
            });
          } else {
            props.navigation.navigate("BaseHome");
          }
        } else if (
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
    }
    // else {
    // .then(() => {
    //   console.log("3");
    //   console.log("isloggedin: " + isLoggedIn);
    //   if (isLoggedIn) {
    //     console.log("4");
    //     dispatch(generalActions.saveUserToken(activeUser.nik, deviceToken));
    //     if (password.value == DEFAULTPASSWORD) {
    //       console.log("5");
    //       props.navigation.navigate("ChangePasswordAuthenticated", {
    //         origin: "login",
    //       });
    //     } else {
    //       console.log("6");
    //       props.navigation.navigate("BaseHome");
    //     }
    //   } else {
    //     console.log("7");
    //     if (
    //       loginStatus != "none" &&
    //       loginStatus != undefined &&
    //       loginStatus != "success"
    //     ) {
    //       console.log("8");
    //       if (loginStatus == "no access") {
    //         Alert.alert("Authentication failed", "Acccount not found");
    //       } else if (loginStatus == "wrong password") {
    //         Alert.alert("Authentication failed", "Wrong password");
    //       } else if (loginStatus == "not active") {
    //         Alert.alert(
    //           "Authentication failed",
    //           "You account is currently inactive. Please contact GA."
    //         );
    //       } else {
    //         console.log("9");
    //         Alert.alert(loginStatus);
    //       }
    //     }
    //   }
    //   });
    // } else {
    //   console.log("1b");
    // }
  };

  useEffect(() => {
    fetchUserLogin();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(generalActions.saveUserToken(activeUser.nik, deviceToken));
      if (password.value == DEFAULTPASSWORD) {
        props.navigation.navigate("ChangePasswordAuthenticated", {
          origin: "login",
        });
      } else {
        props.navigation.navigate("BaseHome");
      }
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

  const onLoginPressed = async () => {
    setLoadingState(true);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setLoadingState(false);
      return;
    }
    const data = { email: email.value, password: password.value };

    await dispatch(authActions.fetchActiveUser(data)).then(() => {
      setLoadingState(false);
    });
  };

  return (
    <Background>
      {/* <View style={styles.logo}>
        <Text style={styles.logoText}>Document Bank B7</Text>
      </View> */}
      <Image
        source={require("../../general/assets/logos/b7connect-banner.png")}
        style={styles.logo}
      />
      <MilliardText style={styles.header}>Welcome back.</MilliardText>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        type="email"
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        type="password"
        page="login"
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
      />
      <MilliardText
        style={styles.forgetPassword}
        onPress={() => {
          setLoadingState(false);
          props.navigation.navigate("ChangePassword");
        }}
      >
        Forgot password?
      </MilliardText>
      {Platform.OS == "ios" ? (
        <>
          <View style={styles.dividerTen}></View>
          <MilliardText
            style={styles.forgetPassword}
            onPress={() => {
              setLoadingState(false);
              props.navigation.navigate("RegisterUser");
            }}
          >
            Don't have an account?
          </MilliardText>
        </>
      ) : (
        <></>
      )}

      <View style={styles.dividerTen}></View>
      {loadingState ? (
        <ActivityIndicator size="small" color={Colors.primaryColor} />
      ) : (
        <TouchableOpacity style={styles.button} onPress={onLoginPressed}>
          <Text style={styles.buttonText}>LOG IN</Text>
        </TouchableOpacity>
      )}

      <MilliardText style={styles.appVersion}>
        B7 Connect ver. {Strings.appVersion}
      </MilliardText>
      <MilliardText style={styles.copyright}>
        Copyright&nbsp;
        <Icon name="copyright" size={15} color={Colors.primaryColor} /> 2023 PT.
        Bintang Toedjoe
      </MilliardText>
    </Background>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: "70%",
    height: 30,
    marginBottom: 5,
  },
  // logoText: {
  //   fontSize: 30,
  //   color: Colors.primaryColor,
  //   fontWeight: 'bold',
  // },
  header: {
    fontFamily: "Milliard-Book",
    fontSize: 21,
    color: Colors.primaryColor,
    fontWeight: "bold",
    paddingVertical: 12,
  },
  forgetPassword: {
    width: "100%",
    alignItems: "flex-end",
    textDecorationLine: "underline",
    color: Colors.primaryColor,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: Colors.primaryColor,
  },
  link: {
    fontWeight: "bold",
    color: Colors.primaryColor,
  },
  buttonContainer: {
    marginTop: 10,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    height: 40,
    width: "100%",
    borderRadius: 7,
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
    // borderColor: Colors.primaryColor,
    // borderWidth: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26,
  },
  appVersion: {
    marginTop: 10,
    color: Colors.primaryColor,
    textAlign: "center",
  },
  copyright: {
    marginTop: 5,
    color: Colors.primaryColor,
    textAlign: "center",
  },
  dividerFive: {
    marginBottom: 5,
  },
  dividerTen: {
    marginBottom: 15,
  },
});

export default AuthenticationScreen;
