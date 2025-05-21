const reportService = require('./report.service')
const { sendError, sendResponse } = require('../../common/response-handler')


exports.addReport = async (req, res) => {
    try {
        const { postId, issue } = req.body
        const userId = req.user.userId

        if (!postId || !issue) {
            sendError(res, 400, "PostId and issue are requireder")
            return;
        }

        const newReport = await reportService.addReport(userId, postId, issue)
        sendResponse(res, 201, "Report added successfully", newReport)
    } catch (error) {
        sendError(res, 500, "Failed to add report", error)
    }
}