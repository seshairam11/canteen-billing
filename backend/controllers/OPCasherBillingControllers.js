const { ObjectId } = require('mongodb');
const HotelBenchModel = require('../models/hotelBenchModel');
const MenuListModel = require('../models/MenuListModel');
exports.getCasherBilling = async (Socket, io) => {
    Socket.on('joinCasherBilling', async (id) => {
        try {
            Socket.join("mgr-orderup")
            const menuList = await MenuListModel.find()
            const hotelBench = await HotelBenchModel.find()
            Socket.emit('sendCasherBilling', {
                menuList,
                hotelBench
            });
        } catch (error) {
            console.log(error);
        }
    })
    Socket.on('updateCasherBilling', async (docId, newContent) => {

        const filter = { _id: docId };
        const update = { $set: { status: "waiting", btn_values: newContent, ispayment: true } };
        const options = { returnDocument: 'after', new: true };

        const document = await HotelBenchModel.findOneAndUpdate(filter, update, options);
        console.log(document);
        io.to("mgr-orderup").emit('documentUpdated', docId, document, "waiting");
    })
}