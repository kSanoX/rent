require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const User = require('./src/models/User');

const authRoutes = require('./src/routes/auth');
const filtersRouter = require('./src/routes/filters');
const clientMessagesRoutes = require("./src/routes/clientMessages");
const apartmentCardsRoute = require('./src/routes/apartmentCards');
const CardModel = require('./src/models/ApartmentCard');
const userRoutes = require("./src/routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Подключение к базе данных
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Маршрут для проверки сервера
app.get('/', (req, res) => res.send('Server is running'));


app.get('/api/user', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

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



app.use('/api', apartmentCardsRoute);
app.use('/apartmentsImages', express.static(path.join(__dirname, 'public/apartmentsImages')));
app.use('/api', filtersRouter);
app.use("/api/messages", clientMessagesRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
