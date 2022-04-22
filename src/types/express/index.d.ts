import { Redis } from "ioredis";

export declare global {
  namespace Express {
    export interface Request {
      jwtPayload: JwtPayload;
      language: Language;
      redis: RedisContextTypes;
    }
  }
}
