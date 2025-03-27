import { Router } from "express";
import postController from "./post.controller";

const postRouter = Router();

postRouter.get("/", postController.getAllPosts);
postRouter.get("/:id", postController.getPostById);
postRouter.post("/", postController.createPost);
postRouter.put("/:id", postController.updatePost);
postRouter.delete("/:id", postController.deletePost);

export { postRouter };
