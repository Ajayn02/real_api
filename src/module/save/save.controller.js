const saveService = require('./save.service')
const { sendError, sendResponse } = require('../../common/response-handler')
const postService = require('../post/post.service')


exports.addToSave = async (req, res) => {
    try {
        const { postId } = req.body
        const userId = req.user.userId
        if (!postId) {
            sendError(res, 400, "PostId is required")
            return;
        }

        const postDetails=await postService.getPostById(postId)
        if(postDetails.userId===userId){
            sendError(res,400,"You can't save your post")
            return;
        }
        const existing = await saveService.getSavedByUserId(userId, postId)

        if (existing) {
            sendError(res, 400, "Post is already saved")
            return;
        }

        const newSavedPost = await saveService.addToSave({ userId, postId })
        sendResponse(res, 200, "Saved", newSavedPost)
    } catch (error) {
        sendError(res, 500, "Add to save failed", error)
    }
}

exports.getByUserId = async (req, res) => {
    try {
        const userId = req.user.userId
        const savedPosts = await saveService.getSavedByUserId(userId)

        if (!savedPosts) {
            sendError(res, 404, "saved items not found")
            return;
        }
        const allPosts = await Promise.all(
            savedPosts.map(async (item) => {
                const post = await postService.getPostById(item.postId)
                return {...post,savedId:item.id}
            })
        )
        sendResponse(res, 200, "Saved items fetched successfully", allPosts)
    } catch (error) {
        console.log(error);
        
        sendError(res, 500, "failed to fetch saved items", error)
    }

}

exports.deleteSavedItem = async (req, res) => {
    try {
        const { id } = req.params
        const deletedItem = await saveService.removePost(id)
        if (!deletedItem) {
            sendError(res, 404, "saved items not found")
            return;
        }
        sendResponse(res, 200, "Unsaved", deletedItem)
    } catch (error) {
        sendError(res, 500, "failed to delete saved items", error)
    }
}

