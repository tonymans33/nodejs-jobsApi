const app = require('express')

const jobController = require('../controllers/jobController')

require('express-group-routes')


var router = app.Router()
router.route('/')
    .post(jobController.createJob)
    .get(jobController.getAllJobs)

router.route('/:id')
    .get(jobController.getJob)
    .patch(jobController.updateJob)
    .delete(jobController.deleteJob)

module.exports = router