import { Router } from "express";
import { buscarUsuarioPorId } from "../../usuario/validators/buscarUsuarioPorId.validator";
import { RecadosController } from "../controllers/recados.controller";

const recadosRoutes = Router();

// recadosRoutes.post("/", new RecadosController().create);

export { recadosRoutes };
