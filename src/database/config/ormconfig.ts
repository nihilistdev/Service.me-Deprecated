import { ConnectionOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { __prod__ } from "@utils/constants/constants";

export const db: ConnectionOptions = {
  name: "default",
  type: "postgres",
  host: process.env.PG_SOURCE,
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "serviceme",
  logging: !__prod__,
  entities: ["src/database/entities/**/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
  namingStrategy: new SnakeNamingStrategy(),
};

// module.exports = db;
