import React from 'react';
import {Text, StyleSheet} from 'react-native';

const MilliardText = props => {
  return (
    <Text style={[props.style, styles.text]} onPress={props.onPress}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Milliard-Book',
  },
});

export default MilliardText;
