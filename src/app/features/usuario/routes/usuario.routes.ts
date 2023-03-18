import { Router } from "express";
import { RecadosController } from "../../recados/controllers/recados.controller";
import { validarCamposRecadoValidator } from "../../recados/validators/validarCampos.validator";
import { UsuarioController } from "../controllers/usuario.controller";
import { buscarUsuarioPorId } from "../validators/buscarUsuarioPorId.validator";
import { checkCpfDuplicadoValidator } from "../validators/checkCpfDuplicado.validator";
import { validarCamposUsuario } from "../validators/validarCampos.validator";

const usuarioRoutes = Router();

usuarioRoutes.post(
  "/",
  [checkCpfDuplicadoValidator, validarCamposUsuario],
  new UsuarioController().create
);

usuarioRoutes.get("/", new UsuarioController().listAll);

usuarioRoutes.get(
  "/:usuarioId",
  [buscarUsuarioPorId],
  new UsuarioController().listById
);

usuarioRoutes.put(
  "/:usuarioId",
  [buscarUsuarioPorId],
  new UsuarioController().update
);

usuarioRoutes.post(
  "/:usuarioId/recados",
  [buscarUsuarioPorId, validarCamposRecadoValidator],
  new RecadosController().create
);

usuarioRoutes.get(
  "/:usuarioId/recados",
  [buscarUsuarioPorId],
  new UsuarioController().listRecadosByUsuarioId
);

usuarioRoutes.get(
  "/:usuarioId/recados/:recadoId",
  [buscarUsuarioPorId],
  new UsuarioController().listRecadoById
);

usuarioRoutes.put(
  "/:usuarioId/recados/:recadoId",
  [buscarUsuarioPorId],
  new RecadosController().update
);

export { usuarioRoutes };
