import {asynchandler} from "../utils/asynchandler.js"
import {apiError} from "../utils/errorHandler.js";
import {User} from "../models/users.js";
 import { uploadOnCloud } from "../utils/cloudinary.js";
import {apiResponse} from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";

//sub-function
const generateAccessAndRefreshToken = async (userId)=>{
    try {
        const user = await User.findById(userId);
        const accessToken =  user.generateAccessToken();
        const refreshToken =  user.generateRefreshToken();

        user.refreshToken = refreshToken;
        
        await user.save({validateBeforeSave : false});
        

        return {accessToken, refreshToken};

    } catch (error) {
        throw new apiError(500,"Something went wrong while generating access tokens");
    }
}



const registerUser = asynchandler( async (req,res)=>{
    //get user datails from front end;
    //validation of input data
    //check if user already exists
    //check for images and banner and upload on cloudinary
    //create user object for mongodb
    //remove password and refresh tokrn field from response
    //return res

    const {fullName,email,password,mobileNo,collegeName,companyName} = req.body;
    console.log(req.body);
    if(fullName==="" || email==="" || password===""  ||mobileNo===""){
        throw new apiError(400, "fullname, email, password, mobileNo fields are required");
    }

    function isValidEmail(email) {
        // Define the regex pattern for a valid email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Test the email against the pattern
        return emailPattern.test(email);
    }
    
    if(!isValidEmail(email)){
        throw new apiError(400,"Enter valid email")
    }

    //Check if user already exists
    const dublicateUser = await  User.findOne({fullName,email});
    if(dublicateUser){
        throw new apiError(409, "User already exists ");
    }

    //check if email id already exists
    const dublicateEmail = await User.findOne({email});
    if(dublicateEmail){
        throw new apiError(410,"Email already registered")
    }

    //check for valid mobile no
    function isValidMobileNumber(number) {
        
    
        const sanitizedNumber = String(number).trim();
       // console.log("Sanitized Mobile Number:", sanitizedNumber);
    
        // Check if it contains only numeric characters and is exactly 10 digits
        const isNumeric = /^\d+$/.test(sanitizedNumber);
        const isValidLength = sanitizedNumber.length === 10;
    
        //console.log("Is Numeric:", isNumeric, "Is Valid Length:", isValidLength);
        return isNumeric && isValidLength;
    }
    if(!isValidMobileNumber(mobileNo)){
        throw new apiError(412, "Invalid Mobile number");
    }

    // also may check for banner and profile image - optional
    // to do later
    //const profileImageLocalpath= req.files?.profileImg[0]?.path; -> optional way gives error if profileImg is empty.
    let profileImageLocalpath = "";
    let profileImageDetails, profileImageUrl;
    
    // Safely handle the profileImg field
    if (req.files && Array.isArray(req.files.profileImg) && req.files.profileImg.length > 0) {
        profileImageLocalpath = req.files.profileImg[0].path;
    }
    
    // Upload to the cloud if a local path exists
    if (profileImageLocalpath) {
        try {
            profileImageDetails = await uploadOnCloud(profileImageLocalpath);
            profileImageUrl = profileImageDetails.url;
        } catch (uploadError) {
            console.error("Error uploading profile image:", uploadError);
            throw new apiError(500, "Failed to upload profile image");
        }
    }
    
    // Log the result for debugging
    console.log("profileImageDetails", profileImageDetails ? profileImageDetails.url : "No profile image uploaded");
    
    const randomNum = Math.floor(10000 + Math.random() * 90000); // 5-digit number
    const userName = fullName.replace(/\s+/g, "").toLowerCase() + randomNum;


    try {
        // Insert user into the database
        const user = await User.create({
            fullName,
            userName,
            email,
            password,
            collegeName: collegeName || "",
            companyName: companyName || "",
            mobileNo,
            profileImg: profileImageUrl || "", // Use empty string if no image URL is available
        });
    
        // Retrieve the newly created user without sensitive fields
        const newUser = await User.findById(user._id).select("-password -refreshToken");
    
        return res.status(200).json(
            new apiResponse(200, newUser, "User registered successfully")
        );
    } catch (error) {
        console.error("Error while registering user:", error);
        throw new apiError(500, "Server error while registering user");
    }
})



const loginUser = asynchandler( async (req,res)=>{
    const {fullName,email,password} = req.body;

    if(!email && !fullName){
        throw new apiError(400, "Email and Fullname are required");
    }

    let user = await User.findOne({email});
    if(!user){
        throw new apiError(404,"User doesn't exists");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    
    if(!isPasswordValid){
        throw new apiError(401,"Incorrect password");
    }
    
    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);
    
    user = await User.findById(user._id).select("-password -refreshToken"); //updates user object with newly generated refreshtoken

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken", refreshToken,options)
            .json(
                new apiResponse(200, {
                    user: user, accessToken, refreshToken
                },
                "User logged in successfully")
            )
})

const logoutUser = asynchandler(async (req, res) => {
    

    const user = await User.findById(req.user._id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    

    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: "" // Value doesn't matter; MongoDB will remove the field.
            }
        },
        {
            new: true
        }
    );
    
    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new apiResponse(200, {}, "User logged out successfully"));
});

