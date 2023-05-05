import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const {width, height} = Dimensions.get('screen');

const CarouselCardItem = ({item, index}) => {
  return (
    // <View style={styles.container} key={index}>
    <Image
      source={{uri: item.url}}
      style={styles.image}
      imageStyle={styles.profileImage}></Image>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    // paddingBottom: 40,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.29,
    // shadowRadius: 4.65,
    // elevation: 7,
  },
  profileImage: {
    width: width,
    height: 'auto',
    resizeMode: 'cover',
  },
  image: {
    width: width - 20,
    height: 230,
    // height: height / 3,
    resizeMode: 'stretch',
    borderRadius: 7,
  },
  //   image: {
  //     width: ITEM_WIDTH,
  //     height: 230,
  //     resizeMode: 'stretch',
  //   },
  header: {
    color: '#222',
    fontSize: 28,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 20,
  },
  body: {
    color: '#222',
    fontSize: 18,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default CarouselCardItem;
