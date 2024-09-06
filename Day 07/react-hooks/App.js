import React, { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulating data fetch
    setTimeout(() => {
      setData('Fetched Data');
    }, 2000);
  }, []);

  return (
    <div>
      <h1>React Hooks Example</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      
      <div>
        <h2>Data from API:</h2>
        {data ? <p>{data}</p> : <p>Loading...</p>}
      </div>
    </div>
  );
}

export default App;
