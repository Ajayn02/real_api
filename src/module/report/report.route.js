const express = require('express')
const reportController = require('./report.controller')
const { jwtMiddleware, allowRoles } = require('../../common/middleware')

const router = express.Router()

router.route("/")
    .post(jwtMiddleware, allowRoles('user'), reportController.addReport)
    .get(jwtMiddleware, allowRoles('admin', 'user'), reportController.getAllReports)

router.route("/:id")
    .get(jwtMiddleware, allowRoles('admin', 'user'), reportController.getById)
    .delete(jwtMiddleware, allowRoles('admin', 'user'), reportController.removeReport)

module.exports = router