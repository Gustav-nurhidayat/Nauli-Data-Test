import { Router } from "express";

import {
  getProfile,
  updateProfile,
  updatePassword,
  uploadAvatar,
} from "../controllers/profile.controller";

import { authMiddleware } from "../middlewares/auth.middleware";
import { avatarUpload } from "../middlewares/avatar-upload.middleware";

const router = Router();

router.get(
  "/",
  authMiddleware,
  getProfile
);

router.patch(
  "/",
  authMiddleware,
  updateProfile
);

router.patch(
  "/password",
  authMiddleware,
  updatePassword
);

router.post(
  "/avatar",
  authMiddleware,
  avatarUpload.single("avatar"),
  uploadAvatar
);

export default router;