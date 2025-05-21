const express=require('express')
const adminController=require('./admin.controller')
const { jwtMiddleware, allowRoles } = require('../../common/middleware')

const router=express.Router()

router.route("/")
    .get()

module.exports=router