import { NextFunction, Request, Response } from "express";

export class postController {
  async getAllPosts(req: Request, res: Response, next: NextFunction) {}
  async getAllUserPosts(req: Request, res: Response, next: NextFunction) {}
  async getPost(req: Request, res: Response, next: NextFunction) {}
  async createPost(req: Request, res: Response, next: NextFunction) {}
  async updatePost(req: Request, res: Response, next: NextFunction) {}
  async deletePost(req: Request, res: Response, next: NextFunction) {}
}
