const express = require('express')
const app = express()

const routes = require('./routes')

require('dotenv').config()
require('express-async-errors')

// extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')
const errorHandlerMiddleware = require('./middleware/error-handler')



app.set('trust proxy', 1)
app.use(
    rateLimiter({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    })
)

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

//routes
app.use('/api/v1', routes)

app.use(errorHandlerMiddleware)


module.exports = app