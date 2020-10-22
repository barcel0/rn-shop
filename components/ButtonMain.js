import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Colours } from '../constants/Colours';

const ButtonMain = (props) => {
  return (
    <TouchableOpacity onPress={props.onTap}>
      <View style={{ ...styles.buttonContainer, ...props.style }}>
        <Text style={styles.label}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colours.terciary,

    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,

  },
  label: {
    color: 'white',
    fontFamily: 'open-sans-bold',
    fontSize: 18
  }
});

export default ButtonMain;