const express = require('express');
const Filter = require('../models/Filters'); 
const router = express.Router();

router.get('/filters', async (req, res) => {
  try {
    const filters = await Filter.find();
    res.json(filters);
  } catch (err) {
    console.error('Error fetching filters:', err);
    res.status(500).json({ message: 'Failed to fetch filters' });
  }
});

router.post("/add-option", authenticateToken, async (req, res) => {
  const { filterName, option } = req.body;

  if (!filterName || !option) {
    return res.status(400).json({ message: "filterName и option обязательны" });
  }

  try {
    let filter = await Filter.findOne({ filterName });

    if (!filter) {
      filter = new Filter({
        filterName,
        options: [option],
      });
    } else {
      if (!filter.options.includes(option)) {
        filter.options.push(option);
      } else {
        return res.status(409).json({ message: "Опция уже существует" });
      }
    }

    await filter.save();
    res.status(200).json({ message: "Опция добавлена", filter });
  } catch (err) {
    console.error("Ошибка при добавлении опции:", err);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
});


module.exports = router;
