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
import Colors from '../../general/constants/Colors';

let tipe;

const ImageTile = props => {
  return (
    // <View>
    //   <ImageBackground
    //     source={props.icon}
    //     style={
    //       props.tipe == 'kategori'
    //         ? styles.bgImageCategory
    //         : styles.bgImageSubcategory
    //     }></ImageBackground>
    //   <Text>brooo</Text>
    // </View>
    <View
      style={{
        ...styles.gridContainer,
        width: props.perRow == 1 ? '92%' : '40%',
        height: props.size == 'normal' ? 130 : 70,
        marginHorizontal: props.size == 'normal' ? 18 : 15,
      }}>
      <TouchableHighlight onPress={props.onSelect} style={{flex: 1}}>
        <View style={{...styles.gridItem, ...{backgroundColor: props.color}}}>
          <ImageBackground source={props.icon} style={styles.bgImageCategory}>
            {/* <Text style={styles.title} numberOfLines={3}>
              {props.namaKategori}
            </Text> */}
          </ImageBackground>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    // flex: 1,
    width: '93%',
    marginVertical: 15,
    width: 30,
    height: 150,
    borderRadius: 20,
    overflow: 'hidden',
    // Platform.OS === 'android' && Platform.Version >= 21 ? 'hidden' : 'hidden',
    elevation: 5,
  },
  gridItem: {
    flex: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    height: '50%',
    padding: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: '50%',
    width: '100%',
    padding: 10,
    backgroundColor: 'rgba(255,0,0,0.5)',
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
  bgImageSubcategory: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // opacity: 0.5,
    // backgroundColor: 'red',
    marginTop: 0,
  },
});

export default ImageTile;
