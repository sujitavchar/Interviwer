import asynchandler from "../utils/asynchandler.js"
import apiError from "../utils/errorHandler.js";
import {User} from "../models/users.js";
 import { uploadOnCloud } from "../utils/cloudinary.js";
import apiResponse from "../utils/apiResponse.js";

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
    const dublicateUser = await  User.findOne({fullName});
    if(dublicateUser){
        throw new apiError(409, "User already exists ");
    }

    //check if email id already exists
    const dublicateEmail = await User.findOne({email});
    if(dublicateEmail){
        throw new apiError(410,"")
    }

    //check for valid mobile no
    function isValidMobileNumber(number) {
        
    
        const sanitizedNumber = String(number).trim();
        console.log("Sanitized Mobile Number:", sanitizedNumber);
    
        // Check if it contains only numeric characters and is exactly 10 digits
        const isNumeric = /^\d+$/.test(sanitizedNumber);
        const isValidLength = sanitizedNumber.length === 10;
    
        console.log("Is Numeric:", isNumeric, "Is Valid Length:", isValidLength);
        return isNumeric && isValidLength;
    }
    if(!isValidMobileNumber(mobileNo)){
        throw new apiError(412, "Invalid Mobile number");
    }

    // also may check for banner and profile image - optional
    // to do later
    const profileImageLocalpath= req.files?.profileImg[0]?.path;
    if(!profileImageLocalpath){
        throw new apiError(411,"Profile Image is required");
    }
    const profileImageDetails = await uploadOnCloud(profileImageLocalpath);
    console.log("profileImageDetails",profileImageDetails.url);

    //Insert user into the collection
 
    try {
        const user = await User.create({
            fullName,
            email,
            password,
            collegeName: collegeName || "",
            companyName: companyName || "",
            mobileNo,
            profileImg: profileImageDetails.url || "",
        });

        const newUser = await User.findById(user._id).select("-password -refreshToken");

        return res.status(201).json(
            new apiResponse(200, newUser, "User registered successfully")
        );
    } catch (error) {
        console.error("Error while registering user:", error);
        throw new apiError(500, "Server error while registering user");
    }
})

export default registerUser;