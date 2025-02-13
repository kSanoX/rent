const express = require('express');
const ApartmentCard = require('../models/ApartmentCard');
const router = express.Router();
const {authMiddleware} = require("../middleware/authMiddleware");

router.get('/cards', async (req, res) => {
    console.log("cards zagrugen");
    try {
        const apartmentCards = await ApartmentCard.find();
        res.json(apartmentCards);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.get('/user-cards', async (req, res) => {
    console.log("Запрос на '/user-cards' получен."); 

    try {
        const userId = req.user.id; // ✅ Берем ID авторизованного пользователя из токена
        console.log("Авторизованный пользователь:", userId);

        const userCards = await ApartmentCard.find({ user: userId }); // ✅ Фильтруем по userId
        console.log("Найдено карточек пользователя:", userCards.length);

        if (!userCards || userCards.length === 0) {
            return res.status(404).json({ success: false, error: "Карточки не найдены" });
        }

        res.json({ success: true, cards: userCards });
    } catch (error) {
        console.error("Ошибка при получении карточек:", error); 
        res.status(500).json({ success: false, error: "Ошибка сервера" });
    }
});


router.get('/profile-cards', authMiddleware, async (req, res) => {
    console.log("Запрос на '/user-cards' получен."); 

    try {
        const userId = req.user.id; // ✅ Берем ID авторизованного пользователя из токена
        console.log("Авторизованный пользователь:", userId);

        const userCards = await ApartmentCard.find({ user: userId }); // ✅ Фильтруем по userId
        console.log("Найдено карточек пользователя:", userCards.length);

        if (!userCards || userCards.length === 0) {
            return res.status(404).json({ success: false, error: "Карточки не найдены" });
        }

        res.json({ success: true, cards: userCards });
    } catch (error) {
        console.error("Ошибка при получении карточек:", error); 
        res.status(500).json({ success: false, error: "Ошибка сервера" });
    }
});


// 🔹 Получение профиля ЛЮБОГО пользователя (БЕЗ авторизации)
router.get('/user-profile/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        console.log("Запрос на профиль пользователя:", userId);

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, error: "Пользователь не найден" });
        }

        res.json({
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            avatar: user.avatar,
            message: user.message,
            email: user.email,
            phone: user.phone,
            twitter: user.twitter,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка сервера');
    }
});


module.exports = router;