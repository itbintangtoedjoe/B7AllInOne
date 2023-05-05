import React, {useEffect, useState, useCallback, useRef} from 'react';
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
} from 'react-native';
import {Header} from 'react-navigation-stack';
import {useSelector, useDispatch} from 'react-redux';
import {Block, Text, theme} from 'galio-framework';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import NumberFormat from 'react-number-format';
import AppLink from 'react-native-app-link';

// import { Icon } from '../components';
import {Images, materialTheme} from '../constants/galio';
import {HeaderHeight} from '../constants/galio/utils';
import MilliardText from '../../general/components/MilliardText';
import Colors from '../constants/Colors';
import MenuGrid from '../../general/components/MenuGrid';
import * as actions from '../redux/actions';
import {LocalNotification} from '../services/LocalPushController';
import RemotePushController from '../services/RemotePushController';
import Fonts from '../constants/Fonts';

const {width, height} = Dimensions.get('screen');
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
    id: '1',
    title: 'TARA',
    color: 'white',
    icon: require('../../general/assets/logos/tara.png'),
    routeName: 'TARA',
    // routeName: 'development',
  },
  {
    id: '2',
    title: 'Sensory Online',
    color: 'white',
    icon: require('../../general/assets/logos/so.png'),
    routeName: 'openapp',
    // routeName: 'development',
    appName: 'B7SensoryOnline',
    appStoreId: '',
    appStoreLocale: '',
    playStoreId: 'com.b7.sensoryonline',
  },
  {
    id: '3',
    title: 'Ekspedisi Online',
    color: 'white',
    icon: require('../../general/assets/logos/eo.png'),
    routeName: 'EkspedisiOnline',
  },
];

const HomeScreen = props => {
  const toast = useRef(null);

  const [refreshing, setRefreshing] = useState(false);
  const [redeemable, setRedeemable] = useState();
  const [numOfNotifications, setNumOfNotifications] = useState();
  const activeUser = useSelector(state => state.auth.activeUser);

  const dispatch = useDispatch();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setRefreshing(false);
  }, [refreshing]);

  useEffect(() => {
    if (activeUser == [] || activeUser == null || activeUser == undefined) {
      dispatch(actions.logout()).then(() => {
        props.navigation.navigate({
          routeName: 'Auth',
        });
      });
    }
    let today = new Date().setHours(0, 0, 0, 0);
    let startDate = new Date(activeUser.tanggal_awal_redeem).setHours(
      0,
      0,
      0,
      0,
    );
    let endDate = new Date(activeUser.tanggal_akhir_redeem).setHours(
      0,
      0,
      0,
      0,
    );
    let timeToRedeem = today <= endDate && today >= startDate;
    if (timeToRedeem) {
      setRedeemable('true');
    } else {
      setRedeemable('false');
    }
    setNumOfNotifications(activeUser.jumlah_notifikasi);
  }, [dispatch]);

  const renderGridItemImage = itemData => {
    const urlSO =
      'http://play.google.com/store/apps/details?id=com.b7.sensoryonline';
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
          if (itemData.item.routeName == 'development') {
            toast.current.show('The app is under development');
          } else if (itemData.item.routeName == 'openapp') {
            Platform.OS == 'android'
              ? AppLink.maybeOpenURL(urlSO, {
                  appName,
                  appStoreId,
                  appStoreLocale,
                  playStoreId,
                })
              : Alert.alert('This app is only available on Android Play Store');
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

  return (
    <Block flex style={styles.profile}>
      <Block flex style={{backgroundColor: 'white'}}>
        <ImageBackground
          source={require('../assets/banner2.png')}
          style={styles.profileContainer}
          imageStyle={styles.profileImage}>
          {/* <Block flex style={styles.notificationBar}>
            <Block style={styles.notificationIcon}>
              <MaterialIcon
                name={numOfNotifications == 0 ? 'bell-outline' : 'bell-ring'}
                size={23}
                color="white"
                onPress={() => {
                  props.navigation.navigate('Notification');
                }}
              />
            </Block>
          </Block> */}
          <Block flex style={styles.profileDetails}>
            <Block style={styles.profileTexts}></Block>
          </Block>
        </ImageBackground>
      </Block>
      <Block flex style={styles.options}>
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        {/* <LinearGradient
          colors={['rgba(0,10,155,0)', 'rgba(0,100,0,1)']}
          style={styles.linearGradient}> */}
        {/* POIN BISA START */}
        {/* <Block row space="between" style={styles.poinBisaContainer}>
          <Block middle>
            {activeUser !== undefined && activeUser !== null ? (
              <NumberFormat
                value={activeUser.poin_bisa}
                displayType={'text'}
                thousandSeparator={true}
                renderText={value => (
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
              redeemable && redeemable == 'false'
                ? styles.redeemContainerDisabled
                : styles.redeemContainer
            }>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('PoinBisaHome');
              }}
              disabled={redeemable && redeemable == 'false' ? true : false}
              style={styles.redeemButton}>
              <MaterialIcon name="wallet-giftcard" size={20} color={'white'} />
              <Text size={12} style={styles.redeemText}>
                &nbsp;&nbsp;Redeem
              </Text>
            </TouchableOpacity>
          </Block>
        </Block> */}
        {/* POIN BISA END */}
        {/* </LinearGradient> */}
        {/* <TouchableOpacity onPress={sendNotif} style={styles.redeemContainer}>
          <Text style={{color: 'white'}}>Notif</Text>
        </TouchableOpacity> */}
        <Block
          row
          space="between"
          style={{paddingVertical: 16, alignItems: 'baseline'}}>
          <Text size={16} style={{fontFamily: 'Milliard-Book'}}>
            Application List
          </Text>
          {/* <Text
                size={12}
                color={theme.COLORS.PRIMARY}
                onPress={() => this.props.navigation.navigate('Home')}>
                View All
              </Text> */}
        </Block>

        <FlatList
          keyExtractor={(item, index) => item.id}
          data={listAplikasi}
          renderItem={renderGridItemImage}
          numColumns={5}
          style={styles.appList}
          contentContainerStyle={
            listAplikasi.length >= 5
              ? {alignSelf: 'center'}
              : {alignSelf: 'flex-start'}
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
        {/* <Block style={{paddingBottom: -HeaderHeight * 2}}>
            <Block row space="between" style={{flexWrap: 'wrap'}}>
              {Images.Viewed.map((img, imgIndex) => (
                <Image
                  source={{uri: img}}
                  key={`viewed-${img}`}
                  resizeMode="cover"
                  style={styles.thumb}
                />
              ))}
            </Block>
          </Block> */}
        {/* </ScrollView> */}
      </Block>
      <RemotePushController />
    </Block>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  profile: {
    marginTop: 0,
    // marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
  },
  profileImage: {
    width: width * 1.1,
    height: 'auto',
    resizeMode: 'stretch',
  },
  profileContainer: {
    width: width,
    height: 250,
    // height: height / 3,
    resizeMode: 'stretch',
  },
  notificationBar: {
    marginTop: Platform.OS == 'android' ? 10 : 20,
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
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
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
    position: 'relative',
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE * 0.7,
    marginTop: -theme.SIZES.BASE * 20,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure,
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%',
    position: 'absolute',
  },
  poinBisaContainer: {
    // flex: 1,
    // height: height / 5,
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.softBlue,
    backgroundColor: 'white',
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
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignContent: 'center',
  },
  redeemText: {
    fontFamily: Fonts.primaryFont,
    color: 'white',
    marginTop: Platform.OS === 'android' ? 1 : 4,
  },
  appList: {
    backgroundColor: 'white',
  },
});
