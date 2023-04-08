import { DataSource } from "typeorm";
import "dotenv/config";

import { appEnv, appEnvTest } from "../../app/envs/app.env";

let dataSource = new DataSource({
  type: "postgres",
  url: appEnv.dbUrl,
  host: appEnv.dbHost,
  port: appEnv.port,
  username: appEnv.dbUser,
  password: appEnv.dbPass,
  database: appEnv.dbName,
  synchronize: false,
  logging: true,
  entities: ["src/app/shared/database/entities/**/*.ts"],
  migrations: ["src/app/shared/database/migrations/**/*.ts"],
});

if (process.env.NODE_ENV === "test") {
  dataSource = new DataSource({
    type: "postgres",
    url: appEnvTest.dbUrl,
    host: appEnvTest.dbHost,
    port: appEnvTest.port,
    username: appEnvTest.dbUser,
    password: appEnvTest.dbPass,
    database: appEnvTest.dbName,
    synchronize: false,
    entities: ["src/app/shared/database/entities/**/*.ts"],
    migrations: ["src/app/shared/database/migrations/**/*.ts"],
  });
}

export default dataSource;
