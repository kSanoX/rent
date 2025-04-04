const express = require("express");
const Review = require("../models/Review");
const User = require("../models/User");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
    try {
        const { user, rating, title, description, country } = req.body;
        const author = req.user.id; // Тепер req.user буде містити інформацію про користувача

        if (!user || !rating || !title || !description || !country) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Перевірка існування користувача, якому залишають відгук
        const existingUser = await User.findById(user);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const review = new Review({ user, author, rating, title, description, country });
        await review.save();

        res.status(201).json({ message: "Review added successfully", review });
    } catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});



router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const reviews = await Review.find({ user: userId }).populate("author", "firstName lastName avatar");

        res.json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;