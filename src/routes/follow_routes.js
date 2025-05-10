import {Router} from "express";
import {follow} from "../controllers/follow_controller.js"
import {verifyJWt} from "../middlewares/auth_middleware.js"

const router = Router()

router.use(verifyJWt);

router.route("/follow").post(follow);


export default router;