const mongoose = require("mongoose");

const clientMessageSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  phone: String,
  location: String,
  type: String,
  bathrooms: String,
  bedrooms: String,
  budget: String,
  message: String,
  agree: Boolean,
});

module.exports = mongoose.model("ClientMessage", clientMessageSchema);
