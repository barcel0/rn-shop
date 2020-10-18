import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Colours } from '../constants/Colours';
import { signUp, logIn } from '../store/actions/auth';

const AuthScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleAuth = async () => {
    let action;
    if (isSignUp) {
      action = signUp(email, password);
    } else {
      action = logIn(email, password);
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate('Shop');
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert('Something went wrong!', error, [{ text: 'Dismiss' }])
    }
  }, [error]);

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={'padding'} keyboardVerticalOffset={50}>
      <ScrollView>
        <View style={styles.authcontainer}>
          <TextInput
            style={styles.input}
            id={'email'}
            label={'Email'}
            keyboardType={'email-address'}
            required
            email
            autoCapitalize={'none'}
            errorText={'Please enter a valid email address.'}
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            style={styles.input}
            id={'password'}
            label={'Password'}
            keyboardType={'default'}
            required
            secureTextEntry
            minLength={6}
            autoCapitalize={'none'}
            errorText={'Please enter a valid password address.'}
            onChangeText={setPassword}
            value={password}
          />
          <View style={styles.buttonContainer}>
            {isLoading ?
              <ActivityIndicator size={'small'} color={Colours.primary} /> :
              <Button
                title={isSignUp ? 'Sign Up' : 'Log In'}
                onPress={handleAuth}
                color={Colours.primary}
              />
            }

          </View>
          <View style={styles.buttonContainer}>
            <Button
              title={isSignUp ? 'Log In' : 'Sign Up'}
              onPress={() => setIsSignUp(prevState => !prevState)}
              color={Colours.accent}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  authcontainer: {
    width: '100%'

  },
  input: {
    minWidth: 300,
    backgroundColor: 'lightgrey',
    marginTop: 10,
    padding: 10,
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 10
  }
});

export default AuthScreen;