import "express-session";

declare module "express-session" {
  interface SessionData {
    userId: number;
    csrf_token: string;
  }
}
