import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import ButtonHeaderCustom from '../components/ButtonHeaderCustom';
import ButtonMain from '../components/ButtonMain';
import { addItemToCart, removeItemFromCart } from '../store/actions/shop';

const DetailScreen = props => {
  const itemId = props.navigation.getParam('itemId');
  const availableItems = useSelector(state => state.shop.items);
  const selectedItem = availableItems.find(item => item.id === itemId);
  const cartItemIds = useSelector(state => state.shop.cartItemIds);
  const dispatch = useDispatch();

  const serveAddRemoveButton = () => {
    if (cartItemIds.includes(itemId)) {
      return (
        <ButtonMain onTap={() => dispatch(removeItemFromCart(selectedItem.id))}>
          <Text>Remove from Cart</Text>
        </ButtonMain>
      );
    } else {
      return (
        <ButtonMain onTap={() => dispatch(addItemToCart(selectedItem.id))}>
          <Text>Add to Cart</Text>
        </ButtonMain>
      );
    }
  }

  return (
    <View style={styles.screen}>
      <Image source={{ uri: selectedItem.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{selectedItem.title}</Text>
      <Text style={styles.description}>{selectedItem.description}</Text>
      <Text style={styles.price}>£{selectedItem.price}</Text>
      {serveAddRemoveButton()}
    </View>
  );
}

DetailScreen.navigationOptions = navigationData => {
  return {
    headerTitle: 'Item Details',
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
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: 300
  },
  title: {
    fontSize: 20,
    marginVertical: 10
  },
  description: {
    fontSize: 14,
    marginVertical: 10
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default DetailScreen;