const authService = require('./auth.service')
const { Role } = require('@prisma/client')
const { sendResponse, sendError } = require('../../common/response-handler')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')


exports.signup = async (req, res) => {
    try {
        const { name, password, email } = req.body
        const role = Role.user

        if (!name || !password || !email) {
            sendError(res, 400, "name, password and email are required")
            return;
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await authService.addUser({ name, password: hashedPassword, email, role })
        sendResponse(res, 201, "Signup completed Successfully", { name: newUser.name, email: newUser.email })
    } catch (error) {
        sendError(res, 500, "user adding failed", error)
    }
}

exports.signin = async (req, res) => {
    try {
        const { password, email } = req.body
        if (!password || !email) {
            sendError(res, 400, "password and email are required")
            return;
        }

        const user = await authService.getUserByEmail(email)
        if (!user) {
            sendError(res, 404, "user not found")
            return;
        }
        const isMatch = await bcrypt.compare(password, user.password); 2

        if (!isMatch) {
            sendError(res, 401, "invalid password")
            return;
        }

        const token = jsonwebtoken.sign({ userId: user.id, role: user.role }, process.env.PRIVATE_KEY)
        sendResponse(res, 200, "Login completed Successfully", { token, username: user.name })
    } catch (error) {
        sendError(res, 500, "user adding failed", error)
    }
}