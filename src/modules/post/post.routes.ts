import { Router } from "express";
import postController from "./post.controller";
import { PostValidation } from "./post.validation";
import { runValidations } from "../../middlewares/validations.middleware";
import { upload } from "../../utils/multer";

const postRouter = Router();

postRouter.get("/", postController.getAllPosts);

postRouter.get(
  "/:id",
  runValidations(PostValidation.get),
  postController.getPostById
);

postRouter.post(
  "/new",
  upload.single("image"),
  runValidations(PostValidation.create),
  postController.createPost
);

postRouter.put(
  "/:id",
  runValidations(PostValidation.update),
  postController.updatePost
);

postRouter.delete(
  "/:id",
  runValidations(PostValidation.delete),
  postController.deletePost
);

// Ownership and claims
postRouter.get(
  "/:id/claim",
  runValidations(PostValidation.get),
  postController.claimPost
);
postRouter.get("/:id/remove-claims", postController.removeAllClaims);
postRouter.get("/:id/resolve", postController.markPostAsResolved);

export { postRouter };
