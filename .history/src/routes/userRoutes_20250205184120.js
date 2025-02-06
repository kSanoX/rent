const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const router = express.Router();
const cloudinary = require("../../cloudinaryConfig");

const fs = require("fs");

router.post("/upload-avatar", async (req, res) => {
    try {
        const { avatar, userId } = req.body;

        if (!avatar || !userId) {
            return res.status(400).json({ error: "Нет данных для загрузки" });
        }

        // Декодируем base64-строку в файл
        const base64Data = avatar.replace(/^data:image\/png;base64,/, ""); // Убираем префикс base64
        const filePath = `uploads/${userId}-avatar.png`;

        // Записываем файл на сервер
        fs.writeFileSync(filePath, base64Data, 'base64');

        // Загружаем файл на Cloudinary
        const result = await cloudinary.uploader.upload(filePath, {
            folder: "avatars",
        });

        fs.unlinkSync(filePath);

        res.json({ url: result.secure_url });

    } catch (error) {
        console.error("Ошибка загрузки:", error);
        res.status(500).json({ error: "Ошибка загрузки аватара" });
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