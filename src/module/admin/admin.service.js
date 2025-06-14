const prisma = require('../../config/prisma')


exports.getAllPost = async () => {
    try {
        return await prisma.post.findMany()
    } catch (error) {
        throw new Error("Failed to fetch all posts")
    }
}