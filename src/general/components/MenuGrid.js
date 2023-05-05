import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Platform,
  ImageBackground,
  Image,
} from 'react-native';
import Colors from '../constants/Colors';

const MenuGrid = props => {
  return (
    <View style={styles.gridContainer}>
      <TouchableHighlight onPress={props.onSelect} style={{flex: 1}}>
        <View style={styles.gridItem}>
          <ImageBackground
            source={props.icon}
            style={styles.appLogo}></ImageBackground>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {props.title}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    // flex: 1,
    marginVertical: 10,
    marginHorizontal: 5,
    width: 60,
    height: 75,
    borderRadius: 9,
    overflow: 'hidden',
    // Platform.OS === 'android' && Platform.Version >= 21 ? 'hidden' : 'visible',
    // elevation: 5,
    // backgroundColor: 'black',
    padding: 0,
  },
  gridItem: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    // shadowColor: 'black',
    // shadowOpacity: 0.26,
    // shadowOffset: {width: 0, height: 2},
    // elevation: 3,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'white',
  },
  titleContainer: {
    // height: '50%',
    // padding: 10,
    flex: 1,
    // alignItems: 'center',
    // backgroundColor: 'black',
    marginVertical: 0,
  },
  title: {
    fontSize: 10.5,
    // fontWeight: 'bold',
    color: Colors.primaryColor,
    textAlign: 'center',
    fontFamily: 'Milliard-Book',
    ...Platform.select({
      ios: {
        marginTop: 5,
      },
    }),
    // backgroundColor: 'red',
  },
  imageContainer: {
    flex: 1,
    height: '50%',
    width: '100%',
    padding: 10,
    backgroundColor: 'rgba(255,0,0,0.5)',
  },
  appLogo: {
    width: 46,
    height: 46,
    // resizeMode: 'contain',
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'flex-end',
    // opacity: 0.5,
    // backgroundColor: 'red',
    left: 7,
    marginTop: 0,
  },
});

export default MenuGrid;
