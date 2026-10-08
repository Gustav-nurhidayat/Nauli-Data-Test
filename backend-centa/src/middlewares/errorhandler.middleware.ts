import {
  Request,
  Response,
  NextFunction,
} from "express";

interface HttpError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  console.error({
    message: error.message,
    stack: error.stack,
    path: req.originalUrl,
    method: req.method,
    time: new Date().toISOString(),
  });

  const statusCode =
  error.statusCode ??
  (error.message === "Not allowed by CORS" ? 403 : 500);

  return res.status(statusCode).json({
    status: "error",
    message:
      statusCode === 500
        ? "Internal Server Error"
        : error.message,
  });
};
