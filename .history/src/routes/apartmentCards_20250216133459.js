const express = require('express');
const ApartmentCard = require('../models/ApartmentCard');
const User = require('../models/User'); // Добавил импорт User
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");

router.get('/cards', async (req, res) => {
    console.log("Запрос на '/cards' получен.");
    try {
        const apartmentCards = await ApartmentCard.find();
        res.json(apartmentCards);
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка сервера');
    }
});

router.get('/my-cards', authMiddleware, async (req, res) => {
    console.log("Запрос на '/my-cards' получен.");

    try {
        const userId = req.user.id;
        console.log("Авторизованный пользователь:", userId);

        const userCards = await ApartmentCard.find({ userId: userId });
        console.log("Найдено карточек пользователя:", userCards.length);

        if (!userCards.length) {
            return res.status(404).json({ success: false, error: "You don't have any cards at the moment." });
        }

        res.json({ success: true, cards: userCards });
    } catch (error) {
        console.error("Ошибка при получении карточек:", error);
        res.status(500).json({ success: false, error: "Ошибка сервера" });
    }
});

router.get('/user-cards/:id', async (req, res) => {
    console.log("request in '/user-cards' recieved.");

    try {
        const userId = req.params.id;
        console.log("User cards:", userId);

        const userCards = await ApartmentCard.find({ userId: userId });

        if (!userCards.length) {
            return res.status(404).json({ success: false, error: "You don't have any cards at the moment." });
        }

        res.json({ success: true, cards: userCards });
    } catch (error) {
        console.error("request error:", error);
        res.status(500).json({ success: false, error: "Server err" });
    }
});

router.get('/user-profile/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        res.json({
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            avatar: user.avatar,
            message: user.message,
            email: user.email,
            phone: user.phone,
            twitter: user.twitter,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('server error');
    }
});

module.exports = router;
