import "dotenv/config";

import { DataSource } from "typeorm";
import { appEnv } from "../../app/envs/app.env";

export default new DataSource({
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
