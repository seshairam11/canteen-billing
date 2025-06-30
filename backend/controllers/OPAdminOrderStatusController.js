const HotelBenchModel = require('../models/hotelBenchModel')
const MenuListModel = require('../models/MenuListModel')
exports.getAdminOrderStatus = async (Socket, io) => {
    Socket.on('joinAdminOrderStatus', async (joinstring, id) => {
        try {
            Socket.join("mgr-orderup")
            const menuList = await MenuListModel.find()
            const hotelBench = await HotelBenchModel.find()
            Socket.emit('sendAdminOrderStatus', {
                menuList,
                hotelBench
            });
        } catch (error) {
            console.log(error);
        }
    })
}