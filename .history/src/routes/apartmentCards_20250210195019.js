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

router.get('/user-cards/:id', authMiddleware, async (req, res) => {
    console.log("Запрос на '/user-cards' получен."); // Лог, что запрос дошел до этого маршрута

    try {
        const userCards = await ApartmentCard.find({ userId: req.params.id });
        console.log("Найдено карточек:", userCards.length); // Логирование количества карточек

        if (!userCards || userCards.length === 0) {
            console.log("Нет карточек для этого пользователя.");
            return res.status(404).json({ success: false, error: "Карточки не найдены" });
        }

        res.json({ success: true, cards: userCards });
    } catch (error) {
        console.error("Ошибка при получении карточек:", error); // Логирование ошибки
        res.status(500).json({ success: false, error: "Ошибка сервера" });
    }
});


router.get('/user-profile/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, error: "Пользователь не найден" });
        }

        // Возвращаем информацию о пользователе без данных, требующих авторизации
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