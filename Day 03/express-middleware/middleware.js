const express = require('express');
const app = express();

// Custom Middleware for logging requests
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

// Built-in Middleware to parse JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.post('/data', (req, res) => {
  res.json({ message: 'Data received', data: req.body });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/');
});
