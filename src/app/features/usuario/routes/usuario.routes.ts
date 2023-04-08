import { Router } from "express";
import { RecadosController } from "../../recados/controllers/recados.controller";
import { validarCamposRecadoValidator } from "../../recados/validators/validarCampos.validator";
import { UsuarioController } from "../controllers/usuario.controller";
import { checkCpfDuplicadoValidator } from "../validators/checkCpfDuplicado.validator";
import { checkEmailDuplicadoValidator } from "../validators/checkEmailDuplicado.validator";
import { validarCamposUsuario } from "../validators/validarCampos.validator";

const usuarioRoutes = Router();

usuarioRoutes.post(
  "/",
  [
    validarCamposUsuario,
    checkEmailDuplicadoValidator,
    checkCpfDuplicadoValidator,
  ],
  new UsuarioController().create
);

usuarioRoutes.get("/", new UsuarioController().listAll);

usuarioRoutes.get("/:usuarioId", new UsuarioController().listById);

usuarioRoutes.put("/:usuarioId", new UsuarioController().update);

usuarioRoutes.post(
  "/:usuarioId/recados",
  validarCamposRecadoValidator,
  new RecadosController().create
);

usuarioRoutes.get(
  "/:usuarioId/recados",
  new UsuarioController().listRecadosByUsuarioId
);

usuarioRoutes.get(
  "/:usuarioId/recados/:recadoId",
  new UsuarioController().listRecadoById
);

usuarioRoutes.put(
  "/:usuarioId/recados/:recadoId",
  new RecadosController().update
);

usuarioRoutes.delete(
  "/:usuarioId/recados/:recadoId",
  new RecadosController().delete
);

export { usuarioRoutes };
