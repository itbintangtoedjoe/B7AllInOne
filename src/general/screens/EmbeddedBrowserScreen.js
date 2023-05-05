import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const EmbeddedBrowserScreen = (props) => {
  //   return (
  //     <View>
  //       <Text>Embedded Browser Screen</Text>
  //     </View>
  //   );
  return (
    // <WebView source={{uri: 'https://portal.bintang7.com/sensoryonline'}} />
    <WebView
      source={{
        uri: "http://kf-dc1k2app.onekalbe.dom:8080/PR/ApprovePROther?documentNo=TES/04102022/104&processId=3780",
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default EmbeddedBrowserScreen;
