export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const PLACE_ORDER = 'PLACE_ORDER';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const SET_ITEMS = 'SET_ITEMS';
export const SET_ORDERS = 'SET_ORDERS';
import { FIREBASE } from '../../constants/Config';

export const fetchItems = () => async dispatch => {
  try {
    const response = await fetch(`${FIREBASE}/items.json`);
    if (!response.ok) throw new Error('Something went wrong fetching items');
    const resData = await response.json();
    const availableItems = [];
    for (const key in resData) {
      availableItems.push({ ...resData[key], id: key })
    }
    dispatch({ type: SET_ITEMS, payload: availableItems });
  } catch (error) {
    throw error;
  }
}

export const fetchOrders = () => async (dispatch, getState) => {
  const token = getState().auth.token;
  const userId = getState().shop.userId;
  try {
    const response = await fetch(`${FIREBASE}/orders/${userId}.json?auth=${token}`);
    if (!response.ok) throw new Error('Something went wrong fetching orders');
    const resData = await response.json();
    const availableOrders = [];
    for (const key in resData) {
      availableOrders.push({ ...resData[key], id: key })
    }
    dispatch({ type: SET_ORDERS, payload: availableOrders });
  } catch (error) {
    throw error;
  }
}

export const addItemToCart = itemId => {
  return { type: ADD_ITEM_TO_CART, payload: itemId };
}

export const removeItemFromCart = itemId => {
  return { type: REMOVE_ITEM_FROM_CART, payload: itemId };
}

export const clearCart = () => {
  return { type: CLEAR_CART }
}

export const placeOrder = orderObject => async (dispatch, getState) => {
  const token = getState().auth.token;
  const userId = getState().shop.userId;
  const response = await fetch(`${FIREBASE}/orders/${userId}.json?auth=${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderObject)
  });
  const resData = response.json();

  dispatch({ type: PLACE_ORDER, payload: { ...orderObject, id: resData.name } });
}

export const addItem = itemObject => async (dispatch, getState) => {
  const token = getState().auth.token;
  await fetch(`${FIREBASE}/items.json?auth=${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(itemObject)
  });
}

export const updateItem = itemObject => async (dispatch, getState) => {
  const token = getState().auth.token;
  await fetch(`${FIREBASE}/items/${itemObject.id}.json?auth=${token}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(itemObject)
  });
  dispatch({ type: UPDATE_ITEM, payload: itemObject });
}

export const deleteItem = itemId => async (dispatch, getState) => {
  const token = getState().auth.token;
  await fetch(`${FIREBASE}/items/${itemId}.json?auth=${token}`, { method: 'DELETE' });
  dispatch({ type: DELETE_ITEM, payload: itemId });
}