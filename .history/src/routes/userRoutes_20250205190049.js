const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../../cloudinaryConfigcloudinary"); 
const { v4: uuidv4 } = require("uuid");

const upload = multer();

app.post("/upload-avatar", upload.single("avatar"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("Нет файла для загрузки.");
    }

    // Загружаем изображение в Cloudinary
    const result = await cloudinary.uploader.upload(req.file.buffer, {
      public_id: `avatars/${uuidv4()}`, // создаём уникальное имя для изображения
    });

    // Ответ с ссылкой на изображение
    res.json({
      message: "Изображение успешно загружено!",
      imageUrl: result.secure_url, // возвращаем URL изображения
    });
  } catch (error) {
    console.error("Ошибка загрузки изображения:", error);
    res.status(500).send("Ошибка загрузки аватара.");
  }
});

router.put('/user/update', async (req, res) => {
  const { firstName, lastName, phone, message } = req.body;

  const token = req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded JWT:', decoded);  // Выводим декодированный токен для диагностики
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phone) user.phone = phone;
    if (message) user.message = message;

    await user.save();
    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Error while updating profile:', error);  // Выводим подробную ошибку
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
});



module.exports = router;