const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


router.get('/user', authMiddleware, async (req, res) => {
  try {
      const user = await User.findById(req.user.id).select('-password'); // убираем пароль из ответа
      if (!user) return res.status(404).json({ error: 'User not found' });

      res.json(user);
  } catch (error) {
      res.status(500).json({ error: 'Server error' });
  }
});

// Регистрация пользователя
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ error: 'Email is already taken' });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token, user: { username: newUser.username, email: newUser.email } });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Проверка на наличие пользователя по email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Проверка пароля
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Генерация JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

  

module.exports = router;
