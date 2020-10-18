import React from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native';
import ButtonMain from './ButtonMain';

const ItemForm = props => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={'padding'}>
      <View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Title</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={props.setTitle}
            value={props.title}
            returnKeyType={"next"}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Image URL</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={props.setImageUrl}
            value={props.imageUrl}
            autoCapitalize={"none"}
            autoCorrect={false}
            returnKeyType={"next"}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Price</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={props.setPrice}
            value={props.price}
            keyboardType={'number-pad'}
            returnKeyType={"next"}
            min={0.01}
          />
        </View>

        {/* <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Item ID</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={props.setId}
            value={props.id}
            autoCapitalize={"none"}
            autoCorrect={false}
            returnKeyType={"next"}
          />
        </View> */}

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Description</Text>
          <TextInput
            multiline
            style={styles.textInput}
            onChangeText={props.setDescription}
            value={props.description}
          />
        </View>


        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Owner ID</Text>
          <TextInput
            style={styles.textInput}
            value={props.ownerId}
            editable={false}
          />
        </View>

        <ButtonMain onTap={props.onSend}>
          <Text>Send</Text>
        </ButtonMain>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 15
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  textInput: {
    backgroundColor: 'lightblue',
    width: '100%',
    color: 'black',
    padding: 10,
    fontSize: 18

  }
});

export default ItemForm;