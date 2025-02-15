const mongoose = require('mongoose');

const filterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  options: [
    {
      min: { type: Number, required: false }, // Для цен и площади
      max: { type: Number, required: false }, // Для цен и площади
      value: { type: String, required: true }, // Для других типов фильтров, например, location
    }
  ]
});

const Filter = mongoose.model('Filter', filterSchema);

module.exports = Filter;
