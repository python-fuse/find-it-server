import { body, param, ValidationChain } from "express-validator";

export class PostValidation {
  static get: ValidationChain[] = [
    param("id").notEmpty().withMessage("Post ID is required!"),
  ];

  static create: ValidationChain[] = [
    body("title")
      .notEmpty()
      .withMessage("Title is required")
      .isString()
      .withMessage("Title must be a string")
      .isLength({ min: 3, max: 100 })
      .withMessage("Title must be between 3 and 100 characters"),

    body("description")
      .notEmpty()
      .withMessage("Description is required")
      .isString()
      .withMessage("Description must be a string")
      .isLength({ min: 10 })
      .withMessage("Description must be at least 10 characters"),

    body("category")
      .notEmpty()
      .withMessage("Category is required")
      .isString()
      .withMessage("Category must be a string"),

    body("location")
      .notEmpty()
      .withMessage("Location is required")
      .isString()
      .withMessage("Location must be a string"),

    body("imageURLS")
      .optional()
      .isArray()
      .withMessage("Image URLs must be an array")
      .custom((value) => {
        if (!Array.isArray(value)) return true;
        return value.every(
          (item) => typeof item === "string" && item.match(/^https?:\/\/.+/)
        );
      })
      .withMessage("Each image URL must be a valid URL string"),

    body("postType")
      .notEmpty()
      .withMessage("Post type is required")
      .isString()
      .withMessage("Post type must be a string")
      .isIn(["LOST", "FOUND"])
      .withMessage("Post type must be either LOST or FOUND"),

    body("postStatus")
      .optional()
      .isString()
      .withMessage("Post status must be a string")
      .isIn(["Active", "Resolved"])
      .withMessage("Post status must be either Active or Resolved"),

    body("userID")
      .notEmpty()
      .withMessage("User ID is required")
      .isString()
      .withMessage("User ID must be a string"),
  ];

  static update: ValidationChain[] = [
    param("id").notEmpty().withMessage("Post ID is required!"),
    body("title")
      .optional()
      .isString()
      .withMessage("Title must be a string")
      .isLength({ min: 3, max: 100 })
      .withMessage("Title must be between 3 and 100 characters"),
    body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string")
      .isLength({ min: 10 })
      .withMessage("Description must be at least 10 characters"),
    body("category")
      .optional()
      .isString()
      .withMessage("Category must be a string"),
    body("location")
      .optional()
      .isString()
      .withMessage("Location must be a string"),
    body("imageURLS")
      .optional()
      .isArray()
      .withMessage("Image URLs must be an array")
      .custom((value) => {
        if (!Array.isArray(value)) return true;
        return value.every(
          (item) => typeof item === "string" && item.match(/^https?:\/\/.+/)
        );
      })
      .withMessage("Each image URL must be a valid URL string"),
    body("postType")
      .optional()
      .isString()
      .withMessage("Post type must be a string")
      .isIn(["LOST", "FOUND"])
      .withMessage("Post type must be either LOST or FOUND"),
    body("postStatus")
      .optional()
      .isString()
      .withMessage("Post status must be a string")
      .isIn(["Active", "Resolved"])
      .withMessage("Post status must be either Active or Resolved"),
  ];

  static delete: ValidationChain[] = [
    param("id").notEmpty().withMessage("Post ID is required!"),
  ];
}
