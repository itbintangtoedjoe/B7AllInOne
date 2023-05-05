import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Image,
  Dimensions,
  TextInput,
  FlatList,
  TouchableOpacity,
  Platform,
  ImageBackground,
  Linking,
} from 'react-native';
import {Header} from 'react-navigation-stack';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-fast-toast';
import AppLink from 'react-native-app-link';

import Colors from '../constants/Colors';
import MenuGrid from '../../general/components/MenuGrid';
import * as actions from '../redux/actions';

const listAplikasi = [
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
  // {
  //   id: '3',
  //   title: 'Ekspedisi Online',
  //   color: 'white',
  //   icon: require('../../general/assets/logos/eo.png'),
  //   routeName: 'development',
  // },
  // {
  //   id: '3',
  //   title: 'Ekspedisi Online',
  //   color: 'white',
  //   icon: require('../../general/assets/logos/eo.png'),
  //   routeName: 'development',
  // },
  // {
  //   id: '3',
  //   title: 'Ekspedisi Online',
  //   color: 'white',
  //   icon: require('../../general/assets/logos/eo.png'),
  //   routeName: 'development',
  // },
  // {
  //   id: '3',
  //   title: 'Ekspedisi Online',
  //   color: 'white',
  //   icon: require('../../general/assets/logos/eo.png'),
  //   routeName: 'development',
  // },
  // {
  //   id: '4',
  //   title: 'Ekspedisi Online',
  //   color: 'white',
  //   icon: require('../../general/assets/logos/so.png'),
  //   routeName: 'development',
  // },
  // {
  //   id: '5',
  //   title: 'Ekspedisi Online',
  //   color: 'white',
  //   icon: require('../../general/assets/logos/so.png'),
  //   routeName: 'development',
  // },
  // {
  //   id: '6',
  //   title: 'Ekspedisi Online',
  //   color: 'white',
  //   icon: require('../../general/assets/logos/so.png'),
  //   routeName: 'development',
  // },
  // {
  //   id: '7',
  //   title: 'Ekspedisi Online',
  //   color: 'white',
  //   icon: require('../../general/assets/logos/so.png'),
  //   routeName: 'development',
  // },
];

const HomeScreen = props => {
  const toast = useRef(null);

  const [refreshing, setRefreshing] = useState(false);
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
            AppLink.maybeOpenURL(urlSO, {
              appName,
              appStoreId,
              appStoreLocale,
              playStoreId,
            });
          } else {
            props.navigation.navigate(itemData.item.routeName);
          }
        }}
      />
    );
  };

  return (
    <View style={styles.pageContainer}>
      <ImageBackground
        source={require('../assets/banner.png')}
        style={styles.headerBg}>
        <View style={styles.contentContainer}>
          <Text style={styles.welcomeText}>Welcome to B7 Connect!</Text>
        </View>
        {/* <View>
          <Text
            style={{color: 'blue'}}
            onPress={() =>
              Linking.openURL(
                'http://play.google.com/store/apps/details?id=com.google.android.apps.maps',
              )
            }>
            Go to Maps on Play Store
          </Text>
        </View> */}
        <Text style={styles.whiteSectionTitle}>Application List</Text>
      </ImageBackground>
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
      <Toast ref={toast} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 70,
  },
  headerContainer: {
    flex: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerWelcome: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryColor,
    height: 150,
  },
  headerBg: {
    width: '100%',
    height: 200,
    //flex: 1,
    // opacity: 0.5,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'red',
    resizeMode: 'repeat',
  },
  logob7: {
    top: Header.useHeaderHeight,
    width: '40%',
    height: 60,
    marginLeft: 15,
    marginRight: 5,
  },
  welcomeText: {
    color: 'white',
    fontSize: 22,
    marginRight: 15,
    fontWeight: 'bold',
    marginTop: 100,
  },
  pageContainer: {
    // flex:1,
    // backgroundColor: 'white',
  },
  contentContainer: {
    margin: 15,
  },
  whiteSectionTitle: {
    // marginTop: 10,
    color: 'white',
    marginHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
  greenSectionTitle: {
    marginTop: 10,
    color: Colors.primaryColor,
    marginHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
  username: {
    color: Colors.primaryColor,
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  appListContainer: {
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  appList: {
    margin: 10,
    borderColor: Colors.thirdColor,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  testsContainer: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: Colors.accentColor,
    borderWidth: 1,
  },
  sensoryListContainer: {
    margin: 10,
    borderRadius: 10,
    borderColor: Colors.accentColor,
    borderWidth: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  sensoryContainer: {
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: Colors.accentColor,
    borderWidth: 1,
    borderRadius: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    color: 'white',
  },
  profileIcon: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  logo: {
    top: Header.useHeaderHeight,
    width: '100%',
    height: 160,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  button: {
    height: 40,
    width: '100%',
    borderRadius: 10,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
  },
  rowText: {
    textDecorationLine: 'underline',
    color: Colors.thirdColor,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
