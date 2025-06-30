const AccessEmployeeModel = require('../models/AccessEmployeeModel');

exports.viewEmployees = async (req, res, next) => {
    const requestData = req.body;
    try {
        const employeeList = await AccessEmployeeModel.find();
        res.json({
            isAuth: true,
            errormsg: employeeList,
        });

    } catch (err) {
        res.json({
            isAuth: false,
            errormsg: err,
        });
    }
}