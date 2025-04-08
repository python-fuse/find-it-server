import { NextFunction, Request, Response } from "express";
import postService from "./post.service";

export class postController {
  async getAllPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const posts = await postService.getAllPosts();
      res.status(200).json(posts);
      return;
    } catch (error) {
      next(error);
      return;
    }
  }

  async getAllUserPosts(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.userId;
    try {
      const posts = await postService.getAllUserPosts(userId);
      res.status(200).json(posts);
      return;
    } catch (error) {
      next(error);
      return;
    }
  }

  async getPostById(req: Request, res: Response, next: NextFunction) {
    const postId = req.params.postId;
    try {
      const post = await postService.getPost(postId);
      res.status(200).json(post);
      return;
    } catch (error) {
      next(error);
      return;
    }
  }

  async createPost(req: Request, res: Response, next: NextFunction) {
    const postData = req.body;
    try {
      const post = await postService.createPost(postData);
      res.status(200).json(post);
      return;
    } catch (error) {
      next(error);
      return;
    }
  }

  async updatePost(req: Request, res: Response, next: NextFunction) {
    const postId = req.params.postId;
    const postData = req.body;
    try {
      const post = await postService.updatePost(postId, postData);
      res.status(200).json(post);
      return;
    } catch (error) {
      next(error);
      return;
    }
  }

  async claimPost(req: Request, res: Response, next: NextFunction) {
    const postId = req.params.postId;
    const userId = req.body.userId;
    try {
      const post = await postService.claimPost(postId, userId);
      res.status(200).json(post);
      return;
    } catch (error) {
      next(error);
      return;
    }
  }

  async removeAllClaims(req: Request, res: Response, next: NextFunction) {
    const postId = req.params.postId;
    try {
      await postService.removeAllClaims(postId);
      res.status(200).json({ message: "All claims removed" });
      return;
    } catch (error) {
      next(error);
      return;
    }
  }

  async markPostAsResolved(req: Request, res: Response, next: NextFunction) {
    const postId = req.params.postId;
    try {
      const post = await postService.markPostAsResolved(postId);
      res.status(200).json(post);
      return;
    } catch (error) {
      next(error);
      return;
    }
  }

  async deletePost(req: Request, res: Response, next: NextFunction) {
    const postId = req.params.postId;
    try {
      await postService.deletePost(postId);
      res.status(200).json({ message: "Post deleted successfully" });
      return;
    } catch (error) {
      next(error);
      return;
    }
  }
}

export default new postController();
