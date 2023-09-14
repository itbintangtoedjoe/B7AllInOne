import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Alert,
  TextInput,
  useColorScheme,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import QRCodeScanner from "react-native-qrcode-scanner";
import { useDispatch, useSelector } from "react-redux";
import { Picker } from "@react-native-picker/picker";

import Colors from "../../general/constants/Colors";
import * as actions from "../redux/actions";
import { COMPLETED_DELIVERY, NOT_FOUND, NO_CHANGES } from "../redux/actions";

const ScanPackageScreen = (props) => {
  const action = props.navigation.getParam("action");
  const activeUser = useSelector((state) => state.auth.activeUser);
  const activeUserEO = useSelector((state) => state.auth.activeUserEO);
  const loadingState = useSelector(
    (state) => state.eoEkspedisi.fetchDetailLoadingState
  );
  const uploadingState = useSelector(
    (state) => state.eoEkspedisi.uploadingState
  );
  const detailPengiriman = useSelector(
    (state) => state.eoEkspedisi.detailPengiriman
  );
  const [keterangan, setKeterangan] = useState("");
  const [namaPenerima, setNamaPenerima] = useState("");
  const [input2, setInput2] = useState("");
  const [jenisPenerimaan, setJenisPenerimaan] = useState("Perantara");

  const [scan, setScan] = useState(true);
  const [scanResult, setScanResult] = useState(false);
  const [nomorResi, setNomorResi] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [loadingUpdateStatus, setLoadingUpdateStatus] = useState(false);
  const [penerimaContentState, setPenerimaContentState] = useState(false);

  const dispatch = useDispatch();

  const onSuccess = (e) => {
    setNomorResi(e.data);
    setScan(false);
    setScanResult(true);
    // console.log(e.data);
  };
  //   const onSuccess = e => {
  //     setNomorResi(e);
  //     setScan(false);
  //     setScanResult(true);
  //   };

  const activeQR = () => {
    setScan(true);
  };
  const scanAgain = () => {
    setScan(true);
    setScanResult(false);
    setDataLoaded(false);
    setJenisPenerimaan("");
    setKeterangan("");
    setNamaPenerima("");
    setPenerimaContentState(false);
  };

  const cariDataPengiriman = () => {
    setJenisPenerimaan("");
    setKeterangan("");
    dispatch(
      actions.fetchDetailPengiriman("resi", nomorResi, "scan", activeUser.nik)
    );
    setDataLoaded(true);
  };

  const updateStatusBarang = () => {
    // console.log('ok');
    let jenis_penerimaan = jenisPenerimaan;
    let ket = keterangan;
    if (jenisPenerimaan == "Perwakilan" && keterangan.length < 5) {
      Alert.alert("Gagal", "Alasan perwakilan minimal 5 karakter");
      return;
    } else if (
      action == "TerimaPetugas" &&
      activeUserEO.nama_role == "Driver"
    ) {
      if (namaPenerima.length < 3) {
        Alert.alert(
          "Gagal",
          "Mohon masukkan nama penerima yang benar (minimal 3 karakter)"
        );
        return;
      }
      jenis_penerimaan = "Perwakilan Driver";
      ket = namaPenerima.toUpperCase();
    } else {
      if (keterangan.trim() == "") {
        ket = "-";
      }
    }
    const data = {
      id: detailPengiriman.id,
      idupdater: activeUser.nik,
      status: jenis_penerimaan,
      keterangan: ket,
    };
    // console.log('ok2');

    setLoadingUpdateStatus(true);
    // console.log('ok3');
    dispatch(actions.updateStatusPengiriman(data));
    // console.log('ok4');
    // Alert.alert('Berhasil', 'Status barang berhasil terupdate');
    // props.navigation.navigate('EOHome');
    setLoadingUpdateStatus(false);
    // console.log('ok5');
  };

  const Scanner = () => {
    return (
      <QRCodeScanner
        onRead={onSuccess}
        topContent={<Text style={styles.title}>Scan QR Code Barang</Text>}
      />
    );
  };

  const TextButtonUpdateStatus = () => {
    if (action == "KirimPetugas") {
      return <Text style={styles.buttonTextStyle}>KIRIM BARANG</Text>;
    } else {
      return <Text style={styles.buttonTextStyle}>BARANG DITERIMA</Text>;
    }
  };

  const Penerima = () => {
    // if (action == 'KirimPetugas' || action == 'TerimaPetugas') {
    return (
      <View>
        <View style={styles.divider10}></View>
        <Text style={{ fontWeight: "bold" }}>PENERIMA</Text>
        <Text>
          <Text>Nama:</Text> {detailPengiriman.nama_penerima}
        </Text>
        <Text>
          <Text>Lokasi:</Text> {detailPengiriman.lokasi_penerima}
        </Text>
      </View>
    );
    // } else {
    //   return null;
    // }
  };

  const PerwakilanContent = () => {
    if (
      // activeUser.nik.substring(0, 2) != 'EO' &&
      // activeUser.nik != detailPengiriman.nik_penerima.trim() &&
      activeUser.nik != detailPengiriman.nik_penerima &&
      activeUser.nik == detailPengiriman.nik_admin_penerima.trim()
    ) {
      return (
        <View>
          <Text style={{ ...styles.inputLabel, fontWeight: "bold" }}>
            Penerimaan barang sebagai admin:
          </Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={jenisPenerimaan}
              mode="dropdown"
              onValueChange={(itemValue, itemIndex) =>
                setJenisPenerimaan(itemValue)
              }
            >
              <Picker.Item
                label="Perantara"
                value="Perantara"
                style={styles.pickerText}
              />
              <Picker.Item
                label="Perwakilan"
                value="Perwakilan"
                style={styles.pickerText}
              />
            </Picker>
          </View>
          {/* {jenisPenerimaan == 'Perwakilan' && (
            <TextInput
              value={keterangan}
              onChangeText={itemValue => setKeterangan(itemValue)}
              multiline={true}
              style={styles.inputMultiline}
            />
          )} */}
        </View>
      );
    } else {
      return null;
    }
  };

  // const PerwakilanDriver = () => {
  //   if (activeUserEO.nama_role == 'Driver' && action == 'TerimaPetugas') {
  //     return (
  //       <View style={styles.cardSecondary}>
  //         <Text style={{fontWeight: 'bold'}}>Masukkan nama penerima</Text>
  //         <Text style={{fontWeight: 'bold', color: 'red'}}>WAJIB DIISI</Text>
  //         <View style={styles.divider5}></View>
  //         <TextInput
  //           value={namaPenerima}
  //           onChangeText={itemValue => setNamaPenerima(itemValue)}
  //           style={styles.inputMultiline}
  //         />
  //       </View>
  //     );
  //   } else {
  //     return null;
  //   }
  // };

  const DeliveryContent = () => {
    // console.log(detailPengiriman);
    if (detailPengiriman == NOT_FOUND) {
      return (
        <View style={styles.cardSecondary}>
          <Text>Pengiriman dengan nomor resi tersebut tidak ditemukan</Text>
        </View>
      );
    } else if (detailPengiriman == COMPLETED_DELIVERY) {
      return (
        <View style={styles.cardSecondary}>
          <Text>
            Pengiriman aktif dengan nomor resi tersebut tidak ditemukan
          </Text>
        </View>
      );
    } else if (detailPengiriman == NO_CHANGES) {
      return (
        <View style={styles.cardSecondary}>
          <Text>
            Anda tidak memiliki otorisasi untuk mengubah status pengiriman
            dengan resi ini
          </Text>
        </View>
      );
      // } else if (
      //   detailPengiriman.lokasi_penerima.substring(0, 2) == 'B7' &&
      //   action == 'TerimaPetugas'
      // ) {
      //   return (
      //     <View style={styles.cardSecondary}>
      //       <Text>
      //         Anda tidak memiliki autorisasi untuk menerima barang dengan resi ini
      //       </Text>
      //     </View>
      //   );
    } else {
      useEffect(() => {
        setPenerimaContentState(true);
      }, []);
      return (
        <View>
          <View style={styles.cardSecondary}>
            <View style={scanResult ? styles.scanCardView : styles.cardView}>
              <Text style={{ fontWeight: "bold" }}>PENGIRIM</Text>
              <Text>
                <Text>Nama:</Text> {detailPengiriman.nama_pengirim}
              </Text>
              <Text>
                <Text>Lokasi:</Text> {detailPengiriman.lokasi_pengirim}
              </Text>
              <Penerima />
              <View style={styles.divider10}></View>
              <Text>
                <Text style={{ fontWeight: "bold" }}>JENIS BARANG:</Text>{" "}
                {detailPengiriman.jenis_barang}
              </Text>
              <View style={styles.divider5}></View>
              <Text>
                <Text style={{ fontWeight: "bold" }}>KETERANGAN:</Text>{" "}
                {detailPengiriman.keterangan}
              </Text>
              <View style={styles.divider5}></View>
              <Text>
                <Text style={{ fontWeight: "bold" }}>STATUS TERAKHIR:</Text>{" "}
                {detailPengiriman.detail_status}
              </Text>
              <View style={styles.divider10} />
              <PerwakilanContent />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            {uploadingState ? (
              <View style={{ marginTop: 25 }}>
                {/* <View style={styles.content}> */}
                <ActivityIndicator
                  size="small"
                  color={Colors.ekspedisiAccentColor}
                />
                {/* </View> */}
              </View>
            ) : (
              <TouchableOpacity
                onPress={updateStatusBarang}
                style={{
                  ...styles.buttonTouchable,
                  backgroundColor: Colors.ekspedisiAccentColor,
                }}
              >
                <TextButtonUpdateStatus />
              </TouchableOpacity>
            )}
          </View>
        </View>
      );
    }
  };

  return (
    <>
      {scan ? (
        <Scanner />
      ) : (
        <ScrollView>
          <View style={styles.content}>
            <View style={styles.cardSecondary}>
              <View style={scanResult ? styles.scanCardView : styles.cardView}>
                <Text style={{ fontWeight: "bold" }}>
                  Nomor Resi: {nomorResi}
                </Text>
              </View>
            </View>

            <View style={styles.optionButtonContainer}>
              <TouchableOpacity
                onPress={scanAgain}
                style={{
                  ...styles.optionButton,
                  backgroundColor: "#b8bfba",
                }}
              >
                <Text style={styles.buttonTextStyle}>SCAN ULANG</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={cariDataPengiriman}
                style={{
                  ...styles.optionButton,
                  backgroundColor: "#e6e225",
                }}
              >
                <Text style={styles.buttonTextStyle}>CARI DATA</Text>
              </TouchableOpacity>
            </View>
            {penerimaContentState &&
            activeUserEO.nama_role == "Driver" &&
            action == "TerimaPetugas" ? (
              <View style={styles.cardSecondary}>
                <Text style={{ fontWeight: "bold" }}>
                  Masukkan nama penerima
                </Text>
                <Text style={{ fontWeight: "bold", color: "red" }}>
                  WAJIB DIISI
                </Text>
                <View style={styles.divider5}></View>
                <TextInput
                  value={namaPenerima}
                  onChangeText={(itemValue) => setNamaPenerima(itemValue)}
                  style={styles.inputMultiline}
                />
              </View>
            ) : null}
            {jenisPenerimaan == "Perwakilan" ? (
              <View style={styles.cardSecondary}>
                <Text style={{ fontWeight: "bold" }}>
                  Masukkan alasan yang jelas
                </Text>
                <Text style={{ fontWeight: "bold", color: "red" }}>
                  WAJIB DIISI
                </Text>
                <View style={styles.divider5}></View>
                <TextInput
                  value={keterangan}
                  onChangeText={(itemValue) => setKeterangan(itemValue)}
                  multiline={true}
                  style={styles.inputMultiline}
                />
              </View>
            ) : null}

            {loadingState ? (
              <View style={{ marginTop: 25 }}>
                <View style={styles.content}>
                  <ActivityIndicator
                    size="small"
                    color={Colors.ekspedisiThirdColor}
                  />
                </View>
              </View>
            ) : !dataLoaded ? null : (
              <DeliveryContent />
            )}
          </View>
        </ScrollView>
      )}
    </>

    // <View>
    //   {!scan && !scanResult && (
    //     <View style={styles.cardView}>
    //       <Text style={styles.textTitle1}>
    //         Welcome To React-Native QR Code Tutorial !
    //       </Text>
    //       <Text numberOfLines={8} style={styles.descText}>
    //         {description}
    //       </Text>

    //       <TouchableOpacity onPress={activeQR} style={styles.buttonTouchable}>
    //         <Text style={styles.buttonTextStyle}>Click to Scan !</Text>
    //       </TouchableOpacity>
    //     </View>
    //   )}

    //   {scanResult && (
    //     <View>
    //       <Text style={styles.textTitle1}>Result !</Text>
    //       <View style={scanResult ? styles.scanCardView : styles.cardView}>
    //         <Text>Type : {nomorResi.type}</Text>
    //         <Text>Result : {nomorResi.data}</Text>
    //         <Text numberOfLines={1}>RawData: {nomorResi.rawData}</Text>
    //         <TouchableOpacity
    //           onPress={scanAgain}
    //           style={styles.buttonTouchable}>
    //           <Text style={styles.buttonTextStyle}>Click to Scan again!</Text>
    //         </TouchableOpacity>
    //       </View>
    //     </View>
    //   )}

    //   {scan && (
    //     <QRCodeScanner
    //       onRead={onSuccess}
    //       topContent={<Text style={styles.title}>Scan Barcode Barang</Text>}
    //       //   bottomContent={
    //       //     <TouchableOpacity
    //       //       style={styles.buttonTouchable}
    //       //       onPress={() => setScan(false)}>
    //       //       <Text style={styles.buttonTextStyle}>Stop Scan</Text>
    //       //     </TouchableOpacity>
    //       //   }
    //     />
    //   )}
    // </View>
  );

  //   return (
  //     <QRCodeScanner
  //       onRead={onSuccess}
  //       topContent={<Text style={styles.title}>Scan Barcode Barang</Text>}
  //       //   bottomContent={
  //       //     <TouchableOpacity
  //       //       style={styles.buttonTouchable}
  //       //       onPress={() => setScan(false)}>
  //       //       <Text style={styles.buttonTextStyle}>Stop Scan</Text>
  //       //     </TouchableOpacity>
  //       //   }
  //     />
  //   );
  //   const action = props.navigation.getParam('action');
  //   const [scan, setScan] = useState(false);
  //   const [scanResult, setScanResult] = useState(false);
  //   const [nomorResi, setNomorResi] = useState(null);

  //   const onSuccess = e => {
  //     setNomorResi(e);
  //     setScan(false);
  //     setScanResult(true);
  //   };

  //   const activeQR = () => {
  //     setScan(true);
  //   };
  //   const scanAgain = () => {
  //     setScan(true);
  //     setScanResult(false);
  //   };

  //   const desccription =
  //     'QR code (abbreviated from Quick Response Code) is the trademark for a type of matrix barcode (or two-dimensional barcode) first designed in 1994 for the automotive industry in Japan. A barcode is a machine-readable optical label that contains information about the item to which it is attached. In practice, QR codes often contain data for a locator, identifier, or tracker that points to a website or application. A QR code uses four standardized encoding modes (numeric, alphanumeric, byte/binary, and kanji) to store data efficiently; extensions may also be used.';
  //   return (
  //     <View style={styles.scrollViewStyle}>
  //       <View>
  //         {!scan && !scanResult && (
  //           <View style={styles.cardView}>
  //             <Text style={styles.textTitle1}>
  //               Welcome To React-Native QR Code Tutorial !
  //             </Text>
  //             <Text numberOfLines={8} style={styles.descText}>
  //               {desccription}
  //             </Text>

  //             <TouchableOpacity onPress={activeQR} style={styles.buttonTouchable}>
  //               <Text style={styles.buttonTextStyle}>Click to Scan !</Text>
  //             </TouchableOpacity>
  //           </View>
  //         )}

  //         {scanResult && (
  //           <View>
  //             <Text style={styles.textTitle1}>Result !</Text>
  //             <View style={scanResult ? styles.scanCardView : styles.cardView}>
  //               <Text>Type : {nomorResi.type}</Text>
  //               <Text>Result : {nomorResi.data}</Text>
  //               <Text numberOfLines={1}>RawData: {nomorResi.rawData}</Text>
  //               <TouchableOpacity
  //                 onPress={scanAgain}
  //                 style={styles.buttonTouchable}>
  //                 <Text style={styles.buttonTextStyle}>Click to Scan again!</Text>
  //               </TouchableOpacity>
  //             </View>
  //           </View>
  //         )}

  //         {scan && (
  //           <QRCodeScanner
  //             reactivate={true}
  //             showMarker={true}
  //             onRead={onSuccess}
  //             containerStyle={styles.cameraContainer}
  //             cameraStyle={styles.camera}
  //             topContent={
  //               <Text style={styles.textTitle}>
  //                 Go to{' '}
  //                 <Text style={styles.textTitle}>wikipedia.org/wiki/QR_code</Text>{' '}
  //                 on your computer and scan the QR code to test.
  //               </Text>
  //             }
  //             bottomContent={
  //               <View>
  //                 <TouchableOpacity
  //                   style={styles.buttonTouchable}
  //                   onPress={() => setScan(false)}>
  //                   <Text style={styles.buttonTextStyle}>Stop Scan</Text>
  //                 </TouchableOpacity>
  //               </View>
  //             }
  //           />
  //         )}
  //       </View>
  //     </View>
  //   );
};

