const reportService = require('./report.service')
const postService = require('../post/post.service')
const userService = require('../user/user.service')
const prisma = require('../../config/prisma')
const { sendError, sendResponse } = require('../../common/response-handler')
const { Status } = require('@prisma/client')


exports.addReport = async (req, res) => {
    try {
        const { postId, issue, description } = req.body
        const userId = req.user.userId

        if (!postId || !issue) {
            sendError(res, 400, "PostId and issue are requireder")
            return;
        }

        const post = await postService.getPostById(postId)

        if (post?.userId == userId) {
            sendError(res, 400, "You can't report your own post")
            return;
        }

        const existing = await reportService.getReportsByuserIdAndPostId(postId, userId)
        if (existing) {
            sendError(res, 400, "Your report against this post already exists")
            return;
        }

        const newReport = await reportService.addReport(userId, postId, issue, description)
        sendResponse(res, 201, "Report added successfully", newReport)
    } catch (error) {
        sendError(res, 500, "Failed to add report", error)
    }
}

exports.getAllReports = async (req, res) => {
    try {
        const reports = await reportService.getAllReports();
        if (!reports) {
            sendError(res, 400, "Reports not found");
            return;
        }

        const allReportDetails = await Promise.all(
            reports.map(async (item) => {
                const post = await postService.getPostById(item.postId);
                const user = await userService.getUserById(item.userId)
                if (!post) return null;

                // Merge post with report metadata
                return {
                    id: post.id,
                    title: post.title,
                    reportId: item.id,
                    status: item.status,
                    reporterId: item.userId,
                    reporterEmail: user.email,
                    issue: item.issue,
                    issueDescription: item.description,
                    reportDate: item.date
                };
            })
        );

        // remove null or undefined values
        const filteredReports = allReportDetails.filter(Boolean);

        sendResponse(res, 200, "Reports retrieved successfully", filteredReports);
    } catch (error) {
        sendError(res, 500, "Failed to retrieve reports", error);
    }
};


exports.getById = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            sendError(res, 400, "ID is required")
            return;
        }
        const result = await prisma.$transaction(async (tx) => {
            const report = await reportService.getReportById(id, tx)
            const post = await postService.getPostById(report.postId, tx)
            const user = await userService.getUserById(post.userId, tx)
            return { report, post, user }
        })
        sendResponse(res, 200, "Report retrived successfully", {
            report: result.report, post: result.post, user: {
                id: result.user.id, name: result.user.name, email: result.user.email, role: result.user.role, image: result.user.image
            }
        })
    } catch (error) {
        sendError(res, 500, "Failed to retrive report", error)
    }
}

// reject report
exports.rejectReport = async (req, res) => {
    try {
        const { id } = req.params
        const rejectReport = await reportService.updateReport(id, Status.rejected)
        if (!rejectReport) {
            sendError(res, 404, "Report not found")
            return;
        }
        sendResponse(res, 200, "Report rejected successfully", rejectReport)
    } catch (error) {
        sendError(res, 500, "Failed to reject report", error)
    }
}

exports.takeReportAction = async (req, res) => {
    try {
        const { id } = req.params
        const result = await prisma.$transaction(async (tx) => {
            const updateReport = await reportService.updateReport(id, Status.resolved, tx)
            const updatedPost = await postService.updatePost({ isActive: false }, updateReport.postId, tx)
            return { updateReport, updatedPost }
        })
        sendResponse(res, 200, 'Post Removed successfully', result.updatedPost)
    } catch (error) {
        sendError(res, 500, "Failed to remove post", error)
    }
}