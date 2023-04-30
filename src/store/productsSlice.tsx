import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '.';
import axios from 'axios';

type Product = {
  id: string;
  title: string;
  completed: boolean;
  thumbnail: string;
  description: string;
  price: number;

}

type ProductResponse = {
  products: Product[]
}

type ProductState = {
  products: ProductResponse;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: {
    products: []
  },
  loading: false,
  error: null,
}



const productSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    fetchProducts(state) {
      state.loading = true
    },
    fetchProductsSuccess(state, action: PayloadAction<ProductResponse>) {
      state.loading = false
      state.error = ''
      state.products = action.payload
    },
    fetchProductsError(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    }
  }
});

export const fetchProducts = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(productSlice.actions.fetchProducts())
    const res = await axios.get<ProductResponse>('https://dummyjson.com/products?_limit=10')
    dispatch(productSlice.actions.fetchProductsSuccess(res.data))
  } catch (e: any) {
    dispatch(productSlice.actions.fetchProductsError(e.message))
  }
}

export default productSlice.reducer;