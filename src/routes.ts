import { Router } from "express";

import {
  BuscarTodosRecadosUsuarioController,
  AtualizarUsuarioController,
  BuscarRecadoPorIdController,
  BuscarTodosUsuariosController,
  BuscarUsuarioPorIDController,
  CriarRecadoUsuarioController,
  CriarUsuarioController,
  DeletarRecadoUsuarioController,
  AtualizarRecadoController,
} from "./controllers";

import {
  validarCamposUsuario,
  buscarUsuarios,
  validarCamposRecado,
  buscarUsuarioId,
} from "./middlewares";

const routes = Router();

routes.post(
  "/usuarios",
  validarCamposUsuario,
  new CriarUsuarioController().criar
);

routes.post(
  "/usuarios/:usuarioId/recados",
  [buscarUsuarioId, validarCamposRecado],
  new CriarRecadoUsuarioController().criar
);

routes.get(
  "/usuarios",
  buscarUsuarios,
  new BuscarTodosUsuariosController().buscar
);

routes.get(
  "/usuarios/:usuarioId",
  buscarUsuarioId,
  new BuscarUsuarioPorIDController().buscar
);

routes.get(
  "/usuarios/:usuarioId/recados",
  buscarUsuarioId,
  new BuscarTodosRecadosUsuarioController().buscar
);

routes.get(
  "/usuarios/:usuarioId/recados/:recadoId",
  buscarUsuarioId,
  new BuscarRecadoPorIdController().buscar
);

routes.put(
  "/usuarios/:usuarioId",
  buscarUsuarioId,
  new AtualizarUsuarioController().atualizar
);

routes.put(
  "/usuarios/:usuarioId/recados/:recadoId",
  buscarUsuarioId,
  new AtualizarRecadoController().atualizar
);

routes.delete(
  "/usuarios/:usuarioId/recados/:recadoId",
  buscarUsuarioId,
  new DeletarRecadoUsuarioController().deletar
);

export default routes;
