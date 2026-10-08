import { Request, Response, NextFunction } from "express";
import { Role } from "@prisma/client";

export const authorize =
  (...roles: Role[]) =>
  (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "error",
        message: "Forbidden",
      });
    }

    next();
  };