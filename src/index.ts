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

export const app = express();

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
