const express = require('express');
const ApartmentCard = require('../models/ApartmentCard');
const router = express.Router();

router.get('/cards', async (req, res) => {
    try {
        console.log("GET /api/cards was called");  // Логируем вызов маршрута
        const apartmentCards = await ApartmentCard.find();
        res.json(apartmentCards);
    } catch (err) {
        console.error("Error fetching cards:", err);
        res.status(500).send('Server Error');
    }
});


module.exports = router;