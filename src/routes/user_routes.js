import {Router} from "express";
import {registerUser, loginUser, logoutUser, renewAccessToken, updatePassword, getCurrentUser, updateFullname, updateProfileImage, getUserProfile, getMyPosts } from "../controllers/user_controller.js"
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
router.route("/update_password").patch(verifyJWt, updatePassword);
router.route("/update_fullname").patch(verifyJWt, updateFullname);
router.route("/update_profileimg").patch(verifyJWt, upload.single("profileImg") ,updateProfileImage); //add for cover image - to do
router.route("/current-user").get(verifyJWt, getCurrentUser);
router.route("/profile/:username").get(verifyJWt,getUserProfile);
router.route("/posts").get(verifyJWt, getMyPosts);


export default router;