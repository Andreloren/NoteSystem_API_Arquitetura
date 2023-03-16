import { RecadosEntity } from "../app/shared/database/entities/recados.entity";
import { recadoRepository } from "../repository/recadosRepository";

export class DeletarRecadoUsuarioService {
  async execute(
    recadoId: string,
    usuarioId: number
  ): Promise<RecadosEntity | Error> {
    const recado = await recadoRepository.findOne({
      where: { recadoId: recadoId, usuario: { usuarioId: Number(usuarioId) } },
    });
    if (!recado) {
      return new Error("Recado não existe");
    }

    await recadoRepository.delete({
      recadoId,
    });

    return recado;
  }
}
