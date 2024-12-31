import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs'; 
dotenv.config();  // Loads environment variables

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloud = async (localfilepath)=>{
    try {
        if(!localfilepath) return null;
        //File upload logic
        const response = await cloudinary.uploader.upload(localfilepath,{
            resource_type: "auto"
        })
        // console.log("File uploaded on cloudinary suuccessfukky",response.url);
        fs.unlinkSync(localfilepath)
        return response;
    } catch (error) {
        fs.unlinkSync(localfilepath); //removes file from local server if file upload fails.
        console.log(error)
        return null;
    }
}

export { uploadOnCloud};