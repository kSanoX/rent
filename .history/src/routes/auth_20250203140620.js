const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ error: 'Email is already taken' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('🔹 Хеш пароля перед сохранением:', hashedPassword);  // Логируем хеш
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token, user: { username: newUser.username, email: newUser.email } });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
});

// Логин
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'User not found' });

        console.log('🔹 Полученные данные для логина', { email, password });
        console.log('🔍 Найденный пользователь:', user);
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('🔍 Совпадение пароля:', isMatch);

        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { username: user.username, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
});



module.exports = router;
