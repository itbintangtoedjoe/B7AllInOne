import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableNativeFeedback,
} from 'react-native';

import Colors from '../../general/constants/Colors';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const pdfLogoUrl = 'https://portal.bintang7.com/tara/template/images/pdf-logo.png';

const CarouselCardItem = ({item, index}) => {
  return (
    <TouchableNativeFeedback onPress={}>
      <View style={styles.container} key={index}>
        <View style={styles.imageContainer}>
          <Image source={{uri: pdfLogoUrl}} style={styles.image} />
        </View>
        <Text style={styles.header}>{item.judul}</Text>
        <Text style={styles.body}>{item.deskripsi}</Text>
        <Text style={styles.footer}>Klik untuk membuka dokumen &gt;&gt;</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    paddingBottom: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 4,
    height: '98%',
    overflow: 'hidden',
  },
  imageContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    // borderBottomColor: Colors.taraPrimaryColor,
    // borderBottomWidth: 2,
    backgroundColor: Colors.taraAccentColor,
  },
  image: {
    width: 80,
    height: 100,
  },
  header: {
    color: '#222',
    fontSize: 28,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  body: {
    color: '#222',
    fontSize: 18,
    paddingLeft: 20,
    paddingBottom: 10,
    paddingRight: 20,
  },
  footer: {
    width: ITEM_WIDTH,
    color: 'white',
    fontSize: 15,
    paddingLeft: 20,
    paddingBottom: 10,
    paddingRight: 20,
    position: 'absolute',
    bottom: 0,
    borderTopColor: Colors.taraPrimaryColor,
    borderTopWidth: 1,
    padding: 10,
    backgroundColor: Colors.taraPrimaryColor,
  },
});

export default CarouselCardItem;
