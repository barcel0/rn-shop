import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import ButtonHeaderCustom from '../components/ButtonHeaderCustom';
import ItemCard from '../components/ItemCard';

const MyItemsScreen = props => {
  const userId = useSelector(state => state.auth.userId);
  const userItems = useSelector(state => state.shop.items.filter(item => item.ownerId === userId));

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

  if (userItems.length < 1) {
    return (
      <View style={{ ...styles.screen, alignItems: 'center' }}>
        <Text>You have no items created.</Text>
        <Text>Try adding one by tapping the upper left icon.</Text>
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