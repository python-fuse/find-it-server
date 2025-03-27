import { Post } from "@prisma/client";
import { NotFoundError } from "../../utils/errors";
import prisma from "../../utils/prisma";

export class PostService {
  async getAllPosts() {
    return await prisma.post.findMany();
  }
  async getAllUserPosts(userID: string) {
    const dbUser = await prisma.user.findUnique({
      where: { id: userID },
    });
    if (!dbUser) {
      throw new NotFoundError("User not found");
    }

    return await prisma.post.findMany({
      where: { userID },
    });
  }
  async getPost(postID: string) {
    const dbPost = await prisma.post.findUnique({
      where: { id: postID },
    });
    if (!dbPost) {
      throw new NotFoundError("Post not found");
    }

    return dbPost;
  }
  async createPost(post: Omit<Post, "id" | "createdAt" | "updatedAt">) {
    return await prisma.post.create({
      data: post,
    });
  }

  async updatePost(
    postId: string,
    post: Omit<Post, "createdAt" | "updatedAt">
  ) {
    const dbPost = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!dbPost) {
      throw new NotFoundError("Post not found");
    }

    return await prisma.post.update({
      where: { id: postId },
      data: post,
    });
  }
  async deletePost(postId: string) {
    const dbPost = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!dbPost) {
      throw new NotFoundError("Post not found");
    }

    return await prisma.post.delete({
      where: { id: postId },
    });
  }
}

export default new PostService();
