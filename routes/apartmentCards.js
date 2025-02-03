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

module.exports = router;