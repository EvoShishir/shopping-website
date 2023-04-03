export const categoryReducer = (state = {}, action) => {
  switch (action.type) {
    case "STORE_CATEGORY":
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};
