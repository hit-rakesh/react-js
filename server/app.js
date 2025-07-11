const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000; // Fixed port

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// Serve static files from React build (optional for POC)
app.use(express.static(path.join(__dirname, 'build')));

// MySQL pool with hardcoded credentials
const pool = mysql.createPool({
  host: 'mydebsqlapp.mysql.database.azure.com',
  user: 'admin01',
  password: 'India@123', // 👈 Hardcoded password (for POC only)
  database: 'mynewapp',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test DB connection
pool.getConnection()
  .then(conn => {
    console.log('✅ Connected to MySQL');
    conn.release();
  })
  .catch(err => {
    console.error('❌ DB connection failed:', err);
  });

// Insert user
app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required' });
  }
  try {
    const [result] = await pool.query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    res.json({ id: result.insertId, name, email });
  } catch (error) {
    console.error('Insert failed:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get users
app.get('/api/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Fetch failed:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// React fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
