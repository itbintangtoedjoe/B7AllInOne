import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  FlatList,
  Platform,
  View,
  StyleSheet,
  Text,
  Button,
  ActivityIndicator,
  RefreshControl,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Block, Text as GalioText, theme} from 'galio-framework';
import Toast from 'react-native-fast-toast';
import {useToast} from 'react-native-toast-notifications';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import NumberFormat from 'react-number-format';

import ProductItem from '../components/ProductItem';
import HeaderButton from '../components/HeaderButton';
import MilliardText from '../../general/components/MilliardText';
import Card from '../components/Card';
import Colors from '../../general/constants/Colors';
import * as poinBisaActions from '../redux/actions';

const PoinBisaCatalogueScreen = props => {
  const activeUser = useSelector(state => state.auth.activeUser);
  const loadingState = useSelector(state => state.poinBisa.loadingState);
  const [isLoading, setIsLoading] = useState(false);
  // const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(false);

  const allItems = useSelector(state => state.poinBisa.allItems);
  const dispatch = useDispatch();
  // const toast = useRef(null);

  const toast = useToast();
  const refreshing = false;

  // const loadItems = useCallback(async () => {
  //   //set lek urut gini dirender barengan, jadi ga render cycle ulang
  //   setError(null);
  //   setIsRefreshing(true);
  //   try {
  //     dispatch(poinBisaActions.fetchRedeemableItems());
  //   } catch (err) {
  //     setError(err.message);
  //   }
  //   setIsRefreshing(false);
  // }, [dispatch, setIsLoading, setError]);

  // useEffect(() => {
  //   const unsubscribe = props.navigation.addListener('focus', loadItems);
  //   //kalo mau return harus function
  //   return () => {
  //     unsubscribe();
  //   };
  // }, [loadItems]);

  // useEffect(() => {
  //   console.log('use effect');
  //   setIsLoading(true);
  //   loadItems().then(() => {
  //     console.log('selesai load items');
  //     setIsLoading(false);
  //   });
  //   console.log('screen');
  //   console.log(allItems);
  // }, [dispatch, loadItems]);

  useEffect(() => {
    // console.log('activeUser: ', activeUser);
    // setIsLoading(true);
    // loadItems().then(() => {
    //   //     console.log('selesai load items');
    //   console.log(allItems);
    //   setIsLoading(false);
    // });

    // setIsLoading(false);
    dispatch(poinBisaActions.fetchRedeemableItems());
    // setIsLoading(false);
  }, [dispatch]);

  const onRefresh = useCallback(async () => {
    dispatch(poinBisaActions.fetchRedeemableItems());
  }, [refreshing]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
    });
  };

  // if (error) {
  //   return (
  //     <View style={styles.centered}>
  //       <Text style={styles.information}>An error occurred! </Text>
  //       <Button
  //         title="Try again"
  //         // onPress={loadItems}
  //         onPress={() => alert('error')}
  //         color={Colors.primaryColor}
  //       />
  //     </View>
  //   );
  // }

  const addToCart = item => {
    dispatch(poinBisaActions.addToCart(activeUser.nik, item));
    toast.show('Berhasil ditambahkan ke keranjang', {
      type: 'success',
      position: 'top',
      duration: 1000,
      offset: 30,
      animationType: 'zoom-in',
    });
  };

  if (loadingState) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  if (
    allItems.length === 0
    // allItems == undefined
  ) {
    return (
      <View style={styles.centered}>
        <Text>Belum ada item yang dapat diredeem</Text>
      </View>
    );
  }

  return (
    // <Text>Halo bro</Text>
    // <View>
    //   {allItems.map(item => {
    //     <Text>haii</Text>;
    //   })}
    // </View>
    <View>
      {/* <Block flex style={styles.options}>
        <Block row space="between" style={styles.poinBisaContainer}>
          <Block middle>
            <GalioText
              size={12}
              style={{color: 'black', fontFamily: 'Milliard-Book'}}>
              POIN BISA:&nbsp;
              {activeUser !== undefined && activeUser !== null
                ? activeUser.poin_bisa
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : '-'}
            </GalioText>
          </Block>
        </Block>
      </Block> */}
      <View style={styles.options}>
        <MilliardText>
          TOTAL POIN BISA:{' '}
          <NumberFormat
            value={activeUser.poin_bisa}
            displayType={'text'}
            thousandSeparator={true}
            renderText={value => (
              <MilliardText style={styles.amount}>{value}</MilliardText>
            )}
          />
        </MilliardText>
        {/* <Button
          onPress={() => props.navigation.navigate('PoinBisaCart')}
          title="See Cart"
        /> */}
      </View>
      <FlatList
        //kalo pake onRefresh, harus nambah properti refreshing juga
        // onRefresh={onRefresh}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            title="Pull to refresh"
            colors={[Colors.primaryColor]}
          />
        }
        data={allItems}
        style={styles.flatlist}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <ProductItem
            image={itemData.item.img_url}
            title={itemData.item.nama_item}
            points={itemData.item.poin_item}
            detail={itemData.item.detail_item}
            onSelect={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}>
            {/* <View style={styles.touchable}> */}
            <TouchableOpacity
              onPress={() => addToCart(itemData.item)}
              style={styles.touchable}>
              <View style={styles.addToCartButton}>
                {/* <Icon name="plus" size={20} color={Colors.primaryColor} /> */}
                <MilliardText style={styles.addToCartText}>
                  Tambahkan ke keranjang
                </MilliardText>
              </View>
            </TouchableOpacity>
            {/* </View> */}
            {/* <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="Add to Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          /> */}
          </ProductItem>
        )}
      />
      {/* <Toast ref={toast} /> */}
    </View>
  );
};

