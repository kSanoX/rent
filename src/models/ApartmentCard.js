const mongoose = require('mongoose');

const apartmentCardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    bedroomCount: {
        type: Number,
        required: true
    },
    bathroomCount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    sliderImages: {
        type:[String],
        require: false
    },
    propertySize : {
        type: Number,
        require: true
    },
    buildYear: {
        type: Number,
        require: true
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    location: {
        type: String,
        require: true
    },
    isApproved: {
        type: Boolean,
        default: false,
      },
});

const ApartmentCard = mongoose.model('ApartmentCard', apartmentCardSchema);

module.exports = ApartmentCard;