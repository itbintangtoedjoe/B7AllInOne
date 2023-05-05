import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

const PentagonButton = props => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('clickezz');
      }}>
      <ImageBackground source={props.icon} style={styles.bgImageCategory}>
        <View style={styles.pentagon}>
          <View style={styles.pentagonInner} />
          <View style={styles.pentagonBefore} />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};
export default PentagonButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pentagon: {
    backgroundColor: 'transparent',
  },
  pentagonInner: {
    width: 90,
    borderBottomColor: 'red',
    borderBottomWidth: 0,
    borderLeftColor: 'transparent',
    borderLeftWidth: 18,
    borderRightColor: 'transparent',
    borderRightWidth: 18,
    borderTopColor: 'red',
    borderTopWidth: 50,
  },
  pentagonBefore: {
    position: 'absolute',
    height: 0,
    width: 0,
    top: -35,
    left: 0,
    borderStyle: 'solid',
    borderBottomColor: 'red',
    borderBottomWidth: 35,
    borderLeftColor: 'transparent',
    borderLeftWidth: 45,
    borderRightColor: 'transparent',
    borderRightWidth: 45,
    borderTopWidth: 0,
    borderTopColor: 'transparent',
  },
  bgImageCategory: {
    width: '100%',
    // height: '50%',
    flex: 1,
    // opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    resizeMode: 'contain',
  },
});
