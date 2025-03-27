import { NextFunction, Request, Response } from "express";

export const logger = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.on("finish", () => {
    console.log(
      `${new Date().toUTCString()} - ${req.method} ${req.originalUrl} - ${
        res.statusCode
      }`
    );
  });
  next();
};
