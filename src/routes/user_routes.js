import {Router} from "express";
import {registerUser, loginUser, logoutUser, renewAccessToken, updatePassword, getCurrentUser, updateFullname, updateProfileImage, getUserProfile } from "../controllers/user_controller.js"
import { upload }  from "../middlewares/multer.js"
import {verifyJWt} from "../middlewares/auth_middleware.js"

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

router.route("/login").post(loginUser);


//login requireed routes
router.route("/logout").post(verifyJWt, logoutUser);
router.route("/renew_tokens").post(renewAccessToken);
router.route("/update_password").post(verifyJWt, updatePassword);
router.route("/update_fullname").post(verifyJWt, updateFullname);
router.route("/update_profileimg").post(verifyJWt, updateProfileImage);
router.route("/profile/:username").post(getUserProfile);


export default router;