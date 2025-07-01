const prisma = require('../../config/prisma')

exports.getAllPost = async (search = '') => {
    try {
        return await prisma.post.findMany({
            where: {
                OR: [
                    {
                        location: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    },
                    {
                        title: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    }
                ]
            }
        })
    } catch (error) {
        throw new Error("Failed to fetch all posts")
    }
}

exports.getPostAnalytics = async () => {
    try {
        return await prisma.post.findMany({
            where: {
                date: {
                    gte: new Date(new Date().setMonth(new Date().getMonth() - 5))
                }
            }
        })
    } catch (error) {
        throw new Error(error)
    }
}

exports.getUserAnalytics = async () => {
    try {
        return await prisma.user.findMany({
            where: {
                date: {
                    gte: new Date(new Date().setMonth(new Date().getMonth() - 5))
                }
            }
        })
    } catch (error) {
        throw new Error(error)
    }
}