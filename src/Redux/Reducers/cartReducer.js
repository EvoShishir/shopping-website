import {
  ADD_TO_CART,
  DELETE_CART,
  REMOVE_ITEM,
} from "../typings/reducerTypings";

export const cartReducer = (
  state = {
    cart: [],
  },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const updatedCartItem = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (item) => item._id === updatedCartItem._id
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCartItem.quantity,
        };

        return {
          cart: updatedCart,
        };
      }

      return {
        cart: [...state.cart, updatedCartItem],
      };

    case REMOVE_ITEM:
      const itemId = action.payload;
      const updatedItems = state.cart.filter((item) => item._id !== itemId);
      return { ...state, cart: updatedItems };

    case DELETE_CART:
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};
