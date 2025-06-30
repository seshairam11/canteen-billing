const mongoose = require('mongoose');

const accessHotelSchema = new mongoose.Schema({
    mailID: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userName: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
}, {
    collection: 'AccessHotels'
});

const accessHotelModel = mongoose.model('AccessHotels', accessHotelSchema);
module.exports = accessHotelModel;
