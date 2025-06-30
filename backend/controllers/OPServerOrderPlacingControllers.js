const HotelBenchModel = require('../models/hotelBenchModel')
const MenuListModel = require('../models/MenuListModel')
exports.getServerOrderPlacing = async (Socket, io) => {
    Socket.on('joinServerOrderPlacing', async (joinString) => {
        try {
            Socket.join("mgr-orderup")
            const menuList = await MenuListModel.find()
            console.log(menuList);
            Socket.emit('sendServerOrderPlacing', {
                menuList,
            });
        } catch (error) {
            console.log(error);
        }
    })
    Socket.on('updateServerOrderPlacing', async (newContent, studentName, collageid) => {
        const document = await HotelBenchModel.create({
            labelname: collageid,
            status: "payment",
            ispayment: false,
            studentName: studentName,
            showbutton: true,
            btn_values: newContent
        });
        console.log(document);
        io.to("mgr-orderup").emit('documentUpdated', "id", document, "payment");
    })


}