const jwt = require('jsonwebtoken');
const express = require('express');

const authMiddleware = (req, res, next) => {
    console.log("authMiddleware сработал");
    const token = req.header('Authorization');
    console.log("Authorization header:", token);

    if (!token) {
        console.log("Нет токена!");
        return res.status(401).json({ error: "No token, authorization denied" });
    }

    try {
        const tokenValue = token.split(" ")[1]; // Токен повинен бути у форматі 'Bearer <token>'
        console.log("tokenValue:", tokenValue);

        if (!tokenValue) {
            console.log("Некорректный формат токена!");
            return res.status(401).json({ error: "Malformed token" });
        }

        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET); // Верифікація токену
        console.log("Decoded token:", decoded);

        req.user = decoded; // Додаємо декодований користувач до запиту
        next(); // Продовжуємо обробку запиту
    } catch (err) {
        console.error("Ошибка при верификации токена:", err);
        res.status(401).json({ error: "Invalid token" });
    }
};

const verifyRole = (roles) => (req, res, next) => {
    console.log("User role:", req.user ? req.user.role : "No user");
    console.log("Allowed roles:", roles);

    if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Access denied' });
    }
    next();
};

module.exports = { authMiddleware, verifyRole };
