const connection = require('../models/userModel');

// Function to fetch user data
const getUserData = (userId, callback) => {
  console.log(`Fetching user data for userId: ${userId}`);
  connection.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user data:', err);
      return callback(err, null);
    }
    if (results.length > 0) {
      console.log('User data found:', results[0]);
      callback(null, results[0]);
    } else {
      console.log('User not found, creating new user...');
      connection.query(
        'INSERT INTO users (id, counter, prizes) VALUES (?, ?, ?)',
        [userId, 0, 0],  // Initialize counter and prizes to 0
        (err) => {
          if (err) {
            console.error('Error inserting user:', err);
            return callback(err, null);
          }
          console.log('New user created with id:', userId);
          callback(null, { counter: 0, prizes: 0 });
        }
      );
    }
  });
};

// Function to handle click action
const handleClick = (userId, callback) => {
  console.log(`Handling click for userId: ${userId}`);
  connection.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user for click action:', err);
      return callback(err, null);
    }

    // If the user doesn't exist, return an error
    if (results.length === 0) {
      console.log('User not found for click action');
      return callback(new Error('User not found'), null);
    }

    // Get the existing values of counter and prizes
    const user = results[0];
    const randomChance = Math.random();
    let points = 1; // Default points for each click
    let prizesWon = 0;

    // Randomly increase points and prizes based on probability
    if (randomChance < 0.5) {
      points += 9; // 50% chance to get 10 points
    }
    if (randomChance < 0.25) {
      prizesWon = 1; // 25% chance to get a prize
    }

    // Log before updating the database
    console.log(`Updating user data: counter += ${points}, prizes += ${prizesWon}`);
    
    // Update the user's counter and prizes in the database
    connection.query(
      'UPDATE users SET counter = counter + ?, prizes = prizes + ? WHERE id = ?',
      [points, prizesWon, userId],
      (err) => {
        if (err) {
          console.error('Error updating user data:', err);
          return callback(err, null);
        }

        // Log after updating the database
        console.log('User data updated successfully');
        
        // Return updated data
        callback(null, { counter: user.counter + points, prizes: user.prizes + prizesWon });
      }
    );
  });
};

module.exports = { getUserData, handleClick };
