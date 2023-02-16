import { type Request, type Response, type NextFunction } from "express";
import { type HandleError } from "@utils/response/errors/Error";

export const errorHandle = (
  err: HandleError,
  _: Request,
  res: Response,
  __: NextFunction
) =>
  res.status(err.httpStatusCode | 403).json(
    !err.JSON
      ? {
          csrfError: {
            name: err.name,
            message: err.message,
            stack: err.stack,
          },
        }
      : err.JSON
  );
