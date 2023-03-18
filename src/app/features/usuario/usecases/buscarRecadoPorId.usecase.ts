import { Recado } from "../../../models/recado.model";
import { RecadoRepository } from "../../recados/repositories/recados.repository";
import { UsuarioRepository } from "../repositories/usuario.repository";

export class BuscarRecadoPorIdUsecase {
  constructor(private repository: UsuarioRepository) {}

  public async execute(usuarioId: number, recadoId: string): Promise<any> {
    const result = await this.repository.getOneRecadoByIdUsuario(
      usuarioId,
      recadoId
    );

    if (!result) {
      return null;
    }

    return result;
  }
}
