import { Request, Response, NextFunction } from "express";
import { User } from "../../../database/entities/user/user";
import validator from "validator";
import HandleError from "../../../utils/response/errors";

export const updateUserValidator = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  let { name, last_name, email, username } = req.body;
  const errorValidation: ErrorValidation[] = [...new Array()];
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new HandleError(
      400,
      "General",
      "Authorization header not provided"
    );
    return next(error);
  }
  if (!name && !last_name && !email && !username) {
    errorValidation.push({ data: "Some of user data is missing" });
  }

  if (await User.findOne({ where: { username } })) {
    errorValidation.push({ username: "User already exists by this username" });
  }

  if (await User.findOne({ where: { email } })) {
    errorValidation.push({ email: "User by this email already exists" });
  }

  if (validator.contains(name, `!@#$%^&*()_+-=[]{}\|;:'",.<>/?`)) {
    errorValidation.push({ name: "Name must not contain symbols" });
  }

  if (validator.contains(last_name, `!@#$%^&*()_+-=[]{}\|;:'",.<>/?`)) {
    errorValidation.push({ last_name: "Last nbame must not constain symbols" });
  }

  if (errorValidation.length !== 0) {
    const error = new HandleError(
      400,
      "Validation",
      "Validation error",
      null,
      null,
      errorValidation
    );
    return next(error);
  }
  return next();
};
