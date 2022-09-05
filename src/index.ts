import "dotenv/config";
import "reflect-metadata";

import { COOKIE_NAME } from "./utils/constants/constants";
import ConsoleDebug from "./utils/console";
import Redis from "ioredis";
import { RedisContext } from "./context/Redis";
import { __prod__ } from "./utils";
import { connDb } from "./database/createConnection";
import connectRedis from "connect-redis";
import cors from "cors";
import { errorHandle } from "./middleware/handleError";
import express from "express";
import fs from "fs";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import routes from "./routes";
import session from "express-session";

export const app = express();
const RedisStore = connectRedis(session);
const redis = new Redis(process.env.REDIS);

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
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
      secure: !!__prod__,
    },
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    resave: false,
  })
);
app.use(RedisContext.setup(redis));

try {
  const accessLogStream = fs.createWriteStream(
    path.join(__dirname + "/../log/logger.log"),
    {
      flags: "a+",
    }
  );
  app.use(morgan("combined", { stream: accessLogStream }));
} catch (err) {
  ConsoleDebug.error(err);
}

app.use("/", routes);
app.use(errorHandle);
app.listen(4000, () => {
  ConsoleDebug.info(`Server running on localhost:${process.env.PORT}`);
});

(async () => {
  await connDb();
})();
