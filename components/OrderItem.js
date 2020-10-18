import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrderItem = props => {
  return (
    <View style={styles.orderItem}>
      <Text>{props.title}</Text>
      <Text>£{props.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    width: '100%'
  }
});

export default OrderItem;