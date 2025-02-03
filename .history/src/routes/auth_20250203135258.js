const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Регистрация
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ error: 'Email is already taken' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
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
        console.log("🔹 Логин: полученные данные", { email, password });

        const user = await User.findOne({ email });
        if (!user) {
            console.log("❌ Пользователь не найден:", email);
            return res.status(400).json({ error: 'User not found' });
        }

        console.log("✅ Найден пользователь в БД:", user);

        console.log("📌 Пароль из запроса:", password);
        console.log("📌 Пароль из БД:", user.password);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("🔍 Совпадает ли пароль:", isMatch);

        if (!isMatch) {
            console.log("❌ Неверный пароль для:", email);
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        console.log("✅ Успешный вход для пользователя:", user.email);

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { username: user.username, email: user.email } });
    } catch (error) {
        console.error("❌ Ошибка при логине:", error);
        res.status(500).json({ error: 'Error logging in' });
    }
});

module.exports = router;