const renewAccessToken = asynchandler(async (req,res) =>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if(!incomingRefreshToken){
        throw new apiError(404, "Unauthorised request")
    }

    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id);

    if(!user){
        throw new apiError(404, "User not found")
    }

    if(incomingRefreshToken !== user?.refreshToken){
        throw new apiError(404, "Refresh Token expired or used")
    }

    const options = {
        httpOnly: true,
        secure: true,
    };

    const {newAccessToken, newRefreshToken} = await generateAccessAndRefreshToken(user._id);

    return res
        .status(200)
        .cookie("accessToken", newAccessToken,options)
        .cookie("refreshtoken", newRefreshToken, options)
        .json(
            new apiResponse(200,{},"Access Token renewed")
        )


} )

const updatePassword = asynchandler(async (req, res) => {
    const {oldpassword, newpassword} = req.body;

    const user = await User.findById(req.user._id);

    const isPasswordCorrect =  await user.isPasswordCorrect(oldpassword);

    if(!isPasswordCorrect){
        throw new apiError(400, "Invalid Password");
    }

    user.password = newpassword;
    await user.save({validateBeforeSave: false});

    return res
        .status(200)
        .json(
            new apiResponse(200, {}, "Password updated successfully")
        )

});

const updateFullname= asynchandler(async (req, res) => {
    const { newfullname} = req.body;

    const user = await User.findById(req.user._id);

    if(!user){
        throw new apiError(400, "User doesn't exist");
    }

    user.fullName = newfullname;
    await user.save({validateBeforeSave: false});

    return res
        .status(200)
        .json(
            new apiResponse(200, {}, "Name updated successfully")
        )

});

const getCurrentUser = asynchandler(async (req,res) =>{
    return res
        .status(200)
        .json(
            200,
            req.user,
            "User fetched successfully"
        )
} )

const updateProfileImage = asynchandler(async (req,res )=>{
    const localPath = req.file?.path;   //extract file from local system 
    if(!localPath) {
        throw new apiError(400, "Profile Image not found"); 
    } 
    const publicURL  = await uploadOnCloud(localPath);
    const user  = await  User.findById(req.user._id);
    user.profileImg = publicURL;

    await user.save({validateBeforeSave: false});

    return res
        .status(200)
        .json(
            new apiResponse(200, {}, "Profile Image  updated successfully")
        )    
})

//To do : Make function to update cover Image

const getUserProfile = asynchandler( async (req,res) =>{
    const username = req.params;
    if(!username?.trim()){
        throw new apiError(400, "User Name is undefined")
    }
    //agregation pipeline for sending profile data, when profile is viewed
    const profile = await User.aggregate(
        [
            {
                $match : {
                    userName : username?.toLowerCase()
                }
            },
            {
                $lookup: {
                    from : "follows",
                    localField : "_id",
                    foreignField : "followingTo",
                    as :"total_followers"
                }
            },
            {
                $lookup: {
                    from : "follows",
                    localField : "_id",
                    foreignField : "follower",
                    as :"following_to"
                }
            },
            {
                $addFields: {
                    followersCount :{
                        $size : "$total_followers"
                    },
                    followingToCount :{
                        $size : "$following_to"
                    },
                    isFollowed : {
                        $cond:{
                            $if: {$in :[req.user?._id, "total_followers.follower"]},
                            $then: true,
                            $else : false
                        }
                    }
                }
            },
            {
                $project :{
                    fullName:1,
                    userName:1,
                    email:1,
                    collegeName:1,
                    companyName:1,
                    profileImg:1,
                    myPosts:1,
                    savedPosts :1,
                    likedPosts :1,
                    followersCount:1,
                    followingToCount:1,
                    createdAt:1
                }
            }
        ]
    )

    if(!profile?.length){
        throw new apiError(404, "User not found");
    }

    return res.status(200).json(
        new apiResponse(200, profile[0], "User profile fetched successfullly")
    )

} )


const getMyPosts = asynchandler(async (req,res ) => {
    const user = await User.aggregate(
        [
            {
                $match : {
                    _id : new mongoose.Types.ObjectId(req.user._id)  // converts _id to mongo db id 'ObjectId(2143143434)'
                }
            },
            {
                $lookup :{ // to get all posts doc of ids in myPosts array 
                    from: "posts",
                    localField : "myPosts",
                    foreignField: "_id",
                    as: "myPosts",
                    pipeline : [
                        {
                            $lookup:{   //to get the details of owner of the post
                                from :"users",
                                localField:"owner",
                                foreignField : "_id",
                                as : "owner",
                                pipeline:[
                                    {
                                        $project:{ //only show required fields of the owner
                                            fullName :1 //send more if required
                                        }
                                    },
                                    {
                                        $addFields:{ //to convert owner array into object, makes easier for fornt end
                                            owner:{
                                                $first: "$owner"
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ]
    )

    return res.status(200)
        .json(new apiResponse(200, user[0].myPosts , "Posts fetched successfully"));
})

export { registerUser, loginUser, logoutUser, renewAccessToken, updatePassword, getCurrentUser, updateFullname, updateProfileImage, getUserProfile, getMyPosts};