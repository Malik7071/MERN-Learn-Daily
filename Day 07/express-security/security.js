const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const csurf = require('csurf');

const app = express();

// Helmet to secure HTTP headers
app.use(helmet());

// Rate Limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: 'Too many requests, please try again later.'
});

app.use(limiter);

// CSRF protection
const csrfProtection = csurf({ cookie: true });
app.use(csrfProtection);

app.get('/', (req, res) => {
  res.send('Secure Express App');
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
