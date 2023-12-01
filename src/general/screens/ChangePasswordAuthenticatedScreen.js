import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { NavigationActions } from "react-navigation";

import Background from "../components/template/Background";
import Logo from "../components/template/Logo";
import Header from "../components/template/Header";
import Button from "../components/template/Button";
import TextInput from "../components/template/TextInput";
import Colors from "../constants/Colors";
import {
  emailValidator,
  confirmPasswordValidator,
  newPasswordValidator,
} from "../helpers";
import * as authActions from "../../general/redux/actions";
import User from "../models/User";
import { color } from "react-native-reanimated";

const ChangePasswordAuthenticatedScreen = (props) => {
  const origin = props.navigation.getParam("origin");
  const userEmail = props.navigation.getParam("userEmail");
  const [password, setPassword] = useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    error: "",
  });
  const activeUser = useSelector((state) => state.auth.activeUser);
  const [email, setEmail] = useState({ value: userEmail, error: "" });
  const [loadingState, setLoadingState] = useState(false);
  const [statusLogin, setStatusLogin] = useState(
    useSelector((state) => state.auth.statusLogin)
  );

  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  const validatePassword = (pw) => {
    let val = "(?m)^((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W]).{8,})$";
    return pw.test(val);
  };

  const onLoginPressed = () => {
    props.navigation.navigate("Login");
  };

  const onChangePasswordPressed = async () => {
    setLoadingState(true);
    const emailError = emailValidator(email.value);
    const passwordError = newPasswordValidator(password.value);
    const confirmPasswordError = confirmPasswordValidator(
      password.value,
      confirmPassword.value
    );

    if (emailError || passwordError || confirmPasswordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setConfirmPassword({ ...confirmPassword, error: confirmPasswordError });
      setLoadingState(false);
      return;
    }
    // else if (password.value == 'b7c#default') {
    //   Alert.alert('Gagal', 'Password tidak boleh sama dengan password default');
    //   setLoadingState(false);
    //   return;
    // } else if (!validatePassword(password.value)) {
    //   Alert.alert(
    //     'Gagal',
    //     'Password harus memiliki minimal:\n1 huruf kapital\1 angka',
    //   );
    //   return;
    // }
    const data = { nik: activeUser.nik, password: password.value };
    const goodToGo = await authActions.isReachable();
    if (goodToGo === true) {
      const response = await fetch(
        "https://portal.bintang7.com/tara/users/change-password-authenticated",
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
        setLoadingState(false);
        Alert.alert("Error", "Something went wrong");
      }

      const responseData = await response.json();
      if (responseData == "success") {
        Alert.alert("Success", "Password changed successfully");
        dispatch(authActions.logout()).then(() => {
          props.navigation.navigate({
            routeName: "BaseAuth",
          });
        });
      } else {
        Alert.alert("Failed", responseData);
      }
      setLoadingState(false);
    } else {
      setLoadingState(false);
      return goodToGo;
    }
  };

  const onBackButtonPressed = () => {
    props.navigation.navigate("BaseApp");
  };

  // if (loadingState) {
  //   return (
  //     <View style={styles.content}>
  //       <ActivityIndicator size="small" color={Colors.primaryColor} />
  //     </View>
  //   );
  // }

  return (
    <Background>
      <Image
        source={require("../../general/assets/logos/b7connect-banner.png")}
        style={styles.logo}
      />
      <Header>Change Password</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        type="email"
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        editable={false}
        selectTextOnFocus={false}
        style={{ backgroundColor: Colors.accentColor }}
      />
      <TextInput
        label="New Password"
        returnKeyType="done"
        value={password.value}
        type="password"
        page="changePassword"
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
      />
      <TextInput
        label="Repeat New Password"
        returnKeyType="done"
        value={confirmPassword.value}
        type="password"
        page="changePassword"
        onChangeText={(text) => setConfirmPassword({ value: text, error: "" })}
        error={!!confirmPassword.error}
        errorText={confirmPassword.error}
      />
      <View style={styles.divider10}></View>
      {loadingState ? (
        <ActivityIndicator size="small" color={Colors.primaryColor} />
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={onChangePasswordPressed}
        >
          <Text style={styles.buttonSimpanText}>SAVE NEW PASSWORD</Text>
        </TouchableOpacity>
      )}
      <View style={styles.divider10}></View>
      {origin == "profile" ? (
        <TouchableOpacity
          style={styles.buttonBack}
          onPress={onBackButtonPressed}
        >
          <Text style={styles.buttonText}>BACK</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </Background>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: "70%",
    height: 30,
    marginBottom: 5,
  },
  logoText: {
    color: "white",
  },
  forgetPassword: {
    width: "100%",
    alignItems: "flex-end",
    textDecorationLine: "underline",
    color: Colors.taraPrimaryColor,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: Colors.taraPrimaryColor,
  },
  link: {
    fontWeight: "bold",
    color: Colors.taraPrimaryColor,
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
    borderRadius: 4,
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonBack: {
    height: 40,
    width: "100%",
    borderRadius: 4,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.primaryColor,
    borderWidth: 1,
  },
  buttonSimpanText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26,
  },
  buttonText: {
    color: Colors.primaryColor,
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26,
  },
  divider10: {
    marginBottom: 10,
  },
});

export default ChangePasswordAuthenticatedScreen;
