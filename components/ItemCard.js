import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Colours } from '../constants/Colours';
import DefaultText from '../components/DefaultText';
import { addItemToCart, deleteItem } from '../store/actions/shop';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

const ItemCard = props => {
  const { id, title, price, description, imageUrl, ownerId } = props;
  const dispatch = useDispatch();
  const handleDelete = () => {
    Alert.alert(
      'Delete Item: ' + title,
      'Are you sure you wan to delete this item?',
      [
        { text: 'Cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => dispatch(deleteItem(id))
        }
      ]
    );
  }

  const renderDetailsRow = () => {
    if (props.mode !== 'shop') {
      return (
        <View style={styles.cardDetails}>
          <TouchableOpacity onPress={() => props.navigation.navigate({
            routeName: 'EditItem',
            params: { item: { id, title, price, description, imageUrl, ownerId } }
          })}>
            <Ionicons name={'ios-create'} size={30} color='white' />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete()}>
            <Ionicons name={'md-trash'} size={30} color='white' />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.cardDetails}>
          <Ionicons name={'ios-information-circle-outline'} size={30} color='white' />
          <DefaultText style={styles.price}>£{price}</DefaultText>
          <TouchableOpacity onPress={() => dispatch(addItemToCart(id))}>
            <Ionicons name={'ios-cart'} size={30} color='white' />
          </TouchableOpacity>
        </View>
      );
    }
  }


  return (
    <TouchableOpacity onPress={props.onSelect}>
      <View style={styles.cardContainer}>
        <View style={styles.cardHeader}>
          <ImageBackground source={{ uri: imageUrl }} style={styles.image}>
            <View style={styles.titleStripe}>
              <Text style={styles.title} numberOfLines={1}>{title}</Text>
            </View>
          </ImageBackground>
        </View>
        {renderDetailsRow()}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: 200,
    backgroundColor: Colours.primary,
    marginTop: 20,
    elevation: 5,
    borderRadius: 8,
    overflow: 'hidden'
  },
  cardHeader: {
    height: '75%'
  },
  titleStripe: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: 'white',
    fontSize: 16
  },
  image: {
    width: '100%',
    height: '100%'
  },
  cardDetails: {
    flexDirection: 'row',
    height: '25%',
    justifyContent: 'space-around',
    alignItems: 'center',
    color: 'white'
  },
  price: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: 'white'
  }
});

ItemCard.defaultProps = {
  mode: 'shop'
}

export default ItemCard;