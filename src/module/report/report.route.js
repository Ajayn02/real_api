const express = require('express')
const reportController = require('./report.controller')
const { jwtMiddleware, allowRoles } = require('../../common/middleware')

const router = express.Router()

router.route("/")
    .post(jwtMiddleware, allowRoles('user'), reportController.addReport)

module.exports = router