const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/school', (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Connected to Database")
    }
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// app.get('/first', (req, res) => {
//     console.log(req.headers)
//     res.json({
//         success: true
//     })
// })
// app.post('/first', (req, res) => {
//     console.log(req.body)
//     res.json({
//         success: true
//     })
// })
const dbStudents = require('./models/students')
app.post('/addStudent', (req, res) => {
    if (!req.body.name || !req.body.phone) {
        res.json({
            success: false,
            msg: "All details not provided."
        })
    } else {
        var newStudent = new dbStudents({
            name: req.body.name,
            phone: req.body.phone
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
})

app.get('/getStudents', (req, res) => {
    dbStudents.find({}, (err, data) => {
        if (err) {
            res.json({
                success: false,
                msg: "Server error."
            })
        } else {
            res.json({
                success: true,
                data: data
            })
        }
    })
})

app.listen(3000, () => {
    console.log("Server started at port 3000")
})