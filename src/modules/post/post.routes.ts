import { Router } from "express";
import postController from "./post.controller";

const postRouter = Router();

postRouter.get("/", postController.getAllPosts);
postRouter.get("/:id", postController.getPostById);
postRouter.post("/", postController.createPost);
postRouter.put("/:id", postController.updatePost);
postRouter.delete("/:id", postController.deletePost);

// Ownership and claims
postRouter.get("/:id/claim", postController.claimPost);
postRouter.get("/:id/remove-claims", postController.removeAllClaims);
postRouter.get("/:id/resolve", postController.markPostAsResolved);

export { postRouter };
