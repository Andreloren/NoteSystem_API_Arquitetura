import { Usuario } from "../../../models/usuario.model";
import { UsuarioRepository } from "../repositories/usuario.repository";

interface CriarUsuarioDTO {
  nome: string;
  email: string;
  cpf: string;
  senha: string;
}

export class CriarUsuarioUseCase {
  constructor(private repository: UsuarioRepository) {}

  public async execute(data: CriarUsuarioDTO): Promise<Usuario> {
    const usuario = Usuario.create(data.nome, data.email, data.cpf, data.senha);

    return await this.repository.create(usuario);
  }
}
