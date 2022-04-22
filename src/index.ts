import "dotenv/config";
import "reflect-metadata";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import fs from "fs";
import path from "path";
import morgan from "morgan";
import ConsoleDebug from "./utils/console";
import { errorHandle } from "./middleware/handleError";
import { connDb } from "./database/createConnection";
import routes from "./routes";
import connectRedis from "connect-redis";
import session from "express-session";
import Redis from "ioredis";
import { isProd } from "./utils/isProd/isProd";
import { COOKIE_NAME } from "./utils/constants/constants";
import { RedisContext } from "./context/Redis";

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
      secure: !!isProd(),
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
