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

exports.getAllReports = async () => {
    try {
        return await prisma.report.findMany()
    } catch (error) {
        throw new Error(error)
    }
}

exports.getReportById = async (id, tx) => {
    try {
        if (tx) {
            return await tx.report.findUnique({
                where: { id }
            })
        }
        return await prisma.report.findUnique({
            where: { id }
        })
    } catch (error) {
        throw new Error(error)
    }
}

exports.deleteReport = async (id) => {
    try {
        return await prisma.report.delete({
            where: { id }
        })
    } catch (error) {
        throw new Error(error)
    }
}