import moment from "moment";
import { Alert } from "react-native";

import { isReachable } from "../../../general/redux/actions";
import Pengiriman from "../../models/Pengiriman";
import HistoriStatus from "../../models/HistoriStatus";
import NavigationService from "../../../general/NavigationService";

export const FETCH_HISTORI_PENGIRIMAN = "FETCH_HISTORI_PENGIRIMAN";
export const FETCH_DETAIL_PENGIRIMAN = "FETCH_DETAIL_PENGIRIMAN";
export const FETCH_TIMELINE_PENGIRIMAN = "FETCH_TIMELINE_PENGIRIMAN";
export const UPDATE_STATUS_PENGIRIMAN = "UPDATE_STATUS_PENGIRIMAN";

export const SUCCESS = "success";
export const COMPLETED_DELIVERY = "completed delivery";
export const NO_CHANGES = "no changes";
export const USER_INPUT = "user input";
export const NOT_FOUND = "not found";

export const fetchHistoriPengiriman = (status, user) => {
  // console.log(user);
  return async (dispatch, getState) => {
    dispatch({
      type: FETCH_HISTORI_PENGIRIMAN,
      loadingState: true,
    });

    const data = {
      nik: user.nik,
    };

    const goodToGo = await isReachable();
    if (goodToGo === true) {
      try {
        const response = await fetch(
          "https://portal.bintang7.com/ekspedisionline/pengiriman/get-history-user",
          {
            method: "POST",
            // method: 'GET',
            headers: {
              Accept: "application/json",
              // 'Content-Type': 'multipart/form-data',
              "Content-Type": "application/json",
            },
            //buka ini kalo mau pake yg baru (pake filter)
            body: JSON.stringify(data),
          }
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const responseData = await response.json();

        // console.log(responseData);

        let historiPengiriman = [];

        responseData.map(function (item) {
          historiPengiriman.push(
            new Pengiriman(
              item.ID,
              item.ResiBarang,
              item.JenisBarang,
              item.NIKPengirim,
              item.NamaPengirim,
              item.LokasiPengirim,
              item.NIKAdminPenerima,
              item.NIKPenerima,
              item.NamaPenerima,
              item.LokasiPenerima,
              item.Keterangan,
              item.Status,
              item.DetailStatus,
              item.CreationDate,
              item.LastUpdatedOn
            )
          );
        });

        // historiPengiriman = historiPengiriman.filter(
        //   histori =>
        //     histori.nik_pengirim.trim() == user.nik ||
        //     histori.nik_penerima.trim() == user.nik,
        // );

        if (status == "Selesai") {
          historiPengiriman = historiPengiriman.filter(
            (histori) =>
              histori.status == "Selesai" || histori.status == "Dibatalkan"
          );
        } else {
          historiPengiriman = historiPengiriman.filter(
            (histori) =>
              histori.status != "Selesai" && histori.status != "Dibatalkan"
          );
        }

        // console.log('detail fren');

        dispatch({
          type: FETCH_HISTORI_PENGIRIMAN,
          historiPengiriman: historiPengiriman,
          loadingState: false,
        });
      } catch (err) {
        return;
        throw err;
      }
    } else {
      dispatch({
        type: FETCH_HISTORI_PENGIRIMAN,
        historiPengiriman: [],
        loadingState: false,
      });
      return goodToGo;
    }
  };
};

export const fetchDetailPengiriman = (filter, value, action, nikScanner) => {
  const data = {
    keterangan: filter,
    id: value,
    resibarang: value,
    status: action,
    nikpenerima: nikScanner,
  };
  // console.log(data);
  return async (dispatch, getState) => {
    dispatch({
      type: FETCH_DETAIL_PENGIRIMAN,
      fetchDetailLoadingState: true,
    });

    const goodToGo = await isReachable();
    if (goodToGo === true) {
      try {
        const response = await fetch(
          "https://portal.bintang7.com/ekspedisionline/pengiriman/get-detail",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const responseData = await response.json();

        // console.log('fren: ');
        // console.log(responseData);

        let detailPengiriman = responseData;

        if (
          responseData != NOT_FOUND &&
          responseData != NO_CHANGES &&
          responseData != COMPLETED_DELIVERY
        ) {
          detailPengiriman = new Pengiriman(
            responseData.ID,
            responseData.ResiBarang,
            responseData.JenisBarang,
            responseData.NIKPengirim,
            responseData.NamaPengirim,
            responseData.LokasiPengirim,
            responseData.NIKAdminPenerima,
            responseData.NIKPenerima,
            responseData.NamaPenerima,
            responseData.LokasiPenerima,
            responseData.Keterangan,
            responseData.Status,
            responseData.DetailStatus,
            responseData.CreationDate,
            responseData.LastUpdatedOn
          );
        }
        // console.log('detailPengiriman');
        // console.log(detailPengiriman);

        dispatch({
          type: FETCH_DETAIL_PENGIRIMAN,
          detailPengiriman: detailPengiriman,
          fetchDetailLoadingState: false,
        });
      } catch (err) {
        throw err;
      }
    } else {
      dispatch({
        type: FETCH_DETAIL_PENGIRIMAN,
        detailPengiriman: detailPengiriman,
        fetchDetailLoadingState: false,
      });
      return goodToGo;
    }
  };
};

const formatDate = (date) => {
  const formattedDate = moment(date).format("D MMM YY[\n] HH:mm");
  return formattedDate;
};

export const fetchTimelinePengiriman = (idPengiriman) => {
  const data = {
    id: idPengiriman,
  };
  console.log(JSON.stringify(data));
  return async (dispatch, getState) => {
    dispatch({
      type: FETCH_TIMELINE_PENGIRIMAN,
      fetchTimelineLoadingState: true,
    });

    let timelinePengiriman = [];
    const goodToGo = await isReachable();
    if (goodToGo === true) {
      try {
        const response = await fetch(
          "https://portal.bintang7.com/ekspedisionline/pengiriman/get-timeline",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const responseData = await response.json();

        // console.log('fren: ', JSON.stringify(data));
        // console.log('action timeline');
        // console.log(responseData);

        responseData.map(function (item) {
          timelinePengiriman.push(
            new HistoriStatus(
              item.ID,
              item.Status,
              item.DetailStatus,
              formatDate(item.UpdatedOn)
            )
          );
        });

        // console.log(timelinePengiriman);

        dispatch({
          type: FETCH_TIMELINE_PENGIRIMAN,
          timelinePengiriman: timelinePengiriman,
          fetchTimelineLoadingState: false,
        });
      } catch (err) {
        throw err;
      }
    } else {
      dispatch({
        type: FETCH_TIMELINE_PENGIRIMAN,
        timelinePengiriman: timelinePengiriman,
        fetchTimelineLoadingState: false,
      });
      return goodToGo;
    }
  };
};

export const updateStatusPengiriman = (data) => {
  return async (dispatch, getState) => {
    dispatch({
      type: UPDATE_STATUS_PENGIRIMAN,
      uploadingState: true,
    });
    // console.log(JSON.stringify(data));
    const goodToGo = await isReachable();
    if (goodToGo === true) {
      try {
        const response = await fetch(
          "https://portal.bintang7.com/ekspedisionline/pengiriman/update-status",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const responseData = await response.json();

        // console.log(responseData);

        dispatch({
          type: UPDATE_STATUS_PENGIRIMAN,
          loadingState: false,
        });

        if (responseData == SUCCESS) {
          NavigationService.navigate("EOHome");
          return Alert.alert(
            "Berhasil",
            "Status pengiriman berhasil terupdate"
          );
        } else if (responseData == COMPLETED_DELIVERY) {
          return Alert.alert(
            "Gagal",
            "Pengiriman berstatus selesai, barang sudah diterima"
          );
        } else if (responseData == NO_CHANGES) {
          return Alert.alert(
            "Gagal",
            "Anda tidak memiliki otorisasi untuk mengubah status pengiriman dengan resi ini"
          );
        } else if (responseData == USER_INPUT) {
          return Alert.alert(
            "Sudah Terinput",
            "Barang sudah terinput, serahkan ke petugas ekspedisi di lobby Anda"
          );
        } else {
          return;
        }
      } catch (err) {
        console.log(err.message);

        dispatch({
          type: UPDATE_STATUS_PENGIRIMAN,
          uploadingState: false,
        });
      }
    } else {
      dispatch({
        type: UPDATE_STATUS_PENGIRIMAN,
        uploadingState: false,
      });
      return goodToGo;
    }
  };
};
