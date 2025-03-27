import { Router } from "express";
 import { postController } from "./post.controller";

 const postRouter = Router();
 const postController = new postController();

 export { postRouter };