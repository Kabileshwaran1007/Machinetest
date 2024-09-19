const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const verifyToken = require("./middleware/AuthMiddleware");

const app = express(); // Initialize app first
const port = 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Using body-parser to parse JSON data
app.use(express.json()); // Middleware to parse JSON request bodies

// Connection URL
const url = 'mongodb://127.0.0.1:27017/Machine01';

// Connect to MongoDB
mongoose.connect(url)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Use routes
app.use('/api', userRoutes);
app.use('/api', employeeRoutes);

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
