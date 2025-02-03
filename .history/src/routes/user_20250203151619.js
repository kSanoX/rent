const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Защищённый маршрут для получения данных пользователя
router.get('/user', async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ user: { username: user.username, email: user.email } });
    } catch (error) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
});

module.exports = router;
