import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('https://mywebserviceapp-fqd4bvb9hehfeha5.centralindia-01.azurewebsites.net/api/message')
      .then(res => res.json())
      .then(data => setMessage(data.message));
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>React Frontend</h1>
      <h2>Message from Backend:</h2>
      <p>{message}</p>
    </div>
  );
}

export default App;
