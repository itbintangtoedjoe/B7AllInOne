import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Card from '../components/Card';
import TaskItem from '../components/TaskItem';
import Colors from '../../general/constants/Colors';
import * as actions from '../redux/actions/camAction';

const CAMDetailScreen = props => {
  const transactionID = props.navigation.getParam('transactionID');
  const appID = props.navigation.getParam('appID');
  const activeUser = useSelector(state => state.auth.activeUser);
  const detailTransaksi = useSelector(state => state.cam.detailTransaksi);
  const loadingState = useSelector(state => state.cam.fetchDetailLoadingState);

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log('masok dispatch');
    const data = {appID, transactionID, username: activeUser.user_ad};
    // console.log(data);
    dispatch(actions.fetchTransactionDetail(data));
  }, [dispatch]);

  // useEffect(() => {
  //   console.log('use effect');
  //   console.log(detailTransaksi);
  // }, [detailTransaksi]);

  if (loadingState) {
    return (
      <View style={styles.content}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }
  // else {
  //   console.log('else loading state');
  //   console.log(detailTransaksi);
  //   return (
  //     <View>
  //       <Text>Halosfhfdhjkdbvdjk</Text>
  //       <Text>
  //         {detailTransaksi.Requestor}
  //         {/* {detailTransaksi !== undefined && detailTransaksi !== null
  //           ? detailTransaksi[0].Requestor
  //           : ''} */}
  //       </Text>
  //     </View>
  //   );
  // }

  return (
    // <TaskItem
    //   transactionID={detailTransaksi.TransactionID}
    //   date={detailTransaksi.TransactionDate}
    //   appName={detailTransaksi.AppName}
    //   url={detailTransaksi.Url}
    //   requestor={detailTransaksi.Requestor}
    //   remarks={detailTransaksi.Remarks}
    //   onPress={() => console.log(detailTransaksi.Url)}
    //   buttons="open"
    //   // onPress={() => openEmbeddedBrowser(detailTransaksi)}
    // />
    <View>
      <TaskItem
        transactionID={detailTransaksi.TransactionID}
        date={detailTransaksi.TransactionDate}
        appName={detailTransaksi.AppName}
        url={detailTransaksi.Url}
        requestor={detailTransaksi.Requestor}
        remarks={detailTransaksi.Remarks}
        onPress={() => console.log(detailTransaksi.Url)}
        multipleData={false}
        // onPress={() => openEmbeddedBrowser(detailTransaksi)}
      />
    </View>
    // {detailTransaksi&&<TaskItem
    //   transactionID={detailTransaksi.TransactionID}
    //   date={detailTransaksi.TransactionDate}
    //   appName={detailTransaksi.AppName}
    //   url={detailTransaksi.Url}
    //   requestor={detailTransaksi.Requestor}
    //   remarks={detailTransaksi.Remarks}
    //   onPress={() => console.log(detailTransaksi.Url)}
    //   buttons="open"
    //   // onPress={() => openEmbeddedBrowser(detailTransaksi)}
    // />}
  );

  // return (
  //   // <Card style={styles.card}>
  //   //   <View>
  //   //     <Text>CAMDetailScreen</Text>
  //   //   </View>
  //   // </Card>
  //   <View style={styles.form}>
  //     {/* <View>
  //       <View
  //         style={{
  //           ...styles.section,
  //           backgroundColor: Colors.camPrimaryColor,
  //         }}>
  //         <Text style={styles.inputLabel}>Resi Pengiriman</Text>
  //         <Text style={styles.inputLabel}>{detailTransaksi.resi_barang}</Text>
  //         <Text style={styles.inputLabel}>
  //           Status: {detailTransaksi.status}
  //         </Text>
  //         <Text style={styles.regularText}>
  //           {detailTransaksi.detail_status}
  //         </Text>
  //         <View style={styles.dividerFive}></View>
  //         <Text style={styles.link} onPress={goToDetailHandler}>
  //           Lihat detail
  //         </Text>
  //       </View>
  //       <View style={styles.dividerTen}></View>
  //       <View style={styles.section}>
  //         <Text style={styles.sectionTitle}>KETERANGAN PENGIRIMAN</Text>
  //         <Text style={styles.inputLabel}>Jenis Barang</Text>
  //         <Text style={styles.regularText}>
  //           {detailTransaksi.TransactionID}
  //         </Text>
  //         <Text style={styles.inputLabel}>Pengirim</Text>
  //         <Text style={styles.regularText}>{detailTransaksi.Requestor}</Text>
  //         <Text style={styles.inputLabel}>Penerima</Text>
  //         <Text style={styles.regularText}>
  //           {detailTransaksi.nama_penerima}
  //         </Text>
  //         <Text style={styles.inputLabel}>Keterangan</Text>
  //         <Text style={styles.regularText}>{detailTransaksi.Remarks}</Text>
  //         <Text style={styles.inputLabel}>Status</Text>
  //         <Text style={styles.regularText}>{detailTransaksi.status}</Text>
  //       </View>
  //       <View style={styles.dividerTen}></View>

  //       <View style={styles.section}>
  //         <Text style={styles.sectionTitle}>INFORMASI PENGIRIMAN</Text>
  //         <Text style={styles.inputLabel}>Tanggal Pengiriman Dipesan</Text>
  //         <Text style={styles.regularText}>
  //           {formatDate(detailTransaksi.creation_date)}
  //         </Text>
  //         <Text style={styles.inputLabel}>Terakhir Diupdate</Text>
  //         <Text style={styles.regularText}>
  //           {formatDate(detailTransaksi.last_updated_on)}
  //         </Text>
  //       </View>
  //     </View> */}

  // <TaskItem
  //   transactionID={detailTransaksi.TransactionID}
  //   date={detailTransaksi.TransactionDate}
  //   appName={detailTransaksi.AppName}
  //   url={detailTransaksi.Url}
  //   requestor={detailTransaksi.Requestor}
  //   remarks={detailTransaksi.Remarks}
  //   onPress={() => console.log(detailTransaksi.Url)}
  //   buttons="open"
  //   // onPress={() => openEmbeddedBrowser(detailTransaksi)}
  // />;
  //     <Text>Masok</Text>
  //   </View>
  // );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    margin: 10,
    padding: 10,
  },
});

export default CAMDetailScreen;
