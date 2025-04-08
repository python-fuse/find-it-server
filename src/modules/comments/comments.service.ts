import { Comment } from "@prisma/client";
import { NotFoundError } from "../../utils/errors";
import prisma from "../../utils/prisma";
import { UserService } from "../user/User.service";

export class CommentsService {
  async getPostComments(postId: string) {
    // get comments for post
    return await prisma.comment.findMany({
      where: {
        postID: postId,
      },
    });
  }

  async getUserComments(userID: string) {
    const dbUser = await UserService.findBy("id", userID);

    if (!dbUser) {
      throw new NotFoundError("User not found");
    }

    // get comments for user
    return await prisma.comment.findMany({
      where: {
        userID,
      },
    });
  }

  async getComment(commentId: string) {
    const dbComment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!dbComment) {
      throw new NotFoundError("Comment not found");
    }

    return dbComment;
  }
  async createComment(
    comment: Omit<Comment, "id" | "createdAt" | "updatedAt">
  ) {
    // create comment
    return await prisma.comment.create({
      data: comment,
    });
  }

  async updateComment(commentId: string, content: string) {
    // update comment
    return await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        content: content,
      },
    });
  }

  async deleteComment(commetId: string) {
    // delete comment
    return await prisma.comment.delete({
      where: {
        id: commetId,
      },
    });
  }
}

export default new CommentsService();
