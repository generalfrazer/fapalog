// Import the required modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');  // Middleware to parse POST data
const app = express();
const PORT = 3000;

const mongoose = require('mongoose');

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/fapalog')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));


// Define the Log schema
const logSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now }
});

// Create a model from the schema
const Log = mongoose.model('Log', logSchema);



// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());  // Middleware to parse incoming requests as JSON

// Store logs in a simple array
let logData = [];

// Home route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to log an event
app.post('/log', async (req, res) => {
  try {
    // Create a new log entry using the Log model
    const log = new Log();
    await log.save(); // Save the log entry to the database

    // Get the total count of logs in the database
    const totalCount = await Log.countDocuments();

    res.json({ success: true, totalCount, mostRecentLog: log.timestamp });
  } catch (error) {
    console.error('Error saving log:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


// Endpoint to get all logs (for future use)
app.get('/logs', (req, res) => {
  res.json(logData);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
