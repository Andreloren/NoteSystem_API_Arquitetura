import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { RecadoRepository } from "../repositories/recados.repository";

export type AtualizarRecadoDTO = {
  recadoId: string;
  usuarioId: number;
  descricao: string;
  detalhamento: string;
  status: string;
};

export class AtualizarRecadoUseCase {
  private cacheKey = "NOTE_UPDATE";

  constructor(
    private repository: RecadoRepository,
    private cacheRepository: CacheRepository
  ) {}

  public async execute(data: AtualizarRecadoDTO): Promise<any | Error> {
    const result = await this.repository.update(
      data.recadoId,
      data.usuarioId,
      data.descricao,
      data.detalhamento,
      data.status
    );

    if (!result) {
      return Error;
    }

    await this.cacheRepository.del(this.cacheKey);

    await this.cacheRepository.del("ALL_NOTES");

    await this.cacheRepository.set(this.cacheKey, result);

    return result;
  }
}
