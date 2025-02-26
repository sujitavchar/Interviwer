import {asynchandler} from "../utils/asynchandler.js"
import {apiError} from "../utils/errorHandler.js";
import {Like} from "../models/like.js";
import {User} from "../models/users.js";
import {Comment} from "../models/comment.js";
import {apiResponse} from "../utils/apiResponse.js";
import mongoose from "mongoose";

const likePost = asynchandler(async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id; 
    console.log(userId.toString());
    console.log(postId);

   
        //  Check if the user already liked this specific post
        const likeEntry = await Like.findOne({ likedBy: userId.toString(), post: postId });

        if (likeEntry) {
            throw new apiError(400, "Already liked the post");
        }

        // If not already liked, create a new like entry
        const like = await Like.create({
            post: postId,
            comment: null,
            likedBy: userId
        });

        return res.status(200).json(
            new apiResponse(200, like, "Like added successfully")
        );

    
});


export {likePost} ; 