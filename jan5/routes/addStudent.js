const dbStudents = require('../models/students')

module.exports = (req, res) => {
    if (!req.body.name || !req.body.phone) {
        res.json({
            success: false,
            msg: "All details not provided."
        })
    } else {
        var newStudent = new dbStudents({
            name: req.body.name,
            phone: req.body.phone,
            age: req.body.age,
            class: req.body.class,
            dob: req.body.dob,
            schoolName: req.decoded.schoolName,
            address: {
                line1: req.body.line1,
                line2: req.body.line2,
                city: req.body.city,
                state: req.body.state,
                pincode: req.body.pincode
            },
            createdBy: req.decoded.email
        })
        newStudent.save((err, data) => {
            if (err) {
                res.json({
                    success: false,
                    msg: "Server error."
                })
            } else {
                res.json({
                    success: true,
                    msg: "New student added",
                    savedData: data
                })
            }
        })
    }
}