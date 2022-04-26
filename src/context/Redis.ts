import IORedis, { Redis } from "ioredis";
import { Request, Response, NextFunction } from "express";
import {
  FORGOT_PASSWORD_PREFIX,
  ACCOUNT_VERIFICATION_PREFIX,
} from "../utils/constants/constants";

export class RedisContext implements RedisContextTypes {
  constructor(private redis: Redis) {}

  public static setup(
    redis: Redis
  ): (req: Request, _: Response, next: NextFunction) => void {
    return (req: Request, _: Response, next: NextFunction) => {
      req.redis = new RedisContext(redis);
      next();
    };
  }

  get isConnected(): IORedis.OverloadedSubCommand<IORedis.ValueType, any> {
    return this.redis.client;
  }

  public async getKey(key: string): Promise<string | null> {
    return await this.redis.get(key);
  }

  public async setKey(
    token: string,
    userId: number,
    setType: typeof FORGOT_PASSWORD_PREFIX | typeof ACCOUNT_VERIFICATION_PREFIX
  ): Promise<"OK" | null> {
    return await this.redis.set(
      setType + token,
      userId,
      "ex",
      1000 * 60 * 60 * 24 * 3
    );
  }

  public async delete(key: string): Promise<number> {
    return await this.redis.del(key);
  }
}
