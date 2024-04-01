const mongoose = require('mongoose');

// Load environment variables from .env file
require('dotenv').config();

const { MONGODB_URI, MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_HOST } = process.env;

// MongoDB connection URI
const uri = `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_URI}`;

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('Connected to MongoDB'));

module.exports = db;
