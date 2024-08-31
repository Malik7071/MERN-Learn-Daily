import React, { useState, useEffect, useReducer } from 'react';

// Reducer function for useReducer
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function App() {
  // useState example
  const [data, setData] = useState(null);

  // useEffect example
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => response.json())
      .then(json => setData(json));
  }, []);

  // useReducer example
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <h1>React Hooks Examples</h1>

      {/* useState and useEffect */}
      <h2>Data Fetching with useEffect</h2>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}

      {/* useReducer */}
      <h2>Counter with useReducer</h2>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
    </div>
  );
}

export default App;
