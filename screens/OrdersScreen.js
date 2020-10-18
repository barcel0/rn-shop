import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../store/actions/shop';
import ButtonHeaderCustom from '../components/ButtonHeaderCustom';
import OrderCard from '../components/OrderCard';
import { Colours } from '../constants/Colours';

const OrdersScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector(state => state.shop.userId);
  const userOrders = useSelector(state => state.shop.orders.filter(order => order.ownerId === userId));

  const loadOrders = useCallback(async () => {
    setIsLoading(true);
    dispatch(fetchOrders());
    setIsLoading(false);
  }, [setIsLoading, dispatch]);

  useEffect(() => {
    loadOrders
  }, [loadOrders]);

  const serveOrderCard = orderData => {
    return (
      <OrderCard
        id={orderData.item.id}
        date={orderData.item.date}
        total={orderData.item.total}
        itemIds={orderData.item.itemIds}
      />
    );
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} color={Colours.primary} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={userOrders}
        renderItem={serveOrderCard}
        keyExtractor={(item, index) => item.id}
      />
    </View>
  );
}

OrdersScreen.navigationOptions = navigationData => {
  return {
    headerTitle: 'Orders',
    headerLeft: () => <HeaderButtons HeaderButtonComponent={ButtonHeaderCustom}>
      <Item
        title={'Menu'}
        iconName={'ios-menu'}
        onPress={() => navigationData.navigation.toggleDrawer()}
      />
    </HeaderButtons>
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  }
});

export default OrdersScreen;