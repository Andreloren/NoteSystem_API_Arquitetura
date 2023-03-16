import "dotenv/config";

import { DataSource } from "typeorm";

const port = process.env.PORT as number | undefined;

export default new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  host: process.env.DB_HOST,
  port: port,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: ["src/app/shared/database/entities/**/*.ts"],
  migrations: ["src/app/shared/database/migrations/**/*.ts"],
});
