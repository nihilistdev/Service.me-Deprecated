import ConsoleDebug from "../utils/console";
import { DataSource } from "typeorm";
import { db } from "./config/ormconfig";

export const connDb = async (): Promise<DataSource | undefined> => {
  await db.initialize();

  if (!db.isInitialized) {
    ConsoleDebug.error("There was an error while conecting to database");
    return undefined;
  }
  return db;
};
