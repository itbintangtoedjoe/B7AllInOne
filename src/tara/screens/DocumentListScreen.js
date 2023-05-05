import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {useDispatch, useSelector} from 'react-redux';

import SectionTitle from '../../general/components/SectionTitle';
import CarouselCards from '../components/CarouselCards';
import Colors from '../../general/constants/Colors';
import * as actions from '../redux/actions';

const DocumentListScreen = props => {
  const idSubkategori = props.navigation.getParam('idSubkategori');
  const namaSubkategori = props.navigation.getParam('namaSubkategori');
  const activeUser = useSelector(state => state.auth.activeUser);
  const documents = useSelector(state => state.document.daftarDokumen);
  const loadingState = useSelector(state => state.document.loadingState);

  const dispatch = useDispatch();

  useEffect(() => {
    //console.log('id subkategori: ' + idSubkategori);
    dispatch(actions.fetchDocuments(idSubkategori, activeUser.nama_role));
  }, [dispatch]);

  useEffect(() => {
    //console.log(loadingState);
  }, [loadingState]);

  // console.log(documents);

  if (loadingState) {
    return (
      <View style={styles.content}>
        <ActivityIndicator size="large" color={Colors.taraPrimaryColor} />
      </View>
    );
  }

  if (documents.length === 0) {
    return (
      <View style={styles.content}>
        <Text>Tidak ada dokumen dalam sub-kategori ini</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.pageContent}>
      <View style={styles.titleContainer}>
        <SectionTitle text={namaSubkategori} color={Colors.taraPrimaryColor} />
      </View>
      <View style={styles.container}>
        <CarouselCards data={documents} navigation={props.navigation} />
      </View>
    </SafeAreaView>

    // <View>
    //   <FlatList
    //     keyExtractor={(item, index) => item.id}
    //     data={documents}
    //     renderItem={renderGridItem}
    //     numColumns={2}
    //   />
    // </View>
  );
};

DocumentListScreen.navigationOptions = navigationData => {
  return {
    headerTitle: navigationData.navigation.getParam('namaSubkategori'),
  };
};

const styles = StyleSheet.create({
  pageContent: {
    backgroundColor: '#fff',
  },
  titleContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
    paddingBottom: 50,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DocumentListScreen;
