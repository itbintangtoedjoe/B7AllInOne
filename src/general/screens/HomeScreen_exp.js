import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Alert,
  View,
  SafeAreaView,
} from "react-native";
import { Header } from "react-navigation-stack";
import { useSelector, useDispatch } from "react-redux";
import { Block, Text, theme } from "galio-framework";
// import LinearGradient from 'react-native-linear-gradient';
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import NumberFormat from "react-number-format";
import AppLink from "react-native-app-link";
import Carousel, { Pagination } from "react-native-snap-carousel";

// import { Icon } from '../components';
import { Images, materialTheme } from "../constants/galio";
import { HeaderHeight } from "../constants/galio/utils";
import MilliardText from "../../general/components/MilliardText";
import Colors from "../constants/Colors";
import MenuGrid from "../../general/components/MenuGrid";
import Fonts from "../constants/Fonts";
import BannerCarousel from "../components/BannerCarousel";

import * as actions from "../redux/actions";
import { LocalNotification } from "../services/LocalPushController";
import RemotePushController from "../services/RemotePushController";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;
const redeemState = true;

const listAplikasi = [
  // {
  //   id: '4',
  //   title: 'CAM',
  //   color: 'white',
  //   icon: require('../../general/assets/logos/approval.png'),
  //   routeName: 'CAM',
  // },
  {
    id: "1",
    title: "TARA",
    color: "white",
    icon: require("../../general/assets/logos/tara.png"),
    routeName: "TARA",
    // routeName: 'development',
  },
  {
    id: "2",
    title: "Sensory Online",
    color: "white",
    icon: require("../../general/assets/logos/so.png"),
    routeName: "openapp",
    // routeName: 'development',
    appName: "B7SensoryOnline",
    appStoreId: "",
    appStoreLocale: "",
    playStoreId: "com.b7.sensoryonline",
  },
  {
    id: "3",
    title: "Ekspedisi Online",
    color: "white",
    icon: require("../../general/assets/logos/eo.png"),
    routeName: "EkspedisiOnline",
  },
];

const bannerContents = [
  {
    url: "https://portal.bintang7.com/tara/template/images/pdf-logo.png",
  },
  {
    url: "https://portal.bintang7.com/tara/template/images/pdf-logo.png",
  },
  {
    url: "https://portal.bintang7.com/tara/template/images/pdf-logo.png",
  },
];

const HomeScreen = (props) => {
  const toast = useRef(null);

  const [refreshing, setRefreshing] = useState(false);
  const [redeemable, setRedeemable] = useState();
  const [numOfNotifications, setNumOfNotifications] = useState();
  const activeUser = useSelector((state) => state.auth.activeUser);

  const dispatch = useDispatch();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setRefreshing(false);
  }, [refreshing]);

  useEffect(() => {
    if (activeUser == [] || activeUser == null || activeUser == undefined) {
      dispatch(actions.logout()).then(() => {
        props.navigation.navigate({
          routeName: "Auth",
        });
      });
    }
    let today = new Date().setHours(0, 0, 0, 0);
    let startDate = new Date(activeUser.tanggal_awal_redeem).setHours(
      0,
      0,
      0,
      0
    );
    let endDate = new Date(activeUser.tanggal_akhir_redeem).setHours(
      0,
      0,
      0,
      0
    );
    let timeToRedeem = today <= endDate && today >= startDate;
    if (timeToRedeem) {
      setRedeemable("true");
    } else {
      setRedeemable("false");
    }
    setNumOfNotifications(activeUser.jumlah_notifikasi);
  }, [dispatch]);

  const renderGridItemImage = (itemData) => {
    const urlSO =
      "http://play.google.com/store/apps/details?id=com.b7.sensoryonline";
    const appName = itemData.item.appName;
    const appStoreId = itemData.item.appStoreId;
    const appStoreLocale = itemData.item.appStoreLocale;
    const playStoreId = itemData.item.playStoreId;
    return (
      <MenuGrid
        title={itemData.item.title}
        id={itemData.item.id}
        color={itemData.item.color}
        tipe="kategori"
        icon={itemData.item.icon}
        onSelect={() => {
          if (itemData.item.routeName == "development") {
            toast.current.show("The app is under development");
          } else if (itemData.item.routeName == "openapp") {
            Platform.OS == "android"
              ? AppLink.maybeOpenURL(urlSO, {
                  appName,
                  appStoreId,
                  appStoreLocale,
                  playStoreId,
                })
              : Alert.alert("This app is only available on Android Play Store");
          } else {
            props.navigation.navigate(itemData.item.routeName);
          }
        }}
      />
    );
  };

  const sendNotif = () => {
    LocalNotification();
  };
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);
  const SLIDER_WIDTH = Dimensions.get("window").width + 80;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

  const renderBannerItem = ({ item, index }) => {
    return (
      // <View
      //   style={{
      //     backgroundColor: 'floralwhite',
      //     borderRadius: 5,
      //     height: 250,
      //     padding: 50,
      //     marginLeft: 25,
      //     marginRight: 25,
      //   }}>
      // </View>

      <Image
        source={require("../assets/banner2.png")}
        style={styles.profileContainer}
        imageStyle={styles.profileImage}
      ></Image>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/polybanner.jpeg")}
      >
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Newzzz</Text>
          <Text style={styles.logoDescription}>
            Get your doze of daily news!
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "-apple-system, BlinkMacSystemFont Segoe UI",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'orange',
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
    // opacity: 0.7,
  },
  logoContainer: {
    alignItems: "center",
  },
  logoText: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
  },
  logoDescription: {
    fontSize: 15,
    fontWeight: "600",
    color: "white",
  },
});
