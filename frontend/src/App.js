import React, { useState, useEffect } from 'react';
import { fetchJSON } from './utils/communication'

const App = () => {
  const [hello, setHello] = useState('not ready yet');
  
  useEffect(() => {
    const fetchHello = async () => {
      const result = await fetchJSON('mbta');
      setHello(result.hello);
    };
    
    fetchHello();
  }, []);
  
  return (
    <h1>Hello {hello}</h1>
  );
}

export default App;
