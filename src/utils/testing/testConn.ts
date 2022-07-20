import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const testConn = (drop: boolean = false) =>
  new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "serviceme_test",
    synchronize: drop,
    dropSchema: drop,
    entities: ["dist/database/entities/**/*.js"],
    migrations: ["dist/database/migrations/*.js"],
    namingStrategy: new SnakeNamingStrategy(),
  });
