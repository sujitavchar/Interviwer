import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
 
const commentSchema = new Schema({
    author: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    replies: [
      {
        author: String,
        content: String,
        timestamp: { type: Date, default: Date.now }
      }
    ]
});


const postSchema = new Schema({
    text : {
        type: String,
        required: true,
        index: true
    },

    comments : [commentSchema],

    image : {
        type: String, //cloudinary url
    },
    // video: {
    //     type: String, //cloudinaryurl
    // },
    likes: {
        type: Number,
        default : 0
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