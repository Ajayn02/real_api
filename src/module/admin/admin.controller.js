const { sendError, sendResponse } = require('../../common/response-handler')
const adminService = require('./admin.service')

exports.getAllPost = async (req, res) => {
    try {
        const { search } = req.query
        const allPosts = await adminService.getAllPost(search)
        if (!allPosts) {
            sendError(res, 404, 'Posts not found')
            return;
        }
        sendResponse(res, 200, 'Posts retrived successfully', allPosts)
    } catch (error) {
        sendError(res, 500, 'Failed to retrive posts', error)
    }
}

