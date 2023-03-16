import { usuarioRepository } from "../repository/usuariosRepository";

export class BuscarTodosUsuariosService {
  async execute() {
    const usuarios = await usuarioRepository.find();

    return usuarios;
  }
}
