const prisma = require('../../config/prisma')


exports.getAllPost = async (search) => {
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