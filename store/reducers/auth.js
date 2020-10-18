import { AUTHENTICATE, LOG_OUT } from '../actions/auth';

const initialState = {
  token: null,
  userId: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return { ...state, token: action.payload.idToken, userId: action.payload.localId };
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
}

export default authReducer;