const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

const router = express.Router();

// Predefined admin credentials (Optional: Store securely in DB)
const predefinedAdmin = {
  username: "admin",
  password: "admin123",
};

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username is "admin"
    if (username !== predefinedAdmin.username) {
      return res.status(400).json({ success: false, message: 'Invalid username or password' });
    }

    // Compare password
    const isMatch = password === predefinedAdmin.password;
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ username: "admin" }, process.env.JWT_SECRET, { expiresIn: '2h' });

    // Store token in HTTP-only cookie
    res.cookie('adminToken', token, {
      httpOnly: true,
      secure: false, // Change to true in production
      sameSite: 'strict',
    });

    res.json({ success: true, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Admin Logout
router.post('/logout', (req, res) => {
  res.clearCookie('adminToken');
  res.json({ success: true, message: 'Logged out' });
});

// Protected Route Example
router.get('/dashboard', (req, res) => {
  res.json({ message: 'Welcome to the Admin Dashboard!' });
});

module.exports = router;
