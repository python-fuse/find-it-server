import { NextFunction, Request, Response } from "express";
import { BaseError } from "../utils/errors";

export const errorHandler = async (
  err: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.status || 500).json({
    status: err.status,
    error: err.name,
    message: err.message,
  });
};
