import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  Linking,
  TextInput,
  Alert,
  ActivityIndicator,
  // Modal,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { withNavigation } from "react-navigation";
import { useDispatch, useSelector } from "react-redux";
import AwesomeAlert from "react-native-awesome-alerts";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as authActions from "../../general/redux/actions/authAction";
import * as actions from "../redux/actions/camAction";
import Colors from "../../general/constants/Colors";
import Card from "./Card";
// import Button from '../../general/components/template/Button';
import Fonts from "../../general/constants/Fonts";
import Strings from "../../general/constants/Strings";
import MilliardText from "../../general/components/MilliardText";
import ModalReasonCAM from "./ModalReasonCAM";
import ModalRadiusLogin from "./ModalRadiusLogin";
import moment, { min } from "moment/moment";

const TaskItem = (props) => {
  const dispatch = useDispatch();

  const activeUser = useSelector((state) => state.auth.activeUser);
  const [showDetails, setShowDetails] = useState(false);
  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
  const [isModalReasonVisible, setIsModalReasonVisible] = useState(false);
  const [isModalRadiusLoginVisible, setIsModalRadiusLoginVisible] =
    useState(false);
  // const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  // const [isReviseModalVisible, setIsReviseModalVisible] = useState(false);
  const [isModalLoadingVisible, setIsModalLoadingVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // const [alasanReject, setAlasanReject] = useState("");
  const loadingState = useSelector((state) => state.cam.approvalLoadingState);
  // const statusApproval = useSelector((state) => state.cam.statusApproval);
  const approvalLoadingState = useSelector(
    (state) => state.cam.approvalLoadingState
  );
  const statusApproval = useSelector((state) => state.cam.statusApproval);
  const k2LoginStatus = useSelector((state) => state.auth.loginRadiusStatus);
  const k2LoadingState = useSelector(
    (state) => state.auth.loginRadiusLoadingState
  );
  const isK2LoggedIn = useSelector((state) => state.auth.isRadiusLoggedIn);

  const [showAlert, setShowAlert] = useState(false);
  //alert props
  const [alertTitle, setaAlertTitle] = useState("Title");
  const [alertBody, setaAlertBody] = useState("Body");
  const [alertOptionTrue, setaAlertOptionTrue] = useState("Confirm");
  const [alertOptionFalse, setaAlertOptionFalse] = useState("Cancel");
  const [actionClicked, setActionClicked] = useState("Approve");
  const [actionColor, setActionColor] = useState(Colors.camDarkerGreen);
  const [reason, setReason] = useState("");
  const [detailTransUrl, setDetailTransUrl] = useState(props.url);
  const [usernameInput, setUsernameInput] = useState("k2.service");
  const [pwdInput, setPwdInput] = useState("");
  const [isTransK2, setIsTransK2] = useState(false);
  const [numOfAttempts, setNumOfAttempts] = useState(0);
  const loginK2 = useSelector((state) => state.cam.statusApproval);
  const [isPwdWrong, setIsPwdWrong] = useState(false);
  const [startDateRadiusSession, setStartDateRadiusSession] = useState();
  const [expDateRadiusSession, setExpDateRadiusSession] = useState();
  // const [usernameInput, setUsernameInput] = useState("");
  // const [pwdInput, setPwdInput] = useState("");

  // console.log("0. Exp Date Open: ", expDateRadiusSession);

  useEffect(() => {
    if (actionClicked == "Approve") {
      setActionColor(Colors.camDarkerGreen);
    } else if (actionClicked == "Reject") {
      setActionColor(Colors.camRed);
    } else if (actionClicked == "Revise") {
      setActionColor(Colors.camOrange);
    }
  }, [actionClicked]);

  // useEffect(() => {
  //   console.log(props);
  // }, []);

  // const reactNativeLogoSrc = {
  //   uri: "https://reactnative.dev/docs/assets/favicon.png",
  // };
  const toastMaster = [
    {
      name: "ApproveSuccessful",
      alertData: {
        type: "",
        title: "Success",
        message: "Transaction successfully approved!",
        interval: 500,
        // setShowAlert(true);
        // props.toastMessageAction(toastMaster);
        // .then(() => {
        //   dispatch(actions.fetchUserPendingTask(props.activeUser));
        // });
      },
      alertProps: {
        alertViewStyle: styles.alertView,
      },
      color: Colors.camDarkerGreen,
    },
    {
      name: "ApproveFailed",
      alertData: {
        type: "",
        title: "Failed",
        message: statusApproval,
        // source: reactNativeLogoSrc,
        interval: 500,
      },
      alertProps: {
        alertViewStyle: styles.alertView,
      },
      color: Colors.camDarkerGreen,
    },
    {
      name: "RejectSuccessful",
      alertData: {
        type: "",
        title: "Success",
        message: "Transaction successfully rejected!",
        interval: 500,
        // setShowAlert(true);
        // props.toastMessageAction(toastMaster);
        // .then(() => {
        //   dispatch(actions.fetchUserPendingTask(props.activeUser));
        // });
      },
      alertProps: {
        alertViewStyle: styles.alertView,
      },
      color: Colors.camDarkerGreen,
    },
    {
      name: "RejectFailed",
      alertData: {
        type: "",
        title: "Failed",
        message: statusApproval,
        // source: reactNativeLogoSrc,
        interval: 500,
      },
      alertProps: {
        alertViewStyle: styles.alertView,
      },
      color: Colors.camDarkerGreen,
    },
    {
      name: "ReviseSuccessful",
      alertData: {
        type: "",
        title: "Success",
        message: "Transaction successfully revised!",
        interval: 500,
        // setShowAlert(true);
        // props.toastMessageAction(toastMaster);
        // .then(() => {
        //   dispatch(actions.fetchUserPendingTask(props.activeUser));
        // });
      },
      alertProps: {
        alertViewStyle: styles.alertView,
      },
      color: Colors.camDarkerGreen,
    },
    {
      name: "ReviseFailed",
      alertData: {
        type: "",
        title: "Failed",
        message: statusApproval,
        // source: reactNativeLogoSrc,
        interval: 500,
      },
      alertProps: {
        alertViewStyle: styles.alertView,
      },
      color: Colors.camDarkerGreen,
    },
    {
      name: "LoginK2Success",
      alertData: {
        type: "",
        title: "Success",
        message: "Transaction successfully revised!",
        interval: 500,
      },
      alertProps: {
        alertViewStyle: styles.alertView,
      },
      color: Colors.camDarkerGreen,
    },
  ];

  const showToastMessage = (item) => {
    props.toastMessageAction(item);
  };

  const handleApproveModal = () => {
    setActionClicked("Approve");
    setIsApproveModalVisible(() => !isApproveModalVisible);
    setReason("");
  };

  const handleRejectModal = () => {
    setActionClicked("Reject");
    setIsModalReasonVisible(() => !isModalReasonVisible);
    setReason("");
  };

  const handleReviseModal = () => {
    let keys = ["pwdRadius"];
    AsyncStorage.multiRemove(keys);
    setActionClicked("Revise");
    setIsModalReasonVisible(() => !isModalReasonVisible);
    setReason("");
  };

  const handleK2LoginModal = () => {
    setIsModalRadiusLoginVisible(() => !isModalRadiusLoginVisible);
    setIsPwdWrong(false);
  };

  const reasonHandler = (val) => {
    setReason(val);
  };

  const usernameHandler = (val) => {
    setUsernameInput(val);
  };

  const pwdHandler = (val) => {
    setPwdInput(val);
  };

  const ActionAlert = () => {
    return (
      <AwesomeAlert
        show={showAlert}
        title={alertTitle}
        titleStyle={{
          fontSize: 18,
          color: "black",
          fontFamily: Fonts.primaryFont,
        }}
        message={alertBody}
        messageStyle={{
          color: Colors.gray,
          fontSize: 16,
          fontFamily: Fonts.primaryFont,
        }}
        showCancelButton={true}
        cancelText={alertOptionFalse}
        cancelButtonStyle={{
          backgroundColor: "white",
          borderColor: actionColor,
          borderWidth: 1,
          width: 100,
          height: 45,
          justifyContent: "center",
          alignItems: "center",
        }}
        cancelButtonTextStyle={{
          fontSize: 16,
          fontFamily: Fonts.primaryFont,
          color: actionColor,
        }}
        onCancelPressed={() => {
          // console.log("Cancel button pressed");
          setShowAlert(false);
        }}
        showConfirmButton={true}
        confirmText={alertOptionTrue}
        confirmButtonStyle={{
          backgroundColor: actionColor,
          width: 100,
          height: 45,
          justifyContent: "center",
          alignItems: "center",
        }}
        confirmButtonTextStyle={{
          fontSize: 16,
          fontFamily: Fonts.primaryFont,
        }}
        onConfirmPressed={() => {
          // console.log("Confirm button pressed");
          setShowAlert(false);
        }}
        // showProgress={true}
        // progressColor="red"
        // progressSize={40}

        closeOnTouchOutside={true} // default true
        closeOnHardwareBackPress={true} // default true
        // customView={
        //   <View
        //     style={{
        //       // backgroundColor: "lightgreen",
        //       // padding: 10,
        //       marginTop: 10,
        //       borderRadius: 10,
        //     }}
        //   >
        //     <MilliardText style={{ color: Colors.gray }}>
        //       Please enter reason
        //     </MilliardText>
        //     <TextInput
        //       value={reason}
        //       onChangeText={(itemValue) => setReason(itemValue)}
        //       multiline={true}
        //       style={{ ...styles.inputMultiline, borderColor: actionColor }}
        //     />
        //   </View>
        // }
      />
    );
  };

  const ActionResultAlert = () => {
    return (
      <AwesomeAlert
        show={showAlert}
        title={alertTitle}
        titleStyle={{
          fontSize: 18,
          color: "black",
          fontFamily: Fonts.primaryFont,
        }}
        message={alertBody}
        messageStyle={{
          color: Colors.gray,
          fontSize: 16,
          fontFamily: Fonts.primaryFont,
        }}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText={alertOptionTrue}
        confirmButtonStyle={{
          backgroundColor: actionColor,
          width: 100,
          height: 45,
          justifyContent: "center",
          alignItems: "center",
        }}
        confirmButtonTextStyle={{
          fontSize: 16,
          fontFamily: Fonts.primaryFont,
        }}
        onConfirmPressed={() => {
          console.log("Confirm button pressed");
          setShowAlert(false);
        }}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
      />
    );
  };

  const ModalApprove = () => {
    return (
      //   <Modal transparent={true} visible={modalVisible}>
      //     <TextInput
      //       style={styles.input}
      //       placeholder="useless placeholder"
      //       keyboardType="numeric"
      //     />
      //   </Modal>
      //   <Pressable
      //     style={[styles.button, styles.buttonOpen]}
      //     onPress={() => setModalVisible(true)}
      //   >
      //     <Text style={styles.textStyle}>Show Modal</Text>
      //   </Pressable>
      // </View>
      <Modal
        isVisible={isApproveModalVisible}
        animationIn="zoomIn"
        animationOut="zoomOut"
        onBackdropPress={handleApproveModal}
        onBackButtonPress={handleApproveModal}
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
          <MilliardText style={styles.alertTitle}>
            Approve Transaction?
          </MilliardText>
          <MilliardText style={styles.alertBody}>
            Are you sure you want to approve selected transaction?
          </MilliardText>
          <TouchableOpacity
            style={{ ...styles.buttonConfirm, backgroundColor: actionColor }}
            onPress={approveTransaction}
          >
            <Text style={styles.buttonTextWhite}>Approve Transaction</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.buttonCancel, borderColor: actionColor }}
            onPress={handleApproveModal}
          >
            <Text style={{ ...styles.buttonCancelText, color: actionColor }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  const ReasonInput = () => {
    return (
      <TextInput
        value={reason}
        onChangeText={setReason}
        multiline={true}
        style={styles.inputMultiline}
        autoFocus={true}
        selectionColor={Colors.camPrimaryColor}
      />
    );
  };

  // const ModalReject = () => {
  //   return (
  //     <Modal visible={isRejectModalVisible}>
  //       <View
  //         style={{
  //           // flex: 1,
  //           padding: 15,
  //           backgroundColor: "white",
  //           justifyContent: "center",
  //           paddingVertical: 30,
  //           borderRadius: 7,
  //         }}
  //       >
  //         <MilliardText style={styles.alertTitle}>
  //           Reject Transaction?
  //         </MilliardText>
  //         <MilliardText style={styles.alertBody}>
  //           Are you sure you want to reject selected transaction?
  //         </MilliardText>
  //         <Text style={styles.textDetail15}>Please explain why</Text>
  //         <View style={styles.listDataContainer}>
  //           {/* <ReasonInput /> */}
  //           <TextInput
  //             value={reason}
  //             onChangeText={(itemValue) => setReason(itemValue)}
  //             multiline={true}
  //             style={styles.inputMultiline}
  //             // autoFocus={true}
  //             selectionColor={Colors.camPrimaryColor}
  //           />
  //         </View>
  //         {/* {list()} */}
  //         {/* <Text>{cartItems[0].nama_item}</Text> */}
  //         <TouchableOpacity
  //           style={{ ...styles.buttonConfirm, backgroundColor: actionColor }}
  //           onPress={rejectTransaction}
  //         >
  //           <Text style={styles.buttonTextWhite}>Cancel Transaction</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //           style={{ ...styles.buttonCancel, borderColor: actionColor }}
  //           onPress={handleRejectModal}
  //         >
  //           <Text style={{ ...styles.buttonCancelText, color: actionColor }}>
  //             Cancel
  //           </Text>
  //         </TouchableOpacity>
  //       </View>
  //     </Modal>
  //   );
  // };

  // const ModalRevise = () => {
  //   return (
  //     <Modal visible={isReviseModalVisible}>
  //       <View
  //         style={{
  //           // flex: 1,
  //           padding: 15,
  //           backgroundColor: "white",
  //           justifyContent: "center",
  //           paddingVertical: 30,
  //           borderRadius: 7,
  //         }}
  //       >
  //         <MilliardText style={styles.alertTitle}>
  //           Revise Transaction?
  //         </MilliardText>
  //         <MilliardText style={styles.alertBody}>
  //           Are you sure you want to revise selected transaction?
  //         </MilliardText>
  //         <MilliardText style={styles.textDetail15}>
  //           Please explain why
  //         </MilliardText>
  //         <View style={styles.listDataContainer}>
  //           <TextInput
  //             value={reason}
  //             onChangeText={(itemValue) => setReason(itemValue)}
  //             multiline={true}
  //             style={styles.inputMultiline}
  //             autoFocus={true}
  //             selectionColor={Colors.camPrimaryColor}
  //           />
  //         </View>
  //         <TouchableOpacity
  //           style={{ ...styles.buttonConfirm, backgroundColor: actionColor }}
  //           onPress={reviseTransaction}
  //         >
  //           <Text style={styles.buttonTextWhite}>Revise Transaction</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //           style={{ ...styles.buttonCancel, borderColor: actionColor }}
  //           onPress={handleReviseModal}
  //         >
  //           <Text style={{ ...styles.buttonCancelText, color: actionColor }}>
  //             Cancel
  //           </Text>
  //         </TouchableOpacity>
  //       </View>
  //     </Modal>
  //   );
  // };

  const ModalLoading = () => {
    return (
      <Modal
        visible={isModalLoadingVisible}
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            // flex: 1,
            padding: 15,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 30,
            borderRadius: 7,
            height: 150,
            width: 150,
          }}
        >
          <ActivityIndicator size="small" color={Colors.camDarkerGreen} />
        </View>
      </Modal>
    );
  };

  // const approveTransaction = () => {

  // Alert.alert(
  //   "Approve Transaction?",
  //   "Are you sure you want to approve selected transaction?",
  //   [
  //     {
  //       text: "Cancel",
  //     },
  //     {
  //       text: "Approve",
  //       onPress: () => {
  //         console.log("approve clicked");
  //         const data = {
  //           username: props.activeUser,
  //           appsID: props.appID,
  //           modulID: props.modulID,
  //           transactionID: props.transactionID,
  //         };
  //         dispatch(actions.approveTransaction(data)).then(
  //           // dispatch(actions.fetchUserPendingTask(props.activeUser))
  //           () => {
  //             console.log("di view");
  //             console.log(approvalLoadingState);
  //             if (approvalLoadingState == "DONE") {
  //               Alert.alert("Successfully approved!");
  //               dispatch(actions.fetchUserPendingTask(props.activeUser));
  //             }
  //           }
  //         );
  //       },
  //     },
  //   ],
  //   {
  //     cancelable: true,
  //   }
  // );
  // };

  const approveTransaction = () => {
    setIsApproveModalVisible(false);
    setIsModalLoadingVisible(true);
    const data = {
      username: props.activeUser,
      appsID: props.appID,
      modulID: props.modulID,
      transactionID: props.transactionID,
    };
    dispatch(actions.approveTransaction(data)).then(
      // dispatch(actions.fetchUserPendingTask(props.activeUser))
      () => {
        // console.log("di view app");
        // console.log("'" + statusApproval + "'");
        if (statusApproval == "DONE") {
          // setaAlertTitle("Success");
          // setaAlertBody("Transaction successfully approved!");
          // setShowAlert(true);
          props.toastMessageAction(
            toastMaster.find((obj) => obj.name === "ApproveSuccessful")
          );
          // .then(() => {
          //   dispatch(actions.fetchUserPendingTask(props.activeUser));
          // });
        } else {
          if (statusApproval == "") {
            props.toastMessageAction(
              toastMaster.find((obj) => obj.name === "ApproveSuccessful")
            );
          } else {
            // setaAlertTitle("Failed");
            // setaAlertBody(statusApproval);
            props.toastMessageAction(
              toastMaster.find((obj) => obj.name === "ApproveFailed")
            );
          }
          // dispatch(actions.fetchUserPendingTask(props.activeUser));
        }
      }
    );
    // .then(() => {
    //   props.toastMessageAction(toastMaster.find(obj => obj.name === 'Team2'));
    //   dispatch(actions.fetchUserPendingTask(props.activeUser));
    // });
  };

  const rejectTransaction = () => {
    if (reason.length < 5) {
      Alert.alert(
        "Warning",
        "Please enter a valid reason (5 characters minimum)"
      );
      return;
    }
    setIsModalReasonVisible(false);
    setIsModalLoadingVisible(true);
    const data = {
      username: props.activeUser,
      appsID: props.appID,
      modulID: props.modulID,
      transactionID: props.transactionID,
      rejectReason: reason,
    };
    dispatch(actions.rejectTransaction(data)).then(
      // dispatch(actions.fetchUserPendingTask(props.activeUser))
      () => {
        // console.log("di view rej");
        // console.log("'" + statusApproval + "'");
        if (statusApproval == "DONE") {
          // setaAlertTitle("Success");
          // setaAlertBody("Transaction successfully approved!");
          // setShowAlert(true);
          props.toastMessageAction(
            toastMaster.find((obj) => obj.name === "RejectSuccessful")
          );
          // .then(() => {
          //   dispatch(actions.fetchUserPendingTask(props.activeUser));
          // });
        } else {
          if (statusApproval == "") {
            props.toastMessageAction(
              toastMaster.find((obj) => obj.name === "RejectSuccessful")
            );
          } else {
            // setaAlertTitle("Failed");
            // setaAlertBody(statusApproval);
            props.toastMessageAction(
              toastMaster.find((obj) => obj.name === "ApproveFailed")
            );
          }
        }
      }
    );
  };

  const reviseTransaction = () => {
    if (reason.length < 5) {
      Alert.alert(
        "Warning",
        "Please enter a valid reason (5 characters minimum)"
      );
      return;
    }
    setIsModalReasonVisible(false);
    setIsModalLoadingVisible(true);
    const data = {
      username: props.activeUser,
      appsID: props.appID,
      modulID: props.modulID,
      transactionID: props.transactionID,
      reviseReason: reason,
    };
    dispatch(actions.reviseTransaction(data)).then(
      // dispatch(actions.fetchUserPendingTask(props.activeUser))
      () => {
        // console.log("di view rev");
        // console.log("'" + statusApproval + "'");
        if (statusApproval == "DONE") {
          // setaAlertTitle("Success");
          // setaAlertBody("Transaction successfully approved!");
          // setShowAlert(true);
          props.toastMessageAction(
            toastMaster.find((obj) => obj.name === "ReviseSuccessful")
          );
          // .then(() => {
          //   dispatch(actions.fetchUserPendingTask(props.activeUser));
          // });
        } else {
          if (statusApproval == "") {
            props.toastMessageAction(
              toastMaster.find((obj) => obj.name === "ReviseSuccessful")
            );
          } else {
            // setaAlertTitle("Failed");
            // setaAlertBody(statusApproval);
            props.toastMessageAction(
              toastMaster.find((obj) => obj.name === "ReviseFailed")
            );
          }
        }
      }
    );
  };

  const viewTransactionDetail = async (isK2, url) => {
    // props.navigation.navigate({
    //   // routeName: "EmbeddedBrowser",
    //   routeName: "CAMDetail",
    //   params: {
    //     // link: "http://k2.service:1w3EaF9o0%40pf@10.103.1.133",
    //     link: detailTransUrl,
    //   },
    // });
    // console.log(url);
    // console.log('urlnya ini bro: ' + JSON.stringify(url));
    // console.log(JSON.stringify(url));
    // console.log("is k2 gan: " + isK2);
    // console.log("startradiussession: ", startDateRadiusSession);
    // console.log("expradiussession: ", expDateRadiusSession);
    if (isK2 === true) {
      const pwdRadiusSaved = await AsyncStorage.getItem("pwdRadius");
      //const startDate = await AsyncStorage.getItem("startDate");
      const expDate = await AsyncStorage.getItem("expDateRadius");
      // console.log("expDate ", expDate);
      // console.log("15) pwd radius: " + pwdRadiusSaved);
      const expirationDate = new Date(expDate);
      //const expDateDate = new Date(expDateString);
      //const expDateDate = new Date()
      //kalau udah ada session radius masuk
      if (pwdRadiusSaved !== null) {
        // console.log("ataz");
        /* console.log(startDateRadiusSession.getTime());
        console.log(expDateRadiusSession.getTime()); */
        // console.log("Date Now: ", new Date());
        // console.log("Exp Date: ", expirationDate);
        if (expirationDate >= new Date()) {
          // console.log("masih bisa");
        } else if (expirationDate < new Date()) {
          // console.log("keluar gan");
          await AsyncStorage.removeItem("pwdRadius");
          await AsyncStorage.removeItem("expDateRadius");

          setPwdInput("");
          setIsTransK2(true);
          setIsModalRadiusLoginVisible(true);
          // Alert.alert("Access Denied", "Please input your password again. ty");
          return;
        } else {
        }
        // console.log("----");
        let creds = activeUser.user_ad + ":" + pwdRadiusSaved + "@";
        // let creds = "k2.service:1w3EaF9o0%40pf@";
        url = url.split("://");
        // console.log("16) " + url);
        let finalUrl = url[0] + "://" + creds + url[1];
        props.searchChangeHandler("");
        props.navigation.navigate({
          routeName: "CAMDetail",
          params: {
            link: finalUrl,
          },
        });
        //kalo session radius kosong, tampilkan modal login
      } else {
        // console.log("17) else");
        setPwdInput("");
        setIsTransK2(true);
        setIsModalRadiusLoginVisible(true);
      }
    } else {
      setIsTransK2(false);
      setIsModalRadiusLoginVisible(false);
      props.searchChangeHandler("");
      props.navigation.navigate({
        // routeName: "EmbeddedBrowser",
        routeName: "CAMDetail",
        params: {
          // link: "http://k2.service:1w3EaF9o0%40pf@10.103.1.133/PromotionProposal/GetApprovePromotionProposal?processId=10538&documentNo=CPG/2HLMA/2302/00001/00607",
          link: url,
        },
      });
    }
  };

  const storeRadiusSession = async (message) => {
    //untuk login pertama kali (belum ada session radius tersimpan)
    // console.log("storeRadius");
    // console.log("12a) k2LoginStatus:" + message);
    // console.log("12b) pwdInput:" + pwdInput);
    if (message == "Success" && pwdInput != "") {
      await AsyncStorage.setItem("pwdRadius", pwdInput);
      // console.log("1. Date Now: ", new Date());
      if (expDateRadiusSession == undefined) {
        // console.log("2. Access Date Undefined");
        /* let nowDate = new Date();
        nowDate = moment(nowDate, "DD-MM-YYYY hh:mm:ss").format(
          "DD-MM-YYYY hh:mm:ss"
        );
        console.log("13) nowdate: " + nowDate); */
        // let expDate = nowDate.add(5, "seconds");
        //let expDate = new Date().setSeconds(new Date().getSeconds + 5);
        const startDate = new Date();
        /* const expDate1 = startDate.setSeconds(startDate.getSeconds() + 20);
        let expDate = new Date(expDate1);
        expDate = moment(expDate, "DD-MM-YYYY hh:mm:ss").format(
          "DD-MM-YYYY hh:mm:ss"
        ); */
        const expDateRN = new Date();
        const expDateAdded = expDateRN.setHours(expDateRN.getHours() + 1);
        const expDate = new Date(expDateAdded);
        await AsyncStorage.setItem("expDateRadius", expDate.toISOString());
      } else {
        // checkExpirationDate(expDateRadiusSession);
      }
      // AsyncStorage.setItem("expDatePwdRadius", new Date(now) + min());
      setIsPwdWrong(false);
      // console.log("15) k2LoginStatus2: " + message);
    }
  };

  /* function checkExpirationDate(expDate) {
    if (expDate >= new Date()) {
      console.log("3a. Access Granted");
      console.log("4. Start Date: ", startDateRadiusSession);
      console.log("5. Exp Date: ", expDateRadiusSession);
    } else if (expDate < new Date()) {
      console.log("3b. Access Expired");
    } else {
    }
  }

  useEffect(() => {
    checkExpirationDate(expDateRadiusSession);
  }, [startDateRadiusSession, expDateRadiusSession]);
 */
  const goToCAMDetail = () => {
    console.log(detailTransUrl);
    let url = detailTransUrl;
    let finalUrl = detailTransUrl;
    // let creds = "k2.service:1w3EaF9o0%40pf@";
    let creds = activeUser.user_ad + ":" + pwdInput + "@";
    url = url.split("://");
    console.log(url);
    finalUrl = url[0] + "://" + creds + url[1];
    console.log(finalUrl);
    props.searchChangeHandler("");
    props.navigation.navigate({
      // routeName: "EmbeddedBrowser",
      routeName: "CAMDetail",
      params: {
        // link: "http://k2.service:1w3EaF9o0%40pf@10.103.1.133/PromotionProposal/GetApprovePromotionProposal?processId=10538&documentNo=CPG/2HLMA/2302/00001/00607",
        link: finalUrl,
      },
    });
  };

  useEffect(() => {
    // if (isTransK2) {
    //   props.navigation.navigate({
    //     // routeName: "EmbeddedBrowser",
    //     routeName: "CAMDetail",
    //     params: {
    //       // link: "http://k2.service:1w3EaF9o0%40pf@10.103.1.133/PromotionProposal/GetApprovePromotionProposal?processId=10538&documentNo=CPG/2HLMA/2302/00001/00607",
    //       link: detailTransUrl,
    //     },
    //   });
    // }
    // console.log("9) k2LoginStatus1: " + k2LoginStatus);
    // console.log("10) isRadiusLoggedIn1: " + isK2LoggedIn);
    // console.log("11) pwdinpitL " + pwdInput);
    if (isK2LoggedIn) {
      // console.log("11a) mashok gan");
      storeRadiusSession();
      // .then(() => {
      // goToCAMDetail();
      // });
    } else if (k2LoginStatus == Strings.radiusWrongPassword) {
      // console.log("12) mashok wrong");
      setIsPwdWrong(true);
    }
  }, [dispatch, k2LoginStatus]);

  // async function loginPassword(){
  //   const status = await

  //   return status;
  // }

  const loginToK2 = async (url) => {
    // console.log("1) loginToK2 clicked");
    // setNumOfAttempts((num) => num + 1);
    if (pwdInput.length == 0) {
      Alert.alert("Please enter your password");
    } else {
      let creds = activeUser.user_ad + ":" + pwdInput + "@";
      let finalUrl = url;
      // let creds = "k2.service:1w3EaF9o0%40pf@";
      url = url.split("://");
      // console.log("2) " + url);
      setDetailTransUrl(url[0] + "://" + creds + url[1]);
      const data = { username: activeUser.user_ad, password: pwdInput };

      const response = await authActions.loginRadius(data);
      const message = response.message;

      // console.log("aaaaaaaaaa ", message);
      finalUrl = url[0] + "://" + creds + url[1];
      setDetailTransUrl(finalUrl);
      // console.log("3) " + finalUrl);

      if (message == "Success") {
        storeRadiusSession(message);
        // console.log("7) k2LoginStatus4: " + message);
        props.searchChangeHandler("");
        props.navigation.navigate({
          // routeName: "EmbeddedBrowser",
          routeName: "CAMDetail",
          params: {
            // link: "http://k2.service:1w3EaF9o0%40pf@10.103.1.133/PromotionProposal/GetApprovePromotionProposal?processId=10538&documentNo=CPG/2HLMA/2302/00001/00607",
            link: finalUrl,
          },
        });
      } else if (message == Strings.radiusWrongPassword) {
        // console.log("8) wrong password");
        setIsPwdWrong(true);
        setPwdInput("");
      } else {
      }
      // console.log("di view app");
      // console.log("'" + statusApproval + "'");
      // if (statusApproval == "DONE") {
      //   // setaAlertTitle("Success");
      //   // setaAlertBody("Transaction successfully approved!");
      //   // setShowAlert(true);
      //   props.toastMessageAction(
      //     toastMaster.find((obj) => obj.name === "ApproveSuccessful")
      //   );
      //   // .then(() => {
      //   //   dispatch(actions.fetchUserPendingTask(props.activeUser));
      //   // });
      // } else {
      //   if (statusApproval == "") {
      //     props.toastMessageAction(
      //       toastMaster.find((obj) => obj.name === "ApproveSuccessful")
      //     );
      //   } else {
      //     // setaAlertTitle("Failed");
      //     // setaAlertBody(statusApproval);
      //     props.toastMessageAction(
      //       toastMaster.find((obj) => obj.name === "ApproveFailed")
      //     );
      //   }
      //   // dispatch(actions.fetchUserPendingTask(props.activeUser));
      // }
      //   }
      // );
    }
  };
  // const viewTransactionDetail = () => {
  //   console.log(props);
  //   props.navigation.navigate({
  //     routeName: 'CAMDetail',
  //     params: {
  //       transactionID: props.transactionID,
  //       appID: props.appID,
  //     },
  //   });
  // };

  // const ContentContainer = () => {
  //   return (
  //     <View style={styles.touchable}>
  //       <Card style={styles.taskItem}>
  //         <View style={styles.summary}>
  //           <View style={styles.rowSpaceBetween}>
  //             <Text style={styles.detailTitle}>Application</Text>
  //             <Text style={styles.textDetail}>{props.appName}</Text>
  //           </View>
  //           <View style={styles.rowSpaceBetween}>
  //             <Text style={styles.detailTitle}>Transaction Number</Text>
  //             <Text style={styles.textDetail}>{props.transactionID}</Text>
  //           </View>
  //           <View style={styles.rowSpaceBetween}>
  //             <Text style={styles.detailTitle}>Transaction Date</Text>
  //             <Text style={styles.textDetail}>{props.date}</Text>
  //           </View>
  //           <View style={styles.rowSpaceBetween}>
  //             <Text style={styles.detailTitle}>Requestor</Text>
  //             <Text style={styles.textDetail}>{props.requestor}</Text>
  //           </View>
  //           <View>
  //             <Text style={styles.detailTitle}>Remarks</Text>
  //             <Text style={styles.textDetail}>{props.remarks}</Text>
  //           </View>
  //           {(props.multipleData == false || showDetails) && (
  //             <View style={styles.buttons}>
  //               <TouchableOpacity
  //                 onPress={
  //                   //   () => {
  //                   //   Linking.openURL(props.url).catch(err =>
  //                   //     console.error("Couldn't load page", err),
  //                   //   );
  //                   // }
  //                   viewTransactionDetail(props)
  //                 }
  //                 style={(styles.button, styles.buttonView)}
  //               >
  //                 <View style={styles.buttonDetails}>
  //                   <Icon name="search" size={20} color="black" />
  //                   <Text style={styles.buttonText}>View</Text>
  //                 </View>
  //               </TouchableOpacity>
  //               <TouchableOpacity
  //                 onPress={handleRejectModal}
  //                 style={(styles.button, styles.buttonReject)}
  //               >
  //                 <View style={styles.buttonDetails}>
  //                   <Icon name="remove" size={20} color="white" />
  //                   <Text style={styles.buttonTextWhite}>Reject</Text>
  //                 </View>
  //               </TouchableOpacity>
  //               <TouchableOpacity
  //                 onPress={approveTransaction}
  //                 style={(styles.button, styles.buttonApprove)}
  //               >
  //                 <View style={styles.buttonDetails}>
  //                   <Icon name="check" size={20} color="white" />
  //                   <Text style={styles.buttonTextWhite}>Approve</Text>
  //                 </View>
  //               </TouchableOpacity>
  //             </View>
  //           )}
  //         </View>
  //       </Card>
  //     </View>
  //   );
  // };

  const ContentContainer = () => {
    // if (props.multipleData == true) {
    return (
      <TouchableNativeFeedback
        activeOpacity={0.5}
        onPress={() => {
          setShowDetails(!showDetails);
        }}
        background={TouchableNativeFeedback.Ripple("white", false)}
        // useForeground={true}
      >
        <View style={styles.touchable}>
          <Card style={styles.taskItem}>
            <View style={styles.summary}>
              <View style={styles.rowSpaceBetween}>
                <Text style={styles.detailTitle}>Application</Text>
                <Text style={styles.textDetailSmall}>{props.appName}</Text>
              </View>
              <View style={styles.rowSpaceBetween}>
                <Text style={styles.detailTitle}>Transaction Number</Text>
                <Text style={styles.textDetailSmall}>
                  {props.transactionID}
                </Text>
              </View>
              <View style={styles.rowSpaceBetween}>
                <Text style={styles.detailTitle}>Transaction Date</Text>
                <Text style={styles.textDetailSmall}>{props.date}</Text>
              </View>
              <View style={styles.rowSpaceBetween}>
                <Text style={styles.detailTitle}>Requestor</Text>
                <Text style={styles.textDetailSmall}>{props.requestor}</Text>
              </View>
              <View>
                <Text style={{ ...styles.detailTitle, marginBottom: "1%" }}>
                  Remarks
                </Text>
                <Text style={styles.textDetailSmall}>{props.remarks}</Text>
              </View>
              {(props.multipleData == false || showDetails) && (
                <>
                  <View>
                    <TouchableOpacity
                      onPress={
                        //   () => {
                        //   Linking.openURL(props.url).catch(err =>
                        //     console.error("Couldn't load page", err),
                        //   );
                        // }
                        () => {
                          viewTransactionDetail(props.isK2, props.url);
                        }
                      }
                      style={(styles.button, styles.buttonView)}
                    >
                      <View style={styles.buttonDetailsCentered}>
                        <Icon name="search" size={20} color="black" />
                        <Text style={styles.buttonText}>View</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.buttons}>
                    <TouchableOpacity
                      onPress={handleApproveModal}
                      // onPress={() => {
                      //   setActionClicked("Approve");
                      //   setaAlertTitle("Approve Transaction?");
                      //   setaAlertBody(
                      //     "Are you sure you want to approve selected transaction?"
                      //   );
                      //   setaAlertOptionTrue("Approve");
                      //   setaAlertOptionFalse("Cancel");
                      //   setShowAlert(!showAlert);
                      // }}
                      style={(styles.button, styles.buttonApprove)}
                    >
                      <View style={styles.buttonDetailsCentered}>
                        <Icon name="check" size={20} color="white" />
                        <Text style={styles.buttonTextWhite}>Approve</Text>
                      </View>
                      {/* <ActionAlert /> */}
                    </TouchableOpacity>
                    <TouchableOpacity
                      // onPress={() => {
                      //   setActionClicked("Reject");
                      //   setaAlertTitle("Reject Transaction?");
                      //   setaAlertBody(
                      //     "Are you sure you want to reject selected transaction?"
                      //   );
                      //   setaAlertOptionTrue("Reject");
                      //   setaAlertOptionFalse("Cancel");
                      //   setShowAlert(!showAlert);
                      // }}
                      onPress={handleRejectModal}
                      style={(styles.button, styles.buttonReject)}
                    >
                      <View style={styles.buttonDetailsCentered}>
                        <Icon name="remove" size={20} color="white" />
                        <Text style={styles.buttonTextWhite}>Reject</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      // onPress={() => {
                      //   setActionClicked("Revise");
                      //   setaAlertTitle("Revise Transaction?");
                      //   setaAlertBody(
                      //     "Are you sure you want to revise selected transaction?"
                      //   );
                      //   setaAlertOptionTrue("Revise");
                      //   setaAlertOptionFalse("Cancel");
                      //   setShowAlert(!showAlert);
                      // }}
                      onPress={handleReviseModal}
                      style={(styles.button, styles.buttonRevise)}
                    >
                      <View style={styles.buttonDetailsCentered}>
                        <Icon name="pencil" size={20} color="white" />
                        <Text style={styles.buttonTextWhite}>Revise</Text>
                      </View>
                    </TouchableOpacity>
                    <ActionResultAlert />
                  </View>
                </>
              )}
            </View>
          </Card>
        </View>
      </TouchableNativeFeedback>
    );
    // } else {
    //   return (
    //     <View>
    //       <View style={styles.touchable}>
    //         <Card style={styles.taskItem}>
    //           <View style={styles.summary}>
    //             <View style={styles.rowSpaceBetween}>
    //               <Text style={styles.detailTitle}>Application</Text>
    //               <Text style={styles.textDetail}>{props.appName}</Text>
    //             </View>
    //             <View style={styles.rowSpaceBetween}>
    //               <Text style={styles.detailTitle}>Transaction Number</Text>
    //               <Text style={styles.textDetail}>{props.transactionID}</Text>
    //             </View>
    //             <View style={styles.rowSpaceBetween}>
    //               <Text style={styles.detailTitle}>Transaction Date</Text>
    //               <Text style={styles.textDetail}>{props.date}</Text>
    //             </View>
    //             <View style={styles.rowSpaceBetween}>
    //               <Text style={styles.detailTitle}>Requestor</Text>
    //               <Text style={styles.textDetail}>{props.requestor}</Text>
    //             </View>
    //             <View>
    //               <Text style={styles.detailTitle}>Remarks</Text>
    //               <Text style={styles.textDetail}>{props.remarks}</Text>
    //             </View>
    //             {(props.multipleData == false || showDetails) && (
    //               <>
    //                 <View>
    //                   <TouchableOpacity
    //                     onPress={
    //                       //   () => {
    //                       //   Linking.openURL(props.url).catch(err =>
    //                       //     console.error("Couldn't load page", err),
    //                       //   );
    //                       // }
    //                       () => {
    //                         viewTransactionDetail(props.url);
    //                       }
    //                     }
    //                     style={(styles.button, styles.buttonView)}
    //                   >
    //                     <View style={styles.buttonDetailsCentered}>
    //                       <Icon name="search" size={20} color="black" />
    //                       <Text style={styles.buttonText}>View</Text>
    //                     </View>
    //                   </TouchableOpacity>
    //                 </View>
    //                 <View style={styles.buttons}>
    //                   <TouchableOpacity
    //                     onPress={() => {
    //                       viewTransactionDetail(props.url);
    //                     }}
    //                     style={(styles.button, styles.buttonRevise)}
    //                   >
    //                     <View style={styles.buttonDetailsCentered}>
    //                       <Icon name="pencil" size={20} color="white" />
    //                       <Text style={styles.buttonTextWhite}>Revise</Text>
    //                     </View>
    //                   </TouchableOpacity>
    //                   <TouchableOpacity
    //                     onPress={handleRejectModal}
    //                     style={(styles.button, styles.buttonReject)}
    //                   >
    //                     <View style={styles.buttonDetailsCentered}>
    //                       <Icon name="remove" size={20} color="white" />
    //                       <Text style={styles.buttonTextWhite}>Reject</Text>
    //                     </View>
    //                   </TouchableOpacity>
    //                   <TouchableOpacity
    //                     onPress={() => setShowAlert(!showAlert)}
    //                     style={(styles.button, styles.buttonApprove)}
    //                   >
    //                     <View style={styles.buttonDetailsCentered}>
    //                       <Icon name="check" size={20} color="white" />
    //                       <Text style={styles.buttonTextWhite}>Approve</Text>
    //                     </View>
    //                   </TouchableOpacity>
    //                 </View>
    //               </>
    //             )}
    //           </View>
    //         </Card>
    //       </View>
    //     </View>
    //   );
    // }
  };

  return (
    <>
      {/* {props.multipleData ? (
        <TouchableNativeFeedback
          activeOpacity={0.5}
          onPress={() => {
            setShowDetails(!showDetails);
          }}
          background={TouchableNativeFeedback.Ripple('white', false)}
          // useForeground={true}
        >
          <ContentContainer />
        </TouchableNativeFeedback>
      ) : (
        <TouchableNativeFeedback>
          <ContentContainer />
        </TouchableNativeFeedback>
      )} */}
      {/* {loadingState ? (
        <View style={styles.touchable}>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : ( */}
      <ContentContainer />
      <ModalApprove />
      <ModalReasonCAM
        action={actionClicked}
        actionColor={actionColor}
        isVisible={isModalReasonVisible}
        actionReason={reason}
        onReasonChange={reasonHandler}
        onRejectConfirmed={rejectTransaction}
        onReviseConfirmed={reviseTransaction}
        handleRejectModal={handleRejectModal}
        handleReviseModal={handleReviseModal}
      />
      <ModalRadiusLogin
        action={actionClicked}
        actionColor={actionColor}
        isVisible={isModalRadiusLoginVisible}
        usernameValue={activeUser.user_ad}
        pwdValue={pwdInput}
        onUsernameChange={usernameHandler}
        onPwdChange={pwdHandler}
        onLoginClicked={() => loginToK2(props.url)}
        handleLoginK2Modal={handleK2LoginModal}
        attemptsLeft={3 - numOfAttempts}
        isPwdWrong={isPwdWrong}
        k2LoadingState={k2LoadingState}
      />
      {/* <ModalRevise /> */}
      <ModalLoading />
      {/* <TouchableOpacity
        style={[styles.item, { backgroundColor: toastMaster.color }]}
        onPress={() => props.toastMessageAction(toastMaster)}
        disabled={props.processing}
      >
        <Text style={styles.name}>{toastMaster.name}</Text>
      </TouchableOpacity> */}
      {/* )} */}
    </>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    marginVertical: 10,
    marginHorizontal: 15,
    padding: 10,
    alignItems: "center",
    backgroundColor: "white",
  },
  summary: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    width: "100%",
    marginBottom: 5,
    overflow: "hidden",
  },
  touchable: { borderRadius: 8, overflow: "hidden" },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: "0.5%",
  },
  detailTitle: {
    fontFamily: Fonts.primaryFont,
    fontSize: 12,
    color: "grey",
  },
  textDetail: {
    fontFamily: Fonts.primaryFont,
    fontSize: 13,
  },
  textDetail15: {
    fontFamily: Fonts.primaryFont,
    fontSize: 16,
    color: Colors.gray,
    marginBottom: 8,
  },
  textDetailSmall: {
    fontFamily: Fonts.primaryFont,
    fontSize: 12,
  },
  date: {
    color: "#888",
  },
  details: {
    width: "100%",
  },
  icon: {
    marginRight: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
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
  alertTitle: {
    fontSize: 18,
    alignItems: "center",
    justifyContent: "center",
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

export default withNavigation(TaskItem);
