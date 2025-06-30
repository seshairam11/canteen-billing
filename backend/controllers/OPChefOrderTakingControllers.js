const { ObjectId } = require('mongodb');
const HotelBenchModel = require('../models/hotelBenchModel')
exports.getChefOrderTaking = async (Socket, io) => {
    Socket.on('joinChefOrderTaking', async (id) => {
        try {
            Socket.join("mgr-orderup")
            const hotelBench = await HotelBenchModel.find();

            Socket.emit('sendChefrOrderTaking', {
                hotelBench
            });
        } catch (error) {
            console.log(error);
        }
    })
    Socket.on('updateChefOrderTaking', async (docId, newContent, ChefName) => {

        const filter = { _id: new ObjectId(docId) };
        const update = { $set: { ChefName: ChefName, status: "process", btn_values: newContent } };
        const options = { returnDocument: 'after', new: true };
        const document = await HotelBenchModel.findOneAndUpdate(filter, update, options);
        console.log(document);
        io.to("mgr-orderup").emit('documentUpdated', docId, document, "process");

    })
}