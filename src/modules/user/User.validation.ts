import { body, param, ValidationChain } from "express-validator";

export class UserValidation {
  static createUser: ValidationChain[] = [
    body("googleID")
      .notEmpty()
      .withMessage("Google ID is required")
      .isString()
      .withMessage("Google ID must be a string"),

    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format")
      .normalizeEmail(),

    body("avatar")
      .notEmpty()
      .withMessage("Avatar URL is required")
      .isURL()
      .withMessage("Invalid avatar URL"),

    body("username")
      .notEmpty()
      .withMessage("Username is required")
      .isString()
      .withMessage("Username must be a string")
      .trim(),

    body("admissionNumber")
      .optional()
      .isString()
      .withMessage("Admission number must be a string")
      .trim(),

    body("department")
      .optional()
      .isString()
      .withMessage("Department must be a string")
      .trim(),

    body("faculty")
      .optional()
      .isString()
      .withMessage("Faculty must be a string")
      .trim(),

    body("role")
      .optional()
      .isIn(["STUDENT", "ADMIN", "MODERATOR"])
      .withMessage("Invalid role. Must be STUDENT, ADMIN, or MODERATOR"),
  ];

  static updateUser: ValidationChain[] = [
    param("id")
      .notEmpty()
      .withMessage("User ID is required")
      .isString()
      .withMessage("User ID must be a string"),

    body("username")
      .optional()
      .isString()
      .withMessage("Username must be a string")
      .trim(),

    body("admissionNumber")
      .optional()
      .isString()
      .withMessage("Admission number must be a string")
      .trim(),

    body("department")
      .optional()
      .isString()
      .withMessage("Department must be a string")
      .trim(),

    body("faculty")
      .optional()
      .isString()
      .withMessage("Faculty must be a string")
      .trim(),

    body("role")
      .optional()
      .isIn(["STUDENT", "ADMIN", "MODERATOR"])
      .withMessage("Invalid role. Must be STUDENT, ADMIN, or MODERATOR"),
  ];

  static getUser = [
    param("id")
      .notEmpty()
      .withMessage("User ID is required")
      .isString()
      .withMessage("User ID must be a string"),
  ];

  static deleteUser = [
    param("id")
      .notEmpty()
      .withMessage("User ID is required")
      .isString()
      .withMessage("User ID must be a string"),
  ];
}
