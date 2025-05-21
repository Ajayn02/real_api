const userService = require('./user.service')
const { sendResponse, sendError } = require('../../common/response-handler')



exports.updateUser = async (req, res) => {
    try {
        let { name, image } = req.body
        const userId = req.user.userId

        if (req.file) {
            image = req.file.filename
        }

        const updatedUser = await userService.updateUser({ image, name }, userId)

        sendResponse(res, 200, "User details updated successfully", { name: updatedUser.name, image: updatedUser.image })
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
        const allUser = await userService.getAllUsers()
        if (!allUser) {
            sendError(res, 404, "users not found")
            return;
        }
        sendResponse(res, 200, "Users list retrived successfully", allUser)
    } catch (error) {
        sendError(res, 500, "Failed to delete user ", error)
    }
}