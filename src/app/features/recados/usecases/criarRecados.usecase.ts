import { Recado } from "../../../models/recado.model";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { RecadoRepository } from "../repositories/recados.repository";

interface CriarRecadosDTO {
  descricao: string;
  detalhamento: string;
  usuarioId: number;
}

export class CriarRecadosUseCase {
  private cacheKey = "NOTE_CREATE";

  constructor(
    private repository: RecadoRepository,
    private cacheRepository: CacheRepository
  ) {}

  public async execute(data: CriarRecadosDTO): Promise<Recado | any> {
    await this.cacheRepository.del(this.cacheKey);

    const recado = new Recado(
      data.descricao,
      data.detalhamento,
      data.usuarioId
    );

    const result = await this.repository.create(recado);

    await this.cacheRepository.set(this.cacheKey, result);
    await this.cacheRepository.del("ALL_NOTES");

    return result;
  }
}
