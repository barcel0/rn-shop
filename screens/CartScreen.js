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
  const userId = useSelector(state => state.shop.userId);
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

    if (orderPlaced) {
      return (
        <View>
          <Text>Thanks for your oder!</Text>
        </View>
      );
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
        <Text>Your Cart is empty!</Text>
        <Text>Try going back and adding some items.</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.screen}>
        <View style={styles.totalSumRow}>
          <Text>Total:</Text>
          <Text>£{totalSum}</Text>
        </View>
        <Text>Items on Cart:</Text>
        <FlatList
          data={cartItems}
          renderItem={serveCartItem}
          keyExtractor={item => item.id}
        />
        {servePlaceOrderButton()}
        <ButtonMain onTap={() => handleClearCart()}>
          <Text>Clear Cart</Text>
        </ButtonMain>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
    padding: 20
  },
  totalSumRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default CartScreen;