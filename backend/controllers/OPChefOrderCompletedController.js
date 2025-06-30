const { ObjectId } = require('mongodb');
const HotelBenchModel = require('../models/hotelBenchModel')
exports.getChefOrderCompleted = async (Socket, io) => {
    Socket.on('joinChefOrderCompleted', async (id) => {
        try {
            Socket.join("mgr-orderup")
            const hotelBench = await HotelBenchModel.find()

            Socket.emit('sendChefrOrderCompleted', {
                hotelBench
            });
        } catch (error) {
            console.log(error);
        }
    })
    Socket.on('updateChefOrderCompleted', async (docId, newContent) => {

        const filter = { _id: docId };
        const update = { $set: { status: "close", btn_values: newContent } };
        const options = { returnDocument: 'after', new: true };

        const document = await HotelBenchModel.findOneAndUpdate(filter, update, options);
        console.log(document);
        io.to("mgr-orderup").emit('documentUpdated', docId, document, "close");

    })
}