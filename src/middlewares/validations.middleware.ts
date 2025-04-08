import { Request, Response, NextFunction } from "express";
import { ValidationChain, validationResult } from "express-validator";

export const runValidations = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req).array();
    console.log(errors);

    if (errors.length > 0) {
      res.status(400).send({
        error: "BadRequestError",
        status: 400,
        errors: errors,
      });
      return;
    }

    next();
  };
};
