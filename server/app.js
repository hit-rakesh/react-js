const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from Node.js backend on Azure!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
