import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { getCurrectUser, loginUser, logoutUser, refreshAccessToken, registerUser, updatePassword, updateProfile } from "../controllers/user.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "profileImage", maxCount: 1 },
  ]),
  registerUser
);

router.route("/login").post(loginUser)

router.route("/profile-update").patch(jwtVerify, upload.fields([{ name: "profileImage", maxCount: 1 }]) ,updateProfile);

router.route("/password-reset").post(jwtVerify, updatePassword);
router.route("/current-user").get(jwtVerify, getCurrectUser)
router.route('/logout').post(jwtVerify, logoutUser);
router.post("/refresh-token", refreshAccessToken);


export default router;
