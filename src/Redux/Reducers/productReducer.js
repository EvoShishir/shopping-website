export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case "STORE_PRODUCT":
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};
