const express = require('express');
const app = express();

// Middleware to handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Route that intentionally causes an error
app.get('/error', (req, res, next) => {
  const error = new Error('This is a deliberate error.');
  next(error);
});

// Async route with error handling
app.get('/async-error', async (req, res, next) => {
  try {
    throw new Error('Async error occurred');
  } catch (err) {
    next(err);
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/');
});
