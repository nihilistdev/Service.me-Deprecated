import jwt from "jsonwebtoken";
import { JwtPayload } from "../../types/jwt/jwt";

export const handleJwtToken = (payload: JwtPayload) =>
  jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
