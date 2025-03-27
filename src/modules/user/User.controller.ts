import { Request, Response } from "express";
import { UserService } from "./User.service";

export class UserController {
  async getAll(req: Request, res: Response) {
    const users = await UserService.index();
    res.json(users);
    return;
  }

  async create(req: Request, res: Response) {
    const { username, email, password } = req.body;
    console.log(req.body);

    const user = await UserService.findByEmail(email);

    if (user) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const newUser = await UserService.create({ email, username });

    res.status(201).json({ message: "User created", user: newUser });
    return;
  }

  async get(req: Request, res: Response) {
    const { id } = req.params;
    const user = await UserService.findBy("id", id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
    return;
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { username, email, password } = req.body;

    const user = await UserService.findBy("id", id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const updated = await UserService.update(id, { ...req.body });

    res.json({ message: "User updated", user: updated });
    return;
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const user = await UserService.findBy("id", id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    await UserService.delete(id);

    res.json({ message: "User deleted" });
    return;
  }
}
