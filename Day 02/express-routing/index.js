const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Home Page');
});

app.get('/about', (req, res) => {
  res.send('About Us Page');
});

app.post('/contact', (req, res) => {
  res.send(`Received message: ${req.body.message}`);
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
