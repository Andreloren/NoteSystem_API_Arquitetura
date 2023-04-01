import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { RecadoRepository } from "../repositories/recados.repository";

export class DeletarRecadoUsecase {
  private cacheKey = "NOTE_DELETE";

  constructor(
    private repository: RecadoRepository,
    private cacheRepository: CacheRepository
  ) {}

  public async execute(recadoId: string, usuarioId: number): Promise<any> {
    await this.cacheRepository.del(this.cacheKey);

    const result = await this.repository.delete(recadoId, usuarioId);

    if (!result) {
      return Error;
    }

    await this.cacheRepository.set(this.cacheKey, result);

    return result;
  }
}
