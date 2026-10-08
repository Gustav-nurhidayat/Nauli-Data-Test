import { Router } from "express";
import { Role } from "@prisma/client";

import { uploadImage } from "../controllers/upload.controller";
import { upload } from "../middlewares/upload.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

const router = Router();

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload image
 *     description: Upload an image file to the server.
 *     tags:
 *       - Upload
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *       400:
 *         description: Invalid file or upload failed
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post(
  "/",
  authMiddleware,
  authorize(Role.SUPER_ADMIN, Role.ADMIN),
  upload.single("file"),
  uploadImage
);

export default router;