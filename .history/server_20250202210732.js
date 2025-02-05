require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authRoutes = require('./src/routes/auth');
const filtersRouter = require('./src/routes/filters');
const clientMessagesRoutes = require("./src/routes/clientMessages");
const apartmentCardsRoute = require('./src/routes/apartmentCards');
const CardModel = require('./src/models/ApartmentCard');
const User = require("./src/models/User");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

// Подключение к базе данных
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Маршрут для проверки сервера
app.get('/', (req, res) => res.send('Server is running'));

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

// Создание маршрутизатора для аутентификации
const router = express.Router();

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Регистрация
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ error: 'Email is already taken' });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token, user: { username: newUser.username, email: newUser.email } });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
});

module.exports = router;


// 🔹 Логин
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, user: { username: user.username, email: user.email } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.use('/api/auth', router);
app.use('/api', apartmentCardsRoute);
app.use('/apartmentsImages', express.static(path.join(__dirname, 'public/apartmentsImages')));
app.use('/api', filtersRouter);
app.use("/api/messages", clientMessagesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
