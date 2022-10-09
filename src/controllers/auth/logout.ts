import { Request, Response, NextFunction } from "express";
import { COOKIE_NAME } from "@utils/constants/constants";
import HandleError from "@utils/response/errors";
import Success from "@utils/response/success";

export const logoutContoller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.session!.destroy((err) => {
    if (err) {
      const error = new HandleError(
        400,
        "Raw",
        "Logout error",
        null,
        null,
        err
      );
      return next(error);
    }
  });
  res.clearCookie(COOKIE_NAME);
  const success = new Success(200, "Logout successfull");
  res.json(success.JSON);
};
