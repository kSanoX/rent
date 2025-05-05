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

// Роут для добавления новой опции в фильтр
router.post(
  '/filters/add-option', // Используем одинаковый префикс для всех фильтров
  [
    body('filterName').isString().notEmpty(),
    body('option').isString().notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { filterName, option } = req.body;
    const token = req.headers.authorization?.split(' ')[1]; // Получение токена из заголовков

    // Проверка на наличие токена
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Проверяем, существует ли фильтр с таким именем
    try {
      const filter = await Filter.findOne({ name: filterName });
      if (!filter) {
        return res.status(404).json({ message: `Filter ${filterName} not found` });
      }

      // Проверка на наличие уже такой опции в фильтре
      if (filter.options.includes(option)) {
        return res.status(400).json({ message: `Option "${option}" already exists in the ${filterName} filter` });
      }

      // Добавляем новую опцию в фильтр
      filter.options.push(option);
      await filter.save();

      res.status(200).json({ message: 'Option added successfully', filter });
    } catch (error) {
      console.error('Error adding option:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
