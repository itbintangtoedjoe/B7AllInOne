import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import NumberFormat from "react-number-format";

import MilliardBoldText from "../../general/components/MilliardBoldText";
import MilliardText from "../../general/components/MilliardText";
import Colors from "../../general/constants/Colors";

// id,
//     nik,
//     nama_item,
//     detail_item,
//     poin_item,
//     jumlah_item,
//     img_url,

const CartItem = (props) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: props.image }} style={styles.image} />
        </View>
        <View style={styles.titleContainer}>
          <View>
            <Text style={styles.mainText}>{props.namaItem}</Text>
          </View>
          <NumberFormat
            value={props.subtotal}
            displayType={"text"}
            thousandSeparator={true}
            renderText={(value) => (
              <MilliardBoldText style={styles.subtotal}>
                P{value}
              </MilliardBoldText>
            )}
          />
          {/* <MilliardBoldText style={styles.subtotal}>
            P{props.subtotal}
          </MilliardBoldText> */}
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={{
              ...styles.quantityOperator,
              borderBottomColor: Colors.softPurple,
              borderBottomWidth: 1,
            }}
            onPress={() => props.addItemFunction(props.itemID)}
          >
            <MilliardBoldText style={styles.qtyOperatorText}>
              +
            </MilliardBoldText>
          </TouchableOpacity>
          {/* <Button title="+" style={{...styles.quantityOperator} /> */}
          <View>
            <MilliardText style={styles.qtyText}>
              {props.jumlahItem}
            </MilliardText>
          </View>
          <TouchableOpacity
            style={{
              ...styles.quantityOperator,
              borderTopColor: Colors.softPurple,
              borderTopWidth: 1,
            }}
            onPress={() => props.substractItemFunction(props.itemID)}
          >
            <MilliardBoldText style={styles.qtyOperatorText}>
              -
            </MilliardBoldText>
          </TouchableOpacity>
        </View>
        {/* {props.deletable && (
          <TouchableOpacity
            onPress={props.onRemove}
            style={styles.deleteButton}>
            <Icon name="trash-o" size={23} color="red" />
          </TouchableOpacity>
        )} */}
      </View>
      {/* <View style={styles.itemData}>
        <Text style={styles.quantity}>{props.jumlahItem}</Text>
        <Text style={styles.mainText}>{props.namaItem}</Text>
      </View> */}
      {/* <View style={styles.itemData}>
        {props.deletable && (
          <TouchableOpacity
            onPress={props.onRemove}
            style={styles.deleteButton}>
            <Icon name="trash-o" size={23} color="red" />
          </TouchableOpacity>
        )}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: "white",
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // borderRadius: 7,
    borderBottomColor: Colors.softGray,
    borderBottomWidth: 1,
    // marginHorizontal: 20,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    color: "#888",
    fontFamily: "Milliard-Book",
    fontSize: 18,
    marginRight: 10,
  },
  quantityOperator: {
    color: "white",
    // borderBottomColor: Colors.primaryColor,
    // borderBottomWidth: 1,
    // borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    width: 60,
  },
  qtyOperatorText: {
    color: Colors.primaryColor,
    fontSize: 20,
  },
  qtyText: {
    color: Colors.primaryColor,
    fontSize: 14,
    padding: 5,
  },
  titleContainer: {
    width: "56%",
    marginHorizontal: "1%",
  },
  mainText: { fontFamily: "Milliard-Book", fontSize: 16 },
  deleteButton: {
    marginLeft: 20,
  },
  imageContainer: {
    width: "30%",
    height: 100,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  quantityContainer: {
    width: "12%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.primaryColor,
    borderWidth: 1,
    borderRadius: 3,
    overflow: "hidden",
  },
});

export default CartItem;
