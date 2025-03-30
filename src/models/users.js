import mongoose,{Schema} from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    fullName:{
        type : String,
        required : true,
        trim : true
    },
    userName:{
        type: String,
        required:true,
        index : true,
        unique : true,
        trim: true
    },
    email:{
        type : String,
        required : true,
        lowercase: true
    },
    password : {
        type : String,
        required : [true, 'Password is required']
       
    },
    
       
    collegeName : {
        type : String,
        required : true,
        index : true,
        trim : true
    },
    companyName : {
        type : String,
        required : true,
        index : true,
        trim : true
    },
    mobileNo : {
        type : String,
        required: true,
    },
    profileImg : {
        type: String, // cloudinary url
        default : ""
    },
    banner : {
        type: String , //cloudinary url
    },
    myPosts: [ // New field to store posts created by the user
        {
            type: Schema.Types.ObjectId,
            ref: "Post"
        }
    ],

    // followers: [ //Building this feature with  Follow schema, to optimise the opeartions on followers
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: "User"
    //     }
    // ],

    // following: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: "User" // Optional: To track users this user is following
    //     }
    // ],

    savedPosts : [
        {
            type: Schema.Types.ObjectId,
            ref : "Post"
        }
    ],
    likedPosts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    refreshToken : {
        type: String
    }

},{timestamps: true});

userSchema.pre("save", async function(next){ 
    if(this.isModified("password")){
        this.password =await bcrypt.hash(this.password, 2);
    }
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken  = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXP
        }
    );
}

userSchema.methods.generateRefreshToken  = function(){
    return jwt.sign(
       {
           _id: this._id,
       },
       process.env.REFRESH_TOKEN_SECRET,
       {
           expiresIn: process.env.REFRESH_TOKEN_EXP
       }
   );
}


export const User = mongoose.model("User", userSchema);