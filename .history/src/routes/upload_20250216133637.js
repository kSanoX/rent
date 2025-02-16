const express = require("express");
const multer = require("multer");
const path = require("path");
const User = require("../models/User.js");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/upload-avatar", upload.single("avatar"), async (req, res) => {
  try {
    const userId = req.body.userId;
    const avatarPath = `/uploads/${req.file.filename}`;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar: avatarPath },
      { new: true }
    );

    res.json({ success: true, avatar: updatedUser.avatar });
  } catch (error) {
    console.error("Ошибка загрузки:", error);
    res.status(500).json({ error: "Ошибка загрузки" });
  }
});

router.use("/uploads", express.static("uploads"));

module.exports = router;
