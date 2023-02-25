// store here
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/product";
import userReducer from "./slices/user";
import searchReducer from "./slices/search";
import orderReducer from "./slices/order";

const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    search: searchReducer,
    order: orderReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
