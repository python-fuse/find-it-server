import { body, param, ValidationChain } from "express-validator";

export class CommentsValidation {
  static createComment: ValidationChain[] = [
    body("content")
      .trim()
      .notEmpty()
      .withMessage("Comment content is required")
      .isLength({ min: 1, max: 1000 })
      .withMessage("Comment must be between 1 and 1000 characters"),

    body("userId").notEmpty().withMessage("User ID is required"),

    body("postId")
      .notEmpty()
      .withMessage("Post ID is required")
      .isMongoId()
      .withMessage("Invalid post ID format"),
  ];

  static updateComment = [
    param("id")
      .notEmpty()
      .withMessage("Comment ID is required")
      .isMongoId()
      .withMessage("Invalid comment ID format"),

    body("content")
      .trim()
      .notEmpty()
      .withMessage("Comment content is required")
      .isLength({ min: 1, max: 1000 })
      .withMessage("Comment must be between 1 and 1000 characters"),
  ];

  static deleteComment = [
    param("id")
      .notEmpty()
      .withMessage("Comment ID is required")
      .isMongoId()
      .withMessage("Invalid comment ID format"),
  ];

  static getComment = [
    param("id")
      .notEmpty()
      .withMessage("Comment ID is required")
      .isMongoId()
      .withMessage("Invalid comment ID format"),
  ];
}
