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
    fullName: { // Добавляем поле для полного имени
        type: String,
        required: true,
    },
    avatar: { // Добавляем поле для аватара
        type: String,
    }
}, {
    timestamps: true,
});

reviewSchema.pre('save', async function(next) {
    const user = await mongoose.model('User').findById(this.author);
    if (user) {
        this.fullName = `${user.firstName} ${user.lastName}`;
        this.avatar = user.avatar;
    }
    next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
