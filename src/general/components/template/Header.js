import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import Colors from '../../constants/Colors';

export default function Header(props) {
  return <Text style={styles.header} {...props} />;
}

const styles = StyleSheet.create({
  header: {
    fontFamily: 'Milliard-Book',
    fontSize: 21,
    color: Colors.primaryColor,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
});
