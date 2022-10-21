import {
  FORGOT_PASSWORD_PREFIX,
  ACCOUNT_VERIFICATION_PREFIX,
} from "src/utils/constants/constants";
export declare global {
  export interface RedisContextTypes {
    getKey(key: string): Promise<string | null>;
    setKey(
      token: string,
      userId: number,
      setType:
        | typeof FORGOT_PASSWORD_PREFIX
        | typeof ACCOUNT_VERIFICATION_PREFIX
    ): Promise<"OK" | null>;
    isConnected(): IORedis.OverloadedSubCommand<IORedis.ValueType, any>;
    delete(key: string): Promise<number>;
  }
}
