import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ButtonMain from './ButtonMain';
import { useSelector } from 'react-redux';
import OrderItem from './OrderItem';

const OrderCard = props => {
  const availableItems = useSelector(state => state.shop.items);
  const orderItems = availableItems.filter(item => props.itemIds.includes(item.id));
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text>{props.id}</Text>
        <Text>{props.date}</Text>
        <Text>£{props.total}</Text>
        <ButtonMain onTap={() => setIsOpen(!isOpen)}>
          <Text>See more</Text>
        </ButtonMain>
      </View>

      <View style={{ ...styles.details, height: !isOpen ? '0%' : null }}>
        <View style={styles.orderItem}>
          <Text style={styles.orderItemHeader}>Name</Text>
          <Text style={styles.orderItemHeader}>Price</Text>
        </View>
        {orderItems.map(item => <OrderItem key={item.id} title={item.title} price={item.price} />)}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightpink',
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden'
  },
  header: {
    backgroundColor: 'lightgreen',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%'
  },
  details: {
    backgroundColor: 'lightblue',
    width: '100%',
  },
  orderItemHeader: {
    fontWeight: 'bold',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8
  }
});

export default OrderCard;