import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { productReducer } from "../Reducers/productReducer";
import { userReducer } from "../Reducers/userReducer";

const reducers = combineReducers({
  user: userReducer,
  product: productReducer,
});

export const store = configureStore({ reducer: reducers });
