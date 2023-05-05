import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
  ImageBackground,
  Platform,
} from "react-native";
import { Header } from "react-navigation-stack";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Block, theme } from "galio-framework";

import Button from "../components/template/Button";
import Colors from "../constants/Colors";
import Strings from "../constants/Strings";
import MilliardText from "../components/MilliardText";
import Card from "../components/UI/Card";
import * as actions from "../../tara/redux/actions";
import { logout } from "../../tara/redux/actions";
import { Images, materialTheme } from "../constants/galio";

const { width, height } = Dimensions.get("screen");
// console.log(width);
const thumbMeasure = (width - 48 - 32) / 3;

const ProfileScreen = (props) => {
  const profileIcon =
    "https://portal.bintang7.com/tara/template/icons/user-blue.png";
  const activeUser = useSelector((state) => state.auth.activeUser);

  const dispatch = useDispatch();

  const logOut = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "No",
        },
        {
          text: "Yes",
          onPress: () => {
            dispatch(actions.logout()).then(() => {
              props.navigation.navigate({
                routeName: "BaseAuth",
              });
            });
          },
        },
      ],
      { cancelable: true }
    );
    // dispatch(actions.logout()).then(() => {
    //   props.navigation.navigate({
    //     routeName: 'Auth',
    //   });
    // });
  };

  const changePasswordHandler = () => {
    props.navigation.navigate("ChangePasswordAuthenticated", {
      origin: "profile",
    });
    // dispatch(actions.logout()).then(() => {
    //   props.navigation.navigate({
    //     routeName: 'ChangePasswordAuthenticated',
    //   });
    // });
  };

  const notificationPressed = () => {
    alert("halo");
    props.navigation.navigate("Profile");
    // dispatch(actions.logout()).then(() => {
    //   props.navigation.navigate({
    //     routeName: 'ChangePasswordAuthenticated',
    //   });
    // });
  };

  return (
    // <View style={styles.pageContent}>
    //   <Text style={styles.sectionTitle}>PROFILE</Text>
    //   <View style={styles.container}>
    //     <View style={styles.content}>
    //       <Image source={{uri: profileIcon}} style={styles.profileIcon} />
    //       <View style={styles.description}>
    //         <Text style={styles.username}>
    //           {activeUser !== undefined && activeUser !== null
    //             ? activeUser.nama_user
    //             : ''}
    //         </Text>
    //         <Text style={styles.email}>
    //           {activeUser !== undefined && activeUser !== null
    //             ? activeUser.email
    //             : ''}
    //         </Text>
    //       </View>
    //     </View>
    //     <View style={styles.buttonContainer}>
    //       <TouchableOpacity
    //         style={styles.button}
    //         onPress={changePasswordHandler}>
    //         <Text style={styles.buttonText}>CHANGE PASSWORD</Text>
    //       </TouchableOpacity>
    //       <View style={styles.divider10}></View>
    //       <TouchableOpacity style={styles.buttonLogout} onPress={logOut}>
    //         <Text style={styles.buttonText}>LOG OUT</Text>
    //       </TouchableOpacity>
    //       {/* <Button mode="contained" onPress={logOut}>
    //         LOG OUT
    //       </Button> */}
    //       <Text style={styles.appVersion}>B7 Connect ver. 1.0.0+</Text>
    //       <Text style={styles.copyright}>
    //         Copyright&nbsp;
    //         <Icon name="copyright" size={15} color={Colors.primaryColor} /> 2021
    //         PT. Bintang Toedjoe
    //       </Text>
    //       {/* <Button
    //       title="Sign Out"
    //       color={Colors.primaryColor}
    //       style={styles.button}
    //     /> */}
    //     </View>
    //   </View>
    // </View>

    <Block flex style={styles.profile}>
      <Block flex>
        <ImageBackground
          source={require("../assets/bg.jpg")}
          style={styles.profileContainer}
          imageStyle={styles.profileImage}
        ></ImageBackground>
      </Block>
      <Card style={styles.newCard}>
        <View style={styles.content}>
          <Image source={{ uri: profileIcon }} style={styles.profileIcon} />
          <View style={styles.description}>
            <MilliardText style={styles.username}>
              {activeUser !== undefined && activeUser !== null
                ? activeUser.nama_user
                : ""}
            </MilliardText>
            <MilliardText style={styles.email}>
              {activeUser !== undefined && activeUser !== null
                ? activeUser.email
                : ""}
            </MilliardText>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={changePasswordHandler}
          >
            <MilliardText style={styles.buttonText}>
              CHANGE PASSWORD
            </MilliardText>
          </TouchableOpacity>
          <View style={styles.divider10}></View>
          <TouchableOpacity style={styles.buttonLogout} onPress={logOut}>
            <MilliardText style={styles.buttonLogOutText}>LOG OUT</MilliardText>
          </TouchableOpacity>
          <MilliardText style={styles.appVersion}>
            B7 Connect ver. {Strings.appVersion}
          </MilliardText>
          <MilliardText style={styles.copyright}>
            Copyright&nbsp;
            <Icon name="copyright" size={15} color={Colors.primaryColor} /> 2023
            PT. Bintang Toedjoe
          </MilliardText>
        </View>
      </Card>
      {/* <Block flex style={styles.options}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Image source={{uri: profileIcon}} style={styles.profileIcon} />
            <View style={styles.description}>
              <MilliardText style={styles.username}>
                {activeUser !== undefined && activeUser !== null
                  ? activeUser.nama_user
                  : ''}
              </MilliardText>
              <MilliardText style={styles.email}>
                {activeUser !== undefined && activeUser !== null
                  ? activeUser.email
                  : ''}
              </MilliardText>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={changePasswordHandler}>
              <MilliardText style={styles.buttonText}>
                CHANGE PASSWORD
              </MilliardText>
            </TouchableOpacity>
            <View style={styles.divider10}></View>
            <TouchableOpacity style={styles.buttonLogout} onPress={logOut}>
              <MilliardText style={styles.buttonLogOutText}>
                LOG OUT
              </MilliardText>
            </TouchableOpacity>
            <MilliardText style={styles.appVersion}>
              B7 Connect ver. 1.1.0
            </MilliardText>
            <MilliardText style={styles.copyright}>
              Copyright&nbsp;
              <Icon
                name="copyright"
                size={15}
                color={Colors.primaryColor}
              />{' '}
              2021 PT. Bintang Toedjoe
            </MilliardText>
          </View>
        </View>
      </Block> */}
    </Block>
  );
};

