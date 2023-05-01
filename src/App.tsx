import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import Main from './Components/Main/Main';
import AppBarComponent from './Components/AppBarComponent/AppBarComponent';
import EditView from './Components/EditView/EditView';
import { fetchProducts } from './store/productsSlice';
import { useAppDispatch } from './hooks';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <AppBarComponent />
              <Main />
            </>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <>
              <AppBarComponent />
              <EditView />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
