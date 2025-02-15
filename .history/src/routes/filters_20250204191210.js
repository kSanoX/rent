const express = require('express');
const Filter = require('../models/Filters'); // Путь к вашей модели
const router = express.Router();

// Эндпоинт для получения всех фильтров
router.get('/filters', async (req, res) => {
  try {
    const filters = await Filter.find(); // База данных фильтров
    res.json(filters);  // Отправить фильтры как JSON
  } catch (err) {
    console.error('Error fetching filters:', err);
    res.status(500).json({ message: 'Failed to fetch filters' });
  }
});

module.exports = router;
