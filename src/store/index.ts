import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productsSlice';

const store = configureStore({
  reducer: {
    productReducer: productReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;