const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  value: { type: String, required: true },
});

const filterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  options: {
    type: [optionSchema],
    required: true
  },
});

module.exports = mongoose.model('Filter', filterSchema);
