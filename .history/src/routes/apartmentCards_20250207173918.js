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
  
  router.post("/", authMiddleware, verifyRole(["admin"]), upload.single("image"), async (req, res) => {
    try {
      const { title, description, price, bedroomCount, bathroomCount, type, buildYear, sqm } = req.body;
      const imagePath = "/uploads/" + req.file.filename;
  
      const newApartment = new ApartmentCard({
        title,
        description,
        price,
        bedroomCount,
        bathroomCount,
        type,
        image: imagePath,
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