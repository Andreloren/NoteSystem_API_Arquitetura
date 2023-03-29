import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { UsuarioRepository } from "../repositories/usuario.repository";

export class BuscarRecadoPorIdUsecase {
  private cacheKey = "NOTE_ID";

  constructor(
    private repository: UsuarioRepository,
    private cacheRepository: CacheRepository
  ) {}

  public async execute(usuarioId: number, recadoId: string): Promise<any> {
    await this.cacheRepository.del(this.cacheKey);

    const cache = await this.cacheRepository.get(this.cacheKey);

    if (cache) {
      return cache as any[];
    }

    const result = await this.repository.getOneRecadoByIdUsuario(
      usuarioId,
      recadoId
    );

    if (!result) {
      return Error;
    }

    await this.cacheRepository.set(this.cacheKey, result.recados);

    return result;
  }
}
