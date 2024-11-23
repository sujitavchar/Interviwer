import asynchandler from "../utils/asynchandler.js"
import apiError from "../utils/errorHandler.js";
import {User} from "../models/users.js";
// import { uploadOnCloud } from "../utils/cloudinary.js";
import apiResponse from "../utils/apiResponse.js";

const registerUser = asynchandler( async (req,res)=>{
    //get user datails from front end;
    //validation of input data
    //check if user already exists
    //check for images and banner and upload on cloudinary
    //create user object for mongodb
    //remove password and refresh tokrn field from response
    //return res

    const {fullName,email,password,mobileno,} = req.body;
    if(fullName==="" || email==="" || password===""  ||mobileno===""){
        throw new apiError(400, "fullname, email, password, mobileno fields are required");
    }

    function isValidEmail(email) {
        // Define the regex pattern for a valid email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Test the email against the pattern
        return emailPattern.test(email);
    }
    
    if(!isValidEmail(email)){
        throw new apiError(400,"Enter valid email")
    }else{
        console.log("Valid email")
    }

    //Check if user already exists
    const dublicateUser =  User.findOne({fullName});
    if(dublicateUser){
        throw new apiError(409, "User already exists ");
    }

    //check if email id already exists
    const dublicateEmail = User.findOne({email});
    if(dublicateEmail){
        throw new apiError(410,"")
    }

    //check for valid mobile no
    function isValidMobileNumber(number) {
        // Check if the input is exactly 10 digits and contains only numbers
        const numberPattern = /^\d{10}$/;
    
        return numberPattern.test(number);
    }
    if(!isValidMobileNumber(mobileno)){
        throw new apiError(412, "Invalid Mobile number");
    }

    //also may check for banner and profile image - optional
    //to do later
    // const profileImageLocalpath= req.files?.profileImage[0]?.path;
    // if(!profileImageLocalpath){
    //     throw new apiError(411,"Profile Image is required");
    // }
    //const profileImageDetails = await uploadOnCloud(profileImageLocalPath);


    //Insert user into the collection
    const user  = User.create({
        fullName,
        email,
        password,
        collegeName: collegeName? collegeName : "",
        companyName: companyName? companyName : "",
        mobileno,
        profileImg: profileImg? profileImg:"",
        banner: banner? banner:""
    });
    
    const newUser  = await User.findById(user._id).select("-password -refreshToken");
    if(!newUser){
        throw new apiError(500, "Server error while registering user");
    }

    return res.status(201).json(
        new apiResponse(200,newUser,"User registered successfully")
    )
})

export default registerUser;