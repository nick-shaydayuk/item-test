import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { useAppDispatch, useAppSelector, useDebounce } from '../../hooks';
import {
  Product,
  ProductState,
  fetchProducts,
  fetchProductsWithSearch,
} from '../../store/productsSlice';
import ProductCard from '../Card/Card';
import { RootState } from '../../store';

type ProductsProps = {
  searchString: string;
  priceSearch: string;
};

const Products = ({ searchString, priceSearch }: ProductsProps) => {
  const dispatch = useAppDispatch();

  const selectProductsByPrice = (state: RootState, price: string) => {
    const priceNumber = parseInt(price)
    if (!price) {
      return {
        products: {
          products: state.productReducer.products.products
        },
        loading: state.productReducer.loading,
        error: state.productReducer.error
      } as ProductState;
    }
    return {
      products: {
        products: state.productReducer.products.products.filter((product) => product.price === priceNumber),
      },
      loading: state.productReducer.loading,
      error: state.productReducer.error
    } as ProductState;
  };

  const { products, loading } = useAppSelector((state) => selectProductsByPrice(state, priceSearch));

  useEffect(() => {}, [priceSearch, products.products]);

  useEffect(() => {
    if (!searchString.length) return;
    function debouncedDispatch() {
      dispatch(fetchProductsWithSearch(searchString));
    }
    useDebounce(debouncedDispatch(), 500)
  }, [searchString, dispatch]);

  useEffect(() => {
    if (searchString.length) return;
    dispatch(fetchProducts());
  }, [dispatch, searchString]);

  return (
    <Grid container spacing={4} className="products">
      {!loading &&
        products.products.map((product: Product) => (
          <ProductCard product={product} key={product.id} />
        ))}
    </Grid>
  );
};

export default Products;
