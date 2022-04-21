import jwt from "jsonwebtoken";

export const handleJwtToken = (payload: JwtPayload) =>
  jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
