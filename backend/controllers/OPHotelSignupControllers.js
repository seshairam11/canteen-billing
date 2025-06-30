const AccessHotelModel = require('../models/AccessHotelModel')

exports.createHotelUser = async (req, res, next) => {
    const createUser = req.body;
    try {

        const validateEmail = await AccessHotelModel.findOne({ mailID: createUser.mailID });
        if (validateEmail === null) {
            const validatePhoneno = await AccessHotelModel.findOne({ phone: createUser.phone });
            if (validatePhoneno === null) {
                const newHotelUser = new AccessHotelModel(createUser);
                await newHotelUser.save();
                console.log(newHotelUser);
                res.json({
                    isAuth: true,
                    errormsg: "login validate successfully",
                    value: newHotelUser
                });
            } else {
                res.json({
                    isAuth: false,
                    errormsg: "phoneno already registered",
                });
            }
        } else {
            res.json({
                isAuth: false,
                errormsg: "EmailID already registered",
            });
        }
    } catch (err) {
        res.json({
            isAuth: false,
            errormsg: err,
        });
    }
}