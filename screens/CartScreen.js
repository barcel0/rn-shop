import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, placeOrder } from '../store/actions/shop';
import OrderItem from '../components/OrderItem';
import ButtonMain from '../components/ButtonMain';
import { Colours } from '../constants/Colours';

const CartScreen = props => {
  const cartItemIds = useSelector(state => state.shop.cartItemIds);
  const availableItems = useSelector(state => state.shop.items);
  const cartItems = availableItems.filter(item => cartItemIds.includes(item.id));
  const totalSum = cartItems.reduce((acc, currentVal) => {
    return acc + +currentVal.price
  }, 0).toFixed(2);
  const userId = useSelector(state => state.auth.userId);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);


  const serveCartItem = itemData => {
    return <OrderItem title={itemData.item.title} price={itemData.item.price} />;
  }

  const placeOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(placeOrder({
      ownerId: userId,
      date: Date.now(),
      total: totalSum,
      itemIds: cartItemIds
    }));
    setOrderPlaced(true);
    setIsLoading(false);
  }

  const servePlaceOrderButton = () => {
    if (isLoading) {
      <View>
        <ActivityIndicator size={'small'} color={Colours.primary} />
      </View>
    }

    return (
      <ButtonMain
        onTap={() => placeOrderHandler()}>
        <Text>Place Order</Text>
      </ButtonMain>
    );

  }

  const handleClearCart = () => {
    props.navigation.navigate('Shop');
    dispatch(clearCart());
  }

  if (cartItemIds.length < 1) {
    return (
      <View style={styles.screen}>
        <Text style={{ fontSize: 20 }}>Your Cart is empty!</Text>
        <Text style={{ fontSize: 16 }}>Try going back and adding some items.</Text>
      </View>
    );
  }

  if (orderPlaced) {
    return (
      <View style={styles.screen}>
        <Text style={{ fontSize: 20 }}>Order placed. Thanks!</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={{ ...styles.container, ...styles.totalSumRow }}>
        <Text style={styles.title}>Total:</Text>
        <Text style={styles.title}>£{totalSum}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Items on Cart</Text>
        <FlatList
          data={cartItems}
          renderItem={serveCartItem}
          keyExtractor={item => item.id}
        />
      </View>
      {servePlaceOrderButton()}
      <ButtonMain onTap={() => handleClearCart()} style={{ backgroundColor: 'red' }}>
        <Text>Clear Cart</Text>
      </ButtonMain>
    </View>
  );

}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20
  },
  container: {
    padding: 20,
    marginTop: 10,
    elevation: 1,
    borderRadius: 8,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  },
  totalSumRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CartScreen;