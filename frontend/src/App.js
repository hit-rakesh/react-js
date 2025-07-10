import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Fetch users from backend
  useEffect(() => {
    axios.get('/api/users')
      .then(response => setUsers(response.data))
      .catch(error => {
        console.error('Error fetching users:', error);
        setError('Failed to load data');
      });
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      setError('Please fill in all fields');
      return;
    }
    try {
      const response = await axios.post('/api/users', { name, email });
      setUsers([response.data, ...users]);
      setName('');
      setEmail('');
      setError('');
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Failed to submit data');
    }
  };

  return (
    <div className="container">
      <img src="/RKS.jpeg" alt="Static Picture" className="logo" />
      <h1>User Form</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <h2>Submitted Data</h2>
      {users.length === 0 ? (
        <p>No data available</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.name} - {user.email} (Submitted: {new Date(user.created_at).toLocaleString()})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
