import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateItem } from '../store/actions/shop';
import ItemForm from '../components/ItemForm';

const EditItemScreen = props => {
  const item = props.navigation.getParam('item');
  const [title, setTitle] = useState(item.title);
  const [imageUrl, setImageUrl] = useState(item.imageUrl);
  const [description, setDescription] = useState(item.description);
  const [id, setId] = useState(item.id);
  const [price, setPrice] = useState(item.price.toString());
  const ownerId = useSelector(state => state.auth.userId);
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
    headerTitle: 'Edit Item'
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20
  },
});

export default EditItemScreen;