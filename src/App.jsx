
import './App.css'

// App.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementCounter, decrementCounter } from './appSlice';

function App() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.app.count);
  const status = useSelector((state) => state.app.status);
  const error = useSelector((state) => state.app.error);

  const handleIncrement = () => {
    // Dispatch the incrementCounter action
    dispatch(incrementCounter());
  };

  const handleDecrement = () => {
    // Dispatch the decrementCounter action
    dispatch(decrementCounter());
  };

  return (
    <div>
      <h1>Redux Toolkit Async Thunk Counter</h1>
      <p>Count: {count}</p>

      {/* Display loading state */}
      {status === 'loading' && <p>Loading...</p>}

      {/* Display error if it occurs */}
      {error && <p>Error: {error}</p>}

      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
    </div>
  );
}

export default App;

