import { Router } from "express";
import * as dashboardController from "../controllers/dashboard.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

/* -------------------------------------------------------------------------- */
/*                              Dashboard Routes                              */
/* -------------------------------------------------------------------------- */

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Get dashboard statistics
 *     description: Retrieve dashboard statistics for the admin panel.
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: Dashboard retrieved successfully
 *               data:
 *                 totalUsers: 25
 *                 totalArticles: 58
 *                 totalCategories: 6
 *                 totalContacts: 14
 *                 publishedArticles: 40
 *                 draftArticles: 18
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get(
  "/",
  authMiddleware,
  dashboardController.getDashboard
);

router.get(
  "/xss",
  authMiddleware,
  dashboardController.getDashboardXss
);

export default router;