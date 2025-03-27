import { User } from "@prisma/client";
import prisma from "../../utils/prisma";
import { BadRequestError } from "../../utils/errors";
import { hash } from "bcryptjs";
import { UserService } from "../user/User.service";
import { CreatedResponse, SuccessResponse } from "../../utils/response";
import { Request } from "express";

class AuthService {
  static saltRounds = 10;

  static register = async (user: Partial<User>) => {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: user.email,
      },
    });

    if (existingUser) {
      throw new BadRequestError("User already exists!");
    }

    // const hashedPassword = await hash(user.password!, this.saltRounds);

    const newUser = await UserService.create({
      email: user.email,
      username: user.username,
    });

    return new CreatedResponse("User registered successfully!", newUser);
  };

  static logout = async (req: Request) => {
    req.logout(() => null);
    req.session.destroy(() => null);
    return new SuccessResponse("Logged out successfully!", {});
  };
}

export default AuthService;
