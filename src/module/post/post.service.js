const prisma = require('../../config/prisma')

exports.addPost = async ({ userId, title, location, price, area, apartmentType, specialities, landmark, googlemap, image }) => {
    try {
        return await prisma.post.create({
            data: { userId, title, location, price, area, apartmentType, specialities, landmark, googlemap, image }
        })
    } catch (error) {
        throw new Error("Failed to add post")
    }
}

exports.getAllPosts = async () => {
    try {
        return await prisma.post.findMany({
            where: { isSoldout: false }
        })
    } catch (error) {
        throw new Error("Failed to fetch posts")
    }
}

exports.getPostById = async (id) => {
    try {
        return await prisma.post.findUnique({
            where: { id }
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

