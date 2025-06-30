const { ObjectId } = require('mongodb');
const HotelBenchModel = require('../models/hotelBenchModel')
const MenuListModel = require('../models/MenuListModel')
exports.getServerOrderCompleted = async (Socket, io) => {
    Socket.on('joinServerOrderCompleted', async (joinQuery, collageid) => {
        try {
            Socket.join("mgr-orderup")
            const menuList = await MenuListModel.find()
            const hotelBench = await HotelBenchModel.find({ labelname: collageid })
            Socket.emit('sendServerOrderCompleted', {
                menuList,
                hotelBench
            });
        } catch (error) {
            console.log(error);
        }
    })
    Socket.on('deleteServerOrderCompleted', async (docId) => {
        const document = await HotelBenchModel.deleteOne({ _id: docId });
        console.log(document);
    })


}