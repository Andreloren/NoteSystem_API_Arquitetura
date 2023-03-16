import { UsuariosEntity } from "../database/entities/usuarios.entity";
import { usuarioRepository } from "../repository/usuariosRepository";

export class BuscarUsuarioPorIDService {
  async execute(usuarioId: number): Promise<UsuariosEntity | null> {
    const usuario = await usuarioRepository.findOneBy({ usuarioId });

    return usuario;
  }
}
