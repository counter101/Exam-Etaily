// controllers/userController.js
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const secretKey = 'secretKey_Here'; // Replace with the same secret key used in JWT server

// Middleware function to validate JWT
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.redirect('/');
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.redirect('/');
    }

    req.user = decoded;
    next();
  });
};

// Fetch all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json({ message: 'User list', users });
  } catch (error) {
    res.status(500).json({ error: `Error retrieving users from the database: ${error.message}` });
  }
};

// Create a new user
const createUser = async (req, res) => {
  const { username, first_name, last_name } = req.body;

  try {
    const existingUser = await userModel.getUserByUsername(username);

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const newUser = await userModel.createUser(username, first_name, last_name);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: `Error creating user: ${error.message}` });
  }
};

// Update user by ID
const updateUser = async (req, res) => {
  const userId = parseInt(req.params.id);
  const { first_name, last_name } = req.body;

  try {
    const result = await userModel.updateUser(userId, first_name, last_name);

    if (result.affectedRows > 0) {
      const updatedUser = { username: req.user.username, first_name, last_name, id: userId };
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: `Error updating user: ${error.message}` });
  }
};

// Delete user by ID
const deleteUser = async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const result = await userModel.deleteUser(userId);

    if (result.affectedRows > 0) {
      const deletedUser = { username: req.user.username, id: userId };
      res.json(deletedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: `Error deleting user: ${error.message}` });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
