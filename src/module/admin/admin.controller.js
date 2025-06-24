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

// analytics
exports.getAddPostAnalytics = async (req, res) => {
    try {
        const posts = await adminService.getPostAnalytics()
        const monthMap = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const lastSixMonths = Array.from({ length: 6 }).map((_, i) => {
            const date = new Date();
            date.setMonth(date.getMonth() - (5 - i));
            return {
                key: monthMap[date.getMonth()],
                count: 0
            };
        });

        posts.forEach((item) => {
            const postDate = new Date(item.date);
            const month = monthMap[postDate.getMonth()];

            const monthEntry = lastSixMonths.find(m => m.key === month);
            if (monthEntry) {
                monthEntry.count += 1;
            }
        });

        const monthWisePostCounts = lastSixMonths.map(({ key, count }) => ({
            month: key,
            count
        }));

        sendResponse(res, 200, 'post analytics retrived successfully', monthWisePostCounts)
    } catch (error) {
        console.log(error)
        sendError(res, 500, 'Failed to retrive posts', error)
    }
}
