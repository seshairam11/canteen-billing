const AccessEmployeeModel = require('../models/AccessEmployeeModel');

exports.validateUserAccess = async (req, res, next) => {
    const validateUser = req.body;
    try {
        const loginCredential = await AccessEmployeeModel.findOne({
            $or: [
                { mailID: validateUser.loginID },
                { phone: validateUser.loginID },
            ],
        });

        if (loginCredential !== null) {
            if (loginCredential.password === validateUser.password) {
                res.json(
                    {
                        isAuth: true,
                        errmsg: "Login Successfully",
                        value: loginCredential,
                    })
            } else {
                res.json({
                    isAuth: false,
                    errmsg: "Wrong Password",
                });
            }
        } else {
            res.json({
                isAuth: false,
                errmsg: "LoginID didn't matched",
            });
        }
    } catch (error) {
        console.log(error)
        res.json({
            isAuth: false,
            errmsg: error,
        });
    }
};
