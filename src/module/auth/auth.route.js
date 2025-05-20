const express = require('express')
const authController = require('./auth.controller')

const router = express.Router()

router.route("/")
    .post(authController.signup)

router.route("/signup")
    .post(authController.signin)    

module.exports = router