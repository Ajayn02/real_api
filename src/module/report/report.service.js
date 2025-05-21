const prisma = require('../../config/prisma')

exports.addReport = async (userId, postId, issue) => {
    try {
        return await prisma.report.create({
            data: { userId, postId, issue }
        })
    } catch (error) {
        throw new Error(error)
    }
}