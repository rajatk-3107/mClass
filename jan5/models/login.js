const mongoose = require('mongoose')
const Schema = mongoose.Schema

const login = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    phone: Number,
    schoolName: String,
    address: {
        line1: String,
        line2: String,
        city: String,
        pincode: Number
    }
})

module.exports = mongoose.model('login', login)