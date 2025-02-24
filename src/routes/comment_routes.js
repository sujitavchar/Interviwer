import {Router} from "express";
import {getAllCommentsByPostId, addComment, deleteComment} from "../controllers/comment_controller.js"
import {verifyJWt} from "../middlewares/auth_middleware.js"

const router = Router()

router.use(verifyJWt);


router.route("/getcomments/:postId").get(getAllCommentsByPostId);
router.route("/addcomment/:postId").post(addComment);
router.route("/deletecomment").delete(deleteComment);


export default router;