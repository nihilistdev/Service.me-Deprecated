import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "../types/jwt/jwt";
import { handleJwtToken } from "../utils/jwt/handleJwtToken";
import { HandleError } from "../utils/response/errors/Error";

export const handleToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Check for authorization header
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new HandleError(
      400,
      "General",
      "Authorization header not provided"
    );
    return next(error);
  }

  // Verify the token
  const token = authHeader.split(" ")[1];
  let jwt: { [key: string]: any };
  try {
    jwt = jwt.verify(token, process.env.JWT_SECRET as string) as {
      [key: string]: any;
    };
    ["iat", "exp"].map((key) => delete jwt[key]);
    req.jwtPayload as JwtPayload;
  } catch (err) {
    const error = new HandleError(401, "Raw", "JWT error", null, err);
    return next(error);
  }

  // Refresh and send new token on new request
  try {
    const newToken = handleJwtToken(jwt as JwtPayload);
    res.setHeader("token", `Bearer ${newToken}`);
    return next();
  } catch (err) {
    const error = new HandleError(
      400,
      "Raw",
      "Token creation error",
      null,
      err
    );
    return next(error);
  }
};
