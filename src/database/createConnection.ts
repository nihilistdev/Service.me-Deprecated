import { Connection, createConnection, getConnectionManager } from "typeorm";

import db from "./config/ormconfig";

export const createDbConnection = async (): Promise<Connection | null> => {
  try {
    await createConnection(db);
  } catch (err) {
    if (err.name === "AlreadyHasActiveConnectionError") {
      const activeConnection = getConnectionManager().get(db.name);
      return activeConnection;
    }
    console.log(err);
  }
  return null;
};
