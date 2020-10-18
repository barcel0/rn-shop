import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DefaultText = props => {
  return (
    <View style={styles.container}>
      <Text style={{ ...styles.text, ...props.style }}>{props.children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  text: {
    fontFamily: 'open-sans'
  }
});

export default DefaultText;
