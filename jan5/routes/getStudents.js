const dbStudents = require('../models/students')

exports.getAll = (req, res) => {
    dbStudents.find({ createdBy: req.decoded.email, status: { $ne: -1 } }, (err, students) => {
        if (err) {
            res.json({
                success: false,
                msg: "Server Error"
            })
        } else if (!students || students.length == 0) {
            res.json({
                success: false,
                msg: "No students found."
            })
        } else {
            res.json({
                success: true,
                students: students
            })
        }
    })
}


exports.getOne = (req, res) => {
    if (!req.body.phone) {
        res.json({
            success: false,
            msg: "Please enter all details."
        })
    } else {
        dbStudents.findOne({ phone: req.body.phone, createdBy: req.decoded.email, status: { $ne: -1 } }, (err, students) => {
            if (err) {
                res.json({
                    success: false,
                    msg: "Server Error"
                })
            } else if (!students || students == null) {
                res.json({
                    success: false,
                    msg: "No students found."
                })
            } else {
                res.json({
                    success: true,
                    students: students
                })
            }
        })
    }
}