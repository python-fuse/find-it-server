import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../utils/errors";

export const authorizeUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session || !req.user) {
    throw new UnauthorizedError("Unauthorized");
  }

  const now = new Date();

  const expiryDate = new Date(req.session.cookie.expires || "");
  if (expiryDate < now) {
    req.session.destroy((err) => {
      console.log(err);
    });
    throw new UnauthorizedError("Session Expired, Please login again!");
  }

  next();
};
