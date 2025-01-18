import {asynchandler} from "../utils/asynchandler.js"
import {apiError} from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import {User} from "../models/users.js";

export const verifyJWt = asynchandler(async (req, res, next) => {
    try {
            const token = req.cookies?.accessToken || req.header("Authorization")?.replace("bearer ", "");
            if(!token){
                throw new apiError(400, "Unauthorized request");
            }
        
            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
            const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        
            if(!user){
                throw new apiError(401, "Invalid Access Token")
            }
        
            req.user = user;
            next();
    } catch (error) {
        throw new apiError(401, error?.message || "Invalid Access token ~ middleware")
    }
});
