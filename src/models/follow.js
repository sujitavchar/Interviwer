import mongoose,{Schema} from "mongoose";


const followSchema = new Schema({
    follower: {   //one who is following
        type: Schema.Types.ObjectId,
        ref : "User"
    },
    followingTo : {  //one to whom User is following
        typr: Schema.Types.ObjectId,
        ref: "User"
    }

},{timestamps: true});


export const Follow = mongoose.model("Follow", followSchema);