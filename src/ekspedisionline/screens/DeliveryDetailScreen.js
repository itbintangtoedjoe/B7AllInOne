import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import Timeline from 'react-native-timeline-flatlist';

import * as actions from '../redux/actions';
import Colors from '../../general/constants/Colors';

const DeliveryDetailScreen = props => {
  const selectedDeliveryId = props.navigation.getParam('transactionID');
  const detailPengiriman = useSelector(
    state => state.eoEkspedisi.detailPengiriman,
  );
  const loadingState = useSelector(
    state => state.eoEkspedisi.fetchDetailLoadingState,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      actions.fetchDetailPengiriman('id', selectedDeliveryId),
      'see_detail',
      '',
    );
  }, [dispatch]);

  if (loadingState) {
    return (
      <View style={styles.content}>
        <ActivityIndicator size="large" color={Colors.ekspedisiThirdColor} />
      </View>
    );
  } else {
    // const AtributProduk = () => {
    //   let atribut = '-';
    //   if (
    //     detailPengiriman.jenis_pengujian == 'Triangle' ||
    //     detailPengiriman.jenis_pengujian == 'DFCT'
    //   ) {
    //     atribut = detailPengiriman.atribut_diuji;
    //     return (
    //       <>
    //         <Text style={styles.inputLabel}>Atribut yang Diujikan</Text>
    //         <Text style={styles.regularText}>{atribut}</Text>
    //       </>
    //     );
    //   }
    //   return <></>;
    // };

    // const KeadaanLampu = () => {
    //   let lampu = 'Mati';
    //   if (detailPengiriman.state_lampu == 'True') {
    //     lampu = 'Hidup';
    //   }
    //   return (
    //     <>
    //       <Text style={styles.regularText}>{lampu}</Text>
    //     </>
    //   );
    // };

    // const TanggalEksekusi = () => {
    //   let eksekusi = 'Belum ditentukan';
    //   let tanggal = detailPengiriman.tanggal_eksekusi;
    //   // console.log(tanggal);
    //   if (
    //     detailPengiriman.tanggal_eksekusi != undefined &&
    //     !detailPengiriman.tanggal_eksekusi.startsWith('1970')
    //   ) {
    //     eksekusi = formatDate(detailPengiriman.tanggal_eksekusi);
    //   }
    //   return (
    //     <>
    //       <Text style={styles.regularText}>{eksekusi}</Text>
    //     </>
    //   );
    // };

    const formatDate = date => {
      const formattedDate = moment(date).format('D MMM YYYY, HH:mm');
      return formattedDate;
    };
    // // id,
    // resi_barang,
    // jenis_barang,
    // nik_pengirim,
    // nama_pengirim,
    // nik_penerima,
    // nama_penerima,
    // keterangan,
    // status,
    // detail_status,
    // creation_date,

    const goToDetailHandler = () => {
      props.navigation.navigate({
        routeName: 'EODeliveryTimeline',
        params: {
          transactionID: detailPengiriman.id,
        },
      });
    };

    const data = [
      {time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
      {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
      {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
      {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
      {time: '16:30', title: 'Event 5', description: 'Event 5 Description'},
    ];

    return (
      <View>
        <View style={styles.form}>
          <View>
            <View
              style={{
                ...styles.section,
                backgroundColor: Colors.ekspedisiThirdColor,
              }}>
              <Text style={styles.inputLabel}>Resi Pengiriman</Text>
              <Text style={styles.inputLabel}>
                {detailPengiriman.resi_barang}
              </Text>
              <Text style={styles.inputLabel}>
                Status: {detailPengiriman.status}
              </Text>
              <Text style={styles.regularText}>
                {detailPengiriman.detail_status}
              </Text>
              <View style={styles.dividerFive}></View>
              <Text style={styles.link} onPress={goToDetailHandler}>
                Lihat detail
              </Text>
            </View>
            <View style={styles.dividerTen}></View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>KETERANGAN PENGIRIMAN</Text>
              <Text style={styles.inputLabel}>Jenis Barang</Text>
              <Text style={styles.regularText}>
                {detailPengiriman.jenis_barang}
              </Text>
              <Text style={styles.inputLabel}>Pengirim</Text>
              <Text style={styles.regularText}>
                {detailPengiriman.nama_pengirim}
              </Text>
              <Text style={styles.inputLabel}>Penerima</Text>
              <Text style={styles.regularText}>
                {detailPengiriman.nama_penerima}
              </Text>
              <Text style={styles.inputLabel}>Keterangan</Text>
              <Text style={styles.regularText}>
                {detailPengiriman.keterangan}
              </Text>
              {/* <Text style={styles.inputLabel}>Status</Text>
              <Text style={styles.regularText}>{detailPengiriman.status}</Text> */}
            </View>
            <View style={styles.dividerTen}></View>

            {/* <View style={styles.section}>
              <Text style={styles.sectionTitle}>INFORMASI PENGIRIMAN</Text>
              <Text style={styles.inputLabel}>Tanggal Pengiriman Dipesan</Text>
              <Text style={styles.regularText}>
                {formatDate(detailPengiriman.creation_date)}
              </Text>
              <Text style={styles.inputLabel}>Terakhir Diupdate</Text>
              <Text style={styles.regularText}>
                {formatDate(detailPengiriman.last_updated_on)}
              </Text>
            </View> */}
          </View>
        </View>
      </View>
    );
  }
};

DeliveryDetailScreen.navigationOptions = navigationData => {
  return {
    headerTitle: 'Detail Pengiriman',
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formElement: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  section: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.ekspedisiPrimaryColor,
  },
  sectionTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    textDecorationLine: 'underline',
  },
  regularText: {
    color: 'black',
    marginBottom: 10,
    fontSize: 16,
  },
  inputLabel: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
  },
  inputDescription: {
    color: 'black',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: Colors.accentColor,
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 8,
    padding: 0,
  },
  pickerText: {
    color: 'gray',
    fontSize: 14,
  },
  link: {
    color: Colors.ekspedisiPrimaryColor,
    textDecorationLine: 'underline',
    marginTop: -5,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    height: 40,
    width: '100%',
    borderRadius: 5,
    backgroundColor: Colors.thirdColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  dividerFive: {
    marginBottom: 5,
  },
  dividerTen: {
    marginBottom: 10,
  },
});

export default DeliveryDetailScreen;
