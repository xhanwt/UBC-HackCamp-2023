// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes'); // Adjust the path accordingly

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use the authentication routes
app.use('/api', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});