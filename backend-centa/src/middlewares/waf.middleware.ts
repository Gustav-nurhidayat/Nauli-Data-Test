import { Request, Response, NextFunction } from "express";

export const wafMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = JSON.stringify(req.body || "").toLowerCase();

  // Block obvious script tags
  if (body.includes("<script")) {
    return res.status(403).json({
      status: "blocked",
      message: "WAF: malicious payload detected",
    });
  }

  // Block direct cookie keyword access
  if (body.includes("document.cookie")) {
    return res.status(403).json({
      status: "blocked",
      message: "WAF: cookie access pattern detected",
    });
  }

  next();
};