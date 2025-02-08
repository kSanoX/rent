const express = require('express');
const multer = require('multer');
const path = require('path');

// Настройка хранилища для multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Папка для хранения изображений
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Уникальное имя для файла
  }
});

const upload = multer({ storage: storage });

const router = express.Router();

// Маршрут для загрузки изображений
router.post('/upload-slider-images', upload.array('images', 10), (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({ error: 'No files uploaded' });
    }
    res.status(200).json({ files: req.files });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
