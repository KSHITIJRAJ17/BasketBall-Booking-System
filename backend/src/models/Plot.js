// backend/src/models/Plot1.js

const mongoose = require('mongoose');

const plot1Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  selectedDate: {
    type: Date,
    required: true,
  },

  selectedTime: {
    type: String,
    required: true
  },

  plot: {
    type: String,
    required: true,
  }
});

const Plot = mongoose.model('plots', plot1Schema);

module.exports = Plot;
