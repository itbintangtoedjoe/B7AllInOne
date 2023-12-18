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
import {
  nameValidator,
  nikValidator,
  lobValidator,
} from "../helpers/nameValidator";
import * as authActions from "../../general/redux/actions";
import User from "../models/User";

const RegisterUserScreen = (props) => {
  const [nik, setNIK] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [fullName, setFullName] = useState({ value: "", error: "" });
  const [lob, setLOB] = useState({ value: "", error: "" });
  const [loadingState, setLoadingState] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  const onLoginPressed = () => {
    props.navigation.navigate("Login");
  };

  const onSendRequestClicked = async () => {
    setLoadingState(true);
    const nameError = nameValidator(fullName.value);
    // const nikError = nikValidator(nik.value);
    const lobError = lobValidator(lob.value);
    const emailError = emailValidator(email.value);

    if (emailError || lobError || nameError) {
      setEmail({ ...email, error: emailError });
      setFullName({ ...fullName, error: nameError });
      setLOB({ ...nik, error: lobError });
      // setNIK({ ...lob, error: nikError });
      setLoadingState(false);
      return;
    }

    const data = {
      email: email.value,
      nik: nik.value,
      namaUser: fullName.value,
      departemen: lob.value,
      isactive: 0,
    };

    console.log(data);

    const goodToGo = await authActions.isReachable();
    if (goodToGo === true) {
      const response = await fetch(
        "https://portal.bintang7.com/ekspedisionline/users/register-user",
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

      if (responseData == "NIK EXISTS") {
        Alert.alert("Failed", "NIK is already registered");
      } else if (responseData == "EMAIL EXISTS") {
        Alert.alert("Failed", "Email is already registered");
        //DUMMY only, karna balikannya itu nik. bisa jadi ini failed
        // } else if (responseData == "SUCCESS") {
      } else {
        Alert.alert(
          "Success",
          "Your request has been sent. You will be notified by email if the request is approved"
        );
        props.navigation.navigate("Login");
      }
      // else {
      //   Alert.alert("Failed", responseData);
      // }
      setLoadingState(false);
    } else {
      setLoadingState(false);
      return goodToGo;
    }
  };

  return (
    <Background>
      <Image
        source={require("../../general/assets/logos/b7connect-banner.png")}
        style={styles.logo}
      />
      <Header>Request for a New Account</Header>
      <TextInput
        label="Full Name"
        returnKeyType="next"
        value={fullName.value}
        onChangeText={(text) => setFullName({ value: text, error: "" })}
        error={!!fullName.error}
        errorText={fullName.error}
        autoCapitalize="characters"
      />
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
      <TextInput
        label="LOB"
        returnKeyType="done"
        value={lob.value}
        onChangeText={(text) => setLOB({ value: text, error: "" })}
        error={!!lob.error}
        errorText={lob.error}
        autoCapitalize="characters"
      />
      <TextInput
        label="NIK (optional)"
        returnKeyType="next"
        value={nik.value}
        onChangeText={(text) => setNIK({ value: text, error: "" })}
        error={!!nik.error}
        errorText={nik.error}
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={onLoginPressed}>
        <Text style={styles.buttonText}>BACK TO LOGIN</Text>
      </TouchableOpacity>
      <View style={styles.divider10}></View>
      {loadingState ? (
        <ActivityIndicator size="small" color={Colors.primaryColor} />
      ) : (
        <TouchableOpacity
          style={styles.buttonLogin}
          onPress={onSendRequestClicked}
        >
          <Text style={styles.buttonLoginText}>SEND REQUEST</Text>
        </TouchableOpacity>
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

export default RegisterUserScreen;
