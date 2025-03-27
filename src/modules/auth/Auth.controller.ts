import { NextFunction, Request, Response } from "express";
import AuthService from "./Auth.service";

export class AuthController {
  async logout(req: Request, res: Response) {
    const response = await AuthService.logout(req);
    res
      .status(response.status)
      .json({ message: response.message, ...response.data });
  }
}
