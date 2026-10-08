import { Request, Response } from "express";
import * as feedbackService from "../services/feedback.service";

export const submitFeedback = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        status: "error",
        message: "name, email, dan message wajib diisi",
      });
    }

    const feedback = await feedbackService.createFeedback(
      name,
      email,
      subject || "",
      message
    );

    return res.status(201).json({
      status: "success",
      message: "Feedback berhasil dikirim",
      data: feedback,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};