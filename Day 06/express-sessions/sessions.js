const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true when using HTTPS
}));

app.get('/', (req, res) => {
  if (!req.session.views) {
    req.session.views = 1;
  } else {
    req.session.views++;
  }
  res.send(`Number of views: ${req.session.views}`);
});

app.get('/login', (req, res) => {
  req.session.user = { username: 'john_doe' };
  res.send('Logged in!');
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.send('Logged out!');
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/');
});
