import React from "react";
import {
  createAppContainer,
  createSwitchNavigator,
  getActiveChildNavigationOptions,
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import IonIcon from "react-native-vector-icons/Ionicons";

import {
  HomeScreen as TARAHomeScreen,
  CategoryListScreen as TARACategoryListScreen,
  SubcategoryListScreen as TARASubcategoryListScreen,
  DocumentListScreen as TARADocumentListScreen,
  DocumentViewerScreen as TARADocumentViewerScreen,
  // AuthenticationScreen,
  // ChangePasswordScreen,
  // ProfileScreen,
} from "../tara/screens";

import {
  HomeScreen as EOHomeScreen,
  HistoryScreen as EOHistoryScreen,
  OngoingDeliveryScreen as EOOngoingScreen,
  DeliveryDetailScreen as EODeliveryDetailScreen,
  DeliveryTimelineScreen as EODeliveryTimelineScreen,
  ScanPackageScreen as EOScanPackageScreen,
} from "../ekspedisionline/screens";

import {
  PoinBisaCatalogueScreen,
  CartScreen as PBCartScreen,
  OrderHistoryScreen as PBOrderHistoryScreen,
} from "../poinbisa/screens";

import {
  HomeScreen as CAMHomeScreen,
  CAMDetailScreen,
  TestingCAMScreen,
} from "../cam/screens";

import {
  SplashScreen,
  HomeScreen as BaseHomeScreen,
  AuthenticationScreen,
  ChangePasswordScreen,
  ProfileScreen,
  ChangePasswordAuthenticated,
  NotificationScreen,
  EmbeddedBrowserScreen,
} from "./screens";

import Colors from "../general/constants/Colors";
import Fonts from "../general/constants/Fonts";
import { Button, Dimensions, Platform, TouchableOpacity } from "react-native";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primaryColor,
  },
  // headerTitleStyle: {
  //   color: 'white',
  // },
  headerTintColor: "white",
};

const noHeaderOptions = {
  headerShown: false,
};

const baseHeaderStyle = {
  headerStyle: {
    height: Platform.OS == "android" ? 50 : 80,
  },
};

//#region TARA

const taraDefaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Colors.taraPrimaryColor,
  },
  // headerTitleStyle: {
  //   color: 'white',
  // },
  headerTintColor: "white",
  cardStyle: { backgroundColor: "white" },
};

