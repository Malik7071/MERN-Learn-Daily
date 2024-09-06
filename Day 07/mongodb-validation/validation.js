const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myDatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Schema with validation
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  age: {
    type: Number,
    min: 18,
    max: 100,
    required: true
  }
});

// Compile Model
const User = mongoose.model('User', userSchema);

// Example: Create a user with invalid data
const newUser = new User({
  name: 'Jo',
  email: 'invalid-email',
  age: 150
});

newUser.save()
  .then(() => console.log('User saved successfully!'))
  .catch(err => console.error('Validation Error:', err));
