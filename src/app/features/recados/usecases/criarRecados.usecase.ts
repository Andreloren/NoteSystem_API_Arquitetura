import { Recado } from "../../../models/recado.model";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { RecadoRepository } from "../repositories/recados.repository";

interface CriarRecadosDTO {
  descricao: string;
  detalhamento: string;
  usuarioId: number;
  status?: string;
}

export class CriarRecadosUseCase {
  private cacheKey = "NOTE_CREATE";

  constructor(
    private repository: RecadoRepository,
    private cacheRepository: CacheRepository
  ) {}

  public async execute({
    descricao,
    detalhamento,
    usuarioId,
  }: CriarRecadosDTO): Promise<Recado | any> {
    await this.cacheRepository.del(this.cacheKey);

    const cache = await this.cacheRepository.get(this.cacheKey);

    if (cache) {
      return cache as any[];
    }

    const recado = Recado.create(descricao, detalhamento, usuarioId);

    if (!recado) {
      return Error;
    }

    const result = await this.repository.create(recado);

    await this.cacheRepository.set(this.cacheKey, result);

    return recado;
  }
}
