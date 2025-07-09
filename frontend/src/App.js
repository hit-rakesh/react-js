import React, { useEffect, useState } from 'react';
import RKSImage from './RKS.jpeg'; // 👈 Import the image

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/message')
      .then(res => res.json())
      .then(data => setMessage(data.message));
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '30px' }}>
      <h1>🚀 Welcome to My App</h1>
      <p>Backend message: {message}</p>

      <h2>🖼️ My Picture</h2>
      <img
        src={RKSImage}
        alt="RKS"
        style={{
          width: '300px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          marginTop: '20px'
        }}
      />
    </div>
  );
}

export default App;
