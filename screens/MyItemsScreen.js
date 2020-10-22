import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import ButtonHeaderCustom from '../components/ButtonHeaderCustom';
import ItemCard from '../components/ItemCard';
import { fetchItems } from '../store/actions/shop';
import { Colours } from '../constants/Colours';

const MyItemsScreen = props => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const userId = useSelector(state => state.auth.userId);
  const items = useSelector(state => state.shop.items);
  const userItems = items.filter(item => item.ownerId === userId);

  const loadItems = useCallback(async () => {
    setIsLoading(true);
    dispatch(fetchItems());
    setIsLoading(false);
  }, [dispatch, setIsLoading]);

  useEffect(() => {
    loadItems();
  }, [loadItems, items]);

  const serveItemCard = (itemData) => {
    return (
      <ItemCard
        mode={'myItems'}
        navigation={props.navigation}
        id={itemData.item.id}
        ownerId={itemData.item.ownerId}
        imageUrl={itemData.item.imageUrl}
        title={itemData.item.title}
        description={itemData.item.description}
        price={itemData.item.price}
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

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} color={Colours.primary} />
      </View>
    );
  }

  if (userItems.length < 1) {
    return (
      <View style={{ ...styles.screen, alignItems: 'center' }}>
        <Text>You have no items created.</Text>
        <Text>Try adding one by tapping the upper right icon.</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={userItems}
        renderItem={serveItemCard}
        keyExtractor={(item, index) => item.id}
      />
    </View>
  );
}

MyItemsScreen.navigationOptions = navigationData => {
  return {
    headerTitle: 'My Items',
    headerLeft: () => <HeaderButtons HeaderButtonComponent={ButtonHeaderCustom}>
      <Item
        title={'Menu'}
        iconName={'ios-menu'}
        onPress={() => navigationData.navigation.toggleDrawer()}
      />
    </HeaderButtons>,
    headerRight: () => <HeaderButtons HeaderButtonComponent={ButtonHeaderCustom}>
      <Item
        title={'Add Item'}
        iconName={'ios-add-circle-outline'}
        onPress={() => navigationData.navigation.navigate('AddItem')}
      />
    </HeaderButtons>
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexGrow: 1,
    padding: 20
  }
});

export default MyItemsScreen;