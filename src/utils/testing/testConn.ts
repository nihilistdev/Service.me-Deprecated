import "reflect-metadata";

import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { createConnection } from "typeorm";

export const testConn = (drop: boolean = false) =>
  createConnection({
    name: "default",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "serviceme_test",
    synchronize: drop,
    dropSchema: drop,
    entities: ["src/database/entities/**/*.ts"],
    namingStrategy: new SnakeNamingStrategy(),
  });
