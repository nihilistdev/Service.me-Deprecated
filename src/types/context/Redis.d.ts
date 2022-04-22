export declare global {
  export interface RedisContextTypes {
    getKey(key: string): Promise<string | null>;
    setKey(token: string, userId: number): Promise<"OK" | null>;
    isConnected(): IORedis.OverloadedSubCommand<IORedis.ValueType, any>;
  }
}
