import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";
import { TextInput, Card } from "react-native-paper";

import Fonts from "../../general/constants/Fonts";
import MilliardText from "../../general/components/MilliardText";
import Colors from "../../general/constants/Colors";
import Strings from "../../general/constants/Strings";

const ModalRadiusLogin = (props) => {
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [hidePass, setHidePass] = useState(true);

  useEffect(() => {
    console.log(props.usernameValue);
    console.log(props);
  }, []);

  const usernameChangeHandler = (val) => {
    props.onUsernameChange(val);
  };

  const pwdChangeHandler = (val) => {
    props.onPwdChange(val);
  };

  return (
    <Modal
      isVisible={props.isVisible}
      animationIn="zoomIn"
      animationOut="zoomOut"
      onBackdropPress={props.handleLoginK2Modal}
      onBackButtonPress={props.handleLoginK2Modal}
    >
      <View
        style={{
          // flex: 1,
          padding: 15,
          backgroundColor: "white",
          justifyContent: "center",
          paddingVertical: 30,
          borderRadius: 7,
        }}
      >
        {/* <MilliardText style={styles.alertTitle}>
          Please log in with your K2 account
        </MilliardText> */}
        <MilliardText style={styles.alertBody}>
          Please log in with your password
        </MilliardText>
        {props.isPwdWrong ? (
          <MilliardText style={styles.alertErrorMessage}>
            Wrong password, please try again.
          </MilliardText>
        ) : (
          <View></View>
        )}
        {/* <MilliardText style={styles.alertErrorMessage}>
          Wrong password. {props.attemptsLeft > 0 ? props.attemptsLeft : 0}{" "}
          attempts left.
        </MilliardText> */}
        {/* <Text style={styles.textDetail15}>Please explain why</Text> */}
        <View style={styles.listDataContainer}>
          {/* <ReasonInput /> */}
          {/* <TextInput
            value={props.usernameValue}
            onChangeText={usernameChangeHandler}
            style={styles.inputMultiline}
            autoFocus={true}
            selectionColor={Colors.camPrimaryColor}
            placeholder="username"
            placeholderTextColor={Colors.gray}
          /> */}
          <TextInput
            value={props.pwdValue}
            onChangeText={pwdChangeHandler}
            style={styles.pwdInput}
            // autoFocus={true}
            selectionColor={Colors.camPrimaryColor}
            placeholder="password"
            placeholderTextColor={Colors.gray}
            autoCapitalize="none"
            theme={{
              colors: {
                primary: "transparent",
                text: Colors.gray,
              },
            }}
            secureTextEntry={hidePass ? true : false}
            right={
              <TextInput.Icon
                name={hidePass ? "eye-off" : "eye"}
                onPress={() => setHidePass(!hidePass)}
              />
            }
          />
        </View>
        {/* {list()} */}
        {/* <Text>{cartItems[0].nama_item}</Text> */}
        <TouchableOpacity
          style={{
            ...styles.buttonConfirm,
            backgroundColor: Colors.camDarkerGreen,
          }}
          onPress={props.onLoginClicked}
        >
          {props.k2LoadingState === true ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.buttonTextWhite}>Log in</Text>
          )}
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 100,
    flexDirection: "row",
    alignItems: "center",
    height: 30,
    paddingVertical: 5,
    paddingHorizontal: 7,
    borderRadius: 7,
  },
  buttonView: {
    backgroundColor: "#FFEA00",
    alignItems: "center",
    marginTop: 5,
    // backgroundColor: Colors.camPrimaryColor,
  },
  buttonRevise: {
    backgroundColor: Colors.camOrange,
  },
  buttonReject: {
    backgroundColor: Colors.camRed,
    alignItems: "center",
  },
  buttonApprove: {
    backgroundColor: Colors.camDarkerGreen, //'#3ec9de', //
    // backgroundColor: Colors.camPrimaryColor,
  },
  buttonDetails: {
    width: 100,
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    paddingVertical: 5,
    paddingHorizontal: 7,
  },
  buttonDetailsCentered: {
    width: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    paddingVertical: 5,
    // paddingHorizontal: 7,
  },
  buttonText: {
    fontFamily: Fonts.primaryFont,
    fontSize: 14,
    color: "black",
    marginLeft: 7,
  },
  buttonTextWhite: {
    fontFamily: Fonts.primaryFont,
    fontSize: 14,
    color: "white",
    marginLeft: 7,
  },
  buttonCancelText: {
    fontFamily: Fonts.primaryFont,
    fontSize: 14,
    // color: Colors.camRed,
    marginLeft: 7,
  },
  buttonConfirm: {
    height: 40,
    width: "100%",
    borderRadius: 7,
    // backgroundColor: Colors.camRed,
    alignItems: "center",
    justifyContent: "center",
    // borderColor: Colors.camRed,
    // borderWidth: 1,
    // marginTop: 15,
  },
  buttonCancel: {
    height: 40,
    width: "100%",
    borderRadius: 7,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    // borderColor: Colors.camRed,
    borderWidth: 1,
    marginTop: 10,
  },
  pwdInput: {
    borderColor: Colors.gray,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: "#fff",
    // paddingHorizontal: 5,
    height: 40,
    // alignItems: "flex-start",
    // textAlignVertical: "top",
    // paddingHorizontal: 12,
    color: Colors.gray,
    marginBottom: 10,
    // width: "100%",
  },
  textDetail15: {
    fontFamily: Fonts.primaryFont,
    fontSize: 16,
    color: Colors.gray,
    marginBottom: 8,
  },
  alertTitle: {
    fontSize: 18,
    alignItems: "center",
    justifyContent: "center",
    color: "black",
  },
  alertBody: {
    fontSize: 16,
    color: Colors.gray,
    marginBottom: 10,
  },
  alertErrorMessage: {
    fontSize: 14,
    color: Colors.camRed,
    marginBottom: 10,
    marginTop: -5,
  },
  view: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F4F3E9",
  },
  item: {
    padding: 12,
    margin: 4,
    borderRadius: 8,
    borderColor: "black",
    borderWidth: StyleSheet.hairlineWidth,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "whitesmoke",
  },
  alertView: {
    padding: 8,
    backgroundColor: Colors.camDarkerGreen,
  },
});

export default ModalRadiusLogin;
