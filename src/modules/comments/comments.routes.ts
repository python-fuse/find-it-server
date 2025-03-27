import { Router } from "express";
import commentsController from "./comments.controller";

const commentsRouter = Router();

// get 1 comment
commentsRouter.get("/:commentId", commentsController.getComment);

// get post comments
commentsRouter.get("/posts/:postId", commentsController.getPostComments);

// get user comments
commentsRouter.get("/users/:userId", commentsController.getUserComments);

// create comment
commentsRouter.post("/", commentsController.createComment);

// update comment
commentsRouter.put("/:commentId", commentsController.updateComment);

// delete comment
commentsRouter.delete("/:commentId", commentsController.deleteComment);

export { commentsRouter };
