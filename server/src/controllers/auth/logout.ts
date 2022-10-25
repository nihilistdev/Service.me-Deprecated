import { Request, Response } from "express";
import { COOKIE_NAME } from "@utils/constants/constants";
import HandleError from "@utils/response/errors";
import Success from "@utils/response/success";

export const logoutContoller = async (req: Request, res: Response) => {
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
      res.status(error.httpStatusCode).send(error);
    }
  });
  res.clearCookie(COOKIE_NAME);
  const success = new Success(200, "Logout successfull");
  res.json(success.JSON);
};
