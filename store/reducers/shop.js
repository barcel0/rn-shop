import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  CLEAR_CART,
  PLACE_ORDER,
  UPDATE_ITEM,
  DELETE_ITEM,
  SET_ITEMS,
  SET_ORDERS
} from '../actions/shop';

const initialState = {
  items: [],
  userId: 'u2',
  orders: [],
  cartItemIds: []
}

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ITEMS:
      console.log('SET_ITEMS triggered') //debug
      return { ...state, items: action.payload };
    case SET_ORDERS:
      console.log('SET_ORDERS triggered') //debug
      return { ...state, orders: action.payload }
    case ADD_ITEM_TO_CART:
      console.log('ADD_ITEM_TO_CART triggered') //debug
      return { ...state, cartItemIds: [...state.cartItemIds, action.payload] };
    case REMOVE_ITEM_FROM_CART:
      console.log('REMOVE_ITEM_FROM_CART triggered') //debug
      const targetItemId = action.payload;
      const updatedItemIds = state.cartItemIds.filter(itemId => itemId !== targetItemId);
      return { ...state, cartItemIds: updatedItemIds };
    case CLEAR_CART:
      return { ...state, cartItemIds: [] }
    case PLACE_ORDER:
      console.log('PLACE-ORDER triggered') //debug
      return { ...state, orders: [action.payload, ...state.orders] };
    case UPDATE_ITEM:
      console.log('UPDATE_ITEM triggered') //debug
      const availableItems = state.items;
      availableItems.forEach((item, itemIndex) => {
        if (item.id === action.payload.id) {
          availableItems[itemIndex] = action.payload;
        }
      })
      return { ...state, items: availableItems };
    case DELETE_ITEM:
      console.log('DELETE_ITEM triggered') //debug
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      return { ...state, items: updatedItems };
    default:
      console.log('Default triggered') //debug
      return state;
  }
}

export default shopReducer;