const postService = require('./post.service')
const { sendResponse, sendError } = require('../../common/response-handler')
const prisma = require('../../config/prisma')
const savedService = require('../save/save.service')

exports.addPost = async (req, res) => {
    try {
        const { title, location, price, area, apartmentType, description, landmark, googlemap } = req.body
        const userId = req.user.userId
        const image = req.file.filename

        if (!title || !location || !price || !area || !apartmentType || !description || !landmark || !googlemap) {
            sendError(res, 400, " title, location, price, area, apartmentType, description, landmark and googlemap are required")
            return;
        }

        const newPost = await postService.addPost({ title, location, price: parseInt(price), area, apartmentType, description, landmark, googlemap, userId, image })

        sendResponse(res, 201, "Post added successfully", newPost)
    } catch (error) {
        sendError(res, 500, "Post adding failed", error)
    }
}

exports.getHomePosts = async (req, res) => {
    try {
        const { search } = req.query
        const allPost = await postService.getHomePosts(search)
        sendResponse(res, 200, "posts retrived successfully", allPost)
    } catch (error) {
        sendError(res, 500, "Posts retriving failed", error)
    }

}

exports.getById = async (req, res) => {
    try {
        const { id } = req.params
        const post = await postService.getPostById(id)
        if (!post) {
            sendError(res, 404, "Post not found",)
            return;
        }
        sendResponse(res, 200, "post retrived successfully", post)
    } catch (error) {
        sendError(res, 500, "Post retriving failed", error)
    }
}

exports.getByUserId = async (req, res) => {
    try {
        const userId = req.user.userId

        const posts = await postService.getPostsByUSerId(userId)
        if (!posts) {
            sendError(res, 404, "Posts not found",)
            return;
        }
        sendResponse(res, 200, "posts retrived successfully", posts)
    } catch (error) {
        sendError(res, 500, "Posts retriving failed", error)
    }
}

exports.update = async (req, res) => {
    try {
        const { id } = req.params
        let { title, location, price, area, apartmentType, description, landmark, googlemap, isSoldout, image } = req.body
        if (req.file) {
            image = req.file.filename
        }
        if (!isSoldout) {
            isSoldout = false
        }
        const updatedPost = await postService.updatePost({ title, location, price: parseInt(price), area, apartmentType, description, landmark, googlemap, isSoldout, image }, id)

        if (!updatedPost) {
            sendError(res, 404, "Post not found")
            return;
        }
        sendResponse(res, 200, "Post updated", updatedPost)
    } catch (error) {
        sendError(res, 500, "Failed to update product", error)
    }
}

exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params

        const result = await prisma.$transaction(async (tx) => {
            const deleteSavedItems = await savedService.removeMany(id, tx);
            const deletedPost = await postService.deletePost(id, tx);
            return { deleteSavedItems, deletedPost };
        });

        if (!result) {
            sendError(res, 404, "Post not found")
            return;
        }
        sendResponse(res, 200, "Post deleted successfully", result.deletedPost)
    } catch (error) {
        sendError(res, 500, "Failed to delete product", error)
    }
}


