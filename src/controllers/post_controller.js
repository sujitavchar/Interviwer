import {asynchandler} from "../utils/asynchandler.js"
import {apiError} from "../utils/errorHandler.js";
import {Post} from "../models/posts.js";
 import { uploadOnCloud } from "../utils/cloudinary.js";
import {apiResponse} from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";


const getALLPosts = asynchandler(async (req,res) => {
    try {
        const posts= await Post.find().sort({ createdAt: -1 }); //get all posts in desc order of post creation

        return res.status(200).json(
            new apiResponse(200,posts ,"All posts fetched  successfully")
        );
    } catch (error) {
        throw new apiError(500, "Error fetching feed");
    }
})

const createPost  = asynchandler(async (req,res)=>{
    const {title, text } = req.body;

    let imageLocalpath = "";
    let imageDetails, imageUrl;
    
    // Safely handle the image field
    if (req.files && req.files.image && req.files.image.length > 0) {
        imageLocalpath = req.files.image[0].path;
    }
    
    // Upload to the cloud if a local path exists
    if (imageLocalpath) {
        try {
            imageDetails = await uploadOnCloud(imageLocalpath);
            imageUrl = imageDetails.url;
        } catch (uploadError) {
            console.error("Error uploading  image:", uploadError);
            throw new apiError(500, "Failed to upload  image");
        }
    }

    try {
        const newPost = await Post.create({
            title: title,
            text: text,
            image: imageUrl || "", // Store uploaded image URL in the database
            owner: req.user._id,
            isPublished: true
        });

        const post = await Post.findById(newPost._id);

        return res.status(200).json(
            new apiResponse(200,post, "Post created successfully" )
        )

    } catch (error) {
        console.error("Error while creating post:", error);
        throw new apiError(500, "Failed to create post");
    }
    
})


export {getALLPosts, createPost};