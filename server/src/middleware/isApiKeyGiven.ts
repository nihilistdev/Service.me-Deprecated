import { NextFunction, Request, Response } from "express";

import HandleError from "@utils/response/errors";

export const isApiKeyGiven = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  if (req.headers["api_key"] || req.headers["x-api-key"]) {
    return next()
  };
  const error = new HandleError(
    403,
    "Validation",
    "Given api_key is not valid"
  );
  return next(error);
};
