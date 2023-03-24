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
  private cacheKey = "USER_CREATE_UPDATE";

  constructor(
    private repository: UsuarioRepository,
    private cacheRepository: CacheRepository
  ) {}

  public async execute(data: AtualizarUsuarioDTO): Promise<Usuario | any> {
    await this.cacheRepository.del(this.cacheKey);

    const cache = await this.cacheRepository.get(this.cacheKey);

    if (cache) {
      return cache as any[];
    }

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

    await this.cacheRepository.set(this.cacheKey, result);

    return result;
  }
}
