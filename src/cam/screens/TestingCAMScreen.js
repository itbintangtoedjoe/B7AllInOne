import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

const TestingCAMScreen = (props) => {
  const [password, setPassword] = useState("");
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  return (
    <View style={styles.viewPassword}>
      {/* <Text>Hi</Text> */}
      <TextInput
        secureTextEntry={isPasswordSecure}
        style={styles.textInputStyle}
        right={
          <TextInput.Icon
            name={() => (
              <MaterialCommunityIcons
                name={isPasswordSecure ? "eye-off" : "eye"}
                size={28}
                color={COLORS.black}
              />
            )} // where <Icon /> is any component from vector-icons or anything else
            onPress={() => {
              isPasswordSecure
                ? setIsPasswordSecure(false)
                : setIsPasswordSecure(true);
            }}
          />
        }
        fontSize="18"
        selectionColor="orange"
        underlineColor="orange"
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        underlineColorAndroid="transparent"
        theme={{
          colors: {
            text: "black",
            primary: "orange",
            placeholder: "black",
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default TestingCAMScreen;
