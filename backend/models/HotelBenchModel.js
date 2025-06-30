const mongoose = require('mongoose');

const hotelBenchSchema = new mongoose.Schema({
    labelname: { type: String, required: true, trim: true },
    status: { type: String, required: true },
    studentName: { type: String, required: false },
    ChefName: { type: String, required: false },
    showbutton: { type: Boolean, required: true },
    ispayment: { type: Boolean, required: true },
    btn_values: { type: Array, required: true }
}, {
    collection: "HotelBench"
})

const HotelBenchModel = mongoose.model('HotelBench', hotelBenchSchema);
module.exports = HotelBenchModel;