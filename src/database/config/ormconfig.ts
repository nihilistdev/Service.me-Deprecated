import { isProd } from "../../utils/isProd/isProd";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const db = (test: boolean = false) =>
  new DataSource({
    type: "postgres",
    host: process.env.PG_SOURCE,
    port: parseInt(process.env.PG_PORT),
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: test ? "serviceme_test" : process.env.PG_DATABASE,
    synchronize: true,
    logging: !isProd(),
    entities: ["dist/database/entities/**/*.js"],
    migrations: ["dist/database/migrations/*.js"],
    namingStrategy: new SnakeNamingStrategy(),
  });
