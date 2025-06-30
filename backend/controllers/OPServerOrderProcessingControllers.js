const { ObjectId } = require('mongodb');
const HotelBenchModel = require('../models/hotelBenchModel')
const MenuListModel = require('../models/MenuListModel')
exports.getServerOrderProcessing = async (Socket, io) => {
    Socket.on('joinServerOrderProcessing', async (joinstring, id) => {
        try {
            Socket.join("mgr-orderup")
            const menuList = await MenuListModel.find()
            const hotelBench = await HotelBenchModel.find({ labelname: id })
            Socket.emit('sendServerOrderProcessing', {
                menuList,
                hotelBench
            });
        } catch (error) {
            console.log(error);
        }
    })
    Socket.on('updateServerOrderProcessing', async (docId, newContent,) => {
        const BenchStatus = await HotelBenchModel.findOne({ _id: docId });
        console.log(BenchStatus);
        const filter = { _id: new ObjectId(docId) };
        const update = { $set: { status: BenchStatus.status === "close" ? "Processing" : BenchStatus.status, btn_values: newContent } };

        const document = await HotelBenchModel.updateOne(filter, update, { new: true, upsert: true });
        console.log(document)
        io.to("mgr-orderup").emit('documentUpdated', docId, newContent, "Processing");
    })


}