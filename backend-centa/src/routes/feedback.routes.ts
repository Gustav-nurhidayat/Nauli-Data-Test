import { Router } from "express";
import * as feedbackController from "../controllers/feedback.controller";
import { wafMiddleware } from "../middlewares/waf.middleware";

const router = Router();

router.post(
  "/feedback",
  wafMiddleware,
  feedbackController.submitFeedback
);

export default router;