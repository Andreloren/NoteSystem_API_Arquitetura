import { RecadosEntity } from "../app/shared/database/entities/recados.entity";
import { recadoRepository } from "../repository/recadosRepository";
import { AtualizarRecadoRequest } from "../app/shared/types/tipos";

export class AtualizaRecadoService {
  async execute({
    recadoId,
    usuarioId,
    descricao,
    detalhamento,
    status,
  }: AtualizarRecadoRequest): Promise<RecadosEntity | Error> {
    const recado = await recadoRepository.findOne({
      where: { recadoId: recadoId, usuario: { usuarioId: Number(usuarioId) } },
    });
    if (!recado) {
      return new Error("Recado não existe");
    }

    recado.descricao = descricao ? descricao : recado.descricao;
    recado.detalhamento = detalhamento ? detalhamento : recado.detalhamento;
    recado.status = status ? status : recado.status;

    await recadoRepository.save(recado);

    return recado;
  }
}
