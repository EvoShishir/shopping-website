import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { productReducer } from "../Reducers/productReducer";
import { userReducer } from "../Reducers/userReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { categoryReducer } from "../Reducers/categoryReducer";
import { cartReducer } from "../Reducers/cartReducer";

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  category: categoryReducer,
  cart: cartReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({ reducer: persistedReducer });
export const persistor = persistStore(store);
