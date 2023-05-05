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
import { useSelector, useDispatch } from "react-redux";

import * as actions from "../redux/actions";
import CategoryTile from "../components/CategoryTile";
import Colors from "../../general/constants/Colors";
import SectionTitle from "../../general/components/SectionTitle";

const CategoryListScreen = (props) => {
  const categories = useSelector((state) => state.category.daftarKategori);
  const loadingState = useSelector((state) => state.category.loadingState);
  const [refreshing, setRefreshing] = useState(false);
  const iconUrl = {
    uri: "https://portal.bintang7.com/tara/template/icons/category.png",
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchCategories());
  }, [dispatch]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    dispatch(actions.fetchCategories());
    setRefreshing(false);
  }, [refreshing]);

  // console.log('categories in screen');
  // console.log(useSelector(state => state.category));

  const renderGridItem = (itemData) => {
    //"#B4B1F3"
    return (
      <CategoryTile
        namaKategori={itemData.item.nama_kategori}
        id={itemData.item.id}
        color={Colors.taraAccentColor}
        tipe="kategori"
        icon={iconUrl}
        onSelect={() => {
          props.navigation.navigate({
            routeName: "TARASubcategoryList",
            params: {
              idKategori: itemData.item.id,
              namaKategori: itemData.item.nama_kategori,
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

  return (
    <View>
      <View style={styles.titleContainer}>
        <SectionTitle text="Daftar Kategori" color={Colors.taraPrimaryColor} />
      </View>
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={categories}
        renderItem={renderGridItem}
        numColumns={2}
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

CategoryListScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: "Daftar Kategori",
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

export default CategoryListScreen;
