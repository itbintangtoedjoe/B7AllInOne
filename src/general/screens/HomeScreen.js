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
  ActivityIndicator,
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
import CarouselCards from "../components/CarouselCards";

import * as actions from "../redux/actions";
// import { LocalNotification } from "../services/LocalPushController";
// import RemotePushController from "../services/RemotePushController";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;
const redeemState = true;

const listAplikasiAndroid = [
  // {
  //   id: "1",
  //   title: "CAM",
  //   color: "white",
  //   icon: require("../../general/assets/logos/approval.png"),
  //   routeName: "CAM",
  // },
  {
    id: "2",
    title: "TARA",
    color: "white",
    icon: require("../../general/assets/logos/tara.png"),
    routeName: "TARA",
    // routeName: 'development',
  },
  {
    id: "3",
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
    id: "4",
    title: "Ekspedisi Online",
    color: "white",
    icon: require("../../general/assets/logos/eo.png"),
    routeName: "EkspedisiOnline",
  },
];

const listAplikasiIOS = [
  // {
  {
    id: "1",
    title: "CAM",
    color: "white",
    icon: require("../../general/assets/logos/approval.png"),
    routeName: "CAM",
  },
  {
    id: "2",
    title: "TARA",
    color: "white",
    icon: require("../../general/assets/logos/tara.png"),
    routeName: "TARA",
  },
  {
    id: "3",
    title: "Ekspedisi Online",
    color: "white",
    icon: require("../../general/assets/logos/eo.png"),
    routeName: "EkspedisiOnline",
  },
];

// const bannerContents = [
//   {
//     url: 'https://portal.bintang7.com/tara/template/images/pdf-logo.png',
//   },
//   {
//     url: 'https://portal.bintang7.com/tara/template/images/pdf-logo.png',
//   },
//   {
//     url: 'https://portal.bintang7.com/tara/template/images/pdf-logo.png',
//   },
// ];

// const bannerHardCoded = [
//   {
//     id: 1,
//     url: 'https://portal.bintang7.com/tara/uploadedfiles/b7connect/banners/banner1.png',
//   },
//   {
//     id: 2,
//     url: 'https://portal.bintang7.com/tara/uploadedfiles/b7connect/banners/banner2.png',
//   },
//   {
//     id: 3,
//     url: 'https://portal.bintang7.com/tara/uploadedfiles/b7connect/banners/banner3.png',
//   },
//   {
//     id: 4,
//     url: 'https://portal.bintang7.com/tara/uploadedfiles/b7connect/banners/banner4.png',
//   },
//   {
//     id: 5,
//     url: 'https://portal.bintang7.com/tara/uploadedfiles/b7connect/banners/banner5.png',
//   },
// ];

// const dataBro = [
//   {
//     title: 'Aenean leo',
//     body: 'Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.',
//     imgUrl: 'https://picsum.photos/id/11/200/300',
//   },
//   {
//     title: 'In turpis',
//     body: 'Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ',
//     imgUrl: 'https://picsum.photos/id/10/200/300',
//   },
//   {
//     title: 'Lorem Ipsum',
//     body: 'Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.',
//     imgUrl: 'https://picsum.photos/id/12/200/300',
//   },
// ];

