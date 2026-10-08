import rateLimit from "express-rate-limit";

/**
 * Rate limiter for authentication endpoints
 * Prevents brute-force login attacks.
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes

  max: 5,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    status: "error",
    message: "Too many login attempts. Please try again in 15 minutes.",
  },
});

/**
 * General API rate limiter
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes

  max: 100,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    status: "error",
    message: "Too many requests. Please try again later.",
  },
});