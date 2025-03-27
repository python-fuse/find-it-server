import { User } from "@prisma/client";
import prisma from "../../utils/prisma";

export class UserService {
  static index = async () => {
    return await prisma.user.findMany();
  };

  static async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  static async findBy(field: "id" | "email" | "googleID", id: string) {
    switch (field) {
      case "id":
        return await prisma.user.findUnique({
          where: {
            id,
          },
        });
      case "email":
        return await prisma.user.findUnique({
          where: {
            email: id,
          },
        });
      case "googleID":
        return await prisma.user.findUnique({
          where: {
            googleID: id,
          },
        });
    }
  }

  static create = async (user: Partial<User>) => {
    return await prisma.user.create({
      data: {
        email: user.email!,
        username: user.username!,
        googleID: user.googleID!,
        avatar: user.avatar || "",
      },
    });
  };

  static async update(id: string, user: Partial<User>) {
    return await prisma.user.update({
      where: {
        id,
      },
      data: user,
    });
  }

  static async delete(id: string) {
    return await prisma.user.delete({
      where: {
        id,
      },
    });
  }
}

export default new UserService();