const TARAHomeNavigator = createStackNavigator(
  {
    TARAHome: {
      screen: TARAHomeScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    TARADocumentViewer: TARADocumentViewerScreen,
  },
  {
    defaultNavigationOptions: {
      ...taraDefaultStackNavOptions,
      title: Platform.OS == "android" ? "Home" : " ",
    },
  }
);

const TARASocializationNavigator = createStackNavigator(
  {
    TARACategoryList: {
      screen: TARACategoryListScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    TARASubcategoryList: {
      screen: TARASubcategoryListScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    TARADocumentList: {
      screen: TARADocumentListScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    TARADocumentViewer: TARADocumentViewerScreen,
  },
  {
    defaultNavigationOptions: {
      ...taraDefaultStackNavOptions,
      title: Platform.OS == "android" ? "Home" : " ",
    },
  }
);

const ProfileNavigator = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const taraTabScreenConfig = {
  TARAHome: {
    screen: TARAHomeNavigator,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({ focused, color, size }) => {
        const icon = focused ? "home" : "home-outline";
        return (
          <IonIcon
            name={icon}
            size={22}
            color={
              Platform.OS === "android" ? "white" : Colors.taraPrimaryColor
            }
          />
        );
      },
      tabBarColor: Colors.taraPrimaryColor,
      // headerShown: false,
    },
  },

  // screen: BaseHomeScreen,
  // navigationOptions: {
  //   tabBarLabel: 'Home',
  //   tabBarIcon: ({focused, color, size}) => {
  //     const icon = focused ? 'home' : 'home-outline';
  //     return <IonIcon name={icon} size={22} color={Colors.primaryColor} />;
  //   },
  //   // tabBarColor: '#bbcff2',
  //   // headerShown: false,
  // },
  TARASocialization: {
    screen: TARASocializationNavigator,
    navigationOptions: {
      tabBarLabel: "Dokumen",
      tabBarIcon: ({ focused }) => {
        const icon = focused ? "documents" : "documents-outline";
        return (
          <IonIcon
            name={icon}
            size={22}
            color={
              Platform.OS === "android" ? "white" : Colors.taraPrimaryColor
            }
          />
        );
      },
      tabBarColor: Colors.taraPrimaryColor,
      // headerShown: false,
    },
  },
  //   TARAProfile: {
  //     screen: ProfileNavigator,
  //     navigationOptions: {
  //       tabBarLabel: 'Profile',
  //       tabBarIcon: tabInfo => {
  //         return <Icon name="user" size={25} color={tabInfo.tintColor} />;
  //       },
  //       tabBarColor: Colors.primaryColor,
  //       // headerShown: false,
  //     },
  //   },
  // Auth: {
  //   screen: AuthenticationNavigator,
  //   navigationOptions: {
  //     tabBarLabel: 'Profile',
  //     tabBarIcon: tabInfo => {
  //       return <Icon name="user" size={25} color={tabInfo.tintColor} />;
  //     },
  //     tabBarColor: 'lightblue',
  //     // headerShown: false,
  //   },
  // },
};

const TARAHomeTabNavigator =
  //code here
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(taraTabScreenConfig, {
        activeColor: "white",
        shifting: true,
        //kalo shifting false, pake ini supaya isa ganti warna sesuai keinginan
        //kalo pake yg di tabbarcolor ga kebaca
        // barStyle: {
        //   backgroundColor: Colors.primaryColor,
        // },
      })
    : createBottomTabNavigator(taraTabScreenConfig, {
        tabBarOptions: {
          activeBackgroundColor: "white",
          activeTintColor: "white",
          labelStyle: {
            fontSize: 12,
            color: "black",
            fontFamily: Fonts.primaryFont,
          },
        },
        // tabBarOptions: {
        //   activeBackgroundColor: 'blue',
        //   activeTintColor: 'white',
        //   labelStyle: {
        //     // fontFamily: "fortuna-schwein",
        //   },
        // },
      });

const TARAContentNavigator = createStackNavigator(
  {
    TARAHome: TARAHomeTabNavigator,
    TARASocialization: TARASocializationNavigator,
    // Auth: AuthenticationNavigator,
  },
  {
    defaultNavigationOptions: noHeaderOptions,
  }
);

const TARAMainNavigator = createSwitchNavigator({
  TARAApp: TARAContentNavigator,
});

//#endregion

//#region EKSPEDISI ONLINE

const EkspedisiOnlineNavigator = createStackNavigator(
  {
    EOHome: {
      screen: EOHomeScreen,
      navigationOptions: {
        cardStyle: { backgroundColor: Colors.ekspedisiPrimaryColor },
      },
    },
    // EOHome: EOHomeScreen,
    EOHistory: EOHistoryScreen,
    EOOngoing: EOOngoingScreen,
    EODeliveryDetail: EODeliveryDetailScreen,
    EODeliveryTimeline: EODeliveryTimelineScreen,
    EOScanPackage: EOScanPackageScreen,
  },
  {
    defaultNavigationOptions: {
      ...noHeaderOptions,
      cardStyle: { backgroundColor: Colors.ekspedisiPrimaryColor },
    },
  }
);

// const TARAMainNavigator = createSwitchNavigator({
//     TARAAuth: AuthenticationNavigator,
//     TARAApp: TARAContentNavigator,
//   });

//#endregion

//#region CAM

const CAMNavigator = createStackNavigator(
  {
    CAMHome: {
      screen: CAMHomeScreen,
      navigationOptions: {
        cardStyle: { backgroundColor: Colors.camPrimaryColor },
      },
    },
    CAMDetail: CAMDetailScreen,
  },
  {
    defaultNavigationOptions: {
      ...noHeaderOptions,
      cardStyle: { backgroundColor: Colors.camPrimaryColor },
    },
  }
);

// const TARAMainNavigator = createSwitchNavigator({
//     TARAAuth: AuthenticationNavigator,
//     TARAApp: TARAContentNavigator,
//   });

//#endregion

const PickerHeaderRight = () => {
  return (
    <TouchableOpacity
      style={{ marginRight: 10 }}
      onPress={() => props.navigation.navigate("PoinBisaCart")}
    >
      <IonIcon name="cart" size={25} color={Colors.primaryColor} />
    </TouchableOpacity>
    //   <Button
    //     title="info"
    //     onPress={() => {
    //       alert('huhuhu');
    //     }}
    //   />
  );
};

//#region POIN BISA
const PBHomeNavigator = createStackNavigator(
  {
    PBHome: {
      screen: PoinBisaCatalogueScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    PBCart: PBCartScreen,
  },
  {
    defaultNavigationOptions: {
      ...taraDefaultStackNavOptions,
      title: Platform.OS == "android" ? "Home" : " ",
    },
  }
);

const PBHistoryNavigator = createStackNavigator(
  {
    PBOrderHistory: {
      screen: PBOrderHistoryScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    PBCart: PBCartScreen,
  },
  {
    defaultNavigationOptions: {
      ...taraDefaultStackNavOptions,
      title: Platform.OS == "android" ? "Home" : " ",
    },
  }
);

const pbTabScreenConfig = {
  PBHome: {
    screen: PBHomeNavigator,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({ focused, color, size }) => {
        const icon = focused ? "home" : "home-outline";
        return (
          <IonIcon
            name={icon}
            size={22}
            color={
              Platform.OS === "android"
                ? Colors.primaryColor
                : Colors.primaryColor
            }
          />
        );
      },
      tabBarColor: Colors.primaryColor,
      // headerShown: false,
    },
  },

  PBHistory: {
    screen: PBHistoryNavigator,
    navigationOptions: {
      tabBarLabel: "History",
      tabBarIcon: ({ focused }) => {
        const icon = focused ? "clipboard" : "clipboard-outline";
        return (
          <IonIcon
            name={icon}
            size={22}
            color={
              Platform.OS === "android"
                ? Colors.primaryColor
                : Colors.primaryColor
            }
          />
        );
      },
      tabBarColor: Colors.primaryColor,
      // headerShown: false,
    },
  },
};

const PBHomeTabNavigator =
  Platform.OS === "android"
    ? createBottomTabNavigator(pbTabScreenConfig, {
        tabBarOptions: {
          // activeBackgroundColor: 'white',
          // activeTintColor: 'white',
          // showLabel: false,
          style: {
            position: "absolute",
            bottom: 20,
            left: 20,
            backgroundColor: "#ffffff",
            right: 20,
            borderWidth: 1,
            borderColor: "#bbcff2",
            borderRadius: 15,
            height: 50,
          },
          labelStyle: {
            color: Colors.primaryColor,
            fontFamily: Fonts.primaryFont,
          },
        },
      })
    : createBottomTabNavigator(pbTabScreenConfig, {
        tabBarOptions: {
          activeBackgroundColor: "white",
          activeTintColor: "white",
          labelStyle: {
            fontSize: 12,
            color: "black",
            fontFamily: Fonts.primaryFont,
          },
        },
      });

const PBContentNavigator = createStackNavigator(
  {
    PBHome: PBHomeTabNavigator,
    PBHistory: PBHistoryNavigator,
    // Auth: AuthenticationNavigator,
  },
  {
    defaultNavigationOptions: noHeaderOptions,
  }
);

const PoinBisaMainNavigator = createSwitchNavigator({
  PoinBisaApp: PBContentNavigator,
});

//#endregion

// const PoinBisaNavigator = createStackNavigator(
//   {
//     PoinBisaHome: {
//       screen: PoinBisaCatalogueScreen,
//       // navigationOptions: {
//       //   // headerLeft: () => null,
//       //   headerRight: PickerHeaderRight,
//       // },
//       // navigationOptions: {
//       //   cardStyle: {backgroundColor: Colors.ekspedisiPrimaryColor},
//       // },
//     },
//     PoinBisaCart: PBCartScreen,
//     PoinBisaHistory: PBOrderHistoryScreen,
//   },
//   {
//     initialRouteName: "PoinBisaHome",
//     defaultNavigationOptions: {
//       // ...noHeaderOptions,
//       headerTitle: "REDEEM POIN BISA",
//       headerTitleStyle: {
//         fontFamily: Fonts.primaryFont,
//       },
//       // headerRight: PickerHeaderRight,
//       // cardStyle: {backgroundColor: Colors.ekspedisiPrimaryColor},
//     },

//     navigationOptions: {
//       headerShown: false,
//       // headerTitle: 'REDEEM POIN BISA',
//       // headerTitleStyle: {
//       //   fontFamily: Fonts.primaryFont,
//       // },
//       // headerRight: PickerHeaderRight,
//     },

//     // navigationOptions: ({navigation}) => {
//     //   const {index, routes} = navigation.state;
//     //   const {routeName} = routes[index];

//     //   if (routeName === 'PoinBisaHome') {
//     //     return {
//     //       ...getActiveChildNavigationOptions(navigation),
//     //     };
//     //   }
//     // },
//   }
// );
//#endregion

const AuthenticationNavigator = createStackNavigator(
  {
    Login: AuthenticationScreen,
    ChangePassword: ChangePasswordScreen,
  },
  {
    defaultNavigationOptions: noHeaderOptions,
  }
);

const baseTabScreenConfig = {
  BaseHome: {
    screen: BaseHomeScreen,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({ focused, color, size }) => {
        const icon = focused ? "home" : "home-outline";
        return <IonIcon name={icon} size={22} color={Colors.primaryColor} />;
      },
      // tabBarColor: '#bbcff2',
      // headerShown: false,
    },
  },
  Profile: {
    screen: ProfileNavigator,
    navigationOptions: {
      tabBarLabel: "Profile",
      tabBarIcon: ({ focused, color, size }) => {
        const icon = focused ? "person" : "person-outline";
        return <IonIcon name={icon} size={22} color={Colors.primaryColor} />;
      },
      // tabBarColor: '#bbcff2',
      // headerShown: false,
    },
  },
};

const BaseHomeTabNavigator =
  Platform.OS === "android"
    ? createBottomTabNavigator(baseTabScreenConfig, {
        tabBarOptions: {
          // activeBackgroundColor: 'white',
          // activeTintColor: 'white',
          // showLabel: false,
          style: {
            position: "absolute",
            bottom: 20,
            left: 20,
            backgroundColor: "#ffffff",
            right: 20,
            borderWidth: 1,
            borderColor: "#bbcff2",
            borderRadius: 15,
            height: 50,
          },
          labelStyle: {
            color: Colors.primaryColor,
            fontFamily: Fonts.primaryFont,
          },
        },
      })
    : createBottomTabNavigator(baseTabScreenConfig, {
        tabBarOptions: {
          activeBackgroundColor: "white",
          activeTintColor: "white",
          labelStyle: {
            fontSize: 12,
            color: "black",
            fontFamily: Fonts.primaryFont,
          },
        },
      });

const BaseStackNavigator = createStackNavigator(
  {
    SplashScreen: {
      screen: SplashScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    BaseHome: {
      screen: BaseHomeTabNavigator,
      navigationOptions: {
        headerShown: false,
      },
    },
    Notification: {
      screen: NotificationScreen,
      navigationOptions: {
        headerTitle: "Notification",
        headerTitleStyle: {
          fontFamily: Fonts.primaryFont,
        },
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: Colors.primaryColor,
        },
      },
    },
    EmbeddedBrowser: {
      screen: EmbeddedBrowserScreen,
      navigationOptions: {
        headerTitle: "Detail Transaksi",
        headerTitleStyle: {
          fontFamily: Fonts.primaryFont,
        },
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: Colors.camPrimaryColor,
        },
      },
    },
    TARA: {
      screen: TARAMainNavigator,
      navigationOptions: {
        headerTitle: "TARA",
        headerTitleStyle: {
          fontFamily: Fonts.primaryFont,
        },
      },
    },
    EkspedisiOnline: {
      screen: EkspedisiOnlineNavigator,
      navigationOptions: {
        headerTitle: "Ekspedisi Online",
        headerTitleStyle: {
          fontFamily: Fonts.primaryFont,
        },
      },
    },
    PoinBisa: {
      screen: PoinBisaMainNavigator,
      navigationOptions: {
        headerTitle: "Poin BISA",
        headerTitleStyle: {
          fontFamily: Fonts.primaryFont,
        },
      },
    },
    CAM: {
      screen: CAMNavigator,
      navigationOptions: {
        headerTitle: "CAM",
        headerTitleStyle: {
          fontFamily: Fonts.primaryFont,
        },
      },
    },
  },
  {
    defaultNavigationOptions: {
      ...baseHeaderStyle,
      title: "Home",
    },
  }
);

const BaseNavigator = createSwitchNavigator({
  BaseApp: BaseStackNavigator,
  BaseAuth: AuthenticationNavigator,
  ChangePasswordAuthenticated: ChangePasswordAuthenticated,
});

export default createAppContainer(BaseNavigator);
