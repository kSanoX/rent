const express = require('express');
const router = express.Router();
const multer = require("multer");
const ApartmentCard = require("../models/ApartmentCard");
const { verifyRole, authMiddleware } = require("../middleware/authMiddleware");


router.get('/cards', async (req, res) => {
    try {
        const apartmentCards = await ApartmentCard.find();
        res.json(apartmentCards);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// 🔹 Настройка загрузки изображений
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Папка для изображений
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

    const sliderImagesPaths = req.files.sliderImages ? req.files.sliderImages.map(file => "/uploads/" + file.filename) : [];

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
      propertySize: sqm, // здесь вы добавляете propertySize
    });

    await newApartment.save();
    res.json({ success: true, apartment: newApartment });
  } catch (error) {
    console.error("Ошибка добавления квартиры:", error);
    res.status(500).json({ success: false, error: "Ошибка сервера" });
  }
});

  


module.exports = router;