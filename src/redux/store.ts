import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import productReducer from './slices/productSlice';
import categoryReducer from './slices/categorySlice';
import cartReducer from './slices/cartSlice';

//for testing purposes
import categorySlice from './slices/categorySlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    categories: categoryReducer,
    cart: cartReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


//for testing purposes
export const createNewStore = () => {
  return configureStore({
    reducer: {
      products: productReducer,
      categories: categorySlice,
      users: userReducer,
      cart: cartReducer,
    },
  });
};
