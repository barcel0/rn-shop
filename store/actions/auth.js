import AsyncStorage from '@react-native-community/async-storage';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOG_OUT = 'LOG_OUT';
import { FIREBASE_SIGN_UP, FIREBASE_LOG_IN } from '../../constants/Config';

export const authenticate = (token, userId) => dispatch => {
  dispatch({
    type: AUTHENTICATE,
    payload: { idToken: token, localId: userId }
  });
}

export const logOut = () => dispatch => {
  dispatch({ type: LOG_OUT })
}

export const signUp = (email, password) => async dispatch => {
  try {
    const response = await fetch(`${FIREBASE_SIGN_UP}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      },
    );
    if (!response.ok) {
      const responseErrorData = await response.json();
      if (responseErrorData.error.message === 'EMAIL_EXISTS') {
        throw new Error('Email already exists.');
      }
      if (responseErrorData.error.message === 'OPERATION_NOT_ALLOWED') {
        throw new Error('Operation not allower.');
      }
      if (responseErrorData.error.message === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
        throw new Error('Too many attempts, try again later.');
      }
    };
    const resData = await response.json();
    dispatch(authenticate(resData));
    const expiryDate = new Date(new Date().getTime() + (+resData.expirationDate * 1000));
    saveDataToStorage(tokenId, localId, expiryDate);
  } catch (error) {
    throw error;
  }
}

export const logIn = (email, password) => async dispatch => {
  try {
    const response = await fetch(`${FIREBASE_LOG_IN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      },
    );
    if (!response.ok) {
      const responseErrorData = await response.json();
      if (responseErrorData.error.message === 'EMAIL_NOT_FOUND') {
        throw new Error('Email not found.')
      }
      if (responseErrorData.error.message === 'INVALID_PASSWORD') {
        throw new Error('Invalid password.')
      }
      if (responseErrorData.error.message === 'USER_DISABLED') {
        throw new Error('User disabled.')
      }
    };
    const resData = await response.json();
    console.log(resData); //debug
    console.log({ tokenId: resData.idToken, localId: resData.localId }) //debug
    dispatch(authenticate(resData));
    const expiryDate = new Date(new Date().getTime() + (+resData.expiresIn * 1000));
    saveDataToStorage(resData.idToken, resData.localId, expiryDate);
  } catch (error) {
    throw error;
  }
}

const saveDataToStorage = (token, userId, expiryDate) => {
  AsyncStorage.setItem('userData', JSON.stringify({
    token: token,
    userId: userId,
    expiryDate: expiryDate.toISOString()
  }));
}