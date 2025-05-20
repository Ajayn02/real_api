const express = require('express')
const authController = require('./auth.controller')

const router = express.Router()

router.route("/")
    .post(authController.signup)

router.route("/login")
    .post(authController.signin)    

module.exports = router