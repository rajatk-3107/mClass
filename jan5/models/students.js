const mongoose = require('mongoose')

const school = new mongoose.Schema({
    name: String,
    age: Number,
    class: Number,
    dob: Date,
    schoolName: {
        type: String,
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    address: {
        line1: String,
        line2: String,
        city: String,
        state: String,
        pincode: Number
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    marks: [{
        subject: String,
        marks: Number
    }],
    createdBy: String
})

module.exports = mongoose.model('student', school);