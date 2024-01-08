import { Router } from "express";

import { upload } from "../middlewares/multer.middleware.js";

import {
  logOutUserController,
  loginUserController,
  registerUserController,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUserController
);

router.route("/login").post(loginUserController);

// secured routes
router.route("/logout").post(verifyJWT, logOutUserController);

export default router;
