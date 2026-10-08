import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { verifyAdminSession } from "../services/auth.service";

const JWT_SECRET = env.JWT_SECRET;

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  

  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Format token salah",
      });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      req.user = decoded;

      return next();
    } catch {
      return res.status(401).json({
        status: "error",
        message: "Token tidak valid",
      });
    }
  }

  const adminSession = req.cookies?.adm_sess;

  if (!adminSession) {
    return res.status(401).json({
      status: "error",
      message: "Authentication required",
    });
  }


  try {
    const decoded = verifyAdminSession(adminSession);

    req.user = decoded;

    return next();
  } catch {
    return res.status(401).json({
      status: "error",
      message: "Admin session tidak valid",
    });
  }
};


export const optionalAuthMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    if (token) {
      try {
        const decoded = jwt.verify(
          token,
          JWT_SECRET
        );

        req.user = decoded;
      } catch {
       
      }
    }
  }

 
  if (!req.user) {
    const adminSession = req.cookies?.adm_sess;

    if (adminSession) {
      try {
        const decoded =
          verifyAdminSession(adminSession);

        req.user = decoded;
      } catch {
        
      }
    }
  }

  next();
};