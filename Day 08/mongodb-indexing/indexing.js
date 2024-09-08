const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myDatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true }
});

// Create an index on the email field to optimize queries
userSchema.index({ email: 1 });

// Text index for search functionality
userSchema.index({ name: 'text' });

const User = mongoose.model('User', userSchema);

// Example: Query using the index
User.find({ email: 'john@example.com' }).then(users => console.log(users));

// Example: Text search
User.find({ $text: { $search: 'John' } }).then(users => console.log(users));
