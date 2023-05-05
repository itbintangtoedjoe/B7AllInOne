import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Colors from '../../general/constants/Colors';
import Hexagon from '../../general/components/Hexagon';
// import Hexagon from '../components/Hexagon';
import PentagonButton from '../components/PentagonButton';
import ImageTile from '../components/ImageTile';

const HomeScreen = props => {
  const activeUserEO = useSelector(state => state.auth.activeUserEO);
  // useEffect(() => {
  //   console.log(activeUserEO);
  // }, []);

  const menuUser = [
    {
      id: '1',
      color: 'white',
      icon: require('../assets/icons/diproses.png'),
      routeName: 'EOOngoing',
    },
    {
      id: '2',
      color: 'white',
      icon: require('../assets/icons/selesai.png'),
      routeName: 'EOHistory',
    },
  ];

  const menuDriver = [
    {
      id: '3',
      color: 'white',
      icon: require('../assets/icons/kirim.png'),
      action: 'KirimPetugas',
    },
    {
      id: '4',
      color: 'white',
      icon: require('../assets/icons/terima.png'),
      action: 'TerimaPetugas',
    },
  ];

  const menuPetugas = [
    {
      id: '4',
      color: 'white',
      icon: require('../assets/icons/terima.png'),
      action: 'TerimaPetugas',
    },
  ];

  const renderGridMenuUser = itemData => {
    return (
      <ImageTile
        id={itemData.item.id}
        color={itemData.item.color}
        tipe="kategori"
        size="normal"
        perRow={2}
        icon={itemData.item.icon}
        onSelect={() => {
          props.navigation.navigate(itemData.item.routeName);
        }}
      />
    );
  };

  const renderGridMenuPetugas = itemData => {
    return (
      <ImageTile
        id={itemData.item.id}
        color={itemData.item.color}
        tipe="kategori"
        size="normal"
        perRow={2}
        icon={itemData.item.icon}
        onSelect={() => {
          props.navigation.navigate('EOScanPackage', {
            action: itemData.item.action,
          });
        }}
      />
    );
  };

  return (
    <View style={styles.pageContent}>
      {activeUserEO.nama_role == 'Karyawan B7' ||
      activeUserEO.nama_role == 'Admin' ? (
        <Text style={styles.title}>Cek status ekspedisi barang Anda</Text>
      ) : (
        <Text style={styles.title}>Update status pengiriman barang</Text>
      )}

      <View style={styles.menu}>
        {activeUserEO.nama_role == 'Karyawan B7' ||
        activeUserEO.nama_role == 'Admin' ? (
          <View>
            <ImageTile
              // namaKategori="ya"
              id={0}
              color="white"
              tipe="kategori"
              size="small"
              perRow={1}
              icon={require('../assets/icons/scan.png')}
              onSelect={() => {
                props.navigation.navigate('EOScanPackage', {
                  action: 'TerimaKaryawan',
                });
              }}
            />
            <FlatList
              keyExtractor={(item, index) => item.id}
              data={menuUser}
              renderItem={renderGridMenuUser}
              numColumns={2}
            />
            <View style={styles.dividerTen}></View>
            <Text style={styles.sectionTitle}>Nama Admin Dept. Anda:</Text>
            <Text style={styles.sectionTitle}>{activeUserEO.nama_admin}</Text>
          </View>
        ) : (
          <View>
            <Text style={styles.sectionTitle}>Petugas Ekspedisi</Text>
            <View style={styles.dividerTen}></View>
            <FlatList
              keyExtractor={(item, index) => item.id}
              data={
                activeUserEO.nama_role == 'Driver' ? menuDriver : menuPetugas
              }
              columnWrapperStyle={{justifyContent: 'space-around'}}
              renderItem={renderGridMenuPetugas}
              numColumns={2}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContent: {
    margin: 20,
  },
  title: {
    marginTop: 50,
    color: Colors.ekspedisiThirdColor,
    fontSize: 30,
    fontFamily: 'Milliard-Book',
    lineHeight: 40,
  },
  menu: {
    marginTop: 40,
  },
  sectionTitle: {
    marginTop: 5,
    color: Colors.ekspedisiThirdColor,
    fontSize: 21,
    fontFamily: 'Milliard-Book',
  },
  dividerTen: {
    marginTop: 10,
  },
});

export default HomeScreen;
