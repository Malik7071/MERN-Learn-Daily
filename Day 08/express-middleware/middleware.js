const express = require('express');
const morgan = require('morgan');

const app = express();

// Third-party middleware: Morgan for logging
app.use(morgan('dev'));

// Custom middleware for logging request details
app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  console.log(`Request Method: ${req.method}`);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error occurred:', err.message);
  res.status(500).json({ error: err.message });
});

app.get('/', (req, res) => {
  res.send('Middleware in Express.js');
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
