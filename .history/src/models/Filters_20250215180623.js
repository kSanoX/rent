const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  // Для price и propertySize
  min: { type: Number },
  max: { type: Number },
  // Для location, type, buildYear (строки)
  value: { type: String },
});

const filterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // Используем массив опций, где каждая опция - это объект
  options: { 
    type: [optionSchema], 
    required: true 
  },
});

module.exports = mongoose.model('Filter', filterSchema);