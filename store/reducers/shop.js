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
  orders: [],
  cartItemIds: []
}

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ITEMS:
      return { ...state, items: action.payload };
    case SET_ORDERS:
      return { ...state, orders: action.payload }
    case ADD_ITEM_TO_CART:
      return { ...state, cartItemIds: [...state.cartItemIds, action.payload] };
    case REMOVE_ITEM_FROM_CART:
      const targetItemId = action.payload;
      const updatedItemIds = state.cartItemIds.filter(itemId => itemId !== targetItemId);
      return { ...state, cartItemIds: updatedItemIds };
    case CLEAR_CART:
      return { ...state, cartItemIds: [] }
    case PLACE_ORDER:
      return { ...state, orders: [action.payload, ...state.orders] };
    case UPDATE_ITEM:
      const availableItems = state.items;
      availableItems.forEach((item, itemIndex) => {
        if (item.id === action.payload.id) {
          availableItems[itemIndex] = action.payload;
        }
      })
      return { ...state, items: availableItems };
    case DELETE_ITEM:
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      return { ...state, items: updatedItems };
    default:
      return state;
  }
}

export default shopReducer;