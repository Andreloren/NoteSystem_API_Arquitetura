import { Recado } from "../../../models/recado.model";
import { status } from "../../../shared/types/tipos";
import { RecadoRepository } from "../repositories/recados.repository";

interface CriarRecadosDTO {
  descricao: string;
  detalhamento: string;
  usuarioId: number;
  status?: status;
}

export class CriarRecadosUseCase {
  constructor(private repository: RecadoRepository) {}

  public async execute({
    descricao,
    detalhamento,
    usuarioId,
  }: CriarRecadosDTO): Promise<Recado> {
    const recado = Recado.create(descricao, detalhamento, usuarioId);

    await this.repository.create(recado);

    return recado;
  }
}
