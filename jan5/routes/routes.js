const express = require('express')
const app = express()
const verify = require('./tokenVerify')

const register = require('./register')
app.post('/register', register)

const login = require('./login')
app.post('/login', login)


/**
 * Middleware example
 */
// var middleware = (req, res, next) => {
//     console.log("This is from middleware")
//     req.abc = 'gdhcg'
//     next();
// }
// var final = (req, res) => {
//     console.log("Final function")
//     res.json({
//         req: req.abc
//     })
// }
// app.get('/middleware', middleware, final)

const addStudent = require('./addStudent')
app.post('/addStudent', verify, addStudent)

const getStudents = require('./getStudents')
app.get('/getAll', verify, getStudents.getAll)
app.get('/single', verify, getStudents.getOne)

/**
 * Update student
 */
const updateStudent = require('./editStudents')
app.post('/update', verify, updateStudent)


module.exports = app