import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { __prod__ } from "../../utils";

export const db: DataSource = new DataSource({
  type: "postgres",
  host: process.env.PG_SOURCE,
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "serviceme",
  logging: !__prod__,
  entities: ["dist/database/entities/**/*.js"],
  migrations: ["dist/database/migrations/*.js"],
  namingStrategy: new SnakeNamingStrategy(),
});
