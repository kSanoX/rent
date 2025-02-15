const mongoose = require('mongoose');

const filterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  options: [
    {
      value: { type: mongoose.Schema.Types.Mixed, required: true }, // Здесь может быть строка или объект
    }
  ]
});

const Filter = mongoose.model('Filter', filterSchema);

module.exports = Filter;
