import express from "express";
import Review from "../models/Review.js";
import User from "../models/User.js";
const router = express.Router();

// Создать отзыв
router.post("/", async (req, res) => {
    try {
        const { user, rating, title, description, country } = req.body;
        const author = req.user.id; // ID текущего авторизованного пользователя

        if (!user || !rating || !title || !description || !country) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Проверим, существует ли пользователь, которому оставляют отзыв
        const existingUser = await User.findById(user);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const review = new Review({ user, author, rating, title, description, country });
        await review.save();

        res.status(201).json({ message: "Review added successfully", review });
    } catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Получить отзывы пользователя
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

export default router;
