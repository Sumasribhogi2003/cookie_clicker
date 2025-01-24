const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import the cors package
const { getUserData, handleClick } = require('./jobs/userJobs');

const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to get user data
app.get('/getUserData', (req, res) => {
  const userId = 1; // Static user ID for now
  getUserData(userId, (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching user data' });
    } else {
      res.json(data);
    }
  });
});

// Route to handle click action
app.post('/click', (req, res) => {
  const userId = req.body.userId; // Static userId for simplicity
  handleClick(userId, (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error handling click' });
    } else {
      res.json(data);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
