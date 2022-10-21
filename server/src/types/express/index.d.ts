import { Redis } from "ioredis";
import { DataSource } from "typeorm";

export declare global {
  namespace Express {
    export interface Request {
      redis: RedisContextTypes;
    }
  }
}
