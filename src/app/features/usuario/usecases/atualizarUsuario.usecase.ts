import { Usuario } from "../../../models/usuario.model";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
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

    const cacheRepository = new CacheRepository();

    await cacheRepository.del("LIST_USERS");

    await cacheRepository.del("LIST_USER");

    await cacheRepository.setEX("LIST_USER", [usuario], 3600);

    return await this.repository.update(
      usuario.nome,
      usuario.email,
      usuario.cpf,
      usuario.senha,
      usuario.usuarioId
    );
  }
}
