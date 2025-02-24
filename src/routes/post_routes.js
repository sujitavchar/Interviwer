import {Router} from "express";
import {getALLPosts, createPost } from "../controllers/post_controller.js"
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



export default router;

