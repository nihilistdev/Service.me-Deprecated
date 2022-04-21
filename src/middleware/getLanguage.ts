import { Request, Response, NextFunction } from "express";

export const getLanguage = (req: Request, _: Response, next: NextFunction) => {
  const acceptLanguageHeader = req.get("Accept-language") as Language | null;
  if (!acceptLanguageHeader) {
    req.language = "en-US";
    return next();
  }
  req.language = acceptLanguageHeader;
  return next();
};
