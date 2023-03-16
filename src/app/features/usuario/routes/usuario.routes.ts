import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";
import { buscarUsuarioPorId } from "../validators/buscarUsuarioPorId.validator";
import { checkCpfDuplicadoValidator } from "../validators/checkCpfDuplicado.validator";
import { validarCamposUsuario } from "../validators/validarCampos.validator";

const usuarioRoutes = Router();

usuarioRoutes.post(
  "/",
  [validarCamposUsuario, checkCpfDuplicadoValidator],
  new UsuarioController().create
);

usuarioRoutes.get("/", new UsuarioController().listAll);

usuarioRoutes.get(
  "/:usuarioId",
  [buscarUsuarioPorId],
  new UsuarioController().listById
);

export { usuarioRoutes };
