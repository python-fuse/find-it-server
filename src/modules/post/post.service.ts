import { Post, PostStatus } from "@prisma/client";
import { BaseError, NotFoundError } from "../../utils/errors";
import prisma from "../../utils/prisma";
import fs from "fs";
import { uploadImage } from "../../utils/cloudinary";

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
  async createPost(
    post: Omit<Post, "id" | "createdAt" | "updatedAt">,
    imagePath?: string
  ) {
    let imageUrl: string | undefined;

    if (imagePath) {
      try {
        imageUrl = await uploadImage(imagePath);

        fs.unlinkSync(imagePath);
      } catch (error) {
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
        console.error("Error uploading image:", error);
        throw error;
      }
    }

    return await prisma.post.create({
      data: {
        ...post,
        imageURL: imageUrl || "",
      },
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

  async claimPost(postId: string, userId: string) {
    const dbPost = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!dbPost) {
      throw new NotFoundError("Post not found");
    }

    return await prisma.post.update({
      where: { id: postId },
      data: {
        claimedByID: userId,
      },
    });
  }

  async removeAllClaims(postId: string) {
    const dbPost = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!dbPost) {
      throw new NotFoundError("Post not found");
    }

    return await prisma.post.update({
      where: { id: postId },
      data: {
        claimedByID: null,
      },
    });
  }

  async markPostAsResolved(postId: string) {
    const dbPost = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!dbPost) {
      throw new NotFoundError("Post not found");
    }

    return await prisma.post.update({
      where: { id: postId },
      data: {
        postStatus: PostStatus.Resolved,
      },
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
