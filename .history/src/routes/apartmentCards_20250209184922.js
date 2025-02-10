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

router.get("/test", (req, res) => {
    console.log("Маршрут /test работает!");
    res.json({ message: "OK" });
});

router.get("api/user-cards", authMiddleware, async (req, res) => {
    console.log("Запрос на '/user-cards' получен."); // Лог, что запрос дошел до этого маршрута

    try {
        const userCards = await ApartmentCard.find({ userId: req.user.id });
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


module.exports = router;