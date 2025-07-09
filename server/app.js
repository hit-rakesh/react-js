const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// 👉 Serve static files from React's build directory
app.use(express.static(path.join(__dirname, 'build')));

// 👉 API route
app.get('/api/message', (req, res) => {
  res.json({ message: 'I am the best!' });
});

// 👉 Fallback: all other routes go to React's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// 👉 Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