const deviceWidth = Dimensions.get("screen").width;
const deviceHeight = Dimensions.get("screen").height;

const styles = StyleSheet.create({
  title: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: Colors.ekspedisiThirdColor,
    fontFamily: "Milliard-Book",
  },
  textBold: {
    fontWeight: "500",
    color: "#000",
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)",
  },
  buttonTouchable: {
    fontSize: 21,
    marginTop: 15,
    width: deviceWidth - 30,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    height: 44,
  },
  buttonTextStyle: {
    color: "white",
    fontWeight: "bold",
  },
  buttonContainer: {
    alignItems: "center",
  },
  optionButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  optionButton: {
    flex: 1 / 2,
    fontSize: 21,
    marginTop: 15,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    height: 44,
    marginHorizontal: 15,
  },
  cardPrimary: {
    margin: 15,
    marginBottom: 0,
    backgroundColor: Colors.ekspedisiThirdColor,
    padding: 10,
    borderRadius: 8,
  },
  cardSecondary: {
    marginTop: 15,
    marginHorizontal: 15,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: Colors.ekspedisiPrimaryColor,
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 8,
    padding: 0,
  },
  pickerText: {
    fontSize: 14,
  },
  inputMultiline: {
    borderColor: Colors.ekspedisiPrimaryColor,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 5,
    height: 75,
    alignItems: "flex-start",
    textAlignVertical: "top",
    paddingHorizontal: 12,
  },
  divider5: {
    marginBottom: 5,
  },
  divider10: {
    marginBottom: 10,
  },
  divider15: {
    marginBottom: 15,
  },
});
// const styles = StyleSheet.create({
//   scrollViewStyle: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: Colors.ekspedisiPrimaryColor,
//   },
//   textTitle: {
//     fontWeight: 'bold',
//     fontSize: 18,
//     textAlign: 'center',
//     padding: 16,
//     color: 'white',
//   },
//   textTitle1: {
//     fontWeight: 'bold',
//     fontSize: 18,
//     textAlign: 'center',
//     padding: 16,
//     color: 'black',
//   },
//   cardView: {
//     width: deviceWidth - 32,
//     height: deviceHeight / 2,
//     alignSelf: 'center',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderRadius: 2,
//     borderColor: '#ddd',
//     borderBottomWidth: 0,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.8,
//     shadowRadius: 2,
//     elevation: 4,
//     marginLeft: 5,
//     marginRight: 5,
//     marginTop: 10,
//     backgroundColor: 'white',
//   },
//   scanCardView: {
//     width: deviceWidth - 32,
//     height: deviceHeight / 2,
//     alignSelf: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderRadius: 2,
//     borderColor: '#ddd',
//     borderBottomWidth: 0,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.8,
//     shadowRadius: 2,
//     elevation: 4,
//     marginLeft: 5,
//     marginRight: 5,
//     marginTop: 10,
//     backgroundColor: 'white',
//   },
//   buttonScan: {
//     width: 42,
//   },
//   descText: {
//     padding: 16,
//     textAlign: 'justify',
//     fontSize: 16,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   centerText: {
//     flex: 1,
//     fontSize: 18,
//     padding: 32,
//     color: '#777',
//   },
//   textBold: {
//     fontWeight: '500',
//     color: '#000',
//   },
//   buttonTouchable: {
//     fontSize: 21,
//     backgroundColor: Colors.ekspedisiAccentColor,
//     marginTop: 32,
//     width: deviceWidth - 70,
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 44,
//   },
//   buttonTextStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   cameraContainer: {
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//   },
//   camera: {
//     height: 200,
//   },
// });

export default ScanPackageScreen;
