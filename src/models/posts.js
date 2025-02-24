import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";



const postSchema = new Schema({
    title : {
        type: String,
        required: true,
        index: true
    },
    text : {
        type: String,
        required: true,
    },

    image : {
        type: String, //cloudinary url
    },
    
    owner : {
        type: Schema.Types.ObjectId,
        ref : "User"
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
    views: {
        type: Number,
        default: 0
    }


},{timestamps : true});

postSchema.plugin(mongooseAggregatePaginate);

export const Post = mongoose.model("Post", postSchema);