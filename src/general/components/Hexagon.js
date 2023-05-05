import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Hexagon = props => {
  return (
    <View style={styles.hexagon}>
      <View style={styles.hexagonInner} />
      <View style={styles.hexagonBefore} />
      <View style={styles.hexagonAfter} />
    </View>
  );
};

export default Hexagon;

const styles = StyleSheet.create({
  hexagon: {
    width: 150,
    height: 90,
  },
  hexagonInner: {
    width: 160,
    height: 90,
    backgroundColor: 'yellow',
  },
  hexagonAfter: {
    position: 'absolute',
    bottom: -25,
    left: 0,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 80,
    borderLeftColor: 'transparent',
    borderRightWidth: 80,
    borderRightColor: 'transparent',
    borderTopWidth: 25,
    borderTopColor: 'yellow',
  },
  hexagonBefore: {
    position: 'absolute',
    top: -25,
    left: 0,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 80,
    borderLeftColor: 'transparent',
    borderRightWidth: 80,
    borderRightColor: 'transparent',
    borderBottomWidth: 25,
    borderBottomColor: 'yellow',
  },
});
