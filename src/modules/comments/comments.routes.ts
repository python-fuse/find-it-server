import { Router } from "express";
import commentsController from "./comments.controller";
import { CommentsValidation } from "./comments.validation";
import { runValidations } from "../../middlewares/validations.middleware";

const commentsRouter = Router();

// get 1 comment
commentsRouter.get(
  "/:commentId",
  runValidations(CommentsValidation.getComment),
  commentsController.getComment
);

// get post comments
commentsRouter.get(
  "/posts/:postId",
  runValidations(CommentsValidation.getPostComment),
  commentsController.getPostComments
);

// get user comments
commentsRouter.get(
  "/users/:userId",
  runValidations(CommentsValidation.getUserComments),
  commentsController.getUserComments
);

// create comment
commentsRouter.post(
  "/create",
  runValidations(CommentsValidation.createComment),
  commentsController.createComment
);

// update comment
commentsRouter.put(
  "/:commentId",
  runValidations(CommentsValidation.updateComment),
  commentsController.updateComment
);

// delete comment
commentsRouter.delete(
  "/:commentId",
  runValidations(CommentsValidation.deleteComment),
  commentsController.deleteComment
);

export { commentsRouter };
