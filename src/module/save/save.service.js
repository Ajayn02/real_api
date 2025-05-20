const prisma = require('../../config/prisma')

exports.addToSave = async ({ userId, postId }) => {
    try {
        return await prisma.savedPost.create({
            data: { userId, postId }
        })
    } catch (error) {
        throw new Error(error)
    }
}

exports.getSavedByUserId = async (userId, postId) => {
    try {
        if (postId) {
            return await prisma.savedPost.findFirst({
                where: { userId, postId }
            })
        }
        return await prisma.savedPost.findMany({
            where: { userId }
        })
    } catch (error) {
        throw new Error(error)
    }
}

exports.removePost = async (id) => {
    try {
        return await prisma.savedPost.delete({
            where: { id }
        })
    } catch (error) {
        throw new Error(error)
    }
}

exports.removeMany = async (postId, tx) => {
    try {
        return await tx.savedPost.deleteMany({
            where: { postId }
        })
    } catch (error) {
        throw new Error(error)
    }
}