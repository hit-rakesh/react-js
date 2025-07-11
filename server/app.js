const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Update with your deployed frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// Serve static files from React's build directory
app.use(express.static(path.join(__dirname, 'build')));

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'mydebsqlapp.mysql.database.azure.com',
  user: process.env.DB_USER || 'admin01',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'mynewapp',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: true // Azure MySQL provides SSL by default
  }
});

// Test database connection on startup
pool.getConnection()
  .then(conn => {
    console.log('Connected to MySQL database');
    conn.release();
  })
  .catch(err => {
    console.error('Failed to connect to MySQL:', err);
  });

// API route to submit form data
app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  try {
    const [result] = await pool.query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    res.json({ id: result.insertId, name, email, created_at: new Date() });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// API route to retrieve all users
app.get('/api/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Existing API route
app.get('/api/message', (req, res) => {
  res.json({ message: 'We are best!' });
});

// Fallback: all other routes go to React's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
