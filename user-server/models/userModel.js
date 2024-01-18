// models/userModel.js
const mysql = require('mysql2');

// MySQL database connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mataro091',
  database: 'user',
});

// Fetch all users from the database
const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Fetch user by username from the database
const getUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);
      }
    });
  });
};

// Create a new user in the database
const createUser = (username, first_name, last_name) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO users (username, first_name, last_name) VALUES (?, ?, ?)', [username, first_name, last_name], (err, result) => {
      if (err) {
        reject(err);
      } else {
        const newUser = { username, first_name, last_name, id: result.insertId };
        resolve(newUser);
      }
    });
  });
};

// Update user in the database
const updateUser = (userId, first_name, last_name) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE users SET first_name = ?, last_name = ? WHERE id = ?', [first_name, last_name, userId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// Delete user from the database
const deleteUser = (userId) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  getAllUsers,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
};
