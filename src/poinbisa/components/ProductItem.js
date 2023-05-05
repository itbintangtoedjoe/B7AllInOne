import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import NumberFormat from 'react-number-format';

import Card from './Card';
import MilliardText from '../../general/components/MilliardText';
import MilliardBoldText from '../../general/components/MilliardBoldText';

const ProductItem = props => {
  let TouchableComp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComp = TouchableNativeFeedback;
  }

  return (
    //useForeground supaya ripple effectnya di depan
    <Card style={styles.product}>
      <View style={styles.touchable}>
        {/* <TouchableComp onPress={props.onSelect} useForeground> */}
        <View>
          <View style={styles.imageContainer}>
            <Image source={{uri: props.image}} style={styles.image} />
          </View>
          <View style={styles.detailsContainer}>
            <MilliardText style={styles.title}>{props.title}</MilliardText>
            {/* <MilliardBoldText style={styles.price}> */}
            <NumberFormat
              value={props.points}
              displayType={'text'}
              thousandSeparator={true}
              renderText={value => (
                <MilliardBoldText style={styles.price}>
                  Poin: {value}
                </MilliardBoldText>
              )}
            />
            {/* </MilliardBoldText> */}
            <MilliardText style={styles.detail}>{props.detail}</MilliardText>
          </View>
          <View style={styles.actions}>{props.children}</View>
        </View>
        {/* </TouchableComp> */}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 450,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    // fontFamily: 'cassette-tapes',
    fontSize: 20,
    marginVertical: 1,
  },
  detailsContainer: {
    alignItems: 'center',
    height: 100,
    padding: 10,
    marginBottom: 40,
  },
  price: {
    fontSize: 18,
    color: 'black',
    // color: '#888',
  },
  detail: {
    fontSize: 15,
    color: 'black',
  },
  actions: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    // height: '23%',
    // paddingHorizontal: 20,
  },
});

export default ProductItem;
