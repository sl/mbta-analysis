import React, { useState, useEffect } from 'react';
import { fetchJSON } from './utils/communication'

const App = () => {
  const [hello, setHello] = useState('not ready yet');
  
  useEffect(() => {
    const fetchHello = async () => {
      const result = await fetchJSON('/');
      setHello(result);
    };
    
    fetchHello();
  }, []);
  
  return (
    <h1>{hello}</h1>
  );
}

export default App;
