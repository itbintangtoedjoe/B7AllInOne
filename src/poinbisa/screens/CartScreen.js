import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Modal from 'react-native-modal';
import NumberFormat from 'react-number-format';

import Colors from '../../general/constants/Colors';
import MilliardText from '../../general/components/MilliardText';
import MilliardBoldText from '../../general/components/MilliardBoldText';
import CartItem from '../components/CartItem';
import * as actions from '../redux/actions';
import Card from '../components/Card';

const CartScreen = props => {
  //   const [isLoading, setIsLoading] = useState(false);

  const activeUser = useSelector(state => state.auth.activeUser);
  const loadingState = useSelector(state => state.cart.loadingState);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const cartGrandTotal = useSelector(state => state.cart.grandTotal);
  // const oldCartItems = useSelector(state => state.cart.cartItems);
  // const [cartItems, setCartItems] = useState(
  //   useSelector(state => state.cart.cartItems),
  // );
  const cartItems = useSelector(state => state.cart.cartItems);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  // const transformedCartItems = [];
  // for (const key in state.cart.items) {
  //   transformedCartItems.push({
  //     productId: key,
  //     productTitle: state.cart.items[key].title,
  //     productPrice: state.cart.items[key].price,
  //     quantity: state.cart.items[key].quantity,
  //     sum: state.cart.items[key].sum,
  //     pushToken: state.cart.items[key].pushToken,
  //   });
  // }
  // return transformedCartItems.sort((a, b) =>
  //   a.productId > b.productId ? 1 : -1,
  // );

  const refreshing = false;
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(actions.fetchCartItems(activeUser.nik));
  //   // console.log(cartItems);
  //   // setIsLoading(false);
  // }, []);

  useEffect(() => {
    dispatch(actions.fetchCartItems(activeUser.nik));
    console.log({useffect: cartItems});
    // setIsLoading(false);
  }, [dispatch]);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    dispatch(actions.fetchCartItems(activeUser.nik));
    // console.log(cartItems);
    setIsRefreshing(false);
  }, [isRefreshing]);

  const addItemQuantity = itemID => {
    // console.log('halo iya masuk add');
    dispatch(actions.editItemQuantity(activeUser.nik, itemID, 'ADD'));
    // .then(
    //   () => {
    //     const newItems = [...cartItems];
    //     newItems.map(item => {
    //       if (item.id == itemID) {
    //         item.jumlah_item++;
    //       }
    //     });
    //     setCartItems(newItems);
    //     // dispatch(actions.fetchCartItems(activeUser.nik));
    //   },
    // );
  };

  const substractItemQuantity = itemID => {
    // console.log('halo iya masuk sub');
    cartItems.map(item => {
      if (item.id == itemID) {
        if (item.jumlah_item <= 1) {
          Alert.alert(
            'Buang',
            'Buang item dari keranjang?',
            [
              {
                text: 'Tidak',
              },
              {
                text: 'Ya',
                onPress: () => {
                  dispatch(
                    actions.editItemQuantity(
                      activeUser.nik,
                      itemID,
                      'SUBSTRACT',
                    ),
                  );
                  // .then(() => {
                  //   // const newItems = [...cartItems];
                  //   setCartItems(cartItems.filter(item => item.id !== itemID));
                  // });
                },
              },
            ],
            {cancelable: true},
          );
          return;
        }
      }
    });
    dispatch(
      actions.editItemQuantity(activeUser.nik, itemID, 'SUBSTRACT'),
    ).then(() => {
      const newItems = [...cartItems];
      newItems.map(item => {
        if (item.id == itemID) {
          item.jumlah_item--;
        }
      });
      setCartItems(newItems);
      // dispatch(actions.fetchCartItems(activeUser.nik));
    });
  };

  const konfirmasiRedeem = () => {
    console.log(cartGrandTotal, activeUser.poin_bisa);
    if (cartGrandTotal > activeUser.poin_bisa) {
      Alert.alert('Gagal', 'Total poin yang dimiliki tidak mencukupi');
    } else {
      let subtotalVoucher = 0;
      let subtotal = 0;
      cartItems.map(item => {
        if (item.nama_item.toLowerCase().startsWith('voucher')) {
          subtotal = item.jumlah_item * item.poin_item;
          subtotalVoucher += subtotal;
        }
      });
      if (subtotalVoucher > 2000) {
        Alert.alert('Gagal', 'Maksimal poin redeem voucher adalah 2,000');
      }
      // try {
      //   dispatch(actions.sendRedeemOrder(activeUser.nik));
      //   Alert.alert('Berhasil', 'Order berhasil terkirim');
      //   props.navigation.navigate('BaseHome');
      // } catch (err) {
      //   console.log(err.message);
      // }
    }
  };

  const checkOutDataList = element => {
    // console.log(element);
    return element != undefined ? (
      <View
        key={element.item.id}
        style={{
          flexDirection: 'row',
          // margin: 3,
          justifyContent: 'space-between',
        }}>
        <MilliardText style={{flex: 1}}>
          {element.item.jumlah_item} x
        </MilliardText>
        <MilliardText style={{flex: 9 / 2}}>
          {element.item.nama_item}
        </MilliardText>
        <MilliardText style={{flex: 3 / 2, textAlign: 'right', color: 'green'}}>
          {element.item.jumlah_item * element.item.poin_item}
        </MilliardText>
        {/* <NumberFormat
          value={
            element.item.jumlah_item * element.item.poin_item == undefined
              ? 0
              : element.item.jumlah_item * element.item.poin_item
          }
          displayType={'text'}
          thousandSeparator={true}
          renderText={value => (
            <MilliardText
              style={{flex: 3 / 2, textAlign: 'right', color: 'green'}}>
              {value}
            </MilliardText>
          )}
        />
        {element.item.jumlah_item * element.item.poin_item} */}
      </View>
    ) : (
      <></>
    );
    // if (!loadingState && cartItems != undefined) {
    //   return cartItems.map(element => {
    //     return (
    //       <View
    //         key={element.id}
    //         style={{
    //           flexDirection: 'row',
    //           margin: 3,
    //           justifyContent: 'space-between',
    //         }}>
    //         <MilliardText>{element.jumlah_item} x</MilliardText>
    //         <MilliardText>{element.nama_item}</MilliardText>
    //         <MilliardText style={{color: 'green'}}>
    //           {element.jumlah_item * element.poin_item}
    //         </MilliardText>
    //       </View>
    //     );
    //   });
    // }
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <View style={styles.row}>
          <MilliardText style={styles.summaryText}>
            Total poin BISA yang dimiliki:{' '}
          </MilliardText>
          <NumberFormat
            value={activeUser.poin_bisa}
            displayType={'text'}
            thousandSeparator={true}
            renderText={value => (
              <MilliardText style={styles.amount}>{value}</MilliardText>
            )}
          />
        </View>
        <View style={styles.row}>
          <MilliardText style={styles.summaryText}>
            Grand total keranjang:
          </MilliardText>
          {loadingState ? (
            <ActivityIndicator size="small" color={Colors.primaryColor} />
          ) : cartGrandTotal != undefined ? (
            <NumberFormat
              value={cartGrandTotal}
              displayType={'text'}
              thousandSeparator={true}
              renderText={value => (
                <MilliardText style={styles.amount}>{value}</MilliardText>
              )}
            />
          ) : (
            <MilliardText style={styles.amount}>0</MilliardText>
          )}
        </View>
      </Card>
      {loadingState ? (
        <ActivityIndicator size="small" color={Colors.primaryColor} />
      ) : cartItems.length > 0 ? (
        <View>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                title="Pull to refresh"
                colors={[Colors.primaryColor]}
              />
            }
            data={cartItems}
            keyExtractor={item => item.id}
            contentContainerStyle={{
              borderRadius: 7,
              overflow: 'hidden',
            }}
            style={{height: '78%'}}
            renderItem={itemData => (
              <CartItem
                itemID={itemData.item.id}
                jumlahItem={itemData.item.jumlah_item}
                namaItem={itemData.item.nama_item}
                image={itemData.item.img_url}
                subtotal={itemData.item.poin_item * itemData.item.jumlah_item}
                addItemFunction={addItemQuantity}
                substractItemFunction={substractItemQuantity}
                deletable
                // onRemove={() => {
                //   dispatch(actions.removeFromCart(itemData.item.productId));
                // }}
              />
            )}
          />

          <TouchableOpacity style={styles.button} onPress={handleModal}>
            <MilliardText style={styles.buttonText}>REDEEM</MilliardText>
          </TouchableOpacity>
          <Modal isVisible={isModalVisible}>
            <View
              style={{
                // flex: 1,
                padding: 15,
                backgroundColor: 'white',
                justifyContent: 'center',
                paddingVertical: 30,
                borderRadius: 7,
              }}>
              <MilliardBoldText style={styles.summaryTitle}>
                SUMMARY ITEMS YANG DIPILIH
              </MilliardBoldText>
              <View style={styles.listDataContainer}>
                {/* {checkOutDataList()} */}
                <FlatList
                  data={cartItems}
                  keyExtractor={item => item.id}
                  renderItem={checkOutDataList}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderTopColor: Colors.accentColor,
                    borderTopWidth: 1,
                    marginTop: 15,
                    paddingTop: 15,
                  }}>
                  <MilliardBoldText>GRAND TOTAL</MilliardBoldText>

                  <NumberFormat
                    value={cartGrandTotal}
                    displayType={'text'}
                    thousandSeparator={true}
                    renderText={value => (
                      <MilliardBoldText style={{color: 'green'}}>
                        {value}
                      </MilliardBoldText>
                    )}
                  />
                  {/* <MilliardBoldText style={{color: 'green'}}>
                    {cartGrandTotal}
                  </MilliardBoldText> */}
                </View>
              </View>
              {/* {list()} */}
              {/* <Text>{cartItems[0].nama_item}</Text> */}
              <TouchableOpacity
                style={styles.button}
                onPress={konfirmasiRedeem}>
                <MilliardText style={styles.buttonText}>
                  Konfirmasi Redeem Poin
                </MilliardText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonCancel}
                onPress={handleModal}>
                <MilliardText style={styles.buttonCancelText}>
                  Batalkan
                </MilliardText>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      ) : (
        <MilliardText>Belum ada item dalam keranjang</MilliardText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    // alignItems: 'center',
    marginBottom: 20,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryText: {
    fontSize: 16,
  },
  amount: {
    fontSize: 18,
    color: Colors.primary,
  },
  button: {
    height: 40,
    width: '100%',
    borderRadius: 7,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.primaryColor,
    borderWidth: 1,
    marginTop: 15,
  },
  buttonCancel: {
    height: 40,
    width: '100%',
    borderRadius: 7,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.softPurple,
    borderWidth: 1,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    // fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
  buttonCancelText: {
    color: Colors.primaryColor,
    // fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
  summaryTitle: {marginBottom: 10},
  listDataContainer: {
    borderColor: Colors.primaryColor,
    borderWidth: 1,
    borderRadius: 7,
    padding: 10,
  },
  cartGrandTotal: {
    // fontWeight: 'bold',
    marginTop: 15,
    paddingTop: 15,
    fontFamily: 'Milliard-Book',
  },
});

export default CartScreen;
