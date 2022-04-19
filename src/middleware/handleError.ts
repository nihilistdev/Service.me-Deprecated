import { Request, Response, NextFunction } from "express";
import { HandleError } from "../utils/response/errors/Error";

export const errorHandle = (
  err: HandleError,
  _: Request,
  res: Response,
  __: NextFunction
) => res.status(err.httpStatusCode).json(err.JSON);
