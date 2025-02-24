import {asynchandler} from "../utils/asynchandler.js"
import {apiError} from "../utils/errorHandler.js";
import {Comment} from "../models/comment.js";
import {apiResponse} from "../utils/apiResponse.js";
import mongoose from "mongoose";


const getAllCommentsByPostId  = asynchandler(async (req, res)=>{
    const {postId}  = req.params;

    if(!postId){
        throw new apiError(404, "Please provide post id");
    }
    
    try {
            const commments = await Comment.aggregate([
                {
                    $match: { post : new mongoose.Types.ObjectId(postId)}
                },
                {
                    $lookup : {
                        from : "posts",
                        localField: "post",
                        foreignField: "_id",
                        as : "postDetails"
                    }
                },
                {
                    $lookup : {
                        from : "users",
                        localField: "owner",
                        foreignField: "_id",
                        as : "userDetails"
                    }
                },
                {
                    $unwind: "$postDetails"
                },
                {
                    $unwind: "$userDetails"
                },
                {
                    $project :{
                        _id: 1,
                        text: 1,
                        createdAt: 1,
                        postTitle: "$postDetails.title",
                        userName: "$userDetails.fullName"
                    }
                }
            ])
        
        return res.status(200).json(new apiResponse(200, commments, "Comments fetched successfully"))
        
    } catch (error) {
        return res.status(500).json(new apiError(500, "Unable to fetch comments")); 
    }
 
})

const addComment = asynchandler (async (req,res)=>{
    const {postId} = req.params;
    const {ctext} = req.body;

    if(!postId || !ctext) {
        throw  new apiError(400, "Please provide post id   and comment text")
    }

    try {
        const newcomment = await Comment.create({
            post: postId,
            owner: req.user._id,
            text: ctext,
        })

        const comment = await Comment.findById(newcomment._id);

        return res.status(200).json(new apiResponse(200, comment, "Comment added Successfully"));

    } catch (error) {
        console.error("Error while adding comment:", error);
        throw new apiError(500, "Failed to add comment");
    }
})

const deleteComment = asynchandler(async (req,res)=>{
    const {commentId} = req.body;

    if(!commentId){
        throw new apiError(403, "Please provide comment id to delete");
    }
    
    const comment = await Comment.findById(commentId);
    
    if(!comment){
        throw new apiError(404, "comment not found");
    }
       
    if (comment.owner.toString() !== req.user._id.toString()) {
        throw new apiError(403, "You are not authorized to delete this comment");
    }
    
    await comment.deleteOne();  
    
    return res.status(200).json( new apiResponse(200, "Comment deleted successfully"));
})

export {getAllCommentsByPostId, addComment, deleteComment} ; 