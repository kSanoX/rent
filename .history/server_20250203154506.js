require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const authRoutes = require('./src/routes/auth');
const filtersRouter = require('./src/routes/filters');
const clientMessagesRoutes = require("./src/routes/clientMessages");
const apartmentCardsRoute = require('./src/routes/apartmentCards');
const CardModel = require('./src/models/ApartmentCard');
const User = require('./src/models/User');  // Импортируем модель User для аутентификации
// Вставь перед другими маршрутами
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');  // или '*' для всех источников
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


const app = express();

// Используем JSON парсер для запросов
app.use(express.json());

// Подключение к базе данных
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Маршрут для проверки сервера
app.get('/', (req, res) => res.send('Server is running'));

// Получение карточек квартир по ID
app.get("/api/cards/:_id", async (req, res) => {
    const { _id } = req.params;
    try {
      const card = await CardModel.findById(_id);
      if (!card) {
        return res.status(404).json({ error: "Card not found" });
      }
      res.json(card);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
});

// Аутентификация пользователя (если используется токен)
const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // получаем токен из заголовков
    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    try {
        // Если используешь JWT, можешь тут его проверку (например с использованием jwt.verify)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // помещаем информацию о пользователе в объект запроса
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Invalid token' });
    }
};

// Получение данных о пользователе
app.get('/api/user', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.id); // или другой способ получения пользователя по токену
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ user });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Используем маршруты
app.use('/api/auth', authRoutes);
app.use('/api', apartmentCardsRoute);
app.use('/apartmentsImages', express.static(path.join(__dirname, 'public/apartmentsImages')));
app.use('/api', filtersRouter);
app.use("/api/messages", clientMessagesRoutes);

// Статические файлы для фронтенда (если у тебя есть фронтенд-сайт, который нужно обслужить)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build'))); // Пример для React приложения
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
