import express from "express";
import { changeCurrentPassword, getCurrentUser, loginUser, logoutUser, registerUser, updateAccountDetails,updateUserAvatar} from "../controllers/user.controller.js";
import {verifyJWT} from "../middleware/auth.middleware.js"
import { upload } from "../middleware/multer.middleware.js";
const router = express.Router();

// Register a new user
router.post("/register", registerUser);
router.post("/login",loginUser)

// secured Routes
router.post("/logout",verifyJWT,logoutUser)
router.post("/change-password",verifyJWT,changeCurrentPassword)

router.patch("/change-details",verifyJWT,updateAccountDetails)

router.get("/current-user",verifyJWT,getCurrentUser)

router.route("/avatar").patch(verifyJWT,upload.single("avatar"),updateUserAvatar)

export default router;
