import { Usuario } from "../../../models/usuario.model";
import { UsuarioRepository } from "../repositories/usuario.repository";

export type AtualizarUsuarioDTO = {
  nome: string;
  email: string;
  cpf: string;
  senha: string;
  usuarioId?: number;
};

export class AtualizarUsuarioUseCase {
  constructor(private repository: UsuarioRepository) {}

  public async execute(data: AtualizarUsuarioDTO): Promise<Usuario> {
    const usuario = Usuario.create(
      data.nome,
      data.email,
      data.cpf,
      data.senha,
      data.usuarioId
    );

    return await this.repository.update(
      usuario.nome,
      usuario.email,
      usuario.cpf,
      usuario.senha,
      usuario.usuarioId
    );
  }
}
