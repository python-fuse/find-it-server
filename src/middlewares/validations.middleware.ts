import { Request, Response, NextFunction } from "express";
import { ValidationChain, validationResult } from "express-validator";
import { BadRequestError } from "../utils/errors";

export const runValidations = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req).array();
    if (errors.length > 0) {
      next(new BadRequestError(errors.toString()));
      return;
    }
  };
};
