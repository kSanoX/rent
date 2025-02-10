const express = require('express');
const ApartmentCard = require('../models/ApartmentCard');
const router = express.Router();
const { verifyRole, authMiddleware } = require("../middleware/authMiddleware");

router.get('/cards', async (req, res) => {
    try {
        const apartmentCards = await ApartmentCard.find();
        res.json(apartmentCards);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.get("/user-cards", authMiddleware, async (req, res) => {
    try {
      console.log("Запрос на карточки для пользователя с ID:", req.user.id); // Проверяем, что токен передан и decoded

      const userCards = await ApartmentCard.find({ userId: req.user.id });

      console.log("Найдено карточек для пользователя:", userCards.length); // Проверяем, сколько карточек найдено

      if (userCards.length === 0) {
        return res.status(404).json({ success: false, error: "Карточки не найдены" });
      }

      res.json({ success: true, cards: userCards });
    } catch (error) {
      console.error("Ошибка получения карточек:", error);
      res.status(500).json({ success: false, error: "Ошибка сервера" });
    }
});

module.exports = router;