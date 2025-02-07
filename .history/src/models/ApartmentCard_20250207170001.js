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
    sliderImg: {
        type: Query,
        require: false
    }
});

const ApartmentCard = mongoose.model('ApartmentCard', apartmentCardSchema);

module.exports = ApartmentCard;