import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../general/constants/Colors";
import * as notificationActions from "../redux/actions";
import NotificationItem from "../components/NotificationItem";
import MilliardText from "../../general/components/MilliardText";

const NotificationScreen = (props) => {
  const activeUser = useSelector((state) => state.auth.activeUser);
  const loadingState = useSelector(
    (state) => state.general.notificationLoadingState
  );
  const userNotifications = useSelector(
    (state) => state.general.userNotifications
  );
  const dispatch = useDispatch();
  const refreshing = false;

  useEffect(() => {
    dispatch(notificationActions.getUserNotifications(activeUser.nik));
  }, [dispatch]);

  const onRefresh = useCallback(async () => {
    dispatch(notificationActions.getUserNotifications(activeUser.nik));
  }, [refreshing]);

  const notifOnClickHandler = (item) => {
    console.log(item);
    dispatch(notificationActions.setNotificationIsRead(item.ID));
    props.navigation.navigate({
      routeName: item.UrlMobile,
      params: {
        appID: item.AppID,
        transactionID: item.TransactionID,
      },
    });
  };

  const readAllOnClickHandler = () => {
    Alert.alert(
      "Read all notifications",
      "Are you sure you want to mark all notifications as read?",
      [
        {
          text: "No",
        },
        {
          text: "Yes",
          onPress: () => {
            dispatch(
              notificationActions.setAllNotificationsRead(activeUser.nik)
            ).then(() => {
              dispatch(
                notificationActions.getUserNotifications(activeUser.nik)
              );
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (loadingState) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  if (userNotifications.length === 0) {
    return (
      <View style={styles.centered}>
        <MilliardText>Nothing to see here</MilliardText>
      </View>
    );
  }

  return (
    <>
      <MilliardText style={styles.readAllLink} onPress={readAllOnClickHandler}>
        Read all notifications
      </MilliardText>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            title="Pull to refresh"
            colors={[Colors.primaryColor]}
          />
        }
        data={userNotifications}
        keyExtractor={(item) => item.ID}
        renderItem={(itemData) => (
          <NotificationItem
            title={itemData.item.Title}
            body={itemData.item.Body}
            status={itemData.item.Status}
            date={itemData.item.CreationDate}
            onPress={() => {
              notifOnClickHandler(itemData.item);
            }}
          />
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  readAllLink: {
    paddingHorizontal: 15,
    paddingTop: 3,
    paddingBottom: 5,
    textAlign: "right",
    textDecorationLine: "underline",
  },
});

export default NotificationScreen;
