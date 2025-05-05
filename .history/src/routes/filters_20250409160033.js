const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const Filter = require('../models/Filters'); // Подключение модели фильтров
const router = express.Router();

// Роут для получения всех фильтров
router.get('/filters', async (req, res) => {
  try {
    const filters = await Filter.find();
    res.json(filters);
  } catch (err) {
    console.error('Error fetching filters:', err);
    res.status(500).json({ message: 'Failed to fetch filters' });
  }
});
module.exports = router;
