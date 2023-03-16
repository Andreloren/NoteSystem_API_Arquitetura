import cors from "cors";
import express from "express";
import { makeRoutes } from "./routes.config";

export const createServer = () => {
  const app = express();

  app.use(cors());

  app.use(express.json());

  makeRoutes(app);

  return app;
};
