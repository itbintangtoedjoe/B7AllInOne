//140923 auth action

import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import User from "../../models/User";
import UserEO from "../../../ekspedisionline/models/UserEO";

export const FETCH_ACTIVE_USER = "FETCH_ACTIVE_USER";
export const LOGOUT = "LOGOUT";
export const LOGIN_RADIUS = "LOGIN_RADIUS";

export const isReachable = async () => {
  const timeout = new Promise((resolve, reject) => {
    setTimeout(reject, 15000, "Request timed out");
  });
  let data = {
    email: "dont",
    // password: 'eventry',
  };
  const request = fetch(
    "https://portal.bintang7.com/testingapi/api/check-connection",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(data),
    }
  );
  try {
    await Promise.race([timeout, request]);
    // const responseDataBase = await request.json();
    // console.log(responseDataBase);
    return true;
  } catch (error) {
    console.log(error);
    return Alert.alert(
      "No connection",
      "Failed to connect to the server. Please check your internet connection."
    );
  }
};

export const fetchActiveUser = (data) => {
  return async (dispatch, getState) => {
    dispatch({
      type: FETCH_ACTIVE_USER,
    });
    // console.log(JSON.stringify(data));
    const goodToGo = await isReachable();
    if (goodToGo === true) {
      try {
        //get user untuk base app (db tara)
        const responseBase = await fetch(
          "https://portal.bintang7.com/tara/users/get-active-user",
          // 'https://b7connect.bintang7.com/b7connect/users/get-active-user',
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (!responseBase.ok) {
          throw new Error("Something went wrong!");
          // console.log(responseBase);
        }

        const responseDataBase = await responseBase.json();
        // console.log(responseDataBase);

        let user = responseDataBase.Data;
        let isLoggedIn = responseDataBase.Status;
        let loginStatus = responseDataBase.Message;

        let userEO = null;
        // console.log('isLoggedIn:' + isLoggedIn);
        if (responseDataBase.Status) {
          isLoggedIn = true;
          loginStatus = "success";

          AsyncStorage.setItem("email", data.email);
          AsyncStorage.setItem("pwd", data.password);

          user = new User(
            responseDataBase.Data.NIK,
            responseDataBase.Data.Role.NamaRole,
            responseDataBase.Data.NamaUser,
            responseDataBase.Data.Email,
            responseDataBase.Data.UserAD,
            responseDataBase.Data.TotalPoinBISA,
            responseDataBase.Data.IsAdmin,
            responseDataBase.Data.TanggalAwalRedeem,
            responseDataBase.Data.TanggalAkhirRedeem,
            responseDataBase.Data.JumlahNotifikasi
          );
          // console.log(JSON.stringify(user));
          //get user ekspedisi online
          const responseEO = await fetch(
            "https://portal.bintang7.com/ekspedisionline/users/get-user-data",
            // 'https://b7connect.bintang7.com/ekspedisi-online/users/get-user-data',
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(user),
            }
          );
          if (!responseEO.ok) {
            return;
            // throw new Error('Something went wrong!');
            // console.log(responseEO);
          }
          const responseDataEO = await responseEO.json();
          // console.log(responseDataEO);

          userEO = new UserEO(
            responseDataEO.NIK,
            responseDataEO.NamaUser,
            responseDataEO.NamaRole,
            responseDataEO.NamaLokasi,
            responseDataEO.Departemen,
            responseDataEO.NamaAdmin
          );
        }

        dispatch({
          type: FETCH_ACTIVE_USER,
          activeUser: user,
          activeUserEO: userEO,
          isLoggedIn: isLoggedIn,
          loginStatus: loginStatus,
        });

        // return isLoggedIn;
      } catch (err) {
        throw err;
      }
    } else {
      return goodToGo;
    }
  };
};

export const loginRadius = (data) => {
  return async (dispatch, getState) => {
    dispatch({
      type: LOGIN_RADIUS,
      loadingState: true,
    });
    // console.log(JSON.stringify(data));
    const goodToGo = await isReachable();
    if (goodToGo === true) {
      try {
        //get user untuk base app (db tara)
        const responseBase = await fetch(
          "https://portal.bintang7.com/auth-prod/login",
          // 'https://b7connect.bintang7.com/b7connect/users/get-active-user',
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (!responseBase.ok) {
          throw new Error("Something went wrong!");
          // console.log(responseBase);
        }

        const responseDataBase = await responseBase.json();
        console.log("login k2 action");
        console.log(responseDataBase);

        // let user = responseDataBase.Data;
        let returnCode = responseDataBase.Status;
        let loginStatus = responseDataBase.message;
        let isLoggedIn = false;
        if (loginStatus == "Success") {
          isLoggedIn = true;
        }

        // let userEO = null;
        // // console.log('isLoggedIn:' + isLoggedIn);
        // if (responseDataBase.Status) {
        //   isLoggedIn = true;
        //   loginStatus = "success";
        //   user = new User(
        //     responseDataBase.Data.NIK,
        //     responseDataBase.Data.Role.NamaRole,
        //     responseDataBase.Data.NamaUser,
        //     responseDataBase.Data.Email,
        //     responseDataBase.Data.UserAD,
        //     responseDataBase.Data.TotalPoinBISA,
        //     responseDataBase.Data.IsAdmin,
        //     responseDataBase.Data.TanggalAwalRedeem,
        //     responseDataBase.Data.TanggalAkhirRedeem,
        //     responseDataBase.Data.JumlahNotifikasi
        //   );
        // }
        console.log("isLoggedIn: " + isLoggedIn);
        console.log("loginStatus: " + responseDataBase.message);

        dispatch({
          type: LOGIN_RADIUS,
          // activeUser: user,
          // activeUserEO: userEO,
          isLoggedIn: isLoggedIn,
          loginStatus: loginStatus,
          loadingState: false,
        });

        // return isLoggedIn;
      } catch (err) {
        throw err;
      }
    } else {
      return goodToGo;
    }
  };
};

export const logout = () => {
  return async (dispatch, getState) => {
    let keys = ["email", "pwd"];
    AsyncStorage.multiRemove(keys);

    // AsyncStorage.setItem("email", "");
    // AsyncStorage.setItem("pwd", "");
    dispatch({
      type: LOGOUT,
      activeUser: null,
      activeUserEO: null,
      isLoggedIn: false,
    });
  };
};
