import {asynchandler} from "../utils/asynchandler.js"
import {apiError} from "../utils/errorHandler.js";
import {Follow} from "../models/follow.js";
import {apiResponse} from "../utils/apiResponse.js";
import mongoose from "mongoose";



const follow = asynchandler( async (req, res) => {
    const {userIdToFollow} = req.body;
    const currentUserId= req.user._id;

    if(!userIdToFollow || !mongoose.Types.ObjectId.isValid(userIdToFollow)){
        throw new apiError(400, "Invalid user id to follow. Check the format of id. It should be MongoDB Object")
    }

    const existingFollow= await Follow.findOne({
        follower: currentUserId,
        followingTo: userIdToFollow
    })

    if(existingFollow){
        await Follow.deleteOne({
            _id: existingFollow._id  //if already followed delete the follower
        })
        return res.status(200).json(new apiResponse(200, "Unfollowd successfully"));
    }

    const newFollow = new Follow({
        follower : currentUserId,
        followingTo : userIdToFollow
    })

    await newFollow.save();

    return res.status(200).json(new apiResponse(200, "followed successfully"))
})

export {follow};