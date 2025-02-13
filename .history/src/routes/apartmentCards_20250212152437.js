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

// 🔹 Карточки пользователя (Требует авторизации)
router.get('/my-cards', authMiddleware, async (req, res) => {
    console.log("Запрос на '/my-cards' получен.");

    try {
        const userId = req.user.id;
        console.log("Авторизованный пользователь:", userId);

        const userCards = await ApartmentCard.find({ user: userId }).populate('user', 'firstName lastName avatar');
        console.log("Найдено карточек пользователя:", userCards.length);

        if (!userCards.length) {
            return res.status(404).json({ success: false, error: "Карточки не найдены" });
        }

        res.json({ success: true, cards: userCards });
    } catch (error) {
        console.error("Ошибка при получении карточек:", error);
        res.status(500).json({ success: false, error: "Ошибка сервера" });
    }
});

// 🔹 Получение карточек пользователя (Не требует авторизации, но нужен userId)
router.get('/user-cards/:id', async (req, res) => {
    console.log("Запрос на '/user-cards' получен.");

    try {
        const userId = req.params.id;
        console.log("Карточки пользователя:", userId);

        const userCards = await ApartmentCard.find({ user: userId }).populate('user', 'firstName lastName avatar');

        if (!userCards.length) {
            return res.status(404).json({ success: false, error: "Карточки не найдены" });
        }

        res.json({ success: true, cards: userCards });
    } catch (error) {
        console.error("Ошибка при получении карточек:", error);
        res.status(500).json({ success: false, error: "Ошибка сервера" });
    }
});

// 🔹 Получение профиля пользователя (БЕЗ авторизации)
router.get('/user-profile/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        console.log("Запрос на профиль пользователя:", userId);

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, error: "Пользователь не найден" });
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
        res.status(500).send('Ошибка сервера');
    }
});

module.exports = router;
