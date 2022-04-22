import IORedis, { Redis } from "ioredis";
import { ACCOUNT_VERIFICATION_PREFIX } from "../utils/constants/constants";
import { Request, Response, NextFunction } from "express";

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

  /**
   * Sets the token and userId
   * @param token
   * @param userId
   * @returns Promise<"OK" | null>
   */
  public async setKey(token: string, userId: number): Promise<"OK" | null> {
    return await this.redis.set(
      ACCOUNT_VERIFICATION_PREFIX + token,
      userId,
      "ex",
      1000 * 60 * 60 * 24 * 3
    );
  }
}
