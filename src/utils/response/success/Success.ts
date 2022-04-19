import { response, Response } from "express";

response.success = (
  httpStatusCode: number,
  message: string,
  data: any = null
): Response => {
  return response.status(httpStatusCode).json({ message, data });
};
