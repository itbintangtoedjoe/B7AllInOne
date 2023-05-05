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

const DeliveryTimelineScreen = props => {
  const selectedDeliveryId = props.navigation.getParam('transactionID');
  const detailPengiriman = useSelector(
    state => state.eoEkspedisi.detailPengiriman,
  );
  const timelinePengiriman = useSelector(
    state => state.eoEkspedisi.timelinePengiriman,
  );
  const fetchDetailLoadingState = useSelector(
    state => state.eoEkspedisi.fetchDetailLoadingState,
  );
  const fetchTimelineLoadingState = useSelector(
    state => state.eoEkspedisi.fetchTimelineLoadingState,
  );
  let timelineData = [];

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log('selectedDeliveryId: ', selectedDeliveryId);
    dispatch(
      actions.fetchDetailPengiriman('id', selectedDeliveryId),
      'see_detail',
      '',
    );
    dispatch(actions.fetchTimelinePengiriman(selectedDeliveryId));
  }, [dispatch]);

  if (fetchDetailLoadingState || fetchTimelineLoadingState) {
    return (
      <View style={styles.content}>
        <ActivityIndicator size="large" color={Colors.ekspedisiThirdColor} />
      </View>
    );
  } else {
    // const AtributProduk = () => {
    //   let atribut = '-';
    //   if (
    //     timelinePengiriman.jenis_pengujian == 'Triangle' ||
    //     timelinePengiriman.jenis_pengujian == 'DFCT'
    //   ) {
    //     atribut = timelinePengiriman.atribut_diuji;
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
    //   if (timelinePengiriman.state_lampu == 'True') {
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
    //   let tanggal = timelinePengiriman.tanggal_eksekusi;
    //   // console.log(tanggal);
    //   if (
    //     timelinePengiriman.tanggal_eksekusi != undefined &&
    //     !timelinePengiriman.tanggal_eksekusi.startsWith('1970')
    //   ) {
    //     eksekusi = formatDate(timelinePengiriman.tanggal_eksekusi);
    //   }
    //   return (
    //     <>
    //       <Text style={styles.regularText}>{eksekusi}</Text>
    //     </>
    //   );
    // };

    const formatDate = date => {
      const formattedDate = moment(date).format('D MMM YYYY \n HH:mm');
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

    const data = [
      {time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
      {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
      {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
      {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
      {time: '16:30', title: 'Event 5', description: 'Event 5 Description'},
    ];

    return (
      <View style={{flex: 1, margin: 15}}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>INFORMASI PENGIRIMAN</Text>
          <Text style={styles.inputLabel}>Nomor Resi</Text>
          <Text style={styles.inputLabel}>{detailPengiriman.resi_barang}</Text>
        </View>
        <View style={styles.divider}></View>
        {/* {console.log('timelinePengiriman')}
        {console.log(timelinePengiriman)} */}
        <Timeline
          //..other props
          // data={[
          //   {
          //     time: '5 Jul 2021 \n 16:30 ',
          //     title: 'Selesai',
          //     description: 'Barang telah diterima [MUHATIM]',
          //   },
          //   {
          //     time: '5 Jul 2021 \n 14:00 ',
          //     title: 'Diterima Lobby B7 PLG',
          //     description: 'Barang telah diterima [BAMBANG] di Lobby B7 PLG',
          //   },
          //   {
          //     time: '5 Jul 2021 \n 12:00 ',
          //     title: 'Dikirim',
          //     description: 'Barang sedang dalam perjalanan',
          //   },
          //   {
          //     time: '5 Jul 2021 \n 10:45 ',
          //     title: 'Diterima Lobby B7 PLM',
          //     description: 'Barang telah diterima [BAMBANG] di Lobby B7 PLM',
          //   },
          //   {
          //     time: '5 Jul 2021 \n 09:00 ',
          //     title: 'Diinput',
          //     description: 'Data diinput User [DENNY]',
          //   },
          // ]}
          data={timelinePengiriman}
          circleSize={20}
          circleColor="white"
          lineColor={Colors.ekspedisiThirdColor}
          timeContainerStyle={{
            flexWrap: 'wrap',
            width: 50,
            height: 50,
            marginRight: 30,
          }}
          timeStyle={{
            textAlign: 'right',
            backgroundColor: Colors.ekspedisiThirdColor,
            color: Colors.ekspedisiPrimaryColor,
            padding: 5,
            borderRadius: 13,
          }}
          descriptionStyle={{color: Colors.ekspedisiThirdColor}}
          titleStyle={{color: 'white', marginTop: -3}}
          options={{
            style: {paddingTop: 10},
          }}
          listViewStyle={{margin: 10}}
          eventDetailStyle={{marginTop: -8}}
          //   showTime={false}
        />
      </View>
      // <View style={styles.section}>
      //     <View style={styles.form}>
      //       <View>
      //         <View style={styles.section}>
      //           <Text style={styles.inputLabel}>Resi Pengiriman</Text>
      //           <Text style={styles.inputLabel}>
      //             {timelinePengiriman.resi_barang}
      //           </Text>
      //           <Text style={styles.inputLabel}>
      //             Status: {timelinePengiriman.status}
      //           </Text>
      //         </View>
      //         <View style={styles.divider}></View>
      //         <View style={styles.section}>
      //           <Text style={styles.sectionTitle}>KETERANGAN PENGIRIMAN</Text>
      //           <Text style={styles.inputLabel}>Jenis Barang</Text>
      //           <Text style={styles.regularText}>
      //             {timelinePengiriman.jenis_barang}
      //           </Text>
      //           <Text style={styles.inputLabel}>Pengirim</Text>
      //           <Text style={styles.regularText}>
      //             {timelinePengiriman.nama_pengirim}
      //           </Text>
      //           <Text style={styles.inputLabel}>Penerima</Text>
      //           <Text style={styles.regularText}>
      //             {timelinePengiriman.nama_penerima}
      //           </Text>
      //           <Text style={styles.inputLabel}>Keterangan</Text>
      //           <Text style={styles.regularText}>
      //             {timelinePengiriman.keterangan}
      //           </Text>
      //           <Text style={styles.inputLabel}>Detail Status</Text>
      //           <Text style={styles.regularText}>
      //             {timelinePengiriman.detail_status}
      //           </Text>
      //         </View>
      //         <View style={styles.divider}></View>

      //         <View style={styles.section}>
      //           <Text style={styles.sectionTitle}>INFORMASI PENGIRIMAN</Text>
      //           <Text style={styles.inputLabel}>Tanggal Pengiriman Dipesan</Text>
      //           <Text style={styles.regularText}>
      //             {formatDate(timelinePengiriman.creation_date)}
      //           </Text>
      //           <Text style={styles.inputLabel}>Terakhir Diupdate</Text>
      //           <Text style={styles.regularText}>
      //             {formatDate(timelinePengiriman.last_updated_on)}
      //           </Text>
      //         </View>
      //       </View>
      //     </View>
      //   </View>
    );
  }
};

DeliveryTimelineScreen.navigationOptions = navigationData => {
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
    color: Colors.ekspedisiPrimaryColor,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    textDecorationLine: 'underline',
  },
  regularText: {
    color: Colors.ekspedisiPrimaryColor,
    marginBottom: 10,
    fontSize: 16,
  },
  inputLabel: {
    fontWeight: 'bold',
    color: Colors.ekspedisiPrimaryColor,
    fontSize: 14,
  },
  inputDescription: {
    color: Colors.ekspedisiPrimaryColor,
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
  divider: {
    marginBottom: 10,
  },
});

export default DeliveryTimelineScreen;
