import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Colours } from '../constants/Colours';
import { authenticate } from '../store/actions/auth';
import { useDispatch } from 'react-redux';

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLoading = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        props.navigation.navigate('Auth');
        return;
      } else {
        const parsedData = JSON.parse(userData);
        const { token, userId, expiryDate } = parsedData;
        if (expiryDate <= new Date() || !token || !userId) {
          props.navigation.navigate('Auth');
          return;
        }
        props.navigation.navigate('Shop');
        dispatch(authenticate(token, userId));
        return;
      }
    }
    tryLoading();
  }, []);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size={'large'} color={Colours.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default StartupScreen;