import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authLimiter } from "../middlewares/rateLimit.middleware";

const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login admin
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@centa.local
 *               password:
 *                 type: string
 *                 example: Admin123!
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid email or password
 *       429:
 *         description: Too many login attempts
 */
router.post(
  "/login",
  authLimiter,
  authController.login
);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get current user profile
 *     description: Returns authenticated user profile.
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/profile",
  authMiddleware,
  authController.profile
);

export default router;