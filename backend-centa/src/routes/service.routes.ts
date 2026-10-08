/**
 * @swagger
 * tags:
 *   name: Service
 *   description: Service Management API
 */

import { Router } from "express";

import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/service.controller";

import { authMiddleware } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

const router = Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/


/**
 * @swagger
 * /services:
 *   get:
 *     summary: Get all services
 *     tags: [Service]
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", getAllServices);

/**
 * @swagger
 * /services/{id}:
 *   get:
 *     summary: Get service by id
 *     tags: [Service]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Service not found
 */
router.get("/:id", getServiceById);

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/


/**
 * @swagger
 * /services:
 *   post:
 *     summary: Create service
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Service created
 */
router.post(
  "/",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  createService
);

/**
 * @swagger
 * /services/{id}:
 *   put:
 *     summary: Update service
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Service updated
 */
router.put(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  updateService
);

/**
 * @swagger
 * /services/{id}:
 *   delete:
 *     summary: Delete service
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Service deleted
 */
router.delete(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  deleteService
);


export default router;

