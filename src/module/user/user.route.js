const express = require('express')
const userController = require('./user.controller')
const { jwtMiddleware, allowRoles, uploadSingle } = require('../../common/middleware')

const router = express.Router()

router.route('/user')
    .get(jwtMiddleware,allowRoles('user'),userController.getUniqueUser)

router.route("/")
    .put(jwtMiddleware, allowRoles('user'), uploadSingle('image'), userController.updateUser)
    .get(jwtMiddleware, allowRoles('admin'), userController.getAllUsers)

router.route("/:id")
    .delete(jwtMiddleware, allowRoles('admin', 'admin'), userController.deleteUser)

module.exports = router