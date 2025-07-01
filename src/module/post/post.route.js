const express = require('express')
const postController = require('./post.controller')
const { jwtMiddleware, allowRoles, uploadSingle } = require('../../common/middleware')

const router = express.Router()
router.route('/user')
    .get(jwtMiddleware, allowRoles('user', 'admin'), postController.getByUserId)

router.route('/')
    .post(jwtMiddleware, allowRoles('user', 'admin'), uploadSingle('image'), postController.addPost)
    .get(jwtMiddleware, allowRoles('user', 'admin'), postController.getHomePosts)

router.route('/:id')
    .get(jwtMiddleware, allowRoles('user', 'admin'), postController.getById)
    .put(jwtMiddleware, allowRoles('user', 'admin'), uploadSingle('image'), postController.update)
    .delete(jwtMiddleware, allowRoles('user', 'admin'), postController.deletePost)

module.exports = router


