const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  min: { type: Number },
  max: { type: Number },
  value: { type: String },
});

const filterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  options: { 
    type: [optionSchema], 
    required: true 
  },
});

module.exports = mongoose.model('Filter', filterSchema);