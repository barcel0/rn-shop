import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import ButtonHeaderCustom from '../components/ButtonHeaderCustom';
import ButtonMain from '../components/ButtonMain';
import { Ionicons } from '@expo/vector-icons';
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
    <ScrollView>
      <View style={styles.screen}>
        <Image source={{ uri: selectedItem.imageUrl }} style={styles.image} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{selectedItem.title}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{selectedItem.description}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Ionicons name="md-pricetag" size={24} color="black" />
          <Text style={styles.price}>£{selectedItem.price}</Text>
        </View>
        {serveAddRemoveButton()}
      </View>
    </ScrollView>
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
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.80)',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginVertical: 10
  },
  descriptionContainer: {
    padding: 10
  },
  description: {
    fontSize: 16,
    marginVertical: 10
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginVertical: 20
  }
});

export default DetailScreen;