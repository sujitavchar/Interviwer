import {asynchandler} from "../utils/asynchandler.js"
import {apiError} from "../utils/errorHandler.js";
import {Post} from "../models/posts.js";
 import { uploadOnCloud } from "../utils/cloudinary.js";
import {apiResponse} from "../utils/apiResponse.js";



const getALLPosts = asynchandler(async (req, res) => {
    try {
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .populate("owner", "fullName"); // only fetch 'name' field of the user

        return res.status(200).json(
            new apiResponse(200, posts, "All posts fetched successfully")
        );
    } catch (error) {
        throw new apiError(500, "Error fetching feed");
    }
});


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

const getPostById = asynchandler(async (req,res) =>{
    const {postId} = req.params;

    if(!postId){
        throw new apiError(500, "No post id in parameters");
    }

    try {
        const post = await Post.findById(postId);
    
        if(!post){
            throw new apiError(404, "Post not found");
        }
        post.views++;
        await post.save({validateBeforeSave: false});

        return res.status(200).json(
            new apiResponse(200, post, "Post fetched successfully")
        );

    } catch (error) {
        console.error(`Error while fetching post of ${postId}:`, error);
        throw new apiError(500, "Error while fetching post");
    }

 })


const updatePost = asynchandler(async (req, res) => {
    const {postId, newtitle, newtext} = req.body;

    const post = await Post.findById(postId);

    if(!post){
        throw new apiError(400, "Post doesn't exist");
    }

    if(post.owner.toString() !== req.user._id.toString()){
        throw new apiError(403, "Not authorised to update post");
    } 

    const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
            ...(newtitle && { title: newtitle }), // Update only if provided
            ...(newtext && { text: newtext }),
        },
        { new: true, runValidators: true } // `new: true` returns the updated document
    );

    return res.status(200).json(
        new apiResponse(200, updatedPost, "Post updated successfully")
    );

});


const deletePost = asynchandler(async (req,res)=>{
    const {postId} = req.body;

    if(!postId){
        throw new apiError(403, "Please provide post id to delete");
    }

    const post = await Post.findById(postId);

    if(!post){
        throw new apiError(404, "Post notfound");
    }
   
    if (post.owner.toString() !== req.user._id.toString()) {
        throw new apiError(403, "You are not authorized to delete this post");
    }

    await post.deleteOne();  

    return res.status(200).json( new apiResponse(200, "Post deleted successfully"));
})


const togglePublishStatus = asynchandler( async (req, res) =>{
    const {postId} = req.body;

    if(!postId) {
        throw new apiError(404, "Please provide post id ");
    }

    const post = await Post.findById(postId) ;

    if(post.isPublished){
        post.isPublished = false;
    }
    else{
        post.isPublished = true; 
    }

    await post.save({validateBeforeSave: false});

    return res.status(200).json( new apiResponse(200, post,"Status changed"));
})



export {getALLPosts, createPost,getPostById, updatePost,deletePost, togglePublishStatus};