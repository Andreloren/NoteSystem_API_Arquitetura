import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { UsuarioRepository } from "../repositories/usuario.repository";

export class BuscarTodosUsuariosUsecase {
  private cacheKey = "ALL_USERS";

  constructor(
    private repository: UsuarioRepository,
    private cacheRepository: CacheRepository
  ) {}

  public async execute(): Promise<any> {
    await this.cacheRepository.del(this.cacheKey);

    const cache = await this.cacheRepository.get(this.cacheKey);

    if (cache) {
      return cache as any[];
    }

    const result = await this.repository.getAll();

    if (!result) {
      return Error;
    }

    await this.cacheRepository.set(this.cacheKey, result);

    return result;
  }
}
