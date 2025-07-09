import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/message')
      .then(res => res.json())
      .then(data => setMessage(data.message));
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '40px', fontFamily: 'Arial' }}>
      <h1>🚀 Welcome to My Full-Stack App</h1>

      <h2 style={{ color: '#0078D4' }}>🔊 Message from Backend:</h2>
      <p style={{ fontSize: '1.3rem', marginBottom: '30px' }}>{message}</p>

      <hr style={{ margin: '40px auto', width: '60%' }} />

      <h2>🖼️ Featured Image</h2>

      <img
        src="/RKS.jpeg"
        alt="RKS"
        style={{
          width: '350px',
          borderRadius: '16px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          marginTop: '20px'
        }}
      />
    </div>
  );
}
export default App;
