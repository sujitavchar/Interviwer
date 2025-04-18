import {Router} from "express";
import {getALLPosts, createPost, getPostById ,updatePost, deletePost, togglePublishStatus, enhancePostText} from "../controllers/post_controller.js"
import { likePost } from "../controllers/like_controller.js";
import { upload }  from "../middlewares/multer.js"
import {verifyJWt} from "../middlewares/auth_middleware.js"

const router = Router()

router.use(verifyJWt);

router.route("/feed").get(getALLPosts);
router.route("/createpost").post(upload.fields([
    {
        name: "image",
        maxCount: 1
    }
]),createPost);
router.route("/getpostbyid/:postId").get(getPostById);
router.route("/updatePost").patch(updatePost);
router.route("/deletePost").delete(deletePost);
router.route("/publish").post(togglePublishStatus);
router.route("/like/:postId").post(likePost);

//Ai integrations
router.route("/enhance-text").post(enhancePostText);



export default router;

