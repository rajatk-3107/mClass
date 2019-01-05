const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.connect('mongodb://test:plmnko09876@ds121726.mlab.com:21726/school', { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Connected to Database")
    }
})
app.set('key', 'D3V3L0PM3N1')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const routes = require('./routes/routes')
app.use('/api', routes)


app.listen(3000, () => {
    console.log("Server started at port 3000")
})