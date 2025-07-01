const express = require('express')
const adminController = require('./admin.controller')
const { jwtMiddleware, allowRoles } = require('../../common/middleware')

const router = express.Router()

router.route("/posts")
    .get(jwtMiddleware, allowRoles('user', 'admin'), adminController.getAllPost)

router.route('/post-analytics')
    .get(jwtMiddleware, allowRoles('user', 'admin'), adminController.getAddPostAnalytics)

router.route('/user-analytics')
    .get(jwtMiddleware, allowRoles('user', 'admin'), adminController.getUserAnalytics)

module.exports = router