PoinBisaCatalogueScreen.navigationOptions = ({navigation}) => {
  // console.log('screen');
  return {
    // headerTitleStyle: {
    //   textAlign: 'left',
    //   fontFamily: 'OpenSans-Regular',
    //   fontSize: 24,
    // },
    headerRightContainerStyle: {
      marginRight: 15,
    },
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('PoinBisaCart')}>
        <IonIcon name="md-cart" size={25} color={Colors.primaryColor} />
      </TouchableOpacity>
    ),
  };
};
//   title: 'Stories',
//   headerTitleStyle: {
//     textAlign: 'left',
//     fontFamily: 'OpenSans-Regular',
//     fontSize: 24,
//   },
//   headerTintColor: 'rgba(255,255,255,0.8)',
//   headerBackground: (
//     <LinearGradient
//       colors={['#4cbdd7', '#3378C3']}
//       start={{x: 0, y: 1}}
//       end={{x: 1, y: 1}}
//       style={{flex: 1}}
//     />
//   ),
//   headerRightContainerStyle: {
//     paddingRight: 10,
//   },
//   headerRight: (
//     <TouchableOpacity onPress={() => navigation.navigate('storiesList')}>
//       <IonIcon name="ios-search" size={25} color="white" left={20} />
//     </TouchableOpacity>
//   ),
// });

const styles = {
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  information: {
    marginBottom: 10,
  },
  addToCartButton: {
    overflow: 'hidden',
    borderRadius: 7,
    borderColor: Colors.primaryColor,
    borderWidth: 1,
    // padding: 8,
    height: 38,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  touchable: {
    // overflow: 'hidden',
    // borderRadius: 7,
    // borderColor: Colors.primaryColor,
    // borderWidth: 1,
    // // padding: 8,
    // height: 38,
    width: '100%',
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'white',
  },
  addToCartText: {
    color: Colors.primaryColor,
  },
  totalPoints: {
    padding: 15,
  },
  options: {
    position: 'relative',
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE * 0.7,
    marginTop: 15,
    borderRadius: 13,
    borderColor: Colors.primaryColor,
    borderWidth: 1,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  poinBisaContainer: {
    // flex: 1,
    // height: height / 5,
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.softBlue,
    backgroundColor: 'white',
    // borderStyle: 'dashed',
  },
  flatlist: {
    marginTop: 15,
    height: '85%',
  },
};

export default PoinBisaCatalogueScreen;
