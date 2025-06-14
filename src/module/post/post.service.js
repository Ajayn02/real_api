const prisma = require('../../config/prisma')

exports.addPost = async ({ userId, title, location, price, area, apartmentType, description, landmark, googlemap, image }) => {
    try {
        return await prisma.post.create({
            data: { userId, title, location, price, area, apartmentType, description, landmark, googlemap, image }
        })
    } catch (error) {
        throw new Error("Failed to add post")
    }
}

exports.getHomePosts = async (search) => {
    try {
        return await prisma.post.findMany({
            where: {
                isActive: true,
                isSoldout: false,
                location: {
                    contains: search,
                    mode: 'insensitive',
                }
            }
        })
    } catch (error) {
        throw new Error("Failed to fetch posts")
    }
}

exports.getPostById = async (id, tx) => {
    try {
        if (tx) {
            return await tx.post.findUnique({
                where: {
                    id,
                    isActive: true,
                }
            })
        }
        return await prisma.post.findUnique({
            where: {
                id,
                isActive: true,
            }
        })
    } catch (error) {
        throw new Error("Failed to fetch post")
    }
}

exports.getPostsByUSerId = async (id) => {
    try {
        return await prisma.post.findMany({
            where: { userId: id }
        })
    } catch (error) {
        throw new Error("Failed to fetch posts")
    }
}

exports.updatePost = async (data, id) => {
    try {
        return await prisma.post.update({
            where: { id },
            data: { ...data }
        })
    } catch (error) {
        throw new Error("Failed to update post")
    }
}

exports.deletePost = async (id, tx) => {
    try {
        if (tx) {
            return await tx.post.delete({
                where: { id }
            })
        }
        return await prisma.post.delete({
            where: { id }
        })
    } catch (error) {
        throw new Error("Failed to delete post")
    }
}

exports.getAllImages = async () => {
    try {
        return await prisma.post.findMany({
            select: { image: true }
        })
    } catch (error) {
        throw new Error("Failed to update post")
    }
}

