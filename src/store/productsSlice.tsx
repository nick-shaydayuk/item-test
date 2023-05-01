import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '.';
import axios from 'axios';

export type Product = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  price: number;
};

export type ProductRequest = {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  price: number;
}

type ProductResponse = {
  products: Product[];
};

export type ProductState = {
  products: ProductResponse;
  loading: boolean;
  error: string | null;
};

const initialState: ProductState = {
  products: {
    products: [],
  },
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    fetchProducts(state) {
      state.loading = true;
    },
    fetchProductsSuccess(state, action: PayloadAction<ProductResponse>) {
      state.loading = false;
      state.error = '';
      state.products = action.payload;
    },
    fetchProductsError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchProductsWithSearch(state) {
      state.loading = true;
    },
    fetchProductsWithSearchSuccess(state, action: PayloadAction<ProductResponse>) {
      state.loading = false;
      state.error = '';
      state.products = action.payload;
    },
    fetchProductsWithSearchError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateProduct(state) {
      state.loading = true;
    },
    updateProductSuccess(state, action: PayloadAction<Product>) {
      const updatedProduct = action.payload;
      const index = state.products.products.findIndex(product => product.id === updatedProduct.id);
      state.loading = false;
      state.error = '';
      /* if (index !== -1) {
        produce(state, draftState => {
          draftState.products.products[index] = updatedProduct;
        });
      } */
      state.products.products[index] = updatedProduct;
    },
    updateProductError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const fetchProducts = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(productSlice.actions.fetchProducts());
    const res = await axios.get<ProductResponse>(
      'https://dummyjson.com/products?select=id,title,thumbnail,description,price'
    );
    dispatch(productSlice.actions.fetchProductsSuccess(res.data));
  } catch (e: any) {
    dispatch(productSlice.actions.fetchProductsError(e.message));
  }
};

export const fetchProductsWithSearch = (search: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(productSlice.actions.fetchProductsWithSearch());
    const res = await axios.get<ProductResponse>(
      `https://dummyjson.com/products/search?q=${search}&select=id,title,thumbnail,description,price`
    );
    dispatch(productSlice.actions.fetchProductsSuccess(res.data));
  } catch (e: any) {
    dispatch(productSlice.actions.fetchProductsError(e.message));
  }
};

export const updateProduct = (product: ProductRequest) => async (dispatch: AppDispatch) => {
  try {
    dispatch(productSlice.actions.updateProduct());
    const res = await axios.patch<Product>(
      `https://dummyjson.com/products/${product.id}?select=id,title,thumbnail,description,price`,
      product
    );
    dispatch(productSlice.actions.updateProductSuccess(res.data));
  } catch (e: any) {
    dispatch(productSlice.actions.updateProductError(e.message));
  }
};

export default productSlice.reducer;