const HomeScreen = (props) => {
  const toast = useRef(null);

  const [refreshing, setRefreshing] = useState(false);
  const [redeemable, setRedeemable] = useState();
  const [numOfNotifications, setNumOfNotifications] = useState();
  const activeUser = useSelector((state) => state.auth.activeUser);
  const appBanners = useSelector((state) => state.general.appBanners);
  const bannerLoadingState = useSelector(
    (state) => state.general.bannerLoadingState
  );

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

    //get banners
    dispatch(actions.getAppBanners());

    //set poin bisa
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
    //set state jumlah notif
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
  const [index, setIndex] = useState(0);
  const [index2, setIndex2] = useState(0);
  const isCarousel = useRef(null);
  const SLIDER_WIDTH = Dimensions.get("window").width + 80;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

  // const renderBannerItem = ({item, index}) => {
  //   return (
  //     // <View
  //     //   style={{
  //     //     backgroundColor: 'floralwhite',
  //     //     borderRadius: 5,
  //     //     height: 250,
  //     //     padding: 50,
  //     //     marginLeft: 25,
  //     //     marginRight: 25,
  //     //   }}>
  //     // </View>

  //     <Image
  //       source={{uri: item.url}}
  //       style={styles.profileContainer}
  //       imageStyle={styles.profileImage}></Image>
  //   );
  // };
  // const renderBannerItem2 = ({item, index}) => {
  //   return (
  //     // <View
  //     //   style={{
  //     //     backgroundColor: 'floralwhite',
  //     //     borderRadius: 5,
  //     //     height: 250,
  //     //     padding: 50,
  //     //     marginLeft: 25,
  //     //     marginRight: 25,
  //     //   }}>
  //     // </View>

  //     <Image
  //       source={{uri: item.imgUrl}}
  //       style={styles.profileContainer}
  //       imageStyle={styles.profileImage}></Image>
  //   );
  // };

  const AppBanner = () => {
    if (bannerLoadingState) {
      return (
        <View style={styles.bannerLoading}>
          <ActivityIndicator size="small" color={Colors.primaryColor} />
        </View>
      );
    }
    if (
      appBanners == undefined ||
      appBanners == null ||
      appBanners.length === 0
    ) {
      return (
        <View>
          <MilliardText style={styles.bannerText}>
            Banner tidak ditemukan
          </MilliardText>
        </View>
      );
    }
    return <CarouselCards data={appBanners} />;
  };

  // const AppBanner2 = () => {
  //   if (bannerLoadingState) {
  //     return (
  //       <View style={styles.bannerLoading}>
  //         <ActivityIndicator size="small" color={Colors.primaryColor} />
  //       </View>
  //     );
  //   }
  //   if (dataBro == undefined || dataBro == null || dataBro.length === 0) {
  //     return (
  //       <View>
  //         <MilliardText style={styles.bannerText}>
  //           Banner tidak ditemukan
  //         </MilliardText>
  //       </View>
  //     );
  //   }
  //   return (
  //     <View
  //       style={{
  //         // flexDirection: 'row',
  //         justifyContent: 'center',
  //         padding: 10,
  //         paddingRight: 10,
  //         // marginLeft: 0,
  //       }}>
  //       <Carousel
  //         layout="default"
  //         ref={isCarousel}
  //         data={dataBro}
  //         sliderWidth={width}
  //         itemWidth={width}
  //         renderItem={renderBannerItem2}
  //         onSnapToItem={idx => setIndex2(idx)}
  //         layoutCardOffset={9}
  //         // loop={true}
  //         // autoplay={true}
  //         // autoplayInterval={2000}
  //         // lockScrollWhileSnapping={true}
  //       />
  //       <Pagination
  //         dotsLength={dataBro.length}
  //         // dotsLength={2}
  //         activeDotIndex={index2}
  //         carouselRef={isCarousel}
  //         dotStyle={{
  //           width: 10,
  //           height: 10,
  //           borderRadius: 10,
  //           marginHorizontal: 0,
  //           backgroundColor: Colors.primaryColor,
  //         }}
  //         inactiveDotOpacity={0.4}
  //         inactiveDotScale={0.6}
  //         tappableDots={true}
  //         containerStyle={{marginTop: 0, paddingTop: 10, paddingBottom: 0}}
  //       />
  //     </View>
  //   );
  // };

  return (
    // <View>
    //   <Text>APA SEH IKI</Text>
    // </View>
    // <SafeAreaView style={styles.container}>
    //   <CarouselCards />
    // </SafeAreaView>

    <Block flex style={styles.profile}>
      <Block style={styles.welcomeSection}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require("../assets/blue3.jpeg")}
        >
          <View style={styles.welcomeText}>
            <MilliardText style={{ color: "white", fontSize: 16 }}>
              Welcome,
            </MilliardText>
            <MilliardText style={{ color: "white", fontSize: 18 }}>
              {activeUser !== undefined && activeUser !== null
                ? activeUser.nama_user
                : ""}
            </MilliardText>
          </View>
        </ImageBackground>
        {/* NOTIFICATION ICON */}
        {/* <Block flex style={styles.notificationBar}>
          <Block style={styles.notificationIcon}>
            <MaterialIcon
              name={numOfNotifications == 0 ? "bell-outline" : "bell-ring"}
              size={23}
              color="white"
              onPress={() => {
                // console.log('ke notif');
                props.navigation.navigate("Notification");
              }}
            />
          </Block>
        </Block> */}
        {/* NOTIFICATION ICON */}
      </Block>
      <Block
      // style={{backgroundColor: 'rebeccapurple'}}
      >
        <AppBanner />
        {/* <CarouselCards data={appBanners} /> */}
      </Block>
      {/* POIN BISA */}
      {/* <Block row space="between" style={styles.poinBisaContainer}>
        <Block middle>
          {activeUser !== undefined && activeUser !== null ? (
            <NumberFormat
              value={activeUser.poin_bisa}
              displayType={"text"}
              thousandSeparator={true}
              renderText={(value) => (
                <MilliardText style={styles.amount}>
                  POIN BISA:&nbsp;{value}
                </MilliardText>
              )}
            />
          ) : (
            <MilliardText style={styles.amount}>POIN BISA: 0</MilliardText>
          )}
        </Block>
        <Block
          row
          middle
          style={
            redeemable && redeemable == "false"
              ? styles.redeemContainerDisabled
              : styles.redeemContainer
          }
        >
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("PBHome");
            }}
            disabled={redeemable && redeemable == "false" ? true : false}
            style={styles.redeemButton}
          >
            <MaterialIcon name="wallet-giftcard" size={20} color={"white"} />
            <Text size={12} style={styles.redeemText}>
              &nbsp;&nbsp;Redeem
            </Text>
          </TouchableOpacity>
        </Block>
      </Block> */}
      {/* POIN BISA */}
      <Block style={styles.pageSection}>
        {/* <BannerCarousel data={bannerContents} /> */}
        <Block
          row
          space="between"
          style={{ paddingVertical: 16, alignItems: "baseline" }}
        >
          <Text size={16} style={{ fontFamily: "Milliard-Book" }}>
            Application List
          </Text>
        </Block>

        <FlatList
          keyExtractor={(item, index) => item.id}
          data={
            Platform.OS === "android" ? listAplikasiAndroid : listAplikasiIOS
          }
          renderItem={renderGridItemImage}
          numColumns={5}
          style={styles.appList}
          contentContainerStyle={
            Platform.OS === "android"
              ? listAplikasiAndroid.length >= 5
                ? { alignSelf: "center" }
                : { alignSelf: "flex-start" }
              : listAplikasiIOS.length >= 5
              ? { alignSelf: "center" }
              : { alignSelf: "flex-start" }
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              title="Pull to refresh"
              colors={[Colors.primaryColor]}
            />
          }
        />
      </Block>
    </Block>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
  },
  profile: {
    marginTop: 0,
    backgroundColor: "white",
    // marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
  },
  profileImage: {
    width: width,
    height: "auto",
    resizeMode: "cover",
  },
  profileContainer: {
    width: width - 20,
    height: 230,
    // height: height / 3,
    resizeMode: "stretch",
    borderRadius: 7,
  },
  welcomeSection: {
    backgroundColor: Colors.primaryColor,
    height: height / 6,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    // alignItems: 'center',
    // opacity: 0.7,
  },
  welcomeText: {
    marginHorizontal: 15,
  },
  nameSection: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 15,
    // alignItems: 'center',
  },
  pageSection: {
    margin: 15,
  },
  notificationBar: {
    marginTop: Platform.OS == "android" ? 10 : 30,
    right: 0,
    position: "absolute",
    // justifyContent: 'flex-end',
    // position: 'relative',
  },
  // profileDetails: {
  //   paddingTop: theme.SIZES.BASE * 12,
  //   justifyContent: 'flex-end',
  //   position: 'relative',
  // },
  notificationIcon: {
    // backgroundColor: 'white',
    paddingHorizontal: theme.SIZES.BASE,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  // profileTexts: {
  //   paddingHorizontal: theme.SIZES.BASE * 2,
  //   paddingVertical: theme.SIZES.BASE * 2,
  //   zIndex: 100,
  // },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: theme.SIZES.BASE / 2,
    borderRadius: 4,
    height: 19,
    width: 38,
  },
  seller: {
    marginRight: theme.SIZES.BASE / 2,
  },
  options: {
    position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE * 0.7,
    marginTop: -theme.SIZES.BASE * 20,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure,
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: "30%",
    position: "absolute",
  },
  bannerLoading: {
    marginVertical: 30,
  },
  bannerText: {
    borderColor: Colors.primaryColor,
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 7,
    margin: 15,
    paddingVertical: 30,
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    color: Colors.primaryColor,
  },
  poinBisaContainer: {
    // flex: 1,
    // height: height / 5,
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.softBlue,
    backgroundColor: "white",
    marginHorizontal: 10,
    // borderStyle: 'dashed',
  },
  redeemContainerDisabled: {
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.gray,
    backgroundColor: Colors.gray,
  },
  redeemContainer: {
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    backgroundColor: Colors.primaryColor,
  },
  redeemButton: {
    flexDirection: "row",
    // justifyContent: 'center',
    // alignContent: 'center',
  },
  redeemText: {
    fontFamily: Fonts.primaryFont,
    color: "white",
    marginTop: Platform.OS === "android" ? 1 : 4,
  },
  appList: {
    backgroundColor: "white",
  },
});
