import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import Pdf from "react-native-pdf";
import { useDispatch } from "react-redux";
import ScreenGuardModule from "react-native-screenguard";

import Colors from "../../general/constants/Colors";

//ios only
//modify taken screenshot to only show a block of color
ScreenGuardModule.register(Colors.primaryColor, (_) => {
  Alert.alert("Taking a screenshot of the app is prohibited");
});

const DocumentViewerScreen = (props) => {
  let url = props.navigation.getParam("docUrl");
  url = encodeURI(url);
  // const url = 'https://portal.bintang7.com/TARA/UploadedFiles/Kebijakan Cuti/Perpanjangan Saldo Cuti/001 Memo Perpanjangan Masa Berlaku Penggunaan Cuti_230222_v1.pdf';
  const [docUrl, setDocUrl] = useState(url);

  // console.log('docUrl: ' + props.navigation.getParam('docUrl'));

  // return (
  //   // <View style={styles.container}>
  //   //   <Text>BOOOOO</Text>
  //   // </View>
  //   <View>
  //     <Pdf
  //       source={docUrl}
  //       onLoadComplete={numOfPages => console.log(numOfPages)}
  //     />
  //   </View>
  // );
  const dispatch = useDispatch();

  useEffect(() => {
    setDocUrl(url);
  }, [dispatch]);

  const source = {
    uri: docUrl,
    cache: true,
  };

  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        // onLoadComplete={(numberOfPages, filePath) => {
        //   console.log(`number of pages: ${numberOfPages}`);
        // }}
        // onPageChanged={(page, numberOfPages) => {
        //   console.log(`current page: ${page}`);
        // }}
        onError={(error) => {
          console.log(error);
        }}
        // onPressLink={uri => {
        //   console.log(`Link presse: ${uri}`);
        // }}
        style={styles.pdf}
        enablePaging={true}
      />
    </View>
  );
};

DocumentViewerScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: navigationData.navigation.getParam("judul"),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    // marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default DocumentViewerScreen;
