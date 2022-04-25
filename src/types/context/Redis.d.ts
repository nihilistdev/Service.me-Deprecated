import {
  FORGOT_PASSWORD_PREFIX,
  ACCOUNT_VERIFICATION_PREFIX,
} from "../../utils/constants/constants";
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
    blackListToken(token: string): Promise<"OK" | null>;
    isTokenBlacklisted(token): Promise<boolean>;
  }
}
