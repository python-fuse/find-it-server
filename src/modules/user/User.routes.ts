import { Router } from "express";
import { UserController } from "./User.controller";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/", userController.getAll);
userRouter.post("/new", userController.create);
userRouter.get("/:id", userController.get);
userRouter.put("/:id", userController.update);
userRouter.delete("/:id", userController.delete);

export { userRouter };
1;
