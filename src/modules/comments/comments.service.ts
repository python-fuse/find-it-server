import { Comment } from "@prisma/client";
import { NotFoundError } from "../../utils/errors";
import prisma from "../../utils/prisma";
import { UserService } from "../user/User.service";

export class commentsService {
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
  async createComment(comment: Comment) {
    // create comment
    return await prisma.comment.create({
      data: comment,
    });
  }

  async updateComment(commentId: string, comment: Comment) {
    // update comment
    return await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: comment,
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
