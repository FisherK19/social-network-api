// Import the express package to create the server
const express = require('express');
// Import the database configuration to establish a connection with MongoDB
const db = require('./config/connection');
// Import routes from the routes directory to handle requests
const routes = require('./routes');
// Import mongoose to interact with MongoDB
const mongoose = require('mongoose');

// Disable Mongoose's strict query option for backward compatibility or specific query behavior
mongoose.set('strictQuery', false);

// Define the port number on which the Express server will listen
const PORT = 3001;
// Initialize the Express application
const app = express();

// Middleware to parse URL-encoded data with the querystring library
app.use(express.urlencoded({ extended: true }));
// Middleware to parse incoming JSON payloads
app.use(express.json());
// Apply the routes to the Express application
app.use(routes);

// Once the database connection is open, start the server
db.once('open', () => {
  app.listen(PORT, () => {
    // Log a message indicating the server is running and listening for requests
    console.log(`API server running on port ${PORT}!`);
  });
});
