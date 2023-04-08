import "dotenv/config";

export const appEnv = {
  dbUrl: process.env.DATABASE_URL,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS,
  dbName: process.env.DB_NAME,
  port: Number(process.env.PORT),
};

export const appEnvTest = {
  dbUrl: process.env.DATABASE_URL_TEST,
  dbHost: process.env.DB_HOST_TEST,
  dbPort: process.env.DB_PORT_TEST,
  dbUser: process.env.DB_USER_TEST,
  dbPass: process.env.DB_PASS_TEST,
  dbName: process.env.DB_NAME_TEST,
  port: Number(process.env.PORT),
};
