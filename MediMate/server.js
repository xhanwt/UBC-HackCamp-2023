// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

const app = express();

app.use(cors());


const PORT = 27017;

app.use(bodyParser.json());

const mongoDBAtlasUri = 'mongodb+srv://vinlee1208:F7RqLEA2t3clRvpz@medimate.nngedot.mongodb.net/';
const databaseName = 'MediMateDB';


// Connect to MongoDB
mongoose.connect(mongoDBAtlasUri + databaseName, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
  // Start your server once the database connection is established
});

// Use the authentication routes
app.use('/api', authRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the MediMate API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});