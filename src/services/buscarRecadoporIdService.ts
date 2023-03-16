import { usuarioRepository } from "../repository/usuariosRepository";

export class BuscarRecadoPorIdService {
  async execute(usuarioId: number, recadoId: string): Promise<any | Error> {
    const usuario = await usuarioRepository.findOne({
      relations: ["recados"],
      where: { usuarioId, recados: { recadoId: recadoId } },
    });

    const recado = usuario?.recados.filter((f) => f.recadoId === recadoId);

    if (recado?.length === 0 || !recado) {
      return new Error("Recado não existe");
    }

    return usuario;
  }
}
