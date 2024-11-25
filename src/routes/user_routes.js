import {Router} from "express";
import registerUser from "../controllers/user_controller.js"
import { upload }  from "../middlewares/multer.js"

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "profileImg",
            maxCount: 1
        },
        {
            name: "banner",
            maxCount: 1
        }
    ]),
    registerUser);

export default router;