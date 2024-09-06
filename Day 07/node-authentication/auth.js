const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const SECRET_KEY = 'mySuperSecretKey';

// Fake User Data
const users = [{ id: 1, username: 'john', password: '12345' }];

// Sign up route (for simplicity, using hardcoded users)
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  const user = { id: users.length + 1, username, password };
  users.push(user);
  res.json({ message: 'User signed up', user });
});

// Login Route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Logged in', token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Middleware to validate JWT token
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'Token required' });
  
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Protected Route
app.get('/dashboard', authenticateToken, (req, res) => {
  res.json({ message: `Welcome, user ${req.user.id}` });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/');
});
