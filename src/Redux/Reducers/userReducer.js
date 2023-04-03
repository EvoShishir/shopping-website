export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "STORE_USER":
      return {
        ...state,
        userInfo: action.payload,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        userInfo: null,
      };
    default:
      return state;
  }
};
