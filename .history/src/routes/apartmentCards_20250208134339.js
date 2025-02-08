const express = require('express');
const router = express.Router();
const multer = require("multer");
const ApartmentCard = require("../models/ApartmentCard");
const { verifyRole, authMiddleware } = require("../middleware/authMiddleware");
const fs = require('fs');

// Проверяем и создаем папки, если их нет
const uploadDir = "uploads/";
const sliderDir = "public/apartmentsImages/slider";

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
if (!fs.existsSync(sliderDir)) fs.mkdirSync(sliderDir, { recursive: true });

// 🔹 Настройка загрузки изображений
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "image") {
      cb(null, "uploads/"); // Основное изображение в uploads/
    } else if (file.fieldname === "sliderImages") {
      cb(null, "public/apartmentsImages/slider"); // Слайдер в apartmentsImages/
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", authMiddleware, verifyRole(["admin"]), upload.fields([
  { name: "image", maxCount: 1 },
  { name: "sliderImages", maxCount: 5 }
]), async (req, res) => {
  try {
    const { title, description, price, bedroomCount, bathroomCount, type, buildYear, sqm } = req.body;

    const imagePath = req.files.image ? "/uploads/" + req.files.image[0].filename : null;

    const sliderImagesPaths = req.files.sliderImages ? req.files.sliderImages.map(file => "/apartmentsImages/" + file.filename) : [];

    const newApartment = new ApartmentCard({
      title,
      description,
      price,
      bedroomCount,
      bathroomCount,
      type,
      image: imagePath,
      sliderImages: sliderImagesPaths, // Массив с путями слайдерных изображений
      buildYear,
      propertySize: sqm,
    });

    await newApartment.save();
    res.json({ success: true, apartment: newApartment });
  } catch (error) {
    console.error("Ошибка добавления квартиры:", error);
    res.status(500).json({ success: false, error: "Ошибка сервера" });
  }
});

module.exports = router;
