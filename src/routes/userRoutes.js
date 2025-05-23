const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const router = express.Router();
const mongoose = require('mongoose');
const multer = require("multer");


// Обновление профиля пользователя
// router.put('/user/update', async (req, res) => {
//   const { firstName, lastName, phone, message } = req.body;

//   const token = req.headers.authorization.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'Unauthorized' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log('Decoded JWT:', decoded);  // Выводим декодированный токен для диагностики
//     const user = await User.findById(decoded.id);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     if (firstName) user.firstName = firstName;
//     if (lastName) user.lastName = lastName;
//     if (phone) user.phone = phone;
//     if (message) user.message = message;

//     await user.save();
//     res.status(200).json({ message: 'Profile updated successfully', user });
//   } catch (error) {
//     console.error('Error while updating profile:', error);  // Выводим подробную ошибку
//     res.status(500).json({ message: 'Error updating profile', error: error.message });
//   }
// });

// router.get("/users", async (req, res) => {
//   try {
//       const users = await User.find({}, "firstName lastName avatar role"); // Добавляем поле role
//       res.json(users);
//   } catch (error) {
//       res.status(500).json({ error: "Ошибка получения пользователей" });
//   }
// });

// router.get("/users/:id", async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ error: "Ошибка получения профиля" });
//     }
// });

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "firstName lastName avatar role");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error getting user" });
  }
});


router.put('/user/update', async (req, res) => {
  const { firstName, lastName, phone, message } = req.body;

  const token = req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded JWT:', decoded);
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
    console.error('Error while updating profile:', error);
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
});


router.get("/users/:id", async (req, res) => {
  try {
      const userId = req.params.id;

      if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json({ message: "Неверный формат ID" });
      }

      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }
      res.json({
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
          role: user.role,
          email: user.email,
          phone: user.phone,
          message: user.message,
      });
  } catch (error) {
      res.status(500).json({ error: "Ошибка получения профиля", details: error.message });
  }
});



module.exports = router;
