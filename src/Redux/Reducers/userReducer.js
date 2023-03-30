export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "STORE_USER":
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
};
