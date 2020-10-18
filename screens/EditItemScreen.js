import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateItem, deleteItem } from '../store/actions/shop';
import ItemForm from '../components/ItemForm';
import ButtonMain from '../components/ButtonMain';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import ButtonHeaderCustom from '../components/ButtonHeaderCustom';

const EditItemScreen = props => {
  const item = props.navigation.getParam('item');
  const [title, setTitle] = useState(item.title);
  const [imageUrl, setImageUrl] = useState(item.imageUrl);
  const [description, setDescription] = useState(item.description);
  const [id, setId] = useState(item.id);
  const [price, setPrice] = useState(item.price.toString());
  const ownerId = useSelector(state => state.shop.userId);
  const dispatch = useDispatch();

  const handleSend = () => {
    dispatch(updateItem({ id, ownerId, imageUrl, title, description, price }));
    props.navigation.navigate({
      routeName: 'MyItems'
    })
  }

  return (
    <View style={styles.screen}>
      <ItemForm
        id={id} setId={setId}
        title={title} setTitle={setTitle}
        imageUrl={imageUrl} setImageUrl={setImageUrl}
        description={description} setDescription={setDescription}
        price={price} setPrice={setPrice}
        ownerId={ownerId}
        onSend={handleSend}
      />
    </View >
  );
}

EditItemScreen.navigationOptions = navigationData => {
  return {
    headerTitle: 'Edit Item',
    headerRight: () => <HeaderButtons HeaderButtonComponent={ButtonHeaderCustom}>
      <Item
        title={'Delete Item'}
        iconName={'md-trash'}
        onPress={() => console.log('delete')}
      />
    </HeaderButtons>
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20
  },
});

export default EditItemScreen;