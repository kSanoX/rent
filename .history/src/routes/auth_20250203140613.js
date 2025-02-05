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

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log("🔹 Логин: полученные данные", { email, password });

    try {
        const user = await User.findOne({ email });
        console.log("🔍 Найденный пользователь:", user);

        if (!user) {
            console.log("❌ Ошибка: пользователь не найден!");
            return res.status(400).json({ error: 'User not found' });
        }

        console.log('🔹 Логин: полученные данные', req.body);
const isMatch = await bcrypt.compare(password, user.password);
console.log('🔍 Совпадение пароля:', isMatch);


        if (!isMatch) {
            console.log("❌ Ошибка: пароль неверный!");
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("✅ Успешный вход, токен:", token);

        res.json({ token, user: { username: user.username, email: user.email } });
    } catch (error) {
        console.error("❌ Ошибка при логине:", error);
        res.status(500).json({ error: 'Error logging in' });
    }
});


module.exports = router;
