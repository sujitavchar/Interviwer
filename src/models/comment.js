import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    post:{
        type: Schema.Types.ObjectId,
        ref: "Post"
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref :"User"
    },
    title: {
        type: String,
        required: true
    }
},{timestamps : true})


export const Comment = mongoose.model("Comment", commentSchema);