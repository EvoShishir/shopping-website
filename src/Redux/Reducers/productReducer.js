export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case "STORE_PRODUCT":
      return {
        ...state,
        products: action.payload,
      };
    case "ADD_CATEGORY_PRODUCT":
      return {
        ...state,
        categoryProducts: action.payload,
      };
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case "REMOVE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (products) => products._id !== action.payload
        ),
      };
    default:
      return state;
  }
};
