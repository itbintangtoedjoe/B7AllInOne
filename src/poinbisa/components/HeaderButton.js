import React from 'react';
import {Platform} from 'react-native';
import {HeaderButton} from 'react-navigation-header-buttons';
import IonIcon from 'react-native-vector-icons/Ionicons';

import Colors from '../../general/constants/Colors';

const CustomHeaderButton = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Colors.primaryColor}
    />
  );
};

export default CustomHeaderButton;
