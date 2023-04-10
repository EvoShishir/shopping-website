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
    default:
      return state;
  }
};
