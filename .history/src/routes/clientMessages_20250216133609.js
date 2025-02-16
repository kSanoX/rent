const express = require("express");
const router = express.Router();
const ClientMessage = require("../models/ClientMessage");

router.post("/submit", async (req, res) => {
  try {
    const { first_name, last_name, email, phone, location, type, bathrooms, bedrooms, budget, message, agree } = req.body;

    const newMessage = new ClientMessage({
      first_name,
      last_name,
      email,
      phone,
      location,
      type,
      bathrooms,
      bedrooms,
      budget,
      message,
      agree,
    });

    await newMessage.save();
    res.status(200).json({ message: "Message submitted successfully!" });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Failed to submit message" });
  }
});

module.exports = router;
