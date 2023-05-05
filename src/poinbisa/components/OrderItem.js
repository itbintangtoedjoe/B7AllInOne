import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, Platform} from 'react-native';

import Colors from '../../general/constants/Colors';
import CartItem from './CartItem';
import Card from './Card';

const OrderItem = props => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        title={showDetails ? 'Hide Details' : 'Show Details'}
        color={Colors.primary}
        onPress={() => {
          setShowDetails(prevState => !prevState);
        }}
      />
      {showDetails && (
        <View style={styles.details}>
          {props.items.map(cartItem => (
            <CartItem
              //dari order screen
              key={cartItem.productId}
              quantity={cartItem.quantity}
              title={cartItem.productTitle}
              amount={cartItem.sum}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: 'center',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 5,
  },
  totalAmount: {
    fontFamily: 'cassette-tapes',
    fontSize: 40,
  },
  date: {
    color: '#888',
  },
  details: {
    width: '100%',
  },
});

export default OrderItem;
