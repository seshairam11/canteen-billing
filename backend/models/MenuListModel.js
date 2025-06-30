const mongoose = require('mongoose');

const MenuListSchema = new mongoose.Schema({
    menuItem: { type: String, required: true },
    price: { type: Number, required: true },
    importDate: { type: String, required: false },
    ExpiryDate: { type: String, required: false },
}, {
    collection: 'MenuList'
})

const MenuListModel = mongoose.model('MenuList', MenuListSchema);
module.exports = MenuListModel;