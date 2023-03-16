import { Express } from "express";
import { usuarioRoutes } from "../../app/features/usuario/routes/usuario.routes";

export const makeRoutes = (app: Express) => {
  app.use("/usuarios", usuarioRoutes);
};
