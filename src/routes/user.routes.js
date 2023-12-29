import { Router } from "express";

import { upload } from "../middlewares/multer.middleware.js";

import { registerUserController } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUserController
);

export default router;
