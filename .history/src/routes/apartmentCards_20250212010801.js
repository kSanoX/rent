const express = require('express');
const ApartmentCard = require('../models/ApartmentCard');
const router = express.Router();
const {authMiddleware} = require("../middleware/authMiddleware");

router.get('/cards', async (req, res) => {
    console.log("cards zagrugen");
    try {
        const apartmentCards = await ApartmentCard.find();
        res.json(apartmentCards);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// 🔹 Фильтруем карточки по userId (ТОЛЬКО для авторизованного пользователя)
router.get('/user-cards', authMiddleware, async (req, res) => {
    console.log("Запрос на '/user-cards' получен.");

    try {
        const userId = req.user.id; // Получаем ID авторизованного пользователя
        console.log("ID текущего пользователя:", userId);

        const userCards = await ApartmentCard.find({ userId }); // Фильтруем карточки по userId
        console.log("Найдено карточек:", userCards.length);

        if (!userCards.length) {
            console.log("Нет карточек у этого пользователя.");
            return res.status(404).json({ success: false, error: "Карточки не найдены" });
        }

        res.json({ success: true, cards: userCards });
    } catch (error) {
        console.error("Ошибка при получении карточек:", error);
        res.status(500).json({ success: false, error: "Ошибка сервера" });
    }
});

// 🔹 Получение профиля ЛЮБОГО пользователя (БЕЗ авторизации)
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