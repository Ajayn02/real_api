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