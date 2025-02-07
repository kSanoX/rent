const express = require('express');
const router = express.Router();
const multer = require("multer");
const ApartmentCard = require("../models/ApartmentCard");
const { verifyRole } = require("../middleware/authMiddleware");


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
  
  // 🔹 POST /api/apartments (Добавление квартиры, только для админов)
  router.post("/", verifyAdmin, upload.single("image"), async (req, res) => {
    try {
      const { title, description, price, bedroomCount, bathroomCount, type } = req.body;
      const imagePath = "/uploads/" + req.file.filename;
  
      const newApartment = new ApartmentCard({
        title,
        description,
        price,
        bedroomCount,
        bathroomCount,
        type,
        image: imagePath,
      });
  
      await newApartment.save();
      res.json({ success: true, apartment: newApartment });
    } catch (error) {
      console.error("Ошибка добавления квартиры:", error);
      res.status(500).json({ success: false, error: "Ошибка сервера" });
    }
  });

module.exports = router;