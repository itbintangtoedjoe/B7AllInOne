import React from 'react';
import {Image, StyleSheet} from 'react-native';

export default function Logo() {
  return (
    <Image source={require('../../../tara/assets/tara.png')} style={styles.image} />
  );
}

const styles = StyleSheet.create({
  image: {
    width: '70%',
    height: 50,
    marginBottom: 8,
  },
});
