import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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
};

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

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (product: ProductRequest, thunkAPI) => {
    try {
      const res = await axios.patch<Product>(
        `https://dummyjson.com/products/${product.id}?select=id,title,thumbnail,description,price`,
        {
          title: product.title,
          thumbnail: product.thumbnail,
          description: product.description,
          price: product.price,
        }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue('Failed to update product');
    }
  }
);

export const fetchProducts = createAsyncThunk('product/fetchProducts', async (_, thunkAPI) => {
  try {
    const res = await axios.get<ProductResponse>(
      'https://dummyjson.com/products?select=id,title,thumbnail,description,price'
    );
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue('Failed to load products');
  }
});

export const fetchProductsWithSearch = createAsyncThunk(
  'product/fetchProductsWithSearch',
  async (search: string, thunkAPI) => {
    try {
      const res = await axios.get<ProductResponse>(
        `https://dummyjson.com/products/search?q=${search}&select=id,title,thumbnail,description,price`
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue('Failed to load products');
    }
  }
);

const productSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled.type, (state, action: PayloadAction<ProductResponse>) => {
        state.loading = false;
        state.error = '';
        state.products = action.payload;
      })
      .addCase(fetchProducts.pending.type, (state) => {
        state.loading = false;
      })
      .addCase(fetchProducts.rejected.type, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(
        fetchProductsWithSearch.fulfilled.type,
        (state, action: PayloadAction<ProductResponse>) => {
          state.loading = false;
          state.error = '';
          state.products = action.payload;
        }
      )
      .addCase(fetchProductsWithSearch.pending.type, (state) => {
        state.loading = false;
      })
      .addCase(fetchProductsWithSearch.rejected.type, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.fulfilled.type, (state, action: PayloadAction<Product>) => {
        const updatedProduct = action.payload;
        const index = state.products.products.findIndex(
          (product) => product.id === updatedProduct.id
        );
        state.loading = false;
        state.error = '';
        state.products.products[index] = updatedProduct;
      })
      .addCase(updateProduct.pending.type, (state) => {
        state.loading = false;
      })
      .addCase(updateProduct.rejected.type, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
