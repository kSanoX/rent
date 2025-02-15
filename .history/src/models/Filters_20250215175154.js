const mongoose = require('mongoose');

const filterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  options: [String]  // Храним строки в массиве
});

const Filter = mongoose.model('Filter', filterSchema);

module.exports = Filter;
