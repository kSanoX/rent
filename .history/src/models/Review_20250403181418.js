const mongoose = require('mongoose');
const User = require('./User');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    avatar: { // Добавляем поле для аватара
        type: String,
    }
}, {
    timestamps: true,
});

// Перед сохранением, заполняем поле avatar из данных пользователя
reviewSchema.pre('save', async function(next) {
    const user = await mongoose.model('User').findById(this.author); // Получаем данные пользователя
    if (user) {
        this.avatar = user.avatar; // Заполняем аватаркой
    }
    next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
