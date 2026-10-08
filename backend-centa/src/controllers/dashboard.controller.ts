import { Request, Response } from "express";
import * as dashboardService from "../services/dashboard.service";

export const getDashboard = async (
  req: Request,
  res: Response
) => {
  try {
    const dashboard = await dashboardService.getDashboard();

    return res.status(200).json({
      status: "success",
      message: "Dashboard berhasil diambil",
      data: dashboard,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getDashboardXss = async (
  req: Request,
  res: Response
) => {
  try {
    const latestFeedback = await dashboardService.getLatestFeedback();

    return res.status(200).json({
      status: "success",
      data: {
        xssPayload: latestFeedback?.message || "",
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};