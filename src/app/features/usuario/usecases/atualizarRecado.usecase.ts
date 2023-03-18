import { Recado } from "../../../models/recado.model";
import { RecadoRepository } from "../../recados/repositories/recados.repository";

export type AtualizarRecadoDTO = {
  recadoId: string;
  usuarioId: number;
  descricao: string;
  detalhamento: string;
  status: string;
};

export class AtualizarRecadoUseCase {
  constructor(private repository: RecadoRepository) {}

  public async execute(data: AtualizarRecadoDTO): Promise<Recado> {
    const recado = Recado.create(
      data.descricao,
      data.detalhamento,
      data.usuarioId,
      data.status,
      data.recadoId
    );

    return await this.repository.update(
      recado.recadoId!,
      recado.usuarioId,
      recado.descricao,
      recado.detalhamento,
      recado.status!
    );
  }
}
