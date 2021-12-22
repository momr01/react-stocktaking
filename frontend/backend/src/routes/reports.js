const { Router } = require('express')
const router = Router()

const { getReports, createReport, getReport } = require('../controllers/report.controller')

router.route('/')
    .get(getReports)
    .post(createReport)


router.route('/:idTool')
    .get(getReport)


module.exports = router;