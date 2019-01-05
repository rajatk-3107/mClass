const dbStudents = require('../models/students')

module.exports = (req, res) => {
    if (!req.body.id) {
        res.json({
            success: false,
            msg: "Please enter all details."
        })
    } else {
        var query = { $push: {}, $set: {} }
        var field = Object.keys(req.body)
        field.forEach(e => {
            if (e == 'marks') {
                query.$push[e] = req.body[e]
            } else {
                query.$set[e] = req.body[e]
            }
        })
        dbStudents.findOne({ _id: req.body.id }, (err, student) => {
            if (err) {
                res.json({
                    success: false,
                    msg: "Server Error."
                })
            } else if (!student || student == null) {
                res.json({
                    success: false,
                    msg: "Student not found."
                })
            } else {
                if (Object.keys(query.$push).length == 0) {
                    delete query.$push
                }
                dbStudents.findOneAndUpdate({ _id: req.body.id }, query, (err, updated) => {
                    if (err) {
                        console.log(err)
                        res.json({
                            success: false,
                            msg: "Server Error."
                        })
                    } else {
                        res.json({
                            success: true,
                            msg: "Student details updated."
                        })
                    }
                })
            }
        })
    }

}