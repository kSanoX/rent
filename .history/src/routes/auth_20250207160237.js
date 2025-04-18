const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authMiddleware, verifyRole } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/admin', authMiddleware, verifyRole(['admin']), (req, res) => {
  res.json({ message: 'Welcome, Admin!' });
});


router.get('/user', authMiddleware, async (req, res) => {
  try {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) return res.status(404).json({ error: 'User not found' });

      res.json(user);
  } catch (error) {
      res.status(500).json({ error: 'Server error' });
  }
});

router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
      const userExist = await User.findOne({ email });
      if (userExist) {
          return res.status(400).json({ error: 'Email is already taken' });
      }

      const newUser = new User({ 
          username, 
          email, 
          password, 
          role: role || "buyer",
      });
      
      await newUser.save();

      const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(201).json({ 
          token, 
          user: { 
              username: newUser.username, 
              email: newUser.email, 
              role: newUser.role,  // Теперь отправляем и роль
          } 
      });
  } catch (error) {
      res.status(500).json({ error: 'Error registering user' });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

  

module.exports = router;
