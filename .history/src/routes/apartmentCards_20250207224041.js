const express = require('express');
const router = express.Router();
const multer = require('multer');
const ApartmentCard = require('../models/ApartmentCard');
const { verifyRole, authMiddleware } = require('../middleware/authMiddleware');

// Настройка загрузки для cover image
const coverStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Папка для cover image
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// Настройка загрузки для изображений слайдера
const sliderStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/apartmentsImages/slider/'); // Папка для слайдерных изображений
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// Миддлвары для загрузки файлов
const uploadCover = multer({ storage: coverStorage });
const uploadSlider = multer({ storage: sliderStorage });

// Обработчик для загрузки слайдерных изображений
router.post('/upload-slider-images', uploadSlider.array('sliderImages', 5), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }
    const sliderImagesPaths = req.files.map(file => '/apartmentsImages/slider/' + file.filename);
    res.json({ imagePaths: sliderImagesPaths });
  } catch (err) {
    console.error('Error uploading images:', err);
    res.status(500).json({ error: 'Failed to upload images' });
  }
});

// Обработчик для добавления новой квартиры
router.post(
  '/',
  authMiddleware,
  verifyRole(['admin']),
  uploadCover.single('image'), // для обложки
  uploadSlider.array('sliderImages', 5), // для слайдера, максимум 5 изображений
  async (req, res) => {
    try {
      const { title, description, price, bedroomCount, bathroomCount, type, buildYear, sqm } = req.body;

      // Формируем пути для изображений
      const imagePath = req.file ? '/uploads/' + req.file.filename : null;
      const sliderImagesPaths = req.files ? req.files.map(file => '/apartmentsImages/slider/' + file.filename) : [];

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
        propertySize: sqm, // Здесь добавляется propertySize
      });

      await newApartment.save();
      res.json({ success: true, apartment: newApartment });
    } catch (error) {
      console.error('Ошибка добавления квартиры:', error);
      res.status(500).json({ success: false, error: 'Ошибка сервера' });
    }
  }
);

module.exports = router;
