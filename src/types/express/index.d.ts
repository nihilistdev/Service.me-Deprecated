import { JwtPayload } from "../jwt/jwt";
import { Language } from "../user/language";

declare global {
  namespace Express {
    export interface Request {
      jwtPayload: JwtPayload;
      language: Language;
    }

    export interface Response {
      success(httpStatusCode: number, message: string, data?: any): Response;
    }
  }
}
