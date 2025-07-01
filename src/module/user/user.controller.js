const userService = require('./user.service')
const { sendResponse, sendError } = require('../../common/response-handler')

exports.getUniqueUser = async (req, res) => {
    let { userId } = req.query

    if (!userId) {
        userId = req.user.userId
    }
    const user = await userService.getUserById(userId)
    if (!user) {
        sendError(res, 404, 'user not found')
        return;
    }
    sendResponse(res, 200, "user data retrived", { name: user.name, email: user.email, id: user.id, image: user.image, role: user.role, isActive: user.isActive })
}

exports.updateUser = async (req, res) => {
    try {
        let { name, image, isActive, userId } = req.body
        const convertedIsActive = isActive === 'true' ? true : false
        if (!userId) {
            userId = req.user.userId
        }

        if (req.file) {
            image = req.file.filename
        }
        const updatedUser = await userService.updateUser({ image, name, isActive: convertedIsActive }, userId)

        sendResponse(res, 200, "User updated successfully", { name: updatedUser.name, image: updatedUser.image, email: updatedUser.email })
    } catch (error) {
        sendError(res, 500, "Failed to update user ", error)
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            sendError(res, 400, "ID is required")
            return;
        }
        const deletedUser = await userService.deleteUser(id)
        sendResponse(res, 200, 'user deleted', deletedUser)
    } catch (error) {
        sendError(res, 500, "Failed to delete user ", error)
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const { search } = req.query
        const allUser = await userService.getAllUsers(search)
        if (!allUser) {
            sendError(res, 404, "users not found")
            return;
        }
        sendResponse(res, 200, "Users list retrived successfully", allUser)
    } catch (error) {
        sendError(res, 500, "Failed to delete user ", error)
    }
}