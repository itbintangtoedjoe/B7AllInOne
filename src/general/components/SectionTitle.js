import React from 'react';
import {Text, StyleSheet} from 'react-native';

import Colors from '../constants/Colors';

export default function SectionTitle(props) {
  return <Text style={{...styles.text, color: props.color}}>{props.text}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
