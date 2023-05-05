import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  TextInput,
  Alert,
} from "react-native";
import { Header } from "react-navigation-stack";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";

import Colors from "../../general/constants/Colors";
import CarouselCards from "../components/ModifiedCarouselCards";
import * as actions from "../redux/actions";
import Logo from "../../general/components/template/Logo";

const HomeScreen = (props) => {
  // return <Pdf style={styles.pdf} source={source} />;

  const logoUri =
    "https://portal.bintang7.com/tara/uploadedfiles/logob7/white-bg.png";

  const latestDocuments = useSelector(
    (state) => state.document.dokumenTerakhir
  );
  const [documentResults, setDocumentResults] = useState([]);
  const loadingState = useSelector((state) => state.document.loadingState);
  const activeUser = useSelector((state) => state.auth.activeUser);
  const [refreshing, setRefreshing] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (activeUser == null) {
      props.navigation.navigate("BaseAuth");
    }
  }, []);

  useEffect(() => {
    dispatch(
      actions.fetchLatestDocuments(activeUser.nik, activeUser.nama_role)
    );
  }, [dispatch]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    dispatch(
      actions.fetchLatestDocuments(activeUser.nik, activeUser.nama_role)
    );
    setRefreshing(false);
  }, [refreshing]);

  const searchChangeHandler = (text) => {
    setSearchInput(text);
    let input = text.toLowerCase();
    let newList = [];
    //cocokin keywords dengan judul dokumen
    latestDocuments.filter((doc) => {
      // return doc.judul.toLowerCase().match(input);
      if (doc.judul.toLowerCase().match(input)) {
        newList.push(doc);
      } else if (doc.deskripsi.toLowerCase().match(input)) {
        newList.push(doc);
      } else if (doc.keywords.toLowerCase().match(input)) {
        newList.push(doc);
      }
    });
    setDocumentResults(newList);
    // if (!input || input === "") {
    //   Alert.alert('kozonk');
    //   setDocumentResults([]);
    // }
    // if (!Array.isArray(filtered) && !filtered.length) {
    //   Alert.alert('zonk');
    // }
    // else if (Array.isArray(filtered)) {
    //   setDocumentResults(filtered);
    // }
  };

  // useEffect(() => {
  //   console.log(loadingState);
  // }, [loadingState]);

  const NewestContent = () => {
    if (loadingState) {
      return (
        <View style={styles.contentContainer}>
          <ActivityIndicator size="large" color={Colors.taraPrimaryColor} />
        </View>
      );
    }
    if (
      latestDocuments == undefined ||
      latestDocuments == null ||
      latestDocuments.length === 0
    ) {
      return (
        <View>
          <Text style={styles.contentText}>Belum ada dokumen</Text>
        </View>
      );
    }
    return (
      <View style={styles.carousel}>
        <CarouselCards data={latestDocuments} navigation={props.navigation} />
      </View>
    );
  };

  const SearchResult = () => {
    if (loadingState) {
      return (
        <View style={styles.contentContainer}>
          <ActivityIndicator size="large" color={Colors.taraPrimaryColor} />
        </View>
      );
    }
    if (
      documentResults == undefined ||
      documentResults == null ||
      documentResults.length === 0
    ) {
      return (
        <View>
          <Text style={styles.contentText}>
            Dokumen dengan kata kunci tersebut tidak ditemukan
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.carousel}>
        <CarouselCards data={documentResults} navigation={props.navigation} />
      </View>
    );
  };

  const DocumentContent = () => {
    if (searchInput == "") {
      return (
        <View style={styles.contentTile}>
          <Text style={styles.sectionTitle}>Dokumen Terbaru</Text>
          <NewestContent />
        </View>
      );
    }
    return (
      <View style={styles.contentTile}>
        <Text style={styles.sectionTitle}>Hasil Pencarian</Text>
        <SearchResult />
        {/* <View style={styles.carousel}>
            <CarouselCards data={documents} navigation={props.navigation} />
          </View> */}
      </View>
    );
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          title="Pull to refresh"
          colors={[Colors.taraPrimaryColor]}
        />
      }
    >
      <View style={styles.header}>
        <Image source={{ uri: logoUri }} style={styles.logob7} />
        <Icon name="times" size={25} color={Colors.thirdColor} />
        <Image source={require("../assets/tara.png")} style={styles.logotara} />
      </View>
      <View style={styles.contentContainer}>
        {/* <Text style={styles.username}>
          Hi,{' '}
          {activeUser !== undefined && activeUser !== null
            ? activeUser.nama_user
            : ''}
          !
        </Text> */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            onChangeText={searchChangeHandler}
            value={searchInput}
            placeholder="cari dokumen..."
            placeholderTextColor="white"
            autoCapitalize="none"
          />
          <Icon
            name="search"
            size={25}
            color="white"
            style={styles.searchIcon}
          />
        </View>
        <DocumentContent />
      </View>
      {/* <View style={styles.footer}>
        <Text style={styles.appVersion}>TARA ver. 1.0.0</Text>
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
  logob7: {
    top: Header.useHeaderHeight,
    width: "40%",
    height: 60,
    marginLeft: 15,
    marginRight: 5,
  },
  icontara: {
    top: Header.useHeaderHeight,
    width: "15%",
    height: 60,
    borderRadius: 5,
    marginRight: 5,
    marginLeft: 3,
  },
  logotara: {
    top: Header.useHeaderHeight,
    width: "30%",
    height: 27,
    marginLeft: 15,
    marginRight: 45,
  },
  collab: {
    fontSize: 25,
    color: Colors.taraPrimaryColor,
  },
  contentContainer: {
    margin: 15,
  },
  contentTile: {
    backgroundColor: Colors.taraAccentColor,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
    flex: 1,
    marginTop: 20,
  },
  contentText: {
    color: "white",
    marginBottom: 20,
  },
  carousel: {
    flex: 1,
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    // marginTop: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
  },
  username: {
    color: Colors.taraPrimaryColor,
    fontSize: 25,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: Colors.taraPrimaryColor,
    borderRadius: 8,
  },
  searchInput: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    paddingHorizontal: 2,
    fontSize: 15,
    width: "90%",
    color: "white",
    marginRight: "3%",
  },
  searchIcon: {
    alignItems: "center",
    alignContent: "center",
  },
  footer: {
    backgroundColor: "white",
    padding: 10,
  },
  appVersion: {
    color: Colors.taraPrimaryColor,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default HomeScreen;
