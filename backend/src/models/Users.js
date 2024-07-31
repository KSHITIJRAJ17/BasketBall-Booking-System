// backend/src/models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  wallet: {
    type: Number,
    required: true
  }
});

// Export the model as UserModel
module.exports = mongoose.model('users', userSchema);
