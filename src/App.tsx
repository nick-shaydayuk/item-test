import React, { useEffect } from 'react';
import './App.scss';
import Main from './Components/Main/Main';
import { useAppDispatch, useAppSelector } from './hooks';
import { fetchProducts } from './store/productsSlice';

function App() {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(state => state.productReducer)

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className='App'>
      <Main />
      {JSON.stringify(products, null, 2)}
    </div>
  );
}

export default App;