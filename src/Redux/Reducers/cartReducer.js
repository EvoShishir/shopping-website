import { ADD_TO_CART, REMOVE_ITEM } from "../typings/reducerTypings";

export const cartReducer = (
  state = {
    cart: [],
  },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      let alreadyExists = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (alreadyExists) {
        const emptyCart = state.cart.filter(
          (item) => item.id !== action.payload.id
        );

        emptyCart.push(action.payload);
        return {
          cart: [...emptyCart],
        };
      }

      return {
        cart: [...state.cart, action.payload],
      };

    case REMOVE_ITEM:
      const itemId = action.payload;
      const updatedItems = state.cart.filter((item) => item.id !== itemId);
      return { ...state, cart: updatedItems };

    default:
      return state;
  }
};
