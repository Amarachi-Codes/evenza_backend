import type { Request, Response, NextFunction } from "express";
import { AppError } from "../exception/AppError";
import { logger } from "./logger.util";


AppError
export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof AppError) {
    logger.warn(`[${req.method}] ${req.url} -> ${err.message}`);
    return res.status(err.statusCode).json({
      error: true,
      message: err.message,
    });
  }

  // Unexpected errors
  logger.error(`[${req.method}] ${req.url} -> ${err.message}`, {
    stack: err.stack,
  });

  return res.status(500).json({
    error: true,
    message: "Internal Server Error",
  });
}