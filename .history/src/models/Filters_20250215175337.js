const mongoose = require('mongoose');

const filterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  options: [
    {
      min: { type: Number, required: false },
      max: { type: Number, required: false },
      value: { type: String, required: false },
    }
  ]
});

const Filter = mongoose.model('Filter', filterSchema);

module.exports = Filter;
