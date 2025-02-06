const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const router = express.Router();
const cloudinary = require("../../cloudinaryConfig");

router.post("/upload-avatar", async (req, res) => {
  try {
    const { avatar, userId } = req.body;

    if (!avatar) {
      return res.status(400).json({ error: "No image provided" });
    }

    // Загружаем изображение в Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(avatar, {
      folder: "avatars",
    });

    // Обновляем ссылку на аватар в БД
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar: uploadResponse.secure_url },
      { new: true }
    );

    res.json({ avatar: user.avatar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Avatar upload failed" });
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