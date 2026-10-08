import { Router } from "express";
import * as categoryController from "../controllers/category.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

/* -------------------------------------------------------------------------- */
/*                              Category Routes                               */
/* -------------------------------------------------------------------------- */

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create category
 *     description: Create a new category.
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Technology
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  authMiddleware,
  categoryController.createCategory
);

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     description: Retrieve all categories.
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/",
  authMiddleware,
  categoryController.getAllCategories
);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     description: Retrieve a category by its ID.
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: cmrjog1p60000p4b07fk8bq7i
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *       404:
 *         description: Category not found
 */
router.get(
  "/:id",
  authMiddleware,
  categoryController.getCategoryById
);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update category
 *     description: Update category by ID.
 *     tags:
 *       - Categories
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
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Technology
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 */
router.put(
  "/:id",
  authMiddleware,
  categoryController.updateCategory
);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete category
 *     description: Delete category by ID.
 *     tags:
 *       - Categories
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
 *         description: Category deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 */
router.delete(
  "/:id",
  authMiddleware,
  categoryController.deleteCategory
);

export default router;