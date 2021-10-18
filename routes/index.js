const express = require("express")
const authRoutes = require('./authRoutes')
const jobRoutes = require('./jobRoutes')
const auth = require("../middleware/authMiddleware")

const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('../utils/swagger/api-v1-doc')

var app = express()

app.use("/auth", authRoutes)
app.use("/jobs", auth, jobRoutes)

//API documentation route 
app.use('/docs', swaggerUI.serve)
app.get('/docs', swaggerUI.setup(swaggerDocument))

app.get('/test', (req, res) => { 
    res.status(200).send("Test API is working!!!")
    console.log("yeah!")
    })

module.exports = app