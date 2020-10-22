import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../store/actions/shop';
import ItemForm from '../components/ItemForm';

const AddItemScreen = props => {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const ownerId = useSelector(state => state.auth.userId);
  const dispatch = useDispatch();

  const handleSend = () => {
    dispatch(addItem({ ownerId, imageUrl, title, description, price }));
    props.navigation.navigate('MyItems');
  }

  return (
    <View style={styles.screen}>
      <ItemForm
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  }
});

AddItemScreen.navigationOptions = {
  headerTitle: 'Add Item'
}

export default AddItemScreen;