import { Router } from "express";
 import { commentsController } from "./comments.controller";

 const commentsRouter = Router();
 const commentsController = new commentsController();

 export { commentsRouter };