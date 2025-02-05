require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const router = express.Router();

const authRoutes = require('./src/routes/auth');
const filtersRouter = require('./src/routes/filters');
const clientMessagesRoutes = require("./src/routes/clientMessages");
const apartmentCardsRoute = require('./src/routes/apartmentCards');
const CardModel = require('./src/models/ApartmentCard');
import User from "./src/models/User";

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
      const card = await CardModel.findById(_id); // Используем Mongoose для поиска по _id
      if (!card) {
        return res.status(404).json({ error: "Card not found" });
      }
      res.json(card);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  });

  router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

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
  

app.use('/api', apartmentCardsRoute);
app.use('/apartmentsImages', express.static(path.join(__dirname, 'public/apartmentsImages')));
app.use('/api', filtersRouter);
app.use("/api/messages", clientMessagesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
