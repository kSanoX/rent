const express = require('express');
const ApartmentCard = require('../models/ApartmentCard');
const router = express.Router();

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
      const userCards = await ApartmentCard.find({ userId: req.user.id });
  
      res.json({ success: true, cards: userCards });
    } catch (error) {
      console.error("Ошибка получения карточек:", error);
      res.status(500).json({ success: false, error: "Ошибка сервера" });
    }
  });

module.exports = router;