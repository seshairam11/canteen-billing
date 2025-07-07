const accessStudentModel = require('../models/AccessStudentModel');

exports.viewStudent = async (req, res, next) => {
    const requestData = req.body;
    try {
        const studentList = await accessStudentModel.find({
            $or: [
                { mailID: requestData.loginID },
                { phone: requestData.loginID },
            ],
        });
        res.json({
            isAuth: true,
            errormsg: studentList,
        });

    } catch (err) {
        console.dir(err)
        res.json({
            isAuth: false,
            errormsg: err,
        });
    }
}

exports.addStudent = async (req, res, next) => {
    const requestData = req.body;
    console.log(requestData)
    try {
        const validateEmail = await accessStudentModel.findOne({ mailID: requestData.mailID });
        if (validateEmail === null) {
            const validatePhoneno = await accessStudentModel.findOne({ phone: requestData.phone });
            if (validatePhoneno === null) {
                const newStudentUser = await accessStudentModel.insertMany(requestData);
                console.log(newStudentUser);
                res.json({
                    isAuth: true,
                    errormsg: "login validate successfully",
                    value: newStudentUser
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

exports.deleteStudent = async (req, res, next) => {
    const requestData = req.body;
    try {
        const deletaData = await accessStudentModel.findByIdAndDelete(requestData._id)
        console.log(deletaData)
        res.json({
            isAuth: true,
            errormsg: deletaData,
        });
    } catch (err) {
        res.json({
            isAuth: false,
            errormsg: err,
        });
    }
}
exports.validateStudent = async (req, res, next) => {
    const requestData = req.body;
    console.dir(requestData);
    try {
        const studentList = await accessStudentModel.findOne({
            $or: [
                { mailID: requestData.loginid },
                { phone: requestData.loginid },
            ],
        });


        if (studentList.password == requestData.password) {
            res.json({
                isAuth: true,
                errormsg: studentList,
            });
        } else {
            res.json({
                isAuth: false,
                errormsg: "password is wrong",
            });
        }


    } catch (err) {
        console.dir(err)
        res.json({
            isAuth: false,
            errormsg: err,
        });
    }
}

exports.testing = async (req, res, next) => {
    res.json({
        isAuth: false,
        errormsg: "access denied",
    });
}   