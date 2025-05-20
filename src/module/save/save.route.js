const express = require('express')
const saveController = require('./save.controller')
const { jwtMiddleware, allowRoles } = require('../../common/middleware')

const router = express.Router()

router.route('/')
    .post(jwtMiddleware, allowRoles("user"), saveController.addToSave)
    .get(jwtMiddleware, allowRoles('user'), saveController.getByUserId)

router.route('/:id')
    .delete(jwtMiddleware, allowRoles('user'), saveController.deleteSavedItem)

module.exports = router