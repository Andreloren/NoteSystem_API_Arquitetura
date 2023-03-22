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
