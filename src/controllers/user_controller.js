import asynchandler from "../utils/asynchandler.js"
import apiError from "../utils/errorHandler.js";

const registerUser = asynchandler( async (req,res)=>{
    //get user datails from front end;
    //validation of input data
    //check if user already exists
    //check for images and banner and upload on cloudinary
    //create user object for mongodb
    //remove password and refresh tokrn field from response
    //return res

    const {fullName,email,password,collegeName,companyName,mobileno,} = req.body;
    if(fullName==="" || email==="" || password===""  ||mobileno===""){
        throw new apiError(400, "All fields are required");
    }

    function isValidEmail(email) {
        // Define the regex pattern for a valid email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Test the email against the pattern
        return emailPattern.test(email);
    }
    
    if(!isValidEmmail(email)){
        throw new apiError(400,"Enter valid email")
    }else{
        console.log("Valid email")
    }


})

export default registerUser;