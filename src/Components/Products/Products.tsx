import Grid from '@mui/material/Grid';
import { useAppSelector } from '../../hooks';
import { Product, ProductState } from '../../store/productsSlice';
import ProductCard from '../Card/Card';
import { RootState } from '../../store';

type ProductsProps = {
  searchString: string;
  minPriceSearch: string;
  maxPriceSearch: string;
};

const Products = ({ searchString, minPriceSearch, maxPriceSearch }: ProductsProps) => {
  const selectProductsByPrice = (
    state: RootState,
    minPrice: string,
    maxPrice: string,
    searchString: string
  ) => {
    const minPriceNumber = minPrice ? parseInt(minPrice) : 0;
    const maxPriceNumber = maxPrice ? parseInt(maxPrice) : 99999;

    return {
      products: {
        products: state.productReducer.products.products.filter(
          (product) =>
            product.price >= minPriceNumber &&
            product.price <= maxPriceNumber &&
            (product.description.toLowerCase().includes(searchString.toLowerCase()) ||
              product.title.toLowerCase().includes(searchString.toLowerCase()))
        ),
      },
      loading: state.productReducer.loading,
      error: state.productReducer.error,
    } as ProductState;
  };

  const { products, loading } = useAppSelector((state) =>
    selectProductsByPrice(state, minPriceSearch, maxPriceSearch, searchString)
  );

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
