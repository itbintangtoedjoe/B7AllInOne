import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../general/constants/Colors";
import * as notificationActions from "../redux/actions";
import NotificationItem from "../components/NotificationItem";

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
        <Text>Nothing to see here</Text>
      </View>
    );
  }

  return (
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
      style={styles.flatlist}
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
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NotificationScreen;
