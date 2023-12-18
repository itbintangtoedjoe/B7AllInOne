import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";

import Colors from "../constants/Colors";
import MilliardText from "./MilliardText";
import MilliardBoldText from "./MilliardBoldText";

const NotificationItem = (props) => {
  const [isRead, setIsRead] = useState(props.status);

  const notifOnPressHandler = () => {
    setIsRead(true);
    props.onPress();
  };
  return (
    <TouchableOpacity
      style={[
        styles.card,
        props.style,
        isRead === true ? styles.readItem : styles.unreadItem,
      ]}
      onPress={notifOnPressHandler}
    >
      {isRead === true ? (
        <MilliardText>{props.title}</MilliardText>
      ) : (
        <MilliardBoldText>{props.title}</MilliardBoldText>
      )}
      <MilliardText
        style={Platform.OS == "android" ? styles.body : styles.bodyIOS}
      >
        {props.body}
      </MilliardText>
      <MilliardText style={styles.date}>{props.date}</MilliardText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    // shadowColor: 'black',

    // //ios
    // shadowOpacity: 0.26,
    // shadowOffset: {width: 0, height: 2},
    // shadowRadius: 8,

    // //android
    // elevation: 1,
    // borderRadius: 10,
    // backgroundColor: 'white',

    borderBottomColor: "#AFC3C9",
    borderBottomWidth: 1,
    padding: 15,
    backgroundColor: "pink",
  },
  unreadItem: {
    backgroundColor: Colors.notifUnread,
  },
  readItem: {
    backgroundColor: "#F0FAFC",
  },
  body: {
    color: "#69696e",
  },
  bodyIOS: {
    color: "#69696e",
    marginVertical: "1.5%",
  },
  date: {
    color: "gray",
    fontSize: 12,
    marginTop: 5,
  },
});

export default NotificationItem;
