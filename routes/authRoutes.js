const app = require('express')

const authController = require('../controllers/authController')

require('express-group-routes')


var router = app.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)

module.exports = router