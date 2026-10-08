import { Router } from "express";
import { Role } from "@prisma/client";

import * as articleController from "../controllers/article.controller";

import {
  authMiddleware,
  optionalAuthMiddleware,
} from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";
import { validate } from "../middlewares/validation.middleware";

import {
  createArticleSchema,
  updateArticleSchema,
} from "../validations/article.validation";

const router = Router();

/* -------------------------------------------------------------------------- */
/*                               Public Routes                                */
/* -------------------------------------------------------------------------- */

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Get all articles
 *     description: Retrieve a paginated list of articles.
 *     tags:
 *       - Articles
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of articles per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: cyber security
 *         description: Search article by title, excerpt, or content
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum:
 *             - DRAFT
 *             - PUBLISHED
 *         description: Filter article by status
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *           example: cmrjog1p60000p4b07fk8bq7i
 *         description: Filter article by category ID
 *     responses:
 *       200:
 *         description: Articles retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get(
  "/",
  optionalAuthMiddleware,
  articleController.getAllArticles
);

/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     summary: Get article by ID
 *     description: Retrieve a single article by its ID.
 *     tags:
 *       - Articles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: cmrnq0d5f0001p4xlj9qanvuj
 *     responses:
 *       200:
 *         description: Article retrieved successfully
 *       404:
 *         description: Article not found
 */
router.get(
  "/:id",
  optionalAuthMiddleware,
  articleController.getArticleById
);

/* -------------------------------------------------------------------------- */
/*                               Admin Routes                                 */
/* -------------------------------------------------------------------------- */

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Create article
 *     tags:
 *       - Articles
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - categoryId
 *             properties:
 *               title:
 *                 type: string
 *                 example: Centa Limited Company
 *               excerpt:
 *                 type: string
 *                 example: Company Software Development
 *               content:
 *                 type: string
 *                 example: First article for Centa.
 *               thumbnail:
 *                 type: string
 *                 example: /uploads/image.jpg
 *               categoryId:
 *                 type: string
 *                 example: cmrjog1p60000p4b07fk8bq7i
 *     responses:
 *       201:
 *         description: Article created successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post(
  "/",
  authMiddleware,
  authorize(Role.ADMIN, Role.SUPER_ADMIN),
  validate(createArticleSchema),
  articleController.createArticle
);

/**
 * @swagger
 * /articles/{id}:
 *   put:
 *     summary: Update article
 *     description: Update an existing article.
 *     tags:
 *       - Articles
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
 *               title:
 *                 type: string
 *               excerpt:
 *                 type: string
 *               content:
 *                 type: string
 *               thumbnail:
 *                 type: string
 *               categoryId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Article updated successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Article not found
 */
router.put(
  "/:id",
  authMiddleware,
  authorize(Role.ADMIN, Role.SUPER_ADMIN),
  validate(updateArticleSchema),
  articleController.updateArticle
);

/**
 * @swagger
 * /articles/{id}:
 *   delete:
 *     summary: Delete article
 *     description: Delete article by ID.
 *     tags:
 *       - Articles
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
 *         description: Article deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Article not found
 */
router.delete(
  "/:id",
  authMiddleware,
  authorize(Role.ADMIN, Role.SUPER_ADMIN),
  articleController.deleteArticle
);

/**
 * @swagger
 * /articles/{id}/publish:
 *   patch:
 *     summary: Publish article
 *     description: Change article status to PUBLISHED.
 *     tags:
 *       - Articles
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
 *         description: Article published successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Article not found
 */
router.patch(
  "/:id/publish",
  authMiddleware,
  authorize(Role.ADMIN, Role.SUPER_ADMIN),
  articleController.publishArticle
);

/**
 * @swagger
 * /articles/{id}/draft:
 *   patch:
 *     summary: Move article to draft
 *     description: Change article status to DRAFT.
 *     tags:
 *       - Articles
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
 *         description: Article moved to draft successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Article not found
 */
router.patch(
  "/:id/draft",
  authMiddleware,
  authorize(Role.ADMIN, Role.SUPER_ADMIN),
  articleController.draftArticle
);

export default router;