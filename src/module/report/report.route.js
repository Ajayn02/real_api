const express = require('express')
const reportController = require('./report.controller')
const { jwtMiddleware, allowRoles } = require('../../common/middleware')

const router = express.Router()

router.route("/")
    .post(jwtMiddleware, allowRoles('user'), reportController.addReport)
    .get(jwtMiddleware, allowRoles('admin'), reportController.getAllReports)

router.route("/:id")
    .get(jwtMiddleware, allowRoles('admin'), reportController.getById)
    .put(jwtMiddleware, allowRoles('admin'), reportController.rejectReport)

router.route('/action/:id')
    .put(jwtMiddleware, allowRoles('admin'), reportController.takeReportAction)

module.exports = router