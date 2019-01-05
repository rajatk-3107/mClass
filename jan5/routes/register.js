const dbRegister = require('../models/login')

module.exports = (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.phone || !req.body.schoolName) {
        res.json({
            success: false,
            msg: "All details not provided."
        })
    } else {
        dbRegister.findOne({ email: req.body.email }, (err, loginData) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    msg: "Something went wrong."
                })
            } else if (!loginData || loginData == null) {
                new dbRegister({
                    email: req.body.email,
                    phone: req.body.phone,
                    password: req.body.password,
                    schoolName: req.body.schoolName,
                    address: {
                        line1: req.body.line1,
                        line2: req.body.line2,
                        city: req.body.city,
                        pincode: req.body.pincode
                    }
                }).save((err, savedData) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: "Please try again after some time."
                        })
                    } else {
                        res.json({
                            success: true,
                            msg: "User registered."
                        })
                    }
                })
            } else {
                res.json({
                    success: false,
                    msg: "Email already taken"
                })
            }
        })
    }
}