import React from "react";
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import Colors from "../../constants/Colors";

export default function Background({ children }) {
  return (
    <ImageBackground
      source={require("../../../tara/assets/background_dot2.png")}
      resizeMode="repeat"
      style={styles.background}
    >
      <KeyboardAvoidingView style={styles.container} behavior="height">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
