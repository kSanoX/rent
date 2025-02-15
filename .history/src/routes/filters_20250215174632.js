const express = require('express');
const Filter = require('../models/Filters'); 
const router = express.Router();

router.get('/filters', async (req, res) => {
  try {
    const filters = await Filter.find();
    console.log('Filters fetched:', filters);
    res.json(filters);
  } catch (err) {
    console.error('Error fetching filters:', err);
    res.status(500).json({ message: 'Failed to fetch filters' });
  }
});


module.exports = router;
