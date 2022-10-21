import { Request, Response, NextFunction } from "express";
import HandleError from "@utils/response/errors";

export const isAuth = (req: Request, _: Response, next: NextFunction) => {
  if (!req.session.userId) {
    const error = new HandleError(400, "Raw", "Not authenticated!");
    return next(error);
  }
  return next();
};
