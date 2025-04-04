import { Router } from "express";
import { UserController } from "./User.controller";

import { runValidations } from "../../middlewares/validations.middleware";
import { UserValidation } from "./User.validation";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/", userController.getAll);

userRouter.post(
  "/new",
  runValidations(UserValidation.createUser),
  userController.create
);

userRouter.get(
  "/:id",
  runValidations(UserValidation.getUser),
  userController.get
);

userRouter.put(
  "/:id",
  runValidations(UserValidation.updateUser),
  userController.update
);

userRouter.delete(
  "/:id",
  runValidations(UserValidation.deleteUser),
  userController.delete
);

export { userRouter };
1;
