const express = require('express');
const Filter = require('../models/Filters'); 
const router = express.Router();

router.get('/filters', async (req, res) => {
  try {
    const filters = await Filter.find();

    const normalizedFilters = filters.map(filter => {
      const normalizedOptions = (filter.options || []).map(opt => {
        // Если объект с числовыми ключами — собираем строку
        if (
          typeof opt === 'object' &&
          opt !== null &&
          !Array.isArray(opt) &&
          Object.keys(opt).every(k => !isNaN(k))
        ) {
          return Object.values(opt).join('');
        }

        // Оставляем как есть: строки, числа, объекты типа { min, max }
        return opt;
      });

      return {
        ...filter.toObject(),
        options: normalizedOptions,
      };
    });

    res.json(normalizedFilters);
  } catch (err) {
    console.error('Error fetching filters:', err);
    res.status(500).json({ message: 'Failed to fetch filters' });
  }
});

module.exports = router;
