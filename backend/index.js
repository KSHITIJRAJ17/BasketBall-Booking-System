// backend/index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./src/routes');

const app = express();
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/MeghGen'); 

// Use routes
app.use('/', routes);

app.listen(3001, () => {
  console.log("server is running")
})