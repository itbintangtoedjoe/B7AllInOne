import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import CategoryTile from "../components/CategoryTile";
import SectionTitle from "../../general/components/SectionTitle";
import Colors from "../../general/constants/Colors";
import * as actions from "../redux/actions";

const SubcategoryListScreen = (props) => {
  const idKategori = props.navigation.getParam("idKategori");
  const namaKategori = props.navigation.getParam("namaKategori");
  const subcategories = useSelector(
    (state) => state.category.daftarSubkategori
  );
  const loadingState = useSelector((state) => state.category.loadingState);
  const [refreshing, setRefreshing] = useState(false);
  const iconUrl = {
    uri: "https://portal.bintang7.com/tara/template/icons/documents.png",
  };

  const dispatch = useDispatch();

  const onRefresh = useCallback(async () => {
    dispatch(actions.fetchSubcategories(idKategori));
  }, [refreshing]);

  useEffect(() => {
    dispatch(actions.fetchSubcategories(idKategori));
  }, [dispatch]);

  const renderGridItem = (itemData) => {
    //"#B4B1F3"
    return (
      <CategoryTile
        namaKategori={itemData.item.nama_subkategori}
        id={itemData.item.id}
        color={Colors.taraAccentColor}
        tipe="subkategori"
        icon={iconUrl}
        onSelect={() => {
          props.navigation.navigate({
            routeName: "TARADocumentList",
            params: {
              idSubkategori: itemData.item.id,
              namaSubkategori: itemData.item.nama_subkategori,
            },
          });
        }}
      />
    );
  };

  if (loadingState) {
    return (
      <View style={styles.content}>
        <ActivityIndicator size="large" color={Colors.taraPrimaryColor} />
      </View>
    );
  }

  if (subcategories.length === 0) {
    return (
      <View style={styles.content}>
        <Text>Tidak ada sub-kategori dalam kategori ini</Text>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.titleContainer}>
        <SectionTitle text={namaKategori} color={Colors.taraPrimaryColor} />
      </View>
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={subcategories}
        renderItem={renderGridItem}
        numColumns={1}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            title="Pull to refresh"
            colors={[Colors.taraPrimaryColor]}
          />
        }
      />
    </View>
  );
};

SubcategoryListScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: navigationData.navigation.getParam("namaKategori"),
  };
};

const styles = StyleSheet.create({
  titleContainer: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  centered: {
    textAlign: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SubcategoryListScreen;
