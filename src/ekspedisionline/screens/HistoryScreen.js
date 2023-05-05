import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  FlatList,
} from 'react-native';
import {DataTable} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

import Colors from '../../general/constants/Colors';
import CardList from '../components/CardList';
import * as actions from '../redux/actions';

const HistoryScreen = props => {
  const activeUser = useSelector(state => state.auth.activeUser);
  const historiPengiriman = useSelector(
    state => state.eoEkspedisi.historiPengiriman,
  );
  const loadingState = useSelector(state => state.eoEkspedisi.loadingState);
  const refreshing = false;

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log('activeUser: ', activeUser);
    dispatch(actions.fetchHistoriPengiriman('Selesai', activeUser));
  }, [dispatch]);

  const onRefresh = useCallback(async () => {
    dispatch(actions.fetchHistoriPengiriman('Selesai', activeUser));
  }, [refreshing]);

  if (loadingState) {
    return (
      <View style={styles.content}>
        <ActivityIndicator size="large" color={Colors.ekspedisiThirdColor} />
      </View>
    );
  }

  if (historiPengiriman.length === 0) {
    return (
      <View style={styles.content}>
        <Text style={styles.regularText}>
          Belum ada pengiriman dengan status selesai
        </Text>
      </View>
    );
  }

  return (
    <View>
      {/* refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          title="Pull to refresh"
          colors={[Colors.ekspedisiPrimaryColor]}
        />
      }> */}
      <View style={styles.form}>
        <View>
          <Text style={styles.sectionTitle}>LIST PENGIRIMAN SELESAI</Text>
        </View>
        <View>
          {/* <DataTable>
            <DataTable.Header>
              <DataTable.Title>Nomor Resi</DataTable.Title>
              <DataTable.Title numeric style={{flex: 1 / 2}}>
                Status
              </DataTable.Title>
            </DataTable.Header>
            {historiPengiriman.map(pengiriman => (
              <DataTable.Row key={pengiriman.id}>
                <DataTable.Cell key={`resi${pengiriman.id}`}>
                  <Text
                    style={styles.rowText}
                    onPress={() => {
                      props.navigation.navigate({
                        routeName: 'EODeliveryDetail',
                        params: {
                          transactionID: pengiriman.id,
                        },
                      });
                    }}>
                    {pengiriman.resi_barang}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell
                  numeric
                  key={`status${pengiriman.id}`}
                  style={{flex: 1 / 2}}>
                  {pengiriman.status}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable> */}
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                title="Pull to refresh"
                colors={[Colors.ekspedisiPrimaryColor]}
              />
            }
            data={historiPengiriman}
            keyExtractor={item => item.id.toString()}
            renderItem={itemData => (
              <CardList
                id={itemData.item.id}
                resiBarang={itemData.item.resi_barang}
                status={itemData.item.status}
                pengirim={itemData.item.nama_pengirim}
                penerima={itemData.item.nama_penerima}
                creationDate={itemData.item.creation_date}
                onClick={() => {
                  props.navigation.navigate({
                    routeName: 'EODeliveryDetail',
                    params: {
                      transactionID: itemData.item.id,
                    },
                  });
                }}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 10,
    height: '94%',
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
  sectionTitle: {
    color: Colors.ekspedisiThirdColor,
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    // textDecorationLine: 'underline',
  },
  regularText: {
    color: Colors.ekspedisiThirdColor,
    fontWeight: 'bold',
  },
  inputLabel: {
    fontWeight: 'bold',
    color: Colors.ekspedisiPrimaryColor,
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
  rowText: {
    textDecorationLine: 'underline',
    color: Colors.ekspedisiPrimaryColor,
    fontWeight: 'bold',
  },
  divider: {
    marginBottom: 10,
  },
});

export default HistoryScreen;
