import React from 'react';
import {Text, StyleSheet} from 'react-native';

const MilliardBoldText = props => {
  return (
    <Text style={[props.style, styles.text]} onPress={props.onPress}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Milliard-Bold',
  },
});

export default MilliardBoldText;
