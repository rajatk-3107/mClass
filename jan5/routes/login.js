const dbLogin = require('../models/login')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.json({
            success: true,
            msg: "Please enter all details"
        })
    } else {
        dbLogin.findOne({ email: req.body.email }, (err, loginData) => {
            if (err) {
                res.json({
                    success: false,
                    msg: "Server error."
                })
            } else if (!loginData || loginData == null) {
                res.json({
                    success: false,
                    msg: "Please register first."
                })
            } else if (req.body.password != loginData.password) {
                res.json({
                    success: false,
                    msg: "Incorrect password."
                })
            } else {
                var secretKey = req.app.get('key')
                var token = jwt.sign({ email: loginData.email, schoolName: loginData.schoolName }, secretKey)
                res.json({
                    success: true,
                    msg: "Login Successfull",
                    token: token
                })
            }
        })
    }
}