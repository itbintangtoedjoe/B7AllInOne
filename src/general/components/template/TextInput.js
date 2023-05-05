import React, {useState} from 'react';
import {View, StyleSheet, Text, Switch, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TextInput as Input} from 'react-native-paper';

import Colors from '../../constants/Colors';

export default function TextInput({errorText, description, ...props}) {
  const [visibility, setVisibility] = useState(true);

  const changeVisibility = () => {
    setVisibility(!visibility);
  };

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      marginVertical: 12,
    },
    input: {
      backgroundColor: 'white',
    },
    description: {
      fontSize: 13,
      color: Colors.primaryColor,
      paddingTop: 8,
    },
    error: {
      fontSize: 13,
      color: Colors.primaryColor,
      paddingTop: 8,
    },
  });

  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={Colors.accentColor}
        underlineColor="transparent"
        mode="outlined"
        secureTextEntry={props.type == 'password' ? visibility : false}
        autoCapitalize="none"
        theme={{
          colors: {
            placeholder: 'gray',
            text: 'black',
            primary: Colors.primaryColor,
            underlineColor: Colors.primaryColor,
            backgroundColor: 'white',
          },
        }}
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
      {props.page == 'login' ? (
        <View style={{alignItems: 'flex-end', marginTop: 10}}>
          <Switch
            onValueChange={changeVisibility}
            value={visibility}
            thumbColor={
              Platform.OS == 'android' ? Colors.primaryColor : 'white'
            }
            trackColor={{
              true: Colors.primaryColor,
              false: Colors.accentColor,
            }}
          />
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}
