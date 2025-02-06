import express from "express";
import multer from "multer";
import path from "path";
import User from "../models/User.js";

const router = express.Router();

// Настроим хранилище для Multer
const storage = multer.diskStorage({
  destination: "uploads/", // Папка для загрузки
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Эндпоинт для загрузки аватара
router.post("/upload-avatar", upload.single("avatar"), async (req, res) => {
  try {
    const userId = req.body.userId; // Получаем ID пользователя
    const avatarPath = `/uploads/${req.file.filename}`; // Путь к файлу

    // Обновляем пользователя в БД
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

// Раздаём статические файлы (чтобы фронт мог их загружать)
router.use("/uploads", express.static("uploads"));

module.exports = router;
