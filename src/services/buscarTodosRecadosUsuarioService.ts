import { usuarioRepository } from "../repository/usuariosRepository";

export class BuscarTodosRecadosUsuarioService {
  async execute(usuarioId: number): Promise<any> {
    const usuario = await usuarioRepository.findOne({
      where: { usuarioId },
      relations: ["recados"],
    });

    if (usuario?.recados.length === 0) {
      return new Error("Não existem recados para este Usuário");
    }

    return usuario;
  }
}
