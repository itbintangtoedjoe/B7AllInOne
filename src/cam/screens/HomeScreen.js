import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Linking,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";

import * as actions from "../redux/actions/camAction";
import Colors from "../../general/constants/Colors";
import TaskItem from "../components/TaskItem";
import Fonts from "../../general/constants/Fonts";

const HomeScreen = (props) => {
  const activeUser = useSelector((state) => state.auth.activeUser);
  const userPendingTask = useSelector((state) => state.cam.userPendingTask);
  const [searchResult, setSearchResult] = useState([]);
  const loadingState = useSelector((state) => state.cam.fetchLoadingState);
  const approvalLoadingState = useSelector(
    (state) => state.cam.approvalLoadingState
  );
  const refreshing = false;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log('activeUser: ', activeUser.user_ad);
    dispatch(actions.fetchUserPendingTask(activeUser.user_ad));
    // console.log('fetchUserPendingTask: ', userPendingTask);
  }, [dispatch]);

  const onRefresh = useCallback(async () => {
    dispatch(actions.fetchUserPendingTask(activeUser.user_ad));
  }, [refreshing]);

  // const openEmbeddedBrowser = item => {
  //   // Linking.openURL('https://portal.bintang7.com/sensoryonline').catch(err =>
  //   //   console.error("Couldn't load page", err),
  //   // );
  //   console.log(item);
  //   props.navigation.navigate({
  //     routeName: 'EmbeddedBrowser',
  //     params: {
  //       link: 'https://portal.bintang7.com/SensoryOnline/Sensory/Sensory?Nomor=TRITEST/PLG/0622/00012',
  //     },
  //   });
  // };

  const searchChangeHandler = (text) => {
    setSearchInput(text);
    if (!loadingState) {
      let input = text.toLowerCase();
      let newList = [];
      //cocokin keywords dengan no transaksi/requestor/remarks
      userPendingTask.filter((task) => {
        console.log(task);
        // return task.judul.toLowerCase().match(input);
        if (task.TransactionID.toLowerCase().match(input)) {
          newList.push(task);
        } else if (task.Requestor.toLowerCase().match(input)) {
          newList.push(task);
        } else if (task.Remarks.toLowerCase().match(input)) {
          newList.push(task);
        }
      });
      setSearchResult(newList);
    }
  };

  const SearchResult = () => {
    if (loadingState) {
      return (
        // <View style={styles.contentContainer}>
        <View>
          <ActivityIndicator size="large" color="white" />
        </View>
      );
    }
    if (
      searchResult == undefined ||
      searchResult == null ||
      searchResult.length === 0
    ) {
      return (
        <View>
          <Text style={styles.contentText}>
            Transaksi dengan kata kunci tersebut tidak ditemukan
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.transList}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              title="Pull to refresh"
              colors={[Colors.camPrimaryColor]}
            />
          }
          data={searchResult}
          keyExtractor={(item) => item.TransactionID + item.TransactionDate}
          renderItem={(itemData) => (
            <TaskItem
              transactionID={itemData.item.TransactionID}
              date={itemData.item.TransactionDate}
              appID={itemData.item.AppID}
              appName={itemData.item.AppName}
              modulID={itemData.item.ModulID}
              url={itemData.item.Url}
              requestor={itemData.item.Requestor}
              remarks={itemData.item.Remarks}
              activeUser={activeUser.user_ad}
              multipleData={true}
              // onPress={() => console.log(itemData.item.Url)}
              // onPress={() => openEmbeddedBrowser(itemData.item)}
            />
          )}
        />
      </View>
    );
  };

  const PendingTaskContent = () => {
    if (searchInput == "") {
      return (
        <View style={styles.contentTitle}>
          <Text style={styles.sectionTitle}>Outstanding Approval</Text>
          <AllPendingTask />
        </View>
      );
    }
    return (
      <View style={styles.contentTitle}>
        <Text style={styles.sectionTitle}>Search Results</Text>
        <SearchResult />
        {/* <View style={styles.transList}>
            <CarouselCards data={documents} navigation={props.navigation} />
          </View> */}
      </View>
    );
  };

  const AllPendingTask = () => {
    if (loadingState) {
      return (
        // <View style={styles.content}>
        <View>
          <ActivityIndicator size="large" color="white" />
        </View>
      );
    }

    if (userPendingTask.length === 0) {
      return (
        <View>
          <Text style={styles.contentText}>
            Tidak ada oustanding approval aktif
          </Text>
        </View>
      );
    }

    return (
      <FlatList
        data={userPendingTask}
        keyExtractor={(item) => item.TransactionID}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            title="Pull to refresh"
            colors={[Colors.camPrimaryColor]}
          />
        }
        renderItem={(itemData) => (
          <TaskItem
            transactionID={itemData.item.TransactionID}
            date={itemData.item.TransactionDate}
            appID={itemData.item.AppID}
            appName={itemData.item.AppName}
            modulID={itemData.item.ModulID}
            url={itemData.item.Url}
            // url="https://portal.bintang7.com/SensoryOnline/Sensory/Sensory?Nomor=TRITEST/PLG/0622/00012"
            requestor={itemData.item.Requestor}
            remarks={itemData.item.Remarks}
            activeUser={activeUser.user_ad}
            multipleData={true}
          />
        )}
      />
    );
  };

  // return (
  //   <View>
  //     <Text>Approval Home Screen</Text>
  //     <Button title="Open in Browser" onPress={loadInBrowser} />
  //   </View>
  // );

  return (
    // <ScrollView
    //   refreshControl={
    //     <RefreshControl
    //       refreshing={refreshing}
    //       onRefresh={onRefresh}
    //       title="Pull to refresh"
    //       colors={[Colors.camPrimaryColor]}
    //     />
    //   }>
    <View style={styles.form}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          onChangeText={searchChangeHandler}
          value={searchInput}
          placeholder="find transaction by id/requestor/remarks"
          placeholderTextColor={Colors.camPrimaryColor}
          autoCapitalize="none"
        />
        <Icon
          name="search"
          size={25}
          color={Colors.camPrimaryColor}
          style={styles.searchIcon}
        />
      </View>
      <PendingTaskContent />
    </View>
  );

  {
    /* <Button
        title="Open embedded browser"
        onPress={() =>
          openEmbeddedBrowser('https://portal.bintang7.com/sensoryonline')
        }
      /> */
  }
  {
    /* <FlatList
        data={userPendingTask}
        keyExtractor={item => item.TransactionID}
        renderItem={itemData => (
          <TaskItem
            transactionID={itemData.item.TransactionID}
            date={itemData.item.TransactionDate}
            appName={itemData.item.AppName}
            url={itemData.item.Url}
            requestor={itemData.item.Requestor}
            remarks={itemData.item.Remarks}
          />
        )}
      /> */
  }
  // </ScrollView>

  // return (
  //   <View>
  //     <View style={styles.form}>
  //       <View>
  //         <Text style={styles.sectionTitle}>OUTSTANDING APPROVAL</Text>
  //       </View>
  //       <View>
  //         <DataTable>
  //           <DataTable.Header>
  //             <DataTable.Title>Transaction Number</DataTable.Title>
  //             <DataTable.Title numeric style={{flex: 1 / 2}}>
  //               URL
  //             </DataTable.Title>
  //           </DataTable.Header>
  //           {userPendingTask.map(taskItem => (
  //             <DataTable.Row key={taskItem.TransactionID}>
  //               <DataTable.Cell
  //                 key={`trans${taskItem.TransactionID}`}
  //                 style={{flex: 1 / 2}}>
  //                 {taskItem.TransactionID}
  //               </DataTable.Cell>
  //               <DataTable.Cell key={`url${taskItem.TransactionID}`}>
  //                 <Text
  //                   style={styles.rowText}
  //                   onPress={() => {
  //                     Linking.openURL(taskItem.Url).catch(err =>
  //                       console.error("Couldn't load page", err),
  //                     );
  //                   }}>
  //                   {taskItem.Url}
  //                 </Text>
  //               </DataTable.Cell>
  //             </DataTable.Row>
  //           ))}
  //         </DataTable>
  //       </View>
  //     </View>
  //   </View>
  // );
};

const styles = StyleSheet.create({
  form: {
    // margin: 10,
    height: "80%",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontFamily: Fonts.primaryFontBold,
    color: "white",
    fontSize: 18,
    margin: 10,
    // textDecorationLine: 'underline',
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
    margin: 10,
  },
  searchInput: {
    borderBottomColor: Colors.camPrimaryColor,
    borderBottomWidth: 1,
    paddingHorizontal: 2,
    fontFamily: Fonts.primaryFont,
    fontSize: 14,
    width: "90%",
    color: Colors.camPrimaryColor,
    marginRight: "3%",
  },
  searchIcon: {
    alignItems: "center",
    alignContent: "center",
  },
  // contentTitle: {
  //   backgroundColor: Colors.camPrimaryColor,
  //   borderRadius: 10,
  //   paddingHorizontal: 20,
  //   paddingTop: 20,
  //   flex: 1,
  //   marginTop: 20,
  // },
  contentText: {
    color: "white",
    marginBottom: 20,
    marginHorizontal: 10,
    fontFamily: Fonts.primaryFont,
  },
  transList: {
    marginBottom: 15,
  },
});

export default HomeScreen;
