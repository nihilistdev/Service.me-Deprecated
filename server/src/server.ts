import "dotenv/config";
import "reflect-metadata";

import { COOKIE_NAME, __prod__ } from "@utils/constants";

import Redis from "ioredis";
import { RedisContext } from "@context/Redis";
import connectRedis from "connect-redis";
import cors from "cors";
import { errorHandle } from "@middleware/handleError";
import express from "express";
import fs from "fs";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import routes from "@routes";
import session from "express-session";

declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}

const app = express();
const RedisStore = connectRedis(session);
const redis = new Redis(process.env.REDIS);
app.use(RedisContext.setup(redis));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.set("trust proxy", 1);
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    name: COOKIE_NAME,
    store: new RedisStore({
      client: redis,
      disableTouch: true,
    }),
    cookie: {
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      domain: undefined,
    },
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET as string,
    resave: false,
  })
);

try {
  const accessLogStream = fs.createWriteStream(
    path.join(__dirname + "/../log/logger.log"),
    {
      flags: "a+",
    }
  );
  app.use(morgan("combined", { stream: accessLogStream }));
} catch (err) {
  console.error(err);
}

app.use("/", routes);
app.use(errorHandle);

export default app;
