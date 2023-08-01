import React, { useState } from "react";
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
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal";
import { withNavigation } from "react-navigation";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../redux/actions/camAction";
import Colors from "../../general/constants/Colors";
import Card from "./Card";
// import Button from '../../general/components/template/Button';
import Fonts from "../../general/constants/Fonts";

const TaskItem = (props) => {
  const dispatch = useDispatch();

  const [showDetails, setShowDetails] = useState(false);
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [alasanReject, setAlasanReject] = useState("");
  const loadingState = useSelector((state) => state.cam.approvalLoadingState);
  const statusApproval = useSelector((state) => state.cam.statusApproval);
  // const approvalLoadingState = useSelector(
  //   (state) => state.cam.approvalLoadingState
  // );

  const handleRejectModal = () => {
    setIsRejectModalVisible(() => !isRejectModalVisible);
    setAlasanReject("");
  };

  const approveTransaction = () => {
    Alert.alert(
      "Approve Transaction?",
      "Are you sure you want to approve selected transaction?",
      [
        {
          text: "Cancel",
        },
        {
          text: "Approve",
          onPress: () => {
            console.log("approve clicked");
            const data = {
              username: props.activeUser,
              appsID: props.appID,
              modulID: props.modulID,
              transactionID: props.transactionID,
            };
            dispatch(actions.approveTransaction(data)).then(
              // dispatch(actions.fetchUserPendingTask(props.activeUser))
              () => {
                console.log("statusApproval");
                console.log(statusApproval);
                if (statusApproval == "DONE") {
                  Alert.alert("Successfully approved!");
                  dispatch(actions.fetchUserPendingTask(props.activeUser));
                }
              }
            );
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const rejectTransaction = () => {
    if (alasanReject.length < 5) {
      Alert.alert(
        "Warning",
        "Please enter a valid reason (5 characters minimum)"
      );
      return;
    }
    setIsRejectModalVisible(false);
    const data = {
      username: activeUser.username,
      appsID: props.appID,
      modulID: props.modulID,
      transactionID: props.transactionID,
      rejectReason: alasanReject,
    };
    dispatch(actions.updateStatusPengiriman(data));
  };

  const viewTransactionDetail = (url) => {
    // console.log(url);
    // console.log('urlnya ini bro: ' + JSON.stringify(url));
    // console.log(JSON.stringify(url));
    props.navigation.navigate({
      routeName: "EmbeddedBrowser",
      params: {
        // link: 'https://portal.bintang7.com/sensoryonline',
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
    if (props.multipleData == true) {
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
                        onPress={() => {
                          viewTransactionDetail(props.url);
                        }}
                        style={(styles.button, styles.buttonRevise)}
                      >
                        <View style={styles.buttonDetailsCentered}>
                          <Icon name="pencil" size={20} color="white" />
                          <Text style={styles.buttonTextWhite}>Revise</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={handleRejectModal}
                        style={(styles.button, styles.buttonReject)}
                      >
                        <View style={styles.buttonDetailsCentered}>
                          <Icon name="remove" size={20} color="white" />
                          <Text style={styles.buttonTextWhite}>Reject</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={approveTransaction}
                        style={(styles.button, styles.buttonApprove)}
                      >
                        <View style={styles.buttonDetailsCentered}>
                          <Icon name="check" size={20} color="white" />
                          <Text style={styles.buttonTextWhite}>Approve</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            </Card>
          </View>
        </TouchableNativeFeedback>
      );
    } else {
      return (
        <View>
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
                        onPress={() => {
                          viewTransactionDetail(props.url);
                        }}
                        style={(styles.button, styles.buttonRevise)}
                      >
                        <View style={styles.buttonDetailsCentered}>
                          <Icon name="pencil" size={20} color="white" />
                          <Text style={styles.buttonTextWhite}>Revise</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={handleRejectModal}
                        style={(styles.button, styles.buttonReject)}
                      >
                        <View style={styles.buttonDetailsCentered}>
                          <Icon name="remove" size={20} color="white" />
                          <Text style={styles.buttonTextWhite}>Reject</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={approveTransaction}
                        style={(styles.button, styles.buttonApprove)}
                      >
                        <View style={styles.buttonDetailsCentered}>
                          <Icon name="check" size={20} color="white" />
                          <Text style={styles.buttonTextWhite}>Approve</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            </Card>
          </View>
        </View>
      );
    }
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
      {/* )} */}

      <Modal
        isVisible={isRejectModalVisible}
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
          <Text style={styles.textDetail15}>Reason</Text>
          <View style={styles.listDataContainer}>
            <TextInput
              value={alasanReject}
              onChangeText={(itemValue) => setAlasanReject(itemValue)}
              multiline={true}
              style={styles.inputMultiline}
              autoFocus={true}
              selectionColor={Colors.camPrimaryColor}
            />
          </View>
          {/* {list()} */}
          {/* <Text>{cartItems[0].nama_item}</Text> */}
          <TouchableOpacity
            style={styles.buttonConfirm}
            onPress={rejectTransaction}
          >
            <Text style={styles.buttonTextWhite}>Reject Transaction</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonCancel}
            onPress={handleRejectModal}
          >
            <Text style={styles.buttonCancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    fontSize: 15,
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
  inputMultiline: {
    borderColor: Colors.camRed,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 5,
    height: 75,
    alignItems: "flex-start",
    textAlignVertical: "top",
    paddingHorizontal: 12,
    marginTop: 10,
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
    color: Colors.camRed,
    marginLeft: 7,
  },
  buttonConfirm: {
    height: 40,
    width: "100%",
    // borderRadius: 7,
    backgroundColor: Colors.camRed,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.camRed,
    borderWidth: 1,
    marginTop: 15,
  },
  buttonCancel: {
    height: 40,
    width: "100%",
    // borderRadius: 7,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.camRed,
    borderWidth: 1,
    marginTop: 10,
  },
});

export default withNavigation(TaskItem);
