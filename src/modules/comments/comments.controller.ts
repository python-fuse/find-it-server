import CommentsService from "./comments.service";
import { Request, Response, NextFunction } from "express";

export class commentsController {
  async getPostComments(req: Request, res: Response, next: NextFunction) {
    const postId = req.params.postId;
    try {
      const comments = await CommentsService.getPostComments(postId);
      res.json(comments);
    } catch (error) {
      next(error);
    }
  }

  async getComment(req: Request, res: Response, next: NextFunction) {
    const commentId = req.params.commentId;
    try {
      const comment = await CommentsService.getComment(commentId);
      res.json(comment);
    } catch (error) {
      next(error);
    }
  }

  async getUserComments(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.userId;
    try {
      const comments = await CommentsService.getUserComments(userId);
      res.json(comments);
    } catch (error) {
      next(error);
    }
  }

  async createComment(req: Request, res: Response, next: NextFunction) {
    const {
      content,
      userID,
      postID,
    }: { content: string; userID: string; postID: string } = req.body;

    try {
      const newComment = await CommentsService.createComment({
        content,
        userID,
        postID,
      });
      res.json(newComment);
    } catch (error) {
      next(error);
    }
  }

  async updateComment(req: Request, res: Response, next: NextFunction) {
    const commentId = req.params.commentId;
    const content = req.body;

    try {
      const updatedComment = await CommentsService.updateComment(
        commentId,
        content
      );
      res.json(updatedComment);
    } catch (error) {
      next(error);
    }
  }

  async deleteComment(req: Request, res: Response, next: NextFunction) {
    const commentId = req.params.commentId;
    try {
      const deletedComment = await CommentsService.deleteComment(commentId);
      res.json(deletedComment);
    } catch (error) {
      next(error);
    }
  }
}

export default new commentsController();
