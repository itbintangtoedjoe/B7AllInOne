import React, { useEffect, useState, useRef } from "react";
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
// import Modal from "react-native-modal";
import { withNavigation } from "react-navigation";
import { useDispatch, useSelector } from "react-redux";
import AwesomeAlert from "react-native-awesome-alerts";
import Modal from "react-native-modal";

import * as actions from "../redux/actions/camAction";
import Colors from "../../general/constants/Colors";
import Card from "./Card";
// import Button from '../../general/components/template/Button';
import Fonts from "../../general/constants/Fonts";
import MilliardText from "../../general/components/MilliardText";
import ModalReasonCAM from "./ModalReasonCAM";

const TaskItem = (props) => {
  const dispatch = useDispatch();

  const [showDetails, setShowDetails] = useState(false);
  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
  const [isModalReasonVisible, setIsModalReasonVisible] = useState(false);
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
  const [showAlert, setShowAlert] = useState(false);
  //alert props
  const [alertTitle, setaAlertTitle] = useState("Title");
  const [alertBody, setaAlertBody] = useState("Body");
  const [alertOptionTrue, setaAlertOptionTrue] = useState("Confirm");
  const [alertOptionFalse, setaAlertOptionFalse] = useState("Cancel");
  const [actionClicked, setActionClicked] = useState("Approve");
  const [actionColor, setActionColor] = useState(Colors.camDarkerGreen);
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (actionClicked == "Approve") {
      setActionColor(Colors.camDarkerGreen);
    } else if (actionClicked == "Reject") {
      setActionColor(Colors.camRed);
    } else if (actionClicked == "Revise") {
      setActionColor(Colors.camOrange);
    }
  }, [actionClicked]);

  useEffect(() => {
    console.log(props);
  }, []);

  // const reactNativeLogoSrc = {
  //   uri: "https://reactnative.dev/docs/assets/favicon.png",
  // };
  const itemgan = [
    {
      name: "ApproveSuccessful",
      alertData: {
        type: "",
        title: "Success",
        message: "Transaction successfully approved!",
        interval: 500,
        // setShowAlert(true);
        // props.toastMessageAction(itemgan);
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
        // props.toastMessageAction(itemgan);
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
        // props.toastMessageAction(itemgan);
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
    setActionClicked("Revise");
    setIsModalReasonVisible(() => !isModalReasonVisible);
    setReason("");
  };

  const reasonHandler = (val) => {
    setReason(val);
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
          console.log("Cancel button pressed");
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
          console.log("Confirm button pressed");
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
        console.log("di view app");
        console.log("'" + statusApproval + "'");
        if (statusApproval == "DONE") {
          // setaAlertTitle("Success");
          // setaAlertBody("Transaction successfully approved!");
          // setShowAlert(true);
          props.toastMessageAction(
            itemgan.find((obj) => obj.name === "ApproveSuccessful")
          );
          // .then(() => {
          //   dispatch(actions.fetchUserPendingTask(props.activeUser));
          // });
        } else {
          if (statusApproval == "") {
            props.toastMessageAction(
              itemgan.find((obj) => obj.name === "ApproveSuccessful")
            );
          } else {
            // setaAlertTitle("Failed");
            // setaAlertBody(statusApproval);
            props.toastMessageAction(
              itemgan.find((obj) => obj.name === "ApproveFailed")
            );
          }
          // dispatch(actions.fetchUserPendingTask(props.activeUser));
        }
      }
    );
    // .then(() => {
    //   props.toastMessageAction(itemgan.find(obj => obj.name === 'Team2'));
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
        console.log("di view rej");
        console.log("'" + statusApproval + "'");
        if (statusApproval == "DONE") {
          // setaAlertTitle("Success");
          // setaAlertBody("Transaction successfully approved!");
          // setShowAlert(true);
          props.toastMessageAction(
            itemgan.find((obj) => obj.name === "RejectSuccessful")
          );
          // .then(() => {
          //   dispatch(actions.fetchUserPendingTask(props.activeUser));
          // });
        } else {
          if (statusApproval == "") {
            props.toastMessageAction(
              itemgan.find((obj) => obj.name === "RejectSuccessful")
            );
          } else {
            // setaAlertTitle("Failed");
            // setaAlertBody(statusApproval);
            props.toastMessageAction(
              itemgan.find((obj) => obj.name === "ApproveFailed")
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
        console.log("di view rev");
        console.log("'" + statusApproval + "'");
        if (statusApproval == "DONE") {
          // setaAlertTitle("Success");
          // setaAlertBody("Transaction successfully approved!");
          // setShowAlert(true);
          props.toastMessageAction(
            itemgan.find((obj) => obj.name === "ReviseSuccessful")
          );
          // .then(() => {
          //   dispatch(actions.fetchUserPendingTask(props.activeUser));
          // });
        } else {
          if (statusApproval == "") {
            props.toastMessageAction(
              itemgan.find((obj) => obj.name === "ReviseSuccessful")
            );
          } else {
            // setaAlertTitle("Failed");
            // setaAlertBody(statusApproval);
            props.toastMessageAction(
              itemgan.find((obj) => obj.name === "ReviseFailed")
            );
          }
        }
      }
    );
  };

  const viewTransactionDetail = (url) => {
    // console.log(url);
    // console.log('urlnya ini bro: ' + JSON.stringify(url));
    // console.log(JSON.stringify(url));
    props.navigation.navigate({
      // routeName: "EmbeddedBrowser",
      routeName: "CAMDetail",
      params: {
        // link: "https://portal.bintang7.com/sensoryonline",
        link: url,
      },
    });
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
                <Text style={styles.textDetail}>{props.appName}</Text>
              </View>
              <View style={styles.rowSpaceBetween}>
                <Text style={styles.detailTitle}>Transaction Number</Text>
                <Text style={styles.textDetail}>{props.transactionID}</Text>
              </View>
              <View style={styles.rowSpaceBetween}>
                <Text style={styles.detailTitle}>Transaction Date</Text>
                <Text style={styles.textDetail}>{props.date}</Text>
              </View>
              <View style={styles.rowSpaceBetween}>
                <Text style={styles.detailTitle}>Requestor</Text>
                <Text style={styles.textDetail}>{props.requestor}</Text>
              </View>
              <View>
                <Text style={styles.detailTitle}>Remarks</Text>
                <Text style={styles.textDetail}>{props.remarks}</Text>
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
                          viewTransactionDetail(props.url);
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
        onReasonChange={reasonHandler}
        onRejectConfirmed={rejectTransaction}
        onReviseConfirmed={reviseTransaction}
        actionReason={reason}
        handleRejectModal={handleRejectModal}
        handleReviseModal={handleReviseModal}
      />
      {/* <ModalRevise /> */}
      <ModalLoading />
      {/* <TouchableOpacity
        style={[styles.item, { backgroundColor: itemgan.color }]}
        onPress={() => props.toastMessageAction(itemgan)}
        disabled={props.processing}
      >
        <Text style={styles.name}>{itemgan.name}</Text>
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
