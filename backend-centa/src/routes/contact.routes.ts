import { Router } from "express";
import { Role } from "@prisma/client";

import * as contactController from "../controllers/contact.controller";

import { authMiddleware } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

const router = Router();

/* -------------------------------------------------------------------------- */
/*                              Public Routes                                 */
/* -------------------------------------------------------------------------- */

/**
 * @swagger
 * /contact:
 *   post:
 *     summary: Send contact message
 *     description: Public endpoint for visitors to send a contact message.
 *     tags:
 *       - Contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - subject
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               subject:
 *                 type: string
 *                 example: Business Partnership
 *               message:
 *                 type: string
 *                 example: I would like to discuss a collaboration.
 *     responses:
 *       201:
 *         description: Contact message sent successfully
 *       400:
 *         description: Validation failed
 */
router.post("/", contactController.create);

/* -------------------------------------------------------------------------- */
/*                               Admin Routes                                 */
/* -------------------------------------------------------------------------- */

/**
 * @swagger
 * /contact:
 *   get:
 *     summary: Get all contact messages
 *     description: Retrieve all contact messages (Admin only).
 *     tags:
 *       - Contact
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Contacts retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get(
  "/",
  authMiddleware,
  authorize(Role.ADMIN, Role.SUPER_ADMIN),
  contactController.getAll
);

/**
 * @swagger
 * /contact/{id}:
 *   get:
 *     summary: Get contact by ID
 *     description: Retrieve a contact message by ID (Admin only).
 *     tags:
 *       - Contact
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: cmrnq0d5f0001p4xlj9qanvuj
 *     responses:
 *       200:
 *         description: Contact retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Contact not found
 */
router.get(
  "/:id",
  authMiddleware,
  authorize(Role.ADMIN, Role.SUPER_ADMIN),
  contactController.getById
);

/**
 * @swagger
 * /contact/{id}:
 *   put:
 *     summary: Update contact
 *     description: Update a contact message (Admin only).
 *     tags:
 *       - Contact
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
 *               email:
 *                 type: string
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Contact not found
 */
router.put(
  "/:id",
  authMiddleware,
  authorize(Role.ADMIN, Role.SUPER_ADMIN),
  contactController.update
);

/**
 * @swagger
 * /contact/{id}:
 *   delete:
 *     summary: Delete contact
 *     description: Delete a contact message (Admin only).
 *     tags:
 *       - Contact
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
 *         description: Contact deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Contact not found
 */
router.delete(
  "/:id",
  authMiddleware,
  authorize(Role.ADMIN, Role.SUPER_ADMIN),
  contactController.remove
);

export default router;