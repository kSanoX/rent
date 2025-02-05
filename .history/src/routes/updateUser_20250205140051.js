const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const router = express.Router();

router.put('/user/update', async (req, res) => {
  const { firstName, lastName, phone, message } = req.body;

  // Проверка на наличие авторизации (проверка JWT токена)
  const token = req.headers.authorization.split(' ')[1];  // Получаем токен из заголовка
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    // Декодируем JWT токен
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);  // Находим пользователя по ID из токена

    // Обновляем данные пользователя
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phone) user.phone = phone;
    if (message) user.message = message;

    await user.save();  // Сохраняем изменения в базе

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating profile' });
  }
});

module.exports = router;
