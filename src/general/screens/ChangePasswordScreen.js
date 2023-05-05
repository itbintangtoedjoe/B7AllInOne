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
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { confirmPasswordValidator } from "../helpers/confirmPasswordValidator";
import * as authActions from "../../general/redux/actions";
import User from "../models/User";

const ChangePasswordScreen = (props) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    error: "",
  });
  const activeUser = useSelector((state) => state.auth.activeUser);
  const [loadingState, setLoadingState] = useState(false);
  const [statusLogin, setStatusLogin] = useState(
    useSelector((state) => state.auth.statusLogin)
  );

  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  const onLoginPressed = () => {
    props.navigation.navigate("Login");
  };

  const onChangePasswordPressed = async () => {
    setLoadingState(true);
    const emailError = emailValidator(email.value);
    // const passwordError = passwordValidator(password.value);
    // const confirmPasswordError = confirmPasswordValidator(
    //   password.value,
    //   confirmPassword.value,
    // );
    // if (emailError || passwordError || confirmPasswordError) {

    if (emailError) {
      setEmail({ ...email, error: emailError });
      // setPassword({...password, error: passwordError});
      // setConfirmPassword({...confirmPassword, error: confirmPasswordError});
      setLoadingState(false);
      return;
    }
    // const data = {email: email.value, password: password.value};
    const data = { email: email.value };

    const goodToGo = await authActions.isReachable();
    if (goodToGo === true) {
      const response = await fetch(
        "https://portal.bintang7.com/tara/users/change-password",
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
        // console.log(response);
      }

      const responseData = await response.json();

      if (responseData == "not found") {
        Alert.alert("Failed", "Email is not registered");
      } else if (responseData == "success") {
        Alert.alert("Success", "A request has been sent to your email");
        props.navigation.navigate("Login");
      } else {
        Alert.alert("Failed", responseData);
      }
      setLoadingState(false);
    } else {
      setLoadingState(false);
      return goodToGo;
    }
    // console.log('responseData: ', responseData);
    // let statusLogin = 'ok';

    // if (responseData == 'no access') {
    //   Alert.alert('Pengubahan Password Gagal', 'Anda tidak memiliki akses');
    //   setLoadingState(false);
    //   setStatusLogin('no access');
    // } else if (responseData == 'success') {
    //   Alert.alert('Pengubahan Password Berhasil', 'Silahkan melakukan login');
    //   setLoadingState(false);
    //   props.navigation.navigate('Login');
    // } else {
    //   Alert.alert('Pengubahan Password Gagal', 'Error, mohon kontak admin');
    //   setStatusLogin('error');
    //   setLoadingState(false);
    // }
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
      {/* <View style={styles.logo}>
        <Text style={styles.logoText}>Document Bank B7</Text>
      </View> */}
      {/* <Logo /> */}
      <Image
        source={require("../../general/assets/logos/b7connect-banner.png")}
        style={styles.logo}
      />
      <Header>Forgot Password?</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        type="email"
        onChangeText={(text) =>
          setEmail({ value: text.toLowerCase(), error: "" })
        }
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      {/* 2<TextInput
        label="New Password"
        returnKeyType="done"
        value={password.value}
        type="password"
        page="changePassword"
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
      />
      <TextInput
        label="Repeat New Password"
        returnKeyType="done"
        value={confirmPassword.value}
        type="password"
        page="changePassword"
        onChangeText={text => setConfirmPassword({value: text, error: ''})}
        error={!!confirmPassword.error}
        errorText={confirmPassword.error}
      /> */}
      {/* <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button> */}
      <TouchableOpacity style={styles.button} onPress={onLoginPressed}>
        <Text style={styles.buttonText}>BACK TO LOGIN</Text>
      </TouchableOpacity>
      <View style={styles.divider10}></View>
      {loadingState ? (
        <ActivityIndicator size="small" color={Colors.primaryColor} />
      ) : (
        <TouchableOpacity
          style={styles.buttonLogin}
          onPress={onChangePasswordPressed}
        >
          <Text style={styles.buttonLoginText}>SEND REQUEST TO EMAIL</Text>
        </TouchableOpacity>
        // <Button mode="contained" onPress={onChangePasswordPressed}>
        //   CHANGE PASSWORD
        // </Button>
      )}
      {/* <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('ResetPasswordScreen')}>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View> */}
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
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.primaryColor,
    borderWidth: 1,
  },
  buttonLogin: {
    height: 40,
    width: "100%",
    borderRadius: 4,
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonLoginText: {
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

export default ChangePasswordScreen;
