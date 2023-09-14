import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";

import Fonts from "../../general/constants/Fonts";
import MilliardText from "../../general/components/MilliardText";
import Colors from "../../general/constants/Colors";
import Strings from "../../general/constants/Strings";

const ModalReasonCAM = (props) => {
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [buttonText, setButtonText] = useState("");

  const reasonChangeHandler = (val) => {
    props.onReasonChange(val);
  };

  useEffect(() => {
    if (props.action == "Reject") {
      setModalTitle("Reject Transaction?");
      setModalBody("Are you sure you want to reject selected transaction?");
      setButtonText("Reject Transaction");
    } else {
      setModalTitle("Revise Transaction?");
      setModalBody("Are you sure you want to revise selected transaction?");
      setButtonText("Revise Transaction");
    }
  }, [props.action]);

  return (
    <Modal
      isVisible={props.isVisible}
      animationIn="zoomIn"
      animationOut="zoomOut"
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
        <MilliardText style={styles.alertTitle}>{modalTitle}</MilliardText>
        <MilliardText style={styles.alertBody}>{modalBody}</MilliardText>
        <Text style={styles.textDetail15}>Please explain why</Text>
        <View style={styles.listDataContainer}>
          {/* <ReasonInput /> */}
          <TextInput
            value={props.actionReason}
            onChangeText={reasonChangeHandler}
            multiline={true}
            style={styles.inputMultiline}
            autoFocus={true}
            selectionColor={Colors.camPrimaryColor}
          />
        </View>
        {/* {list()} */}
        {/* <Text>{cartItems[0].nama_item}</Text> */}
        <TouchableOpacity
          style={{
            ...styles.buttonConfirm,
            backgroundColor: props.actionColor,
          }}
          onPress={
            props.action == "Reject"
              ? props.onRejectConfirmed
              : props.onReviseConfirmed
          }
        >
          <Text style={styles.buttonTextWhite}>{buttonText}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.buttonCancel, borderColor: props.actionColor }}
          onPress={props.handleRejectModal}
        >
          <Text
            style={{ ...styles.buttonCancelText, color: props.actionColor }}
          >
            Cancel
          </Text>
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
    marginTop: 15,
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
  inputMultiline: {
    borderColor: Colors.gray,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 5,
    height: 75,
    alignItems: "flex-start",
    textAlignVertical: "top",
    paddingHorizontal: 12,
    color: Colors.gray,
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

export default ModalReasonCAM;