const styles = StyleSheet.create({
  pageContent: {
    margin: 10,
  },
  sectionTitle: {
    fontSize: 22,
    color: Colors.primaryColor,
    fontWeight: "bold",
    marginBottom: 10,
  },
  container: {
    paddingHorizontal: 5,
    paddingTop: 10,
    backgroundColor: "white",
    borderRadius: 8,
    backgroundColor: "white",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    color: "white",
  },
  profileIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  logo: {
    top: Header.useHeaderHeight,
    width: "100%",
    height: 160,
  },
  username: {
    fontSize: 18,
    color: Colors.primaryColor,
  },
  email: {
    fontSize: 14,
    color: Colors.primaryColor,
  },
  buttonContainer: {
    marginVertical: 30,
  },
  button: {
    height: 40,
    width: "100%",
    borderRadius: 4,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.softBlue,
    borderWidth: 1,
  },
  buttonLogout: {
    height: 40,
    width: "100%",
    borderRadius: 4,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    // borderColor: Colors.softBlue,
    // borderWidth: 1,
  },
  buttonText: {
    color: Colors.primaryColor,
    fontWeight: "bold",
  },
  buttonLogOutText: {
    color: "white",
    fontWeight: "bold",
    fontFamily: "serif",
  },
  description: {
    flexShrink: 1,
  },
  appVersion: {
    marginTop: 20,
    color: Colors.primaryColor,
    textAlign: "center",
  },
  copyright: {
    marginTop: 5,
    color: Colors.primaryColor,
    textAlign: "center",
  },
  divider10: {
    marginBottom: 10,
  },
  profile: {
    // marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
  },
  profileImage: {
    width: width * 1.1,
    height: "auto",
    resizeMode: "stretch",
  },
  profileContainer: {
    width: width,
    height: 250,
    // height: height / 3,
    resizeMode: "stretch",
  },
  notificationBar: {
    marginTop: -10,
    justifyContent: "flex-end",
    // position: 'relative',
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: theme.SIZES.BASE / 2,
    borderRadius: 4,
    height: 19,
    width: 38,
  },
  seller: {
    marginRight: theme.SIZES.BASE / 2,
  },
  options: {
    position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE * 0.7,
    marginTop: -theme.SIZES.BASE * 14,
    marginBottom: theme.SIZES.BASE * 25,
    // borderTopLeftRadius: 13,
    // borderTopRightRadius: 13,
    borderRadius: 13,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
    // backgroundColor: 'pink',
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure,
  },
  // gradient: {
  //   zIndex: 1,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   height: '30%',
  //   position: 'absolute',
  // },
  poinBisaContainer: {
    // flex: 1,
    // height: height / 5,
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.softBlue,
    backgroundColor: "white",
    // borderStyle: 'dashed',
  },
  redeemText: {
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: Colors.primaryColor,
  },
  newCard: {
    position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE * 0.7,
    // marginTop: -theme.SIZES.BASE * 14,
    marginBottom:
      Platform.OS === "android" ? theme.SIZES.BASE * 28 : theme.SIZES.BASE * 18,
    // borderTopLeftRadius: 13,
    // borderTopRightRadius: 13,
    borderRadius: 13,
    // backgroundColor: 'white',
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
});

export default ProfileScreen;
