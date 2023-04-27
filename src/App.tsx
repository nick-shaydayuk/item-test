import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './features/counterSlice';
import './App.css';

function App() {
  const count = useSelector((state: any) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => dispatch(increment())}>+</button>
        <h2>{count}</h2>
        <button onClick={() => dispatch(decrement())}>-</button>
      </header>
    </div>
  );
}

export default App;