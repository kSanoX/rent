require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./src/routes/auth');
const filtersRouter = require('./src/routes/filters');
const clientMessagesRoutes = require("./src/routes/clientMessages");
const apartmentCardsRoute = require('./src/routes/apartmentCards');
const CardModel = require('./src/models/ApartmentCard'); // Убедитесь, что путь правильный

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
  

app.use('/api', apartmentCardsRoute);
app.use('/apartmentsImages', express.static(path.join(__dirname, 'public/apartmentsImages')));
app.use('/api', filtersRouter);
app.use("/api/messages", clientMessagesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
