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
  private cacheKey = "USER_UPDATE";

  constructor(
    private repository: UsuarioRepository,
    private cacheRepository: CacheRepository
  ) {}

  public async execute(data: AtualizarUsuarioDTO): Promise<Usuario | any> {
    const result = await this.repository.update(
      data.nome,
      data.email,
      data.cpf,
      data.senha,
      data.usuarioId
    );

    if (!result) {
      return Error;
    }

    await this.cacheRepository.del(this.cacheKey);

    await this.cacheRepository.del("ALL_USERS");

    await this.cacheRepository.set(this.cacheKey, result);

    return result;
  }
}
