import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

const ButtonMain = (props) => {
  return (
    <TouchableOpacity onPress={props.onTap}>
      <View style={{ ...styles.buttonContainer }}>
        <Text style={styles.label}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,

  },
  label: {
    fontSize: 16
  }
});

export default ButtonMain;