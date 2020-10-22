import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import ButtonHeaderCustom from '../components/ButtonHeaderCustom';
import ItemCard from '../components/ItemCard';
import { Colours } from '../constants/Colours';
import { fetchItems } from '../store/actions/shop';

const ShopScreen = props => {
  const availableItems = useSelector(state => state.shop.items);
  const cartItemIds = useSelector(state => state.shop.cartItemIds);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dispatch = useDispatch();

  const loadItems = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(fetchItems());
      setIsRefreshing(false);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    setIsLoading(true);
    loadItems().then(() => {
      setIsLoading(false)
    });
  }, [dispatch, loadItems]);

  useEffect(() => {
    const willFocusSubscription = props.navigation.addListener('willFocus', loadItems);
    return () => {
      willFocusSubscription.remove();
    }
  }, [loadItems]);

  const serveItemCard = (itemData) => {
    let isItemInCart = cartItemIds.includes(itemData.item.id);
    return (
      <ItemCard
        id={itemData.item.id}
        ownerId={itemData.item.ownerId}
        imageUrl={itemData.item.imageUrl}
        title={itemData.item.title}
        description={itemData.item.description}
        price={itemData.item.price}
        isItemInCart={isItemInCart}
        onSelect={() => {
          props.navigation.navigate({
            routeName: 'Detail',
            params: { itemId: itemData.item.id }
          })
        }
        }
      />
    );
  }

  if (error) {
    <View style={styles.screen}>
      <Text>Something went wrong:</ Text>
      <Text>{error}</ Text>
      <Button title={'Try Again'} onPress={() => loadItems()} />
    </View>
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} color={Colours.primary} />
      </View>
    );
  }

  if (!isLoading && availableItems.length < 0) {
    return (
      <View style={styles.screen}>
        <Text>No items found. Try adding some through 'My Items'.</ Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        onRefresh={loadItems}
        refreshing={isRefreshing}
        data={availableItems}
        renderItem={serveItemCard}
        keyExtractor={item => item.id}
      />
    </View>
  );

}

ShopScreen.navigationOptions = navigationData => {
  return {
    headerTitle: 'Shop',
    headerLeft: () => <HeaderButtons HeaderButtonComponent={ButtonHeaderCustom}>
      <Item
        title={'Menu'}
        iconName={'ios-menu'}
        onPress={() => navigationData.navigation.toggleDrawer()}
      />
    </HeaderButtons>,
    headerRight: () => <HeaderButtons HeaderButtonComponent={ButtonHeaderCustom}>
      <Item
        title={'Cart'}
        iconName={'ios-cart'}
        onPress={() => navigationData.navigation.navigate('Cart')}
      />
    </HeaderButtons>
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexGrow: 1,
    padding: 20
  },
  loadingContainer: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ShopScreen;